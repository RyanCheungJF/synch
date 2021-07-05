console.log("background.js working");

//ContextMenu

chrome.contextMenus.create({
    "id":"speakwords",
    "title":"Speak Words",
    "type": "normal",
    "contexts":["selection"]
},function() {
    if (chrome.extension.lastError) {
      console.log("Got expected error: " + chrome.extension.lastError.message);
    }
});

chrome.contextMenus.onClicked.addListener(function(clickData){
  if(clickData.menuItemId == "speakwords" && clickData.selectionText){
    let engine = chrome.tts;
    engine.speak(clickData.selectionText);

    console.log("Speaking now");

  }
});





chrome.commands.onCommand.addListener(function(command){

  if(command == headers):





} );


*/
