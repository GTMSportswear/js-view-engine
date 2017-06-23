import { ViewEngine } from './js-view-engine';
import { ajaxSuccess, ajaxResultNotFound, ajaxInvalidUrl } from './ajax-stubs';

QUnit.module('View module tests', {
  beforeEach: () => {
    window.currentVersion = 1;
  },
  afterEach: () => {
    localStorage.clear();
  }
});

QUnit.test('View.get() can output template', assert => {
  const done = assert.async(),
        viewEngine = new ViewEngine(ajaxSuccess);

  viewEngine.get('test-template.html', { color: 'red' }).then(html => {
    assert.equal(html.innerHTML, 'Color: red.');
    done();
  }).catch(() => {
    done();
  });
});

QUnit.test('View.get() errors out in catch if bad url', assert => {
  assert.expect(2);
  const done1 = assert.async(),
        done2 = assert.async(),
        view1 = new ViewEngine(ajaxResultNotFound),
        view2 = new ViewEngine(ajaxInvalidUrl);

  view1.get('bad-url', {}).then(done1).catch(msg => {
    assert.equal(msg, 'There was a problem with the request: NOT FOUND');
    done1();
  });

  view2.get(null, {}).then(done2).catch(msg => {
    assert.equal(msg, 'Not a valid URL.');
    done2();
  });
});

QUnit.test('View.get() adds template to cache', assert => {
  const done = assert.async(),
        view = new ViewEngine(ajaxSuccess);

  view.get('test-template.html', {}).then(() => {
    assert.equal(localStorage.length, 1);
    done();
  }).catch(done);
});

QUnit.test('View.get() should output blank varible when missing variables', assert => {
  const done = assert.async(),
        view = new ViewEngine(ajaxSuccess);

  view.get('test-template.html', { }).then(html => {
    assert.equal(html.innerHTML, 'Color: .');
    done();
  }).catch(done);
});

QUnit.test('Can serve views with different context and return correctly', assert => {
  assert.expect(4);
  const done1 = assert.async(),
        done2 = assert.async(),
        view = new ViewEngine(ajaxSuccess);
  
  view.get('test-template.html', { color: 'green' }).then(html => {
    assert.equal(html.innerHTML, 'Color: green.');
    assert.equal(localStorage.length, 1);
    done1();
  }).catch(done1);

  view.get('test-template.html', { color: 'red' }).then(html => {
    assert.equal(html.innerHTML, 'Color: red.');
    assert.equal(localStorage.length, 1);
    done2();
  }).catch(done2);
});

QUnit.test('Outdated view in localStorage, should bust cache and return new view', assert => {
  const done = assert.async(),
        viewEngine = new ViewEngine(ajaxSuccess),
        testText = JSON.stringify({
          currentVersion: window.currentVersion + 1,
          html: 'do not show me'
        });

  localStorage.setItem('test-template.html', testText);

  viewEngine.get('test-template.html', {}).then(html => {
    assert.notEqual(html.textContent, testText);
    done();
  }).catch(done);
});

QUnit.test('Can properly cache view in localStorage', assert => {
  const done = assert.async(),
        viewEngine = new ViewEngine(ajaxSuccess),
        testText = {
          currentVersion: window.currentVersion,
          html: 'show me'
        };

  localStorage.setItem('test-template.html', JSON.stringify(testText));

  viewEngine.get('test-template.html', {}).then(html => {
    assert.equal(html.textContent, testText.html);
    done();
  }).catch(done);
});
