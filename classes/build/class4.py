"""Class 4 — Answering Customer Questions: Order, Stock, and Invoice Lookups (session ord-9).

Tested in M3 TST (CMP100) on 6 Nov 2026 with customer/payer 000350
A. E. Howard Tile & Carpet: OIS300 (orders at 33, 44, 77), OIS301 sorted
2-Cust/Item/Confi shows Customer's PO No (OCT30 = CO 1000000453, status 33),
OIS350 sorted 3-CO no (CO 1000000451 = invoice 20260300013), invoice lines
(OIS351) for invoice 20260300002, MMS002 STAPSA820 on hand 96 in CAR.
MMS080 (when more is coming) and MWS068 (lots and rolls) are taught in the
stock and dye-lot classes.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, call_html, quiz_html, ROOT

I = os.path.join(ROOT, 'classes/img/c4')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)

imgs = {
    'ois300':      load_img(f'{I}/ois300.jpg', [b(26, 391, 92, 418), b(196, 423, 540, 640)]),
    'ois301':      load_img(f'{I}/ois301.jpg', [b(857, 163, 1025, 192), b(18, 566, 1204, 602)]),
    'ois350co':    load_img(f'{I}/ois350co.jpg', [b(952, 163, 1248, 192), b(18, 323, 1215, 359)]),
    'invlines':    load_img(f'{I}/invlines.jpg', [b(18, 356, 606, 464)]),
    'mms002':      load_img(f'{I}/mms002.jpg', [b(26, 391, 150, 418), b(18, 423, 676, 459)]),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Carla · A. E. Howard Tile & Carpet'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Hi Rachel, Carla at A. E. Howard Tile in Enid. Account 350. I\'ve got a few questions for you.'],
  ['csr', 'Sure, go ahead.'],
  ['cust', 'First one: has my PO OCT30 shipped yet?'],
  ['csr', 'Let me look.'],
 ],
 'c2': [
  ['csr', 'It hasn\'t shipped yet. The stock is set aside for you; it just hasn\'t been picked.'],
  ['cust', 'Okay, good. Second thing: I need the invoice on order 1000000451.'],
  ['csr', 'One second.'],
 ],
 'c3': [
  ['csr', 'That\'s invoice 20260300013, for $83.38.'],
  ['cust', 'Great. Last thing: do you have any of the PSA 820 in Carrollton?'],
  ['csr', 'Checking.'],
 ],
 'c4': [
  ['csr', 'We\'ve got 96 on hand in Carrollton.'],
  ['cust', 'Perfect. That\'s all I needed. Thanks, Rachel.'],
  ['csr', 'Anytime, Carla.'],
 ],
}

card_items = [['acct', 'Account', '000350 A. E. Howard'], ['q1', 'Question 1', 'PO OCT30 shipped?'],
              ['q2', 'Question 2', 'Invoice for 1000000451'], ['q3', 'Question 3', 'PSA 820 in stock?']]

def mini_call(key, label):
    return {'notes': "Click Answer and step through this part of the call.", 'cls': 'callslide',
            'html': f'<div class="kicker red">On the call</div><h2>{label}</h2>' + call_html(key, 'A. E. Howard Tile', ring=False, sub='On the line', wait='On the line', on='On the line', end='Look it up.', empty='Pick back up to keep going.')}

slides = [

{'notes': "Welcome. Today isn't about entering anything. It's about the calls where the customer just wants to know something: where's my order, send me the invoice, do you have it. Every one of these is a lookup. Nobody can break anything today.",
 'html': '''
<div class="kicker">Adleta · Customer Service & Order Entry</div>
<h1>Answering<br>customer questions.</h1>
<p class="lead">"Did it ship?" "Send me the invoice." "Do you have it?" Half your calls are questions, not orders. Today we look things up.</p>
<div class="title-meta"><span class="tmeta">45 MIN</span><span class="tmeta">FOLLOW ALONG</span><span class="tmeta">LOOK, DON'T CHANGE</span><span class="tmeta">CLASS 4</span></div>'''},

{'notes': "The map for today. Each question has one place to look. Don't memorize it; it's on the desk card. Point out the last two rows: those come in later classes.",
 'html': '''
<div class="kicker">The question → where to look</div>
<h2>One screen per question</h2>
<table class="map">
<thead><tr><th>The customer asks…</th><th>Where you look</th></tr></thead>
<tbody>
<tr><td>"Where's my order?"</td><td><b class="mono">OIS300</b>, the order list. Read the status.</td></tr>
<tr><td>"Did my PO ship?" "What did I order?"</td><td><b class="mono">OIS301</b>, every line on every order, with the PO.</td></tr>
<tr><td>"I need my invoice."</td><td><b class="mono">OIS350</b>, invoices.</td></tr>
<tr><td>"Do you have it?"</td><td><b class="mono">MMS002</b>, stock in a warehouse.</td></tr>
<tr><td>"When's more coming?" "Which dye lot?"</td><td><b class="mono">MMS080</b>, <b class="mono">MWS068</b>. Their own classes later.</td></tr>
</tbody></table>'''},

{'notes': "Carla calls with three questions. We'll answer them one at a time. Click Answer and step through.",
 'cls': 'callslide',
 'html': '''
<div class="kicker red">Incoming call</div>
<h2>Carla has three questions</h2>
''' + call_html('c1', 'A. E. Howard Tile', end='On hold. Find PO OCT30.')},

{'notes': "The status numbers. They'll see these colors in OIS300 all day. Walk each one. The big ones: 33 means the stock is set aside but not picked; 44 means the warehouse has the pick list; 77 means it shipped and was invoiced. If it's not moving and there's no credit hold, ask your lead.",
 'html': '''
<div class="kicker blue">Read the status</div>
<h2>What the numbers mean</h2>
<table class="map">
<thead><tr><th>Status</th><th>What to tell the customer</th></tr></thead>
<tbody>
<tr><td><b class="mono">20</b> Line not entered</td><td>The order was started but has no lines yet.</td></tr>
<tr><td><b class="mono">22</b> Registered</td><td>It's in. Stock isn't set aside yet.</td></tr>
<tr><td><b class="mono">33</b> Allocated</td><td>The stock is set aside for you. Not picked yet.</td></tr>
<tr><td><b class="mono">44</b> Pick released</td><td>The warehouse has the pick list.</td></tr>
<tr><td><b class="mono">77</b> Invoiced</td><td>It shipped and it's been billed.</td></tr>
<tr><td><b class="mono">99</b> Closed</td><td>Done.</td></tr>
</tbody></table>'''},

{'notes': "Question 1 has a PO, not an order number. OIS300 shows orders, but the PO is easier to find in OIS301, which shows every line on every order. Ctrl+S, OIS301. Change Sorting order to 2-Cust/Item/Confi; that's the one with the Customer's PO No column. Type 000350 above Customer, Enter. Find OCT30 in the PO column: order 1000000453, status 33. That's 'set aside, not picked yet.'",
 'html': '''
<div class="kicker amber">Follow along · Question 1</div>
<h2>"Has my PO shipped?"</h2>
<div class="shotrow">
${IMG('ois301')}
<ol class="steps side">
<li><b>Ctrl+S</b>, <b class="mono">OIS301</b>.</li>
<li><b>Sorting order</b>: <b class="mono">2-Cust/Item/Confi</b>.</li>
<li>Above <b>Customer</b>, type <b class="mono">000350</b>, Enter.</li>
<li>Find <b class="mono">OCT30</b> under Customer's PO. Status <b class="mono">33</b>.</li>
</ol>
</div>
<p class="small"><b class="mono">33</b> = set aside for her, not picked yet. Not shipped.</p>
${CARD(['q1'])}'''},

{'notes': "Same customer, whole orders instead of lines. OIS300, type 000350 above Customer. Every order with its color. This is the screen for 'where are my orders' when the customer doesn't have a PO handy.",
 'html': '''
<div class="kicker amber">Follow along · Question 1</div>
<h2>Or see all her orders at once</h2>
<div class="shotrow">
${IMG('ois300')}
<div class="side">
<p><b>Ctrl+S</b>, <b class="mono">OIS300</b>. Above <b>Customer</b>, type <b class="mono">000350</b>, Enter.</p>
<p>Every order, newest first, with its status in color.</p>
<p class="tip">No PO, no order number? Start here.</p>
</div>
</div>
${CARD(['q1'])}'''},

mini_call('c2', 'Question 2: the invoice'),

{'notes': "OIS350 lists invoices. Two ways in. If the customer gives an order number, change Sorting order to 3-CO no and type it above CO no. Order 1000000451 is invoice 20260300013. If they just say 'my invoices,' leave it on 4-Payer and type the account above Payer; the payer is usually the same as the customer number. How to send a copy of the invoice from M3 isn't settled yet; ask your lead.",
 'html': '''
<div class="kicker amber">Follow along · Question 2</div>
<h2>"I need my invoice."</h2>
<div class="shotrow">
${IMG('ois350co')}
<ol class="steps side">
<li><b>Ctrl+S</b>, <b class="mono">OIS350</b>.</li>
<li>Have an order number? <b>Sorting order</b> <b class="mono">3-CO no</b>.</li>
<li>Type <b class="mono">1000000451</b> above <b>CO no</b>, Enter.</li>
<li>Invoice no <b class="mono">20260300013</b>.</li>
</ol>
</div>
<p class="small">No order number? Leave it on <b class="mono">4-Payer</b> and type the account above <b>Payer</b>. Sending a copy: ask your lead for now.</p>
${CARD(['q2'])}'''},

{'notes': "If the customer asks what an invoice was for, click the invoice row and Invoice lines on the right. It shows the order number and every charge, including the delivery fee.",
 'html': '''
<div class="kicker blue">Good to know</div>
<h2>"What was this invoice for?"</h2>
<div class="shotrow">
${IMG('invlines')}
<div class="side">
<p>In OIS350, click the invoice row, then <b>Invoice lines</b> on the right.</p>
<p>You'll see the <b>order number</b> and each amount, including the <b class="mono">DELFEE</b> delivery fee.</p>
</div>
</div>'''},

mini_call('c3', 'Question 3: in stock?'),

{'notes': "MMS002 is an item in a warehouse. Warehouse already says CAR. Type STAPSA820 above Item number, Enter. On-hand approve is how many are on the shelf in Carrollton: 96. Some of those may already be set aside for other orders. Inside an order, the Item search from Class 2 shows what's free to sell.",
 'html': '''
<div class="kicker amber">Follow along · Question 3</div>
<h2>"Do you have it?"</h2>
<div class="shotrow">
${IMG('mms002')}
<ol class="steps side">
<li><b>Ctrl+S</b>, <b class="mono">MMS002</b>. Warehouse <b class="mono">CAR</b>.</li>
<li>Above <b>Item number</b>, type <b class="mono">STAPSA820</b>, Enter.</li>
<li><b>On-hand approve</b>: <b class="mono">96</b> on the shelf.</li>
</ol>
</div>
<p class="small">Some may already be set aside for other orders. Taking an order? The Item search inside the order shows what's free.</p>
${CARD(['q3'])}'''},

mini_call('c4', 'Wrap it up'),

{'notes': "On their own. Same customer, three new questions. Walk the room.",
 'cls': 'try',
 'html': '''
<div class="kicker">Your turn · on your own</div>
<h2>Carla calls back</h2>
<p class="lead" style="margin-bottom:14px">"Me again. Three more quick ones."</p>
<ul class="check">
<li><span class="box">☐</span>"Where's my PO <b class="mono">BBB</b>?" (order number and status)</li>
<li><span class="box">☐</span>"What was invoice <b class="mono">20260300002</b> for?" (order number, and was there a delivery fee?)</li>
<li><span class="box">☐</span>"Do you have the <b class="mono">STAPUM950</b> Power Mastic in Carrollton?"</li>
</ul>
<p class="done">Answers: 1000000454 at 33 · order 1000000432, yes a $200 delivery fee · 3 on hand.</p>'''},

{'notes': "Recap.",
 'html': '''
<div class="kicker">What you just did</div>
<h2>Three questions, three screens</h2>
<div class="journey">
<div class="jstep"><div class="jc">OIS300 / OIS301</div><div class="jt">Where is it?</div><div class="jd">Orders, or lines with the PO. Read the status.</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">OIS350</div><div class="jt">Invoice</div><div class="jd">By order number (3-CO no) or by payer.</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">MMS002</div><div class="jt">In stock?</div><div class="jd">On-hand approve, by warehouse.</div></div>
</div>
<p class="small">Nothing changed today. Looking never breaks anything.</p>'''},

{'notes': "Keep it light.",
 'html': '''
<div class="kicker green">Quick check · no grades</div>
<h2 style="font-size:clamp(28px,3.4vw,44px)">Three easy ones</h2>
''' + quiz_html([
    ('Which program shows order lines across many orders, with the customer\'s PO?',
     ['OIS300', 'OIS301', 'OIS350', 'CRS610'], 1, 'OIS301, sorted 2-Cust/Item/Confi, shows every line with the Customer\'s PO No.'),
    ('An order shows status 33. What do you tell the customer?',
     ['It shipped', 'It\'s been invoiced', 'The stock is set aside, not picked yet', 'It was cancelled'], 2, '33 = allocated. 44 = pick list out. 77 = invoiced.'),
    ('The customer gives you an order number and wants the invoice. In OIS350 you:',
     ['Leave it on Payer', 'Change Sorting order to 3-CO no and type the order number', 'Open OIS100', 'Look in MMS002'], 1, 'Sorting order 3-CO no, then type it above CO no.'),
])},

{'notes': "Collect the what-ifs. Likely: when is more coming (stock class), which dye lot (lots class), can I email the invoice (ask your lead for now).",
 'html': '''
<div class="kicker">Your turn</div>
<h2>Your "what ifs"</h2>
<div class="cols">
<div><p class="lead">"When is more coming in?" "Is it all the same dye lot?" "Can you email me the invoice?" Write it down. The first two have their own classes.</p></div>
<div class="card"><h3>Practice this week</h3><p>Pick any customer you talk to a lot and look them up in OIS300, OIS301 and OIS350. A few minutes, a few days in a row.</p></div>
</div>'''},

{'notes': "Thank them.",
 'html': '''
<div class="kicker">Class 4 · done</div>
<h1>You can answer<br>the everyday questions.</h1>
<p class="lead">Where's my order, did my PO ship, what's my invoice, do you have it. Four lookups you'll use every day.</p>
<div class="title-meta"><span class="tmeta">OIS300 ✓</span><span class="tmeta">OIS301 ✓</span><span class="tmeta">OIS350 ✓</span><span class="tmeta">MMS002 ✓</span></div>'''},
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-4.html'), number=4, title='Answering Customer Questions',
                chrome='Answering questions', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Carla · A. E. Howard Tile & Carpet', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
