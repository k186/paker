define('paker/pages/testpage/testpage',function(require,exports,module) {

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

    var util__default = /*#__PURE__*/_interopDefaultLegacy(require("paker/utils/util"));

    var tpl = "<div class=\"page\" @click=\"testA\">\r\n    {{test}}{{a}}\r\n</div>";

    var testpage = {
      enter: function enter() {
        util__default.format(111);
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
