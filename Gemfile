source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.4.2'

gem 'rails', '~> 5.1.4'

gem 'puma', '~> 3.7' # That's one fast cat

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

group :development, :test do
  gem 'sqlite3' # Use sqlite3
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-byebug'
  gem 'rspec-rails' # Great Expectations
  gem 'factory_bot_rails' # Assemble The Fixtures
  gem 'shoulda-matchers', '~> 3.1' # Shoulda Coulda Woulda
  gem 'faker' # The Fakest of the Fake
  gem 'database_cleaner' # Database Janitor
  gem 'awesome_print' # The best printer, really, you have to see it, it's awesome
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring' # Make The App Springy
  gem 'spring-watcher-listen' # Watch The Springy App
  gem 'better_errors' # Better Errors
  gem 'binding_of_caller' # Better Error Page Debugging
end

group :production do
  gem 'pg' # An Elephant never forgets
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby] # Timey Wimey Windows
