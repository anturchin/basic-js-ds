const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (!this._root) {
      this._root = new Node(data)
    } else {
      insertData(this._root, data);
    }
    function insertData(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (data === node.data) {
        return node;
      }
      if (data < node.data) {
        node.left = insertData(node.left, data);
      }
      if (data > node.data) {
        node.right = insertData(node.right, data);
      }
      return node;
    }
  }

  has(data) {
    if (this.find(data)) {
      return true;
    } else {
      return false;
    }
  }

  find(data) {
    function findNode(node, data) {
      if (!node) {
        return null;
      }
      if (data === node.data) {
        return node;
      }
      if (data < node.data) {
        return findNode(node.left, data);
      } else {
        return findNode(node.right, data);
      }
    }
    return findNode(this._root, data);
  }

  remove(data) {
    if (!this._root) {
      return false;
    } else {
      removeData(this._root, data);
    }
    function removeData(node, data) {
      if (!node) {
        return false;
      }
      if (data < node.data) {
        node.left = removeData(node.left, data);
        return node;
      }
      else if (data > node.data) {
        node.right = removeData(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return false;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minRightNode = node.right;
        while (minRightNode.left) {
          minRightNode = minRightNode.left;
        }
        node.data = minRightNode.data;
        node.right = removeData(node.right, minRightNode.data);
        return node;
      }
    }
  }

  min() {
    if (!this._root) {
      return;
    }
    let node = this._root.left;
    if (!node) {
      return
    } else {
      while (node.left) {
        node = node.left;
      }
    }
    return node.data;
  }

  max() {
    if (!this._root) {
      return;
    }
    let node = this._root.right;
    if (!node) {
      return
    } else {
      while (node.right) {
        node = node.right;
      }
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};