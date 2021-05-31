import "normalize.css";
import "./styles.scss";

import {
    PageFlip
} from "page-flip";

let flipbook = document.querySelector(".js-flipbook");
function flipbookStatus() {
    let status = 0;
    let images = [].slice.call(document.querySelectorAll("img"));
    let imagesLoaded = 0;

    if (images.length) images.forEach(function (image) {
        if (image.complete) {
            imagesLoaded += 1;
        }

        status = (imagesLoaded * 100) / images.length
    });

    return status;
}

function flipbookLoader(status) {
    let loaderElement = document.querySelector(".js-flipbook-loader");
    loaderElement.style.width = status + "%";

    if (status >= 100) {
        setTimeout(function () {
            loaderElement.parentElement.classList.add("hide");
            flipbook.classList.add("active");
        }, 1000);
    }
}

function initFlipbook() {
    let demoBook = document.querySelector(".js-flipbook-pages");
    let flipBookContent = document.querySelector(".js-flipbook-content");
    let bookPageWidth = window.matchMedia("(max-width: 400px)").matches ? 290 : 400;

    const pageFlip = new PageFlip(demoBook, {
        width: bookPageWidth, // base page width
        height: flipBookContent.clientHeight, // base page height
        size: "fixed",
        maxHeight: 509,
        minHeight: 320,
        maxWidth: 800,
        minWidth: 320,

        maxShadowOpacity: 0.2, // Half shadow intensity
        showCover: true,
        mobileScrollSupport: false // disable content scrolling on mobile devices
    });

    let interval = setInterval(function () {
        let status = flipbookStatus();

        if (status >= 100) {
            console.log(status);
            clearInterval(interval);
        }
        flipbookLoader(status);
    }, 100);


    // load pages
    pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    // total pages
    document.querySelector(".js-flipbook-total").innerText = pageFlip.getPageCount();

    document.querySelector(".js-flipbook-prev").addEventListener("click", () => {
        pageFlip.flipPrev();
    });

    document.querySelector(".js-flipbook-next").addEventListener("click", () => {
        pageFlip.flipNext();
        pageFlip.update();
        console.log(pageFlip);
    });

    document.querySelector(".js-flipbook-fullscreen").addEventListener("click", function () {
        // fullscreen
        flipbookFullpage();
        console.log("fullscreen");
    });

    // current page
    pageFlip.on("flip", (e) => {
        document.querySelector(".js-flipbook-current").innerText = e.data + 1;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initFlipbook();
});

function flipbookFullscreen() {
    let fullpage = flipbook.querySelector(".js-flipbook-fullscreen");


}

// function FlipBook(obj) {
//     this.obj = obj || {};
// }

// let flipbookRoot = document.querySelector(".js-flipbook");

// const flpiBook = new FlipBook({
//     el: "",
//     pages: flipbookRoot.querySelectorAll(".page"),
//     settings: {
//         width: window.matchMedia("(max-width: 400px)").matches ? 290 : 400, // base page width
//         height: flipBookContent.clientHeight, // base page height
//         size: "fixed",
//         maxHeight: 509,
//         minHeight: 320,
//         maxWidth: 800,
//         minWidth: 320,

//         maxShadowOpacity: 0.2, // Half shadow intensity
//         showCover: true,
//         mobileScrollSupport: false // disable content scrolling on mobile devices
//     },
//     total: flipbookRoot.querySelector(".js-flipbook-total"),
//     current: flipbookRoot.querySelector(".js-flipbook-current"),
//     next: flipbookRoot.querySelector(".js-flipbook-next"),
//     prev: flipbookRoot.querySelector(".js-flipbook-prev"),
//     preloader: flipbookRoot.querySelector(".js-flipbook-loader")
// });