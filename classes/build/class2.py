"""Class 2 — A Phone Order the Way Calls Really Go (training site session ord-14).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000482, customer 000320
A-1 Floor Covering, STAPSA820 x2 + STAXTR1 x2, side mark in Job description.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, call_html, quiz_html, ROOT

I = os.path.join(ROOT, 'classes/img/c2')
Y = 37  # screenshots were cropped 37px at the top
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)

imgs = {
    'acctresult': load_img(f'{I}/acctresult.jpg', [b(250, 256, 1318, 293)], crop=b(245, 64, 1324, 330)),
    'header':     load_img(f'{I}/header.jpg', [b(176, 222, 470, 452), b(1128, 671, 1238, 706)]),
    'po':         load_img(f'{I}/po.jpg', [b(574, 464, 809, 496), b(574, 615, 712, 647)]),
    'sidemark':   load_img(f'{I}/sidemark.jpg', [b(165, 539, 393, 573)]),
    'itemsearch': load_img(f'{I}/itemsearch.jpg', [b(206, 165, 776, 202), b(206, 256, 1362, 295)], crop=b(200, 64, 1369, 330)),
    'trowel':     load_img(f'{I}/trowel.jpg', [b(1019, 169, 1109, 199), b(206, 492, 1352, 532)], crop=b(200, 64, 1369, 650)),
    'lines2':     load_img(f'{I}/lines2.jpg', [b(166, 228, 282, 259), b(18, 456, 1224, 528)]),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Teresa · A-1 Floor Covering'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel. How can I help you?'],
  ['cust', 'Hi Rachel, it\'s Teresa over at A-1 Floor Covering. I need to put an order in.'],
  ['csr', 'Sure. What\'s your account number?'],
  ['cust', 'Oh gosh, I don\'t have it in front of me. We\'re A-1 Floor Covering, in Amarillo.'],
  ['csr', 'No problem, I can find you. Hang on… A-1 Floor Covering on Hillside?'],
  ['cust', 'That\'s us.'],
  ['csr', 'Okay. What do you need?'],
  ['cust', 'I need that PSA 820. The pressure-sensitive adhesive for LVP.'],
  ['csr', 'How many?'],
  ['cust', 'Two.'],
  ['csr', 'Two of the PSA 820. Anything else?'],
  ['cust', 'Yeah, throw in two of the Stauf number 1 trowels.'],
  ['csr', 'Two trowels. Anything else?'],
  ['cust', 'That\'s it.'],
  ['csr', 'Got a PO for me?'],
  ['cust', 'Yep, 4471.'],
  ['csr', 'And a side mark?'],
  ['cust', 'Jones remodel.'],
  ['csr', 'Is this going on the truck or are you picking it up?'],
  ['cust', 'Truck.'],
  ['csr', 'Okay, give me one second and I\'ll get you an order number.'],
  ['cust', 'Sure.'],
 ],
 'c2': [
  ['csr', 'Teresa? I\'ve got your order number. Ready?'],
  ['cust', 'Go ahead.'],
  ['sys', '🎤 Your turn: read your CO no out loud.'],
  ['cust', 'Got it. Thanks, Rachel!'],
  ['csr', 'You bet. Have a good one.'],
 ],
}

card_items = [['acct', 'Account', '000320 (look it up)'], ['item', 'Item', 'PSA 820 · 2 EA'], ['more', 'Anything else', 'Stauf #1 trowel · 2 EA'],
              ['po', 'PO', '4471'], ['sm', 'Side mark', 'JONES REMODEL'], ['dl', 'Delivery', 'Our truck']]

slides = [

{'notes': "Welcome back. Last class everyone took one easy call and keyed one order. Today is the same job, but the call sounds more like a real one: the customer doesn't know her account number, asks for items by name, adds a second item when you ask 'anything else?', and gives a side mark. And the side mark finally has a home in M3. Laptops open, M3 open, home screen up.",
 'html': '''
<div class="kicker">Adleta · Customer Service & Order Entry</div>
<h1>A phone order,<br>the way calls really go.</h1>
<p class="lead">Same job as last time. This time the customer doesn't know her account number, asks for items by name, and adds one more thing before she hangs up.</p>
<div class="title-meta"><span class="tmeta">45 MIN</span><span class="tmeta">FOLLOW ALONG</span><span class="tmeta">TEST ENVIRONMENT</span><span class="tmeta">CLASS 2</span></div>'''},

{'notes': "Quick look back so nobody feels behind. Everything on the left they already did in Class 1. The right side is what's new today. Point at the side mark row: last time we said 'just write it down.' Now we know where it goes.",
 'html': '''
<div class="kicker">Last time → today</div>
<h2>You've done most of this already</h2>
<div class="compare">
<div class="card"><h3>Class 1</h3><p>Customer gave the account number<br>Customer gave the item number<br>One item<br>Side mark: just write it down</p></div>
<div class="card"><h3>Today <span class="newbadge">NEW</span></h3><p>Find the account <b>by name</b><br>Find the item <b>by name</b><br>Ask <b>"anything else?"</b> and add a second item<br>Side mark goes in <b>Job description</b></p></div>
</div>
<p class="small">Same as last time: Ctrl+S, OIS100, Next, Next, Add. Read back the CO number.</p>'''},

{'notes': "Run of show. The call and the order are the middle of the hour. Then everyone keys a second order on their own with no slides walking them through it. That's the part that builds the habit.",
 'html': '''
<div class="kicker">Our 45 minutes</div>
<h2>Here's the plan</h2>
<div class="agenda">
<div class="arow"><span class="at">0:00</span><span class="am">What to listen for <span class="ad">the seven things on every phone order</span></span><span class="dur">5 min</span></div>
<div class="arow"><span class="at">0:05</span><span class="am">A call comes in <span class="ad">we enter it together, step by step</span></span><span class="dur">20 min</span></div>
<div class="arow"><span class="at">0:25</span><span class="am">Your turn <span class="ad">a second order, on your own</span></span><span class="dur">10 min</span></div>
<div class="arow"><span class="at">0:35</span><span class="am">Recap and your questions</span><span class="dur">10 min</span></div>
</div>'''},

{'notes': "Most phone orders come in the same order. Walk the seven boxes left to right. Suggest they keep a notepad with these seven things on it while they're getting used to M3. Nothing here is new to them; this is how they already take calls.",
 'html': '''
<div class="kicker">Listen for these</div>
<h2>Seven things on every phone order</h2>
<div class="journey">
<div class="jstep"><div class="jc">1</div><div class="jt">Account</div><div class="jd">Number, or name and city</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">2</div><div class="jt">Item</div><div class="jd">Often a name, not a number</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">3</div><div class="jt">Quantity</div><div class="jd">How many</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">4</div><div class="jt">Anything else?</div><div class="jd">Adhesive, trowels, trim</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">5</div><div class="jt">PO</div><div class="jd">Customer's ord</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">6</div><div class="jt">Side mark</div><div class="jd">Job description</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">7</div><div class="jt">Truck or will call</div><div class="jd">Delivery method</div></div>
</div>
<p class="small">Then, before you hang up: read back the CO number.</p>'''},

{'notes': "Click Answer, then click 'Next line' to bring up each line, and read it out loud, or have two volunteers read the parts. 'Show the rest' puts up the whole call at once. When it's done, ask the room: what did Teresa give us? What didn't she give us? (Her account number.)",
 'cls': 'callslide',
 'html': '''
<div class="kicker red">Incoming call</div>
<h2>Ring ring! A customer is calling.</h2>
''' + call_html('c1', 'A-1 Floor Covering', end='Call on hold. Let’s enter the order!')},

{'notes': "Let the room say it back. The account is the one thing she didn't give us, so step 1 is finding her by name. The PO she gave is 4471, but in class everyone types TEST, their first name and today's date instead, so each person can find their own order later. This card stays at the bottom of every slide.",
 'html': '''
<div class="kicker red">What did Teresa need?</div>
<h2>Everything but her account number</h2>
<div class="heard h6">
<div class="hd"><em>Account</em><b>A-1 Floor Covering</b><span>Amarillo · we'll look it up</span></div>
<div class="hd"><em>Item</em><b class="mono">PSA 820 · 2</b><span>pressure-sensitive adhesive</span></div>
<div class="hd"><em>Anything else</em><b class="mono">Trowel · 2</b><span>Stauf #1</span></div>
<div class="hd"><em>PO</em><b class="mono">4471</b><span>in class: TEST-your name-date</span></div>
<div class="hd"><em>Side mark</em><b class="mono">JONES REMODEL</b><span>new today: Job description</span></div>
<div class="hd"><em>Delivery</em><b>Our truck</b><span>OT, already the default</span></div>
</div>
${CARD([])}'''},

{'notes': "Step 1. Ctrl+S, OIS100, Enter. Teresa doesn't know her number, so click the little search icon at the end of the Customer box. The Account Search box opens. Type part of the name, a-1 floor, and the list narrows as you type. You can also search by city or phone number. Click her row. Ask: what would you search if she only said 'the flooring place in Amarillo'? (Amarillo.)",
 'html': '''
<div class="kicker amber">Follow along · Step 1 of 6</div>
<h2>Find the account by name</h2>
<div class="shotrow">
${IMG('acctresult')}
<ol class="steps side">
<li><b>Ctrl+S</b>, type <b class="mono">OIS100</b>, Enter.</li>
<li>Click the <b>search icon</b> at the end of the <b>Customer</b> box.</li>
<li>Type <b class="mono">a-1 floor</b>. Name, city or phone all work.</li>
<li>Click <b>A-1 Floor Covering</b>.</li>
</ol>
</div>
${CARD(['acct'])}'''},

{'notes': "Same as last class: M3 fills in the payer, CO type and facility, Carrollton. Click OK on the small Confirm box, then Next. The Order Details screen comes up: nothing to change there, click Next again.",
 'html': '''
<div class="kicker amber">Follow along · Step 2 of 6</div>
<h2>Same as last time: M3 fills in the rest</h2>
<div class="shotrow">
${IMG('header')}
<div class="side">
<p>Customer <b class="mono">000320</b> drops in. Payer, CO type and Facility fill in on their own.</p>
<p class="tip">Small <b>Confirm</b> box? Click <b>OK</b>.</p>
<p>Click <b class="accent">Next</b>. Order Details: nothing to change. Click <b class="accent">Next</b> again.</p>
</div>
</div>
${CARD(['acct'])}'''},

{'notes': "Step 3, the PO and delivery screen. Customer's ord is the box M3 won't let you skip. In class, type TEST, your first name, and today's date, like TEST-LINDA-1106, instead of Teresa's 4471. Then look at Delivery method: OT OUR TRUCK is already there, which is what Teresa asked for. If a customer says they'll pick it up, that's where WC goes. Click Next.",
 'html': '''
<div class="kicker amber">Follow along · Step 3 of 6</div>
<h2>PO and delivery</h2>
<div class="shotrow">
${IMG('po')}
<ol class="steps side">
<li>In <b>Customer's ord</b>, type the PO. In class: <b class="mono">TEST-</b>your name<b class="mono">-</b>date.</li>
<li>Check <b>Delivery method</b>. <b class="mono">OT</b> is our truck, <b class="mono">WC</b> is will call.</li>
<li>Teresa said truck, so leave it. Click <b class="accent">Next</b>.</li>
</ol>
</div>
${CARD(['po','dl'])}'''},

{'notes': "The new part. Last class we said to write the side mark down. Now it has a home: the User-Defined Fields screen, in the box called Job description. Type JONES REMODEL. It stays on the order when you open it again. Whether it prints on the pick list, label and invoice is still being confirmed, so if a customer needs it on paperwork, let your lead know. Click Next.",
 'html': '''
<div class="kicker amber">Follow along · Step 4 of 6 <span class="newbadge">NEW</span></div>
<h2>The side mark has a home</h2>
<div class="shotrow">
${IMG('sidemark')}
<div class="side">
<p>On <b>User-Defined Fields</b>, type the side mark in <b>Job description</b>: <b class="mono">JONES REMODEL</b>.</p>
<p>Leave the other boxes empty. Click <b class="accent">Next</b>.</p>
<p class="tip">Customer needs the side mark printed on paperwork? Tell your lead. We're still confirming where it prints.</p>
</div>
</div>
${CARD(['sm'])}'''},

{'notes': "Step 5. Teresa said 'PSA 820,' not an item number. Click the search icon at the end of the Item box. The Item search box opens. Type psa 820 and press Enter. One result: STAPSA820. Point at the CAR column: that's how many are in Carrollton, and the price is on the right. Click the row and the item number drops into the Item box. Type 2 in Order qty, click Add.",
 'html': '''
<div class="kicker amber">Follow along · Step 5 of 6</div>
<h2>Find the item by name</h2>
<div class="shotrow">
${IMG('itemsearch')}
<ol class="steps side">
<li>Click the <b>search icon</b> at the end of the <b>Item</b> box.</li>
<li>Type <b class="mono">psa 820</b>, press <b>Enter</b>.</li>
<li>Click the <b class="mono">STAPSA820</b> row.</li>
<li><b>Order qty</b> <b class="mono">2</b>, click <b class="accent">Add</b>.</li>
</ol>
</div>
<p class="small"><b>CAR</b> = how many are in Carrollton. <b>Price</b> is on the right.</p>
${CARD(['item'])}'''},

{'notes': "This is the 'anything else?' line. Teresa wants two of the Stauf number 1 trowels. Search 'trowel' and you get a long list. Click 'In stock here' to only see what Carrollton has on the shelf. Find STAXTR1, TROWEL #1, click it, type 2, click Add. Moldings, trim and other add-ons go on the same way, one line each.",
 'html': '''
<div class="kicker amber">Follow along · Step 5 of 6</div>
<h2>"Anything else?"</h2>
<div class="shotrow">
${IMG('trowel')}
<ol class="steps side">
<li>Item search again. Type <b class="mono">trowel</b>, Enter.</li>
<li>Long list? Click <b>In stock here</b>.</li>
<li>Click <b class="mono">STAXTR1</b> (TROWEL #1). <b>Order qty</b> <b class="mono">2</b>, <b class="accent">Add</b>.</li>
</ol>
</div>
<p class="small">Moldings, trim, adhesive: every add-on is one more line, the same way.</p>
${CARD(['more'])}'''},

{'notes': "Both lines are on the order and the Running Total is updated. Now find the CO no near the top. It's 10 digits. That's what we read back to Teresa.",
 'html': '''
<div class="kicker amber">Follow along · Step 6 of 6</div>
<h2>Two lines, one order number</h2>
<div class="shotrow">
${IMG('lines2')}
<div class="side">
<p>Both lines are on the order. Prices filled in from the price list.</p>
<p>Find your <b>CO no</b> near the top. It's 10 digits, like <b class="mono">1000000482</b>.</p>
<p>That's the number Teresa needs.</p>
</div>
</div>
${CARD(['item','more'])}'''},

{'notes': "Back to the caller. Click 'Pick back up' and 'Next line'. When it says 'Your turn,' pick someone to read their CO number out loud. Reminder: customers are used to a short reference like 537-2639; the M3 number is longer, and that's okay.",
 'cls': 'callslide',
 'html': '''
<div class="kicker red">Follow along · Back to Teresa</div>
<h2>Read back the order number</h2>
''' + call_html('c2', 'A-1 Floor Covering', sub='On hold', ring=False, wait='On hold', on='Back on the line', end='Call ended. Order placed! 🎉', empty='Pick up when you have your CO number.')},

{'notes': "Now they do one on their own. No step slides this time. Leave this card up and walk the room. Don't help unless someone is truly stuck; let them use their notes and the desk card. When they finish, have them read their CO number to a neighbor. If someone finishes early, have them do it again without looking at the card.",
 'cls': 'try',
 'html': '''
<div class="kicker">Your turn · on your own</div>
<h2>Teresa calls back</h2>
<p class="lead" style="margin-bottom:14px">"Rachel, it's Teresa again at A-1 in Amarillo. Separate order: <b>one PSA 820</b> and <b>one of those #1 trowels</b>. PO <b>4472</b>, side mark <b>PATEL KITCHEN</b>. I'll pick it up."</p>
<ul class="check">
<li><span class="box">☐</span>Find A-1 Floor Covering by name</li>
<li><span class="box">☐</span>PO in Customer's ord (in class: TEST-your name-date)</li>
<li><span class="box">☐</span>She's picking it up: change Delivery method to <b class="mono">WC</b></li>
<li><span class="box">☐</span>PATEL KITCHEN in Job description</li>
<li><span class="box">☐</span>Both items by name, then read back your CO no</li>
</ul>
<p class="done">Done? Do it once more without looking at this list.</p>'''},

{'notes': "Recap the whole call in one picture. Walk it left to right out loud. Ask which step felt the most different from today's system.",
 'html': '''
<div class="kicker">What you just did</div>
<h2>One call, start to finish</h2>
<div class="journey">
<div class="jstep"><div class="jc">OIS100</div><div class="jt">Find her</div><div class="jd">Search icon on Customer, type the name.</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">Next · Next</div><div class="jt">PO</div><div class="jd">Customer's ord. Check delivery method.</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">Next</div><div class="jt">Side mark</div><div class="jd">Job description.</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">OIS101</div><div class="jt">Items</div><div class="jd">Item search by name, qty, Add. Again for anything else.</div></div>
<div class="jarrow">→</div>
<div class="jstep"><div class="jc">📞 Read back</div><div class="jt">CO no</div><div class="jd">10 digits.</div></div>
</div>'''},

{'notes': "Keep it light. Read each one, let people call out answers, click to reveal.",
 'html': '''
<div class="kicker green">Quick check · no grades</div>
<h2 style="font-size:clamp(28px,3.4vw,44px)">Three easy ones</h2>
''' + quiz_html([
    ('The customer says "the PSA 820 adhesive" but has no item number. What do you do?',
     ['Ask them to call back with the number', 'Click the search icon on Item and search by name', 'Type the name in Order qty', 'Look it up in CRS610'], 1,
     'The search icon on the Item box finds items by number, name or description.'),
    ('Where does the side mark go?',
     ["Customer's ord", 'Job description on User-Defined Fields', 'The customer record in CRS610', 'Your ref 1'], 1,
     "Job description, on the User-Defined Fields screen. Customer's ord is the PO."),
    ("The customer says \"I'll pick it up.\" What do you change?",
     ['Nothing', 'Delivery method to WC', 'The warehouse', 'The CO type'], 1,
     "OT is our truck, WC is will call. It's on the same screen as the PO."),
])},

{'notes': "Open the floor and collect the 'what ifs.' Likely ones: what if they want to add to an order that's already in (that's next class), what if they want a price before ordering, what if it's out of stock. Write them down; they feed later classes. Remind them: practice this same order a few times this week in TST, with TEST, your name and the date in the PO.",
 'html': '''
<div class="kicker">Your turn</div>
<h2>Your "what ifs"</h2>
<div class="cols">
<div>
<p class="lead">"What if she calls back to add something?" "What if it's out of stock?" "What if she wants a price first?" Every one of those is a real question, and each one gets its own class.</p>
</div>
<div class="card">
<h3>Practice this week</h3>
<p>Key this same order two or three more times in TST, on different days. PO: <b>TEST-</b>your name<b>-</b>date. A little faster each time.</p>
</div>
</div>'''},

{'notes': "Thank them. They just took a call from a customer who didn't know her account number, found the items by name, and added a second item. That's a real call.",
 'html': '''
<div class="kicker">Class 2 · done</div>
<h1>That's a real<br>phone order.</h1>
<p class="lead">You found the customer by name, found the items by name, asked "anything else?", put the side mark where it goes, and read back the order number.</p>
<div class="title-meta"><span class="tmeta">ACCOUNT BY NAME ✓</span><span class="tmeta">ITEM BY NAME ✓</span><span class="tmeta">SIDE MARK ✓</span><span class="tmeta">2 ORDERS ✓</span></div>'''},
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-2.html'), number=2, title='A Phone Order the Way Calls Really Go',
                chrome='Phone order', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Teresa · A-1 Floor Covering', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
