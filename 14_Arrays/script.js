const DEFAULT_ARRAY = "Apfel,Birne,Banane,Orange,Mango,Kirsche,Erdbeere,Ananas,Pfirsich,Wassermelone".split(",")

init();

function init() {
    document.getElementById("manipulation-form").addEventListener("submit",
        function (event) {
            event.preventDefault();
        });
    
    document.getElementById("init-btn").addEventListener("click", () => {

    });
    
}