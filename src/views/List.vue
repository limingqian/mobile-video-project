<template>
  <div class="list">
    <!-- <van-nav-bar title="VR全景制作" left-arrow @click-left="onClickLeft" /> -->
    <van-nav-bar title="VR全景制作" />
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
    <div class="listItem">
      <div class="itemTitle">
        <span class="verticalLine"></span>
        <span class="itemTitleText">热门课程</span>
      </div>

      <div class="itemList">
        <div v-for="item in items" :key="item.id">
          <!-- 封装为组件 -->
          <div class="item" @click="showDetail(item.id)">
            <van-image width="42vw" height="14vh" :src="require('@/assets/bizhi.jpeg')" />
            <div class="item-content">
              <div style="width:100%">
                <span class="videoTitle">{{ item.name }}</span>
                <van-button class="videoButton" type="warning" @click="showDetail">
                  推荐
                </van-button>
              </div>
              <div style="margin-left:0.2rem;font-size:0.7rem;">
                3人学习 / 0 评论
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-button type="primary" @click="showDetail">查看详情</van-button>
  </div>
</template>

<script>
export default {
  name: 'List',
  components: {},
  data() {
    return {
      value: '',
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部班型', value: 0 },
        { text: '大班', value: 1 },
        { text: '小班', value: 2 }
      ],
      option2: [
        { text: '全部讲师', value: 'a' },
        { text: '李老师', value: 'b' },
        { text: '刘老师', value: 'c' }
      ],
      items: [
        { id: 1, name: 'VR全景制作' },
        { id: 2, name: 'VR全景制作' },
        { id: 3, name: 'VR全景制作' },
        { id: 4, name: 'VR全景制作' },
        { id: 5, name: 'VR全景制作' },
        { id: 6, name: 'VR全景制作' },
        { id: 7, name: 'VR全景制作' },
        { id: 8, name: 'VR全景制作' },
        { id: 9, name: 'VR全景制作' }
      ]
    };
  },
  methods: {
    // onClickLeft() {
    //   this.$store.commit("changeActive", 0);
    //   this.$router.push('/');
    // },
    showDetail(videoId) {
      console.log('====videoId=======');
      console.log(videoId);
      console.log('=====videoId======');

      this.$router.push('/detail/' + videoId);
    }
    // showDetail() {
    //   this.$store.commit('changeActive', 1);
    //   this.$router.push('/detail');
    // }
  }
};
</script>
<style scoped>
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
  width: 42vw;
  height: 20vh;
  border: 1px solid red;
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
