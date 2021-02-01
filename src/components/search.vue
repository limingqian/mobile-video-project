<template>
  <div id="container">
    <div class="search bar">
      <!-- <form action=""> -->
      <div class="font-big">搜索</div>
      <div class="shuxian"></div>
      <!-- <input type="text" placeholder="请输入您要搜索的内容..." /> -->
      <van-search
        class="van-search"
        v-model="selfValue"
        @search="doSearch"
        placeholder="按课程名称搜索"
      />
      <!-- <button type="submit"></button> -->
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "lmqSearch",
  data() {
    return {
      selfValue: this.value
    };
  },
  props: {
    value: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  methods: {
    doSearch() {
      this.$emit("search", this.selfValue);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  box-sizing: border-box;
}

#container {
  width: 80vw;
  height: 2rem;
  margin: -1rem auto 0 auto;
}

.search {
  transform: translateY(-20%);
}

.bar {
  position: relative;
  width: 80vw;
  height: 3rem;
  background: #fff;
  margin: 0 auto;
  box-shadow: 0px 2px 8px #888080;
  border-radius: 6rem;
}

.van-search,
input,
button {
  // 去掉边框
  border: none;
  outline: none;
  height: 3rem;
}

.van-search {
  padding-left: 0.1rem;
}

button {
  width: 4rem;
  cursor: pointer;
  position: absolute;
}

.font-big {
  line-height: 3rem;
  width: 16vw;
  text-align: center;
  float: left;
  color: #029feb;
  font-size: 1rem;
}

.shuxian {
  border: none;
  width: 0.15vw;
  background: #324b4e;
  float: left;
  margin-top: 0.5rem;
  height: 2rem;
}

.bar .van-search {
  width: 60vw;
  font-size: 0.8rem;
  border-radius: 6rem;
  transition: 0.3s linear;
  float: right;
}

.bar button {
  // 搜索图标居右
  background: none;
  right: 0;
}

/* 左侧搜索图标
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_1964392_9ty3bo7lhzp.eot');
  src: url('//at.alicdn.com/t/font_1964392_9ty3bo7lhzp.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1964392_9ty3bo7lhzp.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1964392_9ty3bo7lhzp.woff') format('woff'),
    url('//at.alicdn.com/t/font_1964392_9ty3bo7lhzp.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1964392_9ty3bo7lhzp.svg#iconfont') format('svg');
}

.bar button:before {
  content: '\e614';
  font-family: 'iconfont';
  color: #324b4e;
}
*/
</style>
