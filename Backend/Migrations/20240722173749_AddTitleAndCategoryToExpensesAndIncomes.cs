using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddTitleAndCategoryToExpensesAndIncomes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Incomes",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Expenses",
                newName: "Title");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Incomes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Expenses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Incomes");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "Expenses");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Incomes",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Expenses",
                newName: "Description");
        }
    }
}
