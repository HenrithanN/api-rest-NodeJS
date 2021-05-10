const atendimentosModel = require('../models/atendimentosModel');
const AtendimentoModel = require('../models/atendimentosModel')
module.exports = app => {

    app.get('/atendimentos', (req, res)=> {
        AtendimentoModel.listarAtendimentos(res);
    })
    app.get('/atendimentos/:id', (req, res)=> {
        const id = parseInt(req.params.id);

        AtendimentoModel.buscarUmAtendimento(id, res)
    })

    app.post('/atendimentos', (req, res)=> {
        const atendimento = req.body;

        AtendimentoModel.adicionaAtendimento(atendimento, res);
    })

    app.patch('/atendimentos/:id', (req, res) => {

        const id = parseInt(req.params.id);
        const valores = req.body;

        AtendimentoModel.alterarAtendimento(id, valores, res)
    })
    
    app.delete('/atendimentos/:id', (req, res)=>{
        const id = parseInt(req.params.id);

        AtendimentoModel.deletarAtendimento(id, res);
    })
}
    