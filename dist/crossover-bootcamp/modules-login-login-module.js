(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-login-login-module"],{

/***/ "./src/app/modules/login/login-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/modules/login/login-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: LoginRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRoutingModule", function() { return LoginRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_modules_login_pages_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/login/pages/login/login.component */ "./src/app/modules/login/pages/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: src_app_modules_login_pages_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"],
        pathMatch: 'full'
    }
];
var LoginRoutingModule = /** @class */ (function () {
    function LoginRoutingModule() {
    }
    LoginRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LoginRoutingModule);
    return LoginRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/login/login.module.ts":
/*!***********************************************!*\
  !*** ./src/app/modules/login/login.module.ts ***!
  \***********************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_modules_login_login_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/login/login-routing.module */ "./src/app/modules/login/login-routing.module.ts");
/* harmony import */ var src_app_modules_login_pages_login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/login/pages/login/login.component */ "./src/app/modules/login/pages/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                src_app_modules_login_pages_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]
            ],
            imports: [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                src_app_modules_login_login_routing_module__WEBPACK_IMPORTED_MODULE_3__["LoginRoutingModule"]
            ],
            exports: []
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ }),

/***/ "./src/app/modules/login/pages/login/login.component.html":
/*!****************************************************************!*\
  !*** ./src/app/modules/login/pages/login/login.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"page\">\r\n  <header class=\"header\">\r\n    <div class=\"wrapper\">\r\n      <div class=\"left\">\r\n        <a href=\"https://www.crossover.com\"\r\n          class=\"logo\"\r\n          target=\"_blank\">REMOTEU</a>\r\n      </div>\r\n    </div>\r\n  </header>\r\n\r\n  <div class=\"content wrapper\">\r\n    <div class=\"left\">\r\n      <div class=\"image\"></div>\r\n      <div class=\"info\">\r\n        <div class=\"info-left\">\r\n          <h1>Earn While You Learn&hellip;</h1>\r\n\r\n          <p>\r\n            Crossover’s RemoteU is a specially designed place where you can learn many new techniques,\r\n            adopt Crossover’s remote work philosophy and at the same time earn money while gathering new skills.\r\n          </p>\r\n        </div>\r\n        <div class=\"info-right\">\r\n          <h1>Graduate Fast&hellip;</h1>\r\n\r\n          <p>\r\n            Crossover’s RemoteU is split into four weeks of special\r\n            training. Each week is dedicated to different tasks which will\r\n            help you hone your skills.\r\n          </p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"right d-flex flex-column justify-content-between\">\r\n      <div class=\"mt-5 px-5\">\r\n        <h1 class=\"mb-3 text-left\">Sign Up Today!</h1>\r\n        <h2 class=\"mt-0 mb-1\">Management RemoteU</h2>\r\n        <button mat-raised-button\r\n          class=\"login mb-2\">CLICK HERE\r\n        </button>\r\n        <h2 class=\"mb-1 mt-4\">Engineering RemoteU</h2>\r\n        <button mat-raised-button\r\n          class=\"login\">CLICK HERE\r\n        </button>\r\n      </div>\r\n\r\n      <div class=\"d-flex py-5 d-flex flex-column align-items-center\">\r\n        <h1 class=\"mb-1 text-center\">Already Signed Up?</h1>\r\n        <div id=\"my-signin2\"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"success wrapper\">\r\n    <h1>Success Stories</h1>\r\n\r\n    <div class=\"wrapper-inner\">\r\n      <div class=\"comment\">\r\n        <p>\r\n          I have found RemoteU to be a great place to work on real-life challenging assignments.\r\n          I have received great support and my RemoteU SEM coaching has helped me in polishing my skills and making me adapt to\r\n          the company's culture. After the RemoteU training, I was immediately sent a job offer from Ignite Technologies.\r\n          I am now very happy to be part of this great company.\r\n        </p>\r\n\r\n        <p class=\"signature\">\r\n          Milos Sretin\r\n          <span>Chief Software Architect</span><br/>\r\n          Product: FirstRain Project\r\n        </p>\r\n      </div>\r\n\r\n      <div class=\"avatar\"></div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"video\">\r\n    <div class=\"wrapper\">\r\n      <h1>Introduction</h1>\r\n\r\n      <p>\r\n        Before you begin, please take a look at RemoteU's introduction video.\r\n        This will help you understand more about RemoteU and what to expect in the next four weeks.\r\n      </p>\r\n\r\n      <iframe height=\"400px\"\r\n        width=\"800px\"\r\n        class=\"my-3 video-player\"\r\n        src=\"https://www.youtube.com/embed/VZBpkXWXlf0\">\r\n      </iframe>\r\n      <p>\r\n        Also, be sure to check how you will benefit from RemoteU <a href=\"https://medium.com/@crossoverforwork/remote-camp-rigorous-training-results-in-crossover-careers-64cb9a6cb748\" target=\"_blank\">here</a>.\r\n      </p>\r\n      <br>\r\n      <p>We wish you good luck in your journey of becoming a Crossover's Elite Team Member!</p>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"partners wrapper\">\r\n    <h1>After graduation, you can become a member of one of the biggest companies and work with the world’s greatest talents.</h1>\r\n\r\n    <img src=\"/assets/images/companies.png\" />\r\n  </div>\r\n\r\n  <div class=\"copyright wrapper\">\r\n    <p>Crossover is committed to securing and protecting your information. <a href=\"https://www.crossover.com/privacy-policy/\" target=\"_blank\">Privacy policy</a>.</p>\r\n    <p>© Crossover, 2019. All Rights Reserved.</p>\r\n\r\n    <a href=\"https://www.crossover.com\"\r\n      target=\"_blank\">\r\n      <img src=\"/assets/images/crossover-logo.png\" href=\"http://wwww.crossover.com\" width=\"180\" height=\"49\" />\r\n    </a>\r\n  </div>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/modules/login/pages/login/login.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/modules/login/pages/login/login.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".video-player {\n  align-self: center;\n  border-width: 0px; }\n\na {\n  color: #333; }\n\nsection.page .wrapper {\n  display: flex;\n  width: 1200px;\n  margin: auto; }\n\nsection.page header.header {\n  position: relative;\n  background: #F5F5F5;\n  height: 70px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);\n  z-index: 100; }\n\nsection.page header.header .left a.logo {\n    display: flex;\n    align-items: center;\n    width: 180px;\n    height: 50px;\n    background: url(\"/assets/images/crossover-logo.png\") center left no-repeat;\n    text-decoration: none;\n    color: #242424;\n    padding-left: 190px;\n    font-size: 22px;\n    line-height: 13px; }\n\nsection.page div.content {\n  display: flex; }\n\nsection.page div.content .left {\n    display: flex;\n    flex-direction: column;\n    flex-grow: 1; }\n\nsection.page div.content .left .image {\n      background: url(\"/assets/images/team.png\") center center no-repeat;\n      background-size: cover;\n      flex-grow: 1; }\n\nsection.page div.content .left .info {\n      display: flex;\n      color: #fff; }\n\nsection.page div.content .left .info h1 {\n        font-size: 16px;\n        margin: 0 0 20px; }\n\nsection.page div.content .left .info-left {\n        flex-grow: 1;\n        padding: 20px;\n        background: #22AAE3; }\n\nsection.page div.content .left .info-right {\n        padding: 20px;\n        background: #2295C6; }\n\nsection.page div.content .right {\n    width: 400px;\n    min-width: 400px;\n    max-width: 400px;\n    background: #F5F5F5;\n    height: 407px;\n    box-sizing: border-box; }\n\nsection.page div.content .right h1, section.page div.content .right h2 {\n      font-size: 16px;\n      margin: 0 0 20px;\n      text-align: center; }\n\nsection.page div.content .right h2 {\n      font-size: 14px;\n      color: #5A5A5A; }\n\nsection.page div.content .right .tab-content {\n      box-sizing: border-box;\n      padding: 20px 0; }\n\nsection.page div.content .right .tab-content p {\n        text-align: center; }\n\nsection.page div.content .right .tab-content mat-form-field {\n        width: 100%; }\n\nsection.page div.content .right ::ng-deep mat-checkbox {\n      display: inline-block;\n      margin: 0 0 40px; }\n\nsection.page div.content .right button.login {\n      background: #22AAE3;\n      width: 100%;\n      color: #fff; }\n\nsection.page div.content .right div.actions {\n      margin-top: 40px;\n      display: flex;\n      flex-direction: column;\n      align-items: center; }\n\nsection.page div.content .right div.actions a {\n        color: #242424;\n        text-decoration: none; }\n\nsection.page .video {\n  background: #22AAE3;\n  box-sizing: border-box;\n  padding: 40px;\n  color: #fff; }\n\nsection.page .video h1 {\n    text-align: center;\n    margin-bottom: 20px; }\n\nsection.page .video p {\n    display: block;\n    margin: 0 auto;\n    width: 600px;\n    text-align: center; }\n\nsection.page .video .wrapper {\n    flex-direction: column; }\n\nsection.page .video .wrapper video {\n      width: 800px;\n      margin: 20px auto; }\n\nsection.page .success {\n  padding: 40px;\n  justify-content: center;\n  flex-direction: column; }\n\nsection.page .success h1 {\n    text-align: center; }\n\nsection.page .success .wrapper-inner {\n    display: flex;\n    width: 900px;\n    align-self: center;\n    align-items: center; }\n\nsection.page .success .wrapper-inner .comment {\n      flex-grow: 1; }\n\nsection.page .success .wrapper-inner .comment p.signature {\n        font-style: italic;\n        color: #5A5A5A;\n        font-weight: 700; }\n\nsection.page .success .wrapper-inner .comment p.signature span {\n          font-weight: 300; }\n\nsection.page .success .wrapper-inner .avatar {\n      width: 160px;\n      min-width: 160px;\n      height: 160px;\n      background: url(\"/assets/images/avatar.jpg\") center center;\n      background-size: cover;\n      border-radius: 50%;\n      margin-left: 20px; }\n\nsection.page .success .wrapper-inner mat-icon {\n      display: block;\n      font-size: 52px;\n      margin: 0 20px;\n      width: 100px;\n      height: 52px; }\n\nsection.page .partners {\n  flex-direction: column;\n  padding: 40px;\n  justify-content: center; }\n\nsection.page .partners h1 {\n    font-size: 16px;\n    text-align: center; }\n\nsection.page .copyright {\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  padding: 0 0 40px; }\n\nsection.page .copyright p {\n    text-align: center;\n    margin: 0;\n    padding: 0; }\n\nsection.page .copyright p:last-child {\n      padding-bottom: 20px; }\n\nsection.page .copyright img {\n    margin-top: 20px;\n    display: block; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sb2dpbi9wYWdlcy9sb2dpbi9DOlxcVXNlcnNcXGRhbmllXFxEb2N1bWVudHNcXENyb3Nzb3ZlclxcWE8tQm9vdGNhbXAvc3JjXFxhcHBcXG1vZHVsZXNcXGxvZ2luXFxwYWdlc1xcbG9naW5cXGxvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQixFQUFBOztBQUduQjtFQUNFLFdBQVcsRUFBQTs7QUFHYjtFQUdJLGFBQWE7RUFDYixhQUFhO0VBQ2IsWUFBWSxFQUFBOztBQUxoQjtFQVNJLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLHNDQUE2QjtFQUM3QixZQUFZLEVBQUE7O0FBaEJoQjtJQW9CUSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixZQUFZO0lBQ1osMEVBQTBFO0lBQzFFLHFCQUFxQjtJQUNyQixjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixpQkFBaUIsRUFBQTs7QUE3QnpCO0VBbUNJLGFBQWEsRUFBQTs7QUFuQ2pCO0lBc0NNLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsWUFBWSxFQUFBOztBQXhDbEI7TUEyQ1Esa0VBQWtFO01BQ2xFLHNCQUFzQjtNQUN0QixZQUFZLEVBQUE7O0FBN0NwQjtNQWlEUSxhQUFhO01BQ2IsV0FBVyxFQUFBOztBQWxEbkI7UUFxRFUsZUFBZTtRQUNmLGdCQUFnQixFQUFBOztBQXREMUI7UUEwRFUsWUFBWTtRQUNaLGFBQWE7UUFDYixtQkFBbUIsRUFBQTs7QUE1RDdCO1FBZ0VVLGFBQWE7UUFDYixtQkFBbUIsRUFBQTs7QUFqRTdCO0lBdUVNLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2Isc0JBQXNCLEVBQUE7O0FBNUU1QjtNQStFUSxlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLGtCQUFrQixFQUFBOztBQWpGMUI7TUFxRlEsZUFBZTtNQUNmLGNBQWMsRUFBQTs7QUF0RnRCO01BMEZRLHNCQUFzQjtNQUN0QixlQUFlLEVBQUE7O0FBM0Z2QjtRQThGVSxrQkFBa0IsRUFBQTs7QUE5RjVCO1FBa0dVLFdBQVcsRUFBQTs7QUFsR3JCO01Bd0dVLHFCQUFxQjtNQUNyQixnQkFBZ0IsRUFBQTs7QUF6RzFCO01BOEdRLG1CQUFtQjtNQUNuQixXQUFXO01BQ1gsV0FBVyxFQUFBOztBQWhIbkI7TUFvSFEsZ0JBQWdCO01BQ2hCLGFBQWE7TUFDYixzQkFBc0I7TUFDdEIsbUJBQW1CLEVBQUE7O0FBdkgzQjtRQTBIVSxjQUFjO1FBQ2QscUJBQXFCLEVBQUE7O0FBM0gvQjtFQWtJSSxtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixXQUFXLEVBQUE7O0FBcklmO0lBd0lNLGtCQUFrQjtJQUNsQixtQkFBbUIsRUFBQTs7QUF6SXpCO0lBNklNLGNBQWM7SUFDZCxjQUFjO0lBQ2QsWUFBWTtJQUNaLGtCQUFrQixFQUFBOztBQWhKeEI7SUFvSk0sc0JBQXNCLEVBQUE7O0FBcEo1QjtNQXVKUSxZQUFZO01BQ1osaUJBQWlCLEVBQUE7O0FBeEp6QjtFQThKSSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLHNCQUFzQixFQUFBOztBQWhLMUI7SUFtS00sa0JBQWtCLEVBQUE7O0FBbkt4QjtJQXVLTSxhQUFhO0lBQ2IsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixtQkFBbUIsRUFBQTs7QUExS3pCO01BNktRLFlBQVksRUFBQTs7QUE3S3BCO1FBZ0xVLGtCQUFrQjtRQUNsQixjQUFjO1FBQ2QsZ0JBQWdCLEVBQUE7O0FBbEwxQjtVQXFMWSxnQkFBZ0IsRUFBQTs7QUFyTDVCO01BMkxRLFlBQVk7TUFDWixnQkFBZ0I7TUFDaEIsYUFBYTtNQUNiLDBEQUEwRDtNQUMxRCxzQkFBc0I7TUFDdEIsa0JBQWtCO01BQ2xCLGlCQUFpQixFQUFBOztBQWpNekI7TUFxTVEsY0FBYztNQUNkLGVBQWU7TUFDZixjQUFjO01BQ2QsWUFBWTtNQUNaLFlBQVksRUFBQTs7QUF6TXBCO0VBK01JLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsdUJBQXVCLEVBQUE7O0FBak4zQjtJQW9OTSxlQUFlO0lBQ2Ysa0JBQWtCLEVBQUE7O0FBck54QjtFQTBOSSxzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsaUJBQWlCLEVBQUE7O0FBOU5yQjtJQWlPTSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFVBQVUsRUFBQTs7QUFuT2hCO01Bc09RLG9CQUFvQixFQUFBOztBQXRPNUI7SUEyT00sZ0JBQWdCO0lBQ2hCLGNBQWMsRUFBQSIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvbG9naW4vcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudmlkZW8tcGxheWVyIHtcclxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XHJcbiAgYm9yZGVyLXdpZHRoOiAwcHg7XHJcbn1cclxuXHJcbmEge1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG5zZWN0aW9uLnBhZ2Uge1xyXG5cclxuICAud3JhcHBlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgd2lkdGg6IDEyMDBweDtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICB9XHJcblxyXG4gIGhlYWRlci5oZWFkZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYmFja2dyb3VuZDogI0Y1RjVGNTtcclxuICAgIGhlaWdodDogNzBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgNXB4IHJnYmEoIzAwMCwgLjUpO1xyXG4gICAgei1pbmRleDogMTAwO1xyXG5cclxuICAgIC5sZWZ0IHtcclxuICAgICAgYS5sb2dvIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgd2lkdGg6IDE4MHB4O1xyXG4gICAgICAgIGhlaWdodDogNTBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiB1cmwoXCIvYXNzZXRzL2ltYWdlcy9jcm9zc292ZXItbG9nby5wbmdcIikgY2VudGVyIGxlZnQgbm8tcmVwZWF0O1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICBjb2xvcjogIzI0MjQyNDtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDE5MHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgICAgICBsaW5lLWhlaWdodDogMTNweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGl2LmNvbnRlbnQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuXHJcbiAgICAubGVmdCB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgIGZsZXgtZ3JvdzogMTtcclxuXHJcbiAgICAgIC5pbWFnZSB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKFwiL2Fzc2V0cy9pbWFnZXMvdGVhbS5wbmdcIikgY2VudGVyIGNlbnRlciBuby1yZXBlYXQ7XHJcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgICAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5pbmZvIHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGNvbG9yOiAjZmZmO1xyXG5cclxuICAgICAgICBoMSB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgICAgICBtYXJnaW46IDAgMCAyMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi1sZWZ0IHtcclxuICAgICAgICAgIGZsZXgtZ3JvdzogMTtcclxuICAgICAgICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjMjJBQUUzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi1yaWdodCB7XHJcbiAgICAgICAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgICAgICAgYmFja2dyb3VuZDogIzIyOTVDNjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAucmlnaHQge1xyXG4gICAgICB3aWR0aDogNDAwcHg7XHJcbiAgICAgIG1pbi13aWR0aDogNDAwcHg7XHJcbiAgICAgIG1heC13aWR0aDogNDAwcHg7XHJcbiAgICAgIGJhY2tncm91bmQ6ICNGNUY1RjU7XHJcbiAgICAgIGhlaWdodDogNDA3cHg7XHJcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcblxyXG4gICAgICBoMSwgaDIge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICBtYXJnaW46IDAgMCAyMHB4O1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaDIge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICBjb2xvcjogIzVBNUE1QTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLnRhYi1jb250ZW50IHtcclxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgICAgIHBhZGRpbmc6IDIwcHggMDtcclxuXHJcbiAgICAgICAgcCB7XHJcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXQtZm9ybS1maWVsZCB7XHJcbiAgICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIDo6bmctZGVlcCB7XHJcbiAgICAgICAgbWF0LWNoZWNrYm94IHtcclxuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgIG1hcmdpbjogMCAwIDQwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBidXR0b24ubG9naW4ge1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICMyMkFBRTM7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRpdi5hY3Rpb25zIHtcclxuICAgICAgICBtYXJnaW4tdG9wOiA0MHB4O1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgICAgICBhIHtcclxuICAgICAgICAgIGNvbG9yOiAjMjQyNDI0O1xyXG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnZpZGVvIHtcclxuICAgIGJhY2tncm91bmQ6ICMyMkFBRTM7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgcGFkZGluZzogNDBweDtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG5cclxuICAgIGgxIHtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIHAge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgIHdpZHRoOiA2MDBweDtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC53cmFwcGVyIHtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICAgIHZpZGVvIHtcclxuICAgICAgICB3aWR0aDogODAwcHg7XHJcbiAgICAgICAgbWFyZ2luOiAyMHB4IGF1dG87XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5zdWNjZXNzIHtcclxuICAgIHBhZGRpbmc6IDQwcHg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblxyXG4gICAgaDEge1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLndyYXBwZXItaW5uZXIge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICB3aWR0aDogOTAwcHg7XHJcbiAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcclxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICAgIC5jb21tZW50IHtcclxuICAgICAgICBmbGV4LWdyb3c6IDE7XHJcblxyXG4gICAgICAgIHAuc2lnbmF0dXJlIHtcclxuICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgICAgICAgIGNvbG9yOiAjNUE1QTVBO1xyXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuXHJcbiAgICAgICAgICBzcGFuIHtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5hdmF0YXIge1xyXG4gICAgICAgIHdpZHRoOiAxNjBweDtcclxuICAgICAgICBtaW4td2lkdGg6IDE2MHB4O1xyXG4gICAgICAgIGhlaWdodDogMTYwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKFwiL2Fzc2V0cy9pbWFnZXMvYXZhdGFyLmpwZ1wiKSBjZW50ZXIgY2VudGVyO1xyXG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgZm9udC1zaXplOiA1MnB4O1xyXG4gICAgICAgIG1hcmdpbjogMCAyMHB4O1xyXG4gICAgICAgIHdpZHRoOiAxMDBweDtcclxuICAgICAgICBoZWlnaHQ6IDUycHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5wYXJ0bmVycyB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgcGFkZGluZzogNDBweDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cclxuICAgIGgxIHtcclxuICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuY29weXJpZ2h0IHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAwIDAgNDBweDtcclxuXHJcbiAgICBwIHtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIHBhZGRpbmc6IDA7XHJcblxyXG4gICAgICAmOmxhc3QtY2hpbGQge1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW1nIHtcclxuICAgICAgbWFyZ2luLXRvcDogMjBweDtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/modules/login/pages/login/login.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/modules/login/pages/login/login.component.ts ***!
  \**************************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_shared_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/services/authentication.service */ "./src/app/shared/services/authentication.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(ngZone, router, authenticationService) {
        this.ngZone = ngZone;
        this.router = router;
        this.authenticationService = authenticationService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 40,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSuccess.bind(this),
            'onfailure': this.onFailure.bind(this)
        });
    };
    LoginComponent.prototype.onSuccess = function (googleUser) {
        this.login(googleUser.getAuthResponse().id_token);
    };
    LoginComponent.prototype.onFailure = function (error) {
        console.log(error);
    };
    LoginComponent.prototype.login = function (googleToken) {
        var _this = this;
        var email = 'poojan.trivedi@aurea.com';
        this.authenticationService.login(googleToken)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["flatMap"])(function (sessionToken) {
            localStorage.setItem('sessionToken', sessionToken);
            return _this.authenticationService.impersonate(email);
        }))
            .subscribe(function (sessionToken) {
            localStorage.setItem('sessionToken', sessionToken);
            _this.ngZone.run(function () { return _this.router.navigate(['/']); }).then();
        }, function (error) { return console.log(); });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/modules/login/pages/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/modules/login/pages/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            src_app_shared_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ })

}]);
//# sourceMappingURL=modules-login-login-module.js.map