# **Orbital 2021 Developer Guide** 

## Team buttersmarsh (Gemini)

* [**Orbital 2021 Developer Guide** ](#orbital-2021-developer-guide)
    * [Team buttersmarsh (Gemini)](#team-buttersmarsh-gemini)
        * [1. System Design](#1-system-design)
            * [1.1 Main Design](#11-main-design)
            * [1.2 Relevant Tools](#12-relevant-tools)
        * [2. Pipeline](#2-pipeline)
            * [2.1 User Flow:](#21-user-flow)
            * [2.2 Class Diagram:](#22-class-diagram)
        * [3. Implementation](#3-implementation)
            * [3.1 Speaking Feature](#31-speaking-feature)
            * [3.2 Activating the System](#32-activating-the-system)
            * [3.3 Parsing HTML ](#33-parsing-html)
        * [4. Design](#4-design)
        * [5. Settings Page](#5-settings-page)
        * [6. Ad Detection](#6-ad-detection)
        * [7. Testing](#7-testing)
            * [7.1 Unit Testing](#71-unit-testing)
            * [7.2 System Testing](#72-system-testing)
            * [7.3 User Testing](#73-user-testing)
        * [8. Final Thoughts](#8-final-thoughts)

### 1. System Design

#### 1.1 Main Design

Comes in the form of an out of the box chrome web extension.

Small text file containing a filter list from [EasyList](https://easylist.to/) to keep track of html tags to mark as ads.

Acts as a 'backend', with its aim to be lightweight.

#### 1.2 Relevant Tools

Our project will use a number of languages and libraries:

- HTML, CSS, JavaScript
- NodeJS
- SpeechSynthesisUtterance 

### 2. Pipeline

#### 2.1 User Flow:

![](/imgs/UserFlow.png)

#### 2.2 Class Diagram:

![](/imgs/ClassDiagram.png)

### 3. Implementation

#### 3.1 Speaking Feature

The main logic and initialization of our code can be found in the file ['app.js'](https://github.com/RyanCheungJF/Synch/blob/main/app.js).

The speaking mechanism makes use of the [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) library to initialize an engine and allow the program to speak.

Demonstrated below is a way to initialize an engine and cause it to speak:

`window.speechSynthesis.speak(new SpeechSynthesisUtterance('text to be said here'));`

Do note that speechSynthesis only works on browsers, and running/ testing it on Node.js will only result in an error.

With reference to the API provided, there are different functions with relation to the engine which can be tweaked to provide the user more options. 

We have provided a few under our settings page found under settings.js, with the following options made available:

- rate	// speed which the engine speaks at
- voices 	// changes the voice, ranging from a variety of accents and between male and female

#### 3.2 Activating the System

We used the event listener `click`to activate our keypresses. We aimed to use number keys for default settings as most keyboards offer the number pad, offering a more densely populated control system which does not require the user to move much.

The key button presses and their default settings are made as follow:

| Key-Binding | Functionality                                                |
| ----------- | ------------------------------------------------------------ |
| 1           | Toggles between paragraphs (p tags in HTML)                  |
| 2           | Toggles between headers (h1, h2, h3, h4, h5, h6 tags in HTML) |
| 3           | Brings up a search bar to search for hyperlinks on the page (a, href in HTML) |
| 4           | After filtering, toggles between hyperlinks' titles          |
| 0           | Redirects the user to the last link's title read             |
| r           | Reports an object as an ad                                   |
| m           | Kill switch, terminates the program (Meant to be a button that is placed as far as possible from the other keys to prevent accidental usage) |

As we have observed in other screen readers, they only offer a single keypress to alternate between both headers and paragraphs, and we hope the options above provide flexibility to the user. 

Furthermore,  they provide a rather linear experience, only allowing the reader to advance forward but never backwards. What if the user wishes to revisit something being read before? Will he/ she have to toggle through the whole page?

As such, we have implemented a double press functionality to toggle backwards with the functionality coming from this code and boolean variables:

`window.setTimeout(function() { ... }, 500);`

As JavaScript has no innate timer/ sleep function, we found that using a timeout as a delay in combination with booleans works best. Other alternatives include using [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

#### 3.3 Parsing HTML 

Our extension takes on a similar purpose to [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) from Python, with the bulk of the program filtering out HTML code to obtain the content needed. There are a few ways to do so, one way being:

`let h = document.querySelectorAll('h1, h2, h3, h4, h5, h6');`

For example, this returns an array of all the headers. We can then access any element of the array and view the content using:

`h['index'].childNode[0].nodeValue;`

Alternatively, we can view it using:

`h['index'].innerHTML;`

<u>Complications:</u>

Certain complications include the content being nested in multiple layers, as such we try to clean the text up by detecting other tags present in the string filtered out, as the engine is unable to read a messy string. 

<u>Improvements:</u>

However, our additional method used to clean the string is not full-proof as there are many possible different tags and formatters used by different sites. As such, a better solution would be to integrate a machine learning algorithm to filter the string more effectively.

### 4. Design

Alternative designs for consideration at the initial stage of our project:

- Alternative 1: iOS Application
  - Usage of libraries such as [requests](https://pypi.org/project/requests/), [BeautifulSoup](https://pypi.org/project/beautifulsoup4/) and [pyttsx3](https://pypi.org/project/pyttsx3/) and stacks such as [BeeWare](https://beeware.org/) to convert python code to an app.
  - Pros: Python Libraries such as BeautifulSoup are well defined and easy to use, and BeeWare allows us to write apps even in Python.
  - Cons: Most apps are written with stacks such as React with JavaScript instead, and BeeWare is still in development.
  - Cons: The iPhone equivalent of a screen reader would be the in-built Voiceover app, unfortunately there is no API made readily available online to access and build upon it.

- Alternative 2: Web Extension
  - Usage of library speechSynthesisUtterance.
  - Pros: Easier to integrate as chrome extensions by default are written in HTML, CSS and JS.
  - Cons: Harder to debug and write code in JavaScript as compared to Python.

### 5. Settings Page

The logic used to make the settings page can be found under ['options.js'](https://github.com/RyanCheungJF/Synch/blob/main/options.js), with the HTML under ['options.html'](https://github.com/RyanCheungJF/Synch/blob/main/options.html) respectively. 

As different keypresses are made to activate and read different sections of the website, we wanted to provide users with the flexibility to customize their experience. The settings makes use of Chrome's storage sync [API](https://developer.chrome.com/docs/extensions/reference/storage/#property-sync) to export and import the different values needed between each file.

The function `checkKeys` is used to check if there any clashes in key bindings, or if certain disallowed keys are being attempted to be in use.

To be done by Milestone 3.

### 6. Ad Detection

To be done by Milestone 3.

### 7. Testing

#### 7.1 Unit Testing

We decided to adopt unit testing to test the different components of our web extension. A separate test file ['app.test.js'](https://github.com/RyanCheungJF/Synch/blob/main/app.test.js) can be found in the repository containing tests made with [jest](https://jestjs.io/) to test the functions that we have employed in our code. 

#### 7.2 System Testing

This section talks about the testing from our point of view and the requrirement sheds some light of the different concerns and objectives to be fulfilled. While they may briefly elaborate on the bugs and issues we faced, there is another section in the Learning Outcomes Guide dedicated to it, which may be found here.

| Feature                                                      | Requirements                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Filter out a certain HTML element and get the TTS engine to read its pure text | Use event listeners activated upon keypress to activate engine.<br />Bind these keys to a key and ensure that the text read out is:<br />-In order and of the same type.<br />-Loops around after reading the last element of the page.<br />-Ensure text is read and not the HTML representative of it. |
| Double Press to read the previous text                       | Need to ensure that the double-press works as intended, and works within the timeout that is specified.<br />Ensure that when it is at the first element of the page, it loops to the very last. |
| Filtering out links from content                             | Needed to initially filter out hyperlinks.<br />Then ensure that each hyperlink generated is valid and perform any cleanup if needed.<br />As a website has many hyperlinks, a keybind should prompt a window to let users filter out hyperlinks.<br />Title of URL link must then be close/ related to the url itself to give users an idea of what the link is about.<br />Needed to clean up some titles as they may be 'null'. |
| Redirect to another page                                     | Ensure that redirect function redirects user to the right webpage.<br />Needed to do some cleaning up as certain texts after scraping are not valid  urls. |
| Highlighting of the current text                             | Ensure that this feature does not replace the previously read text with other HTML.<br />Have to make sure that this feature does not break with the double press feature.<br />Ensure that when switching between reading paragraphs and headers, the webpage should still reset the text. |
| Options Page                                                 | Need to link the Javascript present to the main app.<br />Need to make sure that there is validation on the settings that user can key in.<br />Tested by keying in invalid keys to check if the bad inputs will still go through. |
| Ad Detection                                                 | Need to ensure that the script can detect most of the ads present on the page.<br />Ensure that there is the ability to manually add certain blockers. |
| Packaging                                                    | Package our app for development and ensure that it is easy to download from the chrome store. |



#### 7.3 User Testing

We conducted a survey through Google Forms which can be found here.

We asked 5 users to blindfold themselves and presented them with a task list listed below:

-

We then observed the participants of the survey and noted down the results.

As for the survey, most of the questions were similar to the pre-survey conducted to be able to compare the results. The questions and results are presented below.

### 8. Final Thoughts

Additional Features that can be implemented in the future:

- Ability to allow the reader to re-visit last visited page.

To be done by Milestone 3.

