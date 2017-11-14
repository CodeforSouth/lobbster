require 'rails_helper'



RSpec.describe  User do
  it "it creates a User on .new" do
    assert_instance_of User, (User.new)
  end

  it "User has a .email method" do
    assert_respond_to (User.new), :email
  end

  it "User has a .user_type method" do
    assert_respond_to (User.new), :user_type
  end

  it "User has a .password method" do
    assert_respond_to (User.new), :password
  end

  it "User has a .token method" do
    assert_respond_to (User.new), :token
  end

  it "User has a .first_name method" do
    assert_respond_to (User.new), :first_name
  end

  it "User has a .last_name method" do
    assert_respond_to (User.new), :last_name
  end

  it "User has a .middle_initial method" do
    assert_respond_to (User.new), :middle_initial
  end

  it "validates :email presence" do
    new_user = User.new( password: "password", password_confirmation: "password")
   refute new_user.save
  end

  it "validates :password presence" do
   new_user = User.new( email: "ed@ed.com", password_confirmation: "password")
   refute new_user.save
  end

  it "User rejects identical emails" do
     valid_user = User.create(email: "ed@ed.com", password: "password", password_confirmation: "password")
     new_user = User.new(email: "ed@ed.com", password: "password", password_confirmation: "password")
     refute new_user.save
  end

  it "confirms password input" do
    new_user = User.new(email: "ed@ed.com", password: "password", password_confirmation: "notpassword")
    refute new_user.save
  end
end
