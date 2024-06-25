import { UranusDrawer } from './drawer'
import { UranusExeculator } from './execulator'
import { UranusNode } from './node'

interface UranusConfig { }
const _defaultConfig: UranusConfig = {}

/**
 * Uranus引擎
 */
export class Uranus {
    /**
     * canvas元素的引用
     */
    private _canvas: HTMLCanvasElement = document.createElement('canvas')

    /**
     * 执行器
     */
    private _execulator: UranusExeculator = new UranusExeculator(100)

    /**
     * 绘制引擎
     */
    private _drawer: UranusDrawer = new UranusDrawer()

    /**
     * 节点树
     */
    private _root: UranusNode = new UranusNode(this)

    /**
     * 构造函数
     * @param config 配置对象
     */
    constructor(config: UranusConfig = _defaultConfig) { }

    /**
     * canvas需要挂载的元素
     * @param el dom元素
     */
    public mount(el: HTMLElement) {
        el.appendChild(this._canvas)
    }

    /**
     * 启动引擎(启动各个模块)
     */
    public run() {
        this._execulator.do({
            fn: () => {
                this._root.onUpdate?.()
            },
        })
    }

    /**
     * 停止引擎
     */
    public stop() {
        this._execulator.pause()
    }
}