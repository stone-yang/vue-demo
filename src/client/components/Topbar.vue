<template>
  <section class="topbar" :class="`theme-${themeColor}`">
    <div class="icon-btn menu-icon" @click="$emit('toggleMenu')">
      <i class="mdi mdi-menu"></i>
    </div>
    <div class="top-title">
      <b>Google</b> Keep
    </div>
    <div class="search-bar">
      <div class="icon-btn">
        <i class="mdi mdi-magnify"></i>
      </div>
      <input type="text" placeholder="search" class="search-bar-field"
        @focus="$emit('searchbarFocus')" />
      <div class="icon-btn search-clear">
        <i class="mdi mdi-close"></i>
      </div>
    </div>
    <div class="user-account">
      <i class="mdi mdi-account"></i>
    </div>
    <div class="tools-bar-fullwidth">
      <div class="icon-btn refresh-icon">
        <i class="mdi mdi-refresh"></i>
      </div>
      <div class="icon-btn" v-show="layout === 1"
        @click="$emit('switchLayout')">
        <i class="mdi mdi-view-quilt"></i>
      </div>
      <div class="icon-btn" v-show="layout === 0"
        @click="$emit('switchLayout')">
        <i class="mdi mdi-view-agenda"></i>
      </div>
      <div class="icon-btn">
        <i class="mdi mdi-apps"></i>
      </div>
      <div class="icon-btn">
        <i class="mdi mdi-bell"></i>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Topbar',
  props: {
    themeColor: String,
    layout: Number,
  },
};
</script>

<style lang='less' scoped>
@import '../styles/consts.less';
.topbar {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 4rem;
  padding: .5rem;
  background-color: @theme-color-yellow;
  transition: background-color 0.4s ease-in;

  > div {
    display: inline-block;
    vertical-align: top;
  }

  .search-bar {
    display: inline-block;
    height: 3rem;
    width: calc(~'100% - 34rem');
    max-width: 42rem;
    margin-right: 1.875rem;
    border-radius: .25rem;
    vertical-align: top;
    background-color: #f5b400;
    transition: background-color 0.4s ease-in;
    .search-clear {
      float: right;
    }
  }
  .search-bar-field {
    vertical-align: top;
    height: 3rem;
    width : calc(~'100% - 120px');
    color: #e0e0e0;
  }

  .tools-bar-fullwidth, .tools-bar-short {
    float: right;
  }

  .user-account {
    float: right;
    width: 2rem;
    height: 2rem;
    margin: .4rem .6rem;
    margin-left: 1.6rem;
    line-height: 2rem;
    text-align: center;
    background-color: #00897b;
    border-radius: 50%;
    i {
      font-size: 1.125rem;
      color: #c9dcda;
    }
  }
}
.icon-btn {
  display: inline-block;
  padding: .6rem .75rem;
  font-size: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
}
.top-title {
  // font-family: 'Roboto', 'RobotoDraft', Arial, sans-serif;
  height: 3rem;
  padding-left: 1rem;
  padding-right: 2rem;
  line-height: 3rem;
  font-size: 1.4rem;
}
.theme-yellow {
  background-color: @theme-color-yellow;
  color: #765700;
  .icon-btn:hover {
    color: #221900;
  }
  .search-bar {
    background-color: #f5b400;
  }
}
.theme-cerulean {
  background-color: @theme-color-cerulean;
  color: #fff;
  .icon-btn:hover {
    color: #e0e0e0;
  }
  .search-bar {
    background-color: #7a929e;
  }
}
.theme-dark-blue {
  background-color: @theme-color-dark-blue;
  color: #fff;
  .icon-btn:hover {
    color: #e0e0e0;
  }
  .search-bar {
    background-color: #5d6cc0;
  }
}
</style>
