<template>
  <div class="wrapper">
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
      <input type="text" placeholder="search" class="search-bar-field" />
      <div class="icon-btn search-clear">
        <i class="mdi mdi-close"></i>
      </div>
    </div>
    <div class="icon-btn refresh-icon">
      <i class="mdi mdi-refresh"></i>
    </div>
    <div class="icon-btn">
      <i class="mdi mdi-view-agenda"></i>
    </div>
    <!-- 
      <div class="icon-btn">
        <i class="mdi mdi-view-quilt"></i>
      </div>
    -->
    <div class="icon-btn">
      <i class="mdi mdi-apps"></i>
    </div>
    <div class="icon-btn">
      <i class="mdi mdi-bell"></i>
    </div>
    <div class="user-account">
      <i class="mdi mdi-account"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topbar',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<style lang='less' scoped>
.wrapper {
  position: fixed;
  z-index: 1000;
  background-color: #fb0;
  width: 100%;
  height: 64px;
  padding: 8px;

  > div {
    display: inline-block;
    vertical-align: top;
  }

  .search-bar {
    display: inline-block;
    height: 48px;
    width: 56%;
    margin-right: 30px;
    background-color: #f5b400;
    border-radius: 4px;
    vertical-align: top;
    .search-clear {
      float: right;
    }
  }
  .search-bar-field {
    vertical-align: top;
    height: 48px;
    width: 80%;
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
  color: #765700;
  font-size: 24px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: #221900;
  }
}
.top-title {
  // font-family: 'Roboto', 'RobotoDraft', Arial, sans-serif;
  height: 48px;
  padding-left: 16px;
  padding-right: 32px;
  line-height: 48px;
  font-size: 22px;
}
</style>
