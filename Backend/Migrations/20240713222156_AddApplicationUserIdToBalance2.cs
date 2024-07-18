using Microsoft.EntityFrameworkCore.Migrations;

namespace Backend.Migrations
{
    public partial class AddApplicationUserIdToBalance2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Remove all data from tables
            migrationBuilder.Sql(@"
                DELETE FROM Incomes;
                DELETE FROM Expenses;
                DELETE FROM Balances;
                DELETE FROM AspNetUserRoles;
                DELETE FROM AspNetUserClaims;
                DELETE FROM AspNetUserLogins;
                DELETE FROM AspNetUserTokens;
                DELETE FROM AspNetUsers;
                DELETE FROM AspNetRoles;
                DELETE FROM AspNetRoleClaims;
            ");

            // Check if ApplicationUserId column exists
            migrationBuilder.Sql(@"
                IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
                    WHERE TABLE_NAME = 'Balances' AND COLUMN_NAME = 'ApplicationUserId')
                BEGIN
                    ALTER TABLE Balances ADD ApplicationUserId nvarchar(450) NOT NULL DEFAULT '';
                END
                ELSE
                BEGIN
                    ALTER TABLE Balances ALTER COLUMN ApplicationUserId nvarchar(450) NOT NULL;
                END
            ");

            // Drop the index if it exists
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Balances_ApplicationUserId' AND object_id = OBJECT_ID('Balances'))
                BEGIN
                    DROP INDEX IX_Balances_ApplicationUserId ON Balances;
                END
            ");

            // Create the unique index
            migrationBuilder.CreateIndex(
                name: "IX_Balances_ApplicationUserId",
                table: "Balances",
                column: "ApplicationUserId",
                unique: true);

            // Drop the foreign key if it exists
            migrationBuilder.Sql(@"
                IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Balances_AspNetUsers_ApplicationUserId')
                BEGIN
                    ALTER TABLE Balances DROP CONSTRAINT FK_Balances_AspNetUsers_ApplicationUserId;
                END
            ");

            // Add the foreign key
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