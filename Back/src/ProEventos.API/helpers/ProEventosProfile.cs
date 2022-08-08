using AutoMapper;
using ProEventos.API.Dtos;
using ProEventos.Domain;

namespace ProEventos.API.helpers
{
    public class ProEventosProfile : Profile
    {
        public ProEventosProfile(){
            CreateMap<Evento, EventoDto>();
        }        
    }
}