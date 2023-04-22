$("#currency_type").change(function () {
  var selected_currency = $(this).val();
  $("#currency_symbol").text(selected_currency);
});

//--------------------Function to create fields---------------------
function createField(
  const1,
  const2,
  const3,
  const4,
  const5,
  const6,
  const7,
  index,
  dist,
  array,
  out,
  outputing
) {
  const container_1 = document.createElement("div");
  container_1.classList.add("col-4");
  container_1.setAttribute("id", `${const1}-${index}`);

  const newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("class", "form-control");
  newInput.setAttribute("placeholder", "Input");
  newInput.setAttribute("aria-label", `${const2}-${index}`);
  newInput.setAttribute("name", `${const2}-${index}`);
  newInput.setAttribute("id", `${const2}-${index}`);
  container_1.appendChild(newInput);

  const container_2 = document.createElement("div");
  container_2.classList.add("col-3");
  container_2.setAttribute("id", `${const3}-${index}`);

  const p_1 = document.createElement("p");
  p_1.classList.add("font-weight-bold");
  p_1.textContent = "Amount";
  container_2.appendChild(p_1);

  const container_3 = document.createElement("div");
  container_3.classList.add("col-3");
  container_3.setAttribute("id", `${const4}-${index}`);

  const newAmount = document.createElement("input");
  newAmount.setAttribute("type", "number");
  newAmount.setAttribute("step", "0.01");
  newAmount.setAttribute("class", "form-control");
  newAmount.setAttribute("placeholder", "0.00");
  newAmount.setAttribute("aria-label", `${const5}-${index}`);
  newAmount.setAttribute("name", `${const5}-${index}`);
  newAmount.setAttribute("id", `${const5}-${index}`);

  container_3.appendChild(newAmount);

  const container_4 = document.createElement("div");
  container_4.classList.add("col-2");
  container_4.setAttribute("id", `${const6}-${index}`);

  const deleted = document.createElement("button");
  deleted.setAttribute("class", "btn btn-danger delete-input-group");
  deleted.setAttribute("type", "button");
  deleted.setAttribute("name", `${const7}-${index}`);
  deleted.setAttribute("id", `${const7}-${index}`);
  deleted.textContent = "X";
  container_4.appendChild(deleted);

  dist.appendChild(container_1);
  dist.appendChild(container_2);
  dist.appendChild(container_3);
  dist.appendChild(container_4);

  const deleteButton = document.getElementById(`${const7}-${index}`);
  const cont1 = document.getElementById(`${const1}-${index}`);
  const cont2 = document.getElementById(`${const3}-${index}`);
  const cont3 = document.getElementById(`${const4}-${index}`);
  const cont4 = document.getElementById(`${const6}-${index}`);
  const deleteElement = `${const5}-${index}`;

  deleteButton.addEventListener("click", () => {
    cont1.parentNode.removeChild(cont1);
    cont2.parentNode.removeChild(cont2);
    cont3.parentNode.removeChild(cont3);
    cont4.parentNode.removeChild(cont4);

    const indexing = array.indexOf(deleteElement);

    if (indexing !== -1) {
      array.splice(indexing, 1);
    }
    let restAmount = 0;
    for (let i = 1; i < array.length; i++) {
      ele = parseFloat(document.getElementById(array[i]).value);
      restAmount += isNaN(ele) ? 0 : ele;
    }

    out = parseFloat(initialAmount.value) - parseFloat(restAmount);
    outputing.textContent = `The rest amount is: ${out.toFixed(2)}`;
  });
}
//--------------------Function to set listener events---------------------
function setListener(array, outputing) {
  array.forEach(function (ar) {
    const el = document.getElementById(ar);

    el.addEventListener("input", () => {
      let restAmount = 0;
      for (let i = 1; i < array.length; i++) {
        ele = parseFloat(document.getElementById(array[i]).value);
        restAmount += isNaN(ele) ? 0 : ele;
      }

      valor = parseFloat(initialAmount.value) - parseFloat(restAmount);
      outputing.textContent = `The rest amount is: ${valor.toFixed(2)}`;
    });
  });
}
function actualvalue(array,out,val) {
  
  if ((array.length = 2)) {
    array.forEach(function (element) {
      const el = document.getElementById(element);
  
      el.addEventListener("input", () => {
        let restAmount = parseFloat(document.getElementById(array[1]).value);
        val = isNaN(valor) ? 0 : initialAmount;
        val =
          parseFloat(initialAmount.value) -
          (isNaN(parseFloat(restAmount)) ? 0 : parseFloat(restAmount));
        out.textContent = `The rest amount is: ${val.toFixed(2)}`;
      });
    });
  }}
//----------------------------------------------
const addButton = document.getElementById("addInputGroup");
var i = 0;
const elements = ["amount", "amount-0"];
const output = document.getElementById("output");
const initialAmount = document.getElementById(elements[0]);
var valor = 0;
actualvalue(elements,output,valor)

addButton.addEventListener("click", () => {
  i++;
  const newElement = `amount-${i}`;
  elements.push(newElement);

  createField(
    "cont1",
    "Dist",
    "cont2",
    "cont3",
    "amount",
    "cont4",
    "delete",
    i,
    distribution,
    elements,
    valor,
    output
  );
  setListener(elements, output);
});

//-------------------second part location of the money
const addButtonb = document.getElementById("addLocGroup");
var j = 0;
const elementsb = ["amount", "amountB-0"];
const outputB = document.getElementById("outputB");
const initialAmountb = document.getElementById(elementsb[0]);
var valorb = 0;
actualvalue(elementsb,outputB,valorb)

addButtonb.addEventListener("click", () => {
  j++;

  const newElementb = `amountB-${j}`;
  elementsb.push(newElementb);

  createField(
    "container1",
    "loc",
    "container2",
    "container3",
    "amountB",
    "container4",
    "deletedb",
    j,
    distributionb,
    elementsb,
    valorb,
    outputB
  );

  setListener(elementsb, outputB);
});
