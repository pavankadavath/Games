let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#Reset");
let newbtn=document.querySelector(".status");
let msg=document.querySelector("#msg");
let newgame=document.querySelector("#newgame");


const patterns=[
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8],
];

let turn=true;
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        console.log("btn clicked");
        if(turn==true){
            box.innerText="0";
            turn=false;
        }
        else{
            box.innerText="X";
            turn=true;
        }
        box.disabled=true;
        checkwinner();
    })
});

const checkwinner=()=>{
    for(let btn of patterns){
        let b1=boxes[btn[0]].innerText;
        let b2=boxes[btn[1]].innerText;
        let b3=boxes[btn[2]].innerText;
        if(b1!=="" && b2!==""&& b3!==""){
            if(b1===b2 && b2===b3){
                submit(b1);
            }
        }
    }
};
const submit=(b1)=>{
    msg.innerText=`Congratulations  winner is ${b1}`;
    newbtn.classList.remove("hide");
    disable();
}

const resetgame=()=>{
    turn=true;
    enable();
    newbtn.classList.add("hide");
}
reset.addEventListener("click",resetgame);

const disable=()=>{
    for(box of boxes){
        box.disabled=true;
    }
}

newgame.addEventListener("click",resetgame);
const enable=()=>{
    for(box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}