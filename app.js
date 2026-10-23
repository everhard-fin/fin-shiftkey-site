const INTERCOM_APP_ID = "teoh1c75"; // public Messenger app_id, not a secret
window.intercomSettings = { app_id: INTERCOM_APP_ID, alignment: "right" };
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/'+INTERCOM_APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
function resetConversation(){ window.Intercom('shutdown'); window.Intercom('boot', { app_id: INTERCOM_APP_ID }); }

const STORE_KEY = "fin-shiftkey-passed";

function loadResults() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
}
function saveResults(r) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(r)); } catch (e) { /* storage unavailable */ }
}

const NAME_KEY = "fin-shiftkey-name";
const NOTES_KEY = "fin-shiftkey-notes";

function loadJSON(key) {
  try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; }
}
function saveJSON(key, v) {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) { /* storage unavailable */ }
}
function loadName() {
  try { return localStorage.getItem(NAME_KEY) || ""; } catch (e) { return ""; }
}
function saveName(n) {
  try { localStorage.setItem(NAME_KEY, n); } catch (e) { /* storage unavailable */ }
}

function allScenarios() {
  const list = window.SCENARIOS.map((s, i) => ({ s, label: (i + 1) + " " + s.title }));
  return list.concat(window.NEGATIVES.map(s => ({ s, label: s.title })));
}

function encodeState() {
  const p = loadResults();
  const notes = loadJSON(NOTES_KEY);
  const data = { n: loadName(), p, notes };
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  let bin = "";
  bytes.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeState(str) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "===".slice((b64.length + 3) % 4));
  const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function hasState() {
  return !!(loadName() || Object.keys(loadResults()).length || Object.keys(loadJSON(NOTES_KEY)).length);
}

function shareUrl() {
  const base = location.href.split("#")[0];
  return hasState() ? base + "#r=" + encodeState() : base;
}

function syncHash() {
  try { history.replaceState(null, "", shareUrl()); } catch (e) { /* history unavailable */ }
}

function today() {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

function summaryLine() {
  const r = loadResults();
  const n = allScenarios().filter(({ s }) => r[s.id]).length;
  return n + " of 13 passed";
}

function updateSummary() {
  const out = document.getElementById("results-summary");
  if (out) out.textContent = summaryLine() + " · " + today();
}

function onChange() {
  updateSummary();
  syncHash();
}

function resultsText() {
  const r = loadResults();
  const notes = loadJSON(NOTES_KEY);
  const lines = ["ShiftKey Fin test results, " + today() + ", tester " + (loadName() || "unnamed")];
  allScenarios().forEach(({ s, label }) => {
    const note = (notes[s.id] || "").trim();
    lines.push(label + ": " + (r[s.id] ? "PASS" : "not yet") + (note ? " (" + note + ")" : ""));
  });
  lines.push(summaryLine());
  lines.push("Link: " + shareUrl());
  return lines.join("\n");
}

function applyHash() {
  const m = /^#r=([A-Za-z0-9_-]+)$/.exec(location.hash);
  if (!m) return false;
  try {
    const d = decodeState(m[1]);
    const valid = new Set(allScenarios().map(({ s }) => s.id));
    const p = {};
    Object.keys(d.p || {}).forEach(k => { if (valid.has(k) && d.p[k]) p[k] = true; });
    const notes = {};
    Object.keys(d.notes || {}).forEach(k => { if (valid.has(k) && d.notes[k]) notes[k] = String(d.notes[k]).slice(0, 200); });
    saveResults(p);
    saveJSON(NOTES_KEY, notes);
    saveName(String(d.n || "").slice(0, 100));
    return true;
  } catch (e) {
    return false;
  }
}

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
}

function copyText(text, btn) {
  const done = () => {
    const old = btn.dataset.label || btn.textContent;
    btn.dataset.label = old;
    btn.textContent = "Copied";
    setTimeout(() => { btn.textContent = old; }, 1200);
  };
  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { btn.textContent = "Press Ctrl+C"; }
    document.body.removeChild(ta);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done, fallback);
  } else {
    fallback();
  }
}

function copyBtn(text, label) {
  const b = el("button", "copy-btn", label || "Copy");
  b.type = "button";
  b.addEventListener("click", () => copyText(text, b));
  return b;
}

function buildCard(s, index, results) {
  const card = el("article", "card");
  card.id = s.id;

  const head = el("div", "card-head");
  head.appendChild(el("span", "num", index));
  head.appendChild(el("h3", "", s.title));
  card.appendChild(head);

  const chip = el("div", s.persona ? "chip" : "chip chip-none");
  if (s.persona) {
    chip.appendChild(el("strong", "", s.persona.name));
    const em = el("code", "", s.persona.email);
    chip.appendChild(em);
    chip.appendChild(copyBtn(s.persona.email));
  } else {
    chip.textContent = "No account needed";
  }
  card.appendChild(chip);

  const tabs = el("div", "tabs");
  tabs.setAttribute("role", "tablist");
  const panels = el("div", "panels");

  const chatPanel = el("div", "panel");
  const chatList = el("ol", "steps");
  s.chat.forEach(step => {
    const li = el("li");
    if (step.k === "click") {
      li.appendChild(document.createTextNode("Click "));
      li.appendChild(el("span", "pill", step.t));
    } else {
      li.appendChild(document.createTextNode("Type "));
      li.appendChild(el("code", "line", step.t));
      li.appendChild(copyBtn(step.t));
    }
    chatList.appendChild(li);
  });
  chatPanel.appendChild(chatList);

  const voicePanel = el("div", "panel");
  const voiceList = el("ol", "steps");
  s.voice.forEach(line => voiceList.appendChild(el("li", "", line)));
  voicePanel.appendChild(voiceList);

  const entries = [["Chat", chatPanel], ["Voice", voicePanel]];
  const tabBtns = entries.map(([label, panel], i) => {
    const b = el("button", "tab", label);
    b.type = "button";
    b.setAttribute("role", "tab");
    b.addEventListener("click", () => select(i));
    tabs.appendChild(b);
    panels.appendChild(panel);
    return b;
  });
  function select(i) {
    entries.forEach(([, panel], j) => {
      panel.hidden = j !== i;
      tabBtns[j].classList.toggle("active", j === i);
      tabBtns[j].setAttribute("aria-selected", j === i ? "true" : "false");
    });
  }
  select(0);
  card.appendChild(tabs);
  card.appendChild(panels);

  card.appendChild(el("h4", "", "Fin should"));
  const fin = el("ul", "fin");
  s.fin.forEach(t => fin.appendChild(el("li", "", t)));
  card.appendChild(fin);

  const pass = el("p", "pass");
  pass.appendChild(el("strong", "", "Pass if: "));
  pass.appendChild(document.createTextNode(s.pass));
  card.appendChild(pass);

  const label = el("label", "check");
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.checked = !!results[s.id];
  cb.dataset.id = s.id;
  cb.addEventListener("change", () => {
    const r = loadResults();
    if (cb.checked) r[s.id] = true; else delete r[s.id];
    saveResults(r);
    card.classList.toggle("done", cb.checked);
    onChange();
  });
  label.appendChild(cb);
  label.appendChild(document.createTextNode(" Passed"));
  card.classList.toggle("done", cb.checked);

  const row = el("div", "check-row");
  row.appendChild(label);
  const note = document.createElement("input");
  note.type = "text";
  note.className = "note-input";
  note.maxLength = 200;
  note.placeholder = "Notes (optional)";
  note.setAttribute("aria-label", "Notes for " + s.title);
  note.value = loadJSON(NOTES_KEY)[s.id] || "";
  note.addEventListener("input", () => {
    const n = loadJSON(NOTES_KEY);
    if (note.value.trim()) n[s.id] = note.value; else delete n[s.id];
    saveJSON(NOTES_KEY, n);
    onChange();
  });
  row.appendChild(note);
  card.appendChild(row);
  return card;
}

function render() {
  const loaded = applyHash();
  const results = loadResults();

  const tbody = document.getElementById("persona-rows");
  window.PERSONAS.forEach(p => {
    const tr = document.createElement("tr");
    const nameTd = el("td", "", p.name);
    nameTd.dataset.label = "Provider";
    const emailTd = el("td");
    emailTd.dataset.label = "Email";
    emailTd.appendChild(el("code", "", p.email));
    emailTd.appendChild(copyBtn(p.email));
    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    [["In Review", p.inReview], ["Invalid", p.invalid], ["Missing", p.missing], ["Eligible", p.eligible]].forEach(([l, v]) => {
      const td = el("td", "", v);
      td.dataset.label = l;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  const grid = document.getElementById("scenario-grid");
  window.SCENARIOS.forEach((s, i) => grid.appendChild(buildCard(s, String(i + 1), results)));
  const neg = document.getElementById("negative-grid");
  window.NEGATIVES.forEach((s, i) => neg.appendChild(buildCard(s, "ABC"[i], results)));

  const nameInput = document.getElementById("tester-name");
  nameInput.value = loadName();
  nameInput.addEventListener("input", () => { saveName(nameInput.value); onChange(); });

  document.getElementById("copy-results").addEventListener("click", e => copyText(resultsText(), e.currentTarget));
  document.getElementById("copy-link").addEventListener("click", e => copyText(shareUrl(), e.currentTarget));

  if (loaded) document.getElementById("shared-banner").hidden = false;
  onChange();

  document.getElementById("clear-results").addEventListener("click", () => {
    saveResults({});
    saveJSON(NOTES_KEY, {});
    saveName("");
    nameInput.value = "";
    document.querySelectorAll(".check input").forEach(c => { c.checked = false; });
    document.querySelectorAll(".note-input").forEach(c => { c.value = ""; });
    document.querySelectorAll(".card").forEach(c => c.classList.remove("done"));
    document.getElementById("shared-banner").hidden = true;
    onChange();
  });
  document.getElementById("reset-conversation").addEventListener("click", resetConversation);
}

document.addEventListener("DOMContentLoaded", render);
