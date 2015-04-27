function SaveScores(scoreLabel) {

    //var scoreLabel = document.getElementById('<%=scoreboard.ClientID %>').innerText;
    $.ajax({
        type: "POST",
        async: false,
        url: "Default.aspx/SaveScores",
        data: JSON.stringify({ score: scoreLabel }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        failure: function (response) {
            alert("Error in saving results!");
        }
    });
}


function getImage(levelId) {

    var data = "{imgTypeId :" + levelId + "}";

    $.ajax({
        type: "POST",
        url: "Default.aspx/GetImage",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            setLevelImages(response.d);


        },
        failure: function (response) {
            alert("Error in loading images, Please try again!");
        }
    });

}

function getLevel(levelId) {

    var data = "{id :" + levelId + "}";

    $.ajax({
        type: "POST",
        url: "Default.aspx/GetLevel",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            setLevelData(response.d);
            getImage(response.d[0]);

        },
        failure: function (response) {
            alert("Error in loading images, Please try again!");
        }
    });

}