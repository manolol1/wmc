init();

function init() {
    let originalText = document.getElementById("original-text");
    let query = document.getElementById("query");
    let replaceText = document.getElementById("replace");
    let resultDiv = document.getElementById("result");
    
    document.getElementById("analyze-btn").addEventListener("click", () => {
        let originalTextContent = originalText.value;
        
        console.log(originalTextContent)

        let result = `
            length: ${originalTextContent.length}
            words: ${originalTextContent.split(' ').length}
            upperCase: ${originalTextContent.match(/[A-Z]/g).length}
            lowerCase: ${originalTextContent.match(/[a-z]/g).length}
            otherChars: ${originalTextContent.match(/[^A-Za-z]/g).length}
            blanks: ${originalTextContent.match(/\s/g).length}
        `;

        resultDiv.innerText = result;
    })

    document.getElementById("remove-blanks-btn").addEventListener("click", () => {
        let originalTextContent = originalText.value;

        resultDiv.innerText = originalTextContent.replaceAll(/\s/g)
    })

    document.getElementById("replace-btn").addEventListener("click", () => {
        let originalTextContent = originalText.value;

        resultDiv.innerText = originalTextContent.replaceAll(query.value, replaceText.value)
    })
}