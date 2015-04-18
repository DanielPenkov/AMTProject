<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="project._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

<div class="content">

    <div class="head-game">

        <div class="time"> 
       
            Time:  <asp:Label Id="timeboard" runat="server" >00:00</asp:Label>
       
         </div>

        <div class="score">
             Points:  <asp:Label Id="scoreboard" runat="server" > 0 </asp:Label>
        </div>
    </div>

    <div class="game">
        <div class="col-md-8">
            <canvas id="canvas" width="400" height="400">  
            </canvas>
  	        <p id="mousepos"></p>
         </div>

        <div class="coll-md-2">
            <div class="sidebar-title">BEST USERS</div>
             <asp:ListView ID="ListView1" runat="server" DataSourceID="ObjectDataSource1">
                 <AlternatingItemTemplate>
                     <tr style="">
                         <td>
                             <asp:Label ID="KeyLabel" runat="server" Text='<%# Eval("Key") %>' />
                         </td>
                         <td>
                             <asp:Label ID="ValueLabel" runat="server" Text='<%# Eval("Value") %>' />
                         </td>
                     </tr>
                 </AlternatingItemTemplate>
                 <EditItemTemplate>
                     <tr style="">
                         <td>
                             <asp:Button ID="UpdateButton" runat="server" CommandName="Update" Text="Update" />
                             <asp:Button ID="CancelButton" runat="server" CommandName="Cancel" Text="Cancel" />
                         </td>
                         <td>
                             <asp:TextBox ID="KeyTextBox" runat="server" Text='<%# Bind("Key") %>' />
                         </td>
                         <td>
                             <asp:TextBox ID="ValueTextBox" runat="server" Text='<%# Bind("Value") %>' />
                         </td>
                     </tr>
                 </EditItemTemplate>
                 <EmptyDataTemplate>
                     <table runat="server" style="">
                         <tr>
                             <td>No data was returned.</td>
                         </tr>
                     </table>
                 </EmptyDataTemplate>
                 <InsertItemTemplate>
                     <tr style="">
                         <td>
                             <asp:Button ID="InsertButton" runat="server" CommandName="Insert" Text="Insert" />
                             <asp:Button ID="CancelButton" runat="server" CommandName="Cancel" Text="Clear" />
                         </td>
                         <td>
                             <asp:TextBox ID="KeyTextBox" runat="server" Text='<%# Bind("Key") %>' />
                         </td>
                         <td>
                             <asp:TextBox ID="ValueTextBox" runat="server" Text='<%# Bind("Value") %>' />
                         </td>
                     </tr>
                 </InsertItemTemplate>
                 <ItemTemplate>
                     <tr style="">
                         <td>
                             <asp:Label ID="KeyLabel" runat="server" Text='<%# Eval("Key") %>' />
                         </td>
                         <td>
                             <asp:Label ID="ValueLabel" runat="server" Text='<%# Eval("Value") %>' />
                         </td>
                     </tr>
                 </ItemTemplate>
                 <LayoutTemplate>
                     <table runat="server">
                         <tr runat="server">
                             <td runat="server">
                                 <table id="itemPlaceholderContainer" runat="server" border="0" style="">
                                     <tr runat="server" style="">
                                         <th runat="server">User name</th>
                                         <th runat="server">Points</th>
                                     </tr>
                                     <tr id="itemPlaceholder" runat="server">
                                     </tr>
                                 </table>
                             </td>
                         </tr>
                         <tr runat="server">
                             <td runat="server" style=""></td>
                         </tr>
                     </table>
                 </LayoutTemplate>
                 <SelectedItemTemplate>
                     <tr style="">
                         <td>
                             <asp:Label ID="KeyLabel" runat="server" Text='<%# Eval("Key") %>' />
                         </td>
                         <td>
                             <asp:Label ID="ValueLabel" runat="server" Text='<%# Eval("Value") %>' />
                         </td>
                     </tr>
                 </SelectedItemTemplate>
             </asp:ListView>
             <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="GetAllUsers" TypeName="project.Models.UsersGameModel"></asp:ObjectDataSource>
        </div>
     </div>

    <script type="text/javascript" src="Scripts/game.js"></script>

    <script type="text/javascript">
        loadTimeBoard("<%=timeboard.ClientID %>");  
        loadScoreBoard("<%=scoreboard.ClientID %>"); 

        
        function SaveScores() {
            updateScoreBoard();
            var scoreLabel = document.getElementById('<%=scoreboard.ClientID %>').innerText;
           

            console.log("TOCHKI: " + scoreLabel);
            $.ajax({
                type: "POST",
                url: "Default.aspx/SaveScores",
                data: JSON.stringify({ score: scoreLabel }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                failure: function (response) {
                    alert("Error in saving results");
                }
            });
        }
        function OnSuccess(response) {
          
        }

        function GetImage() {
 
            $.ajax({
                type: "POST",
                url: "Default.aspx/GetImage",
                data: '{ imgTypeId : "1" }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    setImg(response.d);
                  

                },
                failure: function (response) {
                    alert("Error in saving results");
                }
            });

        }
    </script>


    </div>
</asp:Content>
  