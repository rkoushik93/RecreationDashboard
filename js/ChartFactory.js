// Function used to implement the Factory Design pattern
class ChartFactory {
    //Constructor for the class
    constructor(observerObject){
        this.observer=observerObject;
        this.instance=null;
    }

    //Function used to get instance of singleton object
    getInstance(factoryMethodClass){
           if(this.instance == null){
               this.instance = factoryMethodClass.generateGraph();
           }
           return this.instance;
    }
    //Function used to generate graph
    generateGraph() {
        if (document.getElementById("maximum-radio").checked || document.getElementById("minimum-radio").checked || document.getElementById("mean-radio").checked
            || document.getElementById("sum-radio").checked || document.getElementById("standard-deviation-radio").checked) {
            if (document.getElementById("bar-radio").checked) {
                var barChart = new ChartBar(this.observer);
                return barChart;
            }
            else if (document.getElementById("pie-radio").checked) {
                var pieChart = new ChartPie(this.observer);
                return pieChart;
            }
            else if (document.getElementById("doughnut-radio").checked) {
                var doughnutChart = new ChartDoughnut(this.observer);
                return doughnutChart;
            }
            else if (document.getElementById("line-radio").checked) {
                var lineChart = new ChartLine(this.observer);
                return lineChart;
            }
            else if (document.getElementById("stack-radio").checked) {
                var polarChart = new ChartPolarArea(this.observer);
                return polarChart;
            }
            else if (document.getElementById("radar-radio").checked) {
                var radarChart = new ChartRadar(this.observer);
                return radarChart;
            }
            else {
                alert("Please select a chart type");
            }
        }
        else {
            alert("Please select an arithmetic measure - Maximum, Minimum, Mean, Sum, Standard Deviation");
        }
    }
}