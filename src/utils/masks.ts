import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const maskTime = (unix_timestamp: string) => {
  return format(Number(unix_timestamp), "'às' H'h'm'min'");
};

export const maskDate = (date: string) => {
  return format(new Date(date), "dd 'de' MMM 'de' y", {
    locale: ptBR,
  });
};

export const maskPass = (pass: string) => {
  return pass.replace(/[^;=]*$/, x => '*'.repeat(x.length));
};
