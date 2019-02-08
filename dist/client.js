/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/yjs/build/yjs.js":
/*!***************************************!*\
  !*** ./node_modules/yjs/build/yjs.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @module utils
 */

const structs = new Map();
const references = new Map();

/**
 * Register a new Yjs types. The same type must be defined with the same
 * reference on all clients!
 *
 * @param {Number} reference
 * @param {Function} structConstructor
 *
 * @public
 */
const registerStruct = (reference, structConstructor) => {
  structs.set(reference, structConstructor);
  references.set(structConstructor, reference);
};

/**
 * @private
 */
const getStruct = (reference) => {
  return structs.get(reference)
};

/**
 * @private
 */
const getStructReference = (typeConstructor) => {
  return references.get(typeConstructor)
};

/**
 * @module globals
 */

/* eslint-env browser */

const Uint8Array_ = Uint8Array;

const createUint8ArrayFromLen = len => new Uint8Array_(len);

/**
 * Create Uint8Array with initial content from buffer
 */
const createUint8ArrayFromBuffer = (buffer, byteOffset, length) => new Uint8Array_(buffer, byteOffset, length);

/**
 * Create Uint8Array with initial content from buffer
 */
const createUint8ArrayFromArrayBuffer = arraybuffer => new Uint8Array_(arraybuffer);

/**
 * @module decoding
 */

/**
 * A Decoder handles the decoding of an ArrayBuffer.
 */
class Decoder {
  /**
   * @param {ArrayBuffer} buffer Binary data to decode
   */
  constructor (buffer) {
    this.arr = new Uint8Array(buffer);
    this.pos = 0;
  }
}

/**
 * @function
 * @param {ArrayBuffer} buffer
 * @return {Decoder}
 */
const createDecoder = buffer => new Decoder(buffer);

/**
 * @function
 * @param {Decoder} decoder
 * @return {boolean}
 */
const hasContent = decoder => decoder.pos !== decoder.arr.length;

/**
 * Clone a decoder instance.
 * Optionally set a new position parameter.
 *
 * @function
 * @param {Decoder} decoder The decoder instance
 * @param {number} [newPos] Defaults to current position
 * @return {Decoder} A clone of `decoder`
 */
const clone = (decoder, newPos = decoder.pos) => {
  let _decoder = createDecoder(decoder.arr.buffer);
  _decoder.pos = newPos;
  return _decoder
};

/**
 * Read `len` bytes as an ArrayBuffer.
 * @function
 * @param {Decoder} decoder The decoder instance
 * @param {number} len The length of bytes to read
 * @return {ArrayBuffer}
 */
const readArrayBuffer = (decoder, len) => {
  const arrayBuffer = createUint8ArrayFromLen(len);
  const view = createUint8ArrayFromBuffer(decoder.arr.buffer, decoder.pos, len);
  arrayBuffer.set(view);
  decoder.pos += len;
  return arrayBuffer.buffer
};

/**
 * Read variable length payload as ArrayBuffer
 * @function
 * @param {Decoder} decoder
 * @return {ArrayBuffer}
 */
const readPayload = decoder => readArrayBuffer(decoder, readVarUint(decoder));

/**
 * Read the rest of the content as an ArrayBuffer
 * @function
 * @param {Decoder} decoder
 * @return {ArrayBuffer}
 */
const readTail = decoder => readArrayBuffer(decoder, decoder.arr.length - decoder.pos);

/**
 * Skip one byte, jump to the next position.
 * @function
 * @param {Decoder} decoder The decoder instance
 * @return {number} The next position
 */
const skip8 = decoder => decoder.pos++;

/**
 * Read one byte as unsigned integer.
 * @function
 * @param {Decoder} decoder The decoder instance
 * @return {number} Unsigned 8-bit integer
 */
const readUint8 = decoder => decoder.arr[decoder.pos++];

/**
 * Read 4 bytes as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const readUint32 = decoder => {
  let uint =
    decoder.arr[decoder.pos] +
    (decoder.arr[decoder.pos + 1] << 8) +
    (decoder.arr[decoder.pos + 2] << 16) +
    (decoder.arr[decoder.pos + 3] << 24);
  decoder.pos += 4;
  return uint
};

/**
 * Look ahead without incrementing position.
 * to the next byte and read it as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const peekUint8 = decoder => decoder.arr[decoder.pos];

/**
 * Read unsigned integer (32bit) with variable length.
 * 1/8th of the storage is used as encoding overhead.
 *  * numbers < 2^7 is stored in one bytlength
 *  * numbers < 2^14 is stored in two bylength
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.length
 */
const readVarUint = decoder => {
  let num = 0;
  let len = 0;
  while (true) {
    let r = decoder.arr[decoder.pos++];
    num = num | ((r & 0b1111111) << len);
    len += 7;
    if (r < 1 << 7) {
      return num >>> 0 // return unsigned number!
    }
    if (len > 35) {
      throw new Error('Integer out of range!')
    }
  }
};

/**
 * Look ahead and read varUint without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {number}
 */
const peekVarUint = decoder => {
  let pos = decoder.pos;
  let s = readVarUint(decoder);
  decoder.pos = pos;
  return s
};

/**
 * Read string of variable length
 * * varUint is used to store the length of the string
 *
 * Transforming utf8 to a string is pretty expensive. The code performs 10x better
 * when String.fromCodePoint is fed with all characters as arguments.
 * But most environments have a maximum number of arguments per functions.
 * For effiency reasons we apply a maximum of 10000 characters at once.
 *
 * @function
 * @param {Decoder} decoder
 * @return {String} The read String.
 */
const readVarString = decoder => {
  let remainingLen = readVarUint(decoder);
  let encodedString = '';
  while (remainingLen > 0) {
    const nextLen = remainingLen < 10000 ? remainingLen : 10000;
    const bytes = new Array(nextLen);
    for (let i = 0; i < nextLen; i++) {
      bytes[i] = decoder.arr[decoder.pos++];
    }
    encodedString += String.fromCodePoint.apply(null, bytes);
    remainingLen -= nextLen;
  }
  return decodeURIComponent(escape(encodedString))
};

/**
 * Look ahead and read varString without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {string}
 */
const peekVarString = decoder => {
  let pos = decoder.pos;
  let s = readVarString(decoder);
  decoder.pos = pos;
  return s
};

var decoding = /*#__PURE__*/Object.freeze({
  Decoder: Decoder,
  createDecoder: createDecoder,
  hasContent: hasContent,
  clone: clone,
  readArrayBuffer: readArrayBuffer,
  readPayload: readPayload,
  readTail: readTail,
  skip8: skip8,
  readUint8: readUint8,
  readUint32: readUint32,
  peekUint8: peekUint8,
  readVarUint: readVarUint,
  peekVarUint: peekVarUint,
  readVarString: readVarString,
  peekVarString: peekVarString
});

/**
 * @module encoding
 */

const bits7 = 0b1111111;
const bits8 = 0b11111111;

/**
 * A BinaryEncoder handles the encoding to an ArrayBuffer.
 */
class Encoder {
  constructor () {
    this.cpos = 0;
    this.cbuf = createUint8ArrayFromLen(1000);
    this.bufs = [];
  }
}

/**
 * @function
 * @return {Encoder}
 */
const createEncoder = () => new Encoder();

/**
 * The current length of the encoded data.
 *
 * @function
 * @param {Encoder} encoder
 * @return {number}
 */
const length = encoder => {
  let len = encoder.cpos;
  for (let i = 0; i < encoder.bufs.length; i++) {
    len += encoder.bufs[i].length;
  }
  return len
};

/**
 * Transform to ArrayBuffer. TODO: rename to .toArrayBuffer
 *
 * @function
 * @param {Encoder} encoder
 * @return {ArrayBuffer} The created ArrayBuffer.
 */
const toBuffer = encoder => {
  const uint8arr = createUint8ArrayFromLen(length(encoder));
  let curPos = 0;
  for (let i = 0; i < encoder.bufs.length; i++) {
    let d = encoder.bufs[i];
    uint8arr.set(d, curPos);
    curPos += d.length;
  }
  uint8arr.set(createUint8ArrayFromBuffer(encoder.cbuf.buffer, 0, encoder.cpos), curPos);
  return uint8arr.buffer
};

/**
 * Write one byte to the encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The byte that is to be encoded.
 */
const write = (encoder, num) => {
  if (encoder.cpos === encoder.cbuf.length) {
    encoder.bufs.push(encoder.cbuf);
    encoder.cbuf = createUint8ArrayFromLen(encoder.cbuf.length * 2);
    encoder.cpos = 0;
  }
  encoder.cbuf[encoder.cpos++] = num;
};

/**
 * Write one byte at a specific position.
 * Position must already be written (i.e. encoder.length > pos)
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos Position to which to write data
 * @param {number} num Unsigned 8-bit integer
 */
const set = (encoder, pos, num) => {
  let buffer = null;
  // iterate all buffers and adjust position
  for (let i = 0; i < encoder.bufs.length && buffer === null; i++) {
    const b = encoder.bufs[i];
    if (pos < b.length) {
      buffer = b; // found buffer
    } else {
      pos -= b.length;
    }
  }
  if (buffer === null) {
    // use current buffer
    buffer = encoder.cbuf;
  }
  buffer[pos] = num;
};

/**
 * Write one byte as an unsigned integer.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeUint8 = (encoder, num) => write(encoder, num & bits8);

/**
 * Write one byte as an unsigned Integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */
const setUint8 = (encoder, pos, num) => set(encoder, pos, num & bits8);

/**
 * Write two bytes as an unsigned integer.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeUint16 = (encoder, num) => {
  write(encoder, num & bits8);
  write(encoder, (num >>> 8) & bits8);
};
/**
 * Write two bytes as an unsigned integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */
const setUint16 = (encoder, pos, num) => {
  set(encoder, pos, num & bits8);
  set(encoder, pos + 1, (num >>> 8) & bits8);
};

/**
 * Write two bytes as an unsigned integer
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeUint32 = (encoder, num) => {
  for (let i = 0; i < 4; i++) {
    write(encoder, num & bits8);
    num >>>= 8;
  }
};

/**
 * Write two bytes as an unsigned integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */
const setUint32 = (encoder, pos, num) => {
  for (let i = 0; i < 4; i++) {
    set(encoder, pos + i, num & bits8);
    num >>>= 8;
  }
};

/**
 * Write a variable length unsigned integer.
 *
 * Encodes integers in the range from [0, 4294967295] / [0, 0xffffffff]. (max 32 bit unsigned integer)
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeVarUint = (encoder, num) => {
  while (num >= 0b10000000) {
    write(encoder, 0b10000000 | (bits7 & num));
    num >>>= 7;
  }
  write(encoder, bits7 & num);
};

/**
 * Write a variable length string.
 *
 * @function
 * @param {Encoder} encoder
 * @param {String} str The string that is to be encoded.
 */
const writeVarString = (encoder, str) => {
  const encodedString = unescape(encodeURIComponent(str));
  const len = encodedString.length;
  writeVarUint(encoder, len);
  for (let i = 0; i < len; i++) {
    write(encoder, encodedString.codePointAt(i));
  }
};

/**
 * Write the content of another Encoder.
 *
 * TODO: can be improved!
 *
 * @function
 * @param {Encoder} encoder The enUint8Arr
 * @param {Encoder} append The BinaryEncoder to be written.
 */
const writeBinaryEncoder = (encoder, append) => writeArrayBuffer(encoder, toBuffer(append));

/**
 * Append an arrayBuffer to the encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {ArrayBuffer} arrayBuffer
 */
const writeArrayBuffer = (encoder, arrayBuffer) => {
  const prevBufferLen = encoder.cbuf.length;
  // TODO: Append to cbuf if possible
  encoder.bufs.push(createUint8ArrayFromBuffer(encoder.cbuf.buffer, 0, encoder.cpos));
  encoder.bufs.push(createUint8ArrayFromArrayBuffer(arrayBuffer));
  encoder.cbuf = createUint8ArrayFromLen(prevBufferLen);
  encoder.cpos = 0;
};

/**
 * @function
 * @param {Encoder} encoder
 * @param {ArrayBuffer} arrayBuffer
 */
const writePayload = (encoder, arrayBuffer) => {
  writeVarUint(encoder, arrayBuffer.byteLength);
  writeArrayBuffer(encoder, arrayBuffer);
};

var encoding = /*#__PURE__*/Object.freeze({
  Encoder: Encoder,
  createEncoder: createEncoder,
  length: length,
  toBuffer: toBuffer,
  write: write,
  set: set,
  writeUint8: writeUint8,
  setUint8: setUint8,
  writeUint16: writeUint16,
  setUint16: setUint16,
  writeUint32: writeUint32,
  setUint32: setUint32,
  writeVarUint: writeVarUint,
  writeVarString: writeVarString,
  writeBinaryEncoder: writeBinaryEncoder,
  writeArrayBuffer: writeArrayBuffer,
  writePayload: writePayload
});

/**
 * @module utils
 */

class ID {
  constructor (user, clock) {
    this.user = user; // TODO: rename to client
    this.clock = clock;
  }
  clone () {
    return new ID(this.user, this.clock)
  }
  equals (id) {
    return id !== null && id.user === this.user && id.clock === this.clock
  }
  lessThan (id) {
    if (id.constructor === ID) {
      return this.user < id.user || (this.user === id.user && this.clock < id.clock)
    } else {
      return false
    }
  }
  /**
   * @param {encoding.Encoder} encoder
   */
  encode (encoder) {
    writeVarUint(encoder, this.user);
    writeVarUint(encoder, this.clock);
  }
}

const createID = (user, clock) => new ID(user, clock);

const RootFakeUserID = 0xFFFFFF;

class RootID {
  constructor (name, typeConstructor) {
    this.user = RootFakeUserID;
    this.name = name;
    this.type = getStructReference(typeConstructor);
  }
  equals (id) {
    return id !== null && id.user === this.user && id.name === this.name && id.type === this.type
  }
  lessThan (id) {
    if (id.constructor === RootID) {
      return this.user < id.user || (this.user === id.user && (this.name < id.name || (this.name === id.name && this.type < id.type)))
    } else {
      return true
    }
  }
  /**
   * @param {encoding.Encoder} encoder
   */
  encode (encoder) {
    writeVarUint(encoder, this.user);
    writeVarString(encoder, this.name);
    writeVarUint(encoder, this.type);
  }
}

/**
 * Create a new root id.
 *
 * @example
 *   y.define('name', Y.Array) // name, and typeConstructor
 *
 * @param {string} name
 * @param {Function} typeConstructor must be defined in structReferences
 */
const createRootID = (name, typeConstructor) => new RootID(name, typeConstructor);

/**
 * Read ID.
 * * If first varUint read is 0xFFFFFF a RootID is returned.
 * * Otherwise an ID is returned
 *
 * @param {decoding.Decoder} decoder
 * @return {ID|RootID}
 */
const decode = decoder => {
  const user = readVarUint(decoder);
  if (user === RootFakeUserID) {
    // read property name and type id
    const rid = createRootID(readVarString(decoder), null);
    rid.type = readVarUint(decoder);
    return rid
  }
  return createID(user, readVarUint(decoder))
};

const writeStructToTransaction = (transaction, struct) => {
  transaction.encodedStructsLen++;
  struct._toBinary(transaction.encodedStructs);
};

/**
 * @private
 * Delete all items in an ID-range.
 * Does not create delete operations!
 * TODO: implement getItemCleanStartNode for better performance (only one lookup).
 */
const deleteItemRange = (y, user, clock, range, gcChildren) => {
  let item = y.os.getItemCleanStart(createID(user, clock));
  if (item !== null) {
    if (!item._deleted) {
      item._splitAt(y, range);
      item._delete(y, false, true);
    }
    let itemLen = item._length;
    range -= itemLen;
    clock += itemLen;
    if (range > 0) {
      let node = y.os.findNode(createID(user, clock));
      while (node !== null && node.val !== null && range > 0 && node.val._id.equals(createID(user, clock))) {
        const nodeVal = node.val;
        if (!nodeVal._deleted) {
          nodeVal._splitAt(y, range);
          nodeVal._delete(y, false, gcChildren);
        }
        const nodeLen = nodeVal._length;
        range -= nodeLen;
        clock += nodeLen;
        node = node.next();
      }
    }
  }
};

/**
 * Stringify an item id.
 *
 * @param {ID.ID | ID.RootID} id
 * @return {string}
 */
const stringifyID = id => id instanceof ID ? `(${id.user},${id.clock})` : `(${id.name},${id.type})`;

/**
 * Stringify an item as ID. HHere, an item could also be a Yjs instance (e.g. item._parent).
 *
 * @param {Item | Y | null} item
 * @return {string}
 */
const stringifyItemID = item => {
  let result;
  if (item === null) {
    result = '()';
  } else if (item._id != null) {
    result = stringifyID(item._id);
  } else {
    // must be a Yjs instance
    // Don't include Y in this module, so we prevent circular dependencies.
    result = 'y';
  }
  return result
};

/**
 * Helper utility to convert an item to a readable format.
 *
 * @param {String} name The name of the item class (YText, ItemString, ..).
 * @param {Item} item The item instance.
 * @param {String} [append] Additional information to append to the returned
 *                          string.
 * @return {String} A readable string that represents the item object.
 *
 */
const logItemHelper = (name, item, append) => {
  const left = item._left !== null ? stringifyID(item._left._lastId) : '()';
  const origin = item._origin !== null ? stringifyID(item._origin._lastId) : '()';
  return `${name}(id:${stringifyItemID(item)},left:${left},origin:${origin},right:${stringifyItemID(item._right)},parent:${stringifyItemID(item._parent)},parentSub:${item._parentSub}${append !== undefined ? ' - ' + append : ''})`
};

/**
 * @module structs
 */

/**
 * @private
 * A Delete change is not a real Item, but it provides the same interface as an
 * Item. The only difference is that it will not be saved in the ItemStore
 * (OperationStore), but instead it is safed in the DeleteStore.
 */
class Delete {
  constructor () {
    /**
     * @type {ID.ID}
     */
    this._targetID = null;
    /**
     * @type {Item}
     */
    this._target = null;
    this._length = null;
  }

  /**
   * @private
   * Read the next Item in a Decoder and fill this Item with the read data.
   *
   * This is called when data is received from a remote peer.
   *
   * @param {Y} y The Yjs instance that this Item belongs to.
   * @param {decoding.Decoder} decoder The decoder object to read data from.
   */
  _fromBinary (y, decoder) {
    // TODO: set target, and add it to missing if not found
    // There is an edge case in p2p networks!
    /**
     * @type {any}
     */
    const targetID = decode(decoder);
    this._targetID = targetID;
    this._length = readVarUint(decoder);
    if (y.os.getItem(targetID) === null) {
      return [targetID]
    } else {
      return []
    }
  }

  /**
   * @private
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   */
  _toBinary (encoder) {
    writeUint8(encoder, getStructReference(this.constructor));
    this._targetID.encode(encoder);
    writeVarUint(encoder, this._length);
  }

  /**
   * @private
   * Integrates this Item into the shared structure.
   *
   * This method actually applies the change to the Yjs instance. In the case of
   * Delete it marks the delete target as deleted.
   *
   * * If created remotely (a remote user deleted something),
   *   this Delete is applied to all structs in id-range.
   * * If created lokally (e.g. when y-array deletes a range of elements),
   *   this struct is broadcasted only (it is already executed)
   */
  _integrate (y, locallyCreated = false) {
    if (!locallyCreated) {
      // from remote
      const id = this._targetID;
      deleteItemRange(y, id.user, id.clock, this._length, false);
    }
    writeStructToTransaction(y._transaction, this);
  }

  /**
   * Transform this YXml Type to a readable format.
   * Useful for logging as all Items and Delete implement this method.
   *
   * @private
   */
  _logString () {
    return `Delete - target: ${stringifyID(this._targetID)}, len: ${this._length}`
  }
}

/**
 * @module structs
 */
// import { Y } from '../utils/Y.js' // eslint-disable-line

// TODO should have the same base class as Item
class GC {
  constructor () {
    /**
     * @type {ID.ID}
     */
    this._id = null;
    this._length = 0;
  }

  get _redone () {
    return null
  }

  get _deleted () {
    return true
  }

  _integrate (y) {
    const id = this._id;
    const userState = y.ss.getState(id.user);
    if (id.clock === userState) {
      y.ss.setState(id.user, id.clock + this._length);
    }
    y.ds.mark(this._id, this._length, true);
    let n = y.os.put(this);
    const prev = n.prev().val;
    if (prev !== null && prev.constructor === GC && prev._id.user === n.val._id.user && prev._id.clock + prev._length === n.val._id.clock) {
      // TODO: do merging for all items!
      prev._length += n.val._length;
      y.os.delete(n.val._id);
      n = prev;
    }
    if (n.val) {
      n = n.val;
    }
    const next = y.os.findNext(n._id);
    if (next !== null && next.constructor === GC && next._id.user === n._id.user && next._id.clock === n._id.clock + n._length) {
      n._length += next._length;
      y.os.delete(next._id);
    }
    if (id.user !== RootFakeUserID) {
      writeStructToTransaction(y._transaction, this);
    }
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   * @private
   */
  _toBinary (encoder) {
    writeUint8(encoder, getStructReference(this.constructor));
    this._id.encode(encoder);
    writeVarUint(encoder, this._length);
  }

  /**
   * Read the next Item in a Decoder and fill this Item with the read data.
   *
   * This is called when data is received from a remote peer.
   *
   * @param {Y} y The Yjs instance that this Item belongs to.
   * @param {decoding.Decoder} decoder The decoder object to read data from.
   * @private
   */
  _fromBinary (y, decoder) {
    /**
     * @type {any}
     */
    const id = decode(decoder);
    this._id = id;
    this._length = readVarUint(decoder);
    const missing = [];
    if (y.ss.getState(id.user) < id.clock) {
      missing.push(createID(id.user, id.clock - 1));
    }
    return missing
  }

  _splitAt () {
    return this
  }

  _clonePartial (diff) {
    const gc = new GC();
    gc._id = createID(this._id.user, this._id.clock + diff);
    gc._length = this._length - diff;
    return gc
  }
}

/**
 * @module structs
 */
// import { Type } from './Type.js' // eslint-disable-line

/**
 * @private
 */
const transactionTypeChanged = (y, type, sub) => {
  if (type !== y && !type._deleted && !y._transaction.newTypes.has(type)) {
    const changedTypes = y._transaction.changedTypes;
    let subs = changedTypes.get(type);
    if (subs === undefined) {
      // create if it doesn't exist yet
      subs = new Set();
      changedTypes.set(type, subs);
    }
    subs.add(sub);
  }
};

/**
 * Helper utility to split an Item (see {@link Item#_splitAt})
 * - copies all properties from a to b
 * - connects a to b
 * - assigns the correct _id
 * - saves b to os
 * @private
 */
const splitHelper = (y, a, b, diff) => {
  const aID = a._id;
  b._id = createID(aID.user, aID.clock + diff);
  b._origin = a;
  b._left = a;
  b._right = a._right;
  if (b._right !== null) {
    b._right._left = b;
  }
  b._right_origin = a._right_origin;
  // do not set a._right_origin, as this will lead to problems when syncing
  a._right = b;
  b._parent = a._parent;
  b._parentSub = a._parentSub;
  b._deleted = a._deleted;
  // now search all relevant items to the right and update origin
  // if origin is not it foundOrigins, we don't have to search any longer
  let foundOrigins = new Set();
  foundOrigins.add(a);
  let o = b._right;
  while (o !== null && foundOrigins.has(o._origin)) {
    if (o._origin === a) {
      o._origin = b;
    }
    foundOrigins.add(o);
    o = o._right;
  }
  y.os.put(b);
  if (y._transaction !== null) {
    if (y._transaction.newTypes.has(a)) {
      y._transaction.newTypes.add(b);
    } else if (y._transaction.deletedStructs.has(a)) {
      y._transaction.deletedStructs.add(b);
    }
  }
};

/**
 * Abstract class that represents any content.
 */
class Item {
  constructor () {
    /**
     * The uniqe identifier of this type.
     * @type {ID.ID | ID.RootID}
     */
    this._id = null;
    /**
     * The item that was originally to the left of this item.
     * @type {Item}
     */
    this._origin = null;
    /**
     * The item that is currently to the left of this item.
     * @type {Item}
     */
    this._left = null;
    /**
     * The item that is currently to the right of this item.
     * @type {Item}
     */
    this._right = null;
    /**
     * The item that was originally to the right of this item.
     * @type {Item}
     */
    this._right_origin = null;
    /**
     * The parent type.
     * @type {Y|Type}
     */
    this._parent = null;
    /**
     * If the parent refers to this item with some kind of key (e.g. YMap, the
     * key is specified here. The key is then used to refer to the list in which
     * to insert this item. If `parentSub = null` type._start is the list in
     * which to insert to. Otherwise it is `parent._map`.
     * @type {String}
     */
    this._parentSub = null;
    /**
     * Whether this item was deleted or not.
     * @type {Boolean}
     */
    this._deleted = false;
    /**
     * If this type's effect is reundone this type refers to the type that undid
     * this operation.
     * @type {Type}
     */
    this._redone = null;
  }

  /**
   * Returns the next non-deleted item
   * @private
   */
  get _next () {
    let n = this._right;
    while (n !== null && n._deleted) {
      n = n._right;
    }
    return n
  }

  /**
   * Returns the previous non-deleted item
   * @private
   */
  get _prev () {
    let n = this._left;
    while (n !== null && n._deleted) {
      n = n._left;
    }
    return n
  }

  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @private
   */
  _copy () {
    const C = this.constructor;
    return new C()
  }

  /**
   * Redoes the effect of this operation.
   *
   * @param {Y} y The Yjs instance.
   * @param {Set<Item>} redoitems
   *
   * @private
   */
  _redo (y, redoitems) {
    if (this._redone !== null) {
      return this._redone
    }
    if (!(this._parent instanceof Item)) {
      return
    }
    let struct = this._copy();
    let left, right;
    if (this._parentSub === null) {
      // Is an array item. Insert at the old position
      left = this._left;
      right = this;
    } else {
      // Is a map item. Insert at the start
      left = null;
      right = this._parent._map.get(this._parentSub);
      right._delete(y);
    }
    let parent = this._parent;
    // make sure that parent is redone
    if (parent._deleted === true && parent._redone === null) {
      // try to undo parent if it will be undone anyway
      if (!redoitems.has(parent) || !parent._redo(y, redoitems)) {
        return false
      }
    }
    if (parent._redone !== null) {
      parent = parent._redone;
      // find next cloned_redo items
      while (left !== null) {
        if (left._redone !== null && left._redone._parent === parent) {
          left = left._redone;
          break
        }
        left = left._left;
      }
      while (right !== null) {
        if (right._redone !== null && right._redone._parent === parent) {
          right = right._redone;
        }
        right = right._right;
      }
    }
    struct._origin = left;
    struct._left = left;
    struct._right = right;
    struct._right_origin = right;
    struct._parent = parent;
    struct._parentSub = this._parentSub;
    struct._integrate(y);
    this._redone = struct;
    return true
  }

  /**
   * Computes the last content address of this Item.
   *
   * @private
   */
  get _lastId () {
    /**
     * @type {any}
     */
    const id = this._id;
    return createID(id.user, id.clock + this._length - 1)
  }

  /**
   * Computes the length of this Item.
   *
   * @private
   */
  get _length () {
    return 1
  }

  /**
   * Should return false if this Item is some kind of meta information
   * (e.g. format information).
   *
   * * Whether this Item should be addressable via `yarray.get(i)`
   * * Whether this Item should be counted when computing yarray.length
   *
   * @private
   */
  get _countable () {
    return true
  }

  /**
   * Splits this Item so that another Items can be inserted in-between.
   * This must be overwritten if _length > 1
   * Returns right part after split
   * * diff === 0 => this
   * * diff === length => this._right
   * * otherwise => split _content and return right part of split
   * (see {@link ItemJSON}/{@link ItemString} for implementation)
   *
   * @private
   */
  _splitAt (y, diff) {
    if (diff === 0) {
      return this
    }
    return this._right
  }

  /**
   * Mark this Item as deleted.
   *
   * @param {Y} y The Yjs instance
   * @param {boolean} createDelete Whether to propagate a message that this
   *                               Type was deleted.
   * @param {boolean} gcChildren
   *
   * @private
   */
  _delete (y, createDelete = true, gcChildren) {
    if (!this._deleted) {
      const parent = this._parent;
      const len = this._length;
      // adjust the length of parent
      if (parent.length !== undefined && this._countable) {
        parent.length -= len;
      }
      this._deleted = true;
      y.ds.mark(this._id, this._length, false);
      let del = new Delete();
      del._targetID = this._id;
      del._length = len;
      if (createDelete) {
        // broadcast and persists Delete
        del._integrate(y, true);
      }
      transactionTypeChanged(y, parent, this._parentSub);
      y._transaction.deletedStructs.add(this);
    }
  }

  _gcChildren (y) {}

  _gc (y) {
    const gc = new GC();
    gc._id = this._id;
    gc._length = this._length;
    y.os.delete(this._id);
    gc._integrate(y);
  }

  /**
   * This is called right before this Item receives any children.
   * It can be overwritten to apply pending changes before applying remote changes
   *
   * @private
   */
  _beforeChange () {
    // nop
  }

  /**
   * Integrates this Item into the shared structure.
   *
   * This method actually applies the change to the Yjs instance. In case of
   * Item it connects _left and _right to this Item and calls the
   * {@link Item#beforeChange} method.
   *
   * * Integrate the struct so that other types/structs can see it
   * * Add this struct to y.os
   * * Check if this is struct deleted
   *
   * @param {Y} y
   *
   * @private
   */
  _integrate (y) {
    y._transaction.newTypes.add(this);
    /**
     * @type {any}
     */
    const parent = this._parent;
    /**
     * @type {any}
     */
    const selfID = this._id;
    const user = selfID === null ? y.userID : selfID.user;
    const userState = y.ss.getState(user);
    if (selfID === null) {
      this._id = y.ss.getNextID(this._length);
    } else if (selfID.user === RootFakeUserID) {
      // is parent
      return
    } else if (selfID.clock < userState) {
      // already applied..
      return
    } else if (selfID.clock === userState) {
      y.ss.setState(selfID.user, userState + this._length);
    } else {
      // missing content from user
      throw new Error('Can not apply yet!')
    }
    if (!parent._deleted && !y._transaction.changedTypes.has(parent) && !y._transaction.newTypes.has(parent)) {
      // this is the first time parent is updated
      // or this types is new
      parent._beforeChange();
    }

    /*
    # $this has to find a unique position between origin and the next known character
    # case 1: $origin equals $o.origin: the $creator parameter decides if left or right
    #         let $OL= [o1,o2,o3,o4], whereby $this is to be inserted between o1 and o4
    #         o2,o3 and o4 origin is 1 (the position of o2)
    #         there is the case that $this.creator < o2.creator, but o3.creator < $this.creator
    #         then o2 knows o3. Since on another client $OL could be [o1,o3,o4] the problem is complex
    #         therefore $this would be always to the right of o3
    # case 2: $origin < $o.origin
    #         if current $this insert_position > $o origin: $this ins
    #         else $insert_position will not change
    #         (maybe we encounter case 1 later, then this will be to the right of $o)
    # case 3: $origin > $o.origin
    #         $this insert_position is to the left of $o (forever!)
    */
    // handle conflicts
    let o;
    // set o to the first conflicting item
    if (this._left !== null) {
      o = this._left._right;
    } else if (this._parentSub !== null) {
      o = parent._map.get(this._parentSub) || null;
    } else {
      o = parent._start;
    }
    let conflictingItems = new Set();
    let itemsBeforeOrigin = new Set();
    // Let c in conflictingItems, b in itemsBeforeOrigin
    // ***{origin}bbbb{this}{c,b}{c,b}{o}***
    // Note that conflictingItems is a subset of itemsBeforeOrigin
    while (o !== null && o !== this._right) {
      itemsBeforeOrigin.add(o);
      conflictingItems.add(o);
      if (this._origin === o._origin) {
        // case 1
        if (o._id.user < this._id.user) {
          this._left = o;
          conflictingItems.clear();
        }
      } else if (itemsBeforeOrigin.has(o._origin)) {
        // case 2
        if (!conflictingItems.has(o._origin)) {
          this._left = o;
          conflictingItems.clear();
        }
      } else {
        break
      }
      // TODO: try to use right_origin instead.
      // Then you could basically omit conflictingItems!
      // Note: you probably can't use right_origin in every case.. only when setting _left
      o = o._right;
    }
    // reconnect left/right + update parent map/start if necessary
    const parentSub = this._parentSub;
    if (this._left === null) {
      let right;
      if (parentSub !== null) {
        const pmap = parent._map;
        right = pmap.get(parentSub) || null;
        pmap.set(parentSub, this);
      } else {
        right = parent._start;
        parent._start = this;
      }
      this._right = right;
      if (right !== null) {
        right._left = this;
      }
    } else {
      const left = this._left;
      const right = left._right;
      this._right = right;
      left._right = this;
      if (right !== null) {
        right._left = this;
      }
    }
    // adjust the length of parent
    if (parentSub === null && parent.length !== undefined && this._countable) {
      parent.length += this._length;
    }
    if (parent._deleted) {
      this._delete(y, false, true);
    }
    y.os.put(this);
    transactionTypeChanged(y, parent, parentSub);
    if (this._id.user !== RootFakeUserID) {
      writeStructToTransaction(y._transaction, this);
    }
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   *
   * @private
   */
  _toBinary (encoder) {
    writeUint8(encoder, getStructReference(this.constructor));
    let info = 0;
    if (this._origin !== null) {
      info += 0b1; // origin is defined
    }
    // TODO: remove
    /* no longer send _left
    if (this._left !== this._origin) {
      info += 0b10 // do not copy origin to left
    }
    */
    if (this._right_origin !== null) {
      info += 0b100;
    }
    if (this._parentSub !== null) {
      info += 0b1000;
    }
    writeUint8(encoder, info);
    this._id.encode(encoder);
    if (info & 0b1) {
      this._origin._lastId.encode(encoder);
    }
    // TODO: remove
    /* see above
    if (info & 0b10) {
      encoder.writeID(this._left._lastId)
    }
    */
    if (info & 0b100) {
      this._right_origin._id.encode(encoder);
    }
    if ((info & 0b101) === 0) {
      // neither origin nor right is defined
      this._parent._id.encode(encoder);
    }
    if (info & 0b1000) {
      writeVarString(encoder, JSON.stringify(this._parentSub));
    }
  }

  /**
   * Read the next Item in a Decoder and fill this Item with the read data.
   *
   * This is called when data is received from a remote peer.
   *
   * @param {Y} y The Yjs instance that this Item belongs to.
   * @param {decoding.Decoder} decoder The decoder object to read data from.
   *
   * @private
   */
  _fromBinary (y, decoder) {
    let missing = [];
    const info = readUint8(decoder);
    const id = decode(decoder);
    this._id = id;
    // read origin
    if (info & 0b1) {
      // origin != null
      const originID = decode(decoder);
      // we have to query for left again because it might have been split/merged..
      const origin = y.os.getItemCleanEnd(originID);
      if (origin === null) {
        missing.push(originID);
      } else {
        this._origin = origin;
        this._left = this._origin;
      }
    }
    // read right
    if (info & 0b100) {
      // right != null
      const rightID = decode(decoder);
      // we have to query for right again because it might have been split/merged..
      const right = y.os.getItemCleanStart(rightID);
      if (right === null) {
        missing.push(rightID);
      } else {
        this._right = right;
        this._right_origin = right;
      }
    }
    // read parent
    if ((info & 0b101) === 0) {
      // neither origin nor right is defined
      const parentID = decode(decoder);
      // parent does not change, so we don't have to search for it again
      if (this._parent === null) {
        let parent;
        if (parentID.constructor === RootID) {
          parent = y.os.get(parentID);
        } else {
          parent = y.os.getItem(parentID);
        }
        if (parent === null) {
          missing.push(parentID);
        } else {
          this._parent = parent;
        }
      }
    } else if (this._parent === null) {
      if (this._origin !== null) {
        this._parent = this._origin._parent;
      } else if (this._right_origin !== null) {
        this._parent = this._right_origin._parent;
      }
    }
    if (info & 0b1000) {
      // TODO: maybe put this in read parent condition (you can also read parentsub from left/right)
      this._parentSub = JSON.parse(readVarString(decoder));
    }
    if (id instanceof ID && y.ss.getState(id.user) < id.clock) {
      missing.push(createID(id.user, id.clock - 1));
    }
    return missing
  }
}

/**
 * @module tree
 */

const rotate = (tree, parent, newParent, n) => {
  if (parent === null) {
    tree.root = newParent;
    newParent._parent = null;
  } else if (parent.left === n) {
    parent.left = newParent;
  } else if (parent.right === n) {
    parent.right = newParent;
  } else {
    throw new Error('The elements are wrongly connected!')
  }
};

class N {
  // A created node is always red!
  constructor (val) {
    this.val = val;
    this.color = true;
    this._left = null;
    this._right = null;
    this._parent = null;
  }
  isRed () { return this.color }
  isBlack () { return !this.color }
  redden () { this.color = true; return this }
  blacken () { this.color = false; return this }
  get grandparent () {
    return this.parent.parent
  }
  get parent () {
    return this._parent
  }
  get sibling () {
    return (this === this.parent.left)
      ? this.parent.right : this.parent.left
  }
  get left () {
    return this._left
  }
  get right () {
    return this._right
  }
  set left (n) {
    if (n !== null) {
      n._parent = this;
    }
    this._left = n;
  }
  set right (n) {
    if (n !== null) {
      n._parent = this;
    }
    this._right = n;
  }
  rotateLeft (tree) {
    const parent = this.parent;
    const newParent = this.right;
    const newRight = this.right.left;
    newParent.left = this;
    this.right = newRight;
    rotate(tree, parent, newParent, this);
  }
  next () {
    if (this.right !== null) {
      // search the most left node in the right tree
      var o = this.right;
      while (o.left !== null) {
        o = o.left;
      }
      return o
    } else {
      var p = this;
      while (p.parent !== null && p !== p.parent.left) {
        p = p.parent;
      }
      return p.parent
    }
  }
  prev () {
    if (this.left !== null) {
      // search the most right node in the left tree
      var o = this.left;
      while (o.right !== null) {
        o = o.right;
      }
      return o
    } else {
      var p = this;
      while (p.parent !== null && p !== p.parent.right) {
        p = p.parent;
      }
      return p.parent
    }
  }
  rotateRight (tree) {
    const parent = this.parent;
    const newParent = this.left;
    const newLeft = this.left.right;
    newParent.right = this;
    this.left = newLeft;
    rotate(tree, parent, newParent, this);
  }
  getUncle () {
    // we can assume that grandparent exists when this is called!
    if (this.parent === this.parent.parent.left) {
      return this.parent.parent.right
    } else {
      return this.parent.parent.left
    }
  }
}

const isBlack = node =>
  node !== null ? node.isBlack() : true;

const isRed = (node) =>
  node !== null ? node.isRed() : false;

/*
 * This is a Red Black Tree implementation
 */
class Tree {
  constructor () {
    this.root = null;
    this.length = 0;
  }
  findNext (id) {
    var nextID = id.clone();
    nextID.clock += 1;
    return this.findWithLowerBound(nextID)
  }
  findPrev (id) {
    let prevID = id.clone();
    prevID.clock -= 1;
    return this.findWithUpperBound(prevID)
  }
  findNodeWithLowerBound (from) {
    var o = this.root;
    if (o === null) {
      return null
    } else {
      while (true) {
        if (from === null || (from.lessThan(o.val._id) && o.left !== null)) {
          // o is included in the bound
          // try to find an element that is closer to the bound
          o = o.left;
        } else if (from !== null && o.val._id.lessThan(from)) {
          // o is not within the bound, maybe one of the right elements is..
          if (o.right !== null) {
            o = o.right;
          } else {
            // there is no right element. Search for the next bigger element,
            // this should be within the bounds
            return o.next()
          }
        } else {
          return o
        }
      }
    }
  }
  findNodeWithUpperBound (to) {
    if (to === void 0) {
      throw new Error('You must define from!')
    }
    var o = this.root;
    if (o === null) {
      return null
    } else {
      while (true) {
        if ((to === null || o.val._id.lessThan(to)) && o.right !== null) {
          // o is included in the bound
          // try to find an element that is closer to the bound
          o = o.right;
        } else if (to !== null && to.lessThan(o.val._id)) {
          // o is not within the bound, maybe one of the left elements is..
          if (o.left !== null) {
            o = o.left;
          } else {
            // there is no left element. Search for the prev smaller element,
            // this should be within the bounds
            return o.prev()
          }
        } else {
          return o
        }
      }
    }
  }
  findSmallestNode () {
    var o = this.root;
    while (o != null && o.left != null) {
      o = o.left;
    }
    return o
  }
  findWithLowerBound (from) {
    var n = this.findNodeWithLowerBound(from);
    return n == null ? null : n.val
  }
  findWithUpperBound (to) {
    var n = this.findNodeWithUpperBound(to);
    return n == null ? null : n.val
  }
  iterate (from, to, f) {
    var o;
    if (from === null) {
      o = this.findSmallestNode();
    } else {
      o = this.findNodeWithLowerBound(from);
    }
    while (
      o !== null &&
      (
        to === null || // eslint-disable-line no-unmodified-loop-condition
        o.val._id.lessThan(to) ||
        o.val._id.equals(to)
      )
    ) {
      f(o.val);
      o = o.next();
    }
  }
  find (id) {
    let n = this.findNode(id);
    if (n !== null) {
      return n.val
    } else {
      return null
    }
  }
  findNode (id) {
    var o = this.root;
    if (o === null) {
      return null
    } else {
      while (true) {
        if (o === null) {
          return null
        }
        if (id.lessThan(o.val._id)) {
          o = o.left;
        } else if (o.val._id.lessThan(id)) {
          o = o.right;
        } else {
          return o
        }
      }
    }
  }
  delete (id) {
    var d = this.findNode(id);
    if (d == null) {
      // throw new Error('Element does not exist!')
      return
    }
    this.length--;
    if (d.left !== null && d.right !== null) {
      // switch d with the greates element in the left subtree.
      // o should have at most one child.
      var o = d.left;
      // find
      while (o.right !== null) {
        o = o.right;
      }
      // switch
      d.val = o.val;
      d = o;
    }
    // d has at most one child
    // let n be the node that replaces d
    var isFakeChild;
    var child = d.left || d.right;
    if (child === null) {
      isFakeChild = true;
      child = new N(null);
      child.blacken();
      d.right = child;
    } else {
      isFakeChild = false;
    }

    if (d.parent === null) {
      if (!isFakeChild) {
        this.root = child;
        child.blacken();
        child._parent = null;
      } else {
        this.root = null;
      }
      return
    } else if (d.parent.left === d) {
      d.parent.left = child;
    } else if (d.parent.right === d) {
      d.parent.right = child;
    } else {
      throw new Error('Impossible!')
    }
    if (d.isBlack()) {
      if (child.isRed()) {
        child.blacken();
      } else {
        this._fixDelete(child);
      }
    }
    this.root.blacken();
    if (isFakeChild) {
      if (child.parent.left === child) {
        child.parent.left = null;
      } else if (child.parent.right === child) {
        child.parent.right = null;
      } else {
        throw new Error('Impossible #3')
      }
    }
  }
  _fixDelete (n) {
    if (n.parent === null) {
      // this can only be called after the first iteration of fixDelete.
      return
    }
    // d was already replaced by the child
    // d is not the root
    // d and child are black
    var sibling = n.sibling;
    if (isRed(sibling)) {
      // make sibling the grandfather
      n.parent.redden();
      sibling.blacken();
      if (n === n.parent.left) {
        n.parent.rotateLeft(this);
      } else if (n === n.parent.right) {
        n.parent.rotateRight(this);
      } else {
        throw new Error('Impossible #2')
      }
      sibling = n.sibling;
    }
    // parent, sibling, and children of n are black
    if (n.parent.isBlack() &&
      sibling.isBlack() &&
      isBlack(sibling.left) &&
      isBlack(sibling.right)
    ) {
      sibling.redden();
      this._fixDelete(n.parent);
    } else if (n.parent.isRed() &&
      sibling.isBlack() &&
      isBlack(sibling.left) &&
      isBlack(sibling.right)
    ) {
      sibling.redden();
      n.parent.blacken();
    } else {
      if (n === n.parent.left &&
        sibling.isBlack() &&
        isRed(sibling.left) &&
        isBlack(sibling.right)
      ) {
        sibling.redden();
        sibling.left.blacken();
        sibling.rotateRight(this);
        sibling = n.sibling;
      } else if (n === n.parent.right &&
        sibling.isBlack() &&
        isRed(sibling.right) &&
        isBlack(sibling.left)
      ) {
        sibling.redden();
        sibling.right.blacken();
        sibling.rotateLeft(this);
        sibling = n.sibling;
      }
      sibling.color = n.parent.color;
      n.parent.blacken();
      if (n === n.parent.left) {
        sibling.right.blacken();
        n.parent.rotateLeft(this);
      } else {
        sibling.left.blacken();
        n.parent.rotateRight(this);
      }
    }
  }
  put (v) {
    var node = new N(v);
    if (this.root !== null) {
      var p = this.root; // p abbrev. parent
      while (true) {
        if (node.val._id.lessThan(p.val._id)) {
          if (p.left === null) {
            p.left = node;
            break
          } else {
            p = p.left;
          }
        } else if (p.val._id.lessThan(node.val._id)) {
          if (p.right === null) {
            p.right = node;
            break
          } else {
            p = p.right;
          }
        } else {
          p.val = node.val;
          return p
        }
      }
      this._fixInsert(node);
    } else {
      this.root = node;
    }
    this.length++;
    this.root.blacken();
    return node
  }
  _fixInsert (n) {
    if (n.parent === null) {
      n.blacken();
      return
    } else if (n.parent.isBlack()) {
      return
    }
    var uncle = n.getUncle();
    if (uncle !== null && uncle.isRed()) {
      // Note: parent: red, uncle: red
      n.parent.blacken();
      uncle.blacken();
      n.grandparent.redden();
      this._fixInsert(n.grandparent);
    } else {
      // Note: parent: red, uncle: black or null
      // Now we transform the tree in such a way that
      // either of these holds:
      //   1) grandparent.left.isRed
      //     and grandparent.left.left.isRed
      //   2) grandparent.right.isRed
      //     and grandparent.right.right.isRed
      if (n === n.parent.right && n.parent === n.grandparent.left) {
        n.parent.rotateLeft(this);
        // Since we rotated and want to use the previous
        // cases, we need to set n in such a way that
        // n.parent.isRed again
        n = n.left;
      } else if (n === n.parent.left && n.parent === n.grandparent.right) {
        n.parent.rotateRight(this);
        // see above
        n = n.right;
      }
      // Case 1) or 2) hold from here on.
      // Now traverse grandparent, make parent a black node
      // on the highest level which holds two red nodes.
      n.parent.blacken();
      n.grandparent.redden();
      if (n === n.parent.left) {
        // Case 1
        n.grandparent.rotateRight(this);
      } else {
        // Case 2
        n.grandparent.rotateLeft(this);
      }
    }
  }
}

/**
 * @module utils
 */

class DSNode {
  constructor (id, len, gc) {
    this._id = id;
    this.len = len;
    this.gc = gc;
  }
  clone () {
    return new DSNode(this._id, this.len, this.gc)
  }
}

class DeleteStore extends Tree {
  logTable () {
    const deletes = [];
    this.iterate(null, null, n => {
      deletes.push({
        user: n._id.user,
        clock: n._id.clock,
        len: n.len,
        gc: n.gc
      });
    });
    console.table(deletes);
  }
  isDeleted (id) {
    var n = this.findWithUpperBound(id);
    return n !== null && n._id.user === id.user && id.clock < n._id.clock + n.len
  }
  mark (id, length$$1, gc) {
    if (length$$1 === 0) return
    // Step 1. Unmark range
    const leftD = this.findWithUpperBound(createID(id.user, id.clock - 1));
    // Resize left DSNode if necessary
    if (leftD !== null && leftD._id.user === id.user) {
      if (leftD._id.clock < id.clock && id.clock < leftD._id.clock + leftD.len) {
        // node is overlapping. need to resize
        if (id.clock + length$$1 < leftD._id.clock + leftD.len) {
          // overlaps new mark range and some more
          // create another DSNode to the right of new mark
          this.put(new DSNode(createID(id.user, id.clock + length$$1), leftD._id.clock + leftD.len - id.clock - length$$1, leftD.gc));
        }
        // resize left DSNode
        leftD.len = id.clock - leftD._id.clock;
      } // Otherwise there is no overlapping
    }
    // Resize right DSNode if necessary
    const upper = createID(id.user, id.clock + length$$1 - 1);
    const rightD = this.findWithUpperBound(upper);
    if (rightD !== null && rightD._id.user === id.user) {
      if (rightD._id.clock < id.clock + length$$1 && id.clock <= rightD._id.clock && id.clock + length$$1 < rightD._id.clock + rightD.len) { // we only consider the case where we resize the node
        const d = id.clock + length$$1 - rightD._id.clock;
        rightD._id = createID(rightD._id.user, rightD._id.clock + d);
        rightD.len -= d;
      }
    }
    // Now we only have to delete all inner marks
    const deleteNodeIds = [];
    this.iterate(id, upper, m => {
      deleteNodeIds.push(m._id);
    });
    for (let i = deleteNodeIds.length - 1; i >= 0; i--) {
      this.delete(deleteNodeIds[i]);
    }
    let newMark = new DSNode(id, length$$1, gc);
    // Step 2. Check if we can extend left or right
    if (leftD !== null && leftD._id.user === id.user && leftD._id.clock + leftD.len === id.clock && leftD.gc === gc) {
      // We can extend left
      leftD.len += length$$1;
      newMark = leftD;
    }
    const rightNext = this.find(createID(id.user, id.clock + length$$1));
    if (rightNext !== null && rightNext._id.user === id.user && id.clock + length$$1 === rightNext._id.clock && gc === rightNext.gc) {
      // We can merge newMark and rightNext
      newMark.len += rightNext.len;
      this.delete(rightNext._id);
    }
    if (leftD !== newMark) {
      // only put if we didn't extend left
      this.put(newMark);
    }
  }
}

/**
 * Stringifies a message-encoded Delete Set.
 *
 * @param {decoding.Decoder} decoder
 * @return {string}
 */
const stringifyDeleteStore = (decoder) => {
  let str = '';
  const dsLength = readUint32(decoder);
  for (let i = 0; i < dsLength; i++) {
    str += ' -' + readVarUint(decoder) + ':\n'; // decodes user
    const dvLength = readUint32(decoder);
    for (let j = 0; j < dvLength; j++) {
      str += `clock: ${readVarUint(decoder)}, length: ${readVarUint(decoder)}, gc: ${readUint8(decoder) === 1}\n`;
    }
  }
  return str
};

/**
 * Write the DeleteSet of a shared document to an Encoder.
 *
 * @param {encoding.Encoder} encoder
 * @param {DeleteStore} ds
 */
const writeDeleteStore = (encoder, ds) => {
  let currentUser = null;
  let currentLength;
  let lastLenPos;
  let numberOfUsers = 0;
  const laterDSLenPus = length(encoder);
  writeUint32(encoder, 0);
  ds.iterate(null, null, n => {
    const user = n._id.user;
    const clock = n._id.clock;
    const len = n.len;
    const gc = n.gc;
    if (currentUser !== user) {
      numberOfUsers++;
      // a new user was found
      if (currentUser !== null) { // happens on first iteration
        setUint32(encoder, lastLenPos, currentLength);
      }
      currentUser = user;
      writeVarUint(encoder, user);
      // pseudo-fill pos
      lastLenPos = length(encoder);
      writeUint32(encoder, 0);
      currentLength = 0;
    }
    writeVarUint(encoder, clock);
    writeVarUint(encoder, len);
    writeUint8(encoder, gc ? 1 : 0);
    currentLength++;
  });
  if (currentUser !== null) { // happens on first iteration
    setUint32(encoder, lastLenPos, currentLength);
  }
  setUint32(encoder, laterDSLenPus, numberOfUsers);
};

/**
 * Read delete set from Decoder and apply it to a shared document.
 *
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 */
const readDeleteStore = (decoder, y) => {
  const dsLength = readUint32(decoder);
  for (let i = 0; i < dsLength; i++) {
    const user = readVarUint(decoder);
    const dv = [];
    const dvLength = readUint32(decoder);
    for (let j = 0; j < dvLength; j++) {
      const from = readVarUint(decoder);
      const len = readVarUint(decoder);
      const gc = readUint8(decoder) === 1;
      dv.push({from, len, gc});
    }
    if (dvLength > 0) {
      const deletions = [];
      let pos = 0;
      let d = dv[pos];
      y.ds.iterate(createID(user, 0), createID(user, Number.MAX_VALUE), n => {
        // cases:
        // 1. d deletes something to the right of n
        //  => go to next n (break)
        // 2. d deletes something to the left of n
        //  => create deletions
        //  => reset d accordingly
        //  *)=> if d doesn't delete anything anymore, go to next d (continue)
        // 3. not 2) and d deletes something that also n deletes
        //  => reset d so that it doesn't contain n's deletion
        //  *)=> if d does not delete anything anymore, go to next d (continue)
        while (d != null) {
          var diff = 0; // describe the diff of length in 1) and 2)
          if (n._id.clock + n.len <= d.from) {
            // 1)
            break
          } else if (d.from < n._id.clock) {
            // 2)
            // delete maximum the len of d
            // else delete as much as possible
            diff = Math.min(n._id.clock - d.from, d.len);
            // deleteItemRange(y, user, d.from, diff, true)
            deletions.push([user, d.from, diff]);
          } else {
            // 3)
            diff = n._id.clock + n.len - d.from; // never null (see 1)
            if (d.gc && !n.gc) {
              // d marks as gc'd but n does not
              // then delete either way
              // deleteItemRange(y, user, d.from, Math.min(diff, d.len), true)
              deletions.push([user, d.from, Math.min(diff, d.len)]);
            }
          }
          if (d.len <= diff) {
            // d doesn't delete anything anymore
            d = dv[++pos];
          } else {
            d.from = d.from + diff; // reset pos
            d.len = d.len - diff; // reset length
          }
        }
      });
      // TODO: It would be more performant to apply the deletes in the above loop
      // Adapt the Tree implementation to support delete while iterating
      for (let i = deletions.length - 1; i >= 0; i--) {
        const del = deletions[i];
        deleteItemRange(y, del[0], del[1], del[2], true);
      }
      // for the rest.. just apply it
      for (; pos < dv.length; pos++) {
        d = dv[pos];
        deleteItemRange(y, user, d.from, d.len, true);
        // deletions.push([user, d.from, d.len, d.gc)
      }
    }
  }
};

/**
 * @module utils
 */

class OperationStore extends Tree {
  constructor (y) {
    super();
    this.y = y;
  }
  logTable () {
    const items = [];
    this.iterate(null, null, item => {
      if (item.constructor === GC) {
        items.push({
          id: stringifyItemID(item),
          content: item._length,
          deleted: 'GC'
        });
      } else {
        items.push({
          id: stringifyItemID(item),
          origin: item._origin === null ? '()' : stringifyID(item._origin._lastId),
          left: item._left === null ? '()' : stringifyID(item._left._lastId),
          right: stringifyItemID(item._right),
          right_origin: stringifyItemID(item._right_origin),
          parent: stringifyItemID(item._parent),
          parentSub: item._parentSub,
          deleted: item._deleted,
          content: JSON.stringify(item._content)
        });
      }
    });
    console.table(items);
  }
  get (id) {
    let struct = this.find(id);
    if (struct === null && id instanceof RootID) {
      const Constr = getStruct(id.type);
      const y = this.y;
      struct = new Constr();
      struct._id = id;
      struct._parent = y;
      y.transact(() => {
        struct._integrate(y);
      });
      this.put(struct);
    }
    return struct
  }
  // Use getItem for structs with _length > 1
  getItem (id) {
    var item = this.findWithUpperBound(id);
    if (item === null) {
      return null
    }
    const itemID = item._id;
    if (id.user === itemID.user && id.clock < itemID.clock + item._length) {
      return item
    } else {
      return null
    }
  }
  // Return an insertion such that id is the first element of content
  // This function manipulates an item, if necessary
  getItemCleanStart (id) {
    var ins = this.getItem(id);
    if (ins === null || ins._length === 1) {
      return ins
    }
    const insID = ins._id;
    if (insID.clock === id.clock) {
      return ins
    } else {
      return ins._splitAt(this.y, id.clock - insID.clock)
    }
  }
  // Return an insertion such that id is the last element of content
  // This function manipulates an operation, if necessary
  getItemCleanEnd (id) {
    var ins = this.getItem(id);
    if (ins === null || ins._length === 1) {
      return ins
    }
    const insID = ins._id;
    if (insID.clock + ins._length - 1 === id.clock) {
      return ins
    } else {
      ins._splitAt(this.y, id.clock - insID.clock + 1);
      return ins
    }
  }
}

/**
 * @module utils
 */

/**
 * @typedef {Map<number, number>} StateMap
 */

/**
 * Read StateMap from Decoder and return as Map
 *
 * @param {decoding.Decoder} decoder
 * @return {StateMap}
 */
const readStateMap = decoder => {
  const ss = new Map();
  const ssLength = readUint32(decoder);
  for (let i = 0; i < ssLength; i++) {
    const user = readVarUint(decoder);
    const clock = readVarUint(decoder);
    ss.set(user, clock);
  }
  return ss
};

/**
 * Write StateMap to Encoder
 *
 * @param {encoding.Encoder} encoder
 * @param {StateMap} state
 */
const writeStateMap = (encoder, state) => {
  // write as fixed-size number to stay consistent with the other encode functions.
  // => anytime we write the number of objects that follow, encode as fixed-size number.
  writeUint32(encoder, state.size);
  state.forEach((clock, user) => {
    writeVarUint(encoder, user);
    writeVarUint(encoder, clock);
  });
};

/**
 */
class StateStore {
  constructor (y) {
    this.y = y;
    this.state = new Map();
  }
  logTable () {
    const entries = [];
    for (let [user, state] of this.state) {
      entries.push({
        user, state
      });
    }
    console.table(entries);
  }
  getNextID (len) {
    const user = this.y.userID;
    const state = this.getState(user);
    this.setState(user, state + len);
    return createID(user, state)
  }
  updateRemoteState (struct) {
    let user = struct._id.user;
    let userState = this.state.get(user);
    while (struct !== null && struct._id.clock === userState) {
      userState += struct._length;
      struct = this.y.os.get(createID(user, userState));
    }
    this.state.set(user, userState);
  }
  getState (user) {
    let state = this.state.get(user);
    if (state == null) {
      return 0
    }
    return state
  }
  setState (user, state) {
    // TODO: modify missingi structs here
    const beforeState = this.y._transaction.beforeState;
    if (!beforeState.has(user)) {
      beforeState.set(user, this.getState(user));
    }
    this.state.set(user, state);
  }
}

/**
 * @module utils
 */

/* global crypto */

const generateRandomUint32 = () => {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues != null) {
    // browser
    let arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0]
  } else if (typeof crypto !== 'undefined' && crypto.randomBytes != null) {
    // node
    let buf = crypto.randomBytes(4);
    return new Uint32Array(buf.buffer)[0]
  } else {
    return Math.ceil(Math.random() * 0xFFFFFFFF)
  }
};

/**
 * Handles named events.
 */
class NamedEventHandler {
  constructor () {
    this._eventListener = new Map();
    this._stateListener = new Map();
  }

  /**
   * @private
   * Returns all listeners that listen to a specified name.
   *
   * @param {String} name The query event name.
   */
  _getListener (name) {
    let listeners = this._eventListener.get(name);
    if (listeners === undefined) {
      listeners = {
        once: new Set(),
        on: new Set()
      };
      this._eventListener.set(name, listeners);
    }
    return listeners
  }

  /**
   * Adds a named event listener. The listener is removed after it has been
   * called once.
   *
   * @param {String} name The event name to listen to.
   * @param {Function} f The function that is executed when the event is fired.
   */
  once (name, f) {
    let listeners = this._getListener(name);
    listeners.once.add(f);
  }

  /**
   * Adds a named event listener.
   *
   * @param {String} name The event name to listen to.
   * @param {Function} f The function that is executed when the event is fired.
   */
  on (name, f) {
    let listeners = this._getListener(name);
    listeners.on.add(f);
  }

  /**
   * @private
   * Init the saved state for an event name.
   */
  _initStateListener (name) {
    let state = this._stateListener.get(name);
    if (state === undefined) {
      state = {};
      state.promise = new Promise(resolve => {
        state.resolve = resolve;
      });
      this._stateListener.set(name, state);
    }
    return state
  }

  /**
   * Returns a Promise that is resolved when the event name is called.
   * The Promise is immediately resolved when the event name was called in the
   * past.
   */
  when (name) {
    return this._initStateListener(name).promise
  }

  /**
   * Remove an event listener that was registered with either
   * {@link EventHandler#on} or {@link EventHandler#once}.
   */
  off (name, f) {
    if (name == null || f == null) {
      throw new Error('You must specify event name and function!')
    }
    const listener = this._eventListener.get(name);
    if (listener !== undefined) {
      listener.on.delete(f);
      listener.once.delete(f);
    }
  }

  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @param {String} name The event name.
   * @param {Array} args The arguments that are applied to the event listener.
   */
  emit (name, ...args) {
    this._initStateListener(name).resolve();
    const listener = this._eventListener.get(name);
    if (listener !== undefined) {
      listener.on.forEach(f => f.apply(null, args));
      listener.once.forEach(f => f.apply(null, args));
      listener.once = new Set();
    } else if (name === 'error') {
      console.error(args[0]);
    }
  }
  destroy () {
    this._eventListener = null;
  }
}

/**
 * @module utils
 */

/**
 * General event handler implementation.
 */
class EventHandler {
  constructor () {
    this.eventListeners = [];
  }

  /**
   * To prevent memory leaks, call this method when the eventListeners won't be
   * used anymore.
   */
  destroy () {
    this.eventListeners = null;
  }

  /**
   * Adds an event listener that is called when
   * {@link EventHandler#callEventListeners} is called.
   *
   * @param {Function} f The event handler.
   */
  addEventListener (f) {
    this.eventListeners.push(f);
  }

  /**
   * Removes an event listener.
   *
   * @param {Function} f The event handler that was added with
   *                     {@link EventHandler#addEventListener}
   */
  removeEventListener (f) {
    this.eventListeners = this.eventListeners.filter(g => f !== g);
  }

  /**
   * Removes all event listeners.
   */
  removeAllEventListeners () {
    this.eventListeners = [];
  }

  /**
   * Call all event listeners that were added via
   * {@link EventHandler#addEventListener}.
   *
   * @param {Transaction} transaction The transaction object
   * @param {YEvent} event An event object that describes the change on a type.
   */
  callEventListeners (transaction, event) {
    for (var i = 0; i < this.eventListeners.length; i++) {
      try {
        const f = this.eventListeners[i];
        f(event, transaction);
      } catch (e) {
        /*
          Your observer threw an error. This error was caught so that Yjs
          can ensure data consistency! In order to debug this error you
          have to check "Pause On Caught Exceptions" in developer tools.
        */
        console.error(e);
      }
    }
  }
}

/**
 * @module utils
 */

/**
 * YEvent describes the changes on a YType.
 */
class YEvent {
  /**
   * @param {Type} target The changed type.
   */
  constructor (target) {
    /**
     * The type on which this event was created on.
     * @type {Type}
     */
    this.target = target;
    /**
     * The current target on which the observe callback is called.
     * @type {Type}
     */
    this.currentTarget = target;
  }

  /**
   * Computes the path from `y` to the changed type.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */
  get path () {
    return this.currentTarget.getPathTo(this.target)
  }
}

/**
 * @module structs
 */

// restructure children as if they were inserted one after another
const integrateChildren = (y, start) => {
  let right;
  do {
    right = start._right;
    start._right = null;
    start._right_origin = null;
    start._origin = start._left;
    start._integrate(y);
    start = right;
  } while (right !== null)
};

const gcChildren = (y, item) => {
  while (item !== null) {
    item._delete(y, false, true);
    item._gc(y);
    item = item._right;
  }
};

/**
 * Abstract Yjs Type class
 */
class Type extends Item {
  constructor () {
    super();
    this._map = new Map();
    this._start = null;
    this._y = null;
    this._eventHandler = new EventHandler();
    this._deepEventHandler = new EventHandler();
  }

  /**
   * The first non-deleted item
   */
  get _first () {
    let n = this._start;
    while (n !== null && n._deleted) {
      n = n._right;
    }
    return n
  }

  /**
   * Compute the path from this type to the specified target.
   *
   * @example
   * It should be accessible via `this.get(result[0]).get(result[1])..`
   * const path = type.getPathTo(child)
   * // assuming `type instanceof YArray`
   * console.log(path) // might look like => [2, 'key1']
   * child === type.get(path[0]).get(path[1])
   *
   * @param {Type | Y | any} type Type target
   * @return {Array<string>} Path to the target
   */
  getPathTo (type) {
    if (type === this) {
      return []
    }
    const path = [];
    const y = this._y;
    while (type !== this && type !== y) {
      let parent = type._parent;
      if (type._parentSub !== null) {
        path.unshift(type._parentSub);
      } else {
        // parent is array-ish
        for (let [i, child] of parent) {
          if (child === type) {
            path.unshift(i);
            break
          }
        }
      }
      type = parent;
    }
    if (type !== this) {
      throw new Error('The type is not a child of this node')
    }
    return path
  }

  /**
   * Creates YArray Event and calls observers.
   * @private
   */
  _callObserver (transaction, parentSubs, remote) {
    this._callEventHandler(transaction, new YEvent(this));
  }

  /**
   * Call event listeners with an event. This will also add an event to all
   * parents (for `.observeDeep` handlers).
   * @private
   */
  _callEventHandler (transaction, event) {
    const changedParentTypes = transaction.changedParentTypes;
    this._eventHandler.callEventListeners(transaction, event);
    /**
     * @type {any}
     */
    let type = this;
    while (type !== this._y) {
      let events = changedParentTypes.get(type);
      if (events === undefined) {
        events = [];
        changedParentTypes.set(type, events);
      }
      events.push(event);
      type = type._parent;
    }
  }

  /**
   * Helper method to transact if the y instance is available.
   *
   * TODO: Currently event handlers are not thrown when a type is not registered
   *       with a Yjs instance.
   * @private
   */
  _transact (f) {
    const y = this._y;
    if (y !== null) {
      y.transact(f);
    } else {
      f(y);
    }
  }

  /**
   * Observe all events that are created on this type.
   *
   * @param {Function} f Observer function
   */
  observe (f) {
    this._eventHandler.addEventListener(f);
  }

  /**
   * Observe all events that are created by this type and its children.
   *
   * @param {Function} f Observer function
   */
  observeDeep (f) {
    this._deepEventHandler.addEventListener(f);
  }

  /**
   * Unregister an observer function.
   *
   * @param {Function} f Observer function
   */
  unobserve (f) {
    this._eventHandler.removeEventListener(f);
  }

  /**
   * Unregister an observer function.
   *
   * @param {Function} f Observer function
   */
  unobserveDeep (f) {
    this._deepEventHandler.removeEventListener(f);
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Y} y The Yjs instance
   * @private
   */
  _integrate (y) {
    super._integrate(y);
    this._y = y;
    // when integrating children we must make sure to
    // integrate start
    const start = this._start;
    if (start !== null) {
      this._start = null;
      integrateChildren(y, start);
    }
    // integrate map children_integrate
    const map = this._map;
    this._map = new Map();
    for (let t of map.values()) {
      // TODO make sure that right elements are deleted!
      integrateChildren(y, t);
    }
  }

  _gcChildren (y) {
    gcChildren(y, this._start);
    this._start = null;
    this._map.forEach(item => {
      gcChildren(y, item);
    });
    this._map = new Map();
  }

  _gc (y) {
    this._gcChildren(y);
    super._gc(y);
  }

  /**
   * @abstract
   * @return {Object | Array | number | string}
   */
  toJSON () {}

  /**
   * Mark this Item as deleted.
   *
   * @param {Y} y The Yjs instance
   * @param {boolean} createDelete Whether to propagate a message that this
   *                               Type was deleted.
   * @param {boolean} [gcChildren=(y._hasUndoManager===false)] Whether to garbage
   *                                         collect the children of this type.
   * @private
   */
  _delete (y, createDelete, gcChildren) {
    if (gcChildren === undefined || !y.gcEnabled) {
      gcChildren = y._hasUndoManager === false && y.gcEnabled;
    }
    super._delete(y, createDelete, gcChildren);
    y._transaction.changedTypes.delete(this);
    // delete map types
    for (let value of this._map.values()) {
      if (value instanceof Item && !value._deleted) {
        value._delete(y, false, gcChildren);
      }
    }
    // delete array types
    let t = this._start;
    while (t !== null) {
      if (!t._deleted) {
        t._delete(y, false, gcChildren);
      }
      t = t._right;
    }
    if (gcChildren) {
      this._gcChildren(y);
    }
  }
}

/**
 * @module utils
 */
/**
 * A transaction is created for every change on the Yjs model. It is possible
 * to bundle changes on the Yjs model in a single transaction to
 * minimize the number on messages sent and the number of observer calls.
 * If possible the user of this library should bundle as many changes as
 * possible. Here is an example to illustrate the advantages of bundling:
 *
 * @example
 * const map = y.define('map', YMap)
 * // Log content when change is triggered
 * map.observe(() => {
 *   console.log('change triggered')
 * })
 * // Each change on the map type triggers a log message:
 * map.set('a', 0) // => "change triggered"
 * map.set('b', 0) // => "change triggered"
 * // When put in a transaction, it will trigger the log after the transaction:
 * y.transact(() => {
 *   map.set('a', 1)
 *   map.set('b', 1)
 * }) // => "change triggered"
 *
 */
class Transaction {
  constructor (y) {
    /**
     * @type {Y} The Yjs instance.
     */
    this.y = y;
    /**
     * All new types that are added during a transaction.
     * @type {Set<Item>}
     */
    this.newTypes = new Set();
    /**
     * All types that were directly modified (property added or child
     * inserted/deleted). New types are not included in this Set.
     * Maps from type to parentSubs (`item._parentSub = null` for YArray)
     * @type {Map<Type|Y,String>}
     */
    this.changedTypes = new Map();
    // TODO: rename deletedTypes
    /**
     * Set of all deleted Types and Structs.
     * @type {Set<Item>}
     */
    this.deletedStructs = new Set();
    /**
     * Saves the old state set of the Yjs instance. If a state was modified,
     * the original value is saved here.
     * @type {Map<Number,Number>}
     */
    this.beforeState = new Map();
    /**
     * Stores the events for the types that observe also child elements.
     * It is mainly used by `observeDeep`.
     * @type {Map<Type,Array<YEvent>>}
     */
    this.changedParentTypes = new Map();
    this.encodedStructsLen = 0;
    this.encodedStructs = createEncoder();
  }
}

/**
 * @module utils
 */

class MissingEntry {
  constructor (decoder, missing, struct) {
    this.decoder = decoder;
    this.missing = missing.length;
    this.struct = struct;
  }
}

/**
 * @private
 * Integrate remote struct
 * When a remote struct is integrated, other structs might be ready to ready to
 * integrate.
 * @param {Y} y
 * @param {Item} struct
 */
function _integrateRemoteStructHelper (y, struct) {
  const id = struct._id;
  if (id === undefined) {
    struct._integrate(y);
  } else {
    if (y.ss.getState(id.user) > id.clock) {
      return
    }
    if (!y.gcEnabled || struct.constructor === GC || (struct._parent.constructor !== GC && struct._parent._deleted === false)) {
      // Is either a GC or Item with an undeleted parent
      // save to integrate
      struct._integrate(y);
    } else {
      // Is an Item. parent was deleted.
      struct._gc(y);
    }
    let msu = y._missingStructs.get(id.user);
    if (msu != null) {
      let clock = id.clock;
      const finalClock = clock + struct._length;
      for (;clock < finalClock; clock++) {
        const missingStructs = msu.get(clock);
        if (missingStructs !== undefined) {
          missingStructs.forEach(missingDef => {
            missingDef.missing--;
            if (missingDef.missing === 0) {
              const decoder = missingDef.decoder;
              let oldPos = decoder.pos;
              let missing = missingDef.struct._fromBinary(y, decoder);
              decoder.pos = oldPos;
              if (missing.length === 0) {
                y._readyToIntegrate.push(missingDef.struct);
              }
            }
          });
          msu.delete(clock);
        }
      }
      if (msu.size === 0) {
        y._missingStructs.delete(id.user);
      }
    }
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 */
const integrateRemoteStructs = (decoder, y) => {
  const len = readUint32(decoder);
  for (let i = 0; i < len; i++) {
    let reference = readVarUint(decoder);
    let Constr = getStruct(reference);
    let struct = new Constr();
    let decoderPos = decoder.pos;
    let missing = struct._fromBinary(y, decoder);
    if (missing.length === 0) {
      while (struct != null) {
        _integrateRemoteStructHelper(y, struct);
        struct = y._readyToIntegrate.shift();
      }
    } else {
      let _decoder = createDecoder(decoder.arr.buffer);
      _decoder.pos = decoderPos;
      let missingEntry = new MissingEntry(_decoder, missing, struct);
      let missingStructs = y._missingStructs;
      for (let i = missing.length - 1; i >= 0; i--) {
        let m = missing[i];
        if (!missingStructs.has(m.user)) {
          missingStructs.set(m.user, new Map());
        }
        let msu = missingStructs.get(m.user);
        if (!msu.has(m.clock)) {
          msu.set(m.clock, []);
        }
        let mArray = msu = msu.get(m.clock);
        mArray.push(missingEntry);
      }
    }
  }
};

// TODO: use this above / refactor
/**
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 */
const integrateRemoteStruct = (decoder, y) => {
  let reference = readVarUint(decoder);
  let Constr = getStruct(reference);
  let struct = new Constr();
  let decoderPos = decoder.pos;
  let missing = struct._fromBinary(y, decoder);
  if (missing.length === 0) {
    while (struct != null) {
      _integrateRemoteStructHelper(y, struct);
      struct = y._readyToIntegrate.shift();
    }
  } else {
    let _decoder = createDecoder(decoder.arr.buffer);
    _decoder.pos = decoderPos;
    let missingEntry = new MissingEntry(_decoder, missing, struct);
    let missingStructs = y._missingStructs;
    for (let i = missing.length - 1; i >= 0; i--) {
      let m = missing[i];
      if (!missingStructs.has(m.user)) {
        missingStructs.set(m.user, new Map());
      }
      let msu = missingStructs.get(m.user);
      if (!msu.has(m.clock)) {
        msu.set(m.clock, []);
      }
      let mArray = msu = msu.get(m.clock);
      mArray.push(missingEntry);
    }
  }
};

/**
 * @module sync-protocol
 */

/**
 * @typedef {Map<number, number>} StateMap
 */

/**
 * Core Yjs only defines three message types:
 * • YjsSyncStep1: Includes the State Set of the sending client. When received, the client should reply with YjsSyncStep2.
 * • YjsSyncStep2: Includes all missing structs and the complete delete set. When received, the the client is assured that
 *   it received all information from the remote client.
 *
 * In a peer-to-peer network, you may want to introduce a SyncDone message type. Both parties should initiate the connection
 * with SyncStep1. When a client received SyncStep2, it should reply with SyncDone. When the local client received both
 * SyncStep2 and SyncDone, it is assured that it is synced to the remote client.
 *
 * In a client-server model, you want to handle this differently: The client should initiate the connection with SyncStep1.
 * When the server receives SyncStep1, it should reply with SyncStep2 immediately followed by SyncStep1. The client replies
 * with SyncStep2 when it receives SyncStep1. Optionally the server may send a SyncDone after it received SyncStep2, so the
 * client knows that the sync is finished.  There are two reasons for this more elaborated sync model: 1. This protocol can
 * easily be implemented on top of http and websockets. 2. The server shoul only reply to requests, and not initiate them.
 * Therefore it is necesarry that the client initiates the sync.
 *
 * Construction of a message:
 * [messageType : varUint, message definition..]
 *
 * Note: A message does not include information about the room name. This must to be handled by the upper layer protocol!
 *
 * stringify[messageType] stringifies a message definition (messageType is already read from the bufffer)
 */

const messageYjsSyncStep1 = 0;
const messageYjsSyncStep2 = 1;
const messageYjsUpdate = 2;

/**
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 * @return {string}
 */
const stringifyStructs = (decoder, y) => {
  let str = '';
  const len = readUint32(decoder);
  for (let i = 0; i < len; i++) {
    let reference = readVarUint(decoder);
    let Constr = getStruct(reference);
    let struct = new Constr();
    let missing = struct._fromBinary(y, decoder);
    let logMessage = '  ' + struct._logString();
    if (missing.length > 0) {
      logMessage += ' .. missing: ' + missing.map(stringifyItemID).join(', ');
    }
    str += logMessage + '\n';
  }
  return str
};

/**
 * Write all Items that are not not included in ss to
 * the encoder object.
 *
 * @param {encoding.Encoder} encoder
 * @param {Y} y
 * @param {StateMap} ss State Set received from a remote client. Maps from client id to number of created operations by client id.
 */
const writeStructs = (encoder, y, ss) => {
  const lenPos = length(encoder);
  writeUint32(encoder, 0);
  let len = 0;
  for (let user of y.ss.state.keys()) {
    let clock = ss.get(user) || 0;
    if (user !== RootFakeUserID) {
      const minBound = createID(user, clock);
      const overlappingLeft = y.os.findPrev(minBound);
      const rightID = overlappingLeft === null ? null : overlappingLeft._id;
      if (rightID !== null && rightID.user === user && rightID.clock + overlappingLeft._length > clock) {
        // TODO: only write partial content (only missing content)
        // const struct = overlappingLeft._clonePartial(clock - rightID.clock)
        const struct = overlappingLeft;
        struct._toBinary(encoder);
        len++;
      }
      y.os.iterate(minBound, createID(user, Number.MAX_VALUE), struct => {
        struct._toBinary(encoder);
        len++;
      });
    }
  }
  setUint32(encoder, lenPos, len);
};

/**
 * Read structs and delete operations from decoder and apply them on a shared document.
 *
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 */
const readStructs = (decoder, y) => {
  const len = readUint32(decoder);
  for (let i = 0; i < len; i++) {
    integrateRemoteStruct(decoder, y);
  }
};

/**
 * Read SyncStep1 and return it as a readable string.
 *
 * @param {decoding.Decoder} decoder
 * @return {string}
 */
const stringifySyncStep1 = (decoder) => {
  let s = 'SyncStep1: ';
  const len = readUint32(decoder);
  for (let i = 0; i < len; i++) {
    const user = readVarUint(decoder);
    const clock = readVarUint(decoder);
    s += `(${user}:${clock})`;
  }
  return s
};

/**
 * Create a sync step 1 message based on the state of the current shared document.
 *
 * @param {encoding.Encoder} encoder
 * @param {Y} y
 */
const writeSyncStep1 = (encoder, y) => {
  writeVarUint(encoder, messageYjsSyncStep1);
  writeStateMap(encoder, y.ss.state);
};

/**
 * @param {encoding.Encoder} encoder
 * @param {Y} y
 * @param {Map<number, number>} ss
 */
const writeSyncStep2 = (encoder, y, ss) => {
  writeVarUint(encoder, messageYjsSyncStep2);
  writeStructs(encoder, y, ss);
  writeDeleteStore(encoder, y.ds);
};

/**
 * Read SyncStep1 message and reply with SyncStep2.
 *
 * @param {decoding.Decoder} decoder The reply to the received message
 * @param {encoding.Encoder} encoder The received message
 * @param {Y} y
 */
const readSyncStep1 = (decoder, encoder, y) =>
  writeSyncStep2(encoder, y, readStateMap(decoder));

/**
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 * @return {string}
 */
const stringifySyncStep2 = (decoder, y) => {
  let str = '  == Sync step 2:\n';
  str += ' + Structs:\n';
  str += stringifyStructs(decoder, y);
  // write DS to string
  str += ' + Delete Set:\n';
  str += stringifyDeleteStore(decoder);
  return str
};

/**
 * Read and apply Structs and then DeleteStore to a y instance.
 *
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 */
const readSyncStep2 = (decoder, y) => {
  readStructs(decoder, y);
  readDeleteStore(decoder, y);
};

/**
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 * @return {string}
 */
const stringifyUpdate = (decoder, y) =>
  '  == Update:\n' + stringifyStructs(decoder, y);

/**
 * @param {encoding.Encoder} encoder
 * @param {number} numOfStructs
 * @param {encoding.Encoder} updates
 */
const writeUpdate = (encoder, numOfStructs, updates) => {
  writeVarUint(encoder, messageYjsUpdate);
  writeUint32(encoder, numOfStructs);
  writeBinaryEncoder(encoder, updates);
};

const readUpdate = readStructs;

/**
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 * @return {string} The message converted to string
 */
const stringifySyncMessage = (decoder, y) => {
  const messageType = readVarUint(decoder);
  let stringifiedMessage;
  let stringifiedMessageType;
  switch (messageType) {
    case messageYjsSyncStep1:
      stringifiedMessageType = 'YjsSyncStep1';
      stringifiedMessage = stringifySyncStep1(decoder);
      break
    case messageYjsSyncStep2:
      stringifiedMessageType = 'YjsSyncStep2';
      stringifiedMessage = stringifySyncStep2(decoder, y);
      break
    case messageYjsUpdate:
      stringifiedMessageType = 'YjsUpdate';
      stringifiedMessage = stringifyStructs(decoder, y);
      break
    default:
      stringifiedMessageType = 'Unknown';
      stringifiedMessage = 'Unknown';
  }
  return `Message ${stringifiedMessageType}:\n${stringifiedMessage}`
};

/**
 * @param {decoding.Decoder} decoder A message received from another client
 * @param {encoding.Encoder} encoder The reply message. Will not be sent if empty.
 * @param {Y} y
 */
const readSyncMessage = (decoder, encoder, y) => {
  const messageType = readVarUint(decoder);
  switch (messageType) {
    case messageYjsSyncStep1:
      readSyncStep1(decoder, encoder, y);
      break
    case messageYjsSyncStep2:
      y.transact(() => readSyncStep2(decoder, y), true);
      break
    case messageYjsUpdate:
      y.transact(() => readUpdate(decoder, y), true);
      break
    default:
      throw new Error('Unknown message type')
  }
  return messageType
};

var sync = /*#__PURE__*/Object.freeze({
  messageYjsSyncStep1: messageYjsSyncStep1,
  messageYjsSyncStep2: messageYjsSyncStep2,
  messageYjsUpdate: messageYjsUpdate,
  stringifyStructs: stringifyStructs,
  writeStructs: writeStructs,
  readStructs: readStructs,
  stringifySyncStep1: stringifySyncStep1,
  writeSyncStep1: writeSyncStep1,
  writeSyncStep2: writeSyncStep2,
  readSyncStep1: readSyncStep1,
  stringifySyncStep2: stringifySyncStep2,
  readSyncStep2: readSyncStep2,
  stringifyUpdate: stringifyUpdate,
  writeUpdate: writeUpdate,
  readUpdate: readUpdate,
  stringifySyncMessage: stringifySyncMessage,
  readSyncMessage: readSyncMessage
});

/**
 * Anything that can be encoded with `JSON.stringify` and can be decoded with
 * `JSON.parse`.
 *
 * The following property should hold:
 * `JSON.parse(JSON.stringify(key))===key`
 *
 * At the moment the only safe values are number and string.
 *
 * @typedef {(number|string|Object)} encodable
 */

/**
 * A Yjs instance handles the state of shared data.
 */
class Y extends NamedEventHandler {
  /**
   * @param {Object} [conf] configuration
   */
  constructor (conf = {}) {
    super();
    this.gcEnabled = conf.gc || false;
    this._contentReady = false;
    this.userID = generateRandomUint32();
    // TODO: This should be a Map so we can use encodables as keys
    this._map = new Map();
    this.ds = new DeleteStore();
    this.os = new OperationStore(this);
    this.ss = new StateStore(this);
    this._missingStructs = new Map();
    this._readyToIntegrate = [];
    this._transaction = null;
    this.connected = false;
    // for compatibility with isParentOf
    this._parent = null;
    this._hasUndoManager = false;
    this._deleted = false; // for compatiblity of having this as a parent for types
    this._id = null;
  }

  /**
   * Read the Decoder and fill the Yjs instance with data in the decoder.
   *
   * @param {Decoder} decoder The BinaryDecoder to read from.
   */
  importModel (decoder) {
    this.transact(() => {
      integrateRemoteStructs(decoder, this);
      readDeleteStore(decoder, this);
    });
  }

  /**
   * Encode the Yjs model to ArrayBuffer
   *
   * @return {ArrayBuffer} The Yjs model as ArrayBuffer
   */
  exportModel () {
    const encoder = createEncoder();
    writeStructs(encoder, this, new Map());
    writeDeleteStore(encoder, this.ds);
    return toBuffer(encoder)
  }
  _beforeChange () {}
  _callObserver (transaction, subs, remote) {}
  /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @param {Function} f The function that should be executed as a transaction
   * @param {?Boolean} remote Optional. Whether this transaction is initiated by
   *                          a remote peer. This should not be set manually!
   *                          Defaults to false.
   */
  transact (f, remote = false) {
    let initialCall = this._transaction === null;
    if (initialCall) {
      this._transaction = new Transaction(this);
      this.emit('beforeTransaction', this, this._transaction, remote);
    }
    try {
      f(this);
    } catch (e) {
      console.error(e);
    }
    if (initialCall) {
      this.emit('beforeObserverCalls', this, this._transaction, remote);
      const transaction = this._transaction;
      this._transaction = null;
      // emit change events on changed types
      transaction.changedTypes.forEach((subs, type) => {
        if (!type._deleted) {
          type._callObserver(transaction, subs, remote);
        }
      });
      transaction.changedParentTypes.forEach((events, type) => {
        if (!type._deleted) {
          events = events
            .filter(event =>
              !event.target._deleted
            );
          events
            .forEach(event => {
              event.currentTarget = type;
            });
          // we don't have to check for events.length
          // because there is no way events is empty..
          type._deepEventHandler.callEventListeners(transaction, events);
        }
      });
      // when all changes & events are processed, emit afterTransaction event
      this.emit('afterTransaction', this, transaction, remote);
    }
  }

  /**
   * Fake _start for root properties (y.set('name', type))
   *
   * @private
   */
  get _start () {
    return null
  }

  /**
   * Fake _start for root properties (y.set('name', type))
   *
   * @private
   */
  set _start (start) {}

  /**
   * Define a shared data type.
   *
   * Multiple calls of `y.define(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `y.define(name, type) === y.define(name, type)`
   *
   * After this method is called, the type is also available on `y._map.get(name)`.
   *
   * *Best Practices:*
   * Either define all types right after the Yjs instance is created or always
   * use `y.define(..)` when accessing a type.
   *
   * @example
   *   // Option 1
   *   const y = new Y(..)
   *   y.define('myArray', YArray)
   *   y.define('myMap', YMap)
   *   // .. when accessing the type use y._map.get(name)
   *   y.share.myArray.insert(..)
   *   y.share.myMap.set(..)
   *
   *   // Option2
   *   const y = new Y(..)
   *   // .. when accessing the type use `y.define(..)`
   *   y.define('myArray', YArray).insert(..)
   *   y.define('myMap', YMap).set(..)
   *
   * @param {String} name
   * @param {Function} TypeConstructor The constructor of the type definition
   * @returns {any} The created type. Constructed with TypeConstructor
   */
  define (name, TypeConstructor) {
    let id = createRootID(name, TypeConstructor);
    let type = this.os.get(id);
    if (this._map.get(name) === undefined) {
      this._map.set(name, type);
    } else if (this._map.get(name) !== type) {
      throw new Error('Type is already defined with a different constructor')
    }
    return type
  }

  /**
   * Get a defined type. The type must be defined locally. First define the
   * type with {@link define}.
   *
   * This returns the same value as `y.share[name]`
   *
   * @param {String} name The typename
   * @return {any}
   */
  get (name) {
    return this._map.get(name)
  }

  /**
   * Disconnect from the room, and destroy all traces of this Yjs instance.
   */
  destroy () {
    this.emit('destroyed', true);
    super.destroy();
    this._map = null;
    this.os = null;
    this.ds = null;
    this.ss = null;
  }
}

/**
 * @module structs
 */

class ItemJSON extends Item {
  constructor () {
    super();
    this._content = null;
  }
  _copy () {
    let struct = super._copy();
    struct._content = this._content;
    return struct
  }
  get _length () {
    const c = this._content;
    return c !== null ? c.length : 0
  }
  /**
   * @param {Y} y
   * @param {decoding.Decoder} decoder
   */
  _fromBinary (y, decoder) {
    let missing = super._fromBinary(y, decoder);
    let len = readVarUint(decoder);
    this._content = new Array(len);
    for (let i = 0; i < len; i++) {
      const ctnt = readVarString(decoder);
      let parsed;
      if (ctnt === 'undefined') {
        parsed = undefined;
      } else {
        parsed = JSON.parse(ctnt);
      }
      this._content[i] = parsed;
    }
    return missing
  }
  /**
   * @param {encoding.Encoder} encoder
   */
  _toBinary (encoder) {
    super._toBinary(encoder);
    const len = this._length;
    writeVarUint(encoder, len);
    for (let i = 0; i < len; i++) {
      let encoded;
      const content = this._content[i];
      if (content === undefined) {
        encoded = 'undefined';
      } else {
        encoded = JSON.stringify(content);
      }
      writeVarString(encoder, encoded);
    }
  }
  /**
   * Transform this YXml Type to a readable format.
   * Useful for logging as all Items and Delete implement this method.
   *
   * @private
   */
  _logString () {
    return logItemHelper('ItemJSON', this, `content:${JSON.stringify(this._content)}`)
  }
  _splitAt (y, diff) {
    if (diff === 0) {
      return this
    } else if (diff >= this._length) {
      return this._right
    }
    let item = new ItemJSON();
    item._content = this._content.splice(diff);
    splitHelper(y, this, item, diff);
    return item
  }
}

/**
 * @module structs
 */

class ItemString extends Item {
  constructor () {
    super();
    this._content = null;
  }
  _copy () {
    let struct = super._copy();
    struct._content = this._content;
    return struct
  }
  get _length () {
    return this._content.length
  }
  /**
   * @param {Y} y
   * @param {decoding.Decoder} decoder
   */
  _fromBinary (y, decoder) {
    let missing = super._fromBinary(y, decoder);
    this._content = readVarString(decoder);
    return missing
  }
  /**
   * @param {encoding.Encoder} encoder
   */
  _toBinary (encoder) {
    super._toBinary(encoder);
    writeVarString(encoder, this._content);
  }
  /**
   * Transform this YXml Type to a readable format.
   * Useful for logging as all Items and Delete implement this method.
   *
   * @private
   */
  _logString () {
    return logItemHelper('ItemString', this, `content:"${this._content}"`)
  }
  _splitAt (y, diff) {
    if (diff === 0) {
      return this
    } else if (diff >= this._length) {
      return this._right
    }
    let item = new ItemString();
    item._content = this._content.slice(diff);
    this._content = this._content.slice(0, diff);
    splitHelper(y, this, item, diff);
    return item
  }
}

/**
 * @module structs
 */

class ItemFormat extends Item {
  constructor () {
    super();
    this.key = null;
    this.value = null;
  }
  _copy (undeleteChildren, copyPosition) {
    let struct = super._copy();
    struct.key = this.key;
    struct.value = this.value;
    return struct
  }
  get _length () {
    return 1
  }
  get _countable () {
    return false
  }
  /**
   * @param {Y} y
   * @param {decoding.Decoder} decoder
   */
  _fromBinary (y, decoder) {
    const missing = super._fromBinary(y, decoder);
    this.key = readVarString(decoder);
    this.value = JSON.parse(readVarString(decoder));
    return missing
  }
  /**
   * @param {encoding.Encoder} encoder
   */
  _toBinary (encoder) {
    super._toBinary(encoder);
    writeVarString(encoder, this.key);
    writeVarString(encoder, JSON.stringify(this.value));
  }
  /**
   * Transform this YXml Type to a readable format.
   * Useful for logging as all Items and Delete implement this method.
   *
   * @private
   */
  _logString () {
    return logItemHelper('ItemFormat', this, `key:${JSON.stringify(this.key)},value:${JSON.stringify(this.value)}`)
  }
}

/**
 * @module structs
 */

class ItemEmbed extends Item {
  constructor () {
    super();
    this.embed = null;
  }
  _copy (undeleteChildren, copyPosition) {
    let struct = super._copy();
    struct.embed = this.embed;
    return struct
  }
  get _length () {
    return 1
  }
  /**
   * @param {Y} y
   * @param {decoding.Decoder} decoder
   */
  _fromBinary (y, decoder) {
    const missing = super._fromBinary(y, decoder);
    this.embed = JSON.parse(readVarString(decoder));
    return missing
  }
  /**
   * @param {encoding.Encoder} encoder
   */
  _toBinary (encoder) {
    super._toBinary(encoder);
    writeVarString(encoder, JSON.stringify(this.embed));
  }
  /**
   * Transform this YXml Type to a readable format.
   * Useful for logging as all Items and Delete implement this method.
   *
   * @private
   */
  _logString () {
    return logItemHelper('ItemEmbed', this, `embed:${JSON.stringify(this.embed)}`)
  }
}

/**
 * @module structs
 */

class ItemBinary extends Item {
  constructor () {
    super();
    this._content = null;
  }
  _copy () {
    let struct = super._copy();
    struct._content = this._content;
    return struct
  }
  /**
   * @param {Y} y
   * @param {decoding.Decoder} decoder
   */
  _fromBinary (y, decoder) {
    const missing = super._fromBinary(y, decoder);
    this._content = readPayload(decoder);
    return missing
  }
  /**
   * @param {encoding.Encoder} encoder
   */
  _toBinary (encoder) {
    super._toBinary(encoder);
    writePayload(encoder, this._content);
  }
  /**
   * Transform this YXml Type to a readable format.
   * Useful for logging as all Items and Delete implement this method.
   *
   * @private
   */
  _logString () {
    return logItemHelper('ItemBinary', this)
  }
}

/**
 *
 * @param {Item} item
 * @param {import("../protocols/history").HistorySnapshot} [snapshot]
 */
const isVisible = (item, snapshot) => snapshot === undefined ? !item._deleted : (snapshot.sm.has(item._id.user) && snapshot.sm.get(item._id.user) > item._id.clock && !snapshot.ds.isDeleted(item._id));

/**
 * @module types
 */

/**
 * Event that describes the changes on a YArray
 */
class YArrayEvent extends YEvent {
  /**
   * @param {YArray} yarray The changed type
   * @param {Boolean} remote Whether the changed was caused by a remote peer
   * @param {Transaction} transaction The transaction object
   */
  constructor (yarray, remote, transaction) {
    super(yarray);
    this.remote = remote;
    this._transaction = transaction;
    this._addedElements = null;
    this._removedElements = null;
  }

  /**
   * Child elements that were added in this transaction.
   *
   * @return {Set}
   */
  get addedElements () {
    if (this._addedElements === null) {
      const target = this.target;
      const transaction = this._transaction;
      const addedElements = new Set();
      transaction.newTypes.forEach(type => {
        if (type._parent === target && !transaction.deletedStructs.has(type)) {
          addedElements.add(type);
        }
      });
      this._addedElements = addedElements;
    }
    return this._addedElements
  }

  /**
   * Child elements that were removed in this transaction.
   *
   * @return {Set}
   */
  get removedElements () {
    if (this._removedElements === null) {
      const target = this.target;
      const transaction = this._transaction;
      const removedElements = new Set();
      transaction.deletedStructs.forEach(struct => {
        if (struct._parent === target && !transaction.newTypes.has(struct)) {
          removedElements.add(struct);
        }
      });
      this._removedElements = removedElements;
    }
    return this._removedElements
  }
}

/**
 * A shared Array implementation.
 */
class YArray extends Type {
  constructor () {
    super();
    this.length = 0;
  }
  /**
   * Creates YArray Event and calls observers.
   *
   * @private
   */
  _callObserver (transaction, parentSubs, remote) {
    this._callEventHandler(transaction, new YArrayEvent(this, remote, transaction));
  }

  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {any}
   */
  get (index) {
    let n = this._start;
    while (n !== null) {
      if (!n._deleted && n._countable) {
        if (index < n._length) {
          switch (n.constructor) {
            case ItemJSON:
            case ItemString:
              return n._content[index]
            default:
              return n
          }
        }
        index -= n._length;
      }
      n = n._right;
    }
  }

  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @param {Object} [snapshot]
   * @return {Array}
   */
  toArray (snapshot) {
    return this.map(c => c, snapshot)
  }

  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array}
   */
  toJSON () {
    return this.map(c => {
      if (c instanceof Type) {
        return c.toJSON()
      }
      return c
    })
  }

  /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @param {Function} f Function that produces an element of the new Array
   * @param {import('../protocols/history.js').HistorySnapshot} [snapshot]
   * @return {Array} A new array with each element being the result of the
   *                 callback function
   */
  map (f, snapshot) {
    const res = [];
    this.forEach((c, i) => {
      res.push(f(c, i, this));
    }, snapshot);
    return res
  }

  /**
   * Executes a provided function on once on overy element of this YArray.
   *
   * @param {Function} f A function to execute on every element of this YArray.
   * @param {import('../protocols/history.js').HistorySnapshot} [snapshot]
   */
  forEach (f, snapshot) {
    let index = 0;
    let n = this._start;
    while (n !== null) {
      if (isVisible(n, snapshot) && n._countable) {
        if (n instanceof Type) {
          f(n, index++, this);
        } else if (n.constructor === ItemBinary) {
          f(n._content, index++, this);
        } else {
          const content = n._content;
          const contentLen = content.length;
          for (let i = 0; i < contentLen; i++) {
            index++;
            f(content[i], index, this);
          }
        }
      }
      n = n._right;
    }
  }

  [Symbol.iterator] () {
    return {
      next: function () {
        while (this._item !== null && (this._item._deleted || this._item._length <= this._itemElement)) {
          // item is deleted or itemElement does not exist (is deleted)
          this._item = this._item._right;
          this._itemElement = 0;
        }
        if (this._item === null) {
          return {
            done: true
          }
        }
        let content;
        if (this._item instanceof Type) {
          content = this._item;
          this._item = this._item._right;
        } else {
          content = this._item._content[this._itemElement++];
        }
        return {
          value: content,
          done: false
        }
      },
      _item: this._start,
      _itemElement: 0,
      _count: 0
    }
  }

  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */
  delete (index, length = 1) {
    this._y.transact(() => {
      let item = this._start;
      let count = 0;
      while (item !== null && length > 0) {
        if (!item._deleted && item._countable) {
          if (count <= index && index < count + item._length) {
            const diffDel = index - count;
            item = item._splitAt(this._y, diffDel);
            item._splitAt(this._y, length);
            length -= item._length;
            item._delete(this._y);
            count += diffDel;
          } else {
            count += item._length;
          }
        }
        item = item._right;
      }
    });
    if (length > 0) {
      throw new Error('Delete exceeds the range of the YArray')
    }
  }

  /**
   * Inserts content after an element container.
   *
   * @private
   * @param {Item} left The element container to use as a reference.
   * @param {Array<number|string|Object|ArrayBuffer>} content The Array of content to insert (see {@see insert})
   */
  insertAfter (left, content) {
    this._transact(y => {
      let right;
      if (left === null) {
        right = this._start;
      } else {
        right = left._right;
      }
      let prevJsonIns = null;
      for (let i = 0; i < content.length; i++) {
        let c = content[i];
        if (typeof c === 'function') {
          c = new c(); // eslint-disable-line new-cap
        }
        if (c instanceof Type) {
          if (prevJsonIns !== null) {
            if (y !== null) {
              prevJsonIns._integrate(y);
            }
            left = prevJsonIns;
            prevJsonIns = null;
          }
          c._origin = left;
          c._left = left;
          c._right = right;
          c._right_origin = right;
          c._parent = this;
          if (y !== null) {
            c._integrate(y);
          } else if (left === null) {
            this._start = c;
          } else {
            left._right = c;
          }
          left = c;
        } else if (c.constructor === ArrayBuffer) {
          if (prevJsonIns !== null) {
            if (y !== null) {
              prevJsonIns._integrate(y);
            }
            left = prevJsonIns;
            prevJsonIns = null;
          }
          const itemBinary = new ItemBinary();
          itemBinary._origin = left;
          itemBinary._left = left;
          itemBinary._right = right;
          itemBinary._right_origin = right;
          itemBinary._parent = this;
          itemBinary._content = c;
          if (y !== null) {
            itemBinary._integrate(y);
          } else if (left === null) {
            this._start = itemBinary;
          } else {
            left._right = itemBinary;
          }
          left = itemBinary;
        } else {
          if (prevJsonIns === null) {
            prevJsonIns = new ItemJSON();
            prevJsonIns._origin = left;
            prevJsonIns._left = left;
            prevJsonIns._right = right;
            prevJsonIns._right_origin = right;
            prevJsonIns._parent = this;
            prevJsonIns._content = [];
          }
          prevJsonIns._content.push(c);
        }
      }
      if (prevJsonIns !== null) {
        if (y !== null) {
          prevJsonIns._integrate(y);
        } else if (prevJsonIns._left === null) {
          this._start = prevJsonIns;
        } else {
          left._right = prevJsonIns;
        }
      }
    });
    return content
  }

  /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(2, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<number|string|ArrayBuffer|Type>} content The array of content
   */
  insert (index, content) {
    this._transact(() => {
      let left = null;
      let right = this._start;
      let count = 0;
      const y = this._y;
      while (right !== null) {
        const rightLen = right._deleted ? 0 : (right._length - 1);
        if (count <= index && index <= count + rightLen) {
          const splitDiff = index - count;
          right = right._splitAt(y, splitDiff);
          left = right._left;
          count += splitDiff;
          break
        }
        if (!right._deleted) {
          count += right._length;
        }
        left = right;
        right = right._right;
      }
      if (index > count) {
        throw new Error('Index exceeds array range!')
      }
      this.insertAfter(left, content);
    });
  }

  /**
   * Appends content to this YArray.
   *
   * @param {Array<number|string|ArrayBuffer|Type>} content Array of content to append.
   */
  push (content) {
    let n = this._start;
    let lastUndeleted = null;
    while (n !== null) {
      if (!n._deleted) {
        lastUndeleted = n;
      }
      n = n._right;
    }
    this.insertAfter(lastUndeleted, content);
  }

  /**
   * Transform this YXml Type to a readable format.
   * Useful for logging as all Items and Delete implement this method.
   *
   * @private
   */
  _logString () {
    return logItemHelper('YArray', this, `start:${stringifyItemID(this._start)}"`)
  }
}

/**
 * @module types
 */

/**
 * Event that describes the changes on a YMap.
 */
class YMapEvent extends YEvent {
  /**
   * @param {YMap} ymap The YArray that changed.
   * @param {Set<any>} subs The keys that changed.
   * @param {boolean} remote Whether the change was created by a remote peer.
   */
  constructor (ymap, subs, remote) {
    super(ymap);
    this.keysChanged = subs;
    this.remote = remote;
  }
}

/**
 * A shared Map implementation.
 */
class YMap extends Type {
  /**
   * Creates YMap Event and calls observers.
   *
   * @private
   */
  _callObserver (transaction, parentSubs, remote) {
    this._callEventHandler(transaction, new YMapEvent(this, parentSubs, remote));
  }

  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object}
   */
  toJSON () {
    const map = {};
    for (let [key, item] of this._map) {
      if (!item._deleted) {
        let res;
        if (item instanceof Type) {
          if (item.toJSON !== undefined) {
            res = item.toJSON();
          } else {
            res = item.toString();
          }
        } else if (item.constructor === ItemBinary) {
          res = item._content;
        } else {
          res = item._content[0];
        }
        map[key] = res;
      }
    }
    return map
  }

  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @param {import('../protocols/history.js').HistorySnapshot} [snapshot]
   * @return {Array}
   */
  keys (snapshot) {
    // TODO: Should return either Iterator or Set!
    let keys = [];
    if (snapshot === undefined) {
      for (let [key, value] of this._map) {
        if (value._deleted) {
          keys.push(key);
        }
      }
    } else {
      this._map.forEach((_, key) => {
        if (YMap.prototype.has.call(this, key, snapshot)) {
          keys.push(key);
        }
      });
    }
    return keys
  }

  /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */
  delete (key) {
    this._transact((y) => {
      let c = this._map.get(key);
      if (y !== null && c !== undefined) {
        c._delete(y);
      }
    });
  }

  /**
   * Adds or updates an element with a specified key and value.
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {Object | string | number | Type | ArrayBuffer } value The value of the element to add
   */
  set (key, value) {
    this._transact(y => {
      const old = this._map.get(key) || null;
      if (old !== null) {
        if (
          old.constructor === ItemJSON &&
          !old._deleted && old._content[0] === value
        ) {
          // Trying to overwrite with same value
          // break here
          return value
        }
        if (y !== null) {
          old._delete(y);
        }
      }
      let v;
      if (typeof value === 'function') {
        v = new value(); // eslint-disable-line new-cap
        value = v;
      } else if (value instanceof Item) {
        v = value;
      } else if (value.constructor === ArrayBuffer) {
        v = new ItemBinary();
        v._content = value;
      } else {
        v = new ItemJSON();
        v._content = [value];
      }
      v._right = old;
      v._right_origin = old;
      v._parent = this;
      v._parentSub = key;
      if (y !== null) {
        v._integrate(y);
      } else {
        this._map.set(key, v);
      }
    });
    return value
  }

  /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key The key of the element to return.
   * @param {import('../protocols/history.js').HistorySnapshot} [snapshot]
   */
  get (key, snapshot) {
    let v = this._map.get(key);
    if (v === undefined) {
      return undefined
    }
    if (snapshot !== undefined) {
      // iterate until found element that exists
      while (!snapshot.sm.has(v._id.user) || v._id.clock >= snapshot.sm.get(v._id.user)) {
        v = v._right;
      }
    }
    if (isVisible(v, snapshot)) {
      if (v instanceof Type) {
        return v
      } else if (v.constructor === ItemBinary) {
        return v._content
      } else {
        return v._content[v._content.length - 1]
      }
    }
  }

  /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @param {import('../protocols/history.js').HistorySnapshot} [snapshot]
   */
  has (key, snapshot) {
    let v = this._map.get(key);
    if (v === undefined) {
      return false
    }
    if (snapshot !== undefined) {
      // iterate until found element that exists
      while (!snapshot.sm.has(v._id.user) || v._id.clock >= snapshot.sm.get(v._id.user)) {
        v = v._right;
      }
    }
    return isVisible(v, snapshot)
  }

  /**
   * Transform this YXml Type to a readable format.
   * Useful for logging as all Items and Delete implement this method.
   *
   * @private
   */
  _logString () {
    return logItemHelper('YMap', this, `mapSize:${this._map.size}`)
  }
}

/**
 * @module types
 */

/**
 * @private
 */
const integrateItem = (item, parent, y, left, right) => {
  item._origin = left;
  item._left = left;
  item._right = right;
  item._right_origin = right;
  item._parent = parent;
  if (y !== null) {
    item._integrate(y);
  } else if (left === null) {
    parent._start = item;
  } else {
    left._right = item;
  }
};

/**
 * @private
 */
const findNextPosition = (currentAttributes, parent, left, right, count) => {
  while (right !== null && count > 0) {
    switch (right.constructor) {
      case ItemEmbed:
      case ItemString:
        const rightLen = right._deleted ? 0 : (right._length - 1);
        if (count <= rightLen) {
          right = right._splitAt(parent._y, count);
          left = right._left;
          return [left, right, currentAttributes]
        }
        if (right._deleted === false) {
          count -= right._length;
        }
        break
      case ItemFormat:
        if (right._deleted === false) {
          updateCurrentAttributes(currentAttributes, right);
        }
        break
    }
    left = right;
    right = right._right;
  }
  return [left, right, currentAttributes]
};

/**
 * @private
 */
const findPosition = (parent, index) => {
  let currentAttributes = new Map();
  let left = null;
  let right = parent._start;
  return findNextPosition(currentAttributes, parent, left, right, index)
};

/**
 * Negate applied formats
 *
 * @private
 */
const insertNegatedAttributes = (y, parent, left, right, negatedAttributes) => {
  // check if we really need to remove attributes
  while (
    right !== null && (
      right._deleted === true || (
        right.constructor === ItemFormat &&
        (negatedAttributes.get(right.key) === right.value)
      )
    )
  ) {
    if (right._deleted === false) {
      negatedAttributes.delete(right.key);
    }
    left = right;
    right = right._right;
  }
  for (let [key, val] of negatedAttributes) {
    let format = new ItemFormat();
    format.key = key;
    format.value = val;
    integrateItem(format, parent, y, left, right);
    left = format;
  }
  return [left, right]
};

/**
 * @private
 */
const updateCurrentAttributes = (currentAttributes, item) => {
  const value = item.value;
  const key = item.key;
  if (value === null) {
    currentAttributes.delete(key);
  } else {
    currentAttributes.set(key, value);
  }
};

/**
 * @private
 */
const minimizeAttributeChanges = (left, right, currentAttributes, attributes) => {
  // go right while attributes[right.key] === right.value (or right is deleted)
  while (true) {
    if (right === null) {
      break
    } else if (right._deleted === true) ; else if (right.constructor === ItemFormat && (attributes[right.key] || null) === right.value) {
      // found a format, update currentAttributes and continue
      updateCurrentAttributes(currentAttributes, right);
    } else {
      break
    }
    left = right;
    right = right._right;
  }
  return [left, right]
};

/**
 * @private
 */
const insertAttributes = (y, parent, left, right, attributes, currentAttributes) => {
  const negatedAttributes = new Map();
  // insert format-start items
  for (let key in attributes) {
    const val = attributes[key];
    const currentVal = currentAttributes.get(key);
    if (currentVal !== val) {
      // save negated attribute (set null if currentVal undefined)
      negatedAttributes.set(key, currentVal || null);
      let format = new ItemFormat();
      format.key = key;
      format.value = val;
      integrateItem(format, parent, y, left, right);
      left = format;
    }
  }
  return [left, right, negatedAttributes]
};

/**
 * @private
 */
const insertText = (y, text, parent, left, right, currentAttributes, attributes) => {
  for (let [key] of currentAttributes) {
    if (attributes[key] === undefined) {
      attributes[key] = null;
    }
  }
  [left, right] = minimizeAttributeChanges(left, right, currentAttributes, attributes);
  let negatedAttributes;
  [left, right, negatedAttributes] = insertAttributes(y, parent, left, right, attributes, currentAttributes);
  // insert content
  let item;
  if (text.constructor === String) {
    item = new ItemString();
    item._content = text;
  } else {
    item = new ItemEmbed();
    item.embed = text;
  }
  integrateItem(item, parent, y, left, right);
  left = item;
  return insertNegatedAttributes(y, parent, left, right, negatedAttributes)
};

/**
 * @private
 */
const formatText = (y, length, parent, left, right, currentAttributes, attributes) => {
  [left, right] = minimizeAttributeChanges(left, right, currentAttributes, attributes);
  let negatedAttributes;
  [left, right, negatedAttributes] = insertAttributes(y, parent, left, right, attributes, currentAttributes);
  // iterate until first non-format or null is found
  // delete all formats with attributes[format.key] != null
  while (length > 0 && right !== null) {
    if (right._deleted === false) {
      switch (right.constructor) {
        case ItemFormat:
          const attr = attributes[right.key];
          if (attr !== undefined) {
            if (attr === right.value) {
              negatedAttributes.delete(right.key);
            } else {
              negatedAttributes.set(right.key, right.value);
            }
            right._delete(y);
          }
          updateCurrentAttributes(currentAttributes, right);
          break
        case ItemEmbed:
        case ItemString:
          right._splitAt(y, length);
          length -= right._length;
          break
      }
    }
    left = right;
    right = right._right;
  }
  return insertNegatedAttributes(y, parent, left, right, negatedAttributes)
};

/**
 * @private
 */
const deleteText = (y, length, parent, left, right, currentAttributes) => {
  while (length > 0 && right !== null) {
    if (right._deleted === false) {
      switch (right.constructor) {
        case ItemFormat:
          updateCurrentAttributes(currentAttributes, right);
          break
        case ItemEmbed:
        case ItemString:
          right._splitAt(y, length);
          length -= right._length;
          right._delete(y);
          break
      }
    }
    left = right;
    right = right._right;
  }
  return [left, right]
};

// TODO: In the quill delta representation we should also use the format {ops:[..]}
/**
 * The Quill Delta format represents changes on a text document with
 * formatting information. For mor information visit {@link https://quilljs.com/docs/delta/|Quill Delta}
 *
 * @example
 *   {
 *     ops: [
 *       { insert: 'Gandalf', attributes: { bold: true } },
 *       { insert: ' the ' },
 *       { insert: 'Grey', attributes: { color: '#cccccc' } }
 *     ]
 *   }
 *
 * @typedef {Array<Object>} Delta
 */

/**
  * Attributes that can be assigned to a selection of text.
  *
  * @example
  *   {
  *     bold: true,
  *     font-size: '40px'
  *   }
  *
  * @typedef {Object} TextAttributes
  */

/**
 * Event that describes the changes on a YText type.
 *
 * @private
 */
class YTextEvent extends YArrayEvent {
  constructor (ytext, remote, transaction) {
    super(ytext, remote, transaction);
    this._delta = null;
  }
  // TODO: Should put this in a separate function. toDelta shouldn't be included
  //       in every Yjs distribution
  /**
   * Compute the changes in the delta format.
   *
   * @return {Delta} A {@link https://quilljs.com/docs/delta/|Quill Delta}) that
   *                 represents the changes on the document.
   *
   * @public
   */
  get delta () {
    if (this._delta === null) {
      const y = this.target._y;
      y.transact(() => {
        let item = this.target._start;
        const delta = [];
        const added = this.addedElements;
        const removed = this.removedElements;
        this._delta = delta;
        let action = null;
        let attributes = {}; // counts added or removed new attributes for retain
        const currentAttributes = new Map(); // saves all current attributes for insert
        const oldAttributes = new Map();
        let insert = '';
        let retain = 0;
        let deleteLen = 0;
        const addOp = function addOp () {
          if (action !== null) {
            /**
             * @type {any}
             */
            let op;
            switch (action) {
              case 'delete':
                op = { delete: deleteLen };
                deleteLen = 0;
                break
              case 'insert':
                op = { insert };
                if (currentAttributes.size > 0) {
                  op.attributes = {};
                  for (let [key, value] of currentAttributes) {
                    if (value !== null) {
                      op.attributes[key] = value;
                    }
                  }
                }
                insert = '';
                break
              case 'retain':
                op = { retain };
                if (Object.keys(attributes).length > 0) {
                  op.attributes = {};
                  for (let key in attributes) {
                    op.attributes[key] = attributes[key];
                  }
                }
                retain = 0;
                break
            }
            delta.push(op);
            action = null;
          }
        };
        while (item !== null) {
          switch (item.constructor) {
            case ItemEmbed:
              if (added.has(item)) {
                addOp();
                action = 'insert';
                insert = item.embed;
                addOp();
              } else if (removed.has(item)) {
                if (action !== 'delete') {
                  addOp();
                  action = 'delete';
                }
                deleteLen += 1;
              } else if (item._deleted === false) {
                if (action !== 'retain') {
                  addOp();
                  action = 'retain';
                }
                retain += 1;
              }
              break
            case ItemString:
              if (added.has(item)) {
                if (action !== 'insert') {
                  addOp();
                  action = 'insert';
                }
                insert += item._content;
              } else if (removed.has(item)) {
                if (action !== 'delete') {
                  addOp();
                  action = 'delete';
                }
                deleteLen += item._length;
              } else if (item._deleted === false) {
                if (action !== 'retain') {
                  addOp();
                  action = 'retain';
                }
                retain += item._length;
              }
              break
            case ItemFormat:
              if (added.has(item)) {
                const curVal = currentAttributes.get(item.key) || null;
                if (curVal !== item.value) {
                  if (action === 'retain') {
                    addOp();
                  }
                  if (item.value === (oldAttributes.get(item.key) || null)) {
                    delete attributes[item.key];
                  } else {
                    attributes[item.key] = item.value;
                  }
                } else {
                  item._delete(y);
                }
              } else if (removed.has(item)) {
                oldAttributes.set(item.key, item.value);
                const curVal = currentAttributes.get(item.key) || null;
                if (curVal !== item.value) {
                  if (action === 'retain') {
                    addOp();
                  }
                  attributes[item.key] = curVal;
                }
              } else if (item._deleted === false) {
                oldAttributes.set(item.key, item.value);
                const attr = attributes[item.key];
                if (attr !== undefined) {
                  if (attr !== item.value) {
                    if (action === 'retain') {
                      addOp();
                    }
                    if (item.value === null) {
                      attributes[item.key] = item.value;
                    } else {
                      delete attributes[item.key];
                    }
                  } else {
                    item._delete(y);
                  }
                }
              }
              if (item._deleted === false) {
                if (action === 'insert') {
                  addOp();
                }
                updateCurrentAttributes(currentAttributes, item);
              }
              break
          }
          item = item._right;
        }
        addOp();
        while (this._delta.length > 0) {
          let lastOp = this._delta[this._delta.length - 1];
          if (lastOp.retain !== undefined && lastOp.attributes === undefined) {
            // retain delta's if they don't assign attributes
            this._delta.pop();
          } else {
            break
          }
        }
      });
    }
    return this._delta
  }
}

/**
 * Type that represents text with formatting information.
 *
 * This type replaces y-richtext as this implementation is able to handle
 * block formats (format information on a paragraph), embeds (complex elements
 * like pictures and videos), and text formats (**bold**, *italic*).
 */
class YText extends YArray {
  /**
   * @param {String} [string] The initial value of the YText.
   */
  constructor (string) {
    super();
    if (typeof string === 'string') {
      const start = new ItemString();
      start._parent = this;
      start._content = string;
      this._start = start;
    }
  }

  /**
   * Creates YMap Event and calls observers.
   *
   * @private
   */
  _callObserver (transaction, parentSubs, remote) {
    this._callEventHandler(transaction, new YTextEvent(this, remote, transaction));
  }

  toDom () {
    return document.createTextNode(this.toString())
  }

  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */
  toString () {
    let str = '';
    /**
     * @type {any}
     */
    let n = this._start;
    while (n !== null) {
      if (!n._deleted && n._countable) {
        str += n._content;
      }
      n = n._right;
    }
    return str
  }

  toDomString () {
    return this.toDelta().map(delta => {
      const nestedNodes = [];
      for (let nodeName in delta.attributes) {
        const attrs = [];
        for (let key in delta.attributes[nodeName]) {
          attrs.push({key, value: delta.attributes[nodeName][key]});
        }
        // sort attributes to get a unique order
        attrs.sort((a, b) => a.key < b.key ? -1 : 1);
        nestedNodes.push({ nodeName, attrs });
      }
      // sort node order to get a unique order
      nestedNodes.sort((a, b) => a.nodeName < b.nodeName ? -1 : 1);
      // now convert to dom string
      let str = '';
      for (let i = 0; i < nestedNodes.length; i++) {
        const node = nestedNodes[i];
        str += `<${node.nodeName}`;
        for (let j = 0; j < node.attrs.length; j++) {
          const attr = node.attrs[i];
          str += ` ${attr.key}="${attr.value}"`;
        }
        str += '>';
      }
      str += delta.insert;
      for (let i = nestedNodes.length - 1; i >= 0; i--) {
        str += `</${nestedNodes[i].nodeName}>`;
      }
      return str
    })
  }

  /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {Delta} delta The changes to apply on this element.
   *
   * @public
   */
  applyDelta (delta) {
    this._transact(y => {
      let left = null;
      let right = this._start;
      const currentAttributes = new Map();
      for (let i = 0; i < delta.length; i++) {
        let op = delta[i];
        if (op.insert !== undefined) {
[left, right] = insertText(y, op.insert, this, left, right, currentAttributes, op.attributes || {});
        } else if (op.retain !== undefined) {
[left, right] = formatText(y, op.retain, this, left, right, currentAttributes, op.attributes || {});
        } else if (op.delete !== undefined) {
[left, right] = deleteText(y, op.delete, this, left, right, currentAttributes);
        }
      }
    });
  }

  /**
   * Returns the Delta representation of this YText type.
   *
   * @param {import('../protocols/history.js').HistorySnapshot} [snapshot]
   * @param {import('../protocols/history.js').HistorySnapshot} [prevSnapshot]
   * @return {Delta} The Delta representation of this type.
   *
   * @public
   */
  toDelta (snapshot, prevSnapshot) {
    let ops = [];
    let currentAttributes = new Map();
    let str = '';
    /**
     * @type {any}
     */
    let n = this._start;
    function packStr () {
      if (str.length > 0) {
        // pack str with attributes to ops
        let attributes = {};
        let addAttributes = false;
        for (let [key, value] of currentAttributes) {
          addAttributes = true;
          attributes[key] = value;
        }
        let op = { insert: str };
        if (addAttributes) {
          op.attributes = attributes;
        }
        ops.push(op);
        str = '';
      }
    }
    while (n !== null) {
      if (isVisible(n, snapshot) || (prevSnapshot !== undefined && isVisible(n, prevSnapshot))) {
        switch (n.constructor) {
          case ItemString:
            const cur = currentAttributes.get('ychange');
            if (snapshot !== undefined && !isVisible(n, snapshot)) {
              if (cur === undefined || cur.user !== n._id.user || cur.state !== 'removed') {
                packStr();
                currentAttributes.set('ychange', { user: n._id.user, state: 'removed' });
              }
            } else if (prevSnapshot !== undefined && !isVisible(n, prevSnapshot)) {
              if (cur === undefined || cur.user !== n._id.user || cur.state !== 'added') {
                packStr();
                currentAttributes.set('ychange', { user: n._id.user, state: 'added' });
              }
            } else if (cur !== undefined) {
              packStr();
              currentAttributes.delete('ychange');
            }
            str += n._content;
            break
          case ItemFormat:
            packStr();
            updateCurrentAttributes(currentAttributes, n);
            break
        }
      }
      n = n._right;
    }
    packStr();
    return ops
  }

  /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} attributes Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */
  insert (index, text, attributes = {}) {
    if (text.length <= 0) {
      return
    }
    this._transact(y => {
      let [left, right, currentAttributes] = findPosition(this, index);
      insertText(y, text, this, left, right, currentAttributes, attributes);
    });
  }

  /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object} embed The Object that represents the embed.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    embed
   *
   * @public
   */
  insertEmbed (index, embed, attributes = {}) {
    if (embed.constructor !== Object) {
      throw new Error('Embed must be an Object')
    }
    this._transact(y => {
      let [left, right, currentAttributes] = findPosition(this, index);
      insertText(y, embed, this, left, right, currentAttributes, attributes);
    });
  }

  /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */
  delete (index, length) {
    if (length === 0) {
      return
    }
    this._transact(y => {
      let [left, right, currentAttributes] = findPosition(this, index);
      deleteText(y, length, this, left, right, currentAttributes);
    });
  }

  /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */
  format (index, length, attributes) {
    this._transact(y => {
      let [left, right, currentAttributes] = findPosition(this, index);
      if (right === null) {
        return
      }
      formatText(y, length, this, left, right, currentAttributes, attributes);
    });
  }
  // TODO: De-duplicate code. The following code is in every type.
  /**
   * Transform this YText to a readable format.
   * Useful for logging as all Items implement this method.
   *
   * @private
   */
  _logString () {
    return logItemHelper('YText', this)
  }
}

/**
 * @module utils
 */

// TODO: Implement function to describe ranges

/**
 * A relative position that is based on the Yjs model. In contrast to an
 * absolute position (position by index), the relative position can be
 * recomputed when remote changes are received. For example:
 *
 * ```Insert(0, 'x')('a|bc') = 'xa|bc'``` Where | is the cursor position.
 *
 * A relative cursor position can be obtained with the function
 * {@link getRelativePosition} and it can be transformed to an absolute position
 * with {@link fromRelativePosition}.
 *
 * Pro tip: Use this to implement shared cursor locations in YText or YXml!
 * The relative position is {@link encodable}, so you can send it to other
 * clients.
 *
 * @example
 * // Current cursor position is at position 10
 * let relativePosition = getRelativePosition(yText, 10)
 * // modify yText
 * yText.insert(0, 'abc')
 * yText.delete(3, 10)
 * // Compute the cursor position
 * let absolutePosition = fromRelativePosition(y, relativePosition)
 * absolutePosition.type // => yText
 * console.log('cursor location is ' + absolutePosition.offset) // => cursor location is 3
 *
 * @typedef {encodable} RelativePosition
 */

/**
 * Create a relativePosition based on a absolute position.
 *
 * @param {YType} type The base type (e.g. YText or YArray).
 * @param {Integer} offset The absolute position.
 */
const getRelativePosition = (type, offset) => {
  // TODO: rename to createRelativePosition
  let t = type._start;
  while (t !== null) {
    if (!t._deleted && t._countable) {
      if (t._length > offset) {
        return [t._id.user, t._id.clock + offset]
      }
      offset -= t._length;
    }
    t = t._right;
  }
  return ['endof', type._id.user, type._id.clock || null, type._id.name || null, type._id.type || null]
};

/**
 * @typedef {Object} AbsolutePosition The result of {@link fromRelativePosition}
 * @property {YType} type The type on which to apply the absolute position.
 * @property {number} offset The absolute offset.r
 */

/**
 * Transforms a relative position back to a relative position.
 *
 * @param {Y} y The Yjs instance in which to query for the absolute position.
 * @param {RelativePosition} rpos The relative position.
 * @return {AbsolutePosition} The absolute position in the Yjs model
 *                            (type + offset).
 */
const fromRelativePosition = (y, rpos) => {
  if (rpos === null) {
    return null
  }
  if (rpos[0] === 'endof') {
    let id;
    if (rpos[3] === null) {
      id = createID(rpos[1], rpos[2]);
    } else {
      id = createRootID(rpos[3], rpos[4]);
    }
    let type = y.os.get(id);
    if (type === null) {
      return null
    }
    while (type._redone !== null) {
      type = type._redone;
    }
    if (type === null || type.constructor === GC) {
      return null
    }
    return {
      type,
      offset: type.length
    }
  } else {
    let offset = 0;
    let struct = y.os.findNodeWithUpperBound(createID(rpos[0], rpos[1])).val;
    if (struct === null || struct._id.user === RootFakeUserID) {
      return null // TODO: support fake ids?
    }
    const diff = rpos[1] - struct._id.clock;
    while (struct._redone !== null) {
      struct = struct._redone;
    }
    const parent = struct._parent;
    if (struct.constructor === GC || parent._deleted) {
      return null
    }
    if (!struct._deleted && struct._countable) {
      offset = diff;
    }
    struct = struct._left;
    while (struct !== null) {
      if (!struct._deleted && struct._countable) {
        offset += struct._length;
      }
      struct = struct._left;
    }
    return {
      type: parent,
      offset: offset
    }
  }
};

/**
 * Creates a mutual exclude function with the following property:
 *
 * @example
 * const mutex = createMutex()
 * mutex(() => {
 *   // This function is immediately executed
 *   mutex(() => {
 *     // This function is not executed, as the mutex is already active.
 *   })
 * })
 *
 * @return {Function} A mutual exclude function
 * @public
 */
const createMutex = () => {
  let token = true;
  return (f, g) => {
    if (token) {
      token = false;
      try {
        f();
      } finally {
        token = true;
      }
    } else if (g !== undefined) {
      g();
    }
  }
};

/**
 * @module bindings/dom
 */

/**
 * @module types
 */

/**
 * Define the elements to which a set of CSS queries apply.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors|CSS_Selectors}
 *
 * @example
 *   query = '.classSelector'
 *   query = 'nodeSelector'
 *   query = '#idSelector'
 *
 * @typedef {string} CSS_Selector
 */

/**
 * Represents a subset of the nodes of a YXmlElement / YXmlFragment and a
 * position within them.
 *
 * Can be created with {@link YXmlFragment#createTreeWalker}
 *
 * @public
 */
class YXmlTreeWalker {
  constructor (root, f) {
    this._filter = f || (() => true);
    this._root = root;
    this._currentNode = root;
    this._firstCall = true;
  }
  [Symbol.iterator] () {
    return this
  }
  /**
   * Get the next node.
   *
   * @return {YXmlElement} The next node.
   *
   * @public
   */
  next () {
    let n = this._currentNode;
    if (this._firstCall) {
      this._firstCall = false;
      if (!n._deleted && this._filter(n)) {
        return { value: n, done: false }
      }
    }
    do {
      if (!n._deleted && (n.constructor === YXmlElement || n.constructor === YXmlFragment) && n._start !== null) {
        // walk down in the tree
        n = n._start;
      } else {
        // walk right or up in the tree
        while (n !== this._root) {
          if (n._right !== null) {
            n = n._right;
            break
          }
          n = n._parent;
        }
        if (n === this._root) {
          n = null;
        }
      }
      if (n === this._root) {
        break
      }
    } while (n !== null && (n._deleted || !this._filter(n)))
    this._currentNode = n;
    if (n === null) {
      return { done: true }
    } else {
      return { value: n, done: false }
    }
  }
}

/**
 * @module types
 */

/**
 * An Event that describes changes on a YXml Element or Yxml Fragment
 *
 * @protected
 */
class YXmlEvent extends YEvent {
  /**
   * @param {Type} target The target on which the event is created.
   * @param {Set} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Boolean} remote Whether this change was created by a remote peer.
   * @param {Transaction} transaction The transaction instance with wich the
   *                                  change was created.
   */
  constructor (target, subs, remote, transaction) {
    super(target);
    /**
     * The transaction instance for the computed change.
     * @type {Transaction}
     */
    this._transaction = transaction;
    /**
     * Whether the children changed.
     * @type {Boolean}
     */
    this.childListChanged = false;
    /**
     * Set of all changed attributes.
     * @type {Set}
     */
    this.attributesChanged = new Set();
    /**
     * Whether this change was created by a remote peer.
     * @type {Boolean}
     */
    this.remote = remote;
    subs.forEach((sub) => {
      if (sub === null) {
        this.childListChanged = true;
      } else {
        this.attributesChanged.add(sub);
      }
    });
  }
}

/**
 * @module types
 */

/**
 * Dom filter function.
 *
 * @callback domFilter
 * @param {string} nodeName The nodeName of the element
 * @param {Map} attributes The map of attributes.
 * @return {boolean} Whether to include the Dom node in the YXmlElement.
 */

/**
 * Define the elements to which a set of CSS queries apply.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors|CSS_Selectors}
 *
 * @example
 *   query = '.classSelector'
 *   query = 'nodeSelector'
 *   query = '#idSelector'
 *
 * @typedef {string} CSS_Selector
 *//**
 * @module types
 */

/**
 * Represents a list of {@link YXmlElement}.and {@link YXmlText} types.
 * A YxmlFragment is similar to a {@link YXmlElement}, but it does not have a
 * nodeName and it does not have attributes. Though it can be bound to a DOM
 * element - in this case the attributes and the nodeName are not shared.
 *
 * @public
 */
class YXmlFragment extends YArray {
  /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {Function} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */
  createTreeWalker (filter) {
    return new YXmlTreeWalker(this, filter)
  }

  /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement} The first element that matches the query or null.
   *
   * @public
   */
  querySelector (query) {
    query = query.toUpperCase();
    const iterator = new YXmlTreeWalker(this, element => element.nodeName === query);
    const next = iterator.next();
    if (next.done) {
      return null
    } else {
      return next.value
    }
  }

  /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * TODO: Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement>} The elements that match this query.
   *
   * @public
   */
  querySelectorAll (query) {
    query = query.toUpperCase();
    return Array.from(new YXmlTreeWalker(this, element => element.nodeName === query))
  }

  /**
   * Creates YArray Event and calls observers.
   *
   * @private
   */
  _callObserver (transaction, parentSubs, remote) {
    this._callEventHandler(transaction, new YXmlEvent(this, parentSubs, remote, transaction));
  }

  toString () {
    return this.toDomString()
  }

  /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */
  toDomString () {
    return this.map(xml => xml.toDomString()).join('')
  }

  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object.<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the // TODO: include all tests

   * @param {DomBinding} [binding] You should not set this property. T// TODO: include all tests

   *                               used if DomBinding wants to create // TODO: include all tests

   *                               association to the created DOM type// TODO: include all tests

   * @return {DocumentFragment} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDom (_document = document, hooks = {}, binding) {
    const fragment = _document.createDocumentFragment();
    createAssociation(binding, fragment, this);
    this.forEach(xmlType => {
      fragment.insertBefore(xmlType.toDom(_document, hooks, binding), null);
    });
    return fragment
  }
  /**
   * Transform this YXml Type to a readable format.
   * Useful for logging as all Items and Delete implement this method.
   *
   * @private
   */
  _logString () {
    return logItemHelper('YXml', this)
  }
}

/**
 * An YXmlElement imitates the behavior of a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}.
 *
 * * An YXmlElement has attributes (key value pairs)
 * * An YXmlElement has childElements that must inherit from YXmlElement
 */
class YXmlElement extends YXmlFragment {
  constructor (nodeName = 'UNDEFINED') {
    super();
    this.nodeName = nodeName.toUpperCase();
  }

  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @private
   */
  _copy () {
    let struct = super._copy();
    struct.nodeName = this.nodeName;
    return struct
  }

  /**
   * Read the next Item in a Decoder and fill this Item with the read data.
   *
   * This is called when data is received from a remote peer.
   *
   * @private
   * @param {Y} y The Yjs instance that this Item belongs to.
   * @param {decoding.Decoder} decoder The decoder object to read data from.
   */
  _fromBinary (y, decoder) {
    const missing = super._fromBinary(y, decoder);
    this.nodeName = readVarString(decoder);
    return missing
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @private
   * @param {encoding.Encoder} encoder The encoder to write data to.
   */
  _toBinary (encoder) {
    super._toBinary(encoder);
    writeVarString(encoder, this.nodeName);
  }

  /**
   * Integrates this Item into the shared structure.
   *
   * This method actually applies the change to the Yjs instance. In case of
   * Item it connects _left and _right to this Item and calls the
   * {@link Item#beforeChange} method.
   *
   * * Checks for nodeName
   * * Sets domFilter
   *
   * @private
   * @param {Y} y The Yjs instance
   */
  _integrate (y) {
    if (this.nodeName === null) {
      throw new Error('nodeName must be defined!')
    }
    super._integrate(y);
  }

  toString () {
    return this.toDomString()
  }

  /**
   * Returns the string representation of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {String} The string representation of this type.
   *
   * @public
   */
  toDomString () {
    const attrs = this.getAttributes();
    const stringBuilder = [];
    const keys = [];
    for (let key in attrs) {
      keys.push(key);
    }
    keys.sort();
    const keysLen = keys.length;
    for (let i = 0; i < keysLen; i++) {
      const key = keys[i];
      stringBuilder.push(key + '="' + attrs[key] + '"');
    }
    const nodeName = this.nodeName.toLocaleLowerCase();
    const attrsString = stringBuilder.length > 0 ? ' ' + stringBuilder.join(' ') : '';
    return `<${nodeName}${attrsString}>${super.toDomString()}</${nodeName}>`
  }

  /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute (attributeName) {
    return YMap.prototype.delete.call(this, attributeName)
  }

  /**
   * Sets or updates an attribute.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {String} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute (attributeName, attributeValue) {
    return YMap.prototype.set.call(this, attributeName, attributeValue)
  }

  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @param {import('../protocols/history.js').HistorySnapshot} [snapshot]
   * @return {String} The queried attribute value.
   *
   * @public
   */
  getAttribute (attributeName, snapshot) {
    return YMap.prototype.get.call(this, attributeName, snapshot)
  }

  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @param {import('../protocols/history.js').HistorySnapshot} [snapshot]
   * @return {Object} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes (snapshot) {
    const obj = {};
    if (snapshot === undefined) {
      for (let [key, value] of this._map) {
        if (!value._deleted) {
          obj[key] = value._content[0];
        }
      }
    } else {
      YMap.prototype.keys.call(this, snapshot).forEach(key => {
        obj[key] = YMap.prototype.get.call(this, key, snapshot);
      });
    }
    return obj
  }
  // TODO: outsource the binding property.
  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {DomBinding} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDom (_document = document, hooks = {}, binding) {
    const dom = _document.createElement(this.nodeName);
    let attrs = this.getAttributes();
    for (let key in attrs) {
      dom.setAttribute(key, attrs[key]);
    }
    this.forEach(yxml => {
      dom.appendChild(yxml.toDom(_document, hooks, binding));
    });
    createAssociation(binding, dom, this);
    return dom
  }
}

/**
 * @module utils
 */

/**
 * Check if `parent` is a parent of `child`.
 *
 * @param {Type | Y} parent
 * @param {Type | Y} child
 * @return {Boolean} Whether `parent` is a parent of `child`.
 *
 * @public
 */
const isParentOf = (parent, child) => {
  child = child._parent;
  while (child !== null) {
    if (child === parent) {
      return true
    }
    child = child._parent;
  }
  return false
};

/**
 * @module bindings/dom
 */

/**
 * @module bindings/dom
 */

/**
 * @module diff
 */

/**
 * @module bindings/dom
 */

/**
 * @module bindings/dom
 */

/**
 * A filter defines which elements and attributes to share.
 * Return null if the node should be filtered. Otherwise return the Map of
 * accepted attributes.
 *
 * @callback FilterFunction
 * @param {string} nodeName
 * @param {Map} attrs
 * @return {Map|null}
 */

/**
 * @module types
 */

/**
 * You can manage binding to a custom type with YXmlHook.
 *
 * @public
 */
class YXmlHook extends YMap {
  /**
   * @param {String} hookName nodeName of the Dom Node.
   */
  constructor (hookName) {
    super();
    this.hookName = null;
    if (hookName !== undefined) {
      this.hookName = hookName;
    }
  }

  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @private
   */
  _copy () {
    const struct = super._copy();
    struct.hookName = this.hookName;
    return struct
  }

  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object.<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {DomBinding} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type
   * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDom (_document = document, hooks = {}, binding) {
    const hook = hooks[this.hookName];
    let dom;
    if (hook !== undefined) {
      dom = hook.createDom(this);
    } else {
      dom = document.createElement(this.hookName);
    }
    dom.setAttribute('data-yjs-hook', this.hookName);
    createAssociation(binding, dom, this);
    return dom
  }

  /**
   * Read the next Item in a Decoder and fill this Item with the read data.
   *
   * This is called when data is received from a remote peer.
   *
   * @param {Y} y The Yjs instance that this Item belongs to.
   * @param {decoding.Decoder} decoder The decoder object to read data from.
   *
   * @private
   */
  _fromBinary (y, decoder) {
    const missing = super._fromBinary(y, decoder);
    this.hookName = readVarString(decoder);
    return missing
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   *
   * @private
   */
  _toBinary (encoder) {
    super._toBinary(encoder);
    writeVarString(encoder, this.hookName);
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Y} y The Yjs instance
   *
   * @private
   */
  _integrate (y) {
    if (this.hookName === null) {
      throw new Error('hookName must be defined!')
    }
    super._integrate(y);
  }
}

/**
 * @module bindings/dom
 */

/**
 * @module bindings/dom
 */

/**
 * Creates an association (the information that a DOM element belongs to a
 * type).
 *
 * @private
 * @function
 * @param {DomBinding} domBinding The binding object
 * @param {DocumentFragment|Element|Text} dom The dom that is to be associated with type
 * @param {YXmlFragment|YXmlElement|YXmlHook|YXmlText} type The type that is to be associated with dom
 *
 */
const createAssociation = (domBinding, dom, type) => {
  if (domBinding !== undefined) {
    domBinding.domToType.set(dom, type);
    domBinding.typeToDom.set(type, dom);
  }
};

/**
 * @module types
 */

/**
 * Represents text in a Dom Element. In the future this type will also handle
 * simple formatting information like bold and italic.
 */
class YXmlText extends YText {
  /**
   * Creates a Dom Element that mirrors this YXmlText.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {DomBinding} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDom (_document = document, hooks, binding) {
    const dom = _document.createTextNode(this.toString());
    createAssociation(binding, dom, this);
    return dom
  }

  /**
   * Mark this Item as deleted.
   *
   * @param {Y} y The Yjs instance
   * @param {boolean} createDelete Whether to propagate a message that this
   *                               Type was deleted.
   * @param {boolean} [gcChildren=y._hasUndoManager===false] Whether to garbage
   *                                         collect the children of this type.
   *
   * @private
   */
  _delete (y, createDelete, gcChildren) {
    super._delete(y, createDelete, gcChildren);
  }
}

/**
 * @module awareness-protocol
 */

const messageUsersStateChanged = 0;

/**
 * @typedef {Object} UserStateUpdate
 * @property {number} UserStateUpdate.userID
 * @property {number} UserStateUpdate.clock
 * @property {Object} UserStateUpdate.state
 */

/**
 * @param {encoding.Encoder} encoder
 * @param {Array<UserStateUpdate>} stateUpdates
 */
const writeUsersStateChange = (encoder, stateUpdates) => {
  const len = stateUpdates.length;
  writeVarUint(encoder, messageUsersStateChanged);
  writeVarUint(encoder, len);
  for (let i = 0; i < len; i++) {
    const {userID, state, clock} = stateUpdates[i];
    writeVarUint(encoder, userID);
    writeVarUint(encoder, clock);
    writeVarString(encoder, JSON.stringify(state));
  }
};

const readUsersStateChange = (decoder, y) => {
  const added = [];
  const updated = [];
  const removed = [];
  const len = readVarUint(decoder);
  for (let i = 0; i < len; i++) {
    const userID = readVarUint(decoder);
    const clock = readVarUint(decoder);
    const state = JSON.parse(readVarString(decoder));
    const uClock = y.awarenessClock.get(userID) || 0;
    y.awarenessClock.set(userID, clock);
    if (state === null) {
      // only write if clock increases. cannot overwrite
      if (y.awareness.has(userID) && uClock < clock) {
        y.awareness.delete(userID);
        removed.push(userID);
      }
    } else if (uClock <= clock) { // allow to overwrite (e.g. when client was on, then offline)
      if (y.awareness.has(userID)) {
        updated.push(userID);
      } else {
        added.push(userID);
      }
      y.awareness.set(userID, state);
      y.awarenessClock.set(userID, clock);
    }
  }
  if (added.length > 0 || updated.length > 0 || removed.length > 0) {
    y.emit('awareness', {
      added, updated, removed
    });
  }
};

/**
 * @param {decoding.Decoder} decoder
 * @param {encoding.Encoder} encoder
 * @return {Array<UserStateUpdate>}
 */
const forwardUsersStateChange = (decoder, encoder) => {
  const len = readVarUint(decoder);
  const updates = [];
  writeVarUint(encoder, messageUsersStateChanged);
  writeVarUint(encoder, len);
  for (let i = 0; i < len; i++) {
    const userID = readVarUint(decoder);
    const clock = readVarUint(decoder);
    const state = readVarString(decoder);
    writeVarUint(encoder, userID);
    writeVarUint(encoder, clock);
    writeVarString(encoder, state);
    updates.push({userID, state: JSON.parse(state), clock});
  }
  return updates
};

/**
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 */
const readAwarenessMessage = (decoder, y) => {
  switch (readVarUint(decoder)) {
    case messageUsersStateChanged:
      readUsersStateChange(decoder, y);
      break
  }
};

/**
 * @typedef {Object} UserState
 * @property {number} UserState.userID
 * @property {any} UserState.state
 * @property {number} UserState.clock
 */

/**
 * @param {decoding.Decoder} decoder
 * @param {encoding.Encoder} encoder
 * @return {Array<UserState>} Array of state updates
 */
const forwardAwarenessMessage = (decoder, encoder) => {
  let s = [];
  switch (readVarUint(decoder)) {
    case messageUsersStateChanged:
      s = forwardUsersStateChange(decoder, encoder);
  }
  return s
};

var awareness = /*#__PURE__*/Object.freeze({
  writeUsersStateChange: writeUsersStateChange,
  readUsersStateChange: readUsersStateChange,
  forwardUsersStateChange: forwardUsersStateChange,
  readAwarenessMessage: readAwarenessMessage,
  forwardAwarenessMessage: forwardAwarenessMessage
});

const messagePermissionDenied = 0;

/**
 * @param {encoding.Encoder} encoder
 * @param {string} reason
 */
const writePermissionDenied = (encoder, reason) => {
  writeVarUint(encoder, messagePermissionDenied);
  writeVarString(encoder, reason);
};

/**
 * @callback PermissionDeniedHandler
 * @param {any} y
 * @param {string} reason
 */

/**
 *
 * @param {decoding.Decoder} decoder
 * @param {Y} y
 * @param {PermissionDeniedHandler} permissionDeniedHandler
 */
const readAuthMessage = (decoder, y, permissionDeniedHandler) => {
  switch (readVarUint(decoder)) {
    case messagePermissionDenied: permissionDeniedHandler(y, readVarString(decoder));
  }
};

var auth = /*#__PURE__*/Object.freeze({
  messagePermissionDenied: messagePermissionDenied,
  writePermissionDenied: writePermissionDenied,
  readAuthMessage: readAuthMessage
});

class ReverseOperation {
  constructor (y, transaction, bindingInfos) {
    this.created = new Date();
    const beforeState = transaction.beforeState;
    if (beforeState.has(y.userID)) {
      this.toState = createID(y.userID, y.ss.getState(y.userID) - 1);
      this.fromState = createID(y.userID, beforeState.get(y.userID));
    } else {
      this.toState = null;
      this.fromState = null;
    }
    this.deletedStructs = new Set();
    transaction.deletedStructs.forEach(struct => {
      this.deletedStructs.add({
        from: struct._id,
        len: struct._length
      });
    });
    /**
     * Maps from binding to binding information (e.g. cursor information)
     */
    this.bindingInfos = bindingInfos;
  }
}

function applyReverseOperation (y, scope, reverseBuffer) {
  let performedUndo = false;
  let undoOp = null;
  y.transact(() => {
    while (!performedUndo && reverseBuffer.length > 0) {
      undoOp = reverseBuffer.pop();
      // make sure that it is possible to iterate {from}-{to}
      if (undoOp.fromState !== null) {
        y.os.getItemCleanStart(undoOp.fromState);
        y.os.getItemCleanEnd(undoOp.toState);
        y.os.iterate(undoOp.fromState, undoOp.toState, op => {
          while (op._deleted && op._redone !== null) {
            op = op._redone;
          }
          if (op._deleted === false && isParentOf(scope, op)) {
            performedUndo = true;
            op._delete(y);
          }
        });
      }
      const redoitems = new Set();
      for (let del of undoOp.deletedStructs) {
        const fromState = del.from;
        const toState = createID(fromState.user, fromState.clock + del.len - 1);
        y.os.getItemCleanStart(fromState);
        y.os.getItemCleanEnd(toState);
        y.os.iterate(fromState, toState, op => {
          if (
            isParentOf(scope, op) &&
            op._parent !== y &&
            (
              op._id.user !== y.userID ||
              undoOp.fromState === null ||
              op._id.clock < undoOp.fromState.clock ||
              op._id.clock > undoOp.toState.clock
            )
          ) {
            redoitems.add(op);
          }
        });
      }
      redoitems.forEach(op => {
        const opUndone = op._redo(y, redoitems);
        performedUndo = performedUndo || opUndone;
      });
    }
  });
  if (performedUndo && undoOp !== null) {
    // should be performed after the undo transaction
    undoOp.bindingInfos.forEach((info, binding) => {
      binding._restoreUndoStackInfo(info);
    });
  }
  return performedUndo
}

/**
 * Saves a history of locally applied operations. The UndoManager handles the
 * undoing and redoing of locally created changes.
 */
class UndoManager {
  /**
   * @param {YType} scope The scope on which to listen for changes.
   * @param {Object} options Optionally provided configuration.
   */
  constructor (scope, options = {}) {
    this.options = options;
    this._bindings = new Set(options.bindings);
    options.captureTimeout = options.captureTimeout == null ? 500 : options.captureTimeout;
    this._undoBuffer = [];
    this._redoBuffer = [];
    this._scope = scope;
    this._undoing = false;
    this._redoing = false;
    this._lastTransactionWasUndo = false;
    const y = scope._y;
    this.y = y;
    y._hasUndoManager = true;
    let bindingInfos;
    y.on('beforeTransaction', (y, transaction, remote) => {
      if (!remote) {
        // Store binding information before transaction is executed
        // By restoring the binding information, we can make sure that the state
        // before the transaction can be recovered
        bindingInfos = new Map();
        this._bindings.forEach(binding => {
          bindingInfos.set(binding, binding._getUndoStackInfo());
        });
      }
    });
    y.on('afterTransaction', (y, transaction, remote) => {
      if (!remote && transaction.changedParentTypes.has(scope)) {
        let reverseOperation = new ReverseOperation(y, transaction, bindingInfos);
        if (!this._undoing) {
          let lastUndoOp = this._undoBuffer.length > 0 ? this._undoBuffer[this._undoBuffer.length - 1] : null;
          if (
            this._redoing === false &&
            this._lastTransactionWasUndo === false &&
            lastUndoOp !== null &&
            (options.captureTimeout < 0 || reverseOperation.created - lastUndoOp.created <= options.captureTimeout)
          ) {
            lastUndoOp.created = reverseOperation.created;
            if (reverseOperation.toState !== null) {
              lastUndoOp.toState = reverseOperation.toState;
              if (lastUndoOp.fromState === null) {
                lastUndoOp.fromState = reverseOperation.fromState;
              }
            }
            reverseOperation.deletedStructs.forEach(lastUndoOp.deletedStructs.add, lastUndoOp.deletedStructs);
          } else {
            this._lastTransactionWasUndo = false;
            this._undoBuffer.push(reverseOperation);
          }
          if (!this._redoing) {
            this._redoBuffer = [];
          }
        } else {
          this._lastTransactionWasUndo = true;
          this._redoBuffer.push(reverseOperation);
        }
      }
    });
  }

  /**
   * Enforce that the next change is created as a separate item in the undo stack
   */
  flushChanges () {
    this._lastTransactionWasUndo = true;
  }

  /**
   * Undo the last locally created change.
   */
  undo () {
    this._undoing = true;
    const performedUndo = applyReverseOperation(this.y, this._scope, this._undoBuffer);
    this._undoing = false;
    return performedUndo
  }

  /**
   * Redo the last locally created change.
   */
  redo () {
    this._redoing = true;
    const performedRedo = applyReverseOperation(this.y, this._scope, this._redoBuffer);
    this._redoing = false;
    return performedRedo
  }
}

registerStruct(0, GC);
registerStruct(1, ItemJSON);
registerStruct(2, ItemString);
registerStruct(3, ItemFormat);
registerStruct(4, Delete);

registerStruct(5, YArray);
registerStruct(6, YMap);
registerStruct(7, YText);
registerStruct(8, YXmlFragment);
registerStruct(9, YXmlElement);
registerStruct(10, YXmlText);
registerStruct(11, YXmlHook);
registerStruct(12, ItemEmbed);
registerStruct(13, ItemBinary);

exports.decoding = decoding;
exports.encoding = encoding;
exports.awarenessProtocol = awareness;
exports.syncProtocol = sync;
exports.authProtocol = auth;
exports.Y = Y;
exports.UndoManager = UndoManager;
exports.Transaction = Transaction;
exports.Array = YArray;
exports.Map = YMap;
exports.Text = YText;
exports.XmlText = YXmlText;
exports.XmlHook = YXmlHook;
exports.XmlElement = YXmlElement;
exports.XmlFragment = YXmlFragment;
exports.getRelativePosition = getRelativePosition;
exports.fromRelativePosition = fromRelativePosition;
exports.registerStruct = registerStruct;
exports.createMutex = createMutex;
//# sourceMappingURL=yjs.js.map


/***/ }),

/***/ "./node_modules/yjs/lib/binary.js":
/*!****************************************!*\
  !*** ./node_modules/yjs/lib/binary.js ***!
  \****************************************/
/*! exports provided: BITS32, BITS21, BITS16, BIT26, BIT32, toBase64, fromBase64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS32", function() { return BITS32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS21", function() { return BITS21; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS16", function() { return BITS16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT26", function() { return BIT26; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT32", function() { return BIT32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBase64", function() { return toBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromBase64", function() { return fromBase64; });
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string.js */ "./node_modules/yjs/lib/string.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals.js */ "./node_modules/yjs/lib/globals.js");
/* eslint-env browser */

/**
 * @module binary
 */




const BITS32 = 0xFFFFFFFF
const BITS21 = (1 << 21) - 1
const BITS16 = (1 << 16) - 1

const BIT26 = 1 << 26
const BIT32 = 1 << 32

/**
 * @param {Uint8Array} bytes
 * @return {string}
 */
const toBase64 = bytes => {
  let s = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    s += _string_js__WEBPACK_IMPORTED_MODULE_0__["fromCharCode"](bytes[i])
  }
  return btoa(s)
}

/**
 * @param {string} s
 * @return {Uint8Array}
 */
const fromBase64 = s => {
  const a = atob(s)
  const bytes = _globals_js__WEBPACK_IMPORTED_MODULE_1__["createUint8ArrayFromLen"](a.length)
  for (let i = 0; i < a.length; i++) {
    bytes[i] = a.charCodeAt(i)
  }
  return bytes
}


/***/ }),

/***/ "./node_modules/yjs/lib/broadcastchannel.js":
/*!**************************************************!*\
  !*** ./node_modules/yjs/lib/broadcastchannel.js ***!
  \**************************************************/
/*! exports provided: subscribe, publish */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./binary.js */ "./node_modules/yjs/lib/binary.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals.js */ "./node_modules/yjs/lib/globals.js");
/* eslint-env browser */




/**
 * @typedef {Object} Channel
 * @property {Set<Function>} Channel.subs
 * @property {BC} Channel.bc
 */

/**
 * @type {Map<string, Channel>}
 */
const channels = new Map()

class LocalStoragePolyfill {
  constructor (room) {
    this.room = room
    this.onmessage = null
    addEventListener('storage', e => e.key === room && this.onmessage !== null && this.onmessage({ data: _binary_js__WEBPACK_IMPORTED_MODULE_0__["fromBase64"](e.newValue) }))
  }
  /**
   * @param {ArrayBuffer} data
   */
  postMessage (buf) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.room, _binary_js__WEBPACK_IMPORTED_MODULE_0__["toBase64"](_globals_js__WEBPACK_IMPORTED_MODULE_1__["createUint8ArrayFromArrayBuffer"](buf)))
    }
  }
}

// Use BroadcastChannel or Polyfill
const BC = typeof BroadcastChannel === 'undefined' ? LocalStoragePolyfill : BroadcastChannel

/**
 * @param {string} room
 * @return {Channel}
 */
const getChannel = room => {
  let c = channels.get(room)
  if (c === undefined) {
    const subs = new Set()
    const bc = new BC(room)
    bc.onmessage = e => subs.forEach(sub => sub(e.data))
    c = {
      bc, subs
    }
    channels.set(room, c)
  }
  return c
}

/**
 * @function
 * @param {string} room
 * @param {Function} f
 */
const subscribe = (room, f) => getChannel(room).subs.add(f)

/**
 * Publish data to all subscribers (including subscribers on this tab)
 *
 * @function
 * @param {string} room
 * @param {ArrayBuffer} data
 */
const publish = (room, data) => {
  const c = getChannel(room)
  c.bc.postMessage(data)
  c.subs.forEach(sub => sub(data))
}


/***/ }),

/***/ "./node_modules/yjs/lib/globals.js":
/*!*****************************************!*\
  !*** ./node_modules/yjs/lib/globals.js ***!
  \*****************************************/
/*! exports provided: Uint8Array_, createArrayBufferFromArray, createUint8ArrayFromLen, createUint8ArrayFromBuffer, createUint8ArrayFromArrayBuffer, createArrayFromArrayBuffer, createPromise, createMap, createSet, pall, preject, presolve, until, error, wait */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uint8Array_", function() { return Uint8Array_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArrayBufferFromArray", function() { return createArrayBufferFromArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUint8ArrayFromLen", function() { return createUint8ArrayFromLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUint8ArrayFromBuffer", function() { return createUint8ArrayFromBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUint8ArrayFromArrayBuffer", function() { return createUint8ArrayFromArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createArrayFromArrayBuffer", function() { return createArrayFromArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPromise", function() { return createPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMap", function() { return createMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSet", function() { return createSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pall", function() { return pall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preject", function() { return preject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "presolve", function() { return presolve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "until", function() { return until; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return wait; });
/**
 * @module globals
 */

/* eslint-env browser */

const Uint8Array_ = Uint8Array

/**
 * @param {Array<number>} arr
 * @return {ArrayBuffer}
 */
const createArrayBufferFromArray = arr => new Uint8Array_(arr).buffer

const createUint8ArrayFromLen = len => new Uint8Array_(len)

/**
 * Create Uint8Array with initial content from buffer
 */
const createUint8ArrayFromBuffer = (buffer, byteOffset, length) => new Uint8Array_(buffer, byteOffset, length)

/**
 * Create Uint8Array with initial content from buffer
 */
const createUint8ArrayFromArrayBuffer = arraybuffer => new Uint8Array_(arraybuffer)
const createArrayFromArrayBuffer = arraybuffer => Array.from(createUint8ArrayFromArrayBuffer(arraybuffer))

const createPromise = f => new Promise(f)

const createMap = () => new Map()
const createSet = () => new Set()

/**
 * `Promise.all` wait for all promises in the array to resolve and return the result
 * @param {Array<Promise<any>>} arrp
 * @return {any}
 */
const pall = arrp => Promise.all(arrp)
const preject = reason => Promise.reject(reason)
const presolve = res => Promise.resolve(res)

const until = (timeout, check) => createPromise((resolve, reject) => {
  const hasTimeout = timeout > 0
  const untilInterval = () => {
    if (check()) {
      clearInterval(intervalHandle)
      resolve()
    } else if (hasTimeout) {
      timeout -= 10
      if (timeout < 0) {
        clearInterval(intervalHandle)
        reject(error('Timeout'))
      }
    }
  }
  const intervalHandle = setInterval(untilInterval, 10)
})

const error = description => new Error(description)

/**
 * @param {number} t Time to wait
 * @return {Promise} Promise that is resolved after t ms
 */
const wait = t => createPromise(r => setTimeout(r, t))


/***/ }),

/***/ "./node_modules/yjs/lib/string.js":
/*!****************************************!*\
  !*** ./node_modules/yjs/lib/string.js ***!
  \****************************************/
/*! exports provided: fromCharCode, fromCodePoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCharCode", function() { return fromCharCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCodePoint", function() { return fromCodePoint; });
/**
 * @module string
 */

const fromCharCode = String.fromCharCode
const fromCodePoint = String.fromCodePoint


/***/ }),

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/build/yjs.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./provider */ "./src/provider.js");





console.log(yjs__WEBPACK_IMPORTED_MODULE_0__);

const url = 'ws://localhost:12345/ws';
const room = Object(_util__WEBPACK_IMPORTED_MODULE_1__["getParameterByName"])('room');
const role = Object(_util__WEBPACK_IMPORTED_MODULE_1__["getParameterByName"])('role');

const provider = new _provider__WEBPACK_IMPORTED_MODULE_2__["WebsocketProvider"](url);

const y = provider.get(room);

const syncedArr = y.define('arr', yjs__WEBPACK_IMPORTED_MODULE_0__["Array"]);

async function go() {
  if (role === 'receiver') {
    syncedArr.push(['*c*']);
    y.connectToWs();
  } else if (role === 'sender') {
    syncedArr.push(['*s*']);
    syncedArr.delete(0);
    await Object(_util__WEBPACK_IMPORTED_MODULE_1__["wait"])(3e3);
    y.connectToWs();
  }

  setInterval(() => {
    console.log('Array content is:', syncedArr.toJSON());
  }, 1000);
}

go();

/***/ }),

/***/ "./src/provider.js":
/*!*************************!*\
  !*** ./src/provider.js ***!
  \*************************/
/*! exports provided: WebsocketProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketProvider", function() { return WebsocketProvider; });
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/build/yjs.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(yjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yjs_lib_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! yjs/lib/broadcastchannel.js */ "./node_modules/yjs/lib/broadcastchannel.js");
/*
Unlike stated in the LICENSE file, it is not necessary to include the copyright notice and permission notice when you copy code from this file.
*/

/**
 * @module provider/websocket
 */

/* eslint-env browser */




const messageSync = 0;
const messageAwareness = 1;
const messageAuth = 2;

const reconnectTimeout = 3000;

/**
 * @param {WebsocketsSharedDocument} doc
 * @param {string} reason
 */
const permissionDeniedHandler = (doc, reason) => console.warn(`Permission denied to access ${doc.url}.\n${reason}`);

/**
 * @param {WebsocketsSharedDocument} doc
 * @param {ArrayBuffer} buf
 * @return {Y.encoding.Encoder}
 */
const readMessage = (doc, buf) => {
  const decoder = yjs__WEBPACK_IMPORTED_MODULE_0__["decoding"].createDecoder(buf);
  const encoder = yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].createEncoder();
  const messageType = yjs__WEBPACK_IMPORTED_MODULE_0__["decoding"].readVarUint(decoder);
  switch (messageType) {
    case messageSync:
      yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].writeVarUint(encoder, messageSync);
      doc.mux(() => yjs__WEBPACK_IMPORTED_MODULE_0__["syncProtocol"].readSyncMessage(decoder, encoder, doc));
      break;
    case messageAwareness:
      yjs__WEBPACK_IMPORTED_MODULE_0__["awarenessProtocol"].readAwarenessMessage(decoder, doc);
      break;
    case messageAuth:
      yjs__WEBPACK_IMPORTED_MODULE_0__["authProtocol"].readAuthMessage(decoder, doc, permissionDeniedHandler);
  }
  return encoder;
};

const setupWS = (doc, url) => {
  const websocket = new WebSocket(url);
  websocket.binaryType = 'arraybuffer';
  doc.ws = websocket;
  websocket.onmessage = event => {
    const encoder = readMessage(doc, event.data);
    if (yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].length(encoder) > 1) {
      websocket.send(yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].toBuffer(encoder));
    }
  };
  websocket.onclose = () => {
    doc.ws = null;
    doc.wsconnected = false;
    // update awareness (all users left)
    const removed = [];
    doc.getAwarenessInfo().forEach((_, userid) => {
      removed.push(userid);
    });
    doc.awareness = new Map();
    doc.emit('awareness', {
      added: [], updated: [], removed
    });
    doc.emit('status', {
      status: 'disconnected'
    });
    setTimeout(setupWS, reconnectTimeout, doc, url);
  };
  websocket.onopen = () => {
    doc.wsconnected = true;
    doc.emit('status', {
      status: 'connected'
    });
    // always send sync step 1 when connected
    const encoder = yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].createEncoder();
    yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].writeVarUint(encoder, messageSync);
    yjs__WEBPACK_IMPORTED_MODULE_0__["syncProtocol"].writeSyncStep1(encoder, doc);
    websocket.send(yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].toBuffer(encoder));
    // force send stored awareness info
    doc.setAwarenessField(null, null);
  };
};

const broadcastUpdate = (y, transaction) => {
  if (transaction.encodedStructsLen > 0) {
    y.mux(() => {
      const encoder = yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].createEncoder();
      yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].writeVarUint(encoder, messageSync);
      yjs__WEBPACK_IMPORTED_MODULE_0__["syncProtocol"].writeUpdate(encoder, transaction.encodedStructsLen, transaction.encodedStructs);
      const buf = yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].toBuffer(encoder);
      if (y.wsconnected) {
        y.ws.send(buf);
      }
      yjs_lib_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["publish"](y.url, buf);
    });
  }
};

class WebsocketsSharedDocument extends yjs__WEBPACK_IMPORTED_MODULE_0__["Y"] {
  constructor(url, opts) {
    super(opts);
    this.url = url;
    this.wsconnected = false;
    this.mux = yjs__WEBPACK_IMPORTED_MODULE_0__["createMutex"]();
    this.ws = null;
    this._localAwarenessState = {};
    this.awareness = new Map();
    this.awarenessClock = new Map();
    this.connectToWs = () => {
      setupWS(this, url);
    };
    this.on('afterTransaction', broadcastUpdate);
    this._bcSubscriber = data => {
      const encoder = readMessage(this, data); // already muxed
      this.mux(() => {
        if (yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].length(encoder) > 1) {
          yjs_lib_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["publish"](url, yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].toBuffer(encoder));
        }
      });
    };
    yjs_lib_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["subscribe"](url, this._bcSubscriber);
    // send sync step1 to bc
    this.mux(() => {
      const encoder = yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].createEncoder();
      yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].writeVarUint(encoder, messageSync);
      yjs__WEBPACK_IMPORTED_MODULE_0__["syncProtocol"].writeSyncStep1(encoder, this);
      yjs_lib_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_1__["publish"](url, yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].toBuffer(encoder));
    });
  }
  getLocalAwarenessInfo() {
    return this._localAwarenessState;
  }
  getAwarenessInfo() {
    return this.awareness;
  }
  setAwarenessField(field, value) {
    if (field !== null) {
      this._localAwarenessState[field] = value;
    }
    if (this.wsconnected) {
      const clock = (this.awarenessClock.get(this.userID) || 0) + 1;
      this.awarenessClock.set(this.userID, clock);
      const encoder = yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].createEncoder();
      yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].writeVarUint(encoder, messageAwareness);
      yjs__WEBPACK_IMPORTED_MODULE_0__["awarenessProtocol"].writeUsersStateChange(encoder, [{ userID: this.userID, state: this._localAwarenessState, clock }]);
      const buf = yjs__WEBPACK_IMPORTED_MODULE_0__["encoding"].toBuffer(encoder);
      this.ws.send(buf);
    }
  }
}

/**
 * Websocket Provider for Yjs. Creates a single websocket connection to each document.
 * The document name is attached to the provided url. I.e. the following example
 * creates a websocket connection to http://localhost:1234/my-document-name
 *
 * @example
 *   import { WebsocketProvider } from 'yjs/provider/websocket/client.js'
 *   const provider = new WebsocketProvider('http://localhost:1234')
 *   const ydocument = provider.get('my-document-name')
 */
class WebsocketProvider {
  constructor(url) {
    // ensure that url is always ends with /
    while (url[url.length - 1] === '/') {
      url = url.slice(0, url.length - 1);
    }
    this.url = url + '/';
    /**
     * @type {Map<string, WebsocketsSharedDocument>}
     */
    this.docs = new Map();
  }
  /**
   * @param {string} name
   * @return {WebsocketsSharedDocument}
   */
  get(name, opts) {
    let doc = this.docs.get(name);
    if (doc === undefined) {
      doc = new WebsocketsSharedDocument(this.url + name, opts);
    }
    return doc;
  }
}

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: getParameterByName, wait */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParameterByName", function() { return getParameterByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return wait; });
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function wait(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout);
  });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3lqcy9idWlsZC95anMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3lqcy9saWIvYmluYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95anMvbGliL2Jyb2FkY2FzdGNoYW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3lqcy9saWIvZ2xvYmFscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveWpzL2xpYi9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwuanMiXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsIlkiLCJ1cmwiLCJyb29tIiwiZ2V0UGFyYW1ldGVyQnlOYW1lIiwicm9sZSIsInByb3ZpZGVyIiwiV2Vic29ja2V0UHJvdmlkZXIiLCJ5IiwiZ2V0Iiwic3luY2VkQXJyIiwiZGVmaW5lIiwiZ28iLCJwdXNoIiwiY29ubmVjdFRvV3MiLCJkZWxldGUiLCJ3YWl0Iiwic2V0SW50ZXJ2YWwiLCJ0b0pTT04iLCJtZXNzYWdlU3luYyIsIm1lc3NhZ2VBd2FyZW5lc3MiLCJtZXNzYWdlQXV0aCIsInJlY29ubmVjdFRpbWVvdXQiLCJwZXJtaXNzaW9uRGVuaWVkSGFuZGxlciIsImRvYyIsInJlYXNvbiIsIndhcm4iLCJyZWFkTWVzc2FnZSIsImJ1ZiIsImRlY29kZXIiLCJjcmVhdGVEZWNvZGVyIiwiZW5jb2RlciIsImNyZWF0ZUVuY29kZXIiLCJtZXNzYWdlVHlwZSIsInJlYWRWYXJVaW50Iiwid3JpdGVWYXJVaW50IiwibXV4IiwicmVhZFN5bmNNZXNzYWdlIiwicmVhZEF3YXJlbmVzc01lc3NhZ2UiLCJyZWFkQXV0aE1lc3NhZ2UiLCJzZXR1cFdTIiwid2Vic29ja2V0IiwiV2ViU29ja2V0IiwiYmluYXJ5VHlwZSIsIndzIiwib25tZXNzYWdlIiwiZXZlbnQiLCJkYXRhIiwibGVuZ3RoIiwic2VuZCIsInRvQnVmZmVyIiwib25jbG9zZSIsIndzY29ubmVjdGVkIiwicmVtb3ZlZCIsImdldEF3YXJlbmVzc0luZm8iLCJmb3JFYWNoIiwiXyIsInVzZXJpZCIsImF3YXJlbmVzcyIsIk1hcCIsImVtaXQiLCJhZGRlZCIsInVwZGF0ZWQiLCJzdGF0dXMiLCJzZXRUaW1lb3V0Iiwib25vcGVuIiwid3JpdGVTeW5jU3RlcDEiLCJzZXRBd2FyZW5lc3NGaWVsZCIsImJyb2FkY2FzdFVwZGF0ZSIsInRyYW5zYWN0aW9uIiwiZW5jb2RlZFN0cnVjdHNMZW4iLCJ3cml0ZVVwZGF0ZSIsImVuY29kZWRTdHJ1Y3RzIiwiYmMiLCJXZWJzb2NrZXRzU2hhcmVkRG9jdW1lbnQiLCJjb25zdHJ1Y3RvciIsIm9wdHMiLCJfbG9jYWxBd2FyZW5lc3NTdGF0ZSIsImF3YXJlbmVzc0Nsb2NrIiwib24iLCJfYmNTdWJzY3JpYmVyIiwiZ2V0TG9jYWxBd2FyZW5lc3NJbmZvIiwiZmllbGQiLCJ2YWx1ZSIsImNsb2NrIiwidXNlcklEIiwic2V0Iiwid3JpdGVVc2Vyc1N0YXRlQ2hhbmdlIiwic3RhdGUiLCJzbGljZSIsImRvY3MiLCJuYW1lIiwidW5kZWZpbmVkIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicmVwbGFjZSIsInJlZ2V4IiwiUmVnRXhwIiwicmVzdWx0cyIsImV4ZWMiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0aW1lb3V0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxn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Y0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxFQUFFO0FBQ2YsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxlQUFlLEVBQUUsaUJBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEVBQUU7QUFDZixhQUFhLFFBQVE7QUFDckI7QUFDQSxhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSx3QkFBd0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsRUFBRTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTyxLQUFLLE1BQU0sS0FBSyxLQUFLLEVBQUU7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsRUFBRTtBQUNmLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixjQUFjO0FBQ2QsYUFBYSxtQkFBbUI7QUFDaEMsY0FBYyxvQkFBb0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QSxhQUFhLEtBQUs7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGVBQWU7QUFDNUIsY0FBYyxjQUFjO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxFQUFFO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsRUFBRTtBQUNmLGFBQWEsUUFBUTtBQUNyQjtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsRUFBRTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxlQUFlO0FBQ2pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxvQ0FBb0M7QUFDekM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7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U3BCLGtCQUFULENBQTRCdUYsSUFBNUIsRUFBa0N6RixHQUFsQyxFQUF1QztBQUM1QyxNQUFJLENBQUNBLEdBQUwsRUFBVUEsTUFBTTJGLE9BQU9DLFFBQVAsQ0FBZ0JDLElBQXRCO0FBQ1ZKLFNBQU9BLEtBQUtLLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLE1BQXhCLENBQVA7QUFDQSxNQUFJQyxRQUFRLElBQUlDLE1BQUosQ0FBVyxTQUFTUCxJQUFULEdBQWdCLG1CQUEzQixDQUFaO0FBQUEsTUFDSVEsVUFBVUYsTUFBTUcsSUFBTixDQUFXbEcsR0FBWCxDQURkO0FBRUEsTUFBSSxDQUFDaUcsT0FBTCxFQUFjLE9BQU8sSUFBUDtBQUNkLE1BQUksQ0FBQ0EsUUFBUSxDQUFSLENBQUwsRUFBaUIsT0FBTyxFQUFQO0FBQ2pCLFNBQU9FLG1CQUFtQkYsUUFBUSxDQUFSLEVBQVdILE9BQVgsQ0FBbUIsS0FBbkIsRUFBMEIsR0FBMUIsQ0FBbkIsQ0FBUDtBQUNEOztBQUVNLFNBQVNoRixJQUFULENBQWNzRixPQUFkLEVBQXVCO0FBQzVCLFNBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUN0Q3pDLGVBQVd3QyxPQUFYLEVBQW9CRixPQUFwQjtBQUNELEdBRk0sQ0FBUDtBQUdELEMiLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2xpZW50LmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG4vKipcbiAqIEBtb2R1bGUgdXRpbHNcbiAqL1xuXG5jb25zdCBzdHJ1Y3RzID0gbmV3IE1hcCgpO1xuY29uc3QgcmVmZXJlbmNlcyA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIG5ldyBZanMgdHlwZXMuIFRoZSBzYW1lIHR5cGUgbXVzdCBiZSBkZWZpbmVkIHdpdGggdGhlIHNhbWVcbiAqIHJlZmVyZW5jZSBvbiBhbGwgY2xpZW50cyFcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gcmVmZXJlbmNlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJ1Y3RDb25zdHJ1Y3RvclxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY29uc3QgcmVnaXN0ZXJTdHJ1Y3QgPSAocmVmZXJlbmNlLCBzdHJ1Y3RDb25zdHJ1Y3RvcikgPT4ge1xuICBzdHJ1Y3RzLnNldChyZWZlcmVuY2UsIHN0cnVjdENvbnN0cnVjdG9yKTtcbiAgcmVmZXJlbmNlcy5zZXQoc3RydWN0Q29uc3RydWN0b3IsIHJlZmVyZW5jZSk7XG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGdldFN0cnVjdCA9IChyZWZlcmVuY2UpID0+IHtcbiAgcmV0dXJuIHN0cnVjdHMuZ2V0KHJlZmVyZW5jZSlcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0U3RydWN0UmVmZXJlbmNlID0gKHR5cGVDb25zdHJ1Y3RvcikgPT4ge1xuICByZXR1cm4gcmVmZXJlbmNlcy5nZXQodHlwZUNvbnN0cnVjdG9yKVxufTtcblxuLyoqXG4gKiBAbW9kdWxlIGdsb2JhbHNcbiAqL1xuXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuY29uc3QgVWludDhBcnJheV8gPSBVaW50OEFycmF5O1xuXG5jb25zdCBjcmVhdGVVaW50OEFycmF5RnJvbUxlbiA9IGxlbiA9PiBuZXcgVWludDhBcnJheV8obGVuKTtcblxuLyoqXG4gKiBDcmVhdGUgVWludDhBcnJheSB3aXRoIGluaXRpYWwgY29udGVudCBmcm9tIGJ1ZmZlclxuICovXG5jb25zdCBjcmVhdGVVaW50OEFycmF5RnJvbUJ1ZmZlciA9IChidWZmZXIsIGJ5dGVPZmZzZXQsIGxlbmd0aCkgPT4gbmV3IFVpbnQ4QXJyYXlfKGJ1ZmZlciwgYnl0ZU9mZnNldCwgbGVuZ3RoKTtcblxuLyoqXG4gKiBDcmVhdGUgVWludDhBcnJheSB3aXRoIGluaXRpYWwgY29udGVudCBmcm9tIGJ1ZmZlclxuICovXG5jb25zdCBjcmVhdGVVaW50OEFycmF5RnJvbUFycmF5QnVmZmVyID0gYXJyYXlidWZmZXIgPT4gbmV3IFVpbnQ4QXJyYXlfKGFycmF5YnVmZmVyKTtcblxuLyoqXG4gKiBAbW9kdWxlIGRlY29kaW5nXG4gKi9cblxuLyoqXG4gKiBBIERlY29kZXIgaGFuZGxlcyB0aGUgZGVjb2Rpbmcgb2YgYW4gQXJyYXlCdWZmZXIuXG4gKi9cbmNsYXNzIERlY29kZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYnVmZmVyIEJpbmFyeSBkYXRhIHRvIGRlY29kZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKGJ1ZmZlcikge1xuICAgIHRoaXMuYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcbiAgICB0aGlzLnBvcyA9IDA7XG4gIH1cbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGJ1ZmZlclxuICogQHJldHVybiB7RGVjb2Rlcn1cbiAqL1xuY29uc3QgY3JlYXRlRGVjb2RlciA9IGJ1ZmZlciA9PiBuZXcgRGVjb2RlcihidWZmZXIpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtEZWNvZGVyfSBkZWNvZGVyXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5jb25zdCBoYXNDb250ZW50ID0gZGVjb2RlciA9PiBkZWNvZGVyLnBvcyAhPT0gZGVjb2Rlci5hcnIubGVuZ3RoO1xuXG4vKipcbiAqIENsb25lIGEgZGVjb2RlciBpbnN0YW5jZS5cbiAqIE9wdGlvbmFsbHkgc2V0IGEgbmV3IHBvc2l0aW9uIHBhcmFtZXRlci5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7RGVjb2Rlcn0gZGVjb2RlciBUaGUgZGVjb2RlciBpbnN0YW5jZVxuICogQHBhcmFtIHtudW1iZXJ9IFtuZXdQb3NdIERlZmF1bHRzIHRvIGN1cnJlbnQgcG9zaXRpb25cbiAqIEByZXR1cm4ge0RlY29kZXJ9IEEgY2xvbmUgb2YgYGRlY29kZXJgXG4gKi9cbmNvbnN0IGNsb25lID0gKGRlY29kZXIsIG5ld1BvcyA9IGRlY29kZXIucG9zKSA9PiB7XG4gIGxldCBfZGVjb2RlciA9IGNyZWF0ZURlY29kZXIoZGVjb2Rlci5hcnIuYnVmZmVyKTtcbiAgX2RlY29kZXIucG9zID0gbmV3UG9zO1xuICByZXR1cm4gX2RlY29kZXJcbn07XG5cbi8qKlxuICogUmVhZCBgbGVuYCBieXRlcyBhcyBhbiBBcnJheUJ1ZmZlci5cbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtEZWNvZGVyfSBkZWNvZGVyIFRoZSBkZWNvZGVyIGluc3RhbmNlXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuIFRoZSBsZW5ndGggb2YgYnl0ZXMgdG8gcmVhZFxuICogQHJldHVybiB7QXJyYXlCdWZmZXJ9XG4gKi9cbmNvbnN0IHJlYWRBcnJheUJ1ZmZlciA9IChkZWNvZGVyLCBsZW4pID0+IHtcbiAgY29uc3QgYXJyYXlCdWZmZXIgPSBjcmVhdGVVaW50OEFycmF5RnJvbUxlbihsZW4pO1xuICBjb25zdCB2aWV3ID0gY3JlYXRlVWludDhBcnJheUZyb21CdWZmZXIoZGVjb2Rlci5hcnIuYnVmZmVyLCBkZWNvZGVyLnBvcywgbGVuKTtcbiAgYXJyYXlCdWZmZXIuc2V0KHZpZXcpO1xuICBkZWNvZGVyLnBvcyArPSBsZW47XG4gIHJldHVybiBhcnJheUJ1ZmZlci5idWZmZXJcbn07XG5cbi8qKlxuICogUmVhZCB2YXJpYWJsZSBsZW5ndGggcGF5bG9hZCBhcyBBcnJheUJ1ZmZlclxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0RlY29kZXJ9IGRlY29kZXJcbiAqIEByZXR1cm4ge0FycmF5QnVmZmVyfVxuICovXG5jb25zdCByZWFkUGF5bG9hZCA9IGRlY29kZXIgPT4gcmVhZEFycmF5QnVmZmVyKGRlY29kZXIsIHJlYWRWYXJVaW50KGRlY29kZXIpKTtcblxuLyoqXG4gKiBSZWFkIHRoZSByZXN0IG9mIHRoZSBjb250ZW50IGFzIGFuIEFycmF5QnVmZmVyXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7RGVjb2Rlcn0gZGVjb2RlclxuICogQHJldHVybiB7QXJyYXlCdWZmZXJ9XG4gKi9cbmNvbnN0IHJlYWRUYWlsID0gZGVjb2RlciA9PiByZWFkQXJyYXlCdWZmZXIoZGVjb2RlciwgZGVjb2Rlci5hcnIubGVuZ3RoIC0gZGVjb2Rlci5wb3MpO1xuXG4vKipcbiAqIFNraXAgb25lIGJ5dGUsIGp1bXAgdG8gdGhlIG5leHQgcG9zaXRpb24uXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7RGVjb2Rlcn0gZGVjb2RlciBUaGUgZGVjb2RlciBpbnN0YW5jZVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbmV4dCBwb3NpdGlvblxuICovXG5jb25zdCBza2lwOCA9IGRlY29kZXIgPT4gZGVjb2Rlci5wb3MrKztcblxuLyoqXG4gKiBSZWFkIG9uZSBieXRlIGFzIHVuc2lnbmVkIGludGVnZXIuXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7RGVjb2Rlcn0gZGVjb2RlciBUaGUgZGVjb2RlciBpbnN0YW5jZVxuICogQHJldHVybiB7bnVtYmVyfSBVbnNpZ25lZCA4LWJpdCBpbnRlZ2VyXG4gKi9cbmNvbnN0IHJlYWRVaW50OCA9IGRlY29kZXIgPT4gZGVjb2Rlci5hcnJbZGVjb2Rlci5wb3MrK107XG5cbi8qKlxuICogUmVhZCA0IGJ5dGVzIGFzIHVuc2lnbmVkIGludGVnZXIuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0RlY29kZXJ9IGRlY29kZXJcbiAqIEByZXR1cm4ge251bWJlcn0gQW4gdW5zaWduZWQgaW50ZWdlci5cbiAqL1xuY29uc3QgcmVhZFVpbnQzMiA9IGRlY29kZXIgPT4ge1xuICBsZXQgdWludCA9XG4gICAgZGVjb2Rlci5hcnJbZGVjb2Rlci5wb3NdICtcbiAgICAoZGVjb2Rlci5hcnJbZGVjb2Rlci5wb3MgKyAxXSA8PCA4KSArXG4gICAgKGRlY29kZXIuYXJyW2RlY29kZXIucG9zICsgMl0gPDwgMTYpICtcbiAgICAoZGVjb2Rlci5hcnJbZGVjb2Rlci5wb3MgKyAzXSA8PCAyNCk7XG4gIGRlY29kZXIucG9zICs9IDQ7XG4gIHJldHVybiB1aW50XG59O1xuXG4vKipcbiAqIExvb2sgYWhlYWQgd2l0aG91dCBpbmNyZW1lbnRpbmcgcG9zaXRpb24uXG4gKiB0byB0aGUgbmV4dCBieXRlIGFuZCByZWFkIGl0IGFzIHVuc2lnbmVkIGludGVnZXIuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0RlY29kZXJ9IGRlY29kZXJcbiAqIEByZXR1cm4ge251bWJlcn0gQW4gdW5zaWduZWQgaW50ZWdlci5cbiAqL1xuY29uc3QgcGVla1VpbnQ4ID0gZGVjb2RlciA9PiBkZWNvZGVyLmFycltkZWNvZGVyLnBvc107XG5cbi8qKlxuICogUmVhZCB1bnNpZ25lZCBpbnRlZ2VyICgzMmJpdCkgd2l0aCB2YXJpYWJsZSBsZW5ndGguXG4gKiAxLzh0aCBvZiB0aGUgc3RvcmFnZSBpcyB1c2VkIGFzIGVuY29kaW5nIG92ZXJoZWFkLlxuICogICogbnVtYmVycyA8IDJeNyBpcyBzdG9yZWQgaW4gb25lIGJ5dGxlbmd0aFxuICogICogbnVtYmVycyA8IDJeMTQgaXMgc3RvcmVkIGluIHR3byBieWxlbmd0aFxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtEZWNvZGVyfSBkZWNvZGVyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEFuIHVuc2lnbmVkIGludGVnZXIubGVuZ3RoXG4gKi9cbmNvbnN0IHJlYWRWYXJVaW50ID0gZGVjb2RlciA9PiB7XG4gIGxldCBudW0gPSAwO1xuICBsZXQgbGVuID0gMDtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBsZXQgciA9IGRlY29kZXIuYXJyW2RlY29kZXIucG9zKytdO1xuICAgIG51bSA9IG51bSB8ICgociAmIDBiMTExMTExMSkgPDwgbGVuKTtcbiAgICBsZW4gKz0gNztcbiAgICBpZiAociA8IDEgPDwgNykge1xuICAgICAgcmV0dXJuIG51bSA+Pj4gMCAvLyByZXR1cm4gdW5zaWduZWQgbnVtYmVyIVxuICAgIH1cbiAgICBpZiAobGVuID4gMzUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW50ZWdlciBvdXQgb2YgcmFuZ2UhJylcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogTG9vayBhaGVhZCBhbmQgcmVhZCB2YXJVaW50IHdpdGhvdXQgaW5jcmVtZW50aW5nIHBvc2l0aW9uXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0RlY29kZXJ9IGRlY29kZXJcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuY29uc3QgcGVla1ZhclVpbnQgPSBkZWNvZGVyID0+IHtcbiAgbGV0IHBvcyA9IGRlY29kZXIucG9zO1xuICBsZXQgcyA9IHJlYWRWYXJVaW50KGRlY29kZXIpO1xuICBkZWNvZGVyLnBvcyA9IHBvcztcbiAgcmV0dXJuIHNcbn07XG5cbi8qKlxuICogUmVhZCBzdHJpbmcgb2YgdmFyaWFibGUgbGVuZ3RoXG4gKiAqIHZhclVpbnQgaXMgdXNlZCB0byBzdG9yZSB0aGUgbGVuZ3RoIG9mIHRoZSBzdHJpbmdcbiAqXG4gKiBUcmFuc2Zvcm1pbmcgdXRmOCB0byBhIHN0cmluZyBpcyBwcmV0dHkgZXhwZW5zaXZlLiBUaGUgY29kZSBwZXJmb3JtcyAxMHggYmV0dGVyXG4gKiB3aGVuIFN0cmluZy5mcm9tQ29kZVBvaW50IGlzIGZlZCB3aXRoIGFsbCBjaGFyYWN0ZXJzIGFzIGFyZ3VtZW50cy5cbiAqIEJ1dCBtb3N0IGVudmlyb25tZW50cyBoYXZlIGEgbWF4aW11bSBudW1iZXIgb2YgYXJndW1lbnRzIHBlciBmdW5jdGlvbnMuXG4gKiBGb3IgZWZmaWVuY3kgcmVhc29ucyB3ZSBhcHBseSBhIG1heGltdW0gb2YgMTAwMDAgY2hhcmFjdGVycyBhdCBvbmNlLlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtEZWNvZGVyfSBkZWNvZGVyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSByZWFkIFN0cmluZy5cbiAqL1xuY29uc3QgcmVhZFZhclN0cmluZyA9IGRlY29kZXIgPT4ge1xuICBsZXQgcmVtYWluaW5nTGVuID0gcmVhZFZhclVpbnQoZGVjb2Rlcik7XG4gIGxldCBlbmNvZGVkU3RyaW5nID0gJyc7XG4gIHdoaWxlIChyZW1haW5pbmdMZW4gPiAwKSB7XG4gICAgY29uc3QgbmV4dExlbiA9IHJlbWFpbmluZ0xlbiA8IDEwMDAwID8gcmVtYWluaW5nTGVuIDogMTAwMDA7XG4gICAgY29uc3QgYnl0ZXMgPSBuZXcgQXJyYXkobmV4dExlbik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXh0TGVuOyBpKyspIHtcbiAgICAgIGJ5dGVzW2ldID0gZGVjb2Rlci5hcnJbZGVjb2Rlci5wb3MrK107XG4gICAgfVxuICAgIGVuY29kZWRTdHJpbmcgKz0gU3RyaW5nLmZyb21Db2RlUG9pbnQuYXBwbHkobnVsbCwgYnl0ZXMpO1xuICAgIHJlbWFpbmluZ0xlbiAtPSBuZXh0TGVuO1xuICB9XG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGVuY29kZWRTdHJpbmcpKVxufTtcblxuLyoqXG4gKiBMb29rIGFoZWFkIGFuZCByZWFkIHZhclN0cmluZyB3aXRob3V0IGluY3JlbWVudGluZyBwb3NpdGlvblxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtEZWNvZGVyfSBkZWNvZGVyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHBlZWtWYXJTdHJpbmcgPSBkZWNvZGVyID0+IHtcbiAgbGV0IHBvcyA9IGRlY29kZXIucG9zO1xuICBsZXQgcyA9IHJlYWRWYXJTdHJpbmcoZGVjb2Rlcik7XG4gIGRlY29kZXIucG9zID0gcG9zO1xuICByZXR1cm4gc1xufTtcblxudmFyIGRlY29kaW5nID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBEZWNvZGVyOiBEZWNvZGVyLFxuICBjcmVhdGVEZWNvZGVyOiBjcmVhdGVEZWNvZGVyLFxuICBoYXNDb250ZW50OiBoYXNDb250ZW50LFxuICBjbG9uZTogY2xvbmUsXG4gIHJlYWRBcnJheUJ1ZmZlcjogcmVhZEFycmF5QnVmZmVyLFxuICByZWFkUGF5bG9hZDogcmVhZFBheWxvYWQsXG4gIHJlYWRUYWlsOiByZWFkVGFpbCxcbiAgc2tpcDg6IHNraXA4LFxuICByZWFkVWludDg6IHJlYWRVaW50OCxcbiAgcmVhZFVpbnQzMjogcmVhZFVpbnQzMixcbiAgcGVla1VpbnQ4OiBwZWVrVWludDgsXG4gIHJlYWRWYXJVaW50OiByZWFkVmFyVWludCxcbiAgcGVla1ZhclVpbnQ6IHBlZWtWYXJVaW50LFxuICByZWFkVmFyU3RyaW5nOiByZWFkVmFyU3RyaW5nLFxuICBwZWVrVmFyU3RyaW5nOiBwZWVrVmFyU3RyaW5nXG59KTtcblxuLyoqXG4gKiBAbW9kdWxlIGVuY29kaW5nXG4gKi9cblxuY29uc3QgYml0czcgPSAwYjExMTExMTE7XG5jb25zdCBiaXRzOCA9IDBiMTExMTExMTE7XG5cbi8qKlxuICogQSBCaW5hcnlFbmNvZGVyIGhhbmRsZXMgdGhlIGVuY29kaW5nIHRvIGFuIEFycmF5QnVmZmVyLlxuICovXG5jbGFzcyBFbmNvZGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuY3BvcyA9IDA7XG4gICAgdGhpcy5jYnVmID0gY3JlYXRlVWludDhBcnJheUZyb21MZW4oMTAwMCk7XG4gICAgdGhpcy5idWZzID0gW107XG4gIH1cbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEByZXR1cm4ge0VuY29kZXJ9XG4gKi9cbmNvbnN0IGNyZWF0ZUVuY29kZXIgPSAoKSA9PiBuZXcgRW5jb2RlcigpO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50IGxlbmd0aCBvZiB0aGUgZW5jb2RlZCBkYXRhLlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtFbmNvZGVyfSBlbmNvZGVyXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmNvbnN0IGxlbmd0aCA9IGVuY29kZXIgPT4ge1xuICBsZXQgbGVuID0gZW5jb2Rlci5jcG9zO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZXIuYnVmcy5sZW5ndGg7IGkrKykge1xuICAgIGxlbiArPSBlbmNvZGVyLmJ1ZnNbaV0ubGVuZ3RoO1xuICB9XG4gIHJldHVybiBsZW5cbn07XG5cbi8qKlxuICogVHJhbnNmb3JtIHRvIEFycmF5QnVmZmVyLiBUT0RPOiByZW5hbWUgdG8gLnRvQXJyYXlCdWZmZXJcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlclxuICogQHJldHVybiB7QXJyYXlCdWZmZXJ9IFRoZSBjcmVhdGVkIEFycmF5QnVmZmVyLlxuICovXG5jb25zdCB0b0J1ZmZlciA9IGVuY29kZXIgPT4ge1xuICBjb25zdCB1aW50OGFyciA9IGNyZWF0ZVVpbnQ4QXJyYXlGcm9tTGVuKGxlbmd0aChlbmNvZGVyKSk7XG4gIGxldCBjdXJQb3MgPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZXIuYnVmcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBkID0gZW5jb2Rlci5idWZzW2ldO1xuICAgIHVpbnQ4YXJyLnNldChkLCBjdXJQb3MpO1xuICAgIGN1clBvcyArPSBkLmxlbmd0aDtcbiAgfVxuICB1aW50OGFyci5zZXQoY3JlYXRlVWludDhBcnJheUZyb21CdWZmZXIoZW5jb2Rlci5jYnVmLmJ1ZmZlciwgMCwgZW5jb2Rlci5jcG9zKSwgY3VyUG9zKTtcbiAgcmV0dXJuIHVpbnQ4YXJyLmJ1ZmZlclxufTtcblxuLyoqXG4gKiBXcml0ZSBvbmUgYnl0ZSB0byB0aGUgZW5jb2Rlci5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlclxuICogQHBhcmFtIHtudW1iZXJ9IG51bSBUaGUgYnl0ZSB0aGF0IGlzIHRvIGJlIGVuY29kZWQuXG4gKi9cbmNvbnN0IHdyaXRlID0gKGVuY29kZXIsIG51bSkgPT4ge1xuICBpZiAoZW5jb2Rlci5jcG9zID09PSBlbmNvZGVyLmNidWYubGVuZ3RoKSB7XG4gICAgZW5jb2Rlci5idWZzLnB1c2goZW5jb2Rlci5jYnVmKTtcbiAgICBlbmNvZGVyLmNidWYgPSBjcmVhdGVVaW50OEFycmF5RnJvbUxlbihlbmNvZGVyLmNidWYubGVuZ3RoICogMik7XG4gICAgZW5jb2Rlci5jcG9zID0gMDtcbiAgfVxuICBlbmNvZGVyLmNidWZbZW5jb2Rlci5jcG9zKytdID0gbnVtO1xufTtcblxuLyoqXG4gKiBXcml0ZSBvbmUgYnl0ZSBhdCBhIHNwZWNpZmljIHBvc2l0aW9uLlxuICogUG9zaXRpb24gbXVzdCBhbHJlYWR5IGJlIHdyaXR0ZW4gKGkuZS4gZW5jb2Rlci5sZW5ndGggPiBwb3MpXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgUG9zaXRpb24gdG8gd2hpY2ggdG8gd3JpdGUgZGF0YVxuICogQHBhcmFtIHtudW1iZXJ9IG51bSBVbnNpZ25lZCA4LWJpdCBpbnRlZ2VyXG4gKi9cbmNvbnN0IHNldCA9IChlbmNvZGVyLCBwb3MsIG51bSkgPT4ge1xuICBsZXQgYnVmZmVyID0gbnVsbDtcbiAgLy8gaXRlcmF0ZSBhbGwgYnVmZmVycyBhbmQgYWRqdXN0IHBvc2l0aW9uXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZW5jb2Rlci5idWZzLmxlbmd0aCAmJiBidWZmZXIgPT09IG51bGw7IGkrKykge1xuICAgIGNvbnN0IGIgPSBlbmNvZGVyLmJ1ZnNbaV07XG4gICAgaWYgKHBvcyA8IGIubGVuZ3RoKSB7XG4gICAgICBidWZmZXIgPSBiOyAvLyBmb3VuZCBidWZmZXJcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zIC09IGIubGVuZ3RoO1xuICAgIH1cbiAgfVxuICBpZiAoYnVmZmVyID09PSBudWxsKSB7XG4gICAgLy8gdXNlIGN1cnJlbnQgYnVmZmVyXG4gICAgYnVmZmVyID0gZW5jb2Rlci5jYnVmO1xuICB9XG4gIGJ1ZmZlcltwb3NdID0gbnVtO1xufTtcblxuLyoqXG4gKiBXcml0ZSBvbmUgYnl0ZSBhcyBhbiB1bnNpZ25lZCBpbnRlZ2VyLlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtFbmNvZGVyfSBlbmNvZGVyXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIFRoZSBudW1iZXIgdGhhdCBpcyB0byBiZSBlbmNvZGVkLlxuICovXG5jb25zdCB3cml0ZVVpbnQ4ID0gKGVuY29kZXIsIG51bSkgPT4gd3JpdGUoZW5jb2RlciwgbnVtICYgYml0czgpO1xuXG4vKipcbiAqIFdyaXRlIG9uZSBieXRlIGFzIGFuIHVuc2lnbmVkIEludGVnZXIgYXQgYSBzcGVjaWZpYyBsb2NhdGlvbi5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlclxuICogQHBhcmFtIHtudW1iZXJ9IHBvcyBUaGUgbG9jYXRpb24gd2hlcmUgdGhlIGRhdGEgd2lsbCBiZSB3cml0dGVuLlxuICogQHBhcmFtIHtudW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRoYXQgaXMgdG8gYmUgZW5jb2RlZC5cbiAqL1xuY29uc3Qgc2V0VWludDggPSAoZW5jb2RlciwgcG9zLCBudW0pID0+IHNldChlbmNvZGVyLCBwb3MsIG51bSAmIGJpdHM4KTtcblxuLyoqXG4gKiBXcml0ZSB0d28gYnl0ZXMgYXMgYW4gdW5zaWduZWQgaW50ZWdlci5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlclxuICogQHBhcmFtIHtudW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRoYXQgaXMgdG8gYmUgZW5jb2RlZC5cbiAqL1xuY29uc3Qgd3JpdGVVaW50MTYgPSAoZW5jb2RlciwgbnVtKSA9PiB7XG4gIHdyaXRlKGVuY29kZXIsIG51bSAmIGJpdHM4KTtcbiAgd3JpdGUoZW5jb2RlciwgKG51bSA+Pj4gOCkgJiBiaXRzOCk7XG59O1xuLyoqXG4gKiBXcml0ZSB0d28gYnl0ZXMgYXMgYW4gdW5zaWduZWQgaW50ZWdlciBhdCBhIHNwZWNpZmljIGxvY2F0aW9uLlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtFbmNvZGVyfSBlbmNvZGVyXG4gKiBAcGFyYW0ge251bWJlcn0gcG9zIFRoZSBsb2NhdGlvbiB3aGVyZSB0aGUgZGF0YSB3aWxsIGJlIHdyaXR0ZW4uXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIFRoZSBudW1iZXIgdGhhdCBpcyB0byBiZSBlbmNvZGVkLlxuICovXG5jb25zdCBzZXRVaW50MTYgPSAoZW5jb2RlciwgcG9zLCBudW0pID0+IHtcbiAgc2V0KGVuY29kZXIsIHBvcywgbnVtICYgYml0czgpO1xuICBzZXQoZW5jb2RlciwgcG9zICsgMSwgKG51bSA+Pj4gOCkgJiBiaXRzOCk7XG59O1xuXG4vKipcbiAqIFdyaXRlIHR3byBieXRlcyBhcyBhbiB1bnNpZ25lZCBpbnRlZ2VyXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gVGhlIG51bWJlciB0aGF0IGlzIHRvIGJlIGVuY29kZWQuXG4gKi9cbmNvbnN0IHdyaXRlVWludDMyID0gKGVuY29kZXIsIG51bSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgIHdyaXRlKGVuY29kZXIsIG51bSAmIGJpdHM4KTtcbiAgICBudW0gPj4+PSA4O1xuICB9XG59O1xuXG4vKipcbiAqIFdyaXRlIHR3byBieXRlcyBhcyBhbiB1bnNpZ25lZCBpbnRlZ2VyIGF0IGEgc3BlY2lmaWMgbG9jYXRpb24uXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBwb3MgVGhlIGxvY2F0aW9uIHdoZXJlIHRoZSBkYXRhIHdpbGwgYmUgd3JpdHRlbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gVGhlIG51bWJlciB0aGF0IGlzIHRvIGJlIGVuY29kZWQuXG4gKi9cbmNvbnN0IHNldFVpbnQzMiA9IChlbmNvZGVyLCBwb3MsIG51bSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgIHNldChlbmNvZGVyLCBwb3MgKyBpLCBudW0gJiBiaXRzOCk7XG4gICAgbnVtID4+Pj0gODtcbiAgfVxufTtcblxuLyoqXG4gKiBXcml0ZSBhIHZhcmlhYmxlIGxlbmd0aCB1bnNpZ25lZCBpbnRlZ2VyLlxuICpcbiAqIEVuY29kZXMgaW50ZWdlcnMgaW4gdGhlIHJhbmdlIGZyb20gWzAsIDQyOTQ5NjcyOTVdIC8gWzAsIDB4ZmZmZmZmZmZdLiAobWF4IDMyIGJpdCB1bnNpZ25lZCBpbnRlZ2VyKVxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtFbmNvZGVyfSBlbmNvZGVyXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIFRoZSBudW1iZXIgdGhhdCBpcyB0byBiZSBlbmNvZGVkLlxuICovXG5jb25zdCB3cml0ZVZhclVpbnQgPSAoZW5jb2RlciwgbnVtKSA9PiB7XG4gIHdoaWxlIChudW0gPj0gMGIxMDAwMDAwMCkge1xuICAgIHdyaXRlKGVuY29kZXIsIDBiMTAwMDAwMDAgfCAoYml0czcgJiBudW0pKTtcbiAgICBudW0gPj4+PSA3O1xuICB9XG4gIHdyaXRlKGVuY29kZXIsIGJpdHM3ICYgbnVtKTtcbn07XG5cbi8qKlxuICogV3JpdGUgYSB2YXJpYWJsZSBsZW5ndGggc3RyaW5nLlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtFbmNvZGVyfSBlbmNvZGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdGhhdCBpcyB0byBiZSBlbmNvZGVkLlxuICovXG5jb25zdCB3cml0ZVZhclN0cmluZyA9IChlbmNvZGVyLCBzdHIpID0+IHtcbiAgY29uc3QgZW5jb2RlZFN0cmluZyA9IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKTtcbiAgY29uc3QgbGVuID0gZW5jb2RlZFN0cmluZy5sZW5ndGg7XG4gIHdyaXRlVmFyVWludChlbmNvZGVyLCBsZW4pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgd3JpdGUoZW5jb2RlciwgZW5jb2RlZFN0cmluZy5jb2RlUG9pbnRBdChpKSk7XG4gIH1cbn07XG5cbi8qKlxuICogV3JpdGUgdGhlIGNvbnRlbnQgb2YgYW5vdGhlciBFbmNvZGVyLlxuICpcbiAqIFRPRE86IGNhbiBiZSBpbXByb3ZlZCFcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlciBUaGUgZW5VaW50OEFyclxuICogQHBhcmFtIHtFbmNvZGVyfSBhcHBlbmQgVGhlIEJpbmFyeUVuY29kZXIgdG8gYmUgd3JpdHRlbi5cbiAqL1xuY29uc3Qgd3JpdGVCaW5hcnlFbmNvZGVyID0gKGVuY29kZXIsIGFwcGVuZCkgPT4gd3JpdGVBcnJheUJ1ZmZlcihlbmNvZGVyLCB0b0J1ZmZlcihhcHBlbmQpKTtcblxuLyoqXG4gKiBBcHBlbmQgYW4gYXJyYXlCdWZmZXIgdG8gdGhlIGVuY29kZXIuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXJcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyXG4gKi9cbmNvbnN0IHdyaXRlQXJyYXlCdWZmZXIgPSAoZW5jb2RlciwgYXJyYXlCdWZmZXIpID0+IHtcbiAgY29uc3QgcHJldkJ1ZmZlckxlbiA9IGVuY29kZXIuY2J1Zi5sZW5ndGg7XG4gIC8vIFRPRE86IEFwcGVuZCB0byBjYnVmIGlmIHBvc3NpYmxlXG4gIGVuY29kZXIuYnVmcy5wdXNoKGNyZWF0ZVVpbnQ4QXJyYXlGcm9tQnVmZmVyKGVuY29kZXIuY2J1Zi5idWZmZXIsIDAsIGVuY29kZXIuY3BvcykpO1xuICBlbmNvZGVyLmJ1ZnMucHVzaChjcmVhdGVVaW50OEFycmF5RnJvbUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSk7XG4gIGVuY29kZXIuY2J1ZiA9IGNyZWF0ZVVpbnQ4QXJyYXlGcm9tTGVuKHByZXZCdWZmZXJMZW4pO1xuICBlbmNvZGVyLmNwb3MgPSAwO1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlclxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXJcbiAqL1xuY29uc3Qgd3JpdGVQYXlsb2FkID0gKGVuY29kZXIsIGFycmF5QnVmZmVyKSA9PiB7XG4gIHdyaXRlVmFyVWludChlbmNvZGVyLCBhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgd3JpdGVBcnJheUJ1ZmZlcihlbmNvZGVyLCBhcnJheUJ1ZmZlcik7XG59O1xuXG52YXIgZW5jb2RpbmcgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gIEVuY29kZXI6IEVuY29kZXIsXG4gIGNyZWF0ZUVuY29kZXI6IGNyZWF0ZUVuY29kZXIsXG4gIGxlbmd0aDogbGVuZ3RoLFxuICB0b0J1ZmZlcjogdG9CdWZmZXIsXG4gIHdyaXRlOiB3cml0ZSxcbiAgc2V0OiBzZXQsXG4gIHdyaXRlVWludDg6IHdyaXRlVWludDgsXG4gIHNldFVpbnQ4OiBzZXRVaW50OCxcbiAgd3JpdGVVaW50MTY6IHdyaXRlVWludDE2LFxuICBzZXRVaW50MTY6IHNldFVpbnQxNixcbiAgd3JpdGVVaW50MzI6IHdyaXRlVWludDMyLFxuICBzZXRVaW50MzI6IHNldFVpbnQzMixcbiAgd3JpdGVWYXJVaW50OiB3cml0ZVZhclVpbnQsXG4gIHdyaXRlVmFyU3RyaW5nOiB3cml0ZVZhclN0cmluZyxcbiAgd3JpdGVCaW5hcnlFbmNvZGVyOiB3cml0ZUJpbmFyeUVuY29kZXIsXG4gIHdyaXRlQXJyYXlCdWZmZXI6IHdyaXRlQXJyYXlCdWZmZXIsXG4gIHdyaXRlUGF5bG9hZDogd3JpdGVQYXlsb2FkXG59KTtcblxuLyoqXG4gKiBAbW9kdWxlIHV0aWxzXG4gKi9cblxuY2xhc3MgSUQge1xuICBjb25zdHJ1Y3RvciAodXNlciwgY2xvY2spIHtcbiAgICB0aGlzLnVzZXIgPSB1c2VyOyAvLyBUT0RPOiByZW5hbWUgdG8gY2xpZW50XG4gICAgdGhpcy5jbG9jayA9IGNsb2NrO1xuICB9XG4gIGNsb25lICgpIHtcbiAgICByZXR1cm4gbmV3IElEKHRoaXMudXNlciwgdGhpcy5jbG9jaylcbiAgfVxuICBlcXVhbHMgKGlkKSB7XG4gICAgcmV0dXJuIGlkICE9PSBudWxsICYmIGlkLnVzZXIgPT09IHRoaXMudXNlciAmJiBpZC5jbG9jayA9PT0gdGhpcy5jbG9ja1xuICB9XG4gIGxlc3NUaGFuIChpZCkge1xuICAgIGlmIChpZC5jb25zdHJ1Y3RvciA9PT0gSUQpIHtcbiAgICAgIHJldHVybiB0aGlzLnVzZXIgPCBpZC51c2VyIHx8ICh0aGlzLnVzZXIgPT09IGlkLnVzZXIgJiYgdGhpcy5jbG9jayA8IGlkLmNsb2NrKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZW5jb2RpbmcuRW5jb2Rlcn0gZW5jb2RlclxuICAgKi9cbiAgZW5jb2RlIChlbmNvZGVyKSB7XG4gICAgd3JpdGVWYXJVaW50KGVuY29kZXIsIHRoaXMudXNlcik7XG4gICAgd3JpdGVWYXJVaW50KGVuY29kZXIsIHRoaXMuY2xvY2spO1xuICB9XG59XG5cbmNvbnN0IGNyZWF0ZUlEID0gKHVzZXIsIGNsb2NrKSA9PiBuZXcgSUQodXNlciwgY2xvY2spO1xuXG5jb25zdCBSb290RmFrZVVzZXJJRCA9IDB4RkZGRkZGO1xuXG5jbGFzcyBSb290SUQge1xuICBjb25zdHJ1Y3RvciAobmFtZSwgdHlwZUNvbnN0cnVjdG9yKSB7XG4gICAgdGhpcy51c2VyID0gUm9vdEZha2VVc2VySUQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnR5cGUgPSBnZXRTdHJ1Y3RSZWZlcmVuY2UodHlwZUNvbnN0cnVjdG9yKTtcbiAgfVxuICBlcXVhbHMgKGlkKSB7XG4gICAgcmV0dXJuIGlkICE9PSBudWxsICYmIGlkLnVzZXIgPT09IHRoaXMudXNlciAmJiBpZC5uYW1lID09PSB0aGlzLm5hbWUgJiYgaWQudHlwZSA9PT0gdGhpcy50eXBlXG4gIH1cbiAgbGVzc1RoYW4gKGlkKSB7XG4gICAgaWYgKGlkLmNvbnN0cnVjdG9yID09PSBSb290SUQpIHtcbiAgICAgIHJldHVybiB0aGlzLnVzZXIgPCBpZC51c2VyIHx8ICh0aGlzLnVzZXIgPT09IGlkLnVzZXIgJiYgKHRoaXMubmFtZSA8IGlkLm5hbWUgfHwgKHRoaXMubmFtZSA9PT0gaWQubmFtZSAmJiB0aGlzLnR5cGUgPCBpZC50eXBlKSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge2VuY29kaW5nLkVuY29kZXJ9IGVuY29kZXJcbiAgICovXG4gIGVuY29kZSAoZW5jb2Rlcikge1xuICAgIHdyaXRlVmFyVWludChlbmNvZGVyLCB0aGlzLnVzZXIpO1xuICAgIHdyaXRlVmFyU3RyaW5nKGVuY29kZXIsIHRoaXMubmFtZSk7XG4gICAgd3JpdGVWYXJVaW50KGVuY29kZXIsIHRoaXMudHlwZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcm9vdCBpZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogICB5LmRlZmluZSgnbmFtZScsIFkuQXJyYXkpIC8vIG5hbWUsIGFuZCB0eXBlQ29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHlwZUNvbnN0cnVjdG9yIG11c3QgYmUgZGVmaW5lZCBpbiBzdHJ1Y3RSZWZlcmVuY2VzXG4gKi9cbmNvbnN0IGNyZWF0ZVJvb3RJRCA9IChuYW1lLCB0eXBlQ29uc3RydWN0b3IpID0+IG5ldyBSb290SUQobmFtZSwgdHlwZUNvbnN0cnVjdG9yKTtcblxuLyoqXG4gKiBSZWFkIElELlxuICogKiBJZiBmaXJzdCB2YXJVaW50IHJlYWQgaXMgMHhGRkZGRkYgYSBSb290SUQgaXMgcmV0dXJuZWQuXG4gKiAqIE90aGVyd2lzZSBhbiBJRCBpcyByZXR1cm5lZFxuICpcbiAqIEBwYXJhbSB7ZGVjb2RpbmcuRGVjb2Rlcn0gZGVjb2RlclxuICogQHJldHVybiB7SUR8Um9vdElEfVxuICovXG5jb25zdCBkZWNvZGUgPSBkZWNvZGVyID0+IHtcbiAgY29uc3QgdXNlciA9IHJlYWRWYXJVaW50KGRlY29kZXIpO1xuICBpZiAodXNlciA9PT0gUm9vdEZha2VVc2VySUQpIHtcbiAgICAvLyByZWFkIHByb3BlcnR5IG5hbWUgYW5kIHR5cGUgaWRcbiAgICBjb25zdCByaWQgPSBjcmVhdGVSb290SUQocmVhZFZhclN0cmluZyhkZWNvZGVyKSwgbnVsbCk7XG4gICAgcmlkLnR5cGUgPSByZWFkVmFyVWludChkZWNvZGVyKTtcbiAgICByZXR1cm4gcmlkXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUlEKHVzZXIsIHJlYWRWYXJVaW50KGRlY29kZXIpKVxufTtcblxuY29uc3Qgd3JpdGVTdHJ1Y3RUb1RyYW5zYWN0aW9uID0gKHRyYW5zYWN0aW9uLCBzdHJ1Y3QpID0+IHtcbiAgdHJhbnNhY3Rpb24uZW5jb2RlZFN0cnVjdHNMZW4rKztcbiAgc3RydWN0Ll90b0JpbmFyeSh0cmFuc2FjdGlvbi5lbmNvZGVkU3RydWN0cyk7XG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKiBEZWxldGUgYWxsIGl0ZW1zIGluIGFuIElELXJhbmdlLlxuICogRG9lcyBub3QgY3JlYXRlIGRlbGV0ZSBvcGVyYXRpb25zIVxuICogVE9ETzogaW1wbGVtZW50IGdldEl0ZW1DbGVhblN0YXJ0Tm9kZSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlIChvbmx5IG9uZSBsb29rdXApLlxuICovXG5jb25zdCBkZWxldGVJdGVtUmFuZ2UgPSAoeSwgdXNlciwgY2xvY2ssIHJhbmdlLCBnY0NoaWxkcmVuKSA9PiB7XG4gIGxldCBpdGVtID0geS5vcy5nZXRJdGVtQ2xlYW5TdGFydChjcmVhdGVJRCh1c2VyLCBjbG9jaykpO1xuICBpZiAoaXRlbSAhPT0gbnVsbCkge1xuICAgIGlmICghaXRlbS5fZGVsZXRlZCkge1xuICAgICAgaXRlbS5fc3BsaXRBdCh5LCByYW5nZSk7XG4gICAgICBpdGVtLl9kZWxldGUoeSwgZmFsc2UsIHRydWUpO1xuICAgIH1cbiAgICBsZXQgaXRlbUxlbiA9IGl0ZW0uX2xlbmd0aDtcbiAgICByYW5nZSAtPSBpdGVtTGVuO1xuICAgIGNsb2NrICs9IGl0ZW1MZW47XG4gICAgaWYgKHJhbmdlID4gMCkge1xuICAgICAgbGV0IG5vZGUgPSB5Lm9zLmZpbmROb2RlKGNyZWF0ZUlEKHVzZXIsIGNsb2NrKSk7XG4gICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCAmJiBub2RlLnZhbCAhPT0gbnVsbCAmJiByYW5nZSA+IDAgJiYgbm9kZS52YWwuX2lkLmVxdWFscyhjcmVhdGVJRCh1c2VyLCBjbG9jaykpKSB7XG4gICAgICAgIGNvbnN0IG5vZGVWYWwgPSBub2RlLnZhbDtcbiAgICAgICAgaWYgKCFub2RlVmFsLl9kZWxldGVkKSB7XG4gICAgICAgICAgbm9kZVZhbC5fc3BsaXRBdCh5LCByYW5nZSk7XG4gICAgICAgICAgbm9kZVZhbC5fZGVsZXRlKHksIGZhbHNlLCBnY0NoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub2RlTGVuID0gbm9kZVZhbC5fbGVuZ3RoO1xuICAgICAgICByYW5nZSAtPSBub2RlTGVuO1xuICAgICAgICBjbG9jayArPSBub2RlTGVuO1xuICAgICAgICBub2RlID0gbm9kZS5uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFN0cmluZ2lmeSBhbiBpdGVtIGlkLlxuICpcbiAqIEBwYXJhbSB7SUQuSUQgfCBJRC5Sb290SUR9IGlkXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHN0cmluZ2lmeUlEID0gaWQgPT4gaWQgaW5zdGFuY2VvZiBJRCA/IGAoJHtpZC51c2VyfSwke2lkLmNsb2NrfSlgIDogYCgke2lkLm5hbWV9LCR7aWQudHlwZX0pYDtcblxuLyoqXG4gKiBTdHJpbmdpZnkgYW4gaXRlbSBhcyBJRC4gSEhlcmUsIGFuIGl0ZW0gY291bGQgYWxzbyBiZSBhIFlqcyBpbnN0YW5jZSAoZS5nLiBpdGVtLl9wYXJlbnQpLlxuICpcbiAqIEBwYXJhbSB7SXRlbSB8IFkgfCBudWxsfSBpdGVtXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHN0cmluZ2lmeUl0ZW1JRCA9IGl0ZW0gPT4ge1xuICBsZXQgcmVzdWx0O1xuICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgIHJlc3VsdCA9ICcoKSc7XG4gIH0gZWxzZSBpZiAoaXRlbS5faWQgIT0gbnVsbCkge1xuICAgIHJlc3VsdCA9IHN0cmluZ2lmeUlEKGl0ZW0uX2lkKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBtdXN0IGJlIGEgWWpzIGluc3RhbmNlXG4gICAgLy8gRG9uJ3QgaW5jbHVkZSBZIGluIHRoaXMgbW9kdWxlLCBzbyB3ZSBwcmV2ZW50IGNpcmN1bGFyIGRlcGVuZGVuY2llcy5cbiAgICByZXN1bHQgPSAneSc7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufTtcblxuLyoqXG4gKiBIZWxwZXIgdXRpbGl0eSB0byBjb252ZXJ0IGFuIGl0ZW0gdG8gYSByZWFkYWJsZSBmb3JtYXQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGl0ZW0gY2xhc3MgKFlUZXh0LCBJdGVtU3RyaW5nLCAuLikuXG4gKiBAcGFyYW0ge0l0ZW19IGl0ZW0gVGhlIGl0ZW0gaW5zdGFuY2UuXG4gKiBAcGFyYW0ge1N0cmluZ30gW2FwcGVuZF0gQWRkaXRpb25hbCBpbmZvcm1hdGlvbiB0byBhcHBlbmQgdG8gdGhlIHJldHVybmVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nLlxuICogQHJldHVybiB7U3RyaW5nfSBBIHJlYWRhYmxlIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgdGhlIGl0ZW0gb2JqZWN0LlxuICpcbiAqL1xuY29uc3QgbG9nSXRlbUhlbHBlciA9IChuYW1lLCBpdGVtLCBhcHBlbmQpID0+IHtcbiAgY29uc3QgbGVmdCA9IGl0ZW0uX2xlZnQgIT09IG51bGwgPyBzdHJpbmdpZnlJRChpdGVtLl9sZWZ0Ll9sYXN0SWQpIDogJygpJztcbiAgY29uc3Qgb3JpZ2luID0gaXRlbS5fb3JpZ2luICE9PSBudWxsID8gc3RyaW5naWZ5SUQoaXRlbS5fb3JpZ2luLl9sYXN0SWQpIDogJygpJztcbiAgcmV0dXJuIGAke25hbWV9KGlkOiR7c3RyaW5naWZ5SXRlbUlEKGl0ZW0pfSxsZWZ0OiR7bGVmdH0sb3JpZ2luOiR7b3JpZ2lufSxyaWdodDoke3N0cmluZ2lmeUl0ZW1JRChpdGVtLl9yaWdodCl9LHBhcmVudDoke3N0cmluZ2lmeUl0ZW1JRChpdGVtLl9wYXJlbnQpfSxwYXJlbnRTdWI6JHtpdGVtLl9wYXJlbnRTdWJ9JHthcHBlbmQgIT09IHVuZGVmaW5lZCA/ICcgLSAnICsgYXBwZW5kIDogJyd9KWBcbn07XG5cbi8qKlxuICogQG1vZHVsZSBzdHJ1Y3RzXG4gKi9cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICogQSBEZWxldGUgY2hhbmdlIGlzIG5vdCBhIHJlYWwgSXRlbSwgYnV0IGl0IHByb3ZpZGVzIHRoZSBzYW1lIGludGVyZmFjZSBhcyBhblxuICogSXRlbS4gVGhlIG9ubHkgZGlmZmVyZW5jZSBpcyB0aGF0IGl0IHdpbGwgbm90IGJlIHNhdmVkIGluIHRoZSBJdGVtU3RvcmVcbiAqIChPcGVyYXRpb25TdG9yZSksIGJ1dCBpbnN0ZWFkIGl0IGlzIHNhZmVkIGluIHRoZSBEZWxldGVTdG9yZS5cbiAqL1xuY2xhc3MgRGVsZXRlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtJRC5JRH1cbiAgICAgKi9cbiAgICB0aGlzLl90YXJnZXRJRCA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0l0ZW19XG4gICAgICovXG4gICAgdGhpcy5fdGFyZ2V0ID0gbnVsbDtcbiAgICB0aGlzLl9sZW5ndGggPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIFJlYWQgdGhlIG5leHQgSXRlbSBpbiBhIERlY29kZXIgYW5kIGZpbGwgdGhpcyBJdGVtIHdpdGggdGhlIHJlYWQgZGF0YS5cbiAgICpcbiAgICogVGhpcyBpcyBjYWxsZWQgd2hlbiBkYXRhIGlzIHJlY2VpdmVkIGZyb20gYSByZW1vdGUgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHtZfSB5IFRoZSBZanMgaW5zdGFuY2UgdGhhdCB0aGlzIEl0ZW0gYmVsb25ncyB0by5cbiAgICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyIFRoZSBkZWNvZGVyIG9iamVjdCB0byByZWFkIGRhdGEgZnJvbS5cbiAgICovXG4gIF9mcm9tQmluYXJ5ICh5LCBkZWNvZGVyKSB7XG4gICAgLy8gVE9ETzogc2V0IHRhcmdldCwgYW5kIGFkZCBpdCB0byBtaXNzaW5nIGlmIG5vdCBmb3VuZFxuICAgIC8vIFRoZXJlIGlzIGFuIGVkZ2UgY2FzZSBpbiBwMnAgbmV0d29ya3MhXG4gICAgLyoqXG4gICAgICogQHR5cGUge2FueX1cbiAgICAgKi9cbiAgICBjb25zdCB0YXJnZXRJRCA9IGRlY29kZShkZWNvZGVyKTtcbiAgICB0aGlzLl90YXJnZXRJRCA9IHRhcmdldElEO1xuICAgIHRoaXMuX2xlbmd0aCA9IHJlYWRWYXJVaW50KGRlY29kZXIpO1xuICAgIGlmICh5Lm9zLmdldEl0ZW0odGFyZ2V0SUQpID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gW3RhcmdldElEXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogVHJhbnNmb3JtIHRoZSBwcm9wZXJ0aWVzIG9mIHRoaXMgdHlwZSB0byBiaW5hcnkgYW5kIHdyaXRlIGl0IHRvIGFuXG4gICAqIEJpbmFyeUVuY29kZXIuXG4gICAqXG4gICAqIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhpcyBJdGVtIGlzIHNlbnQgdG8gYSByZW1vdGUgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHtlbmNvZGluZy5FbmNvZGVyfSBlbmNvZGVyIFRoZSBlbmNvZGVyIHRvIHdyaXRlIGRhdGEgdG8uXG4gICAqL1xuICBfdG9CaW5hcnkgKGVuY29kZXIpIHtcbiAgICB3cml0ZVVpbnQ4KGVuY29kZXIsIGdldFN0cnVjdFJlZmVyZW5jZSh0aGlzLmNvbnN0cnVjdG9yKSk7XG4gICAgdGhpcy5fdGFyZ2V0SUQuZW5jb2RlKGVuY29kZXIpO1xuICAgIHdyaXRlVmFyVWludChlbmNvZGVyLCB0aGlzLl9sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEludGVncmF0ZXMgdGhpcyBJdGVtIGludG8gdGhlIHNoYXJlZCBzdHJ1Y3R1cmUuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGFjdHVhbGx5IGFwcGxpZXMgdGhlIGNoYW5nZSB0byB0aGUgWWpzIGluc3RhbmNlLiBJbiB0aGUgY2FzZSBvZlxuICAgKiBEZWxldGUgaXQgbWFya3MgdGhlIGRlbGV0ZSB0YXJnZXQgYXMgZGVsZXRlZC5cbiAgICpcbiAgICogKiBJZiBjcmVhdGVkIHJlbW90ZWx5IChhIHJlbW90ZSB1c2VyIGRlbGV0ZWQgc29tZXRoaW5nKSxcbiAgICogICB0aGlzIERlbGV0ZSBpcyBhcHBsaWVkIHRvIGFsbCBzdHJ1Y3RzIGluIGlkLXJhbmdlLlxuICAgKiAqIElmIGNyZWF0ZWQgbG9rYWxseSAoZS5nLiB3aGVuIHktYXJyYXkgZGVsZXRlcyBhIHJhbmdlIG9mIGVsZW1lbnRzKSxcbiAgICogICB0aGlzIHN0cnVjdCBpcyBicm9hZGNhc3RlZCBvbmx5IChpdCBpcyBhbHJlYWR5IGV4ZWN1dGVkKVxuICAgKi9cbiAgX2ludGVncmF0ZSAoeSwgbG9jYWxseUNyZWF0ZWQgPSBmYWxzZSkge1xuICAgIGlmICghbG9jYWxseUNyZWF0ZWQpIHtcbiAgICAgIC8vIGZyb20gcmVtb3RlXG4gICAgICBjb25zdCBpZCA9IHRoaXMuX3RhcmdldElEO1xuICAgICAgZGVsZXRlSXRlbVJhbmdlKHksIGlkLnVzZXIsIGlkLmNsb2NrLCB0aGlzLl9sZW5ndGgsIGZhbHNlKTtcbiAgICB9XG4gICAgd3JpdGVTdHJ1Y3RUb1RyYW5zYWN0aW9uKHkuX3RyYW5zYWN0aW9uLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gdGhpcyBZWG1sIFR5cGUgdG8gYSByZWFkYWJsZSBmb3JtYXQuXG4gICAqIFVzZWZ1bCBmb3IgbG9nZ2luZyBhcyBhbGwgSXRlbXMgYW5kIERlbGV0ZSBpbXBsZW1lbnQgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbG9nU3RyaW5nICgpIHtcbiAgICByZXR1cm4gYERlbGV0ZSAtIHRhcmdldDogJHtzdHJpbmdpZnlJRCh0aGlzLl90YXJnZXRJRCl9LCBsZW46ICR7dGhpcy5fbGVuZ3RofWBcbiAgfVxufVxuXG4vKipcbiAqIEBtb2R1bGUgc3RydWN0c1xuICovXG4vLyBpbXBvcnQgeyBZIH0gZnJvbSAnLi4vdXRpbHMvWS5qcycgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4vLyBUT0RPIHNob3VsZCBoYXZlIHRoZSBzYW1lIGJhc2UgY2xhc3MgYXMgSXRlbVxuY2xhc3MgR0Mge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge0lELklEfVxuICAgICAqL1xuICAgIHRoaXMuX2lkID0gbnVsbDtcbiAgICB0aGlzLl9sZW5ndGggPSAwO1xuICB9XG5cbiAgZ2V0IF9yZWRvbmUgKCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBnZXQgX2RlbGV0ZWQgKCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBfaW50ZWdyYXRlICh5KSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLl9pZDtcbiAgICBjb25zdCB1c2VyU3RhdGUgPSB5LnNzLmdldFN0YXRlKGlkLnVzZXIpO1xuICAgIGlmIChpZC5jbG9jayA9PT0gdXNlclN0YXRlKSB7XG4gICAgICB5LnNzLnNldFN0YXRlKGlkLnVzZXIsIGlkLmNsb2NrICsgdGhpcy5fbGVuZ3RoKTtcbiAgICB9XG4gICAgeS5kcy5tYXJrKHRoaXMuX2lkLCB0aGlzLl9sZW5ndGgsIHRydWUpO1xuICAgIGxldCBuID0geS5vcy5wdXQodGhpcyk7XG4gICAgY29uc3QgcHJldiA9IG4ucHJldigpLnZhbDtcbiAgICBpZiAocHJldiAhPT0gbnVsbCAmJiBwcmV2LmNvbnN0cnVjdG9yID09PSBHQyAmJiBwcmV2Ll9pZC51c2VyID09PSBuLnZhbC5faWQudXNlciAmJiBwcmV2Ll9pZC5jbG9jayArIHByZXYuX2xlbmd0aCA9PT0gbi52YWwuX2lkLmNsb2NrKSB7XG4gICAgICAvLyBUT0RPOiBkbyBtZXJnaW5nIGZvciBhbGwgaXRlbXMhXG4gICAgICBwcmV2Ll9sZW5ndGggKz0gbi52YWwuX2xlbmd0aDtcbiAgICAgIHkub3MuZGVsZXRlKG4udmFsLl9pZCk7XG4gICAgICBuID0gcHJldjtcbiAgICB9XG4gICAgaWYgKG4udmFsKSB7XG4gICAgICBuID0gbi52YWw7XG4gICAgfVxuICAgIGNvbnN0IG5leHQgPSB5Lm9zLmZpbmROZXh0KG4uX2lkKTtcbiAgICBpZiAobmV4dCAhPT0gbnVsbCAmJiBuZXh0LmNvbnN0cnVjdG9yID09PSBHQyAmJiBuZXh0Ll9pZC51c2VyID09PSBuLl9pZC51c2VyICYmIG5leHQuX2lkLmNsb2NrID09PSBuLl9pZC5jbG9jayArIG4uX2xlbmd0aCkge1xuICAgICAgbi5fbGVuZ3RoICs9IG5leHQuX2xlbmd0aDtcbiAgICAgIHkub3MuZGVsZXRlKG5leHQuX2lkKTtcbiAgICB9XG4gICAgaWYgKGlkLnVzZXIgIT09IFJvb3RGYWtlVXNlcklEKSB7XG4gICAgICB3cml0ZVN0cnVjdFRvVHJhbnNhY3Rpb24oeS5fdHJhbnNhY3Rpb24sIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gdGhlIHByb3BlcnRpZXMgb2YgdGhpcyB0eXBlIHRvIGJpbmFyeSBhbmQgd3JpdGUgaXQgdG8gYW5cbiAgICogQmluYXJ5RW5jb2Rlci5cbiAgICpcbiAgICogVGhpcyBpcyBjYWxsZWQgd2hlbiB0aGlzIEl0ZW0gaXMgc2VudCB0byBhIHJlbW90ZSBwZWVyLlxuICAgKlxuICAgKiBAcGFyYW0ge2VuY29kaW5nLkVuY29kZXJ9IGVuY29kZXIgVGhlIGVuY29kZXIgdG8gd3JpdGUgZGF0YSB0by5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF90b0JpbmFyeSAoZW5jb2Rlcikge1xuICAgIHdyaXRlVWludDgoZW5jb2RlciwgZ2V0U3RydWN0UmVmZXJlbmNlKHRoaXMuY29uc3RydWN0b3IpKTtcbiAgICB0aGlzLl9pZC5lbmNvZGUoZW5jb2Rlcik7XG4gICAgd3JpdGVWYXJVaW50KGVuY29kZXIsIHRoaXMuX2xlbmd0aCk7XG4gIH1cblxuICAvKipcbiAgICogUmVhZCB0aGUgbmV4dCBJdGVtIGluIGEgRGVjb2RlciBhbmQgZmlsbCB0aGlzIEl0ZW0gd2l0aCB0aGUgcmVhZCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIGlzIGNhbGxlZCB3aGVuIGRhdGEgaXMgcmVjZWl2ZWQgZnJvbSBhIHJlbW90ZSBwZWVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1l9IHkgVGhlIFlqcyBpbnN0YW5jZSB0aGF0IHRoaXMgSXRlbSBiZWxvbmdzIHRvLlxuICAgKiBAcGFyYW0ge2RlY29kaW5nLkRlY29kZXJ9IGRlY29kZXIgVGhlIGRlY29kZXIgb2JqZWN0IHRvIHJlYWQgZGF0YSBmcm9tLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2Zyb21CaW5hcnkgKHksIGRlY29kZXIpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW55fVxuICAgICAqL1xuICAgIGNvbnN0IGlkID0gZGVjb2RlKGRlY29kZXIpO1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgdGhpcy5fbGVuZ3RoID0gcmVhZFZhclVpbnQoZGVjb2Rlcik7XG4gICAgY29uc3QgbWlzc2luZyA9IFtdO1xuICAgIGlmICh5LnNzLmdldFN0YXRlKGlkLnVzZXIpIDwgaWQuY2xvY2spIHtcbiAgICAgIG1pc3NpbmcucHVzaChjcmVhdGVJRChpZC51c2VyLCBpZC5jbG9jayAtIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIG1pc3NpbmdcbiAgfVxuXG4gIF9zcGxpdEF0ICgpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgX2Nsb25lUGFydGlhbCAoZGlmZikge1xuICAgIGNvbnN0IGdjID0gbmV3IEdDKCk7XG4gICAgZ2MuX2lkID0gY3JlYXRlSUQodGhpcy5faWQudXNlciwgdGhpcy5faWQuY2xvY2sgKyBkaWZmKTtcbiAgICBnYy5fbGVuZ3RoID0gdGhpcy5fbGVuZ3RoIC0gZGlmZjtcbiAgICByZXR1cm4gZ2NcbiAgfVxufVxuXG4vKipcbiAqIEBtb2R1bGUgc3RydWN0c1xuICovXG4vLyBpbXBvcnQgeyBUeXBlIH0gZnJvbSAnLi9UeXBlLmpzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgdHJhbnNhY3Rpb25UeXBlQ2hhbmdlZCA9ICh5LCB0eXBlLCBzdWIpID0+IHtcbiAgaWYgKHR5cGUgIT09IHkgJiYgIXR5cGUuX2RlbGV0ZWQgJiYgIXkuX3RyYW5zYWN0aW9uLm5ld1R5cGVzLmhhcyh0eXBlKSkge1xuICAgIGNvbnN0IGNoYW5nZWRUeXBlcyA9IHkuX3RyYW5zYWN0aW9uLmNoYW5nZWRUeXBlcztcbiAgICBsZXQgc3VicyA9IGNoYW5nZWRUeXBlcy5nZXQodHlwZSk7XG4gICAgaWYgKHN1YnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gY3JlYXRlIGlmIGl0IGRvZXNuJ3QgZXhpc3QgeWV0XG4gICAgICBzdWJzID0gbmV3IFNldCgpO1xuICAgICAgY2hhbmdlZFR5cGVzLnNldCh0eXBlLCBzdWJzKTtcbiAgICB9XG4gICAgc3Vicy5hZGQoc3ViKTtcbiAgfVxufTtcblxuLyoqXG4gKiBIZWxwZXIgdXRpbGl0eSB0byBzcGxpdCBhbiBJdGVtIChzZWUge0BsaW5rIEl0ZW0jX3NwbGl0QXR9KVxuICogLSBjb3BpZXMgYWxsIHByb3BlcnRpZXMgZnJvbSBhIHRvIGJcbiAqIC0gY29ubmVjdHMgYSB0byBiXG4gKiAtIGFzc2lnbnMgdGhlIGNvcnJlY3QgX2lkXG4gKiAtIHNhdmVzIGIgdG8gb3NcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHNwbGl0SGVscGVyID0gKHksIGEsIGIsIGRpZmYpID0+IHtcbiAgY29uc3QgYUlEID0gYS5faWQ7XG4gIGIuX2lkID0gY3JlYXRlSUQoYUlELnVzZXIsIGFJRC5jbG9jayArIGRpZmYpO1xuICBiLl9vcmlnaW4gPSBhO1xuICBiLl9sZWZ0ID0gYTtcbiAgYi5fcmlnaHQgPSBhLl9yaWdodDtcbiAgaWYgKGIuX3JpZ2h0ICE9PSBudWxsKSB7XG4gICAgYi5fcmlnaHQuX2xlZnQgPSBiO1xuICB9XG4gIGIuX3JpZ2h0X29yaWdpbiA9IGEuX3JpZ2h0X29yaWdpbjtcbiAgLy8gZG8gbm90IHNldCBhLl9yaWdodF9vcmlnaW4sIGFzIHRoaXMgd2lsbCBsZWFkIHRvIHByb2JsZW1zIHdoZW4gc3luY2luZ1xuICBhLl9yaWdodCA9IGI7XG4gIGIuX3BhcmVudCA9IGEuX3BhcmVudDtcbiAgYi5fcGFyZW50U3ViID0gYS5fcGFyZW50U3ViO1xuICBiLl9kZWxldGVkID0gYS5fZGVsZXRlZDtcbiAgLy8gbm93IHNlYXJjaCBhbGwgcmVsZXZhbnQgaXRlbXMgdG8gdGhlIHJpZ2h0IGFuZCB1cGRhdGUgb3JpZ2luXG4gIC8vIGlmIG9yaWdpbiBpcyBub3QgaXQgZm91bmRPcmlnaW5zLCB3ZSBkb24ndCBoYXZlIHRvIHNlYXJjaCBhbnkgbG9uZ2VyXG4gIGxldCBmb3VuZE9yaWdpbnMgPSBuZXcgU2V0KCk7XG4gIGZvdW5kT3JpZ2lucy5hZGQoYSk7XG4gIGxldCBvID0gYi5fcmlnaHQ7XG4gIHdoaWxlIChvICE9PSBudWxsICYmIGZvdW5kT3JpZ2lucy5oYXMoby5fb3JpZ2luKSkge1xuICAgIGlmIChvLl9vcmlnaW4gPT09IGEpIHtcbiAgICAgIG8uX29yaWdpbiA9IGI7XG4gICAgfVxuICAgIGZvdW5kT3JpZ2lucy5hZGQobyk7XG4gICAgbyA9IG8uX3JpZ2h0O1xuICB9XG4gIHkub3MucHV0KGIpO1xuICBpZiAoeS5fdHJhbnNhY3Rpb24gIT09IG51bGwpIHtcbiAgICBpZiAoeS5fdHJhbnNhY3Rpb24ubmV3VHlwZXMuaGFzKGEpKSB7XG4gICAgICB5Ll90cmFuc2FjdGlvbi5uZXdUeXBlcy5hZGQoYik7XG4gICAgfSBlbHNlIGlmICh5Ll90cmFuc2FjdGlvbi5kZWxldGVkU3RydWN0cy5oYXMoYSkpIHtcbiAgICAgIHkuX3RyYW5zYWN0aW9uLmRlbGV0ZWRTdHJ1Y3RzLmFkZChiKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQWJzdHJhY3QgY2xhc3MgdGhhdCByZXByZXNlbnRzIGFueSBjb250ZW50LlxuICovXG5jbGFzcyBJdGVtIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIC8qKlxuICAgICAqIFRoZSB1bmlxZSBpZGVudGlmaWVyIG9mIHRoaXMgdHlwZS5cbiAgICAgKiBAdHlwZSB7SUQuSUQgfCBJRC5Sb290SUR9XG4gICAgICovXG4gICAgdGhpcy5faWQgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIFRoZSBpdGVtIHRoYXQgd2FzIG9yaWdpbmFsbHkgdG8gdGhlIGxlZnQgb2YgdGhpcyBpdGVtLlxuICAgICAqIEB0eXBlIHtJdGVtfVxuICAgICAqL1xuICAgIHRoaXMuX29yaWdpbiA9IG51bGw7XG4gICAgLyoqXG4gICAgICogVGhlIGl0ZW0gdGhhdCBpcyBjdXJyZW50bHkgdG8gdGhlIGxlZnQgb2YgdGhpcyBpdGVtLlxuICAgICAqIEB0eXBlIHtJdGVtfVxuICAgICAqL1xuICAgIHRoaXMuX2xlZnQgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIFRoZSBpdGVtIHRoYXQgaXMgY3VycmVudGx5IHRvIHRoZSByaWdodCBvZiB0aGlzIGl0ZW0uXG4gICAgICogQHR5cGUge0l0ZW19XG4gICAgICovXG4gICAgdGhpcy5fcmlnaHQgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIFRoZSBpdGVtIHRoYXQgd2FzIG9yaWdpbmFsbHkgdG8gdGhlIHJpZ2h0IG9mIHRoaXMgaXRlbS5cbiAgICAgKiBAdHlwZSB7SXRlbX1cbiAgICAgKi9cbiAgICB0aGlzLl9yaWdodF9vcmlnaW4gPSBudWxsO1xuICAgIC8qKlxuICAgICAqIFRoZSBwYXJlbnQgdHlwZS5cbiAgICAgKiBAdHlwZSB7WXxUeXBlfVxuICAgICAqL1xuICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgLyoqXG4gICAgICogSWYgdGhlIHBhcmVudCByZWZlcnMgdG8gdGhpcyBpdGVtIHdpdGggc29tZSBraW5kIG9mIGtleSAoZS5nLiBZTWFwLCB0aGVcbiAgICAgKiBrZXkgaXMgc3BlY2lmaWVkIGhlcmUuIFRoZSBrZXkgaXMgdGhlbiB1c2VkIHRvIHJlZmVyIHRvIHRoZSBsaXN0IGluIHdoaWNoXG4gICAgICogdG8gaW5zZXJ0IHRoaXMgaXRlbS4gSWYgYHBhcmVudFN1YiA9IG51bGxgIHR5cGUuX3N0YXJ0IGlzIHRoZSBsaXN0IGluXG4gICAgICogd2hpY2ggdG8gaW5zZXJ0IHRvLiBPdGhlcndpc2UgaXQgaXMgYHBhcmVudC5fbWFwYC5cbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuX3BhcmVudFN1YiA9IG51bGw7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGlzIGl0ZW0gd2FzIGRlbGV0ZWQgb3Igbm90LlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuX2RlbGV0ZWQgPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBJZiB0aGlzIHR5cGUncyBlZmZlY3QgaXMgcmV1bmRvbmUgdGhpcyB0eXBlIHJlZmVycyB0byB0aGUgdHlwZSB0aGF0IHVuZGlkXG4gICAgICogdGhpcyBvcGVyYXRpb24uXG4gICAgICogQHR5cGUge1R5cGV9XG4gICAgICovXG4gICAgdGhpcy5fcmVkb25lID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuZXh0IG5vbi1kZWxldGVkIGl0ZW1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldCBfbmV4dCAoKSB7XG4gICAgbGV0IG4gPSB0aGlzLl9yaWdodDtcbiAgICB3aGlsZSAobiAhPT0gbnVsbCAmJiBuLl9kZWxldGVkKSB7XG4gICAgICBuID0gbi5fcmlnaHQ7XG4gICAgfVxuICAgIHJldHVybiBuXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJldmlvdXMgbm9uLWRlbGV0ZWQgaXRlbVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0IF9wcmV2ICgpIHtcbiAgICBsZXQgbiA9IHRoaXMuX2xlZnQ7XG4gICAgd2hpbGUgKG4gIT09IG51bGwgJiYgbi5fZGVsZXRlZCkge1xuICAgICAgbiA9IG4uX2xlZnQ7XG4gICAgfVxuICAgIHJldHVybiBuXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBJdGVtIHdpdGggdGhlIHNhbWUgZWZmZWN0IGFzIHRoaXMgSXRlbSAod2l0aG91dCBwb3NpdGlvbiBlZmZlY3QpXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY29weSAoKSB7XG4gICAgY29uc3QgQyA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIG5ldyBDKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWRvZXMgdGhlIGVmZmVjdCBvZiB0aGlzIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtZfSB5IFRoZSBZanMgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7U2V0PEl0ZW0+fSByZWRvaXRlbXNcbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZWRvICh5LCByZWRvaXRlbXMpIHtcbiAgICBpZiAodGhpcy5fcmVkb25lICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVkb25lXG4gICAgfVxuICAgIGlmICghKHRoaXMuX3BhcmVudCBpbnN0YW5jZW9mIEl0ZW0pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IHN0cnVjdCA9IHRoaXMuX2NvcHkoKTtcbiAgICBsZXQgbGVmdCwgcmlnaHQ7XG4gICAgaWYgKHRoaXMuX3BhcmVudFN1YiA9PT0gbnVsbCkge1xuICAgICAgLy8gSXMgYW4gYXJyYXkgaXRlbS4gSW5zZXJ0IGF0IHRoZSBvbGQgcG9zaXRpb25cbiAgICAgIGxlZnQgPSB0aGlzLl9sZWZ0O1xuICAgICAgcmlnaHQgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJcyBhIG1hcCBpdGVtLiBJbnNlcnQgYXQgdGhlIHN0YXJ0XG4gICAgICBsZWZ0ID0gbnVsbDtcbiAgICAgIHJpZ2h0ID0gdGhpcy5fcGFyZW50Ll9tYXAuZ2V0KHRoaXMuX3BhcmVudFN1Yik7XG4gICAgICByaWdodC5fZGVsZXRlKHkpO1xuICAgIH1cbiAgICBsZXQgcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHBhcmVudCBpcyByZWRvbmVcbiAgICBpZiAocGFyZW50Ll9kZWxldGVkID09PSB0cnVlICYmIHBhcmVudC5fcmVkb25lID09PSBudWxsKSB7XG4gICAgICAvLyB0cnkgdG8gdW5kbyBwYXJlbnQgaWYgaXQgd2lsbCBiZSB1bmRvbmUgYW55d2F5XG4gICAgICBpZiAoIXJlZG9pdGVtcy5oYXMocGFyZW50KSB8fCAhcGFyZW50Ll9yZWRvKHksIHJlZG9pdGVtcykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXJlbnQuX3JlZG9uZSAhPT0gbnVsbCkge1xuICAgICAgcGFyZW50ID0gcGFyZW50Ll9yZWRvbmU7XG4gICAgICAvLyBmaW5kIG5leHQgY2xvbmVkX3JlZG8gaXRlbXNcbiAgICAgIHdoaWxlIChsZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChsZWZ0Ll9yZWRvbmUgIT09IG51bGwgJiYgbGVmdC5fcmVkb25lLl9wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgIGxlZnQgPSBsZWZ0Ll9yZWRvbmU7XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBsZWZ0ID0gbGVmdC5fbGVmdDtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChyaWdodCAhPT0gbnVsbCkge1xuICAgICAgICBpZiAocmlnaHQuX3JlZG9uZSAhPT0gbnVsbCAmJiByaWdodC5fcmVkb25lLl9wYXJlbnQgPT09IHBhcmVudCkge1xuICAgICAgICAgIHJpZ2h0ID0gcmlnaHQuX3JlZG9uZTtcbiAgICAgICAgfVxuICAgICAgICByaWdodCA9IHJpZ2h0Ll9yaWdodDtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RydWN0Ll9vcmlnaW4gPSBsZWZ0O1xuICAgIHN0cnVjdC5fbGVmdCA9IGxlZnQ7XG4gICAgc3RydWN0Ll9yaWdodCA9IHJpZ2h0O1xuICAgIHN0cnVjdC5fcmlnaHRfb3JpZ2luID0gcmlnaHQ7XG4gICAgc3RydWN0Ll9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgc3RydWN0Ll9wYXJlbnRTdWIgPSB0aGlzLl9wYXJlbnRTdWI7XG4gICAgc3RydWN0Ll9pbnRlZ3JhdGUoeSk7XG4gICAgdGhpcy5fcmVkb25lID0gc3RydWN0O1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGxhc3QgY29udGVudCBhZGRyZXNzIG9mIHRoaXMgSXRlbS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldCBfbGFzdElkICgpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW55fVxuICAgICAqL1xuICAgIGNvbnN0IGlkID0gdGhpcy5faWQ7XG4gICAgcmV0dXJuIGNyZWF0ZUlEKGlkLnVzZXIsIGlkLmNsb2NrICsgdGhpcy5fbGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgbGVuZ3RoIG9mIHRoaXMgSXRlbS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldCBfbGVuZ3RoICgpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgLyoqXG4gICAqIFNob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhpcyBJdGVtIGlzIHNvbWUga2luZCBvZiBtZXRhIGluZm9ybWF0aW9uXG4gICAqIChlLmcuIGZvcm1hdCBpbmZvcm1hdGlvbikuXG4gICAqXG4gICAqICogV2hldGhlciB0aGlzIEl0ZW0gc2hvdWxkIGJlIGFkZHJlc3NhYmxlIHZpYSBgeWFycmF5LmdldChpKWBcbiAgICogKiBXaGV0aGVyIHRoaXMgSXRlbSBzaG91bGQgYmUgY291bnRlZCB3aGVuIGNvbXB1dGluZyB5YXJyYXkubGVuZ3RoXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXQgX2NvdW50YWJsZSAoKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiBTcGxpdHMgdGhpcyBJdGVtIHNvIHRoYXQgYW5vdGhlciBJdGVtcyBjYW4gYmUgaW5zZXJ0ZWQgaW4tYmV0d2Vlbi5cbiAgICogVGhpcyBtdXN0IGJlIG92ZXJ3cml0dGVuIGlmIF9sZW5ndGggPiAxXG4gICAqIFJldHVybnMgcmlnaHQgcGFydCBhZnRlciBzcGxpdFxuICAgKiAqIGRpZmYgPT09IDAgPT4gdGhpc1xuICAgKiAqIGRpZmYgPT09IGxlbmd0aCA9PiB0aGlzLl9yaWdodFxuICAgKiAqIG90aGVyd2lzZSA9PiBzcGxpdCBfY29udGVudCBhbmQgcmV0dXJuIHJpZ2h0IHBhcnQgb2Ygc3BsaXRcbiAgICogKHNlZSB7QGxpbmsgSXRlbUpTT059L3tAbGluayBJdGVtU3RyaW5nfSBmb3IgaW1wbGVtZW50YXRpb24pXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3BsaXRBdCAoeSwgZGlmZikge1xuICAgIGlmIChkaWZmID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmlnaHRcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrIHRoaXMgSXRlbSBhcyBkZWxldGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1l9IHkgVGhlIFlqcyBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNyZWF0ZURlbGV0ZSBXaGV0aGVyIHRvIHByb3BhZ2F0ZSBhIG1lc3NhZ2UgdGhhdCB0aGlzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cGUgd2FzIGRlbGV0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gZ2NDaGlsZHJlblxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2RlbGV0ZSAoeSwgY3JlYXRlRGVsZXRlID0gdHJ1ZSwgZ2NDaGlsZHJlbikge1xuICAgIGlmICghdGhpcy5fZGVsZXRlZCkge1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgY29uc3QgbGVuID0gdGhpcy5fbGVuZ3RoO1xuICAgICAgLy8gYWRqdXN0IHRoZSBsZW5ndGggb2YgcGFyZW50XG4gICAgICBpZiAocGFyZW50Lmxlbmd0aCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuX2NvdW50YWJsZSkge1xuICAgICAgICBwYXJlbnQubGVuZ3RoIC09IGxlbjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2RlbGV0ZWQgPSB0cnVlO1xuICAgICAgeS5kcy5tYXJrKHRoaXMuX2lkLCB0aGlzLl9sZW5ndGgsIGZhbHNlKTtcbiAgICAgIGxldCBkZWwgPSBuZXcgRGVsZXRlKCk7XG4gICAgICBkZWwuX3RhcmdldElEID0gdGhpcy5faWQ7XG4gICAgICBkZWwuX2xlbmd0aCA9IGxlbjtcbiAgICAgIGlmIChjcmVhdGVEZWxldGUpIHtcbiAgICAgICAgLy8gYnJvYWRjYXN0IGFuZCBwZXJzaXN0cyBEZWxldGVcbiAgICAgICAgZGVsLl9pbnRlZ3JhdGUoeSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICB0cmFuc2FjdGlvblR5cGVDaGFuZ2VkKHksIHBhcmVudCwgdGhpcy5fcGFyZW50U3ViKTtcbiAgICAgIHkuX3RyYW5zYWN0aW9uLmRlbGV0ZWRTdHJ1Y3RzLmFkZCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfZ2NDaGlsZHJlbiAoeSkge31cblxuICBfZ2MgKHkpIHtcbiAgICBjb25zdCBnYyA9IG5ldyBHQygpO1xuICAgIGdjLl9pZCA9IHRoaXMuX2lkO1xuICAgIGdjLl9sZW5ndGggPSB0aGlzLl9sZW5ndGg7XG4gICAgeS5vcy5kZWxldGUodGhpcy5faWQpO1xuICAgIGdjLl9pbnRlZ3JhdGUoeSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyBjYWxsZWQgcmlnaHQgYmVmb3JlIHRoaXMgSXRlbSByZWNlaXZlcyBhbnkgY2hpbGRyZW4uXG4gICAqIEl0IGNhbiBiZSBvdmVyd3JpdHRlbiB0byBhcHBseSBwZW5kaW5nIGNoYW5nZXMgYmVmb3JlIGFwcGx5aW5nIHJlbW90ZSBjaGFuZ2VzXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYmVmb3JlQ2hhbmdlICgpIHtcbiAgICAvLyBub3BcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlZ3JhdGVzIHRoaXMgSXRlbSBpbnRvIHRoZSBzaGFyZWQgc3RydWN0dXJlLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBhY3R1YWxseSBhcHBsaWVzIHRoZSBjaGFuZ2UgdG8gdGhlIFlqcyBpbnN0YW5jZS4gSW4gY2FzZSBvZlxuICAgKiBJdGVtIGl0IGNvbm5lY3RzIF9sZWZ0IGFuZCBfcmlnaHQgdG8gdGhpcyBJdGVtIGFuZCBjYWxscyB0aGVcbiAgICoge0BsaW5rIEl0ZW0jYmVmb3JlQ2hhbmdlfSBtZXRob2QuXG4gICAqXG4gICAqICogSW50ZWdyYXRlIHRoZSBzdHJ1Y3Qgc28gdGhhdCBvdGhlciB0eXBlcy9zdHJ1Y3RzIGNhbiBzZWUgaXRcbiAgICogKiBBZGQgdGhpcyBzdHJ1Y3QgdG8geS5vc1xuICAgKiAqIENoZWNrIGlmIHRoaXMgaXMgc3RydWN0IGRlbGV0ZWRcbiAgICpcbiAgICogQHBhcmFtIHtZfSB5XG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaW50ZWdyYXRlICh5KSB7XG4gICAgeS5fdHJhbnNhY3Rpb24ubmV3VHlwZXMuYWRkKHRoaXMpO1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbnl9XG4gICAgICovXG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHthbnl9XG4gICAgICovXG4gICAgY29uc3Qgc2VsZklEID0gdGhpcy5faWQ7XG4gICAgY29uc3QgdXNlciA9IHNlbGZJRCA9PT0gbnVsbCA/IHkudXNlcklEIDogc2VsZklELnVzZXI7XG4gICAgY29uc3QgdXNlclN0YXRlID0geS5zcy5nZXRTdGF0ZSh1c2VyKTtcbiAgICBpZiAoc2VsZklEID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9pZCA9IHkuc3MuZ2V0TmV4dElEKHRoaXMuX2xlbmd0aCk7XG4gICAgfSBlbHNlIGlmIChzZWxmSUQudXNlciA9PT0gUm9vdEZha2VVc2VySUQpIHtcbiAgICAgIC8vIGlzIHBhcmVudFxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChzZWxmSUQuY2xvY2sgPCB1c2VyU3RhdGUpIHtcbiAgICAgIC8vIGFscmVhZHkgYXBwbGllZC4uXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKHNlbGZJRC5jbG9jayA9PT0gdXNlclN0YXRlKSB7XG4gICAgICB5LnNzLnNldFN0YXRlKHNlbGZJRC51c2VyLCB1c2VyU3RhdGUgKyB0aGlzLl9sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtaXNzaW5nIGNvbnRlbnQgZnJvbSB1c2VyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgYXBwbHkgeWV0IScpXG4gICAgfVxuICAgIGlmICghcGFyZW50Ll9kZWxldGVkICYmICF5Ll90cmFuc2FjdGlvbi5jaGFuZ2VkVHlwZXMuaGFzKHBhcmVudCkgJiYgIXkuX3RyYW5zYWN0aW9uLm5ld1R5cGVzLmhhcyhwYXJlbnQpKSB7XG4gICAgICAvLyB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHBhcmVudCBpcyB1cGRhdGVkXG4gICAgICAvLyBvciB0aGlzIHR5cGVzIGlzIG5ld1xuICAgICAgcGFyZW50Ll9iZWZvcmVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICMgJHRoaXMgaGFzIHRvIGZpbmQgYSB1bmlxdWUgcG9zaXRpb24gYmV0d2VlbiBvcmlnaW4gYW5kIHRoZSBuZXh0IGtub3duIGNoYXJhY3RlclxuICAgICMgY2FzZSAxOiAkb3JpZ2luIGVxdWFscyAkby5vcmlnaW46IHRoZSAkY3JlYXRvciBwYXJhbWV0ZXIgZGVjaWRlcyBpZiBsZWZ0IG9yIHJpZ2h0XG4gICAgIyAgICAgICAgIGxldCAkT0w9IFtvMSxvMixvMyxvNF0sIHdoZXJlYnkgJHRoaXMgaXMgdG8gYmUgaW5zZXJ0ZWQgYmV0d2VlbiBvMSBhbmQgbzRcbiAgICAjICAgICAgICAgbzIsbzMgYW5kIG80IG9yaWdpbiBpcyAxICh0aGUgcG9zaXRpb24gb2YgbzIpXG4gICAgIyAgICAgICAgIHRoZXJlIGlzIHRoZSBjYXNlIHRoYXQgJHRoaXMuY3JlYXRvciA8IG8yLmNyZWF0b3IsIGJ1dCBvMy5jcmVhdG9yIDwgJHRoaXMuY3JlYXRvclxuICAgICMgICAgICAgICB0aGVuIG8yIGtub3dzIG8zLiBTaW5jZSBvbiBhbm90aGVyIGNsaWVudCAkT0wgY291bGQgYmUgW28xLG8zLG80XSB0aGUgcHJvYmxlbSBpcyBjb21wbGV4XG4gICAgIyAgICAgICAgIHRoZXJlZm9yZSAkdGhpcyB3b3VsZCBiZSBhbHdheXMgdG8gdGhlIHJpZ2h0IG9mIG8zXG4gICAgIyBjYXNlIDI6ICRvcmlnaW4gPCAkby5vcmlnaW5cbiAgICAjICAgICAgICAgaWYgY3VycmVudCAkdGhpcyBpbnNlcnRfcG9zaXRpb24gPiAkbyBvcmlnaW46ICR0aGlzIGluc1xuICAgICMgICAgICAgICBlbHNlICRpbnNlcnRfcG9zaXRpb24gd2lsbCBub3QgY2hhbmdlXG4gICAgIyAgICAgICAgIChtYXliZSB3ZSBlbmNvdW50ZXIgY2FzZSAxIGxhdGVyLCB0aGVuIHRoaXMgd2lsbCBiZSB0byB0aGUgcmlnaHQgb2YgJG8pXG4gICAgIyBjYXNlIDM6ICRvcmlnaW4gPiAkby5vcmlnaW5cbiAgICAjICAgICAgICAgJHRoaXMgaW5zZXJ0X3Bvc2l0aW9uIGlzIHRvIHRoZSBsZWZ0IG9mICRvIChmb3JldmVyISlcbiAgICAqL1xuICAgIC8vIGhhbmRsZSBjb25mbGljdHNcbiAgICBsZXQgbztcbiAgICAvLyBzZXQgbyB0byB0aGUgZmlyc3QgY29uZmxpY3RpbmcgaXRlbVxuICAgIGlmICh0aGlzLl9sZWZ0ICE9PSBudWxsKSB7XG4gICAgICBvID0gdGhpcy5fbGVmdC5fcmlnaHQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9wYXJlbnRTdWIgIT09IG51bGwpIHtcbiAgICAgIG8gPSBwYXJlbnQuX21hcC5nZXQodGhpcy5fcGFyZW50U3ViKSB8fCBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBvID0gcGFyZW50Ll9zdGFydDtcbiAgICB9XG4gICAgbGV0IGNvbmZsaWN0aW5nSXRlbXMgPSBuZXcgU2V0KCk7XG4gICAgbGV0IGl0ZW1zQmVmb3JlT3JpZ2luID0gbmV3IFNldCgpO1xuICAgIC8vIExldCBjIGluIGNvbmZsaWN0aW5nSXRlbXMsIGIgaW4gaXRlbXNCZWZvcmVPcmlnaW5cbiAgICAvLyAqKip7b3JpZ2lufWJiYmJ7dGhpc317YyxifXtjLGJ9e299KioqXG4gICAgLy8gTm90ZSB0aGF0IGNvbmZsaWN0aW5nSXRlbXMgaXMgYSBzdWJzZXQgb2YgaXRlbXNCZWZvcmVPcmlnaW5cbiAgICB3aGlsZSAobyAhPT0gbnVsbCAmJiBvICE9PSB0aGlzLl9yaWdodCkge1xuICAgICAgaXRlbXNCZWZvcmVPcmlnaW4uYWRkKG8pO1xuICAgICAgY29uZmxpY3RpbmdJdGVtcy5hZGQobyk7XG4gICAgICBpZiAodGhpcy5fb3JpZ2luID09PSBvLl9vcmlnaW4pIHtcbiAgICAgICAgLy8gY2FzZSAxXG4gICAgICAgIGlmIChvLl9pZC51c2VyIDwgdGhpcy5faWQudXNlcikge1xuICAgICAgICAgIHRoaXMuX2xlZnQgPSBvO1xuICAgICAgICAgIGNvbmZsaWN0aW5nSXRlbXMuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpdGVtc0JlZm9yZU9yaWdpbi5oYXMoby5fb3JpZ2luKSkge1xuICAgICAgICAvLyBjYXNlIDJcbiAgICAgICAgaWYgKCFjb25mbGljdGluZ0l0ZW1zLmhhcyhvLl9vcmlnaW4pKSB7XG4gICAgICAgICAgdGhpcy5fbGVmdCA9IG87XG4gICAgICAgICAgY29uZmxpY3RpbmdJdGVtcy5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogdHJ5IHRvIHVzZSByaWdodF9vcmlnaW4gaW5zdGVhZC5cbiAgICAgIC8vIFRoZW4geW91IGNvdWxkIGJhc2ljYWxseSBvbWl0IGNvbmZsaWN0aW5nSXRlbXMhXG4gICAgICAvLyBOb3RlOiB5b3UgcHJvYmFibHkgY2FuJ3QgdXNlIHJpZ2h0X29yaWdpbiBpbiBldmVyeSBjYXNlLi4gb25seSB3aGVuIHNldHRpbmcgX2xlZnRcbiAgICAgIG8gPSBvLl9yaWdodDtcbiAgICB9XG4gICAgLy8gcmVjb25uZWN0IGxlZnQvcmlnaHQgKyB1cGRhdGUgcGFyZW50IG1hcC9zdGFydCBpZiBuZWNlc3NhcnlcbiAgICBjb25zdCBwYXJlbnRTdWIgPSB0aGlzLl9wYXJlbnRTdWI7XG4gICAgaWYgKHRoaXMuX2xlZnQgPT09IG51bGwpIHtcbiAgICAgIGxldCByaWdodDtcbiAgICAgIGlmIChwYXJlbnRTdWIgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcG1hcCA9IHBhcmVudC5fbWFwO1xuICAgICAgICByaWdodCA9IHBtYXAuZ2V0KHBhcmVudFN1YikgfHwgbnVsbDtcbiAgICAgICAgcG1hcC5zZXQocGFyZW50U3ViLCB0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJpZ2h0ID0gcGFyZW50Ll9zdGFydDtcbiAgICAgICAgcGFyZW50Ll9zdGFydCA9IHRoaXM7XG4gICAgICB9XG4gICAgICB0aGlzLl9yaWdodCA9IHJpZ2h0O1xuICAgICAgaWYgKHJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgIHJpZ2h0Ll9sZWZ0ID0gdGhpcztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbGVmdCA9IHRoaXMuX2xlZnQ7XG4gICAgICBjb25zdCByaWdodCA9IGxlZnQuX3JpZ2h0O1xuICAgICAgdGhpcy5fcmlnaHQgPSByaWdodDtcbiAgICAgIGxlZnQuX3JpZ2h0ID0gdGhpcztcbiAgICAgIGlmIChyaWdodCAhPT0gbnVsbCkge1xuICAgICAgICByaWdodC5fbGVmdCA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGFkanVzdCB0aGUgbGVuZ3RoIG9mIHBhcmVudFxuICAgIGlmIChwYXJlbnRTdWIgPT09IG51bGwgJiYgcGFyZW50Lmxlbmd0aCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuX2NvdW50YWJsZSkge1xuICAgICAgcGFyZW50Lmxlbmd0aCArPSB0aGlzLl9sZW5ndGg7XG4gICAgfVxuICAgIGlmIChwYXJlbnQuX2RlbGV0ZWQpIHtcbiAgICAgIHRoaXMuX2RlbGV0ZSh5LCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICAgIHkub3MucHV0KHRoaXMpO1xuICAgIHRyYW5zYWN0aW9uVHlwZUNoYW5nZWQoeSwgcGFyZW50LCBwYXJlbnRTdWIpO1xuICAgIGlmICh0aGlzLl9pZC51c2VyICE9PSBSb290RmFrZVVzZXJJRCkge1xuICAgICAgd3JpdGVTdHJ1Y3RUb1RyYW5zYWN0aW9uKHkuX3RyYW5zYWN0aW9uLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtIHRoZSBwcm9wZXJ0aWVzIG9mIHRoaXMgdHlwZSB0byBiaW5hcnkgYW5kIHdyaXRlIGl0IHRvIGFuXG4gICAqIEJpbmFyeUVuY29kZXIuXG4gICAqXG4gICAqIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhpcyBJdGVtIGlzIHNlbnQgdG8gYSByZW1vdGUgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHtlbmNvZGluZy5FbmNvZGVyfSBlbmNvZGVyIFRoZSBlbmNvZGVyIHRvIHdyaXRlIGRhdGEgdG8uXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdG9CaW5hcnkgKGVuY29kZXIpIHtcbiAgICB3cml0ZVVpbnQ4KGVuY29kZXIsIGdldFN0cnVjdFJlZmVyZW5jZSh0aGlzLmNvbnN0cnVjdG9yKSk7XG4gICAgbGV0IGluZm8gPSAwO1xuICAgIGlmICh0aGlzLl9vcmlnaW4gIT09IG51bGwpIHtcbiAgICAgIGluZm8gKz0gMGIxOyAvLyBvcmlnaW4gaXMgZGVmaW5lZFxuICAgIH1cbiAgICAvLyBUT0RPOiByZW1vdmVcbiAgICAvKiBubyBsb25nZXIgc2VuZCBfbGVmdFxuICAgIGlmICh0aGlzLl9sZWZ0ICE9PSB0aGlzLl9vcmlnaW4pIHtcbiAgICAgIGluZm8gKz0gMGIxMCAvLyBkbyBub3QgY29weSBvcmlnaW4gdG8gbGVmdFxuICAgIH1cbiAgICAqL1xuICAgIGlmICh0aGlzLl9yaWdodF9vcmlnaW4gIT09IG51bGwpIHtcbiAgICAgIGluZm8gKz0gMGIxMDA7XG4gICAgfVxuICAgIGlmICh0aGlzLl9wYXJlbnRTdWIgIT09IG51bGwpIHtcbiAgICAgIGluZm8gKz0gMGIxMDAwO1xuICAgIH1cbiAgICB3cml0ZVVpbnQ4KGVuY29kZXIsIGluZm8pO1xuICAgIHRoaXMuX2lkLmVuY29kZShlbmNvZGVyKTtcbiAgICBpZiAoaW5mbyAmIDBiMSkge1xuICAgICAgdGhpcy5fb3JpZ2luLl9sYXN0SWQuZW5jb2RlKGVuY29kZXIpO1xuICAgIH1cbiAgICAvLyBUT0RPOiByZW1vdmVcbiAgICAvKiBzZWUgYWJvdmVcbiAgICBpZiAoaW5mbyAmIDBiMTApIHtcbiAgICAgIGVuY29kZXIud3JpdGVJRCh0aGlzLl9sZWZ0Ll9sYXN0SWQpXG4gICAgfVxuICAgICovXG4gICAgaWYgKGluZm8gJiAwYjEwMCkge1xuICAgICAgdGhpcy5fcmlnaHRfb3JpZ2luLl9pZC5lbmNvZGUoZW5jb2Rlcik7XG4gICAgfVxuICAgIGlmICgoaW5mbyAmIDBiMTAxKSA9PT0gMCkge1xuICAgICAgLy8gbmVpdGhlciBvcmlnaW4gbm9yIHJpZ2h0IGlzIGRlZmluZWRcbiAgICAgIHRoaXMuX3BhcmVudC5faWQuZW5jb2RlKGVuY29kZXIpO1xuICAgIH1cbiAgICBpZiAoaW5mbyAmIDBiMTAwMCkge1xuICAgICAgd3JpdGVWYXJTdHJpbmcoZW5jb2RlciwgSlNPTi5zdHJpbmdpZnkodGhpcy5fcGFyZW50U3ViKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWQgdGhlIG5leHQgSXRlbSBpbiBhIERlY29kZXIgYW5kIGZpbGwgdGhpcyBJdGVtIHdpdGggdGhlIHJlYWQgZGF0YS5cbiAgICpcbiAgICogVGhpcyBpcyBjYWxsZWQgd2hlbiBkYXRhIGlzIHJlY2VpdmVkIGZyb20gYSByZW1vdGUgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHtZfSB5IFRoZSBZanMgaW5zdGFuY2UgdGhhdCB0aGlzIEl0ZW0gYmVsb25ncyB0by5cbiAgICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyIFRoZSBkZWNvZGVyIG9iamVjdCB0byByZWFkIGRhdGEgZnJvbS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9mcm9tQmluYXJ5ICh5LCBkZWNvZGVyKSB7XG4gICAgbGV0IG1pc3NpbmcgPSBbXTtcbiAgICBjb25zdCBpbmZvID0gcmVhZFVpbnQ4KGRlY29kZXIpO1xuICAgIGNvbnN0IGlkID0gZGVjb2RlKGRlY29kZXIpO1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgLy8gcmVhZCBvcmlnaW5cbiAgICBpZiAoaW5mbyAmIDBiMSkge1xuICAgICAgLy8gb3JpZ2luICE9IG51bGxcbiAgICAgIGNvbnN0IG9yaWdpbklEID0gZGVjb2RlKGRlY29kZXIpO1xuICAgICAgLy8gd2UgaGF2ZSB0byBxdWVyeSBmb3IgbGVmdCBhZ2FpbiBiZWNhdXNlIGl0IG1pZ2h0IGhhdmUgYmVlbiBzcGxpdC9tZXJnZWQuLlxuICAgICAgY29uc3Qgb3JpZ2luID0geS5vcy5nZXRJdGVtQ2xlYW5FbmQob3JpZ2luSUQpO1xuICAgICAgaWYgKG9yaWdpbiA9PT0gbnVsbCkge1xuICAgICAgICBtaXNzaW5nLnB1c2gob3JpZ2luSUQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fb3JpZ2luID0gb3JpZ2luO1xuICAgICAgICB0aGlzLl9sZWZ0ID0gdGhpcy5fb3JpZ2luO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZWFkIHJpZ2h0XG4gICAgaWYgKGluZm8gJiAwYjEwMCkge1xuICAgICAgLy8gcmlnaHQgIT0gbnVsbFxuICAgICAgY29uc3QgcmlnaHRJRCA9IGRlY29kZShkZWNvZGVyKTtcbiAgICAgIC8vIHdlIGhhdmUgdG8gcXVlcnkgZm9yIHJpZ2h0IGFnYWluIGJlY2F1c2UgaXQgbWlnaHQgaGF2ZSBiZWVuIHNwbGl0L21lcmdlZC4uXG4gICAgICBjb25zdCByaWdodCA9IHkub3MuZ2V0SXRlbUNsZWFuU3RhcnQocmlnaHRJRCk7XG4gICAgICBpZiAocmlnaHQgPT09IG51bGwpIHtcbiAgICAgICAgbWlzc2luZy5wdXNoKHJpZ2h0SUQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcmlnaHQgPSByaWdodDtcbiAgICAgICAgdGhpcy5fcmlnaHRfb3JpZ2luID0gcmlnaHQ7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJlYWQgcGFyZW50XG4gICAgaWYgKChpbmZvICYgMGIxMDEpID09PSAwKSB7XG4gICAgICAvLyBuZWl0aGVyIG9yaWdpbiBub3IgcmlnaHQgaXMgZGVmaW5lZFxuICAgICAgY29uc3QgcGFyZW50SUQgPSBkZWNvZGUoZGVjb2Rlcik7XG4gICAgICAvLyBwYXJlbnQgZG9lcyBub3QgY2hhbmdlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHNlYXJjaCBmb3IgaXQgYWdhaW5cbiAgICAgIGlmICh0aGlzLl9wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgbGV0IHBhcmVudDtcbiAgICAgICAgaWYgKHBhcmVudElELmNvbnN0cnVjdG9yID09PSBSb290SUQpIHtcbiAgICAgICAgICBwYXJlbnQgPSB5Lm9zLmdldChwYXJlbnRJRCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyZW50ID0geS5vcy5nZXRJdGVtKHBhcmVudElEKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgbWlzc2luZy5wdXNoKHBhcmVudElEKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX3BhcmVudCA9PT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuX29yaWdpbiAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9vcmlnaW4uX3BhcmVudDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fcmlnaHRfb3JpZ2luICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX3JpZ2h0X29yaWdpbi5fcGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaW5mbyAmIDBiMTAwMCkge1xuICAgICAgLy8gVE9ETzogbWF5YmUgcHV0IHRoaXMgaW4gcmVhZCBwYXJlbnQgY29uZGl0aW9uICh5b3UgY2FuIGFsc28gcmVhZCBwYXJlbnRzdWIgZnJvbSBsZWZ0L3JpZ2h0KVxuICAgICAgdGhpcy5fcGFyZW50U3ViID0gSlNPTi5wYXJzZShyZWFkVmFyU3RyaW5nKGRlY29kZXIpKTtcbiAgICB9XG4gICAgaWYgKGlkIGluc3RhbmNlb2YgSUQgJiYgeS5zcy5nZXRTdGF0ZShpZC51c2VyKSA8IGlkLmNsb2NrKSB7XG4gICAgICBtaXNzaW5nLnB1c2goY3JlYXRlSUQoaWQudXNlciwgaWQuY2xvY2sgLSAxKSk7XG4gICAgfVxuICAgIHJldHVybiBtaXNzaW5nXG4gIH1cbn1cblxuLyoqXG4gKiBAbW9kdWxlIHRyZWVcbiAqL1xuXG5jb25zdCByb3RhdGUgPSAodHJlZSwgcGFyZW50LCBuZXdQYXJlbnQsIG4pID0+IHtcbiAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgIHRyZWUucm9vdCA9IG5ld1BhcmVudDtcbiAgICBuZXdQYXJlbnQuX3BhcmVudCA9IG51bGw7XG4gIH0gZWxzZSBpZiAocGFyZW50LmxlZnQgPT09IG4pIHtcbiAgICBwYXJlbnQubGVmdCA9IG5ld1BhcmVudDtcbiAgfSBlbHNlIGlmIChwYXJlbnQucmlnaHQgPT09IG4pIHtcbiAgICBwYXJlbnQucmlnaHQgPSBuZXdQYXJlbnQ7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZWxlbWVudHMgYXJlIHdyb25nbHkgY29ubmVjdGVkIScpXG4gIH1cbn07XG5cbmNsYXNzIE4ge1xuICAvLyBBIGNyZWF0ZWQgbm9kZSBpcyBhbHdheXMgcmVkIVxuICBjb25zdHJ1Y3RvciAodmFsKSB7XG4gICAgdGhpcy52YWwgPSB2YWw7XG4gICAgdGhpcy5jb2xvciA9IHRydWU7XG4gICAgdGhpcy5fbGVmdCA9IG51bGw7XG4gICAgdGhpcy5fcmlnaHQgPSBudWxsO1xuICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gIH1cbiAgaXNSZWQgKCkgeyByZXR1cm4gdGhpcy5jb2xvciB9XG4gIGlzQmxhY2sgKCkgeyByZXR1cm4gIXRoaXMuY29sb3IgfVxuICByZWRkZW4gKCkgeyB0aGlzLmNvbG9yID0gdHJ1ZTsgcmV0dXJuIHRoaXMgfVxuICBibGFja2VuICgpIHsgdGhpcy5jb2xvciA9IGZhbHNlOyByZXR1cm4gdGhpcyB9XG4gIGdldCBncmFuZHBhcmVudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50LnBhcmVudFxuICB9XG4gIGdldCBwYXJlbnQgKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnRcbiAgfVxuICBnZXQgc2libGluZyAoKSB7XG4gICAgcmV0dXJuICh0aGlzID09PSB0aGlzLnBhcmVudC5sZWZ0KVxuICAgICAgPyB0aGlzLnBhcmVudC5yaWdodCA6IHRoaXMucGFyZW50LmxlZnRcbiAgfVxuICBnZXQgbGVmdCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlZnRcbiAgfVxuICBnZXQgcmlnaHQgKCkge1xuICAgIHJldHVybiB0aGlzLl9yaWdodFxuICB9XG4gIHNldCBsZWZ0IChuKSB7XG4gICAgaWYgKG4gIT09IG51bGwpIHtcbiAgICAgIG4uX3BhcmVudCA9IHRoaXM7XG4gICAgfVxuICAgIHRoaXMuX2xlZnQgPSBuO1xuICB9XG4gIHNldCByaWdodCAobikge1xuICAgIGlmIChuICE9PSBudWxsKSB7XG4gICAgICBuLl9wYXJlbnQgPSB0aGlzO1xuICAgIH1cbiAgICB0aGlzLl9yaWdodCA9IG47XG4gIH1cbiAgcm90YXRlTGVmdCAodHJlZSkge1xuICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgIGNvbnN0IG5ld1BhcmVudCA9IHRoaXMucmlnaHQ7XG4gICAgY29uc3QgbmV3UmlnaHQgPSB0aGlzLnJpZ2h0LmxlZnQ7XG4gICAgbmV3UGFyZW50LmxlZnQgPSB0aGlzO1xuICAgIHRoaXMucmlnaHQgPSBuZXdSaWdodDtcbiAgICByb3RhdGUodHJlZSwgcGFyZW50LCBuZXdQYXJlbnQsIHRoaXMpO1xuICB9XG4gIG5leHQgKCkge1xuICAgIGlmICh0aGlzLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAvLyBzZWFyY2ggdGhlIG1vc3QgbGVmdCBub2RlIGluIHRoZSByaWdodCB0cmVlXG4gICAgICB2YXIgbyA9IHRoaXMucmlnaHQ7XG4gICAgICB3aGlsZSAoby5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgIG8gPSBvLmxlZnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcCA9IHRoaXM7XG4gICAgICB3aGlsZSAocC5wYXJlbnQgIT09IG51bGwgJiYgcCAhPT0gcC5wYXJlbnQubGVmdCkge1xuICAgICAgICBwID0gcC5wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gcC5wYXJlbnRcbiAgICB9XG4gIH1cbiAgcHJldiAoKSB7XG4gICAgaWYgKHRoaXMubGVmdCAhPT0gbnVsbCkge1xuICAgICAgLy8gc2VhcmNoIHRoZSBtb3N0IHJpZ2h0IG5vZGUgaW4gdGhlIGxlZnQgdHJlZVxuICAgICAgdmFyIG8gPSB0aGlzLmxlZnQ7XG4gICAgICB3aGlsZSAoby5yaWdodCAhPT0gbnVsbCkge1xuICAgICAgICBvID0gby5yaWdodDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwID0gdGhpcztcbiAgICAgIHdoaWxlIChwLnBhcmVudCAhPT0gbnVsbCAmJiBwICE9PSBwLnBhcmVudC5yaWdodCkge1xuICAgICAgICBwID0gcC5wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gcC5wYXJlbnRcbiAgICB9XG4gIH1cbiAgcm90YXRlUmlnaHQgKHRyZWUpIHtcbiAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICBjb25zdCBuZXdQYXJlbnQgPSB0aGlzLmxlZnQ7XG4gICAgY29uc3QgbmV3TGVmdCA9IHRoaXMubGVmdC5yaWdodDtcbiAgICBuZXdQYXJlbnQucmlnaHQgPSB0aGlzO1xuICAgIHRoaXMubGVmdCA9IG5ld0xlZnQ7XG4gICAgcm90YXRlKHRyZWUsIHBhcmVudCwgbmV3UGFyZW50LCB0aGlzKTtcbiAgfVxuICBnZXRVbmNsZSAoKSB7XG4gICAgLy8gd2UgY2FuIGFzc3VtZSB0aGF0IGdyYW5kcGFyZW50IGV4aXN0cyB3aGVuIHRoaXMgaXMgY2FsbGVkIVxuICAgIGlmICh0aGlzLnBhcmVudCA9PT0gdGhpcy5wYXJlbnQucGFyZW50LmxlZnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudC5wYXJlbnQucmlnaHRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LnBhcmVudC5sZWZ0XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGlzQmxhY2sgPSBub2RlID0+XG4gIG5vZGUgIT09IG51bGwgPyBub2RlLmlzQmxhY2soKSA6IHRydWU7XG5cbmNvbnN0IGlzUmVkID0gKG5vZGUpID0+XG4gIG5vZGUgIT09IG51bGwgPyBub2RlLmlzUmVkKCkgOiBmYWxzZTtcblxuLypcbiAqIFRoaXMgaXMgYSBSZWQgQmxhY2sgVHJlZSBpbXBsZW1lbnRhdGlvblxuICovXG5jbGFzcyBUcmVlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMucm9vdCA9IG51bGw7XG4gICAgdGhpcy5sZW5ndGggPSAwO1xuICB9XG4gIGZpbmROZXh0IChpZCkge1xuICAgIHZhciBuZXh0SUQgPSBpZC5jbG9uZSgpO1xuICAgIG5leHRJRC5jbG9jayArPSAxO1xuICAgIHJldHVybiB0aGlzLmZpbmRXaXRoTG93ZXJCb3VuZChuZXh0SUQpXG4gIH1cbiAgZmluZFByZXYgKGlkKSB7XG4gICAgbGV0IHByZXZJRCA9IGlkLmNsb25lKCk7XG4gICAgcHJldklELmNsb2NrIC09IDE7XG4gICAgcmV0dXJuIHRoaXMuZmluZFdpdGhVcHBlckJvdW5kKHByZXZJRClcbiAgfVxuICBmaW5kTm9kZVdpdGhMb3dlckJvdW5kIChmcm9tKSB7XG4gICAgdmFyIG8gPSB0aGlzLnJvb3Q7XG4gICAgaWYgKG8gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlmIChmcm9tID09PSBudWxsIHx8IChmcm9tLmxlc3NUaGFuKG8udmFsLl9pZCkgJiYgby5sZWZ0ICE9PSBudWxsKSkge1xuICAgICAgICAgIC8vIG8gaXMgaW5jbHVkZWQgaW4gdGhlIGJvdW5kXG4gICAgICAgICAgLy8gdHJ5IHRvIGZpbmQgYW4gZWxlbWVudCB0aGF0IGlzIGNsb3NlciB0byB0aGUgYm91bmRcbiAgICAgICAgICBvID0gby5sZWZ0O1xuICAgICAgICB9IGVsc2UgaWYgKGZyb20gIT09IG51bGwgJiYgby52YWwuX2lkLmxlc3NUaGFuKGZyb20pKSB7XG4gICAgICAgICAgLy8gbyBpcyBub3Qgd2l0aGluIHRoZSBib3VuZCwgbWF5YmUgb25lIG9mIHRoZSByaWdodCBlbGVtZW50cyBpcy4uXG4gICAgICAgICAgaWYgKG8ucmlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIG8gPSBvLnJpZ2h0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGVyZSBpcyBubyByaWdodCBlbGVtZW50LiBTZWFyY2ggZm9yIHRoZSBuZXh0IGJpZ2dlciBlbGVtZW50LFxuICAgICAgICAgICAgLy8gdGhpcyBzaG91bGQgYmUgd2l0aGluIHRoZSBib3VuZHNcbiAgICAgICAgICAgIHJldHVybiBvLm5leHQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZpbmROb2RlV2l0aFVwcGVyQm91bmQgKHRvKSB7XG4gICAgaWYgKHRvID09PSB2b2lkIDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgZGVmaW5lIGZyb20hJylcbiAgICB9XG4gICAgdmFyIG8gPSB0aGlzLnJvb3Q7XG4gICAgaWYgKG8gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlmICgodG8gPT09IG51bGwgfHwgby52YWwuX2lkLmxlc3NUaGFuKHRvKSkgJiYgby5yaWdodCAhPT0gbnVsbCkge1xuICAgICAgICAgIC8vIG8gaXMgaW5jbHVkZWQgaW4gdGhlIGJvdW5kXG4gICAgICAgICAgLy8gdHJ5IHRvIGZpbmQgYW4gZWxlbWVudCB0aGF0IGlzIGNsb3NlciB0byB0aGUgYm91bmRcbiAgICAgICAgICBvID0gby5yaWdodDtcbiAgICAgICAgfSBlbHNlIGlmICh0byAhPT0gbnVsbCAmJiB0by5sZXNzVGhhbihvLnZhbC5faWQpKSB7XG4gICAgICAgICAgLy8gbyBpcyBub3Qgd2l0aGluIHRoZSBib3VuZCwgbWF5YmUgb25lIG9mIHRoZSBsZWZ0IGVsZW1lbnRzIGlzLi5cbiAgICAgICAgICBpZiAoby5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvID0gby5sZWZ0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGVyZSBpcyBubyBsZWZ0IGVsZW1lbnQuIFNlYXJjaCBmb3IgdGhlIHByZXYgc21hbGxlciBlbGVtZW50LFxuICAgICAgICAgICAgLy8gdGhpcyBzaG91bGQgYmUgd2l0aGluIHRoZSBib3VuZHNcbiAgICAgICAgICAgIHJldHVybiBvLnByZXYoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZpbmRTbWFsbGVzdE5vZGUgKCkge1xuICAgIHZhciBvID0gdGhpcy5yb290O1xuICAgIHdoaWxlIChvICE9IG51bGwgJiYgby5sZWZ0ICE9IG51bGwpIHtcbiAgICAgIG8gPSBvLmxlZnQ7XG4gICAgfVxuICAgIHJldHVybiBvXG4gIH1cbiAgZmluZFdpdGhMb3dlckJvdW5kIChmcm9tKSB7XG4gICAgdmFyIG4gPSB0aGlzLmZpbmROb2RlV2l0aExvd2VyQm91bmQoZnJvbSk7XG4gICAgcmV0dXJuIG4gPT0gbnVsbCA/IG51bGwgOiBuLnZhbFxuICB9XG4gIGZpbmRXaXRoVXBwZXJCb3VuZCAodG8pIHtcbiAgICB2YXIgbiA9IHRoaXMuZmluZE5vZGVXaXRoVXBwZXJCb3VuZCh0byk7XG4gICAgcmV0dXJuIG4gPT0gbnVsbCA/IG51bGwgOiBuLnZhbFxuICB9XG4gIGl0ZXJhdGUgKGZyb20sIHRvLCBmKSB7XG4gICAgdmFyIG87XG4gICAgaWYgKGZyb20gPT09IG51bGwpIHtcbiAgICAgIG8gPSB0aGlzLmZpbmRTbWFsbGVzdE5vZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbyA9IHRoaXMuZmluZE5vZGVXaXRoTG93ZXJCb3VuZChmcm9tKTtcbiAgICB9XG4gICAgd2hpbGUgKFxuICAgICAgbyAhPT0gbnVsbCAmJlxuICAgICAgKFxuICAgICAgICB0byA9PT0gbnVsbCB8fCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVubW9kaWZpZWQtbG9vcC1jb25kaXRpb25cbiAgICAgICAgby52YWwuX2lkLmxlc3NUaGFuKHRvKSB8fFxuICAgICAgICBvLnZhbC5faWQuZXF1YWxzKHRvKVxuICAgICAgKVxuICAgICkge1xuICAgICAgZihvLnZhbCk7XG4gICAgICBvID0gby5uZXh0KCk7XG4gICAgfVxuICB9XG4gIGZpbmQgKGlkKSB7XG4gICAgbGV0IG4gPSB0aGlzLmZpbmROb2RlKGlkKTtcbiAgICBpZiAobiAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG4udmFsXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG4gIGZpbmROb2RlIChpZCkge1xuICAgIHZhciBvID0gdGhpcy5yb290O1xuICAgIGlmIChvID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpZiAobyA9PT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkLmxlc3NUaGFuKG8udmFsLl9pZCkpIHtcbiAgICAgICAgICBvID0gby5sZWZ0O1xuICAgICAgICB9IGVsc2UgaWYgKG8udmFsLl9pZC5sZXNzVGhhbihpZCkpIHtcbiAgICAgICAgICBvID0gby5yaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGRlbGV0ZSAoaWQpIHtcbiAgICB2YXIgZCA9IHRoaXMuZmluZE5vZGUoaWQpO1xuICAgIGlmIChkID09IG51bGwpIHtcbiAgICAgIC8vIHRocm93IG5ldyBFcnJvcignRWxlbWVudCBkb2VzIG5vdCBleGlzdCEnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMubGVuZ3RoLS07XG4gICAgaWYgKGQubGVmdCAhPT0gbnVsbCAmJiBkLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAvLyBzd2l0Y2ggZCB3aXRoIHRoZSBncmVhdGVzIGVsZW1lbnQgaW4gdGhlIGxlZnQgc3VidHJlZS5cbiAgICAgIC8vIG8gc2hvdWxkIGhhdmUgYXQgbW9zdCBvbmUgY2hpbGQuXG4gICAgICB2YXIgbyA9IGQubGVmdDtcbiAgICAgIC8vIGZpbmRcbiAgICAgIHdoaWxlIChvLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgIG8gPSBvLnJpZ2h0O1xuICAgICAgfVxuICAgICAgLy8gc3dpdGNoXG4gICAgICBkLnZhbCA9IG8udmFsO1xuICAgICAgZCA9IG87XG4gICAgfVxuICAgIC8vIGQgaGFzIGF0IG1vc3Qgb25lIGNoaWxkXG4gICAgLy8gbGV0IG4gYmUgdGhlIG5vZGUgdGhhdCByZXBsYWNlcyBkXG4gICAgdmFyIGlzRmFrZUNoaWxkO1xuICAgIHZhciBjaGlsZCA9IGQubGVmdCB8fCBkLnJpZ2h0O1xuICAgIGlmIChjaGlsZCA9PT0gbnVsbCkge1xuICAgICAgaXNGYWtlQ2hpbGQgPSB0cnVlO1xuICAgICAgY2hpbGQgPSBuZXcgTihudWxsKTtcbiAgICAgIGNoaWxkLmJsYWNrZW4oKTtcbiAgICAgIGQucmlnaHQgPSBjaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaXNGYWtlQ2hpbGQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZC5wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIGlmICghaXNGYWtlQ2hpbGQpIHtcbiAgICAgICAgdGhpcy5yb290ID0gY2hpbGQ7XG4gICAgICAgIGNoaWxkLmJsYWNrZW4oKTtcbiAgICAgICAgY2hpbGQuX3BhcmVudCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJvb3QgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChkLnBhcmVudC5sZWZ0ID09PSBkKSB7XG4gICAgICBkLnBhcmVudC5sZWZ0ID0gY2hpbGQ7XG4gICAgfSBlbHNlIGlmIChkLnBhcmVudC5yaWdodCA9PT0gZCkge1xuICAgICAgZC5wYXJlbnQucmlnaHQgPSBjaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbXBvc3NpYmxlIScpXG4gICAgfVxuICAgIGlmIChkLmlzQmxhY2soKSkge1xuICAgICAgaWYgKGNoaWxkLmlzUmVkKCkpIHtcbiAgICAgICAgY2hpbGQuYmxhY2tlbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZml4RGVsZXRlKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yb290LmJsYWNrZW4oKTtcbiAgICBpZiAoaXNGYWtlQ2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5wYXJlbnQubGVmdCA9PT0gY2hpbGQpIHtcbiAgICAgICAgY2hpbGQucGFyZW50LmxlZnQgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmIChjaGlsZC5wYXJlbnQucmlnaHQgPT09IGNoaWxkKSB7XG4gICAgICAgIGNoaWxkLnBhcmVudC5yaWdodCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgIzMnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBfZml4RGVsZXRlIChuKSB7XG4gICAgaWYgKG4ucGFyZW50ID09PSBudWxsKSB7XG4gICAgICAvLyB0aGlzIGNhbiBvbmx5IGJlIGNhbGxlZCBhZnRlciB0aGUgZmlyc3QgaXRlcmF0aW9uIG9mIGZpeERlbGV0ZS5cbiAgICAgIHJldHVyblxuICAgIH1cbiAgICAvLyBkIHdhcyBhbHJlYWR5IHJlcGxhY2VkIGJ5IHRoZSBjaGlsZFxuICAgIC8vIGQgaXMgbm90IHRoZSByb290XG4gICAgLy8gZCBhbmQgY2hpbGQgYXJlIGJsYWNrXG4gICAgdmFyIHNpYmxpbmcgPSBuLnNpYmxpbmc7XG4gICAgaWYgKGlzUmVkKHNpYmxpbmcpKSB7XG4gICAgICAvLyBtYWtlIHNpYmxpbmcgdGhlIGdyYW5kZmF0aGVyXG4gICAgICBuLnBhcmVudC5yZWRkZW4oKTtcbiAgICAgIHNpYmxpbmcuYmxhY2tlbigpO1xuICAgICAgaWYgKG4gPT09IG4ucGFyZW50LmxlZnQpIHtcbiAgICAgICAgbi5wYXJlbnQucm90YXRlTGVmdCh0aGlzKTtcbiAgICAgIH0gZWxzZSBpZiAobiA9PT0gbi5wYXJlbnQucmlnaHQpIHtcbiAgICAgICAgbi5wYXJlbnQucm90YXRlUmlnaHQodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ltcG9zc2libGUgIzInKVxuICAgICAgfVxuICAgICAgc2libGluZyA9IG4uc2libGluZztcbiAgICB9XG4gICAgLy8gcGFyZW50LCBzaWJsaW5nLCBhbmQgY2hpbGRyZW4gb2YgbiBhcmUgYmxhY2tcbiAgICBpZiAobi5wYXJlbnQuaXNCbGFjaygpICYmXG4gICAgICBzaWJsaW5nLmlzQmxhY2soKSAmJlxuICAgICAgaXNCbGFjayhzaWJsaW5nLmxlZnQpICYmXG4gICAgICBpc0JsYWNrKHNpYmxpbmcucmlnaHQpXG4gICAgKSB7XG4gICAgICBzaWJsaW5nLnJlZGRlbigpO1xuICAgICAgdGhpcy5fZml4RGVsZXRlKG4ucGFyZW50KTtcbiAgICB9IGVsc2UgaWYgKG4ucGFyZW50LmlzUmVkKCkgJiZcbiAgICAgIHNpYmxpbmcuaXNCbGFjaygpICYmXG4gICAgICBpc0JsYWNrKHNpYmxpbmcubGVmdCkgJiZcbiAgICAgIGlzQmxhY2soc2libGluZy5yaWdodClcbiAgICApIHtcbiAgICAgIHNpYmxpbmcucmVkZGVuKCk7XG4gICAgICBuLnBhcmVudC5ibGFja2VuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChuID09PSBuLnBhcmVudC5sZWZ0ICYmXG4gICAgICAgIHNpYmxpbmcuaXNCbGFjaygpICYmXG4gICAgICAgIGlzUmVkKHNpYmxpbmcubGVmdCkgJiZcbiAgICAgICAgaXNCbGFjayhzaWJsaW5nLnJpZ2h0KVxuICAgICAgKSB7XG4gICAgICAgIHNpYmxpbmcucmVkZGVuKCk7XG4gICAgICAgIHNpYmxpbmcubGVmdC5ibGFja2VuKCk7XG4gICAgICAgIHNpYmxpbmcucm90YXRlUmlnaHQodGhpcyk7XG4gICAgICAgIHNpYmxpbmcgPSBuLnNpYmxpbmc7XG4gICAgICB9IGVsc2UgaWYgKG4gPT09IG4ucGFyZW50LnJpZ2h0ICYmXG4gICAgICAgIHNpYmxpbmcuaXNCbGFjaygpICYmXG4gICAgICAgIGlzUmVkKHNpYmxpbmcucmlnaHQpICYmXG4gICAgICAgIGlzQmxhY2soc2libGluZy5sZWZ0KVxuICAgICAgKSB7XG4gICAgICAgIHNpYmxpbmcucmVkZGVuKCk7XG4gICAgICAgIHNpYmxpbmcucmlnaHQuYmxhY2tlbigpO1xuICAgICAgICBzaWJsaW5nLnJvdGF0ZUxlZnQodGhpcyk7XG4gICAgICAgIHNpYmxpbmcgPSBuLnNpYmxpbmc7XG4gICAgICB9XG4gICAgICBzaWJsaW5nLmNvbG9yID0gbi5wYXJlbnQuY29sb3I7XG4gICAgICBuLnBhcmVudC5ibGFja2VuKCk7XG4gICAgICBpZiAobiA9PT0gbi5wYXJlbnQubGVmdCkge1xuICAgICAgICBzaWJsaW5nLnJpZ2h0LmJsYWNrZW4oKTtcbiAgICAgICAgbi5wYXJlbnQucm90YXRlTGVmdCh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNpYmxpbmcubGVmdC5ibGFja2VuKCk7XG4gICAgICAgIG4ucGFyZW50LnJvdGF0ZVJpZ2h0KHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBwdXQgKHYpIHtcbiAgICB2YXIgbm9kZSA9IG5ldyBOKHYpO1xuICAgIGlmICh0aGlzLnJvb3QgIT09IG51bGwpIHtcbiAgICAgIHZhciBwID0gdGhpcy5yb290OyAvLyBwIGFiYnJldi4gcGFyZW50XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpZiAobm9kZS52YWwuX2lkLmxlc3NUaGFuKHAudmFsLl9pZCkpIHtcbiAgICAgICAgICBpZiAocC5sZWZ0ID09PSBudWxsKSB7XG4gICAgICAgICAgICBwLmxlZnQgPSBub2RlO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcCA9IHAubGVmdDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocC52YWwuX2lkLmxlc3NUaGFuKG5vZGUudmFsLl9pZCkpIHtcbiAgICAgICAgICBpZiAocC5yaWdodCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcC5yaWdodCA9IG5vZGU7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwID0gcC5yaWdodDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcC52YWwgPSBub2RlLnZhbDtcbiAgICAgICAgICByZXR1cm4gcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9maXhJbnNlcnQobm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdCA9IG5vZGU7XG4gICAgfVxuICAgIHRoaXMubGVuZ3RoKys7XG4gICAgdGhpcy5yb290LmJsYWNrZW4oKTtcbiAgICByZXR1cm4gbm9kZVxuICB9XG4gIF9maXhJbnNlcnQgKG4pIHtcbiAgICBpZiAobi5wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIG4uYmxhY2tlbigpO1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChuLnBhcmVudC5pc0JsYWNrKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB2YXIgdW5jbGUgPSBuLmdldFVuY2xlKCk7XG4gICAgaWYgKHVuY2xlICE9PSBudWxsICYmIHVuY2xlLmlzUmVkKCkpIHtcbiAgICAgIC8vIE5vdGU6IHBhcmVudDogcmVkLCB1bmNsZTogcmVkXG4gICAgICBuLnBhcmVudC5ibGFja2VuKCk7XG4gICAgICB1bmNsZS5ibGFja2VuKCk7XG4gICAgICBuLmdyYW5kcGFyZW50LnJlZGRlbigpO1xuICAgICAgdGhpcy5fZml4SW5zZXJ0KG4uZ3JhbmRwYXJlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOb3RlOiBwYXJlbnQ6IHJlZCwgdW5jbGU6IGJsYWNrIG9yIG51bGxcbiAgICAgIC8vIE5vdyB3ZSB0cmFuc2Zvcm0gdGhlIHRyZWUgaW4gc3VjaCBhIHdheSB0aGF0XG4gICAgICAvLyBlaXRoZXIgb2YgdGhlc2UgaG9sZHM6XG4gICAgICAvLyAgIDEpIGdyYW5kcGFyZW50LmxlZnQuaXNSZWRcbiAgICAgIC8vICAgICBhbmQgZ3JhbmRwYXJlbnQubGVmdC5sZWZ0LmlzUmVkXG4gICAgICAvLyAgIDIpIGdyYW5kcGFyZW50LnJpZ2h0LmlzUmVkXG4gICAgICAvLyAgICAgYW5kIGdyYW5kcGFyZW50LnJpZ2h0LnJpZ2h0LmlzUmVkXG4gICAgICBpZiAobiA9PT0gbi5wYXJlbnQucmlnaHQgJiYgbi5wYXJlbnQgPT09IG4uZ3JhbmRwYXJlbnQubGVmdCkge1xuICAgICAgICBuLnBhcmVudC5yb3RhdGVMZWZ0KHRoaXMpO1xuICAgICAgICAvLyBTaW5jZSB3ZSByb3RhdGVkIGFuZCB3YW50IHRvIHVzZSB0aGUgcHJldmlvdXNcbiAgICAgICAgLy8gY2FzZXMsIHdlIG5lZWQgdG8gc2V0IG4gaW4gc3VjaCBhIHdheSB0aGF0XG4gICAgICAgIC8vIG4ucGFyZW50LmlzUmVkIGFnYWluXG4gICAgICAgIG4gPSBuLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKG4gPT09IG4ucGFyZW50LmxlZnQgJiYgbi5wYXJlbnQgPT09IG4uZ3JhbmRwYXJlbnQucmlnaHQpIHtcbiAgICAgICAgbi5wYXJlbnQucm90YXRlUmlnaHQodGhpcyk7XG4gICAgICAgIC8vIHNlZSBhYm92ZVxuICAgICAgICBuID0gbi5yaWdodDtcbiAgICAgIH1cbiAgICAgIC8vIENhc2UgMSkgb3IgMikgaG9sZCBmcm9tIGhlcmUgb24uXG4gICAgICAvLyBOb3cgdHJhdmVyc2UgZ3JhbmRwYXJlbnQsIG1ha2UgcGFyZW50IGEgYmxhY2sgbm9kZVxuICAgICAgLy8gb24gdGhlIGhpZ2hlc3QgbGV2ZWwgd2hpY2ggaG9sZHMgdHdvIHJlZCBub2Rlcy5cbiAgICAgIG4ucGFyZW50LmJsYWNrZW4oKTtcbiAgICAgIG4uZ3JhbmRwYXJlbnQucmVkZGVuKCk7XG4gICAgICBpZiAobiA9PT0gbi5wYXJlbnQubGVmdCkge1xuICAgICAgICAvLyBDYXNlIDFcbiAgICAgICAgbi5ncmFuZHBhcmVudC5yb3RhdGVSaWdodCh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENhc2UgMlxuICAgICAgICBuLmdyYW5kcGFyZW50LnJvdGF0ZUxlZnQodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQG1vZHVsZSB1dGlsc1xuICovXG5cbmNsYXNzIERTTm9kZSB7XG4gIGNvbnN0cnVjdG9yIChpZCwgbGVuLCBnYykge1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgdGhpcy5sZW4gPSBsZW47XG4gICAgdGhpcy5nYyA9IGdjO1xuICB9XG4gIGNsb25lICgpIHtcbiAgICByZXR1cm4gbmV3IERTTm9kZSh0aGlzLl9pZCwgdGhpcy5sZW4sIHRoaXMuZ2MpXG4gIH1cbn1cblxuY2xhc3MgRGVsZXRlU3RvcmUgZXh0ZW5kcyBUcmVlIHtcbiAgbG9nVGFibGUgKCkge1xuICAgIGNvbnN0IGRlbGV0ZXMgPSBbXTtcbiAgICB0aGlzLml0ZXJhdGUobnVsbCwgbnVsbCwgbiA9PiB7XG4gICAgICBkZWxldGVzLnB1c2goe1xuICAgICAgICB1c2VyOiBuLl9pZC51c2VyLFxuICAgICAgICBjbG9jazogbi5faWQuY2xvY2ssXG4gICAgICAgIGxlbjogbi5sZW4sXG4gICAgICAgIGdjOiBuLmdjXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBjb25zb2xlLnRhYmxlKGRlbGV0ZXMpO1xuICB9XG4gIGlzRGVsZXRlZCAoaWQpIHtcbiAgICB2YXIgbiA9IHRoaXMuZmluZFdpdGhVcHBlckJvdW5kKGlkKTtcbiAgICByZXR1cm4gbiAhPT0gbnVsbCAmJiBuLl9pZC51c2VyID09PSBpZC51c2VyICYmIGlkLmNsb2NrIDwgbi5faWQuY2xvY2sgKyBuLmxlblxuICB9XG4gIG1hcmsgKGlkLCBsZW5ndGgkJDEsIGdjKSB7XG4gICAgaWYgKGxlbmd0aCQkMSA9PT0gMCkgcmV0dXJuXG4gICAgLy8gU3RlcCAxLiBVbm1hcmsgcmFuZ2VcbiAgICBjb25zdCBsZWZ0RCA9IHRoaXMuZmluZFdpdGhVcHBlckJvdW5kKGNyZWF0ZUlEKGlkLnVzZXIsIGlkLmNsb2NrIC0gMSkpO1xuICAgIC8vIFJlc2l6ZSBsZWZ0IERTTm9kZSBpZiBuZWNlc3NhcnlcbiAgICBpZiAobGVmdEQgIT09IG51bGwgJiYgbGVmdEQuX2lkLnVzZXIgPT09IGlkLnVzZXIpIHtcbiAgICAgIGlmIChsZWZ0RC5faWQuY2xvY2sgPCBpZC5jbG9jayAmJiBpZC5jbG9jayA8IGxlZnRELl9pZC5jbG9jayArIGxlZnRELmxlbikge1xuICAgICAgICAvLyBub2RlIGlzIG92ZXJsYXBwaW5nLiBuZWVkIHRvIHJlc2l6ZVxuICAgICAgICBpZiAoaWQuY2xvY2sgKyBsZW5ndGgkJDEgPCBsZWZ0RC5faWQuY2xvY2sgKyBsZWZ0RC5sZW4pIHtcbiAgICAgICAgICAvLyBvdmVybGFwcyBuZXcgbWFyayByYW5nZSBhbmQgc29tZSBtb3JlXG4gICAgICAgICAgLy8gY3JlYXRlIGFub3RoZXIgRFNOb2RlIHRvIHRoZSByaWdodCBvZiBuZXcgbWFya1xuICAgICAgICAgIHRoaXMucHV0KG5ldyBEU05vZGUoY3JlYXRlSUQoaWQudXNlciwgaWQuY2xvY2sgKyBsZW5ndGgkJDEpLCBsZWZ0RC5faWQuY2xvY2sgKyBsZWZ0RC5sZW4gLSBpZC5jbG9jayAtIGxlbmd0aCQkMSwgbGVmdEQuZ2MpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXNpemUgbGVmdCBEU05vZGVcbiAgICAgICAgbGVmdEQubGVuID0gaWQuY2xvY2sgLSBsZWZ0RC5faWQuY2xvY2s7XG4gICAgICB9IC8vIE90aGVyd2lzZSB0aGVyZSBpcyBubyBvdmVybGFwcGluZ1xuICAgIH1cbiAgICAvLyBSZXNpemUgcmlnaHQgRFNOb2RlIGlmIG5lY2Vzc2FyeVxuICAgIGNvbnN0IHVwcGVyID0gY3JlYXRlSUQoaWQudXNlciwgaWQuY2xvY2sgKyBsZW5ndGgkJDEgLSAxKTtcbiAgICBjb25zdCByaWdodEQgPSB0aGlzLmZpbmRXaXRoVXBwZXJCb3VuZCh1cHBlcik7XG4gICAgaWYgKHJpZ2h0RCAhPT0gbnVsbCAmJiByaWdodEQuX2lkLnVzZXIgPT09IGlkLnVzZXIpIHtcbiAgICAgIGlmIChyaWdodEQuX2lkLmNsb2NrIDwgaWQuY2xvY2sgKyBsZW5ndGgkJDEgJiYgaWQuY2xvY2sgPD0gcmlnaHRELl9pZC5jbG9jayAmJiBpZC5jbG9jayArIGxlbmd0aCQkMSA8IHJpZ2h0RC5faWQuY2xvY2sgKyByaWdodEQubGVuKSB7IC8vIHdlIG9ubHkgY29uc2lkZXIgdGhlIGNhc2Ugd2hlcmUgd2UgcmVzaXplIHRoZSBub2RlXG4gICAgICAgIGNvbnN0IGQgPSBpZC5jbG9jayArIGxlbmd0aCQkMSAtIHJpZ2h0RC5faWQuY2xvY2s7XG4gICAgICAgIHJpZ2h0RC5faWQgPSBjcmVhdGVJRChyaWdodEQuX2lkLnVzZXIsIHJpZ2h0RC5faWQuY2xvY2sgKyBkKTtcbiAgICAgICAgcmlnaHRELmxlbiAtPSBkO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBOb3cgd2Ugb25seSBoYXZlIHRvIGRlbGV0ZSBhbGwgaW5uZXIgbWFya3NcbiAgICBjb25zdCBkZWxldGVOb2RlSWRzID0gW107XG4gICAgdGhpcy5pdGVyYXRlKGlkLCB1cHBlciwgbSA9PiB7XG4gICAgICBkZWxldGVOb2RlSWRzLnB1c2gobS5faWQpO1xuICAgIH0pO1xuICAgIGZvciAobGV0IGkgPSBkZWxldGVOb2RlSWRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0aGlzLmRlbGV0ZShkZWxldGVOb2RlSWRzW2ldKTtcbiAgICB9XG4gICAgbGV0IG5ld01hcmsgPSBuZXcgRFNOb2RlKGlkLCBsZW5ndGgkJDEsIGdjKTtcbiAgICAvLyBTdGVwIDIuIENoZWNrIGlmIHdlIGNhbiBleHRlbmQgbGVmdCBvciByaWdodFxuICAgIGlmIChsZWZ0RCAhPT0gbnVsbCAmJiBsZWZ0RC5faWQudXNlciA9PT0gaWQudXNlciAmJiBsZWZ0RC5faWQuY2xvY2sgKyBsZWZ0RC5sZW4gPT09IGlkLmNsb2NrICYmIGxlZnRELmdjID09PSBnYykge1xuICAgICAgLy8gV2UgY2FuIGV4dGVuZCBsZWZ0XG4gICAgICBsZWZ0RC5sZW4gKz0gbGVuZ3RoJCQxO1xuICAgICAgbmV3TWFyayA9IGxlZnREO1xuICAgIH1cbiAgICBjb25zdCByaWdodE5leHQgPSB0aGlzLmZpbmQoY3JlYXRlSUQoaWQudXNlciwgaWQuY2xvY2sgKyBsZW5ndGgkJDEpKTtcbiAgICBpZiAocmlnaHROZXh0ICE9PSBudWxsICYmIHJpZ2h0TmV4dC5faWQudXNlciA9PT0gaWQudXNlciAmJiBpZC5jbG9jayArIGxlbmd0aCQkMSA9PT0gcmlnaHROZXh0Ll9pZC5jbG9jayAmJiBnYyA9PT0gcmlnaHROZXh0LmdjKSB7XG4gICAgICAvLyBXZSBjYW4gbWVyZ2UgbmV3TWFyayBhbmQgcmlnaHROZXh0XG4gICAgICBuZXdNYXJrLmxlbiArPSByaWdodE5leHQubGVuO1xuICAgICAgdGhpcy5kZWxldGUocmlnaHROZXh0Ll9pZCk7XG4gICAgfVxuICAgIGlmIChsZWZ0RCAhPT0gbmV3TWFyaykge1xuICAgICAgLy8gb25seSBwdXQgaWYgd2UgZGlkbid0IGV4dGVuZCBsZWZ0XG4gICAgICB0aGlzLnB1dChuZXdNYXJrKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTdHJpbmdpZmllcyBhIG1lc3NhZ2UtZW5jb2RlZCBEZWxldGUgU2V0LlxuICpcbiAqIEBwYXJhbSB7ZGVjb2RpbmcuRGVjb2Rlcn0gZGVjb2RlclxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5jb25zdCBzdHJpbmdpZnlEZWxldGVTdG9yZSA9IChkZWNvZGVyKSA9PiB7XG4gIGxldCBzdHIgPSAnJztcbiAgY29uc3QgZHNMZW5ndGggPSByZWFkVWludDMyKGRlY29kZXIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRzTGVuZ3RoOyBpKyspIHtcbiAgICBzdHIgKz0gJyAtJyArIHJlYWRWYXJVaW50KGRlY29kZXIpICsgJzpcXG4nOyAvLyBkZWNvZGVzIHVzZXJcbiAgICBjb25zdCBkdkxlbmd0aCA9IHJlYWRVaW50MzIoZGVjb2Rlcik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBkdkxlbmd0aDsgaisrKSB7XG4gICAgICBzdHIgKz0gYGNsb2NrOiAke3JlYWRWYXJVaW50KGRlY29kZXIpfSwgbGVuZ3RoOiAke3JlYWRWYXJVaW50KGRlY29kZXIpfSwgZ2M6ICR7cmVhZFVpbnQ4KGRlY29kZXIpID09PSAxfVxcbmA7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHJcbn07XG5cbi8qKlxuICogV3JpdGUgdGhlIERlbGV0ZVNldCBvZiBhIHNoYXJlZCBkb2N1bWVudCB0byBhbiBFbmNvZGVyLlxuICpcbiAqIEBwYXJhbSB7ZW5jb2RpbmcuRW5jb2Rlcn0gZW5jb2RlclxuICogQHBhcmFtIHtEZWxldGVTdG9yZX0gZHNcbiAqL1xuY29uc3Qgd3JpdGVEZWxldGVTdG9yZSA9IChlbmNvZGVyLCBkcykgPT4ge1xuICBsZXQgY3VycmVudFVzZXIgPSBudWxsO1xuICBsZXQgY3VycmVudExlbmd0aDtcbiAgbGV0IGxhc3RMZW5Qb3M7XG4gIGxldCBudW1iZXJPZlVzZXJzID0gMDtcbiAgY29uc3QgbGF0ZXJEU0xlblB1cyA9IGxlbmd0aChlbmNvZGVyKTtcbiAgd3JpdGVVaW50MzIoZW5jb2RlciwgMCk7XG4gIGRzLml0ZXJhdGUobnVsbCwgbnVsbCwgbiA9PiB7XG4gICAgY29uc3QgdXNlciA9IG4uX2lkLnVzZXI7XG4gICAgY29uc3QgY2xvY2sgPSBuLl9pZC5jbG9jaztcbiAgICBjb25zdCBsZW4gPSBuLmxlbjtcbiAgICBjb25zdCBnYyA9IG4uZ2M7XG4gICAgaWYgKGN1cnJlbnRVc2VyICE9PSB1c2VyKSB7XG4gICAgICBudW1iZXJPZlVzZXJzKys7XG4gICAgICAvLyBhIG5ldyB1c2VyIHdhcyBmb3VuZFxuICAgICAgaWYgKGN1cnJlbnRVc2VyICE9PSBudWxsKSB7IC8vIGhhcHBlbnMgb24gZmlyc3QgaXRlcmF0aW9uXG4gICAgICAgIHNldFVpbnQzMihlbmNvZGVyLCBsYXN0TGVuUG9zLCBjdXJyZW50TGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRVc2VyID0gdXNlcjtcbiAgICAgIHdyaXRlVmFyVWludChlbmNvZGVyLCB1c2VyKTtcbiAgICAgIC8vIHBzZXVkby1maWxsIHBvc1xuICAgICAgbGFzdExlblBvcyA9IGxlbmd0aChlbmNvZGVyKTtcbiAgICAgIHdyaXRlVWludDMyKGVuY29kZXIsIDApO1xuICAgICAgY3VycmVudExlbmd0aCA9IDA7XG4gICAgfVxuICAgIHdyaXRlVmFyVWludChlbmNvZGVyLCBjbG9jayk7XG4gICAgd3JpdGVWYXJVaW50KGVuY29kZXIsIGxlbik7XG4gICAgd3JpdGVVaW50OChlbmNvZGVyLCBnYyA/IDEgOiAwKTtcbiAgICBjdXJyZW50TGVuZ3RoKys7XG4gIH0pO1xuICBpZiAoY3VycmVudFVzZXIgIT09IG51bGwpIHsgLy8gaGFwcGVucyBvbiBmaXJzdCBpdGVyYXRpb25cbiAgICBzZXRVaW50MzIoZW5jb2RlciwgbGFzdExlblBvcywgY3VycmVudExlbmd0aCk7XG4gIH1cbiAgc2V0VWludDMyKGVuY29kZXIsIGxhdGVyRFNMZW5QdXMsIG51bWJlck9mVXNlcnMpO1xufTtcblxuLyoqXG4gKiBSZWFkIGRlbGV0ZSBzZXQgZnJvbSBEZWNvZGVyIGFuZCBhcHBseSBpdCB0byBhIHNoYXJlZCBkb2N1bWVudC5cbiAqXG4gKiBAcGFyYW0ge2RlY29kaW5nLkRlY29kZXJ9IGRlY29kZXJcbiAqIEBwYXJhbSB7WX0geVxuICovXG5jb25zdCByZWFkRGVsZXRlU3RvcmUgPSAoZGVjb2RlciwgeSkgPT4ge1xuICBjb25zdCBkc0xlbmd0aCA9IHJlYWRVaW50MzIoZGVjb2Rlcik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZHNMZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHVzZXIgPSByZWFkVmFyVWludChkZWNvZGVyKTtcbiAgICBjb25zdCBkdiA9IFtdO1xuICAgIGNvbnN0IGR2TGVuZ3RoID0gcmVhZFVpbnQzMihkZWNvZGVyKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGR2TGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGZyb20gPSByZWFkVmFyVWludChkZWNvZGVyKTtcbiAgICAgIGNvbnN0IGxlbiA9IHJlYWRWYXJVaW50KGRlY29kZXIpO1xuICAgICAgY29uc3QgZ2MgPSByZWFkVWludDgoZGVjb2RlcikgPT09IDE7XG4gICAgICBkdi5wdXNoKHtmcm9tLCBsZW4sIGdjfSk7XG4gICAgfVxuICAgIGlmIChkdkxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGRlbGV0aW9ucyA9IFtdO1xuICAgICAgbGV0IHBvcyA9IDA7XG4gICAgICBsZXQgZCA9IGR2W3Bvc107XG4gICAgICB5LmRzLml0ZXJhdGUoY3JlYXRlSUQodXNlciwgMCksIGNyZWF0ZUlEKHVzZXIsIE51bWJlci5NQVhfVkFMVUUpLCBuID0+IHtcbiAgICAgICAgLy8gY2FzZXM6XG4gICAgICAgIC8vIDEuIGQgZGVsZXRlcyBzb21ldGhpbmcgdG8gdGhlIHJpZ2h0IG9mIG5cbiAgICAgICAgLy8gID0+IGdvIHRvIG5leHQgbiAoYnJlYWspXG4gICAgICAgIC8vIDIuIGQgZGVsZXRlcyBzb21ldGhpbmcgdG8gdGhlIGxlZnQgb2YgblxuICAgICAgICAvLyAgPT4gY3JlYXRlIGRlbGV0aW9uc1xuICAgICAgICAvLyAgPT4gcmVzZXQgZCBhY2NvcmRpbmdseVxuICAgICAgICAvLyAgKik9PiBpZiBkIGRvZXNuJ3QgZGVsZXRlIGFueXRoaW5nIGFueW1vcmUsIGdvIHRvIG5leHQgZCAoY29udGludWUpXG4gICAgICAgIC8vIDMuIG5vdCAyKSBhbmQgZCBkZWxldGVzIHNvbWV0aGluZyB0aGF0IGFsc28gbiBkZWxldGVzXG4gICAgICAgIC8vICA9PiByZXNldCBkIHNvIHRoYXQgaXQgZG9lc24ndCBjb250YWluIG4ncyBkZWxldGlvblxuICAgICAgICAvLyAgKik9PiBpZiBkIGRvZXMgbm90IGRlbGV0ZSBhbnl0aGluZyBhbnltb3JlLCBnbyB0byBuZXh0IGQgKGNvbnRpbnVlKVxuICAgICAgICB3aGlsZSAoZCAhPSBudWxsKSB7XG4gICAgICAgICAgdmFyIGRpZmYgPSAwOyAvLyBkZXNjcmliZSB0aGUgZGlmZiBvZiBsZW5ndGggaW4gMSkgYW5kIDIpXG4gICAgICAgICAgaWYgKG4uX2lkLmNsb2NrICsgbi5sZW4gPD0gZC5mcm9tKSB7XG4gICAgICAgICAgICAvLyAxKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9IGVsc2UgaWYgKGQuZnJvbSA8IG4uX2lkLmNsb2NrKSB7XG4gICAgICAgICAgICAvLyAyKVxuICAgICAgICAgICAgLy8gZGVsZXRlIG1heGltdW0gdGhlIGxlbiBvZiBkXG4gICAgICAgICAgICAvLyBlbHNlIGRlbGV0ZSBhcyBtdWNoIGFzIHBvc3NpYmxlXG4gICAgICAgICAgICBkaWZmID0gTWF0aC5taW4obi5faWQuY2xvY2sgLSBkLmZyb20sIGQubGVuKTtcbiAgICAgICAgICAgIC8vIGRlbGV0ZUl0ZW1SYW5nZSh5LCB1c2VyLCBkLmZyb20sIGRpZmYsIHRydWUpXG4gICAgICAgICAgICBkZWxldGlvbnMucHVzaChbdXNlciwgZC5mcm9tLCBkaWZmXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIDMpXG4gICAgICAgICAgICBkaWZmID0gbi5faWQuY2xvY2sgKyBuLmxlbiAtIGQuZnJvbTsgLy8gbmV2ZXIgbnVsbCAoc2VlIDEpXG4gICAgICAgICAgICBpZiAoZC5nYyAmJiAhbi5nYykge1xuICAgICAgICAgICAgICAvLyBkIG1hcmtzIGFzIGdjJ2QgYnV0IG4gZG9lcyBub3RcbiAgICAgICAgICAgICAgLy8gdGhlbiBkZWxldGUgZWl0aGVyIHdheVxuICAgICAgICAgICAgICAvLyBkZWxldGVJdGVtUmFuZ2UoeSwgdXNlciwgZC5mcm9tLCBNYXRoLm1pbihkaWZmLCBkLmxlbiksIHRydWUpXG4gICAgICAgICAgICAgIGRlbGV0aW9ucy5wdXNoKFt1c2VyLCBkLmZyb20sIE1hdGgubWluKGRpZmYsIGQubGVuKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZC5sZW4gPD0gZGlmZikge1xuICAgICAgICAgICAgLy8gZCBkb2Vzbid0IGRlbGV0ZSBhbnl0aGluZyBhbnltb3JlXG4gICAgICAgICAgICBkID0gZHZbKytwb3NdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkLmZyb20gPSBkLmZyb20gKyBkaWZmOyAvLyByZXNldCBwb3NcbiAgICAgICAgICAgIGQubGVuID0gZC5sZW4gLSBkaWZmOyAvLyByZXNldCBsZW5ndGhcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gVE9ETzogSXQgd291bGQgYmUgbW9yZSBwZXJmb3JtYW50IHRvIGFwcGx5IHRoZSBkZWxldGVzIGluIHRoZSBhYm92ZSBsb29wXG4gICAgICAvLyBBZGFwdCB0aGUgVHJlZSBpbXBsZW1lbnRhdGlvbiB0byBzdXBwb3J0IGRlbGV0ZSB3aGlsZSBpdGVyYXRpbmdcbiAgICAgIGZvciAobGV0IGkgPSBkZWxldGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgZGVsID0gZGVsZXRpb25zW2ldO1xuICAgICAgICBkZWxldGVJdGVtUmFuZ2UoeSwgZGVsWzBdLCBkZWxbMV0sIGRlbFsyXSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICAvLyBmb3IgdGhlIHJlc3QuLiBqdXN0IGFwcGx5IGl0XG4gICAgICBmb3IgKDsgcG9zIDwgZHYubGVuZ3RoOyBwb3MrKykge1xuICAgICAgICBkID0gZHZbcG9zXTtcbiAgICAgICAgZGVsZXRlSXRlbVJhbmdlKHksIHVzZXIsIGQuZnJvbSwgZC5sZW4sIHRydWUpO1xuICAgICAgICAvLyBkZWxldGlvbnMucHVzaChbdXNlciwgZC5mcm9tLCBkLmxlbiwgZC5nYylcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQG1vZHVsZSB1dGlsc1xuICovXG5cbmNsYXNzIE9wZXJhdGlvblN0b3JlIGV4dGVuZHMgVHJlZSB7XG4gIGNvbnN0cnVjdG9yICh5KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnkgPSB5O1xuICB9XG4gIGxvZ1RhYmxlICgpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIHRoaXMuaXRlcmF0ZShudWxsLCBudWxsLCBpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLmNvbnN0cnVjdG9yID09PSBHQykge1xuICAgICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgICBpZDogc3RyaW5naWZ5SXRlbUlEKGl0ZW0pLFxuICAgICAgICAgIGNvbnRlbnQ6IGl0ZW0uX2xlbmd0aCxcbiAgICAgICAgICBkZWxldGVkOiAnR0MnXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgaWQ6IHN0cmluZ2lmeUl0ZW1JRChpdGVtKSxcbiAgICAgICAgICBvcmlnaW46IGl0ZW0uX29yaWdpbiA9PT0gbnVsbCA/ICcoKScgOiBzdHJpbmdpZnlJRChpdGVtLl9vcmlnaW4uX2xhc3RJZCksXG4gICAgICAgICAgbGVmdDogaXRlbS5fbGVmdCA9PT0gbnVsbCA/ICcoKScgOiBzdHJpbmdpZnlJRChpdGVtLl9sZWZ0Ll9sYXN0SWQpLFxuICAgICAgICAgIHJpZ2h0OiBzdHJpbmdpZnlJdGVtSUQoaXRlbS5fcmlnaHQpLFxuICAgICAgICAgIHJpZ2h0X29yaWdpbjogc3RyaW5naWZ5SXRlbUlEKGl0ZW0uX3JpZ2h0X29yaWdpbiksXG4gICAgICAgICAgcGFyZW50OiBzdHJpbmdpZnlJdGVtSUQoaXRlbS5fcGFyZW50KSxcbiAgICAgICAgICBwYXJlbnRTdWI6IGl0ZW0uX3BhcmVudFN1YixcbiAgICAgICAgICBkZWxldGVkOiBpdGVtLl9kZWxldGVkLFxuICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KGl0ZW0uX2NvbnRlbnQpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnNvbGUudGFibGUoaXRlbXMpO1xuICB9XG4gIGdldCAoaWQpIHtcbiAgICBsZXQgc3RydWN0ID0gdGhpcy5maW5kKGlkKTtcbiAgICBpZiAoc3RydWN0ID09PSBudWxsICYmIGlkIGluc3RhbmNlb2YgUm9vdElEKSB7XG4gICAgICBjb25zdCBDb25zdHIgPSBnZXRTdHJ1Y3QoaWQudHlwZSk7XG4gICAgICBjb25zdCB5ID0gdGhpcy55O1xuICAgICAgc3RydWN0ID0gbmV3IENvbnN0cigpO1xuICAgICAgc3RydWN0Ll9pZCA9IGlkO1xuICAgICAgc3RydWN0Ll9wYXJlbnQgPSB5O1xuICAgICAgeS50cmFuc2FjdCgoKSA9PiB7XG4gICAgICAgIHN0cnVjdC5faW50ZWdyYXRlKHkpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLnB1dChzdHJ1Y3QpO1xuICAgIH1cbiAgICByZXR1cm4gc3RydWN0XG4gIH1cbiAgLy8gVXNlIGdldEl0ZW0gZm9yIHN0cnVjdHMgd2l0aCBfbGVuZ3RoID4gMVxuICBnZXRJdGVtIChpZCkge1xuICAgIHZhciBpdGVtID0gdGhpcy5maW5kV2l0aFVwcGVyQm91bmQoaWQpO1xuICAgIGlmIChpdGVtID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBjb25zdCBpdGVtSUQgPSBpdGVtLl9pZDtcbiAgICBpZiAoaWQudXNlciA9PT0gaXRlbUlELnVzZXIgJiYgaWQuY2xvY2sgPCBpdGVtSUQuY2xvY2sgKyBpdGVtLl9sZW5ndGgpIHtcbiAgICAgIHJldHVybiBpdGVtXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG4gIC8vIFJldHVybiBhbiBpbnNlcnRpb24gc3VjaCB0aGF0IGlkIGlzIHRoZSBmaXJzdCBlbGVtZW50IG9mIGNvbnRlbnRcbiAgLy8gVGhpcyBmdW5jdGlvbiBtYW5pcHVsYXRlcyBhbiBpdGVtLCBpZiBuZWNlc3NhcnlcbiAgZ2V0SXRlbUNsZWFuU3RhcnQgKGlkKSB7XG4gICAgdmFyIGlucyA9IHRoaXMuZ2V0SXRlbShpZCk7XG4gICAgaWYgKGlucyA9PT0gbnVsbCB8fCBpbnMuX2xlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGluc1xuICAgIH1cbiAgICBjb25zdCBpbnNJRCA9IGlucy5faWQ7XG4gICAgaWYgKGluc0lELmNsb2NrID09PSBpZC5jbG9jaykge1xuICAgICAgcmV0dXJuIGluc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaW5zLl9zcGxpdEF0KHRoaXMueSwgaWQuY2xvY2sgLSBpbnNJRC5jbG9jaylcbiAgICB9XG4gIH1cbiAgLy8gUmV0dXJuIGFuIGluc2VydGlvbiBzdWNoIHRoYXQgaWQgaXMgdGhlIGxhc3QgZWxlbWVudCBvZiBjb250ZW50XG4gIC8vIFRoaXMgZnVuY3Rpb24gbWFuaXB1bGF0ZXMgYW4gb3BlcmF0aW9uLCBpZiBuZWNlc3NhcnlcbiAgZ2V0SXRlbUNsZWFuRW5kIChpZCkge1xuICAgIHZhciBpbnMgPSB0aGlzLmdldEl0ZW0oaWQpO1xuICAgIGlmIChpbnMgPT09IG51bGwgfHwgaW5zLl9sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBpbnNcbiAgICB9XG4gICAgY29uc3QgaW5zSUQgPSBpbnMuX2lkO1xuICAgIGlmIChpbnNJRC5jbG9jayArIGlucy5fbGVuZ3RoIC0gMSA9PT0gaWQuY2xvY2spIHtcbiAgICAgIHJldHVybiBpbnNcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zLl9zcGxpdEF0KHRoaXMueSwgaWQuY2xvY2sgLSBpbnNJRC5jbG9jayArIDEpO1xuICAgICAgcmV0dXJuIGluc1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBtb2R1bGUgdXRpbHNcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtNYXA8bnVtYmVyLCBudW1iZXI+fSBTdGF0ZU1hcFxuICovXG5cbi8qKlxuICogUmVhZCBTdGF0ZU1hcCBmcm9tIERlY29kZXIgYW5kIHJldHVybiBhcyBNYXBcbiAqXG4gKiBAcGFyYW0ge2RlY29kaW5nLkRlY29kZXJ9IGRlY29kZXJcbiAqIEByZXR1cm4ge1N0YXRlTWFwfVxuICovXG5jb25zdCByZWFkU3RhdGVNYXAgPSBkZWNvZGVyID0+IHtcbiAgY29uc3Qgc3MgPSBuZXcgTWFwKCk7XG4gIGNvbnN0IHNzTGVuZ3RoID0gcmVhZFVpbnQzMihkZWNvZGVyKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzc0xlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdXNlciA9IHJlYWRWYXJVaW50KGRlY29kZXIpO1xuICAgIGNvbnN0IGNsb2NrID0gcmVhZFZhclVpbnQoZGVjb2Rlcik7XG4gICAgc3Muc2V0KHVzZXIsIGNsb2NrKTtcbiAgfVxuICByZXR1cm4gc3Ncbn07XG5cbi8qKlxuICogV3JpdGUgU3RhdGVNYXAgdG8gRW5jb2RlclxuICpcbiAqIEBwYXJhbSB7ZW5jb2RpbmcuRW5jb2Rlcn0gZW5jb2RlclxuICogQHBhcmFtIHtTdGF0ZU1hcH0gc3RhdGVcbiAqL1xuY29uc3Qgd3JpdGVTdGF0ZU1hcCA9IChlbmNvZGVyLCBzdGF0ZSkgPT4ge1xuICAvLyB3cml0ZSBhcyBmaXhlZC1zaXplIG51bWJlciB0byBzdGF5IGNvbnNpc3RlbnQgd2l0aCB0aGUgb3RoZXIgZW5jb2RlIGZ1bmN0aW9ucy5cbiAgLy8gPT4gYW55dGltZSB3ZSB3cml0ZSB0aGUgbnVtYmVyIG9mIG9iamVjdHMgdGhhdCBmb2xsb3csIGVuY29kZSBhcyBmaXhlZC1zaXplIG51bWJlci5cbiAgd3JpdGVVaW50MzIoZW5jb2Rlciwgc3RhdGUuc2l6ZSk7XG4gIHN0YXRlLmZvckVhY2goKGNsb2NrLCB1c2VyKSA9PiB7XG4gICAgd3JpdGVWYXJVaW50KGVuY29kZXIsIHVzZXIpO1xuICAgIHdyaXRlVmFyVWludChlbmNvZGVyLCBjbG9jayk7XG4gIH0pO1xufTtcblxuLyoqXG4gKi9cbmNsYXNzIFN0YXRlU3RvcmUge1xuICBjb25zdHJ1Y3RvciAoeSkge1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5zdGF0ZSA9IG5ldyBNYXAoKTtcbiAgfVxuICBsb2dUYWJsZSAoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IFtdO1xuICAgIGZvciAobGV0IFt1c2VyLCBzdGF0ZV0gb2YgdGhpcy5zdGF0ZSkge1xuICAgICAgZW50cmllcy5wdXNoKHtcbiAgICAgICAgdXNlciwgc3RhdGVcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLnRhYmxlKGVudHJpZXMpO1xuICB9XG4gIGdldE5leHRJRCAobGVuKSB7XG4gICAgY29uc3QgdXNlciA9IHRoaXMueS51c2VySUQ7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKHVzZXIpO1xuICAgIHRoaXMuc2V0U3RhdGUodXNlciwgc3RhdGUgKyBsZW4pO1xuICAgIHJldHVybiBjcmVhdGVJRCh1c2VyLCBzdGF0ZSlcbiAgfVxuICB1cGRhdGVSZW1vdGVTdGF0ZSAoc3RydWN0KSB7XG4gICAgbGV0IHVzZXIgPSBzdHJ1Y3QuX2lkLnVzZXI7XG4gICAgbGV0IHVzZXJTdGF0ZSA9IHRoaXMuc3RhdGUuZ2V0KHVzZXIpO1xuICAgIHdoaWxlIChzdHJ1Y3QgIT09IG51bGwgJiYgc3RydWN0Ll9pZC5jbG9jayA9PT0gdXNlclN0YXRlKSB7XG4gICAgICB1c2VyU3RhdGUgKz0gc3RydWN0Ll9sZW5ndGg7XG4gICAgICBzdHJ1Y3QgPSB0aGlzLnkub3MuZ2V0KGNyZWF0ZUlEKHVzZXIsIHVzZXJTdGF0ZSkpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlLnNldCh1c2VyLCB1c2VyU3RhdGUpO1xuICB9XG4gIGdldFN0YXRlICh1c2VyKSB7XG4gICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZS5nZXQodXNlcik7XG4gICAgaWYgKHN0YXRlID09IG51bGwpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuICAgIHJldHVybiBzdGF0ZVxuICB9XG4gIHNldFN0YXRlICh1c2VyLCBzdGF0ZSkge1xuICAgIC8vIFRPRE86IG1vZGlmeSBtaXNzaW5naSBzdHJ1Y3RzIGhlcmVcbiAgICBjb25zdCBiZWZvcmVTdGF0ZSA9IHRoaXMueS5fdHJhbnNhY3Rpb24uYmVmb3JlU3RhdGU7XG4gICAgaWYgKCFiZWZvcmVTdGF0ZS5oYXModXNlcikpIHtcbiAgICAgIGJlZm9yZVN0YXRlLnNldCh1c2VyLCB0aGlzLmdldFN0YXRlKHVzZXIpKTtcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5zZXQodXNlciwgc3RhdGUpO1xuICB9XG59XG5cbi8qKlxuICogQG1vZHVsZSB1dGlsc1xuICovXG5cbi8qIGdsb2JhbCBjcnlwdG8gKi9cblxuY29uc3QgZ2VuZXJhdGVSYW5kb21VaW50MzIgPSAoKSA9PiB7XG4gIGlmICh0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICE9IG51bGwpIHtcbiAgICAvLyBicm93c2VyXG4gICAgbGV0IGFyciA9IG5ldyBVaW50MzJBcnJheSgxKTtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKGFycik7XG4gICAgcmV0dXJuIGFyclswXVxuICB9IGVsc2UgaWYgKHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21CeXRlcyAhPSBudWxsKSB7XG4gICAgLy8gbm9kZVxuICAgIGxldCBidWYgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoNCk7XG4gICAgcmV0dXJuIG5ldyBVaW50MzJBcnJheShidWYuYnVmZmVyKVswXVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDB4RkZGRkZGRkYpXG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlcyBuYW1lZCBldmVudHMuXG4gKi9cbmNsYXNzIE5hbWVkRXZlbnRIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX2V2ZW50TGlzdGVuZXIgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5fc3RhdGVMaXN0ZW5lciA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBSZXR1cm5zIGFsbCBsaXN0ZW5lcnMgdGhhdCBsaXN0ZW4gdG8gYSBzcGVjaWZpZWQgbmFtZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIHF1ZXJ5IGV2ZW50IG5hbWUuXG4gICAqL1xuICBfZ2V0TGlzdGVuZXIgKG5hbWUpIHtcbiAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRMaXN0ZW5lci5nZXQobmFtZSk7XG4gICAgaWYgKGxpc3RlbmVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsaXN0ZW5lcnMgPSB7XG4gICAgICAgIG9uY2U6IG5ldyBTZXQoKSxcbiAgICAgICAgb246IG5ldyBTZXQoKVxuICAgICAgfTtcbiAgICAgIHRoaXMuX2V2ZW50TGlzdGVuZXIuc2V0KG5hbWUsIGxpc3RlbmVycyk7XG4gICAgfVxuICAgIHJldHVybiBsaXN0ZW5lcnNcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmFtZWQgZXZlbnQgbGlzdGVuZXIuIFRoZSBsaXN0ZW5lciBpcyByZW1vdmVkIGFmdGVyIGl0IGhhcyBiZWVuXG4gICAqIGNhbGxlZCBvbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgZXZlbnQgbmFtZSB0byBsaXN0ZW4gdG8uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGYgVGhlIGZ1bmN0aW9uIHRoYXQgaXMgZXhlY3V0ZWQgd2hlbiB0aGUgZXZlbnQgaXMgZmlyZWQuXG4gICAqL1xuICBvbmNlIChuYW1lLCBmKSB7XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVyKG5hbWUpO1xuICAgIGxpc3RlbmVycy5vbmNlLmFkZChmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbmFtZWQgZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBldmVudCBuYW1lIHRvIGxpc3RlbiB0by5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZiBUaGUgZnVuY3Rpb24gdGhhdCBpcyBleGVjdXRlZCB3aGVuIHRoZSBldmVudCBpcyBmaXJlZC5cbiAgICovXG4gIG9uIChuYW1lLCBmKSB7XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVyKG5hbWUpO1xuICAgIGxpc3RlbmVycy5vbi5hZGQoZik7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogSW5pdCB0aGUgc2F2ZWQgc3RhdGUgZm9yIGFuIGV2ZW50IG5hbWUuXG4gICAqL1xuICBfaW5pdFN0YXRlTGlzdGVuZXIgKG5hbWUpIHtcbiAgICBsZXQgc3RhdGUgPSB0aGlzLl9zdGF0ZUxpc3RlbmVyLmdldChuYW1lKTtcbiAgICBpZiAoc3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgc3RhdGUgPSB7fTtcbiAgICAgIHN0YXRlLnByb21pc2UgPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgc3RhdGUucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3N0YXRlTGlzdGVuZXIuc2V0KG5hbWUsIHN0YXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCB3aGVuIHRoZSBldmVudCBuYW1lIGlzIGNhbGxlZC5cbiAgICogVGhlIFByb21pc2UgaXMgaW1tZWRpYXRlbHkgcmVzb2x2ZWQgd2hlbiB0aGUgZXZlbnQgbmFtZSB3YXMgY2FsbGVkIGluIHRoZVxuICAgKiBwYXN0LlxuICAgKi9cbiAgd2hlbiAobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9pbml0U3RhdGVMaXN0ZW5lcihuYW1lKS5wcm9taXNlXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgd2FzIHJlZ2lzdGVyZWQgd2l0aCBlaXRoZXJcbiAgICoge0BsaW5rIEV2ZW50SGFuZGxlciNvbn0gb3Ige0BsaW5rIEV2ZW50SGFuZGxlciNvbmNlfS5cbiAgICovXG4gIG9mZiAobmFtZSwgZikge1xuICAgIGlmIChuYW1lID09IG51bGwgfHwgZiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgZXZlbnQgbmFtZSBhbmQgZnVuY3Rpb24hJylcbiAgICB9XG4gICAgY29uc3QgbGlzdGVuZXIgPSB0aGlzLl9ldmVudExpc3RlbmVyLmdldChuYW1lKTtcbiAgICBpZiAobGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGlzdGVuZXIub24uZGVsZXRlKGYpO1xuICAgICAgbGlzdGVuZXIub25jZS5kZWxldGUoZik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXQgYSBuYW1lZCBldmVudC4gQWxsIHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXJzIHRoYXQgbGlzdGVuIHRvIHRoZVxuICAgKiBzcGVjaWZpZWQgbmFtZSB3aWxsIHJlY2VpdmUgdGhlIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgZXZlbnQgbmFtZS5cbiAgICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRoYXQgYXJlIGFwcGxpZWQgdG8gdGhlIGV2ZW50IGxpc3RlbmVyLlxuICAgKi9cbiAgZW1pdCAobmFtZSwgLi4uYXJncykge1xuICAgIHRoaXMuX2luaXRTdGF0ZUxpc3RlbmVyKG5hbWUpLnJlc29sdmUoKTtcbiAgICBjb25zdCBsaXN0ZW5lciA9IHRoaXMuX2V2ZW50TGlzdGVuZXIuZ2V0KG5hbWUpO1xuICAgIGlmIChsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsaXN0ZW5lci5vbi5mb3JFYWNoKGYgPT4gZi5hcHBseShudWxsLCBhcmdzKSk7XG4gICAgICBsaXN0ZW5lci5vbmNlLmZvckVhY2goZiA9PiBmLmFwcGx5KG51bGwsIGFyZ3MpKTtcbiAgICAgIGxpc3RlbmVyLm9uY2UgPSBuZXcgU2V0KCk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAnZXJyb3InKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGFyZ3NbMF0pO1xuICAgIH1cbiAgfVxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9ldmVudExpc3RlbmVyID0gbnVsbDtcbiAgfVxufVxuXG4vKipcbiAqIEBtb2R1bGUgdXRpbHNcbiAqL1xuXG4vKipcbiAqIEdlbmVyYWwgZXZlbnQgaGFuZGxlciBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUbyBwcmV2ZW50IG1lbW9yeSBsZWFrcywgY2FsbCB0aGlzIG1ldGhvZCB3aGVuIHRoZSBldmVudExpc3RlbmVycyB3b24ndCBiZVxuICAgKiB1c2VkIGFueW1vcmUuXG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgaXMgY2FsbGVkIHdoZW5cbiAgICoge0BsaW5rIEV2ZW50SGFuZGxlciNjYWxsRXZlbnRMaXN0ZW5lcnN9IGlzIGNhbGxlZC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZiBUaGUgZXZlbnQgaGFuZGxlci5cbiAgICovXG4gIGFkZEV2ZW50TGlzdGVuZXIgKGYpIHtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzLnB1c2goZik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZiBUaGUgZXZlbnQgaGFuZGxlciB0aGF0IHdhcyBhZGRlZCB3aXRoXG4gICAqICAgICAgICAgICAgICAgICAgICAge0BsaW5rIEV2ZW50SGFuZGxlciNhZGRFdmVudExpc3RlbmVyfVxuICAgKi9cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAoZikge1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLmZpbHRlcihnID0+IGYgIT09IGcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGV2ZW50IGxpc3RlbmVycy5cbiAgICovXG4gIHJlbW92ZUFsbEV2ZW50TGlzdGVuZXJzICgpIHtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQ2FsbCBhbGwgZXZlbnQgbGlzdGVuZXJzIHRoYXQgd2VyZSBhZGRlZCB2aWFcbiAgICoge0BsaW5rIEV2ZW50SGFuZGxlciNhZGRFdmVudExpc3RlbmVyfS5cbiAgICpcbiAgICogQHBhcmFtIHtUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb24gVGhlIHRyYW5zYWN0aW9uIG9iamVjdFxuICAgKiBAcGFyYW0ge1lFdmVudH0gZXZlbnQgQW4gZXZlbnQgb2JqZWN0IHRoYXQgZGVzY3JpYmVzIHRoZSBjaGFuZ2Ugb24gYSB0eXBlLlxuICAgKi9cbiAgY2FsbEV2ZW50TGlzdGVuZXJzICh0cmFuc2FjdGlvbiwgZXZlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRMaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGYgPSB0aGlzLmV2ZW50TGlzdGVuZXJzW2ldO1xuICAgICAgICBmKGV2ZW50LCB0cmFuc2FjdGlvbik7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgWW91ciBvYnNlcnZlciB0aHJldyBhbiBlcnJvci4gVGhpcyBlcnJvciB3YXMgY2F1Z2h0IHNvIHRoYXQgWWpzXG4gICAgICAgICAgY2FuIGVuc3VyZSBkYXRhIGNvbnNpc3RlbmN5ISBJbiBvcmRlciB0byBkZWJ1ZyB0aGlzIGVycm9yIHlvdVxuICAgICAgICAgIGhhdmUgdG8gY2hlY2sgXCJQYXVzZSBPbiBDYXVnaHQgRXhjZXB0aW9uc1wiIGluIGRldmVsb3BlciB0b29scy5cbiAgICAgICAgKi9cbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAbW9kdWxlIHV0aWxzXG4gKi9cblxuLyoqXG4gKiBZRXZlbnQgZGVzY3JpYmVzIHRoZSBjaGFuZ2VzIG9uIGEgWVR5cGUuXG4gKi9cbmNsYXNzIFlFdmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1R5cGV9IHRhcmdldCBUaGUgY2hhbmdlZCB0eXBlLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKHRhcmdldCkge1xuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9uIHdoaWNoIHRoaXMgZXZlbnQgd2FzIGNyZWF0ZWQgb24uXG4gICAgICogQHR5cGUge1R5cGV9XG4gICAgICovXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgdGFyZ2V0IG9uIHdoaWNoIHRoZSBvYnNlcnZlIGNhbGxiYWNrIGlzIGNhbGxlZC5cbiAgICAgKiBAdHlwZSB7VHlwZX1cbiAgICAgKi9cbiAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIHBhdGggZnJvbSBgeWAgdG8gdGhlIGNoYW5nZWQgdHlwZS5cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBwcm9wZXJ0eSBob2xkczpcbiAgICogQGV4YW1wbGVcbiAgICogICBsZXQgdHlwZSA9IHlcbiAgICogICBldmVudC5wYXRoLmZvckVhY2goZGlyID0+IHtcbiAgICogICAgIHR5cGUgPSB0eXBlLmdldChkaXIpXG4gICAqICAgfSlcbiAgICogICB0eXBlID09PSBldmVudC50YXJnZXQgLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZ2V0IHBhdGggKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRUYXJnZXQuZ2V0UGF0aFRvKHRoaXMudGFyZ2V0KVxuICB9XG59XG5cbi8qKlxuICogQG1vZHVsZSBzdHJ1Y3RzXG4gKi9cblxuLy8gcmVzdHJ1Y3R1cmUgY2hpbGRyZW4gYXMgaWYgdGhleSB3ZXJlIGluc2VydGVkIG9uZSBhZnRlciBhbm90aGVyXG5jb25zdCBpbnRlZ3JhdGVDaGlsZHJlbiA9ICh5LCBzdGFydCkgPT4ge1xuICBsZXQgcmlnaHQ7XG4gIGRvIHtcbiAgICByaWdodCA9IHN0YXJ0Ll9yaWdodDtcbiAgICBzdGFydC5fcmlnaHQgPSBudWxsO1xuICAgIHN0YXJ0Ll9yaWdodF9vcmlnaW4gPSBudWxsO1xuICAgIHN0YXJ0Ll9vcmlnaW4gPSBzdGFydC5fbGVmdDtcbiAgICBzdGFydC5faW50ZWdyYXRlKHkpO1xuICAgIHN0YXJ0ID0gcmlnaHQ7XG4gIH0gd2hpbGUgKHJpZ2h0ICE9PSBudWxsKVxufTtcblxuY29uc3QgZ2NDaGlsZHJlbiA9ICh5LCBpdGVtKSA9PiB7XG4gIHdoaWxlIChpdGVtICE9PSBudWxsKSB7XG4gICAgaXRlbS5fZGVsZXRlKHksIGZhbHNlLCB0cnVlKTtcbiAgICBpdGVtLl9nYyh5KTtcbiAgICBpdGVtID0gaXRlbS5fcmlnaHQ7XG4gIH1cbn07XG5cbi8qKlxuICogQWJzdHJhY3QgWWpzIFR5cGUgY2xhc3NcbiAqL1xuY2xhc3MgVHlwZSBleHRlbmRzIEl0ZW0ge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5fc3RhcnQgPSBudWxsO1xuICAgIHRoaXMuX3kgPSBudWxsO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9kZWVwRXZlbnRIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmaXJzdCBub24tZGVsZXRlZCBpdGVtXG4gICAqL1xuICBnZXQgX2ZpcnN0ICgpIHtcbiAgICBsZXQgbiA9IHRoaXMuX3N0YXJ0O1xuICAgIHdoaWxlIChuICE9PSBudWxsICYmIG4uX2RlbGV0ZWQpIHtcbiAgICAgIG4gPSBuLl9yaWdodDtcbiAgICB9XG4gICAgcmV0dXJuIG5cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlIHRoZSBwYXRoIGZyb20gdGhpcyB0eXBlIHRvIHRoZSBzcGVjaWZpZWQgdGFyZ2V0LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBJdCBzaG91bGQgYmUgYWNjZXNzaWJsZSB2aWEgYHRoaXMuZ2V0KHJlc3VsdFswXSkuZ2V0KHJlc3VsdFsxXSkuLmBcbiAgICogY29uc3QgcGF0aCA9IHR5cGUuZ2V0UGF0aFRvKGNoaWxkKVxuICAgKiAvLyBhc3N1bWluZyBgdHlwZSBpbnN0YW5jZW9mIFlBcnJheWBcbiAgICogY29uc29sZS5sb2cocGF0aCkgLy8gbWlnaHQgbG9vayBsaWtlID0+IFsyLCAna2V5MSddXG4gICAqIGNoaWxkID09PSB0eXBlLmdldChwYXRoWzBdKS5nZXQocGF0aFsxXSlcbiAgICpcbiAgICogQHBhcmFtIHtUeXBlIHwgWSB8IGFueX0gdHlwZSBUeXBlIHRhcmdldFxuICAgKiBAcmV0dXJuIHtBcnJheTxzdHJpbmc+fSBQYXRoIHRvIHRoZSB0YXJnZXRcbiAgICovXG4gIGdldFBhdGhUbyAodHlwZSkge1xuICAgIGlmICh0eXBlID09PSB0aGlzKSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gICAgY29uc3QgcGF0aCA9IFtdO1xuICAgIGNvbnN0IHkgPSB0aGlzLl95O1xuICAgIHdoaWxlICh0eXBlICE9PSB0aGlzICYmIHR5cGUgIT09IHkpIHtcbiAgICAgIGxldCBwYXJlbnQgPSB0eXBlLl9wYXJlbnQ7XG4gICAgICBpZiAodHlwZS5fcGFyZW50U3ViICE9PSBudWxsKSB7XG4gICAgICAgIHBhdGgudW5zaGlmdCh0eXBlLl9wYXJlbnRTdWIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcGFyZW50IGlzIGFycmF5LWlzaFxuICAgICAgICBmb3IgKGxldCBbaSwgY2hpbGRdIG9mIHBhcmVudCkge1xuICAgICAgICAgIGlmIChjaGlsZCA9PT0gdHlwZSkge1xuICAgICAgICAgICAgcGF0aC51bnNoaWZ0KGkpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHR5cGUgPSBwYXJlbnQ7XG4gICAgfVxuICAgIGlmICh0eXBlICE9PSB0aGlzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB0eXBlIGlzIG5vdCBhIGNoaWxkIG9mIHRoaXMgbm9kZScpXG4gICAgfVxuICAgIHJldHVybiBwYXRoXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBZQXJyYXkgRXZlbnQgYW5kIGNhbGxzIG9ic2VydmVycy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jYWxsT2JzZXJ2ZXIgKHRyYW5zYWN0aW9uLCBwYXJlbnRTdWJzLCByZW1vdGUpIHtcbiAgICB0aGlzLl9jYWxsRXZlbnRIYW5kbGVyKHRyYW5zYWN0aW9uLCBuZXcgWUV2ZW50KHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIGV2ZW50IGxpc3RlbmVycyB3aXRoIGFuIGV2ZW50LiBUaGlzIHdpbGwgYWxzbyBhZGQgYW4gZXZlbnQgdG8gYWxsXG4gICAqIHBhcmVudHMgKGZvciBgLm9ic2VydmVEZWVwYCBoYW5kbGVycykuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2FsbEV2ZW50SGFuZGxlciAodHJhbnNhY3Rpb24sIGV2ZW50KSB7XG4gICAgY29uc3QgY2hhbmdlZFBhcmVudFR5cGVzID0gdHJhbnNhY3Rpb24uY2hhbmdlZFBhcmVudFR5cGVzO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5jYWxsRXZlbnRMaXN0ZW5lcnModHJhbnNhY3Rpb24sIGV2ZW50KTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7YW55fVxuICAgICAqL1xuICAgIGxldCB0eXBlID0gdGhpcztcbiAgICB3aGlsZSAodHlwZSAhPT0gdGhpcy5feSkge1xuICAgICAgbGV0IGV2ZW50cyA9IGNoYW5nZWRQYXJlbnRUeXBlcy5nZXQodHlwZSk7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZXZlbnRzID0gW107XG4gICAgICAgIGNoYW5nZWRQYXJlbnRUeXBlcy5zZXQodHlwZSwgZXZlbnRzKTtcbiAgICAgIH1cbiAgICAgIGV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgIHR5cGUgPSB0eXBlLl9wYXJlbnQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdG8gdHJhbnNhY3QgaWYgdGhlIHkgaW5zdGFuY2UgaXMgYXZhaWxhYmxlLlxuICAgKlxuICAgKiBUT0RPOiBDdXJyZW50bHkgZXZlbnQgaGFuZGxlcnMgYXJlIG5vdCB0aHJvd24gd2hlbiBhIHR5cGUgaXMgbm90IHJlZ2lzdGVyZWRcbiAgICogICAgICAgd2l0aCBhIFlqcyBpbnN0YW5jZS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF90cmFuc2FjdCAoZikge1xuICAgIGNvbnN0IHkgPSB0aGlzLl95O1xuICAgIGlmICh5ICE9PSBudWxsKSB7XG4gICAgICB5LnRyYW5zYWN0KGYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmKHkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPYnNlcnZlIGFsbCBldmVudHMgdGhhdCBhcmUgY3JlYXRlZCBvbiB0aGlzIHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGYgT2JzZXJ2ZXIgZnVuY3Rpb25cbiAgICovXG4gIG9ic2VydmUgKGYpIHtcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIuYWRkRXZlbnRMaXN0ZW5lcihmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPYnNlcnZlIGFsbCBldmVudHMgdGhhdCBhcmUgY3JlYXRlZCBieSB0aGlzIHR5cGUgYW5kIGl0cyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZiBPYnNlcnZlciBmdW5jdGlvblxuICAgKi9cbiAgb2JzZXJ2ZURlZXAgKGYpIHtcbiAgICB0aGlzLl9kZWVwRXZlbnRIYW5kbGVyLmFkZEV2ZW50TGlzdGVuZXIoZik7XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBhbiBvYnNlcnZlciBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZiBPYnNlcnZlciBmdW5jdGlvblxuICAgKi9cbiAgdW5vYnNlcnZlIChmKSB7XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZik7XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBhbiBvYnNlcnZlciBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZiBPYnNlcnZlciBmdW5jdGlvblxuICAgKi9cbiAgdW5vYnNlcnZlRGVlcCAoZikge1xuICAgIHRoaXMuX2RlZXBFdmVudEhhbmRsZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlZ3JhdGUgdGhpcyB0eXBlIGludG8gdGhlIFlqcyBpbnN0YW5jZS5cbiAgICpcbiAgICogKiBTYXZlIHRoaXMgc3RydWN0IGluIHRoZSBvc1xuICAgKiAqIFRoaXMgdHlwZSBpcyBzZW50IHRvIG90aGVyIGNsaWVudFxuICAgKiAqIE9ic2VydmVyIGZ1bmN0aW9ucyBhcmUgZmlyZWRcbiAgICpcbiAgICogQHBhcmFtIHtZfSB5IFRoZSBZanMgaW5zdGFuY2VcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pbnRlZ3JhdGUgKHkpIHtcbiAgICBzdXBlci5faW50ZWdyYXRlKHkpO1xuICAgIHRoaXMuX3kgPSB5O1xuICAgIC8vIHdoZW4gaW50ZWdyYXRpbmcgY2hpbGRyZW4gd2UgbXVzdCBtYWtlIHN1cmUgdG9cbiAgICAvLyBpbnRlZ3JhdGUgc3RhcnRcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuX3N0YXJ0O1xuICAgIGlmIChzdGFydCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fc3RhcnQgPSBudWxsO1xuICAgICAgaW50ZWdyYXRlQ2hpbGRyZW4oeSwgc3RhcnQpO1xuICAgIH1cbiAgICAvLyBpbnRlZ3JhdGUgbWFwIGNoaWxkcmVuX2ludGVncmF0ZVxuICAgIGNvbnN0IG1hcCA9IHRoaXMuX21hcDtcbiAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKCk7XG4gICAgZm9yIChsZXQgdCBvZiBtYXAudmFsdWVzKCkpIHtcbiAgICAgIC8vIFRPRE8gbWFrZSBzdXJlIHRoYXQgcmlnaHQgZWxlbWVudHMgYXJlIGRlbGV0ZWQhXG4gICAgICBpbnRlZ3JhdGVDaGlsZHJlbih5LCB0KTtcbiAgICB9XG4gIH1cblxuICBfZ2NDaGlsZHJlbiAoeSkge1xuICAgIGdjQ2hpbGRyZW4oeSwgdGhpcy5fc3RhcnQpO1xuICAgIHRoaXMuX3N0YXJ0ID0gbnVsbDtcbiAgICB0aGlzLl9tYXAuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGdjQ2hpbGRyZW4oeSwgaXRlbSk7XG4gICAgfSk7XG4gICAgdGhpcy5fbWFwID0gbmV3IE1hcCgpO1xuICB9XG5cbiAgX2djICh5KSB7XG4gICAgdGhpcy5fZ2NDaGlsZHJlbih5KTtcbiAgICBzdXBlci5fZ2MoeSk7XG4gIH1cblxuICAvKipcbiAgICogQGFic3RyYWN0XG4gICAqIEByZXR1cm4ge09iamVjdCB8IEFycmF5IHwgbnVtYmVyIHwgc3RyaW5nfVxuICAgKi9cbiAgdG9KU09OICgpIHt9XG5cbiAgLyoqXG4gICAqIE1hcmsgdGhpcyBJdGVtIGFzIGRlbGV0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7WX0geSBUaGUgWWpzIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gY3JlYXRlRGVsZXRlIFdoZXRoZXIgdG8gcHJvcGFnYXRlIGEgbWVzc2FnZSB0aGF0IHRoaXNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwZSB3YXMgZGVsZXRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBbZ2NDaGlsZHJlbj0oeS5faGFzVW5kb01hbmFnZXI9PT1mYWxzZSldIFdoZXRoZXIgdG8gZ2FyYmFnZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVjdCB0aGUgY2hpbGRyZW4gb2YgdGhpcyB0eXBlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2RlbGV0ZSAoeSwgY3JlYXRlRGVsZXRlLCBnY0NoaWxkcmVuKSB7XG4gICAgaWYgKGdjQ2hpbGRyZW4gPT09IHVuZGVmaW5lZCB8fCAheS5nY0VuYWJsZWQpIHtcbiAgICAgIGdjQ2hpbGRyZW4gPSB5Ll9oYXNVbmRvTWFuYWdlciA9PT0gZmFsc2UgJiYgeS5nY0VuYWJsZWQ7XG4gICAgfVxuICAgIHN1cGVyLl9kZWxldGUoeSwgY3JlYXRlRGVsZXRlLCBnY0NoaWxkcmVuKTtcbiAgICB5Ll90cmFuc2FjdGlvbi5jaGFuZ2VkVHlwZXMuZGVsZXRlKHRoaXMpO1xuICAgIC8vIGRlbGV0ZSBtYXAgdHlwZXNcbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLl9tYXAudmFsdWVzKCkpIHtcbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEl0ZW0gJiYgIXZhbHVlLl9kZWxldGVkKSB7XG4gICAgICAgIHZhbHVlLl9kZWxldGUoeSwgZmFsc2UsIGdjQ2hpbGRyZW4pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBkZWxldGUgYXJyYXkgdHlwZXNcbiAgICBsZXQgdCA9IHRoaXMuX3N0YXJ0O1xuICAgIHdoaWxlICh0ICE9PSBudWxsKSB7XG4gICAgICBpZiAoIXQuX2RlbGV0ZWQpIHtcbiAgICAgICAgdC5fZGVsZXRlKHksIGZhbHNlLCBnY0NoaWxkcmVuKTtcbiAgICAgIH1cbiAgICAgIHQgPSB0Ll9yaWdodDtcbiAgICB9XG4gICAgaWYgKGdjQ2hpbGRyZW4pIHtcbiAgICAgIHRoaXMuX2djQ2hpbGRyZW4oeSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQG1vZHVsZSB1dGlsc1xuICovXG4vKipcbiAqIEEgdHJhbnNhY3Rpb24gaXMgY3JlYXRlZCBmb3IgZXZlcnkgY2hhbmdlIG9uIHRoZSBZanMgbW9kZWwuIEl0IGlzIHBvc3NpYmxlXG4gKiB0byBidW5kbGUgY2hhbmdlcyBvbiB0aGUgWWpzIG1vZGVsIGluIGEgc2luZ2xlIHRyYW5zYWN0aW9uIHRvXG4gKiBtaW5pbWl6ZSB0aGUgbnVtYmVyIG9uIG1lc3NhZ2VzIHNlbnQgYW5kIHRoZSBudW1iZXIgb2Ygb2JzZXJ2ZXIgY2FsbHMuXG4gKiBJZiBwb3NzaWJsZSB0aGUgdXNlciBvZiB0aGlzIGxpYnJhcnkgc2hvdWxkIGJ1bmRsZSBhcyBtYW55IGNoYW5nZXMgYXNcbiAqIHBvc3NpYmxlLiBIZXJlIGlzIGFuIGV4YW1wbGUgdG8gaWxsdXN0cmF0ZSB0aGUgYWR2YW50YWdlcyBvZiBidW5kbGluZzpcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgbWFwID0geS5kZWZpbmUoJ21hcCcsIFlNYXApXG4gKiAvLyBMb2cgY29udGVudCB3aGVuIGNoYW5nZSBpcyB0cmlnZ2VyZWRcbiAqIG1hcC5vYnNlcnZlKCgpID0+IHtcbiAqICAgY29uc29sZS5sb2coJ2NoYW5nZSB0cmlnZ2VyZWQnKVxuICogfSlcbiAqIC8vIEVhY2ggY2hhbmdlIG9uIHRoZSBtYXAgdHlwZSB0cmlnZ2VycyBhIGxvZyBtZXNzYWdlOlxuICogbWFwLnNldCgnYScsIDApIC8vID0+IFwiY2hhbmdlIHRyaWdnZXJlZFwiXG4gKiBtYXAuc2V0KCdiJywgMCkgLy8gPT4gXCJjaGFuZ2UgdHJpZ2dlcmVkXCJcbiAqIC8vIFdoZW4gcHV0IGluIGEgdHJhbnNhY3Rpb24sIGl0IHdpbGwgdHJpZ2dlciB0aGUgbG9nIGFmdGVyIHRoZSB0cmFuc2FjdGlvbjpcbiAqIHkudHJhbnNhY3QoKCkgPT4ge1xuICogICBtYXAuc2V0KCdhJywgMSlcbiAqICAgbWFwLnNldCgnYicsIDEpXG4gKiB9KSAvLyA9PiBcImNoYW5nZSB0cmlnZ2VyZWRcIlxuICpcbiAqL1xuY2xhc3MgVHJhbnNhY3Rpb24ge1xuICBjb25zdHJ1Y3RvciAoeSkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtZfSBUaGUgWWpzIGluc3RhbmNlLlxuICAgICAqL1xuICAgIHRoaXMueSA9IHk7XG4gICAgLyoqXG4gICAgICogQWxsIG5ldyB0eXBlcyB0aGF0IGFyZSBhZGRlZCBkdXJpbmcgYSB0cmFuc2FjdGlvbi5cbiAgICAgKiBAdHlwZSB7U2V0PEl0ZW0+fVxuICAgICAqL1xuICAgIHRoaXMubmV3VHlwZXMgPSBuZXcgU2V0KCk7XG4gICAgLyoqXG4gICAgICogQWxsIHR5cGVzIHRoYXQgd2VyZSBkaXJlY3RseSBtb2RpZmllZCAocHJvcGVydHkgYWRkZWQgb3IgY2hpbGRcbiAgICAgKiBpbnNlcnRlZC9kZWxldGVkKS4gTmV3IHR5cGVzIGFyZSBub3QgaW5jbHVkZWQgaW4gdGhpcyBTZXQuXG4gICAgICogTWFwcyBmcm9tIHR5cGUgdG8gcGFyZW50U3VicyAoYGl0ZW0uX3BhcmVudFN1YiA9IG51bGxgIGZvciBZQXJyYXkpXG4gICAgICogQHR5cGUge01hcDxUeXBlfFksU3RyaW5nPn1cbiAgICAgKi9cbiAgICB0aGlzLmNoYW5nZWRUeXBlcyA9IG5ldyBNYXAoKTtcbiAgICAvLyBUT0RPOiByZW5hbWUgZGVsZXRlZFR5cGVzXG4gICAgLyoqXG4gICAgICogU2V0IG9mIGFsbCBkZWxldGVkIFR5cGVzIGFuZCBTdHJ1Y3RzLlxuICAgICAqIEB0eXBlIHtTZXQ8SXRlbT59XG4gICAgICovXG4gICAgdGhpcy5kZWxldGVkU3RydWN0cyA9IG5ldyBTZXQoKTtcbiAgICAvKipcbiAgICAgKiBTYXZlcyB0aGUgb2xkIHN0YXRlIHNldCBvZiB0aGUgWWpzIGluc3RhbmNlLiBJZiBhIHN0YXRlIHdhcyBtb2RpZmllZCxcbiAgICAgKiB0aGUgb3JpZ2luYWwgdmFsdWUgaXMgc2F2ZWQgaGVyZS5cbiAgICAgKiBAdHlwZSB7TWFwPE51bWJlcixOdW1iZXI+fVxuICAgICAqL1xuICAgIHRoaXMuYmVmb3JlU3RhdGUgPSBuZXcgTWFwKCk7XG4gICAgLyoqXG4gICAgICogU3RvcmVzIHRoZSBldmVudHMgZm9yIHRoZSB0eXBlcyB0aGF0IG9ic2VydmUgYWxzbyBjaGlsZCBlbGVtZW50cy5cbiAgICAgKiBJdCBpcyBtYWlubHkgdXNlZCBieSBgb2JzZXJ2ZURlZXBgLlxuICAgICAqIEB0eXBlIHtNYXA8VHlwZSxBcnJheTxZRXZlbnQ+Pn1cbiAgICAgKi9cbiAgICB0aGlzLmNoYW5nZWRQYXJlbnRUeXBlcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmVuY29kZWRTdHJ1Y3RzTGVuID0gMDtcbiAgICB0aGlzLmVuY29kZWRTdHJ1Y3RzID0gY3JlYXRlRW5jb2RlcigpO1xuICB9XG59XG5cbi8qKlxuICogQG1vZHVsZSB1dGlsc1xuICovXG5cbmNsYXNzIE1pc3NpbmdFbnRyeSB7XG4gIGNvbnN0cnVjdG9yIChkZWNvZGVyLCBtaXNzaW5nLCBzdHJ1Y3QpIHtcbiAgICB0aGlzLmRlY29kZXIgPSBkZWNvZGVyO1xuICAgIHRoaXMubWlzc2luZyA9IG1pc3NpbmcubGVuZ3RoO1xuICAgIHRoaXMuc3RydWN0ID0gc3RydWN0O1xuICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqIEludGVncmF0ZSByZW1vdGUgc3RydWN0XG4gKiBXaGVuIGEgcmVtb3RlIHN0cnVjdCBpcyBpbnRlZ3JhdGVkLCBvdGhlciBzdHJ1Y3RzIG1pZ2h0IGJlIHJlYWR5IHRvIHJlYWR5IHRvXG4gKiBpbnRlZ3JhdGUuXG4gKiBAcGFyYW0ge1l9IHlcbiAqIEBwYXJhbSB7SXRlbX0gc3RydWN0XG4gKi9cbmZ1bmN0aW9uIF9pbnRlZ3JhdGVSZW1vdGVTdHJ1Y3RIZWxwZXIgKHksIHN0cnVjdCkge1xuICBjb25zdCBpZCA9IHN0cnVjdC5faWQ7XG4gIGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RydWN0Ll9pbnRlZ3JhdGUoeSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHkuc3MuZ2V0U3RhdGUoaWQudXNlcikgPiBpZC5jbG9jaykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICgheS5nY0VuYWJsZWQgfHwgc3RydWN0LmNvbnN0cnVjdG9yID09PSBHQyB8fCAoc3RydWN0Ll9wYXJlbnQuY29uc3RydWN0b3IgIT09IEdDICYmIHN0cnVjdC5fcGFyZW50Ll9kZWxldGVkID09PSBmYWxzZSkpIHtcbiAgICAgIC8vIElzIGVpdGhlciBhIEdDIG9yIEl0ZW0gd2l0aCBhbiB1bmRlbGV0ZWQgcGFyZW50XG4gICAgICAvLyBzYXZlIHRvIGludGVncmF0ZVxuICAgICAgc3RydWN0Ll9pbnRlZ3JhdGUoeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElzIGFuIEl0ZW0uIHBhcmVudCB3YXMgZGVsZXRlZC5cbiAgICAgIHN0cnVjdC5fZ2MoeSk7XG4gICAgfVxuICAgIGxldCBtc3UgPSB5Ll9taXNzaW5nU3RydWN0cy5nZXQoaWQudXNlcik7XG4gICAgaWYgKG1zdSAhPSBudWxsKSB7XG4gICAgICBsZXQgY2xvY2sgPSBpZC5jbG9jaztcbiAgICAgIGNvbnN0IGZpbmFsQ2xvY2sgPSBjbG9jayArIHN0cnVjdC5fbGVuZ3RoO1xuICAgICAgZm9yICg7Y2xvY2sgPCBmaW5hbENsb2NrOyBjbG9jaysrKSB7XG4gICAgICAgIGNvbnN0IG1pc3NpbmdTdHJ1Y3RzID0gbXN1LmdldChjbG9jayk7XG4gICAgICAgIGlmIChtaXNzaW5nU3RydWN0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbWlzc2luZ1N0cnVjdHMuZm9yRWFjaChtaXNzaW5nRGVmID0+IHtcbiAgICAgICAgICAgIG1pc3NpbmdEZWYubWlzc2luZy0tO1xuICAgICAgICAgICAgaWYgKG1pc3NpbmdEZWYubWlzc2luZyA9PT0gMCkge1xuICAgICAgICAgICAgICBjb25zdCBkZWNvZGVyID0gbWlzc2luZ0RlZi5kZWNvZGVyO1xuICAgICAgICAgICAgICBsZXQgb2xkUG9zID0gZGVjb2Rlci5wb3M7XG4gICAgICAgICAgICAgIGxldCBtaXNzaW5nID0gbWlzc2luZ0RlZi5zdHJ1Y3QuX2Zyb21CaW5hcnkoeSwgZGVjb2Rlcik7XG4gICAgICAgICAgICAgIGRlY29kZXIucG9zID0gb2xkUG9zO1xuICAgICAgICAgICAgICBpZiAobWlzc2luZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB5Ll9yZWFkeVRvSW50ZWdyYXRlLnB1c2gobWlzc2luZ0RlZi5zdHJ1Y3QpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgbXN1LmRlbGV0ZShjbG9jayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtc3Uuc2l6ZSA9PT0gMCkge1xuICAgICAgICB5Ll9taXNzaW5nU3RydWN0cy5kZWxldGUoaWQudXNlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyXG4gKiBAcGFyYW0ge1l9IHlcbiAqL1xuY29uc3QgaW50ZWdyYXRlUmVtb3RlU3RydWN0cyA9IChkZWNvZGVyLCB5KSA9PiB7XG4gIGNvbnN0IGxlbiA9IHJlYWRVaW50MzIoZGVjb2Rlcik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBsZXQgcmVmZXJlbmNlID0gcmVhZFZhclVpbnQoZGVjb2Rlcik7XG4gICAgbGV0IENvbnN0ciA9IGdldFN0cnVjdChyZWZlcmVuY2UpO1xuICAgIGxldCBzdHJ1Y3QgPSBuZXcgQ29uc3RyKCk7XG4gICAgbGV0IGRlY29kZXJQb3MgPSBkZWNvZGVyLnBvcztcbiAgICBsZXQgbWlzc2luZyA9IHN0cnVjdC5fZnJvbUJpbmFyeSh5LCBkZWNvZGVyKTtcbiAgICBpZiAobWlzc2luZy5sZW5ndGggPT09IDApIHtcbiAgICAgIHdoaWxlIChzdHJ1Y3QgIT0gbnVsbCkge1xuICAgICAgICBfaW50ZWdyYXRlUmVtb3RlU3RydWN0SGVscGVyKHksIHN0cnVjdCk7XG4gICAgICAgIHN0cnVjdCA9IHkuX3JlYWR5VG9JbnRlZ3JhdGUuc2hpZnQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IF9kZWNvZGVyID0gY3JlYXRlRGVjb2RlcihkZWNvZGVyLmFyci5idWZmZXIpO1xuICAgICAgX2RlY29kZXIucG9zID0gZGVjb2RlclBvcztcbiAgICAgIGxldCBtaXNzaW5nRW50cnkgPSBuZXcgTWlzc2luZ0VudHJ5KF9kZWNvZGVyLCBtaXNzaW5nLCBzdHJ1Y3QpO1xuICAgICAgbGV0IG1pc3NpbmdTdHJ1Y3RzID0geS5fbWlzc2luZ1N0cnVjdHM7XG4gICAgICBmb3IgKGxldCBpID0gbWlzc2luZy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBsZXQgbSA9IG1pc3NpbmdbaV07XG4gICAgICAgIGlmICghbWlzc2luZ1N0cnVjdHMuaGFzKG0udXNlcikpIHtcbiAgICAgICAgICBtaXNzaW5nU3RydWN0cy5zZXQobS51c2VyLCBuZXcgTWFwKCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtc3UgPSBtaXNzaW5nU3RydWN0cy5nZXQobS51c2VyKTtcbiAgICAgICAgaWYgKCFtc3UuaGFzKG0uY2xvY2spKSB7XG4gICAgICAgICAgbXN1LnNldChtLmNsb2NrLCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1BcnJheSA9IG1zdSA9IG1zdS5nZXQobS5jbG9jayk7XG4gICAgICAgIG1BcnJheS5wdXNoKG1pc3NpbmdFbnRyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vLyBUT0RPOiB1c2UgdGhpcyBhYm92ZSAvIHJlZmFjdG9yXG4vKipcbiAqIEBwYXJhbSB7ZGVjb2RpbmcuRGVjb2Rlcn0gZGVjb2RlclxuICogQHBhcmFtIHtZfSB5XG4gKi9cbmNvbnN0IGludGVncmF0ZVJlbW90ZVN0cnVjdCA9IChkZWNvZGVyLCB5KSA9PiB7XG4gIGxldCByZWZlcmVuY2UgPSByZWFkVmFyVWludChkZWNvZGVyKTtcbiAgbGV0IENvbnN0ciA9IGdldFN0cnVjdChyZWZlcmVuY2UpO1xuICBsZXQgc3RydWN0ID0gbmV3IENvbnN0cigpO1xuICBsZXQgZGVjb2RlclBvcyA9IGRlY29kZXIucG9zO1xuICBsZXQgbWlzc2luZyA9IHN0cnVjdC5fZnJvbUJpbmFyeSh5LCBkZWNvZGVyKTtcbiAgaWYgKG1pc3NpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgd2hpbGUgKHN0cnVjdCAhPSBudWxsKSB7XG4gICAgICBfaW50ZWdyYXRlUmVtb3RlU3RydWN0SGVscGVyKHksIHN0cnVjdCk7XG4gICAgICBzdHJ1Y3QgPSB5Ll9yZWFkeVRvSW50ZWdyYXRlLnNoaWZ0KCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBfZGVjb2RlciA9IGNyZWF0ZURlY29kZXIoZGVjb2Rlci5hcnIuYnVmZmVyKTtcbiAgICBfZGVjb2Rlci5wb3MgPSBkZWNvZGVyUG9zO1xuICAgIGxldCBtaXNzaW5nRW50cnkgPSBuZXcgTWlzc2luZ0VudHJ5KF9kZWNvZGVyLCBtaXNzaW5nLCBzdHJ1Y3QpO1xuICAgIGxldCBtaXNzaW5nU3RydWN0cyA9IHkuX21pc3NpbmdTdHJ1Y3RzO1xuICAgIGZvciAobGV0IGkgPSBtaXNzaW5nLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsZXQgbSA9IG1pc3NpbmdbaV07XG4gICAgICBpZiAoIW1pc3NpbmdTdHJ1Y3RzLmhhcyhtLnVzZXIpKSB7XG4gICAgICAgIG1pc3NpbmdTdHJ1Y3RzLnNldChtLnVzZXIsIG5ldyBNYXAoKSk7XG4gICAgICB9XG4gICAgICBsZXQgbXN1ID0gbWlzc2luZ1N0cnVjdHMuZ2V0KG0udXNlcik7XG4gICAgICBpZiAoIW1zdS5oYXMobS5jbG9jaykpIHtcbiAgICAgICAgbXN1LnNldChtLmNsb2NrLCBbXSk7XG4gICAgICB9XG4gICAgICBsZXQgbUFycmF5ID0gbXN1ID0gbXN1LmdldChtLmNsb2NrKTtcbiAgICAgIG1BcnJheS5wdXNoKG1pc3NpbmdFbnRyeSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEBtb2R1bGUgc3luYy1wcm90b2NvbFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge01hcDxudW1iZXIsIG51bWJlcj59IFN0YXRlTWFwXG4gKi9cblxuLyoqXG4gKiBDb3JlIFlqcyBvbmx5IGRlZmluZXMgdGhyZWUgbWVzc2FnZSB0eXBlczpcbiAqIOKAoiBZanNTeW5jU3RlcDE6IEluY2x1ZGVzIHRoZSBTdGF0ZSBTZXQgb2YgdGhlIHNlbmRpbmcgY2xpZW50LiBXaGVuIHJlY2VpdmVkLCB0aGUgY2xpZW50IHNob3VsZCByZXBseSB3aXRoIFlqc1N5bmNTdGVwMi5cbiAqIOKAoiBZanNTeW5jU3RlcDI6IEluY2x1ZGVzIGFsbCBtaXNzaW5nIHN0cnVjdHMgYW5kIHRoZSBjb21wbGV0ZSBkZWxldGUgc2V0LiBXaGVuIHJlY2VpdmVkLCB0aGUgdGhlIGNsaWVudCBpcyBhc3N1cmVkIHRoYXRcbiAqICAgaXQgcmVjZWl2ZWQgYWxsIGluZm9ybWF0aW9uIGZyb20gdGhlIHJlbW90ZSBjbGllbnQuXG4gKlxuICogSW4gYSBwZWVyLXRvLXBlZXIgbmV0d29yaywgeW91IG1heSB3YW50IHRvIGludHJvZHVjZSBhIFN5bmNEb25lIG1lc3NhZ2UgdHlwZS4gQm90aCBwYXJ0aWVzIHNob3VsZCBpbml0aWF0ZSB0aGUgY29ubmVjdGlvblxuICogd2l0aCBTeW5jU3RlcDEuIFdoZW4gYSBjbGllbnQgcmVjZWl2ZWQgU3luY1N0ZXAyLCBpdCBzaG91bGQgcmVwbHkgd2l0aCBTeW5jRG9uZS4gV2hlbiB0aGUgbG9jYWwgY2xpZW50IHJlY2VpdmVkIGJvdGhcbiAqIFN5bmNTdGVwMiBhbmQgU3luY0RvbmUsIGl0IGlzIGFzc3VyZWQgdGhhdCBpdCBpcyBzeW5jZWQgdG8gdGhlIHJlbW90ZSBjbGllbnQuXG4gKlxuICogSW4gYSBjbGllbnQtc2VydmVyIG1vZGVsLCB5b3Ugd2FudCB0byBoYW5kbGUgdGhpcyBkaWZmZXJlbnRseTogVGhlIGNsaWVudCBzaG91bGQgaW5pdGlhdGUgdGhlIGNvbm5lY3Rpb24gd2l0aCBTeW5jU3RlcDEuXG4gKiBXaGVuIHRoZSBzZXJ2ZXIgcmVjZWl2ZXMgU3luY1N0ZXAxLCBpdCBzaG91bGQgcmVwbHkgd2l0aCBTeW5jU3RlcDIgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgU3luY1N0ZXAxLiBUaGUgY2xpZW50IHJlcGxpZXNcbiAqIHdpdGggU3luY1N0ZXAyIHdoZW4gaXQgcmVjZWl2ZXMgU3luY1N0ZXAxLiBPcHRpb25hbGx5IHRoZSBzZXJ2ZXIgbWF5IHNlbmQgYSBTeW5jRG9uZSBhZnRlciBpdCByZWNlaXZlZCBTeW5jU3RlcDIsIHNvIHRoZVxuICogY2xpZW50IGtub3dzIHRoYXQgdGhlIHN5bmMgaXMgZmluaXNoZWQuICBUaGVyZSBhcmUgdHdvIHJlYXNvbnMgZm9yIHRoaXMgbW9yZSBlbGFib3JhdGVkIHN5bmMgbW9kZWw6IDEuIFRoaXMgcHJvdG9jb2wgY2FuXG4gKiBlYXNpbHkgYmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mIGh0dHAgYW5kIHdlYnNvY2tldHMuIDIuIFRoZSBzZXJ2ZXIgc2hvdWwgb25seSByZXBseSB0byByZXF1ZXN0cywgYW5kIG5vdCBpbml0aWF0ZSB0aGVtLlxuICogVGhlcmVmb3JlIGl0IGlzIG5lY2VzYXJyeSB0aGF0IHRoZSBjbGllbnQgaW5pdGlhdGVzIHRoZSBzeW5jLlxuICpcbiAqIENvbnN0cnVjdGlvbiBvZiBhIG1lc3NhZ2U6XG4gKiBbbWVzc2FnZVR5cGUgOiB2YXJVaW50LCBtZXNzYWdlIGRlZmluaXRpb24uLl1cbiAqXG4gKiBOb3RlOiBBIG1lc3NhZ2UgZG9lcyBub3QgaW5jbHVkZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcm9vbSBuYW1lLiBUaGlzIG11c3QgdG8gYmUgaGFuZGxlZCBieSB0aGUgdXBwZXIgbGF5ZXIgcHJvdG9jb2whXG4gKlxuICogc3RyaW5naWZ5W21lc3NhZ2VUeXBlXSBzdHJpbmdpZmllcyBhIG1lc3NhZ2UgZGVmaW5pdGlvbiAobWVzc2FnZVR5cGUgaXMgYWxyZWFkeSByZWFkIGZyb20gdGhlIGJ1ZmZmZXIpXG4gKi9cblxuY29uc3QgbWVzc2FnZVlqc1N5bmNTdGVwMSA9IDA7XG5jb25zdCBtZXNzYWdlWWpzU3luY1N0ZXAyID0gMTtcbmNvbnN0IG1lc3NhZ2VZanNVcGRhdGUgPSAyO1xuXG4vKipcbiAqIEBwYXJhbSB7ZGVjb2RpbmcuRGVjb2Rlcn0gZGVjb2RlclxuICogQHBhcmFtIHtZfSB5XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHN0cmluZ2lmeVN0cnVjdHMgPSAoZGVjb2RlciwgeSkgPT4ge1xuICBsZXQgc3RyID0gJyc7XG4gIGNvbnN0IGxlbiA9IHJlYWRVaW50MzIoZGVjb2Rlcik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBsZXQgcmVmZXJlbmNlID0gcmVhZFZhclVpbnQoZGVjb2Rlcik7XG4gICAgbGV0IENvbnN0ciA9IGdldFN0cnVjdChyZWZlcmVuY2UpO1xuICAgIGxldCBzdHJ1Y3QgPSBuZXcgQ29uc3RyKCk7XG4gICAgbGV0IG1pc3NpbmcgPSBzdHJ1Y3QuX2Zyb21CaW5hcnkoeSwgZGVjb2Rlcik7XG4gICAgbGV0IGxvZ01lc3NhZ2UgPSAnICAnICsgc3RydWN0Ll9sb2dTdHJpbmcoKTtcbiAgICBpZiAobWlzc2luZy5sZW5ndGggPiAwKSB7XG4gICAgICBsb2dNZXNzYWdlICs9ICcgLi4gbWlzc2luZzogJyArIG1pc3NpbmcubWFwKHN0cmluZ2lmeUl0ZW1JRCkuam9pbignLCAnKTtcbiAgICB9XG4gICAgc3RyICs9IGxvZ01lc3NhZ2UgKyAnXFxuJztcbiAgfVxuICByZXR1cm4gc3RyXG59O1xuXG4vKipcbiAqIFdyaXRlIGFsbCBJdGVtcyB0aGF0IGFyZSBub3Qgbm90IGluY2x1ZGVkIGluIHNzIHRvXG4gKiB0aGUgZW5jb2RlciBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtlbmNvZGluZy5FbmNvZGVyfSBlbmNvZGVyXG4gKiBAcGFyYW0ge1l9IHlcbiAqIEBwYXJhbSB7U3RhdGVNYXB9IHNzIFN0YXRlIFNldCByZWNlaXZlZCBmcm9tIGEgcmVtb3RlIGNsaWVudC4gTWFwcyBmcm9tIGNsaWVudCBpZCB0byBudW1iZXIgb2YgY3JlYXRlZCBvcGVyYXRpb25zIGJ5IGNsaWVudCBpZC5cbiAqL1xuY29uc3Qgd3JpdGVTdHJ1Y3RzID0gKGVuY29kZXIsIHksIHNzKSA9PiB7XG4gIGNvbnN0IGxlblBvcyA9IGxlbmd0aChlbmNvZGVyKTtcbiAgd3JpdGVVaW50MzIoZW5jb2RlciwgMCk7XG4gIGxldCBsZW4gPSAwO1xuICBmb3IgKGxldCB1c2VyIG9mIHkuc3Muc3RhdGUua2V5cygpKSB7XG4gICAgbGV0IGNsb2NrID0gc3MuZ2V0KHVzZXIpIHx8IDA7XG4gICAgaWYgKHVzZXIgIT09IFJvb3RGYWtlVXNlcklEKSB7XG4gICAgICBjb25zdCBtaW5Cb3VuZCA9IGNyZWF0ZUlEKHVzZXIsIGNsb2NrKTtcbiAgICAgIGNvbnN0IG92ZXJsYXBwaW5nTGVmdCA9IHkub3MuZmluZFByZXYobWluQm91bmQpO1xuICAgICAgY29uc3QgcmlnaHRJRCA9IG92ZXJsYXBwaW5nTGVmdCA9PT0gbnVsbCA/IG51bGwgOiBvdmVybGFwcGluZ0xlZnQuX2lkO1xuICAgICAgaWYgKHJpZ2h0SUQgIT09IG51bGwgJiYgcmlnaHRJRC51c2VyID09PSB1c2VyICYmIHJpZ2h0SUQuY2xvY2sgKyBvdmVybGFwcGluZ0xlZnQuX2xlbmd0aCA+IGNsb2NrKSB7XG4gICAgICAgIC8vIFRPRE86IG9ubHkgd3JpdGUgcGFydGlhbCBjb250ZW50IChvbmx5IG1pc3NpbmcgY29udGVudClcbiAgICAgICAgLy8gY29uc3Qgc3RydWN0ID0gb3ZlcmxhcHBpbmdMZWZ0Ll9jbG9uZVBhcnRpYWwoY2xvY2sgLSByaWdodElELmNsb2NrKVxuICAgICAgICBjb25zdCBzdHJ1Y3QgPSBvdmVybGFwcGluZ0xlZnQ7XG4gICAgICAgIHN0cnVjdC5fdG9CaW5hcnkoZW5jb2Rlcik7XG4gICAgICAgIGxlbisrO1xuICAgICAgfVxuICAgICAgeS5vcy5pdGVyYXRlKG1pbkJvdW5kLCBjcmVhdGVJRCh1c2VyLCBOdW1iZXIuTUFYX1ZBTFVFKSwgc3RydWN0ID0+IHtcbiAgICAgICAgc3RydWN0Ll90b0JpbmFyeShlbmNvZGVyKTtcbiAgICAgICAgbGVuKys7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgc2V0VWludDMyKGVuY29kZXIsIGxlblBvcywgbGVuKTtcbn07XG5cbi8qKlxuICogUmVhZCBzdHJ1Y3RzIGFuZCBkZWxldGUgb3BlcmF0aW9ucyBmcm9tIGRlY29kZXIgYW5kIGFwcGx5IHRoZW0gb24gYSBzaGFyZWQgZG9jdW1lbnQuXG4gKlxuICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyXG4gKiBAcGFyYW0ge1l9IHlcbiAqL1xuY29uc3QgcmVhZFN0cnVjdHMgPSAoZGVjb2RlciwgeSkgPT4ge1xuICBjb25zdCBsZW4gPSByZWFkVWludDMyKGRlY29kZXIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaW50ZWdyYXRlUmVtb3RlU3RydWN0KGRlY29kZXIsIHkpO1xuICB9XG59O1xuXG4vKipcbiAqIFJlYWQgU3luY1N0ZXAxIGFuZCByZXR1cm4gaXQgYXMgYSByZWFkYWJsZSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmNvbnN0IHN0cmluZ2lmeVN5bmNTdGVwMSA9IChkZWNvZGVyKSA9PiB7XG4gIGxldCBzID0gJ1N5bmNTdGVwMTogJztcbiAgY29uc3QgbGVuID0gcmVhZFVpbnQzMihkZWNvZGVyKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IHVzZXIgPSByZWFkVmFyVWludChkZWNvZGVyKTtcbiAgICBjb25zdCBjbG9jayA9IHJlYWRWYXJVaW50KGRlY29kZXIpO1xuICAgIHMgKz0gYCgke3VzZXJ9OiR7Y2xvY2t9KWA7XG4gIH1cbiAgcmV0dXJuIHNcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgc3luYyBzdGVwIDEgbWVzc2FnZSBiYXNlZCBvbiB0aGUgc3RhdGUgb2YgdGhlIGN1cnJlbnQgc2hhcmVkIGRvY3VtZW50LlxuICpcbiAqIEBwYXJhbSB7ZW5jb2RpbmcuRW5jb2Rlcn0gZW5jb2RlclxuICogQHBhcmFtIHtZfSB5XG4gKi9cbmNvbnN0IHdyaXRlU3luY1N0ZXAxID0gKGVuY29kZXIsIHkpID0+IHtcbiAgd3JpdGVWYXJVaW50KGVuY29kZXIsIG1lc3NhZ2VZanNTeW5jU3RlcDEpO1xuICB3cml0ZVN0YXRlTWFwKGVuY29kZXIsIHkuc3Muc3RhdGUpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2VuY29kaW5nLkVuY29kZXJ9IGVuY29kZXJcbiAqIEBwYXJhbSB7WX0geVxuICogQHBhcmFtIHtNYXA8bnVtYmVyLCBudW1iZXI+fSBzc1xuICovXG5jb25zdCB3cml0ZVN5bmNTdGVwMiA9IChlbmNvZGVyLCB5LCBzcykgPT4ge1xuICB3cml0ZVZhclVpbnQoZW5jb2RlciwgbWVzc2FnZVlqc1N5bmNTdGVwMik7XG4gIHdyaXRlU3RydWN0cyhlbmNvZGVyLCB5LCBzcyk7XG4gIHdyaXRlRGVsZXRlU3RvcmUoZW5jb2RlciwgeS5kcyk7XG59O1xuXG4vKipcbiAqIFJlYWQgU3luY1N0ZXAxIG1lc3NhZ2UgYW5kIHJlcGx5IHdpdGggU3luY1N0ZXAyLlxuICpcbiAqIEBwYXJhbSB7ZGVjb2RpbmcuRGVjb2Rlcn0gZGVjb2RlciBUaGUgcmVwbHkgdG8gdGhlIHJlY2VpdmVkIG1lc3NhZ2VcbiAqIEBwYXJhbSB7ZW5jb2RpbmcuRW5jb2Rlcn0gZW5jb2RlciBUaGUgcmVjZWl2ZWQgbWVzc2FnZVxuICogQHBhcmFtIHtZfSB5XG4gKi9cbmNvbnN0IHJlYWRTeW5jU3RlcDEgPSAoZGVjb2RlciwgZW5jb2RlciwgeSkgPT5cbiAgd3JpdGVTeW5jU3RlcDIoZW5jb2RlciwgeSwgcmVhZFN0YXRlTWFwKGRlY29kZXIpKTtcblxuLyoqXG4gKiBAcGFyYW0ge2RlY29kaW5nLkRlY29kZXJ9IGRlY29kZXJcbiAqIEBwYXJhbSB7WX0geVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5jb25zdCBzdHJpbmdpZnlTeW5jU3RlcDIgPSAoZGVjb2RlciwgeSkgPT4ge1xuICBsZXQgc3RyID0gJyAgPT0gU3luYyBzdGVwIDI6XFxuJztcbiAgc3RyICs9ICcgKyBTdHJ1Y3RzOlxcbic7XG4gIHN0ciArPSBzdHJpbmdpZnlTdHJ1Y3RzKGRlY29kZXIsIHkpO1xuICAvLyB3cml0ZSBEUyB0byBzdHJpbmdcbiAgc3RyICs9ICcgKyBEZWxldGUgU2V0Olxcbic7XG4gIHN0ciArPSBzdHJpbmdpZnlEZWxldGVTdG9yZShkZWNvZGVyKTtcbiAgcmV0dXJuIHN0clxufTtcblxuLyoqXG4gKiBSZWFkIGFuZCBhcHBseSBTdHJ1Y3RzIGFuZCB0aGVuIERlbGV0ZVN0b3JlIHRvIGEgeSBpbnN0YW5jZS5cbiAqXG4gKiBAcGFyYW0ge2RlY29kaW5nLkRlY29kZXJ9IGRlY29kZXJcbiAqIEBwYXJhbSB7WX0geVxuICovXG5jb25zdCByZWFkU3luY1N0ZXAyID0gKGRlY29kZXIsIHkpID0+IHtcbiAgcmVhZFN0cnVjdHMoZGVjb2RlciwgeSk7XG4gIHJlYWREZWxldGVTdG9yZShkZWNvZGVyLCB5KTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyXG4gKiBAcGFyYW0ge1l9IHlcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuY29uc3Qgc3RyaW5naWZ5VXBkYXRlID0gKGRlY29kZXIsIHkpID0+XG4gICcgID09IFVwZGF0ZTpcXG4nICsgc3RyaW5naWZ5U3RydWN0cyhkZWNvZGVyLCB5KTtcblxuLyoqXG4gKiBAcGFyYW0ge2VuY29kaW5nLkVuY29kZXJ9IGVuY29kZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1PZlN0cnVjdHNcbiAqIEBwYXJhbSB7ZW5jb2RpbmcuRW5jb2Rlcn0gdXBkYXRlc1xuICovXG5jb25zdCB3cml0ZVVwZGF0ZSA9IChlbmNvZGVyLCBudW1PZlN0cnVjdHMsIHVwZGF0ZXMpID0+IHtcbiAgd3JpdGVWYXJVaW50KGVuY29kZXIsIG1lc3NhZ2VZanNVcGRhdGUpO1xuICB3cml0ZVVpbnQzMihlbmNvZGVyLCBudW1PZlN0cnVjdHMpO1xuICB3cml0ZUJpbmFyeUVuY29kZXIoZW5jb2RlciwgdXBkYXRlcyk7XG59O1xuXG5jb25zdCByZWFkVXBkYXRlID0gcmVhZFN0cnVjdHM7XG5cbi8qKlxuICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyXG4gKiBAcGFyYW0ge1l9IHlcbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIG1lc3NhZ2UgY29udmVydGVkIHRvIHN0cmluZ1xuICovXG5jb25zdCBzdHJpbmdpZnlTeW5jTWVzc2FnZSA9IChkZWNvZGVyLCB5KSA9PiB7XG4gIGNvbnN0IG1lc3NhZ2VUeXBlID0gcmVhZFZhclVpbnQoZGVjb2Rlcik7XG4gIGxldCBzdHJpbmdpZmllZE1lc3NhZ2U7XG4gIGxldCBzdHJpbmdpZmllZE1lc3NhZ2VUeXBlO1xuICBzd2l0Y2ggKG1lc3NhZ2VUeXBlKSB7XG4gICAgY2FzZSBtZXNzYWdlWWpzU3luY1N0ZXAxOlxuICAgICAgc3RyaW5naWZpZWRNZXNzYWdlVHlwZSA9ICdZanNTeW5jU3RlcDEnO1xuICAgICAgc3RyaW5naWZpZWRNZXNzYWdlID0gc3RyaW5naWZ5U3luY1N0ZXAxKGRlY29kZXIpO1xuICAgICAgYnJlYWtcbiAgICBjYXNlIG1lc3NhZ2VZanNTeW5jU3RlcDI6XG4gICAgICBzdHJpbmdpZmllZE1lc3NhZ2VUeXBlID0gJ1lqc1N5bmNTdGVwMic7XG4gICAgICBzdHJpbmdpZmllZE1lc3NhZ2UgPSBzdHJpbmdpZnlTeW5jU3RlcDIoZGVjb2RlciwgeSk7XG4gICAgICBicmVha1xuICAgIGNhc2UgbWVzc2FnZVlqc1VwZGF0ZTpcbiAgICAgIHN0cmluZ2lmaWVkTWVzc2FnZVR5cGUgPSAnWWpzVXBkYXRlJztcbiAgICAgIHN0cmluZ2lmaWVkTWVzc2FnZSA9IHN0cmluZ2lmeVN0cnVjdHMoZGVjb2RlciwgeSk7XG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBzdHJpbmdpZmllZE1lc3NhZ2VUeXBlID0gJ1Vua25vd24nO1xuICAgICAgc3RyaW5naWZpZWRNZXNzYWdlID0gJ1Vua25vd24nO1xuICB9XG4gIHJldHVybiBgTWVzc2FnZSAke3N0cmluZ2lmaWVkTWVzc2FnZVR5cGV9OlxcbiR7c3RyaW5naWZpZWRNZXNzYWdlfWBcbn07XG5cbi8qKlxuICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyIEEgbWVzc2FnZSByZWNlaXZlZCBmcm9tIGFub3RoZXIgY2xpZW50XG4gKiBAcGFyYW0ge2VuY29kaW5nLkVuY29kZXJ9IGVuY29kZXIgVGhlIHJlcGx5IG1lc3NhZ2UuIFdpbGwgbm90IGJlIHNlbnQgaWYgZW1wdHkuXG4gKiBAcGFyYW0ge1l9IHlcbiAqL1xuY29uc3QgcmVhZFN5bmNNZXNzYWdlID0gKGRlY29kZXIsIGVuY29kZXIsIHkpID0+IHtcbiAgY29uc3QgbWVzc2FnZVR5cGUgPSByZWFkVmFyVWludChkZWNvZGVyKTtcbiAgc3dpdGNoIChtZXNzYWdlVHlwZSkge1xuICAgIGNhc2UgbWVzc2FnZVlqc1N5bmNTdGVwMTpcbiAgICAgIHJlYWRTeW5jU3RlcDEoZGVjb2RlciwgZW5jb2RlciwgeSk7XG4gICAgICBicmVha1xuICAgIGNhc2UgbWVzc2FnZVlqc1N5bmNTdGVwMjpcbiAgICAgIHkudHJhbnNhY3QoKCkgPT4gcmVhZFN5bmNTdGVwMihkZWNvZGVyLCB5KSwgdHJ1ZSk7XG4gICAgICBicmVha1xuICAgIGNhc2UgbWVzc2FnZVlqc1VwZGF0ZTpcbiAgICAgIHkudHJhbnNhY3QoKCkgPT4gcmVhZFVwZGF0ZShkZWNvZGVyLCB5KSwgdHJ1ZSk7XG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gbWVzc2FnZSB0eXBlJylcbiAgfVxuICByZXR1cm4gbWVzc2FnZVR5cGVcbn07XG5cbnZhciBzeW5jID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBtZXNzYWdlWWpzU3luY1N0ZXAxOiBtZXNzYWdlWWpzU3luY1N0ZXAxLFxuICBtZXNzYWdlWWpzU3luY1N0ZXAyOiBtZXNzYWdlWWpzU3luY1N0ZXAyLFxuICBtZXNzYWdlWWpzVXBkYXRlOiBtZXNzYWdlWWpzVXBkYXRlLFxuICBzdHJpbmdpZnlTdHJ1Y3RzOiBzdHJpbmdpZnlTdHJ1Y3RzLFxuICB3cml0ZVN0cnVjdHM6IHdyaXRlU3RydWN0cyxcbiAgcmVhZFN0cnVjdHM6IHJlYWRTdHJ1Y3RzLFxuICBzdHJpbmdpZnlTeW5jU3RlcDE6IHN0cmluZ2lmeVN5bmNTdGVwMSxcbiAgd3JpdGVTeW5jU3RlcDE6IHdyaXRlU3luY1N0ZXAxLFxuICB3cml0ZVN5bmNTdGVwMjogd3JpdGVTeW5jU3RlcDIsXG4gIHJlYWRTeW5jU3RlcDE6IHJlYWRTeW5jU3RlcDEsXG4gIHN0cmluZ2lmeVN5bmNTdGVwMjogc3RyaW5naWZ5U3luY1N0ZXAyLFxuICByZWFkU3luY1N0ZXAyOiByZWFkU3luY1N0ZXAyLFxuICBzdHJpbmdpZnlVcGRhdGU6IHN0cmluZ2lmeVVwZGF0ZSxcbiAgd3JpdGVVcGRhdGU6IHdyaXRlVXBkYXRlLFxuICByZWFkVXBkYXRlOiByZWFkVXBkYXRlLFxuICBzdHJpbmdpZnlTeW5jTWVzc2FnZTogc3RyaW5naWZ5U3luY01lc3NhZ2UsXG4gIHJlYWRTeW5jTWVzc2FnZTogcmVhZFN5bmNNZXNzYWdlXG59KTtcblxuLyoqXG4gKiBBbnl0aGluZyB0aGF0IGNhbiBiZSBlbmNvZGVkIHdpdGggYEpTT04uc3RyaW5naWZ5YCBhbmQgY2FuIGJlIGRlY29kZWQgd2l0aFxuICogYEpTT04ucGFyc2VgLlxuICpcbiAqIFRoZSBmb2xsb3dpbmcgcHJvcGVydHkgc2hvdWxkIGhvbGQ6XG4gKiBgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShrZXkpKT09PWtleWBcbiAqXG4gKiBBdCB0aGUgbW9tZW50IHRoZSBvbmx5IHNhZmUgdmFsdWVzIGFyZSBudW1iZXIgYW5kIHN0cmluZy5cbiAqXG4gKiBAdHlwZWRlZiB7KG51bWJlcnxzdHJpbmd8T2JqZWN0KX0gZW5jb2RhYmxlXG4gKi9cblxuLyoqXG4gKiBBIFlqcyBpbnN0YW5jZSBoYW5kbGVzIHRoZSBzdGF0ZSBvZiBzaGFyZWQgZGF0YS5cbiAqL1xuY2xhc3MgWSBleHRlbmRzIE5hbWVkRXZlbnRIYW5kbGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZl0gY29uZmlndXJhdGlvblxuICAgKi9cbiAgY29uc3RydWN0b3IgKGNvbmYgPSB7fSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5nY0VuYWJsZWQgPSBjb25mLmdjIHx8IGZhbHNlO1xuICAgIHRoaXMuX2NvbnRlbnRSZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMudXNlcklEID0gZ2VuZXJhdGVSYW5kb21VaW50MzIoKTtcbiAgICAvLyBUT0RPOiBUaGlzIHNob3VsZCBiZSBhIE1hcCBzbyB3ZSBjYW4gdXNlIGVuY29kYWJsZXMgYXMga2V5c1xuICAgIHRoaXMuX21hcCA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmRzID0gbmV3IERlbGV0ZVN0b3JlKCk7XG4gICAgdGhpcy5vcyA9IG5ldyBPcGVyYXRpb25TdG9yZSh0aGlzKTtcbiAgICB0aGlzLnNzID0gbmV3IFN0YXRlU3RvcmUodGhpcyk7XG4gICAgdGhpcy5fbWlzc2luZ1N0cnVjdHMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5fcmVhZHlUb0ludGVncmF0ZSA9IFtdO1xuICAgIHRoaXMuX3RyYW5zYWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgIC8vIGZvciBjb21wYXRpYmlsaXR5IHdpdGggaXNQYXJlbnRPZlxuICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgdGhpcy5faGFzVW5kb01hbmFnZXIgPSBmYWxzZTtcbiAgICB0aGlzLl9kZWxldGVkID0gZmFsc2U7IC8vIGZvciBjb21wYXRpYmxpdHkgb2YgaGF2aW5nIHRoaXMgYXMgYSBwYXJlbnQgZm9yIHR5cGVzXG4gICAgdGhpcy5faWQgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWQgdGhlIERlY29kZXIgYW5kIGZpbGwgdGhlIFlqcyBpbnN0YW5jZSB3aXRoIGRhdGEgaW4gdGhlIGRlY29kZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RGVjb2Rlcn0gZGVjb2RlciBUaGUgQmluYXJ5RGVjb2RlciB0byByZWFkIGZyb20uXG4gICAqL1xuICBpbXBvcnRNb2RlbCAoZGVjb2Rlcikge1xuICAgIHRoaXMudHJhbnNhY3QoKCkgPT4ge1xuICAgICAgaW50ZWdyYXRlUmVtb3RlU3RydWN0cyhkZWNvZGVyLCB0aGlzKTtcbiAgICAgIHJlYWREZWxldGVTdG9yZShkZWNvZGVyLCB0aGlzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbmNvZGUgdGhlIFlqcyBtb2RlbCB0byBBcnJheUJ1ZmZlclxuICAgKlxuICAgKiBAcmV0dXJuIHtBcnJheUJ1ZmZlcn0gVGhlIFlqcyBtb2RlbCBhcyBBcnJheUJ1ZmZlclxuICAgKi9cbiAgZXhwb3J0TW9kZWwgKCkge1xuICAgIGNvbnN0IGVuY29kZXIgPSBjcmVhdGVFbmNvZGVyKCk7XG4gICAgd3JpdGVTdHJ1Y3RzKGVuY29kZXIsIHRoaXMsIG5ldyBNYXAoKSk7XG4gICAgd3JpdGVEZWxldGVTdG9yZShlbmNvZGVyLCB0aGlzLmRzKTtcbiAgICByZXR1cm4gdG9CdWZmZXIoZW5jb2RlcilcbiAgfVxuICBfYmVmb3JlQ2hhbmdlICgpIHt9XG4gIF9jYWxsT2JzZXJ2ZXIgKHRyYW5zYWN0aW9uLCBzdWJzLCByZW1vdGUpIHt9XG4gIC8qKlxuICAgKiBDaGFuZ2VzIHRoYXQgaGFwcGVuIGluc2lkZSBvZiBhIHRyYW5zYWN0aW9uIGFyZSBidW5kbGVkLiBUaGlzIG1lYW5zIHRoYXRcbiAgICogdGhlIG9ic2VydmVyIGZpcmVzIF9hZnRlcl8gdGhlIHRyYW5zYWN0aW9uIGlzIGZpbmlzaGVkIGFuZCB0aGF0IGFsbCBjaGFuZ2VzXG4gICAqIHRoYXQgaGFwcGVuZWQgaW5zaWRlIG9mIHRoZSB0cmFuc2FjdGlvbiBhcmUgc2VudCBhcyBvbmUgbWVzc2FnZSB0byB0aGVcbiAgICogb3RoZXIgcGVlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGYgVGhlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGFzIGEgdHJhbnNhY3Rpb25cbiAgICogQHBhcmFtIHs/Qm9vbGVhbn0gcmVtb3RlIE9wdGlvbmFsLiBXaGV0aGVyIHRoaXMgdHJhbnNhY3Rpb24gaXMgaW5pdGlhdGVkIGJ5XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICBhIHJlbW90ZSBwZWVyLiBUaGlzIHNob3VsZCBub3QgYmUgc2V0IG1hbnVhbGx5IVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICB0cmFuc2FjdCAoZiwgcmVtb3RlID0gZmFsc2UpIHtcbiAgICBsZXQgaW5pdGlhbENhbGwgPSB0aGlzLl90cmFuc2FjdGlvbiA9PT0gbnVsbDtcbiAgICBpZiAoaW5pdGlhbENhbGwpIHtcbiAgICAgIHRoaXMuX3RyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKHRoaXMpO1xuICAgICAgdGhpcy5lbWl0KCdiZWZvcmVUcmFuc2FjdGlvbicsIHRoaXMsIHRoaXMuX3RyYW5zYWN0aW9uLCByZW1vdGUpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgZih0aGlzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cbiAgICBpZiAoaW5pdGlhbENhbGwpIHtcbiAgICAgIHRoaXMuZW1pdCgnYmVmb3JlT2JzZXJ2ZXJDYWxscycsIHRoaXMsIHRoaXMuX3RyYW5zYWN0aW9uLCByZW1vdGUpO1xuICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSB0aGlzLl90cmFuc2FjdGlvbjtcbiAgICAgIHRoaXMuX3RyYW5zYWN0aW9uID0gbnVsbDtcbiAgICAgIC8vIGVtaXQgY2hhbmdlIGV2ZW50cyBvbiBjaGFuZ2VkIHR5cGVzXG4gICAgICB0cmFuc2FjdGlvbi5jaGFuZ2VkVHlwZXMuZm9yRWFjaCgoc3VicywgdHlwZSkgPT4ge1xuICAgICAgICBpZiAoIXR5cGUuX2RlbGV0ZWQpIHtcbiAgICAgICAgICB0eXBlLl9jYWxsT2JzZXJ2ZXIodHJhbnNhY3Rpb24sIHN1YnMsIHJlbW90ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdHJhbnNhY3Rpb24uY2hhbmdlZFBhcmVudFR5cGVzLmZvckVhY2goKGV2ZW50cywgdHlwZSkgPT4ge1xuICAgICAgICBpZiAoIXR5cGUuX2RlbGV0ZWQpIHtcbiAgICAgICAgICBldmVudHMgPSBldmVudHNcbiAgICAgICAgICAgIC5maWx0ZXIoZXZlbnQgPT5cbiAgICAgICAgICAgICAgIWV2ZW50LnRhcmdldC5fZGVsZXRlZFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICBldmVudHNcbiAgICAgICAgICAgIC5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IHR5cGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyB3ZSBkb24ndCBoYXZlIHRvIGNoZWNrIGZvciBldmVudHMubGVuZ3RoXG4gICAgICAgICAgLy8gYmVjYXVzZSB0aGVyZSBpcyBubyB3YXkgZXZlbnRzIGlzIGVtcHR5Li5cbiAgICAgICAgICB0eXBlLl9kZWVwRXZlbnRIYW5kbGVyLmNhbGxFdmVudExpc3RlbmVycyh0cmFuc2FjdGlvbiwgZXZlbnRzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyB3aGVuIGFsbCBjaGFuZ2VzICYgZXZlbnRzIGFyZSBwcm9jZXNzZWQsIGVtaXQgYWZ0ZXJUcmFuc2FjdGlvbiBldmVudFxuICAgICAgdGhpcy5lbWl0KCdhZnRlclRyYW5zYWN0aW9uJywgdGhpcywgdHJhbnNhY3Rpb24sIHJlbW90ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZha2UgX3N0YXJ0IGZvciByb290IHByb3BlcnRpZXMgKHkuc2V0KCduYW1lJywgdHlwZSkpXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXQgX3N0YXJ0ICgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIEZha2UgX3N0YXJ0IGZvciByb290IHByb3BlcnRpZXMgKHkuc2V0KCduYW1lJywgdHlwZSkpXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzZXQgX3N0YXJ0IChzdGFydCkge31cblxuICAvKipcbiAgICogRGVmaW5lIGEgc2hhcmVkIGRhdGEgdHlwZS5cbiAgICpcbiAgICogTXVsdGlwbGUgY2FsbHMgb2YgYHkuZGVmaW5lKG5hbWUsIFR5cGVDb25zdHJ1Y3RvcilgIHlpZWxkIHRoZSBzYW1lIHJlc3VsdFxuICAgKiBhbmQgZG8gbm90IG92ZXJ3cml0ZSBlYWNoIG90aGVyLiBJLmUuXG4gICAqIGB5LmRlZmluZShuYW1lLCB0eXBlKSA9PT0geS5kZWZpbmUobmFtZSwgdHlwZSlgXG4gICAqXG4gICAqIEFmdGVyIHRoaXMgbWV0aG9kIGlzIGNhbGxlZCwgdGhlIHR5cGUgaXMgYWxzbyBhdmFpbGFibGUgb24gYHkuX21hcC5nZXQobmFtZSlgLlxuICAgKlxuICAgKiAqQmVzdCBQcmFjdGljZXM6KlxuICAgKiBFaXRoZXIgZGVmaW5lIGFsbCB0eXBlcyByaWdodCBhZnRlciB0aGUgWWpzIGluc3RhbmNlIGlzIGNyZWF0ZWQgb3IgYWx3YXlzXG4gICAqIHVzZSBgeS5kZWZpbmUoLi4pYCB3aGVuIGFjY2Vzc2luZyBhIHR5cGUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqICAgLy8gT3B0aW9uIDFcbiAgICogICBjb25zdCB5ID0gbmV3IFkoLi4pXG4gICAqICAgeS5kZWZpbmUoJ215QXJyYXknLCBZQXJyYXkpXG4gICAqICAgeS5kZWZpbmUoJ215TWFwJywgWU1hcClcbiAgICogICAvLyAuLiB3aGVuIGFjY2Vzc2luZyB0aGUgdHlwZSB1c2UgeS5fbWFwLmdldChuYW1lKVxuICAgKiAgIHkuc2hhcmUubXlBcnJheS5pbnNlcnQoLi4pXG4gICAqICAgeS5zaGFyZS5teU1hcC5zZXQoLi4pXG4gICAqXG4gICAqICAgLy8gT3B0aW9uMlxuICAgKiAgIGNvbnN0IHkgPSBuZXcgWSguLilcbiAgICogICAvLyAuLiB3aGVuIGFjY2Vzc2luZyB0aGUgdHlwZSB1c2UgYHkuZGVmaW5lKC4uKWBcbiAgICogICB5LmRlZmluZSgnbXlBcnJheScsIFlBcnJheSkuaW5zZXJ0KC4uKVxuICAgKiAgIHkuZGVmaW5lKCdteU1hcCcsIFlNYXApLnNldCguLilcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gVHlwZUNvbnN0cnVjdG9yIFRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgdHlwZSBkZWZpbml0aW9uXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjcmVhdGVkIHR5cGUuIENvbnN0cnVjdGVkIHdpdGggVHlwZUNvbnN0cnVjdG9yXG4gICAqL1xuICBkZWZpbmUgKG5hbWUsIFR5cGVDb25zdHJ1Y3Rvcikge1xuICAgIGxldCBpZCA9IGNyZWF0ZVJvb3RJRChuYW1lLCBUeXBlQ29uc3RydWN0b3IpO1xuICAgIGxldCB0eXBlID0gdGhpcy5vcy5nZXQoaWQpO1xuICAgIGlmICh0aGlzLl9tYXAuZ2V0KG5hbWUpID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX21hcC5zZXQobmFtZSwgdHlwZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9tYXAuZ2V0KG5hbWUpICE9PSB0eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1R5cGUgaXMgYWxyZWFkeSBkZWZpbmVkIHdpdGggYSBkaWZmZXJlbnQgY29uc3RydWN0b3InKVxuICAgIH1cbiAgICByZXR1cm4gdHlwZVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGRlZmluZWQgdHlwZS4gVGhlIHR5cGUgbXVzdCBiZSBkZWZpbmVkIGxvY2FsbHkuIEZpcnN0IGRlZmluZSB0aGVcbiAgICogdHlwZSB3aXRoIHtAbGluayBkZWZpbmV9LlxuICAgKlxuICAgKiBUaGlzIHJldHVybnMgdGhlIHNhbWUgdmFsdWUgYXMgYHkuc2hhcmVbbmFtZV1gXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSB0eXBlbmFtZVxuICAgKiBAcmV0dXJuIHthbnl9XG4gICAqL1xuICBnZXQgKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwLmdldChuYW1lKVxuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3QgZnJvbSB0aGUgcm9vbSwgYW5kIGRlc3Ryb3kgYWxsIHRyYWNlcyBvZiB0aGlzIFlqcyBpbnN0YW5jZS5cbiAgICovXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuZW1pdCgnZGVzdHJveWVkJywgdHJ1ZSk7XG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuX21hcCA9IG51bGw7XG4gICAgdGhpcy5vcyA9IG51bGw7XG4gICAgdGhpcy5kcyA9IG51bGw7XG4gICAgdGhpcy5zcyA9IG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBAbW9kdWxlIHN0cnVjdHNcbiAqL1xuXG5jbGFzcyBJdGVtSlNPTiBleHRlbmRzIEl0ZW0ge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jb250ZW50ID0gbnVsbDtcbiAgfVxuICBfY29weSAoKSB7XG4gICAgbGV0IHN0cnVjdCA9IHN1cGVyLl9jb3B5KCk7XG4gICAgc3RydWN0Ll9jb250ZW50ID0gdGhpcy5fY29udGVudDtcbiAgICByZXR1cm4gc3RydWN0XG4gIH1cbiAgZ2V0IF9sZW5ndGggKCkge1xuICAgIGNvbnN0IGMgPSB0aGlzLl9jb250ZW50O1xuICAgIHJldHVybiBjICE9PSBudWxsID8gYy5sZW5ndGggOiAwXG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7WX0geVxuICAgKiBAcGFyYW0ge2RlY29kaW5nLkRlY29kZXJ9IGRlY29kZXJcbiAgICovXG4gIF9mcm9tQmluYXJ5ICh5LCBkZWNvZGVyKSB7XG4gICAgbGV0IG1pc3NpbmcgPSBzdXBlci5fZnJvbUJpbmFyeSh5LCBkZWNvZGVyKTtcbiAgICBsZXQgbGVuID0gcmVhZFZhclVpbnQoZGVjb2Rlcik7XG4gICAgdGhpcy5fY29udGVudCA9IG5ldyBBcnJheShsZW4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGN0bnQgPSByZWFkVmFyU3RyaW5nKGRlY29kZXIpO1xuICAgICAgbGV0IHBhcnNlZDtcbiAgICAgIGlmIChjdG50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwYXJzZWQgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWQgPSBKU09OLnBhcnNlKGN0bnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29udGVudFtpXSA9IHBhcnNlZDtcbiAgICB9XG4gICAgcmV0dXJuIG1pc3NpbmdcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtlbmNvZGluZy5FbmNvZGVyfSBlbmNvZGVyXG4gICAqL1xuICBfdG9CaW5hcnkgKGVuY29kZXIpIHtcbiAgICBzdXBlci5fdG9CaW5hcnkoZW5jb2Rlcik7XG4gICAgY29uc3QgbGVuID0gdGhpcy5fbGVuZ3RoO1xuICAgIHdyaXRlVmFyVWludChlbmNvZGVyLCBsZW4pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxldCBlbmNvZGVkO1xuICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuX2NvbnRlbnRbaV07XG4gICAgICBpZiAoY29udGVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVuY29kZWQgPSAndW5kZWZpbmVkJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVuY29kZWQgPSBKU09OLnN0cmluZ2lmeShjb250ZW50KTtcbiAgICAgIH1cbiAgICAgIHdyaXRlVmFyU3RyaW5nKGVuY29kZXIsIGVuY29kZWQpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVHJhbnNmb3JtIHRoaXMgWVhtbCBUeXBlIHRvIGEgcmVhZGFibGUgZm9ybWF0LlxuICAgKiBVc2VmdWwgZm9yIGxvZ2dpbmcgYXMgYWxsIEl0ZW1zIGFuZCBEZWxldGUgaW1wbGVtZW50IHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2xvZ1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIGxvZ0l0ZW1IZWxwZXIoJ0l0ZW1KU09OJywgdGhpcywgYGNvbnRlbnQ6JHtKU09OLnN0cmluZ2lmeSh0aGlzLl9jb250ZW50KX1gKVxuICB9XG4gIF9zcGxpdEF0ICh5LCBkaWZmKSB7XG4gICAgaWYgKGRpZmYgPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSBlbHNlIGlmIChkaWZmID49IHRoaXMuX2xlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JpZ2h0XG4gICAgfVxuICAgIGxldCBpdGVtID0gbmV3IEl0ZW1KU09OKCk7XG4gICAgaXRlbS5fY29udGVudCA9IHRoaXMuX2NvbnRlbnQuc3BsaWNlKGRpZmYpO1xuICAgIHNwbGl0SGVscGVyKHksIHRoaXMsIGl0ZW0sIGRpZmYpO1xuICAgIHJldHVybiBpdGVtXG4gIH1cbn1cblxuLyoqXG4gKiBAbW9kdWxlIHN0cnVjdHNcbiAqL1xuXG5jbGFzcyBJdGVtU3RyaW5nIGV4dGVuZHMgSXRlbSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2NvbnRlbnQgPSBudWxsO1xuICB9XG4gIF9jb3B5ICgpIHtcbiAgICBsZXQgc3RydWN0ID0gc3VwZXIuX2NvcHkoKTtcbiAgICBzdHJ1Y3QuX2NvbnRlbnQgPSB0aGlzLl9jb250ZW50O1xuICAgIHJldHVybiBzdHJ1Y3RcbiAgfVxuICBnZXQgX2xlbmd0aCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRlbnQubGVuZ3RoXG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7WX0geVxuICAgKiBAcGFyYW0ge2RlY29kaW5nLkRlY29kZXJ9IGRlY29kZXJcbiAgICovXG4gIF9mcm9tQmluYXJ5ICh5LCBkZWNvZGVyKSB7XG4gICAgbGV0IG1pc3NpbmcgPSBzdXBlci5fZnJvbUJpbmFyeSh5LCBkZWNvZGVyKTtcbiAgICB0aGlzLl9jb250ZW50ID0gcmVhZFZhclN0cmluZyhkZWNvZGVyKTtcbiAgICByZXR1cm4gbWlzc2luZ1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge2VuY29kaW5nLkVuY29kZXJ9IGVuY29kZXJcbiAgICovXG4gIF90b0JpbmFyeSAoZW5jb2Rlcikge1xuICAgIHN1cGVyLl90b0JpbmFyeShlbmNvZGVyKTtcbiAgICB3cml0ZVZhclN0cmluZyhlbmNvZGVyLCB0aGlzLl9jb250ZW50KTtcbiAgfVxuICAvKipcbiAgICogVHJhbnNmb3JtIHRoaXMgWVhtbCBUeXBlIHRvIGEgcmVhZGFibGUgZm9ybWF0LlxuICAgKiBVc2VmdWwgZm9yIGxvZ2dpbmcgYXMgYWxsIEl0ZW1zIGFuZCBEZWxldGUgaW1wbGVtZW50IHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2xvZ1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIGxvZ0l0ZW1IZWxwZXIoJ0l0ZW1TdHJpbmcnLCB0aGlzLCBgY29udGVudDpcIiR7dGhpcy5fY29udGVudH1cImApXG4gIH1cbiAgX3NwbGl0QXQgKHksIGRpZmYpIHtcbiAgICBpZiAoZGlmZiA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9IGVsc2UgaWYgKGRpZmYgPj0gdGhpcy5fbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmlnaHRcbiAgICB9XG4gICAgbGV0IGl0ZW0gPSBuZXcgSXRlbVN0cmluZygpO1xuICAgIGl0ZW0uX2NvbnRlbnQgPSB0aGlzLl9jb250ZW50LnNsaWNlKGRpZmYpO1xuICAgIHRoaXMuX2NvbnRlbnQgPSB0aGlzLl9jb250ZW50LnNsaWNlKDAsIGRpZmYpO1xuICAgIHNwbGl0SGVscGVyKHksIHRoaXMsIGl0ZW0sIGRpZmYpO1xuICAgIHJldHVybiBpdGVtXG4gIH1cbn1cblxuLyoqXG4gKiBAbW9kdWxlIHN0cnVjdHNcbiAqL1xuXG5jbGFzcyBJdGVtRm9ybWF0IGV4dGVuZHMgSXRlbSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMua2V5ID0gbnVsbDtcbiAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgfVxuICBfY29weSAodW5kZWxldGVDaGlsZHJlbiwgY29weVBvc2l0aW9uKSB7XG4gICAgbGV0IHN0cnVjdCA9IHN1cGVyLl9jb3B5KCk7XG4gICAgc3RydWN0LmtleSA9IHRoaXMua2V5O1xuICAgIHN0cnVjdC52YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgcmV0dXJuIHN0cnVjdFxuICB9XG4gIGdldCBfbGVuZ3RoICgpIHtcbiAgICByZXR1cm4gMVxuICB9XG4gIGdldCBfY291bnRhYmxlICgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtZfSB5XG4gICAqIEBwYXJhbSB7ZGVjb2RpbmcuRGVjb2Rlcn0gZGVjb2RlclxuICAgKi9cbiAgX2Zyb21CaW5hcnkgKHksIGRlY29kZXIpIHtcbiAgICBjb25zdCBtaXNzaW5nID0gc3VwZXIuX2Zyb21CaW5hcnkoeSwgZGVjb2Rlcik7XG4gICAgdGhpcy5rZXkgPSByZWFkVmFyU3RyaW5nKGRlY29kZXIpO1xuICAgIHRoaXMudmFsdWUgPSBKU09OLnBhcnNlKHJlYWRWYXJTdHJpbmcoZGVjb2RlcikpO1xuICAgIHJldHVybiBtaXNzaW5nXG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZW5jb2RpbmcuRW5jb2Rlcn0gZW5jb2RlclxuICAgKi9cbiAgX3RvQmluYXJ5IChlbmNvZGVyKSB7XG4gICAgc3VwZXIuX3RvQmluYXJ5KGVuY29kZXIpO1xuICAgIHdyaXRlVmFyU3RyaW5nKGVuY29kZXIsIHRoaXMua2V5KTtcbiAgICB3cml0ZVZhclN0cmluZyhlbmNvZGVyLCBKU09OLnN0cmluZ2lmeSh0aGlzLnZhbHVlKSk7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0aGlzIFlYbWwgVHlwZSB0byBhIHJlYWRhYmxlIGZvcm1hdC5cbiAgICogVXNlZnVsIGZvciBsb2dnaW5nIGFzIGFsbCBJdGVtcyBhbmQgRGVsZXRlIGltcGxlbWVudCB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9sb2dTdHJpbmcgKCkge1xuICAgIHJldHVybiBsb2dJdGVtSGVscGVyKCdJdGVtRm9ybWF0JywgdGhpcywgYGtleToke0pTT04uc3RyaW5naWZ5KHRoaXMua2V5KX0sdmFsdWU6JHtKU09OLnN0cmluZ2lmeSh0aGlzLnZhbHVlKX1gKVxuICB9XG59XG5cbi8qKlxuICogQG1vZHVsZSBzdHJ1Y3RzXG4gKi9cblxuY2xhc3MgSXRlbUVtYmVkIGV4dGVuZHMgSXRlbSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZW1iZWQgPSBudWxsO1xuICB9XG4gIF9jb3B5ICh1bmRlbGV0ZUNoaWxkcmVuLCBjb3B5UG9zaXRpb24pIHtcbiAgICBsZXQgc3RydWN0ID0gc3VwZXIuX2NvcHkoKTtcbiAgICBzdHJ1Y3QuZW1iZWQgPSB0aGlzLmVtYmVkO1xuICAgIHJldHVybiBzdHJ1Y3RcbiAgfVxuICBnZXQgX2xlbmd0aCAoKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtZfSB5XG4gICAqIEBwYXJhbSB7ZGVjb2RpbmcuRGVjb2Rlcn0gZGVjb2RlclxuICAgKi9cbiAgX2Zyb21CaW5hcnkgKHksIGRlY29kZXIpIHtcbiAgICBjb25zdCBtaXNzaW5nID0gc3VwZXIuX2Zyb21CaW5hcnkoeSwgZGVjb2Rlcik7XG4gICAgdGhpcy5lbWJlZCA9IEpTT04ucGFyc2UocmVhZFZhclN0cmluZyhkZWNvZGVyKSk7XG4gICAgcmV0dXJuIG1pc3NpbmdcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtlbmNvZGluZy5FbmNvZGVyfSBlbmNvZGVyXG4gICAqL1xuICBfdG9CaW5hcnkgKGVuY29kZXIpIHtcbiAgICBzdXBlci5fdG9CaW5hcnkoZW5jb2Rlcik7XG4gICAgd3JpdGVWYXJTdHJpbmcoZW5jb2RlciwgSlNPTi5zdHJpbmdpZnkodGhpcy5lbWJlZCkpO1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gdGhpcyBZWG1sIFR5cGUgdG8gYSByZWFkYWJsZSBmb3JtYXQuXG4gICAqIFVzZWZ1bCBmb3IgbG9nZ2luZyBhcyBhbGwgSXRlbXMgYW5kIERlbGV0ZSBpbXBsZW1lbnQgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbG9nU3RyaW5nICgpIHtcbiAgICByZXR1cm4gbG9nSXRlbUhlbHBlcignSXRlbUVtYmVkJywgdGhpcywgYGVtYmVkOiR7SlNPTi5zdHJpbmdpZnkodGhpcy5lbWJlZCl9YClcbiAgfVxufVxuXG4vKipcbiAqIEBtb2R1bGUgc3RydWN0c1xuICovXG5cbmNsYXNzIEl0ZW1CaW5hcnkgZXh0ZW5kcyBJdGVtIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY29udGVudCA9IG51bGw7XG4gIH1cbiAgX2NvcHkgKCkge1xuICAgIGxldCBzdHJ1Y3QgPSBzdXBlci5fY29weSgpO1xuICAgIHN0cnVjdC5fY29udGVudCA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgcmV0dXJuIHN0cnVjdFxuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge1l9IHlcbiAgICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyXG4gICAqL1xuICBfZnJvbUJpbmFyeSAoeSwgZGVjb2Rlcikge1xuICAgIGNvbnN0IG1pc3NpbmcgPSBzdXBlci5fZnJvbUJpbmFyeSh5LCBkZWNvZGVyKTtcbiAgICB0aGlzLl9jb250ZW50ID0gcmVhZFBheWxvYWQoZGVjb2Rlcik7XG4gICAgcmV0dXJuIG1pc3NpbmdcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtlbmNvZGluZy5FbmNvZGVyfSBlbmNvZGVyXG4gICAqL1xuICBfdG9CaW5hcnkgKGVuY29kZXIpIHtcbiAgICBzdXBlci5fdG9CaW5hcnkoZW5jb2Rlcik7XG4gICAgd3JpdGVQYXlsb2FkKGVuY29kZXIsIHRoaXMuX2NvbnRlbnQpO1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gdGhpcyBZWG1sIFR5cGUgdG8gYSByZWFkYWJsZSBmb3JtYXQuXG4gICAqIFVzZWZ1bCBmb3IgbG9nZ2luZyBhcyBhbGwgSXRlbXMgYW5kIERlbGV0ZSBpbXBsZW1lbnQgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbG9nU3RyaW5nICgpIHtcbiAgICByZXR1cm4gbG9nSXRlbUhlbHBlcignSXRlbUJpbmFyeScsIHRoaXMpXG4gIH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtJdGVtfSBpdGVtXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL3Byb3RvY29scy9oaXN0b3J5XCIpLkhpc3RvcnlTbmFwc2hvdH0gW3NuYXBzaG90XVxuICovXG5jb25zdCBpc1Zpc2libGUgPSAoaXRlbSwgc25hcHNob3QpID0+IHNuYXBzaG90ID09PSB1bmRlZmluZWQgPyAhaXRlbS5fZGVsZXRlZCA6IChzbmFwc2hvdC5zbS5oYXMoaXRlbS5faWQudXNlcikgJiYgc25hcHNob3Quc20uZ2V0KGl0ZW0uX2lkLnVzZXIpID4gaXRlbS5faWQuY2xvY2sgJiYgIXNuYXBzaG90LmRzLmlzRGVsZXRlZChpdGVtLl9pZCkpO1xuXG4vKipcbiAqIEBtb2R1bGUgdHlwZXNcbiAqL1xuXG4vKipcbiAqIEV2ZW50IHRoYXQgZGVzY3JpYmVzIHRoZSBjaGFuZ2VzIG9uIGEgWUFycmF5XG4gKi9cbmNsYXNzIFlBcnJheUV2ZW50IGV4dGVuZHMgWUV2ZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7WUFycmF5fSB5YXJyYXkgVGhlIGNoYW5nZWQgdHlwZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW90ZSBXaGV0aGVyIHRoZSBjaGFuZ2VkIHdhcyBjYXVzZWQgYnkgYSByZW1vdGUgcGVlclxuICAgKiBAcGFyYW0ge1RyYW5zYWN0aW9ufSB0cmFuc2FjdGlvbiBUaGUgdHJhbnNhY3Rpb24gb2JqZWN0XG4gICAqL1xuICBjb25zdHJ1Y3RvciAoeWFycmF5LCByZW1vdGUsIHRyYW5zYWN0aW9uKSB7XG4gICAgc3VwZXIoeWFycmF5KTtcbiAgICB0aGlzLnJlbW90ZSA9IHJlbW90ZTtcbiAgICB0aGlzLl90cmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uO1xuICAgIHRoaXMuX2FkZGVkRWxlbWVudHMgPSBudWxsO1xuICAgIHRoaXMuX3JlbW92ZWRFbGVtZW50cyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2hpbGQgZWxlbWVudHMgdGhhdCB3ZXJlIGFkZGVkIGluIHRoaXMgdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm4ge1NldH1cbiAgICovXG4gIGdldCBhZGRlZEVsZW1lbnRzICgpIHtcbiAgICBpZiAodGhpcy5fYWRkZWRFbGVtZW50cyA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IHRoaXMuX3RyYW5zYWN0aW9uO1xuICAgICAgY29uc3QgYWRkZWRFbGVtZW50cyA9IG5ldyBTZXQoKTtcbiAgICAgIHRyYW5zYWN0aW9uLm5ld1R5cGVzLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgIGlmICh0eXBlLl9wYXJlbnQgPT09IHRhcmdldCAmJiAhdHJhbnNhY3Rpb24uZGVsZXRlZFN0cnVjdHMuaGFzKHR5cGUpKSB7XG4gICAgICAgICAgYWRkZWRFbGVtZW50cy5hZGQodHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5fYWRkZWRFbGVtZW50cyA9IGFkZGVkRWxlbWVudHM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9hZGRlZEVsZW1lbnRzXG4gIH1cblxuICAvKipcbiAgICogQ2hpbGQgZWxlbWVudHMgdGhhdCB3ZXJlIHJlbW92ZWQgaW4gdGhpcyB0cmFuc2FjdGlvbi5cbiAgICpcbiAgICogQHJldHVybiB7U2V0fVxuICAgKi9cbiAgZ2V0IHJlbW92ZWRFbGVtZW50cyAoKSB7XG4gICAgaWYgKHRoaXMuX3JlbW92ZWRFbGVtZW50cyA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IHRoaXMuX3RyYW5zYWN0aW9uO1xuICAgICAgY29uc3QgcmVtb3ZlZEVsZW1lbnRzID0gbmV3IFNldCgpO1xuICAgICAgdHJhbnNhY3Rpb24uZGVsZXRlZFN0cnVjdHMuZm9yRWFjaChzdHJ1Y3QgPT4ge1xuICAgICAgICBpZiAoc3RydWN0Ll9wYXJlbnQgPT09IHRhcmdldCAmJiAhdHJhbnNhY3Rpb24ubmV3VHlwZXMuaGFzKHN0cnVjdCkpIHtcbiAgICAgICAgICByZW1vdmVkRWxlbWVudHMuYWRkKHN0cnVjdCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5fcmVtb3ZlZEVsZW1lbnRzID0gcmVtb3ZlZEVsZW1lbnRzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVtb3ZlZEVsZW1lbnRzXG4gIH1cbn1cblxuLyoqXG4gKiBBIHNoYXJlZCBBcnJheSBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuY2xhc3MgWUFycmF5IGV4dGVuZHMgVHlwZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBZQXJyYXkgRXZlbnQgYW5kIGNhbGxzIG9ic2VydmVycy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jYWxsT2JzZXJ2ZXIgKHRyYW5zYWN0aW9uLCBwYXJlbnRTdWJzLCByZW1vdGUpIHtcbiAgICB0aGlzLl9jYWxsRXZlbnRIYW5kbGVyKHRyYW5zYWN0aW9uLCBuZXcgWUFycmF5RXZlbnQodGhpcywgcmVtb3RlLCB0cmFuc2FjdGlvbikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGktdGggZWxlbWVudCBmcm9tIGEgWUFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIHJldHVybiBmcm9tIHRoZSBZQXJyYXlcbiAgICogQHJldHVybiB7YW55fVxuICAgKi9cbiAgZ2V0IChpbmRleCkge1xuICAgIGxldCBuID0gdGhpcy5fc3RhcnQ7XG4gICAgd2hpbGUgKG4gIT09IG51bGwpIHtcbiAgICAgIGlmICghbi5fZGVsZXRlZCAmJiBuLl9jb3VudGFibGUpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgbi5fbGVuZ3RoKSB7XG4gICAgICAgICAgc3dpdGNoIChuLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICBjYXNlIEl0ZW1KU09OOlxuICAgICAgICAgICAgY2FzZSBJdGVtU3RyaW5nOlxuICAgICAgICAgICAgICByZXR1cm4gbi5fY29udGVudFtpbmRleF1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHJldHVybiBuXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGluZGV4IC09IG4uX2xlbmd0aDtcbiAgICAgIH1cbiAgICAgIG4gPSBuLl9yaWdodDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGlzIFlBcnJheSB0byBhIEphdmFTY3JpcHQgQXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc25hcHNob3RdXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cbiAgdG9BcnJheSAoc25hcHNob3QpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoYyA9PiBjLCBzbmFwc2hvdClcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoaXMgU2hhcmVkIFR5cGUgdG8gYSBKU09OIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybiB7QXJyYXl9XG4gICAqL1xuICB0b0pTT04gKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChjID0+IHtcbiAgICAgIGlmIChjIGluc3RhbmNlb2YgVHlwZSkge1xuICAgICAgICByZXR1cm4gYy50b0pTT04oKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gQXJyYXkgd2l0aCB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgYSBwcm92aWRlZCBmdW5jdGlvbiBvbiBldmVyeVxuICAgKiBlbGVtZW50IG9mIHRoaXMgWUFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmIEZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgYW4gZWxlbWVudCBvZiB0aGUgbmV3IEFycmF5XG4gICAqIEBwYXJhbSB7aW1wb3J0KCcuLi9wcm90b2NvbHMvaGlzdG9yeS5qcycpLkhpc3RvcnlTbmFwc2hvdH0gW3NuYXBzaG90XVxuICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkgd2l0aCBlYWNoIGVsZW1lbnQgYmVpbmcgdGhlIHJlc3VsdCBvZiB0aGVcbiAgICogICAgICAgICAgICAgICAgIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICBtYXAgKGYsIHNuYXBzaG90KSB7XG4gICAgY29uc3QgcmVzID0gW107XG4gICAgdGhpcy5mb3JFYWNoKChjLCBpKSA9PiB7XG4gICAgICByZXMucHVzaChmKGMsIGksIHRoaXMpKTtcbiAgICB9LCBzbmFwc2hvdCk7XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIGEgcHJvdmlkZWQgZnVuY3Rpb24gb24gb25jZSBvbiBvdmVyeSBlbGVtZW50IG9mIHRoaXMgWUFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmIEEgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBldmVyeSBlbGVtZW50IG9mIHRoaXMgWUFycmF5LlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnLi4vcHJvdG9jb2xzL2hpc3RvcnkuanMnKS5IaXN0b3J5U25hcHNob3R9IFtzbmFwc2hvdF1cbiAgICovXG4gIGZvckVhY2ggKGYsIHNuYXBzaG90KSB7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBsZXQgbiA9IHRoaXMuX3N0YXJ0O1xuICAgIHdoaWxlIChuICE9PSBudWxsKSB7XG4gICAgICBpZiAoaXNWaXNpYmxlKG4sIHNuYXBzaG90KSAmJiBuLl9jb3VudGFibGUpIHtcbiAgICAgICAgaWYgKG4gaW5zdGFuY2VvZiBUeXBlKSB7XG4gICAgICAgICAgZihuLCBpbmRleCsrLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmIChuLmNvbnN0cnVjdG9yID09PSBJdGVtQmluYXJ5KSB7XG4gICAgICAgICAgZihuLl9jb250ZW50LCBpbmRleCsrLCB0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gbi5fY29udGVudDtcbiAgICAgICAgICBjb25zdCBjb250ZW50TGVuID0gY29udGVudC5sZW5ndGg7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50TGVuOyBpKyspIHtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBmKGNvbnRlbnRbaV0sIGluZGV4LCB0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG4gPSBuLl9yaWdodDtcbiAgICB9XG4gIH1cblxuICBbU3ltYm9sLml0ZXJhdG9yXSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuX2l0ZW0gIT09IG51bGwgJiYgKHRoaXMuX2l0ZW0uX2RlbGV0ZWQgfHwgdGhpcy5faXRlbS5fbGVuZ3RoIDw9IHRoaXMuX2l0ZW1FbGVtZW50KSkge1xuICAgICAgICAgIC8vIGl0ZW0gaXMgZGVsZXRlZCBvciBpdGVtRWxlbWVudCBkb2VzIG5vdCBleGlzdCAoaXMgZGVsZXRlZClcbiAgICAgICAgICB0aGlzLl9pdGVtID0gdGhpcy5faXRlbS5fcmlnaHQ7XG4gICAgICAgICAgdGhpcy5faXRlbUVsZW1lbnQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pdGVtID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRvbmU6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbnRlbnQ7XG4gICAgICAgIGlmICh0aGlzLl9pdGVtIGluc3RhbmNlb2YgVHlwZSkge1xuICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLl9pdGVtO1xuICAgICAgICAgIHRoaXMuX2l0ZW0gPSB0aGlzLl9pdGVtLl9yaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250ZW50ID0gdGhpcy5faXRlbS5fY29udGVudFt0aGlzLl9pdGVtRWxlbWVudCsrXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiBjb250ZW50LFxuICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfaXRlbTogdGhpcy5fc3RhcnQsXG4gICAgICBfaXRlbUVsZW1lbnQ6IDAsXG4gICAgICBfY291bnQ6IDBcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyBlbGVtZW50cyBzdGFydGluZyBmcm9tIGFuIGluZGV4LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggYXQgd2hpY2ggdG8gc3RhcnQgZGVsZXRpbmcgZWxlbWVudHNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRvIHJlbW92ZS4gRGVmYXVsdHMgdG8gMS5cbiAgICovXG4gIGRlbGV0ZSAoaW5kZXgsIGxlbmd0aCA9IDEpIHtcbiAgICB0aGlzLl95LnRyYW5zYWN0KCgpID0+IHtcbiAgICAgIGxldCBpdGVtID0gdGhpcy5fc3RhcnQ7XG4gICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgd2hpbGUgKGl0ZW0gIT09IG51bGwgJiYgbGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoIWl0ZW0uX2RlbGV0ZWQgJiYgaXRlbS5fY291bnRhYmxlKSB7XG4gICAgICAgICAgaWYgKGNvdW50IDw9IGluZGV4ICYmIGluZGV4IDwgY291bnQgKyBpdGVtLl9sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmZEZWwgPSBpbmRleCAtIGNvdW50O1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0uX3NwbGl0QXQodGhpcy5feSwgZGlmZkRlbCk7XG4gICAgICAgICAgICBpdGVtLl9zcGxpdEF0KHRoaXMuX3ksIGxlbmd0aCk7XG4gICAgICAgICAgICBsZW5ndGggLT0gaXRlbS5fbGVuZ3RoO1xuICAgICAgICAgICAgaXRlbS5fZGVsZXRlKHRoaXMuX3kpO1xuICAgICAgICAgICAgY291bnQgKz0gZGlmZkRlbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnQgKz0gaXRlbS5fbGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpdGVtID0gaXRlbS5fcmlnaHQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGVsZXRlIGV4Y2VlZHMgdGhlIHJhbmdlIG9mIHRoZSBZQXJyYXknKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnRzIGNvbnRlbnQgYWZ0ZXIgYW4gZWxlbWVudCBjb250YWluZXIuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7SXRlbX0gbGVmdCBUaGUgZWxlbWVudCBjb250YWluZXIgdG8gdXNlIGFzIGEgcmVmZXJlbmNlLlxuICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcnxzdHJpbmd8T2JqZWN0fEFycmF5QnVmZmVyPn0gY29udGVudCBUaGUgQXJyYXkgb2YgY29udGVudCB0byBpbnNlcnQgKHNlZSB7QHNlZSBpbnNlcnR9KVxuICAgKi9cbiAgaW5zZXJ0QWZ0ZXIgKGxlZnQsIGNvbnRlbnQpIHtcbiAgICB0aGlzLl90cmFuc2FjdCh5ID0+IHtcbiAgICAgIGxldCByaWdodDtcbiAgICAgIGlmIChsZWZ0ID09PSBudWxsKSB7XG4gICAgICAgIHJpZ2h0ID0gdGhpcy5fc3RhcnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByaWdodCA9IGxlZnQuX3JpZ2h0O1xuICAgICAgfVxuICAgICAgbGV0IHByZXZKc29uSW5zID0gbnVsbDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYyA9IGNvbnRlbnRbaV07XG4gICAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGMgPSBuZXcgYygpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5ldy1jYXBcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyBpbnN0YW5jZW9mIFR5cGUpIHtcbiAgICAgICAgICBpZiAocHJldkpzb25JbnMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHByZXZKc29uSW5zLl9pbnRlZ3JhdGUoeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZWZ0ID0gcHJldkpzb25JbnM7XG4gICAgICAgICAgICBwcmV2SnNvbklucyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGMuX29yaWdpbiA9IGxlZnQ7XG4gICAgICAgICAgYy5fbGVmdCA9IGxlZnQ7XG4gICAgICAgICAgYy5fcmlnaHQgPSByaWdodDtcbiAgICAgICAgICBjLl9yaWdodF9vcmlnaW4gPSByaWdodDtcbiAgICAgICAgICBjLl9wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgIGlmICh5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjLl9pbnRlZ3JhdGUoeSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChsZWZ0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydCA9IGM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlZnQuX3JpZ2h0ID0gYztcbiAgICAgICAgICB9XG4gICAgICAgICAgbGVmdCA9IGM7XG4gICAgICAgIH0gZWxzZSBpZiAoYy5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICBpZiAocHJldkpzb25JbnMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHByZXZKc29uSW5zLl9pbnRlZ3JhdGUoeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZWZ0ID0gcHJldkpzb25JbnM7XG4gICAgICAgICAgICBwcmV2SnNvbklucyA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGl0ZW1CaW5hcnkgPSBuZXcgSXRlbUJpbmFyeSgpO1xuICAgICAgICAgIGl0ZW1CaW5hcnkuX29yaWdpbiA9IGxlZnQ7XG4gICAgICAgICAgaXRlbUJpbmFyeS5fbGVmdCA9IGxlZnQ7XG4gICAgICAgICAgaXRlbUJpbmFyeS5fcmlnaHQgPSByaWdodDtcbiAgICAgICAgICBpdGVtQmluYXJ5Ll9yaWdodF9vcmlnaW4gPSByaWdodDtcbiAgICAgICAgICBpdGVtQmluYXJ5Ll9wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgIGl0ZW1CaW5hcnkuX2NvbnRlbnQgPSBjO1xuICAgICAgICAgIGlmICh5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpdGVtQmluYXJ5Ll9pbnRlZ3JhdGUoeSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChsZWZ0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydCA9IGl0ZW1CaW5hcnk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlZnQuX3JpZ2h0ID0gaXRlbUJpbmFyeTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGVmdCA9IGl0ZW1CaW5hcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHByZXZKc29uSW5zID09PSBudWxsKSB7XG4gICAgICAgICAgICBwcmV2SnNvbklucyA9IG5ldyBJdGVtSlNPTigpO1xuICAgICAgICAgICAgcHJldkpzb25JbnMuX29yaWdpbiA9IGxlZnQ7XG4gICAgICAgICAgICBwcmV2SnNvbklucy5fbGVmdCA9IGxlZnQ7XG4gICAgICAgICAgICBwcmV2SnNvbklucy5fcmlnaHQgPSByaWdodDtcbiAgICAgICAgICAgIHByZXZKc29uSW5zLl9yaWdodF9vcmlnaW4gPSByaWdodDtcbiAgICAgICAgICAgIHByZXZKc29uSW5zLl9wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgcHJldkpzb25JbnMuX2NvbnRlbnQgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJldkpzb25JbnMuX2NvbnRlbnQucHVzaChjKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByZXZKc29uSW5zICE9PSBudWxsKSB7XG4gICAgICAgIGlmICh5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcHJldkpzb25JbnMuX2ludGVncmF0ZSh5KTtcbiAgICAgICAgfSBlbHNlIGlmIChwcmV2SnNvbklucy5fbGVmdCA9PT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gcHJldkpzb25JbnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGVmdC5fcmlnaHQgPSBwcmV2SnNvbklucztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb250ZW50XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0cyBuZXcgY29udGVudCBhdCBhbiBpbmRleC5cbiAgICpcbiAgICogSW1wb3J0YW50OiBUaGlzIGZ1bmN0aW9uIGV4cGVjdHMgYW4gYXJyYXkgb2YgY29udGVudC4gTm90IGp1c3QgYSBjb250ZW50XG4gICAqIG9iamVjdC4gVGhlIHJlYXNvbiBmb3IgdGhpcyBcIndlaXJkbmVzc1wiIGlzIHRoYXQgaW5zZXJ0aW5nIHNldmVyYWwgZWxlbWVudHNcbiAgICogaXMgdmVyeSBlZmZpY2llbnQgd2hlbiBpdCBpcyBkb25lIGFzIGEgc2luZ2xlIG9wZXJhdGlvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogIC8vIEluc2VydCBjaGFyYWN0ZXIgJ2EnIGF0IHBvc2l0aW9uIDBcbiAgICogIHlhcnJheS5pbnNlcnQoMCwgWydhJ10pXG4gICAqICAvLyBJbnNlcnQgbnVtYmVycyAxLCAyIGF0IHBvc2l0aW9uIDFcbiAgICogIHlhcnJheS5pbnNlcnQoMiwgWzEsIDJdKVxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggVGhlIGluZGV4IHRvIGluc2VydCBjb250ZW50IGF0LlxuICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcnxzdHJpbmd8QXJyYXlCdWZmZXJ8VHlwZT59IGNvbnRlbnQgVGhlIGFycmF5IG9mIGNvbnRlbnRcbiAgICovXG4gIGluc2VydCAoaW5kZXgsIGNvbnRlbnQpIHtcbiAgICB0aGlzLl90cmFuc2FjdCgoKSA9PiB7XG4gICAgICBsZXQgbGVmdCA9IG51bGw7XG4gICAgICBsZXQgcmlnaHQgPSB0aGlzLl9zdGFydDtcbiAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICBjb25zdCB5ID0gdGhpcy5feTtcbiAgICAgIHdoaWxlIChyaWdodCAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCByaWdodExlbiA9IHJpZ2h0Ll9kZWxldGVkID8gMCA6IChyaWdodC5fbGVuZ3RoIC0gMSk7XG4gICAgICAgIGlmIChjb3VudCA8PSBpbmRleCAmJiBpbmRleCA8PSBjb3VudCArIHJpZ2h0TGVuKSB7XG4gICAgICAgICAgY29uc3Qgc3BsaXREaWZmID0gaW5kZXggLSBjb3VudDtcbiAgICAgICAgICByaWdodCA9IHJpZ2h0Ll9zcGxpdEF0KHksIHNwbGl0RGlmZik7XG4gICAgICAgICAgbGVmdCA9IHJpZ2h0Ll9sZWZ0O1xuICAgICAgICAgIGNvdW50ICs9IHNwbGl0RGlmZjtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmlnaHQuX2RlbGV0ZWQpIHtcbiAgICAgICAgICBjb3VudCArPSByaWdodC5fbGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGxlZnQgPSByaWdodDtcbiAgICAgICAgcmlnaHQgPSByaWdodC5fcmlnaHQ7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggPiBjb3VudCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luZGV4IGV4Y2VlZHMgYXJyYXkgcmFuZ2UhJylcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5zZXJ0QWZ0ZXIobGVmdCwgY29udGVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBjb250ZW50IHRvIHRoaXMgWUFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcnxzdHJpbmd8QXJyYXlCdWZmZXJ8VHlwZT59IGNvbnRlbnQgQXJyYXkgb2YgY29udGVudCB0byBhcHBlbmQuXG4gICAqL1xuICBwdXNoIChjb250ZW50KSB7XG4gICAgbGV0IG4gPSB0aGlzLl9zdGFydDtcbiAgICBsZXQgbGFzdFVuZGVsZXRlZCA9IG51bGw7XG4gICAgd2hpbGUgKG4gIT09IG51bGwpIHtcbiAgICAgIGlmICghbi5fZGVsZXRlZCkge1xuICAgICAgICBsYXN0VW5kZWxldGVkID0gbjtcbiAgICAgIH1cbiAgICAgIG4gPSBuLl9yaWdodDtcbiAgICB9XG4gICAgdGhpcy5pbnNlcnRBZnRlcihsYXN0VW5kZWxldGVkLCBjb250ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gdGhpcyBZWG1sIFR5cGUgdG8gYSByZWFkYWJsZSBmb3JtYXQuXG4gICAqIFVzZWZ1bCBmb3IgbG9nZ2luZyBhcyBhbGwgSXRlbXMgYW5kIERlbGV0ZSBpbXBsZW1lbnQgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbG9nU3RyaW5nICgpIHtcbiAgICByZXR1cm4gbG9nSXRlbUhlbHBlcignWUFycmF5JywgdGhpcywgYHN0YXJ0OiR7c3RyaW5naWZ5SXRlbUlEKHRoaXMuX3N0YXJ0KX1cImApXG4gIH1cbn1cblxuLyoqXG4gKiBAbW9kdWxlIHR5cGVzXG4gKi9cblxuLyoqXG4gKiBFdmVudCB0aGF0IGRlc2NyaWJlcyB0aGUgY2hhbmdlcyBvbiBhIFlNYXAuXG4gKi9cbmNsYXNzIFlNYXBFdmVudCBleHRlbmRzIFlFdmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1lNYXB9IHltYXAgVGhlIFlBcnJheSB0aGF0IGNoYW5nZWQuXG4gICAqIEBwYXJhbSB7U2V0PGFueT59IHN1YnMgVGhlIGtleXMgdGhhdCBjaGFuZ2VkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlbW90ZSBXaGV0aGVyIHRoZSBjaGFuZ2Ugd2FzIGNyZWF0ZWQgYnkgYSByZW1vdGUgcGVlci5cbiAgICovXG4gIGNvbnN0cnVjdG9yICh5bWFwLCBzdWJzLCByZW1vdGUpIHtcbiAgICBzdXBlcih5bWFwKTtcbiAgICB0aGlzLmtleXNDaGFuZ2VkID0gc3VicztcbiAgICB0aGlzLnJlbW90ZSA9IHJlbW90ZTtcbiAgfVxufVxuXG4vKipcbiAqIEEgc2hhcmVkIE1hcCBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuY2xhc3MgWU1hcCBleHRlbmRzIFR5cGUge1xuICAvKipcbiAgICogQ3JlYXRlcyBZTWFwIEV2ZW50IGFuZCBjYWxscyBvYnNlcnZlcnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY2FsbE9ic2VydmVyICh0cmFuc2FjdGlvbiwgcGFyZW50U3VicywgcmVtb3RlKSB7XG4gICAgdGhpcy5fY2FsbEV2ZW50SGFuZGxlcih0cmFuc2FjdGlvbiwgbmV3IFlNYXBFdmVudCh0aGlzLCBwYXJlbnRTdWJzLCByZW1vdGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoaXMgU2hhcmVkIFR5cGUgdG8gYSBKU09OIG9iamVjdC5cbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgdG9KU09OICgpIHtcbiAgICBjb25zdCBtYXAgPSB7fTtcbiAgICBmb3IgKGxldCBba2V5LCBpdGVtXSBvZiB0aGlzLl9tYXApIHtcbiAgICAgIGlmICghaXRlbS5fZGVsZXRlZCkge1xuICAgICAgICBsZXQgcmVzO1xuICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIFR5cGUpIHtcbiAgICAgICAgICBpZiAoaXRlbS50b0pTT04gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzID0gaXRlbS50b0pTT04oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gaXRlbS50b1N0cmluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLmNvbnN0cnVjdG9yID09PSBJdGVtQmluYXJ5KSB7XG4gICAgICAgICAgcmVzID0gaXRlbS5fY29udGVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBpdGVtLl9jb250ZW50WzBdO1xuICAgICAgICB9XG4gICAgICAgIG1hcFtrZXldID0gcmVzO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFwXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUga2V5cyBmb3IgZWFjaCBlbGVtZW50IGluIHRoZSBZTWFwIFR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7aW1wb3J0KCcuLi9wcm90b2NvbHMvaGlzdG9yeS5qcycpLkhpc3RvcnlTbmFwc2hvdH0gW3NuYXBzaG90XVxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIGtleXMgKHNuYXBzaG90KSB7XG4gICAgLy8gVE9ETzogU2hvdWxkIHJldHVybiBlaXRoZXIgSXRlcmF0b3Igb3IgU2V0IVxuICAgIGxldCBrZXlzID0gW107XG4gICAgaWYgKHNuYXBzaG90ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiB0aGlzLl9tYXApIHtcbiAgICAgICAgaWYgKHZhbHVlLl9kZWxldGVkKSB7XG4gICAgICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbWFwLmZvckVhY2goKF8sIGtleSkgPT4ge1xuICAgICAgICBpZiAoWU1hcC5wcm90b3R5cGUuaGFzLmNhbGwodGhpcywga2V5LCBzbmFwc2hvdCkpIHtcbiAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgc3BlY2lmaWVkIGVsZW1lbnQgZnJvbSB0aGlzIFlNYXAuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZWxlbWVudCB0byByZW1vdmUuXG4gICAqL1xuICBkZWxldGUgKGtleSkge1xuICAgIHRoaXMuX3RyYW5zYWN0KCh5KSA9PiB7XG4gICAgICBsZXQgYyA9IHRoaXMuX21hcC5nZXQoa2V5KTtcbiAgICAgIGlmICh5ICE9PSBudWxsICYmIGMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjLl9kZWxldGUoeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBvciB1cGRhdGVzIGFuIGVsZW1lbnQgd2l0aCBhIHNwZWNpZmllZCBrZXkgYW5kIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVsZW1lbnQgdG8gYWRkIHRvIHRoaXMgWU1hcFxuICAgKiBAcGFyYW0ge09iamVjdCB8IHN0cmluZyB8IG51bWJlciB8IFR5cGUgfCBBcnJheUJ1ZmZlciB9IHZhbHVlIFRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCB0byBhZGRcbiAgICovXG4gIHNldCAoa2V5LCB2YWx1ZSkge1xuICAgIHRoaXMuX3RyYW5zYWN0KHkgPT4ge1xuICAgICAgY29uc3Qgb2xkID0gdGhpcy5fbWFwLmdldChrZXkpIHx8IG51bGw7XG4gICAgICBpZiAob2xkICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBvbGQuY29uc3RydWN0b3IgPT09IEl0ZW1KU09OICYmXG4gICAgICAgICAgIW9sZC5fZGVsZXRlZCAmJiBvbGQuX2NvbnRlbnRbMF0gPT09IHZhbHVlXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIFRyeWluZyB0byBvdmVyd3JpdGUgd2l0aCBzYW1lIHZhbHVlXG4gICAgICAgICAgLy8gYnJlYWsgaGVyZVxuICAgICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIGlmICh5ICE9PSBudWxsKSB7XG4gICAgICAgICAgb2xkLl9kZWxldGUoeSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCB2O1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2ID0gbmV3IHZhbHVlKCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbmV3LWNhcFxuICAgICAgICB2YWx1ZSA9IHY7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgSXRlbSkge1xuICAgICAgICB2ID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuICAgICAgICB2ID0gbmV3IEl0ZW1CaW5hcnkoKTtcbiAgICAgICAgdi5fY29udGVudCA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdiA9IG5ldyBJdGVtSlNPTigpO1xuICAgICAgICB2Ll9jb250ZW50ID0gW3ZhbHVlXTtcbiAgICAgIH1cbiAgICAgIHYuX3JpZ2h0ID0gb2xkO1xuICAgICAgdi5fcmlnaHRfb3JpZ2luID0gb2xkO1xuICAgICAgdi5fcGFyZW50ID0gdGhpcztcbiAgICAgIHYuX3BhcmVudFN1YiA9IGtleTtcbiAgICAgIGlmICh5ICE9PSBudWxsKSB7XG4gICAgICAgIHYuX2ludGVncmF0ZSh5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX21hcC5zZXQoa2V5LCB2KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3BlY2lmaWVkIGVsZW1lbnQgZnJvbSB0aGlzIFlNYXAuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZWxlbWVudCB0byByZXR1cm4uXG4gICAqIEBwYXJhbSB7aW1wb3J0KCcuLi9wcm90b2NvbHMvaGlzdG9yeS5qcycpLkhpc3RvcnlTbmFwc2hvdH0gW3NuYXBzaG90XVxuICAgKi9cbiAgZ2V0IChrZXksIHNuYXBzaG90KSB7XG4gICAgbGV0IHYgPSB0aGlzLl9tYXAuZ2V0KGtleSk7XG4gICAgaWYgKHYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbiAgICBpZiAoc25hcHNob3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gaXRlcmF0ZSB1bnRpbCBmb3VuZCBlbGVtZW50IHRoYXQgZXhpc3RzXG4gICAgICB3aGlsZSAoIXNuYXBzaG90LnNtLmhhcyh2Ll9pZC51c2VyKSB8fCB2Ll9pZC5jbG9jayA+PSBzbmFwc2hvdC5zbS5nZXQodi5faWQudXNlcikpIHtcbiAgICAgICAgdiA9IHYuX3JpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNWaXNpYmxlKHYsIHNuYXBzaG90KSkge1xuICAgICAgaWYgKHYgaW5zdGFuY2VvZiBUeXBlKSB7XG4gICAgICAgIHJldHVybiB2XG4gICAgICB9IGVsc2UgaWYgKHYuY29uc3RydWN0b3IgPT09IEl0ZW1CaW5hcnkpIHtcbiAgICAgICAgcmV0dXJuIHYuX2NvbnRlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2Ll9jb250ZW50W3YuX2NvbnRlbnQubGVuZ3RoIC0gMV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQga2V5IGV4aXN0cyBvciBub3QuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSB0byB0ZXN0LlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnLi4vcHJvdG9jb2xzL2hpc3RvcnkuanMnKS5IaXN0b3J5U25hcHNob3R9IFtzbmFwc2hvdF1cbiAgICovXG4gIGhhcyAoa2V5LCBzbmFwc2hvdCkge1xuICAgIGxldCB2ID0gdGhpcy5fbWFwLmdldChrZXkpO1xuICAgIGlmICh2ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoc25hcHNob3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gaXRlcmF0ZSB1bnRpbCBmb3VuZCBlbGVtZW50IHRoYXQgZXhpc3RzXG4gICAgICB3aGlsZSAoIXNuYXBzaG90LnNtLmhhcyh2Ll9pZC51c2VyKSB8fCB2Ll9pZC5jbG9jayA+PSBzbmFwc2hvdC5zbS5nZXQodi5faWQudXNlcikpIHtcbiAgICAgICAgdiA9IHYuX3JpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNWaXNpYmxlKHYsIHNuYXBzaG90KVxuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0aGlzIFlYbWwgVHlwZSB0byBhIHJlYWRhYmxlIGZvcm1hdC5cbiAgICogVXNlZnVsIGZvciBsb2dnaW5nIGFzIGFsbCBJdGVtcyBhbmQgRGVsZXRlIGltcGxlbWVudCB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9sb2dTdHJpbmcgKCkge1xuICAgIHJldHVybiBsb2dJdGVtSGVscGVyKCdZTWFwJywgdGhpcywgYG1hcFNpemU6JHt0aGlzLl9tYXAuc2l6ZX1gKVxuICB9XG59XG5cbi8qKlxuICogQG1vZHVsZSB0eXBlc1xuICovXG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaW50ZWdyYXRlSXRlbSA9IChpdGVtLCBwYXJlbnQsIHksIGxlZnQsIHJpZ2h0KSA9PiB7XG4gIGl0ZW0uX29yaWdpbiA9IGxlZnQ7XG4gIGl0ZW0uX2xlZnQgPSBsZWZ0O1xuICBpdGVtLl9yaWdodCA9IHJpZ2h0O1xuICBpdGVtLl9yaWdodF9vcmlnaW4gPSByaWdodDtcbiAgaXRlbS5fcGFyZW50ID0gcGFyZW50O1xuICBpZiAoeSAhPT0gbnVsbCkge1xuICAgIGl0ZW0uX2ludGVncmF0ZSh5KTtcbiAgfSBlbHNlIGlmIChsZWZ0ID09PSBudWxsKSB7XG4gICAgcGFyZW50Ll9zdGFydCA9IGl0ZW07XG4gIH0gZWxzZSB7XG4gICAgbGVmdC5fcmlnaHQgPSBpdGVtO1xuICB9XG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGZpbmROZXh0UG9zaXRpb24gPSAoY3VycmVudEF0dHJpYnV0ZXMsIHBhcmVudCwgbGVmdCwgcmlnaHQsIGNvdW50KSA9PiB7XG4gIHdoaWxlIChyaWdodCAhPT0gbnVsbCAmJiBjb3VudCA+IDApIHtcbiAgICBzd2l0Y2ggKHJpZ2h0LmNvbnN0cnVjdG9yKSB7XG4gICAgICBjYXNlIEl0ZW1FbWJlZDpcbiAgICAgIGNhc2UgSXRlbVN0cmluZzpcbiAgICAgICAgY29uc3QgcmlnaHRMZW4gPSByaWdodC5fZGVsZXRlZCA/IDAgOiAocmlnaHQuX2xlbmd0aCAtIDEpO1xuICAgICAgICBpZiAoY291bnQgPD0gcmlnaHRMZW4pIHtcbiAgICAgICAgICByaWdodCA9IHJpZ2h0Ll9zcGxpdEF0KHBhcmVudC5feSwgY291bnQpO1xuICAgICAgICAgIGxlZnQgPSByaWdodC5fbGVmdDtcbiAgICAgICAgICByZXR1cm4gW2xlZnQsIHJpZ2h0LCBjdXJyZW50QXR0cmlidXRlc11cbiAgICAgICAgfVxuICAgICAgICBpZiAocmlnaHQuX2RlbGV0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgY291bnQgLT0gcmlnaHQuX2xlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBJdGVtRm9ybWF0OlxuICAgICAgICBpZiAocmlnaHQuX2RlbGV0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgdXBkYXRlQ3VycmVudEF0dHJpYnV0ZXMoY3VycmVudEF0dHJpYnV0ZXMsIHJpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgIH1cbiAgICBsZWZ0ID0gcmlnaHQ7XG4gICAgcmlnaHQgPSByaWdodC5fcmlnaHQ7XG4gIH1cbiAgcmV0dXJuIFtsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXNdXG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGZpbmRQb3NpdGlvbiA9IChwYXJlbnQsIGluZGV4KSA9PiB7XG4gIGxldCBjdXJyZW50QXR0cmlidXRlcyA9IG5ldyBNYXAoKTtcbiAgbGV0IGxlZnQgPSBudWxsO1xuICBsZXQgcmlnaHQgPSBwYXJlbnQuX3N0YXJ0O1xuICByZXR1cm4gZmluZE5leHRQb3NpdGlvbihjdXJyZW50QXR0cmlidXRlcywgcGFyZW50LCBsZWZ0LCByaWdodCwgaW5kZXgpXG59O1xuXG4vKipcbiAqIE5lZ2F0ZSBhcHBsaWVkIGZvcm1hdHNcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpbnNlcnROZWdhdGVkQXR0cmlidXRlcyA9ICh5LCBwYXJlbnQsIGxlZnQsIHJpZ2h0LCBuZWdhdGVkQXR0cmlidXRlcykgPT4ge1xuICAvLyBjaGVjayBpZiB3ZSByZWFsbHkgbmVlZCB0byByZW1vdmUgYXR0cmlidXRlc1xuICB3aGlsZSAoXG4gICAgcmlnaHQgIT09IG51bGwgJiYgKFxuICAgICAgcmlnaHQuX2RlbGV0ZWQgPT09IHRydWUgfHwgKFxuICAgICAgICByaWdodC5jb25zdHJ1Y3RvciA9PT0gSXRlbUZvcm1hdCAmJlxuICAgICAgICAobmVnYXRlZEF0dHJpYnV0ZXMuZ2V0KHJpZ2h0LmtleSkgPT09IHJpZ2h0LnZhbHVlKVxuICAgICAgKVxuICAgIClcbiAgKSB7XG4gICAgaWYgKHJpZ2h0Ll9kZWxldGVkID09PSBmYWxzZSkge1xuICAgICAgbmVnYXRlZEF0dHJpYnV0ZXMuZGVsZXRlKHJpZ2h0LmtleSk7XG4gICAgfVxuICAgIGxlZnQgPSByaWdodDtcbiAgICByaWdodCA9IHJpZ2h0Ll9yaWdodDtcbiAgfVxuICBmb3IgKGxldCBba2V5LCB2YWxdIG9mIG5lZ2F0ZWRBdHRyaWJ1dGVzKSB7XG4gICAgbGV0IGZvcm1hdCA9IG5ldyBJdGVtRm9ybWF0KCk7XG4gICAgZm9ybWF0LmtleSA9IGtleTtcbiAgICBmb3JtYXQudmFsdWUgPSB2YWw7XG4gICAgaW50ZWdyYXRlSXRlbShmb3JtYXQsIHBhcmVudCwgeSwgbGVmdCwgcmlnaHQpO1xuICAgIGxlZnQgPSBmb3JtYXQ7XG4gIH1cbiAgcmV0dXJuIFtsZWZ0LCByaWdodF1cbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgdXBkYXRlQ3VycmVudEF0dHJpYnV0ZXMgPSAoY3VycmVudEF0dHJpYnV0ZXMsIGl0ZW0pID0+IHtcbiAgY29uc3QgdmFsdWUgPSBpdGVtLnZhbHVlO1xuICBjb25zdCBrZXkgPSBpdGVtLmtleTtcbiAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgY3VycmVudEF0dHJpYnV0ZXMuZGVsZXRlKGtleSk7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudEF0dHJpYnV0ZXMuc2V0KGtleSwgdmFsdWUpO1xuICB9XG59O1xuXG4vKipcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IG1pbmltaXplQXR0cmlidXRlQ2hhbmdlcyA9IChsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpID0+IHtcbiAgLy8gZ28gcmlnaHQgd2hpbGUgYXR0cmlidXRlc1tyaWdodC5rZXldID09PSByaWdodC52YWx1ZSAob3IgcmlnaHQgaXMgZGVsZXRlZClcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBpZiAocmlnaHQgPT09IG51bGwpIHtcbiAgICAgIGJyZWFrXG4gICAgfSBlbHNlIGlmIChyaWdodC5fZGVsZXRlZCA9PT0gdHJ1ZSkgOyBlbHNlIGlmIChyaWdodC5jb25zdHJ1Y3RvciA9PT0gSXRlbUZvcm1hdCAmJiAoYXR0cmlidXRlc1tyaWdodC5rZXldIHx8IG51bGwpID09PSByaWdodC52YWx1ZSkge1xuICAgICAgLy8gZm91bmQgYSBmb3JtYXQsIHVwZGF0ZSBjdXJyZW50QXR0cmlidXRlcyBhbmQgY29udGludWVcbiAgICAgIHVwZGF0ZUN1cnJlbnRBdHRyaWJ1dGVzKGN1cnJlbnRBdHRyaWJ1dGVzLCByaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICAgIGxlZnQgPSByaWdodDtcbiAgICByaWdodCA9IHJpZ2h0Ll9yaWdodDtcbiAgfVxuICByZXR1cm4gW2xlZnQsIHJpZ2h0XVxufTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpbnNlcnRBdHRyaWJ1dGVzID0gKHksIHBhcmVudCwgbGVmdCwgcmlnaHQsIGF0dHJpYnV0ZXMsIGN1cnJlbnRBdHRyaWJ1dGVzKSA9PiB7XG4gIGNvbnN0IG5lZ2F0ZWRBdHRyaWJ1dGVzID0gbmV3IE1hcCgpO1xuICAvLyBpbnNlcnQgZm9ybWF0LXN0YXJ0IGl0ZW1zXG4gIGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgdmFsID0gYXR0cmlidXRlc1trZXldO1xuICAgIGNvbnN0IGN1cnJlbnRWYWwgPSBjdXJyZW50QXR0cmlidXRlcy5nZXQoa2V5KTtcbiAgICBpZiAoY3VycmVudFZhbCAhPT0gdmFsKSB7XG4gICAgICAvLyBzYXZlIG5lZ2F0ZWQgYXR0cmlidXRlIChzZXQgbnVsbCBpZiBjdXJyZW50VmFsIHVuZGVmaW5lZClcbiAgICAgIG5lZ2F0ZWRBdHRyaWJ1dGVzLnNldChrZXksIGN1cnJlbnRWYWwgfHwgbnVsbCk7XG4gICAgICBsZXQgZm9ybWF0ID0gbmV3IEl0ZW1Gb3JtYXQoKTtcbiAgICAgIGZvcm1hdC5rZXkgPSBrZXk7XG4gICAgICBmb3JtYXQudmFsdWUgPSB2YWw7XG4gICAgICBpbnRlZ3JhdGVJdGVtKGZvcm1hdCwgcGFyZW50LCB5LCBsZWZ0LCByaWdodCk7XG4gICAgICBsZWZ0ID0gZm9ybWF0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gW2xlZnQsIHJpZ2h0LCBuZWdhdGVkQXR0cmlidXRlc11cbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgaW5zZXJ0VGV4dCA9ICh5LCB0ZXh0LCBwYXJlbnQsIGxlZnQsIHJpZ2h0LCBjdXJyZW50QXR0cmlidXRlcywgYXR0cmlidXRlcykgPT4ge1xuICBmb3IgKGxldCBba2V5XSBvZiBjdXJyZW50QXR0cmlidXRlcykge1xuICAgIGlmIChhdHRyaWJ1dGVzW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgYXR0cmlidXRlc1trZXldID0gbnVsbDtcbiAgICB9XG4gIH1cbiAgW2xlZnQsIHJpZ2h0XSA9IG1pbmltaXplQXR0cmlidXRlQ2hhbmdlcyhsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICBsZXQgbmVnYXRlZEF0dHJpYnV0ZXM7XG4gIFtsZWZ0LCByaWdodCwgbmVnYXRlZEF0dHJpYnV0ZXNdID0gaW5zZXJ0QXR0cmlidXRlcyh5LCBwYXJlbnQsIGxlZnQsIHJpZ2h0LCBhdHRyaWJ1dGVzLCBjdXJyZW50QXR0cmlidXRlcyk7XG4gIC8vIGluc2VydCBjb250ZW50XG4gIGxldCBpdGVtO1xuICBpZiAodGV4dC5jb25zdHJ1Y3RvciA9PT0gU3RyaW5nKSB7XG4gICAgaXRlbSA9IG5ldyBJdGVtU3RyaW5nKCk7XG4gICAgaXRlbS5fY29udGVudCA9IHRleHQ7XG4gIH0gZWxzZSB7XG4gICAgaXRlbSA9IG5ldyBJdGVtRW1iZWQoKTtcbiAgICBpdGVtLmVtYmVkID0gdGV4dDtcbiAgfVxuICBpbnRlZ3JhdGVJdGVtKGl0ZW0sIHBhcmVudCwgeSwgbGVmdCwgcmlnaHQpO1xuICBsZWZ0ID0gaXRlbTtcbiAgcmV0dXJuIGluc2VydE5lZ2F0ZWRBdHRyaWJ1dGVzKHksIHBhcmVudCwgbGVmdCwgcmlnaHQsIG5lZ2F0ZWRBdHRyaWJ1dGVzKVxufTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBmb3JtYXRUZXh0ID0gKHksIGxlbmd0aCwgcGFyZW50LCBsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpID0+IHtcbiAgW2xlZnQsIHJpZ2h0XSA9IG1pbmltaXplQXR0cmlidXRlQ2hhbmdlcyhsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICBsZXQgbmVnYXRlZEF0dHJpYnV0ZXM7XG4gIFtsZWZ0LCByaWdodCwgbmVnYXRlZEF0dHJpYnV0ZXNdID0gaW5zZXJ0QXR0cmlidXRlcyh5LCBwYXJlbnQsIGxlZnQsIHJpZ2h0LCBhdHRyaWJ1dGVzLCBjdXJyZW50QXR0cmlidXRlcyk7XG4gIC8vIGl0ZXJhdGUgdW50aWwgZmlyc3Qgbm9uLWZvcm1hdCBvciBudWxsIGlzIGZvdW5kXG4gIC8vIGRlbGV0ZSBhbGwgZm9ybWF0cyB3aXRoIGF0dHJpYnV0ZXNbZm9ybWF0LmtleV0gIT0gbnVsbFxuICB3aGlsZSAobGVuZ3RoID4gMCAmJiByaWdodCAhPT0gbnVsbCkge1xuICAgIGlmIChyaWdodC5fZGVsZXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHN3aXRjaCAocmlnaHQuY29uc3RydWN0b3IpIHtcbiAgICAgICAgY2FzZSBJdGVtRm9ybWF0OlxuICAgICAgICAgIGNvbnN0IGF0dHIgPSBhdHRyaWJ1dGVzW3JpZ2h0LmtleV07XG4gICAgICAgICAgaWYgKGF0dHIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGF0dHIgPT09IHJpZ2h0LnZhbHVlKSB7XG4gICAgICAgICAgICAgIG5lZ2F0ZWRBdHRyaWJ1dGVzLmRlbGV0ZShyaWdodC5rZXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmVnYXRlZEF0dHJpYnV0ZXMuc2V0KHJpZ2h0LmtleSwgcmlnaHQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmlnaHQuX2RlbGV0ZSh5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlQ3VycmVudEF0dHJpYnV0ZXMoY3VycmVudEF0dHJpYnV0ZXMsIHJpZ2h0KTtcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEl0ZW1FbWJlZDpcbiAgICAgICAgY2FzZSBJdGVtU3RyaW5nOlxuICAgICAgICAgIHJpZ2h0Ll9zcGxpdEF0KHksIGxlbmd0aCk7XG4gICAgICAgICAgbGVuZ3RoIC09IHJpZ2h0Ll9sZW5ndGg7XG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgbGVmdCA9IHJpZ2h0O1xuICAgIHJpZ2h0ID0gcmlnaHQuX3JpZ2h0O1xuICB9XG4gIHJldHVybiBpbnNlcnROZWdhdGVkQXR0cmlidXRlcyh5LCBwYXJlbnQsIGxlZnQsIHJpZ2h0LCBuZWdhdGVkQXR0cmlidXRlcylcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZGVsZXRlVGV4dCA9ICh5LCBsZW5ndGgsIHBhcmVudCwgbGVmdCwgcmlnaHQsIGN1cnJlbnRBdHRyaWJ1dGVzKSA9PiB7XG4gIHdoaWxlIChsZW5ndGggPiAwICYmIHJpZ2h0ICE9PSBudWxsKSB7XG4gICAgaWYgKHJpZ2h0Ll9kZWxldGVkID09PSBmYWxzZSkge1xuICAgICAgc3dpdGNoIChyaWdodC5jb25zdHJ1Y3Rvcikge1xuICAgICAgICBjYXNlIEl0ZW1Gb3JtYXQ6XG4gICAgICAgICAgdXBkYXRlQ3VycmVudEF0dHJpYnV0ZXMoY3VycmVudEF0dHJpYnV0ZXMsIHJpZ2h0KTtcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIEl0ZW1FbWJlZDpcbiAgICAgICAgY2FzZSBJdGVtU3RyaW5nOlxuICAgICAgICAgIHJpZ2h0Ll9zcGxpdEF0KHksIGxlbmd0aCk7XG4gICAgICAgICAgbGVuZ3RoIC09IHJpZ2h0Ll9sZW5ndGg7XG4gICAgICAgICAgcmlnaHQuX2RlbGV0ZSh5KTtcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICBsZWZ0ID0gcmlnaHQ7XG4gICAgcmlnaHQgPSByaWdodC5fcmlnaHQ7XG4gIH1cbiAgcmV0dXJuIFtsZWZ0LCByaWdodF1cbn07XG5cbi8vIFRPRE86IEluIHRoZSBxdWlsbCBkZWx0YSByZXByZXNlbnRhdGlvbiB3ZSBzaG91bGQgYWxzbyB1c2UgdGhlIGZvcm1hdCB7b3BzOlsuLl19XG4vKipcbiAqIFRoZSBRdWlsbCBEZWx0YSBmb3JtYXQgcmVwcmVzZW50cyBjaGFuZ2VzIG9uIGEgdGV4dCBkb2N1bWVudCB3aXRoXG4gKiBmb3JtYXR0aW5nIGluZm9ybWF0aW9uLiBGb3IgbW9yIGluZm9ybWF0aW9uIHZpc2l0IHtAbGluayBodHRwczovL3F1aWxsanMuY29tL2RvY3MvZGVsdGEvfFF1aWxsIERlbHRhfVxuICpcbiAqIEBleGFtcGxlXG4gKiAgIHtcbiAqICAgICBvcHM6IFtcbiAqICAgICAgIHsgaW5zZXJ0OiAnR2FuZGFsZicsIGF0dHJpYnV0ZXM6IHsgYm9sZDogdHJ1ZSB9IH0sXG4gKiAgICAgICB7IGluc2VydDogJyB0aGUgJyB9LFxuICogICAgICAgeyBpbnNlcnQ6ICdHcmV5JywgYXR0cmlidXRlczogeyBjb2xvcjogJyNjY2NjY2MnIH0gfVxuICogICAgIF1cbiAqICAgfVxuICpcbiAqIEB0eXBlZGVmIHtBcnJheTxPYmplY3Q+fSBEZWx0YVxuICovXG5cbi8qKlxuICAqIEF0dHJpYnV0ZXMgdGhhdCBjYW4gYmUgYXNzaWduZWQgdG8gYSBzZWxlY3Rpb24gb2YgdGV4dC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogICB7XG4gICogICAgIGJvbGQ6IHRydWUsXG4gICogICAgIGZvbnQtc2l6ZTogJzQwcHgnXG4gICogICB9XG4gICpcbiAgKiBAdHlwZWRlZiB7T2JqZWN0fSBUZXh0QXR0cmlidXRlc1xuICAqL1xuXG4vKipcbiAqIEV2ZW50IHRoYXQgZGVzY3JpYmVzIHRoZSBjaGFuZ2VzIG9uIGEgWVRleHQgdHlwZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jbGFzcyBZVGV4dEV2ZW50IGV4dGVuZHMgWUFycmF5RXZlbnQge1xuICBjb25zdHJ1Y3RvciAoeXRleHQsIHJlbW90ZSwgdHJhbnNhY3Rpb24pIHtcbiAgICBzdXBlcih5dGV4dCwgcmVtb3RlLCB0cmFuc2FjdGlvbik7XG4gICAgdGhpcy5fZGVsdGEgPSBudWxsO1xuICB9XG4gIC8vIFRPRE86IFNob3VsZCBwdXQgdGhpcyBpbiBhIHNlcGFyYXRlIGZ1bmN0aW9uLiB0b0RlbHRhIHNob3VsZG4ndCBiZSBpbmNsdWRlZFxuICAvLyAgICAgICBpbiBldmVyeSBZanMgZGlzdHJpYnV0aW9uXG4gIC8qKlxuICAgKiBDb21wdXRlIHRoZSBjaGFuZ2VzIGluIHRoZSBkZWx0YSBmb3JtYXQuXG4gICAqXG4gICAqIEByZXR1cm4ge0RlbHRhfSBBIHtAbGluayBodHRwczovL3F1aWxsanMuY29tL2RvY3MvZGVsdGEvfFF1aWxsIERlbHRhfSkgdGhhdFxuICAgKiAgICAgICAgICAgICAgICAgcmVwcmVzZW50cyB0aGUgY2hhbmdlcyBvbiB0aGUgZG9jdW1lbnQuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGdldCBkZWx0YSAoKSB7XG4gICAgaWYgKHRoaXMuX2RlbHRhID09PSBudWxsKSB7XG4gICAgICBjb25zdCB5ID0gdGhpcy50YXJnZXQuX3k7XG4gICAgICB5LnRyYW5zYWN0KCgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnRhcmdldC5fc3RhcnQ7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gW107XG4gICAgICAgIGNvbnN0IGFkZGVkID0gdGhpcy5hZGRlZEVsZW1lbnRzO1xuICAgICAgICBjb25zdCByZW1vdmVkID0gdGhpcy5yZW1vdmVkRWxlbWVudHM7XG4gICAgICAgIHRoaXMuX2RlbHRhID0gZGVsdGE7XG4gICAgICAgIGxldCBhY3Rpb24gPSBudWxsO1xuICAgICAgICBsZXQgYXR0cmlidXRlcyA9IHt9OyAvLyBjb3VudHMgYWRkZWQgb3IgcmVtb3ZlZCBuZXcgYXR0cmlidXRlcyBmb3IgcmV0YWluXG4gICAgICAgIGNvbnN0IGN1cnJlbnRBdHRyaWJ1dGVzID0gbmV3IE1hcCgpOyAvLyBzYXZlcyBhbGwgY3VycmVudCBhdHRyaWJ1dGVzIGZvciBpbnNlcnRcbiAgICAgICAgY29uc3Qgb2xkQXR0cmlidXRlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IGluc2VydCA9ICcnO1xuICAgICAgICBsZXQgcmV0YWluID0gMDtcbiAgICAgICAgbGV0IGRlbGV0ZUxlbiA9IDA7XG4gICAgICAgIGNvbnN0IGFkZE9wID0gZnVuY3Rpb24gYWRkT3AgKCkge1xuICAgICAgICAgIGlmIChhY3Rpb24gIT09IG51bGwpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbGV0IG9wO1xuICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgICAgICBvcCA9IHsgZGVsZXRlOiBkZWxldGVMZW4gfTtcbiAgICAgICAgICAgICAgICBkZWxldGVMZW4gPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ2luc2VydCc6XG4gICAgICAgICAgICAgICAgb3AgPSB7IGluc2VydCB9O1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50QXR0cmlidXRlcy5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgICAgb3AuYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIGN1cnJlbnRBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgIG9wLmF0dHJpYnV0ZXNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluc2VydCA9ICcnO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIGNhc2UgJ3JldGFpbic6XG4gICAgICAgICAgICAgICAgb3AgPSB7IHJldGFpbiB9O1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICBvcC5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICBvcC5hdHRyaWJ1dGVzW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldGFpbiA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbHRhLnB1c2gob3ApO1xuICAgICAgICAgICAgYWN0aW9uID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHdoaWxlIChpdGVtICE9PSBudWxsKSB7XG4gICAgICAgICAgc3dpdGNoIChpdGVtLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICBjYXNlIEl0ZW1FbWJlZDpcbiAgICAgICAgICAgICAgaWYgKGFkZGVkLmhhcyhpdGVtKSkge1xuICAgICAgICAgICAgICAgIGFkZE9wKCk7XG4gICAgICAgICAgICAgICAgYWN0aW9uID0gJ2luc2VydCc7XG4gICAgICAgICAgICAgICAgaW5zZXJ0ID0gaXRlbS5lbWJlZDtcbiAgICAgICAgICAgICAgICBhZGRPcCgpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlbW92ZWQuaGFzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiAhPT0gJ2RlbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgIGFkZE9wKCk7XG4gICAgICAgICAgICAgICAgICBhY3Rpb24gPSAnZGVsZXRlJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVsZXRlTGVuICs9IDE7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5fZGVsZXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uICE9PSAncmV0YWluJykge1xuICAgICAgICAgICAgICAgICAgYWRkT3AoKTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbiA9ICdyZXRhaW4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXRhaW4gKz0gMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBJdGVtU3RyaW5nOlxuICAgICAgICAgICAgICBpZiAoYWRkZWQuaGFzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiAhPT0gJ2luc2VydCcpIHtcbiAgICAgICAgICAgICAgICAgIGFkZE9wKCk7XG4gICAgICAgICAgICAgICAgICBhY3Rpb24gPSAnaW5zZXJ0JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5zZXJ0ICs9IGl0ZW0uX2NvbnRlbnQ7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVtb3ZlZC5oYXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uICE9PSAnZGVsZXRlJykge1xuICAgICAgICAgICAgICAgICAgYWRkT3AoKTtcbiAgICAgICAgICAgICAgICAgIGFjdGlvbiA9ICdkZWxldGUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWxldGVMZW4gKz0gaXRlbS5fbGVuZ3RoO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uX2RlbGV0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiAhPT0gJ3JldGFpbicpIHtcbiAgICAgICAgICAgICAgICAgIGFkZE9wKCk7XG4gICAgICAgICAgICAgICAgICBhY3Rpb24gPSAncmV0YWluJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0YWluICs9IGl0ZW0uX2xlbmd0aDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBJdGVtRm9ybWF0OlxuICAgICAgICAgICAgICBpZiAoYWRkZWQuaGFzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VyVmFsID0gY3VycmVudEF0dHJpYnV0ZXMuZ2V0KGl0ZW0ua2V5KSB8fCBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChjdXJWYWwgIT09IGl0ZW0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdyZXRhaW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZE9wKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gKG9sZEF0dHJpYnV0ZXMuZ2V0KGl0ZW0ua2V5KSB8fCBudWxsKSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1tpdGVtLmtleV07XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2l0ZW0ua2V5XSA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGl0ZW0uX2RlbGV0ZSh5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVtb3ZlZC5oYXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBvbGRBdHRyaWJ1dGVzLnNldChpdGVtLmtleSwgaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VyVmFsID0gY3VycmVudEF0dHJpYnV0ZXMuZ2V0KGl0ZW0ua2V5KSB8fCBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChjdXJWYWwgIT09IGl0ZW0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdyZXRhaW4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZE9wKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzW2l0ZW0ua2V5XSA9IGN1clZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5fZGVsZXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBvbGRBdHRyaWJ1dGVzLnNldChpdGVtLmtleSwgaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgYXR0ciA9IGF0dHJpYnV0ZXNbaXRlbS5rZXldO1xuICAgICAgICAgICAgICAgIGlmIChhdHRyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChhdHRyICE9PSBpdGVtLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdyZXRhaW4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYWRkT3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXNbaXRlbS5rZXldID0gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1tpdGVtLmtleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uX2RlbGV0ZSh5KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGl0ZW0uX2RlbGV0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2luc2VydCcpIHtcbiAgICAgICAgICAgICAgICAgIGFkZE9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRBdHRyaWJ1dGVzKGN1cnJlbnRBdHRyaWJ1dGVzLCBpdGVtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtID0gaXRlbS5fcmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgYWRkT3AoKTtcbiAgICAgICAgd2hpbGUgKHRoaXMuX2RlbHRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBsZXQgbGFzdE9wID0gdGhpcy5fZGVsdGFbdGhpcy5fZGVsdGEubGVuZ3RoIC0gMV07XG4gICAgICAgICAgaWYgKGxhc3RPcC5yZXRhaW4gIT09IHVuZGVmaW5lZCAmJiBsYXN0T3AuYXR0cmlidXRlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyByZXRhaW4gZGVsdGEncyBpZiB0aGV5IGRvbid0IGFzc2lnbiBhdHRyaWJ1dGVzXG4gICAgICAgICAgICB0aGlzLl9kZWx0YS5wb3AoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZGVsdGFcbiAgfVxufVxuXG4vKipcbiAqIFR5cGUgdGhhdCByZXByZXNlbnRzIHRleHQgd2l0aCBmb3JtYXR0aW5nIGluZm9ybWF0aW9uLlxuICpcbiAqIFRoaXMgdHlwZSByZXBsYWNlcyB5LXJpY2h0ZXh0IGFzIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgYWJsZSB0byBoYW5kbGVcbiAqIGJsb2NrIGZvcm1hdHMgKGZvcm1hdCBpbmZvcm1hdGlvbiBvbiBhIHBhcmFncmFwaCksIGVtYmVkcyAoY29tcGxleCBlbGVtZW50c1xuICogbGlrZSBwaWN0dXJlcyBhbmQgdmlkZW9zKSwgYW5kIHRleHQgZm9ybWF0cyAoKipib2xkKiosICppdGFsaWMqKS5cbiAqL1xuY2xhc3MgWVRleHQgZXh0ZW5kcyBZQXJyYXkge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtzdHJpbmddIFRoZSBpbml0aWFsIHZhbHVlIG9mIHRoZSBZVGV4dC5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChzdHJpbmcpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICh0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgSXRlbVN0cmluZygpO1xuICAgICAgc3RhcnQuX3BhcmVudCA9IHRoaXM7XG4gICAgICBzdGFydC5fY29udGVudCA9IHN0cmluZztcbiAgICAgIHRoaXMuX3N0YXJ0ID0gc3RhcnQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgWU1hcCBFdmVudCBhbmQgY2FsbHMgb2JzZXJ2ZXJzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NhbGxPYnNlcnZlciAodHJhbnNhY3Rpb24sIHBhcmVudFN1YnMsIHJlbW90ZSkge1xuICAgIHRoaXMuX2NhbGxFdmVudEhhbmRsZXIodHJhbnNhY3Rpb24sIG5ldyBZVGV4dEV2ZW50KHRoaXMsIHJlbW90ZSwgdHJhbnNhY3Rpb24pKTtcbiAgfVxuXG4gIHRvRG9tICgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGhpcy50b1N0cmluZygpKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHVuZm9ybWF0dGVkIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIFlUZXh0IHR5cGUuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHRvU3RyaW5nICgpIHtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2FueX1cbiAgICAgKi9cbiAgICBsZXQgbiA9IHRoaXMuX3N0YXJ0O1xuICAgIHdoaWxlIChuICE9PSBudWxsKSB7XG4gICAgICBpZiAoIW4uX2RlbGV0ZWQgJiYgbi5fY291bnRhYmxlKSB7XG4gICAgICAgIHN0ciArPSBuLl9jb250ZW50O1xuICAgICAgfVxuICAgICAgbiA9IG4uX3JpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gc3RyXG4gIH1cblxuICB0b0RvbVN0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9EZWx0YSgpLm1hcChkZWx0YSA9PiB7XG4gICAgICBjb25zdCBuZXN0ZWROb2RlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgbm9kZU5hbWUgaW4gZGVsdGEuYXR0cmlidXRlcykge1xuICAgICAgICBjb25zdCBhdHRycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGVsdGEuYXR0cmlidXRlc1tub2RlTmFtZV0pIHtcbiAgICAgICAgICBhdHRycy5wdXNoKHtrZXksIHZhbHVlOiBkZWx0YS5hdHRyaWJ1dGVzW25vZGVOYW1lXVtrZXldfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc29ydCBhdHRyaWJ1dGVzIHRvIGdldCBhIHVuaXF1ZSBvcmRlclxuICAgICAgICBhdHRycy5zb3J0KChhLCBiKSA9PiBhLmtleSA8IGIua2V5ID8gLTEgOiAxKTtcbiAgICAgICAgbmVzdGVkTm9kZXMucHVzaCh7IG5vZGVOYW1lLCBhdHRycyB9KTtcbiAgICAgIH1cbiAgICAgIC8vIHNvcnQgbm9kZSBvcmRlciB0byBnZXQgYSB1bmlxdWUgb3JkZXJcbiAgICAgIG5lc3RlZE5vZGVzLnNvcnQoKGEsIGIpID0+IGEubm9kZU5hbWUgPCBiLm5vZGVOYW1lID8gLTEgOiAxKTtcbiAgICAgIC8vIG5vdyBjb252ZXJ0IHRvIGRvbSBzdHJpbmdcbiAgICAgIGxldCBzdHIgPSAnJztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVzdGVkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5lc3RlZE5vZGVzW2ldO1xuICAgICAgICBzdHIgKz0gYDwke25vZGUubm9kZU5hbWV9YDtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBub2RlLmF0dHJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgY29uc3QgYXR0ciA9IG5vZGUuYXR0cnNbaV07XG4gICAgICAgICAgc3RyICs9IGAgJHthdHRyLmtleX09XCIke2F0dHIudmFsdWV9XCJgO1xuICAgICAgICB9XG4gICAgICAgIHN0ciArPSAnPic7XG4gICAgICB9XG4gICAgICBzdHIgKz0gZGVsdGEuaW5zZXJ0O1xuICAgICAgZm9yIChsZXQgaSA9IG5lc3RlZE5vZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIHN0ciArPSBgPC8ke25lc3RlZE5vZGVzW2ldLm5vZGVOYW1lfT5gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0clxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgYSB7QGxpbmsgRGVsdGF9IG9uIHRoaXMgc2hhcmVkIFlUZXh0IHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7RGVsdGF9IGRlbHRhIFRoZSBjaGFuZ2VzIHRvIGFwcGx5IG9uIHRoaXMgZWxlbWVudC5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYXBwbHlEZWx0YSAoZGVsdGEpIHtcbiAgICB0aGlzLl90cmFuc2FjdCh5ID0+IHtcbiAgICAgIGxldCBsZWZ0ID0gbnVsbDtcbiAgICAgIGxldCByaWdodCA9IHRoaXMuX3N0YXJ0O1xuICAgICAgY29uc3QgY3VycmVudEF0dHJpYnV0ZXMgPSBuZXcgTWFwKCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlbHRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBvcCA9IGRlbHRhW2ldO1xuICAgICAgICBpZiAob3AuaW5zZXJ0ICE9PSB1bmRlZmluZWQpIHtcbltsZWZ0LCByaWdodF0gPSBpbnNlcnRUZXh0KHksIG9wLmluc2VydCwgdGhpcywgbGVmdCwgcmlnaHQsIGN1cnJlbnRBdHRyaWJ1dGVzLCBvcC5hdHRyaWJ1dGVzIHx8IHt9KTtcbiAgICAgICAgfSBlbHNlIGlmIChvcC5yZXRhaW4gIT09IHVuZGVmaW5lZCkge1xuW2xlZnQsIHJpZ2h0XSA9IGZvcm1hdFRleHQoeSwgb3AucmV0YWluLCB0aGlzLCBsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXMsIG9wLmF0dHJpYnV0ZXMgfHwge30pO1xuICAgICAgICB9IGVsc2UgaWYgKG9wLmRlbGV0ZSAhPT0gdW5kZWZpbmVkKSB7XG5bbGVmdCwgcmlnaHRdID0gZGVsZXRlVGV4dCh5LCBvcC5kZWxldGUsIHRoaXMsIGxlZnQsIHJpZ2h0LCBjdXJyZW50QXR0cmlidXRlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBEZWx0YSByZXByZXNlbnRhdGlvbiBvZiB0aGlzIFlUZXh0IHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7aW1wb3J0KCcuLi9wcm90b2NvbHMvaGlzdG9yeS5qcycpLkhpc3RvcnlTbmFwc2hvdH0gW3NuYXBzaG90XVxuICAgKiBAcGFyYW0ge2ltcG9ydCgnLi4vcHJvdG9jb2xzL2hpc3RvcnkuanMnKS5IaXN0b3J5U25hcHNob3R9IFtwcmV2U25hcHNob3RdXG4gICAqIEByZXR1cm4ge0RlbHRhfSBUaGUgRGVsdGEgcmVwcmVzZW50YXRpb24gb2YgdGhpcyB0eXBlLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICB0b0RlbHRhIChzbmFwc2hvdCwgcHJldlNuYXBzaG90KSB7XG4gICAgbGV0IG9wcyA9IFtdO1xuICAgIGxldCBjdXJyZW50QXR0cmlidXRlcyA9IG5ldyBNYXAoKTtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgLyoqXG4gICAgICogQHR5cGUge2FueX1cbiAgICAgKi9cbiAgICBsZXQgbiA9IHRoaXMuX3N0YXJ0O1xuICAgIGZ1bmN0aW9uIHBhY2tTdHIgKCkge1xuICAgICAgaWYgKHN0ci5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIHBhY2sgc3RyIHdpdGggYXR0cmlidXRlcyB0byBvcHNcbiAgICAgICAgbGV0IGF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgbGV0IGFkZEF0dHJpYnV0ZXMgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIGN1cnJlbnRBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgYWRkQXR0cmlidXRlcyA9IHRydWU7XG4gICAgICAgICAgYXR0cmlidXRlc1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9wID0geyBpbnNlcnQ6IHN0ciB9O1xuICAgICAgICBpZiAoYWRkQXR0cmlidXRlcykge1xuICAgICAgICAgIG9wLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICAgICAgICB9XG4gICAgICAgIG9wcy5wdXNoKG9wKTtcbiAgICAgICAgc3RyID0gJyc7XG4gICAgICB9XG4gICAgfVxuICAgIHdoaWxlIChuICE9PSBudWxsKSB7XG4gICAgICBpZiAoaXNWaXNpYmxlKG4sIHNuYXBzaG90KSB8fCAocHJldlNuYXBzaG90ICE9PSB1bmRlZmluZWQgJiYgaXNWaXNpYmxlKG4sIHByZXZTbmFwc2hvdCkpKSB7XG4gICAgICAgIHN3aXRjaCAobi5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgIGNhc2UgSXRlbVN0cmluZzpcbiAgICAgICAgICAgIGNvbnN0IGN1ciA9IGN1cnJlbnRBdHRyaWJ1dGVzLmdldCgneWNoYW5nZScpO1xuICAgICAgICAgICAgaWYgKHNuYXBzaG90ICE9PSB1bmRlZmluZWQgJiYgIWlzVmlzaWJsZShuLCBzbmFwc2hvdCkpIHtcbiAgICAgICAgICAgICAgaWYgKGN1ciA9PT0gdW5kZWZpbmVkIHx8IGN1ci51c2VyICE9PSBuLl9pZC51c2VyIHx8IGN1ci5zdGF0ZSAhPT0gJ3JlbW92ZWQnKSB7XG4gICAgICAgICAgICAgICAgcGFja1N0cigpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRBdHRyaWJ1dGVzLnNldCgneWNoYW5nZScsIHsgdXNlcjogbi5faWQudXNlciwgc3RhdGU6ICdyZW1vdmVkJyB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwcmV2U25hcHNob3QgIT09IHVuZGVmaW5lZCAmJiAhaXNWaXNpYmxlKG4sIHByZXZTbmFwc2hvdCkpIHtcbiAgICAgICAgICAgICAgaWYgKGN1ciA9PT0gdW5kZWZpbmVkIHx8IGN1ci51c2VyICE9PSBuLl9pZC51c2VyIHx8IGN1ci5zdGF0ZSAhPT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgICAgIHBhY2tTdHIoKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50QXR0cmlidXRlcy5zZXQoJ3ljaGFuZ2UnLCB7IHVzZXI6IG4uX2lkLnVzZXIsIHN0YXRlOiAnYWRkZWQnIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1ciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHBhY2tTdHIoKTtcbiAgICAgICAgICAgICAgY3VycmVudEF0dHJpYnV0ZXMuZGVsZXRlKCd5Y2hhbmdlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gbi5fY29udGVudDtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSBJdGVtRm9ybWF0OlxuICAgICAgICAgICAgcGFja1N0cigpO1xuICAgICAgICAgICAgdXBkYXRlQ3VycmVudEF0dHJpYnV0ZXMoY3VycmVudEF0dHJpYnV0ZXMsIG4pO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbiA9IG4uX3JpZ2h0O1xuICAgIH1cbiAgICBwYWNrU3RyKCk7XG4gICAgcmV0dXJuIG9wc1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCB0ZXh0IGF0IGEgZ2l2ZW4gaW5kZXguXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBUaGUgaW5kZXggYXQgd2hpY2ggdG8gc3RhcnQgaW5zZXJ0aW5nLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdGV4dCBUaGUgdGV4dCB0byBpbnNlcnQgYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHtUZXh0QXR0cmlidXRlc30gYXR0cmlidXRlcyBPcHRpb25hbGx5IGRlZmluZSBzb21lIGZvcm1hdHRpbmdcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvcm1hdGlvbiB0byBhcHBseSBvbiB0aGUgaW5zZXJ0ZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUZXh0LlxuICAgKiBAcHVibGljXG4gICAqL1xuICBpbnNlcnQgKGluZGV4LCB0ZXh0LCBhdHRyaWJ1dGVzID0ge30pIHtcbiAgICBpZiAodGV4dC5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuX3RyYW5zYWN0KHkgPT4ge1xuICAgICAgbGV0IFtsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXNdID0gZmluZFBvc2l0aW9uKHRoaXMsIGluZGV4KTtcbiAgICAgIGluc2VydFRleHQoeSwgdGV4dCwgdGhpcywgbGVmdCwgcmlnaHQsIGN1cnJlbnRBdHRyaWJ1dGVzLCBhdHRyaWJ1dGVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnRzIGFuIGVtYmVkIGF0IGEgaW5kZXguXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBUaGUgaW5kZXggdG8gaW5zZXJ0IHRoZSBlbWJlZCBhdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGVtYmVkIFRoZSBPYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBlbWJlZC5cbiAgICogQHBhcmFtIHtUZXh0QXR0cmlidXRlc30gYXR0cmlidXRlcyBBdHRyaWJ1dGUgaW5mb3JtYXRpb24gdG8gYXBwbHkgb24gdGhlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1iZWRcbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgaW5zZXJ0RW1iZWQgKGluZGV4LCBlbWJlZCwgYXR0cmlidXRlcyA9IHt9KSB7XG4gICAgaWYgKGVtYmVkLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRW1iZWQgbXVzdCBiZSBhbiBPYmplY3QnKVxuICAgIH1cbiAgICB0aGlzLl90cmFuc2FjdCh5ID0+IHtcbiAgICAgIGxldCBbbGVmdCwgcmlnaHQsIGN1cnJlbnRBdHRyaWJ1dGVzXSA9IGZpbmRQb3NpdGlvbih0aGlzLCBpbmRleCk7XG4gICAgICBpbnNlcnRUZXh0KHksIGVtYmVkLCB0aGlzLCBsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgdGV4dCBzdGFydGluZyBmcm9tIGFuIGluZGV4LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggYXQgd2hpY2ggdG8gc3RhcnQgZGVsZXRpbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggVGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIHRvIHJlbW92ZS4gRGVmYXVsdHMgdG8gMS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZGVsZXRlIChpbmRleCwgbGVuZ3RoKSB7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuX3RyYW5zYWN0KHkgPT4ge1xuICAgICAgbGV0IFtsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXNdID0gZmluZFBvc2l0aW9uKHRoaXMsIGluZGV4KTtcbiAgICAgIGRlbGV0ZVRleHQoeSwgbGVuZ3RoLCB0aGlzLCBsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgcHJvcGVydGllcyB0byBhIHJhbmdlIG9mIHRleHQuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgZm9ybWF0dGluZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCBUaGUgYW1vdW50IG9mIGNoYXJhY3RlcnMgdG8gYXNzaWduIHByb3BlcnRpZXMgdG8uXG4gICAqIEBwYXJhbSB7VGV4dEF0dHJpYnV0ZXN9IGF0dHJpYnV0ZXMgQXR0cmlidXRlIGluZm9ybWF0aW9uIHRvIGFwcGx5IG9uIHRoZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGZvcm1hdCAoaW5kZXgsIGxlbmd0aCwgYXR0cmlidXRlcykge1xuICAgIHRoaXMuX3RyYW5zYWN0KHkgPT4ge1xuICAgICAgbGV0IFtsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXNdID0gZmluZFBvc2l0aW9uKHRoaXMsIGluZGV4KTtcbiAgICAgIGlmIChyaWdodCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGZvcm1hdFRleHQoeSwgbGVuZ3RoLCB0aGlzLCBsZWZ0LCByaWdodCwgY3VycmVudEF0dHJpYnV0ZXMsIGF0dHJpYnV0ZXMpO1xuICAgIH0pO1xuICB9XG4gIC8vIFRPRE86IERlLWR1cGxpY2F0ZSBjb2RlLiBUaGUgZm9sbG93aW5nIGNvZGUgaXMgaW4gZXZlcnkgdHlwZS5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0aGlzIFlUZXh0IHRvIGEgcmVhZGFibGUgZm9ybWF0LlxuICAgKiBVc2VmdWwgZm9yIGxvZ2dpbmcgYXMgYWxsIEl0ZW1zIGltcGxlbWVudCB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9sb2dTdHJpbmcgKCkge1xuICAgIHJldHVybiBsb2dJdGVtSGVscGVyKCdZVGV4dCcsIHRoaXMpXG4gIH1cbn1cblxuLyoqXG4gKiBAbW9kdWxlIHV0aWxzXG4gKi9cblxuLy8gVE9ETzogSW1wbGVtZW50IGZ1bmN0aW9uIHRvIGRlc2NyaWJlIHJhbmdlc1xuXG4vKipcbiAqIEEgcmVsYXRpdmUgcG9zaXRpb24gdGhhdCBpcyBiYXNlZCBvbiB0aGUgWWpzIG1vZGVsLiBJbiBjb250cmFzdCB0byBhblxuICogYWJzb2x1dGUgcG9zaXRpb24gKHBvc2l0aW9uIGJ5IGluZGV4KSwgdGhlIHJlbGF0aXZlIHBvc2l0aW9uIGNhbiBiZVxuICogcmVjb21wdXRlZCB3aGVuIHJlbW90ZSBjaGFuZ2VzIGFyZSByZWNlaXZlZC4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgSW5zZXJ0KDAsICd4JykoJ2F8YmMnKSA9ICd4YXxiYydgYGAgV2hlcmUgfCBpcyB0aGUgY3Vyc29yIHBvc2l0aW9uLlxuICpcbiAqIEEgcmVsYXRpdmUgY3Vyc29yIHBvc2l0aW9uIGNhbiBiZSBvYnRhaW5lZCB3aXRoIHRoZSBmdW5jdGlvblxuICoge0BsaW5rIGdldFJlbGF0aXZlUG9zaXRpb259IGFuZCBpdCBjYW4gYmUgdHJhbnNmb3JtZWQgdG8gYW4gYWJzb2x1dGUgcG9zaXRpb25cbiAqIHdpdGgge0BsaW5rIGZyb21SZWxhdGl2ZVBvc2l0aW9ufS5cbiAqXG4gKiBQcm8gdGlwOiBVc2UgdGhpcyB0byBpbXBsZW1lbnQgc2hhcmVkIGN1cnNvciBsb2NhdGlvbnMgaW4gWVRleHQgb3IgWVhtbCFcbiAqIFRoZSByZWxhdGl2ZSBwb3NpdGlvbiBpcyB7QGxpbmsgZW5jb2RhYmxlfSwgc28geW91IGNhbiBzZW5kIGl0IHRvIG90aGVyXG4gKiBjbGllbnRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDdXJyZW50IGN1cnNvciBwb3NpdGlvbiBpcyBhdCBwb3NpdGlvbiAxMFxuICogbGV0IHJlbGF0aXZlUG9zaXRpb24gPSBnZXRSZWxhdGl2ZVBvc2l0aW9uKHlUZXh0LCAxMClcbiAqIC8vIG1vZGlmeSB5VGV4dFxuICogeVRleHQuaW5zZXJ0KDAsICdhYmMnKVxuICogeVRleHQuZGVsZXRlKDMsIDEwKVxuICogLy8gQ29tcHV0ZSB0aGUgY3Vyc29yIHBvc2l0aW9uXG4gKiBsZXQgYWJzb2x1dGVQb3NpdGlvbiA9IGZyb21SZWxhdGl2ZVBvc2l0aW9uKHksIHJlbGF0aXZlUG9zaXRpb24pXG4gKiBhYnNvbHV0ZVBvc2l0aW9uLnR5cGUgLy8gPT4geVRleHRcbiAqIGNvbnNvbGUubG9nKCdjdXJzb3IgbG9jYXRpb24gaXMgJyArIGFic29sdXRlUG9zaXRpb24ub2Zmc2V0KSAvLyA9PiBjdXJzb3IgbG9jYXRpb24gaXMgM1xuICpcbiAqIEB0eXBlZGVmIHtlbmNvZGFibGV9IFJlbGF0aXZlUG9zaXRpb25cbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIHJlbGF0aXZlUG9zaXRpb24gYmFzZWQgb24gYSBhYnNvbHV0ZSBwb3NpdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1lUeXBlfSB0eXBlIFRoZSBiYXNlIHR5cGUgKGUuZy4gWVRleHQgb3IgWUFycmF5KS5cbiAqIEBwYXJhbSB7SW50ZWdlcn0gb2Zmc2V0IFRoZSBhYnNvbHV0ZSBwb3NpdGlvbi5cbiAqL1xuY29uc3QgZ2V0UmVsYXRpdmVQb3NpdGlvbiA9ICh0eXBlLCBvZmZzZXQpID0+IHtcbiAgLy8gVE9ETzogcmVuYW1lIHRvIGNyZWF0ZVJlbGF0aXZlUG9zaXRpb25cbiAgbGV0IHQgPSB0eXBlLl9zdGFydDtcbiAgd2hpbGUgKHQgIT09IG51bGwpIHtcbiAgICBpZiAoIXQuX2RlbGV0ZWQgJiYgdC5fY291bnRhYmxlKSB7XG4gICAgICBpZiAodC5fbGVuZ3RoID4gb2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBbdC5faWQudXNlciwgdC5faWQuY2xvY2sgKyBvZmZzZXRdXG4gICAgICB9XG4gICAgICBvZmZzZXQgLT0gdC5fbGVuZ3RoO1xuICAgIH1cbiAgICB0ID0gdC5fcmlnaHQ7XG4gIH1cbiAgcmV0dXJuIFsnZW5kb2YnLCB0eXBlLl9pZC51c2VyLCB0eXBlLl9pZC5jbG9jayB8fCBudWxsLCB0eXBlLl9pZC5uYW1lIHx8IG51bGwsIHR5cGUuX2lkLnR5cGUgfHwgbnVsbF1cbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQWJzb2x1dGVQb3NpdGlvbiBUaGUgcmVzdWx0IG9mIHtAbGluayBmcm9tUmVsYXRpdmVQb3NpdGlvbn1cbiAqIEBwcm9wZXJ0eSB7WVR5cGV9IHR5cGUgVGhlIHR5cGUgb24gd2hpY2ggdG8gYXBwbHkgdGhlIGFic29sdXRlIHBvc2l0aW9uLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IG9mZnNldCBUaGUgYWJzb2x1dGUgb2Zmc2V0LnJcbiAqL1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSByZWxhdGl2ZSBwb3NpdGlvbiBiYWNrIHRvIGEgcmVsYXRpdmUgcG9zaXRpb24uXG4gKlxuICogQHBhcmFtIHtZfSB5IFRoZSBZanMgaW5zdGFuY2UgaW4gd2hpY2ggdG8gcXVlcnkgZm9yIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7UmVsYXRpdmVQb3NpdGlvbn0gcnBvcyBUaGUgcmVsYXRpdmUgcG9zaXRpb24uXG4gKiBAcmV0dXJuIHtBYnNvbHV0ZVBvc2l0aW9ufSBUaGUgYWJzb2x1dGUgcG9zaXRpb24gaW4gdGhlIFlqcyBtb2RlbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGUgKyBvZmZzZXQpLlxuICovXG5jb25zdCBmcm9tUmVsYXRpdmVQb3NpdGlvbiA9ICh5LCBycG9zKSA9PiB7XG4gIGlmIChycG9zID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBpZiAocnBvc1swXSA9PT0gJ2VuZG9mJykge1xuICAgIGxldCBpZDtcbiAgICBpZiAocnBvc1szXSA9PT0gbnVsbCkge1xuICAgICAgaWQgPSBjcmVhdGVJRChycG9zWzFdLCBycG9zWzJdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgPSBjcmVhdGVSb290SUQocnBvc1szXSwgcnBvc1s0XSk7XG4gICAgfVxuICAgIGxldCB0eXBlID0geS5vcy5nZXQoaWQpO1xuICAgIGlmICh0eXBlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICB3aGlsZSAodHlwZS5fcmVkb25lICE9PSBudWxsKSB7XG4gICAgICB0eXBlID0gdHlwZS5fcmVkb25lO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gbnVsbCB8fCB0eXBlLmNvbnN0cnVjdG9yID09PSBHQykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGUsXG4gICAgICBvZmZzZXQ6IHR5cGUubGVuZ3RoXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGxldCBzdHJ1Y3QgPSB5Lm9zLmZpbmROb2RlV2l0aFVwcGVyQm91bmQoY3JlYXRlSUQocnBvc1swXSwgcnBvc1sxXSkpLnZhbDtcbiAgICBpZiAoc3RydWN0ID09PSBudWxsIHx8IHN0cnVjdC5faWQudXNlciA9PT0gUm9vdEZha2VVc2VySUQpIHtcbiAgICAgIHJldHVybiBudWxsIC8vIFRPRE86IHN1cHBvcnQgZmFrZSBpZHM/XG4gICAgfVxuICAgIGNvbnN0IGRpZmYgPSBycG9zWzFdIC0gc3RydWN0Ll9pZC5jbG9jaztcbiAgICB3aGlsZSAoc3RydWN0Ll9yZWRvbmUgIT09IG51bGwpIHtcbiAgICAgIHN0cnVjdCA9IHN0cnVjdC5fcmVkb25lO1xuICAgIH1cbiAgICBjb25zdCBwYXJlbnQgPSBzdHJ1Y3QuX3BhcmVudDtcbiAgICBpZiAoc3RydWN0LmNvbnN0cnVjdG9yID09PSBHQyB8fCBwYXJlbnQuX2RlbGV0ZWQpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGlmICghc3RydWN0Ll9kZWxldGVkICYmIHN0cnVjdC5fY291bnRhYmxlKSB7XG4gICAgICBvZmZzZXQgPSBkaWZmO1xuICAgIH1cbiAgICBzdHJ1Y3QgPSBzdHJ1Y3QuX2xlZnQ7XG4gICAgd2hpbGUgKHN0cnVjdCAhPT0gbnVsbCkge1xuICAgICAgaWYgKCFzdHJ1Y3QuX2RlbGV0ZWQgJiYgc3RydWN0Ll9jb3VudGFibGUpIHtcbiAgICAgICAgb2Zmc2V0ICs9IHN0cnVjdC5fbGVuZ3RoO1xuICAgICAgfVxuICAgICAgc3RydWN0ID0gc3RydWN0Ll9sZWZ0O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogcGFyZW50LFxuICAgICAgb2Zmc2V0OiBvZmZzZXRcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG11dHVhbCBleGNsdWRlIGZ1bmN0aW9uIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0eTpcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgbXV0ZXggPSBjcmVhdGVNdXRleCgpXG4gKiBtdXRleCgoKSA9PiB7XG4gKiAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgaW1tZWRpYXRlbHkgZXhlY3V0ZWRcbiAqICAgbXV0ZXgoKCkgPT4ge1xuICogICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgbm90IGV4ZWN1dGVkLCBhcyB0aGUgbXV0ZXggaXMgYWxyZWFkeSBhY3RpdmUuXG4gKiAgIH0pXG4gKiB9KVxuICpcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG11dHVhbCBleGNsdWRlIGZ1bmN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmNvbnN0IGNyZWF0ZU11dGV4ID0gKCkgPT4ge1xuICBsZXQgdG9rZW4gPSB0cnVlO1xuICByZXR1cm4gKGYsIGcpID0+IHtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIHRva2VuID0gZmFsc2U7XG4gICAgICB0cnkge1xuICAgICAgICBmKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0b2tlbiA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGcoKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQG1vZHVsZSBiaW5kaW5ncy9kb21cbiAqL1xuXG4vKipcbiAqIEBtb2R1bGUgdHlwZXNcbiAqL1xuXG4vKipcbiAqIERlZmluZSB0aGUgZWxlbWVudHMgdG8gd2hpY2ggYSBzZXQgb2YgQ1NTIHF1ZXJpZXMgYXBwbHkuXG4gKiB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL0NTU19TZWxlY3RvcnN8Q1NTX1NlbGVjdG9yc31cbiAqXG4gKiBAZXhhbXBsZVxuICogICBxdWVyeSA9ICcuY2xhc3NTZWxlY3RvcidcbiAqICAgcXVlcnkgPSAnbm9kZVNlbGVjdG9yJ1xuICogICBxdWVyeSA9ICcjaWRTZWxlY3RvcidcbiAqXG4gKiBAdHlwZWRlZiB7c3RyaW5nfSBDU1NfU2VsZWN0b3JcbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdWJzZXQgb2YgdGhlIG5vZGVzIG9mIGEgWVhtbEVsZW1lbnQgLyBZWG1sRnJhZ21lbnQgYW5kIGFcbiAqIHBvc2l0aW9uIHdpdGhpbiB0aGVtLlxuICpcbiAqIENhbiBiZSBjcmVhdGVkIHdpdGgge0BsaW5rIFlYbWxGcmFnbWVudCNjcmVhdGVUcmVlV2Fsa2VyfVxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgWVhtbFRyZWVXYWxrZXIge1xuICBjb25zdHJ1Y3RvciAocm9vdCwgZikge1xuICAgIHRoaXMuX2ZpbHRlciA9IGYgfHwgKCgpID0+IHRydWUpO1xuICAgIHRoaXMuX3Jvb3QgPSByb290O1xuICAgIHRoaXMuX2N1cnJlbnROb2RlID0gcm9vdDtcbiAgICB0aGlzLl9maXJzdENhbGwgPSB0cnVlO1xuICB9XG4gIFtTeW1ib2wuaXRlcmF0b3JdICgpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG4gIC8qKlxuICAgKiBHZXQgdGhlIG5leHQgbm9kZS5cbiAgICpcbiAgICogQHJldHVybiB7WVhtbEVsZW1lbnR9IFRoZSBuZXh0IG5vZGUuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIG5leHQgKCkge1xuICAgIGxldCBuID0gdGhpcy5fY3VycmVudE5vZGU7XG4gICAgaWYgKHRoaXMuX2ZpcnN0Q2FsbCkge1xuICAgICAgdGhpcy5fZmlyc3RDYWxsID0gZmFsc2U7XG4gICAgICBpZiAoIW4uX2RlbGV0ZWQgJiYgdGhpcy5fZmlsdGVyKG4pKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBuLCBkb25lOiBmYWxzZSB9XG4gICAgICB9XG4gICAgfVxuICAgIGRvIHtcbiAgICAgIGlmICghbi5fZGVsZXRlZCAmJiAobi5jb25zdHJ1Y3RvciA9PT0gWVhtbEVsZW1lbnQgfHwgbi5jb25zdHJ1Y3RvciA9PT0gWVhtbEZyYWdtZW50KSAmJiBuLl9zdGFydCAhPT0gbnVsbCkge1xuICAgICAgICAvLyB3YWxrIGRvd24gaW4gdGhlIHRyZWVcbiAgICAgICAgbiA9IG4uX3N0YXJ0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gd2FsayByaWdodCBvciB1cCBpbiB0aGUgdHJlZVxuICAgICAgICB3aGlsZSAobiAhPT0gdGhpcy5fcm9vdCkge1xuICAgICAgICAgIGlmIChuLl9yaWdodCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbiA9IG4uX3JpZ2h0O1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgICAgbiA9IG4uX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobiA9PT0gdGhpcy5fcm9vdCkge1xuICAgICAgICAgIG4gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobiA9PT0gdGhpcy5fcm9vdCkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH0gd2hpbGUgKG4gIT09IG51bGwgJiYgKG4uX2RlbGV0ZWQgfHwgIXRoaXMuX2ZpbHRlcihuKSkpXG4gICAgdGhpcy5fY3VycmVudE5vZGUgPSBuO1xuICAgIGlmIChuID09PSBudWxsKSB7XG4gICAgICByZXR1cm4geyBkb25lOiB0cnVlIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IG4sIGRvbmU6IGZhbHNlIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAbW9kdWxlIHR5cGVzXG4gKi9cblxuLyoqXG4gKiBBbiBFdmVudCB0aGF0IGRlc2NyaWJlcyBjaGFuZ2VzIG9uIGEgWVhtbCBFbGVtZW50IG9yIFl4bWwgRnJhZ21lbnRcbiAqXG4gKiBAcHJvdGVjdGVkXG4gKi9cbmNsYXNzIFlYbWxFdmVudCBleHRlbmRzIFlFdmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1R5cGV9IHRhcmdldCBUaGUgdGFyZ2V0IG9uIHdoaWNoIHRoZSBldmVudCBpcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge1NldH0gc3VicyBUaGUgc2V0IG9mIGNoYW5nZWQgYXR0cmlidXRlcy4gYG51bGxgIGlzIGluY2x1ZGVkIGlmIHRoZVxuICAgKiAgICAgICAgICAgICAgICAgICBjaGlsZCBsaXN0IGNoYW5nZWQuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVtb3RlIFdoZXRoZXIgdGhpcyBjaGFuZ2Ugd2FzIGNyZWF0ZWQgYnkgYSByZW1vdGUgcGVlci5cbiAgICogQHBhcmFtIHtUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb24gVGhlIHRyYW5zYWN0aW9uIGluc3RhbmNlIHdpdGggd2ljaCB0aGVcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlIHdhcyBjcmVhdGVkLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKHRhcmdldCwgc3VicywgcmVtb3RlLCB0cmFuc2FjdGlvbikge1xuICAgIHN1cGVyKHRhcmdldCk7XG4gICAgLyoqXG4gICAgICogVGhlIHRyYW5zYWN0aW9uIGluc3RhbmNlIGZvciB0aGUgY29tcHV0ZWQgY2hhbmdlLlxuICAgICAqIEB0eXBlIHtUcmFuc2FjdGlvbn1cbiAgICAgKi9cbiAgICB0aGlzLl90cmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNoaWxkcmVuIGNoYW5nZWQuXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5jaGlsZExpc3RDaGFuZ2VkID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogU2V0IG9mIGFsbCBjaGFuZ2VkIGF0dHJpYnV0ZXMuXG4gICAgICogQHR5cGUge1NldH1cbiAgICAgKi9cbiAgICB0aGlzLmF0dHJpYnV0ZXNDaGFuZ2VkID0gbmV3IFNldCgpO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhpcyBjaGFuZ2Ugd2FzIGNyZWF0ZWQgYnkgYSByZW1vdGUgcGVlci5cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLnJlbW90ZSA9IHJlbW90ZTtcbiAgICBzdWJzLmZvckVhY2goKHN1YikgPT4ge1xuICAgICAgaWYgKHN1YiA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNoaWxkTGlzdENoYW5nZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGVzQ2hhbmdlZC5hZGQoc3ViKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEBtb2R1bGUgdHlwZXNcbiAqL1xuXG4vKipcbiAqIERvbSBmaWx0ZXIgZnVuY3Rpb24uXG4gKlxuICogQGNhbGxiYWNrIGRvbUZpbHRlclxuICogQHBhcmFtIHtzdHJpbmd9IG5vZGVOYW1lIFRoZSBub2RlTmFtZSBvZiB0aGUgZWxlbWVudFxuICogQHBhcmFtIHtNYXB9IGF0dHJpYnV0ZXMgVGhlIG1hcCBvZiBhdHRyaWJ1dGVzLlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0byBpbmNsdWRlIHRoZSBEb20gbm9kZSBpbiB0aGUgWVhtbEVsZW1lbnQuXG4gKi9cblxuLyoqXG4gKiBEZWZpbmUgdGhlIGVsZW1lbnRzIHRvIHdoaWNoIGEgc2V0IG9mIENTUyBxdWVyaWVzIGFwcGx5LlxuICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9DU1NfU2VsZWN0b3JzfENTU19TZWxlY3RvcnN9XG4gKlxuICogQGV4YW1wbGVcbiAqICAgcXVlcnkgPSAnLmNsYXNzU2VsZWN0b3InXG4gKiAgIHF1ZXJ5ID0gJ25vZGVTZWxlY3RvcidcbiAqICAgcXVlcnkgPSAnI2lkU2VsZWN0b3InXG4gKlxuICogQHR5cGVkZWYge3N0cmluZ30gQ1NTX1NlbGVjdG9yXG4gKi8vKipcbiAqIEBtb2R1bGUgdHlwZXNcbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBsaXN0IG9mIHtAbGluayBZWG1sRWxlbWVudH0uYW5kIHtAbGluayBZWG1sVGV4dH0gdHlwZXMuXG4gKiBBIFl4bWxGcmFnbWVudCBpcyBzaW1pbGFyIHRvIGEge0BsaW5rIFlYbWxFbGVtZW50fSwgYnV0IGl0IGRvZXMgbm90IGhhdmUgYVxuICogbm9kZU5hbWUgYW5kIGl0IGRvZXMgbm90IGhhdmUgYXR0cmlidXRlcy4gVGhvdWdoIGl0IGNhbiBiZSBib3VuZCB0byBhIERPTVxuICogZWxlbWVudCAtIGluIHRoaXMgY2FzZSB0aGUgYXR0cmlidXRlcyBhbmQgdGhlIG5vZGVOYW1lIGFyZSBub3Qgc2hhcmVkLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY2xhc3MgWVhtbEZyYWdtZW50IGV4dGVuZHMgWUFycmF5IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIHN1YnRyZWUgb2YgY2hpbGROb2Rlcy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgd2Fsa2VyID0gZWxlbS5jcmVhdGVUcmVlV2Fsa2VyKGRvbSA9PiBkb20ubm9kZU5hbWUgPT09ICdkaXYnKVxuICAgKiBmb3IgKGxldCBub2RlIGluIHdhbGtlcikge1xuICAgKiAgIC8vIGBub2RlYCBpcyBhIGRpdiBub2RlXG4gICAqICAgbm9wKG5vZGUpXG4gICAqIH1cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZmlsdGVyIEZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIG9uIGVhY2ggY2hpbGQgZWxlbWVudCBhbmRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybnMgYSBCb29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgY2hpbGRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGlzIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBzdWJ0cmVlLlxuICAgKiBAcmV0dXJuIHtZWG1sVHJlZVdhbGtlcn0gQSBzdWJ0cmVlIGFuZCBhIHBvc2l0aW9uIHdpdGhpbiBpdC5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY3JlYXRlVHJlZVdhbGtlciAoZmlsdGVyKSB7XG4gICAgcmV0dXJuIG5ldyBZWG1sVHJlZVdhbGtlcih0aGlzLCBmaWx0ZXIpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmlyc3QgWVhtbEVsZW1lbnQgdGhhdCBtYXRjaGVzIHRoZSBxdWVyeS5cbiAgICogU2ltaWxhciB0byBET00ncyB7QGxpbmsgcXVlcnlTZWxlY3Rvcn0uXG4gICAqXG4gICAqIFF1ZXJ5IHN1cHBvcnQ6XG4gICAqICAgLSB0YWduYW1lXG4gICAqIFRPRE86XG4gICAqICAgLSBpZFxuICAgKiAgIC0gYXR0cmlidXRlXG4gICAqXG4gICAqIEBwYXJhbSB7Q1NTX1NlbGVjdG9yfSBxdWVyeSBUaGUgcXVlcnkgb24gdGhlIGNoaWxkcmVuLlxuICAgKiBAcmV0dXJuIHtZWG1sRWxlbWVudH0gVGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBtYXRjaGVzIHRoZSBxdWVyeSBvciBudWxsLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBxdWVyeVNlbGVjdG9yIChxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcXVlcnkudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBpdGVyYXRvciA9IG5ldyBZWG1sVHJlZVdhbGtlcih0aGlzLCBlbGVtZW50ID0+IGVsZW1lbnQubm9kZU5hbWUgPT09IHF1ZXJ5KTtcbiAgICBjb25zdCBuZXh0ID0gaXRlcmF0b3IubmV4dCgpO1xuICAgIGlmIChuZXh0LmRvbmUpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXh0LnZhbHVlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWxsIFlYbWxFbGVtZW50cyB0aGF0IG1hdGNoIHRoZSBxdWVyeS5cbiAgICogU2ltaWxhciB0byBEb20ncyB7QGxpbmsgcXVlcnlTZWxlY3RvckFsbH0uXG4gICAqXG4gICAqIFRPRE86IERvZXMgbm90IHlldCBzdXBwb3J0IGFsbCBxdWVyaWVzLiBDdXJyZW50bHkgb25seSBxdWVyeSBieSB0YWdOYW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0NTU19TZWxlY3Rvcn0gcXVlcnkgVGhlIHF1ZXJ5IG9uIHRoZSBjaGlsZHJlblxuICAgKiBAcmV0dXJuIHtBcnJheTxZWG1sRWxlbWVudD59IFRoZSBlbGVtZW50cyB0aGF0IG1hdGNoIHRoaXMgcXVlcnkuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHF1ZXJ5U2VsZWN0b3JBbGwgKHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSBxdWVyeS50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBZWG1sVHJlZVdhbGtlcih0aGlzLCBlbGVtZW50ID0+IGVsZW1lbnQubm9kZU5hbWUgPT09IHF1ZXJ5KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIFlBcnJheSBFdmVudCBhbmQgY2FsbHMgb2JzZXJ2ZXJzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NhbGxPYnNlcnZlciAodHJhbnNhY3Rpb24sIHBhcmVudFN1YnMsIHJlbW90ZSkge1xuICAgIHRoaXMuX2NhbGxFdmVudEhhbmRsZXIodHJhbnNhY3Rpb24sIG5ldyBZWG1sRXZlbnQodGhpcywgcGFyZW50U3VicywgcmVtb3RlLCB0cmFuc2FjdGlvbikpO1xuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLnRvRG9tU3RyaW5nKClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhbGwgdGhlIGNoaWxkcmVuIG9mIHRoaXMgWVhtbEZyYWdtZW50LlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYWxsIGNoaWxkcmVuLlxuICAgKi9cbiAgdG9Eb21TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLm1hcCh4bWwgPT4geG1sLnRvRG9tU3RyaW5nKCkpLmpvaW4oJycpXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIERvbSBFbGVtZW50IHRoYXQgbWlycm9ycyB0aGlzIFlYbWxFbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0RvY3VtZW50fSBbX2RvY3VtZW50PWRvY3VtZW50XSBUaGUgZG9jdW1lbnQgb2JqZWN0ICh5b3UgbXVzdCBkZWZpbmVcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyB3aGVuIGNhbGxpbmcgdGhpcyBtZXRob2QgaW5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZWpzKVxuICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCBhbnk+fSBbaG9va3M9e31dIE9wdGlvbmFsIHByb3BlcnR5IHRvIGN1c3RvbWl6ZSBob3cgaG9va3NcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmUgcHJlc2VudGVkIGluIHRoZSAvLyBUT0RPOiBpbmNsdWRlIGFsbCB0ZXN0c1xuXG4gICAqIEBwYXJhbSB7RG9tQmluZGluZ30gW2JpbmRpbmddIFlvdSBzaG91bGQgbm90IHNldCB0aGlzIHByb3BlcnR5LiBULy8gVE9ETzogaW5jbHVkZSBhbGwgdGVzdHNcblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkIGlmIERvbUJpbmRpbmcgd2FudHMgdG8gY3JlYXRlIC8vIFRPRE86IGluY2x1ZGUgYWxsIHRlc3RzXG5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzb2NpYXRpb24gdG8gdGhlIGNyZWF0ZWQgRE9NIHR5cGUvLyBUT0RPOiBpbmNsdWRlIGFsbCB0ZXN0c1xuXG4gICAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9IFRoZSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnR8RG9tIEVsZW1lbnR9XG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHRvRG9tIChfZG9jdW1lbnQgPSBkb2N1bWVudCwgaG9va3MgPSB7fSwgYmluZGluZykge1xuICAgIGNvbnN0IGZyYWdtZW50ID0gX2RvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBjcmVhdGVBc3NvY2lhdGlvbihiaW5kaW5nLCBmcmFnbWVudCwgdGhpcyk7XG4gICAgdGhpcy5mb3JFYWNoKHhtbFR5cGUgPT4ge1xuICAgICAgZnJhZ21lbnQuaW5zZXJ0QmVmb3JlKHhtbFR5cGUudG9Eb20oX2RvY3VtZW50LCBob29rcywgYmluZGluZyksIG51bGwpO1xuICAgIH0pO1xuICAgIHJldHVybiBmcmFnbWVudFxuICB9XG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gdGhpcyBZWG1sIFR5cGUgdG8gYSByZWFkYWJsZSBmb3JtYXQuXG4gICAqIFVzZWZ1bCBmb3IgbG9nZ2luZyBhcyBhbGwgSXRlbXMgYW5kIERlbGV0ZSBpbXBsZW1lbnQgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbG9nU3RyaW5nICgpIHtcbiAgICByZXR1cm4gbG9nSXRlbUhlbHBlcignWVhtbCcsIHRoaXMpXG4gIH1cbn1cblxuLyoqXG4gKiBBbiBZWG1sRWxlbWVudCBpbWl0YXRlcyB0aGUgYmVoYXZpb3Igb2YgYVxuICoge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50fERvbSBFbGVtZW50fS5cbiAqXG4gKiAqIEFuIFlYbWxFbGVtZW50IGhhcyBhdHRyaWJ1dGVzIChrZXkgdmFsdWUgcGFpcnMpXG4gKiAqIEFuIFlYbWxFbGVtZW50IGhhcyBjaGlsZEVsZW1lbnRzIHRoYXQgbXVzdCBpbmhlcml0IGZyb20gWVhtbEVsZW1lbnRcbiAqL1xuY2xhc3MgWVhtbEVsZW1lbnQgZXh0ZW5kcyBZWG1sRnJhZ21lbnQge1xuICBjb25zdHJ1Y3RvciAobm9kZU5hbWUgPSAnVU5ERUZJTkVEJykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5ub2RlTmFtZSA9IG5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBJdGVtIHdpdGggdGhlIHNhbWUgZWZmZWN0IGFzIHRoaXMgSXRlbSAod2l0aG91dCBwb3NpdGlvbiBlZmZlY3QpXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY29weSAoKSB7XG4gICAgbGV0IHN0cnVjdCA9IHN1cGVyLl9jb3B5KCk7XG4gICAgc3RydWN0Lm5vZGVOYW1lID0gdGhpcy5ub2RlTmFtZTtcbiAgICByZXR1cm4gc3RydWN0XG4gIH1cblxuICAvKipcbiAgICogUmVhZCB0aGUgbmV4dCBJdGVtIGluIGEgRGVjb2RlciBhbmQgZmlsbCB0aGlzIEl0ZW0gd2l0aCB0aGUgcmVhZCBkYXRhLlxuICAgKlxuICAgKiBUaGlzIGlzIGNhbGxlZCB3aGVuIGRhdGEgaXMgcmVjZWl2ZWQgZnJvbSBhIHJlbW90ZSBwZWVyLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1l9IHkgVGhlIFlqcyBpbnN0YW5jZSB0aGF0IHRoaXMgSXRlbSBiZWxvbmdzIHRvLlxuICAgKiBAcGFyYW0ge2RlY29kaW5nLkRlY29kZXJ9IGRlY29kZXIgVGhlIGRlY29kZXIgb2JqZWN0IHRvIHJlYWQgZGF0YSBmcm9tLlxuICAgKi9cbiAgX2Zyb21CaW5hcnkgKHksIGRlY29kZXIpIHtcbiAgICBjb25zdCBtaXNzaW5nID0gc3VwZXIuX2Zyb21CaW5hcnkoeSwgZGVjb2Rlcik7XG4gICAgdGhpcy5ub2RlTmFtZSA9IHJlYWRWYXJTdHJpbmcoZGVjb2Rlcik7XG4gICAgcmV0dXJuIG1pc3NpbmdcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm0gdGhlIHByb3BlcnRpZXMgb2YgdGhpcyB0eXBlIHRvIGJpbmFyeSBhbmQgd3JpdGUgaXQgdG8gYW5cbiAgICogQmluYXJ5RW5jb2Rlci5cbiAgICpcbiAgICogVGhpcyBpcyBjYWxsZWQgd2hlbiB0aGlzIEl0ZW0gaXMgc2VudCB0byBhIHJlbW90ZSBwZWVyLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge2VuY29kaW5nLkVuY29kZXJ9IGVuY29kZXIgVGhlIGVuY29kZXIgdG8gd3JpdGUgZGF0YSB0by5cbiAgICovXG4gIF90b0JpbmFyeSAoZW5jb2Rlcikge1xuICAgIHN1cGVyLl90b0JpbmFyeShlbmNvZGVyKTtcbiAgICB3cml0ZVZhclN0cmluZyhlbmNvZGVyLCB0aGlzLm5vZGVOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlZ3JhdGVzIHRoaXMgSXRlbSBpbnRvIHRoZSBzaGFyZWQgc3RydWN0dXJlLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBhY3R1YWxseSBhcHBsaWVzIHRoZSBjaGFuZ2UgdG8gdGhlIFlqcyBpbnN0YW5jZS4gSW4gY2FzZSBvZlxuICAgKiBJdGVtIGl0IGNvbm5lY3RzIF9sZWZ0IGFuZCBfcmlnaHQgdG8gdGhpcyBJdGVtIGFuZCBjYWxscyB0aGVcbiAgICoge0BsaW5rIEl0ZW0jYmVmb3JlQ2hhbmdlfSBtZXRob2QuXG4gICAqXG4gICAqICogQ2hlY2tzIGZvciBub2RlTmFtZVxuICAgKiAqIFNldHMgZG9tRmlsdGVyXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7WX0geSBUaGUgWWpzIGluc3RhbmNlXG4gICAqL1xuICBfaW50ZWdyYXRlICh5KSB7XG4gICAgaWYgKHRoaXMubm9kZU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm9kZU5hbWUgbXVzdCBiZSBkZWZpbmVkIScpXG4gICAgfVxuICAgIHN1cGVyLl9pbnRlZ3JhdGUoeSk7XG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9Eb21TdHJpbmcoKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIFlYbWxFbGVtZW50LlxuICAgKiBUaGUgYXR0cmlidXRlcyBhcmUgb3JkZXJlZCBieSBhdHRyaWJ1dGUtbmFtZSwgc28geW91IGNhbiBlYXNpbHkgdXNlIHRoaXNcbiAgICogbWV0aG9kIHRvIGNvbXBhcmUgWVhtbEVsZW1lbnRzXG4gICAqXG4gICAqIEByZXR1cm4ge1N0cmluZ30gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHR5cGUuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHRvRG9tU3RyaW5nICgpIHtcbiAgICBjb25zdCBhdHRycyA9IHRoaXMuZ2V0QXR0cmlidXRlcygpO1xuICAgIGNvbnN0IHN0cmluZ0J1aWxkZXIgPSBbXTtcbiAgICBjb25zdCBrZXlzID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJzKSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5zb3J0KCk7XG4gICAgY29uc3Qga2V5c0xlbiA9IGtleXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5c0xlbjsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgc3RyaW5nQnVpbGRlci5wdXNoKGtleSArICc9XCInICsgYXR0cnNba2V5XSArICdcIicpO1xuICAgIH1cbiAgICBjb25zdCBub2RlTmFtZSA9IHRoaXMubm9kZU5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICBjb25zdCBhdHRyc1N0cmluZyA9IHN0cmluZ0J1aWxkZXIubGVuZ3RoID4gMCA/ICcgJyArIHN0cmluZ0J1aWxkZXIuam9pbignICcpIDogJyc7XG4gICAgcmV0dXJuIGA8JHtub2RlTmFtZX0ke2F0dHJzU3RyaW5nfT4ke3N1cGVyLnRvRG9tU3RyaW5nKCl9PC8ke25vZGVOYW1lfT5gXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBhdHRyaWJ1dGUgZnJvbSB0aGlzIFlYbWxFbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBUaGUgYXR0cmlidXRlIG5hbWUgdGhhdCBpcyB0byBiZSByZW1vdmVkLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICByZW1vdmVBdHRyaWJ1dGUgKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gWU1hcC5wcm90b3R5cGUuZGVsZXRlLmNhbGwodGhpcywgYXR0cmlidXRlTmFtZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIG9yIHVwZGF0ZXMgYW4gYXR0cmlidXRlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0cmlidXRlTmFtZSBUaGUgYXR0cmlidXRlIG5hbWUgdGhhdCBpcyB0byBiZSBzZXQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyaWJ1dGVWYWx1ZSBUaGUgYXR0cmlidXRlIHZhbHVlIHRoYXQgaXMgdG8gYmUgc2V0LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBzZXRBdHRyaWJ1dGUgKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKSB7XG4gICAgcmV0dXJuIFlNYXAucHJvdG90eXBlLnNldC5jYWxsKHRoaXMsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXR0cmlidXRlIHZhbHVlIHRoYXQgYmVsb25ncyB0byB0aGUgYXR0cmlidXRlIG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyaWJ1dGVOYW1lIFRoZSBhdHRyaWJ1dGUgbmFtZSB0aGF0IGlkZW50aWZpZXMgdGhlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJpZWQgdmFsdWUuXG4gICAqIEBwYXJhbSB7aW1wb3J0KCcuLi9wcm90b2NvbHMvaGlzdG9yeS5qcycpLkhpc3RvcnlTbmFwc2hvdH0gW3NuYXBzaG90XVxuICAgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBxdWVyaWVkIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZ2V0QXR0cmlidXRlIChhdHRyaWJ1dGVOYW1lLCBzbmFwc2hvdCkge1xuICAgIHJldHVybiBZTWFwLnByb3RvdHlwZS5nZXQuY2FsbCh0aGlzLCBhdHRyaWJ1dGVOYW1lLCBzbmFwc2hvdClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFsbCBhdHRyaWJ1dGUgbmFtZS92YWx1ZSBwYWlycyBpbiBhIEpTT04gT2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnLi4vcHJvdG9jb2xzL2hpc3RvcnkuanMnKS5IaXN0b3J5U25hcHNob3R9IFtzbmFwc2hvdF1cbiAgICogQHJldHVybiB7T2JqZWN0fSBBIEpTT04gT2JqZWN0IHRoYXQgZGVzY3JpYmVzIHRoZSBhdHRyaWJ1dGVzLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBnZXRBdHRyaWJ1dGVzIChzbmFwc2hvdCkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgIGlmIChzbmFwc2hvdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgdGhpcy5fbWFwKSB7XG4gICAgICAgIGlmICghdmFsdWUuX2RlbGV0ZWQpIHtcbiAgICAgICAgICBvYmpba2V5XSA9IHZhbHVlLl9jb250ZW50WzBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIFlNYXAucHJvdG90eXBlLmtleXMuY2FsbCh0aGlzLCBzbmFwc2hvdCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBvYmpba2V5XSA9IFlNYXAucHJvdG90eXBlLmdldC5jYWxsKHRoaXMsIGtleSwgc25hcHNob3QpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBvYmpcbiAgfVxuICAvLyBUT0RPOiBvdXRzb3VyY2UgdGhlIGJpbmRpbmcgcHJvcGVydHkuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgRG9tIEVsZW1lbnQgdGhhdCBtaXJyb3JzIHRoaXMgWVhtbEVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IFtfZG9jdW1lbnQ9ZG9jdW1lbnRdIFRoZSBkb2N1bWVudCBvYmplY3QgKHlvdSBtdXN0IGRlZmluZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIHdoZW4gY2FsbGluZyB0aGlzIG1ldGhvZCBpblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlanMpXG4gICAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gW2hvb2tzPXt9XSBPcHRpb25hbCBwcm9wZXJ0eSB0byBjdXN0b21pemUgaG93IGhvb2tzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlIHByZXNlbnRlZCBpbiB0aGUgRE9NXG4gICAqIEBwYXJhbSB7RG9tQmluZGluZ30gW2JpbmRpbmddIFlvdSBzaG91bGQgbm90IHNldCB0aGlzIHByb3BlcnR5LiBUaGlzIGlzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQgaWYgRG9tQmluZGluZyB3YW50cyB0byBjcmVhdGUgYVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NvY2lhdGlvbiB0byB0aGUgY3JlYXRlZCBET00gdHlwZS5cbiAgICogQHJldHVybiB7RWxlbWVudH0gVGhlIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudHxEb20gRWxlbWVudH1cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdG9Eb20gKF9kb2N1bWVudCA9IGRvY3VtZW50LCBob29rcyA9IHt9LCBiaW5kaW5nKSB7XG4gICAgY29uc3QgZG9tID0gX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5ub2RlTmFtZSk7XG4gICAgbGV0IGF0dHJzID0gdGhpcy5nZXRBdHRyaWJ1dGVzKCk7XG4gICAgZm9yIChsZXQga2V5IGluIGF0dHJzKSB7XG4gICAgICBkb20uc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gICAgfVxuICAgIHRoaXMuZm9yRWFjaCh5eG1sID0+IHtcbiAgICAgIGRvbS5hcHBlbmRDaGlsZCh5eG1sLnRvRG9tKF9kb2N1bWVudCwgaG9va3MsIGJpbmRpbmcpKTtcbiAgICB9KTtcbiAgICBjcmVhdGVBc3NvY2lhdGlvbihiaW5kaW5nLCBkb20sIHRoaXMpO1xuICAgIHJldHVybiBkb21cbiAgfVxufVxuXG4vKipcbiAqIEBtb2R1bGUgdXRpbHNcbiAqL1xuXG4vKipcbiAqIENoZWNrIGlmIGBwYXJlbnRgIGlzIGEgcGFyZW50IG9mIGBjaGlsZGAuXG4gKlxuICogQHBhcmFtIHtUeXBlIHwgWX0gcGFyZW50XG4gKiBAcGFyYW0ge1R5cGUgfCBZfSBjaGlsZFxuICogQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciBgcGFyZW50YCBpcyBhIHBhcmVudCBvZiBgY2hpbGRgLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuY29uc3QgaXNQYXJlbnRPZiA9IChwYXJlbnQsIGNoaWxkKSA9PiB7XG4gIGNoaWxkID0gY2hpbGQuX3BhcmVudDtcbiAgd2hpbGUgKGNoaWxkICE9PSBudWxsKSB7XG4gICAgaWYgKGNoaWxkID09PSBwYXJlbnQpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGNoaWxkID0gY2hpbGQuX3BhcmVudDtcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn07XG5cbi8qKlxuICogQG1vZHVsZSBiaW5kaW5ncy9kb21cbiAqL1xuXG4vKipcbiAqIEBtb2R1bGUgYmluZGluZ3MvZG9tXG4gKi9cblxuLyoqXG4gKiBAbW9kdWxlIGRpZmZcbiAqL1xuXG4vKipcbiAqIEBtb2R1bGUgYmluZGluZ3MvZG9tXG4gKi9cblxuLyoqXG4gKiBAbW9kdWxlIGJpbmRpbmdzL2RvbVxuICovXG5cbi8qKlxuICogQSBmaWx0ZXIgZGVmaW5lcyB3aGljaCBlbGVtZW50cyBhbmQgYXR0cmlidXRlcyB0byBzaGFyZS5cbiAqIFJldHVybiBudWxsIGlmIHRoZSBub2RlIHNob3VsZCBiZSBmaWx0ZXJlZC4gT3RoZXJ3aXNlIHJldHVybiB0aGUgTWFwIG9mXG4gKiBhY2NlcHRlZCBhdHRyaWJ1dGVzLlxuICpcbiAqIEBjYWxsYmFjayBGaWx0ZXJGdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5vZGVOYW1lXG4gKiBAcGFyYW0ge01hcH0gYXR0cnNcbiAqIEByZXR1cm4ge01hcHxudWxsfVxuICovXG5cbi8qKlxuICogQG1vZHVsZSB0eXBlc1xuICovXG5cbi8qKlxuICogWW91IGNhbiBtYW5hZ2UgYmluZGluZyB0byBhIGN1c3RvbSB0eXBlIHdpdGggWVhtbEhvb2suXG4gKlxuICogQHB1YmxpY1xuICovXG5jbGFzcyBZWG1sSG9vayBleHRlbmRzIFlNYXAge1xuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd9IGhvb2tOYW1lIG5vZGVOYW1lIG9mIHRoZSBEb20gTm9kZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChob29rTmFtZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5ob29rTmFtZSA9IG51bGw7XG4gICAgaWYgKGhvb2tOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaG9va05hbWUgPSBob29rTmFtZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBJdGVtIHdpdGggdGhlIHNhbWUgZWZmZWN0IGFzIHRoaXMgSXRlbSAod2l0aG91dCBwb3NpdGlvbiBlZmZlY3QpXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfY29weSAoKSB7XG4gICAgY29uc3Qgc3RydWN0ID0gc3VwZXIuX2NvcHkoKTtcbiAgICBzdHJ1Y3QuaG9va05hbWUgPSB0aGlzLmhvb2tOYW1lO1xuICAgIHJldHVybiBzdHJ1Y3RcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgRG9tIEVsZW1lbnQgdGhhdCBtaXJyb3JzIHRoaXMgWVhtbEVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IFtfZG9jdW1lbnQ9ZG9jdW1lbnRdIFRoZSBkb2N1bWVudCBvYmplY3QgKHlvdSBtdXN0IGRlZmluZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIHdoZW4gY2FsbGluZyB0aGlzIG1ldGhvZCBpblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlanMpXG4gICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsIGFueT59IFtob29rc10gT3B0aW9uYWwgcHJvcGVydHkgdG8gY3VzdG9taXplIGhvdyBob29rc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZSBwcmVzZW50ZWQgaW4gdGhlIERPTVxuICAgKiBAcGFyYW0ge0RvbUJpbmRpbmd9IFtiaW5kaW5nXSBZb3Ugc2hvdWxkIG5vdCBzZXQgdGhpcyBwcm9wZXJ0eS4gVGhpcyBpc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkIGlmIERvbUJpbmRpbmcgd2FudHMgdG8gY3JlYXRlIGFcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzb2NpYXRpb24gdG8gdGhlIGNyZWF0ZWQgRE9NIHR5cGVcbiAgICogQHJldHVybiB7RWxlbWVudH0gVGhlIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudHxEb20gRWxlbWVudH1cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdG9Eb20gKF9kb2N1bWVudCA9IGRvY3VtZW50LCBob29rcyA9IHt9LCBiaW5kaW5nKSB7XG4gICAgY29uc3QgaG9vayA9IGhvb2tzW3RoaXMuaG9va05hbWVdO1xuICAgIGxldCBkb207XG4gICAgaWYgKGhvb2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZG9tID0gaG9vay5jcmVhdGVEb20odGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy5ob29rTmFtZSk7XG4gICAgfVxuICAgIGRvbS5zZXRBdHRyaWJ1dGUoJ2RhdGEteWpzLWhvb2snLCB0aGlzLmhvb2tOYW1lKTtcbiAgICBjcmVhdGVBc3NvY2lhdGlvbihiaW5kaW5nLCBkb20sIHRoaXMpO1xuICAgIHJldHVybiBkb21cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkIHRoZSBuZXh0IEl0ZW0gaW4gYSBEZWNvZGVyIGFuZCBmaWxsIHRoaXMgSXRlbSB3aXRoIHRoZSByZWFkIGRhdGEuXG4gICAqXG4gICAqIFRoaXMgaXMgY2FsbGVkIHdoZW4gZGF0YSBpcyByZWNlaXZlZCBmcm9tIGEgcmVtb3RlIHBlZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7WX0geSBUaGUgWWpzIGluc3RhbmNlIHRoYXQgdGhpcyBJdGVtIGJlbG9uZ3MgdG8uXG4gICAqIEBwYXJhbSB7ZGVjb2RpbmcuRGVjb2Rlcn0gZGVjb2RlciBUaGUgZGVjb2RlciBvYmplY3QgdG8gcmVhZCBkYXRhIGZyb20uXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZnJvbUJpbmFyeSAoeSwgZGVjb2Rlcikge1xuICAgIGNvbnN0IG1pc3NpbmcgPSBzdXBlci5fZnJvbUJpbmFyeSh5LCBkZWNvZGVyKTtcbiAgICB0aGlzLmhvb2tOYW1lID0gcmVhZFZhclN0cmluZyhkZWNvZGVyKTtcbiAgICByZXR1cm4gbWlzc2luZ1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSB0aGUgcHJvcGVydGllcyBvZiB0aGlzIHR5cGUgdG8gYmluYXJ5IGFuZCB3cml0ZSBpdCB0byBhblxuICAgKiBCaW5hcnlFbmNvZGVyLlxuICAgKlxuICAgKiBUaGlzIGlzIGNhbGxlZCB3aGVuIHRoaXMgSXRlbSBpcyBzZW50IHRvIGEgcmVtb3RlIHBlZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7ZW5jb2RpbmcuRW5jb2Rlcn0gZW5jb2RlciBUaGUgZW5jb2RlciB0byB3cml0ZSBkYXRhIHRvLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3RvQmluYXJ5IChlbmNvZGVyKSB7XG4gICAgc3VwZXIuX3RvQmluYXJ5KGVuY29kZXIpO1xuICAgIHdyaXRlVmFyU3RyaW5nKGVuY29kZXIsIHRoaXMuaG9va05hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVncmF0ZSB0aGlzIHR5cGUgaW50byB0aGUgWWpzIGluc3RhbmNlLlxuICAgKlxuICAgKiAqIFNhdmUgdGhpcyBzdHJ1Y3QgaW4gdGhlIG9zXG4gICAqICogVGhpcyB0eXBlIGlzIHNlbnQgdG8gb3RoZXIgY2xpZW50XG4gICAqICogT2JzZXJ2ZXIgZnVuY3Rpb25zIGFyZSBmaXJlZFxuICAgKlxuICAgKiBAcGFyYW0ge1l9IHkgVGhlIFlqcyBpbnN0YW5jZVxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2ludGVncmF0ZSAoeSkge1xuICAgIGlmICh0aGlzLmhvb2tOYW1lID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2hvb2tOYW1lIG11c3QgYmUgZGVmaW5lZCEnKVxuICAgIH1cbiAgICBzdXBlci5faW50ZWdyYXRlKHkpO1xuICB9XG59XG5cbi8qKlxuICogQG1vZHVsZSBiaW5kaW5ncy9kb21cbiAqL1xuXG4vKipcbiAqIEBtb2R1bGUgYmluZGluZ3MvZG9tXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFzc29jaWF0aW9uICh0aGUgaW5mb3JtYXRpb24gdGhhdCBhIERPTSBlbGVtZW50IGJlbG9uZ3MgdG8gYVxuICogdHlwZSkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtEb21CaW5kaW5nfSBkb21CaW5kaW5nIFRoZSBiaW5kaW5nIG9iamVjdFxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fEVsZW1lbnR8VGV4dH0gZG9tIFRoZSBkb20gdGhhdCBpcyB0byBiZSBhc3NvY2lhdGVkIHdpdGggdHlwZVxuICogQHBhcmFtIHtZWG1sRnJhZ21lbnR8WVhtbEVsZW1lbnR8WVhtbEhvb2t8WVhtbFRleHR9IHR5cGUgVGhlIHR5cGUgdGhhdCBpcyB0byBiZSBhc3NvY2lhdGVkIHdpdGggZG9tXG4gKlxuICovXG5jb25zdCBjcmVhdGVBc3NvY2lhdGlvbiA9IChkb21CaW5kaW5nLCBkb20sIHR5cGUpID0+IHtcbiAgaWYgKGRvbUJpbmRpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGRvbUJpbmRpbmcuZG9tVG9UeXBlLnNldChkb20sIHR5cGUpO1xuICAgIGRvbUJpbmRpbmcudHlwZVRvRG9tLnNldCh0eXBlLCBkb20pO1xuICB9XG59O1xuXG4vKipcbiAqIEBtb2R1bGUgdHlwZXNcbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGV4dCBpbiBhIERvbSBFbGVtZW50LiBJbiB0aGUgZnV0dXJlIHRoaXMgdHlwZSB3aWxsIGFsc28gaGFuZGxlXG4gKiBzaW1wbGUgZm9ybWF0dGluZyBpbmZvcm1hdGlvbiBsaWtlIGJvbGQgYW5kIGl0YWxpYy5cbiAqL1xuY2xhc3MgWVhtbFRleHQgZXh0ZW5kcyBZVGV4dCB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgRG9tIEVsZW1lbnQgdGhhdCBtaXJyb3JzIHRoaXMgWVhtbFRleHQuXG4gICAqXG4gICAqIEBwYXJhbSB7RG9jdW1lbnR9IFtfZG9jdW1lbnQ9ZG9jdW1lbnRdIFRoZSBkb2N1bWVudCBvYmplY3QgKHlvdSBtdXN0IGRlZmluZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIHdoZW4gY2FsbGluZyB0aGlzIG1ldGhvZCBpblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlanMpXG4gICAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gW2hvb2tzXSBPcHRpb25hbCBwcm9wZXJ0eSB0byBjdXN0b21pemUgaG93IGhvb2tzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlIHByZXNlbnRlZCBpbiB0aGUgRE9NXG4gICAqIEBwYXJhbSB7RG9tQmluZGluZ30gW2JpbmRpbmddIFlvdSBzaG91bGQgbm90IHNldCB0aGlzIHByb3BlcnR5LiBUaGlzIGlzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQgaWYgRG9tQmluZGluZyB3YW50cyB0byBjcmVhdGUgYVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NvY2lhdGlvbiB0byB0aGUgY3JlYXRlZCBET00gdHlwZS5cbiAgICogQHJldHVybiB7VGV4dH0gVGhlIHtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudHxEb20gRWxlbWVudH1cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdG9Eb20gKF9kb2N1bWVudCA9IGRvY3VtZW50LCBob29rcywgYmluZGluZykge1xuICAgIGNvbnN0IGRvbSA9IF9kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLnRvU3RyaW5nKCkpO1xuICAgIGNyZWF0ZUFzc29jaWF0aW9uKGJpbmRpbmcsIGRvbSwgdGhpcyk7XG4gICAgcmV0dXJuIGRvbVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcmsgdGhpcyBJdGVtIGFzIGRlbGV0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7WX0geSBUaGUgWWpzIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gY3JlYXRlRGVsZXRlIFdoZXRoZXIgdG8gcHJvcGFnYXRlIGEgbWVzc2FnZSB0aGF0IHRoaXNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwZSB3YXMgZGVsZXRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBbZ2NDaGlsZHJlbj15Ll9oYXNVbmRvTWFuYWdlcj09PWZhbHNlXSBXaGV0aGVyIHRvIGdhcmJhZ2VcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3QgdGhlIGNoaWxkcmVuIG9mIHRoaXMgdHlwZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9kZWxldGUgKHksIGNyZWF0ZURlbGV0ZSwgZ2NDaGlsZHJlbikge1xuICAgIHN1cGVyLl9kZWxldGUoeSwgY3JlYXRlRGVsZXRlLCBnY0NoaWxkcmVuKTtcbiAgfVxufVxuXG4vKipcbiAqIEBtb2R1bGUgYXdhcmVuZXNzLXByb3RvY29sXG4gKi9cblxuY29uc3QgbWVzc2FnZVVzZXJzU3RhdGVDaGFuZ2VkID0gMDtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBVc2VyU3RhdGVVcGRhdGVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBVc2VyU3RhdGVVcGRhdGUudXNlcklEXG4gKiBAcHJvcGVydHkge251bWJlcn0gVXNlclN0YXRlVXBkYXRlLmNsb2NrXG4gKiBAcHJvcGVydHkge09iamVjdH0gVXNlclN0YXRlVXBkYXRlLnN0YXRlXG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge2VuY29kaW5nLkVuY29kZXJ9IGVuY29kZXJcbiAqIEBwYXJhbSB7QXJyYXk8VXNlclN0YXRlVXBkYXRlPn0gc3RhdGVVcGRhdGVzXG4gKi9cbmNvbnN0IHdyaXRlVXNlcnNTdGF0ZUNoYW5nZSA9IChlbmNvZGVyLCBzdGF0ZVVwZGF0ZXMpID0+IHtcbiAgY29uc3QgbGVuID0gc3RhdGVVcGRhdGVzLmxlbmd0aDtcbiAgd3JpdGVWYXJVaW50KGVuY29kZXIsIG1lc3NhZ2VVc2Vyc1N0YXRlQ2hhbmdlZCk7XG4gIHdyaXRlVmFyVWludChlbmNvZGVyLCBsZW4pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3Qge3VzZXJJRCwgc3RhdGUsIGNsb2NrfSA9IHN0YXRlVXBkYXRlc1tpXTtcbiAgICB3cml0ZVZhclVpbnQoZW5jb2RlciwgdXNlcklEKTtcbiAgICB3cml0ZVZhclVpbnQoZW5jb2RlciwgY2xvY2spO1xuICAgIHdyaXRlVmFyU3RyaW5nKGVuY29kZXIsIEpTT04uc3RyaW5naWZ5KHN0YXRlKSk7XG4gIH1cbn07XG5cbmNvbnN0IHJlYWRVc2Vyc1N0YXRlQ2hhbmdlID0gKGRlY29kZXIsIHkpID0+IHtcbiAgY29uc3QgYWRkZWQgPSBbXTtcbiAgY29uc3QgdXBkYXRlZCA9IFtdO1xuICBjb25zdCByZW1vdmVkID0gW107XG4gIGNvbnN0IGxlbiA9IHJlYWRWYXJVaW50KGRlY29kZXIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgdXNlcklEID0gcmVhZFZhclVpbnQoZGVjb2Rlcik7XG4gICAgY29uc3QgY2xvY2sgPSByZWFkVmFyVWludChkZWNvZGVyKTtcbiAgICBjb25zdCBzdGF0ZSA9IEpTT04ucGFyc2UocmVhZFZhclN0cmluZyhkZWNvZGVyKSk7XG4gICAgY29uc3QgdUNsb2NrID0geS5hd2FyZW5lc3NDbG9jay5nZXQodXNlcklEKSB8fCAwO1xuICAgIHkuYXdhcmVuZXNzQ2xvY2suc2V0KHVzZXJJRCwgY2xvY2spO1xuICAgIGlmIChzdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgLy8gb25seSB3cml0ZSBpZiBjbG9jayBpbmNyZWFzZXMuIGNhbm5vdCBvdmVyd3JpdGVcbiAgICAgIGlmICh5LmF3YXJlbmVzcy5oYXModXNlcklEKSAmJiB1Q2xvY2sgPCBjbG9jaykge1xuICAgICAgICB5LmF3YXJlbmVzcy5kZWxldGUodXNlcklEKTtcbiAgICAgICAgcmVtb3ZlZC5wdXNoKHVzZXJJRCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1Q2xvY2sgPD0gY2xvY2spIHsgLy8gYWxsb3cgdG8gb3ZlcndyaXRlIChlLmcuIHdoZW4gY2xpZW50IHdhcyBvbiwgdGhlbiBvZmZsaW5lKVxuICAgICAgaWYgKHkuYXdhcmVuZXNzLmhhcyh1c2VySUQpKSB7XG4gICAgICAgIHVwZGF0ZWQucHVzaCh1c2VySUQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkZWQucHVzaCh1c2VySUQpO1xuICAgICAgfVxuICAgICAgeS5hd2FyZW5lc3Muc2V0KHVzZXJJRCwgc3RhdGUpO1xuICAgICAgeS5hd2FyZW5lc3NDbG9jay5zZXQodXNlcklELCBjbG9jayk7XG4gICAgfVxuICB9XG4gIGlmIChhZGRlZC5sZW5ndGggPiAwIHx8IHVwZGF0ZWQubGVuZ3RoID4gMCB8fCByZW1vdmVkLmxlbmd0aCA+IDApIHtcbiAgICB5LmVtaXQoJ2F3YXJlbmVzcycsIHtcbiAgICAgIGFkZGVkLCB1cGRhdGVkLCByZW1vdmVkXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyXG4gKiBAcGFyYW0ge2VuY29kaW5nLkVuY29kZXJ9IGVuY29kZXJcbiAqIEByZXR1cm4ge0FycmF5PFVzZXJTdGF0ZVVwZGF0ZT59XG4gKi9cbmNvbnN0IGZvcndhcmRVc2Vyc1N0YXRlQ2hhbmdlID0gKGRlY29kZXIsIGVuY29kZXIpID0+IHtcbiAgY29uc3QgbGVuID0gcmVhZFZhclVpbnQoZGVjb2Rlcik7XG4gIGNvbnN0IHVwZGF0ZXMgPSBbXTtcbiAgd3JpdGVWYXJVaW50KGVuY29kZXIsIG1lc3NhZ2VVc2Vyc1N0YXRlQ2hhbmdlZCk7XG4gIHdyaXRlVmFyVWludChlbmNvZGVyLCBsZW4pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgdXNlcklEID0gcmVhZFZhclVpbnQoZGVjb2Rlcik7XG4gICAgY29uc3QgY2xvY2sgPSByZWFkVmFyVWludChkZWNvZGVyKTtcbiAgICBjb25zdCBzdGF0ZSA9IHJlYWRWYXJTdHJpbmcoZGVjb2Rlcik7XG4gICAgd3JpdGVWYXJVaW50KGVuY29kZXIsIHVzZXJJRCk7XG4gICAgd3JpdGVWYXJVaW50KGVuY29kZXIsIGNsb2NrKTtcbiAgICB3cml0ZVZhclN0cmluZyhlbmNvZGVyLCBzdGF0ZSk7XG4gICAgdXBkYXRlcy5wdXNoKHt1c2VySUQsIHN0YXRlOiBKU09OLnBhcnNlKHN0YXRlKSwgY2xvY2t9KTtcbiAgfVxuICByZXR1cm4gdXBkYXRlc1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2RlY29kaW5nLkRlY29kZXJ9IGRlY29kZXJcbiAqIEBwYXJhbSB7WX0geVxuICovXG5jb25zdCByZWFkQXdhcmVuZXNzTWVzc2FnZSA9IChkZWNvZGVyLCB5KSA9PiB7XG4gIHN3aXRjaCAocmVhZFZhclVpbnQoZGVjb2RlcikpIHtcbiAgICBjYXNlIG1lc3NhZ2VVc2Vyc1N0YXRlQ2hhbmdlZDpcbiAgICAgIHJlYWRVc2Vyc1N0YXRlQ2hhbmdlKGRlY29kZXIsIHkpO1xuICAgICAgYnJlYWtcbiAgfVxufTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBVc2VyU3RhdGVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBVc2VyU3RhdGUudXNlcklEXG4gKiBAcHJvcGVydHkge2FueX0gVXNlclN0YXRlLnN0YXRlXG4gKiBAcHJvcGVydHkge251bWJlcn0gVXNlclN0YXRlLmNsb2NrXG4gKi9cblxuLyoqXG4gKiBAcGFyYW0ge2RlY29kaW5nLkRlY29kZXJ9IGRlY29kZXJcbiAqIEBwYXJhbSB7ZW5jb2RpbmcuRW5jb2Rlcn0gZW5jb2RlclxuICogQHJldHVybiB7QXJyYXk8VXNlclN0YXRlPn0gQXJyYXkgb2Ygc3RhdGUgdXBkYXRlc1xuICovXG5jb25zdCBmb3J3YXJkQXdhcmVuZXNzTWVzc2FnZSA9IChkZWNvZGVyLCBlbmNvZGVyKSA9PiB7XG4gIGxldCBzID0gW107XG4gIHN3aXRjaCAocmVhZFZhclVpbnQoZGVjb2RlcikpIHtcbiAgICBjYXNlIG1lc3NhZ2VVc2Vyc1N0YXRlQ2hhbmdlZDpcbiAgICAgIHMgPSBmb3J3YXJkVXNlcnNTdGF0ZUNoYW5nZShkZWNvZGVyLCBlbmNvZGVyKTtcbiAgfVxuICByZXR1cm4gc1xufTtcblxudmFyIGF3YXJlbmVzcyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgd3JpdGVVc2Vyc1N0YXRlQ2hhbmdlOiB3cml0ZVVzZXJzU3RhdGVDaGFuZ2UsXG4gIHJlYWRVc2Vyc1N0YXRlQ2hhbmdlOiByZWFkVXNlcnNTdGF0ZUNoYW5nZSxcbiAgZm9yd2FyZFVzZXJzU3RhdGVDaGFuZ2U6IGZvcndhcmRVc2Vyc1N0YXRlQ2hhbmdlLFxuICByZWFkQXdhcmVuZXNzTWVzc2FnZTogcmVhZEF3YXJlbmVzc01lc3NhZ2UsXG4gIGZvcndhcmRBd2FyZW5lc3NNZXNzYWdlOiBmb3J3YXJkQXdhcmVuZXNzTWVzc2FnZVxufSk7XG5cbmNvbnN0IG1lc3NhZ2VQZXJtaXNzaW9uRGVuaWVkID0gMDtcblxuLyoqXG4gKiBAcGFyYW0ge2VuY29kaW5nLkVuY29kZXJ9IGVuY29kZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb25cbiAqL1xuY29uc3Qgd3JpdGVQZXJtaXNzaW9uRGVuaWVkID0gKGVuY29kZXIsIHJlYXNvbikgPT4ge1xuICB3cml0ZVZhclVpbnQoZW5jb2RlciwgbWVzc2FnZVBlcm1pc3Npb25EZW5pZWQpO1xuICB3cml0ZVZhclN0cmluZyhlbmNvZGVyLCByZWFzb24pO1xufTtcblxuLyoqXG4gKiBAY2FsbGJhY2sgUGVybWlzc2lvbkRlbmllZEhhbmRsZXJcbiAqIEBwYXJhbSB7YW55fSB5XG4gKiBAcGFyYW0ge3N0cmluZ30gcmVhc29uXG4gKi9cblxuLyoqXG4gKlxuICogQHBhcmFtIHtkZWNvZGluZy5EZWNvZGVyfSBkZWNvZGVyXG4gKiBAcGFyYW0ge1l9IHlcbiAqIEBwYXJhbSB7UGVybWlzc2lvbkRlbmllZEhhbmRsZXJ9IHBlcm1pc3Npb25EZW5pZWRIYW5kbGVyXG4gKi9cbmNvbnN0IHJlYWRBdXRoTWVzc2FnZSA9IChkZWNvZGVyLCB5LCBwZXJtaXNzaW9uRGVuaWVkSGFuZGxlcikgPT4ge1xuICBzd2l0Y2ggKHJlYWRWYXJVaW50KGRlY29kZXIpKSB7XG4gICAgY2FzZSBtZXNzYWdlUGVybWlzc2lvbkRlbmllZDogcGVybWlzc2lvbkRlbmllZEhhbmRsZXIoeSwgcmVhZFZhclN0cmluZyhkZWNvZGVyKSk7XG4gIH1cbn07XG5cbnZhciBhdXRoID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICBtZXNzYWdlUGVybWlzc2lvbkRlbmllZDogbWVzc2FnZVBlcm1pc3Npb25EZW5pZWQsXG4gIHdyaXRlUGVybWlzc2lvbkRlbmllZDogd3JpdGVQZXJtaXNzaW9uRGVuaWVkLFxuICByZWFkQXV0aE1lc3NhZ2U6IHJlYWRBdXRoTWVzc2FnZVxufSk7XG5cbmNsYXNzIFJldmVyc2VPcGVyYXRpb24ge1xuICBjb25zdHJ1Y3RvciAoeSwgdHJhbnNhY3Rpb24sIGJpbmRpbmdJbmZvcykge1xuICAgIHRoaXMuY3JlYXRlZCA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgYmVmb3JlU3RhdGUgPSB0cmFuc2FjdGlvbi5iZWZvcmVTdGF0ZTtcbiAgICBpZiAoYmVmb3JlU3RhdGUuaGFzKHkudXNlcklEKSkge1xuICAgICAgdGhpcy50b1N0YXRlID0gY3JlYXRlSUQoeS51c2VySUQsIHkuc3MuZ2V0U3RhdGUoeS51c2VySUQpIC0gMSk7XG4gICAgICB0aGlzLmZyb21TdGF0ZSA9IGNyZWF0ZUlEKHkudXNlcklELCBiZWZvcmVTdGF0ZS5nZXQoeS51c2VySUQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50b1N0YXRlID0gbnVsbDtcbiAgICAgIHRoaXMuZnJvbVN0YXRlID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5kZWxldGVkU3RydWN0cyA9IG5ldyBTZXQoKTtcbiAgICB0cmFuc2FjdGlvbi5kZWxldGVkU3RydWN0cy5mb3JFYWNoKHN0cnVjdCA9PiB7XG4gICAgICB0aGlzLmRlbGV0ZWRTdHJ1Y3RzLmFkZCh7XG4gICAgICAgIGZyb206IHN0cnVjdC5faWQsXG4gICAgICAgIGxlbjogc3RydWN0Ll9sZW5ndGhcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIE1hcHMgZnJvbSBiaW5kaW5nIHRvIGJpbmRpbmcgaW5mb3JtYXRpb24gKGUuZy4gY3Vyc29yIGluZm9ybWF0aW9uKVxuICAgICAqL1xuICAgIHRoaXMuYmluZGluZ0luZm9zID0gYmluZGluZ0luZm9zO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5UmV2ZXJzZU9wZXJhdGlvbiAoeSwgc2NvcGUsIHJldmVyc2VCdWZmZXIpIHtcbiAgbGV0IHBlcmZvcm1lZFVuZG8gPSBmYWxzZTtcbiAgbGV0IHVuZG9PcCA9IG51bGw7XG4gIHkudHJhbnNhY3QoKCkgPT4ge1xuICAgIHdoaWxlICghcGVyZm9ybWVkVW5kbyAmJiByZXZlcnNlQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHVuZG9PcCA9IHJldmVyc2VCdWZmZXIucG9wKCk7XG4gICAgICAvLyBtYWtlIHN1cmUgdGhhdCBpdCBpcyBwb3NzaWJsZSB0byBpdGVyYXRlIHtmcm9tfS17dG99XG4gICAgICBpZiAodW5kb09wLmZyb21TdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICB5Lm9zLmdldEl0ZW1DbGVhblN0YXJ0KHVuZG9PcC5mcm9tU3RhdGUpO1xuICAgICAgICB5Lm9zLmdldEl0ZW1DbGVhbkVuZCh1bmRvT3AudG9TdGF0ZSk7XG4gICAgICAgIHkub3MuaXRlcmF0ZSh1bmRvT3AuZnJvbVN0YXRlLCB1bmRvT3AudG9TdGF0ZSwgb3AgPT4ge1xuICAgICAgICAgIHdoaWxlIChvcC5fZGVsZXRlZCAmJiBvcC5fcmVkb25lICE9PSBudWxsKSB7XG4gICAgICAgICAgICBvcCA9IG9wLl9yZWRvbmU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvcC5fZGVsZXRlZCA9PT0gZmFsc2UgJiYgaXNQYXJlbnRPZihzY29wZSwgb3ApKSB7XG4gICAgICAgICAgICBwZXJmb3JtZWRVbmRvID0gdHJ1ZTtcbiAgICAgICAgICAgIG9wLl9kZWxldGUoeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlZG9pdGVtcyA9IG5ldyBTZXQoKTtcbiAgICAgIGZvciAobGV0IGRlbCBvZiB1bmRvT3AuZGVsZXRlZFN0cnVjdHMpIHtcbiAgICAgICAgY29uc3QgZnJvbVN0YXRlID0gZGVsLmZyb207XG4gICAgICAgIGNvbnN0IHRvU3RhdGUgPSBjcmVhdGVJRChmcm9tU3RhdGUudXNlciwgZnJvbVN0YXRlLmNsb2NrICsgZGVsLmxlbiAtIDEpO1xuICAgICAgICB5Lm9zLmdldEl0ZW1DbGVhblN0YXJ0KGZyb21TdGF0ZSk7XG4gICAgICAgIHkub3MuZ2V0SXRlbUNsZWFuRW5kKHRvU3RhdGUpO1xuICAgICAgICB5Lm9zLml0ZXJhdGUoZnJvbVN0YXRlLCB0b1N0YXRlLCBvcCA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaXNQYXJlbnRPZihzY29wZSwgb3ApICYmXG4gICAgICAgICAgICBvcC5fcGFyZW50ICE9PSB5ICYmXG4gICAgICAgICAgICAoXG4gICAgICAgICAgICAgIG9wLl9pZC51c2VyICE9PSB5LnVzZXJJRCB8fFxuICAgICAgICAgICAgICB1bmRvT3AuZnJvbVN0YXRlID09PSBudWxsIHx8XG4gICAgICAgICAgICAgIG9wLl9pZC5jbG9jayA8IHVuZG9PcC5mcm9tU3RhdGUuY2xvY2sgfHxcbiAgICAgICAgICAgICAgb3AuX2lkLmNsb2NrID4gdW5kb09wLnRvU3RhdGUuY2xvY2tcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJlZG9pdGVtcy5hZGQob3ApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZWRvaXRlbXMuZm9yRWFjaChvcCA9PiB7XG4gICAgICAgIGNvbnN0IG9wVW5kb25lID0gb3AuX3JlZG8oeSwgcmVkb2l0ZW1zKTtcbiAgICAgICAgcGVyZm9ybWVkVW5kbyA9IHBlcmZvcm1lZFVuZG8gfHwgb3BVbmRvbmU7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICBpZiAocGVyZm9ybWVkVW5kbyAmJiB1bmRvT3AgIT09IG51bGwpIHtcbiAgICAvLyBzaG91bGQgYmUgcGVyZm9ybWVkIGFmdGVyIHRoZSB1bmRvIHRyYW5zYWN0aW9uXG4gICAgdW5kb09wLmJpbmRpbmdJbmZvcy5mb3JFYWNoKChpbmZvLCBiaW5kaW5nKSA9PiB7XG4gICAgICBiaW5kaW5nLl9yZXN0b3JlVW5kb1N0YWNrSW5mbyhpbmZvKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcGVyZm9ybWVkVW5kb1xufVxuXG4vKipcbiAqIFNhdmVzIGEgaGlzdG9yeSBvZiBsb2NhbGx5IGFwcGxpZWQgb3BlcmF0aW9ucy4gVGhlIFVuZG9NYW5hZ2VyIGhhbmRsZXMgdGhlXG4gKiB1bmRvaW5nIGFuZCByZWRvaW5nIG9mIGxvY2FsbHkgY3JlYXRlZCBjaGFuZ2VzLlxuICovXG5jbGFzcyBVbmRvTWFuYWdlciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1lUeXBlfSBzY29wZSBUaGUgc2NvcGUgb24gd2hpY2ggdG8gbGlzdGVuIGZvciBjaGFuZ2VzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25hbGx5IHByb3ZpZGVkIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoc2NvcGUsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5fYmluZGluZ3MgPSBuZXcgU2V0KG9wdGlvbnMuYmluZGluZ3MpO1xuICAgIG9wdGlvbnMuY2FwdHVyZVRpbWVvdXQgPSBvcHRpb25zLmNhcHR1cmVUaW1lb3V0ID09IG51bGwgPyA1MDAgOiBvcHRpb25zLmNhcHR1cmVUaW1lb3V0O1xuICAgIHRoaXMuX3VuZG9CdWZmZXIgPSBbXTtcbiAgICB0aGlzLl9yZWRvQnVmZmVyID0gW107XG4gICAgdGhpcy5fc2NvcGUgPSBzY29wZTtcbiAgICB0aGlzLl91bmRvaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fcmVkb2luZyA9IGZhbHNlO1xuICAgIHRoaXMuX2xhc3RUcmFuc2FjdGlvbldhc1VuZG8gPSBmYWxzZTtcbiAgICBjb25zdCB5ID0gc2NvcGUuX3k7XG4gICAgdGhpcy55ID0geTtcbiAgICB5Ll9oYXNVbmRvTWFuYWdlciA9IHRydWU7XG4gICAgbGV0IGJpbmRpbmdJbmZvcztcbiAgICB5Lm9uKCdiZWZvcmVUcmFuc2FjdGlvbicsICh5LCB0cmFuc2FjdGlvbiwgcmVtb3RlKSA9PiB7XG4gICAgICBpZiAoIXJlbW90ZSkge1xuICAgICAgICAvLyBTdG9yZSBiaW5kaW5nIGluZm9ybWF0aW9uIGJlZm9yZSB0cmFuc2FjdGlvbiBpcyBleGVjdXRlZFxuICAgICAgICAvLyBCeSByZXN0b3JpbmcgdGhlIGJpbmRpbmcgaW5mb3JtYXRpb24sIHdlIGNhbiBtYWtlIHN1cmUgdGhhdCB0aGUgc3RhdGVcbiAgICAgICAgLy8gYmVmb3JlIHRoZSB0cmFuc2FjdGlvbiBjYW4gYmUgcmVjb3ZlcmVkXG4gICAgICAgIGJpbmRpbmdJbmZvcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fYmluZGluZ3MuZm9yRWFjaChiaW5kaW5nID0+IHtcbiAgICAgICAgICBiaW5kaW5nSW5mb3Muc2V0KGJpbmRpbmcsIGJpbmRpbmcuX2dldFVuZG9TdGFja0luZm8oKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHkub24oJ2FmdGVyVHJhbnNhY3Rpb24nLCAoeSwgdHJhbnNhY3Rpb24sIHJlbW90ZSkgPT4ge1xuICAgICAgaWYgKCFyZW1vdGUgJiYgdHJhbnNhY3Rpb24uY2hhbmdlZFBhcmVudFR5cGVzLmhhcyhzY29wZSkpIHtcbiAgICAgICAgbGV0IHJldmVyc2VPcGVyYXRpb24gPSBuZXcgUmV2ZXJzZU9wZXJhdGlvbih5LCB0cmFuc2FjdGlvbiwgYmluZGluZ0luZm9zKTtcbiAgICAgICAgaWYgKCF0aGlzLl91bmRvaW5nKSB7XG4gICAgICAgICAgbGV0IGxhc3RVbmRvT3AgPSB0aGlzLl91bmRvQnVmZmVyLmxlbmd0aCA+IDAgPyB0aGlzLl91bmRvQnVmZmVyW3RoaXMuX3VuZG9CdWZmZXIubGVuZ3RoIC0gMV0gOiBudWxsO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3JlZG9pbmcgPT09IGZhbHNlICYmXG4gICAgICAgICAgICB0aGlzLl9sYXN0VHJhbnNhY3Rpb25XYXNVbmRvID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgbGFzdFVuZG9PcCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgKG9wdGlvbnMuY2FwdHVyZVRpbWVvdXQgPCAwIHx8IHJldmVyc2VPcGVyYXRpb24uY3JlYXRlZCAtIGxhc3RVbmRvT3AuY3JlYXRlZCA8PSBvcHRpb25zLmNhcHR1cmVUaW1lb3V0KVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbGFzdFVuZG9PcC5jcmVhdGVkID0gcmV2ZXJzZU9wZXJhdGlvbi5jcmVhdGVkO1xuICAgICAgICAgICAgaWYgKHJldmVyc2VPcGVyYXRpb24udG9TdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBsYXN0VW5kb09wLnRvU3RhdGUgPSByZXZlcnNlT3BlcmF0aW9uLnRvU3RhdGU7XG4gICAgICAgICAgICAgIGlmIChsYXN0VW5kb09wLmZyb21TdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxhc3RVbmRvT3AuZnJvbVN0YXRlID0gcmV2ZXJzZU9wZXJhdGlvbi5mcm9tU3RhdGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldmVyc2VPcGVyYXRpb24uZGVsZXRlZFN0cnVjdHMuZm9yRWFjaChsYXN0VW5kb09wLmRlbGV0ZWRTdHJ1Y3RzLmFkZCwgbGFzdFVuZG9PcC5kZWxldGVkU3RydWN0cyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RUcmFuc2FjdGlvbldhc1VuZG8gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3VuZG9CdWZmZXIucHVzaChyZXZlcnNlT3BlcmF0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aGlzLl9yZWRvaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWRvQnVmZmVyID0gW107XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2xhc3RUcmFuc2FjdGlvbldhc1VuZG8gPSB0cnVlO1xuICAgICAgICAgIHRoaXMuX3JlZG9CdWZmZXIucHVzaChyZXZlcnNlT3BlcmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEVuZm9yY2UgdGhhdCB0aGUgbmV4dCBjaGFuZ2UgaXMgY3JlYXRlZCBhcyBhIHNlcGFyYXRlIGl0ZW0gaW4gdGhlIHVuZG8gc3RhY2tcbiAgICovXG4gIGZsdXNoQ2hhbmdlcyAoKSB7XG4gICAgdGhpcy5fbGFzdFRyYW5zYWN0aW9uV2FzVW5kbyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVW5kbyB0aGUgbGFzdCBsb2NhbGx5IGNyZWF0ZWQgY2hhbmdlLlxuICAgKi9cbiAgdW5kbyAoKSB7XG4gICAgdGhpcy5fdW5kb2luZyA9IHRydWU7XG4gICAgY29uc3QgcGVyZm9ybWVkVW5kbyA9IGFwcGx5UmV2ZXJzZU9wZXJhdGlvbih0aGlzLnksIHRoaXMuX3Njb3BlLCB0aGlzLl91bmRvQnVmZmVyKTtcbiAgICB0aGlzLl91bmRvaW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIHBlcmZvcm1lZFVuZG9cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWRvIHRoZSBsYXN0IGxvY2FsbHkgY3JlYXRlZCBjaGFuZ2UuXG4gICAqL1xuICByZWRvICgpIHtcbiAgICB0aGlzLl9yZWRvaW5nID0gdHJ1ZTtcbiAgICBjb25zdCBwZXJmb3JtZWRSZWRvID0gYXBwbHlSZXZlcnNlT3BlcmF0aW9uKHRoaXMueSwgdGhpcy5fc2NvcGUsIHRoaXMuX3JlZG9CdWZmZXIpO1xuICAgIHRoaXMuX3JlZG9pbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gcGVyZm9ybWVkUmVkb1xuICB9XG59XG5cbnJlZ2lzdGVyU3RydWN0KDAsIEdDKTtcbnJlZ2lzdGVyU3RydWN0KDEsIEl0ZW1KU09OKTtcbnJlZ2lzdGVyU3RydWN0KDIsIEl0ZW1TdHJpbmcpO1xucmVnaXN0ZXJTdHJ1Y3QoMywgSXRlbUZvcm1hdCk7XG5yZWdpc3RlclN0cnVjdCg0LCBEZWxldGUpO1xuXG5yZWdpc3RlclN0cnVjdCg1LCBZQXJyYXkpO1xucmVnaXN0ZXJTdHJ1Y3QoNiwgWU1hcCk7XG5yZWdpc3RlclN0cnVjdCg3LCBZVGV4dCk7XG5yZWdpc3RlclN0cnVjdCg4LCBZWG1sRnJhZ21lbnQpO1xucmVnaXN0ZXJTdHJ1Y3QoOSwgWVhtbEVsZW1lbnQpO1xucmVnaXN0ZXJTdHJ1Y3QoMTAsIFlYbWxUZXh0KTtcbnJlZ2lzdGVyU3RydWN0KDExLCBZWG1sSG9vayk7XG5yZWdpc3RlclN0cnVjdCgxMiwgSXRlbUVtYmVkKTtcbnJlZ2lzdGVyU3RydWN0KDEzLCBJdGVtQmluYXJ5KTtcblxuZXhwb3J0cy5kZWNvZGluZyA9IGRlY29kaW5nO1xuZXhwb3J0cy5lbmNvZGluZyA9IGVuY29kaW5nO1xuZXhwb3J0cy5hd2FyZW5lc3NQcm90b2NvbCA9IGF3YXJlbmVzcztcbmV4cG9ydHMuc3luY1Byb3RvY29sID0gc3luYztcbmV4cG9ydHMuYXV0aFByb3RvY29sID0gYXV0aDtcbmV4cG9ydHMuWSA9IFk7XG5leHBvcnRzLlVuZG9NYW5hZ2VyID0gVW5kb01hbmFnZXI7XG5leHBvcnRzLlRyYW5zYWN0aW9uID0gVHJhbnNhY3Rpb247XG5leHBvcnRzLkFycmF5ID0gWUFycmF5O1xuZXhwb3J0cy5NYXAgPSBZTWFwO1xuZXhwb3J0cy5UZXh0ID0gWVRleHQ7XG5leHBvcnRzLlhtbFRleHQgPSBZWG1sVGV4dDtcbmV4cG9ydHMuWG1sSG9vayA9IFlYbWxIb29rO1xuZXhwb3J0cy5YbWxFbGVtZW50ID0gWVhtbEVsZW1lbnQ7XG5leHBvcnRzLlhtbEZyYWdtZW50ID0gWVhtbEZyYWdtZW50O1xuZXhwb3J0cy5nZXRSZWxhdGl2ZVBvc2l0aW9uID0gZ2V0UmVsYXRpdmVQb3NpdGlvbjtcbmV4cG9ydHMuZnJvbVJlbGF0aXZlUG9zaXRpb24gPSBmcm9tUmVsYXRpdmVQb3NpdGlvbjtcbmV4cG9ydHMucmVnaXN0ZXJTdHJ1Y3QgPSByZWdpc3RlclN0cnVjdDtcbmV4cG9ydHMuY3JlYXRlTXV0ZXggPSBjcmVhdGVNdXRleDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXlqcy5qcy5tYXBcbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vKipcbiAqIEBtb2R1bGUgYmluYXJ5XG4gKi9cblxuaW1wb3J0ICogYXMgc3RyaW5nIGZyb20gJy4vc3RyaW5nLmpzJ1xuaW1wb3J0ICogYXMgZ2xvYmFscyBmcm9tICcuL2dsb2JhbHMuanMnXG5cbmV4cG9ydCBjb25zdCBCSVRTMzIgPSAweEZGRkZGRkZGXG5leHBvcnQgY29uc3QgQklUUzIxID0gKDEgPDwgMjEpIC0gMVxuZXhwb3J0IGNvbnN0IEJJVFMxNiA9ICgxIDw8IDE2KSAtIDFcblxuZXhwb3J0IGNvbnN0IEJJVDI2ID0gMSA8PCAyNlxuZXhwb3J0IGNvbnN0IEJJVDMyID0gMSA8PCAzMlxuXG4vKipcbiAqIEBwYXJhbSB7VWludDhBcnJheX0gYnl0ZXNcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IHRvQmFzZTY0ID0gYnl0ZXMgPT4ge1xuICBsZXQgcyA9ICcnXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMuYnl0ZUxlbmd0aDsgaSsrKSB7XG4gICAgcyArPSBzdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKVxuICB9XG4gIHJldHVybiBidG9hKHMpXG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHNcbiAqIEByZXR1cm4ge1VpbnQ4QXJyYXl9XG4gKi9cbmV4cG9ydCBjb25zdCBmcm9tQmFzZTY0ID0gcyA9PiB7XG4gIGNvbnN0IGEgPSBhdG9iKHMpXG4gIGNvbnN0IGJ5dGVzID0gZ2xvYmFscy5jcmVhdGVVaW50OEFycmF5RnJvbUxlbihhLmxlbmd0aClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgYnl0ZXNbaV0gPSBhLmNoYXJDb2RlQXQoaSlcbiAgfVxuICByZXR1cm4gYnl0ZXNcbn1cbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG5pbXBvcnQgKiBhcyBiaW5hcnkgZnJvbSAnLi9iaW5hcnkuanMnXG5pbXBvcnQgKiBhcyBnbG9iYWxzIGZyb20gJy4vZ2xvYmFscy5qcydcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDaGFubmVsXG4gKiBAcHJvcGVydHkge1NldDxGdW5jdGlvbj59IENoYW5uZWwuc3Vic1xuICogQHByb3BlcnR5IHtCQ30gQ2hhbm5lbC5iY1xuICovXG5cbi8qKlxuICogQHR5cGUge01hcDxzdHJpbmcsIENoYW5uZWw+fVxuICovXG5jb25zdCBjaGFubmVscyA9IG5ldyBNYXAoKVxuXG5jbGFzcyBMb2NhbFN0b3JhZ2VQb2x5ZmlsbCB7XG4gIGNvbnN0cnVjdG9yIChyb29tKSB7XG4gICAgdGhpcy5yb29tID0gcm9vbVxuICAgIHRoaXMub25tZXNzYWdlID0gbnVsbFxuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCBlID0+IGUua2V5ID09PSByb29tICYmIHRoaXMub25tZXNzYWdlICE9PSBudWxsICYmIHRoaXMub25tZXNzYWdlKHsgZGF0YTogYmluYXJ5LmZyb21CYXNlNjQoZS5uZXdWYWx1ZSkgfSkpXG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGRhdGFcbiAgICovXG4gIHBvc3RNZXNzYWdlIChidWYpIHtcbiAgICBpZiAodHlwZW9mIGxvY2FsU3RvcmFnZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMucm9vbSwgYmluYXJ5LnRvQmFzZTY0KGdsb2JhbHMuY3JlYXRlVWludDhBcnJheUZyb21BcnJheUJ1ZmZlcihidWYpKSlcbiAgICB9XG4gIH1cbn1cblxuLy8gVXNlIEJyb2FkY2FzdENoYW5uZWwgb3IgUG9seWZpbGxcbmNvbnN0IEJDID0gdHlwZW9mIEJyb2FkY2FzdENoYW5uZWwgPT09ICd1bmRlZmluZWQnID8gTG9jYWxTdG9yYWdlUG9seWZpbGwgOiBCcm9hZGNhc3RDaGFubmVsXG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHJvb21cbiAqIEByZXR1cm4ge0NoYW5uZWx9XG4gKi9cbmNvbnN0IGdldENoYW5uZWwgPSByb29tID0+IHtcbiAgbGV0IGMgPSBjaGFubmVscy5nZXQocm9vbSlcbiAgaWYgKGMgPT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IHN1YnMgPSBuZXcgU2V0KClcbiAgICBjb25zdCBiYyA9IG5ldyBCQyhyb29tKVxuICAgIGJjLm9ubWVzc2FnZSA9IGUgPT4gc3Vicy5mb3JFYWNoKHN1YiA9PiBzdWIoZS5kYXRhKSlcbiAgICBjID0ge1xuICAgICAgYmMsIHN1YnNcbiAgICB9XG4gICAgY2hhbm5lbHMuc2V0KHJvb20sIGMpXG4gIH1cbiAgcmV0dXJuIGNcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSByb29tXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmXG4gKi9cbmV4cG9ydCBjb25zdCBzdWJzY3JpYmUgPSAocm9vbSwgZikgPT4gZ2V0Q2hhbm5lbChyb29tKS5zdWJzLmFkZChmKVxuXG4vKipcbiAqIFB1Ymxpc2ggZGF0YSB0byBhbGwgc3Vic2NyaWJlcnMgKGluY2x1ZGluZyBzdWJzY3JpYmVycyBvbiB0aGlzIHRhYilcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSByb29tXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBkYXRhXG4gKi9cbmV4cG9ydCBjb25zdCBwdWJsaXNoID0gKHJvb20sIGRhdGEpID0+IHtcbiAgY29uc3QgYyA9IGdldENoYW5uZWwocm9vbSlcbiAgYy5iYy5wb3N0TWVzc2FnZShkYXRhKVxuICBjLnN1YnMuZm9yRWFjaChzdWIgPT4gc3ViKGRhdGEpKVxufVxuIiwiLyoqXG4gKiBAbW9kdWxlIGdsb2JhbHNcbiAqL1xuXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuZXhwb3J0IGNvbnN0IFVpbnQ4QXJyYXlfID0gVWludDhBcnJheVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYXJyXG4gKiBAcmV0dXJuIHtBcnJheUJ1ZmZlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFycmF5QnVmZmVyRnJvbUFycmF5ID0gYXJyID0+IG5ldyBVaW50OEFycmF5XyhhcnIpLmJ1ZmZlclxuXG5leHBvcnQgY29uc3QgY3JlYXRlVWludDhBcnJheUZyb21MZW4gPSBsZW4gPT4gbmV3IFVpbnQ4QXJyYXlfKGxlbilcblxuLyoqXG4gKiBDcmVhdGUgVWludDhBcnJheSB3aXRoIGluaXRpYWwgY29udGVudCBmcm9tIGJ1ZmZlclxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVWludDhBcnJheUZyb21CdWZmZXIgPSAoYnVmZmVyLCBieXRlT2Zmc2V0LCBsZW5ndGgpID0+IG5ldyBVaW50OEFycmF5XyhidWZmZXIsIGJ5dGVPZmZzZXQsIGxlbmd0aClcblxuLyoqXG4gKiBDcmVhdGUgVWludDhBcnJheSB3aXRoIGluaXRpYWwgY29udGVudCBmcm9tIGJ1ZmZlclxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVWludDhBcnJheUZyb21BcnJheUJ1ZmZlciA9IGFycmF5YnVmZmVyID0+IG5ldyBVaW50OEFycmF5XyhhcnJheWJ1ZmZlcilcbmV4cG9ydCBjb25zdCBjcmVhdGVBcnJheUZyb21BcnJheUJ1ZmZlciA9IGFycmF5YnVmZmVyID0+IEFycmF5LmZyb20oY3JlYXRlVWludDhBcnJheUZyb21BcnJheUJ1ZmZlcihhcnJheWJ1ZmZlcikpXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVQcm9taXNlID0gZiA9PiBuZXcgUHJvbWlzZShmKVxuXG5leHBvcnQgY29uc3QgY3JlYXRlTWFwID0gKCkgPT4gbmV3IE1hcCgpXG5leHBvcnQgY29uc3QgY3JlYXRlU2V0ID0gKCkgPT4gbmV3IFNldCgpXG5cbi8qKlxuICogYFByb21pc2UuYWxsYCB3YWl0IGZvciBhbGwgcHJvbWlzZXMgaW4gdGhlIGFycmF5IHRvIHJlc29sdmUgYW5kIHJldHVybiB0aGUgcmVzdWx0XG4gKiBAcGFyYW0ge0FycmF5PFByb21pc2U8YW55Pj59IGFycnBcbiAqIEByZXR1cm4ge2FueX1cbiAqL1xuZXhwb3J0IGNvbnN0IHBhbGwgPSBhcnJwID0+IFByb21pc2UuYWxsKGFycnApXG5leHBvcnQgY29uc3QgcHJlamVjdCA9IHJlYXNvbiA9PiBQcm9taXNlLnJlamVjdChyZWFzb24pXG5leHBvcnQgY29uc3QgcHJlc29sdmUgPSByZXMgPT4gUHJvbWlzZS5yZXNvbHZlKHJlcylcblxuZXhwb3J0IGNvbnN0IHVudGlsID0gKHRpbWVvdXQsIGNoZWNrKSA9PiBjcmVhdGVQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgY29uc3QgaGFzVGltZW91dCA9IHRpbWVvdXQgPiAwXG4gIGNvbnN0IHVudGlsSW50ZXJ2YWwgPSAoKSA9PiB7XG4gICAgaWYgKGNoZWNrKCkpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxIYW5kbGUpXG4gICAgICByZXNvbHZlKClcbiAgICB9IGVsc2UgaWYgKGhhc1RpbWVvdXQpIHtcbiAgICAgIHRpbWVvdXQgLT0gMTBcbiAgICAgIGlmICh0aW1lb3V0IDwgMCkge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSGFuZGxlKVxuICAgICAgICByZWplY3QoZXJyb3IoJ1RpbWVvdXQnKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY29uc3QgaW50ZXJ2YWxIYW5kbGUgPSBzZXRJbnRlcnZhbCh1bnRpbEludGVydmFsLCAxMClcbn0pXG5cbmV4cG9ydCBjb25zdCBlcnJvciA9IGRlc2NyaXB0aW9uID0+IG5ldyBFcnJvcihkZXNjcmlwdGlvbilcblxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdCBUaW1lIHRvIHdhaXRcbiAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgdGhhdCBpcyByZXNvbHZlZCBhZnRlciB0IG1zXG4gKi9cbmV4cG9ydCBjb25zdCB3YWl0ID0gdCA9PiBjcmVhdGVQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCB0KSlcbiIsIi8qKlxuICogQG1vZHVsZSBzdHJpbmdcbiAqL1xuXG5leHBvcnQgY29uc3QgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZVxuZXhwb3J0IGNvbnN0IGZyb21Db2RlUG9pbnQgPSBTdHJpbmcuZnJvbUNvZGVQb2ludFxuIiwiaW1wb3J0ICogYXMgWSBmcm9tICd5anMnXG5cbmltcG9ydCB7IGdldFBhcmFtZXRlckJ5TmFtZSwgd2FpdCB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCB7IFdlYnNvY2tldFByb3ZpZGVyIH0gZnJvbSAnLi9wcm92aWRlcidcblxuY29uc29sZS5sb2coWSlcblxuY29uc3QgdXJsID0gJ3dzOi8vbG9jYWxob3N0OjEyMzQ1L3dzJ1xuY29uc3Qgcm9vbSA9IGdldFBhcmFtZXRlckJ5TmFtZSgncm9vbScpXG5jb25zdCByb2xlID0gZ2V0UGFyYW1ldGVyQnlOYW1lKCdyb2xlJylcblxuY29uc3QgcHJvdmlkZXIgPSBuZXcgV2Vic29ja2V0UHJvdmlkZXIodXJsKVxuXG5jb25zdCB5ID0gcHJvdmlkZXIuZ2V0KHJvb20pXG5cbmNvbnN0IHN5bmNlZEFyciA9IHkuZGVmaW5lKCdhcnInLCBZLkFycmF5KVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGdvKCkge1xuICBpZihyb2xlID09PSAncmVjZWl2ZXInKSB7XG4gICAgc3luY2VkQXJyLnB1c2goWycqYyonXSlcbiAgICB5LmNvbm5lY3RUb1dzKClcbiAgfVxuICBlbHNlIGlmKHJvbGUgPT09ICdzZW5kZXInKSB7XG4gICAgc3luY2VkQXJyLnB1c2goWycqcyonXSlcbiAgICBzeW5jZWRBcnIuZGVsZXRlKDApXG4gICAgYXdhaXQgd2FpdCgzZTMpXG4gICAgeS5jb25uZWN0VG9XcygpXG4gIH1cblxuICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0FycmF5IGNvbnRlbnQgaXM6Jywgc3luY2VkQXJyLnRvSlNPTigpKVxuICB9LCAxMDAwKVxufVxuXG5nbygpIiwiLypcblVubGlrZSBzdGF0ZWQgaW4gdGhlIExJQ0VOU0UgZmlsZSwgaXQgaXMgbm90IG5lY2Vzc2FyeSB0byBpbmNsdWRlIHRoZSBjb3B5cmlnaHQgbm90aWNlIGFuZCBwZXJtaXNzaW9uIG5vdGljZSB3aGVuIHlvdSBjb3B5IGNvZGUgZnJvbSB0aGlzIGZpbGUuXG4qL1xuXG4vKipcbiAqIEBtb2R1bGUgcHJvdmlkZXIvd2Vic29ja2V0XG4gKi9cblxuLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbmltcG9ydCAqIGFzIFkgZnJvbSAneWpzJ1xuaW1wb3J0ICogYXMgYmMgZnJvbSAneWpzL2xpYi9icm9hZGNhc3RjaGFubmVsLmpzJ1xuXG5jb25zdCBtZXNzYWdlU3luYyA9IDBcbmNvbnN0IG1lc3NhZ2VBd2FyZW5lc3MgPSAxXG5jb25zdCBtZXNzYWdlQXV0aCA9IDJcblxuY29uc3QgcmVjb25uZWN0VGltZW91dCA9IDMwMDBcblxuLyoqXG4gKiBAcGFyYW0ge1dlYnNvY2tldHNTaGFyZWREb2N1bWVudH0gZG9jXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVhc29uXG4gKi9cbmNvbnN0IHBlcm1pc3Npb25EZW5pZWRIYW5kbGVyID0gKGRvYywgcmVhc29uKSA9PiBjb25zb2xlLndhcm4oYFBlcm1pc3Npb24gZGVuaWVkIHRvIGFjY2VzcyAke2RvYy51cmx9LlxcbiR7cmVhc29ufWApXG5cbi8qKlxuICogQHBhcmFtIHtXZWJzb2NrZXRzU2hhcmVkRG9jdW1lbnR9IGRvY1xuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYnVmXG4gKiBAcmV0dXJuIHtZLmVuY29kaW5nLkVuY29kZXJ9XG4gKi9cbmNvbnN0IHJlYWRNZXNzYWdlID0gKGRvYywgYnVmKSA9PiB7XG4gIGNvbnN0IGRlY29kZXIgPSBZLmRlY29kaW5nLmNyZWF0ZURlY29kZXIoYnVmKVxuICBjb25zdCBlbmNvZGVyID0gWS5lbmNvZGluZy5jcmVhdGVFbmNvZGVyKClcbiAgY29uc3QgbWVzc2FnZVR5cGUgPSBZLmRlY29kaW5nLnJlYWRWYXJVaW50KGRlY29kZXIpXG4gIHN3aXRjaCAobWVzc2FnZVR5cGUpIHtcbiAgICBjYXNlIG1lc3NhZ2VTeW5jOlxuICAgICAgWS5lbmNvZGluZy53cml0ZVZhclVpbnQoZW5jb2RlciwgbWVzc2FnZVN5bmMpXG4gICAgICBkb2MubXV4KCgpID0+XG4gICAgICAgIFkuc3luY1Byb3RvY29sLnJlYWRTeW5jTWVzc2FnZShkZWNvZGVyLCBlbmNvZGVyLCBkb2MpXG4gICAgICApXG4gICAgICBicmVha1xuICAgIGNhc2UgbWVzc2FnZUF3YXJlbmVzczpcbiAgICAgIFkuYXdhcmVuZXNzUHJvdG9jb2wucmVhZEF3YXJlbmVzc01lc3NhZ2UoZGVjb2RlciwgZG9jKVxuICAgICAgYnJlYWtcbiAgICBjYXNlIG1lc3NhZ2VBdXRoOlxuICAgICAgWS5hdXRoUHJvdG9jb2wucmVhZEF1dGhNZXNzYWdlKGRlY29kZXIsIGRvYywgcGVybWlzc2lvbkRlbmllZEhhbmRsZXIpXG4gIH1cbiAgcmV0dXJuIGVuY29kZXJcbn1cblxuY29uc3Qgc2V0dXBXUyA9IChkb2MsIHVybCkgPT4ge1xuICBjb25zdCB3ZWJzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybClcbiAgd2Vic29ja2V0LmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInXG4gIGRvYy53cyA9IHdlYnNvY2tldFxuICB3ZWJzb2NrZXQub25tZXNzYWdlID0gZXZlbnQgPT4ge1xuICAgIGNvbnN0IGVuY29kZXIgPSByZWFkTWVzc2FnZShkb2MsIGV2ZW50LmRhdGEpXG4gICAgaWYgKFkuZW5jb2RpbmcubGVuZ3RoKGVuY29kZXIpID4gMSkge1xuICAgICAgd2Vic29ja2V0LnNlbmQoWS5lbmNvZGluZy50b0J1ZmZlcihlbmNvZGVyKSlcbiAgICB9XG4gIH1cbiAgd2Vic29ja2V0Lm9uY2xvc2UgPSAoKSA9PiB7XG4gICAgZG9jLndzID0gbnVsbFxuICAgIGRvYy53c2Nvbm5lY3RlZCA9IGZhbHNlXG4gICAgLy8gdXBkYXRlIGF3YXJlbmVzcyAoYWxsIHVzZXJzIGxlZnQpXG4gICAgY29uc3QgcmVtb3ZlZCA9IFtdXG4gICAgZG9jLmdldEF3YXJlbmVzc0luZm8oKS5mb3JFYWNoKChfLCB1c2VyaWQpID0+IHtcbiAgICAgIHJlbW92ZWQucHVzaCh1c2VyaWQpXG4gICAgfSlcbiAgICBkb2MuYXdhcmVuZXNzID0gbmV3IE1hcCgpXG4gICAgZG9jLmVtaXQoJ2F3YXJlbmVzcycsIHtcbiAgICAgIGFkZGVkOiBbXSwgdXBkYXRlZDogW10sIHJlbW92ZWRcbiAgICB9KVxuICAgIGRvYy5lbWl0KCdzdGF0dXMnLCB7XG4gICAgICBzdGF0dXM6ICdkaXNjb25uZWN0ZWQnXG4gICAgfSlcbiAgICBzZXRUaW1lb3V0KHNldHVwV1MsIHJlY29ubmVjdFRpbWVvdXQsIGRvYywgdXJsKVxuICB9XG4gIHdlYnNvY2tldC5vbm9wZW4gPSAoKSA9PiB7XG4gICAgZG9jLndzY29ubmVjdGVkID0gdHJ1ZVxuICAgIGRvYy5lbWl0KCdzdGF0dXMnLCB7XG4gICAgICBzdGF0dXM6ICdjb25uZWN0ZWQnXG4gICAgfSlcbiAgICAvLyBhbHdheXMgc2VuZCBzeW5jIHN0ZXAgMSB3aGVuIGNvbm5lY3RlZFxuICAgIGNvbnN0IGVuY29kZXIgPSBZLmVuY29kaW5nLmNyZWF0ZUVuY29kZXIoKVxuICAgIFkuZW5jb2Rpbmcud3JpdGVWYXJVaW50KGVuY29kZXIsIG1lc3NhZ2VTeW5jKVxuICAgIFkuc3luY1Byb3RvY29sLndyaXRlU3luY1N0ZXAxKGVuY29kZXIsIGRvYylcbiAgICB3ZWJzb2NrZXQuc2VuZChZLmVuY29kaW5nLnRvQnVmZmVyKGVuY29kZXIpKVxuICAgIC8vIGZvcmNlIHNlbmQgc3RvcmVkIGF3YXJlbmVzcyBpbmZvXG4gICAgZG9jLnNldEF3YXJlbmVzc0ZpZWxkKG51bGwsIG51bGwpXG4gIH1cbn1cblxuY29uc3QgYnJvYWRjYXN0VXBkYXRlID0gKHksIHRyYW5zYWN0aW9uKSA9PiB7XG4gIGlmICh0cmFuc2FjdGlvbi5lbmNvZGVkU3RydWN0c0xlbiA+IDApIHtcbiAgICB5Lm11eCgoKSA9PiB7XG4gICAgICBjb25zdCBlbmNvZGVyID0gWS5lbmNvZGluZy5jcmVhdGVFbmNvZGVyKClcbiAgICAgIFkuZW5jb2Rpbmcud3JpdGVWYXJVaW50KGVuY29kZXIsIG1lc3NhZ2VTeW5jKVxuICAgICAgWS5zeW5jUHJvdG9jb2wud3JpdGVVcGRhdGUoZW5jb2RlciwgdHJhbnNhY3Rpb24uZW5jb2RlZFN0cnVjdHNMZW4sIHRyYW5zYWN0aW9uLmVuY29kZWRTdHJ1Y3RzKVxuICAgICAgY29uc3QgYnVmID0gWS5lbmNvZGluZy50b0J1ZmZlcihlbmNvZGVyKVxuICAgICAgaWYgKHkud3Njb25uZWN0ZWQpIHtcbiAgICAgICAgeS53cy5zZW5kKGJ1ZilcbiAgICAgIH1cbiAgICAgIGJjLnB1Ymxpc2goeS51cmwsIGJ1ZilcbiAgICB9KVxuICB9XG59XG5cbmNsYXNzIFdlYnNvY2tldHNTaGFyZWREb2N1bWVudCBleHRlbmRzIFkuWSB7XG4gIGNvbnN0cnVjdG9yICh1cmwsIG9wdHMpIHtcbiAgICBzdXBlcihvcHRzKVxuICAgIHRoaXMudXJsID0gdXJsXG4gICAgdGhpcy53c2Nvbm5lY3RlZCA9IGZhbHNlXG4gICAgdGhpcy5tdXggPSBZLmNyZWF0ZU11dGV4KClcbiAgICB0aGlzLndzID0gbnVsbFxuICAgIHRoaXMuX2xvY2FsQXdhcmVuZXNzU3RhdGUgPSB7fVxuICAgIHRoaXMuYXdhcmVuZXNzID0gbmV3IE1hcCgpXG4gICAgdGhpcy5hd2FyZW5lc3NDbG9jayA9IG5ldyBNYXAoKVxuICAgIHRoaXMuY29ubmVjdFRvV3MgPSAoKSA9PiB7XG4gICAgICBzZXR1cFdTKHRoaXMsIHVybClcbiAgICB9XG4gICAgdGhpcy5vbignYWZ0ZXJUcmFuc2FjdGlvbicsIGJyb2FkY2FzdFVwZGF0ZSlcbiAgICB0aGlzLl9iY1N1YnNjcmliZXIgPSBkYXRhID0+IHtcbiAgICAgIGNvbnN0IGVuY29kZXIgPSByZWFkTWVzc2FnZSh0aGlzLCBkYXRhKSAvLyBhbHJlYWR5IG11eGVkXG4gICAgICB0aGlzLm11eCgoKSA9PiB7XG4gICAgICAgIGlmIChZLmVuY29kaW5nLmxlbmd0aChlbmNvZGVyKSA+IDEpIHtcbiAgICAgICAgICBiYy5wdWJsaXNoKHVybCwgWS5lbmNvZGluZy50b0J1ZmZlcihlbmNvZGVyKSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgYmMuc3Vic2NyaWJlKHVybCwgdGhpcy5fYmNTdWJzY3JpYmVyKVxuICAgIC8vIHNlbmQgc3luYyBzdGVwMSB0byBiY1xuICAgIHRoaXMubXV4KCgpID0+IHtcbiAgICAgIGNvbnN0IGVuY29kZXIgPSBZLmVuY29kaW5nLmNyZWF0ZUVuY29kZXIoKVxuICAgICAgWS5lbmNvZGluZy53cml0ZVZhclVpbnQoZW5jb2RlciwgbWVzc2FnZVN5bmMpXG4gICAgICBZLnN5bmNQcm90b2NvbC53cml0ZVN5bmNTdGVwMShlbmNvZGVyLCB0aGlzKVxuICAgICAgYmMucHVibGlzaCh1cmwsIFkuZW5jb2RpbmcudG9CdWZmZXIoZW5jb2RlcikpXG4gICAgfSlcbiAgfVxuICBnZXRMb2NhbEF3YXJlbmVzc0luZm8gKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbEF3YXJlbmVzc1N0YXRlXG4gIH1cbiAgZ2V0QXdhcmVuZXNzSW5mbyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXdhcmVuZXNzXG4gIH1cbiAgc2V0QXdhcmVuZXNzRmllbGQgKGZpZWxkLCB2YWx1ZSkge1xuICAgIGlmIChmaWVsZCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fbG9jYWxBd2FyZW5lc3NTdGF0ZVtmaWVsZF0gPSB2YWx1ZVxuICAgIH1cbiAgICBpZiAodGhpcy53c2Nvbm5lY3RlZCkge1xuICAgICAgY29uc3QgY2xvY2sgPSAodGhpcy5hd2FyZW5lc3NDbG9jay5nZXQodGhpcy51c2VySUQpIHx8IDApICsgMVxuICAgICAgdGhpcy5hd2FyZW5lc3NDbG9jay5zZXQodGhpcy51c2VySUQsIGNsb2NrKVxuICAgICAgY29uc3QgZW5jb2RlciA9IFkuZW5jb2RpbmcuY3JlYXRlRW5jb2RlcigpXG4gICAgICBZLmVuY29kaW5nLndyaXRlVmFyVWludChlbmNvZGVyLCBtZXNzYWdlQXdhcmVuZXNzKVxuICAgICAgWS5hd2FyZW5lc3NQcm90b2NvbC53cml0ZVVzZXJzU3RhdGVDaGFuZ2UoZW5jb2RlciwgW3sgdXNlcklEOiB0aGlzLnVzZXJJRCwgc3RhdGU6IHRoaXMuX2xvY2FsQXdhcmVuZXNzU3RhdGUsIGNsb2NrIH1dKVxuICAgICAgY29uc3QgYnVmID0gWS5lbmNvZGluZy50b0J1ZmZlcihlbmNvZGVyKVxuICAgICAgdGhpcy53cy5zZW5kKGJ1ZilcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBXZWJzb2NrZXQgUHJvdmlkZXIgZm9yIFlqcy4gQ3JlYXRlcyBhIHNpbmdsZSB3ZWJzb2NrZXQgY29ubmVjdGlvbiB0byBlYWNoIGRvY3VtZW50LlxuICogVGhlIGRvY3VtZW50IG5hbWUgaXMgYXR0YWNoZWQgdG8gdGhlIHByb3ZpZGVkIHVybC4gSS5lLiB0aGUgZm9sbG93aW5nIGV4YW1wbGVcbiAqIGNyZWF0ZXMgYSB3ZWJzb2NrZXQgY29ubmVjdGlvbiB0byBodHRwOi8vbG9jYWxob3N0OjEyMzQvbXktZG9jdW1lbnQtbmFtZVxuICpcbiAqIEBleGFtcGxlXG4gKiAgIGltcG9ydCB7IFdlYnNvY2tldFByb3ZpZGVyIH0gZnJvbSAneWpzL3Byb3ZpZGVyL3dlYnNvY2tldC9jbGllbnQuanMnXG4gKiAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IFdlYnNvY2tldFByb3ZpZGVyKCdodHRwOi8vbG9jYWxob3N0OjEyMzQnKVxuICogICBjb25zdCB5ZG9jdW1lbnQgPSBwcm92aWRlci5nZXQoJ215LWRvY3VtZW50LW5hbWUnKVxuICovXG5leHBvcnQgY2xhc3MgV2Vic29ja2V0UHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvciAodXJsKSB7XG4gICAgLy8gZW5zdXJlIHRoYXQgdXJsIGlzIGFsd2F5cyBlbmRzIHdpdGggL1xuICAgIHdoaWxlICh1cmxbdXJsLmxlbmd0aCAtIDFdID09PSAnLycpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCB1cmwubGVuZ3RoIC0gMSlcbiAgICB9XG4gICAgdGhpcy51cmwgPSB1cmwgKyAnLydcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7TWFwPHN0cmluZywgV2Vic29ja2V0c1NoYXJlZERvY3VtZW50Pn1cbiAgICAgKi9cbiAgICB0aGlzLmRvY3MgPSBuZXcgTWFwKClcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHJldHVybiB7V2Vic29ja2V0c1NoYXJlZERvY3VtZW50fVxuICAgKi9cbiAgZ2V0IChuYW1lLCBvcHRzKSB7XG4gICAgbGV0IGRvYyA9IHRoaXMuZG9jcy5nZXQobmFtZSlcbiAgICBpZiAoZG9jID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGRvYyA9IG5ldyBXZWJzb2NrZXRzU2hhcmVkRG9jdW1lbnQodGhpcy51cmwgKyBuYW1lLCBvcHRzKVxuICAgIH1cbiAgICByZXR1cm4gZG9jXG4gIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRQYXJhbWV0ZXJCeU5hbWUobmFtZSwgdXJsKSB7XG4gIGlmICghdXJsKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW1xcXV0vZywgJ1xcXFwkJicpO1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCdbPyZdJyArIG5hbWUgKyAnKD0oW14mI10qKXwmfCN8JCknKSxcbiAgICAgIHJlc3VsdHMgPSByZWdleC5leGVjKHVybCk7XG4gIGlmICghcmVzdWx0cykgcmV0dXJuIG51bGw7XG4gIGlmICghcmVzdWx0c1syXSkgcmV0dXJuICcnO1xuICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMl0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2FpdCh0aW1lb3V0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc2V0VGltZW91dChyZXNvbHZlLCB0aW1lb3V0KVxuICB9KVxufSJdLCJzb3VyY2VSb290IjoiIn0=