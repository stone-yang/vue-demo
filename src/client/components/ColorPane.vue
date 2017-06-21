<template>
  <section class="color-pane" v-show="show">
    <div class="color-select-btn" role="button" v-for="(color, idx) in colors"
      :style="{ 'background-color': color, 'border-color': idx === 0 ? '#e0e0e0' : color }"
      @click="$emit('changeColor', color)">
       <i class="mdi mdi-check" v-show="activeColor === color"></i>
    </div>
  </section>
</template>

<script>
const colors = ['#fafafa', '#ff8a80', '#ffd180', '#ffff8d', 
  '#cfd8dc', '#80d8ff', '#a7ffeb', '#ccff90'];
export default {
  name: 'ColorPane',
  props: {
    show: Boolean,
    activeColor: String,
  },
  data() {
    return {
      colors,
    };
  },
};
</script>

<style lang='less' scoped>
.color-pane {
  position: absolute;
  left: 14px;
  bottom: 100%;
  width: 136px;
  padding: 3px 7px;
  background-color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 
    0 1px 5px 0 rgba(0,0,0,0.12);
}
.color-select-btn {
  float: left;
  vertical-align: top;
  width: 26px;
  height: 26px;
  margin: 2px;
  line-height: 22px;
  font-size: 20px;
  text-align: center;
  border: 2px #e0e0e0 solid;
  border-radius: 50%;
  .mdi {
    opacity: 0.4;
  }
  &:hover {
    border-color: rgba(0, 0, 0, 0.4) !important;
  }
}
.top-title {
  // font-family: 'Roboto', 'RobotoDraft', Arial, sans-serif;
  height: 48px;
  padding-left: 16px;
  padding-right: 32px;
  line-height: 48px;
  font-size: 22px;
}
</style>
