chrome.tabs.onActivated.addListener(
    function (request, id, sendResponse) {
        if (request.message === "log_to_console") {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: id, allFrames: true },
                    files: ['content.js'],
                });
            });
        }
    });

//  chrome.action.onClicked.addListener((tab) => {
//    chrome.scripting.executeScript({
//      target: {tabId: tab.id},
//      files: ['content.js']
//    });
//   });
// try {
// chrome.tabs.onUpdated.addListener(function( tabId, changeInfo, tab) {
//     if (changeInfo.status === 'complete') {
//         chrome.scripting.executeScript({
//             files: [ "content.js" ],
//             target: { tabId: tab.id}
//         })
//     }
// })
// }catch(e){
//     console.log(e)
// }

