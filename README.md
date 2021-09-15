[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard)

# About

A unified way to emit responses for [1C:Enterprise](https://www.1ci.com/developers/) platform.

Allows to generate both **sync** and **async** responses. 

Uses custom dictionaries for response texts.

# The essentials

**Skripio** `ResponseEmitter` prepares and emits response message payload to `1C:Enterprise` platform.

Steps:

1. Response payload is wrapped in an unified message structure:
```javascript
    { 
        callback: 'callback identifier', 
        code: 'response code', 
        payload: "message payload" 
    }
```
- **callback** - contains callback identifier that allows to link function calls to responses when executing asynchronous code in `JS` from `1C:Enterprise`.
- **code** - Response code.
- **payload** - Message payload.
2. 

# Installation

- dictionaries in skripio.options

# Usage