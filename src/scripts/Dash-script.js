const dadosIniciais = {
    "data": [
        {
            "id": 1,
            "nome": "Leanne",
            "sobrenome": "Graham",
            "cep": "51346587",
            "anonimato": "Sim",
            "email": "Sincere@april.biz",
            "celular": "1-770-736-8031",
            "sobre": "hildegard.org",
            "sobre_job": "hildegard.org",
            "valor": "gratuito",
            "senha": "Leanne",
            "status": 0
        },
        {
            "id": 2,
            "nome": "Ervin",
            "sobrenome": "Howell",
            "cep": "13468572",
            "anonimato": "Não",
            "email": "Shanna@melissa.tv",
            "celular": "010-692-6593",
            "sobre": "anastasia.net",
            "sobre_job": "anastasia.net",
            "valor": "gratuito",
            "senha": "Ervin",
            "status": 0
        },
        {
            "id": 3,
            "nome": "Clementine",
            "sobrenome": "Bauch",
            "cep": "12345678",
            "anonimato": "Não",
            "email": "Nathan@yesenia.net",
            "celular": "1-463-123-4447",
            "sobre": "ramiro.info",
            "sobre_job": "ramiro.info",
            "valor": "gratuito",
            "senha": "Clementine",
            "status": 0
        },
    ]
}

const usertest = '{"id": 1,"tipo": 1, "nome": "Igor","sobrenome": "de Castro","foto": "null","cep": "51346587","anonimato": "Sim","email": "Sincere@april.biz","celular": "31 992221287","sobre": "Usuário de testes","valor": "gratuito","senha": "teste123","status": 2,"recado": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nam, nulla animi consectetur?"}';

// objeto do banco de dados de users em json
var user
/* var db_userreg = {};
var db_userdata= {};
var drop_reference= []; */

initLoginApp();

// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login

function initLoginApp() {
    
    /* sessionStorage.removeItem('usuarioCorrente'); */
    let aux = sessionStorage.getItem('usuarioCorrente');

    if (aux)
    {
        user = JSON.parse(aux);
        console.log(user);
    }
    else
    {
        user = JSON.parse(usertest);
        sessionStorage.setItem('usuarioCorrente', usertest);
    }
};

function saveUser()
{
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(user));
}

function setSidebar()
{
    setName();
    setStatus();
    setContent();
}

function setName()
{
    let fontsize= 22;
    $("#sidebar_username").html(user.nome+' '+user.sobrenome);

    while($("#sidebar_username").height()> 22)
    {
        fontsize-= 1;
        $("#sidebar_username").css("font-size", fontsize);
    }

    $("#sidebar_message").html("\""+user.recado+"\"");
}

function setStatus()
{
    if(user.status== 0)
    {
        $("#sidebar_statusinfo").html(
            `<i id="sidebar_statusicon" class="fas fa-check-circle"></i>
            <p id="sidebar_statustext">Online</p>`
        );
        $("#sidebar_statusinfo>i").css("color","rgb(0, 200, 0)");
    }
    else if(user.status== 1)
    {
        $("#sidebar_statusinfo").html(
            `<i id="sidebar_statusicon" class="fas fa-minus-circle"></i>
            <p id="sidebar_statustext">Ocupado</p>`
        );
        $("#sidebar_statusinfo>i").css("color","rgb(230, 0, 0)");
    }
    else if(user.status== 2)
    {
        $("#sidebar_statusinfo").html(
            `<i id="sidebar_statusicon" class="fas fa-times-circle"></i>
            <p id="sidebar_statustext">Offline</p>`
        );
        $("#sidebar_statusinfo>i").css("color","rgb(80, 80, 80)");
    }
    else
    {
        throw new Exception("Impossível determinar status!");
    }
}

function setContent()
{
    if(user.tipo= 0)
    {
        $("#content-context").html(
            `<button id="searchpsy" class="menu-btn">
            <i class="fas fa-search"></i>
            <p>Procurar indicações</p>
        </button>

        <button id="mypsy" class="menu-btn">
            <i class="fas fa-hand-holding-medical"></i>
            <p>Meus Psicólogos</p>
        </button>`
        )
    }
    else if(user.tipo= 1)
    {
        $("#content-context").html(
            `<button id="s" class="menu-btn">
            <i class="fas fa-calendar-check"></i>
            <p>Verificar solicitações</p>
        </button>

        <button id="mypat" class="menu-btn">
            <i class="fas fa-users"></i>
            <p>Meus Pacientes</p>
        </button>`
        )
    }
    else
    {
        throw new Exception("Impossível determinar o usuário!");
    }
}

$("#sidebar_statusbar").on("click",
    function()
    {
        $("#sidebar_statusmenu").css("display","block");
        $("#sidebar_statusmenu").focus();
    }
)

$("#sidebar_statusmenu>ul li").each(
    function(i)
    {
        $(this).click(
            function()
            {
                user.status= i;
                setStatus();
                saveUser();
                $("#sidebar_statusmenu").css("display","none");
            }
        )
    }
)

$(document).ready(
    function()
    {
        if(user)
        setSidebar();
    }    
)