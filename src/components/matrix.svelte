
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
        screenArray.forEach((row, rowIndex)=>{
            addMatrix(row)
            moveMatrix(row, maxHeight)
            console.log(row)
        })
    }, 1000);
    return  (() => clearInterval(intervel));
}
const matrixOn = () => {
    console.log(matrix)
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

</style>

<div class="matrix-body" id="matrix">
test
<button on:click={matrixOn}> test Button</button>
</div>