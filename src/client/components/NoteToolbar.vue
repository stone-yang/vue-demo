<template>
  <section class="toolbar-wrapper" v-show="toolbarShow || show">
    <ul>
      <li class="icon-btn" @mouseenter="showOperationPane('cHover', true)" 
        @mouseleave="showOperationPane('cHover', false)" @click.stop>
        <i class="mdi mdi-palette"></i>
        <color-pane :activeColor="note && note.color" :show="cHover"
          @changeColor="(color) => $emit('changeColor', color)" />
      </li>
      <li class="icon-btn" v-if="opType === 0">
        <i class="mdi mdi-image"></i>
      </li>
      <li class="icon-btn" @click.stop="lShow = true; toolbarShow = true">
        <i class="mdi mdi-label"></i>
        <label-select-pane :show="lShow" :labelDetails="note && note.labels" 
          @hide="lShow = false; toolbarShow = false"
          @changeLabel="(label, isAdd) => { $emit('changeLabel', label, isAdd); }" />
      </li>
      <li class="icon-btn" v-if="opType === 1"
        @click="$emit('remove')">
        <i class="mdi mdi-close"></i>
      </li>
    </ul>
    <div class="clear"></div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import ColorPane from '@/components/ColorPane';
import LabelSelectPane from '@/components/LabelSelectPane';

export default {
  name: 'NoteToolbar',
  components: { ColorPane, LabelSelectPane },
  props: {
    // operation type: 0 - create, 1 - edit
    opType: {
      type: Number,
      default: 1,
    },
    note: {
      type: Object,
      default: () => { labels: [] },
    },
    show: Boolean,
  },
  data() {
    return { 
      noteId: this.note && this.note.id,
      toolbarShow: false, 
      cHover: false,
      lShow: false,
      timer: null,
    };
  },
  methods: {
    ...mapActions({
      remove: 'notes/remove',
    }),
    showOperationPane(name, show) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this[name] = show;
      }, 200);
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
  position: relative;
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
