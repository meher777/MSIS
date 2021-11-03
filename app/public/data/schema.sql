create database soccer;
use soccer;

create table users( 
user_id int,
name varchar(20),
role varchar(20),
primary key (user_id)) ;


insert into users values (1, "Kesner" , "assignor");
insert into users values (2, "Bipin Prabhakar" , "referee");
insert into users values (3, "Tom Gregory" , "referee");
insert into users values (4, "Alex" , "referee");

insert into users values (5, "Beth", "referee");

create table referee(
referee_id int,
assignee_id int,
grade varchar(5),
status varchar(30),
rating int,
auto_id int auto_increment ,
match_id int,
foreign key (match_id) references game(match_id),
foreign key(referee_id) references users(user_id),
foreign key(assignee_id) references users(user_id),
primary key (auto_id)
);

insert into referee(referee_id,assignee_id,grade,status,rating,match_id) values (2,1, "II", "unassigned", 90,1);
insert into referee(referee_id,assignee_id,grade,status,rating,match_id) values (2,3, "I", "unassigned", 99,4);
insert into referee(referee_id,assignee_id,grade,status,rating,match_id) values (2,4, "II", "assigned", 95,3);
insert into referee(referee_id,assignee_id,grade,status,rating,match_id) values (2,5, "II", "assigned", 97,3);

create table game(
	field varchar(20),
    game_time varchar(40),
    match_id int,
    primary key(match_id)
);


insert into game values("IU stadium" ,"2021/12/10" , 1);
insert into game values("IU stadium" ,"2021/11/10" , 2);
insert into game values("IU stadium" ,"2021/10/10" , 3);
insert into game values("IU stadium" ,"2021/19/10" , 4);
