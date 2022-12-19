using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ProEventos.API.Models;

namespace ProEventos.API.Extensions
{
    public static class Pagination
    {
        public static void AddPagination(this HttpResponse response,
            int CurrentPage,
            int PageSize,
            int TotalCount,
            int TotalPages
        )
        {
            var pagination = new PaginationHeader(CurrentPage,
                                                  PageSize,
                                                  TotalCount,
                                                  TotalPages);

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(pagination, options
            ));

            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}