/**
 * 执行器最小执行任务单元
 */
type UranusTask = () => void | Promise<void>

/**
 * 执行器
 */
export class UranusExeculator {
    private _intervalId: number = 0
    private _tasks: Set<UranusTask> = new Set()
    private _running: boolean = false
    private _count: number = 0
    private _laters: Set<() => void> = new Set()

    /**
     * 执行器构造函数
     * @param interval 执行间隔,单位毫秒
     */
    constructor(public interval: number) { }

    /**
     * 执行任务
     * @param max 执行次数
     */
    public do(options?: { max?: number, fn?: UranusTask }) {
        //重置一些状态量
        this._count = 0

        //如果已经在执行。。
        if (this._running) return

        //TODO 这里之后可以改成 requestAnimationFrame 这个API
        this._intervalId = setInterval(async () => {

            //判断执行次数是否到达最大值
            if (options?.max && this._count === options.max) {
                return clearInterval(this._intervalId)
            }

            //判断是否有later需要执行,执行完laters清空
            this._laters.forEach((later) => later())
            this._laters.clear()

            //将running设置为true
            this._running = true

            //遍历任务队列执行任务
            if (options?.fn) {
                options.fn()
            } else {
                for (const task of this._tasks) {
                    await task()
                }
            }


            //执行完任务running设置为false
            this._running = false

        }, this.interval)
    }

    /**
     * 暂停
     */
    public pause() {
        clearInterval(this._intervalId)
    }

    /**
     * 结束任务
     */
    public over() {
        clearInterval(this._intervalId)
    }

    /**
     * 添加任务
     * @param task 执行任务
     */
    public add(task: UranusTask) {
        this._laters.add(() => this._tasks.add(task))
    }

    /**
     * 清空所有注册的任务
     */
    public clear() {
        this._tasks.clear()
    }

}
