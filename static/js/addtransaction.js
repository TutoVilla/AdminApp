function addClass(element, classes) {
  classes.forEach((cl) => element.classList.add(cl));
}

function createElement(type, classes) {
  const element = document.createElement(type);
  addClass(element, classes);
  return element;
}



function addevent(input, holdersKey, currency){
  currency = currency;
  input.addEventListener('change', () => {
    let value = 0;
    holdersKey.forEach(element => {
      el = parseFloat(document.getElementById(element).value);
      let sum = isNaN(el) ? 0 : el;
      value += sum;
    });
    console.log(value)
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
      
      for (var key in response.holders) {
        
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
            "m-1",
          ])
          div2.setAttribute('id','body-'+key);
          const input = document.createElement("input");
          const index = 0
          input.setAttribute("type", "number");
          input.setAttribute("step", "0.01");
          input.setAttribute("class", "form-control");
          input.setAttribute("placeholder", "0.00");
          input.setAttribute("id", key + "-"+index);
          input.setAttribute("data-key",key);

          const addfield= createElement("button", ['col-6', 'btn', 'btn-outline-primary', 'm-2']);
          addfield.setAttribute("type", "button");
          addfield.textContent = "Add Transaction"
          addfield.setAttribute('id',key)
          addfield.setAttribute("data-key",key)

          addfield.addEventListener("click", () =>{
            idbutton = addfield.getAttribute("data-key")
            const input = document.createElement("input");
           
            const index = holdersKey.length + 1
            holdersKey.push(idbutton+'-'+index);
            input.setAttribute("type", "number");
            input.setAttribute("step", "0.01");
            input.setAttribute("class", "form-control");
            input.setAttribute("placeholder", "0.00");
            input.setAttribute("id", idbutton+"-"+index)
            div = document.getElementById('body-'+idbutton)
            div.appendChild(input)
            addevent(input,holdersKey,response.currency)        
          })
          
          p1.textContent = key;
          p2.textContent = response.currency + value;

          div1.appendChild(p1);
          div1.appendChild(p2);
          div1.appendChild(hr1);

          div2.appendChild(input);
          div1.appendChild(div2);
          div1.appendChild(addfield);

          showholders.appendChild(div1);

          holdersKey.push(key+'-'+index);
          addevent(input, holdersKey, response.currency)
        }
      }

      const update = createElement('button', ['btn', 'btn-primary'])
      update.setAttribute("type", "button");
      update.setAttribute("id", 'updateButton');
      update.textContent = "UPDATE";
      update.addEventListener("click", () => {
        
        $.ajax({
          url: "/addtransaction",
          type: "POST",
          data: {
            csrf_token: $('input[name="csrf_token"]').val(),
            id: 'hola mundo',
          },
      })
      })
      showholders.appendChild(update)
    },

    error: function (error) {}, 
  });
});
