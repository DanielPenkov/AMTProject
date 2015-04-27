<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="project._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content">

        <div class="title">
            PUZZLE MEMORY GAME
        </div>

        <div class="game-container">

            <div class="head-game">

                <div class="time">
                    Time:
                    <asp:Label ID="timeboard" runat="server">0 : 0</asp:Label>
                </div>

                <div class="level">
                    Level:
                    <asp:Label ID="levelLbl" runat="server">0</asp:Label>
                </div>

                <div class="score">
                    Points: 
                            <asp:Label ID="scoreboard" runat="server"> 0 </asp:Label>
                </div>
            </div>
            <div class="canvas">
                <canvas id="canvas" width="600" height="400"></canvas>
                <p id="mousepos"></p>
            </div>

            <div class="game-buttons">
                <div id="button-play-again" class="button-game">
                    Try Again
                </div>
                <div id="button-pause" class="button-game">
                    Pause
                </div>
                <div id="button-start" class="button-game">
                    Play now
                </div>

                <div id="button-info" class="button-game">
                    INFO
                </div>
                <div id="button-resume" class="button-game">
                    Resume
                </div>
                <div id="button-next" class="button-game">
                    Next 
                </div>

                <div id="button-exit" class="button-game">
                    Exit game
                </div>

            </div>

        </div>

        <div class="sidebar">
            <div class="sidebar-title">BADGES</div>
            <div class="sidebar-table" id="user_badges" runat="server">

                <asp:Label ID="badgeLabel" runat="server" />

                <div class="badge-image">
                    <asp:Image ID="img1" runat="server" />

                    <asp:Label ID="LabelBadge1" runat="server" CssClass="labl" />
                </div>
                <div class="badge-image">
                    <asp:Image ID="img2" runat="server" />

                    <asp:Label ID="LabelBadge2" runat="server" />
                </div>
                <div class="badge-image">
                    <asp:Image ID="img3" runat="server" />
                    <asp:Label ID="LabelBadge3" runat="server" />
                </div>

            </div>
            <div class="sidebar-title">
                <asp:Image ID="Image_hs" runat="server" ImageUrl="http://res.cloudinary.com/hmn3z3apa/image/upload/v1429908335/1429926218_keditbookmarks_nbs5x5.png" />
                HIGHEST SCORE
            </div>
            <div class="sidebar-table">
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
                        <table runat="server" class="table table-striped ">
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
                <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="GetBestUsers" TypeName="project.Models.UsersGameModel"></asp:ObjectDataSource>
            </div>
        </div>

        <script type="text/javascript">
            loadTimeBoard("<%=timeboard.ClientID %>");
            loadScoreBoard("<%=scoreboard.ClientID %>");
            loadLevel("<%=levelLbl.ClientID %>");
        </script>

    </div>
</asp:Content>
