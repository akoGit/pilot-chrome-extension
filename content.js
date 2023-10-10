const b = document.querySelector('body')
const remainders = document.querySelector('.time_config')
const form = document.querySelector('#custom_form')

const checkBoxOne = document.getElementById("checkbox_1")
const checkBoxVal = document.getElementById("checkboxOne")
const doneBtn = document.querySelector('.submit_btn')


let activateRemainder = document.querySelector('.remainders_config')

let newDiv = Object.assign(document.createElement("div"), {
  className: 'foo',
  popUp: 'manual',
  innerHTML: `<h1> Time for a break? </h1> 
    <p class='notif_p'>You've scheduled reminders for every 10 minutes. Take a moment to reset by closing browser.</p>`
})

let ExitBtn = Object.assign(document.createElement("button"), {
  className: 'bar',
  popUp: 'manual',
  innerHTML: 'Not now'

})
// let intervalMilliseconds = 5000
// let delayInMilliseconds = 5000
function displayNotif() {

  b.appendChild(newDiv);
  b.requestFullscreen()

  newDiv.appendChild(ExitBtn)

  ExitBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => console.log("Document Exited from Full screen mode"))
        .catch((err) => console.error(err));
    }
    newDiv.remove()
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  const name = data.get("numberInput")
  const entries = Object.fromEntries(data.entries())
  console.table(entries)
  console.log(name)
  // intervalMilliseconds = 5000
})




remainders.addEventListener('click', () => {
  activateRemainder.classList.toggle('active')
})


doneBtn.addEventListener("click", () => {
  activateRemainder.classList.toggle('active')
  parsePageContent()
})



function parsePageContent() {
  setTimeout(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {

      let tabId = tabs[0].id;

      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          function: () => {
            displayNotif()
          },
        },

      );
    })
  }, 4000)
}
