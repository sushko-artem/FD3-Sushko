import { z } from "zod";

const baseURL = "https://fe.it-academy.by/Examples/mobile_company.json";

const ClientSchema = z.object({
  id: z.number(),
  fam: z.string(),
  im: z.string(),
  otch: z.string(),
  fio: z.string().optional(),
  balance: z.number(),
});

const DataDtoSchema = z.object({
  companyName: z.string(),
  clientsArr: z.array(ClientSchema),
});

export type ClientType = z.infer<typeof ClientSchema>;
export type CompanyDataType = z.infer<typeof DataDtoSchema>;

export const api = {
  getData: async () => {
    try {
      const response = await fetch(baseURL);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return DataDtoSchema.parse(data);
    } catch (err) {
      console.error("request failed:", err);
      throw err;
    }
  },
};
