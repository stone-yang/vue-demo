<template>
  <menu :class="{ hide: !show }">
    <ul class="menu-section">
      <li class="menu-item">
        <i class="mdi mdi-lightbulb"></i>
        <span class="menu-item-text">Notes</span>
      </li>
    </ul>
    <ul class="menu-section">
      <li class="menu-item title">
        Lables
        <button type="button" class="menu-item-text" @click.stop="openDialog({ name: 'editLabel' })">EDIT</button>
      </li>
      <li class="menu-item" v-for="label in labels">
        <i class="mdi mdi-label"></i>
        <span class="menu-item-text">{{ label.title }}</span>
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

<style lang='less' scoped>
@import '../styles/main.less';
menu {
  position: fixed;
  float: left;
  margin-top: 64px;
  width: 266px;
}
.menu-section {
  padding: 8px 0;
}
.menu-section + .menu-section {
  border-top: #ccc 1px solid;
}
.menu-item {
  width: 264px;
  height: 48px;
  padding: 4px 0 4px 22px;
  line-height: 40px;
  color: #6b6b6b;
  font-family: 'Roboto', 'RobotoDraft', Arial, sans-serif;
  font-size: 14px;
  .mdi {
    font-size: 22px;
  }
  &.title {
    padding-right: 22px;
    color: @font-color-default;
    font-weight: bold;
    .menu-item-text {
      float: right;
      padding: 0 16px;
      font-weight: bold;
    }
  }
}
.menu-item-text {
  display: inline-block;
  vertical-align: top;
  height: 40px;
  padding-left: 32px;
  line-height: 40px;
}
.icon-btn {
  display: inline-block;
  padding: 10px 12px;
  color: #765700;
  font-size: 24px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: #221900;
  }
}
</style>
