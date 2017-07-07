<template>
  <div class="label-edit-pane">
    <div class="label-row">
      <span class="icon-btn" v-show="focusIdx !== -1"
        @click="initCreate">
        <i class="mdi mdi-plus"></i>
      </span>
      <span class="icon-btn" v-show="focusIdx === -1" @click="labelTitle = ''">
        <i class="mdi mdi-close"></i>
      </span>
      <input type="text" class="label-title-input" :class="{ 'mobile-input': isMobile }" 
        placeholder="Create new label" v-model="labelTitle" ref="labelTitle" @focus="focusIdx = -1" />
      <span class="icon-btn" @click="confirmCreate" :style="focusIdx !== -1 && { visibility: 'hidden'}">
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
      <input type="text" class="label-title-input" :class="{ 'mobile-input': isMobile }"
        :value="t" @input="(e) => { editTitles[idx] = e.target.value; }"
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
    ...mapGetters({
      isMobile: 'components/isMobile',
    }),
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
    initCreate() {
      this.focusIdx = -1;
      this.hoverIdx = -1;
      this.$refs.labelTitle.focus();
    },
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
        this.initCreate();
        this.labelTitle = '';
      }
    },
  },
};
</script>

<style lang='less' scoped>
.label-edit-pane {
  // width: 280px;
  max-height: 15rem;
  padding: 1.25rem;
  margin-bottom: 1.75rem;
  border-bottom: .07rem solid #ddd;
  overflow: auto;
  .label-row {
    margin: .625rem 0;
    // margin: 0 auto;
  }
}
.label-title-input {
  display: inline-block;
  vertical-align: top;
  width: 10rem;
  height: 1.625rem;
  margin: 0 1rem;
  font-size: .875rem;
  border-bottom: .07rem solid transparent;
  &:focus {
    border-bottom: .07rem solid #ccc;
  }
}
.icon-btn {
  display: inline-block;
  width: 1.625rem;
  height: 1.625rem;
  padding: 0 .25rem;
  line-height: 1.625rem;
  color: #6b6b6b;
  font-size: 1.125rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: #221900;
  }
}
</style>
