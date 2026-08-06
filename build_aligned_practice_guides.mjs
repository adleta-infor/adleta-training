import fs from "fs";
import path from "path";
import vm from "vm";

const root = process.cwd();
const portalPath = path.join(root, "portal.html");
const resourcesDir = path.join(root, "resources");
const portal = fs.readFileSync(portalPath, "utf8");

const start = portal.indexOf("const USERS=");
const end = portal.indexOf("const SK=");
if (start < 0 || end < 0 || end <= start) {
  throw new Error("Could not find portal data block.");
}

let dataBlock = portal.slice(start, end);
dataBlock = dataBlock.replace(/\bconst\s+(USERS|MODULES|EXERCISES|PHASES|NEXT_ACTIONS|RESOURCES)\s*=/g, "var $1=");
dataBlock = dataBlock.replace(/\blet\s+(ST)\s*=/g, "var $1=");

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(dataBlock, sandbox, { timeout: 5000 });

const MODULES = sandbox.MODULES;
const EXERCISES = sandbox.EXERCISES;
if (!MODULES || !EXERCISES) {
  throw new Error("Could not load module or exercise data.");
}

fs.mkdirSync(resourcesDir, { recursive: true });

function cleanText(value = "") {
  return String(value)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&mdash;/g, "-")
    .replace(/&ndash;/g, "-")
    .replace(/&#8594;/g, "->")
    .replace(/&#8212;/g, "-")
    .replace(/&#8211;/g, "-")
    .replace(/&#8230;/g, "...")
    .replace(/&#8801;/g, "menu")
    .replace(/&#128187;/g, "")
    .replace(/&#9888;/g, "Warning:")
    .replace(/&#128161;/g, "Tip:")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function pageShell(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} - Adleta M3 Training</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=DM+Mono:wght@500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}body{font-family:'DM Sans',sans-serif;background:#f2f5f8;color:#102033;line-height:1.55}.top{background:#1a7a6d;color:white;padding:17px 28px;display:flex;justify-content:space-between;gap:16px;align-items:center}.brand{font-weight:800;font-size:18px}.top a{color:white;text-decoration:none;font-weight:700;font-size:13px}.wrap{max-width:1060px;margin:26px auto 52px;padding:0 22px}.hero,.card{background:white;border:1px solid #dde5ed;border-radius:10px;box-shadow:0 2px 12px rgba(15,33,51,.08)}.hero{padding:26px 30px;margin-bottom:16px}.card{padding:20px 24px;margin-bottom:14px}.eyebrow{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#1a7a6d;font-weight:800;margin-bottom:8px}h1{font-size:30px;line-height:1.15;margin-bottom:10px}h2{font-size:20px;margin-bottom:10px}h3{font-size:16px;margin-bottom:6px}.muted,p{color:#344b5f}.meta{display:flex;flex-wrap:wrap;gap:7px;margin-top:14px}.pill{display:inline-flex;align-items:center;background:#e0f2ee;color:#145c52;border-radius:999px;padding:4px 10px;font-family:'DM Mono',monospace;font-size:12px;font-weight:700}.pill.gray{background:#eef2f6;color:#344b5f}.session{border-left:4px solid #1a7a6d}.session-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;border-bottom:1px solid #dde5ed;padding-bottom:12px;margin-bottom:14px}.duration{font-size:12px;color:#6b8199;white-space:nowrap}.section-title{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#1a7a6d;font-weight:800;margin:14px 0 7px}.task{border:1px solid #dde5ed;border-radius:8px;background:#f7f9fb;margin:8px 0;padding:13px 15px}.task-title{font-weight:800;margin-bottom:6px}.task ol,.list{padding-left:22px;color:#344b5f}.task li,.list li{margin:4px 0}.outcomes{background:#eaf7f4;border-color:#b7ddd6}.exceptions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.exception{border:1px solid #edd08c;background:#fff9e9;border-radius:8px;padding:12px}.question{font-weight:800;color:#5f4611;margin-bottom:4px}.quiz{border-top:1px solid #dde5ed;margin-top:12px;padding-top:12px}.answer{font-weight:800;color:#1a7a6d}.index-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.index-card{display:block;color:inherit;text-decoration:none}.index-card:hover{border-color:#1a7a6d}@media(max-width:760px){.exceptions,.index-grid{grid-template-columns:1fr}.top{align-items:flex-start;flex-direction:column}h1{font-size:24px}.session-head{display:block}.duration{display:block;margin-top:6px}}
@media print{.top{display:none}.wrap{margin:0;max-width:none}.card,.hero{box-shadow:none;break-inside:avoid}.session{break-inside:avoid-page}}
</style>
</head>
<body>
<div class="top"><div class="brand">Adleta M3 - Practice Guide</div><a href="../portal.html">Back to Portal</a></div>
<main class="wrap">
${body}
</main>
</body>
</html>
`;
}

function renderSession(module, session, index) {
  const ex = EXERCISES[session.id];
  const tasks = ex
    ? ex.tasks.map((task, taskIndex) => `<div class="task"><div class="task-title">${taskIndex + 1}. ${escapeHtml(cleanText(task.n))}</div><ol>${task.s.map(step => `<li>${escapeHtml(cleanText(step))}</li>`).join("")}</ol></div>`).join("")
    : session.steps.map((step) => `<div class="task"><div class="task-title">${escapeHtml(cleanText(step[0]))}. ${escapeHtml(cleanText(step[1]))}</div><p>${escapeHtml(cleanText(step[2]))}</p></div>`).join("");

  const outcomes = ex?.out?.length
    ? `<div class="section-title">Expected Outcomes</div><div class="task outcomes"><ul class="list">${ex.out.map(item => `<li>${escapeHtml(cleanText(item))}</li>`).join("")}</ul></div>`
    : "";

  const exceptions = ex?.exc?.length
    ? `<div class="section-title">Exception Handling</div><div class="exceptions">${ex.exc.map(item => `<div class="exception"><div class="question">${escapeHtml(cleanText(item.q))}</div><div class="muted">${escapeHtml(cleanText(item.a))}</div></div>`).join("")}</div>`
    : "";

  const quiz = session.quiz?.length
    ? `<div class="quiz"><div class="section-title">Knowledge Check</div>${session.quiz.map((q, qIndex) => `<div class="task"><div class="task-title">${qIndex + 1}. ${escapeHtml(cleanText(q.q))}</div><ul class="list">${q.options.map((opt, optIndex) => `<li>${escapeHtml(cleanText(opt))}${optIndex === q.answer ? ` <span class="answer">(correct)</span>` : ""}</li>`).join("")}</ul></div>`).join("")}</div>`
    : "";

  const checklist = session.checklist?.length
    ? `<div class="section-title">Sign-Off Checklist</div><div class="task"><ul class="list">${session.checklist.map(item => `<li>${escapeHtml(cleanText(item))}</li>`).join("")}</ul></div>`
    : "";

  return `<section class="card session" id="${escapeHtml(session.id)}">
<div class="session-head"><div><div class="eyebrow">Session ${index + 1} - ${escapeHtml(module.name)}</div><h2>${escapeHtml(cleanText(session.title))}</h2></div><div class="duration">${escapeHtml(session.duration || "")}</div></div>
${ex ? `<div class="section-title">Objective</div><p>${escapeHtml(cleanText(ex.obj))}</p><div class="section-title">Scenario</div><p>${escapeHtml(cleanText(ex.scn))}</p>` : `<p class="muted">Practice this session using the live portal steps below.</p>`}
<div class="section-title">Practice Tasks</div>
${tasks}
${outcomes}
${exceptions}
${checklist}
${quiz}
</section>`;
}

function modulePage(module) {
  const body = `<section class="hero">
<div class="eyebrow">${escapeHtml(module.weeks)} - ${escapeHtml(module.owner)}</div>
<h1>${escapeHtml(module.name)}</h1>
<p>${escapeHtml(cleanText(module.summary))}</p>
<div class="meta">${module.programs.map(program => `<span class="pill gray">${escapeHtml(program)}</span>`).join("")}<span class="pill">${module.sessions.length} sessions</span></div>
</section>
${module.sessions.map((session, index) => renderSession(module, session, index)).join("")}`;
  return pageShell(`${module.name} Practice Guide`, body);
}

function allPracticeGuide() {
  const modules = Object.values(MODULES);
  const index = `<section class="hero"><div class="eyebrow">All Modules</div><h1>Adleta M3 Practice Guide</h1><p>This guide is generated from the same practice exercises used in the portal. If a module session changes, this guide should be rebuilt from portal.html so the printed guide and online practice stay aligned.</p><div class="meta"><span class="pill">${modules.length} modules</span><span class="pill gray">${modules.reduce((sum, module) => sum + module.sessions.length, 0)} sessions</span></div></section>
<section class="index-grid">${modules.map(module => `<a class="card index-card" href="#${escapeHtml(module.id)}"><div class="eyebrow">${escapeHtml(module.weeks)}</div><h2>${escapeHtml(module.name)}</h2><p>${escapeHtml(cleanText(module.summary))}</p></a>`).join("")}</section>`;
  const pages = modules.map(module => `<section id="${escapeHtml(module.id)}" class="hero"><div class="eyebrow">${escapeHtml(module.weeks)} - ${escapeHtml(module.owner)}</div><h1>${escapeHtml(module.name)}</h1><p>${escapeHtml(cleanText(module.summary))}</p><div class="meta">${module.programs.map(program => `<span class="pill gray">${escapeHtml(program)}</span>`).join("")}</div></section>${module.sessions.map((session, index) => renderSession(module, session, index)).join("")}`).join("");
  return pageShell("Adleta M3 Practice Guide", index + pages);
}

const moduleByResource = new Map();
for (const module of Object.values(MODULES)) {
  for (const [, url] of module.links || []) {
    if (url.startsWith("resources/")) {
      moduleByResource.set(url.replace(/^resources\//, ""), module);
    }
  }
}

for (const [file, module] of moduleByResource) {
  fs.writeFileSync(path.join(resourcesDir, file), modulePage(module), "utf8");
}

const allGuide = allPracticeGuide();
fs.writeFileSync(path.join(root, "practice-guide.html"), allGuide, "utf8");
fs.writeFileSync(path.join(root, "trainer-guide.html"), allGuide, "utf8");

console.log(`Wrote ${moduleByResource.size} module resource guides plus practice-guide.html and trainer-guide.html.`);
