<template>
  <div id="app">
    <router-view />
    <!-- 底部tabbar -->
    <van-tabbar v-if="isLogin" v-model="active" @change="changeTab">
      <van-tabbar-item icon="home-o" replace to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/list"
        >热门课程</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" replace to="/mine"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    isLogin() {
      if (window.location.href.split("/").indexOf("login") > -1) {
        return false;
      }
      // return this.$store.state.isLogin;
      return true;
    },
    active: {
      get() {
        return this.$store.state.activeItem;
      },
      set(v) {
        this.$store.commit("changeActive", v);
      }
    }
  },
  methods: {
    changeTab(n) {
      this.$store.commit("changeActive", n);
    }
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
