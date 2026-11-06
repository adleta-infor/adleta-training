"""Class 11 — When an Order Is Held for Credit (session ord-3).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000493, customer 000384
(Carrollton, N30, WC). "Credit limit 3 has been exceeded" came up three times:
after the customer number, after adding the line, and on F3 out of Charges.
OK each time. Header: CO stop 3-Credit limit 3, Customer stop 0-Not blocked.
Line saved; order at 22-Reserved (didn't allocate).
CRS610 (Display) panel J: Payment terms N30, Customer stop 0-Not blocked,
credit limit field (O/S Orders & Invoice) 5000.00. Panel K: Credit dept ref
(the credit manager) — name blurred in the deck.
OIS300, sorting 2-C.Order Stop / view D02-Credit Stops listed three orders with
stop 9 but not this stop-3 order, even filtered to stop 3. Flagged in the
session as "check on screen".
Customer and employee names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c11')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)

imgs = {
    'alert':  load_img(f'{I}/alert.jpg', [b(540, 310, 1028, 468)], crop=b(0, 126, 1250, 670)),
    'header': load_img(f'{I}/header.jpg', [b(609, 281, 786, 311)], blur=[b(286, 186, 470, 207), b(286, 432, 470, 490)], crop=b(0, 126, 1250, 670)),
    'lines':  load_img(f'{I}/lines.jpg', [b(566, 295, 722, 325), b(168, 262, 398, 325)], blur=[b(286, 199, 470, 221)], crop=b(0, 126, 1250, 665)),
    'panelj': load_img(f'{I}/panelj.jpg', [b(178, 246, 310, 276), b(178, 476, 344, 506), b(178, 589, 344, 619)], blur=[b(577, 513, 690, 619)], crop=b(0, 126, 1250, 670)),
    'panelk': load_img(f'{I}/panelk.jpg', [b(598, 403, 800, 433)], blur=[b(297, 186, 400, 207), b(600, 405, 800, 432)], crop=b(0, 126, 1250, 600)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Tom · Red Oak Carpets'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Hey, Tom at Red Oak Carpets, account 384. Two PSA 820s, I\'ll pick them up tomorrow.'],
  ['csr', 'Okay, let me get that in.'],
  ['sys', 'M3: "Credit limit 3 has been exceeded"'],
  ['csr', 'Tom, give me just a second.'],
 ],
 'c2': [
  ['csr', 'Tom, the order\'s in, but it\'s on hold with our credit department.'],
  ['sys', '🎤 Your turn: tell him what happens next, without promising when.'],
  ['cust', 'Okay. Who should I talk to?'],
 ],
}

card_items = [['acct', 'Account', '000384'], ['stop', 'CO stop', '3-Credit limit 3'], ['who', 'Who releases', 'Credit (OIS120)'], ['note', 'Write down', 'who, when, what they said']]

slides = [
title(11, 'When an order<br>is held for credit.',
      'Recognize a credit hold, read the customer\'s credit info without changing it, and hand it to credit.', mins='45 MIN',
      notes="Classes 6 and 10 were holds for payment. This one is a credit hold. Different stop, different owner. CS doesn't release it."),
compare('Last time: holds for payment', 'Classes 6 & 10', 'Pay-first terms (PCD, COD)<br>C10 on the delivery<br>Cash desk takes the money',
        'Today', '<b>Credit limit</b> exceeded<br><b>CO stop 3</b> on the order<br><b>Credit</b> releases it (OIS120)<br>You read, you don\'t touch',
        notes="Bridge. Two different kinds of hold."),
plan([('0:00', 'A held order', 'the alert, the CO stop', '15 min'), ('0:15', 'Read the customer', 'CRS610 J and K, look don\'t touch', '10 min'),
      ('0:25', 'Hand it to credit', 'and write it down', '10 min'), ('0:35', 'Recap and questions', '', '10 min')], notes="Run of show."),
call('c1', 'Red Oak Carpets', 'Tom places an order', end='On hold. Something came up.'),
heard('An order, and an alert', [('Account', '000384', 'Red Oak Carpets'), ('Item', 'PSA 820 · 2', 'pickup'), ('Alert', 'Credit limit 3', 'has been exceeded'),
      ('Who decides', 'Credit', 'not CS'), ('PO', 'None', 'in class: TEST-your name-date'), ('You', 'Write it down', 'who you called')],
      notes="The order itself is ordinary. The alert is the new part. In TST, 000384 shows the real customer's name; the deck uses a made-up one because the site is public.",
      kicker='What happened?'),
step('Step 1 of 4', '"Credit limit 3 has been exceeded"', 'alert',
     ['OIS100, customer <b class="mono">000384</b>, Enter.', 'The alert comes up right away. Click <b>OK</b>.',
      'You\'ll see it again when you add a line, and again when you F3 out. <b>OK</b> each time.'],
     notes="Step 1. The alert appears three times in TST: after the customer number, after each line, and when you leave the order. Clicking OK doesn't approve anything; it just lets you finish entering the order. Cancel would stop you from entering it at all.",
     card=['acct']),
step('Step 2 of 4', 'The order is stopped', 'header',
     ['On every panel header: <b>CO stop</b> <b class="mono">3-Credit limit 3</b>.', '<b>Customer stop</b> is still <b class="mono">0-Not blocked</b>. It\'s this order, not the account.',
      'Enter (Next) through, PO, then the line.'],
     notes="Step 2. Point at CO stop. That's the credit hold. Customer stop 0 means the account itself isn't blocked; this order is over the limit.",
     card=['stop']),
step('Step 3 of 4', 'The line saves, the order waits', 'lines',
     ['Add <b class="mono">STAPSA820</b>, qty <b class="mono">2</b>. OK on the alert.', 'The line is on. Status <b class="mono">22-Reserved</b>.', 'It won\'t allocate or go to the warehouse until credit releases it.'],
     notes="Step 3. Everything saved. It just isn't moving. Compare with Class 6, where a PCD order went to 33 and waited on the delivery. A credit hold stops it earlier.",
     card=['stop']),
pair('Step 4 of 4', 'Look, don\'t touch: CRS610', 'panelj', '<b>CRS610</b> → customer → <b>Display</b> → panel <b>J</b>: payment terms, customer stop, the credit limit.',
     'panelk', 'Panel <b>K</b>: <b>Credit dept ref</b> is the credit manager to contact.',
     notes="Step 4. Ctrl+S, CRS610, click the customer, Display (read-only), then the Financial Information 1 tab (J) and Financial Information 2 (K). You're here to read it. Don't change terms or limits to get around a hold. Panel K shows who in credit owns this account (blurred here).",
     small='Use <b>Display</b>, not Change. Careful: Ctrl+4 is Delete.', card=['who']),
cards('Hand it to credit', 'What you do next', [
    ('Contact credit', 'The person on CRS610 panel <b>K</b> (or AR). Give them the <b>customer number</b>, <b>CO no</b> and <b>order total</b>.'),
    ('Credit decides', 'They release it in <b>OIS120</b>. CS doesn\'t release holds or change terms to get around one.'),
    ('Write it down', 'Add a note on the order: who you contacted, when, what they said. "Called credit 10:15am. Reviewing. Will confirm by EOD."'),
    ('If it comes back', 'Credit released it and you change a qty or price? The alert comes back and it\'s held again. That\'s expected. Call credit again.')],
    notes="From the session. Note: in TST on 6 Nov, this stop-3 order didn't show in OIS300's Credit Stops view (2-C.Order Stop / D02); only stop-9 orders did. Ask credit how they find held orders, so you know they'll see yours."),
cards('Two kinds of hold', 'Credit hold vs pay-first hold', [
    ('Credit hold (today)', '<b>CO stop 3</b> on the order header. Order sits at 22. <b>Credit</b> releases it.'),
    ('Pay-first hold (Classes 6, 10)', '<b>C10</b> on the delivery in MWS410. Order sits at 33. The <b>cash desk</b> takes the payment.')],
    notes="If an order isn't moving: header CO stop → credit. No CO stop, sitting at 33 → check MWS410 for C10."),
call('c2', 'Red Oak Carpets', 'Tell him it\'s with credit', kicker='Back to Tom', ring=False, end='Call ended.', empty='Pick up when you\'re ready.',
     notes="Back to Tom. It's in, it's with credit, you'll let him know. Don't promise a time."),
try_it('Your turn: a held order',
       'Customer <b class="mono">000384</b>, one PSA 820, will call.',
       ['Enter it. OK on each <b>Credit limit 3</b> alert', 'Find <b>CO stop 3</b> on the header', 'CRS610 → Display → panels <b>J</b> and <b>K</b>: read, don\'t change',
        'Write the note you\'d add: who, when, what they said']),
journey('A credit hold', [('OIS100', 'Alert', 'OK; finish entering.'), ('Header', 'CO stop 3', 'Credit limit.'), ('CRS610', 'J and K', 'Read, don\'t touch.'),
        ('Credit', 'Contact', 'CO no, customer, total.'), ('OIS120', 'Released', 'By credit, not CS.')]),
quiz([('Who releases a credit-held order?', ['The CSR who entered it', 'Credit / AR, in OIS120', 'The warehouse', 'IT'], 1, 'Credit decides and releases it.'),
      ('Where are a customer\'s credit limit and payment terms?', ['OIS101', 'CRS610 panel J', 'MMS001', 'PPS200'], 1, 'Read it in Display. Panel K has the credit manager.'),
      ('An order isn\'t moving. No CO stop, and it\'s at 33. Where do you look?', ['CRS620', 'MWS410, for a C10 stop on the delivery', 'GLS200', 'OIS010'], 1,
       'That\'s a pay-first hold, not credit.')]),
whatifs('"What if the customer says they just paid?" "What if credit doesn\'t answer?" "What if it\'s a rush?" Write it down for your lead.',
        'Enter one held order in TST and practice the note you\'d write.'),
closing(11, 'Spot it,<br>hand it off.', 'Credit limit alert, CO stop 3, read CRS610 without touching it, and let credit release it.',
        ['ALERT', 'CO STOP 3', 'CRS610 J/K', 'CREDIT']),
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-11.html'), number=11, title='When an Order Is Held for Credit',
                chrome='Credit hold', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Tom · Red Oak Carpets', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
