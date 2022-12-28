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
    public class EventoPersist : IEventoPersist
    {
        private readonly ProEventosContext _context;
        public EventoPersist(ProEventosContext context)
        {
            _context = context;
            //_context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;         
        }
        public async Task<PageList<Evento>> GetAllEventosAsync(int userId, PageParams pageParams, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos.AsNoTracking()
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }

            query = query
                .Where(e => e.UserId == userId 
                         && (e.Tema.ToLower().Contains(pageParams.Term.ToLower())
                         || e.Local.ToLower().Contains(pageParams.Term.ToLower())))
                .OrderBy(e => e.Id);

            return await PageList<Evento>.CreateAsync(query, pageParams.PageNumber, pageParams.PageSize);
        }
        public async Task<Evento> GetEventosByIdAsync(int userId, int eventoId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos.AsNoTracking()
                .Include(e => e.Lotes)
                .Include(e => e.RedesSociais);

            if (includePalestrantes)
            {
                query = query
                    .Include(e => e.PalestrantesEventos)
                    .ThenInclude(pe => pe.Palestrante);
            }

            query = query
                .Where(e => e.UserId == userId
                         && e.Id == eventoId)
                .OrderBy(e => e.Id);

            return await query.FirstOrDefaultAsync();
        }
    }
}