(function () {
    document.addEventListener("DOMContentLoaded", function () {
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
                }).catch(error => {
                    reject(error);
                });
            })
        }

        function loadFile(template) {
            return new Promise((resolve, reject) => {
                $(`${template.id}`).load(`${template.file}`, (data, status) => {
                    if (status === 'error') {
                        reject(`could not load "${template.file}", path correct?`);
                    }
                    try {
                        let compiled = Handlebars.compile($(`${template.id}`).html());

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
                        if (document.getElementById(template.id.substr(1))) {
                            $(template.id).html('');
                        }
                    }
                });
            })
        };
    });
})();