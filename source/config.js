var constants = {
  app: {
    logo: 'http://www.fm-base.co.uk/forum/attachments/football-manager-2012-stories/222926d1329053542-living-up-dream-reality-check-dobrudzha-1919-story-naftata_logo.png',
  },

  team_name: 'Нефтохимик',
  team_logo: 'http://img2.sportal.bg/uploads/statistics/team_logo_png/00000402.png',
  navigation: [
    { title: 'Начало',    key: 'home',      icon: 'home'},
    { title: 'Програма',  key: 'games',  icon: 'assignment'},
    { title: 'Класиране', key: 'table',     icon: 'receipt'},
    { title: 'Новини',    key: 'news',      icon: 'developer-board'},
    { title: 'Фен Клуб',  key: 'fenclub',   icon: 'account-circle'},
    { title: 'Спонсори',  key: 'sponsors',  icon: 'gamepad'},
    { title: 'Настройки', key: 'settings',  icon: 'settings'},
  ],
  standing_header: {
    team: 'Отбор',
    games: 'М',
    ga: 'ГР',
    points: 'П',
  },

  API: {
    home:     'http://localhost:3000/api/home',
    fixtures: 'http://localhost:3000/api/games',
    standing: 'http://localhost:3000/api/table',
    news:     'http://localhost:3000/api/news',
    sponsors: 'https://spreadsheets.google.com/feeds/list/1iHrHLPHJcyeCxGha5Qj-KvgY6c3qxQa6erIVyX4-ioI/od6/public/values?alt=json',
  },

  color: {
    primary: '#108066',
    orange: '#DE9320',
    border: '#ccc',
  }
}
module.exports = constants;
