let addRoomTypeForm = document.getElementById('addRoomTypeForm');

addRoomTypeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputRoomTypeName = document.getElementById("room_type_name");
    let inputRatePerNight = document.getElementById("rate_per_night");

    let roomTypeNameValue = inputRoomTypeName.value;
    let ratePerNightValue = inputRatePerNight.value;

    //   rate per night can't be null
    if (ratePerNightValue == "") {
        window.alert("Please enter all fields and resubmit.")
        return false;
    };

    let data = {
        room_type_name: roomTypeNameValue, 
        rate_per_night: ratePerNightValue,
    }

    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/addRoomType", true);
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

});

