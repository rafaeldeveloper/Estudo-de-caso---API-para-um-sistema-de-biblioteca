Types::BookType = GraphQL::ObjectType.define do
  name "book"
  field :name, types.String
  field :id, types.Int

end
