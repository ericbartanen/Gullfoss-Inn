// Get the objects we need to modify
let updateGuestForm = document.getElementById('updateGuest');

// Modify the objects we need
updateGuestForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGuest = document.getElementById("guestSelect");
    let inputFirstName = document.getElementById("update_first_name");
    let inputLastName = document.getElementById("update_last_name");
    let inputEmail = document.getElementById("update_email");
    let inputVip = document.getElementById("update_vip");

    // Get the values from the form fields
    let guestValue = inputGuest.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let vipValue = inputVip.value;

    // values in Guests cannot be NULL
    if (firstNameValue == "" || lastNameValue == "" || emailValue == "")
    {
        window.alert("Please enter all fields and resubmit.")
        return false;
    }

    // Put our data we want to send in a javascript object
    let data = {
        guest_id: guestValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: emailValue,
        vip: vipValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateGuest", true);
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

