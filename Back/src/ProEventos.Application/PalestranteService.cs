using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;
using ProEventos.Persistence.Models;

namespace ProEventos.Application
{
    public class PalestranteService : IPalestranteService
    {
        private readonly IPalestrantePersist _palestrantePersist;
        private readonly IMapper _mapper;
        public PalestranteService(IPalestrantePersist palestrantePersist,
                                  IMapper mapper)
        {
            _palestrantePersist = palestrantePersist;
            _mapper = mapper;
        }
        public async Task<PalestranteDto> AddPalestrante(int userId, PalestranteAddDto model)
        {
            try
            {
                var palestrante = _mapper.Map<Palestrante>(model);
                palestrante.UserId = userId;

                _palestrantePersist.Add<Palestrante>(palestrante);

                if (await _palestrantePersist.SaveChangesAsync())
                {
                    var retorno = await _palestrantePersist.GetPalestrantesByIdAsync(userId, false);

                    return _mapper.Map<PalestranteDto>(retorno);
                }
                return null;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public async Task<PalestranteDto> UpdatePalestrante(int userId, PalestranteUpdateDto model)
        {
            try
            {
                Palestrante palestrante = await _palestrantePersist.GetPalestrantesByIdAsync(userId, false);
                if (palestrante == null) return null;

                model.Id = palestrante.Id;
                model.UserId = userId;

                _mapper.Map(model, palestrante);

                _palestrantePersist.Update<Palestrante>(palestrante);
                if (await _palestrantePersist.SaveChangesAsync())
                {
                    var retorno = await _palestrantePersist.GetPalestrantesByIdAsync(userId, false);

                    return _mapper.Map<PalestranteDto>(retorno);
                }
                return null;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public async Task<bool> DeletePalestrante(int userId, int palestranteId)
        {
            try
            {
                Palestrante palestrante = await _palestrantePersist.GetPalestrantesByIdAsync(userId, false);
                if (palestrante == null) throw new Exception("Palestrante para delete não foi encontrado.");

                _palestrantePersist.Delete<Palestrante>(palestrante);
                return await _palestrantePersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<PageList<PalestranteDto>> GetAllPalestrantesAsync(int userId, PageParams pageParams, bool includeEventos = false)
        {
            try
            {
                var palestrantes = await _palestrantePersist.GetAllPalestrantesAsync(pageParams, includeEventos);
                if (palestrantes == null) return null;

                var resultados = _mapper.Map<PageList<PalestranteDto>>(palestrantes);

                resultados.CurrentPage = palestrantes.CurrentPage;
                resultados.TotalPages = palestrantes.TotalPages;
                resultados.PageSize = palestrantes.PageSize;
                resultados.TotalCount = palestrantes.TotalCount;

                return resultados;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<PalestranteDto> GetPalestranteByIdAsync(int userId, int palestranteId, bool includeEventos = false)
        {
            try
            {
                var palestrante = await _palestrantePersist.GetPalestrantesByIdAsync(userId, includeEventos);
                if (palestrante == null) return null;


                // var palestranteRetorno = new PalestranteDto() {                    
                //     Id = palestrante.Id,
                //     Local = palestrante.Local,
                //     DataPalestrante = palestrante.DataPalestrante.ToString(),
                //     Tema = palestrante.Tema,
                //     QtdPessoas = palestrante.QtdPessoas,
                //     ImagemURL = palestrante.ImagemURL,
                //     Telefone = palestrante.Telefone,
                //     Email = palestrante.Email,
                // };
                var resultado = _mapper.Map<PalestranteDto>(palestrante);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}