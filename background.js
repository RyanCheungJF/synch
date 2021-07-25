console.log("background.js working");

//ContextMenu
chrome.contextMenus.create(
  {
    "id":"speakwords",
    "title":"Speak Words",
    "type": "normal",
    "contexts":["selection"]
  },
  function() {
    if (chrome.extension.lastError) {
      console.log("Got expected error: " + chrome.extension.lastError.message);
    }
  }
);

chrome.contextMenus.onClicked.addListener(function(clickData){
  if(clickData.menuItemId == "speakwords" && clickData.selectionText){
    let engine = chrome.tts;
    engine.speak(clickData.selectionText);
    console.log("Speaking now");
  }
});

//Creating a Report Ad function
chrome.contextMenus.create(
  {
    "id" : "reportAd",
    "title":"Report Ad",
    "type":"normal",
    "contexts":["image","link"]
  },
  function(){
    if (chrome.extension.lastError) {
      console.log("Got expected error: " + chrome.extension.lastError.message);
    }
  }
);

var id = 0;
chrome.contextMenus.onClicked.addListener( function (clickData) {
  if (clickData.menuItemId == "reportAd") {
    id ++;
    if (clickData.linkUrl) {
      domain = clickData.linkUrl.substring(8);
    }
  if  (clickData.srcUrl)  {
    domain = clickData.srcUrl.substring(8) ;
  }
  console.log(domain,id);
  chrome.declarativeNetRequest.updateDynamicRules(
    { removeRuleIds:[id],
      addRules:[
        {
          "id":id,
          "priority" : 1,
          "action" : { "type" : "block" },
          "condition": { "urlFilter": domain, "resourceTypes": ["sub_frame","image"] }
        }
      ]

  });
  console.log("Ad reported and saved to database!");
  }
});
