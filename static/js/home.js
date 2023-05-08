document.addEventListener('DOMContentLoaded', () => {
  const deleteAccounts = document.querySelectorAll(".deleteAccount");
  deleteAccounts.forEach((deleteAccount) => {
    deleteAccount.addEventListener('click',() =>{
      var deleteID = deleteAccount.getAttribute("data-account-id");
      $.get('/to_delete/' + deleteID, function(response) {
        var account = response.objecto;
        var result = window.confirm('Are you sure of delete the account '+ account + '?');
        if (result === true) {
          $.get('/delete_account/' + deleteID, function(response) {
            location.reload();
          })
        } else { 
        }
      });
    });
  });


  const updatelocations = document.querySelectorAll('.updateLocations');
const locss = {};
var idd = 0;
updatelocations.forEach(function (updateLocation) {
    updateLocation.addEventListener('click', function() {
        document.querySelectorAll('input[data-loc-id]').forEach(function(el) {
            const loc = el.getAttribute('data-loc-id');
            const accID = el.getAttribute('account-id')
            const buttonID = updateLocation.getAttribute('account-id-bt')
            const value = el.value;
            if (accID === buttonID) {
              locss[loc] = value;
              idd = buttonID
          }
          
            
        });
        console.log(idd)
        $.ajax({
            url: '/update_account',
            type: 'POST',
            data: {
                csrf_token: $('input[name="csrf_token"]').val(),
                loc_data: JSON.stringify(locss),
                account_id: parseInt(idd)
            },
            success: function(response) {
                console.log(response.message);
                location.reload(); 
            },
            error: function(error) {
                console.log(error.responseText);
            }
        });
    });
});
})
