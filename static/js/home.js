$(document).on('click', '.delete-account', function() {
    var accountId = $(this).data('account-id');
    
    // Mostrar un diálogo modal de confirmación
    var confirmed = confirm("¿Está seguro que desea eliminar esta cuenta?");
  
    if (confirmed) {
      // Pedir la contraseña al usuario
      var password = prompt("Ingrese su contraseña:");
  
      // Enviar la solicitud de eliminación de la cuenta al servidor
      $.ajax({
        url: '/eliminar-cuenta/' + accountId,
        method: 'POST',
        data: { password: password },
        success: function(response) {
          alert("La cuenta ha sido eliminada.");
          // Actualizar la página
          location.reload();
        },
        error: function(error) {
          alert("No se pudo eliminar la cuenta. Verifique su contraseña y vuelva a intentarlo.");
        }
      });
    }
  });
  