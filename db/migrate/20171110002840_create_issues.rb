class CreateIssues < ActiveRecord::Migration[5.1]
  def change
    create_table :issues do |t|
      t.references :user, foreign_key: true
      t.string :principal
      t.string :address
      t.string :city
      t.string :state
      t.integer :zip
      t.string :phone
      t.string :description
      t.boolean :non_profit
      t.integer :ein_number

      t.timestamps
    end
  end
end
