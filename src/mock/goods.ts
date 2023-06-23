import Mock from 'mockjs';

const {Random} = Mock;


Mock.mock('http://localhost:8080/goods', 'get', {
    code: 200,
    message: '操作成功',
    data: {
        'goods|12': [
            {
                'id|+1': 1,
                'name|+1':'@pick(["纯棉T恤","运动鞋","时尚手表","迷你音响","智能手机","户外背包","健身器材","防水手表","高清投影仪","美容面膜","电动牙刷","无线耳机","时尚太阳镜","智能手环","便携充电宝","家用空气净化器","多功能搅拌机","高颜值耳麦","舒适沙发","迷你冰箱",])',
                'image': Random.image('200x200', '#50B347', '#FFF', 'Hello, Mock.js!'),
                'price|10-100': 1,
                'stock|1-100': 1,
            }
        ],
    }
});