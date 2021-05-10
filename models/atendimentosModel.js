const conexao = require('../infraestrutura/conexao');
const moment = require('moment');

class AtendimentoModel{
    
    adicionaAtendimento(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 3;

        const validacoes = [
            {
                nome:'data',
                valido:dataEhValida,
                mensagem:'Data deve ser Maior ou Igual a Data Atual'
            },
            {
                nome:'cliente',
                valido:clienteEhValido,
                mensagem:'Cliente deve possuir pelo menos 3 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido);
        const existeErro = erros.length;

        if(existeErro){
            res.status(400).json(erros);
        }
        else{

            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado,(erro, resultados)=>{
                if(erro){
                    res.status(400).json(erro); 
                }
                else{
                    res.status(201).json(resultados)
                }
            })
        }
    }

    listarAtendimentos(res){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados)=>{
            if(erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json(resultados);
            }
        })
    }

    buscarUmAtendimento(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, (erro, resultados) =>{
            const atendimento = resultados[0];
            if(erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json(atendimento)
            }
        })
    }

    alterarAtendimento(id, valores, res){

        if (valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE Atendimento SET ? WHERE id= ?'

        conexao.query(sql, [valores, id], (erro, resultados) =>{
            if (erro) {
                res.status(400).json(erro);
            }
            else{
                res.status(200).json(resultados);
            }
        })
    }

    deletarAtendimento(id, res){
        const sql = 'DELETE FROM Atendimentos WHERE id= ?';

        conexao.query(sql, id, (erro, resultados)=>{

            if (erro){
                res.status(400).json(erro);
            }
            else{
                res.status(200).json(resultados);
            }
        })
    }
}

module.exports = new AtendimentoModel