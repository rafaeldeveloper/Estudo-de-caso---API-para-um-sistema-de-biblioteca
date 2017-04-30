Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.



 

  field :lending do
    type Types::LendingType
    description "Find Last Lending"
    resolve ->(obj, args, ctx) { Lending.last
    }
  end

  field :lendings, types[Types::LendingType] do
    description "Consultar empréstimos anteriores a data requsitada"
    argument :date,types.String
    resolve -> (obj, args, ctx) {
      Lending.where(['lendings.created_at < ?',args["date"]])

    }
  end

end
