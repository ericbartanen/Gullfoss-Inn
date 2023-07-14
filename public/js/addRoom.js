let addRoomForm = document.getElementById('addRoomForm');

addRoomForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputRoomNumber = document.getElementById("addRoomNumber");
    let inputRoomType = document.getElementById("addRoomType");

    let roomNumberValue = inputRoomNumber.value;
    let roomTypeValue = inputRoomType.value;

    //   room number can't be null
    if (roomNumberValue == "") {
        window.alert("Please enter all fields and resubmit.")
        return false;
    };

    let data = {
        room_number: roomNumberValue, 
        room_type_id: roomTypeValue,
    }

    console.log(data)

    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/addRoom", true);
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

