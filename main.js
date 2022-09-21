song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftwrist=0;
scorerightwrist=0;


function preload(){
    song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(800,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0,0, 800, 500);

    fill("#FF0000");
    stroke("#32CD32");
    if(scoreleftwrist>0.2){
    circle(leftWristX, leftWristY, 40);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML= 'Volume : ' +  volume;
    song.setVolume(volume);
    }
    

    if(scorerightwrist>0.2){

    circle(rightWristX, rightWristY, 40);
    fill("#00FFFF");
    stroke("#32CD32");

    if(rightWristY>0 && rightWristY<=100){
    document.getElementById("speed").innerHTML= 'Speed = 2x';
    song.rate(2);
    }

    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML= 'Speed = 1.5x';
        song.rate(1.5);
        }

    else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML= 'Speed = 1x';
            song.rate(1);
            }

    else if(rightWristY>300 && rightWristY<=400){
                document.getElementById("speed").innerHTML= 'Speed = 0.5x';
                song.rate(0.5);
                }

    else if(rightWristY>400 && rightWristY<=500){
                    document.getElementById("speed").innerHTML= 'Speed = 0.25x';
                    song.rate(0.25);
                    }

}
}

function play(){
    song.setVolume(1);
    song.play();
    console.log("Song has started playing");
    song.rate(1);
}

function modelLoaded()
{
    console.log('Posenet is Initialized');
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);

        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log('Score Left Wrist: ' + scoreleftwrist);

        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log('Score Right Wrist: ' + scorerightwrist);


        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log('Left Wrist X: '+ leftWristX );
        console.log('Left Wrist Y: '+ leftWristY );

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log('Right Wrist X: '+ rightWristX );
        console.log('Right Wrist Y: '+ rightWristY );
        
    }
}