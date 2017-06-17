<template>
  <div class="dialog-wrapper hide" ref="diaw">
    <dialog open=true class="dialog-win" ref="dialog" @click.stop>
      <div class="dialog-win-inner">
        <!-- dialog content -->
        <div class="title">{{ title }}</div>
        <slot></slot>
      </div>
      <div class="dialog-buttons">
        <button type="button" v-for="(action, idx) in actions" 
          :key="idx" @click="action.handler">{{action.name}}</button>
      </div>
    </dialog>
    <div class="dialog-shade"></div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    show: Boolean,
    actions: Array,
    title: String,
  },
  data() {
    return {
      a: false,
    };
  },
  created() {
    document.querySelector('body').addEventListener('click', this.hide);
    // this.setPosition();
  },
  updated() {
    this.show && this.setPosition();
  },
  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.hide);
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
    setPosition() {
      const diaEle = this.$refs.dialog;
      const winWidth = diaEle.offsetWidth;
      const winHeight = diaEle.offsetHeight;
      diaEle.style.marginLeft = `${-winWidth / 2}px`;
      diaEle.style.marginTop = `${-winHeight / 2}px`;
      diaEle.style.left = '50%';
      diaEle.style.top = '50%';
    },
  },
  watch: {
    show() {
      const diaw = this.$refs.diaw;
      if (this.show) {
        diaw.style.display = 'block';
        document.querySelector('body').appendChild(diaw);
      } else {
        diaw.style.display = 'none';
        document.querySelector('body').removeChild(diaw);
      }
    },
  },
};
</script>
