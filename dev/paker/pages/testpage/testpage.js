import util from "../../utils/util";
import Ac from '../../components/A/index'
import tpl from './page.tpl'

export default {
  enter() {
    util.format(111)
    setTimeout(() => {
      new Vue({
        el: document.querySelector('.J_Main'),
        template: tpl,
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