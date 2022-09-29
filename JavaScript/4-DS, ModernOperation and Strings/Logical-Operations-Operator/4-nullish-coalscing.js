/**
 * The nullish coalescing operator is written as two question marks ??.
 * As it treats null and undefined similarly, we’ll use a special term here, in this article. 
 * For brevity, we’ll say that a value is “defined” when it’s neither null nor undefined.

The result of a ?? b is:

    if a is defined, then a,
    if a isn’t defined, then b.

IMP: In other words, ?? returns the first argument if it’s not null/undefined. Otherwise, the second one.
The nullish coalescing operator isn’t anything completely new. It’s just a nice syntax to get the first “defined” value of the two.
 */

let a;
let b;
let result = a !== null && a !== undefined ? a : b;
result = a ?? b;
