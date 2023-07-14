let updateEmployeeForm = document.getElementById('updateEmployeeForm');

updateEmployeeForm.addEventListener("submit", function (e) {
   
    e.preventDefault();

    let inputEmployee = document.getElementById("employeeSelect");
    let inputFirstName = document.getElementById("update_first_name");
    let inputLastName = document.getElementById("update_last_name");
    let inputJobTitle = document.getElementById("update_job_title");
    let inputHourlyPayRate = document.getElementById("update_hourly_pay_rate");


    let employeeValue = inputEmployee.value;
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
        employee_id: employeeValue,
        first_name: firstNameValue, 
        last_name: lastNameValue, 
        job_title: jobTitleValue, 
        hourly_pay_rate: hourlyPayRateValue, 
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/updateEmployee", true);
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


 
