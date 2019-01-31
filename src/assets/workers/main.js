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
/*! exports provided: Parameters, Skills, PowerGems, Talents, StaticData, Stats, Data, Log, AttributeData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parameters", function() { return Parameters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Skills", function() { return Skills; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PowerGems", function() { return PowerGems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Talents", function() { return Talents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticData", function() { return StaticData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stats", function() { return Stats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Log", function() { return Log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeData", function() { return AttributeData; });
var Parameters = /** @class */ (function () {
    function Parameters() {
        this.laserRoFv2 = 25;
        this.fingerRoF = 10;
        this.cannonRoF = 2.5;
        this.version = "v1.0.8";
        this.versionDate = "01/27/2019";
    }
    return Parameters;
}());

var Skills = /** @class */ (function () {
    function Skills() {
        this.arrow = 1;
        this.laser = 1;
        this.archers = 1;
        this.numMissiles = 0;
        this.missileDamage = 1;
        this.finger = 1;
        this.cannon = 0;
        this.bomb = 0;
        this.lasers = 0;
        this.bounces = 0;
        this.bounceDmg = 1;
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
        this.numRockets = 0;
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
        this.lockArrow = false;
        this.lockCC = false;
        this.lockCD = false;
        this.lockDefense = false;
        this.lockFinger = false;
        this.lockLaser = false;
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

var StaticData = /** @class */ (function () {
    function StaticData() {
        for (var n = 0; n <= 5; n++) {
            var row = [];
            var hitRow = [];
            for (var m = 0; m <= 6; m++) {
                var mult = 1.0;
                var bouncedmgmultiplier = 0.5 + (0.05 * m);
                for (var i = 1; i <= n; i++) {
                    mult += (i == 1) ? bouncedmgmultiplier : (bouncedmgmultiplier / (i * 0.8));
                }
                hitRow.push((n == 0) ? 1.0 : ((n == 1) ? bouncedmgmultiplier : (bouncedmgmultiplier / (n * 0.8))));
                row.push(mult);
            }
            StaticData.BOUNCE_TABLE.push(row);
            StaticData.BOUNCE_HIT_TABLE.push(hitRow);
        }
    }
    StaticData.getInstance = function () {
        if (!StaticData.instance)
            StaticData.instance = new StaticData();
        return StaticData.instance;
    };
    StaticData.BOUNCE_TABLE = [];
    StaticData.BOUNCE_HIT_TABLE = [];
    StaticData.ATTRIBUTES = [
        "skills.arrow",
        "skills.laser",
        "skills.missileDamage",
        "skills.missileFiringRate",
        "skills.finger",
        "skills.cannon",
        "skills.bomb",
        "skills.numMissiles",
        "power.numRockets",
        "skills.arrowRoF",
        "skills.archers",
        "skills.lasers",
        "skills.bounces",
        "skills.bounceDmg",
        "talents.arrow",
        "talents.laser",
        "talents.critChance",
        "talents.critDamage",
        "talents.finger",
        "power.arrow",
        "power.laser",
        "power.missile",
    ];
    return StaticData;
}());

var Stats = /** @class */ (function () {
    function Stats() {
        StaticData.getInstance();
    }
    Stats.prototype.update = function (data) {
        var arrowBase = 16 + (14 + data.power.arrow) * data.skills.arrow - data.power.arrow;
        // next update: 
        // damage = (long)(((((LaserDamageLevel - 1) * LaserDamageIncrease) + laserDamage) * LaserDamageTalent) * laserMasteryDamage * 1.8f)
        // LaserDamageIncrease = 3 + (LaserUpgradeBoostLevel * laserUpgradeBoostIncrement);
        // LaserUpgradeBoostLevel = powergems lvl
        // laserDamage = 12
        // laserUpgradeBoostIncrement = 1/4
        var laserBase = ((data.skills.laser * (3 + (data.power.laser / 4.0)) + 12.0)) * 1.7;
        var oldLaserBase = (((data.skills.laser - 1.0) * (data.power.laser / 4.0)) + 12.0 + (data.skills.laser * 3)) * 1.3;
        this.missileBase = 500 + ((data.skills.missileDamage - 1) * Math.floor(data.skills.missileDamage / 2) * (75 + (data.power.missile * 10)));
        var fingerBase = 14 + (6 * data.skills.finger);
        this.missileROF = 3.0 - Math.round(10.0 * (data.skills.missileFiringRate * 0.1)) / 10.0;
        this.missilesPerSec = Math.round(data.skills.numMissiles * (10.0 / this.missileROF)) / 10.0;
        this.rocketsPerSec = Math.round(data.power.numRockets * (10.0 / this.missileROF)) / 10.0;
        this.missileDps = Math.round((data.skills.numMissiles + data.power.numRockets) * (1.0 / this.missileROF) * this.missileBase);
        this.critChance = 0.01 * data.talents.critChance;
        this.critDamage = 0.50 + (data.talents.critDamage * 5) / 100.0;
        this.arrowMastery = Math.min(Math.floor(data.talents.arrow / 100), 3);
        this.laserMastery = Math.min(Math.floor(data.talents.laser / 100), 3);
        var masteryPts = Math.min(Math.floor(data.talents.arrow / 100) + Math.floor(data.talents.laser / 100), 6);
        if (data.talents.laser >= data.talents.arrow) {
            this.laserMastery = Math.min(masteryPts, 3);
            this.arrowMastery = Math.min(masteryPts - this.laserMastery, 3);
        }
        else {
            this.arrowMastery = Math.min(masteryPts, 3);
            this.laserMastery = Math.min(masteryPts - this.arrowMastery, 3);
        }
        this.superCritChance = Math.round(this.arrowMastery * 10) / 100.0;
        this.arrowPct = Math.round(data.talents.arrow * 3) / 100.0;
        this.laserPct = Math.round(data.talents.laser * 3) / 100.0;
        this.fingerPct = Math.round(data.talents.finger * 3) / 100.0;
        this.arrowMasteryPct = MASTERY_PCT[this.arrowMastery];
        this.laserMasteryPct = MASTERY_PCT[this.laserMastery];
        this.arrow = Math.floor(arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct));
        this.laser = Math.floor(laserBase * (1.0 + this.laserPct) * (1.0 + this.laserMasteryPct));
        this.statsLaserDamage = Math.floor(oldLaserBase * (1.0 + this.laserPct) * (1.0 + this.laserMasteryPct));
        this.finger = Math.floor(fingerBase * (1 + this.fingerPct));
        this.arrowCrit = Math.floor(arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct) * (1 + this.critDamage));
        this.laserCrit = Math.floor(laserBase * (1 + this.laserPct) * (1 + this.laserMasteryPct) * (1 + this.critDamage));
        this.superCrit = (this.arrowMastery >= 1) ? (2.0 * this.arrowCrit) : 0.0;
        this.avgArrow = (this.superCritChance * this.superCrit) +
            ((1.0 - this.superCritChance) * this.critChance * this.arrowCrit) +
            ((1.0 - this.superCritChance) * (1.0 - this.critChance) * this.arrow);
        this.avgLaser = (this.critChance * this.laserCrit) +
            ((1.0 - this.critChance) * this.laser);
        this.laserArchers = LASER_ARCHERS[this.laserMastery];
        this.baseArrowsSec = Math.round(300.0 / (12 - data.skills.arrowRoF)) / 10.0;
        this.arrowRoF = ((this.arrowMastery >= 3) ? 1.1 : 1.0) * this.baseArrowsSec;
        this.arrowsPerSec = data.skills.archers * this.arrowRoF;
        this.laserTicksPerSec = data.skills.lasers * data.params.laserRoFv2;
        this.laserArcherTicksPerSec = data.params.laserRoFv2 * this.laserArchers;
        var x = Math.max(Math.min(data.skills.bounces, 5), 0);
        var y = Math.max(Math.min(data.skills.bounceDmg, 6), 0);
        var mult = StaticData.BOUNCE_TABLE[x][y];
        this.laserBounceMult = Math.round(mult * 100.0) / 100.0;
        this.arrowDps = data.skills.archers * this.avgArrow * this.arrowRoF;
        this.laserArcherBounceFactor = (this.laserMastery >= 3) ? this.laserBounceMult : 1.0;
        this.laserDps = (this.avgLaser * this.laserTicksPerSec * this.laserBounceMult) + (this.avgLaser * this.laserArcherTicksPerSec * this.laserArcherBounceFactor);
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
var MASTERY_PCT = [0.0, 0.08, 0.16, 0.25];
var Data = /** @class */ (function () {
    function Data() {
        this.skills = new Skills();
        this.talents = new Talents();
        this.stats = new Stats();
        this.params = new Parameters();
        this.power = new PowerGems();
        this.attributes = {};
        for (var _i = 0, _a = StaticData.ATTRIBUTES; _i < _a.length; _i++) {
            var a = _a[_i];
            this.attributes[a] = 1;
        }
        this.update();
    }
    Data.prototype.update = function () {
        this.talents.update();
        this.level = this.talents.getLevel();
        this.stats.update(this);
    };
    Data.fromJSON = function (json) {
        if (typeof json === 'string') {
            return JSON.parse(json, Data.reviver);
        }
        else if (json !== undefined && json !== null) {
            var data = Object.create(Data.prototype);
            return Object.assign(data, json);
        }
        else {
            return json;
        }
    };
    Data.reviver = function (key, value) {
        return key === '' ? Data.fromJSON(value) : value;
    };
    Data.copy = function (d) {
        var data = new Data();
        data.level = d.level;
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var a = _a[_i];
            var x = data[a];
            var y = d[a];
            for (var _b = 0, _c = Object.keys(x); _b < _c.length; _b++) {
                var b = _c[_b];
                x[b] = y[b];
            }
        }
        return data;
    };
    return Data;
}());

var Log = /** @class */ (function () {
    function Log() {
    }
    return Log;
}());

var ARROW_ROF_COST = [300, 1000, 3000, 7000];
var ARCHER_COST = [300, 2000, 4000, 35000, 65000, 120000];
var AttributeData = /** @class */ (function () {
    function AttributeData() {
    }
    AttributeData.prototype.getGemCost = function (i, data) {
        if (i < 0)
            return 0;
        if (this.name == "power.numRockets") {
            if (i < 9)
                return 1;
            else
                return 0;
        }
        else {
            return Math.floor(i / 3) + 1;
        }
    };
    AttributeData.prototype.getCost = function (i, data) {
        if (this.name == "skills.finger") {
            return 100 * i;
        }
        else if (this.name == "skills.arrow") {
            if (i < 1)
                return 0;
            var c = 200;
            if (i > 1)
                c = 200 * (i * i + 1);
            if (data.stats.arrowMastery > 0) {
                c *= (1.0 - data.stats.arrowMasteryPct);
            }
            return c;
        }
        else if (this.name == "skills.laser") {
            if (i < 1)
                return 0;
            var c = 200 * ((i - 1) * (i - 1) + 20);
            if (data.stats.laserMastery > 0) {
                c *= (1.0 - data.stats.laserMasteryPct);
            }
            return c;
        }
        else if (this.name == "skills.missileDamage") {
            if (i == 0)
                return 100000;
            else
                return 25000 + ((i - 1) * (i - 1) * 5000);
        }
        else if (this.name == "skills.cannon") {
            if (i == 0)
                return 500000;
            else
                return 50000 + ((i - 1) * (i - 1) * 5000);
        }
        else if (this.name == "skills.bomb") {
            if (i == 0)
                return 750000;
            else
                return 100000 + ((i - 1) * (i - 1) * 5000);
        }
        else if (this.name == "skills.missileFiringRate") {
            return 50000 + (i * i * i * 50000);
        }
        else if (this.name == "skills.arrowRoF") {
            if ((i < 1) || (i > 4))
                return 0;
            else
                return ARROW_ROF_COST[i - 1];
        }
        else if (this.name == "skills.archers") {
            if ((i < 1) || (i > 6))
                return 0;
            else
                return ARCHER_COST[i - 1];
        }
        else if (this.name == "skills.lasers") {
            if (i == 0)
                return 12500;
            else if (i == 1)
                return 50000;
            else
                return 0;
        }
        else if (this.name == "skills.bounces") {
            if (i == 0)
                return 5000000;
            else if (i < 5)
                return 5000000 + (i * i * 5000000);
            else
                return 0;
        }
        else if (this.name == "skills.bounceDmg") {
            if (i == 0)
                return 0;
            else if (i < 6)
                return 2500000 + (i * i * 2500000);
            else
                return 0;
        }
        else if (this.name == "skills.numMissiles") {
            if (i == 0)
                return 100000;
            else
                return 0;
        }
        return 0;
    };
    AttributeData.prototype.calculateCoinCost = function (data) {
        var value = 0;
        var n = this.inc;
        if (this.max) {
            var n = Math.min(n, this.max - this.value);
        }
        for (var i = 0; i < n; i++) {
            value += this.getCost(this.value + i, data);
        }
        return value;
    };
    AttributeData.prototype.calculateGemCost = function (data) {
        var value = 0;
        var n = this.inc;
        if (this.max) {
            var n = Math.min(n, this.max - this.value);
        }
        for (var i = 0; i < n; i++) {
            value += this.getGemCost(this.value + i, data);
        }
        return value;
    };
    AttributeData.prototype.calculate = function (data) {
        var s = this.name.split(".");
        this.best = false;
        this.bestCoin = false;
        this.value = data[s[0]][s[1]];
        var old = data.stats.totalDps;
        if (!this.max || (this.value < this.max)) {
            var next = this.max ? Math.min(this.value + this.inc, this.max) : (this.value + this.inc);
            data[s[0]][s[1]] = next;
            data.update();
            this.dps = Math.round(data.stats.totalDps * 10.0) / 10.0;
            this.dpsPct = Math.round(10000.0 * ((this.dps - old) / old)) / 100.0;
            data[s[0]][s[1]] = this.value;
            data.update();
        }
        else {
            this.dps = Math.round(old * 10.0) / 10.0;
            this.dpsPct = 0;
        }
        if (this.name.startsWith("skills.")) {
            var cost = this.calculateCoinCost(data);
            if (cost > 0) {
                this.coins = cost;
                this.dpsPerCoin = Math.round(10000.0 * ((this.dps - old) / this.coins)) / 10.0;
            }
            else {
                this.coins = 0;
                this.dpsPerCoin = 0;
            }
        }
        else if (this.name.startsWith("power.")) {
            var cost = this.calculateGemCost(data);
            if (cost > 0) {
                this.coins = cost;
                this.dpsPerCoin = Math.round(10.0 * ((this.dps - old) / this.coins)) / 10.0;
            }
            else {
                this.coins = 0;
                this.dpsPerCoin = 0;
            }
        }
    };
    return AttributeData;
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
        l.startTime = new Date().getTime();
        var points = l.levels;
        var count = 0;
        var max = new _src_app_data__WEBPACK_IMPORTED_MODULE_1__["Data"]();
        var r = new _src_app_data__WEBPACK_IMPORTED_MODULE_1__["Data"]();
        max.skills = l.start.skills;
        max.params = l.start.params;
        max.update();
        r.skills = l.start.skills;
        r.params = l.start.params;
        r.power = l.start.power;
        for (var arrow = 0; arrow <= points; arrow++) {
            var m = points - arrow;
            for (var laser = 0; laser <= m; laser++) {
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
                        count++;
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
        l.finishTime = new Date().getTime();
        l.elapsedTime = l.finishTime - l.startTime;
        l.count = count;
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