using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Application.Dtos;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<EventoDto> AddEvento(EventoDto model);
        Task<EventoDto> UpdateEvento(int eventoId, EventoDto model);
        Task<bool> DeleteEvento(int eventoId);
        Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false);
        Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false);
        Task<EventoDto> GetEventosByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}