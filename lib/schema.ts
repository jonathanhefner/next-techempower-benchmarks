import { Generated, Selectable } from "kysely"

export interface Database {
  World: WorldTable
  Fortune: FortuneTable
}

export interface WorldTable {
  id: Generated<number>
  randomNumber: number
}

export type World = Selectable<WorldTable>

export interface FortuneTable {
  id: Generated<number>
  message: string
}

export type Fortune = Selectable<FortuneTable>
