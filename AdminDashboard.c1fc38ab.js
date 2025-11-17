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
var _reactDefault = parcelHelpers.interopDefault(_react);
var _animatedBackground = require("./AnimatedBackground");
var _animatedBackgroundDefault = parcelHelpers.interopDefault(_animatedBackground);
var _toast = require("./Toast");
var _hoursTracker = require("./HoursTracker");
var _hoursTrackerDefault = parcelHelpers.interopDefault(_hoursTracker);
var _timetableGrid = require("./TimetableGrid");
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
    const [loading, setLoading] = (0, _react.useState)(false);
    // Form Models
    const [newClass, setNewClass] = (0, _react.useState)({
        name: ''
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
    const showToast = (message, type)=>{
        setToasts((prev)=>[
                ...prev,
                {
                    message,
                    type
                }
            ]);
    };
    const removeToast = (index)=>{
        setToasts((prev)=>prev.filter((_, i)=>i !== index));
    };
    // ------------------- LOAD DATA FROM FIREBASE -------------------
    (0, _react.useEffect)(()=>{
        const fetchAll = async ()=>{
            setLoading(true);
            try {
                const cls = await (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'classes'));
                const st = await (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'staff'));
                const sb = await (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'subjects'));
                const tt = await (0, _firestore.getDocs)((0, _firestore.collection)((0, _firebase.db), 'timetable'));
                setClasses(cls.docs.map((d)=>({
                        id: d.id,
                        ...d.data()
                    })));
                setStaff(st.docs.map((d)=>({
                        id: d.id,
                        ...d.data()
                    })));
                setSubjects(sb.docs.map((d)=>({
                        id: d.id,
                        ...d.data()
                    })));
                if (!tt.empty) setTimetable(tt.docs[0].data());
                showToast("Data loaded successfully", "success");
            } catch (error) {
                showToast("\u26A0 Could not load cloud data", "error");
                console.error(error);
            }
            setLoading(false);
        };
        fetchAll();
    }, []);
    // ------------------- CLASS CRUD -------------------
    const addClass = async ()=>{
        if (!newClass.name) return showToast("Enter class name", "error");
        if (classes.find((c)=>c.name === newClass.name)) return showToast("Class already exists", "error");
        try {
            const docRef = await (0, _firestore.addDoc)((0, _firestore.collection)((0, _firebase.db), 'classes'), {
                name: newClass.name
            });
            setClasses([
                ...classes,
                {
                    id: docRef.id,
                    name: newClass.name
                }
            ]);
            setNewClass({
                name: ''
            });
            showToast("Class added successfully!", "success");
        } catch (error) {
            showToast("Failed to add class", "error");
        }
    };
    const deleteClass = async (id)=>{
        if (!window.confirm("Delete this class?")) return;
        try {
            await (0, _firestore.deleteDoc)((0, _firestore.doc)((0, _firebase.db), 'classes', id));
            setClasses(classes.filter((c)=>c.id !== id));
            showToast("Class deleted", "success");
        } catch (error) {
            showToast("Failed to delete class", "error");
        }
    };
    // ------------------- STAFF CRUD -------------------
    const addOrUpdateStaff = async ()=>{
        if (!newStaff.name || !newStaff.username) return showToast("Fill all required fields", "error");
        try {
            // UPDATE MODE
            if (newStaff.id) {
                const { password, ...updateData } = newStaff;
                await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'staff', newStaff.id), updateData);
                setStaff(staff.map((s)=>s.id === newStaff.id ? {
                        ...s,
                        ...updateData
                    } : s));
                resetStaffForm();
                return showToast("Staff updated successfully!", "success");
            }
            // CREATE → Firebase Auth
            if (!newStaff.password) return showToast("Password required for new staff", "error");
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
            showToast("Staff added successfully!", "success");
        } catch (error) {
            showToast("\u26A0 Staff operation failed: " + error.message, "error");
        }
    };
    const editStaff = (staffMember)=>{
        setNewStaff({
            ...staffMember,
            password: ''
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
            showToast("Staff deleted", "success");
        } catch (error) {
            showToast("Failed to delete staff", "error");
        }
    };
    // ------------------- SUBJECT CRUD -------------------
    const addOrUpdateSubject = async ()=>{
        if (!newSubject.className || !newSubject.name || !newSubject.teacher) return showToast("Fill all required fields", "error");
        try {
            if (newSubject.id) {
                await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'subjects', newSubject.id), newSubject);
                setSubjects(subjects.map((s)=>s.id === newSubject.id ? newSubject : s));
                resetSubjectForm();
                return showToast("Subject updated successfully!", "success");
            }
            const docRef = await (0, _firestore.addDoc)((0, _firestore.collection)((0, _firebase.db), 'subjects'), newSubject);
            setSubjects([
                ...subjects,
                {
                    id: docRef.id,
                    ...newSubject
                }
            ]);
            resetSubjectForm();
            showToast("Subject added successfully!", "success");
        } catch (error) {
            showToast("Subject operation failed", "error");
        }
    };
    const editSubject = (subject)=>{
        setNewSubject(subject);
        window.scrollTo({
            top: document.getElementById('subject-section').offsetTop - 100,
            behavior: 'smooth'
        });
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
            showToast("Subject deleted", "success");
        } catch (error) {
            showToast("Failed to delete subject", "error");
        }
    };
    // ------------------- TIMETABLE GENERATION -------------------
    const generateTimetable = async ()=>{
        setLoading(true);
        try {
            const generator = new (0, _timetableGenerator.TimetableGenerator)(classes, teachers, subjects);
            const validation = generator.validate();
            if (!validation.valid) {
                showToast('Validation errors: ' + validation.errors.join('; '), 'error');
                setLoading(false);
                return;
            }
            const result = generator.generate();
            if (result.success) {
                const timetableData = {
                    classTimetables: result.classTimetables,
                    staffTimetables: result.staffTimetables
                };
                // Save to Firebase
                const ttRef = (0, _firestore.collection)((0, _firebase.db), 'timetable');
                const existing = await (0, _firestore.getDocs)(ttRef);
                if (!existing.empty) await (0, _firestore.updateDoc)((0, _firestore.doc)((0, _firebase.db), 'timetable', existing.docs[0].id), timetableData);
                else await (0, _firestore.addDoc)(ttRef, timetableData);
                setTimetable(timetableData);
                showToast('Timetable generated successfully!', 'success');
                setTimeout(()=>{
                    document.getElementById('view-timetables')?.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 1000);
            } else showToast('Generation failed: ' + result.error, 'error');
        } catch (error) {
            showToast('Error: ' + error.message, 'error');
        }
        setLoading(false);
    };
    if (loading) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _animatedBackgroundDefault.default), {}, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 292,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white',
                    fontSize: '24px'
                },
                children: "Loading..."
            }, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 293,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true);
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _animatedBackgroundDefault.default), {}, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 309,
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
                            lineNumber: 313,
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
                                    lineNumber: 315,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                    className: "btn btn-danger btn-sm",
                                    onClick: onLogout,
                                    children: "Logout"
                                }, void 0, false, {
                                    fileName: "src/components/AdminDashboard.jsx",
                                    lineNumber: 316,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "src/components/AdminDashboard.jsx",
                            lineNumber: 314,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "src/components/AdminDashboard.jsx",
                    lineNumber: 312,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 311,
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
                                        lineNumber: 328,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Classes"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 329,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 327,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Add New Class"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 333,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                children: "Class Name (e.g., CS3A, EE2B)"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 335,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
                                                type: "text",
                                                value: newClass.name,
                                                onChange: (e)=>setNewClass({
                                                        name: e.target.value.toUpperCase()
                                                    }),
                                                placeholder: "Enter class name",
                                                style: {
                                                    padding: '14px',
                                                    fontSize: '15px'
                                                }
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 336,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 334,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        className: "btn btn-primary",
                                        onClick: addClass,
                                        children: "\u2795 Add Class"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 344,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 332,
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
                                        lineNumber: 350,
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
                                        lineNumber: 352,
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
                                                                        lineNumber: 361,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Class Name"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 362,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Subjects"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 363,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Total Hours"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 364,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Actions"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 365,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 360,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 359,
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
                                                                            lineNumber: 375,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("strong", {
                                                                                children: cls.name
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 376,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 376,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: classSubjects.length
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 377,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                style: {
                                                                                    padding: '4px 12px',
                                                                                    borderRadius: '12px',
                                                                                    fontSize: '12px',
                                                                                    fontWeight: 600,
                                                                                    background: totalHours === 30 ? '#10b981' : '#ef4444',
                                                                                    color: 'white'
                                                                                },
                                                                                children: [
                                                                                    totalHours,
                                                                                    "/30h"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 379,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 378,
                                                                            columnNumber: 57
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                className: "btn btn-danger btn-sm",
                                                                                onClick: ()=>deleteClass(cls.id),
                                                                                children: "\uD83D\uDDD1\uFE0F Delete"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 391,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 390,
                                                                            columnNumber: 57
                                                                        }, this)
                                                                    ]
                                                                }, cls.id, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 374,
                                                                    columnNumber: 53
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 368,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 358,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 357,
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
                                                                        lineNumber: 413,
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
                                                                        lineNumber: 414,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 412,
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
                                                                                children: "Subjects:"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 418,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: classSubjects.length
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 419,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 417,
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
                                                                                lineNumber: 422,
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
                                                                                lineNumber: 423,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 421,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 416,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                className: "mobile-card-actions",
                                                                children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                    className: "btn btn-danger btn-sm",
                                                                    onClick: ()=>deleteClass(cls.id),
                                                                    children: "Delete"
                                                                }, void 0, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 427,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 426,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, cls.id, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 411,
                                                        columnNumber: 45
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 405,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 349,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 326,
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
                                        lineNumber: 446,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Staff"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 447,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 445,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: newStaff.id ? "\u270F\uFE0F Edit Staff" : "\u2795 Add New Staff"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 451,
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
                                                        lineNumber: 454,
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
                                                        lineNumber: 455,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 453,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Username *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 463,
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
                                                            background: '#f1f5f9'
                                                        } : {}
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 464,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 462,
                                                columnNumber: 29
                                            }, this),
                                            !newStaff.id && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Password *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 475,
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
                                                        lineNumber: 476,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 474,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Free Period Mode"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 485,
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
                                                                lineNumber: 490,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "manual",
                                                                children: "Manual"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 491,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 486,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 484,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 452,
                                        columnNumber: 25
                                    }, this),
                                    newStaff.freePeriodMode === 'manual' && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                children: "Free Periods per Week"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 498,
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
                                                lineNumber: 499,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 497,
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
                                                onClick: addOrUpdateStaff,
                                                children: newStaff.id ? "\uD83D\uDCBE Save Changes" : "\u2795 Add Staff"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 513,
                                                columnNumber: 29
                                            }, this),
                                            newStaff.id && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-danger",
                                                onClick: resetStaffForm,
                                                children: "\u274C Cancel"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 517,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 512,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 450,
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
                                        lineNumber: 525,
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
                                        lineNumber: 527,
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
                                                                        lineNumber: 536,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Name"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 537,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Username"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 538,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Free Period Mode"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 539,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                        children: "Actions"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 540,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 535,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 534,
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
                                                                                lineNumber: 546,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 546,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("strong", {
                                                                                children: s.name
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 547,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 547,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: s.username
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 548,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: s.freePeriodMode === 'manual' ? `Manual (${s.manualFreePeriods} free)` : 'Auto'
                                                                        }, void 0, false, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 549,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                    className: "btn btn-primary btn-sm",
                                                                                    onClick: ()=>editStaff(s),
                                                                                    style: {
                                                                                        marginRight: '5px'
                                                                                    },
                                                                                    children: "\u270F\uFE0F Edit"
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 555,
                                                                                    columnNumber: 57
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                    className: "btn btn-danger btn-sm",
                                                                                    onClick: ()=>deleteStaff(s.id),
                                                                                    children: "\uD83D\uDDD1\uFE0F Delete"
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 562,
                                                                                    columnNumber: 57
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 554,
                                                                            columnNumber: 53
                                                                        }, this)
                                                                    ]
                                                                }, s.id, true, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 545,
                                                                    columnNumber: 49
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 543,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 533,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 532,
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
                                                                        lineNumber: 579,
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
                                                                        lineNumber: 580,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 578,
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
                                                                                lineNumber: 584,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: s.username
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 585,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 583,
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
                                                                                lineNumber: 588,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-value",
                                                                                children: s.freePeriodMode === 'manual' ? `Manual (${s.manualFreePeriods} free)` : 'Auto'
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 589,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 587,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 582,
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
                                                                        lineNumber: 597,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                        className: "btn btn-danger btn-sm",
                                                                        onClick: ()=>deleteStaff(s.id),
                                                                        children: "\uD83D\uDDD1\uFE0F Delete"
                                                                    }, void 0, false, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 603,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 596,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, s.id, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 577,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 575,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 524,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 444,
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
                                        lineNumber: 621,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Manage Subjects"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 622,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 620,
                                columnNumber: 21
                            }, this),
                            newSubject.className && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _hoursTrackerDefault.default), {
                                className: newSubject.className,
                                subjects: subjects
                            }, void 0, false, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 626,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: newSubject.id ? "\u270F\uFE0F Edit Subject" : "\u2795 Add New Subject"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 630,
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
                                                        lineNumber: 633,
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
                                                                lineNumber: 638,
                                                                columnNumber: 37
                                                            }, this),
                                                            classes.map((cls)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                    value: cls.name,
                                                                    children: cls.name
                                                                }, cls.id, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 640,
                                                                    columnNumber: 41
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 634,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 632,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Subject Name *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 645,
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
                                                        lineNumber: 646,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 644,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Subject Type *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 654,
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
                                                                lineNumber: 659,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Elective",
                                                                children: "Elective"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 660,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Lab",
                                                                children: "Lab"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 661,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                value: "Other",
                                                                children: "Other"
                                                            }, void 0, false, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 662,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 655,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 653,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Hours per Week *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 666,
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
                                                        lineNumber: 667,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 665,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                className: "form-group",
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                        children: "Teacher *"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 679,
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
                                                                lineNumber: 684,
                                                                columnNumber: 37
                                                            }, this),
                                                            teachers.map((t)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                                    value: t.name,
                                                                    children: t.name
                                                                }, t.id, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 686,
                                                                    columnNumber: 41
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 680,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 678,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 631,
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
                                                lineNumber: 693,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                htmlFor: "continuous",
                                                style: {
                                                    marginBottom: 0
                                                },
                                                children: "Continuous Lab Block"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 699,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 692,
                                        columnNumber: 25
                                    }, this),
                                    newSubject.isContinuous && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        className: "form-group",
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                                                children: "Block Size"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 706,
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
                                                        lineNumber: 714,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("option", {
                                                        value: 3,
                                                        children: "3 Periods"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 715,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 707,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 705,
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
                                                onClick: addOrUpdateSubject,
                                                children: newSubject.id ? "\uD83D\uDCBE Save Changes" : "\u2795 Add Subject"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 721,
                                                columnNumber: 29
                                            }, this),
                                            newSubject.id && /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                className: "btn btn-danger",
                                                onClick: resetSubjectForm,
                                                children: "\u274C Cancel"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 725,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 720,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 629,
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
                                        lineNumber: 733,
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
                                        lineNumber: 735,
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
                                                            color: '#1e293b'
                                                        },
                                                        children: [
                                                            "Class: ",
                                                            cls.name,
                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                style: {
                                                                    padding: '4px 12px',
                                                                    borderRadius: '12px',
                                                                    fontSize: '12px',
                                                                    fontWeight: 600,
                                                                    background: totalHours === 30 ? '#10b981' : '#ef4444',
                                                                    color: 'white'
                                                                },
                                                                children: [
                                                                    totalHours,
                                                                    "/30 hours"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 756,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 748,
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
                                                                                lineNumber: 772,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Type"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 773,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Hours"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 774,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Teacher"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 775,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Lab"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 776,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("th", {
                                                                                children: "Actions"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 777,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 771,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 770,
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
                                                                                        lineNumber: 783,
                                                                                        columnNumber: 69
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 783,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.subjectType
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 784,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: [
                                                                                        sub.hoursPerWeek,
                                                                                        "h"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 785,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.teacher
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 786,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: sub.isContinuous ? `Yes (${sub.blockSize}p)` : 'No'
                                                                                }, void 0, false, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 787,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("td", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                            className: "btn btn-primary btn-sm",
                                                                                            onClick: ()=>editSubject(sub),
                                                                                            style: {
                                                                                                marginRight: '5px'
                                                                                            },
                                                                                            children: "\u270F\uFE0F Edit"
                                                                                        }, void 0, false, {
                                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                                            lineNumber: 791,
                                                                                            columnNumber: 69
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                            className: "btn btn-danger btn-sm",
                                                                                            onClick: ()=>deleteSubject(sub.id),
                                                                                            children: "\uD83D\uDDD1\uFE0F Delete"
                                                                                        }, void 0, false, {
                                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                                            lineNumber: 798,
                                                                                            columnNumber: 69
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                                    lineNumber: 790,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, sub.id, true, {
                                                                            fileName: "src/components/AdminDashboard.jsx",
                                                                            lineNumber: 782,
                                                                            columnNumber: 61
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "src/components/AdminDashboard.jsx",
                                                                    lineNumber: 780,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "src/components/AdminDashboard.jsx",
                                                            lineNumber: 769,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 768,
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
                                                                                lineNumber: 815,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                className: "mobile-card-badge",
                                                                                children: sub.subjectType
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 816,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 814,
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
                                                                                        lineNumber: 820,
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
                                                                                        lineNumber: 821,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 819,
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
                                                                                        lineNumber: 824,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-value",
                                                                                        children: sub.teacher
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 825,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 823,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                                                className: "mobile-card-row",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-label",
                                                                                        children: "Lab:"
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 828,
                                                                                        columnNumber: 65
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                                                                        className: "mobile-card-value",
                                                                                        children: sub.isContinuous ? `Yes (${sub.blockSize}p)` : 'No'
                                                                                    }, void 0, false, {
                                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                                        lineNumber: 829,
                                                                                        columnNumber: 65
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 827,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 818,
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
                                                                                lineNumber: 835,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                                                className: "btn btn-danger btn-sm",
                                                                                onClick: ()=>deleteSubject(sub.id),
                                                                                children: "\uD83D\uDDD1\uFE0F Delete"
                                                                            }, void 0, false, {
                                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                                lineNumber: 841,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "src/components/AdminDashboard.jsx",
                                                                        lineNumber: 834,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, sub.id, true, {
                                                                fileName: "src/components/AdminDashboard.jsx",
                                                                lineNumber: 813,
                                                                columnNumber: 53
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 811,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, cls.id, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 747,
                                                columnNumber: 41
                                            }, this);
                                        })
                                    }, void 0, false)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 732,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 619,
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
                                        lineNumber: 862,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Generate Timetable"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 863,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 861,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Ready to Generate"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 867,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        style: {
                                            marginBottom: '25px',
                                            padding: '20px',
                                            background: '#f8fafc',
                                            borderRadius: '12px',
                                            color: '#475569'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("p", {
                                                style: {
                                                    marginBottom: '15px',
                                                    fontSize: '15px',
                                                    lineHeight: '1.6'
                                                },
                                                children: "The smart algorithm will create an optimized timetable ensuring:"
                                            }, void 0, false, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 875,
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
                                                        lineNumber: 879,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
                                                        children: "\u2705 High-hour subjects (\u22655h) appear daily"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 880,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
                                                        children: "\u2705 Labs in continuous blocks"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 881,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
                                                        children: "\u2705 No teacher conflicts"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 882,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("li", {
                                                        children: "\u2705 Balanced teacher workload"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 883,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 878,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 868,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                        style: {
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                            gap: '15px',
                                            marginBottom: '25px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                style: {
                                                    padding: '15px',
                                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                    borderRadius: '12px',
                                                    color: 'white',
                                                    textAlign: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: '13px',
                                                            opacity: 0.9
                                                        },
                                                        children: "Classes"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 900,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: '2em',
                                                            fontWeight: 'bold'
                                                        },
                                                        children: classes.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 901,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 893,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                style: {
                                                    padding: '15px',
                                                    background: 'linear-gradient(135deg, #10b981, #059669)',
                                                    borderRadius: '12px',
                                                    color: 'white',
                                                    textAlign: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: '13px',
                                                            opacity: 0.9
                                                        },
                                                        children: "Teachers"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 910,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: '2em',
                                                            fontWeight: 'bold'
                                                        },
                                                        children: teachers.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 911,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 903,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                style: {
                                                    padding: '15px',
                                                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                                    borderRadius: '12px',
                                                    color: 'white',
                                                    textAlign: 'center'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: '13px',
                                                            opacity: 0.9
                                                        },
                                                        children: "Subjects"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 920,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                        style: {
                                                            fontSize: '2em',
                                                            fontWeight: 'bold'
                                                        },
                                                        children: subjects.length
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 921,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "src/components/AdminDashboard.jsx",
                                                lineNumber: 913,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 887,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                        className: "btn btn-success",
                                        onClick: generateTimetable,
                                        disabled: loading,
                                        style: {
                                            width: '100%',
                                            fontSize: '18px',
                                            padding: '18px 40px'
                                        },
                                        children: loading ? "\u23F3 Generating..." : "\u26A1 Generate Timetable"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 925,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 866,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 860,
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
                                        lineNumber: 940,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h2", {
                                        className: "section-title",
                                        children: "Generated Timetables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 941,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 939,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Class-wise Timetables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 945,
                                        columnNumber: 29
                                    }, this),
                                    classes.map((cls)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            style: {
                                                marginBottom: '40px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h4", {
                                                    style: {
                                                        marginBottom: '15px',
                                                        fontSize: '1.2em',
                                                        color: '#1e293b'
                                                    },
                                                    children: [
                                                        "Class: ",
                                                        cls.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 948,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _timetableGridDefault.default), {
                                                    timetable: timetable.classTimetables,
                                                    className: cls.name
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 955,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                    style: {
                                                        marginTop: '15px',
                                                        display: 'flex',
                                                        gap: '10px'
                                                    },
                                                    className: "no-print",
                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                        className: "btn btn-primary btn-sm",
                                                        onClick: ()=>(0, _pdfUtils.exportToPDF)('timetable-export', `${cls.name}_Timetable.pdf`),
                                                        children: "\uD83D\uDCC4 Download PDF"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 963,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 959,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, cls.id, true, {
                                            fileName: "src/components/AdminDashboard.jsx",
                                            lineNumber: 947,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 944,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h3", {
                                        children: "Staff-wise Timetables"
                                    }, void 0, false, {
                                        fileName: "src/components/AdminDashboard.jsx",
                                        lineNumber: 978,
                                        columnNumber: 29
                                    }, this),
                                    teachers.map((teacher)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            style: {
                                                marginBottom: '40px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("h4", {
                                                    style: {
                                                        marginBottom: '15px',
                                                        fontSize: '1.2em',
                                                        color: '#1e293b'
                                                    },
                                                    children: [
                                                        "Teacher: ",
                                                        teacher.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 981,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _staffTimetableGridDefault.default), {
                                                    timetable: timetable.staffTimetables,
                                                    staffName: teacher.name
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 988,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                                    style: {
                                                        marginTop: '15px',
                                                        display: 'flex',
                                                        gap: '10px'
                                                    },
                                                    className: "no-print",
                                                    children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                                                        className: "btn btn-primary btn-sm",
                                                        onClick: ()=>(0, _pdfUtils.exportToPDF)('staff-timetable-export', `${teacher.name}_Timetable.pdf`),
                                                        children: "\uD83D\uDCC4 Download PDF"
                                                    }, void 0, false, {
                                                        fileName: "src/components/AdminDashboard.jsx",
                                                        lineNumber: 996,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "src/components/AdminDashboard.jsx",
                                                    lineNumber: 992,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, teacher.id, true, {
                                            fileName: "src/components/AdminDashboard.jsx",
                                            lineNumber: 980,
                                            columnNumber: 33
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "src/components/AdminDashboard.jsx",
                                lineNumber: 977,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "src/components/AdminDashboard.jsx",
                        lineNumber: 938,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 323,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _toast.ToastContainer), {
                toasts: toasts,
                removeToast: removeToast
            }, void 0, false, {
                fileName: "src/components/AdminDashboard.jsx",
                lineNumber: 1014,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(AdminDashboard, "dIdjhUnhQoRaD8nAOrbIxXA63vM=");
_c = AdminDashboard;
var _c;
$RefreshReg$(_c, "AdminDashboard");

  $parcel$ReactRefreshHelpers$56a5.postlude(module);
} finally {
  globalThis.$RefreshReg$ = prevRefreshReg;
  globalThis.$RefreshSig$ = prevRefreshSig;
}
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","./AnimatedBackground":"8BTPX","./Toast":"jptcB","./TimetableGrid":"5VElg","./StaffTimetableGrid":"fc4Yr","../utils/pdfUtils":"jSko5","firebase/auth":"4ZBbi","../utils/firebase":"5V7se","firebase/firestore":"3RBs1","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi","../utils/timetableGenerator":"fTr1F","./HoursTracker":"k2NcG"}],"jptcB":[function(require,module,exports,__globalThis) {
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
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"5VElg":[function(require,module,exports,__globalThis) {
var $parcel$ReactRefreshHelpers$583d = require("@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js");
$parcel$ReactRefreshHelpers$583d.init();
var prevRefreshReg = globalThis.$RefreshReg$;
var prevRefreshSig = globalThis.$RefreshSig$;
$parcel$ReactRefreshHelpers$583d.prelude(module);

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
        children: "No timetable generated yet"
    }, void 0, false, {
        fileName: "src/components/TimetableGrid.jsx",
        lineNumber: 8,
        columnNumber: 13
    }, this);
    const grid = timetable[className];
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        id: "timetable-export",
        className: "timetable-grid",
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "timetable-header",
                children: "Day/Period"
            }, void 0, false, {
                fileName: "src/components/TimetableGrid.jsx",
                lineNumber: 18,
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
                    fileName: "src/components/TimetableGrid.jsx",
                    lineNumber: 20,
                    columnNumber: 17
                }, this)),
            DAYS.map((day, dayIndex)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
                    children: [
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: "timetable-day",
                            children: day
                        }, void 0, false, {
                            fileName: "src/components/TimetableGrid.jsx",
                            lineNumber: 25,
                            columnNumber: 21
                        }, this),
                        grid[dayIndex].map((slot, periodIndex)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                className: `timetable-cell subject-${slot ? slot.type.toLowerCase() : 'other'}`,
                                children: slot ? /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _jsxDevRuntime.Fragment), {
                                    children: [
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "subject-name",
                                            children: slot.subject
                                        }, void 0, false, {
                                            fileName: "src/components/TimetableGrid.jsx",
                                            lineNumber: 33,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "teacher-name",
                                            children: slot.teacher
                                        }, void 0, false, {
                                            fileName: "src/components/TimetableGrid.jsx",
                                            lineNumber: 34,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                    children: "-"
                                }, void 0, false, {
                                    fileName: "src/components/TimetableGrid.jsx",
                                    lineNumber: 37,
                                    columnNumber: 33
                                }, this)
                            }, periodIndex, false, {
                                fileName: "src/components/TimetableGrid.jsx",
                                lineNumber: 27,
                                columnNumber: 25
                            }, this))
                    ]
                }, day, true, {
                    fileName: "src/components/TimetableGrid.jsx",
                    lineNumber: 24,
                    columnNumber: 17
                }, this))
        ]
    }, void 0, true, {
        fileName: "src/components/TimetableGrid.jsx",
        lineNumber: 17,
        columnNumber: 9
    }, this);
}
_c = TimetableGrid;
var _c;
$RefreshReg$(_c, "TimetableGrid");

  $parcel$ReactRefreshHelpers$583d.postlude(module);
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
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
        id: "staff-timetable-export",
        className: "timetable-grid",
        children: [
            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                className: "timetable-header",
                children: "Day/Period"
            }, void 0, false, {
                fileName: "src/components/StaffTimetableGrid.jsx",
                lineNumber: 18,
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
                    lineNumber: 20,
                    columnNumber: 17
                }, this)),
            DAYS.map((day, dayIndex)=>/*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _reactDefault.default).Fragment, {
                    children: [
                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                            className: "timetable-day",
                            children: day
                        }, void 0, false, {
                            fileName: "src/components/StaffTimetableGrid.jsx",
                            lineNumber: 25,
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
                                            lineNumber: 33,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                                            className: "teacher-name",
                                            children: slot.class
                                        }, void 0, false, {
                                            fileName: "src/components/StaffTimetableGrid.jsx",
                                            lineNumber: 34,
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
                                    lineNumber: 37,
                                    columnNumber: 33
                                }, this)
                            }, periodIndex, false, {
                                fileName: "src/components/StaffTimetableGrid.jsx",
                                lineNumber: 27,
                                columnNumber: 25
                            }, this))
                    ]
                }, day, true, {
                    fileName: "src/components/StaffTimetableGrid.jsx",
                    lineNumber: 24,
                    columnNumber: 17
                }, this))
        ]
    }, void 0, true, {
        fileName: "src/components/StaffTimetableGrid.jsx",
        lineNumber: 17,
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
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}],"fTr1F":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TimetableGenerator", ()=>TimetableGenerator);
class TimetableGenerator {
    constructor(classes, staff, subjects){
        this.classes = classes;
        this.staff = staff;
        this.subjects = subjects;
        this.classTimetables = {};
        this.staffTimetables = {};
        this.teacherBusySlots = {};
        this.teacherWeeklyCount = {};
        this.teacherDailyCount = {};
        this.teacherConsecutiveCount = {};
        this.DAYS = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
        ];
        this.PERIODS = 6;
        this.MAX_PERIODS_PER_DAY = 30; // 5 days × 6 periods
        this.MAX_SAME_SUBJECT_PER_DAY = 2;
        this.MAX_CONSECUTIVE_PERIODS = 6;
    }
    /**
     * ═══════════════════════════════════════════════════════════════════════
     * VALIDATION (Rule A.1, A.2, F)
     * ═══════════════════════════════════════════════════════════════════════
     */ validate() {
        const errors = [];
        // Basic checks
        if (this.classes.length === 0) errors.push('No classes added');
        if (this.staff.filter((s)=>s.role === 'staff').length === 0) errors.push('No staff added');
        if (this.subjects.length === 0) errors.push('No subjects added');
        if (errors.length > 0) return {
            valid: false,
            errors
        };
        // Rule A.1: Total hours must match capacity (5 days × 6 periods = 30)
        const classHours = {};
        this.subjects.forEach((subject)=>{
            classHours[subject.className] = (classHours[subject.className] || 0) + subject.hoursPerWeek;
        });
        this.classes.forEach((cls)=>{
            const hours = classHours[cls.name] || 0;
            if (hours !== this.MAX_PERIODS_PER_DAY) errors.push(`Class ${cls.name}: Has ${hours} hours, needs exactly ${this.MAX_PERIODS_PER_DAY} ` + `(Rule A.1: Total hours must match capacity)`);
        });
        // Validate lab block sizes
        this.subjects.forEach((subject)=>{
            if (subject.isContinuous) {
                if (subject.hoursPerWeek % subject.blockSize !== 0) errors.push(`Subject ${subject.name}: ${subject.hoursPerWeek} hours cannot be evenly divided ` + `into ${subject.blockSize}-period blocks`);
            }
        });
        return {
            valid: errors.length === 0,
            errors
        };
    }
    /**
     * ═══════════════════════════════════════════════════════════════════════
     * MAIN GENERATION (Rule E)
     * ═══════════════════════════════════════════════════════════════════════
     */ generate() {
        this._initialize();
        for (const cls of this.classes){
            if (!this._generateClassTimetable(cls.name)) return {
                success: false,
                error: `Failed to generate timetable for ${cls.name}`
            };
        }
        this._generateStaffTimetables();
        // Final validation
        const validation = this._validateGenerated();
        if (!validation.valid) console.warn('Generated timetable has warnings:', validation.warnings);
        return {
            success: true,
            classTimetables: this.classTimetables,
            staffTimetables: this.staffTimetables,
            warnings: validation.warnings || []
        };
    }
    _initialize() {
        // Initialize class timetables (Rule A.2: No free periods - will be filled)
        this.classes.forEach((cls)=>{
            this.classTimetables[cls.name] = this.DAYS.map(()=>Array(this.PERIODS).fill(null));
        });
        // Initialize teacher tracking (Rule B)
        this.staff.filter((s)=>s.role === 'staff').forEach((teacher)=>{
            this.teacherBusySlots[teacher.name] = {};
            this.teacherWeeklyCount[teacher.name] = 0;
            this.teacherDailyCount[teacher.name] = this.DAYS.reduce((acc, day)=>{
                acc[day] = 0;
                return acc;
            }, {});
            this.teacherConsecutiveCount[teacher.name] = {};
        });
    }
    /**
     * ═══════════════════════════════════════════════════════════════════════
     * PRIORITY ORDER (Rule E)
     * ═══════════════════════════════════════════════════════════════════════
     */ _generateClassTimetable(className) {
        const classSubjects = this.subjects.filter((s)=>s.className === className);
        classSubjects.forEach((s)=>s.placedHours = 0);
        // STEP 1: Allocate labs (Rule D, E.1)
        const labs = classSubjects.filter((s)=>s.isContinuous);
        labs.sort((a, b)=>b.hoursPerWeek - a.hoursPerWeek);
        for (const lab of labs)if (!this._placeLab(className, lab)) {
            console.error(`Step 1 failed: Cannot place lab ${lab.name}`);
            return false;
        }
        // STEP 2: Allocate high-hour regular subjects (Rule C.1, E.2)
        const highHourSubjects = classSubjects.filter((s)=>!s.isContinuous && s.hoursPerWeek >= 5);
        highHourSubjects.sort((a, b)=>b.hoursPerWeek - a.hoursPerWeek);
        for (const subject of highHourSubjects)if (!this._placeHighHourSubject(className, subject)) {
            console.error(`Step 2 failed: Cannot place high-hour subject ${subject.name}`);
            return false;
        }
        // STEP 3: Allocate low-hour subjects (Rule C.2, E.3)
        const lowHourSubjects = classSubjects.filter((s)=>!s.isContinuous && s.hoursPerWeek < 5);
        lowHourSubjects.sort((a, b)=>b.hoursPerWeek - a.hoursPerWeek);
        for (const subject of lowHourSubjects)if (!this._placeLowHourSubject(className, subject)) {
            console.error(`Step 3 failed: Cannot place low-hour subject ${subject.name}`);
            return false;
        }
        // STEP 4: Check teacher conflicts (done during placement via _canPlaceAt)
        // STEP 5: Randomization (done via _shuffle in slot selection)
        return true;
    }
    /**
     * ═══════════════════════════════════════════════════════════════════════
     * STEP 1: PLACE LABS (Rule D - Continuous blocks, can skip days)
     * ═══════════════════════════════════════════════════════════════════════
     */ _placeLab(className, subject) {
        const blocksNeeded = subject.hoursPerWeek / subject.blockSize;
        let blocksPlaced = 0;
        // Generate all possible continuous block positions
        const possibleSlots = [];
        this.DAYS.forEach((day)=>{
            for(let start = 0; start <= this.PERIODS - subject.blockSize; start++){
                // Prefer not starting at first period (70% probability)
                if (start === 0 && Math.random() < 0.7) continue;
                possibleSlots.push({
                    day,
                    start
                });
            }
        });
        // Rule E.5: Randomize within constraints
        this._shuffle(possibleSlots);
        for (const { day, start } of possibleSlots){
            if (blocksPlaced >= blocksNeeded) break;
            // Check if can place entire block
            let canPlace = true;
            for(let i = 0; i < subject.blockSize; i++){
                const period = start + i;
                const dayIndex = this.DAYS.indexOf(day);
                // Rule A.3: No subject overlap
                if (this.classTimetables[className][dayIndex][period]) {
                    canPlace = false;
                    break;
                }
                // Rule B.1: No teacher clash
                const slotKey = `${day}-P${period + 1}`;
                if (this.teacherBusySlots[subject.teacher]?.[slotKey]) {
                    canPlace = false;
                    break;
                }
                // Rule B.2: Check teacher limits
                if (!this._checkTeacherLimit(subject.teacher)) {
                    canPlace = false;
                    break;
                }
                // Rule B.4: Avoid too many consecutive periods
                if (this.teacherDailyCount[subject.teacher][day] >= this.MAX_CONSECUTIVE_PERIODS) {
                    canPlace = false;
                    break;
                }
            }
            if (canPlace) {
                // Place the entire continuous block
                for(let i = 0; i < subject.blockSize; i++){
                    const period = start + i;
                    const dayIndex = this.DAYS.indexOf(day);
                    this._placeAt(className, dayIndex, period, subject);
                }
                subject.placedHours += subject.blockSize;
                blocksPlaced++;
            }
        }
        // Rule D.4: All blocks must be placed
        return blocksPlaced === blocksNeeded;
    }
    /**
     * ═══════════════════════════════════════════════════════════════════════
     * STEP 2: PLACE HIGH-HOUR SUBJECTS (Rule C.1 - Must appear daily)
     * ═══════════════════════════════════════════════════════════════════════
     */ /**
 * STEP 2: PLACE HIGH-HOUR SUBJECTS (Rule C.1 - Must appear daily, best-effort)
 * High-hour subjects try to appear on all days, but we don't crash the whole
 * timetable if the perfect distribution is impossible.
 */ _placeHighHourSubject(className, subject) {
        const hoursToPlace = subject.hoursPerWeek;
        let placed = 0;
        const dailyCount = {};
        this.DAYS.forEach((day)=>dailyCount[day] = 0);
        // PHASE 1: Try to place at least ONE period on EACH day (best-effort)
        for(let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++){
            if (placed >= hoursToPlace) break;
            const day = this.DAYS[dayIdx];
            const periods = this._getAvailablePeriods(className, dayIdx, subject);
            if (periods.length > 0) {
                // Random selection within valid options
                const period = periods[Math.floor(Math.random() * periods.length)];
                this._placeAt(className, dayIdx, period, subject);
                dailyCount[day]++;
                subject.placedHours++;
                placed++;
            }
        }
        // PHASE 2: Place remaining hours with daily limit (max 2 / day normally, 3 in fallback)
        while(placed < hoursToPlace){
            let availableSlots = [];
            // Normal rule: max 2 per day
            for(let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++){
                const day = this.DAYS[dayIdx];
                if (dailyCount[day] >= this.MAX_SAME_SUBJECT_PER_DAY) continue;
                const periods = this._getAvailablePeriods(className, dayIdx, subject);
                periods.forEach((period)=>{
                    availableSlots.push({
                        dayIdx,
                        period,
                        day
                    });
                });
            }
            // Fallback: allow up to 3 per day if needed
            if (availableSlots.length === 0) for(let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++){
                const day = this.DAYS[dayIdx];
                if (dailyCount[day] >= 3) continue;
                const periods = this._getAvailablePeriods(className, dayIdx, subject);
                periods.forEach((period)=>{
                    availableSlots.push({
                        dayIdx,
                        period,
                        day
                    });
                });
            }
            // FINAL EMERGENCY FALLBACK:
            // If still no slots found, ignore daily repetition limits and just
            // find ANY valid empty slot that doesn't clash with teacher/time.
            if (availableSlots.length === 0) {
                const emergencySlots = [];
                for(let dayIdx = 0; dayIdx < this.DAYS.length; dayIdx++){
                    for(let period = 0; period < this.PERIODS; period++)if (this._canPlaceAt(className, dayIdx, period, subject)) emergencySlots.push({
                        dayIdx,
                        period,
                        day: this.DAYS[dayIdx]
                    });
                }
                if (emergencySlots.length === 0) {
                    console.warn(`Cannot fully place ${subject.name}: ${placed}/${hoursToPlace} placed. ` + `Proceeding with partial allocation.`);
                    // Do NOT crash the whole timetable – just accept partial placement.
                    return true;
                }
                const slot = emergencySlots[Math.floor(Math.random() * emergencySlots.length)];
                this._placeAt(className, slot.dayIdx, slot.period, subject);
                dailyCount[slot.day]++;
                subject.placedHours++;
                placed++;
                continue;
            }
            // Normal case: choose a valid slot
            const slot = availableSlots[Math.floor(Math.random() * availableSlots.length)];
            this._placeAt(className, slot.dayIdx, slot.period, subject);
            dailyCount[slot.day]++;
            subject.placedHours++;
            placed++;
        }
        // Even if distribution wasn't "perfect", at this point we've placed all hours.
        return true;
    }
    /**
     * ═══════════════════════════════════════════════════════════════════════
     * STEP 3: PLACE LOW-HOUR SUBJECTS (Rule C.2 - Can have gaps)
     * ═══════════════════════════════════════════════════════════════════════
     */ _placeLowHourSubject(className, subject) {
        const hoursToPlace = subject.hoursPerWeek;
        let placed = 0;
        const dailyCount = {};
        this.DAYS.forEach((day)=>dailyCount[day] = 0);
        // Generate all possible slots
        const allSlots = [];
        this.DAYS.forEach((day, dayIdx)=>{
            for(let period = 0; period < this.PERIODS; period++)allSlots.push({
                day,
                dayIdx,
                period
            });
        });
        // Rule E.5: Randomize
        this._shuffle(allSlots);
        for (const { day, dayIdx, period } of allSlots){
            if (placed >= hoursToPlace) break;
            // Rule C.3: Max 2 per day
            if (dailyCount[day] >= this.MAX_SAME_SUBJECT_PER_DAY) continue;
            if (!this._canPlaceAt(className, dayIdx, period, subject)) continue;
            // Avoid back-to-back (Rule C.4: Daily variety)
            if (period > 0) {
                const prev = this.classTimetables[className][dayIdx][period - 1];
                if (prev?.subject === subject.name && Math.random() < 0.8) continue;
            }
            this._placeAt(className, dayIdx, period, subject);
            dailyCount[day]++;
            subject.placedHours++;
            placed++;
        }
        return placed === hoursToPlace;
    }
    /**
     * ═══════════════════════════════════════════════════════════════════════
     * HELPER FUNCTIONS
     * ═══════════════════════════════════════════════════════════════════════
     */ _getAvailablePeriods(className, dayIdx, subject) {
        const available = [];
        for(let period = 0; period < this.PERIODS; period++)if (this._canPlaceAt(className, dayIdx, period, subject)) {
            // Avoid back-to-back
            if (period > 0) {
                const prev = this.classTimetables[className][dayIdx][period - 1];
                if (prev?.subject === subject.name) continue;
            }
            available.push(period);
        }
        return available;
    }
    _canPlaceAt(className, dayIdx, period, subject) {
        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;
        // Rule A.3: No subject overlap in a class
        if (this.classTimetables[className][dayIdx][period]) return false;
        // Rule B.1: No teacher clash
        if (this.teacherBusySlots[subject.teacher]?.[slotKey]) return false;
        // Rule B.2: Check teacher limits
        if (!this._checkTeacherLimit(subject.teacher)) return false;
        // Rule B.4: Avoid too many consecutive periods
        if (this.teacherDailyCount[subject.teacher][day] >= this.MAX_CONSECUTIVE_PERIODS) return false;
        return true;
    }
    _placeAt(className, dayIdx, period, subject) {
        const day = this.DAYS[dayIdx];
        const slotKey = `${day}-P${period + 1}`;
        // Place in class timetable
        this.classTimetables[className][dayIdx][period] = {
            subject: subject.name,
            teacher: subject.teacher,
            type: subject.subjectType
        };
        // Update teacher tracking
        if (!this.teacherBusySlots[subject.teacher]) this.teacherBusySlots[subject.teacher] = {};
        this.teacherBusySlots[subject.teacher][slotKey] = true;
        this.teacherWeeklyCount[subject.teacher]++;
        this.teacherDailyCount[subject.teacher][day]++;
    }
    _checkTeacherLimit(teacherName) {
        const teacher = this.staff.find((s)=>s.name === teacherName);
        if (!teacher) return false;
        // Rule B.2: Teachers MAY have free periods
        const maxHours = teacher.freePeriodMode === 'manual' ? this.MAX_PERIODS_PER_DAY - teacher.manualFreePeriods : this.MAX_PERIODS_PER_DAY;
        return this.teacherWeeklyCount[teacherName] < maxHours;
    }
    /**
     * ═══════════════════════════════════════════════════════════════════════
     * GENERATE STAFF TIMETABLES (Rule B.2 - Teachers may have free periods)
     * ═══════════════════════════════════════════════════════════════════════
     */ _generateStaffTimetables() {
        this.staff.filter((s)=>s.role === 'staff').forEach((teacher)=>{
            this.staffTimetables[teacher.name] = this.DAYS.map(()=>Array(this.PERIODS).fill({
                    subject: 'FREE',
                    class: '-',
                    type: 'free'
                }));
        });
        this.classes.forEach((cls)=>{
            this.DAYS.forEach((day, dayIndex)=>{
                this.classTimetables[cls.name][dayIndex].forEach((slot, period)=>{
                    if (slot) this.staffTimetables[slot.teacher][dayIndex][period] = {
                        subject: slot.subject,
                        class: cls.name,
                        type: slot.type
                    };
                });
            });
        });
    }
    /**
     * ═══════════════════════════════════════════════════════════════════════
     * VALIDATION (Rule F)
     * ═══════════════════════════════════════════════════════════════════════
     */ _validateGenerated() {
        const warnings = [];
        // F.1: Class validation
        this.classes.forEach((cls)=>{
            let totalSlots = 0;
            let emptySlots = 0;
            this.DAYS.forEach((day, dayIdx)=>{
                this.classTimetables[cls.name][dayIdx].forEach((slot)=>{
                    totalSlots++;
                    if (!slot) emptySlots++;
                });
            });
            if (emptySlots > 0) warnings.push(`Class ${cls.name}: Has ${emptySlots} empty slots (Rule A.2 violated)`);
        });
        // F.2: Teacher validation - check for clashes
        const teachers = this.staff.filter((s)=>s.role === 'staff');
        teachers.forEach((teacher)=>{
            const teacherSlots = {};
            this.DAYS.forEach((day)=>{
                for(let p = 0; p < this.PERIODS; p++)teacherSlots[`${day}-P${p + 1}`] = [];
            });
            this.classes.forEach((cls)=>{
                this.DAYS.forEach((day, dayIdx)=>{
                    this.classTimetables[cls.name][dayIdx].forEach((slot, period)=>{
                        if (slot && slot.teacher === teacher.name) teacherSlots[`${day}-P${period + 1}`].push(cls.name);
                    });
                });
            });
            Object.keys(teacherSlots).forEach((slotKey)=>{
                if (teacherSlots[slotKey].length > 1) warnings.push(`Teacher ${teacher.name} has clash at ${slotKey}: ` + `${teacherSlots[slotKey].join(', ')} (Rule B.1 violated)`);
            });
        });
        // F.3: Subject validation - high-hour subjects should appear daily
        const classSubjects = {};
        this.subjects.forEach((sub)=>{
            if (!classSubjects[sub.className]) classSubjects[sub.className] = [];
            classSubjects[sub.className].push(sub);
        });
        Object.keys(classSubjects).forEach((className)=>{
            classSubjects[className].forEach((subject)=>{
                if (!subject.isContinuous && subject.hoursPerWeek >= 5) {
                    // Check if appears on all days
                    const daysWithSubject = new Set();
                    this.DAYS.forEach((day, dayIdx)=>{
                        this.classTimetables[className][dayIdx].forEach((slot)=>{
                            if (slot && slot.subject === subject.name) daysWithSubject.add(day);
                        });
                    });
                    if (daysWithSubject.size < this.DAYS.length) {
                        const missingDays = this.DAYS.filter((d)=>!daysWithSubject.has(d));
                        warnings.push(`Subject ${subject.name} (${className}): Missing on ${missingDays.join(', ')} ` + `(Rule C.1: High-hour subjects should appear daily)`);
                    }
                }
            });
        });
        return {
            valid: warnings.length === 0,
            warnings
        };
    }
    /**
     * ═══════════════════════════════════════════════════════════════════════
     * UTILITY FUNCTION (Rule E.5: Randomization)
     * ═══════════════════════════════════════════════════════════════════════
     */ _shuffle(array) {
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [
                array[j],
                array[i]
            ];
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"k2NcG":[function(require,module,exports,__globalThis) {
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
},{"react/jsx-dev-runtime":"dVPUn","react":"jMk1U","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT","@parcel/transformer-react-refresh-wrap/lib/helpers/helpers.js":"7h6Pi"}]},["ifaHC"], null, "parcelRequire3f2f", {})

//# sourceMappingURL=AdminDashboard.c1fc38ab.js.map
