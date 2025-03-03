const myList = document.getElementById("myList");
const input = document.getElementById("text-input");

init();

function init() {
    document.getElementById("add-btn").addEventListener("click", handleOnAddClicked);
    document.getElementById("style-btn").addEventListener("click", handleOnStyleClicked);
}

function handleOnAddClicked() {
    newText = document.createTextNode(input.value)
    newElement = document.createElement("li")

    myList.appendChild(newElement);
    newElement.appendChild(newText)
}

function handleOnStyleClicked() {
    items = myList.children;

    for (const item of items) {
        //item.style.color = "red"

        item.addEventListener("click", handleOnEntryClicked);
    }
    
}

function handleOnEntryClicked() {
    this.style.color = "red"
}