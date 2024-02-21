const express = require('express');
const app = express();
app.use(express.static(__dirname+'/static'));
const TelegramBot = require('node-telegram-bot-api');
const corrector = require('./static/js/corrector.js');
const token = '6693762259:AAE5QnYfEay9Mt5BPueheOK_I7nbm_IVxn4'; // Reemplaza con tu token de acceso del bot

// Crear una nueva instancia del bot
const bot = new TelegramBot(token, { polling: true });


// Manejar el evento de mensaje recibido con el comando /start
bot.onText(/\/start/, (msg) =>{
  const chatId = msg.chat.id;
  const message = '¡Hola! Bienvenido al chatbot de la Universidad UNERG creado por Randis graterol ,Simon Palima , Enmanuel Rodriguez y Jose Ochoa. ¿En qué puedo ayudarte hoy?';
  bot.sendMessage(chatId, message);
});
// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.send('¡Hola, soy un chatbot creado por el equipo de Randy Graterol! ¿En qué puedo ayudarte?');
});

// Lista de preguntas y respuestas
const preguntasRespuestas = [
  {
    pregunta:'hola',
    respuestas: [
  '¡Hola! ¿En qué puedo ayudarte?',
  'Estoy aquí para responder tus preguntas. Adelante, pregúntame algo.',
  '¿Necesitas ayuda con algo en particular?',
  'Estoy listo para asistirte. Dispara tu pregunta.',
  '¡Claro! Estoy aquí para ayudarte.',
  '¿Tienes alguna consulta en mente?',
  'Puedo brindarte información sobre diversos temas. ¿Qué necesitas saber?',
  'Estoy a tu disposición. Hazme una pregunta.',
  '¡Hola! ¿En qué puedo colaborar contigo hoy?',
  '¿Cómo puedo asistirte en este momento?',
  'Estoy aquí para brindarte respuestas. Adelante, pregúntame.',
  '¿En qué puedo contribuir a tu día?',
  'Estoy listo para recibir tus preguntas. Dispara.',
  '¿Necesitas información específica? Estoy aquí para ayudarte.',
  '¡Hola! Espero poder resolver tus dudas. Adelante, pregúntame.',
  'Si tienes alguna pregunta, no dudes en hacerla. Estoy aquí para ayudarte.',
  '¿En qué puedo ser de utilidad en este momento?',
  'Estoy preparado para responder tus consultas. Adelante, pregúntame lo que desees.',
  '¿Cuál es tu pregunta? Intentaré darte la mejor respuesta posible.',
  'Estoy aquí para ayudarte en lo que necesites. Adelante, pregúntame.',
  '¡Hola! ¿En qué puedo colaborar contigo hoy?'
]
  },
  {
    pregunta: 'inscripciones',
    respuestas: ['Las inscripciones para el próximo semestre se abrirán en marzo.','Para mayor información te recomiendo acercarte a la oficina de dace Unerg para mas información']
  },
   {
    pregunta: 'Horarios',
    respuestas: [
      'Puedes consultar los horarios de clases en el sitio web de la UNERG o en la oficina de admisiones. También puedes comunicarte con el departamento académico para obtener información detallada sobre los horarios de las materias.',
      'Si necesitas información sobre los horarios de clases en la UNERG, te recomiendo visitar el sitio web de la universidad o contactar a la oficina de admisiones.'
    ]
  },
  {
    pregunta: 'Cursos',
    respuestas: [
      'La UNERG ofrece una amplia variedad de cursos y programas académicos. Puedes consultar la lista completa de cursos en el sitio web de la universidad o en la oficina de admisiones.',
      'Si estás interesado en los cursos que ofrece la UNERG, te recomiendo visitar el sitio web de la universidad o contactar a la oficina de admisiones.'
    ]
  },
  {
    pregunta: 'Becas',
    respuestas: [
      'La UNERG ofrece varias oportunidades de becas y financiamiento para estudiantes. Puedes obtener más información sobre las becas disponibles en el sitio web de la universidad o en la oficina de admisiones.',
      'Si tienes preguntas sobre becas y financiamiento en la UNERG, te recomiendo visitar el sitio web de la universidad o contactar a la oficina de admisiones.'
    ]
  },
  {
    pregunta: 'contacto',
    respuestas: [
      'Puedes ponerte en contacto con la UNERG a través de su sitio web o a través de la oficina de admisiones. También puedes comunicarte con el departamento académico para obtener información detallada sobre los horarios de las materias.',
      'Si tienes preguntas sobre cómo contactar con la UNERG, te recomiendo visitar el sitio web de la universidad o contactar a la oficina de admisiones.'
    ]
  },
  {
    pregunta: 'ayuda',
    respuestas: [
      'Estoy aquí para ayudarte con tus preguntas sobre la UNERG. Si tienes alguna pregunta, no dudes en hacerla.',
      'Si necesitas información adicional o asistencia, no dudes en preguntar.'
    ]
  },
  {
    pregunta: 'nuevo ingreso',
    respuestas: ['El proceso de inscripción para nuevos estudiantes consta de completar un formulario en línea y presentar los documentos requeridos. Puedes encontrar más información en nuestro sitio web.','El proceso de inscripcion para estudiantes nuevos ingresos consta de completar una serie de requisitos requeridos por el departamento de dace Unerg, para mayor información te recomendaria que visitaras la pagina oficial de dace Unerg']
  },
   {
    pregunta: 'horarios',
    respuestas: [
      'Puedes consultar los horarios de clases en el sitio web de la UNERG o en la oficina de admisiones. También puedes comunicarte con el departamento académico para obtener información detallada sobre los horarios de las materias.',
      'Si necesitas información sobre los horarios de clases en la UNERG, te recomiendo visitar el sitio web de la universidad o contactar a la oficina de admisiones.'
    ]
  },
  {
    pregunta: 'cursos',
    respuestas: [
      'La UNERG ofrece una amplia variedad de cursos y programas académicos. Puedes consultar la lista completa de cursos en el sitio web de la universidad o en la oficina de admisiones.',
      'Si estás interesado en los cursos que ofrece la UNERG, te recomiendo visitar el sitio web de la universidad o contactar a la oficina de admisiones.'
    ]
  },
  {
    pregunta: 'becas',
    respuestas: [
      'La UNERG ofrece varias oportunidades de becas y financiamiento para estudiantes. Puedes obtener más información sobre las becas disponibles en el sitio web de la universidad o en la oficina de admisiones.',
      'Si tienes preguntas sobre becas y financiamiento en la UNERG, te recomiendo visitar el sitio web de la universidad o contactar a la oficina de admisiones.'
    ]
  },
  {
    pregunta: 'contacto',
    respuestas: [
      'Puedes ponerte en contacto con la UNERG a través de su sitio web o a través de la oficina de admisiones. También puedes comunicarte con el departamento académico para obtener información detallada sobre los horarios de las materias.',
      'Si tienes preguntas sobre cómo contactar con la UNERG, te recomiendo visitar el sitio web de la universidad o contactar a la oficina de admisiones.'
    ]
  },
  {
    pregunta: 'ayuda',
    respuestas: [
      'Estoy aquí para ayudarte con tus preguntas sobre la UNERG. Si tienes alguna pregunta, no dudes en hacerla.',
      'Si necesitas información adicional o asistencia, no dudes en preguntar , dime exactamente que necesitas saber?.'
    ]
  },
  {
    pregunta: 'notas',
    respuestas: ['Las notas se cargan automáticamente a través del sistema de gestión académica. Si tienes algún problema con la carga de notas, te recomiendo comunicarte con el departamento de registros académicos de dace Unerg.','El proceso de carga de notas es mediante la pagina de dace Unerg , para poder ver tus notas debes ingresar en tu perfil de dace unerg ingresando por dace Login.']
  },
  {
    pregunta: 'notas del ultimo semestre?',
    respuestas: ['Las notas del último semestre se publicarán en marzo.','Las notas del ultimo semestre hasta donde tengo información actual , sera en marzo']
  },
  {
    pregunta: 'carreras disponibles',
    respuestas: ['Ofrecemos una variedad de carreras, incluyendo Administración de Empresas, Ingeniería Informática, Psicología, Derecho y más. Puedes consultar nuestra oferta académica completa en nuestro sitio web.','Entre las carreras disponibles que ofrece la Universidad Romulo Gallegos estan : Medicina , Fisioterapia , Derecho ,Adminsitración , Contaduria entre otros, para mayor información te recomiendo acercarte a control de estudios central']
  },
  {
    pregunta: 'medicina',
    respuestas: ['Para la carrera de Medicina, se requiere haber completado el bachillerato y aprobar el examen de admisión específico de la universidad. También se evaluarán otros criterios como el promedio académico y las actividades extracurriculares.','Para la carrera de medicina existe una amplia gama de posibilidades los requisitos los podras encontrar en la pagina de dace Unerg']
  },
  {
    pregunta: 'dura informatica',
    respuestas: ['La carrera de Informatica dura 5 años','La carrera de informatica dura 5 años pero puede variar dependiendo del estudiante si congela el proceso puede durar mas']
  },
  {
    pregunta: 'matricula',
    respuestas: ['El costo de la matrícula varía según la carrera y el número de créditos. Te recomiendo consultar la información sobre costos en nuestro sitio web o comunicarte con el departamento de finanzas de la universidad.','Hasta donde tengo información util el costo de la matricula estudiantil varia segun la carrera,para mayor información te recomendaria que te acercaras a control de estudio centrarl']
  },
  {
    pregunta: 'horario de atencion',
    respuestas: ['La oficina de admisiones dace Unerg está abierta de lunes a viernes de 8:00 am a 3:00 pm. También ofrecemos atención en línea a través de nuestro sitio web Dace Unerg y redes sociales.','El horario de atención de control de estudios es a partir de las 08:00 am puedes acercarte con gusto para mayor información']
  },
  {
    pregunta: 'proximo semestre',
    respuestas: ['Las clases del próximo semestre comenzarán en marzo del 2024.','Según la información que tengo las clases para el proximó semestre deberian de empezar en marzo, para mayor información te recomiendo que te acerques a control de estudios central']
  },
  {
    pregunta: 'becas',
    respuestas: ['Puedes encontrar información sobre becas y ayudas económicas en nuestro sitio web Dace Unerg, en la sección de servicios estudiantiles. También te recomiendo visitar la oficina de ayuda financiera para obtener asesoramiento personalizado.','Para obtener una beca en la Universidad Romulo Gallegos debes llenar una serie de requisitos, uno de los requisitos seria tener un promedio academico mayor a 7/10']
  },
  {
    pregunta: 'beca',
    respuestas: ['Puedes encontrar información sobre becas y ayudas económicas en nuestro sitio web Dace Unerg, en la sección de servicios estudiantiles. También te recomiendo visitar la oficina de ayuda financiera para obtener asesoramiento personalizado.','Para obtener una beca en la Universidad Romulo Gallegos debes llenar una serie de requisitos, uno de los requisitos seria tener un promedio academico mayor a 7/10']
  },
  {
    pregunta: 'requisitos',
    respuestas:['Los requisitos para las incripciones nuevo ingreso , serian foto copia de la cedula , fotocopia del titulo de bachiller entre otros, te recomiendo acercarte a la oficina de dace control y admisiones','podrias acercarte a la oficina de dace para mayor informacion sobre los requisitos para inscripciones','Entre los requisitos para las inscripciones de estudiantes nuevo ingreso seria foto copia de la cedula , foto copia del titulo de bachiller , planilla de inscripcion entre otros te recomiendo que te acerques a control de estudios central para una mayor información']
  },
  {
    pregunta: 'gracias',
    respuestas:['Estoy agusto de poder resolver tus dudas','Estoy siempre a la order que me necesites','Me siento complacido de poder resolver tus dudas']
  },
   {
    pregunta:'Hola',
    respuestas:[
  '¡Hola! ¿En qué puedo ayudarte?',
  'Estoy aquí para responder tus preguntas. Adelante, pregúntame algo.',
  '¿Necesitas ayuda con algo en particular?',
  'Estoy listo para asistirte. Dispara tu pregunta.',
  '¡Claro! Estoy aquí para ayudarte.',
  '¿Tienes alguna consulta en mente?',
  'Puedo brindarte información sobre diversos temas. ¿Qué necesitas saber?',
  'Estoy a tu disposición. Hazme una pregunta.',
  '¡Hola! ¿En qué puedo colaborar contigo hoy?',
  '¿Cómo puedo asistirte en este momento?',
  'Estoy aquí para brindarte respuestas. Adelante, pregúntame.',
  '¿En qué puedo contribuir a tu día?',
  'Estoy listo para recibir tus preguntas. Dispara.',
  '¿Necesitas información específica? Estoy aquí para ayudarte.',
  '¡Hola! Espero poder resolver tus dudas. Adelante, pregúntame.',
  'Si tienes alguna pregunta, no dudes en hacerla. Estoy aquí para ayudarte.',
  '¿En qué puedo ser de utilidad en este momento?',
  'Estoy preparado para responder tus consultas. Adelante, pregúntame lo que desees.',
  '¿Cuál es tu pregunta? Intentaré darte la mejor respuesta posible.',
  'Estoy aquí para ayudarte en lo que necesites. Adelante, pregúntame.',
  '¡Hola! ¿En qué puedo colaborar contigo hoy?'
]
  }
  ,
  {
  pregunta:'quien es randy',
  respuestas:['Randy Graterol es mi creador y desarrollador','Es un estudiante de la universidad UNERG centrado en el desarrollo back-end de Javascript','Tu papa']
  }
];

// Manejar el evento de mensaje recibido
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;
  console.log(message,'mensaje.....');

  // Buscar la pregunta en la lista y enviar la respuesta correspondiente
  const preguntaEncontrada = preguntasRespuestas.find(item => message.toLowerCase().includes(item.pregunta.toLowerCase()));
  if (preguntaEncontrada){
   const respuestas = preguntaEncontrada.respuestas;
    const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];
    bot.sendMessage(chatId, respuestaAleatoria);
  } else {
    // Responder a mensajes no reconocidos
    bot.sendMessage(chatId, 'Lo siento, no puedo responder a esa pregunta en este momento, ya que soy un bot que se encuentra en desarollo , en un futuro me sentire complacido de poder responder a todas tus preguntas');
  }
});

// Iniciar el servidor Express
app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});