Vue.directive('focus', {
  inserted: function (el) {
      el.focus()
  }
})

const app = new Vue({
  el: '#terminal-app',
  data: {
    info: false,
    show: false,
    welcome: true,
    showskills: false,
    showprojects: false,
    characters:'',
    devdata:{
      name: '',
      name_in: 'Name: Gonzalo Andres Ramirez',
      career:'',
      career_in: 'Career: Systems Engineer',
      field:'',
      field_in: 'Field: Fullstack Developer',
      experience:'',
      experience_in: 'Experience: > 10 years working in projects with big companies like Google, Microsoft, T-Mobile, Choice Hotels, Etc.',
      interest: '',
      interest_in: 'Interests: Javascript, Python, CSS animations, videogames development, IA, AR.'
    },
    error: false,
    counter: 5,
    commands: [
      'help',
      'whois',
      'projects',
      'skills',
      'encrypt',
      'clear'
    ]
  },
  methods: {
    chars: function(stringValue, param) {
      let stringWord = stringValue;
      let that = this;
      let counter = 0;    
      let interval = setInterval(function() {
        that.devdata[param] = that.devdata[param] + stringWord[counter];
        counter ++;
        if (counter === stringWord.length) {
          clearInterval(interval);
        }
      }, 50)
    },
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
            case 'root':
              this.show = true;
              this.chars(this.devdata.name_in, 'name');
              this.chars(this.devdata.career_in, 'career');
              this.chars(this.devdata.field_in, 'field');
              this.chars(this.devdata.experience_in, 'experience');
              this.chars(this.devdata.interest_in, 'interest');
              break;
            case 'projects':
              this.showprojects = true;
              break;
            case 'skills':
              this.showskills = true;
              break;
            case 'clear':
              this.info = false;
              this.error = false;
              this.showprojects = '';
              this.showskills = '';
              this.welcome = false;
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