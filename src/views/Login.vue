<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="pwd"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import storage from "./../utils/storage";
import { login } from "./../api/user";
import { Toast } from "vant";
export default {
  name: "Login",
  components: {},
  mounted() {
    this.$store.commit("no");
    storage.clear(); // login只要一打开就清空认证信息
  },
  data() {
    return {
      username: "18640461665",
      pwd: "123456"
    };
  },
  methods: {
    async onSubmit(values) {
      // 请求后台
      const response = await login({
        username: values.username,
        pwd: values.pwd
      });
      let result = response.data;

      if (result.success === false) {
        Toast("用户名或密码错误");
        this.username = "";
        this.pwd = "";
        this.$store.commit("no");
      } else {
        Toast("登陆成功");
        storage.set("userId", result.entity.userId);
        this.$store.commit("yes");
        this.$store.commit("changeActive", 0);
        this.$router.push("/");
      }
    }
  }
};
</script>
<style scoped></style>
