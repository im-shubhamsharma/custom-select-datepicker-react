export class customDate {
  constructor(date, lang = "default") {
    date = date ?? new Date();

    date = new Date(date);
    // Get Date and day
    this.date = date.getDate();
    this.day = date.getDay();

    // get month
    this.month = date.getMonth() + 1;
    this.monthLong = date.toLocaleString(lang, { month: "long" });
    this.monthShort = date.toLocaleString(lang, { month: "short" });

    //get year
    this.year = date.getFullYear();
    this.yearShort = Number(date.toLocaleString(lang, { year: "2-digit" }));
  }

  /* Get Total months of a day */
  getDaysInMonth = function (month = this.month, year = this.year) {
    return new Date(year, month, 0).getDate();
  };

  getCurrDay = function (day = this.day) {
    return day === 0 ? 7 : day;
  };

  getDate = function (date = this.date) {
    return date;
  };

  getMonthShort = function (month = this.month) {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString("en-US", { month: "short" });
  };
}

export function getDatePickerData() {
  let totalDaysArr = [];
  // Invoking our date costructor
  let date = new customDate();
  let currDate = date.getDate();
  let currDay = date.getCurrDay();
  let currMonth = date.month;
  let currMonthShort = date.monthShort;
  let currYear = date.year;
  //------------------------------------------
  let days = [
    "",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // fill our array with days of current month
  let remainingDaysInCurrentMonth = date.getDaysInMonth() - currDate;
  let currDateObj = {
    date: "",
    day: "",
    month: currMonth,
    monthShort: currMonthShort,
    year: currYear,
    active: true,
    dateToBeShown: "",
  };
  let recentDate = currDate;
  let recentDay = currDay;
  for (let i = 0; i <= remainingDaysInCurrentMonth; i++) {
    totalDaysArr.push({
      ...currDateObj,
      date: recentDate,
      day: recentDay,
      dateToBeShown: `${days[recentDay]}, ${recentDate} ${currMonthShort} ${currYear}`,
      todaysDate: i === 0 ? true : false,
    });
    recentDate++;
    recentDay++;
    if (recentDay === 8) recentDay = 1;
  }

  // fill our calendar with days of upcoming 3 month
  //-----------------------------
  let remainingMonthCount = 3;
  let newMonth = currMonth;
  let newYear = currYear;

  while (remainingMonthCount > 0) {
    let month = newMonth + 1;
    let year = newYear;
    if (month === 13) {
      month = 1;
      year += 1;
    }
    let monthShort = date.getMonthShort(month, year);
    let totalDays = date.getDaysInMonth(month);

    currDateObj = {
      date: "",
      day: recentDay,
      month: month,
      monthShort: monthShort,
      year: year,
      active: true,
      dateToBeShown: "",
    };

    for (let i = 1; i <= totalDays; i++) {
      totalDaysArr.push({
        ...currDateObj,
        day: recentDay,
        date: i,
        dateToBeShown: `${days[recentDay]}, ${i} ${monthShort} ${year}`,
      });

      recentDay++;
      if (recentDay === 8) recentDay = 1;
    }
    newMonth++;
    remainingMonthCount--;
  }
  //-------------------------------------------------------------
  /* fill our calendar for last empty cells which is more than 3 months */

  if (recentDay !== 0) {
    let moreDaysToFillOurCalendar = 7 - recentDay + 1;
    let month = newMonth+1;
    let year = newYear;
    if (month === 13) {
      month = 1;
      year += 1;
    }
    let monthShort = date.getMonthShort(month, newYear);

    currDateObj = {
      date: "",
      day: recentDay,
      month: newMonth,
      monthShort: monthShort,
      year: newYear,
      active: false,
      dateToBeShown: "",
    };

    for (let i = 1; i <= moreDaysToFillOurCalendar; i++) {
      totalDaysArr.push({
        ...currDateObj,
        day: recentDay,
        date: i,
        dateToBeShown: `${days[recentDay]}, ${i} ${monthShort} ${newYear}`,
      });

      recentDay++;
    }
  }

  //-------------------------------------------------------------

  // fill our array with past dates for our first row
  currDateObj = {
    date: "",
    day: "",
    month: currMonth,
    monthShort: currMonthShort,
    year: currYear,
    active: false,
    dateToBeShown: "",
  };
  recentDate = totalDaysArr[0].date - 1;
  recentDay = totalDaysArr[0].day - 1;

  if (recentDay !== 0 && recentDate !== 0) {
    while (recentDay > 0) {
      totalDaysArr.unshift({
        ...currDateObj,
        date: recentDate,
        day: recentDay,
        dateToBeShown: `${days[recentDay]}, ${recentDate} ${currMonthShort} ${currYear}`,
      });

      recentDate--;
      if (recentDate <= 0) break;
      recentDay--;
    }
  }

  // condition if we have to take dates from last month or last year
  if (recentDay > 0) {
    let lastMonth = currMonth - 1;
    let lastYear = currYear;
    if (lastMonth === 0) {
      lastMonth = 12;
      lastYear -= 1;
    }
    let lastMonthShort = date.getMonthShort(lastMonth);
    let recentDate = date.getDaysInMonth(lastMonth, lastYear);

    while (recentDay > 0) {
      totalDaysArr.unshift({
        ...currDateObj,
        month: lastMonth,
        monthShort: lastMonthShort,
        year: lastYear,
        date: recentDate,
        day: recentDay,
        dateToBeShown: `${days[recentDay]}, ${recentDate} ${lastMonthShort} ${lastYear}`,
      });

      recentDate--;
      if (recentDate <= 0) break;
      recentDay--;
    }
  }

  return totalDaysArr;
}
