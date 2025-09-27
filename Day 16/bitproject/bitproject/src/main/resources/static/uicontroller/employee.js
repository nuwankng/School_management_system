

window.addEventListener("load", () => {
    console.log("browser load event");

    //enable tool tip

    $('[data-bs-toggle="tooltip"]').tooltip();

    refreshEmployeeTable();

    refreshForm();


})

//refresh table Area
const refreshEmployeeTable = () => {

    modifyButton.style.display = "none";

    /*let employees = [{ id: 1, fullname: "Koshila madhuwanthi", callingname: "Koshila", mobileno: "0720987665", nic: "928022786V", gender: "Female", dob: "1992-10-26", civilstatus: "Married", designation_id: { id: 1, name: "Manager" }, employeeStatus_id: { id: 1, status: "Working" } },

    { id: 2, fullname: "Kalpa Sandaruwan", callingname: "Kalpa", mobileno: "0780987665", nic: "962022786V", gender: "Male", dob: "1996-10-26", civilstatus: "Married", designation_id: { id: 1, name: "Manager" }, employeeStatus_id: { id: 1, status: "Resign" } },

    { id: 3, fullname: "Nuwan Buddhika", callingname: "Nuwan", mobileno: "0770987665", nic: "913022786V", gender: "Male", dob: "1991-10-26", civilstatus: "Married", designation_id: { id: 1, name: "Manager" }, employeeStatus_id: { id: 1, status: "Removed" } }
    ];*/

   let employees = [];

    $.ajax({
        url: '/employee/alldata',    //the URL to which the request is sent
        type: 'GET',    // the HTTP method to use for the request (GET,post etc) 
        contentType: 'application/json',
        async: false,
        success: function (response) {
            //code to execute if the request succeeds
            console.log('Success:', response);
            employees = response;

        },
        error: function (xhr, status, error) {
            //code to execute if the request fails
            console.log('Error:', error);

        }
    });

    let propertyList = [
        { propertyName: "fullname", dataType: "string" },
        { propertyName: "nic", dataType: "string" },
        { propertyName: "mobileno", dataType: "string" },
        { propertyName: "dob", dataType: "string" },
        { propertyName: generateBirthYear, dataType: "function" },
        { propertyName: getDesignation, dataType: "function" },
        { propertyName: getEmployeeStatus, dataType: "function" },
    ];



    //call filldataintotable function(tablebodyId,datalist)
    //fillDataIntoTable(tableEmployeeBody, employees, propertyList, employeeFormRefill, employeeDelete, employeeView,);

    //call filldataintotable function(tablebodyId,datalist)
    //fillDataIntoTableThree(tableEmployeeBody, employees, propertyList,);

    //call filldataintotable function(tablebodyId,datalist)
    fillDataIntoTableFour(tableEmployeeBody, employees, propertyList, employeeFormRefill, true);

    $('#tableEmployee').DataTable();

}

const generateBirthYear = (dataOb) => {
    return new Date(dataOb.dob).getFullYear();
}

const getDesignation = (dataOb) => {
    return dataOb.designation_id.name;
}

const getEmployeeStatus = (dataOb) => {
    if (dataOb.employee_status_id.name == "Working") {
        return "<p class='p-2 bg-success fw-bold text-center'>" + dataOb.employee_status_id.name + "</p>";
    }
    if (dataOb.employee_status_id.name == "Resign") {
        return "<p class='p-2 bg-warning fw-bold text-center'>" + dataOb.employee_status_id.name + "</p>";
    }
    if (dataOb.employee_status_id.name == "Removed") {
        return "<p class='p-2 bg-danger fw-bold text-center'>" + dataOb.employee_status_id.name + "</p>";
    }

}

//Function define for refill employee form

const employeeFormRefill = (ob, index) => {
    console.log("Edit", ob, index);

    //tableEmployeeBody.children[index].style.backgroundColor="aqua";

    textFullName.value = ob.fullname;
    textCallingName.value = ob.callingname;

    let fullNameParts = textFullName.value.split(" ");
    fullNameParts.forEach(element => {
        let option = document.createElement("option");
        option.value = element;
        dlCallingname.appendChild(option);
    });

    textNIC.value = ob.nic;

    if (ob.gender == "Male") {
        radioMale.checked = true;
    } else {
        radioFemale.checked = true;
    }
    dteDOB.value = ob.dob;
    textEmail.value = ob.email;
    textMobile.value = ob.mobileno;
    textAdress.value=ob.address;
    selectDesignation.value = JSON.stringify(ob.designation_id)
    selectCivilStatus.value = ob.civil_status;
    selectEmployeeStatus.value = JSON.stringify(ob.employee_status_id)

    if (ob.landno == undefined) {
        textLandNo.value = "";
    } else {
        textLandNo.value = ob.landno;
    }


    if (ob.note == undefined) {
        textNote.value = "";
    } else {
        textNote.value = ob.note;
    }

    employee = JSON.parse(JSON.stringify(ob));
    oldEmployee = JSON.parse(JSON.stringify(ob));

    $("#modalEmployeeForm").modal("show");

}




//Function define for delete employee record
const employeeDelete = (dataOb, index) => {

    let userConfirmMsg = "\n Employee Full name: " + dataOb.fullname +
        "\n Employee NIC :" + dataOb.nic +
        "\n Employee Gender:" + dataOb.gender +
        "\n Employee DOB :" + dataOb.dob +
        "\n Employee Email :" + dataOb.email +
        "\n Employee Mobile No:" + dataOb.mobileno +
        "\n Employee Designation :" + dataOb.designation_id.name +
        "\n Employee Status :" + dataOb.employee_status_id.name;
    swal({
        title: "Are you sure to delete...?",
        text: userConfirmMsg,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((userResponce) => {
            if (userResponce) {

                let deleteResponce = getHTTPServiceRequest("/employee/delete", "DELETE", dataOb);

                if (deleteResponce == "OK") {
                    swal("Delete Successfully", {
                        icon: "success",
                    });
                    refreshEmployeeTable();
                    //window.location.reload();
                    refreshForm();
                    $("#modalEmployeeForm").modal("hide");

                } else {
                    swal("Delete Not Successfully", {
                        icon: "error", text: deleteResponce
                    });
                }




            }
        });


    /* console.log("Delete", dataOb, index);
     //need to get user confirmation
     let userConfirm = window.confirm("Are you sure to delete following employee? " +
         "\n Employee Full name: " + dataOb.fullname +
         "\n Employee NIC :" + dataOb.nic +
         "\n Employee Gender:" + dataOb.gender +
         "\n Employee DOB :" + dataOb.dob +
         "\n Employee Email :" + dataOb.email +
         "\n Employee Mobile No:" + dataOb.mobileno +
         "\n Employee Designation :" + dataOb.designation_id.name +
         "\n Employee Status :" + dataOb.employee_status_id.name
 
     );
 
     if (userConfirm) {
         //call post service
         let deleteResponce = "OK";
         if (deleteResponce == "OK") {
             window.alert("Delete Successfully");
             refreshEmployeeTable();
             //window.location.reload();
             refreshForm();
         }
     } else {
         window.alert("Failed to submit \n" + deleteResponce);
 
     }*/
}



//Function define for view employee record
const employeeView = (ob, index) => {
    console.log("View", ob, index);

    //option 01

    /* let newWindow = window.open();
     let printView = "<head><title>BIT Project 2024:D12 Practical</title><link rel='stylesheet' href='../Resources/bootstrap-5.2.3/css/bootstrap.min.css'></head>"+"<body><table class='table table-hover bg-info w-50'>"+
     "<tr><th>Employee Fullname</th><td>"+ob.fullname+"</td></tr>"+
     "<tr><th>Employee Callingname</th><td>"+ob.callingname+"</td></tr>"+
     "<tr><th>Employee NIC</th><td>"+ob.nic+"</td></tr>"+
     "<tr><th>Employee Designation</th><td>"+ob.designation_id.name+"</td></tr>"+
     +"</table></body>";
     newWindow.document.write(printView);
 
     setTimeout(() => {
         newWindow.stop();
         newWindow.print();
         newWindow.close();
     },1500);*/


    //option 02

    tdEmployeeFullname.innerText = ob.fullname;
    tdEmployeeCallingname.innerText = ob.callingname;
    tdEmployeenic.innerText = ob.nic;
    tdEmployeeDesignation.innerText = ob.designation_id.name;

    $("#modalEmployeeView").modal("show");


}

//Print Function

const buttonPrintRow = () => {
    let newWindow = window.open();
    let printView = "<head><title>BIT Project 2024:D12 Practical</title><link rel='stylesheet' href='../../Resources/bootstrap-5.2.3/css/bootstrap.min.css'></head>" + "<body>" + tableEmployeeView.outerHTML + "</body>";
    newWindow.document.write(printView);

    setTimeout(() => {
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    }, 1500);

}



const checkFormError = () => {
    //need to check all required properties

    let errors = "";

    if (employee.fullname == null) {
        errors = errors + "Please enter valid Full Name.....\n";
    }
    if (employee.callingname == null) {
        errors = errors + "Please enter valid Calling Name.....\n";
    }

    if (employee.nic == null) {
        errors = errors + "Please enter valid Nic.....\n";
    }

    if (employee.gender == null) {
        errors = errors + "Please Select Gender.....\n";
    }

    if (employee.dob == null) {
        errors = errors + "Please Select dob.....\n";
    }

    if (employee.mobileno == null) {
        errors = errors + "Please enter valid Mobile no.....\n";
    }

    if (employee.designation_id == null) {
        errors = errors + "Please Select Designation.....\n";
    }

    if (employee.civil_status == null) {
        errors = errors + "Please Select Civil Status.....\n";
    }

    return errors;

}
//form submit event function
const buttonEmployeeSubmit = () => {
    console.log(employee);

    //Employee form error for required element
    let errors = checkFormError();
    if (errors == "") {
        //errors not exite
        //need to get user confirmation
        let userConfirm = window.confirm("Are you sure to add following employee? " +
            "\n Employee Full name: " + employee.fullname +
            "\n Employee NIC :" + employee.nic +
            "\n Employee Gender:" + employee.gender +
            "\n Employee DOB :" + employee.dob +
            "\n Employee Email :" + employee.email +
            "\n Employee Mobile No:" + employee.mobileno +
            "\n Employee Designation :" + employee.designation_id.name +
            "\n Employee Status :" + employee.employee_status_id.name +
            "\n Employeecivil Status :" + employee.civil_status

        );

        if (userConfirm) {
            //call post service
            let postResponce = getHTTPServiceRequest("/employee/insert", "POST", employee);
            if (postResponce == "OK") {
                window.alert("Save Successfully");
                refreshEmployeeTable();
                //window.location.reload();
                refreshForm();
                $("#modalEmployeeForm").modal("hide");

            }
            else{
                window.alert(postResponce);   
            }
            
        } else {
            window.alert("Failed to submit \n" + postResponce);

        }
    } else {
        window.alert("Form Has following error..\n" + errors);
    }


}

const checkFormUpdate = () => {
    let updates = "";

    if (employee != null && oldEmployee != null) {

        if (employee.fullname != oldEmployee.fullname) {
            updates = updates + "Full Name is Changed..!\n";
        }
        if (employee.nic != oldEmployee.nic) {
            updates = updates + "NIC is Changed..! " + oldEmployee.nic + " into " + employee.nic + "\n";
        }

        if (employee.mobileno != oldEmployee.mobileno) {
            updates = updates + "Mobile No is Changed..!" + oldEmployee.mobileno + " into " + employee.mobileno + "\n";
        }

        if (employee.designation_id.name != oldEmployee.designation_id.name) {
            updates = updates + "Designation is Changed..!" + oldEmployee.designation_id.name + " into " + employee.designation_id.name + "\n";
        }

        if (employee.email != oldEmployee.email) {
            updates = updates + "Email is Changed..!" + oldEmployee.email + " into " + employee.email + "\n";
        }

    }

    return updates;
}

//form update event function
const buttonEmployeeUpdate = () => {

    // need to check form errors
    let errors = checkFormError();

    if (errors == "") {
        //need to check form updates

        let updates = checkFormUpdate();

        if (updates == "") {
            window.alert("nothing to update....\n");
        } else {
            //need to get user confirmation
            let userConfirm = window.confirm("Are you sure to update following changes..\n" + updates);
            if (userConfirm) {
                //call put service
                let putResponse = getHTTPServiceRequest("/employee/update", "PUT", employee);

                if (putResponse == "OK") {
                    window.alert("Update Successfully....");
                    refreshEmployeeTable();
                    refreshForm();
                    $("#modalEmployeeForm").modal("hide");
                } else {
                    window.alert("Failed to Update...." + putResponse);
                }
            }
        }

    } else {

    }
}

textFullName.addEventListener("keyup", () => {

    const fullNameValue = textFullName.value;
    if (fullNameValue != "") {

        if (new RegExp("^([A-Z][a-z]{1,20}[\\s])+([A-Z][a-z]{1,20})$").test(fullNameValue)) {
            //Valid Fullname
            employee.fullname = fullNameValue;
            textFullName.style.border = "5px solid green";

            let fullNameParts = fullNameValue.split(" ");
            dlCallingname.innerHTML = "";

            textCallingName.value = fullNameParts[0];
            textCallingName.style.border = "5px solid green";
            employee.callingname = textCallingName.value;

            fullNameParts.forEach(element => {
                let option = document.createElement("option");
                option.value = element;
                dlCallingname.appendChild(option);
            });


        } else {
            // invalid Fullname
            textFullName.style.border = "5px solid red";
            employee.fullname = null;
        }

    } else {
        // invalid Fullname
        textFullName.style.border = "5px solid red";
        employee.fullname = null;
    }
});

const callingNameValidator = (callingnameElement) => {
    const callingNameValue = callingnameElement.value;
    const fullNameValue = textFullName.value;
    let fullNameParts = fullNameValue.split(" ");

    if (callingNameValue != "") {
        let extIndex = fullNameParts.map(fullNamepart => fullNamepart).indexOf(callingNameValue);
        if (extIndex != -1) {

            //valid callingname
            callingnameElement.style.border = "5px solid green";
            employee.callingname = textCallingName.value;

        } else {
            //invalid callingname
            callingnameElement.style.border = "5px solid red";
            employee.callingname = null;

        }

    } else {
        //invalid callingname
        callingnameElement.style.border = "5px solid red";
        employee.callingname = null;
    }
}

const nicValidator = (nicElement) => {
    const nicValue = nicElement.value;

    if (nicValue != "") {
        if (new RegExp("^(([98765][0-9]{8}[VvXx])|([0-9]{12}))$").test(nicValue)) {

            //valid nic
            nicElement.style.border = "5px solid green";
            employee.nic = nicValue;
        }
        else {

            //invalid nic
            nicElement.style.border = "5px solid red";
            employee.nic = null;
        }
    }
    else {

        //invalid nic
        nicElement.style.border = "5px solid red";
        employee.nic = null;
    }
}

const refreshForm = () => {
    employee = new Object();

    //static element only
    /*textFullName="";
    textCallingName="";
    textNIC="";
    dteDOB="";
    textEmail="";
    selectCivilStatus ="";  */

    FormEmployee.reset();

    setDefault([textFullName, textCallingName, textNIC, dteDOB, textEmail, selectCivilStatus]);

    /*textFullName.style.border = "1px solid #ced4da ";
    textCallingName.style.border = "1px solid #ced4da ";
    textNIC.style.border = "1px solid #ced4da ";
    dteDOB.style.border = "1px solid #ced4da ";
    textEmail.style.border = "1px solid #ced4da";
    selectCivilStatus.style.border = "1px solid #ced4da";*/


    let designations = getServiceRequest('/designation/alldata');

    let employeeStatus = getServiceRequest('/employee_status/alldata');
    


    /*$.ajax({
        url: '/designation/alldata',    //the URL to which the request is sent
        type: 'GET',    // the HTTP method to use for the request (GET,post etc) 
        contentType: 'json',
        async: false,
        success: function (response) {
            //code to execute if the request succeeds
            console.log('Success:', response);
            designation = response;

        },
        error: function (xhr, status, error) {
            //code to execute if the request fails
            console.log('Error:', error);

        }
    });*/

    /* let employeeStatus = [{ id: 1, status: "Working" }, { id: 2, status: "Resign" }, { id: 3, status: "Removed" }];*/

    fillDataIntoSelect(selectDesignation, "Please Select Designation", designations, "name");

    fillDataIntoSelect(selectEmployeeStatus, "Please Select Status", employeeStatus, "name");
}

