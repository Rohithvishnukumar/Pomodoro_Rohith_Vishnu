// console.log("Front js code is loaded ");

// let hr;
// let min;
// let sec;

// const form = document.getElementById('dataForm');

// form.addEventListener('submit', (event) => {

//     console.log("This is logged from event listener");
//     document.getElementById("dispform").style.display = "none"
//     cancelButton()

//     event.preventDefault(); // Prevent default form submission

//     hr = parseInt(document.getElementById('hr').value, 10) || 0;
//     min = parseInt(document.getElementById('min').value, 10) || 0;
//     sec = parseInt(document.getElementById('sec').value, 10) || 0;

//     if (hr == 0 && min == 0 && sec == 0) {
//         alert(`Please Set time atleast above 1 second`);
//         window.location.href = '/';
//     }

//     let totalTime = (hr * 3600) + (min * 60) + sec;
//     let intId = setInterval(function () {
//         const remainingHours = Math.floor(totalTime / 3600);
//         const remainingMinutes = Math.floor((totalTime % 3600) / 60);
//         const remainingSeconds = Math.floor(totalTime % 60);

//         document.querySelector(".roh").innerHTML = `${remainingHours} hrs : ${remainingMinutes} min : ${remainingSeconds} s`;
//         totalTime--;

//         if (totalTime < 0) {

//             // notifyUser()

//             function notifyUser() {
//                 if (!document.hidden) {
//                     // Tab is visible, no need to notify
//                     return;
//                 }

//                 // Display a notification
//                 if (Notification.permission === 'granted') {
//                     var notification = new Notification('Timer Completed', {
//                         body: 'Your timer has finished!',
//                         icon: './Pro-Pomodoro1'  // Optional
//                     });

//                     // Handle notification click event
//                     notification.onclick = function () {
//                         // Focus on the current window/tab
//                         window.focus();
//                         // Optionally, you can also navigate back to the current tab
//                         // window.location.href = window.location.href;
//                     };
//                 } else if (Notification.permission !== 'denied') {
//                     Notification.requestPermission().then(function (permission) {
//                         if (permission === 'granted') {
//                             var notification = new Notification('Timer Completed', {
//                                 body: 'Your timer has finished!',
//                                 icon: 'path/to/icon.png'  // Optional
//                             });

//                             // Handle notification click event
//                             notification.onclick = function () {
//                                 // Focus on the current window/tab
//                                 window.focus();
//                                 // Optionally, you can also navigate back to the current tab
//                                 // window.location.href = window.location.href;
//                             };
//                         }
//                     });
//                 }
//             }






//             // let aud = new Audio("timer.mp3")
//             // aud.play()

//             document.getElementById('aud').play();

//             clearInterval(intId);
//             alert("You have successfully completed");

//             const data = {
//                 hour: hr,
//                 minute: min,
//                 seconds: sec
//             };

//             fetch("/stats", {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data)
//             }).then(response => {
//                 if (response.redirected) {
//                     window.location.href = response.url;
//                 }
//             });
//         }
//     }, 1000);

// });



// function cancelButton() {
//     const cancelform = document.querySelector(".cancelform")
//     const form = document.createElement("form")
//     form.setAttribute("action", "/")
//     form.setAttribute("method", "get")
//     cancelform.appendChild(form)

//     const button = document.createElement("button")
//     button.setAttribute("type", "submit")
//     button.setAttribute("class", "canbutton btn btn-danger rounded-4")
//     button.textContent = "Cancel Timer"

//     form.appendChild(button)

// }












getNotiPerm()
console.log("Front js code is loaded ");

let hr;
let min;
let sec;

const form = document.getElementById('dataForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    hr = parseInt(document.getElementById('hr').value, 10) || 0;
    min = parseInt(document.getElementById('min').value, 10) || 0;
    sec = parseInt(document.getElementById('sec').value, 10) || 0;

    if (hr === 0 && min === 0 && sec === 0) {
        alert(`Please set a time greater than 0 seconds.`);
        return;
    }

    let totalTime = (hr * 3600) + (min * 60) + sec;
    let startTime = null;

    function updateTimer(timestamp) {

        if (!startTime) {
            startTime = timestamp;
        }
        const elapsedTime = timestamp - startTime;
        const remainingTime = Math.max(totalTime - Math.floor(elapsedTime / 1000), 0);

        const remainingHours = Math.floor(remainingTime / 3600);
        const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
        const remainingSeconds = remainingTime % 60;

        document.querySelector(".roh").innerHTML = `${remainingHours} hrs : ${remainingMinutes} min : ${remainingSeconds} s`;

        if (remainingTime > 0)
        {
            requestAnimationFrame(updateTimer);
        } 
        else 
        {
            notifyUser();
            document.getElementById('aud').play();
            alert("Timer completed!");



            const data = {
                hour: hr,
                minute: min,
                seconds: sec
            };

            fetch("/stats", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                }
            });
        }
    }

    document.getElementById("dispform").style.display = "none";
    cancelButton();
    requestAnimationFrame(updateTimer);
});

function cancelButton() {
    const cancelform = document.querySelector(".cancelform");
    const form = document.createElement("form");
    form.setAttribute("action", "/");
    form.setAttribute("method", "get");
    cancelform.appendChild(form);

    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "canbutton btn btn-danger rounded-4");
    button.textContent = "Cancel Timer";

    form.appendChild(button);
}

function getNotiPerm() {
    // if (Notification.permission === "granted") {
    //     return 0;
    // }
    if (Notification.permission === "denied") {
        Notification.requestPermission()
    }

    if (Notification.permission === "default") {
        Notification.requestPermission()
    }
}

function notifyUser() {
    // if (!document.hidden) {
    //     // Tab is visible, no need to notify
    //     return;
    // }

    if (Notification.permission === 'granted') {
        var notification = new Notification('Timer Completed', {
            body: 'Your timer has finished!',

        });

        notification.onclick = function () {
            window.location.href = "/stats";
        };
    }

    if (Notification.permission === 'denied') {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                var notification = new Notification('Timer Completed', {
                    body: 'Your timer has finished!',

                });

                notification.onclick = function () {
                    window.location.href = "/stats";
                };
            }

            if (permission === "default") {
                var notification = new Notification('Timer Completed', {
                    body: 'Your timer has finished!',

                });

                notification.onclick = function () {
                    window.location.href = "/stats";
                }
            }
        });
    }


    if (Notification.permission === "default") {
        var notification = new Notification('Timer Completed', {
            body: 'Your timer has finished!',

        });

        notification.onclick = function () {
            window.location.href = "/stats";
        }

    }
}


