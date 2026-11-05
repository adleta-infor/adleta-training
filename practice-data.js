/* Practice data: spaced reps, call-style scenarios, keyboard card, option translator, class kits.
   Scenarios are written from real Customer Service call situations (CS M3 Test Pack, Nov 2026), with names and numbers removed.
   Anything marked confirm:true is still being checked by the SME in TST. */

/* Days until the next rep, by how many good reps someone has done. */
const REP_INTERVALS = [1, 3, 7, 14, 30];
const REP_LEVELS = ['New', 'Learned', 'Practiced', 'Solid', 'Automatic'];

/* Extra "a customer calls..." versions of a lesson, so reps are never the same twice.
   ask = what the customer says; good = what a good result looks like; careful = what to watch for. */
const REP_VARIANTS = {
  'ord-10': [
    { ask: 'A dealer calls: "Make the item on my open order two pallets."', good: 'The line now totals two pallets (not two more). Units, price and allocation are right; other lines did not change.', careful: 'Two pallets total is not the same as two more pallets. Read it back to the customer.', confirm: true },
    { ask: 'A dealer calls: "Add one more pallet to tomorrow\'s truck."', good: 'You checked with Logistics that the truck has room before saying yes. The order and date match what was approved.', careful: 'Do not promise tomorrow until Logistics says the truck has room.', confirm: true },
    { ask: 'A dealer calls: "Take the two end caps off the order I just placed. Keep the flooring."', good: 'Only the end caps are gone. The flooring is still there and the totals updated.', careful: 'If the order is already being picked, check with the warehouse first.', confirm: true },
    { ask: 'A dealer calls: "My order is sitting in will call but I asked for delivery."', good: 'The order now shows delivery with a real date, and the freight and charges were rechecked.', careful: 'Check who can change it after it is staged before you change anything.', confirm: true }
  ],
  'ord-14': [
    { ask: 'A dealer calls: "Repeat my last order, but make it 154.2 square feet instead of 77."', good: 'A new order with the same product at 154.2 SF. The old order did not change. You read back the new order number.', careful: 'Check the price, PO and date on the new order. Do not just copy them.', confirm: true },
    { ask: 'A dealer calls: "Put LINE on the order so my installer knows where it goes."', good: 'The side mark is saved on the order and shows on the paperwork.', careful: 'Use the side-mark field your SME shows you.', confirm: true },
    { ask: 'A caller says: "I can\'t find my account number."', good: 'You found the right account by business name and city and confirmed it with them. No new customer was created.', careful: 'Two customers can have almost the same name. Confirm the city or address.', confirm: false }
  ],
  'ord-3': [
    { ask: 'A dealer calls: "I added to my order and now it went back on credit hold."', good: 'You can see the hold, and you sent Credit the order number and what changed.', careful: 'Customer Service does not release credit holds. Credit does.', confirm: true }
  ],
  'ord-16': [
    { ask: 'A dealer calls: "What do you have in stock in that color, and what is my price?"', good: 'You gave the right item, their price, the selling unit and the stock. No order was created.', careful: 'Quote available stock, not just what is on the shelf.', confirm: true },
    { ask: 'A dealer calls: "My salesperson promised me $70 but you show $85.77."', good: 'You wrote down the price they were promised, who promised it, the unit and quantity, and sent it for approval.', careful: 'Do not change the price until it is approved.', confirm: true }
  ],
  'ord-13': [
    { ask: 'A dealer calls: "Is this item discontinued? It\'s not on my price list."', good: 'You can tell active-but-out-of-stock from discontinued, and you gave an incoming date only if one is confirmed.', careful: 'An old estimate is not a promise.', confirm: true },
    { ask: 'A dealer calls: "It\'s been a week on this backorder. Any update on when it gets here?"', good: 'You checked the current supply date, told them honestly if there is no confirmed date, and set a callback.', careful: 'Write down who will call them back and when.', confirm: true }
  ],
  'ord-12': [
    { ask: 'A dealer calls: "Hold those full rolls and the shorter piece for me."', good: 'Only those rolls are held for the customer, and you can give them a reference and how long it is held.', careful: 'Check how long holds last before promising.', confirm: true },
    { ask: 'A dealer calls: "There are ten cartons in one dye lot and one in another. When can it go to our branch?"', good: 'You checked the lots and locations, asked if they will accept two lots, and gave a real transfer date.', careful: 'Never mix dye lots without the customer saying OK.', confirm: true }
  ],
  'ord-15': [
    { ask: 'A dealer calls: "Will there be freight on this? What if it ships with a pallet?"', good: 'You explained the delivery and fuel charges, and how shipping it with a pallet changes them.', careful: 'Use the charge rules, not a guess.', confirm: true },
    { ask: 'A dealer calls: "Are you still running your truck Thursday?"', good: 'You gave their real delivery day and the order cutoff.', careful: 'A default date on the screen is not a promise.', confirm: true }
  ],
  'ord-9': [
    { ask: 'A dealer calls: "I never got my order confirmation and I don\'t have the order number."', good: 'You found the order by customer and date, checked the email address, and resent it to the right place.', careful: 'Do not change the customer\'s email on file without checking who is allowed to.', confirm: true },
    { ask: 'A dealer calls: "I need the tracking number for my shipment."', good: 'You found the shipment and gave the carrier and tracking number, or set a follow-up if it is missing.', careful: 'Shipped is not the same as delivered.', confirm: true }
  ]
};

/* Keys that mean the same thing on the green screen and in M3 (Infor M3 hot keys list). */
const KEY_CARD = [
  { key: 'Tab', green: 'Next field', m3: 'Next field or button', same: true },
  { key: 'Enter', green: 'Keep going', m3: 'Next (goes to the next panel)', same: true },
  { key: 'F3', green: 'Exit', m3: 'Close the program', same: true },
  { key: 'F4', green: 'Prompt / look up a value', m3: 'Look up a value', same: true },
  { key: 'F5', green: 'Refresh', m3: 'Refresh', same: true },
  { key: 'F12', green: 'Cancel / go back', m3: 'Back to the last panel', same: true },
  { key: 'Page Up / Page Down', green: 'Scroll', m3: 'Scroll the list', same: true },
  { key: 'Ctrl + number', green: 'Type 2, 5... next to a line', m3: 'Ctrl+2 = Change, Ctrl+5 = Display on the line you picked', same: false }
];
const KEY_NEW = [
  { key: 'Ctrl+S', m3: 'Open any program: type the code (like OIS300) and press Enter' },
  { key: 'F7 / F8', m3: 'Previous / next record' },
  { key: 'F10', m3: 'Next sort order' },
  { key: 'Ctrl+~', m3: 'Jump back to the last program you had open' },
  { key: 'Alt+R', m3: 'Open the Related menu' },
  { key: 'Ctrl+L', m3: 'Jump to the list' },
  { key: 't', m3: 'In any date field: fills in today' }
];

/* Old Dancik Order Desk option → new M3 program. DRAFT: each line needs the CS SME to confirm in TST. */
const OPT_MAP = {
  orderManagement: [
    { opt: 'Opt 1', what: 'Enter orders', m3: 'OIS100', note: 'Customer order. Open', confirm: true },
    { opt: 'Opt 8', what: 'Quick quoter', m3: 'OIS100', note: 'Use the quote order type (C04)', confirm: true },
    { opt: 'Opt 11', what: 'Open order inquiry / search', m3: 'OIS300', note: 'Find any order', confirm: true },
    { opt: 'Opt 111', what: 'Change or cancel open orders', m3: 'OIS300', note: 'Find the order, then Ctrl+2 to change it', confirm: true },
    { opt: 'Opt 12', what: 'Inventory inquiry / search', m3: 'MMS200', note: 'Stock by location: MWS068', confirm: true },
    { opt: 'Opt 104', what: 'Customer special prices', m3: 'OIS017', note: 'Price lists', confirm: true },
    { opt: 'Opt 113', what: 'Order / shipping status', m3: 'OIS300', note: 'Status shows on the order', confirm: true },
    { opt: 'Opt 119', what: 'Reprint invoices', m3: 'OIS350', note: 'Invoice lookup', confirm: true }
  ]
};
OPT_MAP.cashDesk = OPT_MAP.orderManagement;

/* Ready-made class kits SMEs teach from. Kristen builds them; SMEs deliver them. */
const CLASS_KITS = [
  { dept: ['orderManagement', 'cashDesk'], title: 'CS Class 1: Getting into M3 and entering an order', slides: 'cs-class-1.html', practice: ['ord-1', 'ord-14'], ready: true },
  { dept: ['orderManagement', 'cashDesk'], title: 'CS Class 2: Changing orders and credit holds', practice: ['ord-10', 'ord-3'], ready: false },
  { dept: ['orderManagement', 'cashDesk'], title: 'CS Class 3: Will call, pay at the counter, and lookups', practice: ['ord-4', 'ord-6', 'ord-9'], ready: false }
];
