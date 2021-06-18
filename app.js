// Global speed, future feature to customize voice of reader and speed.
let engine = window.speechSynthesis;
engine.rate = 1.4;
//****************************************************************** 
const paragraphs = document.querySelectorAll('p');
var para_counter = -1;
var para_pressed = false;
var para_lastHTML = paragraphs[paragraphs.length - 1].innerHTML;
//****************************************************************** 
const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
var headers_counter = -1;
var headers_pressed = false;
var headers_lastHTML = headers[headers.length - 1].innerHTML;
//******************************************************************
const listelems = document.querySelectorAll('li');
var list_counter = -1;
var list_pressed = false;
var list_lastHTML = listelems[listelems.length - 1].innerHTML;
//****************************************************************** 
const links = document.querySelectorAll('a');
var links_counter = 0;
var searched = false;
var last_link = null;
//****************************************************************** 

// Hyperlink Handling
var hyperlinks = [];
var linkTitles = [];
for (var link = 0; link < links.length; link++)  {      
    let hyperlink = links[link].getAttribute("href");
    if (hyperlink != null && hyperlink.substring(0, 4) != "http") {
        if (hyperlink.substring(0, 1) == "/") {
            hyperlink = window.location.href.concat(hyperlink.substring(1, hyperlink.length));
        } else {
            hyperlink = window.location.href.concat(hyperlink.substring(0, hyperlink.length));
        }
    }
    let linkName = links[link].innerText;
    if (linkName == "") {
        var lastslash = hyperlink.lastIndexOf("/");
        var str = hyperlink.substring(lastslash + 1, hyperlink.length);
        if (str.indexOf(".html") != -1) {
            str = str.substring(0, str.indexOf(".html"));
        }
        linkName = str.replace("-", " ");
    }
    hyperlinks[link] = hyperlink;
    linkTitles[link] = linkName;
    //console.log(link);
    //console.log(hyperlink);
    //console.log(linkName);
}

// Additional function to filter through the hyperlinks
var filterlinks = [];
var filtertitles = [];
function findLink(str) {
    filterlinks = [];
    filtertitles = [];
    for (i in hyperlinks) {
        if (hyperlinks[i].includes(str)) {
            filterlinks.push(hyperlinks[i]);
            filtertitles.push(linkTitles[i]);
        }
    }
}

// This event listener will await a prompt from the user to search for. Entering nothing will return all hyperlinks.
window.addEventListener("keypress",
    function(event) {
        if (event.key.charCodeAt(0) === 51) {
            searched = true;
            engine.cancel();
            engine.speak(new SpeechSynthesisUtterance("Please type in the keyword and hit enter to search among hyperlinks!"));
            var search = window.prompt("Search keyword for hyperlinks: ");
            findLink(search);
            engine.speak(new SpeechSynthesisUtterance("Filtering for keyword " + search));
            if (filterlinks.length === 0) {
                engine.speak(new SpeechSynthesisUtterance("Sorry, there is no link with this keyword " + search));
            } else {
                engine.speak(new SpeechSynthesisUtterance("Done! Press 4 to alternate between the search results!"));
            }
        }
    }
); 

// Used to alternate through the hyperlinks, similar to paragraphs.
window.addEventListener("keypress",
    function(event) {
        if (event.key.charCodeAt(0) === 52) {
            if (!searched) {
                engine.speak(new SpeechSynthesisUtterance("Please search for a keyword by hitting 3!"));
            } else {
                if (links_counter === filterlinks.length) {
                    links_counter = 0;
                }
                last_link = [filterlinks[links_counter], filtertitles[links_counter]];
                engine.speak(new SpeechSynthesisUtterance(filtertitles[links_counter]));
                links_counter++;
            }
        }
    }
);

// Used to visit a hyperlink after choosing.
window.addEventListener("keypress",
    function(event) {
        if (event.key.charCodeAt(0) === 48) {
            if (last_link == null) {
                engine.speak(new SpeechSynthesisUtterance("Please search for a keyword by hitting 3!"));
            } else {
                engine.speak(new SpeechSynthesisUtterance("Redirecting you to " + last_link[1]));
                window.location.href = last_link[0];
            }
        }
    }
);

// Paragraphs
window.addEventListener("keypress",
    function(event) {       
        if (event.key.charCodeAt(0) === 49) {
            resetHighlights();
            if (para_pressed) {
                para_counter = para_counter - 2;
                para_pressed = !para_pressed;
            } else {
                para_counter++;
                para_pressed = !para_pressed;
                window.setTimeout(function() { para_pressed = false; }, 500);
            }
            para_lastHTML = paragraphs[index(para_counter, paragraphs.length)].innerHTML;
            engine.cancel();
            engine.speak(
                new SpeechSynthesisUtterance(
                    cleanupText(paragraphs[index(para_counter, paragraphs.length)]
                        .innerHTML, paragraphs, para_counter)));
            window.setTimeout(function() { 
                paragraphs[index(para_counter, paragraphs.length)].innerHTML = "<mark>" + para_lastHTML + "</mark>"; 
            }, 500);
        }
    }
);

// Headers
window.addEventListener("keypress",
    function(event) {
        if (event.key.charCodeAt(0) === 50) {
            resetHighlights();
            if (headers_pressed) {
                headers_counter = headers_counter - 2;
                headers_pressed = !headers_pressed;
            } else {
                headers_counter++;
                headers_pressed = !headers_pressed;
                window.setTimeout(function() { headers_pressed = false; }, 500);
            }
            headers_lastHTML = headers[index(headers_counter, headers.length)].innerHTML;
            engine.cancel();
            engine.speak(new SpeechSynthesisUtterance(
                cleanupText(headers[index(headers_counter, headers.length)]
                    .innerHTML, headers, headers_counter)));
            window.setTimeout(function() { 
                headers[index(headers_counter, headers.length)].innerHTML = "<mark>" + headers_lastHTML + "</mark>"; 
            }, 500);
        }
    }
);

// List Elements
window.addEventListener("keypress",
    function(event) {       
        if (event.key.charCodeAt(0) === 53) {
            resetHighlights();
            if (list_pressed) {
                list_counter = list_counter - 2;
                list_pressed = !list_pressed;
            } else {
                list_counter++;
                list_pressed = !list_pressed;
                window.setTimeout(function() { list_pressed = false; }, 500);
            }
            list_lastHTML = listelems[index(list_counter, listelems.length)].innerHTML;
            engine.cancel();
            engine.speak(
                new SpeechSynthesisUtterance(
                    cleanupText(listelems[index(list_counter, listelems.length)]
                        .innerHTML, listelems, list_counter)));
            window.setTimeout(function() { 
                listelems[index(list_counter, listelems.length)].innerHTML = "<mark>" + list_lastHTML + "</mark>"; 
            }, 500);
        }
    }
);

// Math function to deal with indexing as we use modulo function
function index(num, len) {
    return num % len < 0 ? len + num : num % len;
}

// Used to reset the highlighting on words
function resetHighlights() {
    paragraphs[index(para_counter, paragraphs.length)].innerHTML = para_lastHTML;
    headers[index(headers_counter, headers.length)].innerHTML = headers_lastHTML;
    listelems[index(list_counter, listelems.length)].innerHTML = list_lastHTML;
}

// Certain strings are null as they are wrapped in other tags, this just tries to parse the content out
function cleanupText(str, arr, count) {
    if (str == null) {
        str = arr[index(count % arr.length, arr.length)].innerHTML;
    }
    while (str.indexOf('<') != -1 && str.indexOf('>') != -1) {
        var left = str.indexOf('<');
        var right = str.indexOf('>');
        str = str.substring(0, left) + str.substring(right + 1, str.length) + " ";
    }
    var whitespace = 0;
    while (str.charAt(str.length - whitespace - 1) == " ") {
        whitespace++;
    } 
    str = str.substring(0, str.length - whitespace);
    if (str.substring(0, str.length / 2) == str.substring(str.length / 2, str.length)) {
        str = str.substring(0, str.length / 2);
    }
    return str;
}
