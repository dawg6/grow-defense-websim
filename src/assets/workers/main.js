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
/*! exports provided: Parameters, Skills, PowerGems, Talents, Stats, Data, Log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parameters", function() { return Parameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Skills", function() { return Skills; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerGems", function() { return PowerGems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Talents", function() { return Talents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stats", function() { return Stats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return Log; });
var Parameters = /** @class */ (function () {
    function Parameters() {
        this.laserRoF = 30;
        this.fingerRoF = 10;
        this.cannonRoF = 2.5;
        this.laserArcherMult = 3;
        this.version = "v1.0.4";
        this.versionDate = "01/26/2019";
    }
    return Parameters;
}());

var Skills = /** @class */ (function () {
    function Skills() {
        this.arrow = 1;
        this.laser = 1;
        this.archers = 1;
        this.numMissiles = 0;
        this.missileDamage = 0;
        this.finger = 1;
        this.cannon = 0;
        this.bomb = 0;
        this.lasers = 0;
        this.bounces = 0;
        this.bounceDmg = 0;
        this.missileFiringRate = 0;
        this.arrowRoF = 1;
    }
    return Skills;
}());

var PowerGems = /** @class */ (function () {
    function PowerGems() {
        this.arrow = 0;
        this.laser = 0;
        this.missile = 0;
    }
    return PowerGems;
}());

var Talents = /** @class */ (function () {
    function Talents() {
        this.arrow = 0;
        this.laser = 0;
        this.critChance = 0;
        this.critDamage = 0;
        this.finger = 0;
        this.defense = 0;
        this.unspent = 0;
        this.lock = false;
    }
    Talents.prototype.getLevel = function () {
        return this.arrow + this.laser + this.critChance + this.critDamage + this.unspent + this.defense + this.finger + 1;
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
        this.arrowBase = 16 + (14 + data.power.arrow) * data.skills.arrow - data.power.arrow;
        this.laserBase = Math.floor(12.0 + (3.0 + data.power.laser / 4.0) * data.skills.laser) - Math.floor(data.power.laser / 4.0);
        this.missileBase = 500 + ((data.skills.missileDamage - 1) * Math.floor(data.skills.missileDamage / 2) * (75 + (data.power.missile * 10)));
        this.fingerBase = 14 + (6 * data.skills.finger);
        this.missileROF = 3.0 - Math.round(10.0 * (data.skills.missileFiringRate * 0.1)) / 10.0;
        this.missilesPerSec = Math.round(data.skills.numMissiles * (10.0 / this.missileROF)) / 10.0;
        this.missileDps = Math.round(this.missilesPerSec * this.missileBase);
        this.critChance = 0.01 * data.talents.critChance;
        this.critDamage = 0.50 + (data.talents.critDamage * 5) / 100.0;
        this.arrowMastery = Math.min(Math.floor(data.talents.arrow / 100), 3);
        this.laserMastery = Math.min(Math.floor(data.talents.laser / 100), 3);
        this.superCritChance = Math.round(this.arrowMastery * 10) / 100.0;
        this.arrowPct = Math.round(data.talents.arrow * 3) / 100.0;
        this.laserPct = Math.round(data.talents.laser * 3) / 100.0;
        this.fingerPct = Math.round(data.talents.finger * 3) / 100.0;
        this.arrowMasteryPct = (this.arrowMastery == 0) ? 0.0 : ((this.arrowMastery) == 1 ? 0.08 : ((this.arrowMastery == 2) ? 0.16 : 0.25));
        this.laserMasteryPct = (this.laserMastery == 0) ? 0.0 : ((this.laserMastery) == 1 ? 0.08 : ((this.laserMastery == 2) ? 0.16 : 0.25));
        this.arrow = Math.floor(this.arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct));
        this.laser = Math.floor(this.laserBase * (1 + this.laserPct) * (1 + this.laserMasteryPct));
        this.finger = Math.floor(this.fingerBase * (1 + this.fingerPct));
        this.arrowCrit = Math.floor(this.arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct) * (1 + this.critDamage));
        this.laserCrit = Math.floor(this.laserBase * (1 + this.laserPct) * (1 + this.laserMasteryPct) * (1 + this.critDamage));
        this.superCrit = (data.talents.arrow >= 100) ? (2.0 * this.arrowCrit) : 0.0;
        this.avgArrow = (this.superCritChance * this.superCrit) +
            ((1.0 - this.superCritChance) * this.critChance * this.arrowCrit) +
            ((1.0 - this.superCritChance) * (1.0 - this.critChance) * this.arrow);
        this.avgLaser = (this.critChance * this.laserCrit) +
            ((1.0 - this.critChance) * this.laser);
        this.laserArchers = LASER_ARCHERS[this.laserMastery];
        this.baseArrowsSec = Math.round(300.0 / (12 - data.skills.arrowRoF)) / 10.0;
        this.arrowRoF = ((this.arrowMastery >= 3) ? 1.1 : 1.0) * this.baseArrowsSec;
        this.arrowsPerSec = data.skills.archers * this.arrowRoF;
        this.laserTicksPerSec = data.skills.lasers * data.params.laserRoF;
        this.laserArcherTicksPerSec = data.params.laserRoF * this.laserArchers;
        var bouncedmgmultiplier = 0.5 + (0.05 * data.skills.bounceDmg);
        var mult = 1.0;
        for (var i = 1; i <= data.skills.bounces; i++) {
            mult += (i == 1) ? bouncedmgmultiplier : (bouncedmgmultiplier / (i * 0.8));
        }
        this.laserBounceMult = Math.round(mult * 100.0) / 100.0;
        this.arrowDps = data.skills.archers * this.avgArrow * this.arrowRoF;
        var laserArcherBounceFactor = (this.laserMastery >= 3) ? this.laserBounceMult : 1.0;
        this.laserDps = (this.avgLaser * this.laserTicksPerSec * this.laserBounceMult) + (this.avgLaser * data.params.laserArcherMult * this.laserArcherTicksPerSec * laserArcherBounceFactor);
        this.fingerDps = this.finger * data.params.fingerRoF;
        this.cannonBase = (data.skills.cannon > 0) ? (2000 + ((data.skills.cannon - 1) * 150 * Math.floor(data.skills.cannon / 2))) : 0;
        this.bombBase = (data.skills.bomb > 0) ? (2000 + ((data.skills.bomb - 1) * 300 * Math.floor(data.skills.bomb / 2))) : 0;
        this.cannonDps = (this.cannonBase + this.bombBase) / data.params.cannonRoF;
        this.totalDps = this.arrowDps + this.laserDps + this.missileDps + this.fingerDps + this.cannonDps;
        this.arrowDpsPct = this.arrowDps / this.totalDps;
        this.laserDpsPct = this.laserDps / this.totalDps;
        this.fingerDpsPct = this.fingerDps / this.totalDps;
        this.missileDpsPct = this.missileDps / this.totalDps;
        this.cannonDpsPct = this.cannonDps / this.totalDps;
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
        this.power = new PowerGems();
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
        r.power = l.start.power;
        var arrowMin = 0;
        var laserMin = 0;
        var fingerMin = 0;
        if (!l.start.talents.lock) {
            if (l.which == 1) {
                arrowMin = l.levels > 100 ? 100 : 0;
            }
            else if (l.which == 2) {
                laserMin = l.levels > 100 ? 100 : 0;
            }
        }
        for (var arrow = arrowMin; arrow <= points; arrow++) {
            var m = points - arrow;
            for (var laser = laserMin; laser <= m; laser++) {
                var n = Math.min(points - (arrow + laser), 100 - l.start.talents.critChance);
                for (var cc = 0; cc <= n; cc++) {
                    var o = (points >= 100) ? 0 : (points - (arrow + laser + cc));
                    for (var finger = 0; finger <= o; finger++) {
                        var cd = points - (arrow + laser + cc + finger);
                        r.talents.arrow = arrow + l.start.talents.arrow;
                        r.talents.laser = laser + l.start.talents.laser;
                        r.talents.finger = finger + l.start.talents.finger;
                        r.talents.critChance = cc + l.start.talents.critChance;
                        r.talents.critDamage = cd + l.start.talents.critDamage;
                        r.update();
                        if (r.stats.totalDps > max.stats.totalDps) {
                            max.talents.arrow = r.talents.arrow;
                            max.talents.laser = r.talents.laser;
                            max.talents.critChance = r.talents.critChance;
                            max.talents.critDamage = r.talents.critDamage;
                            max.talents.finger = r.talents.finger;
                            max.stats.totalDps = r.stats.totalDps;
                        }
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

module.exports = __webpack_require__(/*! D:\git\grow-defense-websim\worker\main.worker.ts */"./worker/main.worker.ts");


/***/ })

/******/ })));
//# sourceMappingURL=main.js.map