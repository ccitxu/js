// 这个文件为入口文件，也就是Vue的构造函数
function Vue(options) {
    // 传递过来的对象
    this.data = options.data;
    this.id = options.el;
    // 1.第一步先将data中所有的数据进行监听
    //   这个函数一般使用递归的方式完成所有属性的监听
    observer(this.data, this);

    // 2.第二步将所有DOM节点的翻译出来，也就是说将v-model，
    //  {{}}等翻译成你想要的数据。其次还有将v-model的数据进行监听，使用观察者模式，完成双向绑定
    getAllNode(document.getElementById(this.id), this);
}