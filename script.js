const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

});

const elementosReveal = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver((entradas)=>{

    entradas.forEach(entrada=>{

        if(entrada.isIntersecting){

            entrada.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});


elementosReveal.forEach(elemento=>{
    observer.observe(elemento);
});

const counters = document.querySelectorAll(".counter");


const counterObserver = new IntersectionObserver((entradas)=>{

    entradas.forEach(entrada=>{

        if(entrada.isIntersecting){

            const counter = entrada.target;

            const objetivo = +counter.dataset.target;

            let inicio = 0;

            const velocidad = objetivo / 100;


            const actualizar = ()=>{

                inicio += velocidad;


                if(inicio < objetivo){

                    counter.innerHTML = Math.floor(inicio);

                    requestAnimationFrame(actualizar);

                }else{

                    counter.innerHTML = objetivo + "+";

                }

            };


            actualizar();


            counterObserver.unobserve(counter);

        }

    });

},{
    threshold:0.7
});


counters.forEach(counter=>{
    counterObserver.observe(counter);
});

const galleryImages = document.querySelectorAll(".gallery-img");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal img");
const closeModal = document.querySelector(".close");


galleryImages.forEach(img=>{

    img.addEventListener("click",()=>{

        modal.style.display="flex";

        modalImg.src = img.src;

    });

});



closeModal.addEventListener("click",()=>{

    modal.style.display="none";

});



modal.addEventListener("click",(e)=>{

    if(e.target === modal){

        modal.style.display="none";

    }

});

const hero = document.querySelector(".hero");


window.addEventListener("scroll",()=>{

    let movimiento = window.scrollY * 0.3;

    hero.style.backgroundPositionY = movimiento + "px";

});

const botones = document.querySelectorAll(".card button");


botones.forEach(boton=>{

    boton.addEventListener("click",()=>{

        boton.innerHTML="Explorando 🌱";

        boton.style.background="#e9a62c";


        setTimeout(()=>{

            boton.innerHTML="Descubrir";

            boton.style.background="#2f7d46";

        },2000);

    });

});

window.addEventListener("load",()=>{

    console.log(
        "🌿 Bienvenido a Botánica Verde - Jardín Botánico"
    );

});