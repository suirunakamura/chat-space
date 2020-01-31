$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
           `<div class="main-chat__messageroom__onebox" data-message-id=${message.id}>
              <div class="main-chat__messageroom__onebox__userinfo">
                <div class="main-chat__messageroom__onebox__userinfo--name">
                  ${message.user_name}
                </div>
                <div class="main-chat__messageroom__onebox__userinfo--time">
                  ${message.created_at}
                </div>
              </div>
              <div class="main-chat__messageroom__onebox__text">
                <p class="main-chat__messageroom__onebox__text--image">
                  ${message.content}
                </p>
                <img class="lower-message__image" src=${message.image} alt="pictweetnew.html.erb ">
              </div>
            </div>`
          return html;
        } else {
          var html =
           `<div class="main-chat__messageroom__onebox" data-message-id=${message.id}>
              <div class="main-chat__messageroom__onebox__userinfo">
                <div class="main-chat__messageroom__onebox__userinfo--name">
                  ${message.user_name}
                </div>
                <div class="main-chat__messageroom__onebox__userinfo--time">
                  ${message.created_at}
                </div>
              </div>
              <div class="main-chat__messageroom__onebox__text">
                <p class="main-chat__messageroom__onebox__text--image">
                  ${message.content}
                </p>
              </div>
            </div>`
            return html;
        };
      }
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
});