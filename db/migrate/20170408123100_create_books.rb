class CreateBooks < ActiveRecord::Migration[5.0]
  def change
    create_table :books do |t|
      t.integer :isbn
      t.string :name
      t.string :author
      t.integer :year

      t.timestamps
    end
  end
end
