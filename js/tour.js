/* Guided tour: one pop-up per tool, explaining what it does, what the demo shows, and how it would be built for real. */
(()=>{
const KEY="foyer-tour-offered";
const STEPS=[
 {view:"email",kicker:"Welcome",title:"A show-and-tell, not a live product",art:[11,"tower"],
  what:"Foyer is a design and engineering concept for an AI workspace for luxury real estate agents. This tour takes the tools one at a time: what each does, what its demo shows, and how it would be built for real.",
  demoT:"What you will see",demo:["Nine tools that share one invented world of agents, clients and properties","A scripted AI moment behind every button, started by you","Actions that carry across tools: a maintenance request creates a task on an agent’s page"],
  buildT:"What is real, what is not",build:"Everything on screen is invented sample data and scripted animation. Nothing is read, searched, saved or sent.",chips:["Hand-built HTML, CSS, JS","No framework or back end","Generated artwork","GitHub Pages"]},
 {view:"email",kicker:"AI Email",title:"AI Email",result:"The client file now shows the new budget and a lead score of 88, and a reply is waiting for approval. Nothing was sent.",peek:{view:"clients",note:"<b>Client files:</b> the Nguyen file, updated by the assistant."},art:[11,"tower"],
  what:"Reads each inbound email, works out who it is from and what they want, finds the earlier conversation, updates the client file and drafts a reply for the agent to approve.",
  demo:["Open the Nguyen enquiry and press Run AI assistant","Watch it highlight the details, search 2,418 emails and match the August thread","See the client file change and a reply type out, with nothing sent"],
  build:"I would give Claude read-only tools over the mailbox and CRM, have it extract structured fields with a citation to the source email, and require a person to approve every write or send.",chips:["Claude tool use","MCP mailbox and CRM tools","Structured extraction","Retrieval over past mail","Human approval gate"],
  try:()=>F.$("#run").click(),tryLabel:"Run this demo"},
 {view:"leads",kicker:"Leads",title:"Leads",result:"Five leads now carry a Found by AI tag, ranked by how ready they look, and the Nguyens have jumped to hot.",art:[53,"house"],
  what:"Scans email, portal enquiries, open-home sign-ins and past clients for buying and selling signals, then ranks who to call first and says why.",
  demo:["Press Scan for leads","Watch the buying and selling phrases it picks out","See the ranking, and one clear next step for each lead"],
  build:"A classifier reads each message and its history to score intent. Every score comes with the phrase that triggered it, so the agent can judge it, and accuracy is tested on labelled examples before anyone relies on it.",chips:["Intent classification","Evaluation set","Explainable scores","Portal and CRM feeds"],
  try:()=>F.$("#scanBtn").click(),tryLabel:"Run this demo"},
 {view:"clients",kicker:"Client files",title:"Client files",result:"The briefing is ready: history, what changed, talking points and listings to bring, built in seconds rather than minutes.",art:[41,"terrace"],
  what:"Keeps every client file current from email and calls, and prepares a briefing before each meeting so the agent never walks in cold.",
  demo:["Open a client and press Prepare my meeting","See the history, what changed and the talking points build up","Listings worth bringing, matched to their brief"],
  build:"Updates are proposed as field-level changes with the source email attached, so the agent sees exactly what changed and why. Writes to the CRM go through the same approval step.",chips:["Field-level diffs","Source citations","CRM write-back","Audit log"],
  try:()=>F.$("#prepBtn").click(),tryLabel:"Run this demo"},
 {view:"ads",kicker:"AI Advertising",title:"AI Advertising",result:"The insight is ready: what moved, why, and three proposed changes. All figures are sample data and nothing was spent.",art:[23,"tower"],
  what:"Drafts a campaign for each listing and, once connected, shows daily views, enquiries and saves from the property portals with a plain-English insight.",
  demo:["Pick a listing and generate a campaign","Open Performance for 14 days of sample portal numbers","Press Analyse with AI for patterns and recommended next moves"],
  build:"Portal numbers would come from each portal’s official listing-performance access for connected agencies. I have not yet verified exactly what each portal offers, so every figure here is labelled sample data.",chips:["Portal performance feeds (to verify)","Brand-safe copy rules","Approval before spend"],
  try:()=>{F.$('#adTabs button[data-k="perf"]').click();setTimeout(()=>F.$("#analyse")&&F.$("#analyse").click(),500)},tryLabel:"Run this demo"},
 {view:"reports",kicker:"Reports",title:"Reports",result:"The report is now marked as this week’s draft with fresh numbers and a recommendation, ready for the agent to review.",art:[37,"house"],
  what:"Writes the weekly vendor report or monthly landlord report, so owners stay informed with real numbers, buyer feedback and a clear recommendation.",
  demo:["Choose a listing or a rental","Press Build this week’s report","See the document update, marked as a draft for review"],
  build:"Numbers come from data, never from the model. Claude writes only the narrative around them, and every figure in the text is checked against the data before the draft is shown.",chips:["Data first, narrative second","Number checks","PDF export","Review before sending"],
  try:()=>F.$("#rpBuild").click(),tryLabel:"Run this demo"},
 {view:"rentals",kicker:"Rentals",title:"Rentals",result:"The lease now shows Renewal drafted, with a fair rent proposal and a letter waiting for the landlord’s approval.",prep:()=>{const b=F.$('#rList button[data-id="r1"]');b&&b.click()},art:[83,"terrace"],
  what:"Manages the rental portfolio and prepares lease renewals: it checks market rent, proposes a fair figure and drafts the letter for the landlord.",
  demo:["Select the Merthyr Road lease and press Prepare the renewal","Watch comparable rents shape the proposal","See the letter and the status change to Renewal drafted"],
  build:"Comparable rents come from market data. The proposal follows rules the landlord has agreed in advance, and Claude explains its reasoning in plain language.",chips:["Market rent data","Landlord rules","Lease and ledger extraction","Approval required"],
  try:()=>F.$("#renew").click(),tryLabel:"Run this demo"},
 {view:"maintenance",kicker:"Maintenance",title:"Maintenance",result:"The job is booked in the draft and a new task was created on Luca’s agent page. Nothing was actually sent.",prep:()=>{const b=F.$('#mList button[data-id="m1"]');b&&b.click()},peek:{view:"agents",sub:"luca",note:"<b>Luca’s page:</b> the new task created by the maintenance request."},art:[67,"house"],
  what:"Turns a tenant’s message into a prioritised job: an urgency rating, a matched tradie, drafted messages, and a task on the right agent’s page.",
  demo:["Open No hot water and press Triage and book a tradie","See urgency judged and three tradies compared","Then open Luca’s agent page to find the new task"],
  build:"Urgency follows written rules (safety first, then tenancy obligations) so it is predictable, with the model reading the message and explaining its call. Spend limits are set by the landlord.",chips:["Rule-based urgency","Tradie availability","Owner spend limits","Templated messages"],
  try:()=>F.$("#triage").click(),tryLabel:"Run this demo"},
 {view:"bookings",kicker:"Bookings",title:"Bookings",result:"The new inspection now appears on Saturday’s calendar, with the invite drafted for approval.",art:[71,"terrace"],
  what:"Shows every agent’s week of open homes and inspections, and books new ones by finding a clash-free time and writing the invite.",
  demo:["Press Book an inspection","Watch the slots checked and one chosen","See the new booking appear on Saturday"],
  build:"Slot choice is a scheduling problem solved with plain code against real calendars. The model only handles the request and the wording of the invite.",chips:["Calendar integration","Constraint-based scheduling","Invites with approval"],
  try:()=>F.$("#bookBtn").click(),tryLabel:"Run this demo"},
 {view:"agents",kicker:"Agents",title:"A page for every agent",result:"The day is ranked by value and laid out as a timetable the agent can accept or change.",art:[53,"house"],
  what:"Gives each agent their own page: tasks ranked by value, open homes, clients and recent sales, plus a plan for the day.",
  demo:["Switch between four agents","Tick off a task and watch the count change","Press Plan my day for a ranked timetable"],
  build:"The plan ranks tasks by expected value and deadline using CRM and calendar data, then proposes a timetable the agent can accept or change.",chips:["CRM and calendar data","Value-based ranking","Daily brief"],
  try:()=>F.$("#planBtn").click(),tryLabel:"Run this demo"},
 {view:"email",kicker:"That is the tour",title:"How I approach this kind of work",art:[11,"tower"],
  what:"The dashboard is the visible part. The way of working behind it is what I would bring to your team.",
  demoT:"What this shows",demo:["Find the real problem first: my earlier Discovery Copilot prototype does exactly that","Make every AI step visible and approvable, so people stay in control","Be honest about what is real: every figure here is labelled sample data"],
  buildT:"See more",links:[["Source on GitHub","https://github.com/Ronan1111341/discovery-copilot"],["Earlier prototype: Discovery Copilot","discovery.html"]],final:true}
];
let i=0,bg=null,wrap=null,card=null,keyH=null,phase="explain",peekBar=null;
const q=new URLSearchParams(location.search);
const mark=()=>{try{sessionStorage.setItem(KEY,"1")}catch(e){}};
const started=()=>{try{return sessionStorage.getItem("foyer-tour-started")==="1"}catch(e){return false}};
const markStarted=()=>{try{sessionStorage.setItem("foyer-tour-started","1")}catch(e){}F.$("#tourBtn")?.classList.remove("glow")};
const toolCount=STEPS.length-2,PACE=1.3;
const isTool=n=>n>0&&n<STEPS.length-1;
const hasDemo=n=>!!STEPS[n].try;
const art=s=>propertyArt(s.art[0],s.art[1]);
function frame(n){
  const s=STEPS[n];
  F.$("#tArt",card).innerHTML=`<div class="a">${art(s)}</div><span class="num2 num">${isTool(n)?String(n).padStart(2,"0"):""}</span>`;
  F.$(".tdots",card).innerHTML=STEPS.map((_,k)=>`<button type="button" class="${k<=n?"on":""} ${k===n?"cur":""}" data-k="${k}" aria-label="Go to step ${k+1}"></button>`).join("");
  F.$$(".tdots button",card).forEach(b=>b.onclick=()=>go(+b.dataset.k));
}
function swap(html,after){const body=F.$(".tbody",card);body.classList.add("swap");setTimeout(()=>{body.innerHTML=html;body.scrollTop=0;body.classList.remove("swap");after&&after()},F.RM?0:180)}
function btns(html){F.$(".tbtns",card).innerHTML=html}
function explain(n){
  phase="explain";const s=STEPS[n];card.classList.remove("watching");frame(n);
  const html=`<div class="eyebrow num">${isTool(n)?`Tool ${n} of ${toolCount} · `:""}${F.esc(s.kicker)}</div><h3 id="tTitle">${F.esc(s.title)}</h3><p class="what">${F.esc(s.what)}</p>
   <div class="tcols"><div><h4>${F.esc(s.demoT||"In the demo")}</h4><ul>${s.demo.map(d=>`<li>${F.esc(d)}</li>`).join("")}</ul></div>
   <div><h4>${F.esc(s.buildT||"How I’d build it")}</h4>${s.links?`<div class="tlinks">${s.links.map(l=>`<a href="${l[1]}" target="_blank" rel="noopener">${F.esc(l[0])} →</a>`).join("")}</div>`:`<p>${F.esc(s.build)}</p><div class="tchips">${s.chips.map(c=>`<span>${F.esc(c)}</span>`).join("")}</div>`}</div></div>`;
  swap(html,()=>{
    if(hasDemo(n)){btns(`${n?'<button class="btn ghost sm" id="tBack" type="button">Back</button>':""}<button class="btn ghost sm" id="tSkip" type="button">Skip this tool</button><button class="btn sm pulse" id="tWatch" type="button">Watch it work ▶</button>`);F.$("#tWatch").onclick=()=>watch(n);F.$("#tSkip").onclick=()=>next(n);F.$("#tWatch").focus({preventScroll:true})}
    else{btns(`${n?'<button class="btn ghost sm" id="tBack" type="button">Back</button>':""}<button class="btn sm" id="tNext" type="button">${n===STEPS.length-1?"Finish":"Start the tour"}</button>`);F.$("#tNext").onclick=()=>next(n);F.$("#tNext").focus({preventScroll:true})}
    const b=F.$("#tBack");if(b)b.onclick=()=>go(n-1);
    F.$("#live").textContent=`${s.kicker}: ${s.title}`;
  });
}
function watch(n){
  phase="watch";const s=STEPS[n];card.classList.add("watching");frame(n);
  F.closeDrawer();
  if(F.reset[s.view]){F.reset[s.view]();if(F.current&&F.current.show)F.current.show(F.$("#v-"+F.current.id))}
  s.prep&&s.prep();
  swap(`<div class="eyebrow num">Watching · ${F.esc(s.kicker)}</div><h3>${F.esc(s.title)}</h3><p class="what" style="font-size:14.5px;color:var(--ink-2)">Slowed down, with a note at each step on what is happening and how it would work for real.</p><div class="thost" id="tHost"></div><div class="trecap" id="tRecap" hidden></div>`,()=>{
    btns(`<button class="btn ghost sm" id="tSpeed" type="button">Speed up ⏩</button>`);
    F.$("#tSpeed").onclick=()=>{F.pace=0};
    F.pace=PACE;F.tourHost={el:F.$("#tHost"),finish:def=>finished(n,def)};
    setTimeout(()=>{if(phase==="watch"&&card)s.try()},250);
  });
}
function finished(n,def){
  if(!card||phase!=="watch")return;phase="done";const s=STEPS[n];
  const r=F.$("#tRecap",card);r.hidden=false;r.innerHTML=`<h4>What just happened</h4><p>${F.esc(s.result||"The demo finished. Everything was scripted: nothing was read, saved or sent.")}</p>`;
  btns(`<button class="btn ghost sm" id="tAgain" type="button">Watch again</button>${s.peek?'<button class="btn ghost sm" id="tPeek" type="button">See it in the tool</button>':""}<button class="btn sm" id="tNext" type="button">${n===STEPS.length-2?"Last card":"Next tool"} →</button>`);
  F.$("#tAgain").onclick=()=>watch(n);const p=F.$("#tPeek");if(p)p.onclick=()=>peek(n);
  F.$("#tNext").onclick=()=>next(n);F.$("#tNext").focus({preventScroll:true});
  r.scrollIntoView({block:"nearest",behavior:F.RM?"auto":"smooth"});
}
function peek(n){
  const s=STEPS[n];wrap.classList.add("peek");bg.classList.add("peek");
  F.go(s.peek.view,s.peek.sub);
  peekBar=document.createElement("div");peekBar.className="tpeek";peekBar.setAttribute("role","region");peekBar.setAttribute("aria-label","Viewing the result");
  peekBar.innerHTML=`<span>${s.peek.note}</span><button class="btn sm" id="tBackBtn" type="button">Continue the tour</button>`;
  document.body.append(peekBar);F.$("#tBackBtn").focus({preventScroll:true});
  F.$("#tBackBtn").onclick=()=>{peekBar.remove();peekBar=null;wrap.classList.remove("peek");bg.classList.remove("peek");F.go(s.view);F.$("#tNext")?.focus({preventScroll:true})};
}
function leave(){F.tourHost=null;F.pace=1;F.closeDrawer();if(peekBar){peekBar.remove();peekBar=null}}
function go(n){leave();i=n;F.go(STEPS[n].view);explain(n)}
function next(n){if(n===STEPS.length-1){end();return}go(n+1)}
function end(keepView){
  const fin=STEPS[i].final;leave();mark();
  if(bg){bg.remove();bg=null}if(wrap){wrap.remove();wrap=null}card=null;
  document.removeEventListener("keydown",keyH);
  if(!keepView&&fin)F.go("email");
  const m=F.$("#main");m&&m.focus({preventScroll:true});
}
F.tour={
  start(){
    if(bg)return;markStarted();F.$(".tour-offer")?.remove();
    if(F.$("#intro")&&F.intro)F.intro.end(true);
    F.closeDrawer();i=0;F.go(STEPS[0].view);
    bg=document.createElement("div");bg.className="tour-bg";bg.onclick=()=>{if(!peekBar)end(true)};
    wrap=document.createElement("div");wrap.className="tour-wrap";
    wrap.innerHTML=`<div class="tcard" role="dialog" aria-modal="true" aria-labelledby="tTitle"><div class="tart" id="tArt"></div><button class="tx" id="tClose" type="button" aria-label="Close the tour"><svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button><div class="tbody"></div><div class="tfoot"><div class="tdots"></div><div class="tbtns"></div></div></div>`;
    document.body.append(bg,wrap);card=F.$(".tcard",wrap);
    F.$("#tClose").onclick=()=>end(true);
    keyH=e=>{
      if(e.key==="Escape"){if(peekBar)F.$("#tBackBtn").click();else end(true)}
      else if(e.key==="Tab"&&!peekBar){const f=F.$$("button,a[href]",card).filter(x=>x.offsetParent!==null);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
    };
    document.addEventListener("keydown",keyH);explain(0);
  },
  offer(){
    if(q.get("tour")==="0"||F.$(".tour-offer")||bg)return;
    try{if(sessionStorage.getItem(KEY)==="1")return}catch(e){}
    const o=document.createElement("div");o.className="tour-offer";o.setAttribute("role","region");o.setAttribute("aria-label","Take the tour");
    o.innerHTML=`<div class="eyebrow">New here?</div><h4>Take the guided tour</h4><p>Each tool, one at a time: what it does, then a slowed-down demo with notes on what is happening.</p><div class="btns"><button class="btn sm pulse" id="oGo" type="button">Start the tour</button><button class="btn ghost sm" id="oNo" type="button">Not now</button></div>`;
    document.body.append(o);F.$("#oGo").onclick=()=>F.tour.start();F.$("#oNo").onclick=()=>{mark();o.remove()};
  },
  init(){
    const tb=F.$("#tourBtn");if(tb){if(q.get("tour")!=="0"&&!started())tb.classList.add("glow");tb.addEventListener("click",()=>F.tour.start())}
    F.$("#startTour")?.addEventListener("click",()=>{const d=F.$("#dlg");d.classList.remove("on");d.close();F.tour.start()});
  }
};
})();
