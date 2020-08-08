/*
 * @Author: Jingyuexing
 * @Date:   2020-08-07 21:28:51
 * @Last Modified by:   Jingyuexing
 * @Last Modified time: 2020-08-08 02:11:16
 */
var Tree = (function() {
    function node(element) {
        this.next = [];
        this.data = element;
        this.parent = null;
    }

    function Tree() {
        this.pos = this.root = new node("root");
    }
    Tree.prototype = {
        add: function(element, item) {
            var currNode = this.find(item);
            var newNode = new node(element);
            this.pos = newNode;
            currNode.next.push(newNode)
            newNode.parent = currNode;
            return this;
        },
        find: function(item) {
            var currNode = this.root;
            while (currNode.data != item && currNode.next.length!=0) {
                for (let i = 0; i < currNode.next.length; i++) {
                    currNode = currNode.next[i];
                }
            }
            return currNode;
        },
        show:function(node){
            if(node){
                return node.data;
            }else{
                return this.pos;
            }
        },
        clear:function(){

        },
        remove:function(item){
            var node = this.find(item);
            //your code
        }
    }
    return Tree;
})();

var t = new Tree();
t.add(12,"root");
t.add(56,"root");
t.add(45,12);
t.add(89,45);

console.log(t.show(t.find(56)));
