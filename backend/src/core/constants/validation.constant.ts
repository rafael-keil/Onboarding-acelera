const VALIDATION_MESSAGE_BUILDER = {
  isEmail: () => '$property deve estar no formato de email válido.',
  isNotEmpty: () => '$property é um campo obrigatório.',
  isNumber: () => '$property deve ser um número.',
  isOptional: () => '$property é um campo opcional.',
  isString: () => '$property deve ser uma string.',
  minLength: (min: number) => `$property deve possuir no mínimo ${min} caracteres.`,
  matches: () => '$property está em um formato inválido.',
}

export { VALIDATION_MESSAGE_BUILDER }
