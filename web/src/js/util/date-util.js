
let dateUtil = {
  chartFormat(date) {
    return (dd(date) + "-" + MMM(date) + "-" + YY(date));
  }
};

function dd(date) {
  let day = date.getDate();
  if (day < 10) {
    return '0' + day;
  }
  return day;
}

function MMM(date) {
  let month = date.getMonth();
  var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames[month];
}

function YY(date) {
  let yearString = `${date.getFullYear()}`;
  return yearString.slice(-2);
}

export default dateUtil;
