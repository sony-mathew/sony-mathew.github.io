webpackHotUpdate_N_E("pages/projects/sip-calculator",{

/***/ "./pages/projects/sip-calculator.js":
/*!******************************************!*\
  !*** ./pages/projects/sip-calculator.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Home; });\n/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _config_default_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../config/default_config */ \"./config/default_config.js\");\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/layout */ \"./components/layout.js\");\n/* harmony import */ var _styles_utils_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../styles/utils.module.scss */ \"./styles/utils.module.scss\");\n/* harmony import */ var _styles_utils_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_utils_module_scss__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _config_projectsList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../config/projectsList */ \"./config/projectsList.js\");\n\n\n\nvar _jsxFileName = \"/Users/sonymathew/Workspace/hobby/sony-mathew.github.io/site/pages/projects/sip-calculator.js\",\n    _s = $RefreshSig$();\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;\n\n\n\n\n\n\n\nvar SIPCalculator = /*#__PURE__*/function () {\n  function SIPCalculator(sipAmount, returnRate, timePeriod, inflationRate) {\n    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, SIPCalculator);\n\n    // from user\n    this.sipAmount = parseFloat(sipAmount);\n    this.returnRate = parseFloat(returnRate);\n    this.timePeriod = parseFloat(timePeriod);\n    this.inflationRate = parseFloat(inflationRate); // internal\n\n    this.months = this.timePeriod * 12;\n    this.monthsData = [];\n    this.process();\n  }\n\n  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(SIPCalculator, [{\n    key: \"process\",\n    value: function process() {\n      this.monthsData = [];\n      this.investment = 0;\n      this.returns = 0;\n      this.currentValue = 0;\n\n      for (var i = 1; i <= this.months; ++i) {\n        var timeInvested = i / 12.0;\n        var returnPercentage = (this.returnRate - this.inflationRate) / 100;\n        var totalValue = this.sipAmount * Math.pow(1 + returnPercentage, timeInvested);\n        this.monthsData.push({\n          month: i,\n          investment: this.sipAmount,\n          value: totalValue,\n          returns: totalValue - this.sipAmount\n        });\n        this.investment = this.investment + this.sipAmount;\n        this.currentValue = this.currentValue + totalValue;\n      }\n\n      this.returns = this.currentValue - this.investment;\n    }\n  }, {\n    key: \"toHumanReadable\",\n    value: function toHumanReadable(num) {\n      return num.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n    }\n  }, {\n    key: \"totalInvestment\",\n    get: function get() {\n      return this.toHumanReadable((this.investment || 0).toFixed(0));\n    }\n  }, {\n    key: \"estimatedReturns\",\n    get: function get() {\n      return this.toHumanReadable((this.returns || 0).toFixed(0));\n    }\n  }, {\n    key: \"totalValue\",\n    get: function get() {\n      return this.toHumanReadable((this.currentValue || 0).toFixed(0));\n    }\n  }]);\n\n  return SIPCalculator;\n}();\n\nvar getMetaData = function getMetaData() {\n  return _config_projectsList__WEBPACK_IMPORTED_MODULE_7__[\"projectsList\"].filter(function (p) {\n    return p.id === 'sip-calculator';\n  })[0] || {};\n};\n\nfunction Home() {\n  _s();\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(5000),\n      sipAmount = _useState[0],\n      setSipAmount = _useState[1],\n      _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(12),\n      returnRate = _useState2[0],\n      setReturnRate = _useState2[1],\n      _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(10),\n      timePeriod = _useState3[0],\n      setTimePeriod = _useState3[1],\n      _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(5),\n      inflationRate = _useState4[0],\n      setInflationRate = _useState4[1];\n\n  var calc = new SIPCalculator(sipAmount, returnRate, timePeriod, inflationRate);\n  var meta = getMetaData();\n  return __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 80,\n      columnNumber: 5\n    }\n  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 81,\n      columnNumber: 7\n    }\n  }, __jsx(\"title\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 82,\n      columnNumber: 9\n    }\n  }, meta.title), __jsx(\"meta\", {\n    name: \"title\",\n    content: meta.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 83,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    name: \"description\",\n    content: meta.description,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 84,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:title\",\n    content: meta.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 86,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:description\",\n    content: meta.description,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 87,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:image\",\n    content: meta.imageUrl,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 88,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:url\",\n    content: \"\".concat(_config_default_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].baseUrl, \"/projects/sip-calculator\"),\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 89,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:site_name\",\n    content: _config_default_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].siteTitle,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 90,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:type\",\n    content: \"article\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 92,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    property: \"article:published_time\",\n    content: meta.date,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 93,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    property: \"article:author\",\n    content: meta.author,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 94,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    property: \"article:tag\",\n    content: meta.tags,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 95,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:card\",\n    content: \"summary\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 97,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:title\",\n    content: meta.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 98,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:description\",\n    content: meta.description,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 99,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:creator\",\n    content: \"@\".concat(_config_default_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].authorTwitterHandle),\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 103,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:image\",\n    content: meta.imageUrl,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 104,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:image:alt\",\n    content: meta.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 105,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:label1\",\n    value: \"Reading time\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 106,\n      columnNumber: 9\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:data1\",\n    value: \"\".concat(meta.readingTime, \" min read\"),\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 107,\n      columnNumber: 9\n    }\n  })), __jsx(\"section\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 109,\n      columnNumber: 7\n    }\n  }, __jsx(\"h2\", {\n    className: _styles_utils_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a.headingLg,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 110,\n      columnNumber: 9\n    }\n  }, \"SIP Calculator\"), __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 112,\n      columnNumber: 9\n    }\n  }, \"Smallest ever financial advice * Compounnding is a powerful phenomenon * Start small * Start investing now * Read about Systematic Investment Plans\"), __jsx(\"div\", {\n    className: \"grid grid-cols-2 mt-10\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 120,\n      columnNumber: 9\n    }\n  }, __jsx(\"div\", {\n    className: \"flex flex-col space-y-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 122,\n      columnNumber: 11\n    }\n  }, __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 124,\n      columnNumber: 13\n    }\n  }, __jsx(\"label\", {\n    className: \"block\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 125,\n      columnNumber: 15\n    }\n  }, \"Monthly Investment Amount\"), __jsx(\"input\", {\n    type: \"number\",\n    value: sipAmount,\n    className: \"px-2 py-1 rounded text-gray-900 text-lg\",\n    onChange: function onChange(e) {\n      setSipAmount(e.target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 126,\n      columnNumber: 15\n    }\n  })), __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 131,\n      columnNumber: 13\n    }\n  }, __jsx(\"label\", {\n    className: \"block\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 132,\n      columnNumber: 15\n    }\n  }, \"Estimated Yearly Return (%)\"), __jsx(\"input\", {\n    type: \"number\",\n    value: returnRate,\n    className: \"px-2 py-1 rounded text-gray-900 text-lg\",\n    onChange: function onChange(e) {\n      setReturnRate(e.target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 133,\n      columnNumber: 15\n    }\n  })), __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 138,\n      columnNumber: 13\n    }\n  }, __jsx(\"label\", {\n    className: \"block\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 139,\n      columnNumber: 15\n    }\n  }, \"Time Period (in Years)\"), __jsx(\"input\", {\n    type: \"number\",\n    value: timePeriod,\n    className: \"px-2 py-1 rounded text-gray-900 text-lg\",\n    onChange: function onChange(e) {\n      setTimePeriod(e.target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 140,\n      columnNumber: 15\n    }\n  })), __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 145,\n      columnNumber: 13\n    }\n  }, __jsx(\"label\", {\n    className: \"block\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 146,\n      columnNumber: 15\n    }\n  }, \"Inflation Rate (%)\"), __jsx(\"input\", {\n    type: \"number\",\n    value: inflationRate,\n    className: \"px-2 py-1 rounded text-gray-900 text-lg\",\n    onChange: function onChange(e) {\n      setInflationRate(e.target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 147,\n      columnNumber: 15\n    }\n  })), __jsx(\"div\", {\n    className: \"pt-6\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 152,\n      columnNumber: 13\n    }\n  }, __jsx(\"button\", {\n    className: \"focus:outline-none text-sm w-24 py-3 rounded-md font-semibold text-white bg-blue-500 ring-2\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 153,\n      columnNumber: 15\n    }\n  }, \"Submit\"))), __jsx(\"div\", {\n    className: \"grid grid-rows-3 gap-4 pl-8\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 158,\n      columnNumber: 11\n    }\n  }, __jsx(\"div\", {\n    className: \"col-span-1 bg-gray-900 border border-gray-800 rounded p-4 ml-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 160,\n      columnNumber: 13\n    }\n  }, __jsx(\"div\", {\n    className: \"text-3xl text-gray-600\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 161,\n      columnNumber: 15\n    }\n  }, \"Rs. \", calc.totalInvestment), __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 162,\n      columnNumber: 15\n    }\n  }, \"Total Investment\")), __jsx(\"div\", {\n    className: \"col-span-1 bg-gray-900 border border-gray-800 rounded p-4 ml-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 165,\n      columnNumber: 13\n    }\n  }, __jsx(\"div\", {\n    className: \"text-3xl text-gray-600\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 166,\n      columnNumber: 15\n    }\n  }, \"Rs. \", calc.estimatedReturns), __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 167,\n      columnNumber: 15\n    }\n  }, \"Estimated Returns\")), __jsx(\"div\", {\n    className: \"col-span-1 bg-gray-900 border border-gray-800 rounded p-4 ml-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 170,\n      columnNumber: 13\n    }\n  }, __jsx(\"div\", {\n    className: \"text-3xl text-gray-600\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 171,\n      columnNumber: 15\n    }\n  }, \"Rs. \", calc.totalValue), __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 172,\n      columnNumber: 15\n    }\n  }, \"Total Value\"))))));\n}\n\n_s(Home, \"ugEZGjmxckw4FvI2w4/jKrOk1Js=\");\n\n_c = Home;\n\nvar _c;\n\n$RefreshReg$(_c, \"Home\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvcHJvamVjdHMvc2lwLWNhbGN1bGF0b3IuanM/NDdiOSJdLCJuYW1lcyI6WyJTSVBDYWxjdWxhdG9yIiwic2lwQW1vdW50IiwicmV0dXJuUmF0ZSIsInRpbWVQZXJpb2QiLCJpbmZsYXRpb25SYXRlIiwicGFyc2VGbG9hdCIsIm1vbnRocyIsIm1vbnRoc0RhdGEiLCJwcm9jZXNzIiwiaW52ZXN0bWVudCIsInJldHVybnMiLCJjdXJyZW50VmFsdWUiLCJpIiwidGltZUludmVzdGVkIiwicmV0dXJuUGVyY2VudGFnZSIsInRvdGFsVmFsdWUiLCJwdXNoIiwibW9udGgiLCJ2YWx1ZSIsIm51bSIsInRvU3RyaW5nIiwicmVwbGFjZSIsInRvSHVtYW5SZWFkYWJsZSIsInRvRml4ZWQiLCJnZXRNZXRhRGF0YSIsInByb2plY3RzTGlzdCIsImZpbHRlciIsInAiLCJpZCIsIkhvbWUiLCJ1c2VTdGF0ZSIsInNldFNpcEFtb3VudCIsInNldFJldHVyblJhdGUiLCJzZXRUaW1lUGVyaW9kIiwic2V0SW5mbGF0aW9uUmF0ZSIsImNhbGMiLCJtZXRhIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImltYWdlVXJsIiwiREVGQVVMVF9DT05GSUciLCJiYXNlVXJsIiwic2l0ZVRpdGxlIiwiZGF0ZSIsImF1dGhvciIsInRhZ3MiLCJhdXRob3JUd2l0dGVySGFuZGxlIiwicmVhZGluZ1RpbWUiLCJ1dGlsU3R5bGVzIiwiaGVhZGluZ0xnIiwiZSIsInRhcmdldCIsInRvdGFsSW52ZXN0bWVudCIsImVzdGltYXRlZFJldHVybnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFTUEsYTtBQUNKLHlCQUFZQyxTQUFaLEVBQXVCQyxVQUF2QixFQUFtQ0MsVUFBbkMsRUFBK0NDLGFBQS9DLEVBQThEO0FBQUE7O0FBQzVEO0FBQ0EsU0FBS0gsU0FBTCxHQUFpQkksVUFBVSxD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LHdCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBNkNsQixJQUFJLENBQUNwQixVQUFsRCxDQURGLEVBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFGRixDQVpGLENBdENGLENBWEYsQ0E3QkYsQ0FERjtBQXVHRDs7R0FoSHVCYyxJOztLQUFBQSxJIiwiZmlsZSI6Ii4vcGFnZXMvcHJvamVjdHMvc2lwLWNhbGN1bGF0b3IuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IERFRkFVTFRfQ09ORklHIGZyb20gJy4uLy4uL2NvbmZpZy9kZWZhdWx0X2NvbmZpZyc7XG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2xheW91dFwiO1xuaW1wb3J0IHV0aWxTdHlsZXMgZnJvbSBcIi4uLy4uL3N0eWxlcy91dGlscy5tb2R1bGUuc2Nzc1wiO1xuaW1wb3J0IHsgcHJvamVjdHNMaXN0fSAgZnJvbSBcIi4uLy4uL2NvbmZpZy9wcm9qZWN0c0xpc3RcIjtcblxuY2xhc3MgU0lQQ2FsY3VsYXRvciB7XG4gIGNvbnN0cnVjdG9yKHNpcEFtb3VudCwgcmV0dXJuUmF0ZSwgdGltZVBlcmlvZCwgaW5mbGF0aW9uUmF0ZSkge1xuICAgIC8vIGZyb20gdXNlclxuICAgIHRoaXMuc2lwQW1vdW50ID0gcGFyc2VGbG9hdChzaXBBbW91bnQpO1xuICAgIHRoaXMucmV0dXJuUmF0ZSA9IHBhcnNlRmxvYXQocmV0dXJuUmF0ZSk7XG4gICAgdGhpcy50aW1lUGVyaW9kID0gcGFyc2VGbG9hdCh0aW1lUGVyaW9kKTtcbiAgICB0aGlzLmluZmxhdGlvblJhdGUgPSBwYXJzZUZsb2F0KGluZmxhdGlvblJhdGUpO1xuXG4gICAgLy8gaW50ZXJuYWxcbiAgICB0aGlzLm1vbnRocyA9IHRoaXMudGltZVBlcmlvZCAqIDEyO1xuICAgIHRoaXMubW9udGhzRGF0YSA9IFtdO1xuICAgIHRoaXMucHJvY2VzcygpO1xuICB9XG5cbiAgcHJvY2VzcygpIHtcbiAgICB0aGlzLm1vbnRoc0RhdGEgPSBbXTtcbiAgICB0aGlzLmludmVzdG1lbnQgPSAwO1xuICAgIHRoaXMucmV0dXJucyA9IDA7XG4gICAgdGhpcy5jdXJyZW50VmFsdWUgPSAwO1xuXG4gICAgZm9yKGxldCBpID0gMTsgaSA8PSB0aGlzLm1vbnRoczsgKytpKSB7XG4gICAgICBjb25zdCB0aW1lSW52ZXN0ZWQgPSAoaSAvIDEyLjApO1xuICAgICAgY29uc3QgcmV0dXJuUGVyY2VudGFnZSA9ICgodGhpcy5yZXR1cm5SYXRlIC0gdGhpcy5pbmZsYXRpb25SYXRlKS8xMDApO1xuICAgICAgY29uc3QgdG90YWxWYWx1ZSA9IHRoaXMuc2lwQW1vdW50ICogKCgxICsgcmV0dXJuUGVyY2VudGFnZSkgKiogdGltZUludmVzdGVkKTtcblxuICAgICAgdGhpcy5tb250aHNEYXRhLnB1c2goe1xuICAgICAgICBtb250aDogaSxcbiAgICAgICAgaW52ZXN0bWVudDogdGhpcy5zaXBBbW91bnQsXG4gICAgICAgIHZhbHVlOiB0b3RhbFZhbHVlLFxuICAgICAgICByZXR1cm5zOiB0b3RhbFZhbHVlIC0gdGhpcy5zaXBBbW91bnRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmludmVzdG1lbnQgPSB0aGlzLmludmVzdG1lbnQgKyB0aGlzLnNpcEFtb3VudDtcbiAgICAgIHRoaXMuY3VycmVudFZhbHVlID0gdGhpcy5jdXJyZW50VmFsdWUgKyB0b3RhbFZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMucmV0dXJucyA9IHRoaXMuY3VycmVudFZhbHVlIC0gdGhpcy5pbnZlc3RtZW50O1xuICB9XG5cbiAgdG9IdW1hblJlYWRhYmxlKG51bSkge1xuICAgIHJldHVybiBudW0udG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnLCcpO1xuICB9XG5cbiAgZ2V0IHRvdGFsSW52ZXN0bWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy50b0h1bWFuUmVhZGFibGUoKHRoaXMuaW52ZXN0bWVudCB8fCAwKS50b0ZpeGVkKDApKTtcbiAgfVxuXG4gIGdldCBlc3RpbWF0ZWRSZXR1cm5zKCkge1xuICAgIHJldHVybiB0aGlzLnRvSHVtYW5SZWFkYWJsZSgodGhpcy5yZXR1cm5zIHx8IDApLnRvRml4ZWQoMCkpO1xuICB9XG5cbiAgZ2V0IHRvdGFsVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9IdW1hblJlYWRhYmxlKCh0aGlzLmN1cnJlbnRWYWx1ZSB8fCAwKS50b0ZpeGVkKDApKTtcbiAgfVxuXG5cbn1cblxuY29uc3QgZ2V0TWV0YURhdGEgPSAoKSA9PiB7XG4gIHJldHVybiBwcm9qZWN0c0xpc3QuZmlsdGVyKChwKSA9PiBwLmlkID09PSAnc2lwLWNhbGN1bGF0b3InKVswXSB8fCB7fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW3NpcEFtb3VudCwgc2V0U2lwQW1vdW50XSA9IHVzZVN0YXRlKDUwMDApLFxuICBbcmV0dXJuUmF0ZSwgc2V0UmV0dXJuUmF0ZV0gPSB1c2VTdGF0ZSgxMiksXG4gIFt0aW1lUGVyaW9kLCBzZXRUaW1lUGVyaW9kXSA9IHVzZVN0YXRlKDEwKSxcbiAgW2luZmxhdGlvblJhdGUsIHNldEluZmxhdGlvblJhdGVdID0gdXNlU3RhdGUoNSk7XG5cbiAgY29uc3QgY2FsYyA9IG5ldyBTSVBDYWxjdWxhdG9yKHNpcEFtb3VudCwgcmV0dXJuUmF0ZSwgdGltZVBlcmlvZCwgaW5mbGF0aW9uUmF0ZSk7XG4gIGNvbnN0IG1ldGEgPSBnZXRNZXRhRGF0YSgpO1xuXG4gIHJldHVybiAoXG4gICAgPExheW91dD5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+e21ldGEudGl0bGV9PC90aXRsZT5cbiAgICAgICAgPG1ldGEgbmFtZT1cInRpdGxlXCIgY29udGVudD17IG1ldGEudGl0bGUgfSAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PXsgbWV0YS5kZXNjcmlwdGlvbiB9IC8+XG5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzp0aXRsZVwiIGNvbnRlbnQ9eyBtZXRhLnRpdGxlIH0gLz5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9eyBtZXRhLmRlc2NyaXB0aW9uIH0gLz5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzppbWFnZVwiIGNvbnRlbnQ9eyBtZXRhLmltYWdlVXJsIH0gLz5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzp1cmxcIiBjb250ZW50PXsgYCR7REVGQVVMVF9DT05GSUcuYmFzZVVybH0vcHJvamVjdHMvc2lwLWNhbGN1bGF0b3JgIH0gLz5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzpzaXRlX25hbWVcIiBjb250ZW50PXsgREVGQVVMVF9DT05GSUcuc2l0ZVRpdGxlIH0gLz5cblxuICAgICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnR5cGVcIiBjb250ZW50PVwiYXJ0aWNsZVwiIC8+XG4gICAgICAgIDxtZXRhIHByb3BlcnR5PVwiYXJ0aWNsZTpwdWJsaXNoZWRfdGltZVwiIGNvbnRlbnQ9eyBtZXRhLmRhdGUgfSAvPlxuICAgICAgICA8bWV0YSBwcm9wZXJ0eT1cImFydGljbGU6YXV0aG9yXCIgY29udGVudD17IG1ldGEuYXV0aG9yIH0gLz5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJhcnRpY2xlOnRhZ1wiIGNvbnRlbnQ9eyBtZXRhLnRhZ3MgfSAvPlxuXG4gICAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmNhcmRcIiBjb250ZW50PVwic3VtbWFyeVwiIC8+XG4gICAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOnRpdGxlXCIgY29udGVudD17IG1ldGEudGl0bGUgfSAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9eyBtZXRhLmRlc2NyaXB0aW9uIH0gLz5cbiAgICAgICAgeyBcbiAgICAgICAgICAvLzxtZXRhIG5hbWU9XCJ0d2l0dGVyOnNpdGVcIiBjb250ZW50PXsgYEAke0RFRkFVTFRfQ09ORklHLmF1dGhvclR3aXR0ZXJIYW5kbGV9YCB9IC8+IFxuICAgICAgICB9XG4gICAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmNyZWF0b3JcIiBjb250ZW50PXsgYEAke0RFRkFVTFRfQ09ORklHLmF1dGhvclR3aXR0ZXJIYW5kbGV9YCB9IC8+XG4gICAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmltYWdlXCIgY29udGVudD17IG1ldGEuaW1hZ2VVcmwgfSAvPlxuICAgICAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjppbWFnZTphbHRcIiBjb250ZW50PXsgbWV0YS50aXRsZSB9IC8+XG4gICAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmxhYmVsMVwiIHZhbHVlPVwiUmVhZGluZyB0aW1lXCIgLz5cbiAgICAgICAgPG1ldGEgbmFtZT1cInR3aXR0ZXI6ZGF0YTFcIiB2YWx1ZT17IGAke21ldGEucmVhZGluZ1RpbWV9IG1pbiByZWFkYCB9IC8+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT17dXRpbFN0eWxlcy5oZWFkaW5nTGd9PlNJUCBDYWxjdWxhdG9yPC9oMj5cblxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIFNtYWxsZXN0IGV2ZXIgZmluYW5jaWFsIGFkdmljZVxuICAgICAgICAgICogQ29tcG91bm5kaW5nIGlzIGEgcG93ZXJmdWwgcGhlbm9tZW5vblxuICAgICAgICAgICogU3RhcnQgc21hbGxcbiAgICAgICAgICAqIFN0YXJ0IGludmVzdGluZyBub3dcbiAgICAgICAgICAqIFJlYWQgYWJvdXQgU3lzdGVtYXRpYyBJbnZlc3RtZW50IFBsYW5zXG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIG10LTEwXCI+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc3BhY2UteS00XCI+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9ja1wiPk1vbnRobHkgSW52ZXN0bWVudCBBbW91bnQ8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIHZhbHVlPXtzaXBBbW91bnR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIHJvdW5kZWQgdGV4dC1ncmF5LTkwMCB0ZXh0LWxnXCJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0U2lwQW1vdW50KGUudGFyZ2V0LnZhbHVlKTsgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2tcIj5Fc3RpbWF0ZWQgWWVhcmx5IFJldHVybiAoJSk8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIHZhbHVlPXtyZXR1cm5SYXRlfSBcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgcm91bmRlZCB0ZXh0LWdyYXktOTAwIHRleHQtbGdcIlxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4geyBzZXRSZXR1cm5SYXRlKGUudGFyZ2V0LnZhbHVlKTsgfX0gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2tcIj5UaW1lIFBlcmlvZCAoaW4gWWVhcnMpPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiB2YWx1ZT17dGltZVBlcmlvZH0gXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIHJvdW5kZWQgdGV4dC1ncmF5LTkwMCB0ZXh0LWxnXCJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0VGltZVBlcmlvZChlLnRhcmdldC52YWx1ZSk7IH19IC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrXCI+SW5mbGF0aW9uIFJhdGUgKCUpPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiB2YWx1ZT17aW5mbGF0aW9uUmF0ZX0gXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIHJvdW5kZWQgdGV4dC1ncmF5LTkwMCB0ZXh0LWxnXCIgXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7IHNldEluZmxhdGlvblJhdGUoZS50YXJnZXQudmFsdWUpOyB9fSAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtNlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImZvY3VzOm91dGxpbmUtbm9uZSB0ZXh0LXNtIHctMjQgcHktMyByb3VuZGVkLW1kIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBiZy1ibHVlLTUwMCByaW5nLTJcIj5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1yb3dzLTMgZ2FwLTQgcGwtOFwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTEgYmctZ3JheS05MDAgYm9yZGVyIGJvcmRlci1ncmF5LTgwMCByb3VuZGVkIHAtNCBtbC00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0zeGwgdGV4dC1ncmF5LTYwMFwiPlJzLiB7Y2FsYy50b3RhbEludmVzdG1lbnR9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+VG90YWwgSW52ZXN0bWVudDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNwYW4tMSBiZy1ncmF5LTkwMCBib3JkZXIgYm9yZGVyLWdyYXktODAwIHJvdW5kZWQgcC00IG1sLTRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCB0ZXh0LWdyYXktNjAwXCI+UnMuIHtjYWxjLmVzdGltYXRlZFJldHVybnN9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+RXN0aW1hdGVkIFJldHVybnM8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTEgYmctZ3JheS05MDAgYm9yZGVyIGJvcmRlci1ncmF5LTgwMCByb3VuZGVkIHAtNCBtbC00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0zeGwgdGV4dC1ncmF5LTYwMFwiPlJzLiB7Y2FsYy50b3RhbFZhbHVlfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlRvdGFsIFZhbHVlPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyoqIDxkaXYgY2xhc3M9XCJtb250aGx5IGJyZWFrZG93blwiPjwvZGl2PiAqKi99XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9MYXlvdXQ+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/projects/sip-calculator.js\n");

/***/ })

})