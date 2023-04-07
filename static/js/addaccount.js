$('#currency_type').change(function() {
    var selected_currency = $(this).val();
    $('#currency_symbol').text(selected_currency);
});

const addButton = document.getElementById('addInputGroup');
var i = 0
const elements = ['amount','amount-0'];
addButton.addEventListener('click', () => {
   i++;

    const newElement = `amount-${i}`; 
    elements.push(newElement);

    const container_1 = document.createElement('div');
    container_1.classList.add('col-4')
    container_1.setAttribute('id', `cont1-${i}`);

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('class', 'form-control');
    newInput.setAttribute('placeholder', 'Owner');
    newInput.setAttribute('aria-label', `Dist-${i}`);
    newInput.setAttribute('name', `Dist-${i}`);
    newInput.setAttribute('id', `Dist-${i}`);
    container_1.appendChild(newInput)

    const container_2 = document.createElement('div');
    container_2.classList.add('col-3')
    container_2.setAttribute('id', `cont2-${i}`);

    const p_1 = document.createElement('p');
    p_1.classList.add('font-weight-bold');
    p_1.textContent = "Amount";
    container_2.appendChild(p_1)

    const container_3 = document.createElement('div');
    container_3.classList.add('col-3');
    container_3.setAttribute('id', `cont3-${i}`);

    const newAmount = document.createElement('input');
    newAmount.setAttribute('type', 'number');
    newAmount.setAttribute('step', '0.01');
    newAmount.setAttribute('class', 'form-control');
    newAmount.setAttribute('placeholder', '0.00');
    newAmount.setAttribute('aria-label', `amount-${i}`);
    newAmount.setAttribute('name', `amount-${i}`);
    newAmount.setAttribute('id', `amount-${i}`);

    container_3.appendChild(newAmount);

    const container_4 = document.createElement('div');
    container_4.classList.add('col-2');
    container_4.setAttribute('id', `cont4-${i}`);

    const deleted = document.createElement('button');
    deleted.setAttribute('class', 'btn btn-danger delete-input-group');
    deleted.setAttribute('type', 'button');
    deleted.setAttribute('name', `delete-${i}`);
    deleted.setAttribute('id', `delete-${i}`);
    deleted.textContent = 'X';
    container_4.appendChild(deleted);


    distribution.appendChild(container_1)
    distribution.appendChild(container_2)
    distribution.appendChild(container_3)
    distribution.appendChild(container_4)

    const deleteButton = document.getElementById(`delete-${i}`);
    const cont1 = document.getElementById(`cont1-${i}`);
    const cont2 = document.getElementById(`cont2-${i}`);
    const cont3 = document.getElementById(`cont3-${i}`);
    const cont4 = document.getElementById(`cont4-${i}`);
    const deleteElement = `amount-${i}`; 
    deleteButton.addEventListener('click', () => {
        
        
        cont1.parentNode.removeChild(cont1);
        cont2.parentNode.removeChild(cont2);
        cont3.parentNode.removeChild(cont3);
        cont4.parentNode.removeChild(cont4);
        
        const index = elements.indexOf(deleteElement); 

        if (index !== -1) {
          elements.splice(index, 1);
        }
    }); 
});


    const output = document.getElementById('output');
    const initialAmount = document.getElementById(elements[0])
    const restAmount = document.getElementById(elements[1])
    const valor = initialAmount.value - restAmount.value
     
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

const addButtonb = document.getElementById('addLocGroup');
var j = 0
const elementsb = ['amount','loc-0'];
addButtonb.addEventListener('click', () => {
   j++;

    const newElementb = `loc-${j}`; 
    elementsb.push(newElementb);

    const containerb_1 = document.createElement('div');
    containerb_1.classList.add('col-4')
    containerb_1.setAttribute('id', `contb1-${j}`);

    const newInputb = document.createElement('input');
    newInputb.setAttribute('type', 'text');
    newInputb.setAttribute('class', 'form-control');
    newInputb.setAttribute('placeholder', 'Owner');
    newInputb.setAttribute('aria-label', `loc-${j}`);
    newInputb.setAttribute('name', `loc-${j}`);
    newInputb.setAttribute('id', `loc-${j}`);
    containerb_1.appendChild(newInputb)

    const containerb_2 = document.createElement('div');
    containerb_2.classList.add('col-3')
    containerb_2.setAttribute('id', `contb2-${j}`);

    const p_1b = document.createElement('p');
    p_1b.classList.add('font-weight-bold');
    p_1b.textContent = "Amount";
    containerb_2.appendChild(p_1b)

    const containerb_3 = document.createElement('div');
    containerb_3.classList.add('col-3');
    containerb_3.setAttribute('id', `contb3-${j}`);

    const newAmountb = document.createElement('input');
    newAmountb.setAttribute('type', 'number');
    newAmountb.setAttribute('step', '0.01');
    newAmountb.setAttribute('class', 'form-control');
    newAmountb.setAttribute('placeholder', '0.00');
    newAmountb.setAttribute('aria-label', `amountb-${j}`);
    newAmountb.setAttribute('name', `amountb-${j}`);
    newAmountb.setAttribute('id', `amountb-${j}`);

    containerb_3.appendChild(newAmountb);

    const containerb_4 = document.createElement('div');
    containerb_4.classList.add('col-2');
    containerb_4.setAttribute('id', `contb4-${j}`);

    const deletedb = document.createElement('button');
    deletedb.setAttribute('class', 'btn btn-danger delete-input-group');
    deletedb.setAttribute('type', 'button');
    deletedb.setAttribute('name', `deleteb-${j}`);
    deletedb.setAttribute('id', `deleteb-${j}`);
    deletedb.textContent = 'X';
    containerb_4.appendChild(deletedb);


    distributionb.appendChild(containerb_1)
    distributionb.appendChild(containerb_2)
    distributionb.appendChild(containerb_3)
    distributionb.appendChild(containerb_4)

    const deleteButtonb = document.getElementById(`deleteb-${j}`);
    const contb1 = document.getElementById(`contb1-${j}`);
    const contb2 = document.getElementById(`contb2-${j}`);
    const contb3 = document.getElementById(`contb3-${j}`);
    const contb4 = document.getElementById(`contb4-${j}`);
    const deleteElementb = `amountb-${i}`; 
    deleteButtonb.addEventListener('click', () => {
        
        
        contb1.parentNode.removeChild(contb1);
        contb2.parentNode.removeChild(contb2);
        contb3.parentNode.removeChild(contb3);
        contb4.parentNode.removeChild(contb4);
        
        const index = elementsb.indexOf(deleteElementb); 

        if (index !== -1) {
          elementsb.splice(index, 1);
        }
    }); 
});