<template>
  <div class="virtual-scroll list-view scrollBar" @scroll="handleScroll" :style="{height:viewHeight + 'px'}">
    <div class="list-view-empty" :style="{height: contentHeight}"></div>
    <div class="list-view-content" :style="`transform: translate3d(0, ${contentTopDistance}px, 0)`">
      <div class="list-view-item" :style="{height: itemHeight + 'px',lineHeight: itemHeight + 'px'}" v-for="(item,index) in visibleData" :key="index">
        <slot :data="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualScroll',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    viewHeight: {
      type: Number,
      default: 220
    },
    itemHeight: {
      type: Number,
      default: 32
    }
  },
  data() {
    return {
      visibleData: [],
      visibleCount: 0,
      contentTopDistance: 0
    }
  },
  computed: {
    contentHeight() {
      // if (this.data.length) {
      this.handleScroll()
      // }
      return this.data.length * this.itemHeight + 'px'
    }
  },
  methods: {
    updateVisibleData(scrollTop = 0) {
      console.log('触发更新---重新计算')
      const start = Math.floor((scrollTop / this.itemHeight))
      // 可见区域内最后一个 item 的 index
      const end = start + this.visibleCount + 2
      // 可见区域的 列表
      this.visibleData = this.data.slice(start, end)
      // console.log(start, this.itemHeight)
      this.contentTopDistance = start * this.itemHeight
      // console.log(this.contentTopDistance)
    },
    handleScroll() {

      const scrollTop = this.$el ? this.$el.scrollTop : 0
      this.updateVisibleData(scrollTop)
    }
  },
  mounted() {
    // 可见区域内列表数量
    this.visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight)
    // 可见区域内第一个 item 的 index

  }
}
</script>

<style lang="less" scoped>
.list-view {
  overflow: auto;
  position: relative;
  border: 1px solid #ddd;
  * {
    box-sizing: border-box;
  }
  .list-view-empty {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
  .list-view-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .list-view-item {
    cursor: pointer;
    &:hover {
      background: #f5f7fa;
    }
  }
}
.scrollBar {
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e3e6eb;
    border-radius: 2px;
  }
}
</style>

