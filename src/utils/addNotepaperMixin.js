// 优化：
// 1.图片取消
// 2.两张图片之间有输入框
// 3.正文从第二行开始
// 4.文字下划线
//5.涂鸦图片高清
//6.相同图片无法连续添加两次
//7.同步异步
//8.openMenu

export const backMainDirective = {

    back: {
        bind: function (el, binding, vnode, oldVnode) {
            let notePaper = vnode.context.$route.params;
            if (!Object.keys(notePaper).length) { return }
            vnode.context.title = notePaper.title;
            let subCom = vnode.context.constructor.super.extend({});
            subCom = new subCom({ template: `<div class="note_content">${notePaper.content}</div>`, }).$mount();
            el.appendChild(subCom.$el)
            el.childNodes.forEach((item, index) => {
                if (index > 2) {
                    if (item.tagName == "DIV") {
                        item.childNodes.forEach((divItem) => {
                            divItem.setAttribute(vnode.context.$options._scopeId, "")
                        })
                    }
                }
            })

        },
        unbind: function (el, binding, vnode, oldVnode) {
            if (vnode.context.title) {
                let arr = [];//元素集合
                let str = "";//文字
                let img = {};//图片存储
                let children = el.childNodes;
                children.forEach((item, index) => {
                    if (index > 2) {
                        if (item.tagName === "DIV") {
                            item.childNodes.forEach((divItem) => {
                                if (divItem.tagName == "IMG") {
                                    if (divItem.src.indexOf("/pictures") === -1) {
                                        let fileName = `${new Date().getTime()}.jpg`;
                                        arr.push(`<img class='imgel' src='/pictures/${fileName}' />`)
                                        img[fileName] = divItem.src;
                                    } else {
                                        arr.push(`<img class='imgel' src='${divItem.src}' />`)
                                    }
                                } else if (divItem.tagName == "TEXTAREA") {
                                    arr.push(`<textarea v-textEvent  style='height:${divItem.style.height}' class='textarea' rows='1'>${divItem.value}</textarea>`)
                                    str += divItem.value;
                                }
                            })

                        } else {
                            if (item.tagName == "IMG") {
                                if (item.src.indexOf("/pictures") === -1) {
                                    let fileName = `${new Date().getTime()}.jpg`;
                                    arr.push(`<img class='imgel' src='/pictures/${fileName}' />`)
                                    img[fileName] = item.src;
                                } else {
                                    arr.push(`<img class='imgel' src='${item.src}' />`)
                                }
                            } else if (item.tagName == "TEXTAREA") {
                                arr.push(`<textarea v-textEvent  style='height:${item.style.height}' class='textarea' rows='1'>${item.value}</textarea>`)
                                str += item.value;
                            }
                        }
                    }
                })

                if (!Object.keys(vnode.context.params).length) {
                    // await saveNotePaper({
                    //     catalogueId: vnode.context.openMenu.catalogueId,
                    //     noteDate: new Date(),
                    //     isTop: 0,//数据库应该设置默认值
                    //     title: vnode.context.title,
                    //     content: arr.join(""),
                    //     words: str,
                    //     picture: JSON.stringify(img)
                    // })
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://114.67.125.226:8081/saveNoteList', false);
                    xhr.onload = function (e) { };
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({
                        catalogueId: vnode.context.openMenu.catalogueId,
                        noteDate: new Date(),
                        isTop: 0,//数据库应该设置默认值
                        title: vnode.context.title,
                        content: arr.join(""),
                        words: str,
                        picture: JSON.stringify(img)
                    }));
                } else {
                    // await updateNotePaper({
                    //     listId: vnode.context.params.listId,
                    //     catalogueId: vnode.context.openMenu.catalogueId,
                    //     title: vnode.context.title,
                    //     content: arr.join(""),
                    //     words: str,
                    //     picture: JSON.stringify(img)
                    // })
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://114.67.125.226:8081/updateNodeList', false);
                    xhr.onload = function (e) { };
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({
                        listId: vnode.context.params.listId,
                        catalogueId: vnode.context.openMenu.catalogueId,
                        noteDate: new Date(),
                        title: vnode.context.title,
                        content: arr.join(""),
                        words: str,
                        picture: JSON.stringify(img)
                    }));
                }

            }

        }
    }
}


export const photoDirectives = {
    image(el, binding, vnode, oldVnode) {
        let reader = new window.FileReader();
        el.addEventListener("change", () => {
            reader.readAsDataURL(el.files[0]);
            reader.onload = function (e) {
                let imgEl = document.createElement("img");
                imgEl.setAttribute("class", "imgel");
                imgEl.setAttribute(vnode.context.$options._scopeId, "")
                imgEl.src = this.result;
                window.$el.after(imgEl);

                //创建新的textarea
                let subCom = vnode.context.constructor.super.extend({});
                subCom = new subCom({ template: `<textarea class="textarea" v-textEvent  ${vnode.context.$options._scopeId} rows='1'></textarea>`, }).$mount();
                imgEl.after(subCom.$el);
                subCom.$el.focus();
            };

        });
    }
}


function direc(el, binding, vnode, oldVnode) {
    let ctx = el.getContext("2d");
    let startPosition = {};
    el.addEventListener("touchstart", e => {
        let touch = e.targetTouches[0];
        vnode.context.canvasheight = { min: Math.ceil(touch.clientY), max: Math.ceil(touch.clientY) };
        startPosition.x = Math.ceil(touch.clientX);
        startPosition.y = Math.ceil(touch.clientY);
    });
    el.addEventListener("touchmove", e => {
        let touch = e.targetTouches[0];
        if (vnode.context.penSize === 2) {
            ctx.beginPath();
            ctx.arc(
                Math.ceil(touch.clientX),
                Math.ceil(touch.clientY),
                15,
                0,
                Math.PI,
                false
            ); //圆心坐标xy、半径长度、起始结束弧度、顺时针逆时针
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.closePath();
            return;
        }

        let h = vnode.context.canvasheight;
        if (touch.clientY < h.min) {
            h.min = touch.clientY;
        } else if (touch.clientY > h.max) {
            h.max = touch.clientY;
        }

        ctx.beginPath();
        if (vnode.context.penSize === 0) {
            ctx.lineWidth = 1;
        } else {
            ctx.lineWidth = 5;
        }
        ctx.strokeStyle = vnode.context.colorpen;
        ctx.lineJoin = "round";
        ctx.moveTo(startPosition.x, startPosition.y);
        if (vnode.context.penSize === 0) {
            ctx.lineTo(Math.ceil(touch.clientX), Math.ceil(touch.clientY));
        } else if (vnode.context.penSize === 1) {
            ctx.lineTo(Math.ceil(touch.clientX), Math.ceil(touch.clientY));
        }
        ctx.closePath();
        ctx.stroke();

        startPosition.x = Math.ceil(touch.clientX);
        startPosition.y = Math.ceil(touch.clientY);
    });
}

export const canvasDirectives = {
    inserted: function (el, binding, vnode, oldVnode) {
        direc(el, binding, vnode, oldVnode)
    },
    updated: function (el, binding, vnode, oldVnode) {
        console.log("updated")
        direc(el, binding, vnode, oldVnode)
    },
    componentUpdated: function (el, binding, vnode, oldVnode) {
        console.log("componentUpdated")
        direc(el, binding, vnode, oldVnode)
    },
    unbind: function (el, binding, vnode, oldVnode) {
        let h = vnode.context.canvasheight;
        if (!h) {
            return;
        }
        let imgEl = document.createElement("img");
        imgEl.setAttribute("class", "imgel");
        imgEl.setAttribute(vnode.context.$options._scopeId, "")
        imgEl.setAttribute(
            "style",
            // " width: 300px;" +
            // "height:" +
            // (h.max - h.min + 20) +
            "background-color: rgba(245,245,245,.5);"
        );
        imgEl.src = el.toDataURL("img/jpeg");
        window.$el.after(imgEl);
        //添加新textarea
        let subCom = vnode.context.constructor.super.extend({});
        subCom = new subCom({ template: ` <textarea v-textEvent ${vnode.context.$parent.$options._scopeId} class='textarea' rows='1'></textarea>` }).$mount();
        imgEl.after(subCom.$el);
        subCom.$el.focus();
    }
}

