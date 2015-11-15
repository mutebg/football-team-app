import config from './config';

export function formatGame(row) {
  if ( row.home ) {
    row.teamA = config.team_name;
    row.teamB = row.team
    row.logoA = config.team_logo;
    row.logoB = row.logo
  } else {
    row.teamA = row.team
    row.teamB = config.team_name;
    row.logoA = row.logo;
    row.logoB = config.team_logo;
  }

  if ( row.result.length > 2 ) {
    row.resultA = parseInt( row.result.split(':')[0] );
    row.resultB = parseInt( row.result.split(':')[1] );
  } else {
    row.resultA = '';
    row.resultB = '';
  }

  var date = new Date( row.datetime );
  row.date = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
  row.hour = date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes();

  return row;
}

export function formatNewsDate(date) {
  return new Date( date ).toLocaleDateString()
}
