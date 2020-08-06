/*
 * @Author: Jingyuexing
 * @Date:   2020-08-05 22:16:18
 * @Last Modified by:   Jingyuexing
 * @Last Modified time: 2020-08-07 04:02:12
 */
class Query {
    /**
     * 需要链接的文档名称
     * @param  {string} name 名称
     * @return {void}      
     */
    constructor(name) {
        var fs = require("fs");
        this.postion = '';
        this.data = null;
        if (name != undefined) {
            name = `./DB/${name}.json`;
            this.dataBaseName = name;
            var strList = name.split(".");
            try {
                if (strList[strList.length - 1].toLowerCase() == "json") {
                    this.data = JSON.parse(fs.readFileSync(name, {
                        encoding: "utf-8"
                    }).toString());
                } else {
                    throw Error("this is Not Json File");
                }
            } catch (e) {
                // who care?
            }
            if(!this.data){
                this.data = {};
                this.push();
            }
        }
    }
    /**
     * 向文档中添加数据
     * @param {string} name 新的表的名称
     * @param {object} data 数据对象
     */
    add(name, data) {
        var items = [];
        items.push(data)
        function isArray(val){
            return toString.call(val) === "[object Array]";
        }
        if (isArray(this.data[name])) {
            this.data[name].push(data);
            console.log(toString.call(this.data[name]) === "object Array")
        } else {
            this.data[name] = items;
        }
        this.push();
        return this;
    }
    /**
     * JSON-map 对对象进行深度遍历操作
     * @param {object}   object   需要遍历的对象
     * @return {object[]} 遍历后的数组
     */
    Jmap(obj) {
        if (typeof obj != "object") return obj;
        let item = [];
        Object.keys(obj).map(i => {
            let val = this.Jmap(obj[i]); //递归判断是否是一个对象，若不是则跳过，若是则进一步遍历内部的对象
            if (typeof val == "object") val.map(ele => {
                item.push({
                    key: i + "." + ele.key,
                    value: ele.value
                });
            });
            else item.push({
                key: i,
                value: val
            });
        });
        return item;
    }
    /**
     * 移除文档内的表
     * @param  {string} name 表名
     * @return {this}      返回Query
     */
    remove(name) {
        var allList = this.All();
        var temp = {};
        for (let i = 0; i < allList.length; i++) {
            if (allList[i] != name) {
                temp[allList[i]] = this.data[allList[i]];
            }
        }
        this.data = temp;
        this.push()
        return this;
    }
    /**
     * 返回当前的文档所有的表名
     * @return {string[]} 文档内的表名
     */
    All() {
        return this.Jmap(this.data);
    }
    /**
     * 创建一个`name`的文档
     * @param  {string} name 名称
     * @return {boolean}     若创建成功则返回true反之返回false
     */
    create(name) {
        var fs = require("fs");
        var f = false;
        fs.writeFile(`./DB/${name}.json`, JSON.stringify({}), {
            encoding: "utf-8"
        }, (err) => {
            if (err) throw err;
            f = true;
        });
        this.dataBaseName = `./DB/${name}.json`;
        return f;
    }
    /**
     * 推送数据到文档
     * @return {Query} 返回自身
     */
    push() {
        var fs = require("fs");
        fs.writeFile(this.dataBaseName, JSON.stringify(this.data), err => {
            if (err) throw err;
        });
        return this;
    }
    /**
     * 设置
     * @param  {Object} options 设置选项
     * @return {void}    
     */
    settings(options) {
        var {
            path,
            name
        } = options;
        this.path = path;
        this.name = name;
        this.dataBaseName = `./${this.path}/${this.name}.json`;
        return this;
    }
    /**
     * 获取表数据
     * @param  {string} name 表名
     * @return {object}      数据
     */
    getSheet(name) {
        return this.data[name];
    }
    dropSheet(name){
        this.data[name] = null;
        this.push();
        return this;
    }
    ls(){
        console.table(this.All());
    }
}
module.exports = Query;