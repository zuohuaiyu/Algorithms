/* 
    实现一个LRU过期算法的KV cache, 所有KV过期间隔相同, 满足如下性质:
        最多存储n对KV;
        如果大于n个, 则随意剔除一个已经过期的KV;
        如果没有过期的KV, 则按照LRU的规则剔除一个KV;
        查询时如果已经过期, 则返回空;
*/


// 利用 map 的key 是有序的特点

class LRUCache{
    constructor(capacity, intervalTime){
        this.cache = new Map();
        this.capacity = capacity;
        this.intervalTime = intervalTime;
    }

    get(key){
        if(!this.cache.has(key)){
            return null;
        }
        const tmpValue = this.cache.get(key);
        this.cache.delete(key);
        if(Date.now() - tmpValue.time > this.intervalTime){
            return null;
        }
        this.cache.set(key, {value: tmpValue.value, time: Date.now()})
        return tmpValue.value;
    }
    put(key, value){
        if(this.cache.has(key)){
            this.cache.delete(key);
        }
        if(this.cache.size >= this.capacity){
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, {value, time: Date.now()});
    }
}