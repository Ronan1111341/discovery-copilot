/* Agents: a page per agent (their tasks, open homes, clients and sales) and the "Plan my day" demo. */
(()=>{
const {$,$$,esc,initials,money}=F;
let tab="clients";
const ag=()=>W.agent(F.state.agent);
const mins=m=>{const h=Math.floor(m/60),mm=m%60,ap=h>=12?"pm":"am";return `${((h+11)%12)+1}:${String(mm).padStart(2,"0")} ${ap}`};
function tiles(a){
  const my=W.tasks.filter(t=>t.agent===a.id),open=my.filter(t=>!t.done).length;
  const t=[...a.tiles.slice(0,3),["Tasks open today",String(open)]];
  $("#tiles").innerHTML=t.map((x,i)=>`<div class="card tile"><b class="num"${i===3?' id="openCount"':""}>${esc(x[1])}</b><span>${esc(x[0])}</span></div>`).join("");
}
function render(){
  const a=ag(),root=$("#agentBody");
  $("#aName").textContent=a.name;$("#aRole").textContent=a.role+" · "+a.patch;
  $$("#switch button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.id===a.id)));
  tiles(a);
  const my=W.tasks.filter(t=>t.agent===a.id).sort((x,y)=>y.value-x.value),oh=W.openHomes.filter(o=>o.agent===a.id);
  $("#tasks").innerHTML=my.map(t=>`<label class="task${t.done?" done":""}" data-id="${t.id}"><input type="checkbox" ${t.done?"checked":""} aria-label="Mark done: ${esc(t.text)}"><span class="tx">${esc(t.text)}<small>${esc(t.who)} · ${t.mins} min</small></span><span class="val num">${t.value?money(t.value):""}</span></label>`).join("");
  $$("#tasks input").forEach(i=>i.onchange=()=>{const t=W.tasks.find(x=>x.id===i.closest(".task").dataset.id);t.done=i.checked;i.closest(".task").classList.toggle("done",t.done);const n=W.tasks.filter(x=>x.agent===a.id&&!x.done).length;const c=$("#openCount");if(c)c.textContent=n});
  $("#homes").innerHTML=oh.length?oh.map(o=>{const p=W.prop(o.prop);return `<div class="oh"><div class="art">${propertyArt(p.seed,p.art)}</div><div><span class="when">${esc(o.when)} · ${esc(o.time)}</span><b>${esc(p.addr)}</b><small>${esc(p.sub)} · ${esc(p.price)}</small><small class="num">${o.rsvps} RSVPs</small></div></div>`}).join(""):`<p style="color:var(--ink-2);padding:18px 0">No open homes scheduled. Inspections are by appointment.</p>`;
  side();
}
function side(){
  const a=ag();$$("#subTabs button").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.k===tab)));
  const pb=$("#sidePane");
  if(tab==="clients")pb.innerHTML=W.clients.filter(c=>c.agent===a.id).map(c=>`<div class="crow"><span class="av" aria-hidden="true">${initials(c.name)}</span><div><b>${esc(c.name)}</b><span>${esc(c.kind)} · ${esc(c.status)}</span></div><div class="r"><span>${esc(c.next)}</span><span style="display:block;color:var(--ink-3);font-size:11.5px">${esc(c.last)}</span></div></div>`).join("");
  else pb.innerHTML=W.sales.filter(s=>s.agent===a.id).map(s=>`<div class="sale"><b>${esc(s.addr)}</b><span class="pr">${esc(s.price)}</span><small>${esc(s.when)}</small><small style="text-align:right">${s.dom?s.dom+" days on market":""}</small></div>`).join("");
}
function plan(){
  const a=ag(),open=W.tasks.filter(t=>t.agent===a.id&&!t.done).sort((x,y)=>y.value-x.value),oh=W.openHomes.filter(o=>o.agent===a.id);
  // build the schedule: highest value first from 8:30, lunch gap, a weekend prep slot
  let t=8*60+30,sched=[];
  open.forEach(x=>{if(t>=12*60+30&&t<13*60+15)t=13*60+15;sched.push({time:t,text:x.text,note:x.who+" · "+x.mins+" min"});t+=x.mins+10});
  if(oh[0]){const p=W.prop(oh[0].prop);sched.push({time:Math.max(t,15*60+30),text:"Prepare for "+oh[0].when+": "+p.addr,note:"Open home "+oh[0].time+" · "+oh[0].rsvps+" RSVPs"})}
  const top=open.filter(x=>x.value).slice(0,5),maxv=Math.max(...top.map(x=>x.value),1);
  F.runDemo({title:"Plan my day",
   note:"<b>Done.</b> This was a scripted demo: nothing was scheduled or sent. A real version would add this plan to the agent’s calendar once approved.",
   stages:[
   {title:"Reading your day",explain:"It gathers today’s tasks, open homes and clients.",sub:"Tasks, open homes and follow-ups",
    html:`<div class="ents">${[["Tasks",String(open.length)],["Open homes",String(oh.length)],["Clients",String(W.clients.filter(c=>c.agent===a.id).length)],["Top value",money(Math.max(...open.map(x=>x.value),0))]].map(x=>`<div class="ent"><b>${x[0]}</b>${x[1]}</div>`).join("")}</div>`,
    run:async(el,c)=>{for(const e of $$(".ent",el)){if(!c.ok())return;e.classList.add("on");await c.sleep(260)}await c.sleep(150)}},
   {title:"Weighing what matters",explain:"It ranks work by expected value and deadline, so the biggest opportunities come first.",sub:"Ranking by value and deadline",
    html:`<div class="wbars">${top.map(x=>`<div class="wb"><span>${esc(x.text)}</span><span class="num">${money(x.value)}</span><div class="tr"><i data-w="${Math.round(x.value/maxv*100)}"></i></div></div>`).join("")}</div>`,
    run:async(el,c)=>{for(const w of $$(".wb",el)){if(!c.ok())return;w.classList.add("on");await c.sleep(90);$(".tr i",w).style.width=$(".tr i",w).dataset.w+"%";await c.sleep(300)}}},
   {title:"Building the day",explain:"It lays the ranked work into a realistic timetable, with breathing room and time to prepare for the weekend’s open home.",sub:"Highest value first, with breathing room",
    html:`<div class="tline">${sched.map(s=>`<div class="tl"><span class="tm num">${mins(s.time)}</span><span>${esc(s.text)}<small>${esc(s.note)}</small></span></div>`).join("")}</div><div style="margin-top:14px"><button class="btn sm" type="button" data-t="Demo only: nothing was added to a calendar.">Add to my calendar</button></div>`,
    run:async(el,c)=>{$(".btn",el).onclick=e=>F.toast(e.currentTarget.dataset.t);for(const r of $$(".tl",el)){if(!c.ok())return;r.classList.add("on");await c.sleep(280)}}}
  ]});
}
F.register({id:"agents",label:"Agents",icon:"agents",group:"Team",
 mount(el){
  el.innerHTML=`<div class="agentpage"><div class="pagehead"><div><div class="eyebrow">Agent</div><h2 id="aName"></h2><p id="aRole"></p></div>
   <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center"><div class="switch" id="switch" role="group" aria-label="Choose an agent">${W.agents.map(a=>`<button type="button" data-id="${a.id}" aria-pressed="false"><span class="av" aria-hidden="true">${initials(a.name)}</span>${esc(a.name.split(" ")[0])}</button>`).join("")}</div><button class="btn" id="planBtn" type="button">${F.SPARK}Plan my day</button></div></div>
   <div class="tiles" id="tiles"></div>
   <div class="agrid" id="agentBody">
    <section class="card panel" aria-label="Today"><header><h3>Today</h3><span class="chip acc">Ranked by value</span></header><div class="pb" id="tasks"></div></section>
    <section class="card panel" aria-label="Open homes"><header><h3>Open homes</h3><span class="chip">This week</span></header><div class="pb" id="homes"></div></section>
    <section class="card panel" aria-label="Clients and sales"><header><h3>Clients and sales</h3><div class="sub-tabs" id="subTabs" role="tablist"><button type="button" role="tab" data-k="clients">Clients</button><button type="button" role="tab" data-k="sales">Sales</button></div></header><div class="pb" id="sidePane"></div></section>
   </div></div>`;
  $$("#switch button",el).forEach(b=>b.onclick=()=>{F.closeDrawer();F.state.agent=b.dataset.id;history.replaceState(null,"","#agents-"+b.dataset.id);$("#agentBody").classList.remove("fadein");void $("#agentBody").offsetWidth;$("#agentBody").classList.add("fadein");render()});
  $$("#subTabs button",el).forEach(b=>b.onclick=()=>{tab=b.dataset.k;side()});
  $("#planBtn",el).onclick=plan;
 },
 show(el,sub){if(sub&&W.agent(sub))F.state.agent=sub;render()}});
})();
