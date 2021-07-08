let engine = window.speechSynthesis;
//******************************************************************
const paralist = document.querySelectorAll('p, li');
let paragraphs = [...paralist]
                    .filter(i => !i.innerHTML.includes("href"))
                    .filter(i => i.innerHTML != "undefined")
                    .filter(i => cleanBrackets(i.innerHTML) != "");
var para_counter = -1;
var para_pressed = false;
var para_lastHTML = paragraphs[paragraphs.length - 1].innerHTML;
let pbind; 
chrome.storage.local.get(['paras'], function(result) { pbind = result.paras; });
//******************************************************************
const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
var headers_counter = -1;
var headers_pressed = false;
var headers_lastHTML = headers[headers.length - 1].innerHTML;
let hbind;
chrome.storage.local.get(['headers'], function(result) { hbind = result.headers; });
//******************************************************************
const links = document.querySelectorAll('a');
var links_counter = 0;
var searched = false;
var last_link = null;
//******************************************************************
var all = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li');
var allcontent = [...all].map(i => i.innerHTML).filter(i => !i.includes("href"));
for (var i = 0; i < allcontent.length; i++) {
    allcontent[i] = cleanupText(allcontent[i], allcontent, i);
}
allcontent = allcontent.filter(i => i != undefined).filter(i => i != "");
var last_content = allcontent[0];
var all_lastHTML = last_content;
var temp = 0;
for (var i = 0; i < all.length; i++) {
    if (all[i].innerHTML.includes(last_content)) {
        temp = i;
    }
}
//******************************************************************

// Hyperlink Handling
var hyperlinks = [];
var linkTitles = [];
let hlinksbind;
chrome.storage.local.get(['hlinks'], function(result) { hlinksbind = result.hlinks; });
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
window.addEventListener('keydown',
    function(event) {
        if (event.key.charCodeAt(0) === 51 && event.altKey) {
            searched = true;
            engine.cancel();
            engine.speak(new SpeechSynthesisUtterance("Please type in the keyword and hit enter to search among hyperlinks!"));
            var search = window.prompt("Search keyword for hyperlinks: ");
            if (search == null) {
                engine.speak(new SpeechSynthesisUtterance("Cancelling search."));
                return;
            }
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
window.addEventListener('keydown',
    function(event) {
        if (event.key.charCodeAt(0) === 52 && event.altKey) {
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
window.addEventListener('keydown',
    function(event) {
        if (event.key.charCodeAt(0) === 48 && event.altKey) {
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
window.addEventListener('keydown',
    function(event) {
        if (event.key.charCodeAt(0) == 49 && event.altKey) {
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
            last_content = para_lastHTML;
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
window.addEventListener('keydown',
    function(event) {
        if (event.key.charCodeAt(0) == 50 && event.altKey) {
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
            last_content = headers_lastHTML;
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

// Math function to deal with indexing as we use modulo function
function index(num, len) {
    return num % len < 0 ? len + num : num % len;
}

// Used to reset the highlighting on words
function resetHighlights() {
    paragraphs[index(para_counter, paragraphs.length)].innerHTML = para_lastHTML;
    headers[index(headers_counter, headers.length)].innerHTML = headers_lastHTML;
    all[temp].innerHTML = all_lastHTML;
}

// Certain strings are null as they are wrapped in other tags, this just tries to parse the content out
function cleanupText(str, arr, count) {
    if (str == null) {
        str = arr[index(count % arr.length, arr.length)].innerHTML;
    }
    str = cleanBrackets(str);
    if (str.substring(0, str.length / 2) == str.substring(str.length / 2, str.length)) {
        str = str.substring(0, str.length / 2);
    }
    return str;
}

function cleanBrackets(str) {
    while (str.indexOf('<') != -1 && str.indexOf('>') != -1) {
        var left = str.indexOf('<');
        var right = str.indexOf('>');
        str = str.substring(0, left) + str.substring(right + 1, str.length) + " ";
    }
    return str.trim();
}

// Reads in natural order instead according to the DOM
window.addEventListener('keydown',
    function(event) {
        if (event.key.charCodeAt(0) === 122 && event.altKey) {
            event.preventDefault();
            resetHighlights();
            var ind = allcontent.indexOf(last_content) + 1;
            if (ind > allcontent.length) {
                ind = 0;
            }
            engine.cancel();
            engine.speak(new SpeechSynthesisUtterance(allcontent[ind]));
            last_content = allcontent[ind];
            var sieve;
            for (var i = 0; i < all.length; i++) {
                if (all[i].innerHTML.includes(last_content)) {
                    sieve = all[i].innerHTML;
                    temp = i;
                }
            }
            all_lastHTML = sieve;
            window.setTimeout(function() { all[temp].innerHTML = "<mark>" + sieve + "</mark>"; }, 500);
        }
    }
);