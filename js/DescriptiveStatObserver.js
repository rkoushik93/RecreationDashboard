//Function used to perform the Arithmetic operations the observer
class DescriptiveStatObserver {
    //constructor for the class
    constructor(dataFrame) {
        this.df = dataFrame;
        this.maximumValue = 0;
        this.mimimumValue = 0;
        this.meanValue = 0;
        this.sumValue = 0;
        this.standardDeviationValue = 0;
    }
    //Function used to perform the operation
    doOperations(xValue,yValue) {
        this.maximumValue=this.df.groupBy(xValue).aggregate(group => group.stat.max(yValue)).toArray();
        this.mimimumValue = this.df.groupBy(xValue).aggregate(group => group.stat.min(yValue)).toArray();
        this.meanValue=this.df.groupBy(xValue).aggregate(group => group.stat.mean(yValue)).toArray();
        this.sumValue=this.df.groupBy(xValue).aggregate(group => group.stat.sum(yValue)).toArray();
        this.standardDeviationValue=this.df.groupBy(xValue).aggregate(group => group.stat.sd(yValue)).toArray();
    }
}
