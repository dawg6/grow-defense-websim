export class Parameters {
    archerRoF: number;
    laserRoF: number;
    laserArcherMult: number;
    laserBounceFactor: number;

    constructor() {
        this.archerRoF = 10;
        this.laserRoF = 30;
        this.laserArcherMult = 3;
        this.laserBounceFactor = 1.8;
    }
}

export class Skills {
    arrow: number;
    laser: number;
    archers: number;

    constructor() {
        this.arrow = 0;
        this.laser = 0;
        this.archers = 7;
    }
}

export class Talents {
    arrow: number;
    laser: number;
    critChance: number;
    critDamage: number;

    constructor() {
        this.arrow = 0;
        this.laser = 0;
        this.critChance = 0;
        this.critDamage = 0;
    }

    getLevel() : number {
        return this.arrow + this.laser + this.critChance + this.critDamage + 1;
    }

    update() {
        this.arrow = Math.max(this.arrow, 0);
        this.laser = Math.max(this.laser, 0);
        this.critChance = Math.max(this.critChance, 0);
        this.critChance = Math.min(this.critChance, 100);
        this.critDamage = Math.max(this.critDamage, 0);
    }
}

export class Stats {
    arrowBase: number;
    laserBase: number;
    critChance: number;
    critDamage: number;
    arrow: number;
    laser: number;
    superCritChance: number;
    arrowMastery: number;
    laserMastery: number;
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
    arrowDps : number;
    laserDps: number;
    totalDps: number;
    arrowsPerSec: number;
    laserTicksPerSec: number;
    laserArcherTicksPerSec: number;
    arrowDpsPct: number;
    laserDpsPct: number;

    constructor() {

    }

    update(data: Data) {
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

        this.avgArrow =  (this.superCritChance * this.superCrit) +
                ((1.0 - this.superCritChance)  * this.critChance * this.arrowCrit) +
                ((1.0 - this.superCritChance) * (1.0 - this.critChance) * this.arrow );
        
        this.avgLaser = (this.critChance * this.laserCrit) +
            ((1.0 - this.critChance) * this.laser);  

        this.laserArchers = LASER_ARCHERS[this.laserMastery];
        this.arrowRoF = Math.floor(((this.arrowMastery >= 3) ? 1.1 : 1.0) * data.params.archerRoF);

        this.arrowsPerSec = data.skills.archers * this.arrowRoF;
        this.laserTicksPerSec = 2 * data.params.laserRoF;
        this.laserArcherTicksPerSec = data.params.laserRoF * this.laserArchers;

        this.arrowDps = data.skills.archers * this.avgArrow * this.arrowRoF;
        var laserArcherBounceFactor = (this.laserMastery >= 3) ? data.params.laserBounceFactor : 1.0;

        this.laserDps = (this.avgLaser * this.laserTicksPerSec * data.params.laserBounceFactor) + (this.avgLaser * this.laserArcherTicksPerSec * laserArcherBounceFactor);

        this.totalDps = this.arrowDps + this.laserDps;
        this.arrowDpsPct = this.arrowDps / this.totalDps;
        this.laserDpsPct = this.laserDps / this.totalDps;
    }
}

const LASER_ARCHERS = [ 0, 1, 2, 4];

export class Data {
    level: number;
    skills: Skills;
    talents : Talents;
    stats : Stats;
    params: Parameters;

    constructor() {
        this.skills = new Skills();
        this.talents = new Talents();
        this.stats = new Stats();
        this.params = new Parameters();

        this.update();
    }

    update() {
        this.talents.update();
        this.level = this.talents.getLevel();
        this.stats.update(this);
    }
}

export class Log {
    start: Data;
    levels: number;
    skills: number;
    best: Data;
    which: number;
}