

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
  id INTEGER UNIQUE,
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES Users(id)
); 

create TABLE Sales(
  order_id INTEGER,
  FOREIGN KEY (order_id) REFERENCES Orders(id),
  name_sale VARCHAR(255) NOT NULL,
  FOREIGN KEY (name_sale) REFERENCES Positions(name),
  quantity INTEGER NOT NULL DEFAULT 1,
  cost_sale INTEGER NOT NULL,
  FOREIGN KEY (cost_sale) REFERENCES Positions(cost)
); 
