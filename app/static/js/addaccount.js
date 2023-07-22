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
  output,
  arrayStatic
) {
  const container_0 = document.createElement("div");
  container_0.classList.add("container-fluid", "row", "justify-content-left");
  container_0.setAttribute("id", `${const3}-${index}`);

  const container_1 = document.createElement("div");
  container_1.classList.add("col-auto", "mb-2");
  container_1.setAttribute("id", `${const1}-${index}`);

  const newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("class", "form-control");
  newInput.setAttribute("placeholder", "Bank Name");
  newInput.setAttribute("aria-label", `${const2}-${index}`);
  newInput.setAttribute("name", `${const2}-${index}`);
  newInput.setAttribute("id", `${const2}-${index}`);
  newInput.setAttribute("required", "");
  container_1.appendChild(newInput);

  const container_3 = document.createElement("div");
  container_3.classList.add("col-auto", "mb-2");
  container_3.setAttribute("id", `${const4}-${index}`);

  const newAmount = document.createElement("input");
  newAmount.setAttribute("type", "number");
  newAmount.setAttribute("step", "0.01");
  newAmount.setAttribute("class", "form-control");
  newAmount.setAttribute("placeholder", "0.00");
  newAmount.setAttribute("aria-label", `${const5}-${index}`);
  newAmount.setAttribute("name", `${const5}-${index}`);
  newAmount.setAttribute("id", `${const5}-${index}`);
  newAmount.setAttribute("required", "");

  container_3.appendChild(newAmount);

  const container_4 = document.createElement("div");
  container_4.classList.add("col-auto");
  container_4.setAttribute("id", `${const6}-${index}`);

  const deleted = document.createElement("button");
  deleted.setAttribute("class", "btn btn-danger delete-input-group");
  deleted.setAttribute("type", "button");
  deleted.setAttribute("name", `${const7}-${index}`);
  deleted.setAttribute("id", `${const7}-${index}`);
  deleted.textContent = "X";
  container_4.appendChild(deleted);

  const hrhr = document.createElement("hr");
  dist.appendChild(container_0);
  container_0.appendChild(hrhr);
  container_0.appendChild(container_1);
  container_0.appendChild(container_3);
  container_0.appendChild(container_4);

  const deleteButton = document.getElementById(`${const7}-${index}`);
  const cont1 = document.getElementById(`${const1}-${index}`);
  const cont2 = document.getElementById(`${const3}-${index}`);
  const cont3 = document.getElementById(`${const4}-${index}`);
  const cont4 = document.getElementById(`${const6}-${index}`);
  const deleteElement = `${const5}-${index}`;

  deleteButton.addEventListener("click", () => {
    cont2.parentNode.removeChild(cont2);
    cont1.parentNode.removeChild(cont1);
    cont3.parentNode.removeChild(cont3);
    cont4.parentNode.removeChild(cont4);

    const indexing = array.indexOf(deleteElement);

    if (indexing !== -1) {
      array.splice(indexing, 1);
    }
    calculus(array, arrayStatic, output);
  });
}

function actualvalue(arrayMod, arrayStatic, output, ii, bool) {
  if (bool) {
    arrayMod.forEach(function (ar) {
      const el = document.getElementById(ar);
      el.addEventListener("input", () => {
        calculus(arrayMod, arrayStatic, output);
      });
    });
  } else {
    arrayStatic.forEach(function (ar) {
      const el = document.getElementById(ar);
      el.addEventListener("input", () => {
        calculus(arrayMod, arrayStatic, output);
      });
    });
  }
}

function calculus(arrayMod, arrayStatic, output) {
  let sum = 0;
  let rest = 0;
  let sumMod = 0;
  let restMod = 0;
  let totalValue = 0;
  for (let i = 0; i < arrayMod.length; i++) {
    sumMod = parseFloat(document.getElementById(arrayMod[i]).value);
    let initialAmount = isNaN(sumMod) ? 0 : sumMod;
    sum += initialAmount;
  }
  for (let i = 0; i < arrayStatic.length; i++) {
    restMod = parseFloat(document.getElementById(arrayStatic[i]).value);
    let restAmount = isNaN(restMod) ? 0 : restMod;
    rest += restAmount;

    totalValue = sum - rest;

    output.textContent = `The rest amount is: ${totalValue.toFixed(2)}`;
  }
}

//-------------------location of the money
const addButtonb = document.getElementById("addLocGroup");
const addButton = document.getElementById("addInputGroup");

const locationAr = ["amountB-0"];
const distributionAr = ["amount-0"];
const output = document.getElementById("output");
let j = 0;
let i = 0;
actualvalue(locationAr, distributionAr, output, i, true);
actualvalue(locationAr, distributionAr, output, i, false);

addButtonb.addEventListener("click", () => {
  j++;
  const newElementb = `amountB-${j}`;
  locationAr.push(newElementb);

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
    locationAr,
    output,
    distributionAr
  );
  actualvalue(locationAr, distributionAr, output, j, true);
});

//-------------------Distribution of the money
addButton.addEventListener("click", () => {
  i++;
  const newElement = `amount-${i}`;
  distributionAr.push(newElement);

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
    distributionAr,
    output,
    locationAr
  );
  actualvalue(locationAr, distributionAr, output, i, false);
});
