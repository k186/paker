import comp1 from "../../components/comp1/comp1";

export default {
  enter() {
    setTimeout(() => {
      new Vue({
        el: document.querySelector('.J_Main'),
        components:{
          comp1
        },
        data() {
          return {
            test: 12312
          }
        },
        methods: {
          testA() {
            console.log(111)
          }
        }
      })
    }, 300)
  }
}