namespace IdentityService;

public class RegisterViewModel
{
    public required string Email { get; set; }

    public required string Password { get; set; }

    public required string Username { get; set; }

    public required string FullName { get; set; }

    public string? ReturnUrl { get; set; }

    public string? Button { get; set; }
}