--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-09-09 04:02:07

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 823 (class 1247 OID 16783)
-- Name: categ_produse; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.categ_produse AS ENUM (
    'craciun',
    'marvel',
    'harry-potter',
    'star-wars',
    'masini'
);


ALTER TYPE public.categ_produse OWNER TO postgres;

--
-- TOC entry 826 (class 1247 OID 16794)
-- Name: tipuri_produse; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipuri_produse AS ENUM (
    'lego',
    'puzzle',
    'figurina',
    'plush'
);


ALTER TYPE public.tipuri_produse OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16804)
-- Name: produse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produse (
    id integer NOT NULL,
    nume character varying(50) NOT NULL,
    descriere text,
    pret numeric(8,2) NOT NULL,
    varsta integer NOT NULL,
    tip_produs public.tipuri_produse DEFAULT 'lego'::public.tipuri_produse,
    nivel_dificultate integer NOT NULL,
    categorie public.categ_produse DEFAULT 'marvel'::public.categ_produse,
    continut_piese character varying[],
    in_stock boolean DEFAULT true NOT NULL,
    imagine character varying(300),
    data_adaugare timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT produse_nivel_dificultate_check CHECK ((nivel_dificultate >= 0)),
    CONSTRAINT produse_varsta_check CHECK ((varsta > 0))
);


ALTER TABLE public.produse OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16803)
-- Name: produse_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produse_id_seq OWNER TO postgres;

--
-- TOC entry 3327 (class 0 OID 0)
-- Dependencies: 209
-- Name: produse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produse_id_seq OWNED BY public.produse.id;


--
-- TOC entry 3170 (class 2604 OID 16807)
-- Name: produse id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produse ALTER COLUMN id SET DEFAULT nextval('public.produse_id_seq'::regclass);


--
-- TOC entry 3321 (class 0 OID 16804)
-- Dependencies: 210
-- Data for Name: produse; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (1, 'Christmas Tree', 'Copac de craciun', 30.50, 3, 'lego', 2, 'craciun', '{plastic,instructiuni,cutie,suport}', true, 'Christmas-Tree.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (2, 'LEGO Harry Potter', 'Puzzle varianta Harry Potter', 20.90, 12, 'puzzle', 5, 'harry-potter', '{instructiuni,cutie,punga,piese}', false, 'LEGO-Harry-Potter.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (3, 'Luke Skywalker Helmet', 'Casca de lupta a lui Luke Skywalker', 80.00, 18, 'lego', 10, 'star-wars', '{suport,plastic,instructiuni,cutie,mini-model}', true, 'Luke-Skywalker-Helmet.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (4, 'Yoda', 'Generalul Yoda in marime mica', 30.00, 6, 'lego', 6, 'star-wars', '{cutie,instructiuni,piese,punga}', true, 'yoda.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (5, 'Yoda plush', 'Generalul Yoda varianta plush.', 60.00, 2, 'plush', 1, 'star-wars', '{polyester,plastic,cutie}', true, 'tyoda-plush.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (6, 'Hogwarts Castle', 'Castelul Hogwarts varianta mica', 70.00, 12, 'lego', 7, 'harry-potter', '{piese,instructiuni,cutie,punga}', true, 'castelul-hogwarts.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (7, '007 Aston Martin DB5', 'James Bond cu masina lui fantastica', 100.20, 16, 'lego', 8, 'masini', '{figurina,piese,instruciuni,cutie,plastic}', false, 'aston-martin.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (8, 'Groot', 'Figurina groot in marime naturala', 400.80, 8, 'figurina', 1, 'marvel', '{suport,cutie,plastic,figurina}', true, 'groot.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (9, 'Venom', 'Venom din lego, varianta cu suport.', 200.00, 10, 'lego', 9, 'marvel', '{suport,piese,plastic,instruciuni,cutie}', false, 'venom.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (10, 'Venom-2', 'Venom din lego, varianta fara suport.', 150.00, 10, 'lego', 9, 'marvel', '{piese,plastic,instruciuni,cutie}', true, 'venom-fara-suport.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (11, 'Trasura Mos Craciun', 'Trasura lui mos Craciun varianta cu reni', 70.00, 7, 'lego', 3, 'craciun', '{piese,plastic,instructiuni,cutie,model}', false, 'trasura.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (12, 'Wolverine Mech Armour', 'Figurina wolverine cu armura sa mech', 60.10, 7, 'figurina', 4, 'marvel', '{plastic,figurina,piese,punga,cutie,suport}', false, 'wolverine.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (13, 'Harry Potter & Hermione Granger', 'Harry si Hermione figurine', 20.00, 5, 'figurina', 2, 'harry-potter', '{figurina,plastic,punga,cutie,suport}', true, 'harry-hermoine.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (14, 'Darth Vader Plush', 'Darth vader varianta de plush', 50.00, 2, 'plush', 1, 'star-wars', '{polyester,plastic,cutie}', true, 'darth-vader.png', '2022-09-09 03:20:07.294413');
INSERT INTO public.produse (id, nume, descriere, pret, varsta, tip_produs, nivel_dificultate, categorie, continut_piese, in_stock, imagine, data_adaugare) VALUES (15, 'Lamborghini Countach', 'Lamborghini Countach varianta lego cu sofer', 200.00, 18, 'puzzle', 10, 'masini', '{piese,punga,cutie,plastic}', false, 'lamborghini.png', '2022-09-09 03:20:07.294413');


--
-- TOC entry 3328 (class 0 OID 0)
-- Dependencies: 209
-- Name: produse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produse_id_seq', 15, true);


--
-- TOC entry 3178 (class 2606 OID 16819)
-- Name: produse produse_nume_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produse
    ADD CONSTRAINT produse_nume_key UNIQUE (nume);


--
-- TOC entry 3180 (class 2606 OID 16817)
-- Name: produse produse_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produse
    ADD CONSTRAINT produse_pkey PRIMARY KEY (id);


-- Completed on 2022-09-09 04:02:08

--
-- PostgreSQL database dump complete
--

