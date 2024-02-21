const nlp = require('compromise');

function correjir(palabra){
console.log('palabra desde correjir',palabra);
// Corrige las palabras ortográficas en un texto en español
const doc = nlp(palabra);
const correctedText = doc.correct().out('text');

if(correctedText){
 // Muestra el texto original y el texto corregido
console.log('Original:', palabra);
console.log('Corregido:', correctedText);
 
}else{
  console.log('error Inesperado');
}

}
////////////////////////////////////////////////////////
module.exports={
  correjir
}