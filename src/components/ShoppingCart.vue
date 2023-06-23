<template>
    <el-drawer :model-value="show" direction="rtl" :size="700" @close="emit('close')" class="shopping-cart">
        <template #header>
            <h4>购物车</h4>
        </template>
        <template #default>
            <el-table
                    ref="tableRef"
                    :data="items"
                    style="width: 100%"
                    @selection-change="(val) => {selectedIndex = val.map(item => item.id)}"
            >
                <el-table-column type="selection" width="55"/>
                <el-table-column width="120">
                    <template #default="scope">
                        <el-image :src="scope.row.image"/>
                    </template>
                </el-table-column>
                <el-table-column property="name" label="商品" width="120" show-overflow-tooltip/>
                <el-table-column label="单价">
                    <template #default="scope">
                        <p style="color: #ec5e2a; "><em>￥</em>{{ scope.row.price }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="数量" width="150">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.count" :min="1" :max="scope.row.stock" size="small"/>
                    </template>
                </el-table-column>
                <el-table-column label="小计">
                    <template #default="scope">
                        <p style="color: #333333; "><em>￥</em>{{ scope.row.price * scope.row.count }}</p>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template #footer>
            <div style="display: flex">
                <div>
                    <el-button text @click="removeItem">
                        移除选中的商品
                    </el-button>
                </div>
                <div style="flex-grow: 1"/>
                <div style="margin-right: 15px">
                    <span style="color: #d0392a; ">{{ items.length }}</span> 件商品 总价: <span style="color: #d0392a; ">￥{{ total }}</span>
                </div>
                <div>
                    <el-button type="primary" :loading="loading" @click="loading = true">{{ loading ? '结算中':'结算'}}</el-button>
                </div>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import {ElMessage} from "element-plus";
import {computed, ref} from "vue";

interface GoodsItem {
    id: number;
    image: string;
    name: string;
    price: number;
    stock: number;
    count: number;
}

const props = defineProps<{
    show: boolean;
    items: GoodsItem[]
}>()

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'editItemCount', goodsId: number, cnt: number): void;
    (e: 'removeCartItem', itemId:number[])
}>()


const tableRef = ref(null);
const selectedIndex = ref([]);
const loading = ref<boolean>(false);
const total = computed(()=>{
    let result = 0;
    props.items.forEach(item => {
        result += (item.count * item.price);
    })
    return result;
})


const removeItem = ()=>{
    if (selectedIndex.value.length === 0){
        ElMessage.error("请至少选中一件商品！")
        return;
    }
    emit('removeCartItem', selectedIndex.value);
    ElMessage.success("移除成功！");
}
</script>

<style>
.shopping-cart .el-drawer__header {
    margin-bottom: 0 !important;
    border: 1px solid #f0f0f0;
}

.shopping-cart .el-drawer__footer {
    border: 1px solid #f0f0f0;
}
</style>