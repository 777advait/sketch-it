'use strict';

const gridWrapper = document.querySelector(".right");
const buttons = document.querySelectorAll(".btn")


let currentColor = "#333";
let currentMode = "paint";
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


const setCurrentColor = (color) => {
    currentColor = color
};

const drawGrid = () => {
    for (let i = 0; i < 16 * 16; i++) {
        const gridEl = document.createElement("div");
        gridEl.classList.add("grid-el");
        gridWrapper.appendChild(gridEl);
    };
};


const paintMode = () => {
    document.querySelectorAll(".grid-el").forEach(el => {
        el.addEventListener("mouseover", e => {
            if (mouseDown) { e.target.style.backgroundColor = currentColor; }
        });
        el.addEventListener("mousedown", e => {
            e.target.style.backgroundColor = currentColor;
        });
    });
};

const eraseMode = () => {
    document.querySelectorAll(".grid-el").forEach(el => {
        el.addEventListener("mouseover", e => {
            if (mouseDown) { e.target.style.background = "none"; }
        });
        el.addEventListener("mousedown", e => {
            e.target.style.background = "none";
        });
    });
};

buttons.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        if (e.target.id != "clear") {
            document.querySelector(".active").classList.remove("active");
            e.target.classList.add("active");
        }
        currentMode = e.target.id;
        changeMode()
    });
});


const changeMode = () => {
    switch (currentMode) {
        case "clear":
            document.querySelectorAll(".grid-el").forEach(el => el.style.background = "none")
            break;
        case "erase":
            eraseMode()
            break;

        default:
            paintMode()
            break;
    }
}

document.body.onload = () => { drawGrid(); changeMode(); };