
export const delay = (ms: number) => {
  //função criada somente para mostrar o Loader durante a execução das requisições
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const validateName = (name: string): string | null => {
  if (!name) {
    return 'O nome é obrigatório';
  } else if (!name.includes(' ') || name.replace(/\s/g, '').length < 2) {
    return 'O nome deve ter ao menos um espaço e 2 letras';
  } else if (!isNaN(parseInt(name[0], 10))) {
    return 'O primeiro caractere não pode ser um número';
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!email) {
    return 'O email é obrigatório';
  } else if (!emailPattern.test(email)) {
    return 'Digite um email válido';
  }
  return null;
};

export const applyCpfMask = (value: string) => {
  const valueToTransform = value.replace(/\D/g, '');

  const formattedValue = valueToTransform
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return formattedValue;
}

export const removeCpfMask = (value: string) => {
  return value.replace(/\D/g, '');
}

export const validateCPF = (cpf: string): string | null => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11) return 'CPF inválido';
  if (/^(\d)\1+$/.test(cpf)) return 'CPF inválido';

  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return 'CPF inválido';

  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return 'CPF inválido';

  return null;
};

export const validateAdmissionDate = (admissionDate: string): string | null => {
  if (!admissionDate) {
    return 'A data de admissão é obrigatória';
  }
  return null;
};

export const formatAdmissionDate = (admissionDate: string): string | null => {
  const [year, month, day] = admissionDate.split('-');
  return `${day}/${month}/${year}`;
};