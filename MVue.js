class Compile{
    constructor(el, vm){
        this.el = this.isElementNode(el)? el : document.querySelector(el)
        this.vm = vm
        // 获取文档碎片对象 放入内存中会减少页面的回流和重绘
        const fragment = this.node2Fragment(this.el)
        // 编译模板
        this.compile(fragment)
        // 追加子元素到根元素
        this.el.appendChild(fragment)
    }
    // <div id="app">
    //     <h2>{{person.name}}  ---{{person.name}}</h2>
    //     <h3>{{person.fav}}</h3>
    //     <ul>
    //         <li>1</li>
    //         <li>2</li>
    //         <li>3</li>
    //     </ul>
    //     <h3>
    //         {{msg}}
    //     </h3>
    //     <div v-text="msg"></div>
    //     <div v-html="htmlStr"></div>
    //     <div v-html="htmlStr"></div>
    //     <input type="text" v-model="msg">
    // </div>
    compile(fragment) {
        // 获取子节点
        const childNodes = fragment.childNodes
        // [...childNodes].forEach(child=>{
        //     console.log(child)
        // })
        childNodes.forEach(child => {
            if(this.isElementNode(child)) {
                // 是元素节点
                // 编译元素节点
                this.compileElement(child)
            } else {
                // 是文本节点
                // 编译文本节点
                this.compileText(child)
            }
            if(child.childNodes && child.childNodes.length){
                this.compile(child)
            }
        })
    }
    compileElement(node) {
        const attributes = node.attributes
        console.log(attributes,666666666666666666666)
        // [...attributes].forEach(element => {
            
        // });
        // attributes.forEach(attr=> {
        //     console.log(attr)
        // })
        // attributes.forEach((attr)=>{
        //     console.log(attr)
        // })
        // attributes.forEach((arrayValue,arrayIndex) => {
        //     console.log(arrayValue)
        // })
    }
    compileText(node) {}
    node2Fragment(el) {
        // 创建文档碎片
        const f = document.createDocumentFragment()
        let firstChild
        while(firstChild = el.firstChild) {
            f.appendChild(firstChild)
        }
        return f
    }
    isElementNode(node){
        return node.nodeType ===1
    }
}
class MVue{
    constructor(options){
        this.$el = options.el
        this.$data = options.data
        this.$options = options.options
        if(this.$el) {
            // 实现一个数据的观察者
            // 实现一个指令的解析器
            new Compile(this.$el, this)
        }
    }
}