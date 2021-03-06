'use strict';

var BaseWebPage = require('./baseWebPage.js'),
    util = require('util');

function StepPage(overridePath) {
    if (overridePath && overridePath.length > 0) {
        BaseWebPage.call(this, overridePath);
    } else {
        BaseWebPage.call(this, '/');
    }

    this.stepNavigation = element(by.css('div.step-navigation'));
}

util.inherits(StepPage, BaseWebPage);

// DISABLED
StepPage.prototype.assertPreviousStepIsDisabled = function () {
    this.assertElementIsDisabled('prevStepBtn');
};

StepPage.prototype.assertPreviousPageIsDisabled = function () {
    this.assertElementIsDisabled('prevPageBtn');
};

StepPage.prototype.assertNextStepIsDisabled = function () {
    this.assertElementIsDisabled('nextStepBtn');
};

StepPage.prototype.assertNextPageIsDisabled = function () {
    this.assertElementIsDisabled('nextPageBtn');
};

// ENABLED
StepPage.prototype.assertPreviousStepIsEnabled = function () {
    this.assertElementIsEnabled('prevStepBtn');
};

StepPage.prototype.assertPreviousPageIsEnabled = function () {
    this.assertElementIsEnabled('prevPageBtn');
};

StepPage.prototype.assertNextStepIsEnabled = function () {
    this.assertElementIsEnabled('nextStepBtn');
};

StepPage.prototype.assertNextPageIsEnabled = function () {
    this.assertElementIsEnabled('nextPageBtn');
};

StepPage.prototype.goToNextStep = function () {
    this.clickElementById('nextStepBtn');
};

StepPage.prototype.goToNextPage = function () {
    this.clickElementById('nextPageBtn');
};

StepPage.prototype.goToPreviousStep = function () {
    this.clickElementById('prevStepBtn');
};

StepPage.prototype.goToPreviousPage = function () {
    this.clickElementById('prevPageBtn');
};

StepPage.prototype.goToPreviousPageVariant = function () {
    this.clickElementById('prevPageVariantBtn');
};

StepPage.prototype.goToNextPageVariant = function () {
    this.clickElementById('nextPageVariantBtn');
};

StepPage.prototype.assertNextPageVariantButtonIsDisabled = function () {
    this.assertElementIsDisabled('nextPageVariantBtn');
};

StepPage.prototype.clickAllPageVariantsLink = function () {
    this.clickElementById('allPageVariants');
};


StepPage.prototype.assertErrorMessageIsShown = function () {
    expect(element(by.id('stepNotFoundErrorMessage')).isDisplayed()).toBeTruthy();
    expect(element(by.id('fallbackMessage')).isDisplayed()).toBeFalsy();
};

StepPage.prototype.assertFallbackMessageIsShown = function () {
    expect(element(by.id('fallbackMessage')).isDisplayed()).toBeTruthy();
    expect(element(by.id('stepNotFoundErrorMessage')).isDisplayed()).toBeFalsy();
};

StepPage.prototype.assertFallbackMessageContainsText = function (text) {
    expect(element(by.id('fallbackMessage')).getText()).toContain(text);
};

StepPage.prototype.assertScenarioLabelsContain = function (label) {
    expect(element(by.id('scenario-labels')).getInnerHtml()).toContain(label);
};

StepPage.prototype.clickShareThisPageLink = function () {
    element(by.id('shareThisPageLink')).click();
};

StepPage.prototype.clickHtmlTabButton = function () {
   element(by.id('html-tab')).click();
};

StepPage.prototype.clickScreenshotTabButton = function () {
    element(by.id('screenshot-tab')).click();
};

StepPage.prototype.assertHtmlTabIsHidden = function () {
    expect(element(by.id('html-tab')).isDisplayed()).toBe(false);
};

StepPage.prototype.assertHtmlSourceEquals = function (expected) {
    expect(element(by.id('html-source')).getText()).toBe(expected);
};

StepPage.prototype.assertStepLinksDialogVisible = function () {
    browser.wait(function () {
        return element(by.id('stepLinksDialog')).isDisplayed();
    }, 10000);
};

StepPage.prototype.assertPageVariantIndicatorValue = function (value) {
    var pageVariantIndicator = element(by.id('pageVariantIndicator'));
    expect(pageVariantIndicator.isDisplayed()).toBeTruthy();
    expect(pageVariantIndicator.getText()).toBe(value);
};

StepPage.prototype.openMetadataTabIfClosed = function (index) {
    var metadataPanelContentCss = '#metadata_panel_' + index + ' .metadata';

    browser.findElement(by.css(metadataPanelContentCss)).isDisplayed().then(function (displayed) {
        if (!displayed) {
            element(by.id('collapsable_panel_' + index)).click();
        }
    });
};

StepPage.prototype.clickOnLink = function (linkId) {
    element(by.id(linkId)).click();
};

StepPage.prototype.assertToolTipInBreadcrumb = function (expectedTooltip) {
    var toolTip = element(by.id('tooltip_1')).getAttribute('tooltip');
    expect(toolTip).toBe(expectedTooltip);
};

StepPage.prototype.assertScreenshotIsShown = function() {
    expect(element.all(by.className('sc-screenshot')).count()).toBe(1);
    expect(element(by.className('sc-screenshot')).isDisplayed()).toBeTruthy();
};

StepPage.prototype.assertNoScreenAnnotationsArePresent = function() {
  expect(element(by.className('sc-screenshot-annotation')).isPresent()).toBeFalsy();
};

StepPage.prototype.assertNoScreenAnnotationsAreVisible = function() {
    expect(element.all(by.className('sc-screenshot-annotation')).isDisplayed()).toEqual([false, false]);
};

StepPage.prototype.assertNumberOfVisibleScreenAnnotationsIs = function(expectedNumberOfScreenAnnotations) {
    expect(element.all(by.className('sc-screenshot-annotation')).count()).toBe(expectedNumberOfScreenAnnotations);
    element.all(by.className('sc-screenshot-annotation')).each(function(element) {
        expect(element.isDisplayed()).toBe(true);
    });
};

StepPage.prototype.clickShowScreenAnnotationsButton = function() {
    element(by.id('sc-showHideScreenAnnotationsButton')).click();
};

StepPage.prototype.clickFirstScreenAnnotation = function() {
    element.all(by.className('sc-screnshot-annotation-icon')).first().click();
};

StepPage.prototype.assertScreenAnnotationPopupIsDisplayed = function() {
    expect(element(by.className('modal-content')).isDisplayed()).toBe(true);
};

StepPage.prototype.assertTitleOfAnnotationPopupIs = function(expectedTitle) {
    expect(element(by.className('modal-header')).getText()).toEqual(expectedTitle);
};

StepPage.prototype.clickCreateSketchButton = function() {
    element(by.id('sketchThis')).click();
};

StepPage.prototype.assertHtmlSourceEquals = function (expected) {
    expect(element(by.id('html-source')).getText()).toBe(expected);
};

StepPage.prototype.clickComparisonTabButton = function () {
    element(by.id('comparison-tab')).click();
};


StepPage.prototype.clickShowHighlightsButton = function () {
    element(by.id('sc-show-highlights-button')).click();
};

StepPage.prototype.clickHideHighlightsButton = function () {
    element(by.id('sc-hide-highlights-button')).click();
};

StepPage.prototype.clickSideBySideViewButton = function () {
    element(by.id('sc-side-by-side-view-button')).click();
};

StepPage.prototype.clickSinglePageViewButton = function () {
    element(by.id('sc-single-page-view-button')).click();
};

StepPage.prototype.clickSwitchToComparisonScreenshotButton = function () {
    element(by.id('sc-switch-to-comparison-screenshot-button')).click();
};

StepPage.prototype.clickSwitchToBaseScreenshotButton = function () {
    element(by.id('sc-switch-to-base-screenshot-button')).click();
};

StepPage.prototype.clickExpandAllPagesButton = function () {
    element(by.id('expandAllPages')).click();
};

StepPage.prototype.assertNoDiffInfoDisplayed = function () {
    expect(element(by.id('comparison-tab')).isPresent()).toBeFalsy();
};

StepPage.prototype.assertStepComparisonSideBySideViewIsActive= function () {
    expect(element(by.id('sc-side-by-side-view-button')).getAttribute('class')).toContain('active');
    expect(element(by.id('sc-single-page-view-button')).getAttribute('class')).not.toContain('active');
    expect(element(by.id('sc-step-comparison-side-by-side-view')).isPresent()).toBeTruthy();
    expect(element(by.id('sc-step-comparison-single-page-view')).isPresent()).toBeFalsy();
};

StepPage.prototype.assertStepComparisonSinglePageViewIsActive= function () {
    expect(element(by.id('sc-side-by-side-view-button')).getAttribute('class')).not.toContain('active');
    expect(element(by.id('sc-single-page-view-button')).getAttribute('class')).toContain('active');
    expect(element(by.id('sc-step-comparison-side-by-side-view')).isPresent()).toBeFalsy();
    expect(element(by.id('sc-step-comparison-single-page-view')).isPresent()).toBeTruthy();
};

StepPage.prototype.assertStepComparisonShowHighlightsButtonIsDisplayed= function () {
    expect(element(by.id('sc-show-highlights-button')).isDisplayed()).toBeTruthy();
    expect(element(by.id('sc-hide-highlights-button')).isDisplayed()).toBeFalsy();
    expect(element(by.id('sc-show-highlights-button')).getAttribute('disabled')).toBeNull();
    expect(element(by.id('sc-hide-highlights-button')).getAttribute('disabled')).toBeNull();
};

StepPage.prototype.assertStepComparisonHideHighlightsButtonIsDisplayed= function () {
    expect(element(by.id('sc-show-highlights-button')).isDisplayed()).toBeFalsy();
    expect(element(by.id('sc-hide-highlights-button')).isDisplayed()).toBeTruthy();
    expect(element(by.id('sc-show-highlights-button')).getAttribute('disabled')).toBeNull();
    expect(element(by.id('sc-hide-highlights-button')).getAttribute('disabled')).toBeNull();
};

StepPage.prototype.assertStepComparisonHighlightsButtonIsDisabled= function () {
    expect(element(by.id('sc-show-highlights-button')).getAttribute('disabled')).toEqual('true');
    expect(element(by.id('sc-hide-highlights-button')).getAttribute('disabled')).toEqual('true');
};

StepPage.prototype.assertStepComparisonSwitchToComparisonScreenshotButtonIsDisplayed = function () {
    expect(element(by.id('sc-switch-to-comparison-screenshot-button')).isDisplayed()).toBeTruthy();
    expect(element(by.id('sc-switch-to-base-screenshot-button')).isDisplayed()).toBeFalsy();
};

StepPage.prototype.assertStepComparisonSwitchToBaseScreenshotButtonIsDisplayed = function () {
    expect(element(by.id('sc-switch-to-comparison-screenshot-button')).isDisplayed()).toBeFalsy();
    expect(element(by.id('sc-switch-to-base-screenshot-button')).isDisplayed()).toBeTruthy();
};

StepPage.prototype.assertStepComparisonSwitchToComparisonScreenshotButtonIsDisabled = function () {
    expect(element(by.id('sc-switch-to-comparison-screenshot-button')).getAttribute('disabled')).toEqual('true');
};

StepPage.prototype.assertStepComparisonScreenshotSrcEquals = function (expected) {
    expect(element(by.css('.sc-comparison-screenshot img')).getAttribute('src')).toContain(expected);
};

StepPage.prototype.assertStepNoComparisonScreenshot = function (expected) {
    expect(element(by.css('.sc-comparison-screenshot img')).isPresent()).toBeFalsy();
};

StepPage.prototype.assertStepBaseScreenshotSrcEquals = function (expected) {
    expect(element(by.css('.sc-base-screenshot img')).getAttribute('src')).toContain(expected);
};

StepPage.prototype.assertFirstChangedPageDiffIconHasValue = function () {
    expect(element(by.css('.step-view div:first-child .sc-step-in-overview .sc-scenario-page-title .diff-info-wrapper span')).getText()).toContain('%');
};

StepPage.prototype.assertFirstChangedStepDiffIconHasValue = function () {
    expect(element(by.css('.step-view div:first-child .sc-step-in-overview:first-child .step-title span')).getText()).toContain('%');
};

StepPage.prototype.assertAddedPageDiffIconTextEqualsAdded = function () {
    expect(element(by.css('div.sc-step-in-overview.added:first-of-type .sc-scenario-page-title span.added')).getText()).toContain('added');
};

StepPage.prototype.assertAddedStepDiffIconTextEqualsAdded = function () {
    expect(element(by.css('div.sc-step-in-overview.added:first-of-type .step-title:first-of-type span.added')).getText()).toContain('added');
};

StepPage.prototype.assertRemovedPageDiffIconTextEqualsRemoved = function () {
    expect(element(by.css('div.sc-step-in-overview.removed:first-of-type .sc-scenario-page-title span.removed')).getText()).toContain('removed');
};

StepPage.prototype.assertRemovedStepDiffIconTextEqualsRemoved = function () {
    expect(element(by.css('div.sc-step-in-overview.removed:first-of-type .step-title:first-of-type span.removed')).getText()).toContain('removed');
};

module.exports = StepPage;
