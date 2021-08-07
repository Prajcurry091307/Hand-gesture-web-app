Webcam.set({
    width:350,
    height:350,
    image_format:"png",
    png_quality:90
})

var camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">'
    });
}

console.log('ml5 version', ml5.version);

var classifier = ml5.imageClassifier('https://storage.googleapis.com/tm-model/QMkUNCcYi/model.json',modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    var speak_data1 = "The first hand gesture prediction is" + prediction_1;
    var speak_data2 = "The second hand gesture prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check()
{
    var img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result)
{
    if(error)
    {
        console.error(error);
    }else{
        console.log(result);
        document.getElementById("result_gesture_name").innerHTML = result[0].label;
        document.getElementById("result_gesture_name2").innerHTML = result[1].label;
        prediction_1 =  result[0].label;
        prediction_2 =  result[1].label;
        speak();
        
        if(result[0].label=="Victory")
        {
            document.getElementById("update_gesture").innerHTML = "✌";
            
        }
        if(result[0].label=="Best")
        {
            document.getElementById("update_gesture").innerHTML = "👍";
            
        }
        if(result[0].label=="Amazing")
        {
            document.getElementById("update_gesture").innerHTML = "👌";
            
        }
        if(result[1].label=="Victory")
        {
            document.getElementById("update_gesture2").innerHTML = "✌";
            
        }
        if(result[1].label=="Best")
        {
            document.getElementById("update_gesture2").innerHTML = "👍";
            
        }
        if(result[1].label=="Amazing")
        {
            document.getElementById("update_gesture2").innerHTML = "👌";
            
        }
        
    }
}
