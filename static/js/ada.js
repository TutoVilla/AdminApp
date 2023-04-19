if (elements.length == 2){    
    elements.forEach(function(element){
        const el = document.getElementById(element);
    
        el.addEventListener('input', () => {
            const valor = initialAmount.value - restAmount.value
        console.log(valor);
        return valor
        })})}





        if (elements.length == 2){    
            elements.forEach(function(element){
                const el = document.getElementById(element);
            
                el.addEventListener('input', () => {
                    const valor = initialAmount.value - restAmount.value
                console.log(valor);
                output.textContent = `El valor actual del input es: ${valor}`;
            });
        });
        }
        else{
        
            for (let j = 0; j < elements.length; j++){
                element = document.getElementById('')
                valor = valor - element.value
            }
        }


        function setListener(array,inicial,indexingb,ii){
            const second = document.getElementById(array[ii])
              second.addEventListener("input", () => {
                  var sum = 0;
                  for (let d = 1; d < array.length; d++) {
                    const amountRest = document.getElementById(indexingb + d).value;
                    let amount = amountRest != undefined ? amountRest : 0;
                    sum += amount;
                    console.log(sum)
                  }
                  const valueToRest = inicial.value - sum;
                  console.log(valueToRest)
                  return valueToRest
              })
          }


          //-----------


          if (elements.length = 2){

            elements.forEach(function(element){
                const el = document.getElementById(element);
            
                el.addEventListener('input', () => {
                  var restAmount = (document.getElementById(elements[1])).value
                  var valor = initialAmount
                  valor = initialAmount.value - restAmount
                  output.textContent = `El valor actual del input es: ${valor}`
                })
              })
            }
          
            else{
              elements.forEach(function(element){
                const el = document.getElementById(element);
                var valor = initialAmount
                var restAmount =1000
                  valor = initialAmount.value - restAmount
                  output.textContent = `El valor actual del input es: ${valor}`
                el.addEventListener('input', () => {
            }
          )})
            }