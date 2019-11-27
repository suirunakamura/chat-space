## DB設計

## usersテーブル

|Columns|Type|Options|
|-------|----|-------|
|name|string|index: true, null: false, foreign_key: true, unique: true|
|Email|integer|null: false, unique: 
true|

## groupテーブル

|columns|type|Options|
|-------|----|-------|
|image|integer|
|type_message|string|

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|members|string|index: true, null: false, foreign_key: true|
### Association
- has_many:group, through: members
- has_many :messages
- has_many :members
