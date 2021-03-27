
const dateUtil = {
  chartFormat(date) {
    return (`${dd(date)}-${mmm(date)}-${yy(date)}`);
  },
};

function dd(date) {
  const day = date.getDate();
  if (day < 10) {
    return `0${day}`;
  }
  return day;
}

function mmm(date) {
  const month = date.getMonth();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames[month];
}

function yy(date) {
  const yearString = `${date.getFullYear()}`;
  return yearString.slice(-2);
}

export default dateUtil;
