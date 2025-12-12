export type Lead = {
  id: string | number;
  nome_empresa: string;
  cnpj_completo: string;
  cnae: string;
  uf: string;
  nome_decisor: string;
  score: number; // numérico
  status: string;
  link_linkedin?: string | null;
};
