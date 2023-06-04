function addClass(element, classes) {
  classes.forEach((cl) => element.classList.add(cl));
}

function createElement(type, classes) {
  const element = document.createElement(type);
  addClass(element, classes);
  return element;
}

function addevent(input, holdersKey, currency) {
  currency = currency;

  input.addEventListener("change", () => {
    let value = 0;
    let array1 = [];
    holdersKey.forEach((element) => {
      el = document.getElementById(element).value;
      ele = parseFloat(el);
      let sum = isNaN(ele) ? 0 : ele;
      value += sum;
      array1.push(ele);
    });
    updateTotal(value, currency);
  });
}

function updateTotal(value, currency) {
  totalFrase = document.getElementById("totalFrase");
  let updatedValue = (total - value).toFixed(2);
  totalFrase.textContent = "This Should be Zero: " + currency + updatedValue;
}

total = 0;
holdersKey = [];
const selector = document.getElementById("accountSelected");
selector.addEventListener("change", () => {
  const id = selector.value;
  $.ajax({
    url: "/selectaccount",
    type: "POST",
    data: {
      csrf_token: $('input[name="csrf_token"]').val(),
      id: parseInt(id),
    },
    success: function (response) {
      descr = response.descriptions;
      holdersKey = [];
      total = response.total;

      const p_1 = document.createElement("p");
      p_1.classList.add("font-weight-bold");
      p_1.setAttribute("id", "totalFrase");
      p_1.textContent = "This Should be Zero: " + response.currency + total;
      const p_2 = document.createElement("p");
      p_2.classList.add("font-weight-bold");
      p_2.textContent = "Last Update " + response.lastupdate;
      actualaccount.innerHTML = "";
      actualaccount.appendChild(p_1);
      actualaccount.appendChild(p_2);

      showholders.innerHTML = "";
      showdetails.innerHTML = "";
      var indexKey = 0;
      for (var key in response.holders) {
        const holder = response.idholders[key];
        if (response.holders.hasOwnProperty(key)) {
          var value = response.holders[key];
          const div1 = createElement("div", [
            "card-header",
            "col-12",
            "border",
            "rounded",
            "p-1",
            "m-1",
            "text-center",
          ]);
          const p1 = createElement("p", ["mb-0", "col-12"]);
          const p2 = createElement("p", ["mb-0", "col-12"]);
          const hr1 = createElement("hr", ["col-12"]);
          const div2 = createElement("div", [
            "card-body",
            "col-12",
            "border",
            "rounded",
            "p-1",
            "row",
          ]);
          div2.setAttribute("id", "body-" + holder);
          const input = document.createElement("input", []);
          input.setAttribute("class", "form-control");
          input.setAttribute("type", "number");
          input.setAttribute("step", "0.01");
          input.setAttribute("value", "0.00");
          input.setAttribute("placeholder", "0.00");
          input.setAttribute("id", holder + "-" + indexKey);
          input.setAttribute("data-key", holder);

          const description = document.createElement("select", []);
          description.setAttribute("class", "form-control");
          description.setAttribute("id", holder + "-desc-" + indexKey);
          for (var i = 0; i < descr.length; i++) {
            var option = document.createElement("option");
            option.setAttribute("value", descr[i][0]);
            option.textContent = descr[i][1];
            description.appendChild(option);
          }

          const textInput = document.createElement("input", []);
          textInput.setAttribute("class", "form-control");
          textInput.setAttribute("type", "text");
          textInput.setAttribute("placeholder", "Description");
          textInput.setAttribute(
            "id",
            "description-" + holder + "-" + indexKey
          );
          const br = document.createElement("br");
          const addfield = createElement("button", [
            "col-6",
            "btn",
            "btn-outline-primary",
            "m-2",
          ]);
          addfield.setAttribute("type", "button");
          addfield.textContent = "Add Transaction";
          addfield.setAttribute("id", holder);
          addfield.setAttribute("data-key", holder);

          addfield.addEventListener("click", () => {
            idbutton = addfield.getAttribute("data-key");
            const input = document.createElement("input", []);
            input.setAttribute("class", "form-control");

            holdersKey.push(idbutton + "-" + indexKey);
            input.setAttribute("type", "number");
            input.setAttribute("step", "0.01");
            input.setAttribute("value", "0.00");
            input.setAttribute("placeholder", "0.00");
            input.setAttribute("id", idbutton + "-" + indexKey);
            input.setAttribute("data-key", idbutton);
            div = document.getElementById("body-" + idbutton);

            const description = document.createElement("select", []);
            description.setAttribute("id", idbutton + "-desc-" + indexKey);
            description.setAttribute("class", "form-control");

            for (var i = 0; i < descr.length; i++) {
              var option = document.createElement("option");
              option.setAttribute("value", descr[i][0]);
              option.textContent = descr[i][1];
              description.appendChild(option);
            }

            const textInput = document.createElement("input", []);
            textInput.setAttribute("class", "form-control");
            textInput.setAttribute("type", "text");
            textInput.setAttribute("placeholder", "Description");
            textInput.setAttribute(
              "id",
              "description-" + idbutton + "-" + indexKey
            );

            const br = document.createElement("br");

            const inputColumn = createElement("div", ["col-4"]);
            const descriptionColumn = createElement("div", ["col-4"]);
            const textInputColumn = createElement("div", ["col-4"]);

            inputColumn.appendChild(input);
            descriptionColumn.appendChild(description);
            textInputColumn.appendChild(textInput);

            div.appendChild(inputColumn);
            div.appendChild(descriptionColumn);
            div.appendChild(textInputColumn);
            div.appendChild(br);
            indexKey++;
            addevent(input, holdersKey, response.currency);
            
          });

          p1.textContent = key;
          p2.textContent = response.currency + value;

          div1.appendChild(p1);
          div1.appendChild(p2);
          div1.appendChild(hr1);

          const inputColumn = createElement("div", ["col-4"]);
          const descriptionColumn = createElement("div", ["col-4"]);
          const textInputColumn = createElement("div", ["col-4"]);

          inputColumn.appendChild(input);
          descriptionColumn.appendChild(description);
          textInputColumn.appendChild(textInput);

          div2.appendChild(inputColumn);
          div2.appendChild(descriptionColumn);
          div2.appendChild(textInputColumn);

          div1.appendChild(div2);
          div1.appendChild(addfield);

          showholders.appendChild(div1);

          holdersKey.push(holder + "-" + indexKey);
          addevent(input, holdersKey, response.currency);
          indexKey++;
        }
      }

      const update = createElement("button", ["btn", "btn-primary"]);
      update.setAttribute("type", "button");
      update.setAttribute("id", "updateButton");
      update.setAttribute("data-key", id);
      update.textContent = "UPDATE";

      update.addEventListener("click", () => {
        var holdersDic = {};

        for (var i = 0; i < holdersKey.length; i++) {
          var key = holdersKey[i].split("-")[0];
          var id = holdersKey[i];
          var slt = key + "-desc-" + i;
          var dsc = "description-" + id;

          var valslt = document.getElementById(slt).value;
          var valdsc = document.getElementById(dsc).value;
          var escapedValue = valdsc.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          var element = document.getElementById(id);

          var val = parseFloat(element.value);
          if (holdersDic[key]) {
            if (Array.isArray(holdersDic[key])) {
              holdersDic[key].push({
                [val.toString()]: [valslt, escapedValue],
              });
            } else {
              holdersDic[key] = [{ [val.toString()]: [valslt, escapedValue] }];
            }
          } else {
            holdersDic[key] = [{ [val.toString()]: [valslt, escapedValue] }];
          }
        }
        $.ajax({
          url: "/addtransaction",
          type: "POST",
          data: {
            csrf_token: $('input[name="csrf_token"]').val(),
            id: update.getAttribute("data-key"),
            holders_Key: JSON.stringify(holdersKey),
            holders_Values: JSON.stringify(holdersDic),
          },
          success: function (response) {
            window.location.href = "/home";
          },
        });
      });
      showholders.appendChild(update);

      //_________---------------______________
      const detailDiv1 = document.createElement("div",[]);
      detailDiv1.setAttribute("class", "card-header border rounded p-1");
 
      const detailList = document.createElement("select", []);
      detailList.setAttribute("id", "-list");
      detailList.setAttribute("class", "from-select col-12 p-2");
      const options = document.createElement("option");
          options.setAttribute("value", '0');
          options.textContent = 'Select to see details';
          detailList.appendChild(options);

      for (const key in response.idholders) {
        if (response.idholders.hasOwnProperty(key)) {
          const option = document.createElement("option");
          option.setAttribute("value", response.idholders[key]);
          option.textContent = key;
          detailList.appendChild(option);
        }
      }

      detailList.addEventListener("change",() =>{
        var holderid = detailList.value
        console.log(holderid);
        $.ajax({
          url: "/getdetails",
          type: "POST",
          data: {
            csrf_token: $('input[name="csrf_token"]').val(),
            holderid: parseInt(holderid),
          },
          success: function (response) {
            console.log(response);
            
          },
          error: function (error) {},

      })
    })
      
      detailDiv1.appendChild(detailList)



      showdetails.appendChild(detailDiv1);

    },

    error: function (error) {},
  });
});
