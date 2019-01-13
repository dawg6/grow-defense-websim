(function(e, a) { for(var i in a) e[i] = a[i]; }( /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/data.ts":
/*!*************************!*\
  !*** ./src/app/data.ts ***!
  \*************************/
/*! exports provided: Parameters, Skills, Talents, Stats, Data, Log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parameters", function() { return Parameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Skills", function() { return Skills; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Talents", function() { return Talents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stats", function() { return Stats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return Log; });
var Parameters = /** @class */ (function () {
    function Parameters() {
        this.archerRoF = 10;
        this.laserRoF = 30;
        this.laserArcherMult = 3;
        this.laserBounceMult = 1 + 0.5 + 0.25 + 0.125 + 0.0625;
    }
    return Parameters;
}());

var Skills = /** @class */ (function () {
    function Skills() {
        this.arrow = 0;
        this.laser = 0;
        this.archers = 7;
    }
    return Skills;
}());

var Talents = /** @class */ (function () {
    function Talents() {
        this.arrow = 0;
        this.laser = 0;
        this.critChance = 0;
        this.critDamage = 0;
    }
    Talents.prototype.getLevel = function () {
        return this.arrow + this.laser + this.critChance + this.critDamage + 1;
    };
    Talents.prototype.update = function () {
        this.arrow = Math.max(this.arrow, 0);
        this.laser = Math.max(this.laser, 0);
        this.critChance = Math.max(this.critChance, 0);
        this.critChance = Math.min(this.critChance, 100);
        this.critDamage = Math.max(this.critDamage, 0);
    };
    return Talents;
}());

var Stats = /** @class */ (function () {
    function Stats() {
    }
    Stats.prototype.update = function (data) {
        this.arrowBase = 23 + 7 * data.skills.arrow;
        this.laserBase = 12 + 3 * data.skills.laser;
        this.critChance = 0.01 * data.talents.critChance;
        this.critDamage = 0.50 + (data.talents.critDamage * 5) / 100.0;
        this.arrowMastery = Math.min(Math.floor(data.talents.arrow / 100), 3);
        this.laserMastery = Math.min(Math.floor(data.talents.laser / 100), 3);
        this.superCritChance = Math.round(this.arrowMastery * 10) / 100.0;
        this.arrowPct = Math.round(data.talents.arrow * 3) / 100.0;
        this.laserPct = Math.round(data.talents.laser * 3) / 100.0;
        this.arrowMasteryPct = Math.round(this.arrowMastery * 8) / 100.0;
        this.laserMasteryPct = Math.round(this.laserMastery * 8) / 100.0;
        this.arrow = Math.floor(this.arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct));
        this.laser = Math.floor(this.laserBase * (1 + this.laserPct) * (1 + this.laserMasteryPct));
        this.arrowCrit = Math.floor(this.arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct) * (1 + this.critDamage));
        this.laserCrit = Math.floor(this.laserBase * (1 + this.laserPct) * (1 + this.laserMasteryPct) * (1 + this.critDamage));
        this.superCrit = (data.talents.arrow >= 100) ? (2.0 * this.arrowCrit) : 0.0;
        this.avgArrow = (this.superCritChance * this.superCrit) +
            ((1.0 - this.superCritChance) * this.critChance * this.arrowCrit) +
            ((1.0 - this.superCritChance) * (1.0 - this.critChance) * this.arrow);
        this.avgLaser = (this.critChance * this.laserCrit) +
            ((1.0 - this.critChance) * this.laser);
        this.laserArchers = LASER_ARCHERS[this.laserMastery];
        this.arrowRoF = Math.floor(((this.arrowMastery >= 3) ? 1.1 : 1.0) * data.params.archerRoF);
        this.arrowsPerSec = data.skills.archers * this.arrowRoF;
        this.laserTicksPerSec = 2 * data.params.laserRoF;
        this.laserArcherTicksPerSec = data.params.laserRoF * this.laserArchers;
        this.arrowDps = data.skills.archers * this.avgArrow * this.arrowRoF;
        var laserArcherBounceFactor = (this.laserMastery >= 3) ? data.params.laserBounceMult : 1.0;
        this.laserDps = (this.avgLaser * this.laserTicksPerSec * data.params.laserBounceMult) + (this.avgLaser * this.laserArcherTicksPerSec * laserArcherBounceFactor);
        this.totalDps = this.arrowDps + this.laserDps;
        this.arrowDpsPct = this.arrowDps / this.totalDps;
        this.laserDpsPct = this.laserDps / this.totalDps;
    };
    return Stats;
}());

var LASER_ARCHERS = [0, 1, 2, 4];
var Data = /** @class */ (function () {
    function Data() {
        this.skills = new Skills();
        this.talents = new Talents();
        this.stats = new Stats();
        this.params = new Parameters();
        this.update();
    }
    Data.prototype.update = function () {
        this.talents.update();
        this.level = this.talents.getLevel();
        this.stats.update(this);
    };
    return Data;
}());

var Log = /** @class */ (function () {
    function Log() {
    }
    return Log;
}());



/***/ }),

/***/ "./worker/app-workers/app.workers.ts":
/*!*******************************************!*\
  !*** ./worker/app-workers/app.workers.ts ***!
  \*******************************************/
/*! exports provided: AppWorkers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppWorkers", function() { return AppWorkers; });
/* harmony import */ var _cpu_intensive_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cpu-intensive.worker */ "./worker/app-workers/cpu-intensive.worker.ts");
/* harmony import */ var _shared_worker_message_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/worker-message.model */ "./worker/app-workers/shared/worker-message.model.ts");
/* harmony import */ var _shared_worker_topic_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/worker-topic.constants */ "./worker/app-workers/shared/worker-topic.constants.ts");



var AppWorkers = /** @class */ (function () {
    function AppWorkers(workerCtx) {
        this.workerCtx = workerCtx;
        this.created = new Date();
    }
    AppWorkers.prototype.workerBroker = function ($event) {
        var _a = $event.data, topic = _a.topic, log = _a.data;
        // console.log("topic", topic, "log", log);
        var workerMessage = new _shared_worker_message_model__WEBPACK_IMPORTED_MODULE_1__["WorkerMessage"](topic, log);
        switch (topic) {
            case _shared_worker_topic_constants__WEBPACK_IMPORTED_MODULE_2__["WORKER_TOPIC"].cpuIntensive:
                this.workerCPUIntensive(workerMessage);
                break;
            default: // Add support for more workers here
                console.error('Topic Does Not Match');
        }
    };
    AppWorkers.prototype.workerCPUIntensive = function (value) {
        this.returnWorkResults(_cpu_intensive_worker__WEBPACK_IMPORTED_MODULE_0__["CPUIntensiveWorker"].doWork(value));
    };
    /**
     * Posts results back through to the worker
     * @param {WorkerMessage} message
     */
    AppWorkers.prototype.returnWorkResults = function (message) {
        // console.log("result", message);
        this.workerCtx.postMessage(message);
    };
    return AppWorkers;
}());



/***/ }),

/***/ "./worker/app-workers/cpu-intensive.worker.ts":
/*!****************************************************!*\
  !*** ./worker/app-workers/cpu-intensive.worker.ts ***!
  \****************************************************/
/*! exports provided: CPUIntensiveWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPUIntensiveWorker", function() { return CPUIntensiveWorker; });
/* harmony import */ var _shared_worker_message_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/worker-message.model */ "./worker/app-workers/shared/worker-message.model.ts");
/* harmony import */ var _src_app_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/app/data */ "./src/app/data.ts");


var CPUIntensiveWorker = /** @class */ (function () {
    function CPUIntensiveWorker() {
    }
    CPUIntensiveWorker.doWork = function (value) {
        // console.log("doWork", value);
        CPUIntensiveWorker.simulate(value.data);
        return new _shared_worker_message_model__WEBPACK_IMPORTED_MODULE_0__["WorkerMessage"](value.topic, value.data);
    };
    CPUIntensiveWorker.simulate = function (l) {
        var points = l.levels - 1;
        var max = new _src_app_data__WEBPACK_IMPORTED_MODULE_1__["Data"]();
        var r = new _src_app_data__WEBPACK_IMPORTED_MODULE_1__["Data"]();
        max.skills = l.start.skills;
        max.params = l.start.params;
        max.update();
        r.skills = l.start.skills;
        r.params = l.start.params;
        var arrowMin = 0;
        var laserMin = 0;
        if (l.which == 1) {
            arrowMin = l.levels > 100 ? 100 : 0;
        }
        else if (l.which == 2) {
            laserMin = l.levels > 100 ? 100 : 0;
        }
        for (var arrow = arrowMin; arrow <= points; arrow++) {
            var m = points - arrow;
            for (var laser = laserMin; laser <= m; laser++) {
                var n = Math.min(points - (arrow + laser), 100);
                for (var cc = 0; cc <= n; cc++) {
                    var cd = points - (arrow + laser + cc);
                    r.talents.arrow = arrow;
                    r.talents.laser = laser;
                    r.talents.critChance = cc;
                    r.talents.critDamage = cd;
                    r.update();
                    if (r.stats.totalDps > max.stats.totalDps) {
                        // console.log("arrow", arrow, "laser", laser, "cc", cc, "cd", cd, "dps", r.stats.totalDps);
                        max.talents.arrow = arrow;
                        max.talents.laser = laser;
                        max.talents.critChance = cc;
                        max.talents.critDamage = cd;
                        max.stats.totalDps = r.stats.totalDps;
                    }
                }
            }
        }
        l.best = max;
    };
    return CPUIntensiveWorker;
}());



/***/ }),

/***/ "./worker/app-workers/shared/worker-message.model.ts":
/*!***********************************************************!*\
  !*** ./worker/app-workers/shared/worker-message.model.ts ***!
  \***********************************************************/
/*! exports provided: WorkerMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkerMessage", function() { return WorkerMessage; });
var WorkerMessage = /** @class */ (function () {
    function WorkerMessage(topic, data) {
        this.topic = topic;
        this.data = data;
    }
    WorkerMessage.getInstance = function (value) {
        var topic = value.topic, data = value.data;
        return new WorkerMessage(topic, data);
    };
    return WorkerMessage;
}());



/***/ }),

/***/ "./worker/app-workers/shared/worker-topic.constants.ts":
/*!*************************************************************!*\
  !*** ./worker/app-workers/shared/worker-topic.constants.ts ***!
  \*************************************************************/
/*! exports provided: WORKER_TOPIC */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WORKER_TOPIC", function() { return WORKER_TOPIC; });
var WORKER_TOPIC = {
    cpuIntensive: 'cupIntensive',
    imageProcessor: 'imageProcessor'
};


/***/ }),

/***/ "./worker/main.worker.ts":
/*!*******************************!*\
  !*** ./worker/main.worker.ts ***!
  \*******************************/
/*! exports provided: worker, LAZY_MODULE_MAP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "worker", function() { return worker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LAZY_MODULE_MAP", function() { return LAZY_MODULE_MAP; });
/* harmony import */ var _app_workers_app_workers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-workers/app.workers */ "./worker/app-workers/app.workers.ts");

var worker = new _app_workers_app_workers__WEBPACK_IMPORTED_MODULE_0__["AppWorkers"](self);
addEventListener('message', function ($event) {
    worker.workerBroker($event);
});
var LAZY_MODULE_MAP = {};


/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** multi ./worker/main.worker.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\scott.clarke\git\grow-defense-websim\worker\main.worker.ts */"./worker/main.worker.ts");


/***/ })

/******/ })));
//# sourceMappingURL=main.js.map