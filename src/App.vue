<script setup lang="ts">
import axios from './axios.ts'
import GoodsList from "./components/GoodsList.vue";
import {
    ShoppingCartOutlined,
} from '@ant-design/icons-vue'
import {ref} from 'vue';
import ShoppingCart from "./components/ShoppingCart.vue";
import {ElMessage} from "element-plus";

const goodsList = ref([]);
const cartShow = ref(false);
const cartItems = ref([]);

// 发送网络请求商品数据
(async () => {
    const {data: res} = await axios.get('/goods')
    goodsList.value.splice(0, 0, ...res.data.goods);
})()
/**
 * 将商品添加到购物车中
 * @param goodsId
 */
const addShoppingCart = (goodsId: number) => {
    const goods = cartItems.value.find(item => item.id === goodsId);
    // 判断当前商品是否已经在购物车
    if (goods === undefined) {
        // 不存在则将商品添加到购物车中
        cartItems.value.push({
            ...goodsList.value.find(item => item.id === goodsId),
            count: 1
        })
    } else {
        // 已经存在则在原来的数量上 +1
        editCountOfCartItem(goodsId, goods.count + 1)
    }

}
/**
 * 修改购物车内商品 id 为 goodsId 的商品数量
 * @param goodsId
 * @param cnt
 */
const editCountOfCartItem = (goodsId: number, cnt: number) => {

    const item = cartItems.value.find(item => item.id === goodsId);
    // 如果库存足够则修改否则修改失败
    if (cnt > item.stock){
        ElMessage.error("库存不足");
        return;
    }
    item.count = cnt;
}

const removeCartItems = (itemId: number[]) =>{
    cartItems.value = cartItems.value.filter(item => itemId.indexOf(item.id) === -1)
}
</script>

<template>
    <div>
        <el-header>
            <el-affix>
                <el-menu
                    mode="horizontal"
                    :ellipsis="false"
                >
                    <div class="flex-grow"/>
                    <el-menu-item index="1" @click="cartShow = true">

                        <el-badge :value="cartItems.length" class="shoppingCart">
                            购物车
                            <el-icon>
                                <ShoppingCartOutlined/>
                            </el-icon>
                        </el-badge>
                    </el-menu-item>
                </el-menu>
            </el-affix>
        </el-header>
        <el-container>
            <el-main>
                <goods-list :goods-list="goodsList" @add-shopping-cart="addShoppingCart"/>
            </el-main>
        </el-container>
        <shopping-cart :show="cartShow" :items="cartItems" @remove-cart-item="removeCartItems" @close="cartShow = false"/>
    </div>
</template>

<style>
.flex-grow {
    flex-grow: 1;
}

.shoppingCart sup {
    top: 18px !important;
}
</style>
