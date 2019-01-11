// Funtion constructor

// var velez = {
//   name: 'Josue',
//   yearOfBirth: 1993,
//   job: 'Backend Developer'
// }

// console.log(velez)

// constructor always with capital letter
var Person = function (name, yearOfBirth, job) {
  this.name = name
  this.yearOfBirth = yearOfBirth
  this.job = job
}

// Simple inheritance
Person.prototype.calculateAge = function () {
  console.log(2019 - this.yearOfBirth)
}

var josue = new Person('Josue', 1993, 'RoR developer')

console.log(josue)
josue.calculateAge()

// Object.create

var personProto = {
  calculateAge: function () {
    console.log(2019 - this.yearOfBirth)
  }
}

var velez = Object.create(personProto)
console.log(velez)

// Lecture: Passing functions as arguments

var years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997]

function arrayCalc (arr, fn) {
  var arrRes = []
  for (var i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]))
  }
  return arrRes
}

function calculateAge (el) {
  return 2016 - el
}

function isFullAge (el) {
  return el >= 18
}

function maxHeartRate (el) {
  var flag = el >= 18 && el <= 81
  return flag === true ? Math.round(206.9 - (0.67 * el)) : -1
}

console.log(arrayCalc(years, calculateAge))

console.log(arrayCalc(years, isFullAge))

console.log(arrayCalc(arrayCalc(years, calculateAge), maxHeartRate))

// Lecture: functions returning functions

function interviewQuestion (job) {
  if (job === 'designer') {
    return function (name) {
      console.log(name + ', can you plase explain what UX design is?')
    }
  } else if (job === 'teacher') {
    return function (name) {
      console.log('what do you teach, ' + name + '?')
    }
  } else {
    return function (name) {
      console.log('Hello ' + name + ', what do you do?')
    }
  }
}

var teacherQuestion = interviewQuestion('teacher') // this return a function but no it's called yet
teacherQuestion('john') // here is where the fuction its called

// if you whant to called directly you must do
interviewQuestion('teacher')('Velez')

// Lecture: IIFE

function game () {
  var score = Math.random() * 10
  console.log(score >= 5)
}

game();

// Using IIFE WARNING! This way you can't reuse the function

( function() {
    var score = Math.random() * 10
    console.log(score >= 5)
  }
)()
