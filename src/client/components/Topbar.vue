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
    <div class="user-account">
      <i class="mdi mdi-account"></i>
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
@import '../styles/main.less';
.topbar {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 64px;
  padding: 8px;
  background-color: @theme-color-yellow;
  transition: background-color 0.4s ease-in;

  > div {
    display: inline-block;
    vertical-align: top;
  }

  .search-bar {
    display: inline-block;
    height: 48px;
    width: 56%;
    margin-right: 30px;
    border-radius: 4px;
    vertical-align: top;
    background-color: #f5b400;
    transition: background-color 0.4s ease-in;
    .search-clear {
      float: right;
    }
  }
  .search-bar-field {
    vertical-align: top;
    height: 48px;
    width: 80%;
    color: #e0e0e0;
  }

  .user-account {
    float: right;
    width: 32px;
    height: 32px;
    margin: 7px 10px;
    line-height: 32px;
    text-align: center;
    background-color: #00897b;
    border-radius: 50%;
    i {
      font-size: 18px;
      color: #c9dcda;
    }
  }
}
.icon-btn {
  display: inline-block;
  padding: 10px 12px;
  // color: #765700;
  font-size: 24px;
  border-radius: 50%;
  cursor: pointer;
}
.top-title {
  // font-family: 'Roboto', 'RobotoDraft', Arial, sans-serif;
  height: 48px;
  padding-left: 16px;
  padding-right: 32px;
  line-height: 48px;
  font-size: 22px;
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
