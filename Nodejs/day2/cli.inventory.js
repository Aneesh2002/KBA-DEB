const readline=require('readline')
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const inventory =new Map();

function askCommand(){
    console.log("welcome to inventory mangement system");
    console.log("aviable commands: add,reomve,search,update,summary,exit")
    rl.question("\Enter a command:",function (command){
        switch(command.trim().toLowerCase()){
            case 'add':
                addItemPrompt();
                break;
            case 'remove':
                removeItemPrompt();
                break;
            case 'search':
                searchItemPrompt();
                break;
            case 'update':
                updateItemPrompt();
                break;
            case 'summary':
                printSummary();
                askCommand();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log('invalid command:enter a valid choice!')
                askCommand();
                break;
        }
    })
}
//function to add an item
function addItemPrompt(){
    rl.question("Enter an item id: ",function(id){
        rl.question("Enter an item name:",function(name){
            rl.question("Enter an item category:",function(category){
                rl.question("Enter item quantity:",function(quantity){
                    addItem(id,name,category,parseInt(quantity));
                    askCommand();
                });
            });
        });
    });
}
function addItem(id,name,category,quantity){
    if(inventory.has(id)){
        console.log(`Error item with id ${id} already exists`);
    }else{
        inventory.set(id,{name,category,quantity});
        console.log(`item with ${id} added to inventory!`)
    }

}
//function to remove an item
function removeItemPrompt(){
    rl.question("Enter an id to remove:",function(id){
        removeItem(id);
        askCommand();
    })
}
function removeItem(id){
    if(inventory.has(id)){
        inventory.delete(id);
        console.log(`Item with id ${id} removed`)
    }else{
        console.log(`Error:No item with ID ${id} found!`)
    }
}
//function to serach an item
function searchItemPrompt(){
    rl.question("Enter serch item:",function(searchTerm){
        searchItems(searchTerm);
        askCommand();
    });

}
function searchItems(searchTerm){
    const results=[];
    for(const[id,item] of inventory){
        if(id.includes(searchTerm)||item.name.includes(searchTerm)||item.category.includes(searchTerm)||item.quantity.includes(searchTerm)){
            results.push({id,...item});//...is spread operator
        }
    }
    if(results.length>0){
        console.log(`Search Results:`,results)
    }else{
        console.log(`Item not found!`)
    }
}
//function to update an item
function updateItemPrompt(){
    rl.question("Enter an item id: ",function(id){
        rl.question("Enter an item name:",function(newName){
            rl.question("Enter an item category:",function(newCategory){
                rl.question("Enter item quantity:",function(newQuantity){
                    updateItem(id,newName,newCategory,newQuantity ?parseInt(newQuantity):undefined);
                    askCommand();
                });
            });
        });
    });

}
function updateItem(id,newName,newCategory,newQuantity){
    if(inventory.has(id)){
        const item = inventory.get(id);
        item.name = newName || item.name;
        item.category = newCategory ||item.category;
        item.quantity = newQuantity !== undefined ?newQuantity:item.quantity;
        inventory.set(id,item);
        console.log(`item with ID ${id} updated`)
    }else{
        console.log(`Item with ID ${id} not founded`)
    }
}
//function for item summary
function printSummary(){
    if(inventory.size>0){
        console.log(`Inventory summary :`);
        for(const[id,item] of inventory){
            console.log(`ID: ${id},NAME: ${item.name}, Category: ${item.category} , Quantity: ${item.quantity}`);

        }
    }else{
        console.log(`No Items found`);
    }
}

askCommand();