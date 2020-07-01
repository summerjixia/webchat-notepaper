<template>
  <div>
    <div class="oper_type">
      <img src="../svg/xiangji.png" @click="operTypeClick(1)" alt />
      <img src="../svg/tuya.png" @click="operTypeClick(2)" alt />
      <img src="../svg/shuangyinhao.png" @click="operTypeClick(3)" alt />
      <img src="../svg/shuangxiegang.png" @click="operTypeClick(4)" alt />
      <img src="../svg/Underline.png" @click="operTypeClick(5)" alt />
      <img src="../svg/mulu.png" @click="operTypeClick(6)" alt />
      <img src="../svg/rili.png" @click="operTypeClick(7)" alt />
    </div>
    <camera
      device-position="back"
      flash="off"
      binderror="error"
      style="width: 100%; height: 300px;display:none"
    ></camera>

    <van-datetime-picker
      v-if="isTimeSelect"
      v-model="currentDate"
      type="datetime"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirmTime"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { photoDirectives } from "@/utils/addNotepaperMixin";
export default {
  data() {
    return {
      isTimeSelect: false,
      currentDate: new Date(),
      minDate: new Date(2020, 3, 1),
      maxDate: new Date(2025, 3, 1),
      listStart: 1
    };
  },
  directives: { ...photoDirectives },
  methods: {
    operTypeClick(param) {
      param === 1
        ? this.takePhoto()
        : param === 2
          ? this.$emit("canvasShow", true)
          : param === 3
            ? this.addText(window.$el, '""')
            : param === 4
              ? this.addText(window.$el, "//")
              : param === 6
                ? this.addText(window.$el, "\n" + this.listStart++ + "、")
                : param === 7
                  ? (this.isTimeSelect = true)
                  : null;
    },
    takePhoto() {
      mpvue.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
        }
      });
    },
    confirmTime(value) {
      this.isTimeSelect = false;
      this.addText(window.$el, this.formatString(value, false));
    },
    cancel() {
      this.isTimeSelect = false;
      console.log(this.$options.render);
    },
    formatString(value, isNumber) {
      let year = value.getFullYear();
      let month = value.getMonth() + 1;
      let day = value.getDate();
      let hour = value.getHours();
      let minute = value.getMinutes();
      let second = value.getSeconds();
      return isNumber
        ? `${year}-${month}-${day}-${hour}-${minute}`
        : `${year}年${month}月${day}日${hour}时${minute}分`;
    },
    addText(elm, str) {
      elm.setRangeText(str);
      elm.selectionStart += str.length - 1;
      elm.focus();
    }
  }
};
</script>

<style scoped>
.oper_type {
  position: fixed;
  bottom: 10px;
  border-top: 1px solid gray;
  overflow: auto;
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

img {
  width: 20px;
  height: 20px;
  margin-top: 10px;
}

.imgel {
  width: 300px;
  height: 150px;
}

@media screen and (min-width: 376px) {
  .imgel {
    width: 700px;
    height: 350px;
  }
}
.textarea {
  width: 90%;
  height: 30px;
  border: none;
  font-size: 16px;
  outline: none;
  resize: none;
}

#select_photo {
  display: none;
}
</style>
