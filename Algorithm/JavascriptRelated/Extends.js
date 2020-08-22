/**
 *  组合继承
 *  子类的构造函数重 Parent.call(this) 继承属性
 *  改变子类的原型为 new Parent() 继承函数
 *
 * 优点: 构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数
 * 缺点: 继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费。
 * */

function Parent1() {
  this.name = "parent1";
}
Parent1.prototype.getValue = function () {
  console.log(this.name);
};

function Child1() {
  Parent1.call(this);
  this.type = "child1";
}
Child1.prototype = new Parent1();

let child1 = new Child1();
console.log(child1);

/**
 * 寄生组合继承
 * 优化 组合继承在继承父类函数时调用了构造函数
 * 将父类的原型赋值给了子类，并且将构造函数设置为子类
 * */

function Parent2() {
  this.name = "parent2";
}
Parent2.prototype.getValue = function () {
  console.log(this.name);
};

function Child2() {
  Parent2.call(this);
  this.type = "child2";
}
Child2.prototype = Object.create(Parent2.prototype);
Child2.prototype.constructor = Child2;

let child2 = new Child2();
console.log(child2);

/**
 * ES6 class 继承
 *
 */

class Parent3 {
  constructor(vlaue) {
    this.name = "parent3";
  }
  getValue() {
    console.log(this.name);
  }
}

class Child3 extends Parent3 {
  constructor() {
    super();
  }
}

let child3 = new Child3();
console.log(child3);
