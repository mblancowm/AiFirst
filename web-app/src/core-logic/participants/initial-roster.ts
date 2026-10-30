export interface InitialRosterParticipant {
  name: string;
  email: string;
}

export interface InitialRosterTeam {
  name: string;
  participants: InitialRosterParticipant[];
}

export const INITIAL_ROSTER: InitialRosterTeam[] = [
  {
    name: "Grupo 1",
    participants: [
      { name: "Daniel Sing", email: "dsing@westmonroepartners.com" },
      { name: "Marco Gamboa", email: "mgamboa@westmonroepartners.com" },
      { name: "Andres Maltes", email: "amaltes@westmonroepartners.com" },
      { name: "Alexa Garcia", email: "amgarcia@westmonroepartners.com" },
    ],
  },
  {
    name: "Grupo 2",
    participants: [
      { name: "Gerardo Arroyo", email: "garroyo@westmonroepartners.com" },
      { name: "Fernando Ugarte", email: "fugarte@westmonroepartners.com" },
      { name: "Kevin Campos Loria", email: "kcamposloria@westmonroepartners.com" },
      { name: "Daniela Meneses", email: "dmeneses@westmonroepartners.com" },
    ],
  },
  {
    name: "Grupo 3",
    participants: [
      { name: "Raul Monge", email: "rmonge@westmonroepartners.com" },
      { name: "Melina Hernandez Leal", email: "mhernandezleal@westmonroepartners.com" },
      { name: "Javier Gamboa Mora", email: "jgamboamora@westmonroepartners.com" },
      { name: "Alejandra Sequeira Gómez", email: "asequeira@westmonroepartners.com" },
    ],
  },
  {
    name: "Grupo 4",
    participants: [
      { name: "Enzo Potoy Chaves", email: "epotoychaves@westmonroepartners.com" },
      { name: "Jose Ricardo Sanchez", email: "jsanchez@westmonroepartners.com" },
      { name: "Anthonny Jiménez Poveda", email: "ajimenez@westmonroepartners.com" },
      { name: "Cesar Quesada", email: "cquesada@westmonroepartners.com" },
    ],
  },
  {
    name: "Grupo 5",
    participants: [
      { name: "Nayib Vargas", email: "navargas@westmonroepartners.com" },
      { name: "Valeria Tuchs", email: "vtuchs@westmonroepartners.com" },
      { name: "Diana Fallas", email: "dfallas@westmonroepartners.com" },
      { name: "Lariza Tatiana Rodriguez Monge", email: "ltrodriguezmonge@westmonroepartners.com" },
    ],
  },
  {
    name: "Grupo 6",
    participants: [
      { name: "John Moya Carpio", email: "jmoyacarpio@westmonroepartners.com" },
      { name: "Priscilla Salas", email: "psalas@westmonroepartners.com" },
      { name: "Gabriel Torres", email: "gtorres@westmonroepartners.com" },
      { name: "Jose Pablo Cascante", email: "jcascante@westmonroepartners.com" },
    ],
  },
  {
    name: "Grupo 7",
    participants: [
      { name: "Luis Leiton Flores", email: "LLeiton@westmonroepartners.com" },
      { name: "Anniella Alvarez Yee", email: "aalvarezyee@westmonroepartners.com" },
      { name: "Gerardo Mora Castillo", email: "gmoracastillo@westmonroepartners.com" },
      { name: "Cristina Barquero", email: "cbarquero@westmonroepartners.com" },
    ],
  },
  {
    name: "Grupo 8",
    participants: [
      { name: "Ronald Araya Arrieta", email: "rarayaarrieta@westmonroepartners.com" },
      { name: "Gabriel Elizondo", email: "gelizondo@westmonroepartners.com" },
      { name: "Carlos Montero Madrigal", email: "cmadrigal@westmonroepartners.com" },
      { name: "Wayler Mora Salas", email: "wmora@westmonroepartners.com" },
    ],
  },
  {
    name: "Grupo 9",
    participants: [
      { name: "Maria Jose Guzman", email: "mguzman@westmonroepartners.com" },
      { name: "Javier Madrigal", email: "jmadrigal@westmonroepartners.com" },
      { name: "Esteban Santamaria", email: "esantamaria@westmonroepartners.com" },
      { name: "Harun Juhasz", email: "hjuhasz@westmonroepartners.com" },
    ],
  },
  {
    name: "Grupo 10",
    participants: [
      { name: "Marianne Trejos", email: "mtrejos@westmonroepartners.com" },
      { name: "Guilherme Teixeira", email: "gteixeira@westmonroepartners.com" },
      { name: "Camila Esquivel", email: "cesquivel@westmonroepartners.com" },
    ],
  },
  {
    name: "Grupo 11",
    participants: [
      { name: "Jason Campos", email: "jcampos@westmonroepartners.com" },
      { name: "Juan Miguel", email: "jmiguel@westmonroepartners.com" },
      { name: "Ericka Soto", email: "esoto@westmonroepartners.com" },
    ],
  },
];
