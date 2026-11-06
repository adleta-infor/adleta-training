"""Shared builder for the Customer Service class decks (Class 2 onward).

Look and feel comes straight from cs-class-1.html (its <style> block is reused),
so every class looks like the first one. Each class supplies its own slides,
call transcript and screenshots; images are embedded so a deck is one file
that works offline on the big screen.

The phone call is transcript only: no sound. Click "Answer", then "Next line"
to bring up each line of the call.
"""
import base64, html, io, json, os, re
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CLASS1 = os.path.join(ROOT, 'cs-class-1.html')


def class1_css():
    s = open(CLASS1, encoding='utf-8').read()
    return s[s.index('<style>') + 7:s.index('</style>')]


EXTRA_CSS = r"""
/* ---------- click-through call (no sound) ---------- */
.ph-btns .cbtn.nxt{background:var(--amber);color:#1b1404}
.call .transcript{max-height:54vh}
.bub.sys{align-self:center;background:transparent;border:1px dashed var(--line);color:var(--muted);font-size:15px}
.hl-note{display:inline-block;width:14px;height:14px;border:3px solid #ff8a00;border-radius:3px;vertical-align:-2px;margin-right:8px}
.heard.h4{grid-template-columns:repeat(4,1fr)} .heard.h6{grid-template-columns:repeat(3,1fr)}
.newbadge{display:inline-block;font-family:var(--font-mono);font-size:12px;letter-spacing:.14em;background:var(--green);color:#06210f;border-radius:4px;padding:2px 8px;margin-left:10px;vertical-align:middle}
.compare{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:8px}
.compare .card h3 .mono{color:var(--blue)}
@media (max-width:900px){.compare,.heard.h4,.heard.h6{grid-template-columns:1fr 1fr}}
"""


def load_img(path, boxes=(), width=1400, quality=80, crop=None):
    """Open a screenshot, draw orange boxes around what to look at, embed it."""
    im = Image.open(path).convert('RGB')
    if boxes:
        d = ImageDraw.Draw(im)
        for b in boxes:
            x0, y0, x1, y1 = b
            for k in range(4):
                d.rounded_rectangle((x0 - k, y0 - k, x1 + k, y1 + k), radius=6, outline=(255, 138, 0))
    if crop:
        im = im.crop((crop[0], crop[1], crop[2], crop[3]))
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'JPEG', quality=quality, optimize=True)
    return 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()


ENGINE = r"""
const $=s=>document.querySelector(s);
const IMG=n=>`<img class="shot" src="${IMGS[n]}" alt="">`;
const CARD=(hl)=>`<div class="callcard"><span class="cc-h">📞 ${CARDHEAD}</span>${CARDITEMS.map(([k,l,v])=>`<span class="cc-i${hl.includes(k)?' on':''}"><em>${l}</em>${v}</span>`).join('')}</div>`;
const slides=SLIDES();

/* ---- click-through call: no sound, one line per click ---- */
function bubble(box,role,text){
  const e=box.querySelector('.tr-empty');if(e)e.remove();
  const d=document.createElement('div');d.className='bub '+role;
  d.innerHTML=role==='sys'?text:`<em>${role==='csr'?CSR:CALLER}</em>${text}`;
  box.appendChild(d);box.scrollTop=box.scrollHeight;
}
function wireCall(el){
  el.querySelectorAll('.call').forEach(call=>{
    const key=call.dataset.call, lines=CALLS[key]||[];
    const ph=call.querySelector('.phone'),st=call.querySelector('.ph-state'),tr=call.querySelector('.transcript');
    const ans=call.querySelector('.b-ans'),nxt=call.querySelector('.b-next'),all=call.querySelector('.b-all'),rep=call.querySelector('.b-rep');
    const after=call.parentElement.querySelector('.after-call');
    let i=0;
    const reset=()=>{i=0;tr.innerHTML=`<div class="tr-empty">${call.dataset.empty||'The call shows up here when you answer.'}</div>`;
      ph.classList.toggle('ringing',call.dataset.ring!=='no');st.textContent=call.dataset.wait||'Ringing…';
      ans.style.display='';nxt.style.display='none';all.style.display='none';rep.style.display='none';if(after)after.style.display='none'};
    const done=()=>{nxt.style.display='none';all.style.display='none';rep.style.display='';st.textContent=call.dataset.end||'Call on hold.';if(after)after.style.display=''};
    const step=()=>{if(i<lines.length){const [r,t]=lines[i++];bubble(tr,r,t)} if(i>=lines.length)done()};
    ans.onclick=()=>{tr.innerHTML='';ph.classList.remove('ringing');st.textContent=call.dataset.on||'On the call';ans.style.display='none';nxt.style.display='';all.style.display='';step()};
    nxt.onclick=step;
    all.onclick=()=>{while(i<lines.length)step()};
    rep.onclick=reset;
    reset();
  });
}

/* ---- click-by-click reveal (same as Class 1) ---- */
const EXPAND=['grid3','cols','agenda','heard','shotrow','pair','journey','side','steps','compare'];
function fragsOf(el){
  if(el.querySelector('.call'))return [];
  const out=[];
  const walk=node=>{
    for(const c of node.children){
      if(c.matches('.kicker,h1,h2,.callcard,script,style,thead'))continue;
      if(c.matches('table.map')){c.querySelectorAll('tbody tr').forEach(r=>out.push([r]));continue}
      if(c.id==='quiz'){c.querySelectorAll(':scope > .q').forEach(q=>out.push([q]));continue}
      if(c.matches('.jarrow'))continue;
      if(c.matches('.jstep')){const a=c.previousElementSibling;out.push(a&&a.matches('.jarrow')?[a,c]:[c]);continue}
      const plainDiv=c.tagName==='DIV'&&!c.className&&!c.id;
      if(EXPAND.some(k=>c.classList.contains(k))||plainDiv){walk(c);continue}
      out.push([c]);
    }
  };
  walk(el);return out;
}
const FR=new Map();
function setupFrags(el,revealAll){
  let f=FR.get(el);if(!f){f={list:fragsOf(el),i:0};FR.set(el,f);f.list.flat().forEach(x=>x.classList.add('frag'))}
  f.i=revealAll?f.list.length:0;
  f.list.forEach((g,k)=>g.forEach(x=>x.classList.toggle('in',k<f.i)));
}
function revealNext(el){const f=FR.get(el);if(!f||f.i>=f.list.length)return false;f.list[f.i++].forEach(x=>x.classList.add('in'));return true}

/* ---- deck engine ---- */
const stage=$('#stage'),barfill=$('#barfill'),count=$('#count'),notesBody=$('#notes-body');
let cur=0;
slides.forEach(s=>{const el=document.createElement('section');el.className='slide'+(s.cls?' '+s.cls:'');el.innerHTML=s.html;stage.appendChild(el)});
const slideEls=[...stage.querySelectorAll('.slide')];
function show(n,dir=1){
  if(n<0||n>=slideEls.length)return;
  slideEls[cur].classList.remove('active');slideEls[cur].classList.toggle('exit-left',dir>0);
  cur=n;const el=slideEls[cur];el.classList.remove('exit-left');el.classList.add('active');
  setupFrags(el,dir<0);wireCall(el);
  barfill.style.width=((cur+1)/slideEls.length*100)+'%';
  count.textContent=(cur+1)+' / '+slideEls.length;
  notesBody.textContent=slides[cur].notes||'';
}
function next(){if(revealNext(slideEls[cur]))return;if(cur<slideEls.length-1)show(cur+1,1)}
function prev(){if(cur>0)show(cur-1,-1)}
show(0);
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){e.preventDefault();next()}
  else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();prev()}
  else if(e.key==='Home')show(0);
  else if(e.key==='End')show(slideEls.length-1);
  else if(e.key==='n'||e.key==='N'){$('#notes').classList.toggle('open')}
});
stage.addEventListener('click',e=>{
  if(e.target.closest('#quiz,.call,button,a'))return;
  next();
});
$('#navPrev').addEventListener('click',e=>{e.stopPropagation();prev()});
$('#navNext').addEventListener('click',e=>{e.stopPropagation();next()});
document.querySelectorAll('.q').forEach(q=>{
  const opts=[...q.querySelectorAll('.opt')],ex=q.querySelector('.explain');
  opts.forEach(o=>o.addEventListener('click',()=>{
    if(q.dataset.done)return;q.dataset.done=1;
    opts.forEach(x=>{if(x.dataset.c!==undefined)x.classList.add('correct');else if(x===o)x.classList.add('wrong');else x.classList.add('dim')});
    ex.classList.add('show');
  }));
});
"""


def call_html(key, who, sub='Incoming call', ring=True, wait=None, on=None, end=None, empty=None, after=''):
    """Phone on the left, transcript on the right. Lines come from CALLS[key]."""
    attrs = f'data-call="{key}"'
    if not ring: attrs += ' data-ring="no"'
    for k, v in (('wait', wait), ('on', on), ('end', end), ('empty', empty)):
        if v: attrs += f' data-{k}="{html.escape(v)}"'
    ans = 'Answer' if ring else 'Pick back up'
    return f'''<div class="call" {attrs}>
<div class="phone">
<div class="ph-ring"><span></span><span></span></div>
<div class="ph-icon">📞</div>
<div class="ph-who">{who}</div>
<div class="ph-num">{sub}</div>
<div class="ph-btns"><button class="cbtn ans b-ans">{ans}</button><button class="cbtn nxt b-next">Next line ›</button><button class="cbtn rep b-all">Show the rest</button><button class="cbtn rep b-rep">Start over</button></div>
<div class="ph-state"></div>
</div>
<div><div class="transcript"></div>{after}</div>
</div>'''


def quiz_html(qs):
    out = ['<div id="quiz">']
    for n, (q, opts, ans, why) in enumerate(qs, 1):
        out.append(f'<div class="q"><h3>{n} · {q}</h3><div class="opts">')
        for i, o in enumerate(opts):
            out.append(f'<button class="opt"{" data-c" if i == ans else ""}><span class="l">{"abcd"[i]}</span><span>{o}</span></button>')
        out.append(f'</div><div class="explain">{why}</div></div>')
    out.append('</div>')
    return ''.join(out)


def build(out_path, *, number, title, chrome, slides, calls, csr, caller, card_head, card_items, imgs):
    """slides: list of dicts {html, notes, cls?}. html may use ${IMG('x')} and ${CARD([...])}."""
    css = class1_css() + EXTRA_CSS
    js_slides = 'function SLIDES(){return [\n' + ',\n'.join(
        '{notes:%s,%shtml:`%s`}' % (json.dumps(s['notes']), ('cls:%s,' % json.dumps(s['cls'])) if s.get('cls') else '', s['html'].replace('\\', '\\\\'))
        for s in slides) + '\n]}'
    head = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>M3 Class {number} — Customer Service</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23e8502e'/%3E%3Ctext x='16' y='22' font-family='monospace' font-weight='700' font-size='14' fill='white' text-anchor='middle'%3EM3%3C/text%3E%3C/svg%3E">
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>{css}</style>
</head>
<body>
<div id="deck">
  <div id="stage"></div>
  <div id="bar"><div id="barfill"></div></div>
  <div id="chrome">
    <span class="mono">ADLETA · M3 CUSTOMER SERVICE · CLASS {number} · {html.escape(chrome.upper())}</span>
    <span id="hint"><span>← → navigate</span><span><b>N</b> presenter notes</span><span><b>F11</b> fullscreen</span></span>
    <span class="navbtns"><button id="navPrev" type="button" aria-label="Previous slide">‹ Back</button><span id="count"></span><button id="navNext" type="button" aria-label="Next slide">Next ›</button></span>
  </div>
</div>
<div id="notes"><div class="nt">PRESENTER NOTES — press N to hide</div><div class="nb" id="notes-body"></div></div>
<script>
const IMGS={json.dumps(imgs)};
const CALLS={json.dumps(calls)};
const CSR={json.dumps(csr)},CALLER={json.dumps(caller)};
const CARDHEAD={json.dumps(card_head)},CARDITEMS={json.dumps(card_items)};
{js_slides}
{ENGINE}
</script>
</body>
</html>
'''
    open(out_path, 'w', encoding='utf-8').write(head)
    return out_path
