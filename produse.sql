DROP TYPE IF EXISTS categ_produse;
DROP TYPE IF EXISTS tipuri_produse;

CREATE TYPE categ_produse AS ENUM( 'craciun', 'marvel', 'harry-potter','star-wars','masini');
CREATE TYPE tipuri_produse AS ENUM('lego', 'puzzle', 'figurina', 'plush');


CREATE TABLE IF NOT EXISTS produse (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   varsta INT NOT NULL CHECK (varsta>0),   
   tip_produs tipuri_produse DEFAULT 'lego',
   nivel_dificultate INT NOT NULL CHECK (nivel_dificultate>=0),
   categorie categ_produse DEFAULT 'marvel',
   continut_piese VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   in_stock BOOLEAN NOT NULL DEFAULT TRUE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into produse (nume,descriere,pret, varsta, nivel_dificultate, tip_produs, categorie, continut_piese, in_stock, imagine) VALUES 
('Christmas Tree', 'Copac de craciun', 30.5 , 3, 2, 'lego', 'craciun', '{"plastic","instructiuni","cutie","suport"}', True, 'Christmas-Tree.png'),

('LEGO Harry Potter', 'Puzzle varianta Harry Potter', 20.9 , 12, 5, 'puzzle', 'harry-potter', '{"instructiuni","cutie","punga","piese"}', False, 'LEGO-Harry-Potter.png'),

('Luke Skywalker Helmet', 'Casca de lupta a lui Luke Skywalker', 80 , 18, 10, 'lego', 'star-wars', '{"suport","plastic","instructiuni","cutie","mini-model"}', True,'Luke-Skywalker-Helmet.png'),

('Yoda', 'Generalul Yoda in marime mica', 30 , 6, 6, 'lego', 'star-wars', '{"cutie","instructiuni","piese","punga"}', True,'yoda.png'),

('Yoda plush', 'Generalul Yoda varianta plush.', 60 , 2, 1, 'plush', 'star-wars', '{"polyester", "plastic", "cutie"}', True,'tyoda-plush.png'),

('Hogwarts Castle', 'Castelul Hogwarts varianta mica', 70 , 12, 7, 'lego', 'harry-potter', '{"piese","instructiuni","cutie","punga"}', True, 'castelul-hogwarts.png'),

('007 Aston Martin DB5', 'James Bond cu masina lui fantastica', 100.2 , 16, 8, 'lego', 'masini', '{"figurina","piese","instruciuni","cutie","plastic"}', False, 'aston-martin.png'),

('Groot', 'Figurina groot in marime naturala', 400.8 , 8, 1, 'figurina', 'marvel', '{"suport","cutie","plastic","figurina"}', True, 'groot.png'),

('Venom', 'Venom din lego, varianta cu suport.', 200 , 10, 9, 'lego', 'marvel', '{"suport","piese","plastic","instruciuni","cutie"}', False, 'venom.png'),

('Venom-2', 'Venom din lego, varianta fara suport.', 150 , 10, 9, 'lego', 'marvel', '{"piese","plastic","instruciuni","cutie"}', True, 'venom-fara-suport.png'),

('Trasura Mos Craciun', 'Trasura lui mos Craciun varianta cu reni', 70 , 7, 3, 'lego', 'craciun', '{"piese","plastic", "instructiuni","cutie","model"}', False, 'trasura.png'),

('Wolverine Mech Armour', 'Figurina wolverine cu armura sa mech', 60.1 , 7, 4, 'figurina', 'marvel', '{"plastic","figurina","piese","punga","cutie","suport"}', False, 'wolverine.png'),

('Harry Potter & Hermione Granger', 'Harry si Hermione figurine', 20, 5, 2,'figurina', 'harry-potter', '{"figurina", "plastic", "punga", "cutie", "suport"}', True, 'harry-hermoine.png'),

('Darth Vader Plush', 'Darth vader varianta de plush', 50 , 2, 1, 'plush', 'star-wars', '{"polyester", "plastic", "cutie"}', True, 'darth-vader.png'),


('Lamborghini Countach', 'Lamborghini Countach varianta lego cu sofer', 200 , 18, 10, 'puzzle', 'masini', '{"piese","punga","cutie", "plastic"}', False, 'lamborghini.png');



