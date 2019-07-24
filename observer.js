// 定义一个pubsub,这个作用是将所有的观察者加入其中，
// 并且出发事件
function pubsub() {
    this.subs = [];
}

pubsub.prototype = {
    // 将需要观察的数据加入subs中
    addSub: function(sub) {
        this.subs.push(sub);
    },
    // 执行观察的数据上绑定的事件update事件。
    pub: function() {
        console.log(this.subs);
        this.subs.forEach(function(sub) {
            sub.update();
        })
    }
}

// 将数据都进行监听
function active(obj, key, val) {
    var pubsub1 = new pubsub();
    Object.defineProperty(obj.data, key, {
        // getter，如果获取数据时，会判断是有需要观察的数据，如果有就添加到subs中，没有不添加
        // Pubsub是一个全局的变量，这个变量必须是全局才能判断是有需要观察的数据
        get() {
            if (Pubsub.target) {
                // 添加订阅
                pubsub1.addSub(Pubsub.target);
            }
            return val;
        },
        set(newVal) {
            // 如果数据被setter，那么就涉及到及时的更新数据，
            // 这时只需要进行发布事件，观察的数据就会执行update函数来执行更新操作
            if (val == newVal) {
                return;
            }
            val = newVal;

            // 发布
            pubsub1.pub();
        }
    })
}

// 监听data中所有的数据
function observer(obj, vm) {
    // obj = data
    // vm  = 实例对象
    for (var key in obj) {
        active(vm, key, obj[key]);
    }
}