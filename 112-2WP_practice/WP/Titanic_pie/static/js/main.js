let myGraph = document.getElementById('myGraph');
let Data = JSON.parse(document.getElementById('Data').innerHTML);
let Survived_data = Data.Survived;
let Sex_data = Data.Sex;
let Embarked_data = Data.Embarked;

console.log(Survived_data);
console.log(Sex_data);
console.log(Embarked_data);

let trace1 = {
    type: "pie",
    title: "Survived vs Not Survived",
    labels: Object.keys(Survived_data),
    values: Object.values(Survived_data),
    domain: { row: 0, column: 0 }
};

let trace2 = {
    type: "pie",
    title: "Male vs Female",
    labels: Object.keys(Sex_data),
    values: Object.values(Sex_data),
    domain: { row: 0, column: 1 }
};

let trace3 = {
    type: "pie",
    title: "Embarked : S/C/Q",
    labels: Object.keys(Embarked_data),
    values: Object.values(Embarked_data),
    domain: { row: 1, column: 0 }
};

let data = [trace1, trace2, trace3];

let layout = {
    margin: { t: 10, l: 0 },
    grid: { rows: 2, columns: 2 }
};

Plotly.newPlot(myGraph, data, layout);
