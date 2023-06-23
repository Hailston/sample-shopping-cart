<template>
    <div style="max-width: 1200px; margin: auto">
        <el-row justify="space-evenly" class="goods-container">
            <el-col
                    v-for="(item, o) in goodsList"
                    :key="o"
                    :span="5"
            >
                <el-card :body-style="{ padding: '0px' }" class="goods-item">
                    <img
                            :src="item.image"
                            class="image"
                    />
                    <div style="padding: 14px">
                        <span>{{ item.name }}</span>
                        <div class="bottom">
                            <div class="info">
                                <p class="price">价格：<em>￥</em>{{ item.price }}</p>
                                <p class="stock">库存：{{ item.stock }}</p>
                            </div>
                            <el-button :icon="ShoppingOutlined" round @click="emit('addShoppingCart', item.id)">
                                加入购物车
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {
    ShoppingOutlined
} from "@ant-design/icons-vue";

interface Goods {
    id: number
    name: string;
    image: string;
    price: number;
    stock: number;
}

const props = defineProps<{
    goodsList: Goods[]
}>()

const emit = defineEmits<{
    (e: 'addShoppingCart', goodsId: number): void;
}>();

</script>

<style scoped>
.info {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.image {
    width: 100%;
    display: block;
}

.el-col {
    margin-top: 20px;
}

.price {
    font-size: 15px;
    color: #e4393c;
}

.stock {

}

.goodsItem {
    min-width: 250px;
}

.goods-container {
    min-width: 1200px;
}
</style>