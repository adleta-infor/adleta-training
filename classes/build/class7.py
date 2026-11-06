"""Class 7 — Freight and Delivery Questions on the Call (session ord-15).

Tested in M3 TST (CMP100) on 6 Nov 2026: CO 1000000489, customer 000300
(Carrollton, OT, N30), PO TEST-CLASS7, STAPSA820 x3. F3 from the lines opened
OIS103 with DELFEE Delivery Fee 149.00. The calendar icon beside Req delivery dt
on the Order Details panel opens the custom Delivery calendar (v0.9.0):
route CAROK - OKLAHOMA, OK, delivers Tue, next Tue Nov 10, order cutoff
3:00 PM the day before. Switching the same customer to WC gave the $17.50
fee (Class 3, CO 1000000484; reused screenshot c3/charges.jpg).
Customers that default to WC (C01 accounts 017403, 042839, 044133) show route
CARWC, delivers Mon-Fri. Switching 042839 to OT asked for a Route on the line,
so the class doesn't switch WC customers to our truck.
Customer names in screenshots are blurred; the call uses a made-up name.
"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from deck import build, load_img, ROOT
from common import *

I = os.path.join(ROOT, 'classes/img/c7')
I3 = os.path.join(ROOT, 'classes/img/c3')
Y = 37
def b(x0, y0, x1, y1): return (x0, y0 - Y, x1, y1 - Y)

imgs = {
    'charges':  load_img(f'{I}/charges.jpg', [b(18, 290, 615, 327)], blur=[b(306, 199, 470, 221)], crop=b(0, 126, 1250, 450)),
    'wcfee':    load_img(f'{I3}/charges.jpg', [b(18, 290, 615, 327)], blur=[b(300, 199, 500, 221)], crop=b(0, 126, 1250, 450)),
    'dates':    load_img(f'{I}/dates.jpg', [b(166, 551, 247, 581)], blur=[b(285, 210, 440, 272)], crop=b(0, 126, 1250, 670)),
    'calendar': load_img(f'{I}/calendar.jpg', [b(352, 192, 1203, 256), b(480, 423, 599, 453)], blur=[b(478, 148, 620, 169)], crop=b(330, 72, 1240, 705)),
}

CSR, CALLER = 'Rachel · Adleta CS', 'Amy · Red River Flooring'

calls = {
 'c1': [
  ['csr', 'Adleta, this is Rachel.'],
  ['cust', 'Hi Rachel, Amy at Red River Flooring in Enid. Derek put in an order for three PSA 820s. I just have a couple questions.'],
  ['csr', 'Sure, let me pull it up.'],
  ['cust', 'Is there freight on that?'],
  ['cust', 'And when\'s our truck? We need it this week if we can.'],
  ['cust', 'And if it\'s cheaper, could we just pick it up?'],
  ['csr', 'Let me check all three. One second.'],
 ],
 'c2': [
  ['csr', 'Amy, okay. On our truck there\'s a $149 delivery fee.'],
  ['csr', 'Your truck runs Tuesdays. Next one is Tuesday the 10th. Orders need to be in by 3 the day before.'],
  ['sys', '🎤 Your turn: tell her what pickup would cost, and that you\'ll confirm the fee with your lead.'],
  ['cust', 'Okay, leave it on the truck for Tuesday. Thanks.'],
 ],
}

card_items = [['acct', 'Account', '000300'], ['q1', 'Freight?', 'Charges: DELFEE'], ['q2', 'Truck day?', 'Delivery calendar'],
              ['q3', 'Pick up instead?', 'WC fee, ask your lead']]

slides = [
title(7, 'Freight and delivery<br>questions on the call.',
      'Three questions customers ask all the time. Answer them while they\'re still on the phone.',
      mins='20 MIN', notes="Short one today. No new order screens. Three questions customers ask almost every day: is there freight, when's my truck, and what if I pick it up. Each one has one place in M3 to look."),
compare('You\'ve been entering orders', 'Classes 1–6', 'Phone order<br>Change it, answer questions<br>Will call, pay at the counter',
        'Today', '"Is there <b>freight</b>?" → Charges<br>"When\'s my <b>truck</b>?" → Delivery calendar<br>"What if I <b>pick it up</b>?" → the WC fee',
        notes="Bridge. They already know Charges from Class 1 and 5. The new thing is the Delivery calendar."),
plan([('0:00', 'Warm-up', 'key the order Amy will call about', '3 min'), ('0:03', 'Amy\'s three questions', 'freight, truck day, pickup', '10 min'),
      ('0:13', 'Your turn and recap', '', '7 min')], mins='20', notes="Run of show."),
{'notes': "Warm-up, no step slides. They've done this many times. Have them write the CO number down. Customer 000300 is on our truck by default.",
 'html': '''
<div class="kicker">Warm-up · on your own</div>
<h2>Key the order she'll ask about</h2>
<p class="lead" style="margin-bottom:14px">Derek at <b>Red River Flooring</b> in Enid called earlier: <b>three PSA 820</b>, on our truck.</p>
<ul class="check">
<li><span class="box">☐</span>Ctrl+S, <b class="mono">OIS100</b>, customer <b class="mono">000300</b>, Enter, OK</li>
<li><span class="box">☐</span>Generic Panel: PO TEST-your name-date. Delivery method is already <b class="mono">OT</b></li>
<li><span class="box">☐</span><b class="mono">STAPSA820</b>, qty <b class="mono">3</b></li>
<li><span class="box">☐</span>Write down your CO no. Leave the order open on the lines.</li>
</ul>'''},
call('c1', 'Red River Flooring', 'Amy has three questions', end='On hold. Find the answers.'),
heard('Three questions', [('Freight?', 'Is there a fee?', 'Charges (OIS103)'), ('Truck day?', 'When does it come?', 'Delivery calendar'),
      ('Pick up?', 'Would it be cheaper?', 'the will call fee')],
      notes="Three questions, three places to look. In TST, 000300 shows the real customer's name; the deck uses a made-up one because the site is public.",
      kicker='What did Amy ask?'),
step('Question 1', '"Is there freight on that?"', 'charges',
     ['From the lines, press <b>F3</b>.', '<b>Charges</b> (OIS103) shows what M3 added.', '<b class="mono">DELFEE Delivery Fee</b>: <b class="mono">$149.00</b> on our truck.',
      'Read it to her. F3 out.'],
     notes="Question 1. F3 from the lines opens Charges, and on a delivery order M3 has already added the delivery fee. In TST it's $149. Read the amount before you hang up. Waiving it is Class 9.",
     card=['q1']),
pair('Question 2', '"When\'s our truck?"', 'dates', '<b>Order Details</b> panel: the <b>calendar icon</b> next to <b>Req delivery dt</b>.',
     'calendar', 'Her route, the days it runs, the <b>next</b> truck, and the <b>cutoff</b>.',
     notes="Question 2, the new one. Open the order (OIS100, CO no, Enter) so you're on Order Details. Scroll down to Order Dates and click the little calendar next to Req delivery dt. It's not just a date picker: it shows the customer's route. Red River is on the Oklahoma route, it runs Tuesdays, next is Tuesday the 10th, and the order has to be in by 3:00 PM the day before. That's the whole answer.",
     small='Reading it: route <b class="mono">CAROK</b> (Oklahoma), delivers <b>Tue</b>, next <b>Tue Nov 10</b>, cutoff <b>3:00 PM the day before</b>.', card=['q2']),
step('Question 3', '"What if we pick it up?"', 'wcfee',
     ['Switching to will call (Class 3) swaps the fee.', 'In TST: <b class="mono">$149.00</b> → <b class="mono">$17.50</b>. Not zero.',
      'Until the real will call fee is confirmed, <b>check with your lead</b> before you quote it.'],
     notes="Question 3. You did this switch in Class 3. In TST the delivery fee goes away and a $17.50 will call fee comes on. It isn't free. The session says check with your lead before quoting the will call amount until it's confirmed. Don't switch it unless she says to.",
     card=['q3']),
cards('Good to know', 'Two things you\'ll run into', [
    ('No charges screen?', 'Some customers aren\'t set up for an automatic fee. F3 from the lines opens a blank <b>Connect Documents</b> screen instead. Press F3 again. Nothing is missing.'),
    ('Will call customers', 'A customer who picks up shows route <b class="mono">CARWC</b> in the calendar: Monday to Friday.')],
    notes="Two quick ones. A blank Connect Documents screen just means no automatic fee for that customer. And the calendar works for will call customers too: route CARWC, any weekday."),
call('c2', 'Red River Flooring', 'Answer all three', kicker='Back to Amy', ring=False, end='Call ended. Tuesday it is.', empty='Pick up when you have all three answers.',
     notes="Back to Amy. Fee, truck day with the cutoff, and what pickup would cost (with the lead caveat)."),
try_it('Your turn: same three, another customer',
       'Open the order you made in Class 2 or 4 (or any OT order). Answer: freight? truck day? pick up?',
       ['F3 from the lines: read the <b>DELFEE</b> amount', 'OIS100 → Order Details → calendar icon: route, day, next truck, cutoff',
        'Say what pickup costs in TST, and that you\'d check with your lead', 'Don\'t change anything on the order'],
       done='Done? Find a will call order and open its calendar. What does it say?'),
journey('Three answers', [('Lines', 'F3', 'Charges: the delivery fee.'), ('Order Details', 'Calendar icon', 'Route, day, cutoff.'),
        ('Will call?', 'WC fee', '$17.50 in TST. Ask your lead.')]),
quiz([('Where do you see the delivery fee while the customer is still on the phone?', ['CRS610', 'OIS103 Charges, F3 from the lines', 'MMS002', 'The invoice'], 1,
       'F3 from the lines opens Charges. DELFEE is the delivery fee.'),
      ('A customer asks which day their truck runs. Where do you look?', ['The Delivery calendar: the calendar icon by Req delivery dt', 'OIS120', 'Your ref 1', 'The price list'], 0,
       'It shows the route, delivery days, next truck and the cutoff.'),
      ('They switch to will call. What happens to the fee in TST?', ['It goes to zero', '$149 becomes $17.50; check with your lead before quoting it', 'Nothing', 'It doubles'], 1,
       'Will call has its own fee. Confirm with your lead until it\'s settled.')]),
whatifs('"What if they miss the cutoff?" "What if they want a day the truck doesn\'t run?" "Can we waive the fee?" Write it down. Waiving fees is Class 9.',
        'Open the calendar on three different customers. Find one on a truck route and one that\'s will call.'),
closing(7, 'Three questions,<br>three places.', 'Charges for freight, the calendar for the truck day, and the will call fee if they\'d rather pick up.',
        ['FREIGHT', 'TRUCK DAY', 'PICKUP FEE']),
]

if __name__ == '__main__':
    out = build(os.path.join(ROOT, 'cs-class-7.html'), number=7, title='Freight and Delivery Questions on the Call',
                chrome='Freight and delivery questions', slides=slides, calls=calls, csr=CSR, caller=CALLER,
                card_head='Amy · Red River Flooring', card_items=card_items, imgs=imgs)
    print(out, os.path.getsize(out))
