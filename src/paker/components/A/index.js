define('paker/components/A/index',function(require,exports,module) {

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

  var util__default = /*#__PURE__*/_interopDefaultLegacy(require("paker/utils/util"));
  var A__default = /*#__PURE__*/_interopDefaultLegacy(require("paker/components/A/A"));

  var index = {
    helper: util__default.format,
    A: A__default
  };

  return index;

});
