/* Leads, Client files and AI Advertising (Phase 1 keeps their static views; later phases add each tool's scripted demo). */
(()=>{
const {$,$$,esc,initials}=F;
/* Sample portal numbers: shaped like a Domain / realestate.com.au listing-performance feed, but invented and deterministic. */
F.series=seed=>{let a=seed*131+7;const r=()=>{a=(a*1664525+1013904223)>>>0;return a/4294967296};const d=[],e=[],n=14;
  for(let i=0;i<n;i++){const wk=[0,0,0,0,0,1,1][(i+4)%7],bump=i>=9?1.7:1;d.push(Math.round((60+r()*30+wk*55)*bump));e.push(Math.round((38+r()*22+wk*40)*bump))}
  return {domain:d,rea:e,days:Array.from({length:n},(_,i)=>i),change:9}};
F.chart=(s,opts={})=>{const W_=620,H=opts.h||220,pad={l:34,r:12,t:14,b:24},max=Math.ceil(Math.max(...s.domain,...s.rea)/40)*40,n=s.domain.length;
  const x=i=>pad.l+i*(W_-pad.l-pad.r)/(n-1),y=v=>pad.t+(1-v/max)*(H-pad.t-pad.b);
  const path=a=>a.map((v,i)=>(i?"L":"M")+x(i).toFixed(1)+" "+y(v).toFixed(1)).join(" ");
  const grid=[0,.25,.5,.75,1].map(f=>`<line class="ax" x1="${pad.l}" x2="${W_-pad.r}" y1="${y(max*f).toFixed(1)}" y2="${y(max*f).toFixed(1)}"/><text x="${pad.l-6}" y="${(y(max*f)+3).toFixed(1)}" text-anchor="end">${Math.round(max*f)}</text>`).join("");
  const lab=[0,3,6,9,13].map(i=>`<text x="${x(i).toFixed(1)}" y="${H-6}" text-anchor="middle">${i===13?"Today":(13-i)+"d ago"}</text>`).join("");
  const cx=x(s.change);
  return `<svg class="chart" viewBox="0 0 ${W_} ${H}" role="img" aria-label="Daily views over 14 days on Domain and realestate.com.au, sample data">${grid}${lab}
   <line x1="${cx}" x2="${cx}" y1="${pad.t}" y2="${H-pad.b}" stroke="${opts.light?"#a8631b":"var(--warn)"}" stroke-dasharray="3 4"/><text x="${cx+5}" y="${pad.t+9}" style="fill:${opts.light?"#a8631b":"var(--warn)"}">Price guide updated</text>
   <path class="ln2" d="${path(s.rea)}"/><path class="ln1" d="${path(s.domain)}"${opts.light?' style="stroke:#8d6b2c"':""}/>
   <circle cx="${x(n-1)}" cy="${y(s.domain[n-1])}" r="3.5" fill="${opts.light?"#8d6b2c":"var(--brass)"}"/><circle cx="${x(n-1)}" cy="${y(s.rea[n-1])}" r="3.5" fill="#8fb4e8"/></svg>`};
F.sum=a=>a.reduce((x,y)=>x+y,0);
F.lift=s=>{const av=(a,i,j)=>F.sum(a.slice(i,j))/(j-i),b=av(s.domain,4,9)+av(s.rea,4,9),n=av(s.domain,9,14)+av(s.rea,9,14);return Math.round((n/b-1)*100)};
const LEADS=[
{id:1,name:"Jess & Tom Nguyen",kind:"Buyer",score:61,hot:88,src:"Email, 14 Wickham Terrace",why:"Replied to a listing within hours, asked for an inspection and mentioned a pre-approval. Earlier enquiry in August.",next:"Confirm Saturday 10am and offer two similar three-bedroom apartments."},
{id:2,name:"Priya Raman",kind:"Seller",score:74,src:"Email, appraisal request",why:"Owner since 2017, planning a spring sale, recently renovated.",next:"Book an appraisal this week and prepare a recent-sales comparison."},
{id:3,name:"Dev Patel",kind:"Buyer",score:52,src:"Open home follow-up, 7 Banks St",why:"Asked about body corporate fees after the open home.",next:"Send the strata report and ask about his timeline."},
{id:4,name:"Chloe Martin",kind:"Investor",score:66,src:"Newsletter reply",why:"Replied asking about rental yields in Teneriffe.",next:"Send a short yield summary and two investor-grade listings."},
{id:5,name:"Anh Tran",kind:"Past client",score:58,src:"Christmas card reply",why:"Mentioned outgrowing the house they bought in 2019.",next:"Offer a no-obligation catch-up and a current valuation."}
];
let openLead=null;
function scan(){
  const srcs=[["Inbox",2418],["Portal enquiries (sample)",37],["Open-home sign-ins",54],["Past clients",312]];
  const sig=[["“Lena at the brokers has pre-approved us up to $1.1m”","Buyer signal · Nguyen"],["“We’re thinking of selling in the spring”","Seller signal · Raman"],["“Do you know what the body corporate fees are?”","Buyer signal · Patel"],["“What yields are you seeing in Teneriffe?”","Investor signal · Martin"],["“We’ve outgrown the house we bought in 2019”","Upsizer signal · Tran"]];
  const ranked=LEADS.slice().sort((a,b)=>(b.id===1?b.hot:b.score)-(a.id===1?a.hot:a.score));
  F.runDemo({title:"Find leads",
   onDone:()=>{F.state.scanned=true;F.current.show()},
   note:"<b>Done.</b> Scripted demo: nothing was read from a real inbox or portal. The five leads now carry a “Found by AI” tag.",
   stages:[
   {title:"Scanning your sources",sub:"Inbox, portal enquiries, sign-ins, past clients",html:srcs.map(s=>`<div class="scanrow"><span>${s[0]}</span><b class="num" data-to="${s[1]}">0</b></div>`).join(""),
    run:async(el,c)=>{await Promise.all($$("b",el).map(b=>c.count(b,+b.dataset.to,1500)))}},
   {title:"Spotting buying and selling signals",sub:"Phrases that suggest intent",html:sig.map(s=>`<div class="sig"><q>${esc(s[0])}</q><small>${esc(s[1])}</small></div>`).join(""),
    run:async(el,c)=>{for(const s of $$(".sig",el)){if(!c.ok())return;s.classList.add("on");await c.sleep(340)}}},
   {title:"Ranking by likelihood",sub:"Score from 0 to 100",html:`<div class="wbars">${ranked.map(l=>{const sc=l.id===1?l.hot:l.score;return `<div class="wb"><span>${esc(l.name)}</span><span class="num">${sc}</span><div class="tr"><i data-w="${sc}"></i></div></div>`}).join("")}</div>`,
    run:async(el,c)=>{for(const w of $$(".wb",el)){if(!c.ok())return;w.classList.add("on");await c.sleep(90);$(".tr i",w).style.width=$(".tr i",w).dataset.w+"%";await c.sleep(260)}}},
   {title:"Choosing next steps",sub:"One clear action per lead",html:ranked.slice(0,3).map(l=>`<div class="sig"><q>${esc(l.next)}</q><small>${esc(l.name)}</small></div>`).join(""),
    run:async(el,c)=>{for(const s of $$(".sig",el)){if(!c.ok())return;s.classList.add("on");await c.sleep(380)}}}
  ]});
}
F.register({id:"leads",label:"Leads",icon:"leads",group:"Workspace",
 mount(el){el.innerHTML=`<div class="pad"><div class="pagehead"><div><div class="eyebrow">Leads</div><h2>Found in your inbox</h2><p>The assistant reads every inbound message and flags people who look ready to buy, sell or invest.</p></div><button class="btn pulse" id="scanBtn" type="button">${F.SPARK}Scan for leads</button></div>
  <div class="stats"><div class="card stat"><b class="num">5</b><span>leads surfaced this week</span></div><div class="card stat"><b class="num" id="stHot">0</b><span>hot right now</span></div><div class="card stat"><b class="num">0</b><span>emails sent without your approval</span></div></div><div id="leadList"></div></div>`},
 show(){
  $("#leadList").innerHTML=LEADS.map(l=>{const sc=l.id===1&&F.state.ran?l.hot:l.score,hot=sc>=80,cls=hot?"hot":sc>=65?"warn":"";
   return `<div class="lead${openLead===l.id?" open":""}" data-id="${l.id}"><button type="button" aria-expanded="${openLead===l.id}"><span class="av" aria-hidden="true">${initials(l.name)}</span><span class="nm"><b>${esc(l.name)}${F.state.scanned?' <span class="chip acc" style="margin-left:8px">Found by AI</span>':""}</b><span>${esc(l.kind)} · ${esc(l.src)}</span></span><span class="score"><span class="chip ${cls}">${hot?"Hot":sc>=65?"Warm":"Cool"}</span><span class="bar"><i style="width:${sc}%"></i></span><b class="num">${sc}</b></span>${F.CHEV}</button>
   <div class="sb"><div><div class="in"><div><h4>Why it is a lead</h4><p>${esc(l.why)}</p></div><div><h4>Suggested next step</h4><p>${esc(l.next)}</p></div><div><button class="btn sm" type="button" data-t="Demo only: no follow-up was drafted.">Draft follow-up</button></div></div></div></div></div>`}).join("");
  $$("#leadList .lead>button").forEach(b=>b.onclick=()=>{const id=+b.parentElement.dataset.id;openLead=openLead===id?null:id;$$("#leadList .lead").forEach(x=>{const o=+x.dataset.id===openLead;x.classList.toggle("open",o);x.querySelector("button").setAttribute("aria-expanded",String(o))})});
  $$("#leadList .sb .btn").forEach(b=>b.onclick=()=>F.toast(b.dataset.t));
  $("#stHot").textContent=F.state.ran?"1":"0";
  $("#scanBtn").onclick=scan;
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
const INS={c2:["Owner since 2017","Renovated the kitchen since your last visit","Wants to sell in spring"],c3:["Asked about body corporate fees","Budget around $780k","Attended the Banks St open home"],c4:["Asked about Teneriffe rental yields","Cash and equity, ready to move","Prefers two-bedroom apartments"],c5:["Outgrowing the house bought in 2019","Warm past-client relationship","Open to a catch-up"]};
const LISTS={c1:["p1","p2"],c2:["p8","p3"],c3:["p2","p1"],c4:["p2","p1"],c5:["p3","p8"]};
function prep(){
  const c=W.clients.find(x=>x.id===cur),ins=cur==="c1"?(F.state.ran?["Budget up from $850k to $1.1m after the broker’s pre-approval","Brief widened from two to three-plus bedrooms","Keen to inspect this Saturday at 10am"]:["Budget around $850k, pre-approval pending","Wants two bedrooms and a car space","Last asked about New Farm listings in August"]):INS[cur],
   tl=(TL[cur]||[]),pts=`1. Open with what they told you last: ${ins[0].toLowerCase()}.\n2. Check the brief still fits: ${ins[1].toLowerCase()}.\n3. Ask what has changed in their timing.\n4. Agree one next step: ${(PROFILES[cur]?PROFILES[cur]["Next step"]:W.nguyen[F.state.ran?"after":"before"]["Next step"]).toLowerCase()}.`.replace(/\\n/g,"\n");
  F.runDemo({title:"Meeting briefing",note:"<b>Done.</b> Scripted demo: nothing was saved or shared. A real briefing would be ready before every meeting.",
   stages:[
   {title:"Gathering the history",sub:"Every email, call and inspection",html:`<div class="tline">${tl.map(t=>`<div class="tl"><span class="tm">${esc(t[0])}</span><span>${esc(t[1])}</span></div>`).join("")}</div>`,
    run:async(el,c2)=>{for(const r of $$(".tl",el)){if(!c2.ok())return;r.classList.add("on");await c2.sleep(300)}}},
   {title:"Spotting what matters",sub:"What changed since you last met",html:ins.map(t=>`<div class="sig"><q>${esc(t)}</q></div>`).join(""),
    run:async(el,c2)=>{for(const s of $$(".sig",el)){if(!c2.ok())return;s.classList.add("on");await c2.sleep(380)}}},
   {title:"Building the briefing",sub:"Talking points and what to bring",html:`<div class="draft"><pre class="pts" id="pts"></pre></div>${(LISTS[cur]||[]).map(id=>{const p=W.prop(id);return `<div class="mini"><div class="art">${propertyArt(p.seed,p.art)}</div><div><b>${esc(p.addr)}</b><span>${esc(p.sub)} · ${esc(p.price)}</span></div></div>`}).join("")}`,
    run:async(el,c2)=>{await c2.type($("#pts",el),pts,8);for(const m of $$(".mini",el)){if(!c2.ok())return;m.classList.add("on");await c2.sleep(380)}}}
  ]});
}
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
  $("#prepBtn").onclick=prep;
}
F.register({id:"clients",label:"Client files",icon:"clients",group:"Workspace",
 mount(el){el.innerHTML=`<div class="pad"><div class="pagehead"><div><div class="eyebrow">Client files</div><h2>Always up to date</h2><p>Updated from email, so you stop typing notes into the CRM.</p></div><button class="btn pulse" id="prepBtn" type="button">${F.SPARK}Prepare my meeting</button></div><div class="clients"><div class="cl" id="clList"></div><div class="card file" id="file"></div></div></div>`},
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
let lst="p1",adTk=0,adTab="camp";
function perf(){adTk++;const p=W.prop(lst),s=F.series(p.seed),td=F.sum(s.domain),tr=F.sum(s.rea),enq=Math.round((td+tr)/38),sv=Math.round((td+tr)/9);
  $("#adArea").innerHTML=`<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:flex-start"><div><div class="eyebrow">Portal performance</div><h3 style="font-size:44px;margin-top:8px">${esc(p.addr)}</h3></div><span class="chip warn">Sample data · shaped like a portal feed</span></div>
  <div class="kpis"><div><b class="num">${(td+tr).toLocaleString("en-AU")}</b><span>views, 14 days</span></div><div><b class="num">${enq}</b><span>enquiries</span></div><div><b class="num">${sv}</b><span>saves</span></div><div><b class="num">+${F.lift(s)}%</b><span>daily views since the price update</span></div></div>
  <div class="legend"><span><i style="background:var(--brass)"></i>Domain</span><span><i style="background:#8fb4e8"></i>realestate.com.au</span></div>${F.chart(s)}
  <div style="margin-top:18px"><button class="btn pulse" id="analyse" type="button">${F.SPARK}Analyse with AI</button></div>`;
  $("#analyse").onclick=()=>F.runDemo({title:"Performance insight",note:"<b>Done.</b> Scripted demo with sample figures. A real version would read the portal’s listing-performance numbers once an agency connects its account.",
   stages:[
   {title:"Pulling the portal numbers",sub:"Domain and realestate.com.au (sample)",html:[["Domain views",td],["realestate.com.au views",tr],["Enquiries",enq],["Saves",sv]].map(r=>`<div class="scanrow"><span>${r[0]}</span><b class="num" data-to="${r[1]}">0</b></div>`).join(""),run:async(el,c)=>{await Promise.all($$("b",el).map(b=>c.count(b,+b.dataset.to,1300)))}},
   {title:"Finding the pattern",sub:"What moved, and why",html:["Views rose sharply the day after the price guide was updated.","Weekends carry more than half of all views, so boosts should land on Thursday night.",`Saves outnumber enquiries about four to one: buyers are watching, not calling.`].map(t=>`<div class="sig"><q>${esc(t)}</q></div>`).join(""),run:async(el,c)=>{for(const s of $$(".sig",el)){if(!c.ok())return;s.classList.add("on");await c.sleep(420)}}},
   {title:"Recommending next moves",sub:"Each one is a proposal for you to approve",html:["Shift 10% of the budget from search to Instagram for the weekend.","Lead the portal listing with the twilight photo.",`Send the ${sv} buyers who saved this listing a private invitation to the open home.`].map(t=>`<div class="sig"><q>${esc(t)}</q></div>`).join(""),run:async(el,c)=>{for(const s of $$(".sig",el)){if(!c.ok())return;s.classList.add("on");await c.sleep(420)}}}
  ]});
}
function listings(){
  $("#lsList").innerHTML=["p1","p2","p3"].map(id=>{const p=W.prop(id);return `<button type="button" aria-pressed="${id===lst}" data-id="${id}"><span class="art">${propertyArt(p.seed,p.art)}</span><span class="tx"><b>${esc(p.addr)}</b><span>${esc(p.sub)} · ${esc(p.spec)}</span><span class="pr">${esc(p.price)}</span></span></button>`}).join("");
  $$("#lsList button").forEach(b=>b.onclick=()=>{lst=b.dataset.id;F.closeDrawer();adTab==="perf"?perf():idle();listings()});
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
 mount(el){el.innerHTML=`<div class="pad"><div class="pagehead"><div><div class="eyebrow">AI Advertising</div><h2>Campaigns that write themselves</h2><p>Pick a listing. The assistant drafts the campaign and shows where it would spend.</p></div></div><div class="ads"><div class="ls" id="lsList"></div><div><div class="tabbar" role="tablist" id="adTabs"><button role="tab" type="button" aria-selected="true" data-k="camp">Campaign</button><button role="tab" type="button" aria-selected="false" data-k="perf">Performance</button></div><div class="card stagearea" id="adArea"></div></div></div></div>`;listings();idle();$$("#adTabs button",el).forEach(b=>b.onclick=()=>{adTab=b.dataset.k;F.closeDrawer();$$("#adTabs button").forEach(x=>x.setAttribute("aria-selected",String(x===b)));adTab==="perf"?perf():idle()})},
 show(){}});
})();
