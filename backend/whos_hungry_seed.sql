INSERT INTO users (id, username, password, first_name, last_name, email, is_admin)
VALUES ( '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
         'testuser',
         'password',
         'test1',
         'smith',
         'test@email.com',
         TRUE
        );

INSERT INTO saved_recipes (username, recipe_id, recipe_title, recipe_folder, made_it, rating)
VALUES ('testuser', 660185, 'test1', 'folder1', true, 3),
        ('testuser', 655822, 'test2', 'folder1', false, null);

