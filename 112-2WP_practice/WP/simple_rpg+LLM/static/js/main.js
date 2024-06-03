let mapArray,ctx,currentImgMain;
let imgMountain,imgMain,imgEnemy;
//mapArray-決定地圖中每個格子的元素
//ctx-HTML5Canvas用
//imgMountain,imgMain,imgEnemy-障礙物,主角,敵人的圖片物件
const gridLength=100;
//網頁載入完成後初始化動作
$(function(){
    mapArray=[//0-可走,1-障礙,2-終點,3-敵人
    [0,0,1,0,0,0,1,4],
    [1,0,0,0,1,0,0,0],
    [1,1,0,1,1,1,0,1],
    [1,0,0,1,1,1,0,1],
    [1,0,1,1,1,1,0,1],
    [3,0,1,1,1,1,0,2]
    ];
    ctx=$("#myCanvas")[0].getContext("2d");

    //currentImgMainX,currentImgMainY-決定主角所在座標
    //currentImgMain不可以在loadImages後面
    //currentImgMain 變量在 loadImages 函式之外被重新定義了。這將導致在按下按鍵時無法正確更新主角的位置。
    currentImgMain={
        "x":0,
        "y":0
    };
    
    function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
            numImages++;
        }
        for(var src in sources) {
            images[src] = new Image();
            images[src].onload = function() {
                if(++loadedImages >= numImages) {
                    callback(images);
                }
            };
            images[src].src = sources[src];
        }
    }

    var sources = {
        imgMountain: "/static/images/material.png",
        imgMain: "/static/images/spriteSheet.png",
        imgEnemy: "/static/images/Enemy.png",
        imgTomato:"/static/images/material.png"
    };

    loadImages(sources, function(images) {
        //回調函式中使用了 imgMain、imgMountain 和 imgEnemy，但這些變量並未被定義或初始化。這導致圖片無法正確載入並繪製在 canvas 上
        //所以在回調函式中使用 images 物件來訪問和使用載入的圖片。這些圖片將作為回調函式的參數傳遞進去
        imgMain = images.imgMain;
        imgMountain = images.imgMountain;
        imgEnemy = images.imgEnemy;

        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

        for(var x in mapArray){
            for(var y in mapArray[x]){
                if(mapArray[x][y] == 1){
                    ctx.drawImage(imgMountain, 32, 65, 32, 32, y*gridLength, x*gridLength, gridLength, gridLength);
                }else if(mapArray[x][y] == 3){
                    ctx.drawImage(imgEnemy, 7, 40, 104, 135, y*gridLength, x*gridLength, gridLength, gridLength);
                }
                else if(mapArray[x][y] == 4){
                    ctx.drawImage(imgMountain, 64, 65, 32, 32, y*gridLength, x*gridLength, gridLength, gridLength);
                }
            }
        }
    });
});
//處理使用者按下按鍵
$(document).on("keydown",function(event){
    let targetImg,targetBlock,cutImagePositionX;
    //cutImagePositionX-決定主角臉朝向哪個方向
    targetImg={//主角的目標座標
        "x":-1,
        "y":-1
    };
    targetBlock={//主角的目標(對應2維陣列)
        "x":-1,
        "y":-1
    }
    
    event.preventDefault();
    //避免鍵盤預設行為發生，如捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標
    switch(event.code){
        case"ArrowLeft":
            targetImg.x=currentImgMain.x-gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePositionX=175;//臉朝左
            break;
        case"ArrowUp":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y-gridLength;
            cutImagePositionX=355;//臉朝上
            break;
        case"ArrowRight":
            targetImg.x=currentImgMain.x+gridLength;
            targetImg.y=currentImgMain.y;
            cutImagePositionX=540;//臉朝右
            break;
        case"ArrowDown":
            targetImg.x=currentImgMain.x;
            targetImg.y=currentImgMain.y+gridLength;
            cutImagePositionX=0;//臉朝下
            break;
        default://其他按鍵不處理
            return;
    }

    //確認目標位置不會超過地圖
    if(targetImg.x<=700&&targetImg.x>=0&&targetImg.y<=500&&targetImg.y>=0){
        targetBlock.x=targetImg.y/gridLength;
        targetBlock.y=targetImg.x/gridLength;
    }else{
        targetBlock.x=-1;
        targetBlock.y=-1;
    }
    
    //清空主角原本所在的位置
    ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);

    if(targetBlock.x != -1 && targetBlock.y != -1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0://一般道路(可移動)
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1://有障礙物(不可移動)
                $("#talkBox").text("有山");
                break;
            case 2: //終點(可移動)
                $("#talkBox").text("等等喔..."); 
                $.post('/call_llm')
                .done(function(data){
                    console.log(data.message2);
                    $("#talkBox").text(data.message2); //後端傳到data 然後data傳進去talkbox
                });
                //$("#talkBox").text("抵達終點");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 3: //敵人(不可移動)  
                    //改成用大型語言模型
                $("#talkBox").text("機器人思考中..."); 
                $.post('/call_llm')
                .done(function(data){
                    console.log(data.message1);
                    $("#talkBox").text(data.message1); //後端傳到data 然後data傳進去talkbox
                });
                //$("#talkBox").text("哈嘍");  
                break;
            case 4: //番茄(可移動，番茄消失)
                $("#talkBox").text("吃掉番茄");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
        }
    }else{
        $("#talkBox").text("邊界");
    }
    //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

});
