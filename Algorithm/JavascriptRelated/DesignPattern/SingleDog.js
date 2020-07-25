class SingleDog {
    static getInstance() {
        if(!SingleDog.instance) {
            SingleDog.instance = new SingleDog();
        }
        return SingleDog.instance;
    }
}


// 闭包实现 getInstance
SingleDog.getInstance = (function(){
    let instance = null;
    return  function() {
        if(!instance) {
            instance = new SingleDog();
        }
        return instance;
    }
})()