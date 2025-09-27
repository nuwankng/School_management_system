

const setDefault=(elements)=>{
elements.forEach(element => {
    element.style.border = "1px solid #ced4da ";
});


}

//define function for get service request
const getServiceRequest =(url) =>{
    
    let getServiceResponce = [];

    $.ajax({
        url: url,    //the URL to which the request is sent
        type: 'GET',    // the HTTP method to use for the request (GET,post etc) 
        contentType: 'json',
        async: false,
        success: function (response) {
            //code to execute if the request succeeds
            console.log('Success:', response);
            getServiceResponce = response;

        },
        error: function (xhr, status, error) {
            //code to execute if the request fails
            console.log('Error:',url, error);

        }
    });
return getServiceResponce;
}

//define function for POST,PUT,DELETE service request
const getHTTPServiceRequest =(url,method,data) =>{
    
    let getServiceResponce = [];

    $.ajax({
        url: url,    //the URL to which the request is sent
        type: method,    // the HTTP method to use for the request (GET,post etc) 
        contentType: 'application/json',
        data: JSON.stringify(data),
        async: false,
        success: function (response) {
            //code to execute if the request succeeds
            console.log('Success:', response);
            getServiceResponce = response;

        },
        error: function (xhr, status, error) {
            //code to execute if the request fails
            console.log('Error:', error);

        }
    });
return getServiceResponce;
}