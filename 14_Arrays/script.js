const DEFAULT_ARRAY = "Apfel,Birne,Banane,Orange,Mango,Kirsche,Erdbeere,Ananas,Pfirsich,Wassermelone".split(",")

let arrayOutput = document.getElementById("array-output");
let sliceOutput = document.getElementById("slice-output");
let elementInput = document.getElementById("element-input");
let fromInput = document.getElementById("from-input");
let toInput = document.getElementById("to-input");
let positionInput = document.getElementById("position-input");
let sortBtn = document.getElementById("sort-btn");
let array = [];

init();

function init() {
    document.getElementById("manipulation-form").addEventListener("submit",
        function (event) {
            event.preventDefault();
        });
    
    document.getElementById("init-btn").addEventListener("click", () => {
        array = DEFAULT_ARRAY.slice();
    });

    document.getElementById("add-first-btn").addEventListener("click", () => {
        array.unshift(elementInput.value)
    });

    document.getElementById("add-last-btn").addEventListener("click", () => {
        array.push(elementInput.value)
    });

    document.getElementById("remove-first-btn").addEventListener("click", () => {
        array.shift()
    });

    document.getElementById("remove-last-btn").addEventListener("click", () => {
        array.pop()
    });

    document.getElementById("slice-btn").addEventListener("click", () => {
        let from = fromInput.value;
        let to = toInput.value;

        if (from < 0 || to >= array.length) {
            alert("Ungültiger Array-Bereich!");
        } else {
            sliceOutput.innerText = array.slice(from, to);
        }
    });

    document.getElementById("insert-btn").addEventListener("click", () => {
        array.splice(positionInput.value, 0, elementInput.value);
    });

    document.getElementById("insert-overwrite-btn").addEventListener("click", () => {
        array[positionInput.value] = elementInput.value;
    });
    
    // update array output on every click
    document.getElementsByTagName("body")[0].addEventListener("click", updateOutput)
}

function updateOutput() {
    arrayOutput.innerText = `[${array}]`;
}