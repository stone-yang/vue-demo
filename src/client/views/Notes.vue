<template>
  <div class="content-view">
    <note-create-pane
      :values="{ title, content }"
      :folded="folded"
      :color="color"
      @input="changeFormValues"
      @create="confirmCreate"
      @fold="foldCreatePane" />
    <div class="note-list" ref="nList">
      <note-list-pane v-for="(note, idx) in notes" 
        :layout="contentLayout"
        :note="note" :key="idx"
        @edit="showEditForm"
        @remove="removeNote({ id: note._id, params: queryParams })"
        @changeColor="(c) => { retrieveFormValues(note); color = c; confirmEdit(); }"
        @changeLabel="(label, isAdd) => { retrieveFormValues(note); confirmEditLabel(label, isAdd); }" />
    </div>

    <!-- note edit dialog -->
    <app-dialog :show="dialog.editNote || false" @hide="dialog.editNote && closeDialog()"
      :actions="settings.dialog.actions" :color="color">
      <div class="note-dialog-wrapper">
        <input type="text" placeholder="Title" class="note-title" :class="{ 'mobile-input': isMobile }"
          v-model="title" />
        <textarea ref="noteContent" placeholder="Take a note..."
          class="note-content" :class="{ 'mobile-input': isMobile }" v-model="content"></textarea>
      </div>
      <div class="note-labels">
        <li class="list-item" :key="idx" v-for="(label, idx) in note && note.labels">{{ label.title }}</li>
      </div>
      <note-toolbar :note="note" :show="true" :opType="1" @remove="confirmRemove"
        @changeColor="(c) => { color = c; confirmEdit(); }"
        @changeLabel="(label, isAdd) => { confirmEditLabel(label, isAdd); }" />
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
  async mounted() {
    await this.queryNote(this.queryParams);
    this.notes = this.getNotes();
  },
  data() {
    return {
      id: '',
      title: '',
      content: '',
      color: '',
      note: {},
      // initially fold the note-create-pane
      folded: true,
      notes: [],
    };
  },
  computed: {
    noteParams() {
      return { 
        title: this.title, 
        content: this.content,
        color: this.color,
      };
    },
    queryParams() {
      const params = {
        orders: {
          createTime: -1,
        },
        related: 'labels',
      };
      return params;
    },
    ...mapGetters({
      contentLayout: 'components/contentLayout',
      dialog: 'components/dialog',
      isMobile: 'components/isMobile',
      notesAll: 'notes/allNotes',
      labels: 'labels/all',
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
      editLabel: 'notes/editLabel',
      removeNote: 'notes/remove',
    }),
    changeFormValues(key, value) {
      this[key] = value;
    },
    retrieveFormValues(note) {
      this.id = note._id;
      this.title = note.title;
      this.content = note.content;
      this.color = note.color;
      this.note = note;
    },
    clearFormValues() {
      this.content = '';
      this.title = '';
      this.color = '';
      this.note = {};
      this.folded = true;
    },
    showEditForm(note) {
      this.retrieveFormValues(note);
      this.openDialog({ name: 'editNote' });
    },
    confirmCreate() {
      this.createNote({ note: this.noteParams, params: this.queryParams });
      this.clearFormValues();
    },
    confirmEdit() {
      this.editNote({ 
        id: this.id, 
        note: this.noteParams, 
        params: this.queryParams, 
      });
      this.closeDialog();
      this.clearFormValues();
    },
    async confirmEditLabel(label, isAdd) {
      const note = await this.editLabel({ id: this.id, body: { label, isAdd } });
      this.retrieveFormValues(note);
    },
    confirmRemove() {
      this.removeNote({ id: this.id, params: this.queryParams });
      this.closeDialog();
      this.clearFormValues();
    },
    foldCreatePane(isFold) {
      if (!isFold) {
        this.clearFormValues();
      }
      this.folded = isFold;
    },
    getNotes() {
      if (this.$route.name === 'Label') {
        const labelName = this.$route.params.labelName;
        return this.notesAll && this.notesAll.filter((note) => {
          return note.labels.map(l => l && l.title).indexOf(labelName) >= 0;
        });
      }
      return this.notesAll;
    },
    adaptGridLayout: (function() {
      let colHeights = [];
      const interval = 16;
      return function(ele) {
        colHeights = new Array(3).fill(0);
        Array.from(ele.children).forEach((item, idx) => {
          const cIdx = idx % 3;
          if (idx < 3) {
            item.style.top = 0;
          } else {
            item.style.top = `${colHeights[cIdx]}px`;
          }
          // console.log(item.clientHeight, '----');
          colHeights[idx % 3] += (item.clientHeight + interval);
        });
      };
    })(),
    adaptListLayout(ele) {
      const interval = screen.width < 500 ? 36 : 16;
      let h = 0;
      Array.from(ele.children).forEach((item, idx) => {
        item.style.top = `${h}px`;
        h += (item.clientHeight + interval);
      });
    },
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Notes' || to.name === 'Label') {
        this.notes = this.getNotes();
      }
    },
    notesAll() {
      this.notes = this.getNotes();
    },
    contentLayout() {
      if (this.contentLayout === 0) {
        this.$nextTick(() => {
          this.adaptGridLayout(this.$refs.nList);
        });
      } else {
        this.$nextTick(() => {
          this.adaptListLayout(this.$refs.nList);
        });
      }
    },
    notes() {     
      if (this.contentLayout === 0) {
        this.$nextTick(() => {
          this.adaptGridLayout(this.$refs.nList);
        });
      } else {
        this.$nextTick(() => {
          this.adaptListLayout(this.$refs.nList);
        });
      }
    },
  },
};
</script>

<style lang='less' scoped>
.note-list {
  position: relative;
}
.note-dialog-wrapper {
  position: relative;
  // background-color: #fff;
  width: 100%;
  width: 37.5rem;
  border-radius: 0.14rem;
  .mobile-width;
}
.note-content {
  width: 100%;
  margin-top: 1.25rem;
  min-height: 3.75rem;
  font-size: .875rem;
}
.note-title {
  font-weight: bold;
}
.note-labels {
  text-align: right;
  .mobile-width;
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
.mobile-width {
  @media screen and (max-device-width: 500px) {
    width: 22rem;
  }
}
</style>
