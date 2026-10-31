/* AI Email: an inbox, plus the scripted "read, search, match, update, draft" demo. */
(()=>{
const {$,$$,esc,initials}=F;
const EMAILS=[
{id:1,from:"Jess Nguyen",subject:"Re: 14 Wickham Terrace, still available?",time:"9:42 am",tag:["Buyer lead","hot"],preview:"Thanks for sending through the Wickham Terrace listing…",
 summary:"Existing buyer enquiry. Raised budget, wants three bedrooms, asks to inspect this Saturday at 10am.",
 body:`Hi Sam,

Thanks for sending through the <mark data-e="0">Wickham Terrace</mark> listing. We’re very keen. Lena at the brokers has now pre-approved us up to <mark data-e="1">$1.1m</mark>, so we have a bit more room than when we first spoke. We’d like <mark data-e="2">three bedrooms</mark> now (the kids are growing!) and we still need a <mark data-e="3">car space</mark>.

Is there any chance we could inspect <mark data-e="4">this Saturday at 10am</mark>? Tom can’t do the afternoon.

Thanks,
Jess`},
{id:2,from:"Priya Raman",subject:"Appraisal for 22 Dunmore Terrace",time:"8:15 am",tag:["Seller lead","acc"],preview:"We’re thinking of selling in the spring and would like…",
 summary:"Owner wants an appraisal before a spring sale. High-intent seller lead.",
 body:`Hi Sam,

We bought 22 Dunmore Terrace in 2017 and we’re thinking of selling in the spring. Could someone come and give us an appraisal in the next couple of weeks? We’ve also renovated the kitchen since you last saw it.

Kind regards,
Priya`},
{id:3,from:"Harold Davies",subject:"Lease renewal, 6/18 Merthyr Road",time:"Yesterday",tag:["Leasing",""],preview:"We’d like to renew for another twelve months…",
 summary:"Tenant wants a 12-month renewal and a chat about the rent review. Route to property management.",
 body:`Hello,

We’d like to renew for another twelve months. Could we talk about the rent review before the new lease is sent out?

Thanks,
Harold`},
{id:4,from:"Lena Brooks",subject:"Pre-approval confirmed: Nguyen",time:"Yesterday",tag:["Finance","good"],preview:"Jess and Tom are now pre-approved up to $1.1m…",
 summary:"Broker confirms pre-approval up to $1.1m for the Nguyens. Supports the buyer file.",
 body:`Hi Sam,

Just confirming Jess and Tom Nguyen are now pre-approved up to $1.1m, valid for 90 days.

Lena
Brokers Co.`},
{id:5,from:"Pixel & Frame",subject:"Invoice 0412: Wickham Terrace shoot",time:"Mon",tag:["Admin",""],preview:"Invoice attached for the photography and floor plan…",
 summary:"Supplier invoice. Filed under marketing costs, no action needed from you.",
 body:`Hi Sam,

Invoice 0412 is attached for the photography and floor plan at Wickham Terrace.

Thanks,
Pixel & Frame`}
];
let sel=1;
const DRAFT=`Hi Jess,

Lovely to hear from you both, and congratulations on the pre-approval. Wickham Terrace is still available, and with three bedrooms and a secure car space it fits your updated brief.

Saturday at 10am works. I’ll pencil you in and send the address details, plus two similar three-bedroom apartments in case you’d like to see more while you’re in the area.

Kind regards,
Sam
Harbourline Property`;
F.nguyenDiff={rows:["Budget","Bedrooms","Status","Finance","Next step","Lead score"]};

function list(){
  $("#list").innerHTML=`<header><div class="eyebrow">Inbox</div><h2 style="margin-top:6px">Good morning, Sam</h2><p>${EMAILS.length} messages, sorted by AI</p></header>`+EMAILS.map(e=>{
    const chips=(e.tag[0]?`<span class="chip ${e.tag[1]}">${esc(e.tag[0])}</span>`:"")+(e.id===1&&F.state.ran?'<span class="chip good">Draft ready</span>':"");
    return `<button class="row" aria-current="${e.id===sel?"true":"false"}" data-id="${e.id}" type="button"><span class="av" aria-hidden="true">${initials(e.from)}</span><span><span class="t"><b>${esc(e.from)}</b><span>${esc(e.time)}</span></span><span class="s">${esc(e.subject)}</span><span class="p">${esc(e.preview)}</span><span class="c">${chips}</span></span></button>`}).join("");
  $$("#list .row").forEach(b=>b.onclick=()=>{sel=+b.dataset.id;F.closeDrawer();list();reader();$("#inbox").classList.add("reading")});
}
function reader(){
  const e=EMAILS.find(x=>x.id===sel),demo=e.id===1;
  $("#reader").innerHTML=`<div class="msg"><button class="btn ghost sm back" id="back" type="button">← Inbox</button>
  <div class="eyebrow">${esc(e.tag[0]||"Message")}</div><h3>${esc(e.subject)}</h3>
  <div class="meta"><span class="av" aria-hidden="true">${initials(e.from)}</span><div><b>${esc(e.from)}</b><span>${esc(e.time)}</span></div></div>
  <div class="body" id="body">${e.body}</div>
  <div class="triage"><p><b>AI triage.</b> ${esc(e.summary)}${demo?"":' <span style="display:block;margin-top:4px">Open the Nguyen enquiry to watch the full workflow.</span>'}</p>${demo?`<button class="btn pulse" id="run" type="button">${F.SPARK}${F.state.ran?"Run again":"Run AI assistant"}</button>`:""}</div></div>`;
  $("#back").onclick=()=>$("#inbox").classList.remove("reading");
  if(demo)$("#run").onclick=run;
}
function run(){
  const b=W.nguyen;
  F.runDemo({title:"Assistant",
   onClose:()=>$$("#body mark").forEach(m=>m.classList.remove("on")),
   onDone:()=>{F.state.ran=true;F.state.flash=true;list();reader();$("#run").classList.remove("pulse")},
   note:"<b>Done.</b> This was a scripted demo: nothing was searched, saved or sent. In a real workflow you would review the draft before anything leaves your outbox.",
   stages:[
   {title:"Reading the email",explain:"The assistant reads the message and pulls out the facts that matter: the property, the budget, the bedrooms, the parking and the request. In a real build this is structured extraction, with every fact tied back to the sentence it came from.",sub:"Pulling out names, property, budget and requests",
    html:`<div class="ents">${[["Property","14 Wickham Terrace"],["Budget","$1.1m"],["Bedrooms","3"],["Parking","Car space"],["Request","Inspect Sat 10am"]].map(x=>`<div class="ent"><b>${x[0]}</b>${x[1]}</div>`).join("")}</div>`,
    run:async(el,c)=>{const ents=$$(".ent",el),marks=$$("#body mark");for(let i=0;i<ents.length;i++){if(!c.ok())return;ents[i].classList.add("on");if(marks[i])marks[i].classList.add("on");await c.sleep(260)}await c.sleep(200)}},
   {title:"Searching past emails",explain:"It looks through earlier conversations for the same person and the same property. A real system searches the mailbox and ranks matches by how closely they fit.",sub:"Looking for earlier conversations with this client",
    html:`<div class="prog"><i id="pbar"></i></div><div style="color:var(--ink-2);font-size:13px"><span class="num" id="scn">0</span> of 2,418 emails scanned</div>`,
    run:async(el,c)=>{const bar=$("#pbar",el),n=$("#scn",el),N=2418,t0=performance.now(),d=c.RM?0:1300;await new Promise(res=>{const f=now=>{if(!c.ok())return res();const p=d?Math.min(1,(now-t0)/d):1;bar.style.width=p*100+"%";n.textContent=Math.round(p*N).toLocaleString("en-AU");p<1?requestAnimationFrame(f):res()};requestAnimationFrame(f)})}},
   {title:"Match found",explain:"It found the August enquiry and the broker’s pre-approval. Each match carries a confidence score, so the agent can see how sure the assistant is and why.",sub:"Linking this email to an existing client",
    html:`<div class="match"><div class="mh"><b>Jess Nguyen, 12 Aug</b><span class="chip good num">92% match</span></div><p>“Looking for a two-bedroom apartment, around $850k, one car space, near the river.”</p><div class="conf"><i data-w="92"></i></div></div><div class="match"><div class="mh"><b>Lena Brooks, yesterday</b><span class="chip good num">88% match</span></div><p>“Jess and Tom are now pre-approved up to $1.1m.”</p><div class="conf"><i data-w="88"></i></div></div>`,
    run:async(el,c)=>{for(const m of $$(".match",el)){if(!c.ok())return;m.classList.add("on");await c.sleep(100);const i=$(".conf i",m);i.style.width=i.dataset.w+"%";await c.sleep(480)}}},
   {title:"Updating the client file",explain:"It proposes only the changes the email supports: budget, bedrooms, status and next step. Each change shows the old and new value, and nothing is saved without approval.",sub:"Changing only what the email says",
    html:`<div class="diff">${F.nguyenDiff.rows.map(k=>`<span class="k">${k}</span><span class="v">${W.nguyen.before[k]===W.nguyen.after[k]?esc(W.nguyen.after[k]):`<s>${esc(W.nguyen.before[k])}</s><span class="new">${esc(W.nguyen.after[k])}</span>`}</span>`).join("")}</div>`,
    run:async(el,c)=>{for(const v of $$(".v",el)){if(!c.ok())return;v.classList.add("on");await c.sleep(300)}await c.sleep(200)}},
   {title:"Drafting your reply",explain:"It writes a reply in the agent’s voice using what it now knows, such as the new budget and the Saturday request. The agent reviews, edits and sends it. The assistant never sends on its own.",sub:"For you to review and send",
    html:`<div class="draft"><div class="hd"><b>To:</b> Jess Nguyen<br><b>Subject:</b> Re: 14 Wickham Terrace, still available?</div><pre id="dtxt"></pre></div><div class="acts" id="acts"><button class="btn sm" type="button" data-t="Demo only: nothing was sent.">Approve and send</button><button class="btn ghost sm" type="button" data-t="Demo only: editing is not part of the show.">Edit</button><button class="btn ghost sm" type="button" data-t="Demo only: nothing was added to a calendar.">Add to calendar</button></div>`,
    run:async(el,c)=>{$$("#acts button",el).forEach(b=>b.onclick=()=>F.toast(b.dataset.t));await c.type($("#dtxt",el),DRAFT,7);if(!c.ok())return;$("#acts",el).classList.add("on")}}
  ]});
}
W.nguyen={
 before:{Budget:"$850,000",Bedrooms:"2",Parking:"1 car space",Suburbs:"Spring Hill, New Farm",Status:"Browsing",Finance:"Pre-approval pending","Next step":"Send new listings","Lead score":"61"},
 after:{Budget:"$1,100,000",Bedrooms:"3+",Parking:"1 car space",Suburbs:"Spring Hill, New Farm",Status:"Active buyer",Finance:"Pre-approved to $1.1m (Lena Brooks)","Next step":"Inspection Sat 10am, 14 Wickham Terrace","Lead score":"88"}
};
F.reset.email=()=>{F.state.ran=false;F.state.flash=false;list();reader()};
F.register({id:"email",label:"AI Email",icon:"email",group:"Workspace",badge:"5",
 mount(el){el.innerHTML=`<div class="inbox" id="inbox"><div class="list" id="list"></div><div class="reader" id="reader"></div></div>`;list();reader()},
 show(){list();reader()}});
})();
