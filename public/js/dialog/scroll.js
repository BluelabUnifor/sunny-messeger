
$(document).ready(function(){
  var height = document.querySelector("body").offsetHeight;
  document.querySelector("#scroll-fixed").style.height = (height-(height/2))+"px";
  // limit-overflow
});

function scroll(){
  var objDiv = document.getElementById("scroll-fixed");
  objDiv.scrollTop = objDiv.scrollHeight;
}
