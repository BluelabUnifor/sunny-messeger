function tarefaSomar(){
    var d = new Date();
    var n = d.getHours();

    console.log("HORA DO GET"+n);

    if(n < 18){
        self.postMessage({tipo:'horarioRetorno',resultado:n.toString()});
    }
    if(n >= 18){
        self.postMessage({tipo:'horarioRetorno',resultado:n.toString()});
    }
    //http://172.18.9.53:3000/luzs/1.json
    //http://172.18.9.53:3000/porta/1.json

    //Servico Termometro
    var xmlhttpterm = new XMLHttpRequest();
    var urlterm = "https://sunnyunifor.mybluemix.net/temperaturas/2.json";


    xmlhttpterm.onreadystatechange = function() {
        if (xmlhttpterm.readyState == 4 && xmlhttpterm.status == 200) {
            var data = JSON.parse(xmlhttpterm.responseText);
                changeImage(data.temperatura);
        }
    };
    xmlhttpterm.open("GET", urlterm, true);
    xmlhttpterm.send();
    //fim

    //Servico Luz
    var xmlhttpluz = new XMLHttpRequest();
    var urlluz = "https://sunnyunifor.mybluemix.net/luzs/2.json";


    xmlhttpluz.onreadystatechange = function() {
        if (xmlhttpluz.readyState == 4 && xmlhttpluz.status == 200) {
            var data = JSON.parse(xmlhttpluz.responseText);
            self.postMessage({tipo:'luzRetorno',resultado:data.state});
            console.log("Luz "+data.state);
        }
    };
    xmlhttpluz.open("GET", urlluz, true);
    xmlhttpluz.send();
    //fim

    //Servico Porta
    var xmlhttpporta = new XMLHttpRequest();
    var urlporta = "https://sunnyunifor.mybluemix.net/porta/2.json";


    xmlhttpporta.onreadystatechange = function() {
        if (xmlhttpporta.readyState == 4 && xmlhttpporta.status == 200) {
            var data = JSON.parse(xmlhttpporta.responseText);
            self.postMessage({tipo:'portaRetorno',resultado:data.state});
            console.log(data.state);
        }
    };
    xmlhttpporta.open("GET", urlporta, true);
    xmlhttpporta.send();
    //fim



}

function changeImage(temperatura){
    if(temperatura <= 10){
                self.postMessage({tipo:'tempRetorno',resultado:temperatura.toString()});
            }
            else if(temperatura <= 20){
                self.postMessage({tipo:'tempRetorno',resultado:temperatura.toString()});
                console.log("ENTROU AQUI");
            }
            else if(temperatura <= 30){
                self.postMessage({tipo:'tempRetorno',resultado:temperatura.toString()});
            }
            else if(temperatura <= 35){
                self.postMessage({tipo:'tempRetorno',resultado:temperatura.toString()});
            }
            else if(temperatura > 50){
                self.postMessage({tipo:'tempRetorno',resultado:temperatura.toString()});
            }
}



self.addEventListener('message',function(mensagem){
      tarefaSomar();
      setInterval(tarefaSomar,2000);



});
