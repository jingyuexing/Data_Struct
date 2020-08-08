/*
 * @Author: Jingyuexing
 * @Date:   2020-08-08 01:15:10
 * @Last Modified by:   Jingyuexing
 * @Last Modified time: 2020-08-08 01:37:33
 */
var BST = (function() {
    function node(ele, left, right) {
        this.left = left;
        this.right = right;
        this.data = ele;
    }

    function BST() {
        this.root = null;
    }
    BST.prototype = {
        inser: function(data) {
            var n = new node(data, null, null);
            if (this.root == null) {
                this.root = n;
            } else {
                var currNode = this.root;
                var parent;
                while (true) {
                    parent = currNode;
                    if (data < currNode.data) {
                        currNode = currNode.left;
                        if (currNode == null) {
                            parent.left = n;
                            break;
                        }
                    } else {
                        currNode = currNode.right;
                        if (currNode == null) {
                            parent.right = n;
                            break;
                        }
                    }
                }
            }
        },
        inOrder: function(node) {
            if (!(node == null)) {
                this.inOrder(node.left);
                console.log(node.data + "");
                this.inOrder(node.right);
            }
        }
    }
    return BST;
})();