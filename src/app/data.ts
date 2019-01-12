
export class Skills {
    arrow: number;
    laser: number;

    constructor() {
        this.arrow = 175;
        this.laser = 248;
    }
}

export class Talents {
    arrow: number;
    laser: number;
    critChance: number;
    critDamage: number;

    constructor() {
        this.arrow = 3;
        this.laser = 130;
        this.critChance = 4;
        this.critDamage = 1;
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
    critMult: number;
    arrow: number;
    laser: number;
    superCritChance: number;
    superCritMult: number;
    arrowMastery: number;
    laserMastery: number;
    arrowPct: number;
    laserPct: number;
    arrowMasteryPct: number;
    laserMasteryPct: number;
    arrowCrit: number;
    laserCrit: number;
    arrowSuperCrit: number;
    laserSuperCrit: number;
    superCrit: number;
    avgArrow: number;
    avgLaser: number;
    arrowRoF: number;
    laserRoF: number;
    laserArchers: number;
    arrowDps : number;
    laserDps: number;
    totalDps: number;
    arrowDpsPct: number;
    laserDpsPct: number;

    constructor() {

    }

    update(data: Data) {
        this.arrowBase = 23 + 7 * data.skills.arrow;
        this.laserBase = 12 + 3 * data.skills.laser;
        this.critChance = 0.01 * data.talents.critChance;
        this.critDamage = 0.50 + (data.talents.critDamage * 5) / 100.0;
        this.critMult = 1.0 + (this.critChance * this.critDamage);
        this.arrowMastery = Math.min(Math.floor(data.talents.arrow / 100), 3);
        this.laserMastery = Math.min(Math.floor(data.talents.laser / 100), 3);

        this.superCritChance = Math.round(this.arrowMastery * 10) / 100.0;
        this.arrowPct = Math.round(data.talents.arrow * 3) / 100.0;
        this.laserPct = Math.round(data.talents.laser * 3) / 100.0;

        this.arrowMasteryPct = Math.round(this.arrowMastery * 8) / 100.0;
        this.laserMasteryPct = Math.round(this.laserMastery * 8) / 100.0;

        this.arrow = this.arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct);
        this.laser = this.laserBase * (1 + this.laserPct) * (1 + this.laserMasteryPct);

        this.arrowCrit = this.arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct) * (1 + this.critDamage);
        this.laserCrit = this.laserBase * (1 + this.laserPct) * (1 + this.laserMasteryPct) * (1 + this.critDamage);

        this.superCrit = (data.talents.arrow >= 100) ? 2.0 : 0.0;
        this.superCritMult = 1.0 + (this.superCritChance * this.superCrit);

        this.arrowSuperCrit = (this.superCrit > 0) ? Math.round(this.arrowBase * (1 + this.arrowPct) * (1 + this.arrowMasteryPct) * (1 + this.superCrit)) : 0;
        this.laserSuperCrit = (this.superCrit > 0) ? Math.round(this.laserBase * (1 + this.laserPct) * (1 + this.laserMasteryPct) * (1 + this.superCrit)) : 0;

        this.avgArrow = this.arrow * this.critMult * this.superCritMult;
        this.avgLaser = this.laser * this.critMult * this.superCritMult;

        this.laserArchers = LASER_ARCHERS[this.laserMastery];
        this.arrowRoF = 7 * ((this.arrowMastery >= 3) ? 11 : 10);
        this.laserRoF = 15 * (2 + this.laserArchers);

        this.arrowDps = this.avgArrow * this.arrowRoF;
        this.laserDps = this.avgLaser * this.laserRoF;

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

    constructor() {
        this.skills = new Skills();
        this.talents = new Talents();
        this.stats = new Stats();

        this.update();
    }

    update() {
        this.talents.update();
        this.level = this.talents.getLevel();
        this.stats.update(this);
    }
}