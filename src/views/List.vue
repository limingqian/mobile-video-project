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
          <div class="item">
            <van-image width="42vw" height="14vh" :src="require('@/assets/bizhi.jpeg')" />
            <div class="videoTitle">{{ item.name }}</div>
            <van-button class="videoButton" type="warning" @click="showDetail">推荐</van-button>
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
        { id: 1, name: 1 },
        { id: 2, name: 2 },
        { id: 3, name: 3 },
        { id: 4, name: 4 },
        { id: 5, name: 5 },
        { id: 6, name: 6 },
        { id: 7, name: 7 },
        { id: 8, name: 8 },
        { id: 9, name: 9 }
      ]
    };
  },
  methods: {
    // onClickLeft() {
    //   this.$store.commit("changeActive", 0);
    //   this.$router.push('/');
    // },
    showDetail() {
      this.$store.commit('changeActive', 1);
      this.$router.push('/detail');
    }
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
  /* float: left; */
}
.videoButton {
  /* float: right; */
  font-size: 0.6rem;
  height: 1.2rem;
  width: 3.2rem;
}
</style>
