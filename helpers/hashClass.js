const crypto = require('crypto');



class ConsistentHashing {
  constructor(nodes, replicas = 100) {
    this.replicas = replicas;
    this.circle = {};
    this.sortedKeys = [];
    nodes.forEach(server => {
      this.addNode(server);
    });

  }



  _hash(key) {
    return crypto.createHash('md5').update(key).digest('hex');
  }



  addNode(node) {
    for (let i = 0; i < this.replicas; i++) {
      const replicaKey = `${node}_${i}`;
      const hashVal = this._hash(replicaKey);
      this.circle[hashVal] = node;
      this.sortedKeys.push(hashVal);
    }
    this.sortedKeys.sort();
  }



  removeNode(node) {
    for (let i = 0; i < this.replicas; i++) {
      const replicaKey = `${node}_${i}`;
      const hashVal = this._hash(replicaKey);
      delete this.circle[hashVal];
      const index = this.sortedKeys.indexOf(hashVal);
      if (index !== -1) {
        this.sortedKeys.splice(index, 1);
      }
    }
  }



  getNode(key) {
    if (Object.keys(this.circle).length === 0) {
      return null;
    }



    const hashVal = this._hash(key);
    for (const val of this.sortedKeys) {
      if (hashVal <= val) {
        return this.circle[val];
      }
    }



    // Wrap around to the first node in the circle
    return this.circle[this.sortedKeys[0]];
  }
}

export default ConsistentHashing;

// Example Usage:

cacheServers.forEach(server => {
  consistentHashing.addNode(server);
});



// Now, to get the cache server for a given key:


const vmNames = ["0", "1", "2", "3", "4"]
// Assign VMs to positions on the hash ring
vmNames.forEach((userKey) => {
  const cacheServer = consistentHashing.getNode(userKey);
  console.log(`${userKey} is mapped to ${cacheServer}`);
});