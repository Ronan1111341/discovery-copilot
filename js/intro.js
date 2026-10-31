/* Animated intro: autoplays once per visit, skippable (button or Escape). The dashboard is already loaded underneath. */
(()=>{
const KEY="foyer-intro-seen";let tk=0,el=null,keyH=null;
const seen=()=>{try{return sessionStorage.getItem(KEY)==="1"}catch(e){return false}};
const mark=()=>{try{sessionStorage.setItem(KEY,"1")}catch(e){}};
function build(){
  const d=document.createElement("div");d.id="intro";d.className="intro";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.setAttribute("aria-label","Introduction to Foyer");
  d.innerHTML=`<div class="bg">${propertyArt(11,"tower")}</div><div class="vig"></div>
  <button class="skip2" type="button" id="skip2">Skip intro <span aria-hidden="true">›</span></button>
  <div class="istage" id="istage">
   <svg class="mark" id="imark" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M3 24V12L14 3l11 9v12" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M10 24v-8h8v8" stroke="currentColor" stroke-width="1.4"/><path d="M14 3v6" stroke="currentColor" stroke-width="1.4"/></svg>
   <h1 class="wm" id="iwm">Foyer</h1><p class="tag" id="itag"></p>
   <div class="win" id="iwin"><div><div class="panel2"><div class="ph"><span><b>Inbox</b> · Jess Nguyen</span><span>Re: 14 Wickham Terrace, still available?</span></div><div class="rows" id="irows"></div></div></div></div>
   <p class="final" id="ifinal">Now try it yourself.</p></div>`;
  return d;
}
F.intro={
  init(){
    const q=new URLSearchParams(location.search);
    F.$("#replayIntro")?.addEventListener("click",()=>{const dlg=F.$("#dlg");dlg.classList.remove("on");dlg.close();F.intro.play()});
    if(F.RM||q.get("intro")==="0"||seen())return;
    F.intro.play();
  },
  end(fast){
    if(!el)return;tk++;mark();const e=el;el=null;
    if(keyH){document.removeEventListener("keydown",keyH);keyH=null}
    e.classList.add("out");setTimeout(()=>{e.remove();const m=F.$("#main");m&&m.focus({preventScroll:true})},fast?350:800);
  },
  async play(){
    if(F.RM||el)return;
    const my=++tk,ok=()=>my===tk;el=build();document.body.append(el);
    keyH=e=>{if(e.key==="Escape")F.intro.end(true)};document.addEventListener("keydown",keyH);
    F.$("#skip2").onclick=()=>F.intro.end(true);F.$("#skip2").focus({preventScroll:true});
    requestAnimationFrame(()=>el&&el.classList.add("show"));
    const {$}=F,S=ms=>F.sleep(ms);
    await Promise.race([document.fonts?document.fonts.ready:Promise.resolve(),new Promise(r=>setTimeout(r,1200))]);
    if(!ok())return;
    $("#imark").classList.add("on");$("#iwm").classList.add("on");await S(1100);if(!ok())return;
    await F.type($("#itag"),"The AI workspace for luxury real estate.",34,ok);if(!ok())return;
    await S(500);$("#iwin").classList.add("open");await S(900);if(!ok())return;
    const steps=[["New email from Jess Nguyen",`<span class="hl">“…pre-approved up to $1.1m… three bedrooms… inspect Saturday at 10am”</span>`],["Searching past emails",""],["Updating the client file",`Budget <span class="hl">$850k → $1.1m</span> · Bedrooms <span class="hl">2 → 3+</span> · Lead score <span class="hl">61 → 88</span>`],["Drafting your reply",""],["Ready for your approval",`Nothing is sent until you press approve.`]];
    $("#irows").innerHTML=steps.map(s=>`<div class="irow"><span class="idot" aria-hidden="true"></span><div><b>${s[0]}</b><span class="dt"></span></div></div>`).join("");
    const rows=[...document.querySelectorAll("#irows .irow")],dt=i=>rows[i].querySelector(".dt");
    const begin=i=>{rows[i].classList.add("on","act")},done=i=>{rows[i].classList.remove("act");rows[i].classList.add("ok");rows[i].querySelector(".idot").textContent="✓"};
    begin(0);dt(0).innerHTML=steps[0][1];await S(1300);if(!ok())return;done(0);
    begin(1);await F.count(dt(1),2418,1100,ok,n=>Math.round(n).toLocaleString("en-AU")+" emails scanned");if(!ok())return;dt(1).innerHTML=`Match found: Jess Nguyen, 12 Aug <span class="hl">(92%)</span>`;await S(700);if(!ok())return;done(1);
    begin(2);dt(2).innerHTML=steps[2][1];await S(1500);if(!ok())return;done(2);
    begin(3);await F.type(dt(3),"Hi Jess, lovely to hear from you both. Saturday at 10am works…",22,ok);if(!ok())return;await S(300);done(3);
    begin(4);dt(4).textContent=steps[4][1];await S(1000);if(!ok())return;done(4);
    await S(500);$("#istage").classList.add("dim");$("#ifinal").classList.add("on");await S(1700);if(!ok())return;
    F.intro.end(false);
  }
};
})();
