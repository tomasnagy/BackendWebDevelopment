function loadUsers(userIds, load) {
    var users = [];
    for (var i = 0; i < userIds; i++) {
        users.push(load(userIds[i]));
    }

    return users;
}


function loadUsers(userIds, load, cbDone) {
    var users = [];
    var count = 0;



    users.length = userIds;
    users.forEach(function(val) {
        load(val, function(user) {
            users.push(user);

            if(count++ == userIds.length - 1) {
                cbDone(users);
            }

        });
    });
}

