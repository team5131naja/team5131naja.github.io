let players = []

let data = new Map()
const sampleRat = ["Rat_1","Rat_2","Rat_3","Rat_4","Rat_5","Rat_6","Rat_7"]
let rat
let opened = []
let randomCube = false

let selectedNumber = new Map()

let currentPopup

function addName() {
    if (isStart) {
        return alert("Game is Started")
    }
    const input = document.getElementById('nameInput');
    const name = input.value.trim(); // Remove extra spaces
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

function showPopup(name) {
    console.log(opened.includes(name))
    if (randomCube == false && !opened.includes(name)) {
        const popup = document.getElementById('popup');
        const overlay = document.getElementById('overlay');
        const popupName = document.getElementById('popupName');
        const popupDetails = document.getElementById('popupDetails');
        const popupImg = document.createElement('IMG');
        popupImg.id = "popupImg"
        
        const ratData = data.get(name)
        popupImg.src = "/public/cards/" + ratData + ".PNG"
        popupName.textContent = name;

        popup.appendChild(popupImg)
    
        popupDetails.classList.remove("text-red-600")
        if (ratData == "Thief_Rat") {
            popupDetails.textContent = `หนูจอมโจร`;
            popupDetails.classList.add("text-red-600")
        } else {
            popupDetails.textContent = `หนูขี้เซา`;
        popupDetails.classList.add("text-gray-600")
        }
    
        popup.classList.remove('hidden'); // Show popup
        overlay.classList.remove('hidden'); // Show overlay
    
        opened.push(name)

        console.log(opened)
    } else if (randomCube == true && !opened.includes(name)) {
        currentPopup = name
        btn1Select = false
        btn2Select = false
        const popup = document.getElementById('popup');
        const overlay = document.getElementById('overlay');
        const popupName = document.getElementById('popupName');
        const popupDetails = document.getElementById('popupDetails');
        popupDetails.textContent = `กดสุ่มเวลาตื่น`;
        const btn = document.getElementById('btn');

        const random1BTN = document.createElement("BUTTON");
        random1BTN.textContent = "สุ่มเต๋าที่ 1"
        random1BTN.id = "btn1"
        const random2BTN = document.createElement("BUTTON");
        random2BTN.textContent = "สุ่มเต๋าที่ 2"
        random2BTN.id = "btn2"

        random1BTN.classList.add("p-4", "bg-blue-500", "rounded-md")
        random2BTN.classList.add("p-4", "bg-blue-500", "rounded-md")
        const ratData = data.get(name)
        random1BTN.addEventListener("click", () => {
            console.log("1")
            if (selectedNumber.has(name)) {
                return
            }
            if (btn1Select == false) {
                generateRandomNumber("btn1")
            } else {
                if (ratData == "Thief_Rat") {
                    selectedNumber.set(name, btn1Number + "," + btn2Number)
                } else {
                    selectedNumber.set(name, btn1Number)
                }
                random1BTN.classList.remove("bg-blue-500")
                random1BTN.classList.add("bg-red-500")
            }
            
        })
        random2BTN.addEventListener("click", () => {
            console.log("2")
            if (selectedNumber.has(name)) {
                return
            }
            if (btn2Select == false) {
                generateRandomNumber("btn2")
            } else {
                if (ratData == "Thief_Rat") {
                    selectedNumber.set(name, btn1Number + "," + btn2Number)
                } else {
                    selectedNumber.set(name, btn2Number)
                }
                
                random2BTN.classList.remove("bg-blue-500")
                random2BTN.classList.add("bg-red-500")
            }
        })

        btn.appendChild(random1BTN)
        if (players.length == 4) {
            btn.appendChild(random2BTN)
        }
        
        popupName.textContent = name;
    
        popup.classList.remove('hidden'); // Show popup
        overlay.classList.remove('hidden'); // Show overlay
        
        opened.push(name)
    }
}

function closePopup() {
    if (randomCube && !selectedNumber.has(currentPopup)) {
        return alert("โปรดกดเลือกเวลาตื่นด้วย")
    }
    const popup = document.getElementById('popup');
    const btn = document.getElementById('btn');
    const overlay = document.getElementById('overlay');
    const popupDetails = document.getElementById('popupDetails');
    popupDetails.classList.remove("text-red-600")
    if (randomCube == false) {
        const img = document.getElementById("popupImg")
        popup.removeChild(img)
    } else if (randomCube) {
        const btn1 = document.getElementById("btn1")
        const btn2 = document.getElementById("btn2")
        btn.removeChild(btn1)
        if (btn2 != undefined) {
            btn.removeChild(btn2)
        }
        
    }

    popup.classList.add('hidden'); // Hide popup
    overlay.classList.add('hidden'); // Hide overlay

    if (opened.length == players.length && !randomCube) {
        randomCube = true
        players.forEach(el => {
            // el.classList.remove("text-gray-400")
            el.classList.remove('text-black', 'bg-slate-300');
        })
        opened = []
    }
}

let isStart = false

function playGame() {
    console.log("test")
    if (players.length < 4) {
        alert("ต้องการผู้เล่น 4 - 8 คน")
        return
    }
    opened = []
    if (!isStart) {
        console.log("tesd")
        isStart = true
        rat = sampleRat
        const play_btn = document.getElementById("play-btn")
        play_btn.textContent = "Stop"
        play_btn.classList.remove("bg-green-500")
        play_btn.classList.add("bg-red-500")
        const randomThief = Math.floor(Math.random() * players.length) + 1
        console.log(randomThief)
        let i = 1;
        players.forEach(el => {
            el.classList.remove("text-gray-400")
            el.addEventListener('click', () => {
                showPopup(el.textContent);
                el.classList.add('text-black', "bg-slate-300");
            });
            const name = el.textContent
            
            if (i == randomThief) {
                if (find("Thief_Rat")) {
                    const selRat = Math.floor(Math.random() * rat.length)
                    data.set(name, rat[selRat])
                    rat = removeItemOnce(rat, rat[selRat])
                } else {
                    data.set(name, "Thief_Rat")
                }
            } else {
                const selRat = Math.floor(Math.random() * rat.length)
                data.set(name, rat[selRat])
                rat = removeItemOnce(rat, rat[selRat])
            }
            i++
        })
    } else {
        location.reload()
        // isStart = false
        // players = []
        // const play_btn = document.getElementById("play-btn")
        // play_btn.textContent = "Start"
        // play_btn.classList.add("bg-green-500")
        // play_btn.classList.remove("bg-red-500")
        // const list = document.getElementById('nameList');
        // let child = list.lastElementChild;
        // while (child) {
        //     list.removeChild(child);
        //     child = list.lastElementChild;
        // }
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

let btn1Select = false
let btn2Select = false

let btn1Number = 0
let btn2Number = 0

function generateRandomNumber(name) {
    const button = document.getElementById(name);

    // Disable the button while generating numbers
    button.disabled = true;
    // button.classList.add('opacity-50', 'cursor-not-allowed');

    // Generate numbers every 100ms and stop after 1 second
    const interval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 6) + 1; // Random number between 1-6
        button.textContent = randomNumber;
        
        if (name == "btn1") {
            btn1Number = randomNumber
        } else {
            btn2Number = randomNumber
        }
    }, 100);

    // Stop after 1 second
    setTimeout(() => {
        clearInterval(interval);

        // Re-enable the button
        button.disabled = false;
        if (name == "btn1") {
            btn1Select = true
        } else {
            btn2Select = true
        }
        // button.classList.remove('opacity-50', 'cursor-not-allowed');
    }, 1000);
}


function checkData() {
    let str = ""
    selectedNumber.forEach((v, k) => {
        str += k + " ได้เป็น " + data.get(k) + " เวลาตื่น " + v + "\n"
    })
    alert(str)
}