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
  });
  label.appendChild(cb);
  label.appendChild(document.createTextNode(" Passed"));
  card.classList.toggle("done", cb.checked);
  card.appendChild(label);
  return card;
}

function render() {
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

  document.getElementById("clear-results").addEventListener("click", () => {
    saveResults({});
    document.querySelectorAll(".check input").forEach(c => { c.checked = false; });
    document.querySelectorAll(".card").forEach(c => c.classList.remove("done"));
  });
  document.getElementById("reset-conversation").addEventListener("click", resetConversation);
}

document.addEventListener("DOMContentLoaded", render);
