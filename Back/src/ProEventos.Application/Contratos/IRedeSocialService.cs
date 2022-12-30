using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Application.Dtos;

namespace ProEventos.Application.Contratos
{
    public interface IRedeSocialService
    {
        Task<RedeSocialDto[]> SaveByEvento(int eventoId, RedeSocialDto[] models);
        Task<bool> DeleteByEvento(int eventoId, int redeSocialId);
        Task<RedeSocialDto[]> GetAllByEvento(int eventoId);
        Task<RedeSocialDto> GetRedeSocialEventoByIds(int eventoId, int redeSocialId);
        Task<RedeSocialDto[]> SaveByPalestrante(int palestranteId, RedeSocialDto[] models);
        Task<bool> DeleteByPalestrante(int palestranteId, int redeSocialId);
        Task<RedeSocialDto[]> GetAllByPalestrante(int palestranteId);
        Task<RedeSocialDto> GetRedeSocialPalestranteByIds(int palestranteId, int redeSocialId);
    }
}