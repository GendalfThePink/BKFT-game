
// listen for auth status changes
auth.onAuthStateChanged(user => {
  setupLB(true);
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {
      updateLevel(user);
      setupUI(user);
      setupChar(user);
      setupLB(false);
    });

  } else {
    setupUI();
    setupChar();

  }
});


// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('Users').doc(cred.user.uid).set({
      name : signupForm['signup-bio'].value,
      Attack : 0 ,
      Defence : 0,
      Event : 0 ,
      TTevent : 0 ,
      FRPevent : 0 ,
      isAdmin : false ,
      isDm : false,
      Armor : 101 ,
      Level : 1 ,
      WeaponRight : 1 ,
      WeaponLeft : 1 ,
      title : " " ,
      items : [1,1] ,

    });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = ''
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();

  auth.signOut();
  setupLB(false);


});
const ach = document.querySelector('#ach');
ach.addEventListener('click', (e) => {
  setupACH();
  setupACH(auth.currentUser);

});
const dövüşx = document.querySelector('#Dövüş');
dövüşx.addEventListener('click', (e) => {
  fighto();
  fighto(auth.currentUser);

});
const kac = document.querySelector('#kaç');
kac.addEventListener('click', (e) => {
 console.log("başarıyla kaçtın");
   fighto();
  fighto(auth.currentUser);

});

const update = document.querySelector('#getuser');
update.addEventListener('click', (e) => {
  updateUser(false);
  updateUser(true);
  updateLevel(auth.currentUser);
});
const addeventxx = document.querySelector('#addevent');
addeventxx.addEventListener('click', (e) => {
  addeventx(false);
  addeventx(true);
});

const healx = document.querySelector('#heal');
healx.addEventListener('click', (e) => {

  heal(auth.currentUser);
  setupChar(auth.currentUser);
  updateUser(false);
  updateUser(true);
});


const showinv = document.querySelector('#inventorybutton');
showinv.addEventListener('click', (e) => {
  showinventory(auth.currentUser);
});






// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});
