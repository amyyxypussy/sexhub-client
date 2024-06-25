export type UserField = {
  username: string
  password?: string
  leastLoginDate?: number
}

export class Setting {
  token?: string = ''
  autoLogin?: boolean = false
  rememberMe?: boolean = false
  userArray: UserField[] = []
}

export type SettingField = InstanceType<typeof Setting>
