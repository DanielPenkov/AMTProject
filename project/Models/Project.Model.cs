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
           
        }
        
        public static Dictionary<String,String> GetAllUsers()
        {

           List<AspNetUser> users = new List<AspNetUser>();
            var result = from r in ctx.AspNetUsers select r;
            users = result.ToList();
            var scoreBoard = new Dictionary<string, string>();
            foreach (var user in users) {
                string username = user.UserName;
                string scores = "0";

                if (user.Scores.Count > 0)
                {
                    scores = user.Scores.Max(s => s.score1).ToString();
                }
                else {

                     scores = "0";
                }

               
                scoreBoard.Add(username,scores);

            }

            return scoreBoard;

           
        }

        public static List<string> GetImage( int typeId) {

           List<string> imgSrcList = new List<string>();
           List<Image> imagesArray = ctx.Images.Where(i => i.type_id == typeId).ToList();

           foreach (Image image in imagesArray) {

               imgSrcList.Add(image.src);
            
           }

           return imgSrcList;
        
        }
    }
}