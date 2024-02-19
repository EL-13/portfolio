// =============== ROTATION ===============

const shell = document.querySelector(".boxes");

const cells = shell.querySelectorAll(".box");
const cellWidth = shell.offsetWidth;
const cellHeight = shell.offsetHeight;
const cellSize = cellHeight;
const cellCount = 5;

const radius = Math.round((cellSize / 1.8) / Math.tan(Math.PI / cellCount));
const theta = 360 / cellCount;

const prevButton = document.querySelector(".up");
const nextButton = document.querySelector(".down");
prevButton.addEventListener("click", selectPrev);
nextButton.addEventListener("click", selectNext);

let selectedIndex = 0;


function rotateShell(){
    const angle = theta * selectedIndex * -1;
    const cellIndex = selectedIndex < 0 ? (cellCount - ((selectedIndex * -1) % cellCount)) : (selectedIndex % cellCount);

    shell.style.transform = "translateZ(" + (-radius) + "px) " + "rotateX(" + (-angle) + "deg)";
    
    cells.forEach((cell, index) => {
        if (cellIndex === index) {
            cell.classList.add("selected");
        } else {
            cell.classList.remove("selected");
        }
    });
}

function selectPrev(){
    selectedIndex--;
    rotateShell();
}

function selectNext(){
    selectedIndex++;
    rotateShell();
}

function initShell(){
    cells.forEach((cell, i) => {
        const cellAngle = theta * i;
        cell.style.transform = "rotateX(" + (-cellAngle) + "deg) translateZ(" + radius + "px)";
    });

    rotateShell();
}

initShell();

// =============================================================================



// =============== HOVER (WELCOME, ABOUT ME & CONTACTS) ===============

function revealContent(i){
    document.getElementsByClassName("section")[i].style.backgroundColor = "#DA9E8C";
    document.getElementsByClassName("section_title")[i].style.color = "#F8C6B5";
    document.getElementsByClassName("section_title")[i].style.textShadow = "0.2vw 0.2vw 0.5vw #B15A43";
    document.getElementsByClassName("section_content")[i].style.opacity = "1";
}

function hideContent(i){
    document.getElementsByClassName("section")[i].style.backgroundColor = "#B15A43";
    document.getElementsByClassName("section_title")[i].style.color = "#F8C6B5";
    document.getElementsByClassName("section_title")[i].style.textShadow = "none";
    document.getElementsByClassName("section_content")[i].style.opacity = "0";
}

// =============================================================================



// =============== HOVER (GAMES) ===============

function revealDescriptions(i){
    let title = document.getElementsByClassName("game_title")[i];
    title.style.fontSize = "2.5vw";
    title.style.backgroundColor = "#F8C6B5";
    title.style.textShadow = "0 0 0.3vw #B15A43";
    title.style.alignItems = "flex-start";
    title.style.justifyContent = "flex-start";
    title.style.padding = "4% 0% 0% 4%";


    let div = document.getElementsByClassName("game_content")[i];
    let elem = div.querySelectorAll("span, a");
    div.style.opacity = "1";
    div.style.zIndex = "999";

    for(let j = 0; j < elem.length; j++){
        elem[j].style.opacity = "1";
        elem[j].style.zIndex = "999";
    }
}

function hideDescriptions(i){
    let title = document.getElementsByClassName("game_title")[i];
    title.style.fontSize = "3vw";
    title.style.backgroundColor = "#B15A43";
    title.style.textShadow = "none";
    title.style.alignItems = "center";
    title.style.justifyContent = "center";
    title.style.padding = "0%";

    let div = document.getElementsByClassName("game_content")[i];
    let elem = div.querySelectorAll("span, a")
    div.style.opacity = "0";
    div.style.zIndex = "-1";

    for(let j = 0; j < elem.length; j++){
        elem[j].style.opacity = "0";
        elem[j].style.zIndex = "-1";
    }
}

// =============================================================================


/*
const ids = ["game1", "game2"];
const gameTitles = ["2048 Replica", "Temple Run Replica"];
const gameDescriptions = ["game11111", "game22222"];
const gameWeb  = ["https://www.youtube.com/", "https://www.youtube.com/"];
const gameAPKs = ["files/2048-demo.apk", "files/vertical-run-demo.apk"];
const gameGithub = ["https://www.reddit.com/", "https://www.reddit.com/"]; 

function loadGameTitle(){
    for(let i = 0; i < ids.length; i++){
        document.getElementById(ids[i]).innerHTML = setupTitle(i);
    }
}

function setupTitle(i){
    return `<span class="game_title">${gameTitles[i]}</span>`;
}

function setupDescriptions(i){
    let contentDiv = document.createElement('div');
    let gdTitle = document.createElement('span');
    let gdDescription = document.createElement('span');

    let webLink = document.createElement('a');
    let apkLink = document.createElement('a');
    let githubLink = document.createElement('a');

    gdTitle.classList.add("gd_title");
    gdTitle.innerText = gameTitles[i]; 

    gdDescription.classList.add("gd_description");
    gdDescription.innerHTML = gameDescriptions[i];

    webLink.classList.add("gd_link");
    webLink.href = gameWeb[i];
    webLink.target = "_blank";
    webLink.innerHTML = `<span class="material-symbols-outlined">language</span>Play on web<br>`;

    apkLink.classList.add("gd_link");
    apkLink.href = gameAPKs[i];
    apkLink.target = "_blank";
    apkLink.innerHTML = `<span class="material-symbols-outlined">apk_document</span>Download APK<br>`;

    githubLink.classList.add("gd_link");
    githubLink.href = gameGithub[i];
    githubLink.target = "_blank";
    githubLink.innerHTML = `<span class="material-symbols-outlined">&#xf09b;</span>Project Github<br>`;

    contentDiv.classList.add("game_content");
    contentDiv.appendChild(gdTitle);
    contentDiv.appendChild(gdDescription);
    contentDiv.appendChild(webLink);
    contentDiv.appendChild(apkLink);
    contentDiv.appendChild(githubLink);

    return contentDiv;
}

function revealDescriptions(i){
    let gameDescDiv = document.getElementById(ids[i]);

    gameDescDiv.innerHTML = "";
    gameDescDiv.appendChild(setupDescriptions(i));
}

function hideDescriptions(i){
    let gameDescDiv = document.getElementById(ids[i]);

    gameDescDiv.innerHTML = "";
    gameDescDiv.innerHTML = setupTitle(i);
}

loadGameTitle();
*/