/*
 * @Author: Jingyuexing
 * @Date:   2020-08-07 05:29:53
 * @Last Modified by:   Jingyuexing
 * @Last Modified time: 2020-08-07 05:45:44
 */
function LNode(ele) {
    this.element = ele;
    this.next = null;
}
class LList {
    constructor() {
        this.head = new LNode("head");
    }
    find(item) {
        var currNode = this.head;
        while (currNode.element != item) {
            currNode = currNode.next;
        }
        return currNode;
    }
    insert(ele, item) {
        var newNode = new LNode(ele);
        var currNode = this.find(item);
        newNode.next = currNode.next;
        currNode.next = newNode;
        return this;
    }
    findPrevious(item) {
        var node = this.head;
        while (!(node.next != null) && (node.next.element != item)) {
            node = node.next;
        }
        return this;
    }
    remove(item) {
        var prevNode = this.findPrevious(item);
        if (!(prevNode.next == null)) {
            prevNode.next = prevNode.next.next;
        }
        return this;
    }
    display() {
        var currNode = this.head;
        while (!(currNode.next == null)) {
            console.log(currNode.next.element)
            currNode = currNode.next;
        }
        return this;
    }
}