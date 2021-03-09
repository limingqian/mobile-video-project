<template>
  <div class="home">
    <!-- <van-image
      width="100%"
      height="100%"
      :src="require('@/assets/first.mp4')"
    /> -->
    <div class="main">
      <div class="container">
        <div class="big-text">打造虚幻世界</div>
        <div class="small-text">
          虚幻引擎是全球最开放、最先进的实时3D创作平台。经过持续的改进。
        </div>
        <div class="small-text">
          它已经不仅仅是一款殿堂级的游戏引擎，还能为各行各业的专业人士带去无限的创作自由和空前的掌控力。
        </div>
        <div class="small-text">
          无论是前沿内容、互动体验还是沉浸式虚拟世界，一切尽在虚幻引擎
        </div>
      </div>
      <!-- @/assets/first.mp4 -->
      <!-- 微信不支持，用poster替代 -->
      <video
        class="bg_video"
        poster="@/assets/bizhi1.jpg"
        playsinline
        autoplay
        loop
        muted
      >
        <source src="@/assets/first.mp4" />
      </video>
    </div>
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
// import { courseList } from "./../api/course";

export default {
  name: "Home",
  components: {
    LmqClassList
  },
  // async mounted() {
  //   // 请求接口
  //   const response = await courseList({
  //     currentPage: this.currentPage,
  //     pageSize: this.pageSize
  //   });
  //   let result = response.data;
  //   console.log("===========");
  //   console.log(result);
  //   // console.log(this.currentPage);
  //   console.log("===========");
  // },
  data() {
    return {
      value: "",
      active: 0,
      showMore: true,
      currentPage: 1,
      pageSize: 10
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
.main {
  position: relative;
  height: 12rem;
  text-align: left;
}
.container {
  position: absolute;
  color: white;
  z-index: 1;
}
.bg_video {
  position: absolute;
  width: 100%;
  left: 0;
  margin-top: 0px;
  z-index: -1;
}
.big-text {
  margin: 3rem auto 0.6rem 2rem;
  font-size: 2rem;
}
.small-text {
  margin: auto 2rem auto 2rem;
  font-size: 0.55rem;
}
</style>
