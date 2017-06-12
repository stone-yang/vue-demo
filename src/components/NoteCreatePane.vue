<template>
  <div class="note-wrapper" :class="{ folded }" @click.stop>
    <div class="pane">
      <input type="text" placeholder="Take a note..." class="note-input"
        @focus="folded = false" v-show="folded" />
      <div class="pane-inner" v-show="!folded">
        <!-- note title -->
        <input type="text" placeholder="Title" class="note-title"
          :value="values.title"
          @input="$emit('input', 'title', $event.target.value)" />
        <!-- note content -->
        <textarea ref="noteContent" placeholder="Take a note..."
          :value="values.content"
          @input="$emit('input', 'content', $event.target.value)"
          class="note-content"></textarea>
        <!-- note toolbar -->
        <note-toolbar :opType="0" />
        <button type="button" class="pane-op-button" @click="$emit('create')">DONE</button>
      </div>
    </div>
    <div class="icon-btn image" v-show="folded">
      <i class="mdi mdi-image"></i>
    </div>
    <div class="icon-btn list" v-show="folded">
      <i class="mdi mdi-format-list-checks"></i>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import NoteToolbar from '@/components/NoteToolbar';

export default {
  name: 'NoteCreatePane',
  props: ['values'],
  components: { NoteToolbar },
  created() {
    document.querySelector('body').addEventListener('click', this.foldPane);
  },
  beforeDestroy() {
    document.querySelector('body').removeEventListener('click', this.foldPane);
  },
  data() {
    return {
      folded: true,
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
  &.folded {
    height: 48px;
  }
  .pane { 
    width: 70%;
    padding: 15px;
    float: left; 
    .pane-op-button {
      position: absolute;
      right: 15px;
      bottom: 15px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.note-input {
  width: 100%;
  font-size: 14px;
}
.note-content {
  width: 100%;
  margin-top: 20px;
  font-size: 14px;
}
.note-title {
  font-weight: bold;
}
.icon-btn {
  float: right;
  height: 48px;
  padding: 0 18px;
  line-height: 48px;
  color: #6b6b6b;
  font-size: 24px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: #221900;
  }
}
</style>
