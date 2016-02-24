/**
 * Created by Administrator on 2014/12/10.
 */
function $(id){
    return document.getElementById(id);
}
var interTime;
var num = -300;
var color1 ;//游戏区内容颜色1
var color2 ;//游戏区内容颜色2
var color3 ;//迷幻色
var newDiv = document.getElementsByClassName("newDiv");
var r = 1;//背景圆默认半径;
var score = 0;//分数
var flag1  = false;
var flag2  = false;
var drawBGCTime;//用于背景绘制
var bgColor = "";//控制条颜色
var colorArr = ["red","blue","aqua","fuchsia","gray","yellow","olive"];//既定颜色数组

window.onload = function(){
    addDivAndCanvas();
    createWebDB();
};

$("pauseButImg").addEventListener("click",showPause,true);

//音乐暂停
function controlAudio(){
    var audio = document.getElementById("pauseAudio");
    if(audio!=null){
        if(!audio.paused){
            audio.pause();
        }else{
            audio.play();
        }
    }
}
//点击暂停按钮调用暂停音乐 并且显示暂停界面
function showPause(){
    clearInterval(interTime);
    controlAudio();
    $("suspendDiv").style.display="block";
}
$("goOnBut").addEventListener("click",goOn,true);
//点击继续按钮继续游戏
function goOn(){
    interTime = setInterval(obstaclesMove,10);
    controlAudio();
    $("suspendDiv").style.display="none";
}
//动态添加画布与Div
function addDivAndCanvas(){
    var newDiv = document.createElement("div");//动态创建Div
    var newCanvas = document.createElement("canvas");//动态创建画布
    newCanvas.setAttribute("width","300");//设置画布宽
    newCanvas.setAttribute("height","300");//设置画布高
    newCanvas.setAttribute("id","newCanvasDiv");//给画布添加新id
//    newCanvas.className = "newCanvas";//设置画布背景
    newDiv.className = "newDiv";//设置Div的class属性
    newDiv.setAttribute("id","newDiv");//设置Div的id属性
    $("gameIng").appendChild(newDiv);//将Div添加到游戏区域
    newDiv.appendChild(newCanvas);//将画布添加到Div
    interTime = setInterval(obstaclesMove,10);//循环调用移动方法
    RandomDraw();//调用绘图
    colorCtrl();//创建颜色条
}
//动态创建颜色控制条'

function colorCtrl(){
    if(color1 == color2){
        createTwoCtrlDiv();
    }else{
        createThreeCtrlDiv();
    }
}

//创建两根颜色控制条
function createTwoCtrlDiv(){
    var newCtrlDiv1 = document.createElement("div");
    var newCtrlDiv2 = document.createElement("div");
    newCtrlDiv1.className = "newCtrlDiv1";
    newCtrlDiv2.className = "newCtrlDiv2";

    newCtrlDiv1.setAttribute("id","newCtrlDiv1");
    newCtrlDiv2.setAttribute("id","newCtrlDiv2");

    var colorSet = [0,1];//此数组保存下标
    var colorArr = [color1,color3];
    colorSet.sort(function(){return 0.5-Math.random()});//此方法为打乱数组下标
    newCtrlDiv1.style.backgroundColor=colorArr[colorSet[0]];
    newCtrlDiv2.style.backgroundColor=colorArr[colorSet[1]];


    newCtrlDiv1.addEventListener("click",GameJudge,true);
    newCtrlDiv2.addEventListener("click",GameJudge,true);

    $("mainDiv").appendChild(newCtrlDiv1);
    $("mainDiv").appendChild(newCtrlDiv2);
}
//创建三楼颜色控制条
function createThreeCtrlDiv(){
    var newCtrlDiv1 = document.createElement("div");
    var newCtrlDiv2 = document.createElement("div");
    var newCtrlDiv3 = document.createElement("div");

    newCtrlDiv1.className = "newCtrlDiv3";
    newCtrlDiv2.className = "newCtrlDiv4";
    newCtrlDiv3.className = "newCtrlDiv5";

    newCtrlDiv1.setAttribute("id","newCtrlDiv3");
    newCtrlDiv2.setAttribute("id","newCtrlDiv4");
    newCtrlDiv3.setAttribute("id","newCtrlDiv5");

    var colorSet = [0,1,2];
    var colorArr = [color1,color2,color3];
    colorSet.sort(function(){return 0.5-Math.random()});
    newCtrlDiv1.style.backgroundColor=colorArr[colorSet[0]];
    newCtrlDiv2.style.backgroundColor=colorArr[colorSet[1]];
    newCtrlDiv3.style.backgroundColor=colorArr[colorSet[2]];


    newCtrlDiv1.addEventListener("click",GameJudge,true);
    newCtrlDiv2.addEventListener("click",GameJudge,true);
    newCtrlDiv3.addEventListener("click",GameJudge,true);


    $("mainDiv").appendChild(newCtrlDiv1);
    $("mainDiv").appendChild(newCtrlDiv2);
    $("mainDiv").appendChild(newCtrlDiv3);
}
//游戏判断

function GameJudge(){
    clearInterval(drawBGCTime);
    bgColor = this.style.backgroundColor;//获得当前对面的背景色
    if(color1 == color2){//一种颜色的情况

        if(bgColor == color1){
            drawBGCTime = setInterval(drawBGC,5);
            $("gameIng").removeChild($("newDiv"));
            score+=1000;
            clearInterval(interTime);

            $("mainDiv").removeChild($("newCtrlDiv1"));//删除控制条
            $("mainDiv").removeChild($("newCtrlDiv2"));//删除控制条
//            setTimeout(addDivAndCanvas,1000);
            addDivAndCanvas();

            num = -300;
        }else{
            $("gameOverDiv").style.display="block";
            if(color1 == color2){
                $("newCtrlDiv1").removeEventListener("click",GameJudge,true);
                $("newCtrlDiv2").removeEventListener("click",GameJudge,true);
            }else{
                $("newCtrlDiv3").removeEventListener("click",GameJudge,true);
                $("newCtrlDiv4").removeEventListener("click",GameJudge,true);
                $("newCtrlDiv5").removeEventListener("click",GameJudge,true);
            }
            clearInterval(interTime);
            num = -300;
        }

    }else{//两种颜色的情况
        if(bgColor == color1){
            flag1 = true;
            drawBGCTime = setInterval(drawBGC,5);
        }else if(bgColor == color2){
            drawBGCTime = setInterval(drawBGC,5);
            flag2 = true;
        }else{
            $("gameOverDiv").style.display="block";
            flag1 = false;
            flag2 = false;
            if(color1 == color2){
                $("newCtrlDiv1").removeEventListener("click",GameJudge,true);
                $("newCtrlDiv2").removeEventListener("click",GameJudge,true);
            }else{
                $("newCtrlDiv3").removeEventListener("click",GameJudge,true);
                $("newCtrlDiv4").removeEventListener("click",GameJudge,true);
                $("newCtrlDiv5").removeEventListener("click",GameJudge,true);
            }
            clearInterval(interTime);
            num = -300;
        }
    }
        if(flag1&&flag2){

            $("gameIng").removeChild($("newDiv"));
            score+=10;
            clearInterval(interTime);

            $("mainDiv").removeChild($("newCtrlDiv3"));
            $("mainDiv").removeChild($("newCtrlDiv4"));
            $("mainDiv").removeChild($("newCtrlDiv5"));

            addDivAndCanvas();
            num = -300;
            flag1 = false;
            flag2 = false;
        }

}

//障碍物移动
function obstaclesMove(){
    num+=1;
    score+=10;
    if(score>10000){
        clearInterval(interTime);
        interTime = setInterval(obstaclesMove,5);
    }
    if(score>20000){
        clearInterval(interTime);
        interTime = setInterval(obstaclesMove,1);
    }
    if(score>30000){
        clearInterval(interTime);
        interTime = setInterval(obstaclesMove,1);
        num+=1;
    }


    $("score").innerText=score;

    newDiv[0].style.marginRight = num+"px";
    if(num >= 578){
        $("gameOverDiv").style.display="block";

        clearInterval(interTime);
        $("goOnBut").removeEventListener("click",goOn,true);
        //移除控制条点击事件
        if(color1 == color2){
            $("newCtrlDiv1").removeEventListener("click",GameJudge,true);
            $("newCtrlDiv2").removeEventListener("click",GameJudge,true);
        }else{
            $("newCtrlDiv3").removeEventListener("click",GameJudge,true);
            $("newCtrlDiv4").removeEventListener("click",GameJudge,true);
            $("newCtrlDiv5").removeEventListener("click",GameJudge,true);
        }



    }
}

//随机产生颜色
function getColor(){
    return colorArr[random(0,colorArr.length)];
}

/**
 * 产生区间随机数
 * @param min 随机数起始值
 * @param max 随机数结束值 (包前不包后)
 * @returns {number}
 */
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

//游戏结束后点击重新开始按钮隐藏gameOver界面
$("overReset").addEventListener("click",hiddenGameOver,true);
function hiddenGameOver(){
    $("gameOverDiv").style.display="none";

}


//绘制不同的图片
function RandomDraw(){
    var num = random(1,5);

    switch (num){
        case 1:
            DrawRobot();
            break;
        case 2:
            drawTaiChi();
            break;
        case 3:
            drawCross();
            break;
        case 4:
            drawTV();
            break;
    }
}
//画机器人

function DrawRobot(){

    getDiverseColor();

    var ctx = $("newCanvasDiv").getContext("2d");
    //画身体
    ctx.fillStyle = color1;
    ctx.fillRect(80,110,140,100);
    //画头
    ctx.fillStyle = color2;
    ctx.beginPath();
    ctx.arc(150,100,70,0,Math.PI,true);
    ctx.closePath();
    ctx.fill();
    //左画手臂
    ctx.fillStyle = color1;
    ctx.fillRect(50,120,20,80);

    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.arc(60,120,10,0,Math.PI,true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.arc(60,200,10,0,Math.PI,false);
    ctx.closePath();
    ctx.fill();
    //画右手臂

    ctx.fillStyle = color1;
    ctx.fillRect(230,120,20,80);

    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.arc(240,120,10,0,Math.PI,true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.arc(240,200,10,0,Math.PI,false);
    ctx.closePath();
    ctx.fill();

    //画左脚
    ctx.fillStyle = color2;
    ctx.fillRect(90,210,40,60);


    ctx.fillStyle = color2;
    ctx.beginPath();
    ctx.arc(110,270,20,0,Math.PI,false);
    ctx.closePath();
    ctx.fill();

    //画右脚

    ctx.fillStyle = color2;
    ctx.fillRect(170,210,40,60);


    ctx.fillStyle = color2;
    ctx.beginPath();
    ctx.arc(190,270,20,0,Math.PI,false);
    ctx.closePath();
    ctx.fill();

    //画左眼睛

    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.arc(120,70,8,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();

    //画右眼睛

    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.arc(180,70,8,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();

    //画左触角
    ctx.fillStyle = color2;
    ctx.rotate(-30*Math.PI/180);
    ctx.fillRect(60,60,10,40);

    //画右触角
    ctx.fillStyle = color2;
    ctx.rotate(55*Math.PI/180);
    ctx.fillRect(200,-70,10,40);
}
//画太极
function drawTaiChi(){
    getDiverseColor();
    var ctx = $("newCanvasDiv").getContext("2d");

    ctx.fillStyle=color1;
    ctx.beginPath();
    ctx.arc(50,150,50,Math.PI,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle=color2;
    ctx.beginPath();
    ctx.arc(50,150,50,Math.PI,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle=color2;
    ctx.beginPath();
    ctx.arc(25,150,25,Math.PI,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle=color1;
    ctx.beginPath();
    ctx.arc(75,150,25,Math.PI,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle=color1;
    ctx.beginPath();
    ctx.arc(25,150,10,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle=color2;
    ctx.beginPath();
    ctx.arc(75,150,10,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}
//画十字
function drawCross(){
    getDiverseColor();
    var mxt = $("newCanvasDiv").getContext("2d");

    mxt.fillStyle=color1;
    mxt.beginPath();
    mxt.arc(65,150,60,0,Math.PI*2,true);
    mxt.closePath();
    mxt.fill();

    mxt.fillStyle=color2;
    mxt.beginPath();
    mxt.fillRect(55,115,20,70);
    mxt.closePath();
    mxt.fill();

    mxt.fillStyle=color2;
    mxt.beginPath();
    mxt.fillRect(30,140,70,20);
    mxt.closePath();
    mxt.fill();
}
//画电视
function drawTV() {
    getDiverseColor();

    var mxt = $("newCanvasDiv").getContext("2d");

    mxt.fillStyle=color1;
    mxt.beginPath();
    mxt.fillRect(10,100,80,90);
    mxt.closePath();
    mxt.fill();

    mxt.fillStyle=color2;
    mxt.beginPath();
    mxt.fillRect(20,110,60,50);
    mxt.closePath();
    mxt.fill();

    mxt.fillStyle=color2;
    mxt.beginPath();
    mxt.arc(25,175,3,0,Math.PI*2,true);
    mxt.closePath();
    mxt.fill();

    mxt.fillStyle=color2;
    mxt.beginPath();
    mxt.arc(35,175,3,0,Math.PI*2,true);
    mxt.closePath();
    mxt.fill();

    mxt.fillStyle=color2;
    mxt.beginPath();
    mxt.arc(75,175,3,0,Math.PI*2,true);
    mxt.closePath();
    mxt.fill();

    mxt.fillStyle=color2;
    mxt.beginPath();
    mxt.fillRect(35,172,40,6);
    mxt.closePath();
    mxt.fill();

    mxt.fillStyle=color2;
    mxt.beginPath();
    mxt.arc(75,195,5,0,Math.PI*2,true);
    mxt.closePath();
    mxt.fill();

    mxt.fillStyle=color2;
    mxt.beginPath();
    mxt.arc(25,195,5,0,Math.PI*2,true);
    mxt.closePath();
    mxt.fill();

    mxt.fillStyle=color2;
    mxt.beginPath();
    mxt.fillRect(25,190,50,10);
    mxt.closePath();
    mxt.fill();
}
//画背景圆

function drawBGC(){
    r+=20;
    var mxt = $("mainCanvas").getContext("2d");
    mxt.clearRect(0,0,1200,650);
    mxt.fillStyle=bgColor;
    mxt.beginPath();
    mxt.arc(280,350,r,0,Math.PI*2,true);
    mxt.closePath();
    mxt.fill();
    if(r>1000){
        clearInterval(drawBGCTime);
        r=1;
    }
}

//获得不同的颜色
function getDiverseColor(){
    do{
        color2 = getColor();
    }while(color2 == bgColor );

    do{
        color1 = getColor();
    }while(color1 == bgColor );

    do{
        color3 = getColor();
    }while(color3==color1||color3==color2||color3==bgColor);
}


//数据存储区
$("goListBut").addEventListener("click",insertInfo,true);
var database;
function createWebDB(){
    database=openDatabase('gameMan','1.0','游戏排行榜',1024*1024,function(){})
    database.transaction(function(fx){
        fx.executeSql("create table if not exists gameManList(name TEXT,score Number)",
            [],
            function(fx,result){},
            function(fs,error){}
        );
    });
    ;
}
//保存游戏者名称

function insertInfo(){
    var score = $("score").innerText;
    var gameManName = $("gameManName").value;

    database.transaction(function(fx){
        fx.executeSql("insert into gameManList(name,score) values(?,?)",
            [gameManName,score],
            function(){alert('执行成功')},
            function(){alert('失败')})
    });
//    database.transaction(function (fx) {
//        fx.executeSql('drop  table  gameManList');
//    });
}