// window.dom = {
//     create(tagName) {
//         return document.createElement(tagName);
//     }//这个时全局对象
// };

// 一、增

window.dom = {
    // create(string) { //通过传参就可以在div标签中添加传给形参string的实参
    //     const container = document.createElement('template');//但是div元素不能容纳<td>等标签，但是<template></template>可以
    //     container.textContent = string.trim();//不trim可能有空格,trim()就是把字符串两边的空格去掉          我把innerHTML换掉了
    //     // console.log(container);
    //     return container.content.firstChild;
    // },
    // after(node, node2) {//搜Js dom insert after
    //     // node.parentNode.insertBefore(node, node2);//这可以把node2节点插到node节点前面
    //     node.parentNode.insertBefore(node2, node.nextSibling);//这样可以把node2插到node节点下一个节点的前面
    // },
    // before(node, node2) {
    //     node.parentNode.insertBefore(node2, node);//把node节点插入到node2节点前面
    // },
    // append(parent, node) {
    //     parent.appendChild(node);//在parent节点内新增节点
    // },
    // wrap(node, parent) {//先把parent节点换到node节点前面，再把node节点放到parent节点里面，这样就给node节点新增了一个父节点parent
    //     dom.before(node, parent);
    //     dom.append(parent, node);
    // },
    // remove(node) {
    //     node.parentNode.removeChild(node);//.remove()这个API可能IE不支持，太新
    //     return node;
    // },
    // empty(node) {
    //     // node.innerHTML = '';如果使用这个API，你就不能获取到被删除的节点
    //     const { childNodes } = node;//解构赋值语法，是const childNodes = node.childNodes;的简写
    //     const array = [];
    //     let x = node.firstChild;
    //     while (x) {
    //         array.push(dom.remove(node.firstChild));
    //     };
    //     return array
    // },
    // attr(node, name, value) {//重载:根据参数个数不同写不同的代码
    //     if (arguments.length === 3) {
    //         node.setAttribute(name, value)//该属性的作用是将id为node的节点的name改成value
    //     } else if (arguments.length === 2) {
    //         return node.getAttribute(name)
    //     }
    // },
    // test(node, string) {//这种区分使用不同代码就叫适配
    //     if (arguments.length === 2) {
    //         if ('innerText' in node) {
    //             node.innerText = string //ie
    //         } else {
    //             node.textContent = string  //firefox/chrome
    //         }
    //     } else if (arguments.length === 1) {
    //         if ('innerText' in node) {
    //             return node.innerText
    //         } else {
    //             return node.textContent
    //         }
    //     }
    // },
    // html(node, string) {//更改html的内容 (根据参数不同的长度实现不同的效果：重载)
    //     if (arguments.length === 2) {
    //         node.innerHTML = string
    //     } else {
    //         return node.innerHTML
    //     }
    // },
    style(node, name, value) {
        if (arguments === 3) {
            // dom.style(div,'color','red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {//如果name是Object中的实例
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]//一般是node.style.border/color，但是这里是一个变量，只能用[]
                }
            }
        }

    },
    // class: {
    //     add(node, className) {
    //         node.classList.add(className)
    //     },
    //     remove(node, className) {
    //         node.classList.remove(className)
    //     },
    //     has(node, className) {
    //         return node.classList.contains(className)//查看该节点有没有该类名
    //     }
    // },
    // on(node, eventName, fn) {
    //     node.addEventListener(eventName, fn)
    // },
    // off(node, eventName, fn) {
    //     node.removeEventListener(eventName, fn)
    // },
    find(selector, scope) {//给我一个选择器实参
        return (scope || document).querySelectorAll(selector)//如果实参有scope，就用scope.querySelectorAll
    },
    // parent(node) {
    //     return node.parentNode
    // },
    // children(node) {
    //     return node.children
    // },
    // siblings(node) {
    //     return Array.from(node.parentNode.children).filter(n => n !== node)//因为children是伪数组，不能使用.filter方法，要用Array.from()转成数组
    //     // filter(n=>n!==node) filter对于兄弟节点过滤，如果某个节点不等于传进来的node，那么就return到数组里，这样就可以筛选出除自身以外的兄弟元素
    // },
    // next(node) {
    //     let x = node.nextSibling;
    //     while (x && x.nodeType === 3) {//x存在且x类型为3(文本)，目的是为了跳过空格和换行
    //         x = x.nextSibling
    //     }
    //     return x
    // },
    // previous(node) {
    //     let x = node.previousSibling;
    //     while (x && x.nodeType === 3) {//x存在且x类型为3(文本)，目的是为了跳过空格和换行
    //         x = x.previousSibling
    //     }
    //     return x
    // },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])//this不传，所以写null
        }
    },
    // index(node) {//用于获取元素排行老几
    //     const list = dom.children(node.parentNode)
    //     let i;
    //     for (i = 0; i < list.length; i++) {
    //         if (list[i] === node)
    //             break//如果list[i]等于节点的值，就直接return索引i，从而获取node的索引
    //     }
    //     return i
    // }
}
// 在封装这个DOM库的时候，使用的大多数都是DOM的原生API，所以可以去MDN搜一下DOM的渊生api学一下








// 1.上面第一个函数dom.create()是用来创建节点（元素）
// 2.下面第二个函数dom.after()用来在一个节点后面新增节点

// 二、删 会用到两个方法：.remove(node)将一个节点从树中删掉；.empty(parent)用于删除后代节点
