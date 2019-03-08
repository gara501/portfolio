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
    encrypt: () => {
      let words = document.querySelectorAll('p');
      let dict = [];

      words.forEach((key, item) => {
        let encryptedWord = CryptoJS.AES.encrypt(item.textContent, "neoistheone");
        dict.push({id:key, value:item, encrypted: encryptedWord.toString(CryptoJS.enc.Utf8)})
      })
      console.log(dict);
    },
    decrypt: () => {

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
              break;
            case 'encrypt':
              this.encrypt();
              break;
            case 'decript':
              this.decript();
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