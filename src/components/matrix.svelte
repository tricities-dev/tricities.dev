
<script lang="ts">
import {Character, addMatrix, moveMatrix} from '../matrixChar'
import { onMount } from 'svelte';
let matrix : boolean = false;
const matrixChar : Character = new Character();
let clear : () => void | null;
let arrayHeight: number = 0;
let arrayWidth: number = 0;
const screenArray : Array<Array<Character | null>> = [];
let matrixWord: string = "";

const onKeyDownPassWord = (e: KeyboardEvent) => {
    const key = e.key;
    matrixWord += key;
    if(matrixWord.includes("neo")){
        matrix = true;
    }
}


    const cycleMatrix = (screenArray: Array<Array<Character | null>>, maxHeight: number) => {
                //Grab matrix div and clear it
        let matrixDiv = document.getElementById('matrix');
        if(matrixDiv){
            matrixDiv.innerHTML = '';
        }
        // make the rowdivs and add them to the matrix div
        screenArray.forEach((row, index)=> {
            let rowDiv = document.createElement('div');
            rowDiv.id = `row-${index}`;
            rowDiv.classList.add('row', 'matrix-div-width');
            matrixDiv?.appendChild(rowDiv);
        })
    let intervel = setInterval( async () => {
        screenArray.forEach((row, rowIndex)=>{
            // for each character in the row append a child <p> with the character.character if it exists or a blank space if null
                let rowDiv = document.getElementById(`row-${rowIndex}`);
                if(rowDiv){
                    rowDiv.innerHTML= '';
                }

            row.forEach((character, characterIndex)=>{
                //find div with id row-${rowIndex}
                let rowDiv = document.getElementById(`row-${rowIndex}`);
                //clear the row div

                //if the character is null add a line break
                if(character === null){
                    let lineBreak = document.createElement('br');
                    rowDiv?.appendChild(lineBreak);
                } else {
                    //if the character is not null add a <p> with the character.character
                    let characterDiv = document.createElement('p');
                    characterDiv.classList.add('character', `character-strength-${character.strength}`);
                    characterDiv.innerText = character.character;
                    rowDiv?.appendChild(characterDiv);
                }
                
            })
            addMatrix(row)
            moveMatrix(row, maxHeight)
        })
    }, 1000);
    return  (() => clearInterval(intervel));
}
const matrixOn = () => {
    matrix = !matrix;
}

onMount( () => {
    const matrixDiv =  document.getElementById("matrix") as HTMLDivElement;
//get width of matrix div and height of matrix div
 const screenHeight = matrixDiv.offsetHeight;
 const screenWidth = matrixDiv.offsetWidth;
 arrayWidth = Math.floor(screenWidth / 13)
 arrayHeight = Math.floor(screenHeight / 15)
//This creates an array of arrays full of nulls to represent an empty screen
for(let i = 0; i < arrayWidth; i++){
    screenArray.push([]);
    for(let j = 0; j < arrayHeight; j++){
        screenArray[i].push(null);
    }

}

})
$: {
    if(matrix){
        clear = cycleMatrix(screenArray, arrayHeight);
    }
    //if clear is defined then clear the interval
    else if (clear){
        clear();
    }

}


</script>

<style lang="scss">

.matrix-body{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}

//Need to make a row for each child div that is 13px wide
.parrent-matrix{
    display: inline-flex;
}

:global(.matrix-div-width){
    width: 15px;
    min-width: 15px;
    max-width: 15px;
}



:global(.character-strength-5){
    animation: strength5 1s linear, MoveDown 1s linear;
}

:global(.character-strength-4){
    animation: strength4 1s linear, MoveDown 1s linear;
}
:global(.character-strength-3){
    animation: strength3 1s linear, MoveDown 1s linear;
}
:global(.character-strength-2){
    animation: strength2 1s linear, MoveDown 1s linear;
}
:global(.character-strength-1){
    animation: strength1 1s linear, MoveDown 1s linear;
}

:global(.character){
    text-shadow: 0 0 10px rgba(25,247,5,0.5);
}

@keyframes strength5{
    0%{
        color:rgba(25, 247, 5, 1);
    }
    100%{
        color:rgba(25, 247, 5, .8)
    }
}
@keyframes strength4{
    0%{
        color: rgba(25, 247, 5, .8);
    }
    100%{
        color: rgba(25, 247, 5, .6)
    }
}
@keyframes strength3{
    0%{
        color: rgba(25, 247, 5, .6);
    }
    100%{
        color: rgba(25, 247, 5, .4)
    }
}
@keyframes strength2{
    0%{
        color: rgba(25, 247, 5, .4);
    }
    100%{
        color: rgba(25, 247, 5, .2)
    }
}
@keyframes strength1{
    0%{
        color: rgba(25, 247, 5, .2);
    }
    100%{
        color: rgba(25, 247, 5, 0)
    }
}


@keyframes MoveDown{
    0%{
        transform: translateY(0px);
    }
    100%{
        transform: translateY(18px);
    }
}
:global(.letterBlock){
    height: 13px;
    max-height: 13px;
}
.matrix-backdrop{
    z-index: -1;
}
</style>

<div class="matrix-body parrent-matrix matrix-backdrop" id="matrix" >
</div>
<svelte:window on:keydown|preventDefault={onKeyDownPassWord}/>