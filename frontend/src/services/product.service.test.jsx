import getProducts from "./product.service";
import axios from "axios";

jest.mock("axios");

describe("getProducts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("retorna os produtos corretamente", async () => {
    const mockData = [{ id: 1, name: "RD Station CRM" }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getProducts();

    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3001/products");
  });

  test("lança erro em falha na requisição", async () => {
    const mockError = new Error("Erro de rede");
    axios.get.mockRejectedValue(mockError);

    // Suprime o console.error apenas neste teste
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(getProducts()).rejects.toThrow("Erro de rede");

    // Verifica que o console.error foi chamado corretamente
    expect(consoleSpy).toHaveBeenCalledWith(
      "Erro ao obter os produtos:",
      mockError
    );

    consoleSpy.mockRestore(); // restaurar o console.error original
  });
});
