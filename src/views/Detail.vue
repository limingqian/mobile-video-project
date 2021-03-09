<template>
  <div class="detail">
    <van-nav-bar title="VR全景制作" left-arrow @click-left="onClickLeft" />
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
    >
    </video-player>
    <van-tabs v-model="active">
      <!-- 介绍 -->
      <van-tab title="介绍">
        <div class="content">
          <div class="buffer" style="font-size:1.2rem;">
            {{ introduction.title }}
            <van-image
              style="float:right;top:0.6rem;left:14rem"
              width="1.6rem"
              height="1.6rem"
              :src="collect"
              @click="changeCollect()"
            />
          </div>
          <div style="margin-left:1rem; font-size:0.6rem;">
            {{ introduction.subTitle }}
          </div>
        </div>
        <!-- white-space:pre-line; 处理换行 -->
        <div
          style="text-align:left;margin:1rem 0.5rem 1rem 1rem;white-space:pre-line;"
        >
          {{ introduction.content }}
        </div>
        <div class="line"></div>
        <div class="teacher">
          <div class="buffer" style="text-align:left;font-size:1.2rem;">
            讲师
          </div>
          <div class="text-container">
            <van-image
              class="buffer"
              round
              width="4rem"
              height="4rem"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="text">
              <div style="font-size:1.2rem;">{{ teacher.name }}</div>
              <div style="color:#00A2e0;">{{ teacher.position }}</div>
              <div style="text-align:left;margin-top:1rem;margin-bottom:4rem;">
                {{ teacher.introduction }}
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <!-- 评价 -->
      <van-tab title="评价">
        <div class="margin-bottom">
          <div v-for="item in items" :key="item.id">
            <!-- 评价组件 -->
            <div class="comment-container">
              <van-image
                class="buffer"
                round
                width="4rem"
                height="4rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
              <div class="comment-text">
                <div style="text-align:left;margin-top:1rem;">
                  {{ item.name }}
                  <span style="font-size:0.8rem;margin-left:1rem;">
                    {{ item.time }}
                  </span>
                </div>
                <van-field
                  v-model="item.content"
                  readonly
                  autosize
                  type="textarea"
                />
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </van-tab>
      <!-- 学过此课 -->
      <van-tab title="学过此课">
        <div class="people-container margin-bottom">
          <div v-for="item in items" :key="item.id">
            <div class="people-item">
              <van-image
                round
                width="4rem"
                height="4rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
              {{ item.name }}
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";

import { videoPlayer } from "vue-video-player";
import { courseDetail } from "./../api/course";
export default {
  name: "Detail",
  components: {
    videoPlayer
  },
  data() {
    return {
      collectJudge: false, // TODO
      collect: require("@/assets/cancel.png"),
      active: 0,
      introduction: {
        title: "",
        subTitle: "",
        content: ""
      },
      teacher: {
        name: "李老师",
        position: "首席虚拟现实讲师",
        introduction:
          "有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称"
      },
      items: [
        {
          id: 2,
          name: "小王2",
          time: "2020-02-01",
          content: "hahahahahahhahaha"
        },
        {
          id: 3,
          name: "小王3",
          time: "2020-02-01",
          content: "hahahahahahhahaha"
        }
      ],
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        controls: true,
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "" // url地址
          }
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
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
  async mounted() {
    await this.getVideo();
  },
  methods: {
    async getVideo() {
      let resultTemp = await courseDetail({
        courseId: this.$route.params.courseId
      });
      let result = resultTemp.data;
      if (result.success) {
        let entity = result.entity;
        this.introduction.title = entity.courseName;
        this.introduction.subTitle =
          entity.pageBuycount + "人学习 / " + entity.pageBuycount + " 评论";
        entity.context = entity.context.replace(/<p>/g, "");
        entity.context = entity.context.replace(/<\/p>/g, "");

        this.introduction.content = entity.context;
      }

      this.playerOptions.sources[0].src =
        "https://www.runoob.com/try/demo_source/movie.mp4";
    },
    onClickLeft() {
      // this.$router.push('/List');
      this.$router.go(-1);
    },
    // listen event
    onPlayerPlay(player) {
      console.log("player play!", player);
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    onPlayerEnded(player) {
      console.log(player);
    },
    changeCollect() {
      this.collectJudge = !this.collectJudge;
      if (this.collectJudge) {
        // 收藏成功
        this.collect = require("@/assets/collect.png");
        this.$toast("收藏成功");
        // 调接口 TODO
      } else {
        // 取消收藏
        this.collect = require("@/assets/cancel.png");
        this.$toast("取消收藏");
        // 调接口 TODO
      }
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
.margin-bottom {
  /* 评论最后一条和底部的距离 */
  margin-bottom: 4rem;
}
.comment-container {
  display: flex;
}

.comment-text {
  width: 70vw;
  margin-left: 1rem;
  font-size: 1.2rem;
}
.people-container {
  display: flex;
  flex-wrap: wrap;
}
.people-item {
  display: flex;
  flex-direction: column;
  margin: 1rem 0.5rem;
}
</style>
