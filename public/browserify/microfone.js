var watsonSpeech = require('watson-speech')

var isLigado = false;
var stream;

function ligarMicrofone(){

if(!isLigado){
  isLigado = true;
  speechToText();
} else {
  isLigado = false;
  stream.stop();
  stream.removeAllListeners();
}

}

function speechToText() {
  fetch('/api/speech-to-text/token')
  .then(function(response) {
      return response.text();
    })
    .then(function(token) {                 // Pass token to Watson Speech-To-Text service
      stream = watsonSpeech.SpeechToText.recognizeMicrophone({
        model: 'pt-BR_BroadbandModel',      // modelo da lingua
        token: token,                       // Authorization token to use this service, configured from /speech/stt-token.js file
        continuous: false,                   // False = automatically stop transcription the first time a pause is detected
        outputElement: '#input',            // CSS selector or DOM Element
        inactivity_timeout: 5,              // Number of seconds to wait before closing input stream
        format: false,                      // Inhibits errors
        keepMicrophone: true
      });

      stream.promise()                                // Once all data has been processed...
          .then(function(data) {

              var dialogue = data.pop();

              console.log(data.length);
              console.log(data.length != 0);

              if (data.length != 0) {

                if (dialogue.results[0].alternatives[0].transcript !== '') {

                  var json = {
                    input: dialogue.results[0].alternatives[0].transcript
                  }

                  jsonStringify = JSON.stringify(json);
                  send(jsonStringify);
                  $('#input').val('');

                  speechToText(); // recursao sao legais

                  //console.log(dialogue.results[0].alternatives[0].transcript);

                } else {
                  console.log('buxo');
                }

              }
          })

          .catch(function(err) {
            console.log('cabou :(');

          });

    });

  }

$('#input-mic').click(ligarMicrofone);
