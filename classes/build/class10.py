"""Class 10 — Payment Terms on an Order: COD, Prepay, Credit Card (session ord-5).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000492, customer 000345
(Carrollton, defaults to WC and COD), PO TEST-CLASS10, STAPSA820 x1.
The order stopped at 33-ALLOCATED; delivery 500 in MWS410 shows Dely stop code
C10-Delivery not paid, Payment terms COD. Every other open COD order for 000345
(Oct 26) is also at 33. The session said COD was a label only (29 Oct); that's
no longer true in TST, so the sessions were updated.
Payment terms list (CSYTAB10): COD, CSD COD PRO, CSH Cash Desk, DUR, MFR, N00,
N01, N06, N07 ... PCD Prep Cash Desk, PP Prepaid, R10, S01, ZZZ.
Delivery toolbox -> Payment proposal opens OIS152: Total net 80.00 and a Print
document button (not pressed).
Customer names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c10')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)

imgs = {
    'generic':  load_img(f'{I}/generic.jpg', [b(166, 579, 320, 609), b(574, 617, 700, 646)], blur=[b(286, 186, 470, 207)], crop=b(0, 126, 1250, 670)),
    'terms':    load_img(f'{I}/terms.jpg', [b(436, 242, 1041, 351)], crop=b(408, 120, 1160, 657)),
    'ois300':   load_img(f'{I}/ois300.jpg', [b(197, 423, 540, 640)], crop=b(0, 126, 1250, 665)),
    'stop':     load_img(f'{I}/stop.jpg', [b(166, 381, 334, 410), b(574, 607, 732, 636)], crop=b(0, 126, 1250, 672)),
    'proposal': load_img(f'{I}/proposal.jpg', [b(589, 196, 776, 225), b(179, 328, 286, 358)], blur=[b(296, 232, 460, 255)], crop=b(0, 126, 1250, 665)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Dana · Lakeside Floors'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Hi, Dana at Lakeside Floors, account 345. One PSA 820, I\'ll pick it up.'],
  ['csr', 'Sure. PO?'],
  ['cust', 'No PO. And can you just bill us this time? We\'re usually COD.'],
  ['csr', 'Let me look at your account. One second.'],
 ],
 'c2': [
  ['csr', 'Dana, you\'re set up COD, so it\'ll be ready once it\'s paid at the counter.'],
  ['sys', '🎤 Your turn: tell her what you\'ll do about billing her instead.'],
  ['cust', 'Okay. Let me know.'],
 ],
}

card_items = [['acct', 'Account', '000345'], ['terms', 'Terms', 'COD (from the customer)'], ['ask', 'Bill instead?', 'ask your lead first'], ['dm', 'Delivery', 'Will call']]

slides = [
title(10, 'Payment terms:<br>COD, prepay, credit card.',
      'The terms on the order decide whether it waits for money. Know which ones do, and what you see when it\'s waiting.', mins='30 MIN',
      notes="In Class 6 they changed one order to PCD. Today: where terms come from, which ones stop the order, and what to tell a customer who wants different terms."),
compare('In Class 6 you made one order pay-first', 'Class 6', 'Changed Payment terms to PCD<br>Saw it wait at 33 with C10<br>Cash desk takes the money',
        'Today', 'Terms come from the <b>customer</b><br>Which terms <b>stop</b> the order<br><b>COD</b> now stops too<br>Changing terms: <b>ask first</b>',
        notes="Bridge from Class 6."),
call('c1', 'Lakeside Floors', 'Dana wants to be billed', end='On hold. Look at her terms.'),
heard('A COD customer asking for terms', [('Account', '000345', 'Lakeside Floors'), ('Terms', 'COD', 'usually'), ('Asks', 'Bill us', 'this one time'),
      ('Item', 'PSA 820 · 1', 'will call'), ('PO', 'None', 'in class: TEST-your name-date'), ('You', 'Ask first', 'before changing terms')],
      notes="She's asking you to change her payment terms on this order. That's the decision we're not making ourselves yet. In TST, 000345 shows the real customer's name; the deck uses a made-up one because the site is public.",
      kicker='What did Dana ask?'),
step('Step 1 of 4', 'Her terms come with her', 'generic',
     ['OIS100, customer <b class="mono">000345</b>, Enter (Next) to <b>Generic Panel</b>.', '<b>Payment terms</b> already says <b class="mono">COD</b>. It came from the customer record.',
      '<b>Delivery method</b> is <b class="mono">WC</b>. Add the PO, then the line.'],
     notes="Step 1. There's no prepay checkbox in M3. A customer is pay-first because of their payment terms, set on the customer (CRS610, panel J). The order copies them. You can see them here on Generic Panel.",
     card=['acct', 'terms']),
step('Step 2 of 4', 'The list of terms', 'terms',
     ['Search icon on <b>Payment terms</b> shows them all.', '<b class="mono">COD</b>, <b class="mono">CSD</b> COD PRO, <b class="mono">CSH</b> Cash Desk on page 1.',
      '<b class="mono">PCD</b> Prep Cash Desk and <b class="mono">PP</b> Prepaid are further down.', 'Cancel. Don\'t change hers.'],
     notes="Step 2. Just look. Show them the list so the codes aren't a mystery, then Cancel. She asked to be billed instead; that's a terms change and we ask first.",
     card=['ask']),
{'notes': "What each term does today, from the session plus what we saw in TST on 6 Nov. The big change: COD used to be a label only (29 Oct). Now a COD order stops with C10 the same as PCD. Confirm with your lead that this is how it'll work at go-live. CC and CSD/PP haven't been retested.",
 'html': '''
<div class="kicker">Which terms do what</div>
<h2>Does it wait for money?</h2>
<div class="cols">
<div><table class="codes">
<tr><td class="mono">PCD</td><td>Prep Cash Desk</td><td><b>Waits</b> (C10)</td></tr>
<tr><td class="mono">CSH</td><td>Cash Desk</td><td><b>Waits</b> (same as PCD)</td></tr>
<tr><td class="mono">COD</td><td>COD</td><td><b>Waits</b> in TST now (C10)</td></tr>
<tr><td class="mono">CC</td><td>Credit Card</td><td>Probably waits. Not tested</td></tr>
<tr><td class="mono">CSD / PP</td><td>COD PRO / Prepaid</td><td>Not retested</td></tr>
<tr><td class="mono">N30 etc.</td><td>Net terms</td><td>Doesn't wait. Billed later</td></tr>
</table></div>
</div>
<p class="small">COD was a label only on 29 Oct. On 6 Nov a COD order in TST stopped with C10. Confirm with your lead how it\'ll work at go-live.</p>'''},
step('Step 3 of 4', 'A COD order waits at 33', 'ois300',
     ['F3 out, then <b>OIS300</b>, <b>Customer</b> filter <b class="mono">000345</b>.', 'Your order: <b class="mono">33-ALLOCATED</b>. So are her other COD orders.',
      'No credit flag. It\'s waiting for payment, not credit.'],
     notes="Step 3. Same as Class 6: it stops at 33. Point out all of her open COD orders are sitting at 33 too. OIS300 shows no credit flag; this isn't a credit hold (that's Class 11).",
     card=None),
pair('Step 4 of 4', 'Why, and how much', 'stop', '<b>Delivery toolbox</b> → Display: <b class="mono">C10-Delivery not paid</b>, terms <b class="mono">COD</b>.',
     'proposal', '<b>Delivery toolbox</b> → <b>Payment proposal</b> (OIS152): the amount due, and <b>Print document</b> for the customer.',
     notes="Step 4. Left: same C10 stop as Class 6. Right: from the Delivery toolbox, click the delivery and then Payment proposal in the right panel. It shows the total due and has a Print document button if the customer wants it in writing. Don't print in class.",
     small='Once the cash desk takes the payment (OIS215), C10 comes off and the delivery releases.', card=None),
cards('Not settled yet', 'Ask before you change terms', [
    ('Changing terms on an order', 'You <i>can</i> pick a different term on Generic Panel. Whether CSRs should hasn\'t been decided. Until it is, <b>ask your lead first</b>.'),
    ('COD at go-live', '681 customers are on COD. In TST they now stop with C10. Confirm that\'s the go-live setup.'),
    ('Part payments', '50% down vs 100% prepay is undecided.')],
    notes="All from the session's 'not settled' notes, updated for COD."),
call('c2', 'Lakeside Floors', 'Tell her how it works, and what you\'ll do', kicker='Back to Dana', ring=False, end='Call ended.', empty='Pick up when you\'re ready.',
     notes="Back to Dana. It'll be ready once paid. For billing her instead: \"I'll check with my lead and call you back.\" Don't change the terms."),
try_it('Your turn: read the terms',
       'Open three customers in OIS100 and stop on Generic Panel. Don\'t save anything.',
       ['<b class="mono">000345</b>: what terms? Does it wait?', '<b class="mono">017403</b>: what terms? Does it wait?', '<b class="mono">000300</b>: what terms? Does it wait?',
        'For one COD order: Delivery toolbox → find <b>C10</b>, then <b>Payment proposal</b>'],
       done='Done? Say what you\'d tell a COD customer who wants to be billed.'),
journey('Terms on an order', [('Customer', 'Terms', 'Set on the customer (CRS610 J).'), ('Generic Panel', 'See them', 'COD, PCD, N30…'),
        ('OIS300', '33', 'Pay-first waits.'), ('MWS410', 'C10', 'Delivery not paid.'), ('OIS152 / OIS215', 'Amount, paid', 'Proposal, then cash desk.')]),
quiz([('What makes a customer prepay in M3?', ['A prepay checkbox on the customer', 'Their payment terms', 'The warehouse', 'The CO type alone'], 1, 'No checkbox. Pay-first comes from the terms.'),
      ('In TST today (6 Nov 2026), an order on COD terms:', ['Stops with C10 until paid', 'Goes to the warehouse like any other order', 'Cannot be saved', 'Goes on credit hold'], 0,
       'COD now stops like PCD in TST. Confirm the go-live setup with your lead.'),
      ('A COD customer asks to be billed this time. You:', ['Change the terms to N30', 'Ask your lead before changing terms', 'Delete the order', 'Change the customer record'], 1,
       'Whether CSRs change terms isn\'t settled. Ask first.')]),
whatifs('"What if they pay by phone?" "What if they want to pay half now?" "What if a regular N30 customer wants to pay at the counter?" Write it down for your lead.',
        'Look up the terms on five customers you know. Which ones would wait for payment?'),
closing(10, 'Terms decide<br>who waits.', 'Terms come from the customer, pay-first terms (now including COD in TST) stop with C10, and you ask before changing them.',
        ['TERMS', 'C10', 'PROPOSAL', 'ASK FIRST']),
]

EXTRA = '<style>.codes{border-collapse:collapse;width:100%;font-size:clamp(14px,1.4vw,19px)}.codes td{padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.08)}.codes td.mono{color:var(--accent,#f0a030);width:18%}</style>'
slides[0]['html'] = EXTRA + slides[0]['html']

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-10.html'), number=10, title='Payment Terms: COD, Prepay, Credit Card',
                chrome='Payment terms', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Dana · Lakeside Floors', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
