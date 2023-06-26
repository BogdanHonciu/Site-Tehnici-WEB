window.onload = function(){
    document.getElementById("form-inreg").onsubmit=function(){
        if(document.getElementById("parl").value==document,getElementById("rparl").value){
            return true
        }
        alert("parola reintrodusa nu corespunde");
        return false;
    }
}