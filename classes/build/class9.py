"""Class 9 — Order Charges: Waive, Add, and Bill Below the Line (session ord-11).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000491, customer 046776
(Carrollton, OT, N30), PO TEST-CLASS9, STAPSA820 x4. Charges (F3 from the
lines) showed DELFEE 149.00. Waived it with Change (the pencil): Charge 0,
Enter; the row stays with a blank amount. Added JOBDEL Jobsite Delivery 75.00:
box at the top of the Charge column, F4, double-click JOBDEL, + (New), Charge 75,
Enter.
The F4 list has two pages: BACKFR, CUT$, DELFEE, DRFC01, FUELSC, HNDFEE, JOBDEL,
LIFTGC, MISFRT, MTHFRT, PARCEL, then RESDEL, RESTOF, WARECH, WLLCLL. CUT$, RESTOF,
WARECH and WLLCLL weren't in the session's table; it was updated.
Right-click menu on a charge row: Select Ctrl+1, Change Ctrl+2, Delete Ctrl+4,
Display Ctrl+5. Through the browser tool Ctrl+2 only showed a "2 Change" hint, so
the class teaches the pencil and mentions Ctrl+2.
Customer names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c9')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)
NM = b(306, 199, 470, 221)

imgs = {
    'before':    load_img(f'{I}/before.jpg', [b(18, 290, 615, 326)], blur=[NM], crop=b(0, 126, 1250, 450)),
    'zero':      load_img(f'{I}/zero.jpg', [b(177, 437, 323, 469)], crop=b(0, 126, 1250, 670)),
    'waived':    load_img(f'{I}/waived.jpg', [b(18, 290, 665, 326)], blur=[NM], crop=b(0, 126, 1250, 450)),
    'codes':     load_img(f'{I}/codes.jpg', [b(436, 461, 1041, 498)], crop=b(408, 120, 1160, 657)),
    'codes2':    load_img(f'{I}/codes2.jpg', [b(436, 242, 1041, 389)], crop=b(408, 120, 1160, 657)),
    'newcharge': load_img(f'{I}/newcharge.jpg', [b(177, 437, 323, 469), b(178, 137, 506, 167)], crop=b(0, 126, 1250, 670)),
    'after':     load_img(f'{I}/after.jpg', [b(18, 290, 675, 362)], blur=[NM], crop=b(0, 126, 1250, 450)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Ray · Big Country Tile'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Rachel, Ray at Big Country Tile in Abilene. I just put in an order for four PSA 820s.'],
  ['cust', 'Mike said you\'d take the delivery fee off this one.'],
  ['csr', 'Okay, let me pull it up.'],
  ['cust', 'Oh, and it\'s actually going to a jobsite, not the store.'],
  ['csr', 'Got it. One second.'],
 ],
 'c2': [
  ['csr', 'Ray, the delivery fee is off.'],
  ['sys', '🎤 Your turn: tell him about the jobsite charge you added.'],
  ['cust', 'Yeah, that\'s fine. Thanks.'],
 ],
}

card_items = [['acct', 'Account', '046776'], ['waive', 'Waive', 'DELFEE → 0'], ['add', 'Add', 'JOBDEL $75.00'], ['who', 'Approved by', 'write it down']]

slides = [
title(9, 'Order charges:<br>waive one, add one.',
      'Take a fee off one order, and add a charge below the line.', mins='30 MIN',
      notes="Last two classes they looked at charges. Today they change them. Two moves: waive a fee on one order, and add a charge that isn't there."),
compare('Last time you read the charges', 'Class 7', 'F3 from the lines<br>Read DELFEE to the customer',
        'Today', 'Set a fee to <b>0</b> (waive it)<br>Add a charge from the <b>F4 list</b><br>Know what\'s <b>still being set up</b>',
        notes="Bridge from Class 7."),
plan([('0:00', 'Warm-up', 'key the order Ray will call about', '5 min'), ('0:05', 'Waive the delivery fee', 'Change, 0, Enter', '8 min'),
      ('0:13', 'Add a jobsite charge', 'F4, New, amount', '8 min'), ('0:21', 'Your turn and recap', '', '9 min')], mins='30', notes="Run of show."),
{'notes': "Warm-up, no step slides. Customer 046776 is on our truck. Have them write the CO number down.",
 'html': '''
<div class="kicker">Warm-up · on your own</div>
<h2>Key the order Ray will call about</h2>
<p class="lead" style="margin-bottom:14px">Ray at <b>Big Country Tile</b> in Abilene: <b>four PSA 820</b>, on our truck.</p>
<ul class="check">
<li><span class="box">☐</span>Ctrl+S, <b class="mono">OIS100</b>, customer <b class="mono">046776</b>, Enter, OK</li>
<li><span class="box">☐</span>Generic Panel: PO TEST-your name-date. Delivery method is already <b class="mono">OT</b></li>
<li><span class="box">☐</span><b class="mono">STAPSA820</b>, qty <b class="mono">4</b></li>
<li><span class="box">☐</span>F3 from the lines. Stop on <b>Charges</b>.</li>
</ul>'''},
call('c1', 'Big Country Tile', 'Ray wants the fee off', end='On hold. Find the charges.'),
heard('Two changes to the charges', [('Waive', 'Delivery fee', 'Mike said take it off'), ('Add', 'Jobsite', 'it\'s going to a job'), ('Account', '046776', 'Big Country Tile')],
      notes="Two things: take one off, put one on. Also: who approved it. Write down that Mike said so. In TST, 046776 shows the real customer's name; the deck uses a made-up one because the site is public.",
      kicker='What did Ray need?'),
step('Waive · Step 1 of 2', 'Open the fee in Change', 'before',
     ['On <b>Charges</b>, click the <b class="mono">DELFEE</b> row.', 'Click <b>Change</b> (the pencil). Right-click shows the shortcut: <b>Ctrl+2</b>.',
      'Not on Charges? OIS300, click the order, then <b>Charges</b> on the right.'],
     notes="Step 1. F3 from the lines lands here. If you're coming to an order later, OIS300 → the order row → Charges in the right panel. Click the DELFEE row and the pencil. Careful: Ctrl+4 is Delete; don't delete the row, set it to zero.",
     card=['waive']),
pair('Waive · Step 2 of 2', 'Set it to 0', 'zero', 'Scroll down to <b>Charge</b>, type <b class="mono">0</b>, Enter.',
     'waived', 'The row <b>stays</b>, with no amount. That\'s the record it was waived.',
     notes="Step 2. Type 0 over 149.00 and press Enter. Back on the list the DELFEE row is still there with a blank charge. That's the point: you can see it was waived, not missing.",
     small='Write down who said to waive it (Ray said Mike approved it) and tell your lead.', card=['waive', 'who']),
step('Add · Step 1 of 3', 'Pick the charge code', 'codes',
     ['Click the box at the top of the <b>Charge</b> column.', 'Press <b>F4</b>: the list of charge codes.', 'Double-click <b class="mono">JOBDEL</b> <b>Jobsite Delivery</b>.'],
     notes="Step 1. The little box at the top of the Charge column is a filter box. F4 in it opens the code list. Double-click JOBDEL; it fills the box.",
     card=['add']),
step('Add · Step 2 of 3', 'New, amount, Enter', 'newcharge',
     ['Click <b>+</b> (New) in the toolbar.', 'The panel says <b>Jobsite Delivery</b>.', '<b>Charge</b>: <b class="mono">75</b>. Enter.'],
     notes="Step 2. Plus opens a new charge with JOBDEL already in it. Type the amount and Enter. In class use 75. In real life, the amount comes from your lead or the price sheet.",
     card=['add']),
step('Add · Step 3 of 3', 'Both rows, right amounts', 'after',
     ['Clear the box at the top of <b>Charge</b>, Enter, to see every row.', '<b class="mono">DELFEE</b>: blank (waived).', '<b class="mono">JOBDEL</b>: <b class="mono">75.00</b>.'],
     notes="Step 3. After adding, the list may still be filtered to JOBDEL. Clear the filter box and press Enter to see both rows.",
     card=None),
{'notes': "The full list, two pages. The session's table was missing four: CUT$, RESTOF, WARECH and WLLCLL. There's a Will Call Fee code, WLLCLL, but in TST a will call order gets DELFEE at $17.50 instead. Ask your lead which one to use until that's settled.",
 'html': '''
<div class="kicker">Charge codes in M3</div>
<h2>What's on the F4 list</h2>
<div class="cols">
<div><table class="codes">
<tr><td class="mono">DELFEE</td><td>Delivery Fee</td></tr><tr><td class="mono">JOBDEL</td><td>Jobsite Delivery</td></tr><tr><td class="mono">RESDEL</td><td>Residential Delivery</td></tr>
<tr><td class="mono">LIFTGC</td><td>Lift gate Charge</td></tr><tr><td class="mono">FUELSC</td><td>Fuel Surcharge</td></tr><tr><td class="mono">HNDFEE</td><td>Handling Fee</td></tr>
<tr><td class="mono">CUT$</td><td>Cut Charge</td></tr><tr><td class="mono">RESTOF</td><td>Re-stocking Fee</td></tr>
</table></div>
<div><table class="codes">
<tr><td class="mono">WLLCLL</td><td>Will Call Fee</td></tr><tr><td class="mono">MTHFRT</td><td>Monthly Freight</td></tr><tr><td class="mono">PARCEL</td><td>Freight CC/Parcel</td></tr>
<tr><td class="mono">DRFC01</td><td>Shipment Freight</td></tr><tr><td class="mono">BACKFR</td><td>Backhaul Freight</td></tr><tr><td class="mono">MISFRT</td><td>3PL Charge (Peanuts, MISC)</td></tr>
<tr><td class="mono">WARECH</td><td>W.A.R.E Charge</td></tr>
</table></div>
</div>
<p class="small">Two pages: use the ▷ arrow at the bottom of the list for the rest.</p>'''},
cards('Still being set up', 'Not in M3 yet', [
    ('No code yet', 'Broken carton. No code exists yet.'),
    ('Being set up', 'Exempting a customer from fees for good, a negotiated charge for one customer, monthly delivery fees, billing-only orders.'),
    ('Until then', 'Waive or add it on the order, and tell your lead.')],
    notes="From the session. Don't promise a permanent exemption; it can't be done in M3 yet."),
call('c2', 'Big Country Tile', 'Tell him what changed', kicker='Back to Ray', ring=False, end='Call ended.', empty='Pick up when both charges are right.',
     notes="Back to Ray. Fee is off, jobsite charge is on."),
try_it('Your turn: waive and add',
       'On the same order, or a new one for <b class="mono">046776</b>:',
       ['Set <b class="mono">DELFEE</b> to <b class="mono">0</b> with Change (the pencil)', 'Add <b class="mono">LIFTGC</b> Lift gate Charge, <b class="mono">35</b>',
        'Clear the filter: three rows, right amounts', 'Say out loud who approved the waive and who you\'d tell']),
journey('Changing charges', [('Charges', 'Find it', 'F3 from the lines, or OIS300 → Charges.'), ('Change', 'Waive', 'Pencil, Charge 0, Enter.'),
        ('F4', 'Pick a code', 'Box at the top of Charge.'), ('New', 'Add', '+, amount, Enter.'), ('Lead', 'Tell them', 'Who approved it.')]),
quiz([('Which program shows the charges on an order?', ['OIS101', 'OIS103 (Charges)', 'MMS121', 'OIS102'], 1, 'F3 from the lines, or Charges from OIS300.'),
      ('The best way to waive a delivery fee on one order:', ['Change the charge to 0', 'Delete the row (Ctrl+4)', 'Cancel the order', 'Switch to WC'], 0,
       'The row stays with no amount, so there\'s a record it was waived.'),
      ('A customer needs a jobsite delivery charge added. Which code?', ['DELFEE', 'JOBDEL', 'MTHFRT', 'PARCEL'], 1, 'JOBDEL = Jobsite Delivery.')]),
closing(9, 'Off one,<br>on one.', 'Waive with 0 so the record stays, add from the F4 list, and tell your lead who approved it.',
        ['WAIVE', 'ADD', 'F4 CODES', 'LEAD']),
]

EXTRA = '<style>.codes{border-collapse:collapse;width:100%;font-size:clamp(14px,1.4vw,19px)}.codes td{padding:7px 12px;border-bottom:1px solid rgba(255,255,255,.08)}.codes td.mono{color:var(--accent,#f0a030);width:34%}</style>'
slides[0]['html'] = EXTRA + slides[0]['html']

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-9.html'), number=9, title='Order Charges: Waive and Add',
                chrome='Order charges', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Ray · Big Country Tile', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
