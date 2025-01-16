
// List of 160 items
const static_roles = ["สามัญชน", "ฆาตกร", "นักมวย", "ขุนนาง"];

const bad = ["ฆาตกร"]
const good = ["สามัญชน"]

const resultsContainer = document.getElementById("results");
const selectedContainer = document.getElementById("selectedItems");

const selectedRole = []

function displayResults(filteredClues) {
  resultsContainer.innerHTML = "";
  filteredClues.forEach(clue => {
    const li = document.createElement("li");
    li.textContent = clue;
    li.className = "px-4 py-2 hover:bg-gray-100 cursor-pointer";
    li.onclick = () => addToSelected(clue);
    resultsContainer.appendChild(li);
  });
}

function displaySelected() {
  selectedContainer.innerHTML = "";
  selectedRole.forEach(clue => {
    const li = document.createElement("li");
    li.textContent = clue;
    li.className = "px-4 py-2 hover:bg-red-100 cursor-pointer";
    li.onclick = () => removeFromSelected(clue);
    selectedContainer.appendChild(li);
  });
}

function addToSelected(clue) {
  selectedRole.push(clue);
  displaySelected()
}

function removeFromSelected(clue) {
  selectedRole.splice(selectedRole.indexOf(clue), 1);
  // displayResults(clues);
  displaySelected();
}

displayResults(static_roles);

let players = []

let data = new Map()
const sampleRat = ["Rat_1", "Rat_2", "Rat_3", "Rat_4", "Rat_5", "Rat_6", "Rat_7"]
let roles = []
let opened = []

let selectedNumber = new Map()

let isStart = false

let btn1Number = 0
let btn2Number = 0

let temp = []

function addName() {
  if (isStart) {
    return alert("Game is Started")
  }
  const input = document.getElementById('nameInput');
  const name = input.value.trim();
  if (name) {
    let skip = false
    players.forEach(pl => {
      if (pl.textContent == name) {
        skip = true
      }
    })
    if (skip) {
      input.value = ''; // Clear input
      return alert("ห้ามชื่อซ้ำ")
    }
    const list = document.getElementById('nameList');
    const listItem = document.createElement('li');
    listItem.textContent = name;
    listItem.className = "p-4 w-full border border-black bg-blue-500 rounded-md cursor-pointer hover:underline";

    list.appendChild(listItem);
    players.push(listItem)
    input.value = ''; // Clear input
  } else {
    alert('Please enter a name!');
  }
}

function isBadOrGoodColor(role) {
  if (bad.includes(role)) {
    return "red"
  } else {
    return "black"
  }
}

function showPopup(name) {
  if (!opened.includes(name)) {
    opened.push(name)
    const role = data.get(name)
    const ratShowColor = isBadOrGoodColor(role)

    Swal.fire({
      title: name,
      html: `<h1 class="text-2xl" style="color: ${ratShowColor};">${role}</h1>`,
      imageUrl: `/public/dyingmessage/roles/${role}.png`,
      confirmButtonText: 'Confirm',
      allowOutsideClick: false,
      allowEscapeKey: false,
    })
  }
}

function playGame() {
  console.log("test")
  if (players.length <= 4) {
    alert("ต้องการผู้เล่นมากกว่า 4 คน")
    return
  }
  if (players.length != selectedRole.length) {
    return alert("โปรดเลือก บทบาท ให้ครบจำนวคน")
  }
  opened = []
  if (!isStart) {
    console.log("tesd")
    isStart = true
    roles = [...selectedRole]
    const play_btn = document.getElementById("play-btn")
    play_btn.textContent = "Stop"
    play_btn.classList.remove("bg-green-500")
    play_btn.classList.add("bg-red-500")
    let i = 1;
    players.forEach(el => {
      el.classList.remove("text-gray-400")
      console.log(el)
      el.addEventListener('click', () => {
        showPopup(el.textContent);
        console.log(el.textContent)
        console.log("wadadawawd")
        el.classList.add('text-black', "bg-slate-300");
      });
      const name = el.textContent
      const randomRole = roles[Math.floor(Math.random() * roles.length)]
      console.log(randomRole)
      data.set(name, randomRole)
      roles.splice(roles.indexOf(randomRole), 1)
      console.log(roles)
      i++
    })
  } else {
    temp = []
    isStart = false

    // players = []
    const list = document.getElementById('nameList');
    while (list.firstChild) {
      list.removeChild(list.lastChild);
    }
    players.forEach(el => {
      const list = document.getElementById('nameList');
      const listItem = document.createElement('li');
      listItem.textContent = el.textContent;
      console.log(el.textContent)
      listItem.className = "p-4 w-full border border-black bg-blue-500 rounded-md cursor-pointer hover:underline";

      list.appendChild(listItem);
      temp.push(listItem)
    });

    players = []

    temp.forEach(el => {
      players.push(el)
      console.log(el.textContent)
    })

    opened = []
    data = new Map()
    const play_btn = document.getElementById("play-btn")
    play_btn.textContent = "Start"
    play_btn.classList.add("bg-green-500")
    play_btn.classList.remove("bg-red-500")
  }
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function find(name) {
  for (const x of data.values()) {
    if (x == name) {
      return true
    }
  }
  return false
}

function checkData() {
  let str = ""
  data.forEach((v, k) => {
    str += k + " ได้เป็น " + v + "\n"
  })
  alert(str)
}