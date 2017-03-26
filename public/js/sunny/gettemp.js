var i = 0;

function tarefaSomar2(){
    var d = new Date();
    var n = d.getSeconds();
    console.log("Marilene"); 
    console.log(++i); 
    
    
}

self.addEventListener('message',function(mensagem){
      setInterval(tarefaSomar2,1000);
      
       
    
});
