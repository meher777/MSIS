create database soccer;
use soccer;


create table referee(
referee_id int primary key auto_increment,
grade varchar(5),
rating int,
age int ,
referee_name varchar(20)
);

create table game(
	game_field varchar(20),
    game_date date,
    game_id int primary key auto_increment, 
    start_time time,
    end_time time
);

create table assignment(
	assignment_id int primary key auto_increment,
    game_id int,
    referee_id int,
    referee_status ENUM('unassigned','assigned','tentative','accepted'),
    foreign key(game_id) references game(game_id),
    foreign key(referee_id) references referee(referee_id)   

);


insert into referee(grade,rating,age,referee_name) values ("II", 10, 24, "John Siemnes");
insert into referee(grade,rating,age,referee_name) values ("II", 8, 40, "Kevin Smith");
insert into referee(grade,rating,age,referee_name) values ("III", 5, 40, "Ted Judson");
insert into referee(grade,rating,age,referee_name) values ("I", 10, 20, "Brad Freeman");
insert into referee(grade,rating,age,referee_name) values ("IV", 5, 30, "Shun White");
insert into referee(grade,rating,age,referee_name) values ("II", 9, 33, "Cole Porter");

insert into game(game_field,game_date, start_time, end_time) values("IU Stadium" ,"2021/12/10" , '08:00:00', '09:30:00');
insert into game(game_field,game_date, start_time, end_time) values("IU Stadium" ,"2021/11/10" , '04:00:00', '05:30:00');
insert into game(game_field,game_date, start_time, end_time) values("IU Stadium" ,"2021/12/09" , '03:00:00', '04:30:00');
insert into game(game_field,game_date, start_time, end_time) values("IU Stadium" ,"2021/11/10" , '06:00:00', '07:30:00');
insert into game(game_field,game_date, start_time, end_time) values("IU Stadium" ,"2021/12/3" , '07:00:00', '08:30:00');

insert into assignment(game_id, referee_id, referee_status) values (1,1,'assigned');
insert into assignment(game_id, referee_id, referee_status) values (1,2,'tentative');
insert into assignment(game_id, referee_id, referee_status) values (1,3,'tentative');
insert into assignment(game_id, referee_id, referee_status) values (2,3,'assigned');
insert into assignment(game_id, referee_id, referee_status) values (2,4,'unassigned');
insert into assignment(game_id, referee_id, referee_status) values (3,6,'tentative');
insert into assignment(game_id, referee_id, referee_status) values (3,5,'accepted');
select * from assignment;
/* list of all  games assigned to a referee in a given data range*/
select g.game_field, g.game_date, g.start_time, g.end_time, r.referee_name from game g, referee r, assignment a where r.referee_id = a.referee_id and g.game_id = a.game_id and g.game_date > '2021-11-3' and g.game_date < '2021-12-10' and r.referee_name = 'Ted Judson' ;
select * from game g, assignment a, referee r where r.referee_id = a.referee_id and g.game_id = a.game_id ;
/* list of all future games with atleast 1 position unassigned */
select a.referee_status, g.game_field, g.game_date, g.start_time, g.end_time, r.referee_name from game g, referee r, assignment a where r.referee_id = a.referee_id and g.game_id = a.game_id and g.game_date > '2021-12-10' and a.referee_status = 'unassigned' ;
delete  from assignment where assignment_id = 1
select a.assignment_id, g.game_field, g.game_date, g.start_time, g.end_time, r.referee_name from assignment a, game g, referee r where g.game_id = a.game_id and r.referee_id = a.referee_id