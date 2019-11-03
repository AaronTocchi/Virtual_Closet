(function() {
  document.addEventListener("DOMContentLoaded", function() {
    window.$bars = {
      configure: compileTemplates,
      render: render
    }
    Handlebars.templates = {};

    function render(name, id, data) {
      let parser = new DOMParser();
      let html = Handlebars.templates[name](data);
      let fragment;
      let rval;

      data = data || id;

      if(html.indexOf('<template>') !== 0) {
        html = `<template>${html}</template>`;
      }

      fragment = parser.parseFromString(html,'text/html');

      rval = Array.from(fragment.head.children[0].content.children);
      if(id && id.length) {
        let element = document.getElementById(id);

        rval.forEach(child => element.appendChild(child));
      }
      return rval;
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
          let compiled = Handlebars.compile(text.trim());

          if (template.partial !== 'only') {
            Handlebars.templates[template.name] = compiled;
          }
          if (template.partial === 'also') {
            Handlebars.registerPartial(template.name, compiled);
            // Handlebars.partials[template.name] = compiled;
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
