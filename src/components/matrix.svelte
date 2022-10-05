
<script lang="ts">
import {Character, addMatrix, moveMatrix} from '../matrixChar'
import { onMount } from 'svelte';
let matrix : boolean = false;
const matrixChar : Character = new Character();
let clear : () => void | null;
let arrayHeight: number = 0;
let arrayWidth: number = 0;
const screenArray : Array<Array<Character | null>> = [];


    const cycleMatrix = (screenArray: Array<Array<Character | null>>, maxHeight: number) => {
    let intervel = setInterval( async () => {
        //Grab matrix div and clear it
        let matrixDiv = document.getElementById('matrix');
        if(matrixDiv){
            matrixDiv.innerHTML = '';
        }
        
        screenArray.forEach((row, rowIndex)=>{
            //add div to the matrix div
            console.log("pass")
            let rowDiv = document.createElement('div');
            rowDiv.id= `row-${rowIndex}`;
            rowDiv.classList.add('matrix-div-width');
            matrixDiv?.appendChild(rowDiv);
            // for each character in the row append a child <p> with the character.character if it exists or a blank space if null
            row.forEach((character, characterIndex)=>{
                console.log("sub pass")
                let characterDiv = document.createElement('p');
                characterDiv.id = `character-${characterIndex}`;
                characterDiv.classList.add('letterBlock')
                if(character){
                    characterDiv.innerHTML = character.character;
                }else{
                    characterDiv.innerHTML = '&#160';
                }
                rowDiv.appendChild(characterDiv);
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
    margin-left: 1px;
    margin-right: 1px;
}

:global(.letterBlock){
    height: 13px;
}
</style>

<div class="matrix-body parrent-matrix" id="matrix">
test
<button on:click={matrixOn}> test Button</button>
</div>