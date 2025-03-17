const myList = document.getElementById("myList");
const input = document.getElementById("text-input");

init();

function init() {
    document.getElementById("add-btn").addEventListener("click", handleOnAddClicked);
}

function handleOnAddClicked() {
    const newElement = document.createElement("li");
    const newText = document.createTextNode(input.value);
    newElement.appendChild(newText);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-circle-xmark", "action-button");
    deleteIcon.addEventListener("click", (event) => {
        event.target.parentNode.remove()
    })
    newElement.appendChild(deleteIcon);

    const markIcon = document.createElement("i");
    markIcon.classList.add("fa-solid", "fa-triangle-exclamation", "action-button");
    markIcon.addEventListener("click", (event) => {
        const parentNode = event.target.parentNode;
        parentNode.classList.remove("done")
        parentNode.classList.toggle("marked");
    })
    newElement.appendChild(markIcon);

    const doneIcon = document.createElement("i");
    doneIcon.classList.add("fa-solid", "fa-circle-check", "action-button");
    doneIcon.addEventListener("click", (event) => {
        const parentNode = event.target.parentNode;
        parentNode.classList.remove("marked")
        if (!parentNode.classList.contains("marked")) {
            parentNode.parentNode.appendChild(parentNode);
        }
        parentNode.classList.toggle("done");
    })
    newElement.appendChild(doneIcon);

    myList.appendChild(newElement);

    input.value = ""
}