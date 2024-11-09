# ts-blueprints

This library provides easy-to-use type templates to help you design models with standardized field names. It also helps prevent typos during development.

#### Installation

> `npm i ts-blueprints`

#### Usage

`types.ts`

```
import {
  snakecase as bp,
  Combine,
  Select,
  Subtract,
} from 'ts-blueprints'

export type Entity = Combine<
  & bp.Id<number>
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

export type EditUserPersonalInfoArgs = Subtract<
  & Entity
  & Credentials
  , User
>

export type EditUserPasswordArgs = Select<
  & bp.Id
  & bp.Salt
  & bp.Password
  , User
>
```

`interfaces.ts`

```
import {
  EditUserPasswordArgs,
  EditUserPersonalInfoArgs,
} from "./types"

export interface IEditableUser {
  editPersonalInfo (args: EditUserPersonalInfoArgs): void
  editPassword (args: EditUserPasswordArgs): void
}
```

`user.entity.ts`

```
import { IEditableUser } from "./interfaces"
import {
  EditUserPasswordArgs,
  EditUserPersonalInfoArgs,
  User,
} from "./types"

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

  editPersonalInfo ({ email, age, first_name, last_name }: EditUserPersonalInfoArgs): void {
    // TODO: implement
  }

  editPassword ({ id, salt, password }: EditUserPasswordArgs): void {
    // TODO: implement
  }
}
```

#### Customization

Using this library you can also create your own customized blueprint types that can be more suitable to your project.

`types/blueprints.ts`

```
import { snakecase as bp } from 'ts-blueprints'

export type Id<T extends string | number = undefined> = bp.Id<T>
export type CreatedAt<T extends string | number | Date = undefined> = bp.CreatedAt<T>

```
