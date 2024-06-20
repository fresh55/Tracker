using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddBalanceIdToIncomes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BalanceId",
                table: "Incomes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BalanceId",
                table: "Expenses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Incomes_BalanceId",
                table: "Incomes",
                column: "BalanceId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_BalanceId",
                table: "Expenses",
                column: "BalanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_Balances_BalanceId",
                table: "Expenses",
                column: "BalanceId",
                principalTable: "Balances",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Incomes_Balances_BalanceId",
                table: "Incomes",
                column: "BalanceId",
                principalTable: "Balances",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_Balances_BalanceId",
                table: "Expenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Incomes_Balances_BalanceId",
                table: "Incomes");

            migrationBuilder.DropIndex(
                name: "IX_Incomes_BalanceId",
                table: "Incomes");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_BalanceId",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "BalanceId",
                table: "Incomes");

            migrationBuilder.DropColumn(
                name: "BalanceId",
                table: "Expenses");
        }
    }
}
