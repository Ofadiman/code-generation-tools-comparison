import mongoose from 'mongoose'

export type TestDocumentFields<DocumentFields extends { _id: string }> = Partial<
  Omit<DocumentFields, '_id'> & { _id: mongoose.Types.ObjectId }
>

export type TestDocumentFactory<DocumentFields extends { _id: string }> = (
  fields?: Partial<TestDocumentFields<DocumentFields>>,
) => Required<TestDocumentFields<DocumentFields>>
