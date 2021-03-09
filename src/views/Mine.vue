<template>
  <div class="mine">
    <van-image
      width="100%"
      height="18rem"
      fit="fill"
      :src="require('@/assets/vr.jpeg')"
    />
    <van-grid direction="horizontal" :column-num="2" style="margin-top:2rem;">
      <van-grid-item
        icon="like"
        text="我的收藏"
        @click="showHot('mycollect')"
      />
      <van-grid-item icon="gift" text="课程列表" @click="showHot('mycourse')" />
    </van-grid>
    <!-- 功能按钮 -->
    <div class="operation">
      <br />
      <br />
      <van-button style="width:80%;" type="warning" @click="logout"
        >退出</van-button
      >
    </div>

    <!-- 个人信息 -->
    <div class="info">
      <h5>我的</h5>
      <van-image
        round
        width="6rem"
        height="6rem"
        fit="cover"
        :src="require('@/assets/head.jpeg')"
      />
      <h3 class="sign">{{ userName }}</h3>
      <!-- <h6 class="sign">{{ sign }}</h6> -->
    </div>
  </div>
</template>

<script>
import storage from "../utils/storage";
export default {
  name: "Mine",
  components: {},
  data() {
    return {
      sign:
        "个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名个性签名"
    };
  },
  computed: {
    userName: {
      get() {
        return this.$store.state.userName;
      }
    }
  },
  methods: {
    logout() {
      storage.clear();
      this.$router.push("/login");
    },
    showHot(type) {
      this.$router.push("/hot/" + type);
    }
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

.sign {
  color: white;
}
</style>
