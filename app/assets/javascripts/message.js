$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="main-chat__messageroom__onebox" data-message-id=${message.id}>
        <div class="main-chat__messageroomonebox__userinfo">
          <div class="main-chat__messageroom__onebox__userinfo--name">
            ${message.user_name}
          </div>
          <div class="main-chat__messageroom__userifo--time">
            ${message.created_at}
          </div>
          <div class="main-chat__messageroom__text">
            <p class="main-chat__messageroom__text--image">
              ${message.content}
            </p>
          </div>
        </div>
      <div>`
      return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
    })
  });
});