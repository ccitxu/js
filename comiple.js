// 获取到所有节点，并且进行翻译
function getAllNode(node, vm) {
    console.log(vm);
    var length = node.childNodes.length;
    for (var i = 0; i < length; i++) {
        compile(node.childNodes[i], vm)
    }
}

// 翻译
function compile(node, vm) {
    // 匹配到{{}},将其中的值进行观察。
    var reg = /\{\{(.*)\}\}/;
    // 如果节点存在并且节点类型为1时（查看一下为1时一般都是什么节点）
    if (node != undefined && node.nodeType == 1) {
        // 获取到节点的属性
        var attr = node.attributes;
        if (attr.length) {
            // 对节点的属性循环处理
            for (var i = 0; i < attr.length; i++) {
                // 如果为v-model时，进行处理
                if (attr[i].nodeName == "v-model") {
                    // 获取到v-model里面的写的变量名
                    var name = attr[i].nodeValue;
                    // 给该input增加事件处理，如果内容改变，并及时更新data中的数据
                    node.addEventListener('input', function(e) {
                        vm.data[name] = e.target.value;
                    })

                    // 修改dom上的数据，并移除指令
                    console.log(vm.data[name]);
                    node.value = vm.data[name];
                    node.removeAttribute('v-model')
                }
            }
        } else {
            // 匹配到{{}}的dom节点
            if (reg.test(node.outerText)) {
                var name = RegExp.$1;
                // 拿到变量的名称
                name = name.trim();

                // 将变量加入到watcher中
                new Watcher(vm, node, name)
            }
        }
    }
}