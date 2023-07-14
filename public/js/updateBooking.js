// Get the objects we need to modify
let updateBookingForm = document.getElementById('updateBookingForm');

// Modify the objects we need
updateBookingForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputBookingId= document.getElementById("bookingUpdateSelect");
    let inputGuestId = document.getElementById("guestUpdateSelect");
    let inputRoomId= document.getElementById("roomUpdateSelect");
    let inputNumberOfGuests= document.getElementById("numberOfGuests");
    let inputBedType= document.getElementById("bedType");
    let inputCheckInDate= document.getElementById("checkInDate");
    let inputNumberOfNights= document.getElementById("numberOfNights");

    // Get the values from the form fields
    let bookingIdValue = inputBookingId.value;
    let guestIdValue = inputGuestId.value;
    let roomIdValue = inputRoomId.value;
    let numberOfGuestsValue = inputNumberOfGuests.value;
    let bedTypeValue = inputBedType.value;
    let checkInDateValue = inputCheckInDate.value;
    let numberOfNightsValue = inputNumberOfNights.value;

    // values in Guests cannot be NULL
    if (bookingIdValue == "" || guestIdValue == "" || numberOfGuestsValue == "" || roomIdValue == "" || bedTypeValue == "" || checkInDateValue == "" || numberOfNightsValue =="")
    {
        window.alert("Please enter all fields and resubmit.")
        return false;
    }

    // Put our data we want to send in a javascript object
    let data = {
        booking_id: bookingIdValue,
        guest_id: guestIdValue,
        room_id: roomIdValue,
        number_of_guests: numberOfGuestsValue,
        bed_type: bedTypeValue,
        check_in_date: checkInDateValue,
        number_of_nights: numberOfGuestsValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateBooking", true);
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

