function deleteBooking(booking_id) {

  if (window.confirm("Are you sure you want to delete this Booking")){
    let link = '/deleteBooking/';
    let data = {
      booking_id: booking_id
    };

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(booking_id);
      }
    });
  }
};
  
function deleteRow(booking_id){
    let table = document.getElementById("bookings-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == booking_id) {
            table.deleteRow(i);
            document.location.reload();
            break;
        }
    }
};