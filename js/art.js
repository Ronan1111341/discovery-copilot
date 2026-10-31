/* Procedurally drawn twilight property artwork. No photos: a slot for real photos can replace these later. */
(()=>{
const rng=seed=>{let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}};
let uid=0;
window.propertyArt=(seed,kind)=>{
  const r=rng(seed*7919+kind.length),id="g"+(++uid),W=320,H=200;
  const horizon=kind==="tower"?150:146;
  let s=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a ${kind==="tower"?"apartment tower":kind==="house"?"modern house":"terrace home"} at dusk">
  <defs>
   <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070d1f"/><stop offset=".55" stop-color="#26285a"/><stop offset=".82" stop-color="#9a5b6b"/><stop offset="1" stop-color="#e2a06a"/></linearGradient>
   <linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a6a"/><stop offset="1" stop-color="#0a1226"/></linearGradient>
   <radialGradient id="${id}m" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff7df"/><stop offset="1" stop-color="#fff7df" stop-opacity="0"/></radialGradient>
   <linearGradient id="${id}p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f8fa0"/><stop offset="1" stop-color="#0d3550"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#${id}s)"/>`;
  for(let i=0;i<34;i++){s+=`<circle cx="${(r()*W).toFixed(1)}" cy="${(r()*88).toFixed(1)}" r="${(r()*.8+.25).toFixed(2)}" fill="#fff" opacity="${(r()*.6+.15).toFixed(2)}"/>`}
  const mx=40+r()*240;s+=`<circle cx="${mx.toFixed(0)}" cy="34" r="26" fill="url(#${id}m)" opacity=".55"/><circle cx="${mx.toFixed(0)}" cy="34" r="6.5" fill="#fff4d6"/>`;
  // distant skyline
  let x=-10;while(x<W){const w=14+r()*26,h=22+r()*48;s+=`<rect x="${x.toFixed(0)}" y="${(horizon-h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="#171a3a" opacity=".85"/>`;for(let k=0;k<Math.floor(h/9);k++)for(let j=0;j<Math.floor(w/7);j++)if(r()<.16)s+=`<rect x="${(x+2+j*7).toFixed(0)}" y="${(horizon-h+3+k*9).toFixed(0)}" width="2.4" height="3" fill="#ffd9a0" opacity=".75"/>`;x+=w+2}
  const lit=()=>r()<.62?"#ffd08a":"#1a2347";
  if(kind==="tower"){
    const tw=92+Math.round(r()*36),tx=Math.round((W-tw)/2+(r()-.5)*90),ty=10+Math.round(r()*26),cols=Math.max(4,Math.floor((tw-8)/17.2));
    s+=`<rect x="${tx}" y="${ty}" width="${tw}" height="${horizon-ty}" fill="#0c1230"/><rect x="${tx}" y="${ty}" width="3" height="${horizon-ty}" fill="#3a4478" opacity=".7"/><rect x="${tx+tw-3}" y="${ty}" width="3" height="${horizon-ty}" fill="#05081a" opacity=".6"/>`;
    for(let row=0;row<Math.floor((horizon-ty-12)/9.4);row++){const y=ty+8+row*9.4;s+=`<rect x="${tx}" y="${(y+6.6).toFixed(1)}" width="${tw}" height="1.2" fill="#cdb078" opacity=".5"/>`;for(let c=0;c<cols;c++){s+=`<rect x="${tx+7+c*17.2}" y="${y.toFixed(1)}" width="12.6" height="6.2" fill="${lit()}" opacity=".95"/>`}}
    s+=`<rect x="${tx+tw/2-9}" y="${ty-9}" width="18" height="9" fill="#0c1230"/><rect x="${tx+tw/2-1}" y="${ty-20}" width="2" height="11" fill="#cdb078"/>`;
  } else if(kind==="house"){
    s+=`<rect x="34" y="${horizon-54}" width="252" height="54" fill="#0b1127"/><rect x="82" y="${horizon-96}" width="170" height="44" fill="#10183a"/><rect x="74" y="${horizon-100}" width="186" height="5" fill="#cdb078" opacity=".9"/><rect x="26" y="${horizon-58}" width="268" height="4" fill="#cdb078" opacity=".85"/>`;
    for(let c=0;c<5;c++){s+=`<rect x="${92+c*30}" y="${horizon-88}" width="22" height="28" fill="${lit()}"/><rect x="${103+c*30}" y="${horizon-88}" width="1.2" height="28" fill="#0b1127"/>`}
    for(let c=0;c<6;c++){s+=`<rect x="${44+c*40}" y="${horizon-46}" width="32" height="38" fill="${r()<.8?"#ffd08a":"#1a2347"}"/><rect x="${59.5+c*40}" y="${horizon-46}" width="1.4" height="38" fill="#0b1127"/>`}
    for(const tx of [12,300,22]){s+=`<rect x="${tx-1}" y="${horizon-34}" width="2.4" height="34" fill="#05081a"/><circle cx="${tx}" cy="${horizon-40}" r="15" fill="#06101e"/><circle cx="${tx+8}" cy="${horizon-32}" r="10" fill="#06101e"/>`}
  } else {
    s+=`<rect x="70" y="${horizon-60}" width="180" height="48" fill="#12183a"/><polygon points="58,${horizon-60} 160,${horizon-104} 262,${horizon-60}" fill="#0a0f26"/><polygon points="58,${horizon-60} 160,${horizon-104} 262,${horizon-60} 262,${horizon-56} 58,${horizon-56}" fill="#cdb078" opacity=".35"/>`;
    for(let c=0;c<3;c++){s+=`<rect x="${92+c*50}" y="${horizon-52}" width="26" height="32" fill="${r()<.85?"#ffd08a":"#1a2347"}"/><rect x="${104.5+c*50}" y="${horizon-52}" width="1.4" height="32" fill="#12183a"/>`}
    s+=`<rect x="64" y="${horizon-14}" width="192" height="3" fill="#cdb078" opacity=".8"/>`;
    for(let p=0;p<7;p++)s+=`<rect x="${68+p*30}" y="${horizon-60}" width="3" height="48" fill="#0a0f26"/>`;
    s+=`<rect x="64" y="${horizon-12}" width="192" height="12" fill="#0a0f26"/>`;
    for(const tx of [30,290]){s+=`<circle cx="${tx}" cy="${horizon-26}" r="22" fill="#06101e"/><circle cx="${tx+12}" cy="${horizon-14}" r="14" fill="#06101e"/>`}
  }
  // ground + water
  s+=`<rect y="${horizon}" width="${W}" height="${H-horizon}" fill="#060b18"/>`;
  if(kind==="house"){
    s+=`<rect x="56" y="${horizon+10}" width="208" height="38" rx="2" fill="url(#${id}p)"/>`;
    for(let c=0;c<6;c++)s+=`<rect x="${64+c*33}" y="${horizon+12}" width="20" height="24" fill="#ffd08a" opacity=".22"/>`;
    for(let k=0;k<9;k++)s+=`<rect x="${(60+r()*190).toFixed(0)}" y="${(horizon+14+r()*30).toFixed(0)}" width="${(10+r()*30).toFixed(0)}" height="1" fill="#e7f6ff" opacity=".25"/>`;
    s+=`<rect x="56" y="${horizon+8}" width="208" height="2.5" fill="#cdb078" opacity=".7"/>`;
  } else {
    s+=`<rect y="${horizon+4}" width="${W}" height="${H-horizon-4}" fill="url(#${id}w)" opacity=".9"/>`;
    for(let k=0;k<26;k++)s+=`<rect x="${(40+r()*240).toFixed(0)}" y="${(horizon+6+r()*40).toFixed(0)}" width="${(2+r()*3).toFixed(1)}" height="${(5+r()*14).toFixed(0)}" fill="#ffd08a" opacity="${(.12+r()*.3).toFixed(2)}"/>`;
  }
  s+=`<rect width="${W}" height="${H}" fill="none" stroke="rgba(205,176,120,.18)"/></svg>`;
  return s;
};
})();
