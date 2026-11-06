"""Class 12 — Out of Stock, Mill ETAs, and Discontinued Items (session ord-13).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000494, customer 047980
(Carrollton, OT, N30), PO TEST-CLASS12. MAP5UB500904 Kerapoxy CQ 1 gal Gray,
qty 3, 0 in CAR -> MMS165 "Ordered quantity is not available", lead time 14
(11/20/26). Confirm delivery date -> "Accept new date? Yes, confirm planning
date 122526. No, confirm requested delivery date 110626 (ignore shortage)."
Yes -> line saved 22-Reserved, Cfdldt 122826 (later than the date in the
question). Material Plan (MMS080) from the line: "WARNING - The item is due for
replanning" (OK), Inventory plnd 10-Not stocked, only our demand, nothing
incoming.
A discontinued (status 50) item wasn't found again today; that part is taught
from the 29 Oct test in the session, without a screenshot.
Customer names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c12')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)

imgs = {
    'atp':     load_img(f'{I}/atp.jpg', [b(671, 305, 896, 470), b(610, 229, 756, 258), b(1268, 210, 1410, 236)], crop=b(0, 126, 1568, 500)),
    'confirm': load_img(f'{I}/confirm.jpg', [b(539, 300, 1028, 476)], crop=b(0, 126, 1250, 560)),
    'lines':   load_img(f'{I}/lines.jpg', [b(675, 457, 747, 490), b(168, 262, 398, 325)], blur=[b(286, 199, 470, 221)], crop=b(0, 126, 1250, 665)),
    'mplan':   load_img(f'{I}/mplan.jpg', [b(18, 589, 1236, 625), b(610, 295, 776, 324)], crop=b(0, 126, 1250, 665)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Jen · Bosque River Floors'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Hi, Jen at Bosque River Floors in Waco, account 47980. I need three Kerapoxy CQ, the 1 gallon, in gray.'],
  ['csr', 'Let me check.'],
  ['cust', 'If you don\'t have it, when can I get it?'],
  ['csr', 'One second.'],
 ],
 'c2': [
  ['csr', 'Jen, we don\'t have the gray in Carrollton right now.'],
  ['sys', '🎤 Your turn: read her the Cfdldt date from your line.'],
  ['cust', 'Okay, put it on. Let me know if it changes.'],
 ],
}

card_items = [['acct', 'Account', '047980'], ['item', 'Item', 'Kerapoxy CQ 1 gal Gray · 3'], ['eta', 'ETA', 'Confirm delivery date → Yes'], ['tell', 'Tell', 'purchasing about the backorder']]

slides = [
title(12, 'Out of stock,<br>mill ETAs.',
      'When there\'s not enough, give the customer a real date instead of a guess, and make sure purchasing knows.', mins='45 MIN',
      notes="Today's call is for something that isn't on the shelf. M3 tells you, and it can give you a real date. One key you must not press: F3."),
compare('Last time you checked stock first', 'Class 5', 'Item search, the warehouse column<br>Don\'t promise what isn\'t there',
        'Today', 'M3 opens <b>MMS165</b> when there isn\'t enough<br><b>Confirm delivery date → Yes</b> for a real ETA<br>Follow up in <b>Material Plan</b><br><b>Tell purchasing</b>',
        notes="Bridge from Class 5."),
call('c1', 'Bosque River Floors', 'Jen needs something you don\'t have', end='On hold. Add the line.'),
heard('A backorder call', [('Account', '047980', 'Bosque River'), ('Item', 'Kerapoxy CQ 1 gal', 'Gray'), ('Qty', '3', 'EA'),
      ('Asks', 'When can I get it?', 'a real date'), ('PO', 'None', 'in class: TEST-your name-date'), ('After', 'Tell purchasing', 'every backorder')],
      notes="In TST, 047980 shows the real customer's name; the deck uses a made-up one because the site is public.", kicker='What did Jen need?'),
step('Step 1 of 4', '"Ordered quantity is not available"', 'atp',
     ['Add <b class="mono">MAP5UB500904</b>, qty <b class="mono">3</b>, Enter.', 'M3 opens <b>MMS165</b> (Check Shortages). Click <b>OK</b> on the alert.',
      '<b>Lead time</b>: 14 days. <b>Don\'t press F3 here</b>: it drops the line.', 'Click <b>Confirm delivery date</b> on the right.'],
     notes="Step 1. This screen appears whenever there isn't enough. The habit we're breaking is F3: it closes the screen and the line is gone. Use Confirm delivery date on the right instead.",
     card=['item']),
step('Step 2 of 4', 'Yes = the real date', 'confirm',
     ['M3 asks: <b>Yes</b> = confirm the <b>planning date</b>. <b>No</b> = keep the requested date and ignore the shortage.', 'Click <b>Yes</b>.',
      'No more dummy dates like 11/11/37 on the header.'],
     notes="Step 2. Read the question out loud. Yes gives the date it can really be here. No keeps today's date and pretends the shortage isn't there. Always Yes.",
     card=['eta']),
step('Step 3 of 4', 'Read her the Cfdldt', 'lines',
     ['The line saved at <b class="mono">22-Reserved</b>.', '<b>Cfdldt</b>: <b class="mono">122826</b>, 12/28/26.', 'That\'s the date to give her. It can be a day or two after the date in the question: it lands on a delivery day.'],
     notes="Step 3. In TST the question said 12/25/26 and the line shows 12/28/26. Cfdldt moved to the customer's next delivery day. Read the customer the Cfdldt, not the number in the question.",
     card=['eta']),
step('Step 4 of 4', 'Follow up: Material Plan', 'mplan',
     ['Click the line, then <b>Material Plan</b> on the right (MMS080). OK on "due for replanning".', 'Your order is the demand. Incoming POs or transfers would show here with dates.',
      'Here nothing is coming (<b>10-Not stocked</b>). <b>Tell purchasing.</b>'],
     notes="Step 4. In TST, this backorder didn't create a purchase suggestion in PPS170 (only drop ship orders do, Class 16), so it doesn't reach purchasing by itself. Until that's set up, tell purchasing about every backorder.",
     card=['tell']),
cards('Discontinued items', 'Status 50: can\'t be ordered', [
    ('New lines', 'M3 won\'t let you key a discontinued item, even with stock on the shelf: <b>Line type 1 not allowed when item status = 50</b>. Offer the replacement, or ask product management or your lead.'),
    ('Already on order', 'If an item is discontinued after the customer ordered it, the line stays open. Nothing warns you and nothing tells purchasing. Check <b>OIS301</b> by item and make sure purchasing knows.')],
    notes="From the session's 29 Oct test. We didn't re-find a status-50 item today, so there's no fresh screenshot."),
call('c2', 'Bosque River Floors', 'Give her the real date', kicker='Back to Jen', ring=False, end='Call ended.', empty='Pick up when you have the Cfdldt.',
     notes="Back to Jen. Not in Carrollton, here's the date from Cfdldt, and we'll let you know if it changes."),
try_it('Your turn: a backorder',
       'Customer <b class="mono">047980</b>. Pick an item with <b>0</b> in the CAR column of Item search.',
       ['Add it with a qty. MMS165 opens', 'Don\'t press F3. <b>Confirm delivery date</b> → <b>Yes</b>', 'Read the <b>Cfdldt</b> on the line',
        'Material Plan: anything coming in?', 'Say what you\'d send purchasing']),
journey('A backorder', [('OIS101', 'Add the line', 'More than is there.'), ('MMS165', 'Not F3', 'Confirm delivery date.'), ('Yes', 'Real date', 'Planning date.'),
        ('Line', 'Cfdldt', 'Read it to the customer.'), ('MMS080', 'Follow up', 'Tell purchasing.')]),
quiz([('MMS165 says Ordered quantity is not available. What do you click to save the line with a real ETA?', ['F3', 'Confirm delivery date, then Yes', 'Cancel', 'Delete line'], 1,
       'F3 drops the line. Yes confirms the planning date.'),
      ('Which date do you give the customer?', ['The date in the Yes/No question', 'The Cfdldt on the line', 'Today', '11/11/37'], 1, 'Cfdldt can land a day or two later, on a delivery day.'),
      ('You try to add a status-50 item and M3 says Line type 1 not allowed. What does that mean?', ['Your user is missing access', 'The item is discontinued and can\'t be ordered', 'The customer is on credit hold', 'The warehouse is wrong'], 1,
       'Offer the replacement or ask product management.')]),
whatifs('"What if they need it sooner?" "What if another warehouse has it?" "What if the mill date changes?" Write it down for your lead.',
        'Make two backorders in TST and find them in Material Plan.'),
closing(12, 'A real date,<br>not a guess.', 'Confirm delivery date → Yes, read the Cfdldt, check Material Plan, and tell purchasing.',
        ['NOT F3', 'YES', 'CFDLDT', 'PURCHASING']),
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-12.html'), number=12, title='Out of Stock and Mill ETAs',
                chrome='Out of stock', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Jen · Bosque River Floors', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
