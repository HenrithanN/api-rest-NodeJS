const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas');

conexao.connect((erro)=>{
    if(erro){
        console.log(erro)
    }
    else{
        console.log('Conectado com sucesso!')
        const app = customExpress()
        Tabelas.init(conexao);
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})