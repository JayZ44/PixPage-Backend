\c pixpage;


-- Create your seedfiles here using SQL -  INSERT INTO() VALUES()

INSERT INTO creators(name,bio) VALUES('demoman','The man behind the demo.');


INSERT INTO grids(title,creator,creator_id,created_at,grid_size)
VALUES
('demo','demoman',1,NOW(),9),
('demo2','demoman',1,NOW(),9);
INSERT INTO squares(
  coordinates,color,grid_id  
)
VALUES
('a1','green',1),
('a2','black',1),
('a3','green',1),
('b1','black',1),
('b2','green',1),
('b3','black',1),
('c1','green',1),
('c2','black',1),
('c3','green',1),
('a1','red',2),
('a2','black',2),
('a3','red',2),
('b1','black',2),
('b2','red',2),
('b3','black',2),
('c1','red',2),
('c2','black',2),
('c3','red',2);