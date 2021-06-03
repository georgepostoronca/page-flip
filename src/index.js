import "normalize.css";
import "./styles.scss";

import {
    PageFlip
} from "page-flip";

let flipbook = document.querySelector(".js-flipbook");
let flipbookPages = flipbook.querySelector(".js-flipbook-pages");
let flipbookPagesClone = flipbookPages.cloneNode(true);

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

function createElement(tag, className) {
    let el = document.createElement(tag || "div");
    el.classList.add(className);
    return el;
}

function toggleModalFlipBook(bool) {
    if(bool) {
        document.querySelector(".flipFullscreen-modal").classList.add("active");
        document.body.style.overflow = "hidden";
    } else {
        document.querySelector(".flipFullscreen-modal").classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

function initFlipbook() {
    let flipBookContent = document.querySelector(".js-flipbook-content");
    let bookPageWidth = window.matchMedia("(max-width: 500px)").matches ? 290 : 350;

    const pageFlip = new PageFlip(flipbookPages, {
        width: bookPageWidth, // base page width
        height: flipBookContent.clientHeight, // base page height
        size: "fixed",
        maxWidth: 2000,
        minWidth: 260,
        maxHeight: 2000,
        minHeight: 200,

        maxShadowOpacity: 0.2, // Half shadow intensity
        showCover: true,
        mobileScrollSupport: false // disable content scrolling on mobile devices
    });

    let interval = setInterval(function () {
        let status = flipbookStatus(flipbook);

        if (status >= 100) {
            clearInterval(interval);
        }
        flipbookLoader(status);
    }, 100);


    // load pages
    pageFlip.loadFromHTML(flipbook.querySelectorAll(".page"));

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
        // flipFullscreen();
        // console.log("fullscreen");
        toggleModalFlipBook(true);
    });

    // current page
    pageFlip.on("flip", (e) => {
        document.querySelector(".js-flipbook-current").innerText = e.data + 1;
    });
}


initFlipbook();

function flipFullscreen() {
    const root = document.querySelector(".js-flipFullscreen");

    function template() {
        let wrap = createElement("div", "flipFullscreen__wrap");
        let content = createElement("div", "flipFullscreen__content");
        let footer = createElement("div", "flipFullscreen__footer");
        let layout = createElement("div", "flipFullscreen__layout")
        let close = createElement("div", "flipFullscreen__close");
        let closeSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path></svg>';

        wrap.append(content);
        wrap.append(footer);
        wrap.append(layout);
        close.innerHTML = closeSvg;
        wrap.append(close);

        content.append(flipbookPagesClone);

        // Control
        let start = createElement("div", "flipFullscreen__start");
        let end = createElement("div", "flipFullscreen__end");
        let next = createElement("div", "flipFullscreen__next");
        let prev = createElement("div", "flipFullscreen__prev");
        let info = createElement("div", "flipFullscreen__info");

        footer.append(start);
        footer.append(prev);
        footer.append(info);
        footer.append(next);
        footer.append(end);

        console.log(wrap);
        root.append(wrap);

        return {
            wrap: wrap,
            start: start,
            prev: prev,
            info: info,
            next: next,
            end: end,
            close: close,
            layout: layout
        };
    }

    let templateObject = template();

    templateObject.close.addEventListener("click", function() {
        toggleModalFlipBook(false);
    });

    templateObject.layout.addEventListener("click", function() {
        toggleModalFlipBook(false);
    });

    function init() {
        const pageFlip = new PageFlip(flipbookPagesClone, {
            width: 500,
            height: 700,
            size: "stretch",
            maxWidth: 2000,
            minWidth: 260,
            maxHeight: 2000,
            minHeight: 200,
            maxShadowOpacity: 0.2, // Half shadow intensity
            showCover: true,
            mobileScrollSupport: false // disable content scrolling on mobile devices
        });
    
        // load pages
        pageFlip.loadFromHTML(flipbookPagesClone.querySelectorAll(".page"));
        let totalPages = pageFlip.getPageCount();

        templateObject.prev.addEventListener("click", function() {
            pageFlip.flipPrev();
        });
    
        templateObject.next.addEventListener("click", function() {
            pageFlip.flipNext();
        });
    
        templateObject.start.addEventListener("click", function() {
            pageFlip.flip(0);
        });
    
        templateObject.end.addEventListener("click", function() {
            pageFlip.flip(totalPages - 1);
        });
    
        // total/current page
        templateObject.info.innerText = 1 + " / " + totalPages;

        pageFlip.on("flip", (e) => {
            templateObject.info.innerText = (e.data + 1) + " / " + totalPages;
        });
    }

    init();
}

flipFullscreen();