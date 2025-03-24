const myList = document.getElementById("myList");
const input = document.getElementById("text-input");

let entries = [{id: 0, name: "firstEntry", flag: '-'}, {id: 1, name: "secondEntry", flag: '-'}];

init();

function init() {
    document.getElementById("add-btn").addEventListener("click", handleOnAddClicked);

    renderEntries();
}

function renderEntries() {
    console.log(entries)
    myList.innerHTML = "";

    for (let entry of entries) {
        addEntryToList(entry);
    }
}

function addEntryToList(entry) {
    const newElement = document.createElement("li");
        const newText = document.createTextNode(entry);
        newElement.appendChild(newText);

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-circle-xmark", "action-button");
        deleteIcon.addEventListener("click", (event) => {
            for (let en of entries) {
                if (en.id == entry.id) {
                    
                }
            }
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
}

function handleOnAddClicked() {
    if (input.value != "") entries.push(input.value);
    input.value = ""

    renderEntries();
}