// import Swal from 'sweetalert2'

let isStart = false

function addPlayer() {

}


Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    // icon: 'error',
    confirmButtonText: 'สุ่มลูกเต๋า',
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then((result) => {
    console.log(result)
    Swal.fire({
        title: 'กด Yes เพื่อยืนยันเลขที่สุ่มได้',
        // showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Yes',
        html: "เลขที่สุ่มได้ <b></b>",
        // denyButtonText: 'No',
        didOpen: () => {
            const randomText = Swal.getPopup().querySelector("b");

            const interval = setInterval(() => {
                const randomNumber = Math.floor(Math.random() * 6) + 1; // Random number between 1-6
                randomText.textContent = randomNumber;
            }, 100);
        
            // Stop after 1 second
            setTimeout(() => {
                clearInterval(interval);
            }, 1500);
        },
        allowOutsideClick: false,
    allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
  })