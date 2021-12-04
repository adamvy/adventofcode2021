export function sum(a, b) {
    return a + b;
}

export function* seq(a, b) {
    for ( let i = a ; i < b; i++ ) yield i;
}

export function every(n, f) {
    for (let a of n) {
        if ( ! f(a) ) return false;
    }
    return true;
}

export function some(n, f) {
    for (let a of n) {
        if ( f(a) ) return true;
    }
    return false;
}

export function* map(n, f) {
    for (let a of n ) {
        yield f(a);
    }
}

export function reduce(n, f, initial) {
    let i = n[Symbol.iterator]();
    let v

    let acc;

    if ( initial != undefined )
        acc = i.next().value;

    while((v = i.next(), !v.done)) acc = f(acc, v.value);
    
    return acc;
}

export function* filter(n, f) {
    for (let a of n ) {
        if ( f(a) ) yield a;
    }
}
