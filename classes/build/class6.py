"""Class 6 — Will Call Order: Pay at the Counter (session ord-6).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000487, customer 017403
(Carrollton, CO type C01, defaults to WC and N30). Payment terms changed to
PCD (Prep Cash Desk) on Generic Panel, PO TEST-CLASS6, STAPSA820 x2.
Charges: DELFEE 17.50. OIS300: order stays at 33-ALLOCATED (other orders hit
44 within a minute). MWS410 delivery 496: Delivery status 03-Pick stop,
Dely stop code C10-Delivery not paid, Payment terms PCD.
OIS215: cash desks 101A/101B COD CASH DESK at Carrollton. Our test user got
"You do not have authorization for cash desk 101A/101B", so taking the
payment itself was not run in TST; the class says the cash desk person takes it.
Customer names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c6')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)

imgs = {
    'generic':  load_img(f'{I}/generic.jpg', [b(166, 360, 320, 389), b(574, 247, 809, 276), b(574, 397, 700, 427)], crop=b(0, 126, 1250, 670)),
    'charges':  load_img(f'{I}/charges.jpg', [b(18, 290, 615, 327)], blur=[b(306, 199, 430, 221)], crop=b(0, 126, 1250, 450)),
    'ois300':   load_img(f'{I}/ois300.jpg', [b(197, 423, 422, 458)], crop=b(0, 126, 1250, 665)),
    'stop':     load_img(f'{I}/stop.jpg', [b(166, 381, 334, 410), b(574, 607, 732, 636)], blur=[b(750, 370, 862, 414)], crop=b(0, 126, 1250, 672)),
    'cashdesk': load_img(f'{I}/cashdesk.jpg', [b(178, 196, 370, 224), b(178, 296, 367, 324)], crop=b(0, 126, 1250, 665)),
    'noauth':   load_img(f'{I}/noauth.jpg', [b(622, 305, 945, 470)], crop=b(0, 126, 1250, 665)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Gloria · Lone Star Floors'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Hi, it\'s Gloria at Lone Star Floors, account 17403. I need two PSA 820s.'],
  ['csr', 'Picking up in Carrollton?'],
  ['cust', 'Yes. And I\'ll pay with a card when I get there. We don\'t run it on account.'],
  ['csr', 'No problem. PO?'],
  ['cust', 'No PO. Just put Gloria.'],
  ['csr', 'One second, let me set it up.'],
 ],
 'c2': [
  ['csr', 'Gloria, you\'re set. Here\'s your order number.'],
  ['sys', '🎤 Your turn: read your CO no out loud.'],
  ['csr', 'Pay at the counter when you get here. Once it\'s paid, they\'ll pull it for you.'],
  ['csr', 'There\'s also a $17.50 will call fee on it.'],
  ['cust', 'Got it. Thanks.'],
 ],
}

card_items = [['acct', 'Account', '017403'], ['pay', 'Paying', 'Card, at the counter'], ['item', 'Items', 'PSA 820 · 2'],
              ['po', 'PO', 'none (GLORIA)'], ['dm', 'Delivery', 'Will call, Carrollton']]

slides = [
title(6, 'Will call:<br>pay at the counter.',
      'The customer pays before it\'s pulled. Put the right payment terms on the order, and know why it waits.',
      notes="Last class the customer picked up and was billed later. Today the customer pays at the counter first. One field changes on the order, and the order behaves differently afterward: it waits until it's paid. That's what we're here to understand."),
compare('Last class they were billed later', 'Class 5', 'Will call<br>Payment terms stay as they are (N30)<br>Warehouse pulls it right away',
        'Today', 'Will call<br>Payment terms <b>PCD</b>: pay first<br>The order <b>waits</b> until it\'s paid<br>The <b>cash desk</b> takes the payment',
        notes="Bridge from Class 5. Same will call, but now nobody pulls it until the money is in."),
plan([('0:00', 'A pay-first call', 'set it up together', '15 min'), ('0:15', 'Why it waits', 'OIS300 and the C10 stop', '10 min'),
      ('0:25', 'The cash desk', 'who takes the money', '5 min'), ('0:30', 'Your turn', 'one on your own', '10 min'), ('0:40', 'Recap and questions', '', '5 min')],
     notes="Run of show."),
call('c1', 'Lone Star Floors', 'Gloria is paying when she gets there', end='On hold. Set up the order.'),
heard('A pay-first pickup', [('Account', '017403', 'Lone Star Floors'), ('Paying', 'At the counter', 'by card, not on account'),
      ('Items', 'PSA 820 · 2', 'STAPSA820'), ('PO', 'None', 'in class: TEST-your name-date'), ('Delivery', 'Will call', 'Carrollton'), ('Terms', 'PCD', 'pay first')],
      notes="The new thing she said: \"I'll pay when I get there, we don't run it on account.\" That's the clue for a pay-first term. In TST, 017403 shows the real customer's name; the deck uses a made-up one because the site is public.",
      kicker='What did Gloria need?'),
{'notes': "Step 1. Same start as Class 5. This customer already defaults to will call (CO type C01 Bravo Normal/WC) and Carrollton, so there's less to change. Enter (Next) twice to get to Generic Panel.",
 'html': '''
<div class="kicker amber">Follow along · Step 1 of 5</div>
<h2>Start the order</h2>
<ol class="steps">
<li><b>Ctrl+S</b>, <b class="mono">OIS100</b>, Enter.</li>
<li><b>Customer</b>: <b class="mono">017403</b>. Enter. <b>OK</b> on Confirm.</li>
<li>CO type says <b>Bravo Normal/WC</b> and Facility says <b>CARROLLTON</b>. Good.</li>
<li>Enter (Next) twice to <b>Generic Panel</b>.</li>
</ol>
${CARD(['acct'])}'''},
step('Follow along · Step 2 of 5', 'Pay first: Payment terms PCD', 'generic',
     ['<b>Payment terms</b>: click the search icon, pick <b class="mono">PCD</b> <b>Prep Cash Desk</b>.',
      '<b>Customer\'s ord</b>: M3 requires one. In class: <b class="mono">TEST-</b>your name<b class="mono">-</b>date.',
      '<b>Delivery method</b> is already <b class="mono">WC</b>. If not, type it.', 'Enter (Next) twice to the lines.'],
     tip='',
     small='Whether CSRs change terms on an order isn\'t settled yet (Class 10). Until it is, ask your lead before you change them.',
     notes="Step 2, the one new field. Payment terms was N30, 30 days net, which means bill them later. Change it to PCD, Prep Cash Desk. Use the search icon so you see the list: PCD Prep Cash Desk, PP Prepaid, and so on. Customer's ord can't be blank; M3 stops you with \"Customer's order number must be entered\". She has no PO, so in real life use what your lead says (her name, for example). In class use TEST-your name-date.",
     card=['pay', 'po', 'dm']),
step('Follow along · Step 3 of 5', 'Lines, then the fee', 'charges',
     ['<b>Item</b> <b class="mono">STAPSA820</b>, <b>Order qty</b> <b class="mono">2</b>, Enter.', 'The line\'s <b>Ptm</b> column says <b class="mono">PCD</b>.',
      'F3: <b>Charges</b> shows the <b class="mono">$17.50</b> will call fee (TST; check the real amount with your lead).', 'F3 out. Note your <b>CO no</b>.'],
     notes="Step 3. Add the line. On the line, the Ptm column (payment terms) says PCD, which tells you the header change stuck. F3 shows the will call fee, same as Class 5. F3 again to finish.",
     card=['item']),
step('Follow along · Step 4 of 5', 'It stops at 33. That\'s right.', 'ois300',
     ['<b>Ctrl+S</b>, <b class="mono">OIS300</b>. <b>Customer</b> filter: <b class="mono">017403</b>, Enter.',
      'Your order says <b class="mono">33-ALLOCATED</b>.', 'A normal will call goes to <b class="mono">44 PICK RELEASED</b> on its own within a minute. This one won\'t.'],
     notes="Step 4, the most important slide. In Class 5 the order jumped to 44 Pick released almost right away. This one sits at 33 Allocated. Nothing is wrong. The stock is set aside for her, but the warehouse can't pull it until she pays. If someone calls asking why their pay-first order isn't moving, this is why.",
     card=None),
step('Follow along · Step 5 of 5', 'The reason: C10, not paid', 'stop',
     ['Click the order row, then <b>Delivery toolbox</b> on the right.', 'Click the delivery row, then the <b>Display</b> button.',
      '<b>Dely stop code</b>: <b class="mono">C10-Delivery not paid</b>.', '<b>Payment terms</b>: <b class="mono">PCD</b>.'],
     notes="Step 5. This is where M3 tells you why. The delivery has stop code C10, Delivery not paid, and Delivery status 03 Pick stop. It comes off when the payment is taken. You don't remove it yourself. Display is read-only, so you can't break anything here. F3 back out.",
     card=None),
{'notes': "OIS215 is the cash desk. At Carrollton there are two: 101A and 101B, both COD CASH DESK. The person working the counter takes the payment against the order there. That's when C10 comes off. Most of you won't have cash desk access; that's expected. In TST our training login didn't have it either, so we couldn't run the payment end to end. Ask your trainer who takes payments at your location.",
 'html': '''
<div class="kicker">When she gets there</div>
<h2>The cash desk takes the money</h2>
<div class="pair">
<figure>${IMG('cashdesk')}<figcaption><b>OIS215</b>: Carrollton cash desks <b class="mono">101A</b> / <b class="mono">101B</b>.</figcaption></figure>
<figure>${IMG('noauth')}<figcaption>Not set up for the cash desk? You'll see this. Hand it to whoever is.</figcaption></figure>
</div>
<p class="small">Payment taken → C10 comes off → the warehouse releases it → OIS300 shows <b class="mono">44 PICK RELEASED</b>.</p>'''},
cards('After it\'s paid', 'What happens next', [
    ('The stop comes off', 'Once the cash desk takes the payment, <b class="mono">C10</b> is gone and the delivery can be released.'),
    ('The warehouse pulls it', 'They release and pick it. OIS300 shows <b class="mono">44 PICK RELEASED</b>.'),
    ('Customer asks "is it ready?"', 'Check OIS300. Still 33? It hasn\'t been paid yet.')],
    notes="Wrap the flow. The status after pickup: ask the trainer which final status a picked-up will call shows in our setup. It hasn't been confirmed on screen yet."),
call('c2', 'Lone Star Floors', 'Read it back, tell her how it works', kicker='Back to Gloria', ring=False, end='Call ended. See you at the counter.', empty='Pick up when you have your CO number.',
     notes="Back to Gloria. CO number, pay at the counter, it gets pulled once it's paid, and the will call fee."),
try_it('Brazos Tile is paying at the counter',
       '"Luis at Brazos, account 417. Pickup in Carrollton, <b>one PSA 820</b>. I\'ll pay by card when I get there."',
       ['OIS100, customer <b class="mono">000417</b>, Enter (Next) to Generic Panel', 'Payment terms <b class="mono">PCD</b>, Delivery method <b class="mono">WC</b>, PO TEST-your name-date',
        'Add the line; Ptm says PCD', 'OIS300: your order stays at <b>33</b>', 'Delivery toolbox → Display: <b>C10-Delivery not paid</b>']),
journey('Pay at the counter, start to finish', [('OIS100', 'Order', 'Will call, Carrollton.'), ('Generic Panel', 'PCD', 'Pay-first terms.'),
        ('OIS300', 'Waits at 33', 'Expected, not an error.'), ('MWS410', 'C10', 'Delivery not paid.'), ('OIS215', 'Paid', 'Stop off, released, 44.')]),
quiz([('On a PCD will call order, why won\'t the delivery release?', ['It\'s on credit hold', 'C10: the delivery hasn\'t been paid', 'No stock', 'Wrong warehouse'], 1,
       'C10 means Delivery not paid. It comes off when the cash desk takes the payment.'),
      ('Which program takes the counter payment?', ['OIS215', 'OIS120', 'OIS103', 'CRS610'], 0, 'OIS215 Cash Payment. At Carrollton the cash desks are 101A and 101B.'),
      ('Your pay-first order sits at 33 in OIS300. What do you do?', ['Re-enter the order', 'Nothing: it\'s waiting for payment', 'Delete the C10 stop', 'Change it to OT'], 1,
       'That\'s what PCD does. Once it\'s paid, it releases.')]),
whatifs('"What if she pays over the phone?" "What if she never comes?" "What if she wants to put it on account after all?" Write it down for your lead.',
        'Make two PCD will call orders in TST and find the C10 stop on each one.'),
closing(6, 'Paid first,<br>then pulled.', 'PCD on the order, 33 is expected, C10 means not paid, and the cash desk takes the money.',
        ['PCD', 'WAITS AT 33', 'C10', 'CASH DESK']),
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-6.html'), number=6, title='Will Call Order: Pay at the Counter',
                chrome='Will call, pay at the counter', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Gloria · Lone Star Floors', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
