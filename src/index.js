import "normalize.css";
import "./styles.scss";

import { PageFlip } from "page-flip";

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
