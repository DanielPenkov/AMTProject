using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace project
{
    public partial class About : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            setBadge();
          
        }


        public void setBadge()
        {

            if (System.Web.HttpContext.Current.User.Identity.IsAuthenticated)
            {

                List<String> badges = project.Models.UsersGameModel.getUserBadges();

                if (badges.Count() == 1)
                {

                    img1.ImageUrl = badges[0];

                }

                else if (badges.Count() == 2)
                {

                    img1.ImageUrl = badges[0];
                    img2.ImageUrl = badges[1];

                }
                else if (badges.Count() == 3)
                {

                    img1.ImageUrl = badges[0];
                    img2.ImageUrl = badges[1];
                    img3.ImageUrl = badges[2];


                }
                else
                {

                    badgeLabel.Text = " You don`t have any badges yet!";

                }

            }
            else
            {


                badgeLabel.Text = " You don`t have any badges yet!";

            }

        }

    }
}