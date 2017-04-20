var http = new XMLHttpRequest();
var texto = document.getElementById("input");
var speech = 'poxa';
//teste
var isShow = true;

var iniciar = {
    input: 'comecar_conversar'
}

jsonStringify = JSON.stringify(iniciar);

send(jsonStringify);

// http.onreadystatechange = function() {
//     if (http.readyState == XMLHttpRequest.DONE) {
//         var obj = JSON.parse(http.responseText);
//         speech = "";
//         obj.forEach(function(element) {
//             $(".ms-body").append('<div class="message-feed media"><div class="pull-left"><img src="img/watson.png" alt="" class="img-avatar"></div><div class="media-body"><div class="mf-content">' + element + '</div><small class="mf-date"><i class="fa fa-clock-o"></i> ' + Date() + '</small></div></div>');
//             speech += element + " ";
//         }, this);
//
//         scroll();
//         //para o watson falar pode ser encontrado no textToSpeech
//         sendTextToSpeech(speech);
//         //alert(http.responseText);
//     }
// }

function enviarMensagem() {

    var frase = texto.value;
    if (frase.trim() != '') {

        var json = {
            input: frase
        }

        jsonStringify = JSON.stringify(json);

        console.log(jsonStringify);

        send(jsonStringify);
    } else {
        alert("é nescessario escrever alguma coisa para iniciar uma conversa com o watson")
    }
}

function handle(e) {
    if (e.keyCode === 13) {
        enviarMensagem();

        var audio = document.getElementById('audio');
        var url = '/api/synthesize?voice=pt-BR_IsabelaVoice&text=' + "a google é muito ruim comigo, na bad";
        audio.src = url;
        audio.play();

        http.onreadystatechange = function() {
            if (http.readyState == XMLHttpRequest.DONE) {
                var obj = JSON.parse(http.responseText);
                speech = "";
                obj.forEach(function(element) {
                    $(".ms-body").append('<div class="message-feed media"><div class="pull-left"><img src="img/watson.png" alt="" class="img-avatar"></div><div class="media-body"><div class="mf-content">' + element + '</div><small class="mf-date"><i class="fa fa-clock-o"></i> ' + Date() + '</small></div></div>');
                    speech += element + " ";
                }, this);

                scroll();
                //para o watson falar pode ser encontrado no textToSpeech
                // sendTextToSpeech(speech);
                //alert(http.responseText);
            }
        }


        if (event.preventDefault) event.preventDefault();
        return false; // evita da espaco no input
    }
}

function send(json) {

    http.open('POST', '/api/message', true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(json);

    obj = JSON.parse(json);

    if (obj.input != 'comecar_conversar') {
        $(".ms-body").append('<div class="message-feed right"><div class="pull-right"><img src="img/user.png" alt="" class="img-avatar"></div><div class="media-body"><div class="mf-content">' + obj.input + '</div><small class="mf-date"><i class="fa fa-clock-o"></i> ' + Date() + '</small></div></div>');
        scroll();
        texto.value = '';
    }

}

function button_animation() {
    if (isShow) {
        isShow = false;
        $('#animation').attr('class', 'animated bounceOutRight');
    } else {
        isShow = true;
        $('#animation').attr('class', 'animated bounceInRight');
    }
}
