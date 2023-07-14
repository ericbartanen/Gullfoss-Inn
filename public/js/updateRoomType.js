// Get the objects we need to modify
let updateRoomTypeForm = document.getElementById('updateRoomType');

// Modify the objects we need
updateRoomTypeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputRoom = document.getElementById("updateRoomTypeSelect");
    let inputRoomTypeName = document.getElementById("updateRoomTypeName");
    let inputRatePerNight= document.getElementById("updateRatePerNight");

    // Get the values from the form fields
    let roomValue = inputRoom.value;
    let roomTypeValue = inputRoomTypeName.value;
    let ratePerNightValue = inputRatePerNight.value;

    // Put our data we want to send in a javascript object
    let data = {
        room_type_id: roomValue,
        room_type_name: roomTypeValue,
        rate_per_night: ratePerNightValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateRoomType", true);
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



