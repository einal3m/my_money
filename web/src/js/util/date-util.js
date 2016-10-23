
const dateUtil = {
  chartFormat(date) {
    return (`${dd(date)}-${MMM(date)}-${YY(date)}`);
  },
};

function dd(date) {
  const day = date.getDate();
  if (day < 10) {
    return `0${day}`;
  }
  return day;
}

function MMM(date) {
  const month = date.getMonth();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames[month];
}

function YY(date) {
  const yearString = `${date.getFullYear()}`;
  return yearString.slice(-2);
}

export default dateUtil;
