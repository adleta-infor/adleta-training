const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, name), 'utf8');
const elements = new Map();
function element(id) { if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',value:id==='hub-area'||id==='hub-format'?'all':'',checked:false,addEventListener(){}});return elements.get(id); }
const context = vm.createContext({console,localStorage:{getItem:()=>null},sessionStorage:{getItem:()=>null},document:{getElementById:element,addEventListener(){}},window:{location:{replace(){}}},setTimeout(){}});
const portal=read('portal.html');
const scripts=[...portal.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
scripts.forEach(s=>new vm.Script(s));
const main=scripts.find(s=>s.includes('const MODULES='));
vm.runInContext(main.slice(0,main.indexOf('if(!checkAuth())')),context);
vm.runInContext(read('learning-hub-data.js'),context);
vm.runInContext(read('practice-data.js'),context);
vm.runInContext(read('practice.js'),context);
vm.runInContext(read('learning-hub.js').replace(/hubSetup\(\);\s*$/,''),context);
function run(s){return vm.runInContext(s,context);}
assert.equal(run('LEARNING_LIBRARY.length'),13);
assert.equal(run('LEARNING_LIBRARY.reduce((n,c)=>n+c.files.length,0)'),25);
assert.equal(run('new Set(LEARNING_LIBRARY.flatMap(c=>c.files.map(f=>f.url))).size'),25);
assert.equal(run('LEARNING_LIBRARY.every(c=>c.files.every(f=>new URL(f.url).hostname==="adleta.sharepoint.com"))'.replace('new URL(f.url).hostname===','f.url.split("/")[2]===')),true);
assert.equal(run('LEARNING_LIBRARY.slice(0,9).every(c=>c.steps.length===3&&c.evidence&&c.validation)'),true);
assert.equal(run('hubFind("zzzz-not-a-title","all","all").length'),0);
assert.equal(run('hubFind("","inventory","all")[0].files.length'),2);
assert.equal(run('hubFind("","all","Pilot PDF").reduce((n,c)=>n+c.files.length,0)'),11);
assert.match(run('hubScore([2,2,2,2,2],false)'),/Ready/);
assert.match(run('hubScore([0,2,2,2,2],false)'),/Not ready yet/);
assert.match(run('hubScore([2,2,2,2,2],true)'),/Not ready yet/);
assert.match(run('hubScore([1,1,1,2,2],false)'),/practice again/);
assert.match(run('hubScore([1,1,1,1,1],false)'),/more training/);
assert.match(run('hubScore(["",2,2,2,2],false)'),/Pick a score/);
for(const [user,coach,admin] of [['marksmith',false,false],['alanburk',true,false],['kristenb',true,true]]){
 run(`currentUser=${JSON.stringify(user)};currentUserData=USERS[currentUser];ST={};hubStart();hubEmployee();hubLibrary();`);
 assert.equal(run('hubIsCoach()'),coach);
 assert.ok(element('view-start').innerHTML.includes('Your next step'));
 assert.ok(element('view-start').innerHTML.includes('Start this lesson'));
 assert.equal(element('view-start').innerHTML.includes('Training Admin'),admin);
 assert.ok(!/nonproduction|controlled pilot|masked/i.test(element('view-start').innerHTML));
 assert.ok(element('view-employee').innerHTML.includes('Foundation'));
 assert.equal(element('hub-count').textContent,'25 files found');
 if(coach){run('hubStudio()');assert.ok(element('view-studio').innerHTML.includes('Score a teach-back'));}
 if(admin){run('hubControl()');assert.ok(element('view-control').innerHTML.includes('Release review'));}
}
run(`currentUser="juanserna";currentUserData=USERS[currentUser];ST={};hubStart();`);
assert.match(element('view-start').innerHTML,/You're the backup for/);
run(`currentUser="lariahjohnson";currentUserData=USERS[currentUser];ST={};hubStart();`);
assert.match(element('view-start').innerHTML,/You're the SME for <strong>Customer Service and Order Entry/);
// practice engine: spacing, fading, drill and keys
run(`currentUser="juanserna";currentUserData=USERS[currentUser];ST={};PR=null;`);
assert.equal(run('repInterval(1)'),1);assert.equal(run('repInterval(3)'),7);assert.equal(run('repInterval(99)'),30);
run(`pr().reps["fnd-2"]={n:4,last:"2026-01-01",due:"2026-01-02",hist:[]};`);
assert.equal(run('repState("fnd-2").fading'),true);assert.equal(run('repState("fnd-2").level'),2);
assert.ok(run('repsDue().some(x=>x.s.id==="fnd-2")'));
run('hubStart();');assert.match(element('view-start').innerHTML,/Today's reps/);
assert.ok(run('drillPool().length')>=10);
assert.ok(run('OPT_MAP.orderManagement.every(o=>o.confirm)'),'translator stays draft until the SME confirms');
assert.ok(!run('drillPool().some(q=>/^On the green screen you used Opt/.test(q.q))'),'unconfirmed options are never drilled');
assert.ok(portal.includes('practice.js')&&portal.includes('practice-data.js'));
assert.ok(portal.includes('learning-hub.css'));
assert.ok(portal.includes('learning-hub-data.js'));
assert.ok(portal.includes('learning-hub.js'));
assert.ok(!portal.includes('before a Super User is considered certified on that session'));
console.log('PASS: JavaScript syntax, 25 unique source links, 13 areas, 9 complete practice sequences, filters, readiness boundaries, Employee/SME/Admin views, and portal integration.');
