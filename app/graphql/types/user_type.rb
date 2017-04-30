Types::UserType = GraphQL::ObjectType.define do
  name "user"
  field :name, types.String
  field :id, types.Int

end
