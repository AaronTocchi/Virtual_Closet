(function() {
  document.addEventListener("DOMContentLoaded", function() {
    window.$bars = {
      configure: compileTemplates,
      render: render
    }
    Handlebars.templates = {};

    function render(name, data) {
      return Handlebars.templates[name](data);
    }

    function compileTemplates(templates) {
      return new Promise((resolve, reject) => {
        let promises = templates.map(template => {
          return loadFile(template);
        });
        Promise.all(promises).then(result => {
          resolve(true);
        }).catch(error => {``
          reject(error);
        });
      })
    }

    function loadFile(template) {
      return new Promise(async (resolve, reject) => {
        try {
          let text = await loader(template.href);
          let compiled = Handlebars.compile(text);

          if (template.partial !== 'only') {
            Handlebars.templates[template.name] = compiled;
          }
          if (template.partial === 'yes' || template.partial === 'also') {
            Handlebars.partials[template.name] = compiled;
          }
          resolve(Handlebars.templates[template.name])
        } catch (error) {
          reject(error);
        } finally {
        }
      });
    };
    function createPlaceholder(id) {
      let tag = document.createElement('script');

      tag.setAttribute('id',id);
      tag.setAttribute('type','text/x-handlebars-template');
      return tag;
    }
    function loader(href) {
      return new Promise((resolve, reject) => {
        if (fetch !== undefined) {
          fetch(href).then(response => {
            return response.text()
          }).then(text => {
            resolve(text);
          }).catch(error => {
            reject(error);
          });
        } else {
          let request = new XMLHttpRequest();

          request.onerror = function() {
            reject(`error loading ${href}`);
          }
          request.onreadystatechange = function() {
            if(this.readyState !== 4) {
              return;
            }
            if (this.status / 100 !== 2) {
              reject(`error ${this.status} loading ${href}`);
              this.abort();
            } else {
              resolve(this.responseText);
            }
          };
          request.open("GET", href);
          request.send();
        }
      });
    }
  });
})();
