try{
    //code that might throw an error
    let result=riskyOperation();
    console.log(result);
}catch(error){
    //code to handle the error
    console.log('an error occured:'+error.message)
}finally{
    //code that runs regardless of an error
    console.log('this will always run');
    
}
function riskyOperation(){
    let obj;
    obj.property;//this will throw an eror
}