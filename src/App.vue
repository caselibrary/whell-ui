<template>
  <div id="app">
    下拉列表
    <whell-select :data="selectData">
      <!-- <template slot-scope="scope">
        <div @click="handleClick(scope.data)">
          {{scope.data.value}}
        </div>
      </template> -->
    </whell-select>
    树形菜单
    <WhellTree
      :data="treeData"
      ref="whellTree"
      showCheckbox
    >

      <!-- <template slot-scope="scope">
        <div>
          {{scope.data.label}}
        </div>
      </template> -->
    </WhellTree>

    <!-- <button @click="getCheckedNodes()">获取选中的节点</button>
    <button @click="setCheckedIds()">id设置选中的节点</button>
    <button @click="quitCheckedIds()">id取消选中的节点</button>
    <button @click="setDisableds()">id设置禁用</button>
    <button @click="quitDisableds()">id取消禁用</button>
    <div></div> -->
    级联选择
    <whell-select :data="cascaderData" />
    <!-- table表格
    <whell-table :data="tableData">
      <whell-table-colum>

      </whell-table-colum>
    </whell-table> -->
  </div>
</template>

<script>
import treeTools from "./mixinData";
export default {
  mixins: [treeTools],
  name: "App",
  components: {},
  created() {
    // console.log(this.treeData)
  },
  methods: {
    handleClick(val) {
      console.log(val);
    },
    getCheckedNodes() {
      console.log(this.$refs.whellTree.getCheckedNodes());
    },
    setCheckedIds() {
      this.$refs.whellTree.setCheckedIds(["1-0"]);
    },
    quitCheckedIds() {
      this.$refs.whellTree.quitCheckedIds(["1-0"]);
    },
    setDisableds() {
      this.$refs.whellTree.setDisableds(["0"]);
    },
    quitDisableds() {
      this.$refs.whellTree.quitDisableds(["0"]);
    }
  },
  mounted() {
    // this.$refs.whellTree.expandAll()
  }
};
</script>

<style lang="less">
</style>
