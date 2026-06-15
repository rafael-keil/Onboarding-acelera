import { Transform } from 'class-transformer'

import { normalizeField } from '@core/helpers'

const ToNormalizer = (): PropertyDecorator => Transform(({ value }) => normalizeField(value))

export { ToNormalizer }
