"""Class 5 — Will Call Order: Customer Pickup (session ord-4).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000486, customer 000417
(Carrollton, N30, defaults to OT), Req delivery dt 11/09/26 on the first
screen -> Cfdldt 110926 on the lines; WC on Generic Panel; STAXTR1 x4 +
STAPSA820 x1; Charges show the will call fee DELFEE 17.50.
Customer 000362 belongs to Little Rock (LIT): Item search highlights LIT and
shows 0 trowels there, 41-45 in CAR. Pulling a will call from a different
warehouse wasn't settled, so the class says ask your lead.
Customer names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c5')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)
NB = b(*NAME_BLUR)

imgs = {
    'header':    load_img(f'{I}/header.jpg', [b(176, 388, 290, 418), b(176, 421, 330, 451)], blur=[b(296, 226, 490, 281), b(14, 638, 700, 662)]),
    'generic':   load_img(f'{I}/generic.jpg', [b(166, 427, 306, 458), b(574, 464, 809, 496), b(574, 615, 712, 647)], blur=[NB]),
    'itemsearch':load_img(f'{I}/itemsearch.jpg', [b(783, 230, 884, 256), b(206, 606, 1352, 646)], crop=b(200, 64, 1369, 712)),
    'litempty':  load_img(f'{I}/litempty.jpg', [b(1085, 230, 1187, 650)], crop=b(200, 64, 1369, 712)),
    'lines':     load_img(f'{I}/lines.jpg', [b(166, 228, 282, 259), b(632, 400, 720, 528)], blur=[b(286, 199, 490, 220)]),
    'charges':   load_img(f'{I}/charges.jpg', [b(18, 290, 615, 327)], blur=[b(308, 199, 520, 221)], crop=b(0, 126, 1250, 450)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Luis · Brazos Tile & Floor'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Hey Rachel, Luis at Brazos Tile, account 417. I need to set up a pickup.'],
  ['csr', 'Sure. When are you coming?'],
  ['cust', 'Monday morning. Carrollton.'],
  ['csr', 'Monday the 9th, Carrollton. What do you need?'],
  ['cust', 'Four of the Stauf number 1 trowels and one PSA 820.'],
  ['csr', 'Four trowels, one PSA 820. Anything else?'],
  ['cust', 'That\'s it.'],
  ['csr', 'PO?'],
  ['cust', 'Use 1109.'],
  ['csr', 'And a side mark?'],
  ['cust', 'Ortiz kitchen.'],
  ['csr', 'Let me make sure it\'s all there for Monday. One second.'],
 ],
 'c2': [
  ['csr', 'Luis, you\'re all set for Monday. Here\'s your order number.'],
  ['sys', '🎤 Your turn: read your CO no out loud.'],
  ['csr', 'There\'s a will call fee of $17.50 on it. Just so you know.'],
  ['cust', 'That\'s fine. See you Monday.'],
 ],
}

card_items = [['acct', 'Account', '000417'], ['when', 'Pickup', 'Mon 11/09/26, Carrollton'], ['item', 'Items', 'Trowel #1 · 4, PSA 820 · 1'],
              ['po', 'PO', '1109'], ['sm', 'Side mark', 'ORTIZ KITCHEN']]

slides = [
title(5, 'Will call:<br>the customer picks it up.',
      'Set it up as will call from the start, put in the pickup day, and make sure the stock is in the warehouse they\'re coming to.',
      notes="Welcome back. In Class 3 they switched an existing order to will call. Today the customer calls to set up a pickup, so we enter it as will call from the start. Three new things: the pickup day, checking stock in the pickup warehouse before you promise, and the will call fee."),
compare('You already switched one to will call', 'Class 3', 'Order already in<br>Switch OT to WC<br>Check the charges',
        'Today', 'Enter it as <b>WC</b> from the start<br>Put in the <b>pickup day</b><br>Check stock in the <b>pickup warehouse</b><br>Tell them about the <b>will call fee</b>',
        notes="Bridge from Class 3."),
plan([('0:00', 'A pickup call', 'set it up together, step by step', '20 min'), ('0:20', 'When the warehouse is empty', 'what not to promise', '5 min'),
      ('0:25', 'Your turn', 'a pickup on your own', '10 min'), ('0:35', 'Recap and questions', '', '10 min')],
     notes="Run of show."),
call('c1', 'Brazos Tile & Floor', 'Luis wants to pick up Monday', end='On hold. Set up the pickup.'),
heard('A pickup for Monday', [('Account', '000417', 'Brazos Tile & Floor'), ('Pickup', 'Mon 11/09/26', 'Carrollton'),
      ('Items', 'Trowel #1 · 4', 'and PSA 820 · 1'), ('PO', '1109', 'in class: TEST-your name-date'), ('Side mark', 'ORTIZ KITCHEN', 'Job description'), ('Delivery', 'Will call', 'WC')],
      notes="Two new things in what he said: when (Monday) and where (Carrollton). Both go on the order. In TST, account 000417 shows the real customer's name; the deck uses a made-up one because the site is public.",
      kicker='What did Luis need?'),
step('Follow along · Step 1 of 5', 'Start it with the pickup day', 'header',
     ['<b>Ctrl+S</b>, <b class="mono">OIS100</b>, Enter.', '<b>Customer</b>: <b class="mono">000417</b>.',
      '<b>Req delivery dt</b>: the pickup day, <b class="mono">11/09/26</b>.', 'Enter. <b>OK</b> on Confirm. Facility says <b>CARROLLTON</b>.'],
     notes="Step 1. Same start as always, with one more box: Req delivery dt is the day he's picking up. Type 11/09/26 before pressing Enter. Point at Facility: Carrollton. That's where he's picking up, so we're good. Then Enter (Next) twice to Generic Panel.",
     small='Then Enter (Next) twice to <b>Generic Panel</b>.', card=['acct', 'when']),
step('Follow along · Step 2 of 5', 'PO, will call, right warehouse', 'generic',
     ['<b>Warehouse</b>: <b class="mono">CAR</b>, the warehouse he\'s coming to.', '<b>Customer\'s ord</b>: the PO. In class: <b class="mono">TEST-</b>your name<b class="mono">-</b>date.',
      '<b>Delivery method</b>: type <b class="mono">WC</b>.', 'Enter (Next). Side mark in <b>Job description</b>, Enter (Next).'],
     notes="Step 2. Check Warehouse says CAR, the warehouse he's picking up from. Type the PO, change Delivery method to WC. The description next to it still says OUR TRUCK until you move on; that's fine. Enter (Next) to User-Defined Fields, side mark ORTIZ KITCHEN in Job description, Enter (Next) to the lines.",
     card=['po', 'sm']),
step('Follow along · Step 3 of 5', 'Check the pickup warehouse first', 'itemsearch',
     ['Search icon on <b>Item</b>, type <b class="mono">trowel</b>, Enter.', 'The shaded column is <b>your order\'s warehouse</b>: <b class="mono">CAR</b>.',
      '<b class="mono">STAXTR1</b>: 41 in Carrollton. Good.', 'Pick it, <b>Order qty</b> <b class="mono">4</b>, Add. Then <b class="mono">STAPSA820</b>, 1, Add.'],
     notes="Step 3, the new habit. He's driving over expecting it to be there, so check before you add the line. In Item search the shaded column is the order's warehouse. CAR has 41 of the #1 trowels. Add 4, then the PSA 820, 1.",
     card=['item']),
{'notes': "This is the one to remember. Same search on a Little Rock customer's order: the shaded column is LIT, and there are zero trowels in Little Rock. Don't promise it. Tell the customer what's there and where. Pulling a will call from a different warehouse isn't settled yet, so ask your lead before you try it.",
 'html': '''
<div class="kicker red">Watch out</div>
<h2>Empty in their warehouse? Don't promise it.</h2>
<div class="shotrow">
${IMG('litempty')}
<div class="side">
<p>A Little Rock customer's order: the shaded column is <b class="mono">LIT</b>. <b>Zero</b> trowels there.</p>
<p>Tell the customer what's there and when. Don't add it and hope.</p>
<p class="tip">Pick up from a different warehouse? Not settled yet. Ask your lead.</p>
</div>
</div>'''},
step('Follow along · Step 4 of 5', 'The pickup day is on the lines', 'lines',
     ['Both lines are on.', '<b>Cfdldt</b> says <b class="mono">110926</b>: Monday, the pickup day.', 'Find your <b>CO no</b> near the top.'],
     notes="Step 4. Cfdldt is the confirmed date, and it's the pickup day we typed: 110926 means 11/09/26. Find the CO number.",
     card=['item', 'when']),
step('Follow along · Step 5 of 5', 'The will call fee', 'charges',
     ['F3 out of the lines: the <b>Charges</b> screen.', 'Will call orders get a <b class="mono">$17.50</b> fee in TST.', 'Tell the customer. F3 out.'],
     notes="Step 5. F3 from the lines opens Charges. On a will call order it's the $17.50 will call fee instead of the delivery fee. Tell the customer before you hang up. Waiving it is its own class.",
     card=None),
cards('Before he gets there', 'Two more things', [
    ('Tell the warehouse', 'Let them know a will call is coming so they release it and pull it. Once it\'s released, OIS300 shows <b class="mono">44 PICK RELEASED</b>.'),
    ('Paying at the counter?', 'That\'s the cash desk, and it\'s next class.')],
    notes="The session says to let the warehouse know a will call is coming so they release it in MWS410 and pull it. OIS300 shows 44 once it's released. If the customer is paying when they pick up, that's the cash desk, which is the next class."),
call('c2', 'Brazos Tile & Floor', 'Read it back, mention the fee', kicker='Back to Luis', ring=False, end='Call ended. See you Monday.', empty='Pick up when you have your CO number.',
     notes="Back to Luis. Read the CO number, and mention the will call fee."),
try_it('Mesa Floor Covering wants a pickup',
       '"It\'s Teresa at Mesa, account 320. I\'ll pick up <b>Wednesday</b> in Carrollton: <b>two PSA 820</b>. PO <b>1111</b>, side mark <b>HALL BATH</b>."',
       ['OIS100, customer <b class="mono">000320</b>, <b>Req delivery dt</b> <b class="mono">11/11/26</b>', 'Generic Panel: PO (in class: TEST-your name-date), Delivery method <b class="mono">WC</b>, Warehouse CAR',
        'Side mark in Job description', 'Item search: check the <b>CAR</b> column before you add it', 'Cfdldt shows the pickup day; read back your CO no and the will call fee']),
journey('A pickup, start to finish', [('OIS100', 'Pickup day', 'Req delivery dt before Enter.'), ('Generic Panel', 'WC', 'PO, Delivery method WC, check Warehouse.'),
        ('Item search', 'Check stock', 'The shaded column is the pickup warehouse.'), ('Lines', 'Confirm', 'Cfdldt = pickup day.'), ('Charges', 'Fee', 'Tell them about the will call fee.')]),
quiz([('Which delivery method marks an order as will call?', ['OT', 'WC', 'CC', 'C10'], 1, 'WC = will call. OT = our truck.'),
      ('Before promising a will call, you should:', ['Release it in MWS410', 'Check stock in the pickup warehouse in Item search', 'Change the payment terms', 'Create a PO'], 1,
       'The shaded column in Item search is the order\'s warehouse. Check it before you add the line.'),
      ('Where do you put the day the customer is picking up?', ['Customer\'s ord', 'Req delivery dt on the first screen', 'Job description', 'Your ref 1'], 1,
       'Req delivery dt, before you press Enter. It shows on the lines as Cfdldt.')]),
whatifs('"What if they want it from Little Rock?" "What if they\'re paying when they pick up?" "What if they don\'t show?" Write it down. Paying at the counter is next class.',
        'Set up two or three pickups in TST on different days: different pickup days, check the warehouse column each time.'),
closing(5, 'Pickups,<br>set up right.', 'Will call from the start, the pickup day on the order, stock checked in the right warehouse, and the fee mentioned.',
        ['WC', 'PICKUP DAY', 'STOCK CHECKED', 'FEE']),
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-5.html'), number=5, title='Will Call Order: Customer Pickup',
                chrome='Will call pickup', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Luis · Brazos Tile & Floor', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
