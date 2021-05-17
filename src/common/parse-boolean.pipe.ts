import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === 'true' || value === 1) {
      return true
    }
    return false
  }
}
