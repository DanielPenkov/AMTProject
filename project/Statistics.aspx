<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Statistics.aspx.cs" Inherits="project.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="stat-head">    <img src="Content/images/stat_head.png" alt="head" width="100%"> </div>

     <div class="col-md-3 results-block">

           <div class ="results-head">  <asp:Image ID="Image_hs" runat="server" ImageUrl="http://res.cloudinary.com/hmn3z3apa/image/upload/v1429908335/1429925837_cup-32_jemt17.png" /> BEST PLAYERS</div>
             
           <asp:ListView ID="ListView3" runat="server" DataSourceID="ObjectDataSource3">
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
                   <table runat="server" class ="table table-striped ">
                       <tr runat="server">
                           <td runat="server">
                               <table id="itemPlaceholderContainer" runat="server" border="0" style="">
                                   <tr runat="server" style="">
                                       <th runat="server">User name</th>
                                       <th runat="server">Total Points</th>
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
           <asp:ObjectDataSource ID="ObjectDataSource3" runat="server" SelectMethod="GetBestUsersTotal" TypeName="project.Models.UsersGameModel"></asp:ObjectDataSource>
             
        </div>
    <div class="col-md-3 results-block">

         <div class ="results-head">
             <asp:Image ID="Image1" runat="server" ImageUrl="http://res.cloudinary.com/hmn3z3apa/image/upload/v1429908335/1429926058_schedule_at29sn.png" />
          PLAYERS OF THE WEEK
             </div>

         <asp:ListView ID="ListView2" runat="server" DataSourceID="ObjectDataSource2">
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
                 <table runat="server" class ="table table-striped ">
                     <tr runat="server">
                         <td runat="server">
                             <table id="itemPlaceholderContainer" runat="server" border="0" style="">
                                 <tr runat="server" style="">
                                     <th runat="server">User name</th>
                                     <th runat="server"> Total Points</th>
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
         <asp:ObjectDataSource ID="ObjectDataSource2" runat="server" SelectMethod="GetBestUsersWeek" TypeName="project.Models.UsersGameModel"></asp:ObjectDataSource>
             
        </div>

 <div class="col-md-4 results-block my-results">

     <div class ="results-head">
    <asp:Image ID="Image2" runat="server" ImageUrl="http://res.cloudinary.com/hmn3z3apa/image/upload/v1430077626/1430095536_user-32_miky20.png" /> MY ACHIEVEMENTS
         </div>
             
             
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
             <table runat="server" class ="table table-striped ">
                 <tr runat="server">
                     <td runat="server">
                         <table id="itemPlaceholderContainer" runat="server" border="0" style="">
                             <tr runat="server" style="">
                                 <th runat="server"></th>
                                 <th runat="server"></th>
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
     <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="MyResults" TypeName="project.Models.UsersGameModel"></asp:ObjectDataSource>
         <div class="sidebar-title">BADGES</div>
            <div class="sidebar-table">
                <asp:Label ID="badgeLabel" runat="server"/>
                <asp:image id="img1" runat="server" />
                <asp:image id="img2" runat="server" />
                <asp:image id="img3" runat="server" />

            </div>
             
   </div>
     
      


</asp:Content>
