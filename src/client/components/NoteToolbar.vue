<template>
  <section class="toolbar-wrapper">
    <ul>
      <li class="icon-btn" @mouseenter="showOperationPane('cHover', true)" 
        @mouseleave="showOperationPane('cHover', false)">
        <i class="mdi mdi-palette"></i>
        <ColorPane :activeColor="note && note.color" :show="cHover"
          @changeColor="(color) => $emit('changeColor', color)" />
      </li>
      <li class="icon-btn" v-if="opType === 0">
        <i class="mdi mdi-image"></i>
      </li>
      <li class="icon-btn">
        <i class="mdi mdi-label"></i>
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

export default {
  name: 'NoteToolbar',
  components: { ColorPane },
  props: {
    // operation type: 0 - create, 1 - edit
    opType: {
      type: Number,
      default: 1,
    },
    note: Object,
  },
  data() {
    return { 
      noteId: this.note && this.note.id,
      cHover: false,
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
