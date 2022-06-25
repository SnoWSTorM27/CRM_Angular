

create TABLE Users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

create TABLE Categories(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  imagesrc VARCHAR DEFAULT null,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
); 

create TABLE Positions(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cost INTEGER NOT NULL,
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES Categories(id),
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
); 

create TABLE Orders(
  id SERIAL PRIMARY KEY,
  order_number INTEGER UNIQUE,
  order_date TIMESTAMP NOT NULL DEFAULT (now()),
  total_price INTEGER,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
); 

create TABLE OrderPositions(
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  FOREIGN KEY (order_id) REFERENCES Orders(order_number),
  name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  cost INTEGER NOT NULL
); 
