using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Domain.Identity
{
    public class Role
    {
        public IEnumerable<UserRole> UserRoles { get; set; }
    }
}