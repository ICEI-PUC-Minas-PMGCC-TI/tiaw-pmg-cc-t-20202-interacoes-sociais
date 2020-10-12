//
//
// Disciplina: Trabalho Interdisciplinar - Aplicações Web
// Professor: Rommel Vieira Carneiro (rommelcarneiro@gmail.com)
//
// Código LoginApp utilizado como exemplo para alunos de primeiro período 


// Página inicial de Login
const LOGIN_URL = "cadastro_psicologos.html";

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuariospsico = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

// função para gerar códigos randômicos a serem utilizados como código de usuário
// Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


// Dados de usuários para serem utilizados como carga inicial
const dadosIniciais = {
    usuarios: [
        { "id": generateUUID (), 
          "login": "admin", 
          "senha": "123", 
          "nome": "Administrador do Sistema", 
          "sobrenome": "",
          "email": "admin@abc.com",
          "preco": "",
          "crp": "",
          "genero": "",
          "data": "",
          "telefone": "",
          "cep": "",
          "sobre": ""
        },
        { "id": generateUUID (), "login": "user", "senha": "123", "nome": "Usuario Comum", "email": "user@abc.com"},
    ]
};


// Inicializa o usuarioCorrente e banco de dados de usuários da aplicação de Login
function initLoginApp () {
    // PARTE 1 - INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
    }
    
    // PARTE 2 - INICIALIZA BANCO DE DADOS DE USUÁRIOS
    // Obtem a string JSON com os dados de usuários a partir do localStorage
    var usuariosJSON = localStorage.getItem('db_usuariospsico');

    // Verifica se existem dados já armazenados no localStorage
    if (!usuariosJSON) {  // Se NÃO há dados no localStorage
        
        // Informa sobre localStorage vazio e e que serão carregados os dados iniciais
        alert('Dados de usuários não encontrados no localStorage. \n -----> Fazendo carga inicial.');

        // Copia os dados iniciais para o banco de dados 
        db_usuariospsico = dadosIniciais;

        // Salva os dados iniciais no local Storage convertendo-os para string antes
        localStorage.setItem('db_usuariospsico', JSON.stringify (dadosIniciais));
    }
    else  {  // Se há dados no localStorage
        
        // Converte a string JSON em objeto colocando no banco de dados baseado em JSON
        db_usuariospsico = JSON.parse(usuariosJSON);    
    }
};

function addUser (nome, sobrenome, login, senha, email, preco, crp, genre, date, phone, cep, about) {
    
    // Cria um objeto de usuario para o novo usuario 
    let newId = generateUUID ();
    let usuario = { "id": newId, 
                    "login": login, 
                    "senha": senha, 
                    "nome": nome, 
                    "sobrenome": sobrenome,
                    "email": email, 
                    "preco": preco,
                    "crp": crp,
                    "genero": genre,
                    "data": date,
                    "telefone": phone,
                    "cep": cep,
                    "sobre": about
                };
    
    // Inclui o novo usuario no banco de dados baseado em JSON
    db_usuariospsico.usuarios.push (usuario);

    // Salva o novo banco de dados com o novo usuário no localStorage
    localStorage.setItem('db_usuariospsico', JSON.stringify (db_usuariospsico));
}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp ();