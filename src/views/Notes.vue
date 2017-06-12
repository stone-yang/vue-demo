<template>
  <div class="content-view">
    <note-create-pane />
    <note-list-pane v-for="note in notes" 
      :note="note"
      @edit="openDialog({ name: 'editNote' })" />

    <!-- note edit dialog -->
    <app-dialog :show="dialog.editNote || false" @hide="closeDialog">
      <div class="note-wrapper">
        <input type="text" placeholder="Title" class="note-title" />
        <textarea ref="noteContent" placeholder="Take a note..."
          class="note-content"></textarea>
      </div>
      <note-toolbar :opType="1" />
    </app-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import NoteCreatePane from '@/components/NoteCreatePane';
import NoteListPane from '@/components/NoteListPane';
import NoteToolbar from '@/components/NoteToolbar';
import AppDialog from '@/components/Dialog';

export default {
  name: 'Notes',
  components: { NoteCreatePane, NoteListPane, NoteToolbar, AppDialog },
  computed: mapGetters({
    dialog: 'components/dialog',
    notes: 'notes/allNotes',
  }),
  methods: {
    ...mapMutations({
      openDialog: 'components/openDialog',
      closeDialog: 'components/closeDialog',
    }),
  },
};
</script>

<style lang='less' scoped>
.note-wrapper {
  position: relative;
  background-color: #fff;
  width: 100%;
  min-width: 600px;
  border-radius: 2px;
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
