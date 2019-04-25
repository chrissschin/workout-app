<template>
  <div class="container login-signup">
    <div class="row">
      <div class="card-container">
        <div class="card">
          <div class="card-content">
            <h4>Workout Tracker</h4>
            <p>Hi, this a Vue app using Firebase to track the progress of your workouts</p>

          </div>
        </div>
      </div>

      <div class="card-container">
        <div class="card">
          <div class="card-content">
            <h5>Sign Up</h5>
            <form @submit.prevent="signUp">
              <div class="field">
                <p class="red-text accent-3">{{ feedback.username }}</p>
                <label for="username">username</label>
                <input type="text" name="username" v-model="username" @keyup="checkUsername">
              </div>
              <div class="field">
                <p class="red-text accent-3">{{ feedback.emailErr }}</p>
                <label for="email">email</label>
                <input type="email" name="email" v-model="email">
              </div>
              <div class="field">
                <p class="red-text accent-3">{{ feedback.passErr }}</p>
                <label for="passpowrd">password</label>
                <input type="password" name="password" v-model="password">
              </div>
              <button class="btn waves login-btn indigo darken-4" :class="{ disabled: isButtonDisabled }">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="card-content">
            <h5>Login</h5>
            <form @submit.prevent="login">
              <div class="field">
                <p class="red-text accent-3">{{ feedback.emailErr }}</p>
                <label for="email">email</label>
                <input type="email" name="email" v-model="email">
              </div>
              <div class="field">
                <p class="red-text accent-3">{{ feedback.passErr }}</p>
                <label for="passpowrd">password</label>
                <input type="password" name="password" v-model="password">
              </div>
              <button class="btn waves login-btn indigo darken-4">Login</button>
            </form>

          </div>
        </div>
      </div>


    </div>
  </div>
</template>



<script>
import firebase from 'firebase'
import db from '@/firebase/init'

  export default {
    data() {
      return {
        email: null,
        password: null,
        username: null,
        feedback: {
          emailErr: null,
          passErr: null,
          username: null
        },
        isButtonDisabled: true,
        regexMin: /^[a-zA-Z0-9.\-_$@*!]{3,30}$/
      }
    },
    methods: {
      login() {
        console.log(this.email, this.password)
        // authenticate to firebase
        if (!this.email) {
          this.feedback.emailErr = 'Please enter an email'
        } else {
          this.feedback.emailErr = ''
        }
        if (!this.password) {
          this.feedback.passErr = 'Please enter a password'
        } else {
          this.feedback.passErr = ''
        }
        if (this.email && this.password) {
          firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then( credential => {
            console.log(credential)
            this.$router.push({ name: 'Dashboard' })
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
            alert(errorMessage)
          });
        }
      },
      checkUsername() {
        if ( this.username.length > 5 && this.regexMin.test(this.username) ) {
          this.isButtonDisabled = false
        } else {
          console.log('button disabled')
          this.isButtonDisabled = true
        }
      },
      signUp() {   
        // check database if the username already exists
        // else create new user then go to dash
        let ref = db.collection('users').doc(this.username)              
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback.username = 'This username is taken'
            console.log('exiting signup func')
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
              .then(credential => {
                ref.set({
                  slug: this.username,
                  uid: credential.user.uid,
                  email: this.email
                })
                console.log(credential.user)
                this.$router.push({ name: 'Dashboard' })
              })
              .catch(error => {
                console.log(error.message)
                this.feedback.emailErr = error.message
              })
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.login-signup .login-btn {
  margin-top: 25px;
}
.login-signup .card-container {
  margin: 0 auto;
  max-width: 500px;
}

</style>
