<template>
  <div class="mine">
    <van-image width="100%" height="18rem" fit="fill" :src="require('@/assets/bizhi.jpeg')" />
    <van-grid direction="horizontal" :column-num="2" style="margin-top:1rem">
      <van-grid-item icon="photo-o" text="我的收藏" />
      <van-grid-item icon="photo-o" text="我的课程" />
    </van-grid>
    <h1>This is an mine page</h1>
    <!-- 功能按钮 -->
    <div class="operation">
      <!-- <van-cell-group style="text-align:left">
        <van-cell title="设置" icon="location-o" is-link />
      </van-cell-group> -->
      <van-button style="width:80%;" type="info">设置</van-button>
      <br />
      <br />
      <van-button style="width:80%;" type="warning">退出</van-button>
    </div>

    <!-- 个人信息 -->
    <div class="info">
      <h5>我的</h5>
      <van-image round width="5rem" height="5rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
      <h4>123123123123123</h4>
      <h6>{{ sign }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  components: {},
  data() {
    return {
      sign: '个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名'
    };
  },
  methods: {
    // readMore() {
    //   this.$router.push('/');
    // }
  }
};
</script>
<style scoped>
.info {
  position: fixed;
  left: 0;
  right: 0;
  /* margin: auto; */
  top: 0;
}

.operation {
  position: fixed;
  left: 0;
  right: 0;
  /* margin: auto; */
  bottom: 5.5rem;
}
</style>
