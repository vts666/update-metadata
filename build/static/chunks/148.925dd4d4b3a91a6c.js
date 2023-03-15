(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[148],{

/***/ 57204:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;
/* provided dependency */ var Buffer = __webpack_require__(48764)["Buffer"];

__webpack_unused_export__ = true;
var errors_1 = __webpack_require__(50580);
var Tag = 0x05;
function asUInt16BE(value) {
    var b = Buffer.alloc(2);
    b.writeUInt16BE(value, 0);
    return b;
}
var initialAcc = {
    data: Buffer.alloc(0),
    dataLength: 0,
    sequence: 0
};
/**
 *
 */
var createHIDframing = function (channel, packetSize) {
    return {
        makeBlocks: function (apdu) {
            var data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
            var blockSize = packetSize - 5;
            var nbBlocks = Math.ceil(data.length / blockSize);
            data = Buffer.concat([
                data,
                Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0),
            ]);
            var blocks = [];
            for (var i = 0; i < nbBlocks; i++) {
                var head = Buffer.alloc(5);
                head.writeUInt16BE(channel, 0);
                head.writeUInt8(Tag, 2);
                head.writeUInt16BE(i, 3);
                var chunk = data.slice(i * blockSize, (i + 1) * blockSize);
                blocks.push(Buffer.concat([head, chunk]));
            }
            return blocks;
        },
        reduceResponse: function (acc, chunk) {
            var _a = acc || initialAcc, data = _a.data, dataLength = _a.dataLength, sequence = _a.sequence;
            if (chunk.readUInt16BE(0) !== channel) {
                throw new errors_1.TransportError("Invalid channel", "InvalidChannel");
            }
            if (chunk.readUInt8(2) !== Tag) {
                throw new errors_1.TransportError("Invalid tag", "InvalidTag");
            }
            if (chunk.readUInt16BE(3) !== sequence) {
                throw new errors_1.TransportError("Invalid sequence", "InvalidSequence");
            }
            if (!acc) {
                dataLength = chunk.readUInt16BE(5);
            }
            sequence++;
            var chunkData = chunk.slice(acc ? 5 : 7);
            data = Buffer.concat([data, chunkData]);
            if (data.length > dataLength) {
                data = data.slice(0, dataLength);
            }
            return {
                data: data,
                dataLength: dataLength,
                sequence: sequence
            };
        },
        getReducedResult: function (acc) {
            if (acc && acc.dataLength === acc.data.length) {
                return acc.data;
            }
        }
    };
};
exports.Z = createHIDframing;
//# sourceMappingURL=hid-framing.js.map

/***/ }),

/***/ 50580:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "AccountNameRequiredError": function() { return /* binding */ AccountNameRequiredError; },
  "AccountNotSupported": function() { return /* binding */ AccountNotSupported; },
  "AmountRequired": function() { return /* binding */ AmountRequired; },
  "BluetoothRequired": function() { return /* binding */ BluetoothRequired; },
  "BtcUnmatchedApp": function() { return /* binding */ BtcUnmatchedApp; },
  "CantOpenDevice": function() { return /* binding */ CantOpenDevice; },
  "CantScanQRCode": function() { return /* binding */ CantScanQRCode; },
  "CashAddrNotSupported": function() { return /* binding */ CashAddrNotSupported; },
  "CurrencyNotSupported": function() { return /* binding */ CurrencyNotSupported; },
  "DBNotReset": function() { return /* binding */ DBNotReset; },
  "DBWrongPassword": function() { return /* binding */ DBWrongPassword; },
  "DeviceAppVerifyNotSupported": function() { return /* binding */ DeviceAppVerifyNotSupported; },
  "DeviceGenuineSocketEarlyClose": function() { return /* binding */ DeviceGenuineSocketEarlyClose; },
  "DeviceHalted": function() { return /* binding */ DeviceHalted; },
  "DeviceInOSUExpected": function() { return /* binding */ DeviceInOSUExpected; },
  "DeviceNameInvalid": function() { return /* binding */ DeviceNameInvalid; },
  "DeviceNotGenuineError": function() { return /* binding */ DeviceNotGenuineError; },
  "DeviceOnDashboardExpected": function() { return /* binding */ DeviceOnDashboardExpected; },
  "DeviceOnDashboardUnexpected": function() { return /* binding */ DeviceOnDashboardUnexpected; },
  "DeviceShouldStayInApp": function() { return /* binding */ DeviceShouldStayInApp; },
  "DeviceSocketFail": function() { return /* binding */ DeviceSocketFail; },
  "DeviceSocketNoBulkStatus": function() { return /* binding */ DeviceSocketNoBulkStatus; },
  "DisconnectedDevice": function() { return /* binding */ DisconnectedDevice; },
  "DisconnectedDeviceDuringOperation": function() { return /* binding */ DisconnectedDeviceDuringOperation; },
  "ETHAddressNonEIP": function() { return /* binding */ ETHAddressNonEIP; },
  "EnpointConfigError": function() { return /* binding */ EnpointConfigError; },
  "EthAppPleaseEnableContractData": function() { return /* binding */ EthAppPleaseEnableContractData; },
  "FeeEstimationFailed": function() { return /* binding */ FeeEstimationFailed; },
  "FeeNotLoaded": function() { return /* binding */ FeeNotLoaded; },
  "FeeRequired": function() { return /* binding */ FeeRequired; },
  "FeeTooHigh": function() { return /* binding */ FeeTooHigh; },
  "FirmwareNotRecognized": function() { return /* binding */ FirmwareNotRecognized; },
  "FirmwareOrAppUpdateRequired": function() { return /* binding */ FirmwareOrAppUpdateRequired; },
  "GasLessThanEstimate": function() { return /* binding */ GasLessThanEstimate; },
  "GenuineCheckFailed": function() { return /* binding */ GenuineCheckFailed; },
  "HardResetFail": function() { return /* binding */ HardResetFail; },
  "InvalidAddress": function() { return /* binding */ InvalidAddress; },
  "InvalidAddressBecauseDestinationIsAlsoSource": function() { return /* binding */ InvalidAddressBecauseDestinationIsAlsoSource; },
  "InvalidXRPTag": function() { return /* binding */ InvalidXRPTag; },
  "LatestMCUInstalledError": function() { return /* binding */ LatestMCUInstalledError; },
  "LedgerAPI4xx": function() { return /* binding */ LedgerAPI4xx; },
  "LedgerAPI5xx": function() { return /* binding */ LedgerAPI5xx; },
  "LedgerAPIError": function() { return /* binding */ LedgerAPIError; },
  "LedgerAPIErrorWithMessage": function() { return /* binding */ LedgerAPIErrorWithMessage; },
  "LedgerAPINotAvailable": function() { return /* binding */ LedgerAPINotAvailable; },
  "MCUNotGenuineToDashboard": function() { return /* binding */ MCUNotGenuineToDashboard; },
  "ManagerAppAlreadyInstalledError": function() { return /* binding */ ManagerAppAlreadyInstalledError; },
  "ManagerAppDepInstallRequired": function() { return /* binding */ ManagerAppDepInstallRequired; },
  "ManagerAppDepUninstallRequired": function() { return /* binding */ ManagerAppDepUninstallRequired; },
  "ManagerAppRelyOnBTCError": function() { return /* binding */ ManagerAppRelyOnBTCError; },
  "ManagerDeviceLockedError": function() { return /* binding */ ManagerDeviceLockedError; },
  "ManagerFirmwareNotEnoughSpaceError": function() { return /* binding */ ManagerFirmwareNotEnoughSpaceError; },
  "ManagerNotEnoughSpaceError": function() { return /* binding */ ManagerNotEnoughSpaceError; },
  "ManagerUninstallBTCDep": function() { return /* binding */ ManagerUninstallBTCDep; },
  "NetworkDown": function() { return /* binding */ NetworkDown; },
  "NoAccessToCamera": function() { return /* binding */ NoAccessToCamera; },
  "NoAddressesFound": function() { return /* binding */ NoAddressesFound; },
  "NoDBPathGiven": function() { return /* binding */ NoDBPathGiven; },
  "NotEnoughBalance": function() { return /* binding */ NotEnoughBalance; },
  "NotEnoughBalanceBecauseDestinationNotCreated": function() { return /* binding */ NotEnoughBalanceBecauseDestinationNotCreated; },
  "NotEnoughBalanceInParentAccount": function() { return /* binding */ NotEnoughBalanceInParentAccount; },
  "NotEnoughBalanceToDelegate": function() { return /* binding */ NotEnoughBalanceToDelegate; },
  "NotEnoughGas": function() { return /* binding */ NotEnoughGas; },
  "NotEnoughSpendableBalance": function() { return /* binding */ NotEnoughSpendableBalance; },
  "NotSupportedLegacyAddress": function() { return /* binding */ NotSupportedLegacyAddress; },
  "PairingFailed": function() { return /* binding */ PairingFailed; },
  "PasswordIncorrectError": function() { return /* binding */ PasswordIncorrectError; },
  "PasswordsDontMatchError": function() { return /* binding */ PasswordsDontMatchError; },
  "RecipientRequired": function() { return /* binding */ RecipientRequired; },
  "RecommendSubAccountsToEmpty": function() { return /* binding */ RecommendSubAccountsToEmpty; },
  "RecommendUndelegation": function() { return /* binding */ RecommendUndelegation; },
  "StatusCodes": function() { return /* binding */ StatusCodes; },
  "SyncError": function() { return /* binding */ SyncError; },
  "TimeoutTagged": function() { return /* binding */ TimeoutTagged; },
  "TransportError": function() { return /* binding */ TransportError; },
  "TransportInterfaceNotAvailable": function() { return /* binding */ TransportInterfaceNotAvailable; },
  "TransportOpenUserCancelled": function() { return /* binding */ TransportOpenUserCancelled; },
  "TransportRaceCondition": function() { return /* binding */ TransportRaceCondition; },
  "TransportStatusError": function() { return /* binding */ TransportStatusError; },
  "TransportWebUSBGestureRequired": function() { return /* binding */ TransportWebUSBGestureRequired; },
  "UnavailableTezosOriginatedAccountReceive": function() { return /* binding */ UnavailableTezosOriginatedAccountReceive; },
  "UnavailableTezosOriginatedAccountSend": function() { return /* binding */ UnavailableTezosOriginatedAccountSend; },
  "UnexpectedBootloader": function() { return /* binding */ UnexpectedBootloader; },
  "UnknownMCU": function() { return /* binding */ UnknownMCU; },
  "UpdateFetchFileFail": function() { return /* binding */ UpdateFetchFileFail; },
  "UpdateIncorrectHash": function() { return /* binding */ UpdateIncorrectHash; },
  "UpdateIncorrectSig": function() { return /* binding */ UpdateIncorrectSig; },
  "UpdateYourApp": function() { return /* binding */ UpdateYourApp; },
  "UserRefusedAddress": function() { return /* binding */ UserRefusedAddress; },
  "UserRefusedAllowManager": function() { return /* binding */ UserRefusedAllowManager; },
  "UserRefusedDeviceNameChange": function() { return /* binding */ UserRefusedDeviceNameChange; },
  "UserRefusedFirmwareUpdate": function() { return /* binding */ UserRefusedFirmwareUpdate; },
  "UserRefusedOnDevice": function() { return /* binding */ UserRefusedOnDevice; },
  "WebsocketConnectionError": function() { return /* binding */ WebsocketConnectionError; },
  "WebsocketConnectionFailed": function() { return /* binding */ WebsocketConnectionFailed; },
  "WrongAppForCurrency": function() { return /* binding */ WrongAppForCurrency; },
  "WrongDeviceForAccount": function() { return /* binding */ WrongDeviceForAccount; },
  "addCustomErrorDeserializer": function() { return /* reexport */ addCustomErrorDeserializer; },
  "createCustomErrorClass": function() { return /* reexport */ createCustomErrorClass; },
  "deserializeError": function() { return /* reexport */ deserializeError; },
  "getAltStatusMessage": function() { return /* binding */ getAltStatusMessage; },
  "serializeError": function() { return /* reexport */ serializeError; }
});

;// CONCATENATED MODULE: ./node_modules/@ledgerhq/errors/lib-es/helpers.js
/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var errorClasses = {};
var deserializers = {};
var addCustomErrorDeserializer = function (name, deserializer) {
    deserializers[name] = deserializer;
};
var createCustomErrorClass = function (name) {
    var C = function CustomError(message, fields) {
        Object.assign(this, fields);
        this.name = name;
        this.message = message || name;
        this.stack = new Error().stack;
    };
    C.prototype = new Error();
    errorClasses[name] = C;
    return C;
};
// inspired from https://github.com/programble/errio/blob/master/index.js
var deserializeError = function (object) {
    if (typeof object === "object" && object) {
        try {
            // $FlowFixMe FIXME HACK
            var msg = JSON.parse(object.message);
            if (msg.message && msg.name) {
                object = msg;
            }
        }
        catch (e) {
            // nothing
        }
        var error = void 0;
        if (typeof object.name === "string") {
            var name_1 = object.name;
            var des = deserializers[name_1];
            if (des) {
                error = des(object);
            }
            else {
                var constructor = name_1 === "Error" ? Error : errorClasses[name_1];
                if (!constructor) {
                    console.warn("deserializing an unknown class '" + name_1 + "'");
                    constructor = createCustomErrorClass(name_1);
                }
                error = Object.create(constructor.prototype);
                try {
                    for (var prop in object) {
                        if (object.hasOwnProperty(prop)) {
                            error[prop] = object[prop];
                        }
                    }
                }
                catch (e) {
                    // sometimes setting a property can fail (e.g. .name)
                }
            }
        }
        else {
            error = new Error(object.message);
        }
        if (!error.stack && Error.captureStackTrace) {
            Error.captureStackTrace(error, deserializeError);
        }
        return error;
    }
    return new Error(String(object));
};
// inspired from https://github.com/sindresorhus/serialize-error/blob/master/index.js
var serializeError = function (value) {
    if (!value)
        return value;
    if (typeof value === "object") {
        return destroyCircular(value, []);
    }
    if (typeof value === "function") {
        return "[Function: " + (value.name || "anonymous") + "]";
    }
    return value;
};
// https://www.npmjs.com/package/destroy-circular
function destroyCircular(from, seen) {
    var e_1, _a;
    var to = {};
    seen.push(from);
    try {
        for (var _b = __values(Object.keys(from)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var value = from[key];
            if (typeof value === "function") {
                continue;
            }
            if (!value || typeof value !== "object") {
                to[key] = value;
                continue;
            }
            if (seen.indexOf(from[key]) === -1) {
                to[key] = destroyCircular(from[key], seen.slice(0));
                continue;
            }
            to[key] = "[Circular]";
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (typeof from.name === "string") {
        to.name = from.name;
    }
    if (typeof from.message === "string") {
        to.message = from.message;
    }
    if (typeof from.stack === "string") {
        to.stack = from.stack;
    }
    return to;
}
//# sourceMappingURL=helpers.js.map
;// CONCATENATED MODULE: ./node_modules/@ledgerhq/errors/lib-es/index.js


var AccountNameRequiredError = createCustomErrorClass("AccountNameRequired");
var AccountNotSupported = createCustomErrorClass("AccountNotSupported");
var AmountRequired = createCustomErrorClass("AmountRequired");
var BluetoothRequired = createCustomErrorClass("BluetoothRequired");
var BtcUnmatchedApp = createCustomErrorClass("BtcUnmatchedApp");
var CantOpenDevice = createCustomErrorClass("CantOpenDevice");
var CashAddrNotSupported = createCustomErrorClass("CashAddrNotSupported");
var CurrencyNotSupported = createCustomErrorClass("CurrencyNotSupported");
var DeviceAppVerifyNotSupported = createCustomErrorClass("DeviceAppVerifyNotSupported");
var DeviceGenuineSocketEarlyClose = createCustomErrorClass("DeviceGenuineSocketEarlyClose");
var DeviceNotGenuineError = createCustomErrorClass("DeviceNotGenuine");
var DeviceOnDashboardExpected = createCustomErrorClass("DeviceOnDashboardExpected");
var DeviceOnDashboardUnexpected = createCustomErrorClass("DeviceOnDashboardUnexpected");
var DeviceInOSUExpected = createCustomErrorClass("DeviceInOSUExpected");
var DeviceHalted = createCustomErrorClass("DeviceHalted");
var DeviceNameInvalid = createCustomErrorClass("DeviceNameInvalid");
var DeviceSocketFail = createCustomErrorClass("DeviceSocketFail");
var DeviceSocketNoBulkStatus = createCustomErrorClass("DeviceSocketNoBulkStatus");
var DisconnectedDevice = createCustomErrorClass("DisconnectedDevice");
var DisconnectedDeviceDuringOperation = createCustomErrorClass("DisconnectedDeviceDuringOperation");
var EnpointConfigError = createCustomErrorClass("EnpointConfig");
var EthAppPleaseEnableContractData = createCustomErrorClass("EthAppPleaseEnableContractData");
var FeeEstimationFailed = createCustomErrorClass("FeeEstimationFailed");
var FirmwareNotRecognized = createCustomErrorClass("FirmwareNotRecognized");
var HardResetFail = createCustomErrorClass("HardResetFail");
var InvalidXRPTag = createCustomErrorClass("InvalidXRPTag");
var InvalidAddress = createCustomErrorClass("InvalidAddress");
var InvalidAddressBecauseDestinationIsAlsoSource = createCustomErrorClass("InvalidAddressBecauseDestinationIsAlsoSource");
var LatestMCUInstalledError = createCustomErrorClass("LatestMCUInstalledError");
var UnknownMCU = createCustomErrorClass("UnknownMCU");
var LedgerAPIError = createCustomErrorClass("LedgerAPIError");
var LedgerAPIErrorWithMessage = createCustomErrorClass("LedgerAPIErrorWithMessage");
var LedgerAPINotAvailable = createCustomErrorClass("LedgerAPINotAvailable");
var ManagerAppAlreadyInstalledError = createCustomErrorClass("ManagerAppAlreadyInstalled");
var ManagerAppRelyOnBTCError = createCustomErrorClass("ManagerAppRelyOnBTC");
var ManagerAppDepInstallRequired = createCustomErrorClass("ManagerAppDepInstallRequired");
var ManagerAppDepUninstallRequired = createCustomErrorClass("ManagerAppDepUninstallRequired");
var ManagerDeviceLockedError = createCustomErrorClass("ManagerDeviceLocked");
var ManagerFirmwareNotEnoughSpaceError = createCustomErrorClass("ManagerFirmwareNotEnoughSpace");
var ManagerNotEnoughSpaceError = createCustomErrorClass("ManagerNotEnoughSpace");
var ManagerUninstallBTCDep = createCustomErrorClass("ManagerUninstallBTCDep");
var NetworkDown = createCustomErrorClass("NetworkDown");
var NoAddressesFound = createCustomErrorClass("NoAddressesFound");
var NotEnoughBalance = createCustomErrorClass("NotEnoughBalance");
var NotEnoughBalanceToDelegate = createCustomErrorClass("NotEnoughBalanceToDelegate");
var NotEnoughBalanceInParentAccount = createCustomErrorClass("NotEnoughBalanceInParentAccount");
var NotEnoughSpendableBalance = createCustomErrorClass("NotEnoughSpendableBalance");
var NotEnoughBalanceBecauseDestinationNotCreated = createCustomErrorClass("NotEnoughBalanceBecauseDestinationNotCreated");
var NoAccessToCamera = createCustomErrorClass("NoAccessToCamera");
var NotEnoughGas = createCustomErrorClass("NotEnoughGas");
var NotSupportedLegacyAddress = createCustomErrorClass("NotSupportedLegacyAddress");
var GasLessThanEstimate = createCustomErrorClass("GasLessThanEstimate");
var PasswordsDontMatchError = createCustomErrorClass("PasswordsDontMatch");
var PasswordIncorrectError = createCustomErrorClass("PasswordIncorrect");
var RecommendSubAccountsToEmpty = createCustomErrorClass("RecommendSubAccountsToEmpty");
var RecommendUndelegation = createCustomErrorClass("RecommendUndelegation");
var TimeoutTagged = createCustomErrorClass("TimeoutTagged");
var UnexpectedBootloader = createCustomErrorClass("UnexpectedBootloader");
var MCUNotGenuineToDashboard = createCustomErrorClass("MCUNotGenuineToDashboard");
var RecipientRequired = createCustomErrorClass("RecipientRequired");
var UnavailableTezosOriginatedAccountReceive = createCustomErrorClass("UnavailableTezosOriginatedAccountReceive");
var UnavailableTezosOriginatedAccountSend = createCustomErrorClass("UnavailableTezosOriginatedAccountSend");
var UpdateFetchFileFail = createCustomErrorClass("UpdateFetchFileFail");
var UpdateIncorrectHash = createCustomErrorClass("UpdateIncorrectHash");
var UpdateIncorrectSig = createCustomErrorClass("UpdateIncorrectSig");
var UpdateYourApp = createCustomErrorClass("UpdateYourApp");
var UserRefusedDeviceNameChange = createCustomErrorClass("UserRefusedDeviceNameChange");
var UserRefusedAddress = createCustomErrorClass("UserRefusedAddress");
var UserRefusedFirmwareUpdate = createCustomErrorClass("UserRefusedFirmwareUpdate");
var UserRefusedAllowManager = createCustomErrorClass("UserRefusedAllowManager");
var UserRefusedOnDevice = createCustomErrorClass("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
var TransportOpenUserCancelled = createCustomErrorClass("TransportOpenUserCancelled");
var TransportInterfaceNotAvailable = createCustomErrorClass("TransportInterfaceNotAvailable");
var TransportRaceCondition = createCustomErrorClass("TransportRaceCondition");
var TransportWebUSBGestureRequired = createCustomErrorClass("TransportWebUSBGestureRequired");
var DeviceShouldStayInApp = createCustomErrorClass("DeviceShouldStayInApp");
var WebsocketConnectionError = createCustomErrorClass("WebsocketConnectionError");
var WebsocketConnectionFailed = createCustomErrorClass("WebsocketConnectionFailed");
var WrongDeviceForAccount = createCustomErrorClass("WrongDeviceForAccount");
var WrongAppForCurrency = createCustomErrorClass("WrongAppForCurrency");
var ETHAddressNonEIP = createCustomErrorClass("ETHAddressNonEIP");
var CantScanQRCode = createCustomErrorClass("CantScanQRCode");
var FeeNotLoaded = createCustomErrorClass("FeeNotLoaded");
var FeeRequired = createCustomErrorClass("FeeRequired");
var FeeTooHigh = createCustomErrorClass("FeeTooHigh");
var SyncError = createCustomErrorClass("SyncError");
var PairingFailed = createCustomErrorClass("PairingFailed");
var GenuineCheckFailed = createCustomErrorClass("GenuineCheckFailed");
var LedgerAPI4xx = createCustomErrorClass("LedgerAPI4xx");
var LedgerAPI5xx = createCustomErrorClass("LedgerAPI5xx");
var FirmwareOrAppUpdateRequired = createCustomErrorClass("FirmwareOrAppUpdateRequired");
// db stuff, no need to translate
var NoDBPathGiven = createCustomErrorClass("NoDBPathGiven");
var DBWrongPassword = createCustomErrorClass("DBWrongPassword");
var DBNotReset = createCustomErrorClass("DBNotReset");
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */
function TransportError(message, id) {
    this.name = "TransportError";
    this.message = message;
    this.stack = new Error().stack;
    this.id = id;
}
TransportError.prototype = new Error();
addCustomErrorDeserializer("TransportError", function (e) { return new TransportError(e.message, e.id); });
var StatusCodes = {
    PIN_REMAINING_ATTEMPTS: 0x63c0,
    INCORRECT_LENGTH: 0x6700,
    MISSING_CRITICAL_PARAMETER: 0x6800,
    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
    INCORRECT_DATA: 0x6a80,
    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
    REFERENCED_DATA_NOT_FOUND: 0x6a88,
    FILE_ALREADY_EXISTS: 0x6a89,
    INCORRECT_P1_P2: 0x6b00,
    INS_NOT_SUPPORTED: 0x6d00,
    CLA_NOT_SUPPORTED: 0x6e00,
    TECHNICAL_PROBLEM: 0x6f00,
    OK: 0x9000,
    MEMORY_PROBLEM: 0x9240,
    NO_EF_SELECTED: 0x9400,
    INVALID_OFFSET: 0x9402,
    FILE_NOT_FOUND: 0x9404,
    INCONSISTENT_FILE: 0x9408,
    ALGORITHM_NOT_SUPPORTED: 0x9484,
    INVALID_KCV: 0x9485,
    CODE_NOT_INITIALIZED: 0x9802,
    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
    CONTRADICTION_INVALIDATION: 0x9810,
    CODE_BLOCKED: 0x9840,
    MAX_VALUE_REACHED: 0x9850,
    GP_AUTH_FAILED: 0x6300,
    LICENSING: 0x6f42,
    HALTED: 0x6faa
};
function getAltStatusMessage(code) {
    switch (code) {
        // improve text of most common errors
        case 0x6700:
            return "Incorrect length";
        case 0x6800:
            return "Missing critical parameter";
        case 0x6982:
            return "Security not satisfied (dongle locked or have invalid access rights)";
        case 0x6985:
            return "Condition of use not satisfied (denied by the user?)";
        case 0x6a80:
            return "Invalid data received";
        case 0x6b00:
            return "Invalid parameter received";
    }
    if (0x6f00 <= code && code <= 0x6fff) {
        return "Internal error, please report";
    }
}
/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
function TransportStatusError(statusCode) {
    this.name = "TransportStatusError";
    var statusText = Object.keys(StatusCodes).find(function (k) { return StatusCodes[k] === statusCode; }) ||
        "UNKNOWN_ERROR";
    var smsg = getAltStatusMessage(statusCode) || statusText;
    var statusCodeStr = statusCode.toString(16);
    this.message = "Ledger device: " + smsg + " (0x" + statusCodeStr + ")";
    this.stack = new Error().stack;
    this.statusCode = statusCode;
    this.statusText = statusText;
}
TransportStatusError.prototype = new Error();
addCustomErrorDeserializer("TransportStatusError", function (e) { return new TransportStatusError(e.statusCode); });
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 39593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


// A linked list to keep track of recently-used-ness
const Yallist = __webpack_require__(34411)

const MAX = Symbol('max')
const LENGTH = Symbol('length')
const LENGTH_CALCULATOR = Symbol('lengthCalculator')
const ALLOW_STALE = Symbol('allowStale')
const MAX_AGE = Symbol('maxAge')
const DISPOSE = Symbol('dispose')
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet')
const LRU_LIST = Symbol('lruList')
const CACHE = Symbol('cache')
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet')

const naiveLength = () => 1

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options }

    if (!options)
      options = {}

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    const max = this[MAX] = options.max || Infinity

    const lc = options.length || naiveLength
    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc
    this[ALLOW_STALE] = options.stale || false
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE] = options.maxAge || 0
    this[DISPOSE] = options.dispose
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false
    this.reset()
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX] = mL || Infinity
    trim(this)
  }
  get max () {
    return this[MAX]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE] = !!allowStale
  }
  get allowStale () {
    return this[ALLOW_STALE]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE] = mA
    trim(this)
  }
  get maxAge () {
    return this[MAX_AGE]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC
      this[LENGTH] = 0
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
        this[LENGTH] += hit.length
      })
    }
    trim(this)
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

  get length () { return this[LENGTH] }
  get itemCount () { return this[LRU_LIST].length }

  rforEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev
      forEachStep(this, fn, walker, thisp)
      walker = prev
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next
      forEachStep(this, fn, walker, thisp)
      walker = next
    }
  }

  keys () {
    return this[LRU_LIST].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value))
    }

    this[CACHE] = new Map() // hash of items by key
    this[LRU_LIST] = new Yallist() // list of items in order of use recency
    this[LENGTH] = 0 // length of items in the list
  }

  dump () {
    return this[LRU_LIST].map(hit =>
      isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE]

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0
    const len = this[LENGTH_CALCULATOR](value, key)

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key))
        return false
      }

      const node = this[CACHE].get(key)
      const item = node.value

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value)
      }

      item.now = now
      item.maxAge = maxAge
      item.value = value
      this[LENGTH] += len - item.length
      item.length = len
      this.get(key)
      trim(this)
      return true
    }

    const hit = new Entry(key, value, len, now, maxAge)

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value)

      return false
    }

    this[LENGTH] += hit.length
    this[LRU_LIST].unshift(hit)
    this[CACHE].set(key, this[LRU_LIST].head)
    trim(this)
    return true
  }

  has (key) {
    if (!this[CACHE].has(key)) return false
    const hit = this[CACHE].get(key).value
    return !isStale(this, hit)
  }

  get (key) {
    return get(this, key, true)
  }

  peek (key) {
    return get(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST].tail
    if (!node)
      return null

    del(this, node)
    return node.value
  }

  del (key) {
    del(this, this[CACHE].get(key))
  }

  load (arr) {
    // reset the cache
    this.reset()

    const now = Date.now()
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l]
      const expiresAt = hit.e || 0
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v)
      else {
        const maxAge = expiresAt - now
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge)
        }
      }
    }
  }

  prune () {
    this[CACHE].forEach((value, key) => get(this, key, false))
  }
}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key)
  if (node) {
    const hit = node.value
    if (isStale(self, hit)) {
      del(self, node)
      if (!self[ALLOW_STALE])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now()
        self[LRU_LIST].unshiftNode(node)
      }
    }
    return hit.value
  }
}

const isStale = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
    return false

  const diff = Date.now() - hit.now
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE] && (diff > self[MAX_AGE])
}

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev
      del(self, walker)
      walker = prev
    }
  }
}

const del = (self, node) => {
  if (node) {
    const hit = node.value
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value)

    self[LENGTH] -= hit.length
    self[CACHE].delete(hit.key)
    self[LRU_LIST].removeNode(node)
  }
}

class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key
    this.value = value
    this.length = length
    this.now = now
    this.maxAge = maxAge || 0
  }
}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value
  if (isStale(self, hit)) {
    del(self, node)
    if (!self[ALLOW_STALE])
      hit = undefined
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self)
}

module.exports = LRUCache


/***/ }),

/***/ 96296:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mI": function() { return /* binding */ BaseWalletAdapter; },
/* harmony export */   "QZ": function() { return /* binding */ WalletAdapterNetwork; }
/* harmony export */ });
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26729);
/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

var BaseWalletAdapter = /*#__PURE__*/ function(EventEmitter1) {
    "use strict";
    _inherits(BaseWalletAdapter, EventEmitter1);
    var _super = _createSuper(BaseWalletAdapter);
    function BaseWalletAdapter() {
        _classCallCheck(this, BaseWalletAdapter);
        return _super.apply(this, arguments);
    }
    return BaseWalletAdapter;
}((eventemitter3__WEBPACK_IMPORTED_MODULE_0___default()));
var WalletAdapterNetwork;
(function(WalletAdapterNetwork1) {
    WalletAdapterNetwork1["Mainnet"] = "mainnet-beta";
    WalletAdapterNetwork1["Testnet"] = "testnet";
    WalletAdapterNetwork1["Devnet"] = "devnet";
})(WalletAdapterNetwork || (WalletAdapterNetwork = {})); //# sourceMappingURL=adapter.js.map


/***/ }),

/***/ 4004:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lj": function() { return /* binding */ WalletError; },
/* harmony export */   "l5": function() { return /* binding */ WalletNotFoundError; },
/* harmony export */   "Yf": function() { return /* binding */ WalletNotInstalledError; },
/* harmony export */   "OZ": function() { return /* binding */ WalletNotReadyError; },
/* harmony export */   "$w": function() { return /* binding */ WalletConnectionError; },
/* harmony export */   "at": function() { return /* binding */ WalletDisconnectedError; },
/* harmony export */   "UG": function() { return /* binding */ WalletDisconnectionError; },
/* harmony export */   "cO": function() { return /* binding */ WalletAccountError; },
/* harmony export */   "Nx": function() { return /* binding */ WalletPublicKeyError; },
/* harmony export */   "oS": function() { return /* binding */ WalletNotConnectedError; },
/* harmony export */   "IW": function() { return /* binding */ WalletSendTransactionError; },
/* harmony export */   "fk": function() { return /* binding */ WalletSignMessageError; },
/* harmony export */   "PY": function() { return /* binding */ WalletSignTransactionError; },
/* harmony export */   "NK": function() { return /* binding */ WalletTimeoutError; },
/* harmony export */   "d2": function() { return /* binding */ WalletWindowBlockedError; },
/* harmony export */   "hd": function() { return /* binding */ WalletWindowClosedError; }
/* harmony export */ });
/* unused harmony export WalletKeypairError */
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
var WalletError = /*#__PURE__*/ function(Error) {
    "use strict";
    _inherits(WalletError, Error);
    var _super = _createSuper(WalletError);
    function WalletError(message, error) {
        _classCallCheck(this, WalletError);
        var _this;
        _this = _super.call(this, message);
        _this.error = error;
        return _this;
    }
    return WalletError;
}(_wrapNativeSuper(Error));
var WalletNotFoundError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletNotFoundError, WalletError);
    var _super = _createSuper(WalletNotFoundError);
    function WalletNotFoundError() {
        _classCallCheck(this, WalletNotFoundError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletNotFoundError';
        return _this;
    }
    return WalletNotFoundError;
}(WalletError);
var WalletNotInstalledError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletNotInstalledError, WalletError);
    var _super = _createSuper(WalletNotInstalledError);
    function WalletNotInstalledError() {
        _classCallCheck(this, WalletNotInstalledError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletNotInstalledError';
        return _this;
    }
    return WalletNotInstalledError;
}(WalletError);
var WalletNotReadyError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletNotReadyError, WalletError);
    var _super = _createSuper(WalletNotReadyError);
    function WalletNotReadyError() {
        _classCallCheck(this, WalletNotReadyError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletNotReadyError';
        return _this;
    }
    return WalletNotReadyError;
}(WalletError);
var WalletConnectionError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletConnectionError, WalletError);
    var _super = _createSuper(WalletConnectionError);
    function WalletConnectionError() {
        _classCallCheck(this, WalletConnectionError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletConnectionError';
        return _this;
    }
    return WalletConnectionError;
}(WalletError);
var WalletDisconnectedError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletDisconnectedError, WalletError);
    var _super = _createSuper(WalletDisconnectedError);
    function WalletDisconnectedError() {
        _classCallCheck(this, WalletDisconnectedError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletDisconnectedError';
        return _this;
    }
    return WalletDisconnectedError;
}(WalletError);
var WalletDisconnectionError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletDisconnectionError, WalletError);
    var _super = _createSuper(WalletDisconnectionError);
    function WalletDisconnectionError() {
        _classCallCheck(this, WalletDisconnectionError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletDisconnectionError';
        return _this;
    }
    return WalletDisconnectionError;
}(WalletError);
var WalletAccountError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletAccountError, WalletError);
    var _super = _createSuper(WalletAccountError);
    function WalletAccountError() {
        _classCallCheck(this, WalletAccountError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletAccountError';
        return _this;
    }
    return WalletAccountError;
}(WalletError);
var WalletPublicKeyError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletPublicKeyError, WalletError);
    var _super = _createSuper(WalletPublicKeyError);
    function WalletPublicKeyError() {
        _classCallCheck(this, WalletPublicKeyError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletPublicKeyError';
        return _this;
    }
    return WalletPublicKeyError;
}(WalletError);
var WalletKeypairError = /*#__PURE__*/ (/* unused pure expression or super */ null && (function(WalletError) {
    "use strict";
    _inherits(WalletKeypairError, WalletError);
    var _super = _createSuper(WalletKeypairError);
    function WalletKeypairError() {
        _classCallCheck(this, WalletKeypairError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletKeypairError';
        return _this;
    }
    return WalletKeypairError;
}(WalletError)));
var WalletNotConnectedError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletNotConnectedError, WalletError);
    var _super = _createSuper(WalletNotConnectedError);
    function WalletNotConnectedError() {
        _classCallCheck(this, WalletNotConnectedError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletNotConnectedError';
        return _this;
    }
    return WalletNotConnectedError;
}(WalletError);
var WalletSendTransactionError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletSendTransactionError, WalletError);
    var _super = _createSuper(WalletSendTransactionError);
    function WalletSendTransactionError() {
        _classCallCheck(this, WalletSendTransactionError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletSendTransactionError';
        return _this;
    }
    return WalletSendTransactionError;
}(WalletError);
var WalletSignMessageError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletSignMessageError, WalletError);
    var _super = _createSuper(WalletSignMessageError);
    function WalletSignMessageError() {
        _classCallCheck(this, WalletSignMessageError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletSignMessageError';
        return _this;
    }
    return WalletSignMessageError;
}(WalletError);
var WalletSignTransactionError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletSignTransactionError, WalletError);
    var _super = _createSuper(WalletSignTransactionError);
    function WalletSignTransactionError() {
        _classCallCheck(this, WalletSignTransactionError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletSignTransactionError';
        return _this;
    }
    return WalletSignTransactionError;
}(WalletError);
var WalletTimeoutError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletTimeoutError, WalletError);
    var _super = _createSuper(WalletTimeoutError);
    function WalletTimeoutError() {
        _classCallCheck(this, WalletTimeoutError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletTimeoutError';
        return _this;
    }
    return WalletTimeoutError;
}(WalletError);
var WalletWindowBlockedError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletWindowBlockedError, WalletError);
    var _super = _createSuper(WalletWindowBlockedError);
    function WalletWindowBlockedError() {
        _classCallCheck(this, WalletWindowBlockedError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletWindowBlockedError';
        return _this;
    }
    return WalletWindowBlockedError;
}(WalletError);
var WalletWindowClosedError = /*#__PURE__*/ function(WalletError) {
    "use strict";
    _inherits(WalletWindowClosedError, WalletError);
    var _super = _createSuper(WalletWindowClosedError);
    function WalletWindowClosedError() {
        _classCallCheck(this, WalletWindowClosedError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletWindowClosedError';
        return _this;
    }
    return WalletWindowClosedError;
} //# sourceMappingURL=errors.js.map
(WalletError);


/***/ }),

/***/ 92983:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": function() { return /* binding */ pollUntilReady; }
/* harmony export */ });
/* unused harmony export poll */
/* harmony import */ var _Users_vts666_Downloads_ursas_soltool_solana_tools_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34051);
/* harmony import */ var _Users_vts666_Downloads_ursas_soltool_solana_tools_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_vts666_Downloads_ursas_soltool_solana_tools_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    var adopt = function adopt(value) {
        return _instanceof(value, P) ? value : new P(function(resolve) {
            resolve(value);
        });
    };
    return new (P || (P = Promise))(function(resolve, reject) {
        var fulfilled = function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function poll(callback, interval, count) {
    if (count > 0) {
        var _this = this;
        setTimeout(function() {
            return __awaiter(_this, void 0, void 0, _Users_vts666_Downloads_ursas_soltool_solana_tools_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
                var done;
                return _Users_vts666_Downloads_ursas_soltool_solana_tools_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            _ctx.next = 2;
                            return callback();
                        case 2:
                            done = _ctx.sent;
                            if (!done) poll(callback, interval, count - 1);
                        case 4:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
        }, interval);
    }
}
function pollUntilReady(adapter, pollInterval, pollCount) {
    poll(function() {
        var ready = adapter.ready;
        if (ready) {
            if (!adapter.emit('ready')) {
                console.warn("".concat(adapter.constructor.name, " is ready but no listener was registered"));
            }
        }
        return ready;
    }, pollInterval, pollCount);
} //# sourceMappingURL=poll.js.map


/***/ }),

/***/ 394:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": function() { return /* binding */ BaseSignerWalletAdapter; },
/* harmony export */   "e": function() { return /* binding */ BaseMessageSignerWalletAdapter; }
/* harmony export */ });
/* harmony import */ var _Users_vts666_Downloads_ursas_soltool_solana_tools_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34051);
/* harmony import */ var _Users_vts666_Downloads_ursas_soltool_solana_tools_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_vts666_Downloads_ursas_soltool_solana_tools_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96296);
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4004);



function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    var adopt = function adopt(value) {
        return _instanceof(value, P) ? value : new P(function(resolve) {
            resolve(value);
        });
    };
    return new (P || (P = Promise))(function(resolve, reject) {
        var fulfilled = function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
var BaseSignerWalletAdapter = /*#__PURE__*/ function(BaseWalletAdapter1) {
    "use strict";
    _inherits(BaseSignerWalletAdapter, BaseWalletAdapter1);
    var _super = _createSuper(BaseSignerWalletAdapter);
    function BaseSignerWalletAdapter() {
        _classCallCheck(this, BaseSignerWalletAdapter);
        return _super.apply(this, arguments);
    }
    _createClass(BaseSignerWalletAdapter, [
        {
            key: "sendTransaction",
            value: function sendTransaction(transaction, connection) {
                var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return __awaiter(this, void 0, void 0, _Users_vts666_Downloads_ursas_soltool_solana_tools_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
                    var emit, _transaction, signers, sendOptions, rawTransaction;
                    return _Users_vts666_Downloads_ursas_soltool_solana_tools_node_modules_next_dist_compiled_regenerator_runtime_runtime_js__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                emit = true;
                                _ctx.prev = 1;
                                _ctx.prev = 2;
                                ;
                                transaction.feePayer || (transaction.feePayer = this.publicKey || undefined);
                                _ctx.t0 = transaction.recentBlockhash;
                                if (_ctx.t0) {
                                    _ctx.next = 10;
                                    break;
                                }
                                _ctx.next = 9;
                                return connection.getRecentBlockhash('finalized');
                            case 9:
                                transaction.recentBlockhash = _ctx.sent.blockhash;
                            case 10:
                                signers = options.signers, sendOptions = __rest(options, [
                                    "signers"
                                ]);
                                (signers === null || signers === void 0 ? void 0 : signers.length) && (_transaction = transaction).partialSign.apply(_transaction, _toConsumableArray(signers));
                                _ctx.next = 14;
                                return this.signTransaction(transaction);
                            case 14:
                                transaction = _ctx.sent;
                                rawTransaction = transaction.serialize();
                                _ctx.next = 18;
                                return connection.sendRawTransaction(rawTransaction, sendOptions);
                            case 18:
                                return _ctx.abrupt("return", _ctx.sent);
                            case 21:
                                _ctx.prev = 21;
                                _ctx.t1 = _ctx["catch"](2);
                                if (!_instanceof(_ctx.t1, _errors__WEBPACK_IMPORTED_MODULE_1__/* .WalletError */ .lj)) {
                                    _ctx.next = 26;
                                    break;
                                }
                                emit = false;
                                throw _ctx.t1;
                            case 26:
                                throw new _errors__WEBPACK_IMPORTED_MODULE_1__/* .WalletSendTransactionError */ .IW(_ctx.t1 === null || _ctx.t1 === void 0 ? void 0 : _ctx.t1.message, _ctx.t1);
                            case 27:
                                _ctx.next = 33;
                                break;
                            case 29:
                                _ctx.prev = 29;
                                _ctx.t2 = _ctx["catch"](1);
                                if (emit) {
                                    this.emit('error', _ctx.t2);
                                }
                                throw _ctx.t2;
                            case 33:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            1,
                            29
                        ],
                        [
                            2,
                            21
                        ]
                    ]);
                }));
            }
        }
    ]);
    return BaseSignerWalletAdapter;
}(_adapter__WEBPACK_IMPORTED_MODULE_2__/* .BaseWalletAdapter */ .mI);
var BaseMessageSignerWalletAdapter = /*#__PURE__*/ function(BaseSignerWalletAdapter) {
    "use strict";
    _inherits(BaseMessageSignerWalletAdapter, BaseSignerWalletAdapter);
    var _super = _createSuper(BaseMessageSignerWalletAdapter);
    function BaseMessageSignerWalletAdapter() {
        _classCallCheck(this, BaseMessageSignerWalletAdapter);
        return _super.apply(this, arguments);
    }
    return BaseMessageSignerWalletAdapter;
} //# sourceMappingURL=signer.js.map
(BaseSignerWalletAdapter);


/***/ }),

/***/ 77354:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "n": function() { return /* binding */ WalletProvider; }
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js
var runtime = __webpack_require__(34051);
var runtime_default = /*#__PURE__*/__webpack_require__.n(runtime);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/errors.js
var errors = __webpack_require__(4004);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/errors.js

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
var WalletNotSelectedError = /*#__PURE__*/ function(WalletError1) {
    "use strict";
    _inherits(WalletNotSelectedError, WalletError1);
    var _super = _createSuper(WalletNotSelectedError);
    function WalletNotSelectedError() {
        _classCallCheck(this, WalletNotSelectedError);
        var _this;
        _this = _super.call.apply(_super, [
            this
        ].concat(Array.prototype.slice.call(arguments)));
        _this.name = 'WalletNotSelectedError';
        return _this;
    }
    return WalletNotSelectedError;
} //# sourceMappingURL=errors.js.map
(errors/* WalletError */.lj);

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/useLocalStorage.js

function useLocalStorage(key, defaultState) {
    var ref = (0,react.useState)(function() {
        if (typeof localStorage === 'undefined') return defaultState;
        var value = localStorage.getItem(key);
        try {
            return value ? JSON.parse(value) : defaultState;
        } catch (error) {
            console.warn(error);
            return defaultState;
        }
    }), value1 = ref[0], setValue = ref[1];
    var setLocalStorage = (0,react.useCallback)(function(newValue) {
        if (newValue === value1) return;
        setValue(newValue);
        if (newValue === null) {
            localStorage.removeItem(key);
        } else {
            try {
                localStorage.setItem(key, JSON.stringify(newValue));
            } catch (error) {
                console.error(error);
            }
        }
    }, [
        value1,
        setValue,
        key
    ]);
    return [
        value1,
        setLocalStorage
    ];
} //# sourceMappingURL=useLocalStorage.js.map

// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-react/lib/useWallet.js
var useWallet = __webpack_require__(77257);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react/lib/WalletProvider.js






function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    var adopt = function adopt(value) {
        return _instanceof(value, P) ? value : new P(function(resolve) {
            resolve(value);
        });
    };
    return new (P || (P = Promise))(function(resolve, reject) {
        var fulfilled = function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var initialState = {
    wallet: null,
    adapter: null,
    ready: false,
    publicKey: null,
    connected: false
};
var WalletProvider = function(param) {
    var children = param.children, wallets = param.wallets, _autoConnect = param.autoConnect, autoConnect = _autoConnect === void 0 ? false : _autoConnect, tmp = param.onError, _onError = tmp === void 0 ? function(error) {
        return console.error(error);
    } : tmp, _localStorageKey = param.localStorageKey, localStorageKey = _localStorageKey === void 0 ? 'walletName' : _localStorageKey;
    var ref = _slicedToArray(useLocalStorage(localStorageKey, null), 2), name = ref[0], setName = ref[1];
    var ref1 = (0,react.useState)(initialState), ref2 = ref1[0], wallet1 = ref2.wallet, adapter1 = ref2.adapter, ready1 = ref2.ready, publicKey1 = ref2.publicKey, connected1 = ref2.connected, setState = ref1[1];
    var ref3 = (0,react.useState)(false), connecting = ref3[0], setConnecting = ref3[1];
    var ref4 = (0,react.useState)(false), disconnecting = ref4[0], setDisconnecting = ref4[1];
    var isConnecting = (0,react.useRef)(false);
    var isDisconnecting = (0,react.useRef)(false);
    var isUnloading = (0,react.useRef)(false);
    // Map of wallet names to wallets
    var walletsByName1 = (0,react.useMemo)(function() {
        return wallets.reduce(function(walletsByName, wallet) {
            walletsByName[wallet.name] = wallet;
            return walletsByName;
        }, {});
    }, [
        wallets
    ]);
    // When the selected wallet changes, initialize the state
    (0,react.useEffect)(function() {
        var wallet = name && walletsByName1[name] || null;
        var adapter = wallet && wallet.adapter();
        if (adapter) {
            var ready = adapter.ready, publicKey = adapter.publicKey, connected = adapter.connected;
            setState({
                wallet: wallet,
                adapter: adapter,
                connected: connected,
                publicKey: publicKey,
                ready: ready
            });
        } else {
            setState(initialState);
        }
    }, [
        name,
        walletsByName1,
        setState
    ]);
    // If autoConnect is enabled, try to connect when the adapter changes and is ready
    (0,react.useEffect)(function() {
        if (isConnecting.current || connecting || connected1 || !autoConnect || !adapter1 || !ready1) return;
        (function() {
            return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                return runtime_default().wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            isConnecting.current = true;
                            setConnecting(true);
                            _ctx.prev = 2;
                            _ctx.next = 5;
                            return adapter1.connect();
                        case 5:
                            _ctx.next = 10;
                            break;
                        case 7:
                            _ctx.prev = 7;
                            _ctx.t0 = _ctx["catch"](2);
                            // Clear the selected wallet
                            setName(null);
                        case 10:
                            _ctx.prev = 10;
                            setConnecting(false);
                            isConnecting.current = false;
                            return _ctx.finish(10);
                        case 14:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee, null, [
                    [
                        2,
                        7,
                        10,
                        14
                    ]
                ]);
            }));
        })();
    }, [
        isConnecting,
        connecting,
        connected1,
        autoConnect,
        adapter1,
        ready1,
        setConnecting,
        setName
    ]);
    // If the window is closing or reloading, ignore disconnect and error events from the adapter
    (0,react.useEffect)(function() {
        var listener = function listener() {
            isUnloading.current = true;
        };
        window.addEventListener('beforeunload', listener);
        return function() {
            return window.removeEventListener('beforeunload', listener);
        };
    }, [
        isUnloading
    ]);
    // Select a wallet by name
    var select = (0,react.useCallback)(function(newName) {
        return __awaiter(void 0, void 0, void 0, runtime_default().mark(function _callee() {
            return runtime_default().wrap(function _callee$(_ctx) {
                while(1)switch(_ctx.prev = _ctx.next){
                    case 0:
                        if (!(name === newName)) {
                            _ctx.next = 2;
                            break;
                        }
                        return _ctx.abrupt("return");
                    case 2:
                        if (!adapter1) {
                            _ctx.next = 5;
                            break;
                        }
                        _ctx.next = 5;
                        return adapter1.disconnect();
                    case 5:
                        setName(newName);
                    case 6:
                    case "end":
                        return _ctx.stop();
                }
            }, _callee);
        }));
    }, [
        name,
        adapter1,
        setName
    ]);
    // Handle the adapter's ready event
    var onReady = (0,react.useCallback)(function() {
        return setState(function(state) {
            return Object.assign(Object.assign({}, state), {
                ready: true
            });
        });
    }, [
        setState
    ]);
    // Handle the adapter's connect event
    var onConnect = (0,react.useCallback)(function() {
        if (!adapter1) return;
        var connected = adapter1.connected, publicKey = adapter1.publicKey, ready = adapter1.ready;
        setState(function(state) {
            return Object.assign(Object.assign({}, state), {
                connected: connected,
                publicKey: publicKey,
                ready: ready
            });
        });
    }, [
        adapter1,
        setState
    ]);
    // Handle the adapter's disconnect event
    var onDisconnect = (0,react.useCallback)(function() {
        // Clear the selected wallet unless the window is unloading
        if (!isUnloading.current) setName(null);
    }, [
        isUnloading,
        setName
    ]);
    // Handle the adapter's error event, and local errors
    var onError = (0,react.useCallback)(function(error) {
        // Call the provided error handler unless the window is unloading
        if (!isUnloading.current) _onError(error);
        return error;
    }, [
        isUnloading,
        _onError
    ]);
    // Connect the adapter to the wallet
    var connect = (0,react.useCallback)(function() {
        return __awaiter(void 0, void 0, void 0, runtime_default().mark(function _callee() {
            return runtime_default().wrap(function _callee$(_ctx) {
                while(1)switch(_ctx.prev = _ctx.next){
                    case 0:
                        if (!(isConnecting.current || connecting || disconnecting || connected1)) {
                            _ctx.next = 2;
                            break;
                        }
                        return _ctx.abrupt("return");
                    case 2:
                        if (!(!wallet1 || !adapter1)) {
                            _ctx.next = 4;
                            break;
                        }
                        throw onError(new WalletNotSelectedError());
                    case 4:
                        if (ready1) {
                            _ctx.next = 8;
                            break;
                        }
                        // Clear the selected wallet
                        setName(null);
                        if (true) {
                            window.open(wallet1.url, '_blank');
                        }
                        throw onError(new errors/* WalletNotReadyError */.OZ());
                    case 8:
                        isConnecting.current = true;
                        setConnecting(true);
                        _ctx.prev = 10;
                        _ctx.next = 13;
                        return adapter1.connect();
                    case 13:
                        _ctx.next = 19;
                        break;
                    case 15:
                        _ctx.prev = 15;
                        _ctx.t0 = _ctx["catch"](10);
                        // Clear the selected wallet
                        setName(null);
                        // Rethrow the error, and onError will also be called
                        throw _ctx.t0;
                    case 19:
                        _ctx.prev = 19;
                        setConnecting(false);
                        isConnecting.current = false;
                        return _ctx.finish(19);
                    case 23:
                    case "end":
                        return _ctx.stop();
                }
            }, _callee, null, [
                [
                    10,
                    15,
                    19,
                    23
                ]
            ]);
        }));
    }, [
        isConnecting,
        connecting,
        disconnecting,
        connected1,
        wallet1,
        adapter1,
        onError,
        ready1,
        setConnecting,
        setName
    ]);
    // Disconnect the adapter from the wallet
    var disconnect = (0,react.useCallback)(function() {
        return __awaiter(void 0, void 0, void 0, runtime_default().mark(function _callee() {
            return runtime_default().wrap(function _callee$(_ctx) {
                while(1)switch(_ctx.prev = _ctx.next){
                    case 0:
                        if (!(isDisconnecting.current || disconnecting)) {
                            _ctx.next = 2;
                            break;
                        }
                        return _ctx.abrupt("return");
                    case 2:
                        if (adapter1) {
                            _ctx.next = 4;
                            break;
                        }
                        return _ctx.abrupt("return", setName(null));
                    case 4:
                        isDisconnecting.current = true;
                        setDisconnecting(true);
                        _ctx.prev = 6;
                        _ctx.next = 9;
                        return adapter1.disconnect();
                    case 9:
                        _ctx.next = 15;
                        break;
                    case 11:
                        _ctx.prev = 11;
                        _ctx.t0 = _ctx["catch"](6);
                        // Clear the selected wallet
                        setName(null);
                        // Rethrow the error, and onError will also be called
                        throw _ctx.t0;
                    case 15:
                        _ctx.prev = 15;
                        setDisconnecting(false);
                        isDisconnecting.current = false;
                        return _ctx.finish(15);
                    case 19:
                    case "end":
                        return _ctx.stop();
                }
            }, _callee, null, [
                [
                    6,
                    11,
                    15,
                    19
                ]
            ]);
        }));
    }, [
        isDisconnecting,
        disconnecting,
        adapter1,
        setDisconnecting,
        setName
    ]);
    // Send a transaction using the provided connection
    var sendTransaction = (0,react.useCallback)(function(transaction, connection, options) {
        return __awaiter(void 0, void 0, void 0, runtime_default().mark(function _callee() {
            return runtime_default().wrap(function _callee$(_ctx) {
                while(1)switch(_ctx.prev = _ctx.next){
                    case 0:
                        if (adapter1) {
                            _ctx.next = 2;
                            break;
                        }
                        throw onError(new WalletNotSelectedError());
                    case 2:
                        if (connected1) {
                            _ctx.next = 4;
                            break;
                        }
                        throw onError(new errors/* WalletNotConnectedError */.oS());
                    case 4:
                        _ctx.next = 6;
                        return adapter1.sendTransaction(transaction, connection, options);
                    case 6:
                        return _ctx.abrupt("return", _ctx.sent);
                    case 7:
                    case "end":
                        return _ctx.stop();
                }
            }, _callee);
        }));
    }, [
        adapter1,
        onError,
        connected1
    ]);
    // Sign a transaction if the wallet supports it
    var signTransaction = (0,react.useMemo)(function() {
        return adapter1 && 'signTransaction' in adapter1 ? function(transaction) {
            return __awaiter(void 0, void 0, void 0, runtime_default().mark(function _callee() {
                return runtime_default().wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            if (connected1) {
                                _ctx.next = 2;
                                break;
                            }
                            throw onError(new errors/* WalletNotConnectedError */.oS());
                        case 2:
                            _ctx.next = 4;
                            return adapter1.signTransaction(transaction);
                        case 4:
                            return _ctx.abrupt("return", _ctx.sent);
                        case 5:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
        } : undefined;
    }, [
        adapter1,
        onError,
        connected1
    ]);
    // Sign multiple transactions if the wallet supports it
    var signAllTransactions = (0,react.useMemo)(function() {
        return adapter1 && 'signAllTransactions' in adapter1 ? function(transactions) {
            return __awaiter(void 0, void 0, void 0, runtime_default().mark(function _callee() {
                return runtime_default().wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            if (connected1) {
                                _ctx.next = 2;
                                break;
                            }
                            throw onError(new errors/* WalletNotConnectedError */.oS());
                        case 2:
                            _ctx.next = 4;
                            return adapter1.signAllTransactions(transactions);
                        case 4:
                            return _ctx.abrupt("return", _ctx.sent);
                        case 5:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
        } : undefined;
    }, [
        adapter1,
        onError,
        connected1
    ]);
    // Sign an arbitrary message if the wallet supports it
    var signMessage = (0,react.useMemo)(function() {
        return adapter1 && 'signMessage' in adapter1 ? function(message) {
            return __awaiter(void 0, void 0, void 0, runtime_default().mark(function _callee() {
                return runtime_default().wrap(function _callee$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            if (connected1) {
                                _ctx.next = 2;
                                break;
                            }
                            throw onError(new errors/* WalletNotConnectedError */.oS());
                        case 2:
                            _ctx.next = 4;
                            return adapter1.signMessage(message);
                        case 4:
                            return _ctx.abrupt("return", _ctx.sent);
                        case 5:
                        case "end":
                            return _ctx.stop();
                    }
                }, _callee);
            }));
        } : undefined;
    }, [
        adapter1,
        onError,
        connected1
    ]);
    // Setup and teardown event listeners when the adapter changes
    (0,react.useEffect)(function() {
        if (adapter1) {
            adapter1.on('ready', onReady);
            adapter1.on('connect', onConnect);
            adapter1.on('disconnect', onDisconnect);
            adapter1.on('error', onError);
            return function() {
                adapter1.off('ready', onReady);
                adapter1.off('connect', onConnect);
                adapter1.off('disconnect', onDisconnect);
                adapter1.off('error', onError);
            };
        }
    }, [
        adapter1,
        onReady,
        onConnect,
        onDisconnect,
        onError
    ]);
    return(/*#__PURE__*/ react.createElement(useWallet/* WalletContext.Provider */.z.Provider, {
        value: {
            wallets: wallets,
            autoConnect: autoConnect,
            wallet: wallet1,
            adapter: adapter1,
            publicKey: publicKey1,
            ready: ready1,
            connected: connected1,
            connecting: connecting,
            disconnecting: disconnecting,
            select: select,
            connect: connect,
            disconnect: disconnect,
            sendTransaction: sendTransaction,
            signTransaction: signTransaction,
            signAllTransactions: signAllTransactions,
            signMessage: signMessage
        }
    }, children));
}; //# sourceMappingURL=WalletProvider.js.map


/***/ }),

/***/ 22257:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const ANY = Symbol('SemVer ANY')
// hoisted class for cyclic dependency
class Comparator {
  static get ANY () {
    return ANY
  }
  constructor (comp, options) {
    options = parseOptions(options)

    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp
      } else {
        comp = comp.value
      }
    }

    debug('comparator', comp, options)
    this.options = options
    this.loose = !!options.loose
    this.parse(comp)

    if (this.semver === ANY) {
      this.value = ''
    } else {
      this.value = this.operator + this.semver.version
    }

    debug('comp', this)
  }

  parse (comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
    const m = comp.match(r)

    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`)
    }

    this.operator = m[1] !== undefined ? m[1] : ''
    if (this.operator === '=') {
      this.operator = ''
    }

    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) {
      this.semver = ANY
    } else {
      this.semver = new SemVer(m[2], this.options.loose)
    }
  }

  toString () {
    return this.value
  }

  test (version) {
    debug('Comparator.test', version, this.options.loose)

    if (this.semver === ANY || version === ANY) {
      return true
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    return cmp(version, this.operator, this.semver, this.options)
  }

  intersects (comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required')
    }

    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false
      }
    }

    if (this.operator === '') {
      if (this.value === '') {
        return true
      }
      return new Range(comp.value, options).test(this.value)
    } else if (comp.operator === '') {
      if (comp.value === '') {
        return true
      }
      return new Range(this.value, options).test(comp.semver)
    }

    const sameDirectionIncreasing =
      (this.operator === '>=' || this.operator === '>') &&
      (comp.operator === '>=' || comp.operator === '>')
    const sameDirectionDecreasing =
      (this.operator === '<=' || this.operator === '<') &&
      (comp.operator === '<=' || comp.operator === '<')
    const sameSemVer = this.semver.version === comp.semver.version
    const differentDirectionsInclusive =
      (this.operator === '>=' || this.operator === '<=') &&
      (comp.operator === '>=' || comp.operator === '<=')
    const oppositeDirectionsLessThan =
      cmp(this.semver, '<', comp.semver, options) &&
      (this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '<=' || comp.operator === '<')
    const oppositeDirectionsGreaterThan =
      cmp(this.semver, '>', comp.semver, options) &&
      (this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '>=' || comp.operator === '>')

    return (
      sameDirectionIncreasing ||
      sameDirectionDecreasing ||
      (sameSemVer && differentDirectionsInclusive) ||
      oppositeDirectionsLessThan ||
      oppositeDirectionsGreaterThan
    )
  }
}

module.exports = Comparator

const parseOptions = __webpack_require__(12893)
const {re, t} = __webpack_require__(55765)
const cmp = __webpack_require__(7539)
const debug = __webpack_require__(74225)
const SemVer = __webpack_require__(26376)
const Range = __webpack_require__(66902)


/***/ }),

/***/ 66902:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// hoisted class for cyclic dependency
class Range {
  constructor (range, options) {
    options = parseOptions(options)

    if (range instanceof Range) {
      if (
        range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease
      ) {
        return range
      } else {
        return new Range(range.raw, options)
      }
    }

    if (range instanceof Comparator) {
      // just put it in the set and return
      this.raw = range.value
      this.set = [[range]]
      this.format()
      return this
    }

    this.options = options
    this.loose = !!options.loose
    this.includePrerelease = !!options.includePrerelease

    // First, split based on boolean or ||
    this.raw = range
    this.set = range
      .split(/\s*\|\|\s*/)
      // map the range to a 2d array of comparators
      .map(range => this.parseRange(range.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter(c => c.length)

    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${range}`)
    }

    // if we have any that are not the null set, throw out null sets.
    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      const first = this.set[0]
      this.set = this.set.filter(c => !isNullSet(c[0]))
      if (this.set.length === 0)
        this.set = [first]
      else if (this.set.length > 1) {
        // if we have any that are *, then the range is just *
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c]
            break
          }
        }
      }
    }

    this.format()
  }

  format () {
    this.range = this.set
      .map((comps) => {
        return comps.join(' ').trim()
      })
      .join('||')
      .trim()
    return this.range
  }

  toString () {
    return this.range
  }

  parseRange (range) {
    range = range.trim()

    // memoize range parsing for performance.
    // this is a very hot path, and fully deterministic.
    const memoOpts = Object.keys(this.options).join(',')
    const memoKey = `parseRange:${memoOpts}:${range}`
    const cached = cache.get(memoKey)
    if (cached)
      return cached

    const loose = this.options.loose
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease))
    debug('hyphen replace', range)
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
    debug('comparator trim', range, re[t.COMPARATORTRIM])

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace)

    // normalize spaces
    range = range.split(/\s+/).join(' ')

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    const compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
    const rangeList = range
      .split(' ')
      .map(comp => parseComparator(comp, this.options))
      .join(' ')
      .split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map(comp => replaceGTE0(comp, this.options))
      // in loose mode, throw out any that are not valid comparators
      .filter(this.options.loose ? comp => !!comp.match(compRe) : () => true)
      .map(comp => new Comparator(comp, this.options))

    // if any comparators are the null set, then replace with JUST null set
    // if more than one comparator, remove any * comparators
    // also, don't include the same comparator more than once
    const l = rangeList.length
    const rangeMap = new Map()
    for (const comp of rangeList) {
      if (isNullSet(comp))
        return [comp]
      rangeMap.set(comp.value, comp)
    }
    if (rangeMap.size > 1 && rangeMap.has(''))
      rangeMap.delete('')

    const result = [...rangeMap.values()]
    cache.set(memoKey, result)
    return result
  }

  intersects (range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required')
    }

    return this.set.some((thisComparators) => {
      return (
        isSatisfiable(thisComparators, options) &&
        range.set.some((rangeComparators) => {
          return (
            isSatisfiable(rangeComparators, options) &&
            thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options)
              })
            })
          )
        })
      )
    })
  }

  // if ANY of the sets match ALL of its comparators, then pass
  test (version) {
    if (!version) {
      return false
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true
      }
    }
    return false
  }
}
module.exports = Range

const LRU = __webpack_require__(39593)
const cache = new LRU({ max: 1000 })

const parseOptions = __webpack_require__(12893)
const Comparator = __webpack_require__(22257)
const debug = __webpack_require__(74225)
const SemVer = __webpack_require__(26376)
const {
  re,
  t,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace
} = __webpack_require__(55765)

const isNullSet = c => c.value === '<0.0.0-0'
const isAny = c => c.value === ''

// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options) => {
  let result = true
  const remainingComparators = comparators.slice()
  let testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options) => {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

const isX = id => !id || id.toLowerCase() === 'x' || id === '*'

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
const replaceTildes = (comp, options) =>
  comp.trim().split(/\s+/).map((comp) => {
    return replaceTilde(comp, options)
  }).join(' ')

const replaceTilde = (comp, options) => {
  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('tilde', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0-0
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = `>=${M}.${m}.${p}-${pr
      } <${M}.${+m + 1}.0-0`
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0-0
      ret = `>=${M}.${m}.${p
      } <${M}.${+m + 1}.0-0`
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
const replaceCarets = (comp, options) =>
  comp.trim().split(/\s+/).map((comp) => {
    return replaceCaret(comp, options)
  }).join(' ')

const replaceCaret = (comp, options) => {
  debug('caret', comp, options)
  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  const z = options.includePrerelease ? '-0' : ''
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('caret', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      if (M === '0') {
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`
      } else {
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p}-${pr
        } <${+M + 1}.0.0-0`
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p
        } <${+M + 1}.0.0-0`
      }
    }

    debug('caret return', ret)
    return ret
  })
}

const replaceXRanges = (comp, options) => {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map((comp) => {
    return replaceXRange(comp, options)
  }).join(' ')
}

const replaceXRange = (comp, options) => {
  comp = comp.trim()
  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    const xM = isX(M)
    const xm = xM || isX(m)
    const xp = xm || isX(p)
    const anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      if (gtlt === '<')
        pr = '-0'

      ret = `${gtlt + M}.${m}.${p}${pr}`
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr
      } <${M}.${+m + 1}.0-0`
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options) => {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

const replaceGTE0 = (comp, options) => {
  debug('replaceGTE0', comp, options)
  return comp.trim()
    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
const hyphenReplace = incPr => ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? '-0' : ''}`
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`
  } else if (fpr) {
    from = `>=${from}`
  } else {
    from = `>=${from}${incPr ? '-0' : ''}`
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`
  } else {
    to = `<=${to}`
  }

  return (`${from} ${to}`).trim()
}

const testSet = (set, version, options) => {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (let i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === Comparator.ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}


/***/ }),

/***/ 26376:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const debug = __webpack_require__(74225)
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __webpack_require__(83295)
const { re, t } = __webpack_require__(55765)

const parseOptions = __webpack_require__(12893)
const { compareIdentifiers } = __webpack_require__(86742)
class SemVer {
  constructor (version, options) {
    options = parseOptions(options)

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
          version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug('SemVer', version, options)
    this.options = options
    this.loose = !!options.loose
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version

    // these are actually numbers
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      })
    }

    this.build = m[5] ? m[5].split('.') : []
    this.format()
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug('SemVer.compare', this.version, this.options, other)
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options)
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0
    do {
      const a = this.prerelease[i]
      const b = other.prerelease[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    let i = 0
    do {
      const a = this.build[i]
      const b = other.build[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc('pre', identifier)
        break
      case 'preminor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc('pre', identifier)
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0
        this.inc('patch', identifier)
        this.inc('pre', identifier)
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier)
        }
        this.inc('pre', identifier)
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0) {
          this.prerelease = [0]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++
              i = -2
            }
          }
          if (i === -1) {
            // didn't increment anything
            this.prerelease.push(0)
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0]
            }
          } else {
            this.prerelease = [identifier, 0]
          }
        }
        break

      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.format()
    this.raw = this.version
    return this
  }
}

module.exports = SemVer


/***/ }),

/***/ 13507:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const parse = __webpack_require__(33959)
const clean = (version, options) => {
  const s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}
module.exports = clean


/***/ }),

/***/ 7539:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const eq = __webpack_require__(58718)
const neq = __webpack_require__(81194)
const gt = __webpack_require__(71312)
const gte = __webpack_require__(25903)
const lt = __webpack_require__(21544)
const lte = __webpack_require__(12056)

const cmp = (a, op, b, loose) => {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError(`Invalid operator: ${op}`)
  }
}
module.exports = cmp


/***/ }),

/***/ 99038:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)
const parse = __webpack_require__(33959)
const {re, t} = __webpack_require__(55765)

const coerce = (version, options) => {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  let match = null
  if (!options.rtl) {
    match = version.match(re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    let next
    while ((next = re[t.COERCERTL].exec(version)) &&
        (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
            next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1
  }

  if (match === null)
    return null

  return parse(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options)
}
module.exports = coerce


/***/ }),

/***/ 88880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)
const compareBuild = (a, b, loose) => {
  const versionA = new SemVer(a, loose)
  const versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}
module.exports = compareBuild


/***/ }),

/***/ 27880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const compare = __webpack_require__(46269)
const compareLoose = (a, b) => compare(a, b, true)
module.exports = compareLoose


/***/ }),

/***/ 46269:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)
const compare = (a, b, loose) =>
  new SemVer(a, loose).compare(new SemVer(b, loose))

module.exports = compare


/***/ }),

/***/ 62378:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const parse = __webpack_require__(33959)
const eq = __webpack_require__(58718)

const diff = (version1, version2) => {
  if (eq(version1, version2)) {
    return null
  } else {
    const v1 = parse(version1)
    const v2 = parse(version2)
    const hasPre = v1.prerelease.length || v2.prerelease.length
    const prefix = hasPre ? 'pre' : ''
    const defaultResult = hasPre ? 'prerelease' : ''
    for (const key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}
module.exports = diff


/***/ }),

/***/ 58718:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const compare = __webpack_require__(46269)
const eq = (a, b, loose) => compare(a, b, loose) === 0
module.exports = eq


/***/ }),

/***/ 71312:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const compare = __webpack_require__(46269)
const gt = (a, b, loose) => compare(a, b, loose) > 0
module.exports = gt


/***/ }),

/***/ 25903:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const compare = __webpack_require__(46269)
const gte = (a, b, loose) => compare(a, b, loose) >= 0
module.exports = gte


/***/ }),

/***/ 20253:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)

const inc = (version, release, options, identifier) => {
  if (typeof (options) === 'string') {
    identifier = options
    options = undefined
  }

  try {
    return new SemVer(version, options).inc(release, identifier).version
  } catch (er) {
    return null
  }
}
module.exports = inc


/***/ }),

/***/ 21544:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const compare = __webpack_require__(46269)
const lt = (a, b, loose) => compare(a, b, loose) < 0
module.exports = lt


/***/ }),

/***/ 12056:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const compare = __webpack_require__(46269)
const lte = (a, b, loose) => compare(a, b, loose) <= 0
module.exports = lte


/***/ }),

/***/ 38679:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)
const major = (a, loose) => new SemVer(a, loose).major
module.exports = major


/***/ }),

/***/ 87789:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)
const minor = (a, loose) => new SemVer(a, loose).minor
module.exports = minor


/***/ }),

/***/ 81194:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const compare = __webpack_require__(46269)
const neq = (a, b, loose) => compare(a, b, loose) !== 0
module.exports = neq


/***/ }),

/***/ 33959:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const {MAX_LENGTH} = __webpack_require__(83295)
const { re, t } = __webpack_require__(55765)
const SemVer = __webpack_require__(26376)

const parseOptions = __webpack_require__(12893)
const parse = (version, options) => {
  options = parseOptions(options)

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  const r = options.loose ? re[t.LOOSE] : re[t.FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

module.exports = parse


/***/ }),

/***/ 52358:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)
const patch = (a, loose) => new SemVer(a, loose).patch
module.exports = patch


/***/ }),

/***/ 57559:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const parse = __webpack_require__(33959)
const prerelease = (version, options) => {
  const parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}
module.exports = prerelease


/***/ }),

/***/ 79795:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const compare = __webpack_require__(46269)
const rcompare = (a, b, loose) => compare(b, a, loose)
module.exports = rcompare


/***/ }),

/***/ 63657:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const compareBuild = __webpack_require__(88880)
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose))
module.exports = rsort


/***/ }),

/***/ 45712:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Range = __webpack_require__(66902)
const satisfies = (version, range, options) => {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}
module.exports = satisfies


/***/ }),

/***/ 21100:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const compareBuild = __webpack_require__(88880)
const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose))
module.exports = sort


/***/ }),

/***/ 76397:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const parse = __webpack_require__(33959)
const valid = (version, options) => {
  const v = parse(version, options)
  return v ? v.version : null
}
module.exports = valid


/***/ }),

/***/ 81249:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// just pre-load all the stuff that index.js lazily exports
const internalRe = __webpack_require__(55765)
module.exports = {
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: (__webpack_require__(83295).SEMVER_SPEC_VERSION),
  SemVer: __webpack_require__(26376),
  compareIdentifiers: (__webpack_require__(86742).compareIdentifiers),
  rcompareIdentifiers: (__webpack_require__(86742).rcompareIdentifiers),
  parse: __webpack_require__(33959),
  valid: __webpack_require__(76397),
  clean: __webpack_require__(13507),
  inc: __webpack_require__(20253),
  diff: __webpack_require__(62378),
  major: __webpack_require__(38679),
  minor: __webpack_require__(87789),
  patch: __webpack_require__(52358),
  prerelease: __webpack_require__(57559),
  compare: __webpack_require__(46269),
  rcompare: __webpack_require__(79795),
  compareLoose: __webpack_require__(27880),
  compareBuild: __webpack_require__(88880),
  sort: __webpack_require__(21100),
  rsort: __webpack_require__(63657),
  gt: __webpack_require__(71312),
  lt: __webpack_require__(21544),
  eq: __webpack_require__(58718),
  neq: __webpack_require__(81194),
  gte: __webpack_require__(25903),
  lte: __webpack_require__(12056),
  cmp: __webpack_require__(7539),
  coerce: __webpack_require__(99038),
  Comparator: __webpack_require__(22257),
  Range: __webpack_require__(66902),
  satisfies: __webpack_require__(45712),
  toComparators: __webpack_require__(51042),
  maxSatisfying: __webpack_require__(85775),
  minSatisfying: __webpack_require__(71657),
  minVersion: __webpack_require__(95316),
  validRange: __webpack_require__(89042),
  outside: __webpack_require__(6826),
  gtr: __webpack_require__(97606),
  ltr: __webpack_require__(50032),
  intersects: __webpack_require__(82937),
  simplifyRange: __webpack_require__(17908),
  subset: __webpack_require__(50799),
}


/***/ }),

/***/ 83295:
/***/ (function(module) {

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0'

const MAX_LENGTH = 256
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16

module.exports = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH,
  MAX_SAFE_INTEGER,
  MAX_SAFE_COMPONENT_LENGTH
}


/***/ }),

/***/ 74225:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var process = __webpack_require__(34155);
const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {}

module.exports = debug


/***/ }),

/***/ 86742:
/***/ (function(module) {

const numeric = /^[0-9]+$/
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a)
  const bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a)

module.exports = {
  compareIdentifiers,
  rcompareIdentifiers
}


/***/ }),

/***/ 12893:
/***/ (function(module) {

// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const opts = ['includePrerelease', 'loose', 'rtl']
const parseOptions = options =>
  !options ? {}
  : typeof options !== 'object' ? { loose: true }
  : opts.filter(k => options[k]).reduce((options, k) => {
    options[k] = true
    return options
  }, {})
module.exports = parseOptions


/***/ }),

/***/ 55765:
/***/ (function(module, exports, __webpack_require__) {

const { MAX_SAFE_COMPONENT_LENGTH } = __webpack_require__(83295)
const debug = __webpack_require__(74225)
exports = module.exports = {}

// The actual regexps go on exports.re
const re = exports.re = []
const src = exports.src = []
const t = exports.t = {}
let R = 0

const createToken = (name, value, isGlobal) => {
  const index = R++
  debug(index, value)
  t[name] = index
  src[index] = value
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined)
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+')

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*')

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`)

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`)

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`)

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`)

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`)

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+')

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`)

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`)

createToken('FULL', `^${src[t.FULLPLAIN]}$`)

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`)

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`)

createToken('GTLT', '((?:<|>)?=?)')

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`)

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`)

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`)

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`)
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`)

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCE', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:$|[^\\d])`)
createToken('COERCERTL', src[t.COERCE], true)

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)')

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true)
exports.tildeTrimReplace = '$1~'

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`)
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`)

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)')

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true)
exports.caretTrimReplace = '$1^'

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`)
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`)

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`)
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`)

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true)
exports.comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`)

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`)

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*')
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$')
createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$')


/***/ }),

/***/ 97606:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Determine if version is greater than all the versions possible in the range.
const outside = __webpack_require__(6826)
const gtr = (version, range, options) => outside(version, range, '>', options)
module.exports = gtr


/***/ }),

/***/ 82937:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Range = __webpack_require__(66902)
const intersects = (r1, r2, options) => {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}
module.exports = intersects


/***/ }),

/***/ 50032:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const outside = __webpack_require__(6826)
// Determine if version is less than all the versions possible in the range
const ltr = (version, range, options) => outside(version, range, '<', options)
module.exports = ltr


/***/ }),

/***/ 85775:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)
const Range = __webpack_require__(66902)

const maxSatisfying = (versions, range, options) => {
  let max = null
  let maxSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}
module.exports = maxSatisfying


/***/ }),

/***/ 71657:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)
const Range = __webpack_require__(66902)
const minSatisfying = (versions, range, options) => {
  let min = null
  let minSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}
module.exports = minSatisfying


/***/ }),

/***/ 95316:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)
const Range = __webpack_require__(66902)
const gt = __webpack_require__(71312)

const minVersion = (range, loose) => {
  range = new Range(range, loose)

  let minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let setMin = null
    comparators.forEach((comparator) => {
      // Clone to avoid manipulating the comparator's semver object.
      const compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!setMin || gt(compver, setMin)) {
            setMin = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`)
      }
    })
    if (setMin && (!minver || gt(minver, setMin)))
      minver = setMin
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}
module.exports = minVersion


/***/ }),

/***/ 6826:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const SemVer = __webpack_require__(26376)
const Comparator = __webpack_require__(22257)
const {ANY} = Comparator
const Range = __webpack_require__(66902)
const satisfies = __webpack_require__(45712)
const gt = __webpack_require__(71312)
const lt = __webpack_require__(21544)
const lte = __webpack_require__(12056)
const gte = __webpack_require__(25903)

const outside = (version, range, hilo, options) => {
  version = new SemVer(version, options)
  range = new Range(range, options)

  let gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisfies the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let high = null
    let low = null

    comparators.forEach((comparator) => {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

module.exports = outside


/***/ }),

/***/ 17908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
const satisfies = __webpack_require__(45712)
const compare = __webpack_require__(46269)
module.exports = (versions, range, options) => {
  const set = []
  let min = null
  let prev = null
  const v = versions.sort((a, b) => compare(a, b, options))
  for (const version of v) {
    const included = satisfies(version, range, options)
    if (included) {
      prev = version
      if (!min)
        min = version
    } else {
      if (prev) {
        set.push([min, prev])
      }
      prev = null
      min = null
    }
  }
  if (min)
    set.push([min, null])

  const ranges = []
  for (const [min, max] of set) {
    if (min === max)
      ranges.push(min)
    else if (!max && min === v[0])
      ranges.push('*')
    else if (!max)
      ranges.push(`>=${min}`)
    else if (min === v[0])
      ranges.push(`<=${max}`)
    else
      ranges.push(`${min} - ${max}`)
  }
  const simplified = ranges.join(' || ')
  const original = typeof range.raw === 'string' ? range.raw : String(range)
  return simplified.length < original.length ? simplified : range
}


/***/ }),

/***/ 50799:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Range = __webpack_require__(66902)
const Comparator = __webpack_require__(22257)
const { ANY } = Comparator
const satisfies = __webpack_require__(45712)
const compare = __webpack_require__(46269)

// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a null set, OR
// - Every simple range `r1, r2, ...` which is not a null set is a subset of
//   some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else if in prerelease mode, return false
//   - else replace c with `[>=0.0.0]`
// - If C is only the ANY comparator
//   - if in prerelease mode, return true
//   - else replace C with `[>=0.0.0]`
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If any C is a = range, and GT or LT are set, return false
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the GT.semver tuple, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the LT.semver tuple, return false
// - Else return true

const subset = (sub, dom, options = {}) => {
  if (sub === dom)
    return true

  sub = new Range(sub, options)
  dom = new Range(dom, options)
  let sawNonNull = false

  OUTER: for (const simpleSub of sub.set) {
    for (const simpleDom of dom.set) {
      const isSub = simpleSubset(simpleSub, simpleDom, options)
      sawNonNull = sawNonNull || isSub !== null
      if (isSub)
        continue OUTER
    }
    // the null set is a subset of everything, but null simple ranges in
    // a complex range should be ignored.  so if we saw a non-null range,
    // then we know this isn't a subset, but if EVERY simple range was null,
    // then it is a subset.
    if (sawNonNull)
      return false
  }
  return true
}

const simpleSubset = (sub, dom, options) => {
  if (sub === dom)
    return true

  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY)
      return true
    else if (options.includePrerelease)
      sub = [ new Comparator('>=0.0.0-0') ]
    else
      sub = [ new Comparator('>=0.0.0') ]
  }

  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease)
      return true
    else
      dom = [ new Comparator('>=0.0.0') ]
  }

  const eqSet = new Set()
  let gt, lt
  for (const c of sub) {
    if (c.operator === '>' || c.operator === '>=')
      gt = higherGT(gt, c, options)
    else if (c.operator === '<' || c.operator === '<=')
      lt = lowerLT(lt, c, options)
    else
      eqSet.add(c.semver)
  }

  if (eqSet.size > 1)
    return null

  let gtltComp
  if (gt && lt) {
    gtltComp = compare(gt.semver, lt.semver, options)
    if (gtltComp > 0)
      return null
    else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<='))
      return null
  }

  // will iterate one or zero times
  for (const eq of eqSet) {
    if (gt && !satisfies(eq, String(gt), options))
      return null

    if (lt && !satisfies(eq, String(lt), options))
      return null

    for (const c of dom) {
      if (!satisfies(eq, String(c), options))
        return false
    }

    return true
  }

  let higher, lower
  let hasDomLT, hasDomGT
  // if the subset has a prerelease, we need a comparator in the superset
  // with the same tuple and a prerelease, or it's not a subset
  let needDomLTPre = lt &&
    !options.includePrerelease &&
    lt.semver.prerelease.length ? lt.semver : false
  let needDomGTPre = gt &&
    !options.includePrerelease &&
    gt.semver.prerelease.length ? gt.semver : false
  // exception: <1.2.3-0 is the same as <1.2.3
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false
  }

  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>='
    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<='
    if (gt) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomGTPre.major &&
            c.semver.minor === needDomGTPre.minor &&
            c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false
        }
      }
      if (c.operator === '>' || c.operator === '>=') {
        higher = higherGT(gt, c, options)
        if (higher === c && higher !== gt)
          return false
      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options))
        return false
    }
    if (lt) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomLTPre.major &&
            c.semver.minor === needDomLTPre.minor &&
            c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false
        }
      }
      if (c.operator === '<' || c.operator === '<=') {
        lower = lowerLT(lt, c, options)
        if (lower === c && lower !== lt)
          return false
      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options))
        return false
    }
    if (!c.operator && (lt || gt) && gtltComp !== 0)
      return false
  }

  // if there was a < or >, and nothing in the dom, then must be false
  // UNLESS it was limited by another range in the other direction.
  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
  if (gt && hasDomLT && !lt && gtltComp !== 0)
    return false

  if (lt && hasDomGT && !gt && gtltComp !== 0)
    return false

  // we needed a prerelease range in a specific tuple, but didn't get one
  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
  // because it includes prereleases in the 1.2.3 tuple
  if (needDomGTPre || needDomLTPre)
    return false

  return true
}

// >=1.2.3 is lower than >1.2.3
const higherGT = (a, b, options) => {
  if (!a)
    return b
  const comp = compare(a.semver, b.semver, options)
  return comp > 0 ? a
    : comp < 0 ? b
    : b.operator === '>' && a.operator === '>=' ? b
    : a
}

// <=1.2.3 is higher than <1.2.3
const lowerLT = (a, b, options) => {
  if (!a)
    return b
  const comp = compare(a.semver, b.semver, options)
  return comp < 0 ? a
    : comp > 0 ? b
    : b.operator === '<' && a.operator === '<=' ? b
    : a
}

module.exports = subset


/***/ }),

/***/ 51042:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Range = __webpack_require__(66902)

// Mostly just for testing and legacy API reasons
const toComparators = (range, options) =>
  new Range(range, options).set
    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '))

module.exports = toComparators


/***/ }),

/***/ 89042:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const Range = __webpack_require__(66902)
const validRange = (range, options) => {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}
module.exports = validRange


/***/ }),

/***/ 49602:
/***/ (function(module) {

"use strict";

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}


/***/ }),

/***/ 34411:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  __webpack_require__(49602)(Yallist)
} catch (er) {}


/***/ }),

/***/ 45214:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "D": function() { return /* binding */ getLedgerWallet; }
});

// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__(17187);
var events_default = /*#__PURE__*/__webpack_require__.n(events);
// EXTERNAL MODULE: ./node_modules/@ledgerhq/errors/lib-es/index.js + 1 modules
var lib_es = __webpack_require__(50580);
;// CONCATENATED MODULE: ./node_modules/@ledgerhq/hw-transport/lib-es/Transport.js
/* provided dependency */ var Buffer = __webpack_require__(48764)["Buffer"];
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};



/**
 * Transport defines the generic interface to share between node/u2f impl
 * A **Descriptor** is a parametric type that is up to be determined for the implementation.
 * it can be for instance an ID, an file path, a URL,...
 */
var Transport = /** @class */ (function () {
    function Transport() {
        var _this = this;
        this.exchangeTimeout = 30000;
        this.unresponsiveTimeout = 15000;
        this.deviceModel = null;
        this._events = new (events_default())();
        /**
         * wrapper on top of exchange to simplify work of the implementation.
         * @param cla
         * @param ins
         * @param p1
         * @param p2
         * @param data
         * @param statusList is a list of accepted status code (shorts). [0x9000] by default
         * @return a Promise of response buffer
         */
        this.send = function (cla, ins, p1, p2, data, statusList) {
            if (data === void 0) { data = Buffer.alloc(0); }
            if (statusList === void 0) { statusList = [lib_es.StatusCodes.OK]; }
            return __awaiter(_this, void 0, void 0, function () {
                var response, sw;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (data.length >= 256) {
                                throw new lib_es.TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
                            }
                            return [4 /*yield*/, this.exchange(Buffer.concat([
                                    Buffer.from([cla, ins, p1, p2]),
                                    Buffer.from([data.length]),
                                    data,
                                ]))];
                        case 1:
                            response = _a.sent();
                            sw = response.readUInt16BE(response.length - 2);
                            if (!statusList.some(function (s) { return s === sw; })) {
                                throw new lib_es.TransportStatusError(sw);
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        this.exchangeAtomicImpl = function (f) { return __awaiter(_this, void 0, void 0, function () {
            var resolveBusy, busyPromise, unresponsiveReached, timeout, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.exchangeBusyPromise) {
                            throw new lib_es.TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
                        }
                        busyPromise = new Promise(function (r) {
                            resolveBusy = r;
                        });
                        this.exchangeBusyPromise = busyPromise;
                        unresponsiveReached = false;
                        timeout = setTimeout(function () {
                            unresponsiveReached = true;
                            _this.emit("unresponsive");
                        }, this.unresponsiveTimeout);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, f()];
                    case 2:
                        res = _a.sent();
                        if (unresponsiveReached) {
                            this.emit("responsive");
                        }
                        return [2 /*return*/, res];
                    case 3:
                        clearTimeout(timeout);
                        if (resolveBusy)
                            resolveBusy();
                        this.exchangeBusyPromise = null;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this._appAPIlock = null;
    }
    /**
     * low level api to communicate with the device
     * This method is for implementations to implement but should not be directly called.
     * Instead, the recommanded way is to use send() method
     * @param apdu the data to send
     * @return a Promise of response data
     */
    Transport.prototype.exchange = function (_apdu) {
        throw new Error("exchange not implemented");
    };
    /**
     * set the "scramble key" for the next exchanges with the device.
     * Each App can have a different scramble key and they internally will set it at instanciation.
     * @param key the scramble key
     */
    Transport.prototype.setScrambleKey = function (_key) { };
    /**
     * close the exchange with the device.
     * @return a Promise that ends when the transport is closed.
     */
    Transport.prototype.close = function () {
        return Promise.resolve();
    };
    /**
     * Listen to an event on an instance of transport.
     * Transport implementation can have specific events. Here is the common events:
     * * `"disconnect"` : triggered if Transport is disconnected
     */
    Transport.prototype.on = function (eventName, cb) {
        this._events.on(eventName, cb);
    };
    /**
     * Stop listening to an event on an instance of transport.
     */
    Transport.prototype.off = function (eventName, cb) {
        this._events.removeListener(eventName, cb);
    };
    Transport.prototype.emit = function (event) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this._events).emit.apply(_a, __spreadArray([event], __read(args), false));
    };
    /**
     * Enable or not logs of the binary exchange
     */
    Transport.prototype.setDebugMode = function () {
        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
    };
    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */
    Transport.prototype.setExchangeTimeout = function (exchangeTimeout) {
        this.exchangeTimeout = exchangeTimeout;
    };
    /**
     * Define the delay before emitting "unresponsive" on an exchange that does not respond
     */
    Transport.prototype.setExchangeUnresponsiveTimeout = function (unresponsiveTimeout) {
        this.unresponsiveTimeout = unresponsiveTimeout;
    };
    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
    TransportFoo.create().then(transport => ...)
     */
    Transport.create = function (openTimeout, listenTimeout) {
        var _this = this;
        if (openTimeout === void 0) { openTimeout = 3000; }
        return new Promise(function (resolve, reject) {
            var found = false;
            var sub = _this.listen({
                next: function (e) {
                    found = true;
                    if (sub)
                        sub.unsubscribe();
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    _this.open(e.descriptor, openTimeout).then(resolve, reject);
                },
                error: function (e) {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    reject(e);
                },
                complete: function () {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    if (!found) {
                        reject(new lib_es.TransportError(_this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
                    }
                }
            });
            var listenTimeoutId = listenTimeout
                ? setTimeout(function () {
                    sub.unsubscribe();
                    reject(new lib_es.TransportError(_this.ErrorMessage_ListenTimeout, "ListenTimeout"));
                }, listenTimeout)
                : null;
        });
    };
    Transport.prototype.decorateAppAPIMethods = function (self, methods, scrambleKey) {
        var e_1, _a;
        try {
            for (var methods_1 = __values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()) {
                var methodName = methods_1_1.value;
                self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (methods_1_1 && !methods_1_1.done && (_a = methods_1["return"])) _a.call(methods_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Transport.prototype.decorateAppAPIMethod = function (methodName, f, ctx, scrambleKey) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var _appAPIlock;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _appAPIlock = this._appAPIlock;
                            if (_appAPIlock) {
                                return [2 /*return*/, Promise.reject(new lib_es.TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"))];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            this._appAPIlock = methodName;
                            this.setScrambleKey(scrambleKey);
                            return [4 /*yield*/, f.apply(ctx, args)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            this._appAPIlock = null;
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
    };
    Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
    Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";
    return Transport;
}());
/* harmony default export */ var lib_es_Transport = (Transport);
//# sourceMappingURL=Transport.js.map
// EXTERNAL MODULE: ./node_modules/@ledgerhq/devices/lib/hid-framing.js
var hid_framing = __webpack_require__(57204);
// EXTERNAL MODULE: ./node_modules/semver/index.js
var semver = __webpack_require__(81249);
var semver_default = /*#__PURE__*/__webpack_require__.n(semver);
;// CONCATENATED MODULE: ./node_modules/@ledgerhq/devices/lib-es/index.js
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;

/**
 * The USB product IDs will be defined as MMII, encoding a model (MM) and an interface bitfield (II)
 *
 ** Model
 * Ledger Nano S : 0x10
 * Ledger Blue : 0x00
 * Ledger Nano X : 0x40
 *
 ** Interface support bitfield
 * Generic HID : 0x01
 * Keyboard HID : 0x02
 * U2F : 0x04
 * CCID : 0x08
 * WebUSB : 0x10
 */
var IIGenericHID = 0x01;
var IIKeyboardHID = 0x02;
var IIU2F = 0x04;
var IICCID = 0x08;
var IIWebUSB = 0x10;
var DeviceModelId;
(function (DeviceModelId) {
    DeviceModelId["blue"] = "blue";
    DeviceModelId["nanoS"] = "nanoS";
    DeviceModelId["nanoSP"] = "nanoSP";
    DeviceModelId["nanoX"] = "nanoX";
})(DeviceModelId || (DeviceModelId = {}));
var devices = (_a = {},
    _a[DeviceModelId.blue] = {
        id: DeviceModelId.blue,
        productName: "Ledger Blue",
        productIdMM: 0x00,
        legacyUsbProductId: 0x0000,
        usbOnly: true,
        memorySize: 480 * 1024,
        masks: [0x31000000, 0x31010000],
        getBlockSize: function (_firwareVersion) { return 4 * 1024; }
    },
    _a[DeviceModelId.nanoS] = {
        id: DeviceModelId.nanoS,
        productName: "Ledger Nano S",
        productIdMM: 0x10,
        legacyUsbProductId: 0x0001,
        usbOnly: true,
        memorySize: 320 * 1024,
        masks: [0x31100000],
        getBlockSize: function (firmwareVersion) {
            var _a;
            return semver_default().lt((_a = semver_default().coerce(firmwareVersion)) !== null && _a !== void 0 ? _a : "", "2.0.0")
                ? 4 * 1024
                : 2 * 1024;
        }
    },
    _a[DeviceModelId.nanoSP] = {
        id: DeviceModelId.nanoSP,
        productName: "Ledger Nano S Plus",
        productIdMM: 0x50,
        legacyUsbProductId: 0x0005,
        usbOnly: true,
        memorySize: 1533 * 1024,
        masks: [0x33100000],
        getBlockSize: function (_firmwareVersion) { return 32; }
    },
    _a[DeviceModelId.nanoX] = {
        id: DeviceModelId.nanoX,
        productName: "Ledger Nano X",
        productIdMM: 0x40,
        legacyUsbProductId: 0x0004,
        usbOnly: false,
        memorySize: 2 * 1024 * 1024,
        masks: [0x33000000],
        getBlockSize: function (_firwareVersion) { return 4 * 1024; },
        bluetoothSpec: [
            {
                // this is the legacy one (prototype version). we will eventually drop it.
                serviceUuid: "d973f2e0-b19e-11e2-9e96-0800200c9a66",
                notifyUuid: "d973f2e1-b19e-11e2-9e96-0800200c9a66",
                writeUuid: "d973f2e2-b19e-11e2-9e96-0800200c9a66",
                writeCmdUuid: "d973f2e3-b19e-11e2-9e96-0800200c9a66"
            },
            {
                serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
                notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
                writeUuid: "13d63400-2c97-0004-0002-4c6564676572",
                writeCmdUuid: "13d63400-2c97-0004-0003-4c6564676572"
            },
        ]
    },
    _a);
var productMap = {
    Blue: DeviceModelId.blue,
    "Nano S": DeviceModelId.nanoS,
    "Nano X": DeviceModelId.nanoX
};
var devicesList = Object.values(devices);
/**
 *
 */
var ledgerUSBVendorId = 0x2c97;
/**
 *
 */
var getDeviceModel = function (id) {
    var info = devices[id];
    if (!info)
        throw new Error("device '" + id + "' does not exist");
    return info;
};
/**
 * Given a `targetId`, return the deviceModel associated to it,
 * based on the first two bytes.
 */
var identifyTargetId = function (targetId) {
    var deviceModel = devicesList.find(function (_a) {
        var masks = _a.masks;
        return masks.find(function (mask) { return (targetId & 0xffff0000) === mask; });
    });
    return deviceModel;
};
/**
 *
 */
var identifyUSBProductId = function (usbProductId) {
    var legacy = devicesList.find(function (d) { return d.legacyUsbProductId === usbProductId; });
    if (legacy)
        return legacy;
    var mm = usbProductId >> 8;
    var deviceModel = devicesList.find(function (d) { return d.productIdMM === mm; });
    return deviceModel;
};
var identifyProductName = function (productName) {
    var productId = productMap[productName];
    if (!productId && productName.startsWith("Nano S")) {
        productId = DeviceModelId.nanoSP;
    }
    var deviceModel = devicesList.find(function (d) { return d.id === productId; });
    return deviceModel;
};
var bluetoothServices = [];
var serviceUuidToInfos = {};
for (var id in devices) {
    var deviceModel = devices[id];
    var bluetoothSpec = deviceModel.bluetoothSpec;
    if (bluetoothSpec) {
        for (var i = 0; i < bluetoothSpec.length; i++) {
            var spec = bluetoothSpec[i];
            bluetoothServices.push(spec.serviceUuid);
            serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = __assign({ deviceModel: deviceModel }, spec);
        }
    }
}
/**
 *
 */
var getBluetoothServiceUuids = function () { return bluetoothServices; };
/**
 *
 */
var getInfosForServiceUuid = function (uuid) { return serviceUuidToInfos[uuid.toLowerCase()]; };
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@ledgerhq/logs/lib-es/index.js
var lib_es_id = 0;
var subscribers = [];
/**
 * log something
 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
 * @param message a clear message of the log associated to the type
 */
var log = function (type, message, data) {
    var obj = {
        type: type,
        id: String(++lib_es_id),
        date: new Date()
    };
    if (message)
        obj.message = message;
    if (data)
        obj.data = data;
    dispatch(obj);
};
/**
 * listen to logs.
 * @param cb that is called for each future log() with the Log object
 * @return a function that can be called to unsubscribe the listener
 */
var listen = function (cb) {
    subscribers.push(cb);
    return function () {
        var i = subscribers.indexOf(cb);
        if (i !== -1) {
            // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
            subscribers[i] = subscribers[subscribers.length - 1];
            subscribers.pop();
        }
    };
};
function dispatch(log) {
    for (var i = 0; i < subscribers.length; i++) {
        try {
            subscribers[i](log);
        }
        catch (e) {
            console.error(e);
        }
    }
}
if (typeof window !== "undefined") {
    window.__ledgerLogsListen = listen;
}
//# sourceMappingURL=index.js.map
;// CONCATENATED MODULE: ./node_modules/@ledgerhq/hw-transport-webhid/lib-es/TransportWebHID.js
/* provided dependency */ var TransportWebHID_Buffer = __webpack_require__(48764)["Buffer"];
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TransportWebHID_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var TransportWebHID_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TransportWebHID_read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};





var ledgerDevices = [
    {
        vendorId: ledgerUSBVendorId
    },
];
var isSupported = function () {
    return Promise.resolve(!!(window.navigator && window.navigator.hid));
};
var getHID = function () {
    // $FlowFixMe
    var hid = navigator.hid;
    if (!hid)
        throw new lib_es.TransportError("navigator.hid is not supported", "HIDNotSupported");
    return hid;
};
function requestLedgerDevices() {
    return TransportWebHID_awaiter(this, void 0, void 0, function () {
        var device;
        return TransportWebHID_generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHID().requestDevice({
                        filters: ledgerDevices
                    })];
                case 1:
                    device = _a.sent();
                    if (Array.isArray(device))
                        return [2 /*return*/, device];
                    return [2 /*return*/, [device]];
            }
        });
    });
}
function getLedgerDevices() {
    return TransportWebHID_awaiter(this, void 0, void 0, function () {
        var devices;
        return TransportWebHID_generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHID().getDevices()];
                case 1:
                    devices = _a.sent();
                    return [2 /*return*/, devices.filter(function (d) { return d.vendorId === ledgerUSBVendorId; })];
            }
        });
    });
}
function getFirstLedgerDevice() {
    return TransportWebHID_awaiter(this, void 0, void 0, function () {
        var existingDevices, devices;
        return TransportWebHID_generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLedgerDevices()];
                case 1:
                    existingDevices = _a.sent();
                    if (existingDevices.length > 0)
                        return [2 /*return*/, existingDevices[0]];
                    return [4 /*yield*/, requestLedgerDevices()];
                case 2:
                    devices = _a.sent();
                    return [2 /*return*/, devices[0]];
            }
        });
    });
}
/**
 * WebHID Transport implementation
 * @example
 * import TransportWebHID from "@ledgerhq/hw-transport-webhid";
 * ...
 * TransportWebHID.create().then(transport => ...)
 */
var TransportWebHID = /** @class */ (function (_super) {
    __extends(TransportWebHID, _super);
    function TransportWebHID(device) {
        var _this = _super.call(this) || this;
        _this.channel = Math.floor(Math.random() * 0xffff);
        _this.packetSize = 64;
        _this.inputs = [];
        _this.read = function () {
            if (_this.inputs.length) {
                return Promise.resolve(_this.inputs.shift());
            }
            return new Promise(function (success) {
                _this.inputCallback = success;
            });
        };
        _this.onInputReport = function (e) {
            var buffer = TransportWebHID_Buffer.from(e.data.buffer);
            if (_this.inputCallback) {
                _this.inputCallback(buffer);
                _this.inputCallback = null;
            }
            else {
                _this.inputs.push(buffer);
            }
        };
        _this._disconnectEmitted = false;
        _this._emitDisconnect = function (e) {
            if (_this._disconnectEmitted)
                return;
            _this._disconnectEmitted = true;
            _this.emit("disconnect", e);
        };
        /**
         * Exchange with the device using APDU protocol.
         * @param apdu
         * @returns a promise of apdu response
         */
        _this.exchange = function (apdu) { return TransportWebHID_awaiter(_this, void 0, void 0, function () {
            var b;
            var _this = this;
            return TransportWebHID_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exchangeAtomicImpl(function () { return TransportWebHID_awaiter(_this, void 0, void 0, function () {
                            var _a, channel, packetSize, framing, blocks, i, result, acc, buffer;
                            return TransportWebHID_generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = this, channel = _a.channel, packetSize = _a.packetSize;
                                        log("apdu", "=> " + apdu.toString("hex"));
                                        framing = (0,hid_framing/* default */.Z)(channel, packetSize);
                                        blocks = framing.makeBlocks(apdu);
                                        i = 0;
                                        _b.label = 1;
                                    case 1:
                                        if (!(i < blocks.length)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.device.sendReport(0, blocks[i])];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        if (!!(result = framing.getReducedResult(acc))) return [3 /*break*/, 6];
                                        return [4 /*yield*/, this.read()];
                                    case 5:
                                        buffer = _b.sent();
                                        acc = framing.reduceResponse(acc, buffer);
                                        return [3 /*break*/, 4];
                                    case 6:
                                        log("apdu", "<= " + result.toString("hex"));
                                        return [2 /*return*/, result];
                                }
                            });
                        }); })["catch"](function (e) {
                            if (e && e.message && e.message.includes("write")) {
                                _this._emitDisconnect(e);
                                throw new lib_es.DisconnectedDeviceDuringOperation(e.message);
                            }
                            throw e;
                        })];
                    case 1:
                        b = _a.sent();
                        return [2 /*return*/, b];
                }
            });
        }); };
        _this.device = device;
        _this.deviceModel =
            typeof device.productId === "number"
                ? identifyUSBProductId(device.productId)
                : undefined;
        device.addEventListener("inputreport", _this.onInputReport);
        return _this;
    }
    /**
     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
     */
    TransportWebHID.request = function () {
        return TransportWebHID_awaiter(this, void 0, void 0, function () {
            var _a, device;
            return TransportWebHID_generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, requestLedgerDevices()];
                    case 1:
                        _a = TransportWebHID_read.apply(void 0, [_b.sent(), 1]), device = _a[0];
                        return [2 /*return*/, TransportWebHID.open(device)];
                }
            });
        });
    };
    /**
     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
     */
    TransportWebHID.openConnected = function () {
        return TransportWebHID_awaiter(this, void 0, void 0, function () {
            var devices;
            return TransportWebHID_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getLedgerDevices()];
                    case 1:
                        devices = _a.sent();
                        if (devices.length === 0)
                            return [2 /*return*/, null];
                        return [2 /*return*/, TransportWebHID.open(devices[0])];
                }
            });
        });
    };
    /**
     * Create a Ledger transport with a HIDDevice
     */
    TransportWebHID.open = function (device) {
        return TransportWebHID_awaiter(this, void 0, void 0, function () {
            var transport, onDisconnect;
            return TransportWebHID_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, device.open()];
                    case 1:
                        _a.sent();
                        transport = new TransportWebHID(device);
                        onDisconnect = function (e) {
                            if (device === e.device) {
                                getHID().removeEventListener("disconnect", onDisconnect);
                                transport._emitDisconnect(new lib_es.DisconnectedDevice());
                            }
                        };
                        getHID().addEventListener("disconnect", onDisconnect);
                        return [2 /*return*/, transport];
                }
            });
        });
    };
    /**
     * Release the transport device
     */
    TransportWebHID.prototype.close = function () {
        return TransportWebHID_awaiter(this, void 0, void 0, function () {
            return TransportWebHID_generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exchangeBusyPromise];
                    case 1:
                        _a.sent();
                        this.device.removeEventListener("inputreport", this.onInputReport);
                        return [4 /*yield*/, this.device.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TransportWebHID.prototype.setScrambleKey = function () { };
    /**
     * Check if WebUSB transport is supported.
     */
    TransportWebHID.isSupported = isSupported;
    /**
     * List the WebUSB devices that was previously authorized by the user.
     */
    TransportWebHID.list = getLedgerDevices;
    /**
     * Actively listen to WebUSB devices and emit ONE device
     * that was either accepted before, if not it will trigger the native permission UI.
     *
     * Important: it must be called in the context of a UI click!
     */
    TransportWebHID.listen = function (observer) {
        var unsubscribed = false;
        getFirstLedgerDevice().then(function (device) {
            if (!device) {
                observer.error(new lib_es.TransportOpenUserCancelled("Access denied to use Ledger device"));
            }
            else if (!unsubscribed) {
                var deviceModel = typeof device.productId === "number"
                    ? identifyUSBProductId(device.productId)
                    : undefined;
                observer.next({
                    type: "add",
                    descriptor: device,
                    deviceModel: deviceModel
                });
                observer.complete();
            }
        }, function (error) {
            observer.error(new lib_es.TransportOpenUserCancelled(error.message));
        });
        function unsubscribe() {
            unsubscribed = true;
        }
        return {
            unsubscribe: unsubscribe
        };
    };
    return TransportWebHID;
}(lib_es_Transport));
/* harmony default export */ var lib_es_TransportWebHID = (TransportWebHID);
//# sourceMappingURL=TransportWebHID.js.map
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/signer.js
var signer = __webpack_require__(394);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/errors.js
var errors = __webpack_require__(4004);
// EXTERNAL MODULE: ./node_modules/@solana/web3.js/lib/index.browser.esm.js + 11 modules
var index_browser_esm = __webpack_require__(21755);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-ledger/lib/util.js
/* provided dependency */ var util_Buffer = __webpack_require__(48764)["Buffer"];
var util_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function getDerivationPath(account, change) {
    const length = account !== undefined ? (change === undefined ? 3 : 4) : 2;
    const derivationPath = util_Buffer.alloc(1 + length * 4);
    let offset = derivationPath.writeUInt8(length, 0);
    offset = derivationPath.writeUInt32BE(harden(44), offset); // Using BIP44
    offset = derivationPath.writeUInt32BE(harden(501), offset); // Solana's BIP44 path
    if (account !== undefined) {
        offset = derivationPath.writeUInt32BE(harden(account), offset);
        if (change !== undefined) {
            derivationPath.writeUInt32BE(harden(change), offset);
        }
    }
    return derivationPath;
}
const BIP32_HARDENED_BIT = (1 << 31) >>> 0;
function harden(n) {
    return (n | BIP32_HARDENED_BIT) >>> 0;
}
const INS_GET_PUBKEY = 0x05;
const INS_SIGN_MESSAGE = 0x06;
const P1_NON_CONFIRM = 0x00;
const P1_CONFIRM = 0x01;
const P2_EXTEND = 0x01;
const P2_MORE = 0x02;
const MAX_PAYLOAD = 255;
const LEDGER_CLA = 0xe0;
function getPublicKey(transport, derivationPath) {
    return util_awaiter(this, void 0, void 0, function* () {
        const bytes = yield send(transport, INS_GET_PUBKEY, P1_NON_CONFIRM, derivationPath);
        return new index_browser_esm.PublicKey(bytes);
    });
}
function signTransaction(transport, transaction, derivationPath) {
    return util_awaiter(this, void 0, void 0, function* () {
        const paths = util_Buffer.alloc(1);
        paths.writeUInt8(1, 0);
        const message = transaction.serializeMessage();
        const data = util_Buffer.concat([paths, derivationPath, message]);
        return yield send(transport, INS_SIGN_MESSAGE, P1_CONFIRM, data);
    });
}
function send(transport, instruction, p1, data) {
    return util_awaiter(this, void 0, void 0, function* () {
        let p2 = 0;
        let offset = 0;
        if (data.length > MAX_PAYLOAD) {
            while (data.length - offset > MAX_PAYLOAD) {
                const buffer = data.slice(offset, offset + MAX_PAYLOAD);
                const response = yield transport.send(LEDGER_CLA, instruction, p1, p2 | P2_MORE, buffer);
                // @ts-ignore
                if (response.length !== 2)
                    throw new lib_es.TransportStatusError(lib_es.StatusCodes.INCORRECT_DATA);
                p2 |= P2_EXTEND;
                offset += MAX_PAYLOAD;
            }
        }
        const buffer = data.slice(offset);
        const response = yield transport.send(LEDGER_CLA, instruction, p1, p2, buffer);
        return response.slice(0, response.length - 2);
    });
}
//# sourceMappingURL=util.js.map
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-ledger/lib/adapter.js
var adapter_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class LedgerWalletAdapter extends signer/* BaseSignerWalletAdapter */.s {
    constructor(config = {}) {
        super();
        this._disconnected = () => {
            const transport = this._transport;
            if (transport) {
                transport.off('disconnect', this._disconnected);
                this._transport = null;
                this._publicKey = null;
                this.emit('error', new errors/* WalletDisconnectedError */.at());
                this.emit('disconnect');
            }
        };
        this._derivationPath = config.derivationPath || getDerivationPath(0, 0);
        this._connecting = false;
        this._transport = null;
        this._publicKey = null;
    }
    get publicKey() {
        return this._publicKey;
    }
    get ready() {
        return typeof window !== 'undefined' && !!navigator.hid;
    }
    get connecting() {
        return this._connecting;
    }
    get connected() {
        return !!this._transport;
    }
    connect() {
        return adapter_awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connected || this.connecting)
                    return;
                this._connecting = true;
                let transport;
                try {
                    transport = yield lib_es_TransportWebHID.create();
                }
                catch (error) {
                    throw new errors/* WalletConnectionError */.$w(error === null || error === void 0 ? void 0 : error.message, error);
                }
                let publicKey;
                try {
                    publicKey = yield getPublicKey(transport, this._derivationPath);
                }
                catch (error) {
                    throw new errors/* WalletPublicKeyError */.Nx(error === null || error === void 0 ? void 0 : error.message, error);
                }
                transport.on('disconnect', this._disconnected);
                this._transport = transport;
                this._publicKey = publicKey;
                this.emit('connect');
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
            finally {
                this._connecting = false;
            }
        });
    }
    disconnect() {
        return adapter_awaiter(this, void 0, void 0, function* () {
            const transport = this._transport;
            if (transport) {
                transport.off('disconnect', this._disconnected);
                this._transport = null;
                this._publicKey = null;
                try {
                    yield transport.close();
                }
                catch (error) {
                    this.emit('error', new errors/* WalletDisconnectionError */.UG(error === null || error === void 0 ? void 0 : error.message, error));
                }
            }
            this.emit('disconnect');
        });
    }
    signTransaction(transaction) {
        return adapter_awaiter(this, void 0, void 0, function* () {
            try {
                const transport = this._transport;
                const publicKey = this._publicKey;
                if (!transport || !publicKey)
                    throw new errors/* WalletNotConnectedError */.oS();
                try {
                    const signature = yield signTransaction(transport, transaction, this._derivationPath);
                    transaction.addSignature(publicKey, signature);
                }
                catch (error) {
                    throw new errors/* WalletSignTransactionError */.PY(error === null || error === void 0 ? void 0 : error.message, error);
                }
                return transaction;
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
    signAllTransactions(transactions) {
        return adapter_awaiter(this, void 0, void 0, function* () {
            try {
                const transport = this._transport;
                const publicKey = this._publicKey;
                if (!transport || !publicKey)
                    throw new errors/* WalletNotConnectedError */.oS();
                try {
                    const derivationPath = this._derivationPath;
                    for (const transaction of transactions) {
                        const signature = yield signTransaction(transport, transaction, derivationPath);
                        transaction.addSignature(publicKey, signature);
                    }
                }
                catch (error) {
                    throw new errors/* WalletSignTransactionError */.PY(error === null || error === void 0 ? void 0 : error.message, error);
                }
                return transactions;
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
}
//# sourceMappingURL=adapter.js.map
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/types.js
var types = __webpack_require__(9074);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/ledger.js


const getLedgerWallet = (config = {}) => ({
    name: types/* WalletName.Ledger */.w.Ledger,
    url: 'https://ledger.com',
    icon: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzUgMzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiI+PHBhdGggZD0ibTIzLjU4OCAwaC0xNnYyMS41ODNoMjEuNnYtMTZhNS41ODUgNS41ODUgMCAwIDAgLTUuNi01LjU4M3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuNzM5KSIvPjxwYXRoIGQ9Im04LjM0MiAwaC0yLjc1N2E1LjU4NSA1LjU4NSAwIDAgMCAtNS41ODUgNS41ODV2Mi43NTdoOC4zNDJ6Ii8+PHBhdGggZD0ibTAgNy41OWg4LjM0MnY4LjM0MmgtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDUuNzM5KSIvPjxwYXRoIGQ9Im0xNS4xOCAyMy40NTFoMi43NTdhNS41ODUgNS41ODUgMCAwIDAgNS41ODUtNS42di0yLjY3MWgtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS40NzggMTEuNDc4KSIvPjxwYXRoIGQ9Im03LjU5IDE1LjE4aDguMzQydjguMzQyaC04LjM0MnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuNzM5IDExLjQ3OCkiLz48cGF0aCBkPSJtMCAxNS4xOHYyLjc1N2E1LjU4NSA1LjU4NSAwIDAgMCA1LjU4NSA1LjU4NWgyLjc1N3YtOC4zNDJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDExLjQ3OCkiLz48L2c+PC9zdmc+',
    adapter: () => new LedgerWalletAdapter(config),
});
//# sourceMappingURL=ledger.js.map

/***/ }),

/***/ 65626:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "N": function() { return /* binding */ getMathWallet; }
});

// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/signer.js
var signer = __webpack_require__(394);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/errors.js
var errors = __webpack_require__(4004);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/poll.js
var poll = __webpack_require__(92983);
// EXTERNAL MODULE: ./node_modules/@solana/web3.js/lib/index.browser.esm.js + 11 modules
var index_browser_esm = __webpack_require__(21755);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-mathwallet/lib/adapter.js
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class MathWalletWalletAdapter extends signer/* BaseSignerWalletAdapter */.s {
    constructor(config = {}) {
        super();
        this._messaged = (event) => {
            const data = event.data;
            if (data && data.origin === 'mathwallet_internal' && data.type === 'lockStatusChanged' && !data.payload) {
                this._disconnected();
            }
        };
        this._disconnected = () => {
            if (this._wallet) {
                window.removeEventListener('message', this._messaged);
                this._wallet = null;
                this._publicKey = null;
                this.emit('error', new errors/* WalletDisconnectedError */.at());
                this.emit('disconnect');
            }
        };
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        if (!this.ready)
            (0,poll/* pollUntilReady */._)(this, config.pollInterval || 1000, config.pollCount || 3);
    }
    get publicKey() {
        return this._publicKey;
    }
    get ready() {
        var _a;
        return typeof window !== 'undefined' && !!((_a = window.solana) === null || _a === void 0 ? void 0 : _a.isMathWallet);
    }
    get connecting() {
        return this._connecting;
    }
    get connected() {
        return !!this._wallet;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connected || this.connecting)
                    return;
                this._connecting = true;
                const wallet = typeof window !== 'undefined' && window.solana;
                if (!wallet)
                    throw new errors/* WalletNotFoundError */.l5();
                if (!wallet.isMathWallet)
                    throw new errors/* WalletNotInstalledError */.Yf();
                // @TODO: handle if popup is blocked
                let account;
                try {
                    account = yield wallet.getAccount();
                }
                catch (error) {
                    throw new errors/* WalletAccountError */.cO(error === null || error === void 0 ? void 0 : error.message, error);
                }
                let publicKey;
                try {
                    publicKey = new index_browser_esm.PublicKey(account);
                }
                catch (error) {
                    throw new errors/* WalletPublicKeyError */.Nx(error === null || error === void 0 ? void 0 : error.message, error);
                }
                window.addEventListener('message', this._messaged);
                this._wallet = wallet;
                this._publicKey = publicKey;
                this.emit('connect');
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
            finally {
                this._connecting = false;
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._wallet) {
                window.removeEventListener('message', this._messaged);
                this._wallet = null;
                this._publicKey = null;
            }
            this.emit('disconnect');
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new errors/* WalletNotConnectedError */.oS();
                try {
                    return (yield wallet.signTransaction(transaction)) || transaction;
                }
                catch (error) {
                    throw new errors/* WalletSignTransactionError */.PY(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
    signAllTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new errors/* WalletNotConnectedError */.oS();
                try {
                    return (yield wallet.signAllTransactions(transactions)) || transactions;
                }
                catch (error) {
                    throw new errors/* WalletSignTransactionError */.PY(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
}
//# sourceMappingURL=adapter.js.map
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/types.js
var types = __webpack_require__(9074);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/mathwallet.js


const getMathWallet = (config = {}) => ({
    name: types/* WalletName.MathWallet */.w.MathWallet,
    url: 'https://mathwallet.org',
    icon: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHdpZHRoPSIxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJtMCAwaDEyOHYxMjhoLTEyOHoiIG9wYWNpdHk9IjAiLz48cGF0aCBkPSJtOTAuODQ3MDA4NiA1Ny43NjEwMDIzYy0yLjI3NzAzNjMtMi4yNzcwMzYzLTIuMjc3MDM2My01Ljk2ODg0MTYgMC04LjI0NTg3NzggMi4yNzcwMzYyLTIuMjc3MDM2MyA1Ljk2ODg0MTUtMi4yNzcwMzYzIDguMjQ1ODc3OCAwIDIuMjc3MDM2NiAyLjI3NzAzNjIgMi4yNzcwMzY2IDUuOTY4ODQxNSAwIDguMjQ1ODc3OC0yLjI3NzAzNjMgMi4yNzcwMzYyLTUuOTY4ODQxNiAyLjI3NzAzNjItOC4yNDU4Nzc4IDB6bS0xOS41ODM5NTk4IDE5LjU4Mzk1OTdjLTEuNzA3Nzc3Mi0xLjcwNzc3NzItMS43MDc3NzcyLTQuNDc2NjMxMSAwLTYuMTg0NDA4M3M0LjQ3NjYzMTEtMS43MDc3NzcyIDYuMTg0NDA4MyAwIDEuNzA3Nzc3MiA0LjQ3NjYzMTEgMCA2LjE4NDQwODMtNC40NzY2MzExIDEuNzA3Nzc3Mi02LjE4NDQwODMgMHptMzAuOTIyMDQyMi0xMC4zMDczNDcyYy0xLjcwNzc3OC0xLjcwNzc3NzItMS43MDc3NzgtNC40NzY2MzEyIDAtNi4xODQ0MDg0IDEuNzA3Nzc3LTEuNzA3Nzc3MiA0LjQ3NjYzMS0xLjcwNzc3NzIgNi4xODQ0MDggMHMxLjcwNzc3NyA0LjQ3NjYzMTIgMCA2LjE4NDQwODQtNC40NzY2MzEgMS43MDc3NzcyLTYuMTg0NDA4IDB6bS0xMC4zMDczNDc3IDEwLjMwNzM0NzJjLTEuNzA3Nzc3Mi0xLjcwNzc3NzItMS43MDc3NzcyLTQuNDc2NjMxMSAwLTYuMTg0NDA4M3M0LjQ3NjYzMTEtMS43MDc3NzcyIDYuMTg0NDA4MyAwIDEuNzA3Nzc3MiA0LjQ3NjYzMTEgMCA2LjE4NDQwODMtNC40NzY2MzExIDEuNzA3Nzc3Mi02LjE4NDQwODMgMHptMjEuNjQ1NDI4Ny0xLjAzMDczNDdjLTEuMTM4NTE4LTEuMTM4NTE4MS0xLjEzODUxOC0yLjk4NDQyMDggMC00LjEyMjkzODkgMS4xMzg1MTktMS4xMzg1MTgxIDIuOTg0NDIxLTEuMTM4NTE4MSA0LjEyMjkzOSAwIDEuMTM4NTE5IDEuMTM4NTE4MSAxLjEzODUxOSAyLjk4NDQyMDggMCA0LjEyMjkzODktMS4xMzg1MTggMS4xMzg1MTgxLTIuOTg0NDIgMS4xMzg1MTgxLTQuMTIyOTM5IDB6bS0xMC4zMDczNDcgMTAuMzA3MzQ3MmMtMS4xMzg1MTgtMS4xMzg1MTgxLTEuMTM4NTE4LTIuOTg0NDIwNyAwLTQuMTIyOTM4OSAxLjEzODUxOC0xLjEzODUxODEgMi45ODQ0MjEtMS4xMzg1MTgxIDQuMTIyOTM5IDAgMS4xMzg1MTggMS4xMzg1MTgyIDEuMTM4NTE4IDIuOTg0NDIwOCAwIDQuMTIyOTM4OS0xLjEzODUxOCAxLjEzODUxODItMi45ODQ0MjEgMS4xMzg1MTgyLTQuMTIyOTM5IDB6bS0yMi42NzYxNjM3LTE4LjU1MzIyNWMtMi4yNzcwMzYzLTIuMjc3MDM2My0yLjI3NzAzNjMtNS45Njg4NDE1IDAtOC4yNDU4Nzc4czUuOTY4ODQxNS0yLjI3NzAzNjMgOC4yNDU4Nzc4IDAgMi4yNzcwMzYzIDUuOTY4ODQxNSAwIDguMjQ1ODc3OC01Ljk2ODg0MTUgMi4yNzcwMzYzLTguMjQ1ODc3OCAwem0wLTIwLjYxNDY5NDVjLTIuMjc3MDM2My0yLjI3NzAzNjMtMi4yNzcwMzYzLTUuOTY4ODQxNSAwLTguMjQ1ODc3OHM1Ljk2ODg0MTUtMi4yNzcwMzYzIDguMjQ1ODc3OCAwIDIuMjc3MDM2MyA1Ljk2ODg0MTUgMCA4LjI0NTg3NzgtNS45Njg4NDE1IDIuMjc3MDM2My04LjI0NTg3NzggMHptLTEwLjMwNzM0NzIgMTAuMzA3MzQ3M2MtMi4yNzcwMzYzLTIuMjc3MDM2My0yLjI3NzAzNjMtNS45Njg4NDE2IDAtOC4yNDU4Nzc4IDIuMjc3MDM2Mi0yLjI3NzAzNjMgNS45Njg4NDE1LTIuMjc3MDM2MyA4LjI0NTg3NzggMCAyLjI3NzAzNjIgMi4yNzcwMzYyIDIuMjc3MDM2MiA1Ljk2ODg0MTUgMCA4LjI0NTg3NzgtMi4yNzcwMzYzIDIuMjc3MDM2Mi01Ljk2ODg0MTYgMi4yNzcwMzYyLTguMjQ1ODc3OCAwem0tMjAuNzEwNTA2IDBjLTIuMjc3MDM2Mi0yLjI3NzAzNjMtMi4yNzcwMzYyLTUuOTY4ODQxNiAwLTguMjQ1ODc3OCAyLjI3NzAzNjMtMi4yNzcwMzYzIDUuOTY4ODQxNi0yLjI3NzAzNjMgOC4yNDU4Nzc4IDAgMi4yNzcwMzYzIDIuMjc3MDM2MiAyLjI3NzAzNjMgNS45Njg4NDE1IDAgOC4yNDU4Nzc4LTIuMjc3MDM2MiAyLjI3NzAzNjItNS45Njg4NDE1IDIuMjc3MDM2Mi04LjI0NTg3NzggMHptLTE5LjU4Mzk1OTcgMTkuNTgzOTU5N2MtMS43MDc3NzcyLTEuNzA3Nzc3Mi0xLjcwNzc3NzItNC40NzY2MzExIDAtNi4xODQ0MDgzczQuNDc2NjMxMS0xLjcwNzc3NzIgNi4xODQ0MDgzIDAgMS43MDc3NzcyIDQuNDc2NjMxMSAwIDYuMTg0NDA4My00LjQ3NjYzMTEgMS43MDc3NzcyLTYuMTg0NDA4MyAwem0zMC45MjIwNDE3LTEwLjMwNzM0NzJjLTEuNzA3Nzc3Mi0xLjcwNzc3NzItMS43MDc3NzcyLTQuNDc2NjMxMiAwLTYuMTg0NDA4NHM0LjQ3NjYzMTItMS43MDc3NzcyIDYuMTg0NDA4NCAwIDEuNzA3Nzc3MiA0LjQ3NjYzMTIgMCA2LjE4NDQwODQtNC40NzY2MzEyIDEuNzA3Nzc3Mi02LjE4NDQwODQgMHptLTEwLjMwNzM0NzIgMTAuMzA3MzQ3MmMtMS43MDc3NzcyLTEuNzA3Nzc3Mi0xLjcwNzc3NzItNC40NzY2MzExIDAtNi4xODQ0MDgzczQuNDc2NjMxMS0xLjcwNzc3NzIgNi4xODQ0MDgzIDAgMS43MDc3NzcyIDQuNDc2NjMxMSAwIDYuMTg0NDA4My00LjQ3NjYzMTEgMS43MDc3NzcyLTYuMTg0NDA4MyAwem0tNDAuMTk4NjU0My0xLjAzMDczNDdjLTEuMTM4NTE4MTMtMS4xMzg1MTgxLTEuMTM4NTE4MTMtMi45ODQ0MjA4IDAtNC4xMjI5Mzg5IDEuMTM4NTE4MS0xLjEzODUxODEgMi45ODQ0MjA4LTEuMTM4NTE4MSA0LjEyMjkzODkgMHMxLjEzODUxODEgMi45ODQ0MjA4IDAgNC4xMjI5Mzg5LTIuOTg0NDIwOCAxLjEzODUxODEtNC4xMjI5Mzg5IDB6bTEwLjMwNzM0NzMgMTAuMzA3MzQ3MmMtMS4xMzg1MTgyLTEuMTM4NTE4MS0xLjEzODUxODItMi45ODQ0MjA3IDAtNC4xMjI5Mzg5IDEuMTM4NTE4MS0xLjEzODUxODEgMi45ODQ0MjA3LTEuMTM4NTE4MSA0LjEyMjkzODggMCAxLjEzODUxODIgMS4xMzg1MTgyIDEuMTM4NTE4MiAyLjk4NDQyMDggMCA0LjEyMjkzODktMS4xMzg1MTgxIDEuMTM4NTE4Mi0yLjk4NDQyMDcgMS4xMzg1MTgyLTQuMTIyOTM4OCAwem00MS4yMjkzODg5IDBjLTEuMTM4NTE4MS0xLjEzODUxODEtMS4xMzg1MTgxLTIuOTg0NDIwNyAwLTQuMTIyOTM4OSAxLjEzODUxODItMS4xMzg1MTgxIDIuOTg0NDIwOC0xLjEzODUxODEgNC4xMjI5Mzg5IDAgMS4xMzg1MTgyIDEuMTM4NTE4MiAxLjEzODUxODIgMi45ODQ0MjA4IDAgNC4xMjI5Mzg5LTEuMTM4NTE4MSAxLjEzODUxODItMi45ODQ0MjA3IDEuMTM4NTE4Mi00LjEyMjkzODkgMHptLTQyLjI2MDEyMzctMTkuNTgzOTU5N2MtMS43MDc3NzcyLTEuNzA3Nzc3Mi0xLjcwNzc3NzItNC40NzY2MzEyIDAtNi4xODQ0MDg0czQuNDc2NjMxMi0xLjcwNzc3NzIgNi4xODQ0MDg0IDAgMS43MDc3NzcyIDQuNDc2NjMxMiAwIDYuMTg0NDA4NC00LjQ3NjYzMTIgMS43MDc3NzcyLTYuMTg0NDA4NCAwem0xOS41ODM5NTk4IDEuMDMwNzM0N2MtMi4yNzcwMzYzLTIuMjc3MDM2My0yLjI3NzAzNjMtNS45Njg4NDE1IDAtOC4yNDU4Nzc4czUuOTY4ODQxNS0yLjI3NzAzNjMgOC4yNDU4Nzc4IDAgMi4yNzcwMzYzIDUuOTY4ODQxNSAwIDguMjQ1ODc3OC01Ljk2ODg0MTUgMi4yNzcwMzYzLTguMjQ1ODc3OCAwem0wLTIwLjYxNDY5NDVjLTIuMjc3MDM2My0yLjI3NzAzNjMtMi4yNzcwMzYzLTUuOTY4ODQxNSAwLTguMjQ1ODc3OHM1Ljk2ODg0MTUtMi4yNzcwMzYzIDguMjQ1ODc3OCAwIDIuMjc3MDM2MyA1Ljk2ODg0MTUgMCA4LjI0NTg3NzgtNS45Njg4NDE1IDIuMjc3MDM2My04LjI0NTg3NzggMHptLTEwLjMwNzM0NzMgMTAuMzA3MzQ3M2MtMi4yNzcwMzYyLTIuMjc3MDM2My0yLjI3NzAzNjItNS45Njg4NDE2IDAtOC4yNDU4Nzc4IDIuMjc3MDM2My0yLjI3NzAzNjMgNS45Njg4NDE2LTIuMjc3MDM2MyA4LjI0NTg3NzggMCAyLjI3NzAzNjMgMi4yNzcwMzYyIDIuMjc3MDM2MyA1Ljk2ODg0MTUgMCA4LjI0NTg3NzgtMi4yNzcwMzYyIDIuMjc3MDM2Mi01Ljk2ODg0MTUgMi4yNzcwMzYyLTguMjQ1ODc3OCAweiIvPjwvZz48L3N2Zz4=',
    adapter: () => new MathWalletWalletAdapter(config),
});
//# sourceMappingURL=mathwallet.js.map

/***/ }),

/***/ 3160:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "y": function() { return /* binding */ getPhantomWallet; }
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js
var runtime = __webpack_require__(34051);
var runtime_default = /*#__PURE__*/__webpack_require__.n(runtime);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/errors.js
var errors = __webpack_require__(4004);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/poll.js
var poll = __webpack_require__(92983);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/signer.js
var signer = __webpack_require__(394);
// EXTERNAL MODULE: ./node_modules/@solana/web3.js/lib/index.browser.esm.js + 11 modules
var index_browser_esm = __webpack_require__(21755);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-phantom/lib/adapter.js



function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    var adopt = function adopt(value) {
        return _instanceof(value, P) ? value : new P(function(resolve) {
            resolve(value);
        });
    };
    return new (P || (P = Promise))(function(resolve, reject) {
        var fulfilled = function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var PhantomWalletAdapter = /*#__PURE__*/ function(BaseMessageSignerWalletAdapter1) {
    "use strict";
    _inherits(PhantomWalletAdapter, BaseMessageSignerWalletAdapter1);
    var _super = _createSuper(PhantomWalletAdapter);
    function PhantomWalletAdapter() {
        var config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _classCallCheck(this, PhantomWalletAdapter);
        var _this;
        _this = _super.call(this);
        _this._disconnected = function() {
            var wallet = _this._wallet;
            if (wallet) {
                wallet.off('disconnect', _this._disconnected);
                _this._wallet = null;
                _this._publicKey = null;
                _this.emit('error', new errors/* WalletDisconnectedError */.at());
                _this.emit('disconnect');
            }
        };
        _this._connecting = false;
        _this._wallet = null;
        _this._publicKey = null;
        if (!_this.ready) (0,poll/* pollUntilReady */._)(_assertThisInitialized(_this), config.pollInterval || 1000, config.pollCount || 3);
        return _this;
    }
    _createClass(PhantomWalletAdapter, [
        {
            key: "publicKey",
            get: function get() {
                return this._publicKey;
            }
        },
        {
            key: "ready",
            get: function get() {
                var _a;
                return  true && !!((_a = window.solana) === null || _a === void 0 ? void 0 : _a.isPhantom);
            }
        },
        {
            key: "connecting",
            get: function get() {
                return this._connecting;
            }
        },
        {
            key: "connected",
            get: function get() {
                var _a;
                return !!((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.isConnected);
            }
        },
        {
            key: "connect",
            value: function connect1() {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet, handleDisconnect, publicKey;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                if (!(this.connected || this.connecting)) {
                                    _ctx.next = 3;
                                    break;
                                }
                                return _ctx.abrupt("return");
                            case 3:
                                this._connecting = true;
                                wallet =  true && window.solana;
                                if (wallet) {
                                    _ctx.next = 7;
                                    break;
                                }
                                throw new errors/* WalletNotFoundError */.l5();
                            case 7:
                                if (wallet.isPhantom) {
                                    _ctx.next = 9;
                                    break;
                                }
                                throw new errors/* WalletNotInstalledError */.Yf();
                            case 9:
                                if (wallet.isConnected) {
                                    _ctx.next = 24;
                                    break;
                                }
                                handleDisconnect = wallet._handleDisconnect;
                                _ctx.prev = 11;
                                _ctx.next = 14;
                                return new Promise(function(resolve, reject) {
                                    var connect = function() {
                                        wallet.off('connect', connect);
                                        resolve();
                                    };
                                    wallet._handleDisconnect = function() {
                                        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                                            args[_key] = arguments[_key];
                                        }
                                        wallet.off('connect', connect);
                                        reject(new errors/* WalletWindowClosedError */.hd());
                                        return handleDisconnect.apply(wallet, args);
                                    };
                                    wallet.on('connect', connect);
                                    wallet.connect().catch(function(reason) {
                                        wallet.off('connect', connect);
                                        reject(reason);
                                    });
                                });
                            case 14:
                                _ctx.next = 21;
                                break;
                            case 16:
                                _ctx.prev = 16;
                                _ctx.t0 = _ctx["catch"](11);
                                if (!_instanceof(_ctx.t0, errors/* WalletError */.lj)) {
                                    _ctx.next = 20;
                                    break;
                                }
                                throw _ctx.t0;
                            case 20:
                                throw new errors/* WalletConnectionError */.$w(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0);
                            case 21:
                                _ctx.prev = 21;
                                wallet._handleDisconnect = handleDisconnect;
                                return _ctx.finish(21);
                            case 24:
                                if (wallet.publicKey) {
                                    _ctx.next = 26;
                                    break;
                                }
                                throw new errors/* WalletConnectionError */.$w();
                            case 26:
                                ;
                                _ctx.prev = 27;
                                publicKey = new index_browser_esm.PublicKey(wallet.publicKey.toBytes());
                                _ctx.next = 34;
                                break;
                            case 31:
                                _ctx.prev = 31;
                                _ctx.t1 = _ctx["catch"](27);
                                throw new errors/* WalletPublicKeyError */.Nx(_ctx.t1 === null || _ctx.t1 === void 0 ? void 0 : _ctx.t1.message, _ctx.t1);
                            case 34:
                                wallet.on('disconnect', this._disconnected);
                                this._wallet = wallet;
                                this._publicKey = publicKey;
                                this.emit('connect');
                                _ctx.next = 44;
                                break;
                            case 40:
                                _ctx.prev = 40;
                                _ctx.t2 = _ctx["catch"](0);
                                this.emit('error', _ctx.t2);
                                throw _ctx.t2;
                            case 44:
                                _ctx.prev = 44;
                                this._connecting = false;
                                return _ctx.finish(44);
                            case 47:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            40,
                            44,
                            47
                        ],
                        [
                            11,
                            16,
                            21,
                            24
                        ],
                        [
                            27,
                            31
                        ]
                    ]);
                }));
            }
        },
        {
            key: "disconnect",
            value: function disconnect() {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                wallet = this._wallet;
                                if (!wallet) {
                                    _ctx.next = 13;
                                    break;
                                }
                                wallet.off('disconnect', this._disconnected);
                                this._wallet = null;
                                this._publicKey = null;
                                _ctx.prev = 5;
                                _ctx.next = 8;
                                return wallet.disconnect();
                            case 8:
                                _ctx.next = 13;
                                break;
                            case 10:
                                _ctx.prev = 10;
                                _ctx.t0 = _ctx["catch"](5);
                                this.emit('error', new errors/* WalletDisconnectionError */.UG(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0));
                            case 13:
                                this.emit('disconnect');
                            case 14:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            5,
                            10
                        ]
                    ]);
                }));
            }
        },
        {
            key: "signTransaction",
            value: function signTransaction(transaction) {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                wallet = this._wallet;
                                if (wallet) {
                                    _ctx.next = 4;
                                    break;
                                }
                                throw new errors/* WalletNotConnectedError */.oS();
                            case 4:
                                _ctx.prev = 4;
                                _ctx.next = 7;
                                return wallet.signTransaction(transaction);
                            case 7:
                                _ctx.t0 = _ctx.sent;
                                if (_ctx.t0) {
                                    _ctx.next = 10;
                                    break;
                                }
                                _ctx.t0 = transaction;
                            case 10:
                                return _ctx.abrupt("return", _ctx.t0);
                            case 13:
                                _ctx.prev = 13;
                                _ctx.t1 = _ctx["catch"](4);
                                throw new errors/* WalletSignTransactionError */.PY(_ctx.t1 === null || _ctx.t1 === void 0 ? void 0 : _ctx.t1.message, _ctx.t1);
                            case 16:
                                _ctx.next = 22;
                                break;
                            case 18:
                                _ctx.prev = 18;
                                _ctx.t2 = _ctx["catch"](0);
                                this.emit('error', _ctx.t2);
                                throw _ctx.t2;
                            case 22:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            18
                        ],
                        [
                            4,
                            13
                        ]
                    ]);
                }));
            }
        },
        {
            key: "signAllTransactions",
            value: function signAllTransactions(transactions) {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                wallet = this._wallet;
                                if (wallet) {
                                    _ctx.next = 4;
                                    break;
                                }
                                throw new errors/* WalletNotConnectedError */.oS();
                            case 4:
                                _ctx.prev = 4;
                                _ctx.next = 7;
                                return wallet.signAllTransactions(transactions);
                            case 7:
                                _ctx.t0 = _ctx.sent;
                                if (_ctx.t0) {
                                    _ctx.next = 10;
                                    break;
                                }
                                _ctx.t0 = transactions;
                            case 10:
                                return _ctx.abrupt("return", _ctx.t0);
                            case 13:
                                _ctx.prev = 13;
                                _ctx.t1 = _ctx["catch"](4);
                                throw new errors/* WalletSignTransactionError */.PY(_ctx.t1 === null || _ctx.t1 === void 0 ? void 0 : _ctx.t1.message, _ctx.t1);
                            case 16:
                                _ctx.next = 22;
                                break;
                            case 18:
                                _ctx.prev = 18;
                                _ctx.t2 = _ctx["catch"](0);
                                this.emit('error', _ctx.t2);
                                throw _ctx.t2;
                            case 22:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            18
                        ],
                        [
                            4,
                            13
                        ]
                    ]);
                }));
            }
        },
        {
            key: "signMessage",
            value: function signMessage(message) {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet, signature;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                wallet = this._wallet;
                                if (wallet) {
                                    _ctx.next = 4;
                                    break;
                                }
                                throw new errors/* WalletNotConnectedError */.oS();
                            case 4:
                                _ctx.prev = 4;
                                _ctx.next = 7;
                                return wallet.signMessage(message);
                            case 7:
                                signature = _ctx.sent.signature;
                                return _ctx.abrupt("return", Uint8Array.from(signature));
                            case 11:
                                _ctx.prev = 11;
                                _ctx.t0 = _ctx["catch"](4);
                                throw new errors/* WalletSignTransactionError */.PY(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0);
                            case 14:
                                _ctx.next = 20;
                                break;
                            case 16:
                                _ctx.prev = 16;
                                _ctx.t1 = _ctx["catch"](0);
                                this.emit('error', _ctx.t1);
                                throw _ctx.t1;
                            case 20:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            16
                        ],
                        [
                            4,
                            11
                        ]
                    ]);
                }));
            }
        }
    ]);
    return PhantomWalletAdapter;
} //# sourceMappingURL=adapter.js.map
(signer/* BaseMessageSignerWalletAdapter */.e);

// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/types.js
var types = __webpack_require__(9074);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/phantom.js


const getPhantomWallet = (config = {}) => ({
    name: types/* WalletName.Phantom */.w.Phantom,
    url: 'https://phantom.app',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iLjUiIHgyPSIuNSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1MzRiYjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NTFiZjkiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9Ii41IiB4Mj0iLjUiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii44MiIvPjwvbGluZWFyR3JhZGllbnQ+PGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgZmlsbD0idXJsKCNhKSIgcj0iMTciLz48cGF0aCBkPSJtMjkuMTcwMiAxNy4yMDcxaC0yLjk5NjljMC02LjEwNzQtNC45NjgzLTExLjA1ODE3LTExLjA5NzUtMTEuMDU4MTctNi4wNTMyNSAwLTEwLjk3NDYzIDQuODI5NTctMTEuMDk1MDggMTAuODMyMzctLjEyNDYxIDYuMjA1IDUuNzE3NTIgMTEuNTkzMiAxMS45NDUzOCAxMS41OTMyaC43ODM0YzUuNDkwNiAwIDEyLjg0OTctNC4yODI5IDEzLjk5OTUtOS41MDEzLjIxMjMtLjk2MTktLjU1MDItMS44NjYxLTEuNTM4OC0xLjg2NjF6bS0xOC41NDc5LjI3MjFjMCAuODE2Ny0uNjcwMzggMS40ODQ3LTEuNDkwMDEgMS40ODQ3LS44MTk2NCAwLTEuNDg5OTgtLjY2ODMtMS40ODk5OC0xLjQ4NDd2LTIuNDAxOWMwLS44MTY3LjY3MDM0LTEuNDg0NyAxLjQ4OTk4LTEuNDg0Ny44MTk2MyAwIDEuNDkwMDEuNjY4IDEuNDkwMDEgMS40ODQ3em01LjE3MzggMGMwIC44MTY3LS42NzAzIDEuNDg0Ny0xLjQ4OTkgMS40ODQ3LS44MTk3IDAtMS40OS0uNjY4My0xLjQ5LTEuNDg0N3YtMi40MDE5YzAtLjgxNjcuNjcwNi0xLjQ4NDcgMS40OS0xLjQ4NDcuODE5NiAwIDEuNDg5OS42NjggMS40ODk5IDEuNDg0N3oiIGZpbGw9InVybCgjYikiLz48L3N2Zz4K',
    adapter: () => new PhantomWalletAdapter(config),
});
//# sourceMappingURL=phantom.js.map

/***/ }),

/***/ 14008:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "W": function() { return /* binding */ getSlopeWallet; }
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js
var runtime = __webpack_require__(34051);
var runtime_default = /*#__PURE__*/__webpack_require__.n(runtime);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/poll.js
var poll = __webpack_require__(92983);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/errors.js
var errors = __webpack_require__(4004);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/signer.js
var signer = __webpack_require__(394);
// EXTERNAL MODULE: ./node_modules/@solana/web3.js/lib/index.browser.esm.js + 11 modules
var index_browser_esm = __webpack_require__(21755);
// EXTERNAL MODULE: ./node_modules/bs58/index.js
var bs58 = __webpack_require__(77191);
var bs58_default = /*#__PURE__*/__webpack_require__.n(bs58);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-slope/lib/adapter.js




function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    var adopt = function adopt(value) {
        return _instanceof(value, P) ? value : new P(function(resolve) {
            resolve(value);
        });
    };
    return new (P || (P = Promise))(function(resolve, reject) {
        var fulfilled = function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var SlopeWalletAdapter = /*#__PURE__*/ function(BaseMessageSignerWalletAdapter1) {
    "use strict";
    _inherits(SlopeWalletAdapter, BaseMessageSignerWalletAdapter1);
    var _super = _createSuper(SlopeWalletAdapter);
    function SlopeWalletAdapter() {
        var config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _classCallCheck(this, SlopeWalletAdapter);
        var _this;
        _this = _super.call(this);
        _this._connecting = false;
        _this._wallet = null;
        _this._publicKey = null;
        if (!_this.ready) (0,poll/* pollUntilReady */._)(_assertThisInitialized(_this), config.pollInterval || 1000, config.pollCount || 3);
        return _this;
    }
    _createClass(SlopeWalletAdapter, [
        {
            key: "publicKey",
            get: function get() {
                return this._publicKey;
            }
        },
        {
            key: "ready",
            get: function get() {
                return  true && !!window.Slope;
            }
        },
        {
            key: "connecting",
            get: function get() {
                return this._connecting;
            }
        },
        {
            key: "connected",
            get: function get() {
                return !!this._publicKey;
            }
        },
        {
            key: "connect",
            value: function connect() {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet, account, data, publicKey;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                if (!(this.connected || this.connecting)) {
                                    _ctx.next = 3;
                                    break;
                                }
                                return _ctx.abrupt("return");
                            case 3:
                                this._connecting = true;
                                if (window.Slope) {
                                    _ctx.next = 6;
                                    break;
                                }
                                throw new errors/* WalletNotFoundError */.l5();
                            case 6:
                                wallet = new window.Slope();
                                ;
                                _ctx.prev = 8;
                                _ctx.next = 11;
                                return wallet.connect();
                            case 11:
                                data = _ctx.sent.data;
                                if (data.publicKey) {
                                    _ctx.next = 14;
                                    break;
                                }
                                throw new errors/* WalletConnectionError */.$w();
                            case 14:
                                account = data.publicKey;
                                _ctx.next = 22;
                                break;
                            case 17:
                                _ctx.prev = 17;
                                _ctx.t0 = _ctx["catch"](8);
                                if (!_instanceof(_ctx.t0, errors/* WalletError */.lj)) {
                                    _ctx.next = 21;
                                    break;
                                }
                                throw _ctx.t0;
                            case 21:
                                throw new errors/* WalletConnectionError */.$w(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0);
                            case 22:
                                ;
                                _ctx.prev = 23;
                                publicKey = new index_browser_esm.PublicKey(account);
                                _ctx.next = 30;
                                break;
                            case 27:
                                _ctx.prev = 27;
                                _ctx.t1 = _ctx["catch"](23);
                                throw new errors/* WalletPublicKeyError */.Nx(_ctx.t1 === null || _ctx.t1 === void 0 ? void 0 : _ctx.t1.message, _ctx.t1);
                            case 30:
                                this._wallet = wallet;
                                this._publicKey = publicKey;
                                this.emit('connect');
                                _ctx.next = 39;
                                break;
                            case 35:
                                _ctx.prev = 35;
                                _ctx.t2 = _ctx["catch"](0);
                                this.emit('error', _ctx.t2);
                                throw _ctx.t2;
                            case 39:
                                _ctx.prev = 39;
                                this._connecting = false;
                                return _ctx.finish(39);
                            case 42:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            35,
                            39,
                            42
                        ],
                        [
                            8,
                            17
                        ],
                        [
                            23,
                            27
                        ]
                    ]);
                }));
            }
        },
        {
            key: "disconnect",
            value: function disconnect() {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet, msg;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                wallet = this._wallet;
                                if (!wallet) {
                                    _ctx.next = 16;
                                    break;
                                }
                                this._wallet = null;
                                this._publicKey = null;
                                _ctx.prev = 4;
                                _ctx.next = 7;
                                return wallet.disconnect();
                            case 7:
                                msg = _ctx.sent.msg;
                                if (!(msg !== 'ok')) {
                                    _ctx.next = 10;
                                    break;
                                }
                                throw new errors/* WalletDisconnectionError */.UG(msg);
                            case 10:
                                _ctx.next = 16;
                                break;
                            case 12:
                                _ctx.prev = 12;
                                _ctx.t0 = _ctx["catch"](4);
                                if (!_instanceof(_ctx.t0, errors/* WalletError */.lj)) {
                                    // eslint-disable-next-line no-ex-assign
                                    error = new errors/* WalletDisconnectionError */.UG(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0);
                                }
                                this.emit('error', _ctx.t0);
                            case 16:
                                this.emit('disconnect');
                            case 17:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            4,
                            12
                        ]
                    ]);
                }));
            }
        },
        {
            key: "signTransaction",
            value: function signTransaction(transaction) {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet, message, ref, msg, data, publicKey, signature;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                wallet = this._wallet;
                                if (wallet) {
                                    _ctx.next = 4;
                                    break;
                                }
                                throw new errors/* WalletNotConnectedError */.oS();
                            case 4:
                                _ctx.prev = 4;
                                message = bs58_default().encode(transaction.serializeMessage());
                                _ctx.next = 8;
                                return wallet.signTransaction(message);
                            case 8:
                                ref = _ctx.sent;
                                msg = ref.msg;
                                data = ref.data;
                                if (!(!data.publicKey || !data.signature)) {
                                    _ctx.next = 13;
                                    break;
                                }
                                throw new errors/* WalletSignTransactionError */.PY(msg);
                            case 13:
                                publicKey = new index_browser_esm.PublicKey(data.publicKey);
                                signature = bs58_default().decode(data.signature);
                                transaction.addSignature(publicKey, signature);
                                return _ctx.abrupt("return", transaction);
                            case 19:
                                _ctx.prev = 19;
                                _ctx.t0 = _ctx["catch"](4);
                                if (!_instanceof(_ctx.t0, errors/* WalletError */.lj)) {
                                    _ctx.next = 23;
                                    break;
                                }
                                throw _ctx.t0;
                            case 23:
                                throw new errors/* WalletSignTransactionError */.PY(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0);
                            case 24:
                                _ctx.next = 30;
                                break;
                            case 26:
                                _ctx.prev = 26;
                                _ctx.t1 = _ctx["catch"](0);
                                this.emit('error', _ctx.t1);
                                throw _ctx.t1;
                            case 30:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            26
                        ],
                        [
                            4,
                            19
                        ]
                    ]);
                }));
            }
        },
        {
            key: "signAllTransactions",
            value: function signAllTransactions(transactions) {
                var _a;
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet, messages, ref, msg, data, length, publicKey, i;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                wallet = this._wallet;
                                if (wallet) {
                                    _ctx.next = 4;
                                    break;
                                }
                                throw new errors/* WalletNotConnectedError */.oS();
                            case 4:
                                _ctx.prev = 4;
                                messages = transactions.map(function(transaction) {
                                    return bs58_default().encode(transaction.serializeMessage());
                                });
                                _ctx.next = 8;
                                return wallet.signAllTransactions(messages);
                            case 8:
                                ref = _ctx.sent;
                                msg = ref.msg;
                                data = ref.data;
                                length = transactions.length;
                                if (!(!data.publicKey || ((_a = data.signatures) === null || _a === void 0 ? void 0 : _a.length) !== length)) {
                                    _ctx.next = 14;
                                    break;
                                }
                                throw new errors/* WalletSignTransactionError */.PY(msg);
                            case 14:
                                publicKey = new index_browser_esm.PublicKey(data.publicKey);
                                for(i = 0; i < length; i++){
                                    transactions[i].addSignature(publicKey, bs58_default().decode(data.signatures[i]));
                                }
                                return _ctx.abrupt("return", transactions);
                            case 19:
                                _ctx.prev = 19;
                                _ctx.t0 = _ctx["catch"](4);
                                if (!_instanceof(_ctx.t0, errors/* WalletError */.lj)) {
                                    _ctx.next = 23;
                                    break;
                                }
                                throw _ctx.t0;
                            case 23:
                                throw new errors/* WalletSignTransactionError */.PY(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0);
                            case 24:
                                _ctx.next = 30;
                                break;
                            case 26:
                                _ctx.prev = 26;
                                _ctx.t1 = _ctx["catch"](0);
                                this.emit('error', _ctx.t1);
                                throw _ctx.t1;
                            case 30:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            26
                        ],
                        [
                            4,
                            19
                        ]
                    ]);
                }));
            }
        },
        {
            key: "signMessage",
            value: function signMessage(message) {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet, response;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                wallet = this._wallet;
                                if (wallet) {
                                    _ctx.next = 4;
                                    break;
                                }
                                throw new errors/* WalletNotConnectedError */.oS();
                            case 4:
                                _ctx.prev = 4;
                                _ctx.next = 7;
                                return wallet.signMessage(message);
                            case 7:
                                response = _ctx.sent;
                                return _ctx.abrupt("return", bs58_default().decode(response.data.signature));
                            case 11:
                                _ctx.prev = 11;
                                _ctx.t0 = _ctx["catch"](4);
                                throw new errors/* WalletSignTransactionError */.PY(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0);
                            case 14:
                                _ctx.next = 20;
                                break;
                            case 16:
                                _ctx.prev = 16;
                                _ctx.t1 = _ctx["catch"](0);
                                this.emit('error', _ctx.t1);
                                throw _ctx.t1;
                            case 20:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            16
                        ],
                        [
                            4,
                            11
                        ]
                    ]);
                }));
            }
        }
    ]);
    return SlopeWalletAdapter;
} //# sourceMappingURL=adapter.js.map
(signer/* BaseMessageSignerWalletAdapter */.e);

// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/types.js
var types = __webpack_require__(9074);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/slope.js


const getSlopeWallet = (config = {}) => ({
    name: types/* WalletName.Slope */.w.Slope,
    url: 'https://slope.finance',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHdpZHRoPSIxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNjQiIGN5PSI2NCIgZmlsbD0iIzZlNjZmYSIgcj0iNjQiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJtMzUuMTk2MyA1NC4zOTk4aDE5LjJ2MTkuMmgtMTkuMnoiLz48cGF0aCBkPSJtNzMuNTk3IDU0LjM5OTgtMTkuMiAxOS4ydi0xOS4ybDE5LjItMTkuMnoiIGZpbGwtb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJtNzMuNTk3IDczLjU5OTgtMTkuMiAxOS4ydi0xOS4ybDE5LjItMTkuMnoiIGZpbGwtb3BhY2l0eT0iLjc1Ii8+PHBhdGggZD0ibTczLjYwNCA1NC4zOTk4aDE5LjJ2MTkuMmgtMTkuMnoiLz48cGF0aCBkPSJtNTQuMzk2OCAzNS4yIDE5LjItMTkuMnYxOS4ybC0xOS4yIDE5LjJoLTE5LjJ6IiBmaWxsLW9wYWNpdHk9Ii43NSIvPjxwYXRoIGQ9Im03My41OTE1IDkyLjgtMTkuMiAxOS4ydi0xOS4ybDE5LjItMTkuMmgxOS4yeiIgZmlsbC1vcGFjaXR5PSIuNCIvPjwvZz48L3N2Zz4=',
    adapter: () => new SlopeWalletAdapter(config),
});
//# sourceMappingURL=slope.js.map

/***/ }),

/***/ 40367:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "I": function() { return /* binding */ getSolflareWallet; }
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js
var runtime = __webpack_require__(34051);
var runtime_default = /*#__PURE__*/__webpack_require__.n(runtime);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/errors.js
var errors = __webpack_require__(4004);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/poll.js
var poll = __webpack_require__(92983);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/signer.js
var signer = __webpack_require__(394);
// EXTERNAL MODULE: ./node_modules/@solana/web3.js/lib/index.browser.esm.js + 11 modules
var index_browser_esm = __webpack_require__(21755);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-solflare/lib/adapter.js



function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    var adopt = function adopt(value) {
        return _instanceof(value, P) ? value : new P(function(resolve) {
            resolve(value);
        });
    };
    return new (P || (P = Promise))(function(resolve, reject) {
        var fulfilled = function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var SolflareWalletAdapter = /*#__PURE__*/ function(BaseMessageSignerWalletAdapter1) {
    "use strict";
    _inherits(SolflareWalletAdapter, BaseMessageSignerWalletAdapter1);
    var _super = _createSuper(SolflareWalletAdapter);
    function SolflareWalletAdapter() {
        var config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _classCallCheck(this, SolflareWalletAdapter);
        var _this;
        _this = _super.call(this);
        _this._disconnected = function() {
            var wallet = _this._wallet;
            if (wallet) {
                wallet.off('disconnect', _this._disconnected);
                _this._wallet = null;
                _this._publicKey = null;
                _this.emit('error', new errors/* WalletDisconnectedError */.at());
                _this.emit('disconnect');
            }
        };
        _this._connecting = false;
        _this._wallet = null;
        _this._publicKey = null;
        if (!_this.ready) (0,poll/* pollUntilReady */._)(_assertThisInitialized(_this), config.pollInterval || 1000, config.pollCount || 3);
        return _this;
    }
    _createClass(SolflareWalletAdapter, [
        {
            key: "publicKey",
            get: function get() {
                return this._publicKey;
            }
        },
        {
            key: "ready",
            get: function get() {
                var _a;
                return  true && !!((_a = window.solflare) === null || _a === void 0 ? void 0 : _a.isSolflare);
            }
        },
        {
            key: "connecting",
            get: function get() {
                return this._connecting;
            }
        },
        {
            key: "connected",
            get: function get() {
                var _a;
                return !!((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.isConnected);
            }
        },
        {
            key: "connect",
            value: function connect() {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet, publicKey;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                if (!(this.connected || this.connecting)) {
                                    _ctx.next = 3;
                                    break;
                                }
                                return _ctx.abrupt("return");
                            case 3:
                                this._connecting = true;
                                wallet =  true && window.solflare;
                                if (wallet) {
                                    _ctx.next = 7;
                                    break;
                                }
                                throw new errors/* WalletNotFoundError */.l5();
                            case 7:
                                if (wallet.isSolflare) {
                                    _ctx.next = 9;
                                    break;
                                }
                                throw new errors/* WalletNotInstalledError */.Yf();
                            case 9:
                                if (wallet.isConnected) {
                                    _ctx.next = 18;
                                    break;
                                }
                                _ctx.prev = 10;
                                _ctx.next = 13;
                                return wallet.connect();
                            case 13:
                                _ctx.next = 18;
                                break;
                            case 15:
                                _ctx.prev = 15;
                                _ctx.t0 = _ctx["catch"](10);
                                throw new errors/* WalletConnectionError */.$w(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0);
                            case 18:
                                if (wallet.publicKey) {
                                    _ctx.next = 20;
                                    break;
                                }
                                throw new errors/* WalletConnectionError */.$w();
                            case 20:
                                ;
                                _ctx.prev = 21;
                                publicKey = new index_browser_esm.PublicKey(wallet.publicKey.toBytes());
                                _ctx.next = 28;
                                break;
                            case 25:
                                _ctx.prev = 25;
                                _ctx.t1 = _ctx["catch"](21);
                                throw new errors/* WalletPublicKeyError */.Nx(_ctx.t1 === null || _ctx.t1 === void 0 ? void 0 : _ctx.t1.message, _ctx.t1);
                            case 28:
                                wallet.on('disconnect', this._disconnected);
                                this._wallet = wallet;
                                this._publicKey = publicKey;
                                this.emit('connect');
                                _ctx.next = 38;
                                break;
                            case 34:
                                _ctx.prev = 34;
                                _ctx.t2 = _ctx["catch"](0);
                                this.emit('error', _ctx.t2);
                                throw _ctx.t2;
                            case 38:
                                _ctx.prev = 38;
                                this._connecting = false;
                                return _ctx.finish(38);
                            case 41:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            34,
                            38,
                            41
                        ],
                        [
                            10,
                            15
                        ],
                        [
                            21,
                            25
                        ]
                    ]);
                }));
            }
        },
        {
            key: "disconnect",
            value: function disconnect() {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                wallet = this._wallet;
                                if (!wallet) {
                                    _ctx.next = 13;
                                    break;
                                }
                                wallet.off('disconnect', this._disconnected);
                                this._wallet = null;
                                this._publicKey = null;
                                _ctx.prev = 5;
                                _ctx.next = 8;
                                return wallet.disconnect();
                            case 8:
                                _ctx.next = 13;
                                break;
                            case 10:
                                _ctx.prev = 10;
                                _ctx.t0 = _ctx["catch"](5);
                                this.emit('error', new errors/* WalletDisconnectionError */.UG(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0));
                            case 13:
                                this.emit('disconnect');
                            case 14:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            5,
                            10
                        ]
                    ]);
                }));
            }
        },
        {
            key: "signTransaction",
            value: function signTransaction(transaction) {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                wallet = this._wallet;
                                if (wallet) {
                                    _ctx.next = 4;
                                    break;
                                }
                                throw new errors/* WalletNotConnectedError */.oS();
                            case 4:
                                _ctx.prev = 4;
                                _ctx.next = 7;
                                return wallet.signTransaction(transaction);
                            case 7:
                                _ctx.t0 = _ctx.sent;
                                if (_ctx.t0) {
                                    _ctx.next = 10;
                                    break;
                                }
                                _ctx.t0 = transaction;
                            case 10:
                                return _ctx.abrupt("return", _ctx.t0);
                            case 13:
                                _ctx.prev = 13;
                                _ctx.t1 = _ctx["catch"](4);
                                throw new errors/* WalletSignTransactionError */.PY(_ctx.t1 === null || _ctx.t1 === void 0 ? void 0 : _ctx.t1.message, _ctx.t1);
                            case 16:
                                _ctx.next = 22;
                                break;
                            case 18:
                                _ctx.prev = 18;
                                _ctx.t2 = _ctx["catch"](0);
                                this.emit('error', _ctx.t2);
                                throw _ctx.t2;
                            case 22:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            18
                        ],
                        [
                            4,
                            13
                        ]
                    ]);
                }));
            }
        },
        {
            key: "signAllTransactions",
            value: function signAllTransactions(transactions) {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                wallet = this._wallet;
                                if (wallet) {
                                    _ctx.next = 4;
                                    break;
                                }
                                throw new errors/* WalletNotConnectedError */.oS();
                            case 4:
                                _ctx.prev = 4;
                                _ctx.next = 7;
                                return wallet.signAllTransactions(transactions);
                            case 7:
                                _ctx.t0 = _ctx.sent;
                                if (_ctx.t0) {
                                    _ctx.next = 10;
                                    break;
                                }
                                _ctx.t0 = transactions;
                            case 10:
                                return _ctx.abrupt("return", _ctx.t0);
                            case 13:
                                _ctx.prev = 13;
                                _ctx.t1 = _ctx["catch"](4);
                                throw new errors/* WalletSignTransactionError */.PY(_ctx.t1 === null || _ctx.t1 === void 0 ? void 0 : _ctx.t1.message, _ctx.t1);
                            case 16:
                                _ctx.next = 22;
                                break;
                            case 18:
                                _ctx.prev = 18;
                                _ctx.t2 = _ctx["catch"](0);
                                this.emit('error', _ctx.t2);
                                throw _ctx.t2;
                            case 22:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            18
                        ],
                        [
                            4,
                            13
                        ]
                    ]);
                }));
            }
        },
        {
            key: "signMessage",
            value: function signMessage(message) {
                return __awaiter(this, void 0, void 0, runtime_default().mark(function _callee() {
                    var wallet, signature;
                    return runtime_default().wrap(function _callee$(_ctx) {
                        while(1)switch(_ctx.prev = _ctx.next){
                            case 0:
                                _ctx.prev = 0;
                                wallet = this._wallet;
                                if (wallet) {
                                    _ctx.next = 4;
                                    break;
                                }
                                throw new errors/* WalletNotConnectedError */.oS();
                            case 4:
                                _ctx.prev = 4;
                                _ctx.next = 7;
                                return wallet.signMessage(message, 'utf8');
                            case 7:
                                signature = _ctx.sent.signature;
                                return _ctx.abrupt("return", Uint8Array.from(signature));
                            case 11:
                                _ctx.prev = 11;
                                _ctx.t0 = _ctx["catch"](4);
                                throw new errors/* WalletSignTransactionError */.PY(_ctx.t0 === null || _ctx.t0 === void 0 ? void 0 : _ctx.t0.message, _ctx.t0);
                            case 14:
                                _ctx.next = 20;
                                break;
                            case 16:
                                _ctx.prev = 16;
                                _ctx.t1 = _ctx["catch"](0);
                                this.emit('error', _ctx.t1);
                                throw _ctx.t1;
                            case 20:
                            case "end":
                                return _ctx.stop();
                        }
                    }, _callee, this, [
                        [
                            0,
                            16
                        ],
                        [
                            4,
                            11
                        ]
                    ]);
                }));
            }
        }
    ]);
    return SolflareWalletAdapter;
} //# sourceMappingURL=adapter.js.map
(signer/* BaseMessageSignerWalletAdapter */.e);

// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/types.js
var types = __webpack_require__(9074);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/solflare.js


const getSolflareWallet = (config = {}) => ({
    name: types/* WalletName.Solflare */.w.Solflare,
    url: 'https://solflare.com',
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmMxMGIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYjNmMmUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2LjQ3ODM1IiB4Mj0iMzQuOTEwNyIgeGxpbms6aHJlZj0iI2EiIHkxPSI3LjkyIiB5Mj0iMzMuNjU5MyIvPjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjAiIGN5PSIwIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDQuOTkyMTg4MzIgMTIuMDYzODc5NjMgLTEyLjE4MTEzNjU1IDUuMDQwNzEwNzQgMjIuNTIwMiAyMC42MTgzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHI9IjEiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZD0ibTI1LjE3MDggNDcuOTEwNGMuNTI1IDAgLjk1MDcuNDIxLjk1MDcuOTQwM3MtLjQyNTcuOTQwMi0uOTUwNy45NDAyLS45NTA3LS40MjA5LS45NTA3LS45NDAyLjQyNTctLjk0MDMuOTUwNy0uOTQwM3ptLTEuMDMyOC00NC45MTU2NWMuNDY0Ni4wMzgzNi44Mzk4LjM5MDQuOTAyNy44NDY4MWwxLjEzMDcgOC4yMTU3NGMuMzc5OCAyLjcxNDMgMy42NTM1IDMuODkwNCA1LjY3NDMgMi4wNDU5bDExLjMyOTEtMTAuMzExNThjLjI3MzMtLjI0ODczLjY5ODktLjIzMTQ5Ljk1MDcuMDM4NTEuMjMwOS4yNDc3Mi4yMzc5LjYyNjk3LjAxNjEuODgyNzdsLTkuODc5MSAxMS4zOTU4Yy0xLjgxODcgMi4wOTQyLS40NzY4IDUuMzY0MyAyLjI5NTYgNS41OTc4bDguNzE2OC44NDAzYy40MzQxLjA0MTguNzUxNy40MjM0LjcwOTMuODUyNC0uMDM0OS4zNTM3LS4zMDc0LjYzOTUtLjY2MjguNjk0OWwtOS4xNTk0IDEuNDMwMmMtMi42NTkzLjM2MjUtMy44NjM2IDMuNTExNy0yLjEzMzkgNS41NTc2bDMuMjIgMy43OTYxYy4yNTk0LjMwNTguMjE4OC43NjE1LS4wOTA4IDEuMDE3OC0uMjYyMi4yMTcyLS42NDE5LjIyNTYtLjkxMzguMDIwM2wtMy45Njk0LTIuOTk3OGMtMi4xNDIxLTEuNjEwOS01LjIyOTctLjI0MTctNS40NTYxIDIuNDI0M2wtLjg3NDcgMTAuMzk3NmMtLjAzNjIuNDI5NS0uNDE3OC43NDg3LS44NTI1LjcxMy0uMzY5LS4wMzAzLS42NjcxLS4zMDk3LS43MTcxLS42NzIxbC0xLjM4NzEtMTAuMDQzN2MtLjM3MTctMi43MTQ0LTMuNjQ1NC0zLjg5MDQtNS42NzQzLTIuMDQ1OWwtMTIuMDUxOTUgMTAuOTc0Yy0uMjQ5NDcuMjI3MS0uNjM4MDkuMjExNC0uODY4LS4wMzUtLjIxMDk0LS4yMjYyLS4yMTczNS0uNTcyNC0uMDE0OTMtLjgwNmwxMC41MTgxOC0xMi4xMzg1YzEuODE4Ny0yLjA5NDIuNDg0OS01LjM2NDQtMi4yODc2LTUuNTk3OGwtOC43MTg3Mi0uODQwNWMtLjQzNDEzLS4wNDE4LS43NTE3Mi0uNDIzNS0uNzA5MzYtLjg1MjQuMDM0OTMtLjM1MzcuMzA3MzktLjYzOTQuNjYyNy0uNjk1bDkuMTUzMzgtMS40Mjk5YzIuNjU5NC0uMzYyNSAzLjg3MTgtMy41MTE3IDIuMTQyMS01LjU1NzZsLTIuMTkyLTIuNTg0MWMtLjMyMTctLjM3OTItLjI3MTMtLjk0NDMuMTEyNi0xLjI2MjEuMzI1My0uMjY5NC43OTYzLS4yNzk3IDEuMTMzNC0uMDI0OWwyLjY5MTggMi4wMzQ3YzIuMTQyMSAxLjYxMDkgNS4yMjk3LjI0MTcgNS40NTYxLTIuNDI0M2wuNzI0MS04LjU1OTk4Yy4wNDU3LS41NDA4LjUyNjUtLjk0MjU3IDEuMDczOS0uODk3Mzd6bS0yMy4xODczMyAyMC40Mzk2NWMuNTI1MDQgMCAuOTUwNjcuNDIxLjk1MDY3Ljk0MDNzLS40MjU2My45NDAzLS45NTA2Ny45NDAzYy0uNTI1MDQxIDAtLjk1MDY3LS40MjEtLjk1MDY3LS45NDAzcy40MjU2MjktLjk0MDMuOTUwNjctLjk0MDN6bTQ3LjY3OTczLS45NTQ3Yy41MjUgMCAuOTUwNy40MjEuOTUwNy45NDAzcy0uNDI1Ny45NDAyLS45NTA3Ljk0MDItLjk1MDctLjQyMDktLjk1MDctLjk0MDIuNDI1Ny0uOTQwMy45NTA3LS45NDAzem0tMjQuNjI5Ni0yMi40Nzk3Yy41MjUgMCAuOTUwNi40MjA5NzMuOTUwNi45NDAyNyAwIC41MTkzLS40MjU2Ljk0MDI3LS45NTA2Ljk0MDI3LS41MjUxIDAtLjk1MDctLjQyMDk3LS45NTA3LS45NDAyNyAwLS41MTkyOTcuNDI1Ni0uOTQwMjcuOTUwNy0uOTQwMjd6IiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0ibTI0LjU3MSAzMi43NzkyYzQuOTU5NiAwIDguOTgwMi0zLjk3NjUgOC45ODAyLTguODgxOSAwLTQuOTA1My00LjAyMDYtOC44ODE5LTguOTgwMi04Ljg4MTlzLTguOTgwMiAzLjk3NjYtOC45ODAyIDguODgxOWMwIDQuOTA1NCA0LjAyMDYgOC44ODE5IDguOTgwMiA4Ljg4MTl6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+',
    adapter: () => new SolflareWalletAdapter(config),
});
//# sourceMappingURL=solflare.js.map

/***/ }),

/***/ 29780:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "D": function() { return /* binding */ getSolletWallet; }
});

// EXTERNAL MODULE: ./node_modules/eventemitter3/index.js
var eventemitter3 = __webpack_require__(26729);
var eventemitter3_default = /*#__PURE__*/__webpack_require__.n(eventemitter3);
// EXTERNAL MODULE: ./node_modules/@solana/web3.js/lib/index.browser.esm.js + 11 modules
var index_browser_esm = __webpack_require__(21755);
// EXTERNAL MODULE: ./node_modules/bs58/index.js
var bs58 = __webpack_require__(77191);
var bs58_default = /*#__PURE__*/__webpack_require__.n(bs58);
;// CONCATENATED MODULE: ./node_modules/@project-serum/sol-wallet-adapter/dist/esm/index.js
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class Wallet extends (eventemitter3_default()) {
    constructor(provider, _network) {
        super();
        this._network = _network;
        this._publicKey = null;
        this._popup = null;
        this._handlerAdded = false;
        this._nextRequestId = 1;
        this._autoApprove = false;
        this._responsePromises = new Map();
        this.handleMessage = (e) => {
            var _a;
            if ((this._injectedProvider && e.source === window) ||
                (e.origin === ((_a = this._providerUrl) === null || _a === void 0 ? void 0 : _a.origin) && e.source === this._popup)) {
                if (e.data.method === 'connected') {
                    const newPublicKey = new index_browser_esm.PublicKey(e.data.params.publicKey);
                    if (!this._publicKey || !this._publicKey.equals(newPublicKey)) {
                        if (this._publicKey && !this._publicKey.equals(newPublicKey)) {
                            this.handleDisconnect();
                        }
                        this._publicKey = newPublicKey;
                        this._autoApprove = !!e.data.params.autoApprove;
                        this.emit('connect', this._publicKey);
                    }
                }
                else if (e.data.method === 'disconnected') {
                    this.handleDisconnect();
                }
                else if (e.data.result || e.data.error) {
                    const promises = this._responsePromises.get(e.data.id);
                    if (promises) {
                        const [resolve, reject] = promises;
                        if (e.data.result) {
                            resolve(e.data.result);
                        }
                        else {
                            reject(new Error(e.data.error));
                        }
                    }
                }
            }
        };
        this._beforeUnload = () => {
            void this.disconnect();
        };
        if (isInjectedProvider(provider)) {
            this._injectedProvider = provider;
        }
        else if (isString(provider)) {
            this._providerUrl = new URL(provider);
            this._providerUrl.hash = new URLSearchParams({
                origin: window.location.origin,
                network: this._network,
            }).toString();
        }
        else {
            throw new Error('provider parameter must be an injected provider or a URL string.');
        }
    }
    handleConnect() {
        var _a;
        if (!this._handlerAdded) {
            this._handlerAdded = true;
            window.addEventListener('message', this.handleMessage);
            window.addEventListener('beforeunload', this._beforeUnload);
        }
        if (this._injectedProvider) {
            return new Promise((resolve) => {
                void this.sendRequest('connect', {});
                resolve();
            });
        }
        else {
            window.name = 'parent';
            this._popup = window.open((_a = this._providerUrl) === null || _a === void 0 ? void 0 : _a.toString(), '_blank', 'location,resizable,width=460,height=675');
            return new Promise((resolve) => {
                this.once('connect', resolve);
            });
        }
    }
    handleDisconnect() {
        if (this._handlerAdded) {
            this._handlerAdded = false;
            window.removeEventListener('message', this.handleMessage);
            window.removeEventListener('beforeunload', this._beforeUnload);
        }
        if (this._publicKey) {
            this._publicKey = null;
            this.emit('disconnect');
        }
        this._responsePromises.forEach(([, reject], id) => {
            this._responsePromises.delete(id);
            reject(new Error('Wallet disconnected'));
        });
    }
    sendRequest(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (method !== 'connect' && !this.connected) {
                throw new Error('Wallet not connected');
            }
            const requestId = this._nextRequestId;
            ++this._nextRequestId;
            return new Promise((resolve, reject) => {
                var _a, _b, _c, _d;
                this._responsePromises.set(requestId, [resolve, reject]);
                if (this._injectedProvider) {
                    this._injectedProvider.postMessage({
                        jsonrpc: '2.0',
                        id: requestId,
                        method,
                        params: Object.assign({ network: this._network }, params),
                    });
                }
                else {
                    (_a = this._popup) === null || _a === void 0 ? void 0 : _a.postMessage({
                        jsonrpc: '2.0',
                        id: requestId,
                        method,
                        params,
                    }, (_c = (_b = this._providerUrl) === null || _b === void 0 ? void 0 : _b.origin) !== null && _c !== void 0 ? _c : '');
                    if (!this.autoApprove) {
                        (_d = this._popup) === null || _d === void 0 ? void 0 : _d.focus();
                    }
                }
            });
        });
    }
    get publicKey() {
        return this._publicKey;
    }
    get connected() {
        return this._publicKey !== null;
    }
    get autoApprove() {
        return this._autoApprove;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._popup) {
                this._popup.close();
            }
            yield this.handleConnect();
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._injectedProvider) {
                yield this.sendRequest('disconnect', {});
            }
            if (this._popup) {
                this._popup.close();
            }
            this.handleDisconnect();
        });
    }
    sign(data, display) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(data instanceof Uint8Array)) {
                throw new Error('Data must be an instance of Uint8Array');
            }
            const response = (yield this.sendRequest('sign', {
                data,
                display,
            }));
            const signature = bs58_default().decode(response.signature);
            const publicKey = new index_browser_esm.PublicKey(response.publicKey);
            return {
                signature,
                publicKey,
            };
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield this.sendRequest('signTransaction', {
                message: bs58_default().encode(transaction.serializeMessage()),
            }));
            const signature = bs58_default().decode(response.signature);
            const publicKey = new index_browser_esm.PublicKey(response.publicKey);
            transaction.addSignature(publicKey, signature);
            return transaction;
        });
    }
    signAllTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (yield this.sendRequest('signAllTransactions', {
                messages: transactions.map((tx) => bs58_default().encode(tx.serializeMessage())),
            }));
            const signatures = response.signatures.map((s) => bs58_default().decode(s));
            const publicKey = new index_browser_esm.PublicKey(response.publicKey);
            transactions = transactions.map((tx, idx) => {
                tx.addSignature(publicKey, signatures[idx]);
                return tx;
            });
            return transactions;
        });
    }
    diffieHellman(publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(publicKey instanceof Uint8Array)) {
                throw new Error('Data must be an instance of Uint8Array');
            }
            const response = (yield this.sendRequest('diffieHellman', {
                publicKey,
            }));
            return response;
        });
    }
}
function isString(a) {
    return typeof a === 'string';
}
function isInjectedProvider(a) {
    return (isObject(a) && 'postMessage' in a && typeof a.postMessage === 'function');
}
function isObject(a) {
    return typeof a === 'object' && a !== null;
}
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/signer.js
var signer = __webpack_require__(394);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/errors.js
var errors = __webpack_require__(4004);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/adapter.js
var adapter = __webpack_require__(96296);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/poll.js
var poll = __webpack_require__(92983);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-sollet/lib/adapter.js
var adapter_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class SolletWalletAdapter extends signer/* BaseMessageSignerWalletAdapter */.e {
    constructor(config = {}) {
        super();
        this._disconnected = () => {
            const wallet = this._wallet;
            if (wallet) {
                wallet.off('disconnect', this._disconnected);
                this._wallet = null;
                this.emit('error', new errors/* WalletDisconnectedError */.at());
                this.emit('disconnect');
            }
        };
        this._provider = config.provider || (typeof window === 'undefined' ? undefined : window.sollet);
        this._network = config.network || adapter/* WalletAdapterNetwork.Mainnet */.QZ.Mainnet;
        this._connecting = false;
        this._wallet = null;
        if (!this.ready)
            (0,poll/* pollUntilReady */._)(this, config.pollInterval || 1000, config.pollCount || 3);
    }
    get publicKey() {
        var _a;
        return ((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.publicKey) || null;
    }
    get ready() {
        var _a;
        return (typeof this._provider === 'string' ||
            (typeof window !== 'undefined' && typeof ((_a = window.sollet) === null || _a === void 0 ? void 0 : _a.postMessage) === 'function'));
    }
    get connecting() {
        return this._connecting;
    }
    get connected() {
        var _a;
        return !!((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.connected);
    }
    connect() {
        return adapter_awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connected || this.connecting)
                    return;
                this._connecting = true;
                const provider = this._provider || (typeof window !== 'undefined' && window.sollet);
                if (!provider)
                    throw new errors/* WalletNotFoundError */.l5();
                let wallet;
                try {
                    wallet = new Wallet(provider, this._network);
                    // HACK: sol-wallet-adapter doesn't reject or emit an event if the popup or extension is closed or blocked
                    const handleDisconnect = wallet.handleDisconnect;
                    let timeout;
                    let interval;
                    try {
                        yield new Promise((resolve, reject) => {
                            const connect = () => {
                                if (timeout)
                                    clearTimeout(timeout);
                                wallet.off('connect', connect);
                                resolve();
                            };
                            wallet.handleDisconnect = (...args) => {
                                wallet.off('connect', connect);
                                reject(new errors/* WalletWindowClosedError */.hd());
                                return handleDisconnect.apply(wallet, args);
                            };
                            wallet.on('connect', connect);
                            wallet.connect().catch((reason) => {
                                wallet.off('connect', connect);
                                reject(reason);
                            });
                            if (typeof provider === 'string') {
                                let count = 0;
                                interval = setInterval(() => {
                                    const popup = wallet._popup;
                                    if (popup) {
                                        if (popup.closed)
                                            reject(new errors/* WalletWindowClosedError */.hd());
                                    }
                                    else {
                                        if (count > 50)
                                            reject(new errors/* WalletWindowBlockedError */.d2());
                                    }
                                    count++;
                                }, 100);
                            }
                            else {
                                // HACK: sol-wallet-adapter doesn't reject or emit an event if the extension is closed or ignored
                                timeout = setTimeout(() => reject(new errors/* WalletTimeoutError */.NK()), 10000);
                            }
                        });
                    }
                    finally {
                        wallet.handleDisconnect = handleDisconnect;
                        if (interval)
                            clearInterval(interval);
                    }
                }
                catch (error) {
                    if (error instanceof errors/* WalletError */.lj)
                        throw error;
                    throw new errors/* WalletConnectionError */.$w(error === null || error === void 0 ? void 0 : error.message, error);
                }
                wallet.on('disconnect', this._disconnected);
                this._wallet = wallet;
                this.emit('connect');
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
            finally {
                this._connecting = false;
            }
        });
    }
    disconnect() {
        return adapter_awaiter(this, void 0, void 0, function* () {
            const wallet = this._wallet;
            if (wallet) {
                wallet.off('disconnect', this._disconnected);
                this._wallet = null;
                // HACK: sol-wallet-adapter doesn't reliably fulfill its promise or emit an event on disconnect
                const handleDisconnect = wallet.handleDisconnect;
                try {
                    yield new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => resolve(), 250);
                        wallet.handleDisconnect = (...args) => {
                            clearTimeout(timeout);
                            resolve();
                            // HACK: sol-wallet-adapter rejects with an uncaught promise error
                            wallet._responsePromises = new Map();
                            return handleDisconnect.apply(wallet, args);
                        };
                        wallet.disconnect().then(() => {
                            clearTimeout(timeout);
                            resolve();
                        }, (error) => {
                            clearTimeout(timeout);
                            // HACK: sol-wallet-adapter rejects with an error on disconnect
                            if ((error === null || error === void 0 ? void 0 : error.message) === 'Wallet disconnected') {
                                resolve();
                            }
                            else {
                                reject(error);
                            }
                        });
                    });
                }
                catch (error) {
                    this.emit('error', new errors/* WalletDisconnectionError */.UG(error === null || error === void 0 ? void 0 : error.message, error));
                }
                finally {
                    wallet.handleDisconnect = handleDisconnect;
                }
            }
            this.emit('disconnect');
        });
    }
    signTransaction(transaction) {
        return adapter_awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new errors/* WalletNotConnectedError */.oS();
                try {
                    return (yield wallet.signTransaction(transaction)) || transaction;
                }
                catch (error) {
                    throw new errors/* WalletSignTransactionError */.PY(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
    signAllTransactions(transactions) {
        return adapter_awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new errors/* WalletNotConnectedError */.oS();
                try {
                    return (yield wallet.signAllTransactions(transactions)) || transactions;
                }
                catch (error) {
                    throw new errors/* WalletSignTransactionError */.PY(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
    signMessage(message) {
        return adapter_awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new errors/* WalletNotConnectedError */.oS();
                try {
                    const { signature } = yield wallet.sign(message, 'utf8');
                    return Uint8Array.from(signature);
                }
                catch (error) {
                    throw new errors/* WalletSignMessageError */.fk(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
}
//# sourceMappingURL=adapter.js.map
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/types.js
var types = __webpack_require__(9074);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/sollet.js
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


const getSolletWallet = (_a = {}) => {
    var { provider } = _a, config = __rest(_a, ["provider"]);
    return ({
        name: types/* WalletName.Sollet */.w.Sollet,
        url: 'https://www.sollet.io',
        icon: 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUzMCIgd2lkdGg9IjUzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtLTEtMWg1MzJ2NTMyaC01MzJ6IiBmaWxsPSJub25lIi8+PGcgZmlsbD0iIzAwZmZhMyI+PHBhdGggZD0ibTg4Ljg4OTM1IDM3Mi45ODIwMWMzLjE5My0zLjE5IDcuNTIyLTQuOTgyIDEyLjAzNS00Ljk4Mmg0MTYuNDYxYzcuNTg2IDAgMTEuMzg0IDkuMTc0IDYuMDE3IDE0LjUzNmwtODIuMjkxIDgyLjIyNmMtMy4xOTMgMy4xOTEtNy41MjIgNC45ODMtMTIuMDM2IDQuOTgzaC00MTYuNDYwMWMtNy41ODY2IDAtMTEuMzg0NS05LjE3NC02LjAxNzgtMTQuNTM3bDgyLjI5MTktODIuMjI2eiIvPjxwYXRoIGQ9Im04OC44ODkzNSA2NS45ODI1YzMuMTkzLTMuMTkwNCA3LjUyMi00Ljk4MjUgMTIuMDM1LTQuOTgyNWg0MTYuNDYxYzcuNTg2IDAgMTEuMzg0IDkuMTczOSA2LjAxNyAxNC41MzYzbC04Mi4yOTEgODIuMjI2N2MtMy4xOTMgMy4xOS03LjUyMiA0Ljk4Mi0xMi4wMzYgNC45ODJoLTQxNi40NjAxYy03LjU4NjYgMC0xMS4zODQ1LTkuMTc0LTYuMDE3OC0xNC41MzZsODIuMjkxOS04Mi4yMjY1eiIvPjxwYXRoIGQ9Im00NDEuMTExMzUgMjE5LjEwOTVjLTMuMTkzLTMuMTktNy41MjItNC45ODItMTIuMDM2LTQuOTgyaC00MTYuNDYwMWMtNy41ODY2IDAtMTEuMzg0NSA5LjE3My02LjAxNzggMTQuNTM2bDgyLjI5MTkgODIuMjI2YzMuMTkzIDMuMTkgNy41MjIgNC45ODMgMTIuMDM1IDQuOTgzaDQxNi40NjFjNy41ODYgMCAxMS4zODQtOS4xNzQgNi4wMTctMTQuNTM3eiIvPjwvZz48L3N2Zz4=',
        adapter: () => new SolletWalletAdapter(Object.assign({ provider: 'https://www.sollet.io' }, config)),
    });
};
//# sourceMappingURL=sollet.js.map

/***/ }),

/***/ 64710:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "N": function() { return /* binding */ getSolongWallet; }
});

// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/signer.js
var signer = __webpack_require__(394);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/poll.js
var poll = __webpack_require__(92983);
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-base/lib/errors.js
var errors = __webpack_require__(4004);
// EXTERNAL MODULE: ./node_modules/@solana/web3.js/lib/index.browser.esm.js + 11 modules
var index_browser_esm = __webpack_require__(21755);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-solong/lib/adapter.js
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class SolongWalletAdapter extends signer/* BaseSignerWalletAdapter */.s {
    constructor(config = {}) {
        super();
        this._connecting = false;
        this._wallet = null;
        this._publicKey = null;
        if (!this.ready)
            (0,poll/* pollUntilReady */._)(this, config.pollInterval || 1000, config.pollCount || 3);
    }
    get publicKey() {
        return this._publicKey;
    }
    get ready() {
        return typeof window !== 'undefined' && !!window.solong;
    }
    get connecting() {
        return this._connecting;
    }
    get connected() {
        var _a;
        return !!((_a = this._wallet) === null || _a === void 0 ? void 0 : _a.currentAccount);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connected || this.connecting)
                    return;
                this._connecting = true;
                const wallet = typeof window !== 'undefined' && window.solong;
                if (!wallet)
                    throw new errors/* WalletNotFoundError */.l5();
                let account;
                try {
                    account = yield wallet.selectAccount();
                }
                catch (error) {
                    throw new errors/* WalletAccountError */.cO(error === null || error === void 0 ? void 0 : error.message, error);
                }
                let publicKey;
                try {
                    publicKey = new index_browser_esm.PublicKey(account);
                }
                catch (error) {
                    throw new errors/* WalletPublicKeyError */.Nx(error === null || error === void 0 ? void 0 : error.message, error);
                }
                this._wallet = wallet;
                this._publicKey = publicKey;
                this.emit('connect');
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
            finally {
                this._connecting = false;
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._wallet) {
                this._wallet = null;
                this._publicKey = null;
            }
            this.emit('disconnect');
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallet = this._wallet;
                if (!wallet)
                    throw new errors/* WalletNotConnectedError */.oS();
                try {
                    return (yield wallet.signTransaction(transaction)) || transaction;
                }
                catch (error) {
                    throw new errors/* WalletSignTransactionError */.PY(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
    signAllTransactions(transactions) {
        return __awaiter(this, void 0, void 0, function* () {
            const signedTransactions = [];
            for (const transaction of transactions) {
                signedTransactions.push(yield this.signTransaction(transaction));
            }
            return signedTransactions;
        });
    }
}
//# sourceMappingURL=adapter.js.map
// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/types.js
var types = __webpack_require__(9074);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-wallets/lib/solong.js


const getSolongWallet = (config = {}) => ({
    name: types/* WalletName.Solong */.w.Solong,
    url: 'https://solongwallet.com',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAGlklEQVR4Ae3bA5DsyhfH8TNr49r2/du2bdu2bdu2zcdNrm3b9toz533rvctUn3Umk9p01WfdvVW/6nROBxJVS1rSkpa0pCUtaUlLWtKSpl4VXos3GJ4sujQFuUKfWl+qT730arzB8Ex9YksKcgXjFOCVeIPhBYydB8mawQ+yiGC8n0EN6zAVcgXhpQjoq1DDdsyDAAB9Pwo1HMC9INk0FIM8Bt1Qh9WohQQCvD+BtEMdtmC8I7y5aIE67MV0SBwDvB3qsE/UHwMJIpC/QB1OYiLEEeCPoQ7nMRcSwwDrao3Zl8aTIEGEUYlL0IAMXuQOr66UvsegDm+ExDJAPNiafSg0AlyIbmjAWX1aQzEkiH6T0QkNaEdpnAN8NNRhPcSF9e9el2ebBhyAuNBvGtLQgIuQOAd4D6jDMRQbM3AmOqEBDfq0xjJIEP3GohkakEFVjAP0y401sAsLnAE+pb6EsC5AA9J4sHsG+kX0PQR1eFJ8AwTWQh0+DjFm4a1Qh2/AOoz/BHX4ZdwD/CDU4aioX2GUMW+AOnB2bqiBBDHe86EOTYw5GRKJwQ/ijUM91OGTxgysxSmowzeNw7j08m5DHX4l7Igg2TY0g9hbLBZ+f7oxC98CdWjDvYzD+MVQh07GfEQsZyDgVWA71OGvorfnQQCAcqaYUFZDHW6j/itAoB70GcergzqsEa0rhGTTEA7mP0koK4xdyeOMmvBBhJU2zsjPMw7lu9O3zShpXheHk4hhcZ4w26AOG4RSxDiUfwZ12KdPqy+FBDHeV6EOZxizIg6HsMGbiQ5jdjzBXRfeefGg3tgbv9BYC0fhZE7sjUMY9Pf9rdcI5XtQh39BjBA/C3VYnM0zcgiDek+GOhzh93mQoMs7kIxze/eMhnxIEOPNM9bcFtTEeAb6I419axu/m2CsgxU4Aw1A/UxIUM/bO/9+cVkDDd5x42x8N1iH8Taow0NhHcZLoQ5Pi/MMzDMW+DTu7g6vIY9AdkAdHmaUMyn6roA6PD22AeLB6DbWplHG7LubfY+kfiIkiH5T0AJ1uFtMA1xUzOc1UIclzvCeXF+o7DygDlvds29RgVVzYj+K4xhgEX4NdcjgecE++rSL+ZdLmIxRB77Ose7l4XPIQB3eF8M60C/n8++ghltE/QLIFfqUiyUE8kOoYSW7jmLIFXeN4X0NaajDDlG/NG6XswrxKdxu+G/weh27j3wCej9uN9zEOjc3sObl4S243XBLhDfWE0mAMQjwZfhxDng7pG/8Sj4/ER/Gd/BdfBhPRGW2A/wxNAfcBOnFCHwZZ6GGs/gqapMAb/QEnIT20Uk8IQkQeB7aof3UihcM9wDvhyboANHXv1+IdWBOB2hsIftto+iSPEif8aGPcjrA50GHyPMiOIT9B/N5apaMgQT8D2poxMdwt8s+hkao4X9ZDxBTIdHwy/h8AeqQxhMhAU9BB9ThPMqHTYCYjU6owy3uPstSfL4Z6uZPC+Mk8gOomz8DEg3vXshAHb4MMXwZarhXGDPwa739w2j48623BPAniOFPUMPsMAL8INTw9AgDrLZOCmjFPEjA3WD1aUJVGAG+CGr4ECRCy6GGg3iyaF0+n/PwFByEGpaJ+qkw1sB7QA3/hUTozdBetFymvXhTWGVMOc7bp36/FhKRamNW9dcxZmpZiI+32ad+vAQSoWejGzpAXXh22Fek3wY1rDD2kVnijR3ExYQMPgkJOUB/nFW0Is3vnw6JhlHX9a4N70Iq/ACBv0MNu7J9WxHw7jaA2deFOtw32zeVHtHLWvMN0dtSkOzwS3spYy7iH1hx2d/wYdyTvnkR3BdeQjjerVBDN14JyZIfQWH5RC7e1rw32npZV54LCc+SPD5/HgqYD3WW5+gTqt6X+rA4v0701hRkKF0+bL+HTM9Hgv/MHH60wyvHWigsafwA1ZAhMguLoL34kbDcQEI1uAH8mcbuxPHImf8i5EMGxqvER9EI7cUqVMTl0Y6HoxHaBzvxNkyC9EEe7oEv4Sy0D/YQ+IS4ver1JNT38z7sWnwbb8TT8Cg8Gs/Gu/Ar7EEXtI/2ud7Ni0GAYCbiJDQiazA57k9nTcdqaJb9UtSvitXbmjavCJ9AMzRkJ/B80boUJBLhDe7Nw1/QCR1i9fgKRg6HByzvjZ/hInQQMjiCT2PSMHxC1a/l8wvwGxyG9kEaW/EtPI4xiiE5JcLrd6PxcLwM78SH8EG8Fc/H/UUXVUByGh8SSYBJgEmASYCJJMAkwBi6A3xCqZhiBz8+AAAAAElFTkSuQmCC',
    adapter: () => new SolongWalletAdapter(config),
});
//# sourceMappingURL=solong.js.map

/***/ }),

/***/ 9074:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "w": function() { return /* binding */ WalletName; }
/* harmony export */ });
var WalletName;
(function (WalletName) {
    WalletName["BitKeep"] = "BitKeep";
    WalletName["Bitpie"] = "Bitpie";
    WalletName["Blocto"] = "Blocto";
    WalletName["Clover"] = "Clover";
    WalletName["Coin98"] = "Coin98";
    WalletName["Coinhub"] = "Coinhub";
    WalletName["Ledger"] = "Ledger";
    WalletName["MathWallet"] = "MathWallet";
    WalletName["Phantom"] = "Phantom";
    WalletName["SafePal"] = "SafePal";
    WalletName["Slope"] = "Slope";
    WalletName["Solflare"] = "Solflare";
    WalletName["SolflareWeb"] = "Solflare (Web)";
    WalletName["Sollet"] = "Sollet";
    WalletName["SolletExtension"] = "Sollet (Extension)";
    WalletName["Solong"] = "Solong";
    WalletName["TokenPocket"] = "TokenPocket";
    WalletName["Torus"] = "Torus";
    // WalletConnect = 'WalletConnect', // not published yet
})(WalletName || (WalletName = {}));
//# sourceMappingURL=types.js.map

/***/ })

}]);