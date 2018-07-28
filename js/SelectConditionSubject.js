//This JS implements the Observer design pattern
class SelectConditionSubject {
    constructor() {
        this.handlers = [];  // observers
    }
    //Function to attach an observer
    attach(fn) {
        this.handlers.push(fn);
    }
    //Function to detach an observer
    detach(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }
    //Function to notify an observer
    notify(xValue,yValue) {
        this.handlers.forEach(function(item) {
            item.doOperations(xValue,yValue);
        });
    }
}
