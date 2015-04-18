<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Statistics.aspx.cs" Inherits="project.About" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
 <div class="coll-md-2">
             <asp:ListView ID="ListView1" runat="server" DataSourceID="ObjectDataSource1">
                 <AlternatingItemTemplate>
                     <tr style="background-color:#FFF8DC;">
                         <td>
                             <asp:Label ID="KeyLabel" runat="server" Text='<%# Eval("Key") %>' />
                         </td>
                         <td>
                             <asp:Label ID="ValueLabel" runat="server" Text='<%# Eval("Value") %>' />
                         </td>
                     </tr>
                 </AlternatingItemTemplate>
                 <EditItemTemplate>
                     <tr style="background-color:#008A8C;color: #FFFFFF;">
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
                     <table runat="server" style="background-color: #FFFFFF;border-collapse: collapse;border-color: #999999;border-style:none;border-width:1px;">
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
                     <tr style="background-color:#DCDCDC;color: #000000;">
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
                                 <table id="itemPlaceholderContainer" runat="server" border="1" style="background-color: #FFFFFF;border-collapse: collapse;border-color: #999999;border-style:none;border-width:1px;font-family: Verdana, Arial, Helvetica, sans-serif;">
                                     <tr runat="server" style="background-color:#DCDCDC;color: #000000;">
                                         <th runat="server">User name</th>
                                         <th runat="server">Points</th>
                                     </tr>
                                     <tr id="itemPlaceholder" runat="server">
                                     </tr>
                                 </table>
                             </td>
                         </tr>
                         <tr runat="server">
                             <td runat="server" style="text-align: center;background-color: #CCCCCC;font-family: Verdana, Arial, Helvetica, sans-serif;color: #000000;"></td>
                         </tr>
                     </table>
                 </LayoutTemplate>
                 <SelectedItemTemplate>
                     <tr style="background-color:#008A8C;font-weight: bold;color: #FFFFFF;">
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

</asp:Content>
