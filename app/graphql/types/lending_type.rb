Types::LendingType = GraphQL::ObjectType.define do
  name "lending"
  field :user, Types::UserType
  field :book, Types::BookType
  field :created_at, types.String
  field :id, types.Int

end
