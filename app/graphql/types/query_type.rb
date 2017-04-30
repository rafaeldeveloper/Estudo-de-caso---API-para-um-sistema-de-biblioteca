Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.



 

 

  field :lending do
    type Types::LendingType
    description "Find Last Lending"
    argument :id,types.String
    resolve ->(obj, args, ctx) {Lending.find(args["id"])
    }
  end

  field :lendings, types[Types::LendingType] do
    description "Consultar todos os empréstimos"
    argument :date,types.String
    resolve -> (obj, args, ctx) {
      Lending.includes([:user,:book])

    }
  end

end
