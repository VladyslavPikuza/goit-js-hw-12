import{S as f,i}from"./assets/vendor-BrddEoy-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const m="46153478-1b8179550e9312780d25c3b1d";async function p(s){const o=`https://pixabay.com/api/?key=${m}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`;try{const r=await fetch(o);if(!r.ok)throw new Error("Failed to fetch images");return(await r.json()).hits}catch(r){throw console.error("Error fetching images:",r),r}}function y(s){const o=document.querySelector(".gallery"),r=s.map(({webformatURL:a,largeImageURL:e,tags:t,likes:n,views:l,comments:u,downloads:d})=>`
      <div class="photo-card">
        <a href="${e}">
          <img src="${a}" alt="${t}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${n}</p>
          <p><b>Views</b> ${l}</p>
          <p><b>Comments</b> ${u}</p>
          <p><b>Downloads</b> ${d}</p>
        </div>
      </div>`).join("");o.insertAdjacentHTML("beforeend",r)}function h(){const s=document.querySelector(".gallery");s.innerHTML=""}const g=document.querySelector("#search-form"),c=document.querySelector("#loader"),b=new f(".gallery a",{captionsData:"alt",captionDelay:250,close:!0});g.addEventListener("submit",async s=>{s.preventDefault();const o=s.target.elements.searchQuery.value.trim();if(h(),o===""){i.error({title:"Error",message:"Please enter a search query"});return}c.style.display="block";try{const r=await p(o);if(r.length===0){i.error({title:"No results",message:"No images found for your search query"});return}y(r),b.refresh()}catch{i.error({title:"Error",message:"Failed to fetch images"})}finally{c.style.display="none"}});
//# sourceMappingURL=index.js.map
