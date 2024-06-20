declare class WorkerManagerClass {
    worker: Worker;
    private _resolveHash;
    private readonly _workerPool;
    private readonly _queue;
    private _initialized;
    private _createdWorkers;
    private _isImageBitmapSupported?;
    constructor();
    isImageBitmapSupported(): Promise<boolean>;
    loadImageBitmap(src: string): Promise<ImageBitmap>;
    private _initWorkers;
    private _getWorker;
    private _returnWorker;
    private _complete;
    private _run;
    private _next;
}
declare const WorkerManager: WorkerManagerClass;
export { WorkerManager, };
