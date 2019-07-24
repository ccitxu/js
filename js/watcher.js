// 全局的变量，这个变量来控制是否当前有观察的数据
var Pubsub = {
        target: null
    }
    // 观察者定义
function Watcher(vm, node, name) {
    Pubsub.target = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    // 将数据观察时就要进行更新操作一次
    this.update();
    Pubsub.target = null;
}

Watcher.prototype = {
    // 将更新的数据渲染到页面中去
    update() {
        this.node.innerHTML = this.vm.data[this.name];
    }
}