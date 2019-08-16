/**
 * @file 
 * @author wuyupeng
 */

(function (context) {

    class Module {

        constructor(id) {
            this.id = id;
            this.status = 'CREATED';
            this.basePath = id;
        }

        init(basePath) {
            if (this.status === 'COMPLETED') {
                return Promise.resolve(this.exports);
            }
            this.task = new Promise((resolve, reject) => {
                this.completeNotify = resolve;
                this.load(basePath);
            });
            this.task.id = this.id;
            return this.task;
        }
          
        enable(deps, factory) {
            this.deps = deps;
            this.factory = factory;
            this.status = 'ENABLED';

            let depsTask = this.deps.map(depName => {
                return Module.get(depName)
                    .init(this.basePath.replace(/[^\/]+$/, ''));
            });

            Promise
                .all(depsTask)
                .then(depsExports => {
                    this.exports = this.factory(...depsExports);
                    this.status = 'COMPLETED';
                    this.completeNotify(this.exports);
                });
        }

        load(basePath = '') {
            let script = document.createElement('script');
            script.src = this.basePath = `${this.id}.js`;
            script.id = this.id;
            script.onload = () => {
                Module.currentLoadedId = this.id
            };
            document.head.appendChild(script);
        }

        static get(id) {
            Module.map = Module.map || {};
            if (!Module.map[id]) {
                Module.map[id] = new Module(id);
            }
            return Module.map[id];
        }
    }


    const define = (name, deps, factory) => {
        if (typeof deps === 'function') {
            factory = deps;
            deps = [];
        }
        let module = Module.get(name);
        module.enable(deps, factory);
    }

    const require = (deps, callback) => {
        let depTasks = deps.map(moduleName => Module.get(moduleName).init());

        Promise
            .all(depTasks)
            .then(depsExports => {
                callback && callback(...depsExports);
            });
    }

    context.require = require;
    context.define = define;

})(window);
