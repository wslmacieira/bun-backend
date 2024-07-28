import { createBatchStream, IBatchStreamOptions } from "./batch-stream";
import { createReadableStream } from "./create-readable-stream";
import { pipeline } from "node:stream/promises";

class PipelineStream {
  private _stream: any;
  private _service: any;

  constructor({ data, service }: any) {
    this._stream = data;
    this._service = service;
  }

  static createPipelineStream({ data, service }: any) {
    return new PipelineStream({ data, service });
  }

  async execute({
    batchSize = 20,
    delay = 100,
  }: IBatchStreamOptions) {
    const stream = createReadableStream(this._stream);
    // console.log("stream: ", stream.data)
    let streamResponse: any[] = [];
    return new Promise((resolve, reject) => {
      pipeline(
        stream,
        createBatchStream({ batchSize, delay })
          .on("data", async (chunk: any[]) => {
            const promises = chunk.map((item: any) => this._service.executar(item));
            // console.log("chunk: ", promises);
            const response = await Promise.all(promises);
            // console.log(response)
            streamResponse = [...streamResponse, ...response];
          })
          .on("end", () => resolve(streamResponse))
          .on("error", reject),
        // {
        //   signal: new AbortController().signal,
        //   end: true,
        // }
      );
    });
  }
}

export const createPipelineStream = PipelineStream.createPipelineStream;
