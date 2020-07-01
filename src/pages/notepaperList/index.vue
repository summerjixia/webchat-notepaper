<template>
  <div class="all_content" :style="styleFilter">
    <note-paper
      v-for="(item,index) in list"
      :key="index"
      :index="index"
      :obj="item"
      @isTopList="isTopList"
      @deleteNote="deleteNote"
    ></note-paper>
    <span v-if="list.length===0">空空如也</span>
  </div>
</template>

<script>
import notePaper from "@/components/notePaper";
import store from "@/store";
export default {
  data() {
    return {
      list:store.state.notepaperList
    };
  },
  components: {
    notePaper
  },
  computed: {
    styleFilter: function() {
      return this.list.length === 0
        ? { position: "fixed", top: "50%", left: "40%" }
        : {};
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    isTopList(index, obj) {
      let item = this.list.splice(index, 1)[0];
      if (obj.isTop === 0) {
        //取消置顶
        this.list.push(item);
      } else {
        this.list.unshift(item);
      }
    },
    deleteNote(index) {
      this.list.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.all_content {
  transition: transform 0.3s ease-in;
}
span {
  vertical-align: middle;
}
</style>