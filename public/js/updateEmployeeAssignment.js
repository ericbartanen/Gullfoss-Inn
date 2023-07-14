// Get the objects we need to modify
let updateEmployeeAssignmentForm = document.getElementById('updateEmployeeAssignmentForm');

// Modify the objects we need
updateEmployeeAssignmentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputAssignmentId = document.getElementById("updateAssignmentId");
    let inputRoomId = document.getElementById("updateRoomId");
    let inputEmployeeId= document.getElementById("updateEmployeeId");


    // Get the values from the form fields
    let inputAssignmentValue = inputAssignmentId.value;
    let roomIdValue = inputRoomId.value;
    let employeeIdValue = inputEmployeeId.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        employee_room_id: inputAssignmentValue,
        room_id: roomIdValue,
        employee_id: employeeIdValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateEmployeeAssignment", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            document.location.reload()

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

