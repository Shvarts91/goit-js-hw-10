import"./assets/styles-BNBc0Iyh.js";import{i as t}from"./assets/vendor-BbbuE1sJ.js";const r=document.querySelector(".form");function n({delay:e,state:s}){return new Promise((o,i)=>{setTimeout(()=>s==="fulfilled"?o(`✅ Fulfilled promise in ${e}ms`):i(`❌ Rejected promise in ${e}ms`),Number(e))})}function f(e){const s=n(e);console.log(s),s.then(o=>{t.show({message:o,messageSize:"16",messageColor:"#fff",backgroundColor:"#59a10d",position:"topRight",close:!1,progressBar:!1})}).catch(o=>{t.show({message:o,messageSize:"16",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",close:!1,progressBar:!1})})}r.addEventListener("submit",e=>{e.preventDefault();const s=new FormData(r),o=Object.fromEntries(s.entries());f(o),r.reset()});
//# sourceMappingURL=2-snackbar.js.map
