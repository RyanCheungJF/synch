# **Orbital 2021 Learning Outcomes**

## Team buttersmarsh (Gemini)

- [**Orbital 2021 Learning Outcomes** ](#orbital-2021-learning-outcomes)
  - [Team buttersmarsh (Gemini)](#team-buttersmarsh-gemini)
    - [1. Project Log](#1-project-log)
    - [2. Learning Outcomes](#2-learning-outcomes)
    - [3. About Us](#3-about-us)

### 1. Project Log

This section includes the different difficulties we've came across, inclusive of the bugs and failures.

| Attempted                                                    | Remarks                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Initially tried to integrate with iOS to make an app instead, similar to VoiceOver | There was no iOS API/ Voiceover support available online, and thus it became very difficult to try to make an improvement without knowing how their source code is written. |
| Testing on Node.js                                           | The library SpeechSynthesisUtterance was a Web API and thus we couldn't compile and run on Node.js, but often had to debug on the browser's console instead. |
| CORS Blocking                                                | The library SpeechSynthesisUtterance had certain permissions changed where it wouldn't activate if injected through a web app, unless activated through a keypress which we subsequently changed to.<br />Furthermore, pre existing CORS policies resulted in us changing our manifest permissions in order to run the extension. |
| Importing/ Exporting Functions between files                 | The use of 'window' in our code produced an error which prevented us from importing and exporting modules easily. |
| Jest and Unit Testing                                        | Because of importing issues, it was difficult to use jest to test our functions just by importing, and thus it made it much harder to test the DOM elements as well. Jest also had other errors, which resulted in us creating a modified test suite to copy our pre-existing functions to test. |
| 'li' elements and ghost spans                                | Certain websites have duplicated spans or divs, such that our TTS reader would read certain text fields twice. We created a cleaner function to filter such instances out. |
| Null or Empty Text Fields                                    | Additionally, certain fields are filled with other unnecessary HTML tags or are actually empty/ undefined. Hence, we modified our cleaner function to be able to deal with such instances. |
| Abstracting Speech Function                                  | Most of our code for speaking and going through the indexes are repeated and we wanted to abstract the code into a function to reduce duplicity. Unfortunately, the code didn't work as intended and produced other bugs which surfaced when dealing with highlighting and double pressing space. |
| Index of the Array                                           | When dealing with highlighting, the index of the array became an issue as there were times it would replace text fields with 'undefined'. Initially, we used an index system of 0, array.length - 1 but subsequently now the index ranges to infinity and is calculated using modulo instead. |
| Chrome Commands                                              | We initially wanted to use chrome commands as it was a built in options page. Unfortunately, most of its compatibility is with Manifest V2 which caused us to be unable to import settings using the API as intended. |
| Adblocking                                                   | Adblock taken from EasyList was mainly built upon Manifest V2, which caused the initial script to break. As Chrome does not support much of V2 now, we had to use V3 to build it. We wrote a Python script to then convert the easy list to a JSON file for the manifest to process it. |
| Options                                                      | Certain keybinds such as '\' have reserved purposes such as for regex in Javascript and as such are unavailable for use. Furthermore, CORB interferes with using 'SHIFT' as a keybind and as such we had to use 'ALT' instead, but with that we had to block out certain pre programmed bindings as well. A bug we faced was not being able to get preventDeafult to work, hence resulting in the more limited choices of bindings. |
| Adblocking Strength                                          | An unforseen bug was that adblocking at its highest restrictions seemed to blocked out certain sites completely or remove images as it deemed they were ads.  |                                                                                                                                                                                                    |

This project stems from a self directed software enginering module called ['Orbital'](https://orbital.comp.nus.edu.sg/).

Hence, one of the requirements is to log our hours spent on the project over the course of 3 months. If you would like to learn more, you may do so by clicking [here](https://docs.google.com/spreadsheets/d/16ZCVtac-iHqGs--4NDkFv1cV-XHdij5KR6NIbroeNq8/edit?usp=sharing).

Here is the data in a glance, if you would like to view it in a more compact form.

![](/imgs/hr_tracker1.jpg)

![](/imgs/hr_tracker2.jpg)

### 2. Learning Outcomes

- Learnt both HTML, CSS and more in depth JavaScript in order to web scrape. Furthermore, we learnt more about the underlying manifest and how Chrome interacts with it.
- Understood Adblock's architecture, and managed to replicate it's functionality using regex and modifying it to be JSON files.
- Learnt a bit of Unit Testing, which will be helpful in future SWE projects.
- Also picked up certain SWE techniques.
- Interacted with the Chrome API and gained a deeper understanding on how an extension is made and processed.

While the original intention of the project was to make an iOS app similar to VoiceOver, Apple's API was not available and hence we compromised to work with an extension instead. However, in the future we do hope that we are able to make an app version of 'Synch', which was the ultimate and initial goal of our group.

Ultimately, this was an interesting experience for the both of us as while formulating the idea, neither of us would've expected for the project to take this direction, as we were both thinking that we would make a more 'traditional' app instead. Despite this, it was intriguing to tinker around with the TTS engine and exploring a rather niche section of web development, especially one which involved support for the visually impaired.

After embarking on this project, we do see the difficulties and challenges involved in providing support for the visually impaired due to the flexbility of HTML and the complex nature of how a DOM has no 'fixed' structure. Despite this, we do hope that more developers out there provide some form of support in the future for the visually impaired, and work towards the end goal of a more inclusive internet. 

### 3. About Us

Thanks for taking the time to read our documentation. We hope you enjoyed the project as much as we enjoyed making this.

A bit more information about us:

[Ryan Cheung](https://github.com/RyanCheungJF):

Computer Science Undergraduate with interests in UI/ UX, web development, GoLang.

[Niranjan Gopinath](https://github.com/Niran-Chan):

Mechanical Engineering Undergraduate specializing in Aerospace Engineering, with interests in web security, ethical hacking and bash.

If you would like to contact us, feel free to drop us an email at `ryan9cheung@gmail.com`
