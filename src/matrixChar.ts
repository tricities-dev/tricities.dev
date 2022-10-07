export class Character {
  strength: number;
  character: string;
  possibleCharacters: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};':,./<>?`~";
  constructor() {
    this.character = this.possibleCharacters.charAt(
      Math.floor(Math.random() * this.possibleCharacters.length)
    );
    this.strength = 5;
  }
  strengthDown() {
    this.strength--;
    //change character
    this.character = this.possibleCharacters.charAt(
      Math.floor(Math.random() * this.possibleCharacters.length)
    );
  }
}

//will check an array of Character and nulls, and will have a 1 in 10 chance of change first null into a Character
export function addMatrix(matrixArray: Array<Character | null>) {
  if (matrixArray[0] === null) {
    if (Math.random() < 0.01) {
      matrixArray[0] = new Character();
    }
  }
}
//This will move the matrix down one, and will lower strength of each character
export function moveMatrix(
  matrixArray: Array<Character | null>,
  maxLength: number
) {
  //Will need to check array characters if the strength 1 will need to remove it, if it is 5 will need make the next item in the array a character
  const nextCharAdd = <Array<number>>[];
  for (let i = 0; i < matrixArray.length; i++) {
    const matricChar = matrixArray[i];

    if (matricChar !== null) {
      if (matricChar.strength === 1) {
        matrixArray[i] = null;
      } else if (matricChar.strength === 5) {
        if (i + 1 < maxLength) {
          nextCharAdd.push(i + 1);
        }
        matricChar.strengthDown();
      } else {
        matricChar.strengthDown();
      }
    }
  }
  for (let i = 0; i < nextCharAdd.length; i++) {
    const index = nextCharAdd[i];
    matrixArray[index] = new Character();
  }
}
