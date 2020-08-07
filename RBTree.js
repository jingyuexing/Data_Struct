/*
* @Author: Jingyuexing
* @Date:   2020-08-07 21:28:51
* @Last Modified by:   Jingyuexing
* @Last Modified time: 2020-08-07 22:13:26
*/
class node {
    constructor(element) {
        this.next = [];
        this.data = element;
        this.prev = null;
    }
}


class Tree{
    constructor(){
        this.pos = this.root = new node("root");
    }
    find(item){
        var currNode = this.root;
        while(currNode.data!=item){
            for(let i =0 ;i<currNode.next.length;i++){
                currNode = currNode.next[i];
            }
        }
        return currNode;
    }
    add(element,item){
        var currNode = this.find(item);
        var newNode= new node(element);
        this.pos = newNode;
        currNode.next.push(newNode)
        newNode.prev = currNode;
    }
}

var t = new Tree()
t.add("Hello","root")