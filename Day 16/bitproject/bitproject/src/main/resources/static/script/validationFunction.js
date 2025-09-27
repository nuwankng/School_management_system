
const textValidator = (element, dataPattern, object, property) => {
    const elementValue = element.value;
    const regExp = new RegExp(dataPattern);
    const ob = window[object];


    if (elementValue != "") {
        if (regExp.test(elementValue)) {

            element.style.border = "5px solid green";
            ob[property] =(elementValue);
        } else {
            element.style.border = "5px solid red";
            ob[property] = null;
        }
    } else {
        if (element.required) {
            element.style.border = "5px solid red";
            ob[property] = null;
        } else {
            element.style.border = "1px solid #ced4da";
            ob[property] = "";
        }
    }
}

const dateValidator = (element, object, property) => {
    const elementValue = element.value;
    const ob = window[object];


    if (elementValue != "") {
        element.style.border = "5px solid green";
        ob[property] = (elementValue);

    } else {
        element.style.border = "5px solid red";
        ob[property] = null;
    }


}

const selectStaticElementValidator = (element, object, property) => {
    const elementValue = element.value;
    const ob = window[object];

    if (elementValue != "") {
        element.style.border = "5px solid green";
        ob[property] =(elementValue);


    } else {
        element.style.border = "5px solid red";
        ob[property] = null;

    }
}

const selectDynamicElementValidator = (element, object, property) => {
    const elementValue = element.value;
    const ob = window[object];

    if (elementValue != "") {
        element.style.border = "5px solid green";
        ob[property] = JSON.parse(elementValue);

    } else {
        element.style.border = "5px solid red";
        ob[property] = null;
    }
}