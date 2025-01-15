let players = []

let data = new Map()
const sampleRat = ["Rat_1", "Rat_2", "Rat_3", "Rat_4", "Rat_5", "Rat_6", "Rat_7"]
let rat = []
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
    if (players.length == 8) {
        return alert("เกมนี้เล่นได้แค่ 8 คน")
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
// import Swal from 'sweetalert2'
function showPopup(name) {
    if (!opened.includes(name)) {
        opened.push(name)
        const ratData = data.get(name)
        const ratShowText = ratData == "Thief_Rat" ? "หนูจอมโจร" : "หนูขี้เซา"
        const ratShowColor = ratData == "Thief_Rat" ? "red" : "black"

        Swal.fire({
            title: name,
            html: `<h1 class="text-2xl" style="color: ${ratShowColor};">${ratShowText}</h1>`,
            imageUrl: `/public/cards/${ratData}.PNG`,
            confirmButtonText: 'สุ่มลูกเต๋า',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            console.log(result)
            Swal.fire({
                title: 'กด Yes เพื่อยืนยันเลข',
                showConfirmButton: !(ratData == "Thief_Rat" && players.length == 4),
                confirmButtonText: 'Yes',
                html: `เลขที่สุ่มได้ <b class="text-xl"></b>`,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showDenyButton: players.length == 4,
                denyButtonText: "สุ่มเต๋าที่ 2",
                didOpen: () => {
                    const randomText = Swal.getPopup().querySelector("b");
                    Swal.disableButtons()
                    const interval = setInterval(() => {
                        const randomNumber = Math.floor(Math.random() * 6) + 1; // Random number between 1-6
                        randomText.textContent = randomNumber;

                        btn1Number = randomNumber
                    }, 100);

                    // Stop after 1 second
                    setTimeout(() => {
                        clearInterval(interval);
                        Swal.enableButtons()
                    }, 1500);
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    selectedNumber.set(name, btn1Number)
                    return
                }
                if (result.isDenied) {
                    Swal.fire({
                        title: 'กด Yes เพื่อยืนยันเลข',
                        confirmButtonText: 'Yes',
                        html: `เลขที่สุ่มได้ <b class="text-xl"></b>`,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        didOpen: () => {
                            const randomText = Swal.getPopup().querySelector("b");
                            Swal.disableButtons()
                            const interval = setInterval(() => {
                                const randomNumber = Math.floor(Math.random() * 6) + 1; // Random number between 1-6
                                randomText.textContent = randomNumber;

                                btn2Number = randomNumber
                            }, 100);

                            // Stop after 1 second
                            setTimeout(() => {
                                clearInterval(interval);
                                Swal.enableButtons()
                            }, 1500);
                        },
                    }).then(() => {
                        if (ratData == "Thief_Rat") {
                            selectedNumber.set(name, btn1Number + "," + btn2Number)
                        } else {
                            selectedNumber.set(name, btn2Number)
                        }
                    })
                }

            })
        })
    }
}

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
        rat = [...sampleRat]
        const play_btn = document.getElementById("play-btn")
        play_btn.textContent = "Stop"
        play_btn.classList.remove("bg-green-500")
        play_btn.classList.add("bg-red-500")
        const randomThief = Math.floor(Math.random() * players.length) + 1
        console.log(randomThief)
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

            if (i == randomThief) {
                if (find("Thief_Rat")) {
                    const selRat = Math.floor(Math.random() * rat.length)
                    data.set(name, rat[selRat])
                    rat = removeItemOnce(rat, rat[selRat])
                    console.log("1")
                } else {
                    data.set(name, "Thief_Rat")
                }
            } else {
                const selRat = Math.floor(Math.random() * rat.length)
                data.set(name, rat[selRat])
                console.log(rat[selRat])
                rat = removeItemOnce(rat, rat[selRat])

            }
            i++
        })
    } else {
        temp = []
        isStart = false

        // players
        btn1Select = false
        btn2Select = false

        btn1Number = 0
        btn2Number = 0
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

        randomCube = false
        selectedNumber = new Map()
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
    selectedNumber.forEach((v, k) => {
        str += k + " ได้เป็น " + data.get(k) + " เวลาตื่น " + v + "\n"
    })
    alert(str)
}