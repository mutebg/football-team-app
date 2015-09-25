var constants = {
  team_name: 'Нефтохимик',
  team_logo: 'http://img2.sportal.bg/uploads/statistics/team_logo_png/00000402.png',
  navigation: [
    { title: 'Начало',    component: 'Table',   key: 'home'},
    { title: 'Програма',  component: 'Fixtures',key: 'fixtures'},
    { title: 'Класиране', component: 'Table',   key: 'table'},
    { title: 'Новини',    component: 'Table',   key: 'news'},
    { title: 'Спонсори',  component: 'Table',   key: 'sponsors'},
  ],
  standing_header: {
    team: 'Отбор',
    games: 'М',
    ga: 'ГР',
    points: 'П',
  },

  API: {
    fixtures: 'https://spreadsheets.google.com/feeds/list/1UEa5Oto7Ykg5h8_8zEj-GX3UOEK48mJEZYci7EGtc4M/od6/public/values?alt=json',
    standing: 'https://spreadsheets.google.com/feeds/list/14hGQlhumip9ubxHkm80MCxLsyTpxdeeKh0pFJkXEDIw/od6/public/values?alt=json',
  },

  color: {
    primary: '#108066',
  }
}
module.exports = constants;
