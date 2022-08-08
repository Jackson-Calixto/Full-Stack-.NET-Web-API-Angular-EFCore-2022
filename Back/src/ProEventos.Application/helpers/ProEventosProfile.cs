using AutoMapper;
using ProEventos.Application.Dtos;
using ProEventos.Domain;

namespace ProEventos.Application.helpers
{
    public class ProEventosProfile : Profile
    {
        public ProEventosProfile(){
            CreateMap<Evento, EventoDto>();
        }        
    }
}