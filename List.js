/*
* @Author: Jingyuexing
* @Date:   2020-08-07 05:29:27
* @Last Modified by:   Jingyuexing
* @Last Modified time: 2020-08-10 03:17:07
*/
class List {
    constructor() {
        this.pos = this.listSize = 0;
        this.data = [];
    }
    append(element) {
        this.data[this.listSize++] = element;
        return this;
    }
    insert(element, after) {
        var inserPos = this.find(after);
        if (inserPos > -1) {
            this.data.splice(inserPos + 1, 0, element)
        }
        return this;
    }
    clear() {
        delete this.data;
        this.data = [];
        this.listSize = this.pos = 0;
        return this;
    }
    getElement() {
        return this.data[this.pos];
    }
    contains(element) {
        for (let i = 0; i < this.data.length; ++i) {
            if (this.data[i] == element) {
                return true;
            }
        }
        return false;
    }
    remove(element) {
        var findAt = this.find(element);
        if (findAt > -1) {
            this.data.splice(findAt, 1);
            --this.listSize;
            return true;
        }
        return false;
    }
    find(ele) {
        for (let i = 0; i < this.data.length; ++i) {
            if (this.data[i] == ele) {
                return i;
            }
        }
        return -1;
    }
    front() {
        this.pos = 0;
        return this;
    }
    get length() {
        return this.listSize;
    }
    end() {
        this.pos = this.listSize - 1;
        return this;
    }
    next() {
        if (this.pos < this.listSize - 1) {
            ++this.pos;
        }
        return this;
    }
    prev() {
        if (this.pos > 0) {
            --this.pos;
        }
        return this;
    }
    moveTo(postions) {
        this.pos = postions;
        return this;
    }
    ls() {
        return this.data;
    }
}