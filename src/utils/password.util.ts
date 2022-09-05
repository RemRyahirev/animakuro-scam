import * as bcrypt from 'bcrypt'

export const hash = (password: string) => bcrypt.hash(password, 7)

export const compare = (password: string, hash: string) => bcrypt.compare(password, hash)