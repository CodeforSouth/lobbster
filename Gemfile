source 'http://rubygems.org'

gem 'rails'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'pg' # An Elephant never forgets

# Use unicorn as the web server
# gem 'unicorn'

# To use debugger (ruby-debug for Ruby 1.8.7+, ruby-debug19 for Ruby 1.9.2+)
# gem 'ruby-debug'
# gem 'ruby-debug19', :require => 'ruby-debug'

# Bundle the extra gems:
# gem 'bj'
# gem 'nokogiri'
# gem 'sqlite3-ruby', :require => 'sqlite3'
# gem 'aws-s3', :require => 'aws/s3'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry-byebug'
  gem 'rspec-rails' # Great Expectations
  gem 'factory_bot_rails' # Assembly The Testing Models
  gem 'shoulda-matchers', '~> 3.1' # Should Coulda Woulda
  gem 'faker' # The Fakest of the Fake
  gem 'database_cleaner' # Database Janitor
  gem 'awesome_print'
  gem 'fuubar'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring' # Make The App Springy
  gem 'spring-watcher-listen' # Watch The Springy App
  gem 'better_errors' # Better Errors
  gem 'binding_of_caller' # Better Error Page Debugging
end

group :test do
  gem 'simplecov', :require => false
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby] # What day is it?