PGDMP                  
    {            uni_info    16.0    16.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16402    uni_info    DATABASE     �   CREATE DATABASE uni_info WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1251';
    DROP DATABASE uni_info;
                postgres    false            �            1259    16404    student_info    TABLE     �  CREATE TABLE public.student_info (
    fac_num integer NOT NULL,
    first_name character varying(30) NOT NULL,
    mid_name character varying(30),
    last_name character varying(30) NOT NULL,
    course smallint NOT NULL,
    spec character varying(30) NOT NULL,
    spec_group smallint NOT NULL,
    status character varying(30),
    email character varying(30),
    degree character varying(30)
);
     DROP TABLE public.student_info;
       public         heap    postgres    false            �            1259    16403    student_info_fac_num_seq    SEQUENCE     �   CREATE SEQUENCE public.student_info_fac_num_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.student_info_fac_num_seq;
       public          postgres    false    216            �           0    0    student_info_fac_num_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.student_info_fac_num_seq OWNED BY public.student_info.fac_num;
          public          postgres    false    215            �            1259    16439    user_discord    TABLE     e   CREATE TABLE public.user_discord (
    username integer NOT NULL,
    roles character varying(30)
);
     DROP TABLE public.user_discord;
       public         heap    postgres    false            �            1259    16438    user_discord_username_seq    SEQUENCE     �   CREATE SEQUENCE public.user_discord_username_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.user_discord_username_seq;
       public          postgres    false    220            �           0    0    user_discord_username_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.user_discord_username_seq OWNED BY public.user_discord.username;
          public          postgres    false    219            �            1259    16429    user_moodle    TABLE     �   CREATE TABLE public.user_moodle (
    username integer NOT NULL,
    first_name character varying(30) NOT NULL,
    mid_name character varying(30),
    last_name character varying(30) NOT NULL,
    course smallint
);
    DROP TABLE public.user_moodle;
       public         heap    postgres    false            �            1259    16428    user_moodle_username_seq    SEQUENCE     �   CREATE SEQUENCE public.user_moodle_username_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.user_moodle_username_seq;
       public          postgres    false    218            �           0    0    user_moodle_username_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.user_moodle_username_seq OWNED BY public.user_moodle.username;
          public          postgres    false    217            $           2604    16407    student_info fac_num    DEFAULT     |   ALTER TABLE ONLY public.student_info ALTER COLUMN fac_num SET DEFAULT nextval('public.student_info_fac_num_seq'::regclass);
 C   ALTER TABLE public.student_info ALTER COLUMN fac_num DROP DEFAULT;
       public          postgres    false    215    216    216            &           2604    16442    user_discord username    DEFAULT     ~   ALTER TABLE ONLY public.user_discord ALTER COLUMN username SET DEFAULT nextval('public.user_discord_username_seq'::regclass);
 D   ALTER TABLE public.user_discord ALTER COLUMN username DROP DEFAULT;
       public          postgres    false    219    220    220            %           2604    16432    user_moodle username    DEFAULT     |   ALTER TABLE ONLY public.user_moodle ALTER COLUMN username SET DEFAULT nextval('public.user_moodle_username_seq'::regclass);
 C   ALTER TABLE public.user_moodle ALTER COLUMN username DROP DEFAULT;
       public          postgres    false    218    217    218            �          0    16404    student_info 
   TABLE DATA           �   COPY public.student_info (fac_num, first_name, mid_name, last_name, course, spec, spec_group, status, email, degree) FROM stdin;
    public          postgres    false    216   6       �          0    16439    user_discord 
   TABLE DATA           7   COPY public.user_discord (username, roles) FROM stdin;
    public          postgres    false    220   S       �          0    16429    user_moodle 
   TABLE DATA           X   COPY public.user_moodle (username, first_name, mid_name, last_name, course) FROM stdin;
    public          postgres    false    218   p       �           0    0    student_info_fac_num_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.student_info_fac_num_seq', 1, false);
          public          postgres    false    215            �           0    0    user_discord_username_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.user_discord_username_seq', 1, false);
          public          postgres    false    219            �           0    0    user_moodle_username_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.user_moodle_username_seq', 1, false);
          public          postgres    false    217            (           2606    16409    student_info student_info_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.student_info
    ADD CONSTRAINT student_info_pkey PRIMARY KEY (fac_num);
 H   ALTER TABLE ONLY public.student_info DROP CONSTRAINT student_info_pkey;
       public            postgres    false    216            *           2606    16443 '   user_discord user_discord_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_discord
    ADD CONSTRAINT user_discord_username_fkey FOREIGN KEY (username) REFERENCES public.student_info(fac_num);
 Q   ALTER TABLE ONLY public.user_discord DROP CONSTRAINT user_discord_username_fkey;
       public          postgres    false    220    4648    216            )           2606    16433 %   user_moodle user_moodle_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_moodle
    ADD CONSTRAINT user_moodle_username_fkey FOREIGN KEY (username) REFERENCES public.student_info(fac_num);
 O   ALTER TABLE ONLY public.user_moodle DROP CONSTRAINT user_moodle_username_fkey;
       public          postgres    false    216    4648    218            �      x������ � �      �      x������ � �      �      x������ � �     