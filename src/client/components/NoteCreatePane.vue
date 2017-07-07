<template>
  <section class="note-wrapper" :class="{ folded }"
    :style="{ 'background-color': cColor }" @click.stop>
    <div class="pane">
      <input type="text" placeholder="Take a note..." class="note-input"
        @focus="$emit('fold', false)" v-show="folded" />
      <div class="pane-inner" v-show="!folded">
        <!-- note title -->
        <input type="text" placeholder="Title" class="note-title"
          :value="values.title" :class="{ 'mobile-input': isMobile }"
          @input="$emit('input', 'title', $event.target.value)" />
        <!-- note content -->
        <textarea ref="noteContent" placeholder="Take a note..."
          :value="values.content"
          @input="$emit('input', 'content', $event.target.value)"
          class="note-content" :class="{ 'mobile-input': isMobile }"></textarea>
        <!-- note toolbar -->
        <note-toolbar :opType="0" :show="true"
          @changeColor="(color) => { cColor = color; $emit('input', 'color', color); }" />
        <button type="button" class="pane-op-button" 
          @click="() => { $emit('create'); cColor = ''; }">DONE</button>
      </div>
    </div>
    <div class="icon-btn image" v-show="folded">
      <i class="mdi mdi-image"></i>
    </div>
    <div class="icon-btn list" v-show="folded">
      <i class="mdi mdi-format-list-checks"></i>
    </div>
    <div class="clear"></div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteToolbar from '@/components/NoteToolbar';

export default {
  name: 'NoteCreatePane',
  props: ['values', 'folded', 'color'],
  components: { NoteToolbar },
  data() {
    return {
      cColor: '',
    };
  },
  created() {
    document.body.addEventListener('click', this.foldPane);
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.foldPane);
  },
  computed: {
    ...mapGetters({
      isMobile: 'components/isMobile',
    }),
  },
  methods: {
    foldPane() {
      this.$emit('fold', true);
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
  // min-width: 600px;
  margin: 1rem 0; 
  border-radius: .14rem;
  box-shadow: 0 .14rem .14rem 0 rgba(0,0,0,0.14), 0 .2rem .06rem -.14rem rgba(0,0,0,0.2), 
    0 .06rem .3rem 0 rgba(0,0,0,0.12);
  &.folded {
    height: 3rem;
  }
  .pane { 
    width: 75%;
    padding: 1rem;
    float: left; 
    .pane-op-button {
      position: absolute;
      right: 1rem;
      bottom: 1rem;
      font-size: .875rem;
      font-weight: bold;
    }
  }
}
.note-input {
  width: 100%;
  font-size: .875rem;
}
.note-content {
  width: 100%;
  min-height: 3.75rem;
  margin-top: 1.25rem;
  font-size: .875rem;
}
.note-title {
  font-weight: bold;
}
.icon-btn {
  float: right;
  height: 3rem;
  padding: 0 1.125rem;
  line-height: 3rem;
  color: #6b6b6b;
  font-size: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: #221900;
  }
  @media screen and (max-device-width: 500px) {
    display: none;
  }
}
</style>
