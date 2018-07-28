//This JS uses the iterator method class
class FilterIterator{
    constructor(items) {
        this.index = 0;
        this.items = items;
    }
    //used to find the first
    first() {
        this.reset();
        return this.next();
    }
    //used to find the next
    next() {
        return this.items[this.index++];
    }
    //check if has next element
    hasNext() {
        return this.index <= this.items.length;
    }
    //Reset the pointer
    reset() {
        this.index = 0;
    }
    //iterates through the list
    each(callback) {
        for (var item = this.first(); this.hasNext(); item = this.next()) {
            callback(item);
        }
    }
    //length of the list
    length() {
    return this.index;
    }
}
//Function used to iter the data-structure
function filterTable(data,columns) {
    var matchIndexList=[];
    var items = document.querySelectorAll('input[name=mycheckboxes]:checked');
    //Iterator for the selected check boxes
    var columnIter = new FilterIterator(items);
    var rowIter = null;
    //Iterator for the data
    rowIter = new FilterIterator(data);

    //Getting the table element
    if (document.getElementById('recreation-table') != null) {
        document.getElementById('recreation-table').remove();
    }

    var table = document.createElement('table');
    table.setAttribute("id", "recreation-table");
    var tr = document.createElement('tr');
    // using Iterator's each method for checkBoxIter
    columnIter.each(function(item) {
        //Create for table
        var th = document.createElement('th');
        var node = document.createTextNode(item.value);
        th.appendChild(node);
        tr.appendChild(th);
        matchIndexList.push(columns.indexOf(item.value))
    });
    table.appendChild(tr);
    // using Iterator's each method for dataIter
    rowIter.each(function(element) {
        var tr = document.createElement('tr');
        for (var i = 0; i < columnIter.length()-1; i++) {
            //Create for table
            var td = document.createElement('td');
            var node = document.createTextNode(element[matchIndexList[i]]);
            td.appendChild(node);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    });
    table.style.display = "block";
    document.getElementById('table-div').appendChild(table);
}