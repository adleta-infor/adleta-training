"""Class 16 — Drop Ship Order (C02) (session ord-8).

Tested in M3 TST (CMP100) on 6 Nov 2026, customer 017499 (N30, defaults to WC).
OIS300 New order -> OIS100, CO type C02 "Drop Ship MD" -> "Confirm" alert, OK.
Panel sequence I1K5: Generic Panel, OIS102 Connect Address, User-Defined Fields,
lines. Address no DELTO (the customer's ship-to), Delivery method WC (customer
default), Customer's ord TEST-CLASS16. CO 1000000497.
OIS102 shows the customer's delivery address (Chg adr box to change it).
OIS101: Ln tp defaults to 2. MAP5UB500904 Kerapoxy CQ 1 gal Gray x2 (0 in CAR):
no MMS165 shortage screen; line 22-Reserved, Cfdldt 122526, 93.88.
Line -> PO lines (right panel) opened PPS171 Planned Purchase Order: planned
order 35, supplier S902800 Mapei, Order type B01, Origin 24 fr CO dir del,
Status 20-Pur/Plan man, plan qty 2. Not a released PO yet. PPS170 filtered on
the buyer lists it (Rel dt 120726). Nothing was released or changed.
Customer and employee names and addresses in screenshots are blurred; the call
uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c16')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)
N101 = b(286, 199, 470, 221)

imgs = {
    'c02':     load_img(f'{I}/c02.jpg', [b(178, 322, 320, 352), b(296, 356, 408, 384), b(178, 489, 294, 517)],
                        blur=[b(296, 226, 470, 247), b(296, 259, 470, 281), b(14, 640, 200, 662), b(424, 640, 600, 662)], crop=b(0, 126, 1250, 670)),
    'generic': load_img(f'{I}/generic.jpg', [b(168, 400, 372, 429), b(577, 249, 700, 278)], blur=[b(252, 404, 372, 426)], crop=b(0, 126, 1250, 705)),
    'address': load_img(f'{I}/address.jpg', [b(18, 370, 820, 620), b(176, 293, 198, 316)], blur=[b(14, 228, 200, 246), b(424, 228, 600, 246), b(24, 405, 800, 617)], crop=b(0, 126, 1250, 705)),
    'lines':   load_img(f'{I}/lines.jpg', [b(72, 547, 118, 577), b(18, 456, 1225, 491), b(566, 228, 720, 258)], blur=[N101, b(784, 456, 880, 491)], crop=b(0, 126, 1250, 665)),
    'planned': load_img(f'{I}/planned.jpg', [b(168, 182, 420, 211), b(577, 362, 840, 391), b(577, 475, 742, 504), b(168, 512, 332, 541)],
                        blur=[b(168, 437, 282, 466), b(577, 437, 692, 466)], crop=b(0, 126, 1568, 665)),
    'pps170':  load_img(f'{I}/pps170.jpg', [b(18, 359, 1003, 394)], blur=[b(24, 292, 82, 394)], crop=b(0, 126, 1250, 665)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Wes · Mesquite Creek Floors'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Wes at Mesquite Creek Floors, account 17499. I need two gallons of the Kerapoxy CQ in gray. Can Mapei just ship it to us?'],
  ['csr', 'We can drop ship it. Same address we have on file?'],
  ['cust', 'Yep, the store.'],
 ],
 'c2': [
  ['csr', 'Wes, it\'s in. Mapei will ship it straight to you.'],
  ['sys', '🎤 Your turn: give him the order number and the date on the line, and say who follows it.'],
  ['cust', 'Sounds good.'],
 ],
}

card_items = [['acct', 'Account', '017499'], ['item', 'Item', 'Kerapoxy CQ 1 gal Gray · 2'], ['ship', 'Ships to', 'the customer, from Mapei'], ['po', 'PO', 'planned, purchasing releases it']]

slides = [
title(16, 'Drop ship:<br>straight from the supplier.',
      'Enter a C02 order that ships from the supplier to the customer, check where it\'s going, and see the purchase order it starts.', mins='45 MIN',
      notes="Adleta never touches the product. The order looks almost normal, but the address matters more and a purchase order gets started behind it."),
compare('Last time: a credit order', 'Class 15', 'C05, nothing ships<br>Straight to 66',
        'Today', '<b>C02</b> Drop Ship<br>Check the <b>delivery address</b><br>Line type <b>2</b> on its own<br>A <b>planned PO</b> to the supplier',
        notes="Bridge. Another CO type, another behavior."),
plan([('0:00', 'The order', 'C02, address', '15 min'), ('0:15', 'The line, the PO', 'PO lines, PPS170', '15 min'), ('0:30', 'Your turn and recap', '', '15 min')], notes="Run of show."),
call('c1', 'Mesquite Creek Floors', 'Wes wants it shipped direct', end='On hold. Enter the drop ship.'),
heard('A drop ship', [('Account', '017499', 'Mesquite Creek'), ('Item', 'Kerapoxy CQ 1 gal', 'Gray · 2'), ('From', 'Mapei', 'the supplier'),
      ('To', 'The store', 'address on file'), ('PO', 'None', 'in class: TEST-your name-date'), ('Stock', 'Doesn\'t change', 'Adleta never has it')],
      notes="In TST, 017499 shows the real customer's name; the deck uses a made-up one because the site is public.", kicker='What did Wes need?'),
step('Step 1 of 5', 'CO type C02', 'c02',
     ['OIS300 → <b>New order</b>. Customer <b class="mono">017499</b>.', '<b>CO type</b> <b class="mono">C02</b> <b>Drop Ship MD</b>. Enter, OK on <b>Confirm</b>.',
      '<b>Address no</b> fills in from the customer.'],
     notes="Step 1. Panel sequence becomes I1K5: Generic Panel, then an address screen, then the lines.",
     card=['acct']),
step('Step 2 of 5', 'Generic Panel', 'generic',
     ['Customer\'s ord (in class <b class="mono">TEST-your name-date</b>).', '<b>Address no</b> is the customer\'s ship-to, not an Adleta warehouse.', 'Enter (Next).'],
     notes="Step 2. In TST the Delivery method came in as WC from the customer. What delivery method a drop ship should carry isn't settled; ask your lead before you change it.",
     small='Delivery method came in as WC. What a drop ship should use isn\'t settled. Ask your lead.', card=['ship']),
step('Step 3 of 5', 'Check where it\'s going', 'address',
     ['<b>OIS102</b> shows the <b>delivery address</b>. Read it to the customer.', 'Wrong or a job site? <b>Chg adr</b>, or add a ship-to in <b>OIS002</b>.', 'Enter (Next) past User-Defined Fields to the lines.'],
     notes="Step 3. This is the screen that matters most on a drop ship: the supplier ships wherever this says. Address blurred here.",
     card=['ship']),
step('Step 4 of 5', 'The line: type 2', 'lines',
     ['<b>Ln tp</b> is already <b class="mono">2</b>. Leave it.', '<b class="mono">MAP5UB500904</b> × <b class="mono">2</b>, Add. No shortage screen, even with 0 in Carrollton.',
      'Line at <b class="mono">22</b>. <b>Cfdldt</b> is the date to give him. Note the CO no.'],
     notes="Step 4. Compare with Class 12: the same item on a normal order opened MMS165. On a drop ship it doesn't, because it isn't coming from our stock.",
     card=['item']),
pair('Step 5 of 5', 'The PO behind it', 'planned', 'Click the line → <b>PO lines</b>: a <b>planned</b> PO. Supplier, <b>Origin</b> <b class="mono">24 fr CO dir del</b>, status <b class="mono">20</b>.',
     'pps170', '<b>PPS170</b>: purchasing sees it on their list and releases it. Then it\'s a real PO in <b>PPS200</b>.',
     notes="Step 5. Look, don't touch. F3 out of PPS171 without changing anything. CS doesn't release the PO; purchasing does. Buyer and planner names blurred.",
     small='Don\'t change or release it. F3 out.', card=['po']),
cards('Who follows what', 'After you hang up', [
    ('CS', 'Follows the <b>customer order</b> (OIS300).'),
    ('Purchasing', 'Releases the planned PO (PPS170), then follows the <b>PO</b> (PPS200).'),
    ('When it ships', 'The PO is received, then the customer is invoiced. Stock in Carrollton never changes.')],
    notes="From the session, plus what we saw: the line starts a planned PO, not a released one."),
call('c2', 'Mesquite Creek Floors', 'Tell him how it works', kicker='Back to Wes', ring=False, end='Call ended.', empty='Pick up when you have the CO no.',
     notes="Back to Wes. Order number, the Cfdldt date, ships from Mapei."),
try_it('Your turn: a drop ship',
       'Customer <b class="mono">017499</b>.',
       ['OIS300 → New order, CO type <b class="mono">C02</b>', 'OIS102: read the delivery address', '<b>Ln tp</b> 2: add one item, qty 2', 'Line → <b>PO lines</b>: supplier and Origin. F3 without changes',
        'Write down the CO no and the Cfdldt']),
journey('A drop ship', [('OIS100', 'C02', 'Drop Ship MD.'), ('OIS102', 'Address', 'Where the supplier ships.'), ('OIS101', 'Ln tp 2', 'No shortage screen.'),
        ('PO lines', 'Planned PO', 'fr CO dir del.'), ('Purchasing', 'Releases it', 'PPS170 → PPS200.')]),
quiz([('The drop ship CO type is:', ['C01', 'C02', 'C04', 'C05'], 1, 'C02 Drop Ship MD.'),
      ('Which screen shows where the supplier will ship it?', ['OIS102 Connect Address', 'MMS165', 'CRS610 panel J', 'OIS103'], 0, 'Check it with the customer every time.'),
      ('Right after you save the line, the PO is:', ['A released PO in PPS200', 'A planned PO that purchasing releases', 'Nothing yet', 'A credit order'], 1, 'Origin 24 fr CO dir del in PPS170.')]),
whatifs('"What if it ships to a job site?" "What if the customer cancels?" "What if the supplier is out?" Write it down for your lead.',
        'Enter a drop ship for a different item and find its planned PO.'),
closing(16, 'Straight from<br>the supplier.', 'C02, check the address in OIS102, line type 2, and purchasing releases the planned PO.',
        ['C02', 'ADDRESS', 'LN TP 2', 'PLANNED PO']),
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-16.html'), number=16, title='Drop Ship Order (C02)',
                chrome='Drop ship', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Wes · Mesquite Creek Floors', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
