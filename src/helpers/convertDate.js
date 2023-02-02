/**
 *
 * @param {string} date
 * @param {string} type - 'tz' to transform date system data
 * @returns
 */

export function convertDate(date, type = '') {
  const [year, month, day] = date.split('-');
  let monthConvert;
  switch (month) {
    case '01': {
      monthConvert = 'January';
      break;
    }
    case '02': {
      monthConvert = 'February';
      break;
    }
    case '03': {
      monthConvert = 'March';
      break;
    }
    case '04': {
      monthConvert = 'April';
      break;
    }
    case '05': {
      monthConvert = 'May';
      break;
    }
    case '06': {
      monthConvert = 'June';
      break;
    }
    case '07': {
      monthConvert = 'July';
      break;
    }
    case '08': {
      monthConvert = 'August';
      break;
    }
    case '09': {
      monthConvert = 'September';
      break;
    }
    case '10': {
      monthConvert = 'October';
      break;
    }
    case '11': {
      monthConvert = 'November';
      break;
    }
    case '12': {
      monthConvert = 'December';
      break;
    }
    default:
      break;
  }

  const result = `${monthConvert} ${
    type === 'tz' ? day.split('T')[0] : day
  }, ${year}`;
  return result;
}
