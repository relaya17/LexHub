import type { ApiResponse, ContractCheckResult } from '@lexhub/api-client/types';
import { checkContractAI } from '@lexhub/api-client/api';
import { http } from './http';

export const contractsApi = {
  async check(text: string): Promise<ApiResponse<ContractCheckResult>> {
    return checkContractAI(text);
  },

  async extractText(file: File): Promise<ApiResponse<{ text: string }>> {
    const form = new FormData();
    form.append('file', file);
    const res = await http.post<ApiResponse<{ text: string }>>('/contracts/extract', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

