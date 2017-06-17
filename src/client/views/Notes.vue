<template>
  <div class="content-view">
    <note-create-pane
      :values="{ title, content }"
      :folded="folded"
      @input="changeFormValues"
      @create="confirmCreate"
      @fold="foldCreatePane" />
    <note-list-pane v-for="(note, idx) in notes" 
      :note="note" :key="idx"
      @edit="showEditForm"
      @remove="removeNote({ id: note._id, params: queryParams })" />

    <!-- note edit dialog -->
    <app-dialog :show="dialog.editNote || false" @hide="() => dialog.editNote && closeDialog()"
      :actions="settings.dialog.actions">
      <div class="note-wrapper">
        <input type="text" placeholder="Title" class="note-title" v-model="title" />
        <textarea ref="noteContent" placeholder="Take a note..."
          class="note-content" v-model="content"></textarea>
      </div>
      <note-toolbar :opType="1" @remove="confirmRemove" />
    </app-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import NoteCreatePane from '@/components/NoteCreatePane';
import NoteListPane from '@/components/NoteListPane';
import NoteToolbar from '@/components/NoteToolbar';
import AppDialog from '@/components/Dialog';

export default {
  name: 'Notes',
  components: { NoteCreatePane, NoteListPane, NoteToolbar, AppDialog },
  mounted() {
    this.queryNote(this.queryParams);
  },
  data() {
    return {
      id: '',
      title: '',
      content: '',
      // initially fold the note-create-pane
      folded: true,
    };
  },
  computed: {
    noteParams() {
      return { title: this.title, content: this.content };
    },
    queryParams() {
      return {
        orders: {
          createTime: -1,
        },
      };
    },
    ...mapGetters({
      dialog: 'components/dialog',
      notes: 'notes/allNotes',
    }),
    settings() {
      return {
        dialog: {
          actions: [{
            name: 'DONE',
            handler: this.confirmEdit,
          }],
        },
      };
    },
  },
  methods: {
    ...mapMutations({
      openDialog: 'components/openDialog',
      closeDialog: 'components/closeDialog',
    }),
    ...mapActions({
      queryNote: 'notes/query',
      createNote: 'notes/create',
      editNote: 'notes/edit',
      removeNote: 'notes/remove',
    }),
    changeFormValues(key, value) {
      this[key] = value;
    },
    showEditForm(note) {
      this.id = note._id;
      this.title = note.title;
      this.content = note.content;
      this.openDialog({ name: 'editNote' });
    },
    confirmCreate() {
      this.createNote({ note: this.noteParams, params: this.queryParams });
      this.content = '';
      this.title = '';
      this.folded = true;
    },
    confirmEdit() {
      this.editNote({ id: this.id, note: this.noteParams, params: this.queryParams});
      this.closeDialog();
    },
    confirmRemove() {
      this.removeNote({ id: this.id, params: this.queryParams });
      this.closeDialog();
    },
    foldCreatePane(isFold) {
      this.folded = isFold;
      if (!isFold) {
        this.content = '';
        this.title = '';
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
  border-radius: 2px;
}
.note-content {
  width: 100%;
  margin-top: 20px;
  min-height: 60px;
  font-size: 14px;
}
.note-title {
  font-weight: bold;
}
</style>
