<template>
  <div class="content-view">
    <note-create-pane />
    <note-list-pane v-for="note in notes" :note="note" />

    <!-- note edit dialog -->
    <app-dialog>
      <input type="text" placeholder="Title" class="note-title" />
      <textarea ref="noteContent" placeholder="Take a note..."
        class="note-content"></textarea>
      <note-toolbar :opType="1" />
    </app-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NoteCreatePane from '@/components/NoteCreatePane';
import NoteListPane from '@/components/NoteListPane';
import NoteToolbar from '@/components/NoteToolbar';
import AppDialog from '@/components/Dialog';

export default {
  name: 'Notes',
  components: { NoteCreatePane, NoteListPane, NoteToolbar, AppDialog },
  computed: mapGetters({
    notes: 'notes/allNotes',
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
