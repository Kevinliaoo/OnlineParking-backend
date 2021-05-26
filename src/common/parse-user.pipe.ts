import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { User } from 'src/users/entities/user.entity'; 
import { UpdateUserUsernameDto } from 'src/users/dtos/users.dto';
import { LoginDto } from 'src/users/dtos/auth.dto';

@Injectable()
export class ParseUserPipe implements PipeTransform {
  transform(value: User, metadata: ArgumentMetadata) {
      value.username = value.username.trim().toLowerCase(); 
      value.firstName = value.firstName.trim()
      value.lastName = value.lastName.trim()

      return value;
  }
}

@Injectable()
export class ParseUsernamePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
      return value.trim().toLocaleLowerCase();
  }
}

@Injectable()
export class ParseNewUsernamePipe implements PipeTransform {
  transform(value: UpdateUserUsernameDto, metadata: ArgumentMetadata) {
    const newName = value.newUsername; 
    return {
      newUsername: newName.trim().toLocaleLowerCase()      
    }
  }
}

@Injectable()
export class ParseAuthPipe implements PipeTransform {
  transform(value: LoginDto, metadata: ArgumentMetadata) {
    return {
      ...value, 
      username: value.username.trim().toLowerCase(),
    }
  }
}