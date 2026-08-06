import fs from "fs";
import vm from "vm";

const portal = fs.readFileSync("portal.html", "utf8");
const start = portal.indexOf("const USERS=");
const end = portal.indexOf("const SK=");
let code = portal.slice(start, end).replace(/\bconst\s+(USERS|MODULES|EXERCISES|PHASES|NEXT_ACTIONS|RESOURCES)\s*=/g, "var $1=");

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(code, sandbox, { timeout: 5000 });

const missing = [];
let linkCount = 0;
let sessionCount = 0;

for (const module of Object.values(sandbox.MODULES)) {
  sessionCount += module.sessions.length;
  for (const [, url] of module.links || []) {
    if (!url.startsWith("resources/")) continue;
    linkCount += 1;
    if (!fs.existsSync(url)) {
      missing.push(`${url} does not exist`);
      continue;
    }
    const html = fs.readFileSync(url, "utf8");
    for (const session of module.sessions) {
      if (!html.includes(`id="${session.id}"`)) {
        missing.push(`${url} is missing session ${session.id}`);
      }
    }
  }
}

console.log(`MODULES=${Object.keys(sandbox.MODULES).length}`);
console.log(`SESSIONS=${sessionCount}`);
console.log(`MODULE_RESOURCE_LINKS=${linkCount}`);
console.log(`MISSING_OR_UNALIGNED=${missing.length}`);

if (missing.length) {
  console.log(missing.join("\n"));
  process.exit(1);
}
