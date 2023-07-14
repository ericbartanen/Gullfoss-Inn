let addEmployeeForm = document.getElementById('addEmployeeForm');

addEmployeeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputFirstName = document.getElementById("first_name");
    let inputLastName = document.getElementById("last_name");
    let inputJobTitle = document.getElementById("job_title");
    let inputHourlyPayRate = document.getElementById("hourly_pay_rate");

    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let jobTitleValue = inputJobTitle.value;
    let hourlyPayRateValue = inputHourlyPayRate.value;

      if (firstNameValue == "" || lastNameValue == "" || jobTitleValue == "" || hourlyPayRateValue == "")
      {
          window.alert("Please enter all fields and resubmit.")
          return false;
      }


    let data = {
        first_name: firstNameValue, 
        last_name: lastNameValue, 
        job_title: jobTitleValue, 
        hourly_pay_rate: hourlyPayRateValue, 
    };

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/addEmployee", true);
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

