using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using be.Models;

namespace be.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<StudentInfo> StudentInfos { get; set; }
        public DbSet<Daily> Dailies { get; set; }
        public DbSet<HeThongPhanPhoi> HeThongPhanPhois { get; set; }
        public DbSet<SomeEntity> SomeEntities { get; set; }
        public DbSet<UserRoleRequest> UserRoleRequest { get; set; }
        public DbSet<ApplicationUser> ApplicationUser { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Daily>()
                .HasOne(d => d.HeThongPhanPhoi)
                .WithMany(h => h.Dailys)
                .HasForeignKey(d => d.MaHTPP)
                .HasPrincipalKey(h => h.MaHTPP);
        }
        public DbSet<be.Models.God> God { get; set; } = default!;
    }
}
