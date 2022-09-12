const input = ' -a-b-c|';
const expected = '-- 9ms a 9ms b 9ms (c|)';
import { TestScheduler } from 'rxjs/testing';
import { throttleTime } from 'rxjs';
import { concatMap, of, delay } from 'rxjs';
const testScheduler = new TestScheduler((actual, expected) => {
  // asserting the two objects are equal - required
  // for TestScheduler assertions to work via your test framework
  // e.g. using chai.
  return actual === expected;
});
// Depending on your personal preferences you could also
// use frame dashes to keep vertical alignment with the input.
// const input = ' -a-b-c|';
// const expected = '------- 4ms a 9ms b 9ms (c|)';
// or
// const expected = '-----------a 9ms b 9ms (c|)';
testScheduler.run((helpers) => {
  const {
    cold,
    hot,
    expectObservable,
    expectSubscriptions,
    flush,
    time,
    animate,
  } = helpers;
  // use them
  const result = cold(input).pipe(concatMap((d) => of(d).pipe(delay(10))));
  console.log('expected:', expected);
  expectObservable(result).toBe(expected);
});
