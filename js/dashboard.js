//This JS consist of the main dashboard functions
var DataFrame = dfjs.DataFrame;
//Creating the arithmetic observers
var descriptiveStatObserver = null;
//chart return value
var returnChart = null;
//Function used to load the dataset
function loadDataset(dataset) {
    //Facade pattern implemented in this function call
    var currentDataset = new DatasetMaker(dataset.value);
    var result = currentDataset.display();
    //Function to getthe result of the current data frame
    result.then(df => createTable(df.toArray(),df.listColumns(),df.unique(df.listColumns()[0]),df));
}
//Function used to create the table
function createTable(data,columns,uniqueRowValues,df) {
    //Getting the table element
    if (document.getElementById('recreation-table') != null) {
        document.getElementById('recreation-table').remove();
    }
    //Getting the check box
    if (document.getElementById('col-filter') != null) {
        document.getElementById('col-filter').remove();
    }
    //Getting the check box
    if (document.getElementById('row-filter') != null) {
        document.getElementById('row-filter').remove();
    }
    //Getting the select box
    if (document.getElementById('x-select') != null) {
        document.getElementById('x-select').remove();
    }
    if (document.getElementById('y-select') != null) {
        document.getElementById('y-select').remove();
    }

    var table = document.createElement('table');
    table.setAttribute("id", "recreation-table");

    var columnCheck = document.createElement('div');
    columnCheck.setAttribute("id", "col-filter");

    var rowCheck = document.createElement('div');
    rowCheck.setAttribute("id", "row-filter");

    var tr = document.createElement('tr');

    var selectXAxis = document.createElement("select");
    var selectYAxis = document.createElement("select");
    selectXAxis.setAttribute("id", "x-select");
    selectXAxis.setAttribute("name", "xSelect");
    selectYAxis.setAttribute("id", "y-select");
    selectYAxis.setAttribute("name", "ySelect");

    var option = document.createElement("option");
    option.value = "default";
    option.text = "Select X Axis Value";
    selectXAxis.add(option, null);

    var option = document.createElement("option");
    option.value = "default";
    option.text = "Select Y Axis Value";
    selectYAxis.add(option, null);

    //Iterating each column for the display of table
    columns.forEach(function (element) {
        //Create for table
        var th = document.createElement('th');
        var node = document.createTextNode(element);
        th.appendChild(node);
        tr.appendChild(th);
        //Create for filter
        var checkBox = document.createElement("INPUT");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("value", element);
        checkBox.setAttribute("name", "mycheckboxes");
        var label = document.createElement('label');
        label.appendChild(document.createTextNode(element));
        columnCheck.appendChild(checkBox);
        columnCheck.appendChild(label);

        //Check if column is a text/numeric field
        //Add X-axis/Y-axis values
        var regxString = /^[A-Za-z]+$/;
        var regxNumber = /^[0-9]+$/;

        if(regxString.test(data[0][columns.indexOf(element)].replace( /\s/g, ""))){
            var option = document.createElement("option");
            option.value = element;
            option.text = element;
            selectXAxis.add(option, null);
        }else if(regxNumber.test(data[0][columns.indexOf(element)].replace( /\s/g, ""))){
            var option = document.createElement("option");
            option.value = element;
            option.text = element;
            selectYAxis.add(option, null);
        }
    });
    //Append column to select box
    document.getElementById('select-xaxis-div').appendChild(selectXAxis);
    document.getElementById('select-yaxis-div').appendChild(selectYAxis);
    //Append column to table
    table.appendChild(tr);
    document.getElementById('column-filter-div').appendChild(columnCheck);
    document.getElementById('column-filter-div').style.display = "block";

    //Iterating each rows for the table
    data.forEach(function (element) {
        var tr = document.createElement('tr');
        for (var i = 0; i < columns.length; i++) {
            //Create for table
            var td = document.createElement('td');
            var node = document.createTextNode(element[i]);
            td.appendChild(node);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    });
    table.style.display = "block";
    document.getElementById('table-div').appendChild(table);

    // Create for filter
    uniqueRowValues.toArray().forEach(function (element) {
        //For filter radio button
        var radioButton = document.createElement("INPUT");
        radioButton.setAttribute("type", "radio");
        radioButton.setAttribute("value", element);
        radioButton.setAttribute("name", "selectRow");
        var label = document.createElement('label');
        label.appendChild(document.createTextNode(element));
        rowCheck.appendChild(radioButton);
        rowCheck.appendChild(label);
    });

    //Make div visible
    document.getElementById('row-filter-div').appendChild(rowCheck);
    document.getElementById('row-filter-div').style.display = "block";
    document.getElementById('row-filter-button-div').style.display = "block";

    //Display the arithmetic operation div
    document.getElementById('arithmetic-operation-div').style.display = "block";
    document.getElementById('select-xaxis-div').style.display = "block";
    document.getElementById('select-yaxis-div').style.display = "block";
    document.getElementById("y-select").disabled = true;

    //Display graph div
    document.getElementById('graph-div').style.display = "block";
    document.getElementById('plot-button-div').style.display = "block";

    //Creating the subject for the observer
    var operation = new SelectConditionSubject();
    //Creating an arithmetic operator for operations
    descriptiveStatObserver = new DescriptiveStatObserver(df);
    //Attaching the observer to the queue
    operation.attach(descriptiveStatObserver);

    //Handeling the on click functions of the filter button
    document.getElementById("row-filter-button").onclick = function () {
        if (document.querySelectorAll('input[name=mycheckboxes]:checked').length > 0) {
            if (document.querySelector('input[name="selectRow"]:checked') == null) {
                //Iterator pattern implemented inside this class
                filterTable(data, columns);
            }
            else {
                var selectedRow = df.filter(row => row.get(columns[0]) == document.querySelector('input[name="selectRow"]:checked').value).toArray();
                //Iterator pattern handled inside this class
                filterTable(selectedRow, columns);
            }
        } else {
            alert("Please select any column to display");
        }
    };

    //Handeling the on click functions of the filter button
    document.querySelector('select[name="xSelect"]').onchange = function () {
        document.getElementById("y-select").disabled = false;
    };

    //Handeling the on click functions of the filter button
    document.querySelector('select[name="ySelect"]').onchange = function () {
        //Checking for default
        if((document.getElementById("x-select").value != "default")&&(document.getElementById("y-select").value != "default")) {
            //sending notification to the observer
            operation.notify(document.getElementById("x-select").value,document.getElementById("y-select").value);
        }
    };
}

//Handeling the on click functions of the filter button
document.getElementById("plot-button").onclick = function () {
    //Checking for default
    if((document.getElementById("x-select").value != "default")&&(document.getElementById("y-select").value != "default")){
        //Factory method is initialized
        var factoryMethodClass = new ChartFactory(descriptiveStatObserver);
        //Singleton pattern initialized
        var singletonInstance = factoryMethodClass.getInstance(factoryMethodClass);
        //Function to check for the existing of chart to destroy it
        if(returnChart != null){
            returnChart.destroy();
        }
        //Function used to create the chart with singleton instant
        returnChart = singletonInstance.createChart();
    }
    else{
        alert("Please select the X-Axis and Y-Axis values");
    }
};
