## DB設計

## usersテーブル

|Columns|Type|Options|
|-------|----|-------|
|name|string|index: true, null: false, unique: true|
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

## groupテーブル

|columns|type|Options|
|-------|----|-------|
|name|string|null: false|
- has_many :groups_users　
- has_many :users, through: :groups_users 
- has_many :messages

## messagesテーブル

|Columns|Type|Options|
|users_id|references|index: true, null: false, foregin_key: true|
|groups_id|references|index: true, null: false, foreign_key: true|
|image|integer|
- belongs_to :user
- belomgs_to :group



## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|users_id|references|index: true, null: false, foregin_key: true|
|groups_id|references|index: true, null: false, foreign_key: true|
- belongs_to :user
- belongs_to :group

