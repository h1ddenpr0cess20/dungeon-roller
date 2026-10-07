var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=e=>440*2**((e-69)/12),r=[0,3,7],i=[0,4,7],a={rise:[[0,r],[8,i],[3,i],[10,i]],dread:[[0,r],[8,i],[5,r],[7,i]],deep:[[0,r],[1,i],[0,r],[10,i]],doom:[[0,r],[1,i],[8,i],[7,i]]};function o(e,t=!1){if(t)return{tonic:e>=12?38:40,progression:a.doom,tempo:96,boss:!0};let n=Math.min(3,Math.floor((e-1)/3));return{tonic:[45,43,41,38][n],progression:[a.rise,a.dread,a.deep,a.deep][n],tempo:84-n*4-(e-1)%3*2,boss:!1}}function s(e,t,r){let i=e.createGain();i.gain.value=1;let a=e.createDynamicsCompressor();a.threshold.value=-18,a.ratio.value=3,a.attack.value=.02,a.release.value=.4;let o=e.createConvolver();o.buffer=c(e,3.6,2.2);let s=e.createGain();s.gain.value=.55,i.connect(a),i.connect(o).connect(s).connect(a),a.connect(t);let l=i,u=(t,n)=>{let r=e.createGain();return r.gain.setValueAtTime(1e-4,n),r.connect(l),r},d=(e,t,n,r,i,a)=>(e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(n,t+r),e.gain.setValueAtTime(n,t+r+i),e.gain.exponentialRampToValueAtTime(1e-4,t+r+i+a),t+r+i+a+.05),f=(t,n,r,i,a,o=0)=>{let s=e.createOscillator();return s.type=t,s.frequency.setValueAtTime(n,r),s.detune.value=o,s.connect(a),s.start(r),s.stop(i),s};function p(t,r,i,a=.035){for(let o of t){let t=e.createBiquadFilter();t.type=`lowpass`,t.frequency.value=900,t.Q.value=.5;let s=u(a,r);t.connect(s);let c=d(s,r,a,i*.35,i*.4,i*.6);for(let e of[-9,0,8])f(`sawtooth`,n(o),r,c,t,e)}}function m(t,r,i,a=.03){for(let o of t){let t=u(a,r),s=d(t,r,a,i*.4,i*.35,i*.5),c=e.createGain();c.gain.value=1;for(let[n,r,i]of[[750,7,1],[1150,8,.6],[2600,9,.25]]){let a=e.createBiquadFilter();a.type=`bandpass`,a.frequency.value=n,a.Q.value=r;let o=e.createGain();o.gain.value=i*3.2,c.connect(a).connect(o).connect(t)}let l=e.createOscillator();l.frequency.value=5+Math.random();let p=e.createGain();p.gain.value=6,l.connect(p);for(let e of[-6,5]){let t=f(`sawtooth`,n(o),r,s,c,e);p.connect(t.detune)}l.start(r),l.stop(s)}}function h(t,r,i,a=.05){for(let o of t){let t=e.createBiquadFilter();t.type=`lowpass`,t.Q.value=1.2,t.frequency.setValueAtTime(250,r),t.frequency.exponentialRampToValueAtTime(2400,r+Math.min(.35,i*.4)),t.frequency.exponentialRampToValueAtTime(500,r+i);let s=u(a,r);t.connect(s);let c=d(s,r,a,.06,i*.5,i*.45);f(`sawtooth`,n(o),r,c,t,-4),f(`square`,n(o),r,c,t,4)}}function g(t,r,i,a){let o=e.createBiquadFilter();o.type=`lowpass`,o.frequency.setValueAtTime(1400*a,r),o.frequency.exponentialRampToValueAtTime(300,r+i);let s=u(.09*a,r);o.connect(s);let c=d(s,r,.09*a,.012,i*.25,i*.6);f(`sawtooth`,n(t),r,c,o,-5),f(`sawtooth`,n(t+12),r,c,o,6)}function _(e,t=1){let n=u(.5*t,e),r=d(n,e,.5*t,.004,.02,.55*t);f(`sine`,85,e,r,n).frequency.exponentialRampToValueAtTime(38,e+.35),y(e,380,.12*t,.12)}function v(e,t,r=.18){let i=u(r,t),a=d(i,t,r,.005,.03,.9);f(`sine`,n(e)*1.02,t,a,i).frequency.exponentialRampToValueAtTime(n(e),t+.08),y(t,700,.05,.06)}function y(t,n,i,a){let o=e.createBufferSource();o.buffer=r;let s=e.createBiquadFilter();s.type=`lowpass`,s.frequency.value=n;let c=u(i,t);o.connect(s).connect(c);let l=d(c,t,i,.003,.01,a);o.start(t,Math.random()),o.stop(l)}function b(e,t,r=.06){for(let[i,a,o]of[[1,1,4.5],[2,.5,3],[2.76,.4,2.2],[5.4,.25,1.2],[.5,.35,5]]){let s=u(r*a,t),c=d(s,t,r*a,.004,0,o);f(`sine`,n(e)*i,t,c,s)}}let x=null;function S(e,t,n){let r=60/e.tempo,[i,a]=e.progression[t%e.progression.length],o=e.tonic+i,s=e.boss?2+(t>>2)%2:(t>>2)%4,c=a.map(e=>o+24+e),l=r*4;if(p([o+12,...c],n,l*1.1,s===0?.03:.024),t%8==0&&b(e.tonic+36,n),s===0){_(n,.6),t%2&&_(n+r*2.5,.4);return}let u=[1,.5,.55,.9,.5,.55,.9,.5,1,.5,.55,.9,.5,.55,.9,.5];for(let e=0;e<16;e++)g(o+12+(e%8==7&&s>=2?7:0),n+r/4*e,r/4,u[e]*(s>=2?1:.75));let d=s===1?[0,2.5]:e.boss?[0,.75,1.5,2,2.5,3,3.5]:[0,1,1.75,2.5,3];for(let e of d)_(n+r*e,e===0?1:.7);if(s>=2&&(m([o+24+a[1],o+36],n,l*1.05),h(c.map(e=>e-12),n,r*1.5,e.boss?.06:.045),(s===3||e.boss)&&h([o+24+a[2]],n+r*2.5,r*1.2,.04)),t%16==15||e.boss&&t%4==3)for(let t=0;t<8;t++)v(e.tonic+12,n+r*2+r/4*t,.06+t*.02)}return{start(t){this.stop(),l=e.createGain(),l.connect(i);let n={theme:t,bar:0,next:e.currentTime+.1,out:l};n.timer=setInterval(()=>{for(;n.next<e.currentTime+.6;)S(t,n.bar,n.next),n.next+=60/t.tempo*4,n.bar++},100),x=n},stop(){if(!x)return;clearInterval(x.timer);let t=x.out;t.gain.setTargetAtTime(0,e.currentTime,.12),setTimeout(()=>t.disconnect(),2e3),x=null},get playing(){return!!x},sketch(t,n){l=e.createGain(),l.connect(i);let r=60/t.tempo*4;for(let i=0;i<n;i++)S(t,i,e.currentTime+.05+i*r)}}}function c(e,t,n){let r=Math.floor(e.sampleRate*t),i=e.createBuffer(2,r,e.sampleRate);for(let e=0;e<2;e++){let t=i.getChannelData(e);for(let e=0;e<r;e++)t[e]=(Math.random()*2-1)*(1-e/r)**n}return i}var l=e=>440*2**((e-69)/12);function u(){let e=null,t=null,n=null,r=null,i=null,a=null,c=!1,u=null;try{c=localStorage.getItem(`dungeon-roller.muted`)===`1`}catch{}function d(){if(e){e.state===`suspended`&&e.resume();return}let o=globalThis.AudioContext||globalThis.webkitAudioContext;if(!o)return;e=new o,t=e.createGain(),t.gain.value=c?0:.8,t.connect(e.destination),n=e.createGain(),n.gain.value=.9,n.connect(t),r=e.createGain(),r.gain.value=.7,r.connect(t),a=e.createBuffer(1,e.sampleRate*2,e.sampleRate);let s=a.getChannelData(0);for(let e=0;e<s.length;e++)s[e]=Math.random()*2-1;let l=e.createBufferSource();l.buffer=a,l.loop=!0;let u=e.createBiquadFilter();u.type=`bandpass`,u.frequency.value=260,u.Q.value=.9;let d=e.createBiquadFilter();d.type=`lowpass`,d.frequency.value=1100;let f=e.createGain();f.gain.value=0,l.connect(u).connect(d).connect(f).connect(n),l.start(),i={band:u,gain:f}}let f=()=>e.currentTime;function p({at:t=0,length:r=.1,type:i=`lowpass`,freq:o=1e3,q:s=.7,gain:c=.5,sweep:l=null}){if(!e)return;let u=f()+t,d=e.createBufferSource();d.buffer=a;let p=e.createBiquadFilter();p.type=i,p.frequency.setValueAtTime(o,u),l&&p.frequency.exponentialRampToValueAtTime(l,u+r),p.Q.value=s;let m=e.createGain();m.gain.setValueAtTime(c,u),m.gain.exponentialRampToValueAtTime(1e-4,u+r),d.connect(p).connect(m).connect(n),d.start(u,Math.random()*1.5),d.stop(u+r+.05)}function m({at:t=0,freq:r=440,to:i=null,length:a=.15,type:o=`sine`,gain:s=.3,out:c=n,attack:l=.005}){if(!e)return;let u=f()+t,d=e.createOscillator();d.type=o,d.frequency.setValueAtTime(r,u),i&&d.frequency.exponentialRampToValueAtTime(i,u+a);let p=e.createGain();p.gain.setValueAtTime(1e-4,u),p.gain.exponentialRampToValueAtTime(s,u+l),p.gain.exponentialRampToValueAtTime(1e-4,u+a),d.connect(p).connect(c),d.start(u),d.stop(u+a+.05)}return{wake:d,get muted(){return c},toggleMute(){c=!c;try{localStorage.setItem(`dungeon-roller.muted`,c?`1`:`0`)}catch{}return t&&t.gain.setTargetAtTime(c?0:.8,f(),.05),c},rolling(e,t){if(!i)return;let n=t?Math.min(.26,e*.028):0;i.gain.gain.setTargetAtTime(n,f(),.05),i.band.frequency.setTargetAtTime(140+e*70,f(),.08)},clatter(e){let t=Math.min(1,e/12);t<.08||(m({freq:1250+Math.random()*300,to:900,length:.05,type:`triangle`,gain:.35*t}),p({length:.05,type:`bandpass`,freq:1800,q:3,gain:.5*t}),m({freq:160,to:70,length:.1,gain:.35*t}))},coin(){m({freq:l(88),length:.08,type:`square`,gain:.06}),m({at:.06,freq:l(95),length:.22,type:`square`,gain:.06}),m({at:.06,freq:l(100),length:.18,type:`sine`,gain:.08})},potion(){for(let e=0;e<6;e++)m({at:e*.05,freq:400+e*120,to:700+e*160,length:.07,gain:.1});m({at:.32,freq:l(84),length:.4,type:`triangle`,gain:.12})},key(){[84,91,96].forEach((e,t)=>m({at:t*.07,freq:l(e),length:.25,type:`triangle`,gain:.12})),p({length:.12,type:`highpass`,freq:5e3,gain:.15})},gate(){p({length:1,type:`bandpass`,freq:180,sweep:420,q:4,gain:.5});for(let e=0;e<9;e++)m({at:e*.1,freq:90+Math.random()*40,length:.06,type:`square`,gain:.06})},locked(){m({freq:220,length:.08,type:`square`,gain:.1}),m({at:.1,freq:196,length:.14,type:`square`,gain:.1}),p({length:.06,type:`bandpass`,freq:2500,q:5,gain:.25})},hurt(){m({freq:220,to:110,length:.18,type:`sawtooth`,gain:.12}),p({length:.12,freq:600,gain:.35})},spikes(){m({freq:2600,to:1800,length:.18,type:`triangle`,gain:.18}),p({length:.08,type:`highpass`,freq:4e3,gain:.3})},slam(){p({length:.35,freq:400,gain:.8}),m({freq:90,to:40,length:.4,gain:.6})},sizzle(){p({length:1.1,type:`bandpass`,freq:3e3,sweep:800,q:1.5,gain:.5});for(let e=0;e<8;e++)m({at:e*.08,freq:200+Math.random()*300,to:90,length:.08,gain:.08})},fall(){m({freq:700,to:90,length:1.2,type:`triangle`,gain:.22})},battle(e){p({length:.25,freq:900,gain:.5}),m({freq:110,to:55,length:.35,type:`sawtooth`,gain:.2});let t={critical:[72,76,79,84,88],success:[69,72,76,81],struggle:[69,68,69,64],fumble:[64,63,62,57]}[e]??[69];t.forEach((e,n)=>m({at:.2+n*.1,freq:l(e),length:n===t.length-1?.5:.12,type:`square`,gain:.1}))},descend(){[69,64,60,57].forEach((e,t)=>m({at:t*.16,freq:l(e),length:.3,type:`triangle`,gain:.14}))},goal(){[69,72,76,81,76,81].forEach((e,t)=>m({at:t*.11,freq:l(e),length:t===5?.6:.16,type:`square`,gain:.12})),[57,60,64,69].forEach((e,t)=>m({at:t*.22,freq:l(e-12),length:.3,type:`triangle`,gain:.16}))},over(){[69,65,62,57,52].forEach((e,t)=>m({at:t*.32,freq:l(e),length:.45,type:`square`,gain:.11}))},startMusic(t=1,{boss:n=!1}={}){e&&(u??=s(e,r,a),!u.playing&&u.start(o(t,n)))},stopMusic(){u?.stop()}}}var d=Object.freeze([{id:`knight`,name:`Knight`,hp:30,weight:3,colour:`#c9d3e6`,mark:`K`},{id:`rogue`,name:`Rogue`,hp:22,weight:2,colour:`#9fd48a`,mark:`R`},{id:`cleric`,name:`Cleric`,hp:24,weight:2,colour:`#f2d27a`,mark:`C`},{id:`mage`,name:`Mage`,hp:18,weight:1,colour:`#b9a2f0`,mark:`M`}]);function f(e=1){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function p(){return{heroes:d.map(e=>({id:e.id,name:e.name,hp:e.hp,max:e.hp,weight:e.weight})),revives:0}}var m=e=>e.heroes.filter(e=>e.hp>0),h=e=>m(e).length===0;function g(e,t,n=Math.random){let r=e.heroes.map(()=>0);for(let i=0;i<t;i++){let t=e.heroes.filter(e=>e.hp>0);if(!t.length)break;let i=n()*t.reduce((e,t)=>e+t.weight,0),a=t[t.length-1];for(let e of t)if(i-=e.weight,i<0){a=e;break}--a.hp,r[e.heroes.indexOf(a)]+=1}return r}function _(e,t){return e.heroes.map(e=>{if(e.hp<=0)return 0;let n=Math.min(t,e.max-e.hp);return e.hp+=n,n})}function v(e){return!e.revives||!e.heroes.some(e=>e.hp<=0)?null:(--e.revives,e.heroes.map(e=>{if(e.hp>0)return 0;let t=Math.ceil(e.max/2),n=t-e.hp;return e.hp=t,n}))}function y(e){for(let t of e.heroes)t.hp=Math.min(t.max,Math.max(t.hp,0)+Math.ceil(t.max/2));return e}function b({roll:e,monster:t}){let{dc:n,power:r,gold:i}=t;return e>=20?{roll:e,dc:n,grade:`critical`,damage:0,gold:i*2}:e<=1?{roll:e,dc:n,grade:`fumble`,damage:r*2,gold:i}:e>=n?{roll:e,dc:n,grade:`success`,damage:Math.max(0,Math.ceil(r/2)-(e-n)),gold:i}:{roll:e,dc:n,grade:`struggle`,damage:Math.ceil(r/2)+Math.ceil((n-e)/3),gold:i}}var x=Object.freeze({critical:{title:`CRITICAL!`,line:`A natural 20. The party cuts it down without a scratch.`},success:{title:`VICTORY`,line:`Over the DC: a clean fight.`},struggle:{title:`HARD-WON`,line:`Under the DC: the party wins, but it hurts.`},fumble:{title:`FUMBLE!`,line:`A natural 1. It gets in twice before it goes down.`}});function S(e){let t=document.createElement(`section`);t.id=`battle`,t.hidden=!0,t.setAttribute(`role`,`dialog`),t.setAttribute(`aria-label`,`Battle`),t.innerHTML=`
    <div class="embers" aria-hidden="true">${`<i></i>`.repeat(18)}</div>
    <div class="card">
      <span class="studs" aria-hidden="true"></span>
      <h2 class="foe"></h2>
      <span class="boss"></span>
      <div class="rule" aria-hidden="true"><i></i><b></b><i></i></div>
      <div class="clash">
        <div class="roll"><span class="d20"></span><span class="label">your roll</span></div>
        <div class="vs">vs</div>
        <div class="dc"><span class="value"></span><span class="label">DC</span></div>
      </div>
      <p class="grade"></p>
      <p class="line"></p>
      <ul class="heroes"></ul>
      <p class="loot"></p>
      <button type="button" class="go">CONTINUE</button>
    </div>`,e.appendChild(t);let n=e=>t.querySelector(e),r=null,i=()=>{if(!r)return;t.hidden=!0;let e=r;r=null,e()};return n(`.go`).addEventListener(`click`,e=>{e.stopPropagation(),i()}),t.addEventListener(`pointerdown`,e=>e.stopPropagation()),{get open(){return r!==null},show({monster:e,result:i,before:a,after:o}){let s=x[i.grade];return n(`.foe`).textContent=e.name,n(`.boss`).textContent=e.boss?`the boss`:``,n(`.d20`).textContent=String(i.roll),n(`.d20`).dataset.grade=i.grade,n(`.dc .value`).textContent=String(i.dc),n(`.grade`).textContent=s.title,n(`.grade`).dataset.grade=i.grade,n(`.line`).textContent=s.line,n(`.heroes`).replaceChildren(...d.map((e,t)=>{let n=document.createElement(`li`),r=a[t]-o[t];return n.innerHTML=`<b style="color:${e.colour}">${e.name}</b><span class="bar"><i style="width:${100*Math.max(0,o[t])/e.hp}%"></i></span><span class="hp">${Math.max(0,o[t])}/${e.hp}</span><span class="lost">${r>0?`−${r}`:``}${o[t]<=0&&a[t]>0?` DOWN`:``}</span>`,o[t]<=0&&n.classList.add(`down`),n})),n(`.loot`).textContent=`+${i.gold} gold`,t.hidden=!1,t.classList.remove(`pop`),t.offsetWidth,t.classList.add(`pop`),new Promise(e=>{r=e,n(`.go`).focus({preventScroll:!0})})},proceed:i}}var C={x:0,y:1,z:0};function w(e){let t=new e.Group;t.name=`nat_character`;let n=new e.Group;n.name=`body`,t.add(n);let r=new e.IcosahedronGeometry(1,0);r.computeVertexNormals();let i=new e.MeshPhysicalMaterial({name:`resin`,color:new e.Color(`#3a3350`),roughness:.28,metalness:0,clearcoat:.9,clearcoatRoughness:.14,flatShading:!0}),a=new e.Mesh(r,i);a.name=`die`,n.add(a);let o=new e.LineSegments(new e.EdgesGeometry(new e.IcosahedronGeometry(1.004,0),1),new e.LineBasicMaterial({color:new e.Color(`#8d80b8`),transparent:!0,opacity:.55}));o.name=`edge_ink`,n.add(o);let s=[];{let t=r.attributes.position,n=new e.Vector3,i=new e.Vector3,a=new e.Vector3;for(let r=0;r<t.count;r+=3){n.fromBufferAttribute(t,r),i.fromBufferAttribute(t,r+1),a.fromBufferAttribute(t,r+2);let o=new e.Vector3().add(n).add(i).add(a).divideScalar(3);s.push({centroid:o,normal:o.clone().normalize()})}}let c=Array(s.length).fill(0);{let e=1;for(let t=0;t<s.length;t++){if(c[t])continue;let n=-1,r=1;for(let e=0;e<s.length;e++){let i=s[t].normal.dot(s[e].normal);i<r&&(r=i,n=e)}c[t]=e,c[n]=21-e,e++}}let l=t=>{if(typeof document>`u`)return null;let n=document.createElement(`canvas`);n.width=n.height=256;let r=n.getContext(`2d`);r.clearRect(0,0,256,256),r.fillStyle=t===20?`#ffd479`:`#e7e0f7`,r.font=`600 ${t===20?120:132}px ui-monospace, "SF Mono", Menlo, monospace`,r.textAlign=`center`,r.textBaseline=`middle`,r.fillText(String(t),128,134),(t===6||t===9)&&r.fillRect(84,204,88,11);let i=new e.CanvasTexture(n);return i.colorSpace=e.SRGBColorSpace,i.anisotropy=4,i},u=new e.PlaneGeometry(.62,.62),d=new e.Vector3(C.x,C.y,C.z);return s.forEach((t,r)=>{let i=new e.MeshBasicMaterial({map:l(c[r]),transparent:!0,depthWrite:!1,toneMapped:!1});i.name=`glyph_`+c[r];let a=new e.Mesh(u,i);a.name=`face_`+c[r],a.position.copy(t.centroid).multiplyScalar(1.006);let o=(Math.abs(t.normal.y)>.98?new e.Vector3(0,0,1):d).clone().projectOnPlane(t.normal).normalize(),s=new e.Vector3().crossVectors(o,t.normal).normalize();a.quaternion.setFromRotationMatrix(new e.Matrix4().makeBasis(s,o,t.normal)),n.add(a),t.mesh=a,t.number=c[r]}),{group:t,body:n,die:a,dieMat:i,edges:o,faces:s,numbers:c}}var T=.55,E=Math.sqrt(204),D=4,O=.45,k=3;function A(e,t,n,r,i,a){let o=r[i],s=r[i+1],c=r[i+2],l=r[i+3],u=r[i+4],d=r[i+5],f=r[i+6],p=r[i+7],m=r[i+8],h=l-o,g=u-s,_=d-c,v=f-o,y=p-s,b=m-c,x=e-o,S=t-s,C=n-c,w=h*x+g*S+_*C,T=v*x+y*S+b*C;if(w<=0&&T<=0){a[0]=o,a[1]=s,a[2]=c;return}let E=e-l,D=t-u,O=n-d,k=h*E+g*D+_*O,A=v*E+y*D+b*O;if(k>=0&&A<=k){a[0]=l,a[1]=u,a[2]=d;return}let j=w*A-k*T;if(j<=0&&w>=0&&k<=0){let e=w/(w-k);a[0]=o+h*e,a[1]=s+g*e,a[2]=c+_*e;return}let M=e-f,N=t-p,P=n-m,F=h*M+g*N+_*P,I=v*M+y*N+b*P;if(I>=0&&F<=I){a[0]=f,a[1]=p,a[2]=m;return}let ee=F*T-w*I;if(ee<=0&&T>=0&&I<=0){let e=T/(T-I);a[0]=o+v*e,a[1]=s+y*e,a[2]=c+b*e;return}let te=k*I-F*A;if(te<=0&&A-k>=0&&F-I>=0){let e=(A-k)/(A-k+(F-I));a[0]=l+(f-l)*e,a[1]=u+(p-u)*e,a[2]=d+(m-d)*e;return}let ne=1/(te+ee+j),re=ee*ne,ie=j*ne;a[0]=o+h*re+v*ie,a[1]=s+g*re+y*ie,a[2]=c+_*re+b*ie}var j=class{constructor({cols:e,rows:t}){this.cols=e,this.rows=t,this._tris=[],this._buckets=Array.from({length:e*t},()=>[]),this.triangles=new Float32Array,this.normals=new Float32Array,this._seen=new Uint32Array,this._stamp=0,this.boxes=[]}addTriangle(e,t,n,r,i,a,o,s,c){let l=this._tris.length/9;this._tris.push(e,t,n,r,i,a,o,s,c);let u=Math.max(0,Math.floor(Math.min(e,r,o)-1e-4)),d=Math.min(this.cols-1,Math.floor(Math.max(e,r,o)+1e-4)),f=Math.max(0,Math.floor(Math.min(n,a,c)-1e-4)),p=Math.min(this.rows-1,Math.floor(Math.max(n,a,c)+1e-4));for(let e=f;e<=p;e++)for(let t=u;t<=d;t++)this._buckets[e*this.cols+t].push(l)}finish(){let e=this.triangles=Float32Array.from(this._tris);this._tris=[];let t=this.normals=new Float32Array(e.length/3);for(let n=0,r=0;n<e.length;n+=9,r+=3){let i=e[n+3]-e[n],a=e[n+4]-e[n+1],o=e[n+5]-e[n+2],s=e[n+6]-e[n],c=e[n+7]-e[n+1],l=e[n+8]-e[n+2],u=a*l-o*c,d=o*s-i*l,f=i*c-a*s,p=Math.hypot(u,d,f)||1;u/=p,d/=p,f/=p,t[r]=u,t[r+1]=d,t[r+2]=f}return this._seen=new Uint32Array(e.length/9),this}near(e,t,n,r){let i=++this._stamp,a=Math.max(0,Math.floor(e-n)),o=Math.min(this.cols-1,Math.floor(e+n)),s=Math.max(0,Math.floor(t-n)),c=Math.min(this.rows-1,Math.floor(t+n));for(let e=s;e<=c;e++)for(let t=a;t<=o;t++){let n=this._buckets[e*this.cols+t];for(let e=0;e<n.length;e++){let t=n[e];this._seen[t]!==i&&(this._seen[t]=i,r(t))}}}};function M({x:e=0,y:t=0,z:n=0,r=.35,mass:i=1}={}){return{x:e,y:t,z:n,vx:0,vy:0,vz:0,r,mass:i,grounded:!1,nx:0,ny:1,nz:0,on:null,peak:t}}function N(e,t,n,r){e.x=t,e.y=n,e.z=r,e.vx=e.vy=e.vz=0,e.grounded=!1,e.on=null,e.peak=n}var P=[0,0,0],F=[],I=[];function ee(e,t,n,r,i,{push:a=17,airPush:o=5,topSpeed:s=9}={}){let c={impact:0,landed:!1,drop:0,crushed:!1},l=e.grounded,u=e.on;u&&(e.x+=u.vx*i,e.y+=u.vy*i,e.z+=u.vz*i);let d=Math.hypot(n,r);if(d>1e-6){let t=n/d,c=r/d;if(e.vx*t+e.vz*c<s){let n=(l?a:o)*Math.min(1,d)*i;e.vx+=t*n,e.vz+=c*n}}if(e.vy-=24*i,l){let t=Math.max(0,1-T*i);e.vx*=t,e.vz*=t}let f=Math.hypot(e.vx,e.vy,e.vz);if(f>26){let t=26/f;e.vx*=t,e.vy*=t,e.vz*=t}e.x+=e.vx*i,e.y+=e.vy*i,e.z+=e.vz*i,e.grounded=!1,e.on=null;let p=0,m=0,h=0,g=(t,n,r,i,a)=>{e.x+=t*i,e.y+=n*i,e.z+=r*i;let o=a&&a!==u,s=o?a.vx:0,l=o?a.vy:0,d=o?a.vz:0,f=e.vx-s,g=e.vy-l,_=e.vz-d,v=f*t+g*n+_*r;if(v<0){let i=-v;i>c.impact&&(c.impact=i);let a=i>D?1.32:1;e.vx-=t*v*a,e.vy-=n*v*a,e.vz-=r*v*a}n>O&&(e.grounded=!0,p+=t,m+=n,h+=r,a&&(e.on=a)),a&&n<-.45&&a.vy<-.5&&(c.squeezedFrom=a)},_=e.r,v=_*_,y=t.triangles,b=t.normals;for(let n=0;n<k;n++){let n=!1;F.length=0,t.near(e.x,e.z,_,t=>{A(e.x,e.y,e.z,y,t*9,P);let n=e.x-P[0],r=e.y-P[1],i=e.z-P[2],a=n*n+r*r+i*i;a<v&&F.push(a,t)}),I.length=0;for(let e=0;e<F.length;e+=2)I.push(e);I.sort((e,t)=>F[e]-F[t]);for(let t of I){let r=F[t+1];A(e.x,e.y,e.z,y,r*9,P);let i=e.x-P[0],a=e.y-P[1],o=e.z-P[2],s=i*i+a*a+o*o;if(s>=v)continue;let c=r*3;if(i*b[c]+a*b[c+1]+o*b[c+2]<0)continue;let l=Math.sqrt(s);l<1e-6?g(b[c],b[c+1],b[c+2],_,null):g(i/l,a/l,o/l,_-l,null),n=!0}for(let r of t.boxes){if(!r.solid)continue;let t=Math.max(r.min[0],Math.min(e.x,r.max[0])),i=Math.max(r.min[1],Math.min(e.y,r.max[1])),a=Math.max(r.min[2],Math.min(e.z,r.max[2])),o=e.x-t,s=e.y-i,c=e.z-a,l=o*o+s*s+c*c;if(!(l>=v)){if(l>1e-12){let e=Math.sqrt(l);g(o/e,s/e,c/e,_-e,r)}else{let[t,n,i,a]=[[e.x-r.min[0],-1,0,0],[r.max[0]-e.x,1,0,0],[e.y-r.min[1],0,-1,0],[r.max[1]-e.y,0,1,0],[e.z-r.min[2],0,0,-1],[r.max[2]-e.z,0,0,1]].sort((e,t)=>e[0]-t[0])[0];g(n,i,a,t+_,r)}n=!0}}if(!n)break}if(e.grounded){let t=Math.hypot(p,m,h)||1;e.nx=p/t,e.ny=m/t,e.nz=h/t,l||(c.landed=!0,c.drop=e.peak-e.y),e.peak=e.y,c.squeezedFrom&&(c.crushed=!0)}else e.peak=Math.max(e.peak,e.y);return c}function te(e,t,n=.9){let r=t.x-e.x,i=t.y-e.y,a=t.z-e.z,o=r*r+i*i+a*a,s=e.r+t.r;if(o>=s*s||o<1e-12)return 0;let c=Math.sqrt(o),l=r/c,u=i/c,d=a/c,f=1/e.mass,p=1/t.mass,m=s-c;e.x-=l*m*f/(f+p),e.y-=u*m*f/(f+p),e.z-=d*m*f/(f+p),t.x+=l*m*p/(f+p),t.y+=u*m*p/(f+p),t.z+=d*m*p/(f+p);let h=(t.vx-e.vx)*l+(t.vy-e.vy)*u+(t.vz-e.vz)*d;if(h>=0)return 0;let g=-(1+n)*h/(f+p);return e.vx-=l*g*f,e.vy-=u*g*f,e.vz-=d*g*f,t.vx+=l*g*p,t.vy+=u*g*p,t.vz+=d*g*p,-h}function ne(e,t=[0,0,0]){let{vx:n,vy:r,vz:i}=e;return t[0]=(e.ny*i-e.nz*r)/e.r,t[1]=(e.nz*n-e.nx*i)/e.r,t[2]=(e.nx*r-e.ny*n)/e.r,t}function re(e,t,n){let r=Math.hypot(t[0],t[1],t[2]);if(r<1e-6)return e;let i=r*n,a=t[0]/r,o=t[1]/r,s=t[2]/r,c=Math.sin(i/2),l=Math.cos(i/2),[u,d,f,p]=e,m=l*u+c*(a*p+o*f-s*d),h=l*d+c*(o*p+s*u-a*f),g=l*f+c*(s*p+a*d-o*u),_=l*p-c*(a*u+o*d+s*f),v=Math.hypot(m,h,g,_)||1;return e[0]=m/v,e[1]=h/v,e[2]=g/v,e[3]=_/v,e}var ie=.36,ae=.4,oe=.45,se=9,ce=.42,le=1.2,ue=null;function de(e){if(ue)return ue;let t=w(e),n=new e.IcosahedronGeometry(1,0).attributes.position,r=[];for(let e=0;e<n.count;e++){let t=[n.getX(e),n.getY(e),n.getZ(e)];r.some(e=>Math.hypot(e[0]-t[0],e[1]-t[1],e[2]-t[2])<1e-4)||r.push(t)}let i=t.faces.map(e=>({normal:[e.normal.x,e.normal.y,e.normal.z],number:e.number}));return ue={...t,glyphs:t.faces,faces:i,corners:r},ue}function fe(e,t,n=[0,0,0]){let[r,i,a,o]=e,[s,c,l]=t,u=2*(i*l-a*c),d=2*(a*s-r*l),f=2*(r*c-i*s);return n[0]=s+o*u+(i*f-a*d),n[1]=c+o*d+(a*u-r*f),n[2]=l+o*f+(r*d-i*u),n}var pe=[0,0,0];function me(e,t,n=1){let r=-2,i=e.faces[0];for(let a of e.faces){let e=fe(t,a.normal,pe)[1]*n;e>r&&(r=e,i=a)}return{number:i.number,normal:i.normal,up:r}}function he(e,t){let n=0;for(let r of e.corners)n=Math.max(n,-fe(t,r,pe)[1]);return n*ae}function ge(e,t){let n=e[0]*t[0]+e[1]*t[1]+e[2]*t[2];if(n<-.999999){let t=Math.abs(e[0])<.9?[0,-e[2],e[1]]:[e[2],0,-e[0]],n=Math.hypot(...t);return[t[0]/n,t[1]/n,t[2]/n,0]}let r=e[1]*t[2]-e[2]*t[1],i=e[2]*t[0]-e[0]*t[2],a=e[0]*t[1]-e[1]*t[0],o=1+n,s=Math.hypot(r,i,a,o);return[r/s,i/s,a/s,o/s]}function _e(e,t){let[n,r,i,a]=e,[o,s,c,l]=t;return[a*o+n*l+r*c-i*s,a*s-n*c+r*l+i*o,a*c+n*s-r*o+i*l,a*l-n*o-r*s-i*c]}function ve(e,t,n){let[r,i,a,o]=t,s=e[0]*r+e[1]*i+e[2]*a+e[3]*o;s<0&&(s=-s,r=-r,i=-i,a=-a,o=-o);let c=1-n,l=n;if(s<.9995){let e=Math.acos(s),t=Math.sin(e);c=Math.sin((1-n)*e)/t,l=Math.sin(n*e)/t}let u=e[0]*c+r*l,d=e[1]*c+i*l,f=e[2]*c+a*l,p=e[3]*c+o*l,m=Math.hypot(u,d,f,p)||1;return e[0]=u/m,e[1]=d/m,e[2]=f/m,e[3]=p/m,e}function ye(){return{q:[0,0,0,1],spin:[0,0,0],settled:!1,rolled:0,tip:0,seed:20,nudge:0}}function be(e,t,n,r){let i=Math.hypot(t.vx,t.vz);if(t.grounded&&i<oe){let t=me(n,e.q),i=ge(fe(e.q,t.normal),[0,1,0]);return ve(e.q,_e(i,e.q),Math.min(1,se*r)),e.spin[0]=e.spin[1]=e.spin[2]=0,e.settled=t.up>.999,e}if(e.settled=!1,t.grounded)ne(t,e.spin),e.rolled+=i*r,e.rolled>e.tip&&(e.tip=e.rolled+ce,e.seed=e.seed*16807%2147483647,e.nudge=((e.seed-1)/2147483646-.5)*2),e.spin[1]+=i*le*e.nudge;else for(let t=0;t<3;t++)e.spin[t]*=Math.max(0,1-.3*r);return re(e.q,e.spin,r),e}function xe(e,t,n){let r=t.faces.find(e=>e.number===n);if(!r)return e;let i=_e(ge(fe(e.q,r.normal),[0,1,0]),e.q),a=Math.hypot(...i);for(let t=0;t<4;t++)e.q[t]=i[t]/a;return e.spin[0]=e.spin[1]=e.spin[2]=0,e}var Se=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],Ce=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],we=e=>Math.hypot(e[0],e[1],e[2]),Te=(e,t,n)=>e<t?t:e>n?n:e,Ee=(e,t,n)=>e+(t-e)*n;function De([e=0,t=0,n=0]=[]){let r=Math.cos(e),i=Math.sin(e),a=Math.cos(t),o=Math.sin(t),s=Math.cos(n),c=Math.sin(n);return[[s*a,s*o*i-c*r,s*o*r+c*i],[c*a,c*o*i+s*r,c*o*r-s*i],[-o,a*i,a*r]]}var Oe=(e,t,n)=>{let r=e[0]-t[0],i=e[1]-t[1],a=e[2]-t[2];return n?[n[0][0]*r+n[1][0]*i+n[2][0]*a,n[0][1]*r+n[1][1]*i+n[2][1]*a,n[0][2]*r+n[1][2]*i+n[2][2]*a]:[r,i,a]},L=new Uint8Array(512),R=new Float32Array(256);{let e=1234567,t=()=>((e=Math.imul(e^e>>>15,2246822519)+1831565813|0)>>>0)/4294967296,n=Array.from({length:256},(e,t)=>t);for(let e=255;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}for(let e=0;e<512;e++)L[e]=n[e&255];for(let e=0;e<256;e++)R[e]=t()}function ke(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=Math.floor(n),o=e-r,s=t-i,c=n-a,l=r&255,u=i&255,d=a&255,f=o*o*(3-2*o),p=s*s*(3-2*s),m=c*c*(3-2*c),h=L[l]+u,g=L[l+1]+u,_=L[h]+d,v=L[h+1]+d,y=L[g]+d,b=L[g+1]+d,x=R[L[_]]+(R[L[y]]-R[L[_]])*f,S=R[L[v]]+(R[L[b]]-R[L[v]])*f,C=R[L[_+1]]+(R[L[y+1]]-R[L[_+1]])*f,w=R[L[v+1]]+(R[L[b+1]]-R[L[v+1]])*f,T=x+(S-x)*p;return T+(C+(w-C)*p-T)*m}function Ae(e,t,n=2,r=1.8,i={height:0,id:0,edge:0}){let a=n===0?t*r:t,o=n===1?t*r:t,s=n===2?t*r:t,c=e[0]/a,l=e[1]/o,u=e[2]/s,d=Math.floor(c),f=Math.floor(l),p=Math.floor(u),m=9,h=9,g=0,_=0;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)for(let r=-1;r<=1;r++){let i=d+r,a=f+t,o=p+e,s=L[L[L[i&255]+(a&255)]+(o&255)],v=i+R[s],y=a+R[s+71&255],b=o+R[s+151&255],x=c-v,S=l-y,C=u-b,w=Math.sqrt(x*x+S*S+C*C);w<m?(h=m,m=w,g=R[s+33&255],_=n===0?x:n===1?S:C):w<h&&(h=w)}let v=Math.min(1,(h-m)/.32),y=Math.min(1,Math.max(0,.55-_));return i.edge=v,i.height=Math.sqrt(v)*(.3+.7*y),i.id=g,i}function je(e,t,n,r=3){let i=0,a=.5,o=1,s=0;for(let c=0;c<r;c++)i+=a*ke(e*o,t*o,n*o),s+=a,a*=.5,o*=2.03;return i/s}function z(e){let t=parseInt(e.slice(1),16);return[t>>16&255,t>>8&255,t&255].map(e=>{let t=e/255;return t<=.04045?t/12.92:((t+.055)/1.055)**2.4})}var Me=(e,t,n)=>[Ee(e[0],t[0],n),Ee(e[1],t[1],n),Ee(e[2],t[2],n)];function Ne(e,t){let n=Math.hypot(e[0]/t[0],e[1]/t[1],e[2]/t[2]),r=Math.hypot(e[0]/(t[0]*t[0]),e[1]/(t[1]*t[1]),e[2]/(t[2]*t[2]));return r===0?-Math.min(t[0],t[1],t[2]):n*(n-1)/r}function Pe(e,t,n,r,i){let a=Se(n,t),o=Ce(a,a),s=r-i,c=o-s*s,l=1/o,u=Se(e,t),d=Ce(u,a),f=d-o,p=[u[0]*o-a[0]*d,u[1]*o-a[1]*d,u[2]*o-a[2]*d],m=Ce(p,p),h=d*d*o,g=f*f*o,_=Math.sign(s)*s*s*m;return Math.sign(f)*c*g>_?Math.sqrt(m+g)*l-i:Math.sign(d)*c*h<_?Math.sqrt(m+h)*l-r:(Math.sqrt(m*c*l)+d*s)*l-r}function Fe(e,t,n){let r=Math.abs(e[0])-t[0]+n,i=Math.abs(e[1])-t[1]+n,a=Math.abs(e[2])-t[2]+n;return Math.hypot(Math.max(r,0),Math.max(i,0),Math.max(a,0))+Math.min(Math.max(r,i,a),0)-n}function Ie(e,t,n,r){if(r<Math.PI){let i=[Math.sin(r),Math.cos(r)],a=Math.abs(e[0]),o=e[2],s=i[1]*a>i[0]*o?a*i[0]+o*i[1]:Math.hypot(a,o);return Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]+t*t-2*t*s)-n}return Math.hypot(Math.hypot(e[0],e[2])-t,e[1])-n}function Le(e,t,n){let r=Math.hypot(e[0],e[2]),i=-e[1],a=[t,n],o=[r,i],s=Te((o[0]*a[0]+o[1]*a[1])/(a[0]*a[0]+a[1]*a[1]),0,1),c=[o[0]-a[0]*s,o[1]-a[1]*s],l=[o[0]-Te(o[0],0,t),o[1]-n],u=Math.max(a[1]*o[0]-a[0]*o[1],o[1]-n)>0?1:-1,d=i<0?1:u;return Math.sqrt(Math.min(c[0]*c[0]+c[1]*c[1],l[0]*l[0]+l[1]*l[1]))*1*d}var Re=(e,t,n)=>{if(n<=0)return Math.min(e,t);let r=Te(.5+.5*(t-e)/n,0,1);return Ee(t,e,r)-n*r*(1-r)},ze=(e,t,n)=>-Re(-e,-t,n),Be=0,Ve=class e{constructor(){this.shapes=[],this.paints=[],this.current=`body`}part(e,t){let n=this.current;return this.current=e,t(this),this.current=n,this}split(){let t=new Map;for(let n of this.shapes){if(!t.has(n.part)){let r=new e;r.paints=this.paints,r.current=n.part,t.set(n.part,r)}t.get(n.part).shapes.push(n)}return t}shape(e,t,{op:n=`add`,k:r=.03,color:i=`#c0c0c0`,bone:a=`root`,mat:o=`skin`,bump:s=null,locks:c=null}={}){let l={id:Be++,d:e,box:t,op:n,k:r,bone:a,mat:o,bump:s,part:this.current,color:typeof i==`string`?z(i):i};if(c){let[e,n,r=2,i=1.8]=c,a=l.d,o={height:0,id:0,edge:0};l.d=t=>{let s=a(t);return s>n*3||s<-n*3?s:s-n*Ae(t,e,r,i,o).height},l.box=[t[0].map(e=>e-n),t[1].map(e=>e+n)]}if(s){let[n,r]=s,i=e;l.d=e=>i(e)-n*(je(e[0]*r,e[1]*r,e[2]*r,2)-.5)*2,l.box=[t[0].map(e=>e-n),t[1].map(e=>e+n)]}return this.shapes.push(l),this}sphere(e,t,n){return this.shape(n=>we(Se(n,e))-t,[e.map(e=>e-t),e.map(e=>e+t)],n)}ellipsoid(e,t,n={}){let r=n.rot?De(n.rot):null,i=Math.max(...t);return this.shape(n=>Ne(Oe(n,e,r),t),[e.map(e=>e-i),e.map(e=>e+i)],n)}limb(e,t,n,r=n,i){let a=Math.max(n,r);return this.shape(i=>Pe(i,e,t,n,r),[[0,1,2].map(n=>Math.min(e[n],t[n])-a),[0,1,2].map(n=>Math.max(e[n],t[n])+a)],i)}flake(e,t,n,r,i,a=.5,o){let s=we(Se(t,e)),c=Se(t,e).map(e=>e/s),l=Ce(n,c),u=[n[0]-c[0]*l,n[1]-c[1]*l,n[2]-c[2]*l],d=we(u)||1;u=u.map(e=>e/d);let f=[u[1]*c[2]-u[2]*c[1],u[2]*c[0]-u[0]*c[2],u[0]*c[1]-u[1]*c[0]],p=[0,0,s],m=[0,0,0],h=Math.max(r,i);return this.shape(t=>{let n=[t[0]-e[0],t[1]-e[1],t[2]-e[2]];return Pe([Ce(n,f),Ce(n,u)/a,Ce(n,c)],m,p,r,i)*a},[[0,1,2].map(n=>Math.min(e[n],t[n])-h),[0,1,2].map(n=>Math.max(e[n],t[n])+h)],o)}panel(e,t,n,r,i){let a=[(t[1]-e[1])*(n[2]-e[2])-(t[2]-e[2])*(n[1]-e[1]),(t[2]-e[2])*(n[0]-e[0])-(t[0]-e[0])*(n[2]-e[2]),(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0])],o=we(a)||1,s=a.map(e=>e/o),c=[e,t,n],l=c.map((e,t)=>{let n=c[(t+1)%3],r=Se(n,e),i=[s[1]*r[2]-s[2]*r[1],s[2]*r[0]-s[0]*r[2],s[0]*r[1]-s[1]*r[0]],a=we(i)||1;return{u:e,inward:i.map(e=>e/a)}}),u=r/2;return this.shape(t=>{let n=Math.abs(Ce(Se(t,e),s))-u,r=-1/0;for(let{u:e,inward:n}of l)r=Math.max(r,-Ce(Se(t,e),n));return Math.hypot(Math.max(r,0),Math.max(n,0))+Math.min(Math.max(r,n),0)},[[0,1,2].map(r=>Math.min(e[r],t[r],n[r])-u),[0,1,2].map(r=>Math.max(e[r],t[r],n[r])+u)],i)}chain(e,t,n){for(let r=0;r<e.length-1;r++){let i=Array.isArray(n?.bones)?n.bones[r]:n?.bone;this.limb(e[r],e[r+1],t[r],t[r+1],{...n,bone:i})}return this}box(e,t,n=.01,r={}){let i=r.rot?De(r.rot):null,a=Math.hypot(...t);return this.shape(r=>Fe(Oe(r,e,i),t,n),[e.map(e=>e-a),e.map(e=>e+a)],r)}cylinder(e,t,n,r={}){let i=r.rot?De(r.rot):null,a=Math.hypot(t,n),o=r.round??0;return this.shape(r=>{let a=Oe(r,e,i),s=Math.hypot(a[0],a[2])-t+o,c=Math.abs(a[1])-n+o;return Math.min(Math.max(s,c),0)+Math.hypot(Math.max(s,0),Math.max(c,0))-o},[e.map(e=>e-a),e.map(e=>e+a)],r)}torus(e,t,n,r={}){let i=r.rot?De(r.rot):null,a=t+n,o=r.arc??Math.PI;return this.shape(r=>Ie(Oe(r,e,i),t,n,o),[e.map(e=>e-a),e.map(e=>e+a)],r)}cone(e,t,n,r={}){let i=r.rot?De(r.rot):null,a=Math.max(t,n);return this.shape(r=>Le(Oe(r,e,i),t,n),[e.map(e=>e-a),e.map(e=>e+a)],r)}cast(e,t,n=2){let r=this.shapes;this.bare!==void 0&&(this.shapes=r.slice(0,this.bare));try{return this.march(e,t,n)}finally{this.shapes=r}}march(e,t,n){let r=0;for(let i=0;i<160&&r<n;i++){let n=[e[0]+t[0]*r,e[1]+t[1]*r,e[2]+t[2]*r],i=this.field(n);if(i<5e-4)return{p:n,n:this.gradient(n,.002)};r+=Math.max(i*.8,8e-4)}return null}tuft(e,t,{aim:n,length:r=.04,r:i=.012,k:a=.008,color:o=null,mat:s=`skin`,bury:c=.4,flat:l=1,tip:u=.12,keep:d=()=>!0,far:f=1}){this.bare??=this.shapes.length;let p=this.cast(e,t,f);if(!p||!d(p.p,p.n))return!1;let{p:m,n:h}=p,g=n(m,h),_=we(g)||1;g=[g[0]/_,g[1]/_,g[2]/_];let v=[m[0]-h[0]*i*c*2,m[1]-h[1]*i*c*2,m[2]-h[2]*i*c*2],y=[m[0]+g[0]*r,m[1]+g[1]*r,m[2]+g[2]*r],b=`root`,x=1/0;for(let e of this.shapes.slice(0,this.bare)){if(e.op!==`add`)continue;let t=e.d(m);t<x&&(x=t,b=e.bone)}let S=Se(y,v),C=Ce(S,S),w=o?e=>o(Te(Ce(Se(e,v),S)/C,0,1),e):`#808080`;return l<1?this.flake(v,y,h,i,i*u,l,{k:a,bone:b,mat:s,color:w}):this.limb(v,y,i,i*u,{k:a,bone:b,mat:s,color:w}),!0}grown(){return this.bare=void 0,this}tufts({count:e,center:t,spread:n=.3,aim:r,seed:i=1,jitter:a=.3,length:o=.04,r:s=.012,...c}){let l=i*9301+49297,u=()=>(l=(l*9301+49297)%233280)/233280,d=0;for(let i=0;d<e&&i<e*8;i++){let e=u()*2-1,i=u()*Math.PI*2,l=Math.sqrt(1-e*e),f=[l*Math.cos(i),e,l*Math.sin(i)],p=[t[0]+f[0]*n,t[1]+f[1]*n,t[2]+f[2]*n],m=[(u()-.5)*a,(u()-.5)*a,(u()-.5)*a],h=o*(.7+u()*.6),g=s*(.8+u()*.4);this.tuft(p,[-f[0],-f[1],-f[2]],{...c,length:h,r:g,far:n*1.2,aim:(e,t)=>{let n=r(e,t),i=we(n)||1;return[n[0]/i+m[0],n[1]/i+m[1],n[2]/i+m[2]]}})&&d++}return this}paint(e,t,n=.01){return this.paints.push({inside:e,color:typeof t==`string`?z(t):t,soft:n}),this}mirror(e){return e(1),e(-1),this}bounds(e=.05){let t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(let e of this.shapes)if(e.op===`add`)for(let r=0;r<3;r++)t[r]=Math.min(t[r],e.box[0][r]-e.k),n[r]=Math.max(n[r],e.box[1][r]+e.k);return[t.map(t=>t-e),n.map(t=>t+e)]}prepare(e,t,n,r=.04){let i=[0,1,2].map(n=>Math.max(1,Math.ceil((t[n]-e[n])/r))),a=Array(i[0]*i[1]*i[2]),o=this.shapes.map(e=>e.op===`inter`?1/0:n+e.k);for(let t=0;t<i[2];t++)for(let n=0;n<i[1];n++)for(let s=0;s<i[0];s++){let c=[e[0]+s*r,e[1]+n*r,e[2]+t*r],l=[];this.shapes.forEach((e,t)=>{let n=e.box,i=0;for(let e=0;e<3;e++){let t=Math.max(n[0][e]-(c[e]+r),0,c[e]-n[1][e]);i+=t*t}i<=o[t]*o[t]&&l.push(e)}),a[s+i[0]*(n+i[1]*t)]=l}return this.grid={lo:e,n:i,size:r,bins:a},this}near(e){let t=this.grid;if(!t)return this.shapes;let n=Math.floor((e[0]-t.lo[0])/t.size),r=Math.floor((e[1]-t.lo[1])/t.size),i=Math.floor((e[2]-t.lo[2])/t.size);return n<0||r<0||i<0||n>=t.n[0]||r>=t.n[1]||i>=t.n[2]?this.shapes:t.bins[n+t.n[0]*(r+t.n[1]*i)]}field(e){let t=1e9,n=this.near(e);for(let r=0;r<n.length;r++){let i=n[r];t=i.op===`add`?Re(t,i.d(e),i.k):i.op===`sub`?ze(t,-i.d(e),i.k):ze(t,i.d(e),i.k)}return t}gradient(e,t){let n=(e,t,n)=>this.field([e,t,n]),r=[n(e[0]+t,e[1],e[2])-n(e[0]-t,e[1],e[2]),n(e[0],e[1]+t,e[2])-n(e[0],e[1]-t,e[2]),n(e[0],e[1],e[2]+t)-n(e[0],e[1],e[2]-t)],i=we(r)||1;return[r[0]/i,r[1]/i,r[2]/i]}surface(e,t,n,r=.004){let i=1/0,a=`skin`,o=[];for(let t of this.near(e)){if(t.op!==`add`)continue;let n=t.d(e);o.push([t,n]),n<i&&(i=n,a=t.mat)}let s=0,c=[0,0,0],l=new Map;for(let[n,a]of o){let o=a-i;if(o>.08)continue;let u=Math.exp(-o/Math.max(r*.7,n.k*.35)),d=typeof n.color==`function`?n.color(e,t):n.color;c=[c[0]+d[0]*u,c[1]+d[1]*u,c[2]+d[2]*u],s+=u;let f=Math.exp(-o/Math.max(.012,n.k*.8));l.set(n.bone,(l.get(n.bone)??0)+f)}c=c.map(e=>e/s);for(let n of this.paints){let r=n.inside(e);if(r<n.soft){let i=Te(.5-r/(2*n.soft),0,1),a=typeof n.color==`function`?n.color(e,t):n.color;c=Me(c,a,i)}}let u=[...l.entries()].sort((e,t)=>t[1]-e[1]).slice(0,4),d=u.reduce((e,[,t])=>e+t,0),f=u.map(([e,t])=>[n.indexOf(e)<0?0:n.indexOf(e),t/d]);return{color:c,bones:f,mat:a}}occlusion(e,t,n){let r=0,i=1;for(let a=1;a<=5;a++){let o=n*(.02+a/5*.16),s=this.field([e[0]+t[0]*o,e[1]+t[1]*o,e[2]+t[2]*o]);r+=(o-s)*i,i*=.8}return Te(1-2.2*r/n,0,1)}};function He(e,{cell:t=.012,bones:n=[`root`],ambient:r=.32,shade:i=null}={}){let[a,o]=e.bounds(t*3);e.prepare(a,o,Math.max(t*4*2,.035));let s=Math.ceil((o[0]-a[0])/t),c=Math.ceil((o[1]-a[1])/t),l=Math.ceil((o[2]-a[2])/t),u=s+1,d=c+1,f=(e,t,n)=>e+u*(t+d*n),p=new Float32Array(u*d*(l+1)).fill(NaN),m=(e,n,r)=>[a[0]+e*t,a[1]+n*t,a[2]+r*t],h=Math.ceil(s/4),g=Math.ceil(c/4),_=Math.ceil(l/4),v=new Float32Array((h+1)*(g+1)*(_+1)),y=(e,t,n)=>e+(h+1)*(t+(g+1)*n);for(let t=0;t<=_;t++)for(let n=0;n<=g;n++)for(let r=0;r<=h;r++)v[y(r,n,t)]=e.field(m(r*4,n*4,t*4));let b=t*4*1.9;for(let t=0;t<_;t++)for(let n=0;n<g;n++)for(let r=0;r<h;r++){let i=!1;for(let e=0;e<8&&!i;e++)Math.abs(v[y(r+(e&1),n+(e>>1&1),t+(e>>2&1))])<b&&(i=!0);if(i)for(let i=t*4;i<=Math.min(l,(t+1)*4);i++)for(let t=n*4;t<=Math.min(c,(n+1)*4);t++)for(let n=r*4;n<=Math.min(s,(r+1)*4);n++){let r=f(n,t,i);Number.isNaN(p[r])&&(p[r]=e.field(m(n,t,i)))}}for(let e=0;e<=l;e++)for(let t=0;t<=c;t++)for(let n=0;n<=s;n++){let r=f(n,t,e);if(!Number.isNaN(p[r]))continue;let i=Math.min(h-1e-6,n/4),a=Math.min(g-1e-6,t/4),o=Math.min(_-1e-6,e/4),s=Math.floor(i),c=Math.floor(a),l=Math.floor(o),u=i-s,d=a-c,m=o-l,b=(e,t,n)=>v[y(s+e,c+t,l+n)];p[r]=Ee(Ee(Ee(b(0,0,0),b(1,0,0),u),Ee(b(0,1,0),b(1,1,0),u),d),Ee(Ee(b(0,0,1),b(1,0,1),u),Ee(b(0,1,1),b(1,1,1),u),d),m)}let x=new Int32Array(s*c*l).fill(-1),S=(e,t,n)=>e+s*(t+c*n),C=[],w=[[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]],T=e=>[e&1,e>>1&1,e>>2&1];for(let e=0;e<l;e++)for(let n=0;n<c;n++)for(let r=0;r<s;r++){let i=Array(8),o=0;for(let t=0;t<8;t++){let[a,s,c]=T(t);i[t]=p[f(r+a,n+s,e+c)],i[t]<0&&o++}if(o===0||o===8)continue;let s=0,c=0,l=0,u=0;for(let[e,t]of w){if(i[e]<0==i[t]<0)continue;let n=i[e]/(i[e]-i[t]),r=T(e),a=T(t);s+=r[0]+(a[0]-r[0])*n,c+=r[1]+(a[1]-r[1])*n,l+=r[2]+(a[2]-r[2])*n,u++}x[S(r,n,e)]=C.length,C.push([a[0]+(r+s/u)*t,a[1]+(n+c/u)*t,a[2]+(e+l/u)*t])}let E=[],D=(e,t,n,r,i)=>{if(e<0||t<0||n<0||r<0)return;let a=we(Se(C[e],C[n]))<we(Se(C[t],C[r]))?[[e,t,n],[e,n,r]]:[[e,t,r],[t,n,r]];for(let[e,t,n]of a)E.push(...i?[e,n,t]:[e,t,n])};for(let e=1;e<l;e++)for(let t=1;t<c;t++)for(let n=0;n<s;n++){let r=p[f(n,t,e)],i=p[f(n+1,t,e)];r<0!=i<0&&D(x[S(n,t-1,e-1)],x[S(n,t,e-1)],x[S(n,t,e)],x[S(n,t-1,e)],r>0)}for(let e=1;e<l;e++)for(let t=0;t<c;t++)for(let n=1;n<s;n++){let r=p[f(n,t,e)],i=p[f(n,t+1,e)];r<0!=i<0&&D(x[S(n-1,t,e-1)],x[S(n-1,t,e)],x[S(n,t,e)],x[S(n,t,e-1)],r>0)}for(let e=0;e<l;e++)for(let t=1;t<c;t++)for(let n=1;n<s;n++){let r=p[f(n,t,e)],i=p[f(n,t,e+1)];r<0!=i<0&&D(x[S(n-1,t-1,e)],x[S(n,t-1,e)],x[S(n,t,e)],x[S(n-1,t,e)],r>0)}let O=C.length,k=new Float32Array(O*3),A=new Float32Array(O*3),j=new Float32Array(O*3),M=new Uint8Array(O*4),N=new Float32Array(O*4),P=Array(O),F=t*.5,I=Math.max(o[1]-a[1],.3);for(let a=0;a<O;a++){let o=C[a];for(let n=0;n<2;n++){let n=e.field(o),r=e.gradient(o,F),i=Te(n,-t,t);o=[o[0]-r[0]*i,o[1]-r[1]*i,o[2]-r[2]*i]}let s=e.gradient(o,F),c=e.surface(o,s,n,t),l=e.occlusion(o,s,I*.35),u=c.color.map(e=>e*Ee(r,1,l));i&&(u=i(u,o,s,l)),k.set(o,a*3),A.set(s,a*3),j.set(u,a*3),P[a]=c.mat,c.bones.forEach(([e,t],n)=>{M[a*4+n]=e,N[a*4+n]=t})}return{position:k,normal:A,color:j,index:O>65535?new Uint32Array(E):new Uint16Array(E),skinIndex:M,skinWeight:N,mats:P,count:O,bounds:[a,o]}}var B=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n],Ue=(e,t=0,n=1)=>e<t?t:e>n?n:e,We=(e,t,n)=>{let r=Ue((n-e)/(t-e));return r*r*(3-2*r)},Ge=e=>typeof e==`string`?z(e):e;function Ke({over:e,under:t=e,vary:n=.18,freq:r=9,grain:i=.08,gfreq:a=60,seed:o=0,edge:s=[-.35,.35]}){let c=Ge(e),l=Ge(t);return(e,t)=>{let u=We(s[0],s[1],t[1]),d=B(l,c,u),f=1+(je(e[0]*r+o,e[1]*r,e[2]*r,3)-.5)*2*n,p=1+(ke(e[0]*a,e[1]*a+o,e[2]*a)-.5)*2*i;return d.map(e=>e*f*p)}}function qe({strands:e=.35,sfreq:t=160,flow:n=2,stretch:r=.12,...i}){let a=Ke(i);return(i,o)=>{let s=a(i,o),c=[i[0]*t,i[1]*t,i[2]*t];c[n]*=r;let l=1+(ke(c[0],c[1],c[2])-.5)*2*e;return s.map(e=>e*l)}}function Je(e,t,n,r,i,a=null){let o=Ge(r),s=Ge(i);return(r,i)=>{let c=We(t,n,r[e]),l=B(o,s,c);if(!a)return l;let u=a(r,i);return[l[0]*u[0],l[1]*u[1],l[2]*u[2]]}}function Ye(e,t,n,r,i=.25,a=.2){let o=Ge(n),s=Ge(r);return n=>{let r=(n[e]/t%1+1)%1,c=Math.min(r,1-r);return B(s,o,We(i*.5*(1-a),i*.5*(1+a),c))}}function V(e,t=.12,n=40,r=0){let i=Ge(e);return e=>{let a=1+(je(e[0]*n+r,e[1]*n,e[2]*n,2)-.5)*2*t;return i.map(e=>e*a)}}function Xe(e,t,n,r=.55){return(i,a)=>{let o=typeof e==`function`?e(i,a):Ge(e),s=r+(1-r)*We(t,n,i[1]);return o.map(e=>e*s)}}var Ze=qe({over:`#3b2c34`,under:`#5e4650`,vary:.18,freq:14,grain:.1,edge:[-.5,.4],strands:.35,sfreq:200}),Qe=z(`#7a6470`),$e={height:0,id:0,edge:0},et=(e,t)=>{let n=Ze(e,t),r=Ae(e,.016,2,2.6,$e);return B(n.map(e=>e*(.75+.4*r.height)),Qe,Math.max(0,r.height-.65)*.4)},tt=Ke({over:`#4a3038`,under:`#6a4a50`,vary:.12,freq:20,grain:.05}),nt=e=>{let t=V(`#3a2026`,.1,40)(e),n=Math.abs(Math.sin(Math.atan2(e[2]+.02,Math.abs(e[0]))*9));return t.map(e=>e*(.85+.25*n))},rt=e=>e>0?`L`:`R`;function it(e){return{sh:[e*.045,.02,0],el:[e*.17,.045,-.01],wr:[e*.27,.03,.02],tips:[[e*.45,.02,.06],[e*.44,-.01,-.07],[e*.36,-.03,-.16],[e*.22,-.03,-.17]]}}var at={name:`bat`,cell:.0055,cells:{eyes:.0018,fangs:.0016,wings:.0038,ears:.0028},bones:[[`root`,null,[0,0,0]],[`body`,`root`,[0,0,0]],[`head`,`body`,[0,.03,.05]],...[1,-1].flatMap(e=>{let t=it(e),n=rt(e);return[[`arm${n}`,`body`,t.sh],[`fore${n}`,`arm${n}`,t.el],[`hand${n}`,`fore${n}`,t.wr],[`ear${n}`,`head`,[e*.03,.08,.05]],[`leg${n}`,`body`,[e*.03,-.04,-.05]]]})],materials:{fur:{roughness:.85,sheen:1,sheenColor:`#a08090`,sheenRoughness:.45},skin:{roughness:.55,sheen:.5,sheenColor:`#c08088`,sheenRoughness:.5},wing:{roughness:.6,sheen:.8,sheenColor:`#d06070`,sheenRoughness:.5,side:`double`},eye:{roughness:.08,clearcoat:1,emissive:`#ff2010`,emissiveIntensity:1.2},fang:{roughness:.3,clearcoat:.6}},sculpt(e){let t={color:et,mat:`fur`};e.ellipsoid([0,0,-.01],[.055,.06,.075],{...t,bone:`body`,k:.02,locks:[.016,.003,2,2.6]}),e.ellipsoid([0,.035,.05],[.05,.047,.045],{...t,bone:`head`,k:.025}),e.ellipsoid([0,.022,.088],[.026,.02,.016],{color:tt,mat:`skin`,bone:`head`,k:.015}),e.ellipsoid([0,.035,.1],[.01,.013,.006],{color:tt,mat:`skin`,bone:`head`,k:.006});for(let t of[1,-1])e.sphere([t*.007,.028,.104],.004,{op:`sub`,k:.003});e.paint(e=>Math.max(Math.abs(e[1]-.008+Math.abs(e[0])*.3)-.003,Math.abs(e[0])-.02,.08-e[2]),`#1a0c10`,.002),e.part(`fangs`,()=>{for(let t of[1,-1])e.limb([t*.011,.01,.094],[t*.01,-.006,.095],.0035,8e-4,{color:`#f0e6d0`,mat:`fang`,bone:`head`,k:.001})});for(let t of[1,-1]){let n=[t*.025,.048,.083];e.part(`eyes`,()=>e.sphere(n,.0095,{color:`#ff3a20`,mat:`eye`,bone:`head`,k:0})),e.part(`eyes`,()=>e.ellipsoid([n[0],n[1],n[2]+.007],[.003,.006,.003],{color:`#0a0204`,mat:`eye`,bone:`head`,k:0}))}e.part(`ears`,()=>{for(let t of[1,-1]){let n=rt(t);e.flake([t*.028,.06,.045],[t*.06,.15,.04],[0,.1,1],.026,.004,.3,{color:tt,mat:`skin`,bone:`ear${n}`,k:.004}),e.flake([t*.03,.065,.051],[t*.057,.135,.047],[0,.1,1],.017,.003,.25,{op:`sub`,k:.003})}});for(let t of[1,-1]){let n=rt(t);e.limb([t*.03,-.04,-.05],[t*.035,-.06,-.09],.01,.006,{color:tt,mat:`skin`,bone:`leg${n}`,k:.008})}e.part(`wings`,()=>{for(let t of[1,-1]){let n=rt(t),r=it(t);e.limb(r.sh,r.el,.012,.008,{color:tt,mat:`skin`,bone:`arm${n}`,k:.006}),e.limb(r.el,r.wr,.008,.006,{color:tt,mat:`skin`,bone:`fore${n}`,k:.005}),e.limb(r.wr,[r.wr[0]+t*.01,r.wr[1]+.03,r.wr[2]+.02],.005,.002,{color:`#1c1014`,mat:`fang`,bone:`hand${n}`,k:.002});let i=[r.wr,...r.tips];for(let t of r.tips)e.limb(r.wr,t,.005,.0025,{color:tt,mat:`skin`,bone:`hand${n}`,k:.004});let a=(t,n,r,i)=>e.panel(t,n,r,.012,{color:nt,mat:`wing`,bone:i,k:.004});for(let e=1;e<i.length-1;e++)a(i[0],i[e],i[e+1],`hand${n}`);a(r.wr,r.tips[3],[t*.04,-.02,-.07],`fore${n}`),a(r.wr,[t*.04,-.02,-.07],r.sh,`fore${n}`),a(r.sh,r.el,r.wr,`arm${n}`)}})},animate(e,{clip:t=`idle`,t:n=0,time:r=0,seed:i=0,speed:a=1}){let o=r+i,s=e=>e<=0?0:e>=1?1:e*e*(3-2*e),c=14,l=1,u=0;t===`walk`&&(c=17*Math.max(.6,a),l=1.1),t===`hit`&&(c=26,l=.6),t===`ko`&&(u=s(n/.4),l=1-u);let d=Math.sin(o*c);for(let t of[1,-1]){let n=t>0?`L`:`R`;e.turn(`arm${n}`,0,t*.15*d*l,t*(.55*d*l-.15+u*1.1)),e.turn(`fore${n}`,0,t*-.25*u,t*(.25*d*l+u*1.4)),e.turn(`hand${n}`,0,t*.12*Math.sin(o*c-.8)*l,t*(.2*Math.sin(o*c-.8)*l+u*.9)),e.turn(`ear${n}`,.1*Math.sin(o*3+t),0,t*-.1*Math.sin(o*2.3)),e.turn(`leg${n}`,.3*Math.sin(o*c+1)*l,0,0)}if(e.move(`body`,0,-d*.012*l,0),e.turn(`head`,Math.sin(o*1.7)*.1,Math.sin(o*.9)*.3,0),t===`attack`){let t=s(n/.2),r=s((n-.2)/.12),i=s((n-.4)/.3),a=t*(1-r),o=r*(1-i);e.move(`root`,0,.08*a-.06*o,-.04*a+.16*o),e.turn(`body`,-.4*a+.6*o,0,0),e.turn(`head`,.3*o,0,0)}else if(t===`hit`){let t=Math.sin(Math.min(1,n/.4)*Math.PI);e.move(`root`,0,.02*t,-.08*t),e.turn(`body`,-.5*t,0,Math.sin(n*30)*.4*t)}else t===`ko`&&(e.move(`root`,0,-.2*u,0),e.turn(`body`,u*2.2,0,u*.6))}},ot=e=>e>0?`L`:`R`,st=(e,t,n)=>e.map((e,r)=>e+(t[r]-e)*n),ct=z(`#7a140c`),lt=z(`#260605`),ut=z(`#c88a50`),dt=z(`#6a3418`),ft={height:0,id:0,edge:0},pt=(e,t)=>{let n=Ae(e,.05,2,1.25,ft),r=B(ct,lt,Math.max(0,Math.min(1,(t[1]-.2)*1.4)));r=r.map(e=>e*(.6+.55*n.height+(n.id-.5)*.25));let i=Math.max(0,Math.min(1,(-t[1]-.45)*3))*+(e[1]>.25&&e[1]<.75);if(i>0){let t=Math.abs((e[2]*14%1+1)%1-.5)<.08?dt:ut;r=B(r,t,i)}return r},mt=Je(0,0,1,`#e8dcbc`,`#e8dcbc`,e=>{let t=Math.min(1,Math.hypot(e[0],e[1]-1.24,e[2]-.92)/.45);return B(z(`#efe2c0`),z(`#1a120c`),t**1.6)}),ht=V(`#1c1612`,.15,60),gt=V(`#f0e6cc`,.08,80),_t=e=>V(`#5a120e`,.12,20)(e),vt=[[0,.82,.42],[0,1,.6],[0,1.14,.74],[0,1.2,.9]],yt=[[0,.64,-.5],[0,.52,-.82],[.04,.38,-1.08],[.13,.25,-1.3],[.26,.17,-1.48],[.4,.13,-1.6]],bt=e=>({shoulder:[e*.22,.66,.32],elbow:[e*.28,.36,.36],wrist:[e*.26,.1,.44],fore:[e*.26,.05,.52],hip:[e*.24,.64,-.38],knee:[e*.31,.4,-.24],hock:[e*.3,.16,-.48],hind:[e*.29,.05,-.38]}),xt=e=>({root:[e*.17,.92,.18],elbow:[e*.42,1.22,-.02],wrist:[e*.5,1.02,-.42],tips:[[e*.72,1.12,-.82],[e*.6,.86,-.98],[e*.45,.72,-.9],[e*.32,.66,-.72]]}),St={name:`dragon`,cell:.0175,budget:2e4,cells:{eyes:.004,irises:.003,pupils:.0025,teeth:.0045,horns:.008,claws:.007,spikes:.009,wings:.0095},ambient:.35,bones:[[`root`,null,[0,0,0]],[`body`,`root`,[0,.62,-.05]],[`chest`,`body`,[0,.66,.25]],[`neck1`,`chest`,vt[0]],[`neck2`,`neck1`,vt[1]],[`neck3`,`neck2`,vt[2]],[`head`,`neck3`,vt[3]],[`jaw`,`head`,[0,1.11,.98]],[`tail1`,`body`,yt[0]],[`tail2`,`tail1`,yt[1]],[`tail3`,`tail2`,yt[2]],[`tail4`,`tail3`,yt[3]],[`tail5`,`tail4`,yt[4]],...[1,-1].flatMap(e=>{let t=ot(e),n=bt(e),r=xt(e);return[[`fl1${t}`,`chest`,n.shoulder],[`fl2${t}`,`fl1${t}`,n.elbow],[`fl3${t}`,`fl2${t}`,n.wrist],[`hl1${t}`,`body`,n.hip],[`hl2${t}`,`hl1${t}`,n.knee],[`hl3${t}`,`hl2${t}`,n.hock],[`wa${t}`,`chest`,r.root],[`wb${t}`,`wa${t}`,r.elbow],[`wc${t}`,`wb${t}`,r.wrist]]})],materials:{hide:{roughness:.45,clearcoat:.35,clearcoatRoughness:.4,sheen:.3,sheenColor:`#ff6040`},belly:{roughness:.5,emissive:`#ff4a10`,emissiveIntensity:.08},horn:{roughness:.4,clearcoat:.4},claw:{roughness:.3,clearcoat:.6},tooth:{roughness:.3,clearcoat:.5},wing:{roughness:.6,sheen:.8,sheenColor:`#ff5030`,sheenRoughness:.5,side:`double`},eye:{roughness:.1,clearcoat:1,emissive:`#ff6a00`,emissiveIntensity:.6},iris:{roughness:.1,clearcoat:1,emissive:`#ffb020`,emissiveIntensity:2.2},pupil:{roughness:.05,clearcoat:1}},sculpt(e){let t={color:pt,mat:`hide`,locks:[.05,.008,2,1.25]};e.ellipsoid([0,.66,.22],[.3,.3,.32],{...t,bone:`chest`,k:.06}),e.ellipsoid([0,.62,-.12],[.28,.27,.42],{...t,bone:`body`,k:.08}),e.ellipsoid([0,.5,.05],[.24,.16,.42],{color:pt,mat:`belly`,bone:`body`,k:.08}),e.chain(vt,[.2,.16,.13,.11],{...t,bones:[`neck1`,`neck2`,`neck3`],k:.05});let n={...t,locks:[.03,.004,2,1.25],bone:`head`};e.ellipsoid([0,1.2,.95],[.12,.1,.14],{...n,k:.04}),e.limb([0,1.19,1],[0,1.15,1.3],.095,.058,{...n,k:.04});for(let t of[1,-1])e.limb([t*.08,1.26,.98],[t*.06,1.24,1.1],.032,.02,{...n,k:.03}),e.ellipsoid([t*.11,1.15,.96],[.05,.05,.07],{...n,k:.03}),e.sphere([t*.025,1.18,1.34],.016,{op:`sub`,k:.01});e.limb([0,1.1,.96],[0,1.08,1.26],.075,.042,{...t,locks:null,bone:`jaw`,k:.04}),e.box([0,1.13,1.18],[.09,.008,.13],.004,{op:`sub`,k:.012,rot:[-.08,0,0]}),e.paint(e=>e[2]<1.05?1:Math.abs(e[1]-1.132+(e[2]-1.18)*.08)-.012,`#2a0604`,.006),e.part(`teeth`,()=>{for(let t of[1,-1])for(let n=0;n<6;n++){let r=1.08+n*.04,i=t*(.055-n*.005);e.limb([i,1.145,r],[i,1.115,r+.004],.008,.0015,{color:gt,mat:`tooth`,bone:`head`,k:.002}),e.limb([i*.9,1.11,r-.01],[i*.9,1.135,r-.006],.007,.0015,{color:gt,mat:`tooth`,bone:`jaw`,k:.002})}});for(let t of[1,-1]){let n=[t*.085,1.225,1.06],r=[t*.7,.15,.7],i=Math.hypot(...r),a=r.map(e=>e/i),o=e=>n.map((t,n)=>t+a[n]*e),s=[-Math.asin(a[1]),Math.atan2(a[0],a[2]),0];e.ellipsoid(n,[.03,.022,.03],{op:`sub`,k:.008}),e.part(`eyes`,()=>e.sphere(n,.027,{color:`#3a0800`,mat:`eye`,bone:`head`,k:0})),e.part(`irises`,()=>e.ellipsoid(o(.019),[.017,.014,.007],{color:`#ffc040`,mat:`iris`,bone:`head`,k:0,rot:s})),e.part(`pupils`,()=>e.ellipsoid(o(.026),[.0035,.013,.003],{color:`#050100`,mat:`pupil`,bone:`head`,k:0,rot:s}))}e.part(`horns`,()=>{for(let t of[1,-1]){e.chain([[t*.07,1.28,.94],[t*.13,1.37,.8],[t*.16,1.4,.62],[t*.13,1.35,.47],[t*.09,1.27,.42]],[.04,.03,.021,.012,.004],{color:mt,mat:`horn`,bone:`head`,k:.012});for(let n=0;n<3;n++)e.limb([t*.13,1.18-n*.03,.92-n*.05],[t*.21,1.2-n*.04,.84-n*.06],.015,.002,{color:mt,mat:`horn`,bone:`head`,k:.006})}});for(let n of[1,-1]){let r=ot(n),i=bt(n);e.ellipsoid(st(i.shoulder,i.elbow,.35),[.1,.16,.11],{...t,bone:`fl1${r}`,k:.05}),e.limb(i.elbow,i.wrist,.08,.06,{...t,bone:`fl2${r}`,k:.03}),e.ellipsoid(i.fore,[.075,.05,.1],{...t,bone:`fl3${r}`,k:.03}),e.ellipsoid(st(i.hip,i.knee,.4),[.13,.2,.17],{...t,bone:`hl1${r}`,k:.06}),e.limb(i.knee,i.hock,.09,.06,{...t,bone:`hl2${r}`,k:.03}),e.limb(i.hock,i.hind,.06,.07,{...t,bone:`hl3${r}`,k:.03}),e.ellipsoid([i.hind[0],.045,i.hind[2]+.06],[.08,.045,.11],{...t,bone:`hl3${r}`,k:.03}),e.part(`claws`,()=>{for(let[t,n]of[[i.fore,`fl3${r}`],[[i.hind[0],.045,i.hind[2]+.06],`hl3${r}`]])for(let r of[-1,0,1]){let i=[t[0]+r*.04,.04,t[2]+.08];e.limb(i,[i[0]+r*.01,.008,i[2]+.06],.017,.002,{color:ht,mat:`claw`,bone:n,k:.004})}})}e.chain(yt,[.2,.15,.11,.075,.05,.03],{...t,bones:[`tail1`,`tail2`,`tail3`,`tail4`,`tail5`],k:.05}),e.flake([.38,.135,-1.58],[.5,.11,-1.72],[0,1,0],.07,.01,.25,{...t,locks:null,bone:`tail5`,k:.02}),e.part(`spikes`,()=>{let t=[[0,1.33,.86],...vt.slice().reverse().map(e=>[e[0],e[1]+.12,e[2]-.02]),[0,.95,.15],[0,.92,-.15],[0,.88,-.45],...yt.slice(1).map((e,t)=>[e[0],e[1]+.13-t*.022,e[2]])],n=e=>e>.85?`head`:e>.66?`neck3`:e>.5?`neck2`:e>.3?`neck1`:e>-.3?`body`:e>-.7?`tail1`:e>-1?`tail2`:e>-1.2?`tail3`:e>-1.4?`tail4`:`tail5`;for(let r=0;r<t.length-1;r++)for(let i of[0,.5]){let a=st(t[r],t[r+1],i),o=.07*Math.max(.35,1-Math.abs(a[2]-.2)*.45);e.flake([a[0],a[1]-o*.6,a[2]+o*.3],[a[0],a[1]+o,a[2]-o*.6],[1,0,0],o*.55,o*.06,.35,{color:mt,mat:`horn`,bone:n(a[2]),k:.01})}}),e.part(`wings`,()=>{for(let t of[1,-1]){let n=ot(t),r=xt(t);e.limb(r.root,r.elbow,.05,.035,{color:pt,mat:`hide`,bone:`wa${n}`,k:.02}),e.limb(r.elbow,r.wrist,.035,.028,{color:pt,mat:`hide`,bone:`wb${n}`,k:.015}),e.limb(r.wrist,[r.wrist[0]+t*.04,r.wrist[1]+.1,r.wrist[2]+.05],.022,.003,{color:ht,mat:`claw`,bone:`wc${n}`,k:.006});for(let t of r.tips)e.limb(r.wrist,t,.02,.006,{color:pt,mat:`hide`,bone:`wc${n}`,k:.01});let i=(t,n,r,i)=>e.panel(t,n,r,.03,{color:_t,mat:`wing`,bone:i,k:.008}),a=[r.wrist,...r.tips];for(let e=1;e<a.length-1;e++)i(a[0],a[e],a[e+1],`wc${n}`);let o=[t*.2,.8,-.4];i(r.wrist,r.tips[3],o,`wb${n}`),i(r.wrist,o,r.root,`wb${n}`),i(r.root,r.elbow,r.wrist,`wa${n}`)}})},animate(e,{clip:t=`idle`,t:n=0,time:r=0,seed:i=0,speed:a=1}){let o=r+i,s=e=>e<=0?0:e>=1?1:e*e*(3-2*e),c=Math.sin(o*1.4);e.scale(`chest`,1+c*.025,1+c*.03,1+c*.015);for(let t=1;t<=3;t++)e.turn(`neck${t}`,Math.sin(o*.8-t*.5)*.04,Math.sin(o*.5-t*.6)*.08,0);e.turn(`head`,Math.sin(o*.9)*.05,Math.sin(o*.6)*.15,0);for(let t=1;t<=5;t++)e.turn(`tail${t}`,Math.sin(o*1.1-t*.7)*.03,Math.sin(o*.9-t*.8)*.16,0);for(let t of[1,-1])e.turn(`wa${ot(t)}`,0,0,t*Math.max(0,Math.sin(o*.4))*.08);if(e.turn(`jaw`,Math.max(0,Math.sin(o*.35)-.8)*1.2,0,0),t===`walk`){let t=o*4.5*Math.max(.5,a),n=Math.sin(t),r=Math.sin(t+Math.PI);e.move(`body`,0,Math.abs(Math.cos(t))*.03-.015,0),e.turn(`body`,0,n*.04,n*.03);for(let[t,i]of[[1,n],[-1,r]]){let n=ot(t);e.turn(`fl1${n}`,-i*.35,0,0),e.turn(`fl2${n}`,Math.max(0,i)*.4,0,0),e.turn(`hl1${n}`,i*.35,0,0),e.turn(`hl2${n}`,-Math.max(0,-i)*.35,0,0)}e.turn(`neck1`,n*.05,0,0)}else if(t===`attack`){let t=s(n/.3),r=s((n-.3)/.14),i=s((n-.55)/.3),a=t*(1-r),o=r*(1-i),c=Math.max(a,o*.8);e.turn(`body`,-.35*a+.12*o,0,0),e.move(`body`,0,.08*a,.18*o),e.turn(`neck1`,-.3*a+.4*o,0,0),e.turn(`neck2`,-.2*a+.25*o,0,0),e.turn(`head`,.3*a-.2*o,0,0),e.turn(`jaw`,.15*a+.6*o,0,0);for(let t of[1,-1]){let n=ot(t);e.turn(`wa${n}`,.1*c,t*-1.1*c,t*.5*c),e.turn(`wb${n}`,0,t*-.45*c,t*.15*c),e.turn(`wc${n}`,0,t*-.35*c,t*.2*c),e.turn(`fl1${n}`,-.6*a,0,0),e.turn(`fl2${n}`,.6*a,0,0)}}else if(t===`hit`){let t=Math.sin(Math.min(1,n/.4)*Math.PI);e.turn(`body`,-.12*t,0,Math.sin(n*25)*.04*t),e.move(`body`,0,0,-.1*t),e.turn(`neck1`,-.35*t,.2*t,0),e.turn(`head`,-.3*t,0,0),e.turn(`jaw`,.5*t,0,0)}else if(t===`ko`){let t=s(n/.6);e.turn(`root`,0,0,t*1.35),e.move(`root`,.55*t,.22*t,0),e.turn(`neck1`,.3*t,0,-.4*t),e.turn(`neck2`,.3*t,0,-.3*t),e.turn(`head`,.2*t,0,-.3*t),e.turn(`jaw`,.3*t,0,0);for(let n of[1,-1])e.turn(`fl1${ot(n)}`,-.3*t,0,n*.4*t)}}},Ct=e=>e>0?`L`:`R`,wt=e=>{let t=Math.hypot(...e);return e.map(e=>e/t)},Tt=(e,t,n=1)=>e.map((e,r)=>e+t[r]*n),Et=Ke({over:`#4f6a26`,under:`#a2ab55`,vary:.16,freq:10,grain:.05,gfreq:90,edge:[-.55,.6]}),Dt=(e,t)=>{let n=Et(e,t),r=1-Math.max(0,Math.min(1,(e[1]-.47)/.12))*.25;return n.map(e=>e*r)},Ot=Ke({over:`#5b3b22`,under:`#3a2414`,vary:.22,freq:16,grain:.1,gfreq:70}),kt=Ke({over:`#3c2617`,under:`#24160d`,vary:.18,freq:14,grain:.08}),At=Ke({over:`#7d5735`,under:`#4e3320`,vary:.2,freq:18,grain:.1}),jt=Ke({over:`#8a7a5c`,under:`#5b4d38`,vary:.25,freq:20,grain:.12,gfreq:120}),Mt=Je(1,0,1,`#2c241c`,`#2c241c`),Nt=V(`#8a8e94`,.25,30),Pt=V(`#dccf98`,.08,80),Ft={name:`goblin`,scale:1,cell:.0074,cells:{eyes:.0022,irises:.0013,pupils:.001,teeth:.0018,ears:.0032,claws:.0022,hands:.0042,gear:.0035,blade:.0022,cloth:.0045},bones:[[`root`,null,[0,0,0]],[`hips`,`root`,[0,.21,-.01]],[`chest`,`hips`,[0,.29,0]],[`head`,`chest`,[0,.41,.06]],[`jaw`,`head`,[0,.45,.1]],[`earL`,`head`,[.075,.505,.07]],[`earR`,`head`,[-.075,.505,.07]],[`shL`,`chest`,[.08,.37,.035]],[`elL`,`shL`,[.118,.285,.02]],[`haL`,`elL`,[.13,.205,.065]],[`shR`,`chest`,[-.08,.37,.035]],[`elR`,`shR`,[-.118,.285,.02]],[`haR`,`elR`,[-.13,.205,.065]],[`thL`,`hips`,[.055,.2,-.01]],[`knL`,`thL`,[.075,.12,.055]],[`ftL`,`knL`,[.07,.04,-.005]],[`thR`,`hips`,[-.055,.2,-.01]],[`knR`,`thR`,[-.075,.12,.055]],[`ftR`,`knR`,[-.07,.04,-.005]]],materials:{skin:{roughness:.52,clearcoat:.18,clearcoatRoughness:.5,sheen:.25,sheenColor:`#b8c890`,sheenRoughness:.6},leather:{roughness:.72,sheen:.3,sheenColor:`#8a6a4a`,sheenRoughness:.5},cloth:{roughness:.9,sheen:.5,sheenColor:`#b0a080`,sheenRoughness:.7},metal:{metalness:.75,roughness:.42},claw:{roughness:.35,clearcoat:.5,clearcoatRoughness:.3},tooth:{roughness:.32,clearcoat:.6},mouth:{roughness:.4,clearcoat:.8},eye:{roughness:.1,clearcoat:1,clearcoatRoughness:.03,emissive:`#ffb000`,emissiveIntensity:.12},iris:{roughness:.15,clearcoat:1,clearcoatRoughness:.03,emissive:`#ffc21a`,emissiveIntensity:1.1},pupil:{roughness:.05,clearcoat:1,clearcoatRoughness:.02}},sculpt(e){let t={color:Dt,mat:`skin`},n={color:Ot,mat:`leather`};e.ellipsoid([0,.215,-.01],[.068,.05,.058],{...t,bone:`hips`,k:.03}),e.ellipsoid([0,.27,.02],[.068,.068,.064],{...n,bone:`hips`,k:.04}),e.ellipsoid([0,.335,.025],[.078,.06,.06],{...n,bone:`chest`,k:.04,rot:[.45,0,0]}),e.ellipsoid([0,.35,-.02],[.066,.06,.052],{...n,bone:`chest`,k:.04,rot:[.3,0,0]}),e.limb([0,.36,.035],[0,.425,.085],.034,.03,{...t,bone:`head`,k:.03}),e.ellipsoid([0,.5,.085],[.088,.078,.084],{...t,bone:`head`,k:.03}),e.ellipsoid([0,.535,.06],[.072,.05,.07],{...t,bone:`head`,k:.04}),e.mirror(n=>e.ellipsoid([n*.052,.462,.13],[.04,.034,.04],{...t,bone:`head`,k:.035})),e.mirror(n=>e.ellipsoid([n*.036,.528,.152],[.04,.014,.024],{...t,bone:`head`,k:.025,rot:[.1,0,n*-.32]})),e.ellipsoid([0,.448,.15],[.058,.03,.045],{...t,bone:`head`,k:.03}),e.chain([[0,.515,.162],[0,.5,.2],[0,.475,.232],[0,.448,.24]],[.016,.018,.015,.009],{...t,bone:`head`,k:.015}),e.mirror(n=>e.ellipsoid([n*.014,.468,.212],[.013,.011,.014],{...t,bone:`head`,k:.012})),e.ellipsoid([0,.425,.12],[.06,.028,.052],{...t,bone:`jaw`,k:.03}),e.ellipsoid([0,.418,.155],[.032,.022,.022],{...t,bone:`jaw`,k:.02}),e.ellipsoid([0,.437,.165],[.054,.0055,.03],{op:`sub`,k:.006,rot:[.05,0,0]}),e.paint(e=>Math.hypot(e[0]/1.6,(e[1]-.437)*1.5,Math.max(0,.15-e[2]))-.03,`#2a0a08`,.004),e.mirror(t=>e.sphere([t*.04,.503,.158],.02,{op:`sub`,k:.01})),e.mirror(n=>e.limb([n*.07,.505,.07],[n*.1,.505,.06],.022,.016,{...t,bone:`ear${Ct(n)}`,k:.02})),e.mirror(n=>{let r=Ct(n);e.sphere([n*.075,.368,.03],.03,{...t,bone:`sh${r}`,k:.03}),e.limb([n*.08,.365,.035],[n*.118,.285,.02],.022,.016,{...t,bone:`sh${r}`,k:.02}),e.sphere([n*.119,.283,.015],.017,{...t,bone:`el${r}`,k:.012}),e.limb([n*.118,.285,.02],[n*.13,.21,.062],.016,.014,{...t,bone:`el${r}`,k:.015})}),e.mirror(n=>{let r=Ct(n);e.limb([n*.055,.205,-.01],[n*.075,.12,.055],.03,.02,{...t,bone:`th${r}`,k:.025}),e.sphere([n*.076,.122,.064],.022,{...t,bone:`kn${r}`,k:.012}),e.limb([n*.075,.12,.055],[n*.07,.04,-.005],.019,.013,{...t,bone:`kn${r}`,k:.015}),e.ellipsoid([n*.072,.02,.025],[.026,.017,.05],{...t,bone:`ft${r}`,k:.02,rot:[.05,n*.12,0]}),e.sphere([n*.069,.022,-.016],.016,{...t,bone:`ft${r}`,k:.015});for(let i of[-1,0,1]){let a=n*.072+i*.015+n*.008;e.limb([a,.016,.06],[a+i*.008+n*.006,.01,.092],.0095,.0075,{...t,bone:`ft${r}`,k:.008})}}),e.part(`hands`,()=>e.mirror(n=>{let r=`ha${Ct(n)}`;e.limb([n*.128,.225,.054],[n*.13,.205,.064],.016,.016,{...t,bone:`el${Ct(n)}`,k:.01}),e.ellipsoid([n*.133,.183,.075],[.02,.027,.024],{...t,bone:r,k:.012,rot:[.3,0,n*.15]});for(let i of[-1,0,1]){let a=[n*(.133+i*.002),.165,.078+i*.012],o=[n*(.14+i*.002),.142,.083+i*.016],s=[n*(.137+i*.001),.128,.094+i*.017];e.chain([a,o,s],[.0072,.006,.005],{...t,bone:r,k:.006})}e.chain([[n*.125,.185,.09],[n*.122,.17,.106],[n*.123,.158,.112]],[.0075,.0062,.005],{...t,bone:r,k:.006})})),e.part(`gear`,()=>e.mirror(t=>{e.torus([t*.129,.214,.06],.0155,.0055,{color:jt,mat:`cloth`,bone:`ha${Ct(t)}`,k:.004,rot:[.5,0,t*-.15]}),e.torus([t*.128,.225,.055],.016,.005,{color:jt,mat:`cloth`,bone:`el${Ct(t)}`,k:.004,rot:[.5,0,t*-.15]})})),e.mirror(t=>{let n=[t*.04,.503,.157],r=wt([t*.42,.06,.9]),i=e=>Tt(n,r,e),a=[-Math.asin(r[1]),Math.atan2(r[0],r[2]),0];e.part(`eyes`,()=>e.sphere(n,.0185,{color:`#3a2a04`,mat:`eye`,bone:`head`,k:0})),e.part(`irises`,()=>e.ellipsoid(i(.0155),[.0125,.0125,.0045],{color:`#ffd23a`,mat:`iris`,bone:`head`,k:0,rot:a})),e.part(`pupils`,()=>e.ellipsoid(i(.0193),[.0024,.0092,.0018],{color:`#050302`,mat:`pupil`,bone:`head`,k:0,rot:a}))}),e.part(`ears`,()=>e.mirror(n=>{let r=`ear${Ct(n)}`,i=wt([n*-.15,.35,1]),a=[n*.085,.505,.066],o=[n*.16,.508,.045],s=[n*.245,.475,.012];e.flake(a,o,i,.036,.03,.26,{...t,bone:r,k:.012}),e.flake(o,s,i,.03,.003,.26,{...t,bone:r,k:.012});let c=i.map(e=>e*.007);e.flake(Tt(a,c),Tt(o,c),i,.026,.021,.18,{op:`sub`,k:.006}),e.flake(Tt(o,c),Tt(s,c,.6),i,.021,.002,.18,{op:`sub`,k:.006})})),e.paint(e=>Math.abs(e[0])<.09?1:Math.abs(e[1]-.5+(Math.abs(e[0])-.09)*.2)-.018,`#a86e56`,.012),e.part(`teeth`,()=>{let t=(t,n,r,i)=>e.limb(t,Tt(t,n),r,r*.25,{color:Pt,mat:`tooth`,bone:i,k:.002});t([.03,.432,.163],[.003,.02,.003],.0055,`jaw`),t([-.022,.432,.166],[-.002,.016,.004],.0048,`jaw`),t([.008,.44,.17],[.001,-.012,.002],.004,`head`),t([-.038,.44,.158],[-.002,-.011,.003],.0038,`head`)}),e.part(`claws`,()=>e.mirror(t=>{let n=Ct(t);for(let r of[-1,0,1]){let i=t*.072+r*.015+t*.008+r*.008+t*.006;e.limb([i,.011,.093],[i+r*.003,.004,.108],.0055,.0012,{color:Mt,mat:`claw`,bone:`ft${n}`,k:.002});let a=[t*(.137+r*.001),.128,.094+r*.017];e.limb(a,Tt(a,[0,-.008,.012]),.0042,.001,{color:Mt,mat:`claw`,bone:`ha${n}`,k:.002})}})),e.part(`gear`,()=>{e.ellipsoid([0,.235,0],[.08,.05,.07],{color:kt,mat:`leather`,bone:`hips`,k:.004}),e.ellipsoid([0,.235,0],[.074,.06,.064],{op:`sub`,k:.004}),e.box([0,.236,0],[.12,.012,.12],.004,{op:`inter`,k:.004}),e.box([0,.236,.072],[.014,.014,.004],.003,{color:Nt,mat:`metal`,bone:`hips`,k:.002}),e.ellipsoid([.07,.21,.035],[.022,.026,.016],{color:At,mat:`leather`,bone:`hips`,k:.006,rot:[0,.9,0]}),e.ellipsoid([.072,.228,.036],[.024,.008,.018],{color:At,mat:`leather`,bone:`hips`,k:.004,rot:[0,.9,.1]})}),e.part(`cloth`,()=>{for(let t=0;t<14;t++){let n=t/14*Math.PI*2+.2,r=.045+t*37%11*.004,i=Math.sin(n),a=Math.cos(n),o=[i*.072,.225,a*.062-.005],s=[i*.082,.225-r,a*.072-.005],c=a>.4?i>0?`thL`:`thR`:`hips`;e.flake(o,s,[i,0,a],.017,.009,.25,{color:Ot,mat:`leather`,bone:c,k:.008})}}),e.part(`gear`,()=>{e.limb([-.133,.183,.045],[-.133,.183,.108],.0065,.0065,{color:kt,mat:`leather`,bone:`haR`,k:.002}),e.sphere([-.133,.183,.043],.009,{color:Nt,mat:`metal`,bone:`haR`,k:.002}),e.box([-.133,.183,.11],[.006,.02,.005],.003,{color:Nt,mat:`metal`,bone:`haR`,k:.002})}),e.part(`blade`,()=>{let t=[1,0,0],n=[[-.133,.183,.112],[-.133,.188,.15],[-.133,.2,.185],[-.133,.222,.21]];e.flake(n[0],n[1],t,.0125,.0125,.16,{color:Nt,mat:`metal`,bone:`haR`,k:.006}),e.flake(n[1],n[2],t,.0125,.0095,.16,{color:Nt,mat:`metal`,bone:`haR`,k:.006}),e.flake(n[2],n[3],t,.0095,.0015,.16,{color:Nt,mat:`metal`,bone:`haR`,k:.006})})},animate(e,{clip:t=`idle`,t:n=0,time:r=0,seed:i=0,speed:a=1}){let o=r+i,s=(e,t,n=0)=>e*Math.sin(o*t+n),c=e=>e<=0?0:e>=1?1:e*e*(3-2*e),l=(e,t)=>c((n-e)/(t-e));e.scale(`chest`,1+s(.015,3.4),1+s(.02,3.4),1+s(.015,3.4));let u=Math.max(0,Math.sin(o*1.9)*Math.sin(o*6.1)-.6)*2.5;if(e.turn(`earL`,s(.06,2.3),u*.4,s(.08,1.7)-.05),e.turn(`earR`,s(.06,2.1,1),-u*.25,s(.08,1.5,2)+.05),e.turn(`thL`,-.25,0,.05),e.turn(`knL`,.4,0,0),e.turn(`ftL`,-.15,0,0),e.turn(`thR`,-.25,0,-.05),e.turn(`knR`,.4,0,0),e.turn(`ftR`,-.15,0,0),e.move(`hips`,0,-.012,0),e.turn(`chest`,.12,0,0),e.turn(`shR`,-.35,0,-.1),e.turn(`elR`,-.6,0,0),e.turn(`shL`,-.1,0,.15),e.turn(`elL`,-.4,0,0),t===`idle`){let t=Math.sin(o*.8)>.3?.5:Math.sin(o*.8)<-.3?-.5:0;e.turn(`head`,s(.06,1.3),t+s(.06,3),s(.05,.9)),e.move(`hips`,0,s(.006,4),0),e.turn(`haR`,s(.3,2.2),0,0),e.turn(`jaw`,Math.max(0,s(.15,.7)),0,0)}else if(t===`walk`){let t=o*13*Math.max(.5,a),n=Math.sin(t);e.move(`hips`,0,Math.abs(Math.cos(t))*.02-.005,0),e.turn(`hips`,0,n*.15,n*.04),e.turn(`chest`,.15,-n*.2,0),e.turn(`thL`,-n*.65,0,0),e.turn(`knL`,Math.max(0,n)*.8,0,0),e.turn(`thR`,n*.65,0,0),e.turn(`knR`,Math.max(0,-n)*.8,0,0),e.turn(`shL`,n*.6,0,0),e.turn(`shR`,-n*.3,0,0),e.turn(`head`,.1,n*.1,0)}else if(t===`attack`){let t=l(0,.2),n=l(.22,.32),r=l(.45,.75),i=t*(1-n),a=n*(1-r);e.move(`root`,0,0,-.03*i+.12*a),e.turn(`chest`,-.1*i+.35*a,.35*i-.25*a,0),e.turn(`shR`,.7*i-1.25*a,0,-.2*i),e.turn(`elR`,-.6*i+.6*a,0,0),e.turn(`haR`,.3*i-.4*a,0,0),e.turn(`shL`,-.4*a,0,.4*i),e.turn(`thL`,-.6*a,0,0),e.turn(`knL`,.3*a,0,0),e.turn(`thR`,.4*a,0,0),e.turn(`knR`,.2*a,0,0),e.turn(`head`,-.15*i+.1*a,0,0),e.turn(`jaw`,.35*(i+a),0,0),e.turn(`earL`,-.4*(i+a),0,0),e.turn(`earR`,-.4*(i+a),0,0)}else if(t===`hit`){let t=Math.sin(Math.min(1,n/.4)*Math.PI);e.move(`root`,0,0,-.06*t),e.turn(`chest`,-.35*t,0,.12*t),e.turn(`head`,-.35*t,.25*t,0),e.turn(`shL`,-.8*t,0,.5*t),e.turn(`shR`,-.5*t,0,-.5*t),e.turn(`jaw`,.4*t,0,0),e.turn(`earL`,-.6*t,0,0),e.turn(`earR`,-.6*t,0,0)}else if(t===`ko`){let t=l(0,.5);e.turn(`root`,-t*Math.PI*.48,0,0),e.move(`root`,0,.06*t,-.2*t),e.turn(`thL`,.5*t,0,.2*t),e.turn(`thR`,.3*t,0,-.2*t),e.turn(`shL`,-.3*t,0,1*t),e.turn(`shR`,-.3*t,0,-1*t),e.turn(`head`,.3*t,.5*t,0),e.turn(`jaw`,.3*t,0,0)}}},It=e=>e>0?`L`:`R`;function Lt(e=1){let t=[[`root`,null,[0,0,0]],[`hips`,`root`,[0,.32,0]],[`spine`,`hips`,[0,.37,0]],[`chest`,`spine`,[0,.45,0]],[`neck`,`chest`,[0,.53,0]],[`head`,`neck`,[0,.58,.005]]];for(let n of[1,-1]){let r=It(n);t.push([`arm${r}`,`chest`,[n*.105*e,.5,0]],[`fore${r}`,`arm${r}`,[n*.135*e,.395,0]],[`hand${r}`,`fore${r}`,[n*.15*e,.292,.018]],[`thigh${r}`,`hips`,[n*.055*e,.31,0]],[`shin${r}`,`thigh${r}`,[n*.06*e,.172,.006]],[`foot${r}`,`shin${r}`,[n*.06*e,.05,0]])}return t}function Rt(e=1){let t={};for(let n of[1,-1]){let r=It(n);t[`shoulder${r}`]=[n*.105*e,.5,0],t[`elbow${r}`]=[n*.135*e,.395,0],t[`wrist${r}`]=[n*.15*e,.292,.018],t[`hand${r}`]=[n*.153*e,.262,.024],t[`hip${r}`]=[n*.055*e,.31,0],t[`knee${r}`]=[n*.06*e,.172,.006],t[`ankle${r}`]=[n*.06*e,.05,0]}return t}function zt(e,{look:t,mats:n={},b:r=1,k:i=.03}){let a=Rt(r),o=e=>n[e]??(e===`skin`||e===`hand`?`skin`:`cloth`),s=e=>t[e]??t.torso;e.ellipsoid([0,.318,0],[.083*r,.056,.06],{color:s(`legs`),mat:o(`legs`),bone:`hips`,k:i}),e.limb([0,.33,.002],[0,.42,.004],.068*r,.078*r,{color:s(`torso`),mat:o(`torso`),bone:`spine`,k:.04}),e.ellipsoid([0,.455,.006],[.1*r,.074,.068],{color:s(`torso`),mat:o(`torso`),bone:`chest`,k:.04});for(let t of[1,-1]){let n=It(t);e.sphere([t*.098*r,.494,0],.04,{color:s(`sleeve`),mat:o(`sleeve`),bone:`arm${n}`,k:.035}),e.limb(a[`shoulder${n}`],a[`elbow${n}`],.034,.028,{color:s(`sleeve`),mat:o(`sleeve`),bone:`arm${n}`,k:.012}),e.limb(a[`elbow${n}`],a[`wrist${n}`],.027,.022,{color:s(`cuff`),mat:o(`cuff`),bone:`fore${n}`,k:.012});let i=a[`hand${n}`];e.ellipsoid(i,[.022,.03,.026],{color:s(`hand`),mat:o(`hand`),bone:`hand${n}`,k:.012}),e.limb([i[0]-t*.012,i[1]+.008,i[2]+.016],[i[0]-t*.016,i[1]-.006,i[2]+.026],.0085,.008,{color:s(`hand`),mat:o(`hand`),bone:`hand${n}`,k:.006}),e.limb(a[`hip${n}`],a[`knee${n}`],.047*Math.sqrt(r),.035,{color:s(`legs`),mat:o(`legs`),bone:`thigh${n}`,k:.02}),e.limb(a[`knee${n}`],a[`ankle${n}`],.034,.027,{color:s(`boot`),mat:o(`boot`),bone:`shin${n}`,k:.012});let c=a[`ankle${n}`];e.ellipsoid([c[0],.03,c[2]+.028],[.033,.031,.058],{color:s(`boot`),mat:o(`boot`),bone:`foot${n}`,k:.02})}return e.limb([0,.51,0],[0,.585,.008],.03,.029,{color:s(`skin`),mat:o(`skin`),bone:`neck`,k:.02}),a}var Bt=e=>e<=0?0:e>=1?1:e*e*(3-2*e),Vt=(e,t,n)=>Bt((e-t)/(n-t));function Ht(e,{clip:t=`idle`,t:n=0,time:r=0,seed:i=0,speed:a=1},o={}){let s=r+i,c=o.heavy??0,l=Math.sin(s*(2.4-c*.6));if(e.scale(`chest`,1+l*.012,1+l*.018,1+l*.012),e.turn(`armL`,0,0,.05+l*.015),e.turn(`armR`,0,0,-.05-l*.015),e.turn(`foreL`,-.15,0,0),e.turn(`foreR`,-.25,0,0),t===`idle`)e.turn(`hips`,0,Math.sin(s*.7)*.04,Math.sin(s*.9)*.015),e.turn(`head`,Math.sin(s*.5)*.04,Math.sin(s*.37)*.18,0),e.move(`hips`,0,l*.002-.004,0),e.turn(`thighL`,.04,0,.02),e.turn(`shinL`,.08,0,0),e.turn(`thighR`,.04,0,-.02),e.turn(`shinR`,.08,0,0),e.turn(`armR`,-.35,0,-.1),e.turn(`foreR`,-.75,0,0),e.turn(`handR`,0,0,o.twist??-.9);else if(t===`walk`){let t=s*(9-c*2)*Math.max(.5,a),n=Math.sin(t);e.move(`hips`,0,Math.abs(Math.cos(t))*.012-.004,0),e.turn(`hips`,0,n*.12,0),e.turn(`chest`,.06,-n*.16,0),e.turn(`thighL`,-n*.55,0,0),e.turn(`shinL`,Math.max(0,n)*.8,0,0),e.turn(`footL`,-n*.2,0,0),e.turn(`thighR`,n*.55,0,0),e.turn(`shinR`,Math.max(0,-n)*.8,0,0),e.turn(`footR`,n*.2,0,0),e.turn(`armL`,n*.45,0,0),e.turn(`armR`,-.35-n*.2,0,-.1),e.turn(`foreR`,-.6,0,0)}else if(t===`attack`)Ut(e,n,o);else if(t===`cast`){let t=Vt(n,0,.3),r=Vt(n,.3,.42),i=Vt(n,.65,1),a=t*(1-i);e.turn(`chest`,-.12*a+.08*r*(1-i),0,0),e.turn(`head`,-.15*a,0,0),e.turn(`armR`,-1.9*a-.35*(1-a),0,-.25*a-.1),e.turn(`foreR`,-.3*a-.7*(1-a),0,0),e.turn(`armL`,-1.2*a-.5*r*(1-i),0,.5*a),e.turn(`foreL`,-.5*a,0,0),e.move(`hips`,0,.01*a,0)}else if(t===`hit`){let t=Math.sin(Math.min(1,n/.4)*Math.PI);e.move(`root`,0,0,-.05*t),e.turn(`spine`,-.25*t,0,.1*t),e.turn(`head`,-.3*t,.2*t,0),e.turn(`armL`,-.6*t,0,.5*t),e.turn(`armR`,-.6*t,0,-.5*t),e.turn(`thighL`,-.2*t,0,0),e.turn(`shinL`,.3*t,0,0)}else if(t===`ko`){let t=Vt(n,0,.3),r=Vt(n,.3,.75),i=t*(1-r);e.move(`hips`,0,-.13*i-.27*r,-.02*i-.12*r),e.turn(`hips`,-1.45*r,0,0),e.turn(`thighL`,-1.2*i+.25*r,0,.12*r),e.turn(`shinL`,1.5*i+.15*r,0,0),e.turn(`thighR`,.2*i+.2*r,0,-.18*r),e.turn(`shinR`,2*i+.35*r,0,0),e.turn(`footL`,.4*r,0,0),e.turn(`footR`,.4*r,0,0),e.turn(`spine`,.4*i+.05*r,0,0),e.turn(`head`,.5*i-.1*r,.5*r,0),e.turn(`armL`,-.4*i,0,1.1*r),e.turn(`armR`,-.4*i,0,-1.1*r),e.turn(`foreL`,-.3*r,0,0)}else if(t===`win`){let t=Vt(n,0,.3),r=Math.max(0,Math.sin(Math.min(1,n/.5)*Math.PI))*.03;e.move(`root`,0,r,0),e.turn(`armR`,-2.6*t-.35*(1-t),0,-.25*t),e.turn(`foreR`,-.2*t,0,0),e.turn(`armL`,0,0,.5*t),e.turn(`foreL`,-.9*t,0,0),e.turn(`chest`,-.1*t,0,0),e.turn(`head`,-.2*t,0,0)}}function Ut(e,t,n){let r=n.heavy??0,i=Vt(t,0,.22+r*.06),a=Vt(t,.24+r*.05,.34+r*.05),o=Vt(t,.5,.85),s=i*(1-a),c=a*(1-o);switch(e.move(`root`,0,0,.06*c),e.turn(`thighL`,-.5*c,0,0),e.turn(`shinL`,.35*c,0,0),e.turn(`thighR`,.35*c,0,0),e.turn(`shinR`,.25*c,0,0),n.attack??`slash`){case`slash`:e.turn(`chest`,-.1*s+.15*c,.6*s-.55*c,0),e.turn(`armR`,-2.1*s-1.1*c-.35*(1-s-c),0,-.6*s+.25*c),e.turn(`foreR`,-.4*s-.2*c-.6*(1-s-c),0,0),e.turn(`handR`,.3*s-.5*c,0,0),e.turn(`armL`,.3*c,0,.3*s);break;case`chop`:e.turn(`chest`,-.25*s+.35*c,.2*s,0),e.turn(`armR`,-2.8*s-1*c-.35*(1-s-c),0,-.1),e.turn(`foreR`,-.5*s-.2*c-.6*(1-s-c),0,0),e.turn(`armL`,-2.6*s-.9*c,0,-.35*(s+c)),e.turn(`foreL`,-.6*s-.4*c,0,0),e.turn(`handR`,.4*s-.6*c,0,0);break;case`thrust`:e.turn(`chest`,.05*c,.4*s-.25*c,0),e.turn(`armR`,-.2*s-1.35*c-.35*(1-s-c),0,-.2*s),e.turn(`foreR`,-1.3*s-.1*c-.6*(1-s-c),0,0),e.turn(`armL`,-.9*(s+c),0,.2),e.turn(`foreL`,-.6*(s+c),0,0);break;default:e.turn(`chest`,-.2*s+.25*c,.25*s,0),e.turn(`armR`,-2.9*s-.9*c-.35*(1-s-c),0,-.3*s),e.turn(`foreR`,-.2*s-.3*c-.6*(1-s-c),0,0),e.turn(`armL`,-.5*s,0,.4*s)}}var Wt=1.38,Gt=Rt(Wt),Kt=Ke({over:`#5f7a4a`,under:`#7f9568`,vary:.14,freq:10,grain:.06,edge:[-.5,.6]}),qt=z(`#9a8a7a`),Jt=(e,t)=>{let n=Kt(e,t);return Math.abs(e[1]-.47-(e[0]-.02)*.6)<.004&&Math.abs(e[0])<.07&&e[2]>.04?B(n,qt,.7):n},Yt=Ke({over:`#4a3222`,under:`#2e1f15`,vary:.18,freq:16,grain:.08}),Xt=Xe(V(`#5e6168`,.15,40),.35,.6,.7),Zt=Ke({over:`#7a6a52`,under:`#55473a`,vary:.2,freq:22,grain:.1}),Qt=V(`#4e3420`,.22,26),$t=Ke({over:`#1a1614`,under:`#0e0c0b`,vary:.2,freq:30,grain:.1}),en=V(`#e8dcbc`,.08,70),tn=Gt.handR,nn=(e,t=0,n=0)=>[tn[0]+t,tn[1]+n,tn[2]+e],rn={name:`orc`,scale:1.18,cell:.0072,cells:{eyes:.0025,irises:.0016,tusks:.0028,armor:.0045,club:.0045,hair:.0045},bones:Lt(Wt),materials:{skin:{roughness:.68,sheen:.35,sheenColor:`#b0c890`,sheenRoughness:.7},cloth:{roughness:.82},iron:{roughness:.4,metalness:.8},wood:{roughness:.85},hair:{roughness:.5,sheen:.8,sheenColor:`#605040`},tusk:{roughness:.35,clearcoat:.5},eye:{roughness:.1,clearcoat:1,emissive:`#ff4010`,emissiveIntensity:.9}},sculpt(e){let t={color:Jt,mat:`skin`};zt(e,{b:Wt,look:{skin:Jt,torso:Jt,sleeve:Jt,cuff:Zt,hand:Jt,legs:Yt,boot:Yt},mats:{torso:`skin`,sleeve:`skin`,cuff:`cloth`,legs:`cloth`,boot:`cloth`}}),e.ellipsoid([0,.455,.012],[.13,.085,.08],{...t,bone:`chest`,k:.04});for(let n of[1,-1]){let r=It(n);e.ellipsoid([n*.055,.47,.05],[.055,.04,.035],{...t,bone:`chest`,k:.03}),e.sphere([n*.13,.5,0],.058,{...t,bone:`arm${r}`,k:.035});let i=Gt[`shoulder${r}`],a=Gt[`elbow${r}`],o=Gt[`wrist${r}`];e.limb(i,a,.05,.04,{...t,bone:`arm${r}`,k:.02}),e.limb(a,o,.042,.032,{color:Zt,mat:`cloth`,bone:`fore${r}`,k:.015}),e.ellipsoid(Gt[`hand${r}`],[.034,.04,.036],{...t,bone:`hand${r}`,k:.015}),e.limb(Gt[`hip${r}`],Gt[`knee${r}`],.062,.046,{color:Yt,mat:`cloth`,bone:`thigh${r}`,k:.025}),e.limb(Gt[`knee${r}`],Gt[`ankle${r}`],.045,.036,{color:Zt,mat:`cloth`,bone:`shin${r}`,k:.015})}e.ellipsoid([0,.39,.02],[.105,.07,.08],{...t,bone:`spine`,k:.04}),e.limb([0,.51,-.01],[0,.57,.01],.07,.05,{...t,bone:`neck`,k:.04});let n={...t,bone:`head`};e.ellipsoid([0,.625,.01],[.068,.072,.07],{...n,k:.03}),e.ellipsoid([0,.585,.04],[.074,.05,.06],{...n,k:.035}),e.ellipsoid([0,.645,.062],[.068,.016,.026],{...n,k:.02}),e.ellipsoid([0,.615,.078],[.022,.018,.02],{...n,k:.015});for(let t of[1,-1]){e.ellipsoid([t*.07,.625,-.005],[.012,.024,.016],{...n,k:.01,rot:[.3,t*.6,t*-.5]});let r=[t*.032,.632,.07];e.ellipsoid(r,[.016,.011,.012],{op:`sub`,k:.004}),e.part(`eyes`,()=>e.ellipsoid(r,[.0155,.0105,.011],{color:`#3a0a04`,mat:`eye`,bone:`head`,k:0})),e.part(`irises`,()=>e.ellipsoid([r[0],r[1],r[2]+.008],[.0085,.0085,.004],{color:`#ffb040`,mat:`eye`,bone:`head`,k:0})),e.part(`tusks`,()=>e.limb([t*.035,.57,.085],[t*.045,.612,.1],.0095,.002,{color:en,mat:`tusk`,bone:`head`,k:.002}))}e.paint(e=>Math.max(Math.abs(e[1]-.586)-.0035,Math.abs(e[0])-.04,.07-e[2]),`#2a1a12`,.003),e.part(`hair`,()=>{e.ellipsoid([0,.69,-.03],[.022,.022,.022],{color:$t,mat:`hair`,bone:`head`,k:.01}),e.flake([0,.7,-.035],[0,.6,-.1],[0,0,-1],.018,.006,.6,{color:$t,mat:`hair`,bone:`head`,k:.01})}),e.part(`armor`,()=>{for(let t of[1,-1]){let n=[t*.14,.525,0];e.ellipsoid(n,[.07,.04,.07],{color:Xt,mat:`iron`,bone:`arm${It(t)}`,k:.006,rot:[0,0,t*-.4]}),e.ellipsoid([n[0],n[1]-.03,n[2]],[.09,.04,.09],{op:`sub`,k:.006,rot:[0,0,t*-.4]});for(let r of[-.6,0,.6])e.sphere([n[0]+t*.03,n[1]+.022,n[2]+r*.05],.007,{color:Xt,mat:`iron`,bone:`arm${It(t)}`,k:.002})}}),e.flake([.13,.52,.06],[-.1,.36,.085],[0,.3,1],.022,.022,.25,{color:Yt,mat:`cloth`,bone:`chest`,k:.008}),e.flake([.13,.52,-.06],[-.1,.36,-.085],[0,.3,-1],.022,.022,.25,{color:Yt,mat:`cloth`,bone:`chest`,k:.008}),e.limb([0,.35,.004],[0,.305,.006],.104,.112,{color:Yt,mat:`cloth`,bone:`hips`,k:.025});for(let t=0;t<8;t++){let n=(t+.5)/8*Math.PI*2,r=Math.sin(n),i=Math.cos(n),a=Math.abs(r)<.4?`hips`:r>0?`thighL`:`thighR`;e.flake([r*.1,.32,i*.1],[r*.125,.215,i*.125],[r,.15,i],.04,.034,.18,{color:Yt,mat:`cloth`,bone:a,k:.006})}e.torus([0,.345,.004],.106,.012,{color:Yt,mat:`cloth`,bone:`hips`,k:.006}),e.part(`armor`,()=>{for(let t=0;t<10;t++){let n=t/10*Math.PI*2;e.sphere([Math.sin(n)*.112,.33,Math.cos(n)*.112],.008,{color:Xt,mat:`iron`,bone:`hips`,k:.002})}}),e.part(`club`,()=>{e.limb(nn(-.06),nn(.36,0,0),.016,.042,{color:Qt,mat:`wood`,bone:`handR`,k:.004}),e.torus(nn(.25),.04,.007,{color:Xt,mat:`iron`,bone:`handR`,k:.003,rot:[Math.PI/2,0,0]});for(let t=0;t<9;t++){let n=t*2.39996,r=.27+t%3*.035,i=.035+(r-.27)*.2,a=nn(r,Math.cos(n)*i,Math.sin(n)*i),o=nn(r+.01,Math.cos(n)*(i+.035),Math.sin(n)*(i+.035));e.limb(a,o,.008,.0015,{color:Xt,mat:`iron`,bone:`handR`,k:.002})}})},animate(e,t){Ht(e,t,{attack:`chop`,heavy:1,twist:0}),e.turn(`thighL`,0,0,.08),e.turn(`thighR`,0,0,-.08),e.turn(`neck`,.15,0,0),e.turn(`head`,.05,0,0)}},an=(e,t)=>[0,1,2].map(n=>e[n][0]*t[0]+e[n][1]*t[1]+e[n][2]*t[2]),on=e=>e>0?`L`:`R`,sn=qe({over:`#3b302a`,under:`#b39f88`,vary:.2,freq:11,grain:.08,gfreq:110,edge:[-.5,.2],strands:.4,sfreq:150}),cn=Ke({over:`#b98479`,under:`#c99a8e`,vary:.12,freq:20,grain:.06}),ln=Ye(2,.021,`#ffffff`,`#b8a8a4`,.3),un=Je(2,-.72,-.24,`#b4908a`,`#7f625a`,e=>{let t=V(`#ffffff`,.1,140)(e),n=ln(e);return[t[0]*n[0],t[1]*n[1],t[2]*n[2]]}),dn=z(`#8a8079`),fn={height:0,id:0,edge:0},pn=(e,t)=>{let n=sn(e,t),r=Ae(e,.022,2,3.2,fn),i=.7+.45*r.height+(r.id-.5)*.18;return B(n.map(e=>e*i),dn,Math.max(0,r.height-.6)*.5*Math.max(0,t[1]+.3))},mn={name:`rat`,scale:1.35,cell:.0075,cells:{eyes:.0024,irises:.0014,pupils:.001,teeth:.0025,ears:.003},bones:[[`root`,null,[0,0,0]],[`body`,`root`,[0,.16,-.04]],[`chest`,`body`,[0,.17,.06]],[`head`,`chest`,[0,.21,.19]],[`jaw`,`head`,[0,.172,.23]],[`earL`,`head`,[.045,.26,.2]],[`earR`,`head`,[-.045,.26,.2]],[`fl1L`,`chest`,[.07,.15,.12]],[`fl2L`,`fl1L`,[.075,.075,.13]],[`fl1R`,`chest`,[-.07,.15,.12]],[`fl2R`,`fl1R`,[-.075,.075,.13]],[`hl1L`,`body`,[.1,.16,-.1]],[`hl2L`,`hl1L`,[.11,.08,-.14]],[`hl1R`,`body`,[-.1,.16,-.1]],[`hl2R`,`hl1R`,[-.11,.08,-.14]],[`tail1`,`body`,[0,.15,-.22]],[`tail2`,`tail1`,[0,.12,-.34]],[`tail3`,`tail2`,[.02,.075,-.47]],[`tail4`,`tail3`,[.06,.035,-.6]]],materials:{fur:{roughness:.82,sheen:1,sheenColor:`#a8968a`,sheenRoughness:.45},skin:{roughness:.48,clearcoat:.25,clearcoatRoughness:.5},nose:{roughness:.3,clearcoat:1,clearcoatRoughness:.15},tooth:{roughness:.32,clearcoat:.6},eye:{roughness:.1,clearcoat:1,clearcoatRoughness:.03,emissive:`#ff1a05`,emissiveIntensity:.18},iris:{roughness:.15,clearcoat:1,clearcoatRoughness:.03,emissive:`#ff5a10`,emissiveIntensity:.9},pupil:{roughness:.05,clearcoat:1,clearcoatRoughness:.02},mouth:{roughness:.4,clearcoat:.8}},sculpt(e){let t={color:pn,mat:`fur`,locks:[.022,.0045,2,3.2]},n={color:pn,mat:`fur`};e.ellipsoid([0,.17,-.07],[.13,.128,.165],{...t,bone:`body`,k:.02,rot:[-.15,0,0]}),e.ellipsoid([0,.125,-.01],[.1,.075,.14],{...t,bone:`body`,k:.06}),e.ellipsoid([0,.168,.085],[.094,.1,.115],{...t,bone:`chest`,k:.07,rot:[.25,0,0]}),e.limb([0,.2,.09],[0,.215,.18],.078,.066,{...t,bone:`chest`,k:.05}),e.chain([[0,.28,-.12],[0,.275,0],[0,.262,.1]],[.025,.03,.022],{...t,bone:`body`,k:.06}),e.ellipsoid([0,.218,.212],[.074,.07,.088],{...n,bone:`head`,k:.05}),e.mirror(t=>e.ellipsoid([t*.042,.19,.25],[.04,.042,.052],{...n,bone:`head`,k:.035})),e.limb([0,.206,.25],[0,.191,.338],.05,.022,{...n,bone:`head`,k:.03}),e.sphere([0,.193,.352],.017,{color:`#c27f80`,mat:`nose`,bone:`head`,k:.012}),e.mirror(t=>e.sphere([t*.008,.189,.364],.005,{op:`sub`,k:.004})),e.limb([0,.165,.228],[0,.157,.302],.034,.013,{...n,bone:`jaw`,k:.03}),e.box([0,.169,.3],[.05,.0045,.055],.003,{op:`sub`,k:.008,rot:[-.12,0,0]}),e.part(`teeth`,()=>e.mirror(t=>e.box([t*.0058,.159,.337],[.0052,.0155,.0038],.0022,{color:`#e0c378`,mat:`tooth`,bone:`head`,k:.002,rot:[.22,0,t*.06]}))),e.mirror(t=>{e.sphere([t*.05,.233,.272],.021,{op:`sub`,k:.01}),e.ellipsoid([t*.043,.253,.266],[.032,.011,.026],{...n,bone:`head`,k:.018,rot:[0,0,t*-.38]})}),e.mirror(t=>{let n=[t*.049,.232,.271],r=[t*.62,.18,.76],i=Math.hypot(...r),a=r.map(e=>e/i),o=e=>n.map((t,n)=>t+a[n]*e),s=[-Math.asin(a[1]),Math.atan2(a[0],a[2]),0];e.part(`eyes`,()=>e.sphere(n,.0185,{color:`#2a0503`,mat:`eye`,bone:`head`,k:0})),e.part(`irises`,()=>e.ellipsoid(o(.0158),[.0108,.0108,.0042],{color:`#ff7a2a`,mat:`iris`,bone:`head`,k:0,rot:s})),e.part(`pupils`,()=>e.ellipsoid(o(.0192),[.0021,.0072,.0018],{color:`#050202`,mat:`pupil`,bone:`head`,k:0,rot:s}))}),e.paint(e=>e[2]<.24||e[2]>.31||e[1]<.2?1:Math.hypot((Math.abs(e[0])-.05)*.8,e[1]-.235,(e[2]-.272)*.7)-.03,`#1d1715`,.012),e.part(`ears`,()=>e.mirror(t=>{let r=[-.25,t*.55,t*.42],i=De(r),a=[t*.06,.28,.185],o=an(i,[0,0,1]);e.ellipsoid(a,[.046,.05,.011],{...n,bump:null,bone:`ear${on(t)}`,k:.02,rot:r});let s=[a[0]+o[0]*.012,a[1]+o[1]*.012+.004,a[2]+o[2]*.012];e.ellipsoid(s,[.034,.038,.007],{op:`sub`,k:.01,rot:r}),e.paint(e=>{let t=[e[0]-s[0],e[1]-s[1],e[2]-s[2]];return Math.hypot(t[0],t[1],t[2])-.04},cn,.006)})),e.mirror(n=>{let r=on(n);e.limb([n*.07,.155,.125],[n*.077,.078,.132],.04,.022,{...t,bone:`fl1${r}`,k:.035}),e.limb([n*.077,.078,.132],[n*.072,.024,.152],.02,.014,{...t,bone:`fl2${r}`,k:.012}),e.ellipsoid([n*.072,.012,.166],[.022,.011,.026],{color:cn,mat:`skin`,bone:`fl2${r}`,k:.012});for(let t of[-1,0,1])e.limb([n*.072+t*.012,.01,.175],[n*.072+t*.016,.006,.196],.0065,.0045,{color:cn,mat:`skin`,bone:`fl2${r}`,k:.006});e.ellipsoid([n*.1,.14,-.105],[.05,.08,.085],{...t,bone:`hl1${r}`,k:.04,rot:[.35,0,0]}),e.limb([n*.11,.085,-.15],[n*.106,.026,-.138],.03,.017,{...t,bone:`hl2${r}`,k:.02}),e.limb([n*.106,.014,-.148],[n*.1,.011,-.05],.016,.013,{color:cn,mat:`skin`,bone:`hl2${r}`,k:.016});for(let t of[-1,0,1])e.limb([n*.1+t*.011,.009,-.055],[n*.1+t*.017,.006,-.03],.007,.005,{color:cn,mat:`skin`,bone:`hl2${r}`,k:.006})}),e.chain([[0,.15,-.21],[0,.118,-.34],[.02,.074,-.47],[.06,.034,-.6],[.11,.018,-.72]],[.036,.026,.019,.012,.005],{color:un,mat:`skin`,bones:[`tail1`,`tail2`,`tail3`,`tail4`],k:.02})},animate(e,{clip:t=`idle`,t:n=0,time:r=0,seed:i=0,speed:a=1}){let o=r+i,s=(e,t,n=0)=>e*Math.sin(o*t+n);e.scale(`body`,1,1+s(.025,3.1),1);for(let t=1;t<=4;t++)e.turn(`tail${t}`,s(.06,2.2,-t*.7),s(.28,2.4,-t*.9),0);let c=Math.max(0,Math.sin(o*1.7)*Math.sin(o*5.3)-.7)*2;if(e.turn(`earL`,0,c*.5,-c*.3),e.turn(`earR`,0,-c*.3,c*.2),t===`idle`)e.turn(`head`,s(.05,11)*Math.max(0,Math.sin(o*.9)),s(.35,.6),0),e.turn(`jaw`,Math.max(0,s(.08,11))*Math.max(0,Math.sin(o*.9)),0,0),e.move(`body`,0,s(.004,3.1),0);else if(t===`walk`){let t=o*15*Math.max(.4,a),n=Math.sin(t),r=Math.sin(t+.7);e.move(`root`,0,Math.abs(Math.sin(t))*.025*a,0),e.turn(`body`,n*.08*a,0,0),e.turn(`chest`,-n*.1*a,0,0),e.turn(`head`,n*.08*a,0,0),e.turn(`fl1L`,-r*.7*a,0,0),e.turn(`fl1R`,-r*.6*a,0,0),e.turn(`fl2L`,Math.max(0,r)*.6*a,0,0),e.turn(`fl2R`,Math.max(0,r)*.5*a,0,0),e.turn(`hl1L`,n*.65*a,0,0),e.turn(`hl1R`,n*.55*a,0,0),e.turn(`hl2L`,-Math.max(0,-n)*.6*a,0,0),e.turn(`hl2R`,-Math.max(0,-n)*.5*a,0,0);for(let t=1;t<=4;t++)e.turn(`tail${t}`,-.1*a,s(.15,15,-t),0)}else if(t===`attack`){let t=Math.min(1,n/.22),r=Math.max(0,Math.min(1,(n-.22)/.12)),i=r*(1-Math.max(0,Math.min(1,(n-.42)/.25)));e.turn(`body`,-.35*t*(1-r)+.15*i,0,0),e.move(`root`,0,.02*t*(1-i),-.04*t*(1-r)+.16*i),e.turn(`chest`,-.2*t*(1-r)+.2*i,0,0),e.turn(`head`,-.3*t*(1-r)+.25*i,0,0),e.turn(`jaw`,.55*Math.max(t*(1-r),i*(n<.4?1:.2)),0,0),e.turn(`fl1L`,-.9*i-.3*t*(1-r),0,0),e.turn(`fl1R`,-.8*i-.3*t*(1-r),0,0),e.turn(`earL`,-.5*t,0,0),e.turn(`earR`,-.5*t,0,0)}else if(t===`hit`){let t=Math.sin(Math.min(1,n/.4)*Math.PI);e.move(`root`,0,0,-.07*t),e.turn(`body`,-.2*t,0,s(.1,40)*t),e.turn(`head`,-.4*t,0,0),e.turn(`jaw`,.4*t,0,0),e.turn(`earL`,-.7*t,0,0),e.turn(`earR`,-.7*t,0,0)}else if(t===`ko`){let t=Math.min(1,n/.5);e.turn(`root`,0,0,t*Math.PI*.5),e.move(`root`,.12*t,.1*t,0),e.turn(`fl1L`,-.6*t,0,0),e.turn(`fl1R`,-.7*t,0,0),e.turn(`hl1L`,.6*t,0,0),e.turn(`hl1R`,.5*t,0,0),e.turn(`jaw`,.3*t,0,0)}}},hn=z(`#7a6a4e`),gn=(e,t)=>{let n=V(`#e6dcc2`,.1,70)(e),r=Math.max(0,-t[1])*.5+Math.max(0,.3-e[1])*1.2;return B(n,hn,Math.min(.6,r))},_n=Xe(V(`#6e7076`,.18,40),.55,.85,.75),vn=V(`#7c4a2a`,.25,50),yn=e=>B(_n(e,[0,1,0]),vn(e),.25+Math.max(0,Math.sin(e[0]*90+e[1]*60)*Math.sin(e[2]*70-e[1]*40))*.6),bn=V(`#5a3c22`,.2,30),xn=V(`#3a2e24`,.25,40),H=Rt(),Sn=H.handR,Cn=e=>[Sn[0],Sn[1],Sn[2]+e],wn={name:`skeleton`,scale:1.07,cell:.0062,cells:{eyes:.003,teeth:.0024,blade:.0028,shield:.0045,helm:.004},bones:[...Lt(),[`jaw`,`head`,[0,.632,.02]]],materials:{bone:{roughness:.55,clearcoat:.15,clearcoatRoughness:.6},glow:{roughness:.3,emissive:`#3ec8ff`,emissiveIntensity:2.6},iron:{roughness:.42,metalness:.75},wood:{roughness:.8},cloth:{roughness:.9,sheen:.4,sheenColor:`#806a50`}},sculpt(e){let t={color:gn,mat:`bone`};e.ellipsoid([0,.695,-.004],[.084,.088,.094],{...t,bone:`head`,k:.02}),e.ellipsoid([0,.652,.035],[.064,.05,.062],{...t,bone:`head`,k:.03});for(let n of[1,-1])e.ellipsoid([n*.05,.66,.05],[.026,.02,.03],{...t,bone:`head`,k:.02});for(let t of[1,-1])e.ellipsoid([t*.034,.682,.084],[.025,.024,.03],{op:`sub`,k:.01});e.ellipsoid([0,.652,.094],[.01,.016,.02],{op:`sub`,k:.006}),e.paint(e=>Math.min(...[1,-1].map(t=>Math.hypot(e[0]-t*.034,e[1]-.682,(e[2]-.074)*.8)-.028),Math.hypot(e[0],e[1]-.652,e[2]-.09)-.016),`#1a1410`,.008),e.part(`eyes`,()=>{for(let t of[1,-1])e.sphere([t*.033,.68,.072],.0085,{color:`#bff0ff`,mat:`glow`,bone:`head`,k:0})}),e.limb([-.04,.628,.02],[0,.616,.075],.014,.017,{...t,bone:`jaw`,k:.012}),e.limb([.04,.628,.02],[0,.616,.075],.014,.017,{...t,bone:`jaw`,k:.012}),e.part(`teeth`,()=>{for(let n=-3;n<=3;n++){let r=n*.24,i=Math.sin(r)*.04,a=.05+Math.cos(r)*.036;e.box([i,.633,a],[.0055,.008,.004],.002,{...t,bone:`head`,k:.001,rot:[0,r,0]}),e.box([i*.95,.624,a-.002],[.0052,.007,.0038],.002,{...t,bone:`jaw`,k:.001,rot:[0,r,0]})}}),e.part(`helm`,()=>{e.ellipsoid([0,.708,-.006],[.094,.082,.102],{color:yn,mat:`iron`,bone:`head`,k:.01}),e.box([0,.66,0],[.2,.05,.2],.01,{op:`sub`,k:.006}),e.torus([0,.712,-.006],.096,.007,{color:yn,mat:`iron`,bone:`head`,k:.004,rot:[.08,0,0]}),e.limb([0,.79,-.06],[0,.79,.07],.008,.006,{color:yn,mat:`iron`,bone:`head`,k:.008}),e.sphere([.05,.765,.06],.018,{op:`sub`,k:.01})});for(let n=0;n<=10;n++){let r=.33+n*.028,i=r<.37?`hips`:r<.45?`spine`:r<.53?`chest`:`neck`;e.ellipsoid([0,r,-.03+Math.sin(n*.4)*.006],[.018,.011,.017],{...t,bone:i,k:.008})}for(let n=0;n<5;n++){let r=.51-n*.03,i=.07-n*.004+(n===0?-.012:0);e.torus([0,r,0],i,.0085,{...t,bone:n<3?`chest`:`spine`,k:.006,arc:2.5,rot:[.3,0,0]})}e.limb([0,.52,.064],[0,.42,.06],.012,.009,{...t,bone:`chest`,k:.01});for(let n of[1,-1]){let r=It(n);e.limb([0,.522,.04],H[`shoulder${r}`],.009,.011,{...t,bone:`chest`,k:.008}),e.flake([n*.05,.5,-.045],[n*.075,.43,-.04],[0,0,-1],.028,.012,.25,{...t,bone:`chest`,k:.008})}for(let n of[1,-1])e.ellipsoid([n*.05,.325,-.005],[.045,.034,.03],{...t,bone:`hips`,k:.015,rot:[0,n*.5,n*.3]});e.ellipsoid([0,.31,-.02],[.03,.03,.02],{...t,bone:`hips`,k:.015});for(let n of[1,-1]){let r=It(n),i=(n,r,i)=>e.sphere(n,r,{...t,bone:i,k:.008});i(H[`shoulder${r}`],.02,`arm${r}`),e.limb(H[`shoulder${r}`],H[`elbow${r}`],.012,.011,{...t,bone:`arm${r}`,k:.01}),i(H[`elbow${r}`],.016,`fore${r}`);let a=H[`elbow${r}`],o=H[`wrist${r}`];e.limb([a[0]-.006,a[1],a[2]+.004],[o[0]-.006,o[1],o[2]],.0085,.008,{...t,bone:`fore${r}`,k:.005}),e.limb([a[0]+.006,a[1],a[2]-.004],[o[0]+.006,o[1],o[2]],.0085,.009,{...t,bone:`fore${r}`,k:.005});let s=H[`hand${r}`];e.ellipsoid(s,[.016,.022,.018],{...t,bone:`hand${r}`,k:.008});for(let n of[-1,0,1])e.limb([s[0]+n*.008,s[1]-.012,s[2]+.01],[s[0]+n*.008,s[1]-.028,s[2]+.022],.0055,.0045,{...t,bone:`hand${r}`,k:.004});i(H[`hip${r}`],.022,`thigh${r}`),e.limb(H[`hip${r}`],H[`knee${r}`],.015,.013,{...t,bone:`thigh${r}`,k:.01}),i(H[`knee${r}`],.019,`shin${r}`);let c=H[`knee${r}`],l=H[`ankle${r}`];e.limb(c,l,.012,.01,{...t,bone:`shin${r}`,k:.008}),e.limb([c[0]+n*.012,c[1]-.01,c[2]-.004],[l[0]+n*.01,l[1]+.01,l[2]],.006,.006,{...t,bone:`shin${r}`,k:.004}),i(l,.014,`foot${r}`),e.flake([l[0],.018,l[2]-.01],[l[0],.012,l[2]+.075],[0,1,0],.024,.018,.45,{...t,bone:`foot${r}`,k:.01})}e.torus([0,.345,-.002],.058,.006,{color:xn,mat:`cloth`,bone:`hips`,k:.004}),e.flake([0,.34,.055],[.004,.265,.068],[0,.2,1],.024,.016,.22,{color:xn,mat:`cloth`,bone:`hips`,k:.008}),e.flake([0,.34,-.055],[-.004,.27,-.068],[0,.2,-1],.022,.014,.22,{color:xn,mat:`cloth`,bone:`hips`,k:.008}),e.part(`blade`,()=>{e.flake(Cn(.035),Cn(.36),[0,1,0],.019,.004,.24,{color:yn,mat:`iron`,bone:`handR`,k:0});for(let t of[.14,.23,.3])e.sphere([Sn[0]+(t===.23?-.018:.018),Sn[1],Sn[2]+t],.007,{op:`sub`,k:.002});e.box(Cn(.03),[.042,.008,.008],.004,{color:yn,mat:`iron`,bone:`handR`,k:0}),e.limb(Cn(-.035),Cn(.025),.008,.008,{color:bn,mat:`wood`,bone:`handR`,k:0}),e.sphere(Cn(-.042),.011,{color:yn,mat:`iron`,bone:`handR`,k:.002})}),e.part(`shield`,()=>{let t=H.elbowL,n=H.wristL,r=[(t[0]+n[0])/2+.03,(t[1]+n[1])/2,(t[2]+n[2])/2],i=[0,Math.PI/2,0];e.ellipsoid(r,[.11,.11,.014],{color:bn,mat:`wood`,bone:`foreL`,k:.004,rot:i}),e.torus(r,.106,.009,{color:yn,mat:`iron`,bone:`foreL`,k:.004,rot:[0,0,Math.PI/2]}),e.sphere([r[0]+.012,r[1],r[2]],.03,{color:yn,mat:`iron`,bone:`foreL`,k:.006}),e.box([r[0]+.012,r[1]+.05,r[2]-.03],[.02,.05,.004],.002,{op:`sub`,k:.002,rot:[.4,0,0]}),e.paint(e=>Math.abs(((e[1]-r[1])%.036+.036)%.036-.018)-.0015+ +(e[0]<r[0]),`#2e1e10`,.0015)})},animate(e,t){Ht(e,t,{attack:`slash`,twist:-.9});let{clip:n=`idle`,time:r=0,seed:i=0}=t,a=r+i,o=(e,t)=>Math.sin(a*e+t)>.93?.08:0;e.turn(`head`,o(2.3,0),o(1.7,2)-o(1.3,4),o(2.9,1)*.5),e.turn(`jaw`,n===`attack`||n===`hit`?.35:Math.max(0,Math.sin(a*14))*.12*(Math.sin(a*.9)>.4),0,0),(n===`idle`||n===`walk`)&&(e.turn(`armL`,-.45,.3,.25),e.turn(`foreL`,-.9,0,0))}},Tn=z(`#141c2a`),En=Je(1,-.45,.3,`#121a26`,`#4c5c74`,V(`#ffffff`,.14,26)),Dn=(e,t)=>B(En(e,t),Tn,Math.max(0,-t[1])*.35),On=V(`#cfd6dc`,.08,60),kn=[[`skirt1`,0],[`skirt2`,-.14],[`skirt3`,-.28]],An={rat:mn,goblin:Ft,skeleton:wn,orc:rn,bat:at,wraith:{name:`wraith`,cell:.0078,cells:{eyes:.0024,claws:.0028,hood:.0052,void:.006},bones:[[`root`,null,[0,0,0]],[`body`,`root`,[0,.05,0]],[`head`,`body`,[0,.2,0]],[`skirt1`,`body`,[0,0,0]],[`skirt2`,`skirt1`,[0,-.14,0]],[`skirt3`,`skirt2`,[0,-.28,0]],...[1,-1].flatMap(e=>{let t=e>0?`L`:`R`;return[[`arm${t}`,`body`,[e*.1,.16,0]],[`fore${t}`,`arm${t}`,[e*.17,.04,.08]],[`hand${t}`,`fore${t}`,[e*.19,-.02,.17]]]})],materials:{shroud:{roughness:.9,sheen:1,sheenColor:`#8fd0ff`,sheenRoughness:.35,emissive:`#16304e`,emissiveIntensity:.6,opacity:.92,side:`double`},void:{roughness:1,emissive:`#000000`},eye:{roughness:.2,emissive:`#9ef0ff`,emissiveIntensity:4},bone:{roughness:.5,emissive:`#4a8ac0`,emissiveIntensity:.35}},sculpt(e){let t={color:Dn,mat:`shroud`};e.ellipsoid([0,.145,-.01],[.105,.06,.085],{...t,bone:`body`,k:.04}),e.limb([0,.14,-.01],[0,0,-.012],.085,.105,{...t,bone:`skirt1`,k:.05}),e.limb([0,0,-.012],[0,-.14,-.02],.105,.125,{...t,bone:`skirt2`,k:.05}),e.limb([0,-.14,-.02],[0,-.27,-.03],.125,.15,{...t,bone:`skirt3`,k:.05}),e.limb([0,-.36,-.03],[0,-.08,-.02],.14,.05,{op:`sub`,k:.02});for(let n=0;n<14;n++){let r=n/14*Math.PI*2+.2,i=.12+n*7%5*.035,a=Math.sin(r)*.135,o=Math.cos(r)*.135-.03;e.flake([a,-.22,o],[a*1.2,-.25-i,o*1.2-.03],[Math.sin(r),0,Math.cos(r)],.034,.004,.22,{...t,bone:`skirt3`,k:.015})}e.part(`hood`,()=>{e.ellipsoid([0,.255,-.005],[.08,.1,.09],{...t,bone:`head`,k:.02}),e.limb([0,.31,-.03],[0,.36,-.12],.045,.006,{...t,bone:`head`,k:.04}),e.limb([0,.2,0],[0,.17,.02],.085,.09,{...t,bone:`head`,k:.03}),e.ellipsoid([0,.24,.085],[.058,.075,.075],{op:`sub`,k:.012})}),e.part(`void`,()=>e.ellipsoid([0,.24,.03],[.055,.07,.045],{color:`#020305`,mat:`void`,bone:`head`,k:0})),e.part(`eyes`,()=>{for(let t of[1,-1])e.ellipsoid([t*.022,.245,.072],[.01,.0065,.005],{color:`#e8ffff`,mat:`eye`,bone:`head`,k:0,rot:[0,0,t*-.3]})});for(let n of[1,-1]){let r=n>0?`L`:`R`;e.limb([n*.1,.16,0],[n*.17,.04,.08],.04,.035,{...t,bone:`arm${r}`,k:.03}),e.limb([n*.17,.04,.08],[n*.19,-.01,.16],.035,.05,{...t,bone:`fore${r}`,k:.015}),e.ellipsoid([n*.19,-.01,.17],[.04,.04,.02],{op:`sub`,k:.01,rot:[.4,0,0]});for(let i of[-1,0,1])e.flake([n*.19+i*.03,-.03,.15],[n*.19+i*.035,-.09,.15],[0,0,1],.014,.003,.3,{...t,bone:`fore${r}`,k:.01});e.part(`claws`,()=>{let t=[n*.19,-.015,.175];e.ellipsoid(t,[.016,.012,.018],{color:On,mat:`bone`,bone:`hand${r}`,k:.006});for(let[i,a,o]of[[-.012,.005,.075],[0,.008,.085],[.012,.004,.07],[n*.02,-.008,.05]]){let n=[t[0]+i*1.2,t[1]+a,t[2]+o*.55],s=[t[0]+i*1.5,t[1]+a-.03,t[2]+o];e.limb([t[0]+i,t[1]+a,t[2]+.01],n,.004,.0034,{color:On,mat:`bone`,bone:`hand${r}`,k:.003}),e.limb(n,s,.0034,8e-4,{color:On,mat:`bone`,bone:`hand${r}`,k:.003})}})}},animate(e,{clip:t=`idle`,t:n=0,time:r=0,seed:i=0,speed:a=1}){let o=r+i,s=e=>e<=0?0:e>=1?1:e*e*(3-2*e);e.move(`root`,0,Math.sin(o*1.6)*.025,0);let c=0;t===`walk`&&(c=.35*Math.max(.5,a)),kn.forEach(([t],n)=>{e.turn(t,Math.sin(o*2.2-n*.9)*.08+c*(.4+n*.3),Math.sin(o*1.3-n)*.05,Math.sin(o*1.9-n*1.2)*.07)}),e.turn(`head`,Math.sin(o*.7)*.1,Math.sin(o*.45)*.3,Math.sin(o*.9)*.06);let l=Math.sin(o*1.1)*.1;if(e.turn(`armL`,-.1+l,0,.1),e.turn(`armR`,-.1-l,0,-.1),e.turn(`handL`,Math.sin(o*2.4)*.2,0,0),e.turn(`handR`,Math.sin(o*2.4+1)*.2,0,0),t===`walk`&&e.turn(`body`,.25,0,0),t===`attack`){let t=s(n/.22),r=s((n-.22)/.12),i=s((n-.45)/.3),a=t*(1-r),o=r*(1-i);e.move(`root`,0,.08*a-.04*o,-.04*a+.16*o),e.turn(`body`,-.3*a+.4*o,0,0),e.turn(`armL`,-1.2*a-.4*o,0,.5*a),e.turn(`armR`,-1.2*a-.4*o,0,-.5*a),e.turn(`head`,-.2*a+.2*o,0,0)}else if(t===`hit`){let t=Math.sin(Math.min(1,n/.4)*Math.PI);e.move(`root`,0,.03*t,-.08*t),e.turn(`body`,-.4*t,0,Math.sin(n*25)*.15*t),e.turn(`armL`,.5*t,0,.6*t),e.turn(`armR`,.5*t,0,-.6*t)}else if(t===`ko`){let t=s(n/.6);e.move(`root`,0,-.25*t,0),e.scale(`body`,1+.2*t,1-.55*t,1+.2*t),e.turn(`head`,.6*t,0,.3*t),e.turn(`armL`,.6*t,0,.8*t),e.turn(`armR`,.6*t,0,-.8*t)}}},dragon:St},jn=()=>({rot:[0,0,0],move:[0,0,0],scale:[1,1,1]}),Mn=class{constructor(e){this.names=e.map(([e])=>e),this.parents=e.map(([,e])=>{if(e===null)return-1;let t=this.names.indexOf(e);if(t<0)throw Error(`rig: bone ${e} comes after its child`);return t}),this.pivots=e.map(([,,e])=>e),this.pose=e.map(jn),this.matrices=new Float32Array(e.length*12),this.index=new Map(this.names.map((e,t)=>[e,t]))}reset(){for(let e of this.pose)e.rot[0]=e.rot[1]=e.rot[2]=0,e.move[0]=e.move[1]=e.move[2]=0,e.scale[0]=e.scale[1]=e.scale[2]=1;return this}bone(e){let t=this.index.get(e);return t===void 0?jn():this.pose[t]}turn(e,t=0,n=0,r=0){let i=this.bone(e).rot;return i[0]+=t,i[1]+=n,i[2]+=r,this}move(e,t=0,n=0,r=0){let i=this.bone(e).move;return i[0]+=t,i[1]+=n,i[2]+=r,this}scale(e,t=1,n=t,r=t){let i=this.bone(e).scale;return i[0]*=t,i[1]*=n,i[2]*=r,this}compute(){let e=this.matrices;for(let t=0;t<this.pose.length;t++){let{rot:n,move:r,scale:i}=this.pose[t],[a,o,s]=this.pivots[t],c=Math.cos(n[0]),l=Math.sin(n[0]),u=Math.cos(n[1]),d=Math.sin(n[1]),f=Math.cos(n[2]),p=Math.sin(n[2]),m=f*u,h=f*d*l-p*c,g=f*d*c+p*l,_=p*u,v=p*d*l+f*c,y=p*d*c-f*l,b=-d,x=u*l,S=u*c,C=m*i[0],w=h*i[1],T=g*i[2],E=_*i[0],D=v*i[1],O=y*i[2],k=b*i[0],A=x*i[1],j=S*i[2],M=a+r[0]-(C*a+w*o+T*s),N=o+r[1]-(E*a+D*o+O*s),P=s+r[2]-(k*a+A*o+j*s),F=t*12,I=this.parents[t];if(I<0)e[F]=C,e[F+1]=w,e[F+2]=T,e[F+3]=M,e[F+4]=E,e[F+5]=D,e[F+6]=O,e[F+7]=N,e[F+8]=k,e[F+9]=A,e[F+10]=j,e[F+11]=P;else{let t=I*12;for(let n=0;n<3;n++){let r=e[t+n*4],i=e[t+n*4+1],a=e[t+n*4+2],o=e[t+n*4+3];e[F+n*4]=r*C+i*E+a*k,e[F+n*4+1]=r*w+i*D+a*A,e[F+n*4+2]=r*T+i*O+a*j,e[F+n*4+3]=r*M+i*N+a*P+o}}}return e}point(e,t){let n=(this.index.get(e)??0)*12,r=this.matrices;return[r[n]*t[0]+r[n+1]*t[1]+r[n+2]*t[2]+r[n+3],r[n+4]*t[0]+r[n+5]*t[1]+r[n+6]*t[2]+r[n+7],r[n+8]*t[0]+r[n+9]*t[1]+r[n+10]*t[2]+r[n+11]]}};function Nn(e,t,n,r){let{position:i,normal:a,skinIndex:o,skinWeight:s}=e,c=i.length/3;for(let e=0;e<c;e++){let c=e*4,l,u,d,f,p,m,h,g,_,v,y,b,x=s[c],S=o[c]*12;if(x>=.999)l=t[S],u=t[S+1],d=t[S+2],f=t[S+3],p=t[S+4],m=t[S+5],h=t[S+6],g=t[S+7],_=t[S+8],v=t[S+9],y=t[S+10],b=t[S+11];else{l=t[S]*x,u=t[S+1]*x,d=t[S+2]*x,f=t[S+3]*x,p=t[S+4]*x,m=t[S+5]*x,h=t[S+6]*x,g=t[S+7]*x,_=t[S+8]*x,v=t[S+9]*x,y=t[S+10]*x,b=t[S+11]*x;for(let e=1;e<4;e++){let n=s[c+e];if(n<=0)break;S=o[c+e]*12,l+=t[S]*n,u+=t[S+1]*n,d+=t[S+2]*n,f+=t[S+3]*n,p+=t[S+4]*n,m+=t[S+5]*n,h+=t[S+6]*n,g+=t[S+7]*n,_+=t[S+8]*n,v+=t[S+9]*n,y+=t[S+10]*n,b+=t[S+11]*n}}let C=e*3,w=i[C],T=i[C+1],E=i[C+2];n[C]=l*w+u*T+d*E+f,n[C+1]=p*w+m*T+h*E+g,n[C+2]=_*w+v*T+y*E+b;let D=a[C],O=a[C+1],k=a[C+2],A=l*D+u*O+d*k,j=p*D+m*O+h*k,M=_*D+v*O+y*k,N=1/(Math.sqrt(A*A+j*j+M*M)||1);r[C]=A*N,r[C+1]=j*N,r[C+2]=M*N}}var Pn=new Map;function Fn(e,{detail:t=1}={}){let n=`${e.name}@${t}`;if(Pn.has(n))return Pn.get(n);let r=(e.cell??.012)/t,i=new Ve;e.sculpt(i);let a=e.bones.map(([e])=>e),o=Object.keys(e.materials),s=o.map(()=>[]),c=[],l=0;for(let[n,u]of i.split()){let i=He(u,{cell:e.cells?.[n]?Math.max(e.cells[n]/t,t<1?r*.35:0):r,bones:a,ambient:e.ambient??.3,shade:e.shade});c.push(i);for(let e=0;e<i.index.length;e+=3){let t=i.mats[i.index[e]],n=i.mats[i.index[e+1]],r=n===i.mats[i.index[e+2]]?n:t,a=o.indexOf(r);a<0&&(a=0),s[a].push(i.index[e]+l,i.index[e+1]+l,i.index[e+2]+l)}l+=i.count}let u=(e,t,n)=>{let r=new n(l*t),i=0;for(let n of c)r.set(n[e],i),i+=n.count*t;return r},d=new Uint32Array(s.reduce((e,t)=>e+t.length,0)),f=[],p=0;s.forEach((e,t)=>{e.length&&(d.set(e,p),f.push({start:p,count:e.length,materialIndex:t}),p+=e.length)});let m={position:u(`position`,3,Float32Array),normal:u(`normal`,3,Float32Array),color:u(`color`,3,Float32Array),skinIndex:u(`skinIndex`,4,Uint8Array),skinWeight:u(`skinWeight`,4,Float32Array),index:l>65535?d:Uint16Array.from(d),groups:f,count:l};return Pn.set(n,m),m}var In=new WeakMap;function Ln(e,t){let n=In.get(e);return n||In.set(e,n=new Map),n.has(t.name)||n.set(t.name,Object.entries(t.materials).map(([n,r])=>{let{emissive:i,sheenColor:a,attenuationColor:o,side:s,...c}=r,l=new e.MeshPhysicalMaterial({name:`${t.name}-${n}`,vertexColors:!0,roughness:.6,...c});return i&&l.emissive.set(i),a&&l.sheenColor.set(a),o&&l.attenuationColor.set(o),s===`double`&&(l.side=e.DoubleSide),c.opacity!==void 0&&c.opacity<1&&(l.transparent=!0),l})),n.get(t.name)}function Rn(e,t,n){Pn.set(`${e.name}@${t}`,n)}function zn(e,t,{detail:n=1}={}){let r=Fn(t,{detail:n}),i=new e.BufferGeometry,a=new e.BufferAttribute(r.position.slice(),3),o=new e.BufferAttribute(r.normal.slice(),3);i.setAttribute(`position`,a),i.setAttribute(`normal`,o),i.setAttribute(`color`,Un(e,r,`color`)),i.setIndex(Un(e,r,`index`));for(let e of r.groups)i.addGroup(e.start,e.count,e.materialIndex);i.computeBoundingSphere(),i.boundingSphere.radius*=1.5;let s=new e.Mesh(i,Ln(e,t));s.name=t.name,s.castShadow=!0,s.receiveShadow=!0;let c=new e.Group;s.scale.setScalar(t.scale??1),c.add(s);let l=new Mn(t.bones);return{def:t,group:c,mesh:s,skeleton:l,materials:s.material,pose(e){l.reset(),t.animate?.(l,e),l.compute(),Nn(r,l.matrices,a.array,o.array),a.needsUpdate=!0,o.needsUpdate=!0}}}var Bn=new WeakMap;function Vn(e,t,{detail:n=1}={}){let r=Fn(t,{detail:n}),i=Bn.get(r);if(i||Bn.set(r,i=new Map),!i.has(e)){let t=new e.BufferGeometry;t.setAttribute(`position`,new e.BufferAttribute(r.position,3)),t.setAttribute(`normal`,new e.BufferAttribute(r.normal,3)),t.setAttribute(`color`,Un(e,r,`color`)),t.setIndex(Un(e,r,`index`));for(let e of r.groups)t.addGroup(e.start,e.count,e.materialIndex);t.computeBoundingSphere(),i.set(e,t)}let a=new e.Mesh(i.get(e),Ln(e,t));return a.name=t.name,a.castShadow=!0,a.receiveShadow=!0,a.scale.setScalar(t.scale??1),a}var Hn=new WeakMap;function Un(e,t,n){let r=Hn.get(t);return r||Hn.set(t,r=new Map),r.has(n)||r.set(n,new e.BufferAttribute(t[n],n===`index`?1:3)),r.get(n)}var Wn=.26,Gn=.24,Kn=.16,qn=z(`#7c4b27`),Jn=z(`#3a2110`),Yn=z(`#a06a3a`),Xn=z(`#170b05`),Zn=e=>{let t=Math.sin(e*91.7+13.1)*43758.5;return t-Math.floor(t)},Qn=e=>{let t=e[1]>.264?Math.atan2(e[1]-Wn,e[2])/(Math.PI/5):e[1]/.0655,n=Math.floor(t),r=t-n,i=Math.abs(e[0])>.236?e[2]:e[0],a=B(Jn,qn,.45+.55*(ke(i*9+n*7.1,r*6+n*3.3,n*1.7)*.6+ke(i*40,r*30,n)*.4));a=B(a,Yn,Zn(n)*.35);let o=ke(i*14+40,r*3+n*5,2);return o>.78&&(a=B(a,Jn,(o-.78)*3)),B(Xn,a,We(.02,.09,Math.min(r,1-r)))},$n=V(`#3e3f45`,.18,50),er=z(`#6b3a1e`),tr=e=>B($n(e),er,Math.max(0,ke(e[0]*30,e[1]*30,e[2]*30)-.62)*2.2),nr=V(`#e9b84c`,.08,70),rr={name:`chest`,scale:1.15,cell:.0125,cells:{iron:.006,gold:.0065},bones:[[`root`,null,[0,0,0]]],materials:{oak:{roughness:.82},iron:{roughness:.42,metalness:.85},gold:{roughness:.28,metalness:1,emissive:`#3a2400`,emissiveIntensity:.6}},sculpt(e){let t={color:Qn,mat:`oak`};e.cylinder([0,Wn,0],Kn,Gn,{...t,rot:[0,0,Math.PI/2],k:0}),e.box([0,.36,0],[.3,.1,.3],0,{op:`inter`,k:0}),e.box([0,Wn/2,0],[Gn,Wn/2,Kn],.012,{...t,k:.004}),e.paint(e=>Math.abs(e[1]-Wn)-.003,`#120804`,.003);let n={color:tr,mat:`iron`,k:.002};for(let t of[1,-1]){e.cylinder([t*.155,Wn,0],.171,.021,{...n,rot:[0,0,Math.PI/2],round:.004}),e.box([t*.155,Wn/2,0],[.021,Wn/2,.171],.004,n);for(let r of[.07,.13,.19])e.sphere([t*.155,r,.17300000000000001],.0075,n)}for(let t of[1,-1])for(let r of[1,-1])for(let i of[.028,.23])e.box([t*.22399999999999998,i,r*.14400000000000002],[.026,.03,.026],.008,n);e.box([0,.3,0],[.4,.3,.4],0,{op:`inter`,k:0}),e.part(`iron`,()=>{for(let t of[1,-1])e.box([t*.244,.2,0],[.008,.022,.03],.004,n),e.torus([t*.254,.17,0],.036,.0075,{...n,rot:[0,0,Math.PI/2]})}),e.part(`gold`,()=>{let t={color:nr,mat:`gold`,k:.003};e.box([0,.225,.166],[.042,.045,.008],.008,t),e.box([0,.29000000000000004,.164],[.022,.045,.007],.006,{...t,rot:[-.2,0,0]}),e.cylinder([0,.23,.176],.009,.015,{op:`sub`,k:0,rot:[Math.PI/2,0,0]}),e.box([0,.21200000000000002,.176],[.0045,.016,.015],0,{op:`sub`,k:0})})}},ir=z(`#f0bf4c`),ar=z(`#8a5a14`),or=(e,t)=>n=>{let r=Math.hypot(n[0]-e[0],n[1]-e[1],n[2]-e[2])/t,i=ke(n[0]*220,n[1]*220,n[2]*220);return B(ar,ir,r>.82?.7+.3*We(.95,.85,r):.85+.25*i)},sr=[.13,.085,.13],cr=(e,t)=>sr[1]*Math.sqrt(Math.max(0,1-(e*e+t*t)/(sr[0]*sr[0])))-.01,lr=.034,ur=e=>[Math.asin(e[2]),0,Math.atan2(-e[0],e[1])],dr={name:`gold`,cell:.0068,cells:{gems:.0045},bones:[[`root`,null,[0,0,0]]],materials:{gold:{roughness:.3,metalness:1,emissive:`#3a2600`,emissiveIntensity:.8},gem:{roughness:.05,clearcoat:1,clearcoatRoughness:.05,emissive:`#400010`,emissiveIntensity:.6}},sculpt(e){e.ellipsoid([0,-.01,0],sr,{color:ar,mat:`gold`,k:0}),e.box([0,.1,0],[.3,.1,.3],0,{op:`inter`,k:0});for(let t=0;t<34;t++){let n=t*2.399963,r=Math.sqrt((t+.5)/34)*1.02,i=Math.cos(n)*sr[0]*r,a=Math.sin(n)*sr[0]*r,o=Math.max(.004,cr(i,a)),s=[i/(sr[0]*sr[0]),(o+.01)/(sr[1]*sr[1]),a/(sr[0]*sr[0])],c=Math.hypot(...s),l=[s[0]/c+Math.sin(t*3.7)*.2,s[1]/c,s[2]/c+Math.cos(t*5.1)*.2],u=Math.hypot(...l),d=[i,o+.003,a];e.cylinder(d,lr,.0045,{color:or(d,lr),mat:`gold`,k:0,round:.0025,rot:ur(l.map(e=>e/u))})}for(let[t,n,r]of[[.17,.05,.1],[-.16,.09,-.12],[.05,.18,.08],[-.06,-.17,.14]]){let i=[t,.006,n];e.cylinder(i,lr,.0045,{color:or(i,lr),mat:`gold`,k:0,round:.0025,rot:[r,0,r*.6]})}e.box([0,.15,0],[.4,.15,.4],0,{op:`inter`,k:0}),e.part(`gems`,()=>{e.box([.04,cr(.04,-.03)+.014,-.03],[.017,.017,.017],.003,{color:`#d0102c`,mat:`gem`,k:0,rot:[.62,.78,.2]}),e.ellipsoid([-.05,cr(-.05,.035)+.012,.035],[.024,.012,.014],{color:`#0f9a48`,mat:`gem`,k:0,rot:[0,.9,.2]}),e.box([.11,.012,-.11],[.012,.012,.012],.002,{color:`#2050e0`,mat:`gem`,k:0,rot:[.6,.2,.7]})})}},fr=V(`#eab54a`,.12,80),pr={name:`key`,scale:1.45,cell:.0052,bones:[[`root`,null,[0,0,0]]],materials:{gilt:{roughness:.26,metalness:1,emissive:`#3a2400`,emissiveIntensity:.9}},sculpt(e){let t={color:fr,mat:`gilt`,k:.007},n=[Math.PI/2,0,0];e.torus([0,.349,0],.03,.0095,{...t,rot:n});for(let r of[1,-1])e.torus([r*.034,.296,0],.03,.0095,{...t,rot:n});e.sphere([0,.314,0],.016,t),e.torus([0,.256,0],.017,.007,t),e.torus([0,.24,0],.014,.006,t),e.cylinder([0,.134,0],.012,.115,{...t,k:.004}),e.sphere([0,.016,0],.016,t),e.box([.04,.059,0],[.03,.036,.009],.003,{...t,k:.004}),e.box([.06,.064,0],[.012,.007,.02],.001,{op:`sub`,k:.002}),e.box([.048,.087,0],[.008,.009,.02],.001,{op:`sub`,k:.002}),e.box([.066,.034,0],[.006,.01,.02],.001,{op:`sub`,k:.002})}},mr=z(`#f4e6ea`),hr=e=>B(mr,z(`#c8a8b0`),Math.max(0,.06-e[1])*8),gr=e=>B(z(`#ff2a40`),z(`#ff8a70`),Math.max(0,ke(e[0]*40,e[1]*40,e[2]*40)-.5)),_r=V(`#b08452`,.25,90),vr=V(`#8a6a4a`,.2,120),yr={name:`potion`,scale:1.15,cell:.0075,cells:{cork:.006},bones:[[`root`,null,[0,0,0]]],materials:{glass:{roughness:.04,clearcoat:1,clearcoatRoughness:.03,opacity:.34},draught:{roughness:.2,emissive:`#ff1030`,emissiveIntensity:1.1},cork:{roughness:.9}},sculpt(e){e.sphere([0,.105,0],.1,{color:hr,mat:`glass`,k:0}),e.limb([0,.17,0],[0,.29,0],.033,.03,{color:hr,mat:`glass`,k:.035}),e.box([0,.2,0],[.2,.19,.2],0,{op:`inter`,k:0}),e.torus([0,.29,0],.031,.008,{color:hr,mat:`glass`,k:.006}),e.part(`draught`,()=>{e.sphere([0,.105,0],.088,{color:gr,mat:`draught`,k:0}),e.box([0,.075,0],[.12,.065,.12],0,{op:`inter`,k:.004})}),e.part(`cork`,()=>{e.cylinder([0,.31,0],.027,.024,{color:_r,mat:`cork`,k:0,round:.006}),e.torus([0,.262,0],.033,.0045,{color:vr,mat:`cork`,k:0}),e.limb([.03,.258,.012],[.042,.215,.026],.004,.003,{color:vr,mat:`cork`,k:.003}),e.limb([.032,.258,.006],[.05,.225,.004],.004,.003,{color:vr,mat:`cork`,k:.003})})}},br=()=>z(`#fff4dc`),xr=e=>B(z(`#ffc030`),z(`#fff0a0`),We(.05,.2,e[1])),Sr=V(`#eab54a`,.1,80),Cr=(e,t)=>n=>B(Sr(n),z(`#ff6a20`),We(e,t,Math.hypot(n[0],n[1]-.3))*.8),wr={chest:rr,gold:dr,potion:yr,revive:{name:`revive`,scale:1.15,cell:.0088,cells:{gilt:.006,wings:.0055},bones:[[`root`,null,[0,0,0]]],materials:{glass:{roughness:.04,clearcoat:1,clearcoatRoughness:.03,opacity:.3},elixir:{roughness:.2,emissive:`#ffa820`,emissiveIntensity:1.4},gilt:{roughness:.28,metalness:1,emissive:`#3a2400`,emissiveIntensity:.8}},sculpt(e){e.ellipsoid([0,.155,0],[.072,.115,.072],{color:br,mat:`glass`,k:0}),e.limb([0,.24,0],[0,.35,0],.03,.021,{color:br,mat:`glass`,k:.04}),e.box([0,.23,0],[.2,.2,.2],0,{op:`inter`,k:0}),e.part(`elixir`,()=>{e.ellipsoid([0,.155,0],[.062,.104,.062],{color:xr,mat:`elixir`,k:0}),e.box([0,.12,0],[.1,.1,.1],0,{op:`inter`,k:.004})}),e.part(`gilt`,()=>{let t={color:Sr,mat:`gilt`,k:.004};e.cylinder([0,.016,0],.052,.016,{...t,round:.007}),e.torus([0,.034,0],.044,.006,t);for(let n=0;n<6;n++){let r=n/6*Math.PI*2+.26,i=[.045,.09,.155,.22,.26].map(e=>{let t=(e-.155)/.116,n=.073*Math.sqrt(Math.max(0,1-t*t))+.003;return[Math.sin(r)*Math.max(n,.03),e,Math.cos(r)*Math.max(n,.03)]});e.chain(i,[.0055,.005,.005,.005,.005],t)}e.torus([0,.262,0],.031,.007,t),e.torus([0,.348,0],.024,.006,t)}),e.part(`wings`,()=>{for(let t of[1,-1])for(let n=0;n<5;n++){let r=.3+n*.28,i=.135-n*.014,a=[t*.03,.27+n*.004,-.004],o=[t*(.03+Math.cos(r)*i),.27+Math.sin(r)*i*.9+.02,-.012-n*.002];e.flake(a,o,[0,0,1],.019-n*.0018,.005,.32,{color:Cr(.06,.13),mat:`gilt`,k:.006})}e.limb([0,.36,0],[0,.4,0],.024,.013,{color:Cr(.06,.13),mat:`gilt`,k:.01}),e.limb([0,.4,0],[.006,.45,0],.013,.002,{color:Cr(.06,.13),mat:`gilt`,k:.01}),e.limb([0,.385,0],[-.016,.425,.004],.009,.0015,{color:Cr(.06,.13),mat:`gilt`,k:.008}),e.limb([0,.385,0],[.019,.418,-.004],.008,.0015,{color:Cr(.06,.13),mat:`gilt`,k:.008})})}},key:pr},Tr={...An,...wr},Er=new Map,Dr=new Map,Or=(e,t)=>`${e}@${t}`,kr=(e,t)=>Er.has(Or(e,t));function Ar(e){if(typeof Worker>`u`)return Promise.resolve();let t=Promise.all(e.filter(([e])=>Tr[e]).map(([e,t])=>jr(e,t)));return Promise.race([t,new Promise(e=>setTimeout(e,2e4))])}function jr(e,t){let n=Or(e,t);if(Er.has(n))return Promise.resolve();if(!Dr.has(n)){let e,t=new Promise(t=>{e=t});Dr.set(n,{p:t,resolve:e})}return Dr.get(n).p}function Mr(e=[...Object.keys(wr).map(e=>[e,1]),...Object.keys(An).map(e=>[e,.5])]){if(typeof Worker>`u`)return;let t=e.filter(([e,t])=>Tr[e]&&!Er.has(Or(e,t))),n=Math.max(1,Math.min(t.length,(navigator.hardwareConcurrency||4)-1,4));for(let e=0;e<n;e++){let e=new Worker(new URL(new URL(`bake.worker-B-_Bxq0o.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),n=()=>{let n=t.shift();if(!n){e.terminate();return}e.postMessage({name:n[0],detail:n[1]})};e.onmessage=({data:{name:e,detail:t,data:r}})=>{Rn(Tr[e],t,r);let i=Or(e,t);Er.set(i,!0),Dr.get(i)?.resolve(),n()},e.onerror=e=>console.error(`dungeon-roller: a model would not bake`,e),n()}}var Nr=(e,t,n)=>{let r=Math.sin(e*127.1+t*311.7+n*74.7)*43758.5453;return r-Math.floor(r)},Pr=(e,t,n)=>{let r=Math.floor(e),i=Math.floor(t),a=Math.floor(n),o=e-r,s=t-i,c=n-a,l=o*o*(3-2*o),u=s*s*(3-2*s),d=c*c*(3-2*c),f=(e,t,n)=>e+(t-e)*n;return f(f(f(Nr(r,i,a),Nr(r+1,i,a),l),f(Nr(r,i+1,a),Nr(r+1,i+1,a),l),u),f(f(Nr(r,i,a+1),Nr(r+1,i,a+1),l),f(Nr(r,i+1,a+1),Nr(r+1,i+1,a+1),l),u),d)*2-1};function Fr(e){let t=[];for(let n=0;n<13;n++){let r=n*2.399963+e,i=1-2*(n+.5)/13,a=Math.sqrt(Math.max(0,1-i*i)),o=[Math.cos(r)*a,i*.75,Math.sin(r)*a],s=Math.hypot(...o);t.push({n:o.map(e=>e/s),d:.74+Nr(n,n*3,7+e)*.2})}return t}var Ir=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Lr=[1,-1].map(e=>{let t=[e*.36,.2,.91],n=Math.hypot(...t);return t.map(e=>e/n)}),Rr=new Map;function zr(e,t){if(Rr.has(t))return Rr.get(t);let n=new e.IcosahedronGeometry(1,t>=1?5:3).toNonIndexed(),r=Fr(0),i=n.attributes.position.array,a=new Float32Array(i.length),o=new e.Color(`#8a8278`),s=new e.Color(`#453f39`),c=new e.Color(`#b8b0a2`),l=new e.Color(`#4f6a2a`),u=new e.Color(`#2c3d18`),d=new e.Color(`#1e1a17`),f=new e.Color,p=[0,0,0];for(let e=0;e<i.length;e+=3){let t=Math.hypot(i[e],i[e+1],i[e+2]),n=[i[e]/t,i[e+1]/t,i[e+2]/t],m=1+Pr(n[0]*2.1+11,n[1]*2.1,n[2]*2.1)*.19+Pr(n[0]*4.7,n[1]*4.7+5,n[2]*4.7)*.085+Pr(n[0]*11,n[1]*11,n[2]*11+3)*.03;p[0]=n[0]*m,p[1]=n[1]*m,p[2]=n[2]*m;for(let e of r){let t=p[0]*e.n[0]+p[1]*e.n[1]+p[2]*e.n[2];if(t>e.d)for(let n=0;n<3;n++)p[n]-=e.n[n]*(t-e.d)*.92}let h=0,g=0;for(let e of Lr){let t=n[0]*e[0]+n[1]*e[1]+n[2]*e[2];h=Math.max(h,Ir(.955,.99,t));let r=[e[0]*.92,e[1]+.28,e[2]*.95],i=Math.hypot(...r);g=Math.max(g,Ir(.96,.99,(n[0]*r[0]+n[1]*r[1]+n[2]*r[2])/i))}let _=1-h*.2+g*.07;p[0]*=_,p[1]*=_,p[2]*=_,p[1]<-.87&&(p[1]=-.87+(p[1]+.87)*.18),i[e]=p[0],i[e+1]=p[1]*.94,i[e+2]=p[2];let v=Pr(p[0]*6,p[1]*6,p[2]*6)*.5+.5,y=Nr(Math.round(p[0]*90),Math.round(p[1]*90),Math.round(p[2]*90));f.copy(o).lerp(s,v**1.6*.75).lerp(c,y>.93?.6:0);let b=Ir(.35,.75,n[1]+Pr(n[0]*3,n[1]*3+9,n[2]*3)*.35);b>0&&f.lerp(y>.5?l:u,b*.85),h>0&&f.lerp(d,h*.9),a[e]=f.r,a[e+1]=f.g,a[e+2]=f.b}return n.setAttribute(`color`,new e.BufferAttribute(a,3)),n.computeVertexNormals(),Rr.set(t,n),n}var Br=new Map;function Vr(e){if(Br.has(e))return Br.get(e);let t=e.attributes.position.array,n=new Set;for(let e=0;e<400;e++){let r=1-2*(e+.5)/400,i=Math.sqrt(1-r*r),a=e*2.399963,o=Math.cos(a)*i,s=Math.sin(a)*i,c=-1/0,l=0;for(let e=0;e<t.length;e+=3){let n=t[e]*o+t[e+1]*r+t[e+2]*s;n>c&&(c=n,l=e)}n.add(l)}let r=new Float32Array(n.size*3);return[...n].forEach((e,n)=>r.set(t.subarray(e,e+3),n*3)),Br.set(e,r),r}function Hr(e,t,n){let r=Math.cos(n),i=Math.sin(n),[a,o,s]=e;return t===0?(e[1]=o*r+s*i,e[2]=-o*i+s*r):t===1?(e[0]=a*r-s*i,e[2]=a*i+s*r):(e[0]=a*r+o*i,e[1]=-a*i+o*r),e}function Ur(e,t){let n=e.attributes.position.array,r=Math.hypot(...t),i=-1/0,a=.8;for(let e=0;e<n.length;e+=3){let o=Math.hypot(n[e],n[e+1],n[e+2]),s=(n[e]*t[0]+n[e+1]*t[1]+n[e+2]*t[2])/(o*r);s>i&&(i=s,a=o*s)}return a}function Wr(e,t,n,r,i=0){e.v+=(i-e.p)*t*r-e.v*n*r,e.p+=e.v*r}function Gr(e,{size:t=.8,detail:n=1,seed:r=0}={}){let i=t/2,a=new e.Group;a.name=`rock`;let o=new e.Group;a.add(o);let s=new e.Group;o.add(s);let c=new e.Group;c.scale.setScalar(i),s.add(c);let l=new e.MeshStandardMaterial({name:`granite`,vertexColors:!0,roughness:.92,metalness:.06,flatShading:!0}),u=zr(e,n),d=Vr(u),f=new e.Mesh(u,l);f.name=`rock-body`,f.castShadow=!0,f.receiveShadow=!0,c.add(f);let p=new e.MeshStandardMaterial({name:`rock-eye`,color:new e.Color(`#ffb070`),emissive:new e.Color(`#ff6a10`),emissiveIntensity:3}),m=Lr.map((t,n)=>{let r=n===0?1:-1,i=new e.Mesh(new e.SphereGeometry(.12,14,10),p),a=Ur(u,[t[0],t[1]*.94,t[2]])+.01;return i.position.set(t[0]*a,t[1]*.94*a,t[2]*a),i.scale.set(1.15,.55,.6),i.rotation.set(0,r*.36,r*-.35),i.castShadow=!1,c.add(i),i}),h={p:0,v:0},g={p:0,v:0},_={p:0,v:0},v={p:0,v:0},y={p:0,v:0},b=null,x=2+Nr(r,1,2)*2,S=0,C=!1;return{group:a,body:o,pose({clip:e=`idle`,t=0,time:n=0,seed:a=r,speed:l=1,pace:u}){let f=b===null?0:Math.min(.05,Math.max(0,n-b));b=n;let w=n+a,T=0,E=0,D=0,O=u??(e===`walk`?1.6*Math.max(.5,l):0),k=O>.05;if(k){y.v=O/i,y.p+=y.v*f;let e=Math.floor(y.p/1.1);e!==S&&(S=e,h.v+=1.6*Math.min(1.5,O),g.v+=(Nr(e,a,3)-.5)*1.2)}else C&&(y.p=Math.atan2(Math.sin(y.p),Math.cos(y.p))),Wr(y,60,7,f);if(C=k,e===`attack`){let e=Math.min(1,t/.3),n=Math.max(0,Math.min(1,(t-.3)/.14)),r=Math.max(0,Math.min(1,(t-.6)/.4));D=(-.12*Math.sin(e*Math.PI*.5)*(1-n)+.32*n)*(1-r*r*(3-2*r)),T=Math.sin(n*Math.PI)*.12,n>=1&&S!==-1&&(S=-1,h.v+=7),t<.05&&(S=0)}else if(e===`hit`){let e=Math.sin(Math.min(1,t/.45)*Math.PI);D=-.14*e,E=Math.sin(t*50)*.04*e}else if(e===`ko`){let e=Math.min(1,t/.5);E=e*e*1.35}else if(e===`idle`&&!k&&(x-=f,x<=0)){let e=Nr(Math.floor(w),a,5);e<.4?h.v+=2.4:e<.72?v.v+=(e<.56?-1:1)*2.6:(g.v+=(e-.86)*10,y.v-=1.4),x=2.4+Nr(a,Math.floor(w),9)*4}Wr(h,190,11,f),Wr(g,70,6.5,f,(k?0:Math.sin(w*1.05*2)*.055)+E),Wr(_,70,6.5,f,0),Wr(v,40,5,f,0);let A=k?0:Math.sin(w*1.25)*.008,j=y.p+D/i;s.rotation.set(j,0,0);let M=h.p*.09+A,N=i*(1+M*.55),P=i*(1-M);c.scale.set(N,P,N),o.rotation.set(_.p,v.p,g.p);let F=Hr(Hr(Hr(Hr([0,1,0],0,_.p),1,v.p),2,g.p),0,j),I=1/0;for(let e=0;e<d.length;e+=3)I=Math.min(I,F[0]*d[e]*N+F[1]*d[e+1]*P+F[2]*d[e+2]*N);o.position.set(0,T*i*2-I,D),p.emissiveIntensity=e===`ko`?Math.max(0,3*(1-t/.6)):3+Math.sin(w*3)*.6;for(let e of m)e.visible=p.emissiveIntensity>.05}}}function Kr(e){for(let t=0;t<e.length;t+=3){let n=e[t+1],r=1-.075*n-.055*n*n;e[t]*=.84*r,e[t+2]*=.84*r,e[t+1]=n*1.03+.01}return e}function qr(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,t|1);return e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Jr(e){let t=[];for(let n=0;n<18;n++){let r=n/18*Math.PI*2,i=n%2?.55+e()*.2:.95+e()*.3;t.push([.25+Math.cos(r)*.075*i,.47+Math.sin(r)*.095*i])}return t}var Yr=([e,t],n)=>{let r=!1;for(let i=0,a=n.length-1;i<n.length;a=i++){let[o,s]=n[i],[c,l]=n[a];s>t!=l>t&&e<(c-o)*(t-s)/(l-s)+o&&(r=!r)}return r};function Xr(e,t,n,{width:r=1024,height:i=512}={}){if(typeof document>`u`)return{map:null,bumpMap:null};let a=()=>{let e=document.createElement(`canvas`);return e.width=r,e.height=i,{el:e,ctx:e.getContext(`2d`)}},o=a(),s=a();if(!o.ctx||!s.ctx)return{map:null,bumpMap:null};let c=o.ctx,l=s.ctx;c.fillStyle=`#efe0c8`,c.fillRect(0,0,r,i),l.fillStyle=`#808080`,l.fillRect(0,0,r,i);let u=c.createLinearGradient(0,i*.55,0,i);u.addColorStop(0,`rgba(90,70,50,0)`),u.addColorStop(1,`rgba(90,70,50,0.45)`),c.fillStyle=u,c.fillRect(0,0,r,i);for(let e=0;e<700;e++){let e=n()*r,t=n()*i,a=(1.5+n()*5.5)*r/2048,o=.05+n()*.16;c.fillStyle=n()<.5?`rgba(168,132,86,${o})`:`rgba(120,104,88,${o*.8})`,c.beginPath(),c.ellipse(e,t,a,a*.8,0,0,Math.PI*2),c.fill(),l.fillStyle=`rgba(90,90,90,${o*1.6})`,l.beginPath(),l.ellipse(e,t,a,a*.8,0,0,Math.PI*2),l.fill()}c.strokeStyle=`rgba(70,40,18,0.9)`,c.lineWidth=7,c.lineJoin=`round`,c.beginPath(),t.forEach(([e,t],n)=>n?c.lineTo(e*r,t*i):c.moveTo(e*r,t*i)),c.closePath(),c.stroke();let d=(e,t,r,i,a)=>{c.strokeStyle=`rgba(40,24,14,0.85)`,l.strokeStyle=`rgba(10,10,10,1)`,c.lineWidth=a,l.lineWidth=a*1.6,c.lineCap=l.lineCap=`round`;for(let o=0;o<i;o++){let o=e+Math.cos(r)*9,s=t+Math.sin(r)*6;for(let n of[c,l])n.beginPath(),n.moveTo(e,t),n.lineTo(o,s),n.stroke();e=o,t=s,r+=(n()-.5)*1.1,n()<.12&&a>1&&d(e,t,r+(n()<.5?.8:-.8),Math.floor(i*.5),a*.7)}};t.forEach(([e,t],a)=>{if(a%2)return;let o=Math.atan2((t-.47)*1.2,e-.25);d(e*r,t*i,o,10+Math.floor(n()*14),2.6)});let f=new e.CanvasTexture(o.el);return f.colorSpace=e.SRGBColorSpace,f.anisotropy=4,{map:f,bumpMap:new e.CanvasTexture(s.el)}}var Zr=null;function Qr(e){if(Zr)return Zr;let t=qr(7),n=Jr(t),r=new e.SphereGeometry(1,128,96);Kr(r.attributes.position.array),r.computeVertexNormals();let i=r.attributes.uv.array,a=r.index.array,o=[];for(let e=0;e<a.length;e+=3){let[t,r,s]=[a[e],a[e+1],a[e+2]];Yr([(i[t*2]+i[r*2]+i[s*2])/3,1-(i[t*2+1]+i[r*2+1]+i[s*2+1])/3],n)||o.push(t,r,s)}let s=new Map;for(let e=0;e<o.length;e+=3)for(let t=0;t<3;t++){let n=o[e+t],r=o[e+(t+1)%3],i=n<r?`${n},${r}`:`${r},${n}`;s.set(i,(s.get(i)??0)+1)}let c=new Set;for(let[e,t]of s)if(t===1)for(let t of e.split(`,`))c.add(Number(t));let l=r.attributes.position.array,u=new Float32Array(3);for(let e of c){let t=i[e*2],r=1-i[e*2+1];if(Math.abs(t-.25)>.2)continue;let a=1/0,o=t,s=r;for(let e=0;e<n.length;e++){let[i,c]=n[e],[l,u]=n[(e+1)%n.length],d=l-i,f=u-c,p=Math.max(0,Math.min(1,((t-i)*d+(r-c)*f)/(d*d+f*f))),m=i+d*p,h=c+f*p,g=(m-t)**2+(h-r)**2;g<a&&(a=g,o=m,s=h)}let c=o*Math.PI*2,d=s*Math.PI;u[0]=-Math.cos(c)*Math.sin(d),u[1]=Math.cos(d),u[2]=Math.sin(c)*Math.sin(d),Kr(u),l.set(u,e*3),i[e*2]=o,i[e*2+1]=1-s}return r.setIndex(o),r.computeVertexNormals(),Zr={geometry:r,skin:Xr(e,n,t)},Zr}function $r(e,t,n,r,i=0){e.v+=(i-e.p)*t*r-e.v*n*r,e.p+=e.v*r}function ei(e,{height:t=1.9,seed:n=0}={}){let r=t/2.07,i=new e.Group;i.name=`egg`;let a=new e.Group;i.add(a);let o=new e.Group;a.add(o);let s=new e.Group;s.scale.setScalar(r),s.position.y=1.02*r,o.add(s);let{geometry:c,skin:l}=Qr(e),u=new e.MeshPhysicalMaterial({name:`eggshell`,color:new e.Color(l.map?`#ffffff`:`#efe0c8`),map:l.map,bumpMap:l.bumpMap,bumpScale:.7,roughness:.52,clearcoat:.35,clearcoatRoughness:.6,sheen:.4,sheenColor:new e.Color(`#fff2dd`),side:e.DoubleSide}),d=new e.Mesh(c,u);d.name=`egg-shell`,d.castShadow=!0,d.receiveShadow=!0,s.add(d);let f=new e.MeshStandardMaterial({name:`egg-yolk`,color:new e.Color(`#ffb21a`),emissive:new e.Color(`#ff7a00`),emissiveIntensity:1.6,roughness:.4}),p=new e.Mesh(new e.SphereGeometry(.62,48,32),f);p.position.set(0,-.05,.12),s.add(p);let m=new e.Group;m.position.set(0,-.02,.69),s.add(m);let h=new e.Mesh(new e.SphereGeometry(.2,32,20),new e.MeshPhysicalMaterial({name:`egg-iris`,color:new e.Color(`#ff3a10`),emissive:new e.Color(`#ff2a00`),emissiveIntensity:2.2,roughness:.1,clearcoat:1,clearcoatRoughness:.03}));h.scale.set(1,1,.45);let g=new e.Mesh(new e.SphereGeometry(.2,24,16),new e.MeshPhysicalMaterial({name:`egg-pupil`,color:new e.Color(`#050202`),roughness:.05,clearcoat:1}));g.scale.set(.22,.8,.2),g.position.z=.07,m.add(h,g);for(let e of[p,h,g])e.castShadow=!1;let _={p:0,v:0},v={p:0,v:0},y={p:0,v:0},b={p:0,v:0},x=null,S=0,C=0,w=0,T=2.4,E=!1;return{group:i,body:a,pose({clip:e=`idle`,t:i=0,time:c=0,seed:l=n,speed:u=1}){let d=x===null?0:Math.min(.05,Math.max(0,c-x));x=c;let p=c+l,h=Math.sin(p*2)*.05,g=0,D=0,O=0,k=0;if(e===`walk`)h=Math.sin(p*6*Math.max(.5,u))*.16,D=Math.abs(Math.sin(p*6*Math.max(.5,u)))*.04,g=.08;else if(e===`attack`)O=Math.min(1,i/.18)*(1-Math.max(0,Math.min(1,(i-.45)/.2))),k=26*O,i>.6&&!E&&(E=!0,_.v+=5),i<.05&&(E=!1);else if(e===`hit`){let e=Math.sin(Math.min(1,i/.4)*Math.PI);g=-.25*e,h=Math.sin(i*30)*.12*e}else if(e===`ko`)O=Math.min(1,i/.5);else if(T-=d,T<=0){let e=Math.sin(p*12.9898)*43758.5453%1;Math.abs(e)<.45?_.v+=1.8:Math.abs(e)<.75?b.v+=(e<0?-1:1)*2.2:(v.v+=e*4,y.v+=1.2),T=2.6+Math.abs(e)*4}w+=(O-w)*Math.min(1,d*8),C+=(k-C)*Math.min(1,d*4),S+=C*d,$r(_,175,10.5,d),$r(v,68,6.2,d,h),$r(y,68,6.2,d,g),$r(b,38,4.8,d,0);let A=Math.sin(p*1.3)*.007;a.position.set(0,D*t+Math.abs(h)*.34*r*(1-w)+w*.84*r,0),a.rotation.set(y.p*(1-w),b.p+S,v.p*(1-w)),o.rotation.set(-w*Math.PI*.5,0,0);let j=_.p*.085+A;s.scale.set(r*(1+j*.5),r*(1-j),r*(1+j*.5)),m.rotation.set(Math.sin(p*.7)*.15,Math.sin(p*.43)*.35,0);let M=e===`ko`?Math.min(1,i/.4):0;m.scale.set(1,e===`attack`?.6:1-M*.9,1),f.emissiveIntensity=(1.6+Math.sin(p*2.2)*.35)*(1-M*.85)}}}var ti=[`#38f2b6`,`#37c8f7`,`#8f7bff`,`#ff62c8`,`#ffc861`],ni=`varying vec3 vN; varying vec3 vP;
void main() {
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position * 1.035, 1.0);
  vP = mv.xyz;
  gl_Position = projectionMatrix * mv;
}`,ri=`uniform vec3 uColor; uniform float uStrength;
varying vec3 vN; varying vec3 vP;
void main() {
  float f = 1.0 - abs(dot(normalize(vN), normalize(-vP)));
  float a = pow(f, 2.2) * (1.0 - pow(f, 8.0)) * uStrength;
  gl_FragColor = vec4(uColor * a, a);
}`,ii=`struct Varyings { @builtin(position) position: vec4f, @location(0) vN: vec3f, @location(1) vP: vec3f };
@vertex fn vs(@location(0) position: vec3f, @location(1) normal: vec3f) -> Varyings {
  var out: Varyings;
  out.vN = normalize(object.normalMatrix * normal);
  let mv = object.modelViewMatrix * vec4f(position * 1.035, 1.0);
  out.vP = mv.xyz;
  out.position = object.projectionMatrix * mv;
  return out;
}
@fragment fn fs(in: Varyings) -> @location(0) vec4f {
  let f = 1.0 - abs(dot(normalize(in.vN), normalize(-in.vP)));
  let a = pow(f, 2.2) * (1.0 - pow(f, 8.0)) * material.uStrength;
  return vec4f(material.uColor * a, a);
}`;function ai(e=5){let t=[];for(let n=0;n<e;n++){let r=n*2.399963,i=1-2*(n+.5)/e,a=Math.sqrt(1-i*i);t.push({dir:[Math.cos(r)*a,i,Math.sin(r)*a],freq:1+n*.42,speed:.45+n*.19,amp:.115/(1+n*.6),phase:n*1.7})}return t}var oi=ai();function si(e,t,n,{wobble:r,phase:i,ampScale:a,freqScale:o,phaseScale:s,sx:c,sy:l,dome:u}){let d=e.array;for(let e=0;e<d.length;e+=3){let f=t[e],p=t[e+1],m=t[e+2],h=0;for(let e of n)h+=e.amp*a*Math.sin(e.freq*(f*e.dir[0]+p*e.dir[1]+m*e.dir[2])*o+i*e.speed*s+e.phase);let g=1+h*r,_=f*g*c,v=p*g*l,y=m*g*c;if(u){if(v<-.35*l){let e=(-.35*l-v)/(.65*l);v=-.35*l-e*.08*l,_*=1+e*.12,y*=1+e*.12}v+=.43*l}d[e]=_,d[e+1]=v,d[e+2]=y}e.needsUpdate=!0}function ci(e,{size:t=.85,hue:n=0,detail:r=1}={}){let i=t/2,a=new e.Group;a.name=`slime`;let o=new e.Group;o.scale.setScalar(i),a.add(o);let s=ti.map(t=>new e.Color(t)),c=(e,t)=>{let n=(e%s.length+s.length)%s.length,r=Math.floor(n);return t.copy(s[r]).lerp(s[(r+1)%s.length],n-r)},l=r>=1,u=new e.MeshPhysicalMaterial({name:l?`slime-shell`:`slime-shell-board`,color:new e.Color(`#38f2b6`),transparent:!0,opacity:l?.8:.62,transmission:l?.9:0,thickness:.35,ior:1.3,roughness:.08,clearcoat:1,clearcoatRoughness:.06,iridescence:.35,iridescenceIOR:1.35,attenuationDistance:2.4,attenuationColor:new e.Color(`#7ff0d8`),sheen:.5,sheenRoughness:.5,sheenColor:new e.Color(`#ffffff`),emissive:new e.Color(`#000000`),emissiveIntensity:l?0:.35,depthWrite:l}),d=new e.SphereGeometry(1,Math.round(72*r)+16,Math.round(48*r)+10),f=d.attributes.position.array.slice(),p=new e.Mesh(d,u);p.name=`slime-shell`,p.castShadow=!0;let m=new e.ShaderMaterial({name:`slime-glow`,uniforms:{uColor:{value:new e.Color(`#38f2b6`)},uStrength:{value:.5}},glsl:{vertex:ni,fragment:ri},wgsl:ii,transparent:!0,blending:e.AdditiveBlending,depthWrite:!1}),h=new e.Mesh(d,m);h.name=`slime-glow`;let g=new e.MeshPhysicalMaterial({name:`slime-eye`,color:new e.Color(`#f6fff9`),roughness:.1,clearcoat:1,clearcoatRoughness:.05}),_=new e.MeshPhysicalMaterial({name:`slime-pupil`,color:new e.Color(`#06100c`),roughness:.05,clearcoat:1,clearcoatRoughness:.02}),v=new e.MeshBasicMaterial({name:`slime-glint`,color:new e.Color(`#ffffff`)}),y=new e.Group;for(let t of[1,-1]){let n=new e.Group;n.position.set(t*.3,.62,.72),n.rotation.y=t*.32;let r=new e.Mesh(new e.SphereGeometry(.17,20,14),g);r.scale.set(1,1.15,.7);let i=new e.Mesh(new e.SphereGeometry(.1,16,12),_);i.position.set(-t*.02,-.02,.085),i.scale.set(1,1.2,.55);let a=new e.Mesh(new e.SphereGeometry(.03,8,6),v);a.position.set(-t*.05,.04,.13),n.add(r,i,a),y.add(n)}let b=new e.MeshPhysicalMaterial({name:`slime-bubble`,color:new e.Color(`#eafffb`),roughness:.05,transmission:l?.95:0,thickness:.15,ior:1.2,transparent:!0,opacity:.5}),x=Array.from({length:5},(t,n)=>{let r=new e.Mesh(new e.SphereGeometry(.05+n%3*.03,12,8),b);return r.userData.orbit={a:n*2.399963,rr:.35+n%4*.1,y:.15+n*.12,sp:.25+n%3*.14},r});o.add(p,y,h,...x);for(let e of[h,y,...x])e.traverse(e=>{e.castShadow=!1});let S=new e.Color,C=new e.Color(`#ffffff`),w=(n%ti.length+ti.length)%ti.length,T=-1/0,E=null;return{group:a,body:o,pose({clip:e=`idle`,t=0,time:n=0,seed:r=0,speed:i=1}){let a=n+r,o=1.15,s=1,p=1,h=.72,g=1;if(e===`walk`){let e=Math.sin(a*7*Math.max(.5,i));o=1.4,s=2,p=1+e*.08,h=.72-e*.08}else if(e===`attack`){let e=Math.min(1,t/.24),n=Math.max(0,Math.min(1,(t-.24)/.1)),r=Math.max(0,Math.min(1,(t-.36)/.3)),i=e*(1-n),a=n*(1-r);h=.72+i*.45-a*.3,p=1-i*.18+a*.3,o=1.2+a*2,s=2.5,g=1+i}else if(e===`hit`){let e=Math.sin(Math.min(1,t/.45)*Math.PI);o=1.15+e*3,s=4,p=1+Math.sin(t*40)*.08*e,h=.72-Math.sin(t*40)*.08*e}else if(e===`ko`){let e=Math.min(1,t/.6);h=.72*(1-e*.8),p=1+e*.45,o=1.15*(1-e*.7),g=1-e*.85}let _=a*s;if(h*=1+Math.sin(_*1.5)*.035,n-T<1/30&&n>=T&&e===E)return;T=n,E=e,si(d.attributes.position,f,oi,{wobble:o,phase:_,ampScale:1,freqScale:2.35,phaseScale:2.2,sx:p,sy:h,dome:!0}),d.computeVertexNormals(),y.position.set(0,(h-.72)*.7+0,(p-1)*.6),y.scale.set(1,Math.min(1.1,h/.72),1);let v=Math.sin(a*.7)>.985?.15:1;for(let t of y.children)t.scale.y=e===`ko`?.15:v;c(w+Math.sin(a*.13)*.35,S),u.color.copy(S),l||u.emissive.copy(S),u.attenuationColor.copy(S).lerp(C,.35),m.uniforms.uColor.value.copy(S),m.uniforms.uStrength.value=.72*g*(.85+Math.sin(_*2.1)*.15);for(let e of x){let t=e.userData.orbit,n=t.a+_*t.sp;e.position.set(Math.cos(n)*t.rr*p,(t.y+Math.sin(_*.8+t.a)*.08)*h/.72+.05,Math.sin(n)*t.rr*p)}}}}var li={slime:ci,rock:Gr,egg:ei};function ui(e,t,{detail:n=1,...r}={}){return li[t]?li[t](e,{detail:n,...r}):zn(e,An[t],{detail:n})}var di=Object.freeze({rat:{name:`Giant Rat`,move:`walk`,dc:6,power:3,gold:4,radius:.26,speed:4.2},skeleton:{name:`Skeleton`,move:`walk`,dc:10,power:5,gold:12,radius:.32,speed:3},goblin:{name:`Goblin`,move:`walk`,dc:9,power:4,gold:10,radius:.3,speed:3.8},orc:{name:`Orc Brute`,move:`walk`,dc:13,power:6,gold:25,radius:.4,speed:2.6},slime:{name:`Slime`,move:`crawl`,dc:8,power:4,gold:8,radius:.42,speed:1.4},egg:{name:`Eggdreessen`,move:`walk`,dc:16,power:10,gold:200,radius:.8,speed:1.2,boss:!0},rock:{name:`Boulder`,move:`walk`,dc:12,power:5,gold:16,radius:.4,speed:2.2},bat:{name:`Cave Bat`,move:`fly`,dc:7,power:2,gold:5,radius:.28,speed:2.4},wraith:{name:`Wraith`,move:`fly`,dc:14,power:6,gold:30,radius:.34,speed:1.8},dragon:{name:`Red Dragon`,move:`walk`,dc:17,power:12,gold:250,radius:.85,speed:1.4,boss:!0}}),fi=.75,pi=.5;function mi(e,t,{seed:n=0}={}){if(li[t])return gi(e,t,n);if(An[t])return _i(e,t);throw Error(`no look for a ${t}`)}function hi(){let e=`idle`,t=0;return(n,r,{striking:i=!1,down:a=!1}={})=>{let o=a?`ko`:i?`attack`:r?`walk`:`idle`;return e===`attack`&&!a&&n-t<.9?o=`attack`:e===`attack`&&o===`attack`&&(t=n),o!==e&&(e=o,t=n),{clip:e,t:n-t}}}function gi(e,t,n){let r=new e.Group;r.name=t;let i=new e.Group;r.add(i);let a=ui(e,t,{detail:pi,hue:n});i.add(a.group);let o=hi();return{group:r,body:i,look:a,animate(e,t,{chasing:n=!1,pace:r,...i}={}){a.pose({...o(e,t,i),time:e,speed:n?1:.6,pace:r})}}}function _i(e,t){let n=new e.Group;n.name=t;let r=new e.Group;n.add(r);let i=null,a=()=>{i=ui(e,t,{detail:pi}),r.add(i.group)};kr(t,.5)?a():typeof window<`u`&&jr(t,pi).then(a);let o=hi(),s=0;return{group:n,body:r,animate(e,t,{chasing:n=!1,...r}={}){i&&(i.pose({...o(e,t,r),time:e,speed:n?1:.6}),s=e)},get posedAt(){return s}}}var vi=`varying vec3 vWorld;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}`,yi=`uniform float uTime;
uniform float uBright;
varying vec3 vWorld;
float hash1(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec2 hash2(vec2 p) { return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash1(i), hash1(i + vec2(1.0, 0.0)), u.x), mix(hash1(i + vec2(0.0, 1.0)), hash1(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { s += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return s;
}
// The crust's plates: distance to the nearest plate's middle, and how far from the crack to the next.
vec2 plates(vec2 p, float t) {
  vec2 i = floor(p), f = fract(p);
  float d1 = 8.0, d2 = 8.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = 0.5 + 0.4 * sin(t * 0.3 + 6.2831 * hash2(i + g));
      float d = length(g + o - f);
      if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
    }
  }
  return vec2(d1, d2 - d1);
}
void main() {
  float t = uTime;
  vec2 p = vWorld.xz;
  vec2 warp = vec2(fbm(p * 0.7 + vec2(t * 0.05, 0.0)), fbm(p * 0.7 + vec2(3.1, -t * 0.04)));
  vec2 q = p * 1.5 + warp * 1.3;
  vec2 v = plates(q, t);
  float crack = 1.0 - smoothstep(0.03, 0.17, v.y);
  float pool = smoothstep(0.5, 0.76, fbm(p * 0.8 + vec2(t * 0.06, -t * 0.045)));
  float heat = clamp(crack + pool, 0.0, 1.0);
  vec3 crust = mix(vec3(0.1, 0.03, 0.018), vec3(0.62, 0.12, 0.02), (1.0 - smoothstep(0.0, 0.36, v.y)) * 0.9);
  crust *= 0.75 + 0.5 * vnoise(q * 5.0);
  vec3 melt = mix(vec3(1.0, 0.3, 0.02), vec3(1.0, 0.86, 0.42), heat * heat);
  float pulse = 0.82 + 0.18 * sin(t * 1.9 + fbm(p * 1.7) * 6.0);
  vec3 col = mix(crust, melt * pulse, heat);
  // Bubbles: here and there a swelling bright ring that bursts.
  vec2 cell = floor(p * 1.25);
  float pick = hash1(cell);
  if (pick > 0.72) {
    vec2 at = (cell + 0.25 + 0.5 * hash2(cell + 7.0)) / 1.25;
    float phase = fract(t * (0.18 + pick * 0.2) + pick * 9.0);
    float r = phase * 0.28, d = length(p - at);
    float ring = (1.0 - smoothstep(0.0, 0.035, abs(d - r))) * (1.0 - phase);
    float dome = (1.0 - smoothstep(0.0, r, d)) * (1.0 - phase) * 0.6;
    col = mix(col, vec3(1.0, 0.72, 0.25), clamp((ring + dome) * (0.35 + 0.65 * pool), 0.0, 1.0));
  }
  gl_FragColor = vec4(col * uBright, 1.0);
}`,bi=`struct Varyings { @builtin(position) position: vec4f, @location(0) world: vec3f };
@vertex fn vs(@location(0) position: vec3f) -> Varyings {
  var out: Varyings;
  let world = object.modelMatrix * vec4f(position, 1.0);
  out.world = world.xyz;
  out.position = object.projectionMatrix * object.viewMatrix * world;
  return out;
}
fn hash1(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(12.9898, 78.233))) * 43758.5453); }
fn hash2(p: vec2f) -> vec2f { return fract(sin(vec2f(dot(p, vec2f(127.1, 311.7)), dot(p, vec2f(269.5, 183.3)))) * 43758.5453); }
fn vnoise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash1(i), hash1(i + vec2f(1.0, 0.0)), u.x), mix(hash1(i + vec2f(0.0, 1.0)), hash1(i + vec2f(1.0, 1.0)), u.x), u.y);
}
fn fbm(p0: vec2f) -> f32 {
  var p = p0;
  var s = 0.0;
  var a = 0.5;
  for (var i = 0; i < 4; i++) { s += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return s;
}
fn plates(p: vec2f, t: f32) -> vec2f {
  let i = floor(p);
  let f = fract(p);
  var d1 = 8.0;
  var d2 = 8.0;
  for (var y = -1; y <= 1; y++) {
    for (var x = -1; x <= 1; x++) {
      let g = vec2f(f32(x), f32(y));
      let o = 0.5 + 0.4 * sin(t * 0.3 + 6.2831 * hash2(i + g));
      let d = length(g + o - f);
      if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
    }
  }
  return vec2f(d1, d2 - d1);
}
@fragment fn fs(in: Varyings) -> @location(0) vec4f {
  let t = material.uTime;
  let p = in.world.xz;
  let warp = vec2f(fbm(p * 0.7 + vec2f(t * 0.05, 0.0)), fbm(p * 0.7 + vec2f(3.1, -t * 0.04)));
  let q = p * 1.5 + warp * 1.3;
  let v = plates(q, t);
  let crack = 1.0 - smoothstep(0.03, 0.17, v.y);
  let pool = smoothstep(0.5, 0.76, fbm(p * 0.8 + vec2f(t * 0.06, -t * 0.045)));
  let heat = clamp(crack + pool, 0.0, 1.0);
  var crust = mix(vec3f(0.1, 0.03, 0.018), vec3f(0.62, 0.12, 0.02), (1.0 - smoothstep(0.0, 0.36, v.y)) * 0.9);
  crust *= 0.75 + 0.5 * vnoise(q * 5.0);
  let melt = mix(vec3f(1.0, 0.3, 0.02), vec3f(1.0, 0.86, 0.42), heat * heat);
  let pulse = 0.82 + 0.18 * sin(t * 1.9 + fbm(p * 1.7) * 6.0);
  var col = mix(crust, melt * pulse, heat);
  let cell = floor(p * 1.25);
  let pick = hash1(cell);
  if (pick > 0.72) {
    let at = (cell + 0.25 + 0.5 * hash2(cell + 7.0)) / 1.25;
    let phase = fract(t * (0.18 + pick * 0.2) + pick * 9.0);
    let r = phase * 0.28;
    let d = length(p - at);
    let ring = (1.0 - smoothstep(0.0, 0.035, abs(d - r))) * (1.0 - phase);
    let dome = (1.0 - smoothstep(0.0, max(r, 0.001), d)) * (1.0 - phase) * 0.6;
    col = mix(col, vec3f(1.0, 0.72, 0.25), clamp((ring + dome) * (0.35 + 0.65 * pool), 0.0, 1.0));
  }
  return vec4f(col * material.uBright, 1.0);
}`;function xi(e){return new e.ShaderMaterial({name:`lava`,uniforms:{uTime:{value:0},uBright:{value:1}},glsl:{vertex:vi,fragment:yi},wgsl:bi})}var Si=new Map;function Ci(e){let t=e;return()=>(t=t*16807%2147483647,(t-1)/2147483646)}function wi(e,t=e){let n=document.createElement(`canvas`);return n.width=e,n.height=t,[n,n.getContext(`2d`)]}function Ti(e,t,{srgb:n=!0}={}){let r=new e.CanvasTexture(t);return n&&(r.colorSpace=e.SRGBColorSpace),r.anisotropy=8,r}var Ei=(e,t)=>typeof document>`u`?{map:null,bump:null}:(Si.has(e)||Si.set(e,t()),Si.get(e));function Di(e){return Ei(`stone`,()=>{let t=Ci(11),n=[[0,0,.56,.47],[.56,0,.44,.62],[0,.47,.42,.53],[.42,.62,.58,.38],[.42,.47,.14,.15]],r=Array.from({length:900},()=>[t()*256,t()*256,t(),t()*1.6+.4]),i=Array.from({length:2},()=>{let e=t()*256,n=t()*256,r=[[e,n]];for(let i=0;i<6;i++)e+=(t()-.5)*40,n+=(t()-.5)*40,r.push([e,n]);return r}),a=(e,t,a,o)=>{let[s,c]=wi(256);c.fillStyle=a,c.fillRect(0,0,256,256);for(let[r,i,a,o]of n){let n=r*256+3,s=i*256+3,l=a*256-6,u=o*256-6;for(let r=0;r<=8;r++)c.fillStyle=ji(t,e,Math.sin(r/8*Math.PI/2)),c.beginPath(),c.roundRect(n+r,s+r,l-r*2,u-r*2,10-r),c.fill()}for(let[e,t,n,i]of r)c.fillStyle=o(n),c.fillRect(e,t,i,i);c.strokeStyle=a,c.globalAlpha=.45,c.lineWidth=1;for(let e of i)c.beginPath(),e.forEach(([e,t],n)=>n?c.lineTo(e,t):c.moveTo(e,t)),c.stroke();return c.globalAlpha=1,s};return{map:Ti(e,a(`#e8e4dc`,`#a9a49b`,`#2a2622`,e=>e>.5?`rgba(255,255,255,0.22)`:`rgba(0,0,0,0.18)`)),bump:Ti(e,a(`#ffffff`,`#707070`,`#000000`,e=>e>.5?`rgba(255,255,255,0.3)`:`rgba(0,0,0,0.3)`),{srgb:!1})}})}function Oi(e){return Ei(`brick`,()=>{let t=Ci(5),n=Array.from({length:40},()=>t()),r=(e,t,r)=>{let[i,a]=wi(256);a.fillStyle=t,a.fillRect(0,0,256,256);let o=0;for(let t=0;t<4;t++){let i=t%2*128/2;for(let s=-1;s<3;s++){let c=s*128+i;a.fillStyle=r?ji(e,`#8a847a`,n[o++%n.length]*.5):e,a.beginPath(),a.roundRect(c+4,t*64+4,120,56,5),a.fill()}}return i};return{map:Ti(e,r(`#e2ddd4`,`#3a342e`,!0)),bump:Ti(e,r(`#ffffff`,`#000000`,!1),{srgb:!1})}})}function ki(e){return Ei(`runes`,()=>{let t=Ci(31),[n,r]=wi(512);r.clearRect(0,0,512,512),r.strokeStyle=`#9fe1ff`,r.fillStyle=`#9fe1ff`,r.shadowColor=`#4ab8ff`,r.shadowBlur=18;for(let[e,t]of[[235.52,6],[199.68,3],[107.52,4]])r.lineWidth=t,r.beginPath(),r.arc(256,256,e,0,Math.PI*2),r.stroke();r.lineWidth=4;for(let e=0;e<18;e++){let n=e/18*Math.PI*2;r.save(),r.translate(256+Math.cos(n)*256*.85,256+Math.sin(n)*256*.85),r.rotate(n+Math.PI/2),r.beginPath();let i=2+Math.floor(t()*3);for(let e=0;e<i;e++)r.moveTo((t()-.5)*22,(t()-.5)*22),r.lineTo((t()-.5)*22,(t()-.5)*22);r.stroke(),r.restore()}r.lineWidth=3,r.beginPath();for(let e=0;e<=5;e++){let t=e*2*2*Math.PI/5-Math.PI/2,n=256+Math.cos(t)*256*.4,i=256+Math.sin(t)*256*.4;e?r.lineTo(n,i):r.moveTo(n,i)}return r.stroke(),{map:Ti(e,n),bump:null}})}function Ai(e){return Ei(`glow`,()=>{let[t,n]=wi(64),r=n.createRadialGradient(32,32,0,32,32,32);return r.addColorStop(0,`rgba(255, 220, 150, 1)`),r.addColorStop(.25,`rgba(255, 150, 60, 0.45)`),r.addColorStop(1,`rgba(255, 90, 20, 0)`),n.fillStyle=r,n.fillRect(0,0,64,64),{map:Ti(e,t),bump:null}})}function ji(e,t,n){let r=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)),[i,a]=[r(e),r(t)];return`rgb(${i.map((e,t)=>Math.round(e+(a[t]-e)*n)).join(`,`)})`}function Mi(e,t){let n=new e.Group;n.name=`dungeon`;let r=t=>{let n=new e.BufferGeometry;return n.setAttribute(`position`,new e.BufferAttribute(t.position,3)),n.setAttribute(`normal`,new e.BufferAttribute(t.normal,3)),n.setAttribute(`color`,new e.BufferAttribute(t.color,3)),n.setAttribute(`uv`,new e.BufferAttribute(t.uv,2)),n.computeBoundingSphere(),n},i=Di(e),a=Oi(e),o=new e.Mesh(r(t.tops),new e.MeshPhysicalMaterial({name:`flagstones`,vertexColors:!0,map:i.map,bumpMap:i.bump,bumpScale:2.2,roughness:.82,metalness:0,clearcoat:.12,clearcoatRoughness:.5})),s=new e.Mesh(r(t.walls),new e.MeshStandardMaterial({name:`bricks`,vertexColors:!0,map:a.map,bumpMap:a.bump,bumpScale:2.5,roughness:.9}));for(let e of[o,s])e.receiveShadow=!0,e.castShadow=!0,e.frustumCulled=!1,n.add(e);let c=null;if(t.lava.position.length){c=xi(e);let i=new e.Mesh(r(t.lava),c);i.frustumCulled=!1,n.add(i)}return{group:n,update(e){c&&(c.uniforms.uTime.value=e,c.uniforms.uBright.value=.94+.06*Math.sin(e*1.7))}}}function Ni(e,t){let n=new e.Group;n.name=`torches`;let r=new e.MeshStandardMaterial({name:`sconce`,color:new e.Color(`#3b3936`),roughness:.5,metalness:.8}),i=new e.MeshBasicMaterial({name:`flame`,color:new e.Color(`#ff8a2a`),transparent:!0,opacity:.9,toneMapped:!1}),a=new e.MeshBasicMaterial({name:`flame-core`,color:new e.Color(`#fff0a8`),toneMapped:!1}),o=Ai(e).map,s=o?new e.SpriteMaterial({name:`halo`,map:o,color:new e.Color(`#ffb070`),blending:e.AdditiveBlending,depthWrite:!1,opacity:.7}):null,c=new e.CylinderGeometry(.13,.06,.16,10,1,!0),l=new e.CylinderGeometry(.035,.05,.3,8),u=new e.ConeGeometry(.1,.34,10),d=new e.ConeGeometry(.05,.18,8),f=t.torches.map(({x:o,z:f},p)=>{let m=t.cell(o,f),h=m?Math.max(...m.h):0,g=new e.Group;g.position.set(o+.5,h,f+.5);let _=new e.Mesh(l,r);_.position.y=.15;let v=new e.Mesh(c,r);v.position.y=.36,v.material.side=e.DoubleSide;let y=new e.Mesh(u,i);y.position.y=.55;let b=new e.Mesh(d,a);if(b.position.y=.5,g.add(_,v,y,b),_.castShadow=v.castShadow=!0,s){let t=new e.Sprite(s);t.position.y=.58,t.scale.set(1.3,1.3,1),g.add(t)}return n.add(g),{flame:y,core:b,at:[o+.5,h+.6,f+.5],seed:p*1.91}});return{group:n,flames:f.map(e=>e.at),update(e){for(let t of f){let n=e*9+t.seed,r=1+.18*Math.sin(n)+.1*Math.sin(n*2.7+1);t.flame.scale.set(1/Math.sqrt(r),r,1/Math.sqrt(r)),t.flame.rotation.z=Math.sin(n*.7)*.12,t.core.scale.set(1,.9+.15*Math.sin(n*1.3),1)}}}}function Pi(e,t=0){let n=e*9+t;return 1+.12*Math.sin(n)+.07*Math.sin(n*2.7+1)+.05*Math.sin(n*5.1+2)}function Fi(e,t,{last:n=!1}={}){let r=1/0,i=-1/0,a=1/0,o=-1/0,s=-1/0;for(let e=0;e<t.rows;e++)for(let n=0;n<t.cols;n++){let c=t.cell(n,e);c?.kind===`exit`&&(r=Math.min(r,n),i=Math.max(i,n+1),a=Math.min(a,e),o=Math.max(o,e+1),s=Math.max(s,...c.h))}if(!Number.isFinite(s))return null;let c=new e.Group;c.name=`exit`;let l=ki(e).map,u=new e.Mesh(new e.PlaneGeometry(1,1),new e.MeshBasicMaterial({name:`runes`,map:l,color:new e.Color(l?`#ffffff`:`#4ab8ff`),transparent:!0,depthWrite:!1,toneMapped:!1})),d=Math.min(i-r,o-a)*.95;u.scale.set(d,d,1),u.rotation.x=-Math.PI/2,u.position.set((r+i)/2,s+.02,(a+o)/2),c.add(u);let f=e=>e.filter(([e,n])=>{let r=t.cell(e,n);return r&&r.kind!==`exit`&&r.kind!==`wall`}).length,p=(e,t,n)=>Array.from({length:t-e},(t,r)=>n(e+r)),m=[{n:f(p(r,i,e=>[e,a-1])),along:`x`,at:a},{n:f(p(r,i,e=>[e,o])),along:`x`,at:o},{n:f(p(a,o,e=>[r-1,e])),along:`z`,at:r},{n:f(p(a,o,e=>[i,e])),along:`z`,at:i}].sort((e,t)=>t.n-e.n)[0],[h,g]=m.along===`x`?[r,i]:[a,o],_=g-h,v=2.4,y=Di(e),b=new e.MeshStandardMaterial({name:`arch`,color:new e.Color(`#9a958c`),map:y.map,bumpMap:y.bump,bumpScale:2,roughness:.85}),x=new e.MeshStandardMaterial({name:`arch-lamp`,color:new e.Color(`#6fd0ff`),emissive:new e.Color(`#4ab8ff`),emissiveIntensity:1.8}),S=Ii(e,_,n?`OUT`:`DOWN`),C=new e.MeshStandardMaterial({name:`arch-sign`,color:new e.Color(`#ffffff`),map:S,roughness:.6,emissive:new e.Color(`#ffffff`),emissiveIntensity:.1}),w=(e,t,n)=>{m.along===`x`?e.position.set(t,n,m.at):e.position.set(m.at,n,t)},T=m.along===`x`?new e.Mesh(new e.BoxGeometry(_+.5,.5,.4),[b,b,b,b,C,C]):new e.Mesh(new e.BoxGeometry(.4,.5,_+.5),[C,C,b,b,b,b]);w(T,h+_/2,s+v+.25),c.add(T);for(let t of[h+.2,g-.2]){let n=new e.Mesh(new e.BoxGeometry(.4,v,.4),b);w(n,t,s+v/2);let r=new e.Mesh(new e.SphereGeometry(.12,16,12),x);w(r,t,s+v+.66),c.add(n,r)}return c.traverse(e=>{e.isMesh&&e!==u&&(e.castShadow=!0,e.receiveShadow=!0)}),{group:c,at:[(r+i)/2,s,(a+o)/2],update(e){u.rotation.z=e*.25,u.material.opacity=.75+.25*Math.sin(e*2)}}}function Ii(e,t,n){if(typeof document>`u`)return null;let r=Math.round(128*(t+.5)/.5),[i,a]=wi(r,128);return a.fillStyle=`#5a564f`,a.fillRect(0,0,r,128),a.fillStyle=`#9fe1ff`,a.shadowColor=`#4ab8ff`,a.shadowBlur=16,a.font=`800 79px ui-monospace, "SF Mono", Menlo, monospace`,a.textAlign=`center`,a.textBaseline=`middle`,a.fillText(n===`OUT`?`▲ ${n} ▲`:`▼ ${n} ▼`,r/2,69.12),Ti(e,i)}var Li=.9,Ri=.5,zi=1.5,Bi=.18,Vi=26,Hi=new Set([`chest`,`gold`]),Ui=e=>e*e*(3-2*e),Wi=(e,t,n)=>((e+n)/t%1+1)%1;function Gi(e,t,n=0){let r=Wi(e,t,n);if(r<.5)return Ui(r/.5);if(r<.78)return 1;if(r<.84){let e=(r-.78)/.06;return 1-e*e}return 0}function Ki(e,t,n=0){let r=Wi(e,t,n);return r<.6?0:r<.65?Ui((r-.6)/.05):r<.85?1:r<.92?1-Ui((r-.85)/.07):0}function qi(e,t,n=0,r=.18){let i=Wi(e,t,n),a=.5-r;return i<r?0:i<.5?Ui((i-r)/a):i<.5+r?1:1-Ui((i-.5-r)/a)}function Ji(e,t){let n=e.map((t,n)=>{let r=e[(n+1)%e.length];return{p:t,q:r,length:Math.hypot(r[0]-t[0],r[1]-t[1])}}),r=n.reduce((e,t)=>e+t.length,0)||1,i=(t%r+r)%r;for(let e of n){if(i<=e.length){let t=e.length?i/e.length:0;return[e.p[0]+(e.q[0]-e.p[0])*t,e.p[1]+(e.q[1]-e.p[1])*t]}i-=e.length}return e[0]}function Yi(e,t,n,r,i){let a=-1/0;for(let o=n;o<n+i;o++)for(let n=t;n<t+r;n++){let t=e.cell(n,o);t&&(a=Math.max(a,...t.h))}return a}function Xi(e,t,n,{killY:r}){let i=new e.Group;i.name=`actors`;let a=Di(e),o=t.mobs.map((n,r)=>{let a=di[n.kind];if(!a)throw Error(`${t.name}: no such monster as ${n.kind}`);let o=mi(e,n.kind,{seed:r});o.group.rotation.y=n.facing??0,i.add(o.group);let s=t.heightAt(n.x,n.z)??0,c={...n,i:r,stats:a,look:o,heading:n.facing??0,moving:!1,dead:!1,gone:!1,chasing:!1,home:[n.x,s+a.radius,n.z],leg:0,travelled:0,x:n.x,y:s,z:n.z};if(a.move===`walk`)c.ball=M({x:n.x,y:s+a.radius,z:n.z,r:a.radius,mass:a.boss?50:2.5}),c.ball.grounded=!0;else{if(!n.path)throw Error(`${t.name}: a ${n.kind} needs a path`);c.flight=s+fi}return c}),s=o.filter(e=>e.ball),c=new e.MeshStandardMaterial({name:`crusher`,color:new e.Color(`#8a8580`),map:a.map,bumpMap:a.bump,bumpScale:2,roughness:.85}),l=new e.MeshStandardMaterial({name:`iron`,color:new e.Color(`#5d5f66`),roughness:.4,metalness:.85}),u=t.crushers.map(n=>{let r=Yi(t,n.x,n.z,n.w,n.d),a=.06,o={solid:!0,kind:`crusher`,vx:0,vy:0,vz:0,min:[n.x+a,r,n.z+a],max:[n.x+n.w-a,r+Li,n.z+n.d-a]},s=new e.Mesh(new e.BoxGeometry(n.w-a*2,Li,n.d-a*2),c);for(let t=0;t<n.d*2;t++)for(let r=0;r<n.w*2;r++){let i=new e.Mesh(new e.ConeGeometry(.1,.16,6),l);i.rotation.x=Math.PI,i.position.set(-n.w/2+.25+r*.5,-.9/2-.06,-n.d/2+.25+t*.5),s.add(i)}let u=new e.Mesh(new e.CylinderGeometry(.06,.06,7,8),l);return u.position.y=3.95,s.add(u),s.traverse(e=>{e.isMesh&&(e.castShadow=!0)}),s.receiveShadow=!0,i.add(s),{...n,base:r,box:o,mesh:s}}),d=new e.ConeGeometry(.07,.42,6),f=t.spikes.map(n=>{let r=Yi(t,n.x,n.z,n.w,n.d),a=new e.Group;for(let t=0;t<n.d*3;t++)for(let r=0;r<n.w*3;r++){let i=new e.Mesh(d,l);i.position.set(n.x+(r+.5)/3,0,n.z+(t+.5)/3),i.castShadow=!0,a.add(i)}return i.add(a),{...n,base:r,mesh:a,out:0,struck:-1}}),p=t.lifts.map(n=>{let r=new e.MeshStandardMaterial({name:`lift`,color:new e.Color(t.palette.lift??`#8c8478`),map:a.map,bumpMap:a.bump,bumpScale:1.5,roughness:.8}),o=new e.Mesh(new e.BoxGeometry(n.w,Ri,n.d),r);o.castShadow=o.receiveShadow=!0;for(let[t,r]of[[-1,-1],[1,-1],[-1,1],[1,1]]){let i=new e.Mesh(new e.CylinderGeometry(.03,.03,9,6),l);i.position.set(t*(n.w/2-.12),4.5,r*(n.d/2-.12)),o.add(i)}i.add(o);let s={solid:!0,kind:`lift`,vx:0,vy:0,vz:0,min:[n.x,n.h-Ri,n.z],max:[n.x+n.w,n.h,n.z+n.d]};return{...n,box:s,mesh:o}}),m=t.doors.map(n=>{let r=Yi(t,n.x,n.z,n.w,n.d),a=n.axis===`x`?`z`:`x`,o=n.x+n.w/2,s=n.z+n.d/2,c=a===`x`?n.w:n.d,u={solid:!0,kind:`door`,vx:0,vy:0,vz:0,min:a===`x`?[n.x,r,s-Bi/2]:[o-Bi/2,r,n.z],max:a===`x`?[n.x+n.w,r+zi,s+Bi/2]:[o+Bi/2,r+zi,n.z+n.d]},d=new e.Group,f=Math.round(c*5);for(let t=0;t<=f;t++){let n=new e.Mesh(new e.CylinderGeometry(.035,.035,zi,6),l),r=-c/2+t/f*c;n.position.set(a===`x`?r:0,0,a===`x`?0:r),d.add(n)}for(let t of[-.45,.1,.6]){let n=new e.Mesh(new e.BoxGeometry(a===`x`?c:.06,.07,a===`x`?.06:c),l);n.position.y=t,d.add(n)}return d.traverse(e=>{e.isMesh&&(e.castShadow=!0)}),i.add(d),{...n,base:r,box:u,mesh:d,opening:-1,centre:[o,r,s]}});n.boxes=[...u.map(e=>e.box),...p.map(e=>e.box),...m.map(e=>e.box)];let h=t.pickups.map((n,r)=>{let a=new e.Group,o=new e.Group;a.add(o);let s=()=>{let t=Vn(e,wr[n.kind]);n.kind===`gold`&&t.scale.setScalar(.95+.55*Math.min(1,Math.max(0,(n.amount-3)/30))),o.add(t)};kr(n.kind,1)?s():typeof window<`u`&&jr(n.kind,1).then(s),Hi.has(n.kind)&&(o.rotation.y=r*2.399963%(Math.PI*2));let c=t.heightAt(n.x,n.z)??0;return a.position.set(n.x,c,n.z),i.add(a),{...n,y:c,mesh:a,spin:o,taken:!1}}),g=(e,t,n,r,i)=>{i>0&&(e.vx=(t-e.min[0])/i,e.vy=(n-e.min[1])/i,e.vz=(r-e.min[2])/i);let a=e.max[0]-e.min[0],o=e.max[1]-e.min[1],s=e.max[2]-e.min[2];e.min[0]=t,e.min[1]=n,e.min[2]=r,e.max[0]=t+a,e.max[1]=n+o,e.max[2]=r+s};function _(e,t=0){for(let n of u)g(n.box,n.box.min[0],n.base+n.lift*Gi(e,n.period,n.phase),n.box.min[2],t);for(let n of p){let r=qi(e,n.period,n.phase,n.pause);g(n.box,n.x+n.to[0]*r,n.h-Ri+n.to[1]*r,n.z+n.to[2]*r,t)}for(let n of m){let r=n.opening<0?0:Ui(Math.min(1,(e-n.opening)/.9));g(n.box,n.box.min[0],n.base+r*1.7,n.box.min[2],t),r>=1&&(n.box.solid=!1)}for(let t of f)t.out=Ki(e,t.period,t.phase)}_(0);let v=(e,n,r)=>{let i=t.heightAt(e.x,e.z);for(let a of[.45,.8]){let o=e.x+n*a,s=e.z+r*a,c=t.cell(Math.floor(o),Math.floor(s));if(!c||c.kind===`lava`)return!1;let l=t.heightAt(o,s);if(i!==null&&l<i-1.1)return!1}return!0};return{group:i,mobs:o,crushers:u,spikes:f,lifts:p,doors:m,pickups:h,place:_,step(e,i,a){let c=null;for(let i of o){if(i.dead||i.gone)continue;let o=i.stats;if(i.ball){let t=i.ball,s=a?Math.hypot(a.x-t.x,a.z-t.z):1/0,l=a?Math.hypot(a.x-i.home[0],a.z-i.home[2]):1/0;i.chasing=a!==null&&s<i.range&&l<i.range+1.5&&Math.abs(a.y-t.y)<1.6;let u=i.home[0],d=i.home[2];if(i.chasing)u=a.x,d=a.z;else if(i.path){let[e,n]=i.path[i.leg%i.path.length];Math.hypot(e-t.x,n-t.z)<.4&&i.leg++,[u,d]=i.path[i.leg%i.path.length]}let f=u-t.x,p=d-t.z,m=Math.hypot(f,p),h=!i.chasing&&!i.path&&m<.5,g=t.grounded&&Math.hypot(t.vx,t.vz)<.05;if(h&&g&&s>Vi){i.moving=!1;continue}let _=0,y=0;if(m>(i.chasing?.001:.3)&&(_=f/m,y=p/m,!v(t,_,y))){let e=Math.hypot(t.vx,t.vz);_=e>.001?-t.vx/e:0,y=e>.001?-t.vz/e:0}if(ee(t,n,_,y,e,{push:10.2,topSpeed:o.speed}),Math.hypot(t.vx,t.vz)>.15&&(i.heading=Math.atan2(t.vx,t.vz)),i.moving=Math.hypot(t.vx,t.vz)>.3,i.x=t.x,i.y=t.y-o.radius,i.z=t.z,t.y<r&&(i.gone=!0),a&&!c){let e=a.r+o.radius+.02,n=a.x-t.x,r=a.y-t.y,s=a.z-t.z;n*n+r*r+s*s<e*e&&(c=i)}}else{i.travelled+=o.speed*e;let[n,r]=Ji(i.path,i.travelled),[s,l]=Ji(i.path,i.travelled+.05);if(Math.hypot(s-n,l-r)>1e-6&&(i.heading=Math.atan2(s-n,l-r)),i.x=n,i.z=r,i.moving=!0,i.y=o.move===`fly`?i.flight:t.heightAt(n,r)??i.y,a&&!c){let e=o.move===`fly`?i.y:i.y+.2;Math.hypot(a.x-n,a.z-r)<a.r+o.radius*(o.move===`fly`?1:.8)&&Math.abs(a.y-e)<.65&&(c=i)}}}for(let e=0;e<s.length;e++){let t=s[e];if(!(t.dead||t.gone))for(let n=e+1;n<s.length;n++){let e=s[n];!e.dead&&!e.gone&&te(t.ball,e.ball,.5)}}return c},defeat(e){e.dead=!0,e.downAt=null},open(e,t){e.opening<0&&(e.opening=t)},sync(e,t,{focus:n=null,reach:r=15}={}){for(let i of o){let a=i.look.group;if(i.dead&&i.downAt===null&&(i.downAt=t),a.visible=!i.gone&&(!i.dead||t-i.downAt<1.1),!a.visible)continue;a.position.set(i.x,i.y,i.z);let o=i.heading-a.rotation.y;if(o=Math.atan2(Math.sin(o),Math.cos(o)),a.rotation.y+=o*Math.min(1,e*8),n&&Math.hypot(i.x-n.x,i.z-n.z)>r)continue;let s=i.ball&&!i.dead?Math.hypot(i.ball.vx,i.ball.vz):0,c=!i.dead&&n!==null&&Math.hypot(i.x-n.x,i.z-n.z)<i.stats.radius+1;i.look.animate(t+i.i*1.37,i.moving&&!i.dead,{chasing:i.chasing,pace:s,striking:c,down:i.dead})}for(let e of u)e.mesh.position.set((e.box.min[0]+e.box.max[0])/2,(e.box.min[1]+e.box.max[1])/2,(e.box.min[2]+e.box.max[2])/2);for(let e of f)e.mesh.position.y=e.base-.3+e.out*.48,e.mesh.visible=e.out>.01;for(let e of p)e.mesh.position.set((e.box.min[0]+e.box.max[0])/2,(e.box.min[1]+e.box.max[1])/2,(e.box.min[2]+e.box.max[2])/2);for(let e of m)e.mesh.position.set(e.centre[0],(e.box.min[1]+e.box.max[1])/2,e.centre[2]);for(let[e,n]of h.entries())n.mesh.visible=!n.taken,!n.taken&&(Hi.has(n.kind)||(n.spin.position.y=.06+Math.sin(t*2.4+e)*.05,n.spin.rotation.y=t*1.6+e))}}}var Zi=Object.freeze({back:2.2,front:.7}),Qi=0,$i=1,ea=2,ta=3,na=class{constructor({name:e,depth:t=1,cols:n,rows:r,palette:i,intro:a=``}){this.name=e,this.depth=t,this.intro=a,this.cols=n,this.rows=r,this.palette=i,this.cells=Array(n*r).fill(null),this.open=new Set,this.start={x:0,z:0},this.mobs=[],this.crushers=[],this.spikes=[],this.lifts=[],this.torches=[],this.pickups=[],this.doors=[]}cell(e,t){return e<0||t<0||e>=this.cols||t>=this.rows?null:this.cells[t*this.cols+e]}_check(e,t){if(e<0||t<0||e>=this.cols||t>=this.rows)throw Error(`${this.name}: tile ${e},${t} is off the grid`)}surface(e,t,n,r,i,{color:a=0,kind:o=`floor`}={}){for(let s=t;s<t+r;s++)for(let t=e;t<e+n;t++)this._check(t,s),this.cells[s*this.cols+t]={h:[i(t,s),i(t+1,s),i(t,s+1),i(t+1,s+1)],color:a,kind:o};return this}flat(e,t,n,r,i,a){return this.surface(e,t,n,r,()=>i,a)}slope(e,t,n,r,i,a,o,s){let c=o===`x`?t=>(t-e)/n:(e,n)=>(n-t)/r;return this.surface(e,t,n,r,(e,t)=>i+(a-i)*c(e,t),s)}stairs(e,t,n,r,i,a,o,{color:s=1,...c}={}){let l=o===`x`?n:r,u=l>1?(a-i)/(l-1):0;for(let a=0;a<l;a++)o===`x`?this.flat(e+a,t,1,r,i+u*a,{color:s,...c}):this.flat(e,t+a,n,1,i+u*a,{color:s,...c});return this}chute(e,t,n,r,i,a,o,{bank:s=.9,...c}={}){let l=o===`x`?t=>(t-e)/n:(e,n)=>(n-t)/r,u=o===`x`?(e,n)=>(n-t)/r:t=>(t-e)/n;return this.surface(e,t,n,r,(e,t)=>i+(a-i)*l(e,t)+ia(u(e,t),s),c)}bend(e,t,n,r,i,{bank:a=.9,...o}={}){return this.surface(e,t,n,n,(e,t)=>r+ia(Math.hypot(e-i[0],t-i[1])/n,a),o)}bowl(e,t,n,r,i,a,o){return this.surface(e,t,n,r,(o,s)=>{let c=2*(o-e)/n-1,l=2*(s-t)/r-1;return i-a*(1-c*c)*(1-l*l)},o)}lava(e,t,n,r,i,{fill:a=!1}={}){if(!a)return this.flat(e,t,n,r,i,{kind:`lava`,color:0});for(let a=t;a<t+r;a++)for(let t=e;t<e+n;t++)t<0||a<0||t>=this.cols||a>=this.rows||this.cell(t,a)||this.flat(t,a,1,1,i,{kind:`lava`,color:0});return this}exit(e,t,n,r,i){return this.flat(e,t,n,r,i,{kind:`exit`,color:0})}wall(e,t,n,r,i,{color:a=-1}={}){for(let o=t;o<t+r;o++)for(let t=e;t<e+n;t++){this._check(t,o);let e=this.cells[o*this.cols+t];if(e&&e.kind!==`wall`||this.open.has(o*this.cols+t))continue;let n=e?Math.min(e.h[0],i):i;this.cells[o*this.cols+t]={h:[n,n,n,n],color:a,kind:`wall`}}return this}enclose(e,t,n,r,{sides:i=`x0 z0 x1 z1`,back:a=Zi.back,front:o=Zi.front,torches:s=0,color:c=-1}={}){let l=new Set(i.split(/\s+/)),u=(i,a)=>{let o=this.cell(Math.max(e,Math.min(e+n-1,i)),Math.max(t,Math.min(t+r-1,a)));return o&&o.kind!==`wall`?Math.max(...o.h):null},d=(e,t,n)=>{if(e<0||t<0||e>=this.cols||t>=this.rows)return;let r=u(e,t);r!==null&&this.wall(e,t,1,1,r+n,{color:c})},f=(e,t)=>l.has(e)&&l.has(t)?Math.min(e[1]===`0`?a:o,t[1]===`0`?a:o):1/0;if(l.has(`z0`))for(let r=e;r<e+n;r++)d(r,t-1,a);if(l.has(`z1`))for(let i=e;i<e+n;i++)d(i,t+r,o);if(l.has(`x0`))for(let n=t;n<t+r;n++)d(e-1,n,a);if(l.has(`x1`))for(let i=t;i<t+r;i++)d(e+n,i,o);for(let[i,a,o,s]of[[e-1,t-1,`x0`,`z0`],[e+n,t-1,`x1`,`z0`],[e-1,t+r,`x0`,`z1`],[e+n,t+r,`x1`,`z1`]]){let e=f(o,s);Number.isFinite(e)&&d(i,a,e)}if(s>0){if(l.has(`z0`))for(let r=e+Math.floor(s/2);r<e+n;r+=s)this.torch(r,t-1);if(l.has(`x0`))for(let n=t+Math.floor(s/2);n<t+r;n+=s)this.torch(e-1,n)}return this}room(e,t,n,r,i,{color:a=0,...o}={}){return this.flat(e,t,n,r,i,{color:a}),this.enclose(e,t,n,r,o)}pillar(e,t,n=1.1){let r=this.cell(e,t),i=r?Math.max(...r.h):0;return this.cells[t*this.cols+e]=null,this.wall(e,t,1,1,i+n)}clear(e,t,n,r){for(let i=t;i<t+r;i++)for(let t=e;t<e+n;t++)this.cells[i*this.cols+t]=null;return this}gap(e,t,n,r){this.clear(e,t,n,r);for(let i=t;i<t+r;i++)for(let t=e;t<e+n;t++)this.open.add(i*this.cols+t);return this}mob(e,t,n,{range:r=6,path:i=null,facing:a=0}={}){return this.mobs.push({kind:e,x:t+.5,z:n+.5,range:r,facing:a,path:i&&i.map(([e,t])=>[e+.5,t+.5])}),this}crusher(e,t,{w:n=1,d:r=1,lift:i=2.4,period:a=2.6,phase:o=0}={}){return this.crushers.push({x:e,z:t,w:n,d:r,lift:i,period:a,phase:o}),this._mark(e,t,n,r,`crush`),this}spike(e,t,{w:n=1,d:r=1,period:i=2.2,phase:a=0}={}){return this.spikes.push({x:e,z:t,w:n,d:r,period:i,phase:a}),this._mark(e,t,n,r,`trap`),this}lift(e,t,n,r,i,{to:a,period:o=6,phase:s=0,pause:c=.26}){return this.lifts.push({x:e,z:t,w:n,d:r,h:i,to:a,period:o,phase:s,pause:c}),this}torch(e,t){return this.torches.push({x:e,z:t}),this}gold(e,t,n=10){return this.pickups.push({kind:`gold`,x:e+.5,z:t+.5,amount:n}),this}chest(e,t,n=60){return this.pickups.push({kind:`chest`,x:e+.5,z:t+.5,amount:n}),this}potion(e,t,n=8){return this.pickups.push({kind:`potion`,x:e+.5,z:t+.5,amount:n}),this}revive(e,t){return this.pickups.push({kind:`revive`,x:e+.5,z:t+.5,amount:1}),this}key(e,t){return this.pickups.push({kind:`key`,x:e+.5,z:t+.5,amount:1}),this}door(e,t,n,r,{axis:i=n>r?`z`:`x`}={}){return this.doors.push({x:e,z:t,w:n,d:r,axis:i}),this._mark(e,t,n,r,`door`),this}_mark(e,t,n,r,i){for(let a=t;a<t+r;a++)for(let t=e;t<e+n;t++){let e=this.cell(t,a);e&&(e[i]=!0)}}heightAt(e,t){let n=Math.floor(e),r=Math.floor(t),i=this.cell(n,r);if(!i)return null;let a=e-n,o=t-r,s=i.h;return a+o<=1?s[Qi]+(s[$i]-s[Qi])*a+(s[ea]-s[Qi])*o:s[ta]+(s[ea]-s[ta])*(1-a)+(s[$i]-s[ta])*(1-o)}isSafe(e,t){let n=this.cell(e,t);if(!n||n.kind!==`floor`||!ra(n)||n.trap||n.crush||n.door)return!1;for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){let a=this.cell(e+i,t+r);if(!a||!(a.kind===`wall`&&Math.min(...a.h)>=n.h[0]+.3)&&(a.kind===`lava`||!ra(a)||Math.abs(a.h[0]-n.h[0])>1e-6))return!1}return!0}get lowest(){let e=1/0;for(let t of this.cells)t&&(e=Math.min(e,...t.h));return e}get highest(){let e=-1/0;for(let t of this.cells)t&&(e=Math.max(e,...t.h));return e}},ra=e=>e.h.every(t=>Math.abs(t-e.h[0])<1e-6);function ia(e,t){let n=Math.max(0,Math.abs(2*e-1)*1.5-.5);return t*Math.min(n*n,1.8)}function aa(e){let t=parseInt(e.slice(1),16);return[t>>16&255,t>>8&255,t&255].map(e=>{let t=e/255;return t<=.04045?t/12.92:((t+.055)/1.055)**2.4})}function oa(e,t){let n=e*374761393+t*668265263|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function sa(e){let t=e.torches.map(({x:t,z:n})=>{let r=e.cell(t,n);return[t+.5,(r?Math.max(...r.h):0)+.6,n+.5]}),n=[];for(let t=0;t<e.rows;t++)for(let r=0;r<e.cols;r++){let i=e.cell(r,t);i?.kind===`lava`&&n.push([r+.5,i.h[0],t+.5])}let r=e.palette.ambient??[.42,.44,.55],i=[];for(let t=0;t<e.rows;t++)for(let n=0;n<e.cols;n++){let r=e.cell(n,t);r?.kind===`exit`&&i.push([n+.5,r.h[0]+.5,t+.5])}let a=(e,t,n,r,i,a,o)=>{for(let[s,c,l]of e){let e=t-s,u=r-l;if(Math.abs(e)>i||Math.abs(u)>i)continue;let d=Math.hypot(e,(n-c)*.8,u);if(d>=i)continue;let f=(1-d/i)**2;o[0]+=a[0]*f,o[1]+=a[1]*f,o[2]+=a[2]*f}};return(e,o,s)=>{let c=[...r];return a(t,e,o,s,5.5,[.95,.55,.22],c),a(n,e,o,s,2.6,[.22,.07,.01],c),a(i,e,o,s,4,[.15,.35,.6],c),c.map(e=>Math.min(1.6,e))}}function ca(e){let t=new j({cols:e.cols,rows:e.rows}),n={position:[],normal:[],color:[],uv:[]},r={position:[],normal:[],color:[],uv:[]},i={position:[],normal:[],color:[],uv:[]},a=e.palette,o=a.tiles.map(aa),s=aa(a.exit??`#2a3346`),c=aa(a.trap??`#5a3a2c`),l=(a.walls??a.tiles).map(aa),u=sa(e),d=e=>o[(e%o.length+o.length)%o.length],f=(e,t,n)=>{let r=t[0]-e[0],i=t[1]-e[1],a=t[2]-e[2],o=n[0]-e[0],s=n[1]-e[1],c=n[2]-e[2],l=i*c-a*s,u=a*o-r*c,d=r*s-i*o,f=Math.hypot(l,u,d)||1;return[l/f,u/f,d/f]},p=(e,t)=>{let n=u(t[0],t[1],t[2]);return[e[0]*n[0],e[1]*n[1],e[2]*n[2]]},m=(e,t,n,r,i,a,o)=>{e.position.push(...t,...n,...r);for(let t=0;t<3;t++)e.normal.push(...i);e.color.push(...a[0],...a[1],...a[2]),e.uv.push(...o[0],...o[1],...o[2])},h=(e,n,r,a,o)=>{let s=(t,r)=>[e[0]+(n[0]-e[0])*t,r,e[1]+(n[1]-e[1])*t],c=r.map(([e,t])=>s(e,t)),l=(e,t,n)=>{let r=f(e,t,n);return r[0]*a[0]+r[2]*a[2]<0?null:r};for(let e=1;e<c.length-1;e++){let n=c[0],r=c[e],i=c[e+1];l(n,r,i)||([r,i]=[i,r]),t.addTriangle(...n,...r,...i)}let u=Math.min(...r.map(e=>e[1])),d=Math.max(...r.map(e=>e[1]));for(let e=Math.floor(u);e<d;e++){let t=la(la(r,t=>t[1]-e),t=>e+1-t[1]);if(t.length<3)continue;let n=t.map(([e,t])=>s(e,t));for(let r=1;r<t.length-1;r++){let a=r,s=r+1,c=l(n[0],n[a],n[s]);c||=([a,s]=[s,a],f(n[0],n[a],n[s]));let u=[0,a,s];m(i,n[0],n[a],n[s],c,u.map(e=>p(o(t[e][1]),n[e])),u.map(n=>[t[n][0],t[n][1]-e]))}}};for(let i=0;i<e.rows;i++)for(let a=0;a<e.cols;a++){let o=e.cell(a,i);if(!o)continue;let[u,g,_,v]=o.h,y=(a+i)%2,b;b=o.kind===`exit`?s:o.kind===`lava`?[1,1,1]:o.trap?c:o.kind===`wall`?d(-1):d(o.color);let x=o.kind===`lava`?1:(y?.94:1)*(.84+.22*oa(a,i)),S=b.map(e=>e*x),C=[a,u,i],w=[a+1,g,i],T=[a,_,i+1],E=[a+1,v,i+1],D=o.kind===`lava`?r:n,O=e=>o.kind===`lava`?S:p(S,e),k=Math.floor(oa(i,a)*8),A=([e,t])=>{k&4&&(e=1-e);for(let n=0;n<(k&3);n++)[e,t]=[t,1-e];return[e,t]};m(D,C,T,w,f(C,T,w),[O(C),O(T),O(w)],[A([0,1]),A([0,0]),A([1,1])]),m(D,w,T,E,f(w,T,E),[O(w),O(T),O(E)],[A([1,1]),A([0,0]),A([1,0])]),t.addTriangle(...C,...T,...w),t.addTriangle(...w,...T,...E);let j=l[(o.color%l.length+l.length)%l.length],M=Math.min(...o.h)-6,N=[[[a,i],[a+1,i],u,g,e.cell(a,i-1),e=>[e.h[ea],e.h[ta]],[0,0,-1]],[[a,i+1],[a+1,i+1],_,v,e.cell(a,i+1),e=>[e.h[Qi],e.h[$i]],[0,0,1]],[[a,i],[a,i+1],u,_,e.cell(a-1,i),e=>[e.h[$i],e.h[ta]],[-1,0,0]],[[a+1,i],[a+1,i+1],g,v,e.cell(a+1,i),e=>[e.h[Qi],e.h[ea]],[1,0,0]]];for(let[e,t,n,r,i,a,o]of N){let[s,c]=i?a(i):[M,M],l=Math.max(n,r),u=e=>{let t=Math.max(0,Math.min(1,1-(l-e)/6));return j.map(e=>e*(.08+.92*t*t))},d=n-s,f=r-c;if(!(d<=1e-6&&f<=1e-6)){if(d>=-1e-6&&f>=-1e-6)h(e,t,[[0,s],[1,c],[1,r],[0,n]],o,u);else{let i=d/(d-f),a=n+(r-n)*i;d>0?h(e,t,[[0,s],[i,a],[0,n]],o,u):h(e,t,[[1,c],[1,r],[i,a]],o,u)}}}}t.finish();let g=e=>Object.fromEntries(Object.entries(e).map(([e,t])=>[e,new Float32Array(t)]));return{tops:g(n),lava:g(r),walls:g(i),world:t}}function la(e,t){let n=[];for(let r=0;r<e.length;r++){let i=e[r],a=e[(r+1)%e.length],o=t(i),s=t(a);if(o>=0&&n.push(i),o>=0!=s>=0){let e=o/(o-s);n.push([i[0]+(a[0]-i[0])*e,i[1]+(a[1]-i[1])*e])}}return n.filter((e,t)=>{let r=n[(t+1)%n.length];return n.length<2||Math.hypot(e[0]-r[0],e[1]-r[1])>1e-7})}var ua={"+x":[1,0],"-x":[-1,0],"+z":[0,1],"-z":[0,-1]},da={"+x":`x1`,"-x":`x0`,"+z":`z1`,"-z":`z0`},fa={"+x":`-x`,"-x":`+x`,"+z":`-z`,"-z":`+z`},pa=class{constructor(e,t,n,r,i){this.x0=e[0],this.z0=e[1],this.heading=t,this.length=n,this.width=r,this.h=i;let[a,o]=ua[t];this.dir=[a,o],this.across=[-o,a],this.lo=-Math.floor((r-1)/2);let[s,c,l,u]=this.rect(0,n,this.lo,r);Object.assign(this,{x:s,z:c,w:l,d:u})}tile(e,t=0){return[this.x0+this.dir[0]*e+this.across[0]*t,this.z0+this.dir[1]*e+this.across[1]*t]}rect(e,t,n,r){let i=this.tile(e,n),a=this.tile(e+t-1,n+r-1);return[Math.min(i[0],a[0]),Math.min(i[1],a[1]),Math.abs(i[0]-a[0])+1,Math.abs(i[1]-a[1])+1]}span(e,t=1){return this.rect(e,t,this.lo,this.width)}get flanks(){return this.dir[0]?`z0 z1`:`x0 x1`}get ends(){return[da[fa[this.heading]],da[this.heading]]}};function ma(e,{x:t,z:n,h:r,heading:i=`+x`}){let a={x:t,z:n,h:r,heading:i},o=(e,t,n=a.h)=>new pa([a.x,a.z],a.heading,e,t,n),s=e=>{let[t,n]=ua[a.heading];a.x+=t*e,a.z+=n*e},c=(t,n,r)=>e.enclose(t.x,t.z,t.w,t.d,{sides:n,...r}),l={get at(){return{...a}},get h(){return a.h},hall(t,{width:n=3,color:r=0,walls:i,torches:l=6,back:u,front:d}={}){let f=o(t,n);return e.flat(f.x,f.z,f.w,f.d,a.h,{color:r}),c(f,i??f.flanks,{torches:l,back:u,front:d}),s(t),f},room(t,n,{color:r=0,torches:i=4,back:l,front:u,sides:d}={}){let f=o(t,n);return e.flat(f.x,f.z,f.w,f.d,a.h,{color:r}),c(f,d??`x0 z0 x1 z1`,{torches:i,back:l,front:u}),s(t),f},ledge(t,{width:n=2,color:r=0,torches:i=6,wall:l=!0}={}){let u=o(t,n);if(e.flat(u.x,u.z,u.w,u.d,a.h,{color:r}),l){let e=u.flanks.split(` `)[0];c(u,e,{torches:i})}return s(t),u},bridge(t,{width:n=1,color:r=2}={}){let i=o(t,n);return e.flat(i.x,i.z,i.w,i.d,a.h,{color:r}),s(t),i},stairs(t,n,{width:r=3,color:i=1,walls:l,torches:u=0}={}){let d=o(t,r);for(let r=0;r<t;r++){let[o,s,c,l]=d.span(r);e.flat(o,s,c,l,a.h-n*(r+1)/t,{color:i})}return c(d,l??d.flanks,{torches:u}),a.h-=n,s(t),d},ramp(t,n,{width:r=3,color:i=1,walls:l,torches:u=0}={}){let d=o(t,r),f=d.dir[0]?`x`:`z`,[p,m]=d.dir[0]+d.dir[1]>0?[a.h,a.h-n]:[a.h-n,a.h];return e.slope(d.x,d.z,d.w,d.d,p,m,f,{color:i}),c(d,l??d.flanks,{torches:u}),a.h-=n,s(t),d},chute(t,n,{width:r=3,color:i=1,bank:c=.9}={}){let l=o(t,r),u=l.dir[0]?`x`:`z`,[d,f]=l.dir[0]+l.dir[1]>0?[a.h,a.h-n]:[a.h-n,a.h];return e.chute(l.x,l.z,l.w,l.d,d,f,u,{color:i,bank:c}),a.h-=n,s(t),l},turn(t,{width:n=3,color:r=0,torches:i=0}={}){let s=o(n,n);e.flat(s.x,s.z,s.w,s.d,a.h,{color:r});let l=[`x0`,`z0`,`x1`,`z1`].filter(e=>e!==s.ends[0]&&e!==da[t]);c(s,l.join(` `),{torches:i});let[u,d]=ua[t],[f,p]=[-d,u],m=-Math.floor((n-1)/2),h=(e,t)=>t>0?e-m:e+m+n-1;return a.heading=t,u?(a.x=u>0?s.x+s.w:s.x-1,a.z=h(s.z,p)):(a.z=d>0?s.z+s.d:s.z-1,a.x=h(s.x,f)),s},gap(t,{width:n=3}={}){let r=o(t,n);return e.gap(r.x,r.z,r.w,r.d),s(t),r},ferry(t,{size:n=3,period:r=6,phase:i=0}={}){let c=o(t,n);e.gap(c.x,c.z,c.w,c.d);let[l,u,d,f]=c.rect(0,n,c.lo,n),p=t-n;return e.lift(l,u,d,f,a.h,{to:[c.dir[0]*p,0,c.dir[1]*p],period:r,phase:i}),s(t),c},shaft(t,{size:n=3,period:r=7,phase:i=0}={}){let c=o(n,n);return e.gap(c.x,c.z,c.w,c.d),e.lift(c.x,c.z,c.w,c.d,a.h,{to:[0,-t,0],period:r,phase:i}),a.h-=t,s(n),c},exit(t,n=3){let r=o(t,n);return e.exit(r.x,r.z,r.w,r.d,a.h),c(r,`x0 z0 x1 z1`,{torches:0}),s(t),r},jump({x:e=a.x,z:t=a.z,h:n=a.h,heading:r=a.heading}={}){return Object.assign(a,{x:e,z:t,h:n,heading:r}),l},fork(){return ma(e,{...a})}};return l}var ha=([e,t],n)=>({x:e,z:t,heading:n}),U=(e,t,n={},r=1)=>{let[i,a,o,s]=e.span(t,r);return[i,a,{w:o,d:s,...n}]},ga=(e,t,n)=>e.door(...t.span(n),{axis:t.dir[0]?`x`:`z`}),W=(e,t=1,n=0,r=e.length)=>{let i=e.lo+t,a=e.lo+e.width-1-t,o=n+t,s=r-1-t;return[e.tile(o,i),e.tile(s,i),e.tile(s,a),e.tile(o,a)]},_a={tiles:[`#9a958e`,`#837d75`,`#8a6d4c`,`#6c6862`],walls:[`#6e6962`,`#5e5953`,`#5a4636`,`#57524c`],ambient:[.4,.42,.52],lift:`#8c8478`};function va(){let e=new na({name:`The Crypt`,depth:1,cols:88,rows:108,palette:_a,intro:`Rats and old bones. Mind the edges.`});e.room(2,4,5,5,40,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:40,heading:`+x`});t.hall(8),t.turn(`+z`),t.hall(5),t.stairs(5,2.5);let n=t.room(9,7);for(let t of[2,6])e.pillar(...n.tile(t,-2)),e.pillar(...n.tile(t,2));e.mob(`skeleton`,...n.tile(4,-1),{range:5}),e.gold(...n.tile(4,3),15).gold(...n.tile(8,-3),10),t.hall(4),t.turn(`+x`);let r=t.ledge(10,{width:2});e.mob(`rat`,...r.tile(7,0),{range:5}),t.bridge(6);let i=t.room(7,7);e.mob(`rat`,...i.tile(3,-2),{range:6}).mob(`rat`,...i.tile(5,2),{range:6});let a=t.fork().jump({...t.at,...ha(i.tile(3,-4),`-z`)});a.hall(4);let o=a.room(4,5);e.chest(...o.tile(2,0),40).mob(`rat`,...o.tile(1,-1),{range:4}),t.stairs(4,2),t.turn(`+z`);let s=t.hall(12);e.mob(`bat`,...s.tile(2,0),{path:[s.tile(2,-1),s.tile(10,-1),s.tile(10,1),s.tile(2,1)]}),e.potion(...s.tile(11,1)),t.turn(`-x`),t.hall(8),t.stairs(3,1.5),t.hall(5),t.turn(`+z`),t.ramp(6,2.5);let c=t.room(13,11);for(let t of[2,5,8,11])e.pillar(...c.tile(t,-3),.8),e.pillar(...c.tile(t,3),.8);e.mob(`skeleton`,...c.tile(4,-1),{range:6}).mob(`skeleton`,...c.tile(9,1),{range:6}),e.chest(...c.tile(6,-5),60).gold(...c.tile(10,5),15),t.hall(5),t.turn(`+x`);let l=t.hall(10);e.mob(`rat`,...l.tile(6,0),{range:4}),t.stairs(4,2),t.bridge(7);let u=t.room(7,7);e.mob(`skeleton`,...u.tile(4,0),{range:4}),e.gold(...u.tile(1,3),20),t.hall(4),t.turn(`+z`),t.hall(6),t.stairs(6,3);let d=t.room(9,9);for(let[t,n]of[[2,-2],[2,2],[6,-2],[6,2]])e.pillar(...d.tile(t,n),.8);e.mob(`skeleton`,...d.tile(3,0),{range:5}).mob(`skeleton`,...d.tile(6,-3),{range:5}).mob(`skeleton`,...d.tile(7,3),{range:5}),e.mob(`bat`,...d.tile(1,-3),{path:[d.tile(1,-3),d.tile(1,3),d.tile(7,3),d.tile(7,-3)]}),e.potion(...d.tile(8,-4)),t.hall(6),t.turn(`+x`);let f=t.ledge(12,{width:2});return e.mob(`rat`,...f.tile(5,0),{range:4}).gold(...f.tile(9,1),10),t.stairs(3,1.5),t.hall(3),t.exit(3),e}var ya={tiles:[`#a89a82`,`#8f826c`,`#7a5e40`,`#6e6454`],walls:[`#77695a`,`#665a4b`,`#5a4430`,`#5e5446`],ambient:[.42,.4,.44],trap:`#5e3a2a`,lift:`#8a7e6a`};function ba(){let e=new na({name:`The Catacombs`,depth:2,cols:110,rows:110,palette:ya,intro:`The dead are stacked in the walls. Some of them get up.`});e.room(2,4,5,5,46,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:46,heading:`+x`});t.hall(5);let n=t.hall(9);e.crusher(...U(n,3,{period:2.6})),e.crusher(...U(n,6,{period:2.6,phase:1.3}));let r=t.room(7,7);e.mob(`skeleton`,...r.tile(3,-2),{range:5}).mob(`skeleton`,...r.tile(5,2),{range:5}),e.gold(...r.tile(6,-3),15),t.turn(`+z`),t.stairs(5,2.5);let i=t.hall(10);e.spike(...U(i,3,{period:2.4})),e.spike(...U(i,7,{period:2.4,phase:1.2}));let a=t.room(9,9);for(let[t,n]of[[2,-2],[2,2],[6,-2],[6,2]])e.pillar(...a.tile(t,n),.8);e.mob(`slime`,...a.tile(1,-3),{path:W(a,1)}),e.mob(`skeleton`,...a.tile(5,0),{range:4}),e.potion(...a.tile(4,4)),t.hall(4),t.turn(`+x`);let o=t.bridge(8);e.mob(`bat`,...o.tile(2,0),{path:[o.tile(1,-2),o.tile(6,2)]});let s=t.room(7,7);e.mob(`rat`,...s.tile(2,2),{range:5}).mob(`rat`,...s.tile(4,-2),{range:5});let c=t.fork().jump(ha(s.tile(3,-4),`-z`)),l=c.hall(6);e.spike(...U(l,3,{period:2.2,phase:.5}));let u=c.room(5,7);e.key(...u.tile(3,0)).mob(`skeleton`,...u.tile(2,-2),{range:4}).gold(...u.tile(4,2),20),e.revive(...u.tile(1,2)),t.stairs(4,2),ga(e,t.hall(8),4),t.turn(`+z`),t.ramp(8,3);let d=t.room(11,11);e.mob(`slime`,...d.tile(1,-4),{path:W(d,1,0,6)}),e.mob(`slime`,...d.tile(6,4),{path:W(d,1,5,11).reverse()}),e.mob(`skeleton`,...d.tile(5,-2),{range:6}).mob(`skeleton`,...d.tile(7,3),{range:6}),e.chest(...d.tile(9,-5),60),t.hall(5);let f=t.hall(9,{width:1});e.crusher(...U(f,3,{period:2.4})),e.crusher(...U(f,6,{period:2.4,phase:.8})),t.hall(3),t.turn(`+x`);let p=t.ledge(12,{width:2});e.mob(`rat`,...p.tile(4,0),{range:4}).mob(`rat`,...p.tile(9,1),{range:4}),e.gold(...p.tile(11,0),10),t.stairs(4,2);let m=t.room(7,7);e.mob(`skeleton`,...m.tile(3,0),{range:4}),t.hall(3),t.turn(`+z`);let h=t.hall(10);e.spike(...U(h,2,{period:2})),e.spike(...U(h,5,{period:2,phase:.7})),e.spike(...U(h,8,{period:2,phase:1.4})),t.stairs(4,2);let g=t.room(9,9);return e.mob(`slime`,...g.tile(1,-3),{path:W(g,1)}),e.mob(`skeleton`,...g.tile(4,2),{range:5}).mob(`skeleton`,...g.tile(6,-2),{range:5}),e.potion(...g.tile(7,4)).gold(...g.tile(2,4),15),t.hall(4),t.turn(`+x`),t.hall(8),t.stairs(3,1.5),t.hall(3),t.exit(3),e}var xa={tiles:[`#7f8c7a`,`#6c7868`,`#5b6b4c`,`#5e6a5a`],walls:[`#59634f`,`#4b5545`,`#3f4b37`,`#4b5347`],ambient:[.34,.48,.42],trap:`#2f4a26`,lift:`#7a8670`};function Sa(){let e=new na({name:`The Slime Pits`,depth:3,cols:100,rows:112,palette:xa,intro:`Something wet moves down here. A great many somethings.`});e.room(2,4,5,5,52,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:52,heading:`+x`});t.hall(6);let n=t.room(9,9);e.mob(`slime`,...n.tile(1,-3),{path:W(n,1)}),e.mob(`rat`,...n.tile(5,2),{range:5}),e.potion(...n.tile(7,-3)),t.hall(3),t.chute(8,3);let r=t.room(7,7);e.mob(`slime`,...r.tile(1,-2),{path:W(r,1)}).gold(...r.tile(5,2),15),t.turn(`+z`),t.hall(4);let i=t.hall(10);e.spike(...U(i,3,{period:2.4})),e.spike(...U(i,7,{period:2.4,phase:1.2})),t.stairs(4,2);let a=t.room(11,11);for(let[t,n]of[[3,-3],[3,3],[7,-3],[7,3]])e.pillar(...a.tile(t,n),.8);e.mob(`slime`,...a.tile(1,-4),{path:W(a,1,0,6)}),e.mob(`slime`,...a.tile(6,4),{path:W(a,1,5,11).reverse()}),e.mob(`rat`,...a.tile(5,0),{range:6}).mob(`rat`,...a.tile(8,-2),{range:6}),e.chest(...a.tile(9,4),50);let o=t.fork().jump(ha(a.tile(5,-6),`+x`));o.hall(3);let s=o.bridge(7);e.mob(`bat`,...s.tile(3,0),{path:[s.tile(1,2),s.tile(6,-2)]});let c=o.room(5,7);e.key(...c.tile(3,0)).mob(`slime`,...c.tile(1,-2),{path:W(c,1)}).gold(...c.tile(4,2),20),e.revive(...c.tile(2,0)),t.hall(3),ga(e,t.hall(6),3),t.turn(`+x`);let l=t.ledge(12,{width:2});e.mob(`rat`,...l.tile(4,0),{range:4}).mob(`rat`,...l.tile(9,1),{range:4}),t.bridge(6);let u=t.room(7,7);e.mob(`slime`,...u.tile(1,-2),{path:W(u,1)}),e.mob(`bat`,...u.tile(3,0),{path:[u.tile(1,2),u.tile(5,-2)]}),e.potion(...u.tile(5,2)),t.turn(`+z`),t.chute(10,4);let d=t.room(9,9);e.mob(`slime`,...d.tile(1,-3),{path:W(d,1,0,5)}),e.mob(`slime`,...d.tile(5,3),{path:W(d,1,4,9).reverse()}),e.mob(`rat`,...d.tile(4,0),{range:5}),e.gold(...d.tile(7,-3),20),t.hall(3),t.turn(`-x`),t.hall(8),t.stairs(4,2);let f=t.room(9,9);for(let[t,n]of[[2,-2],[2,2],[6,-2],[6,2]])e.pillar(...f.tile(t,n),.8);e.mob(`slime`,...f.tile(1,-3),{path:W(f,1)}),e.mob(`slime`,...f.tile(4,0),{path:[f.tile(4,-1),f.tile(4,1)]}),e.mob(`rat`,...f.tile(7,3),{range:4}),e.chest(...f.tile(7,-4),60),t.turn(`+z`),t.hall(5);let p=t.hall(10);e.crusher(...U(p,3,{period:2.4})),e.spike(...U(p,7,{period:2.2,phase:.6})),t.ramp(6,2.5);let m=t.room(7,7);return e.mob(`slime`,...m.tile(1,-2),{path:W(m,1)}).mob(`bat`,...m.tile(4,0),{path:[m.tile(2,2),m.tile(5,-2)]}),t.hall(3),t.exit(3),e}var Ca={tiles:[`#8c95a3`,`#76808e`,`#6d5a48`,`#5e6672`],walls:[`#5f6774`,`#525a66`,`#4a3c30`,`#4c535e`],ambient:[.36,.42,.56],lift:`#7d8694`};function wa(){let e=new na({name:`The Chasm`,depth:4,cols:92,rows:92,palette:Ca,intro:`The floor gives out. Ride the platforms; wait for them.`});e.room(2,4,5,5,60,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:60,heading:`+x`});t.hall(5),t.ferry(8,{period:6.5});let n=t.room(7,7);e.mob(`goblin`,...n.tile(3,-2),{range:5}).mob(`goblin`,...n.tile(5,2),{range:5}),e.gold(...n.tile(6,3),15);let r=t.bridge(10);e.mob(`bat`,...r.tile(3,0),{path:[r.tile(2,-2),r.tile(8,2)]}),t.room(5,5),t.turn(`+z`),t.shaft(5,{period:7}),t.hall(5);let i=t.room(9,9);for(let[t,n]of[[2,-2],[2,2],[6,-2],[6,2]])e.pillar(...i.tile(t,n),.8);e.mob(`goblin`,...i.tile(4,-1),{range:5}).mob(`goblin`,...i.tile(6,3),{range:5}),e.mob(`bat`,...i.tile(1,0),{path:W(i,1)}),e.potion(...i.tile(8,-4)),t.hall(4),t.turn(`+x`);let a=t.ledge(14,{width:2});e.mob(`goblin`,...a.tile(6,0),{range:4,path:[a.tile(3,0),a.tile(10,0)]}),e.gold(...a.tile(12,1),10),t.ferry(9,{period:7});let o=t.room(7,7);e.mob(`goblin`,...o.tile(4,0),{range:4}),t.stairs(5,2.5),t.turn(`+z`);let s=t.bridge(8);e.mob(`bat`,...s.tile(4,0),{path:[s.tile(1,2),s.tile(7,-2)]});let c=t.room(7,7);e.mob(`goblin`,...c.tile(2,2),{range:4}).gold(...c.tile(5,-3),15),t.shaft(4,{period:6.5}),t.hall(4),t.turn(`-x`),t.hall(8),t.ferry(8,{period:6.5});let l=t.room(9,9);e.mob(`goblin`,...l.tile(2,-3),{range:6}).mob(`goblin`,...l.tile(4,3),{range:6}).mob(`goblin`,...l.tile(7,0),{range:6}),e.mob(`bat`,...l.tile(1,0),{path:W(l,1)}),e.chest(...l.tile(4,-4),70).potion(...l.tile(7,4)),e.revive(...l.tile(2,4)),t.hall(3),t.turn(`+z`),t.stairs(6,3),t.bridge(6),t.turn(`+x`,{width:1});let u=t.bridge(6);e.mob(`bat`,...u.tile(3,0),{path:[u.tile(0,-2),u.tile(5,2)]}),t.turn(`+z`,{width:1}),t.bridge(6);let d=t.room(7,7);e.mob(`goblin`,...d.tile(3,-2),{range:5}).mob(`goblin`,...d.tile(4,2),{range:5}),t.hall(3),t.turn(`+x`);let f=t.ledge(12,{width:2});return e.gold(...f.tile(6,1),15),t.ferry(7,{period:6}),t.hall(4),t.stairs(3,1.5),t.exit(3),e}var Ta={tiles:[`#7c7486`,`#6a6274`,`#5a4a3e`,`#5e566a`],walls:[`#554c62`,`#4a4256`,`#3e3226`,`#4c445a`],ambient:[.42,.36,.52],trap:`#4a2a4a`,lift:`#7a7088`};function Ea(){let e=new na({name:`The Fungal Grotto`,depth:5,cols:90,rows:100,palette:Ta,intro:`Mushrooms taller than a man, and things that live in the damp under them.`});e.room(2,4,5,5,60,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:60,heading:`+x`});t.hall(5);let n=t.room(9,9);for(let[t,r]of[[2,-2],[6,2]])e.pillar(...n.tile(t,r),1.4);e.mob(`slime`,...n.tile(1,-3),{path:W(n,1)}).mob(`rat`,...n.tile(5,2),{range:5}),e.gold(...n.tile(7,-3),15),t.stairs(4,2);let r=t.ledge(10,{width:2});e.mob(`rat`,...r.tile(4,0),{range:4}).mob(`rat`,...r.tile(8,1),{range:4});let i=t.room(7,7);e.mob(`goblin`,...i.tile(2,2),{range:4}).mob(`goblin`,...i.tile(5,-2),{range:4}),e.potion(...i.tile(5,2)),t.turn(`+z`),t.hall(4),t.ferry(9,{period:6});let a=t.room(11,11);for(let[t,n]of[[3,-3],[3,3],[7,-3],[7,3]])e.pillar(...a.tile(t,n),1.4);e.mob(`slime`,...a.tile(1,-4),{path:W(a,1,0,6)}),e.mob(`slime`,...a.tile(6,4),{path:W(a,1,5,11).reverse()}),e.mob(`goblin`,...a.tile(5,0),{range:6}).mob(`goblin`,...a.tile(8,-2),{range:6}),e.chest(...a.tile(9,4),60);let o=t.fork().jump(ha(a.tile(5,-6),`+x`));o.hall(3);let s=o.bridge(7);e.mob(`bat`,...s.tile(3,0),{path:[s.tile(1,2),s.tile(6,-2)]});let c=o.room(5,7);e.key(...c.tile(3,0)).mob(`slime`,...c.tile(1,-2),{path:W(c,1)}),e.revive(...c.tile(2,2)),t.hall(3),ga(e,t.hall(6),3),t.turn(`+x`),t.chute(10,3);let l=t.room(9,9);e.mob(`slime`,...l.tile(1,-3),{path:W(l,1)}).mob(`rat`,...l.tile(5,2),{range:5}),e.gold(...l.tile(7,3),20),t.turn(`+z`);let u=t.hall(10);e.spike(...U(u,3,{period:2.3})),e.spike(...U(u,7,{period:2.3,phase:1.15})),t.stairs(4,2);let d=t.room(9,9);e.mob(`goblin`,...d.tile(3,-2),{range:5}).mob(`goblin`,...d.tile(6,2),{range:5}),e.mob(`bat`,...d.tile(4,0),{path:W(d,2)}),e.potion(...d.tile(7,-3)),t.hall(3),t.turn(`-x`);let f=t.bridge(8);e.mob(`bat`,...f.tile(3,0),{path:[f.tile(1,2),f.tile(6,-2)]});let p=t.room(7,7);e.pillar(...p.tile(3,2),1.4),e.mob(`goblin`,...p.tile(3,-1),{range:4}).gold(...p.tile(5,-2),15),t.turn(`+z`),t.ramp(6,2.5);let m=t.room(7,7);return e.mob(`slime`,...m.tile(1,-2),{path:W(m,1)}),t.hall(3),t.exit(3),e}var Da={tiles:[`#9a7c5c`,`#86694c`,`#6e5238`,`#5e4a36`],walls:[`#6e5640`,`#5e4834`,`#4e3a28`,`#54422e`],ambient:[.44,.38,.34],trap:`#4a2a1c`,lift:`#8a6e50`};function Oa(){let e=new na({name:`The Goblin Warrens`,depth:6,cols:112,rows:139,palette:Da,intro:`Goblins, and what they keep. Two gates, two keys.`});e.room(2,4,5,5,70,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:70,heading:`+x`});t.hall(6);let n=t.room(9,7);e.mob(`goblin`,...n.tile(3,-2),{range:5}).mob(`goblin`,...n.tile(6,2),{range:5}),e.gold(...n.tile(8,-3),10),t.turn(`+z`);let r=t.hall(9);e.spike(...U(r,3,{period:2.2})),e.spike(...U(r,6,{period:2.2,phase:1.1}));let i=t.room(11,9);e.mob(`goblin`,...i.tile(3,-2),{range:6}).mob(`goblin`,...i.tile(6,3),{range:6}).mob(`goblin`,...i.tile(8,-3),{range:6}),e.potion(...i.tile(1,4));let a=t.fork().jump(ha(i.tile(5,-5),`+x`));a.hall(5);let o=a.room(7,7);e.key(...o.tile(4,0)).mob(`orc`,...o.tile(3,2),{range:4}).gold(...o.tile(6,-3),20),e.revive(...o.tile(1,0)),ga(e,t.hall(6),3),t.stairs(5,2.5),t.turn(`+x`);let s=t.ledge(12,{width:2});e.mob(`goblin`,...s.tile(5,0),{range:4,path:[s.tile(2,0),s.tile(10,0)]}),t.bridge(6);let c=t.room(9,9);for(let[t,n]of[[3,-2],[3,2],[6,-2],[6,2]])e.pillar(...c.tile(t,n),.6);e.mob(`rat`,...c.tile(2,-3),{range:6}).mob(`rat`,...c.tile(4,3),{range:6}).mob(`rat`,...c.tile(7,-1),{range:6}),e.mob(`goblin`,...c.tile(5,0),{range:5}),e.gold(...c.tile(8,4),15),t.hall(3),t.turn(`+z`),t.ramp(8,3);let l=t.hall(10);e.spike(...U(l,3,{period:2})),e.spike(...U(l,7,{period:2,phase:1}));let u=t.room(11,11);e.mob(`orc`,...u.tile(5,0),{range:6}).mob(`orc`,...u.tile(8,-3),{range:6}),e.mob(`goblin`,...u.tile(3,3),{range:6}).mob(`goblin`,...u.tile(7,4),{range:6}),e.chest(...u.tile(9,5),80);let d=t.fork().jump(ha(u.tile(5,-6),`+x`)),f=d.hall(6);e.spike(...U(f,3,{period:2.4,phase:.6}));let p=d.room(5,7);e.key(...p.tile(3,0)).mob(`goblin`,...p.tile(2,2),{range:4}).mob(`goblin`,...p.tile(2,-2),{range:4}),e.gold(...p.tile(4,3),25),t.hall(4),t.turn(`+x`),t.hall(4),ga(e,t.hall(6),2),t.stairs(4,2),t.turn(`+z`);let m=t.hall(12);e.spike(...U(m,2,{period:1.9})),e.spike(...U(m,5,{period:1.9,phase:.6})),e.spike(...U(m,8,{period:1.9,phase:1.2})),e.mob(`goblin`,...m.tile(10,0),{range:3});let h=t.room(9,9);e.mob(`orc`,...h.tile(4,0),{range:5}).mob(`rat`,...h.tile(2,3),{range:5}).mob(`rat`,...h.tile(6,-3),{range:5}),e.potion(...h.tile(7,4)).gold(...h.tile(1,-4),15),t.hall(3);let g=t.hall(6,{width:1});e.mob(`goblin`,...g.tile(4,0),{range:3}),t.turn(`+x`,{width:1});let _=t.hall(5,{width:1});e.gold(..._.tile(2,0),10),t.turn(`+z`,{width:1}),t.stairs(4,2,{width:1}),t.turn(`-x`,{width:1});let v=t.hall(4,{width:1});e.mob(`rat`,...v.tile(2,0),{range:3}),t.turn(`+z`,{width:1}),t.hall(3,{width:1});let y=t.room(11,11);for(let[t,n]of[[3,-3],[3,3],[7,-3],[7,3]])e.pillar(...y.tile(t,n),.6);e.mob(`slime`,...y.tile(1,-4),{path:W(y,1,0,6)}).mob(`slime`,...y.tile(6,4),{path:W(y,1,5,11).reverse()}),e.mob(`goblin`,...y.tile(5,0),{range:5}),e.potion(...y.tile(9,-5)).chest(...y.tile(10,5),50),t.hall(3),t.turn(`+x`);let b=t.ledge(12,{width:2});e.mob(`goblin`,...b.tile(8,1),{range:4}),t.bridge(5);let x=t.room(7,7);return e.mob(`goblin`,...x.tile(3,-2),{range:4}).mob(`goblin`,...x.tile(4,2),{range:4}),t.stairs(3,1.5),t.hall(3),t.exit(3),e}var ka={tiles:[`#a99d89`,`#968a76`,`#7a6a52`,`#857a68`],walls:[`#7d725f`,`#6c6250`,`#584c3a`,`#6a5f4e`],ambient:[.5,.46,.4],trap:`#4a3a2a`,lift:`#9a8e78`};function Aa(){let e=new na({name:`The Quarry`,depth:7,cols:100,rows:106,palette:ka,intro:`They cut stone here, until some of the stone broke loose and came rolling after them.`});e.room(2,4,5,5,80,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:80,heading:`+x`});t.hall(5);let n=t.room(9,9);for(let[t,r]of[[2,-2],[6,2]])e.pillar(...n.tile(t,r),1.2);e.mob(`rock`,...n.tile(5,-1),{range:5}).mob(`goblin`,...n.tile(3,2),{range:5}),e.gold(...n.tile(7,-3),15),t.ramp(6,2),t.hall(2),t.ferry(9,{period:6});let r=t.room(7,7);e.mob(`rock`,...r.tile(4,0),{range:4}).potion(...r.tile(5,2)),t.turn(`+z`),t.hall(4);let i=t.hall(10);e.crusher(...U(i,3,{period:2.4})),e.crusher(...U(i,7,{period:2.4,phase:1.2})),t.stairs(5,2.5);let a=t.room(11,11);for(let[t,n]of[[3,-3],[7,3]])e.pillar(...a.tile(t,n),1.2);e.mob(`rock`,...a.tile(4,-2),{range:6}).mob(`rock`,...a.tile(8,3),{range:6}),e.mob(`goblin`,...a.tile(6,0),{range:6}).mob(`goblin`,...a.tile(2,3),{range:6}),e.mob(`bat`,...a.tile(5,0),{path:W(a,2)}),e.chest(...a.tile(9,-4),70);let o=t.fork().jump(ha(a.tile(5,-6),`+x`));o.hall(3),o.bridge(6);let s=o.room(5,7);e.key(...s.tile(3,0)).mob(`rock`,...s.tile(2,2),{range:3}).gold(...s.tile(4,-2),25),e.revive(...s.tile(1,-2)),t.hall(3),ga(e,t.hall(6),3),t.turn(`+x`);let c=t.ledge(12,{width:2});e.mob(`goblin`,...c.tile(4,0),{range:4}).mob(`goblin`,...c.tile(9,1),{range:4}),t.shaft(4,{period:7}),t.hall(3);let l=t.room(9,9);e.mob(`rock`,...l.tile(3,-2),{range:5}).mob(`rock`,...l.tile(6,2),{range:5}).mob(`rat`,...l.tile(4,3),{range:5}),e.potion(...l.tile(7,-3)),t.turn(`+z`),t.chute(10,3);let u=t.room(9,9);e.mob(`rock`,...u.tile(3,2),{range:5}).mob(`rock`,...u.tile(6,-2),{range:5}).mob(`goblin`,...u.tile(4,0),{range:5}),e.gold(...u.tile(7,3),20),t.hall(3),t.turn(`-x`);let d=t.bridge(8);e.mob(`bat`,...d.tile(3,0),{path:[d.tile(1,2),d.tile(6,-2)]});let f=t.room(7,7);e.mob(`goblin`,...f.tile(3,0),{range:4}).mob(`bat`,...f.tile(4,2),{path:[f.tile(1,-2),f.tile(5,2)]}),t.stairs(4,2),t.turn(`+z`);let p=t.hall(10);e.crusher(...U(p,2,{period:2.2})),e.spike(...U(p,5,{period:2})),e.crusher(...U(p,8,{period:2.2,phase:1.1}));let m=t.room(11,11);for(let[t,n]of[[2,-3],[5,3],[8,-2]])e.pillar(...m.tile(t,n),1.4);return e.mob(`rock`,...m.tile(3,1),{range:6}).mob(`rock`,...m.tile(6,-2),{range:6}).mob(`rock`,...m.tile(9,2),{range:6}),e.chest(...m.tile(9,-4),80).potion(...m.tile(1,4)),t.hall(3),t.exit(3),e}var ja={tiles:[`#b09468`,`#9a8058`,`#7a5a38`,`#8a7254`],walls:[`#7a6244`,`#6a5438`,`#54402a`,`#634e36`],ambient:[.54,.42,.3],trap:`#5a3a1a`,lift:`#a08660`};function Ma(){let e=new na({name:`The Hatchery`,depth:8,cols:100,rows:108,palette:ja,intro:`Warm, and quiet, and something down here is about to hatch.`});e.room(2,4,5,5,72,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:72,heading:`+x`});t.hall(5);let n=t.room(9,9);e.mob(`slime`,...n.tile(1,-3),{path:W(n,1)}),e.mob(`rat`,...n.tile(4,2),{range:5}).mob(`rat`,...n.tile(6,-2),{range:5}),e.gold(...n.tile(7,3),15),t.stairs(4,2);let r=t.hall(8);e.spike(...U(r,3,{period:2.2})),e.spike(...U(r,6,{period:2.2,phase:1.1}));let i=t.room(7,7);e.mob(`goblin`,...i.tile(2,2),{range:4}).mob(`goblin`,...i.tile(5,-2),{range:4}),t.turn(`+z`),t.hall(4),t.ferry(9,{period:6});let a=t.room(9,9);for(let[t,n]of[[2,-2],[6,2]])e.pillar(...a.tile(t,n),.8);e.mob(`slime`,...a.tile(1,-3),{path:W(a,1,0,5)}),e.mob(`slime`,...a.tile(5,3),{path:W(a,1,4,9).reverse()}),e.mob(`rock`,...a.tile(4,0),{range:4}),e.potion(...a.tile(7,-3));let o=t.fork().jump(ha(a.tile(4,-5),`+x`));o.hall(3);let s=o.bridge(7);e.mob(`bat`,...s.tile(3,0),{path:[s.tile(1,2),s.tile(6,-2)]});let c=o.room(5,7);e.key(...c.tile(3,0)).mob(`rat`,...c.tile(1,-2),{range:3}).mob(`rat`,...c.tile(4,2),{range:3}),e.revive(...c.tile(3,-2)),e.gold(...c.tile(2,2),25),t.hall(3),ga(e,t.hall(6),3),t.turn(`+x`);let l=t.ledge(12,{width:2});e.mob(`goblin`,...l.tile(4,0),{range:4}).mob(`goblin`,...l.tile(9,1),{range:4}),t.stairs(5,2.5);let u=t.room(9,9);e.mob(`rock`,...u.tile(3,-2),{range:5}).mob(`rock`,...u.tile(6,2),{range:5}),e.mob(`bat`,...u.tile(4,0),{path:W(u,2)}),e.chest(...u.tile(7,-3),70),t.turn(`+z`);let d=t.hall(10);e.crusher(...U(d,3,{period:2.4})),e.crusher(...U(d,7,{period:2.4,phase:1.2})),t.chute(8,3);let f=t.room(9,9);e.mob(`slime`,...f.tile(1,-3),{path:W(f,1)}),e.mob(`goblin`,...f.tile(4,2),{range:5}).mob(`rat`,...f.tile(6,-2),{range:5}),e.gold(...f.tile(7,3),20),t.hall(3),t.turn(`-x`);let p=t.bridge(10);e.mob(`bat`,...p.tile(3,0),{path:[p.tile(1,2),p.tile(6,-2)]}),e.mob(`bat`,...p.tile(8,0),{path:[p.tile(6,-2),p.tile(9,2)]});let m=t.room(7,7);e.mob(`goblin`,...m.tile(3,0),{range:4}),e.potion(...m.tile(1,2)).potion(...m.tile(5,-2)),e.revive(...m.tile(3,2)),t.turn(`+z`),t.stairs(5,2.5),t.hall(4);let h=t.room(15,13);for(let[t,n]of[[3,-4],[3,4],[8,-4],[8,4]])e.pillar(...h.tile(t,n),.8);for(let[t,n]of[[1,-5],[2,5],[6,-6],[7,6],[11,-5],[12,5]])e.gold(...h.tile(t,n),25);return e.chest(...h.tile(13,-5),110).chest(...h.tile(13,5),110),e.mob(`egg`,...h.tile(11,0),{range:3,facing:Math.PI}),t.hall(3),t.exit(3),e}var Na={tiles:[`#7e828a`,`#6c7078`,`#5e4a3a`,`#62666e`],walls:[`#565a62`,`#4a4e56`,`#42342a`,`#4e525a`],ambient:[.42,.42,.48],trap:`#5a2a1a`,lift:`#80848c`};function Pa(){let e=new na({name:`The Iron Halls`,depth:9,cols:84,rows:104,palette:Na,intro:`The orcs' fortress. Two gates, two keys, and everything that guards them.`});e.room(2,4,5,5,90,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:90,heading:`+x`});t.hall(4);let n=t.room(9,9);e.mob(`orc`,...n.tile(3,-2),{range:5}).mob(`orc`,...n.tile(6,2),{range:5}).mob(`goblin`,...n.tile(4,3),{range:5});let r=t.hall(10);e.crusher(...U(r,3,{period:2.3})),e.crusher(...U(r,7,{period:2.3,phase:1.15})),t.stairs(4,2);let i=t.room(7,7);e.mob(`skeleton`,...i.tile(2,-2),{range:4}).mob(`skeleton`,...i.tile(5,2),{range:4}),e.potion(...i.tile(5,-2)),t.turn(`+z`),t.hall(4);let a=t.room(11,11);for(let[t,n]of[[3,-3],[3,3],[7,-3],[7,3]])e.pillar(...a.tile(t,n),.8);e.mob(`orc`,...a.tile(4,-1),{range:6}).mob(`orc`,...a.tile(8,2),{range:6}),e.mob(`goblin`,...a.tile(2,3),{range:6}).mob(`goblin`,...a.tile(6,-4),{range:6}),e.chest(...a.tile(9,-4),80);let o=t.fork().jump(ha(a.tile(5,-6),`+x`));o.hall(3),o.ferry(9,{period:6});let s=o.room(5,7);e.key(...s.tile(3,0)).mob(`orc`,...s.tile(2,2),{range:3}),e.revive(...s.tile(1,-2)),t.hall(3),ga(e,t.hall(6),3),t.turn(`+x`);let c=t.ledge(12,{width:2});e.mob(`goblin`,...c.tile(4,0),{range:4}).mob(`goblin`,...c.tile(9,1),{range:4}),t.shaft(4,{period:7}),t.hall(3);let l=t.room(9,9);e.mob(`rock`,...l.tile(3,-2),{range:5}).mob(`rock`,...l.tile(6,2),{range:5}).mob(`orc`,...l.tile(4,0),{range:5});let u=t.fork().jump(ha(l.tile(4,5),`+z`));u.hall(2),u.bridge(4);let d=u.room(5,5);e.key(...d.tile(3,0)).mob(`skeleton`,...d.tile(2,1),{range:3}).gold(...d.tile(4,-1),25),t.turn(`+z`),ga(e,t.hall(6),3),t.chute(10,3);let f=t.room(11,11);for(let[t,n]of[[3,-3],[3,3],[7,-3],[7,3]])e.pillar(...f.tile(t,n),.8);e.mob(`orc`,...f.tile(3,0),{range:6}).mob(`orc`,...f.tile(6,-3),{range:6}).mob(`orc`,...f.tile(8,3),{range:6}),e.mob(`skeleton`,...f.tile(5,2),{range:6}),e.chest(...f.tile(9,-4),100).potion(...f.tile(1,4)),t.hall(3),t.turn(`-x`);let p=t.bridge(8);e.mob(`bat`,...p.tile(3,0),{path:[p.tile(1,2),p.tile(6,-2)]});let m=t.room(7,7);e.mob(`goblin`,...m.tile(2,2),{range:4}).mob(`goblin`,...m.tile(5,-2),{range:4}),e.potion(...m.tile(5,2)),t.turn(`+z`);let h=t.hall(10);e.crusher(...U(h,2,{period:2.2})),e.spike(...U(h,5,{period:2})),e.crusher(...U(h,8,{period:2.2,phase:1.1})),t.ramp(6,2.5);let g=t.room(9,9);return e.mob(`orc`,...g.tile(4,-2),{range:5}).mob(`rock`,...g.tile(5,2),{range:5}),e.gold(...g.tile(7,3),30),t.hall(3),t.exit(3),e}var Fa={tiles:[`#6a6460`,`#5a5450`,`#4a3a30`,`#3e3a38`],walls:[`#4a4442`,`#3e3936`,`#33281f`,`#34302e`],ambient:[.5,.36,.3],trap:`#4a2418`,lift:`#6e6662`};function Ia(e,t,n,r,i,{below:a=.6}={}){let o=t.h,s=t.room(n,r);e.lava(s.x,s.z,s.w,s.d,o-a);for(let t=0;t<n;t++)for(let n=s.lo;n<s.lo+r;n++)i(t,n)&&e.flat(...s.tile(t,n),1,1,o);return s}function La(){let e=new na({name:`The Forge`,depth:10,cols:155,rows:123,palette:Fa,intro:`Rivers of fire, and the hammers of the deep. Stay on the stone.`});e.room(2,4,5,5,80,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:80,heading:`+x`});t.hall(5);let n=Ia(e,t,11,7,(e,t)=>e<2||e>8||(e<5?t===-1:e===5?t>=-1&&t<=1:t===1));e.mob(`skeleton`,...n.tile(9,0),{range:4}),t.hall(4);let r=t.hall(10);e.crusher(...U(r,2,{period:2.4})),e.crusher(...U(r,5,{period:2.4,phase:.8})),e.crusher(...U(r,8,{period:2.4,phase:1.6}));let i=t.room(9,9);e.mob(`orc`,...i.tile(4,0),{range:5}).mob(`skeleton`,...i.tile(6,3),{range:5}),e.gold(...i.tile(7,-3),20).potion(...i.tile(1,4)),t.turn(`+z`),t.stairs(5,2.5),t.hall(3);let a=t.ferry(8,{period:6.5});e.lava(a.x-3,a.z,a.w+6,a.d,t.h-1,{fill:!0});let o=t.room(7,7);e.mob(`wraith`,...o.tile(1,0),{path:W(o,1)}),t.hall(3),t.turn(`+x`);let s=t.hall(2,{walls:`z0`});e.lava(s.x+2,s.z-4,9,9,t.h-1.2,{fill:!0});let c=t.bridge(9);e.mob(`wraith`,...c.tile(4,0),{path:[c.tile(1,-2),c.tile(7,2)]});let l=t.room(9,9);e.mob(`orc`,...l.tile(3,-2),{range:5}).mob(`orc`,...l.tile(6,2),{range:5}),e.chest(...l.tile(8,-4),80),t.hall(3),t.turn(`+z`),t.ramp(8,3);let u=Ia(e,t,13,13,(e,t)=>e<2||e>10||t===0||e===6&&Math.abs(t)<=5||Math.abs(t)===5&&e>=4&&e<=8);e.mob(`wraith`,...u.tile(4,5),{path:[u.tile(4,5),u.tile(8,5),u.tile(8,-5),u.tile(4,-5)]}),e.mob(`orc`,...u.tile(6,0),{range:4}),e.potion(...u.tile(6,-5)).gold(...u.tile(6,5),30),t.hall(4);let d=t.hall(8,{width:1});e.crusher(...U(d,2,{period:2.2})),e.crusher(...U(d,5,{period:2.2,phase:1.1})),t.hall(3),t.turn(`+x`);let f=t.ledge(12,{width:2});e.mob(`skeleton`,...f.tile(6,0),{range:4}).gold(...f.tile(10,1),15),t.ferry(8,{period:6});let p=t.room(9,9);e.mob(`orc`,...p.tile(3,0),{range:5}).mob(`wraith`,...p.tile(1,-3),{path:W(p,1)}),e.mob(`skeleton`,...p.tile(6,3),{range:5}),t.hall(3),t.turn(`+z`);let m=t.chute(10,3,{width:3});e.lava(m.x-3,m.z,9,m.d,t.h-.8,{fill:!0});let h=t.room(7,7);e.mob(`orc`,...h.tile(4,0),{range:4}).potion(...h.tile(1,-3),10),e.revive(...h.tile(1,3)),t.hall(3),t.turn(`+x`);let g=new Set([`2,0`,`3,0`,`3,-1`,`3,-2`,`4,-2`,`5,-2`,`5,-1`,`5,0`,`5,1`,`5,2`,`6,2`,`7,2`,`7,1`,`7,0`,`8,0`,`9,0`,`10,0`]),_=Ia(e,t,13,5,(e,t)=>e<2||e>10||g.has(`${e},${t}`));e.mob(`wraith`,..._.tile(5,0),{path:[_.tile(2,-2),_.tile(10,-2),_.tile(10,2),_.tile(2,2)]}),t.hall(3);let v=t.bridge(9,{width:3});e.lava(v.x,v.z-3,v.w,9,t.h-1.2,{fill:!0}),e.crusher(...U(v,3,{period:2.5})),e.crusher(...U(v,6,{period:2.5,phase:1.25}));let y=t.room(9,9);e.mob(`orc`,...y.tile(3,-2),{range:5}).mob(`skeleton`,...y.tile(6,3),{range:5}),e.gold(...y.tile(8,-4),30).potion(...y.tile(1,4),10),t.hall(3),t.turn(`+z`),t.stairs(5,2.5);let b=Ia(e,t,9,7,(e,t)=>e<2||e>6||e===2&&t<=0||e===3&&t===-2||e===4||e===5&&t===2||e===6&&t>=0);return e.mob(`skeleton`,...b.tile(7,0),{range:3}),t.hall(4),t.exit(3),e}var Ra={tiles:[`#7a8296`,`#687084`,`#4e4a5e`,`#5e667a`],walls:[`#525a6e`,`#464e62`,`#3a3448`,`#4c5468`],ambient:[.34,.4,.58],trap:`#2a3a5a`,lift:`#7a8298`};function za(){let e=new na({name:`The Spirit Well`,depth:11,cols:82,rows:98,palette:Ra,intro:`A well that goes down further than wells go. The dead drift up it.`});e.room(2,4,5,5,110,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:110,heading:`+x`});t.hall(5);let n=t.room(9,9);for(let[t,r]of[[2,-2],[2,2],[6,-2],[6,2]])e.pillar(...n.tile(t,r),.8);e.mob(`wraith`,...n.tile(1,-3),{path:W(n,1)}),e.mob(`skeleton`,...n.tile(4,0),{range:5}).mob(`skeleton`,...n.tile(7,2),{range:5});let r=t.bridge(8);e.mob(`bat`,...r.tile(3,0),{path:[r.tile(1,2),r.tile(6,-2)]});let i=t.room(7,7);e.mob(`skeleton`,...i.tile(3,0),{range:4}).potion(...i.tile(5,2)),t.shaft(5,{period:7}),t.hall(3),t.turn(`+z`);let a=t.hall(10);e.spike(...U(a,3,{period:2.2})),e.spike(...U(a,7,{period:2.2,phase:1.1}));let o=t.room(11,11);for(let[t,n]of[[3,-3],[3,3],[7,-3],[7,3]])e.pillar(...o.tile(t,n),.8);e.mob(`wraith`,...o.tile(1,-4),{path:W(o,1,0,6)}),e.mob(`wraith`,...o.tile(6,4),{path:W(o,1,5,11).reverse()}),e.mob(`skeleton`,...o.tile(5,0),{range:6}).mob(`skeleton`,...o.tile(8,-2),{range:6}),e.chest(...o.tile(9,4),90);let s=t.fork().jump(ha(o.tile(5,-6),`+x`));s.hall(3);let c=s.bridge(7);e.mob(`bat`,...c.tile(3,0),{path:[c.tile(1,2),c.tile(6,-2)]});let l=s.room(5,7);e.key(...l.tile(3,0)).mob(`wraith`,...l.tile(1,-2),{path:W(l,1)}),e.revive(...l.tile(2,2)),t.hall(3),ga(e,t.hall(6),3),t.turn(`+x`);let u=t.ledge(12,{width:2});e.mob(`skeleton`,...u.tile(4,0),{range:4}).mob(`skeleton`,...u.tile(9,1),{range:4}),t.bridge(6);let d=t.room(7,7);e.mob(`wraith`,...d.tile(3,0),{path:W(d,1)}).mob(`bat`,...d.tile(4,2),{path:[d.tile(1,-2),d.tile(5,2)]}),t.turn(`+z`),t.shaft(5,{period:7}),t.hall(3);let f=t.room(9,9);e.mob(`wraith`,...f.tile(1,-3),{path:W(f,1)}),e.mob(`skeleton`,...f.tile(4,2),{range:5}).mob(`skeleton`,...f.tile(6,-2),{range:5}),e.potion(...f.tile(7,3)),t.hall(3),t.turn(`-x`);let p=t.bridge(10);e.mob(`bat`,...p.tile(3,0),{path:[p.tile(1,2),p.tile(6,-2)]}),e.mob(`bat`,...p.tile(8,0),{path:[p.tile(6,-2),p.tile(9,2)]});let m=t.room(7,7);e.mob(`skeleton`,...m.tile(3,0),{range:4}),e.revive(...m.tile(5,2)).gold(...m.tile(1,-2),20),t.turn(`+z`);let h=t.hall(10);e.crusher(...U(h,3,{period:2.3})),e.crusher(...U(h,7,{period:2.3,phase:1.15})),t.stairs(5,2.5);let g=t.room(9,9);for(let[t,n]of[[2,-2],[2,2],[6,-2],[6,2]])e.pillar(...g.tile(t,n),.8);return e.mob(`wraith`,...g.tile(1,-3),{path:W(g,1)}).mob(`wraith`,...g.tile(4,0),{path:[g.tile(4,-1),g.tile(4,1)]}),e.mob(`skeleton`,...g.tile(5,1),{range:5}).mob(`skeleton`,...g.tile(7,-3),{range:5}),e.chest(...g.tile(7,4),110),t.hall(3),t.exit(3),e}var Ba={tiles:[`#8a6a5a`,`#74584a`,`#5a4030`,`#4e3a32`],walls:[`#5e463a`,`#4e3a30`,`#3e2c22`,`#46342c`],ambient:[.46,.34,.32],trap:`#4a2016`,lift:`#7a6050`};function Va(){let e=new na({name:`The Dragon's Lair`,depth:12,cols:83,rows:130,palette:Ba,intro:`At the bottom of everything, something large is asleep on the gold.`});e.room(2,4,5,5,96,{torches:3}),e.start={x:4,z:6};let t=ma(e,{x:7,z:6,h:96,heading:`+x`});t.hall(6);let n=t.room(9,9);e.mob(`skeleton`,...n.tile(3,-2),{range:5}).mob(`skeleton`,...n.tile(6,2),{range:5}).mob(`wraith`,...n.tile(1,0),{path:W(n,1)}),t.turn(`+z`);let r=t.hall(9);e.crusher(...U(r,3,{period:2.3})),e.crusher(...U(r,6,{period:2.3,phase:1.15})),t.stairs(5,2.5);let i=t.room(11,9);e.mob(`orc`,...i.tile(3,-2),{range:6}).mob(`orc`,...i.tile(7,2),{range:6}).mob(`goblin`,...i.tile(5,-3),{range:6}),e.potion(...i.tile(9,4));let a=t.fork().jump(ha(i.tile(5,-5),`+x`));a.hall(3);let o=a.bridge(7);e.mob(`bat`,...o.tile(3,0),{path:[o.tile(1,2),o.tile(6,-2)]});let s=a.room(7,7);e.key(...s.tile(4,0)).mob(`skeleton`,...s.tile(2,2),{range:4}).mob(`skeleton`,...s.tile(5,-2),{range:4}),e.potion(...s.tile(1,-3),10),e.revive(...s.tile(1,3)),e.gold(...s.tile(6,3),30),ga(e,t.hall(6),3),t.turn(`+x`),t.ferry(9,{period:7});let c=t.ledge(12,{width:2});e.mob(`goblin`,...c.tile(4,0),{range:4}).mob(`goblin`,...c.tile(9,1),{range:4}),t.bridge(6);let l=Ia(e,t,11,9,(e,t)=>e<2||e>8||(e%4<2?t===-2:t===2)||e%2==1&&Math.abs(t)<=2&&e!==1);e.mob(`wraith`,...l.tile(5,0),{path:[l.tile(3,-2),l.tile(3,2),l.tile(7,2),l.tile(7,-2)]}),t.hall(3),t.turn(`+z`),t.shaft(5,{period:7}),t.hall(4);let u=t.hall(12);e.spike(...U(u,2,{period:2})),e.crusher(...U(u,5,{period:2.4})),e.spike(...U(u,8,{period:2,phase:1}));let d=t.room(7,7);e.mob(`skeleton`,...d.tile(3,-2),{range:4}).potion(...d.tile(5,2),10),t.hall(2),t.turn(`-x`);let f=t.bridge(14);e.mob(`bat`,...f.tile(3,0),{path:[f.tile(2,-2),f.tile(7,2)]}),e.mob(`bat`,...f.tile(10,0),{path:[f.tile(8,2),f.tile(13,-2)]});let p=t.room(7,7);e.mob(`goblin`,...p.tile(3,2),{range:4}).mob(`goblin`,...p.tile(4,-2),{range:4}),e.gold(...p.tile(5,3),20),t.hall(2),t.turn(`+z`),t.stairs(5,2.5);let m=t.room(9,9);for(let[t,n]of[[2,-2],[2,2],[6,-2],[6,2]])e.pillar(...m.tile(t,n),.8);e.mob(`wraith`,...m.tile(1,-3),{path:W(m,1)}).mob(`orc`,...m.tile(4,0),{range:5}).mob(`skeleton`,...m.tile(7,3),{range:5}),e.chest(...m.tile(8,-4),90),t.hall(3),t.turn(`+x`),t.stairs(5,2.5);let h=t.hall(2,{walls:`z0`});e.lava(h.x+2,h.z-4,10,9,t.h-1.2,{fill:!0});let g=t.bridge(10);e.mob(`bat`,...g.tile(3,0),{path:[g.tile(1,-2),g.tile(8,2)]}),e.mob(`wraith`,...g.tile(7,0),{path:[g.tile(4,3),g.tile(9,-3)]});let _=t.room(9,9);e.mob(`orc`,..._.tile(3,-2),{range:5}).mob(`orc`,..._.tile(6,2),{range:5}),e.potion(..._.tile(1,4)).potion(..._.tile(8,-4)),e.revive(..._.tile(8,4)),t.hall(3),t.turn(`+z`),t.ferry(9,{period:7}),t.hall(4);let v=t.room(15,13);for(let[t,n]of[[3,-4],[3,4],[8,-4],[8,4]])e.pillar(...v.tile(t,n),.8);for(let[t,n]of[[1,-5],[2,5],[6,-6],[7,6],[11,-5],[12,5]])e.gold(...v.tile(t,n),25);return e.chest(...v.tile(13,-5),120).chest(...v.tile(13,5),120),e.mob(`dragon`,...v.tile(14,0),{range:3,facing:Math.PI}),t.hall(3),t.exit(3),e}var Ha=[va,ba,Sa,wa,Ea,Oa,Aa,Ma,Pa,La,za,Va];function Ua(e){return Ha[e]()}var Wa=Object.freeze({yaw:Math.PI/4,pitch:Math.atan2(1.15,Math.SQRT2),zoom:1}),Ga=Object.freeze({pitch:[.26,1.4],zoom:[.3,2.6]}),Ka=(e,[t,n])=>Math.min(n,Math.max(t,e));function qa(e=Wa){let t={yaw:e.yaw,pitch:e.pitch,zoom:e.zoom,aim:{yaw:e.yaw,pitch:e.pitch,zoom:e.zoom},turn(e,n=0){t.aim.yaw+=e,t.aim.pitch=Ka(t.aim.pitch+n,Ga.pitch)},zoomBy(e){t.aim.zoom=Ka(t.aim.zoom*e,Ga.zoom)},reset(){let e=Math.round((t.aim.yaw-Wa.yaw)/(Math.PI*2));Object.assign(t.aim,{...Wa,yaw:Wa.yaw+e*Math.PI*2})},step(e,n=!1){let r=n?1:1-Math.exp(-12*e);t.yaw+=(t.aim.yaw-t.yaw)*r,t.pitch+=(t.aim.pitch-t.pitch)*r,t.zoom+=(t.aim.zoom-t.zoom)*r},direction(){let e=Math.cos(t.pitch);return[Math.sin(t.yaw)*e,Math.sin(t.pitch),Math.cos(t.yaw)*e]}};return t}function Ja(e=Wa.yaw){return{right:[Math.cos(e),-Math.sin(e)],up:[-Math.sin(e),-Math.cos(e)]}}var Ya=1/120,Xa=Object.freeze({below:1.6,rate:7}),Za=Object.freeze({fell:6,burnt:10,crushed:9,spiked:5,thud:3});function Qa({x:e,y:t},n){let{right:r,up:i}=Ja(n);return[e*r[0]+t*i[0],e*r[1]+t*i[1]]}function $a(e,t,{ball:n=M({r:ie}),die:r=ye()}={}){let i=Ua(t),a=ca(i),o=i.lowest-6-2,s=Xi(e,i,a.world,{killY:o}),{x:c,z:l}=i.start,u=[c+.5,i.heightAt(c+.5,l+.5)+n.r,l+.5],d={index:t,level:i,built:a,world:a.world,actors:s,killY:o,ball:n,die:r,model:de(e),time:0,safe:u,keys:0,explored:new Uint8Array(i.cols*i.rows),lockedAt:-1/0};return s.place(0),N(n,...u),no(d),d}function eo(e){N(e.ball,...e.safe)}var to=e=>me(e.model,e.die.q).number;function no(e){let{level:t,ball:n,explored:r}=e,i=Math.floor(n.x),a=Math.floor(n.z);for(let e=a-6;e<=a+6;e++)for(let n=i-6;n<=i+6;n++)n<0||e<0||n>=t.cols||e>=t.rows||(n-i)**2+(e-a)**2<=36&&(r[e*t.cols+n]=1)}function ro(e,t,n=Ya,{live:r=!0,moving:i=!0}={}){let a=e.ball,o=e.level;e.time+=n,e.actors.place(e.time,n);let s=e.actors.step(n,e.time,r&&i?a:null),c={impact:0,outcome:null,hurt:null,fight:null,picked:[],door:null};if(!i)return c;let l=ee(a,e.world,t[0],t[1],n);if(a.grounded&&!a.on&&Math.hypot(t[0],t[1])<.05&&a.ny>.97&&Math.hypot(a.vx,a.vz)<Xa.below){let e=Math.max(0,1-Xa.rate*n);a.vx*=e,a.vz*=e}if(be(e.die,a,e.model,n),c.impact=l.impact,!r)return c;let u=Math.floor(a.x),d=Math.floor(a.z),f=o.cell(u,d),p=a.grounded&&!a.on&&f&&a.y-a.r-o.heightAt(a.x,a.z)<.2;if(l.crushed)return c.outcome=`crushed`,c;if(p&&f.kind===`lava`)return c.outcome=`burnt`,c;if(a.y<e.killY)return c.outcome=`fell`,c;l.landed&&l.impact>E&&(c.hurt=`thud`);for(let t of e.actors.spikes){if(t.out<.5||!p||u<t.x||d<t.z||u>=t.x+t.w||d>=t.z+t.d)continue;let n=Math.floor((e.time+t.phase)/t.period);t.struck!==n&&(t.struck=n,c.hurt=`spiked`,a.vy=7,a.grounded=!1)}if(s)return c.fight=s,c.roll=to(e),c;for(let t of e.actors.pickups)t.taken||Math.hypot(t.x-a.x,t.z-a.z)<.55&&Math.abs(a.y-a.r-t.y)<.8&&(t.taken=!0,t.kind===`key`&&e.keys++,c.picked.push(t));for(let t of e.actors.doors){if(!t.box.solid||t.opening>=0)continue;let n=Math.max(t.box.min[0],Math.min(a.x,t.box.max[0])),r=Math.max(t.box.min[1],Math.min(a.y,t.box.max[1])),i=Math.max(t.box.min[2],Math.min(a.z,t.box.max[2]));Math.hypot(a.x-n,a.y-r,a.z-i)>a.r+.08||(e.keys>0?(e.keys--,e.actors.open(t,e.time),c.door=`opened`):e.time-e.lockedAt>2&&(e.lockedAt=e.time,c.door=`locked`))}return a.grounded&&!a.on&&f&&(f.kind===`exit`?c.outcome=`exit`:o.isSafe(u,d)&&(e.safe=[u+.5,f.h[0]+a.r,d+.5])),no(e),c}var io=18;function ao(e,t){let n=new e.Group;n.name=`effects`,t.add(n);let r=null,i=[],a=new e.SphereGeometry(.16,12,8),o=new e.MeshStandardMaterial({name:`smoke`,color:new e.Color(`#b9b2c4`),roughness:1,transparent:!0,opacity:.55,depthWrite:!1}),s=new e.CylinderGeometry(.06,.06,.02,12),c=new e.MeshStandardMaterial({name:`coin`,color:new e.Color(`#ffcf4a`),metalness:1,roughness:.25,emissive:new e.Color(`#6a4a00`),emissiveIntensity:.6}),l=new e.SphereGeometry(.035,6,4),u=new Map,d=t=>(u.has(t)||u.set(t,new e.MeshBasicMaterial({name:`glow`,color:new e.Color(t),toneMapped:!1})),u.get(t)),f=new e.BoxGeometry(.05,.05,.05),p=new e.MeshStandardMaterial({name:`grit`,color:new e.Color(`#8a8276`),roughness:1});function m(e,{x:t,y:r,z:a,vx:o,vy:s,vz:c,life:l,spin:u=6,drag:d=0,floaty:f=1,bounce:p=.35,grow:m=0}){e.position.set(t,r,a),e.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6),n.add(e),i.push({mesh:e,vx:o,vy:s,vz:c,life:l,age:0,drag:d,floaty:f,bounce:p,grow:m,spin:[(Math.random()-.5)*u,(Math.random()-.5)*u,(Math.random()-.5)*u],scale:e.scale.x})}let h=(e,t)=>{let n=Math.random()*Math.PI*2,r=e*(.4+Math.random()*.6);return[Math.cos(n)*r,t*(.5+Math.random()),Math.sin(n)*r]};return{setDungeon(e){r=e;for(let e of i)n.remove(e.mesh);i.length=0},poof(t,n,r,i=1){for(let s=0;s<16*i;s++){let s=new e.Mesh(a,o);s.scale.setScalar((.6+Math.random()*.8)*i);let[c,,l]=h(1.2*i,0);m(s,{x:t+c*.2,y:n+.2+Math.random()*.4*i,z:r+l*.2,vx:c,vy:.6+Math.random(),vz:l,life:.9+Math.random()*.5,floaty:-.05,drag:2.5,spin:1,bounce:0,grow:1.4})}},coins(t,n,r,i=14){for(let a=0;a<i;a++){let i=new e.Mesh(s,c),[a,o,l]=h(2.2,6);m(i,{x:t,y:n+.2,z:r,vx:a,vy:o,vz:l,life:1.1+Math.random()*.5,spin:16,bounce:.4})}},sparkle(t,n,r,i=`#ff5a7a`){for(let a=0;a<18;a++){let a=new e.Mesh(l,d(i)),[o,s,c]=h(1.2,3);m(a,{x:t,y:n+.3,z:r,vx:o,vy:s,vz:c,life:.7+Math.random()*.5,floaty:-.1,drag:1.5,bounce:0})}},sparks(t,n,r){for(let i=0;i<20;i++){let i=new e.Mesh(l,d(`#ffd27a`));i.scale.setScalar(.6);let[a,o,s]=h(4,4);m(i,{x:t,y:n,z:r,vx:a,vy:o,vz:s,life:.35+Math.random()*.3,bounce:.5})}},embers(t,n,r){for(let i=0;i<30;i++){let a=new e.Mesh(l,d(i%3?`#ff7a1a`:`#ffd23a`)),[o,,s]=h(.8,0);m(a,{x:t+o*.3,y:n,z:r+s*.3,vx:o,vy:1.5+Math.random()*2.5,vz:s,life:.8+Math.random()*.9,floaty:-.12,spin:0,bounce:0})}},ember(t,n,r){let i=new e.Mesh(l,d(Math.random()<.6?`#ff7a1a`:`#ffd23a`));i.scale.setScalar(.5+Math.random()*.6),m(i,{x:t,y:n,z:r,vx:(Math.random()-.5)*.3,vy:.5+Math.random()*.7,vz:(Math.random()-.5)*.3,life:1.2+Math.random()*1.4,floaty:-.05,spin:0,bounce:0})},dust(t,n,r){for(let i=0;i<14;i++){let i=new e.Mesh(f,p),[a,o,s]=h(2.5,2.5);m(i,{x:t,y:n+.05,z:r,vx:a,vy:o,vz:s,life:.5+Math.random()*.4,spin:12,bounce:.3})}},update(e){for(let t=i.length-1;t>=0;t--){let a=i[t];if(a.age+=e,a.age>=a.life){n.remove(a.mesh),i.splice(t,1);continue}let o=a.mesh;a.vy-=io*a.floaty*e;let s=Math.max(0,1-a.drag*e);a.vx*=s,a.vy*=a.drag?Math.max(0,1-a.drag*.5*e):1,a.vz*=s,o.position.x+=a.vx*e,o.position.y+=a.vy*e,o.position.z+=a.vz*e;let c=r?.heightAt(o.position.x,o.position.z);c!=null&&a.bounce>0&&o.position.y<c+.03&&o.position.y>c-.4&&a.vy<0&&(o.position.y=c+.03,a.vy*=-a.bounce,a.vx*=.55,a.vz*=.55,a.spin=a.spin.map(e=>e*.5)),o.rotation.x+=a.spin[0]*e,o.rotation.y+=a.spin[1]*e,o.rotation.z+=a.spin[2]*e;let l=Math.min(1,(a.life-a.age)/.4);o.scale.setScalar(a.scale*l*(1+a.grow*(a.age/a.life)))}}}}var oo={fell:`INTO THE DARK!`,burnt:`SCORCHED!`,crushed:`SQUASHED!`,spiked:`SPIKED!`,thud:`THUD!`},so=.38,co=.18,lo=.45;function uo({stage:e,hud:t,input:n,audio:r,storage:i}){let{GFX:a,scene:o,view:s}=e,c=ao(a,o),l=de(a),u=l.group;u.scale.setScalar(ae),u.traverse(e=>{e.isMesh&&(e.castShadow=!0)}),o.add(u);let d=S(document.body),m=null,x=null,C=[],w=[],T=`title`,E=!1,D=0,O=0,k=null,A=p(),j=0,M=f(Date.now()>>>0),N=1,P=i.load(),F=0,I=!1,ee={p:0,v:0},te=[0,0,0,1];function ne(n){x&&o.remove(x),m=$a(a,n,m?{ball:m.ball,die:m.die}:{}),x=new a.Group;let r=Mi(a,m.built),i=Ni(a,m.level),s=Fi(a,m.level,{last:n===Ha.length-1});x.add(r.group,i.group,m.actors.group),s&&x.add(s.group),w=[r,i,s].filter(Boolean),e.setTorches(i.flames),o.add(x),c.setDungeon(m.level),O=0,u.visible=!0;let l=m.ball;e.target.set(l.x,l.y,l.z),t.map(m),C=[];let d=m.level;for(let e=0;e<d.rows;e++)for(let t=0;t<d.cols;t++)d.cell(t,e)?.kind===`lava`&&C.push([t,d.cell(t,e).h[0],e]);se();let f=m;I=!0,Ar([...d.mobs.map(e=>[e.kind,pi]),...d.pickups.map(e=>[e.kind,1])]).then(()=>{m===f&&(I=!1,se())})}function ie(){return m.level.mobs.some(e=>di[e.kind]?.boss)}function oe(e){let t=m.ball;for(let n=0;n<3;n++){if(!C.length||Math.random()>e*14)continue;let[n,r,i]=C[Math.floor(Math.random()*C.length)];Math.abs(n-t.x)>10||Math.abs(i-t.z)>10||c.ember(n+Math.random(),r+.05,i+Math.random())}}function se(){let t=[];x.traverse(e=>{(e.isMesh||e.isSprite)&&e.frustumCulled&&(e.frustumCulled=!1,t.push(e))});try{e.look(),e.render()}finally{for(let e of t)e.frustumCulled=!0}}function ce(e){T=e,D=0}function le(){T!==`title`&&(N=s.aim.zoom),ne(0),ce(`title`),E=!1,t.paused(!1),s.aim.zoom=so,r.stopMusic(),t.title(P)}function ue(e){A=p(),j=0,M=f(Date.now()>>>0),fe(e)}function fe(e){ne(e),F=0,P=i.reached(e),T===`title`&&(s.aim.zoom=N),ce(`ready`),t.play(),t.banner(`DEPTH ${m.level.depth}\n${m.level.name.toUpperCase()}`,`big`,m.level.intro),t.level(m.level),t.gold(j),t.keys(0),t.revives(A.revives),t.party(A),r.wake(),r.descend(),r.startMusic(m.level.depth,{boss:ie()})}function pe(){let e=v(A);if(!e)return!1;let n=m.ball;return t.party(A,e.map(e=>-e)),t.revives(A.revives),c.sparkle(n.x,n.y,n.z,`#ffe08a`),r.potion(),t.banner(`REVIVED!
the fallen get back up`),!0}function me(e){let n=g(A,Za[e],M);return t.party(A,n),r.hurt(),n}function ge(e){let n=m.ball;k=e,ce(`lost`),me(e),t.banner(`${oo[e]}\n−${Za[e]} HP`),e===`burnt`?(c.embers(n.x,n.y,n.z),r.sizzle(),u.visible=!1):e===`crushed`?(c.dust(n.x,n.y-n.r,n.z),r.slam(),u.visible=!1):r.fall()}function _e(e,n){let i=m.ball;i.vx=i.vy=i.vz=0,xe(m.die,l,n),ce(`battle`),N=s.aim.zoom,s.aim.zoom=lo;let a=b({roll:n,monster:e.stats}),o=A.heroes.map(e=>e.hp),u=g(A,a.damage,M),f=A.heroes.map(e=>e.hp);j+=a.gold,r.stopMusic(),r.battle(a.grade),t.banner(null),d.show({monster:e.stats,result:a,before:o,after:f}).then(()=>{if(m.actors.defeat(e),c.poof(e.x,e.y,e.z,e.stats.boss?2.5:1),c.coins(e.x,e.y,e.z,Math.min(30,6+a.gold/4)),r.coin(),t.party(A,u),t.gold(j),s.aim.zoom=N,pe(),h(A))return ye();ce(`play`),r.startMusic(m.level.depth,{boss:ie()})})}function ve(){let e=m.ball,n=m.index===Ha.length-1;ce(n?`won`:`clear`);let a=100*m.level.depth;j+=a,t.gold(j),c.coins(e.x,e.y,e.z,24),r.stopMusic(),r.goal(),n?(t.banner(`THE PARTY ESCAPES!\n${j} GOLD`,`big`),P=i.record(j)):(y(A),t.party(A),t.banner(`DEPTH ${m.level.depth} CLEARED\n+${a} GOLD`,`big`,`The party rests on the stairs.`))}function ye(){ce(`over`),t.banner(`THE PARTY HAS FALLEN\n${j} GOLD`,`big`),r.stopMusic(),r.over(),P=i.record(j)}function be(e){let n=T===`play`,i=u.visible&&(T!==`lost`||k===`fell`),a=ro(m,e,Ya,{live:n,moving:i}),o=m.ball;if(a.impact>2.5&&(r.clatter(a.impact),ee.v+=Math.min(6,a.impact*.5)),a.fight){_e(a.fight,a.roll);return}if(a.hurt&&(me(a.hurt),t.banner(`${oo[a.hurt]}\n−${Za[a.hurt]} HP`),a.hurt===`spiked`?(c.sparks(o.x,o.y-o.r,o.z),r.spikes()):c.dust(o.x,o.y-o.r,o.z),h(A)))return ye();for(let e of a.picked)if(e.kind===`gold`||e.kind===`chest`)j+=e.amount,t.gold(j),c.coins(e.x,e.y,e.z,e.kind===`chest`?22:8),r.coin(),e.kind===`chest`&&t.banner(`TREASURE!\n+${e.amount} GOLD`);else if(e.kind===`potion`){let n=_(A,e.amount);t.party(A,n.map(e=>-e)),c.sparkle(e.x,e.y,e.z,`#ff5a7a`),r.potion(),t.banner(`HEALING POTION\n+${e.amount} HP EACH`)}else e.kind===`revive`?(A.revives+=1,t.revives(A.revives),c.sparkle(e.x,e.y,e.z,`#ffe08a`),r.potion(),pe()||t.banner(`REVIVE POTION
for whoever falls`)):e.kind===`key`&&(t.keys(m.keys),c.sparkle(e.x,e.y,e.z,`#ffd23a`),r.key(),t.banner(`A KEY!`));a.door===`opened`&&(t.keys(m.keys),r.gate(),t.banner(`THE GATE LIFTS`)),a.door===`locked`&&(r.locked(),t.banner(`LOCKED
find the key`)),a.outcome===`exit`?ve():a.outcome&&ge(a.outcome)}function Se(i,a){let o=n.stick(),f=n.view(i);s.turn(f.turn,f.tilt),s.zoomBy(f.zoom),T===`title`?s.aim.yaw+=co*i:T!==`battle`&&(N=s.aim.zoom),s.step(i),e.time+=i;for(let e of a)e===`mute`&&t.muted(r.toggleMute()),e===`home`&&(s.reset(),T===`title`&&(s.aim.zoom=so)),T===`battle`&&(e===`start`||e===`tap`)&&D>.4&&d.proceed(),e===`pause`&&(T===`play`||T===`ready`||T===`lost`)&&(E=!E,t.paused(E),E?r.stopMusic():r.startMusic(m.level.depth,{boss:ie()})),(e===`start`||e===`tap`)&&(T===`over`||T===`won`)&&D>1.2?le():e===`start`&&T===`title`&&ue(0);if(E){r.rolling(0,!1);return}if(D+=i,T!==`battle`){let e=T===`play`?Qa(o,s.yaw):[0,0];for(O=Math.min(O+i,Ya*12);O>=.008333333333333333&&T!==`battle`;)O-=Ya,be(T===`play`?e:[0,0])}let p=m.ball;switch(T){case`ready`:D>1.6&&!I&&(ce(`play`),t.banner(null));break;case`play`:D>1.6&&t.bannerShown&&t.banner(null);break;case`lost`:D>1.7&&(eo(m),u.visible=!0,t.banner(null),pe(),h(A)?ye():ce(`play`));break;case`clear`:D>3.5&&fe(m.index+1);break;case`over`:case`won`:D>10&&le()}ee.v+=(-ee.p*185-ee.v*11)*i,ee.p+=ee.v*i,T===`title`&&re(te,[.3,.55,.12],i);let g=T===`title`?te:m.die.q;l.body.quaternion.set(g[0],g[1],g[2],g[3]);let _=ee.p*.04;l.body.scale.set(1+_*.45,1-_*.8,1+_*.45),u.position.set(p.x,p.y-p.r+he(l,g)*(1-_*.8),p.z),T===`title`&&(u.position.y=p.y+.25+Math.sin(e.time*1.3)*.06);let v=to(m);for(let e of l.glyphs){if(e.number!==20&&e.number!==1)continue;let t=+(e.number===v);e.number===20?e.mesh.material.color.setRGB(1,1-t*.06,1-t*.28).multiplyScalar(1+t*1.9):e.mesh.material.color.setRGB(1,1-t*.5,1-t*.6).multiplyScalar(1+t*.8)}v!==F&&T!==`title`&&(F=v,t.roll(v)),m.actors.sync(i,e.time,{focus:m.ball});for(let t of w)t.update(e.time);oe(i),c.update(i),r.rolling(T===`play`&&p.grounded?Math.hypot(p.vx,p.vz):0,p.grounded),t.tick(i,m),e.die.set(p.x,p.y,p.z);let y=e.target;if(Ce.look){y.set(...Ce.look.at),s.zoom=s.aim.zoom=Ce.look.zoom;return}let b=Math.max(p.y,m.level.lowest-1),x=1-Math.exp(-(T===`title`?2:5)*i);y.x+=(p.x-y.x)*x,y.y+=(b-y.y)*x,y.z+=(p.z-y.z)*x}let Ce={stage:e,look:null,get delve(){return m},get ball(){return m.ball},get party(){return A},get state(){return T},level(e){ue(e)}};return le(),{update:Se,startRun:ue,get state(){return T},get paused(){return E},dieOnScreen(t){let n=m.ball,r=new a.Vector3(n.x,n.y,n.z).project(e.camera);return{x:t.left+(r.x+1)/2*t.width,y:t.top+(1-r.y)/2*t.height}},debug:Ce}}var fo=Ha.map(e=>e().name),po=[`I`,`II`,`III`,`IV`,`V`,`VI`,`VII`,`VIII`,`IX`,`X`,`XI`,`XII`,`XIII`,`XIV`,`XV`];function mo(e,{onStart:t}){let n=t=>e.querySelector(`#${t}`),r=n(`top`),i=n(`level`),a=n(`gold`),o=n(`keys`),s=n(`banner`),c=n(`title`),l=n(`levels`),u=n(`best`),f=n(`pause`),p=n(`mute`),m=n(`party`),h=n(`revives`),g=n(`roll`),_=n(`map`),v=_.getContext(`2d`),y=!1,b=0,x=2;p.addEventListener(`click`,e=>{e.stopPropagation(),p.dispatchEvent(new CustomEvent(`mute`,{bubbles:!0}))});let S=d.map(e=>{let t=document.createElement(`li`);return t.innerHTML=`<b style="--hero:${e.colour}">${e.mark}</b><span class="name">${e.name}</span><span class="bar"><i></i></span><span class="hp"></span><span class="hit"></span>`,m.appendChild(t),{li:t,bar:t.querySelector(`i`),hp:t.querySelector(`.hp`),hit:t.querySelector(`.hit`)}});function C(e){let{level:t,explored:n,ball:r}=e,i=x;v.clearRect(0,0,_.width,_.height);for(let e=0;e<t.rows;e++)for(let r=0;r<t.cols;r++){if(!n[e*t.cols+r])continue;let a=t.cell(r,e);a&&(v.fillStyle=a.kind===`wall`?`#4a443e`:a.kind===`lava`?`#ff6a1a`:a.kind===`exit`?`#6fd0ff`:a.trap?`#8a5a40`:a.door?`#b0b4bd`:`#a9a397`,v.fillRect(r*i,e*i,i,i))}for(let t of e.actors.mobs)t.dead||t.gone||Math.hypot(t.x-r.x,t.z-r.z)>9||(v.fillStyle=`#ff4a3a`,v.fillRect(t.x*i-i,t.z*i-i,i*2,i*2));for(let r of e.actors.pickups)!r.taken&&n[Math.floor(r.z)*t.cols+Math.floor(r.x)]&&(v.fillStyle=r.kind===`key`?`#ffe680`:r.kind===`potion`?`#ff6a8a`:r.kind===`revive`?`#fff4c0`:`#ffcf4a`,v.fillRect(r.x*i-i/2,r.z*i-i/2,i,i));v.fillStyle=`#ffffff`,v.beginPath(),v.arc(r.x*i,r.z*i,i*1.6,0,Math.PI*2),v.fill()}return{get bannerShown(){return y},title(e){c.hidden=!1,r.hidden=!0,m.hidden=!0,g.hidden=!0,_.hidden=!0,s.hidden=!0,y=!1,l.replaceChildren(...Ha.map((n,r)=>{let i=document.createElement(`button`);return i.type=`button`,i.className=`depth`,i.disabled=r>e.reached,i.innerHTML=`<span class="numeral">${po[r]??r+1}</span><span class="name">${fo[r]}</span>`,i.title=i.disabled?`Reach this depth to start from it`:`Start from ${fo[r]}`,i.addEventListener(`click`,e=>{e.stopPropagation(),t(r)}),i.addEventListener(`pointerdown`,e=>e.stopPropagation()),i})),u.textContent=e.best>0?`best ${e.best} gold${e.last==null?``:` · last ${e.last}`}`:``},play(){c.hidden=!0,r.hidden=!1,m.hidden=!1,g.hidden=!1,_.hidden=!1},level(e){i.innerHTML=`<span class="label">depth ${e.depth}</span>${e.name}`},gold(e){a.textContent=String(e)},keys(e){o.textContent=e>0?`⚷`.repeat(e):``,o.parentElement.classList.toggle(`none`,e===0)},revives(e){h.textContent=e>0?`✚`.repeat(e):``,h.parentElement.classList.toggle(`none`,e===0)},party(e,t=null){e.heroes.forEach((e,n)=>{let r=S[n];r.bar.style.width=`${100*Math.max(0,e.hp)/e.max}%`,r.bar.classList.toggle(`low`,e.hp>0&&e.hp<=e.max*.3),r.hp.textContent=`${Math.max(0,e.hp)}/${e.max}`,r.li.classList.toggle(`down`,e.hp<=0);let i=t?.[n]??0;i!==0&&(r.hit.textContent=i>0?`−${i}`:`+${-i}`,r.hit.className=`hit ${i>0?`hurt`:`healed`}`,r.hit.offsetWidth,r.hit.classList.add(`show`))})},roll(e){g.querySelector(`.n`).textContent=String(e),g.dataset.high=e===20?`crit`:e===1?`fumble`:e>=15?`high`:e<=5?`low`:``},map(e){let{cols:t,rows:n}=e.level;x=Math.max(1,Math.floor(Math.min(180/t,180/n))),_.width=t*x,_.height=n*x,b=0},tick(e,t){b-=e,!(b>0||_.hidden)&&(b=.15,C(t))},banner(e,t=`normal`,n=``){if(y=e!=null,s.hidden=!y,y){if(s.textContent=e,n){let e=document.createElement(`small`);e.textContent=n,s.appendChild(e)}s.className=t,s.offsetWidth,s.classList.add(`pop`)}},paused(e){f.hidden=!e},muted(e){p.setAttribute(`aria-pressed`,String(e)),p.textContent=e?`sound off`:`sound on`}}}var ho={ArrowUp:`up`,KeyW:`up`,ArrowDown:`down`,KeyS:`down`,ArrowLeft:`left`,KeyA:`left`,ArrowRight:`right`,KeyD:`right`,KeyQ:`turnLeft`,KeyE:`turnRight`,Equal:`zoomIn`,NumpadAdd:`zoomIn`,Minus:`zoomOut`,NumpadSubtract:`zoomOut`},go={Enter:`start`,Space:`start`,KeyP:`pause`,Escape:`pause`,KeyM:`mute`,KeyC:`home`},_o=110,vo=1.9,yo=2.2,bo=.0085,xo=.006;function So(e,{anchor:t}){let n=new Set,r=[],i=null,a=new Map,o=0,s=0,c=1;addEventListener(`keydown`,e=>{e.target instanceof HTMLButtonElement&&(e.code===`Space`||e.code===`Enter`)||(ho[e.code]&&(n.add(ho[e.code]),e.preventDefault()),go[e.code]&&!e.repeat&&(r.push(go[e.code]),e.code===`Space`&&e.preventDefault()))}),addEventListener(`keyup`,e=>{ho[e.code]&&n.delete(ho[e.code])}),addEventListener(`blur`,()=>{n.clear(),i=null,a.clear()});let l=()=>{let[e,t]=[...a.values()];return{span:Math.hypot(t.x-e.x,t.y-e.y),angle:Math.atan2(t.y-e.y,t.x-e.x),y:(e.y+t.y)/2}},u=null;e.addEventListener(`pointerdown`,t=>{e.setPointerCapture?.(t.pointerId),t.preventDefault();let n=t.pointerType===`mouse`&&(t.button===1||t.button===2);if(a.set(t.pointerId,{x:t.clientX,y:t.clientY,look:n}),a.size===2&&t.pointerType===`touch`){i=null,u=l();return}!n&&a.size===1&&(i={id:t.pointerId,x:t.clientX,y:t.clientY},r.push(`tap`))}),e.addEventListener(`pointermove`,e=>{let t=a.get(e.pointerId);if(!t)return;let n=e.clientX-t.x,r=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,t.look)o-=n*bo,s+=r*xo;else if(u&&a.size===2){let e=l();e.span>1&&u.span>1&&(c*=u.span/e.span);let t=e.angle-u.angle;t>Math.PI&&(t-=Math.PI*2),t<-Math.PI&&(t+=Math.PI*2),o+=t,s+=(e.y-u.y)*xo,u=e}i&&i.id===e.pointerId&&(i.x=e.clientX,i.y=e.clientY)});let d=e=>{a.delete(e.pointerId),a.size<2&&(u=null),i&&i.id===e.pointerId&&(i=null)};e.addEventListener(`pointerup`,d),e.addEventListener(`pointercancel`,d),e.addEventListener(`contextmenu`,e=>e.preventDefault()),e.addEventListener(`wheel`,e=>{e.preventDefault();let t=e.deltaMode===1?33:e.deltaMode===2?400:1;c*=Math.exp(e.deltaY*t*.0015)},{passive:!1});let f={},p={turn:0,tilt:0,zoom:0};return{stick(){let e=+!!n.has(`right`)-!!n.has(`left`),a=+!!n.has(`up`)-!!n.has(`down`);if(i){let n=t();if(n){let t=i.x-n.x,r=n.y-i.y,o=Math.hypot(t,r);if(o>6){let n=Math.min(1,o/_o)/o;e+=t*n,a+=r*n}}}let o=navigator.getGamepads?.().find(e=>e&&e.connected);if(o){let[t=0,n=0]=o.axes,i=e=>Math.abs(e)<.18?0:e;e+=i(t),a-=i(n);let s=e=>o.buttons[e]?.pressed;s(12)&&(a+=1),s(13)&&--a,s(14)&&--e,s(15)&&(e+=1);let[,,c=0,l=0]=o.axes;p={turn:-i(c),tilt:i(l),zoom:(s(4)?-1:0)+ +!!s(5)};let u={start:s(0),pause:s(9),home:s(11)};for(let e of Object.keys(u))u[e]&&!f[e]&&r.push(e);f=u}let s=Math.hypot(e,a);return s>1&&(e/=s,a/=s),{x:e,y:a}},view(e){let t=+!!n.has(`turnRight`)-!!n.has(`turnLeft`),r=+!!n.has(`zoomOut`)-!!n.has(`zoomIn`),i={turn:o+(t+p.turn)*vo*e,tilt:s+p.tilt*vo*.6*e,zoom:c*yo**+((r-p.zoom)*e)};return o=0,s=0,c=1,i},take(){return r.splice(0)},get pointing(){return i!==null}}}var Co=Math.PI/180,wo=180/Math.PI,G=(e,t,n)=>Math.max(t,Math.min(n,e)),To=(e,t)=>(e%t+t)%t,Eo=(e,t,n)=>(1-n)*e+n*t,K=class e{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}get height(){return this.y}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}clone(){return new e(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divideScalar(e){return this.multiplyScalar(1/e)}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalize(){return this.divideScalar(this.length()||1)}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}*[Symbol.iterator](){yield this.x,yield this.y}};K.prototype.isVector2=!0;var q=class e{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}clone(){return new e(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}applyEuler(e){return this.applyQuaternion(Uo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Uo.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=G(this.x,e.x,t.x),this.y=G(this.y,e.y,t.y),this.z=G(this.z,e.z,t.z),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(G(n,e,t))}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return J.copy(this).projectOnVector(e),this.sub(J)}reflect(e){return this.sub(J.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(G(this.dot(e)/t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};q.prototype.isVector3=!0;var Do=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}};Do.prototype.isVector4=!0;var Oo=class e{constructor(e=0,t=0,n=0,r=1){this._x=e,this._y=t,this._z=n,this._w=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new e(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos(n/2),s=Math.cos(r/2),c=Math.cos(i/2),l=Math.sin(n/2),u=Math.sin(r/2),d=Math.sin(i/2);if(a===`XYZ`)this._x=l*s*c+o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d+l*u*c,this._w=o*s*c-l*u*d;else if(a===`YXZ`)this._x=l*s*c+o*u*d,this._y=o*u*c-l*s*d,this._z=o*s*d-l*u*c,this._w=o*s*c+l*u*d;else throw Error(`gfx: unsupported Euler order ${a}`);return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this.lengthSq())}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};Oo.prototype.isQuaternion=!0;var ko=class e{constructor(e=0,t=0,n=0,r=`XYZ`){this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new e(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[5],c=r[9],l=r[6],u=r[10],d=r[1],f=r[2];if(t===`XYZ`)this._y=Math.asin(G(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,u),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(l,s),this._z=0);else if(t===`YXZ`)this._x=Math.asin(-G(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(d,s)):(this._y=Math.atan2(-f,i),this._z=0);else throw Error(`gfx: unsupported Euler order ${t}`);return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Wo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wo,t,n)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ko.prototype.isEuler=!0;var Ao=class{constructor(){this.elements=[1,0,0,0,1,0,0,0,1]}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1)}copy(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)t[e]=n[e];return this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10])}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1)}};Ao.prototype.isMatrix3=!0;var jo=class e{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)t[e]=n[e];return this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1)}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Ho.setFromMatrixColumn(e,0).length(),i=1/Ho.setFromMatrixColumn(e,1).length(),a=1/Ho.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else throw Error(`gfx: unsupported Euler order ${e.order}`);return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ko,e,qo)}lookAt(e,t,n){let r=this.elements;return Xo.subVectors(e,t),Xo.lengthSq()===0&&(Xo.z=1),Xo.normalize(),Jo.crossVectors(n,Xo),Jo.lengthSq()===0&&(Math.abs(n.z)===1?Xo.x+=1e-4:Xo.z+=1e-4,Xo.normalize(),Jo.crossVectors(n,Xo)),Jo.normalize(),Yo.crossVectors(Xo,Jo),r[0]=Jo.x,r[4]=Yo.x,r[8]=Xo.x,r[1]=Jo.y,r[5]=Yo.y,r[9]=Xo.y,r[2]=Jo.z,r[6]=Yo.z,r[10]=Xo.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1)}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1)}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1)}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1)}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1)}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Ho.set(r[0],r[1],r[2]).length(),o=Ho.set(r[4],r[5],r[6]).length(),s=Ho.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Go.copy(this);let c=1/a,l=1/o,u=1/s,d=Go.elements;return d[0]*=c,d[1]*=c,d[2]*=c,d[4]*=l,d[5]*=l,d[6]*=l,d[8]*=u,d[9]*=u,d[10]*=u,t.setFromRotationMatrix(Go),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a){let o=this.elements,s=2*i/(t-e),c=2*i/(n-r),l=(t+e)/(t-e),u=(n+r)/(n-r),d=-(a+i)/(a-i),f=-2*a*i/(a-i);return o[0]=s,o[4]=0,o[8]=l,o[12]=0,o[1]=0,o[5]=c,o[9]=u,o[13]=0,o[2]=0,o[6]=0,o[10]=d,o[14]=f,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,r,i,a){let o=this.elements,s=2/(t-e),c=2/(n-r),l=-(t+e)/(t-e),u=-(n+r)/(n-r),d=-2/(a-i),f=-(a+i)/(a-i);return o[0]=s,o[4]=0,o[8]=0,o[12]=l,o[1]=0,o[5]=c,o[9]=0,o[13]=u,o[2]=0,o[6]=0,o[10]=d,o[14]=f,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){for(let t=0;t<16;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){for(let n=0;n<16;n++)e[t+n]=this.elements[n];return e}};jo.prototype.isMatrix4=!0;function Mo(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function No(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}function Po(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Fo=class e{constructor(e,t,n){return this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e){return e=Math.floor(e),this.r=Mo((e>>16&255)/255),this.g=Mo((e>>8&255)/255),this.b=Mo((e&255)/255),this}setRGB(e,t,n){return this.r=e,this.g=t,this.b=n,this}setHSL(e,t,n){if(e=To(e,1),t=G(t,0,1),n=G(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Po(i,r,e+1/3),this.g=Po(i,r,e),this.b=Po(i,r,e-1/3)}return this}setStyle(e){let t=/^#([A-Fa-f\d]+)$/.exec(e);if(t){let e=t[1];if(e.length===6)return this.setHex(parseInt(e,16));if(e.length===3)return this.setRGB(Mo(parseInt(e.charAt(0),16)/15),Mo(parseInt(e.charAt(1),16)/15),Mo(parseInt(e.charAt(2),16)/15))}if(t=/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?\)$/.exec(e),t)return this.setRGB(Mo(Math.min(255,parseInt(t[1],10))/255),Mo(Math.min(255,parseInt(t[2],10))/255),Mo(Math.min(255,parseInt(t[3],10))/255));throw Error(`gfx: unsupported colour ${e}`)}clone(){return new e(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}getHex(){return Math.round(G(No(this.r)*255,0,255))*65536+Math.round(G(No(this.g)*255,0,255))*256+Math.round(G(No(this.b)*255,0,255))}getHexString(){return(`000000`+this.getHex().toString(16)).slice(-6)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};Fo.prototype.isColor=!0;var Io=class e{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(J.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(J.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=J.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e){return this.makeEmpty(),this.expandByObject(e)}clone(){return new e().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e){e.updateWorldMatrix(!1,!1);let t=e.geometry;t!==void 0&&(t.boundingBox===null&&t.computeBoundingBox(),Zo.copy(t.boundingBox),Zo.applyMatrix4(e.matrixWorld),this.union(Zo));let n=e.children;for(let e=0,t=n.length;e<t;e++)this.expandByObject(n[e]);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,J),J.distanceToSquared(e.center)<=e.radius*e.radius}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,J).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(J).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(es[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),es[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),es[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),es[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),es[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),es[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),es[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),es[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(es),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};Io.prototype.isBox3=!0;var Lo=class e{constructor(e=new q,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Zo.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}clone(){return new e().copy(this)}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}};Lo.prototype.isSphere=!0;var Ro=class{constructor(e=new q(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}};Ro.prototype.isPlane=!0;var zo=class{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}recast(e){return this.origin.copy(this.at(e,J)),this}distanceSqToPoint(e){let t=J.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(J.copy(this.origin).addScaledVector(this.direction,t),J.distanceToSquared(e))}intersectSphere(e,t){if(e.radius<0)return null;J.subVectors(e.center,this.origin);let n=J.dot(this.direction),r=J.dot(J)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,J)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,ee=T-P*D,te=E-F*D,ne=O-P*A,re=k-F*A,ie=j-P*N,ae=M-F*N,oe=ie*re-ae*ne,se=ee*ae-te*ie,ce=ne*te-re*ee;if(r){if(oe<0||se<0||ce<0)return null}else if((oe<0||se<0||ce<0)&&(oe>0||se>0||ce>0))return null;let le=oe+se+ce;if(le===0)return null;let ue=I*(oe*D+se*A+ce*N);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}},Bo=class{constructor(){this.planes=[new Ro,new Ro,new Ro,new Ro,new Ro,new Ro]}setFromProjectionMatrix(e){let t=this.planes,n=e.elements,r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],c=n[5],l=n[6],u=n[7],d=n[8],f=n[9],p=n[10],m=n[11],h=n[12],g=n[13],_=n[14],v=n[15];return t[0].setComponents(o-r,u-s,m-d,v-h).normalize(),t[1].setComponents(o+r,u+s,m+d,v+h).normalize(),t[2].setComponents(o+i,u+c,m+f,v+g).normalize(),t[3].setComponents(o-i,u-c,m-f,v-g).normalize(),t[4].setComponents(o-a,u-l,m-p,v-_).normalize(),t[5].setComponents(o+a,u+l,m+p,v+_).normalize(),this}intersectsObject(e){let t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Qo.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Qo)}intersectsSprite(e){return Qo.center.set(0,0,0),Qo.radius=.7071067811865476+$o.distanceTo(e.center),Qo.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qo)}intersectsSphere(e){let t=e.center,n=-e.radius;for(let e=0;e<6;e++)if(this.planes[e].distanceToPoint(t)<n)return!1;return!0}},Vo=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}makeSafe(){let e=1e-6;return this.phi=G(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(G(t/this.radius,-1,1))),this}},J=new q,Ho=new q,Uo=new Oo,Wo=new jo,Go=new jo,Ko=new q(0,0,0),qo=new q(1,1,1),Jo=new q,Yo=new q,Xo=new q,Zo=new Io,Qo=new Lo,$o=new K(.5,.5),es=Array.from({length:8},()=>new q),ts=`srgb`,ns=`srgb-linear`,rs=1006,is=1008,as=1001,os=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners?.[e];if(n===void 0)return;let r=n.indexOf(t);r!==-1&&n.splice(r,1)}dispatchEvent(e){let t=this._listeners?.[e.type];if(t!==void 0){e.target=this;for(let n of t.slice(0))n.call(this,e);e.target=null}}},ss=class{constructor(){this.mask=1}test(e){return(this.mask&e.mask)!==0}},cs=0,Y=new q,ls=new Oo,us=new jo,ds=new q,fs=new q,ps=new q(1,0,0),ms=new q(0,1,0),hs=new q(0,0,1),gs=class e extends os{constructor(){super(),Object.defineProperty(this,"id",{value:cs++}),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new q,n=new ko,r=new Oo,i=new q(1,1,1);n._onChange(()=>r.setFromEuler(n,!1)),r._onChange(()=>n.setFromQuaternion(r,void 0,!1)),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new jo},normalMatrix:{value:new Ao}}),this.matrix=new jo,this.matrixWorld=new jo,this.matrixAutoUpdate=!0,this.matrixWorldAutoUpdate=!0,this.matrixWorldNeedsUpdate=!1,this.layers=new ss,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}rotateOnAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(ps,e)}rotateY(e){return this.rotateOnAxis(ms,e)}rotateZ(e){return this.rotateOnAxis(hs,e)}translateOnAxis(e,t){return Y.copy(e).applyQuaternion(this.quaternion),this.position.add(Y.multiplyScalar(t)),this}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(us.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ds.copy(e):ds.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?us.lookAt(fs,ds,this.up):us.lookAt(ds,fs,this.up),this.quaternion.setFromRotationMatrix(us),r&&(us.extractRotation(r.matrixWorld),ls.setFromRotationMatrix(us),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this||!(e&&e.isObject3D)?this:(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent({type:`added`}),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent({type:`removed`})),this}removeFromParent(){return this.parent!==null&&this.parent.remove(this),this}clear(){return this.remove(...this.children)}getObjectByName(e){if(this.name===e)return this;for(let t of this.children){let n=t.getObjectByName(e);if(n!==void 0)return n}}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fs,e,Y),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}};gs.DEFAULT_UP=new q(0,1,0),gs.prototype.isObject3D=!0;var _s=class extends gs{constructor(){super(),this.type=`Group`}};_s.prototype.isGroup=!0;var vs=class extends gs{constructor(){super(),this.type=`Scene`,this.environment=null,this.environmentRotation=new ko}};vs.prototype.isScene=!0;var ys=class e{constructor(e,t,n=!1){if(Array.isArray(e))throw TypeError(`gfx: BufferAttribute wants a typed array`);this.array=e,this.itemSize=t,this.count=e.length/t,this.normalized=n,this.version=0}set needsUpdate(e){e===!0&&this.version++}getX(e){return this.array[e*this.itemSize]}getY(e){return this.array[e*this.itemSize+1]}getZ(e){return this.array[e*this.itemSize+2]}getW(e){return this.array[e*this.itemSize+3]}setX(e,t){return this.array[e*this.itemSize]=t,this}setY(e,t){return this.array[e*this.itemSize+1]=t,this}setZ(e,t){return this.array[e*this.itemSize+2]=t,this}setXY(e,t,n){return e*=this.itemSize,this.array[e]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.array[e]=t,this.array[e+1]=n,this.array[e+2]=r,this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Y.fromBufferAttribute(this,t).applyMatrix4(e),this.setXYZ(t,Y.x,Y.y,Y.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Y.fromBufferAttribute(this,t).applyNormalMatrix(e),this.setXYZ(t,Y.x,Y.y,Y.z);return this}clone(){return new e(this.array.slice(),this.itemSize,this.normalized)}};ys.prototype.isBufferAttribute=!0;var X=class extends ys{constructor(e,t,n){super(new Float32Array(e),t,n)}},bs=class extends ys{constructor(e,t,n){super(new Uint16Array(e),t,n)}},xs=class extends ys{constructor(e,t,n){super(new Uint32Array(e),t,n)}};function Ss(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}var Cs=0,ws=new Io,Ts=new q,Es=class e extends os{constructor(){super(),Object.defineProperty(this,"id",{value:Cs++}),this.type=`BufferGeometry`,this.index=null,this.attributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0}}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ss(e)?xs:bs)(e,1):e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;return n!==void 0&&(n.applyNormalMatrix(new Ao().getNormalMatrix(e)),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}rotateX(e){return this.applyMatrix4(us.makeRotationX(e))}rotateY(e){return this.applyMatrix4(us.makeRotationY(e))}rotateZ(e){return this.applyMatrix4(us.makeRotationZ(e))}translate(e,t,n){return this.applyMatrix4(us.makeTranslation(e,t,n))}scale(e,t,n){return this.applyMatrix4(us.makeScale(e,t,n))}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Io);let e=this.attributes.position;e===void 0?this.boundingBox.makeEmpty():this.boundingBox.setFromBufferAttribute(e)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lo);let e=this.attributes.position;if(!e)return;let t=this.boundingSphere.center;ws.setFromBufferAttribute(e),ws.getCenter(t);let n=0;for(let r=0,i=e.count;r<i;r++)Ts.fromBufferAttribute(e,r),n=Math.max(n,t.distanceToSquared(Ts));this.boundingSphere.radius=Math.sqrt(n)}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t===void 0)return;let n=this.getAttribute(`normal`);n===void 0||n.count!==t.count?(n=new ys(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n)):n.array.fill(0);let r=new q,i=new q,a=new q,o=new q,s=new q,c=new q,l=new q,u=new q;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ts.fromBufferAttribute(e,t).normalize(),e.setXYZ(t,Ts.x,Ts.y,Ts.z)}toNonIndexed(){if(this.index===null)return this;let t=this.index.array,n=new e;for(let e in this.attributes){let{array:r,itemSize:i,normalized:a}=this.attributes[e],o=new r.constructor(t.length*i),s=0;for(let e=0,n=t.length;e<n;e++){let n=t[e]*i;for(let e=0;e<i;e++)o[s++]=r[n++]}n.setAttribute(e,new ys(o,i,a))}for(let e of this.groups)n.addGroup(e.start,e.count,e.materialIndex);return n}dispose(){this.dispatchEvent({type:`dispose`})}};Es.prototype.isBufferGeometry=!0;var Ds=new jo,Os=new zo,ks=new Lo,As=new q,js=new q,Ms=new q,Ns=new q,Ps=new q,Fs=new q;function Is(e,t,n,r){r.subVectors(n,t),Y.subVectors(e,t),r.cross(Y);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}function Ls(e,t,n,r,i,a,o){if(e.getVertexPosition(i,js),e.getVertexPosition(a,Ms),e.getVertexPosition(o,Ns),(t.side===1?r.intersectTriangle(Ns,Ms,js,!0,Ps):r.intersectTriangle(js,Ms,Ns,t.side===0,Ps))===null)return null;Fs.copy(Ps).applyMatrix4(e.matrixWorld);let s=n.ray.origin.distanceTo(Fs);if(s<n.near||s>n.far)return null;let c={a:i,b:a,c:o,normal:new q,materialIndex:0};return Is(js,Ms,Ns,c.normal),{distance:s,point:Fs.clone(),object:e,face:c}}var Rs=class extends gs{constructor(e=new Es,t=new sc){super(),this.type=`Mesh`,this.geometry=e,this.material=t}getVertexPosition(e,t){return t.fromBufferAttribute(this.geometry.attributes.position,e)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;if(r===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere).applyMatrix4(i),Os.copy(e.ray).recast(e.near),ks.containsPoint(Os.origin)===!1&&(Os.intersectSphere(ks,As)===null||Os.origin.distanceToSquared(As)>(e.far-e.near)**2))||(Ds.copy(i).invert(),Os.copy(e.ray).applyMatrix4(Ds),n.boundingBox!==null&&Os.intersectsBox(n.boundingBox)===!1))return;let a=n.index,o=n.attributes.position,s=n.drawRange,c=a===null?o.count:a.count,l=a===null?e=>e:e=>a.getX(e),u=Array.isArray(r)?n.groups.map(e=>({material:r[e.materialIndex],group:e,start:Math.max(e.start,s.start),end:Math.min(c,Math.min(e.start+e.count,s.start+s.count))})):[{material:r,group:null,start:Math.max(0,s.start),end:Math.min(c,s.start+s.count)}];for(let n of u)for(let r=n.start;r<n.end;r+=3){let i=Ls(this,n.material,e,Os,l(r),l(r+1),l(r+2));i&&(i.faceIndex=Math.floor(r/3),n.group&&(i.face.materialIndex=n.group.materialIndex),t.push(i))}}};Rs.prototype.isMesh=!0;var zs=class extends gs{constructor(e=new Es,t=new dc){super(),this.type=`Line`,this.geometry=e,this.material=t}};zs.prototype.isLine=!0;var Bs=class extends zs{constructor(e,t){super(e,t),this.type=`LineSegments`}};Bs.prototype.isLineSegments=!0;var Vs=null;function Hs(){return Vs===null&&(Vs=new Es,Vs.setIndex([0,1,2,0,2,3]),Vs.setAttribute(`position`,new X([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3)),Vs.setAttribute(`uv`,new X([0,0,1,0,1,1,0,1],2))),Vs}var Us=class extends gs{constructor(e=new fc){super(),this.type=`Sprite`,this.geometry=Hs(),this.material=e,this.center=new K(.5,.5)}};Us.prototype.isSprite=!0;var Ws=class{constructor(e,t,n=0,r=1/0){this.ray=new zo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ss}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize()):(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld)),this.camera=t}intersectObject(e,t=!0,n=[]){return Gs(e,this,n,t),n.sort((e,t)=>e.distance-t.distance),n}intersectObjects(e,t=!0,n=[]){for(let r of e)Gs(r,this,n,t);return n.sort((e,t)=>e.distance-t.distance),n}};function Gs(e,t,n,r){if(e.layers.test(t.layers)&&e.raycast(t,n),r===!0)for(let r of e.children)Gs(r,t,n,!0)}var Ks=class extends gs{constructor(){super(),this.type=`Camera`,this.matrixWorldInverse=new jo,this.projectionMatrix=new jo,this.projectionMatrixInverse=new jo}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this._updateInverse()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this._updateInverse()}_updateInverse(){this.matrixWorld.decompose(fs,ls,Y),Y.x===1&&Y.y===1&&Y.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fs,ls,Y.set(1,1,1)).invert()}};Ks.prototype.isCamera=!0;var qs=class extends Ks{constructor(e=50,t=1,n=.1,r=2e3){super(),this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.aspect=t,this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Math.PI/180*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r;this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};qs.prototype.isPerspectiveCamera=!0;var Js=class extends Ks{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.type=`OrthographicCamera`,this.zoom=1,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;this.projectionMatrix.makeOrthographic(n-e,n+e,r+t,r-t,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}};Js.prototype.isOrthographicCamera=!0;var Ys=class extends gs{constructor(e,t=1){super(),this.type=`Light`,this.color=new Fo(e),this.intensity=t}};Ys.prototype.isLight=!0;var Xs=class extends Ys{constructor(e,t){super(e,t),this.type=`AmbientLight`}};Xs.prototype.isAmbientLight=!0;var Zs=class extends Ys{constructor(e,t,n){super(e,n),this.type=`HemisphereLight`,this.position.copy(gs.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fo(t)}};Zs.prototype.isHemisphereLight=!0;var Qs=class{constructor(){this.camera=new Js(-5,5,5,-5,.5,500),this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.mapSize=new K(512,512),this.matrix=new jo,this.frustum=new Bo}updateMatrices(e){let t=this.camera;fs.setFromMatrixPosition(e.matrixWorld),t.position.copy(fs),ds.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ds),t.updateMatrixWorld(),us.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.frustum.setFromProjectionMatrix(us),this.matrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.matrix.multiply(us)}},$s=class extends Ys{constructor(e,t){super(e,t),this.type=`DirectionalLight`,this.position.copy(gs.DEFAULT_UP),this.updateMatrix(),this.target=new gs,this.shadow=new Qs}};$s.prototype.isDirectionalLight=!0;var ec=class extends Ys{constructor(e,t,n=0,r=2){super(e,t),this.type=`PointLight`,this.distance=n,this.decay=r}};ec.prototype.isPointLight=!0;var tc=0,nc=class extends os{constructor(e=null){super(),Object.defineProperty(this,"id",{value:tc++}),this.name=``,this.image=e,this.mapping=300,this.wrapS=as,this.wrapT=as,this.magFilter=rs,this.minFilter=is,this.anisotropy=1,this.flipY=!0,this.premultiplyAlpha=!1,this.generateMipmaps=!0,this.colorSpace=``,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrix=new Ao,this.version=0}set needsUpdate(e){e===!0&&this.version++}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}dispose(){this.dispatchEvent({type:`dispose`})}};nc.prototype.isTexture=!0;var rc=class extends nc{constructor(e){super(e),this.needsUpdate=!0}};rc.prototype.isCanvasTexture=!0;var ic=class extends nc{constructor(e,t,n,r=`rgba8unorm`){super({data:e,width:t,height:n}),this.format=r,this.flipY=!1,this.generateMipmaps=!1,this.minFilter=rs}};ic.prototype.isDataTexture=!0;var ac=0,oc=class extends os{constructor(){super(),Object.defineProperty(this,"id",{value:ac++}),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.depthTest=!0,this.depthWrite=!0,this.colorWrite=!0,this.alphaTest=0,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.toneMapped=!0,this.visible=!0,this.userData={},this.version=0}set needsUpdate(e){e===!0&&this.version++}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0)continue;let r=this[t];r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2?r.copy(n):this[t]=n}}dispose(){this.dispatchEvent({type:`dispose`})}};oc.prototype.isMaterial=!0;var sc=class extends oc{constructor(e){super(),this.type=`MeshBasicMaterial`,this.color=new Fo(16777215),this.map=null,this.setValues(e)}};sc.prototype.isMeshBasicMaterial=!0;var cc=class extends oc{constructor(e){super(),this.type=`MeshStandardMaterial`,this.color=new Fo(16777215),this.roughness=1,this.metalness=0,this.map=null,this.emissive=new Fo(0),this.emissiveIntensity=1,this.bumpMap=null,this.bumpScale=1,this.envMapIntensity=1,this.flatShading=!1,this.setValues(e)}};cc.prototype.isMeshStandardMaterial=!0;var lc=class extends cc{constructor(e){super(),this.type=`MeshPhysicalMaterial`,this.clearcoat=0,this.clearcoatRoughness=0,this.ior=1.5,this.iridescence=0,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.sheen=0,this.sheenColor=new Fo(0),this.sheenRoughness=1,this.transmission=0,this.thickness=0,this.attenuationDistance=1/0,this.attenuationColor=new Fo(1,1,1),this.specularIntensity=1,this.specularColor=new Fo(1,1,1),this.setValues(e)}};lc.prototype.isMeshPhysicalMaterial=!0;var uc=class extends oc{constructor(e){super(),this.type=`ShadowMaterial`,this.color=new Fo(0),this.transparent=!0,this.setValues(e)}};uc.prototype.isShadowMaterial=!0;var dc=class extends oc{constructor(e){super(),this.type=`LineBasicMaterial`,this.color=new Fo(16777215),this.setValues(e)}};dc.prototype.isLineBasicMaterial=!0;var fc=class extends oc{constructor(e){super(),this.type=`SpriteMaterial`,this.color=new Fo(16777215),this.map=null,this.rotation=0,this.transparent=!0,this.setValues(e)}};fc.prototype.isSpriteMaterial=!0;var pc=class extends oc{constructor(e){super(),this.type=`ShaderMaterial`,this.uniforms={},this.glsl=null,this.wgsl=null,this.setValues(e)}};pc.prototype.isShaderMaterial=!0;var mc=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}update(e){return this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=this._currentTime-this._previousTime,this._elapsed+=this._delta,this}},hc=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},gc=class extends Es{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new q,d=new q,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new X(p,3)),this.setAttribute(`normal`,new X(m,3)),this.setAttribute(`uv`,new X(h,2))}},_c=class extends Es{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o,1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a,r,i,a)}this.setIndex(f),this.setAttribute(`position`,new X(p,3)),this.setAttribute(`normal`,new X(m,3)),this.setAttribute(`uv`,new X(h,2))}},vc=class extends Es{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[0,0,0],o=[0,0,1],s=[.5,.5];for(let i=0,c=3;i<=t;i++,c+=3){let l=n+i/t*r;a.push(e*Math.cos(l),e*Math.sin(l),0),o.push(0,0,1),s.push((a[c]/e+1)/2,(a[c+1]/e+1)/2)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new X(a,3)),this.setAttribute(`normal`,new X(o,3)),this.setAttribute(`uv`,new X(s,2))}},yc=class extends Es{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a},r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let o=[],s=[],c=[],l=[],u=0,d=0,f=(e,t,n,r,i,a,f,p,m,h,g)=>{let _=a/m,v=f/h,y=a/2,b=f/2,x=p/2,S=m+1,C=h+1,w=0,T=0,E=new q;for(let a=0;a<C;a++){let o=a*v-b;for(let u=0;u<S;u++)E[e]=(u*_-y)*r,E[t]=o*i,E[n]=x,s.push(E.x,E.y,E.z),E[e]=0,E[t]=0,E[n]=p>0?1:-1,c.push(E.x,E.y,E.z),l.push(u/m,1-a/h),w+=1}for(let e=0;e<h;e++)for(let t=0;t<m;t++){let n=u+t+S*e,r=u+t+S*(e+1),i=u+(t+1)+S*(e+1),a=u+(t+1)+S*e;o.push(n,r,a,r,i,a),T+=6}this.addGroup(d,T,g),d+=T,u+=w};f(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),f(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),f(`x`,`z`,`y`,1,1,e,n,t,r,a,2),f(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),f(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),f(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(o),this.setAttribute(`position`,new X(s,3)),this.setAttribute(`normal`,new X(c,3)),this.setAttribute(`uv`,new X(l,2))}},bc=class extends Es{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s},r=Math.floor(r),i=Math.floor(i);let c=[],l=[],u=[],d=[],f=0,p=[],m=n/2,h=0,g=()=>{let a=new q,g=new q,_=0,v=(t-e)/n;for(let c=0;c<=i;c++){let h=[],_=c/i,y=_*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),p=Math.cos(i);g.x=y*c,g.y=-_*n+m,g.z=y*p,l.push(g.x,g.y,g.z),a.set(c,v,p).normalize(),u.push(a.x,a.y,a.z),d.push(t,1-_),h.push(f++)}p.push(h)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=p[r][n],o=p[r+1][n],s=p[r+1][n+1],l=p[r][n+1];(e>0||r!==0)&&(c.push(a,o,l),_+=3),(t>0||r!==i-1)&&(c.push(o,s,l),_+=3)}this.addGroup(h,_,0),h+=_},_=n=>{let i=f,a=0,p=n===!0?e:t,g=n===!0?1:-1;for(let e=1;e<=r;e++)l.push(0,m*g,0),u.push(0,g,0),d.push(.5,.5),f++;let _=f;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);l.push(p*i,m*g,p*n),u.push(0,g,0),d.push(n*.5+.5,i*.5*g+.5),f++}for(let e=0;e<r;e++){let t=i+e,r=_+e;n===!0?c.push(r,r+1,t):c.push(r+1,r,t),a+=3}this.addGroup(h,a,n===!0?1:2),h+=a};g(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(c),this.setAttribute(`position`,new X(l,3)),this.setAttribute(`normal`,new X(u,3)),this.setAttribute(`uv`,new X(d,2))}},xc=class extends bc{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}},Sc=class extends Es{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new q,f=new q,p=new q;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r,s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o,i,a,o)}this.setIndex(s),this.setAttribute(`position`,new X(c,3)),this.setAttribute(`normal`,new X(l,3)),this.setAttribute(`uv`,new X(u,2))}},Cc=class extends Es{constructor(e=[new K(0,-.5),new K(.5,0),new K(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=G(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new q,d=new q,f=new q,p,m;for(let t=0;t<=e.length-1;t++)t===0?(p=e[t+1].x-e[t].x,m=e[t+1].y-e[t].y,u.x=m*1,u.y=-p,u.z=m*0,f.copy(u),u.normalize(),s.push(u.x,u.y,u.z)):t===e.length-1?s.push(f.x,f.y,f.z):(p=e[t+1].x-e[t].x,m=e[t+1].y-e[t].y,u.x=m*1,u.y=-p,u.z=m*0,d.copy(u),u.x+=f.x,u.y+=f.y,u.z+=f.z,u.normalize(),s.push(u.x,u.y,u.z),f.copy(d));for(let i=0;i<=t;i++){let u=n+i*l*r,d=Math.sin(u),f=Math.cos(u);for(let n=0;n<=e.length-1;n++)a.push(e[n].x*d,e[n].y,e[n].x*f),o.push(i/t,n/(e.length-1)),c.push(s[3*n]*d,s[3*n+1],s[3*n]*f)}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c,s,c,o)}this.setIndex(i),this.setAttribute(`position`,new X(a,3)),this.setAttribute(`uv`,new X(o,2)),this.setAttribute(`normal`,new X(c,3))}},wc=class extends Es{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[],o=e=>i.push(e.x,e.y,e.z),s=(t,n)=>{n.x=e[t*3],n.y=e[t*3+1],n.z=e[t*3+2]},c=e=>Math.atan2(e.z,-e.x),l=e=>Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z)),u=(e,t,n,r)=>{let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(o(a[e][n+1]),o(a[e+1][n]),o(a[e][n])):(o(a[e][n+1]),o(a[e+1][n+1]),o(a[e+1][n]))}},d=new q,f=new q,p=new q;for(let e=0;e<t.length;e+=3)s(t[e+0],d),s(t[e+1],f),s(t[e+2],p),u(d,f,p,r);let m=new q;for(let e=0;e<i.length;e+=3)m.set(i[e],i[e+1],i[e+2]).normalize().multiplyScalar(n),i[e]=m.x,i[e+1]=m.y,i[e+2]=m.z;for(let e=0;e<i.length;e+=3)m.set(i[e],i[e+1],i[e+2]),a.push(c(m)/2/Math.PI+.5,1-(l(m)/Math.PI+.5));let h=new q,g=(e,t,n,r)=>{r<0&&e===1&&(a[t]=e-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)};for(let e=0,t=0;e<i.length;e+=9,t+=6){d.set(i[e],i[e+1],i[e+2]),f.set(i[e+3],i[e+4],i[e+5]),p.set(i[e+6],i[e+7],i[e+8]);let n=a[t],r=a[t+2],o=a[t+4];h.copy(d).add(f).add(p).divideScalar(3);let s=c(h);g(n,t,d,s),g(r,t+2,f,s),g(o,t+4,p,s)}for(let e=0;e<a.length;e+=6){let t=a[e],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}this.setAttribute(`position`,new X(i,3)),this.setAttribute(`normal`,new X(i.slice(),3)),this.setAttribute(`uv`,new X(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}},Tc=class extends wc{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}},Ec={a:new q,b:new q,c:new q},Dc=new q,Oc=new q,kc=new q,Ac=class extends Es{constructor(e=null,t=1){if(super(),this.type=`EdgesGeometry`,this.parameters={geometry:e,thresholdAngle:t},e===null)return;let n=1e4,r=Math.cos(Co*t),i=e.getIndex(),a=e.getAttribute(`position`),o=i?i.count:a.count,s=[0,0,0],c=[`a`,`b`,`c`],l=[,,,],u={},d=[],f=e=>`${Math.round(e.x*n)},${Math.round(e.y*n)},${Math.round(e.z*n)}`;for(let e=0;e<o;e+=3){i?(s[0]=i.getX(e),s[1]=i.getX(e+1),s[2]=i.getX(e+2)):(s[0]=e,s[1]=e+1,s[2]=e+2);let{a:t,b:n,c:o}=Ec;t.fromBufferAttribute(a,s[0]),n.fromBufferAttribute(a,s[1]),o.fromBufferAttribute(a,s[2]),Dc.subVectors(o,n),Oc.subVectors(t,n),Dc.cross(Oc);let p=Dc.lengthSq();if(p>0?Dc.multiplyScalar(1/Math.sqrt(p)):Dc.set(0,0,0),l[0]=f(t),l[1]=f(n),l[2]=f(o),l[0]!==l[1]&&l[1]!==l[2]&&l[2]!==l[0])for(let e=0;e<3;e++){let t=(e+1)%3,n=l[e],i=l[t],a=Ec[c[e]],o=Ec[c[t]],f=`${n}_${i}`,p=`${i}_${n}`;p in u&&u[p]?(Dc.dot(u[p].normal)<=r&&d.push(a.x,a.y,a.z,o.x,o.y,o.z),u[p]=null):f in u||(u[f]={index0:s[e],index1:s[t],normal:Dc.clone()})}}for(let e in u)if(u[e]){let{index0:t,index1:n}=u[e];Oc.fromBufferAttribute(a,t),kc.fromBufferAttribute(a,n),d.push(Oc.x,Oc.y,Oc.z,kc.x,kc.y,kc.z)}this.setAttribute(`position`,new X(d,3))}},jc=class{constructor(e,t){this.v1=e,this.v2=t}getPoint(e,t=new K){return e===1?t.copy(this.v2):t.copy(this.v2).sub(this.v1).multiplyScalar(e).add(this.v1),t}};jc.prototype.isLineCurve=!0;var Mc=(e,t,n,r)=>{let i=1-e;return i*i*t+2*(1-e)*e*n+e*e*r},Nc=class{constructor(e,t,n){this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){return t.set(Mc(e,this.v0.x,this.v1.x,this.v2.x),Mc(e,this.v0.y,this.v1.y,this.v2.y))}},Pc=class{constructor(){this.curves=[],this.currentPoint=new K}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){return this.curves.push(new jc(this.currentPoint.clone(),new K(e,t))),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){return this.curves.push(new Nc(this.currentPoint.clone(),new K(e,t),new K(n,r))),this.currentPoint.set(n,r),this}getPoints(e=12){let t=[],n;for(let r of this.curves){let i=r.isLineCurve?1:e;for(let e=0;e<=i;e++){let a=r.getPoint(e/i);n&&n.equals(a)||(t.push(a),n=a)}}return t}},Fc=e=>{let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5},Ic=e=>Fc(e)<0;function Lc(e){let t=(e,t,n)=>({i:e,x:t,y:n,prev:null,next:null}),n=(e,n,r,i)=>{let a=t(e,n,r);return i?(a.next=i.next,a.prev=i,i.next.prev=a,i.next=a):(a.prev=a,a.next=a),a},r=e=>{e.next.prev=e.prev,e.prev.next=e.next},i=(e,t,n)=>(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y),a=(e,t)=>e.x===t.x&&e.y===t.y,o=(e,t,n,r,i,a,o,s)=>(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s),s=0;for(let t=0,n=e.length-2;t<e.length;t+=2)s+=(e[n]-e[t])*(e[t+1]+e[n+1]),n=t;let c;if(s>0)for(let t=0;t<e.length;t+=2)c=n(t/2|0,e[t],e[t+1],c);else for(let t=e.length-2;t>=0;t-=2)c=n(t/2|0,e[t],e[t+1],c);c&&a(c,c.next)&&(r(c),c=c.next);let l=[];if(!c||c.next===c.prev)return l;let u=e=>{let t=e.prev,n=e,r=e.next;if(i(t,n,r)>=0)return!1;let a=Math.min(t.x,n.x,r.x),s=Math.min(t.y,n.y,r.y),c=Math.max(t.x,n.x,r.x),l=Math.max(t.y,n.y,r.y);for(let e=r.next;e!==t;e=e.next)if(e.x>=a&&e.x<=c&&e.y>=s&&e.y<=l&&(t.x!==e.x||t.y!==e.y)&&o(t.x,t.y,n.x,n.y,r.x,r.y,e.x,e.y)&&i(e.prev,e,e.next)>=0)return!1;return!0},d=e=>{let t=e,n=e,o;do if(o=!1,a(t,t.next)||i(t.prev,t,t.next)===0){if(r(t),t=n=t.prev,t===t.next)break;o=!0}else t=t.next;while(o||t!==n);return n},f=(e,t)=>{let n=e;for(;e.prev!==e.next;){let i=e.prev,a=e.next;if(u(e)){l.push(i.i,e.i,a.i),r(e),e=a.next,n=a.next;continue}if(e=a,e===n){if(!t)f(d(e),1);else throw Error(`gfx: shape outline is not a simple polygon`);break}}};return f(c,0),l}function Rc(e){e.length>2&&e[e.length-1].equals(e[0])&&e.pop();let t=[];for(let n of e)t.push(n.x,n.y);let n=Lc(t),r=[];for(let e=0;e<n.length;e+=3)r.push(n.slice(e,e+3));return r}var zc=(e,t,n,r)=>[new K(e[t*3],e[t*3+1]),new K(e[n*3],e[n*3+1]),new K(e[r*3],e[r*3+1])];function Bc(e,t,n,r,i){let a=t=>[e[t*3],e[t*3+1],e[t*3+2]],[o,s,c]=a(t),[l,u,d]=a(n),[f,p,m]=a(r),[h,g,_]=a(i);return Math.abs(s-u)<Math.abs(o-l)?[new K(o,1-c),new K(l,1-d),new K(f,1-m),new K(h,1-_)]:[new K(s,1-c),new K(u,1-d),new K(p,1-m),new K(g,1-_)]}var Vc=class extends Es{constructor(e,t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t};let n=[],r=[],i=[],a=t.curveSegments===void 0?12:t.curveSegments,o=t.steps===void 0?1:t.steps,s=t.depth===void 0?1:t.depth,c=t.bevelEnabled===void 0||t.bevelEnabled,l=t.bevelThickness===void 0?.2:t.bevelThickness,u=t.bevelSize===void 0?l-.1:t.bevelSize,d=t.bevelOffset===void 0?0:t.bevelOffset,f=t.bevelSegments===void 0?3:t.bevelSegments;c||(f=0,l=0,u=0,d=0);let p=e.getPoints(a);Ic(p)||(p=p.reverse());let m=p[0];for(let e=1;e<=p.length;e++){let t=e%p.length,n=p[t],r=n.x-m.x,i=n.y-m.y,a=Math.max(Math.abs(n.x),Math.abs(n.y),Math.abs(m.x),Math.abs(m.y));if(r*r+i*i<=10000000000000001e-36*a*a){p.splice(t,1),e--;continue}m=n}let h=p,g=p.length,_=(e,t,n)=>e.clone().addScaledVector(t,n),v=(e,t,n)=>{let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new K(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new K(r/a,i/a)},y=[];for(let e=0,t=h.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),y[e]=v(h[e],h[n],h[r]);let b=y.concat(),x=(e,t,n)=>i.push(e,t,n),S;if(f===0)S=Rc(h);else{let e=[];for(let t=0;t<f;t++){let n=t/f,r=l*Math.cos(n*Math.PI/2),i=u*Math.sin(n*Math.PI/2)+d;for(let t=0,a=h.length;t<a;t++){let a=_(h[t],y[t],i);x(a.x,a.y,-r),n===0&&e.push(a)}}S=Rc(e)}let C=S.length,w=u+d;for(let e=0;e<g;e++){let t=c?_(p[e],b[e],w):p[e];x(t.x,t.y,0)}for(let e=1;e<=o;e++)for(let t=0;t<g;t++){let n=c?_(p[t],b[t],w):p[t];x(n.x,n.y,s/o*e)}for(let e=f-1;e>=0;e--){let t=e/f,n=l*Math.cos(t*Math.PI/2),r=u*Math.sin(t*Math.PI/2)+d;for(let e=0,t=h.length;e<t;e++){let t=_(h[e],y[e],r);x(t.x,t.y,s+n)}}let T=e=>n.push(i[e*3],i[e*3+1],i[e*3+2]),E=e=>r.push(e.x,e.y),D=(e,t,r)=>{T(e),T(t),T(r);let i=n.length/3;zc(n,i-3,i-2,i-1).forEach(E)},O=(e,t,r,i)=>{T(e),T(t),T(i),T(t),T(r),T(i);let a=n.length/3,o=Bc(n,a-6,a-3,a-2,a-1);E(o[0]),E(o[1]),E(o[3]),E(o[1]),E(o[2]),E(o[3])},k=n.length/3;if(c){let e=0;for(let t=0;t<C;t++)D(S[t][2]+e,S[t][1]+e,S[t][0]+e);e=g*(o+f*2);for(let t=0;t<C;t++)D(S[t][0]+e,S[t][1]+e,S[t][2]+e)}else{for(let e=0;e<C;e++)D(S[e][2],S[e][1],S[e][0]);for(let e=0;e<C;e++)D(S[e][0]+g*o,S[e][1]+g*o,S[e][2]+g*o)}this.addGroup(k,n.length/3-k,0),k=n.length/3;let A=h.length;for(;--A>=0;){let e=A,t=A-1;t<0&&(t=h.length-1);for(let n=0,r=o+f*2;n<r;n++){let r=g*n,i=g*(n+1);O(e+r,t+r,t+i,e+i)}}this.addGroup(k,n.length/3-k,1),this.setAttribute(`position`,new X(n,3)),this.setAttribute(`uv`,new X(r,2)),this.computeVertexNormals()}},Hc=t({AdditiveBlending:()=>2,AmbientLight:()=>Xs,BackSide:()=>1,Box3:()=>Io,BoxGeometry:()=>yc,BufferAttribute:()=>ys,BufferGeometry:()=>Es,Camera:()=>Ks,CanvasTexture:()=>rc,CircleGeometry:()=>vc,ClampToEdgeWrapping:()=>as,Clock:()=>hc,Color:()=>Fo,ConeGeometry:()=>xc,CubeUVReflectionMapping:()=>306,CylinderGeometry:()=>bc,DEG2RAD:()=>Co,DataTexture:()=>ic,DirectionalLight:()=>$s,DirectionalLightShadow:()=>Qs,DoubleSide:()=>2,EdgesGeometry:()=>Ac,EquirectangularReflectionMapping:()=>303,Euler:()=>ko,EventDispatcher:()=>os,ExtrudeGeometry:()=>Vc,Float32BufferAttribute:()=>X,FrontSide:()=>0,Frustum:()=>Bo,Group:()=>_s,HemisphereLight:()=>Zs,IcosahedronGeometry:()=>Tc,LatheGeometry:()=>Cc,Layers:()=>ss,Light:()=>Ys,Line:()=>zs,LineBasicMaterial:()=>dc,LineSegments:()=>Bs,LinearFilter:()=>rs,LinearMipmapLinearFilter:()=>is,LinearSRGBColorSpace:()=>ns,LinearToSRGB:()=>No,Material:()=>oc,Matrix3:()=>Ao,Matrix4:()=>jo,Mesh:()=>Rs,MeshBasicMaterial:()=>sc,MeshPhysicalMaterial:()=>lc,MeshStandardMaterial:()=>cc,NoBlending:()=>0,NoColorSpace:()=>``,NormalBlending:()=>1,Object3D:()=>gs,OrthographicCamera:()=>Js,PCFShadowMap:()=>1,PMREMGenerator:()=>Uc,PerspectiveCamera:()=>qs,Plane:()=>Ro,PlaneGeometry:()=>_c,PointLight:()=>ec,PolyhedronGeometry:()=>wc,Quaternion:()=>Oo,RAD2DEG:()=>wo,Ray:()=>zo,Raycaster:()=>Ws,SRGBColorSpace:()=>ts,SRGBToLinear:()=>Mo,Scene:()=>vs,ShaderMaterial:()=>pc,ShadowMaterial:()=>uc,Shape:()=>Pc,Sphere:()=>Lo,SphereGeometry:()=>gc,Spherical:()=>Vo,Sprite:()=>Us,SpriteMaterial:()=>fc,Texture:()=>nc,Timer:()=>mc,TorusGeometry:()=>Sc,UVMapping:()=>300,Uint16BufferAttribute:()=>bs,Uint32BufferAttribute:()=>xs,Vector2:()=>K,Vector3:()=>q,Vector4:()=>Do,clamp:()=>G,euclideanModulo:()=>To,lerp:()=>Eo}),Uc=class{constructor(e){this._renderer=e}fromEquirectangular(e){return{texture:this._renderer.prefilterEquirectangular(e)}}dispose(){}},Wc=4,Gc=6;function Kc(e){let t=Math.floor(Math.log2(e/4)),n=2**t,r=3*Math.max(n,112),i=4*n,a=Math.log2(i)-2;return{lodMax:t,cubeSize:n,width:r,height:i,texelWidth:1/(3*Math.max(2**a,112)),texelHeight:1/i,maxMip:a}}function qc(e){let t=[],n=e,r=e-Wc+1+Gc;for(let e=0;e<r;e++){let e=2**n,r=1/(e-2),i=-r,a=1+r,o=[i,i,a,i,a,a,i,i,a,a,i,a],s=new Float32Array(108),c=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1;s.set([t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0],18*e);for(let t=0;t<6;t++){let n=o[t*2]*2-1,r=o[t*2+1]*2-1,i;i=e===0?[1,r,n]:e===1?[-n,1,-r]:e===2?[-n,r,1]:e===3?[-1,r,-n]:e===4?[-n,-1,r]:[n,r,-1],c.set(i,(e*6+t)*3)}}t.push({sizeLod:e,position:s,outputDirection:c}),n>Wc&&n--}return t}function Jc(e,t){let{lodMax:n,cubeSize:r}=e,i=t.length,a=[];for(let e=1;e<i;e++){let o=e-1,s=e/(i-1),c=o/(i-1),l=Math.sqrt(s*s-c*c),u=s*1.25,d=t[e].sizeLod,f=[3*d*(e>n-Wc?e-n+Wc:0),4*(r-d),3*d,2*d];a.push({plane:e,source:`atlas`,target:`pingPong`,roughness:l*u,mipInt:n-o,viewport:f}),a.push({plane:e,source:`pingPong`,target:`atlas`,roughness:0,mipInt:n-e,viewport:f})}return a}var Yc=new jo,Xc=new ko,Zc=new jo,Qc=new Ao,$c=new Bo,el=new Do,tl=new q;function nl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.z===t.z?e.id-t.id:e.z-t.z:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function rl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}var il=(e,t)=>(t.castShadow?2:0)-(e.castShadow?2:0),al={0:1,1:0,2:2},ol=(e,t=1)=>[e.r*t,e.g*t,e.b*t],sl=class{constructor(e,t){this.backend=e,this.domElement=t,this.shadowMap={enabled:!1,type:1},this.sortObjects=!0,this._pixelRatio=1,this._width=t.width,this._height=t.height,this._animation=null,this._frame=0,this._environments=new WeakMap}setBackend(e,t){this.backend=e,this.domElement=t,this._environments=new WeakMap,this.setSize(this._width,this._height)}get isWebGPU(){return this.backend.isWebGPU===!0}getPixelRatio(){return this._pixelRatio}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height,!1)}setSize(e,t,n=!0){this._width=e,this._height=t,this.domElement.width=Math.floor(e*this._pixelRatio),this.domElement.height=Math.floor(t*this._pixelRatio),n!==!1&&(this.domElement.style.width=e+`px`,this.domElement.style.height=t+`px`),this.backend.setSize(this.domElement.width,this.domElement.height)}setAnimationLoop(e){if(this._animation!==null&&cancelAnimationFrame(this._animation),this._animation=null,!e)return;let t=n=>{this._animation=requestAnimationFrame(t),e(n)};this._animation=requestAnimationFrame(t)}prefilterEquirectangular(e){let t=Kc(e.image.width),n={isCubeUVTexture:!0,source:e,texelWidth:t.texelWidth,texelHeight:t.texelHeight,maxMip:t.maxMip,dispose:()=>{this._environments.get(n)?.dispose(),this._environments.delete(n)}};return n}_environment(e){let t=this._environments.get(e);return t||(t=this.backend.prefilterEquirectangular(e.source),this._environments.set(e,t)),t}render(e,t){e.updateMatrixWorld(),t.parent===null&&t.updateMatrixWorld(),Yc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),$c.setFromProjectionMatrix(Yc);let n={opaque:[],transmissive:[],transparent:[],lights:[],shadows:[]};this._project(e,t,0,n),this.sortObjects&&(n.opaque.sort(nl),n.transmissive.sort(rl),n.transparent.sort(rl));let r=this.shadowMap.enabled&&n.shadows.length>0;n.lights.sort(il);let i=e.environment?this._environment(e.environment):null,a=e.environmentRotation;a?Xc.set(-a.x,-a.y,-a.z,a.order):Xc.set(0,0,0);let o=Qc.setFromMatrix4(Zc.makeRotationFromEuler(Xc)).elements;this.backend.beginFrame();let s=null;r&&(s=this._renderShadows(e,t,n.shadows));let c={scene:e,camera:t,env:i,envRotation:o,lighting:this._setupLights(n.lights,r),shadow:s};if(n.transmissive.length>0){let e=[this.domElement.width,this.domElement.height],t=this._frame_(c,`linear`,null);this.backend.beginPass({target:`transmission`,clear:[.5,.5,.5,.5],frame:t}),this._renderItems(n.opaque,c,t),this.backend.endPass(),c.transmission={size:e}}let l=this._frame_(c,`srgb`,c.transmission??null);this.backend.beginPass({target:`canvas`,clear:[0,0,0,0],frame:l}),this._renderItems(n.opaque,c,l),this._renderItems(n.transmissive,c,l),this._renderItems(n.transparent,c,l),this.backend.endPass(),this.backend.endFrame(),this._frame++}_project(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLight)r.lights.push(e),e.castShadow&&e.isDirectionalLight&&r.shadows.push(e);else if(e.isSprite)(!e.frustumCulled||$c.intersectsSprite(e))&&(this._sync(e.geometry),this.sortObjects&&el.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Yc),e.material.visible&&this._push(r,e,e.geometry,e.material,n,el.z,null));else if((e.isMesh||e.isLine)&&(!e.frustumCulled||$c.intersectsObject(e))){let t=e.geometry,i=e.material;if(this._sync(t),this.sortObjects&&(t.boundingSphere===null&&t.computeBoundingSphere(),el.copy(t.boundingSphere.center).applyMatrix4(e.matrixWorld).applyMatrix4(Yc)),Array.isArray(i))for(let a of t.groups){let o=i[a.materialIndex];o&&o.visible&&this._push(r,e,t,o,n,el.z,a)}else i.visible&&this._push(r,e,t,i,n,el.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)this._project(i[e],t,n,r)}_sync(e){e._syncedFrame!==this._frame&&(e._syncedFrame=this._frame,this.backend.syncGeometry(e))}_push(e,t,n,r,i,a,o){let s={id:t.id,object:t,geometry:n,material:r,groupOrder:i,renderOrder:t.renderOrder,z:a,group:o};r.transmission>0?e.transmissive.push(s):r.transparent===!0?e.transparent.push(s):e.opaque.push(s)}_setupLights(e,t){let n=[0,0,0],r=[],i=[],a=[];for(let o of e)o.isAmbientLight?(n[0]+=o.color.r*o.intensity,n[1]+=o.color.g*o.intensity,n[2]+=o.color.b*o.intensity):o.isDirectionalLight?r.push({light:o,color:ol(o.color,o.intensity),castShadow:t&&o.castShadow}):o.isPointLight?i.push({light:o,color:ol(o.color,o.intensity),distance:o.distance,decay:o.decay}):o.isHemisphereLight&&a.push({light:o,skyColor:ol(o.color,o.intensity),groundColor:ol(o.groundColor,o.intensity)});return{ambient:n,directional:r,point:i,hemi:a,numDirShadows:r.filter(e=>e.castShadow).length}}_frame_(e,t,n){let{camera:r,lighting:i,env:a,shadow:o}=e,s=r.matrixWorldInverse,c=i.directional.map(e=>{let t=new q().setFromMatrixPosition(e.light.matrixWorld);return tl.setFromMatrixPosition(e.light.target.matrixWorld),t.sub(tl).transformDirection(s),{direction:t.toArray(),color:e.color}}),l=i.point.map(e=>({position:new q().setFromMatrixPosition(e.light.matrixWorld).applyMatrix4(s).toArray(),color:e.color,distance:e.distance,decay:e.decay})),u=i.hemi.map(e=>({direction:new q().setFromMatrixPosition(e.light.matrixWorld).transformDirection(s).toArray(),skyColor:e.skyColor,groundColor:e.groundColor}));return{output:t,camera:{viewMatrix:s.elements,projectionMatrix:r.projectionMatrix.elements,position:new q().setFromMatrixPosition(r.matrixWorld).toArray(),isOrthographic:r.isOrthographicCamera===!0},ambient:i.ambient,directional:c,point:l,hemi:u,numDirShadows:i.numDirShadows,shadow:o,env:a,transmission:n}}_renderShadows(e,t,n){let r=null;for(let i of n){let n=i.shadow;n.updateMatrices(i);let a=[],o=e=>{if(e.visible!==!1){if(e.layers.test(t.layers)&&(e.isMesh||e.isLine)&&e.castShadow&&(!e.frustumCulled||n.frustum.intersectsObject(e))){this._sync(e.geometry),e.modelViewMatrix.multiplyMatrices(n.camera.matrixWorldInverse,e.matrixWorld);let t=e.material;if(Array.isArray(t))for(let n of e.geometry.groups){let r=t[n.materialIndex];r&&r.visible&&a.push({object:e,geometry:e.geometry,material:r,group:n})}else t.visible&&a.push({object:e,geometry:e.geometry,material:t,group:null})}for(let t of e.children)o(t)}};o(e);let s=[n.mapSize.x,n.mapSize.y],c=this.backend.beginShadowPass(i,s),l=n.camera.projectionMatrix.elements;for(let e of a){let t=al[e.material.side],n=this._geometryRange(e.object,e.geometry,e.group);n!==null&&this.backend.drawDepth({geometry:e.geometry,...n,modelViewMatrix:e.object.modelViewMatrix.elements,projectionMatrix:l,cull:cl(t,e.object)})}this.backend.endPass(),r===null&&(r={texture:c,matrix:n.matrix.elements,normalBias:n.normalBias,intensity:n.intensity,bias:n.bias,radius:n.radius,mapSize:s})}return r}_renderItems(e,t,n){for(let r of e){let{object:e,geometry:i,group:a}=r,o=r.material;e.onBeforeRender(this,t.scene,t.camera,i,o,a),e.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),o.transparent===!0&&o.side===2&&o.forceSinglePass===!1?(this._draw(e,i,o,a,t,n,1),this._draw(e,i,o,a,t,n,0)):this._draw(e,i,o,a,t,n,o.side),e.onAfterRender(this,t.scene,t.camera,i,o,a)}}_geometryRange(e,t,n){let r=t.index,i=t.attributes.position,a=t.drawRange,o=a.start,s=a.start+a.count;n!==null&&(o=Math.max(o,n.start),s=Math.min(s,n.start+n.count)),r===null?i!==void 0&&(o=Math.max(o,0),s=Math.min(s,i.count)):(o=Math.max(o,0),s=Math.min(s,r.count));let c=s-o;if(c<0||c===1/0)return null;let l=e.isLineSegments?`lines`:e.isLine?`line-strip`:`triangles`;return{start:o,count:c,topology:l}}_draw(e,t,n,r,i,a,o){let s=this._geometryRange(e,t,r);if(s===null||s.count===0)return;let{key:c,params:l,textures:u}=dl(e,t,n,o,i,a);this.backend.draw({key:c,params:l,textures:u,material:n,geometry:t,...s,object:{modelMatrix:e.matrixWorld.elements,modelViewMatrix:e.modelViewMatrix.elements,normalMatrix:e.normalMatrix.elements},state:{blending:n.blending===1&&n.transparent===!1?`none`:n.blending===2?`additive`:n.blending===1?`normal`:`none`,depthTest:n.depthTest,depthWrite:n.depthWrite,colorWrite:n.colorWrite,cull:cl(o,e)}})}};function cl(e,t){if(e===2)return`none`;let n=e===1;return t.isMesh&&t.matrixWorld.determinant()<0&&(n=!n),n?`front`:`back`}var ll=e=>e?(e.updateMatrix(),e.matrix.elements):ul,ul=[1,0,0,0,1,0,0,0,1];function dl(e,t,n,r,i,a){let o=a.output,s=t.attributes.normal!==void 0,c=n.transparent===!1&&n.blending===1,l={numDir:a.directional.length,numPoint:a.point.length,numHemi:a.hemi.length};if(n.isMeshStandardMaterial){let t=n.isMeshPhysicalMaterial===!0,u=i.env,d={kind:`standard`,physical:t,output:o,opaque:c,hasNormal:s,map:!!n.map,bumpMap:!!n.bumpMap,vertexColors:n.vertexColors===!0,flat:n.flatShading===!0||!s,doubleSided:r===2,flipSided:r===1,envMap:!!u,env:u?{texelWidth:u.texelWidth,texelHeight:u.texelHeight,maxMip:u.maxMip}:null,clearcoat:t&&n.clearcoat>0,sheen:t&&n.sheen>0,iridescence:t&&n.iridescence>0,transmission:t&&n.transmission>0,...l,numDirShadows:a.numDirShadows},f={diffuse:ol(n.color),opacity:n.opacity,emissive:ol(n.emissive,n.emissiveIntensity),roughness:n.roughness,metalness:n.metalness,envMapIntensity:i.scene.environmentIntensity??1,envMapRotation:Array.from(i.envRotation??ul),receiveShadow:+!!e.receiveShadow,mapTransform:ll(n.map),bumpMapTransform:ll(n.bumpMap),bumpScale:n.bumpMap?r===1?-n.bumpScale:n.bumpScale:1,ior:1.5,specularIntensity:1,specularColor:[1,1,1],clearcoat:0,clearcoatRoughness:0,iridescence:0,iridescenceIOR:1.3,iridescenceThicknessMaximum:400,sheenColor:[0,0,0],sheenRoughness:1,transmission:0,thickness:0,attenuationDistance:1/0,attenuationColor:[1,1,1]};return t&&(f.ior=n.ior,f.specularIntensity=n.specularIntensity,f.specularColor=ol(n.specularColor),n.sheen>0&&(f.sheenColor=ol(n.sheenColor,n.sheen),f.sheenRoughness=n.sheenRoughness),n.clearcoat>0&&(f.clearcoat=n.clearcoat,f.clearcoatRoughness=n.clearcoatRoughness),n.iridescence>0&&(f.iridescence=n.iridescence,f.iridescenceIOR=n.iridescenceIOR,f.iridescenceThicknessMaximum=n.iridescenceThicknessRange[1]),n.transmission>0&&(f.transmission=n.transmission,f.thickness=n.thickness,f.attenuationDistance=n.attenuationDistance,f.attenuationColor=ol(n.attenuationColor))),{key:d,params:f,textures:{map:n.map,bumpMap:n.bumpMap}}}if(n.isMeshBasicMaterial||n.isLineBasicMaterial){let e=n.isMeshBasicMaterial?n.map:null;return{key:{kind:`basic`,output:o,opaque:c,map:!!e,vertexColors:n.vertexColors===!0},params:{diffuse:ol(n.color),opacity:n.opacity,mapTransform:ll(e)},textures:{map:e}}}if(n.isSpriteMaterial)return{key:{kind:`sprite`,output:o,opaque:c,map:!!n.map},params:{diffuse:ol(n.color),opacity:n.opacity,rotation:n.rotation,center:[e.center.x,e.center.y],mapTransform:ll(n.map)},textures:{map:n.map}};if(n.isShadowMaterial)return{key:{kind:`shadow`,output:o,opaque:c,hasNormal:s,...l,numDirShadows:a.numDirShadows},params:{color:ol(n.color),opacity:n.opacity,receiveShadow:+!!e.receiveShadow},textures:{}};if(n.isShaderMaterial)return{key:{kind:`custom`,output:o,material:n.id},params:{},textures:{}};throw Error(`gfx: cannot draw ${n.type}`)}function fl(e){return JSON.stringify(e)}var pl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);function ml(e,t){return e.replace(/#include <(\w+)>/g,(e,n)=>{if(!(n in t))throw Error(`gfx: no shader chunk <${n}>`);return ml(t[n],t)})}function hl(e,t,n={}){let r=[],i=[],a=!0;for(let o of ml(e,n).split(`
`)){let e=/^\s*#(ifdef|ifndef|if|elif|else|endif)\b(.*)$/.exec(o);if(!e){a&&r.push(o);continue}let[,n,s]=e,c=i[i.length-1];if(n!==`if`&&n!==`ifdef`&&n!==`ifndef`&&!c)throw Error(`gfx: #${n} without #if`);switch(n){case`if`:case`ifdef`:case`ifndef`:{let e=n===`if`?vl(s,t):gl(t,s.trim())===(n===`ifdef`);i.push({parent:a,taken:a&&e}),a&&=e;break}case`elif`:a=c.parent&&!c.taken&&vl(s,t),c.taken||=a;break;case`else`:a=c.parent&&!c.taken,c.taken=!0;break;case`endif`:a=i.pop().parent}}if(i.length)throw Error(`gfx: #if without #endif`);let o=Object.keys(t).filter(e=>typeof t[e]!=`boolean`&&t[e]!=null);if(!o.length)return r.join(`
`);let s=RegExp(`\\b(${o.join(`|`)})\\b`,`g`);return r.map(e=>{let n=e.indexOf(`//`),r=n<0?e:e.slice(0,n);return r.replace(s,e=>String(t[e]))+e.slice(r.length)}).join(`
`)}var gl=(e,t)=>e[t]!==void 0&&e[t]!==null&&e[t]!==!1,_l=(e,t)=>{let n=e[t];return n===!0?1:typeof n==`number`?n:0};function vl(e,t){let n=e.match(/\|\||&&|[<>=!]=|[()<>!]|\w+(?:\.\d+)?/g)??[],r=0,i=()=>n[r],a=()=>n[r++],o=()=>{let e=s();for(;i()===`||`;)a(),e=s()||e;return e},s=()=>{let e=c();for(;i()===`&&`;)a(),e=c()&&e;return e},c=()=>{let e=l(),t=i();if(![`<`,`>`,`<=`,`>=`,`==`,`!=`].includes(t))return e;a();let n=l();switch(t){case`<`:return+(e<n);case`>`:return+(e>n);case`<=`:return+(e<=n);case`>=`:return+(e>=n);case`==`:return+(e===n);default:return+(e!==n)}},l=()=>i()===`!`?(a(),+!l()):u(),u=()=>{let n=a();if(n===`(`){let t=o();if(a()!==`)`)throw Error(`gfx: unbalanced #if ${e.trim()}`);return t}if(n===`defined`){let n=i()===`(`;n&&a();let r=+gl(t,a());if(n&&a()!==`)`)throw Error(`gfx: unbalanced #if ${e.trim()}`);return r}if(/^\d/.test(n??``))return Number(n);if(/^\w+$/.test(n??``))return _l(t,n);throw Error(`gfx: cannot read #if ${e.trim()}`)},d=o();if(r!==n.length)throw Error(`gfx: cannot read #if ${e.trim()}`);return d!==0}var yl=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler2DShadow;
`,bl=`// Constants and helpers every program shares.

#define PI 3.141592653589793
#define PI2 6.283185307179586
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#define saturate( a ) clamp( a, 0.0, 1.0 )

float pow2( const in float x ) { return x * x; }
vec3 pow2( const in vec3 x ) { return x * x; }
float pow4( const in float x ) { float x2 = x * x; return x2 * x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
  return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}

vec2 equirectUv( in vec3 dir ) {
  float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
  float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
  return vec2( u, v );
}

vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
  return RECIPROCAL_PI * diffuseColor;
}

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
  float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
  return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}

float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
  float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
  return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}

vec4 sRGBTransferOETF( in vec4 value ) {
  return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
`,xl=`// The cube-UV atlas a PMREMGenerator writes, and the roughness-to-mip lookup into it.
// Needs CUBEUV_TEXEL_WIDTH, CUBEUV_TEXEL_HEIGHT and CUBEUV_MAX_MIP defined.

#define cubeUV_minMipLevel 4.0
#define cubeUV_minTileSize 16.0

float getFace( vec3 direction ) {
  vec3 absDirection = abs( direction );
  float face = - 1.0;
  if ( absDirection.x > absDirection.z ) {
    if ( absDirection.x > absDirection.y ) face = direction.x > 0.0 ? 0.0 : 3.0;
    else face = direction.y > 0.0 ? 1.0 : 4.0;
  } else {
    if ( absDirection.z > absDirection.y ) face = direction.z > 0.0 ? 2.0 : 5.0;
    else face = direction.y > 0.0 ? 1.0 : 4.0;
  }
  return face;
}

vec2 getUV( vec3 direction, float face ) {
  vec2 uv;
  if ( face == 0.0 ) uv = vec2( direction.z, direction.y ) / abs( direction.x );
  else if ( face == 1.0 ) uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
  else if ( face == 2.0 ) uv = vec2( - direction.x, direction.y ) / abs( direction.z );
  else if ( face == 3.0 ) uv = vec2( - direction.z, direction.y ) / abs( direction.x );
  else if ( face == 4.0 ) uv = vec2( - direction.x, direction.z ) / abs( direction.y );
  else uv = vec2( direction.x, direction.y ) / abs( direction.z );
  return 0.5 * ( uv + 1.0 );
}

vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
  float face = getFace( direction );
  float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
  mipInt = max( mipInt, cubeUV_minMipLevel );
  float faceSize = exp2( mipInt );
  highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
  if ( face > 2.0 ) {
    uv.y += faceSize;
    face -= 3.0;
  }
  uv.x += face * faceSize;
  uv.x += filterInt * 3.0 * cubeUV_minTileSize;
  uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
  uv.x *= CUBEUV_TEXEL_WIDTH;
  uv.y *= CUBEUV_TEXEL_HEIGHT;
  return textureGrad( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
}

#define cubeUV_r0 1.0
#define cubeUV_m0 - 2.0
#define cubeUV_r1 0.8
#define cubeUV_m1 - 1.0
#define cubeUV_r4 0.4
#define cubeUV_m4 2.0
#define cubeUV_r5 0.305
#define cubeUV_m5 3.0
#define cubeUV_r6 0.21
#define cubeUV_m6 4.0

float roughnessToMip( float roughness ) {
  float mip = 0.0;
  if ( roughness >= cubeUV_r1 ) {
    mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
  } else if ( roughness >= cubeUV_r4 ) {
    mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
  } else if ( roughness >= cubeUV_r5 ) {
    mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
  } else if ( roughness >= cubeUV_r6 ) {
    mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
  } else {
    mip = - 2.0 * log2( 1.16 * roughness );
  }
  return mip;
}

vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
  float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
  float mipF = fract( mip );
  float mipInt = floor( mip );
  vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
  if ( mipF == 0.0 ) {
    return vec4( color0, 1.0 );
  } else {
    vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
    return vec4( mix( color0, color1, mipF ), 1.0 );
  }
}
`,Sl=`// Thin-film iridescence.
#ifdef USE_IRIDESCENCE
  const mat3 XYZ_TO_REC709 = mat3(
     3.2404542, -0.9692660,  0.0556434,
    -1.5371385,  1.8760108, -0.2040259,
    -0.4985314,  0.0415560,  1.0572252
  );

  vec3 Fresnel0ToIor( vec3 fresnel0 ) {
    vec3 sqrtF0 = sqrt( fresnel0 );
    return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
  }

  vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
    return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
  }

  float IorToFresnel0( float transmittedIor, float incidentIor ) {
    return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ) );
  }

  vec3 evalSensitivity( float OPD, vec3 shift ) {
    float phase = 2.0 * PI * OPD * 1.0e-9;
    vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
    vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
    vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
    vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
    xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
    xyz /= 1.0685e-7;
    vec3 rgb = XYZ_TO_REC709 * xyz;
    return rgb;
  }

  vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
    vec3 I;
    float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
    float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
    float cosTheta2Sq = 1.0 - sinTheta2Sq;
    if ( cosTheta2Sq < 0.0 ) {
      return vec3( 1.0 );
    }
    float cosTheta2 = sqrt( cosTheta2Sq );
    float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
    float R12 = F_Schlick( R0, 1.0, cosTheta1 );
    float T121 = 1.0 - R12;
    float phi12 = 0.0;
    if ( iridescenceIOR < outsideIOR ) phi12 = PI;
    float phi21 = PI - phi12;
    vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );
    vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
    vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
    vec3 phi23 = vec3( 0.0 );
    if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
    if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
    if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
    float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
    vec3 phi = vec3( phi21 ) + phi23;
    vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
    vec3 r123 = sqrt( R123 );
    vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
    vec3 C0 = R12 + Rs;
    I = C0;
    vec3 Cm = Rs - T121;
    for ( int m = 1; m <= 2; ++ m ) {
      Cm *= r123;
      vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
      I += Cm * Sm;
    }
    return max( I, vec3( 0.0 ) );
  }
#endif
`,Cl=`// Linear to what the target stores: sRGB for the canvas, linear for anything read back.
#ifdef SRGB_OUTPUT
  vec4 linearToOutputTexel( vec4 value ) { return sRGBTransferOETF( value ); }
#else
  vec4 linearToOutputTexel( vec4 value ) { return value; }
#endif
`,wl=`// The physical BRDFs and how direct and image-based light are gathered through them.

struct PhysicalMaterial {
  vec3 diffuseColor;
  vec3 diffuseContribution;
  vec3 specularColor;
  vec3 specularColorBlended;
  float roughness;
  float metalness;
  float specularF90;
  vec2 dfg;
  vec3 multiScatteringCompensation;
  #ifdef USE_CLEARCOAT
    float clearcoat;
    float clearcoatRoughness;
    vec3 clearcoatF0;
    float clearcoatF90;
  #endif
  #ifdef USE_IRIDESCENCE
    float iridescence;
    float iridescenceIOR;
    float iridescenceThickness;
    vec3 iridescenceFresnel;
    vec3 iridescenceF0Dielectric;
    vec3 iridescenceF0Metallic;
  #endif
  #ifdef USE_SHEEN
    vec3 sheenColor;
    float sheenRoughness;
  #endif
  #ifdef IOR
    float ior;
  #endif
  #ifdef USE_TRANSMISSION
    float transmission;
    float transmissionAlpha;
    float thickness;
    float attenuationDistance;
    vec3 attenuationColor;
  #endif
};

vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3( 0.0 );

vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
  float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
  float x2 = x * x;
  float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
  return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}

float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
  float a2 = pow2( alpha );
  float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
  float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
  return 0.5 / max( gv + gl, EPSILON );
}

float D_GGX( const in float alpha, const in float dotNH ) {
  float a2 = pow2( alpha );
  float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
  return RECIPROCAL_PI * a2 / pow2( denom );
}

#ifdef USE_CLEARCOAT
  vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
    vec3 f0 = material.clearcoatF0;
    float f90 = material.clearcoatF90;
    float roughness = material.clearcoatRoughness;
    float alpha = pow2( roughness );
    vec3 halfDir = normalize( lightDir + viewDir );
    float dotNL = saturate( dot( normal, lightDir ) );
    float dotNV = saturate( dot( normal, viewDir ) );
    float dotNH = saturate( dot( normal, halfDir ) );
    float dotVH = saturate( dot( viewDir, halfDir ) );
    vec3 F = F_Schlick( f0, f90, dotVH );
    float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
    float D = D_GGX( alpha, dotNH );
    return F * ( V * D );
  }
#endif

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
  vec3 f0 = material.specularColorBlended;
  float f90 = material.specularF90;
  float roughness = material.roughness;
  float alpha = pow2( roughness );
  vec3 halfDir = normalize( lightDir + viewDir );
  float dotNL = saturate( dot( normal, lightDir ) );
  float dotNV = saturate( dot( normal, viewDir ) );
  float dotNH = saturate( dot( normal, halfDir ) );
  float dotVH = saturate( dot( viewDir, halfDir ) );
  vec3 F = F_Schlick( f0, f90, dotVH );
  #ifdef USE_IRIDESCENCE
    F = mix( F, material.iridescenceFresnel, material.iridescence );
  #endif
  float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
  float D = D_GGX( alpha, dotNH );
  return F * ( V * D );
}

#ifdef USE_SHEEN
  float D_Charlie( float roughness, float dotNH ) {
    float alpha = pow2( roughness );
    float invAlpha = 1.0 / alpha;
    float cos2h = dotNH * dotNH;
    float sin2h = max( 1.0 - cos2h, 0.0078125 );
    return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
  }

  float V_Neubelt( float dotNV, float dotNL ) {
    return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
  }

  vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
    vec3 halfDir = normalize( lightDir + viewDir );
    float dotNL = saturate( dot( normal, lightDir ) );
    float dotNV = saturate( dot( normal, viewDir ) );
    float dotNH = saturate( dot( normal, halfDir ) );
    float D = D_Charlie( sheenRoughness, dotNH );
    float V = V_Neubelt( dotNV, dotNL );
    return sheenColor * ( D * V );
  }
#endif

float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
  float dotNV = saturate( dot( normal, viewDir ) );
  float r2 = roughness * roughness;
  float rInv = 1.0 / ( roughness + 0.1 );
  float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
  float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
  float DG = exp( a * dotNV + b );
  return saturate( DG );
}

vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
  float dotNV = saturate( dot( normal, viewDir ) );
  vec2 fab = textureLod( dfgLUT, vec2( roughness, dotNV ), 0.0 ).rg;
  return specularColor * fab.x + specularF90 * fab.y;
}

#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
  vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
  vec3 Fr = specularColor;
#endif
  vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
  float Ess = fab.x + fab.y;
  float Ems = 1.0 - Ess;
  vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;
  vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
  singleScatter += FssEss;
  multiScatter += Fms * Ems;
}

void RE_Direct_Physical( const in vec3 lightDirection, const in vec3 lightColor, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  float dotNL = saturate( dot( geometryNormal, lightDirection ) );
  vec3 irradiance = dotNL * lightColor;
  #ifdef USE_CLEARCOAT
    float dotNLcc = saturate( dot( geometryClearcoatNormal, lightDirection ) );
    vec3 ccIrradiance = dotNLcc * lightColor;
    clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( lightDirection, geometryViewDir, geometryClearcoatNormal, material );
  #endif
  #ifdef USE_SHEEN
    sheenSpecularDirect += irradiance * BRDF_Sheen( lightDirection, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
    float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
    float sheenAlbedoL = IBLSheenBRDF( geometryNormal, lightDirection, material.sheenRoughness );
    float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
    irradiance *= sheenEnergyComp;
  #endif
  vec3 specularBRDF = BRDF_GGX( lightDirection, geometryViewDir, geometryNormal, material );
  reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
  vec3 halfDir = normalize( lightDirection + geometryViewDir );
  float dotVH = saturate( dot( geometryViewDir, halfDir ) );
  vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
  reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  vec3 singleScattering = vec3( 0.0 );
  vec3 multiScattering = vec3( 0.0 );
  #ifdef USE_IRIDESCENCE
    computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
  #else
    computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
  #endif
  vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
  #ifdef USE_SHEEN
    float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
    sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
    float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
    diffuse *= sheenEnergyComp;
  #endif
  reflectedLight.indirectDiffuse += diffuse;
}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  #ifdef USE_CLEARCOAT
    clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
  #endif
  #ifdef USE_SHEEN
    sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
  #endif
  vec3 singleScatteringDielectric = vec3( 0.0 );
  vec3 multiScatteringDielectric = vec3( 0.0 );
  vec3 singleScatteringMetallic = vec3( 0.0 );
  vec3 multiScatteringMetallic = vec3( 0.0 );
  #ifdef USE_IRIDESCENCE
    computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
    computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
  #else
    computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
    computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
  #endif
  vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
  vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
  vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
  vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
  vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
  vec3 indirectSpecular = radiance * singleScattering;
  indirectSpecular += multiScattering * cosineWeightedIrradiance;
  vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
  #ifdef USE_SHEEN
    float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
    float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
    indirectSpecular *= sheenEnergyComp;
    indirectDiffuse *= sheenEnergyComp;
  #endif
  reflectedLight.indirectSpecular += indirectSpecular;
  reflectedLight.indirectDiffuse += indirectDiffuse;
}
`,Tl=`// The PCF lookup into the key light's shadow map.
#if NUM_DIR_LIGHT_SHADOWS > 0
  uniform sampler2DShadow directionalShadowMap;
  uniform vec4 directionalShadowParams; // intensity, bias, radius, 0
  uniform vec2 directionalShadowMapSize;
  in vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

  float interleavedGradientNoise( vec2 position ) {
    return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
  }

  vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
    const float goldenAngle = 2.399963229728653;
    float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
    float theta = float( sampleIndex ) * goldenAngle + phi;
    return vec2( cos( theta ), sin( theta ) ) * r;
  }

  float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
    float shadow = 1.0;
    shadowCoord.xyz /= shadowCoord.w;
    shadowCoord.z += shadowBias;
    bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
    bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
    if ( frustumTest ) {
      vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
      float radius = shadowRadius * texelSize.x;
      float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
      shadow = (
        texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
        texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
        texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
        texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
        texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
      ) * 0.2;
    }
    return mix( 1.0, shadow, shadowIntensity );
  }

  float directionalShadow() {
    return getShadow( directionalShadowMap, directionalShadowMapSize, directionalShadowParams.x,
      directionalShadowParams.y, directionalShadowParams.z, vDirectionalShadowCoord[ 0 ] );
  }
#endif
`,El=`// The key light's shadow-map matrices, and the coordinates handed to the fragment stage.
#if NUM_DIR_LIGHT_SHADOWS > 0
  uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
  uniform float directionalShadowNormalBias[ NUM_DIR_LIGHT_SHADOWS ];
  out vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
#endif
`,Dl=`// The shadow-map coordinate of a vertex, nudged along its normal by the normal bias.
#if NUM_DIR_LIGHT_SHADOWS > 0
  #ifdef HAS_NORMAL
    vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
  #else
    vec3 shadowWorldNormal = vec3( 0.0 );
  #endif
  vec4 shadowWorldPosition;
  for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
    shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalShadowNormalBias[ i ], 0 );
    vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
  }
#endif
`,Ol=`// Transmission: the scene behind, refracted through the volume and blurred by roughness.
#ifdef USE_TRANSMISSION
  uniform vec2 transmissionSamplerSize;
  uniform sampler2D transmissionSamplerMap;

  float w0( float a ) { return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 ); }
  float w1( float a ) { return ( 1.0 / 6.0 ) * ( a * a * ( 3.0 * a - 6.0 ) + 4.0 ); }
  float w2( float a ) { return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 ); }
  float w3( float a ) { return ( 1.0 / 6.0 ) * ( a * a * a ); }
  float g0( float a ) { return w0( a ) + w1( a ); }
  float g1( float a ) { return w2( a ) + w3( a ); }
  float h0( float a ) { return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) ); }
  float h1( float a ) { return 1.0 + w3( a ) / ( w2( a ) + w3( a ) ); }

  vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
    uv = uv * texelSize.zw + 0.5;
    vec2 iuv = floor( uv );
    vec2 fuv = fract( uv );
    float g0x = g0( fuv.x );
    float g1x = g1( fuv.x );
    float h0x = h0( fuv.x );
    float h1x = h1( fuv.x );
    float h0y = h0( fuv.y );
    float h1y = h1( fuv.y );
    vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
    vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
    vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
    return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
      g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
  }

  vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
    vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
    vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
    vec2 fLodSizeInv = 1.0 / fLodSize;
    vec2 cLodSizeInv = 1.0 / cLodSize;
    vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
    vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
    return mix( fSample, cSample, fract( lod ) );
  }

  vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
    vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
    vec3 modelScale;
    modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
    modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
    modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
    return normalize( refractionVector ) * thickness * modelScale;
  }

  float applyIorToRoughness( const in float roughness, const in float ior ) {
    return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
  }

  vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
    float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
    return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
  }

  vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
    if ( isinf( attenuationDistance ) ) {
      return vec3( 1.0 );
    } else {
      vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
      vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );
      return transmittance;
    }
  }

  vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
    const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
    const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
    const in vec3 attenuationColor, const in float attenuationDistance ) {
    vec4 transmittedLight;
    vec3 transmittance;
    vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
    vec3 refractedRayExit = position + transmissionRay;
    vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
    vec2 refractionCoords = ndcPos.xy / ndcPos.w;
    refractionCoords += 1.0;
    refractionCoords /= 2.0;
    transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
    transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
    vec3 attenuatedColor = transmittance * transmittedLight.rgb;
    vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
    float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
    return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
  }
#endif
`,kl=`// MeshBasicMaterial and LineBasicMaterial: the colour, times the map and vertex colours.

#include <common>
#include <output>

uniform vec3 diffuse;
uniform float opacity;
#ifdef USE_MAP
  uniform sampler2D map;
  in vec2 vMapUv;
#endif
#ifdef USE_COLOR
  in vec4 vColor;
#endif
out highp vec4 pc_fragColor;
void main() {
  vec4 diffuseColor = vec4( diffuse, opacity );
  #ifdef USE_MAP
    diffuseColor *= texture( map, vMapUv );
  #endif
  #ifdef USE_COLOR
    diffuseColor *= vColor;
  #endif
  vec3 indirectDiffuse = vec3( 1.0 );
  indirectDiffuse *= diffuseColor.rgb;
  vec3 outgoingLight = indirectDiffuse;
  #ifdef OPAQUE
    diffuseColor.a = 1.0;
  #endif
  pc_fragColor = linearToOutputTexel( vec4( outgoingLight, diffuseColor.a ) );
}
`,Al=`// MeshBasicMaterial and LineBasicMaterial: the colour, times the map and vertex colours.

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
in vec3 position;
#ifdef USE_MAP
  in vec2 uv;
  uniform mat3 mapTransform;
  out vec2 vMapUv;
#endif
#ifdef USE_COLOR
  in vec3 color;
  out vec4 vColor;
#endif
void main() {
  #ifdef USE_MAP
    vMapUv = ( mapTransform * vec3( uv, 1 ) ).xy;
  #endif
  #ifdef USE_COLOR
    vColor = vec4( 1.0 );
    vColor.rgb *= color;
  #endif
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
}
`,jl=`// A hand-written ShaderMaterial's fragment stage, in the old-style dialect it is written in;
// glsl.js appends its body.

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
#define varying in
`,Ml=`// A hand-written ShaderMaterial's vertex stage: the standard inputs, declared ahead of
// its own body, which glsl.js appends.

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
in vec3 position;
in vec3 normal;
in vec2 uv;
#define varying out
`,Nl=`// Depth only, for the shadow map: the rasteriser writes it, so there is nothing to do here.

void main() {}
`,Pl=`// Depth only, for the shadow map.

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
in vec3 position;
void main() {
  gl_Position = projectionMatrix * ( modelViewMatrix * vec4( position, 1.0 ) );
}
`,Fl=`// The studio, sampled onto six cube faces laid out as the atlas wants them.

#include <common>

in vec3 vOutputDirection;
uniform sampler2D envMap;
out highp vec4 pc_fragColor;
void main() {
  vec3 outputDirection = normalize( vOutputDirection );
  vec2 uv = equirectUv( outputDirection );
  pc_fragColor = vec4( texture( envMap, uv ).rgb, 1.0 );
}
`,Il=`// GGX importance-sampled prefilter of one level of the atlas into the next.

#define GGX_SAMPLES 256
in vec3 vOutputDirection;
uniform sampler2D envMap;
uniform float roughness;
uniform float mipInt;
#include <cube_uv>
#define PI 3.14159265359

float radicalInverse_VdC( uint bits ) {
  bits = ( bits << 16u ) | ( bits >> 16u );
  bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
  bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
  bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
  bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
  return float( bits ) * 2.3283064365386963e-10;
}

vec2 hammersley( uint i, uint N ) {
  return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );
}

vec3 importanceSampleGGX_VNDF( vec2 Xi, vec3 V, float roughness ) {
  float alpha = roughness * roughness;
  vec3 T1 = vec3( 1.0, 0.0, 0.0 );
  vec3 T2 = cross( V, T1 );
  float r = sqrt( Xi.x );
  float phi = 2.0 * PI * Xi.y;
  float t1 = r * cos( phi );
  float t2 = r * sin( phi );
  float s = 0.5 * ( 1.0 + V.z );
  t2 = ( 1.0 - s ) * sqrt( 1.0 - t1 * t1 ) + s * t2;
  vec3 Nh = t1 * T1 + t2 * T2 + sqrt( max( 0.0, 1.0 - t1 * t1 - t2 * t2 ) ) * V;
  return normalize( vec3( alpha * Nh.x, alpha * Nh.y, max( 0.0, Nh.z ) ) );
}

out highp vec4 pc_fragColor;
void main() {
  vec3 N = normalize( vOutputDirection );
  vec3 V = N;
  vec3 prefilteredColor = vec3( 0.0 );
  float totalWeight = 0.0;
  if ( roughness < 0.001 ) {
    pc_fragColor = vec4( bilinearCubeUV( envMap, N, mipInt ), 1.0 );
    return;
  }
  vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
  vec3 tangent = normalize( cross( up, N ) );
  vec3 bitangent = cross( N, tangent );
  for ( uint i = 0u; i < uint( GGX_SAMPLES ); i ++ ) {
    vec2 Xi = hammersley( i, uint( GGX_SAMPLES ) );
    vec3 H_tangent = importanceSampleGGX_VNDF( Xi, vec3( 0.0, 0.0, 1.0 ), roughness );
    vec3 H = normalize( tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z );
    vec3 L = normalize( 2.0 * dot( V, H ) * H - V );
    float NdotL = max( dot( N, L ), 0.0 );
    if ( NdotL > 0.0 ) {
      vec3 sampleColor = bilinearCubeUV( envMap, L, mipInt );
      prefilteredColor += sampleColor * NdotL;
      totalWeight += NdotL;
    }
  }
  if ( totalWeight > 0.0 ) {
    prefilteredColor = prefilteredColor / totalWeight;
  }
  pc_fragColor = vec4( prefilteredColor, 1.0 );
}
`,Ll=`// The full-screen quads the PMREM passes draw, one per atlas face.

in vec3 position;
in vec3 outputDirection;
out vec3 vOutputDirection;
void main() {
  vOutputDirection = outputDirection;
  gl_Position = vec4( position, 1.0 );
}
`,Rl=`// ShadowMaterial: transparent except where the key light is blocked.

#include <common>
#include <output>

uniform vec3 color;
uniform float opacity;
uniform bool receiveShadow;
#include <shadow_pars_fragment>
out highp vec4 pc_fragColor;
float getShadowMask() {
  float shadow = 1.0;
  #if NUM_DIR_LIGHT_SHADOWS > 0
    shadow *= receiveShadow ? directionalShadow() : 1.0;
  #endif
  return shadow;
}
void main() {
  pc_fragColor = linearToOutputTexel( vec4( color, opacity * ( 1.0 - getShadowMask() ) ) );
}
`,zl=`// ShadowMaterial: transparent except where the key light is blocked.

#include <common>

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
in vec3 position;
in vec3 normal;
#include <shadow_pars_vertex>
void main() {
  vec3 transformedNormal = normalMatrix * vec3( normal );
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
  #if NUM_DIR_LIGHT_SHADOWS > 0
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  #endif
  #include <shadow_vertex>
}
`,Bl=`// A billboard: the colour, times the map.

#include <common>
#include <output>

uniform vec3 diffuse;
uniform float opacity;
#ifdef USE_MAP
  uniform sampler2D map;
  in vec2 vMapUv;
#endif
out highp vec4 pc_fragColor;
void main() {
  vec4 diffuseColor = vec4( diffuse, opacity );
  vec3 outgoingLight = vec3( 0.0 );
  #ifdef USE_MAP
    diffuseColor *= texture( map, vMapUv );
  #endif
  outgoingLight = diffuseColor.rgb;
  #ifdef OPAQUE
    diffuseColor.a = 1.0;
  #endif
  pc_fragColor = linearToOutputTexel( vec4( outgoingLight, diffuseColor.a ) );
}
`,Vl=`// A billboard: the quad is laid out in view space, so it always faces the camera.

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float rotation;
uniform vec2 center;
in vec3 position;
#ifdef USE_MAP
  in vec2 uv;
  uniform mat3 mapTransform;
  out vec2 vMapUv;
#endif
void main() {
  #ifdef USE_MAP
    vMapUv = ( mapTransform * vec3( uv, 1 ) ).xy;
  #endif
  vec4 mvPosition = modelViewMatrix[ 3 ];
  vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
  vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
  vec2 rotatedPosition;
  rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
  rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
  mvPosition.xy += rotatedPosition;
  gl_Position = projectionMatrix * mvPosition;
}
`,Hl=`// MeshStandardMaterial and MeshPhysicalMaterial: three.js r186's physically based model.

#ifdef PHYSICAL
  #define IOR
  #define USE_SPECULAR
#endif

#include <common>
#include <output>

uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform vec3 cameraPosition;
uniform bool isOrthographic;
uniform bool receiveShadow;

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
  uniform float ior;
#endif
#ifdef USE_SPECULAR
  uniform float specularIntensity;
  uniform vec3 specularColor;
#endif
#ifdef USE_CLEARCOAT
  uniform float clearcoat;
  uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
  uniform float iridescence;
  uniform float iridescenceIOR;
  uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
  uniform vec3 sheenColor;
  uniform float sheenRoughness;
#endif
#ifdef USE_TRANSMISSION
  uniform float transmission;
  uniform float thickness;
  uniform float attenuationDistance;
  uniform vec3 attenuationColor;
  in vec3 vWorldPosition;
#endif

in vec3 vViewPosition;
#ifndef FLAT_SHADED
  in vec3 vNormal;
#endif
#ifdef USE_COLOR
  in vec4 vColor;
#endif
#ifdef USE_MAP
  uniform sampler2D map;
  in vec2 vMapUv;
#endif
#ifdef USE_BUMPMAP
  uniform sampler2D bumpMap;
  uniform float bumpScale;
  in vec2 vBumpMapUv;

  vec2 dHdxy_fwd() {
    vec2 dSTdx = dFdx( vBumpMapUv );
    vec2 dSTdy = dFdy( vBumpMapUv );
    float Hll = bumpScale * texture( bumpMap, vBumpMapUv ).x;
    float dBx = bumpScale * texture( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
    float dBy = bumpScale * texture( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
    return vec2( dBx, dBy );
  }

  vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
    vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
    vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
    vec3 vN = surf_norm;
    vec3 R1 = cross( vSigmaY, vN );
    vec3 R2 = cross( vN, vSigmaX );
    float fDet = dot( vSigmaX, R1 ) * faceDirection;
    vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
    return normalize( abs( fDet ) * surf_norm - vGrad );
  }
#endif

uniform sampler2D dfgLUT;
uniform vec3 ambientLightColor;
#if NUM_DIR_LIGHTS > 0
  uniform vec3 directionalLightDirection[ NUM_DIR_LIGHTS ];
  uniform vec3 directionalLightColor[ NUM_DIR_LIGHTS ];
#endif
#if NUM_POINT_LIGHTS > 0
  uniform vec3 pointLightPosition[ NUM_POINT_LIGHTS ];
  uniform vec3 pointLightColor[ NUM_POINT_LIGHTS ];
  uniform float pointLightDistance[ NUM_POINT_LIGHTS ];
  uniform float pointLightDecay[ NUM_POINT_LIGHTS ];

  float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
    float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
    if ( cutoffDistance > 0.0 ) {
      distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
    }
    return distanceFalloff;
  }
#endif
#if NUM_HEMI_LIGHTS > 0
  uniform vec3 hemisphereLightDirection[ NUM_HEMI_LIGHTS ];
  uniform vec3 hemisphereLightSkyColor[ NUM_HEMI_LIGHTS ];
  uniform vec3 hemisphereLightGroundColor[ NUM_HEMI_LIGHTS ];
#endif

#ifdef USE_ENVMAP
  uniform sampler2D envMap;
  uniform float envMapIntensity;
  uniform mat3 envMapRotation;
  #include <cube_uv>

  vec3 getIBLIrradiance( const in vec3 normal ) {
    vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
    vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
    return PI * envMapColor.rgb * envMapIntensity;
  }

  vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
    vec3 reflectVec = reflect( - viewDir, normal );
    reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
    reflectVec = transformNormalByInverseViewMatrix( reflectVec, viewMatrix );
    vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
    return envMapColor.rgb * envMapIntensity;
  }
#endif

#include <iridescence>
#include <physical_lighting>
#include <transmission>
#include <shadow_pars_fragment>

out highp vec4 pc_fragColor;

void main() {
  vec4 diffuseColor = vec4( diffuse, opacity );
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  vec3 totalEmissiveRadiance = emissive;

  #ifdef USE_MAP
    diffuseColor *= texture( map, vMapUv );
  #endif
  #ifdef USE_COLOR
    diffuseColor *= vColor;
  #endif
  float roughnessFactor = roughness;
  float metalnessFactor = metalness;

  float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
  #ifdef FLAT_SHADED
    vec3 fdx = dFdx( vViewPosition );
    vec3 fdy = dFdy( vViewPosition );
    vec3 normal = normalize( cross( fdx, fdy ) );
  #else
    vec3 normal = normalize( vNormal );
    #ifdef DOUBLE_SIDED
      normal *= faceDirection;
    #endif
  #endif
  vec3 nonPerturbedNormal = normal;
  #ifdef USE_BUMPMAP
    normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
  #endif
  #ifdef USE_CLEARCOAT
    vec3 clearcoatNormal = nonPerturbedNormal;
  #endif

  PhysicalMaterial material;
  material.diffuseColor = diffuseColor.rgb;
  material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
  material.metalness = metalnessFactor;
  vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
  float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
  material.roughness = max( roughnessFactor, 0.0525 );
  material.roughness += geometryRoughness;
  material.roughness = min( material.roughness, 1.0 );
  #ifdef IOR
    material.ior = ior;
    float specularIntensityFactor = specularIntensity;
    vec3 specularColorFactor = specularColor;
    material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
    material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
    material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
  #else
    material.specularColor = vec3( 0.04 );
    material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
    material.specularF90 = 1.0;
  #endif
  #ifdef USE_CLEARCOAT
    material.clearcoat = clearcoat;
    material.clearcoatRoughness = clearcoatRoughness;
    material.clearcoatF0 = vec3( 0.04 );
    material.clearcoatF90 = 1.0;
    material.clearcoat = saturate( material.clearcoat );
    material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
    material.clearcoatRoughness += geometryRoughness;
    material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
  #endif
  #ifdef USE_IRIDESCENCE
    material.iridescence = iridescence;
    material.iridescenceIOR = iridescenceIOR;
    material.iridescenceThickness = iridescenceThicknessMaximum;
  #endif
  #ifdef USE_SHEEN
    material.sheenColor = sheenColor;
    material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
  #endif

  vec3 geometryPosition = - vViewPosition;
  vec3 geometryNormal = normal;
  vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
  vec3 geometryClearcoatNormal = vec3( 0.0 );
  #ifdef USE_CLEARCOAT
    geometryClearcoatNormal = clearcoatNormal;
  #endif

  #ifdef USE_IRIDESCENCE
    float dotNVi = saturate( dot( normal, geometryViewDir ) );
    if ( material.iridescenceThickness == 0.0 ) {
      material.iridescence = 0.0;
    } else {
      material.iridescence = saturate( material.iridescence );
    }
    if ( material.iridescence > 0.0 ) {
      vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
      vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
      material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
      material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
      material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
    }
  #endif

  float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
  material.dfg = textureLod( dfgLUT, vec2( material.roughness, dotNVms ), 0.0 ).rg;
  #if ( NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 )
    float EssMs = material.dfg.x + material.dfg.y;
    material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
  #endif

  #if NUM_POINT_LIGHTS > 0
    for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
      vec3 lVector = pointLightPosition[ i ] - geometryPosition;
      vec3 lightDirection = normalize( lVector );
      float lightDistance = length( lVector );
      vec3 lightColor = pointLightColor[ i ];
      lightColor *= getDistanceAttenuation( lightDistance, pointLightDistance[ i ], pointLightDecay[ i ] );
      RE_Direct_Physical( lightDirection, lightColor, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
    }
  #endif

  #if NUM_DIR_LIGHTS > 0
    for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
      vec3 lightColor = directionalLightColor[ i ];
      #if NUM_DIR_LIGHT_SHADOWS > 0
        if ( i == 0 ) lightColor *= receiveShadow ? directionalShadow() : 1.0;
      #endif
      RE_Direct_Physical( directionalLightDirection[ i ], lightColor, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
    }
  #endif

  vec3 iblIrradiance = vec3( 0.0 );
  vec3 irradiance = ambientLightColor;
  #if NUM_HEMI_LIGHTS > 0
    for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
      float dotNL = dot( geometryNormal, hemisphereLightDirection[ i ] );
      float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
      irradiance += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );
    }
  #endif

  vec3 radiance = vec3( 0.0 );
  vec3 clearcoatRadiance = vec3( 0.0 );
  #ifdef USE_ENVMAP
    iblIrradiance += getIBLIrradiance( geometryNormal );
    radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
    #ifdef USE_CLEARCOAT
      clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
    #endif
  #endif

  RE_IndirectDiffuse_Physical( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
  RE_IndirectSpecular_Physical( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

  vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
  vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

  #ifdef USE_TRANSMISSION
    material.transmission = transmission;
    material.transmissionAlpha = 1.0;
    material.thickness = thickness;
    material.attenuationDistance = attenuationDistance;
    material.attenuationColor = attenuationColor;
    vec3 pos = vWorldPosition;
    vec3 v = normalize( cameraPosition - pos );
    vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
    vec4 transmitted = getIBLVolumeRefraction(
      n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
      pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
      material.attenuationColor, material.attenuationDistance );
    material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
    totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
  #endif

  vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
  #ifdef USE_SHEEN
    outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
  #endif
  #ifdef USE_CLEARCOAT
    float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
    vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
    outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
  #endif

  #ifdef OPAQUE
    diffuseColor.a = 1.0;
  #endif
  #ifdef USE_TRANSMISSION
    diffuseColor.a *= material.transmissionAlpha;
  #endif
  pc_fragColor = linearToOutputTexel( vec4( outgoingLight, diffuseColor.a ) );
}
`,Ul=`// MeshStandardMaterial and MeshPhysicalMaterial.

#include <common>

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;

in vec3 position;
in vec3 normal;
#if defined( USE_MAP ) || defined( USE_BUMPMAP )
  in vec2 uv;
#endif
#ifdef USE_COLOR
  in vec3 color;
  out vec4 vColor;
#endif
#ifdef USE_MAP
  uniform mat3 mapTransform;
  out vec2 vMapUv;
#endif
#ifdef USE_BUMPMAP
  uniform mat3 bumpMapTransform;
  out vec2 vBumpMapUv;
#endif
#ifndef FLAT_SHADED
  out vec3 vNormal;
#endif
#ifdef USE_TRANSMISSION
  out vec3 vWorldPosition;
#endif
out vec3 vViewPosition;
#include <shadow_pars_vertex>

void main() {
  #ifdef USE_MAP
    vMapUv = ( mapTransform * vec3( uv, 1 ) ).xy;
  #endif
  #ifdef USE_BUMPMAP
    vBumpMapUv = ( bumpMapTransform * vec3( uv, 1 ) ).xy;
  #endif
  #ifdef USE_COLOR
    vColor = vec4( 1.0 );
    vColor.rgb *= color;
  #endif

  vec3 objectNormal = vec3( normal );
  vec3 transformedNormal = objectNormal;
  transformedNormal = normalMatrix * transformedNormal;
  #ifdef FLIP_SIDED
    transformedNormal = - transformedNormal;
  #endif
  #ifndef FLAT_SHADED
    vNormal = normalize( transformedNormal );
  #endif

  vec3 transformed = vec3( position );
  vec4 mvPosition = vec4( transformed, 1.0 );
  mvPosition = modelViewMatrix * mvPosition;
  gl_Position = projectionMatrix * mvPosition;

  vViewPosition = - mvPosition.xyz;

  #if defined( USE_ENVMAP ) || defined( USE_SHADOWMAP ) || defined( USE_TRANSMISSION )
    vec4 worldPosition = vec4( transformed, 1.0 );
    worldPosition = modelMatrix * worldPosition;
  #endif
  #include <shadow_vertex>
  #ifdef USE_TRANSMISSION
    vWorldPosition = worldPosition.xyz;
  #endif
}
`,Wl={common:bl,cube_uv:xl,iridescence:Sl,output:Cl,physical_lighting:wl,shadow_pars_fragment:Tl,shadow_pars_vertex:El,shadow_vertex:Dl,transmission:Ol},Z=(e,t)=>yl+e+ml(t,Wl),Gl=e=>Object.entries(e).filter(([,e])=>e).map(([e])=>`#define ${e}\n`).join(``),Kl=e=>({OPAQUE:e.opaque,SRGB_OUTPUT:e.output===`srgb`});function ql(e){return`#define CUBEUV_TEXEL_WIDTH ${e.texelWidth}\n#define CUBEUV_TEXEL_HEIGHT ${e.texelHeight}\n#define CUBEUV_MAX_MIP ${e.maxMip}.0\n`}function Jl(e){return Gl({SRGB_OUTPUT:e.output===`srgb`,PHYSICAL:e.physical,USE_MAP:e.map,USE_BUMPMAP:e.bumpMap,USE_COLOR:e.vertexColors,FLAT_SHADED:e.flat,DOUBLE_SIDED:e.doubleSided,FLIP_SIDED:e.flipSided,USE_ENVMAP:e.envMap,USE_CLEARCOAT:e.clearcoat,USE_SHEEN:e.sheen,USE_IRIDESCENCE:e.iridescence,USE_TRANSMISSION:e.transmission,USE_SHADOWMAP:e.numDirShadows>0,OPAQUE:e.opaque,HAS_NORMAL:e.hasNormal})+`#define NUM_DIR_LIGHTS ${e.numDir}\n#define NUM_POINT_LIGHTS ${e.numPoint}\n#define NUM_HEMI_LIGHTS ${e.numHemi}\n#define NUM_DIR_LIGHT_SHADOWS ${e.numDirShadows}\n`+(e.envMap?ql(e.env):``)}function Yl(e,t){switch(e.kind){case`standard`:{let t=Jl(e);return[Z(t,Ul),Z(t,Hl)]}case`basic`:{let t={USE_MAP:e.map,USE_COLOR:e.vertexColors};return[Z(Gl(t),Al),Z(Gl({...t,...Kl(e)}),kl)]}case`sprite`:{let t={USE_MAP:e.map};return[Z(Gl(t),Vl),Z(Gl({...t,...Kl(e)}),Bl)]}case`shadow`:{let t=Jl({...e,envMap:!1});return[Z(t,zl),Z(t,Rl)]}case`depth`:return[Z(``,Pl),Z(``,Nl)];case`custom`:return[Z(``,Ml)+t.glsl.vertex+`
`,Z(``,jl)+t.glsl.fragment+`
`];default:throw Error(`gfx: no GLSL for ${e.kind}`)}}var Xl=()=>[Z(``,Ll),Z(``,Fl)],Zl=e=>[Z(``,Ll),Z(ql(e),Il)],Ql=[`position`,`normal`,`uv`,`color`,`outputDirection`],$l=class{constructor(e){let t=e.getContext(`webgl2`,{alpha:!0,depth:!0,stencil:!1,antialias:!0,premultipliedAlpha:!0,preserveDrawingBuffer:!0,powerPreference:`default`});if(!t)throw Error(`WebGL 2 is not available`);this.gl=t,this.canvas=e,this.isWebGL=!0,t.getExtension(`EXT_color_buffer_float`),t.getExtension(`EXT_color_buffer_half_float`),this.anisotropy=t.getExtension(`EXT_texture_filter_anisotropic`),this.maxAnisotropy=this.anisotropy?t.getParameter(this.anisotropy.MAX_TEXTURE_MAX_ANISOTROPY_EXT):1,this.programs=new Map,this.buffers=new WeakMap,this.textures=new WeakMap,this.vao=t.createVertexArray(),t.bindVertexArray(this.vao),this.width=e.width,this.height=e.height,this.transmission=null,this.shadowMap=null,this.dfg=this._dfgTexture(),this.pass=null,t.depthFunc(t.LEQUAL)}setSize(e,t){this.width=e,this.height=t}beginFrame(){}endFrame(){}beginPass({target:e,clear:t,frame:n}){let r=this.gl;if(e===`canvas`)r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,this.width,this.height);else{let e=this._transmissionTarget();r.bindFramebuffer(r.FRAMEBUFFER,e.msaaFramebuffer),r.viewport(0,0,e.width,e.height)}r.colorMask(!0,!0,!0,!0),r.depthMask(!0),r.clearColor(t[0],t[1],t[2],t[3]),r.clearDepth(1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),this.pass={target:e,frame:n}}beginShadowPass(e,t){let n=this.gl,r=this._shadowTarget(t);return n.bindFramebuffer(n.FRAMEBUFFER,r.framebuffer),n.viewport(0,0,t[0],t[1]),n.depthMask(!0),n.clearDepth(1),n.clear(n.DEPTH_BUFFER_BIT),n.disable(n.BLEND),this.pass={target:`shadow`},r}endPass(){let e=this.gl;if(this.pass?.target===`transmission`){let t=this.transmission;e.bindFramebuffer(e.READ_FRAMEBUFFER,t.msaaFramebuffer),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,t.resolveFramebuffer),e.blitFramebuffer(0,0,t.width,t.height,0,0,t.width,t.height,e.COLOR_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,t.texture),e.generateMipmap(e.TEXTURE_2D)}this.pass=null}draw(e){let t=this.gl,n=this.pass.frame,r=this._program(e.key,e.material);t.useProgram(r.handle),this._state(e.state);let i=r.uniforms;i.set(`modelMatrix`,e.object.modelMatrix,`m4`),i.set(`modelViewMatrix`,e.object.modelViewMatrix,`m4`),i.set(`normalMatrix`,e.object.normalMatrix,`m3`),i.set(`projectionMatrix`,n.camera.projectionMatrix,`m4`),i.set(`viewMatrix`,n.camera.viewMatrix,`m4`),i.set(`cameraPosition`,n.camera.position,`v3`),i.set(`isOrthographic`,+!!n.camera.isOrthographic,`i`);let a=e.textures.map?this._texture(e.textures.map):null,o=e.textures.bumpMap?this._texture(e.textures.bumpMap):null,s=0,c=(e,n)=>{i.has(e)&&(t.activeTexture(t.TEXTURE0+s),t.bindTexture(t.TEXTURE_2D,n),i.set(e,s,`i`),s++)};if(e.key.kind===`custom`)for(let[t,{value:n}]of Object.entries(e.material.uniforms))typeof n==`number`?i.set(t,n,`f`):n.isColor?i.set(t,[n.r,n.g,n.b],`v3`):n.isVector3?i.set(t,[n.x,n.y,n.z],`v3`):n.isVector2?i.set(t,[n.x,n.y],`v2`):n.isMatrix4&&i.set(t,n.elements,`m4`);else{for(let[t,n]of Object.entries(e.params))i.set(t,n,tu(n));this._lights(i,n),a&&c(`map`,a),o&&c(`bumpMap`,o),n.env&&e.key.envMap&&c(`envMap`,n.env.gpu.texture),c(`dfgLUT`,this.dfg),n.shadow&&i.has(`directionalShadowMap`)&&(c(`directionalShadowMap`,n.shadow.texture.texture),i.set(`directionalShadowMatrix[0]`,n.shadow.matrix,`m4`),i.set(`directionalShadowNormalBias[0]`,n.shadow.normalBias,`f`),i.set(`directionalShadowParams`,[n.shadow.intensity,n.shadow.bias,n.shadow.radius,0],`v4`),i.set(`directionalShadowMapSize`,n.shadow.mapSize,`v2`)),n.transmission&&i.has(`transmissionSamplerMap`)&&(c(`transmissionSamplerMap`,this.transmission.texture),i.set(`transmissionSamplerSize`,n.transmission.size,`v2`))}this._attributes(r,e.geometry),this._submit(e.geometry,e.topology,e.start,e.count)}drawDepth(e){let t=this.gl,n=this._program({kind:`depth`});t.useProgram(n.handle),this._state({blending:`none`,depthTest:!0,depthWrite:!0,colorWrite:!1,cull:e.cull}),n.uniforms.set(`modelViewMatrix`,e.modelViewMatrix,`m4`),n.uniforms.set(`projectionMatrix`,e.projectionMatrix,`m4`),this._attributes(n,e.geometry),this._submit(e.geometry,e.topology,e.start,e.count)}_submit(e,t,n,r){let i=this.gl,a=t===`lines`?i.LINES:t===`line-strip`?i.LINE_STRIP:i.TRIANGLES,o=e.index;if(o!==null){let e=this._buffer(o,i.ELEMENT_ARRAY_BUFFER);i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e);let t=o.array.BYTES_PER_ELEMENT;i.drawElements(a,r,t===4?i.UNSIGNED_INT:i.UNSIGNED_SHORT,n*t)}else i.drawArrays(a,n,r)}_state({blending:e,depthTest:t,depthWrite:n,colorWrite:r,cull:i}){let a=this.gl;e===`none`?a.disable(a.BLEND):(a.enable(a.BLEND),a.blendEquation(a.FUNC_ADD),e===`additive`?a.blendFuncSeparate(a.SRC_ALPHA,a.ONE,a.ONE,a.ONE):a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA)),t?a.enable(a.DEPTH_TEST):a.disable(a.DEPTH_TEST),a.depthMask(n),a.colorMask(r,r,r,r),i===`none`?a.disable(a.CULL_FACE):(a.enable(a.CULL_FACE),a.cullFace(a.BACK),a.frontFace(i===`front`?a.CW:a.CCW))}_lights(e,t){e.set(`ambientLightColor`,t.ambient,`v3`),t.directional.forEach((t,n)=>{e.set(`directionalLightDirection[${n}]`,t.direction,`v3`),e.set(`directionalLightColor[${n}]`,t.color,`v3`)}),t.point.forEach((t,n)=>{e.set(`pointLightPosition[${n}]`,t.position,`v3`),e.set(`pointLightColor[${n}]`,t.color,`v3`),e.set(`pointLightDistance[${n}]`,t.distance,`f`),e.set(`pointLightDecay[${n}]`,t.decay,`f`)}),t.hemi.forEach((t,n)=>{e.set(`hemisphereLightDirection[${n}]`,t.direction,`v3`),e.set(`hemisphereLightSkyColor[${n}]`,t.skyColor,`v3`),e.set(`hemisphereLightGroundColor[${n}]`,t.groundColor,`v3`)})}_attributes(e,t){let n=this.gl;for(let r=0;r<Ql.length;r++){let i=e.attributes[r]?t.attributes[Ql[r]]:void 0;if(i===void 0){n.disableVertexAttribArray(r);continue}n.bindBuffer(n.ARRAY_BUFFER,this._buffer(i,n.ARRAY_BUFFER)),n.enableVertexAttribArray(r),n.vertexAttribPointer(r,i.itemSize,n.FLOAT,i.normalized,0,0)}}_program(e,t){let n=fl(e)+(e.kind===`custom`?`#${t.version}`:``),r=this.programs.get(n);if(r)return r;let i=this.gl,[a,o]=Yl(e,t),s=i.createProgram(),c=(e,t)=>{let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),i.attachShader(s,n),n},l=c(i.VERTEX_SHADER,a),u=c(i.FRAGMENT_SHADER,o);if(Ql.forEach((e,t)=>i.bindAttribLocation(s,t,e)),i.linkProgram(s),!i.getProgramParameter(s,i.LINK_STATUS)){let t=[i.getShaderInfoLog(l),i.getShaderInfoLog(u),i.getProgramInfoLog(s)].filter(Boolean).join(`
`);throw Error(`gfx: ${e.kind} program failed to link\n${t}`)}return r={handle:s,attributes:Ql.map(e=>i.getAttribLocation(s,e)!==-1),uniforms:new nu(i,s)},this.programs.set(n,r),r}syncGeometry(e){let t=this.gl;for(let n of Ql){let r=e.attributes[n];r&&this._buffer(r,t.ARRAY_BUFFER,!0)}}_buffer(e,t,n=!1){let r=this.gl,i=this.buffers.get(e);if(i||(i={buffer:r.createBuffer(),version:-1,byteLength:0},this.buffers.set(e,i)),i.version!==e.version&&(n||i.version===-1||t===r.ELEMENT_ARRAY_BUFFER)){let n=e.array instanceof Float64Array?new Float32Array(e.array):e.array;r.bindBuffer(t,i.buffer),i.byteLength===n.byteLength?r.bufferSubData(t,0,n):r.bufferData(t,n,i.version===-1?r.STATIC_DRAW:r.DYNAMIC_DRAW),i.byteLength=n.byteLength,i.version=e.version}return i.buffer}_texture(e){let t=this.gl,n=this.textures.get(e);if(n||(n={handle:t.createTexture(),version:-1},this.textures.set(e,n),e.addEventListener(`dispose`,()=>{t.deleteTexture(n.handle),this.textures.delete(e)})),n.version!==e.version&&e.image){let r=e.image,i=e.generateMipmaps&&e.minFilter===1008,a=i?Math.floor(Math.log2(Math.max(r.width,r.height)))+1:1;n.handle&&n.version!==-1&&(t.deleteTexture(n.handle),n.handle=t.createTexture()),t.bindTexture(t.TEXTURE_2D,n.handle),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,e.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,e.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.NONE);let o=e.colorSpace===`srgb`?t.SRGB8_ALPHA8:t.RGBA8;t.texStorage2D(t.TEXTURE_2D,a,o,r.width,r.height),t.texSubImage2D(t.TEXTURE_2D,0,0,0,t.RGBA,t.UNSIGNED_BYTE,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,i?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),this.anisotropy&&e.anisotropy>1&&t.texParameterf(t.TEXTURE_2D,this.anisotropy.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(e.anisotropy,this.maxAnisotropy)),i&&t.generateMipmap(t.TEXTURE_2D),n.version=e.version}return n.handle}_dfgTexture(){let e=this.gl,t=e.createTexture();return e.bindTexture(e.TEXTURE_2D,t),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texImage2D(e.TEXTURE_2D,0,e.RG16F,16,16,0,e.RG,e.HALF_FLOAT,pl),eu(e,!1),t}_transmissionTarget(){let e=this.gl,t=this.width,n=this.height,r=this.transmission;if(r&&r.width===t&&r.height===n)return r;r&&(e.deleteTexture(r.texture),e.deleteRenderbuffer(r.color),e.deleteRenderbuffer(r.depth),e.deleteFramebuffer(r.msaaFramebuffer),e.deleteFramebuffer(r.resolveFramebuffer));let i=Math.floor(Math.log2(Math.max(t,n)))+1,a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texStorage2D(e.TEXTURE_2D,i,e.RGBA16F,t,n),eu(e,!0);let o=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,o),e.renderbufferStorageMultisample(e.RENDERBUFFER,4,e.RGBA16F,t,n);let s=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,s),e.renderbufferStorageMultisample(e.RENDERBUFFER,4,e.DEPTH_COMPONENT24,t,n);let c=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,o),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,s);let l=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.bindFramebuffer(e.FRAMEBUFFER,null),r={width:t,height:n,texture:a,color:o,depth:s,msaaFramebuffer:c,resolveFramebuffer:l},this.transmission=r,r}_shadowTarget([e,t]){let n=this.gl;if(this.shadowMap&&this.shadowMap.width===e&&this.shadowMap.height===t)return this.shadowMap;let r=n.createTexture();n.bindTexture(n.TEXTURE_2D,r),n.texStorage2D(n.TEXTURE_2D,1,n.DEPTH_COMPONENT24,e,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_COMPARE_FUNC,n.LEQUAL),eu(n,!1);let i=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,i),n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,r,0),n.drawBuffers([n.NONE]),n.readBuffer(n.NONE),n.bindFramebuffer(n.FRAMEBUFFER,null),this.shadowMap={width:e,height:t,texture:r,framebuffer:i},this.shadowMap}prefilterEquirectangular(e){let t=this.gl,n=Kc(e.image.width),r=qc(n.lodMax),i=()=>{let e=t.createTexture();t.bindTexture(t.TEXTURE_2D,e),t.texStorage2D(t.TEXTURE_2D,1,t.RGBA16F,n.width,n.height),eu(t,!1);let r=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),{texture:e,framebuffer:r}},a=i(),o=i(),s=([e,n])=>{let r=t.createProgram();for(let[i,a]of[[t.VERTEX_SHADER,e],[t.FRAGMENT_SHADER,n]]){let e=t.createShader(i);if(t.shaderSource(e,a),t.compileShader(e),!t.getShaderParameter(e,t.COMPILE_STATUS))throw Error(t.getShaderInfoLog(e));t.attachShader(r,e)}return Ql.forEach((e,n)=>t.bindAttribLocation(r,n,e)),t.linkProgram(r),{handle:r,uniforms:new nu(t,r)}},c=s(Xl()),l=s(Zl(n)),u=e=>{let n=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,n),t.bufferData(t.ARRAY_BUFFER,e.position,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,0,0);let r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r),t.bufferData(t.ARRAY_BUFFER,e.outputDirection,t.STATIC_DRAW),t.enableVertexAttribArray(4),t.vertexAttribPointer(4,3,t.FLOAT,!1,0,0);for(let e of[1,2,3])t.disableVertexAttribArray(e);t.drawArrays(t.TRIANGLES,0,36),t.disableVertexAttribArray(4),t.deleteBuffer(n),t.deleteBuffer(r)};t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.depthMask(!1),t.colorMask(!0,!0,!0,!0),t.enable(t.SCISSOR_TEST);let d=e=>{t.viewport(e[0],e[1],e[2],e[3]),t.scissor(e[0],e[1],e[2],e[3])};t.bindFramebuffer(t.FRAMEBUFFER,a.framebuffer),d([0,0,3*n.cubeSize,2*n.cubeSize]),t.useProgram(c.handle),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this._texture(e)),c.uniforms.set(`envMap`,0,`i`),u(r[0]),t.useProgram(l.handle),l.uniforms.set(`envMap`,0,`i`);for(let e of Jc(n,r)){let n=e.source===`atlas`?a:o,i=e.target===`atlas`?a:o;t.bindFramebuffer(t.FRAMEBUFFER,i.framebuffer),d(e.viewport),t.bindTexture(t.TEXTURE_2D,n.texture),l.uniforms.set(`roughness`,e.roughness,`f`),l.uniforms.set(`mipInt`,e.mipInt,`f`),u(r[e.plane])}return t.disable(t.SCISSOR_TEST),t.depthMask(!0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(a.framebuffer),t.deleteFramebuffer(o.framebuffer),t.deleteTexture(o.texture),t.deleteProgram(c.handle),t.deleteProgram(l.handle),{isCubeUVTexture:!0,texelWidth:n.texelWidth,texelHeight:n.texelHeight,maxMip:n.maxMip,gpu:{texture:a.texture},dispose:()=>t.deleteTexture(a.texture)}}};function eu(e,t){e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t?e.LINEAR_MIPMAP_LINEAR:e.LINEAR)}function tu(e){if(typeof e==`number`)return`f`;switch(e.length){case 2:return`v2`;case 3:return`v3`;case 4:return`v4`;case 9:return`m3`;case 16:return`m4`;default:throw Error(`gfx: unexpected uniform value`)}}var nu=class{constructor(e,t){this.gl=e,this.program=t,this.locations=new Map}location(e){let t=this.locations.get(e);return t===void 0&&(t=this.gl.getUniformLocation(this.program,e),this.locations.set(e,t)),t}has(e){return this.location(e)!==null}set(e,t,n){let r=this.location(e);if(r===null)return;let i=this.gl;switch(n){case`f`:i.uniform1f(r,t);break;case`i`:i.uniform1i(r,t);break;case`v2`:i.uniform2fv(r,t);break;case`v3`:i.uniform3fv(r,t);break;case`v4`:i.uniform4fv(r,t);break;case`m3`:i.uniformMatrix3fv(r,!1,t);break;case`m4`:i.uniformMatrix4fv(r,!1,t)}}},ru=`// Group 0 is the pass, group 1 the draw.
@group(0) @binding(0) var<uniform> u_frame: Frame;
@group(0) @binding(1) var t_dfg: texture_2d<f32>;
@group(0) @binding(2) var s_linear: sampler;
@group(0) @binding(3) var t_env: texture_2d<f32>;
@group(0) @binding(4) var t_shadow: texture_depth_2d;
@group(0) @binding(5) var s_shadow: sampler_comparison;
@group(0) @binding(6) var t_transmission: texture_2d<f32>;
@group(0) @binding(7) var s_trilinear: sampler;
@group(1) @binding(0) var<uniform> u_draw: Draw;
@group(1) @binding(1) var t_map: texture_2d<f32>;
@group(1) @binding(2) var s_map: sampler;
@group(1) @binding(3) var t_bump: texture_2d<f32>;
@group(1) @binding(4) var s_bump: sampler;
`,iu=`// Bump mapping: the normal tilted by the slope of the height map.

fn dHdxy_fwd(bumpMapUv: vec2f) -> vec2f {
  let dSTdx = dpdx(bumpMapUv);
  let dSTdy = dFdy2(bumpMapUv);
  let Hll = u_draw.bumpScale * textureSample(t_bump, s_bump, bumpMapUv).x;
  let dBx = u_draw.bumpScale * textureSample(t_bump, s_bump, bumpMapUv + dSTdx).x - Hll;
  let dBy = u_draw.bumpScale * textureSample(t_bump, s_bump, bumpMapUv + dSTdy).x - Hll;
  return vec2f(dBx, dBy);
}

fn perturbNormalArb(surf_pos: vec3f, surf_norm: vec3f, dHdxy: vec2f, faceDirection: f32) -> vec3f {
  let vSigmaX = normalize(dpdx(surf_pos));
  let vSigmaY = normalize(dFdy3(surf_pos));
  let vN = surf_norm;
  let R1 = cross(vSigmaY, vN);
  let R2 = cross(vN, vSigmaX);
  let fDet = dot(vSigmaX, R1) * faceDirection;
  let vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
  return normalize(abs(fDet) * surf_norm - vGrad);
}
`,au=`// Constants and helpers every built-in material shares.

const PI = 3.141592653589793;
const PI2 = 6.283185307179586;
const RECIPROCAL_PI = 0.3183098861837907;
const RECIPROCAL_PI2 = 0.15915494309189535;
const EPSILON = 1e-6;

fn saturate1(a: f32) -> f32 { return clamp(a, 0.0, 1.0); }
fn pow2(x: f32) -> f32 { return x * x; }
fn pow2v(x: vec3f) -> vec3f { return x * x; }
fn pow4(x: f32) -> f32 { let x2 = x * x; return x2 * x2; }
fn max3(v: vec3f) -> f32 { return max(max(v.x, v.y), v.z); }

/** GLSL's dFdy: WebGPU's y derivative, pointed back up. */
fn dFdy3(v: vec3f) -> vec3f { return dpdy(v) * u_frame.derivYSign; }
fn dFdy2(v: vec2f) -> vec2f { return dpdy(v) * u_frame.derivYSign; }

/** GLSL's gl_FragCoord, from WebGPU's framebuffer position. */
fn glFragCoord(position: vec4f) -> vec2f {
  return vec2f(position.x, select(u_frame.viewportHeight - position.y, position.y, u_frame.fragYFlip > 0.5));
}

fn transformNormalByInverseViewMatrix(normal: vec3f, viewMatrix: mat4x4f) -> vec3f {
  return normalize((vec4f(normal, 0.0) * viewMatrix).xyz);
}

fn BRDF_Lambert(diffuseColor: vec3f) -> vec3f {
  return RECIPROCAL_PI * diffuseColor;
}

fn F_Schlick(f0: vec3f, f90: f32, dotVH: f32) -> vec3f {
  let fresnel = exp2((-5.55473 * dotVH - 6.98316) * dotVH);
  return f0 * (1.0 - fresnel) + (f90 * fresnel);
}

fn F_Schlick1(f0: f32, f90: f32, dotVH: f32) -> f32 {
  let fresnel = exp2((-5.55473 * dotVH - 6.98316) * dotVH);
  return f0 * (1.0 - fresnel) + (f90 * fresnel);
}

fn sRGBTransferOETF(value: vec4f) -> vec4f {
  let low = vec3f(select(vec3f(0.0), vec3f(1.0), value.rgb <= vec3f(0.0031308)));
  return vec4f(mix(pow(value.rgb, vec3f(0.41666)) * 1.055 - vec3f(0.055), value.rgb * 12.92, low), value.a);
}
`,ou=`// The cube-UV atlas a PMREMGenerator writes, and the roughness-to-mip lookup into it.
// Needs CUBEUV_TEXEL_WIDTH, CUBEUV_TEXEL_HEIGHT and CUBEUV_MAX_MIP defined.

const cubeUV_minMipLevel = 4.0;
const cubeUV_minTileSize = 16.0;

fn getFace(direction: vec3f) -> f32 {
  let absDirection = abs(direction);
  var face = -1.0;
  if (absDirection.x > absDirection.z) {
    if (absDirection.x > absDirection.y) { face = select(3.0, 0.0, direction.x > 0.0); }
    else { face = select(4.0, 1.0, direction.y > 0.0); }
  } else {
    if (absDirection.z > absDirection.y) { face = select(5.0, 2.0, direction.z > 0.0); }
    else { face = select(4.0, 1.0, direction.y > 0.0); }
  }
  return face;
}

fn getUV(direction: vec3f, face: f32) -> vec2f {
  var uv: vec2f;
  if (face == 0.0) { uv = vec2f(direction.z, direction.y) / abs(direction.x); }
  else if (face == 1.0) { uv = vec2f(-direction.x, -direction.z) / abs(direction.y); }
  else if (face == 2.0) { uv = vec2f(-direction.x, direction.y) / abs(direction.z); }
  else if (face == 3.0) { uv = vec2f(-direction.z, direction.y) / abs(direction.x); }
  else if (face == 4.0) { uv = vec2f(-direction.x, direction.z) / abs(direction.y); }
  else { uv = vec2f(direction.x, direction.y) / abs(direction.z); }
  return 0.5 * (uv + 1.0);
}

fn bilinearCubeUV(envMap: texture_2d<f32>, direction: vec3f, mipIntIn: f32) -> vec3f {
  var face = getFace(direction);
  let filterInt = max(cubeUV_minMipLevel - mipIntIn, 0.0);
  let mipInt = max(mipIntIn, cubeUV_minMipLevel);
  let faceSize = exp2(mipInt);
  var uv = getUV(direction, face) * (faceSize - 2.0) + 1.0;
  if (face > 2.0) {
    uv.y += faceSize;
    face -= 3.0;
  }
  uv.x += face * faceSize;
  uv.x += filterInt * 3.0 * cubeUV_minTileSize;
  uv.y += 4.0 * (exp2(CUBEUV_MAX_MIP) - faceSize);
  uv.x *= CUBEUV_TEXEL_WIDTH;
  uv.y *= CUBEUV_TEXEL_HEIGHT;
  return textureSampleLevel(envMap, s_linear, uv, 0.0).rgb;
}

const cubeUV_r0 = 1.0;
const cubeUV_m0 = -2.0;
const cubeUV_r1 = 0.8;
const cubeUV_m1 = -1.0;
const cubeUV_r4 = 0.4;
const cubeUV_m4 = 2.0;
const cubeUV_r5 = 0.305;
const cubeUV_m5 = 3.0;
const cubeUV_r6 = 0.21;
const cubeUV_m6 = 4.0;

fn roughnessToMip(roughness: f32) -> f32 {
  var mip = 0.0;
  if (roughness >= cubeUV_r1) {
    mip = (cubeUV_r0 - roughness) * (cubeUV_m1 - cubeUV_m0) / (cubeUV_r0 - cubeUV_r1) + cubeUV_m0;
  } else if (roughness >= cubeUV_r4) {
    mip = (cubeUV_r1 - roughness) * (cubeUV_m4 - cubeUV_m1) / (cubeUV_r1 - cubeUV_r4) + cubeUV_m1;
  } else if (roughness >= cubeUV_r5) {
    mip = (cubeUV_r4 - roughness) * (cubeUV_m5 - cubeUV_m4) / (cubeUV_r4 - cubeUV_r5) + cubeUV_m4;
  } else if (roughness >= cubeUV_r6) {
    mip = (cubeUV_r5 - roughness) * (cubeUV_m6 - cubeUV_m5) / (cubeUV_r5 - cubeUV_r6) + cubeUV_m5;
  } else {
    mip = -2.0 * log2(1.16 * roughness);
  }
  return mip;
}

fn textureCubeUV(envMap: texture_2d<f32>, sampleDir: vec3f, roughness: f32) -> vec4f {
  let mip = clamp(roughnessToMip(roughness), cubeUV_m0, CUBEUV_MAX_MIP);
  let mipF = fract(mip);
  let mipInt = floor(mip);
  let color0 = bilinearCubeUV(envMap, sampleDir, mipInt);
  if (mipF == 0.0) {
    return vec4f(color0, 1.0);
  }
  let color1 = bilinearCubeUV(envMap, sampleDir, mipInt + 1.0);
  return vec4f(mix(color0, color1, mipF), 1.0);
}
`,su=`// Per-draw uniforms, shared by every built-in material. Offsets match \`packDraw\` in webgpu.js.
struct Draw {
  modelMatrix: mat4x4f,
  modelViewMatrix: mat4x4f,
  normalMatrix: mat3x3f,
  mapTransform: mat3x3f,
  bumpMapTransform: mat3x3f,
  diffuse: vec3f,
  opacity: f32,
  emissive: vec3f,
  roughness: f32,
  specularColor: vec3f,
  metalness: f32,
  sheenColor: vec3f,
  sheenRoughness: f32,
  attenuationColor: vec3f,
  attenuationDistance: f32,
  ior: f32,
  specularIntensity: f32,
  clearcoat: f32,
  clearcoatRoughness: f32,
  iridescence: f32,
  iridescenceIOR: f32,
  iridescenceThicknessMaximum: f32,
  transmission: f32,
  thickness: f32,
  bumpScale: f32,
  envMapIntensity: f32,
  receiveShadow: f32,
  center: vec2f,
  rotation: f32,
  attenuationFinite: f32,
  envMapRotation: mat3x3f,
};
`,cu=`// Per-pass uniforms. Offsets must match \`packFrame\` in webgpu.js.
struct Frame {
  viewMatrix: mat4x4f,
  projectionMatrix: mat4x4f,
  glProjectionMatrix: mat4x4f,
  shadowMatrix: mat4x4f,
  cameraPosition: vec3f,
  isOrthographic: f32,
  ambientLightColor: vec3f,
  derivYSign: f32,
  shadowParams: vec4f,
  shadowMapSize: vec2f,
  transmissionSamplerSize: vec2f,
  viewportHeight: f32,
  fragYFlip: f32,
  shadowNormalBias: f32,
  _pad: f32,
  dirLightDirection: array<vec4f, MAX_DIR_LIGHTS>,
  dirLightColor: array<vec4f, MAX_DIR_LIGHTS>,
  pointLightPosition: array<vec4f, MAX_POINT_LIGHTS>,
  pointLightColor: array<vec4f, MAX_POINT_LIGHTS>,
  hemiLightDirection: array<vec4f, MAX_HEMI_LIGHTS>,
  hemiLightSkyColor: array<vec4f, MAX_HEMI_LIGHTS>,
  hemiLightGroundColor: array<vec4f, MAX_HEMI_LIGHTS>,
};
`,lu=`// Thin-film iridescence.

const XYZ_TO_REC709 = mat3x3f(
   3.2404542, -0.9692660,  0.0556434,
  -1.5371385,  1.8760108, -0.2040259,
  -0.4985314,  0.0415560,  1.0572252
);

fn Fresnel0ToIor(fresnel0: vec3f) -> vec3f {
  let sqrtF0 = sqrt(fresnel0);
  return (vec3f(1.0) + sqrtF0) / (vec3f(1.0) - sqrtF0);
}

fn IorToFresnel0v(transmittedIor: vec3f, incidentIor: f32) -> vec3f {
  return pow2v((transmittedIor - vec3f(incidentIor)) / (transmittedIor + vec3f(incidentIor)));
}

fn IorToFresnel0(transmittedIor: f32, incidentIor: f32) -> f32 {
  return pow2((transmittedIor - incidentIor) / (transmittedIor + incidentIor));
}

fn evalSensitivity(OPD: f32, shift: vec3f) -> vec3f {
  let phase = 2.0 * PI * OPD * 1.0e-9;
  let val = vec3f(5.4856e-13, 4.4201e-13, 5.2481e-13);
  let pos = vec3f(1.6810e+06, 1.7953e+06, 2.2084e+06);
  let vr = vec3f(4.3278e+09, 9.3046e+09, 6.6121e+09);
  var xyz = val * sqrt(2.0 * PI * vr) * cos(pos * phase + shift) * exp(-pow2(phase) * vr);
  xyz.x += 9.7470e-14 * sqrt(2.0 * PI * 4.5282e+09) * cos(2.2399e+06 * phase + shift[0]) * exp(-4.5282e+09 * pow2(phase));
  xyz /= 1.0685e-7;
  return XYZ_TO_REC709 * xyz;
}

fn evalIridescence(outsideIOR: f32, eta2: f32, cosTheta1: f32, thinFilmThickness: f32, baseF0: vec3f) -> vec3f {
  let iridescenceIOR = mix(outsideIOR, eta2, smoothstep(0.0, 0.03, thinFilmThickness));
  let sinTheta2Sq = pow2(outsideIOR / iridescenceIOR) * (1.0 - pow2(cosTheta1));
  let cosTheta2Sq = 1.0 - sinTheta2Sq;
  if (cosTheta2Sq < 0.0) {
    return vec3f(1.0);
  }
  let cosTheta2 = sqrt(cosTheta2Sq);
  let R0 = IorToFresnel0(iridescenceIOR, outsideIOR);
  let R12 = F_Schlick1(R0, 1.0, cosTheta1);
  let T121 = 1.0 - R12;
  var phi12 = 0.0;
  if (iridescenceIOR < outsideIOR) { phi12 = PI; }
  let phi21 = PI - phi12;
  let baseIOR = Fresnel0ToIor(clamp(baseF0, vec3f(0.0), vec3f(0.9999)));
  let R1 = IorToFresnel0v(baseIOR, iridescenceIOR);
  let R23 = F_Schlick(R1, 1.0, cosTheta2);
  var phi23 = vec3f(0.0);
  if (baseIOR[0] < iridescenceIOR) { phi23[0] = PI; }
  if (baseIOR[1] < iridescenceIOR) { phi23[1] = PI; }
  if (baseIOR[2] < iridescenceIOR) { phi23[2] = PI; }
  let OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
  let phi = vec3f(phi21) + phi23;
  let R123 = clamp(R12 * R23, vec3f(1e-5), vec3f(0.9999));
  let r123 = sqrt(R123);
  let Rs = pow2(T121) * R23 / (vec3f(1.0) - R123);
  let C0 = R12 + Rs;
  var I = C0;
  var Cm = Rs - T121;
  for (var m = 1; m <= 2; m++) {
    Cm *= r123;
    let Sm = 2.0 * evalSensitivity(f32(m) * OPD, f32(m) * phi);
    I += Cm * Sm;
  }
  return max(I, vec3f(0.0));
}
`,uu=`// Linear to what the target stores: sRGB for the canvas, linear for anything read back.
#ifdef SRGB_OUTPUT
fn linearToOutputTexel(value: vec4f) -> vec4f { return sRGBTransferOETF(value); }
#else
fn linearToOutputTexel(value: vec4f) -> vec4f { return value; }
#endif
`,du=`// The physical BRDFs and how direct and image-based light are gathered through them.

struct PhysicalMaterial {
  diffuseColor: vec3f,
  diffuseContribution: vec3f,
  specularColor: vec3f,
  specularColorBlended: vec3f,
  roughness: f32,
  metalness: f32,
  specularF90: f32,
  dfg: vec2f,
  multiScatteringCompensation: vec3f,
  clearcoat: f32,
  clearcoatRoughness: f32,
  clearcoatF0: vec3f,
  clearcoatF90: f32,
  iridescence: f32,
  iridescenceIOR: f32,
  iridescenceThickness: f32,
  iridescenceFresnel: vec3f,
  iridescenceF0Dielectric: vec3f,
  iridescenceF0Metallic: vec3f,
  sheenColor: vec3f,
  sheenRoughness: f32,
  ior: f32,
  transmission: f32,
  transmissionAlpha: f32,
  thickness: f32,
  attenuationDistance: f32,
  attenuationColor: vec3f,
};

var<private> directDiffuse = vec3f(0.0);
var<private> directSpecular = vec3f(0.0);
var<private> indirectDiffuse = vec3f(0.0);
var<private> indirectSpecular = vec3f(0.0);
var<private> clearcoatSpecularDirect = vec3f(0.0);
var<private> clearcoatSpecularIndirect = vec3f(0.0);
var<private> sheenSpecularDirect = vec3f(0.0);
var<private> sheenSpecularIndirect = vec3f(0.0);

fn Schlick_to_F0(f: vec3f, f90: f32, dotVH: f32) -> vec3f {
  let x = clamp(1.0 - dotVH, 0.0, 1.0);
  let x2 = x * x;
  let x5 = clamp(x * x2 * x2, 0.0, 0.9999);
  return (f - vec3f(f90) * x5) / (1.0 - x5);
}

fn V_GGX_SmithCorrelated(alpha: f32, dotNL: f32, dotNV: f32) -> f32 {
  let a2 = pow2(alpha);
  let gv = dotNL * sqrt(a2 + (1.0 - a2) * pow2(dotNV));
  let gl = dotNV * sqrt(a2 + (1.0 - a2) * pow2(dotNL));
  return 0.5 / max(gv + gl, EPSILON);
}

fn D_GGX(alpha: f32, dotNH: f32) -> f32 {
  let a2 = pow2(alpha);
  let denom = pow2(dotNH) * (a2 - 1.0) + 1.0;
  return RECIPROCAL_PI * a2 / pow2(denom);
}

fn BRDF_GGX_Clearcoat(lightDir: vec3f, viewDir: vec3f, normal: vec3f, material: PhysicalMaterial) -> vec3f {
  let f0 = material.clearcoatF0;
  let f90 = material.clearcoatF90;
  let roughness = material.clearcoatRoughness;
  let alpha = pow2(roughness);
  let halfDir = normalize(lightDir + viewDir);
  let dotNL = saturate1(dot(normal, lightDir));
  let dotNV = saturate1(dot(normal, viewDir));
  let dotNH = saturate1(dot(normal, halfDir));
  let dotVH = saturate1(dot(viewDir, halfDir));
  let F = F_Schlick(f0, f90, dotVH);
  let V = V_GGX_SmithCorrelated(alpha, dotNL, dotNV);
  let D = D_GGX(alpha, dotNH);
  return F * (V * D);
}

fn BRDF_GGX(lightDir: vec3f, viewDir: vec3f, normal: vec3f, material: PhysicalMaterial) -> vec3f {
  let f0 = material.specularColorBlended;
  let f90 = material.specularF90;
  let roughness = material.roughness;
  let alpha = pow2(roughness);
  let halfDir = normalize(lightDir + viewDir);
  let dotNL = saturate1(dot(normal, lightDir));
  let dotNV = saturate1(dot(normal, viewDir));
  let dotNH = saturate1(dot(normal, halfDir));
  let dotVH = saturate1(dot(viewDir, halfDir));
  var F = F_Schlick(f0, f90, dotVH);
  #ifdef USE_IRIDESCENCE
  F = mix(F, material.iridescenceFresnel, material.iridescence);
  #endif
  let V = V_GGX_SmithCorrelated(alpha, dotNL, dotNV);
  let D = D_GGX(alpha, dotNH);
  return F * (V * D);
}

fn D_Charlie(roughness: f32, dotNH: f32) -> f32 {
  let alpha = pow2(roughness);
  let invAlpha = 1.0 / alpha;
  let cos2h = dotNH * dotNH;
  let sin2h = max(1.0 - cos2h, 0.0078125);
  return (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);
}

fn V_Neubelt(dotNV: f32, dotNL: f32) -> f32 {
  return saturate1(1.0 / (4.0 * (dotNL + dotNV - dotNL * dotNV)));
}

fn BRDF_Sheen(lightDir: vec3f, viewDir: vec3f, normal: vec3f, sheenColor: vec3f, sheenRoughness: f32) -> vec3f {
  let halfDir = normalize(lightDir + viewDir);
  let dotNL = saturate1(dot(normal, lightDir));
  let dotNV = saturate1(dot(normal, viewDir));
  let dotNH = saturate1(dot(normal, halfDir));
  let D = D_Charlie(sheenRoughness, dotNH);
  let V = V_Neubelt(dotNV, dotNL);
  return sheenColor * (D * V);
}

fn IBLSheenBRDF(normal: vec3f, viewDir: vec3f, roughness: f32) -> f32 {
  let dotNV = saturate1(dot(normal, viewDir));
  let r2 = roughness * roughness;
  let rInv = 1.0 / (roughness + 0.1);
  let a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
  let b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
  let DG = exp(a * dotNV + b);
  return saturate1(DG);
}

fn EnvironmentBRDF(normal: vec3f, viewDir: vec3f, specularColor: vec3f, specularF90: f32, roughness: f32) -> vec3f {
  let dotNV = saturate1(dot(normal, viewDir));
  let fab = textureSampleLevel(t_dfg, s_linear, vec2f(roughness, dotNV), 0.0).rg;
  return specularColor * fab.x + specularF90 * fab.y;
}

struct Scattering { single: vec3f, multi: vec3f };

fn computeMultiscattering(fab: vec2f, specularColor: vec3f, specularF90: f32, iridescence: f32, iridescenceF0: vec3f) -> Scattering {
  #ifdef USE_IRIDESCENCE
  let Fr = mix(specularColor, iridescenceF0, iridescence);
  #else
  let Fr = specularColor;
  #endif
  let FssEss = Fr * fab.x + specularF90 * fab.y;
  let Ess = fab.x + fab.y;
  let Ems = 1.0 - Ess;
  let Favg = Fr + (1.0 - Fr) * 0.047619;
  let Fms = FssEss * Favg / (1.0 - Ems * Favg);
  return Scattering(vec3f(0.0) + FssEss, vec3f(0.0) + Fms * Ems);
}

fn RE_Direct_Physical(lightDirection: vec3f, lightColor: vec3f, geometryNormal: vec3f, geometryViewDir: vec3f, geometryClearcoatNormal: vec3f, material: PhysicalMaterial) {
  let dotNL = saturate1(dot(geometryNormal, lightDirection));
  var irradiance = dotNL * lightColor;
  #ifdef USE_CLEARCOAT
  let dotNLcc = saturate1(dot(geometryClearcoatNormal, lightDirection));
  let ccIrradiance = dotNLcc * lightColor;
  clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat(lightDirection, geometryViewDir, geometryClearcoatNormal, material);
  #endif
  #ifdef USE_SHEEN
  sheenSpecularDirect += irradiance * BRDF_Sheen(lightDirection, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness);
  let sheenAlbedoV = IBLSheenBRDF(geometryNormal, geometryViewDir, material.sheenRoughness);
  let sheenAlbedoL = IBLSheenBRDF(geometryNormal, lightDirection, material.sheenRoughness);
  let sheenEnergyComp = 1.0 - max3(material.sheenColor) * max(sheenAlbedoV, sheenAlbedoL);
  irradiance *= sheenEnergyComp;
  #endif
  let specularBRDF = BRDF_GGX(lightDirection, geometryViewDir, geometryNormal, material);
  directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
  let halfDir = normalize(lightDirection + geometryViewDir);
  let dotVH = saturate1(dot(geometryViewDir, halfDir));
  let F = F_Schlick(material.specularColor, material.specularF90, dotVH);
  directDiffuse += irradiance * BRDF_Lambert(material.diffuseContribution) * (1.0 - F);
}

fn RE_IndirectDiffuse_Physical(irradiance: vec3f, geometryNormal: vec3f, geometryViewDir: vec3f, material: PhysicalMaterial) {
  let s = computeMultiscattering(material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric);
  var diffuse = irradiance * BRDF_Lambert(material.diffuseContribution) * (1.0 - s.single - s.multi);
  #ifdef USE_SHEEN
  let sheenAlbedo = IBLSheenBRDF(geometryNormal, geometryViewDir, material.sheenRoughness);
  sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
  let sheenEnergyComp = 1.0 - max3(material.sheenColor) * sheenAlbedo;
  diffuse *= sheenEnergyComp;
  #endif
  indirectDiffuse += diffuse;
}

fn RE_IndirectSpecular_Physical(radiance: vec3f, irradiance: vec3f, clearcoatRadiance: vec3f, geometryNormal: vec3f, geometryViewDir: vec3f, geometryClearcoatNormal: vec3f, material: PhysicalMaterial) {
  #ifdef USE_CLEARCOAT
  clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF(geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness);
  #endif
  #ifdef USE_SHEEN
  sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF(geometryNormal, geometryViewDir, material.sheenRoughness) * RECIPROCAL_PI;
  #endif
  let dielectric = computeMultiscattering(material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric);
  let metallic = computeMultiscattering(material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic);
  let singleScattering = mix(dielectric.single, metallic.single, material.metalness);
  let multiScattering = mix(dielectric.multi, metallic.multi, material.metalness);
  let totalScatteringDielectric = dielectric.single + dielectric.multi;
  let diffuse = material.diffuseContribution * (1.0 - totalScatteringDielectric);
  let cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
  var specular = radiance * singleScattering;
  specular += multiScattering * cosineWeightedIrradiance;
  var diffuseOut = diffuse * cosineWeightedIrradiance;
  #ifdef USE_SHEEN
  let sheenAlbedo = IBLSheenBRDF(geometryNormal, geometryViewDir, material.sheenRoughness);
  let sheenEnergyComp = 1.0 - max3(material.sheenColor) * sheenAlbedo;
  specular *= sheenEnergyComp;
  diffuseOut *= sheenEnergyComp;
  #endif
  indirectSpecular += specular;
  indirectDiffuse += diffuseOut;
}
`,fu=`// The full-screen quads the PMREM passes draw, one per atlas face.
struct Varyings {
  @builtin(position) position: vec4f,
  @location(0) outputDirection: vec3f,
};

@vertex
fn vs(@location(0) position: vec3f, @location(4) outputDirection: vec3f) -> Varyings {
  var out: Varyings;
  out.outputDirection = outputDirection;
  // Drawn upside down so the atlas lands in OpenGL's row order.
  out.position = vec4f(position.x, -position.y, position.z * 0.5 + 0.5, 1.0);
  return out;
}
`,pu=`// The shadow-map coordinate of a vertex, nudged along its normal by the normal bias.
fn shadowCoordOf(worldPosition: vec4f, transformedNormal: vec3f) -> vec4f {
  let shadowWorldNormal = transformNormalByInverseViewMatrix(transformedNormal, u_frame.viewMatrix);
  let shadowWorldPosition = worldPosition + vec4f(shadowWorldNormal * u_frame.shadowNormalBias, 0.0);
  return u_frame.shadowMatrix * shadowWorldPosition;
}
`,mu=`// The PCF lookup into the key light's shadow map.

fn interleavedGradientNoise(position: vec2f) -> f32 {
  return fract(52.9829189 * fract(dot(position, vec2f(0.06711056, 0.00583715))));
}

fn vogelDiskSample(sampleIndex: i32, samplesCount: i32, phi: f32) -> vec2f {
  let goldenAngle = 2.399963229728653;
  let r = sqrt((f32(sampleIndex) + 0.5) / f32(samplesCount));
  let theta = f32(sampleIndex) * goldenAngle + phi;
  return vec2f(cos(theta), sin(theta)) * r;
}

fn getShadow(shadowMapSize: vec2f, shadowIntensity: f32, shadowBias: f32, shadowRadius: f32, shadowCoordIn: vec4f, fragCoord: vec2f) -> f32 {
  var shadow = 1.0;
  var shadowCoord = vec4f(shadowCoordIn.xyz / shadowCoordIn.w, shadowCoordIn.w);
  shadowCoord.z += shadowBias;
  let inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
  let frustumTest = inFrustum && shadowCoord.z <= 1.0;
  if (frustumTest) {
    let texelSize = vec2f(1.0) / shadowMapSize;
    let radius = shadowRadius * texelSize.x;
    let phi = interleavedGradientNoise(fragCoord) * PI2;
    shadow = (
      textureSampleCompareLevel(t_shadow, s_shadow, shadowCoord.xy + vogelDiskSample(0, 5, phi) * radius, shadowCoord.z) +
      textureSampleCompareLevel(t_shadow, s_shadow, shadowCoord.xy + vogelDiskSample(1, 5, phi) * radius, shadowCoord.z) +
      textureSampleCompareLevel(t_shadow, s_shadow, shadowCoord.xy + vogelDiskSample(2, 5, phi) * radius, shadowCoord.z) +
      textureSampleCompareLevel(t_shadow, s_shadow, shadowCoord.xy + vogelDiskSample(3, 5, phi) * radius, shadowCoord.z) +
      textureSampleCompareLevel(t_shadow, s_shadow, shadowCoord.xy + vogelDiskSample(4, 5, phi) * radius, shadowCoord.z)
    ) * 0.2;
  }
  return mix(1.0, shadow, shadowIntensity);
}

fn directionalShadow(shadowCoord: vec4f, fragCoord: vec2f) -> f32 {
  return getShadow(u_frame.shadowMapSize, u_frame.shadowParams.x, u_frame.shadowParams.y, u_frame.shadowParams.z, shadowCoord, fragCoord);
}
`,hu=`// Transmission: the scene behind, refracted through the volume and blurred by roughness.

fn w0(a: f32) -> f32 { return (1.0 / 6.0) * (a * (a * (-a + 3.0) - 3.0) + 1.0); }
fn w1(a: f32) -> f32 { return (1.0 / 6.0) * (a * a * (3.0 * a - 6.0) + 4.0); }
fn w2(a: f32) -> f32 { return (1.0 / 6.0) * (a * (a * (-3.0 * a + 3.0) + 3.0) + 1.0); }
fn w3(a: f32) -> f32 { return (1.0 / 6.0) * (a * a * a); }
fn g0(a: f32) -> f32 { return w0(a) + w1(a); }
fn g1(a: f32) -> f32 { return w2(a) + w3(a); }
fn h0(a: f32) -> f32 { return -1.0 + w1(a) / (w0(a) + w1(a)); }
fn h1(a: f32) -> f32 { return 1.0 + w3(a) / (w2(a) + w3(a)); }

fn bicubic(uvIn: vec2f, texelSize: vec4f, lod: f32) -> vec4f {
  let uv = uvIn * texelSize.zw + 0.5;
  let iuv = floor(uv);
  let fuv = fract(uv);
  let g0x = g0(fuv.x);
  let g1x = g1(fuv.x);
  let h0x = h0(fuv.x);
  let h1x = h1(fuv.x);
  let h0y = h0(fuv.y);
  let h1y = h1(fuv.y);
  let p0 = (vec2f(iuv.x + h0x, iuv.y + h0y) - 0.5) * texelSize.xy;
  let p1 = (vec2f(iuv.x + h1x, iuv.y + h0y) - 0.5) * texelSize.xy;
  let p2 = (vec2f(iuv.x + h0x, iuv.y + h1y) - 0.5) * texelSize.xy;
  let p3 = (vec2f(iuv.x + h1x, iuv.y + h1y) - 0.5) * texelSize.xy;
  return g0(fuv.y) * (g0x * textureSampleLevel(t_transmission, s_trilinear, p0, lod) + g1x * textureSampleLevel(t_transmission, s_trilinear, p1, lod)) +
    g1(fuv.y) * (g0x * textureSampleLevel(t_transmission, s_trilinear, p2, lod) + g1x * textureSampleLevel(t_transmission, s_trilinear, p3, lod));
}

fn textureBicubic(uv: vec2f, lod: f32) -> vec4f {
  let levels = i32(textureNumLevels(t_transmission)) - 1;
  let fLodSize = vec2f(textureDimensions(t_transmission, min(i32(lod), levels)));
  let cLodSize = vec2f(textureDimensions(t_transmission, min(i32(lod + 1.0), levels)));
  let fLodSizeInv = 1.0 / fLodSize;
  let cLodSizeInv = 1.0 / cLodSize;
  let fSample = bicubic(uv, vec4f(fLodSizeInv, fLodSize), floor(lod));
  let cSample = bicubic(uv, vec4f(cLodSizeInv, cLodSize), ceil(lod));
  return mix(fSample, cSample, fract(lod));
}

fn getVolumeTransmissionRay(n: vec3f, v: vec3f, thickness: f32, ior: f32, modelMatrix: mat4x4f) -> vec3f {
  let refractionVector = refract(-v, normalize(n), 1.0 / ior);
  let modelScale = vec3f(length(modelMatrix[0].xyz), length(modelMatrix[1].xyz), length(modelMatrix[2].xyz));
  return normalize(refractionVector) * thickness * modelScale;
}

fn applyIorToRoughness(roughness: f32, ior: f32) -> f32 {
  return roughness * clamp(ior * 2.0 - 2.0, 0.0, 1.0);
}

fn getTransmissionSample(fragCoord: vec2f, roughness: f32, ior: f32) -> vec4f {
  let lod = log2(u_frame.transmissionSamplerSize.x) * applyIorToRoughness(roughness, ior);
  return textureBicubic(fragCoord, lod);
}

fn volumeAttenuation(transmissionDistance: f32, attenuationColor: vec3f, attenuationDistance: f32) -> vec3f {
  if (u_draw.attenuationFinite < 0.5) {
    return vec3f(1.0);
  }
  let attenuationCoefficient = -log(attenuationColor) / attenuationDistance;
  return exp(-attenuationCoefficient * transmissionDistance);
}

fn getIBLVolumeRefraction(n: vec3f, v: vec3f, roughness: f32, diffuseColor: vec3f, specularColor: vec3f, specularF90: f32,
  position: vec3f, modelMatrix: mat4x4f, viewMatrix: mat4x4f, projMatrix: mat4x4f, ior: f32, thickness: f32,
  attenuationColor: vec3f, attenuationDistance: f32) -> vec4f {
  let transmissionRay = getVolumeTransmissionRay(n, v, thickness, ior, modelMatrix);
  let refractedRayExit = position + transmissionRay;
  let ndcPos = projMatrix * viewMatrix * vec4f(refractedRayExit, 1.0);
  var refractionCoords = ndcPos.xy / ndcPos.w;
  refractionCoords += 1.0;
  refractionCoords /= 2.0;
  let transmittedLight = getTransmissionSample(refractionCoords, roughness, ior);
  let transmittance = diffuseColor * volumeAttenuation(length(transmissionRay), attenuationColor, attenuationDistance);
  let attenuatedColor = transmittance * transmittedLight.rgb;
  let F = EnvironmentBRDF(n, v, specularColor, specularF90, roughness);
  let transmittanceFactor = (transmittance.r + transmittance.g + transmittance.b) / 3.0;
  return vec4f((1.0 - F) * attenuatedColor, 1.0 - (1.0 - transmittedLight.a) * transmittanceFactor);
}
`,gu=`// MeshBasicMaterial and LineBasicMaterial: the colour, times the map and vertex colours.

#include <frame>
#include <draw>
#include <bindings>
#include <common>
#include <output>

struct VertexInput {
  @location(0) position: vec3f,
  #ifdef USE_MAP
  @location(2) uv: vec2f,
  #endif
  #ifdef USE_COLOR
  @location(3) color: vec3f,
  #endif
};
struct Varyings {
  @builtin(position) position: vec4f,
  #ifdef USE_MAP
  @location(0) mapUv: vec2f,
  #endif
  #ifdef USE_COLOR
  @location(1) color: vec4f,
  #endif
};

@vertex
fn vs(in: VertexInput) -> Varyings {
  var out: Varyings;
  #ifdef USE_MAP
  out.mapUv = (u_draw.mapTransform * vec3f(in.uv, 1.0)).xy;
  #endif
  #ifdef USE_COLOR
  out.color = vec4f(vec3f(1.0) * in.color, 1.0);
  #endif
  let mvPosition = u_draw.modelViewMatrix * vec4f(in.position, 1.0);
  out.position = u_frame.projectionMatrix * mvPosition;
  return out;
}

@fragment
fn fs(in: Varyings) -> @location(0) vec4f {
  var diffuseColor = vec4f(u_draw.diffuse, u_draw.opacity);
  #ifdef USE_MAP
  diffuseColor *= textureSample(t_map, s_map, in.mapUv);
  #endif
  #ifdef USE_COLOR
  diffuseColor *= in.color;
  #endif
  var indirectDiffuse = vec3f(1.0);
  indirectDiffuse *= diffuseColor.rgb;
  let outgoingLight = indirectDiffuse;
  #ifdef OPAQUE
  diffuseColor.a = 1.0;
  #endif
  return linearToOutputTexel(vec4f(outgoingLight, diffuseColor.a));
}
`,_u=`// A hand-written ShaderMaterial. What its module can rely on: \`object\` (the
// matrices and camera) and \`material\` (its uniforms, in declaration order,
// which wgsl.js writes in as MATERIAL_FIELDS). wgsl.js appends its own \`vs\`
// and \`fs\` after this.

struct Object {
  modelMatrix: mat4x4f,
  modelViewMatrix: mat4x4f,
  projectionMatrix: mat4x4f,
  viewMatrix: mat4x4f,
  normalMatrix: mat3x3f,
  cameraPosition: vec3f,
};
struct Material {
MATERIAL_FIELDS
};
@group(0) @binding(0) var<uniform> object: Object;
@group(0) @binding(1) var<uniform> material: Material;
`,vu=`// Shadow-map depth: the position through the light's view, nothing else.

struct Depth { modelViewMatrix: mat4x4f, projectionMatrix: mat4x4f };
@group(0) @binding(0) var<uniform> u_depth: Depth;

@vertex
fn vs(@location(0) position: vec3f) -> @builtin(position) vec4f {
  return u_depth.projectionMatrix * (u_depth.modelViewMatrix * vec4f(position, 1.0));
}
`,yu=`// One mip level from the one above: a bilinear tap at the centre of each 2×2 block.

@group(0) @binding(0) var t_source: texture_2d<f32>;
@group(0) @binding(1) var s_source: sampler;

@vertex
fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  return vec4f(p[i], 0.0, 1.0);
}

@fragment
fn fs(@builtin(position) position: vec4f) -> @location(0) vec4f {
  let size = vec2f(textureDimensions(t_source)) * 0.5;
  return textureSampleLevel(t_source, s_source, position.xy / max(floor(size), vec2f(1.0)), 0.0);
}
`,bu=`// The studio, sampled onto six cube faces laid out as the atlas wants them.

@group(0) @binding(0) var t_source: texture_2d<f32>;
@group(0) @binding(1) var s_source: sampler;
const RECIPROCAL_PI = 0.3183098861837907;
const RECIPROCAL_PI2 = 0.15915494309189535;
#include <pmrem_vertex>
fn equirectUv(dir: vec3f) -> vec2f {
  let u = atan2(dir.z, dir.x) * RECIPROCAL_PI2 + 0.5;
  let v = asin(clamp(dir.y, -1.0, 1.0)) * RECIPROCAL_PI + 0.5;
  return vec2f(u, v);
}

@fragment
fn fs(in: Varyings) -> @location(0) vec4f {
  let outputDirection = normalize(in.outputDirection);
  let uv = equirectUv(outputDirection);
  return vec4f(textureSample(t_source, s_source, uv).rgb, 1.0);
}
`,xu=`// GGX importance-sampled prefilter of one level of the atlas into the next.

struct Params { roughness: f32, mipInt: f32 };
@group(0) @binding(0) var t_source: texture_2d<f32>;
@group(0) @binding(1) var s_linear: sampler;
@group(0) @binding(2) var<uniform> params: Params;
#include <pmrem_vertex>
#include <cube_uv>
const PI = 3.14159265359;
const GGX_SAMPLES = 256u;

fn radicalInverse_VdC(bitsIn: u32) -> f32 {
  var bits = bitsIn;
  bits = (bits << 16u) | (bits >> 16u);
  bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
  bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
  bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
  bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
  return f32(bits) * 2.3283064365386963e-10;
}

fn hammersley(i: u32, N: u32) -> vec2f {
  return vec2f(f32(i) / f32(N), radicalInverse_VdC(i));
}

fn importanceSampleGGX_VNDF(Xi: vec2f, V: vec3f, roughness: f32) -> vec3f {
  let alpha = roughness * roughness;
  let T1 = vec3f(1.0, 0.0, 0.0);
  let T2 = cross(V, T1);
  let r = sqrt(Xi.x);
  let phi = 2.0 * PI * Xi.y;
  let t1 = r * cos(phi);
  var t2 = r * sin(phi);
  let s = 0.5 * (1.0 + V.z);
  t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;
  let Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;
  return normalize(vec3f(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
}

@fragment
fn fs(in: Varyings) -> @location(0) vec4f {
  let N = normalize(in.outputDirection);
  let V = N;
  var prefilteredColor = vec3f(0.0);
  var totalWeight = 0.0;
  if (params.roughness < 0.001) {
    return vec4f(bilinearCubeUV(t_source, N, params.mipInt), 1.0);
  }
  let up = select(vec3f(1.0, 0.0, 0.0), vec3f(0.0, 0.0, 1.0), abs(N.z) < 0.999);
  let tangent = normalize(cross(up, N));
  let bitangent = cross(N, tangent);
  for (var i = 0u; i < GGX_SAMPLES; i++) {
    let Xi = hammersley(i, GGX_SAMPLES);
    let H_tangent = importanceSampleGGX_VNDF(Xi, vec3f(0.0, 0.0, 1.0), params.roughness);
    let H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
    let L = normalize(2.0 * dot(V, H) * H - V);
    let NdotL = max(dot(N, L), 0.0);
    if (NdotL > 0.0) {
      let sampleColor = bilinearCubeUV(t_source, L, params.mipInt);
      prefilteredColor += sampleColor * NdotL;
      totalWeight += NdotL;
    }
  }
  if (totalWeight > 0.0) {
    prefilteredColor = prefilteredColor / totalWeight;
  }
  return vec4f(prefilteredColor, 1.0);
}
`,Su=`// Copies a frame drawn in OpenGL row order onto the canvas, flipping it upright.

@group(0) @binding(0) var t_source: texture_2d<f32>;

@vertex
fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  let p = array(vec2f(-1.0, -1.0), vec2f(3.0, -1.0), vec2f(-1.0, 3.0));
  return vec4f(p[i], 0.0, 1.0);
}

@fragment
fn fs(@builtin(position) position: vec4f) -> @location(0) vec4f {
  let size = vec2i(textureDimensions(t_source));
  let p = vec2i(position.xy);
  return textureLoad(t_source, vec2i(p.x, size.y - 1 - p.y), 0);
}
`,Cu=`// ShadowMaterial: transparent except where the key light is blocked.

#include <frame>
#include <draw>
#include <bindings>
#include <common>
#include <output>
#if NUM_DIR_LIGHT_SHADOWS > 0
#include <shadowmap>
#include <shadow_vertex>
#endif

struct VertexInput {
  @location(0) position: vec3f,
  @location(1) normal: vec3f,
};
struct Varyings {
  @builtin(position) position: vec4f,
  #if NUM_DIR_LIGHT_SHADOWS > 0
  @location(0) shadowCoord: vec4f,
  #endif
};

@vertex
fn vs(in: VertexInput) -> Varyings {
  var out: Varyings;
  let transformedNormal = u_draw.normalMatrix * in.normal;
  let mvPosition = u_draw.modelViewMatrix * vec4f(in.position, 1.0);
  out.position = u_frame.projectionMatrix * mvPosition;
  #if NUM_DIR_LIGHT_SHADOWS > 0
  let worldPosition = u_draw.modelMatrix * vec4f(in.position, 1.0);
  #ifdef HAS_NORMAL
  out.shadowCoord = shadowCoordOf(worldPosition, transformedNormal);
  #else
  out.shadowCoord = shadowCoordOf(worldPosition, vec3f(0.0) * transformedNormal);
  #endif
  #endif
  return out;
}

@fragment
fn fs(in: Varyings) -> @location(0) vec4f {
  var shadow = 1.0;
  #if NUM_DIR_LIGHT_SHADOWS > 0
  let s = directionalShadow(in.shadowCoord, glFragCoord(in.position));
  shadow *= select(1.0, s, u_draw.receiveShadow > 0.5);
  #endif
  return linearToOutputTexel(vec4f(u_draw.diffuse, u_draw.opacity * (1.0 - shadow)));
}
`,wu=`// A billboard: the quad is laid out in view space, so it always faces the camera.

#include <frame>
#include <draw>
#include <bindings>
#include <common>
#include <output>

struct VertexInput {
  @location(0) position: vec3f,
  #ifdef USE_MAP
  @location(2) uv: vec2f,
  #endif
};
struct Varyings {
  @builtin(position) position: vec4f,
  #ifdef USE_MAP
  @location(0) mapUv: vec2f,
  #endif
};

@vertex
fn vs(in: VertexInput) -> Varyings {
  var out: Varyings;
  #ifdef USE_MAP
  out.mapUv = (u_draw.mapTransform * vec3f(in.uv, 1.0)).xy;
  #endif
  var mvPosition = u_draw.modelViewMatrix[3];
  let scale = vec2f(length(u_draw.modelMatrix[0].xyz), length(u_draw.modelMatrix[1].xyz));
  let alignedPosition = (in.position.xy - (u_draw.center - vec2f(0.5))) * scale;
  var rotatedPosition: vec2f;
  rotatedPosition.x = cos(u_draw.rotation) * alignedPosition.x - sin(u_draw.rotation) * alignedPosition.y;
  rotatedPosition.y = sin(u_draw.rotation) * alignedPosition.x + cos(u_draw.rotation) * alignedPosition.y;
  mvPosition = vec4f(mvPosition.xy + rotatedPosition, mvPosition.zw);
  out.position = u_frame.projectionMatrix * mvPosition;
  return out;
}

@fragment
fn fs(in: Varyings) -> @location(0) vec4f {
  var diffuseColor = vec4f(u_draw.diffuse, u_draw.opacity);
  #ifdef USE_MAP
  diffuseColor *= textureSample(t_map, s_map, in.mapUv);
  #endif
  let outgoingLight = diffuseColor.rgb;
  #ifdef OPAQUE
  diffuseColor.a = 1.0;
  #endif
  return linearToOutputTexel(vec4f(outgoingLight, diffuseColor.a));
}
`,Tu=`// MeshStandardMaterial and MeshPhysicalMaterial: three.js r186's physically based model.

#include <frame>
#include <draw>
#include <bindings>
#include <common>
#include <output>
#ifdef USE_ENVMAP
#include <cube_uv>
#endif
#if NUM_DIR_LIGHT_SHADOWS > 0
#include <shadowmap>
#include <shadow_vertex>
#endif

struct Varyings {
  @builtin(position) position: vec4f,
  @location(0) viewPosition: vec3f,
  #ifndef FLAT_SHADED
  @location(1) normal: vec3f,
  #endif
  #ifdef USE_MAP
  @location(2) mapUv: vec2f,
  #endif
  #ifdef USE_BUMPMAP
  @location(3) bumpMapUv: vec2f,
  #endif
  #ifdef USE_COLOR
  @location(4) color: vec4f,
  #endif
  #if NUM_DIR_LIGHT_SHADOWS > 0
  @location(5) shadowCoord: vec4f,
  #endif
  #ifdef USE_TRANSMISSION
  @location(6) worldPosition: vec3f,
  #endif
};

struct VertexInput {
  @location(0) position: vec3f,
  @location(1) normal: vec3f,
  #if defined(USE_MAP) || defined(USE_BUMPMAP)
  @location(2) uv: vec2f,
  #endif
  #ifdef USE_COLOR
  @location(3) color: vec3f,
  #endif
};

@vertex
fn vs(in: VertexInput) -> Varyings {
  var out: Varyings;
  #ifdef USE_MAP
  out.mapUv = (u_draw.mapTransform * vec3f(in.uv, 1.0)).xy;
  #endif
  #ifdef USE_BUMPMAP
  out.bumpMapUv = (u_draw.bumpMapTransform * vec3f(in.uv, 1.0)).xy;
  #endif
  #ifdef USE_COLOR
  out.color = vec4f(vec3f(1.0) * in.color, 1.0);
  #endif
  var transformedNormal = u_draw.normalMatrix * in.normal;
  #ifdef FLIP_SIDED
  transformedNormal = -transformedNormal;
  #endif
  #ifndef FLAT_SHADED
  out.normal = normalize(transformedNormal);
  #endif
  let mvPosition = u_draw.modelViewMatrix * vec4f(in.position, 1.0);
  out.position = u_frame.projectionMatrix * mvPosition;
  out.viewPosition = -mvPosition.xyz;
  #if defined(USE_ENVMAP) || NUM_DIR_LIGHT_SHADOWS > 0 || defined(USE_TRANSMISSION)
  let worldPosition = u_draw.modelMatrix * vec4f(in.position, 1.0);
  #endif
  #if NUM_DIR_LIGHT_SHADOWS > 0
  #ifdef HAS_NORMAL
  out.shadowCoord = shadowCoordOf(worldPosition, transformedNormal);
  #else
  out.shadowCoord = shadowCoordOf(worldPosition, vec3f(0.0) * transformedNormal);
  #endif
  #endif
  #ifdef USE_TRANSMISSION
  out.worldPosition = worldPosition.xyz;
  #endif
  return out;
}

#ifdef USE_IRIDESCENCE
#include <iridescence>
#endif
#include <physical_lighting>
#ifdef USE_TRANSMISSION
#include <transmission>
#endif
#ifdef USE_BUMPMAP
#include <bump>
#endif

#ifdef USE_ENVMAP
fn getIBLIrradiance(normal: vec3f) -> vec3f {
  let worldNormal = transformNormalByInverseViewMatrix(normal, u_frame.viewMatrix);
  let envMapColor = textureCubeUV(t_env, u_draw.envMapRotation * worldNormal, 1.0);
  return PI * envMapColor.rgb * u_draw.envMapIntensity;
}

fn getIBLRadiance(viewDir: vec3f, normal: vec3f, roughness: f32) -> vec3f {
  var reflectVec = reflect(-viewDir, normal);
  reflectVec = normalize(mix(reflectVec, normal, pow4(roughness)));
  reflectVec = transformNormalByInverseViewMatrix(reflectVec, u_frame.viewMatrix);
  let envMapColor = textureCubeUV(t_env, u_draw.envMapRotation * reflectVec, roughness);
  return envMapColor.rgb * u_draw.envMapIntensity;
}
#endif
#if NUM_POINT_LIGHTS > 0
fn getDistanceAttenuation(lightDistance: f32, cutoffDistance: f32, decayExponent: f32) -> f32 {
  var distanceFalloff = 1.0 / max(pow(lightDistance, decayExponent), 0.01);
  if (cutoffDistance > 0.0) {
    distanceFalloff *= pow2(saturate1(1.0 - pow4(lightDistance / cutoffDistance)));
  }
  return distanceFalloff;
}
#endif

@fragment
fn fs(in: Varyings, @builtin(front_facing) frontFacing: bool) -> @location(0) vec4f {
  var diffuseColor = vec4f(u_draw.diffuse, u_draw.opacity);
  let totalEmissiveRadiance = u_draw.emissive;
  #ifdef USE_MAP
  diffuseColor *= textureSample(t_map, s_map, in.mapUv);
  #endif
  #ifdef USE_COLOR
  diffuseColor *= in.color;
  #endif
  let roughnessFactor = u_draw.roughness;
  let metalnessFactor = u_draw.metalness;

  let faceDirection = select(-1.0, 1.0, frontFacing);
  #ifdef FLAT_SHADED
  let fdx = dpdx(in.viewPosition);
  let fdy = dFdy3(in.viewPosition);
  var normal = normalize(cross(fdx, fdy));
  #else
  var normal = normalize(in.normal);
  #ifdef DOUBLE_SIDED
  normal *= faceDirection;
  #endif
  #endif
  let nonPerturbedNormal = normal;
  #ifdef USE_BUMPMAP
  normal = perturbNormalArb(-in.viewPosition, normal, dHdxy_fwd(in.bumpMapUv), faceDirection);
  #endif
  let clearcoatNormal = nonPerturbedNormal;

  var material: PhysicalMaterial;
  material.diffuseColor = diffuseColor.rgb;
  material.diffuseContribution = diffuseColor.rgb * (1.0 - metalnessFactor);
  material.metalness = metalnessFactor;
  let dxy = max(abs(dpdx(nonPerturbedNormal)), abs(dFdy3(nonPerturbedNormal)));
  let geometryRoughness = max(max(dxy.x, dxy.y), dxy.z);
  material.roughness = max(roughnessFactor, 0.0525);
  material.roughness += geometryRoughness;
  material.roughness = min(material.roughness, 1.0);
  #ifdef PHYSICAL
  material.ior = u_draw.ior;
  let specularIntensityFactor = u_draw.specularIntensity;
  let specularColorFactor = u_draw.specularColor;
  material.specularF90 = mix(specularIntensityFactor, 1.0, metalnessFactor);
  material.specularColor = min(pow2((material.ior - 1.0) / (material.ior + 1.0)) * specularColorFactor, vec3f(1.0)) * specularIntensityFactor;
  material.specularColorBlended = mix(material.specularColor, diffuseColor.rgb, metalnessFactor);
  #else
  material.specularColor = vec3f(0.04);
  material.specularColorBlended = mix(material.specularColor, diffuseColor.rgb, metalnessFactor);
  material.specularF90 = 1.0;
  #endif
  #ifdef USE_CLEARCOAT
  material.clearcoat = u_draw.clearcoat;
  material.clearcoatRoughness = u_draw.clearcoatRoughness;
  material.clearcoatF0 = vec3f(0.04);
  material.clearcoatF90 = 1.0;
  material.clearcoat = saturate1(material.clearcoat);
  material.clearcoatRoughness = max(material.clearcoatRoughness, 0.0525);
  material.clearcoatRoughness += geometryRoughness;
  material.clearcoatRoughness = min(material.clearcoatRoughness, 1.0);
  #endif
  #ifdef USE_IRIDESCENCE
  material.iridescence = u_draw.iridescence;
  material.iridescenceIOR = u_draw.iridescenceIOR;
  material.iridescenceThickness = u_draw.iridescenceThicknessMaximum;
  #endif
  #ifdef USE_SHEEN
  material.sheenColor = u_draw.sheenColor;
  material.sheenRoughness = clamp(u_draw.sheenRoughness, 0.0001, 1.0);
  #endif

  let geometryPosition = -in.viewPosition;
  let geometryNormal = normal;
  let geometryViewDir = select(normalize(in.viewPosition), vec3f(0.0, 0.0, 1.0), u_frame.isOrthographic > 0.5);
  #ifdef USE_CLEARCOAT
  let geometryClearcoatNormal = clearcoatNormal;
  #else
  let geometryClearcoatNormal = vec3f(0.0);
  #endif

  #ifdef USE_IRIDESCENCE
  let dotNVi = saturate1(dot(normal, geometryViewDir));
  if (material.iridescenceThickness == 0.0) {
    material.iridescence = 0.0;
  } else {
    material.iridescence = saturate1(material.iridescence);
  }
  if (material.iridescence > 0.0) {
    let iridescenceFresnelDielectric = evalIridescence(1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor);
    let iridescenceFresnelMetallic = evalIridescence(1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor);
    material.iridescenceFresnel = mix(iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness);
    material.iridescenceF0Dielectric = Schlick_to_F0(iridescenceFresnelDielectric, 1.0, dotNVi);
    material.iridescenceF0Metallic = Schlick_to_F0(iridescenceFresnelMetallic, 1.0, dotNVi);
  }
  #endif

  let dotNVms = saturate1(dot(geometryNormal, geometryViewDir));
  material.dfg = textureSampleLevel(t_dfg, s_linear, vec2f(material.roughness, dotNVms), 0.0).rg;
  #if NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0
  let EssMs = material.dfg.x + material.dfg.y;
  material.multiScatteringCompensation = 1.0 + material.specularColorBlended * (1.0 / EssMs - 1.0);
  #endif

  #if NUM_POINT_LIGHTS > 0
  for (var i = 0; i < NUM_POINT_LIGHTS; i++) {
    let lVector = u_frame.pointLightPosition[i].xyz - geometryPosition;
    let lightDirection = normalize(lVector);
    let lightDistance = length(lVector);
    var lightColor = u_frame.pointLightColor[i].xyz;
    lightColor *= getDistanceAttenuation(lightDistance, u_frame.pointLightPosition[i].w, u_frame.pointLightColor[i].w);
    RE_Direct_Physical(lightDirection, lightColor, geometryNormal, geometryViewDir, geometryClearcoatNormal, material);
  }
  #endif

  #if NUM_DIR_LIGHT_SHADOWS > 0
  let shadow = select(1.0, directionalShadow(in.shadowCoord, glFragCoord(in.position)), u_draw.receiveShadow > 0.5);
  #endif
  #if NUM_DIR_LIGHTS > 0
  for (var i = 0; i < NUM_DIR_LIGHTS; i++) {
    var lightColor = u_frame.dirLightColor[i].xyz;
    #if NUM_DIR_LIGHT_SHADOWS > 0
    if (i == 0) { lightColor *= shadow; }
    #endif
    RE_Direct_Physical(u_frame.dirLightDirection[i].xyz, lightColor, geometryNormal, geometryViewDir, geometryClearcoatNormal, material);
  }
  #endif

  var iblIrradiance = vec3f(0.0);
  var irradiance = u_frame.ambientLightColor;
  #if NUM_HEMI_LIGHTS > 0
  for (var i = 0; i < NUM_HEMI_LIGHTS; i++) {
    let dotNL = dot(geometryNormal, u_frame.hemiLightDirection[i].xyz);
    let hemiDiffuseWeight = 0.5 * dotNL + 0.5;
    irradiance += mix(u_frame.hemiLightGroundColor[i].xyz, u_frame.hemiLightSkyColor[i].xyz, hemiDiffuseWeight);
  }
  #endif

  var radiance = vec3f(0.0);
  var clearcoatRadiance = vec3f(0.0);
  #ifdef USE_ENVMAP
  iblIrradiance += getIBLIrradiance(geometryNormal);
  radiance += getIBLRadiance(geometryViewDir, geometryNormal, material.roughness);
  #ifdef USE_CLEARCOAT
  clearcoatRadiance += getIBLRadiance(geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness);
  #endif
  #endif

  RE_IndirectDiffuse_Physical(irradiance, geometryNormal, geometryViewDir, material);
  RE_IndirectSpecular_Physical(radiance, iblIrradiance, clearcoatRadiance, geometryNormal, geometryViewDir, geometryClearcoatNormal, material);

  var totalDiffuse = directDiffuse + indirectDiffuse;
  let totalSpecular = directSpecular + indirectSpecular;

  #ifdef USE_TRANSMISSION
  material.transmission = u_draw.transmission;
  material.transmissionAlpha = 1.0;
  material.thickness = u_draw.thickness;
  material.attenuationDistance = u_draw.attenuationDistance;
  material.attenuationColor = u_draw.attenuationColor;
  let pos = in.worldPosition;
  let v = normalize(u_frame.cameraPosition - pos);
  let n = transformNormalByInverseViewMatrix(normal, u_frame.viewMatrix);
  let transmitted = getIBLVolumeRefraction(
    n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
    pos, u_draw.modelMatrix, u_frame.viewMatrix, u_frame.glProjectionMatrix, material.ior, material.thickness,
    material.attenuationColor, material.attenuationDistance);
  material.transmissionAlpha = mix(material.transmissionAlpha, transmitted.a, material.transmission);
  totalDiffuse = mix(totalDiffuse, transmitted.rgb, material.transmission);
  #endif

  var outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
  #ifdef USE_SHEEN
  outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
  #endif
  #ifdef USE_CLEARCOAT
  let dotNVcc = saturate1(dot(geometryClearcoatNormal, geometryViewDir));
  let Fcc = F_Schlick(material.clearcoatF0, material.clearcoatF90, dotNVcc);
  outgoingLight = outgoingLight * (1.0 - material.clearcoat * Fcc) + (clearcoatSpecularDirect + clearcoatSpecularIndirect) * material.clearcoat;
  #endif

  #ifdef OPAQUE
  diffuseColor.a = 1.0;
  #endif
  #ifdef USE_TRANSMISSION
  diffuseColor.a *= material.transmissionAlpha;
  #endif
  return linearToOutputTexel(vec4f(outgoingLight, diffuseColor.a));
}
`,Eu={bindings:ru,bump:iu,common:au,cube_uv:ou,draw:su,frame:cu,iridescence:lu,output:uu,physical_lighting:du,pmrem_vertex:fu,shadow_vertex:pu,shadowmap:mu,transmission:hu},Du=(e,t={})=>hl(e,{MAX_DIR_LIGHTS:8,MAX_POINT_LIGHTS:8,MAX_HEMI_LIGHTS:4,...t},Eu),Ou=e=>({CUBEUV_TEXEL_WIDTH:e.texelWidth,CUBEUV_TEXEL_HEIGHT:e.texelHeight,CUBEUV_MAX_MIP:`${e.maxMip}.0`}),ku=e=>({OPAQUE:e.opaque,SRGB_OUTPUT:e.output===`srgb`});function Au(e){return{...ku(e),PHYSICAL:e.physical,USE_MAP:e.map,USE_BUMPMAP:e.bumpMap,USE_COLOR:e.vertexColors,FLAT_SHADED:e.flat,DOUBLE_SIDED:e.doubleSided,FLIP_SIDED:e.flipSided,USE_ENVMAP:e.envMap,USE_CLEARCOAT:e.clearcoat,USE_SHEEN:e.sheen,USE_IRIDESCENCE:e.iridescence,USE_TRANSMISSION:e.transmission,HAS_NORMAL:e.hasNormal,NUM_DIR_LIGHTS:e.numDir,NUM_POINT_LIGHTS:e.numPoint,NUM_HEMI_LIGHTS:e.numHemi,NUM_DIR_LIGHT_SHADOWS:e.numDirShadows,...e.envMap?Ou(e.env):{}}}function ju(e,t){switch(e.kind){case`standard`:return Du(Tu,Au(e));case`basic`:return Du(gu,{...ku(e),USE_MAP:e.map,USE_COLOR:e.vertexColors});case`sprite`:return Du(wu,{...ku(e),USE_MAP:e.map});case`shadow`:return Du(Cu,Au({...e,envMap:!1}));case`custom`:return Nu(t);default:throw Error(`gfx: no WGSL for ${e.kind}`)}}function Mu(e){return Object.entries(e.uniforms).map(([e,{value:t}])=>{if(typeof t==`number`)return[e,`f32`];if(t.isColor||t.isVector3)return[e,`vec3f`];if(t.isVector2)return[e,`vec2f`];if(t.isMatrix4)return[e,`mat4x4f`];throw Error(`gfx: unsupported uniform ${e}`)})}function Nu(e){return Du(_u,{MATERIAL_FIELDS:Mu(e).map(([e,t])=>`  ${e}: ${t},`).join(`
`)})+e.wgsl}var Pu=()=>Du(bu),Fu=e=>Du(xu,Ou(e)),Iu=()=>Du(vu),Lu=()=>Du(yu),Ru=()=>Du(Su),zu=4,Bu=`depth24plus`,Vu=1040,Hu=464,Uu=320,Wu=4<<20,Gu=256,Ku={position:0,normal:1,uv:2,color:3},Q=GPUBufferUsage,$=GPUTextureUsage;function qu(e,t){let n=new Float32Array(16);for(let r=0;r<4;r++)n[r*4]=e[r*4],n[r*4+1]=t?-e[r*4+1]:e[r*4+1],n[r*4+2]=.5*e[r*4+2]+.5*e[r*4+3],n[r*4+3]=e[r*4+3];return n}var Ju=(e,t)=>Math.ceil(e/t)*t,Yu=class e{static async create(t){let n=await navigator.gpu.requestAdapter();if(!n)throw Error(`no WebGPU adapter`);let r=await n.requestDevice(),i=t.getContext(`webgpu`);if(!i)throw Error(`no WebGPU canvas context`);let a=new e(t,r,i);return await a._probe(),a}async _probe(){let e=!1;this.device.lost?.then(()=>{e=!0});let t=this.device.createCommandEncoder();if(t.beginRenderPass({colorAttachments:[{view:this.context.getCurrentTexture().createView(),loadOp:`clear`,storeOp:`store`,clearValue:{r:0,g:0,b:0,a:0}}]}).end(),this.device.queue.submit([t.finish()]),await Promise.race([this.device.lost,new Promise(e=>setTimeout(e,150))]),this._probing=!1,e)throw Error(`the WebGPU device was lost on its first frame`)}constructor(e,t,n){this.isWebGPU=!0,this.canvas=e,this.device=t,this.context=n,this.format=navigator.gpu.getPreferredCanvasFormat(),n.configure({device:t,format:this.format,alphaMode:`premultiplied`}),this.onLost=null,this._probing=!0,t.lost?.then(e=>{e.reason===`destroyed`||this._probing||(console.error(`three-d-stage: WebGPU device lost`,e.message),this.onLost?.(e))}),t.addEventListener?.(`uncapturederror`,e=>console.error(`three-d-stage:`,e.error.message)),this.width=e.width,this.height=e.height,this.pipelines=new Map,this.modules=new Map,this.buffers=new WeakMap,this.textures=new WeakMap,this.drawGroups=new Map,this.zero=t.createBuffer({size:64,usage:Q.VERTEX}),this.arena=t.createBuffer({size:Wu,usage:Q.UNIFORM|Q.COPY_DST}),this.arenaData=new ArrayBuffer(Wu),this.arenaF32=new Float32Array(this.arenaData),this.arenaUsed=0,this.frameBuffers=[0,1,2].map(()=>t.createBuffer({size:Vu,usage:Q.UNIFORM|Q.COPY_DST})),this.linear=t.createSampler({magFilter:`linear`,minFilter:`linear`}),this.trilinear=t.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`}),this.comparison=t.createSampler({magFilter:`linear`,minFilter:`linear`,compare:`less-equal`}),this.samplers=new Map,this.dfg=this._dfgTexture(),this.dummy2D=this._solidTexture(),this.dummyDepth=t.createTexture({size:[1,1],format:Bu,usage:$.TEXTURE_BINDING|$.RENDER_ATTACHMENT}),this._clearDepth(this.dummyDepth),this._layouts(),this.mipPipelines=new Map,this.pass=null}_layouts(){let e=this.device,t=GPUShaderStage.FRAGMENT,n=GPUShaderStage.VERTEX;this.frameLayout=e.createBindGroupLayout({entries:[{binding:0,visibility:n|t,buffer:{type:`uniform`}},{binding:1,visibility:t,texture:{sampleType:`float`}},{binding:2,visibility:t,sampler:{type:`filtering`}},{binding:3,visibility:t,texture:{sampleType:`float`}},{binding:4,visibility:t,texture:{sampleType:`depth`}},{binding:5,visibility:t,sampler:{type:`comparison`}},{binding:6,visibility:t,texture:{sampleType:`float`}},{binding:7,visibility:t,sampler:{type:`filtering`}}]}),this.drawLayout=e.createBindGroupLayout({entries:[{binding:0,visibility:n|t,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:Hu}},{binding:1,visibility:t,texture:{sampleType:`float`}},{binding:2,visibility:t,sampler:{type:`filtering`}},{binding:3,visibility:t,texture:{sampleType:`float`}},{binding:4,visibility:t,sampler:{type:`filtering`}}]}),this.builtinLayout=e.createPipelineLayout({bindGroupLayouts:[this.frameLayout,this.drawLayout]}),this.customLayout=e.createBindGroupLayout({entries:[{binding:0,visibility:n|t,buffer:{type:`uniform`,hasDynamicOffset:!0}},{binding:1,visibility:n|t,buffer:{type:`uniform`,hasDynamicOffset:!0}}]}),this.depthLayout=e.createBindGroupLayout({entries:[{binding:0,visibility:n,buffer:{type:`uniform`,hasDynamicOffset:!0,minBindingSize:128}}]}),this.depthGroup=e.createBindGroup({layout:this.depthLayout,entries:[{binding:0,resource:{buffer:this.arena,size:128}}]})}setSize(e,t){this.width=e,this.height=t}beginFrame(){}endFrame(){}beginPass({target:e,clear:t,frame:n}){let r=this.device,i,a,o,s,c;if(e===`canvas`){let e=this._canvasTargets();i=e.msaa.createView(),a=e.resolve.createView(),o=e.depth.createView(),s=this.format,c=this.height}else{let e=this._transmissionTarget();i=e.msaa.createView(),a=e.texture.createView({baseMipLevel:0,mipLevelCount:1}),o=e.depth.createView(),s=`rgba16float`,c=e.height}let l=this.frameBuffers[e===`canvas`?0:1];r.queue.writeBuffer(l,0,this._packFrame(n,!0,c));let u=r.createBindGroup({layout:this.frameLayout,entries:[{binding:0,resource:{buffer:l}},{binding:1,resource:this.dfg.createView()},{binding:2,resource:this.linear},{binding:3,resource:(n.env?n.env.gpu.texture:this.dummy2D).createView()},{binding:4,resource:(n.shadow?n.shadow.texture:this.dummyDepth).createView()},{binding:5,resource:this.comparison},{binding:6,resource:(e===`canvas`&&n.transmission?this.transmission.texture:this.dummy2D).createView()},{binding:7,resource:this.trilinear}]}),d=r.createCommandEncoder(),f=d.beginRenderPass({colorAttachments:[{view:i,resolveTarget:a,clearValue:{r:t[0],g:t[1],b:t[2],a:t[3]},loadOp:`clear`,storeOp:`discard`}],depthStencilAttachment:{view:o,depthClearValue:1,depthLoadOp:`clear`,depthStoreOp:`discard`}});this.arenaUsed=0,this.pass={target:e,frame:n,flipped:!0,encoder:d,pass:f,frameGroup:u,format:s,samples:zu,depth:!0}}beginShadowPass(e,[t,n]){let r=this.device;(!this.shadowMap||this.shadowMap.width!==t||this.shadowMap.height!==n)&&(this.shadowMap?.destroy(),this.shadowMap=r.createTexture({size:[t,n],format:Bu,usage:$.RENDER_ATTACHMENT|$.TEXTURE_BINDING}));let i=r.createCommandEncoder(),a=i.beginRenderPass({colorAttachments:[],depthStencilAttachment:{view:this.shadowMap.createView(),depthClearValue:1,depthLoadOp:`clear`,depthStoreOp:`store`}});return this.arenaUsed=0,this.pass={target:`shadow`,flipped:!0,encoder:i,pass:a,samples:1},this.shadowMap}endPass(){let{encoder:e,pass:t,target:n}=this.pass;t.end(),n===`canvas`&&this._present(e),this.arenaUsed>0&&this.device.queue.writeBuffer(this.arena,0,this.arenaData,0,this.arenaUsed),this.device.queue.submit([e.finish()]),n===`transmission`&&this._generateMipmaps(this.transmission.texture,`rgba16float`),this.pass=null}draw(e){let t=this.pass,n=this._pipeline(e);if(t.pass.setPipeline(n),e.key.kind===`custom`){let n=this._alloc(Uu);this._packObject(n,e);let r=Mu(e.material),i=this._alloc(Math.max(16,$u(r)));this._packCustom(i,r,e.material),t.pass.setBindGroup(0,this._customGroup(),[n,i])}else{let n=this._alloc(Hu);this._packDraw(n,e),t.pass.setBindGroup(0,t.frameGroup),t.pass.setBindGroup(1,this._drawGroup(e.textures),[n])}this._geometry(n.attributes,e.geometry),this._submit(e)}drawDepth(e){let t=this.pass,n=this._depthPipeline(e.cull);t.pass.setPipeline(n);let r=this._alloc(128);this.arenaF32.set(e.modelViewMatrix,r/4),this.arenaF32.set(qu(e.projectionMatrix,!0),r/4+16),t.pass.setBindGroup(0,this.depthGroup,[r]),this._geometry([`position`],e.geometry),this._submit(e)}_submit({geometry:e,start:t,count:n}){let r=this.pass.pass,i=e.index;if(i!==null){let e=this._buffer(i,Q.INDEX,!0);r.setIndexBuffer(e.buffer,i.array.BYTES_PER_ELEMENT===4?`uint32`:`uint16`),r.drawIndexed(n,1,t)}else r.draw(n,1,t)}_geometry(e,t){let n=this.pass.pass;e.forEach((e,r)=>{let i=t.attributes[e];i?n.setVertexBuffer(r,this._buffer(i,Q.VERTEX,!1).buffer):n.setVertexBuffer(r,this.zero)})}_alloc(e){let t=this.arenaUsed;if(this.arenaUsed=Ju(t+e,Gu),this.arenaUsed>Wu)throw Error(`gfx: too many draws in one pass`);return t}_packFrame(e,t,n){let r=new Float32Array(Vu/4),i=e.camera;if(r.set(i.viewMatrix,0),r.set(qu(i.projectionMatrix,t),16),r.set(i.projectionMatrix,32),e.shadow&&r.set(e.shadow.matrix,48),r.set(i.position,64),r[67]=+!!i.isOrthographic,r.set(e.ambient,68),r[71]=t?1:-1,e.shadow&&(r.set([e.shadow.intensity,e.shadow.bias,e.shadow.radius,0],72),r.set(e.shadow.mapSize,76),r[82]=e.shadow.normalBias),e.transmission&&r.set(e.transmission.size,78),r[80]=n,r[81]=+!!t,e.directional.length>8||e.point.length>8||e.hemi.length>4)throw Error(`gfx: too many lights`);return e.directional.forEach((e,t)=>{r.set(e.direction,84+t*4),r.set(e.color,116+t*4)}),e.point.forEach((e,t)=>{r.set([...e.position,e.distance],148+t*4),r.set([...e.color,e.decay],180+t*4)}),e.hemi.forEach((e,t)=>{r.set(e.direction,212+t*4),r.set(e.skyColor,228+t*4),r.set(e.groundColor,244+t*4)}),r}_packDraw(e,{object:t,params:n}){let r=this.arenaF32,i=e/4;r.fill(0,i,i+Hu/4),r.set(t.modelMatrix,i),r.set(t.modelViewMatrix,i+16),ed(r,i+32,t.normalMatrix),ed(r,i+44,n.mapTransform??Xu),ed(r,i+56,n.bumpMapTransform??Xu),r.set(n.diffuse??n.color,i+68),r[i+71]=n.opacity,n.emissive&&r.set(n.emissive,i+72),r[i+75]=n.roughness??1,r.set(n.specularColor??[1,1,1],i+76),r[i+79]=n.metalness??0,r.set(n.sheenColor??[0,0,0],i+80),r[i+83]=n.sheenRoughness??1,r.set(n.attenuationColor??[1,1,1],i+84);let a=Number.isFinite(n.attenuationDistance);r[i+87]=a?n.attenuationDistance:0,r[i+88]=n.ior??1.5,r[i+89]=n.specularIntensity??1,r[i+90]=n.clearcoat??0,r[i+91]=n.clearcoatRoughness??0,r[i+92]=n.iridescence??0,r[i+93]=n.iridescenceIOR??1.3,r[i+94]=n.iridescenceThicknessMaximum??400,r[i+95]=n.transmission??0,r[i+96]=n.thickness??0,r[i+97]=n.bumpScale??1,r[i+98]=n.envMapIntensity??1,r[i+99]=n.receiveShadow??0,r.set(n.center??[.5,.5],i+100),r[i+102]=n.rotation??0,r[i+103]=+!!a,ed(r,i+104,n.envMapRotation??Xu)}_packObject(e,t){let n=this.arenaF32,r=e/4,i=this.pass.frame;n.set(t.object.modelMatrix,r),n.set(t.object.modelViewMatrix,r+16),n.set(qu(i.camera.projectionMatrix,this.pass.flipped),r+32),n.set(i.camera.viewMatrix,r+48),ed(n,r+64,t.object.normalMatrix),n.set(i.camera.position,r+76)}_packCustom(e,t,n){let r=this.arenaF32,i=e;for(let[e,a]of t){let{value:t}=n.uniforms[e];i=Ju(i,Zu[a]);let o=i/4;a===`f32`?r[o]=t:a===`vec2f`?r.set([t.x,t.y],o):a===`vec3f`?r.set(t.isColor?[t.r,t.g,t.b]:[t.x,t.y,t.z],o):a===`mat4x4f`&&r.set(t.elements,o),i+=Qu[a]}}_module(e){let t=this.modules.get(e);return t||(t=this.device.createShaderModule({code:e}),this.modules.set(e,t)),t}_pipeline(e){let{key:t,state:n,topology:r,geometry:i,material:a}=e,o=this.pass,s=n.cull===`front`!==o.flipped,c=td(t),l=c.map(e=>i.attributes[e]?i.attributes[e].itemSize:0).join(`,`),u=`${fl(t)}|${t.kind===`custom`?a.version:``}|${n.blending}|${n.depthTest}|${n.depthWrite}|${n.colorWrite}|${n.cull}|${s}|${r}|${o.format}|${l}`,d=this.pipelines.get(u);if(d)return d;let f=this._module(ju(t,a)),p=n.blending===`normal`?{color:{srcFactor:`src-alpha`,dstFactor:`one-minus-src-alpha`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`}}:n.blending===`additive`?{color:{srcFactor:`src-alpha`,dstFactor:`one`},alpha:{srcFactor:`one`,dstFactor:`one`}}:void 0;return d=this.device.createRenderPipeline({layout:t.kind===`custom`?this.device.createPipelineLayout({bindGroupLayouts:[this.customLayout]}):this.builtinLayout,vertex:{module:f,entryPoint:`vs`,buffers:c.map(e=>{let t=i.attributes[e],n=t?t.itemSize:e===`uv`?2:3;return{arrayStride:t?n*4:0,attributes:[{shaderLocation:Ku[e],offset:0,format:n===2?`float32x2`:n===4?`float32x4`:`float32x3`}]}})},fragment:{module:f,entryPoint:`fs`,targets:[{format:o.format,blend:p,writeMask:n.colorWrite?GPUColorWrite.ALL:0}]},primitive:{topology:r===`lines`?`line-list`:r===`line-strip`?`line-strip`:`triangle-list`,cullMode:n.cull===`none`?`none`:`back`,frontFace:s?`cw`:`ccw`},depthStencil:{format:Bu,depthWriteEnabled:n.depthTest&&n.depthWrite,depthCompare:n.depthTest?`less-equal`:`always`},multisample:{count:o.samples}}),d.attributes=c,this.pipelines.set(u,d),d}_depthPipeline(e){let t=`depth|${e}`,n=this.pipelines.get(t);if(n)return n;let r=this._module(Iu());return n=this.device.createRenderPipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[this.depthLayout]}),vertex:{module:r,entryPoint:`vs`,buffers:[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:`float32x3`}]}]},primitive:{topology:`triangle-list`,cullMode:e===`none`?`none`:`back`,frontFace:e===`front`?`ccw`:`cw`},depthStencil:{format:Bu,depthWriteEnabled:!0,depthCompare:`less-equal`}}),this.pipelines.set(t,n),n}_drawGroup(e){let t=e.map?this._texture(e.map):null,n=e.bumpMap?this._texture(e.bumpMap):null,r=`${t?.id??`-`}|${n?.id??`-`}`,i=this.drawGroups.get(r);return i||(i=this.device.createBindGroup({layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.arena,size:Hu}},{binding:1,resource:(t?t.texture:this.dummy2D).createView()},{binding:2,resource:t?t.sampler:this.linear},{binding:3,resource:(n?n.texture:this.dummy2D).createView()},{binding:4,resource:n?n.sampler:this.linear}]}),this.drawGroups.set(r,i)),i}_customGroup(){return this.customGroup||=this.device.createBindGroup({layout:this.customLayout,entries:[{binding:0,resource:{buffer:this.arena,size:Uu}},{binding:1,resource:{buffer:this.arena,size:256}}]}),this.customGroup}syncGeometry(e){for(let t of Object.keys(Ku)){let n=e.attributes[t];n&&this._buffer(n,Q.VERTEX,!0)}}_buffer(e,t,n){let r=this.buffers.get(e),i=e.array instanceof Float64Array?new Float32Array(e.array):e.array,a=Ju(i.byteLength,4);if((!r||r.size!==a)&&(r?.buffer.destroy(),r={buffer:this.device.createBuffer({size:a,usage:t|Q.COPY_DST}),version:-1,size:a},this.buffers.set(e,r)),r.version!==e.version&&(n||r.version===-1)){if(i.byteLength%4==0)this.device.queue.writeBuffer(r.buffer,0,i.buffer,i.byteOffset,i.byteLength);else{let e=new Uint8Array(a);e.set(new Uint8Array(i.buffer,i.byteOffset,i.byteLength)),this.device.queue.writeBuffer(r.buffer,0,e)}r.version=e.version}return r}_texture(e){let t=this.textures.get(e);if(t||(t={id:e.id,version:-1},this.textures.set(e,t),e.addEventListener(`dispose`,()=>{t.texture?.destroy(),this.textures.delete(e)})),t.version!==e.version&&e.image){let n=e.image,r=e.generateMipmaps&&e.minFilter===1008,i=r?Math.floor(Math.log2(Math.max(n.width,n.height)))+1:1,a=e.colorSpace===`srgb`?`rgba8unorm-srgb`:`rgba8unorm`;t.texture?.destroy(),t.texture=this.device.createTexture({size:[n.width,n.height],format:a,mipLevelCount:i,usage:$.TEXTURE_BINDING|$.COPY_DST|$.RENDER_ATTACHMENT}),this.device.queue.copyExternalImageToTexture({source:n,flipY:e.flipY},{texture:t.texture,premultipliedAlpha:e.premultiplyAlpha},[n.width,n.height]),r&&this._generateMipmaps(t.texture,a),t.sampler=this._sampler(r,e.anisotropy),t.version=e.version,t.id=`${e.id}.${e.version}`,this.drawGroups.clear()}return t}_sampler(e,t){let n=`${e}|${t}`,r=this.samplers.get(n);return r||(r=this.device.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:e?`linear`:`nearest`,maxAnisotropy:e&&t>1?Math.min(16,t):1,lodMaxClamp:e?32:0}),this.samplers.set(n,r)),r}_generateMipmaps(e,t){let n=this.device,r=this.mipPipelines.get(t);if(!r){let e=this._module(Lu());r=n.createRenderPipeline({layout:`auto`,vertex:{module:e,entryPoint:`vs`},fragment:{module:e,entryPoint:`fs`,targets:[{format:t}]},primitive:{topology:`triangle-list`}}),this.mipPipelines.set(t,r)}let i=n.createCommandEncoder();for(let t=1;t<e.mipLevelCount;t++){let a=n.createBindGroup({layout:r.getBindGroupLayout(0),entries:[{binding:0,resource:e.createView({baseMipLevel:t-1,mipLevelCount:1})},{binding:1,resource:this.linear}]}),o=i.beginRenderPass({colorAttachments:[{view:e.createView({baseMipLevel:t,mipLevelCount:1}),loadOp:`clear`,storeOp:`store`,clearValue:{r:0,g:0,b:0,a:0}}]});o.setPipeline(r),o.setBindGroup(0,a),o.draw(3),o.end()}n.queue.submit([i.finish()])}_dfgTexture(){let e=this.device.createTexture({size:[16,16],format:`rg16float`,usage:$.TEXTURE_BINDING|$.COPY_DST});return this.device.queue.writeTexture({texture:e},pl,{bytesPerRow:64},[16,16]),e}_solidTexture(){let e=this.device.createTexture({size:[1,1],format:`rgba8unorm`,usage:$.TEXTURE_BINDING|$.COPY_DST});return this.device.queue.writeTexture({texture:e},new Uint8Array([0,0,0,0]),{bytesPerRow:4},[1,1]),e}_clearDepth(e){let t=this.device.createCommandEncoder();t.beginRenderPass({colorAttachments:[],depthStencilAttachment:{view:e.createView(),depthClearValue:1,depthLoadOp:`clear`,depthStoreOp:`store`}}).end(),this.device.queue.submit([t.finish()])}_canvasTargets(){let e=this.canvasTargets;if(e&&e.width===this.width&&e.height===this.height)return e;e?.msaa.destroy(),e?.depth.destroy(),e?.resolve.destroy();let t=[this.width,this.height],n=this.device.createTexture({size:t,format:this.format,usage:$.RENDER_ATTACHMENT|$.TEXTURE_BINDING});return this.canvasTargets={width:this.width,height:this.height,resolve:n,msaa:this.device.createTexture({size:t,format:this.format,sampleCount:zu,usage:$.RENDER_ATTACHMENT}),depth:this.device.createTexture({size:t,format:Bu,sampleCount:zu,usage:$.RENDER_ATTACHMENT}),presentGroup:null},this.canvasTargets}_present(e){let t=this.device;if(!this.presentPipeline){let e=this._module(Ru());this.presentPipeline=t.createRenderPipeline({layout:`auto`,vertex:{module:e,entryPoint:`vs`},fragment:{module:e,entryPoint:`fs`,targets:[{format:this.format}]},primitive:{topology:`triangle-list`}})}let n=this.canvasTargets;n.presentGroup??=t.createBindGroup({layout:this.presentPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:n.resolve.createView()}]});let r=e.beginRenderPass({colorAttachments:[{view:this.context.getCurrentTexture().createView(),loadOp:`clear`,storeOp:`store`,clearValue:{r:0,g:0,b:0,a:0}}]});r.setPipeline(this.presentPipeline),r.setBindGroup(0,n.presentGroup),r.draw(3),r.end()}_transmissionTarget(){let e=this.transmission;if(e&&e.width===this.width&&e.height===this.height)return e;e?.texture.destroy(),e?.msaa.destroy(),e?.depth.destroy();let t=[this.width,this.height],n=Math.floor(Math.log2(Math.max(this.width,this.height)))+1;return this.transmission={width:this.width,height:this.height,texture:this.device.createTexture({size:t,format:`rgba16float`,mipLevelCount:n,usage:$.RENDER_ATTACHMENT|$.TEXTURE_BINDING}),msaa:this.device.createTexture({size:t,format:`rgba16float`,sampleCount:zu,usage:$.RENDER_ATTACHMENT}),depth:this.device.createTexture({size:t,format:Bu,sampleCount:zu,usage:$.RENDER_ATTACHMENT})},this.transmission}prefilterEquirectangular(e){let t=this.device,n=Kc(e.image.width),r=qc(n.lodMax),i=()=>t.createTexture({size:[n.width,n.height],format:`rgba16float`,usage:$.RENDER_ATTACHMENT|$.TEXTURE_BINDING}),a=i(),o=i(),s=this._texture(e),c=r.map(e=>{let n=t.createBuffer({size:e.position.byteLength,usage:Q.VERTEX|Q.COPY_DST});t.queue.writeBuffer(n,0,e.position);let r=t.createBuffer({size:e.outputDirection.byteLength,usage:Q.VERTEX|Q.COPY_DST});return t.queue.writeBuffer(r,0,e.outputDirection),[n,r]}),l=[{arrayStride:12,attributes:[{shaderLocation:0,offset:0,format:`float32x3`}]},{arrayStride:12,attributes:[{shaderLocation:4,offset:0,format:`float32x3`}]}],u=e=>{let n=this._module(e);return t.createRenderPipeline({layout:`auto`,vertex:{module:n,entryPoint:`vs`,buffers:l},fragment:{module:n,entryPoint:`fs`,targets:[{format:`rgba16float`}]},primitive:{topology:`triangle-list`}})},d=u(Pu()),f=u(Fu(n)),p=(e,n,r,i,a,o)=>{let s=t.createCommandEncoder(),l=s.beginRenderPass({colorAttachments:[{view:n.createView(),loadOp:o?`load`:`clear`,storeOp:`store`,clearValue:{r:0,g:0,b:0,a:0}}]});l.setPipeline(e),l.setBindGroup(0,t.createBindGroup({layout:e.getBindGroupLayout(0),entries:r})),l.setViewport(a[0],a[1],a[2],a[3],0,1),l.setScissorRect(a[0],a[1],a[2],a[3]),l.setVertexBuffer(0,c[i][0]),l.setVertexBuffer(1,c[i][1]),l.draw(36),l.end(),t.queue.submit([s.finish()])};p(d,a,[{binding:0,resource:s.texture.createView()},{binding:1,resource:s.sampler}],0,[0,0,3*n.cubeSize,2*n.cubeSize],!1);let m=!1;for(let e of Jc(n,r)){let n=e.source===`atlas`?a:o,r=e.target===`atlas`?a:o,i=t.createBuffer({size:16,usage:Q.UNIFORM|Q.COPY_DST});t.queue.writeBuffer(i,0,new Float32Array([e.roughness,e.mipInt,0,0])),p(f,r,[{binding:0,resource:n.createView()},{binding:1,resource:this.linear},{binding:2,resource:{buffer:i}}],e.plane,e.viewport,r===a||m),r===o&&(m=!0)}for(let[e,t]of c)e.destroy(),t.destroy();return o.destroy(),{isCubeUVTexture:!0,texelWidth:n.texelWidth,texelHeight:n.texelHeight,maxMip:n.maxMip,gpu:{texture:a},dispose:()=>a.destroy()}}},Xu=[1,0,0,0,1,0,0,0,1],Zu={f32:4,vec2f:8,vec3f:16,mat4x4f:16},Qu={f32:4,vec2f:8,vec3f:12,mat4x4f:64};function $u(e){let t=0,n=4;for(let[,r]of e)t=Ju(t,Zu[r])+Qu[r],n=Math.max(n,Zu[r]);return Ju(t,n)}function ed(e,t,n){e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+4]=n[3],e[t+5]=n[4],e[t+6]=n[5],e[t+8]=n[6],e[t+9]=n[7],e[t+10]=n[8]}function td(e){switch(e.kind){case`standard`:return[`position`,`normal`,...e.map||e.bumpMap?[`uv`]:[],...e.vertexColors?[`color`]:[]];case`basic`:return[`position`,...e.map?[`uv`]:[],...e.vertexColors?[`color`]:[]];case`sprite`:return[`position`,...e.map?[`uv`]:[]];case`shadow`:return[`position`,`normal`];case`custom`:return[`position`,`normal`,`uv`];default:return[`position`]}}var nd=Object.freeze({distance:13,fov:36}),rd=new q(-.3,1,.6).normalize(),id=4;async function ad(e){if(e!==`webgl`&&typeof navigator<`u`&&navigator.gpu){let t=document.createElement(`canvas`);try{return new sl(await Yu.create(t),t)}catch(t){if(e===`webgpu`)throw t;console.warn(`dungeon-roller: WebGPU unavailable, falling back to WebGL 2.`,t)}}let t=document.createElement(`canvas`);return new sl(new $l(t),t)}function od(e=1024){let t=e/2,n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`);if(!r)return null;let i=r.createLinearGradient(0,0,0,t);i.addColorStop(0,`#3c4250`),i.addColorStop(.3,`#1b1d24`),i.addColorStop(.55,`#100d0c`),i.addColorStop(1,`#050404`),r.fillStyle=i,r.fillRect(0,0,e,t),r.globalCompositeOperation=`lighter`;let a=(e,t,n,i)=>{let a=r.createRadialGradient(e,t,0,e,t,n);a.addColorStop(0,i),a.addColorStop(1,`rgba(0,0,0,0)`),r.fillStyle=a,r.fillRect(e-n,t-n,n*2,n*2)};a(e*.25,t*.1,t*.18,`rgba(200, 215, 255, 0.55)`);for(let n=0;n<6;n++)a(e*(.08+n*.17),t*.48,t*.06,`rgba(255, 150, 60, 0.7)`);return r.globalCompositeOperation=`source-over`,n}function sd(e=1024){let t=e/2,n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`);if(!r)return null;let i=r.createLinearGradient(0,0,0,t);return i.addColorStop(0,`#000000`),i.addColorStop(.45,`#050407`),i.addColorStop(.62,`#0d0708`),i.addColorStop(.85,`#1c0b07`),i.addColorStop(1,`#2a0f06`),r.fillStyle=i,r.fillRect(0,0,e,t),n}async function cd(e){let t=new URLSearchParams(globalThis.location?.search??``).get(`renderer`),n=await ad(t);n.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.shadowMap.enabled=!0,n.shadowMap.type=1,e.appendChild(n.domElement);let r=new vs,i=new qs(nd.fov,1,.3,400);n.isWebGPU&&t!==`webgpu`&&(n.backend.onLost=()=>{let e=n.domElement,t=document.createElement(`canvas`);try{n.setBackend(new $l(t),t),e.replaceWith(t),console.warn(`dungeon-roller: the GPU went away; carrying on with WebGL 2.`)}catch(e){console.error(`dungeon-roller: the GPU went away and WebGL 2 is not available.`,e)}}),r.add(new Zs(9082560,1708560,.55));let a=new $s(13161215,.9);a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.bias=-3e-4,a.shadow.normalBias=.02;let o=0,s=e=>{let t=Math.ceil(14*Math.max(1,e));t!==o&&(o=t,Object.assign(a.shadow.camera,{left:-o,right:o,top:o,bottom:-o,near:1,far:100+o*2}),a.shadow.camera.updateProjectionMatrix())};s(1),r.add(a,a.target);let c=new ec(16767392,9,7.5,1.6);r.add(c);let l=Array.from({length:id},()=>{let e=new ec(16751178,0,6,1.7);return r.add(e),e}),u=[],d=sd(),f=d?new rc(d):null;f&&(f.colorSpace=ts);let p=new Rs(new gc(300,64,32),new sc({name:`backdrop`,map:f,color:new Fo(f?`#ffffff`:`#050407`),side:1,depthWrite:!1}));p.renderOrder=-1,p.frustumCulled=!1,p.onBeforeRender=(e,t,n)=>{p.position.copy(n.position),p.updateMatrixWorld()},r.add(p);let m=od();if(m){let e=new nc(m);e.mapping=303,e.colorSpace=ts,e.needsUpdate=!0;let t=new Uc(n);r.environment=t.fromEquirectangular(e).texture,t.dispose()}let h={GFX:Hc,renderer:n,scene:r,camera:i,key:a,view:qa(),target:new q,die:new q,time:0,setTorches(e){u=e.map((e,t)=>({at:e,seed:t*1.91}))}},g=new q;h.look=()=>{let t=e.clientWidth||1,n=e.clientHeight||1;i.aspect=t/n,i.fov=nd.fov*Math.max(1,Math.min(1.75,.8*n/t)),i.updateProjectionMatrix(),g.set(...h.view.direction()),i.position.copy(h.target).addScaledVector(g,nd.distance*h.view.zoom),s(h.view.zoom),i.lookAt(h.target),i.updateMatrixWorld(),a.position.copy(h.target).addScaledVector(rd,45+o),a.target.position.copy(h.target),a.target.updateMatrixWorld(),c.position.set(h.die.x,h.die.y+1.6,h.die.z);let r=u.map(e=>({t:e,d:Math.hypot(e.at[0]-h.die.x,e.at[2]-h.die.z)})).sort((e,t)=>e.d-t.d).slice(0,id);l.forEach((e,t)=>{let n=r[t];if(!n){e.intensity=0;return}e.position.set(...n.t.at),e.position.y+=.15,e.intensity=7*Math.max(0,Math.min(1,(16-n.d)/6))*Pi(h.time,n.t.seed)})};let _=()=>n.setSize(e.clientWidth||1,e.clientHeight||1);return _(),new ResizeObserver(_).observe(e),h.render=()=>n.render(r,i),h}var ld=`dungeon-roller.v1`;function ud(e=globalThis.localStorage){let t={best:0,reached:0};try{let n=JSON.parse(e?.getItem(ld)??`null`);n&&typeof n==`object`&&(t.best=Number.isFinite(n.best)?n.best:0,t.reached=Number.isInteger(n.reached)?n.reached:0)}catch{}let n=()=>{try{e?.setItem(ld,JSON.stringify(t))}catch{}return{...t}};return{load:()=>({...t}),reached(e){return t={...t,reached:Math.max(t.reached,e)},n()},record(e){return t={...t,best:Math.max(t.best,e),last:e},n()}}}Mr();var dd=document.getElementById(`view`),fd=u(),pd=()=>fd.wake();addEventListener(`pointerdown`,pd),addEventListener(`keydown`,pd);var md=null,hd=mo(document.body,{onStart:e=>{fd.wake(),md?.startRun(e)}});hd.muted(fd.muted),document.getElementById(`mute`).addEventListener(`mute`,()=>hd.muted(fd.toggleMute())),document.getElementById(`start`).addEventListener(`click`,e=>{e.stopPropagation(),fd.wake(),md?.startRun(0)});var gd=So(dd,{anchor:()=>md?.dieOnScreen(dd.getBoundingClientRect())});try{let e=await cd(dd);md=uo({stage:e,hud:hd,input:gd,audio:fd,storage:ud()}),globalThis.dungeonRoller=md;let t=performance.now();e.renderer.setAnimationLoop(n=>{let r=Math.min(.1,Math.max(0,(n-t)/1e3));t=n,md.update(r,gd.take()),e.look(),e.render()})}catch(e){let t=document.getElementById(`error`);t.hidden=!1,t.textContent=`The game could not start: this browser offers neither WebGPU nor WebGL 2.

`+String(e&&e.message?e.message:e),console.error(e)}
//# sourceMappingURL=index-BWyYo0XQ.js.map