# Full-Stack-.NET-Web-API-Angular-EFCore-2022
Angular e ASP.NET Core Web API, Entity Framework Core e ASP.NET Core Identity

C# @Installed
C# - Microsoft
C# Extensions - JosKreativ
C# XML Documentation Comments - Keisuke Kato
NuGet Gallery - pcislo
.NET Core Tools - Jun Han
.NET Core Test Explorer - Jun Han
GitLens — Git supercharged - GitKraken
Ctrl+P
>OmniSharp: Select Project
If not working, is being recommended to install another version
C# v1.23.17

In the Front App, run...
NPM INSTALL
After that run...
ng serve -o

In the Back, run...
dotnet tool uninstall --global dotnet-ef
dotnet tool install --global dotnet-ef --version 5.0.2
dotnet tool list -g
D:\Code\ProEventos\Back\src> dotnet ef database update -s .\ProEventos.API\
dotnet watch run -p .\ProEventos.API\

Starting from Zero
dotnet new globaljson --sdk-version 5.0.408 --force

dotnet new webapi -n ProjName -f net5.0 

Postman review

For a sigle Object:
        public Evento Get()
        {
            return new Evento(){
                EventoId = 1,
                Tema = "Angular 11 e .NET 5",
                Local = "Belo Horizonte",
                Lote = 250,
                DataEvento =  DateTime.Now.AddDays(2).ToString(),
                ImagemURL = "foto.png"
            };
        }

For a list of Object
       public IEnumerable<Evento> Get()
        {
            return new Evento[] {
                new Evento(){
                    EventoId = 1,
                    Tema = "Angular 11 e .NET 5",
                    Local = "Belo Horizonte",
                    Lote = 250,
                    DataEvento =  DateTime.Now.AddDays(2).ToString(),
                    ImagemURL = "foto.png"
                },
                new Evento(){
                    EventoId = 2,
                    Tema = "Studing Angular 11 e .NET 5",
                    Local = "Araquari",
                    Lote = 1000,
                    DataEvento =  DateTime.Now.AddDays(2).ToString(),
                    ImagemURL = "eu.png"
                }
            };
        }

Filtering results
        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id){
            return _evento.Where(evento => evento.EventoId == id);
        }

EF Core
DataContext.cs
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options) {}
        public DbSet<Evento> Eventos {get; set;}
    }

appsettings.Development.json
  "ConnectionStrings": {
    "Default":"Data Source=ProEventos.db"
  },

Startup.cs
public void ConfigureServices(IServiceCollection services)
            services.AddDbContext<DataContext>(
                context => context.UseSqlite(Configuration.GetConnectionString("Default"))
            );

dotnet ef migrations add Migration1 -o .\Data\Migrations
dotnet ef database update
dotnet ef migrations add Migration2 -o .\Data\Migrations
dotnet ef database update

Reverting Migrations
dotnet ef migrations list
dotnet ef database update Migration1
dotnet ef migrations remove
dotnet ef migrations add MigrationX -o .\Data\Migrations
dotnet ef database update

 private readonly DataContext _context;

        public EventoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
         public IEnumerable<Evento> Get()
        {
            return _context.Eventos;
        }

Angular Setup
install npm LTS
npm install -g @angular/cli

Angular Essentials - John Papa
Angular Files - Alexander Ivanichev
Auto Close Tag - Jun Han
Auto Rename Tag - Jun Han
Color Highlight - Sergii N
GitLens — Git supercharged - GitKraken
Path Intellisense - Christian Kohler
ESLint - Microsoft

New Angular Project
ng new AngularProject
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss                ]

Starting Project
package.json
npm start / ng serve
Update package.json
from: "start": "ng serve", to: "start": "ng serve -o", will start and open...

ng generate component / ng g c

npm install @fortawesome/fontawesome-free --save
npm install ngx-bootstrap --save
npm install bootstrap@4

Adding nav bar
https://getbootstrap.com/docs/5.2/components/navbar/#nav
Copy HTML
src\app -> Generate Componet [nav]

*ngIf Diretivas Estrutrurais
{{}} Interpolação
[] Property Binding

On app.module.ts
imports [FormsModule] to use [(ngModel)]="variable"

Form changed to Div to be presented in the future

dotnet new sln -n ProEventos  
dotnet new classlib -n ProEventos.Application
dotnet sln .\ProEventos.sln add .\ProEventos.Application\
dotnet add .\ProEventos.Application\ProEventos.Application.csproj reference .\ProEventos.Persistence\

Ctrl+D Select Matches

dotnet ef migrations add Initial -p .\ProEventos.Persistence\ -s .\ProEventos.API\
dotnet ef database update -s .\ProEventos.API\

Front End
models/generate interface
copy props from back to front

services/generate service
"name in lowercase".service.ts is added automatically

3 options for injectables
1.
@Injectable({
  providedIn: 'root',
})

2.
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventoService]
})
3.
in app.module.ts
providers: [EventoService],

https://www.npmjs.com/package/ngx-spinner
Working Demo has code generator to init ngx-spinner

Updating Angular
ng update @angular/core @angular/cli

Input parameters for components
in component.ts
@Input() titulo: string = '';

in component.html
{{titulo}}

Using and Passing parameter
<app-titulo [titulo]="'Palestrantes'"></app-titulo>