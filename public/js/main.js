const app = new Vue({
  el: '#terminal-app',
  data: {
    info: false,
    show: '',
    showskills: '',
    error: false,
    counter: 5,
    commands: [
      'help',
      'whois',
      'projects',
      'skills',
      'clear'
    ]
  },
  methods: {
    expand: function(e) {
      const terminal = document.querySelector('.terminal');
      if (terminal.classList.contains('expanded')) {
        terminal.classList.remove('expanded');
      } else {
        terminal.classList.add('expanded');
      }
      
    },
    ghost: function(e) {
      const ghostdiv = document.querySelector('.ghost');
      ghostdiv.classList.add('active');
      setTimeout(()=> {
        ghostdiv.classList.remove('active');
      }, 100)
    },
    close: function(e) {
      const bye = document.querySelector('.bye');
      bye.classList.add('active');
      setInterval(()=> {
        this.counter--;
        if (this.counter === 0) {
          window.location.href = "https://www.linkedin.com/in/gonzaloandresramirez/";
        }
      }, 1000)
    },
    validateConsole: function(e) {
      const code = e.target.value;
      if (code.length > 0) {
        this.error = false;
        if (e.keyCode === 13) {
          switch (code) {
            case 'help':
              this.info = true; 
              break;
            case 'whois':
              this.show = 'show';
              break;
            case 'code':
              
              break;
            case 'skills':
              this.showskills = 'show';
              break;
            case 'clear':
              this.info = false;
              this.error = false;
              this.show = '';
              break;
            default:
              this.error = true;
              break;
          }
          e.target.value = '';
        }         
      }
      
      this.log += e.key;
    }
  }
})