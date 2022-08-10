using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Application.Dtos;
using ProEventos.Domain;

namespace ProEventos.Application.Contratos
{
    public interface ILoteService
    {
        Task<LoteDto> AddLote(LoteDto model);
        Task<LoteDto> UpdateLote(int eventoId, LoteDto[] models);
        Task<bool> DeleteLote(int eventoId);
        Task<LoteDto[]> GetAllLotesAsync(bool includePalestrantes = false);
        Task<LoteDto[]> GetAllLotesByTemaAsync(string tema, bool includePalestrantes = false);
        Task<LoteDto> GetLotesByIdAsync(int eventoId, bool includePalestrantes = false);
    }
}