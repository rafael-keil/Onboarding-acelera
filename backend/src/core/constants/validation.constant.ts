const VALIDATION_MESSAGE_BUILDER = {
  isEmail: () => '$property deve estar no formato de email válido.',
  isNotEmpty: () => '$property é um campo obrigatório.',
  isNumber: () => '$property deve ser um número.',
  isOptional: () => '$property é um campo opcional.',
  isString: () => '$property deve ser uma string.',
}

export { VALIDATION_MESSAGE_BUILDER }
