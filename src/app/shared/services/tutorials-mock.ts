export const formulasListSourceCode = `(function() {
    "use strict";

    angular
        .module("beckon.steel.formulabuilder.controllers.formulasList", [
            "beckon.steel.formulabuilder.services.formulaService",
            "beckon.steel.formulabuilder.services.formulaTemplateService",
            "beckon.steel.dataNamespace",
            "beckon.steel.formulabuilder.directives.operandSelector",
            "beckon.steel.formulaBuilder.directives.formulaBuilder",
            "beckon.steel.environment.services.environmentService",
            "beckon.steel.grid.services.beckonGridFactory",
        ])
        .controller("formulasList", function(
            $scope,
            formulaTemplateService,
            formulaService,
            bnModalAlertService,
            bnStringService,
            environmentService,
            $resource,
            modalDialogService,
            beckonGridFactory,
            windowService,
            svg,
            dataNamespace,
            permissionService,
            permissions,
            formulaGridService,
            gridEventService
        ) {
            if ($scope.isTemplate) {
                $scope.baseUrl = environmentService.getRestAccountUrl("/formulaTemplate/list");
                $scope.operandMenu = formulaTemplateService.fetchMenus();
            } else {
                $scope.baseUrl = environmentService.getRestAccountUrl(
                    "/formula/:dataNamespace/list"
                );
                $scope.baseUrl = $scope.baseUrl.replace(
                    ":dataNamespace",
                    dataNamespace.DEFAULT_NAMESPACE
                );
                $scope.menus = formulaService.fetchMenus({ includeHiddenDimensions: true });
            }

            const moreActions = [
                {
                    displayText: "Delete",
                    icon: svg.TRASH,
                    action: function(formula) {
                        modalDialogService.showDialog({
                            bodyText:
                                'Are you sure you want to delete the formula titled, "' +
                                formula.displayInfo.name +
                                '"?',
                            headerText: "Confirm Delete",
                            positiveButton: {
                                text: "Confirm",
                                type: "danger",
                                callback: function() {
                                    handleDelete(formula);
                                },
                            },
                            negativeButton: {
                                text: "Cancel",
                            },
                        });
                    },
                },
                {
                    displayText: "Copy",
                    icon: svg.TRANSFORM,
                    action: function(formula) {
                        const formulaCopy = angular.copy(formula);
                        formulaCopy.id = null;
                        formulaCopy.displayInfo.name = bnStringService.getNewTitle(
                            formula.displayInfo.name
                        );
                        formulaCopy.humanId = bnStringService
                            .getNewTitle(formula.humanId)
                            .replace(/ /g, "");
                        return windowService.addWindow({
                            id: "duplicateFormulaWindow",
                            title: "Duplicate Formula",
                            customTemplateUrl: "duplicateFormula",
                            scope: {
                                formulaCopy: formulaCopy,
                            },
                            maxWidth: 450,
                            maxHeight: 335,
                            buttonList: [
                                {
                                    text: "Submit",
                                    buttonColorClass: "primary",
                                    handleClick: function(
                                        btnCfg,
                                        event,
                                        windowIdInstance,
                                        windowScope
                                    ) {
                                        copyFormula(windowScope.formulaCopy, formula);
                                        windowService.closeWindow(windowIdInstance);
                                    },
                                },
                            ],
                        });
                    },
                },
            ];

            function templateCallback(rowId) {
                formulaService
                    .createFormulaTemplate(rowId)
                    .$promise.then(function(statusObj) {
                        bnModalAlertService.clearAlerts().setAlert({
                            type: "success",
                            msgSafeHtml: statusObj.message,
                        });
                    })
                    .catch(function() {
                        bnModalAlertService.setAlert({
                            type: "error",
                            msgSafeHtml: "This calculated metric template could not be created.",
                        });
                    });
            }
            if (permissionService.hasPermission(permissions.SYNC_TEMPLATES_TO_ACCOUNT)) {
                moreActions.push({
                    displayText: "Template",
                    icon: svg.EXPORT,
                    action: (row) => {
                        const humanId = row.humanId;
                        const displayName = row.displayInfo.name;
                        formulaService
                            .fetchFormulaTemplateByHumanId(humanId)
                            .$promise.then((templateDTO) => {
                                //if there is a template, it should return the template info which includes template id.
                                if (templateDTO.humanId) {
                                    modalDialogService.showDialog({
                                        bodyText: \`The template "\${displayName}" with humanId "\${humanId}" already exists. Are you sure you want to overwrite it?\`,
                                        headerText: "Confirm Templatization",
                                        statusIcon: {
                                            icon: svg.CIRCLE_EXCLAMATION,
                                            style: "svg-icon--attention",
                                        },
                                        positiveButton: {
                                            text: "Confirm",
                                            callback: () => {
                                                templateCallback(row.id);
                                            },
                                        },
                                    });
                                } else {
                                    templateCallback(row.id);
                                }
                            });
                    },
                });
            }

            function handleDelete(formula) {
                if ($scope.isTemplate) {
                    formulaTemplateService.deleteFormula(formula).$promise.then(
                        function(form) {
                            formulaTemplateService
                                .fetchAll()
                                .$promise.then(function(formulaTemplates) {
                                    $scope.gridConfig.data = formulaTemplates;
                                    $scope.$broadcast(gridEventService.refreshData);
                                    bnModalAlertService.setAlert({
                                        type: "success",
                                        msgSafeHtml:
                                            "Your formula " +
                                            form.displayInfo.name +
                                            " was deleted.",
                                    });
                                });
                        },
                        function() {
                            bnModalAlertService.setAlert({
                                type: "error",
                                msgSafeHtml: "This formula could not be deleted.",
                            });
                        }
                    );
                } else {
                    formulaService.deleteFormula(formula).$promise.then(
                        function(form) {
                            formulaService
                                .fetchAll(dataNamespace.DEFAULT_NAMESPACE)
                                .$promise.then(function(formulas) {
                                    $scope.gridConfig.data = formulas;
                                    $scope.$broadcast(gridEventService.refreshData);
                                    bnModalAlertService.setAlert({
                                        type: "success",
                                        msgSafeHtml:
                                            "Your formula " +
                                            form.displayInfo.name +
                                            " was deleted.",
                                    });
                                });
                        },
                        function() {
                            bnModalAlertService.setAlert({
                                type: "error",
                                msgSafeHtml: "This formula could not be deleted.",
                            });
                        }
                    );
                }
            }

            function copyFormula(newFormula, formula) {
                if ($scope.isTemplate) {
                    formulaTemplateService.new(newFormula).$promise.then(
                        function() {
                            formulaTemplateService
                                .fetchAll()
                                .$promise.then(function(formulaTemplates) {
                                    $scope.gridConfig.data = formulaTemplates;
                                    $scope.$broadcast(gridEventService.refreshData);
                                    bnModalAlertService.setAlert({
                                        type: "success",
                                        msgSafeHtml:
                                            "Your formula " +
                                            formula.displayInfo.name +
                                            " was duplicated.",
                                    });
                                });
                        },
                        function() {
                            bnModalAlertService.setAlert({
                                type: "error",
                                msgSafeHtml: "This formula could not be duplicated.",
                            });
                        }
                    );
                } else {
                    newFormula.isCustomFormula = true;
                    formulaService.new(newFormula).$promise.then(
                        function() {
                            formulaService
                                .fetchAll(dataNamespace.DEFAULT_NAMESPACE)
                                .$promise.then(function(formulas) {
                                    $scope.gridConfig.data = formulas;
                                    $scope.$broadcast(gridEventService.refreshData);
                                    bnModalAlertService.setAlert({
                                        type: "success",
                                        msgSafeHtml:
                                            "Your formula " +
                                            formula.displayInfo.name +
                                            " was duplicated.",
                                    });
                                });
                        },
                        function() {
                            bnModalAlertService.setAlert({
                                type: "error",
                                msgSafeHtml: "This formula could not be duplicated.",
                            });
                        }
                    );
                }
            }

            $scope.columnList = [
                "formula",
                "privacyLevel",
                "description",
                "humanId",
                "priority",
                "formatType",
                "currencySymbol",
                "goal",
                "frequency",
                "channel",
                "dataFrom",
                "dataThrough",
                "isCustomFormula",
                "moreActions",
            ];

            $scope.gridConfig = _.extend(
                beckonGridFactory.generateGridConfig($scope, "FormulasListGrid", "formulas"),
                {
                    resource: $resource($scope.baseUrl),
                    rowClickState: "formulas.formula",
                    rowClickParams: {
                        id: "id",
                        isTemplate: "isCustomFormula",
                    },
                }
            );

            const columnDefinitions = formulaGridService.columnDefinitions;

            columnDefinitions.moreActions = {
                field: "",
                displayName: "",
                width: "50px",
                hideText: true,
                actionArray: moreActions,
                customTemplate:
                    '<dropdown-option-list row="row" index="rowIndex" action-array="column.actionArray"></dropdown-option-list>',
            };

            $scope.columnConfig = formulaGridService.generateColumnConfigFromColumnList(
                columnDefinitions,
                $scope.columnList
            );

            $scope.onDropdownPickerSelect = function(e) {
                $scope.formula.operand = e.selection.operand;
                $scope.$digest();
            };
        });
})();
`;

export const formulasListInitialWorkingCode = `describe("formulasList", () => {
  // Don't forget to inject mocks and dependencies
});
`;

export const formulasListAnswerCode = `describe("formulasList", () => {
    // Don't forget to inject mocks and dependencies

    describe('controller initialization', () => {
    });

    describe("moreActions[0].action", () => {
    });

    describe("moreActions[1].action", () => {
    });

    describe("moreActions[2].action", () => {
    });

    describe("onDropdownPickerSelect", () => {
    });
});
`;

export const formulasListAnswerCode2 = `describe("formulasList", () => {
    // Don't forget to inject mocks and dependencies

    describe('controller initialization', () => {
      it("should set $scope.baseUrl when isTemplate is defined", () => {
      });

      it("should set $scope.baseUrl when isTemplate is not defined", () => {
      });
    });

    describe("moreActions[0].action", () => {
      it("should call handleDelete", () => {
      });
    });

    describe("moreActions[1].action", () => {
      it("should call handleClick", () => {
      });
    });


    describe("moreActions[2].action", () => {
      it("should call showDialog when templateDTO.humandId is present", () => {
      });

      it("should call templateCallback when templateDTO.humandId is not present", () => {
      });
    });

    describe("onDropdownPickerSelect", () => {
      it("should call $scope.digest", () => {
      });
    });
});
`;

export const formulasListAnswerCode3 = `describe("formulasList", () => {
    // Don't forget to inject mocks and dependencies

    describe('controller initialization', () => {
      it("should set $scope.baseUrl when isTemplate is defined", () => {
      });

      it("should set $scope.baseUrl when isTemplate is not defined", () => {
      });
    });

    describe("moreActions[0].action", () => {
      describe("handleDelete", () => {
        it("should call setAlert when $scope.isTemplate is present", () => {
        });

        describe("$scope.isTemplate is not present", () => {
          it("should call setAlert when deleteFormula.$promise and formulaService.fetchAll.$promise resolve", () => {
          });

          it("should call setAlert when deleteFormula.$promise rejects", () => {
          });
        });
      });
    });

    describe("moreActions[1].action", () => {
      describe("$scope.isTemplate is present", () => {
        it("should call setAlert when formulaTemplateService.new.$promise and formulaService.fetchAll.$promise resolve", () => {
        });

        it("should call setAlert when formulaTemplateService.new.$promise rejects", () => {
        });
      });

      describe("$scope.isTemplate is not present", () => {
        it("should call setAlert when formulaTemplateService.new.$promise and formulaService.fetchAll.$promise resolve", () => {
        });

        it("should call setAlert when formulaTemplateService.new.$promise rejects", () => {
        });
      });
    });


    describe("moreActions[2].action", () => {
      it("should call showDialog when templateDTO.humandId is present", () => {
      });

      describe("templateCallbakc", () => {
        it("should call setAlert when formulaService.createFormulaTemplate resolves", () => {
        });

        it("should call setAlert when formulaService.createFormulaTemplate rejects", () => {
        });
      });
    });

    describe("onDropdownPickerSelect", () => {
      it("should call $scope.digest", () => {
      });
    });
});
`;
