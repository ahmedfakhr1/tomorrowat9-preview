(function(){
 var tz='Europe/Lisbon';
 function now(){var p=new Intl.DateTimeFormat('en-GB',{timeZone:tz,hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()),h=0,m=0;p.forEach(function(x){if(x.type==='hour')h=+x.value%24;if(x.type==='minute')m=+x.value});return h*60+m}
 var t=now(),s=document.getElementById('status'),x=document.getElementById('stxt');
 if(s&&x){if(t>=480&&t<1020){s.classList.add('open');x.textContent='Open now, until 17:00'}else if(t<480){x.textContent='Opens today at 8:00'}else{x.textContent='Opens tomorrow at 8:00'}}
 var g=document.getElementById('greet');
 if(g){g.textContent=t<720?'Good morning.':t<1020?'Good afternoon.':'See you tomorrow at 9.'}
 var chips=[].slice.call(document.querySelectorAll('.chip'));
 if(chips.length&&'IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){chips.forEach(function(c){var on=c.getAttribute('href')==='#'+e.target.id;c.classList.toggle('on',on);if(on&&c.scrollIntoView){c.parentNode.scrollTo({left:c.offsetLeft-16,behavior:'smooth'})}})}})},{rootMargin:'-140px 0px -70% 0px'});
  document.querySelectorAll('.cat').forEach(function(c){io.observe(c)});
 }
})();
