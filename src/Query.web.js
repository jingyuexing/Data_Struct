/*
 * @Author: Jingyuexing
 * @Date:   2020-08-08 15:29:07
 * @Last Modified by:   Jingyuexing
 * @Last Modified time: 2020-08-10 02:11:31
 */

var fs =require("fs")
var Query = (function() {
    function Query(name) {
        this.data = {};
        if (name) {
            this.pos = name;
            localStorage.setItem(name, null);
        }
    }
    Query.prototype.add = function(name, obj) {
        var item = [];
        var keys = name ? name : this.pos;
        if (keys) {
            this.pos = keys;
            item.push(obj);
            this.data[name] = item;
        }
        this.push();
        return this;
    }
    Query.prototype.clear = function() {
        localStorage.clear();
    }
    var Jmap = function(obj) {
        if (typeof obj != "object") return obj;
        let item = [];
        Object.keys(obj).map(i => {
            let val = this.Jmap(obj[i]); //递归判断是否是一个对象，若不是则跳过，若是则进一步遍历内部的对象
            if (typeof val == "object") {
                val.map(ele => {
                    item.push({
                        key: i + "." + ele.key,
                        value: ele.value
                    });
                });
            } else {
                item.push({
                    key: i,
                    value: val
                });
            }
        });
        return item;
    }
    Query.prototype.create = function(name) {
        var list = Object.keys(this.data);
        if (!list.includes(name)) {
            this.data[name] = null;
            this.push();
        }
    }
    Query.prototype.push = function() {
        localStorage.setItem(this.pos, JSON.stringify(this.data));
    }
    Query.prototype.getSheet = function(name) {
        var data = localStorage.getItem(name);
        return JSON.parse(data);
    }
    Query.prototype.dropSheet = function(name) {
        localStorage.removeItem(name)
    }
    Query.prototype.show = function() {
        return Jmap(this.data);
    }
    return Query;
})();