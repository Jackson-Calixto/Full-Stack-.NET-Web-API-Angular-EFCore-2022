using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;
using ProEventos.Application.Dtos;
using Microsoft.AspNetCore.Authorization;
using ProEventos.API.Extensions;

namespace ProEventos.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RedesSociaisController : ControllerBase
    {
        private readonly IRedeSocialService _redeSocialService;
        private readonly IEventoService _eventoService;
        private readonly IPalestranteService _paraEventoService;

        public RedesSociaisController(IRedeSocialService redeSocialService,
                                      IEventoService eventoService,
                                      IPalestranteService paraEventoService)
        {
            _redeSocialService = redeSocialService;
            _eventoService = eventoService;
            _paraEventoService = paraEventoService;
        }

        [HttpGet("evento/{eventoId}")]
        public async Task<IActionResult> GetByEvento(int eventoId)
        {
            try
            {
                if (!(await AutorEvento(eventoId)))
                    return Unauthorized();

                var redesSociais = await _redeSocialService.GetAllByEvento(eventoId);
                if (redesSociais == null) return NoContent();

                return Ok(redesSociais);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Redes Sociais por Evento. Erro: {ex.Message}");
            }
        }

        [HttpGet("palestrante")]
        public async Task<IActionResult> GetByPalestrante()
        {
            try
            {
                var palestrante = await _paraEventoService.GetPalestranteByIdAsync(User.GetUserId());
                if (palestrante == null) return Unauthorized();

                var redesSociais = await _redeSocialService.GetAllByPalestrante(palestrante.Id);
                if (redesSociais == null) return NoContent();

                return Ok(redesSociais);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Redes Sociais por Palestrantes. Erro: {ex.Message}");
            }
        }

        [NonAction]
        private async Task<bool> AutorEvento(int eventoId)
        {
            var evento = await _eventoService.GetEventoByIdAsync(User.GetUserId(), eventoId);

            return evento != null;
        }

        [HttpPut("evento/{eventoId}")]
        public async Task<IActionResult> SaveByEvento(int eventoId, RedeSocialDto[] models)
        {
            try
            {
                if (!(await AutorEvento(eventoId)))
                    return Unauthorized();

                var redeSocial = await _redeSocialService.SaveByEvento(eventoId, models);
                if (redeSocial == null) return BadRequest("Erro ao tentar salvar Redes Sociais por Evento.");

                return Ok(redeSocial);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar Rede Social por Evento. Erro: {ex.Message}");
            }
        }

        [HttpPut("palestrante")]
        public async Task<IActionResult> SaveByPalestrante(int eventoId, RedeSocialDto[] models)
        {
            try
            {
                var palestrante = await _paraEventoService.GetPalestranteByIdAsync(User.GetUserId());
                if (palestrante == null) return Unauthorized();

                var redeSocial = await _redeSocialService.SaveByPalestrante(palestrante.Id, models);
                if (redeSocial == null) return BadRequest("Erro ao tentar salvar Redes Sociais por Palestrante.");

                return Ok(redeSocial);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar Rede Social por Palestrante. Erro: {ex.Message}");
            }
        }

        [HttpDelete("evento/{eventoId}/{redeSocialId}")]
        public async Task<IActionResult> DeleteByEvento(int eventoId, int redeSocialId)
        {
            try
            {
                if (!(await AutorEvento(eventoId)))
                    return Unauthorized();

                var redeSocial = await _redeSocialService.GetRedeSocialEventoByIds(eventoId, redeSocialId);
                if (redeSocial == null) return NoContent();

                return await _redeSocialService.DeleteByEvento(eventoId, redeSocialId) ?
                    Ok(new { message = "Deletado" }) :
                    throw new Exception("Ocorreu um problema não específico ao tentar deletar Rede Social por Evento.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar Rede Social por Evento. Erro: {ex.Message}");
            }
        }

        [HttpDelete("palestrante/{redeSocialId}")]
        public async Task<IActionResult> DeleteByPalestrante(int redeSocialId)
        {
            try
            {
                var palestrante = await _paraEventoService.GetPalestranteByIdAsync(User.GetUserId());
                if (palestrante == null) return Unauthorized();

                var redeSocial = await _redeSocialService.GetRedeSocialPalestranteByIds(palestrante.Id, redeSocialId);
                if (redeSocial == null) return NoContent();

                return await _redeSocialService.DeleteByPalestrante(palestrante.Id, redeSocialId) ?
                    Ok(new { message = "Deletado" }) :
                    throw new Exception("Ocorreu um problema não específico ao tentar deletar Rede Social por Palestrante.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar Rede Social por Palestrante. Erro: {ex.Message}");
            }
        }
    }
}
