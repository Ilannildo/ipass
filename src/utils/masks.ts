export const maskTime = (unix_timestamp: string) => {
  return new Date(parseInt(unix_timestamp, 10)).toLocaleTimeString('pt-BR');
};
export const maskDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR');
};
