using AutoMapper;
using ProEventos.Application.Dtos;
using ProEventos.Domain;

namespace ProEventos.Application.helpers
{
    public class ProEventosProfile : Profile
    {
        public ProEventosProfile(){
            CreateMap<Evento, EventoDto>().ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
<<<<<<< HEAD
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ReverseMap();
=======
            CreateMap<Palestrante, PalestranteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocial>().ReverseMap();
>>>>>>> 2de361f085fef2af909c7d275e8fd20568873b0d
        }        
    }
}