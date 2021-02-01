<template>
  <div class="home">
    <van-image width="100%" height="100%" :src="require('@/assets/bizhi.jpeg')" />
    <!-- <van-row style="margin-top:-2rem"> -->
    <!-- <van-row style="">
      <van-col offset="3" span="18" type="flex" justify="center"> -->
    <!-- <van-search class="test" v-model="value" shape="round" placeholder="请输入搜索关键词" /> -->
    <!-- style=" margin:-45px auto; width:20rem;" -->
    <LmqSearch v-model="value" @search="doSearch" />
    <!-- </van-col>
    </van-row> -->
    <van-grid direction="horizontal" :column-num="2" style="margin-top:1rem">
      <van-grid-item icon="photo-o" text="在线课程" />
      <van-grid-item icon="photo-o" text="热门课程" />
    </van-grid>
    <LmqClassList />
    <van-button type="primary" @click="readMore">查看更多</van-button>
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">热门课程</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
import LmqSearch from '@/components/search.vue';
import LmqClassList from '@/components/classList.vue';

export default {
  name: 'Home',
  components: {
    LmqSearch,
    LmqClassList
  },
  data() {
    return {
      value: '',
      active: 0
    };
  },
  methods: {
    doSearch(a) {
      this.value = a;
    },
    readMore() {
      this.$router.push('/list')
    }
  }
};
</script>
<style scoped>
.test input {
  background: #fff;
}
</style>
