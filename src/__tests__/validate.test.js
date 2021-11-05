import { validate } from '../validate.js';
import { expect } from '@esm-bundle/chai';

function isString (val) {
  return typeof val === 'string';
}

function isEven (val) {
  return val % 2 === 0;
}

function isDivisiableByFive (val) {
  return val % 5 === 0;
}

var rules = {
  a: isString,
  b: [isEven, isDivisiableByFive ]
}

it('runs a predicate on a matching key', () => {
  let source = {
     a: 'x',
     b: 30,
     c: 'foobar'
  }
  let result = validate(rules, source)
  expect(result).to.deep.equal({ src: source, exceptions: [] })
})

it('collects exceptions', () => {
  let source = {
     a: 'x',
     b: 35,
     c: 'foobar'
  }
  let result = validate(rules, source)
  expect(result).to.deep.equal({ src: source, exceptions: [{ b: 'failed on isEven' }] })
})

it('throws if rules function is not valid', () => {
  let source = {
     a: 'x',
     b: 35,
     c: 'foobar'
  }
  expect(() => {
    validate(source, rules)
  }).to.throw()
});
