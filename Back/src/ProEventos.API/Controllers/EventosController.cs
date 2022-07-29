using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.Persistence;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {   
        private readonly IEventoService _eventoService;
        public EventosController(IEventoService eventoService)
        {
            _eventoService = eventoService;            
        }

        [HttpGet]
         public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosAsync(true);
                if (eventos == null) return NotFound("Nenhum evento encontrado.");

                return Ok(eventos);
            }
            catch (Exception ex)
            {                               
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id){
            try
            {
                var evento = await _eventoService.GetEventosByIdAsync(id, true);
                if (evento == null) return NotFound("Nenhum evento encontrado por id.");

                return Ok(evento);
            }
            catch (Exception ex)
            {                               
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar evento por id. Erro: {ex.Message}");
            }
        }

        [HttpGet("/tema/{id}")]
        public async Task<IActionResult> GetByTema(string tema){
            try
            {
                var eventos = await _eventoService.GetAllEventosByTemaAsync(tema, true);
                if (eventos == null) return NotFound("Nenhum evento encontrado por tema.");

                return Ok(eventos);
            }
            catch (Exception ex)
            {                               
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar evento por tema. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public string PodeSerPostOuOutroNomeDeFuncao()
        {
            return "Exemplo de Post";
        }

        [HttpPut("{id}")]
        public string PutOuOutroNomeDeFuncao(int id)
        {
            return "Exemplo de Put";
        }

        [HttpDelete("{id}")]
        public string DeleteOuOutroNomeDeFuncao(int id)
        {
            return "Exemplo de Delete";
        }
    }
}
