var users = [
	{
		user: 'userName',
		pwd: 'password',
		roles: [
			{
				role: 'dbOwner',
				db: 'kinchan'
			}
		]
	}
];

for (var i = 0, length = users.length; i < length; ++i) {
	db.createUser(users[i]);
}