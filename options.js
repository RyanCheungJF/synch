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
    for (const [key, value] of Object.entries(kvps)) {
        if (val == value) {
            alert('The key ${key} is already used for another keybind! Please choose another key.');
            return;
        }
        if (val.charCodeAt(0) < 48 || val.charCodeAt(0) > 122) {
            alert('This is not an accepted keybind! Please choose another key.');
            return;
        }
    }
}

// Saves options to chrome.storage
function save_options() {
    var paras = document.getElementById('paras').value;
    var headers = document.getElementById('headers').value;
    var hlinks = document.getElementById('hlinks').value;
    chrome.storage.sync.set({
        paras: paras,
        headers:headers,
        hinks:hlinks,
    }, function () {
        // Update status to let user know options were saved.
        var save = document.getElementById('save');
        save.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
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
document.getElementById('save').addEventListener("click",
    save_options());
