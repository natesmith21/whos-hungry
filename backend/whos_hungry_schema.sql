CREATE TABLE users (
  id UUID UNIQUE,
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE saved_recipes (
  PRIMARY KEY (username, recipe_id),
  username VARCHAR(25) 
    REFERENCES users ON DELETE CASCADE,
  recipe_id INTEGER, 
  recipe_title TEXT NOT NULL,
  recipe_folder TEXT, 
  made_it BOOLEAN NOT NULL DEFAULT FALSE,
  rating INTEGER CHECK (rating > 0 and rating < 6)
)