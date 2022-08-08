using System.Collections.Generic;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }   
        public string Local { get; set; }
        public string DataEvento { get; set; }
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
<<<<<<< HEAD
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
=======
        public IEnumerable<PalestranteDto> PalestrantesEventos { get; set; }
>>>>>>> 2de361f085fef2af909c7d275e8fd20568873b0d
    }
}