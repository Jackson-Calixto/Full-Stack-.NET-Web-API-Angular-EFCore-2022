using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.Persistence;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {        
        private readonly ProEventosContext _context;

        public EventosController(ProEventosContext context)
        {
            _context = context;
        }

        [HttpGet]
         public IEnumerable<Evento> Get()
        {
            return _context.Eventos;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id){
            return _context.Eventos.Where(evento => evento.Id == id);
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
