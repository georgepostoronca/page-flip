import "normalize.css";
import "./styles.scss";

import { PageFlip } from "page-flip";

function flipbookStatus() {
    let status = 0;
    let images = [].slice.call(document.querySelectorAll("img"));
    let imagesLoaded = 0;

    if(images.length) images.forEach(function(image) {
        if(image.complete) {
            imagesLoaded += 1;
        }

        status = (imagesLoaded * 100) / images.length
    });

    console.log("status");
    return status;
}

function flipbookLoader(status) {
    let loaderElement = document.querySelector(".js-flipbook-loader");
    loaderElement.style.width = status + "%";
}

document.addEventListener("DOMContentLoaded", function () {
    let demoBook = document.getElementById("demoBookExample");
    let flipBookContent = document.querySelector(".js-flipbook-content");

    const pageFlip = new PageFlip(demoBook, {
        width: 400, // base page width
        height: flipBookContent.clientHeight, // base page height

        size: "fixed",
        maxHeight: 509,
        minHeight: 320,
        maxWidth: 800,
        minWidth: 320,

        maxShadowOpacity: 0.5, // Half shadow intensity
        showCover: true,
        mobileScrollSupport: false // disable content scrolling on mobile devices
    });

    let interval = setInterval(function( ){
        let status = flipbookStatus();

        if(status > 100 ) clearInterval(interval);
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
    });

    document.querySelector(".js-flipbook-fullscreen").addEventListener("click", function() {
        // fullscreen
        console.log("fullscreen");
    });

    // current page
    pageFlip.on("flip", (e) => {
      document.querySelector(".js-flipbook-current").innerText = e.data + 1;
    });
});
