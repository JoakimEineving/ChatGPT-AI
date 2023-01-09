
var temperature = document.getElementById("temperature");
var output = document.getElementById("output");
output.innerHTML = temperature.value;
// console.log(temperature.value) // Display the default temperature value

// Update the current temperature value (each time you drag the temperature
// handle)
temperature.oninput = function() { output.innerHTML = this.value; }

var list = document.getElementById("model");

// Create an array containing all options in the select list
const models = [
  'text-davinci-003', 'code-davinci-002', 'text-davinci-005',
  'text-davinci-006', 'text-davinci-007'
];

// loop through the array and
for (var i = 0; i < models.length; i++) {
  // create a new option element
  var opt = models[i];

  // create a text node to add to the option element (opt)
  var el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;

  // add the option element to the list
  list.appendChild(el);
}