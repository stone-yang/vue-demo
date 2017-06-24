<template>
  <section class="note-grid-wrapper"
    :style="{ 'background-color': note.color }"
    @mouseenter="hover = true" @mouseleave="hover = false"
    @click="$emit('edit', note)">
    <div class="pane">
      <div class="pane-inner">
        <!-- note title -->
        <div class="note-title">{{ note.title }}</div>
        <div class="note-content">{{ note.content }}</div>
      </div>
      <div class="note-labels">
        <li class="list-item" v-for="label in note.labels">{{ label.title }}</li>
      </div>
      <div :style="{ height: '24px' }" @click.stop>
        <!-- note toolbar -->
        <note-toolbar :opType="1" :note="note" :show="hover"
          @remove="$emit('remove')"
          @changeColor="(color) => $emit('changeColor', color)"
          @changeLabel="(label, isAdd) => { $emit('changeLabel', label, isAdd); }" />
      </div>
    </div>
    <div class="clear"></div>
  </section>
</template>

<script>
import NoteToolbar from '@/components/NoteToolbar';

export default {
  name: 'NoteGridPane',
  components: { NoteToolbar },
  props: {
    note: {
      type: Object,
      default: () => { labels: [] },
    },
  },
  data() {
    return {
      hover: false,
    };
  },
};
</script>

<style lang='less' scoped>
.note-grid-wrapper {
  position: relative;
  background-color: #fff;
  width: 100%;
  min-width: 600px;
  margin: 16px 0; 
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 
    0 1px 5px 0 rgba(0,0,0,0.12);
  .pane { 
    padding: 15px;
  }
  .pane-inner {
    margin-bottom: 15px;
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
.note-labels {
  text-align: right;
  .list-item {
    display: inline-block;
    min-width: 40px;
    margin-left: 4px;
    padding: 4px 9px;
    background-color: rgba(0,0,0,0.1);
    border-radius: 2px;
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
