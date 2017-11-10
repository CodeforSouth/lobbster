class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :user_type
      t.string :email
      t.string :password
      t.string :token
      t.string :first_name
      t.string :last_name
      t.string :middle_initial

      t.timestamps
    end
  end
end
