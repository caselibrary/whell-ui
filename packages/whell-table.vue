<template>
  <div class="whell-table">
    <!-- <div class="whell-table-header">

    </div>
    <div class="whell-table-content">
      <VirtualScroll :data="tableData">
        <template slot-scope="scope">
          {{scope.data.date}}
        </template>
      </VirtualScroll>
    </div> -->

  </div>
</template>
<script>
import VirtualScroll from './virtual-scroll.vue';
export default {
  name: 'WhellTable',
  components: {
    VirtualScroll
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    'showCheckbox': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    // 更新视图
    updateView() {
      // const allVisibleData = (this.flattenTree || []).filter(
      //   item => item.visible
      // );
      // console.log('tree组件-更新视图---触发虚拟滚动重计算')
      // this.tableData = allVisibleData
      this.tableData = this.data
    }
  },
  mounted() {
    this.updateView()
  }
}
</script>

<style scoped lang="less">
.whell-table {
  border: 1px;
}
</style>

