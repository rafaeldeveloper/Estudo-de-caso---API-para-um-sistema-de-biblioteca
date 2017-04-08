# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

	

for i in 0..1000 

	book = Book.create([{ isbn: Faker::Number.number(4),
												year: Faker::Number.number(4),
												name: Faker::Name.name,
												author: Faker::Name.name
										}])

	user = User.create([{ ra: Faker::Number.number(4),
												name: Faker::Name.name
										}])

	lending = Lending.create([{ user_id: Faker::Number.between(1,i),
												book_id: Faker::Number.between(1,i)
										}])


end