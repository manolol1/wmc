function calculate(callback) {
    let x = parseFloat(document.getElementById("num1").value);
    let y = parseFloat(document.getElementById("num2").value);

    if (isNaN(x) || isNaN(y)) {
        document.getElementById("result").innerHTML = "Please enter valid numbers!";
        return;
    }

    document.getElementById("result").innerHTML = callback(x, y);
}

document.getElementById("add").addEventListener("click", () => calculate((x, y) => x + y));
document.getElementById("sub").addEventListener("click", () => calculate((x, y) => x - y));
document.getElementById("mul").addEventListener("click", () => calculate((x, y) => x * y));
document.getElementById("div").addEventListener("click", () => calculate((x, y) => x / y));
document.getElementById("mod").addEventListener("click", () => calculate((x, y) => x % y));