import axios from "axios";
import CasoDeUso from "../CasoDeUso";

export default class ConsultarTodoPorId implements CasoDeUso<number, any> {
  async executar(entrada: number): Promise<any> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${entrada}`)
    return response.json()
    // const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${entrada}`)
    // return response.data
  }

}