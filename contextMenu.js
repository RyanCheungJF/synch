var contextMenuItem = {
    "id":"speakwords",
    "title":"Speak Words",
    "type": "normal",
    "contexts":["selection"]
};
chrome.contextMenus.create(contextMenuItem) //Creating the selection tab in chrome right-click


chrome.contextMenus.onClicked.addListener(function(clickData){

if(clickData.menuItemId == "speakwords" && clickData.selectionText){

  let engine = window.speechSynthesis;
  engine.rate = 1.0;
  engine.cancel();
  engine.speak(new SpeechSynthesisUtterance("Hello"));

};


//Highlight text and tts activated
/*
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    // for Internet Explorer 8 and below. For Blogger, you should use &amp;&amp; instead of &&.
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
$(document).ready(function (){ // when the document has completed loading
   $(document).mouseup(function (e){ // attach the mouseup event for all div and pre tags
      setTimeout(function() { // When clicking on a highlighted area, the value stays highlighted until after the mouseup event, and would therefore stil be captured by getSelection. This micro-timeout solves the issue.
         responsiveVoice.cancel(); // stop anything currently being spoken
         responsiveVoice.speak(getSelectionText()); //speak the text as returned by getSelectionText
      }, 1);
   });
});
*/

});
