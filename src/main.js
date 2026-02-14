import "./style.css";

const LINES = [
  { text: "To my pink flamingo, mahal", style: "greeting" },
  {
    text: "I don't always have the right words, and it's even harder without AI",
    style: "body",
  },
  {
    text: "But",
    style: "body",
  },
  {
    text: "You make oridinary days feel lighter, and I don't know how I ever lived without you",
    style: "body",
  },
  {
    text: "I love the way you give your best, your kindness, your patience",
    style: "body",
  },
  {
    text: "Thank you for being you, and for letting me be close to you.",
    style: "body",
  },
  {
    text: "~forehead kisses~",
    style: "body",
  },
  {
    text: "If you ever forget how loved you are, I hope you come back to this and remember",
    style: "body",
  },
  { text: "With all my love,", style: "signoff" },
  { text: "\u2014 always yours", style: "signature" },
];

function render() {
  const app = document.querySelector("#app");

  const linesHtml = LINES.map(
    (l, i) =>
      `<p class="line line--${l.style}" data-line="${i}" hidden>${l.text}</p>`,
  ).join("\n              ");

  app.innerHTML = `
    <main class="page">
      <div class="stage">
        <section class="scene" data-state="closed" aria-label="Envelope with a letter inside">
          <button class="envelope" type="button" id="openBtn" aria-controls="letter" aria-expanded="false">
            <span class="envelope__shadow" aria-hidden="true"></span>
            <span class="envelope__back" aria-hidden="true"></span>
            <span class="envelope__flap" aria-hidden="true"></span>
            <span class="envelope__front" aria-hidden="true"></span>
            <span class="envelope__seal" aria-hidden="true">
              <img class="seal__img" src="/heart.svg" alt="" />
            </span>
          </button>

          <article class="letter" id="letter" aria-hidden="true">
            <div class="letter__paper">
              ${linesHtml}

              <div class="actions actions--next" id="nextActions">
                <button class="btn btn--big" type="button" id="nextBtn">Next</button>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  `;
}

function setup() {
  render();

  const scene = document.querySelector(".scene");
  const openBtn = document.querySelector("#openBtn");
  const letter = document.querySelector("#letter");

  const nextBtn = document.querySelector("#nextBtn");
  const nextActions = document.querySelector("#nextActions");

  const allLines = document.querySelectorAll(".line");

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const OPEN_MS = reduceMotion ? 0 : 300;

  let currentLine = -1;

  /* ---------- Line stepper ---------- */

  function showLine(index) {
    // Hide all lines
    allLines.forEach((el) => {
      el.hidden = true;
      el.classList.remove("line--visible");
    });

    // Show the target line
    if (index >= 0 && index < LINES.length) {
      const el = allLines[index];
      el.hidden = false;
      // Trigger reflow so the fade-in animation replays
      void el.offsetWidth;
      el.classList.add("line--visible");
    }

    const isLast = index >= LINES.length - 1;

    // Hide Next on the last line
    nextActions.hidden = isLast;
  }

  function advanceLine() {
    if (currentLine < LINES.length - 1) {
      currentLine++;
      showLine(currentLine);
    }
  }

  function resetLines() {
    currentLine = -1;
    allLines.forEach((el) => {
      el.hidden = true;
      el.classList.remove("line--visible");
    });
    nextActions.hidden = false;
  }

  /* ---------- Envelope state ---------- */

  function setState(state) {
    scene.dataset.state = state;

    const isOpen = state === "open";
    openBtn.setAttribute("aria-expanded", String(isOpen));
    letter.setAttribute("aria-hidden", String(!isOpen));
    openBtn.disabled = state !== "closed";
  }

  function openEnvelope() {
    if (scene.dataset.state !== "closed") return;
    setState("opening");

    window.setTimeout(() => {
      setState("open");
      // Show first line automatically after envelope opens
      currentLine = 0;
      showLine(0);
    }, OPEN_MS);
  }

  /* ---------- Events ---------- */

  openBtn.addEventListener("click", openEnvelope);
  nextBtn.addEventListener("click", advanceLine);

  scene.addEventListener("keydown", (e) => {
    if (scene.dataset.state !== "closed") return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope();
    }
  });

  /* ---------- Init ---------- */

  resetLines();
  setState("closed");
}

setup();
