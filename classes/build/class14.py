"""Class 14 — Quote to Customer Order (C04) (session ord-7).

Tested in M3 TST (CMP100) on 6 Nov 2026, customer 008322 (Carrollton, OT):
OIS100 with CO type C04 Quotation -> panel sequence I5 (Generic Panel and lines
only), status 05-Quotation, no PO required. Quote number 6000000001 (6-series).
Lines STAPSA820 x10 (80.00) and STAXTR1 x6 (35.22), status 05. F3 out opened
QPS115 Sales Quotation: Status 20-Definite quotation, Valid to 12/06/26.
OIS300: click the quote row -> Convert to CO (right panel) -> OIS100 opens with
"Information from order 6000000001 will be used" -> change CO type to C01 ->
"Valid quotations exist for this client - press Enter to continue" -> Enter ->
OK -> through the panels, PO TEST-CLASS14 -> new CO 1000000496, both lines,
22-Reserved. Quotation info on the quote then shows 60-CO created from
quotation; the quote still lists at 05 in OIS300.
Customer names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c14')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)
NA = [b(296, 226, 530, 281), b(14, 640, 700, 662)]
NB = b(286, 199, 530, 221)
NC = b(296, 215, 530, 240)

imgs = {
    'c04':        load_img(f'{I}/c04.jpg', [b(178, 323, 296, 352)], blur=NA, crop=b(0, 126, 1250, 670)),
    'generic':    load_img(f'{I}/generic.jpg', [b(168, 248, 398, 311), b(577, 214, 702, 244), b(356, 672, 737, 705)], blur=[b(286, 186, 530, 207)], crop=b(0, 126, 1250, 710)),
    'lines':      load_img(f'{I}/lines.jpg', [b(168, 228, 280, 258), b(718, 457, 758, 528)], blur=[NB], crop=b(0, 126, 1250, 665)),
    'quoteinfo':  load_img(f'{I}/quoteinfo.jpg', [b(177, 399, 409, 429), b(177, 436, 259, 466)], blur=[NC], crop=b(0, 126, 1250, 670)),
    'ois300':     load_img(f'{I}/ois300.jpg', [b(18, 423, 1215, 459), b(1266, 409, 1364, 437)], crop=b(0, 126, 1568, 665)),
    'convert':    load_img(f'{I}/convert.jpg', [b(603, 295, 965, 479)], blur=NA, crop=b(0, 126, 1250, 670)),
    'valid':      load_img(f'{I}/valid.jpg', [b(539, 309, 1029, 469)], blur=NA, crop=b(0, 126, 1250, 670)),
    'colines':    load_img(f'{I}/colines.jpg', [b(168, 228, 280, 258), b(566, 228, 736, 258), b(18, 457, 1225, 528)], blur=[NB], crop=b(0, 126, 1250, 665)),
    'status60':   load_img(f'{I}/status60.jpg', [b(177, 399, 409, 429)], blur=[NC], crop=b(0, 126, 1250, 670)),
    'ois300after':load_img(f'{I}/ois300after.jpg', [b(18, 423, 1215, 495)], crop=b(0, 126, 1250, 665)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Marco · Brazos Commercial Floors'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Marco at Brazos Commercial in Waco, account 8322. I\'m bidding a job. Can you quote me ten PSA 820s and six of the number 1 trowels?'],
  ['csr', 'Sure. Just a quote for now?'],
  ['cust', 'Yeah. If we get the job I\'ll call back.'],
 ],
 'c2': [
  ['cust', 'Rachel, it\'s Marco. We got the job. Go ahead with that quote.'],
  ['csr', 'Great. One second, I\'ll turn it into an order.'],
  ['sys', '🎤 Your turn: read him the new CO number, not the quote number.'],
  ['cust', 'Perfect.'],
 ],
}

card_items = [['acct', 'Account', '008322'], ['items', 'Items', 'PSA 820 · 10, Trowel #1 · 6'], ['quote', 'Quote no', '6000000001 (6-series)'], ['co', 'Order no', 'new 10-series CO']]

slides = [
title(14, 'Quote now,<br>order later.',
      'Enter a quotation (C04), give the customer the quote number, and turn it into a real order when they say go.', mins='45 MIN',
      notes="A customer wants a price for a job they're bidding. We enter it as a quotation. When they win the job, we convert it instead of keying it again."),
compare('Last time you read a price', 'Class 8', 'Item search and the Net price<br>One item, on the phone',
        'Today', 'A <b>quote</b> (C04) for several items<br>A <b>quote number</b> to give out<br><b>Convert to CO</b> when they say yes',
        notes="Bridge from Class 8. Class 8 said: just want a price, not an order? Make a quotation. That's today."),
plan([('0:00', 'Enter the quote', 'CO type C04', '15 min'), ('0:15', 'They said yes', 'Convert to CO', '15 min'), ('0:30', 'Your turn and recap', '', '15 min')], notes="Run of show."),
call('c1', 'Brazos Commercial Floors', 'Marco wants a quote', end='On hold. Enter the quote.'),
heard('A quote for a bid', [('Account', '008322', 'Brazos Commercial'), ('Items', 'PSA 820 · 10', 'and Trowel #1 · 6'), ('Type', 'Quote', 'not an order yet'), ('Later', 'Convert', 'if he wins the job')],
      notes="In TST, 008322 shows the real customer's name; the deck uses a made-up one because the site is public.", kicker='What did Marco need?'),
step('Quote · Step 1 of 4', 'CO type C04', 'c04',
     ['OIS100, <b>Customer</b> <b class="mono">008322</b>.', '<b>CO type</b>: <b class="mono">C04</b> <b>Quotation</b>. Enter, OK.'],
     notes="Step 1. Same start as an order. Change CO type to C04 before you press Enter.",
     card=['acct']),
step('Quote · Step 2 of 4', 'Fewer screens', 'generic',
     ['Status <b class="mono">05-Quotation</b>.', 'Only <b>Generic Panel</b> and the lines. No PO needed.', 'Enter (Next) to the lines.'],
     notes="Step 2. The panel bar at the bottom shows only Select, Generic Panel and lines. Status 05 means quote.",
     card=None),
step('Quote · Step 3 of 4', 'Lines, and the quote number', 'lines',
     ['<b class="mono">STAPSA820</b> × 10, <b class="mono">STAXTR1</b> × 6.', 'The <b>CO no</b> is the quote number: <b class="mono">6000000001</b>. Quotes are a <b>6-series</b>.', 'Lines sit at <b class="mono">05</b>. Nothing is reserved.'],
     notes="Step 3. Read the quote number to the customer. Quote numbers start with 6; orders start with 1. The lines are at 05, so no stock is set aside.",
     card=['items', 'quote']),
step('Quote · Step 4 of 4', 'Quotation info', 'quoteinfo',
     ['F3 out: <b>Sales Quotation</b> (QPS115) opens.', 'Status <b class="mono">20-Definite quotation</b>.', '<b>Valid to</b>: 30 days out (<b class="mono">12/06/26</b>). Enter.'],
     notes="Step 4. This screen comes up when you leave a quote. Valid to is when the quote expires. Enter to save. No charges screen for a quote.",
     card=['quote']),
call('c2', 'Brazos Commercial Floors', 'He won the job', kicker='A week later', end='On hold. Convert the quote.', notes="Marco calls back. Now we convert."),
step('Convert · Step 1 of 3', 'Find it, Convert to CO', 'ois300',
     ['<b>OIS300</b>, Customer filter <b class="mono">008322</b>.', 'The quote: <b class="mono">05</b>, <b>Otp</b> <b class="mono">C04</b>.', 'Click the row, then <b>Convert to CO</b> on the right.'],
     notes="Step 1. In OIS300, quotes show status 05 and order type C04. Convert to CO is in the right panel.",
     card=['quote']),
pair('Convert · Step 2 of 3', 'Change it to C01', 'convert', '"Information from order 6000000001 will be used". Enter. Then change <b>CO type</b> to <b class="mono">C01</b>.',
     'valid', '"Valid quotations exist for this client". <b>Enter</b> to continue, OK again.',
     notes="Step 2. OIS100 opens with the quote's details and CO type still C04. Change it to C01 and press Enter. M3 warns that there are valid quotes; Enter continues. Then OK on the 'information will be used' message and go through the panels like a normal order: PO on Generic Panel.",
     small='Then the usual panels: PO on Generic Panel (in class TEST-your name-date).', card=None),
step('Convert · Step 3 of 3', 'A real order, lines included', 'colines',
     ['New <b>CO no</b>: <b class="mono">1000000496</b>, CO type <b class="mono">C01</b>.', 'Both lines came over: item, qty, price.', 'Status <b class="mono">22-Reserved</b>. Read him the <b>new</b> number.'],
     notes="Step 3. Check every line carried over. Give the customer the new 10-series order number, not the quote number.",
     card=['co']),
pair('After', 'The quote is marked', 'status60', 'Quotation info on the quote: <b class="mono">60-CO created from quotation</b>.',
     'ois300after', 'OIS300 still lists the quote at <b class="mono">05</b> next to the new order.',
     notes="M3 marks the quote as converted (status 60 in Quotation info), but it still shows at 05 in OIS300. Whether to delete it after converting hasn't been decided; ask your lead.",
     small='Delete the old quote after converting? Not decided yet. Ask your lead.', card=None),
try_it('Your turn: quote, then convert',
       'Customer <b class="mono">008322</b>.',
       ['OIS100, CO type <b class="mono">C04</b>: two items', 'Write down the quote number (6-series)', 'F3: Valid to date on Quotation info',
        'OIS300 → Convert to CO → CO type <b class="mono">C01</b>', 'Check the lines came over. Write down the new CO no']),
journey('Quote to order', [('OIS100', 'C04', 'Quotation, status 05.'), ('Lines', 'Quote no', '6-series.'), ('QPS115', 'Valid to', '30 days.'),
        ('OIS300', 'Convert to CO', 'CO type C01.'), ('New CO', '1-series', 'Read the new number.')]),
quiz([('Which CO type makes a quotation?', ['C01', 'C02', 'C04', 'C05'], 2, 'C04 Quotation. C01 is a normal order.'),
      ('Where do you turn a quote into an order?', ['OIS101 Add', 'OIS300 → Convert to CO', 'CRS610', 'OIS103'], 1, 'Then change CO type to C01 and go through the panels.'),
      ('Which number do you give the customer after converting?', ['The 6-series quote number', 'The new 1-series CO number', 'Both', 'The PO'], 1, 'The order is the new CO.')]),
whatifs('"What if they want to change a quantity before converting?" "What if the quote expired?" "What if they only want half the items?" Write it down for your lead.',
        'Make two quotes and convert one.'),
closing(14, 'Quote now,<br>order later.', 'C04 for the quote, give out the 6-series number, Convert to CO with C01 when they say yes.',
        ['C04', 'QUOTE NO', 'CONVERT', 'C01']),
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-14.html'), number=14, title='Quote to Customer Order',
                chrome='Quote to order', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Marco · Brazos Commercial Floors', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
