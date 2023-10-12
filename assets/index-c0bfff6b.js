(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();function h(){let o=this.toLowerCase().split(" "),e=[];for(let s of o)e.push(s[1]);return e.join("")}String.prototype.idName=h;let u=class a{constructor(e){this._todoObj=e}id(){return this._todoObj.date.replaceAll(/[\/\s\.\-]/g,"")+this._todoObj.header.idName()}get(){let e=localStorage.getItem(this.id());return e||null}getValue(e){let s=this.get(),i=!1;if(s){for(let t of s.split(a.SYM_SPLIT))if(t.indexOf(e)>-1){i=t.split("-")[2],i=i==="1";break}}return i}set(){let e=[];this._todoObj.checklist.forEach((i,t)=>{let l=`${t+1}-${i.idName()}`,n=`${l}-input`,c=document.getElementById(n).hasAttribute("checked")?1:0,d=`${l}-${c}`;return e.push(d)});let s=e.join(a.SYM_SPLIT);return s?(localStorage.setItem(this.id(),s),!0):!1}};u.SYM_SPLIT="|";let m=class{static getJson(e,s){return fetch(e).then(i=>i.json()).then(i=>{if(s)return s(i)})}};window.Storage=u;window.Net=m;class p extends HTMLElement{get(){return this._}constructor(){super(),Net.getJson("filipvrba.github.io/todo-test/json/todo.json",e=>(this._todoObj=e,this._storage=new Storage(this._todoObj),this.initElm())),window.inputChange=this.inputChange.bind(this)}connectedCallback(){return null}disconnectedCallback(){return null}initElm(){let e=()=>{let i=[];return this._todoObj.checklist.forEach((t,r)=>{let n=`${r+1}-${t.idName()}`,c=`${n}-input`,d=this._storage.getValue(n)?"checked":"";i.push(`${`
<li id='${n}' class='list-group-item border-0 d-flex align-items-center ps-0'>
  <div class='form-check'>
    <input id='${c}' class='form-check-input me-3' onchange='inputChange("${c}")' type='checkbox' value='' aria-label='...' ${d} />
    <label class='form-check-label' for='${c}'>${t}</label>
  </div>
</li>
        `}`)}),i.join(`
`)},s=`${`
<div class='col col-lg-8 col-xl-6'>
  <div class='card rounded-3'>
    <div class='card-body p-4'>

      <p class='mb-2'><span class='h2 me-2'>${this._todoObj.header}</span> <span
      class='badge bg-danger'>checklist</span></p>
      <p class='text-muted pb-2'>${this._todoObj.date}</p>

      <ul class='list-group rounded-0'>
        ${e()} 
      </ul>
    </div>
  </div>
</div>
    `}`;return this.innerHTML=s}inputChange(e){let s=document.getElementById(e);return s.hasAttribute("checked")?s.removeAttribute("checked"):s.setAttribute("checked",""),this._storage.set()}}class f extends HTMLElement{constructor(){super(),this.initElm()}connectedCallback(){return null}disconnectedCallback(){return null}initElm(){let e=`
    <div class='container py-5 h-100'>
      <div class='row d-flex justify-content-center align-items-center h-100'>
        <elm-todo></elm-todo>
      </div>
    </div>
    `;return this.innerHTML=e}}window.customElements.define("elm-todo",p);window.customElements.define("elm-home",f);document.querySelector("#app").innerHTML="<elm-home></elm-home>";
