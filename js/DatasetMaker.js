//This JS implements the Facade design pattern
class DatasetMaker {
    constructor(name) {
        this.name = name;
    }
    //Function used to display the dataset
    display() {
        var result = null;
        if (this.name == "Cricket.csv") {
            var cricket = new Cricket();
            result = cricket.get(this.name);
        } else if (this.name == "EPL.csv") {
            var epl = new EPL();
            result = epl.get(this.name);
        } else if (this.name == "Movie.csv") {
            result = new Movie().get(this.name);
        }else if (this.name == "Riding.csv") {
            result = new Riding().get(this.name);
        }else if (this.name == "NBA.csv") {
            result = new NBA().get(this.name);
        }
        return result;
    }
}

class Cricket{
    //Function used to get the dataset
    get(name) {
        var dataframe = DataFrame.fromCSV(name);
        return dataframe;
    }
}

class EPL{
    //Function used to get the dataset
    get(name) {
        var dataframe = DataFrame.fromCSV(name);
        return dataframe;
    }
}

class Movie{
    //Function used to get the dataset
    get(name) {
        var dataframe = DataFrame.fromCSV(name);
        return dataframe;
    }
}

class Riding{
    //Function used to get the dataset
    get(name) {
        var dataframe = DataFrame.fromCSV(name);
        return dataframe;
    }
}

class NBA {
    //Function used to get the dataset
    get(name) {
        var dataframe = DataFrame.fromCSV(name);
        return dataframe;
    }
}