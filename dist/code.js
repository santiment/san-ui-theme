/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugin/controller.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/plugin/controller.ts":
/*!**********************************!*\
  !*** ./src/plugin/controller.ts ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dark_theme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dark-theme */ "./src/plugin/dark-theme.ts");
/* harmony import */ var _light_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./light-theme */ "./src/plugin/light-theme.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 320, height: 358 });


function serializeNodes(nodes) {
    let serializedNodes = JSON.stringify(nodes, [
        "name",
        "type",
        "children",
        "id"
    ]);
    return serializedNodes;
}
const flatten = obj => {
    const array = Array.isArray(obj) ? obj : [obj];
    return array.reduce((acc, value) => {
        acc.push(value);
        if (value.children) {
            acc = acc.concat(flatten(value.children));
            delete value.children;
        }
        return acc;
    }, []);
};
figma.ui.onmessage = msg => {
    let skippedLayers = [];
    if (msg.type === "run-app") {
        if (figma.currentPage.selection.length === 0) {
            figma.ui.postMessage({
                type: "selection-updated",
                message: 0
            });
        }
        else {
            let selectedNodes = flatten(figma.currentPage.selection);
            figma.ui.postMessage({
                type: "selection-updated",
                message: serializeNodes(selectedNodes)
            });
        }
    }
    if (msg.type === "theme-update") {
        const nodesToTheme = figma.currentPage.selection;
        if (msg.message === "dark-to-light-theme") {
            nodesToTheme.map(selected => updateTheme(selected, _dark_theme__WEBPACK_IMPORTED_MODULE_0__["darkTheme"]));
        }
        if (msg.message === "light-to-dark-theme") {
            nodesToTheme.map(selected => updateTheme(selected, _light_theme__WEBPACK_IMPORTED_MODULE_1__["lightTheme"]));
        }
        setTimeout(function () {
            figma.ui.postMessage({
                type: "layers-skipped",
                message: serializeNodes(skippedLayers)
            });
        }, 500);
        figma.notify(`Theming complete`, { timeout: 750 });
    }
    if (msg.type === "select-layer") {
        let layer = figma.getNodeById(msg.id);
        let layerArray = [];
        layerArray.push(layer);
        figma.notify(`Layer ${layer.name} selected`, { timeout: 750 });
        figma.currentPage.selection = layerArray;
        figma.viewport.scrollAndZoomIntoView(layerArray);
    }
    function replaceStyles(node, style, mappings, applyStyle) {
        return __awaiter(this, void 0, void 0, function* () {
            let importedStyle = yield figma.importStyleByKeyAsync(style.key);
            if (mappings[importedStyle.key] !== undefined) {
                let mappingStyle = mappings[importedStyle.key];
                let newStyle = yield figma.importStyleByKeyAsync(mappingStyle.mapsToKey);
                applyStyle(node, newStyle.id);
            }
            else {
                skippedLayers.push(node);
            }
        });
    }
    function replaceComponent(node, key, mappings, applyComponent) {
        return __awaiter(this, void 0, void 0, function* () {
            let componentToSwitchWith = mappings[key];
            let importedComponent = yield figma.importComponentByKeyAsync(componentToSwitchWith.mapsToKey);
            applyComponent(node, importedComponent);
        });
    }
    function swapComponent(node, key, mappings) {
        return __awaiter(this, void 0, void 0, function* () {
            yield replaceComponent(node, key, mappings, (node, masterComponent) => (node.masterComponent = masterComponent));
        });
    }
    function replaceFills(node, style, mappings) {
        return __awaiter(this, void 0, void 0, function* () {
            yield replaceStyles(node, style, mappings, (node, styleId) => (node.fillStyleId = styleId));
        });
    }
    function replaceStrokes(node, style, mappings) {
        return __awaiter(this, void 0, void 0, function* () {
            yield replaceStyles(node, style, mappings, (node, styleId) => (node.strokeStyleId = styleId));
        });
    }
    function replaceEffects(node, style, mappings) {
        return __awaiter(this, void 0, void 0, function* () {
            yield replaceStyles(node, style, mappings, (node, styleId) => (node.effectStyleId = styleId));
        });
    }
    function updateTheme(node, theme) {
        switch (node.type) {
            case "COMPONENT":
            case "COMPONENT_SET":
            case "RECTANGLE":
            case "GROUP":
            case "ELLIPSE":
            case "POLYGON":
            case "STAR":
            case "LINE":
            case "BOOLEAN_OPERATION":
            case "FRAME":
            case "LINE":
            case "VECTOR": {
                if (node.children) {
                    node.children.forEach(child => {
                        updateTheme(child, theme);
                    });
                }
                if (node.fills) {
                    if (node.fillStyleId && typeof node.fillStyleId !== "symbol") {
                        let style = figma.getStyleById(node.fillStyleId);
                        replaceFills(node, style, theme);
                    }
                    else {
                        skippedLayers.push(node);
                    }
                }
                if (node.strokeStyleId) {
                    replaceStrokes(node, figma.getStyleById(node.strokeStyleId), theme);
                }
                if (node.effectStyleId) {
                    replaceEffects(node, figma.getStyleById(node.effectStyleId), theme);
                }
                break;
            }
            case "INSTANCE": {
                let componentKey = node.masterComponent.key;
                if (theme[componentKey] !== undefined) {
                    swapComponent(node, componentKey, theme);
                }
                else {
                    if (node.children) {
                        node.children.forEach(child => {
                            updateTheme(child, theme);
                        });
                    }
                }
                break;
            }
            case "TEXT": {
                if (node.fillStyleId && typeof node.fillStyleId !== "symbol") {
                    replaceFills(node, figma.getStyleById(node.fillStyleId), theme);
                }
                else {
                    skippedLayers.push(node);
                }
            }
            default: {
            }
        }
    }
};


/***/ }),

/***/ "./src/plugin/dark-theme.ts":
/*!**********************************!*\
  !*** ./src/plugin/dark-theme.ts ***!
  \**********************************/
/*! exports provided: darkTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darkTheme", function() { return darkTheme; });
const darkTheme = {
    "acef42c8b81ccafb5947bf73b53f353a9641530b": {
        componentName: "Bleach [night]",
        mapsToKey: "5aba3bb97c3d600ba0b56ff9c50974cedd3e90a1"
    },
    "d5cb46e92bc138393e469e4c075d50d6f5469322": {
        componentName: "Athens [night]",
        mapsToKey: "b37a1395599e9f28384809fd793137b65b4b6518"
    },
    "ad95709217b017668b573f7c0312d6a915ff9ed8": {
        componentName: "Porcelain [night]",
        mapsToKey: "37aab25c7a1324deefc29b6be946359b45742da1"
    },
    "510b97be42881e1e2e38724f3beb7efb4e1a4049": {
        componentName: "Mystic [night]",
        mapsToKey: "98404e49e5f4bc72fe0beb17c6e0eef2e927a315"
    },
    "0d006b604f3ab1b4e72979ea74b992b89a35b356": {
        componentName: "Casper [night]",
        mapsToKey: "3589d37e683d8c8d7ca95b7b5190e407fa9d06d1"
    },
    "6b3abed314ded0916f4b346c604ec87971e829c1": {
        componentName: "Waterloo [night]",
        mapsToKey: "32f142d72553c386904612eab9a6b64b8e3c9fc1"
    },
    "f61876d4af37019d73fc497ae3dab8cd887ec02": {
        componentName: "Fiord [night]",
        mapsToKey: "d71a23ce057fdd703b90cae26b57e49740e74883b"
    },
    "e14937dd1d45f6f28aeb11472e9867de62eabf9c": {
        componentName: "Rhino [night]",
        mapsToKey: "c0f8d2d9c08d4d2aa85879646e1ab82e4d9556db"
    },
    "eb87269b06d126b98055d5a8b29d3c2b3b5e95ec": {
        componentName: "Mirage [night]",
        mapsToKey: "ecd894e131af746d1e3c7ed4c9903ac846d68df2"
    },
    "89e3c90f9c3e14993581b6de0742627c760d90c4": {
        componentName: "Jungle Green 01 [night]",
        mapsToKey: "6a7b8a16ee74de43bcbf9e4f04999bec6d4b6f77"
    },
    "31888394b1cda08d0e9aac618dba9ef49b2c19e3": {
        componentName: "Jungle Green 02 [night]",
        mapsToKey: "31abebe608ea15a3f1c5e3e2bf012364d8a15d40"
    },
    "4bba5a61ff33c54d675360fab38190797eb632df": {
        componentName: "Jungle Green 03 [night]",
        mapsToKey: "fdddf02d362db397a25104bc7c37e387f7d18bba"
    },
    "d3ef0c3a125ef4b071210cd656c4740d891b511f": {
        componentName: "Persimmon 01 [night]",
        mapsToKey: "50566bd8f0c71bb80c6cbda039564f4e8646f49d"
    },
    "1c35806cddfba22dff8a52df5ddf13bc051f3dcf": {
        componentName: "Persimmon 02 [night]",
        mapsToKey: "525e03338bf01b380b258261be04ffa01f1a14f4"
    },
    "93f474ff46af4c267f0dafc55b254a66a41742c9": {
        componentName: "Dodger Blue 01 [night]",
        mapsToKey: "57a476a5b75498432d7e6d80a2daeee2eef90cc5"
    },
    "e94682a0742b48f79588471ff7d2c0bc1ebd0f4d": {
        componentName: "Dodger Blue 02 [night]",
        mapsToKey: "39f536a543d25b563e9af80441c20d3ec919b46f"
    },
    "ffd3547695ac5b70da57b14f4091d59db24235f9": {
        componentName: "Dodger Blue 03 [night]",
        mapsToKey: "9147587c94cdcd33d4ccf92fd393f5cebc999f51"
    },
    "9f9f953a993720eab8c2f09cdfe7188a94e3c19f": {
        componentName: "Lima 01 [night]",
        mapsToKey: "349962d687e60e15e34a7bdadc9ebc0cf1b093cb"
    },
    "03069502e91a69bcfa870d4bdf818fe81b469f5d": {
        componentName: "Heliotrope 01 [night]",
        mapsToKey: "207cf972d4ff65fa74a094d0bfaf8a6c658896ed"
    },
    "a2922bce10d79afe0f61d2f6804ef2ed2f7d54e2": {
        componentName: "Heliotrope 02 [night]",
        mapsToKey: "d37efd13e6be2b50857955956eb20e19a15b2b15"
    },
    "aa510fabab9e6e7c59ee04bf9a4b71103b550481": {
        componentName: "Heliotrope 03 [night]",
        mapsToKey: "3aac411648a24b42799cf88d1bcbd435b6bc94fb"
    },
    "0d37e242041a1eb1b519e2fd73bde8fca8179404": {
        componentName: "Malibu 01 [night]",
        mapsToKey: "02eb7cb43ba2b47178b3fc9b68e73314db847d98"
    },
    "1589cff28e22b10b8d1cd714a88dcf8ac4a11403": {
        componentName: "Texas Rose 01 [night]",
        mapsToKey: "20426fb401e19232c36ff92ad940524a1e30d87d"
    },
    "356123a7a35be0e9c377a804f36f3d71e523ea5b": {
        componentName: "Texas Rose 02 [night]",
        mapsToKey: "2a849bd6dd90c1dbe6f9069e297e08d111ae6dd2"
    },
    "967c8db22aecb17614903df0c7ac7261fbd9a7b1": {
        componentName: "Texas Rose 03 [night]",
        mapsToKey: "8ff7daeb82cd21f124cf29eb3caa64291ae482c3"
    },
    "a5b78d0a7c0c161db2c99e8efbdad097b072fb9": {
        componentName: "Bright Sun 01 [night]",
        mapsToKey: "319a1d212992b51880354214d0ac18381d6e2b8b3"
    }
};



/***/ }),

/***/ "./src/plugin/light-theme.ts":
/*!***********************************!*\
  !*** ./src/plugin/light-theme.ts ***!
  \***********************************/
/*! exports provided: lightTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lightTheme", function() { return lightTheme; });
const lightTheme = {
    "5aba3bb97c3d600ba0b56ff9c50974cedd3e90a1": {
        componentName: "Bleach [day]",
        mapsToKey: "acef42c8b81ccafb5947bf73b53f353a9641530b"
    },
    "b37a1395599e9f28384809fd793137b65b4b6518": {
        componentName: "Athens [day]",
        mapsToKey: "d5cb46e92bc138393e469e4c075d50d6f5469322"
    },
    "37aab25c7a1324deefc29b6be946359b45742da1": {
        componentName: "Porcelain [day]",
        mapsToKey: "ad95709217b017668b573f7c0312d6a915ff9ed8"
    },
    "98404e49e5f4bc72fe0beb17c6e0eef2e927a315": {
        componentName: "Mystic [day]",
        mapsToKey: "510b97be42881e1e2e38724f3beb7efb4e1a4049"
    },
    "3589d37e683d8c8d7ca95b7b5190e407fa9d06d1": {
        componentName: "Casper [day]",
        mapsToKey: "0d006b604f3ab1b4e72979ea74b992b89a35b356"
    },
    "32f142d72553c386904612eab9a6b64b8e3c9fc1": {
        componentName: "Waterloo [day]",
        mapsToKey: "6b3abed314ded0916f4b346c604ec87971e829c1"
    },
    "71a23ce057fdd703b90cae26b57e49740e74883b": {
        componentName: "Fiord [day]",
        mapsToKey: "df61876d4af37019d73fc497ae3dab8cd887ec02"
    },
    "c0f8d2d9c08d4d2aa85879646e1ab82e4d9556db": {
        componentName: "Rhino [day]",
        mapsToKey: "e14937dd1d45f6f28aeb11472e9867de62eabf9c"
    },
    "ecd894e131af746d1e3c7ed4c9903ac846d68df2": {
        componentName: "Mirage [day]",
        mapsToKey: "eb87269b06d126b98055d5a8b29d3c2b3b5e95ec"
    },
    "6a7b8a16ee74de43bcbf9e4f04999bec6d4b6f77": {
        componentName: "Jungle Green 01 [day]",
        mapsToKey: "89e3c90f9c3e14993581b6de0742627c760d90c4"
    },
    "31abebe608ea15a3f1c5e3e2bf012364d8a15d40": {
        componentName: "Jungle Green 02 [day]",
        mapsToKey: "31888394b1cda08d0e9aac618dba9ef49b2c19e3"
    },
    "fdddf02d362db397a25104bc7c37e387f7d18bba": {
        componentName: "Jungle Green 03 [day]",
        mapsToKey: "4bba5a61ff33c54d675360fab38190797eb632df"
    },
    "50566bd8f0c71bb80c6cbda039564f4e8646f49d": {
        componentName: "Persimmon 01 [day]",
        mapsToKey: "d3ef0c3a125ef4b071210cd656c4740d891b511f"
    },
    "525e03338bf01b380b258261be04ffa01f1a14f4": {
        componentName: "Persimmon 02 [day]",
        mapsToKey: "1c35806cddfba22dff8a52df5ddf13bc051f3dcf"
    },
    "57a476a5b75498432d7e6d80a2daeee2eef90cc5": {
        componentName: "Dodger Blue 01 [day]",
        mapsToKey: "93f474ff46af4c267f0dafc55b254a66a41742c9"
    },
    "39f536a543d25b563e9af80441c20d3ec919b46f": {
        componentName: "Dodger Blue 02 [day]",
        mapsToKey: "e94682a0742b48f79588471ff7d2c0bc1ebd0f4d"
    },
    "9147587c94cdcd33d4ccf92fd393f5cebc999f51": {
        componentName: "Dodger Blue 03 [day]",
        mapsToKey: "ffd3547695ac5b70da57b14f4091d59db24235f9"
    },
    "349962d687e60e15e34a7bdadc9ebc0cf1b093cb": {
        componentName: "Lima 01 [day]",
        mapsToKey: "9f9f953a993720eab8c2f09cdfe7188a94e3c19f"
    },
    "207cf972d4ff65fa74a094d0bfaf8a6c658896ed": {
        componentName: "Heliotrope 01 [day]",
        mapsToKey: "03069502e91a69bcfa870d4bdf818fe81b469f5d"
    },
    "d37efd13e6be2b50857955956eb20e19a15b2b15": {
        componentName: "Heliotrope 02 [day]",
        mapsToKey: "a2922bce10d79afe0f61d2f6804ef2ed2f7d54e2"
    },
    "3aac411648a24b42799cf88d1bcbd435b6bc94fb": {
        componentName: "Heliotrope 03 [day]",
        mapsToKey: "aa510fabab9e6e7c59ee04bf9a4b71103b550481"
    },
    "02eb7cb43ba2b47178b3fc9b68e73314db847d98": {
        componentName: "Malibu 01 [day]",
        mapsToKey: "0d37e242041a1eb1b519e2fd73bde8fca8179404"
    },
    "20426fb401e19232c36ff92ad940524a1e30d87d": {
        componentName: "Texas Rose 01 [day]",
        mapsToKey: "1589cff28e22b10b8d1cd714a88dcf8ac4a11403"
    },
    "2a849bd6dd90c1dbe6f9069e297e08d111ae6dd2": {
        componentName: "Texas Rose 02 [day]",
        mapsToKey: "356123a7a35be0e9c377a804f36f3d71e523ea5b"
    },
    "8ff7daeb82cd21f124cf29eb3caa64291ae482c3": {
        componentName: "Texas Rose 03 [day]",
        mapsToKey: "967c8db22aecb17614903df0c7ac7261fbd9a7b1"
    },
    "319a1d212992b51880354214d0ac18381d6e2b8b": {
        componentName: "Bright Sun 01 [day]",
        mapsToKey: "a5b78d0a7c0c161db2c99e8efbdad097b072fb93"
    }
};



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW4vZGFyay10aGVtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGx1Z2luL2xpZ2h0LXRoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLGlFQUFpRSx1QkFBdUIsRUFBRSw0QkFBNEI7QUFDcko7QUFDQSxLQUFLO0FBQ0w7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ1Q7QUFDRTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxxREFBUztBQUN4RTtBQUNBO0FBQ0EsK0RBQStELHVEQUFVO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsV0FBVyxhQUFhLGVBQWU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOUtBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3FCOzs7Ozs7Ozs7Ozs7O0FDMUdyQjtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNzQiIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGx1Z2luL2NvbnRyb2xsZXIudHNcIik7XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmZpZ21hLnNob3dVSShfX2h0bWxfXywgeyB3aWR0aDogMzIwLCBoZWlnaHQ6IDM1OCB9KTtcbmltcG9ydCB7IGRhcmtUaGVtZSB9IGZyb20gXCIuL2RhcmstdGhlbWVcIjtcbmltcG9ydCB7IGxpZ2h0VGhlbWUgfSBmcm9tIFwiLi9saWdodC10aGVtZVwiO1xuZnVuY3Rpb24gc2VyaWFsaXplTm9kZXMobm9kZXMpIHtcbiAgICBsZXQgc2VyaWFsaXplZE5vZGVzID0gSlNPTi5zdHJpbmdpZnkobm9kZXMsIFtcbiAgICAgICAgXCJuYW1lXCIsXG4gICAgICAgIFwidHlwZVwiLFxuICAgICAgICBcImNoaWxkcmVuXCIsXG4gICAgICAgIFwiaWRcIlxuICAgIF0pO1xuICAgIHJldHVybiBzZXJpYWxpemVkTm9kZXM7XG59XG5jb25zdCBmbGF0dGVuID0gb2JqID0+IHtcbiAgICBjb25zdCBhcnJheSA9IEFycmF5LmlzQXJyYXkob2JqKSA/IG9iaiA6IFtvYmpdO1xuICAgIHJldHVybiBhcnJheS5yZWR1Y2UoKGFjYywgdmFsdWUpID0+IHtcbiAgICAgICAgYWNjLnB1c2godmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGFjYyA9IGFjYy5jb25jYXQoZmxhdHRlbih2YWx1ZS5jaGlsZHJlbikpO1xuICAgICAgICAgICAgZGVsZXRlIHZhbHVlLmNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgW10pO1xufTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4gICAgbGV0IHNraXBwZWRMYXllcnMgPSBbXTtcbiAgICBpZiAobXNnLnR5cGUgPT09IFwicnVuLWFwcFwiKSB7XG4gICAgICAgIGlmIChmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzZWxlY3Rpb24tdXBkYXRlZFwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkTm9kZXMgPSBmbGF0dGVuKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbik7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJzZWxlY3Rpb24tdXBkYXRlZFwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHNlcmlhbGl6ZU5vZGVzKHNlbGVjdGVkTm9kZXMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IFwidGhlbWUtdXBkYXRlXCIpIHtcbiAgICAgICAgY29uc3Qgbm9kZXNUb1RoZW1lID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uO1xuICAgICAgICBpZiAobXNnLm1lc3NhZ2UgPT09IFwiZGFyay10by1saWdodC10aGVtZVwiKSB7XG4gICAgICAgICAgICBub2Rlc1RvVGhlbWUubWFwKHNlbGVjdGVkID0+IHVwZGF0ZVRoZW1lKHNlbGVjdGVkLCBkYXJrVGhlbWUpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobXNnLm1lc3NhZ2UgPT09IFwibGlnaHQtdG8tZGFyay10aGVtZVwiKSB7XG4gICAgICAgICAgICBub2Rlc1RvVGhlbWUubWFwKHNlbGVjdGVkID0+IHVwZGF0ZVRoZW1lKHNlbGVjdGVkLCBsaWdodFRoZW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJsYXllcnMtc2tpcHBlZFwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHNlcmlhbGl6ZU5vZGVzKHNraXBwZWRMYXllcnMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgZmlnbWEubm90aWZ5KGBUaGVtaW5nIGNvbXBsZXRlYCwgeyB0aW1lb3V0OiA3NTAgfSk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJzZWxlY3QtbGF5ZXJcIikge1xuICAgICAgICBsZXQgbGF5ZXIgPSBmaWdtYS5nZXROb2RlQnlJZChtc2cuaWQpO1xuICAgICAgICBsZXQgbGF5ZXJBcnJheSA9IFtdO1xuICAgICAgICBsYXllckFycmF5LnB1c2gobGF5ZXIpO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYExheWVyICR7bGF5ZXIubmFtZX0gc2VsZWN0ZWRgLCB7IHRpbWVvdXQ6IDc1MCB9KTtcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbGF5ZXJBcnJheTtcbiAgICAgICAgZmlnbWEudmlld3BvcnQuc2Nyb2xsQW5kWm9vbUludG9WaWV3KGxheWVyQXJyYXkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBsYWNlU3R5bGVzKG5vZGUsIHN0eWxlLCBtYXBwaW5ncywgYXBwbHlTdHlsZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IGltcG9ydGVkU3R5bGUgPSB5aWVsZCBmaWdtYS5pbXBvcnRTdHlsZUJ5S2V5QXN5bmMoc3R5bGUua2V5KTtcbiAgICAgICAgICAgIGlmIChtYXBwaW5nc1tpbXBvcnRlZFN0eWxlLmtleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxldCBtYXBwaW5nU3R5bGUgPSBtYXBwaW5nc1tpbXBvcnRlZFN0eWxlLmtleV07XG4gICAgICAgICAgICAgICAgbGV0IG5ld1N0eWxlID0geWllbGQgZmlnbWEuaW1wb3J0U3R5bGVCeUtleUFzeW5jKG1hcHBpbmdTdHlsZS5tYXBzVG9LZXkpO1xuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGUobm9kZSwgbmV3U3R5bGUuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2tpcHBlZExheWVycy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwbGFjZUNvbXBvbmVudChub2RlLCBrZXksIG1hcHBpbmdzLCBhcHBseUNvbXBvbmVudCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IGNvbXBvbmVudFRvU3dpdGNoV2l0aCA9IG1hcHBpbmdzW2tleV07XG4gICAgICAgICAgICBsZXQgaW1wb3J0ZWRDb21wb25lbnQgPSB5aWVsZCBmaWdtYS5pbXBvcnRDb21wb25lbnRCeUtleUFzeW5jKGNvbXBvbmVudFRvU3dpdGNoV2l0aC5tYXBzVG9LZXkpO1xuICAgICAgICAgICAgYXBwbHlDb21wb25lbnQobm9kZSwgaW1wb3J0ZWRDb21wb25lbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3dhcENvbXBvbmVudChub2RlLCBrZXksIG1hcHBpbmdzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB5aWVsZCByZXBsYWNlQ29tcG9uZW50KG5vZGUsIGtleSwgbWFwcGluZ3MsIChub2RlLCBtYXN0ZXJDb21wb25lbnQpID0+IChub2RlLm1hc3RlckNvbXBvbmVudCA9IG1hc3RlckNvbXBvbmVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwbGFjZUZpbGxzKG5vZGUsIHN0eWxlLCBtYXBwaW5ncykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgcmVwbGFjZVN0eWxlcyhub2RlLCBzdHlsZSwgbWFwcGluZ3MsIChub2RlLCBzdHlsZUlkKSA9PiAobm9kZS5maWxsU3R5bGVJZCA9IHN0eWxlSWQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlcGxhY2VTdHJva2VzKG5vZGUsIHN0eWxlLCBtYXBwaW5ncykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgcmVwbGFjZVN0eWxlcyhub2RlLCBzdHlsZSwgbWFwcGluZ3MsIChub2RlLCBzdHlsZUlkKSA9PiAobm9kZS5zdHJva2VTdHlsZUlkID0gc3R5bGVJZCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwbGFjZUVmZmVjdHMobm9kZSwgc3R5bGUsIG1hcHBpbmdzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB5aWVsZCByZXBsYWNlU3R5bGVzKG5vZGUsIHN0eWxlLCBtYXBwaW5ncywgKG5vZGUsIHN0eWxlSWQpID0+IChub2RlLmVmZmVjdFN0eWxlSWQgPSBzdHlsZUlkKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVUaGVtZShub2RlLCB0aGVtZSkge1xuICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIkNPTVBPTkVOVFwiOlxuICAgICAgICAgICAgY2FzZSBcIkNPTVBPTkVOVF9TRVRcIjpcbiAgICAgICAgICAgIGNhc2UgXCJSRUNUQU5HTEVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJHUk9VUFwiOlxuICAgICAgICAgICAgY2FzZSBcIkVMTElQU0VcIjpcbiAgICAgICAgICAgIGNhc2UgXCJQT0xZR09OXCI6XG4gICAgICAgICAgICBjYXNlIFwiU1RBUlwiOlxuICAgICAgICAgICAgY2FzZSBcIkxJTkVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJCT09MRUFOX09QRVJBVElPTlwiOlxuICAgICAgICAgICAgY2FzZSBcIkZSQU1FXCI6XG4gICAgICAgICAgICBjYXNlIFwiTElORVwiOlxuICAgICAgICAgICAgY2FzZSBcIlZFQ1RPUlwiOiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRoZW1lKGNoaWxkLCB0aGVtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5maWxscykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5maWxsU3R5bGVJZCAmJiB0eXBlb2Ygbm9kZS5maWxsU3R5bGVJZCAhPT0gXCJzeW1ib2xcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuZmlsbFN0eWxlSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUZpbGxzKG5vZGUsIHN0eWxlLCB0aGVtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwcGVkTGF5ZXJzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuc3Ryb2tlU3R5bGVJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU3Ryb2tlcyhub2RlLCBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5zdHJva2VTdHlsZUlkKSwgdGhlbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5lZmZlY3RTdHlsZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VFZmZlY3RzKG5vZGUsIGZpZ21hLmdldFN0eWxlQnlJZChub2RlLmVmZmVjdFN0eWxlSWQpLCB0aGVtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcIklOU1RBTkNFXCI6IHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50S2V5ID0gbm9kZS5tYXN0ZXJDb21wb25lbnQua2V5O1xuICAgICAgICAgICAgICAgIGlmICh0aGVtZVtjb21wb25lbnRLZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhcENvbXBvbmVudChub2RlLCBjb21wb25lbnRLZXksIHRoZW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRoZW1lKGNoaWxkLCB0aGVtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJURVhUXCI6IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5maWxsU3R5bGVJZCAmJiB0eXBlb2Ygbm9kZS5maWxsU3R5bGVJZCAhPT0gXCJzeW1ib2xcIikge1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlRmlsbHMobm9kZSwgZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuZmlsbFN0eWxlSWQpLCB0aGVtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBza2lwcGVkTGF5ZXJzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsImNvbnN0IGRhcmtUaGVtZSA9IHtcbiAgICBcImFjZWY0MmM4YjgxY2NhZmI1OTQ3YmY3M2I1M2YzNTNhOTY0MTUzMGJcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkJsZWFjaCBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCI1YWJhM2JiOTdjM2Q2MDBiYTBiNTZmZjljNTA5NzRjZWRkM2U5MGExXCJcbiAgICB9LFxuICAgIFwiZDVjYjQ2ZTkyYmMxMzgzOTNlNDY5ZTRjMDc1ZDUwZDZmNTQ2OTMyMlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiQXRoZW5zIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcImIzN2ExMzk1NTk5ZTlmMjgzODQ4MDlmZDc5MzEzN2I2NWI0YjY1MThcIlxuICAgIH0sXG4gICAgXCJhZDk1NzA5MjE3YjAxNzY2OGI1NzNmN2MwMzEyZDZhOTE1ZmY5ZWQ4XCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJQb3JjZWxhaW4gW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMzdhYWIyNWM3YTEzMjRkZWVmYzI5YjZiZTk0NjM1OWI0NTc0MmRhMVwiXG4gICAgfSxcbiAgICBcIjUxMGI5N2JlNDI4ODFlMWUyZTM4NzI0ZjNiZWI3ZWZiNGUxYTQwNDlcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIk15c3RpYyBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCI5ODQwNGU0OWU1ZjRiYzcyZmUwYmViMTdjNmUwZWVmMmU5MjdhMzE1XCJcbiAgICB9LFxuICAgIFwiMGQwMDZiNjA0ZjNhYjFiNGU3Mjk3OWVhNzRiOTkyYjg5YTM1YjM1NlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiQ2FzcGVyIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjM1ODlkMzdlNjgzZDhjOGQ3Y2E5NWI3YjUxOTBlNDA3ZmE5ZDA2ZDFcIlxuICAgIH0sXG4gICAgXCI2YjNhYmVkMzE0ZGVkMDkxNmY0YjM0NmM2MDRlYzg3OTcxZTgyOWMxXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJXYXRlcmxvbyBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIzMmYxNDJkNzI1NTNjMzg2OTA0NjEyZWFiOWE2YjY0YjhlM2M5ZmMxXCJcbiAgICB9LFxuICAgIFwiZjYxODc2ZDRhZjM3MDE5ZDczZmM0OTdhZTNkYWI4Y2Q4ODdlYzAyXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJGaW9yZCBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCJkNzFhMjNjZTA1N2ZkZDcwM2I5MGNhZTI2YjU3ZTQ5NzQwZTc0ODgzYlwiXG4gICAgfSxcbiAgICBcImUxNDkzN2RkMWQ0NWY2ZjI4YWViMTE0NzJlOTg2N2RlNjJlYWJmOWNcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlJoaW5vIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcImMwZjhkMmQ5YzA4ZDRkMmFhODU4Nzk2NDZlMWFiODJlNGQ5NTU2ZGJcIlxuICAgIH0sXG4gICAgXCJlYjg3MjY5YjA2ZDEyNmI5ODA1NWQ1YThiMjlkM2MyYjNiNWU5NWVjXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJNaXJhZ2UgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZWNkODk0ZTEzMWFmNzQ2ZDFlM2M3ZWQ0Yzk5MDNhYzg0NmQ2OGRmMlwiXG4gICAgfSxcbiAgICBcIjg5ZTNjOTBmOWMzZTE0OTkzNTgxYjZkZTA3NDI2MjdjNzYwZDkwYzRcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkp1bmdsZSBHcmVlbiAwMSBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCI2YTdiOGExNmVlNzRkZTQzYmNiZjllNGYwNDk5OWJlYzZkNGI2Zjc3XCJcbiAgICB9LFxuICAgIFwiMzE4ODgzOTRiMWNkYTA4ZDBlOWFhYzYxOGRiYTllZjQ5YjJjMTllM1wiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiSnVuZ2xlIEdyZWVuIDAyIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjMxYWJlYmU2MDhlYTE1YTNmMWM1ZTNlMmJmMDEyMzY0ZDhhMTVkNDBcIlxuICAgIH0sXG4gICAgXCI0YmJhNWE2MWZmMzNjNTRkNjc1MzYwZmFiMzgxOTA3OTdlYjYzMmRmXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJKdW5nbGUgR3JlZW4gMDMgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZmRkZGYwMmQzNjJkYjM5N2EyNTEwNGJjN2MzN2UzODdmN2QxOGJiYVwiXG4gICAgfSxcbiAgICBcImQzZWYwYzNhMTI1ZWY0YjA3MTIxMGNkNjU2YzQ3NDBkODkxYjUxMWZcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlBlcnNpbW1vbiAwMSBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCI1MDU2NmJkOGYwYzcxYmI4MGM2Y2JkYTAzOTU2NGY0ZTg2NDZmNDlkXCJcbiAgICB9LFxuICAgIFwiMWMzNTgwNmNkZGZiYTIyZGZmOGE1MmRmNWRkZjEzYmMwNTFmM2RjZlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiUGVyc2ltbW9uIDAyIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjUyNWUwMzMzOGJmMDFiMzgwYjI1ODI2MWJlMDRmZmEwMWYxYTE0ZjRcIlxuICAgIH0sXG4gICAgXCI5M2Y0NzRmZjQ2YWY0YzI2N2YwZGFmYzU1YjI1NGE2NmE0MTc0MmM5XCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJEb2RnZXIgQmx1ZSAwMSBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCI1N2E0NzZhNWI3NTQ5ODQzMmQ3ZTZkODBhMmRhZWVlMmVlZjkwY2M1XCJcbiAgICB9LFxuICAgIFwiZTk0NjgyYTA3NDJiNDhmNzk1ODg0NzFmZjdkMmMwYmMxZWJkMGY0ZFwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiRG9kZ2VyIEJsdWUgMDIgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMzlmNTM2YTU0M2QyNWI1NjNlOWFmODA0NDFjMjBkM2VjOTE5YjQ2ZlwiXG4gICAgfSxcbiAgICBcImZmZDM1NDc2OTVhYzViNzBkYTU3YjE0ZjQwOTFkNTlkYjI0MjM1ZjlcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkRvZGdlciBCbHVlIDAzIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjkxNDc1ODdjOTRjZGNkMzNkNGNjZjkyZmQzOTNmNWNlYmM5OTlmNTFcIlxuICAgIH0sXG4gICAgXCI5ZjlmOTUzYTk5MzcyMGVhYjhjMmYwOWNkZmU3MTg4YTk0ZTNjMTlmXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJMaW1hIDAxIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjM0OTk2MmQ2ODdlNjBlMTVlMzRhN2JkYWRjOWViYzBjZjFiMDkzY2JcIlxuICAgIH0sXG4gICAgXCIwMzA2OTUwMmU5MWE2OWJjZmE4NzBkNGJkZjgxOGZlODFiNDY5ZjVkXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJIZWxpb3Ryb3BlIDAxIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjIwN2NmOTcyZDRmZjY1ZmE3NGEwOTRkMGJmYWY4YTZjNjU4ODk2ZWRcIlxuICAgIH0sXG4gICAgXCJhMjkyMmJjZTEwZDc5YWZlMGY2MWQyZjY4MDRlZjJlZDJmN2Q1NGUyXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJIZWxpb3Ryb3BlIDAyIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcImQzN2VmZDEzZTZiZTJiNTA4NTc5NTU5NTZlYjIwZTE5YTE1YjJiMTVcIlxuICAgIH0sXG4gICAgXCJhYTUxMGZhYmFiOWU2ZTdjNTllZTA0YmY5YTRiNzExMDNiNTUwNDgxXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJIZWxpb3Ryb3BlIDAzIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjNhYWM0MTE2NDhhMjRiNDI3OTljZjg4ZDFiY2JkNDM1YjZiYzk0ZmJcIlxuICAgIH0sXG4gICAgXCIwZDM3ZTI0MjA0MWExZWIxYjUxOWUyZmQ3M2JkZThmY2E4MTc5NDA0XCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJNYWxpYnUgMDEgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMDJlYjdjYjQzYmEyYjQ3MTc4YjNmYzliNjhlNzMzMTRkYjg0N2Q5OFwiXG4gICAgfSxcbiAgICBcIjE1ODljZmYyOGUyMmIxMGI4ZDFjZDcxNGE4OGRjZjhhYzRhMTE0MDNcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlRleGFzIFJvc2UgMDEgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMjA0MjZmYjQwMWUxOTIzMmMzNmZmOTJhZDk0MDUyNGExZTMwZDg3ZFwiXG4gICAgfSxcbiAgICBcIjM1NjEyM2E3YTM1YmUwZTljMzc3YTgwNGYzNmYzZDcxZTUyM2VhNWJcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlRleGFzIFJvc2UgMDIgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMmE4NDliZDZkZDkwYzFkYmU2ZjkwNjllMjk3ZTA4ZDExMWFlNmRkMlwiXG4gICAgfSxcbiAgICBcIjk2N2M4ZGIyMmFlY2IxNzYxNDkwM2RmMGM3YWM3MjYxZmJkOWE3YjFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlRleGFzIFJvc2UgMDMgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiOGZmN2RhZWI4MmNkMjFmMTI0Y2YyOWViM2NhYTY0MjkxYWU0ODJjM1wiXG4gICAgfSxcbiAgICBcImE1Yjc4ZDBhN2MwYzE2MWRiMmM5OWU4ZWZiZGFkMDk3YjA3MmZiOVwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiQnJpZ2h0IFN1biAwMSBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIzMTlhMWQyMTI5OTJiNTE4ODAzNTQyMTRkMGFjMTgzODFkNmUyYjhiM1wiXG4gICAgfVxufTtcbmV4cG9ydCB7IGRhcmtUaGVtZSB9O1xuIiwiY29uc3QgbGlnaHRUaGVtZSA9IHtcbiAgICBcIjVhYmEzYmI5N2MzZDYwMGJhMGI1NmZmOWM1MDk3NGNlZGQzZTkwYTFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkJsZWFjaCBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiYWNlZjQyYzhiODFjY2FmYjU5NDdiZjczYjUzZjM1M2E5NjQxNTMwYlwiXG4gICAgfSxcbiAgICBcImIzN2ExMzk1NTk5ZTlmMjgzODQ4MDlmZDc5MzEzN2I2NWI0YjY1MThcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkF0aGVucyBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZDVjYjQ2ZTkyYmMxMzgzOTNlNDY5ZTRjMDc1ZDUwZDZmNTQ2OTMyMlwiXG4gICAgfSxcbiAgICBcIjM3YWFiMjVjN2ExMzI0ZGVlZmMyOWI2YmU5NDYzNTliNDU3NDJkYTFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlBvcmNlbGFpbiBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiYWQ5NTcwOTIxN2IwMTc2NjhiNTczZjdjMDMxMmQ2YTkxNWZmOWVkOFwiXG4gICAgfSxcbiAgICBcIjk4NDA0ZTQ5ZTVmNGJjNzJmZTBiZWIxN2M2ZTBlZWYyZTkyN2EzMTVcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIk15c3RpYyBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiNTEwYjk3YmU0Mjg4MWUxZTJlMzg3MjRmM2JlYjdlZmI0ZTFhNDA0OVwiXG4gICAgfSxcbiAgICBcIjM1ODlkMzdlNjgzZDhjOGQ3Y2E5NWI3YjUxOTBlNDA3ZmE5ZDA2ZDFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkNhc3BlciBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMGQwMDZiNjA0ZjNhYjFiNGU3Mjk3OWVhNzRiOTkyYjg5YTM1YjM1NlwiXG4gICAgfSxcbiAgICBcIjMyZjE0MmQ3MjU1M2MzODY5MDQ2MTJlYWI5YTZiNjRiOGUzYzlmYzFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIldhdGVybG9vIFtkYXldXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCI2YjNhYmVkMzE0ZGVkMDkxNmY0YjM0NmM2MDRlYzg3OTcxZTgyOWMxXCJcbiAgICB9LFxuICAgIFwiNzFhMjNjZTA1N2ZkZDcwM2I5MGNhZTI2YjU3ZTQ5NzQwZTc0ODgzYlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiRmlvcmQgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcImRmNjE4NzZkNGFmMzcwMTlkNzNmYzQ5N2FlM2RhYjhjZDg4N2VjMDJcIlxuICAgIH0sXG4gICAgXCJjMGY4ZDJkOWMwOGQ0ZDJhYTg1ODc5NjQ2ZTFhYjgyZTRkOTU1NmRiXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJSaGlubyBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZTE0OTM3ZGQxZDQ1ZjZmMjhhZWIxMTQ3MmU5ODY3ZGU2MmVhYmY5Y1wiXG4gICAgfSxcbiAgICBcImVjZDg5NGUxMzFhZjc0NmQxZTNjN2VkNGM5OTAzYWM4NDZkNjhkZjJcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIk1pcmFnZSBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZWI4NzI2OWIwNmQxMjZiOTgwNTVkNWE4YjI5ZDNjMmIzYjVlOTVlY1wiXG4gICAgfSxcbiAgICBcIjZhN2I4YTE2ZWU3NGRlNDNiY2JmOWU0ZjA0OTk5YmVjNmQ0YjZmNzdcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkp1bmdsZSBHcmVlbiAwMSBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiODllM2M5MGY5YzNlMTQ5OTM1ODFiNmRlMDc0MjYyN2M3NjBkOTBjNFwiXG4gICAgfSxcbiAgICBcIjMxYWJlYmU2MDhlYTE1YTNmMWM1ZTNlMmJmMDEyMzY0ZDhhMTVkNDBcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkp1bmdsZSBHcmVlbiAwMiBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMzE4ODgzOTRiMWNkYTA4ZDBlOWFhYzYxOGRiYTllZjQ5YjJjMTllM1wiXG4gICAgfSxcbiAgICBcImZkZGRmMDJkMzYyZGIzOTdhMjUxMDRiYzdjMzdlMzg3ZjdkMThiYmFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkp1bmdsZSBHcmVlbiAwMyBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiNGJiYTVhNjFmZjMzYzU0ZDY3NTM2MGZhYjM4MTkwNzk3ZWI2MzJkZlwiXG4gICAgfSxcbiAgICBcIjUwNTY2YmQ4ZjBjNzFiYjgwYzZjYmRhMDM5NTY0ZjRlODY0NmY0OWRcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlBlcnNpbW1vbiAwMSBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZDNlZjBjM2ExMjVlZjRiMDcxMjEwY2Q2NTZjNDc0MGQ4OTFiNTExZlwiXG4gICAgfSxcbiAgICBcIjUyNWUwMzMzOGJmMDFiMzgwYjI1ODI2MWJlMDRmZmEwMWYxYTE0ZjRcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlBlcnNpbW1vbiAwMiBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMWMzNTgwNmNkZGZiYTIyZGZmOGE1MmRmNWRkZjEzYmMwNTFmM2RjZlwiXG4gICAgfSxcbiAgICBcIjU3YTQ3NmE1Yjc1NDk4NDMyZDdlNmQ4MGEyZGFlZWUyZWVmOTBjYzVcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkRvZGdlciBCbHVlIDAxIFtkYXldXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCI5M2Y0NzRmZjQ2YWY0YzI2N2YwZGFmYzU1YjI1NGE2NmE0MTc0MmM5XCJcbiAgICB9LFxuICAgIFwiMzlmNTM2YTU0M2QyNWI1NjNlOWFmODA0NDFjMjBkM2VjOTE5YjQ2ZlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiRG9kZ2VyIEJsdWUgMDIgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcImU5NDY4MmEwNzQyYjQ4Zjc5NTg4NDcxZmY3ZDJjMGJjMWViZDBmNGRcIlxuICAgIH0sXG4gICAgXCI5MTQ3NTg3Yzk0Y2RjZDMzZDRjY2Y5MmZkMzkzZjVjZWJjOTk5ZjUxXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJEb2RnZXIgQmx1ZSAwMyBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZmZkMzU0NzY5NWFjNWI3MGRhNTdiMTRmNDA5MWQ1OWRiMjQyMzVmOVwiXG4gICAgfSxcbiAgICBcIjM0OTk2MmQ2ODdlNjBlMTVlMzRhN2JkYWRjOWViYzBjZjFiMDkzY2JcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkxpbWEgMDEgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjlmOWY5NTNhOTkzNzIwZWFiOGMyZjA5Y2RmZTcxODhhOTRlM2MxOWZcIlxuICAgIH0sXG4gICAgXCIyMDdjZjk3MmQ0ZmY2NWZhNzRhMDk0ZDBiZmFmOGE2YzY1ODg5NmVkXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJIZWxpb3Ryb3BlIDAxIFtkYXldXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIwMzA2OTUwMmU5MWE2OWJjZmE4NzBkNGJkZjgxOGZlODFiNDY5ZjVkXCJcbiAgICB9LFxuICAgIFwiZDM3ZWZkMTNlNmJlMmI1MDg1Nzk1NTk1NmViMjBlMTlhMTViMmIxNVwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiSGVsaW90cm9wZSAwMiBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiYTI5MjJiY2UxMGQ3OWFmZTBmNjFkMmY2ODA0ZWYyZWQyZjdkNTRlMlwiXG4gICAgfSxcbiAgICBcIjNhYWM0MTE2NDhhMjRiNDI3OTljZjg4ZDFiY2JkNDM1YjZiYzk0ZmJcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkhlbGlvdHJvcGUgMDMgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcImFhNTEwZmFiYWI5ZTZlN2M1OWVlMDRiZjlhNGI3MTEwM2I1NTA0ODFcIlxuICAgIH0sXG4gICAgXCIwMmViN2NiNDNiYTJiNDcxNzhiM2ZjOWI2OGU3MzMxNGRiODQ3ZDk4XCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJNYWxpYnUgMDEgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjBkMzdlMjQyMDQxYTFlYjFiNTE5ZTJmZDczYmRlOGZjYTgxNzk0MDRcIlxuICAgIH0sXG4gICAgXCIyMDQyNmZiNDAxZTE5MjMyYzM2ZmY5MmFkOTQwNTI0YTFlMzBkODdkXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJUZXhhcyBSb3NlIDAxIFtkYXldXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIxNTg5Y2ZmMjhlMjJiMTBiOGQxY2Q3MTRhODhkY2Y4YWM0YTExNDAzXCJcbiAgICB9LFxuICAgIFwiMmE4NDliZDZkZDkwYzFkYmU2ZjkwNjllMjk3ZTA4ZDExMWFlNmRkMlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiVGV4YXMgUm9zZSAwMiBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMzU2MTIzYTdhMzViZTBlOWMzNzdhODA0ZjM2ZjNkNzFlNTIzZWE1YlwiXG4gICAgfSxcbiAgICBcIjhmZjdkYWViODJjZDIxZjEyNGNmMjllYjNjYWE2NDI5MWFlNDgyYzNcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlRleGFzIFJvc2UgMDMgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjk2N2M4ZGIyMmFlY2IxNzYxNDkwM2RmMGM3YWM3MjYxZmJkOWE3YjFcIlxuICAgIH0sXG4gICAgXCIzMTlhMWQyMTI5OTJiNTE4ODAzNTQyMTRkMGFjMTgzODFkNmUyYjhiXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJCcmlnaHQgU3VuIDAxIFtkYXldXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCJhNWI3OGQwYTdjMGMxNjFkYjJjOTllOGVmYmRhZDA5N2IwNzJmYjkzXCJcbiAgICB9XG59O1xuZXhwb3J0IHsgbGlnaHRUaGVtZSB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==