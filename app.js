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
