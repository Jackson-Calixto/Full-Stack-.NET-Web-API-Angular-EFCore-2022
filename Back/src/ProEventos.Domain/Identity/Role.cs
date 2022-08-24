using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ProEventos.Domain.Identity
{
    public class Role:IdentityRole<int>
    {
        public IEnumerable<UserRole> UserRoles { get; set; }
    }
}