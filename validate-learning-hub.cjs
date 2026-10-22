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
assert.match(run('hubScore([2,2,2,2,2],false)'),/Eligible for owner review/);
assert.match(run('hubScore([0,2,2,2,2],false)'),/Blocked/);
assert.match(run('hubScore([2,2,2,2,2],true)'),/Blocked/);
assert.match(run('hubScore([1,1,1,2,2],false)'),/Practice again/);
assert.match(run('hubScore([1,1,1,1,1],false)'),/Guided retraining/);
assert.match(run('hubScore(["",2,2,2,2],false)'),/Select a score/);
for(const [user,coach,admin] of [['marksmith',false,false],['alanburk',true,false],['kristenb',true,true]]){
 run(`currentUser=${JSON.stringify(user)};currentUserData=USERS[currentUser];hubStart();hubEmployee();hubLibrary();`);
 assert.equal(run('hubIsCoach()'),coach);
 assert.equal(element('view-start').innerHTML.includes('SME Studio'),coach);
 assert.equal(element('view-start').innerHTML.includes('Training Admin'),admin);
 assert.ok(element('view-employee').innerHTML.includes('Foundation'));
 assert.equal(element('hub-count').textContent,'25 files found');
 if(coach){run('hubStudio()');assert.ok(element('view-studio').innerHTML.includes('Observed practice assessment'));}
 if(admin){run('hubControl()');assert.ok(element('view-control').innerHTML.includes('Release review'));}
}
assert.ok(portal.includes('learning-hub.css'));
assert.ok(portal.includes('learning-hub-data.js'));
assert.ok(portal.includes('learning-hub.js'));
assert.ok(!portal.includes('before a Super User is considered certified on that session'));
console.log('PASS: JavaScript syntax, 25 unique source links, 13 areas, 9 complete practice sequences, filters, readiness boundaries, Employee/SME/Admin views, and portal integration.');
