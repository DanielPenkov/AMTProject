<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="project._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
 
<div class="content">
    <div class="head-game">

        <div class="time"> 
             <asp:Label Id="timeboard" runat="server" ></asp:Label>
         </div>

        <div class="score">
             <h1> Score:650</h1>
        </div>

    </div>

    <div class="game">
        <canvas id="canvas" width="400" height="400">  
        </canvas>
  	    <p id="mousepos"></p>
    </div>
      
</div>
    <script type="text/javascript" src="Scripts/game.js"></script>

    <script type="text/javascript">
       loadTimeBoard("<%=timeboard.ClientID %>");       
    </script>

</asp:Content>
  