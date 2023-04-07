$('#currency_type').change(function() {
    var selected_currency = $(this).val();
    $('#currency_symbol').text(selected_currency);
});

const addButton = document.getElementById('addInputGroup');

addButton.addEventListener('click', () => {
   

    // Crear un nuevo conjunto de elementos
    const newInputGroup = document.createElement('div');
    newInputGroup.classList.add('input-group');
    newInputGroup.setAttribute('id', `input-group-${1}`);

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('class', 'form-control');
    newInput.setAttribute('placeholder', 'Insert Name');
    newInput.setAttribute('aria-label', 'Name');
    newInput.setAttribute('name', 'Name');
    newInput.setAttribute('id', `Name-${1}`);

    const newButton = document.createElement('button');
    newButton.setAttribute('class', 'btn btn-danger delete-input-group');
    newButton.setAttribute('type', 'button');
    newButton.textContent = 'X';

    const newInputGroupAppend = document.createElement('div');
    newInputGroupAppend.classList.add('input-group-append');
    newInputGroupAppend.appendChild(newButton);

    newInputGroup.appendChild(newInput);
    newInputGroup.appendChild(newInputGroupAppend);

    // Agregar el nuevo conjunto de elementos al contenedor padre
    distribution.appendChild(newInputGroup);
});

