const gameSettings = { date: "2019-12-30" };
const gameSettingsproxy = new Proxy(gameSettings, {
  get: (o, property) => {
    return property in o ? o[property] : "dcode";
  },
  set: (o, property, value) => {
    o[property] = value;
  },
});
gameSettingsproxy.difficulty = "easy";
console.log(gameSettings.date);
console.log(gameSettingsproxy.difficulty);
