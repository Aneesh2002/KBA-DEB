function checkAge(age){
    if(age<18){
        throw new Error("you must be 18 years old")

    }else{
        console.log("you are allowed")

    }
}
try{
    //code that might throw an error
   checkAge(16)
}catch(error){
    //code to handle the error
    console.log('an error occured:'+error.message)
}finally{
    //code that runs regardless of an error
    console.log('this will always executed');
    
}