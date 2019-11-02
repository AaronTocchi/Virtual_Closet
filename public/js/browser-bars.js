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
          return compileTemplate(template);
        });
        Promise.all(promises).then(result => {
          resolve(true);
        }).catch(error => {
          reject(error);
        });
      })
    }

    function compileTemplate(template) {
      return new Promise(async (resolve, reject) => {
        try {
          let text = await load(template.href);
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
        } finally {}
      });
    };

    function load(href) {
      return new Promise((resolve, reject) => {
        fetch(href).then(response => {
          return response.text();
        }).then(text => {
          resolve(text);
        });
      })
    }
  });
})();
