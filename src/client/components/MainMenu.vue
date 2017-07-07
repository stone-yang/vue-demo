<template>
  <menu class="main-menu" :class="{ 'show': show }">
    <ul class="menu-section">
      <li class="menu-item">
        <router-link to="/notes">
          <i class="mdi mdi-lightbulb"></i>
          <span class="menu-item-text">Notes</span>
        </router-link>
      </li>
    </ul>
    <ul class="menu-section">
      <li class="menu-item title">
        Lables
        <button type="button" class="menu-item-text" @click.stop="openDialog({ name: 'editLabel' })">EDIT</button>
      </li>
      <li class="menu-item" v-for="(label, idx) in labels" :key="idx">
        <router-link :to="`/label/${label.title}`">
          <i class="mdi mdi-label"></i>
          <span class="menu-item-text">{{ label.title }}</span>
        </router-link>
      </li>
    </ul>
    <!-- note edit dialog -->
    <app-dialog :show="dialog.editLabel || false" @hide="() => dialog.editLabel && closeDialog()"
      :actions="settings.dialog.actions" title="Edit Labels">
      <div class="label-dialog-wrapper">
        <LabelEditPane :show="dialog.editLabel || false" :labels="labels" />
      </div>
    </app-dialog>
  </menu>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Router from 'vue-router';
import AppDialog from '@/components/Dialog';
import LabelEditPane from '@/components/LabelEditPane';

export default {
  name: 'MainMenu',
  props: ['show'],
  components: { AppDialog, LabelEditPane },
  mounted() {
    this.queryLabels({ orders: { createTime: -1 } });
  },
  computed: {
    ...mapGetters({
      mainMenu: 'components/mainMenu',
      dialog: 'components/dialog',
      labels: 'labels/all',
    }),
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
    ...mapMutations({
      openDialog: 'components/openDialog',
      closeDialog: 'components/closeDialog',
      toggleMenu: 'components/toggleMainMenu',
    }),
    ...mapActions({
      queryLabels: 'labels/query',
    }),
  },
};
</script>

<style lang='less'>
@import '../styles/consts.less';
.main-menu {
  position: fixed;
  // float: left;
  left: calc(-@menu-width - 2);
  margin-top: 4rem;
  width: @menu-width;
  min-height: 100%;
  overflow: auto;
  z-index: 1000;
  background-color: #e2e2e2;
  box-shadow: 0 .4rem .4rem 0 rgba(0,0,0,0.3);
  transition: left 0.4s ease-in;
  &.show {
    left: 0;
  }
}
.menu-section {
  padding: .5rem 0;
}
.menu-section + .menu-section {
  border-top: #ccc .07rem solid;
}
.main-menu .menu-item {
  width: 16.4rem;
  height: 3rem;
  padding: .25rem 0 .25rem 1.4rem;
  line-height: 2.5rem;
  color: #6b6b6b;
  font-family: 'Roboto', 'RobotoDraft', Arial, sans-serif;
  font-size: .875rem;
  .mdi {
    font-size: 1.375rem;
  }
  &.title {
    padding-right: 1.375rem;
    color: @font-color-default;
    font-weight: bold;
    .menu-item-text {
      float: right;
      padding: 0 1rem;
      font-weight: bold;
    }
  }
  a { 
    display: inline-block;
    width: 100%; 
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
  .menu-item-text {
    display: inline-block;
    vertical-align: top;
    height: 2.5rem;
    padding-left: 2rem;
    line-height: 2.5rem;
  }
}
</style>

<style lang='less' scoped>
.icon-btn {
  display: inline-block;
  padding: .6rem .75rem;
  color: #765700;
  font-size: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: #221900;
  }
}
</style>
