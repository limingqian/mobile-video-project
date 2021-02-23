<template>
  <div class="classList">
    <van-nav-bar title="VR全景制作" left-arrow @click-left="onClickLeft" />
    <div class="listItem">
      <div class="itemTitle">
        <span class="verticalLine"></span>
        <span class="itemTitleText">热门课程</span>
      </div>
      <div class="itemList">
        <div v-for="item in items" :key="item.id">
          <div class="item">
            <van-image
              width="84vw"
              height="14vh"
              :src="require('@/assets/bizhi.jpeg')"
              @click="showDetail(item.id)"
            />
            <div class="item-content">
              <div style="width:100%">
                <span class="videoTitle">{{ item.name }}</span>
                <van-image
                  style="float:right;top:1rem;right:1rem"
                  width="1.2rem"
                  height="1.2rem"
                  :src="item.collect"
                  @click="changeCollect(item)"
                />
              </div>
              <div class="text">
                <!-- style="margin-left:0.2rem;font-size:0.7rem;" -->
                <div>上传时间：{{ time }}</div>
                <div>资源大小：{{ size }}</div>
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
export default {
  name: "lmqClassList",
  data() {
    let a = require("@/assets/cancel.png");
    let b = require("@/assets/collect.png");
    return {
      selfValue: this.value,
      time: "2021/01/21 16:40",
      size: "20.28M",
      a,
      b,
      items: [
        { id: 1, name: "VR全景制作", collectJudge: true, collect: b },
        { id: 2, name: "VR全景制作", collectJudge: false, collect: a },
        { id: 3, name: "VR全景制作", collectJudge: false, collect: a },
        { id: 4, name: "VR全景制作", collectJudge: false, collect: a },
        { id: 5, name: "VR全景制作", collectJudge: false, collect: a },
        { id: 6, name: "VR全景制作", collectJudge: false, collect: a },
        { id: 7, name: "VR全景制作", collectJudge: false, collect: a },
        { id: 8, name: "VR全景制作", collectJudge: false, collect: a },
        { id: 9, name: "VR全景制作", collectJudge: false, collect: a }
      ]
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
    readMore() {
      // this.$router.push('/list');
    },
    showDetail(videoId) {
      console.log("====videoId=======");
      console.log(videoId);
      console.log("=====videoId======");

      this.$router.push("/detail/" + videoId);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    changeCollect(item) {
      item.collectJudge = !item.collectJudge;
      if (item.collectJudge) {
        // 收藏成功
        item.collect = this.b;
        this.$toast("收藏成功");
        // 调接口 TODO
      } else {
        // 取消收藏
        item.collect = this.a;
        this.$toast("取消收藏");
        // 调接口 TODO
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
