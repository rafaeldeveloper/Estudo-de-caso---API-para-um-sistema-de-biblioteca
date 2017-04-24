class LendingsController < ApplicationController
  before_action :set_lending, only: [:show, :update, :destroy]

  # GET /lendings
  def index
    # @lendings = Lending.all
    
    includes = params[:includes]  
    if includes
      @lendings = Lending.joins(:book,:user).select('books.name as book_name,users.name as user_name,lendings.id, lendings.created_at as data_do_emprestimo ')
      # @lendings = Lending.joins("JOIN books ON books.id = lendings.book_id join users ON users.id = lendings.user_id").select('books.name as book_name,users.name as user_name,lendings.id')W
    else
      @lendings = Lending.all
    end
    render :json => @lendings
    # render :json => @lendings.to_json(:include => [:book,:user])  
  end

  # GET /lendings/1
  def show
    render json: @lending
  end

  # POST /lendings
  def create
    @lending = Lending.new(lending_params)

    if @lending.save
      render json: @lending, status: :created, location: @lending
    else
      render json: @lending.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lendings/1
  def update
    if @lending.update(lending_params)
      render json: @lending
    else
      render json: @lending.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lendings/1
  def destroy
    @lending.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lending
      @lending = Lending.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def lending_params
      params.require(:lending).permit(:user_id, :book_id)
    end
end
