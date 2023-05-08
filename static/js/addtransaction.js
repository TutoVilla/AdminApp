const selector = document.getElementById('accountSelected')
selector.addEventListener('change', () => {
    const id = selector.value
    $.ajax({
        url: '/selectaccount',
        type: 'POST',
        data: {
            csrf_token: $('input[name="csrf_token"]').val(),
            id: parseInt(id),
        },
        success: function(response) {
            const p_1 = document.createElement("p");
            p_1.classList.add("font-weight-bold");
            p_1.textContent = "This Should be Zero: " + response.total;
            const p_2 = document.createElement("p");
            p_2.classList.add("font-weight-bold");
            p_2.textContent = "Last Update" + response.lastupdate;
            actualaccount.innerHTML = "";
            actualaccount.appendChild(p_1);
            actualaccount.appendChild(p_2);
        

            for (var key in response.holders) {
                if (response.holders.hasOwnProperty(key)) {
                  var value = response.holders[key];
                const div1 = document.createElement("div");
                div1.classList.add("card-header"); 
                div1.classList.add("border");
                div1.classList.add("rounded");
                div1.classList.add("p-1");
                div1.classList.add("m-1");
                div1.classList.add("text-center");
                const p1 = document.createElement("p")
                p1.classList.add("mb-0");
                p1.classList.add("col-12");
                p1.textContent = key;
                const p2  = document.createElement("p")
                p2.classList.add("mb-0")
                p2.classList.add("col-12");
                p2.textContent = value;
               
                div1.appendChild(p1);
                div1.appendChild(p2);
                showholders.appendChild(div1);   
                

                        
                        

                  
                  console.log(key + ': ' + value);
                }
              }  
            
            
        },
        
        
        error: function(error) {
            
        }
    });
})
