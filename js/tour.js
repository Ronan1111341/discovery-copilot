/* Guided tour. Each tool: a short pop-up brief, then a choreographed walkthrough on the real page.
   The tour presses the real buttons, lifts real areas to the centre of the screen, flies the assistant panel to the middle,
   and pauses on your Next after every step. Everything is scripted on invented sample data. */
(()=>{
const KEY="foyer-tour-offered",ABORT={abort:true};
const nav=(v,l)=>({t:"press",sel:`.nav[data-view="${v}"]`,k:l,text:`Every tool opens from the sidebar. Opening ${l}.`});
const STEPS=[
 {kicker:"Welcome",title:"A show-and-tell, not a live product",art:[11,"tower"],view:"email",
  what:"Foyer is a design and engineering concept for an AI workspace for luxury real estate agents. This tour takes the tools one at a time: a short brief, then a walkthrough on the real page, with the assistant slowed down and explained.",
  demoT:"What you will see",demo:["Nine tools that share one invented world of agents, clients and properties","The real page, with areas lifted to the centre so you can see what they hold","The assistant working one step at a time, each step explained"],
  buildT:"What is real, what is not",build:"Everything on screen is invented sample data and scripted animation. Nothing is read, searched, saved or sent.",chips:["Hand-built HTML, CSS, JS","No framework or back end","Generated artwork","GitHub Pages"]},
 {kicker:"AI Email",title:"AI Email",art:[11,"tower"],view:"email",
  what:"Reads each inbound email, works out who it is from and what they want, finds the earlier conversation, updates the client file and drafts a reply for the agent to approve.",
  demo:["Business emails arrive and wait to be processed","The Nguyen enquiry is opened and the assistant takes over","The client file changes and a reply is drafted, with nothing sent"],
  build:"I would give Claude read-only tools over the mailbox and CRM, have it extract structured fields with a citation to the source email, and require a person to approve every write or send.",chips:["Claude tool use","MCP mailbox and CRM tools","Structured extraction","Retrieval over past mail","Human approval gate"],
  goal:"The assistant will read the email, search past mail, find the earlier conversation, update the client file and draft a reply. Five steps. It pauses after each so you can read what it did.",
  result:"The email was read, matched to the August enquiry, the client file was updated and a reply is waiting for approval. Nothing was sent.",
  done:"AI Email complete. Next: Leads.",
  beats:[nav("email","AI Email"),
   {t:"lift",sel:"#list",arrive:true,text:"Business emails arrive in the inbox and wait to be processed. As each one lands, the assistant sorts it: buyer lead, seller lead, finance, admin. Nothing has been read or changed yet."},
   {t:"press",sel:'#list .row[data-id="1"]',text:"Opening the Nguyen enquiry."},
   {t:"lift",sel:"#reader .msg",pad:true,text:"This is the email. The assistant will read it for the property, the budget and the request. The button at the bottom hands it over."},
   {t:"demo",sel:"#run",text:"Pressing Run AI assistant."},
   {t:"press",sel:'.nav[data-view="clients"]',text:"Now, the client file the assistant just updated."},
   {t:"lift",sel:"#file",text:"The result: a new budget of $1.1m, three-plus bedrooms, a lead score of 88 and a new line in the timeline. The assistant proposed it; the agent stays in charge."}]},
 {kicker:"Leads",title:"Leads",art:[53,"house"],view:"leads",
  what:"Scans email, portal enquiries, open-home sign-ins and past clients for buying and selling signals, then ranks who to call first and says why.",
  demo:["The leads list the assistant maintains","A scan across four sources, step by step","Every lead tagged Found by AI, ranked by how ready they look"],
  build:"A classifier reads each message and its history to score intent. Every score comes with the phrase that triggered it, so the agent can judge it, and accuracy is tested on labelled examples before anyone relies on it.",chips:["Intent classification","Evaluation set","Explainable scores","Portal and CRM feeds"],
  goal:"The assistant will scan four sources for buying and selling signals, rank every lead and suggest one next step each. Four steps, paused after each.",
  result:"Five leads now carry a Found by AI tag, ranked by how ready they look, each with a suggested next step.",done:"Leads complete. Next: Client files.",
  beats:[nav("leads","Leads"),
   {t:"lift",sel:"#leadList",text:"The leads page holds everyone the assistant thinks is ready to buy, sell or invest, each with a score. Open any lead to see why."},
   {t:"demo",sel:"#scanBtn",text:"Pressing Scan for leads."},
   {t:"lift",sel:"#leadList",text:"Every lead now carries a Found by AI tag. The Nguyens are hot after the email we just processed."}]},
 {kicker:"Client files",title:"Client files",art:[41,"terrace"],view:"clients",
  what:"Keeps every client file current from email and calls, and prepares a briefing before each meeting so the agent never walks in cold.",
  demo:["A client file kept up to date from email","Press Prepare my meeting","History, what changed and talking points, built in seconds"],
  build:"Updates are proposed as field-level changes with the source email attached, so the agent sees exactly what changed and why. Writes to the CRM go through the same approval step.",chips:["Field-level diffs","Source citations","CRM write-back","Audit log"],
  goal:"The assistant will gather the history, spot what has changed since the last meeting and build a briefing with talking points and listings to bring. Three steps.",
  result:"The briefing is ready: history, what changed, talking points and listings to bring, built in seconds rather than minutes.",done:"Client files complete. Next: AI Advertising.",
  beats:[nav("clients","Client files"),
   {t:"lift",sel:"#file",text:"Each client has a file that stays current from email. This one belongs to the Nguyens, and it already reflects today’s enquiry."},
   {t:"demo",sel:"#prepBtn",text:"Pressing Prepare my meeting."}]},
 {kicker:"AI Advertising",title:"AI Advertising",art:[23,"tower"],view:"ads",
  what:"Drafts a campaign for each listing and, once connected, shows daily views, enquiries and saves from the property portals with a plain-English insight.",
  demo:["Listings ready for campaigns","The Performance tab with 14 days of sample portal numbers","An AI insight with patterns and recommended next moves"],
  build:"Portal numbers would come from each portal’s official listing-performance access for connected agencies. I have not yet verified exactly what each portal offers, so every figure here is labelled sample data.",chips:["Portal performance feeds (to verify)","Brand-safe copy rules","Approval before spend"],
  goal:"The assistant will pull the portal numbers, find the pattern in them and recommend what to change. Three steps. The figures are sample data.",
  result:"The insight is ready: what moved, why, and three proposed changes. All figures are sample data and nothing was spent.",done:"AI Advertising complete. Next: Reports.",
  beats:[nav("ads","AI Advertising"),
   {t:"lift",sel:"#lsList",text:"Each listing is a campaign. Pick one and the assistant drafts the ads for Facebook, Instagram and the portals."},
   {t:"press",sel:'#adTabs button[data-k="perf"]',text:"Opening the Performance tab."},
   {t:"lift",sel:"#adArea",text:"Fourteen days of daily views, plus enquiries and saves, in the style of Domain and realestate.com.au. These are sample figures, not a live feed."},
   {t:"demo",sel:"#analyse",text:"Pressing Analyse with AI."}]},
 {kicker:"Reports",title:"Reports",art:[37,"house"],view:"reports",
  what:"Writes the weekly vendor report or monthly landlord report, so owners stay informed with real numbers, buyer feedback and a clear recommendation.",
  demo:["Last week’s vendor report","Press Build this week’s report","The document updates, marked as a draft for review"],
  build:"Numbers come from data, never from the model. Claude writes only the narrative around them, and every figure in the text is checked against the data before the draft is shown.",chips:["Data first, narrative second","Number checks","PDF export","Review before sending"],
  goal:"The assistant will gather the numbers, summarise buyer feedback, write a recommendation and assemble the report. Four steps.",
  result:"The report is now marked as this week’s draft, with fresh numbers and a recommendation, ready for the agent to review.",done:"Reports complete. Next: Rentals.",
  beats:[nav("reports","Reports"),
   {t:"lift",sel:"#rpSheet",text:"This is last week’s vendor report for 14 Wickham Terrace: numbers, buyer feedback and a recommendation."},
   {t:"demo",sel:"#rpBuild",text:"Pressing Build this week’s report."},
   {t:"lift",sel:"#rpSheet",text:"The report is now this week’s draft: fresh numbers and an updated recommendation, ready for the agent to review before it goes to the owner."}]},
 {kicker:"Rentals",title:"Rentals",art:[83,"terrace"],view:"rentals",
  what:"Manages the rental portfolio and prepares lease renewals: it checks market rent, proposes a fair figure and drafts the letter for the landlord.",
  demo:["A managed portfolio with the next action on top","Harold Davies’ lease, due for renewal","A fair rent proposal and a drafted letter"],
  build:"Comparable rents come from market data. The proposal follows rules the landlord has agreed in advance, and Claude explains its reasoning in plain language.",chips:["Market rent data","Landlord rules","Lease and ledger extraction","Approval required"],
  goal:"The assistant will read the lease and ledger, check market rent, propose a figure and draft the renewal letter. Four steps.",
  result:"The lease now shows Renewal drafted, with a fair rent proposal and a letter waiting for the landlord’s approval.",done:"Rentals complete. Next: Maintenance.",
  beats:[nav("rentals","Rentals"),
   {t:"press",sel:'#rList button[data-id="r1"]',text:"Selecting Harold Davies’ lease."},
   {t:"lift",sel:"#rDetail",text:"The lease at Merthyr Road: rent, end date and a perfect payment history. The renewal is coming up."},
   {t:"demo",sel:"#renew",text:"Pressing Prepare the renewal."},
   {t:"lift",sel:"#rDetail",text:"The lease now reads Renewal drafted. The landlord approves before anything reaches the tenant."}]},
 {kicker:"Maintenance",title:"Maintenance",art:[67,"house"],view:"maintenance",
  what:"Turns a tenant’s message into a prioritised job: an urgency rating, a matched tradie, drafted messages, and a task on the right agent’s page.",
  demo:["A tenant reports no hot water","Urgency judged, tradies compared, messages drafted","A new task appears on Luca’s agent page"],
  build:"Urgency follows written rules (safety first, then tenancy obligations) so it is predictable, with the model reading the message and explaining its call. Spend limits are set by the landlord.",chips:["Rule-based urgency","Tradie availability","Owner spend limits","Templated messages"],
  goal:"The assistant will read the request, judge its urgency, match a tradie and draft the messages. Four steps.",
  result:"The job is booked in the draft and a task was created for the property manager. Nothing was actually sent.",done:"Maintenance complete. Next: Bookings.",
  beats:[nav("maintenance","Maintenance"),
   {t:"lift",sel:"#mDetail",text:"A tenant’s message has arrived: no hot water, two young children at home."},
   {t:"demo",sel:"#triage",text:"Pressing Triage and book a tradie."},
   {t:"press",sel:'.nav[data-view="agents"]',text:"The request should have created a task. Checking the agents page."},
   {t:"press",sel:'#switch button[data-id="luca"]',text:"Opening Luca Ferretti, the property manager."},
   {t:"lift",sel:".agrid > section:first-child",text:"There it is at the top: confirm the plumber’s arrival. The maintenance tool and the agent’s page share one world."}]},
 {kicker:"Bookings",title:"Bookings",art:[71,"terrace"],view:"bookings",
  what:"Shows every agent’s week of open homes and inspections, and books new ones by finding a clash-free time and writing the invite.",
  demo:["Every agent’s week in one view","Press Book an inspection","A clash-free time chosen and the invite drafted"],
  build:"Slot choice is a scheduling problem solved with plain code against real calendars. The model only handles the request and the wording of the invite.",chips:["Calendar integration","Constraint-based scheduling","Invites with approval"],
  goal:"The assistant will read the request, check calendars, choose a clash-free time and draft the invite. Four steps.",
  result:"A private inspection is booked for Saturday at 10am, with the invite drafted for approval.",done:"Bookings complete. Next: Agents.",
  beats:[nav("bookings","Bookings"),
   {t:"lift",sel:"#cal",text:"Every agent’s open homes and inspections for the week, in one calendar."},
   {t:"demo",sel:"#bookBtn",text:"Pressing Book an inspection."},
   {t:"lift",sel:"#cal",text:"The new private inspection now sits on Saturday, highlighted in green."}]},
 {kicker:"Agents",title:"A page for every agent",art:[53,"house"],view:"agents",
  what:"Gives each agent their own page: tasks ranked by value, open homes, clients and recent sales, plus a plan for the day.",
  demo:["Four agents, one page each","Tasks ranked by value, open homes and clients","A ranked plan for the day"],
  build:"The plan ranks tasks by expected value and deadline using CRM and calendar data, then proposes a timetable the agent can accept or change.",chips:["CRM and calendar data","Value-based ranking","Daily brief"],
  goal:"The assistant will read the day, weigh what matters most and build a timetable. Three steps.",
  result:"The day is ranked by value and laid out as a timetable the agent can accept or change.",done:"Agents complete. That is the last tool.",
  beats:[nav("agents","Agents"),
   {t:"press",sel:'#switch button[data-id="sam"]',text:"Opening Sam Whitlock’s page."},
   {t:"lift",sel:"#agentBody",text:"Sam’s page: tasks ranked by value, this week’s open homes, and clients and recent sales. Every agent has one."},
   {t:"demo",sel:"#planBtn",text:"Pressing Plan my day."}]},
 {kicker:"That is the tour",title:"How I approach this kind of work",art:[11,"tower"],view:"email",final:true,
  what:"The dashboard is the visible part. The way of working behind it is what I would bring to your team.",
  demoT:"What this shows",demo:["Find the real problem first: my earlier Discovery Copilot prototype does exactly that","Make every AI step visible and approvable, so people stay in control","Be honest about what is real: every figure here is labelled sample data"],
  buildT:"See more",links:[["Source on GitHub","https://github.com/Ronan1111341/discovery-copilot"],["Earlier prototype: Discovery Copilot","discovery.html"]]}
];
let i=0,token=0,bg=null,wrap=null,card=null,keyH=null,dim=null,spot=null,cur=null,bar=null,clones=[],rejectNext=null,drawerOut=false;
const q=new URLSearchParams(location.search);
const mark=()=>{try{sessionStorage.setItem(KEY,"1")}catch(e){}};
const started=()=>{try{return sessionStorage.getItem("foyer-tour-started")==="1"}catch(e){return false}};
const markStarted=()=>{try{sessionStorage.setItem("foyer-tour-started","1")}catch(e){}F.$("#tourBtn")?.classList.remove("glow")};
const toolCount=STEPS.length-2,isTool=n=>n>0&&n<STEPS.length-1;
const T=ms=>F.RM?0:F.turbo?ms*.12:ms;
const wait=ms=>new Promise(r=>setTimeout(r,T(ms)));
const chk=tk=>{if(tk!==token)throw ABORT};
async function visible(sel,tk){for(let n=0;n<30;n++){chk(tk);const e=F.$(sel);if(e){const r=e.getBoundingClientRect();if(r.width>0&&r.height>0&&getComputedStyle(e).visibility!=="hidden")return e}await new Promise(r=>setTimeout(r,60))}return null}

/* ---- caption bar ---- */
function barEl(){
  if(!bar){bar=document.createElement("div");bar.className="tbar";bar.setAttribute("role","region");bar.setAttribute("aria-label","Tour");bar.innerHTML=`<div class="tt"><div class="tk"></div><div class="tm" aria-live="polite"></div></div><div class="bb"><button class="lnk" id="tbSkip" type="button">Skip tool</button><button class="btn sm pulse" id="tbNext" type="button" hidden></button><button class="xx" id="tbClose" type="button" aria-label="Close the tour"><svg class="i" viewBox="0 0 24 24" aria-hidden="true" style="width:14px;height:14px"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>`;document.body.append(bar);
    F.$("#tbClose").onclick=()=>end(true);F.$("#tbSkip").onclick=()=>skipTool();requestAnimationFrame(()=>bar&&bar.classList.add("on"))}
  return bar;
}
function say(k,t){const b=barEl();F.$(".tk",b).textContent=k;F.$(".tm",b).textContent=t;F.$("#tbNext").hidden=true;b.classList.add("on")}
function ask(label,tk){
  const b=F.$("#tbNext");b.textContent=label+" ▸";b.hidden=false;b.focus({preventScroll:true});
  return new Promise((res,rej)=>{rejectNext=rej;b.onclick=()=>{rejectNext=null;b.hidden=true;res()}});
}
function barOff(){if(bar){bar.classList.remove("on")}}

/* ---- dim, spotlight, cursor ---- */
function dimOn(){if(!dim){dim=document.createElement("div");dim.className="tdim";document.body.append(dim);requestAnimationFrame(()=>dim&&dim.classList.add("on"))}}
function dimOff(){if(dim){const d=dim;dim=null;d.classList.remove("on");setTimeout(()=>d.remove(),F.RM?0:500)}}
function spotOn(el){
  if(!spot){spot=document.createElement("div");spot.className="tspot";document.body.append(spot)}
  const r=el.getBoundingClientRect(),p=8;Object.assign(spot.style,{opacity:1,top:r.top-p+"px",left:r.left-p+"px",width:r.width+p*2+"px",height:r.height+p*2+"px"});
}
function spotOff(){if(spot)spot.style.opacity=0}
function cursor(){
  if(!cur){cur=document.createElement("div");cur.className="tcursor";cur.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2l15 9-6.5 1.600L9.600 19z" fill="#e8d6a8" stroke="#1a1305" stroke-width="1.400" stroke-linejoin="round"/></svg>';document.body.append(cur);cur.style.transition="none";cur.style.transform=`translate(${innerWidth-90}px,${innerHeight-120}px)`;cur.getBoundingClientRect();cur.style.transition=""}
  return cur;
}
async function pressEl(el,tk){
  const c=cursor(),r=el.getBoundingClientRect();
  spotOn(el);c.style.opacity=1;c.style.transform=`translate(${r.left+r.width/2}px,${r.top+r.height/2}px)`;
  await wait(1000);chk(tk);c.classList.add("press");await wait(280);chk(tk);
  el.click();await wait(220);c.classList.remove("press");spotOff();c.style.opacity=0;await wait(450);chk(tk);
}

/* ---- lift a real area to the centre of the screen, and return it ---- */
const anim=(el,from,to,ms)=>el.animate([{transform:from},{transform:to}],{duration:T(ms),easing:"cubic-bezier(.2,.7,.2,1)",fill:"forwards"}).finished;
async function liftIn(sel,tk,pad){
  const el=await visible(sel,tk);if(!el)return null;
  const r=el.getBoundingClientRect(),vw=innerWidth,vh=innerHeight,res=vw<=720?190:170;
  const c=el.cloneNode(true);c.removeAttribute("id");c.classList.add("liftclone");if(pad)c.classList.add("padded");
  Object.assign(c.style,{position:"fixed",left:r.left+"px",top:r.top+"px",width:r.width+"px",height:"auto",margin:"0",zIndex:360,transformOrigin:"top left",display:"block"});
  document.body.append(c);dimOn();
  const nat=c.getBoundingClientRect().height,availH=vh-res-24,availW=vw*.86;
  let s=Math.min(1.35,availW/r.width,availH/nat);s=Math.max(s,.62);
  const h=Math.min(nat,availH/s);c.style.height=h+"px";
  if(h<nat-4)c.style.webkitMaskImage=c.style.maskImage="linear-gradient(#000 88%,transparent)";
  const dx=(vw-r.width*s)/2-r.left,dy=Math.max(12,(vh-res-h*s)/2+10)-r.top,t=`translate(${dx}px,${dy}px) scale(${s})`;
  await anim(c,"none",t,820);chk(tk);c.style.transform=t;
  const o={c,t};clones.push(o);return o;
}
async function liftOut(o){
  if(!o)return;clones=clones.filter(x=>x!==o);
  try{await anim(o.c,o.t,"none",700)}catch(e){}
  o.c.remove();if(!clones.length)dimOff();
}
async function arrive(o,tk){
  const rows=[...o.c.querySelectorAll(".row")];
  rows.forEach(r=>{r.style.opacity=0;r.style.transform="translateX(-26px)";r.style.transition="opacity .5s,transform .5s";const c=r.querySelector(".c");r._chips=c.innerHTML;c.innerHTML='<span class="chip">Awaiting AI</span>'});
  await wait(300);
  for(const r of rows){chk(tk);r.style.opacity=1;r.style.transform="none";await wait(480)}
  await wait(900);
  for(const r of rows){chk(tk);const c=r.querySelector(".c");c.style.transition="opacity .2s";c.style.opacity=0;await wait(170);c.innerHTML=r._chips;c.style.opacity=1;await wait(200)}
}

/* ---- the walkthrough for one tool ---- */
async function playTool(n){
  const s=STEPS[n],tk=++token,total=s.beats.length;
  try{
    F.closeDrawer();if(F.reset[s.view])F.reset[s.view]();
    let step=0;const K=()=>`${s.kicker} · ${step} of ${total}`;
    for(const b of s.beats){
      step++;chk(tk);
      if(b.t==="press"){say(K(),b.text);const el=await visible(b.sel,tk);if(el)await pressEl(el,tk);else await wait(400)}
      else if(b.t==="lift"){
        say(K(),b.text);const o=await liftIn(b.sel,tk,b.pad);
        if(o&&b.arrive)await arrive(o,tk);
        await ask("Next",tk);chk(tk);await liftOut(o);chk(tk);
      }
      else if(b.t==="demo"){
        say(K(),b.text);const el=await visible(b.sel,tk);
        let done;const finished=new Promise(r=>done=r);
        const halt=()=>new Promise(()=>{}),askH=l=>ask(l,tk).catch(e=>{if(e===ABORT)return halt();throw e});
        F.tourHost={
          async pre(def){spotOff();await wait(700);if(tk!==token)return halt();await F.drawerCenter();if(tk!==token)return halt();dimOn();say(`${s.kicker} · the task`,s.goal);await askH("Start")},
          async start(k,def){if(tk!==token)return halt();say(`Step ${k+1} of ${def.stages.length} · ${def.stages[k].title}`,"The assistant is working. The note in the panel explains what it is doing.")},
          async gate(k,def){if(tk!==token)return halt();say(`Step ${k+1} of ${def.stages.length} · ${def.stages[k].title}`,"Done. Read the note in the panel, then continue.");await askH(k<def.stages.length-1?"Next step":"See the result")},
          async finish(def){if(tk!==token)return halt();say(`${s.kicker} · result`,s.result);await askH("Return the assistant");if(tk!==token)return halt();await F.drawerDock();dimOff();F.closeDrawer();done()}
        };
        if(el)await pressEl(el,tk);
        await finished;chk(tk);F.tourHost=null;await wait(500);
      }
    }
    chk(tk);say(`${s.kicker} · complete`,s.done);
    const last=n===STEPS.length-2;
    await ask(last?"Finish the tour":"Next tool",tk);chk(tk);
    teardown();go(n+1);
  }catch(e){if(e!==ABORT)throw e}
}
function teardown(){
  token++;if(rejectNext){rejectNext(ABORT);rejectNext=null}
  clones.forEach(o=>o.c.remove());clones=[];dimOff();
  if(spot){spot.remove();spot=null}if(cur){cur.remove();cur=null}
  if(bar){bar.remove();bar=null}
  F.tourHost=null;F.pace=1;F.closeDrawer();
}
function skipTool(){const n=i;teardown();if(n>=STEPS.length-2)end();else go(n+1)}

/* ---- pop-up brief ---- */
function popup(n){
  const s=STEPS[n],first=!card;
  if(!bg){bg=document.createElement("div");bg.className="tour-bg";bg.onclick=()=>end(true);wrap=document.createElement("div");wrap.className="tour-wrap";
    wrap.innerHTML=`<div class="tcard" role="dialog" aria-modal="true" aria-labelledby="tTitle"><div class="tart" id="tArt"></div><button class="tx" id="tClose" type="button" aria-label="Close the tour"><svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="tbody"></div><div class="tfoot"><div class="tdots"></div><div class="tbtns"></div></div></div>`;
    document.body.append(bg,wrap);card=F.$(".tcard",wrap);F.$("#tClose").onclick=()=>end(true)}
  bg.classList.remove("out");wrap.classList.remove("out");
  F.$("#tArt",card).innerHTML=`<div class="a">${propertyArt(s.art[0],s.art[1])}</div><span class="num2 num">${isTool(n)?String(n).padStart(2,"0"):""}</span>`;
  F.$(".tdots",card).innerHTML=STEPS.map((_,k)=>`<button type="button" class="${k<=n?"on":""} ${k===n?"cur":""}" data-k="${k}" aria-label="Go to step ${k+1}"></button>`).join("");
  F.$$(".tdots button",card).forEach(b=>b.onclick=()=>go(+b.dataset.k));
  const html=`<div class="eyebrow num">${isTool(n)?`Tool ${n} of ${toolCount} · `:""}${F.esc(s.kicker)}</div><h3 id="tTitle">${F.esc(s.title)}</h3><p class="what">${F.esc(s.what)}</p>
   <div class="tcols"><div><h4>${F.esc(s.demoT||"In the walkthrough")}</h4><ul>${s.demo.map(d=>`<li>${F.esc(d)}</li>`).join("")}</ul></div>
   <div><h4>${F.esc(s.buildT||"How I’d build it")}</h4>${s.links?`<div class="tlinks">${s.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${F.esc(l[0])} →</a>`).join("")}</div>`:`<p>${F.esc(s.build)}</p><div class="tchips">${s.chips.map(c=>`<span>${F.esc(c)}</span>`).join("")}</div>`}</div></div>`;
  const body=F.$(".tbody",card),apply=()=>{
    body.innerHTML=html;body.scrollTop=0;body.classList.remove("swap");
    const back=n?'<button class="btn ghost sm" id="tBack" type="button">Back</button>':"";
    F.$(".tbtns",card).innerHTML=s.beats?`${back}<button class="btn ghost sm" id="tSkipT" type="button">Skip this tool</button><button class="btn sm pulse" id="tShow" type="button">Show me ▶</button>`:`${back}<button class="btn sm" id="tNext" type="button">${n===STEPS.length-1?"Finish":"Start the tour"}</button>`;
    const b=F.$("#tBack");if(b)b.onclick=()=>go(n-1);
    if(s.beats){F.$("#tShow").onclick=()=>show(n);F.$("#tSkipT").onclick=()=>go(n+1);F.$("#tShow").focus({preventScroll:true})}
    else{F.$("#tNext").onclick=()=>n===STEPS.length-1?end():go(n+1);F.$("#tNext").focus({preventScroll:true})}
    F.$("#live").textContent=`${s.kicker}: ${s.title}`;
  };
  if(first){apply()}else{body.classList.add("swap");setTimeout(apply,F.RM?0:180)}
}
function show(n){
  // fade the pop-up away, then run the walkthrough on the real page
  wrap.classList.add("out");bg.classList.add("out");
  setTimeout(()=>{if(bg){bg.remove();wrap.remove();bg=null;wrap=null;card=null}playTool(n)},F.RM?0:480);
}
function go(n){
  teardown();i=n;
  if(n>=STEPS.length)return end();
  popup(n);
}
function end(){
  const fin=STEPS[i]&&STEPS[i].final;teardown();mark();
  if(bg){bg.remove();bg=null}if(wrap){wrap.remove();wrap=null}card=null;
  document.removeEventListener("keydown",keyH);
  if(fin)F.go("email");
  const m=F.$("#main");m&&m.focus({preventScroll:true});
}
F.tour={
  start(){
    if(bg||bar)return;markStarted();F.$(".tour-offer")?.remove();
    if(F.$("#intro")&&F.intro)F.intro.end(true);
    F.closeDrawer();i=0;F.go("email");
    keyH=e=>{
      if(e.key==="Escape")end();
      else if(e.key==="Tab"&&card){const f=F.$$("button,a[href]",card).filter(x=>x.offsetParent!==null);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
    };
    document.addEventListener("keydown",keyH);popup(0);
  },
  offer(){
    if(q.get("tour")==="0"||F.$(".tour-offer")||bg)return;
    try{if(sessionStorage.getItem(KEY)==="1")return}catch(e){}
    const o=document.createElement("div");o.className="tour-offer";o.setAttribute("role","region");o.setAttribute("aria-label","Take the tour");
    o.innerHTML=`<div class="eyebrow">New here?</div><h4>Take the guided tour</h4><p>Each tool, one at a time: a short brief, then a walkthrough on the real page with every step explained.</p><div class="btns"><button class="btn sm pulse" id="oGo" type="button">Start the tour</button><button class="btn ghost sm" id="oNo" type="button">Not now</button></div>`;
    document.body.append(o);F.$("#oGo").onclick=()=>F.tour.start();F.$("#oNo").onclick=()=>{mark();o.remove()};
  },
  init(){
    const tb=F.$("#tourBtn");if(tb){if(q.get("tour")!=="0"&&!started())tb.classList.add("glow");tb.addEventListener("click",()=>F.tour.start())}
    F.$("#startTour")?.addEventListener("click",()=>{const d=F.$("#dlg");d.classList.remove("on");d.close();F.tour.start()});
  }
};
})();
