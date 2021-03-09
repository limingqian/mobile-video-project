<template>
  <div class="classList">
    <van-nav-bar title="VR全景制作" left-arrow @click-left="onClickLeft" />
    <div class="listItem">
      <div class="itemTitle">
        <span class="verticalLine"></span>
        <span class="itemTitleText">热门课程</span>
      </div>
      <div class="itemList">
        <div v-for="item in items" :key="item.courseId">
          <div class="item">
            <van-image
              width="80vw"
              height="16vh"
              :src="item.logo"
              @click="showDetail(item.courseId)"
            />
            <div class="item-content">
              <div style="width:100%">
                <span class="videoTitle">{{ item.courseName }}</span>
                <van-image
                  style="float:right;top:1rem;right:1rem"
                  width="1.2rem"
                  height="1.2rem"
                  :src="item.collect"
                  @click="changeCollect(item)"
                />
              </div>
              <div class="text">
                <div>
                  {{ item.pageBuycount }}人学习 / {{ item.pageBuycount }} 评论
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-button class="more" v-if="showMore" @click="readMore"
      >查看更多</van-button
    >
  </div>
</template>
<script>
import { myCourseList } from "./../api/course";
import { myCollection, collect, cancelCollect } from "./../api/collect";
import storage from "../utils/storage";
import { baseUrl } from "../utils";
import { Toast } from "vant";
export default {
  name: "lmqClassList",
  async mounted() {
    this.userId = storage.get("userId");
    // 请求接口
    this.items = await this.courseList1();
  },
  data() {
    let a = require("@/assets/cancel.png");
    let b = require("@/assets/collect.png");
    return {
      currentPage: 1,
      pageSize: 6,
      type: this.$route.params.type,
      selfValue: this.value,
      size: "20.28M",
      a,
      b,
      items: [],
      userId: ""
    };
  },
  props: {
    value: {
      type: String,
      default: () => {
        return "";
      }
    },
    showMore: {
      type: Boolean,
      default: () => {
        return true;
      }
    }
  },
  methods: {
    async courseList1() {
      let condition = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        userId: this.userId
      };

      let response = "";
      if (this.type === "mycourse") {
        response = await myCourseList(condition);
      } else {
        response = await myCollection(condition);
      }

      let result = response.data;
      if (result.success) {
        if (result.entity != null) {
          return result.entity.map(item => {
            return {
              courseId: item.courseId,
              courseName: item.courseName,
              pageBuycount: item.pageBuycount,
              addTime: new Date(parseInt(item.addTime))
                .toLocaleString()
                .replace(/:\d{1,2}$/, " "),
              logo: baseUrl + item.logo,
              collectJudge: false, // TODO 收藏
              collect: this.a
            };
          });
        }
      }
      return [];
    },
    async readMore() {
      this.currentPage += 1;
      let tempItems = await this.courseList1();
      if (tempItems.length > 0) {
        this.items = this.items.concat(tempItems);
      } else {
        this.currentPage -= 1;
        Toast("以上是全部课程");
      }
    },
    showDetail(courseId) {
      this.$router.push("/detail/" + courseId);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    async changeCollect(item) {
      item.collectJudge = !item.collectJudge;
      if (item.collectJudge) {
        // 调接口
        let result = await collect({
          userId: this.userId,
          courseId: item.courseId
        });
        // 收藏成功
        if (result.data.success) {
          item.collect = this.b;
          this.$toast("收藏成功");
        }
        // 不可能出现重复收藏的情况
      } else {
        // 取消收藏 favouriteId TODO
        let result = await cancelCollect({ id: 31 });
        if (result.data.success) {
          item.collect = this.a;
          this.$toast("取消收藏");
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.classList {
  background-color: white;
  width: 95vw;
  // height: 50vh;
  display: inline-block;
  margin: 0 auto 1rem auto;
}
.more {
  width: 40%;
  color: white;
  background-color: black;
  margin-bottom: 3rem;
}

.listItem {
  width: 95vw;
  /* height: 30vh; */
  border: black;
  margin: 10px auto;
  box-shadow: darkgrey 1px 3px 5px 2px;
}

.itemTitle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.itemTitleText {
  font-size: 1rem;
}

.verticalLine {
  /*竖线*/
  display: inline-block;
  border: none;
  width: 0.4vw;
  background: #009cd4;
  margin: 0.6rem;
  height: 1.2rem;
}

.itemList {
  display: flex;
  flex-wrap: wrap;
  padding: auto;
}

.item {
  width: 84vw;
  height: 24vh;
  /* border: 1px solid red; */
  flex: 0 0 48%;
  margin-left: 2.5vw;
  margin-bottom: 2vw;
  margin-right: 2vw;
}

.videoTitle {
  float: left;
  margin-left: 0.2rem;
  font-size: 0.8rem;
}
.videoButton {
  float: right;
  margin-right: 0.2rem;
  font-size: 0.6rem;
  height: 1.2rem;
  width: 3.2rem;
}

.item-content {
  display: flex;
  flex-wrap: wrap;
}

.text {
  display: flex;
  flex-direction: column;
  font-size: 0.7rem;
  text-align: left;
}
</style>
