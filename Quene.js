/*
* @Author: Jingyuexing
* @Date:   2020-08-07 20:37:33
* @Last Modified by:   Jingyuexing
* @Last Modified time: 2020-08-08 19:57:30
*/

function node(data){
    this.next = null;
    this.data = data;
    this.prev = null;
}

class List{
    constructor(){
        this.head = new node("head");
    }
    find(item){
        var currNode = this.head;
        while(currNode.data!=item){
            currNode = currNode.next;
        }
        return currNode;
    }
    insert(element,item){
        var newNode = new node(element);
        var currNode = this.find(item);
        newNode.next = currNode.next;
        newNode.prev = currNode;
        currNode.next = newNode;
        return this;
    }
    remove(item){
        var currNode = this.find(item);
        if(!(currNode.next==null)){
            currNode.prev.next = currNode.next;
            currNode.next.prev = currNode.prev;
            currNode.next = null;
            currNode.prev = null;
        }
        return this;
    }
}