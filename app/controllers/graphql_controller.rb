class GraphqlController < ApplicationController
  def execute
    variables = ensure_hash(params[:variables])
    query = "{ lending(id : \"1\"){user{name},book{name},created_at} }"
    query2 = "{ lendings{user{name},book{name},created_at} }"
    query3 = "{ lendings{created_at} }"


    context = {
      # Query context goes here, for example:
      # current_user: current_user,
    }
    result = LibrarySchema.execute(query, variables: variables, context: context)
    render json: result
  end

  private

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
