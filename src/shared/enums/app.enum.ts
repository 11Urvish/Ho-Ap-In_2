import { ErrorCodeEnum } from './error-code.enum';
import { HttpStatusEnum } from './http-status.enum';
import { LookupEnum } from './lookup.enum';
import { SortEnum } from './sort.enum';
import { UserStatusEnum } from './status.enum';
import { ErrorTypeEnum } from './type.enum';

export const APP_ENUM = {
  ERROR_CODE: ErrorCodeEnum,
  HTTP_STATUS: HttpStatusEnum,
  LOOKUP: LookupEnum,
  SORT: SortEnum,
  TYPE: {
    ERROR: ErrorTypeEnum,
    USER : UserStatusEnum,
  },
  STATUS: {
    USER: UserStatusEnum,
  },
};
