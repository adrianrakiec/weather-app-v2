// #region vendor
// #endregion
// #region internal
import { type TNullable } from '@types';
// #endregion

// #region operations
export type TModify<T, R> = Omit<T, keyof R> & R;

export enum EJsonPatchOperation {
  Add = 'add',
  Remove = 'remove',
  Replace = 'replace',
  Move = 'move',
  Copy = 'copy',
  Test = 'test',
}

type BaseOperation = {
  path: string;
};

type AddOperation<T> = TModify<
  BaseOperation,
  {
    op: EJsonPatchOperation.Add;
    value: T;
  }
>;

type RemoveOperation = TModify<
  BaseOperation,
  {
    op: EJsonPatchOperation.Remove;
  }
>;

type ReplaceOperation<T> = TModify<
  BaseOperation,
  {
    op: EJsonPatchOperation.Replace;
    value: T;
  }
>;

type MoveOperation = TModify<
  BaseOperation,
  {
    op: EJsonPatchOperation.Move;
    from: string;
  }
>;

type CopyOperation = TModify<
  BaseOperation,
  {
    op: EJsonPatchOperation.Copy;
    from: string;
  }
>;

type TestOperation<T> = TModify<
  BaseOperation,
  {
    op: EJsonPatchOperation.Test;
    value: T;
  }
>;
// #endregion

// #region general
export type TRequestBaseParams = Partial<{
  offset: number;
  limit: number;
  orderBy: string;
  filter: string;
  lastRowNumber?: TNullable<number>;
}>;

export type TApiResponse<T = unknown> = {
  data: T[];
  metadata: {
    count: number;
    offset: number;
    limit: number;
    total: number;
    lastRowNumber?: number;
  };
};

export type TApiDeleteResponseById = {
  id: number;
};

export type TApiDeleteResponseByKey = {
  key: string;
};

export type TJsonPatchOperation<T = any> =
  | AddOperation<T>
  | RemoveOperation
  | ReplaceOperation<T>
  | MoveOperation
  | CopyOperation
  | TestOperation<T>;
// #endregion
