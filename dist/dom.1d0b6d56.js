// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dom.js":[function(require,module,exports) {
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
  style: function style(node, name, value) {
    if (arguments === 3) {
      // dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        // dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //如果name是Object中的实例
        var object = name;

        for (var key in object) {
          node.style[key] = object[key]; //一般是node.style.border/color，但是这里是一个变量，只能用[]
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
  find: function find(selector, scope) {
    //给我一个选择器实参
    return (scope || document).querySelectorAll(selector); //如果实参有scope，就用scope.querySelectorAll
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
  each: function each(nodeList, fn) {
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]); //this不传，所以写null
    }
  } // index(node) {//用于获取元素排行老几
  //     const list = dom.children(node.parentNode)
  //     let i;
  //     for (i = 0; i < list.length; i++) {
  //         if (list[i] === node)
  //             break//如果list[i]等于节点的值，就直接return索引i，从而获取node的索引
  //     }
  //     return i
  // }

}; // 在封装这个DOM库的时候，使用的大多数都是DOM的原生API，所以可以去MDN搜一下DOM的渊生api学一下
// 1.上面第一个函数dom.create()是用来创建节点（元素）
// 2.下面第二个函数dom.after()用来在一个节点后面新增节点
// 二、删 会用到两个方法：.remove(node)将一个节点从树中删掉；.empty(parent)用于删除后代节点
},{}],"../../../../AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56083" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.1d0b6d56.js.map