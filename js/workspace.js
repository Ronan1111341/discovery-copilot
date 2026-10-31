/* Leads, Client files and AI Advertising (Phase 1 keeps their static views; later phases add each tool's scripted demo). */
(()=>{
const {$,$$,esc,initials}=F;
const LEADS=[
{id:1,name:"Jess & Tom Nguyen",kind:"Buyer",score:61,hot:88,src:"Email, 14 Wickham Terrace",why:"Replied to a listing within hours, asked for an inspection and mentioned a pre-approval. Earlier enquiry in August.",next:"Confirm Saturday 10am and offer two similar three-bedroom apartments."},
{id:2,name:"Priya Raman",kind:"Seller",score:74,src:"Email, appraisal request",why:"Owner since 2017, planning a spring sale, recently renovated.",next:"Book an appraisal this week and prepare a recent-sales comparison."},
{id:3,name:"Dev Patel",kind:"Buyer",score:52,src:"Open home follow-up, 7 Banks St",why:"Asked about body corporate fees after the open home.",next:"Send the strata report and ask about his timeline."},
{id:4,name:"Chloe Martin",kind:"Investor",score:66,src:"Newsletter reply",why:"Replied asking about rental yields in Teneriffe.",next:"Send a short yield summary and two investor-grade listings."},
{id:5,name:"Anh Tran",kind:"Past client",score:58,src:"Christmas card reply",why:"Mentioned outgrowing the house they bought in 2019.",next:"Offer a no-obligation catch-up and a current valuation."}
];
let openLead=null;
F.register({id:"leads",label:"Leads",icon:"leads",group:"Workspace",
 mount(el){el.innerHTML=`<div class="pad"><div class="pagehead"><div><div class="eyebrow">Leads</div><h2>Found in your inbox</h2><p>The assistant reads every inbound message and flags people who look ready to buy, sell or invest.</p></div></div>
  <div class="stats"><div class="card stat"><b class="num">5</b><span>leads surfaced this week</span></div><div class="card stat"><b class="num" id="stHot">0</b><span>hot right now</span></div><div class="card stat"><b class="num">0</b><span>emails sent without your approval</span></div></div><div id="leadList"></div></div>`},
 show(){
  $("#leadList").innerHTML=LEADS.map(l=>{const sc=l.id===1&&F.state.ran?l.hot:l.score,hot=sc>=80,cls=hot?"hot":sc>=65?"warn":"";
   return `<div class="lead${openLead===l.id?" open":""}" data-id="${l.id}"><button type="button" aria-expanded="${openLead===l.id}"><span class="av" aria-hidden="true">${initials(l.name)}</span><span class="nm"><b>${esc(l.name)}</b><span>${esc(l.kind)} · ${esc(l.src)}</span></span><span class="score"><span class="chip ${cls}">${hot?"Hot":sc>=65?"Warm":"Cool"}</span><span class="bar"><i style="width:${sc}%"></i></span><b class="num">${sc}</b></span>${F.CHEV}</button>
   <div class="sb"><div><div class="in"><div><h4>Why it is a lead</h4><p>${esc(l.why)}</p></div><div><h4>Suggested next step</h4><p>${esc(l.next)}</p></div><div><button class="btn sm" type="button" data-t="Demo only: no follow-up was drafted.">Draft follow-up</button></div></div></div></div></div>`}).join("");
  $$("#leadList .lead>button").forEach(b=>b.onclick=()=>{const id=+b.parentElement.dataset.id;openLead=openLead===id?null:id;$$("#leadList .lead").forEach(x=>{const o=+x.dataset.id===openLead;x.classList.toggle("open",o);x.querySelector("button").setAttribute("aria-expanded",String(o))})});
  $$("#leadList .sb .btn").forEach(b=>b.onclick=()=>F.toast(b.dataset.t));
  $("#stHot").textContent=F.state.ran?"1":"0";
 }});

/* ---- client files ---- */
const PROFILES={
 c2:{Budget:"n/a",Bedrooms:"4",Parking:"2 car spaces",Suburbs:"Auchenflower",Status:"Considering sale",Finance:"Owner-occupier","Next step":"Book appraisal","Lead score":"74"},
 c3:{Budget:"$780,000",Bedrooms:"2",Parking:"1 car space",Suburbs:"Teneriffe",Status:"Researching",Finance:"Unknown","Next step":"Send strata report","Lead score":"52"},
 c4:{Budget:"$1,000,000",Bedrooms:"2",Parking:"1 car space",Suburbs:"Teneriffe",Status:"Investor, warm",Finance:"Cash and equity","Next step":"Send yield summary","Lead score":"66"},
 c5:{Budget:"$1,800,000",Bedrooms:"4",Parking:"2 car spaces",Suburbs:"Kangaroo Point",Status:"Past client",Finance:"Unknown","Next step":"Catch-up call","Lead score":"58"}
};
const TL={
 c1:[["12 Aug","First enquiry: two-bedroom, around $850k."],["14 Aug","Sent two New Farm listings."],["Yesterday","Broker confirmed pre-approval to $1.1m."]],
 c2:[["2017","Purchased 22 Dunmore Terrace."],["Today","Requested an appraisal by email."]],
 c3:[["Sat","Attended the 7 Banks St open home."],["Today","Asked about body corporate fees."]],
 c4:[["Mon","Replied to the newsletter about yields."]],
 c5:[["Dec","Christmas card reply: outgrowing the house."]]
};
let cur="c1";
function file(){
  const mine=W.clients.filter(c=>c.agent==="sam");
  $("#clList").innerHTML=mine.map(c=>`<button type="button" aria-pressed="${c.id===cur}" data-id="${c.id}"><span class="av" aria-hidden="true">${initials(c.name)}</span><span><b>${esc(c.name)}</b><span>${esc(c.kind)} · ${esc(c.status)}</span></span></button>`).join("");
  $$("#clList button").forEach(b=>b.onclick=()=>{cur=b.dataset.id;F.state.flash=false;file()});
  const c=W.clients.find(x=>x.id===cur),upd=cur==="c1"&&F.state.ran,f=cur==="c1"?(upd?W.nguyen.after:W.nguyen.before):PROFILES[cur],was=W.nguyen.before;
  const tl=(TL[cur]||[]).slice().reverse();if(upd)tl.unshift(["Today","Asked to inspect 14 Wickham Terrace this Saturday at 10am. Draft reply prepared."]);
  $("#file").innerHTML=`<div class="fh"><div><div class="eyebrow">${esc(c.kind)}</div><h3 style="margin-top:8px">${esc(c.name)}</h3></div>${upd?'<span class="chip good">Updated from email just now</span>':'<span class="chip">Up to date</span>'}</div>
  <div class="fields">${Object.keys(f).map(k=>`<div class="${upd&&F.state.flash&&f[k]!==was[k]?"changed":""}"><span class="k mono">${esc(k)}</span><span class="v">${esc(f[k])}</span></div>`).join("")}</div>
  <div class="tl2">${tl.map((t,i)=>`<div class="${upd&&i===0&&F.state.flash?"fresh":""}"><span class="d">${esc(t[0])}</span><span>${esc(t[1])}</span></div>`).join("")}</div>`;
  F.state.flash=false;
}
F.register({id:"clients",label:"Client files",icon:"clients",group:"Workspace",
 mount(el){el.innerHTML=`<div class="pad"><div class="pagehead"><div><div class="eyebrow">Client files</div><h2>Always up to date</h2><p>Updated from email, so you stop typing notes into the CRM.</p></div></div><div class="clients"><div class="cl" id="clList"></div><div class="card file" id="file"></div></div></div>`},
 show:file});

/* ---- advertising ---- */
const ADS={
 p1:{fb:"Skyline views and a walk to Roma Street.\n\nThis renovated three-bedroom apartment at 14 Wickham Terrace has a new kitchen, a secure car space and sun all afternoon. Inspect this Saturday from 10am.\n\nOffers over $1,050,000.",
  ig:"Golden hour, 14 floors up.\nThree bedrooms, new kitchen, city views, a short walk to Roma Street.\n\nInspect Saturday 10am. Link in bio.\n#SpringHill #BrisbaneApartments #JustListed",
  rea:"Renovated 3-bedroom with city views, walk to Roma St\nA light-filled three-bedroom apartment with a new kitchen, secure parking and skyline outlook, close to cafes and transport.",
  aud:["Buyers 30–45","Past enquirers: 2-3 bed","Spring Hill renters"],split:[["Facebook",45],["Instagram",35],["Search",20]]},
 p2:{fb:"Teneriffe living without the compromise.\n\nTwo bedrooms, two bathrooms and a river breeze at 7 Banks Street. Auction this Saturday. Register to bid or book a private inspection.",
  ig:"Teneriffe, but make it effortless.\nTwo bedrooms, two bathrooms, one very good balcony.\n\nAuction Saturday.\n#Teneriffe #BrisbaneAuction #JustListed",
  rea:"Auction Saturday: stylish 2-bed in the heart of Teneriffe\nTwo bedrooms, two bathrooms and a generous balcony, moments from the riverside walk.",
  aud:["Downsizers","Investors, yield-focused","Teneriffe renters"],split:[["Facebook",30],["Instagram",30],["Search",40]]},
 p3:{fb:"Room for the whole family, five minutes from the city.\n\nFour bedrooms, a pool and a flat backyard at 31 Cairns Street. Guide $1,650,000.",
  ig:"Space to grow.\nFour bedrooms, pool, a backyard that deserves a cricket game.\n\nGuide $1.65m.\n#KangarooPoint #FamilyHome #JustListed",
  rea:"Family home with pool, five minutes to the CBD\nFour bedrooms, a sparkling pool and a flat yard in a quiet Kangaroo Point street.",
  aud:["Families 35–50","Upsizers (from your leads)","Past clients"],split:[["Facebook",50],["Instagram",25],["Search",25]]}
};
let lst="p1",adTk=0;
function listings(){
  $("#lsList").innerHTML=["p1","p2","p3"].map(id=>{const p=W.prop(id);return `<button type="button" aria-pressed="${id===lst}" data-id="${id}"><span class="art">${propertyArt(p.seed,p.art)}</span><span class="tx"><b>${esc(p.addr)}</b><span>${esc(p.sub)} · ${esc(p.spec)}</span><span class="pr">${esc(p.price)}</span></span></button>`}).join("");
  $$("#lsList button").forEach(b=>b.onclick=()=>{lst=b.dataset.id;idle();listings()});
}
function idle(){adTk++;const p=W.prop(lst);
  $("#adArea").innerHTML=`<div class="eyebrow">Campaign</div><h3 style="font-size:44px;margin:8px 0 10px">${esc(p.addr)}</h3><p style="color:var(--ink-2);max-width:46ch">The assistant reads the listing, your past campaign results and your enquiry list, then drafts copy and a budget split for you to approve.</p><div style="margin-top:24px"><button class="btn pulse" id="gen" type="button">${F.SPARK}Generate campaign</button></div>`;
  $("#gen").onclick=gen}
async function gen(){
  const tk=++adTk,p=W.prop(lst),a=ADS[lst],steps=["Reading the listing and photos","Checking which past campaigns worked (sample data)","Writing copy for three channels","Sizing the audience and budget split"];
  $("#adArea").innerHTML=`<div class="eyebrow">Working</div><h3 style="font-size:44px;margin:8px 0">${esc(p.addr)}</h3><div class="mini-steps" id="ms">${steps.map(s=>`<div><span class="dot" aria-hidden="true"></span>${s}</div>`).join("")}</div>`;
  const ms=$$("#ms div");for(let i=0;i<ms.length;i++){if(tk!==adTk)return;ms[i].className="act";await F.sleep(700);if(tk!==adTk)return;ms[i].className="ok";ms[i].firstChild.textContent="✓"}
  await F.sleep(200);if(tk!==adTk)return;
  const chans=[["Facebook","fb"],["Instagram","ig"],["realestate.com.au","rea"]];
  $("#adArea").innerHTML=`<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center"><div><div class="eyebrow">Draft campaign</div><h3 style="font-size:44px;margin-top:8px">${esc(p.addr)}</h3></div><span class="chip warn">Draft · not scheduled</span></div>
  <div class="tabs" role="tablist" aria-label="Channel">${chans.map((c,i)=>`<button role="tab" type="button" aria-selected="${i===0}" data-k="${c[1]}">${c[0]}</button>`).join("")}</div><div class="adcopy" id="adCopy" aria-live="polite"></div>
  <div class="rev"><div class="hold" id="r1"><h4>Audience (sample)</h4><div style="display:flex;gap:6px;flex-wrap:wrap">${a.aud.map(x=>`<span class="chip acc">${esc(x)}</span>`).join("")}</div></div><div class="hold" id="r2"><h4>Budget split (illustrative)</h4>${a.split.map(s=>`<div class="split"><span>${s[0]}</span><span class="tr"><i data-w="${s[1]}"></i></span><span class="num">${s[1]}%</span></div>`).join("")}</div></div>
  <div style="margin-top:22px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn" id="sch" type="button">Approve and schedule</button><button class="btn ghost" id="redo" type="button">Start again</button></div>`;
  $("#sch").onclick=()=>F.toast("Demo only: nothing was scheduled or spent.");$("#redo").onclick=idle;
  const copy=$("#adCopy");let cur=0;const show=async k=>{const my=++cur;copy.textContent="";await F.type(copy,a[k],8,()=>my===cur&&tk===adTk)};
  $$("#adArea .tabs button").forEach(b=>b.onclick=()=>{$$("#adArea .tabs button").forEach(x=>x.setAttribute("aria-selected",String(x===b)));show(b.dataset.k)});
  show("fb");await F.sleep(500);$("#r1").classList.add("on");await F.sleep(300);$("#r2").classList.add("on");$$("#r2 .tr i").forEach(i=>i.style.width=i.dataset.w+"%");
}
F.register({id:"ads",label:"AI Advertising",icon:"ads",group:"Workspace",
 mount(el){el.innerHTML=`<div class="pad"><div class="pagehead"><div><div class="eyebrow">AI Advertising</div><h2>Campaigns that write themselves</h2><p>Pick a listing. The assistant drafts the campaign and shows where it would spend.</p></div></div><div class="ads"><div class="ls" id="lsList"></div><div class="card stagearea" id="adArea"></div></div></div>`;listings();idle()},
 show(){}});
})();
