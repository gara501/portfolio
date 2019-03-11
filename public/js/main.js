Vue.directive('focus', {
  inserted: function (el) {
      el.focus()
  },
  componentUpdated: function (el) {
    el.focus()
  }
})

const app = new Vue({
  el: '#terminal-app',
  data: {
    info: false,
    show: false,
    disabled: false,
    welcome: true,
    showskills: false,
    showprojects: false,
    showaside: false,
    characters:'',
    devdata:{
      personal: '',
      personal_in: `<p>Name: Gonzalo Andres Ramirez</p><p>Career: Systems Engineer</p>
                    <p>Field: Fullstack Developer</p>
                    <p>Experience: > 10 years working in projects with big companies like Google, Microsoft, T-Mobile, Choice Hotels, Etc.</p>
                    <p>Interests: Javascript, Python, CSS animations, videogames development, IA, AR.</p>`,
      skills: '',
      skills_in: `<div class="terminal-skills--block">
                    <h4>Front End</h4>
                    <p>Html, Css, Sass, Less, GraphQL</p>
                    <p>Angular 1, 2, React, Vue, Web Components (Polymer, Lit-element)</p>
                    <p>Webpack, Babel, Gulp</p>
                  </div>
                  <div class="terminal-skills--block">
                    <h4>Backend</h4>
                    <p>Dot Net, Python, PHP, NodeJS</p>
                  </div>
                  <div class="terminal-skills--block">
                    <h4>Databases</h4>
                    <p>MySql, SQL Server, MongoDB, Postgres, Firebase</p>
                  </div>
                  <div class="terminal-skills--block">
                    <h4>Devops</h4>
                    <p>AppEngine</p>
                  </div>
                  <div class="terminal-skills--block">
                    <a class="link" target="_blank" rel="noopener" href="https://www.github.com/gara501">My Github</a>
                  </div>`,
      projects: '',            
      projects_in: `<div class="terminal-skills--block">
                    <ul class="terminal--list">
                      <li><a href="https://cloud.google.com/chrome-enterprise/" target="_blank" rel="noopener">Google Enterprise</a>
                        <span>Redesign</span>
                      </li>
                      <li><a href="https://www.microsoft.com" target="_blank" rel="noopener">Microsoft</a>: Marketing pages.</li>
                      <li><a href="https://www.honda.com/" target="_blank" rel="noopener">Honda</a> and <a href="https://www.acura.com/" target="_blank" rel="noopener">Acura</a>: Build and price section</li>
                      <li><a href="https://www.choicehotels.com/" target="_blank" rel="noopener">Choice Hotels</a>: Site completely redesign </li>
                      <li><a href="https://www.t-mobile.com/" target="_blank" rel="noopener">T-Mobile</a>: Site redesign</li>
                    </ul>
                  </div>`,
      aside: '',            
      aside_in: `<div class="terminal-skills--block">
                    <p>Personal Trainer (NCSF) focused on hypertrophy training</p>
                    <p>Self Defense, Krav Maga, Martial Arts lover.</p>
                  </div>`,
      welcome: `
      @@@  @@@  @@@ @@@@@@@@ @@@       @@@@@@@  @@@@@@  @@@@@@@@@@  @@@@@@@@ @@@
      @@!  @@!  @@! @@!      @@!      !@@      @@!  @@@ @@! @@! @@! @@!      @@@
      @!!  !!@  @!@ @!!!:!   @!!      !@!      @!@  !@! @!! !!@ @!@ @!!!:!   !@!
       !:  !!:  !!  !!:      !!:      :!!      !!:  !!! !!:     !!: !!:         
        ::.:  :::   : :: ::: : ::.: :  :: :: :  : :. :   :      :   : :: ::: :.:                                                                       
        `
    },
    error: false,
    counter: 5,
    commands: [
      'help',
      'root',
      'projects',
      'skills',
      'aside',
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
          that.disabled = false;
        }
      }, 5);
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
      var clean = DOMPurify.sanitize(code);
      if (code.length > 0) {
        this.error = false;
        if (e.keyCode === 13) {
          switch (code) {
            case 'help':
              this.info = true; 
              break;
            case 'root':
              this.show = true;
              this.devdata.personal = '';
              this.disabled = true;
              this.chars(this.devdata.personal_in, 'personal');
              break;
            case 'projects':
              this.showprojects = true;
              this.devdata.projects = '';
              this.disabled = true;
              this.chars(this.devdata.projects_in, 'projects');
              break;
            case 'skills':
              this.showskills = true;
              this.devdata.skills = '';
              this.disabled = true;
              this.chars(this.devdata.skills_in, 'skills');
              break;
            case 'aside':
              this.showaside = true;
              this.devdata.aside = '';
              this.disabled = true;
              this.chars(this.devdata.aside_in, 'aside');
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