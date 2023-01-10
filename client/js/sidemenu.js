var temperature = document.getElementById("temperature");
var output = document.getElementById("output");
output.innerHTML = temperature.value;

temperature.oninput = function () {
  output.innerHTML = this.value;
};
var list = document.getElementById("model");

const models = [
  "text-davinci-003",
  "code-davinci-002",
  "text-curie-001"
];


for (var i = 0; i < models.length; i++) {
  var option = models[i];
  var el = document.createElement("option");
  el.textContent = option;
  el.value = option;
  list.appendChild(el);
}
