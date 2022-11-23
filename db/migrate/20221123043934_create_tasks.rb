class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.boolean :completed
      t.integer :user_id

      t.timestamps
    end
  end
end
