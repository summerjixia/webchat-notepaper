<template>
  <div  class="content" :style="style">
    <textarea  class="title" auto-height v-model="title" />
    <textarea auto-height v-model="content" />
    <bottomNav></bottomNav>
  </div>
</template>

<script>
// Use Vuex
import store from "@/store";
import bottomNav from "@/components/bottomNav";
export default {
  data() {
    return {
      title: "吃自助餐",
      content:
        "今天的肚子不闹了，爸爸带着我和妹妹去吃自助餐了，那里什么都有看的我直流口水哈哈!我和妹妹每人拿了个盘子在那挑选好吃的，不一会我们就把桌子摆满了。爸爸说：不要拿太多，吃多少拿多少，不然吃不完就浪费了。好吧我们只能乖乖坐下来开吃啦!"
    };
  },
  components: {
    bottomNav
  },
  computed: {
    count() {
      return store.state.count;
    }
  },
  methods: {
    increment() {
      store.commit("increment");
    },
    decrement() {
      store.commit("decrement");
    }
  }
};
</script>

<style scoped>
.title{
  font-size: 18px;
  font-weight: bold;
}
.content{
  font-size: 16px;
}
</style>
