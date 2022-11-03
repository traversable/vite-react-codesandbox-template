import { flow, pipe } from "fp-ts/lib/function";
import type { Option } from "fp-ts/lib/Option";
import * as O from  'fp-ts/lib/Option'
import { and, or } from  'fp-ts/lib/Predicate'
import { Refinement, compose, not } from "fp-ts/lib/Refinement";
import * as RR from 'fp-ts/lib/ReadonlyRecord'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { isString } from "fp-ts/lib/string";
export type Scalar = string | number | boolean
export type Nil = null | undefined
export type Primitive = Scalar | Nil
export type Composite<A> = A[] | { [K in string]: A }
export type Tree<A> = A | Tree<A>[]
export type MatchAnyArray = any[]
export type MatchAnyObject = { [K in string]: any }
import * as E from "fp-ts/lib/Either"


export type Optionize<A> = { [K in keyof A]-?: Option<NonNullable<A[K]>> };
export type OptionizeRecursively<A> =
  A extends Primitive ? Option<NonNullable<A[keyof A]>> :
	A extends Array<infer B> ? OptionizeRecursively<NonNullable<B>>[] :
  A extends MatchAnyObject ? { [K in keyof A]-?: OptionizeRecursively<NonNullable<A[K]>> } : 
	never;


export function prop<P extends PropertyKey>(prop: P): <A extends Record<P, any>>(a: A) => A[P] {
  return <A extends Record<P, any>>(a: A): A[P] => a[prop];
}

export const hasProp = <P extends PropertyKey, V = unknown>(prop: P) => <A extends Record<PropertyKey, any>>(a: A): a is A & { [_ in P]: V } =>
  prop in a;

const makeLiteralRefinement = <A extends Primitive, B extends A>(literal: B) => (
	a: A
): a is B => a === literal

const isTagged = hasProp("_tag")
const isSomeTag = makeLiteralRefinement("some")

export const isOption = 
  <A>(a: A | Option<A>): a is Option<NonNullable<A>> => {
  const op = a as Option<A>;
  return Boolean(op) && (op._tag === "Some" || op._tag === "None");
}

export const stringliteral = <S extends string>(s: S): S => s
export const emptyString = stringliteral("")

export const fromNullableOrOption = <A>(a: A | Option<A>): Option<NonNullable<A>> => 
  a == null ? O.none : isOption(a) ? a : O.some(a) as O.Some<NonNullable<A>>;


export const optionalsFromPartialOf = <A>(spec: A) =>
  <P extends Partial<A>>(partial: P): Optionize<A> => {
    const projection = <Optionize<A>>{};
    for (const k in spec) {
      if (k in partial) {
        const v = fromNullableOrOption(partial[k]);
        (<Optionize<P>>projection)[k] = v;
      }
    }
    return projection;
  }

export const mapEmptyToNone = <S extends MatchAnyObject>(s: S): Optionize<S> => pipe(
	s,
	RR.map(a => a === "" ? O.none : O.some(a))
) as Optionize<S>


export const isEmptyString = <S extends string>(s: S | ""): s is Exclude<S, ""> => s === ""
export const isNonEmptyString = not(isEmptyString)

export const toNonEmptyString: <S extends string>(s: S) => Option<S> = flow(
	O.fromPredicate(isNonEmptyString)
)

// export interface NonEmptyString<S extends string>
//   extends t.Type<Option<S>, S | "", unknown> {}
//   // extends t.Type<O.Option<t.TypeOf<C>>, t.OutputOf<C> | null, unknown> {}

// interface NonEmptyStringBrand  {
// 	readonly NonEmptyString: unique symbol
// }

// export const nonEmptyString = t.brand(
// 	t.string,
// 	isNonEmptyString,
// 	"NonEmptyString"
// )

const toEmptyString = O.getOrElseW(() => stringliteral(""))

export const optionFromEmptiableString = new t.Type(
	"Option<NonEmptyString>", 
	tt.option(tt.NonEmptyString).is,
	(u, c) =>
	isString(u) && 
	  isEmptyString(u) 
		? t.success(O.none)
		: pipe(
			tt.NonEmptyString.validate(u, c),
			E.map(O.some)
		),
		ma => toEmptyString(
			pipe(
				ma,
				O.map(tt.NonEmptyString.encode)
			)
		)
)
