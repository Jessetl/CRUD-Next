export const handlerResponse = (response: Response) => {
  if (response.ok) return response;
  throw response;
};
