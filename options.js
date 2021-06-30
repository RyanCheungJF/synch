// HashMap of defaults
let kvps = new Map();
kvps.set('paragraphs', 1);
kvps.set('headers', 2);
kvps.set('hyperlinksearch', 3);
kvps.set('hyperlinks', 4);
kvps.set('redirect', 0);
kvps.set('voice', 0);
kvps.set('rate', 1);

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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
/*
function restore_options() {
    //Set back to default Commands
    chrome.storage.sync.get({
        favoriteColor: 'red',
        likesColor: true
    }, function (items) {
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
*/
document.getElementById('save').addEventListener("click",function () {
    var paras = document.getElementById('paras').value;
    checkKeys(paras);
    kvps.set('paragraphs', paras);
    var headers = document.getElementById('headers').value;
    checkKeys(headers);
    kvps.set('headers', headers);
    var hlinks = document.getElementById('hlinks').value;
    checkKeys(hlinks);
    kvps.set('hyperlinks', hlinks);

    //Set keybinds to local storage
    chrome.storage.local.set({
        paragraphs: paras,
        headers: headers,
        hyperlinks: hlinks,
    }, function () {
        // Update status to let user know options were saved.
        var save = document.getElementById('save');
        save.textContent = 'Options saved';
        setTimeout(function () {
            save.textContent = 'Save';
        }, 2000);
    });

    chrome.storage.local.get(['paragraphs','headers','hyperlinks'],function(data){
        //window.alert( `The following changes have been made:\nHeaders:${data.headers}\nParagraphs:${data.paragraphs}\nHyperlinks:${data.hyperlinks}`);
        chrome.tts.speak( `The following changes have been made:\nHeaders:${data.headers}\nParagraphs:${data.paragraphs}\nHyperlinks:${data.hyperlinks}`);
    });
});
