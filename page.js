// ================= Role Typing Effect =================

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "AI-Integrated App Developer",
  "REST API Developer"
];

let roleIndex = 0;
const typingEl = document.getElementById("typing");

function typeRole(text, i, el, done){
  if(i <= text.length){
    el.textContent = text.slice(0, i);
    setTimeout(() => typeRole(text, i + 1, el, done), 45);
  } else {
    setTimeout(done, 1400);
  }
}

function eraseRole(text, i, el, done){
  if(i >= 0){
    el.textContent = text.slice(0, i);
    setTimeout(() => eraseRole(text, i - 1, el, done), 25);
  } else {
    done();
  }
}

function cycleRoles(){
  const current = roles[roleIndex];
  typeRole(current, 0, typingEl, () => {
    eraseRole(current, current.length, typingEl, () => {
      roleIndex = (roleIndex + 1) % roles.length;
      cycleRoles();
    });
  });
}

if(typingEl) cycleRoles();


// ================= Hero "profile.json" Terminal Reveal =================
// Numbered code lines type in one by one on load.

const P = (t) => `<span class="punc">${t}</span>`;
const K = (t) => `<span class="key">"${t}"</span>`;
const S = (t) => `<span class="str">"${t}"</span>`;
const I = (t) => `<span class="item">"${t}"</span>`;

const codeLines = [
  `<span class="brace">{</span>`,
  `  ${K("name")}${P(": ")}${S("Yaksh Saini")}${P(",")}`,
  `  ${K("role")}${P(": ")}${S("Full Stack Developer")}${P(",")}`,
  `  ${K("stack")}${P(": [")}${I("React")}${P(", ")}${I("Node")}${P(", ")}${I("Express")}${P(", ")}${I("MongoDB")}${P("],")}`,
  `  ${K("focus")}${P(": ")}${S("MERN + AI-Integrated Apps")}${P(",")}`,
  `  ${K("status")}${P(": ")}${S("open to opportunities")}`,
  `<span class="brace">}</span><span class="caret"></span>`
];

const editorBody = document.getElementById("editor-body");

function renderProfileJSON(){
  if(!editorBody) return;
  editorBody.innerHTML = "";
  let i = 0;

  function addLine(){
    if(i >= codeLines.length) return;
    const row = document.createElement("div");
    row.className = "code-line";
    row.innerHTML = `<span class="ln">${i + 1}</span><span class="code">${codeLines[i]}</span>`;
    editorBody.appendChild(row);
    i++;
    setTimeout(addLine, 230);
  }
  setTimeout(addLine, 400);
}

renderProfileJSON();


// ================= Subtle 3D tilt on the editor card =================

const tiltZone = document.querySelector(".hero-right");
const tiltCard = document.querySelector(".editor-window");

if(tiltZone && tiltCard){
  tiltZone.addEventListener("mousemove", (e) => {
    const r = tiltZone.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltCard.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  tiltZone.addEventListener("mouseleave", () => {
    tiltCard.style.transform = "rotateY(0) rotateX(0)";
  });
}


// ================= Cursor Dot =================

const cursor = document.querySelector(".cursor");
const root = document.documentElement;

let targetX = -999, targetY = -999;
let glowX = -999, glowY = -999;

document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
  if(cursor){
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }
});

// Gold spotlight on the giant "YAKSH" trails the cursor slightly for a smooth feel
function animateGlow(){
  glowX += (targetX - glowX) * 0.14;
  glowY += (targetY - glowY) * 0.14;
  root.style.setProperty("--mx", glowX + "px");
  root.style.setProperty("--my", glowY + "px");
  requestAnimationFrame(animateGlow);
}
animateGlow();


// ================= Scroll Reveal =================

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll("section").forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});
