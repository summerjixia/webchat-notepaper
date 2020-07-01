import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'


Vue.directive("textEvent", {
	inserted: function (el) { el.focus() },
	bind: function (el, binding, vnode, oldVnode) {
		let cb = (event) => {
			el.style.height = binding.arg ? "30px" : "20px";
			el.style.height = (el.scrollHeight - 2) + "px";
		}
		el.addEventListener("focus", cb);
		el.addEventListener("input", cb);
		el.addEventListener("propertychange", cb);
		el.addEventListener("focus", () => {
			window.$el = el;
		})

		el.onkeydown = function (event) {
			if (binding.arg && event.keyCode === 13) {
				let subCom = vnode.context.constructor.super.extend({});
				subCom = new subCom({ template: ` <textarea v-textEvent   ${vnode.context.$options._scopeId} class='textarea' rows='1'></textarea>`, }).$mount();
				vnode.elm.after(subCom.$el);
				subCom.$el.focus();
			}
			if (!binding.arg && event.keyCode === 8) {
				//如果字数为8删除这个textarea
			}
		}
	}
})

const app = new Vue(App)
app.$mount()
