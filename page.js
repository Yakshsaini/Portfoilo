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
// A single orchestrated typewriter moment on page load, rather than
// scattered animations across the page.

const profileLines = [
  { key: '"name"', value: '"Yaksh Saini"' },
  { key: '"role"', value: '"Full Stack Developer"' },
  { key: '"stack"', value: '["React", "Node", "Express", "MongoDB"]' },
  { key: '"focus"', value: '"MERN + AI-Integrated Apps"' },
  { key: '"status"', value: '"open to opportunities"' }
];

const editorBody = document.getElementById("editor-body");

function renderProfileJSON(){
  if(!editorBody) return;

  let html = '<span class="brace">{</span><br>';
  editorBody.innerHTML = html;

  let lineIdx = 0;

  function addLine(){
    if(lineIdx >= profileLines.length){
      editorBody.innerHTML += '<span class="brace">}</span>';
      return;
    }
    const line = profileLines[lineIdx];
    const comma = lineIdx < profileLines.length - 1 ? ',' : '';
    editorBody.innerHTML +=
      `&nbsp;&nbsp;<span class="key">${line.key}</span><span class="punc">: </span>` +
      `<span class="str">${line.value}</span><span class="punc">${comma}</span><br>`;
    lineIdx++;
    setTimeout(addLine, 260);
  }

  setTimeout(addLine, 400);
}

renderProfileJSON();


// ================= Cursor Dot =================

const cursor = document.querySelector(".cursor");
if(cursor){
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}


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
