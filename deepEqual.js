'use strict';
// Don't add or change anything above this comment.


// fantauzd
// Dominic Fantauzzo
// 1/18/2024
// CS 290 - Assignment 2

/*
* The isPrimitive function returns true if the argument is primitive and false if the argument is an object
* This will be used to create a more efficient branching structure
*/
let isPrimitive = (val) => (val !== Object(val));


/*
* Don't change the declaration of this function.
*/
function deepEqual(val1, val2) {

    // When we have one or more primitives, we check for strict equality (Case 1-3)
    if (isPrimitive(val1) || isPrimitive(val2)) {
        return val1 === val2;
    }

    // If one or more argument is an object and if we have strict equality, return true (Case 4)
    if (val1 === val2) {
        return true;
    }                                              
    
    // one or more of the arguments is a object, we need to check for deep Equality (Case 5)
    // begin by determining if one of the arguments is an array
    if (Array.isArray(val1) || Array.isArray(val2)) {
        // if only one argument is an array, they are not deep Equal, return false
        if (Array.isArray(val1) && Array.isArray(val2)) {
            // if the arrays have differnet lengths, they are not deep Equal, return false
            if (val1.length === val2.length) {
                // check each value in the array to ensure it is deepEqual to the other value at the same index, return false if any values are not deepEqual
                let equality
                for (let i = 0; i <= val1.length; i++) {
                    equality = deepEqual(val1[i], val2[i]);
                    if(equality === false) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        return false;
    }
    // Here we know both arguments are objects, use recursion to test for identical properties and values
    // create 2 string arrays of the properties of each object
    let val1Properties = []
    for (const property in val1) {
        val1Properties.push(property);
    }
    let val2Properties = []
    for (const property in val2) {
        val2Properties.push(property);
    }
    // check to see that the strings have the same length, meaning both objects have the same number of properties, else return false
    if (val1Properties.length === val2Properties.length) {
        // check to see if the properties are the same by comparing each string in the array, do not consider order
        for (const someString of val1Properties) {
            if (val2Properties.includes(someString) === false) {
                return false;
            }
        }
        // here we know that the objects have the same properties, lets test the values!
        // since we know properties are the same, we can directly compare the values without creating an error
        let val1Value
        let val2Value
        let equality
        for (const property in val1) {
            val1Value = val1[property];
            val2Value = val2[property];
            // use recursion to check if the values for the property are deepEqual
            equality = deepEqual(val1Value, val2Value)
            if (equality === false) {
                return false;
            }
        }
        return true;
    }
    return false;
}


// Don't add or change anything below this comment.
module.exports = deepEqual;