const conexao = require('../infraestrutura/database/conexao');
const moment = require('moment');
const { default: axios } = require('axios');
const atendimentoRepositorio = require('../repositorios/atendimentoRepositorio');

class AtendimentoModel{
    constructor() {

        this.dataEhValida = ({data, dataCriacao})=>{
            
            moment(data).isSameOrAfter(dataCriacao);
        } 

        this.clienteEhValido = (tamanhoNome) => {
            
            tamanhoNome >= 3;
        }
        this.validacoes = [
            {
                nome:'data',
                validator: this.dataEhValida,
                mensagem:'Data deve ser Maior ou Igual a Data Atual'
            },
            {
                nome:'cliente',
                validator: this.clienteEhValido,
                mensagem:'Cliente deve possuir pelo menos 3 caracteres'
            }
        ]
        this.valida = (parametros) =>{
            this.validacoes.filter(campo =>{

                const { nome } = campo;
                const parametro = parametros[nome];

                return !campo.validator(parametro);
            })
        }
    }
    adicionaAtendimento(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const parametros = {
            data: {
                data,
                dataCriacao
            },
            cliente: {
                tamanhoNome: atendimento.cliente.length
            }
        }
        const erros = this.valida(parametros)
        const existeErro = erros.length;

        if(existeErro){
            return new Promise((resolve, reject) => reject(erros))
        }
        else{

            const atendimentoDatado = {...atendimento, dataCriacao, data}
    
            return atendimentoRepositorio.adiciona(atendimentoDatado)
                .then((resultados)=>{
                    const id = resultados.insertId
                    return {...atendimento, id }
                })
        }
    }

    listarAtendimentos(){

        return atendimentoRepositorio.listar()
    }

    buscarUmAtendimento(id, res){

        throw new Error (`
        #####################################  ERRO  #####################################
        #                                                                                #
        # Antes de fazer essa requisicao, abra um novo terminal e rode a api de Serviços #
        #   1- cd servicos                                                               #
        #   2- npm install                                                               #
        #   3- node clientes.js                                                          #
        #                                                                                #
        # Após isso pode apagar essa mensagem de erro                                    #
        #                                                                                #
        ##################################################################################
        `)
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

        conexao.query(sql, async (erro, resultados) =>{
            const atendimento = resultados[0];
            const cpf = atendimento.cliente;
            if(erro){
                res.status(400).json(erro);
            }
            else{
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data;
                res.status(200).json(atendimento);
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