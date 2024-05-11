const ruleta = document.querySelector('#ruleta');
const button = document.querySelector('.button');
const contenedorPadre = document.querySelector('.container');
const contenedorAnswer = document.getElementById('answerContainer');


// const contenedor = document.querySelector('.buttonDiv');

// const context_clues = [{
//   question: 'context_clues1',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'context_clues2',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'context_clues3',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'context_clues4',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// }
// ];

// const type_clues = [{
//   question: 'type_clues1',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'type_clues2',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'type_clues3',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'type_clues4',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// }];

// const verb_tenses = [{
//   question: 'verb_tenses1',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'verb_tenses2',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'verb_tenses3',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'verb_tenses4',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// }];

// const cognates = [{
//   question: 'cognates1',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'cognates2',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'cognates3',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// },
// {
//   question: 'cognates4',
//   answer: 'hola',
//   options: ['hola', 'adios', 'mundo', 'respuesta'],
// }];
let fullData
fetch('../questions.json')
.then(function (data) {
  return data.json();
})
.then(function(data){
  fullData = data;
  console.log(fullData);
})
console.log(fullData);

let acierto = 0
let intentos = 2
document.getElementById('attemps').innerHTML = "Remaining attempts: " + intentos;
document.getElementById('points').innerHTML = "Score: " + acierto;

function createScoreDiv(){
  document.getElementById('finalScore').innerHTML = 'Your final score is: ' + acierto;
  document.getElementById('final').classList.add('mostrar');
}

//cerrar la ventana de respuesta
button.addEventListener('click', () => {
  contenedorAnswer.classList.remove('mostrar');
  if (intentos == 0) {
    createScoreDiv()
  }
});
//reinicia el juego
document.getElementById('play').addEventListener('click', () => {
  intentos = 2;
  acierto = 0;
  document.getElementById('final').classList.remove('mostrar');
  document.getElementById('attemps').innerHTML = "Remaining attempts: " + intentos;
  document.getElementById('points').innerHTML = "Score: " + acierto;
  
});

ruleta.addEventListener('click', girar);

//Cierra la ventana de opciones despues de tocar una
function cerrar() {
  contenedorPadre.classList.remove('mostrar');
  let div = document.querySelector('.buttonDiv')
  contenedorPadre.removeChild(div)
}

function girar() {
  
  
  if (!intentos == 0) {
    let rand = Math.random() * 10000;
    calcular(rand);
    intentos--;
    document.getElementById('attemps').innerHTML = "Remaining attempts: " + intentos;
    var sonido = document.querySelector('#audio');
    sonido.setAttribute('src', 'sonido/ruleta.mp3');
  }
    // Swal.fire({
    //   icon: 'success',
    //   title: 'VUELVA PRONTO EL JUEGO TERMINO!!',
    //   confirmButtonColor: '#3085d6',
    //   confirmButtonText: 'Aceptar',
    //   allowOutsideClick: false
    // }).then((result)=>{
    //   if (result.value == true) {

    //   }
    // })
    
  function createAnswer(answer, correctAnswer) {
    // if (answer == 'Incorrect'){
    //   let paragraph = document.createElement('p');
    //   paragraph.innerHTML = 'The correct answer was ' + correctAnswer
    //   paragraph.classList.add('elije');
    //   contenedorAnswer.appendChild(paragraph)
    //   document.getElementById('answer').innerHTML = answer;
    //   contenedorAnswer.classList.add('mostrar');
    // }else{
      
    // }
    document.getElementById('answer').innerHTML = answer;
    contenedorAnswer.classList.add('mostrar');
    
  }


  function createButton(question, color) {
    //Div contenedor de los botones
    let btnDiv = document.createElement('div')
    btnDiv.classList.add('buttonDiv');
    //Creacion de las 4 respuestas
    question.options.map(option => {
      let button = document.createElement('button');
      button.innerHTML = option;
      button.classList.add('button');
      button.style.backgroundColor = color;
      //Eventos del boton
      button.addEventListener('click', () => {
        if (option == question.answer) {
          acierto++;
          createAnswer('Correct', question.answer)
          document.getElementById('points').innerHTML = "Score: " + acierto;
        } else {
          createAnswer('Incorrect', question.answer)
        }
        cerrar();
      })
      //Pone el boton dentro del div
      btnDiv.appendChild(button);
      contenedorPadre.appendChild(btnDiv);
    })
  }


  function questionTopic(topic) {

    let question = '';
    let color = '';
    if (topic == 'cognates') {
      question = fullData.cognates[Math.floor(Math.random() * fullData.cognates.length)];
      color = "#11602C";
    } else if (topic == 'verb') {
      question = fullData.verb_tenses[Math.floor(Math.random() * fullData.verb_tenses.length)];
      color = '#A0720C';
    } else if (topic == 'type') {
      question = fullData.type_clues[Math.floor(Math.random() * fullData.type_clues.length)];
      color = '#143A62';
    } else if (topic == 'context') {
      question = fullData.context_clues[Math.floor(Math.random() * fullData.context_clues.length)];
      color = '#821338';
    }
    document.querySelector('.elije').innerHTML = question.question;
    contenedorPadre.classList.add('mostrar');
    console.log(question.options);
    createButton(question, color);
  }


  function calcular(rand) {

    valor = rand / 360;
    valor = (valor - parseInt(valor.toString().split(".")[0])) * 360;
    ruleta.style.transform = "rotate(" + rand + "deg)";

    setTimeout(() => {
      switch (true) {
        case valor > 0 && valor <= 90:
          questionTopic("cognates");
          break;
        case valor > 90 && valor <= 180:
          questionTopic("verb");
          break;
        case valor > 180 && valor <= 270:
          questionTopic("type");
          break;
        case valor > 270 && valor <= 360:
          questionTopic("context");
          break;
      }

    }, 5000);

  }
}