namespace Tracker
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // Consider storing passwords securely
        public DateTime CreatedAt { get; set; }

        // Relationships, e.g., a user can have multiple invoices
        public List<Invoice> Invoices { get; set; } = new List<Invoice>();
    }
}
