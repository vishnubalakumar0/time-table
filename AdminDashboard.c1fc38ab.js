// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"ifaHC":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "4701cd68c1fc38ab";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"6pulf":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$56a5 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$56a5.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$56a5.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>AdminDashboard);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _animatedBackground = require("./AnimatedBackground");
var _animatedBackgroundDefault = parcelHelpers.interopDefault(_animatedBackground);
var _toast = require("./Toast");
var _hoursTracker = require("./HoursTracker");
var _hoursTrackerDefault = parcelHelpers.interopDefault(_hoursTracker);
var _timetableGrid = require("./timetableGrid");
var _timetableGridDefault = parcelHelpers.interopDefault(_timetableGrid);
var _staffTimetableGrid = require("./StaffTimetableGrid");
var _staffTimetableGridDefault = parcelHelpers.interopDefault(_staffTimetableGrid);
var _pdfUtils = require("../utils/pdfUtils");
var _timetableGenerator = require("../utils/timetableGenerator");
var _firebase = require("../utils/firebase");
var _auth = require("firebase/auth");
var _firestore = require("firebase/firestore");
var _s = $RefreshSig$();
function AdminDashboard({ user, onLogout }) {
    _s();
    const [classes, setClasses] = (0, _react.useState)([]);
    const [staff, setStaff] = (0, _react.useState)([]);
    const [subjects, setSubjects] = (0, _react.useState)([]);
    const [timetable, setTimetable] = (0, _react.useState)(null);
    const [toasts, setToasts] = (0, _react.useState)([]);
    const [loading, setLoading] = (0, _react.useState)(true);
    // Refs for scrolling
    const staffFormRef = (0, _react.useRef)(null);
    const subjectFormRef = (0, _react.useRef)(null);
    // Form Models - FIX 3: Added hallNumber for classes
    const [newClass, setNewClass] = (0, _react.useState)({
        name: '',
        hallNumber: ''
    });
    const [newStaff, setNewStaff] = (0, _react.useState)({
        id: null,
        name: '',
        username: '',
        password: '',
        freePeriodMode: 'auto',
        manualFreePeriods: 0
    });
    const [newSubject, setNewSubject] = (0, _react.useState)({
        id: null,
        className: '',
        name: '',
        subjectType: 'Core',
        hoursPerWeek: 6,
        isContinuous: false,
        blockSize: 2,
        teacher: ''
    });
    const teachers = staff.filter((s)=>s.role === "staff");
    // FIX 7: Toast duration reduced to 3 seconds
    const showToast = (message, type)=>{
        const newToast = {
            message,
            type,
            id: Date.now()
        };
        setToasts((prev)=>[
                ...prev,
                newToast
            ]);
        setTimeout(()=>removeToast(newToast.id), 3000);
    };
    const removeToast = (id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
    };
    // Helper function to convert Firebase flat format to nested arrays
    const convertFlatToNested = (flatTimetable)=>{
        if (!flatTimetable) return null;
        const nested = {};
        Object.keys(flatTimetable).forEach((key)=>{
            const slots = flatTimetable[key];
            // Check if already nested (array of arrays)
            if (Array.isArray(slots) && slots.length > 0 && Array.isArray(slots[0])) // Already nested format
            nested[key] = slots;
            else if (Array.isArray(slots)) {
                // Flat format - convert to nested
                const days = [
                    [],
                    [],
                    [],
                    [],
                    []
                ]; // 5 days
                slots.forEach((slot)=>{
                    if (slot && typeof slot.day === 'number' && typeof slot.period === 'number') {
                        if (!days[slot.day]) days[slot.day] = [];
                        days[slot.day][slot.period] = {
                            subject: slot.subject,
                            teacher: slot.teacher,
                            class: slot.class,
                            type: slot.type
                        };
                    }
                });
                // Fill empty periods
                days.forEach((day, idx)=>{
                    if (!days[idx]) days[idx] = [];
                    for(let p = 0; p < 6; p++)if (!days[idx][p]) // For class timetables, use null
                    // For staff timetables, use FREE
                    days[idx][p] = slots[0]?.class !== undefined ? {
                        subject: 'FREE',
                        class: '-',
                        type: 'free'
                    } : null;
                });
                nested[key] = days;
            }
        });
        return nested;
    };
    // Now UPDATE your fetchData function to use this helper
    // Find the section where you set timetable data and modify it:
    const fetchData = async ()=>{
        setLoading(true);
        try {
            const [cls, st, sb, tt] = await Promise.all([
                (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'classes')),
                (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'staff')),
                (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'subjects')),
                (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'timetable'))
            ]);
            setClasses(cls.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                })));
            setStaff(st.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                })));
            setSubjects(sb.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                })));
            // FIX: Convert flat format from Firebase to nested arrays
            if (!tt.empty) {
                const ttData = tt.docs[0].data();
                // Convert both class and staff timetables
                const convertedData = {
                    classTimetables: convertFlatToNested(ttData.classTimetables),
                    staffTimetables: convertFlatToNested(ttData.staffTimetables)
                };
                setTimetable(convertedData);
            }
        } catch (error) {
            showToast("\u274C Error loading data: " + error.message, 'error');
            console.error(error);
        }
        setLoading(false);
    };
    // FIX 1: Faster loading - optimized data fetching
    (0, _react.useEffect)(()=>{
        const fetchAll = async ()=>{
            try {
                const [cls, st, sb, tt] = await Promise.all([
                    (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'classes')),
                    (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'staff')),
                    (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'subjects')),
                    (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'timetable'))
                ]);
                setClasses(cls.docs.map((doc)=>({
                        id: doc.id,
                        ...doc.data()
                    })));
                setStaff(st.docs.map((doc)=>({
                        id: doc.id,
                        ...doc.data()
                    })));
                setSubjects(sb.docs.map((doc)=>({
                        id: doc.id,
                        ...doc.data()
                    })));
                // ✅ REPLACE WITH THIS - IT'S CORRECT:
                if (!tt.empty) {
                    const ttData = tt.docs[0].data();
                    const convertedData = {
                        classTimetables: convertFlatToNested(ttData.classTimetables),
                        staffTimetables: convertFlatToNested(ttData.staffTimetables)
                    };
                    setTimetable(convertedData);
                }
            } catch (error) {
                showToast("\u274C Error: " + error.message, 'error');
            } finally{
                setLoading(false);
            }
        };
        fetchAll();
    }, []);
    // ------------------- CLASS CRUD - FIX 3: Added hallNumber & edit -------------------
    const addClass = async ()=>{
        if (!newClass.name) return showToast("Enter class name", "error");
        if (classes.find((c)=>c.name === newClass.name && !newClass.id)) return showToast("Class already exists", "error");
        try {
            if (newClass.id) {
                // Update existing
                await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'classes', newClass.id), {
                    name: newClass.name,
                    hallNumber: newClass.hallNumber
                });
                setClasses(classes.map((c)=>c.id === newClass.id ? {
                        ...newClass
                    } : c));
                showToast("\u2705 Class updated!", "success");
            } else {
                // Add new
                const docRef = await (0, _firestore.addDoc)((0, _firestore.collection)((0, _firebase.db), 'classes'), {
                    name: newClass.name,
                    hallNumber: newClass.hallNumber || ''
                });
                setClasses([
                    ...classes,
                    {
                        id: docRef.id,
                        name: newClass.name,
                        hallNumber: newClass.hallNumber || ''
                    }
                ]);
                showToast("\u2705 Class added!", "success");
            }
            setNewClass({
                name: '',
                hallNumber: ''
            });
        } catch (error) {
            showToast("\u274C Operation failed", "error");
        }
    };
    const editClass = (cls)=>{
        setNewClass({
            id: cls.id,
            name: cls.name,
            hallNumber: cls.hallNumber || ''
        });
    };
    const deleteClass = async (id)=>{
        if (!window.confirm("Delete this class?")) return;
        try {
            await (0, _firestore.deleteDoc)((0, _firestore.doc)((0, _firebase.db), 'classes', id));
            setClasses(classes.filter((c)=>c.id !== id));
            showToast("\u2705 Class deleted", "success");
        } catch (error) {
            showToast("\u274C Failed to delete", "error");
        }
    };
    // ------------------- STAFF CRUD - FIX 4: Scroll to form -------------------
    const addOrUpdateStaff = async ()=>{
        if (!newStaff.name || !newStaff.username) return showToast("Fill all required fields", "error");
        try {
            if (newStaff.id) {
                const { password, ...updateData } = newStaff;
                await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'staff', newStaff.id), updateData);
                setStaff(staff.map((s)=>s.id === newStaff.id ? {
                        ...s,
                        ...updateData
                    } : s));
                resetStaffForm();
                return showToast("\u2705 Staff updated!", "success");
            }
            if (!newStaff.password) return showToast("Password required", "error");
            const email = `${newStaff.username}@timetable.com`;
            const userCredential = await (0, _auth.createUserWithEmailAndPassword)((0, _firebase.auth), email, newStaff.password);
            const uid = userCredential.user.uid;
            const staffData = {
                name: newStaff.name,
                username: newStaff.username,
                freePeriodMode: newStaff.freePeriodMode,
                manualFreePeriods: newStaff.manualFreePeriods,
                role: "staff",
                firebaseUid: uid
            };
            const docRef = await (0, _firestore.addDoc)((0, _firestore.collection)((0, _firebase.db), 'staff'), staffData);
            await (0, _firestore.setDoc)((0, _firestore.doc)((0, _firebase.db), 'users', uid), {
                fullName: newStaff.name,
                username: newStaff.username,
                role: 'staff'
            });
            setStaff([
                ...staff,
                {
                    id: docRef.id,
                    ...staffData
                }
            ]);
            resetStaffForm();
            showToast("\u2705 Staff added!", "success");
        } catch (error) {
            showToast("\u274C Operation failed: " + error.message, "error");
        }
    };
    const editStaff = (staffMember)=>{
        setNewStaff({
            ...staffMember,
            password: ''
        });
        setTimeout(()=>{
            staffFormRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
    };
    const resetStaffForm = ()=>{
        setNewStaff({
            id: null,
            name: '',
            username: '',
            password: '',
            freePeriodMode: 'auto',
            manualFreePeriods: 0
        });
    };
    const deleteStaff = async (id)=>{
        if (!window.confirm("Delete this staff member?")) return;
        try {
            await (0, _firestore.deleteDoc)((0, _firestore.doc)((0, _firebase.db), 'staff', id));
            setStaff(staff.filter((x)=>x.id !== id));
            showToast("\u2705 Staff deleted", "success");
        } catch (error) {
            showToast("\u274C Failed to delete", "error");
        }
    };
    // ------------------- SUBJECT CRUD - FIX 5: Fixed edit/delete, scroll -------------------
    const addOrUpdateSubject = async ()=>{
        if (!newSubject.className || !newSubject.name || !newSubject.teacher) return showToast("Fill all required fields", "error");
        try {
            const subjectData = {
                className: newSubject.className,
                name: newSubject.name,
                subjectType: newSubject.subjectType,
                hoursPerWeek: newSubject.hoursPerWeek,
                isContinuous: newSubject.isContinuous,
                blockSize: newSubject.blockSize,
                teacher: newSubject.teacher
            };
            if (newSubject.id) {
                await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'subjects', newSubject.id), subjectData);
                setSubjects(subjects.map((s)=>s.id === newSubject.id ? {
                        id: newSubject.id,
                        ...subjectData
                    } : s));
                showToast("\u2705 Subject updated!", "success");
            } else {
                const docRef = await (0, _firestore.addDoc)((0, _firestore.collection)((0, _firebase.db), 'subjects'), subjectData);
                setSubjects([
                    ...subjects,
                    {
                        id: docRef.id,
                        ...subjectData
                    }
                ]);
                showToast("\u2705 Subject added!", "success");
            }
            resetSubjectForm();
        } catch (error) {
            showToast("\u274C Operation failed", "error");
            console.error(error);
        }
    };
    const editSubject = (subject)=>{
        setNewSubject({
            id: subject.id,
            className: subject.className,
            name: subject.name,
            subjectType: subject.subjectType,
            hoursPerWeek: subject.hoursPerWeek,
            isContinuous: subject.isContinuous || false,
            blockSize: subject.blockSize || 2,
            teacher: subject.teacher
        });
        setTimeout(()=>{
            subjectFormRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
    };
    const resetSubjectForm = ()=>{
        setNewSubject({
            id: null,
            className: '',
            name: '',
            subjectType: 'Core',
            hoursPerWeek: 6,
            isContinuous: false,
            blockSize: 2,
            teacher: ''
        });
    };
    const deleteSubject = async (id)=>{
        if (!window.confirm("Delete this subject?")) return;
        try {
            await (0, _firestore.deleteDoc)((0, _firestore.doc)((0, _firebase.db), 'subjects', id));
            setSubjects(subjects.filter((s)=>s.id !== id));
            showToast("\u2705 Subject deleted", "success");
        } catch (error) {
            showToast("\u274C Failed to delete", "error");
        }
    };
    // ------------------- TIMETABLE GENERATION - FIX 6: Save to staff -------------------
    const generateTimetable = async ()=>{
        setLoading(true);
        try {
            const generator = new (0, _timetableGenerator.TimetableGenerator)(classes, staff.filter((s)=>s.role === 'staff'), subjects);
            const validation = generator.validate();
            if (!validation.valid) {
                showToast("\u274C Validation: " + validation.errors[0], 'error');
                setLoading(false);
                return;
            }
            const result = generator.generate();
            if (result.success) {
                // Convert nested arrays to Firebase-friendly format
                const serializableClassTimetables = {};
                const serializableStaffTimetables = {};
                // Flatten class timetables
                Object.keys(result.classTimetables).forEach((className)=>{
                    serializableClassTimetables[className] = result.classTimetables[className].map((day, dayIndex)=>{
                        return day.map((period, periodIndex)=>({
                                day: dayIndex,
                                period: periodIndex,
                                subject: period?.subject || null,
                                teacher: period?.teacher || null,
                                type: period?.type || null
                            }));
                    }).flat();
                });
                // Flatten staff timetables
                Object.keys(result.staffTimetables).forEach((staffName)=>{
                    serializableStaffTimetables[staffName] = result.staffTimetables[staffName].map((day, dayIndex)=>{
                        return day.map((period, periodIndex)=>({
                                day: dayIndex,
                                period: periodIndex,
                                subject: period?.subject || null,
                                class: period?.class || null,
                                type: period?.type || null
                            }));
                    }).flat();
                });
                const timetableData = {
                    classTimetables: serializableClassTimetables,
                    staffTimetables: serializableStaffTimetables,
                    generatedAt: new Date().toISOString()
                };
                // Save to Firebase
                const ttRef = (0, _firestore.collection)((0, _firebase.db), 'timetable');
                const existing = await (0, _firestore.getDocs)(ttRef);
                if (!existing.empty) await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'timetable', existing.docs[0].id), timetableData);
                else await (0, _firestore.addDoc)(ttRef, timetableData);
                // Save individual staff timetables
                const teachers = staff.filter((s)=>s.role === 'staff');
                for (const teacher of teachers){
                    const staffTT = serializableStaffTimetables[teacher.name];
                    if (staffTT) await (0, _firestore.setDoc)((0, _firestore.doc)((0, _firebase.db), 'staffTimetables', teacher.id), {
                        staffName: teacher.name,
                        timetable: staffTT,
                        generatedAt: new Date().toISOString()
                    });
                }
                // Convert back to nested arrays for display
                const displayClassTimetables = {};
                Object.keys(serializableClassTimetables).forEach((className)=>{
                    const days = [
                        [],
                        [],
                        [],
                        [],
                        []
                    ];
                    serializableClassTimetables[className].forEach((slot)=>{
                        if (!days[slot.day]) days[slot.day] = [];
                        days[slot.day][slot.period] = {
                            subject: slot.subject,
                            teacher: slot.teacher,
                            type: slot.type
                        };
                    });
                    // Fill empty periods with null
                    days.forEach((day, idx)=>{
                        if (!days[idx]) days[idx] = [];
                        for(let p = 0; p < 6; p++)if (!days[idx][p]) days[idx][p] = null;
                    });
                    displayClassTimetables[className] = days;
                });
                const displayStaffTimetables = {};
                Object.keys(serializableStaffTimetables).forEach((staffName)=>{
                    const days = [
                        [],
                        [],
                        [],
                        [],
                        []
                    ];
                    serializableStaffTimetables[staffName].forEach((slot)=>{
                        if (!days[slot.day]) days[slot.day] = [];
                        days[slot.day][slot.period] = {
                            subject: slot.subject,
                            class: slot.class,
                            type: slot.type
                        };
                    });
                    // Fill empty periods with FREE
                    days.forEach((day, idx)=>{
                        if (!days[idx]) days[idx] = [];
                        for(let p = 0; p < 6; p++)if (!days[idx][p]) days[idx][p] = {
                            subject: 'FREE',
                            class: '-',
                            type: 'free'
                        };
                    });
                    displayStaffTimetables[staffName] = days;
                });
                setTimetable({
                    classTimetables: displayClassTimetables,
                    staffTimetables: displayStaffTimetables
                });
                showToast("\u2705 Timetable generated & saved!", 'success');
                setTimeout(()=>{
                    document.getElementById('view-timetables')?.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 1000);
            } else showToast("\u274C Failed: " + result.error, 'error');
        } catch (error) {
            showToast("\u274C Error: " + error.message, 'error');
            console.error(error);
        }
        setLoading(false);
    };
    if (loading) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _animatedBackgroundDefault.default), {}, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 531,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white',
                    fontSize: '24px',
                    gap: '20px'
                },
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "spinner"
                    }, void 0, false, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 542,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 543,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 532,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _animatedBackgroundDefault.default), {}, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 551,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "header",
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    className: "header-content",
                    children: [
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h1", {
                            children: "\uD83C\uDFEB Admin Dashboard"
                        }, void 0, false, {
                            fileName: "src/components/AdminDashboard.jsx",
                            lineNumber: 555,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: "header-actions",
                            children: [
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                    className: "theme-toggle",
                                    children: "\uD83C\uDF19"
                                }, void 0, false, {
                                    fileName: "src/components/AdminDashboard.jsx",
                                    lineNumber: 557,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                    className: "btn btn-danger btn-sm",
                                    onClick: onLogout,
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "src/components/AdminDashboard.jsx",
                                    lineNumber: 558,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/AdminDashboard.jsx",
                            lineNumber: 556,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/AdminDashboard.jsx",
                    lineNumber: 554,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 553,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "content",
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "section",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                        className: "section-icon",
                                        children: "\uD83D\uDCDA"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 570,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Classes"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 571,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 569,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: newClass.id ? "\u270F\uFE0F Edit Class" : "\u2795 Add New Class"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 575,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "grid-2",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Class Name *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 578,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                        type: "text",
                                                        value: newClass.name,
                                                        onChange: (e)=>setNewClass({
                                                                ...newClass,
                                                                name: e.target.value.toUpperCase()
                                                            }),
                                                        placeholder: "CS3A, EE2B"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 579,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 577,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Hall Number (Optional)"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 587,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                        type: "text",
                                                        value: newClass.hallNumber,
                                                        onChange: (e)=>setNewClass({
                                                                ...newClass,
                                                                hallNumber: e.target.value
                                                            }),
                                                        placeholder: "Hall 101"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 588,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 586,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 576,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '10px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-primary",
                                                onClick: addClass,
                                                children: newClass.id ? "\uD83D\uDCBE Update Class" : "\u2795 Add Class"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 597,
                                                columnNumber: 29
                                            }, this),
                                            newClass.id && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-secondary",
                                                onClick: ()=>setNewClass({
                                                        name: '',
                                                        hallNumber: ''
                                                    }),
                                                children: "\u274C Cancel"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 601,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 596,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 574,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: [
                                            "Existing Classes (",
                                            classes.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 609,
                                        columnNumber: 25
                                    }, this),
                                    classes.length === 0 ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                                        style: {
                                            color: '#64748b',
                                            textAlign: 'center',
                                            padding: '20px'
                                        },
                                        children: "No classes added yet"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 611,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "desktop-table",
                                                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("table", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("thead", {
                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "#"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 620,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Class Name"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 621,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Hall Number"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 622,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Subjects"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 623,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Hours"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 624,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Actions"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 625,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 619,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 618,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tbody", {
                                                            children: classes.map((cls, idx)=>{
                                                                const classSubjects = subjects.filter((s)=>s.className === cls.name);
                                                                const totalHours = classSubjects.reduce((sum, s)=>sum + s.hoursPerWeek, 0);
                                                                return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: idx + 1
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 635,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("strong", {
                                                                                children: cls.name
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 636,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 636,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: cls.hallNumber || '-'
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 637,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: classSubjects.length
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 638,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: `badge ${totalHours === 30 ? 'badge-success' : 'badge-danger'}`,
                                                                                children: [
                                                                                    totalHours,
                                                                                    "/30h"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 640,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 639,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                className: "action-buttons",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                        className: "btn-icon btn-icon-primary",
                                                                                        onClick: ()=>editClass(cls),
                                                                                        title: "Edit",
                                                                                        children: "\u270F\uFE0F"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 646,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                        className: "btn-icon btn-icon-danger",
                                                                                        onClick: ()=>deleteClass(cls.id),
                                                                                        title: "Delete",
                                                                                        children: "\uD83D\uDDD1\uFE0F"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 653,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 645,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 644,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, cls.id, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 634,
                                                                    columnNumber: 53
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 628,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 617,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 616,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "mobile-cards",
                                                children: classes.map((cls, idx)=>{
                                                    const classSubjects = subjects.filter((s)=>s.className === cls.name);
                                                    const totalHours = classSubjects.reduce((sum, s)=>sum + s.hoursPerWeek, 0);
                                                    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "mobile-card",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card-header",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                        className: "mobile-card-title",
                                                                        children: cls.name
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 677,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                        className: "mobile-card-badge",
                                                                        children: [
                                                                            "#",
                                                                            idx + 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 678,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 676,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card-body",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                        className: "mobile-card-row",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-label",
                                                                                children: "Hall:"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 682,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: cls.hallNumber || '-'
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 683,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 681,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                        className: "mobile-card-row",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-label",
                                                                                children: "Subjects:"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 686,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: classSubjects.length
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 687,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 685,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                        className: "mobile-card-row",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-label",
                                                                                children: "Hours:"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 690,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: [
                                                                                    totalHours,
                                                                                    "/30h"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 691,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 689,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 680,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card-actions",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                        className: "btn btn-primary btn-sm",
                                                                        onClick: ()=>editClass(cls),
                                                                        children: "\u270F\uFE0F Edit"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 695,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                        className: "btn btn-danger btn-sm",
                                                                        onClick: ()=>deleteClass(cls.id),
                                                                        children: "\uD83D\uDDD1\uFE0F Delete"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 698,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 694,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, cls.id, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 675,
                                                        columnNumber: 45
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 669,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 608,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 568,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "section",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                        className: "section-icon",
                                        children: "\uD83D\uDC65"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 714,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Staff"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 715,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 713,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                ref: staffFormRef,
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: newStaff.id ? "\u270F\uFE0F Edit Staff" : "\u2795 Add New Staff"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 719,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "grid-2",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Full Name *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 722,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                        type: "text",
                                                        placeholder: "Dr. John Doe",
                                                        value: newStaff.name,
                                                        onChange: (e)=>setNewStaff({
                                                                ...newStaff,
                                                                name: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 723,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 721,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Username *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 731,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                        type: "text",
                                                        placeholder: "john",
                                                        disabled: !!newStaff.id,
                                                        value: newStaff.username,
                                                        onChange: (e)=>setNewStaff({
                                                                ...newStaff,
                                                                username: e.target.value
                                                            }),
                                                        style: newStaff.id ? {
                                                            background: '#f1f5f9',
                                                            cursor: 'not-allowed'
                                                        } : {}
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 732,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 730,
                                                columnNumber: 29
                                            }, this),
                                            !newStaff.id && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Password *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 743,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                        type: "password",
                                                        placeholder: "Password",
                                                        value: newStaff.password,
                                                        onChange: (e)=>setNewStaff({
                                                                ...newStaff,
                                                                password: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 744,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 742,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Free Period Mode"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 753,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("select", {
                                                        value: newStaff.freePeriodMode,
                                                        onChange: (e)=>setNewStaff({
                                                                ...newStaff,
                                                                freePeriodMode: e.target.value
                                                            }),
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "auto",
                                                                children: "Auto"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 758,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "manual",
                                                                children: "Manual"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 759,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 754,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 752,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 720,
                                        columnNumber: 25
                                    }, this),
                                    newStaff.freePeriodMode === 'manual' && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                children: "Free Periods per Week"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 766,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                type: "number",
                                                min: "0",
                                                max: "30",
                                                value: newStaff.manualFreePeriods,
                                                onChange: (e)=>setNewStaff({
                                                        ...newStaff,
                                                        manualFreePeriods: parseInt(e.target.value) || 0
                                                    })
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 767,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 765,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "button-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-primary",
                                                onClick: addOrUpdateStaff,
                                                children: newStaff.id ? "\uD83D\uDCBE Save Changes" : "\u2795 Add Staff"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 781,
                                                columnNumber: 29
                                            }, this),
                                            newStaff.id && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-secondary",
                                                onClick: resetStaffForm,
                                                children: "\u274C Cancel"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 785,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 780,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 718,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: [
                                            "Existing Staff (",
                                            teachers.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 793,
                                        columnNumber: 25
                                    }, this),
                                    teachers.length === 0 ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                                        style: {
                                            color: '#64748b',
                                            textAlign: 'center',
                                            padding: '20px'
                                        },
                                        children: "No staff added yet"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 795,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "desktop-table",
                                                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("table", {
                                                    children: [
                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("thead", {
                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "S.No"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 804,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Name"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 805,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Username"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 806,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Mode"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 807,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Actions"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 808,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 803,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 802,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tbody", {
                                                            children: teachers.map((s, idx)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "staff-badge",
                                                                                children: [
                                                                                    "S",
                                                                                    idx + 1
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 814,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 814,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("strong", {
                                                                                children: s.name
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 815,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 815,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: s.username
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 816,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: s.freePeriodMode === 'manual' ? `Manual (${s.manualFreePeriods})` : 'Auto'
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 817,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                className: "action-buttons",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                        className: "btn-icon btn-icon-primary",
                                                                                        onClick: ()=>editStaff(s),
                                                                                        title: "Edit",
                                                                                        children: "\u270F\uFE0F"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 824,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                        className: "btn-icon btn-icon-danger",
                                                                                        onClick: ()=>deleteStaff(s.id),
                                                                                        title: "Delete",
                                                                                        children: "\uD83D\uDDD1\uFE0F"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 831,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 823,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 822,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, s.id, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 813,
                                                                    columnNumber: 49
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 811,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 801,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 800,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "mobile-cards",
                                                children: teachers.map((s, idx)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "mobile-card",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card-header",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                        className: "mobile-card-title",
                                                                        children: s.name
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 850,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                        className: "mobile-card-badge",
                                                                        children: [
                                                                            "S",
                                                                            idx + 1
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 851,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 849,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card-body",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                        className: "mobile-card-row",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-label",
                                                                                children: "Username:"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 855,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: s.username
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 856,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 854,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                        className: "mobile-card-row",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-label",
                                                                                children: "Mode:"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 859,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: s.freePeriodMode === 'manual' ? `Manual (${s.manualFreePeriods})` : 'Auto'
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 860,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 858,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 853,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card-actions",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                        className: "btn btn-primary btn-sm",
                                                                        onClick: ()=>editStaff(s),
                                                                        children: "\u270F\uFE0F Edit"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 868,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                        className: "btn btn-danger btn-sm",
                                                                        onClick: ()=>deleteStaff(s.id),
                                                                        children: "\uD83D\uDDD1\uFE0F Delete"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 871,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 867,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, s.id, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 848,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 846,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 792,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 712,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "section",
                        id: "subject-section",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                        className: "section-icon",
                                        children: "\uD83D\uDCD6"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 886,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Subjects"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 887,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 885,
                                columnNumber: 21
                            }, this),
                            newSubject.className && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _hoursTrackerDefault.default), {
                                className: newSubject.className,
                                subjects: subjects
                            }, void 0, false, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 891,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                ref: subjectFormRef,
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: newSubject.id ? "\u270F\uFE0F Edit Subject" : "\u2795 Add New Subject"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 895,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "grid-2",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Select Class *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 898,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("select", {
                                                        value: newSubject.className,
                                                        onChange: (e)=>setNewSubject({
                                                                ...newSubject,
                                                                className: e.target.value
                                                            }),
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "",
                                                                children: "-- Select Class --"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 903,
                                                                columnNumber: 37
                                                            }, this),
                                                            classes.map((cls)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                    value: cls.name,
                                                                    children: cls.name
                                                                }, cls.id, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 905,
                                                                    columnNumber: 41
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 899,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 897,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Subject Name *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 910,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                        type: "text",
                                                        value: newSubject.name,
                                                        onChange: (e)=>setNewSubject({
                                                                ...newSubject,
                                                                name: e.target.value
                                                            }),
                                                        placeholder: "DBMS, AI Lab, etc."
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 911,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 909,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Subject Type *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 919,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("select", {
                                                        value: newSubject.subjectType,
                                                        onChange: (e)=>setNewSubject({
                                                                ...newSubject,
                                                                subjectType: e.target.value
                                                            }),
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Core",
                                                                children: "Core"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 924,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Elective",
                                                                children: "Elective"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 925,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Lab",
                                                                children: "Lab"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 926,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Other",
                                                                children: "Other"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 927,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 920,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 918,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Hours per Week *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 931,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                        type: "number",
                                                        min: "1",
                                                        max: "30",
                                                        value: newSubject.hoursPerWeek,
                                                        onChange: (e)=>setNewSubject({
                                                                ...newSubject,
                                                                hoursPerWeek: parseInt(e.target.value) || 6
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 932,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 930,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Teacher *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 944,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("select", {
                                                        value: newSubject.teacher,
                                                        onChange: (e)=>setNewSubject({
                                                                ...newSubject,
                                                                teacher: e.target.value
                                                            }),
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "",
                                                                children: "-- Select Teacher --"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 949,
                                                                columnNumber: 37
                                                            }, this),
                                                            teachers.map((t)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                    value: t.name,
                                                                    children: t.name
                                                                }, t.id, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 951,
                                                                    columnNumber: 41
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 945,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 943,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 896,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "checkbox-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                type: "checkbox",
                                                id: "continuous",
                                                checked: newSubject.isContinuous,
                                                onChange: (e)=>setNewSubject({
                                                        ...newSubject,
                                                        isContinuous: e.target.checked
                                                    })
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 958,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                htmlFor: "continuous",
                                                style: {
                                                    marginBottom: 0
                                                },
                                                children: "Continuous Period (Lab)"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 964,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 957,
                                        columnNumber: 25
                                    }, this),
                                    newSubject.isContinuous && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                children: "Block Size"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 971,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("select", {
                                                value: newSubject.blockSize,
                                                onChange: (e)=>setNewSubject({
                                                        ...newSubject,
                                                        blockSize: parseInt(e.target.value)
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                        value: 2,
                                                        children: "2 Periods"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 979,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                        value: 3,
                                                        children: "3 Periods"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 980,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 972,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 970,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "button-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-primary",
                                                onClick: addOrUpdateSubject,
                                                children: newSubject.id ? "\uD83D\uDCBE Save Changes" : "\u2795 Add Subject"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 986,
                                                columnNumber: 29
                                            }, this),
                                            newSubject.id && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-secondary",
                                                onClick: resetSubjectForm,
                                                children: "\u274C Cancel"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 990,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 985,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 894,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: [
                                            "Existing Subjects (",
                                            subjects.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 998,
                                        columnNumber: 25
                                    }, this),
                                    subjects.length === 0 ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                                        style: {
                                            color: '#64748b',
                                            textAlign: 'center',
                                            padding: '20px'
                                        },
                                        children: "No subjects added yet"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1000,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
                                        children: classes.map((cls)=>{
                                            const classSubjects = subjects.filter((s)=>s.className === cls.name);
                                            if (classSubjects.length === 0) return null;
                                            const totalHours = classSubjects.reduce((sum, s)=>sum + s.hoursPerWeek, 0);
                                            return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                style: {
                                                    marginBottom: '30px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h4", {
                                                        style: {
                                                            marginBottom: '15px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                            color: '#1e293b',
                                                            flexWrap: 'wrap'
                                                        },
                                                        children: [
                                                            "Class: ",
                                                            cls.name,
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                className: `badge ${totalHours === 30 ? 'badge-success' : 'badge-danger'}`,
                                                                children: [
                                                                    totalHours,
                                                                    "/30 hours"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1022,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1013,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "desktop-table",
                                                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("table", {
                                                            children: [
                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("thead", {
                                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Subject"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1031,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Type"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1032,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Hours"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1033,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Teacher"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1034,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Continuous"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1035,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Actions"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1036,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1030,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 1029,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tbody", {
                                                                    children: classSubjects.map((sub)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("strong", {
                                                                                        children: sub.name
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1042,
                                                                                        columnNumber: 69
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1042,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.subjectType
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1043,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: [
                                                                                        sub.hoursPerWeek,
                                                                                        "h"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1044,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.teacher
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1045,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.isContinuous ? `Yes (${sub.blockSize}p)` : 'No'
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1046,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                        className: "action-buttons",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                                className: "btn-icon btn-icon-primary",
                                                                                                onClick: ()=>editSubject(sub),
                                                                                                title: "Edit",
                                                                                                children: "\u270F\uFE0F"
                                                                                            }, void 0, false, {
                                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                                lineNumber: 1051,
                                                                                                columnNumber: 73
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                                className: "btn-icon btn-icon-danger",
                                                                                                onClick: ()=>deleteSubject(sub.id),
                                                                                                title: "Delete",
                                                                                                children: "\uD83D\uDDD1\uFE0F"
                                                                                            }, void 0, false, {
                                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                                lineNumber: 1058,
                                                                                                columnNumber: 73
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1050,
                                                                                        columnNumber: 69
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1049,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, sub.id, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 1041,
                                                                            columnNumber: 61
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 1039,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 1028,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1027,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "mobile-cards",
                                                        children: classSubjects.map((sub)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                        className: "mobile-card-header",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-title",
                                                                                children: sub.name
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1077,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-badge",
                                                                                children: sub.subjectType
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1078,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1076,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                        className: "mobile-card-body",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                className: "mobile-card-row",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-label",
                                                                                        children: "Hours:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1082,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-value",
                                                                                        children: [
                                                                                            sub.hoursPerWeek,
                                                                                            "h"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1083,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1081,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                className: "mobile-card-row",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-label",
                                                                                        children: "Teacher:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1086,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-value",
                                                                                        children: sub.teacher
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1087,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1085,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                className: "mobile-card-row",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-label",
                                                                                        children: "Continuous:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1090,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-value",
                                                                                        children: sub.isContinuous ? `Yes (${sub.blockSize}p)` : 'No'
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1091,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1089,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1080,
                                                                        columnNumber: 57
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                        className: "mobile-card-actions",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                className: "btn btn-primary btn-sm",
                                                                                onClick: ()=>editSubject(sub),
                                                                                children: "\u270F\uFE0F Edit"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1097,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                className: "btn btn-danger btn-sm",
                                                                                onClick: ()=>deleteSubject(sub.id),
                                                                                children: "\uD83D\uDDD1\uFE0F Delete"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1100,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1096,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, sub.id, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1075,
                                                                columnNumber: 53
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1073,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, cls.id, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1012,
                                                columnNumber: 41
                                            }, this);
                                        })
                                    }, void 0, false)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 997,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 884,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "section",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                        className: "section-icon",
                                        children: "\u26A1"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1118,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Generate Timetable"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1119,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1117,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Ready to Generate"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1123,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "info-box",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                                                style: {
                                                    marginBottom: '15px',
                                                    fontSize: '15px',
                                                    lineHeight: '1.6'
                                                },
                                                children: "The smart algorithm will create an optimized timetable:"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1125,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("ul", {
                                                style: {
                                                    marginLeft: '25px',
                                                    lineHeight: '1.8'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
                                                        children: "\u2705 No free periods (all 30 filled)"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1129,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
                                                        children: "\u2705 High-hour subjects (\u22655h) appear daily"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1130,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
                                                        children: "\u2705 Labs in continuous blocks"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1131,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
                                                        children: "\u2705 No teacher conflicts"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1132,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
                                                        children: "\u2705 Balanced workload"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1133,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1128,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1124,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "stats-grid",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "stat-card stat-primary",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-label",
                                                        children: "Classes"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1139,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-value",
                                                        children: classes.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1140,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1138,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "stat-card stat-success",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-label",
                                                        children: "Teachers"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1143,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-value",
                                                        children: teachers.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1144,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1142,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "stat-card stat-warning",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-label",
                                                        children: "Subjects"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1147,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-value",
                                                        children: subjects.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1148,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1146,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1137,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        className: "btn btn-success btn-lg",
                                        onClick: generateTimetable,
                                        disabled: loading,
                                        children: loading ? "\u23F3 Generating..." : "\u26A1 Generate Timetable"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1152,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1122,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 1116,
                        columnNumber: 17
                    }, this),
                    timetable && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "section",
                        id: "view-timetables",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                        className: "section-icon",
                                        children: "\uD83D\uDCCA"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1166,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Generated Timetables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1167,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1165,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Class-wise Timetables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1171,
                                        columnNumber: 29
                                    }, this),
                                    classes.map((cls)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "timetable-container",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h4", {
                                                    className: "timetable-title",
                                                    children: [
                                                        "Class: ",
                                                        cls.name,
                                                        " ",
                                                        cls.hallNumber && `(${cls.hallNumber})`
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1174,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                    className: "timetable-scroll",
                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _timetableGridDefault.default), {
                                                        timetable: timetable.classTimetables,
                                                        className: cls.name
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1178,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1177,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                    className: "timetable-actions no-print",
                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                        className: "btn btn-primary btn-sm",
                                                        onClick: ()=>(0, _pdfUtils.exportToPDF)('timetable-export', `${cls.name}_Timetable.pdf`),
                                                        children: "\uD83D\uDCC4 Download PDF"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1184,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1183,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, cls.id, true, {
                                            fileName: "src/components/AdminDashboard.jsx",
                                            lineNumber: 1173,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1170,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Staff-wise Timetables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1196,
                                        columnNumber: 29
                                    }, this),
                                    teachers.map((teacher)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "timetable-container",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h4", {
                                                    className: "timetable-title",
                                                    children: [
                                                        "Teacher: ",
                                                        teacher.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1199,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                    className: "timetable-scroll",
                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _staffTimetableGridDefault.default), {
                                                        timetable: timetable.staffTimetables,
                                                        staffName: teacher.name
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1203,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1202,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                    className: "timetable-actions no-print",
                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                        className: "btn btn-primary btn-sm",
                                                        onClick: ()=>(0, _pdfUtils.exportToPDF)('staff-timetable-export', `${teacher.name}_Timetable.pdf`),
                                                        children: "\uD83D\uDCC4 Download PDF"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1209,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1208,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, teacher.id, true, {
                                            fileName: "src/components/AdminDashboard.jsx",
                                            lineNumber: 1198,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1195,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 1164,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 565,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _toast.ToastContainer), {
                toasts: toasts,
                removeToast: removeToast
            }, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 1224,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(AdminDashboard, "y/ttHZnMgPk719JpuTl1ulol81c=");
_c = AdminDashboard;
var _c;
$RefreshReg$(_c, "AdminDashboard");

  $parcel$ReactRefreshHelpers$56a5.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","./AnimatedBackground":"8BTPX","./Toast":"jptcB","./HoursTracker":"k2NcG","./timetableGrid":"90aaK","./StaffTimetableGrid":"fc4Yr","../utils/pdfUtils":"jSko5","../utils/timetableGenerator":"7lXFL","../utils/firebase":"5V7se","firebase/auth":"4ZBbi","firebase/firestore":"3RBs1","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"jptcB":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$a7e7 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$a7e7.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$a7e7.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Toast", ()=>Toast);
parcelHelpers.export(exports, "ToastContainer", ()=>ToastContainer);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
var _s = $RefreshSig$();
function Toast({ message, type, onClose }) {
    _s();
    (0, _react.useEffect)(()=>{
        const timer = setTimeout(onClose, 5000);
        return ()=>clearTimeout(timer);
    }, [
        onClose
    ]);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: `toast toast-${type}`,
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "toast-icon",
                children: type === 'success' ? "\u2705" : "\u274C"
            }, void 0, false, {
                fileName: "src/components/Toast.jsx",
                lineNumber: 11,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "toast-text",
                children: message
            }, void 0, false, {
                fileName: "src/components/Toast.jsx",
                lineNumber: 14,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/Toast.jsx",
        lineNumber: 10,
        columnNumber: 9
    }, this);
}
_s(Toast, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Toast;
function ToastContainer({ toasts, removeToast }) {
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: "toast-container",
        children: toasts.map((toast, index)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(Toast, {
                message: toast.message,
                type: toast.type,
                onClose: ()=>removeToast(index)
            }, index, false, {
                fileName: "src/components/Toast.jsx",
                lineNumber: 23,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "src/components/Toast.jsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
_c1 = ToastContainer;
var _c, _c1;
$RefreshReg$(_c, "Toast");
$RefreshReg$(_c1, "ToastContainer");

  $parcel$ReactRefreshHelpers$a7e7.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"k2NcG":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$7762 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$7762.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$7762.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>HoursTracker);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
function HoursTracker({ className, subjects }) {
    const allocated = subjects.filter((s)=>s.className === className).reduce((sum, s)=>sum + s.hoursPerWeek, 0);
    const remaining = 30 - allocated;
    const percentage = allocated / 30 * 100;
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: "hours-tracker",
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "hours-grid",
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "hours-item",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "hours-label",
                                children: "Allocated"
                            }, void 0, false, {
                                fileName: "src/components/HoursTracker.jsx",
                                lineNumber: 15,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "hours-value",
                                children: allocated
                            }, void 0, false, {
                                fileName: "src/components/HoursTracker.jsx",
                                lineNumber: 16,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/HoursTracker.jsx",
                        lineNumber: 14,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "hours-item",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "hours-label",
                                children: "Remaining"
                            }, void 0, false, {
                                fileName: "src/components/HoursTracker.jsx",
                                lineNumber: 19,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "hours-value",
                                children: remaining
                            }, void 0, false, {
                                fileName: "src/components/HoursTracker.jsx",
                                lineNumber: 20,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/HoursTracker.jsx",
                        lineNumber: 18,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "hours-item",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "hours-label",
                                children: "Total"
                            }, void 0, false, {
                                fileName: "src/components/HoursTracker.jsx",
                                lineNumber: 23,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "hours-value",
                                children: "30"
                            }, void 0, false, {
                                fileName: "src/components/HoursTracker.jsx",
                                lineNumber: 24,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/HoursTracker.jsx",
                        lineNumber: 22,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/HoursTracker.jsx",
                lineNumber: 13,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "progress-bar",
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    className: "progress-fill",
                    style: {
                        width: `${Math.min(percentage, 100)}%`
                    }
                }, void 0, false, {
                    fileName: "src/components/HoursTracker.jsx",
                    lineNumber: 28,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "src/components/HoursTracker.jsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            remaining === 0 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                style: {
                    marginTop: '12px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                },
                children: "\u2713 Perfect! No free periods."
            }, void 0, false, {
                fileName: "src/components/HoursTracker.jsx",
                lineNumber: 34,
                columnNumber: 17
            }, this),
            remaining < 0 && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                style: {
                    marginTop: '12px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#ef4444'
                },
                children: [
                    "\u26A0 Over by ",
                    Math.abs(remaining),
                    " hours!"
                ]
            }, void 0, true, {
                fileName: "src/components/HoursTracker.jsx",
                lineNumber: 39,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/HoursTracker.jsx",
        lineNumber: 12,
        columnNumber: 9
    }, this);
}
_c = HoursTracker;
var _c;
$RefreshReg$(_c, "HoursTracker");

  $parcel$ReactRefreshHelpers$7762.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"90aaK":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$9cd3 = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$9cd3.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$9cd3.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>TimetableGrid);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
];
function TimetableGrid({ timetable, className }) {
    if (!timetable || !timetable[className]) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        style: {
            padding: '40px',
            textAlign: 'center',
            color: '#64748b'
        },
        children: "No timetable available"
    }, void 0, false, {
        fileName: "src/components/timetableGrid.jsx",
        lineNumber: 8,
        columnNumber: 13
    }, this);
    const grid = timetable[className];
    // Debug code
    console.log('TimetableGrid - className:', className);
    console.log('TimetableGrid - grid:', grid);
    console.log('TimetableGrid - grid is array?', Array.isArray(grid));
    // Safety check: if grid is not an array or not nested properly
    if (!Array.isArray(grid) || grid.length === 0) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        style: {
            padding: '40px',
            textAlign: 'center',
            color: '#64748b'
        },
        children: "Invalid timetable format"
    }, void 0, false, {
        fileName: "src/components/timetableGrid.jsx",
        lineNumber: 24,
        columnNumber: 13
    }, this);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        id: "class-timetable-export",
        className: "timetable-grid",
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "timetable-header",
                children: "Day/Period"
            }, void 0, false, {
                fileName: "src/components/timetableGrid.jsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            [
                ...Array(6)
            ].map((_, i)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    className: "timetable-header",
                    children: [
                        "P",
                        i + 1
                    ]
                }, i, true, {
                    fileName: "src/components/timetableGrid.jsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, this)),
            DAYS.map((day, dayIndex)=>{
                // Safety check for each day
                if (!grid[dayIndex] || !Array.isArray(grid[dayIndex])) return null;
                return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
                    children: [
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: "timetable-day",
                            children: day
                        }, void 0, false, {
                            fileName: "src/components/timetableGrid.jsx",
                            lineNumber: 45,
                            columnNumber: 25
                        }, this),
                        grid[dayIndex].map((slot, periodIndex)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: `timetable-cell subject-${slot && slot.type ? slot.type.toLowerCase() : 'free'}`,
                                children: slot && slot.subject !== 'FREE' ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "subject-name",
                                            children: slot.subject
                                        }, void 0, false, {
                                            fileName: "src/components/timetableGrid.jsx",
                                            lineNumber: 53,
                                            columnNumber: 41
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "teacher-name",
                                            children: slot.teacher
                                        }, void 0, false, {
                                            fileName: "src/components/timetableGrid.jsx",
                                            lineNumber: 54,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                    style: {
                                        color: '#94a3b8'
                                    },
                                    children: "FREE"
                                }, void 0, false, {
                                    fileName: "src/components/timetableGrid.jsx",
                                    lineNumber: 57,
                                    columnNumber: 37
                                }, this)
                            }, periodIndex, false, {
                                fileName: "src/components/timetableGrid.jsx",
                                lineNumber: 47,
                                columnNumber: 29
                            }, this))
                    ]
                }, day, true, {
                    fileName: "src/components/timetableGrid.jsx",
                    lineNumber: 44,
                    columnNumber: 21
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "src/components/timetableGrid.jsx",
        lineNumber: 31,
        columnNumber: 9
    }, this);
}
_c = TimetableGrid;
var _c;
$RefreshReg$(_c, "TimetableGrid");

  $parcel$ReactRefreshHelpers$9cd3.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"fc4Yr":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$4b4f = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$4b4f.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$4b4f.prelude(module);

try {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>StaffTimetableGrid);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _reactDefault = parcelHelpers.interopDefault(_react);
const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
];
function StaffTimetableGrid({ timetable, staffName }) {
    if (!timetable || !timetable[staffName]) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        style: {
            padding: '40px',
            textAlign: 'center',
            color: '#64748b'
        },
        children: "No timetable generated yet"
    }, void 0, false, {
        fileName: "src/components/StaffTimetableGrid.jsx",
        lineNumber: 8,
        columnNumber: 13
    }, this);
    const grid = timetable[staffName];
    // Debug code - placed BEFORE return statement
    console.log('StaffTimetableGrid - staffName:', staffName);
    console.log('StaffTimetableGrid - grid:', grid);
    console.log('StaffTimetableGrid - grid is array?', Array.isArray(grid));
    if (Array.isArray(grid)) {
        console.log('Grid length:', grid.length);
        console.log('First element:', grid[0]);
    }
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        id: "staff-timetable-export",
        className: "timetable-grid",
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "timetable-header",
                children: "Day/Period"
            }, void 0, false, {
                fileName: "src/components/StaffTimetableGrid.jsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            [
                ...Array(6)
            ].map((_, i)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    className: "timetable-header",
                    children: [
                        "P",
                        i + 1
                    ]
                }, i, true, {
                    fileName: "src/components/StaffTimetableGrid.jsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, this)),
            DAYS.map((day, dayIndex)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
                    children: [
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: "timetable-day",
                            children: day
                        }, void 0, false, {
                            fileName: "src/components/StaffTimetableGrid.jsx",
                            lineNumber: 34,
                            columnNumber: 21
                        }, this),
                        grid[dayIndex].map((slot, periodIndex)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: `timetable-cell subject-${slot.type.toLowerCase()}`,
                                children: slot.subject !== 'FREE' ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "subject-name",
                                            children: slot.subject
                                        }, void 0, false, {
                                            fileName: "src/components/StaffTimetableGrid.jsx",
                                            lineNumber: 42,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "teacher-name",
                                            children: slot.class
                                        }, void 0, false, {
                                            fileName: "src/components/StaffTimetableGrid.jsx",
                                            lineNumber: 43,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                    style: {
                                        color: '#94a3b8'
                                    },
                                    children: "FREE"
                                }, void 0, false, {
                                    fileName: "src/components/StaffTimetableGrid.jsx",
                                    lineNumber: 46,
                                    columnNumber: 33
                                }, this)
                            }, periodIndex, false, {
                                fileName: "src/components/StaffTimetableGrid.jsx",
                                lineNumber: 36,
                                columnNumber: 25
                            }, this))
                    ]
                }, day, true, {
                    fileName: "src/components/StaffTimetableGrid.jsx",
                    lineNumber: 33,
                    columnNumber: 17
                }, this))
        ]
    }, void 0, true, {
        fileName: "src/components/StaffTimetableGrid.jsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
_c = StaffTimetableGrid;
var _c;
$RefreshReg$(_c, "StaffTimetableGrid");

  $parcel$ReactRefreshHelpers$4b4f.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"7lXFL":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TimetableGenerator", ()=>TimetableGenerator);
class TimetableGenerator {
    constructor(classes, staff, subjects){
        this.classes = classes || [];
        this.staff = staff || [];
        this.subjects = subjects || [];
        this.classTimetables = {};
        this.staffTimetables = {};
        this.teacherBusySlots = {};
        this.teacherWeeklyCount = {};
        this.teacherDailyCount = {};
        this.DAYS = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
        ];
        this.PERIODS = 6;
        this.MAX_PERIODS_PER_WEEK = 30;
        this.MIN_PERIODS_PER_WEEK = 24;
        this.MAX_SAME_SUBJECT_PER_DAY = 2;
        this.MAX_TEACHER_HOURS_PER_DAY = 6;
        this.MAX_TEACHER_HOURS_PER_WEEK = 30;
    }
    validate() {
        const errors = [];
        if (!this.classes || this.classes.length === 0) errors.push('No classes added');
        if (!this.staff || this.staff.filter((s)=>s.role === 'staff').length === 0) errors.push('No staff added');
        if (!this.subjects || this.subjects.length === 0) errors.push('No subjects added');
        if (errors.length > 0) return {
            valid: false,
            errors
        };
        // Validate class hours
        const classHours = {};
        this.subjects.forEach((subject)=>{
            if (subject && subject.className && subject.hoursPerWeek) classHours[subject.className] = (classHours[subject.className] || 0) + subject.hoursPerWeek;
        });
        this.classes.forEach((cls)=>{
            if (cls && cls.name) {
                const hours = classHours[cls.name] || 0;
                if (hours < this.MIN_PERIODS_PER_WEEK || hours > this.MAX_PERIODS_PER_WEEK) errors.push(`Class ${cls.name}: Has ${hours} hours, needs ${this.MIN_PERIODS_PER_WEEK}-${this.MAX_PERIODS_PER_WEEK}`);
            }
        });
        // Validate labs
        this.subjects.forEach((subject)=>{
            if (subject && subject.isContinuous) {
                if (!subject.blockSize || subject.blockSize > this.PERIODS) errors.push(`Lab ${subject.name}: Invalid block size`);
            }
        });
        return {
            valid: errors.length === 0,
            errors
        };
    }
    generate() {
        try {
            console.log('Starting timetable generation...');
            this._initialize();
            for (const cls of this.classes){
                if (!cls || !cls.name) continue;
                console.log(`Generating timetable for ${cls.name}`);
                const success = this._generateClassTimetable(cls.name);
                if (!success) console.warn(`Partial timetable generated for ${cls.name}`);
            }
            this._generateStaffTimetables();
            const validation = this._validateGenerated();
            console.log('Timetable generation completed successfully');
            return {
                success: true,
                classTimetables: this.classTimetables,
                staffTimetables: this.staffTimetables,
                warnings: validation.warnings || []
            };
        } catch (error) {
            console.error('Error generating timetable:', error);
            return {
                success: false,
                error: `Error: ${error.message || 'Unknown error'}. Please check your input data.`
            };
        }
    }
    _initialize() {
        console.log('Initializing timetables...');
        // Initialize class timetables
        this.classes.forEach((cls)=>{
            if (cls && cls.name) this.classTimetables[cls.name] = this.DAYS.map(()=>Array(this.PERIODS).fill(null));
        });
        // Initialize teacher data
        const staffMembers = this.staff.filter((s)=>s && s.role === 'staff');
        staffMembers.forEach((teacher)=>{
            if (teacher && teacher.name) {
                this.teacherBusySlots[teacher.name] = {};
                this.teacherWeeklyCount[teacher.name] = 0;
                this.teacherDailyCount[teacher.name] = {};
                this.DAYS.forEach((day)=>{
                    this.teacherDailyCount[teacher.name][day] = 0;
                });
            }
        });
        console.log(`Initialized ${this.classes.length} classes and ${staffMembers.length} teachers`);
    }
    _generateClassTimetable(className) {
        try {
            const classSubjects = this.subjects.filter((s)=>s && s.className === className);
            if (classSubjects.length === 0) {
                console.warn(`No subjects found for class ${className}`);
                return true;
            }
            classSubjects.forEach((s)=>{
                if (s) s.placedHours = 0;
            });
            // PHASE 1: Place Labs
            const labs = classSubjects.filter((s)=>s && s.isContinuous);
            console.log(`Placing ${labs.length} labs for ${className}`);
            for (const lab of labs)if (lab) this._placeLabFlexible(className, lab);
            // PHASE 2: Place Regular Subjects
            const regularSubjects = classSubjects.filter((s)=>s && !s.isContinuous);
            console.log(`Placing ${regularSubjects.length} regular subjects for ${className}`);
            for (const subject of regularSubjects)if (subject) this._placeSubjectFlexible(className, subject);
            return true;
        } catch (error) {
            console.error(`Error generating timetable for ${className}:`, error);
            return false;
        }
    }
    _placeLabFlexible(className, subject) {
        if (!subject || !subject.name || !subject.teacher) {
            console.warn('Invalid lab subject:', subject);
            return false;
        }
        const blockSize = subject.blockSize || 2;
        const blocksNeeded = Math.floor((subject.hoursPerWeek || 0) / blockSize);
        let blocksPlaced = 0;
        console.log(`Placing lab ${subject.name}: ${blocksNeeded} blocks of ${blockSize} periods`);
        // Generate all possible slots
        const possibleSlots = [];
        this.DAYS.forEach((day, dayIdx)=>{
            for(let start = 0; start <= this.PERIODS - blockSize; start++)possibleSlots.push({
                day,
                dayIdx,
                start
            });
        });
        // Try to place blocks
        for (const { day, dayIdx, start } of possibleSlots){
            if (blocksPlaced >= blocksNeeded) break;
            // Check if all periods in block are available
            let canPlace = true;
            for(let i = 0; i < blockSize; i++){
                const period = start + i;
                // Safety check
                if (!this.classTimetables[className] || !this.classTimetables[className][dayIdx]) {
                    canPlace = false;
                    break;
                }
                // Check if slot is free
                if (this.classTimetables[className][dayIdx][period]) {
                    canPlace = false;
                    break;
                }
                // Check teacher availability
                const slotKey = `${day}-P${period + 1}`;
                if (this.teacherBusySlots[subject.teacher] && this.teacherBusySlots[subject.teacher][slotKey]) {
                    canPlace = false;
                    break;
                }
            }
            // Place the block if possible
            if (canPlace) {
                for(let i = 0; i < blockSize; i++){
                    const period = start + i;
                    this._placeAt(className, dayIdx, period, subject);
                }
                subject.placedHours = (subject.placedHours || 0) + blockSize;
                blocksPlaced++;
                console.log(`Placed lab block ${blocksPlaced}/${blocksNeeded} for ${subject.name}`);
            }
        }
        if (blocksPlaced < blocksNeeded) console.warn(`Lab ${subject.name}: Placed ${blocksPlaced}/${blocksNeeded} blocks`);
        return blocksPlaced > 0;
    }
    _placeSubjectFlexible(className, subject) {
        if (!subject || !subject.name || !subject.teacher) {
            console.warn('Invalid subject:', subject);
            return false;
        }
        const hoursToPlace = subject.hoursPerWeek || 0;
        let placed = 0;
        const dailyCount = {};
        this.DAYS.forEach((day)=>{
            dailyCount[day] = 0;
        });
        console.log(`Placing subject ${subject.name}: ${hoursToPlace} hours`);
        // Collect all slots
        const allSlots = [];
        this.DAYS.forEach((day, dayIdx)=>{
            for(let period = 0; period < this.PERIODS; period++)allSlots.push({
                day,
                dayIdx,
                period
            });
        });
        // Shuffle for randomness
        this._shuffle(allSlots);
        // Try to place in available slots
        for (const { day, dayIdx, period } of allSlots){
            if (placed >= hoursToPlace) break;
            if (dailyCount[day] >= this.MAX_SAME_SUBJECT_PER_DAY) continue;
            // Safety checks
            if (!this.classTimetables[className] || !this.classTimetables[className][dayIdx]) continue;
            // Check if slot is free
            if (this.classTimetables[className][dayIdx][period]) continue;
            // Check teacher availability
            const slotKey = `${day}-P${period + 1}`;
            if (this.teacherBusySlots[subject.teacher] && this.teacherBusySlots[subject.teacher][slotKey]) continue;
            // Check teacher limits
            const teacherDaily = this.teacherDailyCount[subject.teacher];
            const teacherWeekly = this.teacherWeeklyCount[subject.teacher];
            if (teacherDaily && teacherDaily[day] >= this.MAX_TEACHER_HOURS_PER_DAY) continue;
            if (teacherWeekly >= this.MAX_TEACHER_HOURS_PER_WEEK) continue;
            // Place the subject
            this._placeAt(className, dayIdx, period, subject);
            dailyCount[day]++;
            subject.placedHours = (subject.placedHours || 0) + 1;
            placed++;
        }
        if (placed < hoursToPlace) console.warn(`Subject ${subject.name}: Placed ${placed}/${hoursToPlace} hours`);
        return placed > 0;
    }
    _placeAt(className, dayIdx, period, subject) {
        if (!className || !subject || !subject.name || !subject.teacher) {
            console.warn('Invalid placement parameters');
            return;
        }
        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;
        // Safety check
        if (!this.classTimetables[className] || !this.classTimetables[className][dayIdx]) {
            console.error(`Invalid timetable structure for ${className}`);
            return;
        }
        // Place in class timetable
        this.classTimetables[className][dayIdx][period] = {
            subject: subject.name,
            teacher: subject.teacher,
            type: subject.subjectType || 'core'
        };
        // Mark teacher as busy
        if (!this.teacherBusySlots[subject.teacher]) this.teacherBusySlots[subject.teacher] = {};
        this.teacherBusySlots[subject.teacher][slotKey] = true;
        // Update teacher counts
        this.teacherWeeklyCount[subject.teacher] = (this.teacherWeeklyCount[subject.teacher] || 0) + 1;
        if (!this.teacherDailyCount[subject.teacher]) this.teacherDailyCount[subject.teacher] = {};
        if (!this.teacherDailyCount[subject.teacher][day]) this.teacherDailyCount[subject.teacher][day] = 0;
        this.teacherDailyCount[subject.teacher][day]++;
    }
    _generateStaffTimetables() {
        console.log('Generating staff timetables...');
        // Initialize staff timetables
        const staffMembers = this.staff.filter((s)=>s && s.role === 'staff');
        staffMembers.forEach((teacher)=>{
            if (teacher && teacher.name) this.staffTimetables[teacher.name] = this.DAYS.map(()=>Array(this.PERIODS).fill(null).map(()=>({
                        subject: 'FREE',
                        class: '-',
                        type: 'free'
                    })));
        });
        // Fill with class assignments
        this.classes.forEach((cls)=>{
            if (!cls || !cls.name || !this.classTimetables[cls.name]) return;
            this.DAYS.forEach((day, dayIndex)=>{
                const daySchedule = this.classTimetables[cls.name][dayIndex];
                if (!daySchedule) return;
                daySchedule.forEach((slot, period)=>{
                    if (slot && slot.teacher && this.staffTimetables[slot.teacher]) this.staffTimetables[slot.teacher][dayIndex][period] = {
                        subject: slot.subject,
                        class: cls.name,
                        type: slot.type
                    };
                });
            });
        });
        console.log(`Generated ${Object.keys(this.staffTimetables).length} staff timetables`);
    }
    _validateGenerated() {
        console.log('Validating generated timetables...');
        const warnings = [];
        this.classes.forEach((cls)=>{
            if (!cls || !cls.name) return;
            if (!this.classTimetables[cls.name]) {
                warnings.push(`Class ${cls.name}: No timetable generated`);
                return;
            }
            let emptySlots = 0;
            this.DAYS.forEach((day, dayIdx)=>{
                const daySchedule = this.classTimetables[cls.name][dayIdx];
                if (!daySchedule) return;
                daySchedule.forEach((slot, period)=>{
                    if (!slot) {
                        // Fill empty slot with FREE period
                        this.classTimetables[cls.name][dayIdx][period] = {
                            subject: 'FREE',
                            teacher: '-',
                            type: 'free'
                        };
                        emptySlots++;
                    }
                });
            });
            if (emptySlots > 0) warnings.push(`Class ${cls.name}: ${emptySlots} FREE periods`);
        });
        console.log(`Validation complete. ${warnings.length} warnings.`);
        return {
            valid: warnings.length === 0,
            warnings
        };
    }
    _shuffle(array) {
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [
                array[j],
                array[i]
            ];
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["ifaHC"], null, "parcelRequire3f2f", {})

//# sourceMappingURL=AdminDashboard.c1fc38ab.js.map
