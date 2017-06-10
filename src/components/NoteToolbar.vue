<template>
  <div class="toolbar-wrapper">
    <ul>
      <li class="icon-btn">
        <i class="mdi mdi-palette"></i>
      </li>
      <li class="icon-btn" v-if="opType === 0">
        <i class="mdi mdi-image"></i>
      </li>
      <li class="icon-btn">
        <i class="mdi mdi-label"></i>
      </li>
      <li class="icon-btn" v-if="opType === 1">
        <i class="mdi mdi-close"></i>
      </li>
    </ul>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: 'NoteToolbar',
  props: {
    // operation type: 0 - create, 1 - edit
    opType: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang='less' scoped>
.toolbar-wrapper {
  display: inline-block;
  vertical-align: bottom;
  margin-left: -10px;
}
.icon-btn {
  float: left;
  height: 24px;
  padding: 0 14px;
  line-height: 24px;
  color: #6b6b6b;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: #221900;
  }
}
</style>
