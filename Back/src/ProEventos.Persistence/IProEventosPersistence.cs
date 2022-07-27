using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence
{
    public interface IProEventosPersistence
    {
        //GERAL
        void Add<T>(T entity) where T: class;
        void Update<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        void DeleteRange<T>(T entity) where T: class;
        Task<bool> SaveChangesAsync();

        //EVENTOS
        Task<Evento[]> GetAllEventosByTemaAsync(string Tema, bool includePalestrantes);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrantes);
        Task<Evento[]> GetEventosByIdAsync(int EventoId, bool includePalestrantes);

        //PALESTRANTES
        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string Nome, bool includeEventos);
        Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);
        Task<Palestrante[]> GetPalestrantesByIdAsync(int PalestranteId, bool includeEventos);        
    }
}