const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callBackImgCriada) =>{
    
    const tiposAceitos = ['jpg', 'pnj', 'jpeg'];
    const tipoArquivo = path.extname(caminho)
    const tipoEhValido = tiposAceitos.indexOf(tipoArquivo.substring(1)) !== -1;

    if (tipoEhValido){
        const novoCaminho = `./assets/imgs/${nomeDoArquivo}${tipoArquivo}`;
        
        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(novoCaminho))
        .on('finish', ()=> callBackImgCriada(false, novoCaminho));
    }
    else{
        const erro = 'Tipo de Imagem é Inválido!'
        console.log('Tipo de Imagem não é Válido!');
        callBackImgCriada(erro);
    }
}