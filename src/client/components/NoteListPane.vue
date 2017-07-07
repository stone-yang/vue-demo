<template>
  <section class="note-wrapper" :class="`${layout === 0 ? 'grid' : 'list'}-view`"
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
      <div style="height: 1.5rem" @click.stop>
        <!-- note toolbar -->
        <note-toolbar :opType="1" :note="note" :show="isMobile || hover"
          @remove="$emit('remove')"
          @changeColor="(color) => $emit('changeColor', color)"
          @changeLabel="(label, isAdd) => { $emit('changeLabel', label, isAdd); }" />
      </div>
    </div>
    <div class="clear"></div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteToolbar from '@/components/NoteToolbar';

export default {
  name: 'NoteListPane',
  components: { NoteToolbar },
  props: {
    note: {
      type: Object,
      default: () => { labels: [] },
    },
    layout: Number,
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    ...mapGetters({
      isMobile: 'components/isMobile',
    }),
  },
};
</script>

<style lang='less' scoped>
.note-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  margin: 1rem 0; 
  border-radius: .14rem;
  box-shadow: 0 .14rem .14rem 0 rgba(0,0,0,0.14), 0 .2rem .06rem -.14rem rgba(0,0,0,0.2), 
    0 .06rem .3rem 0 rgba(0,0,0,0.12);
  &:not(:last-child) {
    transition: background-color 0.4s ease-in;
    // transition-property: top, background-color;
  }
  .pane { 
    padding: 1rem;
  }
  .pane-inner {
    margin-bottom: 1rem;
  }
  &.list-view {
    width: 100%;
    // min-width: 600px;
  }
  &.grid-view {
    // position: absolute;
    width: 15.5rem;
    margin-right: 1rem;
    &:nth-child(3n) {
      left: 33rem;
    }
    &:nth-child(3n + 1) {
      left: 0;
      margin-right: 0;
    }
    &:nth-child(3n + 2) {
      left: 16.5rem;
    }
  }
}
.note-content {
  width: 100%;
  margin-top: 1.25rem;
  font-size: .875rem;
}
.note-title {
  font-weight: bold;
}
.note-labels {
  text-align: right;
  max-width: 100%;
  .list-item {
    display: inline-block;
    min-width: 2.5rem;
    margin-left: .25rem;
    margin-bottom: .25rem;
    padding: .25rem .55rem;
    background-color: rgba(0,0,0,0.1);
    border-radius: .14rem;
    font-size: .75rem;
    font-weight: bold;
  }
}
</style>
