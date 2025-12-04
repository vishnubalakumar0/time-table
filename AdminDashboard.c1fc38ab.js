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
    const [departments, setDepartments] = (0, _react.useState)([]);
    const [staff, setStaff] = (0, _react.useState)([]);
    const [subjects, setSubjects] = (0, _react.useState)([]);
    const [timetable, setTimetable] = (0, _react.useState)(null);
    const [toasts, setToasts] = (0, _react.useState)([]);
    const [loading, setLoading] = (0, _react.useState)(true);
    const [showAddStaffForm, setShowAddStaffForm] = (0, _react.useState)(false);
    const [showAddSubjectForm, setShowAddSubjectForm] = (0, _react.useState)(false);
    const [showAddDepartmentForm, setShowAddDepartmentForm] = (0, _react.useState)(false);
    const [showAddClassForm, setShowAddClassForm] = (0, _react.useState)(false);
    // Refs for scrolling
    const staffFormRef = (0, _react.useRef)(null);
    const subjectFormRef = (0, _react.useRef)(null);
    // Form Models
    const [newClass, setNewClass] = (0, _react.useState)({
        name: '',
        hallNumber: '',
        department: ''
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
    const [newDepartment, setNewDepartment] = (0, _react.useState)({
        id: null,
        name: ''
    });
    const teachers = staff.filter((s)=>s.role === "staff");
    const showToast = (message, type, duration = 3000, undoAction = null)=>{
        const newToast = {
            message,
            type,
            id: Date.now(),
            undoAction
        };
        setToasts((prev)=>[
                ...prev,
                newToast
            ]);
        setTimeout(()=>removeToast(newToast.id), duration);
    };
    const removeToast = (id)=>{
        setToasts((prev)=>prev.filter((t)=>t.id !== id));
    };
    const convertFlatToNested = (flatTimetable)=>{
        if (!flatTimetable) return null;
        const nested = {};
        Object.keys(flatTimetable).forEach((key)=>{
            const slots = flatTimetable[key];
            if (Array.isArray(slots) && slots.length > 0 && Array.isArray(slots[0])) nested[key] = slots;
            else if (Array.isArray(slots)) {
                const days = [
                    [],
                    [],
                    [],
                    [],
                    []
                ];
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
                days.forEach((day, idx)=>{
                    if (!days[idx]) days[idx] = [];
                    for(let p = 0; p < 6; p++)if (!days[idx][p]) days[idx][p] = slots[0]?.class !== undefined ? {
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
    const fetchData = async ()=>{
        setLoading(true);
        try {
            const [cls, st, sb, tt, dp] = await Promise.all([
                (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'classes')),
                (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'staff')),
                (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'subjects')),
                (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'timetable')),
                (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'departments'))
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
            setDepartments(dp.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                })));
            if (!tt.empty) {
                const ttData = tt.docs[0].data();
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
    (0, _react.useEffect)(()=>{
        fetchData();
    }, []);
    // ==================== UNDO HANDLER ====================
    // Undo handler: correctly restore by document id—no duplicates!
    // ==================== UNDO HANDLER ====================
    const restoreFromUndo = async (undoItem)=>{
        try {
            if (undoItem.type === 'class') {
                const { id, ...classData } = undoItem.data;
                await (0, _firestore.setDoc)((0, _firestore.doc)((0, _firebase.db), 'classes', id), classData);
            } else if (undoItem.type === 'staff') {
                const { id, ...staffData } = undoItem.data;
                await (0, _firestore.setDoc)((0, _firestore.doc)((0, _firebase.db), 'staff', id), staffData);
                if (undoItem.data.firebaseUid) await (0, _firestore.setDoc)((0, _firestore.doc)((0, _firebase.db), 'users', undoItem.data.firebaseUid), {
                    name: undoItem.data.name,
                    username: undoItem.data.username,
                    role: 'staff'
                });
            } else if (undoItem.type === 'subject') {
                const { id, ...subjectData } = undoItem.data;
                await (0, _firestore.setDoc)((0, _firestore.doc)((0, _firebase.db), 'subjects', id), subjectData);
            }
            await fetchData(); // reload UI
            showToast("\u2705 Data restored!", 'success');
        } catch (error) {
            console.error('Restore error:', error);
            showToast("\u274C Restore failed: " + error.message, 'error');
        }
    };
    // ==================== CLASS CRUD ====================
    const addClass = async ()=>{
        if (!newClass.name) return showToast("Enter class name", "error");
        if (classes.find((c)=>c.name === newClass.name && !newClass.id)) return showToast("Class already exists", "error");
        try {
            if (newClass.id) {
                await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'classes', newClass.id), {
                    name: newClass.name,
                    hallNumber: newClass.hallNumber,
                    department: newClass.department || ''
                });
                setClasses(classes.map((c)=>c.id === newClass.id ? {
                        id: newClass.id,
                        ...newClass
                    } : c));
                showToast("\u2705 Class updated!", "success");
            } else {
                const docRef = await (0, _firestore.addDoc)((0, _firestore.collection)((0, _firebase.db), 'classes'), {
                    name: newClass.name,
                    hallNumber: newClass.hallNumber || '',
                    department: newClass.department || ''
                });
                setClasses([
                    ...classes,
                    {
                        id: docRef.id,
                        name: newClass.name,
                        hallNumber: newClass.hallNumber || '',
                        department: newClass.department || ''
                    }
                ]);
                showToast("\u2705 Class added!", "success");
            }
            setNewClass({
                name: '',
                hallNumber: '',
                department: ''
            });
        } catch (error) {
            showToast("\u274C Operation failed", "error");
        }
    };
    const editClass = (cls)=>{
        setNewClass({
            id: cls.id,
            name: cls.name,
            hallNumber: cls.hallNumber || '',
            department: cls.department || ''
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const addOrUpdateDepartment = async ()=>{
        if (!newDepartment.name.trim()) return showToast("Enter department name", "error");
        try {
            if (newDepartment.id) {
                await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'departments', newDepartment.id), {
                    name: newDepartment.name
                });
                setDepartments(departments.map((d)=>d.id === newDepartment.id ? {
                        ...d,
                        name: newDepartment.name
                    } : d));
                showToast("\u2705 Department updated!", "success");
            } else {
                const ref = await (0, _firestore.addDoc)((0, _firestore.collection)((0, _firebase.db), 'departments'), {
                    name: newDepartment.name
                });
                setDepartments([
                    ...departments,
                    {
                        id: ref.id,
                        name: newDepartment.name
                    }
                ]);
                showToast("\u2705 Department added!", "success");
            }
            setNewDepartment({
                id: null,
                name: ''
            });
        } catch (error) {
            showToast("\u274C Operation failed", "error");
        }
    };
    const editDepartment = (dept)=>{
        setNewDepartment({
            id: dept.id,
            name: dept.name
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const deleteDepartment = async (id)=>{
        if (!window.confirm("Delete this department?")) return;
        try {
            await (0, _firestore.deleteDoc)((0, _firestore.doc)((0, _firebase.db), 'departments', id));
            setDepartments(departments.filter((d)=>d.id !== id));
            showToast("\u2705 Department deleted", "success");
        } catch (error) {
            showToast("\u274C Failed to delete", "error");
        }
    };
    // ==================== CLASS CRUD ====================
    const deleteClass = async (id)=>{
        if (!window.confirm("Delete this class?")) return;
        try {
            const classToDelete = classes.find((c)=>c.id === id);
            if (!classToDelete) return;
            const undoItem = {
                type: 'class',
                data: {
                    ...classToDelete
                }
            };
            await (0, _firestore.deleteDoc)((0, _firestore.doc)((0, _firebase.db), 'classes', id));
            setClasses(classes.filter((c)=>c.id !== id));
            showToast(`\u{2705} Class deleted`, 'success', 5000, ()=>restoreFromUndo(undoItem));
        } catch (error) {
            console.error('Delete error:', error);
            showToast("\u274C Failed to delete", "error");
        }
    };
    // ==================== STAFF CRUD ====================
    const addOrUpdateStaff = async ()=>{
        if (!newStaff.name || !newStaff.username) return showToast("Fill all required fields", "error");
        try {
            if (newStaff.id) {
                // Editing existing staff
                const staffToUpdate = staff.find((s)=>s.id === newStaff.id);
                const { password, ...updateData } = newStaff;
                // Update Firestore staff document with name, freePeriodMode, manualFreePeriods
                const firestoreUpdateData = {
                    name: updateData.name,
                    freePeriodMode: updateData.freePeriodMode,
                    manualFreePeriods: updateData.manualFreePeriods
                };
                // Include username if it changed
                if (staffToUpdate.username !== updateData.username) firestoreUpdateData.username = updateData.username;
                await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'staff', newStaff.id), firestoreUpdateData);
                // Update users collection with new data
                if (staffToUpdate.firebaseUid) await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'users', staffToUpdate.firebaseUid), {
                    name: newStaff.name,
                    username: newStaff.username,
                    role: 'staff'
                });
                // Handle password change if provided
                if (password && password.trim()) {
                    await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'staff', newStaff.id), {
                        tempPassword: password,
                        passwordLastChanged: new Date().toISOString(),
                        needsPasswordChange: true
                    });
                    showToast("\u2705 Temporary password set. Share it with staff.", "success");
                } else showToast("\u2705 Staff updated!", "success");
                setStaff(staff.map((s)=>s.id === newStaff.id ? {
                        ...s,
                        ...firestoreUpdateData
                    } : s));
                resetStaffForm();
                setShowAddStaffForm(false);
                return;
            }
            // Adding new staff
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
                name: newStaff.name,
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
            setShowAddStaffForm(false);
            showToast("\u2705 Staff added!", "success");
        } catch (error) {
            showToast("\u274C Operation failed: " + error.message, "error");
            console.error(error);
        }
    };
    const editStaff = (staffMember)=>{
        setNewStaff({
            ...staffMember,
            password: ''
        });
        setShowAddStaffForm(true);
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
            const staffToDelete = staff.find((s)=>s.id === id);
            if (!staffToDelete) return;
            const undoItem = {
                type: 'staff',
                data: {
                    ...staffToDelete
                }
            };
            await (0, _firestore.deleteDoc)((0, _firestore.doc)((0, _firebase.db), 'staff', id));
            if (staffToDelete.firebaseUid) await (0, _firestore.deleteDoc)((0, _firestore.doc)((0, _firebase.db), 'users', staffToDelete.firebaseUid));
            setStaff(staff.filter((x)=>x.id !== id));
            showToast("\u2705 Staff deleted", 'success', 5000, ()=>restoreFromUndo(undoItem));
        } catch (error) {
            console.error('Delete staff error:', error);
            showToast("\u274C Failed to delete", 'error');
        }
    };
    // ==================== SUBJECT CRUD ====================
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
            setShowAddSubjectForm(false);
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
        setShowAddSubjectForm(true);
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
            const subjectToDelete = subjects.find((s)=>s.id === id);
            if (!subjectToDelete) return;
            const undoItem = {
                type: 'subject',
                data: {
                    ...subjectToDelete
                }
            };
            await (0, _firestore.deleteDoc)((0, _firestore.doc)((0, _firebase.db), 'subjects', id));
            setSubjects(subjects.filter((s)=>s.id !== id));
            showToast("\u2705 Subject deleted", 'success', 5000, ()=>restoreFromUndo(undoItem));
        } catch (error) {
            console.error('Delete subject error:', error);
            showToast("\u274C Failed to delete", 'error');
        }
    };
    // ==================== TIMETABLE GENERATION ====================
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
                const serializableClassTimetables = {};
                const serializableStaffTimetables = {};
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
                const ttRef = (0, _firestore.collection)((0, _firebase.db), 'timetable');
                const existing = await (0, _firestore.getDocs)(ttRef);
                if (!existing.empty) await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'timetable', existing.docs[0].id), timetableData);
                else await (0, _firestore.addDoc)(ttRef, timetableData);
                const teacherList = staff.filter((s)=>s.role === 'staff');
                for (const teacher of teacherList){
                    const staffTT = serializableStaffTimetables[teacher.name];
                    if (staffTT) await (0, _firestore.setDoc)((0, _firestore.doc)((0, _firebase.db), 'staffTimetables', teacher.id), {
                        staffName: teacher.name,
                        timetable: staffTT,
                        generatedAt: new Date().toISOString()
                    });
                }
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
                lineNumber: 630,
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
                        lineNumber: 641,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 642,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 631,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _animatedBackgroundDefault.default), {}, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 650,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "min-h-screen relative z-10 text-white",
                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                    className: "header-content",
                    children: [
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h1", {
                            children: "\uD83C\uDFEB Admin Dashboard"
                        }, void 0, false, {
                            fileName: "src/components/AdminDashboard.jsx",
                            lineNumber: 657,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: "header-actions",
                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                className: "btn btn-danger btn-sm",
                                onClick: onLogout,
                                children: "Logout"
                            }, void 0, false, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 659,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "src/components/AdminDashboard.jsx",
                            lineNumber: 658,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/AdminDashboard.jsx",
                    lineNumber: 656,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 653,
                columnNumber: 5
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
                                        children: "\uD83C\uDFE2"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 670,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Departments"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 671,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 669,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: [
                                            "Existing Departments (",
                                            departments.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 675,
                                        columnNumber: 25
                                    }, this),
                                    departments.length === 0 ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                                        style: {
                                            color: '#64748b',
                                            textAlign: 'center',
                                            padding: '20px'
                                        },
                                        children: "No departments added yet"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 677,
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
                                                                        lineNumber: 686,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Department"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 687,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Classes"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 688,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Actions"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 689,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 685,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 684,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tbody", {
                                                            children: departments.map((d, idx)=>{
                                                                const classCount = classes.filter((c)=>(c.department || '') === d.name).length;
                                                                return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: idx + 1
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 697,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("strong", {
                                                                                children: d.name
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 698,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 698,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: classCount
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 699,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                className: "action-buttons",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                        className: "btn-icon btn-icon-primary",
                                                                                        onClick: ()=>{
                                                                                            editDepartment(d);
                                                                                            setShowAddDepartmentForm(true);
                                                                                        },
                                                                                        title: "Edit",
                                                                                        children: "\u270F\uFE0F"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 702,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                        className: "btn-icon btn-icon-danger",
                                                                                        onClick: ()=>deleteDepartment(d.id),
                                                                                        title: "Delete",
                                                                                        children: "\uD83D\uDDD1\uFE0F"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 703,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 701,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 700,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, d.id, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 696,
                                                                    columnNumber: 53
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 692,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 683,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 682,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "mobile-cards",
                                                children: departments.map((d, idx)=>{
                                                    const classCount = classes.filter((c)=>(c.department || '') === d.name).length;
                                                    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "mobile-card",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card-header",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                        className: "mobile-card-title",
                                                                        children: d.name
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 719,
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
                                                                        lineNumber: 720,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 718,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card-body",
                                                                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                    className: "mobile-card-row",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                            className: "mobile-card-label",
                                                                            children: "Classes:"
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 724,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                            className: "mobile-card-value",
                                                                            children: classCount
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 725,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 723,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 722,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card-actions",
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                        className: "btn btn-primary btn-sm",
                                                                        onClick: ()=>{
                                                                            editDepartment(d);
                                                                            setShowAddDepartmentForm(true);
                                                                        },
                                                                        children: "\u270F\uFE0F Edit"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 729,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                        className: "btn btn-danger btn-sm",
                                                                        onClick: ()=>deleteDepartment(d.id),
                                                                        children: "\uD83D\uDDD1\uFE0F Delete"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 730,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 728,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, d.id, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 717,
                                                        columnNumber: 45
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 713,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        className: "btn btn-success btn-sm",
                                        onClick: ()=>setShowAddDepartmentForm(true),
                                        style: {
                                            marginTop: '15px'
                                        },
                                        children: "\u2795 Add Department"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 738,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 674,
                                columnNumber: 21
                            }, this),
                            showAddDepartmentForm && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: newDepartment.id ? "\u270F\uFE0F Edit Department" : "\u2795 Add New Department"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 749,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "grid-2",
                                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "form-group",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                    children: "Department Name *"
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 752,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                    type: "text",
                                                    value: newDepartment.name,
                                                    onChange: (e)=>setNewDepartment({
                                                            ...newDepartment,
                                                            name: e.target.value
                                                        }),
                                                    placeholder: "Computer Science"
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 753,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/AdminDashboard.jsx",
                                            lineNumber: 751,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 750,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '10px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-primary",
                                                onClick: addOrUpdateDepartment,
                                                children: newDepartment.id ? "\uD83D\uDCBE Save Changes" : "\u2795 Add Department"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 757,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-secondary",
                                                onClick: ()=>{
                                                    setNewDepartment({
                                                        id: null,
                                                        name: ''
                                                    });
                                                    setShowAddDepartmentForm(false);
                                                },
                                                children: "\u274C Cancel"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 758,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 756,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 748,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 668,
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
                                        children: "\uD83D\uDCDA"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 767,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Classes"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 768,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 766,
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
                                        lineNumber: 773,
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
                                        lineNumber: 775,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
                                        children: [
                                            (()=>{
                                                const sorted = [
                                                    ...classes
                                                ].sort((a, b)=>(a.department || 'Unassigned').localeCompare(b.department || 'Unassigned') || a.name.localeCompare(b.name));
                                                const groups = {};
                                                sorted.forEach((cls)=>{
                                                    const dept = cls.department || 'Unassigned';
                                                    if (!groups[dept]) groups[dept] = [];
                                                    groups[dept].push(cls);
                                                });
                                                return Object.keys(groups).filter((d)=>groups[d].length > 0).map((dept)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "dept-group",
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "dept-chip",
                                                                children: dept
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 790,
                                                                columnNumber: 45
                                                            }, this),
                                                            groups[dept].map((cls, idx)=>{
                                                                const classSubjects = subjects.filter((s)=>s.className === cls.name);
                                                                const totalHours = classSubjects.reduce((sum, s)=>sum + s.hoursPerWeek, 0);
                                                                const progress = totalHours / 30 * 100;
                                                                return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                    className: "class-box",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                            style: {
                                                                                marginBottom: '8px',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'space-between',
                                                                                gap: '10px',
                                                                                color: '#1e293b',
                                                                                flexWrap: 'wrap'
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h4", {
                                                                                    style: {
                                                                                        margin: 0,
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        gap: '8px'
                                                                                    },
                                                                                    children: [
                                                                                        "Class: ",
                                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("strong", {
                                                                                            children: cls.name
                                                                                        }, void 0, false, {
                                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                                            lineNumber: 807,
                                                                                            columnNumber: 72
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 806,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                    style: {
                                                                                        display: 'flex',
                                                                                        alignItems: 'center',
                                                                                        gap: '16px',
                                                                                        color: '#64748b',
                                                                                        fontWeight: 600
                                                                                    },
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                            children: [
                                                                                                totalHours,
                                                                                                "/30 hours"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                                            lineNumber: 810,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                            children: [
                                                                                                Math.max(30 - totalHours, 0),
                                                                                                "h remaining"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                                            lineNumber: 811,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 809,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 797,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                            style: {
                                                                                width: '100%',
                                                                                height: '8px',
                                                                                backgroundColor: '#e2e8f0',
                                                                                borderRadius: '4px',
                                                                                overflow: 'hidden',
                                                                                marginBottom: '15px'
                                                                            },
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                style: {
                                                                                    height: '100%',
                                                                                    width: `${Math.min(progress, 100)}%`,
                                                                                    backgroundColor: totalHours === 30 ? '#10b981' : '#f59e0b',
                                                                                    transition: 'width 0.3s ease'
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 822,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 814,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                            className: "desktop-table",
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("table", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("thead", {
                                                                                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                                    children: "Hall Number"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 833,
                                                                                                    columnNumber: 73
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                                    children: "Subjects"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 834,
                                                                                                    columnNumber: 73
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                                    children: "Hours"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 835,
                                                                                                    columnNumber: 73
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                                    children: "Actions"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 836,
                                                                                                    columnNumber: 73
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                                            lineNumber: 832,
                                                                                            columnNumber: 69
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 831,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tbody", {
                                                                                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                                    children: cls.hallNumber || '-'
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 841,
                                                                                                    columnNumber: 73
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                                    children: classSubjects.length
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 842,
                                                                                                    columnNumber: 73
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
                                                                                                        lineNumber: 844,
                                                                                                        columnNumber: 77
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 843,
                                                                                                    columnNumber: 73
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                                        className: "action-buttons",
                                                                                                        children: [
                                                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                                                className: "btn-icon btn-icon-primary",
                                                                                                                onClick: ()=>{
                                                                                                                    editClass(cls);
                                                                                                                    setShowAddClassForm(true);
                                                                                                                },
                                                                                                                title: "Edit",
                                                                                                                children: "\u270F\uFE0F"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                                                lineNumber: 848,
                                                                                                                columnNumber: 81
                                                                                                            }, this),
                                                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                                                className: "btn-icon btn-icon-danger",
                                                                                                                onClick: ()=>deleteClass(cls.id),
                                                                                                                title: "Delete",
                                                                                                                children: "\uD83D\uDDD1\uFE0F"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                                                lineNumber: 849,
                                                                                                                columnNumber: 81
                                                                                                            }, this)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                                        lineNumber: 847,
                                                                                                        columnNumber: 77
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 846,
                                                                                                    columnNumber: 73
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                                            lineNumber: 840,
                                                                                            columnNumber: 69
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 839,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 830,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 829,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, cls.id, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 796,
                                                                    columnNumber: 53
                                                                }, this);
                                                            })
                                                        ]
                                                    }, `dept-classes-${dept}`, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 789,
                                                        columnNumber: 41
                                                    }, this));
                                            })(),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "mobile-cards",
                                                children: (()=>{
                                                    const sorted = [
                                                        ...classes
                                                    ].sort((a, b)=>(a.department || 'Unassigned').localeCompare(b.department || 'Unassigned') || a.name.localeCompare(b.name));
                                                    let currentDept = null;
                                                    const cards = [];
                                                    sorted.forEach((cls, idx)=>{
                                                        const dept = cls.department || 'Unassigned';
                                                        const classSubjects = subjects.filter((s)=>s.className === cls.name);
                                                        const totalHours = classSubjects.reduce((sum, s)=>sum + s.hoursPerWeek, 0);
                                                        if (dept !== currentDept) {
                                                            currentDept = dept;
                                                            cards.push(/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "group-header",
                                                                style: {
                                                                    fontWeight: 700,
                                                                    margin: '10px 0'
                                                                },
                                                                children: dept
                                                            }, `dept-mobile-${dept}`, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 874,
                                                                columnNumber: 60
                                                            }, this));
                                                        }
                                                        cards.push(/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
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
                                                                            lineNumber: 879,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                            className: "mobile-card-badge",
                                                                            children: [
                                                                                "#",
                                                                                idx + 1
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 880,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 878,
                                                                    columnNumber: 53
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
                                                                                    lineNumber: 885,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                    className: "mobile-card-value",
                                                                                    children: cls.hallNumber || '-'
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 886,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 884,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                            className: "mobile-card-row",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                    className: "mobile-card-label",
                                                                                    children: "Subjects:"
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 889,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                    className: "mobile-card-value",
                                                                                    children: classSubjects.length
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 890,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 888,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                            className: "mobile-card-row",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                    className: "mobile-card-label",
                                                                                    children: "Hours:"
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 893,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                    className: "mobile-card-value",
                                                                                    children: [
                                                                                        totalHours,
                                                                                        "/30h"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 894,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 892,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 882,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                    className: "mobile-card-actions",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                            className: "btn btn-primary btn-sm",
                                                                            onClick: ()=>{
                                                                                editClass(cls);
                                                                                setShowAddClassForm(true);
                                                                            },
                                                                            children: "\u270F\uFE0F Edit"
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 898,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                            className: "btn btn-danger btn-sm",
                                                                            onClick: ()=>deleteClass(cls.id),
                                                                            children: "\uD83D\uDDD1\uFE0F Delete"
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 899,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 897,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, cls.id, true, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 877,
                                                            columnNumber: 49
                                                        }, this));
                                                    });
                                                    return cards;
                                                })()
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 863,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        className: "btn btn-success btn-sm",
                                        onClick: ()=>{
                                            setShowAddClassForm(true);
                                            setNewClass({
                                                id: null,
                                                name: '',
                                                hallNumber: '',
                                                department: ''
                                            });
                                        },
                                        style: {
                                            marginTop: '15px'
                                        },
                                        children: "\u2795 Add Class"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 909,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 772,
                                columnNumber: 21
                            }, this),
                            showAddClassForm && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: newClass.id ? "\u270F\uFE0F Edit Class" : "\u2795 Add New Class"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 921,
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
                                                        lineNumber: 924,
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
                                                        lineNumber: 925,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 923,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Hall Number (Optional)"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 933,
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
                                                        lineNumber: 934,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 932,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Department"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 942,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("select", {
                                                        value: newClass.department,
                                                        onChange: (e)=>setNewClass({
                                                                ...newClass,
                                                                department: e.target.value
                                                            }),
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "",
                                                                children: "Unassigned"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 944,
                                                                columnNumber: 37
                                                            }, this),
                                                            departments.map((d)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                    value: d.name,
                                                                    children: d.name
                                                                }, d.id, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 946,
                                                                    columnNumber: 41
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 943,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 941,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 922,
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
                                                lineNumber: 952,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-secondary",
                                                onClick: ()=>{
                                                    setNewClass({
                                                        name: '',
                                                        hallNumber: '',
                                                        department: ''
                                                    });
                                                    setShowAddClassForm(false);
                                                },
                                                children: "\u274C Cancel"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 955,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 951,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 920,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 765,
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
                                        lineNumber: 966,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Staff"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 967,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 965,
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
                                        lineNumber: 972,
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
                                        lineNumber: 974,
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
                                                                        lineNumber: 983,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Name"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 984,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Username"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 985,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Free Periods"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 986,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Actions"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 987,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 982,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 981,
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
                                                                                lineNumber: 993,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 993,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("strong", {
                                                                                children: s.name
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 994,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 994,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: s.username
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 995,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: s.freePeriodMode === 'manual' ? `Manual (${s.manualFreePeriods} free periods)` : 'Auto'
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 996,
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
                                                                                        lineNumber: 1003,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                        className: "btn-icon btn-icon-danger",
                                                                                        onClick: ()=>deleteStaff(s.id),
                                                                                        title: "Delete",
                                                                                        children: "\uD83D\uDDD1\uFE0F"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1010,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1002,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 1001,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, s.id, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 992,
                                                                    columnNumber: 49
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 990,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 980,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 979,
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
                                                                        lineNumber: 1029,
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
                                                                        lineNumber: 1030,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1028,
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
                                                                                lineNumber: 1034,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: s.username
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1035,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1033,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                        className: "mobile-card-row",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-label",
                                                                                children: "Free Periods:"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1038,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: s.freePeriodMode === 'manual' ? `Manual (${s.manualFreePeriods} free periods)` : 'Auto'
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1039,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1037,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1032,
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
                                                                        lineNumber: 1047,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                        className: "btn btn-danger btn-sm",
                                                                        onClick: ()=>deleteStaff(s.id),
                                                                        children: "\uD83D\uDDD1\uFE0F Delete"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1050,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1046,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, s.id, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1027,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1025,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        className: "btn btn-success btn-sm",
                                        onClick: ()=>{
                                            setShowAddStaffForm(true);
                                            resetStaffForm();
                                        },
                                        style: {
                                            marginTop: '15px'
                                        },
                                        children: "\u2795 Add Staff"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1059,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 971,
                                columnNumber: 21
                            }, this),
                            showAddStaffForm && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                ref: staffFormRef,
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: newStaff.id ? "\u270F\uFE0F Edit Staff" : "\u2795 Add New Staff"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1071,
                                        columnNumber: 29
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
                                                        lineNumber: 1074,
                                                        columnNumber: 37
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
                                                        lineNumber: 1075,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1073,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Username *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1083,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                        type: "text",
                                                        placeholder: "john",
                                                        value: newStaff.username,
                                                        onChange: (e)=>setNewStaff({
                                                                ...newStaff,
                                                                username: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1084,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1082,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: [
                                                            newStaff.id ? 'New Password (Optional)' : 'Password',
                                                            " *"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1092,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                        type: "password",
                                                        placeholder: newStaff.id ? "Leave blank to keep current" : "Enter password",
                                                        value: newStaff.password,
                                                        onChange: (e)=>setNewStaff({
                                                                ...newStaff,
                                                                password: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1093,
                                                        columnNumber: 37
                                                    }, this),
                                                    newStaff.id && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("small", {
                                                        style: {
                                                            color: '#64748b',
                                                            display: 'block',
                                                            marginTop: '4px'
                                                        },
                                                        children: "\u2713 Staff can use new password immediately on next login"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1100,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1091,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Free Period Mode"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1106,
                                                        columnNumber: 37
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
                                                                lineNumber: 1111,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "manual",
                                                                children: "Manual"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1112,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1107,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1105,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1072,
                                        columnNumber: 29
                                    }, this),
                                    newStaff.freePeriodMode === 'manual' && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                children: "Free Periods per Week"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1119,
                                                columnNumber: 37
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
                                                lineNumber: 1120,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1118,
                                        columnNumber: 33
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
                                                lineNumber: 1134,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-secondary",
                                                onClick: ()=>{
                                                    resetStaffForm();
                                                    setShowAddStaffForm(false);
                                                },
                                                children: "\u274C Cancel"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1137,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1133,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1070,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 964,
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
                                        lineNumber: 1148,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Subjects"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1149,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1147,
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
                                        lineNumber: 1154,
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
                                        lineNumber: 1156,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
                                        children: classes.map((cls)=>{
                                            const classSubjects = subjects.filter((s)=>s.className === cls.name);
                                            if (classSubjects.length === 0) return null;
                                            const totalHours = classSubjects.reduce((sum, s)=>sum + s.hoursPerWeek, 0);
                                            const progress = totalHours / 30 * 100;
                                            return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                style: {
                                                    marginBottom: '30px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        style: {
                                                            marginBottom: '8px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            gap: '10px',
                                                            color: '#1e293b',
                                                            flexWrap: 'wrap'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h4", {
                                                                style: {
                                                                    margin: 0,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '8px'
                                                                },
                                                                children: [
                                                                    "Class: ",
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("strong", {
                                                                        children: cls.name
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1180,
                                                                        columnNumber: 60
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1179,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '16px',
                                                                    color: '#64748b',
                                                                    fontWeight: 600
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                        children: [
                                                                            totalHours,
                                                                            "/30 hours"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1183,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                        children: [
                                                                            Math.max(30 - totalHours, 0),
                                                                            "h remaining"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1184,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1182,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1170,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        style: {
                                                            width: '100%',
                                                            height: '8px',
                                                            backgroundColor: '#e2e8f0',
                                                            borderRadius: '4px',
                                                            overflow: 'hidden',
                                                            marginBottom: '15px'
                                                        },
                                                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                            style: {
                                                                height: '100%',
                                                                width: `${Math.min(progress, 100)}%`,
                                                                backgroundColor: totalHours === 30 ? '#10b981' : '#f59e0b',
                                                                transition: 'width 0.3s ease'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1189,
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
                                                                                lineNumber: 1209,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Type"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1210,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Hours"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1211,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Teacher"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1212,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Continuous"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1213,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Actions"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1214,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1208,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 1207,
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
                                                                                        lineNumber: 1220,
                                                                                        columnNumber: 69
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1220,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.subjectType
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1221,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: [
                                                                                        sub.hoursPerWeek,
                                                                                        "h"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1222,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.teacher
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1223,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.isContinuous ? `Yes (${sub.blockSize}p)` : 'No'
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1224,
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
                                                                                                lineNumber: 1229,
                                                                                                columnNumber: 73
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                                className: "btn-icon btn-icon-danger",
                                                                                                onClick: ()=>deleteSubject(sub.id),
                                                                                                title: "Delete",
                                                                                                children: "\uD83D\uDDD1\uFE0F"
                                                                                            }, void 0, false, {
                                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                                lineNumber: 1236,
                                                                                                columnNumber: 73
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1228,
                                                                                        columnNumber: 69
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1227,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, sub.id, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 1219,
                                                                            columnNumber: 61
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 1217,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 1206,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1205,
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
                                                                                lineNumber: 1255,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-badge",
                                                                                children: sub.subjectType
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1256,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1254,
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
                                                                                        lineNumber: 1260,
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
                                                                                        lineNumber: 1261,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1259,
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
                                                                                        lineNumber: 1264,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-value",
                                                                                        children: sub.teacher
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1265,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1263,
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
                                                                                        lineNumber: 1268,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-value",
                                                                                        children: sub.isContinuous ? `Yes (${sub.blockSize}p)` : 'No'
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1269,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1267,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1258,
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
                                                                                lineNumber: 1275,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                className: "btn btn-danger btn-sm",
                                                                                onClick: ()=>deleteSubject(sub.id),
                                                                                children: "\uD83D\uDDD1\uFE0F Delete"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1278,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1274,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, sub.id, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1253,
                                                                columnNumber: 53
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1251,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, cls.id, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1169,
                                                columnNumber: 41
                                            }, this);
                                        })
                                    }, void 0, false),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        className: "btn btn-success btn-sm",
                                        onClick: ()=>{
                                            setShowAddSubjectForm(true);
                                            resetSubjectForm();
                                        },
                                        style: {
                                            marginTop: '15px'
                                        },
                                        children: "\u2795 Add Subject"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1290,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1153,
                                columnNumber: 21
                            }, this),
                            showAddSubjectForm && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                ref: subjectFormRef,
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: newSubject.id ? "\u270F\uFE0F Edit Subject" : "\u2795 Add New Subject"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1302,
                                        columnNumber: 29
                                    }, this),
                                    newSubject.className && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _hoursTrackerDefault.default), {
                                        className: newSubject.className,
                                        subjects: subjects
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1305,
                                        columnNumber: 33
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
                                                        lineNumber: 1310,
                                                        columnNumber: 37
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
                                                                lineNumber: 1315,
                                                                columnNumber: 41
                                                            }, this),
                                                            classes.map((cls)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                    value: cls.name,
                                                                    children: cls.name
                                                                }, cls.id, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 1317,
                                                                    columnNumber: 45
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1311,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1309,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Subject Name *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1322,
                                                        columnNumber: 37
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
                                                        lineNumber: 1323,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1321,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Subject Type *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1331,
                                                        columnNumber: 37
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
                                                                lineNumber: 1336,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Elective",
                                                                children: "Elective"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1337,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Lab",
                                                                children: "Lab"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1338,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Other",
                                                                children: "Other"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1339,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1332,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1330,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Hours per Week *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1343,
                                                        columnNumber: 37
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
                                                        lineNumber: 1344,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1342,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Teacher *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1356,
                                                        columnNumber: 37
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
                                                                lineNumber: 1361,
                                                                columnNumber: 41
                                                            }, this),
                                                            teachers.map((t)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                    value: t.name,
                                                                    children: t.name
                                                                }, t.id, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 1363,
                                                                    columnNumber: 45
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1357,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1355,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1308,
                                        columnNumber: 29
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
                                                lineNumber: 1370,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                htmlFor: "continuous",
                                                style: {
                                                    marginBottom: 0
                                                },
                                                children: "Continuous Period (Lab)"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1376,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1369,
                                        columnNumber: 29
                                    }, this),
                                    newSubject.isContinuous && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                children: "Block Size"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1383,
                                                columnNumber: 37
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
                                                        lineNumber: 1391,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                        value: 3,
                                                        children: "3 Periods"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1392,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1384,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1382,
                                        columnNumber: 33
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
                                                lineNumber: 1398,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-secondary",
                                                onClick: ()=>{
                                                    resetSubjectForm();
                                                    setShowAddSubjectForm(false);
                                                },
                                                children: "\u274C Cancel"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1401,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1397,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1301,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 1146,
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
                                        lineNumber: 1412,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Generate Timetable"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1413,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1411,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Ready to Generate"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1417,
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
                                                        lineNumber: 1420,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-value",
                                                        children: classes.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1421,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1419,
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
                                                        lineNumber: 1424,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-value",
                                                        children: teachers.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1425,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1423,
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
                                                        lineNumber: 1428,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-value",
                                                        children: subjects.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1429,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1427,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1418,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        className: "btn btn-success btn-lg",
                                        onClick: generateTimetable,
                                        disabled: loading,
                                        children: loading ? "\u23F3 Generating..." : "\u26A1 Generate Timetable"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1433,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1416,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 1410,
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
                                        lineNumber: 1447,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Generated Timetables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1448,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1446,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Time Tables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1452,
                                        columnNumber: 29
                                    }, this),
                                    (()=>{
                                        const sorted = [
                                            ...classes
                                        ].sort((a, b)=>(a.department || 'Unassigned').localeCompare(b.department || 'Unassigned') || a.name.localeCompare(b.name));
                                        const groups = {};
                                        sorted.forEach((cls)=>{
                                            const dept = cls.department || 'Unassigned';
                                            if (!groups[dept]) groups[dept] = [];
                                            groups[dept].push(/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "timetable-container",
                                                id: `timetable-export-${cls.id}`,
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h4", {
                                                        className: "timetable-title",
                                                        children: cls.name
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1461,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "timetable-scroll",
                                                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _timetableGridDefault.default), {
                                                            timetable: timetable.classTimetables,
                                                            className: cls.name
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 1463,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1462,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "timetable-actions no-print no-export",
                                                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                            className: "btn btn-primary btn-sm",
                                                            onClick: ()=>(0, _pdfUtils.exportToPDF)(`timetable-export-${cls.id}`, `${cls.name}_Timetable.pdf`, {
                                                                    title: cls.name
                                                                }),
                                                            children: "\uD83D\uDCC4 Download PDF"
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 1466,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1465,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, cls.id, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1460,
                                                columnNumber: 41
                                            }, this));
                                        });
                                        return Object.keys(groups).filter((dept)=>groups[dept].length > 0).map((dept)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "dept-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "dept-chip",
                                                        children: dept
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1475,
                                                        columnNumber: 45
                                                    }, this),
                                                    groups[dept].map((node)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                            className: "class-box",
                                                            children: node
                                                        }, node.key, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 1477,
                                                            columnNumber: 49
                                                        }, this))
                                                ]
                                            }, `dept-block-${dept}`, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1474,
                                                columnNumber: 41
                                            }, this));
                                    })()
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1451,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Staff-wise Timetables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1485,
                                        columnNumber: 29
                                    }, this),
                                    [
                                        ...teachers
                                    ].sort((a, b)=>a.name.localeCompare(b.name)).map((teacher)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "timetable-container",
                                            id: `staff-timetable-export-${teacher.id}`,
                                            children: [
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h4", {
                                                    className: "timetable-title",
                                                    children: [
                                                        "Teacher: ",
                                                        teacher.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1488,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                    className: "timetable-scroll",
                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _staffTimetableGridDefault.default), {
                                                        timetable: timetable.staffTimetables,
                                                        staffName: teacher.name
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1490,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1489,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                    className: "timetable-actions no-print no-export",
                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                        className: "btn btn-primary btn-sm",
                                                        onClick: ()=>(0, _pdfUtils.exportToPDF)(`staff-timetable-export-${teacher.id}`, `${teacher.name}_Timetable.pdf`, {
                                                                title: `Staff Timetable \u{2014} ${teacher.name}`
                                                            }),
                                                        children: "\uD83D\uDCC4 Download PDF"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1493,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1492,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, teacher.id, true, {
                                            fileName: "src/components/AdminDashboard.jsx",
                                            lineNumber: 1487,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1484,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 1445,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 666,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _toast.ToastContainer), {
                toasts: toasts,
                onRemove: removeToast
            }, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 1503,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true);
}
_s(AdminDashboard, "UTNPICe+d8WyX3o1Vwu20NTH6Qg=");
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
const Toast = ({ id, message, type, onRemove, undoAction })=>{
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        style: {
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '10px',
            background: type === 'error' ? '#ff4444' : type === 'success' ? '#00C851' : '#ffbb33',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            animation: 'slideIn 0.3s ease-out'
        },
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                children: message
            }, void 0, false, {
                fileName: "src/components/Toast.jsx",
                lineNumber: 18,
                columnNumber: 7
            }, undefined),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    gap: '8px',
                    marginLeft: '16px'
                },
                children: [
                    undoAction && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                        onClick: ()=>{
                            if (typeof undoAction === 'function') undoAction();
                            if (typeof onRemove === 'function') onRemove(id);
                        },
                        style: {
                            background: 'white',
                            color: type === 'success' ? '#00C851' : '#333',
                            border: 'none',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '600'
                        },
                        children: "UNDO"
                    }, void 0, false, {
                        fileName: "src/components/Toast.jsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                        onClick: ()=>{
                            if (typeof onRemove === 'function') onRemove(id);
                        },
                        style: {
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '18px',
                            padding: '0 4px',
                            lineHeight: '1'
                        },
                        title: "Close",
                        children: "\xd7"
                    }, void 0, false, {
                        fileName: "src/components/Toast.jsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "src/components/Toast.jsx",
                lineNumber: 19,
                columnNumber: 7
            }, undefined)
        ]
    }, void 0, true, {
        fileName: "src/components/Toast.jsx",
        lineNumber: 4,
        columnNumber: 5
    }, undefined);
};
_c = Toast;
const ToastContainer = ({ toasts, onRemove })=>{
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        style: {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            minWidth: '300px',
            maxWidth: '500px'
        },
        children: toasts.map((toast)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)(Toast, {
                id: toast.id,
                message: toast.message,
                type: toast.type,
                onRemove: onRemove,
                undoAction: toast.undoAction
            }, toast.id, false, {
                fileName: "src/components/Toast.jsx",
                lineNumber: 81,
                columnNumber: 9
            }, undefined))
    }, void 0, false, {
        fileName: "src/components/Toast.jsx",
        lineNumber: 70,
        columnNumber: 5
    }, undefined);
};
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
function HoursTracker({ timetable, staff }) {
    if (!timetable || !timetable.staffTimetables) return null;
    const teachers = staff.filter((s)=>s.role === 'staff');
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        style: {
            marginBottom: '30px'
        },
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                style: {
                    marginBottom: '15px'
                },
                children: "\uD83D\uDCCA Staff Hours Summary"
            }, void 0, false, {
                fileName: "src/components/HoursTracker.jsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("table", {
                className: "data-table",
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("thead", {
                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                            children: [
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                    children: "Staff Name"
                                }, void 0, false, {
                                    fileName: "src/components/HoursTracker.jsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                    children: "Teaching Hours"
                                }, void 0, false, {
                                    fileName: "src/components/HoursTracker.jsx",
                                    lineNumber: 17,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                    children: "Free Periods"
                                }, void 0, false, {
                                    fileName: "src/components/HoursTracker.jsx",
                                    lineNumber: 18,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "src/components/HoursTracker.jsx",
                                    lineNumber: 19,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/HoursTracker.jsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "src/components/HoursTracker.jsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tbody", {
                        children: teachers.map((teacher)=>{
                            const staffTT = timetable.staffTimetables[teacher.name];
                            if (!staffTT) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                        children: teacher.name
                                    }, void 0, false, {
                                        fileName: "src/components/HoursTracker.jsx",
                                        lineNumber: 28,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                        children: "0"
                                    }, void 0, false, {
                                        fileName: "src/components/HoursTracker.jsx",
                                        lineNumber: 29,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                        children: "30"
                                    }, void 0, false, {
                                        fileName: "src/components/HoursTracker.jsx",
                                        lineNumber: 30,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                        children: "\u26A0\uFE0F Not Assigned"
                                    }, void 0, false, {
                                        fileName: "src/components/HoursTracker.jsx",
                                        lineNumber: 31,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, teacher.id, true, {
                                fileName: "src/components/HoursTracker.jsx",
                                lineNumber: 27,
                                columnNumber: 17
                            }, this);
                            // Count teaching hours
                            let teachingHours = 0;
                            let freePeriods = 0;
                            staffTT.forEach((day)=>{
                                day.forEach((period)=>{
                                    if (period && period.type !== 'free') teachingHours++;
                                    else freePeriods++;
                                });
                            });
                            const status = teachingHours >= 24 ? "\u2705 Full Load" : teachingHours >= 18 ? "\u26A1 Good" : teachingHours > 0 ? "\u26A0\uFE0F Low Load" : "\u274C No Classes";
                            return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                        children: teacher.name
                                    }, void 0, false, {
                                        fileName: "src/components/HoursTracker.jsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                        children: [
                                            teachingHours,
                                            "/30"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/HoursTracker.jsx",
                                        lineNumber: 58,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                        children: [
                                            freePeriods,
                                            "/30"
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/HoursTracker.jsx",
                                        lineNumber: 59,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                        children: status
                                    }, void 0, false, {
                                        fileName: "src/components/HoursTracker.jsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, teacher.id, true, {
                                fileName: "src/components/HoursTracker.jsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "src/components/HoursTracker.jsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/HoursTracker.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/HoursTracker.jsx",
        lineNumber: 11,
        columnNumber: 5
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
        id: "timetable-export",
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
function StaffTimetableGrid({ timetable, staffName }) {
    const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
    ];
    const periods = [
        'P1',
        'P2',
        'P3',
        'P4',
        'P5',
        'P6'
    ];
    const staffSchedule = timetable[staffName];
    console.log('StaffTimetableGrid - Staff:', staffName);
    console.log('StaffTimetableGrid - Available:', Object.keys(timetable));
    if (!staffSchedule) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        style: {
            padding: '40px',
            textAlign: 'center'
        },
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                style: {
                    fontSize: '48px',
                    marginBottom: '20px'
                },
                children: "\u26A0\uFE0F"
            }, void 0, false, {
                fileName: "src/components/StaffTimetableGrid.jsx",
                lineNumber: 15,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                children: "No Timetable Found"
            }, void 0, false, {
                fileName: "src/components/StaffTimetableGrid.jsx",
                lineNumber: 16,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                style: {
                    color: '#64748b'
                },
                children: [
                    'No timetable for "',
                    staffName,
                    '"'
                ]
            }, void 0, true, {
                fileName: "src/components/StaffTimetableGrid.jsx",
                lineNumber: 17,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                style: {
                    color: '#64748b',
                    fontSize: '14px'
                },
                children: [
                    "Available: ",
                    Object.keys(timetable).join(', ')
                ]
            }, void 0, true, {
                fileName: "src/components/StaffTimetableGrid.jsx",
                lineNumber: 18,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "src/components/StaffTimetableGrid.jsx",
        lineNumber: 14,
        columnNumber: 13
    }, this);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        className: "timetable-container",
        id: "staff-timetable-export",
        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("table", {
            className: "timetable",
            children: [
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("thead", {
                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                className: "day-header",
                                children: "DAY/PERIOD"
                            }, void 0, false, {
                                fileName: "src/components/StaffTimetableGrid.jsx",
                                lineNumber: 28,
                                columnNumber: 25
                            }, this),
                            periods.map((p)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                    className: "period-header",
                                    children: p
                                }, p, false, {
                                    fileName: "src/components/StaffTimetableGrid.jsx",
                                    lineNumber: 29,
                                    columnNumber: 43
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "src/components/StaffTimetableGrid.jsx",
                        lineNumber: 27,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "src/components/StaffTimetableGrid.jsx",
                    lineNumber: 26,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tbody", {
                    children: days.map((day, dayIdx)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                            children: [
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                    className: "day-cell",
                                    children: day
                                }, void 0, false, {
                                    fileName: "src/components/StaffTimetableGrid.jsx",
                                    lineNumber: 35,
                                    columnNumber: 29
                                }, this),
                                periods.map((period, periodIdx)=>{
                                    const slot = staffSchedule[dayIdx]?.[periodIdx];
                                    const isFree = !slot || slot.type === 'free' || slot.subject === 'FREE';
                                    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                        className: `period-cell ${isFree ? 'free-period' : 'class-period'}`,
                                        children: isFree ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "period-content free",
                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                className: "subject-name",
                                                children: "FREE"
                                            }, void 0, false, {
                                                fileName: "src/components/StaffTimetableGrid.jsx",
                                                lineNumber: 44,
                                                columnNumber: 49
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "src/components/StaffTimetableGrid.jsx",
                                            lineNumber: 43,
                                            columnNumber: 45
                                        }, this) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "period-content",
                                            children: [
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                    className: "subject-name",
                                                    children: slot.subject
                                                }, void 0, false, {
                                                    fileName: "src/components/StaffTimetableGrid.jsx",
                                                    lineNumber: 48,
                                                    columnNumber: 49
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                    className: "class-name",
                                                    children: slot.class
                                                }, void 0, false, {
                                                    fileName: "src/components/StaffTimetableGrid.jsx",
                                                    lineNumber: 49,
                                                    columnNumber: 49
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "src/components/StaffTimetableGrid.jsx",
                                            lineNumber: 47,
                                            columnNumber: 45
                                        }, this)
                                    }, period, false, {
                                        fileName: "src/components/StaffTimetableGrid.jsx",
                                        lineNumber: 41,
                                        columnNumber: 37
                                    }, this);
                                })
                            ]
                        }, day, true, {
                            fileName: "src/components/StaffTimetableGrid.jsx",
                            lineNumber: 34,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "src/components/StaffTimetableGrid.jsx",
                    lineNumber: 32,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "src/components/StaffTimetableGrid.jsx",
            lineNumber: 25,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "src/components/StaffTimetableGrid.jsx",
        lineNumber: 24,
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
/**
 * Timetable Generator - CLEAN VERSION 2025-12-04
 * NO TYPOS - PRODUCTION READY
 * Generates intelligent timetables based on defined rules
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TimetableGenerator", ()=>TimetableGenerator);
class TimetableGenerator {
    constructor(classes, staff, subjects, options = {}){
        this.classes = classes || [];
        this.staff = staff || [];
        this.subjects = subjects || [];
        this.options = options || {};
        // Output structures
        this.classTimetables = {};
        this.staffTimetables = {};
        // Tracking structures
        this.teacherBusySlots = {};
        this.teacherWeeklyHours = {};
        this.teacherDailyHours = {};
        this.teacherExpectedWeeklyHours = {};
        this.subjectPlacementTracker = {};
        this.placements = [];
        this.subjectPeriodUsage = {};
        this.labStartPositions = {};
        this.DAYS = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
        ];
        this.PERIODS = 6;
        this.TOTAL_WEEKLY_HOURS = 30;
        this.dailyMaxPerSubject = typeof this.options.dailyMaxPerSubject === 'number' ? this.options.dailyMaxPerSubject : 2;
        const seed = typeof this.options.seed === 'number' ? this.options.seed : 123456789;
        this._rng = (()=>{
            let a = seed >>> 0;
            return ()=>{
                a += 0x6D2B79F5;
                let t = a;
                t = Math.imul(t ^ t >>> 15, t | 1);
                t ^= t + Math.imul(t ^ t >>> 7, t | 61);
                return ((t ^ t >>> 14) >>> 0) / 4294967296;
            };
        })();
    }
    /**
     * Validate input data before generation
     */ validate() {
        const errors = [];
        if (!this.classes || this.classes.length === 0) errors.push('No classes added');
        if (!this.staff || this.staff.filter((s)=>s.role === 'staff').length === 0) errors.push('No staff added');
        if (!this.subjects || this.subjects.length === 0) errors.push('No subjects added');
        if (errors.length > 0) return {
            valid: false,
            errors
        };
        // Check if each class has exactly 30 hours per week
        const classHours = {};
        this.subjects.forEach((subject)=>{
            if (subject && subject.className && subject.hoursPerWeek) classHours[subject.className] = (classHours[subject.className] || 0) + subject.hoursPerWeek;
        });
        this.classes.forEach((cls)=>{
            if (cls && cls.name) {
                const hours = classHours[cls.name] || 0;
                if (hours !== this.TOTAL_WEEKLY_HOURS) errors.push(`Class ${cls.name} must have exactly ${this.TOTAL_WEEKLY_HOURS} hours (current: ${hours}).`);
            }
        });
        if (errors.length > 0) return {
            valid: false,
            errors
        };
        return {
            valid: true,
            warnings: []
        };
    }
    /**
     * Main generation method
     */ generate() {
        try {
            console.log("\uD83D\uDE80 Starting intelligent timetable generation...");
            this._initialize();
            // Generate timetable for each class
            for (const cls of this.classes){
                if (!cls || !cls.name) continue;
                console.log(`
\u{1F4CB} Generating timetable for ${cls.name}`);
                const success = this._generateClassTimetable(cls.name);
                if (!success) return {
                    success: false,
                    error: `Failed to generate complete timetable for ${cls.name}`
                };
            }
            // Generate staff timetables
            this._generateStaffTimetables();
            const warnings = [];
            // Post-validate teacher weekly totals
            Object.keys(this.teacherExpectedWeeklyHours).forEach((t)=>{
                const expected = this.teacherExpectedWeeklyHours[t] || 0;
                const actual = this.teacherWeeklyHours[t] || 0;
                if (actual !== expected) warnings.push(`Teacher ${t} scheduled ${actual}/${expected} hours.`);
            });
            // Post-validate class filled hours
            this.classes.forEach((cls)=>{
                if (!cls || !cls.name) return;
                let filled = 0;
                this.DAYS.forEach((_, d)=>{
                    const row = this.classTimetables[cls.name]?.[d] || [];
                    row.forEach((s)=>{
                        if (s) filled++;
                    });
                });
                if (filled !== this.TOTAL_WEEKLY_HOURS) warnings.push(`Class ${cls.name} filled ${filled}/${this.TOTAL_WEEKLY_HOURS} periods.`);
            });
            console.log("\n\u2705 Timetable generation completed successfully");
            const diag = this._computeDiagnosticsAndScore();
            return {
                success: true,
                classTimetables: this.classTimetables,
                staffTimetables: this.staffTimetables,
                placements: this.placements,
                score: diag.score,
                diagnostics: diag.diagnostics,
                warnings
            };
        } catch (error) {
            console.error("\u274C Error generating timetable:", error);
            return {
                success: false,
                error: `Error: ${error.message || 'Unknown error'}`
            };
        }
    }
    _computeDiagnosticsAndScore() {
        let violations = [];
        let notes = [];
        // Subject weekly hours
        Object.keys(this.subjectPlacementTracker).forEach((k)=>{
            const t = this.subjectPlacementTracker[k];
            if (!t) return;
            if (t.remaining !== 0) violations.push(`Subject ${k} remaining ${t.remaining}`);
        });
        // Daily max per subject
        let sameSubjectExcesses = 0;
        Object.keys(this.subjectPlacementTracker).forEach((k)=>{
            const t = this.subjectPlacementTracker[k];
            if (!t) return;
            this.DAYS.forEach((d)=>{
                const c = t.dailyCount[d] || 0;
                if (c > this.dailyMaxPerSubject) sameSubjectExcesses += c - this.dailyMaxPerSubject;
            });
        });
        // Labs at edges
        let labsAtEdges = 0;
        for (const p of this.placements){
            if (p.type === 'lab') {
                if (p.period === 1 || p.period === this.PERIODS) labsAtEdges++;
            }
        }
        // Preferred spread
        let insufficientSpread = 0;
        const bySubject = {};
        for (const p of this.placements){
            const key = `${p.className}-${p.subject}`;
            bySubject[key] = bySubject[key] || new Set();
            bySubject[key].add(p.day);
        }
        this.subjects.forEach((s)=>{
            if (!s || !s.name) return;
            if ((s.hoursPerWeek || 0) >= 4) {
                const key = `${s.className}-${s.name}`;
                const usedDays = bySubject[key]?.size || 0;
                if (usedDays < 3) insufficientSpread++;
            }
        });
        // Teacher continuous periods over 3
        let teacherOver3 = 0;
        const teachers = Object.keys(this.staffTimetables);
        teachers.forEach((t)=>{
            const tt = this.staffTimetables[t];
            if (!tt) return;
            for(let d = 0; d < this.DAYS.length; d++){
                let run = 0;
                for(let p = 0; p < this.PERIODS; p++){
                    const slot = tt[d][p];
                    if (slot && slot.subject !== 'FREE') run++;
                    else {
                        if (run > 3) teacherOver3 += run - 3;
                        run = 0;
                    }
                }
                if (run > 3) teacherOver3 += run - 3;
            }
        });
        let score = 1000;
        score -= 500 * violations.length;
        score -= 10 * sameSubjectExcesses;
        score -= 5 * labsAtEdges;
        score -= 2 * insufficientSpread;
        score -= 1 * teacherOver3;
        const diagnostics = {
            violations,
            notes
        };
        return {
            score,
            diagnostics
        };
    }
    /**
     * Initialize all data structures
     */ _initialize() {
        console.log("\u2699\uFE0F Initializing timetables...");
        // Initialize class timetables
        this.classes.forEach((cls)=>{
            if (cls && cls.name) this.classTimetables[cls.name] = this.DAYS.map(()=>Array(this.PERIODS).fill(null));
        });
        // Initialize teacher tracking
        const staffMembers = this.staff.filter((s)=>s && s.role === 'staff');
        staffMembers.forEach((teacher)=>{
            if (teacher && teacher.name) {
                this.teacherBusySlots[teacher.name] = {};
                this.teacherWeeklyHours[teacher.name] = 0;
                this.teacherDailyHours[teacher.name] = {};
                this.DAYS.forEach((day)=>{
                    this.teacherDailyHours[teacher.name][day] = 0;
                });
            }
        });
        // Compute expected weekly hours per teacher
        this.teacherExpectedWeeklyHours = {};
        this.subjects.forEach((subject)=>{
            if (subject && subject.teacher && subject.hoursPerWeek) this.teacherExpectedWeeklyHours[subject.teacher] = (this.teacherExpectedWeeklyHours[subject.teacher] || 0) + subject.hoursPerWeek;
        });
    }
    /**
     * Generate timetable for a specific class
     */ _generateClassTimetable(className) {
        try {
            const classSubjects = this.subjects.filter((s)=>s && s.className === className);
            if (classSubjects.length === 0) {
                console.warn(`No subjects found for ${className}`);
                return true;
            }
            // Initialize subject tracking
            classSubjects.forEach((subject)=>{
                if (subject) {
                    const key = `${className}-${subject.name}`;
                    this.subjectPlacementTracker[key] = {
                        placed: 0,
                        remaining: subject.hoursPerWeek || 0,
                        dailyCount: {},
                        lastPlacedSlot: -1
                    };
                    this.DAYS.forEach((day)=>{
                        this.subjectPlacementTracker[key].dailyCount[day] = 0;
                    });
                }
            });
            // Initialize usage trackers for anti-pattern rules
            if (!this.subjectPeriodUsage[className]) this.subjectPeriodUsage[className] = {};
            if (!this.labStartPositions[className]) this.labStartPositions[className] = {};
            // Pre-place labs before theories
            this._prePlaceLabs(className, classSubjects);
            // Fill timetable slot by slot
            for(let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++){
                const day = this.DAYS[dayIdx];
                console.log(`  \u{1F4C5} ${day}:`);
                for(let period = 0; period < this.PERIODS; period++){
                    // Check if we're in the middle of a lab block
                    if (period > 0) {
                        const prevSlot = this.classTimetables[className][dayIdx][period - 1];
                        if (prevSlot && prevSlot.isLabContinuation && prevSlot.blockRemaining > 0) {
                            // Continue the lab block
                            const subject = classSubjects.find((s)=>s.name === prevSlot.subject);
                            if (subject) {
                                this._placeSubject(className, dayIdx, period, subject, true, prevSlot.blockRemaining - 1);
                                console.log(`    P${period + 1}: ${subject.name} (Lab continuation)`);
                                continue;
                            }
                        }
                    }
                    // Find best subject for this slot
                    const bestSubject = this._findBestSubject(className, dayIdx, period, classSubjects);
                    if (bestSubject) {
                        // Check if it's a lab and needs multiple periods
                        if (bestSubject.isContinuous) {
                            const blockSize = bestSubject.blockSize || 2;
                            // Check if we have enough consecutive periods
                            if (period + blockSize <= this.PERIODS) {
                                // Check if all periods are free and teacher is available
                                let canPlaceLab = true;
                                for(let i = 0; i < blockSize; i++){
                                    if (this.classTimetables[className][dayIdx][period + i] !== null) {
                                        canPlaceLab = false;
                                        break;
                                    }
                                    const slotKey = `${day}-P${period + 1 + i}`;
                                    if (this.teacherBusySlots[bestSubject.teacher]?.[slotKey]) {
                                        canPlaceLab = false;
                                        break;
                                    }
                                    if (!this._isTeacherAvailable(bestSubject.teacher, dayIdx, period + i)) {
                                        canPlaceLab = false;
                                        break;
                                    }
                                }
                                if (canPlaceLab) {
                                    // Place the entire lab block
                                    for(let i = 0; i < blockSize; i++)this._placeSubject(className, dayIdx, period + i, bestSubject, true, blockSize - i - 1);
                                    console.log(`    P${period + 1}-P${period + blockSize}: ${bestSubject.name} (Lab block)`);
                                    period += blockSize - 1; // Skip the periods we just filled
                                    continue;
                                } else console.log(`    P${period + 1}: Cannot place ${bestSubject.name} lab (not enough space or teacher busy)`);
                            }
                        } else {
                            // Place theory subject
                            this._placeSubject(className, dayIdx, period, bestSubject, false, 0);
                            console.log(`    P${period + 1}: ${bestSubject.name}`);
                        }
                    } else console.log(`    P${period + 1}: No suitable subject found (will remain empty)`);
                }
            }
            return true;
        } catch (error) {
            console.error(`\u{274C} Error generating timetable for ${className}:`, error);
            return false;
        }
    }
    _prePlaceLabs(className, classSubjects) {
        const labs = classSubjects.filter((s)=>s && s.isContinuous);
        if (labs.length === 0) return;
        const dayLabCount = {};
        this.DAYS.forEach((d)=>{
            dayLabCount[d] = 0;
        });
        const lastLabDay = {};
        for (const subject of labs){
            const blockSize = subject.blockSize || 2;
            let remaining = subject.hoursPerWeek || 0;
            const staffMember = this.staff.find((s)=>s.name === subject.teacher);
            while(remaining >= blockSize){
                let placed = false;
                const choices = [];
                for(let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++){
                    const day = this.DAYS[dayIdx];
                    for(let period = 0; period <= this.PERIODS - blockSize; period++){
                        let canPlace = true;
                        for(let i = 0; i < blockSize; i++){
                            if (this.classTimetables[className][dayIdx][period + i] !== null) {
                                canPlace = false;
                                break;
                            }
                            const slotKey = `${day}-P${period + 1 + i}`;
                            if (this.teacherBusySlots[subject.teacher]?.[slotKey]) {
                                canPlace = false;
                                break;
                            }
                            if (!this._isTeacherAvailable(subject.teacher, dayIdx, period + i)) {
                                canPlace = false;
                                break;
                            }
                        }
                        if (canPlace) {
                            let w = 100;
                            if (period === 0 || period + blockSize - 1 === this.PERIODS - 1) w -= 25;
                            if (dayLabCount[day] >= 1) w -= 30;
                            if (lastLabDay[subject.name] !== undefined && Math.abs(dayIdx - lastLabDay[subject.name]) < 1) w -= 20;
                            const teacherDaily = this.teacherDailyHours[subject.teacher]?.[this.DAYS[dayIdx]] || 0;
                            if (teacherDaily >= 3) w -= 15;
                            const startsUsed = this.labStartPositions[className][subject.name] || new Set();
                            if (startsUsed.has(period)) continue; // avoid repeating same start block across days
                            choices.push({
                                dayIdx,
                                period,
                                weight: Math.max(1, w)
                            });
                        }
                    }
                }
                if (choices.length > 0) {
                    const pick = this._weightedPick(choices);
                    for(let i = 0; i < blockSize; i++)this._placeSubject(className, pick.dayIdx, pick.period + i, subject, true, blockSize - i - 1);
                    const day = this.DAYS[pick.dayIdx];
                    dayLabCount[day] += 1;
                    lastLabDay[subject.name] = pick.dayIdx;
                    remaining -= blockSize;
                    placed = true;
                    const s = this.labStartPositions[className][subject.name] || new Set();
                    s.add(pick.period);
                    this.labStartPositions[className][subject.name] = s;
                }
                if (!placed) for(let dayIdx = 0; dayIdx < this.DAYS.length && !placed; dayIdx++){
                    const day = this.DAYS[dayIdx];
                    for(let period = 0; period <= this.PERIODS - blockSize; period++){
                        let canPlace = true;
                        for(let i = 0; i < blockSize; i++){
                            if (this.classTimetables[className][dayIdx][period + i] !== null) {
                                canPlace = false;
                                break;
                            }
                            const slotKey = `${day}-P${period + 1 + i}`;
                            if (this.teacherBusySlots[subject.teacher]?.[slotKey]) {
                                canPlace = false;
                                break;
                            }
                            if (!this._isTeacherAvailable(subject.teacher, dayIdx, period + i)) {
                                canPlace = false;
                                break;
                            }
                        }
                        if (canPlace) {
                            for(let i = 0; i < blockSize; i++)this._placeSubject(className, dayIdx, period + i, subject, true, blockSize - i - 1);
                            dayLabCount[day] += 1;
                            lastLabDay[subject.name] = dayIdx;
                            remaining -= blockSize;
                            placed = true;
                            const s2 = this.labStartPositions[className][subject.name] || new Set();
                            s2.add(period);
                            this.labStartPositions[className][subject.name] = s2;
                            break;
                        }
                    }
                }
                if (!placed) break;
            }
        }
    }
    /**
     * Find the best subject to place in a given slot
     */ _findBestSubject(className, dayIdx, period, classSubjects) {
        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;
        const candidates = [];
        for (const subject of classSubjects){
            if (!subject || !subject.name) continue;
            const trackingKey = `${className}-${subject.name}`;
            const tracker = this.subjectPlacementTracker[trackingKey];
            // Skip if no hours remaining
            if (!tracker || tracker.remaining <= 0) continue;
            // Check teacher availability (Rule: teacher not in two classes at once)
            if (this.teacherBusySlots[subject.teacher]?.[slotKey]) continue;
            if (!this._isTeacherAvailable(subject.teacher, dayIdx, period)) continue;
            // Hard cap: do not exceed teacher's expected weekly hours
            const expectedWeekly = this.teacherExpectedWeeklyHours[subject.teacher] || 0;
            const currentWeekly = this.teacherWeeklyHours[subject.teacher] || 0;
            if (expectedWeekly > 0 && currentWeekly >= expectedWeekly) continue;
            let score = 100;
            const reasons = [];
            const dailyCount = tracker.dailyCount[day] || 0;
            if (!subject.isContinuous) {
                if (dailyCount >= this.dailyMaxPerSubject) continue;
                else if (dailyCount === 1) {
                    score -= 25;
                    reasons.push('Second usage same day -25');
                }
            }
            // Vertical pattern avoidance: limit same subject in the same period across days to 2
            const usageMap = this.subjectPeriodUsage[className][subject.name] || {};
            const usedCountSamePeriod = usageMap[period] || 0;
            if (!subject.isContinuous) {
                if (usedCountSamePeriod >= 2) continue;
                else if (usedCountSamePeriod === 1) {
                    score -= 20;
                    reasons.push('Repeat same period across days -20');
                } else {
                    score += 10;
                    reasons.push('Prefer unused period slot +10');
                }
            }
            // Daily variety anti-pattern: avoid same 2/3 subject order across days
            if (!subject.isContinuous) {
                // Check pair
                if (period >= 1) {
                    const prevSubj = this.classTimetables[className][dayIdx][period - 1]?.subject || null;
                    if (prevSubj) for(let d = 0; d < this.DAYS.length; d++){
                        if (d === dayIdx) continue;
                        const s1 = this.classTimetables[className][d]?.[period - 1]?.subject || null;
                        const s2 = this.classTimetables[className][d]?.[period]?.subject || null;
                        if (s1 === prevSubj && s2 === subject.name) {
                            score -= 25;
                            reasons.push('Avoid repeating pair order across days -25');
                            break;
                        }
                    }
                }
                // Check triple
                if (period >= 2) {
                    const ps2 = this.classTimetables[className][dayIdx][period - 2]?.subject || null;
                    const ps1 = this.classTimetables[className][dayIdx][period - 1]?.subject || null;
                    if (ps2 && ps1) for(let d = 0; d < this.DAYS.length; d++){
                        if (d === dayIdx) continue;
                        const t0 = this.classTimetables[className][d]?.[period - 2]?.subject || null;
                        const t1 = this.classTimetables[className][d]?.[period - 1]?.subject || null;
                        const t2 = this.classTimetables[className][d]?.[period]?.subject || null;
                        if (t0 === ps2 && t1 === ps1 && t2 === subject.name) {
                            score -= 40;
                            reasons.push('Avoid repeating triple order across days -40');
                            break;
                        }
                    }
                }
            }
            if (!subject.isContinuous && period >= 2) {
                let continuousCount = 0;
                for(let i = 1; i <= 2; i++){
                    const prevSlot = this.classTimetables[className][dayIdx][period - i];
                    if (prevSlot && prevSlot.subject === subject.name && !prevSlot.isLabContinuation) continuousCount++;
                    else break;
                }
                if (continuousCount >= 2) continue;
                else if (continuousCount === 1) {
                    score -= 25;
                    reasons.push('Avoid back-to-back theory -25');
                }
            }
            if (!subject.isContinuous) {
                if (period >= 1 && period <= 4) {
                    score += 20;
                    reasons.push('Middle period theory +20');
                } else {
                    score -= 25;
                    reasons.push('Edge period theory -25');
                }
            }
            // RULE: Labs prefer afternoon (period 3-5)
            if (subject.isContinuous) {
                const blockSize = subject.blockSize || 2;
                // Check if lab can fit
                if (period + blockSize > this.PERIODS) {
                    score -= 1000;
                    reasons.push('Lab cannot fit -1000');
                } else {
                    if (period >= 2) {
                        score += 25;
                        reasons.push('Lab in afternoon +25');
                    }
                    // RULE: Avoid last period for labs
                    if (period + blockSize === this.PERIODS + 1) {
                        score -= 20;
                        reasons.push('Lab at last period -20');
                    }
                    // Count labs already placed today
                    let labsToday = 0;
                    for(let p = 0; p < period; p++){
                        const slot = this.classTimetables[className][dayIdx][p];
                        if (slot && slot.isLabContinuation && slot.blockRemaining === (slot.blockSize || 2) - 1) labsToday++;
                    }
                    // Prefer 1 lab per day; second only if necessary
                    if (labsToday >= 1) {
                        score -= 50;
                        reasons.push('Second lab same day -50');
                    }
                }
            }
            // Weekly distribution preference: prefer unused days for the subject
            if (!subject.isContinuous) {
                const uniqueDaysUsed = this.DAYS.reduce((acc, d)=>acc + ((tracker.dailyCount[d] || 0) > 0 ? 1 : 0), 0);
                if (tracker.dailyCount[day] === 0) {
                    score += 15;
                    reasons.push('Prefer spreading to new day +15');
                }
            }
            // Daily diversity: prefer at least 3 different subjects per day
            if (!subject.isContinuous) {
                const existingSlots = this.classTimetables[className][dayIdx];
                const distinctSubjects = new Set();
                for(let p = 0; p < existingSlots.length; p++){
                    const sl = existingSlots[p];
                    if (sl && !sl.isLabContinuation) distinctSubjects.add(sl.subject);
                }
                const distinctCount = distinctSubjects.size;
                if (distinctCount < 3) {
                    if (distinctSubjects.has(subject.name)) {
                        score -= 30;
                        reasons.push('Improve daily mix -30');
                    } else {
                        score += 30;
                        reasons.push('New subject improves mix +30');
                    }
                }
            }
            // Teacher dominance control per day
            if (!subject.isContinuous) {
                const teacherDaily = this.teacherDailyHours[subject.teacher]?.[day] || 0;
                if (teacherDaily >= 3) {
                    score -= 25;
                    reasons.push('Teacher day dominance -25');
                } else if (teacherDaily >= 2) {
                    score -= 10;
                    reasons.push('Teacher appearing often -10');
                }
            }
            // Priority to subjects with more remaining hours
            const remainingRatio = tracker.remaining / (subject.hoursPerWeek || 1);
            score += remainingRatio * 20;
            reasons.push(`Remaining priority +${Math.round(remainingRatio * 20)}`);
            // Teacher free period rules
            const staffMember = this.staff.find((s)=>s.name === subject.teacher);
            if (staffMember) {
                const dailyHours = this.teacherDailyHours[subject.teacher]?.[day] || 0;
                if (staffMember.freePeriodMode === 'manual') {
                    const maxDailyHours = this.PERIODS - (staffMember.manualFreePeriods || 0);
                    if (dailyHours >= maxDailyHours) continue;
                } else // Auto mode: try to leave at least 1 free period per day
                if (dailyHours >= this.PERIODS - 1) {
                    score -= 50;
                    reasons.push('Auto: prefer leaving free period -50');
                }
            }
            // Teacher load: avoid creating >3 consecutive teaching periods
            const dayName = this.DAYS[dayIdx];
            let prevRun = 0;
            for(let p = period - 1; p >= 0; p--){
                const keyPrev = `${dayName}-P${p + 1}`;
                if (this.teacherBusySlots[subject.teacher]?.[keyPrev]) prevRun++;
                else break;
            }
            let nextRun = 0;
            for(let p = period + 1; p < this.PERIODS; p++){
                const keyNext = `${dayName}-P${p + 1}`;
                if (this.teacherBusySlots[subject.teacher]?.[keyNext]) nextRun++;
                else break;
            }
            if (prevRun + 1 + nextRun > 3) {
                score -= 40;
                reasons.push('Avoid >3 consecutive teacher load -40');
            }
            candidates.push({
                subject,
                score,
                reasons
            });
        }
        if (candidates.length > 0) {
            const weighted = candidates.map((c)=>({
                    item: c.subject,
                    weight: Math.max(1, Math.round(c.score))
                }));
            const pick = this._weightedPick(weighted);
            if (pick) return pick.item;
        }
        // Fallback: return any subject with remaining hours
        const fallback = classSubjects.find((s)=>{
            const key = `${className}-${s.name}`;
            return s && this.subjectPlacementTracker[key]?.remaining > 0;
        });
        return fallback || null;
    }
    /**
     * Place a subject in a specific slot
     */ _placeSubject(className, dayIdx, period, subject, isLab, blockRemaining) {
        if (!className || !subject || !subject.name || !subject.teacher) return;
        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;
        const trackingKey = `${className}-${subject.name}`;
        // Place in timetable
        this.classTimetables[className][dayIdx][period] = {
            subject: subject.name,
            teacher: subject.teacher,
            type: subject.subjectType || 'Core',
            isLabContinuation: isLab,
            blockRemaining: blockRemaining,
            blockSize: subject.blockSize || 2
        };
        // Update tracking only once per lab block
        if (!isLab || blockRemaining === (subject.blockSize || 2) - 1) {
            const tracker = this.subjectPlacementTracker[trackingKey];
            if (tracker) {
                if (isLab) {
                    tracker.remaining -= subject.blockSize || 2;
                    tracker.placed += subject.blockSize || 2;
                } else {
                    tracker.remaining -= 1;
                    tracker.placed += 1;
                }
                tracker.dailyCount[day] = (tracker.dailyCount[day] || 0) + 1;
                tracker.lastPlacedSlot = dayIdx * this.PERIODS + period;
            }
        }
        // Ensure teacher tracking is initialized
        if (!this.teacherBusySlots[subject.teacher]) this.teacherBusySlots[subject.teacher] = {};
        if (!this.teacherWeeklyHours[subject.teacher]) this.teacherWeeklyHours[subject.teacher] = 0;
        if (!this.teacherDailyHours[subject.teacher]) {
            this.teacherDailyHours[subject.teacher] = {};
            this.DAYS.forEach((d)=>{
                if (this.teacherDailyHours[subject.teacher][d] === undefined) this.teacherDailyHours[subject.teacher][d] = 0;
            });
        }
        // Mark teacher as busy
        this.teacherBusySlots[subject.teacher][slotKey] = true;
        // Update teacher hours
        this.teacherWeeklyHours[subject.teacher] = (this.teacherWeeklyHours[subject.teacher] || 0) + 1;
        this.teacherDailyHours[subject.teacher][day] = (this.teacherDailyHours[subject.teacher][day] || 0) + 1;
        // Update subject period usage for vertical anti-pattern control
        const subjUsage = this.subjectPeriodUsage[className][subject.name] || {};
        subjUsage[period] = (subjUsage[period] || 0) + 1;
        this.subjectPeriodUsage[className][subject.name] = subjUsage;
        this.placements.push({
            day: this.DAYS[dayIdx],
            period: period + 1,
            subject: subject.name,
            teacher: subject.teacher,
            type: isLab ? 'lab' : 'theory',
            className
        });
    }
    _isTeacherAvailable(teacherName, dayIdx, period) {
        const day = this.DAYS[dayIdx];
        const staffMember = this.staff.find((s)=>s.name === teacherName);
        const availability = staffMember?.availability;
        if (!availability) return true;
        const daySlots = availability[day];
        if (!Array.isArray(daySlots)) return true;
        const v = daySlots[period];
        if (v === undefined) return true;
        return !!v;
    }
    _weightedPick(items) {
        let total = 0;
        for (const it of items)total += it.weight;
        if (total <= 0) return null;
        let r = this._rng() * total;
        for (const it of items){
            if (r < it.weight) return it;
            r -= it.weight;
        }
        return items[items.length - 1] || null;
    }
    /**
     * Generate staff timetables from class timetables
     */ _generateStaffTimetables() {
        console.log("\n\uD83D\uDC68\u200D\uD83C\uDFEB Generating staff timetables...");
        const staffMembers = this.staff.filter((s)=>s && s.role === 'staff');
        // Initialize staff timetables with FREE periods
        staffMembers.forEach((teacher)=>{
            if (teacher && teacher.name) this.staffTimetables[teacher.name] = this.DAYS.map(()=>Array(this.PERIODS).fill(null).map(()=>({
                        subject: 'FREE',
                        class: '-',
                        type: 'free'
                    })));
        });
        // Fill in scheduled periods from class timetables
        this.classes.forEach((cls)=>{
            if (!cls || !cls.name || !this.classTimetables[cls.name]) return;
            this.DAYS.forEach((day, dayIdx)=>{
                const daySchedule = this.classTimetables[cls.name][dayIdx];
                if (!daySchedule) return;
                daySchedule.forEach((slot, period)=>{
                    if (slot && slot.teacher && this.staffTimetables[slot.teacher]) this.staffTimetables[slot.teacher][dayIdx][period] = {
                        subject: slot.subject,
                        class: cls.name,
                        type: slot.type
                    };
                });
            });
        });
        console.log("\u2705 Staff timetables generated");
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["ifaHC"], null, "parcelRequireb79f", {})

//# sourceMappingURL=AdminDashboard.c1fc38ab.js.map
