/* Scenario Drafts view: draft practice exercises for every untested scenario.
   Who sees it: admins (all), and each department's SME, lead or backup (only their own areas).
   Review marks save in this browser only, like the rest of practice progress. */

function draftsVisible() {
  if (!currentUserData || typeof SCENARIO_DRAFTS === 'undefined') return [];
  if (currentUserData.role === 'admin') return SCENARIO_DRAFTS;
  if (!currentUserData.superuser) return [];
  return SCENARIO_DRAFTS.filter(d => MODULES[d.module] && myRoleIn(MODULES[d.module]));
}

const DRAFT_KEY = 'adletaScenarioDraftReview';
function draftReviews() { try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}'); } catch (e) { return {}; } }
function draftSaveReview(id, patch) {
  const all = draftReviews();
  all[id] = Object.assign({}, all[id], patch, { by: currentUserData.name, on: new Date().toISOString().slice(0, 10) });
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(all)); } catch (e) {}
}

let draftFilter = { dept: 'All', status: 'All', q: '' };
function draftSetFilter(k, v) { draftFilter[k] = v; renderDrafts(); }
function draftMark(id, status) { draftSaveReview(id, { status }); renderDrafts(id); }
function draftNote(id, el) { draftSaveReview(id, { note: el.value }); }

function renderDrafts(openId) {
  const el = document.getElementById('view-drafts');
  if (!el) return;
  const mine = draftsVisible(), rv = draftReviews(), esc = hubEscape;
  const depts = ['All', ...new Set(mine.map(d => d.dept))];
  const q = draftFilter.q.toLowerCase();
  const list = mine.filter(d =>
    (draftFilter.dept === 'All' || d.dept === draftFilter.dept) &&
    (draftFilter.status === 'All' || (rv[d.id] && rv[d.id].status || 'Draft') === draftFilter.status) &&
    (!q || [d.id, d.title, d.program, d.topic, d.ask].join(' ').toLowerCase().includes(q)));
  const count = s => mine.filter(d => (rv[d.id] && rv[d.id].status || 'Draft') === s).length;
  const pill = (t, c) => `<span class="pill ${c}">${esc(t)}</span>`;
  const sec = (h, body) => body ? `<div class="drf-sec"><div class="drf-h">${h}</div>${body}</div>` : '';
  const card = d => {
    const r = rv[d.id] || {}, st = r.status || 'Draft';
    const stPill = st === 'Checked in TST' ? pill(st, 'pill-teal') : st === 'Needs changes' ? pill(st, 'pill-amber') : pill('Draft', 'pill-gray');
    return `<details class="card drf-card"${openId === d.id ? ' open' : ''}>
      <summary><span class="drf-id">${esc(d.id)}</span><span class="drf-title">${esc(d.title)}</span>
        <span class="drf-pills">${d.program ? pill(d.program, 'pill-gray') : ''}${d.talk ? pill('Talk-through', 'pill-gray') : ''}${d.gap ? pill('Gap ' + d.gap, 'pill-amber') : ''}${stPill}</span></summary>
      <div class="drf-body">
        ${sec('The situation', `<p>${esc(d.ask)}</p>`)}
        ${sec(d.talk ? 'What to do' : 'Steps in M3 <em>(draft, check in TST)</em>', `<ol>${d.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>`)}
        ${!d.talk && /OIS100/.test(d.steps.join(' ')) ? sec('Training order number', `<p>In <b>Customer's ord</b>, type <code>${esc(orderTag(d.id.replace('-', '')))}</code> (your initials and the scenario ID) so the order is easy to find in OIS300.</p>`) : ''}
        ${sec('A good result', `<p>${esc(d.good)}</p>`)}
        ${sec('Watch out', `<p>${esc(d.careful)}</p>`)}
        <details class="drf-src"><summary>From the scenario list</summary>
          ${sec('Area / topic', `<p>${esc(d.dept)}${d.topic ? ' · ' + esc(d.topic) : ''}</p>`)}
          ${sec('What to look for', d.lookFor ? `<p>${esc(d.lookFor)}</p>` : '')}
          ${sec('How we do it today (Dancik)', d.today ? `<p style="white-space:pre-line">${esc(d.today)}</p>` : '')}
          ${sec('What we found in TST', d.found ? `<p>${esc(d.found)}</p>` : '')}
        </details>
        <div class="drf-review"><div class="drf-h">SME review</div>
          <div class="rep-btns"><button class="btn${st === 'Checked in TST' ? ' btn-primary' : ''}" onclick="draftMark('${d.id}','Checked in TST')">Checked in TST</button><button class="btn${st === 'Needs changes' ? ' btn-primary' : ''}" onclick="draftMark('${d.id}','Needs changes')">Needs changes</button>${st !== 'Draft' ? `<button class="btn" onclick="draftMark('${d.id}','Draft')">Back to draft</button>` : ''}</div>
          <textarea class="drf-note" placeholder="What should change? Real screens, fields, steps..." onchange="draftNote('${d.id}',this)">${esc(r.note || '')}</textarea>
          ${r.by ? `<p class="hub-note">Last marked by ${esc(r.by)} on ${esc(r.on)} (saved on this computer).</p>` : ''}
        </div>
      </div></details>`;
  };
  el.innerHTML = hubHeading('Scenario Drafts', 'One practice exercise for each untested scenario. These are drafts: nothing has been checked in M3 TST yet. Check each one in TST, then mark it.') +
    `<div class="card drf-bar">
      <div class="drf-counts"><strong>${mine.length}</strong> drafts · <strong>${count('Checked in TST')}</strong> checked · <strong>${count('Needs changes')}</strong> need changes</div>
      <div class="drf-filters">${depts.map(x => `<button class="hub-admintab${draftFilter.dept === x ? ' on' : ''}" onclick="draftSetFilter('dept','${x}')">${esc(x)}</button>`).join('')}</div>
      <div class="drf-filters"><select onchange="draftSetFilter('status',this.value)">${['All', 'Draft', 'Needs changes', 'Checked in TST'].map(x => `<option${draftFilter.status === x ? ' selected' : ''}>${x}</option>`).join('')}</select>
      <input type="search" placeholder="Search ID, title, program" value="${esc(draftFilter.q)}" oninput="draftFilter.q=this.value;clearTimeout(window._drfT);window._drfT=setTimeout(()=>{renderDrafts();const i=document.querySelector('.drf-bar input');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);}},250)"></div>
      <p class="hub-note">Only admins and each area's SME can see this page. Review marks save on this computer only.</p>
    </div>` +
    (list.length ? list.map(card).join('') : '<div class="card"><p>No drafts match.</p></div>');
}

(function draftsStyle() {
  const s = document.createElement('style');
  s.textContent = `.drf-bar{display:grid;gap:10px}.drf-filters{display:flex;flex-wrap:wrap;gap:6px;align-items:center}.drf-filters select,.drf-filters input{padding:6px 10px;border:1px solid var(--border,#d0d5dd);border-radius:6px;font:inherit}.drf-filters input{flex:1;min-width:200px}
.drf-card{padding:0;margin-top:10px}.drf-card>summary{display:flex;gap:10px;align-items:center;padding:12px 16px;cursor:pointer;list-style:none;flex-wrap:wrap}.drf-card>summary::-webkit-details-marker{display:none}
.drf-id{font-weight:700;font-family:monospace;min-width:72px}.drf-title{flex:1;min-width:200px}.drf-pills{display:flex;gap:4px;flex-wrap:wrap}
.drf-body{padding:0 16px 14px;border-top:1px solid var(--border,#eee)}.drf-sec{margin-top:10px}.drf-h{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--muted,#667085);margin-bottom:3px}
.drf-sec p,.drf-sec ol{margin:0}.drf-sec ol{padding-left:20px}.drf-src{margin-top:12px}.drf-src>summary{cursor:pointer;font-size:13px;color:var(--muted,#667085)}
.drf-review{margin-top:14px;padding-top:10px;border-top:1px dashed var(--border,#ddd)}.drf-note{width:100%;min-height:54px;margin-top:8px;padding:8px;border:1px solid var(--border,#d0d5dd);border-radius:6px;font:inherit;box-sizing:border-box}
.pill-amber{background:#fff3cd;color:#7a5b00}`;
  document.head.appendChild(s);
})();
