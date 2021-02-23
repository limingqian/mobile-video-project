<template>
  <div class="home">
    <van-image
      width="100%"
      height="100%"
      :src="require('@/assets/bizhi.jpeg')"
    />
    <!-- <van-row style="margin-top:-2rem"> -->
    <!-- <van-row style="">
      <van-col offset="3" span="18" type="flex" justify="center"> -->
    <!-- <van-search class="test" v-model="value" shape="round" placeholder="请输入搜索关键词" /> -->
    <!-- style=" margin:-45px auto; width:20rem;" -->
    <!-- <LmqSearch v-model="value" @search="doSearch" /> -->
    <!-- </van-col>
    </van-row> -->
    <!-- <van-grid direction="horizontal" :column-num="2" style="margin-top:1rem;background-color: #f2f2f2;">
        <van-grid-item icon="photo-o" text="在线课程" />
        <van-grid-item icon="photo-o" text="热门课程" />
      </van-grid> -->
    <!-- <div class="menu">
      <div class="item">
        <van-image width="2.5rem" height="2.5rem" :src="require('@/assets/icon/search.png')" />
        <div>在线课程</div>
      </div>
      <div class="item" @click="showHot()">
        <van-image width="2.5rem" height="2.5rem" :src="require('@/assets/icon/search.png')" />
        <div>热门课程</div>
      </div>
    </div> -->
    <!-- 热门课程列表 -->
    <LmqClassList :showMore="showMore" />
  </div>
</template>

<script>
// import LmqSearch from '@/components/search.vue';
import LmqClassList from "@/components/classList.vue";

export default {
  name: "Home",
  components: {
    LmqClassList
  },
  data() {
    return {
      value: "",
      active: 0,
      showMore: true
    };
  },
  methods: {
    doSearch(a) {
      this.value = a;
    },
    showHot() {
      this.$router.push("/hot");
    }
  }
};
</script>
<style scoped>
.menu {
  display: flex;
  /* height: 40vh; */
  width: 80vw;
  justify-content: space-around;
  margin: 1rem auto 0 auto;
}

.item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 10px;
  /* height: 20px; */
}
</style>
