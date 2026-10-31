/* Guided tour: a spotlight walks through each tool and points at the button that starts its demo. */
(()=>{
const KEY="foyer-tour-offered";
const STEPS=[
 {view:"email",target:"#nav",place:"right",title:"Nine tools, one workspace",body:"Everything an agent does lives in this sidebar: email, leads, client files, advertising, reports, rentals, maintenance, bookings and a page for each agent. Every tool has its own scripted AI moment."},
 {view:"email",target:"#run",title:"One press does the lot",body:"An enquiry arrives. The assistant reads it, searches past emails, finds the earlier conversation, updates the client file and drafts a reply for you to approve.",try:()=>F.$("#run").click(),tryLabel:"Run it now"},
 {view:"leads",target:"#scanBtn",title:"Leads, found for you",body:"The assistant scans your inbox, portal enquiries and past clients for buying and selling signals, then ranks who to call first.",try:()=>F.$("#scanBtn").click(),tryLabel:"Scan now"},
 {view:"clients",target:"#prepBtn",title:"Walk into every meeting prepared",body:"One press assembles the history, what has changed and the talking points, plus the listings worth bringing.",try:()=>F.$("#prepBtn").click(),tryLabel:"Prepare one now"},
 {view:"ads",target:"#adTabs",title:"Advertising, with the numbers",body:"The Performance tab shows daily views, enquiries and saves in the style of Domain and realestate.com.au, then recommends what to change. The figures are sample data.",try:()=>{F.$('#adTabs button[data-k="perf"]').click();setTimeout(()=>F.$("#analyse")&&F.$("#analyse").click(),500)},tryLabel:"Analyse now"},
 {view:"reports",target:"#rpBuild",title:"Reports owners actually read",body:"Vendors and landlords get a clear weekly or monthly report with the numbers, buyer feedback and a recommendation. You review it, then send.",try:()=>F.$("#rpBuild").click(),tryLabel:"Build one now"},
 {view:"maintenance",target:"#triage",title:"Repairs, triaged",body:"A tenant’s message becomes an urgency rating, a matched tradie and drafted messages. Watch what appears on Luca’s agent page afterwards.",try:()=>F.$("#triage").click(),tryLabel:"Triage it now"},
 {view:"bookings",target:"#bookBtn",title:"Open homes and inspections",body:"Every agent’s week in one view. The assistant picks a clash-free time and writes the invite.",try:()=>F.$("#bookBtn").click(),tryLabel:"Book one now"},
 {view:"agents",target:"#switch",title:"A page for every agent",body:"Each agent has their own tasks, open homes, clients and sales. Plan my day ranks the day by value.",try:()=>F.$("#planBtn").click(),tryLabel:"Plan a day now"},
 {view:"email",target:"#theme",place:"below",title:"Dark or light, your call",body:"That is the tour. Everything here is scripted on invented sample data, so nothing is read, saved or sent. Now try the email demo yourself."}
];
let i=0,bg=null,spot=null,card=null,keyH=null,rz=null,token=0;
const q=new URLSearchParams(location.search);
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function visible(sel,tries=14){for(let n=0;n<tries;n++){const e=F.$(sel);if(e){const r=e.getBoundingClientRect();if(r.width>0&&r.height>0&&getComputedStyle(e).visibility!=="hidden")return e}await wait(60)}return null}
function place(r,place){
  const cw=card.offsetWidth,ch=card.offsetHeight,vw=innerWidth,vh=innerHeight,g=18,narrow=vw<700;
  let x,y;
  if(!r){x=(vw-cw)/2;y=(vh-ch)/2}
  else if(!narrow&&(place==="right"||place==="auto"||!place)&&r.right+g+cw<vw-12){x=r.right+g;y=r.top}
  else if(r.bottom+g+ch<vh-12){x=r.left;y=r.bottom+g}
  else if(r.top-g-ch>12){x=r.left;y=r.top-g-ch}
  else if(!narrow&&r.left-g-cw>12){x=r.left-g-cw;y=r.top}
  else{x=(vw-cw)/2;y=Math.max(12,vh-ch-16)}
  card.style.left=Math.max(12,Math.min(x,vw-cw-12))+"px";card.style.top=Math.max(12,Math.min(y,vh-ch-12))+"px";
}
async function show(n){
  const my=++token;i=n;const s=STEPS[n];
  F.go(s.view);await wait(F.RM?60:420);if(my!==token)return;
  const el=await visible(s.target);if(my!==token)return;
  if(el){el.scrollIntoView({block:"center",inline:"nearest",behavior:"auto"});await wait(60)}
  const r=el?el.getBoundingClientRect():null,pad=8;
  if(r){Object.assign(spot.style,{opacity:1,top:r.top-pad+"px",left:r.left-pad+"px",width:r.width+pad*2+"px",height:r.height+pad*2+"px"})}else spot.style.opacity=0;
  card.innerHTML=`<div class="eyebrow num">Step ${n+1} of ${STEPS.length}</div><h3>${F.esc(s.title)}</h3><p>${F.esc(s.body)}</p>
   ${s.try?`<button class="btn ghost sm try" id="tTry" type="button">${F.esc(s.tryLabel||"Try it now")}</button>`:""}
   <div class="dots" aria-hidden="true">${STEPS.map((_,k)=>`<i class="${k<=n?"on":""}"></i>`).join("")}</div>
   <div class="btns"><button class="lnk" id="tSkip" type="button">${n===STEPS.length-1?"Close":"Skip tour"}</button><span class="sp"></span>${n?'<button class="btn ghost sm" id="tBack" type="button">Back</button>':""}<button class="btn sm" id="tNext" type="button">${n===STEPS.length-1?"Finish":"Next"}</button></div>`;
  card.style.opacity=1;place(r,s.place);
  F.$("#tNext").onclick=()=>n===STEPS.length-1?end():show(n+1);
  const b=F.$("#tBack");if(b)b.onclick=()=>show(n-1);
  F.$("#tSkip").onclick=end;
  const t=F.$("#tTry");if(t)t.onclick=()=>{end();setTimeout(s.try,350)};
  F.$("#tNext").focus({preventScroll:true});
  F.$("#live").textContent=`Tour step ${n+1} of ${STEPS.length}: ${s.title}`;
}
function end(){
  token++;mark();if(bg){bg.remove();bg=null}if(card){card.remove();card=null}
  document.removeEventListener("keydown",keyH);removeEventListener("resize",rz);
  const m=F.$("#main");m&&m.focus({preventScroll:true});
}
const mark=()=>{try{sessionStorage.setItem(KEY,"1")}catch(e){}};
F.tour={
  start(){
    if(bg)return;F.$(".tour-offer")?.remove();
    const intro=F.$("#intro");if(intro&&F.intro)F.intro.end(true);
    F.closeDrawer();
    bg=document.createElement("div");bg.className="tour-bg";spot=document.createElement("div");spot.className="tour-spot";spot.style.opacity=0;
    card=document.createElement("div");card.className="tour-card";card.setAttribute("role","dialog");card.setAttribute("aria-label","Product tour");card.style.opacity=0;
    bg.append(spot);document.body.append(bg,card);
    keyH=e=>{if(e.key==="Escape")end();else if(e.key==="ArrowRight"&&i<STEPS.length-1)show(i+1);else if(e.key==="ArrowLeft"&&i>0)show(i-1)};
    document.addEventListener("keydown",keyH);rz=()=>show(i);addEventListener("resize",rz);
    show(0);
  },
  offer(){
    if(q.get("tour")==="0"||F.$(".tour-offer")||bg)return;
    try{if(sessionStorage.getItem(KEY)==="1")return}catch(e){}
    const o=document.createElement("div");o.className="tour-offer";o.setAttribute("role","region");o.setAttribute("aria-label","Take the tour");
    o.innerHTML=`<div class="eyebrow">New here?</div><h4>Take the 60-second tour</h4><p>A quick walk through each tool, with a shortcut to every demo.</p><div class="btns"><button class="btn sm" id="oGo" type="button">Start the tour</button><button class="btn ghost sm" id="oNo" type="button">Not now</button></div>`;
    document.body.append(o);
    F.$("#oGo").onclick=()=>F.tour.start();F.$("#oNo").onclick=()=>{mark();o.remove()};
  },
  init(){
    F.$("#tourBtn")?.addEventListener("click",()=>F.tour.start());
    F.$("#startTour")?.addEventListener("click",()=>{const d=F.$("#dlg");d.classList.remove("on");d.close();F.tour.start()});
  }
};
})();
