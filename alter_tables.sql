alter table jobs add column if not exists description text not null default '';
alter table articles add column if not exists content text not null default '';
