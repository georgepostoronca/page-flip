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

class FlipBook {
    constructor(root, images) {
        this.el = root;
        this.images = images;
        this.name = "flipbook";

        this.setttings = {};
        this.setttingsFullScreen = {};
    
        this.template();
    }

    div(name, className) {
        let element = document.createElement(name || "div");
        if(className) element.classList.add(className);
        return element;
    }

    templateImgaes(images = []) {
        let tmp = [];

        images.forEach((imageSrc) => {
            // let page = this.div("div", "page");
            // let content = this.div("div", "page__content");
            // let img = this.div("img")
            // img.alt = "img";
            // img.src = imageSrc;

            // content.append(img);
            // page.append(content);
            
            let html = `
                <div class="page">
                    <div class="page-content">
                        <img src="#{ imageSrc }" alt="IMG">
                    </div>
                </div>
            `;
            tmp.push(html);
        });

        return tmp;
    }

    template() {
        let wrap = this.div("div", this.name + "__wrap");
        let content = this.div("div", this.name + "__content");
        let footer = this.div("div", this.name + "__footer");

        let images = this.templateImgaes(this.images);
        images.forEach((img) => {
            content.insertAdjacentHTML("beforeend", img);
        });

        wrap.append(content);
        wrap.append(footer);

        console.log(wrap, images);

        return {
            wrap,
            content,
            footer
        }
    }

    templateFullscreen() {

    }

    init() {

    }

    initFullScreen() {

    } 
}


let flippBookImages = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.jpg", "img/img6.jpg", "img/img7.jpg"]
let book = new FlipBook(flipbook, flippBookImages);