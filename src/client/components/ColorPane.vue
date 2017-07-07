<template>
  <section class="color-pane" v-show="show">
    <div class="color-select-btn" role="button" v-for="(color, idx) in colors" :key="idx"
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
  left: .875rem;
  bottom: 100%;
  width: 8.5rem;
  padding: .2rem .4rem;
  background-color: #fff;
  box-shadow: 0 .14rem .14rem 0 rgba(0,0,0,0.14), 0 .2rem .06rem -.14rem rgba(0,0,0,0.2), 
    0 .06rem .3rem 0 rgba(0,0,0,0.12);
}
.color-select-btn {
  float: left;
  vertical-align: top;
  width: 1.625rem;
  height: 1.625rem;
  margin: .14rem;
  line-height: 1.375rem;
  font-size: 1.25rem;
  text-align: center;
  border: .14rem #e0e0e0 solid;
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
  height: 3rem;
  padding-left: 1rem;
  padding-right: 2rem;
  line-height: 3rem;
  font-size: 1.375rem;
}
</style>
