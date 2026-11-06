"""Slide helpers shared by the Customer Service classes, so each class file is mostly content."""
from deck import call_html, quiz_html

NAME_BLUR = (287, 186, 480, 207)  # customer name beside the Customer box (OIS100 panels), original px


def title(n, h1, lead, mins='45 MIN', extra='FOLLOW ALONG', notes=''):
    return {'notes': notes, 'html': f'''
<div class="kicker">Adleta · Customer Service & Order Entry</div>
<h1>{h1}</h1>
<p class="lead">{lead}</p>
<div class="title-meta"><span class="tmeta">{mins}</span><span class="tmeta">{extra}</span><span class="tmeta">TEST ENVIRONMENT</span><span class="tmeta">CLASS {n}</span></div>'''}


def compare(head, left_title, left, right_title, right, notes='', kicker='Last time → today', small=''):
    s = f'<p class="small">{small}</p>' if small else ''
    return {'notes': notes, 'html': f'''
<div class="kicker">{kicker}</div>
<h2>{head}</h2>
<div class="compare">
<div class="card"><h3>{left_title}</h3><p>{left}</p></div>
<div class="card"><h3>{right_title} <span class="newbadge">NEW</span></h3><p>{right}</p></div>
</div>{s}'''}


def plan(rows, notes='', mins='45'):
    r = ''.join(f'<div class="arow"><span class="at">{t}</span><span class="am">{a} <span class="ad">{b}</span></span><span class="dur">{d}</span></div>' for t, a, b, d in rows)
    return {'notes': notes, 'html': f'<div class="kicker">Our {mins} minutes</div><h2>Here\'s the plan</h2><div class="agenda">{r}</div>'}


def call(key, who, head, kicker='Incoming call', notes='', ring=True, end='On hold.', sub='Incoming call', empty=None):
    return {'notes': notes or "Click Answer, then Next line to bring up each line. Read it out loud or have two volunteers read the parts.",
            'cls': 'callslide',
            'html': f'<div class="kicker red">{kicker}</div><h2>{head}</h2>' + call_html(
                key, who, sub=sub if ring else 'On hold', ring=ring, wait=None if ring else 'On hold',
                on=None if ring else 'Back on the line', end=end, empty=empty)}


def heard(head, cards, notes='', kicker='What did they need?', cls='h6'):
    c = ''.join(f'<div class="hd"><em>{e}</em><b>{b}</b><span>{s}</span></div>' for e, b, s in cards)
    return {'notes': notes, 'html': f'<div class="kicker red">{kicker}</div><h2>{head}</h2><div class="heard {cls}">{c}</div>' + '\n${CARD([])}'}


def step(kicker, head, img, items, notes='', small='', card=(), ordered=True, tip=''):
    if ordered:
        body = '<ol class="steps side">' + ''.join(f'<li>{i}</li>' for i in items) + '</ol>'
    else:
        body = '<div class="side">' + ''.join(f'<p>{i}</p>' for i in items) + (f'<p class="tip">{tip}</p>' if tip else '') + '</div>'
    s = f'<p class="small">{small}</p>' if small else ''
    cd = '\n${CARD(' + repr(list(card)).replace('"', "'") + ')}' if card is not None else ''
    return {'notes': notes, 'html': f'''
<div class="kicker amber">{kicker}</div>
<h2>{head}</h2>
<div class="shotrow">
${{IMG('{img}')}}
{body}
</div>{s}{cd}'''}


def pair(kicker, head, a, acap, b, bcap, notes='', small='', card=()):
    s = f'<p class="small">{small}</p>' if small else ''
    cd = '\n${CARD(' + repr(list(card)).replace('"', "'") + ')}' if card is not None else ''
    return {'notes': notes, 'html': f'''
<div class="kicker amber">{kicker}</div>
<h2>{head}</h2>
<div class="pair">
<figure>${{IMG('{a}')}}<figcaption>{acap}</figcaption></figure>
<figure>${{IMG('{b}')}}<figcaption>{bcap}</figcaption></figure>
</div>{s}{cd}'''}


def cards(kicker, head, items, notes=''):
    c = ''.join(f'<div class="card"><h3>{t}</h3><p>{p}</p></div>' for t, p in items)
    return {'notes': notes, 'html': f'<div class="kicker">{kicker}</div><h2>{head}</h2><div class="compare">{c}</div>'}


def try_it(head, lead, checks, done='Done? Do it once more without looking at this list.', notes=''):
    li = ''.join(f'<li><span class="box">☐</span>{c}</li>' for c in checks)
    return {'notes': notes or "On their own. Leave this up and walk the room. Help only if someone is truly stuck.",
            'cls': 'try',
            'html': f'<div class="kicker">Your turn · on your own</div><h2>{head}</h2><p class="lead" style="margin-bottom:14px">{lead}</p><ul class="check">{li}</ul><p class="done">{done}</p>'}


def journey(head, steps, small='', notes='Recap in one picture. Walk it left to right.'):
    j = '<div class="jarrow">→</div>'.join(f'<div class="jstep"><div class="jc">{c}</div><div class="jt">{t}</div><div class="jd">{d}</div></div>' for c, t, d in steps)
    s = f'<p class="small">{small}</p>' if small else ''
    return {'notes': notes, 'html': f'<div class="kicker">What you just did</div><h2>{head}</h2><div class="journey">{j}</div>{s}'}


def quiz(qs, notes='Keep it light. Read each one, let people call out answers, click to reveal.'):
    return {'notes': notes, 'html': '<div class="kicker green">Quick check · no grades</div><h2 style="font-size:clamp(28px,3.4vw,44px)">Three easy ones</h2>' + quiz_html(qs)}


def whatifs(lead, practice, notes=''):
    return {'notes': notes or "Collect the what-ifs. Write them down; they feed later classes.", 'html': f'''
<div class="kicker">Your turn</div>
<h2>Your "what ifs"</h2>
<div class="cols">
<div><p class="lead">{lead}</p></div>
<div class="card"><h3>Practice this week</h3><p>{practice}</p></div>
</div>'''}


def closing(n, h1, lead, chips, notes='Thank them.'):
    c = ''.join(f'<span class="tmeta">{x} ✓</span>' for x in chips)
    return {'notes': notes, 'html': f'<div class="kicker">Class {n} · done</div><h1>{h1}</h1><p class="lead">{lead}</p><div class="title-meta">{c}</div>'}
