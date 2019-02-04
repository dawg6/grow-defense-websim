import { elementStart } from '@angular/core/src/render3';

export class Parameters {
    laserRoFv2: number;
    fingerRoF: number;
    cannonRoF: number;
    version: string;
    versionDate: string;

    constructor() {
        this.laserRoFv2 = 25;
        this.fingerRoF = 10;
        this.cannonRoF = 2.5;
        this.version = "v1.1.0";
        this.versionDate = "02/04/2019";
    }
}

export class Skills {
    arrow: number;
    laser: number;
    archers: number;
    missileDamage: number;
    missileFiringRate: number;
    numMissiles: number;
    finger: number;
    cannon: number;
    bomb: number;
    lasers: number;
    bounces: number;
    bounceDmg: number;
    arrowRoF: number;

    constructor() {
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
}

export class PowerGems {
    arrow: number;
    laser: number;
    missile: number;
    numRockets: number;

    constructor() {
        this.arrow = 0;
        this.laser = 0;
        this.missile = 0;
        this.numRockets = 0;
    }
}

export class Talents {
    arrow: number;
    arrowMastery: number;
    laser: number;
    laserMastery: number;
    critChance: number;
    critDamage: number;
    finger: number;
    defense: number;
    unspent: number;
    lockArrow: boolean;
    lockLaser: boolean;
    lockCC: boolean;
    lockCD: boolean;
    lockFinger: boolean;
    lockDefense: boolean;
    lockArrowMastery: boolean;
    lockLaserMastery: boolean;

    constructor() {
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
        this.arrowMastery = 0;
        this.laserMastery = 0;
        this.lockLaserMastery = false;
        this.lockArrowMastery = false;
    }

    getLevel(): number {
        return this.arrow + this.laser + this.critChance + this.critDamage + this.unspent + this.defense + this.finger + 1;
    }

    update() {
        this.arrow = Math.max(this.arrow, 0);
        this.laser = Math.max(this.laser, 0);
        this.critChance = Math.max(this.critChance, 0);
        this.critChance = Math.min(this.critChance, 100);
        this.critDamage = Math.max(this.critDamage, 0);
    }
}

export class StaticData {
    public static BOUNCE_TABLE = [];
    public static BOUNCE_HIT_TABLE = [];
    public static ATTRIBUTES: string[] = [
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
        "talents.arrowMastery",
        "talents.laserMastery",
        "talents.critChance",
        "talents.critDamage",
        "talents.finger",
        "power.arrow",
        "power.laser",
        "power.missile",
    ];

    private static instance: StaticData;

    static getInstance() {
        if (!StaticData.instance)
            StaticData.instance = new StaticData();

        return StaticData.instance;
    }

    private constructor() {
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
}

export class Stats {
    critChance: number;
    critDamage: number;
    arrow: number;
    laser: number;
    finger: number;
    superCritChance: number;
    arrowPct: number;
    laserPct: number;
    arrowMasteryPct: number;
    laserMasteryPct: number;
    arrowCrit: number;
    laserCrit: number;
    superCrit: number;
    avgArrow: number;
    avgLaser: number;
    arrowRoF: number;
    laserArchers: number;
    arrowDps: number;
    laserDps: number;
    totalDps: number;
    arrowsPerSec: number;
    laserTicksPerSec: number;
    laserArcherTicksPerSec: number;
    arrowDpsPct: number;
    laserDpsPct: number;
    missileBase: number;
    missileROF: number;
    missilesPerSec: number;
    rocketsPerSec: number;
    missileDps: number;
    missileDpsPct: number;
    fingerDps: number;
    fingerPct: number;
    fingerDpsPct: number;
    laserBounceMult: number;
    cannonBase: number;
    bombBase: number;
    cannonDps: number;
    cannonDpsPct: number;
    baseArrowsSec: number;
    statsLaserDamage: number;
    laserArcherBounceFactor: number;
    masteryPoints: number;
    unspentMasteryPoints: number;

    constructor() {
        StaticData.getInstance();
    }

    update(data: Data) {
        this.masteryPoints = Math.min(Math.floor(data.talents.laser / 100) + Math.floor(data.talents.arrow / 100), 6);
        this.unspentMasteryPoints = this.masteryPoints - (data.talents.laserMastery + data.talents.arrowMastery);

        var arrowBase : number = 16 + (14 + data.power.arrow) * data.skills.arrow - data.power.arrow;
        // next update: 
        // damage = (long)(((((LaserDamageLevel - 1) * LaserDamageIncrease) + laserDamage) * LaserDamageTalent) * laserMasteryDamage * 1.8f)
        // LaserDamageIncrease = 3 + (LaserUpgradeBoostLevel * laserUpgradeBoostIncrement);
        // LaserUpgradeBoostLevel = powergems lvl
        // laserDamage = 12
        // laserUpgradeBoostIncrement = 1/4

        var laserBase : number = ((data.skills.laser * (3 + (data.power.laser / 4.0)) + 12.0)) * 1.7; // don't know why? it's "almost" correct

        var oldLaserBase : number = (((data.skills.laser - 1.0) * (data.power.laser / 4.0)) + 12.0 + (data.skills.laser * 3)) * 1.3;
        this.missileBase = 500 + ((data.skills.missileDamage - 1) * Math.floor(data.skills.missileDamage / 2) * (75 + (data.power.missile * 10)));
        var fingerBase : number = 14 + (6 * data.skills.finger);
        this.missileROF = 3.0 - Math.round(10.0 * (data.skills.missileFiringRate * 0.1)) / 10.0;
        this.missilesPerSec = Math.round(data.skills.numMissiles * (10.0 / this.missileROF)) / 10.0;
        this.rocketsPerSec = Math.round(data.power.numRockets * (10.0 / this.missileROF)) / 10.0;
        this.missileDps = Math.round((data.skills.numMissiles + data.power.numRockets) *  (1.0 / this.missileROF) * this.missileBase);

        this.critChance = 0.01 * data.talents.critChance;
        this.critDamage = 0.50 + (data.talents.critDamage * 5) / 100.0;

        var masteryPts = Math.min(Math.floor(data.talents.arrow / 100) + Math.floor(data.talents.laser / 100), 6);

        this.superCritChance = Math.round(data.talents.arrowMastery * 10) / 100.0;
        this.arrowPct = Math.round(data.talents.arrow * 3) / 100.0;
        this.laserPct = Math.round(data.talents.laser * 3) / 100.0;
        this.fingerPct = Math.round(data.talents.finger * 3) / 100.0;

        this.arrowMasteryPct = MASTERY_PCT[data.talents.arrowMastery];
        this.laserMasteryPct = MASTERY_PCT[data.talents.laserMastery];

        this.arrow = Math.floor(arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct));
        this.laser = Math.floor(laserBase * (1.0 + this.laserPct) * (1.0 + this.laserMasteryPct)) - Math.floor(data.power.laser / 2); // don't know why? it's "almost" correct
        this.statsLaserDamage = Math.floor(oldLaserBase * (1.0 + this.laserPct) * (1.0 + this.laserMasteryPct));
        this.finger = Math.floor(fingerBase * (1 + this.fingerPct));

        this.arrowCrit = Math.floor(arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct) * (1 + this.critDamage));
        this.laserCrit = Math.floor(laserBase * (1 + this.laserPct) * (1 + this.laserMasteryPct) * (1 + this.critDamage));

        this.superCrit = (data.talents.arrowMastery >= 1) ? (2.0 * this.arrowCrit) : 0.0;

        this.avgArrow = (this.superCritChance * this.superCrit) +
            ((1.0 - this.superCritChance) * this.critChance * this.arrowCrit) +
            ((1.0 - this.superCritChance) * (1.0 - this.critChance) * this.arrow);

        this.avgLaser = (this.critChance * this.laserCrit) +
            ((1.0 - this.critChance) * this.laser);

        this.laserArchers = LASER_ARCHERS[data.talents.laserMastery];

        this.baseArrowsSec = Math.round(300.0 / (12 - data.skills.arrowRoF)) / 10.0;

        this.arrowRoF = ((data.talents.arrowMastery >= 3) ? 1.1 : 1.0) * this.baseArrowsSec;

        this.arrowsPerSec = data.skills.archers * this.arrowRoF;
        this.laserTicksPerSec = data.skills.lasers * data.params.laserRoFv2;
        this.laserArcherTicksPerSec = data.params.laserRoFv2 * this.laserArchers;

        var x = Math.max(Math.min(data.skills.bounces, 5), 0);
        var y = Math.max(Math.min(data.skills.bounceDmg, 6), 0);
        var mult = StaticData.BOUNCE_TABLE[x][y];

        this.laserBounceMult = Math.round(mult * 100.0) / 100.0;

        this.arrowDps = data.skills.archers * this.avgArrow * this.arrowRoF;
        this.laserArcherBounceFactor = (data.talents.laserMastery >= 3) ? this.laserBounceMult : 1.0;

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
    }
}

const LASER_ARCHERS = [0, 1, 2, 4];
const MASTERY_PCT = [0.0, 0.08, 0.16, 0.25];

export class Data {
    level: number;
    skills: Skills;
    talents: Talents;
    stats: Stats;
    params: Parameters;
    power: PowerGems;
    attributes: any;

    constructor() {
        this.skills = new Skills();
        this.talents = new Talents();
        this.stats = new Stats();
        this.params = new Parameters();
        this.power = new PowerGems();
        this.attributes = {};

        for (var a of StaticData.ATTRIBUTES) {
            this.attributes[a] = 1;
        }

        this.update();
    }

    update() {
        this.talents.update();
        this.level = this.talents.getLevel();
        this.stats.update(this);
    }

    public static fromJSON(json: any): Data {
        if (typeof json === 'string') {
            return JSON.parse(json, Data.reviver);
        } else if (json !== undefined && json !== null) {
            let data = Object.create(Data.prototype);
            return Object.assign(data, json);
        } else {
            return json;
        }
    }

    public static reviver(key: string, value: any): any {
        return key === '' ? Data.fromJSON(value) : value;
    }

    public static copy(d: Data): Data {
        var data = new Data();

        data.level = d.level;

        for (var a of Object.keys(data)) {
            var x = data[a];
            var y = d[a];

            for (var b of Object.keys(x)) {
                x[b] = y[b];
            }
        }

        return data;
    }
}

export class Log {
    start: Data;
    levels: number;
    skills: number;
    best: Data;
    startTime: number;
    finishTime: number;
    elapsedTime: number;
    count: number;
}

const ARROW_ROF_COST = [300, 1000, 3000, 7000];
const ARCHER_COST = [300, 2000, 4000, 35000, 65000, 120000];

export class AttributeData {
    name: string;
    inc: number;
    value: number;
    dps: number;
    dpsPct: number;
    max: number;
    best: boolean;
    bestCoin: boolean;
    coins: number;
    dpsPerCoin: number;

    public getGemCost(i: number, data: Data): number {

        if (i < 0)
            return 0;

        if (this.name == "power.numRockets") {
            
            if (i < 9)
                return 1;
            else
                return 0;
        } else {
            return Math.floor(i / 3) + 1;
        }
    }

    public getCost(i: number, data: Data): number {
        if (this.name == "skills.finger") {
            return 100 * i;
        } else if (this.name == "skills.arrow") {

            if (i < 1)
                return 0;

            var c = 200;

            if (i > 1)
                c = 200 * (i * i + 1);

            if (data.talents.arrowMastery > 0) {
                c *= (1.0 - data.stats.arrowMasteryPct);
            }

            return c;
        } else if (this.name == "skills.laser") {

            if (i < 1)
                return 0;

            var c = 200 * ((i - 1) * (i - 1) + 20);

            if (data.talents.laserMastery > 0) {
                c *= (1.0 - data.stats.laserMasteryPct);
            }

            return c;
        } else if (this.name == "skills.missileDamage") {

            if (i == 0)
                return 100000;
            else
                return 25000 + ((i - 1) * (i - 1) * 5000);
        } else if (this.name == "skills.cannon") {

            if (i == 0)
                return 500000;
            else
                return 50000 + ((i - 1) * (i - 1) * 5000);
        } else if (this.name == "skills.bomb") {

            if (i == 0)
                return 750000;
            else
                return 100000 + ((i - 1) * (i - 1) * 5000);
        } else if (this.name == "skills.missileFiringRate") {

            return 50000 + (i * i * i * 50000);
        } else if (this.name == "skills.arrowRoF") {

            if ((i < 1) || (i > 4))
                return 0;
            else
                return ARROW_ROF_COST[i - 1];
        } else if (this.name == "skills.archers") {

            if ((i < 1) || (i > 6))
                return 0;
            else
                return ARCHER_COST[i - 1];
        } else if (this.name == "skills.lasers") {

            if (i == 0)
                return 12500;
            else if (i == 1)
                return 50000;
            else
                return 0;
        } else if (this.name == "skills.bounces") {

            if (i == 0)
                return 5000000;
            else if (i < 5)
                return 5000000 + (i * i * 5000000);
            else
                return 0;
        } else if (this.name == "skills.bounceDmg") {

            if (i == 0)
                return 0;
            else if (i < 6)
                return 2500000 + (i * i * 2500000);
            else
                return 0;
        } else if (this.name == "skills.numMissiles") {

            if (i == 0)
                return 100000;
            else
                return 0;
        }

        return 0;
    }

    public calculateCoinCost(data: Data): number {
        var value: number = 0;

        var n = this.inc;

        if (this.max) {
            var n = Math.min(n, this.max - this.value);
        }

        for (var i = 0; i < n; i++) {
            value += this.getCost(this.value + i, data);
        }

        return value;
    }

    public calculateGemCost(data: Data): number {
        var value: number = 0;

        var n = this.inc;

        if (this.max) {
            var n = Math.min(n, this.max - this.value);
        }

        for (var i = 0; i < n; i++) {
            value += this.getGemCost(this.value + i, data);
        }

        return value;
    }

    public calculate(data: Data) {
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
        } else {
            this.dps = Math.round(old * 10.0) / 10.0;
            this.dpsPct = 0;
        }

        if (this.name.startsWith("skills.")) {
            var cost = this.calculateCoinCost(data);

            if (cost > 0) {
                this.coins = cost;
                this.dpsPerCoin = Math.round(10000.0 * ((this.dps - old) / this.coins)) / 10.0;
            } else {
                this.coins = 0;
                this.dpsPerCoin = 0;
            }
        } else if (this.name.startsWith("power.")) {
            var cost = this.calculateGemCost(data);

            if (cost > 0) {
                this.coins = cost;
                this.dpsPerCoin = Math.round(10.0 * ((this.dps - old) / this.coins)) / 10.0;
            } else {
                this.coins = 0;
                this.dpsPerCoin = 0;
            }
        }
    }
}

