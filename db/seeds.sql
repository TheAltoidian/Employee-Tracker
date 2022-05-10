INSERT INTO departments (name)
VALUES
    ('security'),
    ('IT'),
    ('HR'),
    ('support');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Guard', 60000, 1),
    ('Head Guard', 60001, 1),
    ('Tech', 50000, 2),
    ('Advanced Tech', 60000, 2),
    ('Lead Tech', 80000, 2),
    ('HR manager', 90000, 3),
    ('Support Specialist', 40000, 4),
    ('Support Lead', 45000, 4),
    ('Support Master', 55000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Gerald', 'Griffin', 9, NULL),
    ('William', 'Carleton', 9, NULL),
    ('Hubert', 'Crackanthorpe', 8, 1),
    ('Sydney', 'Owenson', 8, 2),
    ('Susan', 'Hill', 8, 2),
    ('Eliza', 'Parsons', 7, 3),
    ('Charles', 'Brown', 7, 4),
    ('Anne', 'Radcliffe', 7, 5),
    ('William', 'Bedford', 7, 5),
    ('Matthew', 'Lewis', 6, NULL),
    ('Horace', 'Walpole', 6, 10),
    ('Charlotte', 'Yonge', 5, NULL),
    ('Anthony', 'Trollope', 4, 12),
    ('Margaret', 'Oliphant', 4, 12),
    ('George', 'Meredith', 3, 13),
    ('Harriet', 'Martineau', 3, 14),
    ('Frederick', 'Marryat', 3, 14),
    ('Arthur', 'Machen', 2, NULL),
    ('Vernon', 'Lee', 1, 18),
    ('George', 'Sand', 1, 18);