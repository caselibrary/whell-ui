<template>
  <div class="whell-select">
    <!-- <VirtualScroll /> -->

    <WhellInput @click.capture="handleVisible()" @search="handleSearch" :inputValue="inputValue" />
    <div class="inputBox" v-if="multiple">
      <span v-for="(item,index) in multipleValue" :key="index">{{item}}</span>
    </div>
    <span class="whell-input__suffix" :style="{transform:isVisible?'rotate(180deg)':'rotate(0deg)'}">
      <i class="iconfont">&#xe60a;</i>
    </span>
    <transition :name="'fade'">
      <WhellPopur v-if="isVisible" :data="selectData" @handleClose="isVisible=false">
        <template slot-scope="scope">
          <div @click="handleSelect(scope.data)">
            <template v-if="!$slots.default">{{scope.data.label}}</template>
            <slot :data="scope.data"></slot>
          </div>
        </template>
      </WhellPopur>
    </transition>
  </div>
</template>

<script>
import VirtualScroll from './virtual-scroll.vue';
import WhellInput from './whell-input.vue';
import WhellPopur from './whell-popur.vue';
import { setTimeout } from 'timers';
export default {
  name: "WhellSelect",
  components: {
    VirtualScroll,
    WhellInput,
    WhellPopur
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },

  },
  data() {
    return {
      isVisible: false,
      inputValue: '',
      handler: null,
      selectData: [],
      multipleValue: []
    }
  },
  methods: {
    handleSelect(data) {
      console.log('xx')
      this.inputValue = data.label
      this.multipleValue.push(data.value)
      console.log(this.multipleValue)

    },
    handleVisible() {
      this.isVisible = !this.isVisible
    },
    handleSearch(query = '') {
      console.log('xxx')
      this.selectData = this.data.filter(item => {
        return item.label.includes(query)
      })
    }
  },
  mounted() {
    document.addEventListener('click', () => {
      if (this.isVisible) {
        this.isVisible = false
      }
      // 采用捕获关闭弹窗
    }, true)
    this.handleSearch()
  }
}
</script>

<style lang="less" scoped>
.whell-select {
  position: relative;
  width: 228px;
  .whell-input__suffix {
    position: absolute;
    height: 100%;
    right: 0px;
    top: -2px;
    // text-align: center;
    color: #c0c4cc;
    transition: all 0.3s;
    pointer-events: none;
    i {
      display: inline-block;
      width: 25px;
      margin-left: 10px;
      height: 40px;
      line-height: 40px;
      transition: transform 0.3s;
      // transform: rotate(0deg);
      // transform: rotate(180deg);
    }
  }
  /deep/.list-view-item {
    padding-left: 10px;
    background: #fff;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.inputBox {
  // position: absolute;
  width: 100%;
  left: 50px;
  height: 100%;
}
</style>
