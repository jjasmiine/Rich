// ()

//grabbing the html items
const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

//array for the 'richest people' (list items)
//listed in the correct order
const richestPeople = [
    'Jasmine Lamoureux',
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortego',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Micheal Bloomberg'
];

//sorting the (listitems)
const listItems = [];

//keep track of index based
let dragStartIndex;

//generating list items
createList();

//inset list items into DOM
function createList() {

    //..copy the array
    [...richestPeople]

        //creating a new array into an object with a value and a sort of random
        .map(a => ({ value: a, sort: Math.random() }))

        //sorted the objects based on the math.random value
        .sort((a, b) => a.sort - b.sort)

        //returning the it as string value to the screen
        .map(a => a.value)

        //looping through the array
        .forEach((person, index) => {

            //generating an html item from the app into the index
            const listItem = document.createElement('li');

            //setting an attribute to the li element and setting it to the index
            listItem.setAttribute('data-index', index);

            //creating li content, index starts at 1 instead of 0
            listItem.innerHTML = `
            <span class = "number">${index + 1}</span>
            <div class = "draggable" draggable = "true">
            <p class = "person-name">${person}</p>
            <i class = "fas fa-grip-lines"</i>
            </div
            `;

            //pusing the js created li
            listItems.push(listItem);

            //adding the js li into the html ul
            draggableList.appendChild(listItem)
        });

    //generating the drag and drop event    
    addEventListeners();
}

//creating the function events
//'this' pertains to the element
//+ returns a number
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    //getting the attribute based on its index
    const dragEndIndex = +this.getAttribute('data-index');
    //calling the function to swap data
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}


//swapping items after dragging one to another
function swapItems(fromIndex, toIndex) {
    //getting
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    //swapping
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//checking the order of the list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if (personName != richestPeople[index]) {
            listItem.classList.add('wrong');
        }

        else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

//initializing the functions
function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable__list li');

    draggables.forEach(draggable => {
        //when .dragstart is active call the function 'dragStart'
        draggable.addEventListener('dragstart', dragStart);

    })

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click', checkOrder);
