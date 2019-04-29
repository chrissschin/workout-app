<template>
    <div class="container">
        <div class="row">
            <h4>Age- {{ age }}</h4>

            <button @click="aBtn++">A BTN {{ aBtn }}</button>
            <button @click="bBtn++">B BTN {{ bBtn }}</button>
            <button @click="cBtn = 1">C BTN {{ cBtn }}</button>
            <button @click="dBtn = 2">D BTN {{ dBtn }}</button>


            <!-- Every method gets ran here on init -->
            <!-- add to D gets ran when any value on the page gets changed because its on methods object instead of computed -->
            <!-- Computed only runs when it knows it's value has changed -->
            <p>Age + A = {{ addToA }}</p>
            <p>Age + B = {{ addToB }}</p>
            <p>Age + C = {{ addToC }}</p>
            <p>Age + D = {{ addToD() }}</p>

        </div>
    </div>
</template>

<script>
export default {
    name: "Test",
    data() {
        return {
            age: 26,
            aBtn: 0,
            bBtn: 0,
            cBtn: 1,
            dBtn: 2
        }
    },
    methods: {
        // all these methods are ran when any value has chagned on the component 
        addToD() {
            console.log("D Btn Clicked")
            for (let i = 0; i < 20; i++) {
                console.log('re running this method', i );
            }
            return this.dBtn + this.age
        }                
    },
    computed: {
        addToA() {
            console.log("AddToA")
            return this.aBtn + this.age
        },
        addToB() {
            console.log("AddToB")
            return this.bBtn + this.age
        },
        addToC() {
            console.log("C Btn Clicked")
            return this.cBtn + this.age
        }        
    }
}
</script>
