<template>
  <div class="detail">
    <van-nav-bar title="VR全景制作" left-arrow @click-left="onClickLeft" />
    <!-- <van-image width="100%" height="100%" :src="require('@/assets/bizhi.jpeg')" /> -->
    <video-player
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
    >
    </video-player>
    <van-tabs v-model="active">
      <van-tab title="介绍">
        <div class="content">
          <div class="buffer" style="font-size:1.2rem;">VR全景制作</div>
          <div style="margin-left:1rem; font-size:0.6rem;">3人学习 / 0 评论</div>
        </div>
        <div style="text-align:left; margin:1rem 0.5rem 1rem 1rem;">
          有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建
          Router 实例的时候，在 routes 配置中给某个路由设置名称
        </div>
        <div class="line"></div>
        <div class="teacher">
          <div class="buffer" style="text-align:left;font-size:1.2rem;">讲师</div>
          <div class="text-container">
            <van-image class="buffer" round width="4rem" height="4rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
            <div class="text">
              <div style="font-size:1.2rem;">李老师</div>
              <div style="color:#00A2e0;">首席虚拟现实讲师</div>
              <div style="text-align:left;margin-top:1rem;margin-bottom:4rem;">
                有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建
                Router 实例的时候，在 routes 配置中给某个路由设置名称
              </div>
            </div>
          </div>
          111
        </div>
      </van-tab>
      <van-tab title="评价">内容 2</van-tab>
      <van-tab title="学过此课">内容 3</van-tab>
      <van-tab title="猜你想学">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';

import { videoPlayer } from 'vue-video-player';
export default {
  name: 'Detail',
  components: {
    videoPlayer
  },
  data() {
    return {
      active: 0,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 类型
            src: '' // url地址
          }
        ],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  mounted() {
    this.getVideo();
  },
  methods: {
    getVideo() {
      console.log('===========');
      console.log(this.$route.params.videoId);
      console.log('===========');
      this.playerOptions.sources[0].src = 'https://www.runoob.com/try/demo_source/movie.mp4';
    },
    onClickLeft() {
      this.$router.push('/List');
    },
    // listen event
    onPlayerPlay(player) {
      console.log('player play!', player);
    },
    onPlayerPause(player) {
      console.log('player pause!', player);
    },
    onPlayerEnded(player) {
      console.log(player);
    }
  }
};
</script>
<style scoped>
.line {
  width: 90%;
  height: 0.1rem;
  margin: 0 auto;
  background-color: #f0f0f0;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.buffer {
  margin-left: 1rem;
  margin-top: 1rem;
}

.text-container {
  display: flex;
  align-items: flex-start;
}

.text {
  width: 70vw;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
