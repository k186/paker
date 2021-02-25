define('paker/components/A/index', ['paker/utils/util', 'paker/components/A/A'], function (util, A) {

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
  var A__default = /*#__PURE__*/_interopDefaultLegacy(A);

  var index = {
    helper: util__default['default'].format,
    A: A__default['default']
  };

  return index;

});
