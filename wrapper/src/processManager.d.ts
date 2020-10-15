export default class ProcessManager {
    binaryPath: string;
    protected processId: number | null;
    handle(): boolean;
    isRunning: (cb: any) => void;
}
