let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#res-btn");
let newbtn = document.querySelector("#new-btn");
let msgcont = document.querySelector(".msg-cont");
let msg= document.querySelector("#msg"); 

let player1 = "player1";
let player2 = "player2";

let turnO = true;
let count=0;

const winpattern =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const getPlayerNames = () => {
    // Keep prompting until a name is entered
    let name1 = prompt("Enter name for Player 1 (who will be 'O'):");
    while (!name1 || name1.trim() === "") {
        name1 = prompt("Player 1's name cannot be empty. Please enter a name:");
    }
    player1 = name1.trim();

    let name2 = prompt("Enter name for Player 2 (who will be 'X'):");
    while (!name2 || name2.trim() === "") {
        name2 = prompt("Player 2's name cannot be empty. Please enter a name:");
    }
    player2 = name2.trim();

    // You might want to display who is 'O' and who is 'X'
    alert(`${player1} will be 'O' and ${player2} will be 'X'. Let's start!`);
};

const resetgame = () => {
    turnO=true;
    count = 0;
    enableboxes();
    msgcont.classList.add("hide");
};

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
             currentPlayerSymbol = "O";
            turnO=false;
        }
        else{
            box.innerText = "X";
            currentPlayerSymbol = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

       let isWinner = checkWinner();

       if (count === 9 && !isWinner) {
      gameDraw();
    }
    });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgcont.classList.remove("hide");
  disableBoxes();
};

const disableboxes = () => {
    for(let box of boxes) {
        box.disabled =true;
    }
};

const enableboxes = () => {
    for(let box of boxes) {
        box.disabled =false;
        box.innerText="";
    }
};

const showWinner = (symbol) => {
    let winnername = (symbol === "O") ? player1  : player2;
    msg.innerHTML = `Congratulations, <strong>${winnername}</strong> is the Winner!`;
    msgcont.classList.remove("hide");
    disableboxes();
};

const checkWinner = () => {
    for( let pattern of winpattern){
        let pos1Val = boxes[ pattern[0]].innerText;
        let pos2Val = boxes[ pattern[1]].innerText;
        let pos3Val = boxes[ pattern[2]].innerText;
        if(pos1Val !=""  && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val=== pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

newbtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);

getPlayerNames();