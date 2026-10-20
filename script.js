const YOUTUBE_CHANNEL = "https://www.youtube.com/@logowacademy";
const YOUTUBE_SUBSCRIBE = "https://www.youtube.com/@logowacademy?sub_confirmation=1";
const INSTAGRAM_URL = "https://www.instagram.com/logow_etern/";
const WHATSAPP_NUMBER = ""; // Add the WhatsApp number with country code, digits only, when ready.

const subjectsLower = ["Tamil", "English", "Mathematics", "Science", "Social Science"];
const subjectsHigher = ["Tamil", "English", "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "Commerce", "Accountancy", "Economics"];
const classes = Array.from({length:12}, (_,i) => {
  const n = i + 1;
  return {n, name:`Class ${n}`, subjects:n <= 10 ? subjectsLower : subjectsHigher};
});
const lessons = [
 {id:"lesson1", title:"Tamil lesson: book-back practice", grade:6, medium:"Tamil", subject:"Tamil", kind:"FREE", symbol:"அ", palette:"", description:"Practise lesson questions and review key points.", url:YOUTUBE_CHANNEL},
 {id:"lesson2", title:"Mathematics: understand the basics", grade:7, medium:"English", subject:"Mathematics", kind:"FREE", symbol:"＋", palette:"purple", description:"Build confidence by practising one concept at a time.", url:YOUTUBE_CHANNEL},
 {id:"lesson3", title:"Science: explore and discover", grade:8, medium:"Tamil", subject:"Science", kind:"FREE", symbol:"⚛", palette:"green", description:"Review important ideas and science vocabulary.", url:YOUTUBE_CHANNEL},
 {id:"lesson4", title:"English: reading and grammar", grade:9, medium:"English", subject:"English", kind:"FREE", symbol:"Aa", palette:"orange", description:"Improve reading comprehension and language skills.", url:YOUTUBE_CHANNEL},
 {id:"lesson5", title:"Computer Science: coding concepts", grade:11, medium:"English", subject:"Computer Science", kind:"PREMIUM", symbol:"{ }", palette:"cyan", description:"A sample premium lesson card. Add your real content before publishing.", url:""},
 {id:"lesson6", title:"Physics: revision essentials", grade:12, medium:"Tamil", subject:"Physics", kind:"PREMIUM", symbol:"∿", palette:"red", description:"A sample premium lesson card for your future course library.", url:""}
];
const classGrid = document.getElementById("classGrid");
const videoGrid = document.getElementById("videoGrid");
const searchInput = document.getElementById("searchInput");
const mediumFilter = document.getElementById("mediumFilter");
const subjectFilter = document.getElementById("subjectFilter");
let selectedClass = "all";
let toastTimer;

function showToast(message) {
 const toast = document.getElementById("toast");
 toast.textContent = message;
 toast.classList.add("show");
 clearTimeout(toastTimer);
 toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}
function filteredClasses() {
 const query = searchInput.value.trim().toLowerCase();
 const medium = mediumFilter.value;
 const subject = subjectFilter.value;
 return classes.filter(c => {
   const textMatch = !query || (`${c.name} ${c.subjects.join(" ")}`).toLowerCase().includes(query);
   const subjectMatch = subject === "all" || c.subjects.includes(subject);
   const mediumMatch = medium === "all" || true; // Each class supports both mediums; medium is applied to lessons below.
   return textMatch && subjectMatch && mediumMatch;
 });
}
function renderClasses() {
 const filtered = filteredClasses();
 classGrid.innerHTML = filtered.map(c => `<button class="class-card ${selectedClass===c.n?"selected":""}" data-class="${c.n}" aria-pressed="${selectedClass===c.n}"><span class="class-shape"></span><div class="grade">${c.n}<small> / 12</small></div><p>${c.n<=10?"School curriculum":"Higher secondary"}</p><span class="class-arrow">↗</span></button>`).join("");
 document.getElementById("classEmpty").hidden = filtered.length > 0;
 classGrid.querySelectorAll("[data-class]").forEach(btn => btn.addEventListener("click", () => {
   const n = Number(btn.dataset.class);
   selectedClass = selectedClass === n ? "all" : n;
   renderClasses(); renderLessons();
   document.getElementById("library").scrollIntoView({behavior:"smooth",block:"start"});
 }));
}
function renderLessons() {
 const query = searchInput.value.trim().toLowerCase();
 const medium = mediumFilter.value;
 const subject = subjectFilter.value;
 const shown = lessons.filter(v => {
   const matchesQuery = !query || `${v.title} ${v.subject} ${v.grade} ${v.medium} ${v.description}`.toLowerCase().includes(query);
   const matchesClass = selectedClass === "all" || v.grade === selectedClass;
   const matchesMedium = medium === "all" || v.medium === medium;
   const matchesSubject = subject === "all" || v.subject === subject;
   return matchesQuery && matchesClass && matchesMedium && matchesSubject;
 });
 videoGrid.innerHTML = shown.map(v => {
   const liked = localStorage.getItem("logow-liked-"+v.id) === "yes";
   const isPremium = v.kind === "PREMIUM";
   const action = isPremium
     ? `<button type="button" data-premium="${v.id}">Premium info ↗</button>`
     : `<a href="${v.url}" target="_blank" rel="noopener">Watch lesson ↗</a>`;
   return `<article class="video-card"><div class="video-thumb ${v.palette}"><span class="video-badge ${isPremium?"premium":""}">${isPremium?"✦ PREMIUM":"FREE LESSON"}</span><span class="thumb-symbol">${v.symbol}</span><span class="video-play">▶</span><span class="video-duration">CLASS ${v.grade}</span></div><div class="video-info"><div class="video-meta"><span>CLASS ${v.grade}</span><span class="dot"></span><span>${v.medium.toUpperCase()} MEDIUM</span><span class="dot"></span><span>${v.subject.toUpperCase()}</span></div><h3>${v.title}</h3><p>${v.description}</p><div class="video-actions">${action}<button type="button" class="like-button ${liked?"liked":""}" data-like="${v.id}" aria-pressed="${liked}">${liked?"♥ Liked":"♡ Like"}</button></div></div></article>`;
 }).join("");
 if (!shown.length) videoGrid.innerHTML = `<p class="empty-state">No lessons match these filters yet. Try another class, medium or subject.</p>`;
 videoGrid.querySelectorAll("[data-like]").forEach(btn => btn.addEventListener("click", () => {
   const key = "logow-liked-"+btn.dataset.like;
   const next = localStorage.getItem(key) !== "yes";
   localStorage.setItem(key, next ? "yes" : "no");
   renderLessons();
   showToast(next ? "Like saved on this device." : "Like removed on this device.");
 }));
 videoGrid.querySelectorAll("[data-premium]").forEach(btn => btn.addEventListener("click", () => showToast("Premium purchases are not active in this static GitHub Pages version.")));
}
searchInput.addEventListener("input", () => { renderClasses(); renderLessons(); });
mediumFilter.addEventListener("change", renderLessons);
subjectFilter.addEventListener("change", () => { selectedClass = "all"; renderClasses(); renderLessons(); });

const nav = document.getElementById("mainNav");
document.getElementById("menuToggle").addEventListener("click", () => {
 const isOpen = nav.classList.toggle("open");
 document.getElementById("menuToggle").setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const profileModal = document.getElementById("profileModal");
document.getElementById("profileOpen").addEventListener("click", () => {
 const saved = localStorage.getItem("logow-display-name") || "";
 document.getElementById("displayName").value = saved;
 document.getElementById("profileStatus").textContent = "";
 profileModal.hidden = false;
});
document.getElementById("profileClose").addEventListener("click", () => profileModal.hidden = true);
profileModal.addEventListener("click", e => { if (e.target === profileModal) profileModal.hidden = true; });
document.getElementById("saveProfile").addEventListener("click", () => {
 const name = document.getElementById("displayName").value.trim();
 if (!name) { document.getElementById("profileStatus").textContent = "Please enter a display name."; return; }
 localStorage.setItem("logow-display-name", name);
 document.getElementById("profileStatus").textContent = "Saved on this device.";
 showToast("Profile name saved on this device.");
});

const subscribeModal = document.getElementById("subscribeModal");
if (!localStorage.getItem("logow-subscribe-prompt-dismissed")) {
 setTimeout(() => { if (!document.hidden) subscribeModal.hidden = false; }, 1400);
}
function dismissSubscribe() {
 subscribeModal.hidden = true;
 localStorage.setItem("logow-subscribe-prompt-dismissed", "yes");
}
document.getElementById("subscribeClose").addEventListener("click", dismissSubscribe);
document.getElementById("subscribeDismiss").addEventListener("click", dismissSubscribe);
document.getElementById("subscribeGo").addEventListener("click", () => localStorage.setItem("logow-subscribe-prompt-dismissed", "yes"));
subscribeModal.addEventListener("click", e => { if (e.target === subscribeModal) dismissSubscribe(); });

document.getElementById("contactButton").addEventListener("click", () => {
 if (!WHATSAPP_NUMBER) { showToast("WhatsApp number has not been configured yet."); return; }
 window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener");
});
document.getElementById("year").textContent = new Date().getFullYear();
document.addEventListener("keydown", e => {
 if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); searchInput.focus(); }
 if (e.key === "Escape") { profileModal.hidden = true; subscribeModal.hidden = true; }
});
renderClasses();
renderLessons();
