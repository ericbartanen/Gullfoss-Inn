function deleteEmployee(employee_id) {
    if (window.confirm("Are you sure you want to delete this employee?")){
          
      let link = '/deleteEmployee/'
      let data = {
          employee_id: employee_id
        }

      $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
          deleteRow(employee_id);
            }
      })
    }
  };

  function deleteRow(employee_id){
    let table = document.getElementById("employeeTable");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == employee_id) {
            table.deleteRow(i);
            document.location.reload();
            break;
        }
      }
    };