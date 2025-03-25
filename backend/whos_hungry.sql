\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE whos_hungry;
CREATE DATABASE whos_hungry;
\connect whos_hungry

\i whos_hungry_schema.sql
\i whos_hungry_seed.sql

\echo 'Delete and recreate whos_hungry_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE whos_hungry_test;
CREATE DATABASE whos_hungry_test;
\connect whos_hungry_test

\i whos_hungry_schema.sql
\i whos_hungry_seed.sql
