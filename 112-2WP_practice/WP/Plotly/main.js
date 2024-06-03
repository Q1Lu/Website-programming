let url = "https://raw.githubusercontent.com/ryanchung403/dataset/main/harry_potter.csv"

d3.csv(url).then(function(res){
    drawLineChart(res);
});

function drawLineChart(res){
    console.log(res);



    let years = res.map(d => parseInt(d.release_year));
    let revenue = res.map(d => parseInt(d.revenue));
    let budget = res.map(d => parseInt(d.budget));

    // debug 看有沒有成功抓取資料
    console.log("Release Year:", years);
    console.log("Revenue:", revenue);
    console.log("Budget:", budget);


    let  Revenue={};
    Revenue.mode ="markers+lines";
    Revenue.type ="scatter";
    Revenue.name ="Revenue";
    Revenue.x = years;
    Revenue.y = revenue;

    let Budget={};
    Budget.mode ="markers+lines";
    Budget.type ="scatter";
    Budget.name ="Budget";
    Budget.x =years;
    Budget.y = budget;

    let data =[];
    data.push(Revenue);
    data.push(Budget);

    let layout ={
        margin:{t:0},
        title:'Harry Potter 2001~2011'
    };

    Plotly.newPlot(myGraph, data, layout);
}


let myGraph=document.getElementById('myGraph');
