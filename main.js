song="";

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(800,600);
canvas.center();
video=createCapture(VIDEO);
video.hide();
}

function draw(){
    image(video, 0,0, 800, 600);
}

function play(){
    song.setVolume(1);
    song.play();
    console.log("Song has started playing");
}