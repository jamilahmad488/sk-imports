const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");
if(menuBtn&&nav){menuBtn.addEventListener("click",()=>nav.classList.toggle("show"));}

const filterButtons=document.querySelectorAll(".filters button");
const cards=document.querySelectorAll(".shop-card");
filterButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    filterButtons.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const filter=btn.dataset.filter;
    cards.forEach(card=>{
      if(filter==="all" || card.dataset.category.includes(filter)){card.style.display="block";}
      else{card.style.display="none";}
    });
  });
});
