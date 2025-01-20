function calculate(callback) {
    let x = parseFloat(document.getElementById("num1").value);
    let y = parseFloat(document.getElementById("num2").value);

    document.getElementById("result").innerHTML = callback(x, y);
}

document.getElementById("add").addEventListener("click", () => calculate(function(x, y) {return x + y}));
document.getElementById("sub").addEventListener("click", () => calculate(function(x, y) {return x - y}));
document.getElementById("mul").addEventListener("click", () => calculate(function(x, y) {return x * y}));
document.getElementById("div").addEventListener("click", () => calculate(function(x, y) {return x / y}));