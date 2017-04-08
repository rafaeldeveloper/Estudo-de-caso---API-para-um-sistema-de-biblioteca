class LendingsController < ApplicationController
  before_action :set_lending, only: [:show, :update, :destroy]

  # GET /lendings
  def index
    @lendings = Lending.all

    render json: @lendings
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
