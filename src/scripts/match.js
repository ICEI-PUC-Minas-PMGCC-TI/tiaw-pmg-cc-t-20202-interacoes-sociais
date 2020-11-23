var db_psico = {};
var usuarioCorrente = {};

var solPendente=[0,0,0];

//Carregar local storage
usuarioCorrente = JSON.parse(sessionStorage.getItem('usuarioCorrente'));
db_psico = JSON.parse(localStorage.getItem('db_psico'));

function Usuario()
{
    return usuarioCorrente.nome;
}

function psicosN(idNome)
{
    return db_psico.data[idNome].nome;
}

function psicosS(idNome)
{
    return db_psico.data[idNome].sobre;
}

function varPendente()
{
    let num=1;
    for(let x=0; x<solPendente.length; x++)
    {
        if(solPendente[x]==0 && num==1)
        {
            solPendente[x]=1;
            num=x;
        }
    }

    return num;
}