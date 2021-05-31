import "normalize.css";
import "./styles.scss";

import {
    PageFlip
} from "page-flip";

let flipbook = document.querySelector(".js-flipbook");
let flipbookPages = flipbook.querySelector(".js-flipbook-pages");

function flipbookStatus(root) {
    let status = 0;
    let images = [].slice.call(root.querySelectorAll("img"));
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
    let flipBookContent = document.querySelector(".js-flipbook-content");
    let bookPageWidth = window.matchMedia("(max-width: 400px)").matches ? 290 : 400;

    const pageFlip = new PageFlip(flipbookPages, {
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
        let status = flipbookStatus(flipbook);

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

    document.querySelector(".js-flipbook-fullscreen-btn").addEventListener("click", function () {
        // fullscreen
        flipFullscreen.init();
        console.log("fullscreen");
    });

    // current page
    pageFlip.on("flip", (e) => {
        document.querySelector(".js-flipbook-current").innerText = e.data + 1;
    });
}

function FlipbookFullscreen(content) {
    let root = document.querySelector(".js-flipbook-fullscreen");
    let overlay = document.createElement("div");
    let wrap = document.createElement("div");
    let images = [].slice.call(document.querySelectorAll("img"));
    let pageFlip;
    images.forEach(function(img) {
        let page = document.createElement("div");
        page.append(img.cloneNode());
        wrap.append(page);
    });
    
    root.append(overlay);
    root.append(wrap);

    console.log(wrap)

    let init = () => {
        console.log("init");
        pageFlip = new PageFlip(wrap, {
            width: 500, // base page width
            height: 800, // base page height
            size: "stretch",
            maxShadowOpacity: 0.2, // Half shadow intensity
            showCover: true,
            mobileScrollSupport: false // disable content scrolling on mobile devices
        });
    }
    init();

    let close = () => {
        console.log("close");
    }

    overlay.addEventListener("click", function() {
        close();
    });
    
    return {
        init: init,
        open: function() {

        },
        close: close
    }
}

let flipFullscreen;
document.addEventListener("DOMContentLoaded", function () {
    initFlipbook();
    flipFullscreen = FlipbookFullscreen(flipbookPages);
});


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