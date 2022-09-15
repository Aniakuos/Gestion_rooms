INSERT INTO "public"."User" ("login", "username", "avatar", "email", "token_google_auth", "losses", "wins", "ladder_level") VALUES
('sbarka', 'safa', "", NULL, NULL, 0, 0, 0),
('ssghuri', 'soukaina', NULL, NULL, NULL, 0, 0, 0),
('sbensarg', 'sara', NULL, NULL, NULL, 0, 0, 0),
('hchorfi', 'hamza', NULL, NULL, NULL, 0, 0, 0),
('ziloughm', 'zineb', NULL, NULL, NULL, 0, 0, 0),
('malek', 'malek', NULL, NULL, NULL, 0, 0, 0),
('shmed', 'ahmed', NULL, NULL, NULL, 0, 0, 0),
('wayman', 'ayman', NULL, NULL, NULL, 0, 0, 0),
('doumaima', 'oumaima', NULL, NULL, NULL, 0, 0, 0);

INSERT INTO "public"."Room" ("name", "type", "password", "owner") VALUES
('room1', 'public', NULL, 'safa'),
('room2', 'public', NULL, 'hamza'),
('room3', 'protected', NULL, 'ayman'),
('room4', 'protected', NULL, 'safa');

INSERT INTO "public"."Users_room" ("username", "user_role", "room_name", "state_user") VALUES
('safa', 'owner', 'room1', ''),
('hamza', 'owner', 'room2', ''),
('sara', 'admin', 'room1', ''),
('soukaina', 'admin', 'room1', ''),
('hamza', 'user', 'room1', ''),
('malek', 'user', 'room1', ''),
('ahmed', 'admin', 'room2', ''),
('zineb', 'user', 'room1', ''),
('safa', 'user', 'room2', ''),
('ayman', 'owner', 'room3', ''),
('safa', 'owner', 'room4', ''),
('soukaina', 'user', 'room3', ''),
('safa', 'admin', 'room3', 'banned');


INSERT INTO "public"."MessageRoom" ("creationDate", "from", "room_name", "content_msg") VALUES
('2022-09-13 02:46:50.004', 'safa', 'room3', 'hi guys'),
('2022-09-13 02:47:03.277', 'soukaina', 'room3', 'hi safa');

