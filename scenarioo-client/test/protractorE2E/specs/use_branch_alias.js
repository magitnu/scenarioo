'use strict';

var scenarioo = require('scenarioo-js');
var pages = require('./../webPages');

var BRANCH_WIKI = 'Production';
var NUMBER_OF_ALIASES_IN_CONFIG = 2;
var FIRST_TEST_ALIAS_INDEX = NUMBER_OF_ALIASES_IN_CONFIG;

useCase('Use branch aliases')
    .description('Select a branch by using an alias')
    .describe(function () {

        var homePage = new pages.homePage();
        var branchAliasesPage = new pages.branchAliasesPage();
        var usecasePage = new pages.usecasePage();
        var scenarioPage = new pages.scenarioPage();
        var stepPage = new pages.stepPage();

        beforeEach(function () {
            new pages.homePage().initLocalStorage();
        });

        scenario('Select branch by alias')
            .description('Create an alias and assert browsing through steps works')
            .it(function () {

                branchAliasesPage.goToPage();
                branchAliasesPage.enterAlias('Latest dev', 'wikipedia-docu-example', 'alias to latest development release');
                branchAliasesPage.save();
                step('Create new branch alias');

                branchAliasesPage.chooseBranch('Latest dev');
                step('choose branch alias');

                homePage.goToPage();
                homePage.selectUseCase(1);
                usecasePage.selectScenario(0);
                scenarioPage.openStepByName('Step 1: Wikipedia Suche');
                stepPage.assertPreviousStepIsDisabled();
                step('browse step using branch alias');

                // Restore initial state for other tests
                branchAliasesPage.goToPage();
                branchAliasesPage.deleteAlias(FIRST_TEST_ALIAS_INDEX);
                branchAliasesPage.save();
                branchAliasesPage.chooseBranch(BRANCH_WIKI);
            });

    });
