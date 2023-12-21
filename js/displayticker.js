import {
    collection,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

import { firestore } from "./firebase-config.js";

const newsTicker = document.getElementById("news-ticker");

async function fetchNews() {
    try {
        const totfdCollection = collection(firestore, "totfd");
        const totfdDoc = doc(totfdCollection, "notifications");
        const snapshot = await getDoc(totfdDoc);

        if (snapshot.exists()) {
            const data = snapshot.data();

            if (Array.isArray(data.notifications)) {
                data.notifications.forEach((item) => {
                    const newSticker = document.createElement("span");
                    newSticker.textContent = "New";
                    newSticker.classList.add("new-sticker");

                    const listItem = document.createElement("li");
                    listItem.appendChild(newSticker);
                    listItem.appendChild(document.createTextNode(item));

                    newsTicker.appendChild(listItem);
                });
            }
        }

        initializeNewsTicker();
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function initializeNewsTicker() {
    const ticker = document.getElementById("news-ticker");
    const tickerItems = ticker.getElementsByTagName("li");

    let totalWidth = 0;
    for (let i = 0; i < tickerItems.length; i++) {
        totalWidth += tickerItems[i].offsetWidth;
    }

    const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    // Calculate the initial translation to start from the rightmost part
    const initialTranslation = screenWidth;

    const transitionDuration = 60;

    ticker.style.width = totalWidth + "px";

    ticker.style.transform = `translateX(${initialTranslation}px)`;
    const resetTicker = () => {
        ticker.style.transition = "none";
        ticker.style.transform = `translateX(${initialTranslation}px)`;
        setTimeout(() => {
            ticker.style.transition = `transform ${transitionDuration}s linear infinite`;
            ticker.style.transform = `translateX(-${totalWidth}px)`;
        }, 0);
    };

    window.addEventListener("resize", resetTicker);

    resetTicker();
}


window.addEventListener("load", fetchNews)