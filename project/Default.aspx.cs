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