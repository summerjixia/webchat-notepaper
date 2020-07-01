import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);

const state = {
    menuList: [{ "catalogueId": 1, "number": "1", "name": "笔记", "level": 1, "upperLevel": null, "iconPath": "biji.png", "subMenu": [{ "catalogueId": 2, "number": "1-1", "name": "讲故事", "level": 2, "upperLevel": 1, "iconPath": null, "subMenu": [] }, { "catalogueId": 38, "number": null, "name": "日记", "level": 2, "upperLevel": 1, "iconPath": null, "subMenu": [] }] }, { "catalogueId": 5, "number": "3", "name": "欢迎", "level": 1, "upperLevel": null, "iconPath": "huanyingye.png", "subMenu": [{ "catalogueId": 29, "number": null, "name": "示例", "level": 2, "upperLevel": 5, "iconPath": null, "subMenu": [] }] }],//所有目录
    openMenu: null,//打开的目录
    focusElm: null,//获取焦点的元素,
    notepaperList:[{"listId":100,"catalogueId":38,"noteDate":"2020-06-22","isTop":1,"title":"吃自助餐","content":"<textarea v-textEvent  style='height:114px' class='textarea' rows='1'>今天的肚子不闹了，爸爸带着我和妹妹去吃自助餐了，那里什么都有看的我直流口水哈哈!我和妹妹每人拿了个盘子在那挑选好吃的，不一会我们就把桌子摆满了。爸爸说：不要拿太多，吃多少拿多少，不然吃不完就浪费了。好吧我们只能乖乖坐下来开吃啦!</textarea><img class='imgel' src='http://114.67.125.226:8080/pictures/1592447668586.jpg' /><textarea v-textEvent  style='height:22px' class='textarea' rows='1'></textarea>","picture":null,"words":"今天的肚子不闹了，爸爸带着我和妹妹去吃自助餐了，那里什么都有看的我直流口水哈哈!我和妹妹每人拿了个盘子在那挑选好吃的，不一会我们就把桌子摆满了。爸爸说：不要拿太多，吃多少拿多少，不然吃不完就浪费了。好吧我们只能乖乖坐下来开吃啦!","file":null},{"listId":99,"catalogueId":38,"noteDate":"2020-06-23","isTop":0,"title":"收秋","content":"<textarea v-textEvent  style='height:114px' class='textarea' rows='1'>今天，我和妈妈一起去姥姥家帮助收秋。我们来到玉米地旁，一眼望不到边，一派丰收的喜人景象。我顺手掰了一穗玉米，哇!这玉米棒可真大呀，足有一尺长!我拿着玉米去让外公看，外公高兴地说：“今年秋天的收成真好!”看着外公高兴的样子，我的心里也美滋滋的。</textarea><img class='imgel' src='http://114.67.125.226:8080/pictures/1592447582245.jpg' /><textarea v-textEvent  style='height:22px' class='textarea' rows='1'></textarea><textarea v-textEvent  style='height:22px' class='textarea' rows='1'></textarea>","picture":null,"words":"今天，我和妈妈一起去姥姥家帮助收秋。我们来到玉米地旁，一眼望不到边，一派丰收的喜人景象。我顺手掰了一穗玉米，哇!这玉米棒可真大呀，足有一尺长!我拿着玉米去让外公看，外公高兴地说：“今年秋天的收成真好!”看着外公高兴的样子，我的心里也美滋滋的。","file":null},{"listId":97,"catalogueId":2,"noteDate":"2020-06-22","isTop":0,"title":"小白兔找妈妈","content":"<textarea v-textEvent  style='height:431px' class='textarea' rows='1'>美丽的春天来了，蓝蓝的天上飘着朵朵白云，红红的太阳张开了笑脸。\n\n兔妈妈叫小白兔快点起床，小懒虫，太阳晒屁股了。”小白兔说：今天，我们去哪里呀?”兔妈妈说：我们俩到森林里去。”小白兔说：好吔!”\n\n小白兔和妈妈吃完早饭，小白兔和妈妈出发了。他们俩一边走一边玩。小白兔看到美丽的蘑菇，有麻点点花的，的花的;有长得高的，有长得矮的，很多很多。兔妈妈说：我们开始采蘑菇吧。”\n\n小白兔说：好吧!”兔妈妈认认真真地采蘑菇，小白兔一边采蘑菇一边追蝴蝶。不一会儿，小白兔看见花开放了，他想：我采一把送给妈妈吧，她一定会高兴的。”\n\n于是，他离开了妈妈到森林里采花，每采一朵，他就往森林里走进一步。他总觉得更美丽的花在前面，就这样，他不知不觉地一步一步走进了森林的深处。</textarea><img class='imgel' src='http://114.67.125.226:8080/pictures/1592446911350.jpg' /><textarea v-textEvent  style='height:22px' class='textarea' rows='1'></textarea>","picture":null,"words":"美丽的春天来了，蓝蓝的天上飘着朵朵白云，红红的太阳张开了笑脸。\n\n兔妈妈叫小白兔快点起床，小懒虫，太阳晒屁股了。”小白兔说：今天，我们去哪里呀?”兔妈妈说：我们俩到森林里去。”小白兔说：好吔!”\n\n小白兔和妈妈吃完早饭，小白兔和妈妈出发了。他们俩一边走一边玩。小白兔看到美丽的蘑菇，有麻点点花的，的花的;有长得高的，有长得矮的，很多很多。兔妈妈说：我们开始采蘑菇吧。”\n\n小白兔说：好吧!”兔妈妈认认真真地采蘑菇，小白兔一边采蘑菇一边追蝴蝶。不一会儿，小白兔看见花开放了，他想：我采一把送给妈妈吧，她一定会高兴的。”\n\n于是，他离开了妈妈到森林里采花，每采一朵，他就往森林里走进一步。他总觉得更美丽的花在前面，就这样，他不知不觉地一步一步走进了森林的深处。","file":null},{"listId":98,"catalogueId":2,"noteDate":"2020-06-22","isTop":0,"title":"狐狸和葡萄","content":"<textarea v-textEvent  style='height:133px' class='textarea' rows='1'>饥饿的狐狸看见葡萄架上挂着一串串晶莹剔透的葡萄，口水直流，想要摘下来吃，但又摘不到。看了一会儿，无可奈何地走了，他边走边自己安慰自己说：“这葡萄没有熟，肯定是酸的。”\n这就是说，有些人能力小，做不成事，就借口说时机未成熟。</textarea><img class='imgel' src='http://114.67.125.226:8080/pictures/1592883227448.jpg' /><textarea v-textEvent  style='height:25px' class='textarea' rows='1'></textarea><textarea v-textEvent  style='height:22px' class='textarea' rows='1'></textarea><textarea v-textEvent  style='height:22px' class='textarea' rows='1'></textarea><textarea v-textEvent  style='height:22px' class='textarea' rows='1'></textarea>","picture":null,"words":"饥饿的狐狸看见葡萄架上挂着一串串晶莹剔透的葡萄，口水直流，想要摘下来吃，但又摘不到。看了一会儿，无可奈何地走了，他边走边自己安慰自己说：“这葡萄没有熟，肯定是酸的。”\n这就是说，有些人能力小，做不成事，就借口说时机未成熟。","file":null}]
}


const getters = {
    getMenuList(state, getters) {
        return state.menuList;
    },
    getOpenMenu(state, getters) {
        return state.openMenu;
    },
    getFocusElm(state, getters) {
        return state.focusElm;
    }
}

const mutations = {
    async setMenuList(state, playload) {
        let result = await getMenu();
        state.menuList = result.data.map((item, index) => {
            return { ...item, display: state.menuList[index] ? state.menuList[index].display : "none" };
        })
    },
    setOpenMenu(state, playload) {
        state.openMenu = playload;
    },
    setFocusElm(state, playload) {
        state.focusElm = playload;
    }
}


// const actions = {
//     asyncSetName(context, playload) {
//         const { state, rootState, commit, dispatch, getters, rootGetters } = context;
//         commit("setName", playload);
//     },
//     asyncSetAge(context, playload) {
//         const { state, rootState, commit, dispatch, getters, rootGetters } = context;
//         commit("setAge", playload);
//     },
//     asyncSetSex(context, playload) {
//         const { state, rootState, commit, dispatch, getters, rootGetters } = context;
//         // commit("setSex",playload);
//         dispatch('pMethod', { type: 'setSex', playload: playload });
//     },
//     pMethod(context, playload) {
//         const { commit } = context;
//         commit(playload.type, playload.playload);
//     }
// }


export default new vuex.Store({
    state,
    getters,
    mutations,
    // actions
})