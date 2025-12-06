--
-- PostgreSQL database dump
--

\restrict iW3s4G7cZowHyT6kQeb3FNDWJXUKFTN0dSJddBl0ZJtphUWVJBdFt9vafl0QkmI

-- Dumped from database version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    postid integer NOT NULL,
    userid integer NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.likes_id_seq OWNER TO postgres;

--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    userid integer NOT NULL,
    content text NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(60) NOT NULL,
    firstname character varying(100),
    lastname character varying(100),
    role character varying(60) DEFAULT 'user'::character varying NOT NULL,
    createdat timestamp with time zone DEFAULT now() NOT NULL,
    updatedat timestamp with time zone DEFAULT now() NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (id, postid, userid, createdat) FROM stdin;
1	1	1	2025-12-01 17:21:20.490092-05
2	2	2	2025-12-01 17:24:24.605034-05
3	4	4	2025-12-03 17:25:26.594801-05
8	2	4	2025-12-03 17:32:20.718759-05
16	1	4	2025-12-03 17:36:12.597798-05
17	3	4	2025-12-03 17:36:16.282828-05
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, userid, content, createdat, updatedat) FROM stdin;
1	1	Este es mi primer post	2025-12-01 17:20:30.603361-05	2025-12-01 17:20:30.603361-05
2	2	Este es mi segundo post	2025-12-01 17:24:06.835422-05	2025-12-01 17:24:06.835422-05
3	4	hola soy un comentario	2025-12-02 18:36:17.857192-05	2025-12-02 18:36:17.857192-05
4	4	Los capibaras son superiores	2025-12-03 12:32:05.59814-05	2025-12-03 12:32:05.59814-05
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, firstname, lastname, role, createdat, updatedat, password) FROM stdin;
1	alex	alex@gmail.com	Alex	Gomez	user	2025-12-01 17:17:21.175467-05	2025-12-01 17:17:21.175467-05	temporal
2	jose	jose@gmail.com	Jose	Roque	user	2025-12-01 17:22:31.427036-05	2025-12-01 17:22:31.427036-05	temporal
4	draconis	draco@gmail.com	alex	\N	user	2025-12-02 12:31:53.257672-05	2025-12-02 12:31:53.257672-05	$2b$10$.mHoM49DIvZtWNi99pJWLu46Ye7FuXs9KLm4nxE7go5/EUc3XAavW
8	prueba1	prueba@gmail.com	Pru	\N	user	2025-12-05 12:08:23.255018-05	2025-12-05 12:08:23.255018-05	$2b$10$.8Ti2WsjTRw6KcxeLq6.3eLxwvIro5E/dpMKKoZ2Fw4c0JIrmFbyu
10	Pinqui	pinguino@gmail.com	Pinguie	\N	admin	2025-12-05 12:14:28.448239-05	2025-12-05 12:14:28.448239-05	$2b$10$R4DQUzjEnlXrEVog4T5iROXOJkA8w09CwsPt3Geslak3hi0es52B2
12	PinguiMayor	pinguinoMaster@gmail.com	Pinguio	\N	admin	2025-12-05 12:30:45.694611-05	2025-12-05 12:30:45.694611-05	$2b$10$Rj2EDKYxLljI/.6CAoUe/eMEXzsG0q0RHnDc8ig4X5nGVISv8e79O
\.


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.likes_id_seq', 24, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: likes likes_postid_userid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_postid_userid_key UNIQUE (postid, userid);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: likes likes_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_postid_fkey FOREIGN KEY (postid) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: likes likes_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: posts posts_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict iW3s4G7cZowHyT6kQeb3FNDWJXUKFTN0dSJddBl0ZJtphUWVJBdFt9vafl0QkmI

