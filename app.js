//Ryan Cheung Jing Feng Friend), [28.05.21 14:49]
/*
const fetch = require("node-fetch");

fetch('https://sg.linkedin.com/in/benleong')
    .then(function(response) {
        return response.text(); //Return html tags
    }).then(function(html) {
        console.log(html);   //Shows on console
    }).catch(function(err) {
        console.warn('Something went wrong.', err);  //Catches errors
    });
    */

const paragraphs = document.querySelectorAll('p');
alert(paragraphs[0].childNodes[0].nodeValue)
var counter = 0;
window.addEventListener("keypress",
    function(e) {
        if (e.key.charCodeAt(0) === 49) {
            let engine = new SpeechSynthesisUtterance(paragraphs[counter].childNodes[0].nodeValue);
            engine.volume = 1;
            engine.rate = 1;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(engine);
            console.log("It is supposed to work");
            counter+=1
        }

    });
