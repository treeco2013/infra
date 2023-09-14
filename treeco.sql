-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

COMMENT ON SCHEMA public IS 'standard public schema';

-- DROP SEQUENCE public.arvores_id_seq;

CREATE SEQUENCE public.arvores_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.arvores_id_seq OWNER TO treeco;
GRANT ALL ON SEQUENCE public.arvores_id_seq TO treeco;

-- DROP SEQUENCE public.imagens_id_seq;

CREATE SEQUENCE public.imagens_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.imagens_id_seq OWNER TO treeco;
GRANT ALL ON SEQUENCE public.imagens_id_seq TO treeco;

-- DROP SEQUENCE public.quem_marcou_id_seq;

CREATE SEQUENCE public.quem_marcou_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE public.quem_marcou_id_seq OWNER TO treeco;
GRANT ALL ON SEQUENCE public.quem_marcou_id_seq TO treeco;

-- public.quem_marcou definition

-- Drop table

-- DROP TABLE quem_marcou;

CREATE TABLE quem_marcou (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	nome varchar NULL,
	conta varchar NOT NULL,
	bloqueado bool NULL,
	CONSTRAINT quem_marcou_pk PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.quem_marcou OWNER TO treeco;
GRANT ALL ON TABLE public.quem_marcou TO treeco;

-- public.arvores definition

-- Drop table

-- DROP TABLE arvores;

CREATE TABLE arvores (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	identificacao varchar NOT NULL,
	familia varchar NOT NULL,
	especie varchar NOT NULL,
	detalhes varchar NULL,
	"quemMarcouId" int8 NOT NULL,
	"comProblema" bool NOT NULL,
	latitude float8 NULL,
	longitude float8 NULL,
	CONSTRAINT arvores_pk PRIMARY KEY (id),
	CONSTRAINT quem_marcou_fk FOREIGN KEY ("quemMarcouId") REFERENCES quem_marcou(id)
);

-- Permissions

ALTER TABLE public.arvores OWNER TO treeco;
GRANT ALL ON TABLE public.arvores TO treeco;

-- public.imagens definition

-- Drop table

-- DROP TABLE imagens;

CREATE TABLE imagens (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	arquivo varchar NOT NULL,
	"arvoreId" int8 NOT NULL,
	CONSTRAINT imagens_pk PRIMARY KEY (id),
	CONSTRAINT arvore_fk FOREIGN KEY ("arvoreId") REFERENCES arvores(id)
);

-- Permissions

ALTER TABLE public.imagens OWNER TO treeco;
GRANT ALL ON TABLE public.imagens TO treeco;

-- Permissions

GRANT ALL ON SCHEMA public TO pg_database_owner;
GRANT USAGE ON SCHEMA public TO public;