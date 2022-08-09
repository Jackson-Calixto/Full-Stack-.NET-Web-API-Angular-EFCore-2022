using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }   
        public string Local { get; set; }
        public string DataEvento { get; set; }
        // [Required(ErrorMessage ="{0} é obrigatório.")]
        // [MinLength(4, ErrorMessage ="{0} deve ter no mínimo 4 caractéres.")]
        // [MaxLength(50, ErrorMessage ="{0} deve ter no máximo 50 caractéres.")]

        // [Required(ErrorMessage ="{0} é obrigatório."),
        // MinLength(4, ErrorMessage ="{0} deve ter no mínimo 4 caractéres."),
        // MaxLength(50, ErrorMessage ="{0} deve ter no máximo 50 caractéres.")]

        [Required(ErrorMessage ="{0} é obrigatório."),
        StringLength(50, MinimumLength = 4, ErrorMessage ="{0} deve ter entre 4 e 50 caractéres.")]
        public string Tema { get; set; }
        [Display(Name ="Qtd Pessosas")]
        [Range(1, 120000, ErrorMessage ="{0} precisa ser entre 1 a 120000.")]
        public int QtdPessoas { get; set; }
        [Display(Name ="Imagem")]
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage ="{0} inválida.")]
        public string ImagemURL { get; set; }
        [Required(ErrorMessage ="{0} é obrigatório.")]
        [Phone(ErrorMessage ="{0} é inválido.")]
        public string Telefone { get; set; }
        [Display(Name ="e-mail")]
        [Required(ErrorMessage ="{0} é obrigatório.")]
        [EmailAddress(ErrorMessage ="{0} precisa ser válido.")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}