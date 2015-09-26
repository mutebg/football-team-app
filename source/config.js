var constants = {
  app: {
    logo: 'http://www.fm-base.co.uk/forum/attachments/football-manager-2012-stories/222926d1329053542-living-up-dream-reality-check-dobrudzha-1919-story-naftata_logo.png',
  },

  team_name: 'Нефтохимик',
  team_logo: 'http://img2.sportal.bg/uploads/statistics/team_logo_png/00000402.png',
  navigation: [
    { title: 'Начало',    component: '<Home />',      key: 'home',      icon: 'home'},
    { title: 'Програма',  component: '<Fixtures />',  key: 'fixtures',  icon: 'assignment'},
    { title: 'Класиране', component: '<Table />',     key: 'table',     icon: 'receipt'},
    { title: 'Новини',    component: '<News />',      key: 'news',      icon: 'developer-board'},
    { title: 'Фен Клуб',  component: '<FenClub />',   key: 'fenclub',   icon: 'account-circle'},
    { title: 'Спонсори',  component: '<Sponsors />',  key: 'sponsors',  icon: 'gamepad'},
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
    news: 'https://spreadsheets.google.com/feeds/list/1AjrWXh83XL5TeVSV_eSnL6BPAB40GzQbES0-i3p7ty0/od6/public/values?alt=json',
    sponsors: 'https://spreadsheets.google.com/feeds/list/1iHrHLPHJcyeCxGha5Qj-KvgY6c3qxQa6erIVyX4-ioI/od6/public/values?alt=json',
  },

  color: {
    primary: '#108066',
    orange: '#DE9320',
    border: '#ccc',
  }
}
module.exports = constants;
