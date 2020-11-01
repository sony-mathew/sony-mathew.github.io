webpackHotUpdate_N_E("pages/posts/[id]",{

/***/ "./components/layout.js":
/*!******************************!*\
  !*** ./components/layout.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Layout; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _layout_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout.module.scss */ \"./components/layout.module.scss\");\n/* harmony import */ var _layout_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_layout_module_scss__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/sonymathew/Workspace/hobby/sony-mathew.github.io/site/components/layout.js\",\n    _s = $RefreshSig$();\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n\nfunction DesktopLayout() {\n  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(\"div\", {\n    className: \"flex flex-row mb-10\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10,\n      columnNumber: 7\n    }\n  }, __jsx(\"div\", {\n    className: \"flex-none text-gray-700 pl-0\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 9\n    }\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"/\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 11\n    }\n  }, __jsx(\"a\", {\n    className: \"text-lg text-gray-600 hover:no-underline\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 13,\n      columnNumber: 13\n    }\n  }, \"The Usual \\uD83C\\uDF99\"))), __jsx(\"div\", {\n    className: \"flex flex-grow justify-center gap-x-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 18,\n      columnNumber: 9\n    }\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"/blog\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 19,\n      columnNumber: 11\n    }\n  }, __jsx(\"a\", {\n    className: \"nav-item text-lg text-gray-600 hover:no-underline px-2 pb-1\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 20,\n      columnNumber: 13\n    }\n  }, \"Blog\")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"/projects\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 22,\n      columnNumber: 11\n    }\n  }, __jsx(\"a\", {\n    className: \"nav-item text-lg text-gray-600 hover:no-underline px-2 pb-1\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 23,\n      columnNumber: 13\n    }\n  }, \"Projects\"))), __jsx(\"div\", {\n    className: \"flex flex-row-reverse gap-x-4 mt-2\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 28,\n      columnNumber: 9\n    }\n  }, __jsx(SocialButtons, {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 29,\n      columnNumber: 11\n    }\n  }))));\n}\n\n_c = DesktopLayout;\n\nfunction MobileLayout() {\n  _s();\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      navMenuOpened = _useState[0],\n      setNavMenuOpened = _useState[1];\n\n  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(MobileNavMenuSidebar, {\n    navMenuOpened: navMenuOpened,\n    setNavMenuOpened: setNavMenuOpened,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 7\n    }\n  }), __jsx(\"ul\", {\n    className: \"inline-flex m-0\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 44,\n      columnNumber: 7\n    }\n  }, __jsx(\"li\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 45,\n      columnNumber: 9\n    }\n  }, __jsx(\"button\", {\n    className: \"py-2 text-gray-600 appearance-none focus:outline-none\",\n    onClick: function onClick() {\n      return setNavMenuOpened(true);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 46,\n      columnNumber: 11\n    }\n  }, __jsx(\"svg\", {\n    className: \"fill-current h-3 w-3\",\n    viewBox: \"0 0 20 20\",\n    xmlns: \"http://www.w3.org/2000/svg\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 47,\n      columnNumber: 13\n    }\n  }, __jsx(\"title\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 48,\n      columnNumber: 15\n    }\n  }, \"Menu\"), __jsx(\"path\", {\n    d: \"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 49,\n      columnNumber: 15\n    }\n  })))), __jsx(\"li\", {\n    className: \"mx-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 53,\n      columnNumber: 9\n    }\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"/\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 54,\n      columnNumber: 11\n    }\n  }, __jsx(\"a\", {\n    className: \"text-lg text-gray-600 hover:no-underline py-1\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 55,\n      columnNumber: 13\n    }\n  }, \"The Usual \\uD83C\\uDF99\")))));\n}\n\n_s(MobileLayout, \"TMrHzecEOe1wngVCASrr6tKdAi8=\");\n\n_c2 = MobileLayout;\n\nfunction MobileNavMenuSidebar(_ref) {\n  var navMenuOpened = _ref.navMenuOpened,\n      setNavMenuOpened = _ref.setNavMenuOpened;\n\n  if (!navMenuOpened) {\n    return null;\n  }\n\n  return __jsx(\"div\", {\n    className: \"w-full absolute top-0 left-0 z-10 m-0 bg-gray-700\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 71,\n      columnNumber: 5\n    }\n  }, __jsx(\"div\", {\n    className: \"absolute top-0 right-0 m-4\",\n    onClick: function onClick() {\n      return setNavMenuOpened(false);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 72,\n      columnNumber: 7\n    }\n  }, \"Close\"), __jsx(\"div\", {\n    className: \"flex flex-col m-4 gap-4\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 73,\n      columnNumber: 7\n    }\n  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"/\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 74,\n      columnNumber: 9\n    }\n  }, __jsx(\"a\", {\n    className: \"text-lg text-gray-400 hover:no-underline px-2\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 75,\n      columnNumber: 11\n    }\n  }, \"Home\")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"/blog\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 79,\n      columnNumber: 9\n    }\n  }, __jsx(\"a\", {\n    className: \"text-lg text-gray-400 hover:no-underline px-2\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 80,\n      columnNumber: 11\n    }\n  }, \"Blog\")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"/projects\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 84,\n      columnNumber: 9\n    }\n  }, __jsx(\"a\", {\n    className: \"text-lg text-gray-400 hover:no-underline px-2\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 85,\n      columnNumber: 11\n    }\n  }, \"Projects\")), __jsx(\"div\", {\n    className: \"flex flex-row gap-x-4 px-2\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 89,\n      columnNumber: 9\n    }\n  }, __jsx(SocialButtons, {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 90,\n      columnNumber: 11\n    }\n  }))));\n}\n\n_c3 = MobileNavMenuSidebar;\n\nfunction SocialButtons() {\n  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"https://github.com/sony-mathew\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 100,\n      columnNumber: 7\n    }\n  }, __jsx(\"a\", {\n    target: \"_blank\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 101,\n      columnNumber: 9\n    }\n  }, __jsx(\"img\", {\n    src: \"/icons/github.svg\",\n    className: \"\".concat(_layout_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.icon),\n    alt: \"Github\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 102,\n      columnNumber: 11\n    }\n  }))), __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"https://twitter.com/sonymathew_\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 109,\n      columnNumber: 7\n    }\n  }, __jsx(\"a\", {\n    target: \"_blank\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 110,\n      columnNumber: 9\n    }\n  }, __jsx(\"img\", {\n    src: \"/icons/twitter.svg\",\n    className: \"\".concat(_layout_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.icon),\n    alt: \"Twitter\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 111,\n      columnNumber: 11\n    }\n  }))), __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"https://www.instagram.com/sonymathew_\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 118,\n      columnNumber: 7\n    }\n  }, __jsx(\"a\", {\n    target: \"_blank\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 119,\n      columnNumber: 9\n    }\n  }, __jsx(\"img\", {\n    src: \"/icons/instagram.svg\",\n    className: \"\".concat(_layout_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.icon),\n    alt: \"Instagram\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 120,\n      columnNumber: 11\n    }\n  }))), __jsx(next_link__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    href: \"https://www.linkedin.com/in/sonymathew\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 127,\n      columnNumber: 7\n    }\n  }, __jsx(\"a\", {\n    target: \"_blank\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 128,\n      columnNumber: 9\n    }\n  }, __jsx(\"img\", {\n    src: \"/icons/linkedin.svg\",\n    className: \"\".concat(_layout_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.icon),\n    alt: \"LinkedIn\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 129,\n      columnNumber: 11\n    }\n  }))));\n}\n\n_c4 = SocialButtons;\nfunction Layout(_ref2) {\n  var children = _ref2.children,\n      home = _ref2.home;\n  return __jsx(\"div\", {\n    className: _layout_module_scss__WEBPACK_IMPORTED_MODULE_3___default.a.container,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 142,\n      columnNumber: 5\n    }\n  }, __jsx(\"header\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 143,\n      columnNumber: 7\n    }\n  }, __jsx(\"div\", {\n    className: \"hidden lg:block\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 144,\n      columnNumber: 9\n    }\n  }, __jsx(DesktopLayout, {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 145,\n      columnNumber: 11\n    }\n  })), __jsx(\"div\", {\n    className: \"block lg:hidden\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 147,\n      columnNumber: 9\n    }\n  }, __jsx(MobileLayout, {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 148,\n      columnNumber: 11\n    }\n  }))), __jsx(\"main\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 151,\n      columnNumber: 7\n    }\n  }, children));\n}\n_c5 = Layout;\n\nvar _c, _c2, _c3, _c4, _c5;\n\n$RefreshReg$(_c, \"DesktopLayout\");\n$RefreshReg$(_c2, \"MobileLayout\");\n$RefreshReg$(_c3, \"MobileNavMenuSidebar\");\n$RefreshReg$(_c4, \"SocialButtons\");\n$RefreshReg$(_c5, \"Layout\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9sYXlvdXQuanM/MDlhNyJdLCJuYW1lcyI6WyJEZXNrdG9wTGF5b3V0IiwiTW9iaWxlTGF5b3V0IiwidXNlU3RhdGUiLCJuYXZNZW51T3BlbmVkIiwic2V0TmF2TWVudU9wZW5lZCIsIk1vYmlsZU5hdk1lbnVTaWRlYmFyIiwiU29jaWFsQnV0dG9ucyIsInN0eWxlcyIsImljb24iLCJMYXlvdXQiLCJjaGlsZHJlbiIsImhvbWUiLCJjb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNBLGFBQVQsR0FBeUI7QUFDdkIsU0FDRSxtRUFFRTtBQUFLLGFBQVMsRUFBQyxxQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUMsOEJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsR0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBRyxhQUFTLEVBQUMsMENBQWI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw4QkFERixDQURGLENBREYsRUFRRTtBQUFLLGFBQVMsRUFBQyx1Q0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxnREFBRDtBQUFNLFFBQUksRUFBQyxPQUFYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFHLGFBQVMsRUFBQyw2REFBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsQ0FERixFQUlFLE1BQUMsZ0RBQUQ7QUFBTSxRQUFJLEVBQUMsV0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBRyxhQUFTLEVBQUMsNkRB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Q0UsTUFBQyxZQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixDQUpGLENBREYsRUFTRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQU9GLFFBQVAsQ0FURixDQURGO0FBYUQ7TUFkdUJELE0iLCJmaWxlIjoiLi9jb21wb25lbnRzL2xheW91dC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi9sYXlvdXQubW9kdWxlLnNjc3NcIjtcblxuZnVuY3Rpb24gRGVza3RvcExheW91dCgpIHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgey8qIEZvciBEZXNrdG9wICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IG1iLTEwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1ub25lIHRleHQtZ3JheS03MDAgcGwtMFwiPlxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJ0ZXh0LWxnIHRleHQtZ3JheS02MDAgaG92ZXI6bm8tdW5kZXJsaW5lXCI+XG4gICAgICAgICAgICAgIFRoZSBVc3VhbCDwn46ZXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtZ3JvdyBqdXN0aWZ5LWNlbnRlciBnYXAteC00XCI+XG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9ibG9nXCI+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJuYXYtaXRlbSB0ZXh0LWxnIHRleHQtZ3JheS02MDAgaG92ZXI6bm8tdW5kZXJsaW5lIHB4LTIgcGItMVwiPkJsb2c8L2E+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvcHJvamVjdHNcIj5cbiAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cIm5hdi1pdGVtIHRleHQtbGcgdGV4dC1ncmF5LTYwMCBob3Zlcjpuby11bmRlcmxpbmUgcHgtMiBwYi0xXCI+XG4gICAgICAgICAgICAgIFByb2plY3RzXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93LXJldmVyc2UgZ2FwLXgtNCBtdC0yXCI+XG4gICAgICAgICAgPFNvY2lhbEJ1dHRvbnMgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKVxufVxuXG5mdW5jdGlvbiBNb2JpbGVMYXlvdXQoKSB7XG4gIGNvbnN0IFtuYXZNZW51T3BlbmVkLCBzZXROYXZNZW51T3BlbmVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7LyogRm9yIE1vYmlsZSAqL31cbiAgICAgIDxNb2JpbGVOYXZNZW51U2lkZWJhciBuYXZNZW51T3BlbmVkPXtuYXZNZW51T3BlbmVkfSBzZXROYXZNZW51T3BlbmVkPXtzZXROYXZNZW51T3BlbmVkfSAvPlxuXG4gICAgICA8dWwgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggbS0wXCI+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInB5LTIgdGV4dC1ncmF5LTYwMCBhcHBlYXJhbmNlLW5vbmUgZm9jdXM6b3V0bGluZS1ub25lXCIgb25DbGljaz17KCkgPT4gc2V0TmF2TWVudU9wZW5lZCh0cnVlKX0+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImZpbGwtY3VycmVudCBoLTMgdy0zXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgPHRpdGxlPk1lbnU8L3RpdGxlPlxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAgM2gyMHYySDBWM3ptMCA2aDIwdjJIMFY5em0wIDZoMjB2Mkgwdi0yelwiIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9saT5cbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cIm14LTRcIj5cbiAgICAgICAgICA8TGluayBocmVmPVwiL1wiPlxuICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwidGV4dC1sZyB0ZXh0LWdyYXktNjAwIGhvdmVyOm5vLXVuZGVybGluZSBweS0xXCI+XG4gICAgICAgICAgICAgIFRoZSBVc3VhbCDwn46ZXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICA8Lz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTW9iaWxlTmF2TWVudVNpZGViYXIoeyBuYXZNZW51T3BlbmVkLCBzZXROYXZNZW51T3BlbmVkIH0pIHtcbiAgaWYgKCFuYXZNZW51T3BlbmVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGFic29sdXRlIHRvcC0wIGxlZnQtMCB6LTEwIG0tMCBiZy1ncmF5LTcwMFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIG0tNFwiIG9uQ2xpY2s9eygpID0+IHNldE5hdk1lbnVPcGVuZWQoZmFsc2UpfT5DbG9zZTwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG0tNCBnYXAtNFwiPlxuICAgICAgICA8TGluayBocmVmPVwiL1wiPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInRleHQtbGcgdGV4dC1ncmF5LTQwMCBob3Zlcjpuby11bmRlcmxpbmUgcHgtMlwiPlxuICAgICAgICAgICAgSG9tZVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgICA8TGluayBocmVmPVwiL2Jsb2dcIj5cbiAgICAgICAgICA8YSBjbGFzc05hbWU9XCJ0ZXh0LWxnIHRleHQtZ3JheS00MDAgaG92ZXI6bm8tdW5kZXJsaW5lIHB4LTJcIj5cbiAgICAgICAgICAgIEJsb2dcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvTGluaz5cbiAgICAgICAgPExpbmsgaHJlZj1cIi9wcm9qZWN0c1wiPlxuICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInRleHQtbGcgdGV4dC1ncmF5LTQwMCBob3Zlcjpuby11bmRlcmxpbmUgcHgtMlwiPlxuICAgICAgICAgICAgUHJvamVjdHNcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvTGluaz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGdhcC14LTQgcHgtMlwiPlxuICAgICAgICAgIDxTb2NpYWxCdXR0b25zIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFNvY2lhbEJ1dHRvbnMoKSB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxMaW5rIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vc29ueS1tYXRoZXdcIj5cbiAgICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiL2ljb25zL2dpdGh1Yi5zdmdcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuaWNvbn1gfVxuICAgICAgICAgICAgYWx0PVwiR2l0aHViXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2E+XG4gICAgICA8L0xpbms+XG4gICAgICA8TGluayBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9zb255bWF0aGV3X1wiPlxuICAgICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBzcmM9XCIvaWNvbnMvdHdpdHRlci5zdmdcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuaWNvbn1gfVxuICAgICAgICAgICAgYWx0PVwiVHdpdHRlclwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9hPlxuICAgICAgPC9MaW5rPlxuICAgICAgPExpbmsgaHJlZj1cImh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vc29ueW1hdGhld19cIj5cbiAgICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiL2ljb25zL2luc3RhZ3JhbS5zdmdcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtzdHlsZXMuaWNvbn1gfVxuICAgICAgICAgICAgYWx0PVwiSW5zdGFncmFtXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2E+XG4gICAgICA8L0xpbms+XG4gICAgICA8TGluayBocmVmPVwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL3NvbnltYXRoZXdcIj5cbiAgICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgc3JjPVwiL2ljb25zL2xpbmtlZGluLnN2Z1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Ake3N0eWxlcy5pY29ufWB9XG4gICAgICAgICAgICBhbHQ9XCJMaW5rZWRJblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9hPlxuICAgICAgPC9MaW5rPlxuICAgIDwvPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYXlvdXQoeyBjaGlsZHJlbiwgaG9tZSB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgPGhlYWRlcj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4gbGc6YmxvY2tcIj5cbiAgICAgICAgICA8RGVza3RvcExheW91dCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJibG9jayBsZzpoaWRkZW5cIj5cbiAgICAgICAgICA8TW9iaWxlTGF5b3V0IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG4gICAgICA8bWFpbj57Y2hpbGRyZW59PC9tYWluPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/layout.js\n");

/***/ })

})