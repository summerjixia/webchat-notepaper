<template>
  <div>
      <div
        class="content_div"
        :style="{background:obj.isTop===0?'white':'rgba(200, 120, 120, 0.5);'}"
        @click="detailPage"
      >
        <div class="content_list">
          <div class="content_title">
            <span class>{{obj.title}}</span>
            <span class="content_date">{{obj.noteDate}}</span>
          </div>
          <p class="conent_p">{{obj.words}}</p>
          <div class="hr"></div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    topping(key, obj) {
    
    },
    deleteNote(index, obj) {
   
    },
    detailPage(e){
       mpvue.navigateTo({ url: "/pages/notepaperDetail/main" });
    }
  },
  props: {
    obj: {
      required: true
    },
    index: {
      required: true
    }
  }
};
</script>

<style scoped>
.content_div {
  padding-top: 15px;
}

.content_list {
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  font-family: Arial, Helvetica, sans-serif;
}
.content_title {
  width: 90%;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content_title span:nth-child(1) {
  font-weight: bold;
}

.content_date {
  font-size: 14px;
  opacity: 0.7;
}

.conent_p {
  height: 25px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 10px;
  font-size: 15px;
  width: 90%;
  text-align: left;
}
.hr {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
}

.van-button {
  height: 100%;
}

.van-swipe-cell__right {
  font-size: 0;
}
</style>