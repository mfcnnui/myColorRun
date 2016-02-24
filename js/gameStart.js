/**
 * Created by Administrator on 2014/12/10.
 */
function $(id){
    return document.getElementById(id);
}
//var soundBut = document.getElementById("soundBut");
document.getElementById("soundBut").addEventListener("click",controlAudio,true);
//暂停/继续播放音乐
function controlAudio(){
    var audio = document.getElementById("audio");
    var soundImg = document.getElementById("soundImg");

    if(audio!=null){
        if(!audio.paused){
            audio.pause();
            soundImg.src="img/button/noSound.png";
        }else{
            audio.play();
            soundImg.src="img/button/sound.png";
        }

    }
}
$("startBut").addEventListener("click",ToGameMain,true);
function ToGameMain(){
    window.location.href="main.html";
}