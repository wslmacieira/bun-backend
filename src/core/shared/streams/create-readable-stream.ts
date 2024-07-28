import { Readable } from 'node:stream'

class ReadableStreamFromData<TReadableInput> extends Readable {
  private _data: TReadableInput[]
  constructor(data: TReadableInput[]) {
    super({ objectMode: true })
    this._data = data
  }

  static createReadableStream<TReadableInput>(data: TReadableInput[]) {
    return new ReadableStreamFromData(data)
  }

  _read() {
    if (this._data.length) {
      // console.log('read', this._data[0])
      this.push(this._data.shift())
    } else {
      this.push(null)
    }
  }

  get data() {
    return this._data
  }
}

export const createReadableStream = ReadableStreamFromData.createReadableStream