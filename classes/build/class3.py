"""Class 3 — Changing an Order After It's Entered (training site session ord-10).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000484 (customer 000300 Red River
Carpet Center): qty 2 -> 3 in OIS101, one-time jobsite in OIS102 from OIS300
(works at status 44), OT -> WC. CO 1000000482: OT -> WC through OIS100 change
mode (Generic Panel); delivery fee recalculated from 149.00 to 17.50.
Opened from OIS300 with the pencil, Delivery method is on Payment and
Conditions instead of Generic Panel.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, call_html, quiz_html, ROOT

I = os.path.join(ROOT, 'classes/img/c3')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)

imgs = {
    'changemode':   load_img(f'{I}/changemode.jpg', [b(432, 84, 460, 112), b(168, 214, 284, 244)], blur=[b(287, 186, 470, 207), b(287, 432, 470, 453), b(287, 470, 470, 491)]),
    'lineselected': load_img(f'{I}/lineselected.jpg', [b(432, 84, 460, 112), b(18, 456, 1224, 492)], blur=[b(286, 199, 470, 220)]),
    'qtychange':    load_img(f'{I}/qtychange.jpg', [b(166, 427, 292, 459), b(1128, 671, 1238, 706)], blur=[b(727, 185, 900, 206)]),
    'qtydone':      load_img(f'{I}/qtydone.jpg', [b(446, 456, 528, 492), b(544, 622, 690, 654)], blur=[b(286, 199, 470, 220)]),
    'ois300':       load_img(f'{I}/ois300.jpg', [b(18, 423, 1216, 459), b(1266, 152, 1342, 180)]),
    'chgadr':       load_img(f'{I}/chgadr.jpg', [b(172, 291, 202, 319), b(1128, 671, 1238, 706)], blur=[b(14, 226, 180, 248), b(424, 226, 600, 248), b(18, 405, 820, 620)]),
    'addrno':       load_img(f'{I}/addrno.jpg', [b(597, 365, 673, 396)], blur=[b(16, 366, 410, 546), b(178, 592, 410, 622)]),
    'jobsite':      load_img(f'{I}/jobsite.jpg', [b(15, 365, 410, 472)]),
    'yesall':       load_img(f'{I}/yesall.jpg', [b(539, 431, 704, 477)], crop=b(400, 260, 1170, 520)),
    'addrdone':     load_img(f'{I}/addrdone.jpg', [b(18, 402, 330, 548)], blur=[b(14, 226, 180, 248), b(424, 226, 600, 248)]),
    'genericwc':    load_img(f'{I}/genericwc.jpg', [b(575, 614, 713, 648), b(419, 673, 546, 705)], blur=[b(287, 186, 470, 207)]),
    'wcprompt':     load_img(f'{I}/wcprompt.jpg', [b(539, 446, 704, 492)], crop=b(400, 250, 1170, 530)),
    'charges':      load_img(f'{I}/charges.jpg', [b(18, 290, 615, 327)], crop=b(0, 126, 1250, 450), blur=[b(300, 199, 500, 221)]),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Derek · Red River Flooring'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Rachel, it\'s Derek at Red River in Enid. I called in an order this morning and I need to change it.'],
  ['csr', 'Sure, what\'s the PO on it?'],
  ['cust', 'It\'s the one with the PSA 820 on it.'],
  ['csr', 'Okay, I\'ve got it. What do you need to change?'],
  ['cust', 'Make the adhesive three instead of two.'],
  ['csr', 'Three. Got it. Anything else?'],
  ['cust', 'Yeah, don\'t send it to the store. Send it straight to the jobsite.'],
  ['csr', 'What\'s the jobsite address?'],
  ['cust', 'Martin jobsite, 2210 West Willow Road, Enid, 73703.'],
  ['csr', 'Is that the only order going there, or do you want that address saved on your account?'],
  ['cust', 'Just this one.'],
  ['csr', 'Okay. Three of the PSA 820, going to the Martin jobsite on West Willow. Give me a second.'],
 ],
 'c2': [
  ['csr', 'Derek? You\'re all set: three of the adhesive, going to the Martin jobsite.'],
  ['cust', 'Perfect. Thanks.'],
 ],
 'c3': [
  ['cust', 'Rachel, Derek again. Sorry. Scratch the jobsite, my guy\'s going to swing by and pick it up.'],
  ['csr', 'No problem. Switching it to will call. There\'s a will call fee on it instead of the delivery fee, is that okay?'],
  ['cust', 'That\'s fine.'],
  ['csr', 'Okay, it\'ll be ready at the counter in Carrollton.'],
 ],
}

card_items = [['acct', 'Account', '000300 Red River'], ['qty', 'Change 1', 'PSA 820: 2 → 3'],
              ['addr', 'Change 2', 'Jobsite: 2210 W Willow Rd'], ['wc', 'Change 3', 'Will call']]

slides = [

{'notes': "Welcome back. Today: what to do when a customer calls back to change an order that's already in. This is one of the calls CS takes most. Three changes: a quantity, a one-time jobsite address, and switching truck to will call. Laptops open, M3 open.",
 'html': '''
<div class="kicker">Adleta · Customer Service & Order Entry</div>
<h1>Changing an order<br>after it's entered.</h1>
<p class="lead">The customer calls back. More of something, a different address, or "we'll pick it up." Three changes, all on an order that's already in M3.</p>
<div class="title-meta"><span class="tmeta">45 MIN</span><span class="tmeta">FOLLOW ALONG</span><span class="tmeta">TEST ENVIRONMENT</span><span class="tmeta">CLASS 3</span></div>'''},

{'notes': "Quick bridge from last class. They already know how to key an order and find it. Today everything starts with an order that already exists. The pencil (Change) is the new button.",
 'html': '''
<div class="kicker">Last time → today</div>
<h2>Same screens, one new button</h2>
<div class="compare">
<div class="card"><h3>You already know</h3><p>Key an order in OIS100<br>Find the item, Add the line<br>Find an order in OIS300</p></div>
<div class="card"><h3>Today <span class="newbadge">NEW</span></h3><p>Open an order to <b>change</b> it: the <b>pencil</b><br>Change a <b>quantity</b><br>Ship <b>one order</b> to a jobsite<br>Switch <b>truck to will call</b></p></div>
</div>'''},

{'notes': "Run of show. Everyone keys a quick order first, on their own, so they each have an order to change. That's also a rep of Class 2.",
 'html': '''
<div class="kicker">Our 45 minutes</div>
<h2>Here's the plan</h2>
<div class="agenda">
<div class="arow"><span class="at">0:00</span><span class="am">Warm-up <span class="ad">key the order Derek is going to call about</span></span><span class="dur">5 min</span></div>
<div class="arow"><span class="at">0:05</span><span class="am">Derek calls back <span class="ad">quantity and jobsite</span></span><span class="dur">15 min</span></div>
<div class="arow"><span class="at">0:20</span><span class="am">He calls again <span class="ad">truck to will call</span></span><span class="dur">10 min</span></div>
<div class="arow"><span class="at">0:30</span><span class="am">Your turn, then questions</span><span class="dur">15 min</span></div>
</div>'''},

{'notes': "Warm-up, no step slides. This is the order Derek will call about. They've done this twice now. Give them 5 minutes and walk the room. Have them write their CO number on paper; they'll need it.",
 'cls': 'try',
 'html': '''
<div class="kicker">Warm-up · on your own</div>
<h2>Key the order first</h2>
<p class="lead" style="margin-bottom:14px">Derek at <b>Red River Flooring</b> in Enid called this morning: <b>two PSA 820</b>, on our truck.</p>
<ul class="check">
<li><span class="box">☐</span>OIS100, search <b class="mono">enid</b>, pick account <b class="mono">000300</b></li>
<li><span class="box">☐</span>PO: <b class="mono">TEST-</b>your name<b class="mono">-</b>date</li>
<li><span class="box">☐</span>Item search <b class="mono">psa 820</b>, qty <b class="mono">2</b>, Add</li>
<li><span class="box">☐</span><b>Write down your CO no.</b> You'll need it in a minute.</li>
</ul>'''},

{'notes': "Click Answer and step through the call. Ask the room: how many changes did he ask for? Two. And is the jobsite address for this order only, or forever? This order only. That matters, because it changes which screen we use.",
 'cls': 'callslide',
 'html': '''
<div class="kicker red">Incoming call</div>
<h2>Derek calls back</h2>
''' + call_html('c1', 'Red River Flooring', end='On hold. Let’s make the changes.')},

{'notes': "Two changes. A quantity, and a jobsite address for this one order. The customer's saved ship-to on the account stays the same.",
 'html': '''
<div class="kicker red">What did Derek need?</div>
<h2>Two changes on one order</h2>
<div class="heard h4">
<div class="hd"><em>Which order</em><b>Red River</b><span>your CO no from the warm-up</span></div>
<div class="hd"><em>Change 1</em><b class="mono">PSA 820 · 3</b><span>was 2</span></div>
<div class="hd"><em>Change 2</em><b>Jobsite</b><span>Martin jobsite, 2210 W Willow Rd, Enid 73703</span></div>
<div class="hd"><em>Just this order?</em><b>Yes</b><span>his saved address stays</span></div>
</div>
${CARD(['qty','addr'])}'''},

{'notes': "Step 1: open the order to change it. Ctrl+S, OIS100, but this time type the CO number in the CO no box at the top instead of a customer, then click the pencil in the toolbar. That's Change. The same screens they used to enter it come up, with the order already filled in.",
 'html': '''
<div class="kicker amber">Follow along · Step 1 of 4</div>
<h2>Open the order to change it</h2>
<div class="shotrow">
${IMG('changemode')}
<ol class="steps side">
<li><b>Ctrl+S</b>, <b class="mono">OIS100</b>, Enter.</li>
<li>Type your number in <b>CO no</b>.</li>
<li>Click the <b>pencil</b> (Change) in the toolbar.</li>
<li>Your order opens on the same screens you used to enter it.</li>
</ol>
</div>
${CARD(['acct'])}'''},

{'notes': "Step 2: the quantity. Click Next three times to get to the order lines: Generic Panel, User-Defined Fields, then the lines. Click the PSA 820 line, then the pencil again. The line opens on its own screen. Order qty alt is the quantity: type 3, click Next. There's no Save button; Next saves it. Back on the lines, the quantity says 3 and the Running Total went up.",
 'html': '''
<div class="kicker amber">Follow along · Step 2 of 4</div>
<h2>Change the quantity</h2>
<div class="pair">
<figure>${IMG('lineselected')}<figcaption><b>Next</b> to the order lines. Click the line, then the <b>pencil</b>.</figcaption></figure>
<figure>${IMG('qtychange')}<figcaption><b>Order qty alt</b>: type <b class="mono">3</b>, click <b>Next</b>. That saves it.</figcaption></figure>
</div>
<p class="small">Back on the lines: quantity <b class="mono">3</b>, Running Total updated. Then F3 out.</p>
${CARD(['qty'])}'''},

{'notes': "Step 3: the jobsite, from the order list. Ctrl+S, OIS300, type 000300 above Customer, Enter, and click your order's row. Then Addresses on the right. Point out the status: it may already say 44 PICK RELEASED; in TST it moved fast. The change still goes through. Whether the warehouse needs a heads-up once the pick list is out isn't settled yet, so for now tell your lead. On the Addresses screen, check Chg adr and click Next.",
 'html': '''
<div class="kicker amber">Follow along · Step 3 of 4</div>
<h2>One-time jobsite: find the address</h2>
<div class="pair">
<figure>${IMG('ois300')}<figcaption><b>OIS300</b>, click your order's row, then <b>Addresses</b> on the right.</figcaption></figure>
<figure>${IMG('chgadr')}<figcaption>Check <b>Chg adr</b>, click <b>Next</b>.</figcaption></figure>
</div>
<p class="small">Says <b class="mono">44 PICK RELEASED</b> already? The change still works. Let your lead know the pick list may be out.</p>
${CARD(['addr'])}'''},

{'notes': "Still step 3. Clear the Address no box (it says DELTO, the customer's saved address), press Enter, and click OK on the Confirm box. Now the name and address lines open up. Type MARTIN JOBSITE over the name and 2210 W WILLOW RD over the street. Scroll down to Postal code and type 73703. City is still Enid. Click Next.",
 'html': '''
<div class="kicker amber">Follow along · Step 3 of 4</div>
<h2>Type the jobsite</h2>
<div class="pair">
<figure>${IMG('addrno')}<figcaption>Clear <b>Address no</b>, press <b>Enter</b>, click <b>OK</b>.</figcaption></figure>
<figure>${IMG('jobsite')}<figcaption>Type the jobsite over the name and street. Postal code <b class="mono">73703</b> is further down.</figcaption></figure>
</div>
${CARD(['addr'])}'''},

{'notes': "Step 4. M3 asks: change all the lines to this address? Yes means every line on the order goes to the jobsite, which is what Derek wants. No would only change lines that had the old address. Click Yes. The Delivery Address now shows the Martin jobsite. Only this order changed. Red River's saved address on the account is the same.",
 'html': '''
<div class="kicker amber">Follow along · Step 4 of 4</div>
<h2>Yes, all lines</h2>
<div class="pair">
<figure>${IMG('yesall')}<figcaption><b>Yes</b> = every line goes to the jobsite.</figcaption></figure>
<figure>${IMG('addrdone')}<figcaption>Done. Only this order changed.</figcaption></figure>
</div>
<p class="small">Address already saved on the customer's account? In OIS100, click the search icon on <b>Address no</b> and pick it instead.</p>
${CARD(['addr'])}'''},

{'notes': "Back to Derek. Read back what changed.",
 'cls': 'callslide',
 'html': '''
<div class="kicker red">Back to Derek</div>
<h2>Read back the changes</h2>
''' + call_html('c2', 'Red River Flooring', sub='On hold', ring=False, wait='On hold', on='Back on the line', end='Call ended.', empty='Pick up when both changes are in.')},

{'notes': "Of course he calls back. This is the third change: truck to will call.",
 'cls': 'callslide',
 'html': '''
<div class="kicker red">Incoming call</div>
<h2>Derek, one more time</h2>
''' + call_html('c3', 'Red River Flooring', end='On hold. Switch it to will call.')},

{'notes': "Open the order the same way: Ctrl+S, OIS100, CO no, pencil. Click Next once to Generic Panel, the same screen where the PO was. Change Delivery method from OT to WC and click Next. Heads up: if you open the order from OIS300 with the pencil instead, the screens are different and Delivery method is on Payment and Conditions. Either way works; we'll use OIS100 so it's the same screens every time.",
 'html': '''
<div class="kicker amber">Follow along · Truck to will call</div>
<h2>Delivery method: OT → WC</h2>
<div class="shotrow">
${IMG('genericwc')}
<ol class="steps side">
<li>OIS100, <b>CO no</b>, <b>pencil</b>.</li>
<li><b>Next</b> to <b>Generic Panel</b> (where the PO is).</li>
<li><b>Delivery method</b>: type <b class="mono">WC</b>. Click <b>Next</b>.</li>
</ol>
</div>
<p class="small">Opened it from OIS300 with the pencil instead? Then Delivery method is on <b>Payment and Conditions</b>.</p>
${CARD(['wc'])}'''},

{'notes': "M3 asks whether to change every line. Yes changes all of them to WC. No only changes lines that were OT. Almost always Yes. It also warns that the delivery date can move, because the route is looked up again. Then check the charges: in TST the $149 delivery fee became a $17.50 will call fee. It changed on its own, but check it every time, and tell the customer if there's a fee.",
 'html': '''
<div class="kicker amber">Follow along · Truck to will call</div>
<h2>Yes, then check the charges</h2>
<div class="pair">
<figure>${IMG('wcprompt')}<figcaption><b>Yes</b> = every line changes to WC. The delivery date can move.</figcaption></figure>
<figure>${IMG('charges')}<figcaption>Charges after the switch: the delivery fee became the <b>will call fee</b>.</figcaption></figure>
</div>
<p class="small">Check the charges every time you switch. In TST: <b class="mono">$149.00</b> on our truck became <b class="mono">$17.50</b> on will call.</p>
${CARD(['wc'])}'''},

{'notes': "Two changes we're not doing in M3 yet: turning a regular order into a drop ship (the order type is locked once the order exists), and changing the ship-from warehouse on an order that has a transfer. For now, ask your lead before trying either one.",
 'html': '''
<div class="kicker">Not yet</div>
<h2>Ask your lead first</h2>
<div class="compare">
<div class="card"><h3>Make it a drop ship</h3><p>The order type is locked once the order exists. Not settled yet.</p></div>
<div class="card"><h3>Ship from a different warehouse</h3><p>On an order with a transfer. Not settled yet.</p></div>
</div>'''},

{'notes': "On their own, on the Class 2 order for Mesa Floor Covering (Teresa). If someone doesn't have one, have them key a quick one first. Walk the room; help only when someone's truly stuck.",
 'cls': 'try',
 'html': '''
<div class="kicker">Your turn · on your own</div>
<h2>Teresa calls back</h2>
<p class="lead" style="margin-bottom:14px">"Rachel, it's Teresa at Mesa. On my order from the other day: make the trowels <b>three</b>, not two. And I'll <b>pick it up</b>."</p>
<ul class="check">
<li><span class="box">☐</span>Find her order (OIS300, customer <b class="mono">000320</b>)</li>
<li><span class="box">☐</span>OIS100, CO no, pencil, Next to the lines</li>
<li><span class="box">☐</span>Trowel line, pencil, <b>Order qty alt</b> 3, Next</li>
<li><span class="box">☐</span>Generic Panel: Delivery method <b class="mono">WC</b>, Next, Yes</li>
<li><span class="box">☐</span>Check the charges</li>
</ul>
<p class="done">No Class 2 order? Key one for Mesa (000320) first, then change it.</p>'''},

{'notes': "Recap in one picture.",
 'html': '''
<div class="kicker">What you just did</div>
<h2>Three changes, one pattern</h2>
<div class="journey">
<div class="jstep"><div class="jc">OIS100 · pencil</div><div class="jt">Open it</div><div class="jd">CO no, then Change.</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">OIS101 · pencil</div><div class="jt">Quantity</div><div class="jd">Order qty alt, Next.</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">OIS300 · Addresses</div><div class="jt">Jobsite</div><div class="jd">Chg adr, clear Address no, type it, Yes.</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">Generic Panel</div><div class="jt">Will call</div><div class="jd">WC, Next, Yes. Check charges.</div></div>
</div>
<p class="small">No Save button anywhere. <b>Next</b> saves.</p>'''},

{'notes': "Keep it light.",
 'html': '''
<div class="kicker green">Quick check · no grades</div>
<h2 style="font-size:clamp(28px,3.4vw,44px)">Three easy ones</h2>
''' + quiz_html([
    ('You change a line quantity and click Next. What else do you need to do to save it?',
     ['Click Save in the toolbar', 'Nothing. Next saves it', 'Run OIS300', 'Ask the warehouse'], 1,
     'There is no Save button. Next saves the change right away.'),
    ('You switch an order from OT to WC and M3 asks about all lines. Yes means:',
     ['Only the first line changes', 'Every line on the order changes to WC', 'The order is cancelled', 'The customer record changes'], 1,
     'Yes changes every line. No only changes lines that were OT.'),
    ('Where do you type a one-time jobsite address for one order?',
     ['CRS610 customer record', 'OIS102 Addresses, with Chg adr checked', 'OIS103 Charges', 'Job description'], 1,
     'OIS300, click the order, Addresses, check Chg adr. The customer record stays the same.'),
])},

{'notes': "Collect the what-ifs. Likely: what if the order already shipped (missed the truck)? What if they want to add a line? (OIS100, pencil, Next to the lines, add it the same way as Class 2.) What if they want to cancel a line? Write them down.",
 'html': '''
<div class="kicker">Your turn</div>
<h2>Your "what ifs"</h2>
<div class="cols">
<div><p class="lead">"What if it already went out on the truck?" "What if they want to add a line?" "What if they cancel?" Write it down. These feed the next classes.</p></div>
<div class="card"><h3>Practice this week</h3><p>Key an order, then change it: quantity, jobsite, will call. Two or three times, on different days.</p></div>
</div>'''},

{'notes': "Thank them. Changing orders is half the job, and they just did three kinds.",
 'html': '''
<div class="kicker">Class 3 · done</div>
<h1>Orders aren't<br>set in stone.</h1>
<p class="lead">You opened an order to change it, changed a quantity, sent one order to a jobsite, and switched truck to will call.</p>
<div class="title-meta"><span class="tmeta">QUANTITY ✓</span><span class="tmeta">JOBSITE ✓</span><span class="tmeta">WILL CALL ✓</span></div>'''},
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-3.html'), number=3, title="Changing an Order After It's Entered",
                chrome='Changing an order', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Derek · Red River Flooring', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
