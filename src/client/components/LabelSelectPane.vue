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
  left: 14px;
  bottom: 100%;
  max-height: 150px;
  overflow: auto;
  padding: 6px 0;
  background-color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 
    0 1px 5px 0 rgba(0,0,0,0.12);
}
.menu-item {
  position: relative;
  width: 225px;
  height: 30px;
  padding: 5px 10px 3px;
  line-height: 22px;
  color: #6b6b6b;
  font-family: 'Roboto', 'RobotoDraft', Arial, sans-serif;
  font-size: 12px;
  &:hover {
    background-color: #eee;
  }
  .menu-item-text {
    padding-left: 24px;
  }
}
.checkbox {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 14px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  border: 1px solid #767676;
  border-radius: 2px;
  &.active {
    background-color: #767676;
  }
}
</style>
