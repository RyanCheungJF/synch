const paragraphs = document.querySelectorAll('p');
var para_counter = 0;
const h1 = document.querySelectorAll('h1');
var h1_counter = 0;
const h2 = document.querySelectorAll('h2');
var h2_counter = 0;
const h3 = document.querySelectorAll('h3');
const h4 = document.querySelectorAll('h4');
const h5 = document.querySelectorAll('h5');
const h6 = document.querySelectorAll('h6');
var delta = 500;


window.addEventListener("keypress",
    function(event) {
        var pressed = false;        
        if (event.key.charCodeAt(0) === 49) {
            var curr_press = new Date();
            if (pressed) {
                para_counter === 0 ? para_counter = paragraphs.length : para_counter = para_counter--;
            } 
            pressed = !pressed;
            if (para_counter > paragraphs.length) {
                para_counter = 0;
            }
            let engine = new SpeechSynthesisUtterance(paragraphs[para_counter].childNodes[0].nodeValue);
            engine.rate = 1.2;
            window.speechSynthesis.speak(engine);
            para_counter++;
            curr_press = 0;
            window.setTimeout(function() {pressed = false;}, 500);
        }
    }
);

new Promise((resolve, reject) => {
    if (h1.length !== 0) {
        resolve("Reading h1 tags!");
    } else {
        reject("No h1 tags available!");
    }
}).then((msg) => {
    window.addEventListener("keypress",
        function(event) {
            if (event.key.charCodeAt(0) === 50) {
                if (h1_counter > h1.length) {
                    h1_counter = 0;
                }
                let engine = new SpeechSynthesisUtterance((h1)[h1_counter].innerText);
                window.speechSynthesis.speak(engine);
                h1_counter++;
            }
        }
    )
}).catch((msg) => {
    console.log(msg);
});

new Promise((resolve, reject) => {
    if (h2.length !== 0) {
        resolve("Reading h2 tags!");
    } else {
        reject("No h2 tags available!");
    }
}).then((msg) => {
    window.addEventListener("keypress",
        function(event) {
            if (event.key.charCodeAt(0) === 51) {
                if (h2_counter > h2.length) {
                    h2_counter = 0;
                }
                let engine = new SpeechSynthesisUtterance((h2)[h2_counter].innerText);
                window.speechSynthesis.speak(engine);
                h2_counter++;
            }
        }
    )
}).catch((msg) => {
    console.log(msg);
});
