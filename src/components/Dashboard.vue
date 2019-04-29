<template>
<div class="dashboard">
  <nav>
    <div class="container">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo" style="font-size:14px;">Welcome {{ currUserName }}</a>
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
      <div v-for="(workout, index) in workouts" :key="index" class="col s12 m6">
        <div class="card-container">
          <div class="card">
            <div class="card-content">
              <h5>{{ workout.workout }}</h5>
              <ul>
                <li v-for="(sets, index) in workout.setsInfo" :key="index">Set {{ sets.set }}: {{ sets.reps }} reps @ {{ sets.weight }} lbs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>                                 
    </div>
    <!-- <a @click.prevent="logWorkouts">log workouts</a> -->
    <div id="workout-form-container">
      <AddWorkoutForm  :formTitle="formTitle" :workouts='workouts'/>
    </div>
  </div>
</div>

</template>


<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import AddWorkoutForm from '@/components/AddWorkoutForm'


export default {
    name: 'Dashboard',
    components: { AddWorkoutForm },
    data() {
        return {
            currUserId: null,
            currUserName: null,
            formTitle: "Add a workout",
            workouts: null
        }
    },
    methods: {
      getUserName() {},
      // logWorkouts() { console.log(this.workouts) }
    },
    mounted() {
      let docRef = db.collection("users");
      // get ref to users collection and output
      console.log(firebase.auth().currentUser.uid)
      //gets ref to collection by finding the uid 
      docRef.where('uid','==',firebase.auth().currentUser.uid).get().then(snapshot => {
        snapshot.forEach(doc => {
          // now we have the doc title
          // we use this doc title because it is our unique id for the doc
          docRef.doc(doc.id).get().then(docSnap => {
            this.currUserName = docSnap.data().slug
            this.workouts = docSnap.data().workouts
            console.log('doc data workouts',docSnap.data().workouts)
            console.log('doc data id',docSnap.data().slug)
            
          })
        })
      })
    }
 }
</script>

<style>
nav {
    background: #3949ab;
}
</style>
