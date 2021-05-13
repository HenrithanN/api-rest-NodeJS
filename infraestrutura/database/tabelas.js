class Tabelas{

    init(conexao){
        this.conexao = conexao;
        this.criarAtendimentos();
        this.criarPets();
    }
/*
    Criando Tabela de Atendimentos
*/
    criarAtendimentos(){
        const sql = `
        CREATE TABLE IF NOT EXISTS Atendimentos (
            id          int         NOT NULL    AUTO_INCREMENT,
            cliente     varchar(11) NOT NULL,
            pet         varchar(20) NOT NULL,
            servico     varchar(20) NOT NULL,
            status      varchar(20) NOT NULL,
            observacoes text        NULL,

            PRIMARY KEY(id)

        )
            `

        this.conexao.query(sql, (erro)=>{
            if(erro){
                console.log(erro)
            }
            else{
                console.log('Tabela Atendimentos criada com sucesso!')
            }
        })
    }
/*
   Criando Tabela de Pets
*/
    criarPets(){
        const query = `
        CREATE TABLE IF NOT EXISTS Pets (
            id          INT             NOT NULL AUTO_INCREMENT,
            Nome        VARCHAR(50)     NOT NULL,
            Imagem      VARCHAR(200)    NOT NULL,

            PRIMARY KEY(ID)
        )
        ` 
        this.conexao.query(query, (erro) =>{
            if(erro){
                console.log(erro)
            }
            else{
                console.log('Tabela Pets Criada Com Sucesso!')
            }
        })
    }
}

module.exports = new Tabelas