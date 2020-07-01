<template>
  <div>
    <div class="search_main">
      <input
        type="text"
        placeholder="请搜索"
        @input="onInput"
        @cancel="onCancel"
        confirm-type="search"
      />
    </div>
    <notePaper v-for="(item,index) in list" :key="index" :index="index" :obj="item"></notePaper>
  </div>
</template>

<script>
import notePaper from "@/components/notePaper";
import store from "@/store";
export default {
  data() {
    return {
      list: store.state.notepaperList
    };
  },
  components: {
    notePaper
  },
  methods: {
    onInput() {},
    onCancel() {}
  }
};
</script>

<style scoped>
.search_main {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin-bottom:10px;
}

.van-search__action {
  font-size: 16px;
}
</style>
