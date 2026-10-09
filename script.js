(function(){
var EMAIL="karkiprakash049@gmail.com";
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
/* status badge */
var st=$("#status");st.addEventListener("click",function(){var off=st.classList.toggle("off");st.setAttribute("aria-pressed",!off);$("#stxt").textContent=off?"Currently busy":"Available for work"});
/* theme */
$("#theme").addEventListener("click",function(){var r=document.documentElement;r.dataset.theme=r.dataset.theme==="dark"?"light":"dark"});
/* project filter */
var cards=$$(".card"),fs=$$(".f");
fs.forEach(function(b){b.addEventListener("click",function(){
fs.forEach(function(x){x.setAttribute("aria-pressed",x===b)});
var f=b.dataset.f;cards.forEach(function(c){var show=f==="all"||c.dataset.c.split(" ").indexOf(f)>-1;c.classList.toggle("hide",!show);c.classList.remove("in");if(show){void c.offsetWidth;c.classList.add("in")}});
$$(".tag").forEach(function(t){t.classList.remove("hl")})})});
/* cursor spotlight on cards */
cards.forEach(function(c){c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();c.style.setProperty("--x",(e.clientX-r.left)+"px");c.style.setProperty("--y",(e.clientY-r.top)+"px")})});
/* skill tag -> highlights matching projects */
$$("#skills .tag").forEach(function(t){t.addEventListener("mouseenter",function(){var k=t.textContent.toLowerCase();$$(".card .tag").forEach(function(x){x.classList.toggle("hl",x.textContent.toLowerCase()===k)})});t.addEventListener("mouseleave",function(){$$(".card .tag").forEach(function(x){x.classList.remove("hl")})})});
/* contact form */
var cf=$("#cf"),fh=$("#fh");
cf.addEventListener("submit",function(e){e.preventDefault();
var em=$("#em").value.trim(),ph=$("#ph").value.trim(),ms=$("#ms").value.trim();
if(!em||!/^\S+@\S+\.\S+$/.test(em)||!ph||!ms){fh.textContent="Please fill in a valid email, your phone number and a message.";(!em||!/^\S+@\S+\.\S+$/.test(em)?$("#em"):!ph?$("#ph"):$("#ms")).focus();return}
var sub="Portfolio message from "+em,body=ms+"\n\n---\nReply to: "+em+"\nPhone: "+ph;
var q="subject="+encodeURIComponent(sub)+"&body="+encodeURIComponent(body);
var gm="https://mail.google.com/mail/?view=cm&fs=1&to="+EMAIL+"&"+q;
window.open("mailto:"+EMAIL+"?"+q,"_top");
cf.reset();
fh.innerHTML='Form cleared. Your email app should have opened with your message. Nothing happened? <a href="'+gm+'" target="_blank" rel="noopener">Send with Gmail instead</a>.'});
/* copy email */
var cb=$("#copy"),timer;
function done(ok){cb.textContent=ok?"Copied!":"Press Ctrl+C";cb.classList.toggle("done",ok);clearTimeout(timer);timer=setTimeout(function(){cb.textContent="Copy email";cb.classList.remove("done")},2000)}
cb.addEventListener("click",function(){
function fb(){try{var t=document.createElement("textarea");t.value=EMAIL;t.style.position="fixed";t.style.opacity="0";document.body.appendChild(t);t.select();var ok=document.execCommand("copy");document.body.removeChild(t);done(ok)}catch(e){done(false)}}
try{if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(EMAIL).then(function(){done(true)},fb)}else fb()}catch(e){fb()}});
/* nav active link */
var links=$$("nav a"),secs=links.map(function(a){return $(a.getAttribute("href"))});
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id)})}})},{rootMargin:"-45% 0px -50% 0px"});secs.forEach(function(s){s&&io.observe(s)})}
})();
