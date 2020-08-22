function MyInstanceOf(target, origin) {
  let proto = target.__proto__;
  if (proto) {
    if (proto === origin.prototype) {
      return true;
    } else {
      return MyInstanceOf(proto, origin);
    }
  } else {
    return false;
  }
}

let a = new String("test");
console.log(MyInstanceOf(a, String));
