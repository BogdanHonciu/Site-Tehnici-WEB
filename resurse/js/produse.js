window.onload= function(){ //cand toata pagina s-a incarcat 


    var btn=document.getElementById("b1");
    btn.onclick=function(){
        var articole=document.getElementsByClassName("c1")
        for(let art of articole){

            art.style.display="none";

            /*
            v=art.getElementsByClassName("nume")
            nume=v[0]*/
            var nume=art.getElementsByClassName("val-nume")[0]//<span class="nume">aa</span>
            console.log(nume.innerHTML)
            var conditie1=nume.innerHTML.startsWith(document.getElementById("inp-nume").value)

            var pret=art.getElementsByClassName("val-pret")[0]
            var conditie2=parseInt(pret.innerHTML) > parseInt(document.getElementById("inp-pret").value);

            // var radbtn=document.getElementsByName("");
            if(conditie1 && conditie2)
                art.style.display="block";
            
        }
    }
    var rng=document.getElementById("inp-pret");
    rng.onchange=function(){
        var info = document.getElementById("infoRange");//returneaza null daca nu gaseste elementul
        if(!info){
            info=document.createElement("span");
            info.id="infoRange"
            this.parentNode.appendChild(info);
        }
        
        info.innerHTML="("+this.value+")";
    }


 

    function sorteaza(semn){
        var articole=document.getElementsByClassName("produse");
        var v_articole=Array.from(articole);
        v_articole.sort(function(a,b){
            var nume_a=a.getElementsByClassName("val-nume")[0].innerHTML;
            var nume_b=b.getElementsByClassName("val-nume")[0].innerHTML;
            if(nume_a!=nume_b){
                return semn*nume_a.localeCompare(nume_b);
            }
            else{
                
                var pret_a=parseInt(a.getElementsByClassName("val-pret")[0].innerHTML);
                var pret_b=parseInt(b.getElementsByClassName("val-pret")[0].innerHTML);
                return semn*(pret_a-pret_b);
            }
        });
        for(let art of v_articole){
            art.parentNode.appendChild(art);
        }
    }

    btn2.onclick=function(){
        sorteaza(1)
    }

    var btn3=document.getElementById("sortBtn2");
    btn3.onclick=function(){
        sorteaza(-1)
    }

var btnr=	document.getElementById("reseteaza");
btnr.onclick=function(){
        var articole=document.getElementsByClassName("c1")
        for(let art of articole){

            art.style.display="block";
        }
        document.getElementById("inp-nume").value="";
        document.getElementById("val-ceva").value=document.getElementById("val-ceva").min;
}

}
