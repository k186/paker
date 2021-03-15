define('paker/pages/vuepage/vuepage', ['paker/components/comp1/comp1'], function (comp1) {

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var comp1__default = /*#__PURE__*/_interopDefaultLegacy(comp1);

  var vuepage = {
    enter: function enter() {
      setTimeout(function () {
        new Vue({
          el: document.querySelector('.J_Main'),
          components: {
            comp1: comp1__default['default']
          },
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

  return vuepage;

});
