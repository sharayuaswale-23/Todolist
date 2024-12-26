let mytodolistEl = document.getElementById("mytodolist");
let errorMsgEl = document.getElementById("errorMsg");
let userInputEl = document.getElementById("userInput");

// let todolist = [

//     {
//         title : "Html",
//         id : 1
//     },
    
//     {
//         title : "Css",
//         id : 2
//     },
//     {
//         title : "React",
//         id : 3
//     }
// ]


let todolist = onGetParsedToDo();


function CreateMyToDoList ( todo ){

    let todoId = "todo" + todo.id;
    let checkboxId = "checkbox" + todo.id;
    let titleId = "title" + todo.id;



    let listcontEl = document.createElement("li");
    listcontEl.classList.add("list_cont");
    listcontEl.id = todoId;
    mytodolistEl.appendChild( listcontEl );


    let checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.id = checkboxId;
    if( checkboxEl.isChecked === true ){

        checkboxEl.isChecked = true;
    }
    checkboxEl.onclick = function(){

        onCheckToDo( checkboxId, titleId, todoId );
    }
    listcontEl.appendChild( checkboxEl );

    let labelEl = document.createElement("label");
    labelEl.classList.add("label");
    labelEl.htmlFor = checkboxId;
    listcontEl.appendChild( labelEl );

    let titleEl = document.createElement("h4");
    titleEl.textContent = todo.title;
    titleEl.id = titleId;
    if( todo.isChecked === true ){

        titleEl.classList.add("checked");
    }
    labelEl.appendChild( titleEl );

    let delBtnEl = document.createElement("button");
    delBtnEl.classList.add("deletebutton");
    delBtnEl.onclick = function(){

        onDelToDo( todoId );
    }
    labelEl.appendChild( delBtnEl );

    let trashIconEl = document.createElement("i");
    trashIconEl.classList.add( "fa-solid","fa-trash" );
    delBtnEl.appendChild( trashIconEl );

}


for( i of todolist ){

    CreateMyToDoList( i );

}

function onAddToDo(){

    let newObj = new Date();

    let isNewID = Math.ceil( Math.random() * newObj.getTime());


    let isNewToDo = {

        title : userInputEl.value,
        id : isNewID,
        isChecked : false
    }
     
    if( userInputEl.value === "" ){

        errorMsgEl.textContent = "Please Provide A Valid Input!!!!!";
    }
    else{

        CreateMyToDoList( isNewToDo );

        todolist.push( isNewToDo );

        errorMsgEl.textContent = "";

        userInputEl.value = "";
    }
}


function onCheckToDo( checkboxId, titleId, todoId ){

    let checkboxEl = document.getElementById( checkboxId );
    let titleEl = document.getElementById( titleId );


    if ( checkboxEl.checked === true ){

        titleEl.classList.add("checked");
    }
    else{

        titleEl.classList.remove("checked");
    }


    let isToDo = todoId.slice( 4 );

    let isIsIndex = todolist.findIndex( (each)=> each.id == isToDo );


    for( let i = 0; i < todolist.length; i++ ){

        if( isIsIndex === i ){

            if( todolist[i].isChecked === false ){

                todolist[i].isChecked = true;
            }
            else{

                todolist[i].isChecked = false
            }
        }
    }
}



function onDelToDo( todoId ){

    let myDelTD = document.getElementById( todoId );

    mytodolistEl.removeChild( myDelTD );

    let isDelId = todoId.slice( 4 );

    let index = todolist.findIndex( (MyTd)=> MyTd.id == isDelId );

    todolist.splice( index, 1 );
}


function onSaveToDo(){

    let stringEl = JSON.stringify( todolist );

    localStorage.setItem( "myTodoList", stringEl );

}


function onGetParsedToDo(){

    let isMyToDo = localStorage.getItem("myTodoList");

    if( isMyToDo === null ){

        return [];
    }

    else{

        let ParsedTodo = JSON.parse( isMyToDo );

        return ParsedTodo;
    }
}
