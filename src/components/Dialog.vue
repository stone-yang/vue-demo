<template>
  <div class="dialog-wrapper" :class="{ hide: !show }">
    <dialog open=true class="dialog-win" ref="dialog" @click.stop>
      <div class="dialog-win-inner">
        <slot></slot>
        <!--<button type="button" class="pane-op-button">DONE</button>-->
      </div>
      <div class="dialog-buttons"></div>
    </dialog>
    <div class="dialog-shade"></div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: ['show'],
  // components: { NoteToolbar },
  created() {
    document.querySelector('body').addEventListener('click', this.hide);
    // this.setPosition();
  },
  updated() {
    console.log('update');
    this.setPosition();
  },
  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.hide);
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
    // ...mapMutations({
    //   closeDialog: 'components/closeDialog',
    // }),
    setPosition() {
      const diaEle = this.$refs.dialog;
      const winWidth = diaEle.offsetWidth;
      const winHeight = diaEle.offsetHeight;
      diaEle.style.marginLeft = `${-winWidth / 2}px`;
      diaEle.style.marginTop = `${-(winHeight / 2) - 100}px`;
      diaEle.style.left = '50%';
      diaEle.style.top = '50%';
    },
  },
};
</script>
