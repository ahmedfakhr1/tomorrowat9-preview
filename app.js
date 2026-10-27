(function(){
 var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 var tz='Europe/Lisbon';
 function now(){var p=new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()),h=0,m=0;p.forEach(function(x){if(x.type==='hour')h=+x.value%24;if(x.type==='minute')m=+x.value});return h*60+m}
 function span(min){var h=Math.floor(min/60),m=min%60;return (h?h+' h ':'')+m+' min'}
 var live=document.getElementById('live');
 function tick(){var t=now();if(live){if(t>=480&&t<1020)live.textContent='Open now. We close at 17:00, in '+span(1020-t)+'.';else if(t<480)live.textContent='Opens today at 8:00, in '+span(480-t)+'.';else live.textContent='Opens tomorrow at 8:00, in '+span(1440-t+480)+'.'}
  var g=document.getElementById('greet');if(g)g.textContent=t<720?'Good morning.':t<1020?'Good afternoon.':'See you tomorrow.'}
 tick();setInterval(tick,30000);
 var xf=document.getElementById('xf');
 if(xf&&!reduce){var im=xf.querySelectorAll('img'),i=0,tm=setInterval(function(){if(document.hidden)return;im[i].classList.remove('on');i=(i+1)%im.length;im[i].classList.add('on')},6000)}
 var rv=[].slice.call(document.querySelectorAll('.rv'));
 if('IntersectionObserver' in window&&!reduce){var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  rv.forEach(function(e,k){e.style.setProperty('--d',(k%3)*80+'ms');o.observe(e)});
  setTimeout(function(){rv.forEach(function(e){e.classList.add('in')})},2500)
 }else rv.forEach(function(e){e.classList.add('in')});
 var chips=[].slice.call(document.querySelectorAll('.chip'));
 if(chips.length&&'IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){chips.forEach(function(c){var on=c.getAttribute('href')==='#'+e.target.id;c.classList.toggle('on',on);if(on)c.setAttribute('aria-current','true');else c.removeAttribute('aria-current');if(on&&c.parentNode.scrollTo)c.parentNode.scrollTo({left:c.offsetLeft-16,behavior:reduce?'auto':'smooth'})})}})},{rootMargin:'-140px 0px -70% 0px'});
  document.querySelectorAll('.cat').forEach(function(c){io.observe(c)});
 }
})();
