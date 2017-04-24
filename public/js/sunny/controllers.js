angular.module('starter.controllers', [])

.controller('MyCtrl', function($scope, $cordovaSplashscreen) {

        $cordovaSplashscreen.show();

    })
    .controller('InicioCtrl', function($scope, $http, $ionicLoading, $ionicModal) {


        /* $ionicLoading.show({
              template: '<ion-spinner class="spinner-energized"></ion-spinner><br/><span>Carregando Dados...</span>'
            });*/

        //thread horario
        var worker = new Worker('js/sunny/horario.js');

        var mensagem = {
            tipo: 'horario'
        };
        var luz = 0;
        var porta = 0;
        var horario = 0;
        var pessoas = 8;
        var temperatura;
        worker.postMessage(mensagem);
        //Não tiver no servidor
        $("#icon-termo").attr("src", "img/icon-termo-10.png");
        $("#icon-luz").attr("src", "img/icon-luz-aberta-dia.png");
        $("#icon-porta").attr("src", "img/icon-porta-aberta-dia.png");
        //offline


        worker.addEventListener('message', function(mensagem) {
            //Thread retorna horario
            //isPlay setando no textToSpeech
            if (!isPlay) {

                if (mensagem.data.tipo == 'horarioRetorno') {
                    horario = mensagem.data.resultado;
                    $("#pessoas").html(pessoas);
                    if (pessoas == 0) {
                        if (horario < 18) {
                            $("#simbolos").attr("class", "col col-60 padding-simbolo dia-simbolo-dormindo");
                        } else if (horario >= 18) {
                            $("#simbolos").attr("class", "col col-60 padding-simbolo noite-simbolo-dormindo");
                        }

                    } else if (pessoas >= 1) {
                        $("#simbolos").attr("class", "col col-60 padding-simbolo dia-simbolo");
                    }

                    if (mensagem.data.resultado < 18) {
                        $("#fundo").css("background", "#fcf8c5");
                        $("h3").css("color", "#b38b1c");
                        $("#icon-user").attr("src", "img/icon-user-dia.png");
                        isNight = false;

                    } else if (mensagem.data.resultado >= 18) {
                        $("#fundo").css("background", "#344c6a");
                        $("h3").css("color", "#fff");
                        $("#icon-user").attr("src", "img/icon-user-noite.png");
                        isNight = true;

                    }
                }

                if (mensagem.data.tipo == 'tempRetorno') {
                    if (mensagem.data.resultado <= 10) {
                        $("#icon-termo").attr("src", "img/icon-termo-10.png");

                    } else if (mensagem.data.resultado <= 20) {
                        $("#icon-termo").attr("src", "img/icon-termo-20.png");
                        $("#temperatura").html('<span class="fonte-padrao">' + mensagem.data.resultado + '</span><span class="fonte-caracteres-top">° | </span><span class="fonte-padrao">5</span><span class="fonte-caracteres">%</span>');

                    } else if (mensagem.data.resultado <= 30) {
                        $("#icon-termo").attr("src", "img/icon-termo-30.png");
                    } else if (mensagem.data.resultado <= 35) {
                        $("#icon-termo").attr("src", "img/icon-termo-35.png");
                    } else if (mensagem.data.resultado >= 50) {
                        $("#icon-termo").attr("src", "img/icon-termo-50.png");
                    }
                }
                if (mensagem.data.tipo == 'luzRetorno') {
                    if (mensagem.data.resultado == true) {
                        if (horario < 18) {
                            $("#icon-luz").attr("src", "img/icon-luz-aberta-dia.png");
                            luz++;
                            //console.log(luz);

                        } else {
                            $("#icon-luz").attr("src", "img/icon-luz-aberta-noite.png");
                            luz++;
                            //console.log(luz);
                        }
                    } else {
                        if (horario < 18) {
                            $("#icon-luz").attr("src", "img/icon-luz-fechada-dia.png");
                            luz = 0;
                        } else {
                            $("#icon-luz").attr("src", "img/icon-luz-fechada-noite.png");
                            luz = 0;
                        }
                    }

                }
                if (mensagem.data.tipo == 'portaRetorno') {
                    if (mensagem.data.resultado == true) {
                        if (horario < 18) {
                            $("#icon-porta").attr("src", "img/icon-porta-aberta-dia.png");
                            porta++;

                        } else {
                            $("#icon-porta").attr("src", "img/icon-porta-aberta-noite.png");
                            $scope.mostrabalao = "fadeout";
                            porta++;
                        }
                    } else {
                        if (horario < 18) {
                            $("#icon-porta").attr("src", "img/icon-porta-fechada-dia.png");
                            porta = 0;
                        } else {
                            $("#icon-porta").attr("src", "img/icon-porta-fechada-noite.png");
                            porta = 0;
                        }
                    }
                }

                if (luz == 1) {
                    $("#icon-balao img").attr("src", "img/balao-luzfoiacesa.png");
                    $("#icon-balao").attr("class", "posicao-balao fade fadeout");
                    setTimeout(function() {
                        $("#icon-balao").attr("class", "posicao-balao fade");
                    }, 3000);
                } else if (luz == 0) {
                    $("#icon-balao img").attr("src", "img/balao-vazio.png");
                    $("#icon-balao").attr("class", "posicao-balao fade");
                } else if (luz == 10) {
                    $("#icon-balao img").attr("src", "img/balao-luzestaacesa.png");
                    $("#icon-balao").attr("class", "posicao-balao fade fadeout");
                    setTimeout(function() {
                        $("#icon-balao").attr("class", "posicao-balao fade");
                    }, 3000);
                } else if (porta == 1) {
                    $("#icon-balao img").attr("src", "img/balao-portafoiaberta.png");
                    $("#icon-balao").attr("class", "posicao-balao fade fadeout");
                    setTimeout(function() {
                        $("#icon-balao").attr("class", "posicao-balao fade");
                    }, 3000);
                } else if (porta == 0) {
                    $("#icon-balao img").attr("src", "img/balao-vazio.png");
                    $("#icon-balao").attr("class", "posicao-balao fade");
                } else if (porta == 60) {
                    $("#icon-balao img").attr("src", "img/balao-portaestaaberta.png");
                    $("#icon-balao").attr("class", "posicao-balao fade fadeout");
                    setTimeout(function() {
                        $("#icon-balao").attr("class", "posicao-balao fade");
                    }, 3000);
                }
            }
        });

        //fim thread horario


        //modal Sobre
        $ionicModal.fromTemplateUrl('templates/modal-sobre.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.modalSobre = function() {
            $scope.modal.show();
        }
        $scope.fecharModal = function() {
                $scope.modal.hide();
            }
            //fim modal sobre









    })

.controller('ChatsCtrl', function($scope, $ionicLoading) {



})

.controller('ChatDetailCtrl', function($scope, $http, $stateParams, $ionicPopup) {


    $scope.titulo = $stateParams.titulo;
    $scope.descricao = $stateParams.desc;
    $scope.tipotrabalho = $stateParams.tipotrabalho;
    $scope.conhecimentonec = $stateParams.conhecimentonec;
    $scope.ruanumero = $stateParams.ruanumero;
    $scope.bairro = $stateParams.bairro;
    $scope.cidade = $stateParams.cidade;
    $scope.cep = $stateParams.cep;
    $scope.salario = $stateParams.salario;
    $scope.horatrabalho = $stateParams.horatrabalho;
    $scope.areaatuacao = $stateParams.areaatuacao;
    $scope.beneficioslista = $stateParams.beneficioslista;
    $scope.email = $stateParams.email;
    $scope.experiencia = $stateParams.experiencia;
    $scope.telefone = $stateParams.telefone;
    $scope.id = $stateParams.id;

    $scope.cadastrarVaga = function() {

        var token = window.localStorage.getItem('acesstoken');
        var token = {
            "accesstoken": token,
            "idVaga": $scope.id
        };

        $http.post("http://ieadtc-ags.rhcloud.com/vraptor4/candidatarvaga", token).success(function(data) {

            var alertPopup = $ionicPopup.alert({
                title: 'Candastro Realizado com Sucesso',
                buttons: [{
                    text: '<b>Fechar</b>',
                    type: 'button-balanced',

                }, ]
            });
            alertPopup.then(function(res) {});


        }).error(function(data, status) {

            $scope.message = "Aconteceu um problema: " + data;
        });
    };


    $scope.data = {
        clientSide: 'ng'
    };









})

.controller('AccountCtrl', function($scope) {
    $scope.sair = function() {
        window.localStorage.removeItem('acesstoken');
        window.localStorage.removeItem('id');
        window.location.href = "index.html";
    };
});
