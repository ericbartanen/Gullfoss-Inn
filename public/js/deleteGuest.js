function deleteGuest(guest_id) {
  if (window.confirm("Are you sure you want to delete this Guest")){
        
    let link = '/deleteGuest/'
    let data = {
        guest_id: guest_id
      }

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(guest_id);
          }
    })
  }
};

function deleteRow(guest_id){
    let table = document.getElementById("guestsTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == guest_id) {
            table.deleteRow(i);
            document.location.reload();
            break;
        }
      }
    };
