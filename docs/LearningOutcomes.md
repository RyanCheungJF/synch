# **Orbital 2021 Learning Outcomes** 

## Team buttersmarsh (Gemini)

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
