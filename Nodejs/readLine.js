const readline=require('readline');

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function askName(){
    rl.question("what is your name?",function(name){
        console.log(`hello ${name}`)
        askFavoriteLanguage();
    })
}
function askFavoriteLanguage(){
    rl.question("what is your faviorite programming language?",function(language){
        console.log(`${language} is a great choice`)
        rl.close()
    })
}
//start prompt
console.log("welcome to simple interface using readline")
askName();