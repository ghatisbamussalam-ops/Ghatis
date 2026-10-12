(function(){
  var root=document.documentElement;
  function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function put(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  function setLang(l){
    root.lang=l; root.dir=(l==='ar')?'rtl':'ltr'; put('gb-lang',l);
    var t=document.querySelector('title'); if(t){var v=t.getAttribute('data-'+l); if(v)t.textContent=v}
    var b=document.getElementById('lang'); if(b)b.setAttribute('aria-label',l==='ar'?'Switch to English':'التبديل إلى العربية');
  }
  var saved=get('gb-lang'); if(saved==='ar'||saved==='en'){root.lang=saved; root.dir=saved==='ar'?'rtl':'ltr'}
  var th=get('gb-theme'); if(th==='dark'||th==='light')root.setAttribute('data-theme',th);

  document.addEventListener('DOMContentLoaded',function(){
    setLang(root.lang==='ar'?'ar':'en');
    var lb=document.getElementById('lang'); if(lb)lb.addEventListener('click',function(){setLang(root.lang==='ar'?'en':'ar')});
    var tb=document.getElementById('theme');
    if(tb)tb.addEventListener('click',function(){
      var cur=root.getAttribute('data-theme');
      var dark=cur==='dark'||(!cur&&matchMedia('(prefers-color-scheme: dark)').matches);
      var next=dark?'light':'dark'; root.setAttribute('data-theme',next); put('gb-theme',next);
    });
    document.querySelectorAll('[data-copy]').forEach(function(b){
      b.addEventListener('click',function(){
        var txt=b.getAttribute('data-copy'), lab=b.querySelector('.lab');
        var done=function(){ if(lab){var o=lab.innerHTML; lab.innerHTML='<span class="en">Copied</span><span class="ar">نُسخ</span>'; setTimeout(function(){lab.innerHTML=o},1600)} };
        try{ navigator.clipboard.writeText(txt).then(done,function(){sel(txt)}) }catch(e){sel(txt)}
        function sel(t){var m=document.getElementById('mail-text'); if(m){var r=document.createRange();r.selectNodeContents(m);var s=getSelection();s.removeAllRanges();s.addRange(r)}}
      });
    });
    var bar=document.getElementById('progress');
    if(bar){
      var tick=function(){var h=document.documentElement; var max=h.scrollHeight-h.clientHeight; bar.style.transform='scaleX('+(max>0?Math.min(1,h.scrollTop/max):0)+')'};
      addEventListener('scroll',tick,{passive:true}); tick();
    }
    var fb=document.querySelectorAll('.fbtn');
    if(fb.length){
      var st={fam:'all',theme:'all'};
      var apply=function(){
        var rows=document.querySelectorAll('.row[data-fam]'),n=0;
        rows.forEach(function(r){
          var th=(r.getAttribute('data-themes')||'').split(' ');
          var ok=(st.fam==='all'||r.getAttribute('data-fam')===st.fam)&&(st.theme==='all'||th.indexOf(st.theme)>-1);
          r.classList.toggle('is-hidden',!ok); if(ok)n++;
        });
        var c=document.getElementById('count'); if(c)c.textContent=n;
      };
      fb.forEach(function(b){b.addEventListener('click',function(){
        var g=b.getAttribute('data-g'); st[g]=b.getAttribute('data-v');
        document.querySelectorAll('.fbtn[data-g="'+g+'"]').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
        apply();
      })});
      apply();
    }
    var links=document.querySelectorAll('.toc a');
    if(links.length&&'IntersectionObserver' in window){
      var map={}; links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
      var io=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){links.forEach(function(a){a.classList.remove('on')}); var a=map[e.target.id]; if(a)a.classList.add('on')} });
      },{rootMargin:'-20% 0px -70% 0px'});
      Object.keys(map).forEach(function(id){var el=document.getElementById(id); if(el)io.observe(el)});
    }
  });
})();
