using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;
using ProEventos.Application.Dtos;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LotesController : ControllerBase
    {   
        private readonly ILoteService _loteService;
        public LotesController(ILoteService loteService)
        {
            _loteService = loteService;            
        }

        [HttpGet("{eventoId}")]
         public async Task<IActionResult> Get(int eventoId)
        {
            try
            {
                var lotes = await _loteService.GetLotesByIdAsync(eventoId, true);
                if (lotes == null) return NoContent();

                return Ok(lotes);
            }
            catch (Exception ex)
            {                               
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar lotes. Erro: {ex.Message}");
            }
        }

        [HttpPut("{eventoId}")]
        public async Task<IActionResult> Put(int eventoId, LoteDto[] models)
        {
            try
            {
                var lote = await _loteService.UpdateLote(eventoId, models);
                if (lote == null) return BadRequest("Erro ao tentar atualizar lote.");

                return Ok(lote);
            }
            catch (Exception ex)
            {                               
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar lote. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{eventoId}/{loteId}")]
        public async Task<IActionResult> Delete(int eventoId, int loteId)
        {
            try
            {
                var lote = await _loteService.GetLotesByIdAsync(loteId, true);
                if (lote == null) return NoContent();

                return await _loteService.DeleteLote(loteId)? 
                    Ok(new {message = "Deletado"}):
                    throw new Exception("Ocorreu um problema não específico ao tentar deletar Lote.");
            }
            catch (Exception ex)
            {                               
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar lote. Erro: {ex.Message}");
            }
        }
    }
}
