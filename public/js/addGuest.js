let addBookingForm = document.getElementById('addGuestForm');

addBookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputFirstName = document.getElementById("first_name");
    let inputLastName = document.getElementById("last_name");
    let inputEmail = document.getElementById("email");
    let inputVip = document.getElementById("vip");


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

    let data = {
        first_name: firstNameValue, 
        last_name: lastNameValue, 
        email: emailValue, 
        vip: vipValue, 
    };

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addGuest", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            window.location.reload()

        }

        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
})
