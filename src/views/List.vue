<template>
  <div class="list">
    <van-nav-bar title="VR全景制作" left-arrow @click-left="onClickLeft" />
    <h1>This is an list page</h1>
  </div>
</template>

<script>
export default {
  name: 'List',
  components: {},
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.push('/');
    }
  }
};
</script>
<style scoped></style>
