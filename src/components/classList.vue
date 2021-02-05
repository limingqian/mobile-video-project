<template>
  <div class="classList">
    <div>
      heih
    </div>
    <van-button class="more" @click="readMore">查看更多</van-button>
  </div>
</template>

<script>
export default {
  name: 'lmqClassList',
  data() {
    return {
      selfValue: this.value
    };
  },
  props: {
    value: {
      type: String,
      default: () => {
        return '';
      }
    }
  },
  methods: {
    readMore() {
      this.$router.push('/list');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.classList {
  background-color: white;
  width: 90vw;
  // height: 50vh;
  display: inline-block;
  margin: 1rem auto 1rem auto;
}
.more {
  width: 40%;
  color: white;
  background-color: black;
  margin-bottom: 3rem;
}
</style>
