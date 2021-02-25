define('paker/pages/testpage/testpage',function(require,exports,module) {

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

  var util__default = /*#__PURE__*/_interopDefaultLegacy(require("paker/utils/util"));
  var Ac__default = /*#__PURE__*/_interopDefaultLegacy(require("paker/components/A/index"));

  var testpage = {
    enter: function enter() {
      util__default.format(111);
      console.log(Ac__default.A);
      debugger;
    }
  };

  return testpage;

});
