"""Class 8 — Price Questions on the Call (session ord-16).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000490, customer 044133
(Carrollton, WC), PO TEST-CLASS8. Item search (custom v0.4.0) shows a PRICE
column: Keracolor U 10 lb is 16.86 / EA in most colors, 13.25 in Eggshell.
Added MAP5UH500905 (Gray) x2: Net price 16.86, Running Total 33.72, the same
price Item search showed.
The "WARNING Sales price is 0" message was not reproduced in TST today: every
item checked (grout, stair nose, Kerapoxy, Keracolor, PSA 820) had a price,
and the sample template item gave "The item has incorrect status - (05)"
instead. The class teaches the warning from the session text, without a
screenshot.
Customer names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c8')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)

imgs = {
    'search': load_img(f'{I}/search.jpg', [b(206, 335, 1363, 372), b(1222, 376, 1284, 402)], crop=b(200, 64, 1369, 712)),
    'lines':  load_img(f'{I}/lines.jpg', [b(577, 457, 664, 490), b(545, 623, 690, 653)], blur=[b(286, 199, 520, 221)], crop=b(0, 126, 1250, 665)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Marcus · Hill Country Tile'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Hey, Marcus at Hill Country Tile, account 44133. How much is the Keracolor U, the 10 pound, in gray?'],
  ['csr', 'Let me look.'],
  ['cust', 'And my rep said I\'d get it for 14 bucks if I bought a few.'],
  ['csr', 'Okay. One second.'],
 ],
 'c2': [
  ['csr', 'Marcus, the gray is showing $16.86 each for your account.'],
  ['sys', '🎤 Your turn: tell him what you\'ll do about the $14 his rep promised.'],
  ['cust', 'Okay. Put two on for pickup and let me know about the price.'],
 ],
}

card_items = [['acct', 'Account', '044133'], ['item', 'Item', 'Keracolor U 10 lb, Gray'], ['price', 'Price', 'read the Net price'],
              ['rep', 'Rep promised', '$14: send to your lead']]

slides = [
title(8, 'Price questions<br>on the call.',
      '"How much is it?" and "my rep said I\'d get a better price." Answer the first, hand off the second.',
      mins='20 MIN', notes="Short one. Two price questions. The first you answer from the screen. The second you don't answer yourself: you write it down and hand it to your lead."),
compare('Last class: freight questions', 'Class 7', 'Is there freight? → Charges<br>When\'s my truck? → Delivery calendar',
        'Today', '"How much?" → the <b>PRICE</b> column and <b>Net price</b><br>"Sales price is 0" → <b>Cancel</b><br>"My rep promised…" → <b>your lead</b>',
        notes="Same idea as Class 7: each question has one place to look."),
call('c1', 'Hill Country Tile', 'Marcus wants a price', end='On hold. Look it up.'),
heard('Two price questions', [('How much?', 'Keracolor U 10 lb', 'gray'), ('Rep promised', '$14 each', 'if he buys a few'), ('Account', '044133', 'Hill Country Tile')],
      notes="Two questions. One is a lookup. The other is a promise someone else made. In TST, 044133 shows the real customer's name; the deck uses a made-up one because the site is public.",
      kicker='What did Marcus ask?'),
step('Question 1 · Look', '"How much is it?"', 'search',
     ['On the lines, click the search icon on <b>Item</b>.', 'Type <b class="mono">keracolor u grout 10 lb</b>, Enter.',
      'The <b>PRICE</b> column shows the price for the order\'s account.', 'Prices aren\'t always the same: <b>Eggshell</b> is <b class="mono">13.25</b>, the rest <b class="mono">16.86</b>.'],
     notes="Item search shows a PRICE column, so you can see the price before you add anything. Point out Eggshell at 13.25 while the other colors are 16.86. Don't assume one color's price is every color's price. Read the one they asked for.",
     card=['item']),
step('Question 1 · Confirm', 'Read the Net price', 'lines',
     ['Pick <b class="mono">MAP5UH500905</b> (Gray), <b>Order qty</b> <b class="mono">2</b>, Enter.', '<b>Net price</b> on the line: <b class="mono">16.86</b>. Same as the search.',
      '<b>Running Total</b>: <b class="mono">33.72</b>.', 'Just want a price, not an order? Make a quotation (Class 14).'],
     notes="Add the line and read the Net price. It fills in from the customer's price list; you don't type it. It matches what Item search showed. If they only want a price and aren't ordering, a quotation is the right tool, and that's Class 14.",
     card=['price']),
{'notes': "We couldn't make this warning show up in TST today: every item we tried had a price. It's still worth knowing. If you add an item and M3 says WARNING Sales price is 0, there's no price for this customer. Click Cancel. Don't put the line on at zero. Tell the customer you'll call back and send it to your lead.",
 'html': '''
<div class="kicker red">If you see this</div>
<h2>"WARNING Sales price is 0"</h2>
<div class="compare">
<div class="card"><h3>What it means</h3><p>The item has <b>no price</b> for this customer.</p></div>
<div class="card"><h3>What you do</h3><p>Click <b>Cancel</b>. Don't add it at zero.<br>Tell them you'll call back with a price, and send it to your lead.</p></div>
</div>'''},
{'notes': "Question 2. M3 doesn't have a price-request step yet. Don't change the price on the line, even if the customer is sure. Write down the item, quantity and the promised price, and send it to your lead. The process is still being decided.",
 'html': '''
<div class="kicker amber">Question 2</div>
<h2>"My rep said I'd get a better price"</h2>
<div class="compare">
<div class="card"><h3>Don't</h3><p>Change the price on the line yourself.</p></div>
<div class="card"><h3>Do</h3><p>Write down the <b>item</b>, <b>quantity</b> and the <b>price he was promised</b>. Send it to your lead.</p></div>
</div>
<p class="small">M3 doesn't have a price-request step yet. The process is still being decided.</p>
${CARD(['rep'])}'''},
call('c2', 'Hill Country Tile', 'Give the price, hand off the promise', kicker='Back to Marcus', ring=False, end='Call ended.', empty='Pick up when you\'re ready.',
     notes="Back to Marcus. Read the price. For the $14: \"I'll get that to my lead and call you back.\""),
try_it('Your turn: three prices',
       'Customer <b class="mono">044133</b>. Look up the price for each, without adding a line:',
       ['<b>Keracolor U 10 lb, Eggshell</b>', '<b>PSA 820</b> (<b class="mono">STAPSA820</b>)', '<b>Kerapoxy CQ 1 gallon, Gray</b>',
        'Then add one of them and check the <b>Net price</b> matches'],
       done='Done? Write down what you\'d send your lead if the customer said "my rep promised $10".'),
quiz([('Where does the price on a new line come from?', ['You type it every time', 'The customer\'s price list', 'The last invoice', 'The warehouse'], 1,
       'Net price fills in from the price list. Item search shows the same number.'),
      ('M3 warns "Sales price is 0" when you add a line. What do you do?', ['Click OK and add it at zero', 'Click Cancel and send it to your lead for a price', 'Type any price', 'Change the customer'], 1,
       'No price for this customer. Don\'t add it at zero.'),
      ('The customer says their rep promised a lower price. What do you do?', ['Change the price on the line', 'Note the details and send it to your lead', 'Cancel the order', 'Use a different customer'], 1,
       'There\'s no price-request step in M3 yet. Your lead handles it.')]),
closing(8, 'Read it,<br>don\'t change it.', 'Item search and the Net price for "how much", Cancel on a zero price, and your lead for anything a rep promised.',
        ['PRICE COLUMN', 'NET PRICE', 'CANCEL AT 0', 'LEAD']),
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-8.html'), number=8, title='Price Questions on the Call',
                chrome='Price questions', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Marcus · Hill Country Tile', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
