class Node {
    constructor (value, next = null) {
        this.value = value;
        this.next = next;
    }
};

class LinkedList {
    constructor () {
        this.head = null;
        this.tail = null;
        this.size = 0;
    };

    insertFirst (value) {
        const node = new Node(value, this.head);
        if (!this.size) {
            this.tail = node;
        }
        this.head = node;
        this.size += 1;
        return node;
    };
    insertLast (value) {
        const node = new Node(value);
        if (!this.size) {
            this.head = node;
            this.tail = node;
            this.size++
        } else {
            this.tail.next = node;
            this.tail = node;
            this.size++;
        }
        return node;
    };
    insertAtIndex (value, index) {
        if (index >= this.size) {
            throw new Error('Index out of  range')
        };
        if (index === 0) {
            const node = this.insertFirst(value);
            return node;
        }
        if (!index) {
            const node = this.insertLast(value);
            return node;
        }
        let previous = null;
        let current = this.head;
        let count = 0;
        while (count < index) {
            previous = current;
            count++;
            current = current.next;
        };
        const node = new Node(value, current);
        previous.next = node;
        this.size++;
    };
    getAt (index) {
        if (index === 0) {
            // console.log(this.head.value);
            return this.head;
        }
        if (!index) {
            // console.log(this.tail.value);
            return this.tail;
        }
        let count = 0;
        let current = this.head;
        while(current) {
            if(count === index) {
                // console.log(current.value);
                return current;
            };
            current = current.next;
            count++;
        };
        console.log('not found');
        return null;
    };
    pop () {
        const elementToRemove = this.tail;
        let current = this.head;
        while (current.next !== elementToRemove) {
            current = current.next;
        };
        current.next = null;
        this.tail = current;
        this.size--;
    };
    shift() {
        const elementToRemove = this.head;
        this.head = elementToRemove.next;
        this.size--;
    };
    removeAt (index) {
        if (index >= this.size) {
            return;
        }
        if (index === 0) {
            this.shift();
            return;
        }
        if (!index) {
            this.pop();
            return;
        }
        let current = this.head;
        let previous = null;
        let count = 0;
        while (count < index) {
            previous = current;
            current = current.next;
            count++;
        };
        previous.next = current.next;
        this.size--
    }
    // traverse () {
    //     let current = this.head;
    //     while(current) {
    //      console.log(current.value)
    //      current = current.next;
    //     } 
    // }
    getLen () {
        return this.size;
    };
    printValue () {
        let current = this.head;
        let result = [];
        while (current) {
            result.push(current.value)
            current = current.next
        }
        console.log(result)
    }
};

// const ll = new LinkedList();
// ll.insertFirst(1);
// ll.insertFirst(2);
// ll.insertLast(5);
// ll.insertLast(66);
// ll.insertFirst(1);
// ll.insertAtIndex(4, 2);
// ll.insertAtIndex(3, 0);
// ll.insertLast(2);
// ll.insertLast(5);
// ll.insertAtIndex(3, 1);
// ll.insertAtIndex(4, 2);
// ll.getAt(2);
// ll.insertFirst(1);
// ll.getAt(0);
// ll.removeAt(2)
// ll.removeAt(2)
// ll.printValue();
// ll.traverse();

// ll.pop();
// ll.printValue();
// ll.shift();
// ll.printValue();
// console.log(ll.size);

const list1 = new LinkedList();
list1.insertLast(4)
list1.insertLast(5)
list1.insertLast(6)
list1.insertLast(7)
list1.insertLast(8)
const intersection = list1.insertLast(9)
// list1.printValue();

const list2 = new LinkedList();
list2.insertLast(11);
list2.insertLast(12);
let node = list2.insertLast(13);
node.next = intersection;


// list2.printValue();

function findCommon (head1, head2) {
    while (head2) {
        let temp = head1;
        while (temp) {
            // console.log(head1)
            if (temp == head2) {
                return head2;
            }
            temp = temp.next;
        }
        head2 = head2.next;
    };
    return null;
}

// function findCommon (list1, list2) {
//     for (let i = 0; i < list2.size; i++) {
//         for (let j = 0; j < list1.size; j++) {
//             console.log(list1.size, list2.size)
//             if (list2.getAt(i) == list1.getAt(j)) {
                
//                 return list2.getAt(i)
//             }
//             else continue;
//         }
//     };
//     return 'not found'
// };

function findCommon (headA, headB) {
    if (headA === null || headB === null) return null;
    let aPointer = headA;
    let bPointer = headB;
    while (aPointer !== bPointer) {
        if (aPointer === null) {
            aPointer = headB;
        } else {
            aPointer = aPointer.next
        }
        if (bPointer === null) {
            bPointer = headA;
        } else {
            bPointer = bPointer.next
        }
    }
    return aPointer;
}

console.log(findCommon(list1.head, list2.head))

// console.log(list1.head.value, list2.head.value)
// console.log(list1.head.value == list2.head.value)

function* loopLL(curr) {
    while(curr) {
        yield curr.value;
        curr = curr.next;
    }
};

const loop = loopLL(list1.head);

console.log(loop.next().value);
console.log(loop.next().value);
console.log(loop.next().value);
console.log(loop.next().value);
console.log(loop.next().value);
console.log(loop.next().value);
console.log(loop.next().value);
console.log(loop.next().value);
console.log(loop.next().value);
console.log(loop.next().value);



