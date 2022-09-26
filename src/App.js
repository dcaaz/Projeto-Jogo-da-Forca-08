import React from "react";
import "./styles/reset.css"
import "./styles/style.css";
import forca0 from "./imagens/forca0.png"
import forca1 from "./imagens/forca1.png"
import forca2 from "./imagens/forca2.png"
import forca3 from "./imagens/forca3.png"
import forca4 from "./imagens/forca4.png"
import forca5 from "./imagens/forca5.png"
import forca6 from "./imagens/forca6.png"
import getPalavras from "./palavras";

export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const [contador, setContador] = React.useState(0);
    const [palavraSorteada, setPalavraSorteada] = React.useState('');
    const [pSorteadaNormalizada, setPSorteadaNormalizada] = React.useState([]);
    const [pUnderlines, setPUnderlines] = React.useState([]);
    const [pFinalizada, setPFinalizada] = React.useState("");
    const [lClicada, setLClicada] = React.useState([]);
    const [imput, setImput] = React.useState("");
    const [desabilitado, setDesabilitado] = React.useState("desabilitado");

    const imagens = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];

    function sortearPalavra() {
        let palavras = getPalavras();
        const indice = Math.floor(Math.random() * palavras.length); //floor arredonda para o menor número inteiro e random retorna um indice aleatório
        let palavra = palavras[indice];
        let palavraNormalizada = palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(""); //tira os acentos e transforma em array
        let underline = palavraNormalizada.map(() => ' _ ');

        setPalavraSorteada(palavra);
        console.log(palavra);
        setPSorteadaNormalizada(palavraNormalizada);
        setPUnderlines(underline);

        setContador(0); //zera contador
        setLClicada([]); //zera teclado
        setPFinalizada(""); //zera cor da palavra
    }

    function iniciarPartida() {
        sortearPalavra();

        const inputHabilitacao = document.querySelector("input");
        inputHabilitacao.disabled = false;

        setDesabilitado("");
    }

    function letraClicada(letraClick, index) {

        const clicado = [...lClicada, letraClick];
        setLClicada(clicado);

        if (pSorteadaNormalizada.includes(letraClick)) {
            let newPalavraUnderlines = [...pUnderlines];
            let indicesLetraNaPalavra = pSorteadaNormalizada.map((letraPalavra, idx) => letraPalavra === letraClick ? idx : -1).filter((idx) => idx !== -1);
            indicesLetraNaPalavra.forEach((index) => newPalavraUnderlines[index] = palavraSorteada[index]);

            setPUnderlines(newPalavraUnderlines);

            if (!newPalavraUnderlines.includes(' _ ')) {
                setPFinalizada("verde");
            }

        } else {
            setContador(contador + 1);
        }

        palavraFinalizada()
    }

    function palavraFinalizada() {

        if (contador === 5) {
            console.log(contador)
            setPUnderlines(palavraSorteada);
            setPFinalizada("vermelho");
        }
    }

    function botaoImput() {
        if (imput === palavraSorteada) {
            setPUnderlines(imput);
            setPFinalizada("verde");
        } else {
            setPUnderlines(imput);
            setPFinalizada("vermelho");
            setContador(6);
        }
    }

    return (
        <>
            <div className="forca">
                <img data-identifier="game-image" src={imagens[contador]} alt="forca" />
                <div className="forca-itens">
                    <button data-identifier="choose-word" onClick={iniciarPartida}>Escolher Palavra</button>
                    <h1 data-identifier="word" className={pFinalizada}>{pUnderlines}</h1>
                </div>
            </div>
            <div data-identifier="letter" className={"teclado-virtual " + desabilitado}>
                {alfabeto.map((letra, index) =>

                    <button
                        disabled={lClicada.includes(letra) ? true : false}
                        key={index}
                        className={lClicada.includes(letra) ? "cinza" : "azul"}
                        onClick={() => letraClicada(letra, index)}>

                        {letra}

                    </button>

                )}
            </div>
            <div className="adivinhar-palavra">
                <h1>Já sei a palavra!</h1>

                <input data-identifier="type-guess"
                    id="input"
                    placeholder="Digete  seu chute..."
                    onChange={(event) => setImput(event.target.value)}
                    value={imput}
                    disabled
                />

                <button data-identifier="guess-button"
                    onClick={botaoImput}>
                    Chutar
                </button>

            </div>
        </>
    )

}

