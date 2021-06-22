// This file serves to test the different functions we have implemented in app.js

const { expect, test } = require("@jest/globals");

// function to maintain the index of the content, and ensure it can read negative numbers accordingly
function index(num, len) {
    return num % len < 0 ? len + num : num % len;
}

test('Remainder of 18 over 19 should be 18', () => {
    expect(index(18, 19)).toBe(18);
});

test('Remainder of 0 over 5 should be 0', () => {
    expect(index(0, 5)).toBe(0);
});

test('Remainder of 5 over 5 should be 0', () => {
    expect(index(5, 5)).toBe(0);
});

test('Remainder of -1 over 6 should be 5', () => {
    expect(index(-1, 6)).toBe(5);
});

// function to clear the html tags from a string, and clear whitespace
function cleanupText(str, arr, count) {
    if (str == null) {
        str = arr[index(count % arr.length, arr.length)].innerHTML;
    }
    while (str.indexOf('<') != -1 && str.indexOf('>') != -1) {
        var left = str.indexOf('<');
        var right = str.indexOf('>');
        str = str.substring(0, left) + str.substring(right + 1, str.length) + " ";
    }
    str = str.trim();
    if (str.substring(0, str.length / 2) == str.substring(str.length / 2, str.length)) {
        str = str.substring(0, str.length / 2);
    }
    return str;
}

test('Should get rid of whitepsace', () => {
    expect(cleanupText('  This text has a lot of whitespace     ', [], 0)).toBe("This text has a lot of whitespace");
});

test('Should get rid of additional tags', () => {
    expect(cleanupText('<span><div>Test!</div></span>', [], 0)).toBe("Test!");
});

test('Should get rid of repetition', () => {
    expect(cleanupText('<span class="balancedHeadline" style="display: inline-block; max-width: 167.67px;">Some Text Here</span><span class="ghost" aria-hidden="true" style="position: absolute; left: 0px; visibility: hidden;">Some Text Here</span>', [], 0)).toBe("Some Text Here");
});

// Modified function that should act as a filter
const hyperlinks = ['https://www.somewebsite.com/colours/blue',
                    'https://www.spamsite.com/link#whatyourhoroscopesaysaboutyou',
                    'https://www.doctorsblog.com/whattodo/feelingblue#treatment',
                    'https://www.youtube.com',
                    'https://www.homewrecker/products/glue'];
let filterlinks = [];
function findLink(str) {
    filterlinks = [];
    for (i in hyperlinks) {
        if (hyperlinks[i].includes(str)) {
            filterlinks.push(hyperlinks[i]);
        }
    }
    return filterlinks;
}

test('Should get back everything', () => {
    expect(findLink("")).toEqual(hyperlinks);
});

test('Should get back words with blue', () => {
    expect(findLink("blue")).toEqual(['https://www.somewebsite.com/colours/blue', 'https://www.doctorsblog.com/whattodo/feelingblue#treatment']);
});
