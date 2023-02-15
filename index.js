function sencondHigh (arr) {
    let hieghest = -Infinity;
    let second = Infinity;
    for (i of arr) {
        if (i > hieghest) {
            second = hieghest;
            hieghest = i
        } else if (i < hieghest && i > second) {
            second = i
        }else {
            continue;
        }
    }
    return second;
}

console.log(sencondHigh([2, 5, 3, 6]))


