"use strict";

//Модальное окно
const btnShowModal = document.querySelectorAll(".btn--show-modal");
const modal = document.querySelector(".modal");

function openModal() {
    btnShowModal.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.remove("hidden");
        });
    });
}

openModal();

function closeModal() {
    document
        .querySelector(".btn--close-modal")
        .addEventListener("click", () => modal.classList.add("hidden"));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.add("hidden");
        }
    });
}

closeModal();

//Получение координат
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");

btnScroll.addEventListener("click", function () {
    section1.scrollIntoView({ behavior: "smooth" });
});

//Делегирования событий +
const navLinksContainer = document.querySelector(".nav__links");
const navLinks = document.querySelectorAll(".nav__link");

navLinksContainer.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
});

//Создание табов

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const clicked = e.target.closest(".operations__tab");
    if (!clicked) return;

    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");

    tabsContent.forEach((contant) =>
        contant.classList.remove("operations__content--active")
    );

    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add("operations__content--active");
});

//Opacity для nav
function hover(e, opacity) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest("nav").querySelector(".nav__logo");

        siblings.forEach((sibling) => {
            if (sibling !== link) {
                sibling.style.opacity = opacity;
            }
        });
        logo.style.opacity = opacity;
    }
}

navLinksContainer.addEventListener("mouseover", (e) => hover(e, 0.5));
navLinksContainer.addEventListener("mouseout", (e) => hover(e, 1));

//Появление меню после прокрутки
//Используем Intersection Observer API

function callBack(entries) {
    if (!entries[0].isIntersecting) {
        document.querySelector(".nav").classList.add("sticky");
    } else {
        document.querySelector(".nav").classList.remove("sticky");
    }
}
const options = {
    root: null, // отслеживается в window по умолчанию
    threshold: 0, //% от отслеживаемой секции
    rootMargin: "-90px", //уменьшить margin показа
};

const observer = new IntersectionObserver(callBack, options); //создание API
observer.observe(document.querySelector(".header")); //то, за чем мы следим

//Всплытие секций
const sections = document.querySelectorAll(".section");

function revealSection(entries, observe) {
    if (entries[0].isIntersecting) {
        entries[0].target.classList.remove("section--hidden");
        observer.unobserve(entries[0].target);
    }
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    target: 0.51,
});

sections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});

//Работа с img
const imgs = document.querySelectorAll(".lazy-img");

const observerImg = new IntersectionObserver(lazyImg, {
    root: null,
    threshold: 0.1,
});

function lazyImg(entries) {
    if (entries[0].isIntersecting) {
        entries[0].target.classList.remove("lazy-img");
        const dataImg = entries[0].target.dataset.src;
        entries[0].target.setAttribute("src", dataImg);
    } else {
        entries[0].target.classList.add("lazy-img");
    }
}

imgs.forEach((img) => {
    observerImg.observe(img);
});

//Slider
const sliderContainer = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxSlides = slides.length;

function createDots(slide) {
    slides.forEach((_, i) => {
        dotsContainer.insertAdjacentHTML(
            "beforeend",
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
}

createDots();

function goToSlide(slide) {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
}

function activateDots(slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
        dot.classList.add("dots__dot--active");
    });
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
}

goToSlide(0);

function nextSlide() {
    currentSlide === maxSlides - 1 ? (currentSlide = 0) : currentSlide++;
    goToSlide(currentSlide);
    activateDots(currentSlide);
}

function prevSlide() {
    currentSlide === 0 ? (currentSlide = maxSlides - 1) : currentSlide--;
    goToSlide(currentSlide);
    activateDots(currentSlide);
}

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        nextSlide();
    } else if (e.key === "ArrowRight") {
        prevSlide();
    }
});

dotsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
        const slide = e.target.dataset.slide;
        activateDots(slide);
        goToSlide(slide);
    }
});
