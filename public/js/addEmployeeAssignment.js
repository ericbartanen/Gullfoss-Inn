let addEmployeeAssignmentForm = document.getElementById('addEmployeeAssignmentForm');

addEmployeeAssignmentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputRoomId = document.getElementById("addRoomId");
    let inputEmployeeId = document.getElementById("addEmployeeId");


    let roomIdValue = inputRoomId.value;
    let employeeIdValue = inputEmployeeId.value;


    let data = {
        room_id: roomIdValue, 
        employee_id: employeeIdValue, 
    };

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addEmployeeAssignment", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // addRowToTable(xhttp.response);
            document.location.reload()

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
})





