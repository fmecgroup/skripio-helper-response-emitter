/* Class provides unified way to send API responses via emitting DOM element click event. */
'use strict';
export default class ResponseEmitter {
  constructor (responseDOMElementSelector) {
    this._responseDiv = document.querySelector(responseDOMElementSelector);
  }

  /*
  * Get response codes constant values**
  * @returns {String} Response code value.
  */
  static get CODES () {
    return responseCodes;
  }

  /*
  * Get developer messages constant values**
  * @returns {String} Developer message text.
  */
  static get DEV_MESSAGES () {
    return devMessages;
  }

  /*
  * Get user messages constant values**
  * @returns {String} User message text.
  */
  static get USER_MESSAGES () {
    const result = {};
    for (const [key, value] of Object.entries(userMessages)) {
      result[key] = `ru = '${value.ru}';en = '${value.en}'`;
    }
    return result;
  }

  /*
  * Emits click event with response message structure**
  * @param id Any attribute to be placed against id key of the return structure.
  * @param code Any attribute to be placed against code key of the return structure.
  * @param message Any attribute to be placed against message key of the return structure.
  * @returns {String} response structure stringified.
  */
  emitResponse (id, code, message) {
    if (!this._responseDiv) {
      throw new Error('response DOM element is null. Unable to emit response.');
    }
    const result = JSON.stringify({
      id: id,
      code: code,
      message: message
    });

    this._responseDiv.innerText = result;
    this._responseDiv.click();
  }

  /*
  * Constructs and returns response message structure**
  * @param id Any attribute to be placed against id key of the return structure.
  * @param code Any attribute to be placed against code key of the return structure.
  * @param message Any attribute to be placed against message key of the return structure.
  * @returns {String} response structure stringified.
  */
  getResponse (id, code, message) {
    if (!this._responseDiv) {
      throw new Error('response DOM element is null. Unable to emit response.');
    }
    const result = JSON.stringify({
      id: id,
      code: code,
      message: message
    });
    return result;
  }
}

const responseCodes = {
  SUCCESS: '200',
  RESULT: '201',
  USER_ERROR: '300',
  DEV_ERROR: '400'
};

const userMessages = {
  MAP_API_LOAD_ERROR: {
    ru: 'Не удается загрузить модули отображения карт. Пожалуйста, проверьте подключение к сети интернет.',
    en: 'Failed to load map modules. Please check your internet connection.'
  },
  DATA_FORMAT_ERROR:
  {
    ru: 'Неверный формат данных.',
    en: 'Bad data format.'
  },
  POLYGON_GEOMETRY_ERROR: {
    ru: 'Ошибка чтения. GeoJSON не содержит фигуры вида Polygon или Multipolygon.',
    en: 'Read error. GeoJSON provided does not contain any Polygon or MultiPolygon Geometries.'
  },
  POLYGON_MERGE_ERROR: {
    ru: 'Ошибка слияния фигур. Пожалуйста, убедитесь, что контур, который вы пытаетесь слить с основным контуром, находится либо полностью внутри основного контура, либо за его пределами.',
    en: 'Failed to apply merge . Please make sure that shape you are trying to merge with main shape is either completely inside or outside of the main one.'
  }
};

const devMessages = {
  SUCCESS: 'Success',
  DONE: 'Done',
  BAD_MAP_PROVIDER: 'Map provider not supported',
  MAP_INIT_ERROR: 'Map is not initialized.',
  MAP_INITIALIZED: 'Map object has already been initialized. Unnessesary method call.',
  API_INITIALIZED: 'Map API has already been initialized. Unnessesary method call.',
  DM_INITIALIZED: 'Drawing mode is already initialized.',
  GOOGLE_API_INIT_ERROR: 'Google Maps API not initialized.',
  FEATURE_COUNT_ERROR: 'Collection passed contains more then one editable shape. Unable to init drawing mode.',
  DOM_ELEMENT_ERROR: 'Error quering provided DOM selector.',
  MAP_NAME_ERROR: 'Map name not specified.',
  METHOD_NAME_ERROR: 'Method name not specified.',
  MAP_OBJECT_ERROR: 'Map object with name provided does not exist.',
  METHOD_ERROR: 'Method is not a function',
  BAD_DATA_ERROR: 'Incorrect data format.',
  BAD_ARRAY: 'Argument is not an Array.',
  BAD_GEOMETRY: 'Geometry type is not supported.',
  BAD_ARGUMENTS: 'Unable to parse arguments string.',
  BAD_FEATURE_ID: 'Feature with this id can not be found on map',
  BAD_DRAWING_MODE: 'Drawing mode not supported',
  EMPTY_FEATURE_ID: 'Feature ID required',
  NO_ACTIVE_DRAWING_MODE: 'No active drawing mode'
};
