export function sum(a, b) {
    return a + b;
}

export function* seq(a, b) {
    if ( a < b ) for ( let i = a ; i < b; i++ ) yield i;
    else for ( let i = a ; i > b ; i-- ) yield i;
}

export function* map(n, f) {
    for (let a of n ) {
        yield f(a);
    }
}

export function* filter(n, f) {
    for (let a of n ) {
        if ( f(a) ) yield a;
    }
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

export function count(n) {
    let c = 0;
    for ( let a of n ) c++;
    return c;
}

export function find(n, f) {
    for ( let a of n ) if ( f(a) ) return a;
    return null;
}

export function join(n, sep) {
    let s = '';
    for ( let a of n ) {
        if ( s != '' ) s += sep;
        s += a;
    }
    return s;
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
