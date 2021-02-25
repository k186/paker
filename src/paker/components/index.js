define('paker/components/index', ['paker/components/A/index', 'paker/components/B/index', 'paker/components/C/index'], function (A, B, C) {

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var A__default = /*#__PURE__*/_interopDefaultLegacy(A);
  var B__default = /*#__PURE__*/_interopDefaultLegacy(B);
  var C__default = /*#__PURE__*/_interopDefaultLegacy(C);

  var index = {
    A: A__default['default'], B: B__default['default'], C: C__default['default']
  };

  return index;

});
