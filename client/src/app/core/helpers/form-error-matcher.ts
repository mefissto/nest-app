import { FormErrorMessagesEnum } from '@core/enums/form-error-messages.enum';
import { FormErrorType } from '@core/types/form-error-type';

export function matchErrorMessages(source: Record<string, FormErrorType>): Record<string, string> {
  return Object.entries(source).reduce((acc, [key, value]) => {
    if (typeof value === 'boolean') {
      acc[key] = FormErrorMessagesEnum[key];
    } else {
      acc[key] = FormErrorMessagesEnum[key] + value.requiredLength;
    }

    return acc;
  }, {});
}
