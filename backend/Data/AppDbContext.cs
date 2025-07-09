using Microsoft.EntityFrameworkCore;
using be.Models;

namespace be.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<StudentInfo> StudentInfos { get; set; }
        public DbSet<Daily> Dailies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Daily>()
        .HasOne(d => d.HeThongPhanPhoi)
        .WithMany(h => h.Dailys)
        .HasForeignKey(d => d.MaHTPP)
        .HasPrincipalKey(h => h.MaHTPP); // <- EF cần dòng này vì khóa chính là string
}
    }
    
}
