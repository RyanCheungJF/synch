document.querySelector('#options').addEventListener('click',function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

document.querySelector('#ourGithub').addEventListener('click', function () {  
    window.open('https://github.com/Niran-Chan'); //Load our Github!
});

//document.body.style.backgroundColor = "grey"; //BG colour
                                              //script for the popup
