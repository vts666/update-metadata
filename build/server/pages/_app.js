"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2957:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5152);
/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9704);







// set custom RPC server endpoint for the final website
// const endpoint = "https://explorer-api.devnet.solana.com";
// const endpoint = "http://127.0.0.1:8899";
// const endpoint = "https://ssc-dao.genesysgo.net";
// const endpoint = "https://solana-api.projectserum.com";
//  const endpoint = "https://api.mainnet-beta.solana.com";
const endpoint = "https://rpc.helius.xyz/?api-key=cc778adb-f9ab-45da-ba44-b4096f663c16";
// const endpoint = "https://try-rpc.mainnet.solana.blockdaemon.tech";
const WalletProvider = (0,next_dynamic__WEBPACK_IMPORTED_MODULE_2__["default"])(null, {
    loadableGenerated: {
        modules: [
            "_app.tsx -> " + "../contexts/ClientWalletProvider"
        ]
    },
    ssr: false
});
function MyApp({ Component , pageProps  }) {
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__/* .ConnectionProvider */ .U, {
        endpoint: endpoint,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(WalletProvider, {
            autoConnect: true,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                ...pageProps
            })
        })
    }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);


/***/ }),

/***/ 7831:
/***/ ((module) => {

module.exports = require("@solana/web3.js");

/***/ }),

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [683], () => (__webpack_exec__(2957)));
module.exports = __webpack_exports__;

})();