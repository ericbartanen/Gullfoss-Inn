// Get the objects we need to modify
let updateRoomForm = document.getElementById('updateRoomForm');

// Modify the objects we need
updateRoomForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputRoomId = document.getElementById("roomUpdateSelect");
    let inputRoomNumber= document.getElementById("updateRoomNumber");
    let inputRoomType = document.getElementById("updateRoomType");


    // Get the values from the form fields
    let roomIdValue = inputRoomId.value;
    let roomNumberValue = inputRoomNumber.value;
    let roomTypeIdValue = inputRoomType.value;

    // Put our data we want to send in a javascript object
    let data = {
        room_id: roomIdValue,
        room_number: roomNumberValue,
        room_type_id: roomTypeIdValue,
    }
    console.log(data)

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateRoom", true);
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


