/* Scenario drafts: one practice exercise per untested scenario in Adleta_M3_Scenario_List_Simple.xlsx (11/16/26).
   DRAFTS. Nothing here has been checked in M3 TST yet. Admins and each department's SME (lead or backup) can see them; trainees can't.
   talk:true = talk-through only (the system isn't connected in TST). */
const SCENARIO_DRAFTS = [
 {
  "id": "ORD-001",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Quote to Order",
  "program": "OIS300",
  "title": "Create a quotation for a builder or contractor",
  "lookFor": "Walk through a real quote you built last month. What did the customer give you, what did you have to look up, and how long did it take?",
  "today": null,
  "found": "C04 Quotation order type exists in TST (call test S04). Quote flow not tested yet.",
  "gap": null,
  "talk": false,
  "ask": "A builder calls: \"Can you price out 1,200 SF of the gray LVP and the transitions for my next job? I'm not ready to order yet.\"",
  "steps": [
   "Ctrl+S, type OIS100, Enter.",
   "Enter the customer and pick the quote order type (C04).",
   "Add the flooring line and the transition lines in OIS101.",
   "Note the job name in the reference field and save. Read back the quote number."
  ],
  "good": "A C04 quote with every line, the customer's price, and the job name. No stock is allocated and nothing goes to the warehouse.",
  "careful": "Use the quote order type, not a regular order type, or the warehouse may start picking it."
 },
 {
  "id": "ORD-002",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Quote to Order",
  "program": "OIS300",
  "title": "Send the quote document to the customer",
  "lookFor": "How does the quote physically get to the customer today - print, email, PDF, portal? Who sends it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The builder calls back: \"Can you email me that quote so I can show my client?\"",
  "steps": [
   "Ctrl+S, OIS300, find the quote by customer.",
   "Right-click the quote and print or resend the quote document.",
   "Check where the document is going before you send it."
  ],
  "good": "The customer gets the quote document with the right lines and prices, sent to the right email.",
  "careful": "Quote output may not be set up in TST yet (see gap G-005). If nothing comes out, report it, don't keep resending."
 },
 {
  "id": "ORD-003",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Quote to Order",
  "program": "OIS300",
  "title": "Convert a quotation into a live order",
  "lookFor": "When the customer says yes, what do you re-key vs. carry over? What gets lost in that step today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The builder calls: \"My client approved the quote. Go ahead and order it, delivery next Thursday.\"",
  "steps": [
   "Ctrl+S, OIS300, find the quote.",
   "Use the option that turns the quote into a customer order.",
   "Set the requested delivery date and the customer PO.",
   "Read back the new order number."
  ],
  "good": "A live order with the same lines and prices as the quote, the right date and PO. The quote shows as converted.",
  "careful": "Re-check stock and price before you confirm. The quote may be weeks old."
 },
 {
  "id": "ORD-004",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Quote to Order",
  "program": "OIS300",
  "title": "Follow up / expire an aging quote",
  "lookFor": "How do you know a quote is still open? Is there a report, a tickler, or is it memory?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Your lead asks: \"Which quotes are more than 30 days old and still open?\"",
  "steps": [
   "Ctrl+S, OIS300.",
   "Filter to the quote order type and sort by order date.",
   "Pick one old quote and note the follow-up, or close it out."
  ],
  "good": "You can list aging quotes and you know how a quote is followed up or closed.",
  "careful": "Ask your SME whether old quotes expire on their own or someone has to close them."
 },
 {
  "id": "ORD-007",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Enter an order for cut goods (roll cut to length)",
  "lookFor": "How do you specify the cut length, and what happens to the remnant? Who decides which roll gets cut?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"I need 18 feet off the 12-foot-wide carpet roll for a bedroom.\"",
  "steps": [
   "Ctrl+S, OIS100, enter the customer.",
   "Add the roll item in OIS101 in the unit you sell it in (LF or SY).",
   "Check the quantity converted correctly and a roll with enough length is available."
  ],
  "good": "One cut-goods line for the right length, in the right unit, with the right price.",
  "careful": "Mixing up linear feet and square yards is the most common mistake. Read the unit back to the customer."
 },
 {
  "id": "ORD-008",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Order in SF when the item stocks in cartons",
  "lookFor": "Customer asks for 850 SF. What do you type, what does the system do to it, and how do you handle the round-up to full cartons?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"I need 850 square feet of the oak plank.\"",
  "steps": [
   "Ctrl+S, OIS100, enter the customer.",
   "Add the item in OIS101 and enter 850 in SF.",
   "Watch what M3 does to the quantity, and see how many full cartons it comes to."
  ],
  "good": "The line rounds up to full cartons and the customer knows the real SF they are getting.",
  "careful": "Tell the customer the rounded-up quantity and price. Don't sell a partial carton unless that is allowed."
 },
 {
  "id": "ORD-009",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "MMS025",
  "title": "Order using the customer's own item number",
  "lookFor": "Which customers order by their part number? Where does the cross-reference live today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls with their own part number: \"Order me 10 of item DLR-4471.\"",
  "steps": [
   "Ctrl+S, OIS100, enter the customer.",
   "In OIS101, type the customer's number in the item field.",
   "Check M3 swaps it for the Adleta item."
  ],
  "good": "The line shows the Adleta item that matches the customer's number, and the paperwork can show their number.",
  "careful": "If the number doesn't match anything, look up the item. Don't guess. Ask Master Data to add the alias (MMS025)."
 },
 {
  "id": "ORD-013",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Enter one order shipping from two warehouses",
  "lookFor": "Does this become two orders today or one? What does the customer see on their paperwork?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"I need the tile and the grout on one order.\" The tile is in one warehouse and the grout in another.",
  "steps": [
   "Ctrl+S, OIS100, enter the customer.",
   "Add both lines in OIS101.",
   "Set the warehouse on each line to where the stock is.",
   "Check how and when each line will ship."
  ],
  "good": "One order, two lines, each from the warehouse that has the stock, and the customer knows if it arrives in one trip or two.",
  "careful": "Ask your SME whether a transfer (distribution order) is made so it ships together."
 },
 {
  "id": "ORD-014",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Enter a future-dated / scheduled delivery order",
  "lookFor": "Jobsite is not ready until October. How do you hold the order and make sure it does not ship early?",
  "today": null,
  "found": "WHD-15: Customer wants material held/staged for a job date — Open: Do we stage picked material for a job date, or only hold the order?",
  "gap": null,
  "talk": false,
  "ask": "A builder calls: \"Order this now but don't deliver until the 15th of next month. The house isn't ready.\"",
  "steps": [
   "Ctrl+S, OIS100, enter the customer.",
   "Set the requested delivery date to the 15th.",
   "Add the lines and save.",
   "Check the order does not release to the warehouse early."
  ],
  "good": "A future-dated order that stays put until it is time to release it.",
  "careful": "Check whether stock is reserved now or only near the date."
 },
 {
  "id": "ORD-015",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Handle a shortage / create a backorder",
  "lookFor": "Stock is short. What are your options and how do you choose? What does the customer get told?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"I need 40 cartons.\" You only have 25.",
  "steps": [
   "Ctrl+S, OIS100, enter the customer and the line for 40.",
   "See what M3 tells you about available stock.",
   "Ship the 25 and backorder 15, if the customer agrees."
  ],
  "good": "The order shows what ships now and what is backordered, and the customer knows when the rest is expected.",
  "careful": "Only give a date for the backorder if a PO date is confirmed."
 },
 {
  "id": "ORD-016",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Substitute an item when the requested one is out",
  "lookFor": "Who is allowed to substitute, and how is the substitution recorded so billing is right?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls for an item that is out. The same product comes in a close color you do have.",
  "steps": [
   "Ctrl+S, OIS100, enter the customer.",
   "Add the line and see if M3 offers a substitute.",
   "If the customer agrees, use the substitute item."
  ],
  "good": "The order has the item the customer agreed to, at the right price.",
  "careful": "Never substitute without the customer saying OK. Note who approved it."
 },
 {
  "id": "ORD-017",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Copy a previous order for a repeat customer",
  "lookFor": "How often is this used? What has to be changed after the copy?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"Send me the same thing I ordered last month.\"",
  "steps": [
   "Ctrl+S, OIS300, find last month's order.",
   "Use the copy option to make a new order.",
   "Check the date, PO, price and stock on the new order."
  ],
  "good": "A new order matching the old one, with a new PO and date. The old order did not change.",
  "careful": "Prices may have changed since last month. Don't copy the old PO."
 },
 {
  "id": "ORD-022",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Enter a rush / hot order and expedite it",
  "lookFor": "How do you flag urgency so the warehouse actually sees it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A builder calls: \"I need this today. My installers are sitting on the job.\"",
  "steps": [
   "Ctrl+S, OIS100, enter the order.",
   "Mark it rush using the field or order type your SME shows you.",
   "Tell the warehouse it is a hot order."
  ],
  "good": "The order is flagged so the warehouse sees it as urgent, and you set a real expectation with the customer.",
  "careful": "Don't promise a time until the warehouse and the truck say it is possible."
 },
 {
  "id": "ORD-024",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Reserve specific rolls or lots to an order",
  "lookFor": "Can you hold a specific roll for a customer today? For how long, and who releases it?",
  "today": null,
  "found": "Call test T08 not run yet. OIS101 > ADL Manual (manual pick by location) exists.\nOpen: What reserve number does the customer get? How does a 24-hour reserve expire?\nCS-002: 24-hour reserves — M3 has 22-Reserved vs 33-Allocated. How a 24-hour reserve expires still needs Tony/Mike. — Open: Will CSR have to expire reserves manually?",
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"Hold that full roll in dye lot 4410 for my job. Don't let anyone else take it.\"",
  "steps": [
   "Ctrl+S, OIS100, add the roll line.",
   "Use the option to pick the exact roll or lot for the line.",
   "Check the lot is now tied to this order."
  ],
  "good": "That roll or lot is reserved to this order and can't be picked for someone else.",
  "careful": "Mixing dye lots needs the customer's OK. Check the lot really has enough length."
 },
 {
  "id": "ORD-027",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Apply a promotion or discount",
  "lookFor": "What promos run today, who approves off-list pricing, and how is it recorded?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"Your rep said there's 10% off the new line this month.\"",
  "steps": [
   "Ctrl+S, OIS100, enter the order.",
   "Add the line and check if the promotion price shows on its own.",
   "If not, check with your SME before changing anything."
  ],
  "good": "The promotion or discount shows on the line, and you can tell where it came from.",
  "careful": "Don't type in a price by hand unless you are allowed to. A promotion should come from the pricing setup."
 },
 {
  "id": "ORD-028",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": "OIS100",
  "title": "Restrict an order to a customer's allowed items",
  "lookFor": "Are there customers who can only buy certain lines? How is that enforced today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A big-box account orders an item that isn't on their approved list.",
  "steps": [
   "Ctrl+S, OIS100, enter the customer.",
   "Add an item that is not on their list.",
   "See whether M3 stops you or warns you."
  ],
  "good": "M3 blocks or warns on items outside the customer's allowed list (assortment).",
  "careful": "If M3 lets it through, report it. Don't sell items the account isn't set up for."
 },
 {
  "id": "ORD-030",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "EDI & B2B Orders",
  "program": "EDI",
  "title": "Receive an EDI 850 and turn it into an order",
  "lookFor": "Which customers send EDI orders? What percentage flow through untouched vs. need a human?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: a customer sends orders by EDI (850). Where do they show up in M3?",
  "steps": [
   "Ask your SME which customers send EDI orders today.",
   "Find out where incoming EDI orders land in M3 and who checks them."
  ],
  "good": "You can explain how an EDI order becomes a customer order and who watches for it.",
  "careful": "EDI is not connected in TST. This one is a talk-through only."
 },
 {
  "id": "ORD-031",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "EDI & B2B Orders",
  "program": "EDI",
  "title": "Fix an EDI order that failed validation",
  "lookFor": "What are the top three reasons an EDI order kicks out, and who fixes it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: an EDI order failed. A price or item didn't match.",
  "steps": [
   "Ask your SME where failed EDI orders are listed.",
   "Walk through who fixes them and how the customer is told."
  ],
  "good": "You know who owns EDI errors and how they get fixed.",
  "careful": "Talk-through only. EDI is not connected in TST."
 },
 {
  "id": "ORD-032",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "EDI & B2B Orders",
  "program": "EDI",
  "title": "Send the EDI 855 acknowledgement",
  "lookFor": "Which partners require an 855 and what must be in it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: a customer needs the EDI 855 order acknowledgment.",
  "steps": [
   "Ask your SME which customers get an 855.",
   "Find out if it goes out on its own or someone sends it."
  ],
  "good": "You can explain when an 855 goes out and who checks it.",
  "careful": "Talk-through only."
 },
 {
  "id": "ORD-033",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "EDI & B2B Orders",
  "program": "EDI",
  "title": "FCB2B catalog / attribute feed to a customer",
  "lookFor": "Which customers consume our catalog feed? What breaks when an item is missing an attribute?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: a customer wants our catalog and item attributes sent by FCB2B.",
  "steps": [
   "Ask your SME which customers get the catalog feed.",
   "Find out where the item data comes from (iNRiver / M3)."
  ],
  "good": "You know who sends the catalog feed and where its data comes from.",
  "careful": "Talk-through only."
 },
 {
  "id": "ORD-036",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Confirmation & Status",
  "program": "ePOD",
  "title": "Track a shipment and provide proof of delivery",
  "lookFor": "How do you get a POD today? How long does it take?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"Where is my delivery? Did the driver drop it off?\"",
  "steps": [
   "Ctrl+S, OIS300, find the order and check its status.",
   "Ask your SME where proof of delivery (ePOD) will show."
  ],
  "good": "You can tell shipped from delivered and get proof of delivery when the customer asks.",
  "careful": "ePOD is not connected in TST, so practice the order status part only."
 },
 {
  "id": "ORD-037",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Confirmation & Status",
  "program": "OIS100",
  "title": "Reprint an invoice, pack slip, or acknowledgement",
  "lookFor": "How often are you asked to reprint, and how do you do it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"Can you send me another copy of my invoice and packing slip?\"",
  "steps": [
   "Ctrl+S, OIS300 (or OIS350 for invoices), find the order.",
   "Use the option to reprint the document.",
   "Check where it is being sent before you send it."
  ],
  "good": "The customer gets the copy they asked for, sent to the right place.",
  "careful": "Check document output with your SME first. In TST it may print or email somewhere real."
 },
 {
  "id": "ORD-038",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Returns & Claims",
  "program": "OIS300",
  "title": "Create a return authorization for a stock item",
  "lookFor": "What has to be true before you authorize a return? Who approves it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"I ordered two cartons too many. Can I send them back?\"",
  "steps": [
   "Ctrl+S, OIS300, find the original order.",
   "Create the return (return order type) for the 2 cartons.",
   "Read back the return number."
  ],
  "good": "A return for the right item and quantity, linked to the original order, ready for the warehouse to receive.",
  "careful": "Check the return policy (time limit, condition) before you say yes."
 },
 {
  "id": "ORD-039",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Returns & Claims",
  "program": "OIS300",
  "title": "Handle a return of cut goods / non-returnable product",
  "lookFor": "What is the policy, and what do you do when the customer pushes back?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"I want to return the carpet you cut for me.\"",
  "steps": [
   "Check with your SME what the rule is for cut goods.",
   "If an exception is approved, create the return in OIS300 and note who approved it."
  ],
  "good": "You know cut goods are non-returnable unless someone approves an exception, and the exception is noted.",
  "careful": "Don't create the return until it is approved."
 },
 {
  "id": "ORD-040",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Returns & Claims",
  "program": "OIS300",
  "title": "Apply a restock fee to a return",
  "lookFor": "How is the fee calculated and who can waive it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer is returning stock product, and a 20% restock fee applies.",
  "steps": [
   "Create the return in OIS300.",
   "Add the restock fee using the charge your SME shows you.",
   "Check the credit amount is the return minus the fee."
  ],
  "good": "The return and credit show the restock fee taken off.",
  "careful": "The restock charge code may not exist yet (gap G-002). Report it if you can't find it."
 },
 {
  "id": "ORD-041",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Returns & Claims",
  "program": "OIS300",
  "title": "Issue credit for damaged goods with no physical return",
  "lookFor": "Who authorizes a credit without goods coming back? What proof is required?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"Three cartons came in broken. I don't want to ship them back.\"",
  "steps": [
   "Get the details and photos the way your SME says.",
   "Create a credit-only return (no physical return) in OIS300.",
   "Note the reason."
  ],
  "good": "A credit for the damaged cartons with a reason, and no warehouse receipt expected.",
  "careful": "Check who approves credits without a return before you create it."
 },
 {
  "id": "ORD-042",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Returns & Claims",
  "program": "ARS120",
  "title": "Create a price or quantity adjustment invoice",
  "lookFor": "Wrong price billed. Walk through the correction end to end.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"You charged me $3.10 a foot. My price is $2.85.\"",
  "steps": [
   "Confirm the right price with your SME or pricing.",
   "Ctrl+S, ARS120, create the price adjustment for the difference."
  ],
  "good": "An adjustment for just the difference, linked to the original invoice.",
  "careful": "Don't re-invoice the whole order. Fix only what was wrong."
 },
 {
  "id": "ORD-043",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Returns & Claims",
  "program": "OIS300",
  "title": "Create a credit order and generate the credit note",
  "lookFor": "What is the paper trail from return receipt to credit hitting the customer's account?",
  "today": null,
  "found": "Return/credit order (C05) covered in training portal ord-2. Not re-tested 10/29.\nCS-019: Credit an order — Return/credit order covered in portal ord-2. Not re-tested 10/29.",
  "gap": null,
  "talk": false,
  "ask": "Your lead says: \"Make the credit for that return and get the credit note to the customer.\"",
  "steps": [
   "Ctrl+S, OIS300, find the return / credit order.",
   "Move it through to invoicing so the credit note is made.",
   "Check the credit amount."
  ],
  "good": "A credit note for the right amount, linked to the return.",
  "careful": "Don't send anything from TST without checking where the document goes."
 },
 {
  "id": "ORD-044",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Returns & Claims",
  "program": "PPS390",
  "title": "Log a manufacturing claim against the mill",
  "lookFor": "Customer claims a defect. How does that claim get to the mill and how is recovery tracked?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer's install failed and the mill is to blame. Log a claim against the mill.",
  "steps": [
   "Ctrl+S, PPS390, start a claim.",
   "Enter the item, lot and what is wrong.",
   "Note the customer order it came from."
  ],
  "good": "A claim against the mill with the lot and the customer it affects.",
  "careful": "Keep the lot number. The mill will ask for it."
 },
 {
  "id": "CS-001",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": null,
  "title": "Change shipping on an order that includes a distribution order (DO)",
  "lookFor": "LIT customer has an order transferring from CAR to ship from customer warehouse. Calls and wants to ship from CAR instead.",
  "today": null,
  "found": "CO type and warehouse change on an order with a DO need Mike/Bravo.\nOpen: Will this require that we cancel and rekey?",
  "gap": null,
  "talk": false,
  "ask": "A dealer asks to change delivery on an order that is being filled by a transfer from another warehouse.",
  "steps": [
   "Ctrl+S, OIS300, find the order.",
   "Check if a distribution order (DO) is tied to it.",
   "With your SME, change the shipping and check the DO still lines up."
  ],
  "good": "The order and its transfer both reflect the new shipping.",
  "careful": "Changing the order alone can leave the transfer going to the wrong place."
 },
 {
  "id": "CS-012",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": null,
  "title": "Disclaimer information entered \"below the line\" (Stauf products)",
  "lookFor": null,
  "today": null,
  "found": "Likely pre/post-text lines on the order line. Not tested.",
  "gap": null,
  "talk": false,
  "ask": "A Stauf product order needs the disclaimer text added \"below the line.\"",
  "steps": [
   "Ctrl+S, OIS100, open the order.",
   "Add the disclaimer as an order text line the way your SME shows you.",
   "Check it prints on the paperwork."
  ],
  "good": "The disclaimer is on the order and shows on the customer documents.",
  "careful": "Use the standard wording. Don't retype it from memory."
 },
 {
  "id": "CS-013",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Logistics",
  "program": null,
  "title": "No-run dates",
  "lookFor": null,
  "today": null,
  "found": "Delivery calendar covered in portal log-6. Not re-tested 10/29.",
  "gap": null,
  "talk": false,
  "ask": "A customer has dates they can't take delivery (no-run dates).",
  "steps": [
   "Ask your SME where no-run dates are kept in M3.",
   "Enter an order and check the delivery date avoids those days."
  ],
  "good": "The order's delivery date doesn't fall on a no-run date.",
  "careful": "If M3 doesn't stop it, set the date by hand and report it."
 },
 {
  "id": "CS-021",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": null,
  "title": "Ensure an order ships complete (CO with backorders)",
  "lookFor": null,
  "today": null,
  "found": "No ship-complete setting found on the OIS100 panels.",
  "gap": null,
  "talk": false,
  "ask": "A builder says: \"Ship it all at once. Don't send anything until it's all here.\"",
  "steps": [
   "Ctrl+S, OIS100, open the order.",
   "Set the order to ship complete (the field your SME shows you).",
   "Check the backordered line holds the whole order."
  ],
  "good": "Nothing ships until every line is available.",
  "careful": "Tell the customer the whole order waits on the slowest item."
 },
 {
  "id": "CS-025",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Entry",
  "program": null,
  "title": "Email orders",
  "lookFor": null,
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A dealer emails you an order.",
  "steps": [
   "Enter it in OIS100 from the email.",
   "Put their PO in the reference field.",
   "Send a confirmation back the way your SME shows you."
  ],
  "good": "The order matches the email exactly and the customer gets a confirmation.",
  "careful": "Check the email for notes that change the order (dates, ship-to)."
 },
 {
  "id": "CS-031",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Backorders",
  "program": null,
  "title": "Fill backorders",
  "lookFor": null,
  "today": null,
  "found": "Backorder with ETA: MMS165 > Confirm delivery date > Yes (portal ord-13). Filling a backorder: Auto alloc in MMS121 when stock arrives.",
  "gap": null,
  "talk": false,
  "ask": "Stock came in. Fill the backorders that were waiting on it.",
  "steps": [
   "Ctrl+S, OIS300, find orders with backordered lines for that item.",
   "Check they are now allocated or release them.",
   "Call the customers whose orders can now ship."
  ],
  "good": "Backordered lines are allocated in the right order and customers know.",
  "careful": "Ask your SME who gets stock first when there isn't enough for everyone."
 },
 {
  "id": "CS-036",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Returns & Claims",
  "program": null,
  "title": "Below-the-line credit for claim labor",
  "lookFor": "Credit issued.",
  "today": "Green screen (5250). Approval needed from someone else, then credit issued.",
  "found": "Not tested. Likely a credit order with a charge line.",
  "gap": null,
  "talk": false,
  "ask": "A claim was approved, and the dealer gets a credit for the labor.",
  "steps": [
   "Create the credit with a labor charge line the way your SME shows you.",
   "Note the claim number."
  ],
  "good": "A credit for the approved labor amount, tied to the claim.",
  "careful": "Labor credits need approval first. Check who approves them."
 },
 {
  "id": "CS-037",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Order Confirmation & Status",
  "program": null,
  "title": "Retrieve an old invoice",
  "lookFor": "Find old invoices. Must not lose: Help find old invoices.",
  "today": "Green screen (5250).",
  "found": "Covered in portal ord-9 (OIS350). Not re-tested 10/29.\nOpen: Training issue 11/2/26 (Gina): OIS350 customer filter does not line up; works in OIS300. Probably needs payer filter - training being fixed.",
  "gap": null,
  "talk": false,
  "ask": "A dealer calls: \"I need a copy of an invoice from two years ago.\"",
  "steps": [
   "Ctrl+S, OIS350 (or ARS200), search by customer and date.",
   "Find the invoice and reprint it."
  ],
  "good": "You found the old invoice and sent a copy to the right place.",
  "careful": "Ask your SME how far back invoices come over from the old system."
 },
 {
  "id": "CALL-08",
  "dept": "Order Entry",
  "module": "orderManagement",
  "topic": "Pricing",
  "program": "Rhythm / price list",
  "title": "Customer's price list is missing an item",
  "lookFor": "Customer thinks an item was dropped because it is not on their price list. Who maintains customer price lists, and how do they get updated? (Heard in calls C10)",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: a dealer says an item is missing from their price list on the website.",
  "steps": [
   "Check the item is active and on their price list in OIS017.",
   "Ask your SME how Rhythm gets its prices."
  ],
  "good": "You can tell whether the item is missing from M3 pricing or only from the website.",
  "careful": "Fixing it is a Pricing job. Your part is to find out and pass it on."
 },
 {
  "id": "WHS-001",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Release & Pick",
  "program": "OIS300",
  "title": "Release orders for picking",
  "lookFor": "Who releases, when, and by what criteria? Is it a batch run or one at a time?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "It's 7 a.m. Release today's delivery orders so the floor can start picking.",
  "steps": [
   "Ctrl+S, OIS300, filter to orders due today.",
   "Release them for picking (the option your SME shows you).",
   "Check pick lists were created."
  ],
  "good": "Today's orders are released and show up as picking work.",
  "careful": "Don't release future-dated orders by mistake."
 },
 {
  "id": "WHS-002",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Release & Pick",
  "program": "OIS300",
  "title": "Auto-release rules ahead of the required date",
  "lookFor": "How far ahead should an order drop to the floor? Is that different by warehouse or route?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Your lead asks: \"How far ahead does an order drop to the floor on its own?\"",
  "steps": [
   "Ask your SME what the auto-release rule is.",
   "In OIS300, find an order and check when it was released vs its delivery date."
  ],
  "good": "You can explain the auto-release window and spot an order that released too early or too late.",
  "careful": "If the rule isn't set up yet, write down what it should be."
 },
 {
  "id": "WHS-003",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Release & Pick",
  "program": "MWS410",
  "title": "Print pick lists by route or wave",
  "lookFor": "How is picking work grouped and handed out today? Paper, RF, or both?",
  "today": "WHD-10 (do we do this: Yes)\n1. Print the picking label.\n2. Scan the label.\n3. Scan the storage location.\n4. Scan the material.\n5. Scan the drop location.\nWho: Warehouse personnel / loader; Credit Department\nHow often: Daily\nTo confirm: Confirm the Dancik screen/option and the step that changes the order to shipped status.\n(from D.M.)",
  "found": null,
  "gap": "G-006",
  "talk": false,
  "ask": "Print the pick lists for tomorrow's Route 2.",
  "steps": [
   "Ctrl+S, MWS410.",
   "Filter to the route or wave.",
   "Print the pick lists."
  ],
  "good": "Pick lists for just that route, in the order the picker should walk.",
  "careful": "Pick list output may not be set up in TST (gap G-006). Check before printing."
 },
 {
  "id": "WHS-004",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Release & Pick",
  "program": "MWS420",
  "title": "Pick full cartons from a location",
  "lookFor": "Walk the floor path. What does the picker read, scan, or write down?",
  "today": "WHD-08: not answered yet on the warehouse sheet.",
  "found": null,
  "gap": "G-006",
  "talk": false,
  "ask": "Pick 12 full cartons of tile from location A-04-2.",
  "steps": [
   "Open the pick list in MWS420 (or on the RF gun).",
   "Confirm the location, item and quantity.",
   "Report the pick."
  ],
  "good": "The pick is reported for 12 cartons from the right location, and stock moves off the shelf.",
  "careful": "Scan or confirm the location. Don't pick from the closest bin."
 },
 {
  "id": "WHS-005",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Release & Pick",
  "program": "MWS420",
  "title": "Pick and cut a roll at the cutting station",
  "lookFor": "Full cut-goods flow: who pulls the roll, who cuts, who measures, who records the actual cut length.",
  "today": null,
  "found": null,
  "gap": "G-006",
  "talk": false,
  "ask": "Cut 18 feet off a roll at the cutting station for an order.",
  "steps": [
   "Open the pick in MWS420.",
   "Pick the roll it calls for, cut, and report the cut length.",
   "Check the roll balance went down by 18 feet."
  ],
  "good": "The order has the cut piece, and the roll's balance is right.",
  "careful": "Measure twice. A short cut can't be fixed."
 },
 {
  "id": "WHS-006",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Release & Pick",
  "program": "MWS420",
  "title": "Generate roll labels",
  "lookFor": "What is on a roll label today and who reads it downstream?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Print labels for the roll you just cut.",
  "steps": [
   "From the pick in MWS420, print the roll label.",
   "Check the label shows the order, item and lot."
  ],
  "good": "Each cut piece has a label with the order and lot.",
  "careful": "Check where labels print before you print."
 },
 {
  "id": "WHS-007",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Release & Pick",
  "program": "MMS100",
  "title": "Return the remnant / balance roll to stock",
  "lookFor": "How is the leftover footage put back and how is its cost handled?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Put the leftover roll back in stock after the cut.",
  "steps": [
   "Ctrl+S, MMS100 (or the RF move), move the balance roll to its location.",
   "Check MMS060 shows it there with the new length."
  ],
  "good": "The remnant is back in stock at the right location with the right length.",
  "careful": "Label the remnant so the next person knows the real length."
 },
 {
  "id": "WHS-008",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Release & Pick",
  "program": "MWS420",
  "title": "Handle a short pick or pick discrepancy",
  "lookFor": "Picker cannot find the quantity. What happens next, and who tells the customer?",
  "today": "WHD-11 (do we do this: Yes)\n1. Verify the quantity at the pick location.\n2. Notify Inventory Control.\n3. Wait for an alternate pick location.\n4. Pull the material from the alternate location.\nWho: Warehouse personnel; Inventory Control; order desk\nHow often: Daily\nTo confirm: Confirm the Dancik screen/option and how the shortage, backorder or split is recorded.\n(from D.M.)",
  "found": null,
  "gap": "G-006",
  "talk": false,
  "ask": "The pick list says 10 cartons but only 7 are on the shelf.",
  "steps": [
   "Report the pick for 7 in MWS420.",
   "Report the shortage the way your SME shows you.",
   "Tell Customer Service."
  ],
  "good": "The pick shows 7, the shortage is recorded, and someone checks the stock.",
  "careful": "Don't pick from another order's stock to cover the gap."
 },
 {
  "id": "WHS-009",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Release & Pick",
  "program": "MWS420",
  "title": "Create a pallet label / license plate",
  "lookFor": "Do you build and label pallets today? What identifies a pallet through shipping?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Build a pallet for an order and give it a pallet label.",
  "steps": [
   "In MWS420, put the picks on a pallet (license plate / container).",
   "Print the pallet label."
  ],
  "good": "Every pick is on a labeled pallet tied to the order.",
  "careful": "One order per pallet unless your SME says otherwise."
 },
 {
  "id": "WHS-010",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "MWS423",
  "title": "Move product to the packing location",
  "lookFor": "Is packing a physical location or a step? Who owns it?",
  "today": null,
  "found": null,
  "gap": "G-006",
  "talk": false,
  "ask": "Move the picked pallet to the packing area.",
  "steps": [
   "Ctrl+S, MWS423 (or RF), move the pallet to the pack location."
  ],
  "good": "The pallet shows at the packing location.",
  "careful": "Scan the drop location so the pallet can be found."
 },
 {
  "id": "WHS-011",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "MWS410",
  "title": "Pack the shipment and generate the pack slip",
  "lookFor": "What has to be verified before a pack slip prints?",
  "today": null,
  "found": null,
  "gap": "G-006",
  "talk": false,
  "ask": "Pack the order and print the packing slip.",
  "steps": [
   "Ctrl+S, MWS410, find the delivery.",
   "Pack it and print the packing slip."
  ],
  "good": "The order is packed and has a packing slip.",
  "careful": "Check document output before printing in TST."
 },
 {
  "id": "WHS-012",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "FreightPOP",
  "title": "Send packing information to FreightPOP",
  "lookFor": "What data goes to FreightPOP, when, and what comes back?",
  "today": "WHD-16 (do we do this: Yes)\n1. Warehouse personnel pull the common-carrier order.\nWho: Shipping coordinator; warehouse personnel; Collections Department\nHow often: Daily\nTo confirm: Confirm the Dancik screen/option and who records the carrier/PRO number, prepares the BOL and confirms shipment. The handwritten “No” under screen/option is not a usable screen reference.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: packing info needs to go to FreightPOP for the carrier.",
  "steps": [
   "Ask your SME how packing info gets to FreightPOP."
  ],
  "good": "You know what FreightPOP needs from the warehouse.",
  "careful": "Talk-through only. FreightPOP isn't connected in TST."
 },
 {
  "id": "WHS-013",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "MWS410",
  "title": "Confirm the shipment / pick confirmation",
  "lookFor": "What is the last physical action before the order is considered shipped?",
  "today": null,
  "found": null,
  "gap": "G-006",
  "talk": false,
  "ask": "The truck is loaded. Confirm the shipment.",
  "steps": [
   "Ctrl+S, MWS410, find the delivery.",
   "Confirm it shipped.",
   "Check the order status moved to shipped."
  ],
  "good": "The order shows shipped and is ready to invoice.",
  "careful": "Only confirm what is actually on the truck."
 },
 {
  "id": "WHS-014",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "EDI",
  "title": "Send the EDI 856 ASN",
  "lookFor": "Which customers require an ASN and what is the deadline relative to the truck leaving?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: a customer needs an advance ship notice (EDI 856).",
  "steps": [
   "Ask your SME which customers get an 856 and when it goes out."
  ],
  "good": "You know when an ASN is sent and what has to be right first.",
  "careful": "Talk-through only."
 },
 {
  "id": "WHS-015",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "OIS100",
  "title": "Update the delivery charge from the carrier",
  "lookFor": "When actual freight differs from what was quoted, how does the invoice get corrected?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The carrier's bill came in higher than the freight on the order. Update the delivery charge.",
  "steps": [
   "Ctrl+S, OIS100, open the order.",
   "Change the freight charge line the way your SME shows you."
  ],
  "good": "The order's freight matches the carrier's charge before it invoices.",
  "careful": "Check who is allowed to change freight."
 },
 {
  "id": "WHS-016",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "ePOD",
  "title": "Record proof of delivery from ePOD",
  "lookFor": "Who captures the signature and where does it end up?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: the driver captured proof of delivery in ePOD.",
  "steps": [
   "Ask your SME where the signed POD will show in M3."
  ],
  "good": "You know where to find the POD when Customer Service asks.",
  "careful": "Talk-through only."
 },
 {
  "id": "WHS-017",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "MWS410",
  "title": "Stage and release a will-call pickup",
  "lookFor": "How does the counter know it is staged, and how is the pickup recorded?",
  "today": "WHD-12 (do we do this: Yes)\n1. Will-call personnel print the picking label.\n2. Pull the entire order.\n3. Match the paperwork to the customer order.\n4. Change the order to Ship status (S).\nWho: Will-call personnel; warehouse personnel\nHow often: Daily\nTo confirm: Confirm the Dancik screen/option, payment/credit clearance step and how pickup identification is recorded.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A will-call order is picked. Stage it and release it when the customer shows up.",
  "steps": [
   "Move the order to the will-call staging spot.",
   "When the customer arrives, check their name and order, then confirm the shipment in MWS410."
  ],
  "good": "The customer leaves with the right order and it shows shipped.",
  "careful": "Check who is allowed to pick it up before you hand it over."
 },
 {
  "id": "WHS-018",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "DRS100",
  "title": "Build a truck load by route and stop sequence",
  "lookFor": "Who sequences the stops and what tool do they use?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Build tomorrow's truck for Route 3 in stop order.",
  "steps": [
   "Ctrl+S, DRS100.",
   "Pull the deliveries for the route and put them in stop order."
  ],
  "good": "A load for the route with stops in the order the driver will run them.",
  "careful": "Load the last stop first."
 },
 {
  "id": "WHS-019",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "DRS005",
  "title": "Assign an order to a route, run day, and stop",
  "lookFor": "How is the route decided - by customer, by zip, by ship-to? Who can override it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "An order needs to go on the Tuesday route, stop 4.",
  "steps": [
   "Ctrl+S, DRS005 (or the order), set the route, run day and stop."
  ],
  "good": "The order is on the right route, day and stop.",
  "careful": "Check the route actually runs that day."
 },
 {
  "id": "WHS-020",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Receiving & Put-Away",
  "program": "PPS300",
  "title": "Receive a purchase order into the dock",
  "lookFor": "Truck arrives. Every step from door to system entry.",
  "today": "WHD-01 (do we do this: Yes)\n1. The inventory supervisor verifies the purchase order.\n2. Print the put-away labels.\n3. Put the material in a storage location and scan it.\nWho: Inventory supervisor\nDancik screen: Option 2 — confirm screen name\nTo confirm: Confirm the exact scans used to record material, quantity, lot/shade and storage location.\n(from Erasto / Jr.)\n\nWHD-02: not answered yet on the warehouse sheet.",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A truck from the mill is at the dock. Receive the PO.",
  "steps": [
   "Ctrl+S, PPS300, find the PO.",
   "Receive the quantities that came in.",
   "Check the receipt posted."
  ],
  "good": "The PO shows received and the stock is on hand at the dock.",
  "careful": "Count before you receive. Receive what came, not what was ordered."
 },
 {
  "id": "WHS-021",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Receiving & Put-Away",
  "program": "PPS300",
  "title": "Record a pre-receipt / shipment advice",
  "lookFor": "Do you know what is on the truck before it arrives? How?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The supplier sent an advance ship notice. Record it before the truck arrives.",
  "steps": [
   "Ctrl+S, PPS300, record the shipment advice for the PO."
  ],
  "good": "The incoming shipment is visible before it arrives.",
  "careful": "Ask your SME if suppliers send these today."
 },
 {
  "id": "WHS-022",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Receiving & Put-Away",
  "program": "MWS423",
  "title": "Put away received goods",
  "lookFor": "Who decides the put-away location? Is it directed or does the driver choose?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Put away the goods you just received.",
  "steps": [
   "Ctrl+S, MWS423 (or RF), move them from the dock to their locations."
  ],
  "good": "Stock shows at its storage location, not the dock.",
  "careful": "Scan the location you actually put it in."
 },
 {
  "id": "WHS-023",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Receiving & Put-Away",
  "program": "MWS423",
  "title": "Reverse a put-away or a receipt",
  "lookFor": "How do you undo a mistake, and who is allowed to?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "You put away to the wrong location. Fix it.",
  "steps": [
   "Ctrl+S, MWS423, reverse or move the put-away.",
   "Check MMS060 shows the right location."
  ],
  "good": "Stock shows where it really is.",
  "careful": "Fix it right away so pickers aren't sent to an empty bin."
 },
 {
  "id": "WHS-024",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Receiving & Put-Away",
  "program": "MWS423",
  "title": "Cross-dock a receipt straight onto an order",
  "lookFor": "How do you know an inbound roll is already sold? Who catches it?",
  "today": "WHD-05: not answered yet on the warehouse sheet.",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A receipt has an item that is backordered for a customer. Send it straight to that order.",
  "steps": [
   "In PPS300 / MWS423, use cross-dock so the receipt goes to the order."
  ],
  "good": "The received stock goes to the order without being put away first.",
  "careful": "Ask your SME if cross-dock is set up."
 },
 {
  "id": "WHS-025",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Receiving & Put-Away",
  "program": "PPS300",
  "title": "Handle overage, shortage, or damage on receipt",
  "lookFor": "Concealed damage on a mill shipment. Walk through what happens.",
  "today": "WHD-03: not answered yet on the warehouse sheet.\n\nWHD-04: not answered yet on the warehouse sheet.",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The truck had 2 extra cartons, was short 1 item, and one carton is damaged.",
  "steps": [
   "Receive what actually came in PPS300.",
   "Record the damage the way your SME shows you.",
   "Tell Purchasing."
  ],
  "good": "The receipt matches what arrived, and the damage and shortage are recorded.",
  "careful": "Take photos of damage before you sign for it."
 },
 {
  "id": "WHS-026",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Transfers",
  "program": "MMS100",
  "title": "Create a transfer between warehouses",
  "lookFor": "Who requests a transfer, who approves it, and how often does it happen?",
  "today": "WHD-20 (do we do this: Yes)\n1. Transfer or scan the material into the receiving warehouse.\n2. Assign the received material to a storage location.\nWho: Warehouse personnel; inventory supervisor\nHow often: Daily\nTo confirm: The notes cover the receiving side only. Confirm transfer creation, shipping, in-transit tracking, discrepancy handling and the Dancik screen/option.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The other warehouse needs 20 cartons. Create the transfer.",
  "steps": [
   "Ctrl+S, MMS100 (distribution order), from your warehouse to theirs.",
   "Add the item and quantity."
  ],
  "good": "A transfer order for 20 cartons between the right warehouses.",
  "careful": "Check the receiving warehouse really needs it."
 },
 {
  "id": "WHS-027",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Transfers",
  "program": "MWS410",
  "title": "Ship a distribution order out of the sending warehouse",
  "lookFor": "Is a transfer picked and shipped like a customer order today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Ship the transfer out of your warehouse.",
  "steps": [
   "Pick the transfer, then confirm it shipped in MWS410."
  ],
  "good": "The transfer shows shipped and in transit.",
  "careful": "Put the transfer paperwork on the load."
 },
 {
  "id": "WHS-028",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Transfers",
  "program": "MWS423",
  "title": "Receive a distribution order transfer",
  "lookFor": "What is checked on arrival and what happens to a discrepancy?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A transfer from the other warehouse arrived. Receive it.",
  "steps": [
   "Ctrl+S, MWS423 (or PPS300), receive the transfer.",
   "Put it away."
  ],
  "good": "The stock is on hand in your warehouse and the transfer is closed.",
  "careful": "Count it. Transfers come up short too."
 },
 {
  "id": "WHS-029",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Transfers",
  "program": "MMS005",
  "title": "Maintain inter-warehouse transfer lead times",
  "lookFor": "How many days between each warehouse pair? Who maintains that?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: how many days does a transfer take between warehouses?",
  "steps": [
   "Ctrl+S, MMS005, look at the transfer lead times."
  ],
  "good": "You know where transfer lead times are kept and if they are right.",
  "careful": "Changing them is a setup job. Look, don't change."
 },
 {
  "id": "WHS-030",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Returns Receiving",
  "program": "PPS300",
  "title": "Receive returned goods from a customer",
  "lookFor": "How does the driver or dock know a return is authorized?",
  "today": "WHD-17 (do we do this: Yes)\n1. Count the returned material and verify that it matches the return paperwork.\n2. Identify a storage/staging location.\n3. Submit the paperwork and location details to Inventory Control.\nWho: Warehouse / will-call personnel; inventory supervisor\nHow often: Daily\nTo confirm: Confirm the Dancik screen/option and the condition-inspection and credit-processing steps. Handwritten notes say to verify item number and quantity, check for damage and put away; their row alignment is unclear, so confirm they belong to WHD-17.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A customer return arrived at the dock.",
  "steps": [
   "Find the return order.",
   "Receive it in PPS300 the way your SME shows you."
  ],
  "good": "The return is received against the right return order.",
  "careful": "Don't receive a return that has no return number. Call Customer Service."
 },
 {
  "id": "WHS-031",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Returns Receiving",
  "program": "MMS100",
  "title": "Inspect returned goods and decide disposition",
  "lookFor": "Who inspects, and what are the possible outcomes - restock, second, scrap?",
  "today": "WHD-18 (do we do this: Yes)\n1. Notify Inventory Control.\n2. Inventory Control verifies the damage and determines whether the material is resellable.\n3. Notify the Claims Department.\nWho: Inventory Control; Claims Department\nHow often: Daily\nTo confirm: Confirm the Dancik screen/option and the location/status used to prevent allocation of nonresellable material.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Inspect the returned goods. Is it good stock, damaged, or scrap?",
  "steps": [
   "Inspect it and decide.",
   "Record the decision the way your SME shows you (MMS100)."
  ],
  "good": "The return has a decision: back to stock, damaged, or scrap.",
  "careful": "If you are not sure, put it on hold. Don't put it back in stock."
 },
 {
  "id": "WHS-032",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Returns Receiving",
  "program": "MWS423",
  "title": "Put away or scrap the returned goods",
  "lookFor": "Where does restockable return product go, and how is second-quality handled?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Put the good returns back on the shelf and scrap the rest.",
  "steps": [
   "Put away the good stock (MWS423).",
   "Scrap the bad stock with a reason code."
  ],
  "good": "Good stock is back on hand and the scrap is written off with a reason.",
  "careful": "Scrapping needs the right reason code."
 },
 {
  "id": "WHS-033",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS060",
  "title": "Display on-hand balance by location and container",
  "lookFor": "Which screen do you live in, and what does it not tell you that you wish it did?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Customer Service asks: \"How many cartons are in each location?\"",
  "steps": [
   "Ctrl+S, MMS060, enter the item.",
   "Look at the balance by location and container."
  ],
  "good": "You can give the quantity in each location.",
  "careful": "On hand is not the same as available. Some may be allocated."
 },
 {
  "id": "WHS-034",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS060",
  "title": "Display on-hand by warehouse and by facility",
  "lookFor": "Who asks for company-wide availability and how do you produce it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "\"How much do we have of this item in each warehouse?\"",
  "steps": [
   "Ctrl+S, MMS060, view by warehouse."
  ],
  "good": "You can give the balance in each warehouse.",
  "careful": "Check you are looking at the right facility."
 },
 {
  "id": "WHS-035",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS300",
  "title": "Review stock transaction history for an item",
  "lookFor": "How do you answer 'where did this inventory go'?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "\"Where did these 10 cartons go?\" Look at the item's history.",
  "steps": [
   "Ctrl+S, MMS080 / MMS300, enter the item.",
   "Look at the receipts, picks, moves and adjustments."
  ],
  "good": "You can explain every movement of the item.",
  "careful": "Check the dates. Recent changes are at the top."
 },
 {
  "id": "WHS-036",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS100",
  "title": "Move product between locations",
  "lookFor": "Ad-hoc relocations - who does them and are they always recorded?",
  "today": "WHD-21 (do we do this: Yes)\n1. Identify material for consolidation.\n2. Scan the current storage location.\n3. Verify the material and quantity.\n4. Use Dancik to identify a destination location containing the same material.\n5. Transfer the material to the destination location.\nWho: Warehouse order pullers; warehouse / inventory supervisor\nHow often: Daily\nDancik screen: Dancik — option not provided\nTo confirm: Confirm the exact Dancik screen/option, the destination scan and how lot/shade identity is maintained during consolidation.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Move 5 cartons from A-02-1 to B-07-3.",
  "steps": [
   "Ctrl+S, MMS100 (or RF move).",
   "Enter from location, to location and quantity."
  ],
  "good": "MMS060 shows the 5 cartons in the new location.",
  "careful": "Scan the new location. Don't type it from memory."
 },
 {
  "id": "WHS-037",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS235",
  "title": "Manage dye lots / shade lots",
  "lookFor": "How is a dye lot identified on receipt and kept intact through picking?",
  "today": "WHD-07: not answered yet on the warehouse sheet.\n\nWHD-06 (do we do this: Yes)\n1. The order desk processes the order.\n2. Warehouse personnel pull the material.\n3. Load the material onto an Adleta truck or a common carrier.\nWho: Order desk; warehouse personnel\nTo confirm: The handwritten notes describe a general order flow. Confirm how the lot/shade is selected and verified. The original screen/option entry says “Yes,” which is not a screen reference.\n(from Erasto / Jr.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A new receipt has three dye lots. Keep them apart.",
  "steps": [
   "Receive each lot on its own.",
   "Check MMS235 shows each lot separately."
  ],
  "good": "Each dye lot is its own lot in M3.",
  "careful": "Never mix lots on one pallet."
 },
 {
  "id": "WHS-038",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS235",
  "title": "Create a lot manually",
  "lookFor": "When does a lot get created by hand instead of by receipt?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A carton has no lot number. Create one.",
  "steps": [
   "Ctrl+S, MMS235, create the lot.",
   "Assign the stock to it."
  ],
  "good": "The stock now has a lot.",
  "careful": "Ask your SME what lot number format to use."
 },
 {
  "id": "WHS-039",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS235",
  "title": "Trace a lot to the customers who received it",
  "lookFor": "Mill announces a defect on a dye lot. How fast can you list who got it today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The mill says lot 4410 has a defect. Which customers got it?",
  "steps": [
   "Ctrl+S, MMS235 (lot trace), enter the lot.",
   "List the orders and customers that received it."
  ],
  "good": "A list of every customer who got that lot.",
  "careful": "Don't forget stock still on hand. It may need to go on hold."
 },
 {
  "id": "WHS-040",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS110",
  "title": "Reclassify product into a new lot",
  "lookFor": "When and why does product change lot?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Move stock into a new lot number.",
  "steps": [
   "Ctrl+S, MMS110, reclassify the stock to the new lot."
  ],
  "good": "The stock is under the new lot.",
  "careful": "Check with your SME before reclassifying."
 },
 {
  "id": "WHS-041",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS110",
  "title": "Reclassify into a new item (regrade to seconds)",
  "lookFor": "First quality becomes a second. What changes - item number, cost, price?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Damaged first-quality stock needs to become seconds.",
  "steps": [
   "Ctrl+S, MMS110, reclassify to the seconds item."
  ],
  "good": "The stock is now the seconds item at the seconds value.",
  "careful": "This changes inventory value. Check who approves it."
 },
 {
  "id": "WHS-042",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS235",
  "title": "Change lot status to hold or quarantine",
  "lookFor": "How do you freeze product so nobody can sell it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Put lot 4410 on hold so no one ships it.",
  "steps": [
   "Ctrl+S, MMS235, change the lot status to hold / quarantine."
  ],
  "good": "The lot can't be allocated or picked.",
  "careful": "Tell Customer Service there is less stock."
 },
 {
  "id": "WHS-043",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS100",
  "title": "Adjust inventory with a reason code",
  "lookFor": "List every adjustment reason you use and who is allowed to post one.",
  "today": "WHD-19 (do we do this: Confirm — source says Yes/No)\n1. Cycle-count personnel identify the variance.\n2. Cycle-count personnel adjust the variance.\n3. Submit the supporting paperwork to Inventory Control.\n4. The inventory supervisor approves the adjustment.\nWho: Cycle-count personnel; Inventory Control; inventory supervisor\nHow often: Daily\nTo confirm: Confirm whether Step 2 is a proposed adjustment or a posted adjustment, and whether approval is required before posting. Confirm the Dancik screen/option.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "You found 3 cartons that aren't in the system. Adjust the stock.",
  "steps": [
   "Ctrl+S, MMS100 (adjustment), add 3 with a reason code."
  ],
  "good": "On hand goes up by 3 with a reason.",
  "careful": "Adjustments change the books. Check who approves them."
 },
 {
  "id": "WHS-044",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Inventory Management",
  "program": "MMS100",
  "title": "Scrap or write off damaged product",
  "lookFor": "Approval threshold? Where does the cost land?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Forklift damage: scrap 2 cartons.",
  "steps": [
   "Ctrl+S, MMS100, scrap with the damage reason code."
  ],
  "good": "The 2 cartons are written off with a reason.",
  "careful": "Take a photo and note who approved it."
 },
 {
  "id": "WHS-045",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Physical Count",
  "program": "MMS300",
  "title": "Create a physical inventory request",
  "lookFor": "How often do you count - full, cycle, by zone? Who plans it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Set up a cycle count for aisle A.",
  "steps": [
   "Ctrl+S, MMS300, create the count request for those locations."
  ],
  "good": "A count request for just aisle A.",
  "careful": "A count can lock the items until it is closed. Practice only when your SME says."
 },
 {
  "id": "WHS-046",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Physical Count",
  "program": "MMS301",
  "title": "Select lines and print count sheets",
  "lookFor": "What does the count sheet look like and who counts?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Print the count sheets for the count.",
  "steps": [
   "Ctrl+S, MMS301, select the lines and print."
  ],
  "good": "Count sheets for every location on the request.",
  "careful": "Check where they print."
 },
 {
  "id": "WHS-047",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Physical Count",
  "program": "MMS303",
  "title": "Report count results",
  "lookFor": "How are counts entered - paper then keyed, or scanned?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Enter what you counted.",
  "steps": [
   "Ctrl+S, MMS303, enter the counts."
  ],
  "good": "The counts are entered for every line.",
  "careful": "Enter what you counted, not what the system says."
 },
 {
  "id": "WHS-048",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Physical Count",
  "program": "MMS305",
  "title": "Review the variance report and recount",
  "lookFor": "What variance triggers a recount? Who signs off?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The count is off on two items. Review and recount.",
  "steps": [
   "Ctrl+S, MMS305, look at the variances.",
   "Recount the big ones."
  ],
  "good": "Variances are checked and recounted before updating.",
  "careful": "Ask your SME what variance needs a recount."
 },
 {
  "id": "WHS-049",
  "dept": "Warehouse",
  "module": "inventory",
  "topic": "Physical Count",
  "program": "MMS300",
  "title": "Update inventory from the count",
  "lookFor": "Who has authority to post the final adjustment?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The count is done. Update inventory.",
  "steps": [
   "Ctrl+S, MMS300, update from the count."
  ],
  "good": "On hand now matches the count.",
  "careful": "This changes inventory value. Only after approval."
 },
 {
  "id": "WHD-09",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Release & Pick",
  "program": "MWS420 - to confirm",
  "title": "Broken carton / partial-carton sale (if we allow it)",
  "lookFor": "Remaining loose qty stays accurate in inventory.",
  "today": "WHD-09: not answered yet on the warehouse sheet.",
  "found": "Open: Do we sell partial cartons today? If not, drop this one.",
  "gap": null,
  "talk": false,
  "ask": "A customer wants 3 boxes out of a 10-box carton.",
  "steps": [
   "Check with your SME if broken cartons are allowed.",
   "If yes, pick and charge the way they show you."
  ],
  "good": "The partial carton is picked and the broken-carton charge is applied if there is one.",
  "careful": "The broken carton charge code may not exist yet (gap G-002)."
 },
 {
  "id": "WHD-14",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "DRS100 / OIS210 - to confirm",
  "title": "Driver collects COD at delivery",
  "lookFor": "Delivery paperwork shows the amount to collect, and the driver/route ties back to the payment.",
  "today": "WHD-14 (do we do this: Yes)\n1. The driver collects a check for the required amount.\n2. The driver turns in the check.\nWho: Driver; Collections Department\nHow often: Daily\nTo confirm: Confirm the Dancik screen/option and how the check is matched to the order and delivery.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The driver collects a COD check at delivery.",
  "steps": [
   "Ask your SME how the driver records the payment.",
   "Find where the payment gets entered (OIS210 / cash desk)."
  ],
  "good": "The payment is recorded against the right order and the driver's paperwork matches.",
  "careful": "Never leave product on COD without payment."
 },
 {
  "id": "ISC-01",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "OIS100 - to confirm",
  "title": "Walk-in retail sale on the location's retail account (Carrollton 99, Lenexa 95, Houston 96)",
  "lookFor": "Order goes on the right location's retail account. No customer setup needed.",
  "today": "WHD-22 (do we do this: Yes)\n1. Pro Shop personnel print the picking label.\n2. Warehouse personnel pull the order.\n3. Match the material to the customer order.\n4. Load the customer’s order.\nWho: Pro Shop personnel; warehouse personnel; inventory supervisor; Credit Department\nHow often: Daily\nTo confirm: Confirm the Dancik screen/option and the steps for payment/account approval and inventory reduction.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A walk-in at the ISC buys 2 buckets of adhesive.",
  "steps": [
   "Ctrl+S, OIS100, use the location's retail account.",
   "Add the items and finish the sale."
  ],
  "good": "The sale is on the right location's retail account.",
  "careful": "Use the right retail account for your location (Carrollton, Lenexa or Houston)."
 },
 {
  "id": "ISC-02",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "OIS100 - to confirm",
  "title": "Capture the retail customer's name and phone on the order",
  "lookFor": "We can find the sale later even though it's on a shared account.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Take down the walk-in's name and phone on the order.",
  "steps": [
   "Enter the name and phone in the order fields your SME shows you."
  ],
  "good": "You can find the sale later by name or phone.",
  "careful": "Don't create a new customer for a walk-in."
 },
 {
  "id": "ISC-03",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "OIS017 / OIS100 - to confirm",
  "title": "Retail pricing",
  "lookFor": "Retail customers get retail price, not account pricing. We know who can discount and how it's recorded.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A walk-in asks the price of grout.",
  "steps": [
   "Check the retail price on the retail account (OIS017)."
  ],
  "good": "You give the retail price, not a dealer price.",
  "careful": "Don't use a dealer's account for a retail sale."
 },
 {
  "id": "ISC-04",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "CRS610 / OIS100 - to confirm",
  "title": "Sales tax on a retail sale",
  "lookFor": "Tax is right for the location (Texas vs Kansas). Retail customers are taxed unless they show an exemption.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Make sure sales tax is on the retail sale.",
  "steps": [
   "Check the tax line on the order total."
  ],
  "good": "Sales tax is charged at the right rate.",
  "careful": "If no tax shows, stop and ask."
 },
 {
  "id": "ISC-05",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "CRS610 - to confirm",
  "title": "Retail customer has a resale or tax-exempt certificate",
  "lookFor": "We can handle the exemption with no account to store it on.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The walk-in hands you a resale certificate.",
  "steps": [
   "Check with your SME how tax-exempt walk-ins are handled.",
   "Keep a copy of the certificate."
  ],
  "good": "Tax is removed only with a valid certificate on file.",
  "careful": "No certificate, no exemption."
 },
 {
  "id": "ISC-06",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "OIS210 / ARS110 - to confirm",
  "title": "Take payment at the ISC counter",
  "lookFor": "Cash or card goes through the cash desk. Material is released only once it's paid.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Take payment at the ISC counter.",
  "steps": [
   "Take the payment in the cash desk (OIS210 / ARS110)."
  ],
  "good": "The payment matches the sale and the order is paid.",
  "careful": "Count change back. Note card vs cash."
 },
 {
  "id": "ISC-07",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "ARS110 - to confirm",
  "title": "Close out the ISC drawer at end of day",
  "lookFor": "Drawer balances by location.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Close out the ISC drawer at end of day.",
  "steps": [
   "Count the drawer.",
   "Close the cash desk in ARS110."
  ],
  "good": "The drawer matches M3 to the penny.",
  "careful": "If it's off, report it. Don't adjust it."
 },
 {
  "id": "ISC-08",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "OIS300 / ARS110 - to confirm",
  "title": "Retail return or refund",
  "lookFor": "Refund goes back to the original card or as cash, and the stock goes back into the ISC.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A walk-in returns a bucket of adhesive for a refund.",
  "steps": [
   "Create the return (OIS300).",
   "Refund the way your SME shows you."
  ],
  "good": "The return and refund are recorded and match.",
  "careful": "Check the receipt and the return rules first."
 },
 {
  "id": "ISC-09",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "OIS100 / PPS200 - to confirm",
  "title": "Retail customer wants something not in the ISC",
  "lookFor": "We can sell from warehouse stock or special order it on the retail account, with prepayment.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A walk-in wants an item the ISC doesn't carry.",
  "steps": [
   "Check main warehouse stock.",
   "Order it for them the way your SME shows you."
  ],
  "good": "The customer knows when it will be ready.",
  "careful": "Take payment or a deposit the way your SME says."
 },
 {
  "id": "ISC-10",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "OIS100 / MWS410 - to confirm",
  "title": "Installer with an account does a will-call at the ISC and charges it",
  "lookFor": "Credit is checked before release.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "An installer with an account picks up at the ISC and charges it.",
  "steps": [
   "Enter the order on the installer's account (OIS100).",
   "Release it as will-call (MWS410)."
  ],
  "good": "The sale is on the installer's account, not the retail account.",
  "careful": "Check they are allowed to charge on that account."
 },
 {
  "id": "ISC-11",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "MWS410 - to confirm",
  "title": "Installer picks up an order a dealer placed and paid for",
  "lookFor": "Pickup paperwork shows no pricing.",
  "today": "WHD-13 (do we do this: Yes)\n1. Will-call personnel print the picking label.\n2. Pull the order.\n3. Match the paperwork to the customer order.\n4. Change the order to Ship status.\nWho: Will-call personnel; warehouse personnel\nHow often: Daily\nTo confirm: Confirm the Dancik screen/option and how pricing is suppressed on pickup paperwork.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "An installer picks up an order a dealer already placed and paid for.",
  "steps": [
   "Find the dealer's order.",
   "Check the installer is allowed to pick it up.",
   "Release it (MWS410)."
  ],
  "good": "The right person picks up the right order.",
  "careful": "Check the pickup authorization first."
 },
 {
  "id": "ISC-12",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "MMS060 / MMS010 - to confirm",
  "title": "See ISC stock separately from main warehouse stock",
  "lookFor": "We can see what's on the ISC floor vs the warehouse.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "\"How much is on the ISC floor vs the warehouse?\"",
  "steps": [
   "Ctrl+S, MMS060, look at the ISC location or warehouse."
  ],
  "good": "You can tell ISC stock from warehouse stock.",
  "careful": "Ask your SME how the ISC is set up in M3."
 },
 {
  "id": "ISC-13",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "MMS100 - to confirm",
  "title": "Restock the ISC from the warehouse",
  "lookFor": "The move or transfer is recorded and both quantities stay right.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The ISC is low on adhesive. Restock it from the warehouse.",
  "steps": [
   "Create the move or transfer (MMS100)."
  ],
  "good": "The ISC gets the stock and the warehouse balance goes down.",
  "careful": "Check if it is a move or a transfer for your location."
 },
 {
  "id": "ISC-14",
  "dept": "Warehouse",
  "module": "cashDesk",
  "topic": "ISC (proshop)",
  "program": "OIS300 / reporting - to confirm",
  "title": "Retail sales report by location",
  "lookFor": "Retail sales for 99, 95 and 96 can be pulled separately.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Your manager wants retail sales by location for last month.",
  "steps": [
   "Ask your SME which report shows this."
  ],
  "good": "You can pull retail sales by location.",
  "careful": "The report may not exist yet. Write down what you need."
 },
 {
  "id": "WHS-050",
  "dept": "Warehouse",
  "module": "logistics",
  "topic": "Pack & Ship",
  "program": "OIS100 / MWS410 - to confirm",
  "title": "Reserve material for a scheduled job date",
  "lookFor": "Customer wants material held for a job date. How is it kept from being picked for another order, and is anything physically staged?",
  "today": "WHD-15 (do we do this: No — physical will-call staging)\n1. Will-call orders are not physically staged in advance.\n2. Dancik allocates material to prepaid orders.\n3. Customers pick up allocated orders on their scheduled pickup dates.\nWho: Order desk; Collections Department\nHow often: Daily\nDancik screen: Dancik — option not provided\nTo confirm: Current practice distinguishes system allocation from physical staging. Confirm whether the “Do we do this?” answer should be split into separate reservation and staging scenarios.\n(from D.M.)",
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A builder wants material held for a job scheduled in 3 weeks.",
  "steps": [
   "Enter the order with the job date (OIS100).",
   "Reserve the stock the way your SME shows you."
  ],
  "good": "The stock is held for the job and not sold to someone else.",
  "careful": "Check how long a reservation can be held."
 },
 {
  "id": "PUR-001",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Replenishment",
  "program": "MMS002",
  "title": "Maintain replenishment parameters for an item",
  "lookFor": "Min/max, reorder point, safety stock - where do those numbers come from today and how often are they reviewed?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The adhesive keeps running out. Change its reorder point and safety stock.",
  "steps": [
   "Ctrl+S, MMS002, open the item for your warehouse.",
   "Look at the reorder point, safety stock and order quantity.",
   "Change them only if your SME says."
  ],
  "good": "You know where the replenishment numbers are and what each one does.",
  "careful": "These drive what gets bought. Changes need approval."
 },
 {
  "id": "PUR-004",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Replenishment",
  "program": "MRS001",
  "title": "Forecast seasonal or promotional demand",
  "lookFor": "Do you plan ahead for a promo or a container program? How?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: a promotion next month will double sales of one item.",
  "steps": [
   "Ask your SME how a forecast is changed (MRS001)."
  ],
  "good": "You know where demand is planned and who adjusts it.",
  "careful": "Talk-through first. Planning isn't working in TST yet (gap G-001)."
 },
 {
  "id": "PUR-005",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS200",
  "title": "Create a purchase order header",
  "lookFor": "Which fields matter most and which are always the same?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Start a new PO to the mill.",
  "steps": [
   "Ctrl+S, PPS200.",
   "Enter the supplier, warehouse and order type."
  ],
  "good": "A PO header for the right supplier and warehouse.",
  "careful": "Use the TEST supplier in practice, not a real mill."
 },
 {
  "id": "PUR-006",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS200",
  "title": "Create PO lines in the mill's unit of measure",
  "lookFor": "Mill sells in rolls, we stock in SF. Where does that conversion happen today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Add lines to the PO in the mill's unit (rolls / pallets).",
  "steps": [
   "On the PO, add the item and quantity in the mill's unit.",
   "Check M3 converts it to our stocking unit."
  ],
  "good": "The PO line is in the mill's unit and converts correctly.",
  "careful": "A wrong conversion means the wrong amount shows up."
 },
 {
  "id": "PUR-007",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS200",
  "title": "Generate and send the PO document",
  "lookFor": "Email, portal, EDI, fax? Per supplier - list them.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Send the PO to the mill.",
  "steps": [
   "Print or send the PO document from PPS200."
  ],
  "good": "The supplier gets a PO that matches M3.",
  "careful": "Check where it is going before you send from TST."
 },
 {
  "id": "PUR-008",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "EDI",
  "title": "Send an EDI 850 to the supplier",
  "lookFor": "Which suppliers take EDI POs?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: the mill takes POs by EDI 850.",
  "steps": [
   "Ask your SME which suppliers get EDI POs."
  ],
  "good": "You know which suppliers use EDI and who checks it.",
  "careful": "Talk-through only."
 },
 {
  "id": "PUR-009",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS200",
  "title": "Record the supplier's PO confirmation",
  "lookFor": "How do you record a mill acknowledgement and a changed ship date?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The mill confirmed the PO with a ship date.",
  "steps": [
   "Ctrl+S, PPS200, open the PO.",
   "Record the confirmed date and quantity."
  ],
  "good": "The PO shows confirmed with the mill's date.",
  "careful": "Use the mill's date, not the date you asked for."
 },
 {
  "id": "PUR-010",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS200",
  "title": "Reverse a PO confirmation",
  "lookFor": "When does this happen and who does it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "You confirmed the wrong PO. Reverse it.",
  "steps": [
   "Open the PO in PPS200 and reverse the confirmation."
  ],
  "good": "The PO is back to unconfirmed.",
  "careful": "Ask your SME if a reversal is allowed after a certain point."
 },
 {
  "id": "PUR-011",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS200",
  "title": "Change a PO - quantity, price, or date",
  "lookFor": "What is the process and does the supplier get a revised document?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The mill can only send 8 rolls, not 10, and a week later.",
  "steps": [
   "Open the PO in PPS200.",
   "Change the quantity and date."
  ],
  "good": "The PO shows 8 rolls on the new date.",
  "careful": "Tell Customer Service if a customer order is waiting on it."
 },
 {
  "id": "PUR-012",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS200",
  "title": "Cancel a PO or a PO line",
  "lookFor": "Who approves a cancellation, especially on a special order?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Cancel one line on the PO.",
  "steps": [
   "Open the PO in PPS200 and cancel the line."
  ],
  "good": "The line is cancelled and the rest of the PO is untouched.",
  "careful": "Tell the mill too. Cancelling in M3 doesn't tell them."
 },
 {
  "id": "PUR-013",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS300",
  "title": "Handle a partial receipt against a PO",
  "lookFor": "Does the PO stay open? For how long before someone chases it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Only half the PO arrived.",
  "steps": [
   "Receive the half in PPS300.",
   "Check the rest stays open."
  ],
  "good": "Half received, half still open on the PO.",
  "careful": "Don't close the line unless the mill says the rest isn't coming."
 },
 {
  "id": "PUR-014",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS200",
  "title": "Track an import container from order to arrival",
  "lookFor": "What milestones do you track and where do you track them today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "An import container is on the water. Track it.",
  "steps": [
   "Ask your SME where container and ETA info is kept on the PO."
  ],
  "good": "You can say where the container is and when it is due.",
  "careful": "Update the ETA when it changes."
 },
 {
  "id": "PUR-015",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS300",
  "title": "Review the open PO report and expedite",
  "lookFor": "What is your daily or weekly purchasing routine?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Run the open PO list and chase the late ones.",
  "steps": [
   "Ctrl+S, PPS300 (or the PO list), filter to past due.",
   "Pick one and record the follow-up."
  ],
  "good": "A list of late POs and a note on each one you chased.",
  "careful": "Start with the ones customers are waiting on."
 },
 {
  "id": "PUR-016",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Purchase Orders",
  "program": "PPS200",
  "title": "Create a special order PO tied to a customer order",
  "lookFor": "How is a special order linked to the CO so it does not get sold to someone else?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A customer ordered a special-order item. Create the PO tied to it.",
  "steps": [
   "Create the PO from the customer order the way your SME shows you."
  ],
  "good": "The PO is linked to the customer order.",
  "careful": "The customer usually can't cancel special orders. Check that was told."
 },
 {
  "id": "PUR-017",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Supplier Costing",
  "program": "PPS300",
  "title": "Apply landed cost / freight to a receipt",
  "lookFor": "Duty, freight, brokerage - how do those land on item cost today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Add the freight to the receipt so the cost is right.",
  "steps": [
   "Ask your SME how landed cost / freight is added (PPS300)."
  ],
  "good": "The item cost includes freight.",
  "careful": "Wrong landed cost means wrong margins."
 },
 {
  "id": "PUR-018",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Supplier Costing",
  "program": "PPS200",
  "title": "Process a mill price increase",
  "lookFor": "New price list arrives. What has to change and who tells sales?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The mill raised prices 5% starting next month.",
  "steps": [
   "Update the purchase price with the effective date (PPS100 / agreement)."
  ],
  "good": "The new price starts on the right date and old POs keep the old price.",
  "careful": "Tell Pricing so sell prices can be checked."
 },
 {
  "id": "PUR-019",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Supplier Costing",
  "program": "PPS040",
  "title": "Maintain supplier item / mill item cross-reference",
  "lookFor": "Where does the mill's item number live today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Link the mill's item number to ours.",
  "steps": [
   "Ctrl+S, PPS040, add the supplier item number."
  ],
  "good": "The PO shows the mill's number.",
  "careful": "One mill number per item. Check for duplicates."
 },
 {
  "id": "PUR-020",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Supplier Costing",
  "program": "PPS100",
  "title": "Maintain a purchase agreement or contract price",
  "lookFor": "Which suppliers have contract pricing and how is it honored on the PO?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Set up a contract price with the mill.",
  "steps": [
   "Ctrl+S, PPS100, create the agreement with the price and dates."
  ],
  "good": "New POs pick up the contract price.",
  "careful": "Use start and end dates."
 },
 {
  "id": "PUR-021",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Supplier Returns",
  "program": "PPS390",
  "title": "Create a claim order to the supplier",
  "lookFor": "What has to be documented before the mill accepts a claim?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Create a claim to the mill for defective rolls.",
  "steps": [
   "Ctrl+S, PPS390, create the claim."
  ],
  "good": "A claim with the item, lot and quantity.",
  "careful": "Keep the lot number and photos."
 },
 {
  "id": "PUR-022",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Supplier Returns",
  "program": "PPS390",
  "title": "Generate the claim note / RGA paperwork",
  "lookFor": "What document goes to the mill?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Print the claim / RGA paperwork for the mill.",
  "steps": [
   "From PPS390, print the claim note."
  ],
  "good": "The mill gets claim paperwork that matches M3.",
  "careful": "Check where it prints in TST."
 },
 {
  "id": "PUR-023",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Supplier Returns",
  "program": "MWS410",
  "title": "Ship rejected product back to the supplier",
  "lookFor": "Who pays freight and how is it tracked?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Ship the rejected rolls back to the mill.",
  "steps": [
   "Ask your SME how the return to supplier ships (MWS410)."
  ],
  "good": "The rolls leave stock and the claim shows them sent.",
  "careful": "Get the mill's RGA number first."
 },
 {
  "id": "PUR-024",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Supplier Returns",
  "program": "PPS300",
  "title": "Receive the replacement delivery",
  "lookFor": "How is a replacement receipt kept separate from a normal receipt?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The mill sent the replacement rolls.",
  "steps": [
   "Receive them in PPS300 against the claim or new PO."
  ],
  "good": "The replacement is received and the claim can be closed.",
  "careful": "Check the new lot. Don't mix it with the old one."
 },
 {
  "id": "PUR-025",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Supplier Master",
  "program": "CRS620",
  "title": "Set up a new supplier",
  "lookFor": "What has to be collected before a supplier can be used? Who approves?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Set up a new supplier.",
  "steps": [
   "Ctrl+S, CRS620, create the supplier with terms and address."
  ],
  "good": "A new supplier ready for POs and AP.",
  "careful": "Check the supplier doesn't already exist under another name."
 },
 {
  "id": "PUR-026",
  "dept": "Purchasing",
  "module": "purchasing",
  "topic": "Supplier Master",
  "program": "PPS040",
  "title": "Maintain supplier lead times and minimums",
  "lookFor": "Where are lead times and order minimums recorded today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The mill now takes 3 weeks and has a 10-roll minimum.",
  "steps": [
   "Ctrl+S, PPS040, update lead time and minimum."
  ],
  "good": "The supplier item shows the new lead time and minimum.",
  "careful": "This changes buy suggestions. Check with your SME."
 },
 {
  "id": "FIN-001",
  "dept": "Finance",
  "module": "credit",
  "topic": "Credit Control",
  "program": "OIS300",
  "title": "Review the orders currently on credit hold",
  "lookFor": "Show your daily hold review routine. How many orders, how long does it take?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Morning routine: review every order sitting on credit hold.",
  "steps": [
   "Ctrl+S, OIS300, filter to orders on credit hold.",
   "Open one and see why it is held."
  ],
  "good": "A list of held orders and the reason for each.",
  "careful": "Work the oldest and biggest first."
 },
 {
  "id": "FIN-003",
  "dept": "Finance",
  "module": "credit",
  "topic": "Credit Control",
  "program": "OIS300",
  "title": "Put an order or a customer on hold",
  "lookFor": "What triggers a hold - aging, limit, dispute? Is it automatic or manual?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A customer is 90 days past due. Put them on hold.",
  "steps": [
   "Ctrl+S, CRS610, open the customer and set the hold (or hold one order in OIS300)."
  ],
  "good": "New orders for that customer stop at credit.",
  "careful": "Tell Customer Service and the rep."
 },
 {
  "id": "FIN-004",
  "dept": "Finance",
  "module": "credit",
  "topic": "Credit Control",
  "program": "CRS610",
  "title": "Set or change a customer credit limit",
  "lookFor": "What is the approval chain for a limit increase?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A builder's credit limit goes from $25,000 to $40,000.",
  "steps": [
   "Ctrl+S, CRS610, open the customer.",
   "Change the credit limit."
  ],
  "good": "The new limit shows, and their held orders re-check against it.",
  "careful": "Only with approval. Note who approved it."
 },
 {
  "id": "FIN-005",
  "dept": "Finance",
  "module": "credit",
  "topic": "Credit Control",
  "program": "CRS610",
  "title": "Process a new customer credit application",
  "lookFor": "Full onboarding: application, references, terms, tax exemption, first order.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A new customer turned in a credit application.",
  "steps": [
   "Review the application the way your SME shows you.",
   "Set terms and limit in CRS610."
  ],
  "good": "The customer has approved terms and a limit.",
  "careful": "Use a TEST customer to practice."
 },
 {
  "id": "FIN-006",
  "dept": "Finance",
  "module": "credit",
  "topic": "Credit Control",
  "program": "CRS610",
  "title": "Maintain tax exemption certificates",
  "lookFor": "Where are certificates stored and how do you know when one expires?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A customer sent a new tax exemption certificate.",
  "steps": [
   "Ctrl+S, CRS610, update the tax code and certificate date."
  ],
  "good": "The customer is tax exempt with a valid certificate on file.",
  "careful": "Watch the expiration date."
 },
 {
  "id": "FIN-007",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Application",
  "program": "ARS100",
  "title": "Record a check payment",
  "lookFor": "Daily check run - how many, how long, what is manual?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A check came in for $4,250. Record it.",
  "steps": [
   "Ctrl+S, ARS100, enter the payment and apply it to the invoices."
  ],
  "good": "The payment is applied and the invoices are closed.",
  "careful": "Match the check stub to the invoices."
 },
 {
  "id": "FIN-008",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Application",
  "program": "ARS100",
  "title": "Record a credit card payment and the CC fee",
  "lookFor": "Who takes card payments and how is the fee recorded?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A customer pays by credit card and there is a card fee.",
  "steps": [
   "Record the card payment in ARS100.",
   "Add the fee the way your SME shows you."
  ],
  "good": "Payment and fee are recorded and the invoice is closed.",
  "careful": "Ask how the card fee posts."
 },
 {
  "id": "FIN-009",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Application",
  "program": "ARS100",
  "title": "Process lockbox payments",
  "lookFor": "What file comes in, how is it applied, what percentage auto-matches?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The lockbox file came in. Process it.",
  "steps": [
   "Ask your SME how the lockbox file loads into ARS100."
  ],
  "good": "Payments from the file are applied, and exceptions are listed.",
  "careful": "Talk-through until the lockbox is connected."
 },
 {
  "id": "FIN-010",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Application",
  "program": "Rhythm",
  "title": "Process payments through Rhythm",
  "lookFor": "What comes through the portal and how does it post?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: a customer paid on the Rhythm website.",
  "steps": [
   "Ask your SME how Rhythm payments reach M3."
  ],
  "good": "You know where web payments show up.",
  "careful": "Talk-through only."
 },
 {
  "id": "FIN-011",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Application",
  "program": "ARS100",
  "title": "Apply a payment across multiple invoices",
  "lookFor": "Customer pays a lump sum. How do you decide what it covers?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "One check pays five invoices.",
  "steps": [
   "Ctrl+S, ARS100, enter the payment.",
   "Apply it across all five invoices."
  ],
  "good": "All five invoices are closed by one payment.",
  "careful": "The check total must match the invoices applied."
 },
 {
  "id": "FIN-012",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Application",
  "program": "ARS110",
  "title": "Handle a short pay / deduction",
  "lookFor": "Customer short-pays for damage. Walk through resolution.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The customer short-paid $180 and says it's for damage.",
  "steps": [
   "Apply the payment in ARS110.",
   "Leave the $180 as a deduction with a reason."
  ],
  "good": "The deduction is open with a reason so someone can chase it.",
  "careful": "Don't write it off without approval."
 },
 {
  "id": "FIN-013",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Application",
  "program": "ARS110",
  "title": "Process a debit note",
  "lookFor": "What is a debit note used for here and who creates it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Create a debit note to charge the customer.",
  "steps": [
   "Ctrl+S, ARS110, create the debit note."
  ],
  "good": "The customer owes the extra amount.",
  "careful": "Note the reason."
 },
 {
  "id": "FIN-014",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Application",
  "program": "ARS100",
  "title": "Record a returned check",
  "lookFor": "NSF check. What happens to the customer's account and orders?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A customer's check bounced.",
  "steps": [
   "Ctrl+S, ARS100, reverse the payment.",
   "Add the NSF fee if your SME says."
  ],
  "good": "The invoices are open again.",
  "careful": "Tell Credit. Consider putting them on hold."
 },
 {
  "id": "FIN-015",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Application",
  "program": "ARS110",
  "title": "Perform a write-off",
  "lookFor": "Threshold, approval, and GL treatment.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Write off a $12 balance.",
  "steps": [
   "Ctrl+S, ARS110, write off with a reason."
  ],
  "good": "The balance is zero with a reason.",
  "careful": "Check the write-off limit you are allowed."
 },
 {
  "id": "FIN-016",
  "dept": "Finance",
  "module": "credit",
  "topic": "Collections",
  "program": "ARS200",
  "title": "View a customer's AR ledger / aging",
  "lookFor": "Which screen and what do you wish it showed?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A customer asks: \"What do I owe?\"",
  "steps": [
   "Ctrl+S, ARS200, open the customer's ledger and aging."
  ],
  "good": "You can give open invoices and how old they are.",
  "careful": "Count unapplied payments and credits too."
 },
 {
  "id": "FIN-017",
  "dept": "Finance",
  "module": "credit",
  "topic": "Collections",
  "program": "ARS500",
  "title": "Generate statements of account",
  "lookFor": "How often, and how are they delivered?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Print statements for all customers.",
  "steps": [
   "Ctrl+S, ARS500, run statements."
  ],
  "good": "Statements for every customer with a balance.",
  "careful": "Don't send from TST."
 },
 {
  "id": "FIN-018",
  "dept": "Finance",
  "module": "credit",
  "topic": "Collections",
  "program": "ARS150",
  "title": "Create and maintain payment reminders / dunning",
  "lookFor": "How many dunning levels, at what day counts, and what does each say?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Send reminders to customers 30+ days past due.",
  "steps": [
   "Ctrl+S, ARS150, run the reminder."
  ],
  "good": "Reminders for the right customers.",
  "careful": "Don't send from TST."
 },
 {
  "id": "FIN-019",
  "dept": "Finance",
  "module": "credit",
  "topic": "Collections",
  "program": "ARS160",
  "title": "Create an interest / finance charge invoice",
  "lookFor": "Do you actually charge interest? Under what circumstances?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Charge finance charges on past-due balances.",
  "steps": [
   "Ctrl+S, ARS160, create the interest invoices."
  ],
  "good": "Finance charge invoices for the right customers.",
  "careful": "Check which customers are excluded."
 },
 {
  "id": "FIN-020",
  "dept": "Finance",
  "module": "credit",
  "topic": "Collections",
  "program": "CRS610",
  "title": "Keep collection notes / ticklers on an account",
  "lookFor": "Where do notes live today and who else can see them?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "You called a customer about a late payment. Note it.",
  "steps": [
   "Ctrl+S, CRS610, add a note to the account.",
   "Set a follow-up date."
  ],
  "good": "The note and follow-up are on the account.",
  "careful": "Write who you talked to and what they promised."
 },
 {
  "id": "FIN-021",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Desk",
  "program": "ARS110",
  "title": "Take a counter payment at the cash desk",
  "lookFor": "Which locations take cash or card at the counter?",
  "today": null,
  "found": "Cash account order 000750 defaults COD + WC (CS-029). Cash desk user authorization is in OIS210.",
  "gap": null,
  "talk": false,
  "ask": "A customer pays at the counter.",
  "steps": [
   "Ctrl+S, ARS110 (cash desk), take the payment."
  ],
  "good": "Payment recorded against the right invoice or order.",
  "careful": "Give a receipt."
 },
 {
  "id": "FIN-022",
  "dept": "Finance",
  "module": "credit",
  "topic": "Cash Desk",
  "program": "ARS110",
  "title": "Reconcile and close the cash desk at end of day",
  "lookFor": "Daily close routine and who balances it.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Close the cash desk at end of day.",
  "steps": [
   "Count the drawer.",
   "Close the cash desk in ARS110."
  ],
  "good": "The drawer matches M3.",
  "careful": "Report any difference. Don't adjust it."
 },
 {
  "id": "FIN-023",
  "dept": "Finance",
  "module": "credit",
  "topic": "Billing",
  "program": "OIS180",
  "title": "Run the customer invoice batch",
  "lookFor": "When does invoicing run and what has to be true before it does?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Run today's invoices.",
  "steps": [
   "Ctrl+S, OIS180, run the invoice batch."
  ],
  "good": "Shipped orders are invoiced.",
  "careful": "This posts to the books. Practice only when your SME says."
 },
 {
  "id": "FIN-024",
  "dept": "Finance",
  "module": "credit",
  "topic": "Billing",
  "program": "EDI",
  "title": "Send the EDI 810 invoice",
  "lookFor": "Which customers are billed by EDI?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: a customer is billed by EDI 810.",
  "steps": [
   "Ask your SME which customers get EDI invoices."
  ],
  "good": "You know who gets EDI invoices.",
  "careful": "Talk-through only."
 },
 {
  "id": "FIN-025",
  "dept": "Finance",
  "module": "credit",
  "topic": "Billing",
  "program": "ARS120",
  "title": "Create a corrective invoice",
  "lookFor": "Difference between a corrective invoice and a credit - when do you use each?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "An invoice had the wrong price. Correct it.",
  "steps": [
   "Ctrl+S, ARS120, create the corrective invoice."
  ],
  "good": "A correction for just the difference.",
  "careful": "Link it to the original invoice."
 },
 {
  "id": "FIN-027",
  "dept": "Finance",
  "module": "credit",
  "topic": "Billing",
  "program": "CRS610",
  "title": "Handle sales tax on an order and invoice",
  "lookFor": "Which states, which exemptions, and what tool calculates it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Check the sales tax is right on an order and its invoice.",
  "steps": [
   "Check the tax on the order total (OIS100).",
   "Check the customer's tax setup (CRS610)."
  ],
  "good": "Tax is right for the ship-to.",
  "careful": "Tax goes by ship-to, not bill-to."
 },
 {
  "id": "FIN-028",
  "dept": "Finance",
  "module": "financeAP",
  "topic": "AP & Close",
  "program": "APS100",
  "title": "Match a supplier invoice to PO and receipt",
  "lookFor": "Three-way match - what percentage matches clean, and what do you do with the rest?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A mill invoice came in. Match it to the PO and receipt.",
  "steps": [
   "Ctrl+S, APS100, enter the invoice.",
   "Match it to the PO and receipt."
  ],
  "good": "Invoice, PO and receipt match.",
  "careful": "Only pay what was received."
 },
 {
  "id": "FIN-029",
  "dept": "Finance",
  "module": "financeAP",
  "topic": "AP & Close",
  "program": "APS100",
  "title": "Resolve a supplier invoice price or quantity discrepancy",
  "lookFor": "Who resolves it and how long does it typically take?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The mill invoice is $200 more than the PO.",
  "steps": [
   "Find whether it's price or quantity.",
   "Hold the invoice and contact Purchasing."
  ],
  "good": "The difference is explained before it's paid.",
  "careful": "Don't change the PO to match the invoice."
 },
 {
  "id": "FIN-030",
  "dept": "Finance",
  "module": "financeAP",
  "topic": "AP & Close",
  "program": "APS130",
  "title": "Run the AP payment cycle",
  "lookFor": "Check run cadence, approval, ACH vs check.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Run this week's AP payments.",
  "steps": [
   "Ctrl+S, APS130, run the payment proposal.",
   "Review it."
  ],
  "good": "A proposal with the right invoices.",
  "careful": "Don't release payments from TST."
 },
 {
  "id": "FIN-031",
  "dept": "Finance",
  "module": "credit",
  "topic": "AP & Close",
  "program": "OIS300",
  "title": "Calculate and report sales commissions",
  "lookFor": "What drives commission - margin, revenue, collected? Who produces the report?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: work out sales commissions for the month.",
  "steps": [
   "Ask your SME which report or data feeds commissions."
  ],
  "good": "You know where commission data comes from.",
  "careful": "Talk-through first."
 },
 {
  "id": "FIN-032",
  "dept": "Finance",
  "module": "financeGL",
  "topic": "AP & Close",
  "program": "GLS100",
  "title": "Perform month-end AR close and reconciliation",
  "lookFor": "Your close checklist. What has to tie out?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Month-end: close AR and reconcile it to the GL.",
  "steps": [
   "Ask your SME for the month-end steps (GLS100)."
  ],
  "good": "AR ties to the GL.",
  "careful": "Practice only in a planned close window."
 },
 {
  "id": "FIN-033",
  "dept": "Finance",
  "module": "financeGL",
  "topic": "AP & Close",
  "program": "GLS200",
  "title": "Review GL postings from sales and inventory",
  "lookFor": "Which postings do you check and how do you find a bad one?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Review what sales and inventory posted to the GL.",
  "steps": [
   "Ctrl+S, GLS200, look at postings for a date range."
  ],
  "good": "You can trace a sale to its GL entries.",
  "careful": "Look only. Don't post."
 },
 {
  "id": "COD-01",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "ARS110 / OIS210 (cash desk) - to confirm",
  "title": "One driver-collected payment covers multiple deliveries or invoices",
  "lookFor": "Payment can be allocated correctly, with each delivery and invoice traceable.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A driver collected one check that covers three deliveries.",
  "steps": [
   "Record one payment and apply it to all three (ARS110 / OIS210)."
  ],
  "good": "All three are paid by one payment.",
  "careful": "The check total must match."
 },
 {
  "id": "COD-02",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "OIS100 (payment method/terms), OIS120 - to confirm",
  "title": "Change an order from prepaid to driver collection, or vice versa",
  "lookFor": "Authorized staff can change the arrangement. Payment holds, collection instructions, and delivery paperwork update correctly.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Change an order from prepaid to driver collect.",
  "steps": [
   "Change the payment method on the order (OIS100)."
  ],
  "good": "The order shows the new payment method.",
  "careful": "Tell the driver and the warehouse."
 },
 {
  "id": "COD-03",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "OIS120 (credit release) - to confirm",
  "title": "Release an order without full payment as an approved exception",
  "lookFor": "Override access is restricted to authorized personnel, and the approval is documented in the audit history.",
  "today": null,
  "found": "Open: Will there be audit history on an order for changes made?",
  "gap": null,
  "talk": false,
  "ask": "Release a COD order without full payment as an approved exception.",
  "steps": [
   "Release from credit hold (OIS120) the way your SME shows you.",
   "Note who approved it."
  ],
  "good": "The order is released with the approval noted.",
  "careful": "Only with approval."
 },
 {
  "id": "COD-04",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "CRS610 / OIS100 - to confirm",
  "title": "Change a COD customer to approved credit terms",
  "lookFor": "Order was COD, then approved for credit terms. Need ability to change terms per order.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A COD customer is approved for terms.",
  "steps": [
   "Ctrl+S, CRS610, change payment terms and set a limit."
  ],
  "good": "The customer now orders on terms.",
  "careful": "Only with an approved credit application."
 },
 {
  "id": "COD-05",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "CRS610 - to confirm",
  "title": "Change a credit customer to COD",
  "lookFor": "Existing and new orders follow the intended payment and release requirements, while outstanding invoices remain accurate.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A credit customer goes back to COD.",
  "steps": [
   "Ctrl+S, CRS610, change terms to COD."
  ],
  "good": "New orders need payment first.",
  "careful": "Tell Customer Service and the rep."
 },
 {
  "id": "COD-06",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "ARS100 / Billtrust integration - to confirm",
  "title": "Customer pays through Billtrust or another online payment portal",
  "lookFor": "Payment transfers to Infor, matches the correct customer and order, and updates payment and release status within the expected time.",
  "today": null,
  "found": "Open: How does Billtrust post into M3, and how fast?",
  "gap": null,
  "talk": true,
  "ask": "Talk-through: a customer pays through Billtrust.",
  "steps": [
   "Ask your SME how Billtrust payments reach M3."
  ],
  "good": "You know where portal payments show up.",
  "careful": "Talk-through only."
 },
 {
  "id": "COD-07",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "ARS110 / OIS100 - to confirm",
  "title": "Quantity or price decreases after prepayment",
  "lookFor": "Excess payment is identified and can be refunded or retained as an account credit through the appropriate process.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A prepaid customer's order went down $150.",
  "steps": [
   "Change the order.",
   "Refund or hold the credit the way your SME shows you (ARS110)."
  ],
  "good": "The extra $150 is refunded or held as credit.",
  "careful": "Ask the customer which they want."
 },
 {
  "id": "COD-08",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "OIS100 / OIS120 - to confirm",
  "title": "Customer adds material after prepayment",
  "lookFor": "Additional charges are calculated and any remaining payment requirement is satisfied before release. Order was paid and released from credit; CS then adds material or shipping changes.",
  "today": null,
  "found": "Open: Will the order go back on credit hold until the additional payment is made?",
  "gap": null,
  "talk": false,
  "ask": "A prepaid customer adds material.",
  "steps": [
   "Add the line (OIS100).",
   "Collect the extra before it ships (OIS120)."
  ],
  "good": "The order is fully paid before release.",
  "careful": "Don't ship the add-on unpaid."
 },
 {
  "id": "COD-09",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "ARS110 / OIS210 - to confirm",
  "title": "One prepayment covers multiple orders",
  "lookFor": "Payment can be allocated across the intended orders without releasing other unpaid orders. Some customers pay for select orders as they need them.",
  "today": null,
  "found": "Open: Will payment received allocate to the correct customer orders?",
  "gap": null,
  "talk": false,
  "ask": "One prepayment covers two orders.",
  "steps": [
   "Apply the payment across both orders (ARS110 / OIS210)."
  ],
  "good": "Both orders show paid.",
  "careful": "Check the total covers both."
 },
 {
  "id": "COD-10",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "OIS210 / ARS110 - to confirm",
  "title": "Customer pays a partial deposit",
  "lookFor": "Deposit and remaining balance are visible. The order follows the required payment and release rules.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A customer pays a 50% deposit.",
  "steps": [
   "Record the deposit against the order (OIS210 / ARS110)."
  ],
  "good": "The order shows the deposit and the balance due.",
  "careful": "Collect the rest before release."
 },
 {
  "id": "COD-11",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "OIS100 / PPS200 / OIS210 - to confirm",
  "title": "COD customer orders special-order or nonstock material",
  "lookFor": "Customer prepays some or all of the COD order amount before the vendor order is placed. Infor tracks the prepayment and remaining balance, allows the vendor order to proceed once the required prepayment is received, and requires the remaining balance to be paid before the customer takes possession.",
  "today": null,
  "found": "Open: Merged: #11 and #13 on Mike's list were identical.",
  "gap": null,
  "talk": false,
  "ask": "A COD customer orders a special-order item.",
  "steps": [
   "Collect payment or deposit first.",
   "Then create the special order (OIS100 / PPS200)."
  ],
  "good": "Payment is in before the PO goes to the mill.",
  "careful": "Special orders usually can't be cancelled. Tell them."
 },
 {
  "id": "COD-12",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "CRS949 / MWS410 (document output) - to confirm",
  "title": "Customer prepays and sends an installer or end user to pick up material",
  "lookFor": "After payment by an approved method, staff can generate pickup paperwork excluding pricing, payment amounts, and other sensitive customer information. Keep material descriptions, quantities, order reference, and pickup acknowledgment. Pricing stays available internally. Test initial prints and reprints.",
  "today": null,
  "found": "WHD-13: Installer or end user picks up a prepaid order",
  "gap": null,
  "talk": false,
  "ask": "A customer prepays and sends their installer to pick up.",
  "steps": [
   "Note who can pick up on the order.",
   "Release at pickup (MWS410)."
  ],
  "good": "Only the named person picks up.",
  "careful": "Check ID or the name at pickup."
 },
 {
  "id": "COD-13",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "OIS100 (payment terms) - to confirm",
  "title": "Credit customer chooses to prepay an order",
  "lookFor": "Credit customer enters an order and decides to prepay. Orders are identified as prepaid and do not bill out with Net terms.",
  "today": null,
  "found": "Open: How are these orders identified?",
  "gap": null,
  "talk": false,
  "ask": "A credit customer wants to prepay this one order.",
  "steps": [
   "Set the payment on the order (OIS100) the way your SME shows you."
  ],
  "good": "The order is paid up front and their terms stay the same.",
  "careful": "Don't change the customer's terms."
 },
 {
  "id": "COD-14",
  "dept": "Finance",
  "module": "credit",
  "topic": "COD / Prepaid",
  "program": "ARS110 / ARS200 - to confirm",
  "title": "COD plus percentage",
  "lookFor": "Open account with financial issues: credit line pulled, agreed payment plan. Customer pays COD +20% toward existing debt. Need to identify or add this to a payment proposal for collecting purposes only.",
  "today": null,
  "found": "Open: How does the +20% get tracked against the old debt?",
  "gap": null,
  "talk": false,
  "ask": "A customer is COD plus a percentage on old balance.",
  "steps": [
   "Ask your SME how the extra percent is collected (ARS110 / ARS200)."
  ],
  "good": "Each payment covers the order plus the agreed percentage.",
  "careful": "Note the agreement on the account."
 },
 {
  "id": "SYS-001",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Getting Started in M3",
  "program": "M3",
  "title": "Log in to M3 and reach my start page",
  "lookFor": "Confirm you can sign in, land on a start page, and get back to it. Note anything that blocked you.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Get into M3 TST and land on your start page.",
  "steps": [
   "Click the Adleta TST box on the sign-in page.",
   "Check the TST badge and company 100."
  ],
  "good": "You are in M3 TST on your start page.",
  "careful": "If you don't see TST, stop."
 },
 {
  "id": "SYS-002",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Getting Started in M3",
  "program": "M3",
  "title": "Find a program by name or shortcut",
  "lookFor": "Practice opening 3 programs from your area by typing the program ID.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Open OIS300 without using the menu.",
  "steps": [
   "Press Ctrl+S, type OIS300, press Enter."
  ],
  "good": "OIS300 opens.",
  "careful": "Use Ctrl+S, not the browser search."
 },
 {
  "id": "SYS-003",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Getting Started in M3",
  "program": "M3",
  "title": "Personalize a list or panel in H5",
  "lookFor": "Add and reorder the columns you actually need on one list you will use daily.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Make the OIS300 list show the columns you use.",
  "steps": [
   "Open OIS300.",
   "Use the view editor (pencil) to add or move columns."
  ],
  "good": "The list shows your columns every time.",
  "careful": "Save it as your own view, not the shared one."
 },
 {
  "id": "SYS-004",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Getting Started in M3",
  "program": "M3",
  "title": "Save a favorite / shortcut for daily programs",
  "lookFor": "Build your own shortcut bar for the 5 programs you will use most.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Add your daily programs to Favorites.",
  "steps": [
   "Open the program, then add it to Favorites."
  ],
  "good": "Your programs are one click away.",
  "careful": "Keep it to the ones you really use."
 },
 {
  "id": "SYS-005",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Getting Started in M3",
  "program": "M3",
  "title": "Understand company, division, facility, warehouse",
  "lookFor": "Write down in your own words which warehouse and facility your work happens in.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Explain company, division, facility and warehouse to a new hire.",
  "steps": [
   "Open MMS060 and point out each one on a stock line."
  ],
  "good": "You can explain where each one shows up.",
  "careful": "Adleta is company 100."
 },
 {
  "id": "SYS-006",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Reporting",
  "program": "Dancik",
  "title": "List the Dancik reports I cannot live without",
  "lookFor": "Name every report you run today, how often, and what decision it drives. Attach a sample if you can.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: list the old reports you can't live without.",
  "steps": [
   "Write down each report, who uses it, and how often."
  ],
  "good": "A list Reporting can work from.",
  "careful": "Talk-through only."
 },
 {
  "id": "SYS-007",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Reporting",
  "program": "M3",
  "title": "Run and export a standard M3 report",
  "lookFor": "Once you have access, run one report in your area and export it.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Run a standard list and export it to Excel.",
  "steps": [
   "Open the program list (e.g. OIS300).",
   "Filter it and export to Excel."
  ],
  "good": "An Excel file with the filtered list.",
  "careful": "Export only what you need."
 },
 {
  "id": "SYS-008",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Reporting",
  "program": "M3",
  "title": "Build an ad-hoc query or list I use today",
  "lookFor": "Which lookups do you do off-system today - green screen, Excel, someone else's spreadsheet?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Build a list you use every day, like open orders for your customers.",
  "steps": [
   "Use the list filters and a saved view."
  ],
  "good": "A saved view you can reopen.",
  "careful": "Name it clearly."
 },
 {
  "id": "SYS-009",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Reporting",
  "program": "M3",
  "title": "Dashboard or KPI I watch daily",
  "lookFor": "What number do you check first thing every morning and where does it come from?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: which numbers do you watch every day?",
  "steps": [
   "Write them down and ask your SME where they will live (dashboard / Birst)."
  ],
  "good": "A list of daily KPIs.",
  "careful": "Talk-through only."
 },
 {
  "id": "SYS-010",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Integrations & Output",
  "program": "CRS290",
  "title": "Printer setup and document routing",
  "lookFor": "Which printers exist at each location and which documents go to each?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: which printer does each document go to?",
  "steps": [
   "Ask your SME how printers are set up (CRS290)."
  ],
  "good": "You know where your documents print.",
  "careful": "Setup is for admins."
 },
 {
  "id": "SYS-011",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Integrations & Output",
  "program": "CRS949",
  "title": "Document output: email vs print per customer",
  "lookFor": "Who currently controls whether a customer gets emailed or printed paperwork?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: should this customer get invoices by email or print?",
  "steps": [
   "Ask your SME where that is set (CRS949)."
  ],
  "good": "You know where it is set and who sets it.",
  "careful": "Setup is for admins."
 },
 {
  "id": "SYS-012",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Integrations & Output",
  "program": "EDI",
  "title": "EDI trading partner map",
  "lookFor": "List every EDI partner, which documents, and who supports it today.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: which customers and suppliers use EDI?",
  "steps": [
   "List the trading partners and documents (850, 855, 856, 810)."
  ],
  "good": "A trading partner list.",
  "careful": "Talk-through only."
 },
 {
  "id": "SYS-013",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Integrations & Output",
  "program": "Sales Hub",
  "title": "Sales Hub / mobile access for outside sales",
  "lookFor": "What do reps need in the field and what do they use today?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: how will outside sales look things up on the road?",
  "steps": [
   "Ask your SME about Sales Hub / mobile."
  ],
  "good": "You know what outside sales will use.",
  "careful": "Talk-through only."
 },
 {
  "id": "SYS-014",
  "dept": "IT & Reporting",
  "module": "reporting",
  "topic": "Integrations & Output",
  "program": "IT",
  "title": "Third-party systems that touch orders or inventory",
  "lookFor": "FreightPOP, ePOD, Rhythm, B2B, anything else. What flows in and out?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: which other systems touch orders or stock?",
  "steps": [
   "List them (Rhythm, iNRiver, FreightPOP, EDI, ePOD, Billtrust...)."
  ],
  "good": "A full list of systems and what each one does.",
  "careful": "Talk-through only."
 },
 {
  "id": "MDM-001",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Item Master",
  "program": "MMS001",
  "title": "Set up a new stock item",
  "lookFor": "Who requests a new item, what has to be supplied, and how long does setup take?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Set up a new stock item.",
  "steps": [
   "Ctrl+S, MMS001, create from a template item.",
   "Fill in description, units and item group."
  ],
  "good": "A new item ready to connect to warehouses.",
  "careful": "Practice on a TEST item only."
 },
 {
  "id": "MDM-002",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Item Master",
  "program": "MMS015",
  "title": "Set up alternate units of measure (SF, CT, PL)",
  "lookFor": "How are conversion factors sourced and verified? What happens when they are wrong?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "The item sells in SF but stocks in cartons. Set up the conversion.",
  "steps": [
   "Ctrl+S, MMS015, add SF, CT and PL with factors."
  ],
  "good": "Orders in SF convert to cartons correctly.",
  "careful": "Get the SF per carton from the mill sheet. A wrong factor breaks every order."
 },
 {
  "id": "MDM-003",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Item Master",
  "program": "MMS025",
  "title": "Set up an item alias (customer or mill number)",
  "lookFor": "Which aliases matter and who maintains them?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A customer uses their own number for our item. Add it.",
  "steps": [
   "Ctrl+S, MMS025, add the alias for the customer."
  ],
  "good": "Orders with the customer's number find our item.",
  "careful": "One alias per customer per item."
 },
 {
  "id": "MDM-004",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Item Master",
  "program": "MMS002",
  "title": "Connect an item to a warehouse and facility",
  "lookFor": "Who decides which warehouses stock a given item?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Connect the new item to the Carrollton warehouse.",
  "steps": [
   "Ctrl+S, MMS002, add the item to the warehouse."
  ],
  "good": "The item can be stocked and sold from that warehouse.",
  "careful": "Ask who decides which warehouses stock it."
 },
 {
  "id": "MDM-005",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Item Master",
  "program": "MMS001",
  "title": "Maintain item attributes (color, pattern, shade, grade)",
  "lookFor": "Which attributes are required, and which ones drive the B2B catalog?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Add color, pattern, shade and grade to the item.",
  "steps": [
   "Ctrl+S, MMS001, fill in the attributes."
  ],
  "good": "The item shows its attributes.",
  "careful": "Use the standard values, not free text."
 },
 {
  "id": "MDM-007",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Item Master",
  "program": "MMS001",
  "title": "Maintain item costing method",
  "lookFor": "What costing method is used and who can change it?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": true,
  "ask": "Talk-through: what costing method does the item use?",
  "steps": [
   "Look at the costing fields in MMS001 with your SME."
  ],
  "good": "You can explain the item's costing method.",
  "careful": "Look, don't change."
 },
 {
  "id": "MDM-008",
  "dept": "Master Data",
  "module": "reporting",
  "topic": "Pricing",
  "program": "OIS017",
  "title": "Create and maintain a price list",
  "lookFor": "How many price lists exist and who owns each?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Create a price list.",
  "steps": [
   "Ctrl+S, OIS017, create a TEST price list.",
   "Add a few items and prices."
  ],
  "good": "A price list with items and prices.",
  "careful": "Practice on a TEST list only. Don't touch live lists."
 },
 {
  "id": "MDM-009",
  "dept": "Master Data",
  "module": "reporting",
  "topic": "Pricing",
  "program": "OIS017",
  "title": "Effective-date a price change",
  "lookFor": "How far ahead are price changes loaded and how are open quotes handled?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A price goes up on the 1st of next month.",
  "steps": [
   "In OIS017, add the new price with a start date."
  ],
  "good": "The old price works until then, the new one after.",
  "careful": "Don't overwrite today's price."
 },
 {
  "id": "MDM-010",
  "dept": "Master Data",
  "module": "reporting",
  "topic": "Pricing",
  "program": "OIS017",
  "title": "Maintain a customer-specific agreement price",
  "lookFor": "How many customers have negotiated pricing and where does it live?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "A builder gets a special price on one item.",
  "steps": [
   "Set up the customer agreement price in OIS017."
  ],
  "good": "That customer gets the special price on orders.",
  "careful": "Add an end date."
 },
 {
  "id": "MDM-011",
  "dept": "Master Data",
  "module": "reporting",
  "topic": "Pricing",
  "program": "OIS017",
  "title": "Set up a promotion or discount model",
  "lookFor": "What kinds of promos run and how are they applied at order entry?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Set up 10% off a product line for one month.",
  "steps": [
   "Set up the promotion / discount model in OIS017."
  ],
  "good": "Orders in that month get 10% off that line.",
  "careful": "Check start and end dates."
 },
 {
  "id": "MDM-012",
  "dept": "Master Data",
  "module": "reporting",
  "topic": "Pricing",
  "program": "CRS275",
  "title": "Maintain order and line charge codes",
  "lookFor": "Full list of charges we bill and what each is for.",
  "today": null,
  "found": "Charge codes in TST: BACKFR, DELFEE, DRFC01, FUELSC, HNDFEE, JOBDEL, LIFTGC, MISFRT, MTHFRT, PARCEL, RESDEL. No broken carton or general surcharge.",
  "gap": "G-002",
  "talk": true,
  "ask": "Talk-through: which order charges do we need (fuel, broken carton, restock)?",
  "steps": [
   "Look at CRS275 with your SME."
  ],
  "good": "A list of charges we need and which are missing.",
  "careful": "Some are missing today (gap G-002)."
 },
 {
  "id": "MDM-013",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Customer Master",
  "program": "CRS610",
  "title": "Create a new customer",
  "lookFor": "Every field someone has to fill in and where the data comes from.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Create a new customer.",
  "steps": [
   "Ctrl+S, CRS610, create from a template customer."
  ],
  "good": "A customer ready for orders.",
  "careful": "Check they don't already exist. Practice with a TEST name."
 },
 {
  "id": "MDM-014",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Customer Master",
  "program": "OIS002",
  "title": "Add a ship-to address or jobsite",
  "lookFor": "How many ship-tos does a typical customer have? Are jobsites permanent or one-time?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Add a jobsite ship-to for a builder.",
  "steps": [
   "Ctrl+S, OIS002, add the address."
  ],
  "good": "Orders can ship to the jobsite.",
  "careful": "Check the address for delivery instructions."
 },
 {
  "id": "MDM-015",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Customer Master",
  "program": "CRS611",
  "title": "Maintain customer contacts",
  "lookFor": "Who is the AP contact vs. the buyer, and where is that recorded?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Add the customer's AP contact.",
  "steps": [
   "Ctrl+S, CRS611, add the contact."
  ],
  "good": "The contact is on the customer.",
  "careful": "Name, role, phone and email."
 },
 {
  "id": "MDM-016",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Customer Master",
  "program": "CRS949",
  "title": "Set customer document output (email invoice, print pack slip)",
  "lookFor": "Per customer, which documents go where and in what format?",
  "today": null,
  "found": null,
  "gap": "G-005",
  "talk": false,
  "ask": "The customer wants invoices by email.",
  "steps": [
   "Set document output in CRS949."
  ],
  "good": "Invoices go by email to the right address.",
  "careful": "Admins may need to do this."
 },
 {
  "id": "MDM-017",
  "dept": "Master Data",
  "module": "productManagement",
  "topic": "Customer Master",
  "program": "OIS020",
  "title": "Maintain a customer assortment (allowed items)",
  "lookFor": "Do we restrict what a customer can buy? Which ones?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Limit a customer to an approved item list.",
  "steps": [
   "Ctrl+S, OIS020, set up the assortment."
  ],
  "good": "The customer can only order listed items.",
  "careful": "Test with an order after."
 },
 {
  "id": "MDM-018",
  "dept": "Master Data",
  "module": "logistics",
  "topic": "Logistics Setup",
  "program": "DRS005",
  "title": "Create and maintain routes and run days",
  "lookFor": "Full route list, which warehouse serves each, and how often it changes.",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Set up a route and its run days.",
  "steps": [
   "Ctrl+S, DRS005, create the route."
  ],
  "good": "The route runs on the right days.",
  "careful": "Check with Logistics."
 },
 {
  "id": "MDM-019",
  "dept": "Master Data",
  "module": "logistics",
  "topic": "Logistics Setup",
  "program": "DRS011",
  "title": "Maintain route selection criteria",
  "lookFor": "How should the system pick the route automatically at order entry?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Make orders for a zip code land on the right route.",
  "steps": [
   "Ctrl+S, DRS011, add the selection rule."
  ],
  "good": "Orders in that area pick the route on their own.",
  "careful": "Test with an order."
 },
 {
  "id": "MDM-020",
  "dept": "Master Data",
  "module": "logistics",
  "topic": "Logistics Setup",
  "program": "CRS070",
  "title": "Maintain delivery methods and terms",
  "lookFor": "Our delivery methods and which customers get which.",
  "today": null,
  "found": null,
  "gap": "G-003",
  "talk": true,
  "ask": "Talk-through: which delivery methods and terms do we use?",
  "steps": [
   "Look at CRS070 with your SME."
  ],
  "good": "You know each delivery method and when it's used.",
  "careful": "Look, don't change."
 },
 {
  "id": "MDM-021",
  "dept": "Master Data",
  "module": "logistics",
  "topic": "Logistics Setup",
  "program": "MMS010",
  "title": "Maintain warehouse locations and zones",
  "lookFor": "How are locations named, and does the naming mean anything?",
  "today": null,
  "found": null,
  "gap": null,
  "talk": false,
  "ask": "Add a new rack location in the warehouse.",
  "steps": [
   "Ctrl+S, MMS010, add the location and zone."
  ],
  "good": "The location can be used for put-away and picking.",
  "careful": "Use the standard location format."
 }
];
