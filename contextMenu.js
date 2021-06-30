var contextMenuItem = {
    "id":"speakwords",
    "title":"Speak Words",
    "type": "normal",
    "contexts":["selection"]
};

chrome.contextMenus.create(contextMenuItem,function() {
    if (chrome.extension.lastError) {
      console.log("Got expected error: " + chrome.extension.lastError.message);
    }
}); //Creating the selection tab in chrome right-click

chrome.contextMenus.onClicked.addListener(function(clickData){
  if(clickData.menuItemId == "speakwords" && clickData.selectionText){
    let engine = chrome.tts;
    engine.speak(clickData.selectionText);

  console.log("Speaking now");

  }
});

=
