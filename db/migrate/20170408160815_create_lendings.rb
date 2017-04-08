class CreateLendings < ActiveRecord::Migration[5.0]
  def change
    create_table :lendings do |t|
      t.references :user, foreign_key: true
      t.references :book, foreign_key: true

      t.timestamps
    end
  end
end
