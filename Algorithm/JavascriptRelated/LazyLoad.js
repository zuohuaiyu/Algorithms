/* 
    图片站位资源
    <img src="default.jpg" data-src="http://www.xxx.com/target.jpg" /></img> 
*/

/* 
    一、通过监听 scroll 事件来判断图片是否到达视口

    通过clientHeight、scrollHeight 之和与 图片的offsetTop 比较大小
    判断是否到了图片的位置，来选择加载不加载图片
*/

let imgs = document.getElementsByTagName("img");
let count = 0; // 存储加载到的图片的个数，避免每次从第一张图片开始

lazyload();

window.addEventListener("scroll", throttle(lazyload, 200));

function lazyload() {
    let viewHeight = document.documentElement.clientHeight; // 可视区域高度
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滚动高度

    for(let i = n; i < imgs.length; i++) {
        if(imgs[i].offsetTop < viewHeight + scrollTop) {
            if(imgs[i].getAttribute("src") == "default.jpg") {
                imgs[i].src = img[i].getAttribute("data-src");
            }
            n++;
        }
    }
}

/* 

    二、IntersectionObserver    

    这是浏览器内置的一个API，实现了监听window的scroll事件、判断是否在视口中以及节流三大功能。

    IntersectionObserver接口 (从属于Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。祖先元素与视窗(viewport)被称为根(root)。
*/

const observer = new IntersectionObserver(changes => {
    //changes 是被观察的元素集合
    for (let i = 0; i < changes.length; i++) {
        let img = changes[i];
        // isIntersecting是一个Boolean值，判断目标元素当前是否可见
        if(img.isIntersecting) {
            const imgEle = img.target;
            if(imgEle.getAttribute("src") == "default.jpg") {
                imgEle.src = img.getAttribute("data-src");
                observer.unobserve(imgEle);
            }
        }
    }
});

for (let i = 0; i < imgs.length; i++) {
  observer.observe(imgs[i]);
}