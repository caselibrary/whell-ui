<template>
  <div class="whell-input">
    <input type="text" v-model="value" autocomplete="off" placeholder="请选择" class="whell-input__inner" @input="handleSearch" @click="handleClick" @handleSelect="handleSelect">
  </div>
</template>

<script>

export default {
  name: "WhellInput",
  props: {
    inputValue: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    inputValue(newVal) {
      this.value = newVal
      // return this.inputValue
    }
  },
  methods: {
    input() {

    },
    handleSelect(data) {
      // console.lgo(data)
    },
    handleSearch(val) {
      this.$emit('search', this.value)
    },
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less">
.whell-input {
  position: relative;
  width: 200px;
}
.whell-input__inner {
  padding: 0 15px;
  display: inline-block;
  background-color: #fff;
  box-sizing: border-box;
  color: #606266;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  display: inline-block;
  background-image: none;
  font-size: inherit;
  outline: none;
  height: 36px;
  line-height: 36px;
}
</style>
