json.extract! todo, :id, :list_id, :task, :created_at, :updated_at
json.url todo_url(todo, format: :json)
