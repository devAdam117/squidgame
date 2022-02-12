let menuStatus = {
    playerInputTouched: false,
    numPlatformsTouched: false,
    equality: false,
    error: true
};
let errorMessages = [
    "Inputy nemôžu ostať prázdne !",
    "Počet hráčov môže byť najviac 10 a počet platforiem najviac 20 !",
    "Nie je možné spustiť hru, pokiaľ nie sú správne nadstavené parametre !",
    "Počet hráčov a platforiem musí byť kladný !",
    "Neznáma chyba"
];
let afterGameMessages = [
    "Vyhral si!",
    "Prehral si!"
];

let errorBox = document.getElementById("errorMessage");
let menuInputs = document.querySelectorAll(".startInput");
let startButton = document.querySelector(".startButton");
let menu = document.querySelector(".menuOptions");
let playground = document.querySelector(".playground");
let mainMenuButton = document.querySelector(".mainMenuBtn")
let startinPlatform = playground.children[1].children[0];
let bridge = playground.children[1].children[1];
let endPlatform = playground.children[1].children[2];
let gameArena = playground.children[1];
let playAgainButton = document.querySelector(".playAgainButton");
let afterGameContent = document.querySelector(".afterGameContent");
let showRatesButton = document.querySelector(".showRatesBtn");
let profilItems = document.querySelectorAll(".profilItem");
let betContent = document.querySelector(".betContent");
let betButton = betContent.children[4];
let playerInput = betContent.children[3];
let betInput = betContent.children[2];
let profileInfo = document.querySelector(".profileContent");
let potentonalWin = profileInfo.children[4].children[0];
let totalBet = profileInfo.children[3].children[0];
let budget = profileInfo.children[2].children[0];
let gamesPlayed = profileInfo.children[0].children[0];
let totalProfit = profileInfo.children[1].children[0];
let cancelButon = document.querySelector(".closeBtn");
let mobilePlayerInfo = document.querySelector(".playerCurrent");
let desktopInfo = document.querySelector(".desktop");
let mobileInfo = document.querySelector(".mobile");
let infoBtn = document.querySelector(".infoContent");
let dekstopBtn = document.querySelector(".desktopCloseBtn");
let mobileBtn = document.querySelector(".mobileCloseBtn");
infoBtn.addEventListener("click",async ()=>{
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.body.clientWidth < 800)  {
        if(mobileInfo.style.transform=="translateY(0px)"){
            mobileInfo.style.transform="translateY(30%)";
            mobileInfo.style.opacity= "0%";
            mobileInfo.style.zIndex= "-10";

        } 
        else {
            betContent.style.transform="scale(0)";
            mobileInfo.style.zIndex="120";            
            mobileInfo.style.opacity="100%";
            mobileInfo.style.transform="translateY(0)";


        }
    }
    else {        
        if(desktopInfo.style.transform=="translateY(0px)"){
            desktopInfo.style.transform="translateY(30%)"; 
            desktopInfo.style.opacity= "0%";
            desktopInfo.style.zIndex= "-10";

        }
        else{           
            desktopInfo.style.zIndex= "100";
            desktopInfo.style.transform="translateY(0)"; 
            desktopInfo.style.opacity= "100%"

        }
    }
})
dekstopBtn.addEventListener("click",()=>{    
            desktopInfo.style.transform="translateY(30%)"; 
            desktopInfo.style.opacity= "0%";
            desktopInfo.style.zIndex= "-10"; 
})

mobileBtn.addEventListener("click",()=>{    
    mobileInfo.style.zIndex="-10";            
    mobileInfo.style.opacity="0%";
    mobileInfo.style.transform="translateY(30%)";
})



//Error  handling for basic input fields
menuInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (input.value >= 0) {
            index == 0 ? menuStatus.playerInputTouched = true : menuStatus.numPlatformsTouched = true;
        }
        if (menuStatus.playerInputTouched && menuStatus.numPlatformsTouched) {
            //check for empty inputs
            if (!input.value) {
                menuStatus.error = true;
                setErrorMessage(true, "red", errorMessages[0], "0px");
            } else {
                if (menuInputs[0].value == 0 || menuInputs[1].value == 0) {
                    menuStatus.error = true;
                    setErrorMessage(true, "red", errorMessages[3], "0px");
                } else {
                    if ((menuInputs[0].value > 10 || menuInputs[1].value > 20)) {
                        menuStatus.error = true;
                        setErrorMessage(true, "red", errorMessages[1], "0px");
                    } else {
                        if (menuInputs[0].value - menuInputs[1].value > 0) {
                            let withoutWin = menuInputs[0].value - menuInputs[1].value;
                            withoutWin > 1 ? setErrorMessage(true, "orangered", `Poslední ${withoutWin} hráči budú bez kladného kurzu, odporúča sa nastaviť počet hráčov najviac na ${menuInputs[1].value}`, "0px") : setErrorMessage(true, "orangered", `Posledný hráč bude bez kladného kurzu, odporúča sa nastaviť počet hráčov najviac na ${menuInputs[1].value}`, "0px");
                            menuStatus.error = false;
                        } else {
                            setErrorMessage(false);
                            menuStatus.error = false;
                        }
                    }

                }

            }
        }
    })


})

const wait = (ms) => {
    return new Promise((res) => {
        setTimeout(x => {
            res(x);
        }, ms)
    })
}
//Removes all children for parent element
const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};
let nPlayers;
let nPlatforms;

let betOptions;
cancelButon.addEventListener("click",()=>{    
    betContent.style.transform="scale(0,0)";
})
startButton.addEventListener("click", async () => {
    if (menuStatus.error) {
        setErrorMessage(true, "red", errorMessages[2], "0px");
        return;
    } else {


        let resultFromLocalStorage = localStorage.getItem("profile");        
        if (!resultFromLocalStorage) {
            let objToSave = {
                nGames: 0,
                profit: 0,
                budget: 200
            };
            localStorage.setItem("profile", JSON.stringify(objToSave));
            resultFromLocalStorage = objToSave;
        } else {
            resultFromLocalStorage = JSON.parse(resultFromLocalStorage);
            Math.floor(100*resultFromLocalStorage.budget)/100 <= 0 ? resultFromLocalStorage.budget = 200 : 0;
            localStorage.setItem("profile", JSON.stringify(resultFromLocalStorage));
        }
        handleBetLoaded = true;
        updateHTMLvalue(gamesPlayed, 0, resultFromLocalStorage.nGames, 50);
        updateHTMLvalue(totalProfit, 0, resultFromLocalStorage.profit, 100);
        updateHTMLvalue(budget, 0, resultFromLocalStorage.budget, 100);

        nPlayers = nPlayers ? nPlayers : menuInputs[0].value;
        nPlatforms = nPlatforms ? nPlatforms : menuInputs[1].value;
        menuInputs[0].value = "";
        menuInputs[1].value = "";
        menuStatus.numPlatformsTouched = false;
        menuStatus.playerInputTouched = false;
        let height = screen.height;
        let width = screen.width;
        if (width >= height) {
            menu.style.transform = `translate(0,-1000px)`;
            await wait(300);
            menu.style.display = "none";
            playground.style.display = "block";
            await wait(1);
            gameArena.classList.remove("gameArenaMobile");
            gameArena.classList.add("gameArena");
            startinPlatform.classList.remove("startPlatformMobile");
            startinPlatform.classList.add("startPlatform");
            endPlatform.classList.remove("endPlatformMobile");
            endPlatform.classList.add("endPlatform");
            await wait(1);
            startinPlatform.style.display = "block";
            endPlatform.style.display = "block";
            endPlatform.style.background = "rgba(12, 240, 69, 0.192)";
            await wait(50);
            startinPlatform.style.transform = "translate(0,0)";
            endPlatform.style.transform = "translate(0,0)";
        } else {
            menu.style.transform = `translate(0,-1000px)`;
            await wait(300);
            menu.style.display = "none";
            //add game arena class
            gameArena.classList.remove("gameArena");
            gameArena.classList.add("gameArenaMobile");
            playground.style.display = "block";
            await wait(1);
            startinPlatform.classList.remove("startPlatform");
            startinPlatform.classList.add("startPlatformMobile");
            endPlatform.classList.remove("endPlatform");
            endPlatform.classList.add("endPlatformMobile");
            startinPlatform.style.transform = "translate(0,-100px)";
            endPlatform.style.transform = "translate(0,100px)";
            await wait(1);
            startinPlatform.style.display = "block";
            endPlatform.style.background = "rgba(12, 240, 69, 0.192)";
            endPlatform.style.display = "block";
            await wait(50);
            startinPlatform.style.transform = "translate(0,0)";
            endPlatform.style.transform = "translate(0,0)";
            await wait(500);
        }
        createGame(menuStatus.error, width >= height ? false : true);
    }
})
mainMenuButton.addEventListener("click", async () => {

    if (afterGameContent.style.display == "flex") {
        afterGameContent.style.transform = "scale(0,0)";
        await wait(300);
        afterGameContent.style.display = "none";
    }
    let answer = true;
    answer = potentonalWin.innerHTML > 0 ? confirm(`Ak odídeš, prídeš o šancu vyhrať ${potentonalWin.innerHTML} žetón${sklonovanie("",potentonalWin.innerHTML)} spolu sňou stratíš aj už vsadené žetóny`) : true;
    if (!answer) return
    updateHTMLvalue(totalBet, +totalBet.innerHTML, 0, 300);
    updateHTMLvalue(potentonalWin, +potentonalWin.innerHTML, 0, 300);
    let resultFromLocalStorage = localStorage.getItem("profile");
    resultFromLocalStorage = JSON.parse(resultFromLocalStorage);
    resultFromLocalStorage.profit -= +totalBet.innerHTML;
    resultFromLocalStorage.nGames++;
    localStorage.setItem("profile", JSON.stringify(resultFromLocalStorage));



    menuStatus.error = true;
    removeChilds(startinPlatform);
    removeChilds(betContent.children[2]);
    desktopInfo.style.transform="translateY(100%)";
    startinPlatform.style.transform = "translate(-200px,0)";
    endPlatform.style.transform = "translate(200px,0)";
    showRatesButton.innerHTML = "Ukaž kurzy"
    await wait(1);
    for (let i = 0; i < nPlatforms; i++) {
        bridge.children[2 * nPlatforms - (i + 1)].style.transform = "scale(0,0)";
        bridge.children[i].style.transform = "scale(0,0)";
        await wait(30);
    }
    await wait(500);
    playground.style.display = "none";
    menu.style.display = "flex";
    await wait(100);
    menu.style.transform = `translate(0,0px)`;
    startinPlatform.style.display = "none";
    endPlatform.style.display = "none";
    // remove all children from elements for game reset purposes
    removeChilds(bridge);
    removeChilds(endPlatform);
    nPlayers = 0;
    nPlatforms = 0; // prevention for play agan mode
})
playAgainButton.addEventListener('click', async () => {
    handleBetLoaded = true;
    removeChilds(betContent.children[2]);
    removeChilds(startinPlatform);
    startinPlatform.style.transform = "translate(-200px,0)";
    endPlatform.style.transform = "translate(200px,0)";

    await wait(1);
    for (let i = 0; i < nPlatforms; i++) {
        bridge.children[2 * nPlatforms - (i + 1)].style.transform = "scale(0,0)";
        bridge.children[i].style.transform = "scale(0,0)";
        await wait(30);
    }
    await wait(500);
    playground.style.display = "none";
    //menu.style.display="flex"; 
    await wait(100);
    //menu.style.transform=`translate(0,0px)`;
    startinPlatform.style.display = "none";
    endPlatform.style.display = "none";
    removeChilds(bridge);
    removeChilds(endPlatform);
    afterGameContent.style.transform = "scale(0,0)";
    await wait(300);
    afterGameContent.style.display = "none";

    startButton.click();
    showRatesButton.innerHTML = "Ukaž kurzy";
    document.body.style.backgroundColor = "var(--body-bg);"
})


const createGame = async (errorStatus, mobile) => {
    //last error check        
    if (errorStatus) {
        playground.style.display = "none";
        menu.style.display = "block";
        await wait(1000);
        menu.style.transform = `translate(0,1000px)`;
        await wait(500);
        setErrorMessage(true, "red", errorMessages[4], "0px");
        return;
    }
    if (mobile) {
        let players = [];
        let platforms = [];
        totalBetPerGame = 0;
        bridge.classList.remove("bridge");
        bridge.classList.add("bridgeMobile");
        bridge.style.top = `${startinPlatform.offsetTop+startinPlatform.offsetHeight+3}px`;
        bridge.style.height = `${endPlatform.offsetTop-endPlatform.offsetHeight-6}px`;
        //Vytvorenie platforiem html
        for (let i = 0; i < nPlatforms * 2; i++) {
            bridge.appendChild(document.createElement("div"));
            bridge.children[i].classList.add("platformMobile");
            bridge.children[i].style.width = `${60-2*nPlatforms}px`;
            bridge.children[i].style.visibility = `hidden`;
        }
        await wait(10);
        //Zobrazenie platforiem
        for (let i = 0; i < nPlatforms * 2; i++) {
            bridge.children[i].style.visibility = `visible`;
            bridge.children[i].offsetWidth < 150 ? bridge.children[i].style.height = `${bridge.children[i].offsetWidth}px` : 0;
            bridge.children[i].style.transform = "scale(1,1)";
            platforms.push({
                id: i,
                HTMLElement: bridge.children[i],
                positions: {
                    x: bridge.children[i].getBoundingClientRect().left,
                    y: bridge.children[i].getBoundingClientRect().top
                },
                revealed: false,
                broken: false
            })
            await wait(30);

        }
       
        //Pridanie HRACOV        
        for (let i = 0; i < nPlayers; i++) {
            startinPlatform.appendChild(document.createElement("div"));
            startinPlatform.children[i].classList.add("playerMobile");
            if (nPlatforms >= 15) startinPlatform.children[i].style.width = "20px", startinPlatform.children[i].style.height = "20px";
            startinPlatform.children[i].style.marginLeft = `${(startinPlatform.offsetWidth-startinPlatform.children[i].offsetWidth*nPlayers)/(nPlayers*2)}px`;
            startinPlatform.children[i].style.marginRight = `${(startinPlatform.offsetWidth-startinPlatform.children[i].offsetWidth*nPlayers)/(nPlayers*2)}px`;
            startinPlatform.children[i].style.marginTop = `${(startinPlatform.offsetHeight-startinPlatform.children[i].offsetHeight)/(2)}px`;
            startinPlatform.children[i].style.marginBottom = `${(startinPlatform.offsetHeight-startinPlatform.children[i].offsetHeight)/(2)}px`;
            startinPlatform.children[i].style.transition = `${0.3+Math.random()/10}s ease-in`;
            startinPlatform.children[i].appendChild(document.createElement("div"));
            let option = document.createElement("option");
            option.innerHTML = `${i+1}. hráč`;
            option.value = i;
            betContent.children[2].appendChild(option);

            startinPlatform.children[i].children[0].classList.add("tooltipText");

            players.push({
                id: i,
                HTMLElement: startinPlatform.children[i],
                //kurz:0,
                initPosition: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                kurz: 0,
                holding: 0,
                showDetails: false,
                death: false,
                loaded: false,
                winner: false
            })
        }

       
        updatePlayersRate(players, nPlatforms); // daj hracom init kurzy             
        players.forEach(player => player.HTMLElement.addEventListener('click', () => {
            showSingleRate(player,players);
        }))
        //highlight first player after init screen
        players[0].HTMLElement.click();
        //Highlith clciked player
        let index = betContent.children[2].value;
        betContent.children[2].indexParam = index;
        betContent.children[2].playersParam = players;
        betContent.children[2].addEventListener('change', handleInputChange, false);



        //Logika pre koncovu platformu
        let ratesShowed = false;
        showRatesButton.addEventListener('click', () => {
            ratesShowed ? (hideRates(players), showRatesButton.innerHTML = "Ukaž kurzy") : (showRates(players), showRatesButton.innerHTML = "Skry kurzy");
            ratesShowed = !ratesShowed;
        })

        let copyOfNplatforms = nPlatforms;
        betButton.numPlatforms = copyOfNplatforms;
        betButton.playersParam = players;
        betButton.addEventListener('click', handleBet, false)

        //End platform event listener if we won
        endPlatform.addEventListener('click', async () => {
            // get positions of end platform for animation purposes
            let endPlatformHtml = {
                positions: {
                    x: endPlatform.getBoundingClientRect().x + endPlatform.getBoundingClientRect().width / 2,
                    y: endPlatform.getBoundingClientRect().y + endPlatform.getBoundingClientRect().height / 2
                }
            }
            //if all platforms are revealed and leader is loaded
            let sumOfPotentWin = 0;
            players.forEach(player => {
                if (!player.death) {
                    sumOfPotentWin += player.holding;
                }
            })
            //Vyhrali sme a sme v profite
            if (checkAllPlatforms(platforms) && leaderLoaded && (sumOfPotentWin - totalBetPerGame) >= 0) {
                let leaderIdx = giveMeLeaderIndex(players)
                if (players[leaderIdx].winner) return;
                animatePlayer(players[leaderIdx], endPlatformHtml, true);
                players[leaderIdx].winner = true;
                if (checkGameEnd(players, true).num > 1) {
                    for (let j = 0; j < correctPlatforms.length; j++) {
                        for (let i = 0; i < players.length; i++) {
                            if (players[i].death == false && players[i] != players[leaderIdx]) {
                                animatePlayer(players[i], platforms[correctPlatforms[j]]);
                                await wait(30);
                                //updatePanel()
                            }
                        }
                        await wait(250);
                    }
                    for (let i = 0; i < players.length; i++) {
                        if (!players[i].death) {
                            animatePlayer(players[i], endPlatformHtml, true);
                            players[i].winner = true;
                            await wait(30);
                        }
                    }

                }
                //showWinningMenu() 
                // toto urobit ako funcosku
                for (let i = 0; i < nPlatforms; i++) {
                    bridge.children[2 * nPlatforms - (i + 1)].style.transform = "scale(0,0)";
                    bridge.children[i].style.transform = "scale(0,0)";
                    await wait(30);
                }
                removeChilds(startinPlatform)
                handleBetLoaded = false;
                afterGameContent.style.display = "flex";
                let resultFromLocalStorage = JSON.parse(localStorage.getItem("profile"));
                resultFromLocalStorage.budget += +potentonalWin.innerHTML;               
                resultFromLocalStorage.profit += ((+potentonalWin.innerHTML) - (+totalBet.innerHTML));
                resultFromLocalStorage.nGames += 1;
                localStorage.setItem("profile", JSON.stringify(resultFromLocalStorage));
                updateHTMLvalue(budget, +budget.innerHTML, +budget.innerHTML + +potentonalWin.innerHTML, 500);
                updateHTMLvalue(gamesPlayed, +gamesPlayed.innerHTML, +gamesPlayed.innerHTML + 1, 50);
                updateHTMLvalue(totalProfit, +totalProfit.innerHTML, +totalProfit.innerHTML + (+potentonalWin.innerHTML - +totalBet.innerHTML), 500);
                updateHTMLvalue(potentonalWin, +potentonalWin.innerHTML, 0, 500);
                updateHTMLvalue(totalBet, +totalBet.innerHTML, 0, 500);
                afterGameContent.children[0].innerHTML = `Vyhral si ${Math.round((sumOfPotentWin-totalBetPerGame)*100)/100} žetón${sklonovanie("",Math.round((sumOfPotentWin-totalBetPerGame)*100)/100)} !`
                afterGameContent.children[0].style.color = "green";
                await wait(300);
                afterGameContent.style.transform = "scale(1,1)";
            } else if (checkAllPlatforms(platforms) && leaderLoaded && (sumOfPotentWin - totalBetPerGame) < 0) {
                let leaderIdx = giveMeLeaderIndex(players)
                if (players[leaderIdx].winner) return;
                animatePlayer(players[leaderIdx], endPlatformHtml, true);
                players[leaderIdx].winner = true;
                if (checkGameEnd(players, true).num > 1) {
                    for (let j = 0; j < correctPlatforms.length; j++) {
                        for (let i = 0; i < players.length; i++) {
                            if (players[i].death == false && players[i] != players[leaderIdx]) {
                                animatePlayer(players[i], platforms[correctPlatforms[j]]);
                                await wait(30);
                                //updatePanel()
                            }
                        }
                        await wait(250);
                    }
                    for (let i = 0; i < players.length; i++) {
                        if (!players[i].death) {
                            animatePlayer(players[i], endPlatformHtml, true);
                            players[i].winner = true;
                            await wait(30);
                        }
                    }

                }

                for (let i = 0; i < nPlatforms; i++) {
                    bridge.children[2 * nPlatforms - (i + 1)].style.transform = "scale(0,0)";
                    bridge.children[i].style.transform = "scale(0,0)";
                    await wait(30);
                }
                removeChilds(startinPlatform)
                handleBetLoaded = false;

                afterGameContent.style.display = "flex";
                //budget.innerHTML = +budget.innerHTML + +potentonalWin.innerHTML  ;
                //potentonalWin.innerHTML=0; 
                let resultFromLocalStorage = JSON.parse(localStorage.getItem("profile"));
                resultFromLocalStorage.profit -= (+totalBet.innerHTML - +potentonalWin.innerHTML);
                resultFromLocalStorage.nGames += 1;
                resultFromLocalStorage.budget += +potentonalWin.innerHTML;
                localStorage.setItem("profile", JSON.stringify(resultFromLocalStorage));
                updateHTMLvalue(budget, +budget.innerHTML, +budget.innerHTML + +potentonalWin.innerHTML, 500);
                updateHTMLvalue(potentonalWin, +potentonalWin.innerHTML, 0, 500)
                updateHTMLvalue(totalProfit, +totalProfit.innerHTML, +totalProfit.innerHTML - (+totalBet.innerHTML - +potentonalWin.innerHTML), 500);
                updateHTMLvalue(totalBet, +totalBet.innerHTML, 0, 500);
                updateHTMLvalue(gamesPlayed, +gamesPlayed.innerHTML, +gamesPlayed.innerHTML + 1, 50);
                afterGameContent.children[0].innerHTML = `Prehral si ${Math.round((totalBetPerGame-sumOfPotentWin)*100)/100} žetón${sklonovanie("",Math.round((sumOfPotentWin-totalBetPerGame)*100)/100)} !`
                afterGameContent.children[0].style.color = "red";
                await wait(300);
                afterGameContent.style.transform = "scale(1,1)";
            }

        })

        //chod hracov na plosinu
        for (let i = 0; i < nPlayers; i++) {
            await wait(1);
            startinPlatform.children[i].style.transform = "translate(0,0)";
        }
        await wait(400);
        updatePlayersPositions(players);
        updatePlatformsPositions(platforms);
        window.addEventListener('resize', () => {
            updatePlayersPositions(players);
           updatePlatformsPositions(platforms);
        });


        let correctPlatforms = [];
        let currentPlatform = -1;
        let hoveredPlatform = [];
        let leaderLoaded = true;
        copyOfNplatforms = nPlatforms;
        let gameEnd = false;
        //Platform click listener 
        for (let j = 0; j < platforms.length; j++) {
            platforms[j].HTMLElement.addEventListener('click', async () => {
                if (platforms[j].broken) return; // not listen to those 
                if (gameEnd) return;
                if (hoveredPlatform.indexOf(j) > -1) platforms[j].HTMLElement.style.border = "1px solid white";
                let leaderIndex = giveMeLeaderIndex(players);
                if (players[leaderIndex].winner) return;
                let teamLeader = players[leaderIndex];
                let idPlatform = platforms[j].id;
                let previousPlatform = idPlatform % 2 == 0 ? platforms[idPlatform + 1] : false;
                let nextPlatform = idPlatform % 2 == 1 ? platforms[idPlatform - 1] : false;
                let previousSectionRevealed =
                    idPlatform % 2 == 1 ?
                    (platforms[idPlatform - 2] && platforms[idPlatform - 3] ? (platforms[idPlatform - 2].revealed && platforms[idPlatform - 3].revealed) : true) :
                    (platforms[idPlatform - 1] && platforms[idPlatform - 2] ? (platforms[idPlatform - 1].revealed && platforms[idPlatform - 2].revealed) : true);
                if (previousSectionRevealed && leaderLoaded) {
                    leaderLoaded = false; //now he is going to move 
                    let whatSectionToGo = correctPlatforms.indexOf(j);
                    let whatSectionToLeave = correctPlatforms.indexOf(currentPlatform);
                    if (currentPlatform == -1) {
                        //prvotny pohyb zo strarting plaform
                        if (correctPlatforms.length > 0) {
                            for (let i = 0; i <= whatSectionToGo; i++) {
                                await animatePlayer(teamLeader, platforms[correctPlatforms[i]]);
                                await wait(400)
                            }
                        } else {
                            //uplne prvy hrac 
                            await animatePlayer(teamLeader, platforms[j]);
                            await wait(400);
                        }
                    } else {
                        //Pohyb dozadu   na moste(lahsia varianta)                                              
                        if (whatSectionToLeave > whatSectionToGo && whatSectionToGo != -1) {
                            //jednotkovy pohyb dozadu
                            if (Math.abs(whatSectionToLeave - whatSectionToGo) == 1) {
                                await animatePlayer(teamLeader, platforms[j]);
                                await wait(400);
                            } else {
                                for (let i = whatSectionToLeave - 1; i >= whatSectionToGo; i--) {
                                    await animatePlayer(teamLeader, platforms[correctPlatforms[i]]);
                                    await wait(400);
                                }
                            }

                        }
                        //Pohyb dopredu na moste(tazsia varianta)
                        else if (whatSectionToLeave < whatSectionToGo || whatSectionToGo == -1) {
                            //hybeme sa medzi 0tou sekciou a poslednou znamou
                            if (whatSectionToLeave < whatSectionToGo && whatSectionToGo != -1) {
                                //nejdeme na poslednu                                     
                                for (let i = whatSectionToLeave + 1; i <= whatSectionToGo; i++) {
                                    await animatePlayer(teamLeader, platforms[correctPlatforms[i]]);
                                    await wait(400);
                                }
                            }
                            //chceme sa dostat na novu sekciu kde sme este neboli
                            else if (whatSectionToGo == -1) {
                                whatSectionToGo = correctPlatforms.length - 1;
                                for (let i = whatSectionToLeave + 1; i <= whatSectionToGo; i++) {
                                    await animatePlayer(teamLeader, platforms[correctPlatforms[i]]);
                                    await wait(400);
                                }
                                await animatePlayer(teamLeader, platforms[j]);
                                await wait(400);
                            }
                        }
                    }
                    let result = handlePlayerMovement(teamLeader, platforms[j], previousPlatform, nextPlatform, copyOfNplatforms, betContent.children[2]);
                    //dajme zelenu farbu predposlednej spravnej sekcii
                    result.hoverPlatform ? hoveredPlatform.push(result.hoverPlatform) : 0;
                    result.hoverPlatform ? platforms[result.hoverPlatform].HTMLElement.style.border = "1px solid green" : 0;
                    (result.correctPlatform === 0 || result.correctPlatform) ? correctPlatforms.push(result.correctPlatform): 0;
                    copyOfNplatforms = result.numPlatforms;
                    betButton.numPlatforms = copyOfNplatforms;
                    updatePlayersRate(players, copyOfNplatforms);
                    checkAllPlatforms(platforms) ? endPlatform.style.background = "rgba(12, 240, 69, 0.392)" : 0;
                    currentPlatform = result.playerOnPlatform;
                    let gameEndResult = checkGameEnd(players);
                    if (gameEndResult) {
                        for (let i = 0; i < nPlatforms; i++) {
                            bridge.children[2 * nPlatforms - (i + 1)].style.transform = "scale(0,0)";
                            bridge.children[i].style.transform = "scale(0,0)";
                            await wait(30);
                        }
                        removeChilds(startinPlatform);
                        let resultFromLocalStorage = JSON.parse(localStorage.getItem("profile"));
                        resultFromLocalStorage.profit -= +totalBet.innerHTML;
                        resultFromLocalStorage.nGames += 1;
                        localStorage.setItem("profile", JSON.stringify(resultFromLocalStorage))
                        updateHTMLvalue(potentonalWin, +potentonalWin.innerHTML, 0, 500);
                        updateHTMLvalue(totalProfit, +totalProfit.innerHTML, +totalProfit.innerHTML - +totalBet.innerHTML, 500);
                        updateHTMLvalue(gamesPlayed, +gamesPlayed.innerHTML, +gamesPlayed.innerHTML + 1, 50);
                        updateHTMLvalue(totalBet, +totalBet.innerHTML, 0, 500);
                        handleBetLoaded = false;
                        afterGameContent.style.display = "flex";
                        afterGameContent.children[0].innerHTML = `Prehral si ${totalBetPerGame} žetón${sklonovanie("",totalBet)}!`

                        afterGameContent.children[0].style.color = "red";
                        await wait(300);
                        afterGameContent.style.transform = "scale(1,1)";
                    }
                    leaderLoaded = true;

                }
            })
        }
    } else {
        ///////////////////DESTOP///////////////
        let players = [];
        let platforms = [];
        totalBetPerGame = 0;
        bridge.classList.remove("bridgeMobile");
        bridge.classList.add("bridge");
        //Vytvorenie HTML platforiem
        for (let i = 0; i < nPlatforms * 2; i++) {
            bridge.appendChild(document.createElement("div"));
            bridge.children[i].classList.add("platform");
        }
        await wait(1);
        //Efekt prichodu platforiem
        for (let i = 0; i < nPlatforms * 2; i++) {
            bridge.children[i].offsetWidth < 150 ? bridge.children[i].style.height = `${bridge.children[i].offsetWidth}px` : 0;
            bridge.children[i].style.transform = "scale(1,1)";
            //zakladne udaje pre platformy      
            platforms.push({
                id: i,
                HTMLElement: bridge.children[i],
                positions: {
                    x: bridge.children[i].getBoundingClientRect().left,
                    y: bridge.children[i].getBoundingClientRect().top
                },
                revealed: false,
                broken: false
            })
            await wait(30);
        }



        //Pridanie HRACOV         
        for (let i = 0; i < nPlayers; i++) {
            startinPlatform.appendChild(document.createElement("div"));
            startinPlatform.children[i].classList.add("player");
            i == 0 ? startinPlatform.children[i].style.marginTop = `${(startinPlatform.offsetHeight-25*nPlayers)/(nPlayers*2)}px` : startinPlatform.children[i].style.marginTop = `${(startinPlatform.offsetHeight-25*nPlayers)/(nPlayers)}px`;
            i == nPlayers ? startinPlatform.children[i].style.marginBottom = `${(startinPlatform.offsetHeight-25*nPlayers)/(nPlayers*2)}px` : startinPlatform.children[i].style.marginBottom = `${(startinPlatform.offsetHeight-25*nPlayers)/(nPlayers)}px`;
            startinPlatform.children[i].style.transition = `${0.3+Math.random()/10}s ease-in`;
            startinPlatform.children[i].appendChild(document.createElement("div"));
            let option = document.createElement("option");
            option.innerHTML = `${i+1}. hráč`;
            option.value = i;
            betContent.children[2].appendChild(option);

            startinPlatform.children[i].children[0].classList.add("tooltipText");
            players.push({
                id: i,
                HTMLElement: startinPlatform.children[i],
                //kurz:0,
                initPosition: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                kurz: 0,
                holding: 0,
                showDetails: false,
                death: false,
                loaded: false,
                winner: false
            })
        }
       
        updatePlayersRate(players, nPlatforms); // daj hracom init kurzy             
        players.forEach(player => player.HTMLElement.addEventListener('click', () => {
            showSingleRate(player,players);
        }))
        //highlight first player after init screen
        players[0].HTMLElement.click();

        //Highlith clciked player
        let index = betContent.children[2].value;
        betContent.children[2].indexParam = index;
        betContent.children[2].playersParam = players;
        betContent.children[2].addEventListener('change', handleInputChange, false);

        //Logika pre koncovu platformu
        let ratesShowed = false;
        showRatesButton.addEventListener('click', () => {
            ratesShowed ? (hideRates(players), showRatesButton.innerHTML = "Ukaž kurzy") : (showRates(players), showRatesButton.innerHTML = "Skry kurzy");
            ratesShowed = !ratesShowed;
        })

        let copyOfNplatforms = nPlatforms;
        betButton.numPlatforms = copyOfNplatforms;
        betButton.playersParam = players;
        betButton.addEventListener('click', handleBet, false)


        //End platform event listener if we won
        endPlatform.addEventListener('click', async () => {
            // get positions of end platform for animation purposes
            let endPlatformHtml = {
                positions: {
                    x: endPlatform.getBoundingClientRect().x + endPlatform.getBoundingClientRect().width / 2,
                    y: endPlatform.getBoundingClientRect().y + endPlatform.getBoundingClientRect().height / 2
                }
            }
            //if all platforms are revealed and leader is loaded
            let sumOfPotentWin = 0;
            players.forEach(player => {
                if (!player.death) {
                    sumOfPotentWin += player.holding;
                }
            })
            //Vyhrali sme a sme v profite
            if (checkAllPlatforms(platforms) && leaderLoaded && (sumOfPotentWin - totalBetPerGame) >= 0) {
                let leaderIdx = giveMeLeaderIndex(players)
                if (players[leaderIdx].winner) return;
                animatePlayer(players[leaderIdx], endPlatformHtml, true);
                players[leaderIdx].winner = true;
                if (checkGameEnd(players, true).num > 1) {
                    for (let j = 0; j < correctPlatforms.length; j++) {
                        for (let i = 0; i < players.length; i++) {
                            if (players[i].death == false && players[i] != players[leaderIdx]) {
                                animatePlayer(players[i], platforms[correctPlatforms[j]]);
                                await wait(30);
                                //updatePanel()
                            }
                        }
                        await wait(250);
                    }
                    for (let i = 0; i < players.length; i++) {
                        if (!players[i].death) {
                            animatePlayer(players[i], endPlatformHtml, true);
                            players[i].winner = true;
                            await wait(30);
                        }
                    }

                }
                //showWinningMenu() 
                // toto urobit ako funcosku
                for (let i = 0; i < nPlatforms; i++) {
                    bridge.children[2 * nPlatforms - (i + 1)].style.transform = "scale(0,0)";
                    bridge.children[i].style.transform = "scale(0,0)";
                    await wait(30);
                }
                removeChilds(startinPlatform)
                handleBetLoaded = false;

                afterGameContent.style.display = "flex";
                let resultFromLocalStorage = JSON.parse(localStorage.getItem("profile"));
                resultFromLocalStorage.budget += +potentonalWin.innerHTML;
                console.log(+potentonalWin.innerHTML)
                resultFromLocalStorage.profit += ((+potentonalWin.innerHTML) - (+totalBet.innerHTML));
                resultFromLocalStorage.nGames += 1;
                localStorage.setItem("profile", JSON.stringify(resultFromLocalStorage));
                updateHTMLvalue(budget, +budget.innerHTML, +budget.innerHTML + +potentonalWin.innerHTML, 500);
                updateHTMLvalue(gamesPlayed, +gamesPlayed.innerHTML, +gamesPlayed.innerHTML + 1, 50);
                updateHTMLvalue(totalProfit, +totalProfit.innerHTML, +totalProfit.innerHTML + (+potentonalWin.innerHTML - +totalBet.innerHTML), 500);
                updateHTMLvalue(potentonalWin, +potentonalWin.innerHTML, 0, 500);
                updateHTMLvalue(totalBet, +totalBet.innerHTML, 0, 500);
                afterGameContent.children[0].innerHTML = `Vyhral si ${Math.round((sumOfPotentWin-totalBetPerGame)*100)/100} žetón${sklonovanie("",Math.round((sumOfPotentWin-totalBetPerGame)*100)/100)} !`
                afterGameContent.children[0].style.color = "green";
                await wait(300);
                afterGameContent.style.transform = "scale(1,1)";
            } else if (checkAllPlatforms(platforms) && leaderLoaded && (sumOfPotentWin - totalBetPerGame) < 0) {
                let leaderIdx = giveMeLeaderIndex(players)
                if (players[leaderIdx].winner) return;
                animatePlayer(players[leaderIdx], endPlatformHtml, true);
                players[leaderIdx].winner = true;
                if (checkGameEnd(players, true).num > 1) {
                    for (let j = 0; j < correctPlatforms.length; j++) {
                        for (let i = 0; i < players.length; i++) {
                            if (players[i].death == false && players[i] != players[leaderIdx]) {
                                animatePlayer(players[i], platforms[correctPlatforms[j]]);
                                await wait(30);
                                //updatePanel()
                            }
                        }
                        await wait(250);
                    }
                    for (let i = 0; i < players.length; i++) {
                        if (!players[i].death) {
                            animatePlayer(players[i], endPlatformHtml, true);
                            players[i].winner = true;
                            await wait(30);
                        }
                    }

                }

                for (let i = 0; i < nPlatforms; i++) {
                    bridge.children[2 * nPlatforms - (i + 1)].style.transform = "scale(0,0)";
                    bridge.children[i].style.transform = "scale(0,0)";
                    await wait(30);
                }
                removeChilds(startinPlatform)
                handleBetLoaded = false;

                afterGameContent.style.display = "flex";
                //budget.innerHTML = +budget.innerHTML + +potentonalWin.innerHTML  ;
                //potentonalWin.innerHTML=0; 
                let resultFromLocalStorage = JSON.parse(localStorage.getItem("profile"));
                resultFromLocalStorage.profit -= (+totalBet.innerHTML - +potentonalWin.innerHTML);
                resultFromLocalStorage.nGames += 1;
                resultFromLocalStorage.budget += +potentonalWin.innerHTML;
                localStorage.setItem("profile", JSON.stringify(resultFromLocalStorage));
                updateHTMLvalue(budget, +budget.innerHTML, +budget.innerHTML + +potentonalWin.innerHTML, 500);
                updateHTMLvalue(potentonalWin, +potentonalWin.innerHTML, 0, 500)
                updateHTMLvalue(totalProfit, +totalProfit.innerHTML, +totalProfit.innerHTML - (+totalBet.innerHTML - +potentonalWin.innerHTML), 500);
                updateHTMLvalue(totalBet, +totalBet.innerHTML, 0, 500);
                updateHTMLvalue(gamesPlayed, +gamesPlayed.innerHTML, +gamesPlayed.innerHTML + 1, 50);
                afterGameContent.children[0].innerHTML = `Prehral si ${Math.round((totalBetPerGame-sumOfPotentWin)*100)/100} žetón${sklonovanie("",Math.round((sumOfPotentWin-totalBetPerGame)*100)/100)} !`
                afterGameContent.children[0].style.color = "red";
                await wait(300);
                afterGameContent.style.transform = "scale(1,1)";
            }

        })
        //Chod hracov na plosinu
        for (let i = 0; i < nPlayers; i++) {
            startinPlatform.children[i].style.transform = "translate(0,0)";
        }
        await wait(400);
        updatePlayersPositions(players);
        
        window.addEventListener('resize', () => {            
            updatePlatformsPositions(platforms);                      
            
        })
        let correctPlatforms = [];
        let currentPlatform = -1;
        let hoveredPlatform = [];
        let leaderLoaded = true;
        copyOfNplatforms = nPlatforms;
        let gameEnd = false;
        //Platform click listener 
        for (let j = 0; j < platforms.length; j++) {
            platforms[j].HTMLElement.addEventListener('click', async () => {
                if (platforms[j].broken) return; // not listen to those    
                if (gameEnd) return;
                if (hoveredPlatform.indexOf(j) > -1) platforms[j].HTMLElement.style.border = "1px solid white";
                let leaderIndex = giveMeLeaderIndex(players);
                if (players[leaderIndex].winner) return;
                let teamLeader = players[leaderIndex];
                let idPlatform = platforms[j].id;
                let previousPlatform = idPlatform % 2 == 0 ? platforms[idPlatform + 1] : false;
                let nextPlatform = idPlatform % 2 == 1 ? platforms[idPlatform - 1] : false;
                let previousSectionRevealed =
                    idPlatform % 2 == 1 ?
                    (platforms[idPlatform - 2] && platforms[idPlatform - 3] ? (platforms[idPlatform - 2].revealed && platforms[idPlatform - 3].revealed) : true) :
                    (platforms[idPlatform - 1] && platforms[idPlatform - 2] ? (platforms[idPlatform - 1].revealed && platforms[idPlatform - 2].revealed) : true);
                if (previousSectionRevealed && leaderLoaded) {
                    leaderLoaded = false; //now he is going to move                         
                    let whatSectionToGo = correctPlatforms.indexOf(j);
                    let whatSectionToLeave = correctPlatforms.indexOf(currentPlatform);
                    if (currentPlatform == -1) {
                        //prvotny pohyb zo strarting plaform
                        if (correctPlatforms.length > 0) {
                            for (let i = 0; i <= whatSectionToGo; i++) {
                                await animatePlayer(teamLeader, platforms[correctPlatforms[i]]);
                                await wait(400)
                            }
                        } else {
                            //uplne prvy hrac  
                            await animatePlayer(teamLeader, platforms[j]);
                            await wait(400);
                        }
                    } else {
                        //Pohyb dozadu   na moste(lahsia varianta)                                              
                        if (whatSectionToLeave > whatSectionToGo && whatSectionToGo != -1) {
                            //jednotkovy pohyb dozadu
                            if (Math.abs(whatSectionToLeave - whatSectionToGo) == 1) {
                                await animatePlayer(teamLeader, platforms[j]);
                                await wait(400);
                            } else {
                                for (let i = whatSectionToLeave - 1; i >= whatSectionToGo; i--) {
                                    await animatePlayer(teamLeader, platforms[correctPlatforms[i]]);
                                    await wait(400);
                                }
                            }
                        }
                        //Pohyb dopredu na moste(tazsia varianta)
                        else if (whatSectionToLeave < whatSectionToGo || whatSectionToGo == -1) {
                            //hybeme sa medzi 0tou sekciou a poslednou znamou
                            if (whatSectionToLeave < whatSectionToGo && whatSectionToGo != -1) {
                                //nejdeme na poslednu                                     
                                for (let i = whatSectionToLeave + 1; i <= whatSectionToGo; i++) {
                                    await animatePlayer(teamLeader, platforms[correctPlatforms[i]]);
                                    await wait(400);
                                }
                            }
                            //chceme sa dostat na novu sekciu kde sme este neboli
                            else if (whatSectionToGo == -1) {
                                whatSectionToGo = correctPlatforms.length - 1;
                                for (let i = whatSectionToLeave + 1; i <= whatSectionToGo; i++) {
                                    await animatePlayer(teamLeader, platforms[correctPlatforms[i]]);
                                    await wait(400);
                                }
                                await animatePlayer(teamLeader, platforms[j]);
                                await wait(400);
                            }
                        }
                    }
                    let result = handlePlayerMovement(teamLeader, platforms[j], previousPlatform, nextPlatform, copyOfNplatforms, betContent.children[2]);
                    //dajme zelenu farbu predposlednej spravnej sekcii
                    result.hoverPlatform ? hoveredPlatform.push(result.hoverPlatform) : 0;
                    result.hoverPlatform ? platforms[result.hoverPlatform].HTMLElement.style.border = "1px solid green" : 0;
                    (result.correctPlatform === 0 || result.correctPlatform) ? correctPlatforms.push(result.correctPlatform): 0;

                    copyOfNplatforms = result.numPlatforms;
                    betButton.numPlatforms = copyOfNplatforms;
                    updatePlayersRate(players, copyOfNplatforms);
                    checkAllPlatforms(platforms) ? endPlatform.style.background = "rgba(12, 240, 69, 0.392)" : 0;
                    currentPlatform = result.playerOnPlatform;
                    let gameEndResult = checkGameEnd(players);
                    if (gameEndResult) {
                        for (let i = 0; i < nPlatforms; i++) {
                            bridge.children[2 * nPlatforms - (i + 1)].style.transform = "scale(0,0)";
                            bridge.children[i].style.transform = "scale(0,0)";
                            await wait(30);
                        }
                        removeChilds(startinPlatform);
                        let resultFromLocalStorage = JSON.parse(localStorage.getItem("profile"));
                        resultFromLocalStorage.profit -= +totalBet.innerHTML;
                        resultFromLocalStorage.nGames += 1;
                        localStorage.setItem("profile", JSON.stringify(resultFromLocalStorage))
                        updateHTMLvalue(potentonalWin, +potentonalWin.innerHTML, 0, 500);
                        updateHTMLvalue(totalProfit, +totalProfit.innerHTML, +totalProfit.innerHTML - +totalBet.innerHTML, 500);
                        updateHTMLvalue(gamesPlayed, +gamesPlayed.innerHTML, +gamesPlayed.innerHTML + 1, 50);
                        updateHTMLvalue(totalBet, +totalBet.innerHTML, 0, 500);
                        handleBetLoaded = false;

                        afterGameContent.style.display = "flex";
                        afterGameContent.children[0].innerHTML = `Prehral si ${totalBetPerGame} žetón${sklonovanie("",totalBet)}!`
                        afterGameContent.children[0].style.color = "red";
                        await wait(300);
                        afterGameContent.style.transform = "scale(1,1)";
                    }
                    leaderLoaded = true;
                }
            })
        }
    }
}
//Support functions
const giveMeLeaderIndex = (players) => {
    for (let i = 0; i < players.length; i++) {
        if (players[i].death == false) {
            return i;
        }
    }
    return null;
}
const animatePlayer = async (player, platorm, otherElements) => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.body.clientWidth < 800  )   betContent.style.transform="scale(0,0)";
    if (otherElements) {
        return new Promise((res) => {
           
            res(player.HTMLElement.style.transform = `translate(${platorm.positions.x-(player.initPosition.x+player.initPosition.width/2)}px,${platorm.positions.y-(player.initPosition.y+player.initPosition.height/2)}px)`);
        })
    } else {
        if (!platorm.broken) {
            return new Promise((res) => {
                res(player.HTMLElement.style.transform = `translate(${platorm.positions.x-(player.initPosition.x+player.initPosition.width/2)}px,${platorm.positions.y-(player.initPosition.y+player.initPosition.height/2)}px)`);
            })
        }
    }
}
const handlePlayerMovement = (player, platform, previousPlatform, nextPlatform, nPlatforms, input) => {
    let decider = Math.random();
    //PRI POHYBE 
    if (previousPlatform.revealed || nextPlatform.revealed) {
        platform.revealed = true;
        return {
            correctPlatform: null,
            playerOnPlatform: platform.id,
            numPlatforms: nPlatforms
        }
    } else {
        //ZOMRE
        if (decider > 0.5) {
            player.death = true;
            player.HTMLElement.children[0].style.scale = "(0,0)";
            player.HTMLElement.children[0].style.visibility = "hidden";
            platform.HTMLElement.style.background = `transparent`;
            player.HTMLElement.style.visibility = "hidden";
            let diff =  (+potentonalWin.innerHTML - player.holding)>0 ?  +potentonalWin.innerHTML - player.holding:0;
            updateHTMLvalue(potentonalWin, +potentonalWin.innerHTML, diff, 100);
            player.holding = 0;
            for (let i = 0; i < input.children.length; i++) {
                if (player.id == input.children[i].value) {
                    input.removeChild(input.children[i]);

                } //remove from input options dead player!
            }
            platform.revealed = true;
            platform.broken = true;
            let result = platform.id % 2 == 0 ? platform.id + 1 : platform.id - 1;
            return {
                correctPlatform: result,
                playerOnPlatform: -1,
                hoverPlatform: result,
                numPlatforms: nPlatforms - 1
            };
        }
        //NEZOMRE
        else {
            platform.revealed = true;
            if (previousPlatform) {
                previousPlatform.HTMLElement.style.background = `transparent`;
                previousPlatform.revealed = true;
                previousPlatform.broken = true;
            } else if (nextPlatform) {
                nextPlatform.HTMLElement.style.background = `transparent`;
                nextPlatform.revealed = true;
                nextPlatform.broken = true;
            }
            let result = platform.id;
            return {
                correctPlatform: result,
                playerOnPlatform: platform.id,
                numPlatforms: nPlatforms - 1
            };
        }
    }
}

const setPlayerStatus = (players, status, index) => {
    if (index) {
        players[index].loaded = status;
        return;
    } else {
        players.forEach(player => {
            player.loaded = status
            return;
        })
    }
}

const checkPlayerStatus = (players, index) => {
    if (index) {
        return players[index].loaded;

    } else {
        players.forEach(player => {
            if (player.loaded == false) return false;
        })
        return true;
    }
}
const checkGameEnd = (players, num) => {
    let numOfAlive = 0;
    let result = true;
    players.forEach(player => {
        if (player.death == false) result = false;
        if (num && player.death == false) numOfAlive++;
    })
    if (!num) return result;
    else return {
        gameEnd: result,
        num: numOfAlive
    }
}
const updatePlayersPositions = (players) => {
    players.forEach(player => {
        player.initPosition.x = player.HTMLElement.getBoundingClientRect().x;
        player.initPosition.y = player.HTMLElement.getBoundingClientRect().y;
        player.initPosition.width = player.HTMLElement.getBoundingClientRect().width;
        player.initPosition.height = player.HTMLElement.getBoundingClientRect().height;
    });
}
const updatePlatformsPositions = (platforms) => {
    platforms.forEach(platform => {       
        platform.positions.x = platform.HTMLElement.getBoundingClientRect().x + platform.HTMLElement.getBoundingClientRect().width / 2;
        platform.positions.y = platform.HTMLElement.getBoundingClientRect().y + platform.HTMLElement.getBoundingClientRect().height / 2;

    })
}

const checkAllPlatforms = (platforms) => {
    let result = true;
    platforms.forEach(platform => {
        if (platform.revealed == false) result = false
    })
    return result;
}
const setErrorMessage = (status, color, text, Y) => {
    if (!status) {
        errorBox.innerHTML = "";
    } else {
        errorBox.style.color = color;
        errorBox.innerHTML = text;
        errorBox.style.transform = `translate(0,${Y})`
    }
}
const updatePlayersRate = (players, numPlatforms) => {
    let numPlayer = 1;
    //update on desk info
    players.forEach(player => {
        if (!player.death) {
            let ratio = (0.98) / (vyhraCelkovo(numPlayer, numPlatforms));
            player.kurz = ratio <= 1 ? 1 : Math.round(ratio * 100) / 100;
            player.HTMLElement.children[0].innerHTML = `Kurz: ${player.kurz} </br>`;
            player.HTMLElement.children[0].innerHTML += `Možný výnos: ${Math.round(player.holding*100)/100}`;
            numPlayer++;
        }
    })

    //update panel info savnime to do local storage 

}

const showRates = async (players) => {
    players.forEach(player => {
        if (!player.death) {
            player.showDetails = true;
            player.HTMLElement.style.background = "transparent";
            player.HTMLElement.style.border = "3px solid rgba(223, 238, 14, 0.863)";
            player.HTMLElement.children[0].style.visibility = "visible";
            player.HTMLElement.children[0].style.transform = "scale(1,1) ";
        }

    })
}

const updateHTMLvalue = (el, start, end, duration) => {
    // assumes integer values for start and end  

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        let progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.innerHTML = Math.floor((progress * (end - start) + start) * 100) / 100;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);


}

//Test na increment



const showSingleRate = (player,players) => {
    if(player){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.body.clientWidth < 800  ) {
            if (player.showDetails) {
                player.showDetails = false;
                player.HTMLElement.style.background = "";
                player.HTMLElement.style.border = "";            
                
            } else {
                hideRates(players);
                player.showDetails = true;
                player.HTMLElement.style.background = "transparent";
                player.HTMLElement.style.border = "3px solid rgba(223, 238, 14, 0.863)";
                betContent.style.transform="scale(1,1)";
                cancelButon.style.visibility="vissible";
                betInput.value=player.id;            
                mobilePlayerInfo.innerHTML=player.HTMLElement.children[0].innerHTML;            
            }
        }
        else{
            
            if (player.showDetails) {
                player.showDetails = false;
                player.HTMLElement.style.background = "";
                player.HTMLElement.style.border = "";
                player.HTMLElement.children[0].style.transform = "";
                player.HTMLElement.children[0].style.visibility = "";
        
            } else {
                hideRates(players);
                player.showDetails = true;
                betInput.value=player.id;
                player.HTMLElement.style.background = "transparent";
                player.HTMLElement.style.border = "3px solid rgba(223, 238, 14, 0.863)";
                player.HTMLElement.children[0].style.visibility = "visible";
                player.HTMLElement.children[0].style.transform = "scale(1,1) rotate(18deg) ";
                
            }
        }
    
    }

    else{
        players.forEach(player=>{
            if(player.showDetails){
                mobilePlayerInfo.innerHTML=player.HTMLElement.children[0].innerHTML; 
            }
        })
    }
    
}

const hideRates =  (players) => {
    
    players.forEach(player => {
        player.showDetails = false;
        player.HTMLElement.style.background = "";
        player.HTMLElement.style.border = "";
        player.HTMLElement.children[0].style.transform = "";
        player.HTMLElement.children[0].style.visibility = "";

    })
}

//Rates calculations

const prehraNaPlosine = (i, m) => {
    return choose((m - 1), (i - 1)) * (1 / Math.pow(2, m))
}
const prehraCelkovo = (i, m) => {
    let sum = 0
    for (let k = 1; k <= m; k++) {
        sum = prehraNaPlosine(i, k) + sum
    }
    return sum
}
const vyhraCelkovo = (i, m) => {
    return 1 - prehraCelkovo(i, m)
}
const choose = (n, k) => {
    if ((typeof n !== 'number') || (typeof k !== 'number'))
        return false;
    let coeff = 1;
    for (var x = n - k + 1; x <= n; x++) coeff *= x;
    for (x = 1; x <= k; x++) coeff /= x;
    return coeff;
}

const ocakavanyPocetVyhercov = (numPlayer, m) => {
    let sum = 0
    for (let k = 1; k < numPlayer; k++) {
        sum = vyhraCelkovo(k, m) + sum
    }
    return (sum)
}



const handleInputChange = function (e) {
    let index = e.currentTarget.value;
    let players = e.currentTarget.playersParam;        
    if (!players[index].death) {
        showSingleRate(players[index],players);
    }
}
const sklonovanie = (endingWord, num) => {
    if (Math.abs(num) == 1) return ""
    else if ((Math.abs(num) > 1 && Math.abs(num) < 2) || (Math.abs(num) > 0 && Math.abs(num) < 1)) return "u"
    else if (Math.abs(num) == 2 || Math.abs(num) == 3 || Math.abs(num) == 4) return "y"
    else return "ov"
}
let handleBetLoaded = true;
let totalBetPerGame = 0;
const handleBet = async (e) => {
    if (handleBetLoaded) {
        handleBetLoaded = false;
        let budget = profileInfo.children[2].children[0];

        let playerIndex = +betContent.children[2].value;
        let betInput = +betContent.children[3].value;

        if (+budget.innerHTML - betInput >= 0 && betInput > 0) {
            let players = e.currentTarget.playersParam;
            let numPlatforms = parseInt(e.currentTarget.numPlatforms);
            totalBetPerGame += betInput;
            players[playerIndex].holding += betInput * players[playerIndex].kurz;
            let resultFromLocalStorage = localStorage.getItem("profile");
            resultFromLocalStorage = JSON.parse(resultFromLocalStorage);
            resultFromLocalStorage.budget -= betInput;
            localStorage.setItem("profile", JSON.stringify(resultFromLocalStorage));
            updateHTMLvalue(budget, +budget.innerHTML, +budget.innerHTML - betInput, 1500);
            updateHTMLvalue(totalBet, +totalBet.innerHTML, totalBetPerGame, 500);            
            updatePlayersRate(players, numPlatforms);
            let sumOfPotentWin = 0;
            players.forEach(player => {
                if (!player.death) {
                    sumOfPotentWin += player.holding;
                }
            })
            updateHTMLvalue(potentonalWin, +potentonalWin.innerHTML, sumOfPotentWin, 1500);
            showSingleRate(0,players)
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || document.body.clientWidth < 800 ) betContent.style.transform="scale(0,0)";

        }
        await wait(1500);
        handleBetLoaded = true;
    } else {
        return;
    }

}
const debounce=(func)=>{
    let timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func,100,event);
    };
  }