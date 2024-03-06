$(function(){
    $("input").on("click",function(){
        //alert("Hi");
        var num1 = 0;
            num2 = 0;
            num3 = 0;
        for(var i = 0; i < 1000; i++){
            var numberOfListItem = $("li").length;
            var randomChildNumber = Math.floor(Math.random()*numberOfListItem);
            if(randomChildNumber == 0){
                num1++ ;
            }
            else if (randomChildNumber == 1){
                num2++;
            }
            else{
                num3++;
            }
            if(i == 999){
                
            }
        }

        $("h1").text($("li").eq(randomChildNumber).text());
        $("p1").text("拉麵:"+num1+"次");
        $("p2").text("滷肉飯:"+num2+"次");
        $("p3").text("水餃:"+num3+"次");
    });
});

