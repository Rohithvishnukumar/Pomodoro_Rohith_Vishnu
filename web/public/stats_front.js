// // Define the encoded string
// var encodedString = backendData
// // Create a textarea element to decode HTML entities
// var textarea = document.createElement('textarea');
// textarea.innerHTML = encodedString;

// // Get the decoded string from the textarea element
// var decodedString = textarea.value;

// console.log("This is a decoded string " , decodedString);

// // Parse the JSON string
// var data = JSON.parse(decodedString);

// // Access the decoded JSON data



// const xValues = []
// const yValues = []
// let maxval



// for (let i = 0; i < data.length ; i++) {

//   let temp = data[i].curr_date
//   console.log(temp);
//   temp = temp.substring(0, 10)
//   xValues.push(temp)

//   let temp2 = data[i].time_spent
//   temp2 = temp2 / 3600
//   console.log(temp2 + "---------");
//   maxval = Math.floor( Math.max(...yValues) )

//   yValues.push(temp2)
  
//   if( maxval >= 21){
//     maxval = 24
//   }
//   else{
//     maxval = Math.floor( Math.max(...yValues) )+ 2
//   }
// }


// new Chart("myChart", {
//   type: "line",
//   data: {
//     labels: xValues,
//     datasets: [{
//       fill: false,
//       lineTension: 0,
//       backgroundColor: "rgba(4,230,0)",
//       borderColor: "rgba(0,0,0)",
//       data: yValues
//     }]
//   },
//   options: {
//     legend: { display: false },
//     scales: {
//       yAxes: [{ ticks: { min: 0, max: maxval ,stepSize : 1 } }],
//     }
//   }
// });






// Define the encoded string
var encodedString = backendData;
// Create a textarea element to decode HTML entities
var textarea = document.createElement('textarea');
textarea.innerHTML = encodedString;

// Get the decoded string from the textarea element
var decodedString = textarea.value;

console.log("This is a decoded string ", decodedString);

// Parse the JSON string
var data = JSON.parse(decodedString);

// Access the decoded JSON data
const xValues = [];
const yValues = [];
let maxval;

for (let i = 0; i < data.length; i++) {
  let temp = data[i].date_user;
  console.log(temp);
  temp = temp.substring(0, 10);
  xValues.push(temp);

  let temp2 = data[i].time_user;
  temp2 = temp2 / 3600;
  console.log(temp2 + "---------");
  maxval = Math.floor(Math.max(...yValues));

  yValues.push(temp2);

  if (maxval >= 21) {
    maxval = 24;
  } else {
    maxval = Math.floor(Math.max(...yValues)) + 3;
  }
}

// Set the width of the canvas dynamically
document.getElementById('myChart').style.width = (xValues.length * 50) + 'px'; // Adjust the multiplier as needed

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(4,230,0)",
      borderColor: "rgba(0,0,0)",
      data: yValues
    }]
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [{ 
        ticks: { min: 0, max: maxval, stepSize: 1 },
        gridLines: { display: true } // Optional: Remove grid lines if needed
      }],
      xAxes: [{ 
        ticks: { autoSkip: false },
        gridLines: { display: true } // Optional: Remove grid lines if needed
      }]
    },
    maintainAspectRatio: false // Allow the chart to be stretched
  }
});
