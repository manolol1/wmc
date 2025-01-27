let text = document.getElementById("output");

let content = text.innerHTML;

console.log(`Inhalt: ${content}`);

text.innerHTML = "<div style='color: red'>Text</div>"