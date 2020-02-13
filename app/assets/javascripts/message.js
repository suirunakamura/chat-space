$(function(){
  var buildHTML = function(message) {
    console.log(message)
    if (message.content && message.image) {
      //data-idが反映しているようにしている
      var html = `<div class="main-chat__messageroom__onebox" data-message-id=` + message.id + `>` +
        `<div class="main-chat__messageroom__onebox__userinfo">` +
          `<div class=main-chat__messageroom__onebox__userinfo--name">` +
            message.user_name +
          `</div>` +
          `<div class="main-chat__messageroom__onebox__userinfo--time">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class=main-chat__messageroom__onebox__text">` +
          `<p class="main-chat__messageroom__onebox__text--image">` +
            message.content +
          `</P>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `<div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="main-chat__messageroom__onebox" data-message-id=` + message.id + `>` +
        `<div class="main-chat__messageroom__onebox__userinfo">` +
          `<div class="main-chat__messageroom__onebox__userinfo--name">` +
            message.user_name +
          `</div>` +
          `<div class="main-chat__messageroom__onebox__userinfo--time">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="main-chat__messageroom__onebox__text">` +
          `<p class="main-chat__messageroom__onebox__text__image">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映できるようにしている
      var html = `<div class="main-chat__messageroom__onebox" data-message-id=` + message.id + `>` +
        `<div class="main-chat__messageroom__onebox__userinfo">` +
          `<div class="main-chat__messageroom__onebox__userinfo--name">` +
            message.user_name +
          `</div>` +
          `<div class="main-chat__messageroom__onebox__userinfo--time">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="main-chat__messageroom__onebox__text">` +
          `<img src="` + message.image + `" class=lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action');
  $.ajax({
    url: url,
    type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__messageroom').append(html);
      $('.main-chat__messageroom').animate({ scrollTop: $('.main-chat__messageroom')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })

    .fail(function(data) {
      alert('メッセージ送信に失敗しました');
    })

})

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.main-chat__messageroom__onebox:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるような文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var inserHTML = '';
        //配列messageroomの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          inserHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごとに追加
        $('.main-chat__messageroom').append(inserHTML);
        $('.main-chat__messageroom').animate({ scrollTop: $('.main-chat__messageroom')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  //$(function(){});の閉じタグの直上（処理の最後）に以下のように追記
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});