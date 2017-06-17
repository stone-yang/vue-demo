<template>
  <div class="label-edit-pane">
    <div class="label-row">
      <span class="icon-btn">
        <i class="mdi mdi-plus"></i>
      </span>
      <!--<span class="icon-btn">
        <i class="mdi mdi-delete"></i>
      </span>-->
      <input type="text" class="label-title-input" placeholder="Create new label"
        v-model="labelTitle" />
      <span class="icon-btn" @click="confirmCreate">
        <i class="mdi mdi-check"></i>
      </span>
    </div>
    <div class="label-row" v-for="(t, idx) in editTitles" @mouseenter="hoverIdx = idx">
      <span class="icon-btn" v-show="idx !== hoverIdx">
        <i class="mdi mdi-label"></i>
      </span>
      <span class="icon-btn" v-show="idx === hoverIdx" @click="confirmRemove(idx)">
        <i class="mdi mdi-delete"></i>
      </span>
      <input type="text" class="label-title-input" :value="t" 
        @input="(e) => { editTitles[idx] = e.target.value; }"
        @focus="focusIdx = idx" />
      <span class="icon-btn" v-show="idx !== focusIdx">
        <i class="mdi mdi-pencil"></i>
      </span>
      <span class="icon-btn" @click="confirmEdit(idx)" v-show="idx === focusIdx">
        <i class="mdi mdi-check"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NoteToolbar',
  props: {
    show: Boolean,
    labels: Array,
  },
  data() {
    return {
      labelTitle: '',
      editTitles: [],
      focusIdx: -1,
      hoverIdx: -1,
    };
  },
  computed: {
    labelParams() {
      return { title: this.labelTitle };
    },
    queryParams() {
      return {
        orders: {
          createTime: -1,
        },
      };
    },
    settings() {
      return {
        dialog: {
          actions: [{
            name: 'DONE',
            handler: this.closeDialog,
          }],
        },
      };
    },
  },
  methods: {
    ...mapActions({
      createLabel: 'labels/create',
      editLabel: 'labels/edit',
      removeLabel: 'labels/remove',
    }),
    async confirmCreate() {
      await this.createLabel({ body: this.labelParams, params: this.queryParams });
      this.labelTitle = '';
      this.editTitles = this.labels.map(l => l.title);
    },
    confirmEdit(idx) {
      this.editLabel({ id: this.labels[idx]._id, 
        body: { title: this.editTitles[idx] }, params: this.queryParams });
    },
    async confirmRemove(idx) {
      await this.removeLabel({ id: this.labels[idx]._id, 
        params: this.queryParams });
      this.editTitles.splice(idx, 1);
    },
  },
  watch: {
    show() {
      if (this.show) {
        this.editTitles = this.labels.map(l => l.title);
        this.focusIdx = -1;
        this.hoverIdx = -1;
        this.labelTitle = '';
      }
    },
  },
};
</script>

<style lang='less' scoped>
.label-edit-pane {
  width: 280px;
  max-height: 240px;
  padding: 20px 0;
  margin-bottom: 28px;
  border-bottom: 1px solid #ddd;
  overflow: auto;
  .label-row {
    margin: 10px 0;
    text-align: center;
    // margin: 0 auto;
  }
}
.label-title-input {
  display: inline-block;
  vertical-align: top;
  width: 160px;
  height: 26px;
  margin: 0 15px;
  font-size: 14px;
  border-bottom: 1px solid transparent;
  &:focus {
    border-bottom: 1px solid #ccc;
  }
}
.icon-btn {
  display: inline-block;
  height: 26px;
  padding: 0 4px;
  line-height: 26px;
  color: #6b6b6b;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: #221900;
  }
}
</style>
