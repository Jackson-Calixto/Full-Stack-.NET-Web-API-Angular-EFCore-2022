using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Models;

namespace ProEventos.Persistence
{
    public class PalestrantePersist : GeralPersist, IPalestrantePersist
    {
        private readonly ProEventosContext _context;
        public PalestrantePersist(ProEventosContext context) : base(context)
        {
            _context = context;
        }
        public async Task<PageList<Palestrante>> GetAllPalestrantesAsync(PageParams pageParams, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.AsNoTracking()
                .Include(p => p.User)
                .Include(p => p.RedesSociais);

            if (includeEventos)
            {
                query = query
                    .Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }

            query = query
                .Where(p => p.User.Funcao == Domain.Enum.Funcao.Palestrante
                         && (p.User.PrimeiroNome.ToLower().Contains(pageParams.Term.ToLower())
                         || p.User.UltimoNome.ToLower().Contains(pageParams.Term.ToLower())
                         || p.MiniCurriculo.ToLower().Contains(pageParams.Term.ToLower())))
                .OrderBy(p => p.Id);

            return await PageList<Palestrante>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }
        public async Task<Palestrante> GetPalestrantesByIdAsync(int userId, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.AsNoTracking()
                .Include(p => p.User)
                .Include(p => p.RedesSociais);

            if (includeEventos)
            {
                query = query
                    .Include(p => p.PalestrantesEventos)
                    .ThenInclude(pe => pe.Evento);
            }

            query = query.OrderBy(p => p.Id)
                .Where(p => p.UserId == userId);

            return await query.FirstOrDefaultAsync();
        }
    }
}