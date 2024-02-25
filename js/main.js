// =============== VARIABLES / CONSTANTS ===============

const welcomeContent = document.getElementsByClassName("section_content")[0];
const prevButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
prevButton.addEventListener("click", selectPrev);
nextButton.addEventListener("click", selectNext);

let windowWidth;
let windowHeight;
let windowAR;
let orientationSetting;
let prevOrientationSetting;

const carousel = document.getElementById("carousel");
let carouselWidth;
let carouselHeight;

const ss1 = document.getElementsByClassName("screenshots")[0];
const ss1Img = ss1.querySelectorAll("div > img");

const ss2 = document.getElementsByClassName("screenshots")[1];
const ss2Img = ss2.querySelectorAll("div > img");

const sectionTitle = document.getElementsByClassName("section_title");
const sectionContent = document.getElementsByClassName("section_content");
const gameSectionTitle = document.getElementsByClassName("game_title");  
const gameTitle = document.getElementsByClassName("gd_title");
const gameDescription = document.getElementsByClassName("gd_description");
const gameLink = document.getElementsByClassName("gd_link");

const shell = document.querySelector(".boxes");
const cells = shell.querySelectorAll(".box");
const cellCount = 5;
const theta = 360 / cellCount;
let cellWidth;
let cellHeight;
let cellSize;
let radius;
let selectedIndex = 0;

// =============================================================================



// =============== PAGE SETUP ===============

setupOrientation();
initShell(orientationSetting);

window.addEventListener("resize", () => {
    setupOrientation();
    initShell(orientationSetting);
});

function setupOrientation(){
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    windowAR = windowWidth / windowHeight;

    switch (windowAR < 1) {
        case false:
            orientationSetting = "landscape";
            if (orientationSetting != prevOrientationSetting){
                prevOrientationSetting = orientationSetting;
                initShell(orientationSetting);
                setupLandscape(windowWidth, windowHeight);
            } else{
                setupLandscape(windowWidth, windowHeight);
                break;
            }
            break;
        case true:
            orientationSetting = "portrait";
            if (orientationSetting != prevOrientationSetting){
                setupPortrait(windowWidth, windowHeight);
                prevOrientationSetting = orientationSetting;
                initShell(orientationSetting);
            } else{
                setupPortrait(windowWidth, windowHeight);
                break;
            }
            break;
        default:
            console.log("The orientation API isn't supported in this browser :(");
            console.log("windowAR is" + windowAR);
      }
}

function setupLandscape(windowWidth, windowHeight){
    welcomeContent.innerHTML = `<span>...to Evelyn's game development portfolio blog. 
                                    This blog is dedicated to display some game projects which I worked on previously.<br><br>
                                    <span class="welcome">Please use the arrows at the right of the page to navigate around this page.<br><br>
                                        I hope you have a great time ahead.
                                    </span>
                                </span>`;

    prevButton.innerHTML = '<span class="material-symbols-outlined">keyboard_arrow_up</span>';
    nextButton.innerHTML = '<span class="material-symbols-outlined">keyboard_arrow_down</span>';

    scaleLandscape(windowWidth, windowHeight);
    cellWidth = shell.offsetWidth;
    cellHeight = shell.offsetHeight;
    cellSize = cellHeight;
    radius = Math.round((cellSize / 1.8) / Math.tan(Math.PI / cellCount));
}

function setupPortrait(windowWidth, windowHeight){
    welcomeContent.innerHTML = `<span>...to Evelyn's game development portfolio blog. 
                                    This blog is dedicated to display some game projects which I worked on previously.<br><br>
                                    <span class="welcome">Please use the arrows at the bottom of the page to navigate around this page.<br><br>
                                        I hope you have a great time ahead.</span>
                                </span>`;
    
    prevButton.innerHTML = '<span class="material-symbols-outlined">navigate_before</span>';
    nextButton.innerHTML = '<span class="material-symbols-outlined">navigate_next</span>';

    scalePortrait(windowWidth, windowHeight);
    cellWidth = shell.offsetWidth;
    cellHeight = shell.offsetHeight;
    cellSize = cellHeight;
    radius = Math.round((cellSize / 1.8) / Math.tan(Math.PI / cellCount));
}

function scaleLandscape(windowWidth, windowHeight){
    carouselHeight = Math.min((20 * 50 / (9 * windowAR)), (95 / windowAR));
    carousel.style.width = "80vw";
    carousel.style.height = carouselHeight + "vw";
    //carousel.style.height = Math.min(Math.max(carouselHeight, 10), (95 /windowAR)) + "vw";

    for(let i = 0; i < ss1Img.length; i++){
        ss1Img[i].style.width = (0.95 * 0.95 * 17.1 / 30.7 * carouselHeight) + "vw";
        ss1Img[i].style.height = (0.95 * 0.95 * carouselHeight) + "vw";
    };

    for(let i = 0; i < ss2Img.length; i++){
        ss2Img[i].style.width = (0.95 * 0.95 * 15.3 / 30.7 * carouselHeight) + "vw";
        ss2Img[i].style.height = (0.95 * 0.95 * carouselHeight) + "vw";
    };

    for(let i = 0; i < sectionTitle.length; i++){
        sectionTitle[i].style.fontSize = Math.min(Math.max((2.4 * (9/20) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 1.8), 3.6) + "rem";
        sectionContent[i].style.fontSize = Math.min(Math.max((1.2 * (9/20) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 0.9), 1.8) + "rem";
        //console.log(windowAR);
        //console.log(Math.min(Math.max((3 * (9/20) * (windowWidth/1536) * windowAR), 1), 5));
    };

    for(let i = 0; i < gameSectionTitle.length; i++){
        gameSectionTitle[i].style.fontSize = Math.min(Math.max((2.8 * (9/20) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 2.1), 4.2) + "rem";
        gameTitle[i].style.fontSize = Math.min(Math.max((2 * (9/20) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 1.5), 3) + "rem";
        gameDescription[i].style.fontSize = Math.min(Math.max((1.1 * (9/20) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 0.8), 1.7) + "rem";
    };

    for(let i = 0; i < gameLink.length; i++){
        gameLink[i].style.fontSize = Math.min(Math.max((1.2 * (9/20) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 0.9), 1.8) + "rem";
    };
    //console.log("scaleLandscape" + windowAR);
}

function scalePortrait(windowWidth, windowHeight){
    carouselWidth = Math.min(Math.max((9 * 70 / (20 * windowAR)), 60), (95 / windowAR));
    carousel.style.width = carouselWidth + "vh";
    carousel.style.height = "80vh";

    for(let i = 0; i < ss1Img.length; i++){
        ss1Img[i].style.width = (0.95 * 0.95 * 0.5 * 80 * 20.1 / 36.1) + "vh";
        ss1Img[i].style.height = (0.95 * 0.95 * 0.5 * 80) + "vh";
    };

    for(let i = 0; i < ss2Img.length; i++){
        ss2Img[i].style.width = (0.95 * 0.95 * 0.5 * 80 * 18 / 36.1) + "vh";
        ss2Img[i].style.height = (0.95 * 0.95 * 0.5 * 80) + "vh";
    };

    for(let i = 0; i < sectionTitle.length; i++){
        sectionTitle[i].style.fontSize = Math.min(Math.max((3 * (20/9) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 2), 4) + "rem";
        sectionContent[i].style.fontSize = Math.min(Math.max((1.2 * (20/9) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 0.8), 1.6) + "rem";
    };

    for(let i = 0; i < gameSectionTitle.length; i++){
        gameSectionTitle[i].style.fontSize = Math.min(Math.max((3 * (20/9) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 2), 4) + "rem";
        gameTitle[i].style.fontSize = Math.min(Math.max((1.8 * (20/9) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 1.2), 2.4) + "rem";
        gameDescription[i].style.fontSize = Math.min(Math.max((1.12 * (20/9) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 0.75), 1.5) + "rem";
    };

    for(let i = 0; i < gameLink.length; i++){
        gameLink[i].style.fontSize = Math.min(Math.max((1.2 * (20/9) * Math.min(windowWidth/1536, windowHeight/695) * windowAR), 0.8), 1.6) + "rem";
    };
}

// =============================================================================



// =============== ROTATION ===============

function rotateShell(orientationSetting){
    const angle = theta * selectedIndex * -1;
    const cellIndex = selectedIndex < 0 ? (cellCount - ((selectedIndex * -1) % cellCount)) : (selectedIndex % cellCount);

    if (orientationSetting == "landscape") {
        shell.style.transform = "translateZ(" + (-radius) + "px) " + "rotateX(" + (-angle) + "deg)";
    } else if (orientationSetting == "portrait") {
        shell.style.transform = "translateZ(" + (-radius) + "px) " + "rotateY(" + (angle) + "deg)";
    } else {
        console.log("orientationSetting is neither 'landscape' or 'portrait'");
        console.log("orientationSetting is " + orientationSetting);
    }

    cells.forEach((cell, index) => {
        if (cellIndex === index) {
            cell.classList.add("selected");
        } else {
            cell.classList.remove("selected");
        }
    });
}

function initShell(orientationSetting){
    cells.forEach((cell, i) => {
        const cellAngle = theta * i;

        if (orientationSetting == "landscape") {
            cell.style.transform = "rotateX(" + (-cellAngle) + "deg) translateZ(" + radius + "px)";
        } else if (orientationSetting == "portrait") {
            cell.style.transform = "rotateY(" + (cellAngle) + "deg) translateZ(" + radius + "px)";
        } else {
            console.log("orientationSetting is neither 'landscape' or 'portrait'");
            console.log("orientationSetting is " + orientationSetting);
        }
    });

    rotateShell(orientationSetting);
}

function selectPrev(){
    selectedIndex--;
    rotateShell(orientationSetting);
}

function selectNext(){
    selectedIndex++;
    rotateShell(orientationSetting);
}

// =============================================================================



// =============== HOVER ===============

function revealDescriptions(i){
    let title = document.getElementsByClassName("game_title")[i];
    title.style.opacity = "0";

    let div = document.getElementsByClassName("game_content")[i];
    let elem = div.querySelectorAll("span, a");
    div.style.opacity = "1";
    //div.style.zIndex = "999";

    for(let j = 0; j < elem.length; j++){
        elem[j].style.opacity = "1";
        //elem[j].style.zIndex = "999";
    }
}

function hideDescriptions(i){
    let title = document.getElementsByClassName("game_title")[i];
    title.style.opacity = "1";

    let div = document.getElementsByClassName("game_content")[i];
    let elem = div.querySelectorAll("span, a");
    div.style.opacity = "0";
    //div.style.zIndex = "-1";

    for(let j = 0; j < elem.length; j++){
        elem[j].style.opacity = "0";
        //elem[j].style.zIndex = "-1";
    }
}

// =============================================================================