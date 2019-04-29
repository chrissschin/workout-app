<template>
  <div>
    <form @submit.prevent='addWorkout' id="add-workout">
      <h4>{{ formTitle }}</h4>

      <div class="field">
        <label for="workout">Workout</label>
        <input v-model="workout" type="text" name="workout">
      </div>
      <div class="field sets-field">
        <p><strong>Current Set: {{ set }}</strong></p>
        <button @click.prevent="addSet" class='btn-small sets-btn red lighten-2'>add set</button>
      </div>      
      <div class="field">
        <label for="reps">reps</label>
        <input v-model="reps" type="number" name="reps">
      </div>

      <div class="field">
        <label for="lbs">Lbs.</label>
        <input v-model="weight" type="number" name="lbs">
      </div>

      <button class="btn teal">Submit</button>
    </form>

    <div>
            <p>worksouts data: {{ workouts }}</p>

    </div>
  </div>

  
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'AddWorkoutForm',
  props: ['workouts','formTitle'],
  data() {
    return {
      workout: null,
      setsInfo: [],
      doc: null,
      reps: 1,
      weight: 10,
      set: 1,
    }
  },
  methods: {
    addWorkout() {
      // get current set info and push to setsinfo array
      this.setsInfo.push({
        set: this.set,
        reps: this.reps,
        weight: this.weight
      })

      // push new data to passed prop to before updating the whole thang
      if (this.workouts === null) {
        console.log('no workouts')
      } else {
        this.workouts.push({
          workout: this.workout,
          setsInfo: this.setsInfo
        })
      }

      let currentUser = firebase.auth().currentUser.uid
      // get doc ref and set with new fields
      console.log('form submitting')
      //go through user collection where user id == the current user id
      // get returns a promise in which we use then to do ssomething with it
      db.collection('users').where('uid', '==', currentUser).get().then(snapshot => {
        snapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            workouts: this.workouts// previous workout is here too
          })
        })
        this.workout = ''
        this.reps = 0
        this.weight = 0          
      })
    },
    addSet() {
      this.setsInfo.push(
        {
          set: this.set,
          reps: this.reps,
          weight: this.weight            
        }
      )
      this.set++
      this.reps = 0
      this.weight = 0       
    }

  },
  mounted() {
    console.log("inside addworkout comp  ", this.workouts)
    //find user record then update 

  }

}


</script>
<style>
    #add-workout {
      background-color: #fff;
      padding: 25px;
      max-width: 500px;
    }
    .sets-field {
        margin-top:15px;
        margin-bottom: 15px;
    }
    .sets-field p {
        display: inline;
        margin-right: 25px;
    }
    
</style>

