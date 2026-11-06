"""Class 13 — Dye Lots, Stealing Stock, and Forcing a Backorder (session ord-12).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000495, customer 006433
(Carrollton, OT), Req delivery dt 11/19/26 (future, so it wouldn't pick-release),
PO TEST-CLASS13. ARMH2004 Medintone 6.5 ft Feathersmooth, 90 SY -> 123.038 LF.
Allocation (MMS121) split it across four rolls: S262130061 65.415,
S261330062 44.007, S262130062 3.363, S241440066 10.253. Moved the first roll to
S263830075 (dye lot 1746): Overr alloc mtd changed to 3-Man al, index.
Attribute values (ATS101) on the line: Dye Lot (RLDYELOT), Cut / Balance C.
Deallocate -> Allocated qty 0.000; Auto alloc -> 123.038 again.
The custom "ADL Manual" button on OIS101 showed lots and dye lots per roll, but
a quantity turned red and it wasn't used; the class sticks to MMS121.
Customer names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c13')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)

imgs = {
    'line':    load_img(f'{I}/line.jpg', [b(461, 457, 592, 490), b(676, 457, 736, 490)], blur=[b(286, 199, 420, 221)], crop=b(0, 126, 1250, 665)),
    'alloc':   load_img(f'{I}/alloc.jpg', [b(620, 361, 787, 392), b(168, 394, 291, 425), b(18, 591, 1203, 628)], crop=b(0, 126, 1250, 665)),
    'split':   load_img(f'{I}/split.jpg', [b(840, 535, 944, 642)], crop=b(0, 126, 1250, 665)),
    'moved':   load_img(f'{I}/moved.jpg', [b(620, 282, 787, 313), b(18, 552, 1203, 625), b(1268, 240, 1372, 264)], crop=b(0, 126, 1568, 665)),
    'attr':    load_img(f'{I}/attr.jpg', [b(18, 364, 1236, 437)], crop=b(0, 126, 1250, 560)),
    'dealloc': load_img(f'{I}/dealloc.jpg', [b(212, 195, 287, 225), b(620, 361, 787, 392)], crop=b(0, 126, 1250, 665)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Kim · Panhandle Floors'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Hi Rachel, Kim at Panhandle Floors in Lubbock, account 6433. I need 90 yards of the Medintone, the 6.5 foot, in Feathersmooth.'],
  ['cust', 'It\'s one room, so it all has to be the same dye lot.'],
  ['csr', 'When do you need it?'],
  ['cust', 'The 19th is fine.'],
  ['csr', 'Okay, let me set it up and check the lots.'],
 ],
 'c2': [
  ['csr', 'Kim, you\'re set for the 19th, 90 yards of Feathersmooth.'],
  ['sys', '🎤 Your turn: tell her what you did about the dye lot.'],
  ['cust', 'Perfect. Thanks.'],
 ],
}

card_items = [['acct', 'Account', '006433'], ['item', 'Item', 'ARMH2004 · 90 SY'], ['lot', 'Dye lot', 'one run, same lot'], ['when', 'Needed', '11/19/26']]

slides = [
title(13, 'Dye lots:<br>pick the run.',
      'See which rolls and lots M3 picked, move a line onto the lot you want, and take stock off a line when you need to.', mins='45 MIN',
      notes="Sheet goods and anything with dye lots. M3 picks rolls on its own, and it doesn't care about matching lots. Today we look at what it picked and change it."),
compare('Last class: not enough stock', 'Class 12', 'MMS165, Confirm delivery date<br>A real ETA',
        'Today', 'Enough stock, but the <b>wrong lots</b><br><b>Allocation</b> (MMS121) shows the rolls<br>Move it to <b>one dye lot</b><br><b>Deallocate</b> / <b>Auto alloc</b>',
        notes="Bridge from Class 12."),
plan([('0:00', 'A one-run order', 'key it by the yard', '10 min'), ('0:10', 'See the rolls', 'Allocation, MMS121', '10 min'),
      ('0:20', 'Move it to one lot', 'and where the dye lot shows', '10 min'), ('0:30', 'Deallocate, steal, timing', '', '15 min')], notes="Run of show."),
call('c1', 'Panhandle Floors', 'Kim needs one dye lot', end='On hold. Key it and check the lots.'),
heard('One room, one run', [('Account', '006433', 'Panhandle Floors'), ('Item', 'ARMH2004', 'Medintone 6.5 ft Feathersmooth'), ('Qty', '90 SY', 'one line'),
      ('Dye lot', 'All the same', 'one room'), ('When', '11/19/26', 'future date'), ('PO', 'None', 'in class: TEST-your name-date')],
      notes="Two things matter: key it on one line in SY, and use a future date so it doesn't pick-release before you fix the lots. In TST, 006433 shows the real customer's name; the deck uses a made-up one.",
      kicker='What did Kim need?'),
step('Step 1 of 5', 'One line, by the yard', 'line',
     ['OIS100, <b>Req delivery dt</b> <b class="mono">11/19/26</b> (on Order Details).', 'Item <b class="mono">ARMH2004</b>, <b>Order qty</b> <b class="mono">90</b>, <b>U/M</b> <b class="mono">SY</b>, Enter.',
      'One line for the whole amount. Don\'t key a line per roll.'],
     notes="Step 1. It's stocked in linear feet but sold in square yards. Key 90 SY on one line and M3 converts it. The future date matters: once a line is pick released (44), you can't move lots.",
     card=['item', 'when']),
step('Step 2 of 5', 'Open Allocation', 'alloc',
     ['Click the line, then <b>Allocation</b> on the right (MMS121).', '90 SY = <b class="mono">123.038</b> LF, all allocated.', 'Each row is a roll: <b>Lot number</b>, <b>On-hand</b>, <b>Alloc net</b> (still free), <b>Alloc qty</b> (on this line).'],
     notes="Step 2. Walk the columns. Alloc qty is what this line took from that roll.",
     card=['lot']),
step('Step 3 of 5', 'M3 mixed the lots', 'split',
     ['Scroll the rows. In TST it used <b>four rolls</b>, four different lots.', 'For one room, that\'s a problem.', 'Fix it here, before the order releases.'],
     notes="Step 3. This is what the session warned about. M3 picks rolls by its own rules. If the customer needs one run, you have to move it.",
     card=['lot']),
step('Step 4 of 5', 'Move it onto the lot you want', 'moved',
     ['Clear <b>Alloc qty</b> on the roll you don\'t want.', 'Type the quantity on the roll you do want. Enter.', '<b>Overr alloc mtd</b> becomes <b class="mono">3-Man al, index</b>: you picked it by hand.',
      'Click a roll → <b>Attribute values</b> on the right to see <b>Dye Lot</b>.'],
     notes="Step 4. We moved 65.415 LF from S262130061 to S263830075, which is dye lot 1746. Repeat for the rest so every roll is the same lot. Attribute values shows the Dye Lot and Cut/Balance attributes on the line. Use Allocation to pick the lot; don't rely on a note, because the warehouse works from the pick list.",
     card=['lot']),
pair('Step 5 of 5', 'Take it off, put it back', 'dealloc', '<b>Deallocate</b>: Allocated qty goes to <b class="mono">0</b>. The line stays at 22. Nothing ships.',
     'attr', '<b>Attribute values</b> (ATS101): <b>Dye Lot</b> and <b>Cut / Balance</b> on the line.',
     notes="Step 5. Deallocate is how you force a backorder or free stock for another order. Auto alloc puts it back the way M3 would pick it.",
     small='<b>Auto alloc</b> gives it back to M3 to pick again.', card=None),
cards('Two more moves', 'Stealing stock, and timing', [
    ('Steal stock from another order', 'Open the other order\'s line → Allocation → <b>Deallocate</b> (or lower its Alloc qty). Then allocate that lot on the new order. When stock comes in, go back to the first order and click <b>Auto alloc</b>.'),
    ('Too late?', 'Once a line is pick released (44), MMS121 says <b>Order(line) is not released for allocation</b>. Change lots on future-dated orders, or ask the warehouse.')],
    notes="From the session. In TST, orders due today pick-release within about a minute, which is why we used the 19th."),
call('c2', 'Panhandle Floors', 'Confirm the run', kicker='Back to Kim', ring=False, end='Call ended.', empty='Pick up when every roll is the same lot.',
     notes="Back to Kim. All one dye lot, ready for the 19th."),
try_it('Your turn: one run',
       'Customer <b class="mono">006433</b>, Req delivery dt a week out, <b>60 SY</b> of a Medintone color with stock in CAR.',
       ['One line, U/M <b class="mono">SY</b>', 'Allocation: how many rolls? How many lots?', 'Move it so every roll is the same lot', '<b>Overr alloc mtd</b> says 3-Man al, index',
        'Deallocate, then Auto alloc. What changed?']),
journey('A one-run order', [('OIS101', 'One line', 'SY, future date.'), ('MMS121', 'See rolls', 'Lot, on-hand, alloc.'), ('Move', 'One lot', 'Clear, retype, Enter.'),
        ('ATS101', 'Dye Lot', 'Attribute values.'), ('Before 44', 'In time', 'Lots lock at pick release.')]),
quiz([('Where do you choose which roll/lot a line takes?', ['OIS100 header', 'Allocation (MMS121) from the line', 'OIS103', 'CRS610'], 1, 'Clear one Alloc qty, type it on the roll you want.'),
      ('What does Deallocate do?', ['Deletes the line', 'Sets Allocated qty to 0; the line waits at 22', 'Cancels the order', 'Moves it to another warehouse'], 1, 'Nothing ships until it\'s allocated again.'),
      ('A line is at 44 Pick released. Can you change the lot in MMS121?', ['Yes, anytime', 'No: "Order(line) is not released for allocation". Ask the warehouse', 'Only with Auto alloc', 'Only on Fridays'], 1,
       'Change lots before pick release.')]),
whatifs('"What if no single lot has enough?" "What if the warehouse already cut it?" "What if two customers want the same roll?" Write it down for your lead.',
        'Key two orders for the same Medintone color and move a roll from one to the other.'),
closing(13, 'One room,<br>one run.', 'Key it by the yard on one line, check the rolls in Allocation, move it to one lot before it releases.',
        ['ONE LINE', 'MMS121', 'ONE LOT', 'BEFORE 44']),
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-13.html'), number=13, title='Dye Lots, Stealing Stock, and Forcing a Backorder',
                chrome='Dye lots', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Kim · Panhandle Floors', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
