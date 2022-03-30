let strategyText = document.getElementById("strategy-text")
let save = document.getElementById("save")
let telescopeNameText = document.getElementById("telescope-name")
let telescopes = document.getElementById("telescopes")
let reboot = document.getElementById("reboot-backend")

save.addEventListener("click", async () => {
  let content = document.getElementById("strategy-text");
  console.log(content.value)
  if (window.location.search) {
    fetch('./editTelescope?name=' + telescopeNameText.value + ".js", {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: content.value,
    })
  } else {
    fetch('./postNewTelescope?name=' + telescopeNameText.value + ".js", {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: content.value,
    })
  }
})

window.addEventListener('load', async () => {
  if (window.location.search) {
    loadTelescopeCode()
  } else {
    loadTemplateCode()
  }
});

window.addEventListener('load', async () => {
  let telescopes = await fetch("./getTelescopes")
  let telescopeArray = await telescopes.json()
  telescopeArray.forEach(element => {
    let telescopes = document.getElementById("telescope-dropdown")
    telescopes.innerHTML += "\n<a class=\"dropdown-item\" href=\"./editTelescope.html?name=" + element + "\">" + element + "</a>"
  });
})

reboot.addEventListener("click", async () => {
  await fetch("./rebootBackend", {
    method: "POST"
  })
})

async function loadTelescopeCode() {
  let telescope = window.location.search.substring(6)
  let telescopeImplementation = await fetch("./telescopeImplementation.js?name=" + telescope);
  strategyText.innerHTML = await telescopeImplementation.text()
  telescopeNameText.value = telescope
}

if (window.location.search) {
  const deleteButton = document.getElementById("delete-button")

  deleteButton.addEventListener("click", async function() {
    let telescope = window.location.search.substring(6)
      await fetch("deleteTelescope?name=" + telescope, {
        method: "DELETE"
    })
  })
}

async function loadTemplateCode() {
  let template = await fetch("./telescopeTemplate.txt");
  strategyText.innerHTML = await template.text();
}