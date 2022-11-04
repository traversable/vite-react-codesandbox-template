import * as L from "monocle-ts/Lens"
import * as T from "monocle-ts/Traversal"
import * as Op from "monocle-ts/Optional"
import { tuple, identity, constant, pipe, flow } from "fp-ts/function"
import * as O from "fp-ts/Option"
import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import * as RTE from "fp-ts/ReaderTaskEither"
import * as RA from "fp-ts/ReadonlyArray"
import * as RR from "fp-ts/ReadonlyRecord"
import * as t from "io-ts"
import * as tt from "io-ts-types"

import type { Option } from "fp-ts/Option"
import type { Either } from "fp-ts/Either"
import type { TaskEither } from "fp-ts/TaskEither"
import type { ReaderTaskEither }from "fp-ts/ReaderTaskEither"
import type { Reader }from "fp-ts/Reader"
import type {ReadonlyRecord as ROR } from "fp-ts/ReadonlyRecord"

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

export const fn = (): void => {
	console.log(mapEmptyToNone(empty))

	const lens = tt.getLenses(Model)

	console.log(optionFromEmptiableString.decode(""))
	console.log(optionFromEmptiableString.encode(O.some("a" as tt.NonEmptyString)))

	const a = lens.a.get(empty)
}

// type FormState<S> = { [A in keyof S]: Option<S[A]> }
// const emptyForm = <S>(empty: { [A in keyof S]: S[A] }): S extends {[_ in infer K]: infer V } ? {[_ in K]: Option<NonNullable<V>> } : Optionize<S> => pipe(empty, RR.map(O.fromNullable))
// export const formlens = <A>(initialValues: ) => 