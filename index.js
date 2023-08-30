// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(employeeRecord, dateAndTime) {
    const [date, hour] = dateAndTime.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateAndTime) {
    const [date, hour] = dateAndTime.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateAndTime) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === dateAndTime).hour;
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === dateAndTime).hour;
    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employeeRecord, dateAndTime) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, dateAndTime);
    return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    const allDates = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = allDates.reduce((total, dateAndTime) => total + wagesEarnedOnDate(employeeRecord, dateAndTime), 0);
    return totalWages;
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
