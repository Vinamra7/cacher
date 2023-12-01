const murmurhash = require('murmurhash-js');
const jenkinsHash = require('jenkins-hash');

class BloomFilter {
   constructor(size, hashFunctions) {
      this.size = size;
      this.bitArray = new Array(size).fill(false);
      this.hashFunctions = hashFunctions;
   }

   add(value1, value2) {
      const key = `${value1}-${value2}`;
      this.hashFunctions.forEach((hashFunction) => {
         const index = hashFunction(key) % this.size;
         this.bitArray[index] = true;
      });
   }

   contains(value1, value2) {
      const key = `${value1}-${value2}`;
      return this.hashFunctions.every((hashFunction) => {
         const index = hashFunction(key) % this.size;
         return this.bitArray[index];
      });
   }
}

// Example hash functions using murmurhash and jenkinsHash
const murmurHashFunction = (key) => murmurhash(key, 42); // You can change the seed value (42) as needed

const jenkinsHashFunction = (key) => {
   const buffer = Buffer.from(key);
   return jenkinsHash(buffer, buffer.length, 0);
};

// Creating a Bloom filter with a size of 100 and two hash functions
const bloomFilter = new BloomFilter(100, [murmurHashFunction, jenkinsHashFunction]);

// Adding values to the Bloom filter
bloomFilter.add("value1a", "value1b");
bloomFilter.add("value2a", "value2b");

// Checking presence of values
console.log(bloomFilter.contains("value1a", "value1b")); // true
console.log(bloomFilter.contains("value2a", "value2b")); // true
console.log(bloomFilter.contains("value3a", "value3b")); // false
