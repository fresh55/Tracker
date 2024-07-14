using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddApplicationUserIdToBalance2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Balances",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Balances_ApplicationUserId",
                table: "Balances",
                column: "ApplicationUserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Balances_AspNetUsers_ApplicationUserId",
                table: "Balances",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Balances_AspNetUsers_ApplicationUserId",
                table: "Balances");

            migrationBuilder.DropIndex(
                name: "IX_Balances_ApplicationUserId",
                table: "Balances");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Balances");
        }
    }
}
