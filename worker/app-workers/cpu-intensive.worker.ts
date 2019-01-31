import { WorkerMessage } from './shared/worker-message.model';
import { Data, Log } from '../../src/app/data';

export class CPUIntensiveWorker {

    public static doWork(value: WorkerMessage): WorkerMessage {
        // console.log("doWork", value);
        CPUIntensiveWorker.simulate(value.data);

        return new WorkerMessage(value.topic, value.data);
    }

    static simulate(l: Log) {

        l.startTime = new Date().getTime();

        var points = l.levels;
        var count = 0;
        var max: Data = new Data();
        var r: Data = new Data();
        max.skills = l.start.skills;
        max.params = l.start.params;
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