<template>
  <div class="whell-popur">
    <!-- <ul v-for="(item,index) in pupurData" :key="index">
      <li>
        <VirtualScroll :data="pupurData">
          <template slot-scope="scope">
            <div @click="handleClose">
              <slot :data="scope.data"></slot>
            </div>
          </template>
        </VirtualScroll>
        <div class="children">
          <whell-popur :data="item.children" v-if="item.expand && item.children && item.children.length>0">
            <template slot-scope="scope">
              <div>
                <template v-if="!$slots.default">{{scope.data.label}}</template>
                <slot :data="scope.data"></slot>
              </div>
            </template>
          </whell-popur>
        </div>
      </li>
    </ul> -->

    <!-- <div class="popurBox"> -->
    <VirtualScroll :data="data">
      <template slot-scope="scope">
        <div @click="handleClose">
          <template v-if="$slots.default">{{scope.data.label}}</template>
          <slot :data="scope.data"></slot>
        </div>
      </template>
    </VirtualScroll>
    <!-- </div> -->

  </div>
</template>

<script>
import VirtualScroll from './virtual-scroll.vue';
import WhellPopur from './whell-popur.vue';
export default {
  name: "whell-popur",
  components: {
    VirtualScroll,
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  data() {
    return {
      pupurData: [],
      levelLength: 1
    }
  },
  computed: {
    filterData() {
      const filterChildren = function (
        list,
        childKey = "children",
        level = 1,
        arr = [],
        defaultExpand = false,
      ) {
        list.forEach((item, index) => {
          arr.push({
            level: level,
            label: item.label,
            value: item.value,
            expand: level === 1 ? true : defaultExpand
          });
          if (item[childKey] && item[childKey].length !== 0) {
            arr[index].children = filterChildren(
              item[childKey],
              childKey = "children",
              level + 1,
              arr[childKey]
            )
          }
        })
        return arr
      }
      return filterChildren(this.data, 'children')
    },
  },
  methods: {
    handleClose() {
      // this.$emit('handleClose')
    },
    // 更新视图
    updateView() {
      console.log('popur组件-更新视图---触发虚拟滚动重计算')

      this.pupurData = this.filterData
    }

  },
  mounted() {
    this.updateView()

  },

}
</script>

<style lang="less" scoped>
.whell-popur {
  position: absolute;
  width: 100%;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
  z-index: 1;
  ul {
    padding-left: 10px;
    li {
      list-style: none;
    }
  }
  .popurBox {
    // position: absolute;
    // width: 220px;
  }
}
</style>
