import { Uranus } from "."

interface UranusNodeConfig {
}

const _defaultConfig: UranusNodeConfig = {

}



export class UranusNode {
    public app: Uranus //需要持有对Uranus实例的引用
    public parent: UranusNode | null = null
    public children: UranusNode[] = []
    constructor(app: Uranus, config: UranusNodeConfig = _defaultConfig) {
        this.app = app
    }
    public appendChild(node: UranusNode) {
        this.children.push(node)
        node.parent = this
    }
    public onUpdate: (() => void) | null = null
}