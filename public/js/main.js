const app = new Vue({
  el: '#terminal-app',
  data: {
    line1: false,
    commands: [
      'help',
      'whois',
      'info',
      'skills'
    ]
  }
})