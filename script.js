const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const hero = document.querySelector(".hero");

/* Menú para celulares */
menuBtn.addEventListener("click", () => {
    const menuAbierto = navLinks.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", menuAbierto);
    menuBtn.setAttribute(
        "aria-label",
        menuAbierto ? "Cerrar menú" : "Abrir menú"
    );

    menuBtn.textContent = menuAbierto ? "×" : "☰";
});

/* Cerrar menú al seleccionar un enlace */
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Abrir menú");
        menuBtn.textContent = "☰";
    });
});

/* Cambiar la barra de navegación al desplazarse */
let scrollPendiente = false;

window.addEventListener("scroll", () => {
    if (!scrollPendiente) {
        window.requestAnimationFrame(() => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);

            /* Efecto de movimiento de la portada */
            if (window.innerWidth > 900) {
                const movimiento = window.scrollY * 0.18;
                hero.style.backgroundPositionY = `${movimiento}px`;
            }

            scrollPendiente = false;
        });

        scrollPendiente = true;
    }
});

/* Animaciones de aparición */
const elementosReveal = document.querySelectorAll(".reveal");

elementosReveal.forEach((elemento, indice) => {
    elemento.style.setProperty("--delay", `${(indice % 4) * 100}ms`);
});

const observer = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("show");
                observer.unobserve(entrada.target);
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    }
);

elementosReveal.forEach((elemento) => {
    observer.observe(elemento);
});

/* Contadores animados */
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;

            const counter = entrada.target;
            const objetivo = Number(counter.dataset.target);
            const duracion = 1600;
            const tiempoInicial = performance.now();

            const actualizar = (tiempoActual) => {
                const progreso = Math.min(
                    (tiempoActual - tiempoInicial) / duracion,
                    1
                );

                const progresoSuave = 1 - Math.pow(1 - progreso, 3);
                const valorActual = Math.floor(objetivo * progresoSuave);

                counter.textContent = valorActual.toLocaleString("es-ES");

                if (progreso < 1) {
                    requestAnimationFrame(actualizar);
                } else {
                    counter.textContent =
                        objetivo.toLocaleString("es-ES") + "+";
                }
            };

            requestAnimationFrame(actualizar);
            counterObserver.unobserve(counter);
        });
    },
    {
        threshold: 0.7
    }
);

counters.forEach((counter) => {
    counterObserver.observe(counter);
});

/* Galería y ventana modal */
const galleryImages = document.querySelectorAll(".gallery-img");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal img");
const closeModal = document.querySelector(".close");

const abrirModal = (imagen) => {
    modalImg.src = imagen.src;
    modalImg.alt = imagen.alt;

    modal.classList.add("active");
    document.body.classList.add("modal-open");
    closeModal.focus();
};

const cerrarModal = () => {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");

    setTimeout(() => {
        modalImg.src = "";
    }, 350);
};

galleryImages.forEach((img) => {
    img.setAttribute("tabindex", "0");

    img.addEventListener("click", () => {
        abrirModal(img);
    });

    img.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            abrirModal(img);
        }
    });
});

closeModal.addEventListener("click", cerrarModal);

modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        cerrarModal();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modal.classList.contains("active")) {
        cerrarModal();
    }
});

/* Botones de las colecciones */
const botones = document.querySelectorAll(".card button");

botones.forEach((boton) => {
    boton.addEventListener("click", () => {
        if (boton.disabled) return;

        const textoOriginal = boton.textContent;

        boton.disabled = true;
        boton.textContent = "Explorando 🌱";
        boton.style.background = "#dca72c";

        setTimeout(() => {
            boton.textContent = textoOriginal;
            boton.style.background = "";
            boton.disabled = false;
        }, 2000);
    });
});

window.addEventListener("load", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    console.log(
        "🌿 Bienvenido a Botánica Verde - Jardín Botánico"
    );
});