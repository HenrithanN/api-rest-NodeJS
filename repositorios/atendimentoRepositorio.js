const query = require('../infraestrutura/database/queries');

class AtendimentoRepositorio{
    adiciona(atendimento){
        const sql = 'INSERT INTO Atendimentos SET ?'

        return query(sql, atendimento);
    }

    listar(){

        const sql = 'SELECT * FROM Atendimentos';

        return query(sql);
    }

    buscarUmAtendimento(id){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;

        return query(sql);
    }
}

module.exports = new AtendimentoRepositorio();