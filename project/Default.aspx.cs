using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace project
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
          
                setBadge();                        
        }

        [System.Web.Services.WebMethod]
        public static void SaveScores(string score)
        {
            int scoreResult = Int32.Parse(score);
            project.Models.UsersGameModel.AddScores(scoreResult);
        }


        [System.Web.Services.WebMethod]
        public static List<string> GetImage(string imgTypeId)
        {

            int imgId = Int32.Parse(imgTypeId);
            List<string> allImages = project.Models.UsersGameModel.GetImage(imgId);
            return allImages;

        }


        [System.Web.Services.WebMethod]
        public static List<string> GetLevel(string id)
        {

            int lvlId = Int32.Parse(id);
            List<string> levelData = project.Models.UsersGameModel.GetLevel(lvlId);
            return levelData;

        }

        public void setBadge() {

            if (System.Web.HttpContext.Current.User.Identity.IsAuthenticated)
            {
                List<Badge> badges = project.Models.UsersGameModel.getUserBadges();


                if (badges.Count() == 1) {

                    img1.ImageUrl = badges[0].img_src;
                    LabelBadge1.Text = badges[0].name;
                }

                else if (badges.Count() == 2)
                {
                    img1.ImageUrl = badges[0].img_src;
                    LabelBadge1.Text = badges[0].name;
                    img2.ImageUrl = badges[1].img_src;
                    LabelBadge2.Text = badges[1].name;
                }
                else if (badges.Count() == 3)
                {
                    img1.ImageUrl = badges[0].img_src;
                    LabelBadge1.Text = badges[0].name;
                    img2.ImageUrl = badges[1].img_src;
                    LabelBadge2.Text = badges[1].name;
                    img3.ImageUrl = badges[2].img_src;
                    LabelBadge3.Text = badges[2].name;


                }
                else {

                    img1.Visible=false;
                    LabelBadge1.Visible = false;
                    img2.Visible = false;
                    LabelBadge2.Visible = false;
                    img3.Visible = false;
                    LabelBadge3.Visible = false;


                    badgeLabel.Text = " You don`t have any badges yet!";
                }

            }
            else {

                img1.Visible = false;
                LabelBadge1.Visible = false;
                img2.Visible = false;
                LabelBadge2.Visible = false;
                img3.Visible = false;
                LabelBadge3.Visible = false;


                badgeLabel.Text = " You don`t have any badges yet!";
            }
        }


        protected void ListViewUsers_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        protected void ObjectDataSource1_Selecting(object sender, ObjectDataSourceSelectingEventArgs e)
        {

        }

        protected void ListView1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        
    }
}