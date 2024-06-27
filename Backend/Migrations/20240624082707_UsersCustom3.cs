using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UsersCustom3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
        IF NOT EXISTS (
            SELECT 1 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'AspNetUsers' 
            AND COLUMN_NAME = 'FirstName'
        )
        BEGIN
            ALTER TABLE [AspNetUsers] ADD [FirstName] NVARCHAR(MAX);
        END

        IF NOT EXISTS (
            SELECT 1 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'AspNetUsers' 
            AND COLUMN_NAME = 'LastName'
        )
        BEGIN
            ALTER TABLE [AspNetUsers] ADD [LastName] NVARCHAR(MAX);
        END

        IF NOT EXISTS (
            SELECT 1 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'AspNetUsers' 
            AND COLUMN_NAME = 'UsernameChangeLimit'
        )
        BEGIN
            ALTER TABLE [AspNetUsers] ADD [UsernameChangeLimit] INT DEFAULT 10;
        END
    ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
        IF EXISTS (
            SELECT 1 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'AspNetUsers' 
            AND COLUMN_NAME = 'FirstName'
        )
        BEGIN
            ALTER TABLE [AspNetUsers] DROP COLUMN [FirstName];
        END

        IF EXISTS (
            SELECT 1 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'AspNetUsers' 
            AND COLUMN_NAME = 'LastName'
        )
        BEGIN
            ALTER TABLE [AspNetUsers] DROP COLUMN [LastName];
        END

        IF EXISTS (
            SELECT 1 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'AspNetUsers' 
            AND COLUMN_NAME = 'UsernameChangeLimit'
        )
        BEGIN
            ALTER TABLE [AspNetUsers] DROP COLUMN [UsernameChangeLimit];
        END
    ");
        }
    }
}
