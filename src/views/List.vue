<template>
  <div class="list">
    <!-- <van-nav-bar title="VR全景制作" left-arrow @click-left="onClickLeft" /> -->
    <van-nav-bar title="VR全景制作" />
    <van-search
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @change="changeSub"
      />
      <van-dropdown-item
        v-model="value2"
        :options="option2"
        @change="changeTeacher"
      />
    </van-dropdown-menu>
    <LmqClassList ref="classList" />
  </div>
</template>

<script>
import LmqClassList from "@/components/classList.vue";
import { subjectList, teacherList } from "./../api/condition";
export default {
  name: "List",
  components: {
    LmqClassList
  },
  data() {
    return {
      value: "",
      value1: 0,
      value2: 0,
      option1: [{ text: "全部专业", value: 0 }],
      option2: [{ text: "全部讲师", value: 0 }]
    };
  },
  async mounted() {
    // 获取全部专业和讲师
    let resultTemp = await subjectList();
    // 接口是分页的，感觉没必要
    let resultTemp1 = await teacherList({ currentPage: 1, pageSize: 100 });
    let result = resultTemp.data;
    if (result.success) {
      let entity = result.entity;
      entity.forEach(temp => {
        this.option1.push({
          value: temp.subjectId,
          text: temp.subjectName
        });
      });
    }

    let result1 = resultTemp1.data;
    if (result1.success) {
      let entity = result1.entity.teacherList;
      entity.forEach(temp => {
        this.option2.push({
          value: temp.id,
          text: temp.name
        });
      });
    }
  },
  methods: {
    changeSub(value) {
      // 改变classList
      this.$refs.classList.changeSub(value);
    },
    changeTeacher(value) {
      // 改变classList
      this.$refs.classList.changeTeacher(value);
    },
    onSearch() {
      // 条件查询
      this.$refs.classList.changeSearch(this.value);
    },
    onCancel() {
      // 清空条件
    }
  }
};
</script>
<style scoped>
.listItem {
  width: 95vw;
  /* height: 30vh; */
  border: black;
  margin: 10px auto 4rem auto;
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
