import { Transform, TransformCallback } from "node:stream";

export interface IBatchStreamOptions {
  batchSize?: number;
  delay?: number;
}

class BatchStream extends Transform {
  private _batchSize: number;
  private _delay: number;
  private _acumulator: any;

  static createBatchStream({ batchSize, delay }: IBatchStreamOptions) {
    return new BatchStream({ batchSize, delay });
  }

  constructor({ batchSize, delay }: IBatchStreamOptions) {
    super(
      Object.assign({}, { writableObjectMode: true, readableObjectMode: true })
    );

    this._batchSize = 1000;
    this._delay = 0;

    if (batchSize && batchSize > 0) {
      this._batchSize = batchSize;
    }

    if (delay && delay > 0) {
      this._delay = delay;
    }
    this._acumulator = [];
  }

  async _transform(chunk: any, _encoding: BufferEncoding, callback: TransformCallback): Promise<void> {
    this._acumulator.push(chunk);
    console.log("partial chunk: ", JSON.stringify(chunk))

    if (this._acumulator.length >= this._batchSize) {
      this.push(this._acumulator);
      this._acumulator = [];
      await new Promise((resolve) => setTimeout(resolve, this._delay));
    }
    // console.log("tranform: ", this._acumulator.length)
    callback(null);
  }

  async _flush(callback: TransformCallback) {
    if (this._acumulator.length) {
      this.push(this._acumulator);
      this._acumulator = null;
      await new Promise((resolve) => setTimeout(resolve, this._delay));
    }
    // console.log("flush: ", this._acumulator)
    callback(null);
  }
}

export const createBatchStream = BatchStream.createBatchStream;
