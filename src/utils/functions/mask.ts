import { ChangeEvent } from 'react';

import { centsToNumber } from '../formatters/centsToNumber';
import { toBRL } from '../formatters/toBRL';
import { toPercentage } from '../formatters/toPercentage';
import { parseNumber } from '../parser/parseNumber';

export type MaskType = 'letters' | 'numbers' | 'both';
export type MaskFormatterOptions = {
  event: ChangeEvent<HTMLInputElement>;
  maskType?: MaskType;
  intlOptions?: Intl.NumberFormatOptions;
};
export type MaskFormatter = (value: string, options: MaskFormatterOptions) => string;

const applyMask = (
  value: string | number,
  mask: string,
  maskType: MaskType = 'numbers',
): string => {
  if (!value) return '';

  let regex;

  switch (maskType) {
    case 'letters':
      regex = /[^a-zA-Z]+/g;
      break;
    case 'numbers':
      regex = /\D+/g;
      break;
    case 'both':
    default:
      regex = /[^a-zA-Z0-9]+/g;
      break;
  }

  let formattedValue = '';
  const unmaskedValue = String(value).replace(regex, '');
  let position = 0;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '*' && unmaskedValue[position] !== undefined) {
      formattedValue += unmaskedValue[position++];
    } else if (unmaskedValue[position] !== undefined) {
      formattedValue += mask[i];
    }
  }

  return formattedValue;
};

const formatCPF: MaskFormatter = (value, { maskType = 'numbers' }) =>
  applyMask(value, '***.***.***-**', maskType);

const formatCNPJ: MaskFormatter = (value, { maskType = 'numbers' }) =>
  applyMask(value, '**.***.***/****-**', maskType);

const formatCEP: MaskFormatter = (value, { maskType = 'numbers' }) =>
  applyMask(value, '*****-***', maskType);

const formatBRL: MaskFormatter = (value, { intlOptions }) => {
  const valueInCents = parseFloat(value.replace('.', '').replace(',', '').replace(/\D/g, ''));

  if (isNaN(valueInCents)) {
    return '';
  }

  const formattedValue = toBRL(centsToNumber(valueInCents), intlOptions);

  return formattedValue;
};

const formatPercentage: MaskFormatter = (value, { event, intlOptions }) => {
  const isDeleting = (event.nativeEvent as InputEvent)?.inputType === 'deleteContentBackward';

  if (!value || (isDeleting && value.length === 1)) {
    return '';
  }

  const parsedValue = parseNumber(isDeleting ? value.slice(0, -1) : value) / 100;

  return toPercentage(parsedValue, intlOptions);
};

export const Mask = {
  cpf: formatCPF,
  cnpj: formatCNPJ,
  cep: formatCEP,
  brl: formatBRL,
  percentage: formatPercentage,
};
