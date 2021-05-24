/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js';

 describe('find length' , () => {
     // Test current length of history stack before pushToHistory
     test('current length of history stack before pushToHistory', () => {
         expect(history.length).toBe(1);
     });
     // Test length of history stack after pushToHistory with entry
     test('length of history stack after pushToHistory with entry', () => {
         expect((pushToHistory('entry', 11).length)).toBe(2);
     });
     // Test current state object after pushing entry to history
     test('current state object', () => {
         expect(history.state.page).toMatch(/entry/);
     })
     // Test length of history stack after pushToHistory with settings
     test('length of history stack after pushToHistory with entry', () => {
         expect((pushToHistory('settings').length)).toBe(3);
     });
     // Test current state object after pushing settings to history
     test('current state object', () => {
         expect(history.state.page).toMatch(/settings/);
     })
     // Test length of history stack after pushToHistory with ''
     test('length of history stack after pushToHistory with entry', () => {
         expect((pushToHistory().length)).toBe(4);
     });
     // Test current state object after pushing '' to history
     test('current state object', () => {
         expect(history.state).toStrictEqual({});
     })
 });
 