PGDMP                         |            Facturation %   14.11 (Ubuntu 14.11-0ubuntu0.22.04.1) %   14.11 (Ubuntu 14.11-0ubuntu0.22.04.1) <    i           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            j           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            k           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            l           1262    16454    Facturation    DATABASE     b   CREATE DATABASE "Facturation" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'fr_FR.UTF-8';
    DROP DATABASE "Facturation";
                postgres    false            �            1259    16500    USER    TABLE     �   CREATE TABLE public."USER" (
    design_user character varying(100) NOT NULL,
    id_user integer NOT NULL,
    id_role integer NOT NULL,
    mdp character varying(250) NOT NULL
);
    DROP TABLE public."USER";
       public         heap    postgres    false            �            1259    16499    USER_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public."USER_id_user_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."USER_id_user_seq";
       public          postgres    false    222            m           0    0    USER_id_user_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."USER_id_user_seq" OWNED BY public."USER".id_user;
          public          postgres    false    221            �            1259    16507    calendre    TABLE     B  CREATE TABLE public.calendre (
    id_cal integer NOT NULL,
    id_cli integer NOT NULL,
    id_salle integer NOT NULL,
    id_user integer NOT NULL,
    date_res character varying(180) NOT NULL,
    debut_date character varying(180) NOT NULL,
    fin_date character varying(180) NOT NULL,
    nb_jour integer NOT NULL
);
    DROP TABLE public.calendre;
       public         heap    postgres    false            �            1259    16506    calendre_id_cal_seq    SEQUENCE     �   CREATE SEQUENCE public.calendre_id_cal_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.calendre_id_cal_seq;
       public          postgres    false    224            n           0    0    calendre_id_cal_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.calendre_id_cal_seq OWNED BY public.calendre.id_cal;
          public          postgres    false    223            �            1259    16456    client    TABLE       CREATE TABLE public.client (
    id_cli integer NOT NULL,
    id_types_cli integer NOT NULL,
    nom_cli character varying(200) NOT NULL,
    nif integer,
    stat integer,
    contact character varying(255) NOT NULL,
    fonction_cont character varying(100) NOT NULL,
    ville character varying(100) NOT NULL,
    tel integer NOT NULL,
    email character varying(200) NOT NULL
);
    DROP TABLE public.client;
       public         heap    postgres    false            �            1259    16455    client_id_cli_seq    SEQUENCE     �   CREATE SEQUENCE public.client_id_cli_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.client_id_cli_seq;
       public          postgres    false    210            o           0    0    client_id_cli_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.client_id_cli_seq OWNED BY public.client.id_cli;
          public          postgres    false    209            �            1259    16465    facture    TABLE     �   CREATE TABLE public.facture (
    id_fact integer NOT NULL,
    id_cli integer NOT NULL,
    id_res integer NOT NULL,
    date_fact character varying(180) NOT NULL,
    montant integer NOT NULL,
    nombre_jour integer NOT NULL
);
    DROP TABLE public.facture;
       public         heap    postgres    false            �            1259    16464    facture_id_fact_seq    SEQUENCE     �   CREATE SEQUENCE public.facture_id_fact_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.facture_id_fact_seq;
       public          postgres    false    212            p           0    0    facture_id_fact_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.facture_id_fact_seq OWNED BY public.facture.id_fact;
          public          postgres    false    211            �            1259    16472    reservation    TABLE     E  CREATE TABLE public.reservation (
    id_res integer NOT NULL,
    id_cli integer NOT NULL,
    id_salle integer NOT NULL,
    id_user integer NOT NULL,
    date_res character varying(180) NOT NULL,
    debut_date character varying(180) NOT NULL,
    fin_date character varying(180) NOT NULL,
    nb_jour integer NOT NULL
);
    DROP TABLE public.reservation;
       public         heap    postgres    false            �            1259    16471    reservation_id_res_seq    SEQUENCE     �   CREATE SEQUENCE public.reservation_id_res_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.reservation_id_res_seq;
       public          postgres    false    214            q           0    0    reservation_id_res_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.reservation_id_res_seq OWNED BY public.reservation.id_res;
          public          postgres    false    213            �            1259    16479 	   role_user    TABLE     q   CREATE TABLE public.role_user (
    id_role integer NOT NULL,
    design_role character varying(100) NOT NULL
);
    DROP TABLE public.role_user;
       public         heap    postgres    false            �            1259    16478    role_user_id_role_seq    SEQUENCE     �   CREATE SEQUENCE public.role_user_id_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.role_user_id_role_seq;
       public          postgres    false    216            r           0    0    role_user_id_role_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.role_user_id_role_seq OWNED BY public.role_user.id_role;
          public          postgres    false    215            �            1259    16486    salle    TABLE     �   CREATE TABLE public.salle (
    id_salle integer NOT NULL,
    libelle character varying(200) NOT NULL,
    etat character varying(100) NOT NULL,
    prix_jour integer NOT NULL
);
    DROP TABLE public.salle;
       public         heap    postgres    false            �            1259    16485    salle_id_salle_seq    SEQUENCE     �   CREATE SEQUENCE public.salle_id_salle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.salle_id_salle_seq;
       public          postgres    false    218            s           0    0    salle_id_salle_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.salle_id_salle_seq OWNED BY public.salle.id_salle;
          public          postgres    false    217            �            1259    16493    types_client    TABLE     z   CREATE TABLE public.types_client (
    id_types_cli integer NOT NULL,
    design_types character varying(100) NOT NULL
);
     DROP TABLE public.types_client;
       public         heap    postgres    false            �            1259    16492    types_client_id_types_cli_seq    SEQUENCE     �   CREATE SEQUENCE public.types_client_id_types_cli_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.types_client_id_types_cli_seq;
       public          postgres    false    220            t           0    0    types_client_id_types_cli_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.types_client_id_types_cli_seq OWNED BY public.types_client.id_types_cli;
          public          postgres    false    219            �           2604    16503    USER id_user    DEFAULT     p   ALTER TABLE ONLY public."USER" ALTER COLUMN id_user SET DEFAULT nextval('public."USER_id_user_seq"'::regclass);
 =   ALTER TABLE public."USER" ALTER COLUMN id_user DROP DEFAULT;
       public          postgres    false    221    222    222            �           2604    16510    calendre id_cal    DEFAULT     r   ALTER TABLE ONLY public.calendre ALTER COLUMN id_cal SET DEFAULT nextval('public.calendre_id_cal_seq'::regclass);
 >   ALTER TABLE public.calendre ALTER COLUMN id_cal DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    16459    client id_cli    DEFAULT     n   ALTER TABLE ONLY public.client ALTER COLUMN id_cli SET DEFAULT nextval('public.client_id_cli_seq'::regclass);
 <   ALTER TABLE public.client ALTER COLUMN id_cli DROP DEFAULT;
       public          postgres    false    210    209    210            �           2604    16468    facture id_fact    DEFAULT     r   ALTER TABLE ONLY public.facture ALTER COLUMN id_fact SET DEFAULT nextval('public.facture_id_fact_seq'::regclass);
 >   ALTER TABLE public.facture ALTER COLUMN id_fact DROP DEFAULT;
       public          postgres    false    211    212    212            �           2604    16475    reservation id_res    DEFAULT     x   ALTER TABLE ONLY public.reservation ALTER COLUMN id_res SET DEFAULT nextval('public.reservation_id_res_seq'::regclass);
 A   ALTER TABLE public.reservation ALTER COLUMN id_res DROP DEFAULT;
       public          postgres    false    213    214    214            �           2604    16482    role_user id_role    DEFAULT     v   ALTER TABLE ONLY public.role_user ALTER COLUMN id_role SET DEFAULT nextval('public.role_user_id_role_seq'::regclass);
 @   ALTER TABLE public.role_user ALTER COLUMN id_role DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16489    salle id_salle    DEFAULT     p   ALTER TABLE ONLY public.salle ALTER COLUMN id_salle SET DEFAULT nextval('public.salle_id_salle_seq'::regclass);
 =   ALTER TABLE public.salle ALTER COLUMN id_salle DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    16496    types_client id_types_cli    DEFAULT     �   ALTER TABLE ONLY public.types_client ALTER COLUMN id_types_cli SET DEFAULT nextval('public.types_client_id_types_cli_seq'::regclass);
 H   ALTER TABLE public.types_client ALTER COLUMN id_types_cli DROP DEFAULT;
       public          postgres    false    220    219    220            d          0    16500    USER 
   TABLE DATA           D   COPY public."USER" (design_user, id_user, id_role, mdp) FROM stdin;
    public          postgres    false    222   �C       f          0    16507    calendre 
   TABLE DATA           n   COPY public.calendre (id_cal, id_cli, id_salle, id_user, date_res, debut_date, fin_date, nb_jour) FROM stdin;
    public          postgres    false    224   FD       X          0    16456    client 
   TABLE DATA           u   COPY public.client (id_cli, id_types_cli, nom_cli, nif, stat, contact, fonction_cont, ville, tel, email) FROM stdin;
    public          postgres    false    210   �D       Z          0    16465    facture 
   TABLE DATA           [   COPY public.facture (id_fact, id_cli, id_res, date_fact, montant, nombre_jour) FROM stdin;
    public          postgres    false    212   �E       \          0    16472    reservation 
   TABLE DATA           q   COPY public.reservation (id_res, id_cli, id_salle, id_user, date_res, debut_date, fin_date, nb_jour) FROM stdin;
    public          postgres    false    214   CF       ^          0    16479 	   role_user 
   TABLE DATA           9   COPY public.role_user (id_role, design_role) FROM stdin;
    public          postgres    false    216   �F       `          0    16486    salle 
   TABLE DATA           C   COPY public.salle (id_salle, libelle, etat, prix_jour) FROM stdin;
    public          postgres    false    218   G       b          0    16493    types_client 
   TABLE DATA           B   COPY public.types_client (id_types_cli, design_types) FROM stdin;
    public          postgres    false    220   �G       u           0    0    USER_id_user_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."USER_id_user_seq"', 3, true);
          public          postgres    false    221            v           0    0    calendre_id_cal_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.calendre_id_cal_seq', 10, true);
          public          postgres    false    223            w           0    0    client_id_cli_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.client_id_cli_seq', 43, true);
          public          postgres    false    209            x           0    0    facture_id_fact_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.facture_id_fact_seq', 10, true);
          public          postgres    false    211            y           0    0    reservation_id_res_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.reservation_id_res_seq', 10, true);
          public          postgres    false    213            z           0    0    role_user_id_role_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.role_user_id_role_seq', 4, true);
          public          postgres    false    215            {           0    0    salle_id_salle_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.salle_id_salle_seq', 5, true);
          public          postgres    false    217            |           0    0    types_client_id_types_cli_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.types_client_id_types_cli_seq', 3, true);
          public          postgres    false    219            �           2606    16505    USER USER_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT "USER_pkey" PRIMARY KEY (id_user);
 <   ALTER TABLE ONLY public."USER" DROP CONSTRAINT "USER_pkey";
       public            postgres    false    222            �           2606    16512    calendre calendre_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.calendre
    ADD CONSTRAINT calendre_pkey PRIMARY KEY (id_cal);
 @   ALTER TABLE ONLY public.calendre DROP CONSTRAINT calendre_pkey;
       public            postgres    false    224            �           2606    16463    client client_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id_cli);
 <   ALTER TABLE ONLY public.client DROP CONSTRAINT client_pkey;
       public            postgres    false    210            �           2606    16470    facture facture_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.facture
    ADD CONSTRAINT facture_pkey PRIMARY KEY (id_fact);
 >   ALTER TABLE ONLY public.facture DROP CONSTRAINT facture_pkey;
       public            postgres    false    212            �           2606    16477    reservation reservation_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id_res);
 F   ALTER TABLE ONLY public.reservation DROP CONSTRAINT reservation_pkey;
       public            postgres    false    214            �           2606    16484    role_user role_user_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.role_user
    ADD CONSTRAINT role_user_pkey PRIMARY KEY (id_role);
 B   ALTER TABLE ONLY public.role_user DROP CONSTRAINT role_user_pkey;
       public            postgres    false    216            �           2606    16491    salle salle_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.salle
    ADD CONSTRAINT salle_pkey PRIMARY KEY (id_salle);
 :   ALTER TABLE ONLY public.salle DROP CONSTRAINT salle_pkey;
       public            postgres    false    218            �           2606    16498    types_client types_client_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.types_client
    ADD CONSTRAINT types_client_pkey PRIMARY KEY (id_types_cli);
 H   ALTER TABLE ONLY public.types_client DROP CONSTRAINT types_client_pkey;
       public            postgres    false    220            d   ^   x�����s	�t�s���q�4B�$S��t��d__G�
�\��po��`�Ҭ(�T�/����`����|��$?=��(���`�=... f��      f   }   x�u�A� ��/��k�ޑS����T=�P#8�4�a�xV�q�s��Q\|?��Zwv���k�s�&��
W�ú�5��)nZ�W �i��5��l�{>E���WkwW�kʌ�*�j�[E�'KB�      X   �   x�e���0���+�b�+�$np�1�����R�#�Ŀw
1A��.��i+ABF7��*�(�猓
��jm]m���N5�:�m�\ʽ!����${eQ@���8x��'қ��o�0�i���t$BV��	��:4�OIT(%4\�����5��4��.����g���C4:[�`;��r�]q�@�` T�      Z   �   x�u�;�0��b_�8G*M���qc�-ovA@�AHl#�H@#�AQ��|�(�"o2�b`��.�N���n�cL�/����Y�z��(T�/�W)�������ޏjU��n2�G��3鐎������3����2=A+]���wC�g[?�      \   }   x�u�A� ��/��k�ޑS����T=�P#8�4�a�xV�q�s��Q\|?��Zwv���k�s�&��
W�ú�5��)nZ�W �i��5��l�{>E���WkwW�kʌ�*�j�[E�'KB�      ^   &   x�3�tL����2�JMN-(�����,.I����� �@�      `   l   x�=�1�0�z�� 2>.=-/Hc�I���ǀ`�լ���b�j	����)jkJȢ��o���h��1�K?O���?�FD��`���[f�̏1�y���#o      b   /   x�3���s�2�t�+)J-(�,N-�2�H,*�L.��L-����� �t     