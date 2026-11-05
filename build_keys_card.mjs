// Builds resources/keys-cheat-sheet.html (printable desk card) from practice-data.js so the card and the site always match.
import fs from "fs"; import vm from "vm";
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync("practice-data.js", "utf8").replace(/^const (\w+)\s*=/gm, "var $1 ="), ctx);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const { KEY_CARD, KEY_NEW, OPT_MAP } = ctx;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>M3 Keys Desk Card</title>
<style>
:root{--ink:#0b2742;--muted:#5b7088;--line:#d6e2ee;--brand:#005596}
*{box-sizing:border-box}body{margin:0;background:#f4f7fa;color:var(--ink);font:15px/1.45 -apple-system,Segoe UI,Roboto,Arial,sans-serif}
.page{max-width:900px;margin:24px auto;padding:28px 32px;background:#fff;border:1px solid var(--line);border-radius:12px}
h1{font-size:26px;margin:0 0 4px}h2{font-size:18px;margin:26px 0 8px}p.sub{color:var(--muted);margin:0 0 16px}
table{width:100%;border-collapse:collapse}th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);padding:7px;border-bottom:2px solid var(--line)}td{padding:9px 7px;border-bottom:1px solid var(--line);vertical-align:top}
kbd{display:inline-block;min-width:1.7em;padding:2px 7px;border:1px solid #bccfe2;border-bottom-width:3px;border-radius:6px;background:#fff;font:700 15px ui-monospace,Menlo,Consolas,monospace;text-align:center;white-space:nowrap}
.ok{color:#1a7a6d;font-weight:700;white-space:nowrap}.add{color:#8a6410;font-weight:700}.draft{font-size:12px;color:#8a6410;background:#fff6df;border-radius:6px;padding:8px 10px}
.print{float:right;padding:8px 14px;border:1px solid var(--line);border-radius:8px;background:#fff;cursor:pointer;font:inherit}
@media print{body{background:#fff;font-size:13px}td{padding:6px 7px}h1{font-size:22px}.ok,.add{white-space:nowrap}.page{border:0;margin:0;padding:0;max-width:none}.print{display:none}.break{page-break-before:always}}
@media(max-width:600px){.page{margin:0;border-radius:0;padding:18px 16px}td,th{padding:7px 4px}}
</style></head><body><div class="page">
<button class="print" onclick="window.print()">Print</button>
<h1>Your keys still work</h1><p class="sub">Adleta · Infor M3 · Most green-screen keys do the same thing in M3.</p>
<table><thead><tr><th>Key</th><th>Green screen</th><th>M3</th><th></th></tr></thead><tbody>
${KEY_CARD.map(k => `<tr><td><kbd>${esc(k.key)}</kbd></td><td>${esc(k.green)}</td><td>${esc(k.m3)}</td><td class="${k.same ? "ok" : "add"}">${k.same ? "✓ Same" : "Add Ctrl"}</td></tr>`).join("")}
</tbody></table>
<h2>New keys worth learning</h2>
<table><tbody>${KEY_NEW.map(k => `<tr><td style="width:130px"><kbd>${esc(k.key)}</kbd></td><td>${esc(k.m3)}</td></tr>`).join("")}</tbody></table>
<div class="break"></div>
<h2>Customer Service: your old option → your new program</h2>
<p class="sub">Same habit: type a code and go. Press <kbd>Ctrl+S</kbd>, type the code, press <kbd>Enter</kbd>.</p>
${OPT_MAP.orderManagement.some(o => o.confirm) ? `<p class="draft">Draft: the Customer Service SME is still checking these in TST. Lines marked "checking" may change.</p>` : ""}
<table><thead><tr><th>Green screen</th><th>What it does</th><th>M3</th><th>Note</th></tr></thead><tbody>
${OPT_MAP.orderManagement.map(o => `<tr><td>${esc(o.opt)}</td><td>${esc(o.what)}</td><td><strong>${esc(o.m3)}</strong></td><td>${esc(o.note)}${o.confirm ? " · <em>checking</em>" : ""}</td></tr>`).join("")}
</tbody></table>
</div></body></html>`;
fs.writeFileSync("resources/keys-cheat-sheet.html", html);
console.log("Wrote resources/keys-cheat-sheet.html");
