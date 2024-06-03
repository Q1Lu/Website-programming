let usd_twd_line = document.getElementById('line-chart2');
let usd_twd_data = JSON.parse(document.getElementById('exchangeData2').innerHTML);

console.log(usd_twd_data);   

let trace2 = {};
trace2.type = "scatter";
trace2.mode = "lines";
trace2.name = "Team B";

trace2.text = [];

trace2.x = [];
trace2.y = [];

for (let i = 0; i < usd_twd_data.length; i++) {    //x,y軸的資料
    trace2.x[i] = usd_twd_data[i].date;
    trace2.y[i] = usd_twd_data[i]['usd-twd'];
}

console.log("trace2.x: ", trace2.x);
console.log("trace2.y: ", trace2.y);

let data2 = [];
data2.push(trace2);

let layout2 = {
    margin: {
        t: 0
    },
    xaxis:{
        showline:true
    },
    yaxis:{
        showline:true
    },
    annotations:[  //用annotations比較好去做調整
        {
            xref:'paper',   
            yref:'paper',
            x:0.5,
            y:0.1,
            text: `USD Exchange ${trace2.x[0]} ~ ${trace2.x.slice(-1)}`,
            showarrow:false,
            xanchor:'center',
            yanchor:'top',
            font:{
                size:15,
                color:'gray'
            }
        }
    ]
};

Plotly.newPlot(usd_twd_line, data2, layout2);