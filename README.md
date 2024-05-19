# ts-blueprints

This library provides easy-to-use type templates to help you design models with standardized field names. It also helps prevent typos during development.

# installation

> `npm i -D ts-blueprints typescript`

# usage

`types.ts`

```
import * as bp from 'ts-blueprints/snakecase'
import { Combine, Select, Subtract } from 'ts-blueprints/utils'

export type Entity = Combine<
  & bp.ID<number>
  & bp.CreatedAt<Date>
  & bp.UpdatedAt<Date>
  & Partial<bp.DeletedAt<Date>>
>

export type Credentials = Combine<
  & bp.Login<string>
  & bp.Password<string>
  & bp.Salt<string>
>

export type PersonalInfo = Combine<
  & bp.Email<string>
  & Partial<bp.Age<number>>
  & Partial<bp.FirstName<string>>
  & Partial<bp.LastName<string>>
>

export type User = Combine<
  & Entity
  & Credentials
  & PersonalInfo
>

export type EditUserPesonalInfoArgs = Subtract<
  User,
  & Entity
  & Credentials
>

export type EditUserPasswordArgs = Select<
  & bp.ID
  & bp.Salt
  & bp.Password
  , User
>
```

`interfaces.ts`

```
import { EditUserPasswordArgs, EditUserPesonalInfoArgs } from "./types"

export interface IEditableUser {
  editPersonalInfo (args: EditUserPesonalInfoArgs): void
  editPassword (args: EditUserPasswordArgs): void
}
```

`user.entity.ts`

```
import { IEditableUser } from "./interfaces"
import { EditUserPasswordArgs, EditUserPesonalInfoArgs, User } from "./types"

export class UserEntity implements User, IEditableUser {

  id: number
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  login: string
  password: string
  salt: string
  email: string
  age?: number
  first_name?: string
  last_name?: string

  editPersonalInfo ({ email, age, first_name, last_name }: EditUserPesonalInfoArgs): void {
    // TODO: implement
  }

  editPassword ({ id, salt, password }: EditUserPasswordArgs): void {
    // TODO: implement
  }
}
```
