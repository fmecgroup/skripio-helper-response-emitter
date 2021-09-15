'use strict';
import languages from './modules/languages.js';

/**
* **A response emitter object.**
* @param {string} responseDOMElementSelector DOM element selector that will be used to emit async responses.
*/
export default class ResponseEmitter {
  constructor (responseDOMElementSelector) {
    try {
      this._responseDiv = document.querySelector(responseDOMElementSelector);
    } catch (error) {
      throw new Error(error.message);
    }

    if (!this._responseDiv) {
      throw new Error(`Failed to instantiate ResponseEmitter. '${responseDOMElementSelector}' is not a valid selector.`);
    }

    this._languageCodes = languages.map((element) => {
      return element.code;
    });
  }

  /**
  * **`ResponseEmitter.codes` constants.**
  * - **DONE** - 200
  * - **RESULT** - 201
  * - **USER_ERROR** - 300
  * - **DEV_ERROR** - 400
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
  * **Generates 1C formatted notification message from phrases in different languages.**
  * @param {object} phrases Object that contains phrases in different languages where **key** must be language code and **value** contains phrase in that language.
  * @returns {string} Formatted text or an empty string if object provided contains no keys with language codes listed in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).
  * @example
  * {
  *   ru: 'Сообщение на Русском языке.',
  *   en: 'Message in English language.'
  * }
  */
  get1cFormattedMessage (phrases) {
    if (!phrases || typeof phrases !== 'object') {
      throw new Error('Invalid phrases object.');
    }

    let result = '';

    for (const [key, value] of Object.entries(phrases)) {
      if (this._languageCodes.includes(key)) {
        result += `${key} = '${value}';`;
      }
    }

    return result;
  }

  /**
  * **Generates response structure. Emits click event with payload of required.**
  * @param {*} id Any attribute to be placed against id key of the return structure.
  * @param {*} code Any attribute to be placed against code key of the return structure.
  * @param {*} message Any attribute to be placed against message key of the return structure.
  * @param {boolean} click If truthy then click event with payload will be emitted. No event emitting otherwise.
  * @returns {string} response structure stringified.
  */
  emitResponse (id, code, message, click = false) {
    const result = JSON.stringify({
      id: id,
      code: code,
      message: message
    });

    if (click) {
      this._responseDiv.innerText = result;
      this._responseDiv.click();
    }

    return result;
  }
}
