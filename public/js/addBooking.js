let addBookingForm = document.getElementById('addBookingForm');

addBookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputNumberOfGuests = document.getElementById("number_of_guests");
    let inputBedType = document.getElementById("bed_type");
    let inputCheckInDate = document.getElementById("check_in_date");
    let inputNumberOfNights = document.getElementById("number_of_nights");
    let inputGuestId = document.getElementById("guestBookingSelect");
    let inputRoomId = document.getElementById("roomBookingSelect");

    let numberOfGuestsValue = inputNumberOfGuests.value;
    let bedTypeValue = inputBedType.value;
    let checkInDateValue = inputCheckInDate.valueAsDate;
    let numberOfNightsValue = inputNumberOfNights.value;
    let guestIdValue = inputGuestId.value;
    let roomIdValue = inputRoomId.value;

    let data = {
        number_of_guests: numberOfGuestsValue, 
        bed_type: bedTypeValue, 
        check_in_date: checkInDateValue, 
        number_of_nights: numberOfNightsValue, 
        guest_id: guestIdValue, 
        room_id: roomIdValue
    };

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addBooking", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            document.location.reload()

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
})
