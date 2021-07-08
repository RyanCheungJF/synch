// HTML Queries
let engine = window.speechSynthesis;
var form = document.getElementById('form');
var paras = document.getElementById('paras');
var headers = document.getElementById('headers');
var hlinks = document.getElementById('hlinks');

// Dictionary of bindings for errors
let dict = new Map();
dict.set('paras', "Paragraph");
dict.set('headers', "Header");
dict.set('hlinks', "Hyperlink Search");
dict.set('hyperlinks', "Hyperlink");
dict.set('redirect', "Redirect");
dict.set('inorder', "In-Order");
dict.set('voices', "Voices");
dict.set('rate', "Rate of speech")

// HashMap of default options
let kvps = new Map();
kvps.set('paras', 49);
kvps.set('headers', 50);
kvps.set('hlinks', 51);
kvps.set('hyperlinks', 52);
kvps.set('redirect', 48);
kvps.set('inorder', 32);      
kvps.set('voices', 0);
kvps.set('rate', 1);

let engine = window.speechSynthesis;

// Checker Function
function checkKeys(val) {
    var str = JSON.stringify(val);
    if (str.length != 1) {
        let msg = 'Keys must be single digit.';
        alert(msg)
        engine.speak(new SpeechSynthesisUtterance(msg));
        return;
    }
    if (str.charCodeAt(0) < 48 || str.charCodeAt(0) > 122) {
        let msg = 'This is not an accepted keybind! Please choose another key.';
        alert(msg);
        engine.speak(new SpeechSynthesisUtterance(msg));
        return;
    }
    for (const [key, value] of kvps.entries()) {
        if (str == value) {
            let msg = 'The ' + key + ' is already used for another keybind! Please choose another key.';
            alert(msg);
            engine.speak(new SpeechSynthesisUtterance(msg));
            return;
        }
    }
}

function successfulValidate(input) {
    input.parentElement.querySelector('small').innerText = "Saved Changes!";
    input.parentElement.className = "field success";
}

function convertToAscii(k) {
    return (k.charCodeAt(0) >= 65 && k.charCodeAt(0) <= 122) ? k.toLowerCase().charCodeAt(0) : k;
}

document.getElementById('save').addEventListener("click", (e) => {
    e.preventDefault();
    const paraVal = paras.value;
    const headersVal = headers.value;
    const hlinksVal = hlinks.value;

    let used = [];

    let temp = new Map();
    temp.set('paras', paraVal);
    temp.set('headers', headersVal);
    temp.set('hlinks', hlinksVal);

    for (const [key, value] of temp.entries()) {
        if (value == "") {
            errorValidate(document.getElementById(key), dict.get(key) + " field cannot be empty.");
            engine.speak(new SpeechSynthesisUtterance(dict.get(key) + " field cannot be empty."));
            return;
        } else if (value.length != 1) {
            errorValidate(document.getElementById(key), "Controls for " + dict.get(key) + " must be one key only.");
            engine.speak(new SpeechSynthesisUtterance("Controls for " + dict.get(key) + " must be one key only."));
            return;
        }  else if (used.includes(convertToAscii(value))) {
            errorValidate(document.getElementById(key), "This key has been used before.");
            engine.speak(new SpeechSynthesisUtterance("The key inputted in the " + dict.get(key) + " has been used before."));
            return;
        } else {
            used.push(convertToAscii(value));
            successfulValidate(document.getElementById(key));
        }
    }

     //Set keybinds to local storage
    chrome.storage.local.set({
        paras: convertToAscii(temp.get('paras')),
        headers: convertToAscii(temp.get('headers')),
        hlinks: convertToAscii(temp.get('hlinks'))
    }, function () {
        // Update status to let user know options were saved.
        var save = document.getElementById('save');
        save.textContent = 'Options saved';
        setTimeout(function () {
            save.textContent = 'Save';
        }, 2000);
    });

    /*
    chrome.storage.local.get(['paragraphs','headers','hyperlinks'],function(data){
        //window.alert( `The following changes have been made:\nHeaders:${data.headers}\nParagraphs:${data.paragraphs}\nHyperlinks:${data.hyperlinks}`);
        chrome.tts.speak( `The following changes have been made:\nHeaders:${data.headers}\nParagraphs:${data.paragraphs}\nHyperlinks:${data.hyperlinks}`);
    });
    */
});
    