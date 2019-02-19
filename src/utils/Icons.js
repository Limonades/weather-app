export const convertIcon = dataIcon => {
  let icon;
  const getIcon = x => `icon wi ${x}`;

  switch (dataIcon) {
    case 't01d':
    case 't02d':
    case 't03d':
      icon = getIcon('wi-day-thunderstorm');
      break;

    case 't01n':
    case 't02n':
    case 't03n':
      icon = getIcon('wi-night-alt-thunderstorm');
      break;

    case 't04d':
    case 't05d':
      icon = getIcon('wi-day-lightning');
      break;

    case 't04n':
    case 't05n':
      icon = getIcon('wi-night-lightning');
      break;

    case 'd01d':
    case 'd02d':
    case 'd03d':
      icon = getIcon('wi-day-sleet');
      break;

    case 'd01n':
    case 'd02n':
    case 'd03n':
      icon = getIcon('wi-night-alt-sleet');
      break;

    case 'r01d':
    case 'r02d':
    case 'r01n':
    case 'r02n':
    case 'f01d':
    case 'f01n':
    case 'r04d':
    case 'r06d':
    case 'u00d':
    case 'u00n':
      icon = getIcon('wi-rain');
      break;

    case 'r03d':
    case 'r03n':
      icon = getIcon('wi-day-rain-wind');
      break;

    case 'r05d':
      icon = getIcon('wi-day-showers');
      break;

    case 'r05n':
    case 'r06n':
      icon = getIcon('wi-night-alt-showers');
      break;

    case 's01d':
    case 's04d':
      icon = getIcon('wi-day-snow');
      break;

    case 's01n':
    case 's04n':
      icon = getIcon('wi-night-alt-snow');
      break;

    case 's02d':
    case 's02n':
    case 's03d':
    case 's03n':
      icon = getIcon('wi-snow-wind');
      break;

    case 's05d':
    case 's05n':
      icon = getIcon('wi-cloudy-gusts');
      break;

    case 's06d':
    case 's06n':
      icon = getIcon('wi-snow');
      break;

    case 'a01d':
    case 'a02d':
    case 'a03d':
    case 'a04d':
    case 'a05d':
    case 'a06d':
      icon = getIcon('wi-day-fog');
      break;

    case 'a01n':
    case 'a02n':
    case 'a03n':
    case 'a04n':
    case 'a05n':
    case 'a06n':
      icon = getIcon('wi-night-fog');
      break;

    case 'c01d':
      icon = getIcon('wi-day-sunny');
      break;

    case 'c01n':
      icon = getIcon('wi-night-clear');
      break;

    case 'c02d':
    case 'c03d':
      icon = getIcon('wi-day-cloudy');
      break;

    case 'c02n':
    case 'c03n':
      icon = getIcon('wi-night-alt-cloudy');
      break;

    case 'c04d':
      icon = getIcon('wi-day-cloudy-high');
      break;

    case 'c04n':
      icon = getIcon('wi-night-alt-cloudy-high');
      break;
    default:
      icon = 'N/A';
      break;
  }

  return icon;
};
