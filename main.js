video="";
objects=[];
status="";
function preload()
{
    video=createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas=createCanvas(400,350);
    canvas.center();
}

function draw()
{
 image(video,0,0,400,350);
 if(status!="")
 {
     objectsDetector.detect(video,gotResults);
     for(i=0;i<objects.length;i++)
     {
        document.getElementById("status").innerHTML="Status = Objects Detecting";
        document.getElementById("number_of_objects").innerHTML= "Number Of Objects Detected = "+objects.length;

        fill("green");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke("blue");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
     }
 }
}

function start()
{
    objectsDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status = Objects Detecting";
}

function modelLoaded()
{
    console.log("model is loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error,results)
{
    if(error)
    {
      console.log(error);
    }
    console.log(results);
    objects=results;
}