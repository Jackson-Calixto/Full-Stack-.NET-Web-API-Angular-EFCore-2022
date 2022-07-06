using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public EventoController()
        {
        }

        [HttpGet]
        public string Get()
        {
            return "Exemplo de Get";
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
