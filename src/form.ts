mport * as L from "monocle-ts/lib/Lens"
import * as T from "monocle-ts/lib/Traversal"
import * as Op from "monocle-ts/lib/Optional"
import { tuple, identity, constant, pipe, flow } from "fp-ts/lib/function"
import * as O from "fp-ts/lib/Option"
import * as E from "fp-ts/lib/Either"
import * as TE from "fp-ts/lib/TaskEither"
import * as RTE from "fp-ts/lib/ReaderTaskEither"
import * as RA from "fp-ts/lib/ReadonlyArray"
import * as RR from "fp-ts/lib/ReadonlyRecord"
import * as t from "io-ts"
import * as tt from "io-ts-types"

import type { Option } from "fp-ts/lib/Option"
import type { Either } from "fp-ts/lib/Either"
import type { TaskEither } from "fp-ts/lib/TaskEither"
import type { ReaderTaskEither }from "fp-ts/lib/ReaderTaskEither"
import type { Reader }from "fp-ts/lib/Reader"
import type {ReadonlyRecord as ROR } from "fp-ts/lib/ReadonlyRecord"

import { mapEmptyToNone, emptyString, Optionize, OptionizeRecursively, isNonEmptyString, optionFromEmptiableString} from "./utils"

type ROA<A> = ReadonlyArray<A>


type Model = t.TypeOf<typeof Model>
const Model = t.type({a: t.string, b: t.string, c: t.type({ d: t.string }) })

type ModelO = t.TypeOf<typeof ModelO>
const ModelO = t.type({ 
	a: tt.optionFromNullable(t.string), 
	b: tt.optionFromNullable(t.string), 
	c: t.type({ 
		d: tt.optionFromNullable(t.string) 
	}) 
})

const empty = { a: emptyString, b: emptyString, c: { d: emptyString} }
type __Internal = Optionize<Model>


console.log(mapEmptyToNone(empty))

const lens = tt.getLenses(Model)

console.log(optionFromEmptiableString.decode(""))
console.log(optionFromEmptiableString.encode(O.some("a" as tt.NonEmptyString)))

const a = lens.a.get(empty)

// type FormState<S> = { [A in keyof S]: Option<S[A]> }
// const emptyForm = <S>(empty: { [A in keyof S]: S[A] }): S extends {[_ in infer K]: infer V } ? {[_ in K]: Option<NonNullable<V>> } : Optionize<S> => pipe(empty, RR.map(O.fromNullable))
// export const formlens = <A>(initialValues: ) => 