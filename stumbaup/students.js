//Patrick Stumbaugh
//CS290 - HW3

//Student object
function Student(name, major, yearInSchool, club) {
  this.name = name; // string, (e.g. "Jim", "Pam", "Michael")
  this.major = major; // string, (e.g. "Computer Science", "Art", "Business")
  this.yearInSchool = yearInSchool; // int, (e.g. 1, 2, 3, 4)
  this.club = club; // string, (e.g. "Improv", "Art")
}

Student.prototype.logMe = function(clubTF) {
  var printOut = "";
  printOut += this.name + " - ";
  printOut += this.major + " - ";
  printOut += this.yearInSchool;
  //if parameter clubTF is true, print out club name. If false, skip
  if (clubTF === true) {
    printOut += " - " + this.club;
  }
  return printOut;
};


//Student (object) variables
var students = [
  new Student("Pam", "Art", 2, "Art"),
  new Student("Michael", "Business", 4, "Improv"),
  new Student("Dwight", "Horticulture", 1, "Karate"),
  new Student("Jim", "Sports Science", 2, "Guitar"),
  new Student("Angela", "Accounting", 4, "Cat"),
  new Student("Toby", "Human Resources", 3, "Photography")
];

/* This function sorts arrays using an arbitrary comparator. You pass it a comparator 
and an array of objects appropriate for that comparator and it will return a new array 
which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr(comparator, array) {
  var newArray = Object.assign({}, array); //create new array to be modified and returned (without changing original)
  var arraySize = array.length - 1; //-1 to loop later using 0 base
  var counter = 0;

  /*loop will start at position 0. Then it will compare current position with next position.
  	If they are sorted correctly, it will move forward one position and compare again, position 1 and 2, and so on...
    If they are not sorted correctly, it will swap the two positions being compared, then reset the counter
    to 0 so that the loop starts back at position 0 again.
    Admittedly, it's a slow sorting method, but it's simple and works!
  */

  while (counter < arraySize) {
    if (comparator(newArray[counter], newArray[counter + 1]) === true) //items are sorted correctly, move to next item
    {
      counter++;
    } else //items are not sorted correctly, swap the two positions and restart
    {
      var temp = newArray[counter]; //hold position 1 in temp
      newArray[counter] = newArray[counter + 1]; //assign position 2 to position 1
      newArray[counter + 1] = temp; //assign temp (old position 1) to position 2
      counter = 0; //restart counter
    }
  }
  return newArray;
}


/* This compares two students based on their year in school. Sort in descending order.*/
//ie - if student1 is a year 4 and student2 is a year2, those are in descending order and will return true
function yearComparator(student1, student2) {
  if (student1.yearInSchool === student2.yearInSchool) //if years match, return true
    return true;
  else if (student1.yearInSchool > student2.yearInSchool) //if student1's year is higher than student 2, return true
    return true;
  else //students out of order (student2's year is greater than student1), return false
    return false;
}


/* This compares two students based on their major. It should be case insensitive and 
makes which are alphabetically earlier in the alphabet are "greater" than ones that 
come later (from A-Z).*/
function majorComparator(student1, student2) {
  //make lower case to compare characters regardless of case (won't change original)
  var st1 = student1.major.toLowerCase();
  var st2 = student2.major.toLowerCase();
  if (st1 === st2) //strings are equal, return true
    return true;
  else if (st1 < st2) //student1 major is earlier (or "greater") in the alphabet, return true
    return true;
  else //student2 major is earlier in the alphabet, return false
    return false;
}

/* This compares two students based on the club they're in. The ordering from "greatest" 
to "least" is as follows: improv, cat, art, guitar, (types not otherwise listed). 
It should be case insensitive. If two clubs are of equal type then the student who
has the higher year in school should be "greater."*/
function clubComparator(student1, student2) {
  //make lower case to compare characters regardless of case (won't change original)
  var st1 = student1.club.toLowerCase();
  var st2 = student2.club.toLowerCase();
  var st1Club = 0;
  var st2Club = 0;
  var numClubs = 4;
  var clubTypes = ["improv", "cat", "art", "guitar"]; //create local array of club priority types
  //omitting other clubs not listed, considered not priority and don't need sorting (handles at end of function)

  //base case: if both clubs are equal, return true
  if (st1 === st2)
    return true;

  //loops through, checking if any clubs match. If they do, they are given a priority number to be compared later
  for (var counter = 0; counter < numClubs; counter++) {
    if (st1 === clubTypes[counter])
      st1Club = counter + 1;
    if (st2 === clubTypes[counter])
      st2Club = counter + 1;
  }
  //if no club match was found (not one of the 4 priority ones above), assign last number (meaning no priority)
  if (st1Club === 0)
    st1Club = numClubs + 1;
  if (st2Club === 0) //club match was not found (not one of the 4 above)
    st2Club = numClubs + 1;

  //compare the club priority numbers
  if (st1Club < st2Club) //club1 is greater priority, thus in order, return true
    return true;
  else if (st1Club === st2Club) //clubs are equal, but not in priority section, return true (nothing needs to change)
    return true;

  //else they need to be switched, return false
  return false;
}




//OUTPUT to console:
//Each section prints out stars, then loops through students sorted by that section, then prints out stars again to represent end of section

//Variables used throughout different calls
var clubTF = false; //variable to set if club should be shown or not. True if to be shown
var studentsSize = students.length; //size of original array


//Print out for students by year
clubTF = false; //don't show club for this section
console.log("**********");
console.log("The students sorted by year in school are:");
var studentsYear = new sortArr(yearComparator, students); //sort students based on year (returns a new object)
for (var studentCount = 0; studentCount < studentsSize; studentCount++) {
  console.log(studentsYear[studentCount].logMe(clubTF));
}


console.log('\n');


//Print out for students by major
clubTF = false; //don't show club for this section
console.log("**********");
console.log("The students sorted by major are:");
var studentsMajor = new sortArr(majorComparator, students); //sort students based on year (returns a new object)
for (var studentCount = 0; studentCount < studentsSize; studentCount++) {
  console.log(studentsMajor[studentCount].logMe(clubTF));
}


console.log('\n');


//Print out for students by club
clubTF = true; //show club for this section
console.log("**********");
console.log("The students sorted by club affiliation are:");
var studentsClub = new sortArr(clubComparator, students); //sort students based on year (returns a new object)
for (var studentCount = 0; studentCount < studentsSize; studentCount++) {
  console.log(studentsClub[studentCount].logMe(clubTF));
}


console.log('\n');
console.log("**********");


//Logging loop to print out original list, to show it has not been changed (students object)
/*
for (var studentCount = 0; studentCount < studentsSize; studentCount++) {
  console.log(students[studentCount].logMe(clubTF));
}
*/

