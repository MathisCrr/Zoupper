/*----- Variables -----*/

const grid = document.querySelectorAll(".container .grid-item");

adds = document.querySelectorAll(".add");
zouppes = document.querySelectorAll(".zouppe");
restarts = document.querySelectorAll(".restart");
victoryPannel = document.querySelector("#victory");

var map = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]
var turn = "x"

/*----- Initialisation -----*/
console.log("Initialisation du jeu")
victoryPannel.style.display = "none";
disabled();

/*----- Tools -----*/
function nextTurn(){
    if (turn === "x"){
        turn = "o";
    }
    else{
        turn = "x";
    }
}

function mapToView(){
    for(let y=0; y<map.length; y++){
        for(let x=0; x<map[y].length; x++){
            if (map[y][x] === "x"){
                grid[x+7*y].style.backgroundColor = "var(--pawn1)";
            }
            if (map[y][x] === "o"){
                grid[x+7*y].style.backgroundColor = "var(--pawn2)";
            }
            else if (map[y][x] === 0){
                grid[x+7*y].style.backgroundColor = "var(--whole-bg)";
            }
        }
    }
}

function disabled(){
    zouppes.forEach(zouppe =>{
        var arr = Array.prototype.slice.call(zouppes);
        i = arr.indexOf(zouppe);
        if (map[5][i] === 0){
            zouppe.disabled = true;
        }
        else {
            zouppe.disabled = false;
        }
    })
    adds.forEach(add =>{
        var arr = Array.prototype.slice.call(adds);
        i = arr.indexOf(add);
        if (map[0][i] !== 0){
            add.disabled = true;
        }
        else {
            add.disabled = false;
        }
    })
}

function victory(){
    for(let x=0; x<map.length; x++){
        for(let y=0; y<map[0].length; y++){
            var vic = vicDG(x, y) || vicDD(x, y) || vicH(x, y) || vicV(x, y);
            if (vicDG(x, y) || vicDD(x, y) || vicH(x, y) || vicV(x, y)){
                victoryPannel.style.color = vic === "x" ? "var(--pawn1)" : "var(--pawn2)";
                victoryPannel.style.display = "flex";
            };
        }
    }
}

function reinitialisation(){
    map = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
    turn = "x";
    disabled();
    mapToView();
    victoryPannel.style.display = "none";
}

//Verification de victoire horizontale :
function vicH(x, y){
    if (map[x][y]!==0 && (x+3 < map.length) && map[x][y]===map[x+1][y] && map[x+1][y]===map[x+2][y] && map[x+2][y]===map[x+3][y]){
        return map[x][y];
    }
    return false;
}

//Verification de victoire verticale :
function vicV(x, y){
    if(map[x][y]!==0 && (y+3 < map[0].length) && map[x][y]===map[x][y+1] && map[x][y+1]===map[x][y+2] && map[x][y+2]===map[x][y+3]){
        return map[x][y];
    }
    return false;
}

//Verification de victoire diagonale montante vers la droite / :
function vicDD(x, y){
    if(map[x][y]!==0 && (x+3 < map.length && y+3 < map[0].length) && map[x][y]===map[x+1][y+1] && map[x+1][y+1]===map[x+2][y+2] && map[x+2][y+2]===map[x+3][y+3]){
        return map[x][y];
    }
    return false
}

//Verification de victoire diagonale montante vers la gauche \ :
function vicDG(x, y){
    if(map[x][y]!==0 && (x-3 >= 0 && y+3 < map[0].length) && map[x][y]===map[x-1][y+1] && map[x-1][y+1]===map[x-2][y+2] && map[x-2][y+2]===map[x-3][y+3]){
        return map[x][y];
    }
    return false;
}


/*----- Add -----*/

adds.forEach(add => {
    add.addEventListener("click", ()=>{
        var arr = Array.prototype.slice.call(adds);
        y = arr.indexOf(add);
        var x = 0;

        //Add
        while((x<map.length) && (map[x][y] === 0)){
            x++;
        }
        map[x-1][y] = turn;

        //Disabled buttons
        disabled();        
        zouppes[y].disabled = true; 
                  

        //Initialize view and next turn
        mapToView();
        victory();
        nextTurn();
    })
})



/*----- Execution -----*/
zouppes.forEach(zouppe => {
    zouppe.addEventListener("click", ()=>{
        var arr = Array.prototype.slice.call(zouppes);
        y = arr.indexOf(zouppe);
        var x = 0;

        //Zouppe
        let next = map[x][y]
        map[x][y] = 0
        while(x < map.length-1){
            x++;
            let temp = next
            next = map[x][y]
            map[x][y] = temp
        }

        //Disabled buttons
        disabled();
        adds[y].disabled = true;

        //Initialize view and next turn
        mapToView();
        victory()
        nextTurn();
    })
})

restarts.forEach(restart => {
    restart.addEventListener("click", () => {
        reinitialisation();
    });
});


