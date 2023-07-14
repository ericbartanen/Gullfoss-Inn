function deleteEmployeeAssignment(employee_room_id) {
    if (window.confirm("Are you sure you want to delete this employee assignment?")){
          
      let link = '/deleteEmployeeAssignment/'
      let data = {
          employee_room_id: employee_room_id
        }

      $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
          deleteRow(employee_room_id);
            }
      })
    }
  };

  function deleteRow(employee_room_id){
    let table = document.getElementById("employeeAssignmentTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == employee_room_id) {
            table.deleteRow(i);
            document.location.reload();
            break;
        }
      }
    };