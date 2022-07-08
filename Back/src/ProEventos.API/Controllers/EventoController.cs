using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _evento = new Evento[] {
            new Evento(){
                EventoId = 1,
                Tema = "Angular 11 e .NET 5",
                Local = "Belo Horizonte",
                QtdPessoas = 250,
                Lote = "1º Lote",
                DataEvento =  DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                ImagemURL = "foto.png"
            },
            new Evento(){
                EventoId = 2,
                Tema = "Studing Angular 11 e .NET 5",
                Local = "Araquari",
                QtdPessoas = 1000,
                Lote = "2º Lote",
                DataEvento =  DateTime.Now.AddDays(3).ToString("dd/MM/yyyy"),
                ImagemURL = "eu.png"
            }
        }; 
            
        public EventoController()
        {
        }

        [HttpGet]
         public IEnumerable<Evento> Get()
        {
            return _evento;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id){
            return _evento.Where(evento => evento.EventoId == id);
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
