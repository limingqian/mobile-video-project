<template>
  <div class="classList">
    <div class="listItem">
      <div class="itemTitle">
        <span class="verticalLine"></span>
        <span class="itemTitleText">热门课程</span>
      </div>
      <div class="itemList">
        <div v-if="items.length === 0" style="margin:2rem auto">暂无课程</div>
        <div v-for="item in items" :key="item.courseId">
          <div class="item">
            <van-image
              width="42vw"
              height="14vh"
              :src="item.logo"
              @click="showDetail(item.courseId)"
            />
            <div class="item-content">
              <div style="width:100%">
                <span class="videoTitle">{{ item.courseName }}</span>
                <van-image
                  style="float:right;top:0.6rem;right:1rem"
                  width="1.2rem"
                  height="1.2rem"
                  :src="item.collect"
                  @click="changeCollect(item)"
                />
              </div>
              <div style="margin-left:0.2rem;font-size:0.7rem;">
                {{ item.pageViewcount }}人学习 / {{ item.commentCount }} 评论
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-button
      class="more"
      v-if="showMore && items.length > 0"
      @click="readMore"
      >查看更多</van-button
    >
  </div>
</template>

<script>
import { courseList } from "./../api/course";
import { baseUrl } from "../utils";
import { Toast } from "vant";
import storage from "../utils/storage";
import { collect, cancelCollect } from "../api/collect";
export default {
  name: "lmqClassList",
  async mounted() {
    // 清空条件
    this.subjectId = "";
    this.teacherId = "";
    this.courseName = "";
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
      a,
      b,
      items: [],
      subjectId: "",
      teacherId: "",
      courseName: "",
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
    async readMore() {
      this.currentPage += 1;
      let tempItems = await this.courseList1({
        subjectId: this.subjectId,
        teacherId: this.teacherId,
        courseName: this.courseName
      });
      if (tempItems.length > 0) {
        this.items = this.items.concat(tempItems);
      } else {
        this.currentPage -= 1;
        Toast("以上是全部课程");
      }
    },
    async courseList1(param) {
      let condition = {
        userId: this.userId,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      if (param) {
        let paramArray = Object.keys(param);
        for (let i = 0; i < paramArray.length; i++) {
          if (param[paramArray[i]]) {
            condition[paramArray[i]] = param[paramArray[i]];
          }
        }
      }

      const response = await courseList(condition);
      let result = response.data;
      if (result.success) {
        if (result.entity.courseList != null) {
          return result.entity.courseList.map(item => {
            // console.log("++++++++++");
            // console.log(item.courseId);
            // console.log(item.isFavorites);
            // console.log(item.isFavorites > 0);
            // console.log("++++++++++");

            return {
              courseId: item.courseId,
              courseName: item.courseName,
              pageViewcount: item.pageViewcount,
              commentCount: item.commentCount || 0,
              logo: baseUrl + item.logo,
              isFavorites: item.isFavorites,
              collectJudge: item.isFavorites > 0,
              collect: item.isFavorites > 0 ? this.b : this.a
            };
          });
        }
      }
      return [];
    },
    showDetail(courseId) {
      this.$router.push("/detail/" + courseId);
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
        item.collect = this.b;
        if (result.data.success) {
          this.$toast("收藏成功");
        }
      } else {
        // 取消收藏
        item.collect = this.a;
        this.$toast("取消收藏");

        // 调接口 TODO
        let result = await cancelCollect({ id: 31 });
        console.log("++++取消++++++");
        console.log(result);
        console.log("++++取消++++++");
      }
    },
    async changeSub(subjectId) {
      if (!subjectId) {
        this.currentPage = 1;
      }
      this.subjectId = subjectId;
      this.items = await this.courseList1({
        subjectId: this.subjectId,
        teacherId: this.teacherId,
        courseName: this.courseName
      });
    },
    async changeSearch(courseName) {
      if (!courseName) {
        this.currentPage = 1;
      }
      this.courseName = courseName;
      this.items = await this.courseList1({
        subjectId: this.subjectId,
        teacherId: this.teacherId,
        courseName: this.courseName
      });
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
  margin: auto auto 10px auto;
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
  width: 42vw;
  height: 20vh;
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
</style>
