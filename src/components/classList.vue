<template>
  <div>
    hi1
  </div>
</template>

<script>
export default {
  name: "lmqClassList",
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
<style scoped lang="less"></style>
