$(function (){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>"); 
    
    let topicCount = topic.length;

    let millisecsPerDay = 24*60*60*1000;

    for(var x = 0; x < topicCount; x++){
        $("#courseTable").append(
            "<tr>"+
            `<td>${x+1}</td>`+
            `<td>${(new Date(startDate.getTime() + 7 * x * millisecsPerDay)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</td>`+
            `<td>${topic[x]}</td>`+
            "</tr>");
    }
});
