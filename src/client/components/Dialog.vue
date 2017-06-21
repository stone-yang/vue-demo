<template>
  <div class="dialog-wrapper" v-show="show" ref="diaw">
    <dialog open=true class="dialog-win" ref="dialog"
      :style="{ 'background-color': color }">
      <div class="dialog-win-inner">
        <!-- dialog content -->
        <div class="title">{{ title }}</div>
        <slot></slot>
      </div>
      <div class="dialog-buttons">
        <button type="button" v-for="(action, idx) in actions" v-if="action.handler"
          :key="idx" @click="action.handler">{{action.name}}</button>
      </div>
    </dialog>
    <div class="dialog-shade" ref="dias"></div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    show: Boolean,
    actions: Array,
    title: String,
    color: String,
  },
  data() {
    return {
      init: false,
    };
  },
  created() {
    document.body.addEventListener('click', this.hide);
  },
  updated() {
    if (!this.init) {
      this.initDialog();
      this.init = true;
    }
    this.show && this.setPosition();
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.hide);
  },
  methods: {
    hide(e) {
      if (e.target === this.$refs.dias) {
        this.$emit('hide');
      }
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
    initDialog() {
      const diaw = this.$refs.diaw;
      diaw.parentNode.removeChild(diaw);
      document.body.appendChild(diaw);
    },
  },
};
</script>
