/*
var blocked_sites = ["*googleadservices.com/*",
,"*tigerbrokers.com.sg/*"];

chrome.WebRequest.onBeforeRequest.addListener(function(content){
  console.log("BLOCKING",content.url)
  return {cancel: true}
},
{urls:blocked_sites},
["blocking"]
)
*/
console.log("Running adblock");
