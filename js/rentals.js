/* Rentals, Maintenance and Bookings: invented property-management data and a scripted demo for each. */
(()=>{
const {$,$$,esc,initials,money}=F;
W.rentals=[
 {id:"r1",addr:"Unit 6/18 Merthyr Road, New Farm",tenant:"Harold Davies",landlord:"Mr & Mrs Bianchi",rent:780,ends:"30 Nov",status:"Renewal due",tone:"warn",paid:"12 of 12 on time"},
 {id:"r2",addr:"Unit 12/45 Oxlade Drive, New Farm",tenant:"Sophie Lang",landlord:"Marlow Holdings",rent:950,ends:"14 Mar",status:"Maintenance",tone:"hot",paid:"11 of 12 on time"},
 {id:"r3",addr:"Unit 7/9 Moray Street, New Farm",tenant:"Kieran Walsh",landlord:"Evergreen Trust",rent:720,ends:"2 Feb",status:"Arrears, 6 days",tone:"hot",paid:"9 of 12 on time"},
 {id:"r4",addr:"2/31 Vulture Street, West End",tenant:"Amira Hassan",landlord:"Priyanka Shah",rent:850,ends:"21 Jun",status:"Inspection due",tone:"acc",paid:"12 of 12 on time"},
 {id:"r5",addr:"88 Brunswick Street, Fortitude Valley",tenant:"Vacant",landlord:"Marlow Holdings",rent:1100,ends:"–",status:"Vacant, 4 days",tone:"warn",paid:"–"}
];
W.requests=[
 {id:"m1",rental:"r2",issue:"No hot water",msg:"Hi, the hot water went off overnight and the unit is cold to the touch. We have two young kids and need it sorted today if possible. Thanks, Sophie",when:"7:12 am",status:"New",tone:"hot"},
 {id:"m2",rental:"r1",issue:"Dripping bathroom tap",msg:"The bathroom tap has a slow drip. Not urgent, but it is getting louder at night.",when:"Yesterday",status:"Scheduled",tone:"good"},
 {id:"m3",rental:"r4",issue:"Smoke alarm chirping",msg:"The hallway smoke alarm has started chirping every minute, probably the battery.",when:"Tue",status:"Scheduled",tone:"good"}
];
W.tradies=[
 {name:"Aqua Pro Plumbing",trade:"Plumber",rating:4.9,resp:"Under 2 hours",rate:"$140 call-out"},
 {name:"Riverbend Hot Water",trade:"Hot water specialist",rating:4.8,resp:"Under 3 hours",rate:"$165 call-out"},
 {name:"Kettle & Sons",trade:"Plumber",rating:4.6,resp:"Next day",rate:"$120 call-out"}
];
W.events=[
 {day:0,time:"9:00 am",text:"Appraisal, 22 Dunmore Tce",agent:"sam"},
 {day:0,time:"2:00 pm",text:"Routine inspection, 2/31 Vulture St",agent:"luca"},
 {day:1,time:"10:00 am",text:"Open home, 14 Wickham Tce",agent:"sam"},
 {day:1,time:"10:00 am",text:"Open home, 31 Cairns St",agent:"maya"},
 {day:1,time:"11:30 am",text:"Auction preview, 7 Banks St",agent:"sam"},
 {day:1,time:"12:00 pm",text:"Open home, 52 Hargreaves Ave",agent:"harriet"},
 {day:2,time:"11:00 am",text:"Open home, 3 Eldon Pl (auction)",agent:"harriet"},
 {day:2,time:"1:00 pm",text:"Open home, 9 Lytton Rd",agent:"maya"},
 {day:3,time:"10:30 am",text:"Lease signing, 6/18 Merthyr Rd",agent:"luca"},
 {day:4,time:"3:00 pm",text:"Vendor meeting, Hamilton",agent:"harriet"}
];
const DAYS=[["Friday","Today"],["Saturday","Tomorrow"],["Sunday",""],["Monday",""],["Tuesday",""]];

/* ---------- Rentals: lease renewal demo ---------- */
let rsel="r1";const renewed={};
function rentals(){
  $("#rList").innerHTML=W.rentals.map(r=>`<button type="button" aria-pressed="${r.id===rsel}" data-id="${r.id}"><b>${esc(r.addr.split(",")[0])}</b><span>${esc(r.tenant)} · ${esc(r.status)}</span><span class="rt num">${r.rent?"$"+r.rent:"–"}<small style="display:block;font:400 11px var(--body);color:var(--ink-3)">per week</small></span></button>`).join("");
  $$("#rList button").forEach(b=>b.onclick=()=>{rsel=b.dataset.id;F.closeDrawer();rentals()});
  const r=W.rentals.find(x=>x.id===rsel),st=renewed[r.id]?["Renewal drafted","good"]:[r.status,r.tone];
  $("#rDetail").innerHTML=`<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:flex-start"><div class="eyebrow">${esc(r.landlord)}</div><span class="chip ${st[1]}">${esc(st[0])}</span></div><h3>${esc(r.addr)}</h3>
   <div class="fields"><div><span class="k mono">Tenant</span><span class="v">${esc(r.tenant)}</span></div><div><span class="k mono">Rent</span><span class="v num">${r.rent?"$"+r.rent+" per week":"–"}</span></div><div><span class="k mono">Lease ends</span><span class="v">${esc(r.ends)}</span></div><div><span class="k mono">Payment history</span><span class="v">${esc(r.paid)}</span></div></div>
   ${r.id==="r1"?`<div style="margin-top:22px"><button class="btn pulse" id="renew" type="button">${F.SPARK}Prepare the renewal</button></div>`:`<p style="color:var(--ink-2);margin-top:20px;max-width:52ch">The renewal demo runs on Harold Davies’ lease at Merthyr Road. Select it from the list.</p>`}`;
  if(r.id==="r1")$("#renew").onclick=renew;
}
function renew(){
  const comps=[["Unit 4/20 Merthyr Rd",820],["Unit 9/14 Brunswick St",845],["Unit 2/33 Oxlade Dr",810]],max=860;
  F.runDemo({title:"Lease renewal",
   onDone:()=>{renewed.r1=true;rentals()},
   note:"<b>Done.</b> Scripted demo: no letter was sent and no lease was changed. A real version would wait for the landlord’s approval first.",
   stages:[
   {title:"Reading the lease and ledger",sub:"Term, rent, payment history",html:`<div class="ents">${[["Lease ends","30 Nov"],["Current rent","$780/wk"],["Payments","12 of 12 on time"],["Landlord","Mr & Mrs Bianchi"]].map(x=>`<div class="ent"><b>${x[0]}</b>${x[1]}</div>`).join("")}</div>`,
    run:async(el,c)=>{for(const e of $$(".ent",el)){if(!c.ok())return;e.classList.add("on");await c.sleep(260)}await c.sleep(150)}},
   {title:"Checking market rent",sub:"Comparable apartments nearby (sample data)",html:`<div class="wbars">${comps.map(x=>`<div class="wb"><span>${x[0]}</span><span class="num">$${x[1]}</span><div class="tr"><i data-w="${Math.round(x[1]/max*100)}"></i></div></div>`).join("")}</div><p style="color:var(--ink-2);font-size:13px;margin-top:4px">Median of comparables: <b style="color:var(--brass-2)">$820 per week</b></p>`,
    run:async(el,c)=>{for(const w of $$(".wb",el)){if(!c.ok())return;w.classList.add("on");await c.sleep(90);$(".tr i",w).style.width=$(".tr i",w).dataset.w+"%";await c.sleep(320)}}},
   {title:"Proposing a figure",sub:"Fair to the tenant, protects the landlord",html:`<div class="diff"><span class="k">Rent</span><span class="v"><s>$780</s><span class="new">$805 per week</span></span><span class="k">Change</span><span class="v">+3.2%, below the $820 median</span><span class="k">Why</span><span class="v">A perfect payment record earns a gentler increase</span><span class="k">Term</span><span class="v">12 months from 1 Dec</span></div>`,
    run:async(el,c)=>{for(const v of $$(".v",el)){if(!c.ok())return;v.classList.add("on");await c.sleep(320)}}},
   {title:"Drafting the letter",sub:"For the landlord to approve",html:`<div class="draft"><div class="hd"><b>To:</b> Harold Davies<br><b>Subject:</b> Your lease renewal, 6/18 Merthyr Road</div><pre id="rtxt"></pre></div><div class="acts" id="racts"><button class="btn sm" type="button" data-t="Demo only: nothing was sent.">Send to landlord</button><button class="btn ghost sm" type="button" data-t="Demo only: editing is not part of the show.">Edit</button></div>`,
    run:async(el,c)=>{$$("#racts button",el).forEach(b=>b.onclick=()=>F.toast(b.dataset.t));await c.type($("#rtxt",el),"Hi Harold,\n\nThank you for your twelve months of on-time payments. We would be happy to renew for another year from 1 December at $805 per week, an increase of 3.2% that sits below the current market median for similar apartments.\n\nIf that works for you, we will send the new lease for signing this week.\n\nWarm regards,\nLuca\nHarbourline Property Management",7);if(c.ok())$("#racts",el).classList.add("on")}}
  ]});
}
F.register({id:"rentals",label:"Rentals",icon:"rentals",group:"Property management",
 mount(el){el.innerHTML=`<div class="pad"><div class="pagehead"><div><div class="eyebrow">Rentals</div><h2>A managed portfolio</h2><p>Leases, rent and renewals for the homes you manage, with the next action always on top.</p></div></div><div class="split2"><div class="rl" id="rList"></div><div class="card detail" id="rDetail"></div></div></div>`},show:rentals});

/* ---------- Maintenance: triage demo ---------- */
let msel="m1";const booked={};
function maint(){
  $("#mList").innerHTML=W.requests.map(q=>{const r=W.rentals.find(x=>x.id===q.rental),st=booked[q.id]?["Booked","good"]:[q.status,q.tone];return `<button type="button" aria-pressed="${q.id===msel}" data-id="${q.id}"><b>${esc(q.issue)}</b><span>${esc(r.addr.split(",")[0])} · ${esc(q.when)}</span><span class="rt"><span class="chip ${st[1]}">${esc(st[0])}</span></span></button>`}).join("");
  $$("#mList button").forEach(b=>b.onclick=()=>{msel=b.dataset.id;F.closeDrawer();maint()});
  const q=W.requests.find(x=>x.id===msel),r=W.rentals.find(x=>x.id===q.rental);
  $("#mDetail").innerHTML=`<div class="eyebrow">${esc(r.landlord)}</div><h3>${esc(q.issue)}</h3><p style="color:var(--ink-2);margin-bottom:6px">${esc(r.addr)} · reported ${esc(q.when)} by ${esc(r.tenant)}</p><div class="draft" style="margin:14px 0 22px"><pre>${esc(q.msg)}</pre></div>
   ${q.id==="m1"&&!booked.m1?`<button class="btn pulse" id="triage" type="button">${F.SPARK}Triage and book a tradie</button>`:q.id==="m1"?`<span class="chip good">Aqua Pro Plumbing booked, arriving 11:00 am</span><p style="color:var(--ink-2);margin-top:12px">A task was added to Luca Ferretti’s page: confirm the plumber’s arrival.</p>`:`<span class="chip good">Already scheduled with a tradie</span>`}`;
  if(q.id==="m1"&&!booked.m1)$("#triage").onclick=triage;
}
function triage(){
  F.runDemo({title:"Maintenance request",
   onDone:()=>{booked.m1=true;if(!W.tasks.some(t=>t.id==="t-m1"))W.tasks.unshift({id:"t-m1",agent:"luca",text:"Confirm the plumber’s arrival, 12/45 Oxlade Drive",who:"Aqua Pro Plumbing",kind:"call",mins:10,value:60000,done:false});maint()},
   note:"<b>Done.</b> Scripted demo: no tradie was contacted and nothing was booked. Notice the new task on Luca’s agent page.",
   stages:[
   {title:"Reading the request",sub:"What broke, where, who is affected",html:`<div class="ents">${[["Issue","No hot water"],["Property","12/45 Oxlade Dr"],["Reported","7:12 am"],["Household","Two young children"]].map(x=>`<div class="ent"><b>${x[0]}</b>${x[1]}</div>`).join("")}</div>`,
    run:async(el,c)=>{for(const e of $$(".ent",el)){if(!c.ok())return;e.classList.add("on");await c.sleep(260)}await c.sleep(150)}},
   {title:"Judging urgency",sub:"Safety, tenancy law and weather",html:`<div style="display:flex;justify-content:space-between;font-size:13px"><span>Urgency</span><b style="color:var(--hot)" id="ul">…</b></div><div class="urg"><i id="ub"></i></div><div class="sig on"><small>Why</small>Hot water is an urgent repair, and there are young children in the home.</div><div class="sig on"><small>Landlord rule (sample)</small>Repairs under $500 can be approved straight away.</div>`,
    run:async(el,c)=>{await c.sleep(300);$("#ub",el).style.width="86%";await c.sleep(900);$("#ul",el).textContent="Urgent: same day"}},
   {title:"Matching a tradie",sub:"Closest, fastest and best rated",html:`${W.tradies.map((t,i)=>`<div class="trad${i===0?" pick":""}"><b>${esc(t.name)}</b><span>${esc(t.trade)} · ${esc(t.resp)}</span><span class="rt num">★ ${t.rating}<br>${esc(t.rate)}</span></div>`).join("")}`,
    run:async(el,c)=>{for(const t of $$(".trad",el)){if(!c.ok())return;t.classList.add("on");await c.sleep(380)}}},
   {title:"Drafting the messages",sub:"To the tradie and to the tenant",html:`<div class="draft"><div class="hd"><b>To Aqua Pro:</b> Hot water failure, 12/45 Oxlade Dr</div><pre id="mtxt"></pre></div><div class="acts" id="macts"><button class="btn sm" type="button" data-t="Demo only: nothing was sent.">Approve and send</button><button class="btn ghost sm" type="button" data-t="Demo only: editing is not part of the show.">Edit</button></div>`,
    run:async(el,c)=>{$$("#macts button",el).forEach(b=>b.onclick=()=>F.toast(b.dataset.t));await c.type($("#mtxt",el),"Hi team,\n\nNo hot water at 12/45 Oxlade Drive since overnight, two young children in the home. Could you attend this morning? Pre-approved up to $500; call me before going over.\n\nAccess: tenant Sophie is home all day.\n\nThanks, Luca (Harbourline)\n\n— Tenant text: “Hi Sophie, a plumber can attend from 11:00 am today. We will confirm shortly.”",6);if(c.ok())$("#macts",el).classList.add("on")}}
  ]});
}
F.register({id:"maintenance",label:"Maintenance",icon:"maint",group:"Property management",badge:"1",
 mount(el){el.innerHTML=`<div class="pad"><div class="pagehead"><div><div class="eyebrow">Maintenance</div><h2>Repairs, handled</h2><p>Requests are read, ranked by urgency and matched to a tradie, ready for you to approve.</p></div></div><div class="split2"><div class="rl" id="mList"></div><div class="card detail" id="mDetail"></div></div></div>`},show:maint});

/* ---------- Bookings: calendar + inspection demo ---------- */
let added=false;
function cal(){
  $("#cal").innerHTML=DAYS.map((d,i)=>{const ev=W.events.filter(e=>e.day===i).concat(added&&i===1?[{day:1,time:"10:00 am",text:"Private inspection, 14 Wickham Tce (Nguyens)",agent:"sam",fresh:true}]:[]);
   return `<section class="card day" aria-label="${d[0]}"><span class="eyebrow">${esc(d[1]||"—")}</span><h4>${d[0]}</h4>${ev.map(e=>`<div class="ev${e.fresh?" fresh":""}"><b>${esc(e.time)}</b> ${esc(e.text)}<small>${esc(W.agent(e.agent).name)}</small></div>`).join("")||'<p style="color:var(--ink-3);font-size:13px">Nothing booked.</p>'}</section>`}).join("");
}
function book(){
  const times=["9:00","9:30","10:00","10:30","11:00","11:30"],busy=["9:00","9:30","11:00"];
  F.runDemo({title:"Book an inspection",
   onDone:()=>{added=true;cal()},
   note:"<b>Done.</b> Scripted demo: no calendar was changed and no invite was sent. The new booking now shows on Saturday.",
   stages:[
   {title:"Reading the request",sub:"Who wants what, and when",html:`<div class="ents">${[["Client","Jess & Tom Nguyen"],["Property","14 Wickham Tce"],["Wanted","Saturday 10 am"],["Party","Two adults"]].map(x=>`<div class="ent"><b>${x[0]}</b>${x[1]}</div>`).join("")}</div>`,
    run:async(el,c)=>{for(const e of $$(".ent",el)){if(!c.ok())return;e.classList.add("on");await c.sleep(260)}await c.sleep(150)}},
   {title:"Checking calendars",sub:"Sam, the vendor and the building manager",html:`<div class="slots">${times.map(t=>`<span class="slot ${busy.includes(t)?"busy":""}">${t}</span>`).join("")}</div><p style="color:var(--ink-2);font-size:13px;margin-top:10px">Struck-through slots clash with another appointment.</p>`,
    run:async(el,c)=>{for(const s of $$(".slot",el)){if(!c.ok())return;s.classList.add("on");await c.sleep(160)}await c.sleep(200)}},
   {title:"Choosing a time",sub:"Closest to their request with no clash",html:`<div class="slots">${times.map(t=>`<span class="slot on ${busy.includes(t)?"busy":""}" data-t="${t}">${t}</span>`).join("")}</div><div class="sig on" style="margin-top:12px"><small>Chosen</small>Saturday 10:00 am matches their request exactly and avoids the vendor’s 9:30 call.</div>`,
    run:async(el,c)=>{await c.sleep(500);$(".slot[data-t='10:00']",el).classList.add("pick");await c.sleep(500)}},
   {title:"Drafting the invites",sub:"To the Nguyens and into Sam’s calendar",html:`<div class="draft"><div class="hd"><b>To:</b> Jess Nguyen<br><b>Subject:</b> Saturday 10am at 14 Wickham Terrace</div><pre id="btxt"></pre></div><div class="acts" id="bacts"><button class="btn sm" type="button" data-t="Demo only: no invite was sent.">Send invites</button><button class="btn ghost sm" type="button" data-t="Demo only: editing is not part of the show.">Edit</button></div>`,
    run:async(el,c)=>{$$("#bacts button",el).forEach(b=>b.onclick=()=>F.toast(b.dataset.t));await c.type($("#btxt",el),"Hi Jess,\n\nSaturday at 10:00 am is confirmed for a private inspection of 14 Wickham Terrace. I will meet you at the lobby, and parking is available in the visitor bay on level 1.\n\nSee you then,\nSam",7);if(c.ok())$("#bacts",el).classList.add("on")}}
  ]});
}
F.register({id:"bookings",label:"Bookings",icon:"book",group:"Property management",
 mount(el){el.innerHTML=`<div class="pad"><div class="pagehead"><div><div class="eyebrow">Bookings</div><h2>Open homes and inspections</h2><p>Every agent’s week in one place. The assistant finds the time and writes the invite.</p></div><button class="btn pulse" id="bookBtn" type="button">${F.SPARK}Book an inspection</button></div><div class="cal" id="cal"></div></div>`;$("#bookBtn",el).onclick=book},show:cal});
})();
