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
    const [showAddStaffForm, setShowAddStaffForm] = (0, _react.useState)(false);
    const [showAddSubjectForm, setShowAddSubjectForm] = (0, _react.useState)(false);
    const [showAddClassForm, setShowAddClassForm] = (0, _react.useState)(false);
    const [activeTab, setActiveTab] = (0, _react.useState)('classes');
    // Refs for scrolling
    const staffFormRef = (0, _react.useRef)(null);
    const subjectFormRef = (0, _react.useRef)(null);
    // Form Models
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
                    hallNumber: newClass.hallNumber
                });
                setClasses(classes.map((c)=>c.id === newClass.id ? {
                        id: newClass.id,
                        ...newClass
                    } : c));
                showToast("\u2705 Class updated!", "success");
            } else {
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    // Department features removed
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
                lineNumber: 592,
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
                        lineNumber: 603,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 604,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 593,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _animatedBackgroundDefault.default), {
                forceFull: true
            }, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 612,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "min-h-screen relative z-10 text-white",
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "header-content",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h1", {
                                children: "\uD83C\uDFEB Admin Dashboard"
                            }, void 0, false, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 619,
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
                                    lineNumber: 621,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 620,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 618,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "segmented-nav",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                className: `segmented-item ${activeTab === 'classes' ? 'active' : ''}`,
                                onClick: ()=>{
                                    setActiveTab('classes');
                                    document.getElementById('classes-section')?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                },
                                title: "Classes",
                                children: "\uD83C\uDF93 Classes"
                            }, void 0, false, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 629,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                className: `segmented-item ${activeTab === 'staff' ? 'active' : ''}`,
                                onClick: ()=>{
                                    setActiveTab('staff');
                                    document.getElementById('staff-section')?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                },
                                title: "Staff",
                                children: "\uD83D\uDC65 Staff"
                            }, void 0, false, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 636,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                className: `segmented-item ${activeTab === 'subjects' ? 'active' : ''}`,
                                onClick: ()=>{
                                    setActiveTab('subjects');
                                    document.getElementById('subject-section')?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                },
                                title: "Subjects",
                                children: "\uD83D\uDCD6 Subjects"
                            }, void 0, false, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 643,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                className: `segmented-item ${activeTab === 'generate' ? 'active' : ''}`,
                                onClick: ()=>{
                                    setActiveTab('generate');
                                    document.getElementById('generate-section')?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                },
                                title: "Generate",
                                children: "\uD83D\uDD04 Generate"
                            }, void 0, false, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 650,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                className: `segmented-item ${activeTab === 'results' ? 'active' : ''}`,
                                onClick: ()=>{
                                    setActiveTab('results');
                                    document.getElementById('view-timetables')?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                },
                                title: "Results",
                                children: "\uD83D\uDCC5 Results"
                            }, void 0, false, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 657,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 628,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 615,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "content",
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "section",
                        id: "classes-section",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                        className: "section-icon",
                                        children: "\uD83D\uDCDA"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 673,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Classes"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 674,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 672,
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
                                        lineNumber: 679,
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
                                        lineNumber: 681,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
                                        children: [
                                            (()=>{
                                                const sorted = [
                                                    ...classes
                                                ].sort((a, b)=>a.name.localeCompare(b.name));
                                                return sorted.map((cls, idx)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "dept-group",
                                                        children: [
                                                            sorted[idx] && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "dept-chip",
                                                                children: "Class"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 690,
                                                                columnNumber: 61
                                                            }, this),
                                                            [
                                                                cls
                                                            ].map((cls, idx2)=>{
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
                                                                                            lineNumber: 709,
                                                                                            columnNumber: 72
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 708,
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
                                                                                            lineNumber: 712,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                            children: [
                                                                                                Math.max(30 - totalHours, 0),
                                                                                                "h remaining"
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                                            lineNumber: 713,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 711,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 699,
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
                                                                                lineNumber: 724,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 716,
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
                                                                                                    lineNumber: 735,
                                                                                                    columnNumber: 73
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                                    children: "Subjects"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 736,
                                                                                                    columnNumber: 73
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                                    children: "Hours"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 737,
                                                                                                    columnNumber: 73
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                                    children: "Actions"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 738,
                                                                                                    columnNumber: 73
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                                            lineNumber: 734,
                                                                                            columnNumber: 69
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 733,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tbody", {
                                                                                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("tr", {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                                    children: cls.hallNumber || '-'
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 743,
                                                                                                    columnNumber: 73
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                                    children: classSubjects.length
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 744,
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
                                                                                                        lineNumber: 746,
                                                                                                        columnNumber: 77
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 745,
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
                                                                                                                lineNumber: 750,
                                                                                                                columnNumber: 81
                                                                                                            }, this),
                                                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                                                className: "btn-icon btn-icon-danger",
                                                                                                                onClick: ()=>deleteClass(cls.id),
                                                                                                                title: "Delete",
                                                                                                                children: "\uD83D\uDDD1\uFE0F"
                                                                                                            }, void 0, false, {
                                                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                                                lineNumber: 751,
                                                                                                                columnNumber: 81
                                                                                                            }, this)
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                                        lineNumber: 749,
                                                                                                        columnNumber: 77
                                                                                                    }, this)
                                                                                                }, void 0, false, {
                                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                                    lineNumber: 748,
                                                                                                    columnNumber: 73
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                                            lineNumber: 742,
                                                                                            columnNumber: 69
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 741,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 732,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 731,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, `${cls.id}-${idx2}`, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 698,
                                                                    columnNumber: 53
                                                                }, this);
                                                            })
                                                        ]
                                                    }, `class-${cls.id}`, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 689,
                                                        columnNumber: 41
                                                    }, this));
                                            })(),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "mobile-cards",
                                                children: (()=>{
                                                    const sorted = [
                                                        ...classes
                                                    ].sort((a, b)=>a.name.localeCompare(b.name));
                                                    const cards = [];
                                                    sorted.forEach((cls, idx)=>{
                                                        const classSubjects = subjects.filter((s)=>s.className === cls.name);
                                                        const totalHours = classSubjects.reduce((sum, s)=>sum + s.hoursPerWeek, 0);
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
                                                                            lineNumber: 775,
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
                                                                            lineNumber: 776,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 774,
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
                                                                                    lineNumber: 781,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                    className: "mobile-card-value",
                                                                                    children: cls.hallNumber || '-'
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 782,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 780,
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
                                                                                    lineNumber: 785,
                                                                                    columnNumber: 61
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                    className: "mobile-card-value",
                                                                                    children: classSubjects.length
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 786,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 784,
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
                                                                                    lineNumber: 789,
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
                                                                                    lineNumber: 790,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 788,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 778,
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
                                                                            lineNumber: 794,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                            className: "btn btn-danger btn-sm",
                                                                            onClick: ()=>deleteClass(cls.id),
                                                                            children: "\uD83D\uDDD1\uFE0F Delete"
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 795,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 793,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, cls.id, true, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 773,
                                                            columnNumber: 49
                                                        }, this));
                                                    });
                                                    return cards;
                                                })()
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 765,
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
                                                hallNumber: ''
                                            });
                                        },
                                        style: {
                                            marginTop: '15px'
                                        },
                                        children: "\u2795 Add Class"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 805,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 678,
                                columnNumber: 21
                            }, this),
                            showAddClassForm && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: newClass.id ? "\u270F\uFE0F Edit Class" : "\u2795 Add New Class"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 817,
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
                                                        lineNumber: 820,
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
                                                        lineNumber: 821,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 819,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Hall Number (Optional)"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 829,
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
                                                        lineNumber: 830,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 828,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 818,
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
                                                lineNumber: 840,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-secondary",
                                                onClick: ()=>{
                                                    setNewClass({
                                                        name: '',
                                                        hallNumber: ''
                                                    });
                                                    setShowAddClassForm(false);
                                                },
                                                children: "\u274C Cancel"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 843,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 839,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 816,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 671,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "section",
                        id: "staff-section",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                        className: "section-icon",
                                        children: "\uD83D\uDC65"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 854,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Staff"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 855,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 853,
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
                                        lineNumber: 860,
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
                                        lineNumber: 862,
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
                                                                        lineNumber: 871,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Name"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 872,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Username"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 873,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Free Periods"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 874,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Actions"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 875,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 870,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 869,
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
                                                                                lineNumber: 881,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 881,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("strong", {
                                                                                children: s.name
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 882,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 882,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: s.username
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 883,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: s.freePeriodMode === 'manual' ? `Manual (${s.manualFreePeriods} free periods)` : 'Auto'
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 884,
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
                                                                                        lineNumber: 891,
                                                                                        columnNumber: 61
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                        className: "btn-icon btn-icon-danger",
                                                                                        onClick: ()=>deleteStaff(s.id),
                                                                                        title: "Delete",
                                                                                        children: "\uD83D\uDDD1\uFE0F"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 898,
                                                                                        columnNumber: 61
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 890,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 889,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, s.id, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 880,
                                                                    columnNumber: 49
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 878,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 868,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 867,
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
                                                                        lineNumber: 917,
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
                                                                        lineNumber: 918,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 916,
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
                                                                                lineNumber: 922,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: s.username
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 923,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 921,
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
                                                                                lineNumber: 926,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: s.freePeriodMode === 'manual' ? `Manual (${s.manualFreePeriods} free periods)` : 'Auto'
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 927,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 925,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 920,
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
                                                                        lineNumber: 935,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                        className: "btn btn-danger btn-sm",
                                                                        onClick: ()=>deleteStaff(s.id),
                                                                        children: "\uD83D\uDDD1\uFE0F Delete"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 938,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 934,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, s.id, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 915,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 913,
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
                                        lineNumber: 947,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 859,
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
                                        lineNumber: 959,
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
                                                        lineNumber: 962,
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
                                                        lineNumber: 963,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 961,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Username *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 971,
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
                                                        lineNumber: 972,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 970,
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
                                                        lineNumber: 980,
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
                                                        lineNumber: 981,
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
                                                        lineNumber: 988,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 979,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Free Period Mode"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 994,
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
                                                                lineNumber: 999,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "manual",
                                                                children: "Manual"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1000,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 995,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 993,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 960,
                                        columnNumber: 29
                                    }, this),
                                    newStaff.freePeriodMode === 'manual' && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                children: "Free Periods per Week"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1007,
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
                                                lineNumber: 1008,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1006,
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
                                                lineNumber: 1022,
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
                                                lineNumber: 1025,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1021,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 958,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 852,
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
                                        lineNumber: 1036,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Subjects"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1037,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1035,
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
                                        lineNumber: 1042,
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
                                        lineNumber: 1044,
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
                                                                        lineNumber: 1068,
                                                                        columnNumber: 60
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1067,
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
                                                                        lineNumber: 1071,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                        children: [
                                                                            Math.max(30 - totalHours, 0),
                                                                            "h remaining"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1072,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1070,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1058,
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
                                                            lineNumber: 1085,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1077,
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
                                                                                lineNumber: 1097,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Type"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1098,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Hours"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1099,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Teacher"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1100,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Continuous"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1101,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Actions"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1102,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1096,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 1095,
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
                                                                                        lineNumber: 1108,
                                                                                        columnNumber: 69
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1108,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.subjectType
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1109,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: [
                                                                                        sub.hoursPerWeek,
                                                                                        "h"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1110,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.teacher
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1111,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.isContinuous ? `Yes (${sub.blockSize}p)` : 'No'
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1112,
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
                                                                                                lineNumber: 1117,
                                                                                                columnNumber: 73
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                                className: "btn-icon btn-icon-danger",
                                                                                                onClick: ()=>deleteSubject(sub.id),
                                                                                                title: "Delete",
                                                                                                children: "\uD83D\uDDD1\uFE0F"
                                                                                            }, void 0, false, {
                                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                                lineNumber: 1124,
                                                                                                columnNumber: 73
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1116,
                                                                                        columnNumber: 69
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 1115,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, sub.id, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 1107,
                                                                            columnNumber: 61
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 1105,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 1094,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1093,
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
                                                                                lineNumber: 1143,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-badge",
                                                                                children: sub.subjectType
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1144,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1142,
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
                                                                                        lineNumber: 1148,
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
                                                                                        lineNumber: 1149,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1147,
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
                                                                                        lineNumber: 1152,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-value",
                                                                                        children: sub.teacher
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1153,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1151,
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
                                                                                        lineNumber: 1156,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-value",
                                                                                        children: sub.isContinuous ? `Yes (${sub.blockSize}p)` : 'No'
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 1157,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1155,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1146,
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
                                                                                lineNumber: 1163,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                className: "btn btn-danger btn-sm",
                                                                                onClick: ()=>deleteSubject(sub.id),
                                                                                children: "\uD83D\uDDD1\uFE0F Delete"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 1166,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 1162,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, sub.id, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1141,
                                                                columnNumber: 53
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1139,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, cls.id, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1057,
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
                                        lineNumber: 1178,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1041,
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
                                        lineNumber: 1190,
                                        columnNumber: 29
                                    }, this),
                                    newSubject.className && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _hoursTrackerDefault.default), {
                                        className: newSubject.className,
                                        subjects: subjects
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1193,
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
                                                        lineNumber: 1198,
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
                                                                lineNumber: 1203,
                                                                columnNumber: 41
                                                            }, this),
                                                            classes.map((cls)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                    value: cls.name,
                                                                    children: cls.name
                                                                }, cls.id, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 1205,
                                                                    columnNumber: 45
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1199,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1197,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Subject Name *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1210,
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
                                                        lineNumber: 1211,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1209,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Subject Type *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1219,
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
                                                                lineNumber: 1224,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Elective",
                                                                children: "Elective"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1225,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Lab",
                                                                children: "Lab"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1226,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Other",
                                                                children: "Other"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 1227,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1220,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1218,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Hours per Week *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1231,
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
                                                        lineNumber: 1232,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1230,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Teacher *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1244,
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
                                                                lineNumber: 1249,
                                                                columnNumber: 41
                                                            }, this),
                                                            teachers.map((t)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                    value: t.name,
                                                                    children: t.name
                                                                }, t.id, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 1251,
                                                                    columnNumber: 45
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1245,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1243,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1196,
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
                                                lineNumber: 1258,
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
                                                lineNumber: 1264,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1257,
                                        columnNumber: 29
                                    }, this),
                                    newSubject.isContinuous && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                children: "Block Size"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1271,
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
                                                        lineNumber: 1279,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                        value: 3,
                                                        children: "3 Periods"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1280,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1272,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1270,
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
                                                lineNumber: 1286,
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
                                                lineNumber: 1289,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1285,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1189,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 1034,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "section",
                        id: "generate-section",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "section-header",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                        className: "section-icon",
                                        children: "\u26A1"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1300,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Generate Timetable"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1301,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1299,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Ready to Generate"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1305,
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
                                                        lineNumber: 1308,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-value",
                                                        children: classes.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1309,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1307,
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
                                                        lineNumber: 1312,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-value",
                                                        children: teachers.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1313,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1311,
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
                                                        lineNumber: 1316,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        className: "stat-value",
                                                        children: subjects.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1317,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 1315,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1306,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        className: "btn btn-success btn-lg",
                                        onClick: generateTimetable,
                                        disabled: loading,
                                        children: loading ? "\u23F3 Generating..." : "\u26A1 Generate Timetable"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1321,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1304,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 1298,
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
                                        lineNumber: 1335,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Generated Timetables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1336,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1334,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Time Tables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1340,
                                        columnNumber: 29
                                    }, this),
                                    [
                                        ...classes
                                    ].sort((a, b)=>a.name.localeCompare(b.name)).map((cls)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "timetable-container",
                                            id: `timetable-export-${cls.id}`,
                                            children: [
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h4", {
                                                    className: "timetable-title",
                                                    children: cls.name
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1343,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                    className: "timetable-scroll",
                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _timetableGridDefault.default), {
                                                        timetable: timetable.classTimetables,
                                                        className: cls.name
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1345,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1344,
                                                    columnNumber: 37
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
                                                        lineNumber: 1348,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1347,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, cls.id, true, {
                                            fileName: "src/components/AdminDashboard.jsx",
                                            lineNumber: 1342,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1339,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Staff-wise Timetables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 1355,
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
                                                    lineNumber: 1358,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                    className: "timetable-scroll",
                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _staffTimetableGridDefault.default), {
                                                        timetable: timetable.staffTimetables,
                                                        staffName: teacher.name
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 1360,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1359,
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
                                                        lineNumber: 1363,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 1362,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, teacher.id, true, {
                                            fileName: "src/components/AdminDashboard.jsx",
                                            lineNumber: 1357,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 1354,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 1333,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 667,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _toast.ToastContainer), {
                toasts: toasts,
                onRemove: removeToast
            }, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 1373,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true);
}
_s(AdminDashboard, "TCsHALsX5pyaBAwLRJoRzlrEIuI=");
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
 * ══════════════════════════════════════════════════════════════
 * TIMETABLE GENERATOR - FINAL VERSION
 * All rules + Random lab positions + Aggressive placement
 * ══════════════════════════════════════════════════════════════
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TimetableGenerator", ()=>TimetableGenerator);
class TimetableGenerator {
    constructor(classes, staff, subjects){
        this.classes = classes || [];
        this.staff = staff || [];
        this.subjects = subjects || [];
        this.classTimetables = {};
        this.staffTimetables = {};
        this.teacherSlots = {};
        this.DAYS = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
        ];
        this.PERIODS = 6;
        this.TOTAL_HOURS = 30;
        this.labPositionsUsed = {};
        this._seed = Date.now();
    }
    _random() {
        this._seed = (this._seed * 1664525 + 1013904223) % 4294967296;
        return this._seed / 4294967296;
    }
    _shuffle(array) {
        const arr = [
            ...array
        ];
        for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(this._random() * (i + 1));
            [arr[i], arr[j]] = [
                arr[j],
                arr[i]
            ];
        }
        return arr;
    }
    validate() {
        const errors = [];
        if (!this.classes?.length) errors.push('No classes defined');
        if (!this.staff?.filter((s)=>s?.role === 'staff').length) errors.push('No staff defined');
        if (!this.subjects?.length) errors.push('No subjects defined');
        this.classes.forEach((cls)=>{
            const classSubjects = this.subjects.filter((s)=>s?.className === cls.name);
            const totalHours = classSubjects.reduce((sum, s)=>sum + (s.hoursPerWeek || 0), 0);
            if (totalHours !== this.TOTAL_HOURS) errors.push(`Class "${cls.name}": Total hours = ${totalHours}, MUST be ${this.TOTAL_HOURS}!`);
        });
        return errors.length ? {
            valid: false,
            errors
        } : {
            valid: true
        };
    }
    generate() {
        console.log("\uD83D\uDE80 TIMETABLE GENERATOR - FINAL VERSION");
        console.log('='.repeat(60));
        const validation = this.validate();
        if (!validation.valid) {
            console.error("\u274C VALIDATION FAILED:");
            validation.errors.forEach((e)=>console.error(`  \u{2022} ${e}`));
            return {
                success: false,
                error: validation.errors.join('; '),
                classTimetables: {},
                staffTimetables: {}
            };
        }
        this._initialize();
        let allSuccess = true;
        for (const cls of this.classes){
            if (!cls?.name) continue;
            console.log(`
\u{1F4DA} Generating: ${cls.name}`);
            this.labPositionsUsed[cls.name] = [];
            const success = this._generateForClass(cls.name);
            if (!success) allSuccess = false;
        }
        this._buildStaffTimetables();
        return {
            success: allSuccess,
            classTimetables: this.classTimetables,
            staffTimetables: this.staffTimetables
        };
    }
    _initialize() {
        this.classes.forEach((cls)=>{
            if (cls?.name) this.classTimetables[cls.name] = this.DAYS.map(()=>Array(this.PERIODS).fill(null));
        });
        this.staff.forEach((s)=>{
            if (s?.name) this.teacherSlots[s.name] = {};
        });
    }
    _generateForClass(className) {
        const subjects = this.subjects.filter((s)=>s?.className === className);
        if (!subjects.length) return true;
        const labs = subjects.filter((s)=>s.isContinuous);
        const theory = subjects.filter((s)=>!s.isContinuous);
        const tracking = {
            daysUsed: {},
            dayPeriodMap: {},
            periodWeeklyCount: {},
            periodGlobalUsage: Array(6).fill(0),
            hoursPlaced: {}
        };
        theory.forEach((s)=>{
            tracking.daysUsed[s.name] = new Set();
            tracking.dayPeriodMap[s.name] = {};
            tracking.periodWeeklyCount[s.name] = Array(6).fill(0);
            tracking.hoursPlaced[s.name] = 0;
        });
        const labTracking = {
            lastDay: {},
            dayLabCount: {},
            hoursPlaced: {}
        };
        this.DAYS.forEach((d)=>labTracking.dayLabCount[d] = 0);
        labs.forEach((lab)=>labTracking.hoursPlaced[lab.name] = 0);
        const daySubjectCount = {};
        this.DAYS.forEach((d)=>daySubjectCount[d] = new Set());
        // PHASE 1: LABS
        console.log("\n  \uD83D\uDD2C Phase 1: Labs (random positions)...");
        for (const lab of labs){
            const hoursNeeded = lab.hoursPerWeek || 0;
            const blocksNeeded = Math.floor(hoursNeeded / 2);
            for(let i = 0; i < blocksNeeded; i++){
                const success = this._placeLabBlock(className, lab, labTracking, daySubjectCount);
                if (!success) {
                    console.error(`  \u{274C} Failed to place lab: ${lab.name}`);
                    return false;
                }
                labTracking.hoursPlaced[lab.name] += 2;
            }
        }
        // PHASE 2: THEORY FIRST-PASS
        console.log("\n  \uD83D\uDCD6 Phase 2: Theory spread (one per day)...");
        const sortedTheory = [
            ...theory
        ].sort((a, b)=>(b.hoursPerWeek || 0) - (a.hoursPerWeek || 0));
        for (const subj of sortedTheory){
            const hours = subj.hoursPerWeek || 0;
            const targetDays = Math.min(hours, 5);
            for(let dayIdx = 0; dayIdx < 5 && tracking.hoursPlaced[subj.name] < targetDays; dayIdx++){
                if (tracking.daysUsed[subj.name].has(dayIdx)) continue;
                const success = this._placeTheory(className, subj, tracking, dayIdx, daySubjectCount, 'strict');
                if (success) tracking.hoursPlaced[subj.name]++;
            }
        }
        this._logProgress('After Phase 2', sortedTheory, tracking);
        // PHASE 3: REMAINING (strict frequency)
        console.log("\n  \uD83D\uDCDD Phase 3: Remaining (with frequency limits)...");
        for (const subj of sortedTheory){
            const target = subj.hoursPerWeek || 0;
            let attempts = 0;
            const maxAttempts = 50;
            while(tracking.hoursPlaced[subj.name] < target && attempts < maxAttempts){
                const success = this._placeTheory(className, subj, tracking, null, daySubjectCount, 'strict');
                if (success) tracking.hoursPlaced[subj.name]++;
                else attempts++;
            }
        }
        this._logProgress('After Phase 3', sortedTheory, tracking);
        // PHASE 4: RELAXED (remove frequency limits)
        console.log("\n  \u26A1 Phase 4: Relaxed (no frequency limits)...");
        for (const subj of sortedTheory){
            const target = subj.hoursPerWeek || 0;
            let attempts = 0;
            const maxAttempts = 50;
            while(tracking.hoursPlaced[subj.name] < target && attempts < maxAttempts){
                const success = this._placeTheory(className, subj, tracking, null, daySubjectCount, 'relaxed');
                if (success) {
                    tracking.hoursPlaced[subj.name]++;
                    console.log(`    \u{26A1} ${subj.name}: ${tracking.hoursPlaced[subj.name]}/${target}`);
                } else attempts++;
            }
        }
        this._logProgress('After Phase 4', sortedTheory, tracking);
        // PHASE 5: FORCE (only hard constraints)
        console.log("\n  \uD83D\uDD25 Phase 5: Force placement...");
        for (const subj of sortedTheory){
            const target = subj.hoursPerWeek || 0;
            let attempts = 0;
            const maxAttempts = 100;
            while(tracking.hoursPlaced[subj.name] < target && attempts < maxAttempts){
                const success = this._forcePlaceTheory(className, subj, tracking, daySubjectCount);
                if (success) {
                    tracking.hoursPlaced[subj.name]++;
                    console.log(`    \u{1F525} ${subj.name}: FORCED ${tracking.hoursPlaced[subj.name]}/${target}`);
                } else attempts++;
            }
            // Final check
            if (tracking.hoursPlaced[subj.name] < target) console.error(`  \u{274C} FAILED: ${subj.name} only ${tracking.hoursPlaced[subj.name]}/${target}`);
        }
        const totalPlaced = this._countPlacedHours(className);
        console.log(`
  \u{2713} Total: ${totalPlaced}/${this.TOTAL_HOURS} hours`);
        if (totalPlaced < this.TOTAL_HOURS) console.error(`  \u{274C} WARNING: Missing ${this.TOTAL_HOURS - totalPlaced} hours!`);
        this._checkDayVariety(daySubjectCount);
        return totalPlaced === this.TOTAL_HOURS;
    }
    _logProgress(phase, subjects, tracking) {
        console.log(`
  \u{1F4CA} ${phase}:`);
        subjects.forEach((subj)=>{
            const target = subj.hoursPerWeek || 0;
            const placed = tracking.hoursPlaced[subj.name];
            const status = placed === target ? "\u2713" : "\u26A0\uFE0F";
            console.log(`    ${status} ${subj.name}: ${placed}/${target}`);
        });
    }
    _countPlacedHours(className) {
        const tt = this.classTimetables[className];
        let count = 0;
        for(let dayIdx = 0; dayIdx < 5; dayIdx++){
            for(let period = 0; period < this.PERIODS; period++)if (tt[dayIdx][period]) count++;
        }
        return count;
    }
    _checkDayVariety(daySubjectCount) {
        this.DAYS.forEach((day)=>{
            const count = daySubjectCount[day].size;
            if (count < 3) console.warn(`    \u{26A0}\u{FE0F} ${day}: Only ${count} different subjects`);
        });
    }
    _placeLabBlock(className, lab, labTracking, daySubjectCount) {
        const teacher = lab.teacher;
        const tt = this.classTimetables[className];
        const candidates = [];
        const labStartPositions = [
            0,
            1,
            2,
            3,
            4
        ];
        const shuffledPositions = this._shuffle([
            ...labStartPositions
        ]);
        for(let dayIdx = 0; dayIdx < 5; dayIdx++){
            const day = this.DAYS[dayIdx];
            let dayScore = 100;
            if (labTracking.lastDay[lab.name] !== undefined) {
                const gap = Math.abs(dayIdx - labTracking.lastDay[lab.name]);
                if (gap >= 2) dayScore += 50;
                else if (gap === 1) dayScore -= 20;
            }
            for (const startP of shuffledPositions){
                if (startP > this.PERIODS - 2) continue;
                if (tt[dayIdx][startP] || tt[dayIdx][startP + 1]) continue;
                const slot1 = `${day}-P${startP + 1}`;
                const slot2 = `${day}-P${startP + 2}`;
                if (this.teacherSlots[teacher]?.[slot1]) continue;
                if (this.teacherSlots[teacher]?.[slot2]) continue;
                let score = dayScore;
                if (labTracking.dayLabCount[day] === 0) score += 40;
                else if (labTracking.dayLabCount[day] === 1) score -= 20;
                const positionsUsed = this.labPositionsUsed[className] || [];
                const positionUseCount = positionsUsed.filter((p)=>p === startP).length;
                if (positionUseCount === 0) score += 30;
                else score -= 15 * positionUseCount;
                if (startP >= 1 && startP <= 3) score += 10;
                candidates.push({
                    dayIdx,
                    startP,
                    score,
                    day
                });
            }
        }
        if (candidates.length === 0) {
            console.error(`      \u{274C} No slots for ${lab.name}`);
            return false;
        }
        candidates.sort((a, b)=>b.score - a.score);
        const pick = candidates[0];
        tt[pick.dayIdx][pick.startP] = {
            subject: lab.name,
            teacher: teacher,
            type: lab.subjectType || 'lab',
            isLab: true
        };
        tt[pick.dayIdx][pick.startP + 1] = {
            subject: lab.name,
            teacher: teacher,
            type: lab.subjectType || 'lab',
            isLab: true,
            isLabContinuation: true
        };
        const slot1 = `${pick.day}-P${pick.startP + 1}`;
        const slot2 = `${pick.day}-P${pick.startP + 2}`;
        if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
        this.teacherSlots[teacher][slot1] = className;
        this.teacherSlots[teacher][slot2] = className;
        this.labPositionsUsed[className].push(pick.startP);
        labTracking.lastDay[lab.name] = pick.dayIdx;
        labTracking.dayLabCount[pick.day]++;
        daySubjectCount[pick.day].add(lab.name);
        console.log(`      \u{2713} ${lab.name}: ${pick.day} P${pick.startP + 1}-P${pick.startP + 2}`);
        return true;
    }
    _placeTheory(className, subj, tracking, targetDayIdx, daySubjectCount, mode) {
        const teacher = subj.teacher;
        const tt = this.classTimetables[className];
        const candidates = [];
        const daysToTry = targetDayIdx !== null ? [
            targetDayIdx
        ] : [
            0,
            1,
            2,
            3,
            4
        ];
        for (const dayIdx of daysToTry){
            const day = this.DAYS[dayIdx];
            for(let period = 0; period < this.PERIODS; period++){
                if (tt[dayIdx][period]) continue;
                const slotKey = `${day}-P${period + 1}`;
                if (this.teacherSlots[teacher]?.[slotKey]) continue;
                // Avoid same period as previous day
                if (dayIdx > 0) {
                    const prevPeriod = tracking.dayPeriodMap[subj.name]?.[dayIdx - 1];
                    if (prevPeriod === period) continue;
                }
                // Max 2 continuous
                if (this._wouldExceedContinuous(tt, dayIdx, period, subj.name, 2)) continue;
                // Strict mode only: Max 2 in same period per week
                if (mode === 'strict') {
                    if (tracking.periodWeeklyCount[subj.name][period] >= 2) continue;
                }
                let score = 100;
                if (!tracking.daysUsed[subj.name].has(dayIdx)) score += 40;
                const weeklyUse = tracking.periodWeeklyCount[subj.name][period];
                if (weeklyUse === 0) score += 30;
                else score -= 25 * weeklyUse;
                score -= tracking.periodGlobalUsage[period] * 5;
                if (!daySubjectCount[day].has(subj.name)) score += 20;
                if (dayIdx > 0) {
                    const prevPeriod = tracking.dayPeriodMap[subj.name]?.[dayIdx - 1];
                    if (prevPeriod !== undefined && prevPeriod !== period) score += 15;
                }
                if (period >= 1 && period <= 4) score += 10;
                candidates.push({
                    dayIdx,
                    period,
                    score,
                    day
                });
            }
        }
        if (candidates.length === 0) return false;
        candidates.sort((a, b)=>b.score - a.score);
        const pick = candidates[0];
        const slotKey = `${pick.day}-P${pick.period + 1}`;
        tt[pick.dayIdx][pick.period] = {
            subject: subj.name,
            teacher: teacher,
            type: subj.subjectType || 'core'
        };
        if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
        this.teacherSlots[teacher][slotKey] = className;
        tracking.daysUsed[subj.name].add(pick.dayIdx);
        tracking.dayPeriodMap[subj.name][pick.dayIdx] = pick.period;
        tracking.periodWeeklyCount[subj.name][pick.period]++;
        tracking.periodGlobalUsage[pick.period]++;
        daySubjectCount[pick.day].add(subj.name);
        return true;
    }
    _wouldExceedContinuous(tt, dayIdx, period, subjectName, max) {
        let count = 1;
        for(let p = period - 1; p >= 0; p--){
            if (tt[dayIdx][p]?.subject === subjectName) count++;
            else break;
        }
        for(let p = period + 1; p < this.PERIODS; p++){
            if (tt[dayIdx][p]?.subject === subjectName) count++;
            else break;
        }
        return count > max;
    }
    _forcePlaceTheory(className, subj, tracking, daySubjectCount) {
        const teacher = subj.teacher;
        const tt = this.classTimetables[className];
        // Try all possible slots
        for(let dayIdx = 0; dayIdx < 5; dayIdx++){
            const day = this.DAYS[dayIdx];
            for(let period = 0; period < this.PERIODS; period++){
                if (tt[dayIdx][period]) continue;
                const slotKey = `${day}-P${period + 1}`;
                if (this.teacherSlots[teacher]?.[slotKey]) continue;
                // Only check max 2 continuous (hard constraint)
                if (this._wouldExceedContinuous(tt, dayIdx, period, subj.name, 2)) continue;
                // PLACE IT
                tt[dayIdx][period] = {
                    subject: subj.name,
                    teacher: teacher,
                    type: subj.subjectType || 'core',
                    isForced: true
                };
                if (!this.teacherSlots[teacher]) this.teacherSlots[teacher] = {};
                this.teacherSlots[teacher][slotKey] = className;
                tracking.daysUsed[subj.name].add(dayIdx);
                tracking.dayPeriodMap[subj.name][dayIdx] = period;
                tracking.periodWeeklyCount[subj.name][period]++;
                tracking.periodGlobalUsage[period]++;
                daySubjectCount[day].add(subj.name);
                return true;
            }
        }
        return false;
    }
    _buildStaffTimetables() {
        this.staff.forEach((teacher)=>{
            if (!teacher?.name) return;
            this.staffTimetables[teacher.name] = this.DAYS.map(()=>Array(this.PERIODS).fill(null).map(()=>({
                        subject: 'FREE',
                        class: '-',
                        type: 'free'
                    })));
        });
        Object.keys(this.classTimetables).forEach((className)=>{
            const tt = this.classTimetables[className];
            this.DAYS.forEach((day, dayIdx)=>{
                tt[dayIdx].forEach((slot, period)=>{
                    if (slot?.teacher && slot.teacher !== '-' && this.staffTimetables[slot.teacher]) this.staffTimetables[slot.teacher][dayIdx][period] = {
                        subject: slot.subject,
                        class: className,
                        type: slot.type
                    };
                });
            });
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["ifaHC"], null, "parcelRequireb79f", {})

//# sourceMappingURL=AdminDashboard.c1fc38ab.js.map
