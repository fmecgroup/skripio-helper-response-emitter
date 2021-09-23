'use strict';
import languages from './modules/languages.js';

const languageCodes = languages.map((element) => {
  return element.code;
});

/**
* **The response emitter object.**
* @param {object}             args                                    - Constructor arguments object.
* @param {string}             args.responseElementId                  - Id that will be assigned to the response DOM element.
* @param {(string|string[])}  args.responseElementClass               - CSS class(es) that will be assigned to the response DOM element.
* @param {string}             [args.parentElementSelector = 'body']   - Selector of a DOM element that response DOM element will be attached to.
*/
export default class ResponseEmitter {
  constructor ({ responseElementId, responseElementClass, parentElementSelector = 'body' }) {
    let parentDiv;

    try {
      parentDiv = document.querySelector(parentElementSelector);
    } catch (error) {
      throw new Error(error.message);
    }
    if (!parentDiv) {
      throw new Error(`Failed to instantiate ResponseEmitter. '${parentElementSelector}' is not a valid parent element selector.`);
    }
    if (!responseElementId) {
      throw new Error(`Failed to instantiate ResponseEmitter. '${responseElementId}' is not a valid id value.`);
    }

    this._responseDiv = document.createElement('div');
    this._responseDiv.id = responseElementId;

    if (responseElementClass) {
      this._responseDiv.classList.add(responseElementClass);
    }

    parentDiv.appendChild(this._responseDiv);
  }

  /**
  * **`ResponseEmitter.codes` constants.**
  * - **DONE**        - 200
  * - **RESULT**      - 201
  * - **USER_ERROR**  - 300
  * - **DEV_ERROR**   - 400
  */
  static get codes () {
    return {
      DONE: '200',
      RESULT: '201',
      USER_ERROR: '300',
      DEV_ERROR: '400'
    };
  }

  /**
  * **`ResponseEmitter.getUserMessage` static method generates 1C formatted notification message from phrases in different languages.**
  * @param    {object} phrases - Phrases Object that contains phrases in different languages where **key** must be language code and **value** contains phrase in that language.
  * @returns  {string} - Formatted text or an empty string if object provided contains no keys with language codes listed in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).
  * @example
  * {
  *   ru: 'Сообщение на Русском языке.',
  *   en: 'Message in English language.'
  * }
  */
  static getUserMessage (phrases) {
    if (!phrases || typeof phrases !== 'object') {
      throw new Error(`'${phrases}' phrase object is invalid.`);
    }

    let result;

    for (const [key, value] of Object.entries(phrases)) {
      if (languageCodes.includes(key)) {
        if(!result){
          result = `${key} = '${value}'`;
          continue;
        }
        result += `; ${key} = '${value}'`;
      }
    }

    return result;
  }

  /**
  * **Generates serialized response message object. Emits `click` event if required.**
  * @param    {*} id           - Any attribute to be placed against id key of the message object.
  * @param    {*} code         - Any attribute to be placed against code key of the message object.
  * @param    {*} payload      - Any attribute to be placed against payload key of the message object.
  * @param    {boolean} click  - If truthy then click event with serialized message object will be emitted. No event emitting otherwise.
  * @returns  {string}         - Response message object serialized.
  */
  emitResponse (id, code, payload, click = false) {
    const result = JSON.stringify({
      id: id,
      code: code,
      payload: payload
    });

    if (click) {
      this._responseDiv.innerText = result;
      this._responseDiv.click();
    }

    return result;
  }
}
