<template>
  <div class="note-wrapper" 
    @mouseenter="hover = true" @mouseleave="hover = false">
    <div class="pane">
      <div class="pane-inner">
        <!-- note title -->
        <div class="note-title">Title</div>
        <div class="note-content">Take a note...</div>
        <!-- note toolbar -->
        <!--<button type="button" class="pane-op-button">DONE</button>-->
      </div>
      <div :style="{ height: '24px' }">
        <div v-show="hover">
          <note-toolbar :opType="1" />
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
  created() {
    document.querySelector('body').addEventListener('click', this.foldPane);
  },
  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.foldPane);
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    foldPane() {
      this.folded = true;
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
