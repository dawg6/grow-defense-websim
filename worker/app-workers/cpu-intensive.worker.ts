import { WorkerMessage } from './shared/worker-message.model';
import { Data, Log } from '../../src/app/data';

export class CPUIntensiveWorker {

    public static doWork(value: WorkerMessage): WorkerMessage {
        // console.log("doWork", value);
        CPUIntensiveWorker.simulate(value.data);

        return new WorkerMessage(value.topic, value.data);
    }

    static simulate(l: Log) {

        var points = l.levels - 1;

        var max: Data = new Data();
        var r: Data = new Data();
        max.skills = l.start.skills;
        max.params = l.start.params;
        max.update();
        r.skills = l.start.skills;
        r.params = l.start.params;

        var arrowMin = 0;
        var laserMin = 0;

        if (!l.start.talents.lock) {
            if (l.which == 1) {
                arrowMin = l.levels > 100 ? 100 : 0;
            } else if (l.which == 2) {
                laserMin = l.levels > 100 ? 100 : 0;
            }
        }


        for (var arrow: number = arrowMin; arrow <= points; arrow++) {
            var m = points - arrow;

            for (var laser: number = laserMin; laser <= m; laser++) {

                var n = Math.min(points - (arrow + laser), 100 - l.start.talents.critChance);

                for (var cc: number = 0; cc <= n; cc++) {

                    var cd: number = points - (arrow + laser + cc);

                    r.talents.arrow = arrow + l.start.talents.arrow;
                    r.talents.laser = laser + l.start.talents.laser;
                    r.talents.critChance = cc + l.start.talents.critChance;
                    r.talents.critDamage = cd + l.start.talents.critDamage;

                    r.update();

                    if (r.stats.totalDps > max.stats.totalDps) {
                        // console.log("arrow", arrow, "laser", laser, "cc", cc, "cd", cd, "dps", r.stats.totalDps);
                        max.talents.arrow = r.talents.arrow;
                        max.talents.laser = r.talents.laser;
                        max.talents.critChance = r.talents.critChance;
                        max.talents.critDamage = r.talents.critDamage;
                        max.stats.totalDps = r.stats.totalDps;
                    }
                }
            }
        }

        l.best = max;
    }

}