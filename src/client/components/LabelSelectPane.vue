<template>
  <section class="label-pane" v-show="show">
    <li class="menu-item" v-for="label in labels"
      @click="changeLabel(label._id)">
      <span class="checkbox" :class="{ active: labelActive(label._id) }">
        <i class="mdi mdi-check"></i>
      </span>
      <span class="menu-item-text">{{ label.title }}</span>
    </li>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  name: 'LabelSelectPane',
  props: {
    labelDetails: {
      type: Array,
      default: () => [],
    },
    show: Boolean,
  },
  created() {
    document.body.addEventListener('click', this.hide);
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.hide);
  },
  // data() {
  //   return {
  //     colors,
  //   };
  // },
  computed: {
    ...mapGetters({
      labels: 'labels/all',
    }),
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
    changeLabel(id) {
      const isActive = this.labelActive(id);
      this.$emit('changeLabel', id, !isActive);
    },
    labelActive(id) {
      return this.labelDetails.find((l) => l._id === id);
    },
  },
};
</script>

<style lang='less' scoped>
@import '../styles/main.less';
.label-pane {
  position: absolute;
  left: .875rem;
  bottom: 100%;
  max-height: 9.4rem;
  overflow: auto;
  padding: .4rem 0;
  background-color: #fff;
  box-shadow: 0 .14rem .14rem 0 rgba(0,0,0,0.14), 0 .2rem .06rem -.14rem rgba(0,0,0,0.2), 
    0 .06rem .3rem 0 rgba(0,0,0,0.12);
}
.menu-item {
  position: relative;
  width: 14rem;
  height: 1.875rem;
  padding: .3rem .6rem .2rem;
  line-height: 1.375rem;
  color: #6b6b6b;
  font-family: 'Roboto', 'RobotoDraft', Arial, sans-serif;
  font-size: .75rem;
  &:hover {
    background-color: #eee;
  }
  .menu-item-text {
    padding-left: 1.5rem;
  }
  .checkbox .mdi {
    font-size: 1rem;
  }
}
.checkbox {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  line-height: .875rem;
  color: #fff;
  text-align: center;
  border: .07rem solid #767676;
  border-radius: .14rem;
  &.active {
    background-color: #767676;
  }
}
</style>
