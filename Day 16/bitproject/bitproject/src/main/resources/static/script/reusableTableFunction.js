//Define function for fill data into table(tableBodyId,dataList,propertyList,viewFunctionName,editFunctionName,deleteFunctionName)
const fillDataIntoTable = (tableBodyId, dataList, propertyList, editFunction, deleteFunction, viewFunction, buttonVisibility = true) => {
    tableBodyId.innerHTML = "";
    dataList.forEach((dataOb, index) => {
        let tr = document.createElement("tr");

        let tdIndex = document.createElement("td");
        tdIndex.innerText = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        for (const property of propertyList) {
            let td = document.createElement("td");


            if (property.dataType == "string") {
                td.innerText = dataOb[property.propertyName];
            }
            if (property.dataType == "function") {
                td.innerHTML = property.propertyName(dataOb);
            }
            tr.appendChild(td);
        }



        let tdbuttons = document.createElement("td");


        let buttonEdit = document.createElement("button");
        buttonEdit.className = "btn btn-outline-warning";
        buttonEdit.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
        tdbuttons.appendChild(buttonEdit);
        buttonEdit.onclick = () => {
            console.log("Edit", dataOb);
            editFunction(dataOb, index);

        }


        let buttonDelete = document.createElement("button");
        buttonDelete.className = "btn btn-outline-danger";
        buttonDelete.innerHTML = "<i class='fa fa-trash'></i>";
        tdbuttons.appendChild(buttonDelete);
        buttonDelete.onclick = () => {
            console.log("Delete", dataOb);
            deleteFunction(dataOb, index);

        }

        let buttonView = document.createElement("button");
        buttonView.className = "btn btn-outline-info";
        buttonView.innerHTML = "<i class='fa fa-eye'></i>";
        //tdbuttons.appendChild(buttonView);
        buttonView.onclick = () => {
            console.log("View", dataOb);
            viewFunction(dataOb, index);


        }

        tdbuttons.appendChild(buttonView);
        if (buttonVisibility) {
            tr.appendChild(tdbuttons);
        }

        tableBodyId.appendChild(tr);
    });
}


//Define function for fill data into table(tableBodyId,dataList,propertyList,viewFunctionName,editFunctionName,deleteFunctionName)
const fillDataIntoTableTwo = (tableBodyId, dataList, propertyList, editFunction, deleteFunction, viewFunction, buttonVisibility = true) => {
    tableBodyId.innerHTML = "";
    dataList.forEach((dataOb, index) => {
        let tr = document.createElement("tr");

        let tdIndex = document.createElement("td");
        tdIndex.innerText = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        for (const property of propertyList) {
            let td = document.createElement("td");


            if (property.dataType == "string") {
                td.innerText = dataOb[property.propertyName];
            }
            if (property.dataType == "function") {
                td.innerHTML = property.propertyName(dataOb);
            }
            tr.appendChild(td);
        }



        let tdbuttons = document.createElement("td");

        let div = document.createElement("div");
        div.className = "dropdown";
        tdbuttons.appendChild(div);

        let dropdownButton = document.createElement("button");
        dropdownButton.className = "btn";
        dropdownButton.setAttribute("data-bs-toggle", "dropdown");
        dropdownButton.setAttribute("aria-expanded", "false");
        dropdownButton.innerHTML = " <i class='fa-sharp fa-solid fa-ellipsis-vertical fa-rotate-90 fa-2xl' style='color: #74C0FC;'></i>"

        div.appendChild(dropdownButton);

        let dropdownUl = document.createElement("ul");
        dropdownUl.className = "dropdown-menu";
        div.appendChild(dropdownUl);

        let liEdit = document.createElement("li");
        liEdit.className = "dropdown-item";
        let buttonEdit = document.createElement("button");
        buttonEdit.className = "btn btn-outline-warning";
        buttonEdit.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
        //tdbuttons.appendChild(buttonEdit);
        buttonEdit.onclick = () => {
            console.log("Edit", dataOb);
            editFunction(dataOb, index);

        }
        liEdit.appendChild(buttonEdit);
        dropdownUl.appendChild(liEdit);





        let buttonDelete = document.createElement("button");
        buttonDelete.className = "btn btn-outline-danger";
        buttonDelete.innerHTML = "<i class='fa fa-trash'></i>";
        liEdit.appendChild(buttonDelete);
        buttonDelete.onclick = () => {
            console.log("Delete", dataOb);
            deleteFunction(dataOb, index);

        }

        let buttonView = document.createElement("button");
        buttonView.className = "btn btn-outline-info";
        buttonView.innerHTML = "<i class='fa fa-eye'></i>";
        liEdit.appendChild(buttonView);
        buttonView.onclick = () => {
            console.log("View", dataOb);
            viewFunction(dataOb, index);


        }

        //tdbuttons.appendChild(buttonView);
        if (buttonVisibility) {
            tr.appendChild(tdbuttons);
        }

        tableBodyId.appendChild(tr);
    });
}

//Define function for fill data into table(tableBodyId,dataList,propertyList,viewFunctionName,editFunctionName,deleteFunctionName)
const fillDataIntoTableThree = (tableBodyId, dataList, propertyList,buttonVisibility = true) => {
    tableBodyId.innerHTML = "";
    dataList.forEach((dataOb, index) => {
        let tr = document.createElement("tr");

        let tdIndex = document.createElement("td");
        tdIndex.innerText = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        for (const property of propertyList) {
            let td = document.createElement("td");


            if (property.dataType == "string") {
                td.innerText = dataOb[property.propertyName];
            }
            if (property.dataType == "function") {
                td.innerHTML = property.propertyName(dataOb);
            }
            tr.appendChild(td);
        }



        let tdbuttons = document.createElement("td");


        let button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerHTML="Option";
        button.onclick = () => {
            modifyButton.style.display = "block";
            window['editOb']=dataOb;
            window['editRowIndex']=index;
        }

        

        tdbuttons.appendChild(button);
        if (buttonVisibility) {
            tr.appendChild(tdbuttons);
        }

        tableBodyId.appendChild(tr);
    });
}

//Define function for fill data into table(tableBodyId,dataList,propertyList,viewFunctionName,editFunctionName,deleteFunctionName)
const fillDataIntoTableFour = (tableBodyId, dataList, propertyList,editFunction,buttonVisibility = true) => {
    tableBodyId.innerHTML = "";
    dataList.forEach((dataOb, index) => {
        let tr = document.createElement("tr");

        let tdIndex = document.createElement("td");
        tdIndex.innerText = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        for (const property of propertyList) {
            let td = document.createElement("td");


            if (property.dataType == "string") {
                td.innerText = dataOb[property.propertyName];
            }
            if (property.dataType == "function") {
                td.innerHTML = property.propertyName(dataOb);
            }
            tr.appendChild(td);
        }



        let tdbuttons = document.createElement("td");


        let button = document.createElement("button");
        button.className = "btn btn-primary";
        button.innerHTML="Option";
        button.onclick = () => {
            editFunction(dataOb,index);
            modifyButton.style.display = "block";
            window['editOb']=dataOb;
            window['editRowIndex']=index;
        }

        

        tdbuttons.appendChild(button);
        if (buttonVisibility) {
            tr.appendChild(tdbuttons);
        }

        tableBodyId.appendChild(tr);
    });
}


//define funtion for fill data into select(elementid,displaymessage,dataListname,displaypropertyname)

const fillDataIntoSelect = (parentId, message, dataList, displayProperty) => {
    parentId.innerHTML = "";

    let optionMsgEs = document.createElement("option");
    optionMsgEs.value = "";
    optionMsgEs.selected = "selected";
    optionMsgEs.disabled = "disabled";
    optionMsgEs.innerText = message;
    parentId.appendChild(optionMsgEs);

    dataList.forEach(dataOb => {
        let option = document.createElement("option");
        option.value = JSON.stringify(dataOb);
        option.innerText = dataOb[displayProperty];
        parentId.appendChild(option);

    });

}