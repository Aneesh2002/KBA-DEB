const readline=require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const bookinventory= new Map();
  function askCommand(){
    console.log("Welcome to Library management inventory")
    console.log("this is the avialable commands:add,update,remove,search,summary,exit")
    rl.question("\Enter a command:",function(command){
        switch(command.trim().toLowerCase()){
            case 'add':
                addbookPrompt();
                break;
            case 'remove':
                removebookPrompt();
                break;
            case 'update':
                updatebookPrompt();
                break;
            case 'search':
                searchbookPrompt();
                break;
            case 'summary':
                printSummary();
                askCommand()
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log("you are enterd a wrong command please check") 
                askCommand();
                break;   
        }
    })
  }
  function addbookPrompt(){
    rl.question("Enter the book id:",function(id){
        rl.question("Enter the book tiltle:",function(title){
            rl.question("Enter the Auther name:",function(author){
                rl.question("Enter the genere of book:",function(genere){
                    addBook(id,title,author,genere)
                    askCommand()
                })
            })
        })
    })
  }
  function addBook(id,title,author,genere){
    if (bookinventory.has(id)){
        console.log(`your enterd id ${id} has  already exists `)

    }else{
        bookinventory.set(id,{title,author,genere})
        console.log(`your enterd book with ${id} enterd to inventory`)

    }
  }
  function removebookPrompt(){
    rl.question("Enter an book id to remove:",function(id){
        removeBook(id);
        askCommand()
    })
  }
  function removeBook(id){
    if(bookinventory.has(id)){
        bookinventory.delete(id);
        console.log(`your id with ${id} book has removed`)
    }else{
        console.log(`your enterd id ${id} has not in bookinventory`)
    }
  }

  function searchbookPrompt(){
    rl.question("Enter the search term:",function(searchTerm){
        searchBook(searchTerm);
        askCommand();
    })
  }
  function searchBook(searchTerm){
    const result=[];
    for(const[id,book] of bookinventory ){
        if(id.includes(searchTerm) || book.title.includes(searchTerm) || book.author.includes(searchTerm || genere.book.includes(searchTerm))){
            result.push({id,...book})

        }
            
    }
    if(result.length>0){
        console.log("Search results :",result)

    }else{
        console.log("you are book is not found")
    }
  }
  function updatebookPrompt(){
    rl.question("Enter your book id:",function(id){
        rl.question("Enter a new book title:",function(newTitle){
            rl.question("Enter a new Author Name:",function(newAuthor){
                rl.question("Enter a new genere:",function(newGenere){
                    updateBook(id,newTitle,newAuthor,newGenere)
                    askCommand()

                })
            })
        })
    })
  }
  function updateBook(id,newTitle,newAuthor,newGenere){
    if(bookinventory.has(id)){
        const book=bookinventory.get(id);
        book.title=newTitle || book.title;
        book.author= newAuthor || book.author
        book.genere = newGenere || book.genere
        bookinventory.set(id,book);
        console.log(`you are enterd id ${id} eith the book is updated`)
    }else{
        console.log(`book with  this ${id} not found`)
    }
  }

  function printSummary(){
    if(bookinventory.size>0){
        console.log("summary of inventory is:");
        for( const[id,book] of bookinventory){
            console.log(`book id:${id},book title:${book.title},book authorname is:${book.author},book genere is :${book.genere}`)

        }
    }else{
        console.log("no books found!")
    }
  }
  askCommand()