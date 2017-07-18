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
          :key="idx" @click="action.handler">
          {{action.name}}
        </button>
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
    actions: {
      type: Array,
      default: () => [],
      validator: (value) => {
        if (value && !Array.isArray(value)) {
          return false;
        }
        if (Array.isArray(value)) {
          value.forEach((action) => {
            if (action.handler || typeof action.handler !== 'function') {
              return false;
            }
          });
        }
      },
    },
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

<style lang='less' scoped>
.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
}
.dialog-shade {
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
  opacity: .75;
  cursor: pointer;
}
.dialog-win {
  position: absolute;
  z-index: 1005;
  top: 0;
  left: 0;
  padding: 1rem;
  border-style: none;
  border-radius: .125rem;
  box-shadow: 0 .14rem .14rem 0 rgba(0,0,0,0.14), 0 .2rem .06rem -.14rem rgba(0,0,0,0.2), 
    0 .06rem .3rem 0 rgba(0,0,0,0.12);
  background: #fff;
  .title {
    font-size: 1.125rem;
    font-weight: 500;
  }
}
.dialog-buttons {
  position: absolute;
  bottom: .875rem;
  right: .875rem;
  font-size: .875rem;
  font-weight: bold;
  button {
    margin-left: .5rem;
    border-radius: .14rem;
    &:hover {
      background-color: rgba(0,0,0,0.1);
    }
  }
}
</style>
