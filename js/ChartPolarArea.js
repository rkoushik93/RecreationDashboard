class ChartPolarArea {
    //Constructor for the class
    constructor(observerObject) {
        this.observer = observerObject;
    }

    //Function used to create chart
    createChart() {
        var canvasChart = document.getElementById("chartCanvas");
        Chart.defaults.scale.ticks.beginAtZero = true;
        var xAxisItem = [];
        var yAxisItem = [];
        //Fetching values for X and Y axis
        var currentSelection = document.querySelector('input[name="arithmeticOperation"]:checked').value;
        var selectionArray = this.observer[currentSelection];
        for (var i = 0; i < selectionArray.length; i++) {
            xAxisItem[i] = selectionArray[i][0];
            yAxisItem[i] = selectionArray[i][1];
        }

        var backgroundcolor = [];
        var bordercolor = [];
        for (var i = 0; i < xAxisItem.length; i++) {
            var color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",";
            backgroundcolor.push(color + "0.7)");
            bordercolor.push(color + "1)");
        }

        var mychart = new Chart(canvasChart, {
            type: "polarArea",
            data: {
                labels: xAxisItem,
                datasets: [{
                    label: "Teams",
                    data: yAxisItem,
                    backgroundColor: backgroundcolor,
                    borderColor: bordercolor,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: true
                    //position : 'bottom'
                }
            }
        });
        return mychart;
    }
}