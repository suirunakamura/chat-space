## DB設計

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false|

### Association
- has_many:group, through: members
- has_many :messages
- has_many :members
