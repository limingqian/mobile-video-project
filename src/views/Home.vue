<template>
  <div class="home">
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
      <!-- <video
        class="bg_video"
        poster="@/assets/vr.jpeg"
        playsinline
        autoplay
        loop
        muted
      >
        <source src="@/assets/first.mp4" />
      </video> -->
      <van-image
        class="bg_video"
        width="100%"
        height="18rem"
        fit="fill"
        :src="background"
      />
    </div>
    <!-- 热门课程列表 -->
    <LmqClassList :showMore="showMore" />
  </div>
</template>

<script>
import LmqClassList from "@/components/classList.vue";
import background from "../assets/background.gif";
export default {
  name: "Home",
  components: {
    LmqClassList
  },
  data() {
    return {
      value: "",
      active: 0,
      showMore: true,
      currentPage: 1,
      pageSize: 10,
      background
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
