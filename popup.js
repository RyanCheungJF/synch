document.querySelector('#options').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

document.querySelector('#info').addEventListener('click', function() {
    window.open('https://github.com/RyanCheungJF/Synch/blob/main/docs/UserGuide.md');
});

document.querySelector('#ourGithub').addEventListener('click', function() {
    window.open('https://github.com/RyanCheungJF/Synch'); 
});

//document.body.style.backgroundColor = "grey"; //BG colour
                                              //script for the popup
