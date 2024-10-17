const lodash =require('lodash')

console.log("hello")

const newName='Node.js';

console.log("hello",`${newName}`)

if(newName==='Node.js'){
    console.log("running on node.js environment")

}
for (let i=0;i<5;i++){
    console.log(i+1)
}

let a=[1,2,3,4,5];
console.log(lodash.reverse(a))

