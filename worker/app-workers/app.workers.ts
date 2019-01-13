import { CPUIntensiveWorker } from './cpu-intensive.worker';
import { WorkerMessage } from './shared/worker-message.model';
import { WORKER_TOPIC } from './shared/worker-topic.constants';

export class AppWorkers {
    workerCtx: any;
    created: Date;

    constructor(workerCtx: any) {
        this.workerCtx = workerCtx;
        this.created = new Date();
    }

    workerBroker($event: MessageEvent): void {
        const { topic, data: log } = $event.data as WorkerMessage;

        // console.log("topic", topic, "log", log);
        const workerMessage = new WorkerMessage(topic, log);

        switch (topic) {
            case WORKER_TOPIC.cpuIntensive:
                this.workerCPUIntensive(workerMessage);
                break;
            default:  // Add support for more workers here
                console.error('Topic Does Not Match');
        }
    }

    workerCPUIntensive(value: WorkerMessage): void {
        this.returnWorkResults(CPUIntensiveWorker.doWork(value));
    }

    /**
     * Posts results back through to the worker
     * @param {WorkerMessage} message
     */
    private returnWorkResults(message: WorkerMessage): void {
        // console.log("result", message);
        this.workerCtx.postMessage(message);
    }

}