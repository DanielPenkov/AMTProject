using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using project.Models;
using System.Data.Entity;


namespace project.Models
{
    public class UsersGameModel
    {
        public static DbContextGame ctx = new DbContextGame();

        public static void AddScores(int scoreResult)
        {

            var usrName = HttpContext.Current.User.Identity.Name;
            var usrId = ctx.AspNetUsers.FirstOrDefault(r => r.UserName == usrName).Id.ToString();

            Score score = new Score()
            {
                user_id = usrId,
                date_scored = DateTime.Now,
                score1 = scoreResult
            };

            ctx.Scores.Add(score);
            ctx.SaveChanges();
            updateBadges();
        }

        public static Dictionary<String, String> GetBestUsers()
        {
            var list = (from score in ctx.Scores
                        group score by score.AspNetUser.UserName into g
                        select new { max_score = g.Max(s => s.score1), name = g.FirstOrDefault().AspNetUser.UserName }).OrderByDescending(r => r.max_score).Take(10).ToList();

            var scoreBoard = new Dictionary<string, string>();

            foreach (var user in list)
            {
                string username = user.name;
                string scores = user.max_score.ToString();
                scoreBoard.Add(username, scores);
            }

            return scoreBoard;
        }

        public static List<string> GetImage(int typeId)
        {
            List<string> imgSrcList = new List<string>();
            List<Image> imagesArray = ctx.Images.Where(i => i.type_id == typeId).ToList();
            int elements = 0;

            switch (typeId)
            {
                case 1:
                    elements = 4;
                    break;
                case 2:
                    elements = 5;
                    break;
                case 3:
                    elements = 6;
                    break;
                case 4:
                    elements = 7;
                    break;
                case 5:
                    elements = 8;
                    break;
                case 6:
                    elements = 9;
                    break;
                case 7:
                    elements = 10;
                    break;
                case 8:
                    elements = 12;
                    break;

            }

            Random rnd = new Random();
            int startRnd = rnd.Next(0, (imagesArray.Count() - elements));

            for (int i = 0; i < elements; i++)
            {
                imgSrcList.Add(imagesArray[(startRnd + i)].src);
            }

            return imgSrcList;
        }


        public static List<string> GetLevel(int lvlId)
        {
            if (lvlId >= 9)
            {
                lvlId = 8;
            }

            List<string> levelData = new List<string>();
            Level level = ctx.Levels.Where(l => l.id == lvlId).FirstOrDefault();

            levelData.Add(level.type_img.ToString());
            levelData.Add(level.score.ToString());

            return levelData;
        }


        public static Dictionary<String, String> MyResults()
        {
            Dictionary<String, String> myResults = new Dictionary<String, String>();
            var usrName = HttpContext.Current.User.Identity.Name;
            var usrId = ctx.AspNetUsers.FirstOrDefault(r => r.UserName == usrName).Id;

            if (ctx.Scores.Where(u => u.AspNetUser.Id == usrId).Count() > 0)
            {
                DateTime week = DateTime.Now.AddDays(-7);
                string max_points = ctx.Scores.Where(u => u.AspNetUser.Id == usrId).Max(s => s.score1).ToString();
                string total_points = ctx.Scores.Where(u => u.AspNetUser.Id == usrId).Sum(s => s.score1).ToString();
                string total_points_week = ctx.Scores.Where(u => u.date_scored > week && u.AspNetUser.Id == usrId).Sum(s => s.score1).ToString();

                myResults.Add("Highest Score", max_points);
                myResults.Add("Total Points", total_points);
                myResults.Add("Total Points This Week", total_points_week);
            }

            return myResults;
        }


        public static Dictionary<String, String> GetBestUsersWeek()
        {
            DateTime week = DateTime.Now.AddDays(-7);

            var list = (from score in ctx.Scores
                        where (score.date_scored > week)
                        group score by score.AspNetUser.UserName into g
                        select new { score = g.Sum(s => s.score1), name = g.FirstOrDefault().AspNetUser.UserName }).OrderByDescending(r => r.score).ToList();

            var scoreBoard = new Dictionary<string, string>();

            foreach (var user in list)
            {
                string username = user.name;
                string scores = user.score.ToString();
                scoreBoard.Add(username, scores);
            }

            return scoreBoard;
        }

        public static Dictionary<String, String> GetBestUsersTotal()
        {
            var list = (from score in ctx.Scores
                        group score by score.AspNetUser.UserName into g
                        select new { score = g.Sum(s => s.score1), name = g.FirstOrDefault().AspNetUser.UserName }).OrderByDescending(r => r.score).ToList();

            var scoreBoard = new Dictionary<string, string>();

            foreach (var user in list)
            {
                string username = user.name;
                string scores = user.score.ToString();
                scoreBoard.Add(username, scores);
            }

            return scoreBoard;
        }

        public static void updateHighestScoreBadge()
        {
            var usrId = ctx.Scores.OrderByDescending(s => s.score1).FirstOrDefault().AspNetUser.Id;

            if (ctx.Achevements.Where(a => a.badge_id == 1).Count() > 0)
            {
                if (usrId != ctx.Achevements.Where(a => a.badge_id == 1).FirstOrDefault().AspNetUser.Id)
                {
                    var lachev = ctx.Achevements.Where(a => a.badge_id == 1).FirstOrDefault();
                    ctx.Achevements.Remove(lachev);
                    ctx.SaveChanges();
                    Achevement achev = new Achevement()
                    {
                        user_id = usrId,
                        badge_id = 1,
                        date = DateTime.Now
                    };

                    ctx.Achevements.Add(achev);
                    ctx.SaveChanges();
                }
            }
            else
            {
                Achevement achev = new Achevement()
                {
                    user_id = usrId,
                    badge_id = 1,
                    date = DateTime.Now
                };

                ctx.Achevements.Add(achev);
                ctx.SaveChanges();
            }

        }

        public static void updateBestPlayerBadge()
        {
            var usrId = (from score in ctx.Scores
                         group score by score.AspNetUser.UserName into g
                         select new { score = g.Sum(s => s.score1), id = g.FirstOrDefault().AspNetUser.Id }).OrderByDescending(r => r.score).FirstOrDefault().id;



            if (ctx.Achevements.Where(a => a.badge_id == 2).Count() > 0)
            {

                if (usrId != ctx.Achevements.Where(a => a.badge_id == 2).FirstOrDefault().AspNetUser.Id)
                {

                    var lachev = ctx.Achevements.Where(a => a.badge_id == 2).FirstOrDefault();
                    ctx.Achevements.Remove(lachev);
                    ctx.SaveChanges();

                    Achevement achev = new Achevement()
                    {
                        user_id = usrId,
                        badge_id = 2,
                        date = DateTime.Now
                    };

                    ctx.Achevements.Add(achev);
                    ctx.SaveChanges();
                }
            }
            else
            {
                Achevement achev = new Achevement()
                {
                    user_id = usrId,
                    badge_id = 2,
                    date = DateTime.Now
                };

                ctx.Achevements.Add(achev);
                ctx.SaveChanges();
            }
        }

        public static void updatePlayerWeekBadge()
        {
            DateTime week = DateTime.Now.AddDays(-7);

            var usrId = (from score in ctx.Scores
                         where (score.date_scored > week)
                         group score by score.AspNetUser.UserName into g
                         select new { score = g.Sum(s => s.score1), id = g.FirstOrDefault().AspNetUser.Id }).OrderByDescending(r => r.score).FirstOrDefault().id;

            if (ctx.Achevements.Where(a => a.badge_id == 3).Count() > 0)
            {
                if (usrId != ctx.Achevements.Where(a => a.badge_id == 3).FirstOrDefault().AspNetUser.Id)
                {
                    var lachev = ctx.Achevements.Where(a => a.badge_id == 3).FirstOrDefault();
                    ctx.Achevements.Remove(lachev);
                    ctx.SaveChanges();

                    Achevement achev = new Achevement()
                    {
                        user_id = usrId,
                        badge_id = 3,
                        date = DateTime.Now
                    };

                    ctx.Achevements.Add(achev);
                    ctx.SaveChanges();
                }

            }
            else
            {
                Achevement achev = new Achevement()
                {
                    user_id = usrId,
                    badge_id = 3,
                    date = DateTime.Now
                };

                ctx.Achevements.Add(achev);
                ctx.SaveChanges();
            }
        }

        public static void updateBadges()
        {

            if (ctx.Scores.Count() > 0)
            {

                updateBestPlayerBadge();
                updateHighestScoreBadge();
                updatePlayerWeekBadge();
            }
        }

        public static List<Badge> getUserBadges()
        {
            var usrName = HttpContext.Current.User.Identity.Name;
            var usrId = ctx.AspNetUsers.FirstOrDefault(r => r.UserName == usrName).Id;
            List<Badge> badges = new List<Badge>();
            badges = ctx.Achevements.Where(a => a.AspNetUser.Id == usrId).Select(s => s.Badge).ToList();
            return badges;
        }
    }

}