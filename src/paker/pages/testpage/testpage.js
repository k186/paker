define('paker/pages/testpage/testpage', function () {

  var util = {
    format: function format(arg) {
      return arg;
    },
    testName: function testName(ddd) {
      return ddd;
    }
  };

  var tpl = "<div class=\"page\" @click=\"testA\">\r\n    {{test}}{{a}}\r\n</div>";

  var testpage = {
    enter: function enter() {
      util.format(111);
      setTimeout(function () {
        new Vue({
          el: document.querySelector('.J_Main'),
          template: tpl,
          data: function data() {
            return {
              test: 12312
            };
          },

          methods: {
            testA: function testA() {
              console.log(111);
            }
          }
        });
      }, 300);
    }
  };

  return testpage;

});
