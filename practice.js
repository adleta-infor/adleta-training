/* Practice engine: spaced reps, fading help, drills, keyboard card, SME team board.
   Loaded after portal data and before learning-hub.js. Defines functions only; nothing runs on load except the patches at the bottom.
   Progress is saved per person on this computer. To share it (so SMEs see their team), set window.PRACTICE_SYNC = { save(user, data) } later. */

const PR_PREFIX = 'adleta-m3-practice:';
let PR = null, REP_CUR = null, REP_TIMER = null;

/* ---------- storage ---------- */
function pr() {
  if (PR && PR._u === currentUser) return PR;
  try { PR = JSON.parse(localStorage.getItem(PR_PREFIX + currentUser) || '{}'); } catch (e) { PR = {}; }
  PR.reps = PR.reps || {}; PR.team = PR.team || {}; PR.days = PR.days || []; PR._u = currentUser;
  return PR;
}
function prSave() {
  try { localStorage.setItem(PR_PREFIX + currentUser, JSON.stringify(PR)); } catch (e) {}
  if (window.PRACTICE_SYNC) { try { window.PRACTICE_SYNC.save(currentUser, PR); } catch (e) {} }
}

/* ---------- dates ---------- */
function prToday() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function prAddDays(day, n) { const d = new Date(day + 'T12:00:00'); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
function prDaysBetween(a, b) { return Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000); }
function prNice(day) { const n = prDaysBetween(prToday(), day); return n <= 0 ? 'today' : n === 1 ? 'tomorrow' : 'in ' + n + ' days'; }

/* ---------- strength ---------- */
function repInterval(n) { return REP_INTERVALS[Math.max(0, Math.min(n - 1, REP_INTERVALS.length - 1))]; }
function repRec(sid) {
  const P = pr(); let r = P.reps[sid];
  if (!r && (ST[`quiz-score-${sid}`] || 0) >= 70) { r = P.reps[sid] = { n: 1, last: prToday(), due: prToday(), hist: [] }; prSave(); }
  return r || null;
}
function repState(sid) {
  const r = repRec(sid); if (!r) return { level: 0, fading: false, due: null, n: 0 };
  let level = r.n <= 0 ? 0 : r.n === 1 ? 1 : r.n === 2 ? 2 : r.n <= 4 ? 3 : 4;
  const late = prDaysBetween(r.due, prToday());
  const fading = level >= 2 && late > Math.max(2, repInterval(r.n));
  if (fading) level -= 1;
  return { level, fading, due: r.due, n: r.n, best: r.best };
}
function repSessions() { const out = []; orderedModules().forEach(m => m.sessions.forEach((s, i) => out.push({ m, s, i }))); return out; }
function repsDue() { const t = prToday(); return repSessions().filter(x => { const r = repRec(x.s.id); return r && r.due <= t; }).sort((a, b) => repRec(a.s.id).due.localeCompare(repRec(b.s.id).due)); }
function nextNewLesson() { return repSessions().find(x => !repRec(x.s.id)) || null; }
function repStreak() {
  const days = new Set(pr().days); let d = prToday(), n = 0;
  if (!days.has(d)) d = prAddDays(d, -1);
  while (days.has(d)) { n++; d = prAddDays(d, -1); }
  return n;
}
function repMark() { const P = pr(), t = prToday(); if (!P.days.includes(t)) { P.days.push(t); P.days = P.days.slice(-120); } }
function strengthDots(level, fading) { return `<span class="str-dots${fading ? ' fading' : ''}" title="${REP_LEVELS[level]}${fading ? ' (fading)' : ''}">${[1, 2, 3, 4].map(i => `<i class="${i <= level ? 'on' : ''}"></i>`).join('')}</span>`; }
function moduleStrength(m) {
  const c = { solid: 0, practicing: 0, fresh: 0, fading: 0 };
  m.sessions.forEach(s => { const st = repState(s.id); if (st.fading) c.fading++; if (st.level >= 3) c.solid++; else if (st.level >= 1) c.practicing++; else c.fresh++; });
  return c;
}

/* ---------- people ---------- */
function prFirst() { return (currentUserData.name || '').split(' ')[0]; }
function prEmail(name) { const p = (name || '').trim().toLowerCase().split(/\s+/); return p.length > 1 ? p[0] + '.' + p[p.length - 1] + '@adleta.com' : ''; }
function prLeadName(m) { return (m.owner || '').split('(')[0].split('/')[0].trim(); }
/* Department → the module whose SME leads that department (used when someone isn't on a roster, e.g. test logins). */
const DEPT_SME_MODULE = { 'Customer Service / Order Entry': 'orderManagement', 'Sales / CRM & Pricing / Reporting': 'reporting', 'Purchasing / Inventory Control': 'purchasing', 'Purchasing / Supply Chain': 'purchasing', 'Warehouse': 'logistics', 'Warehouse & Logistics': 'logistics', 'Logistics / Transportation': 'logistics', 'Accounting': 'credit', 'Credit / AR': 'credit', 'Accounts Payable': 'financeAP', 'Finance': 'financeGL', 'Product Management': 'productManagement' };
function mySme() {
  const backupsOf = name => { const m = Object.values(MODULES).find(x => prLeadName(x) === name && /\(backups?:/.test(x.owner)); return m ? (m.owner.match(/\(backups?:\s*([^)]*)\)/) || [])[1] : ''; };
  /* 1. The roster says who each person's SME is. */
  const me = (currentUserData.name || '').toLowerCase();
  const key = Object.keys(DEPT_USERS).find(k => (DEPT_USERS[k] || []).some(p => (p.first + ' ' + p.last).toLowerCase() === me));
  if (key && USERS[key]) { const n = USERS[key].name; return { name: n, backups: backupsOf(n), email: prEmail(n) }; }
  /* 2. Otherwise go by department, then by the first assigned area. */
  const m = MODULES[DEPT_SME_MODULE[currentUserData.dept]] || visibleModules().find(x => x.id !== 'foundation' && x.owner && !/All super users/i.test(x.owner));
  if (!m) return null;
  const lead = prLeadName(m);
  return { name: lead, backups: backupsOf(lead), email: prEmail(lead), module: m };
}
function teamsLink(email, msg) { return 'https://teams.microsoft.com/l/chat/0/0?users=' + encodeURIComponent(email) + '&message=' + encodeURIComponent(msg); }

/* ---------- home blocks (used by hubStart) ---------- */
function practiceHomeTop() {
  const due = repsDue(), next = nextNewLesson(), streak = repStreak(), coach = hubIsCoach(), admin = currentUserData.role === 'admin';
  let top;
  if (due.length) {
    const mins = due.slice(0, 4).length * 10;
    top = `<section class="home-next"><div><div class="home-next-label">Today's reps · about ${mins} min</div><h3>${due.length === 1 ? 'One task to practice' : due.length + ' tasks to practice'}</h3><ul class="rep-list">${due.slice(0, 4).map(x => { const st = repState(x.s.id); return `<li>${strengthDots(st.level, st.fading)} ${hubEscape(x.s.title)}</li>`; }).join('')}</ul>${due.length > 4 ? `<p>+${due.length - 4} more after these</p>` : ''}</div><button class="btn btn-primary home-go" onclick="startRep('${due[0].m.id}','${due[0].s.id}')">Start today's reps →</button></section>`;
  } else if (next) {
    top = `<section class="home-next"><div><div class="home-next-label">Your next step</div><h3>${hubEscape(next.s.title)}</h3><p>${hubEscape(next.m.name)} · Lesson ${next.i + 1} of ${next.m.sessions.length}${next.s.duration ? ' · about ' + hubEscape(next.s.duration) : ''}</p></div><button class="btn btn-primary home-go" onclick="openSession('${next.m.id}','${next.s.id}')">Start this lesson →</button></section>`;
  } else {
    top = `<section class="home-next"><div><div class="home-next-label">Your next step</div><h3>No reps due today</h3><p>Everything you've learned is fresh. Your next reps will show up here when they're due.</p></div></section>`;
  }
  const sme = (!coach && !admin) ? mySme() : null;
  const smeLine = sme ? `<div class="home-sme"><div><span class="home-next-label" style="color:var(--muted)">Your SME</span><strong>${hubEscape(sme.name)}</strong>${sme.backups ? `<span>Backup: ${hubEscape(sme.backups)}</span>` : ''}</div>${sme.email ? `<a class="mod-link" href="${teamsLink(sme.email, 'Hi ' + sme.name.split(' ')[0] + ', I have a question about M3: ')}" target="_blank" rel="noreferrer">Message ${hubEscape(sme.name.split(' ')[0])} in Teams ↗</a>` : ''}</div>` : '';
  const strip = `<div class="home-strip">${streak ? `<div class="home-chip"><b>${streak}</b> day${streak === 1 ? '' : 's'} in a row</div>` : ''}<button class="mod-link" onclick="switchView('drill')">2-minute drill</button><button class="mod-link" onclick="switchView('keys')">Keys you already know</button>${due.length && next ? `<button class="mod-link" onclick="openSession('${next.m.id}','${next.s.id}')">Next new lesson: ${hubEscape(next.s.title)}</button>` : ''}</div>`;
  const why = `<p class="home-why">Learning M3 works like learning anything by heart: a little practice, again and again, spread over days. Lessons come back as short reps. Each time you need less help, until you can do it without thinking.</p>`;
  return smeLine + top + strip + why;
}
function practiceAreaCard(m, tag) {
  const c = moduleStrength(m), n = m.sessions.length, pct = n ? Math.round(c.solid / n * 100) : 0;
  const bits = [c.solid ? `${c.solid} solid` : '', c.practicing ? `${c.practicing} practicing` : '', c.fresh ? `${c.fresh} new` : ''].filter(Boolean).join(' · ');
  return `<button class="card home-area" onclick="openModuleDetail('${m.id}')"><div class="home-area-top">${tag}${c.fading ? `<span class="pill pill-gold">${c.fading} fading</span>` : ''}</div><h3>${hubEscape(m.name)}</h3><p>${hubEscape(m.summary)}</p><div class="mod-progress"><div class="mod-progress-fill" style="width:${pct}%"></div></div><div class="home-area-count">${bits}</div></button>`;
}

/* ---------- rep runner ---------- */
function pickVariant(sid) {
  const v = REP_VARIANTS[sid]; if (!v || !v.length) return null;
  const last = ((repRec(sid) || {}).hist || []).slice(-1)[0];
  const pool = v.map((x, i) => i).filter(i => !last || i !== last.v);
  return pool[Math.floor(Math.random() * pool.length)];
}
function startRep(mid, sid) {
  clearInterval(REP_TIMER);
  REP_CUR = { mid, sid, hints: 0, shown: {}, t0: Date.now(), v: pickVariant(sid) };
  switchView('rep');
}
function repMode(sid) { const l = repState(sid).level; return l <= 1 ? 'guided' : l === 2 ? 'hints' : 'timed'; }
function practiceRep() {
  const el = document.getElementById('view-rep'); if (!REP_CUR) { el.innerHTML = '<div class="card"><p>Pick a task from Home to start a rep.</p></div>'; return; }
  const { mid, sid } = REP_CUR, m = MODULES[mid], s = m.sessions.find(x => x.id === sid), ex = (typeof EXERCISES !== 'undefined' && EXERCISES[sid]) || {};
  const st = repState(sid), mode = repMode(sid), v = REP_CUR.v != null ? REP_VARIANTS[sid][REP_CUR.v] : null;
  const modeText = { guided: ['Guided', 'All the steps are here. Follow along in M3.'], hints: ['Hints only', 'Steps are hidden. Try it first, and open a hint only if you need it.'], timed: ['On your own', 'Just the goal. Beat your best time. Hints cost you, so try without.'] }[mode];
  const tasks = (ex.tasks || []).map((t, i) => {
    const open = mode === 'guided' || REP_CUR.shown[i];
    const head = (mode === 'timed' && !REP_CUR.shown[i]) ? `<span class="rep-hidden">Step ${i + 1}</span>` : `<strong>${hubEscape(t.n)}</strong>`;
    return `<li>${head}${open ? `<ol>${t.s.map(x => `<li>${hubEscape(x)}</li>`).join('')}</ol>` : `<button class="mod-link rep-hint" onclick="repHint(${i})">Show hint</button>`}</li>`;
  }).join('');
  const tag = 'TEST-' + prFirst().toUpperCase() + '-' + prToday().slice(5).replace('-', '');
  el.innerHTML = `<button class="session-back" onclick="switchView('start')">← Back to Home</button>
  <div class="rep-head card"><div><div class="sec-eyebrow">${hubEscape(m.name)} · Rep ${st.n + 1}</div><h2>${hubEscape(s.title)}</h2><p><span class="pill pill-teal">${modeText[0]}</span> ${modeText[1]}</p></div><div class="rep-meta">${strengthDots(st.level, st.fading)}<div>${REP_LEVELS[st.level]}${st.fading ? ' · fading' : ''}</div>${mode !== 'guided' ? `<div class="rep-timer" id="rep-timer">0:00</div>${st.best ? `<div class="rep-best">Your best: ${repTime(st.best)}</div>` : ''}` : ''}</div></div>
  <div class="card rep-body">
    <div class="rep-ask"><div class="sec-eyebrow">The situation</div><p>${hubEscape(v ? v.ask : (ex.scn || s.title))}</p></div>
    <div><div class="sec-eyebrow">What good looks like</div><p>${hubEscape(v ? v.good : (ex.obj || ''))}</p></div>
    ${v && v.careful ? `<p class="hub-note"><strong>Watch out:</strong> ${hubEscape(v.careful)}</p>` : ''}
    ${v && v.confirm ? `<p class="rep-confirm">The exact screens for this one are still being confirmed. Practice it in TST, and ask your SME if what you see doesn't match.</p>` : ''}
    ${tasks ? `<div class="sec-eyebrow" style="margin-top:16px">${mode === 'guided' ? 'Steps' : 'Hints'}</div><ol class="rep-steps">${tasks}</ol>` : ''}
    <div class="rep-proof"><label>If you create or change an order, put <code>${tag}</code> in the Customer's PO field so it's easy to find in OIS300. Order number (optional):<input id="rep-order" type="text" inputmode="numeric" placeholder="e.g. 1000000471"></label></div>
  </div>
  <div class="card rep-finish"><h3>How did it go?</h3><div class="rep-btns"><button class="btn btn-primary" onclick="finishRep('own')">I did it on my own</button><button class="btn" onclick="finishRep('hints')">I needed some help</button><button class="btn" onclick="finishRep('stuck')">I got stuck</button></div><p class="home-why">Be honest. "Stuck" just brings it back tomorrow. That's how it sticks.</p></div>`;
  kbdify(el);
  clearInterval(REP_TIMER);
  if (mode !== 'guided') REP_TIMER = setInterval(() => { const t = document.getElementById('rep-timer'); if (!t) return clearInterval(REP_TIMER); t.textContent = repTime((Date.now() - REP_CUR.t0) / 1000); }, 1000);
}
function repTime(s) { s = Math.round(s); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
function repHint(i) { if (!REP_CUR.shown[i]) { REP_CUR.shown[i] = true; REP_CUR.hints++; } const keep = REP_CUR.t0; practiceRep(); REP_CUR.t0 = keep; }
function finishRep(result) {
  clearInterval(REP_TIMER);
  const { mid, sid } = REP_CUR, P = pr(), t = prToday(), secs = Math.round((Date.now() - REP_CUR.t0) / 1000), mode = repMode(sid);
  const r = P.reps[sid] = P.reps[sid] || { n: 0, hist: [] };
  const order = (document.getElementById('rep-order') || {}).value || '';
  if (result === 'stuck') { r.due = prAddDays(t, 1); }
  else {
    r.n += 1;
    const step = result === 'hints' || REP_CUR.hints > 0 ? Math.max(1, r.n - 1) : r.n;
    r.due = prAddDays(t, repInterval(step));
    if (result === 'own' && mode === 'timed' && REP_CUR.hints === 0) r.best = r.best ? Math.min(r.best, secs) : secs;
  }
  r.last = t; r.hist = (r.hist || []).concat([{ d: t, r: result, s: secs, h: REP_CUR.hints, v: REP_CUR.v, o: order.trim() }]).slice(-30);
  repMark(); prSave();
  const st = repState(sid), m = MODULES[mid], due = repsDue(), sme = mySme();
  const msg = result === 'stuck' ? 'No problem. It comes back tomorrow with the steps showing.' : result === 'hints' ? `Good. Next rep ${prNice(r.due)}.` : `Nice work. Next rep ${prNice(r.due)}${r.best === secs && mode === 'timed' ? ', and that is your best time yet' : ''}.`;
  document.getElementById('view-rep').innerHTML = `<div class="card rep-done"><div>${strengthDots(st.level, st.fading)}</div><h2>${msg}</h2><p>${hubEscape(m.sessions.find(x => x.id === sid).title)} is now <strong>${REP_LEVELS[st.level]}</strong>.</p><div class="rep-btns">${due.length ? `<button class="btn btn-primary" onclick="startRep('${due[0].m.id}','${due[0].s.id}')">Next rep (${due.length} left today) →</button>` : ''}<button class="btn" onclick="switchView('start')">Back to Home</button>${sme && sme.email && st.level >= 3 ? `<a class="btn" href="${teamsLink(sme.email, 'Hi ' + sme.name.split(' ')[0] + ', I\'m ready for you to watch me do: ' + m.sessions.find(x => x.id === sid).title)}" target="_blank" rel="noreferrer">Ask ${hubEscape(sme.name.split(' ')[0])} to watch me ↗</a>` : ''}</div></div>`;
}

/* ---------- 2-minute drill ---------- */
function drillPool() {
  const q = [];
  KEY_CARD.filter(k => k.same).forEach(k => q.push({ q: `On the green screen, ${k.key} meant "${k.green}". What does ${k.key} do in M3?`, a: k.m3, opts: KEY_CARD.filter(x => x.same).map(x => x.m3) }));
  KEY_NEW.forEach(k => q.push({ q: `Which key does this in M3: ${k.m3.charAt(0).toLowerCase() + k.m3.slice(1)}?`, a: k.key, opts: KEY_NEW.map(x => x.key) }));
  q.push({ q: 'You want to change the order line you picked. Which keys?', a: 'Ctrl+2', opts: ['Ctrl+2', 'Ctrl+5', 'F12', 'Alt+R'] });
  q.push({ q: 'You just want to look at the line, not change it. Which keys?', a: 'Ctrl+5', opts: ['Ctrl+2', 'Ctrl+5', 'F3', 'F10'] });
  const seen = new Set(visibleModules().map(m => m.id));
  Object.keys(OPT_MAP).filter(k => seen.has(k)).forEach(k => OPT_MAP[k].filter(o => !o.confirm).forEach(o => q.push({ q: `On the green screen you used ${o.opt} (${o.what}). In M3 you press Ctrl+S and type...`, a: o.m3, opts: [...new Set(OPT_MAP[k].map(x => x.m3))] })));
  repSessions().forEach(x => { const c = (x.s.title.match(/\b[A-Z]{3}\d{3}\b/) || [])[0]; if (c) q.push({ q: `"${x.s.title.replace(/\s*[—-]\s*[A-Z]{3}\d{3}.*$/, '').replace(/[A-Z]{3}\d{3}/, '').trim()}": which program?`, a: c, opts: [] }); });
  const codes = [...new Set(q.filter(x => /^[A-Z]{3}\d{3}$/.test(x.a)).map(x => x.a))];
  q.forEach(x => { if (!x.opts.length) x.opts = codes; });
  return q.filter(x => x.opts.length >= 2);
}
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
let DRILL = null;
function practiceDrill() {
  const pool = shuffle(drillPool()).slice(0, 5);
  DRILL = pool.map(x => ({ ...x, choices: shuffle([x.a, ...shuffle(x.opts.filter(o => o !== x.a)).slice(0, 3)]) , pick: null }));
  drillRender();
}
function drillRender() {
  const el = document.getElementById('view-drill'); const done = DRILL.every(x => x.pick != null), right = DRILL.filter(x => x.pick === x.a).length;
  el.innerHTML = hubHeading('2-minute drill', 'Quick questions. No M3 needed. Do one at the start of your shift.') + DRILL.map((x, i) => `<div class="card drill-q"><p><strong>${i + 1}.</strong> ${hubEscape(x.q)}</p><div class="drill-opts">${x.choices.map(c => `<button class="drill-opt ${x.pick != null ? (c === x.a ? 'right' : c === x.pick ? 'wrong' : '') : ''}" ${x.pick != null ? 'disabled' : ''} onclick="drillPick(${i},${JSON.stringify(c).replace(/"/g, '&quot;')})">${hubEscape(c)}</button>`).join('')}</div></div>`).join('') +
    (done ? `<div class="card rep-done"><h2>${right} of ${DRILL.length} right</h2><div class="rep-btns"><button class="btn btn-primary" onclick="practiceDrill()">Another drill</button><button class="btn" onclick="switchView('start')">Back to Home</button></div></div>` : '');
  el.querySelectorAll('.card').forEach(kbdify);
}
function drillPick(i, c) { DRILL[i].pick = c; if (DRILL.every(x => x.pick != null)) { repMark(); prSave(); } drillRender(); }

/* ---------- keys page ---------- */
function practiceKeys() {
  const seen = new Set(visibleModules().map(m => m.id)); const opt = Object.keys(OPT_MAP).find(k => seen.has(k) && currentUserData.role !== 'admin') || (currentUserData.role === 'admin' ? 'orderManagement' : null);
  document.getElementById('view-keys').innerHTML = hubHeading('Keys you already know', 'Most of the keys you use on the green screen do the same thing in M3.') +
  `<div class="card"><table class="keys-table"><thead><tr><th>Key</th><th>Green screen</th><th>M3</th><th></th></tr></thead><tbody>${KEY_CARD.map(k => `<tr><td><kbd>${hubEscape(k.key)}</kbd></td><td>${hubEscape(k.green)}</td><td>${hubEscape(k.m3)}</td><td>${k.same ? '<span class="pill pill-teal">Same</span>' : '<span class="pill pill-gold">Add Ctrl</span>'}</td></tr>`).join('')}</tbody></table></div>
  <div class="card"><h3 style="margin-bottom:10px">New keys worth learning</h3><table class="keys-table"><tbody>${KEY_NEW.map(k => `<tr><td><kbd>${hubEscape(k.key)}</kbd></td><td>${hubEscape(k.m3)}</td></tr>`).join('')}</tbody></table></div>
  ${opt ? `<div class="card"><h3 style="margin-bottom:6px">Your old option → your new program</h3><p class="home-why">Same habit: type a code and go. In M3, press <kbd>Ctrl+S</kbd>, type the code, press <kbd>Enter</kbd>.${OPT_MAP[opt].some(o => o.confirm) ? ' <strong>Draft:</strong> your SME is still checking these in TST.' : ''}</p><table class="keys-table"><thead><tr><th>Green screen</th><th>What it does</th><th>M3</th><th>Note</th></tr></thead><tbody>${OPT_MAP[opt].map(o => `<tr><td>${hubEscape(o.opt)}</td><td>${hubEscape(o.what)}</td><td><strong>${hubEscape(o.m3)}</strong></td><td>${hubEscape(o.note)}${o.confirm ? ' <span class="pill pill-gray">checking</span>' : ''}</td></tr>`).join('')}</tbody></table></div>` : ''}
  <div class="mod-links"><a class="mod-link" href="resources/keys-cheat-sheet.html" target="_blank" rel="noreferrer">Printable desk card ↗</a><button class="mod-link" onclick="switchView('drill')">Practice with a 2-minute drill</button></div>`;
}

/* ---------- key badges in lesson text ---------- */
const KBD_RE = /(Ctrl\s?\+\s?(?:Shift\s?\+\s?)?(?:[A-Z0-9~](?![A-Za-z0-9])|Page\s?(?:Up|Down))|Alt\s?\+\s?[A-Z](?![A-Za-z])|\bF(?:1[0-3]|[1-9])(?![0-9A-Za-z])|\bPage (?:Up|Down)\b)/g;
function kbdify(root) {
  if (!root) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => (n.parentElement && n.parentElement.closest('kbd,code,script,style,textarea,input,select,option')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n => { KBD_RE.lastIndex = 0; if (!KBD_RE.test(n.nodeValue)) return; const f = document.createElement('span'); f.innerHTML = hubEscape(n.nodeValue).replace(KBD_RE, '<kbd>$1</kbd>'); n.replaceWith(...f.childNodes); });
}

/* ---------- SME: team board ---------- */
function smeTeams() {
  const admin = currentUserData.role === 'admin', teams = [];
  const smeKeys = Object.entries(USERS).filter(([k, u]) => (DEPT_USERS[k] || []).length && u.superuser);
  const leadMods = name => Object.values(MODULES).filter(m => prLeadName(m) === name);
  if (admin) smeKeys.forEach(([k, u]) => teams.push({ key: k, name: u.name, staff: DEPT_USERS[k], mods: leadMods(u.name) }));
  else {
    if ((DEPT_USERS[currentUser] || []).length) teams.push({ key: currentUser, name: currentUserData.name, staff: DEPT_USERS[currentUser], mods: leadMods(currentUserData.name) });
    Object.values(MODULES).filter(m => myRoleIn(m) === 'backup').forEach(m => { const lead = prLeadName(m); const e = smeKeys.find(([, u]) => u.name === lead); if (e && !teams.find(t => t.key === e[0])) teams.push({ key: e[0], name: lead, staff: DEPT_USERS[e[0]], mods: leadMods(lead), backup: true }); });
  }
  teams.forEach(t => { if (!t.mods.length) { const u = USERS[t.key]; t.mods = (u.modules || []).filter(id => id !== 'foundation').map(id => MODULES[id]).filter(Boolean); } });
  return teams;
}
const CELL = ['', 'Learned', 'Practiced', 'Signed off'];
function cellKey(t, p, sid) { return t.key + '|' + p.email + '|' + sid; }
function cellState(t, p, sid) { const c = pr().team[cellKey(t, p, sid)]; if (!c) return { s: 0 }; const stale = c.s === 3 && prDaysBetween(c.d, prToday()) > 30; return { s: c.s, d: c.d, stale }; }
function cellCycle(ti, pi, sid) {
  const t = smeTeams()[ti], p = t.staff[pi], k = cellKey(t, p, sid), P = pr(), cur = P.team[k];
  const s = cur ? (cur.s === 3 && prDaysBetween(cur.d, prToday()) > 30 ? 3 : (cur.s + 1) % 4) : 1;
  if (s === 0) delete P.team[k]; else P.team[k] = { s, d: prToday() };
  prSave(); renderTeam();
}
function huddlePick(t, tasks) {
  let best = null, gap = -1;
  tasks.forEach(x => { const g = t.staff.filter(p => { const c = cellState(t, p, x.s.id); return c.s < 3 || c.stale; }).length; if (g > gap) { gap = g; best = x; } });
  return best ? { x: best, gap } : null;
}
function practiceTeamBoard() {
  const teams = smeTeams(), admin = currentUserData.role === 'admin';
  if (!teams.length) { document.getElementById('view-team').innerHTML = hubHeading(admin ? 'All Teams' : 'My Team', '') + '<div class="card"><p>No team is set up for you yet. Ask Kristen.</p></div>'; return; }
  const html = teams.map((t, ti) => {
    const tasks = []; t.mods.forEach(m => m.sessions.forEach((s, i) => tasks.push({ m, s, i })));
    const signed = t.staff.reduce((n, p) => n + tasks.filter(x => { const c = cellState(t, p, x.s.id); return c.s === 3 && !c.stale; }).length, 0);
    const stale = t.staff.reduce((n, p) => n + tasks.filter(x => cellState(t, p, x.s.id).stale).length, 0);
    const h = huddlePick(t, tasks);
    return `<section class="card team-card"><div class="team-head"><div><h3>${hubEscape(t.name)}'s team${t.backup ? ' <span class="pill pill-gray">You\'re the backup</span>' : ''}</h3><p>${t.staff.length} people · ${tasks.length} tasks · ${signed} sign-offs${stale ? ` · <strong>${stale} need a refresher</strong>` : ''}</p></div></div>
    ${h ? `<div class="huddle"><div><span class="home-next-label" style="color:var(--muted)">This week's 15-minute huddle</span><strong>${hubEscape(h.x.s.title)}</strong><span>${h.gap} of ${t.staff.length} people aren't signed off on this yet. Run it live and have everyone do one rep together.</span></div><button class="mod-link" onclick="openSession('${h.x.m.id}','${h.x.s.id}')">Open the lesson</button></div>` : ''}
    <div class="board-wrap"><table class="board"><thead><tr><th class="board-name">Person</th>${tasks.map(x => `<th title="${hubEscape(x.m.name + ': ' + x.s.title)}"><span>${hubEscape(x.s.title.replace(/\s*[—-].*$/, '').slice(0, 28))}</span></th>`).join('')}</tr></thead>
    <tbody>${t.staff.map((p, pi) => `<tr><th class="board-name">${hubEscape(p.first + ' ' + p.last)}<small>${hubEscape(p.title || '')}</small></th>${tasks.map(x => { const c = cellState(t, p, x.s.id); const cls = c.stale ? 'c-stale' : 'c' + c.s; const lbl = c.stale ? 'Refresher due' : CELL[c.s] || 'Not yet'; return `<td><button class="cell ${cls}" title="${hubEscape(p.first + ': ' + x.s.title + ' — ' + lbl + (c.d ? ' (' + c.d + ')' : '') + '. Click to change.')}" aria-label="${hubEscape(p.first + ', ' + x.s.title + ': ' + lbl)}" onclick="cellCycle(${ti},${pi},'${x.s.id}')">${c.stale ? '↻' : ['', 'L', 'P', '✓'][c.s]}</button></td>`; }).join('')}</tr>`).join('')}</tbody></table></div></section>`;
  }).join('');
  document.getElementById('view-team').innerHTML = hubHeading(admin ? 'All Teams' : 'My Team', 'Click a box each time you see progress. Only mark "Signed off" after you watch them do it on their own, with no help.') +
    `<div class="board-legend"><span><b class="cell c1">L</b> Learned (came to the class or did the lesson)</span><span><b class="cell c2">P</b> Practiced (did it in TST)</span><span><b class="cell c3">✓</b> Signed off (you watched them do it alone)</span><span><b class="cell c-stale">↻</b> Refresher due (signed off over 30 days ago)</span></div>` + html +
    `<p class="home-why">This board is saved on this computer for now. Once shared saving is set up, your team's own reps will show here too.</p>`;
}

/* ---------- SME: ready-to-teach + class kits (used by hubStudio) ---------- */
function practiceStudioTop() {
  const mine = orderedModules().filter(m => myRoleIn(m) === 'lead' || myRoleIn(m) === 'backup');
  const mods = mine.length ? mine : orderedModules().filter(m => m.id !== 'foundation');
  const tasks = []; mods.forEach(m => m.sessions.forEach(s => tasks.push({ m, s, st: repState(s.id) })));
  const solid = tasks.filter(x => x.st.level >= 3).length, ready = tasks.length && solid === tasks.length;
  const weak = tasks.slice().sort((a, b) => a.st.level - b.st.level).slice(0, 3);
  const gate = `<section class="card gate ${ready ? 'gate-ok' : ''}"><div><div class="home-next-label" style="color:var(--muted)">Master of your department</div><h3>${ready ? 'Ready to teach' : `${solid} of ${tasks.length} tasks are solid`}</h3><p>${ready ? 'Every task in your department is solid. Book your teach-back with Kristen, then start teaching your team.' : 'You teach your whole department, so every task needs to be solid first. Keep doing your daily reps.'}</p>${!ready && weak.length ? `<p><strong>Start with:</strong> ${weak.map(x => hubEscape(x.s.title)).join(' · ')}</p>` : ''}</div><div class="gate-meter"><div style="width:${tasks.length ? Math.round(solid / tasks.length * 100) : 0}%"></div></div></section>`;
  const ids = new Set(mods.map(m => m.id)), admin = currentUserData.role === 'admin';
  const kits = CLASS_KITS.filter(k => admin || k.dept.some(d => ids.has(d)));
  const kitHtml = kits.length ? `<section class="card hub-course"><h3>Class kits</h3><p>Kristen builds the kits. You teach from them. Each one has the slides, what to practice afterwards, and the lessons that become reps.</p><div class="kit-grid">${kits.map(k => `<div class="kit ${k.ready ? '' : 'kit-soon'}"><strong>${hubEscape(k.title)}</strong><span>Practice afterwards: ${k.practice.map(id => { const f = findSession(id); return f ? hubEscape(f.title) : id; }).join(' · ')}</span>${k.ready ? `<a class="mod-link" href="${hubEscape(k.slides)}" target="_blank" rel="noreferrer">Open slides ↗</a>` : '<em>Kristen is building this one</em>'}</div>`).join('')}</div></section>` : '';
  return gate + kitHtml;
}

/* ---------- patches to portal functions ---------- */
(function () {
  const _openSession = openSession;
  openSession = function (mid, sid) {
    _openSession(mid, sid);
    const el = document.getElementById('view-session'), body = el.querySelector('.session-content');
    if (body) {
      const st = repState(sid), r = repRec(sid);
      const box = document.createElement('div'); box.className = 'card rep-banner';
      box.innerHTML = r ? `<div>${strengthDots(st.level, st.fading)} <strong>${REP_LEVELS[st.level]}${st.fading ? ' · fading' : ''}</strong><span>Next rep ${prNice(st.due)}${st.best ? ' · best time ' + repTime(st.best) : ''}</span></div><button class="btn btn-primary btn-sm" onclick="startRep('${mid}','${sid}')">Do a rep now</button>`
        : `<div><strong>One lesson isn't enough.</strong><span>Pass the check at the bottom and this comes back tomorrow as a short rep, then again in 3 days, a week, and so on, until you can do it without thinking.</span></div>`;
      body.prepend(box);
    }
    kbdify(el);
  };
  const _submitQuiz = submitQuiz;
  submitQuiz = function (sid) { _submitQuiz(sid); if ((ST[`quiz-score-${sid}`] || 0) >= 70) { const P = pr(); if (!P.reps[sid]) { P.reps[sid] = { n: 1, last: prToday(), due: prAddDays(prToday(), 1), hist: [] }; repMark(); prSave(); } } };
  renderTeam = practiceTeamBoard;
})();
