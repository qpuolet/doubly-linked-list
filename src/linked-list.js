const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        var node = new Node(data);

        if(this.length === 0){
            this._head = node;
            this._tail = node;
        } else{
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;

        return this;
    }

    head() {
        return this._head ? this._head.data : null;
    }

    tail() {
        return this._tail ? this._tail.data : null;
    }

    at(index) {
        var i = 0;
        var node = this._head;
        while (node){
            if (i === index){
                return node.data;
            }
            node = node.next;
            i++;
        };
    }

    insertAt(index, data) {
        var i = 0;
        var node = this._head;
        var nodePrototype = new Node(data);

        if (index > this.length){
            throw new Error("Error");
        } else if (index === this.length) {
            this.append(data);
        } else{
            while(node){
                if (i === index) {
                    nodePrototype.next = node;
                    nodePrototype.prev = node.prev;
                    if(node.prev){
                        node.prev.next = nodePrototype;
                    } else {
                        this._head = nodePrototype;
                    }
                    node.prev = nodePrototype;
                    this.length++;
                }
                node = node.next;
                i++;
            }
        }
        return this;
    }

    isEmpty() {
        return this.length ? false : true;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        if(this.length !== 1){
            var i = 0;
            var node = this._head;

            while(node){
                if(i === index){
                    if(node.prev){
                        node.prev.next = node.next;
                        node.next.prev = node.prev;
                    } else{
                        node.next.prev = null;
                        this._head = node.next;
                    }
                    this.length--;
                }
                node = node.next;
                i++;
            }
        } else{
            this.clear();
        }
        return this;
    }

    reverse() {
        if (this.length !== 1) {
            var node = this._head;
            var temp;

            while(node){
                temp = node.next;
                node.next = node.prev;
                node.prev = temp;
                node = temp;
            }
            temp = this._head;
            this._head = this._tail;
            this._tail = temp;
        }
        return this;
    }

    indexOf(data) {
        var i = 0;
        var node = this._head;

        while(node){
            if(node.data == data){
                return i;
            }
            node = node.next;
            i++;
        }

        return -1;
    }
}

module.exports = LinkedList;
