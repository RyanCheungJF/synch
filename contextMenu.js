var contextMenuItem = {
    "id":"speakwords",
    "title":"Speak Words",
    "contexts":["selection"]
};
chrome.contextMenus.create(contextMenuItem) //Creating the selection tab in chrome right-click


chrome.contextMenus.onClicked.addListener(function(clickData){
console.log("hello world!");
if(clickData.menuItemId == "speakwords" && clickData.selectionText){

  let engine = window.speechSynthesis;
  engine.rate = 1.0;
  engine.cancel();
  engine.speak(new SpeechSynthesisUtterance("Hello"));

};

});
