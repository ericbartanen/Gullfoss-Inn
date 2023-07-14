function deleteRoomType(room_type_id) {
    
  if (window.confirm("Are you sure you want to delete this Room Type")){
    let link = '/deleteRoomType/';
    let data = {
      room_type_id: room_type_id
    };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function(result) {
      deleteRow(room_type_id);
    }
  })
}
};
  
function deleteRow(room_type_id){
    let table = document.getElementById("roomTypesTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == room_type_id) {
            table.deleteRow(i);
            document.location.reload();
            break;
        }
    }
};