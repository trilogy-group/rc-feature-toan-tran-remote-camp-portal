(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./modules/dashboard/dashboard.module": [
		"./src/app/modules/dashboard/dashboard.module.ts",
		"modules-dashboard-dashboard-module"
	],
	"./modules/login/login.module": [
		"./src/app/modules/login/login.module.ts",
		"modules-login-login-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_layout_main_main_layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/layout/main/main-layout.component */ "./src/app/layout/main/main-layout.component.ts");
/* harmony import */ var src_app_shared_guards_authentication_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/guards/authentication.guard */ "./src/app/shared/guards/authentication.guard.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: src_app_layout_main_main_layout_component__WEBPACK_IMPORTED_MODULE_2__["MainLayoutComponent"],
        children: [
            {
                path: '',
                loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
                canActivate: [src_app_shared_guards_authentication_guard__WEBPACK_IMPORTED_MODULE_3__["AuthenticationGuard"]]
            }
        ]
    },
    {
        path: 'login',
        loadChildren: './modules/login/login.module#LoginModule'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var src_app_app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var src_app_layout_main_main_layout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/layout/main/main-layout.component */ "./src/app/layout/main/main-layout.component.ts");
/* harmony import */ var src_app_shared_guards_authentication_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/guards/authentication.guard */ "./src/app/shared/guards/authentication.guard.ts");
/* harmony import */ var src_app_shared_services_authentication_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/authentication.service */ "./src/app/shared/services/authentication.service.ts");
/* harmony import */ var src_app_shared_services_accomplishments_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/services/accomplishments.service */ "./src/app/shared/services/accomplishments.service.ts");
/* harmony import */ var _devfactory_ngx_df__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @devfactory/ngx-df */ "./node_modules/@devfactory/ngx-df/esm5/ngx-df.es5.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"],
                src_app_layout_main_main_layout_component__WEBPACK_IMPORTED_MODULE_5__["MainLayoutComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_0__["MatListModule"],
                _devfactory_ngx_df__WEBPACK_IMPORTED_MODULE_9__["DfSidebarModule"],
                src_app_app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_11__["SharedModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClientModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClientModule"]
            ],
            providers: [
                src_app_shared_guards_authentication_guard__WEBPACK_IMPORTED_MODULE_6__["AuthenticationGuard"],
                src_app_shared_services_authentication_service__WEBPACK_IMPORTED_MODULE_7__["AuthenticationService"],
                src_app_shared_services_accomplishments_service__WEBPACK_IMPORTED_MODULE_8__["AccomplishmentsService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/layout/main/main-layout.component.html":
/*!********************************************************!*\
  !*** ./src/app/layout/main/main-layout.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"page\">\r\n  <header class=\"header\">\r\n    <div class=\"left\">\r\n      <button \r\n        mat-icon-button\r\n        (click)=\"toggleSideBar()\"\r\n        class=\"drawer-toggle\">\r\n        <mat-icon>menu</mat-icon>\r\n      </button>\r\n\r\n      <div class=\"logo\">\r\n        RemoteU\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"center\"></div>\r\n\r\n    <div class=\"right\">\r\n      <button mat-icon-button [matMenuTriggerFor]=\"userMenu\" matTooltip=\"User Profile\">\r\n        <mat-icon class=\"avatar\">\r\n          <img src=\"https://www.infrascan.net/demo/assets/img/avatar5.png\" />\r\n        </mat-icon>\r\n      </button>\r\n\r\n      <mat-menu #userMenu=\"matMenu\">\r\n        <mat-divider></mat-divider>\r\n        <a mat-menu-item href=\"https://app.crossover.com/x/login\" target=\"_blank\">\r\n          Crossover Application\r\n          <mat-icon class=\"mat-right-icon\">open_in_new</mat-icon>\r\n        </a>\r\n        <mat-divider></mat-divider>\r\n        <!-- <button mat-menu-item (click)=\"logout()\">Log Out</button> -->\r\n        <a href=\"/login\" \r\n          onclick=\"signOut();\"\r\n          class=\"d-flex\"\r\n          style=\"padding: 0 16px; height: 48px;\"><div class=\"d-flex align-items-center\">\r\n            Sign out\r\n          </div>\r\n        </a>\r\n      </mat-menu>\r\n    </div>\r\n  </header>\r\n\r\n  <div class=\"center\">\r\n    <df-sidebar\r\n      #sideBar\r\n      [open]=\"false\"\r\n      [disableButton]=\"true\">\r\n      <df-sidebar-item \r\n        [hasIcon]=\"false\"\r\n        [hasNestedMenu]=\"false\">\r\n        <a\r\n          class=\"h5 d-flex align-items-center\"\r\n          [routerLink]=\"['/dashboard', '']\">\r\n          <mat-icon class=\"ml-1\">home</mat-icon>\r\n          <span class=\"ml-2\"\r\n            [class.d-none]=\"!sideBar.isOpen\">Accomplishments Dashboard</span>\r\n        </a>\r\n      </df-sidebar-item>\r\n    </df-sidebar>\r\n\r\n    <main class=\"col p-0\">\r\n      <router-outlet></router-outlet>\r\n    </main>\r\n  </div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/layout/main/main-layout.component.scss":
/*!********************************************************!*\
  !*** ./src/app/layout/main/main-layout.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "div.page {\n  display: flex;\n  flex-direction: column;\n  height: 100%; }\n  div.page .wrapper {\n    display: flex;\n    width: 1200px;\n    margin: auto; }\n  div.page header.header {\n    display: flex;\n    justify-content: space-between;\n    position: relative;\n    background: #22AAE3;\n    height: 70px;\n    min-height: 70px;\n    max-height: 70px;\n    align-items: center;\n    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n    z-index: 100; }\n  div.page header.header .left {\n      display: flex;\n      width: 212px;\n      background: #2295C6;\n      padding: 0 20px;\n      box-sizing: border-box;\n      align-self: stretch;\n      align-items: center;\n      color: #fff;\n      font-size: 18px; }\n  div.page header.header .center {\n      flex-grow: 1; }\n  div.page header.header .right {\n      padding: 0 20px;\n      box-sizing: border-box;\n      color: #fff; }\n  div.page header.header .right .avatar {\n        position: relative; }\n  div.page header.header .right .avatar img {\n          width: 100%;\n          height: 100%;\n          border-radius: 50%; }\n  div.page .center {\n    display: flex;\n    flex-grow: 1; }\n  div.page .center .left-sidebar {\n      width: 320px;\n      min-width: 320px;\n      box-sizing: border-box;\n      padding: 20px;\n      background: #2C2C2C;\n      color: #fff; }\n  div.page .center .left-sidebar a {\n        display: flex;\n        align-items: center;\n        padding: 10px 0;\n        color: #afafaf;\n        text-decoration: none; }\n  div.page .center .left-sidebar a mat-icon {\n          margin-right: 10px; }\n  div.page .center .left-sidebar a:hover {\n          cursor: pointer;\n          color: #fff; }\n  div.page .center .main {\n      flex-grow: 1; }\n  div.page footer.footer {\n    display: flex;\n    height: 50px;\n    background: #2C2C2C;\n    color: #5A5A5A;\n    align-items: center;\n    padding: 20px;\n    box-sizing: border-box; }\n  ::ng-deep mat-icon.mat-right-icon {\n  margin: 0 0 0 20px !important; }\n  ::ng-deep .df-sidebar__item-container > a {\n  padding: 11px 10px 11px 10px !important; }\n  ::ng-deep .df-sidebar {\n  margin-top: 1rem !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21haW4vQzpcXFVzZXJzXFxkYW5pZVxcRG9jdW1lbnRzXFxDcm9zc292ZXJcXFhPLUJvb3RjYW1wL3NyY1xcYXBwXFxsYXlvdXRcXG1haW5cXG1haW4tbGF5b3V0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixZQUFZLEVBQUE7RUFIZDtJQU1JLGFBQWE7SUFDYixhQUFhO0lBQ2IsWUFBWSxFQUFBO0VBUmhCO0lBWUksYUFBYTtJQUNiLDhCQUE4QjtJQUM5QixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixzQ0FBNkI7SUFDN0IsWUFBWSxFQUFBO0VBckJoQjtNQXdCTSxhQUFhO01BQ2IsWUFBWTtNQUNaLG1CQUFtQjtNQUNuQixlQUFlO01BQ2Ysc0JBQXNCO01BQ3RCLG1CQUFtQjtNQUNuQixtQkFBbUI7TUFDbkIsV0FBVztNQUNYLGVBQWUsRUFBQTtFQWhDckI7TUFvQ00sWUFBWSxFQUFBO0VBcENsQjtNQXdDTSxlQUFlO01BQ2Ysc0JBQXNCO01BQ3RCLFdBQVcsRUFBQTtFQTFDakI7UUE2Q1Esa0JBQWtCLEVBQUE7RUE3QzFCO1VBZ0RVLFdBQVc7VUFDWCxZQUFZO1VBQ1osa0JBQWtCLEVBQUE7RUFsRDVCO0lBeURJLGFBQWE7SUFDYixZQUFZLEVBQUE7RUExRGhCO01BNkRNLFlBQVk7TUFDWixnQkFBZ0I7TUFDaEIsc0JBQXNCO01BQ3RCLGFBQWE7TUFDYixtQkFBbUI7TUFDbkIsV0FBVyxFQUFBO0VBbEVqQjtRQXFFUSxhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLGVBQWU7UUFDZixjQUFjO1FBQ2QscUJBQXFCLEVBQUE7RUF6RTdCO1VBNEVVLGtCQUFrQixFQUFBO0VBNUU1QjtVQWdGVSxlQUFlO1VBQ2YsV0FBVyxFQUFBO0VBakZyQjtNQXVGTSxZQUFZLEVBQUE7RUF2RmxCO0lBNEZJLGFBQWE7SUFDYixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxtQkFBbUI7SUFDbkIsYUFBYTtJQUNiLHNCQUFzQixFQUFBO0VBSTFCO0VBRUksNkJBQTZCLEVBQUE7RUFGakM7RUFNSSx1Q0FBdUMsRUFBQTtFQU4zQztFQVVJLDJCQUEyQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L21haW4vbWFpbi1sYXlvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJkaXYucGFnZSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGhlaWdodDogMTAwJTtcclxuXHJcbiAgLndyYXBwZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHdpZHRoOiAxMjAwcHg7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgfVxyXG5cclxuICBoZWFkZXIuaGVhZGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMjJBQUUzO1xyXG4gICAgaGVpZ2h0OiA3MHB4O1xyXG4gICAgbWluLWhlaWdodDogNzBweDtcclxuICAgIG1heC1oZWlnaHQ6IDcwcHg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDVweCByZ2JhKCMwMDAsIC41KTtcclxuICAgIHotaW5kZXg6IDEwMDtcclxuXHJcbiAgICAubGVmdCB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIHdpZHRoOiAyMTJweDtcclxuICAgICAgYmFja2dyb3VuZDogIzIyOTVDNjtcclxuICAgICAgcGFkZGluZzogMCAyMHB4O1xyXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICBhbGlnbi1zZWxmOiBzdHJldGNoO1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5jZW50ZXIge1xyXG4gICAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLnJpZ2h0IHtcclxuICAgICAgcGFkZGluZzogMCAyMHB4O1xyXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuXHJcbiAgICAgIC5hdmF0YXIge1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHJcbiAgICAgICAgaW1nIHtcclxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmNlbnRlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1ncm93OiAxO1xyXG5cclxuICAgIC5sZWZ0LXNpZGViYXIge1xyXG4gICAgICB3aWR0aDogMzIwcHg7XHJcbiAgICAgIG1pbi13aWR0aDogMzIwcHg7XHJcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICAgIGJhY2tncm91bmQ6ICMyQzJDMkM7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG5cclxuICAgICAgYSB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHggMDtcclxuICAgICAgICBjb2xvcjogI2FmYWZhZjtcclxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcblxyXG4gICAgICAgIG1hdC1pY29uIHtcclxuICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLm1haW4ge1xyXG4gICAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb290ZXIuZm9vdGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMkMyQzJDO1xyXG4gICAgY29sb3I6ICM1QTVBNUE7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgcGFkZGluZzogMjBweDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgfVxyXG59XHJcblxyXG46Om5nLWRlZXAge1xyXG4gIG1hdC1pY29uLm1hdC1yaWdodC1pY29uIHtcclxuICAgIG1hcmdpbjogMCAwIDAgMjBweCAhaW1wb3J0YW50O1xyXG4gIH1cclxuXHJcbiAgLmRmLXNpZGViYXJfX2l0ZW0tY29udGFpbmVyID4gYSB7XHJcbiAgICBwYWRkaW5nOiAxMXB4IDEwcHggMTFweCAxMHB4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG5cclxuICAuZGYtc2lkZWJhciB7XHJcbiAgICBtYXJnaW4tdG9wOiAxcmVtICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/layout/main/main-layout.component.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/main/main-layout.component.ts ***!
  \******************************************************/
/*! exports provided: MainLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainLayoutComponent", function() { return MainLayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_shared_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/services/authentication.service */ "./src/app/shared/services/authentication.service.ts");
/* harmony import */ var _devfactory_ngx_df_sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @devfactory/ngx-df/sidebar */ "./node_modules/@devfactory/ngx-df/esm5/sidebar.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MainLayoutComponent = /** @class */ (function () {
    function MainLayoutComponent(_authenticationService) {
        this._authenticationService = _authenticationService;
    }
    MainLayoutComponent.prototype.logout = function () {
        this._authenticationService.logout();
    };
    MainLayoutComponent.prototype.toggleSideBar = function () {
        this.sideBar.toogleOpen();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('sideBar'),
        __metadata("design:type", _devfactory_ngx_df_sidebar__WEBPACK_IMPORTED_MODULE_2__["DfSidebar"])
    ], MainLayoutComponent.prototype, "sideBar", void 0);
    MainLayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main-layout',
            template: __webpack_require__(/*! ./main-layout.component.html */ "./src/app/layout/main/main-layout.component.html"),
            styles: [__webpack_require__(/*! ./main-layout.component.scss */ "./src/app/layout/main/main-layout.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_shared_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"]])
    ], MainLayoutComponent);
    return MainLayoutComponent;
}());



/***/ }),

/***/ "./src/app/shared/guards/authentication.guard.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/guards/authentication.guard.ts ***!
  \*******************************************************/
/*! exports provided: AuthenticationGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationGuard", function() { return AuthenticationGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_shared_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/authentication.service */ "./src/app/shared/services/authentication.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthenticationGuard = /** @class */ (function () {
    function AuthenticationGuard(_router, _authenticationService) {
        this._router = _router;
        this._authenticationService = _authenticationService;
    }
    AuthenticationGuard.prototype.canActivate = function (route, state) {
        if (this._authenticationService.isLoggedIn()) {
            return true;
        }
        else {
            this._router.navigate(['login']);
        }
        return false;
    };
    AuthenticationGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            src_app_shared_services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]])
    ], AuthenticationGuard);
    return AuthenticationGuard;
}());



/***/ }),

/***/ "./src/app/shared/ngx-custom.module.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/ngx-custom.module.ts ***!
  \*********************************************/
/*! exports provided: NgxDfRootModule, NgxDfCustom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxDfRootModule", function() { return NgxDfRootModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxDfCustom", function() { return NgxDfCustom; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _devfactory_ngx_df_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @devfactory/ngx-df/button */ "./node_modules/@devfactory/ngx-df/esm5/button.es5.js");
/* harmony import */ var _devfactory_ngx_df_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @devfactory/ngx-df/core */ "./node_modules/@devfactory/ngx-df/esm5/core.es5.js");
/* harmony import */ var _devfactory_ngx_df_grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @devfactory/ngx-df/grid */ "./node_modules/@devfactory/ngx-df/esm5/grid.es5.js");
/* harmony import */ var _devfactory_ngx_df_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @devfactory/ngx-df/label */ "./node_modules/@devfactory/ngx-df/esm5/label.es5.js");
/* harmony import */ var _devfactory_ngx_df_loading_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @devfactory/ngx-df/loading-spinner */ "./node_modules/@devfactory/ngx-df/esm5/loading-spinner.es5.js");
/* harmony import */ var _devfactory_ngx_df_sidebar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @devfactory/ngx-df/sidebar */ "./node_modules/@devfactory/ngx-df/esm5/sidebar.es5.js");
/* harmony import */ var _devfactory_ngx_df_table_paginator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @devfactory/ngx-df/table-paginator */ "./node_modules/@devfactory/ngx-df/esm5/table-paginator.es5.js");
/* harmony import */ var _devfactory_ngx_df_toaster__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @devfactory/ngx-df/toaster */ "./node_modules/@devfactory/ngx-df/esm5/toaster.es5.js");
/* harmony import */ var _devfactory_ngx_df_charts_pie__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @devfactory/ngx-df/charts/pie */ "./node_modules/@devfactory/ngx-df/esm5/charts/pie.es5.js");
/* harmony import */ var _devfactory_ngx_df_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @devfactory/ngx-df/card */ "./node_modules/@devfactory/ngx-df/esm5/card.es5.js");
/* harmony import */ var _devfactory_ngx_df_tooltip___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @devfactory/ngx-df/tooltip/ */ "./node_modules/@devfactory/ngx-df/esm5/tooltip.es5.js");
/* harmony import */ var _devfactory_ngx_df_charts_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @devfactory/ngx-df/charts/bar */ "./node_modules/@devfactory/ngx-df/esm5/charts/bar.es5.js");
/* harmony import */ var _devfactory_ngx_df_charts_line__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @devfactory/ngx-df/charts/line */ "./node_modules/@devfactory/ngx-df/esm5/charts/line.es5.js");
/* harmony import */ var _devfactory_ngx_df_group_toggle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @devfactory/ngx-df/group-toggle */ "./node_modules/@devfactory/ngx-df/esm5/group-toggle.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var NgxDfRootModule = /** @class */ (function () {
    function NgxDfRootModule() {
    }
    NgxDfRootModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _devfactory_ngx_df_card__WEBPACK_IMPORTED_MODULE_10__["DfCardModule"].forRoot(),
                _devfactory_ngx_df_sidebar__WEBPACK_IMPORTED_MODULE_6__["DfSidebarModule"].forRoot(),
                _devfactory_ngx_df_label__WEBPACK_IMPORTED_MODULE_4__["DfLabelModule"].forRoot(),
                _devfactory_ngx_df_button__WEBPACK_IMPORTED_MODULE_1__["DfButtonModule"].forRoot(),
                _devfactory_ngx_df_toaster__WEBPACK_IMPORTED_MODULE_8__["DfToasterModule"].forRoot({
                    autoCloseTime: 2500,
                    hasAutoCloseTime: false,
                }),
                _devfactory_ngx_df_loading_spinner__WEBPACK_IMPORTED_MODULE_5__["DfLoadingSpinnerModule"].forRoot({
                    type: _devfactory_ngx_df_loading_spinner__WEBPACK_IMPORTED_MODULE_5__["DfLoadingSpinnerTypes"].SLIM,
                    blur: false,
                }),
                _devfactory_ngx_df_grid__WEBPACK_IMPORTED_MODULE_3__["DfGridModule"].forRoot(),
                _devfactory_ngx_df_table_paginator__WEBPACK_IMPORTED_MODULE_7__["DfTablePaginatorModule"].forRoot({
                    showExcel: false,
                    showPdf: false,
                    showItemsPerPage: true,
                    itemsPerPageOptions: [15, 25, 50],
                }),
                _devfactory_ngx_df_core__WEBPACK_IMPORTED_MODULE_2__["DfCoreModule"],
                _devfactory_ngx_df_charts_pie__WEBPACK_IMPORTED_MODULE_9__["DfPieModule"].forRoot(),
                _devfactory_ngx_df_tooltip___WEBPACK_IMPORTED_MODULE_11__["DfToolTipModule"].forRoot(),
                _devfactory_ngx_df_charts_bar__WEBPACK_IMPORTED_MODULE_12__["DfBarModule"].forRoot(),
                _devfactory_ngx_df_charts_line__WEBPACK_IMPORTED_MODULE_13__["DfLineModule"].forRoot(),
                _devfactory_ngx_df_group_toggle__WEBPACK_IMPORTED_MODULE_14__["DfGroupToggleModule"].forRoot(),
            ],
            providers: [],
            exports: [
                _devfactory_ngx_df_card__WEBPACK_IMPORTED_MODULE_10__["DfCardModule"],
                _devfactory_ngx_df_sidebar__WEBPACK_IMPORTED_MODULE_6__["DfSidebarModule"],
                _devfactory_ngx_df_label__WEBPACK_IMPORTED_MODULE_4__["DfLabelModule"],
                _devfactory_ngx_df_button__WEBPACK_IMPORTED_MODULE_1__["DfButtonModule"],
                _devfactory_ngx_df_loading_spinner__WEBPACK_IMPORTED_MODULE_5__["DfLoadingSpinnerModule"],
                _devfactory_ngx_df_toaster__WEBPACK_IMPORTED_MODULE_8__["DfToasterModule"],
                _devfactory_ngx_df_grid__WEBPACK_IMPORTED_MODULE_3__["DfGridModule"],
                _devfactory_ngx_df_table_paginator__WEBPACK_IMPORTED_MODULE_7__["DfTablePaginatorModule"],
                _devfactory_ngx_df_charts_pie__WEBPACK_IMPORTED_MODULE_9__["DfPieModule"],
                _devfactory_ngx_df_tooltip___WEBPACK_IMPORTED_MODULE_11__["DfToolTipModule"],
                _devfactory_ngx_df_charts_bar__WEBPACK_IMPORTED_MODULE_12__["DfBarModule"],
                _devfactory_ngx_df_charts_line__WEBPACK_IMPORTED_MODULE_13__["DfLineModule"],
                _devfactory_ngx_df_group_toggle__WEBPACK_IMPORTED_MODULE_14__["DfGroupToggleModule"]
            ],
        })
    ], NgxDfRootModule);
    return NgxDfRootModule;
}());

var NgxDfCustom = /** @class */ (function () {
    function NgxDfCustom() {
    }
    NgxDfCustom.forRoot = function () {
        return { ngModule: NgxDfRootModule };
    };
    NgxDfCustom = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _devfactory_ngx_df_card__WEBPACK_IMPORTED_MODULE_10__["DfCardModule"],
                _devfactory_ngx_df_sidebar__WEBPACK_IMPORTED_MODULE_6__["DfSidebarModule"],
                _devfactory_ngx_df_label__WEBPACK_IMPORTED_MODULE_4__["DfLabelModule"],
                _devfactory_ngx_df_button__WEBPACK_IMPORTED_MODULE_1__["DfButtonModule"],
                _devfactory_ngx_df_loading_spinner__WEBPACK_IMPORTED_MODULE_5__["DfLoadingSpinnerModule"],
                _devfactory_ngx_df_toaster__WEBPACK_IMPORTED_MODULE_8__["DfToasterModule"],
                _devfactory_ngx_df_grid__WEBPACK_IMPORTED_MODULE_3__["DfGridModule"],
                _devfactory_ngx_df_table_paginator__WEBPACK_IMPORTED_MODULE_7__["DfTablePaginatorModule"],
                _devfactory_ngx_df_core__WEBPACK_IMPORTED_MODULE_2__["DfCoreModule"],
                _devfactory_ngx_df_charts_pie__WEBPACK_IMPORTED_MODULE_9__["DfPieModule"],
                _devfactory_ngx_df_tooltip___WEBPACK_IMPORTED_MODULE_11__["DfToolTipModule"],
                _devfactory_ngx_df_charts_bar__WEBPACK_IMPORTED_MODULE_12__["DfBarModule"],
                _devfactory_ngx_df_charts_line__WEBPACK_IMPORTED_MODULE_13__["DfLineModule"],
                _devfactory_ngx_df_group_toggle__WEBPACK_IMPORTED_MODULE_14__["DfGroupToggleModule"]
            ],
            exports: [
                _devfactory_ngx_df_card__WEBPACK_IMPORTED_MODULE_10__["DfCardModule"],
                _devfactory_ngx_df_sidebar__WEBPACK_IMPORTED_MODULE_6__["DfSidebarModule"],
                _devfactory_ngx_df_label__WEBPACK_IMPORTED_MODULE_4__["DfLabelModule"],
                _devfactory_ngx_df_button__WEBPACK_IMPORTED_MODULE_1__["DfButtonModule"],
                _devfactory_ngx_df_loading_spinner__WEBPACK_IMPORTED_MODULE_5__["DfLoadingSpinnerModule"],
                _devfactory_ngx_df_toaster__WEBPACK_IMPORTED_MODULE_8__["DfToasterModule"],
                _devfactory_ngx_df_grid__WEBPACK_IMPORTED_MODULE_3__["DfGridModule"],
                _devfactory_ngx_df_table_paginator__WEBPACK_IMPORTED_MODULE_7__["DfTablePaginatorModule"],
                _devfactory_ngx_df_core__WEBPACK_IMPORTED_MODULE_2__["DfCoreModule"],
                _devfactory_ngx_df_charts_pie__WEBPACK_IMPORTED_MODULE_9__["DfPieModule"],
                _devfactory_ngx_df_tooltip___WEBPACK_IMPORTED_MODULE_11__["DfToolTipModule"],
                _devfactory_ngx_df_charts_bar__WEBPACK_IMPORTED_MODULE_12__["DfBarModule"],
                _devfactory_ngx_df_charts_line__WEBPACK_IMPORTED_MODULE_13__["DfLineModule"],
                _devfactory_ngx_df_group_toggle__WEBPACK_IMPORTED_MODULE_14__["DfGroupToggleModule"]
            ],
        })
    ], NgxDfCustom);
    return NgxDfCustom;
}());



/***/ }),

/***/ "./src/app/shared/services/accomplishments.service.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/services/accomplishments.service.ts ***!
  \************************************************************/
/*! exports provided: AccomplishmentsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccomplishmentsService", function() { return AccomplishmentsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AccomplishmentsService = /** @class */ (function () {
    function AccomplishmentsService(http) {
        this.http = http;
        this.GET_PROFILE = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl + "/profile";
        this.GET_HARDEST_PROBLEMS = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl + "/ProfileHardestProblems";
        this.GET_PROFILE_ACCOMPLISHMENTS = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl + "/ProfileAccomplishments";
    }
    AccomplishmentsService.prototype.getAcomplishmentsDailyProgress = function () {
        var headers = this.createAuthorizationHeader();
        return this.http.get(this.GET_PROFILE_ACCOMPLISHMENTS, { headers: headers });
    };
    AccomplishmentsService.prototype.getHardestProblems = function () {
        var headers = this.createAuthorizationHeader();
        return this.http.get(this.GET_HARDEST_PROBLEMS, { headers: headers });
    };
    AccomplishmentsService.prototype.getProfile = function () {
        var headers = this.createAuthorizationHeader();
        return this.http.get(this.GET_PROFILE, { headers: headers });
    };
    AccomplishmentsService.prototype.createAuthorizationHeader = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Authorization': "Bearer " + localStorage.getItem('sessionToken'),
            'content-type': 'application/json',
        });
        return headers;
    };
    AccomplishmentsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AccomplishmentsService);
    return AccomplishmentsService;
}());



/***/ }),

/***/ "./src/app/shared/services/authentication.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/shared/services/authentication.service.ts ***!
  \***********************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(_router, http) {
        this._router = _router;
        this.http = http;
        this.userMock = {
            icName: 'John Smith',
            dateStarted: '2019/06/10',
            daysCompleted: 3,
            pipeline: 'QA Automation Engineer',
            deckUrl: '',
            tmsUrl: ''
        };
        this.LOGIN = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl + "/AuthenticationGoogleToken";
        this.IMPERSONATE = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl + "/Impersonation";
    }
    AuthenticationService.getToken = function () {
        return localStorage.getItem('sesssionToken');
    };
    AuthenticationService.prototype.setToken = function (token, userData) {
        localStorage.setItem('crossoverBootcampUserToken', token);
        localStorage.setItem('crossoverBootcampUserData', JSON.stringify(userData));
        localStorage.setItem('icName', this.userMock.icName);
        localStorage.setItem('dateStarted', this.userMock.dateStarted);
        localStorage.setItem('daysCompleted', this.userMock.daysCompleted.toString());
        localStorage.setItem('pipeLine', this.userMock.pipeline);
        localStorage.setItem('deckUrl', this.userMock.deckUrl);
        localStorage.setItem('tmsUrl', this.userMock.tmsUrl);
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        return !!localStorage.getItem('sessionToken');
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('sessionToken');
        signOut();
    };
    AuthenticationService.prototype.login = function (token) {
        var headers = this.getCommonHeaders();
        return this.http.post(this.LOGIN, JSON.stringify(token), { headers: headers });
    };
    AuthenticationService.prototype.impersonate = function (email) {
        var headers = this.getCommonHeadersWithAuthorization();
        return this.http.post(this.IMPERSONATE, JSON.stringify(email), { headers: headers });
    };
    AuthenticationService.prototype.getCommonHeaders = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'content-type': 'application/json',
            'accept': 'application/json'
        });
        return headers;
    };
    AuthenticationService.prototype.getCommonHeadersWithAuthorization = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('sessionToken'),
        });
        return headers;
    };
    AuthenticationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_custom_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ngx-custom.module */ "./src/app/shared/ngx-custom.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
                _ngx_custom_module__WEBPACK_IMPORTED_MODULE_4__["NgxDfCustom"],
            ],
            exports: [
                // Modules
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
                _ngx_custom_module__WEBPACK_IMPORTED_MODULE_4__["NgxDfCustom"],
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    envName: 'undefined',
    gitHash: 'GIT_HASH_PLACEHOLDER',
    apiUrl: '/api'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\danie\Documents\Crossover\XO-Bootcamp\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map