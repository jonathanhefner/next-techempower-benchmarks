import { Generated, Selectable } from "kysely"

export interface Database {
  World: WorldTable
}

export interface WorldTable {
  id: Generated<number>
  randomNumber: number
}

export type World = Selectable<WorldTable>
