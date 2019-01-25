export class Parameters {
    arrowRoF: number;
    laserRoF: number;
    laserArcherMult: number;
    laserBounceMult: number;
    version: string;
    versionDate: string;

    constructor() {
        this.arrowRoF = Math.round(10.0 * 30.0 / 7.0 ) / 10.0;
        this.laserRoF = 30;
        this.laserArcherMult = 3;
        this.laserBounceMult = 1 + 0.5 + 0.25 + 0.125 + 0.0625;
        this.version = "v1.0.2";
        this.versionDate = "01/25/2019";
    }
}

export class Skills {
    arrow: number;
    laser: number;
    archers: number;
    missileDamage: number;
    missileFiringRate: number;
    numMissiles: number;

    constructor() {
        this.arrow = 1;
        this.laser = 1;
        this.archers = 7;
        this.numMissiles = 10;
        this.missileDamage = 1;
        this.missileFiringRate = 0;
    }
}

export class PowerGems {
    arrow: number;
    laser: number;
    missile: number;

    constructor() {
        this.arrow = 0;
        this.laser = 0;
        this.missile = 0;
    }
}

export class Talents {
    arrow: number;
    laser: number;
    critChance: number;
    critDamage: number;
    unspent: number;
    lock: boolean;

    constructor() {
        this.arrow = 0;
        this.laser = 0;
        this.critChance = 0;
        this.critDamage = 0;
        this.unspent = 0;
        this.lock = false;
    }

    getLevel() : number {
        return this.arrow + this.laser + this.critChance + this.critDamage + this.unspent + 1;
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
    missileBase: number;
    missileROF: number;
    missilesPerSec: number;
    missileDps: number;
    missileDpsPct: number;

    constructor() {

    }

    update(data: Data) {
        this.arrowBase = 16 + (14 + data.power.arrow) * data.skills.arrow - data.power.arrow;
        this.laserBase = Math.floor(12.0 + (3.0 + data.power.laser/4.0) * data.skills.laser) - Math.floor(data.power.laser / 4.0);
        this.missileBase = 500 + ((data.skills.missileDamage- 1 ) * Math.floor(data.skills.missileDamage / 2) * (75 + (data.power.missile * 10)));
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

        this.arrowMasteryPct = (this.arrowMastery == 0) ? 0.0 : ((this.arrowMastery) == 1 ? 0.08 : ((this.arrowMastery == 2) ? 0.16 : 0.25));
        this.laserMasteryPct = (this.laserMastery == 0) ? 0.0 : ((this.laserMastery) == 1 ? 0.08 : ((this.laserMastery == 2) ? 0.16 : 0.25));

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
        this.arrowRoF = Math.floor(((this.arrowMastery >= 3) ? 1.1 : 1.0) * data.params.arrowRoF);

        this.arrowsPerSec = data.skills.archers * this.arrowRoF;
        this.laserTicksPerSec = 2 * data.params.laserRoF;
        this.laserArcherTicksPerSec = data.params.laserRoF * this.laserArchers;

        this.arrowDps = data.skills.archers * this.avgArrow * this.arrowRoF;
        var laserArcherBounceFactor = (this.laserMastery >= 3) ? data.params.laserBounceMult : 1.0;

        this.laserDps = (this.avgLaser * this.laserTicksPerSec * data.params.laserBounceMult) + (this.avgLaser * data.params.laserArcherMult * this.laserArcherTicksPerSec * laserArcherBounceFactor);

        this.totalDps = this.arrowDps + this.laserDps + this.missileDps;
        this.arrowDpsPct = this.arrowDps / this.totalDps;
        this.laserDpsPct = this.laserDps / this.totalDps;
        this.missileDpsPct = this.missileDps / this.totalDps;
    }
}

const LASER_ARCHERS = [ 0, 1, 2, 4];

export class Data {
    level: number;
    skills: Skills;
    talents : Talents;
    stats : Stats;
    params: Parameters;
    power: PowerGems;
    
    constructor() {
        this.skills = new Skills();
        this.talents = new Talents();
        this.stats = new Stats();
        this.params = new Parameters();
        this.power = new PowerGems();

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