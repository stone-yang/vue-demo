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
  data() {
    return {
      show: true,
    };
  },
  methods: {
    hide() {
      console.log('hide');
      this.show = false;
    },
    setPosition() {
      console.log(this.$refs);
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
    folded(val) {
      // auto focus note content textarea when initially unfold the pane
      if (!val) {
        this.$nextTick(() => {
          this.$refs.noteContent.focus();
        });
      }
    },
  },
};
</script>

<style lang='less' scoped>
.note-wrapper {
  position: relative;
  background-color: #fff;
  width: 100%;
  min-width: 600px;
  border-radius: 2px;
    .pane-op-button {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 14px;
      font-weight: bold;
    }
}
.note-content {
  width: 100%;
  margin-top: 20px;
  font-size: 14px;
}
.note-title {
  font-weight: bold;
}
</style>
