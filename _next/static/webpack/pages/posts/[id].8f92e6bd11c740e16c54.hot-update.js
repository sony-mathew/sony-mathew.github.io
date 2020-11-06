webpackHotUpdate_N_E("pages/posts/[id]",{

/***/ "./components/meta_data.js":
/*!*********************************!*\
  !*** ./components/meta_data.js ***!
  \*********************************/
/*! exports provided: MetaData, ArticleMeta */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MetaData\", function() { return MetaData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ArticleMeta\", function() { return ArticleMeta; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_default_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/default_config */ \"./config/default_config.js\");\nvar _jsxFileName = \"/Users/sonymathew/Workspace/hobby/sony-mathew.github.io/site/components/meta_data.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nfunction MetaData() {\n  var description = \" \".concat(_config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].siteTitle, \" by \").concat(_config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].author);\n  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(\"meta\", {\n    name: \"description\",\n    content: description,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 8,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:title\",\n    content: description,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 9,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:creator\",\n    content: \"@\".concat(_config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authorTwitterHandle),\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:image\",\n    content: \"\".concat(_config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].baseUrl).concat(_config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].siteImageUrl),\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 7\n    }\n  }));\n}\n_c = MetaData;\nfunction ArticleMeta(_ref) {\n  var article = _ref.article;\n  var publishedDate = new Date(article.date).toDateString();\n  var extendedTitle = \"\".concat(article.title, \" by \").concat(article.author, \" | \").concat(publishedDate, \" | \").concat(_config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].siteTitle);\n  var imageUrl = \"\".concat(_config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].baseUrl).concat(_config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].siteImageUrl);\n  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(\"title\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 26,\n      columnNumber: 7\n    }\n  }, extendedTitle), __jsx(\"meta\", {\n    name: \"title\",\n    content: extendedTitle,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 27,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"description\",\n    content: article.description,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 28,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:title\",\n    content: article.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 30,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:description\",\n    content: article.description,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 31,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:image\",\n    content: imageUrl,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 32,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:url\",\n    content: \"\".concat(_config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].baseUrl, \"/posts/\").concat(article.id),\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 33,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:site_name\",\n    content: _config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].siteTitle,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 34,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    property: \"og:type\",\n    content: \"article\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 36,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    property: \"article:published_time\",\n    content: publishedDate,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 37,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"article:author\",\n    content: article.author,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 38,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"article:tag\",\n    content: article.tags,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 39,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:card\",\n    content: \"summary\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 41,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:title\",\n    content: article.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:description\",\n    content: article.description,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 43,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:creator\",\n    content: \"@\".concat(_config_default_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].authorTwitterHandle),\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 47,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:image\",\n    content: imageUrl,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 48,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:image:alt\",\n    content: article.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 49,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:label1\",\n    value: \"Reading time\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 50,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"twitter:data1\",\n    value: \"\".concat(article.readingTime, \" min read\"),\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 51,\n      columnNumber: 7\n    }\n  }), __jsx(\"meta\", {\n    name: \"robots\",\n    content: \"index,follow,max-image-preview:large\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 53,\n      columnNumber: 7\n    }\n  }));\n}\n_c2 = ArticleMeta;\n\nvar _c, _c2;\n\n$RefreshReg$(_c, \"MetaData\");\n$RefreshReg$(_c2, \"ArticleMeta\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9tZXRhX2RhdGEuanM/NDVhNSJdLCJuYW1lcyI6WyJNZXRhRGF0YSIsImRlc2NyaXB0aW9uIiwiREVGQVVMVF9DT05GSUciLCJzaXRlVGl0bGUiLCJhdXRob3IiLCJhdXRob3JUd2l0dGVySGFuZGxlIiwiYmFzZVVybCIsInNpdGVJbWFnZVVybCIsIkFydGljbGVNZXRhIiwiYXJ0aWNsZSIsInB1Ymxpc2hlZERhdGUiLCJEYXRlIiwiZGF0ZSIsInRvRGF0ZVN0cmluZyIsImV4dGVuZGVkVGl0bGUiLCJ0aXRsZSIsImltYWdlVXJsIiwiaWQiLCJ0YWdzIiwicmVhZGluZ1RpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBRU8sU0FBU0EsUUFBVCxHQUFvQjtBQUN6QixNQUFNQyxXQUFXLGNBQU9DLDhEQUFjLENBQUNDLFNBQXRCLGlCQUFzQ0QsOERBQWMsQ0FBQ0UsTUFBckQsQ0FBakI7QUFFQSxTQUNFLG1FQUNFO0FBQU0sUUFBSSxFQUFDLGFBQVg7QUFBeUIsV0FBTyxFQUFHSCxXQUFuQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsRUFFRTtBQUFNLFlBQVEsRUFBQyxVQUFmO0FBQTBCLFdBQU8sRUFBR0EsV0FBcEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUZGLEVBR0U7QUFBTSxRQUFJLEVBQUMsaUJBQVg7QUFBNkIsV0FBTyxhQUFPQyw4REFBYyxDQUFDRyxtQkFBdEIsQ0FBcEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUhGLEVBSUU7QUFDRSxZQUFRLEVBQUMsVUFEWDtBQUVFLFdBQU8sWUFBTUgsOERBQWMsQ0FBQ0ksT0FBckIsU0FBK0JKLDhEQUFjLENBQUNLLFlBQTlDLENBRlQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUpGLENBREY7QUFXRDtLQWRlUCxRO0FBZ0JULFNBQVNRLFdB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cEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQXRCRixFQXVCRTtBQUFNLFFBQUksRUFBQyxlQUFYO0FBQTJCLFdBQU8sRUFBR1csUUFBckM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQXZCRixFQXdCRTtBQUFNLFFBQUksRUFBQyxtQkFBWDtBQUErQixXQUFPLEVBQUdQLE9BQU8sQ0FBQ00sS0FBakQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQXhCRixFQXlCRTtBQUFNLFFBQUksRUFBQyxnQkFBWDtBQUE0QixTQUFLLEVBQUMsY0FBbEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQXpCRixFQTBCRTtBQUFNLFFBQUksRUFBQyxlQUFYO0FBQTJCLFNBQUssWUFBTU4sT0FBTyxDQUFDVSxXQUFkLGNBQWhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUExQkYsRUE0QkU7QUFBTSxRQUFJLEVBQUMsUUFBWDtBQUFvQixXQUFPLEVBQUMsc0NBQTVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUE1QkYsQ0FERjtBQWdDRDtNQXJDZVgsVyIsImZpbGUiOiIuL2NvbXBvbmVudHMvbWV0YV9kYXRhLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERFRkFVTFRfQ09ORklHIGZyb20gJy4uL2NvbmZpZy9kZWZhdWx0X2NvbmZpZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBNZXRhRGF0YSgpIHtcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBgICR7REVGQVVMVF9DT05GSUcuc2l0ZVRpdGxlfSBieSAke0RFRkFVTFRfQ09ORklHLmF1dGhvcn1gO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9eyBkZXNjcmlwdGlvbiB9IC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD17IGRlc2NyaXB0aW9uIH0gLz5cbiAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmNyZWF0b3JcIiBjb250ZW50PXsgYEAke0RFRkFVTFRfQ09ORklHLmF1dGhvclR3aXR0ZXJIYW5kbGV9YCB9IC8+XG4gICAgICA8bWV0YVxuICAgICAgICBwcm9wZXJ0eT1cIm9nOmltYWdlXCJcbiAgICAgICAgY29udGVudD17IGAke0RFRkFVTFRfQ09ORklHLmJhc2VVcmx9JHtERUZBVUxUX0NPTkZJRy5zaXRlSW1hZ2VVcmx9YCB9XG4gICAgICAvPlxuICAgIDwvPlxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcnRpY2xlTWV0YSh7IGFydGljbGUgfSkge1xuICBjb25zdCBwdWJsaXNoZWREYXRlID0gKG5ldyBEYXRlKGFydGljbGUuZGF0ZSkpLnRvRGF0ZVN0cmluZygpO1xuICBjb25zdCBleHRlbmRlZFRpdGxlID0gYCR7YXJ0aWNsZS50aXRsZX0gYnkgJHthcnRpY2xlLmF1dGhvcn0gfCAke3B1Ymxpc2hlZERhdGV9IHwgJHtERUZBVUxUX0NPTkZJRy5zaXRlVGl0bGV9YDtcbiAgY29uc3QgaW1hZ2VVcmwgPSBgJHtERUZBVUxUX0NPTkZJRy5iYXNlVXJsfSR7REVGQVVMVF9DT05GSUcuc2l0ZUltYWdlVXJsfWA7XG5cbiAgcmV0dXJuIChcbiAgICA8PiAgXG4gICAgICA8dGl0bGU+eyBleHRlbmRlZFRpdGxlIH08L3RpdGxlPlxuICAgICAgPG1ldGEgbmFtZT1cInRpdGxlXCIgY29udGVudD17IGV4dGVuZGVkVGl0bGUgfSAvPlxuICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD17IGFydGljbGUuZGVzY3JpcHRpb24gfSAvPlxuXG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD17IGFydGljbGUudGl0bGUgfSAvPlxuICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9eyBhcnRpY2xlLmRlc2NyaXB0aW9uIH0gLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PXsgaW1hZ2VVcmwgfSAvPlxuICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzp1cmxcIiBjb250ZW50PXsgYCR7REVGQVVMVF9DT05GSUcuYmFzZVVybH0vcG9zdHMvJHsgYXJ0aWNsZS5pZCB9YCB9IC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnNpdGVfbmFtZVwiIGNvbnRlbnQ9eyBERUZBVUxUX0NPTkZJRy5zaXRlVGl0bGUgfSAvPlxuXG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnR5cGVcIiBjb250ZW50PVwiYXJ0aWNsZVwiIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cImFydGljbGU6cHVibGlzaGVkX3RpbWVcIiBjb250ZW50PXsgcHVibGlzaGVkRGF0ZSB9IC8+XG4gICAgICA8bWV0YSBuYW1lPVwiYXJ0aWNsZTphdXRob3JcIiBjb250ZW50PXsgYXJ0aWNsZS5hdXRob3IgfSAvPlxuICAgICAgPG1ldGEgbmFtZT1cImFydGljbGU6dGFnXCIgY29udGVudD17IGFydGljbGUudGFncyB9IC8+XG5cbiAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmNhcmRcIiBjb250ZW50PVwic3VtbWFyeVwiIC8+XG4gICAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjp0aXRsZVwiIGNvbnRlbnQ9eyBhcnRpY2xlLnRpdGxlIH0gLz5cbiAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCIgY29udGVudD17IGFydGljbGUuZGVzY3JpcHRpb24gfSAvPlxuICAgICAgeyBcbiAgICAgICAgLy88bWV0YSBuYW1lPVwidHdpdHRlcjpzaXRlXCIgY29udGVudD17IGBAJHtERUZBVUxUX0NPTkZJRy5hdXRob3JUd2l0dGVySGFuZGxlfWAgfSAvPiBcbiAgICAgIH1cbiAgICAgIDxtZXRhIG5hbWU9XCJ0d2l0dGVyOmNyZWF0b3JcIiBjb250ZW50PXsgYEAke0RFRkFVTFRfQ09ORklHLmF1dGhvclR3aXR0ZXJIYW5kbGV9YCB9IC8+XG4gICAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjppbWFnZVwiIGNvbnRlbnQ9eyBpbWFnZVVybCB9IC8+XG4gICAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjppbWFnZTphbHRcIiBjb250ZW50PXsgYXJ0aWNsZS50aXRsZSB9IC8+XG4gICAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjpsYWJlbDFcIiB2YWx1ZT1cIlJlYWRpbmcgdGltZVwiIC8+XG4gICAgICA8bWV0YSBuYW1lPVwidHdpdHRlcjpkYXRhMVwiIHZhbHVlPXsgYCR7YXJ0aWNsZS5yZWFkaW5nVGltZX0gbWluIHJlYWRgIH0gLz5cblxuICAgICAgPG1ldGEgbmFtZT1cInJvYm90c1wiIGNvbnRlbnQ9XCJpbmRleCxmb2xsb3csbWF4LWltYWdlLXByZXZpZXc6bGFyZ2VcIiAvPlxuICAgIDwvPlxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/meta_data.js\n");

/***/ })

})