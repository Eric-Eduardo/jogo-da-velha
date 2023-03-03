const btnRestart = document.querySelector(".btn-restart");
const contentGame = document.querySelector(".content-game");
const scoreX = document.querySelector(".score-x");
const scoreO = document.querySelector(".score-o");
const svgXO = {
    x:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="100" height="100" viewBox="0 0 24 24" stroke-width="2.7" stroke="#8CBEB2" fill="none" stroke-linecap="square" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>',
    o:'<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle" width="100" height="100" viewBox="0 0 24 24" stroke-width="3" stroke="#F06060" fill="none" stroke-linecap="square" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12 " cy="12" r="9" /></svg>'
};
var vezJogador = "x";
var fimDeJogo = 0;
var pontuacaoX = 0;
var pontuacaoO = 0;
// var somaColunas = [0, 0, 0] //[col 1, col 2, col 3]
// var somaLinhas = [0, 0, 0] //[lin 1, lin 2, lin 3]
// var somaDiagonais = [0, 0] //[diag crescente, diag decrescente];

var infoX = [[0,0,0], [0,0,0], [0,0]];
var infoO = [[0,0,0], [0,0,0], [0,0]];
/*infoX e infoO armazena a soma do número de X e O, respectivamente, em cada linha, coluna e diagonais
    [
        [lin 1, lin 2, lin 3], 
        [col 1, col 2, col 3], 
        [diag crescente, diag decrescente]
    ]
*/


contentGame.addEventListener("click", marcarCelula);
btnRestart.addEventListener("click", reiniciar);

function marcarCelula(elemento) {
    if (elemento.target.id && elemento.target.dataset.opc == '' && !fimDeJogo) {

        elemento.target.innerHTML = svgXO[vezJogador];
        elemento.target.dataset.opc = vezJogador;

        var lin = Number(elemento.target.id.slice(-2, -1));
        var col = Number(elemento.target.id.slice(-1));

        if (vezJogador == 'x') {
            infoX[0][lin]+=1;
            infoX[1][col]+=1;
            if ((lin==0 && col==2) || (lin==1 && col==1) || (lin==2 && col==0)) infoX[2][0]+=1;
            if ((lin==0 && col==0) || (lin==1 && col==1) || (lin==2 && col==2)) infoX[2][1]+=1;
        } else {
            infoO[0][lin]+=1;
            infoO[1][col]+=1;
            if ((lin==0 && col==2) || (lin==1 && col==1) || (lin==2 && col==0)) infoO[2][0]+=1;
            if ((lin==0 && col==0) || (lin==1 && col==1) || (lin==2 && col==2)) infoO[2][1]+=1;
        }

        fimDeJogo = verificarCompeao();
        
        if (!fimDeJogo) {
            scoreO.classList.toggle("selected");
            scoreX.classList.toggle("selected");
            if (vezJogador=='x') vezJogador = 'o';
            else vezJogador = 'x';
        }
    }
}

function verificarCompeao() {
    var linhaX = infoX[0].indexOf(3);
    var colunaX = infoX[1].indexOf(3);
    var diagonalX = infoX[2].indexOf(3);
    var linhaO = infoO[0].indexOf(3);
    var colunaO = infoO[1].indexOf(3);
    var diagonalO = infoO[2].indexOf(3);

    if (linhaX>-1 || colunaX>-1 || diagonalX>-1) {
        // fimDeJogo=1;
        pontuacaoX+=1;
        document.querySelector(".score-x p").innerHTML = pontuacaoX;
        
        if (linhaX>-1) tracarLinha("horizontal", linhaX);
        else if (colunaX>-1) tracarLinha("vertical", colunaX);
        else if (diagonalX>-1) tracarLinha("diagonal", diagonalX);
        return 1;
    }else if (linhaO>-1 || colunaO>-1 || diagonalO>-1) {
        // fimDeJogo=1;
        pontuacaoO+=1;
        document.querySelector(".score-o p").innerHTML = pontuacaoO;
        
        if (linhaO>-1) tracarLinha("horizontal", linhaO);
        else if (colunaO>-1) tracarLinha("vertical", colunaO);
        else if (diagonalO>-1) tracarLinha("diagonal", diagonalO);
        return 1;
    }

    return 0;
}

function tracarLinha(direcao, indice) {

    if (direcao == "horizontal") {
        document.querySelector(`.cell:nth-child(${2+3*Number(indice)})`).innerHTML += '<div class="line"></div>';
        document.querySelector(".line").style.rotate = "0deg";
    } else if (direcao == "vertical") {
        document.querySelector(`.cell:nth-child(${Number(indice)+4})`).innerHTML += '<div class="line"></div>';
        document.querySelector(".line").style.rotate = "90deg";
    } else if (direcao == "diagonal") {
        document.querySelector(`.cell:nth-child(${5})`).innerHTML += '<div class="line"></div>';
        document.querySelector(".line").style.width = "420px";
        if (indice == 0)  document.querySelector(".line").style.rotate = "-45deg";
        else document.querySelector(".line").style.rotate = "45deg";
    }

    if (vezJogador == 'x') {
        document.querySelector(".line").style.backgroundColor = "#8CBEB2";
    } else {
        document.querySelector(".line").style.backgroundColor = "#F06060";
    }

}

function reiniciar() {
    const celulas = document.querySelectorAll(".cell");

    for (cel of celulas) {
        cel.innerHTML = "";
        cel.dataset.opc = "";
        infoX = [[0,0,0], [0,0,0], [0,0]];
        infoO = [[0,0,0], [0,0,0], [0,0]];
        scoreX.classList.add("selected");
        scoreO.classList.remove("selected");
        vezJogador = "x";
        fimDeJogo = 0;
    }
}
