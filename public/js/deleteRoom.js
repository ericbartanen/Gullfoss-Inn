function deleteRoom(room_id) {
    
    if (window.confirm("Are you sure you want to delete this Room")){
      let link = '/deleteRoom/';
      let data = {
        room_id: room_id
      };

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(room_id);
      }
    })
  }
};
  
function deleteRow(room_id){
    let table = document.getElementById("roomsTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == room_id) {
            table.deleteRow(i);
            document.location.reload();
            break;
        }
    }
};