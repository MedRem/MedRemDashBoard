import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { promise } from 'protractor';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root'
})
export class RammmadService {

  database = firebase.database().ref();

  // getting data for auth
  userId;
  userDocumentNo;
  username;
  userUID;
  email;

  // getting data from users table
 userzArray = [];
 userNamez;
 userSurname;
 userAge;
 userGender;
 userContact;
 userEmail;
 userPaswword;
 userUIDUID;

//  pulling data for analysis
alluserArray = [];
allspecialist: any;
appoint: any;
meds: any;
kin: any;

userCount: any;
specialistCount: any;
appointCount: any;
medsCount: any



  constructor() { }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// log in, sign up and register code
login(email, password) {
return firebase.auth().signInWithEmailAndPassword(email, password).then((results) => {
  if (results) {
    this.userUID = results['user'].uid;
    // this.userDocumentNo = results['user'].uid;
  }
  return results;
}).catch((error) => {
  var errorCode = error.code;
  var errorCode = error.message;
  return errorCode;
});
}

signup(email, password, name, surname, age, gender, location, contact) {
return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
  if (user) {
    this.userId = user['user'].uid;
    this.userDocumentNo = user['user'].uid;
    this.email = user['user'].email;
    console.log(this.userDocumentNo);

  // inserting into database
    firebase.database().ref('users/' + this.userId).set({
    username: name,
    surnamez: surname,
    agez: age,
    genderz: gender,
    locationz: location,
    contactz: contact,
    emails: email,
    hasProfilePic: false,
    }, (error) => {
      if (error) {
      } else {
      }
    });
  }
  return user;
}).catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  return errorMessage;
  // ...resetepassword
});
}

logout() {
firebase.auth().signOut().then(() => {
  console.log('Sign-out successful.');

  // Sign-out successful.
}).catch((error) => {
  console.log('An error happened.');
  // An error happened.
});
}

resetepassword(email) {
const auth = firebase.auth();

auth.sendPasswordResetEmail(email.Email).then(() => {
// Email sent.
}).catch((error) => {
  // An error happened.
  var errorCode = error.code;
  var errorMessage = error.message;
});
}

getUserInformation() {
return new Promise ((resolve) => {
  this.userzArray = [];
  const rootRef = firebase.database().ref('users/' + this.userDocumentNo);
  // console.log(this.userDocumentNo);
  rootRef.on('value', (data) => {
  const userzz = data.val();
  this.userNamez = userzz.username;
  this.userSurname = userzz.surnamez;
  this.userAge = userzz.agez;
  this.userGender = userzz.genderz;
  this.userContact = userzz.contactz;
  this.userEmail = userzz.emails;
  this.userzArray.push({
    name: this.userNamez,
    surname: this.userSurname,
    age: this.userAge,
    gender: this.userGender,
    contact: this.userContact,
    email: this.userEmail
    // userzz
  });
  resolve(this.userzArray);
});
  // return this.userzArray;
});
}

getallusers() {
  return new Promise ((resolve) => {
    this.alluserArray = [];
    const rootRef = firebase.database().ref('users/').on("value", value => {
      this.alluserArray = value.val();
      // console.log(this.alluserArray);
      resolve(this.alluserArray);
    });
  })
}

CountUsers() {
  this.userCount = 0;
  return new Promise((resolve, reject) => {
    let userList: any
    this.getallusers().then(users => {
      userList = users;
      for(let users in userList) {
        this.userCount = this.userCount + 1;
      }
      console.log(this.userCount);
      resolve(this.userCount);
    })
    });
}

getallspecialist() {
  return new Promise ((resolve) => {
    this.allspecialist;
    const rootRef = firebase.database().ref('Specialists/').on("value", value => {
      this.allspecialist = value.val();
      // console.log(this.allspecialist);
      resolve(this.allspecialist);
    });
  })
}

CountSpecialist() {
  this.specialistCount = 0;
  return new Promise((resolve) => {
    let speclist: any;
    this.getallspecialist().then(specilist => {
      speclist = specilist
      for (let specialistlist in speclist) {
        this.specialistCount = this.specialistCount + 1;
      }
      console.log(this.specialistCount);
      resolve(this.specialistCount);
    })
  })
}

getAppointment() {
  // this.clearArray(this.appoint);
  return new Promise((resolve, reject) => {
    let appoints : any;
    const dataz = firebase.database().ref('Appointment/');
    dataz.on('value', (snap) => {
      appoints = snap.val();
      // console.log(this.appoints);
      resolve(appoints);
      });
    });
  };

  CountAppoints() {
    this.appointCount = 0;
    return new Promise((resolve) => {
      let Apoointment: any;
      this.getAppointment().then(Appointss => {
        // console.log(Appointss);
        Apoointment = Appointss
        for (let appointID in Apoointment) {
          for (let app in Apoointment[appointID]) {
            this.appointCount = this.appointCount + 1
          }
        }
        // console.log(this.appointCount);
        resolve(this.appointCount);
      })
    })
  }

  getMedication() {
    // this.clearArray(this.appoint);
    return new Promise((resolve, reject) => {
      this.meds;
      const dataz = firebase.database().ref('Medication/');
      dataz.on('value', (snap) => {
        this.meds = snap.val();
        // console.log(this.meds);
        resolve(this.meds);
        });
      });
    }

  CountMeds() {
    this.medsCount = 0;
    return new Promise((resolve) => {
      let medz: any;
      this.getMedication().then(medss => {
        console.log(medss);
        medz = medss
        for (let med in medz) {
          for (let pills in medz[med]) {
            this.medsCount = this.medsCount + 1
          }
        }
        console.log(this.medsCount);
        resolve(this.medsCount);
      })
    })
  }

  getNextofKin() {
    return new Promise((resolve, reject) => {
      this.kin;
      const dataz = firebase.database().ref('Kin/');
      dataz.on('value', (snap) => {
        this.kin = snap.val();
        // console.log(this.kin);
        resolve(this.kin);
        });
      });
  }

}
