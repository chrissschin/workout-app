<template>
  <div class="dashboard">
    <nav>
      <div class="container">
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">Welcome {{ name }}</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <a href="sass.html">link</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col s6">
        <div class="card-container">
          <div class="card">
            <div class="card-content">

              <h5>Sign Up</h5>

            </div>
          </div>
        </div>
        </div>
        <div class="col s6">
        <div class="card-container">
          <div class="card">
            <div class="card-content">

              <h5>Sign Up</h5>

            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from 'firebase'

export default {
    name: 'Dashboard',
    data() {
        return {
            name: 'PERSON'
        }
    },
    methods: {

    },
    mounted() {
        console.log(firebase.auth().currentUser)
    }
 }
</script>

<style>
nav {
    background: #3949ab;
}
</style>
