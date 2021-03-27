<template>
  <div class="detail">
    <van-nav-bar title="" left-arrow @click-left="onClickLeft" />
    <van-tabs>
      <van-tab v-for="i in playerOptions" :title="i.name" :key="i.id">
        <video-player
          v-if="i.fileType === 'VIDEO'"
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="i"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
        >
        </video-player>
        <van-button
          class="more"
          v-if="i.fileType != 'VIDEO'"
          @click="readPPT(i)"
          >查看文档</van-button
        >
      </van-tab>
    </van-tabs>
    <van-tabs v-model="active">
      <!-- 介绍 -->
      <van-tab title="介绍">
        <div class="content">
          <div class="buffer" style="font-size:1.2rem;">
            {{ introduction.title }}
          </div>
          <div style="margin-left:1rem; font-size:0.6rem;">
            {{ introduction.subTitle }}
            <van-image
              style="float:right;top:-1rem;left:14rem"
              width="1.6rem"
              height="1.6rem"
              :src="collect"
              @click="changeCollect()"
            />
          </div>
        </div>
        <div ref="contentInner"></div>
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
              :src="teacher.img"
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
                :src="item.img"
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
          <div v-for="item in learnItems" :key="item.id">
            <div class="people-item">
              <van-image round width="4rem" height="4rem" :src="item.img" />
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
import { courseDetail, learnList, couComment } from "./../api/course";
import { baseUrl } from "../utils";
import storage from "../utils/storage";
import { collect, cancelCollect } from "../api/collect";
export default {
  name: "Detail",
  components: {
    videoPlayer
  },
  data() {
    let a = require("@/assets/cancel.png");
    let b = require("@/assets/collect.png");
    return {
      a,
      b,
      courseId: "",
      collectJudge: false,
      collect: a,
      active: 0,
      introduction: {
        title: "",
        subTitle: "",
        content: ""
      },
      teacher: {
        name: "",
        img: "",
        position: "",
        introduction: ""
      },
      items: [],
      learnItems: [],
      playerOptions: [],
      flatArray: [],
      userId: ""
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  async mounted() {
    this.userId = storage.get("userId");
    await this.getVideo();
    // 获取学过此课的人
    let learnArray = await learnList({ courseId: this.courseId });
    learnArray = learnArray.data.entity;
    learnArray.forEach(item => {
      let name = item.userShowName;
      if (item.userShowName.length > 5) {
        name = item.userShowName.slice(0, 4) + "...";
      }
      this.learnItems.push({
        name: name,
        img: item.userImg || require("@/assets/head.jpeg")
      });
    });
    // 获取评论列表 currentPage pageSize
    let tempItems = await couComment({
      courseId: this.courseId,
      currentPage: 1,
      pageSize: 200
    });
    let id = 0;
    tempItems.data.entity.commentList.forEach(item => {
      this.items.push({
        id: ++id,
        name: item.userName,
        time: new Date(parseInt(item.addTime))
          .toLocaleString()
          .replace(/:\d{1,2}$/, " "),
        content: item.content,
        img: item.picImg || require("@/assets/head.jpeg")
      });
    });
  },
  methods: {
    creatObj(url, name, id, fileType) {
      return {
        fileType,
        id,
        name,
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
            src: baseUrl + url // url地址
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
      };
    },
    traverseTree(item) {
      // 视频是个树状结构，遍历
      if (item.kpointType === 1) {
        this.flatArray.push(item);
      } else {
        for (let i = 0; i < item.kpointList.length; i++) {
          this.traverseTree(item.kpointList[i]);
        }
      }
    },
    async getVideo() {
      this.courseId = this.$route.params.courseId;
      let resultTemp = await courseDetail({
        courseId: this.$route.params.courseId,
        userId: this.userId
      });

      let result = resultTemp.data;
      if (result.success) {
        let entity = result.entity;
        this.favoritesId = entity.fid;
        if (entity.fid > 0) {
          this.collectJudge = true;
          this.collect = this.b;
        } else {
          this.collectJudge = false;
          this.collect = this.a;
        }

        this.introduction.title = entity.courseName;
        this.introduction.subTitle =
          entity.pageBuycount + "人学习 / " + entity.pageBuycount + " 评论";
        this.$refs.contentInner.innerHTML = entity.context; // 直接赋值 innerHTML
        this.introduction.content = entity.context;
        // 讲师信息

        if (entity.teacher) {
          this.teacher.img = baseUrl + entity.teacher.picPath;
          this.teacher.name = entity.teacher.name;
          this.teacher.position = entity.teacher.education;
          this.teacher.introduction = entity.teacher.career;
        }

        let kpointList = entity.kpointList;
        // 遍历 结果放到this.flatArray里
        for (let i = 0; i < kpointList.length; i++) {
          this.traverseTree(kpointList[i]);
        }
        for (let i = 0; i < this.flatArray.length; i++) {
          this.playerOptions.push(
            this.creatObj(
              this.flatArray[i].videoUrl,
              this.flatArray[i].name,
              this.flatArray[i].kpointId,
              this.flatArray[i].fileType
            )
          );
        }
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // listen event
    onPlayerPlay(player) {
      if (!this.$store.state.isLogin) {
        this.$toast("请先登录");
        this.$router.push("/login");
        return;
      }
      console.log("player play!", player);
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    onPlayerEnded(player) {
      console.log(player);
    },
    async changeCollect() {
      if (!this.$store.state.isLogin) {
        this.$toast("请先登录");
        return;
      }
      this.collectJudge = !this.collectJudge;
      if (this.collectJudge) {
        // 收藏成功
        this.collect = this.b;
        this.$toast("收藏成功");
        let result = await collect({
          userId: this.userId,
          courseId: this.courseId
        });
        // 收藏成功
        this.collect = this.b;
        this.favoritesId = result.data.entity.id;
        if (result.data.success) {
          this.$toast("收藏成功");
        }
      } else {
        // 取消收藏
        this.collect = this.a;
        this.$toast("取消收藏");
        // 调接口
        let result = await cancelCollect({ id: this.favoritesId });
        if (result.data.success) {
          this.$toast("取消收藏成功");
        }
      }
    },
    readPPT(item) {
      let url =
        "https://view.officeapps.live.com/op/view.aspx?src=" +
        item.sources[0].src;

      // window.open(url.replace("/api", ""));
      window.open(url);
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
  margin-left: 1rem;
}
.people-item {
  display: flex;
  flex-direction: column;
  margin: 1rem 0.5rem;
}
.more {
  width: 30%;
  color: white;
  background-color: #ff9571;
  /* margin-bottom: 3rem; */
  margin: 1rem auto 1rem auto;
}
</style>
