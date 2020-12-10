<template>
  <div class="whell-tree">
    <VirtualScroll :data="treeData">
      <template slot-scope="scope">
        <div>
          <div style="padding-right:20px" @click="handleNodes(scope.data)" class="treeItem" :style="{paddingLeft: 18 * (scope.data.level - 1) + 'px'}">
            <i class=" iconfont treeIcon" v-if="scope.data.children.length">
              {{scope.data.expand ?'&#xe652;':'&#xe610;'}}
            </i>
            <div class="tree-minbox" @click.stop="toggleCheck(scope.data)" v-if="showCheckbox">
              <span :class="[scope.data.disabled?'tree-disabled':'tree-isDisabled',(scope.data.select || scope.data.check ?'tree-check':'tree-isCheck')]"> {{scope.data.check ?'+':(scope.data.select?'-':'')}}</span>
            </div>
            <span class="tree-value">
              <template v-if="!$slots.default">{{scope.data.label}}</template>
              <slot :data="scope.data"></slot>
            </span>
          </div>
        </div>
      </template>
    </VirtualScroll>
    <button @click="expandAll()">展开所有</button>
    <button @click="collapseAll()">折叠所有</button>
    <button @click="selectAll()">选中所有</button>
    <button @click="quitSelectAll()">取消所有</button>

  </div>
</template>

<script>
import VirtualScroll from './virtual-scroll.vue';
export default {
  name: "WhellTree",
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
    'showCheckbox': {
      type: Boolean,
      default: false
    }
  },
  computed: {
    flattenTree() {
      const flatten = function (
        list,
        childKey = "children",
        level = 1,
        parent = null,
        defaultSelect = false,
        defaultDisabled = false,
        defaultExpand = false,
        defaultChecked = false
      ) {
        let arr = [];
        list.forEach(item => {
          item.level = level;
          // 添加控制属性
          if (item.expand === undefined) {
            item.expand = defaultExpand;
          }
          if (item.check === undefined) {
            item.check = defaultExpand;
          }
          if (item.select === undefined && item[childKey].length) {
            item.select = defaultSelect;
          }
          if (item.disabled === undefined) {
            item.disabled = defaultDisabled;
          }
          if (item.visible === undefined) {
            item.visible = true;
          }
          if (!parent.visible || !parent.expand) {
            item.visible = false;
          }
          item.parent = parent;
          arr.push(item);
          if (item[childKey]) {
            arr.push(
              ...flatten(
                item[childKey],
                childKey,
                level + 1,
                item,
                defaultExpand
              )
            );
          }
        });
        return arr;
      };

      return flatten(this.data, "children", 1, {
        level: 0,
        visible: true,
        expand: true,
        children: this.data
      });
    },
  },
  data() {
    return {
      treeData: []
    }
  },
  methods: {
    //展开节点
    expand(item) {
      item.expand = true;
      this.recursionVisible(item.children, true, 'visible', true);
    },
    //折叠节点
    collapse(item) {
      item.expand = false;
      this.recursionVisible(item.children, false, 'visible');
    },
    //折叠所有
    collapseAll() {
      const level = 1
      this.flattenTree.forEach(item => {
        item.expand = false;
        if (item.level !== level) {
          item.visible = false;
        }
      });
      this.updateView();
    },
    //展开所有
    expandAll() {
      this.flattenTree.forEach(item => {
        item.expand = true;
        item.visible = true;
      });
      this.updateView();
    },
    // 触发是否展开节点
    toggleExpand(item) {
      const isExpand = item.expand;
      if (isExpand) {
        this.collapse(item, true); // 折叠
      } else {
        this.expand(item, true); // 展开
      }
      this.updateView();
    },
    // 触发节点
    handleNodes(item) {
      if (item.children.length) {
        this.toggleExpand(item)
      }
    },
    // 判断节点是否全选

    // 选中节点
    check(item) {
      item.check = true;
      this.recursionParent(item.parent)
      this.recursionVisible(item.children, true, 'check');
    },
    // 取消选中节点
    quitCheck(item) {
      item.select = false;
      item.check = false;
      this.recursionParent(item.parent)
      this.recursionVisible(item.children, false, 'check');
    },
    // 选择所有
    selectAll() {
      this.flattenTree.forEach(item => {
        if (!item.disabled) {
          item.check = true;
        }

      });
    },
    // 取消所有
    quitSelectAll() {
      this.flattenTree.forEach(item => {
        item.check = false;
        item.select = false;
      });
    },
    // 触发是否选择节点
    toggleCheck(item) {

      const isCheck = item.check;
      if (item.disabled) return false
      if (isCheck) {
        this.quitCheck(item); // 取消选中节点
      } else {
        this.check(item); // 选中节点
      }
    },
    // 获取当前选择的节点
    getCheckedNodes() {
      return (this.flattenTree || []).filter(
        item => item.check
      ).map(node => {
        return node.id
      })
      // console.log(check)
    },
    // 设置勾选的节点
    setCheckedIds(data = []) {
      (this.flattenTree || []).forEach(item => {
        if (data.includes(item.id) && !item.disabled) {
          item.check = true
          this.recursionParent(item.parent)
          this.recursionVisible(item.children, true, 'check')
        }
      });
    },
    // 取消指定节点
    quitCheckedIds(data = []) {
      (this.flattenTree || []).forEach(item => {
        if (data.includes(item.id) && !item.disabled) {
          item.check = false
          this.recursionParent(item.parent)
          this.recursionVisible(item.children, false, 'check')
        }
      });
    },
    // 设置默认禁用的节点
    setDisableds(data = []) {
      (this.flattenTree || []).forEach(item => {
        if (data.includes(item.id)) {
          item.disabled = true
          this.recursionVisible(item.children, true, 'disabled')
        }
      });
    },
    quitDisableds(data = []) {
      (this.flattenTree || []).forEach(item => {
        if (data.includes(item.id)) {
          item.disabled = false
          this.recursionVisible(item.children, false, 'disabled')
        }
      });
    },
    //递归节点
    recursionVisible(children, status, key = 'visible', isThrough) {
      children.forEach(node => {
        node[key] = status;
        if (node.children && !isThrough) {
          this.recursionVisible(node.children, status, key);
        }
      });
    },

    //递归父节点
    recursionParent(parent) {
      let selectLength = 0
      let checkLength = 0
      let parentLength = parent.children.length
      parent.children.forEach(node => {
        if (node.select) {
          selectLength++
        }
        if (node.check) {
          checkLength++
        }
      })
      if (checkLength === parentLength) {
        parent.check = true
        parent.select = false
      } else {
        parent.check = false
        if (checkLength === 0) {
          if (selectLength === 0) {
            parent.select = false
          } else {
            parent.select = true
          }
        } else {
          parent.select = true
        }
      }

      if (parent.parent && parent.level !== 1) {
        this.recursionParent(parent.parent);
      }
    },
    // 更新视图
    updateView() {
      const allVisibleData = (this.flattenTree || []).filter(
        item => item.visible
      );
      console.log('tree组件-更新视图---触发虚拟滚动重计算')
      this.treeData = allVisibleData
    }
  },
  mounted() {
    this.updateView()
  }
}
</script>

<style lang="less" scoped>
.treeIcon {
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  display: inline-block;
  // vertical-align: middle;
}
.treeItem {
  font-size: 14px;
}
.tree-minbox {
  width: 14px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 14px;
  background: #fff;
  margin-left: 5px;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  > span {
    position: absolute;
    height: 12px;
    line-height: 12px;
    text-align: center;
    width: 12px;
    top: 0;
  }
  .tree-disabled {
    cursor: not-allowed;
    background: #f2f6fc;
  }
  .tree-check {
    background-color: #409eff;
    color: #fff;
  }
}
.tree-value {
  display: inline-block;
  vertical-align: middle;
  padding-left: 5px;
}

.tree-isDisabled,
.tree-isCheck {
  cursor: pointer;
  background: #fff;
}
</style>


