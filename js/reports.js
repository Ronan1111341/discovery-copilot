/* Reports: the weekly report an agent sends a vendor (sale) or landlord (rental), built by a scripted demo. */
(()=>{
const {$,$$,esc,money}=F;
let kind="vendor",sub="p1",fresh=false;
const FEED={
 p1:["“Loved the light and the views. The kitchen is a big plus.”","“Price feels a little firm for the car space situation.”","“Would come back for a second look on the weekend.”"],
 p3:["“Beautiful pool, but we need to see the school catchment first.”","“Great street. The backyard is exactly what we wanted.”","“Would like to see a building report before offering.”"],
 p5:["“A rare Ascot position. Presentation is exceptional.”","“We would like a private inspection with our architect.”","“Strong interest, but waiting on a sale of their own home.”"],
};
const LL={
 r1:{head:"6/18 Merthyr Road, New Farm",kpis:[["$780","rent per week"],["12 of 12","payments on time"],["0 days","vacant this year"],["$0","repairs this month"]],notes:["Routine inspection last month: property very well kept.","Tenant has asked to renew for twelve months.","Market rent for similar apartments is trending to $820 per week."],rec:"Offer a twelve-month renewal at $805 per week. It keeps an excellent tenant and moves the rent towards market."},
 r2:{head:"12/45 Oxlade Drive, New Farm",kpis:[["$950","rent per week"],["11 of 12","payments on time"],["0 days","vacant this year"],["$165","repairs this month"]],notes:["Hot water failure reported this morning; a plumber is booked for 11:00 am.","Routine inspection due in three weeks.","Lease runs to March."],rec:"Approve the hot water repair under the standing $500 limit. No other action is needed this month."}
};
function seriesFor(id){return F.series(W.prop(id)?W.prop(id).seed:(id.charCodeAt(1)*9))}
function sheet(){
  if(kind==="vendor"){
    const p=W.prop(sub),s=seriesFor(sub),v=F.sum(s.domain)+F.sum(s.rea),enq=Math.round(v/38),insp=Math.round(enq/2.6),off=p.id==="p1"?1:p.id==="p5"?0:0;
    const feed=FEED[sub]||FEED.p1;
    return `<div class="sheetdoc${fresh?" fresh":""}"><span class="draftmark">Draft · this week</span><div class="sh"><div><div class="eyebrow">Weekly vendor report</div><h3 style="margin-top:8px">${esc(p.addr)}</h3><p>${esc(p.sub)} · ${esc(p.price)}</p></div><div style="text-align:right"><p>Prepared by ${esc(W.agent(p.agent).name)}</p><p>${esc(W.agency)}</p></div></div>
    <div class="art">${propertyArt(p.seed,p.art)}</div>
    <div class="kpis"><div class="${fresh?"changed":""}"><b class="num">${v.toLocaleString("en-AU")}</b><span>portal views, 14 days (sample)</span></div><div class="${fresh?"changed":""}"><b class="num">${enq}</b><span>enquiries</span></div><div class="${fresh?"changed":""}"><b class="num">${insp}</b><span>inspections</span></div><div class="${fresh?"changed":""}"><b class="num">${off}</b><span>offers</span></div></div>
    <h4>Daily views</h4>${F.chart(s,{h:190,light:true})}
    <h4>What buyers are saying</h4>${feed.map(q=>`<q>${esc(q)}</q>`).join("")}
    <h4>Our recommendation</h4><p>${fresh?"Interest is strong and rising since the price guide moved. Hold the current guide through the weekend, lead with twilight photography, and invite everyone who saved the listing to Saturday’s open home. We will review again on Monday.":"Interest is steady. We recommend holding the guide this week and reviewing after the weekend’s open home."}</p></div>`;
  }
  const r=LL[sub];
  return `<div class="sheetdoc${fresh?" fresh":""}"><span class="draftmark">Draft · this month</span><div class="sh"><div><div class="eyebrow">Monthly landlord report</div><h3 style="margin-top:8px">${esc(r.head)}</h3></div><div style="text-align:right"><p>Prepared by Luca Ferretti</p><p>${esc(W.agency)}</p></div></div>
   <div class="kpis">${r.kpis.map(k=>`<div class="${fresh?"changed":""}"><b class="num">${esc(k[0])}</b><span>${esc(k[1])}</span></div>`).join("")}</div>
   <h4>This month</h4><ul style="margin:0;padding-left:18px">${r.notes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul><h4>Our recommendation</h4><p>${esc(r.rec)}</p></div>`;
}
function draw(){
  $$("#rpTabs button").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.k===kind)));
  const opts=kind==="vendor"?[["p1","14 Wickham Terrace","Offers over $1,050,000"],["p3","31 Cairns Street","Guide $1,650,000"],["p5","52 Hargreaves Avenue","$6,200,000"]]:[["r1","6/18 Merthyr Road","Harold Davies · $780/wk"],["r2","12/45 Oxlade Drive","Sophie Lang · $950/wk"]];
  if(!opts.some(o=>o[0]===sub))sub=opts[0][0];
  $("#rpList").innerHTML=opts.map(o=>`<button type="button" aria-pressed="${o[0]===sub}" data-id="${o[0]}"><b>${esc(o[1])}</b><span>${esc(o[2])}</span></button>`).join("")+`<div style="margin-top:10px"><button class="btn pulse" id="rpBuild" type="button" style="width:100%">${F.SPARK}Build this week’s report</button></div>`;
  $$("#rpList button[data-id]").forEach(b=>b.onclick=()=>{sub=b.dataset.id;fresh=false;F.closeDrawer();draw()});
  $("#rpBuild").onclick=build;
  $("#rpSheet").innerHTML=sheet();
}
function build(){
  const vendor=kind==="vendor";
  F.runDemo({title:vendor?"Vendor report":"Landlord report",
   onDone:()=>{fresh=true;draw()},
   note:"<b>Done.</b> Scripted demo: nothing was sent to a vendor or landlord. The report is now marked as this week’s draft, ready for you to review.",
   stages:[
   {title:"Gathering the numbers",sub:vendor?"Portal views, enquiries, inspections, offers (sample)":"Rent ledger, inspections, repairs",html:(vendor?[["Portal views",2644],["Enquiries",70],["Inspections",27],["Offers",1]]:[["Payments checked",12],["Inspections",1],["Repairs",1],["Days vacant",0]]).map(r=>`<div class="scanrow"><span>${r[0]}</span><b class="num" data-to="${r[1]}">0</b></div>`).join(""),run:async(el,c)=>{await Promise.all($$("b",el).map(b=>c.count(b,+b.dataset.to,1200)))}},
   {title:vendor?"Summarising buyer feedback":"Summarising the month",sub:"Plain words, no jargon",html:(vendor?["Buyers love the light and the kitchen.","The price guide feels firm to some.","Two buyers want a second look this weekend."]:["The property is very well kept.","The tenant wants to renew.","Market rent is trending upward."]).map(t=>`<div class="sig"><q>${esc(t)}</q></div>`).join(""),run:async(el,c)=>{for(const s of $$(".sig",el)){if(!c.ok())return;s.classList.add("on");await c.sleep(380)}}},
   {title:"Writing the recommendation",sub:"Clear advice for the owner",html:`<div class="draft"><pre id="rtx"></pre></div>`,run:async(el,c)=>{await c.type($("#rtx",el),vendor?"Interest is strong and rising since the price guide moved. Hold the guide through the weekend, lead with twilight photography, and invite everyone who saved the listing to Saturday’s open home.":"Offer a twelve-month renewal at $805 per week to keep an excellent tenant and move the rent towards market.",8)}},
   {title:"Assembling the report",sub:"Ready to review and send",html:`<div class="acts" id="rpa"><button class="btn sm" type="button" data-t="Demo only: nothing was sent.">Send to ${vendor?"vendor":"landlord"}</button><button class="btn ghost sm" type="button" data-t="Demo only: no PDF was created.">Download PDF</button></div>`,run:async(el,c)=>{$$("#rpa button",el).forEach(b=>b.onclick=()=>F.toast(b.dataset.t));await c.sleep(400);$("#rpa",el).classList.add("on")}}
  ]});
}
F.register({id:"reports",label:"Reports",icon:"report",group:"Workspace",
 mount(el){el.innerHTML=`<div class="pad"><div class="pagehead"><div><div class="eyebrow">Reports</div><h2>Owners, kept in the loop</h2><p>Vendors and landlords want to know how their property is performing. The assistant writes the report; you review and send.</p></div></div>
  <div class="tabbar" role="tablist" id="rpTabs"><button role="tab" type="button" data-k="vendor" aria-selected="true">Vendor report · sale</button><button role="tab" type="button" data-k="landlord" aria-selected="false">Landlord report · rental</button></div>
  <div class="split2"><div class="rl" id="rpList"></div><div id="rpSheet"></div></div></div>`;
  $$("#rpTabs button",el).forEach(b=>b.onclick=()=>{kind=b.dataset.k;sub=kind==="vendor"?"p1":"r1";fresh=false;F.closeDrawer();draw()})},
 show:draw});
})();
