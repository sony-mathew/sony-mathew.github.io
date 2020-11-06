webpackHotUpdate_N_E("pages/index",{

/***/ "./lib/subscribe_newsletter.js":
/*!*************************************!*\
  !*** ./lib/subscribe_newsletter.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SubscribeNewsletter; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_objectDestructuringEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectDestructuringEmpty */ \"./node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _config_default_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config/default_config */ \"./config/default_config.js\");\n\n\n\n\nvar _jsxFileName = \"/Users/sonymathew/Workspace/hobby/sony-mathew.github.io/site/lib/subscribe_newsletter.js\",\n    _s = $RefreshSig$();\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;\n\n // import { setCookie, getCookie } from'./cookie_helper';\n\nfunction sendSusbcribeRequest(email) {\n  return fetch(\"\".concat(_config_default_config__WEBPACK_IMPORTED_MODULE_4__[\"default\"].sheetsUrl, \"?email=\").concat(email));\n}\n\nfunction SubscribeBlock(_ref) {\n  _s();\n\n  Object(_babel_runtime_helpers_esm_objectDestructuringEmpty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_ref);\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])(null),\n      email = _useState[0],\n      setNewEmail = _useState[1];\n\n  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])(false),\n      errors = _useState2[0],\n      setErrors = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])(false),\n      subscribed = _useState3[0],\n      setSubscribed = _useState3[1];\n\n  var onSave = /*#__PURE__*/function () {\n    var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(emailId) {\n      var sanitizedEmail, emailRegex, resp;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              sanitizedEmail = emailId.trim().toLowerCase();\n              emailRegex = /^(([^<>()\\[\\]\\.,;:\\s@\\\"]+(\\.[^<>()\\[\\]\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@(([^<>()[\\]\\.,;:\\s@\\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\\"]{2,})$/i;\n\n              if (!emailRegex.test(sanitizedEmail)) {\n                _context.next = 11;\n                break;\n              }\n\n              setErrors(false);\n              _context.next = 6;\n              return sendSusbcribeRequest(sanitizedEmail);\n\n            case 6:\n              resp = _context.sent;\n              console.log(resp);\n\n              if (resp.status == 200) {\n                // setCookie('newsletter', 'true', 180);\n                setSubscribed(true);\n              } else {\n                setErrors(true);\n              }\n\n              _context.next = 12;\n              break;\n\n            case 11:\n              setErrors(true);\n\n            case 12:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function onSave(_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  if (subscribed) {\n    return __jsx(\"div\", {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 34,\n        columnNumber: 7\n      }\n    }, \"Thank you for subscribing. You must be really tired. Go back to sleep.\");\n  } else {\n    return __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(\"div\", {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 41,\n        columnNumber: 9\n      }\n    }, \"I write about technology, career, travel and philosophy.\"), __jsx(\"div\", {\n      className: \"flex flex-row justify-center place-items-center gap-6\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 44,\n        columnNumber: 9\n      }\n    }, __jsx(\"input\", {\n      onChange: function onChange(e) {\n        return setNewEmail(e.target.value);\n      },\n      type: \"email\",\n      className: (errors ? 'border-red-600' : 'border-gray-600') + \" rounded border focus:outline-none text-gray-600 px-4 py-2\",\n      required: true,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 45,\n        columnNumber: 11\n      }\n    }), __jsx(\"button\", {\n      onClick: function onClick() {\n        return onSave(email);\n      },\n      className: \"relative inline-flex rounded  items-center px-4 py-2 border border-gray-600 text-gray-200 bg-gray-700  hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 54,\n        columnNumber: 11\n      }\n    }, \"Subscribe\")));\n  }\n}\n\n_s(SubscribeBlock, \"pUe/T7sIddNfZd542cWnRqG++rU=\");\n\n_c = SubscribeBlock;\nfunction SubscribeNewsletter() {\n  var alreadySubscribed = false; //(getCookie('newsletter').length > 0);\n\n  if (alreadySubscribed) {\n    return __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null);\n  } else {\n    return __jsx(\"div\", {\n      className: \"border-t border-gray-600 flex flex-col justify-center place-items-center gap-6 p-8 mt-8\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 76,\n        columnNumber: 7\n      }\n    }, __jsx(SubscribeBlock, {\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 77,\n        columnNumber: 9\n      }\n    }));\n  }\n}\n_c2 = SubscribeNewsletter;\n\nvar _c, _c2;\n\n$RefreshReg$(_c, \"SubscribeBlock\");\n$RefreshReg$(_c2, \"SubscribeNewsletter\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbGliL3N1YnNjcmliZV9uZXdzbGV0dGVyLmpzPzI0YmMiXSwibmFtZXMiOlsic2VuZFN1c2JjcmliZVJlcXVlc3QiLCJlbWFpbCIsImZldGNoIiwiREVGQVVMVF9DT05GSUciLCJzaGVldHNVcmwiLCJTdWJzY3JpYmVCbG9jayIsInVzZVN0YXRlIiwic2V0TmV3RW1haWwiLCJlcnJvcnMiLCJzZXRFcnJvcnMiLCJzdWJzY3JpYmVkIiwic2V0U3Vic2NyaWJlZCIsIm9uU2F2ZSIsImVtYWlsSWQiLCJzYW5pdGl6ZWRFbWFpbCIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsImVtYWlsUmVnZXgiLCJ0ZXN0IiwicmVzcCIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXMiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJTdWJzY3JpYmVOZXdzbGV0dGVyIiwiYWxyZWFkeVN1YnNjcmliZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0NBRUE7O0FBRUEsU0FBU0Esb0JBQVQsQ0FBOEJDLEtBQTlCLEVBQXFDO0FBQ25DLFNBQU9DLEtBQUssV0FBSUMsOERBQWMsQ0FBQ0MsU0FBbkIsb0JBQXNDSCxLQUF0QyxFQUFaO0FBQ0Q7O0FBRUQsU0FBU0ksY0FBVCxPQUE4QjtBQUFBOztBQUFBOztBQUFBLGtCQUNDQyxzREFBUSxDQUFDLElBQUQsQ0FEVDtBQUFBLE1BQ3JCTCxLQURxQjtBQUFBLE1BQ2RNLFdBRGM7O0FBQUEsbUJBRUFELHNEQUFRLENBQUMsS0FBRCxDQUZSO0FBQUEsTUFFckJFLE1BRnFCO0FBQUEsTUFFYkMsU0FGYTs7QUFBQSxtQkFHUUgsc0RBQVEsQ0FBQyxLQUFELENBSGhCO0FBQUEsTUFHckJJLFVBSHFCO0FBQUEsTUFHVEMsYUFIUzs7QUFLNUIsTUFBTUMsTUFBTTtBQUFBLGlNQUFHLGlCQUFPQyxPQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNQQyw0QkFETyxHQUNVRCxPQUFPLENBQUNFLElBQVIsR0FBZUMsV0FBZixFQURWO0FBRVBDLHdCQUZPLEdBRU0sd0hBRk47O0FBQUEsbUJBR1ZBLFVBQVUsQ0FBQ0MsSUFBWCxDQUFnQkosY0FBaEIsQ0FIVTtBQUFBO0FBQUE7QUFBQTs7QUFJWEwsdUJBQVMsQ0FBQyxLQUFELENBQVQ7QUFKVztBQUFBLHFCQUtRVCxvQkFBb0IsQ0FBQ2MsY0FBRCxDQUw1Qjs7QUFBQTtBQUtMSyxrQkFMSztBQU1YQyxxQkFBTyxDQUFDQyxHQUFSLENBQVlGLElBQVo7O0FBQ0Esa0JBQUlBLElBQUksQ0FBQ0csTUFBTCxJQUFlLEdBQW5CLEVBQXdCO0FBQ3RCO0FBQ0FYLDZCQUFhLENBQUMsSUFBRCxDQUFiO0FBQ0QsZUFIRCxNQUdPO0FBQ0xGLHlCQUFTLENBQUMsSUFBRCxDQUFUO0FBQ0Q7O0FBWlU7QUFBQTs7QUFBQTtBQWNYQSx1QkFBUyxDQUFDLElBQUQsQ0FBVDs7QUFkVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFIOztBQUFBLG9CQUFORyxNQUFNO0FBQUE7QUFBQTtBQUFBLEtBQVo7O0FBa0JBLE1BQUdGLFVBQUgsRUFBZTtBQUNiLFdBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnRkFERjtBQUtELEdBTkQsTUFNTztBQUNMLFdBQ0UsbUVBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrRUFERixFQUlFO0FBQUssZUFBUyxFQUFDLHVEQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FDRTtBQUNFLGNBQVEsRUFBRSxrQkFBQ2EsQ0FBRDtBQUFBLGVBQU9oQixXQUFXLENBQUNnQixDQUFDLENBQUNDLE1BQUYsQ0FBU0MsS0FBVixDQUFsQjtBQUFBLE9BRFo7QUFFRSxVQUFJLEVBQUMsT0FGUDtBQUdFLGVBQVMsRUFDUCxDQUFDakIsTUFBTSxHQUFHLGdCQUFILEdBQXNCLGlCQUE3QixJQUNBLDREQUxKO0FBT0UsY0FBUSxNQVBWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFERixFQVVFO0FBQ0UsYUFBTyxFQUFFO0FBQUEsZUFBTUksTUFBTSxDQUFDWCxLQUFELENBQVo7QUFBQSxPQURYO0FBRUUsZUFBUyxFQUFDLGlLQUZaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBVkYsQ0FKRixDQURGO0FBMEJEO0FBQ0Y7O0dBekRRSSxjOztLQUFBQSxjO0FBNERNLFNBQVNxQixtQkFBVCxHQUErQjtBQUM1QyxNQUFNQyxpQkFBaUIsR0FBRyxLQUExQixDQUQ0QyxDQUNYOztBQUVqQyxNQUFJQSxpQkFBSixFQUF1QjtBQUNyQixXQUFRLGtFQUFSO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsV0FDRTtBQUFLLGVBQVMsRUFBQyx5RkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQ0UsTUFBQyxjQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFERixDQURGO0FBS0Q7QUFDRjtNQVp1QkQsbUIiLCJmaWxlIjoiLi9saWIvc3Vic2NyaWJlX25ld3NsZXR0ZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBERUZBVUxUX0NPTkZJRyBmcm9tICcuLi9jb25maWcvZGVmYXVsdF9jb25maWcnO1xuLy8gaW1wb3J0IHsgc2V0Q29va2llLCBnZXRDb29raWUgfSBmcm9tJy4vY29va2llX2hlbHBlcic7XG5cbmZ1bmN0aW9uIHNlbmRTdXNiY3JpYmVSZXF1ZXN0KGVtYWlsKSB7XG4gIHJldHVybiBmZXRjaChgJHtERUZBVUxUX0NPTkZJRy5zaGVldHNVcmx9P2VtYWlsPSR7ZW1haWx9YCk7XG59XG5cbmZ1bmN0aW9uIFN1YnNjcmliZUJsb2NrKHsgIH0pIHtcbiAgY29uc3QgW2VtYWlsLCBzZXROZXdFbWFpbF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3N1YnNjcmliZWQsIHNldFN1YnNjcmliZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBcbiAgY29uc3Qgb25TYXZlID0gYXN5bmMgKGVtYWlsSWQpID0+IHtcbiAgICBjb25zdCBzYW5pdGl6ZWRFbWFpbCA9IGVtYWlsSWQudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZW1haWxSZWdleCA9IC9eKChbXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVxcW1xcXVxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFtePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl0rXFwuKStbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdezIsfSkkL2k7XG4gICAgaWYoZW1haWxSZWdleC50ZXN0KHNhbml0aXplZEVtYWlsKSkge1xuICAgICAgc2V0RXJyb3JzKGZhbHNlKTtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBzZW5kU3VzYmNyaWJlUmVxdWVzdChzYW5pdGl6ZWRFbWFpbCk7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICAgIGlmIChyZXNwLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgLy8gc2V0Q29va2llKCduZXdzbGV0dGVyJywgJ3RydWUnLCAxODApO1xuICAgICAgICBzZXRTdWJzY3JpYmVkKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0RXJyb3JzKHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRFcnJvcnModHJ1ZSk7XG4gICAgfVxuICB9O1xuXG4gIGlmKHN1YnNjcmliZWQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgVGhhbmsgeW91IGZvciBzdWJzY3JpYmluZy4gWW91IG11c3QgYmUgcmVhbGx5IHRpcmVkLiBHbyBiYWNrIHRvIHNsZWVwLlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICBJIHdyaXRlIGFib3V0IHRlY2hub2xvZ3ksIGNhcmVlciwgdHJhdmVsIGFuZCBwaGlsb3NvcGh5LlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGp1c3RpZnktY2VudGVyIHBsYWNlLWl0ZW1zLWNlbnRlciBnYXAtNlwiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdFbWFpbChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXsgXG4gICAgICAgICAgICAgIChlcnJvcnMgPyAnYm9yZGVyLXJlZC02MDAnIDogJ2JvcmRlci1ncmF5LTYwMCcpICsgXG4gICAgICAgICAgICAgIFwiIHJvdW5kZWQgYm9yZGVyIGZvY3VzOm91dGxpbmUtbm9uZSB0ZXh0LWdyYXktNjAwIHB4LTQgcHktMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TYXZlKGVtYWlsKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIGlubGluZS1mbGV4IHJvdW5kZWQgXG4gICAgICAgICAgICAgIGl0ZW1zLWNlbnRlciBweC00IHB5LTIgYm9yZGVyIGJvcmRlci1ncmF5LTYwMCB0ZXh0LWdyYXktMjAwIGJnLWdyYXktNzAwIFxuICAgICAgICAgICAgICBob3ZlcjpiZy1ncmF5LTcwMCBob3ZlcjpiZy1vcGFjaXR5LTUwIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgU3Vic2NyaWJlXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN1YnNjcmliZU5ld3NsZXR0ZXIoKSB7XG4gIGNvbnN0IGFscmVhZHlTdWJzY3JpYmVkID0gZmFsc2U7IC8vKGdldENvb2tpZSgnbmV3c2xldHRlcicpLmxlbmd0aCA+IDApO1xuXG4gIGlmIChhbHJlYWR5U3Vic2NyaWJlZCkge1xuICAgIHJldHVybiAoPD48Lz4pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci10IGJvcmRlci1ncmF5LTYwMCBmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIHBsYWNlLWl0ZW1zLWNlbnRlciBnYXAtNiBwLTggbXQtOFwiPlxuICAgICAgICA8U3Vic2NyaWJlQmxvY2sgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/subscribe_newsletter.js\n");

/***/ })

})