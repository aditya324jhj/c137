
var synth = window.speechSynthesis;
objects = [];
status = "";


function setup() {
  canvas = createCanvas(350, 350);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(350,350);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  oname = document.getElementById("name").value;
}


function draw() {
    image(video, 0, 0, 350, 350);}



   
function gotResult(error, results) {
  if (error) {
      console.log(error);
  }
  console.log(results);
  objects = results;

}






function draw() {
  image(video, 0, 0, 480, 380);
  if (status == "true") {
      objectDetector.detect(video, gotResult);

      for (i = 0; i < objects.length; i++) {
        
adi=objects[i].label;
document.getElementById("status").innerHTML = "Status : Objects Detected";
console.log(adi); 
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + " % " , objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);




//if condition
          if (adi == oname) {
            voices = synth.getVoices();
            video.stop();
            objectDetector.detect(gotResult);
            console.log("done");
            document.getElementById("object_status").innerHTML = oname + " found";
            var utterThis = new SpeechSynthesisUtterance(oname + " found");
            synth.speak(utterThis);
          } else {
            document.getElementById("object_status").innerHTML = oname + " not found";
          }





      }



  }

}







