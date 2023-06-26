const express = require("express");
const fs = require('fs');
const sharp= require('sharp');
const {Client} = require('pg');
const formidable = require("formidable");
const crypto = require('crypto');
const helmet=require('helmet');
const session= require('express-session');
var app=express();
app.set("view engine","ejs");
console.log("__dirname: ",__dirname);

app.use(helmet.frameguard());//pentru a nu se deschide paginile site-ului in frame-uri

var client;
if(process.env.SITE_ONLINE){
  protocol="https://";
  numeDomeniu="still-thicket-08992.herokuapp.com/"
  client= new Client({
    user:'edxuseiakquwki',
    password:'fe2675de3f592537defc165dba750942f250b16dc8042839d325bfa37425aab5',
    database:'d89b808j12n4pj',
    host:'ec2-34-199-68-114.compute-1.amazonaws.com',
    port:5432,
    ssl: {
      rejectUnauthorized: false
    }});
  }
  else{
  client = new Client({user:'bogdan', password:'123', database:'SITE',host:'localhost',port:'3000'});
  protocol="http://";
  numeDomeniu="localhost:8080";

}


// var client = new pg.Client({user:'bogdan', password:'123', database:'SITE',host:'localhost',port:'3000'});
// var client = new pg.Client({
//   user:'edxuseiakquwki',
//   password:'fe2675de3f592537defc165dba750942f250b16dc8042839d325bfa37425aab5',
//   database:'d89b808j12n4pj',
//   host:'ec2-34-199-68-114.compute-1.amazonaws.com',
//   port:'5432',
//   ssl: {
//   rejectUnauthorized: false
  
// }});
client.connect();

// client.query("select * from produse", function(err,rez){
//   if(!err){
//     console.log(rez);
//     console.log(err);
//   }
// })
app.use("/resurse",express.static(__dirname+"/resurse"));

client.query("select * from enum_range(null::categ_produse) ", function(err,rez){
  if(!err){
    console.log(rez);
    console.log(err);
  }
})
app.get("/produse", function(req,res) {
  console.log(req.query)
  var conditie="";
 
  if(req.query.tip)

    conditie+=`and tip_produs='${req.query.tip}'`
    console.log(`select * from produse where 1=1 ${conditie}`);
 client.query(`select * from produse where 1=1 ${conditie}`, function(err,rez){
   console.log(err);
   console.log(rez);
  if(!err){
    client.query("select * from unnest(enum_range(null::categ_produse))", function(errCateg,rezCateg){
       v_optiuni=[];
       for(let elem of rezCateg.rows){
        v_optiuni.push(elem.unnest);
       }
       console.log(v_optiuni);

     
      res.render("pagini/produse",{produse:rez.rows, optiuni:v_optiuni});
    })
    }
 })
});

app.get("/produs/:id", function(req,res) {
  console.log(req.params)
  
 
 client.query(`select * from produse where id=${req.params.id}`, function(err,rez){
  
  if(!err){
    res.render("pagini/produs",{prod:rez.rows[0]});
    }
 })
});
// app.use("/resurse", express.static(__dirname+"/resurse"));

// app.get("/", function(req,res) {
//     console.log("mesaj pe server");
//     res.render("pagini/index"); 
// });

app.get("/ceva", function(req,res) {
  console.log("Am primit o cerere");
  res.write("<p style='color:red'>altceva</p>");
  res.end(); 
});

app.get(["/","/index","/home"], function (req, res) {
  console.log(req.ip);
  console.log(123);
  res.render("pagini/index",{ip:req.ip, imagini:obImagini.imagini,cale:obImagini.cale_galerie});
});
app.post("/inreg",function(req,res){
  var formular= new formidable.IncomingForm();
  formular.parse(req,function(err,campuriText,campuriFile){
    console.log(campuriText);
    console.log("Email: ", campuriText.email);
    parolaCriptare="curs_tehnici_web";
    var eroare="";
    if (campuriText.username.length==0)
    eroare+="Username-ul nu poate fi necompletat";
    if (campuriText.nume.length==0)
    eroare+="Numele nu poate fi necompletat";
    if (campuriText.prenume.length==0)
    eroare+="Prenumele nu poate fi necompletat";
    if (campuriText.parola.length==0)
    eroare+="Parola nu poate fi necompletata";
    if (campuriText.email.length==0)
    eroare+="Email-ul nu poate fi necompletat";

    if(!campuriText.username.match("[A-Za-z0-9]+")) 
    eroare+="Username-ul nu se potriveste. Nu ai suficiente caractere.";

    if(!campuriText.parola.match("[A-Za-z0-9]+")) 
    eroare+="Parola nu este suficient de puternica";

    if(eroare!=""){
      res.render("pagini/inregistrare",{err:eroare});
      return; //iese din formular daca e eroare
    }

    queryVerifUtiliz=`select * from utilizatori where username='${campuriText.username}'`
    console.log(queryVerifUtiliz)
    client.query(queryVerifUtiliz,function(err,rez){
      if(err){
        console.log(err);
        res.render("pagini/inregistrare",{err:"Eroare in baza de date"});
      }
      else{
        if (rez.rows.length==0){
          var criptareParola=crypto.scrypt(campuriText.parola,parolaCriptare,32).toString('ascii');
          var queryUtiliz=`insert intro utilizatori (username, nume, prenume, parola, email, salt, culoare_text, ocupatie) values('${campuriText.username}', '${campuriText.nume}','${campuriText.prenume}','${campuriText.criptareParola}', '${campuriText.email}', '${campuriText.culoare_text}', '${campuriText.ocupatie}')`;
          console.log(queryUtiliz)
          client.query(queryUtiliz,function(err,rez){
        if(err){
          console.log(err);
          res.render("pagini/inregistrare",{err:"Eroare baza de date"});
        }
        else{
          res.render("pagini/inregistrare",{err:"",raspuns:"Date introduse"});
        }
        
      });
      }
      else{
        eroare+="Username-ul exista deja";
        res.render("pagini/inregistrare",{err:"Eroare"});
        }
      }
    });
   
  });
});

async function trimiteMail(username, email, token){
	var transp= nodemailer.createTransport({
		service: "gmail",
		secure: false,
		auth:{//date login 
			user:"LEGOBIN@GMAIL.COM",
			pass:"TEHNICIWEB123"
		},
		tls:{
			rejectUnauthorized:false
		}
	});
	//genereaza html
	await transp.sendMail({
		from:"LEGOBIN@MAIL.COM",
		to:email,
		subject:"Te-ai inregistrat cu succes",
		text:"Username-ul tau este "+username,
		html:`<h1>Salut!</h1><p style='color:blue'>Username-ul tau este ${username}.</p> <p><a href='http://${numeDomeniu}/cod/${username}/${token}'>Click aici pentru confirmare</a></p>`,
	})
	console.log("trimis mail");
}


app.get('/useri', function(req, res){
	
	if( req.session && req.session.utilizator && req.session.utilizator.rol=="admin" ){
        client.query("select * from utilizatori",function(err, rezultat){
            if(err) throw err;
            //console.log(rezultat);
            res.render('pagini/useri',{useri:rezultat.rows});//afisez index-ul in acest caz
        });
	} 
    else{
		res.status(403).render('pagini/eroare',{mesaj:"Nu aveti acces"});
	}
    
});




app.post("/sterge_utiliz",function(req, res){
	if( req.session && req.session.utilizator && req.session.utilizator.rol=="admin"  ){
	var formular= new formidable.IncomingForm()
	
	formular.parse(req, function(err, campuriText, campuriFisier){
		//var comanda=`delete from utilizatori where id=${campuriText.id_utiliz} and rol!='admin'`;
        var comanda=`delete from utilizatori where id=$1 and rol !='admin' and nume!= $2::text `;
		client.query(comanda, [campuriText.id_utiliz,"Mihai"],  function(err, rez){
			// TO DO mesaj cu stergerea
            if(err)
                console.log(err);
            else{
                if (rez.rowCount>0){
                    console.log("sters cu succes");
                }
                else{
                    console.log("stergere esuata");
                }
            }
		});
	});
	}
	res.redirect("/useri");
	
});

app.get("/favicon.ico",function(req,res){
  res.sendFile("./resurse/imagini/favicon.ico");
});


// function getIp(req){//pentru Heroku
//   var ip = req.headers["x-forwarded-for"];
//   if (ip){
//       let vect=ip.split(",");
//       return vect[vect.length-1];
//   } 
//   else if (req.ip){
//       return req.ip;
//   }
//   else{
//    return req.connection.remoteAddress;
//   }
// }


// app.get(["/","/index","/home"], function(req,res){
//   var rezultat;
//   client.query("select username, nume from utilizatori where id in (select distinct user_id from accesari where now() - data_accesare < interval '5 minutes' )").then(function(rezultat){
//       console.log("rezultat", rezultat.rows);
//       var evenimente=[]
//       var locatie="";
      
//       request('https://secure.geobytes.com/GetCityDetails?key=7c756203dbb38590a66e01a5a3e1ad96&fqcn=109.99.96.15', //se inlocuieste cu req.ip; se testeaza doar pe Heroku
//           function (error, response, body) {
//           if(error) {console.error('error:', error)}
//           else{
//               var obiectLocatie=JSON.parse(body);
//               //console.log(obiectLocatie);
//               locatie=obiectLocatie.geobytescountry+" "+obiectLocatie.geobytesregion
//           }

//           //generare evenimente random pentru calendar 
          
//           var texteEvenimente=["Eveniment important", "Festivitate", "Lego day", "Zi speciala", "Aniversare"];
//           dataCurenta=new Date();
//           for(i=0;i<texteEvenimente.length;i++){
//               evenimente.push({data: new Date(dataCurenta.getFullYear(), dataCurenta.getMonth(), Math.ceil(Math.random()*27) ), text:texteEvenimente[i]});
//           }
//           console.log(evenimente)
//           res.render("pagini/index", {evenimente: evenimente, locatie:locatie,utiliz_online: rezultat.rows, ip:getIp(req),imagini:obImagini.imagini, cale:obImagini.cale_galerie, mesajLogin:req.session.mesajLogin});
//           req.session.mesajLogin=null;
          
//           });
          
//       //res.render("pagini/index", {evenimente: evenimente, locatie:locatie,utiliz_online: rezultat.rows, ip:req.ip,imagini:obImagini.imagini, cale:obImagini.cale_galerie, mesajLogin:req.session.mesajLogin});
           
//   }, function(err){console.log("eroare",err)});

//  // res.render("pagini/index",{ip:req.ip, imagini:obImagini.imagini, cale:obImagini.cale_galerie});//calea relativa la folderul views
// });


// partea cu salt string pentru protectie mai mare

/*app.get("/pagina", function(req, res) {
    console.log("mesaj pe server");
    res.render("pagini/pagina"); 
});*/

function creeazaImagini(){
   //----------galerie
   var buf=fs.readFileSync(__dirname+"/resurse/json/galerie.json").toString("utf-8");
   obImagini=JSON.parse(buf); //global
   console.log(obImagini);
 
   for(let imag of obImagini.imagini){
    let nume_imag, extensie;
    [nume_imag,extensie] =imag.fisier.split(".") //array de string
    let dim_mic = 150
    imag.mic = `${obImagini.cale_galerie}/mic${nume_imag}-${dim_mic}.webp`
    console.log(imag.mic);
    imag.mare=`${obImagini.cale_galerie}/${imag.fisier}` ;
    if(!fs.existsSync(imag.mic))
    sharp(__dirname+"/"+imag.mare).resize(dim_mic).toFile(__dirname+"/"+imag.mic);
    //  let aux=imag.fisier.split(".");
    //  let nume_imag=aux[0];
    //  let extensie=aux[1];
    //  console.log(nume_imag,extensie);
   }
   //readfile nu citeste pe loc, din cauza asta are function
 //readfilesync altfel
}

creeazaImagini();
d=new Date()
console.log(d);
console.log(d+"");
console.log(10);

// app.get("/ceva", function(req, res) {
//     console.log("mesaj pe server");
//     res.write("Altceva!");
//     res.end();
// });

app.get("/*.ejs",function(req,res){
  res.status(403).render("pagini/403");
})

app.get("/*", function(req, res) {
    console.log("!!!!!"+req.url);
     res.render("pagini"+req.url, function(err, rezultatRandare){
      if(err){

      
        console.log(err.message.includes("Failed to lookup"));
      if(err){
        res.status(404).render("pagini/404");
        return;
      }
      else{
        console.log(err);
       res.render("pagini/eroare_generala");
      }
    }
      else
        res.send(rezultatRandare);
   
    });
});

// app.listen(8080);
var s_port=process.env.PORT || 5000;
app.listen(s_port);  
console.log("Server pornit!");

// function darkMode() {
//   var element = document.body;
//   var content = document.getElementById("DarkModetext");
//   element.className = "dark-mode";
//   content.innerText = "Dark Mode is ON";
// }
// function lightMode() {
//   var element = document.body;
//   var content = document.getElementById("DarkModetext");
//   element.className = "light-mode";
//   content.innerText = "Dark Mode is OFF";
// }