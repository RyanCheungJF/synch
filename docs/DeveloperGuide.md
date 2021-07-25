# **Orbital 2021 Developer Guide** 

## Team buttersmarsh (Gemini)

* [**Orbital 2021 Developer Guide** ](#orbital-2021-developer-guide)
    * [Team buttersmarsh (Gemini)](#team-buttersmarsh-gemini)
        * [1. System Design](#1-system-design)
            * [1.1 Main Design](#11-main-design)
            * [1.2 Relevant Tools](#12-relevant-tools)
            * [1.3 Installation](#13-installation)
        * [2. Pipeline](#2-pipeline)
            * [2.1 User Flow](#21-user-flow)
            * [2.2 Class Diagram](#22-class-diagram)
        * [3. Implementation](#3-implementation)
            * [3.1 Speaking Feature](#31-speaking-feature)
            * [3.2 Activating the System](#32-activating-the-system)
            * [3.3 Parsing HTML ](#33-parsing-html)
        * [4. Design](#4-design)
        * [5. Settings Page](#5-settings-page)
            * [5.1 Options](#51-options)
            * [5.2 UI/ UX](#52-ui-ux)
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

Options is stored using the Chrome local storage, same for ads that the user reports themselves.

#### 1.2 Relevant Tools

Our project will use a number of languages and libraries:

- HTML, CSS, JavaScript
- NodeJS
- SpeechSynthesisUtterance 
- Git
- NPM

#### 1.3 Installation

Developers with git can clone this repository to obtain a copy of the source code:

```git clone https://github.com/RyanCheungJF/Synch```

We recommend using the IDE [Visual Studio Code](https://code.visualstudio.com/) to run our source code as it is versatile and can run both JavaScript and Python files.

To support Python, users may download the [Python Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python).

Developers can then install [NodeJS and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) if they have not done so.

If developers would like to perform testing, they can bring up the terminal in VSC with 'CTROL + `' and type the following into the terminal:

```npm install --save-dev jest```

Once the folder has been created, developers can navigate to the extensions page in Chrome. The button is at the top right hand side of the browser next to the URL bar, and is labelled extensions.

Clicking it, developers can click 'Manage Extensions at the bottom'.

![](/imgs/findingExtensions.jpg)

Developers will then be redirected to an extension manager page.

On the right hand side, ensure that developer mode is turned on.

On the left hand side, click 'Load Unpackaged' and select the folder to upload Synch.

![](/imgs/developerMaterials.jpg)

Once done, enable Synch and it will be ready to run. Happy testing!

### 2. Pipeline

#### 2.1 User Flow

![](/imgs/UserFlow.png)

#### 2.2 Class Diagram

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

We used the event listener `click` to activate our keypresses. We aimed to use number keys for default settings as most keyboards offer the number pad, offering a more densely populated control system which does not require the user to move much.

The key button presses and their default settings are made as follow:

| Key-Binding | Functionality                                                |
| ----------- | ------------------------------------------------------------ |
| ALT + 1     | Toggles between paragraphs (p tags in HTML)                  |
| ALT + 2     | Toggles between headers (h1, h2, h3, h4, h5, h6 tags in HTML) |
| ALT + 3     | Brings up a search bar to search for hyperlinks on the page (a, href in HTML) |
| ALT + 4     | After filtering, toggles between hyperlinks' titles          |
| ALT + 0     | Redirects the user to the last link's title read             |
| ALT + q     | Reads the page in sequence                                   |

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

#### 5.1 Options

The logic used to make the settings page can be found under ['options.js'](https://github.com/RyanCheungJF/Synch/blob/main/options.js), with the HTML under ['options.html'](https://github.com/RyanCheungJF/Synch/blob/main/options.html) respectively. 

As different keypresses are made to activate and read different sections of the website, we wanted to provide users with the flexibility to customize their experience. The settings makes use of Chrome's storage sync [API](https://developer.chrome.com/docs/extensions/reference/storage/#property-sync) to export and import the different values needed between each file.

The main bulk of the validation checker involves an event listener that is fired upon clicking the 'Save' button. The logic provided in this function mainly checks for input length, conflicting keys, and checks among a basket of keys which are not allowed to be used.

The rationale for this basket of banned keys is because we wanted the TTS to only be used with the 'ALT' + 'key user inputted' to make sure each press is intentional, and there are pre-programmed browser functions with 'ALT' + 'D, E, F, SPACE'. Furthermore, the backslash key is used for regex in Javascript and thus is another key that we have to look out for. As such, these keys form the set of banned keys in order for keypresses to work with 'ALT'.

Currently we do not support using multiple key bindings eg. 'SHIFT + ALT + Q', but we considered to use [Chrome Commands](https://developer.chrome.com/docs/extensions/reference/commands/) to do so and import them in. However, we faced multiple issues which are further elaborated in our Learning Outcomes README including other bugs such as preventing default actions. However, for further implementations, it would definitely be a feature that we would want to implement.

![](/imgs/ChromeCommands.jpg)

#### 5.2 UI/ UX 

As for the validation, we checked each field sequentially, but a better UI/ UX imporvement for the future would be to check all fields all at once using async. This will help to create a more smoother experience for the user.

The settings page also has a few TTS voicelines to tell the user what field they are currently setting.

### 6. Ad Detection

#### 6.1 Adblock

The current implementation of Adblock and its source code can be found [here](https://github.com/adblockplus). We based the adblock feature of their code, where its database of sites to block comes from a file called EasyList. We have added it to our repo and the raw file can be found [here](https://raw.githubusercontent.com/RyanCheungJF/Synch/main/easy_list.json). It is essentially a text file filled with regex and different links for the site to block. However, the file was made for python, and as such we had created a [python script](https://github.com/RyanCheungJF/Synch/blob/main/convert.py) to convert the text file to JSON such that the manifest could register it. The end product of the raw file can be found [here](https://raw.githubusercontent.com/RyanCheungJF/Synch/main/easy_list_4.json).

#### 6.2 Manifest Versions

The original adblock was built on Manifest V2, but there are plans to depreceate V2 as V3 has now been implemented. However, this change caused the original adblock to break at times, and the new formatting of V3 provided certain issues to write syntax for. If you would like to find out more about the difficulties we faced in implementing it into V3, it can be found in our Learning Outcomes README. Thus, this was one of the reasonings for the need to clean the EasyList and set its path subsequently in order to use it with the Declarative Net Request [API](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/).

#### 6.3 Ad Detection Strength

Developers are free to customize the strength of the ad detection level to their liking. We have experimented with the different settings and at higher levels, it may block certain sites completely due to how their HTML is formatted and the site being present in the list. 

This can be done by going to ['convert.py'](https://github.com/RyanCheungJF/Synch/blob/main/convert.py) and changing the `resource type` to `main_frame` from `sub_frame`. Similarly, developers are free to tone down the settings by searching and changing some of the present restrictions, and even manually inject certain keywords of their choice to block.

An unforseen consequence is that certain images may be flagged as ads. And as such on websites such as news sites, images pertaining the headlines may be blocked as an unforseen circumstance. As the main adblocking file contains 50000 different keywords, it will be almost impossible to manually sieve out these differences. A more efficient algorithm is instead being looked into to try to differentiate these images to be classified as an ad.

![](/imgs/adPower.jpg)

#### 6.4 Reporting an Ad

While the list may seem comprehensive, there will definitely be certain ads that will escape our list especially given the lowered settings in order to not block out entire sites.

As such, users can right click an ad if they see one, and are available to report it. It will then add the link to a list of ads to be detected from.

![](/imgs/reportAd.jpg)

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

The survey included a small task list for participants to attempt and try. They include the main functionalities of our extension.

As for the survey questions, most of them were similar to the pre-survey conducted to be able to compare the results. The questions and results are presented below.

### 8. Final Thoughts

Additional Features that can be implemented in the future:

- Ability to allow the reader to re-visit last visited page.
- Machine Learning algorithms to streamline certain filter functions/ Predict the content of a hyperlink.
- Allow screen to follow the current highlighted text.
- A smarter filter/ skip feature to skim through the content of the whole page.
- A beter HTML scraper to strip certain tag layouts set by the website.
- Hopefully able to gain insight into Apple's VoiceOver API to make an app version that is more streamlined.
