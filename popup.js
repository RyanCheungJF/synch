document.querySelector('#options').addEventListener('click',function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

document.querySelector('#ourGithub').addEventListener('click', function () {


    window.open('https://github.com/RyanCheungJF/Synch'); //Load our Github!



});
var id = 0;

document.querySelector('#reportAd').addEventListener('click',function(){

  id ++;
  domain = 'yahoo.com';
  chrome.declarativeNetRequest.updateDynamicRules(
    {addRules:[{
      "id":id,
      "priority" : 1,
      "action" : {"type" : "block"},
      "condition": {"urlFilter":domain, "resourceTypes" : ["main_frame"] }
    }],
      removeRuleIds:[id]
  });
  console.log("Ad reported and saved to database!");

});
