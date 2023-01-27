Webcam.set({
    width: 350,
    heigth: 300,
    image_format: "png",
    png_quality: 90
});
var camera = document.getElementById("camera");
Webcam.attach("#camera");
var emoção1 = "";
var emoção2 = "";
function capturar(){
    Webcam.snap(function(data_uri){
        document.getElementById("foto").innerHTML = '<img id="imagem" src="'+ data_uri +'" style="width: 350; height: 200";>';
    });
}
console.log("ml5", ml5.version)
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/VOPTmTmj-/model.json", modelLoaded);
function modelLoaded(){
    console.log("modelo carregado");
}
function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previção é" + emoção1;
    speakData2 = "E a segunda previção é" + emoção2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}
function emocão(){
    img = document.getElementById("imagem");
    classifier.classify(img, gotResult);
    speak();
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("previsão1").innerHTML = results[0].label;
        document.getElementById("previsão2").innerHTML = results[1].label;
        emoção1 = results[0].label;
        emoção2 = results[1].label;
        if(emoção1 == "feliz"){
            document.getElementById("emoji1").innerHTML = "&#128522";
        }
        if(emoção1 == "triste"){
            document.getElementById("emoji1").innerHTML = "&#128532";
        }
        if(emoção1 == "irritado"){
            document.getElementById("emoji1").innerHTML = "&#128545";
        }
        if(emoção2 == "feliz"){
            document.getElementById("emoji2").innerHTML = "&#128522";
        }
        if(emoção2 == "triste"){
            document.getElementById("emoji2").innerHTML = "&#128532";
        }
        if(emoção2 == "irritado"){
            document.getElementById("emoji2").innerHTML = "&#128545";
        }
        speak();
    }
}