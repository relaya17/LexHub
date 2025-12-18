import type {
  LetterType,
  LetterForm,
  HandlerType,
  LetterDraft,
  ApiResponse,
  Lawyer,
  ContractCheckResult,
} from './types';

const BASE_URL = 'http://localhost:4000/api';

async function requestJson<TResponse>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as TResponse;
}

export const createLetter = (
  type: LetterType,
  form: LetterForm,
  handler: HandlerType,
): Promise<ApiResponse<LetterDraft>> => {
  return requestJson<ApiResponse<LetterDraft>>(`${BASE_URL}/letters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, form, handler }),
  });
};

export const getLetter = (id: string): Promise<ApiResponse<LetterDraft>> => {
  return requestJson<ApiResponse<LetterDraft>>(`${BASE_URL}/letters/${id}`);
};

export const getLawyers = (): Promise<ApiResponse<Lawyer[]>> => {
  return requestJson<ApiResponse<Lawyer[]>>(`${BASE_URL}/lawyers`);
};

export const checkContractAI = (
  contractText: string,
): Promise<ApiResponse<ContractCheckResult>> => {
  return requestJson<ApiResponse<ContractCheckResult>>(
    `${BASE_URL}/contracts/check`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: contractText }),
    },
  );
};


