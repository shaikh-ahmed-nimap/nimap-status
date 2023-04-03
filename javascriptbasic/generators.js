function* infinit () {
    let index = 0;
    while(true) {
       yield index++
    }
};

const value = infinit();
console.log(value.next().value);
console.log(value.next().value);
console.log(value.next().value);
console.log(value.next().value);
console.log(value.next().value);