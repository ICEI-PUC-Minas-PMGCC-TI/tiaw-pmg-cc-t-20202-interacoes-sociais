//banco de dados inicial caso a pessoa nao tenha nenhum
var db_contatos_inicial = {
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
            "valor": "gratuito",
            "senha": "Leanne",
            "status": ""
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
            "valor": "gratuito",
            "senha": "Ervin",
            "status": ""
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
            "valor": "gratuito",
            "senha": "Clementine",
            "status": ""
        },
        {
            "id": 4,
            "nome": "Patricia",
            "sobrenome": "Lebsack",
            "cep": "23451625",
            "anonimato": "Não",
            "email": "Julianne.OConner@kory.org",
            "celular": "493-170-9623 x156",
            "sobre": "kale.biz",
            "valor": "ate 50 reais",
            "senha": "Patricia",
            "status": ""
        },
        {
            "id": 5,
            "nome": "Chelsey",
            "sobrenome": "Dietrich",
            "cep": "20132054",
            "anonimato": "Sim",
            "email": "Lucio_Hettinger@annie.ca",
            "celular": "(254)954-1289",
            "sobre": "demarco.info",
            "valor": "ate 50 reais",
            "senha": "Chelsey",
            "status": ""
        },
        {
            "id": 6,
            "nome": "Dennis",
            "sobrenome": "Schulist",
            "cep": "21048750",
            "anonimato": "Sim",
            "email": "Karley_Dach@jasper.info",
            "celular": "1-477-935-8478",
            "sobre": "ola.org",
            "valor": "ate 50 reais",
            "senha": "Dennis",
            "status": ""
        },
        {
            "id": 7,
            "nome": "Kurtis",
            "sobrenome": "Weissnat",
            "cep": "87952102",
            "anonimato": "Não",
            "email": "Telly.Hoeger@billy.biz",
            "celular": "210.067.6132",
            "sobre": "elvis.io",
            "valor": "ate 100 reais",
            "senha": "Kurtis",
            "status": ""
        },
        {
            "id": 8,
            "nome": "Nicholas",
            "sobrenome": "Runolfsdottir",
            "cep": "12302457",
            "anonimato": "Sim",
            "email": "Sherwood@rosamond.me",
            "celular": "586.493.6943",
            "sobre": "jacynthe.com",
            "valor": "ate 100 reais",
            "senha": "Nicholas",
            "status": ""
        },
        {
            "id": 9,
            "nome": "Glenna",
            "sobrenome": "Reichert",
            "cep": "52085674",
            "anonimato": "Sim",
            "email": "Chaim_McDermott@dana.io",
            "celular": "(775)976-6794",
            "sobre": "conrad.com",
            "valor": "mais de 100 reais",
            "senha": "Glenna",
            "status": ""
        },
        {
            "id": 10,
            "nome": "Clementina",
            "sobrenome": "DuBuque",
            "cep": "21652012",
            "anonimato": "Sim",
            "email": "Rey.Padberg@karina.biz",
            "celular": "024-648-3804",
            "sobre": "ambrose.net",
            "valor": "mais de 100 reais",
            "senha": "Clementina",
            "status": ""
        }
    ]
}

// objeto do banco de dados de users em json
var db_user = {};

//colocar os nomes na opçao de troca de usuario
function select_contato() {
    $("#select_user").html("");
    for (i = 0; i < db_user.data.length; i++) {
        let contato = db_user.data[i];

        $("#select_user").append(`<option value="${contato.id}">${contato.nome} ${contato.sobrenome}</option>`)
    }
}

function find_user(person, id_user) { return person.id === id_user }

//faz aparecer os dados do usuario na tela de acordo com o nome selecionado em #user_select
function printa_user() {
    //pega o valor do ID do usuario selecionado
    let user_id = document.getElementById("select_user").value;
    //acha o index no banco de dados cujo ID é o do usuario selecionado
    let user_dados_index = db_user.data.findIndex(x => x.id == user_id);
    //joga na variavel todo o objeto cujo ID eh o do usuario
    let user_dados = db_user.data[user_dados_index];

    //altera os campos com os valores
    $("#nome").val(`${user_dados.nome} ${user_dados.sobrenome}`);
    $("#sobre").val(`${user_dados.sobre}`);
    $("#anonimato").val(`${user_dados.anonimato}`);
    $("#valor").val(`${user_dados.valor}`);
    $("#celular").val(`${user_dados.celular}`);
    $("#cep").val(`${user_dados.cep}`);
    $("#email").val(`${user_dados.email}`);
    $("#senha").val(`${user_dados.senha}`);
}


//coisas q vao acontecer quando a pag carregar
$(document).ready(function () {

    //--------------------------------------------------- DADOS DO LOCAL STORAGE --------------------------------------------------------------------------------------------
    var db_json = localStorage.getItem('db_user');
    if (!db_json) {
        db_json = db_contatos_inicial;
        alert("Adicionado ao local Storage vários usuários.");
        localStorage.setItem('db_user', JSON.stringify(db_contatos_inicial));
    }
    else {
        db_user = JSON.parse(db_json);
    }

    //carrega o select contato
    select_contato();
    printa_user();

    //---------------------------------------------salva as alteraçoes feita modal de alteraçoes, apos clicar no botao de salvar-----------------------------------------//

    //----------------------ALTERAR NOME E SOBRENOME

    $("#btn_save_nome").click(function () {
        let alterar_sobrenome;
        let alterar_nome;
        //pega o valor do ID do usuario selecionado
        let user_id = document.getElementById("select_user").value;
        //acha o index no banco de dados cujo ID é o do usuario selecionado
        let user_dados_index = db_user.data.findIndex(x => x.id == user_id);

        if ($("#nome_modal").val() != "") {
            db_user.data[user_dados_index].nome = $("#nome_modal").val();
        }
        if ($("#sobrenome_modal").val() != "") {
            db_user.data[user_dados_index].sobrenome = $("#sobrenome_modal").val();
        }

        localStorage.setItem('db_user', JSON.stringify(db_user));

        select_contato();
        printa_user();
    })

    //----------------------ALTERAR ANONIMATO

    $("#btn_save_anonimato").click(function () {
        let alterar_anonimato;
        //pega o valor do ID do usuario selecionado
        let user_id = document.getElementById("select_user").value;
        //acha o index no banco de dados cujo ID é o do usuario selecionado
        let user_dados_index = db_user.data.findIndex(x => x.id == user_id);

        db_user.data[user_dados_index].anonimato = $("#select_anonimo_modal").val();

        localStorage.setItem('db_user', JSON.stringify(db_user));

        select_contato();
        printa_user();
    })

    //----------------------ALTERAR VALOR A PAGAR

    $("#btn_save_valor").click(function () {
        let alterar_anonimato;
        //pega o valor do ID do usuario selecionado
        let user_id = document.getElementById("select_user").value;
        //acha o index no banco de dados cujo ID é o do usuario selecionado
        let user_dados_index = db_user.data.findIndex(x => x.id == user_id);

        db_user.data[user_dados_index].valor = $("#valor_modal").val();

        localStorage.setItem('db_user', JSON.stringify(db_user));

        select_contato();
        printa_user();
    })

    //----------------------ALTERAR CELULAR

    $("#btn_save_celular").click(function () {
        let alterar_anonimato;
        //pega o valor do ID do usuario selecionado
        let user_id = document.getElementById("select_user").value;
        //acha o index no banco de dados cujo ID é o do usuario selecionado
        let user_dados_index = db_user.data.findIndex(x => x.id == user_id);

        if ($("#celular_modal").val() != "") {
            db_user.data[user_dados_index].celular = $("#celular_modal").val();
        }

        localStorage.setItem('db_user', JSON.stringify(db_user));

        select_contato();
        printa_user();
    })

    //----------------------ALTERAR CEP

    $("#btn_save_cep").click(function () {
        let alterar_anonimato;
        //pega o valor do ID do usuario selecionado
        let user_id = document.getElementById("select_user").value;
        //acha o index no banco de dados cujo ID é o do usuario selecionado
        let user_dados_index = db_user.data.findIndex(x => x.id == user_id);

        if ($("#cep_modal").val() != "") {
            db_user.data[user_dados_index].cep = $("#cep_modal").val();
        }
        localStorage.setItem('db_user', JSON.stringify(db_user));

        select_contato();
        printa_user();
    })

    //----------------------ALTERAR EMAIL

    $("#btn_save_email").click(function () {
        let alterar_anonimato;
        //pega o valor do ID do usuario selecionado
        let user_id = document.getElementById("select_user").value;
        //acha o index no banco de dados cujo ID é o do usuario selecionado
        let user_dados_index = db_user.data.findIndex(x => x.id == user_id);

        if ($("#email_modal").val() != "" && $("#email_modal").val() == $("#email2_modal").val()) {
            db_user.data[user_dados_index].email = $("#email_modal").val();
        }

        localStorage.setItem('db_user', JSON.stringify(db_user));

        select_contato();
        printa_user();
    })

    //----------------------ALTERAR SENHA

    $("#btn_save_senha").click(function () {
        let alterar_anonimato;
        //pega o valor do ID do usuario selecionado
        let user_id = document.getElementById("select_user").value;
        //acha o index no banco de dados cujo ID é o do usuario selecionado
        let user_dados_index = db_user.data.findIndex(x => x.id == user_id);

        if ($("#senha_modal").val() == db_user.data[user_dados_index].senha && $("#nova_senha_modal").val() != "" && $("#nova_senha_modal").val() == $("#nova_senha2_modal").val()) {
            db_user.data[user_dados_index].senha = $("#nova_senha_modal").val();
        }

        localStorage.setItem('db_user', JSON.stringify(db_user));

        select_contato();
        printa_user();
    })

    //----------------------ALTERAR SOBRE MIM

    $("#sobre").focusout(function () {
        let alterar_anonimato;
        //pega o valor do ID do usuario selecionado
        let user_id = document.getElementById("select_user").value;
        //acha o index no banco de dados cujo ID é o do usuario selecionado
        let user_dados_index = db_user.data.findIndex(x => x.id == user_id);

            db_user.data[user_dados_index].sobre = $("#sobre").val();

        localStorage.setItem('db_user', JSON.stringify(db_user));

        select_contato();
        printa_user();
    })

     //----------------------ALTERAR STATUS

     $("#status").focusout(function () {
        let alterar_anonimato;
        //pega o valor do ID do usuario selecionado
        let user_id = document.getElementById("select_user").value;
        //acha o index no banco de dados cujo ID é o do usuario selecionado
        let user_dados_index = db_user.data.findIndex(x => x.id == user_id);

            db_user.data[user_dados_index].status = $("#status").val();

        localStorage.setItem('db_user', JSON.stringify(db_user));

        select_contato();
        printa_user();
    })

})





