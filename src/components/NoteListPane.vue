<template>
  <div class="note-wrapper" 
    @mouseenter="hover = true" @mouseleave="hover = false"
    @click.stop="$emit('edit')">
    <div class="pane">
      <div class="pane-inner">
        <!-- note title -->
        <div class="note-title">{{ note.title }}</div>
        <div class="note-content">{{ note.content }}</div>
        <!-- note toolbar -->
        <!--<button type="button" class="pane-op-button">DONE</button>-->
      </div>
      <div :style="{ height: '24px' }" @click.stop>
        <div v-show="hover">
          <note-toolbar :opType="1" :note="note" />
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import NoteToolbar from '@/components/NoteToolbar';

export default {
  name: 'NoteListPane',
  components: { NoteToolbar },
  props: ['note'],
  data() {
    return {
      hover: false,
    };
  },
};
</script>

<style lang='less' scoped>
.note-wrapper {
  position: relative;
  background-color: #fff;
  width: 100%;
  min-width: 600px;
  margin: 16px; 
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
</style>
