3. script.js
javascript


const questions = [
  {
    q: "Qual tag cria um link HTML?",
    a: ["<link>", "<a>", "<href>", "<url>"],
    correct: 1,
    explanation: "A tag <a> cria links usando o atributo href."
  },
  {
    q: "Qual propriedade muda a cor do texto?",
    a: ["background", "color", "font-size", "margin"],
    correct: 1,
    explanation: "A propriedade color define a cor do texto."
  },
  {
    q: "Quanto é 2 + 3 * 4 em JavaScript?",
    a: ["20", "14", "24", "9"],
    correct: 1,
    explanation: "A multiplicação acontece primeiro: 2 + 12 = 14."
  },
  {
    q: "Qual símbolo seleciona uma classe CSS?",
    a: ["#", ".", "@", "&"],
    correct: 1,
    explanation: "O ponto (.) seleciona classes CSS."
  },
  {
    q: "Qual tag insere uma imagem?",
    a: ["<image>", "<picture>", "<img>", "<src>"],
    correct: 2,
    explanation: "A tag <img> é usada para exibir imagens."
  },
  {
    q: "Qual declaração permite reatribuir uma variável?",
    a: ["const", "let", "fixed", "define"],
    correct: 1,
    explanation: "Variáveis declaradas com let podem receber novos valores."
  },
  {
    q: "Qual propriedade altera a cor de fundo?",
    a: ["color", "background-color", "text", "border"],
    correct: 1,
    explanation: "background-color define a cor de fundo."
  },
  {
    q: "Como mostrar uma mensagem no console?",
    a: [
      "console.write()",
      "print()",
      "console.log()",
      "show()"
    ],
    correct: 2,
    explanation: "console.log() exibe informações no console."
  },
  {
    q: "Qual tag cria uma lista ordenada?",
    a: ["<ul>", "<ol>", "<li>", "<list>"],
    correct: 1,
    explanation: "<ol> cria uma lista numerada."
  },
  {
    q: "Qual operador compara valor e tipo?",
    a: ["=", "==", "===", "!="],
    correct: 2,
    explanation: "=== compara valor e tipo sem conversão implícita."
  }
];

const $ = id => document.getElementById(id);

let questionsGame = [];
let current = 0;
let points = 0;
let time = 20;
let timer = null;
let locked = false;

$("start").addEventListener("click", startGame);
$("next").addEventListener("click", nextQuestion);
$("restart").addEventListener("click", startGame);

function startGame() {
  clearInterval(timer);

  questionsGame = [...questions].sort(() => Math.random() - 0.5);
  current = 0;
  points = 0;

  $("menu").classList.add("hidden");
  $("result").classList.add("hidden");
  $("game").classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  clearInterval(timer);

  locked = false;
  time = 20;

  const q = questionsGame[current];

  $("number").textContent =
    `Pergunta ${current + 1}/${questionsGame.length}`;

  $("points").textContent = `Pontos: ${points}`;
  $("timer").textContent = `⏱️ ${time} segundos`;
  $("question").textContent = q.q;
  $("bar").style.width =
    `${current / questionsGame.length * 100}%`;

  $("feedback").className = "hidden";
  $("next").classList.add("hidden");
  $("options").innerHTML = "";

  q.a.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "option";
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(index));

    $("options").appendChild(button);
  });

  timer = setInterval(() => {
    time--;
    $("timer").textContent = `⏱️ ${time} segundos`;

    if (time <= 0) {
      clearInterval(timer);
      checkAnswer(-1);
    }
  }, 1000);
}

function checkAnswer(choice) {
  if (locked) return;

  locked = true;
  clearInterval(timer);

  const q = questionsGame[current];
  const correct = choice === q.correct;

  if (correct) points += 100;

  [...$("options").children].forEach((button, index) => {
    button.disabled = true;

    if (index === q.correct) {
      button.classList.add("correct");
    } else if (index === choice) {
      button.classList.add("wrong");
    }
  });

  $("points").textContent = `Pontos: ${points}`;
  $("feedback").className = correct
    ? "success"
    : "error";

  $("feedback").textContent =
    (correct
      ? "✅ Correto! +100 pontos. "
      : choice === -1
        ? "⏰ Tempo esgotado! "
        : "❌ Resposta errada. ") + q.explanation;

  $("bar").style.width =
    `${(current + 1) / questionsGame.length * 100}%`;

  $("next").textContent =
    current === questionsGame.length - 1
      ? "Ver resultado 🏆"
      : "Próxima →";

  $("feedback").classList.remove("hidden");
  $("next").classList.remove("hidden");
}

function nextQuestion() {
  if (!locked) return;

  current++;

  if (current < questionsGame.length) {
    showQuestion();
  } else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);

  $("game").classList.add("hidden");
  $("result").classList.remove("hidden");

  const total = questionsGame.length;
  const hits = points / 100;
  const percentage = Math.round(hits / total * 100);

  $("message").textContent =
    percentage >= 80
      ? "🏆 Excelente!"
      : percentage >= 50
        ? "🚀 Muito bem!"
        : "💪 Continue praticando!";

  $("final").textContent =
    `Você fez ${points} pontos e acertou ${hits} de ${total} perguntas (${percentage}%).`;
}

