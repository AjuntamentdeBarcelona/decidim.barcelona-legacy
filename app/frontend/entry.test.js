// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import sinon from 'sinon/pkg/sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import I18n from 'i18n-js';

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiEnzyme())

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()
global.I18n = I18n;

// ---------------------------------------
// Require Tests
// ---------------------------------------
let testsContext;

testsContext = require.context('./application/', true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);

testsContext = require.context('./proposals/', true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);

testsContext = require.context('./follows/', true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);
