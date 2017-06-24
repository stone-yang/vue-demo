<template>
  <section>
    <note-list-pane
      v-show="layout === 1"
      :note="note"
      @edit="$emit('edit')"
      @remove="$emit('remove')"
      @changeColor="(c) => { $emit('changeColor', c); }"
      @changeLabel="(label, isAdd) => { $emit('changeLabel', label, isAdd); }" />
  </section>
</template>

<script>
import NoteListPane from '@/components/NoteListPane';
import NoteGridPane from '@/components/NoteGridPane';

export default {
  name: 'NoteItem',
  components: { NoteListPane, NoteGridPane },
  props: {
    note: Object,
    layout: Number,
  },
  data() {
    return {
      hover: false,
    };
  },
};
</script>
