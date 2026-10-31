/* Core: helpers, module registry, navigation, theme, and the demo engine that every tool's scripted AI moment runs on. */
(()=>{
const F=window.F={modules:[],token:0,state:{ran:false,agent:"sam",flash:false}};
F.$=(s,r=document)=>r.querySelector(s);
F.$$=(s,r=document)=>[...r.querySelectorAll(s)];
F.RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
F.sleep=ms=>F.RM?Promise.resolve():new Promise(r=>setTimeout(r,ms));
F.esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
F.initials=n=>n.replace(/^(The|Dr|Mr & Mrs)\s+/,"").split(/[ &]+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase();
F.money=n=>n>=1e6?"$"+(n/1e6).toFixed(2).replace(/0+$/,"").replace(/\.$/,"")+"m":n>0?"$"+Math.round(n/1e3)+"k":"–";
F.CHEV='<svg class="i chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
F.SPARK='<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>';
F.ICONS={
 email:'<path d="M3 13l2.5-8h13L21 13v6H3z"/><path d="M3 13h5l1.2 3h5.6l1.2-3h5"/>',
 leads:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
 clients:'<path d="M4 4h12l4 4v12H4z"/><path d="M8 12h8M8 16h5"/>',
 ads:'<path d="M3 11v3l12 5V6z"/><path d="M15 9c3 0 5 1 5 3s-2 3-5 3"/>',
 agents:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.3-5.2 6.5-5.2s5.7 1.700 6.500 5.200"/><circle cx="17" cy="9" r="2.6"/><path d="M16 14.400c3 0 5 1.400 5.600 4.600"/>',
 rentals:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
 maint:'<path d="M14.500 6.500a4 4 0 0 0-5 5L3 18l3 3 6.500-6.500a4 4 0 0 0 5-5l-2.500 2.500-2.500-.5-.5-2.500z"/>',
 book:'<rect x="3.500" y="5" width="17" height="15" rx="1.500"/><path d="M3.500 10h17M8 3v4M16 3v4"/>',
 report:'<path d="M5 20V4h10l4 4v12z"/><path d="M9 16v-3M12 16v-5M15 16v-2"/>'
};
let toastT;F.toast=m=>{const t=F.$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("on"),3200)};
F.type=async(el,txt,ms,ok)=>{if(F.RM){el.textContent=txt;return}el.classList.add("caret");for(let i=1;i<=txt.length;i++){if(!ok()){el.classList.remove("caret");return}el.textContent=txt.slice(0,i);await F.sleep(ms)}el.classList.remove("caret")};
F.count=(el,to,ms,ok,fmt=n=>Math.round(n).toLocaleString("en-AU"))=>new Promise(res=>{const t0=performance.now(),d=F.RM?0:ms;const f=now=>{if(!ok())return res();const p=d?Math.min(1,(now-t0)/d):1;el.textContent=fmt(p*to);p<1?requestAnimationFrame(f):res()};requestAnimationFrame(f)});
F.hasDrawerFocus=()=>F.$("#drawer").classList.contains("open");

/* ---- module registry + navigation ---- */
F.register=m=>F.modules.push(m);
F.go=(id,sub)=>{
  const m=F.modules.find(x=>x.id===id)||F.modules[0];
  F.closeDrawer();
  F.$$(".view").forEach(s=>s.classList.toggle("on",s.id==="v-"+m.id));
  F.$$(".nav").forEach(b=>b.dataset.view===m.id?b.setAttribute("aria-current","page"):b.removeAttribute("aria-current"));
  F.$("#crumb").innerHTML=F.esc(W.agency)+" / <b>"+F.esc(m.label)+"</b>";
  const h=m.id+(sub?"-"+sub:"");if(location.hash!=="#"+h)history.replaceState(null,"","#"+h);
  F.current=m;if(m.show)m.show(F.$("#v-"+m.id),sub);
};
F.boot=()=>{
  const side=F.$("#nav");let grp="";
  F.modules.forEach(m=>{
    if(m.group!==grp){grp=m.group;side.insertAdjacentHTML("beforeend",`<div class="grp eyebrow">${F.esc(grp)}</div>`)}
    side.insertAdjacentHTML("beforeend",`<button class="nav" data-view="${m.id}" type="button"><svg class="i" viewBox="0 0 24 24" aria-hidden="true">${F.ICONS[m.icon]}</svg>${F.esc(m.label)}${m.badge?`<span class="badge num">${m.badge}</span>`:""}</button>`);
    const v=document.createElement("section");v.className="view";v.id="v-"+m.id;v.setAttribute("aria-label",m.label);F.$("#views").append(v);m.mount(v);
  });
  side.insertAdjacentHTML("beforeend",`<div class="foot"><b>${F.esc(W.agency)}</b>Fictional agency · sample data</div>`);
  F.$$(".nav").forEach(b=>b.onclick=()=>F.go(b.dataset.view));
  const route=()=>{const [id,sub]=location.hash.slice(1).split("-");F.go(id,sub)};
  addEventListener("hashchange",route);route();
};

/* ---- theme + about ---- */
const root=document.documentElement;
try{root.dataset.theme=localStorage.getItem("foyer-theme")||"dark"}catch(e){root.dataset.theme="dark"}
F.initChrome=()=>{
  F.$("#theme").onclick=()=>{const t=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=t;try{localStorage.setItem("foyer-theme",t)}catch(e){}F.$('meta[name=theme-color]').content=t==="dark"?"#070b11":"#f3eee4"};
  const dlg=F.$("#dlg");
  F.$("#about").onclick=()=>{dlg.showModal();requestAnimationFrame(()=>dlg.classList.add("on"))};
  const close=()=>{dlg.classList.remove("on");setTimeout(()=>dlg.close(),F.RM?0:260)};
  F.$("#dlgX").onclick=close;dlg.addEventListener("cancel",e=>{e.preventDefault();close()});dlg.addEventListener("click",e=>{if(e.target===dlg)close()});
  F.$("#closeDrawer").onclick=()=>F.closeDrawer();
};

/* ---- demo engine ----
   F.runDemo({title, stages:[{title, sub, html, run:async(el,ctx)=>{}}], note, onDone})
   Opens the right-hand drawer and runs each stage in turn: stages open and close as an accordion.
   Everything is scripted: nothing is read, searched, saved or sent. */
F.openDrawer=()=>{F.$("#drawer").classList.add("open");F.$(".main").classList.add("dr")};
F.closeDrawer=()=>{F.token++;F.$("#drawer").classList.remove("open");F.$(".main").classList.remove("dr");if(F.onDrawerClose){const f=F.onDrawerClose;F.onDrawerClose=null;f()}};
const setOpen=(st,open)=>{st.classList.toggle("open",open);st.querySelector("button").setAttribute("aria-expanded",String(open))};
F.runDemo=async def=>{
  const tk=++F.token,ok=()=>tk===F.token,live=F.$("#live");
  F.$("#drTitle").textContent=def.title;
  F.$("#drStages").innerHTML=def.stages.map((s,i)=>`<div class="stage" data-s="pending" data-i="${i}"><button type="button" aria-expanded="false"><span class="dot" aria-hidden="true"></span><span class="tt">${F.esc(s.title)}<span class="st">${F.esc(s.sub||"")}</span></span>${F.CHEV}</button><div class="sb"><div><div class="in">${s.html||""}</div></div></div></div>`).join("")+`<div class="done-note" id="drNote">${def.note||"<b>Done.</b> This was a scripted demo: nothing was searched, saved or sent."}</div>`;
  F.$$("#drStages .stage>button").forEach(b=>b.onclick=()=>{const st=b.parentElement;if(st.dataset.s==="pending")return;setOpen(st,!st.classList.contains("open"))});
  F.onDrawerClose=def.onClose||null;
  F.openDrawer();
  const ctx={ok,sleep:F.sleep,type:(el,t,ms)=>F.type(el,t,ms,ok),count:(el,to,ms,fmt)=>F.count(el,to,ms,ok,fmt),RM:F.RM};
  const stages=F.$$("#drStages .stage");
  await F.sleep(550);
  for(let i=0;i<stages.length;i++){
    if(!ok())return;
    if(i>0)setOpen(stages[i-1],false);
    stages[i].dataset.s="active";setOpen(stages[i],true);live.textContent=def.stages[i].title;await F.sleep(380);
    if(!ok())return;
    if(def.stages[i].run)await def.stages[i].run(F.$(".in",stages[i]),ctx);
    if(!ok())return;
    stages[i].dataset.s="done";F.$(".dot",stages[i]).textContent="✓";
  }
  F.$("#drNote").classList.add("on");live.textContent="Done.";
  if(def.onDone)def.onDone();
  F.$("#drStages").scrollTo({top:1e5,behavior:F.RM?"auto":"smooth"});
};
})();
