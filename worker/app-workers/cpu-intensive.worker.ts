import { WorkerMessage } from './shared/worker-message.model';
import { Talents, AttributeData, Data, Log } from '../../src/app/data';

export class CPUIntensiveWorker {

    public static doWork(value: WorkerMessage): WorkerMessage {
        // console.log("doWork", value);
        CPUIntensiveWorker.simulate(value.data);

        return new WorkerMessage(value.topic, value.data);
    }

    static simulate(l: Log) {
        if (l.levels > 0)
            CPUIntensiveWorker.simulateLevels(l);
        else if (l.gems > 0)
            CPUIntensiveWorker.simulateGems(l);
    }

    static simulateGems(l: Log) {
        // console.log("log", l);
        l.startTime = new Date().getTime();
        var count = 0;
        var max: Data = new Data();
        max.skills = l.start.skills;
        max.params = l.start.params;
        
        for (var a of Object.keys(l.start.talents))
            max.talents[a] = l.start.talents[a];

        for (var a of Object.keys(l.start.power))
            max.power[a] = l.start.power[a];

        max.update();
        var r: Data = new Data();
        r.skills = l.start.skills;
        r.params = l.start.params;

        for (var a of Object.keys(l.start.talents))
            r.talents[a] = l.start.talents[a];

        var levels = [l.start.power.arrow, l.start.power.laser, l.start.power.missile, l.start.power.numRockets];
        var names = ["power.arrow", "power.laser", "power.missle", "power.numRockets"];
        var nextCost = [0, 0, 0, 0];
        var totalCost = [0, 0, 0, 0];

        var done:boolean = false;

        do {
            var g1 = l.gems - totalCost[0];
            r.power.arrow = levels[0];

            levels[1] = l.start.power.laser;
            totalCost[1] = 0;

            do {
                var g2 = g1 - totalCost[1];
                r.power.laser = levels[1];

                levels[2] = l.start.power.missile;
                totalCost[2] = 0;

                do {
                    var g3 = g2 - totalCost[2];
                    r.power.missile = levels[2];

                    levels[3] = l.start.power.numRockets;
                    totalCost[3] = 0;
                    nextCost[3] = AttributeData.getGemLevelCost(names[3], levels[3]);

                    while ((levels[3] < 9) && ((totalCost[3] + nextCost[3]) <= g3)) {

                        nextCost[3] = AttributeData.getGemLevelCost(names[3], levels[3]);
                        levels[3]++;
                        totalCost[3] += nextCost[3];

                    } while ((levels[3] < 9) && ((totalCost[3] + nextCost[3]) <= g3));


                    r.power.numRockets = levels[3];
                    r.update();
                    count++;

                    // console.log("r", totalCost, levels, r.stats.totalDps);

                    if (r.stats.totalDps > max.stats.totalDps) {
                        max.power.arrow = r.power.arrow;
                        max.power.laser = r.power.laser;
                        max.power.missile = r.power.missile;
                        max.power.numRockets = r.power.numRockets;
                        max.stats.totalDps = r.stats.totalDps;
                    }


                    nextCost[2] = AttributeData.getGemLevelCost(names[2], levels[2]);
                    levels[2]++;
                    totalCost[2] += nextCost[2];

                } while (totalCost[2] <= g2);

                nextCost[1] = AttributeData.getGemLevelCost(names[1], levels[1]);
                levels[1]++;
                totalCost[1] += nextCost[1];

            } while (totalCost[1] <= g1);

            nextCost[0] = AttributeData.getGemLevelCost(names[0], levels[0]);
            levels[0]++;
            totalCost[0] += nextCost[0];

        } while (totalCost[0] <= l.gems);

        l.best = max;

        l.finishTime = new Date().getTime();
        l.elapsedTime = l.finishTime - l.startTime;
        l.count = count;
    }

    static simulateLevels(l: Log) {

        l.startTime = new Date().getTime();

        var points = l.levels;
        var count = 0;
        var max: Data = new Data();
        var r: Data = new Data();
        max.skills = l.start.skills;
        max.params = l.start.params;
        max.power = l.start.power;
        max.update();
        r.skills = l.start.skills;
        r.params = l.start.params;
        r.power = l.start.power;

        for (var arrow: number = 0; arrow <= points; arrow++) {
            var m = points - arrow;

            for (var laser: number = 0; laser <= m; laser++) {

                var n = Math.min(points - (arrow + laser), 100 - l.start.talents.critChance);

                var mt = Math.floor((laser + l.start.talents.laser) / 100) + Math.floor((arrow + l.start.talents.arrow) / 100) -
                    (l.start.talents.arrowMastery + l.start.talents.laserMastery);

                if ((laser + l.start.talents.laser) > (arrow + l.start.talents.arrow)) {
                    r.talents.laserMastery = Math.min(3, l.start.talents.laserMastery + mt);
                    r.talents.arrowMastery = Math.min(3, l.start.talents.arrowMastery + (mt - (r.talents.laserMastery - l.start.talents.laserMastery)));
                } else {
                    r.talents.arrowMastery = Math.min(3, l.start.talents.arrowMastery + mt);
                    r.talents.laserMastery = Math.min(3, l.start.talents.laserMastery + (mt - (r.talents.arrowMastery - l.start.talents.laserMastery)));
                }

                for (var cc: number = 0; cc <= n; cc++) {

                    var o = (points >= 100) ? 0 : (points - (arrow + laser + cc));

                    for (var finger: number = 0; finger <= o; finger++) {

                        var cd: number = points - (arrow + laser + cc + finger);

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
                            max.talents.arrowMastery = r.talents.arrowMastery;
                            max.talents.laserMastery = r.talents.laserMastery;
                        }
                    }
                }
            }
        }

        max.talents.defense = l.start.talents.defense;

        l.best = max;

        l.finishTime = new Date().getTime();
        l.elapsedTime = l.finishTime - l.startTime;
        l.count = count;
    }

}