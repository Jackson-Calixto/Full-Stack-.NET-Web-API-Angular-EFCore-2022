using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
    public class RedeSocialService : IRedeSocialService
    {
        private readonly IRedeSocialPersist _redeSocialPersist;
        private readonly IMapper _mapper;
        public RedeSocialService(IGeralPersist geralPersist,
                             IRedeSocialPersist redeSocialPersist,
                             IMapper mapper)
        {
            _redeSocialPersist = redeSocialPersist;
            _mapper = mapper;
        }

        public async Task<bool> DeleteByEvento(int eventoId, int redeSocialId)
        {
            try
            {
                var redeSocial = await _redeSocialPersist.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
                if (redeSocial == null) throw new Exception("RedeSocial para delete não foi encontrado.");

                _redeSocialPersist.Delete<RedeSocial>(redeSocial);
                return await _redeSocialPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto> GetRedeSocialEventoByIds(int eventoId, int redeSocialId)
        {
            try
            {
                var redeSocial = await _redeSocialPersist.GetRedeSocialEventoByIdsAsync(eventoId, redeSocialId);
                if (redeSocial == null) return null;

                var resultado = _mapper.Map<RedeSocialDto>(redeSocial);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto[]> GetAllByEvento(int eventoId)
        {
            try
            {
                var redeSocials = await _redeSocialPersist.GetAllByEventoIdAsync(eventoId);
                if (redeSocials == null) return null;

                var resultado = _mapper.Map<RedeSocialDto[]>(redeSocials);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task AddRedeSocial(int? eventoId, int? palestranteId, RedeSocialDto model)
        {
            try
            {
                var redeSocial = _mapper.Map<RedeSocial>(model);

                redeSocial.EventoId = eventoId;
                redeSocial.PalestranteId = palestranteId;

                _redeSocialPersist.Add<RedeSocial>(redeSocial);

                await _redeSocialPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
        public async Task<RedeSocialDto[]> SaveByEvento(int eventoId, RedeSocialDto[] models)
        {
            try
            {
                var redeSocials = await _redeSocialPersist.GetAllByEventoIdAsync(eventoId);
                if (redeSocials == null) return null;

                foreach (var model in models)
                {

                    if (model.Id == 0)
                    {
                        await AddRedeSocial(eventoId, null, model);
                    }
                    else
                    {
                        var redeSocial = redeSocials.FirstOrDefault(redeSocial => redeSocial.Id == model.Id);
                        model.EventoId = eventoId;

                        _mapper.Map(model, redeSocial);
                        _redeSocialPersist.Update<RedeSocial>(redeSocial);
                        await _redeSocialPersist.SaveChangesAsync();
                    }
                }

                var retorno = await _redeSocialPersist.GetAllByEventoIdAsync(eventoId);

                return _mapper.Map<RedeSocialDto[]>(retorno);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteByPalestrante(int palestranteId, int redeSocialId)
        {
            try
            {
                var redeSocial = await _redeSocialPersist.GetRedeSocialPalestranteByIdsAsync(palestranteId, redeSocialId);
                if (redeSocial == null) throw new Exception("RedeSocial para delete não foi encontrado.");

                _redeSocialPersist.Delete<RedeSocial>(redeSocial);
                return await _redeSocialPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto> GetRedeSocialPalestranteByIds(int palestranteId, int redeSocialId)
        {
            try
            {
                var redeSocial = await _redeSocialPersist.GetRedeSocialPalestranteByIdsAsync(palestranteId, redeSocialId);
                if (redeSocial == null) return null;

                var resultado = _mapper.Map<RedeSocialDto>(redeSocial);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto[]> GetAllByPalestrante(int palestranteId)
        {
            try
            {
                var redeSocials = await _redeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);
                if (redeSocials == null) return null;

                var resultado = _mapper.Map<RedeSocialDto[]>(redeSocials);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RedeSocialDto[]> SaveByPalestrante(int palestranteId, RedeSocialDto[] models)
        {
            try
            {
                var redeSocials = await _redeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);
                if (redeSocials == null) return null;

                foreach (var model in models)
                {

                    if (model.Id == 0)
                    {
                        await AddRedeSocial(null, palestranteId, model);
                    }
                    else
                    {
                        var redeSocial = redeSocials.FirstOrDefault(redeSocial => redeSocial.Id == model.Id);
                        model.PalestranteId = palestranteId;

                        _mapper.Map(model, redeSocial);
                        _redeSocialPersist.Update<RedeSocial>(redeSocial);
                        await _redeSocialPersist.SaveChangesAsync();
                    }
                }

                var retorno = await _redeSocialPersist.GetAllByPalestranteIdAsync(palestranteId);

                return _mapper.Map<RedeSocialDto[]>(retorno);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}