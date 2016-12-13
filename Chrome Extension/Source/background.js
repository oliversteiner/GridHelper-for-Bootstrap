/**
 * Created by ost on 17.09.16.
 */

// this is the background code...

// listen for our browerAction to be clicked

// https://developer.chrome.com/extensions/tabs#method-executeScript
// executeScript − chrome.tabs.executeScript(integer tabId, object details, function callback)

chrome.browserAction.onClicked.addListener(function (tab) {


// http://stackoverflow.com/questions/4976996/chromes-tabs-executescript-passing-parameters-and-using-libraries
chrome.tabs.executeScript(tabId, {file: "thirdparty/jquery-3.1.1.min.js"}, function(){
    chrome.tabs.executeScript(tabId, {code: "var scriptOptions = {param1:'value1',param2:'value2'};"}, function(){
        chrome.tabs.executeScript(tabId, {file: "inject.js"}, function(){
            //all injected
        });
    });
});

});
