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
    },
    "921abc54cf8250bb0b89a36016e88bceccd9d6b1": {
        componentName: "Whale [night]",
        mapsToKey: "b43202200a0579ff8ee14664cdebd3d625a948bc"
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
    },
    "b43202200a0579ff8ee14664cdebd3d625a948bc": {
        componentName: "Whale [day]",
        mapsToKey: "921abc54cf8250bb0b89a36016e88bceccd9d6b1"
    }
};



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BsdWdpbi9jb250cm9sbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW4vZGFyay10aGVtZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGx1Z2luL2xpZ2h0LXRoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLGlFQUFpRSx1QkFBdUIsRUFBRSw0QkFBNEI7QUFDcko7QUFDQSxLQUFLO0FBQ0w7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ1Q7QUFDRTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxxREFBUztBQUN4RTtBQUNBO0FBQ0EsK0RBQStELHVEQUFVO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULDBDQUEwQyxlQUFlO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsV0FBVyxhQUFhLGVBQWU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDOUtBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNxQjs7Ozs7Ozs7Ozs7OztBQzlHckI7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3NCIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wbHVnaW4vY29udHJvbGxlci50c1wiKTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7IHdpZHRoOiAzMjAsIGhlaWdodDogMzU4IH0pO1xuaW1wb3J0IHsgZGFya1RoZW1lIH0gZnJvbSBcIi4vZGFyay10aGVtZVwiO1xuaW1wb3J0IHsgbGlnaHRUaGVtZSB9IGZyb20gXCIuL2xpZ2h0LXRoZW1lXCI7XG5mdW5jdGlvbiBzZXJpYWxpemVOb2Rlcyhub2Rlcykge1xuICAgIGxldCBzZXJpYWxpemVkTm9kZXMgPSBKU09OLnN0cmluZ2lmeShub2RlcywgW1xuICAgICAgICBcIm5hbWVcIixcbiAgICAgICAgXCJ0eXBlXCIsXG4gICAgICAgIFwiY2hpbGRyZW5cIixcbiAgICAgICAgXCJpZFwiXG4gICAgXSk7XG4gICAgcmV0dXJuIHNlcmlhbGl6ZWROb2Rlcztcbn1cbmNvbnN0IGZsYXR0ZW4gPSBvYmogPT4ge1xuICAgIGNvbnN0IGFycmF5ID0gQXJyYXkuaXNBcnJheShvYmopID8gb2JqIDogW29ial07XG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4ge1xuICAgICAgICBhY2MucHVzaCh2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgYWNjID0gYWNjLmNvbmNhdChmbGF0dGVuKHZhbHVlLmNoaWxkcmVuKSk7XG4gICAgICAgICAgICBkZWxldGUgdmFsdWUuY2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSk7XG59O1xuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICBsZXQgc2tpcHBlZExheWVycyA9IFtdO1xuICAgIGlmIChtc2cudHlwZSA9PT0gXCJydW4tYXBwXCIpIHtcbiAgICAgICAgaWYgKGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNlbGVjdGlvbi11cGRhdGVkXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWROb2RlcyA9IGZsYXR0ZW4oZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNlbGVjdGlvbi11cGRhdGVkXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogc2VyaWFsaXplTm9kZXMoc2VsZWN0ZWROb2RlcylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gXCJ0aGVtZS11cGRhdGVcIikge1xuICAgICAgICBjb25zdCBub2Rlc1RvVGhlbWUgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgICAgIGlmIChtc2cubWVzc2FnZSA9PT0gXCJkYXJrLXRvLWxpZ2h0LXRoZW1lXCIpIHtcbiAgICAgICAgICAgIG5vZGVzVG9UaGVtZS5tYXAoc2VsZWN0ZWQgPT4gdXBkYXRlVGhlbWUoc2VsZWN0ZWQsIGRhcmtUaGVtZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtc2cubWVzc2FnZSA9PT0gXCJsaWdodC10by1kYXJrLXRoZW1lXCIpIHtcbiAgICAgICAgICAgIG5vZGVzVG9UaGVtZS5tYXAoc2VsZWN0ZWQgPT4gdXBkYXRlVGhlbWUoc2VsZWN0ZWQsIGxpZ2h0VGhlbWUpKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImxheWVycy1za2lwcGVkXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogc2VyaWFsaXplTm9kZXMoc2tpcHBlZExheWVycylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCA1MDApO1xuICAgICAgICBmaWdtYS5ub3RpZnkoYFRoZW1pbmcgY29tcGxldGVgLCB7IHRpbWVvdXQ6IDc1MCB9KTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSBcInNlbGVjdC1sYXllclwiKSB7XG4gICAgICAgIGxldCBsYXllciA9IGZpZ21hLmdldE5vZGVCeUlkKG1zZy5pZCk7XG4gICAgICAgIGxldCBsYXllckFycmF5ID0gW107XG4gICAgICAgIGxheWVyQXJyYXkucHVzaChsYXllcik7XG4gICAgICAgIGZpZ21hLm5vdGlmeShgTGF5ZXIgJHtsYXllci5uYW1lfSBzZWxlY3RlZGAsIHsgdGltZW91dDogNzUwIH0pO1xuICAgICAgICBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBsYXllckFycmF5O1xuICAgICAgICBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobGF5ZXJBcnJheSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlcGxhY2VTdHlsZXMobm9kZSwgc3R5bGUsIG1hcHBpbmdzLCBhcHBseVN0eWxlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgaW1wb3J0ZWRTdHlsZSA9IHlpZWxkIGZpZ21hLmltcG9ydFN0eWxlQnlLZXlBc3luYyhzdHlsZS5rZXkpO1xuICAgICAgICAgICAgaWYgKG1hcHBpbmdzW2ltcG9ydGVkU3R5bGUua2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hcHBpbmdTdHlsZSA9IG1hcHBpbmdzW2ltcG9ydGVkU3R5bGUua2V5XTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3U3R5bGUgPSB5aWVsZCBmaWdtYS5pbXBvcnRTdHlsZUJ5S2V5QXN5bmMobWFwcGluZ1N0eWxlLm1hcHNUb0tleSk7XG4gICAgICAgICAgICAgICAgYXBwbHlTdHlsZShub2RlLCBuZXdTdHlsZS5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBza2lwcGVkTGF5ZXJzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBsYWNlQ29tcG9uZW50KG5vZGUsIGtleSwgbWFwcGluZ3MsIGFwcGx5Q29tcG9uZW50KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgY29tcG9uZW50VG9Td2l0Y2hXaXRoID0gbWFwcGluZ3Nba2V5XTtcbiAgICAgICAgICAgIGxldCBpbXBvcnRlZENvbXBvbmVudCA9IHlpZWxkIGZpZ21hLmltcG9ydENvbXBvbmVudEJ5S2V5QXN5bmMoY29tcG9uZW50VG9Td2l0Y2hXaXRoLm1hcHNUb0tleSk7XG4gICAgICAgICAgICBhcHBseUNvbXBvbmVudChub2RlLCBpbXBvcnRlZENvbXBvbmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzd2FwQ29tcG9uZW50KG5vZGUsIGtleSwgbWFwcGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIHJlcGxhY2VDb21wb25lbnQobm9kZSwga2V5LCBtYXBwaW5ncywgKG5vZGUsIG1hc3RlckNvbXBvbmVudCkgPT4gKG5vZGUubWFzdGVyQ29tcG9uZW50ID0gbWFzdGVyQ29tcG9uZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBsYWNlRmlsbHMobm9kZSwgc3R5bGUsIG1hcHBpbmdzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB5aWVsZCByZXBsYWNlU3R5bGVzKG5vZGUsIHN0eWxlLCBtYXBwaW5ncywgKG5vZGUsIHN0eWxlSWQpID0+IChub2RlLmZpbGxTdHlsZUlkID0gc3R5bGVJZCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwbGFjZVN0cm9rZXMobm9kZSwgc3R5bGUsIG1hcHBpbmdzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB5aWVsZCByZXBsYWNlU3R5bGVzKG5vZGUsIHN0eWxlLCBtYXBwaW5ncywgKG5vZGUsIHN0eWxlSWQpID0+IChub2RlLnN0cm9rZVN0eWxlSWQgPSBzdHlsZUlkKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBsYWNlRWZmZWN0cyhub2RlLCBzdHlsZSwgbWFwcGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIHJlcGxhY2VTdHlsZXMobm9kZSwgc3R5bGUsIG1hcHBpbmdzLCAobm9kZSwgc3R5bGVJZCkgPT4gKG5vZGUuZWZmZWN0U3R5bGVJZCA9IHN0eWxlSWQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRoZW1lKG5vZGUsIHRoZW1lKSB7XG4gICAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwiQ09NUE9ORU5UXCI6XG4gICAgICAgICAgICBjYXNlIFwiQ09NUE9ORU5UX1NFVFwiOlxuICAgICAgICAgICAgY2FzZSBcIlJFQ1RBTkdMRVwiOlxuICAgICAgICAgICAgY2FzZSBcIkdST1VQXCI6XG4gICAgICAgICAgICBjYXNlIFwiRUxMSVBTRVwiOlxuICAgICAgICAgICAgY2FzZSBcIlBPTFlHT05cIjpcbiAgICAgICAgICAgIGNhc2UgXCJTVEFSXCI6XG4gICAgICAgICAgICBjYXNlIFwiTElORVwiOlxuICAgICAgICAgICAgY2FzZSBcIkJPT0xFQU5fT1BFUkFUSU9OXCI6XG4gICAgICAgICAgICBjYXNlIFwiRlJBTUVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJMSU5FXCI6XG4gICAgICAgICAgICBjYXNlIFwiVkVDVE9SXCI6IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGhlbWUoY2hpbGQsIHRoZW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub2RlLmZpbGxzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmZpbGxTdHlsZUlkICYmIHR5cGVvZiBub2RlLmZpbGxTdHlsZUlkICE9PSBcInN5bWJvbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5maWxsU3R5bGVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlRmlsbHMobm9kZSwgc3R5bGUsIHRoZW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNraXBwZWRMYXllcnMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5zdHJva2VTdHlsZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTdHJva2VzKG5vZGUsIGZpZ21hLmdldFN0eWxlQnlJZChub2RlLnN0cm9rZVN0eWxlSWQpLCB0aGVtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub2RlLmVmZmVjdFN0eWxlSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZUVmZmVjdHMobm9kZSwgZmlnbWEuZ2V0U3R5bGVCeUlkKG5vZGUuZWZmZWN0U3R5bGVJZCksIHRoZW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiSU5TVEFOQ0VcIjoge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnRLZXkgPSBub2RlLm1hc3RlckNvbXBvbmVudC5rZXk7XG4gICAgICAgICAgICAgICAgaWYgKHRoZW1lW2NvbXBvbmVudEtleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzd2FwQ29tcG9uZW50KG5vZGUsIGNvbXBvbmVudEtleSwgdGhlbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGhlbWUoY2hpbGQsIHRoZW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcIlRFWFRcIjoge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLmZpbGxTdHlsZUlkICYmIHR5cGVvZiBub2RlLmZpbGxTdHlsZUlkICE9PSBcInN5bWJvbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VGaWxscyhub2RlLCBmaWdtYS5nZXRTdHlsZUJ5SWQobm9kZS5maWxsU3R5bGVJZCksIHRoZW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNraXBwZWRMYXllcnMucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiY29uc3QgZGFya1RoZW1lID0ge1xuICAgIFwiYWNlZjQyYzhiODFjY2FmYjU5NDdiZjczYjUzZjM1M2E5NjQxNTMwYlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiQmxlYWNoIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjVhYmEzYmI5N2MzZDYwMGJhMGI1NmZmOWM1MDk3NGNlZGQzZTkwYTFcIlxuICAgIH0sXG4gICAgXCJkNWNiNDZlOTJiYzEzODM5M2U0NjllNGMwNzVkNTBkNmY1NDY5MzIyXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJBdGhlbnMgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiYjM3YTEzOTU1OTllOWYyODM4NDgwOWZkNzkzMTM3YjY1YjRiNjUxOFwiXG4gICAgfSxcbiAgICBcImFkOTU3MDkyMTdiMDE3NjY4YjU3M2Y3YzAzMTJkNmE5MTVmZjllZDhcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlBvcmNlbGFpbiBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIzN2FhYjI1YzdhMTMyNGRlZWZjMjliNmJlOTQ2MzU5YjQ1NzQyZGExXCJcbiAgICB9LFxuICAgIFwiNTEwYjk3YmU0Mjg4MWUxZTJlMzg3MjRmM2JlYjdlZmI0ZTFhNDA0OVwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiTXlzdGljIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjk4NDA0ZTQ5ZTVmNGJjNzJmZTBiZWIxN2M2ZTBlZWYyZTkyN2EzMTVcIlxuICAgIH0sXG4gICAgXCIwZDAwNmI2MDRmM2FiMWI0ZTcyOTc5ZWE3NGI5OTJiODlhMzViMzU2XCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJDYXNwZXIgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMzU4OWQzN2U2ODNkOGM4ZDdjYTk1YjdiNTE5MGU0MDdmYTlkMDZkMVwiXG4gICAgfSxcbiAgICBcIjZiM2FiZWQzMTRkZWQwOTE2ZjRiMzQ2YzYwNGVjODc5NzFlODI5YzFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIldhdGVybG9vIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjMyZjE0MmQ3MjU1M2MzODY5MDQ2MTJlYWI5YTZiNjRiOGUzYzlmYzFcIlxuICAgIH0sXG4gICAgXCJmNjE4NzZkNGFmMzcwMTlkNzNmYzQ5N2FlM2RhYjhjZDg4N2VjMDJcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkZpb3JkIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcImQ3MWEyM2NlMDU3ZmRkNzAzYjkwY2FlMjZiNTdlNDk3NDBlNzQ4ODNiXCJcbiAgICB9LFxuICAgIFwiZTE0OTM3ZGQxZDQ1ZjZmMjhhZWIxMTQ3MmU5ODY3ZGU2MmVhYmY5Y1wiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiUmhpbm8gW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiYzBmOGQyZDljMDhkNGQyYWE4NTg3OTY0NmUxYWI4MmU0ZDk1NTZkYlwiXG4gICAgfSxcbiAgICBcImViODcyNjliMDZkMTI2Yjk4MDU1ZDVhOGIyOWQzYzJiM2I1ZTk1ZWNcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIk1pcmFnZSBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCJlY2Q4OTRlMTMxYWY3NDZkMWUzYzdlZDRjOTkwM2FjODQ2ZDY4ZGYyXCJcbiAgICB9LFxuICAgIFwiODllM2M5MGY5YzNlMTQ5OTM1ODFiNmRlMDc0MjYyN2M3NjBkOTBjNFwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiSnVuZ2xlIEdyZWVuIDAxIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjZhN2I4YTE2ZWU3NGRlNDNiY2JmOWU0ZjA0OTk5YmVjNmQ0YjZmNzdcIlxuICAgIH0sXG4gICAgXCIzMTg4ODM5NGIxY2RhMDhkMGU5YWFjNjE4ZGJhOWVmNDliMmMxOWUzXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJKdW5nbGUgR3JlZW4gMDIgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMzFhYmViZTYwOGVhMTVhM2YxYzVlM2UyYmYwMTIzNjRkOGExNWQ0MFwiXG4gICAgfSxcbiAgICBcIjRiYmE1YTYxZmYzM2M1NGQ2NzUzNjBmYWIzODE5MDc5N2ViNjMyZGZcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkp1bmdsZSBHcmVlbiAwMyBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCJmZGRkZjAyZDM2MmRiMzk3YTI1MTA0YmM3YzM3ZTM4N2Y3ZDE4YmJhXCJcbiAgICB9LFxuICAgIFwiZDNlZjBjM2ExMjVlZjRiMDcxMjEwY2Q2NTZjNDc0MGQ4OTFiNTExZlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiUGVyc2ltbW9uIDAxIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjUwNTY2YmQ4ZjBjNzFiYjgwYzZjYmRhMDM5NTY0ZjRlODY0NmY0OWRcIlxuICAgIH0sXG4gICAgXCIxYzM1ODA2Y2RkZmJhMjJkZmY4YTUyZGY1ZGRmMTNiYzA1MWYzZGNmXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJQZXJzaW1tb24gMDIgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiNTI1ZTAzMzM4YmYwMWIzODBiMjU4MjYxYmUwNGZmYTAxZjFhMTRmNFwiXG4gICAgfSxcbiAgICBcIjkzZjQ3NGZmNDZhZjRjMjY3ZjBkYWZjNTViMjU0YTY2YTQxNzQyYzlcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkRvZGdlciBCbHVlIDAxIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjU3YTQ3NmE1Yjc1NDk4NDMyZDdlNmQ4MGEyZGFlZWUyZWVmOTBjYzVcIlxuICAgIH0sXG4gICAgXCJlOTQ2ODJhMDc0MmI0OGY3OTU4ODQ3MWZmN2QyYzBiYzFlYmQwZjRkXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJEb2RnZXIgQmx1ZSAwMiBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIzOWY1MzZhNTQzZDI1YjU2M2U5YWY4MDQ0MWMyMGQzZWM5MTliNDZmXCJcbiAgICB9LFxuICAgIFwiZmZkMzU0NzY5NWFjNWI3MGRhNTdiMTRmNDA5MWQ1OWRiMjQyMzVmOVwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiRG9kZ2VyIEJsdWUgMDMgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiOTE0NzU4N2M5NGNkY2QzM2Q0Y2NmOTJmZDM5M2Y1Y2ViYzk5OWY1MVwiXG4gICAgfSxcbiAgICBcIjlmOWY5NTNhOTkzNzIwZWFiOGMyZjA5Y2RmZTcxODhhOTRlM2MxOWZcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkxpbWEgMDEgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMzQ5OTYyZDY4N2U2MGUxNWUzNGE3YmRhZGM5ZWJjMGNmMWIwOTNjYlwiXG4gICAgfSxcbiAgICBcIjAzMDY5NTAyZTkxYTY5YmNmYTg3MGQ0YmRmODE4ZmU4MWI0NjlmNWRcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkhlbGlvdHJvcGUgMDEgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMjA3Y2Y5NzJkNGZmNjVmYTc0YTA5NGQwYmZhZjhhNmM2NTg4OTZlZFwiXG4gICAgfSxcbiAgICBcImEyOTIyYmNlMTBkNzlhZmUwZjYxZDJmNjgwNGVmMmVkMmY3ZDU0ZTJcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkhlbGlvdHJvcGUgMDIgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZDM3ZWZkMTNlNmJlMmI1MDg1Nzk1NTk1NmViMjBlMTlhMTViMmIxNVwiXG4gICAgfSxcbiAgICBcImFhNTEwZmFiYWI5ZTZlN2M1OWVlMDRiZjlhNGI3MTEwM2I1NTA0ODFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkhlbGlvdHJvcGUgMDMgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiM2FhYzQxMTY0OGEyNGI0Mjc5OWNmODhkMWJjYmQ0MzViNmJjOTRmYlwiXG4gICAgfSxcbiAgICBcIjBkMzdlMjQyMDQxYTFlYjFiNTE5ZTJmZDczYmRlOGZjYTgxNzk0MDRcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIk1hbGlidSAwMSBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIwMmViN2NiNDNiYTJiNDcxNzhiM2ZjOWI2OGU3MzMxNGRiODQ3ZDk4XCJcbiAgICB9LFxuICAgIFwiMTU4OWNmZjI4ZTIyYjEwYjhkMWNkNzE0YTg4ZGNmOGFjNGExMTQwM1wiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiVGV4YXMgUm9zZSAwMSBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIyMDQyNmZiNDAxZTE5MjMyYzM2ZmY5MmFkOTQwNTI0YTFlMzBkODdkXCJcbiAgICB9LFxuICAgIFwiMzU2MTIzYTdhMzViZTBlOWMzNzdhODA0ZjM2ZjNkNzFlNTIzZWE1YlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiVGV4YXMgUm9zZSAwMiBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIyYTg0OWJkNmRkOTBjMWRiZTZmOTA2OWUyOTdlMDhkMTExYWU2ZGQyXCJcbiAgICB9LFxuICAgIFwiOTY3YzhkYjIyYWVjYjE3NjE0OTAzZGYwYzdhYzcyNjFmYmQ5YTdiMVwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiVGV4YXMgUm9zZSAwMyBbbmlnaHRdXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCI4ZmY3ZGFlYjgyY2QyMWYxMjRjZjI5ZWIzY2FhNjQyOTFhZTQ4MmMzXCJcbiAgICB9LFxuICAgIFwiYTViNzhkMGE3YzBjMTYxZGIyYzk5ZThlZmJkYWQwOTdiMDcyZmI5XCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJCcmlnaHQgU3VuIDAxIFtuaWdodF1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjMxOWExZDIxMjk5MmI1MTg4MDM1NDIxNGQwYWMxODM4MWQ2ZTJiOGIzXCJcbiAgICB9LFxuICAgIFwiOTIxYWJjNTRjZjgyNTBiYjBiODlhMzYwMTZlODhiY2VjY2Q5ZDZiMVwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiV2hhbGUgW25pZ2h0XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiYjQzMjAyMjAwYTA1NzlmZjhlZTE0NjY0Y2RlYmQzZDYyNWE5NDhiY1wiXG4gICAgfVxufTtcbmV4cG9ydCB7IGRhcmtUaGVtZSB9O1xuIiwiY29uc3QgbGlnaHRUaGVtZSA9IHtcbiAgICBcIjVhYmEzYmI5N2MzZDYwMGJhMGI1NmZmOWM1MDk3NGNlZGQzZTkwYTFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkJsZWFjaCBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiYWNlZjQyYzhiODFjY2FmYjU5NDdiZjczYjUzZjM1M2E5NjQxNTMwYlwiXG4gICAgfSxcbiAgICBcImIzN2ExMzk1NTk5ZTlmMjgzODQ4MDlmZDc5MzEzN2I2NWI0YjY1MThcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkF0aGVucyBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZDVjYjQ2ZTkyYmMxMzgzOTNlNDY5ZTRjMDc1ZDUwZDZmNTQ2OTMyMlwiXG4gICAgfSxcbiAgICBcIjM3YWFiMjVjN2ExMzI0ZGVlZmMyOWI2YmU5NDYzNTliNDU3NDJkYTFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlBvcmNlbGFpbiBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiYWQ5NTcwOTIxN2IwMTc2NjhiNTczZjdjMDMxMmQ2YTkxNWZmOWVkOFwiXG4gICAgfSxcbiAgICBcIjk4NDA0ZTQ5ZTVmNGJjNzJmZTBiZWIxN2M2ZTBlZWYyZTkyN2EzMTVcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIk15c3RpYyBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiNTEwYjk3YmU0Mjg4MWUxZTJlMzg3MjRmM2JlYjdlZmI0ZTFhNDA0OVwiXG4gICAgfSxcbiAgICBcIjM1ODlkMzdlNjgzZDhjOGQ3Y2E5NWI3YjUxOTBlNDA3ZmE5ZDA2ZDFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkNhc3BlciBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMGQwMDZiNjA0ZjNhYjFiNGU3Mjk3OWVhNzRiOTkyYjg5YTM1YjM1NlwiXG4gICAgfSxcbiAgICBcIjMyZjE0MmQ3MjU1M2MzODY5MDQ2MTJlYWI5YTZiNjRiOGUzYzlmYzFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIldhdGVybG9vIFtkYXldXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCI2YjNhYmVkMzE0ZGVkMDkxNmY0YjM0NmM2MDRlYzg3OTcxZTgyOWMxXCJcbiAgICB9LFxuICAgIFwiNzFhMjNjZTA1N2ZkZDcwM2I5MGNhZTI2YjU3ZTQ5NzQwZTc0ODgzYlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiRmlvcmQgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcImRmNjE4NzZkNGFmMzcwMTlkNzNmYzQ5N2FlM2RhYjhjZDg4N2VjMDJcIlxuICAgIH0sXG4gICAgXCJjMGY4ZDJkOWMwOGQ0ZDJhYTg1ODc5NjQ2ZTFhYjgyZTRkOTU1NmRiXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJSaGlubyBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZTE0OTM3ZGQxZDQ1ZjZmMjhhZWIxMTQ3MmU5ODY3ZGU2MmVhYmY5Y1wiXG4gICAgfSxcbiAgICBcImVjZDg5NGUxMzFhZjc0NmQxZTNjN2VkNGM5OTAzYWM4NDZkNjhkZjJcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIk1pcmFnZSBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZWI4NzI2OWIwNmQxMjZiOTgwNTVkNWE4YjI5ZDNjMmIzYjVlOTVlY1wiXG4gICAgfSxcbiAgICBcIjZhN2I4YTE2ZWU3NGRlNDNiY2JmOWU0ZjA0OTk5YmVjNmQ0YjZmNzdcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkp1bmdsZSBHcmVlbiAwMSBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiODllM2M5MGY5YzNlMTQ5OTM1ODFiNmRlMDc0MjYyN2M3NjBkOTBjNFwiXG4gICAgfSxcbiAgICBcIjMxYWJlYmU2MDhlYTE1YTNmMWM1ZTNlMmJmMDEyMzY0ZDhhMTVkNDBcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkp1bmdsZSBHcmVlbiAwMiBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMzE4ODgzOTRiMWNkYTA4ZDBlOWFhYzYxOGRiYTllZjQ5YjJjMTllM1wiXG4gICAgfSxcbiAgICBcImZkZGRmMDJkMzYyZGIzOTdhMjUxMDRiYzdjMzdlMzg3ZjdkMThiYmFcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkp1bmdsZSBHcmVlbiAwMyBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiNGJiYTVhNjFmZjMzYzU0ZDY3NTM2MGZhYjM4MTkwNzk3ZWI2MzJkZlwiXG4gICAgfSxcbiAgICBcIjUwNTY2YmQ4ZjBjNzFiYjgwYzZjYmRhMDM5NTY0ZjRlODY0NmY0OWRcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlBlcnNpbW1vbiAwMSBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZDNlZjBjM2ExMjVlZjRiMDcxMjEwY2Q2NTZjNDc0MGQ4OTFiNTExZlwiXG4gICAgfSxcbiAgICBcIjUyNWUwMzMzOGJmMDFiMzgwYjI1ODI2MWJlMDRmZmEwMWYxYTE0ZjRcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlBlcnNpbW1vbiAwMiBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMWMzNTgwNmNkZGZiYTIyZGZmOGE1MmRmNWRkZjEzYmMwNTFmM2RjZlwiXG4gICAgfSxcbiAgICBcIjU3YTQ3NmE1Yjc1NDk4NDMyZDdlNmQ4MGEyZGFlZWUyZWVmOTBjYzVcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkRvZGdlciBCbHVlIDAxIFtkYXldXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCI5M2Y0NzRmZjQ2YWY0YzI2N2YwZGFmYzU1YjI1NGE2NmE0MTc0MmM5XCJcbiAgICB9LFxuICAgIFwiMzlmNTM2YTU0M2QyNWI1NjNlOWFmODA0NDFjMjBkM2VjOTE5YjQ2ZlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiRG9kZ2VyIEJsdWUgMDIgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcImU5NDY4MmEwNzQyYjQ4Zjc5NTg4NDcxZmY3ZDJjMGJjMWViZDBmNGRcIlxuICAgIH0sXG4gICAgXCI5MTQ3NTg3Yzk0Y2RjZDMzZDRjY2Y5MmZkMzkzZjVjZWJjOTk5ZjUxXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJEb2RnZXIgQmx1ZSAwMyBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiZmZkMzU0NzY5NWFjNWI3MGRhNTdiMTRmNDA5MWQ1OWRiMjQyMzVmOVwiXG4gICAgfSxcbiAgICBcIjM0OTk2MmQ2ODdlNjBlMTVlMzRhN2JkYWRjOWViYzBjZjFiMDkzY2JcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkxpbWEgMDEgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjlmOWY5NTNhOTkzNzIwZWFiOGMyZjA5Y2RmZTcxODhhOTRlM2MxOWZcIlxuICAgIH0sXG4gICAgXCIyMDdjZjk3MmQ0ZmY2NWZhNzRhMDk0ZDBiZmFmOGE2YzY1ODg5NmVkXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJIZWxpb3Ryb3BlIDAxIFtkYXldXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIwMzA2OTUwMmU5MWE2OWJjZmE4NzBkNGJkZjgxOGZlODFiNDY5ZjVkXCJcbiAgICB9LFxuICAgIFwiZDM3ZWZkMTNlNmJlMmI1MDg1Nzk1NTk1NmViMjBlMTlhMTViMmIxNVwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiSGVsaW90cm9wZSAwMiBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiYTI5MjJiY2UxMGQ3OWFmZTBmNjFkMmY2ODA0ZWYyZWQyZjdkNTRlMlwiXG4gICAgfSxcbiAgICBcIjNhYWM0MTE2NDhhMjRiNDI3OTljZjg4ZDFiY2JkNDM1YjZiYzk0ZmJcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIkhlbGlvdHJvcGUgMDMgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcImFhNTEwZmFiYWI5ZTZlN2M1OWVlMDRiZjlhNGI3MTEwM2I1NTA0ODFcIlxuICAgIH0sXG4gICAgXCIwMmViN2NiNDNiYTJiNDcxNzhiM2ZjOWI2OGU3MzMxNGRiODQ3ZDk4XCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJNYWxpYnUgMDEgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjBkMzdlMjQyMDQxYTFlYjFiNTE5ZTJmZDczYmRlOGZjYTgxNzk0MDRcIlxuICAgIH0sXG4gICAgXCIyMDQyNmZiNDAxZTE5MjMyYzM2ZmY5MmFkOTQwNTI0YTFlMzBkODdkXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJUZXhhcyBSb3NlIDAxIFtkYXldXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCIxNTg5Y2ZmMjhlMjJiMTBiOGQxY2Q3MTRhODhkY2Y4YWM0YTExNDAzXCJcbiAgICB9LFxuICAgIFwiMmE4NDliZDZkZDkwYzFkYmU2ZjkwNjllMjk3ZTA4ZDExMWFlNmRkMlwiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiVGV4YXMgUm9zZSAwMiBbZGF5XVwiLFxuICAgICAgICBtYXBzVG9LZXk6IFwiMzU2MTIzYTdhMzViZTBlOWMzNzdhODA0ZjM2ZjNkNzFlNTIzZWE1YlwiXG4gICAgfSxcbiAgICBcIjhmZjdkYWViODJjZDIxZjEyNGNmMjllYjNjYWE2NDI5MWFlNDgyYzNcIjoge1xuICAgICAgICBjb21wb25lbnROYW1lOiBcIlRleGFzIFJvc2UgMDMgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjk2N2M4ZGIyMmFlY2IxNzYxNDkwM2RmMGM3YWM3MjYxZmJkOWE3YjFcIlxuICAgIH0sXG4gICAgXCIzMTlhMWQyMTI5OTJiNTE4ODAzNTQyMTRkMGFjMTgzODFkNmUyYjhiXCI6IHtcbiAgICAgICAgY29tcG9uZW50TmFtZTogXCJCcmlnaHQgU3VuIDAxIFtkYXldXCIsXG4gICAgICAgIG1hcHNUb0tleTogXCJhNWI3OGQwYTdjMGMxNjFkYjJjOTllOGVmYmRhZDA5N2IwNzJmYjkzXCJcbiAgICB9LFxuICAgIFwiYjQzMjAyMjAwYTA1NzlmZjhlZTE0NjY0Y2RlYmQzZDYyNWE5NDhiY1wiOiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IFwiV2hhbGUgW2RheV1cIixcbiAgICAgICAgbWFwc1RvS2V5OiBcIjkyMWFiYzU0Y2Y4MjUwYmIwYjg5YTM2MDE2ZTg4YmNlY2NkOWQ2YjFcIlxuICAgIH1cbn07XG5leHBvcnQgeyBsaWdodFRoZW1lIH07XG4iXSwic291cmNlUm9vdCI6IiJ9