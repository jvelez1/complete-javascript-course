// ///////////////////////////////////////
// // Lecture: Hoisting

// calculateAge(1993)

// function calculateAge(year) {
//     console.log(2019 - year);
// }

// // retirement(1993) this not work


// var retirement = function(year) {
//     console.log(65 - (2019 - year));
// }

// retirement(1993)

// // variables

// // print before declaretion console.log(age) -> undefined

// var age = 23;

// function foo() {
//     var age = 65;
//     console.log(age);
// }
// foo()
// console.log(age);




///////////////////////////////////////
// Lecture: Scoping


// First scoping example

var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}




console.log('Example to show the differece between execution stack and scope chain');

var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + d);
}



///////////////////////////////////////
console.log('Lecture: The this keyword');

// window object
// console.log(this);

/*
function calculateAge(year) {
    console.log(2019 - year);
    console.log(this);
}

calculateAge(1993);
*/

var john = {
    name: 'John',
    yearOfBirth: 1993,
    calculateAge: function() {
        console.log(this);
        console.log(2019 - this.yearOfBirth);
    }
}

john.calculateAge();

var marc = {
    name: 'Marc',
    yearOfBirth: 2000
};

//borrowed function
marc.calculateAge = john.calculateAge;
marc.calculateAge();









