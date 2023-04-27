/*Elemento html*/
const inputText = document.getElementById("inputText");
const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const inputTextResultado = document.getElementById("inputTextResultado");
const divTextEncontrado = document.getElementById("textFound");
const divTextNoEncontrado = document.getElementById("textNotFound");
const btnCopiarResultado = document.getElementById('btnCopiarResultado');
/*Variables */

/*Diccionario de vocales encriptadas y desencriptadas */
const vocalEncriptada = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

/*Funciones */
function normalizarTexto(e) {
  e.target.value = inputText.value.toLowerCase();
  e.target.value = inputText.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function encriptar() {
  console.log("encriptar");
  const mensajeSimple = inputText.value;
  const mensajeResultado = mensajeSimple
    .split("")
    .map((letra) => (letra in vocalEncriptada ? vocalEncriptada[letra] : letra))
    .join("");
  mostrarResultado();
  inputTextResultado.value = mensajeResultado;
}

function desencriptar() {
  console.log("desencriptar");
  const mensajeEcriptado = inputText.value;
  let mensajeResultado = mensajeEcriptado;
  for (let key in vocalEncriptada) {
    mensajeResultado = mensajeResultado.split(vocalEncriptada[key]);
    mensajeResultado = mensajeResultado.join(key);
  }
  inputTextResultado.value = mensajeResultado;
}

function cambiarClase(elementoHTML) {
  elementoHTML.classList.toggle("display-none");
}

function mostrarResultado() {
  if (inputText.value != "" && inputTextResultado.value === "") {
    cambiarClase(divTextEncontrado);
    cambiarClase(divTextNoEncontrado);
  }
}

function validarTextoVacio() {
  if (inputText.value === "") {
    cambiarClase(divTextEncontrado);
    cambiarClase(divTextNoEncontrado);
    inputTextResultado.value = "";
  }
}

function copiarPortaPapeles(){
  navigator.clipboard.writeText(inputTextResultado.value)
  console.log('Texto copiado al portapapeles');
    const copiedMessage = document.getElementById("copiedMessage");
  copiedMessage.style.display = "block";
  setTimeout(() => {
    copiedMessage.style.display = "none";
  }, 2000);
}


/*Eventos */
inputText.addEventListener("input", (e) => {
  normalizarTexto(e);
});
btnEncriptar.addEventListener("click", encriptar);
btnDesencriptar.addEventListener("click", desencriptar);
btnCopiarResultado.addEventListener("click", copiarPortaPapeles);
inputText.addEventListener("input", validarTextoVacio);
