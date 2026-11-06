"""Class 15 — Customer Return: Credit Order (C05) (session ord-2).

Tested in M3 TST (CMP100) on 6 Nov 2026, customer 008753 (Carrollton, COD, OT).
Original order 1000000192: line 20 ALVFH785711T TMOLD - Badlands Origins,
2 PC @ 26.00 (a cutover order at 33; in real life it would be invoiced).
OIS300 New -> OIS100 with the customer prefilled, CO type C05 Credit NoStkUpd,
"Confirm" alert -> OK. Panel sequence 5 skips Generic Panel and goes straight
to the lines. CO no 5000000004 (credit orders are a 5-series).
Qty "1" -> "Quantity has been incorrectly entered". Qty "1-" (minus AFTER the
number) -> line saved, Order qty 1-, net 26.00, Running Total -26.00.
Back (<) to panel A, Panel sequence I5, Enter -> Generic Panel: status already
66-Delivered (no warehouse step). Your ref 1 = 1000000192, Customer's ord
TEST-CLASS15, Next -> line at 66.
Customer and employee names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c15')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)
N101 = b(286, 199, 470, 221)            # customer name on OIS101
BY = b(735, 456, 880, 528)               # Changed by column (usernames)

imgs = {
    'original': load_img(f'{I}/original.jpg', [b(168, 228, 280, 258), b(18, 492, 1225, 527)], blur=[N101, b(784, 456, 876, 528)], crop=b(0, 126, 1250, 665)),
    'c05':      load_img(f'{I}/c05.jpg', [b(178, 322, 340, 352), b(704, 305, 865, 470)], blur=[b(296, 226, 470, 247), b(296, 259, 470, 281), b(14, 640, 200, 662), b(424, 640, 600, 662)], crop=b(0, 126, 1250, 670)),
    'qtyerr':   load_img(f'{I}/qtyerr.jpg', [b(656, 305, 911, 469), b(395, 513, 483, 543)], blur=[N101], crop=b(0, 126, 1250, 665)),
    'line':     load_img(f'{I}/line.jpg', [b(18, 456, 1225, 491), b(546, 623, 688, 653), b(168, 228, 280, 258)], blur=[N101, BY], crop=b(0, 126, 1250, 665)),
    'yourref':  load_img(f'{I}/yourref.jpg', [b(577, 428, 958, 458), b(168, 248, 398, 311)], blur=[b(286, 186, 470, 207)], crop=b(0, 126, 1250, 705)),
    'lines66':  load_img(f'{I}/lines66.jpg', [b(168, 262, 398, 325), b(18, 456, 1225, 491)], blur=[N101, BY], crop=b(0, 126, 1250, 665)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Luis · Coastal Bend Floors'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Hi, Luis at Coastal Bend Floors, account 8753. We got two of the Badlands Origins T-molds and only used one. Can I send one back?'],
  ['csr', 'Let me check with my manager on the return, and I\'ll pull up the order.'],
  ['cust', 'Sure. It was on 1000000192.'],
 ],
 'c2': [
  ['csr', 'Luis, the return\'s approved. I\'ve got the credit in for one T-mold.'],
  ['sys', '🎤 Your turn: give him the credit number and tell him what happens next.'],
  ['cust', 'Great, thanks.'],
 ],
}

card_items = [['acct', 'Account', '008753'], ['orig', 'Original CO', '1000000192'], ['item', 'Return', 'T-mold · 1 PC @ 26.00'], ['credit', 'Credit CO', 'new 5-series']]

slides = [
title(15, 'A return<br>is a credit order.',
      'Get the OK, find the original order, and enter a C05 credit that points back to it.', mins='45 MIN',
      notes="A customer has something to send back. We don't edit the old order. We make a new credit order (C05) and tie it to the original so AR can match it."),
compare('Last time: a different CO type', 'Class 14', 'C04 for a quote<br>6-series number<br>Convert to CO',
        'Today', '<b>C05</b> for a credit<br><b>5-series</b> number<br>Qty with the <b>minus after</b>: <b class="mono">1-</b><br><b>Your ref 1</b> = the original CO',
        notes="Bridge from Class 14. Same idea: the CO type changes what the order is."),
plan([('0:00', 'Approval and the original', 'OIS300', '10 min'), ('0:10', 'The credit order', 'C05, 1-, Your ref 1', '20 min'), ('0:30', 'Hand off, your turn', '', '15 min')], notes="Run of show."),
call('c1', 'Coastal Bend Floors', 'Luis has one to send back', end='On hold. Get the OK and find the order.'),
heard('A return', [('Account', '008753', 'Coastal Bend Floors'), ('Item', 'T-mold', 'Badlands Origins'), ('Qty', '1 of 2', 'back'),
      ('Original', '1000000192', 'he gave it'), ('First', 'Manager OK', 'before you enter it'), ('PO', 'None', 'in class: TEST-your name-date')],
      notes="Nothing gets entered until the return is approved. In TST, 008753 shows the real customer's name; the deck uses a made-up one because the site is public.",
      kicker='What did Luis need?'),
step('Step 1 of 5', 'Find the original', 'original',
     ['Get your manager\'s OK first.', 'OIS300, Customer filter <b class="mono">008753</b>, open <b class="mono">1000000192</b>.',
      'Write down the line: <b class="mono">ALVFH785711T</b>, <b class="mono">2 PC</b> @ <b class="mono">26.00</b>.'],
     notes="Step 1. You need the item, U/M and price from the original so the credit matches. OIS350 shows the invoice if you need it. In TST this order is a cutover order that hasn't shipped; in real life it would be invoiced.",
     card=['orig', 'item']),
step('Step 2 of 5', 'New order, CO type C05', 'c05',
     ['F3 back to OIS300 and click <b>+</b> (New). The customer fills in.', '<b>CO type</b> <b class="mono">C05</b> <b>Credit NoStkUpd</b>. Enter.', 'M3 says <b>Confirm</b>. OK. It goes straight to the lines.'],
     notes="Step 2. C05 skips Generic Panel and goes right to the lines (panel sequence 5). We'll go back for Your ref 1 in step 4.",
     card=['acct']),
pair('Step 3 of 5', 'Quantity: the minus goes after', 'qtyerr', 'Item <b class="mono">ALVFH785711T</b>, qty <b class="mono">1</b>: <b>Quantity has been incorrectly entered</b>.',
     'line', 'Type <b class="mono">1-</b>. Add. The line saves, Running Total <b class="mono">-26.00</b>.',
     notes="Step 3. This trips everyone. On a credit order the quantity is negative, and M3 wants the minus sign after the number: 1-, not -1. Check the U/M and price match the original (PC, 26.00).",
     small='The CO no is the credit number: <b class="mono">5000000004</b>. Credits are a <b>5-series</b>.', card=['credit']),
step('Step 4 of 5', 'Point it at the original', 'yourref',
     ['<b>&lt;</b> back to the first panel. <b>Panel sequence</b> <b class="mono">I5</b>, Enter.', '<b>Generic Panel</b>: <b>Your ref 1</b> = <b class="mono">1000000192</b>.', 'Customer\'s ord (in class <b class="mono">TEST-your name-date</b>). Next.'],
     notes="Step 4. Typing I5 in Panel sequence shows Generic Panel this one time. Your ref 1 is how AR matches the credit to the original. Notice the status: 66-Delivered already. A C05 has no warehouse step.",
     card=['orig']),
step('Step 5 of 5', 'Done at 66', 'lines66',
     ['Status <b class="mono">66-Delivered</b> right away. Nothing goes to the warehouse.', '<b>C05</b> = <b>no stock update</b>: it credits the customer but doesn\'t put the product back on hand.',
      'Read him the credit number.'],
     notes="Step 5. 66 means it's ready to invoice (the credit memo). If the product is really coming back to stock, C05 isn't the right type; ask Mike which one to use.",
     card=['credit']),
cards('Hand it off', 'Who needs to know', [
    ('AR', 'The <b>credit CO no</b> and the <b>original CO no</b>.'),
    ('Warehouse', 'If product is physically coming back, tell them to expect it.'),
    ('Back to stock?', 'C05 doesn\'t put it back on hand. Ask Mike which CO type to use. That type isn\'t on the program list yet.')],
    notes="From the session."),
call('c2', 'Coastal Bend Floors', 'Give him the credit number', kicker='Back to Luis', ring=False, end='Call ended.', empty='Pick up when you have the credit number.',
     notes="Back to Luis. Credit number, and how to get the T-mold back to us."),
try_it('Your turn: a credit',
       'Customer <b class="mono">008753</b>, original <b class="mono">1000000192</b>.',
       ['OIS300 → find the original, write down the line', '+ (New), CO type <b class="mono">C05</b>, OK on Confirm', 'Item, qty <b class="mono">1-</b>, Add',
        '<b>&lt;</b>, Panel sequence <b class="mono">I5</b>: Your ref 1 = the original CO', 'Write down the 5-series credit number']),
journey('A return', [('Manager', 'OK', 'Before anything.'), ('OIS300', 'Original', 'Item, U/M, price.'), ('OIS100', 'C05', 'Credit NoStkUpd.'),
        ('OIS101', '1-', 'Minus after.'), ('Generic Panel', 'Your ref 1', 'The original CO.')]),
quiz([('Which CO type is a credit with no stock update?', ['C01', 'C02', 'C04', 'C05'], 3, 'C05 Credit NoStkUpd.'),
      ('How do you key a return of 1?', ['-1', '1-', '1', '(1)'], 1, 'Minus after the number. 1 alone gives "Quantity has been incorrectly entered".'),
      ('Where does the original CO no go?', ['Customer\'s ord', 'Your ref 1 on Generic Panel', 'Item number', 'Delivery method'], 1, 'Panel sequence I5 gets you to Generic Panel.')]),
whatifs('"What if the original was months ago?" "What if the price changed since?" "What if they want a replacement, not a credit?" Write it down for your lead.',
        'Enter a credit for two lines from one original order.'),
closing(15, 'A return<br>is a credit order.', 'Get the OK, C05, minus after the number, and Your ref 1 points back to the original.',
        ['OK FIRST', 'C05', '1-', 'YOUR REF 1']),
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-15.html'), number=15, title='Customer Return: Credit Order (C05)',
                chrome='Customer return', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Luis · Coastal Bend Floors', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
