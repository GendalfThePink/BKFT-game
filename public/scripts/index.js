

// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const character = document.querySelectorAll('#Character');
const cardtitle = document.querySelectorAll('#CardTitle');
const cardtext = document.querySelector('.CardText');
const items = document.querySelector('.items');
const table_rows_level = document.querySelector('#table_rows_level');
const table_rows_FRP = document.querySelector('#table_rows_FRP');
const table_rows_TT = document.querySelector('#table_rows_TT');
const table_rows_kills = document.querySelector('#table_rows_kills');
const ach2 = document.querySelector('#ach2');
const searchul = document.querySelector('#myUL');
const usercard = document.querySelector('#usercard');
const fighto_head = document.querySelector('.fighto-head');
const fightos = document.querySelector('.fighto');
const fighto_main = document.querySelector('.fighto-main');
const fighto_kaç = document.querySelector('.fighto-kaç');
const fighting = document.querySelector('.fighting');
const fighting2 = document.querySelector('.fighting2');
const addeventinside = document.querySelector('.addeventinside');
const inventory = document.querySelector('.inventoryinside');

const showinventory = (user) => {
  inventory.innerHTML = `
   `;
  db.collection('Users').doc(user.uid).get().then(docc => {
    var smth = docc.data().items;
    smth.forEach(function(entry) {
        db.collection('items').doc(entry.toString()).get().then(doc => {
          var inside =`
           `;
          if(entry > 100)
          {inside =  `
            <div class="card-action">
              <a onclick =' equiptoarmor( "${user.uid}" , "${doc.id}" ) '>Equip</a>
               </div>
           `}
           else{
              inside =  ` <div class="card-action">
                 <a  onclick =' equiptoleft( "${user.uid}" , "${doc.id}" ) '>Equip to right</a>
                 <a onclick =' equiptoright( "${user.uid}" , "${doc.id}" ) '>Equip to left </a>

                  </div>
              `
           }
           console.log(doc.id);
           if(docc.data().WeaponLeft == doc.id  || docc.data().WeaponRight == doc.id || docc.data().Armor == doc.id)
           {
             inside =`<div class="card-action">
                <p style="color:blue;">E</p>
                 </div>
            `;
           }
          inventory.innerHTML += `
          <div class="card-action">
          <div class="col s6 m3 xs12">
          <div class="card z-depth-2">
         <span class="card-title">${doc.data().Name}</span>
         </div>
         <div class="card-content">
         <p>Saldırı: ${doc.data().Attack}
          Savunma: ${doc.data().Defence} </p>
       </div>` + inside + `</div>`;


        });

    });
  });
  setupChar(auth.currentUser);

};
const fighto = (user) => {
  if(user){

    var random = (Math.floor(Math.random() * (+100 - +1)) + +1 ) ;
    if(random <= 50)
    { random =1; }
    else if(random <= 75)
    {random =2; }
    else if(random <= 90)
    {random =3; }
    else if(random <= 98)
    {random =4; }
    else if(random <= 100)
    {random =5; }
    var randoms = random.toString() ;
    db.collection('Event').doc(randoms).get().then(doc => {

       if(doc.data().number>0){
         var html = `
      <h4>${doc.data().name} ile karşılaştın</h4><br />
     `;
      fighto_head.innerHTML = html ;
      html = `
      <p>Saldırı değeri :  ${doc.data().attack}</p>
      <p>Savunma değeri : ${doc.data().defence}</p>
     `;
     fightos.innerHTML = html;

     html = `
     <a onclick =' fightingx( "${randoms}" , "${user.uid}" ,"${doc.data().name}") ' class=" waves-effect waves-light btn-large"  id="saldır" >Saldır</a>
    `;
    fighto_main.innerHTML = html ;
    }
    else {
      var html = `
   <h4>${doc.data().name} Kalıntıları görüyorsun.</h4><br />
  `;
   fighto_head.innerHTML = html ;
    }



    });

}
else {
  var html = `
  <h4>ile karşılaştın </h4><br />

 `;
  fighto_head.innerHTML = html ;
  html = `
  <p>Saldırı değeri :  </p>
  <p>Savunma değeri : </p>
 `;
 fightos.innerHTML = html;
 html = `
`;
   fighto_main.innerHTML = html ;
   fighting.innerHTML = html ;
   fighting2.innerHTML = html ;

}
};
function equiptoleft(user , item) {
  db.collection('Users').doc(user).update({
  WeaponLeft : parseInt(item)
  });
showinventory(auth.currentUser);
updateUser(false);
updateUser(true);
};
function equiptoright(user , item) {

    db.collection('Users').doc(user).update({
    WeaponRight : parseInt(item)
    });


showinventory(auth.currentUser);
updateUser(false);
updateUser(true);
};
function equiptoarmor(user , item) {

    db.collection('Users').doc(user).update({
      Armor : parseInt(item)
    });
showinventory(auth.currentUser);
updateUser(false);
updateUser(true);
};
function fightingx(randoms , user , name) {
  var html =`
  `;
  fighting.innerHTML = html ;
  fighting2.innerHTML = html ;

    fighto_kaç.style.display = 'none';
  var game = 0 ;

   var  ma = 0   ;
   var  ua = 0 ;
   var  ud = 0 ;
   var  md = 0 ;

    var random = randoms.toString();
   db.collection('Event').doc(random).get().then(doc => {
   ma = doc.data().attack ;
   md = doc.data().defence ;

       });

   db.collection('Users').doc(user).get().then(doc => {
   ua = doc.data().Attack ;
   ud = doc.data().Defence ;

   var html = `
   <h4>${name}'e(a) saldırdın</h4><br />
  `;
   fighto_head.innerHTML = html ;
   if(doc.data().health <= 0){
     var html = `
     <h4>${name} seni rezil etti</h4><br />
    `;
     fighto_head.innerHTML = html ;
     html = `<p>Sürünerek canavarın yanına gittin ve bayıldın.(can değerin : ${doc.data().health})</p>
       `;
      fighto_main.innerHTML = html ;
   }else {
     html = `
     <a onclick =' gamex ( ${ua}, ${ud} ,${ma},${md} , ${randoms} , "${user}" ) ' class=" waves-effect waves-light btn-large"  id="saldır" >Zarla</a>
    `;
      fighto_main.innerHTML = html ;

   }



   });

}

function gamex(ua , ud ,ma ,md ,randoms , user , name )
{
  var win = 0 ;
  var lose = 0 ;
  var game = 0 ;
  while(game < 3){
    var zar1 = (Math.floor(Math.random() * (+20 - +1)) + +1 ) ;
    var zar2 = (Math.floor(Math.random() * (+20 - +1)) + +1 ) ;
    if(zar1>zar2){
      var html =`
                  <p>(${game+1})Avantaj sende ,saldırıyorsun.</p>
                  <p>Saldırın(D20) : ${zar1+ua}(${zar1}+${ua})</p>
                  <p>Savunması(D20) : ${zar2+md}(${zar2}+${md})</p>
      `;
      fighting.innerHTML += html ;
      if(zar1+ua > zar2+md){
        win = win+1;
        var html =`
                    <p>Saldırın başarılı !</p>
                    <p>Durum : ${win} - ${lose} </p>

        `;
        fighting.innerHTML += html ;
      }
      else{
        lose = lose+1 ;
        var html =`
                    <p>Saldırın başarısız !</p>
                    <p>Durum : ${win} - ${lose} </p>

        `;
        fighting.innerHTML += html ;
      }
    }
    else {
      var html =`
                <p>(${game+1})Avantaj canavarda ,savunuyorsun.</p>
                  <p>Savunman(D20) : ${zar1+ud}(${zar1}+${ud})</p>
                  <p>Saldırısı(D20) : ${zar2+ma}(${zar2}+${ma})</p>
      `;
      fighting.innerHTML += html ;
      if(zar1+ud > zar2+ma){
        win = win+1;
        var html =`
                    <p>Savunman başarılı !</p>
                    <p>Durum : ${win} - ${lose} </p>

        `;
        fighting.innerHTML += html ;
      }
      else{
        lose = lose+1 ;
        var html =`
                    <p>Savunman başarısız !</p>
                    <p>Durum : ${win} - ${lose} </p>

        `;
        fighting.innerHTML += html ;

      }

    }

   game = game+1;
 }
 if(win>lose)
 {
   var html =`
               <p class = "red-text"> Kazandın !</p>
   `;
   fighting.innerHTML += html ;
   var html =`
   `;
   fighto_main.innerHTML = html ;
   var html =`
   `;

  fighto_kaç.style.display = 'block';

  db.collection('Event').doc(randoms.toString()).get().then(doc => {
    db.collection('Event').doc(randoms.toString()).update({
    number : firebase.firestore.FieldValue.increment(-1)
    });
    var random = (Math.floor(Math.random() * (+100 - +1)) + +1 ) ;
    var item = 0 ;
    if(random <= 50)
    { item =doc.data().item1; }
    else if(random <= 75)
    { item =doc.data().item2; }
    else if(random <= 90)
    { item =doc.data().item3; }
    else if(random <= 98)
    { item =doc.data().item4; }
    else if(random <= 100)
    { item =doc.data().item5; }
    db.collection('Users').doc(user).get().then(docc => {
        db.collection('Users').doc(user).update({
        items : firebase.firestore.FieldValue.arrayUnion(item) ,
        eventkill : firebase.firestore.FieldValue.increment(1) ,
        gold : firebase.firestore.FieldValue.increment(Math.floor(random/10))
        })
      });


      setupChar(auth.currentUser);
      updateLevel(auth.currentUser);
      setupUI(auth.currentUser);
      });




 }
 else{
   var html =`
               <p class = "red-text"> Kaybettin !</p>
   `;
   fighting.innerHTML += html ;
   var html =`
   `;
   fighto_main.innerHTML = html ;
   var html =`
   `;

  fighto_kaç.style.display = 'block';
   db.collection('Users').doc(user).get().then(doc => {
     var damage = ma - ud ;
     if(damage > doc.data().health){
   db.collection('Users').doc(user).update({
     health : 0
   })
 }else {
   var newh = doc.data().health - damage ;
   db.collection('Users').doc(user).update({
     health : newh
   })
 }

 setupChar(auth.currentUser);
 updateLevel(auth.currentUser);
 setupUI(auth.currentUser);
       });
   //TODO canını düşür , kalan canını yazdır
 }
}
function myFunction() {

    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("div");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function myfunction2(username) {

  db.collection('Users').where("name" , "==", username).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(docc) {
      var html = `

            <div class="card-content white-text">
            <span class="card-title" >Change : ${docc.data().name}</span>
              <div class="input-field">
          <input id="${docc.id}frp" type="text" oninput='myfunction3("${docc.id}", "${docc.data().FRPevent}", "frp")'>
          <label for="first_name">FRP event(${docc.data().FRPevent})</label>
        </div>
        <div class="input-field">
      <input id="${docc.id}tt" type="text" oninput='myfunction3("${docc.id}", "${docc.data().TTevent}", "tt")'>
      <label for="first_name">TT event(${docc.data().TTevent})</label>
    </div>
    <div class="input-field">
  <input id="${docc.id}gg" type="text" oninput='myfunction3("${docc.id}", "${docc.data().Event}", "gg")'>
  <label for="first_name">GG event(${docc.data().Event})</label>
</div>
<div class="input-field">
<input id="${docc.id}title" type="text" oninput='myfunction3("${docc.id}", "${docc.data().title}", "title")'>
<label for="first_name">title(${docc.data().title})</label>
</div>
<div class="input-field">
<input id="${docc.id}catan" type="text" oninput='myfunction3("${docc.id}", "${docc.data().CatanWin}", "catan")'>
<label for="first_name">Catan Wins(${docc.data().CatanWin})</label>
</div>
<div class="input-field">
<input id="${docc.id}gh" type="text" oninput='myfunction3("${docc.id}", "${docc.data().GHwin}", "gh")'>
<label for="first_name">GH Wins(${docc.data().GHwin})</label>
</div>
<div class="input-field">
<input id="${docc.id}health" type="text" oninput='myfunction3("${docc.id}", "${docc.data().health}", "health")'>
<label for="first_name">Can değeri(${docc.data().health})</label>
</div>
            </div>

       `;
       usercard.innerHTML = html  ;

    });

});

}

function myfunction3(id ,data , which){

  if (which == "frp"){
    var rawinput = document.getElementById(id+"frp").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Users').doc(id).update({
      FRPevent : input
    })
  }
  if (which == "tt") {

    var rawinput = document.getElementById(id+"tt").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Users').doc(id).update({
      TTevent : input
    })

  }
  if (which == "gg") {
    var rawinput = document.getElementById(id+"gg").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Users').doc(id).update({
      Event : input
    })

  }
  if (which == "title") {
    var input = document.getElementById(id+"title").value;


    db.collection('Users').doc(id).update({
      title : input
    })

  }
  if (which == "catan") {
    var rawinput = document.getElementById(id+"catan").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Users').doc(id).update({
      CatanWin : input
    })

  }
  if (which == "gh") {
    var rawinput = document.getElementById(id+"gh").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Users').doc(id).update({
      GHwin : input
    })

  }
  if (which == "health") {
    var rawinput = document.getElementById(id+"health").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Users').doc(id).update({
      health : input
    })

  }

}

function addevent(id)
{
  db.collection('Event').doc(id).get().then(docc => {

      var html = `

            <div class="card-content white-text">
            <span class="card-title" >Change : ${docc.data().level}</span>
              <div class="input-field">
          <input id="${docc.id}name" type="text" oninput='addevent2("${docc.id}", "${docc.data().name}", "name")'>
          <label for="first_name">name(${docc.data().name})</label>
        </div>
        <div class="input-field">
      <input id="${docc.id}attack" type="text" oninput='addevent2("${docc.id}", "${docc.data().attack}", "attack")'>
      <label for="first_name">attack(${docc.data().attack})</label>
    </div>
    <div class="input-field">
  <input id="${docc.id}defence" type="text" oninput='addevent2("${docc.id}", "${docc.data().defence}", "defence")'>
  <label for="first_name">defence(${docc.data().defence})</label>
</div>
<div class="input-field">
<input id="${docc.id}number" type="text" oninput='addevent2("${docc.id}", "${docc.data().number}", "number")'>
<label for="first_name">number(${docc.data().number})</label>
</div>
<div class="input-field">
<input id="${docc.id}item1" type="text" oninput='addevent2("${docc.id}", "${docc.data().item1}", "item1")'>
<label for="first_name">item1(${docc.data().item1})</label>
</div>
<div class="input-field">
<input id="${docc.id}item2" type="text" oninput='addevent2("${docc.id}", "${docc.data().item2}", "item2")'>
<label for="first_name">item2(${docc.data().item2})</label>
</div>
<div class="input-field">
<input id="${docc.id}item3" type="text" oninput='addevent2("${docc.id}", "${docc.data().item3}", "item3")'>
<label for="first_name">item3(${docc.data().item3})</label>
</div>
<div class="input-field">
<input id="${docc.id}item4" type="text" oninput='addevent2("${docc.id}", "${docc.data().item4}", "item4")'>
<label for="first_name">item4(${docc.data().item4})</label>
</div>
<div class="input-field">
<input id="${docc.id}item5" type="text" oninput='addevent2("${docc.id}", "${docc.data().item5}", "item5")'>
<label for="first_name">item5(${docc.data().item5})</label>
</div>

            </div>

       `;
       addeventinside.innerHTML = html  ;

    });

}

function addevent2(id ,data , which){

  if (which == "name") {
    var input = document.getElementById(id+"name").value;
    db.collection('Event').doc(id).update({
      name : input
    })

  }
  if (which == "attack"){
    var rawinput = document.getElementById(id+"attack").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Event').doc(id).update({
      attack : input
    })
  }
  if (which == "defence") {

    var rawinput = document.getElementById(id+"defence").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Event').doc(id).update({
      defence : input
    })

  }
  if (which == "number") {
    var rawinput = document.getElementById(id+"number").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Event').doc(id).update({
      number : input
    })

  }

  if (which == "item1") {
    var rawinput = document.getElementById(id+"item1").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Event').doc(id).update({
      item1 : input
    })

  }
  if (which == "item2") {
    var rawinput = document.getElementById(id+"item2").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Event').doc(id).update({
      item2 : input
    })

  }
  if (which == "item3") {
    var rawinput = document.getElementById(id+"item3").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Event').doc(id).update({
      item3 : input
    })

  }
  if (which == "item4") {
    var rawinput = document.getElementById(id+"item4").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Event').doc(id).update({
      item4 : input
    })

  }
  if (which == "item5") {
    var rawinput = document.getElementById(id+"item5").value;
    var input  = parseInt(rawinput , 10);
    db.collection('Event').doc(id).update({
      item5 : input
    })

  }

}
M.AutoInit();

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

const updateUser = (bool) => {
  if(bool){
  db.collection('Users').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(docc) {
      var html = `
       <div onclick='myfunction2("${docc.data().name}")'><a href="#!" class=" collection-item blue-grey darken-3">${docc.data().name}</a></div>

     `;
     searchul.innerHTML += html  ;
    });

});
}
else {
  var html = ` `;
 searchul.innerHTML = html  ;

}
updateLevel(auth.currentUser);
setupUI(auth.currentUser);
setupChar(auth.currentUser);
};
const addeventx = (bool) => {
  if(bool){
  var html = ` `;
  db.collection('Event').orderBy("level", "desc").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(docc) {

      var html = `
       <div onclick='addevent("${docc.id}")'><a href="#!" class=" collection-item  waves-effect waves-light btn-large blue-grey darken-3">level (${docc.data().level}) ${docc.data().name}</a></div>
     `;
     addeventinside.innerHTML += html  ;
    });

});
}
else {
  var html = ` `; addeventinside.innerHTML = html  ;
}
};
const inventoryx = (user) => {
  if(user){
  db.collection('Users').doc(user.uid).get().then(doc=> {

    doc.data().items.forEach(item =>{
          db.collection('items').doc(item.toString()).get().then(docc=> {
      var html = `
       <div><a href="#!" class=" collection-item  waves-effect waves-light btn-large blue-grey darken-3">(${docc.data().Name})</a></div>
     `;
     inventory.innerHTML += html  ;

   });
    })

});
}
else {
  var html = ` `; addeventinside.innerHTML = html  ;
}
};

const heal = (user) => {
  if(user){
  db.collection('Users').doc(user.uid).get().then(doc=> {
    if(doc.data().gold >=  5)
    {
      db.collection('Users').doc(user.uid).update({
        gold : firebase.firestore.FieldValue.increment(-5) ,
        health : firebase.firestore.FieldValue.increment(10)
      })
    }

   });
    }

}










const setupACH = (user) =>{
if(user) {
  var html = `
 `;
 ach2.innerHTML = html;

  db.collection('Achievements').get().then(snapshot => {
    var sd = snapshot.docs ;

    sd.forEach(doc =>{
      db.collection('Users').where(doc.data().req_string , ">=", doc.data().req).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(docc) {
            if(user.uid == docc.id){
              var html = `
              <li>
                <div class="collapsible-header white-text darken-3 teal lighten-2">
                  ${doc.data().name}
                </div>
                <div class="collapsible-body active"><p>  ${doc.data().desc}
        </p></div>
              </li>
             `;
             ach2.innerHTML += html;
           }

        });

  });


  });
})
}
else {


}
};



const setupLB = (user) => {
  if (user) {
    db.collection('Users').orderBy("CatanWin", "desc").limit(10).get().then(snapshot => {
    var sd = snapshot.docs ;
    sd.forEach(doc =>{
      var html = `
      <tr>
        <td> <span class="red-text text-darken-2">${doc.data().title}</span> ${doc.data().name}</td>
        <td>${doc.data().CatanWin}</td>
      </tr>
     `;
     table_rows_catan.innerHTML += html;
    });
  });

  db.collection('Users').orderBy("GHwin", "desc").limit(10).get().then(snapshot => {

  var sd = snapshot.docs ;
  sd.forEach(doc =>{
    var html = `
    <tr>
      <td> <span class="red-text text-darken-2">${doc.data().title}</span> ${doc.data().name}</td>
      <td>${doc.data().GHwin}</td>
    </tr>
   `;
   table_rows_gh.innerHTML += html;
  });
});

    db.collection('Users').orderBy("Level", "desc").limit(10).get().then(snapshot => {

    var sd = snapshot.docs ;
    sd.forEach(doc =>{
      var html = `
      <tr>
        <td> <span class="red-text text-darken-2">${doc.data().title}</span> ${doc.data().name}</td>
        <td>${doc.data().Level}</td>
      </tr>
     `;
     table_rows_level.innerHTML += html;
    });
  });

  db.collection('Users').orderBy("FRPevent" , "desc").limit(10).get().then(snapshot => {

  var sd = snapshot.docs ;
  sd.forEach(doc =>{
    var html = `
    <tr>
    <td> <span class="red-text text-darken-2">${doc.data().title}</span> ${doc.data().name}</td>
      <td>${doc.data().FRPevent}</td>
    </tr>
   `;
   table_rows_FRP.innerHTML += html;
  });
});

db.collection('Users').orderBy("TTevent", "desc").limit(10).get().then(snapshot => {

var sd = snapshot.docs ;
sd.forEach(doc =>{
  var html = `
  <tr>
    <td> <span class="red-text text-darken-2">${doc.data().title}</span> ${doc.data().name}</td>
    <td>${doc.data().TTevent}</td>
  </tr>
 `;
 table_rows_TT.innerHTML += html;
});
});
db.collection('Users').orderBy("eventkill", "desc").limit(10).get().then(snapshot => {

var sd = snapshot.docs ;
sd.forEach(doc =>{
  var html = `
  <tr>
    <td> <span class="red-text text-darken-2">${doc.data().title}</span> ${doc.data().name}</td>
    <td>${doc.data().eventkill}</td>
  </tr>
 `;
 table_rows_kills.innerHTML += html;
});
});

}
else {
  var html = ``;

 table_rows_kills.innerHTML = html;
 table_rows_level.innerHTML = html;
 table_rows_catan.innerHTML = html;
 table_rows_gh.innerHTML = html;
 table_rows_TT.innerHTML = html;
 table_rows_FRP.innerHTML = html;

}
};
const updateLevel = (user) =>{

  if (user) {
    db.collection('Users').doc(user.uid).get().then(doc => {
      var frpevent = doc.data().FRPevent ;
      var ttevent = doc.data().TTevent ;
      var ggevent = doc.data().Event ;
      db.collection('Users').doc(user.uid).update({
        Level : frpevent+ttevent+ggevent
      })
      var level = doc.data().Level;
      db.collection('items').doc(doc.data().WeaponLeft.toString()).get().then(left =>{
        db.collection('items').doc(doc.data().WeaponRight.toString()).get().then(right =>{
          db.collection('items').doc(doc.data().Armor.toString()).get().then(armor =>{
            var righta=right.data().Attack;
            var rightd=right.data().Defence;
            var lefta=left.data().Attack;
            var leftd=left.data().Defence;
            var armora=armor.data().Attack;
            var armord=armor.data().Defence;
            db.collection('Users').doc(user.uid).update({

              Attack : righta + lefta + armora + level,
              Defence : rightd + leftd + armord + level
            })

          })
        })
      })
    });

  } else {
  }
};

const setupUI = (user) => {
  if (user) {

    // account info
    db.collection('Users').doc(user.uid).get().then(doc => {
      var percent = (doc.data().Level/doc.data().TTevent)*10;

      var html = `
       <div>${doc.data().name}(${doc.data().Level}) Olarak burdasın </div>
       <div class="pink-text">${doc.data().isAdmin ? "WOW ITS THE ADMIN" : ""}</div>
       <div class="pink-text">${doc.data().isDm ? "Hoşgeldiniz dm bey" : ""}</div>


       <div>Kutu Oyunu :(${doc.data().TTevent})<progress value="${doc.data().TTevent}" max="${doc.data().Level}">
       </progress></div>
       <div>Frp Puanı :(${doc.data().FRPevent})<progress value="${doc.data().FRPevent}" max="${doc.data().Level}">
       </progress></div>
       <div>GG :(${doc.data().Event})<progress value="${doc.data().Event}" max="${doc.data().Level}">
       </progress></div>

      <div>Turnuva Puanların : Catan(${doc.data().CatanWin}) , GuitarHero (${doc.data().GHwin})</div>
     `;


      accountDetails.innerHTML = html;
      if (doc.data().isAdmin) {
        adminItems.forEach(item => item.style.display = 'block');
      }
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupChar = (user) => {
   if(user)
   {
    character.forEach(item => item.style.display = 'block');
    db.collection('Users').doc(user.uid).get().then(doc => {
      var html = `
       <span class="card-title" >${doc.data().title} ${doc.data().name}</span>
       <p> Altın : ${doc.data().gold} </p>
       <p> Canın : ${doc.data().health} </p>
       <p> Seviye : ${doc.data().Level} </p>
       <p>Saldırı değeri :  ${doc.data().Attack}</p>
       <p>Savunma değeri : ${doc.data().Defence}</p>
     `;
     cardtext.innerHTML = html;
     var htmll = `<p>: Ekipman :</p> `;
     var wl = doc.data().WeaponLeft.toString();
     var wr = doc.data().WeaponRight.toString();
     var ar = doc.data().Armor.toString();
     db.collection('items').doc(wl).get().then(doc => {

     htmll += `<p>Sol el : ${doc.data().Name}</p> `;

     });
     db.collection('items').doc(wr).get().then(doc => {

     htmll += `<p>Sağ el : ${doc.data().Name}</p> `;


     });
     db.collection('items').doc(ar).get().then(doc => {

     htmll += `<p>Zırh : ${doc.data().Name}</p> `;


      items.innerHTML = htmll;
     });

    });

   }
   else {
    // clear account info
    cardtext.innerHTML = '';
    // toggle user elements
   character.forEach(item => item.style.display = 'none');

  }
};



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
