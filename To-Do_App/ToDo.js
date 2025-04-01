let inp = document.querySelector('input');
let add = document.querySelector('#add');
let unorder = document.querySelector('ul');
let list = document.querySelector('li');

add.addEventListener('click', () => {
    console.log("clicked");
    change();

});

function change() {
    console.log(inp.value);
    let newList = document.createElement('li');
    unorder.appendChild(newList);

    let newp = document.createElement('p');
    let newbtn = document.createElement('button');
    newp.innerText = inp.value;
    newp.style.fontSize = "18px";
    newList.append(newp);
    newbtn.innerText = "Delete";
    newList.append(newbtn);
    
    
    newbtn.setAttribute('id','btn');
    newbtn.classList.add('del');
    inp.value = "";
}

unorder.addEventListener("click", function(event) {
    if (event.target.classList.contains("del")) {
        let listItem = event.target.closest("li"); // Get the closest <li> instead of previous element
        if (listItem) listItem.remove(); // Remove only that task
        console.log("Deleted!");
    }
});
