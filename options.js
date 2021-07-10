// HTML Queries
let engine = window.speechSynthesis;
var form = document.getElementById('form');
var paras = document.getElementById('paras');
var headers = document.getElementById('headers');
var hlinks = document.getElementById('hlinks');
var hyperlink = document.getElementById('hyperlink');
var redirect = document.getElementById('redirect');
var inorder = document.getElementById('inorder');
var rate = document.getElementById('rate');

// Dictionary of bindings for errors
let dict = new Map();
dict.set('paras', "Paragraph");
dict.set('headers', "Header");
dict.set('hlinks', "Hyperlink Search");
dict.set('hyperlink', "Hyperlink");
dict.set('redirect', "Redirect");
dict.set('inorder', "In-Order");
dict.set('voices', "Voices");
dict.set('rate', "Rate of speech")

/* List of Deafult Settings
chrome.storage.local.set({
    paras: 49,
    headers: 50,
    hlinks: 51,
    hyperlink: 52,
    redirect: 38,
    inorder: 32,
    rate: 1,
});
*/

function errorValidate(input, msg) {
    input.parentElement.querySelector('small').innerText = msg;
    input.parentElement.className = "field error";
}

function successfulValidate(input) {
    input.parentElement.querySelector('small').innerText = "Saved Changes!";
    input.parentElement.className = "field success";
}

function convertToAscii(k) {
    return (k.charCodeAt(0) >= 65 && k.charCodeAt(0) <= 122) ? k.toLowerCase().charCodeAt(0) : k.charCodeAt(0);
}

document.getElementById('save').addEventListener("click", (e) => {
    e.preventDefault();
    engine.cancel();
    const paraVal = paras.value;
    const headersVal = headers.value;
    const hlinksVal = hlinks.value;
    const hyperlinksVal = hyperlink.value;
    const redirectVal = redirect.value;
    const inorderVal = inorder.value;
    const rateVal = rate.value;

    let used = [];

    let temp = new Map();
    temp.set('paras', paraVal);
    temp.set('headers', headersVal);
    temp.set('hlinks', hlinksVal);
    temp.set('hyperlink', hyperlinksVal);
    temp.set('redirect', redirectVal);
    temp.set('inorder', inorderVal);

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

    if (rateVal <= 10 && rateVal >= 0.1) {
        successfulValidate(document.getElementById('rate'));
    } else {
        errorValidate(document.getElementById('rate'), "Value should be between 0.1 and 10!");
        engine.speak(new SpeechSynthesisUtterance("The value inputted should be between 0.1 and 10"));
        return;
    }   
    
     //Set keybinds to local storage
    chrome.storage.local.set({
        paras: convertToAscii(temp.get('paras')),
        headers: convertToAscii(temp.get('headers')),
        hlinks: convertToAscii(temp.get('hlinks')),
        hyperlink: convertToAscii(temp.get('hlinks')),
        redirect: convertToAscii(temp.get('redirect')),
        inorder: convertToAscii(temp.get('inorder')),
        rate: rateVal,
    }, function () {
        // Update status to let user know options were saved.
        engine.cancel();
        engine.speak(new SpeechSynthesisUtterance("Options Saved"));
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
    